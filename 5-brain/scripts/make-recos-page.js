// Builds the Friday routine-suggestions page: cards with a cart that copies Greg's picks back to Claude.
// Usage: node 5-brain/scripts/make-recos-page.js <cards.json> [out.html]
//   cards.json = { "week": "2026-10-19 to 2026-10-23", "cards": [ { "title", "what", "when", "saves", "kind": "passive|active", "model": "haiku|sonnet", "cost": "about X tokens a week", "evidence": "3 sessions: ..." } ] }
const fs = require('fs');
const path = require('path');
const HUB = (() => { let d = __dirname; while (!fs.existsSync(path.join(d, 'CLAUDE.md')) && path.dirname(d) !== d) d = path.dirname(d); return d; })();
const input = process.argv[2]; if (!input) { console.error('usage: make-recos-page.js <cards.json> [out.html]'); process.exit(2); }
const data = JSON.parse(fs.readFileSync(input, 'utf8').replace(/^﻿/, ''));
const day = new Date().toLocaleDateString('en-CA');
const out = process.argv[3] || path.join(HUB, '5-brain/routines/recos', `${day}.html`);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cards = data.cards || [];
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Routine suggestions ${esc(day)}</title>
<style>
:root{--bg:#f6f4f0;--card:#fff;--ink:#1c1b19;--mute:#6b675f;--line:#e2ded6;--accent:#DB0717;--ok:#1f7a4d;--chip:#efece6}
@media (prefers-color-scheme:dark){:root{--bg:#161513;--card:#201f1c;--ink:#f1eee8;--mute:#a39f95;--line:#34322d;--accent:#ff4d5a;--ok:#4cc38a;--chip:#2b2925}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,Segoe UI,sans-serif}
.wrap{max-width:760px;margin:0 auto;padding:24px 16px 120px}
h1{font-size:28px;margin:0 0 4px}.sub{color:var(--mute);margin:0 0 24px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin:0 0 14px;display:grid;grid-template-columns:28px 1fr;gap:12px}
.card input{width:22px;height:22px;margin-top:3px;accent-color:var(--accent)}
.card h2{font-size:18px;margin:0 0 6px}.row{margin:2px 0;color:var(--ink)}.row b{color:var(--mute);font-weight:600;margin-right:6px}
.chips{margin-top:8px;display:flex;gap:8px;flex-wrap:wrap}.chip{background:var(--chip);border-radius:999px;padding:2px 10px;font-size:13px;color:var(--mute)}
.chip.passive{color:var(--ok)}.ev{color:var(--mute);font-size:13px;margin-top:6px}
.bar{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--line);padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:center}
button{background:var(--accent);color:#fff;border:0;border-radius:10px;padding:10px 18px;font-size:16px;font-weight:600;cursor:pointer}
button:disabled{opacity:.4;cursor:default}.cnt{color:var(--mute)}.empty{padding:40px 0;text-align:center;color:var(--mute)}
</style></head><body><div class="wrap">
<h1>Routines I would add</h1>
<p class="sub">Week of ${esc(data.week || day)}. Tick the ones you want, press Copy picks, paste the text back to Claude. Nothing is set up until you do.</p>
${cards.length ? cards.map((c, i) => `<label class="card"><input type="checkbox" data-i="${i}"><div>
<h2>${esc(c.title)}</h2>
<div class="row"><b>Does</b>${esc(c.what)}</div>
<div class="row"><b>When</b>${esc(c.when)}</div>
<div class="row"><b>Saves</b>${esc(c.saves)}</div>
<div class="chips"><span class="chip ${c.kind === 'passive' ? 'passive' : ''}">${c.kind === 'passive' ? 'passive: only pings if something needs you' : 'active: hands you an output'}</span><span class="chip">model: ${esc(c.model || 'haiku')}</span><span class="chip">${esc(c.cost || 'cost not estimated')}</span></div>
<div class="ev">Seen: ${esc(c.evidence)}</div></div></label>`).join('\n') : '<div class="empty">Nothing repeated three times this week. Clean week.</div>'}
</div>
<div class="bar"><span class="cnt" id="cnt">0 picked</span><button id="copy" disabled>Copy picks</button></div>
<script>
const cards=${JSON.stringify(cards).replace(/</g, '\\u003c')};
const boxes=[...document.querySelectorAll('input[type=checkbox]')],btn=document.getElementById('copy'),cnt=document.getElementById('cnt');
const upd=()=>{const n=boxes.filter(b=>b.checked).length;cnt.textContent=n+' picked';btn.disabled=!n};
boxes.forEach(b=>b.addEventListener('change',upd));
btn.addEventListener('click',()=>{const picks=boxes.filter(b=>b.checked).map(b=>cards[+b.dataset.i]);
const txt='Set up only these routines from the ${esc(day)} suggestions. Show me the plan and the cost before you create anything.\\n'+picks.map((c,i)=>(i+1)+'. '+c.title+' | '+c.what+' | when: '+c.when+' | '+(c.kind==='passive'?'passive':'active')+' | model: '+(c.model||'haiku')).join('\\n')+'\\nChange nothing else.';
navigator.clipboard.writeText(txt).then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy picks',1500)},()=>{prompt('Copy this:',txt)})});
</script></body></html>`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('written ' + out + ' (' + cards.length + ' cards)');
