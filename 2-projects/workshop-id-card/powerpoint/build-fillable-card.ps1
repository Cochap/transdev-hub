# One bilingual fillable Workshop ID Card (.pptm), filled and printed from Normal view.
# Source: OneDrive "workshop id slide - fillable.pptm" (never modified).
# -Out lets a test build go elsewhere while the real file is open in PowerPoint.
param([string]$Out='')
$src="$env:USERPROFILE\OneDrive - TRANSDEV\Documents\workshop id slide - fillable.pptm"
$dir="C:\TRANSDEV HUB\2-projects\workshop-id-card\powerpoint"
$icons="C:\TRANSDEV HUB\2-projects\workshop-id-card\dist\assets\icons"
$out= if($Out){$Out}else{Join-Path $dir 'Workshop_ID_Card_Fiche_atelier.pptm'}
Copy-Item $src $out -Force
$app=New-Object -ComObject PowerPoint.Application
$p=$app.Presentations.Open($out,$false,$false,$false)
$s=$p.Slides(1)
$Q=[string][char]0x2019

# 1. ActiveX controls -> plain text boxes with the same names (typed into in Normal view).
$ctl=@(); foreach($sh in $s.Shapes){ if($sh.Type -eq 12){ $ctl+=$sh } }
foreach($sh in $ctl){
  $o=$sh.OLEFormat.Object; $n=$sh.Name; $txt=$o.Text; $al=$o.TextAlign; $fc=$o.ForeColor
  $L=$sh.Left;$T=$sh.Top;$W=$sh.Width;$H=$sh.Height; $z=$sh.ZOrderPosition
  $sh.Delete()
  # Inset 4 pt each side and at most 20 pt high so the yellow never touches a border or divider line.
  $nh=[math]::Min($H,20); $T=$T+($H-$nh)/2; $H=$nh; $L=$L+4; $W=$W-8
  $b=$s.Shapes.AddTextbox(1,$L,$T,$W,$H); $b.Name=$n; $b.Tags.Add('FIELD','1')
  $tf=$b.TextFrame; $tf.WordWrap=0; $tf.AutoSize=0; $tf.MarginLeft=1;$tf.MarginRight=1;$tf.MarginTop=0;$tf.MarginBottom=0; $tf.VerticalAnchor=3
  $b.Width=$W; $b.Height=$H; $b.Fill.Visible=-1; $b.Fill.Solid(); $b.Fill.ForeColor.RGB=0x99FFFF; $b.Line.Visible=0
  if($n -eq 'txtCity'){ $txt='Canada' }
  $r=$tf.TextRange; $r.Text=[string]$txt; $r.Font.Name='Arial'; $r.Font.Bold=-1; $r.Font.Color.RGB=$fc
  $r.Font.Size= if($H -ge 22){18}elseif($H -ge 16){11}else{9}
  $r.ParagraphFormat.Alignment= if($al -eq 1){1}else{2}
}

# 1b. Standard field layout: every value box is centred in its own cell (cells come from the slide's
# divider lines), same height per kind, pale fill, big red value. Small boxes (city, segment, level,
# ownership) share one smaller style. [name, centre x, top, width, height, font size, colour]
$red=0x0000FF; $ink=0x292929; $own=0x595959
$lay=@(
  @('txtCity',145.5,132.5,150,18,12,$ink), @('cboSegment',112,153.5,64,18,12,$ink), @('cboLevel',204,153.5,64,18,12,$ink),
  @('txtDuration',312,343,84,24,17,$red), @('txtEnding',412.6,343,84,24,17,$red),
  @('cboFleetOwn',555.4,199,104,14,10,$own), @('txtBus',699.6,187.5,112,24,17,$red), @('txtSpare',843.4,187.5,112,24,17,$red),
  @('txtKm',555.4,276.5,112,24,17,$red), @('txtAge',699.6,276.5,112,24,17,$red), @('txtModels',843.4,276.5,112,24,17,$red),
  @('txtInspection',555.4,344,112,24,17,$red),
  @('txtTechs',90.7,487,90,24,17,$red), @('txtStaff',199.4,487,90,24,17,$red),
  @('cboShopOwn',539,494,96,16,10,$own), @('txtBays',650.9,487,88,24,17,$red), @('txtSurface',758.6,487,92,24,17,$red), @('txtParking',866.8,487,88,24,17,$red))
foreach($f in $lay){ $b=$s.Shapes($f[0]); $b.Left=[single]($f[1]-$f[3]/2); $b.Top=[single]$f[2]; $b.Width=[single]$f[3]; $b.Height=[single]$f[4]
  $b.Fill.ForeColor.RGB=0xC8F4FF; $b.Line.Visible=0; $tf=$b.TextFrame; $tf.VerticalAnchor=3; $tf.WordWrap=0
  $r=$tf.TextRange; $r.Font.Size=[single]$f[5]; $r.Font.Bold=-1; $r.Font.Name='Arial'; $r.Font.Color.RGB=$f[6]; $r.ParagraphFormat.Alignment=2 }
# Sample values that read the same in both languages (units switch with the language button).
$s.Shapes('cboLevel').TextFrame.TextRange.Text='Bronze'; $s.Shapes('txtSpare').TextFrame.TextRange.Text='40'; $s.Shapes('txtDuration').TextFrame.TextRange.Text='10 years'; $s.Shapes('txtSurface').TextFrame.TextRange.Text="1 700 m$([char]0x00B2)"
# The slide number "1" at the right edge is not part of the card.
foreach($sh in @($s.Shapes)){ if($sh.Type -eq 14 -and $sh.PlaceholderFormat.Type -eq 13){ $sh.Delete() } }

# 2. Title: no "Chapter 2".
foreach($sh in $s.Shapes){ if($sh.HasTextFrame -and $sh.TextFrame.HasText -and $sh.TextFrame.TextRange.Text -like 'Chapter 2*'){ $sh.TextFrame.TextRange.Text='Workshop ID Card' } }
foreach($sh in $s.Shapes){ if($sh.HasTextFrame -and $sh.TextFrame.HasText){ $tr=$sh.TextFrame.TextRange
  [void]$tr.Replace('Elecric','Electric'); [void]$tr.Replace('Shorter cycle inspection','Shortest inspection cycle'); [void]$tr.Replace('Yearly km / bus','Avg. yearly km / bus') } }

# 3. Raster pictures -> SVG (same place, same name, same stacking order).
$swap=@{'Picture 10'='bus';'Picture 14'='hybrid';'Picture 18'='surface';'Picture 20'='bays';'Picture 22'='parking';'Image 7197'='shift-early';'Image 7208'='shift-late';'Image 7210'='shift-night';'Image 7202'='shift-day';'Image 75'='gears'}
# FleetLogo_1 / ShopLogo_1 keep the original Transdev logo file.
foreach($k in $swap.Keys){ $old=$s.Shapes($k); $z=$old.ZOrderPosition; $vis=$old.Visible
  $svg=Get-Content "$icons\$($swap[$k]).svg" -Raw; $m=[regex]::Match($svg,'viewBox="0 0 ([\d.]+) ([\d.]+)"'); $a=[double]$m.Groups[1].Value/[double]$m.Groups[2].Value
  $w=[math]::Min($old.Width,$old.Height*$a); $h=$w/$a
  $new=$s.Shapes.AddPicture("$icons\$($swap[$k]).svg",0,-1,$old.Left+($old.Width-$w)/2,$old.Top+($old.Height-$h)/2,$w,$h)
  foreach($tg in 1..$old.Tags.Count){ try{ $new.Tags.Add($old.Tags.Name($tg),$old.Tags.Value($tg)) }catch{} }
  $old.Delete(); $new.Name=$k; $new.Visible=$vis; while($new.ZOrderPosition -gt $z){ $new.ZOrder(3) } }

# 4. Workshop tools icon sits before the title, like the other section headers.
$tool=$s.Shapes('Graphique 7366'); $tool.Left=483; $tool.Top=386.5

# 4b. Tick boxes: one label per box. Inline groups: box then label on the same line, boxes in
# straight columns and rows. Stacked groups (shifts, days): label centred under its box.
$lf=$s.Shapes('Rectangle 96').TextFrame.TextRange.Font.Name
function Lbl($name,$text,$x,$y,$w,$size,$align){ $b=$s.Shapes.AddTextbox(1,$x,$y,$w,12); $b.Name="lbl_$name"
  $tf=$b.TextFrame; $tf.WordWrap=0; $tf.AutoSize=0; $tf.MarginLeft=0;$tf.MarginRight=0;$tf.MarginTop=0;$tf.MarginBottom=0; $tf.VerticalAnchor=3; $b.Width=[single]$w; $b.Height=[single]12; $b.Left=[single]$x; $b.Top=[single]$y
  $r=$tf.TextRange; $r.Text=$text; $r.Font.Name=$lf; $r.Font.Size=[single]$size; $r.Font.Bold=0; $r.Font.Color.RGB=9342606; $b.TextFrame2.TextRange.ParagraphFormat.Alignment=[int]$align }
# The red tick is a separate slide shape (tick_<name>): it moves by the same amount as its box.
function Box($name,$bx,$by){ $g=$s.Shapes("chk_$name"); $g.Left=[single]$bx; $g.Top=[single]$by; $tk=$s.Shapes("tick_$name"); $tk.Left=[single]($bx+1.2); $tk.Top=[single]($by+2.3) }
foreach($n in 'Rectangle 96','Groupe 99','Rectangle 7290','Rectangle 7291','Rectangle 7292','Rectangle 7293','Rectangle 61','Rectangle 62','Rectangle 7169','Rectangle 7171','Rectangle 7216','Rectangle 7225','Rectangle 7226'){ $s.Shapes($n).Delete() }
# Contract type: 2 columns x 3 rows.
$rows=152.5,174.5,196.5
$c1=@(@('Urban','Urban'),@('School','School'),@('Interurban','Interurban')); $c2=@(@('LongDistance','Long Distance'),@('Paratransit','Paratransit'),@('OnDemand','On demand'))
for($i=0;$i -lt 3;$i++){ Box $c1[$i][0] 270 $rows[$i]; Lbl $c1[$i][0] $c1[$i][1] 286 $rows[$i] 80 10.5 1; Box $c2[$i][0] 368 $rows[$i]; Lbl $c2[$i][0] $c2[$i][1] 384 $rows[$i] 84 10.5 1 }
# Operating conditions: box + label centred under each icon, same row.
Box 'Normal' 287 291; Lbl 'Normal' 'Normal' 303 291 60 11 1
Box 'Severe' 390 291; Lbl 'Severe' 'Severe' 406 291 60 11 1
# Energy mix: 4 equal columns, icon centred over its box + label.
$ex=636,707,778,849; $en=@(@('Diesel','Diesel','Graphique 7296'),@('CNG','CNG','Graphique 7319'),@('Hybrid','Hybrid','Picture 14'),@('Electric','Electric','Graphique 7321'))
for($i=0;$i -lt 4;$i++){ Box $en[$i][0] $ex[$i] 354.3; Lbl $en[$i][0] $en[$i][1] ($ex[$i]+15) 354.3 54 10 1; $ic=$s.Shapes($en[$i][2]); $ic.LockAspectRatio=-1; $ic.Height=24; $ic.Left=$ex[$i]+33-$ic.Width/2; $ic.Top=327 }
# Shifts: boxes on one row centred under their icons, labels centred below.
$sh4=@(@('Early','Early',280),@('Day','Day',331.5),@('Late','Late',388.5),@('Night','Night',439.5))
foreach($e in $sh4){ Box $e[0] ($e[2]-6) 446.5; Lbl $e[0] $e[1] ($e[2]-25) 460 50 11 2 }
# Operating days: same pattern.
$d3=@(@('MonFri','Monday to Friday',307,90),@('Saturday','Saturday',389,50),@('Sunday','Sunday',442,50))
foreach($e in $d3){ Box $e[0] ($e[2]-6) 486; Lbl $e[0] $e[1] ($e[2]-$e[3]/2) 500 $e[3] 10 2 }

# 5. Shapes whose French text needs a smaller font.
$p.Tags.Add('LANG','EN')
foreach($n in 'Rectangle 7258','Rectangle 7178'){ $sh=$s.Shapes($n); $sz=$sh.TextFrame.TextRange.Font.Size
  if($n -eq 'Rectangle 7258'){ $sh.Width=[single]136; $sz=[math]::Round($sz*0.92,1); $sh.TextFrame.TextRange.Font.Size=[single]$sz }; $sh.Tags.Add('SIZE_EN',[string]$sz); $f= if($n -eq 'Rectangle 7258'){[math]::Min($sz,9.5)}else{[math]::Round($sz*0.82,1)}; $sh.Tags.Add('SIZE_FR',[string]$f) }

# 6. VBA: fields are text boxes now; language switch, highlight, tick, print for the ribbon.
$wc=($p.VBProject.VBComponents | Where-Object Name -eq 'WorkshopCard').CodeModule
$code=$wc.Lines(1,$wc.CountOfLines)
function Cut([string]$c,[string]$from,[string]$to){ $a=$c.IndexOf($from); $b=$c.IndexOf($to); if($a -lt 0 -or $b -lt 0){throw "cut $from"}; $c.Substring(0,$a)+$c.Substring($b) }
function Rep([string]$c,[string]$a,[string]$b){ if(-not $c.Contains($a)){throw "missing: $a"}; $c.Replace($a,$b) }
$code=Rep $code 'ControlText = s.Shapes(name).OLEFormat.Object.Text' 'ControlText = s.Shapes(name).TextFrame.TextRange.Text'
$code=Rep $code "    FillCombos s`r`n" ''
$code=Cut $code "' ---------- Dropdown lists" "' ---------- Tick boxes"
$code=Rep $code 'Case "gold":' 'Case "gold", "or":'
$code=Rep $code 'Case "silver":' 'Case "silver", "argent":'
$code=Rep $code 'Public Const OWNERSHIP_OPTIONS As String = "Transdev|Public authority|Leased|Mixed|Other"' ('Public Const OWNERSHIP_OPTIONS As String = "Transdev|Public authority|Leased|Mixed|Other"'+"`r`n"+'Public Const OWNERSHIP_OPTIONS_FR As String = "Transdev|Autorité publique|Location|Mixte|Autre"')
$code=Rep $code '    opts = Split(OWNERSHIP_OPTIONS, "|")' ('    Dim fr() As String: fr = Split(OWNERSHIP_OPTIONS_FR, "|")'+"`r`n"+'    opts = Split(OWNERSHIP_OPTIONS, "|")')
$code=Rep $code 'If StrComp(opts(i), Trim$(choice), vbTextCompare) = 0 Then pick = i + 1' 'If StrComp(opts(i), Trim$(choice), vbTextCompare) = 0 Or StrComp(fr(i), Trim$(choice), vbTextCompare) = 0 Then pick = i + 1'
$code=Rep $code '    code = CountryCode(country)' ("    ' Country defaults to Canada when the field holds only a city (or nothing).`r`n    If CountryCode(country) = """" Then country = ""Canada""`r`n    code = CountryCode(country)")
$pairs=@('Workshop ID Card|Fiche atelier','Strategy & Asset management Pillar|Pilier Stratégie et gestion des actifs','Group Bus Maintenance Referential|Référentiel groupe de maintenance bus','No map for this country yet|Pas encore de carte pour ce pays',"Shortest inspection cycle|Cycle d${Q}inspection le plus court",'Avg. yearly km / bus|Kilomètre annuel en moyenne par bus','Monday to Friday|Lundi au vendredi',"Operating Conditions|Conditions d${Q}exploitation",'# Parking places|# Stationnements','Public authority|Autorité publique','Contract type|Type de contrat','# Technicians|# Techniciens','Long Distance|Longue distance','Average Age|Âge moyen','Total Staff|Effectif total','Energy Mix|Mix énergétique','Paratransit|Transport adapté','Interurban|Interurbain','On demand|À la demande','Ending in|Échéance','Ownership|Propriété','Saturday|Samedi','Sunday|Dimanche','# Models|# Modèles','% spare|% réserve','Duration|Durée','Contract|Contrat','Workshop|Atelier','Surface|Superficie','# Bays|# Baies','Electric|Électrique','Hybrid|Hybride','Severe|Sévères','Normal|Normales','School|Scolaire','Urban|Urbain','People|Personnel','Leased|Location','Mixed|Mixte','Other|Autre','Fleet|Flotte','Early|Tôt','Night|Nuit','Shift|Quarts','Late|Soir','Day|Jour','CNG|GNC')
# VBA allows 24 line continuations and ~1000 characters per line, so the list is appended in chunks.
$chunks=@(); $cur=''; foreach($pp in $pairs){ if(($cur.Length+$pp.Length) -gt 600){ $chunks+=$cur; $cur='' }; if($cur){$cur+='~'}; $cur+=$pp }; $chunks+=$cur
$lines=@(); for($i=0;$i -lt $chunks.Count;$i++){ $sep= if($i){'~'}else{''}; $lines+=('    t = t & "' + $sep + $chunks[$i].Replace('"','""') + '"') }
$plist=$lines -join "`r`n"
$code+=@"

' ---------- Language switch (ribbon "Fiche atelier / ID Card") ----------
' Each pair is "English|Français". Longer phrases come first so "Contract type" wins over "Contract".
Private Function Pairs() As Variant
    Dim t As String
$plist
    Pairs = Split(t, "~")
End Function

Public Sub SetLanguage(ByVal lang As String)
    Dim s As Slide: Set s = CardSlide()
    If s Is Nothing Then Exit Sub
    Dim cur As String: cur = ActivePresentation.Tags("LANG"): If cur = "" Then cur = "EN"
    If cur = lang Then Exit Sub
    Dim sh As Shape
    For Each sh In s.Shapes: TranslateShape sh, lang: Next sh
    ActivePresentation.Tags.Add "LANG", lang
End Sub

Private Sub TranslateShape(sh As Shape, ByVal lang As String)
    Dim it As Shape, pr As Variant, a As String, b As String, r As Object, n As Long
    If sh.Type = msoGroup Then
        For Each it In sh.GroupItems: TranslateShape it, lang: Next it
        Exit Sub
    End If
    ' Fields keep what was typed; only their unit words follow the language.
    If sh.Tags("FIELD") = "1" Then
        If sh.HasTextFrame Then
            For Each pr In Split("years|ans~Years|ans~year|an~Year|an~months|mois~month|mois", "~")
                a = Split(pr, "|")(IIf(lang = "FR", 0, 1)): b = Split(pr, "|")(IIf(lang = "FR", 1, 0))
                Set r = sh.TextFrame.TextRange.Replace(a, b, , msoTrue, msoTrue)
            Next pr
        End If
        Exit Sub
    End If
    If Not sh.HasTextFrame Then Exit Sub
    If Not sh.TextFrame.HasText Then Exit Sub
    For Each pr In Pairs()
        a = Split(pr, "|")(IIf(lang = "FR", 0, 1)): b = Split(pr, "|")(IIf(lang = "FR", 1, 0))
        n = 0
        Do
            ' Whole-word matching only works for single words; phrases and symbols match as typed.
            Set r = sh.TextFrame.TextRange.Replace(a, b, , msoTrue, IIf(a Like "*[ #%.&']*", msoFalse, msoTrue))
            n = n + 1
        Loop Until r Is Nothing Or n > 5
    Next pr
    If sh.Tags("SIZE_" & lang) <> "" Then sh.TextFrame.TextRange.Font.Size = Val(sh.Tags("SIZE_" & lang))
End Sub

' ---------- Fields: yellow on screen, transparent for printing ----------
Public Sub SetFieldFill(ByVal show As Boolean)
    Dim s As Slide, sh As Shape
    Set s = CardSlide(): If s Is Nothing Then Exit Sub
    For Each sh In s.Shapes
        If sh.Tags("FIELD") = "1" Then sh.Fill.Visible = IIf(show, msoTrue, msoFalse)
    Next sh
End Sub

Private Function FieldsShown() As Boolean
    Dim s As Slide, sh As Shape
    Set s = CardSlide(): If s Is Nothing Then Exit Function
    For Each sh In s.Shapes
        If sh.Tags("FIELD") = "1" Then FieldsShown = (sh.Fill.Visible = msoTrue): Exit Function
    Next sh
End Function

' ---------- Tick box: select a box on the slide, then click Tick ----------
Public Sub ToggleSelectedCheck()
    Dim g As Shape, it As Shape
    On Error Resume Next
    Set g = ActiveWindow.Selection.ShapeRange(1)
    On Error GoTo 0
    If g Is Nothing Then Exit Sub
    ' The tick is its own shape named tick_<key>; the box is the group chk_<key>.
    If Left(g.name, 5) = "tick_" Then g.Visible = Not g.Visible: Exit Sub
    If Left(g.name, 4) <> "chk_" Then MsgBox "Select a tick box first / Sélectionnez d'abord une case.": Exit Sub
    Set it = g.Parent.Shapes("tick_" & Mid(g.name, 5))
    it.Visible = Not it.Visible
End Sub

' ---------- Ribbon buttons ----------
Public Sub rbFR(control As IRibbonControl): SetLanguage "FR": End Sub
Public Sub rbEN(control As IRibbonControl): SetLanguage "EN": End Sub
Public Sub rbUpdate(control As IRibbonControl): RefreshAll: End Sub
Public Sub rbTick(control As IRibbonControl): ToggleSelectedCheck: End Sub
Public Sub rbHighlight(control As IRibbonControl): SetFieldFill Not FieldsShown(): End Sub
' Ctrl+P (or File) opens Backstage: the yellow is hidden there, so Print preview and paper show text only,
' and comes back when Backstage closes.
Public Sub rbBackShow(contextObject As Object)
    ActivePresentation.Tags.Add "FILLSHOWN", IIf(FieldsShown(), "1", "0")
    SetFieldFill False
End Sub
Public Sub rbBackHide(contextObject As Object)
    If ActivePresentation.Tags("FILLSHOWN") = "1" Then SetFieldFill True
End Sub
Public Sub rbPrint(control As IRibbonControl)
    RefreshAll
    Application.CommandBars.ExecuteMso "FilePrint"
End Sub
"@
$wc.DeleteLines(1,$wc.CountOfLines); $wc.AddFromString($code)
# The slide module only forwarded ActiveX events; those controls no longer exist.
$sm=($p.VBProject.VBComponents | Where-Object Type -eq 100).CodeModule
$sm.DeleteLines(1,$sm.CountOfLines); $sm.AddFromString("Option Explicit`r`n' Fields are plain text boxes now: see the WorkshopCard module and the ribbon tab.")
$p.Save(); $p.Close(); $app.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($app) | Out-Null

# 7. Ribbon tab, added inside the file.
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
$ui=@'
<customUI xmlns="http://schemas.microsoft.com/office/2009/07/customui">
  <ribbon><tabs><tab id="tabCard" label="Fiche atelier / ID Card">
    <group id="gLang" label="Langue / Language">
      <button id="bFR" label="Français" size="large" imageMso="FileSaveAsOtherFormats" onAction="rbFR"/>
      <button id="bEN" label="English" size="large" imageMso="FileSaveAsOtherFormats" onAction="rbEN"/>
    </group>
    <group id="gCard" label="Fiche / Card">
      <button id="bUpd" label="Mettre à jour / Update" size="large" imageMso="Refresh" onAction="rbUpdate" screentip="Map, % spare, medal and logos follow the fields"/>
      <button id="bTick" label="Cocher / Tick" size="large" imageMso="AcceptInvitation" onAction="rbTick" screentip="Select a tick box on the slide, then click"/>
      <button id="bHi" label="Surligner / Highlight" size="large" imageMso="TextHighlightColorPicker" onAction="rbHighlight" screentip="Show or hide the yellow behind the fields"/>
      <button id="bPrint" label="Imprimer / Print" size="large" imageMso="FilePrint" onAction="rbPrint" screentip="Removes the yellow, then opens Print"/>
    </group>
  </tab></tabs></ribbon>
  <backstage onShow="rbBackShow" onHide="rbBackHide"/>
</customUI>
'@
$z=[System.IO.Compression.ZipFile]::Open($out,'Update')
$e=$z.CreateEntry('customUI/customUI14.xml'); $w=New-Object System.IO.StreamWriter($e.Open(),(New-Object System.Text.UTF8Encoding($false))); $w.Write($ui); $w.Close()
$re=$z.GetEntry('_rels/.rels'); $rd=New-Object System.IO.StreamReader($re.Open()); $rels=$rd.ReadToEnd(); $rd.Close(); $re.Delete()
$rels=$rels.Replace('</Relationships>','<Relationship Id="rIdCardUI" Type="http://schemas.microsoft.com/office/2007/relationships/ui/extensibility" Target="customUI/customUI14.xml"/></Relationships>')
$e=$z.CreateEntry('_rels/.rels'); $w=New-Object System.IO.StreamWriter($e.Open(),(New-Object System.Text.UTF8Encoding($false))); $w.Write($rels); $w.Close()
$z.Dispose()
"built $out"
