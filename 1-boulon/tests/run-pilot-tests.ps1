# Runs BOULON pilot retrieval tests directly against Azure AI Search.
# Checks the SEARCH INDEX only (not the Copilot Studio agent). If a test passes here but fails in
# Copilot Studio, the problem is agent configuration; if it fails here too, the problem is the index.
# Usage:  powershell -ExecutionPolicy Bypass -File 1-boulon\tests\run-pilot-tests.ps1 [-Query "free text"]
param([string]$Query)

$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$envFile = Join-Path $root ".env"
if (-not (Test-Path $envFile)) { Write-Host "Missing .env - copy .env.example to .env and paste your key." -ForegroundColor Red; exit 1 }
$cfg = @{}
Get-Content $envFile | Where-Object { $_ -match '^\s*([A-Z_]+)\s*=\s*(.+)\s*$' } | ForEach-Object { $cfg[$Matches[1]] = $Matches[2].Trim() }
# Also accept a free-form "primary admin key: <key>" line; it wins over the placeholder.
$admin = Get-Content $envFile | Where-Object { $_ -match '(?i)^\s*(primary\s+)?admin\s+key\s*[:=]\s*(\S+)\s*$' } | Select-Object -First 1
if ($admin -and $admin -match '[:=]\s*(\S+)\s*$') { $cfg.AZURE_SEARCH_KEY = $Matches[1] }
$missing = @('AZURE_SEARCH_ENDPOINT', 'AZURE_SEARCH_INDEX', 'AZURE_SEARCH_KEY') | Where-Object { -not $cfg[$_] -or $cfg[$_] -match '^<.*>$|paste' }
if ($missing) { Write-Host "Missing or placeholder value in .env: $($missing -join ', ')" -ForegroundColor Red; exit 1 }
$endpoint = $cfg.AZURE_SEARCH_ENDPOINT.TrimEnd('/'); $index = $cfg.AZURE_SEARCH_INDEX
$headers = @{ 'api-key' = $cfg.AZURE_SEARCH_KEY; 'Content-Type' = 'application/json' }
$api = 'api-version=2024-07-01'

# Try listing indexes (works only with an admin key) so a wrong index name is caught early.
try {
    $names = @((Invoke-RestMethod -Uri "$endpoint/indexes?$api&`$select=name" -Headers $headers -TimeoutSec 30 -ErrorAction Stop).value.name)
    Write-Host "Indexes on this service: $($names -join ', ')"
    if ($names -notcontains $index) { $index = $names[0]; Write-Host "Configured index not found - using '$index'. Update AZURE_SEARCH_INDEX in .env." -ForegroundColor Yellow }
} catch {
    # 403 = query key (expected, read-only). Anything else (network, wrong endpoint, 401) is shown as-is.
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 403) { Write-Host "(Query key in use - skipping index listing.)" }
    else { Write-Host "Index listing failed (HTTP $code): $($_.Exception.Message)" -ForegroundColor Yellow }
}

function Invoke-Search([string]$text) {
    $body = @{ search = $text; top = 5; queryType = 'simple'; searchMode = 'any' } | ConvertTo-Json
    (Invoke-RestMethod -Method Post -Uri "$endpoint/indexes/$index/docs/search?$api" -Headers $headers -Body $body -TimeoutSec 30 -ErrorAction Stop).value
}

function Get-Text($doc) { ($doc.content_text -replace '\s+', ' ').Trim() }

function Get-Title($doc) { if ($doc.document_title) { $doc.document_title } else { '(no title)' } }

# Show the text around the searched value rather than the start of the chunk.
function Get-Snippet($doc, [string]$needle) {
    $t = Get-Text $doc
    $i = if ($needle) { $t.IndexOf($needle) } else { -1 }
    $start = [Math]::Max(0, $i - 150)
    $len = [Math]::Min(300, $t.Length - $start)
    $t.Substring($start, $len)
}

$tests = @(
    @{ id = 'T1'; ask = 'Is part number HK98-0021 in the Baultar manual, and what is it?'; search = '"HK98-0021"'; mustContain = 'HK98-0021'; manual = 'AS98-5005' },
    @{ id = 'T2'; ask = 'What is part number 12052641 used for in the Proheat manual?';    search = '"12052641"';  mustContain = '12052641';  manual = 'ProHeat' },
    # No Orion manual is in the pilot index (confirmed 2026-09-23), so the correct outcome is NO match.
    @{ id = 'T3'; ask = "What's the part number for the pipe fitting in the Orion manual, part 080808082?"; search = '"080808082"'; mustContain = '080808082'; manual = 'Orion'; expectAbsent = $true }
)
if ($Query) { $tests = @(@{ id = 'ADHOC'; ask = $Query; search = $Query; mustContain = $null; manual = $null }) }

$stamp = Get-Date -Format 'yyyy-MM-dd_HHmm'
$report = @("# Pilot retrieval test run - $stamp", "Index: ``$index``", "")
$failures = 0
foreach ($t in $tests) {
    $err = $null
    try { $hits = @(Invoke-Search $t.search) } catch { $hits = @(); $err = $_.Exception.Message }
    # A match only counts if it comes from the expected manual (a hit in the wrong manual is a FAIL).
    # For expectAbsent tests, a match in ANY manual is a FAIL, so the manual filter is skipped there.
    $found = $t.mustContain -and ($hits | Where-Object {
        ((Get-Text $_) -like "*$($t.mustContain)*") -and ($t.expectAbsent -or -not $t.manual -or (Get-Title $_) -like "*$($t.manual)*")
    })
    # An Azure error must never count as a pass (it would look like "correctly absent").
    $verdict = if ($err) { 'ERROR' } elseif (-not $t.mustContain) { 'INFO' } elseif ([bool]$found -ne [bool]$t.expectAbsent) { 'PASS' } else { 'FAIL' }
    if ($verdict -in 'ERROR', 'FAIL') { $failures++ }
    if ($t.expectAbsent) { $t.ask += '  (expect: not in index -> agent must say it does not have the information)' }
    $color = @{ PASS = 'Green'; FAIL = 'Red'; ERROR = 'Red'; INFO = 'Cyan' }[$verdict]
    Write-Host "`n[$verdict] $($t.id): $($t.ask)" -ForegroundColor $color
    $report += "## [$verdict] $($t.id)", "Agent question: ``$($t.ask)``", "Index search: ``$($t.search)``", ""
    if ($err) { Write-Host "  Error: $err" -ForegroundColor Red; $report += "Error: $err"; $err = $null }
    $i = 0
    foreach ($h in $hits) {
        $i++
        $snippet = Get-Snippet $h $t.mustContain
        $line = "  $i. score $([math]::Round($h.'@search.score', 2)) - $(Get-Title $h)"
        Write-Host $line; Write-Host "     $snippet" -ForegroundColor DarkGray
        $report += "$i. score $([math]::Round($h.'@search.score', 2)) - $(Get-Title $h)", "   > $snippet"
    }
    if ($t.manual -and $hits.Count -gt 0 -and -not ($hits | Where-Object { (Get-Title $_) -like "*$($t.manual)*" })) {
        Write-Host "  Note: no top-5 result came from a '$($t.manual)' file." -ForegroundColor Yellow
        $report += "Note: no top-5 result came from a '$($t.manual)' file."
    }
    $report += ""
}
$out = Join-Path $root "1-boulon\tests\results\$stamp.md"
$report | Set-Content -Path $out -Encoding utf8
Write-Host "`nSaved: $out"
if ($failures -gt 0) { Write-Host "$failures test(s) failed or errored." -ForegroundColor Red; exit 1 }

