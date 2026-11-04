Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName System.Windows.Forms
$ErrorActionPreference='Stop'
$chromeProcess=Get-Process chrome|Where-Object {$_.MainWindowTitle -eq 'Bookmarks - Google Chrome'}|Select-Object -First 1
$chromeShell=New-Object -ComObject WScript.Shell
[void]$chromeShell.AppActivate($chromeProcess.Id)
$uiRoot=[Windows.Automation.AutomationElement]::FromHandle($chromeProcess.MainWindowHandle)
function Find-BookmarkElement($name,$type){
 $condition=[Windows.Automation.AndCondition]::new([Windows.Automation.PropertyCondition]::new([Windows.Automation.AutomationElement]::NameProperty,$name),[Windows.Automation.PropertyCondition]::new([Windows.Automation.AutomationElement]::ControlTypeProperty,$type))
 $uiRoot.FindFirst([Windows.Automation.TreeScope]::Descendants,$condition)
}
function Open-BookmarkFolder($name){
 $element=Find-BookmarkElement $name ([Windows.Automation.ControlType]::TreeItem)
 if(!$element){
  foreach($parentName in @('Bookmarks bar','Other bookmarks')){
   $parent=Find-BookmarkElement $parentName ([Windows.Automation.ControlType]::TreeItem)
   if($parent){try{$pattern=$parent.GetCurrentPattern([Windows.Automation.ExpandCollapsePattern]::Pattern);$pattern.Expand()}catch{}}
  }
  Start-Sleep -Milliseconds 300
  $element=Find-BookmarkElement $name ([Windows.Automation.ControlType]::TreeItem)
 }
 if(!$element){throw "Folder missing: $name"}
 $element.GetCurrentPattern([Windows.Automation.SelectionItemPattern]::Pattern).Select()
 Start-Sleep -Milliseconds 400
}
function Move-Bookmark($name,$sourceFolder,$targetFolder){
 Open-BookmarkFolder $sourceFolder
 [Windows.Forms.SendKeys]::SendWait('{ESC}')
 $element=Find-BookmarkElement $name ([Windows.Automation.ControlType]::DataItem)
 if(!$element){throw "Bookmark missing: $name"}
 $element.SetFocus()
 $element.GetCurrentPattern([Windows.Automation.SelectionItemPattern]::Pattern).Select()
 [Windows.Forms.SendKeys]::SendWait('^x')
 Start-Sleep -Milliseconds 200
 Open-BookmarkFolder $targetFolder
 [Windows.Forms.SendKeys]::SendWait('^v')
 Start-Sleep -Milliseconds 500
 "Moved: $name -> $targetFolder"
}
Move-Bookmark 'linkedin outbound - Recherche Google' 'Gaming & Entertainment' 'BROKEN MATRIX'
Open-BookmarkFolder 'Bookmarks bar'
