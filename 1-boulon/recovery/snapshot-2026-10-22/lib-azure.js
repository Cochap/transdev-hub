// Shared helper for the snapshot scripts (written 2026-10-22). Plain node, no packages.
// - Reads the search endpoint, index name and admin key from the project .env. The key is held in memory only and is never printed or written.
// - Every Azure call is appended to 1-boulon/rebuild/v3-cost/azure-call-log.jsonl (time, method, path WITHOUT query string secrets). No key is ever logged.
// - Default is READ ONLY: call() refuses any method other than GET and POST-to-/docs/search unless allowWrite is passed by the caller.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

function findRoot() {
  let d = __dirname;
  while (!fs.existsSync(path.join(d, 'CLAUDE.md')) && path.dirname(d) !== d) d = path.dirname(d);
  return d;
}
const ROOT = findRoot();
const ENV_TEXT = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
const KEY = (ENV_TEXT.match(/primary admin key:\s*(\S+)/i) || [])[1] || (ENV_TEXT.match(/^AZURE_SEARCH_KEY\s*=\s*(\S+)/m) || [])[1];
const EP = (ENV_TEXT.match(/^AZURE_SEARCH_ENDPOINT=(\S+)/m) || [])[1];
const IDX = (ENV_TEXT.match(/^AZURE_SEARCH_INDEX=(\S+)/m) || [])[1];
const AOAI_PRESENT = !!((ENV_TEXT.match(/^AZURE_OPENAI_KEY\s*=\s*(\S+)/m) || [])[1]);
if (!KEY || /^<|paste/i.test(KEY) || !EP || !IDX) { console.error('No usable search endpoint/key/index in .env (names only checked).'); process.exit(2); }

const CALL_LOG = path.join(ROOT, '1-boulon', 'rebuild', 'v3-cost', 'azure-call-log.jsonl');
let calls = 0;
function logCall(rec) { try { fs.appendFileSync(CALL_LOG, JSON.stringify(rec) + '\n'); } catch (e) { /* logging must never break a read */ } }

function call(method, pathAndQuery, body, apiVersion, opts) {
  opts = opts || {};
  const isSearch = method === 'POST' && /\/docs\/search$/.test(pathAndQuery.split('?')[0]);
  if (method !== 'GET' && !isSearch && !opts.allowWrite) throw new Error('Refused: ' + method + ' ' + pathAndQuery.split('?')[0] + ' is a write; this script is read-only.');
  const sep = pathAndQuery.includes('?') ? '&' : '?';
  const url = `${EP.replace(/\/$/, '')}${pathAndQuery}${sep}api-version=${apiVersion || '2024-07-01'}`;
  const args = ['-s', '--ssl-no-revoke', '-m', String(opts.timeout || 90), '-X', method, '-H', 'api-key: ' + KEY, '-H', 'Content-Type: application/json', '-w', '\n%{http_code}', url];
  if (body !== undefined) args.push('--data-binary', '@-');
  let out, lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      out = execFileSync('curl', args, { input: body === undefined ? undefined : JSON.stringify(body), maxBuffer: 1 << 29, timeout: (opts.timeout || 90) * 1000 + 5000 }).toString();
      break;
    } catch (e) { lastErr = e; }
  }
  calls++;
  if (out === undefined) { logCall({ t: new Date().toISOString(), method, path: pathAndQuery.split('?')[0], api: apiVersion || '2024-07-01', code: 'curl-fail' }); throw new Error('curl failed: ' + String(lastErr && lastErr.message).split('\n')[0]); }
  const i = out.lastIndexOf('\n'); const text = out.slice(0, i); const code = +out.slice(i + 1);
  logCall({ t: new Date().toISOString(), method, path: pathAndQuery.split('?')[0], api: apiVersion || '2024-07-01', code });
  let json = null; try { json = text ? JSON.parse(text) : null; } catch (e) { /* non-JSON body */ }
  return { code, json, text };
}

function search(body, apiVersion) { return call('POST', `/indexes/${IDX}/docs/search`, body, apiVersion); }

// Stable hash of a document ignoring Azure's per-query decoration.
const crypto = require('crypto');
function canon(v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v);
}
function docHash(d) {
  const c = {}; for (const k of Object.keys(d)) if (!k.startsWith('@search.')) c[k] = d[k];
  return crypto.createHash('sha256').update(canon(c)).digest('hex');
}
function fetchAllDocs(apiVersion, page) {
  page = page || 500; const all = []; let total = null;
  for (let s = 0; ; s += page) {
    const r = search({ search: '*', top: page, skip: s, orderby: 'content_id asc', count: true }, apiVersion);
    if (r.code !== 200 || !r.json || !r.json.value) throw new Error('search page failed at skip ' + s + ' code ' + r.code);
    if (total === null) total = r.json['@odata.count'];
    for (const d of r.json.value) all.push(d);
    if (r.json.value.length < page) break;
  }
  return { docs: all, total };
}
// Scan text for secrets: patterns plus every long value found in .env (values never printed).
const envSecrets = [];
for (const line of ENV_TEXT.split(/\r?\n/)) {
  const m = line.match(/[=:]\s*(\S{24,})\s*$/);
  if (m && /^[A-Za-z0-9+\/=_-]{24,}$/.test(m[1]) && m[1] !== IDX && !/multimodal-rag/.test(m[1])) envSecrets.push(m[1]);
}
function secretScan(text) {
  const hits = [];
  for (const re of [/AccountKey=/i, /SharedAccessSignature/i, /[?&]sig=[A-Za-z0-9%]{10,}/, /\bapi-?key"\s*:\s*"[A-Za-z0-9]{20,}/i, /"key"\s*:\s*"[A-Za-z0-9+\/=]{20,}"/])
    if (re.test(text)) hits.push('pattern ' + re);
  for (let i = 0; i < envSecrets.length; i++) if (text.includes(envSecrets[i])) hits.push('an .env value (#' + (i + 1) + ', not printed)');
  return hits;
}
function envNames() {
  const out = [];
  for (const line of ENV_TEXT.split(/\r?\n/)) {
    if (/^\s*(#|$)/.test(line)) continue;
    const n = line.search(/[=:]/); if (n < 0) { out.push({ name: '(unlabelled line)', status: 'set' }); continue; }
    const name = line.slice(0, n).trim(), val = line.slice(n + 1).trim();
    if (name.length > 40) { out.push({ name: '(unlabelled line)', status: 'set' }); continue; }
    out.push({ name, status: val === '' ? 'EMPTY' : (/^<.*>$/.test(val) || /paste|placeholder/i.test(val)) ? 'PLACEHOLDER' : 'set' });
  }
  return out;
}
module.exports = { ROOT, EP, IDX, AOAI_PRESENT, call, search, docHash, fetchAllDocs, secretScan, envNames, callsMade: () => calls, canon };
