# Lists every skill/command Claude can use on this PC (live sources only, no translated or mirrored copies)
# and writes data\routing\skills-raw.json. Re-run any time skills are added.
$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }
$eccDir = Get-ChildItem "$env:USERPROFILE\.claude\plugins\cache\ecc\ecc" -Directory -ErrorAction SilentlyContinue | Sort-Object { try { [version]$_.Name } catch { [version]'0.0' } } | Select-Object -Last 1
$ecc  = if ($eccDir) { $eccDir.FullName } else { "$env:USERPROFILE\.claude\plugins\cache\ecc\ecc\none" }   # newest installed ECC version
$out  = New-Object System.Collections.ArrayList
$have = @{}
function Add-Skill($file,$prefix,$src,$fallback){
  $L=@(Get-Content $file); $name=$fallback; $desc=''
  if($L.Count -gt 0 -and $L[0] -match '^---'){
    for($i=1;$i -lt [Math]::Min($L.Count,40);$i++){
      if($L[$i] -match '^---'){break}
      if($L[$i] -match '^name:\s*(.+)$'){$name=$Matches[1].Trim('"',' ')}
      if($L[$i] -match '^description:\s*(.*)$' -and -not $desc){$desc=$Matches[1].Trim('"',' ')}
    }
  }
  $id="$prefix$name"; if($have[$id]){return}; $have[$id]=1
  [void]$out.Add([pscustomobject]@{ id=$id; src=$src; lines=$L.Count; desc=$desc.Substring(0,[Math]::Min(200,$desc.Length)); file=$file })
}
Get-ChildItem "$root\.claude\skills" -Directory | % { $f="$($_.FullName)\SKILL.md"; if(Test-Path $f){ Add-Skill $f '' 'project' $_.Name } }
Get-ChildItem "$env:USERPROFILE\.claude\skills" -Directory | ? {$_.Name -notin '.trash','synced'} | % { $f="$($_.FullName)\SKILL.md"; if(Test-Path $f){ Add-Skill $f '' 'user' $_.Name } }
Get-ChildItem "$env:USERPROFILE\.claude\skills\synced" -Recurse -Filter SKILL.md | % { Add-Skill $_.FullName 'anthropic-skills:' 'synced' $_.Directory.Name }
Get-ChildItem "$ecc\skills" -Directory | % { $f="$($_.FullName)\SKILL.md"; if(Test-Path $f){ Add-Skill $f 'ecc:' 'ecc-skill' $_.Name } }
Get-ChildItem "$ecc\commands" -Filter *.md | % { Add-Skill $_.FullName 'ecc:' 'ecc-command' $_.BaseName }
$nofile=[ordered]@{
 'update-config'='Configure the Claude Code harness via settings.json, hooks, permissions, env vars';'keybindings-help'='Customize keyboard shortcuts in keybindings.json';'code-review'='Review the current diff or a PR for correctness bugs';'simplify'='Review changed code for reuse, simplification, efficiency and apply fixes';'fewer-permission-prompts'='Scan transcripts and add a read-only allowlist to settings';'loop'='Run a prompt or command on a recurring interval';'schedule'='Create, update, list or run scheduled cloud agents';'claude-api'='Reference for the Claude API and Anthropic SDK';'workflow-authoring'='Reference for writing a Workflow tool script';'run'='Launch and drive the project app to see a change working';'plugin-authoring'='Make a mod: change Claude interface or behaviour, panels, hooks';'init'='Initialize a CLAUDE.md file';'security-review'='Security review of pending changes';'dataviz'='Create any chart, graph or data visualization';'artifact-design'='Design guidance for Artifacts';'artifact-diagramming'='Diagramming know-how for Artifacts';'artifact-capabilities'='Runtime capabilities a published Artifact page can be granted';
 'anthropic-skills:consolidate-memory'='Consolidate memory files';'anthropic-skills:explain-usage'='Explain Claude usage';'anthropic-skills:setup-claude'='Set up Claude';'anthropic-skills:schedule'='Schedule tasks';'resume-tailoring:resume-tailoring'='Tailor a resume to a job posting'}
foreach($k in $nofile.Keys){ if(-not $have[$k]){ $have[$k]=1; [void]$out.Add([pscustomobject]@{id=$k;src='builtin-nofile';lines=0;desc=$nofile[$k];file=$null}) } }
New-Item -ItemType Directory -Force "$root\data\routing" | Out-Null
ConvertTo-Json -InputObject @($out) -Depth 3 | Set-Content "$root\data\routing\skills-raw.json" -Encoding utf8
$out | group src | % { "$($_.Name): $($_.Count)" }; "total unique: $($out.Count)"
