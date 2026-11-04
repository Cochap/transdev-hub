// SessionStart hook: start the skill-routing upkeep in the background and return immediately.
// Prints nothing, never delays or blocks the session.
const { spawn } = require('child_process');
const path = require('path');
try {
  const root = process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, '..', '..');
  const p = spawn('powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(root, '5-brain/scripts/sync-skill-routing.ps1')],
    { detached: true, stdio: 'ignore', windowsHide: true });
  p.unref();
} catch (e) { /* silent */ }
