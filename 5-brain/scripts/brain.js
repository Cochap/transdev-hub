// Second-brain router builder + audit. Plain text only, no database.
//   node 5-brain/scripts/brain.js build   create/refresh ROUTER.md files (keeps hand-written descriptions)
//   node 5-brain/scripts/brain.js audit   list files/folders with no router entry, and stale entries (exit 1 if any)
// Config: 5-brain/routers/brain.config.json. Every folder gets a ROUTER.md listing every child, one line each.
// A router longer than PAGE entries continues in ROUTER-2.md, ROUTER-3.md. Units (third-party clones,
// generated output, skill folders) are routed as one line and not entered.
const fs = require('fs');
const path = require('path');

const HUB = (() => { let d = __dirname; while (!require('fs').existsSync(require('path').join(d, 'CLAUDE.md')) && require('path').dirname(d) !== d) d = require('path').dirname(d); return d; })();
const cfg = JSON.parse(fs.readFileSync(path.join(HUB, '5-brain/routers/brain.config.json'), 'utf8').replace(/^﻿/, ''));
const MODE = process.argv[2] || 'audit';
const PAGE = cfg.page || 45;
const SKIP = new Set(cfg.skip);
const isRouter = (n) => /^ROUTER(-\d+)?\.md$/.test(n);
const norm = (p) => p.replace(/\\/g, '/');
const SECRET = /^\.env|\.pem$|\.key$|secret/i;

const report = { added: 0, removed: 0, created: 0, unrouted: [], stale: [] };

function readHead(file, n = 4000) {
  try {
    const fd = fs.openSync(file, 'r'); const b = Buffer.alloc(n);
    const len = fs.readSync(fd, b, 0, n, 0); fs.closeSync(fd);
    return b.slice(0, len).toString('utf8').replace(/^﻿/, '');
  } catch { return ''; }
}
const clip = (s, n = 95) => { s = s.replace(/\s+/g, ' ').replace(/[`|]/g, "'").trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

function describeFile(full, name) {
  if (SECRET.test(name)) return 'secrets/config file (content never read)';
  const ext = path.extname(name).toLowerCase();
  const head = readHead(full);
  if (ext === '.md') {
    const fm = head.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fm) { const d = fm[1].match(/^description:\s*(.+)$/m); if (d) return clip(d[1].replace(/^["']|["']$/g, '')); }
    const h = head.match(/^#\s+(.+)$/m); if (h) return clip(h[1]);
    const l = head.split(/\r?\n/).find((x) => x.trim() && !x.startsWith('---')); return l ? clip(l) : 'markdown note';
  }
  if (ext === '.html' || ext === '.htm') { const t = head.match(/<title[^>]*>([^<]+)/i); return t ? clip(t[1]) : 'HTML page'; }
  if (['.js', '.mjs', '.cjs', '.ts', '.ps1', '.py', '.sh', '.cmd', '.bat'].includes(ext)) {
    for (const line of head.split(/\r?\n/).slice(0, 25)) {
      const t = line.trim();
      if (!t || t.startsWith('#!') || /^(['"])use strict\1/.test(t) || t === '<#' || t === '/*' || t === '"""' || /^param\b|^@echo|^\$ErrorAction/i.test(t)) continue;
      const m = t.match(/^(?:\/\/+|#+|\/\*+|\*|REM|::|"""|''')\s*(.*)$/i);
      if (m && m[1].trim()) return clip(m[1]);
      if (!m) break;
    }
    return `${ext.slice(1)} script`;
  }
  if (ext === '.csv') { const l = head.split(/\r?\n/)[0]; return clip('table: ' + l.split(/[;,\t]/).slice(0, 6).join(', ')); }
  if (ext === '.json' || ext === '.jsonl') return clip('JSON data' + (ext === '.jsonl' ? ' lines' : ''));
  const map = { '.png': 'image', '.jpg': 'image', '.jpeg': 'image', '.gif': 'image', '.svg': 'vector image', '.pdf': 'PDF document', '.xlsx': 'Excel workbook', '.xlsm': 'Excel workbook', '.docx': 'Word document', '.pptx': 'PowerPoint deck', '.zip': 'zip archive', '.mp4': 'video', '.webm': 'video', '.exe': 'executable', '.txt': 'text file', '.yml': 'YAML config', '.yaml': 'YAML config', '.toml': 'TOML config', '.css': 'stylesheet', '.pbix': 'Power BI file', '.pyc': 'compiled python', '.woff2': 'font', '.ttf': 'font', '.ico': 'icon', '.log': 'log' };
  return map[ext] || (ext ? ext.slice(1) + ' file' : 'file');
}

// unit config keyed by "<root>:<relative/path>" (forward slashes)
const unitDesc = (rootName, rel, full) => {
  const key = `${rootName}:${rel}`;
  if (cfg.units[key]) return cfg.units[key];
  const sk = path.join(full, 'SKILL.md');
  if (fs.existsSync(sk)) return describeFile(sk, 'SKILL.md');
  return null;
};

function countFiles(dir) {
  let n = 0;
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return 0; }
  for (const e of ents) { if (SKIP.has(e.name)) continue; n += e.isDirectory() ? countFiles(path.join(dir, e.name)) : 1; }
  return n;
}

function parseExisting(routerDir) {
  const descs = new Map(); let header = null;
  let files; try { files = fs.readdirSync(routerDir).filter(isRouter).sort(); } catch { return { descs, header }; }
  for (const f of files) {
    const txt = fs.readFileSync(path.join(routerDir, f), 'utf8');
    if (f === 'ROUTER.md') { const i = txt.search(/^## /m); header = (i === -1 ? txt : txt.slice(0, i)).trimEnd(); }
    for (const m of txt.matchAll(/^- `([^`]+)` — (.*)$/gm)) descs.set(m[1], m[2].replace(/ → ROUTER\.md$/, ''));
  }
  return { descs, header };
}

function processDir(root, realDir, routerDir, rel) {
  let ents;
  try { ents = fs.readdirSync(realDir, { withFileTypes: true }); } catch { return; }
  ents = ents.filter((e) => !SKIP.has(e.name) && !isRouter(e.name));
  if (root.router === root.real) ents = ents.filter((e) => !(rel === '' && e.name === 'projects' && false)); // keep projects/
  const { descs, header } = parseExisting(routerDir);
  const entries = []; // {name, isDir, desc, recurse}
  for (const e of ents.sort((a, b) => (b.isDirectory() - a.isDirectory()) || a.name.localeCompare(b.name))) {
    const full = path.join(realDir, e.name); const childRel = (rel ? rel + '/' : '') + e.name;
    if (e.isDirectory()) {
      // mirror dirs of external projects live under HUB/projects/<name>: routed by their own pointer router
      if (root.router === root.real && cfg.roots.some((r) => r.router !== "." && norm(path.resolve(HUB, r.router)) === norm(full))) {
        entries.push({ name: e.name + '/', isDir: true, desc: 'pointer to external project, see its ROUTER.md', recurse: false, link: true }); continue;
      }
      const u = unitDesc(root.name, childRel, full);
      if (u) { entries.push({ name: e.name + '/', isDir: true, desc: `${u} [unit, ${countFiles(full)} files, not entered]`, recurse: false }); continue; }
      entries.push({ name: e.name + '/', isDir: true, desc: null, recurse: true, full, childRel });
    } else entries.push({ name: e.name, isDir: false, desc: describeFile(full, e.name), full });
  }
  // keep hand-written descriptions
  for (const en of entries) {
    const prev = descs.get(en.name);
    if (prev) en.keep = prev;
  }
  const names = new Set(entries.map((e) => e.name));
  const staleNames = [...descs.keys()].filter((n) => !names.has(n));
  const missingNames = entries.filter((e) => !descs.has(e.name)).map((e) => e.name);
  if (MODE === 'audit') {
    if (!fs.existsSync(path.join(routerDir, 'ROUTER.md'))) report.unrouted.push(`${root.name}:${rel || '.'}  (no ROUTER.md, ${entries.length} entries)`);
    else {
      for (const n of missingNames) report.unrouted.push(`${root.name}:${(rel ? rel + '/' : '') + n}`);
      for (const n of staleNames) report.stale.push(`${root.name}:${(rel ? rel + '/' : '') + n}`);
    }
  } else {
    const dirDesc = (en) => {
      if (en.keep) return en.keep;
      if (en.recurse) {
        for (const f of ['CLAUDE.md', 'README.md', 'SKILL.md', 'index.md']) { const p = path.join(en.full, f); if (fs.existsSync(p)) return `${describeFile(p, f)} (${countFiles(en.full)} files)`; }
        return `folder, ${countFiles(en.full)} files`;
      }
      return en.desc;
    };
    const lines = entries.map((en) => `- \`${en.name}\` — ${en.keep || (en.isDir ? dirDesc(en) : en.desc)}${en.isDir && en.recurse ? ' → ROUTER.md' : ''}`);
    report.added += missingNames.length; report.removed += staleNames.length;
    const title = `# ROUTER — ${rel || root.label}`;
    const defHeader = [title, root.router !== root.real ? `Real path: \`${norm(realDir)}\` (pointer router; the project lives outside the brain folder)` : null,
      `Open only the line you need. Every child of this folder is listed below.`].filter(Boolean).join('\n');
    const head = header && header.startsWith('# ROUTER') ? header : defHeader;
    fs.mkdirSync(routerDir, { recursive: true });
    const pages = Math.max(1, Math.ceil(lines.length / PAGE));
    for (let p = 0; p < pages; p++) {
      const fname = p === 0 ? 'ROUTER.md' : `ROUTER-${p + 1}.md`;
      const chunk = lines.slice(p * PAGE, (p + 1) * PAGE);
      let out = (p === 0 ? head : `# ROUTER — ${rel || root.label} (page ${p + 1})`) + '\n\n## Contents' + (pages > 1 ? ` (page ${p + 1} of ${pages})` : '') + '\n' + chunk.join('\n') + '\n';
      if (p < pages - 1) out += `\nMore: \`ROUTER-${p + 2}.md\`\n`;
      const target = path.join(routerDir, fname);
      if (!fs.existsSync(target)) report.created++;
      fs.writeFileSync(target, out);
    }
    for (let p = pages + 1; fs.existsSync(path.join(routerDir, `ROUTER-${p}.md`)); p++) fs.unlinkSync(path.join(routerDir, `ROUTER-${p}.md`));
  }
  for (const en of entries) if (en.recurse) processDir(root, en.full, path.join(routerDir, en.name.slice(0, -1)), en.childRel);
}

for (const r of cfg.roots) {
  const root = { name: r.name, label: r.label, real: path.resolve(r.real), router: path.resolve(r.router === '.' ? HUB : r.router) };
  if (!fs.existsSync(root.real)) { console.log(`skip ${r.name}: ${root.real} not found`); continue; }
  if (r.router !== '.') root.router = path.resolve(HUB, r.router); else root.router = root.real;
  processDir(root, root.real, root.router, '');
}

if (MODE === 'audit') {
  console.log(`UNROUTED (${report.unrouted.length}):`); report.unrouted.slice(0, 200).forEach((x) => console.log('  ' + x));
  console.log(`STALE (${report.stale.length}):`); report.stale.slice(0, 200).forEach((x) => console.log('  ' + x));
  const mapgap = require('./map-check.js')(HUB);
  console.log(`MAP GAPS in CLAUDE.md (${mapgap.length}):`); mapgap.forEach((x) => console.log('  ' + x));
  process.exit(report.unrouted.length || report.stale.length || mapgap.length ? 1 : 0);
} else console.log(`built: ${report.created} router file(s) created, ${report.added} entries added, ${report.removed} stale removed`);
