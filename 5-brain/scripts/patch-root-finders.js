// One-off (2026-10-21): make scripts independent of how deep they sit, so folders can move.
// Each script finds the brain root by walking up to CLAUDE.md. Safe to run again (skips patched files).
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');
const JSFIND = "(() => { let d = __dirname; while (!require('fs').existsSync(require('path').join(d, 'CLAUDE.md')) && require('path').dirname(d) !== d) d = require('path').dirname(d); return d; })()";
const PSFIND = "$root = $PSScriptRoot; while ($root -and -not (Test-Path (Join-Path $root 'CLAUDE.md'))) { $root = Split-Path $root -Parent }";
const edits = {
  '.claude/hooks/skill-model-route.js': [["path.join(root, 'scripts', 'model-router.ps1')", "path.join(root, 'scripts/model-router.ps1')"]],
  '.claude/hooks/sync-skill-routing.js': [["path.join(root, 'scripts', 'sync-skill-routing.ps1')", "path.join(root, 'scripts/sync-skill-routing.ps1')"]],
  '.claude/hooks/session-start.js': [["path.join(hub, 'hq', 'server.js')", "path.join(hub, 'hq/server.js')"]],
  'hq/server.js': [
    ["const HUB = path.resolve(__dirname, '..');", `const HUB = ${JSFIND};`],
    ["path.join(HUB, 'tests', 'run-golden.ps1')", "path.join(HUB, 'tests/run-golden.ps1')"],
    ["path.join(HUB, 'tests', 'results')", "path.join(HUB, 'tests/results')"],
    ["path.join(HUB, 'tests', 'results', golden.f)", "path.join(HUB, 'tests/results', golden.f)"],
    ["path.join(HUB, 'docs', 'continuity-log.md')", "path.join(HUB, 'docs/continuity-log.md')"],
    ["path.join(HUB, 'docs', 'test-ledger.md')", "path.join(HUB, 'docs/test-ledger.md')"],
    ["path.join(HUB, 'docs')", "path.join(HUB, 'docs/')"]],
  'tests/check-citations.js': [["path.join(__dirname, '..', '.env')", `path.join(${JSFIND}, '.env')`]],
  'rebuild/v1-citation-fix/apply-citation-fields.js': [["const root = path.join(__dirname, '..', '..');", `const root = ${JSFIND};`]],
  'tests/ask-agent.ps1': [["$envPath = Join-Path $PSScriptRoot '..\\.env'", PSFIND + "\n$envPath = Join-Path $root '.env'"]],
  'tests/run-golden.ps1': [["$root = Split-Path $PSScriptRoot -Parent", PSFIND]],
  'tests/run-pilot-tests.ps1': [["$root = Split-Path $PSScriptRoot -Parent", PSFIND]],
  'scripts/build-skill-manifest.ps1': [["$root = Split-Path -Parent $PSScriptRoot", PSFIND]],
  'scripts/classify-all-skills.ps1': [["$root = Split-Path -Parent $PSScriptRoot", PSFIND]],
  'scripts/sync-skill-routing.ps1': [["$root = Split-Path -Parent $PSScriptRoot", PSFIND]],
  'scripts/model-router.ps1': [["$root    = Split-Path -Parent $PSScriptRoot", PSFIND]],
  'scripts/setup-openrouter.ps1': [["(Split-Path -Parent $PSScriptRoot)", "(& { $r = $PSScriptRoot; while ($r -and -not (Test-Path (Join-Path $r 'CLAUDE.md'))) { $r = Split-Path $r -Parent }; $r })"]],
  'scripts/brain.js': [["const HUB = path.resolve(__dirname, '..');", `const HUB = ${JSFIND};`]],
  'scripts/eod-gather-sessions.js': [["path.join(__dirname, '..', 'logs', 'eod', day)", `path.join(${JSFIND}, 'logs/eod', day)`]],
  'scripts/brain-move.js': [["path.resolve(opt('root', path.join(__dirname, '..')))", `path.resolve(opt('root', ${JSFIND}))`]]
};
for (const [rel, reps] of Object.entries(edits)) {
  const f = path.join(R, rel); if (!fs.existsSync(f)) { console.log('missing', rel); continue; }
  let t = fs.readFileSync(f, 'utf8'); const bom = t.charCodeAt(0) === 0xFEFF; let n = 0;
  for (const [a, b] of reps) { if (t.includes(a)) { t = t.split(a).join(b); n++; } else if (!t.includes(b)) console.log('NOT FOUND in', rel, ':', a.slice(0, 60)); }
  fs.writeFileSync(f, t, bom ? { encoding: 'utf8' } : 'utf8'); console.log(rel, n + '/' + reps.length);
}
