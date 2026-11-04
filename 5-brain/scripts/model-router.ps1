<#
Model router for every skill on this PC.
  .\model-router.ps1 -Skill learn -Task "teach lesson 3"   -> prints one word: haiku | sonnet | opus
  .\model-router.ps1 -Switch on|off|status                 -> the on/off switch
  -Classify                                                -> ignore pins, always ask Jev (used by classify-all-skills.ps1)
Order: switch off -> registry/config size. Pinned skill -> its pinned size, no network.
Routed skill -> OpenRouter's Jev router (typesafe/jev-router) picks a model, mapped to a Claude size.
No key or a failed call -> the size Jev gave this skill at classification time (else default).
A floor (config "floors") is a minimum size. The key is read from OPENROUTER_API_KEY
(Process, User or Machine env, then .env) and is never printed or logged.
Every pick is appended to 5-brain\logs\model-routing.jsonl (time, ms, cost).
#>
param(
  [string]$Skill,
  [string]$Task = '',
  [ValidateSet('on','off','status')][string]$Switch,
  [switch]$Classify
)
$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$cfgPath = Join-Path $root '.claude\model-routing.json'
$regPath = Join-Path $root '.claude\skill-routing.json'
$logPath = Join-Path $root '5-brain\logs\model-routing.jsonl'
$cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
$reg = $null; if (Test-Path $regPath) { $reg = Get-Content $regPath -Raw | ConvertFrom-Json }

if ($Switch) {
  if ($Switch -ne 'status') { $cfg.enabled = ($Switch -eq 'on'); $cfg | ConvertTo-Json -Depth 6 | Set-Content $cfgPath -Encoding utf8 }
  "routing enabled = $($cfg.enabled)"; return
}

$rank = @{ haiku=1; sonnet=2; opus=3 }
$Skill = $Skill.TrimStart('/')
$entry = $null
if ($reg -and $reg.skills) { $p = $reg.skills.PSObject.Properties[$Skill]; if ($p) { $entry = $p.Value } }
$fallbackTier = $cfg.default
if ($entry -and $entry.tier) { $fallbackTier = $entry.tier }
function Apply-Floor($tier) {
  foreach ($f in $cfg.floors) { if ($Skill -match $f.match -and $rank[$f.tier] -gt $rank[$tier]) { $tier = $f.tier } }
  $tier
}
function Write-Pick($mode,$tier,$model,$ms,$cost,$reason) {
  New-Item -ItemType Directory -Force (Split-Path $logPath) | Out-Null
  [pscustomobject]@{ ts=(Get-Date).ToString('s'); skill=$Skill; mode=$mode; tier=$tier; model=$model; ms=$ms; cost_usd=$cost; reason=$reason } |
    ConvertTo-Json -Compress | Add-Content $logPath -Encoding utf8
}

$sw = [Diagnostics.Stopwatch]::StartNew()
if (-not $Classify) {
  if (-not $cfg.enabled) { $t = Apply-Floor $fallbackTier; Write-Pick 'off' $t $null $sw.ElapsedMilliseconds $null 'switch is off'; $t; return }
  if ($entry -and $entry.mode -eq 'pinned') { $t = Apply-Floor $entry.tier; Write-Pick 'pinned' $t $null $sw.ElapsedMilliseconds 0 'fixed-step skill, pinned to smallest size'; $t; return }
}

$key = $null
foreach ($s in 'Process','User','Machine') { if (-not $key) { $key = [Environment]::GetEnvironmentVariable('OPENROUTER_API_KEY',$s) } }
if (-not $key -and (Test-Path (Join-Path $root '.env'))) {
  $line = Select-String -Path (Join-Path $root '.env') -Pattern '^\s*OPENROUTER_API_KEY\s*=\s*(.+)$' | Select-Object -First 1
  if ($line) { $key = $line.Matches[0].Groups[1].Value.Trim().Trim('"') }
}
if (-not $key) { $t = Apply-Floor $fallbackTier; Write-Pick 'fallback' $t $null $sw.ElapsedMilliseconds $null 'OPENROUTER_API_KEY not found on this PC'; $t; return }

try {
  $body = @{ model=$cfg.routerModel; max_tokens=1; usage=@{include=$true}
             messages=@(@{role='user'; content="Skill: $Skill`n$Task"}) } | ConvertTo-Json -Depth 5
  $r = Invoke-RestMethod -Uri 'https://openrouter.ai/api/v1/chat/completions' -Method Post -TimeoutSec 30 `
        -Headers @{ Authorization = "Bearer $key" } -ContentType 'application/json' -Body $body
  $picked = [string]$r.model
  $tier = $cfg.default
  foreach ($rule in $cfg.map) { if ($picked -match $rule.match) { $tier = $rule.tier; break } }
  $raw = $tier; $tier = Apply-Floor $tier
  $mode = $(if ($Classify) { 'classify' } else { 'routed' })
  Write-Pick $mode $tier $picked $sw.ElapsedMilliseconds $r.usage.cost "jev-router picked $picked (size before floor: $raw)"
  $tier
} catch {
  $t = Apply-Floor $fallbackTier
  Write-Pick 'fallback' $t $null $sw.ElapsedMilliseconds $null ("router call failed: " + $_.Exception.Message.Split("`n")[0])
  $t
}
