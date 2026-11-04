Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public class BookmarkMouse { [DllImport("user32.dll")] public static extern bool SetCursorPos(int x,int y); [DllImport("user32.dll")]public static extern void mouse_event(uint f,uint x,uint y,uint d,UIntPtr e); [DllImport("user32.dll")]public static extern void keybd_event(byte k,byte s,uint f,UIntPtr e); [DllImport("user32.dll")]public static extern bool GetWindowRect(IntPtr h,out RECT r); [StructLayout(LayoutKind.Sequential)]public struct RECT{public int Left,Top,Right,Bottom;} }'
$chromeProcess=Get-Process chrome|Where-Object {$_.MainWindowHandle -ne 0}|Select-Object -First 1
$chromeShell=New-Object -ComObject WScript.Shell
[void]$chromeShell.AppActivate($chromeProcess.Id)
$chromeRect=[BookmarkMouse+RECT]::new()
[void][BookmarkMouse]::GetWindowRect($chromeProcess.MainWindowHandle,[ref]$chromeRect)
function Click-BookmarkUI($x,$y){
 [void][BookmarkMouse]::SetCursorPos(($chromeRect.Left+$x),($chromeRect.Top+$y))
 [BookmarkMouse]::mouse_event(2,0,0,0,[UIntPtr]::Zero)
 [BookmarkMouse]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
}
function Keys-BookmarkUI($keys){[Windows.Forms.SendKeys]::SendWait($keys)}
function CtrlClick-BookmarkUI($x,$y){
 [BookmarkMouse]::keybd_event(17,0,0,[UIntPtr]::Zero)
 Click-BookmarkUI $x $y
 [BookmarkMouse]::keybd_event(17,0,2,[UIntPtr]::Zero)
}
function Capture-BookmarkUI {
 Start-Sleep -Milliseconds 300
 $bitmap=[Drawing.Bitmap]::new(($chromeRect.Right-$chromeRect.Left),($chromeRect.Bottom-$chromeRect.Top))
 $graphics=[Drawing.Graphics]::FromImage($bitmap)
 $graphics.CopyFromScreen($chromeRect.Left,$chromeRect.Top,0,0,$bitmap.Size)
 $bitmap.Save('C:\TRANSDEV HUB\chrome-window.png')
 $graphics.Dispose();$bitmap.Dispose()
}
