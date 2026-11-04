// Gathers every Claude Code conversation from one local day (default today) across ALL projects
// (TRANSDEV HUB, ZBB, DAILY DIGEST, ...) and writes one trimmed text file per session
// (user + assistant text only, no tool noise) to 5-brain/logs/eod/<date>/.
// Usage: node 5-brain/scripts/eod-gather-sessions.js [YYYY-MM-DD]
//        node 5-brain/scripts/eod-gather-sessions.js --week     (Monday through today, one folder per day)
const fs = require('fs');
const os = require('os');
const path = require('path');

const HUB = (() => { let d = __dirname; while (!fs.existsSync(path.join(d, 'CLAUDE.md')) && path.dirname(d) !== d) d = path.dirname(d); return d; })();
const root = path.join(os.homedir(), '.claude', 'projects');
const localDay = (iso) => new Date(iso).toLocaleDateString('en-CA');
const textOf = (content) => {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.filter((b) => b && b.type === 'text').map((b) => b.text).join('\n');
};
const MAX = 1500; // chars kept per assistant message; user messages are kept in full

function gather(day) {
  const out = path.join(HUB, '5-brain/logs/eod', day);
  fs.mkdirSync(out, { recursive: true });
  const index = [];
  for (const proj of fs.readdirSync(root)) {
    const dir = path.join(root, proj);
    let files;
    try { files = fs.readdirSync(dir).filter((f) => f.endsWith('.jsonl')); } catch { continue; }
    for (const f of files) {
      const full = path.join(dir, f);
      if (localDay(fs.statSync(full).mtime) < day) continue; // untouched since before that day
      let title = '', cwd = '', lines = [];
      for (const raw of fs.readFileSync(full, 'utf8').split('\n')) {
        if (!raw) continue;
        let o; try { o = JSON.parse(raw); } catch { continue; }
        if (o.type === 'custom-title' && o.customTitle) title = o.customTitle;
        if (o.cwd) cwd = o.cwd;
        if (!o.timestamp || localDay(o.timestamp) !== day || o.isSidechain) continue;
        if (o.type !== 'user' && o.type !== 'assistant') continue;
        let t = textOf(o.message && o.message.content).trim();
        if (!t || /^<(system-reminder|command-|local-command)/.test(t)) continue;
        const time = new Date(o.timestamp).toLocaleTimeString('en-GB').slice(0, 5);
        if (o.type === 'assistant' && t.length > MAX) t = t.slice(0, MAX) + ' […]';
        lines.push(`[${time}] ${o.type === 'user' ? 'GREG' : 'CLAUDE'}: ${t}`);
      }
      if (!lines.some((l) => l.includes('GREG:'))) continue; // no human message that day
      // Routine runs and auto-summaries hold no new day facts and were re-read every close.
      const first = (lines.find((l) => l.includes('GREG:')) || '').replace(/^\[\d\d:\d\d\] GREG: /, '');
      if (/^(<scheduled-task|This is an automated run|Below is a conversation log)/.test(first)) continue;
      if (/end of day|routine suggester|rag radar/i.test(title) && lines.filter((l) => l.includes('GREG:')).length < 2) continue;
      const id = f.replace('.jsonl', '');
      const file = path.join(out, `${id.slice(0, 8)}.md`);
      fs.writeFileSync(file, `# ${title || '(untitled)'} — ${proj} — ${cwd}\nsession ${id}\n\n${lines.join('\n\n')}\n`);
      index.push({ file, title: title || '(untitled)', project: proj, chars: lines.join('').length });
    }
  }
  fs.writeFileSync(path.join(out, '_index.json'), JSON.stringify(index, null, 2));
  console.log(`${index.length} session(s) on ${day} -> ${out}`);
  for (const i of index) console.log(`- ${path.basename(i.file)} | ${i.chars} chars | ${i.project} | ${i.title}`);
}

const arg = process.argv[2];
if (arg === '--week') {
  const now = new Date(); const dow = (now.getDay() + 6) % 7; // Monday = 0
  for (let i = dow; i >= 0; i--) { const d = new Date(now); d.setDate(now.getDate() - i); gather(d.toLocaleDateString('en-CA')); }
} else gather(arg || new Date().toLocaleDateString('en-CA'));
