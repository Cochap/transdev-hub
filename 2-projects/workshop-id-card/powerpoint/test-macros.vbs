Sub Chk(label)
  If Err.Number <> 0 Then
    WScript.Echo label & " FAIL: " & Err.Description
    Err.Clear
  Else
    WScript.Echo label & " ok"
  End If
End Sub
Set app = CreateObject("PowerPoint.Application")
Set p = app.Presentations.Open(WScript.Arguments(0), False, False, True)
d = WScript.Arguments(1)
WScript.Echo "AutoSec=" & app.AutomationSecurity & " comps=" & p.VBProject.VBComponents.Count & " lines=" & p.VBProject.VBComponents("WorkshopCard").CodeModule.CountOfLines
On Error Resume Next
app.Run "t3.pptm!WorkshopCard.RefreshAll": Chk "RefreshAll"
p.Slides(1).Export d & "\preview_EN.png", "PNG", 1920, 1080
app.Run "t3.pptm!WorkshopCard.SetLanguage", "FR": Chk "FR"
WScript.Echo "LANG=" & p.Tags("LANG") & " own=[" & p.Slides(1).Shapes("Rectangle 7199").TextFrame.TextRange.Text & "] w=" & p.Slides(1).Shapes("txtBus").Width
p.Slides(1).Export d & "\preview_FR.png", "PNG", 1920, 1080
app.Run "t3.pptm!WorkshopCard.SetFieldFill", False: Chk "Fill off"
p.Slides(1).Export d & "\preview_FR_print.png", "PNG", 1920, 1080
app.Run "t3.pptm!WorkshopCard.SetLanguage", "EN": Chk "EN LANG=" & p.Tags("LANG")
p.Slides(1).Export d & "\preview_EN_back.png", "PNG", 1920, 1080
p.Saved = True
p.Close
app.Quit
