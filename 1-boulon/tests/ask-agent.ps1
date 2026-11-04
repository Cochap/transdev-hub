# Asks the live BOULON agent a question through Direct Line and prints its replies.
# Usage: powershell -File 1-boulon\tests\ask-agent.ps1 "question text"
# Secret comes from the "COPILOT STUDIO:" line in .env. The environment is in the Europe Direct Line region.
param([Parameter(Mandatory)][string]$Question, [int]$WaitSeconds = 40)
# Exit codes: 0 = agent replied, 2 = SCRIPT/SETUP ERROR (the test did not run), 3 = agent gave NO REPLY in time,
#             4 = AGENT ERROR (the agent answered with a Copilot Studio error message instead of an answer).
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
trap { "SCRIPT ERROR (test did not run): $($_.Exception.Message)"; exit 2 }
$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$envPath = Join-Path $root '.env'
if (-not (Test-Path $envPath)) { "SCRIPT ERROR: .env not found"; exit 2 }
$envText = Get-Content $envPath -Raw
$secret = ([regex]::Match($envText,'(?m)^COPILOT STUDIO\s*[:=]\s*(.+)$')).Groups[1].Value.Trim()
if (-not $secret) { "SCRIPT ERROR: no 'COPILOT STUDIO:' line in .env"; exit 2 }
$base = 'https://europe.directline.botframework.com/v3/directline'
$PSDefaultParameterValues['Invoke-RestMethod:TimeoutSec'] = 30
$h = @{Authorization = "Bearer $secret"}
$conv = Invoke-RestMethod -Method Post -Uri "$base/conversations" -Headers $h
$h = @{Authorization = "Bearer $($conv.token)"}
$body = @{type='message'; from=@{id='boulon-test'}; text=$Question; locale='en-US'} | ConvertTo-Json
$null = Invoke-RestMethod -Method Post -Uri "$base/conversations/$($conv.conversationId)/activities" -Headers $h -Body $body -ContentType 'application/json; charset=utf-8'
$deadline = (Get-Date).AddSeconds($WaitSeconds); $seen = @{}; $replies = @()
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Seconds 3
  $acts = (Invoke-RestMethod -Uri "$base/conversations/$($conv.conversationId)/activities" -Headers $h).activities
  foreach ($a in $acts) {
    if ($a.from.id -ne 'boulon-test' -and $a.type -eq 'message' -and -not $seen[$a.id]) {
      $seen[$a.id] = $true; $replies += $a
    }
  }
  if ($replies.Count -ge 2) { break }
}
foreach ($r in $replies) {
  "--- reply ---"; $r.text
  foreach ($e in @($r.entities)) { if ($e.citation) { foreach ($c in $e.citation) { "CITATION: " + $c.appearance.name + " | " + $c.appearance.url } } }
}
if (-not $replies) { "NO REPLY within $WaitSeconds s (the script worked; the agent did not answer)"; exit 3 }
$agentErr = $replies | ForEach-Object { [regex]::Match([string]$_.text, "(?i)(Code d.erreur|Error code)\s*\W*\s*([A-Za-z]+)") } | Where-Object Success | Select-Object -First 1
if ($agentErr) { "AGENT ERROR: $($agentErr.Groups[2].Value) (see the error table in the boulon-agent-testing skill)"; exit 4 }
