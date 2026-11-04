Add-Type -AssemblyName UIAutomationClient
$ErrorActionPreference='Stop'
$profilePath=Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data\Default'
$accountPath=Join-Path $profilePath 'AccountBookmarks'
$beforeText=[IO.File]::ReadAllText($accountPath)
$before=$beforeText|ConvertFrom-Json
$backupPath=Join-Path 'C:\TRANSDEV HUB' ('chrome-before-emojis-'+(Get-Date -Format 'yyyyMMdd-HHmmss')+'.json')
[IO.File]::WriteAllText($backupPath,$beforeText,[Text.UTF8Encoding]::new($false))
$chromeProcess=Get-Process chrome|Where-Object {$_.MainWindowTitle -eq 'Bookmarks - Google Chrome'}|Select-Object -First 1
if(!$chromeProcess){throw 'Bookmark manager is not open.'}
$uiRoot=[Windows.Automation.AutomationElement]::FromHandle($chromeProcess.MainWindowHandle)
function Find-Element($name,$type){
 $condition=[Windows.Automation.AndCondition]::new([Windows.Automation.PropertyCondition]::new([Windows.Automation.AutomationElement]::NameProperty,$name),[Windows.Automation.PropertyCondition]::new([Windows.Automation.AutomationElement]::ControlTypeProperty,$type))
 $element=$uiRoot.FindFirst([Windows.Automation.TreeScope]::Descendants,$condition)
 if(!$element){throw "Missing UI element: $name"}
 $element
}
function Open-Folder($name){
 (Find-Element $name ([Windows.Automation.ControlType]::TreeItem)).GetCurrentPattern([Windows.Automation.SelectionItemPattern]::Pattern).Select()
 Start-Sleep -Milliseconds 300
}
function Rename-Folder($name,$codePoint){
 $newName=[char]::ConvertFromUtf32($codePoint)+' '+$name
 (Find-Element ('More actions for '+$name) ([Windows.Automation.ControlType]::Button)).GetCurrentPattern([Windows.Automation.ExpandCollapsePattern]::Pattern).Expand()
 Start-Sleep -Milliseconds 200
 (Find-Element 'Rename' ([Windows.Automation.ControlType]::MenuItem)).GetCurrentPattern([Windows.Automation.InvokePattern]::Pattern).Invoke()
 Start-Sleep -Milliseconds 300
 (Find-Element 'Name' ([Windows.Automation.ControlType]::Edit)).GetCurrentPattern([Windows.Automation.ValuePattern]::Pattern).SetValue($newName)
 (Find-Element 'Save' ([Windows.Automation.ControlType]::Button)).GetCurrentPattern([Windows.Automation.InvokePattern]::Pattern).Invoke()
 Start-Sleep -Milliseconds 300
 "Renamed: $newName"
}
Open-Folder 'Bookmarks bar'
$names=[ordered]@{
 'School & Planning'=0x1F393
 'Real Estate Research'=0x1F3E0
 'Inspiration'=0x1F4A1
 'Gaming & Entertainment'=0x1F3AE
 'School Archive'=0x1F5C2
 'Work'=0x1F4BC
 'AI & Local Tools'=0x1F916
 'Design Inspiration'=0x1F3A8
 'Motion & React'=0x2728
}
foreach($name in $names.Keys){Rename-Folder $name $names[$name]}
Open-Folder 'Other bookmarks'
Rename-Folder 'Business & Resources' 0x1F4CA
Open-Folder 'Bookmarks bar'
Start-Sleep -Seconds 3
$after=[IO.File]::ReadAllText($accountPath)|ConvertFrom-Json
function Get-Links($node){if($node.type -eq 'url'){$node|ConvertTo-Json -Depth 30 -Compress}else{foreach($child in $node.children){Get-Links $child}}}
$oldLinks=@(foreach($root in $before.roots.PSObject.Properties){Get-Links $root.Value})|Sort-Object
$newLinks=@(foreach($root in $after.roots.PSObject.Properties){Get-Links $root.Value})|Sort-Object
if($oldLinks.Count -ne $newLinks.Count -or (Compare-Object $oldLinks $newLinks)){throw 'Bookmark preservation check failed.'}
foreach($name in $names.Keys){
 $expected=[char]::ConvertFromUtf32($names[$name])+' '+$name
 if($after.roots.bookmark_bar.children.name -notcontains $expected){throw "Rename not saved: $name"}
}
if($after.roots.other.children.name -notcontains ([char]::ConvertFromUtf32(0x1F4CA)+' Business & Resources')){throw 'Business folder rename not saved.'}
"Verified 10 folder titles; $($newLinks.Count) bookmark entries unchanged."
