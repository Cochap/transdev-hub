// PreToolUse hook on the Skill tool: every time Claude invokes ANY skill, run the model router
// (pin / Jev / switch-off / no-key fallback) and tell Claude which size to use for helper agents.
// It never blocks the skill: on any error it exits 0 with no output.
const { spawnSync } = require('child_process');
const path = require('path');

let raw = '';
process.stdin.on('data', d => (raw += d));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw.replace(/^﻿/, ''));
    const skill = String((input.tool_input && input.tool_input.skill) || '').trim();
    if (!skill) return;
    const args = String((input.tool_input && input.tool_input.args) || '').slice(0, 400);
    const root = process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, '..', '..');
    const script = path.join(root, 'scripts/model-router.ps1');
    const r = spawnSync(
      'powershell.exe',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-Skill', skill, '-Task', args || '(no arguments)'],
      { encoding: 'utf8', timeout: 25000, windowsHide: true }
    );
    const tier = (r.stdout || '').trim().split(/\s+/).pop();
    if (!['haiku', 'sonnet', 'opus'].includes(tier)) return;
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext:
          `MODEL ROUTING for skill "${skill}": use model="${tier}" for every helper agent this skill launches ` +
          `(logged in logs/model-routing.jsonl). Switch: scripts/model-router.ps1 -Switch on|off.`
      }
    }));
  } catch (e) { /* never block a skill */ }
});
