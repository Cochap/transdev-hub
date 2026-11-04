<#
One-time OpenRouter setup. Greg runs this himself; the key is typed into a hidden prompt,
checked against OpenRouter, saved as a per-user Windows environment variable (no admin),
and never printed, logged or sent anywhere except openrouter.ai.
#>
$secure = Read-Host 'Paste your OpenRouter key (input is hidden), then press Enter' -AsSecureString
$key = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
if (-not $key) { Write-Host 'No key entered. Nothing changed.'; return }
try {
  $info = Invoke-RestMethod 'https://openrouter.ai/api/v1/key' -Headers @{ Authorization = "Bearer $key" } -TimeoutSec 20
} catch { Write-Host 'OpenRouter rejected that key. Nothing was saved.'; return }
[Environment]::SetEnvironmentVariable('OPENROUTER_API_KEY', $key, 'User')
$env:OPENROUTER_API_KEY = $key
Write-Host 'Key accepted and saved for your Windows user. Restart Claude Code so it sees the new variable.'
$left = $info.data.limit_remaining
if ($null -ne $left) { Write-Host "Credit remaining on this key: $left" } else { Write-Host 'Key has no spending cap set.' }
Write-Host 'Live router test:'
& (Join-Path $PSScriptRoot 'model-router.ps1') -Skill learn -Task 'Teach me lesson 3 of the AI course'
Get-Content (Join-Path (& { $r = $PSScriptRoot; while ($r -and -not (Test-Path (Join-Path $r 'CLAUDE.md'))) { $r = Split-Path $r -Parent }; $r }) 'logs\model-routing.jsonl') -Tail 1
