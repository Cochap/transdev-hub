# Two-way sync between C:\TRANSDEV HUB and GitHub Cochap/transdev-hub (branch main, no PRs).
# Usage: cloud-sync.ps1            -> pull cloud changes, commit + push local changes
#        cloud-sync.ps1 -Gather day  -> also extract today's Claude sessions first (for cloud end of day)
#        cloud-sync.ps1 -Gather week -> also extract this week's sessions (for cloud Friday suggester)
param([ValidateSet('none','day','week')][string]$Gather = 'none')
$ErrorActionPreference = 'Continue'
$hub = 'C:\TRANSDEV HUB'
$log = Join-Path $hub '5-brain\logs\cloud-sync.log'
function Log($m) { Add-Content -Path $log -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm'), $m) }
Set-Location $hub

if ($Gather -eq 'day')  { node 5-brain/scripts/eod-gather-sessions.js 2>&1 | Out-Null; Log 'gathered today' }
if ($Gather -eq 'week') { node 5-brain/scripts/eod-gather-sessions.js --week 2>&1 | Out-Null; Log 'gathered week' }

git add -A 2>$null
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -q -m "auto-sync from PC $(Get-Date -Format 'yyyy-MM-dd HH:mm')" 2>$null }
git pull -q --rebase --autostash origin main 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { git rebase --abort 2>$null; Log 'PULL CONFLICT: rebase aborted, local kept, nothing pushed'; exit 1 }
git push -q origin main 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Log 'PUSH FAILED'; exit 1 }
Log "ok ($Gather)"
