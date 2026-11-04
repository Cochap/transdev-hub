# Passive upkeep for model routing. Silent when nothing changed.
# Rebuilds the skill list, and only if a skill was added or removed does it ask Jev about the new ones
# and refresh .claude\skill-routing.json (+ frontmatter pins on owned skills). Output goes to 5-brain\logs\routing-sync.log only.
$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$lock = "$root\data\routing\sync.lock"
New-Item -ItemType Directory -Force "$root\data\routing","$root\logs" | Out-Null
if ((Test-Path $lock) -and ((Get-Date) - (Get-Item $lock).LastWriteTime).TotalMinutes -lt 20) { return }   # another run is active
Set-Content $lock (Get-Date).ToString('s')
try {
  & "$root\scripts\build-skill-manifest.ps1" | Out-Null
  $raw = @(Get-Content "$root\data\routing\skills-raw.json" -Raw | ConvertFrom-Json) | % { $_ }
  $regPath = "$root\.claude\skill-routing.json"
  $known = @{}
  if (Test-Path $regPath) { (Get-Content $regPath -Raw | ConvertFrom-Json).skills.PSObject.Properties | % { $known[$_.Name] = 1 } }
  $now = @{}; $raw | % { $now[$_.id] = 1 }
  $new     = @($now.Keys   | ? { -not $known[$_] })
  $removed = @($known.Keys | ? { -not $now[$_] })
  if ($new.Count -eq 0 -and $removed.Count -eq 0) { return }                                       # nothing to do: no output at all
  if ($known.Count -gt 0 -and $raw.Count -lt 0.8 * $known.Count) {                                  # a folder probably moved; never wipe the registry
    "$((Get-Date).ToString('s')) ABORT: skill list shrank from $($known.Count) to $($raw.Count); registry left untouched" | Add-Content "$root\logs\routing-sync.log"; return
  }
  & "$root\scripts\classify-all-skills.ps1" *> $null
  "$((Get-Date).ToString('s')) synced: +$($new.Count) new ($(($new | select -First 8) -join ', ')), -$($removed.Count) removed" | Add-Content "$root\logs\routing-sync.log"
} catch {
  "$((Get-Date).ToString('s')) ERROR: $($_.Exception.Message.Split("`n")[0])" | Add-Content "$root\logs\routing-sync.log"
} finally { Remove-Item $lock -ErrorAction SilentlyContinue }
