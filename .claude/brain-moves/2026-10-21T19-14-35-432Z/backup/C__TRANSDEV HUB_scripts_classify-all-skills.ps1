# Asks Jev (via model-router.ps1 -Classify) about every skill in data\routing\skills-raw.json,
# then writes .claude\skill-routing.json (size + pinned/routed per skill) and pins owned skills in their frontmatter.
# Resumable: results are cached in data\routing\classified.jsonl.
param([switch]$Fresh)
$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$rawPath = "$root\data\routing\skills-raw.json"; $cache = "$root\data\routing\classified.jsonl"
$cfg = Get-Content "$root\.claude\model-routing.json" -Raw | ConvertFrom-Json
$skills = @(Get-Content $rawPath -Raw | ConvertFrom-Json) | % { $_ }
if ($Fresh -and (Test-Path $cache)) { Remove-Item $cache }
$done = @{}; if (Test-Path $cache) { Get-Content $cache | % { $o = $_ | ConvertFrom-Json; $done[$o.id] = $o } }
$router = "$root\scripts\model-router.ps1"; $log = "$root\logs\model-routing.jsonl"; $n = 0
foreach ($s in $skills) {
  if ($done[$s.id]) { continue }
  $task = "Skill description: $($s.desc) (skill file is $($s.lines) lines long)"
  $tier = & $router -Skill $s.id -Task $task -Classify
  $last = Get-Content $log -Tail 1 | ConvertFrom-Json
  $rec = [pscustomobject]@{ id=$s.id; src=$s.src; lines=$s.lines; file=$s.file; tier=[string]$tier; model=$last.model; mode=$last.mode; ms=$last.ms; cost=$last.cost_usd }
  $rec | ConvertTo-Json -Compress | Add-Content $cache -Encoding utf8; $done[$s.id] = $rec; $n++
  if ($n % 25 -eq 0) { "classified $n so far..." }
}
# Build the registry. pinned = Jev says haiku AND the skill is short (<= pinMaxLines) , or listed in config.overrides.
$entries = [ordered]@{}
foreach ($s in $skills) {
  $r = $done[$s.id]; if (-not $r) { continue }
  $tier = $r.tier; $mode = 'routed'
  $ov = $cfg.overrides.PSObject.Properties[$s.id]
  if ($ov) { $tier = $ov.Value; $mode = 'pinned' }
  elseif ($r.mode -eq 'classify' -and $tier -eq 'haiku' -and $s.lines -gt 0 -and $s.lines -le $cfg.pinMaxLines) { $mode = 'pinned' }
  elseif ($r.mode -ne 'classify') { $mode = 'routed' }   # call failed: leave routed, size falls back
  $entries[$s.id] = [pscustomobject]@{ tier=$tier; mode=$mode; src=$s.src; jev_model=$r.model; frontmatter=($null -ne $s.file -and $s.src -in 'project','user') }
}
$reg = [pscustomobject]@{ built=(Get-Date).ToString('s'); skills=$entries }
$reg | ConvertTo-Json -Depth 4 | Set-Content "$root\.claude\skill-routing.json" -Encoding utf8
# Pin or unpin owned skills' frontmatter (project + user skills only; plugin and synced copies are overwritten on update).
foreach ($s in $skills) {
  if ($s.src -notin 'project','user' -or -not $s.file) { continue }
  $e = $entries[$s.id]; if (-not $e) { continue }
  $L = New-Object 'System.Collections.Generic.List[string]'; (Get-Content $s.file) | % { $L.Add($_) }
  $mi = -1; for ($i = 1; $i -lt [Math]::Min($L.Count,40); $i++) { if ($L[$i] -match '^---') { break }; if ($L[$i] -match '^model:') { $mi = $i } }
  $want = ($e.mode -eq 'pinned')
  if ($want -and $mi -ge 0) { $L[$mi] = "model: $($e.tier)" }
  elseif ($want) { $ni = $L.FindIndex({param($x) $x -match '^name:'}); if ($ni -ge 0) { $L.Insert($ni+1,"model: $($e.tier)") } }
  elseif ($mi -ge 0) { $L.RemoveAt($mi) }
  [IO.File]::WriteAllLines($s.file,$L,(New-Object Text.UTF8Encoding $false))
}
$by = $entries.Values | group mode, tier | % { "$($_.Name): $($_.Count)" }
"registry written: $($entries.Count) skills"; $by
$cost = ($done.Values | measure cost -Sum).Sum; "classification cost USD: $cost"
