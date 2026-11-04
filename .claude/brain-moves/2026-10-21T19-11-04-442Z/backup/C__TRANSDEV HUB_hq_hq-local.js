// BOULON HQ Control room panel. Only loaded when boulon-hq.html is served by hq/server.js on
// this PC (never on the published claude.ai page). Adds live metrics, skill buttons, a
// read-only "Ask Claude" box, the current run's live log and the run history.
(function () {
  const L = window.HQ_LOCAL; if (!L) return;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const post = (p, body) => fetch(p, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-HQ-Token': L.token }, body: JSON.stringify(body) })
    .then(r => r.json().then(j => (r.ok ? j : Promise.reject(j.error || 'Error ' + r.status))));

  const AUTO = [
    { a: 'morning', what: 'Reads the hand-off, the email digest, checks Azure and keys, fixes the log, refreshes HQ.' },
    { a: 'digest', what: 'Logs ticket numbers and replies from the newest email digest, then refreshes HQ.' },
    { a: 'hq', what: 'Brings the online BOULON HQ page up to date from the project log.' },
    { a: 'golden', what: 'Runs the 41 golden questions straight against the search index. No AI cost.' }
  ];
  const COPY = [
    { cmd: '/boulon-end-of-day', what: 'Close the day: logs, lessons, tomorrow\'s move, save.' },
    { cmd: '/ecc:save-session', what: 'Save this session before closing or restarting Claude.' },
    { cmd: '/boulon-report-pipeline', what: 'Progress report or presentation for Henri.' },
    { cmd: '/boulon-agent-testing', what: 'Test the live BOULON agent and log the results.' }
  ];
  const LINKS = [
    { t: 'BOULON HQ online', href: 'https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9' },
    { t: 'Copilot Studio', href: 'https://copilotstudio.microsoft.com' },
    { t: 'Azure portal', href: 'https://portal.azure.com' },
    { t: 'Power Automate', href: 'https://make.powerautomate.com' },
    { t: 'Project docs folder', open: 'docs' },
    { t: 'Email digest folder', open: 'inbox' }
  ];

  const css = document.createElement('style');
  css.textContent = `
  .cr{border:2px solid var(--brand);display:grid;gap:14px}
  .cr .crhead{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}
  .cr .live{font-size:13px;color:var(--muted)}
  .crm{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
  .crm .tile .num{font-size:26px}
  .crb{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}
  .crb .btn{all:unset;box-sizing:border-box;border:1px solid var(--line);border-radius:8px;padding:12px;cursor:pointer;display:grid;gap:4px;background:var(--panel)}
  .crb .btn:hover:not([aria-disabled="true"]){border-color:var(--brand)}
  .crb .btn:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
  .crb .btn[aria-disabled="true"]{opacity:.55;cursor:not-allowed}
  .crb .btn b{font-size:16px}
  .crb .btn span{font-size:14px;color:var(--muted)}
  .crb .btn code{color:var(--brand-text)}
  .crlinks{display:flex;flex-wrap:wrap;gap:8px}
  .crlinks a,.crlinks button{font:600 14px "Source Sans 3",sans-serif;border:1px solid var(--line);border-radius:999px;padding:6px 12px;background:var(--soft);color:var(--ink);text-decoration:none;cursor:pointer}
  .crask{display:grid;gap:8px}
  .crask textarea{font:15px "Source Sans 3",sans-serif;border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--panel);color:var(--ink);min-height:56px;resize:vertical}
  .crrun{background:var(--hero);color:var(--hero-ink);border-radius:8px;padding:12px;display:grid;gap:8px}
  .crrun[hidden]{display:none}
  .crrun pre{margin:0;max-height:260px;overflow:auto;white-space:pre-wrap;font:13px "JetBrains Mono",monospace;color:var(--hero-ink)}
  .crhist{list-style:none;margin:0;padding:0;display:grid;gap:6px}
  .crhist li{border-bottom:1px solid var(--line);padding:6px 0;font-size:14px}
  .crhist details summary{color:var(--ink);font-weight:400}
  .crmsg{font-size:14px;color:var(--brand-text);min-height:1em}
  h3.crh{font:800 17px "Barlow Condensed",sans-serif;margin:4px 0 0}`;
  document.head.appendChild(css);

  const sec = document.createElement('section');
  sec.className = 'card cr';
  sec.setAttribute('aria-label', 'Control room');
  sec.innerHTML = `
    <div class="crhead"><h2>Control room</h2><span class="live" id="crLive">Connecting to this PC...</span></div>
    <div class="crm" id="crMetrics"></div>
    <h3 class="crh">Runs by itself</h3><p class="sub" style="margin:0">Claude works in the background (Sonnet). The live log shows below; the cost appears in the history when it's done.</p>
    <div class="crb" id="crAuto"></div>
    <h3 class="crh">Copy for your Claude window</h3><p class="sub" style="margin:0">These need our conversation, so they run in your Claude window: click, then paste (Ctrl+V) and press Enter.</p>
    <div class="crb" id="crCopy"></div>
    <div class="crask"><h3 class="crh">Ask Claude (read-only)</h3>
      <textarea id="crQ" placeholder="Example: what are we still waiting on from IT?" maxlength="1500"></textarea>
      <button class="act" type="button" id="crAsk">Ask</button></div>
    <div class="crmsg" id="crMsg" role="status" aria-live="polite"></div>
    <div class="crrun" id="crRun" hidden><b id="crRunTitle"></b><pre id="crLog"></pre></div>
    <h3 class="crh">Open</h3><div class="crlinks" id="crLinks"></div>
    <h3 class="crh">Recent runs</h3><ul class="crhist" id="crHist"></ul>`;
  const nowView = $('v-now');
  nowView.insertBefore(sec, nowView.firstChild);

  const msg = t => { $('crMsg').textContent = t || ''; };
  $('crCopy').innerHTML = COPY.map((c, i) => `<button class="btn" type="button" data-c="${i}"><b><code>${esc(c.cmd)}</code></b><span>${esc(c.what)}</span></button>`).join('');
  $('crCopy').addEventListener('click', e => {
    const b = e.target.closest('.btn'); if (!b) return; const c = COPY[b.dataset.c];
    (navigator.clipboard ? navigator.clipboard.writeText(c.cmd) : Promise.reject()).then(
      () => msg(`Copied ${c.cmd}. Paste it in your Claude window and press Enter.`),
      () => msg(`Type ${c.cmd} in your Claude window.`));
  });
  $('crLinks').innerHTML = LINKS.map((l, i) => l.href ? `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.t)}</a>` : `<button type="button" data-o="${l.open}">${esc(l.t)}</button>`).join('');
  $('crLinks').addEventListener('click', e => { const b = e.target.closest('button[data-o]'); if (b) post('/api/open', { target: b.dataset.o }).catch(m => msg(String(m))); });

  let S = null, watching = null;
  function run(action, text) {
    const a = S && S.actions[action]; if (!a) return;
    if (a.disabled) { msg(a.disabled); return; }
    if (a.kind === 'claude' && action !== 'ask' && !confirm(`Run "${a.label}" now? Claude works in the background; you can keep using this PC.`)) return;
    msg('Starting...');
    post('/api/run', { action, text }).then(r => { msg(''); watch(r.id, a.label); refresh(); }, m => msg(String(m)));
  }
  $('crAuto').addEventListener('click', e => { const b = e.target.closest('.btn'); if (b) run(b.dataset.a); });
  $('crAsk').addEventListener('click', () => run('ask', $('crQ').value));

  function watch(id, label) {
    watching = id; $('crRun').hidden = false; const t0 = Date.now();
    const tick = () => fetch('/api/log/' + encodeURIComponent(id)).then(r => r.json()).then(j => {
      if (watching !== id) return;
      const s = Math.round((Date.now() - t0) / 1000);
      $('crRunTitle').textContent = j.running ? `${label}: running (${s} s)` : `${label}: finished`;
      const pre = $('crLog'); const atEnd = pre.scrollTop + pre.clientHeight >= pre.scrollHeight - 20;
      pre.textContent = j.log || 'Waiting for the first output...'; if (atEnd) pre.scrollTop = pre.scrollHeight;
      if (j.running) setTimeout(tick, 2000); else refresh();
    }).catch(() => setTimeout(tick, 4000));
    tick();
  }

  const ago = h => h == null ? '' : h < 1 ? 'less than 1 h ago' : h < 48 ? h + ' h ago' : Math.round(h / 24) + ' days ago';
  const tile = (num, label, st) => `<div class="tile"><div class="num" style="color:var(--${st})">${esc(num)}</div><small>${esc(label)}</small></div>`;
  function render() {
    const s = S;
    const sem = s.golden.score && (s.golden.score.match(/semantic\s+(\d+\/\d+)/) || [])[1];
    const searchOk = s.search === '401' || s.search === '403';
    $('crMetrics').innerHTML = [
      tile(sem || 'n/a', `golden set (semantic)${s.golden.ageH != null ? ', ' + ago(s.golden.ageH) : ''}`, sem ? 'good' : 'warn'),
      tile(s.ledgerTests, 'tests logged in the ledger', 'good'),
      tile(s.openItems, 'open items in the fix tracker', s.openItems > 10 ? 'warn' : 'good'),
      tile(s.digest ? ago(s.digest.ageH) : 'not set up', 'last email digest', s.digest && s.digest.ageH < 30 ? 'good' : 'warn'),
      tile(s.search == null ? '...' : searchOk ? 'up' : s.search, 'Azure search service', searchOk ? 'good' : 'warn'),
      tile(s.key === 'real' ? 'ready' : 'none', 'search key in .env', s.key === 'real' ? 'good' : 'warn'),
      tile('$' + s.cost.today.toFixed(2), `Claude use today at pay-per-use prices ($${s.cost.week.toFixed(2)} this week). An ECC estimate, not a bill`, 'good')
    ].join('');
    $('crAuto').innerHTML = AUTO.map(x => { const a = s.actions[x.a]; const busy = !!s.running;
      return `<button class="btn" type="button" data-a="${x.a}" aria-disabled="${!!a.disabled || busy}"><b>${esc(a.label)}</b><span>${esc(a.disabled || x.what)}</span></button>`; }).join('');
    $('crHist').innerHTML = s.history.length ? s.history.map(h => `<li><details><summary>${h.ok ? '<span class="pill good">Done</span>' : '<span class="pill bad">Failed</span>'} <b>${esc(h.label)}</b> · ${esc(new Date(h.startedAt).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' }))}${h.cost != null ? ' · $' + (+h.cost).toFixed(2) : ''}</summary>${h.text ? '<p><i>' + esc(h.text) + '</i></p>' : ''}<p>${esc(h.summary || 'No summary.')}</p></details></li>`).join('') : '<li>No runs yet.</li>';
    $('crLive').textContent = 'Live from this PC · ' + new Date(s.now).toLocaleTimeString('en-CA', { timeStyle: 'short' });
    if (s.running && watching !== s.running.id) watch(s.running.id, s.running.label);
  }
  function refresh() {
    return fetch('/api/state').then(r => r.json()).then(j => { S = j; render(); })
      .catch(() => { $('crLive').textContent = 'Lost contact with this PC. Is the control room still running?'; });
  }
  refresh(); setInterval(refresh, 15000);
})();
