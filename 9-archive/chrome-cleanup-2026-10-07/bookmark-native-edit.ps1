Add-Type -AssemblyName UIAutomationClient
$ErrorActionPreference='Stop'
$chromeProcess=Get-Process chrome|Where-Object {$_.MainWindowTitle -eq 'Bookmarks - Google Chrome'}|Select-Object -First 1
$uiRoot=[Windows.Automation.AutomationElement]::FromHandle($chromeProcess.MainWindowHandle)
function Find-Element($name,$type){
 $condition=[Windows.Automation.AndCondition]::new([Windows.Automation.PropertyCondition]::new([Windows.Automation.AutomationElement]::NameProperty,$name),[Windows.Automation.PropertyCondition]::new([Windows.Automation.AutomationElement]::ControlTypeProperty,$type))
 $element=$uiRoot.FindFirst([Windows.Automation.TreeScope]::Descendants,$condition)
 if(!$element){throw "Missing UI element: $name ($type)"}
 $element
}
function Open-Folder($name){
 (Find-Element $name ([Windows.Automation.ControlType]::TreeItem)).GetCurrentPattern([Windows.Automation.SelectionItemPattern]::Pattern).Select()
 Start-Sleep -Milliseconds 400
}
function Edit-Entry($name,$action,$newName,$newUrl){
 (Find-Element ('More actions for '+$name) ([Windows.Automation.ControlType]::Button)).GetCurrentPattern([Windows.Automation.ExpandCollapsePattern]::Pattern).Expand()
 Start-Sleep -Milliseconds 250
 (Find-Element $action ([Windows.Automation.ControlType]::MenuItem)).GetCurrentPattern([Windows.Automation.InvokePattern]::Pattern).Invoke()
 Start-Sleep -Milliseconds 400
 (Find-Element 'Name' ([Windows.Automation.ControlType]::Edit)).GetCurrentPattern([Windows.Automation.ValuePattern]::Pattern).SetValue($newName)
 if($newUrl){(Find-Element 'URL' ([Windows.Automation.ControlType]::Edit)).GetCurrentPattern([Windows.Automation.ValuePattern]::Pattern).SetValue($newUrl)}
 (Find-Element 'Save' ([Windows.Automation.ControlType]::Button)).GetCurrentPattern([Windows.Automation.InvokePattern]::Pattern).Invoke()
 Start-Sleep -Milliseconds 400
 "Edited: $name -> $newName"
}
function Count-Links($node){if($node.type -eq 'url'){1}else{foreach($child in $node.children){Count-Links $child}}}
$document=Get-Content -LiteralPath (Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data\Default\AccountBookmarks') -Raw -Encoding UTF8|ConvertFrom-Json
foreach($rootName in @('bookmark_bar','other')){
 $emptyFolder=$document.roots.$rootName.children|Where-Object {$_.name -eq 'New folder'}
 if($emptyFolder -and @(Count-Links $emptyFolder).Count -eq 0){
  $rootLabel=if($rootName -eq 'bookmark_bar'){'Bookmarks bar'}else{'Other bookmarks'}
  Open-Folder $rootLabel
  (Find-Element 'More actions for New folder' ([Windows.Automation.ControlType]::Button)).GetCurrentPattern([Windows.Automation.ExpandCollapsePattern]::Pattern).Expand()
  Start-Sleep -Milliseconds 250
  (Find-Element 'Delete' ([Windows.Automation.ControlType]::MenuItem)).GetCurrentPattern([Windows.Automation.InvokePattern]::Pattern).Invoke()
  Start-Sleep -Milliseconds 400
  "Removed empty placeholder folder: $rootLabel"
 }
}
Open-Folder 'Other bookmarks'
Edit-Entry 'BROKEN MATRIX' 'Rename' 'Business & Resources' $null
Open-Folder 'Bookmarks bar'
