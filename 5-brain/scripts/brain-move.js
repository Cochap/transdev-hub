// Safe move + relink for the second brain. Plain Node, no installs.
//   node 5-brain/scripts/brain-move.js plan  [--moves 5-brain/routers/moves.json] [--root DIR] [--external]
//   node 5-brain/scripts/brain-move.js apply [same]   backs up, moves, rewrites references, rebuilds routers, re-checks
//   node 5-brain/scripts/brain-move.js check [--root DIR]   lists path references that point to nothing
//   node 5-brain/scripts/brain-move.js undo  --run <stamp>   restores the backup and moves everything back
// How it works ("resolve, then rewrite"): every path-looking token in every text file is resolved against the
// file's own folder and against the brain root. A token is only rewritten if it points at something that exists
// AND that something (or one of its parent folders) is in the moves list, so URLs and prose never change.
// Anything ambiguous is reported, never guessed. Code that builds paths from pieces is listed for review.
const fs = require('fs');
const os = require('os');
const path = require('path');

const args = process.argv.slice(2);
const cmd = args[0] || 'plan';
const opt = (n, d) => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : d; };
const ROOT = path.resolve(opt('root', (() => { let d = __dirname; while (!require('fs').existsSync(require('path').join(d, 'CLAUDE.md')) && require('path').dirname(d) !== d) d = require('path').dirname(d); return d; })()));
const REAL_HUB = 'C:\\TRANSDEV HUB';
const MOVES_FILE = path.resolve(ROOT, opt('moves', '5-brain/routers/moves.json'));
const WITH_EXTERNAL = path.resolve(ROOT).toLowerCase() === path.resolve('C:/TRANSDEV HUB').toLowerCase() && !args.includes('--no-external'); // memory, scheduled tasks, ZBB: only on the real brain
const TEXT = new Set(['.md', '.json', '.js', '.mjs', '.cjs', '.ts', '.ps1', '.cmd', '.bat', '.sh', '.html', '.htm', '.txt', '.yml', '.yaml', '.toml']);
const SKIP_DIRS = new Set(['node_modules', '.git', '__pycache__']);
const norm = (p) => p.replace(/\\/g, '/');
const same = (a, b) => process.platform === 'win32' ? norm(a).toLowerCase() === norm(b).toLowerCase() : norm(a) === norm(b);
const under = (child, parent) => { const c = norm(child).toLowerCase(), p = norm(parent).toLowerCase(); return c === p || c.startsWith(p.endsWith('/') ? p : p + '/'); };

// ---- config: moves, skip folders, extra scan roots
const cfg = JSON.parse(fs.readFileSync(MOVES_FILE, 'utf8').replace(/^\uFEFF/, ''));
const moves = cfg.moves.map((m) => ({ from: path.resolve(ROOT, m.from), to: path.resolve(ROOT, m.to) }));
const skipOld = (cfg.skip || []).map((s) => path.resolve(ROOT, s));
let skipRel = skipOld; // widened below with the moved locations, once the moves are known
const scanRoots = [{ dir: ROOT, external: false }, ...(WITH_EXTERNAL ? (cfg.external || []).map((e) => ({ dir: e.dir, external: true, absOnly: !!e.absOnly })) : [])];

const mapPath = (abs) => { // new location of an old absolute path
  let best = null;
  for (const m of moves) if (under(abs, m.from) && (!best || m.from.length > best.from.length)) best = m;
  return best ? path.join(best.to, path.relative(best.from, abs)) : abs;
};
skipRel = [...skipOld, ...skipOld.map(mapPath)];
const existsCache = new Map();
const dirCache = new Map();
const exists = (p) => { // exact-case check: Windows is case-insensitive, which would make 4-learning/LEARNING.md "exist" as learning.md
  const k = norm(p); if (existsCache.has(k)) return existsCache.get(k);
  let ok = false;
  const parent = path.dirname(p);
  if (parent === p) ok = fs.existsSync(p);
  else {
    if (!dirCache.has(parent)) { try { dirCache.set(parent, new Set(fs.readdirSync(parent))); } catch { dirCache.set(parent, null); } }
    const names = dirCache.get(parent); ok = names ? names.has(path.basename(p)) : false;
    if (ok === false && names === null && fs.existsSync(p)) ok = true;
  }
  existsCache.set(k, ok); return ok;
};

function listFiles(dir, out = []) {
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const full = path.join(dir, e.name);
    if (SKIP_DIRS.has(e.name) || skipRel.some((s) => same(s, full))) continue;
    if (e.isDirectory()) listFiles(full, out); else if (TEXT.has(path.extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

// ---- tokens
const TOKEN = /(?:[A-Za-z]:[\\/](?:TRANSDEV HUB[\\/])?|\.{1,2}[\\/]|~[\\/])?(?:[\w.\-@]+[\\/])*[\w.\-@*]*[\w*]/g;
function resolveToken(tok, fileDir, rootBase) {
  // returns {abs, style, prefixLen} or null; style says how to write it back
  let t = tok; let suffix = '';
  const m = t.match(/^(.*?)((?::\d+(?:-\d+)?)?(?:#.*)?)$/); if (m) { t = m[1]; suffix = m[2]; }
  if (!/[\\/]/.test(t) && !/\.[A-Za-z0-9]{1,5}$/.test(t)) return null; // bare word without extension: prose
  if (/^ROUTER(-\d+)?\.md$/.test(t)) return null;                        // router files are rebuilt, never relinked
  const backslash = t.includes('\\') && !t.includes('/');
  let candidates = [];
  const abs = t.match(/^([A-Za-z]:)[\\/]/);
  if (abs) {
    if (!/^C:[\\/]TRANSDEV HUB([\\/]|$)/i.test(t)) return null; // only our own brain is relinked
    candidates.push({ abs: path.resolve(ROOT, t.replace(/^C:[\\/]TRANSDEV HUB[\\/]?/i, '')), style: 'abs' });
  } else if (/^\.{1,2}[\\/]/.test(t)) { if (!fileDir) return null; candidates.push({ abs: path.resolve(fileDir, t), style: 'rel' }); }
  else {
    if (fileDir) candidates.push({ abs: path.resolve(fileDir, t), style: 'rel' });
    candidates.push({ abs: path.resolve(rootBase, t), style: 'root' });
  }
  const live = []; // keep candidates whose longest existing prefix is at least one real segment
  for (const c of candidates) {
    let p = c.abs; let rest = [];
    const globIdx = norm(p).indexOf('*'); if (globIdx > -1) { const cut = norm(p).slice(0, globIdx); p = path.dirname(cut + 'x'); rest = [norm(c.abs).slice(p.length + 1)]; if (!rest[0]) rest = []; }
    while (!exists(p)) { const parent = path.dirname(p); if (parent === p) break; rest.unshift(path.basename(p)); p = parent; }
    if (!exists(p)) continue;
    if (c.style !== 'abs' && under(rootBase, p) && !same(rootBase, p) === false) continue; // resolved only to the root itself
    if (c.style !== 'abs' && same(p, rootBase)) continue;
    if (c.style === 'rel' && same(p, fileDir)) continue;
    if (rest.length > 1 && c.style !== 'abs' && !rest.every(Boolean)) continue;
    live.push({ ...c, existing: p, rest });
  }
  if (!live.length) return null;
  live.sort((a, b) => a.rest.length - b.rest.length); // the reading that resolves furthest wins
  const best = live.filter((c) => c.rest.length === live[0].rest.length);
  const uniq = new Map(best.map((c) => [norm(c.existing).toLowerCase() + '|' + c.rest.join('/'), c]));
  if (uniq.size > 1) return { ambiguous: true };
  return { ...best[0], backslash, suffix, tok: t, tail: best[0].rest.join(backslash ? '\\' : '/') };
}

function rewriteToken(r, oldFile, newFile) {
  const newExisting = mapPath(r.existing);
  const full = r.tail ? path.join(newExisting, r.tail) : newExisting;
  let out;
  if (r.style === 'abs') out = REAL_HUB + '\\' + path.relative(ROOT, full);
  else if (r.style === 'rel') { out = path.relative(path.dirname(newFile), full); if (!/^\.{1,2}[\\/]/.test(r.tok) && !out.startsWith('..')) { /* keep bare relative */ } else if (!out.startsWith('..')) out = './' + out; }
  else out = path.relative(ROOT, full);
  out = r.backslash ? out.replace(/\//g, '\\') : norm(out);
  if (/[\\/]$/.test(r.tok) && !/[\\/]$/.test(out)) out += r.backslash ? '\\' : '/';
  if (r.style === 'abs' && !r.backslash) out = norm(out).replace('C:/TRANSDEV HUB/', 'C:/TRANSDEV HUB/');
  if (r.style === 'abs' && !r.backslash) out = norm(out);
  return out + r.suffix;
}

// ---- scanning
function scan() {
  const edits = []; const ambiguous = []; const moving = []; const risky = []; const unresolved = [];
  const seen = new Set();
  for (const sr of scanRoots) {
    for (const file of listFiles(sr.dir)) {
      if (seen.has(file.toLowerCase())) continue; seen.add(file.toLowerCase());
      if (/[\\/](logs[\\/]eod|\.claude[\\/]brain-moves)[\\/]/i.test(file) || /[\\/]docs[\\/]archive[\\/]/i.test(file) || /ROUTER(-\d+)?\.md$/.test(file) || same(file, MOVES_FILE) || /patch-root-finders\.js$/.test(file)) continue;
      const newFile = mapPath(file); if (!same(file, newFile)) moving.push(file);
      let text; try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
      if (text.length > 3e6) continue;
      const fileDir = sr.external ? null : path.dirname(file);
      const base = ROOT;
      let changed = false;
      const out = text.replace(TOKEN, (tok, offset) => {
        const prev = text[offset - 1];
        if (prev && /[A-Za-z0-9_\-@]/.test(prev)) return tok;           // middle of a word
        if (prev === '/' && text[offset - 2] === '/' ) return tok;          // URL
        if (/:\/\//.test(text.slice(Math.max(0, offset - 12), offset + 1))) return tok;
        if (sr.absOnly && !/^[A-Za-z]:/.test(tok)) return tok;
        // "$root\x" is brain-root-relative only in the tool folders where $root is the brain root
        const rootVar = /\$\{?(root|hub|HUB)\}?[\\/]$/.test(text.slice(Math.max(0, offset - 8), offset));
        const forceRoot = rootVar && /^(scripts|tests|hq)$/i.test(path.relative(ROOT, file).split(path.sep)[0]);
        if ((prev === '/' || prev === '\\') && !forceRoot) return tok;     // middle of a longer path or a URL path such as /docs/search
        const r = resolveToken(tok, forceRoot ? null : fileDir, base);
        if (!r) return tok;
        if (r.ambiguous) { ambiguous.push({ file, tok }); return tok; }
        // a path that does not exist yet is only rewritten in code (planned output files), never in prose
        const isCode = /\.(js|mjs|cjs|ts|ps1|cmd|bat|sh)$/i.test(file);
        const last = r.rest.length ? r.rest[r.rest.length - 1] : '';
        const planned = isCode && r.rest.length === 1 && (/\.[A-Za-z0-9]{1,5}$/.test(last) || /[_-]$|YYYY|[$\{]/.test(last));
        if (r.rest.length && !planned && !/[*]/.test(tok) && !/[\\/]$/.test(tok)) { unresolved.push({ file, tok }); return tok; }
        const rep = rewriteToken(r, file, newFile);
        const tokNoSuffix = tok.slice(0, tok.length);
        if (rep === tokNoSuffix || (r.suffix && rep === tok)) return tok;
        edits.push({ file, from: tok, to: rep }); changed = true; return rep;
      });
      if (changed) edits.filter((e) => e.file === file).length && (edits.find((e) => e.file === file).text = out);
      // code that builds paths from pieces is invisible to the token scan: list it for review
      if (/\.(js|mjs|cjs|ps1|cmd|bat|sh)$/i.test(file) && /__dirname|\$PSScriptRoot|%~dp0|process\.cwd|Join-Path|path\.join|path\.resolve/.test(text)) {
        const movedNames = moves.map((m) => path.basename(m.from));
        const hit = movedNames.some((n) => new RegExp(`['"\`]${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`).test(text));
        if (hit || moving.includes(file)) risky.push(file);
      }
    }
  }
  return { edits, ambiguous, moving, risky, unresolved };
}

function applyEdits(edits) { // rewrite files from scan results (re-scan per file to keep text)
  const byFile = new Map();
  for (const e of edits) if (e.text !== undefined) byFile.set(e.file, e.text);
  return byFile;
}

// ---- check: references that point at nothing
function check() {
  const names = new Set(fs.readdirSync(ROOT).filter((n) => !n.startsWith('.')));
  for (const m of moves) { names.add(path.basename(m.from)); names.add(path.basename(m.to)); }
  const broken = [];
  for (const file of listFiles(ROOT)) {
    if (/[\\/](logs[\\/]eod|\.claude[\\/]brain-moves)[\\/]/i.test(file) || /[\\/]docs[\\/]archive[\\/]/i.test(file) || /ROUTER(-\d+)?\.md$/.test(file) || /(moves\.json|patch-root-finders\.js)$/.test(file)) continue;
    let text; try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
    for (const mm of text.matchAll(TOKEN)) {
      const tok = mm[0]; const prev = text[mm.index - 1];
      if (prev && /[A-Za-z0-9_\-@]/.test(prev)) continue;
      if (/:\/\//.test(text.slice(Math.max(0, mm.index - 12), mm.index + 1))) continue;
      const first = tok.replace(/^C:[\\/]TRANSDEV HUB[\\/]/i, '').split(/[\\/]/)[0];
      if (!/[\\/]/.test(tok) || !names.has(first) || tok.includes('*')) continue;
      const rel = tok.replace(/^C:[\\/]TRANSDEV HUB[\\/]/i, '').replace(/(:\d+(-\d+)?)?(#.*)?$/, '');
      if (!exists(path.resolve(ROOT, rel)) && !exists(path.resolve(path.dirname(file), rel))) broken.push(`${path.relative(ROOT, file)}  ->  ${tok}`);
    }
  }
  return [...new Set(broken)];
}

// ---- commands
function plan() {
  for (const m of moves) { if (!exists(m.from)) { console.log('MISSING source: ' + m.from); process.exitCode = 2; } else if (exists(m.to)) { console.log('TARGET EXISTS: ' + m.to); process.exitCode = 2; } }
  const s = scan();
  const files = new Set(s.edits.map((e) => e.file));
  console.log(`moves: ${moves.length}   files that move: ${s.moving.length}   references to rewrite: ${s.edits.length} in ${files.size} files`);
  console.log(`unresolved prose/URL-like paths left alone: ${s.unresolved.length}`);
  console.log(`ambiguous (left alone, needs a look): ${s.ambiguous.length}`);
  s.ambiguous.slice(0, 25).forEach((a) => console.log(`   ${path.relative(ROOT, a.file)}  ${a.tok}`));
  console.log(`code that builds paths from pieces (review by hand): ${s.risky.length}`);
  s.risky.forEach((f) => console.log('   ' + path.relative(ROOT, f)));
  const sample = new Map(); for (const e of s.edits) { const k = `${e.from}  =>  ${e.to}`; sample.set(k, (sample.get(k) || 0) + 1); }
  console.log(`distinct rewrites: ${sample.size} (first 40)`);
  [...sample].slice(0, 40).forEach(([k, n]) => console.log(`   x${n}  ${k}`));
  if (opt('show')) s.edits.filter((e) => e.file.includes(opt('show'))).forEach((e) => console.log(`   [${path.relative(ROOT, e.file)}] ${e.from}  =>  ${e.to}`));
  fs.mkdirSync(path.join(ROOT, '.claude', 'brain-moves'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, '.claude', 'brain-moves', 'last-plan.txt'), [...sample].map(([k, n]) => `x${n}  ${k}`).join('\n'));
  return s;
}

const cp = require('child_process');
function remap(line) { // a smoke command written with the paths as they will be after the move
  return line.replace(TOKEN, (tok, offset) => {
    const prev = line[offset - 1]; if (prev && /[A-Za-z0-9_\-@]/.test(prev)) return tok;
    const r = resolveToken(tok, null, ROOT); return r && !r.ambiguous ? rewriteToken(r, '', path.join(ROOT, 'x')) : tok;
  });
}
function runSmoke(list) {
  return list.map((s) => { try { cp.execSync(s, { cwd: ROOT, stdio: 'pipe', timeout: 120000 }); return { s, ok: true }; } catch (e) { return { s, ok: false, why: String(e.stderr || e.stdout || e.message).slice(0, 200) }; } });
}
const keyOf = (e) => { const [f, tk] = e.split('  ->  '); return path.basename(f) + '|' + tk.split(/[\\/]/).filter(Boolean).slice(-2).join('/'); };
function apply() {
  const smokeList = cfg.smoke || [];
  const smokeAfterCmds = smokeList.map(remap); // must be worked out while the old paths still exist
  const smokeBefore = runSmoke(smokeList);
  console.log('smoke tests before: ' + smokeBefore.map((x) => (x.ok ? 'PASS ' : 'FAIL ') + x.s).join(' | '));
  const before = check();
  const s = plan();
  if (process.exitCode === 2) { console.log('Stopped: fix the problems above first.'); return; }
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const runDir = path.join(ROOT, '.claude', 'brain-moves', stamp); const backup = path.join(runDir, 'backup');
  fs.mkdirSync(backup, { recursive: true });
  const byFile = applyEdits(s.edits); const modified = [];
  for (const [file, text] of byFile) { // backup original, write new text (still at the old location)
    const rel = file.replace(/[:\\/]/g, '_'); fs.copyFileSync(file, path.join(backup, rel)); fs.writeFileSync(file, text); modified.push({ file, backup: rel });
  }
  const done = [];
  try {
    for (const m of moves) { fs.mkdirSync(path.dirname(m.to), { recursive: true }); fs.renameSync(m.from, m.to); done.push(m); }
  } catch (e) {
    console.log('MOVE FAILED: ' + e.message + ' — rolling back'); fs.writeFileSync(path.join(runDir, 'undo.json'), JSON.stringify({ moves: done, modified }, null, 1)); undo(stamp); return;
  }
  fs.writeFileSync(path.join(runDir, 'undo.json'), JSON.stringify({ moves: done, modified }, null, 1));
  existsCache.clear(); dirCache.clear();
  console.log(`\nDONE. run id: ${stamp}  (undo: node 5-brain/scripts/brain-move.js undo --run ${stamp})`);
  const after = check();
  console.log(`broken references before: ${before.length}   after: ${after.length}`);
  const smokeAfter = runSmoke(smokeAfterCmds);
  for (const c of cfg.rmdirEmpty || []) { try { fs.rmdirSync(path.resolve(ROOT, c)); } catch {} } // only removes folders left empty by the moves
  for (const c of cfg.cleanup || []) { try { fs.rmSync(mapPath(path.resolve(ROOT, c)), { recursive: true, force: true }); } catch {} }
  const regress = smokeAfter.filter((x, i) => smokeBefore[i].ok && !x.ok);
  console.log('smoke tests after:  ' + smokeAfter.map((x) => (x.ok ? 'PASS ' : 'FAIL ') + x.s).join(' | '));
  const beforeKeys = new Set(before.map(keyOf)); const newBroken = after.filter((x) => !beforeKeys.has(keyOf(x)));
  if (regress.length || newBroken.length) {
    console.log('REGRESSION -> rolling everything back');
    regress.forEach((x) => console.log('   ' + x.s + ' :: ' + x.why));
    newBroken.slice(0, 60).forEach((x) => console.log('   new broken: ' + x));
    undo(stamp); return;
  }
  console.log('All checks passed. Now rebuild the routers (node <scripts folder>/brain.js build).');
}

function undo(run) {
  const runDir = path.join(ROOT, '.claude', 'brain-moves', run || opt('run'));
  const u = JSON.parse(fs.readFileSync(path.join(runDir, 'undo.json'), 'utf8'));
  for (const m of [...u.moves].reverse()) if (exists(m.to) || fs.existsSync(m.to)) { fs.mkdirSync(path.dirname(m.from), { recursive: true }); fs.renameSync(m.to, m.from); }
  for (const f of u.modified) fs.copyFileSync(path.join(runDir, 'backup', f.backup), f.file);
  console.log(`undone: ${u.moves.length} move(s), ${u.modified.length} file(s) restored`);
}

if (cmd === 'plan') plan();
else if (cmd === 'apply') apply();
else if (cmd === 'undo') undo();
else if (cmd === 'check') { const b = check(); console.log(`broken references: ${b.length}`); b.slice(0, 200).forEach((x) => console.log('  ' + x)); process.exitCode = b.length ? 1 : 0; }
else console.log('usage: plan | apply | check | undo --run <stamp>');
