# Merges data\web.json, video.json, inspiration.json and added.json into catalogue.html.
# To add a source: append an entry to data\added.json (same fields), then run this script.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$all = @()
# Names (regex) shown in the "Start here" row. Edit this list to change the flagships.
$flagPatterns = @('^Awwwards','^Dribbble','^Godly','^Mobbin','^Land-book','^Savee','^21st','^Magic UI','^Aceternity','^GSAP','^Anime\.js','^Motion \(motion\.dev\)','^Remotion$','^LottieFiles','^Rive')
# Existing entries that gain an AI-access note (name -> text).
$aiMap = @{ 'Mobbin' = 'MCP connector (mobbin.com/mcp). Paid plan; one-click for Claude Code; no API key stated. Plan and price not yet checked.' }
foreach ($f in 'web','video','inspiration','added') {
  $items = Get-Content (Join-Path $root "data\$f.json") -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($i in $items) {
    $g = $f
    if ($f -eq 'added') {
      $g = 'web'
      if ($i.category -in 'code-video','motion-tool','template-marketplace','free-assets','illustration-character','audio-sfx','easing-helper') { $g = 'video' }
      if ($i.category -in 'motion-system','gallery','education','cheatsheet') { $g = 'inspiration' }
    }
    $i | Add-Member -NotePropertyName group -NotePropertyValue $g -Force
    $isFlag = $false
    foreach ($pat in $flagPatterns) { if ($i.name -match $pat) { $isFlag = $true } }
    $i | Add-Member -NotePropertyName flagship -NotePropertyValue $isFlag -Force
    if ($aiMap.ContainsKey($i.name)) { $i | Add-Member -NotePropertyName ai_access -NotePropertyValue $aiMap[$i.name] -Force }
    $all += $i
  }
}
$all = $all | Sort-Object url -Unique
$json = ($all | ConvertTo-Json -Depth 5 -Compress) -replace '</', '<\/'
$html = (Get-Content (Join-Path $root 'template.html') -Raw -Encoding UTF8).Replace('__DATA__', $json).Replace('__DATE__', (Get-Date -Format 'yyyy-MM-dd'))
[IO.File]::WriteAllText((Join-Path $root 'catalogue.html'), $html, (New-Object Text.UTF8Encoding($false)))
"Built catalogue.html with $($all.Count) sources"
