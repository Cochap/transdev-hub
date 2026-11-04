# Runs the BOULON golden question set against Azure AI Search in three search modes, side by side:
#   keyword  = word matching only (what run-pilot-tests.ps1 does)
#   hybrid   = word matching + meaning-based (vector) search, which is closer to what Copilot Studio does
#   semantic = hybrid + Microsoft's re-ranker (may be unavailable on the Free tier; shown as n/a)
# Checks the SEARCH INDEX only, not the Copilot Studio agent.
# Usage:  powershell -ExecutionPolicy Bypass -File 1-boulon\tests\run-golden.ps1 [-Set 1-boulon\tests\golden\golden-v0.json]
param([string]$Set = (Join-Path $PSScriptRoot 'golden\golden-v0.json'), [switch]$V2)

$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$envFile = Join-Path $root ".env"
if (-not (Test-Path $envFile)) { Write-Host "Missing .env - copy .env.example to .env and paste your key." -ForegroundColor Red; exit 1 }
$cfg = @{}
Get-Content $envFile | Where-Object { $_ -match '^\s*([A-Z_]+)\s*=\s*(.+)\s*$' } | ForEach-Object { $cfg[$Matches[1]] = $Matches[2].Trim() }
$admin = Get-Content $envFile | Where-Object { $_ -match '(?i)^\s*(primary\s+)?admin\s+key\s*[:=]\s*(\S+)\s*$' } | Select-Object -First 1
if ($admin -and $admin -match '[:=]\s*(\S+)\s*$') { $cfg.AZURE_SEARCH_KEY = $Matches[1] }
$missing = @('AZURE_SEARCH_ENDPOINT', 'AZURE_SEARCH_INDEX', 'AZURE_SEARCH_KEY') | Where-Object { -not $cfg[$_] -or $cfg[$_] -match '^<.*>$|paste' }
if ($missing) { Write-Host "Missing or placeholder value in .env: $($missing -join ', ')" -ForegroundColor Red; exit 1 }
$endpoint = $cfg.AZURE_SEARCH_ENDPOINT.TrimEnd('/'); $index = $cfg.AZURE_SEARCH_INDEX
$headers = @{ 'api-key' = $cfg.AZURE_SEARCH_KEY }
$api = 'api-version=2024-07-01'

$golden = Get-Content $Set -Raw -Encoding UTF8 | ConvertFrom-Json

function Invoke-Search([string]$text, [string]$mode) {
    $body = @{ search = $text; top = 5; queryType = 'simple'; searchMode = 'any'; select = 'document_title,content_text' }
    if ($mode -ne 'keyword') { $body.vectorQueries = @(@{ kind = 'text'; text = $text; fields = 'content_embedding'; k = 50 }) }
    if ($mode -eq 'semantic') { $body.queryType = 'semantic'; $body.semanticConfiguration = "$index-semantic-configuration" }
    $bytes = [Text.Encoding]::UTF8.GetBytes(($body | ConvertTo-Json -Depth 5))
    (Invoke-RestMethod -Method Post -Uri "$endpoint/indexes/$index/docs/search?$api" -Headers $headers -ContentType 'application/json; charset=utf-8' -Body $bytes -TimeoutSec 30 -ErrorAction Stop).value
}

function Get-Text($doc) { ($doc.content_text -replace '\s+', ' ').Trim() }

# Returns the rank (1-5) of the first passage that contains the expected value (and comes from the right manual), or 0.
function Get-Rank($hits, $q) {
    for ($i = 0; $i -lt $hits.Count; $i++) {
        $okText = (Get-Text $hits[$i]) -match $q.expect
        $okManual = (-not $q.manual) -or ($hits[$i].document_title -like "*$($q.manual)*")
        if ($okText -and $okManual) { return $i + 1 }
    }
    0
}

$modes = 'keyword', 'hybrid', 'semantic'
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmm'
$semNaLogged = $false; $errors = 0
$rows = @(); $detail = @(); $score = @{ keyword = 0; hybrid = 0; semantic = 0 }; $ran = @{ keyword = 0; hybrid = 0; semantic = 0 }
foreach ($q in $golden.questions) {
    # Items flagged requiresV2 need the rebuilt index; skip them unless -V2 is passed.
    if ($q.requiresV2 -and -not $V2) { $detail += "- $($q.id) skipped (requires v2 index; rerun with -V2)"; continue }
    $cells = @()
    foreach ($m in $modes) {
        try { $hits = @(Invoke-Search $q.ask $m); $rank = Get-Rank $hits $q; $err = $null }
        catch { $hits = @(); $rank = 0; $err = $_.Exception.Message }
        if ($err) {
            # Only "semantic ranker not available on this plan" is n/a (logged once). Every other error is a real ERROR and counts against the score.
            $semUnavailable = ($m -eq 'semantic') -and ($err -match '(?i)semantic.*(not (enabled|available|supported)|free|tier|sku)|(tier|sku).*semantic')
            if ($semUnavailable) { $cells += 'n/a'; if (-not $semNaLogged) { $detail += "- semantic ranker unavailable on this plan: $err"; $semNaLogged = $true } }
            else { $ran[$m]++; $errors++; $cells += 'ERROR'; $detail += "- $($q.id) $m error: $err" }
            continue
        }
        $ran[$m]++
        $pass = if ($q.abstain) { $rank -eq 0 } else { $rank -gt 0 }
        if ($pass) { $score[$m]++ }
        $cells += if ($q.abstain) { if ($pass) { 'PASS (absent)' } else { "FAIL (found #$rank)" } } elseif ($pass) { "PASS #$rank" } else { 'FAIL' }
        if ($m -eq 'hybrid' -and $hits.Count) { $detail += "- $($q.id) hybrid top result: $($hits[0].document_title)" }
    }
    $rows += "| $($q.id) | $($q.slice) | $($cells -join ' | ') |"
    Write-Host ("{0,-3} {1,-16} {2,-16} {3,-16} {4}" -f $q.id, $cells[0], $cells[1], $cells[2], $q.slice)
}

$summary = ($modes | ForEach-Object { "$_ $($score[$_])/$($ran[$_])" }) -join ' | '
$report = @("# Golden set $($golden.version) - index-side run $stamp", "Index: ``$index``  |  Set: ``$(Split-Path $Set -Leaf)``", "",
    "**Score:** $summary", "", "PASS #n = the right passage was result n of the top 5. Abstain rows pass when the value is NOT found.", "",
    "| ID | Slice | Keyword | Hybrid | Semantic |", "|---|---|---|---|---|") + $rows + @("", "## Notes") + $detail
$out = Join-Path $root "1-boulon\tests\results\golden_$stamp.md"
$report | Set-Content -Path $out -Encoding utf8
Write-Host "`nScore: $summary`nSaved: $out"
if ($errors -gt 0) { Write-Host "$errors search call(s) returned an error - see Notes in the report." -ForegroundColor Red; exit 1 }
