// BOULON v1 citation fix (2026-10-06): adds `title` and `url` to the live pilot index and fills them
// from each chunk's own document_title + page number. Additive only: no field is removed or changed.
// Usage (from this folder):  node apply-citation-fields.js plan      -> read-only, shows what would be written
//                            node apply-citation-fields.js apply     -> backs up the index definition, adds the fields, fills them
//                            node apply-citation-fields.js verify    -> read-only, counts filled chunks + shows samples
// The admin key is read from ../../.env in memory and never printed or written.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const mode = process.argv[2] || 'plan';
const root = (() => { let d = __dirname; while (!require('fs').existsSync(require('path').join(d, 'CLAUDE.md')) && require('path').dirname(d) !== d) d = require('path').dirname(d); return d; })();
const env = fs.readFileSync(path.join(root, '.env'), 'utf8');
const KEY = (env.match(/primary admin key:\s*(\S+)/i) || [])[1];
const EP = (env.match(/^AZURE_SEARCH_ENDPOINT=(\S+)/m) || [])[1];
const IDX = (env.match(/^AZURE_SEARCH_INDEX=(\S+)/m) || [])[1];
if (!KEY || KEY.length !== 52 || !EP || !IDX) { console.error('Missing/odd .env values (key length must be 52).'); process.exit(2); }
const API = 'api-version=2024-07-01';
const BLOB = 'https://boulonpilotstorage.blob.core.windows.net/manuals/';

function call(method, url, body) {
  const args = ['-s', '--ssl-no-revoke', '-X', method, '-H', 'api-key: ' + KEY, '-H', 'Content-Type: application/json', '-w', '\n%{http_code}', url];
  if (body !== undefined) args.push('--data-binary', '@-');
  const out = execFileSync('curl', args, { input: body === undefined ? undefined : JSON.stringify(body), maxBuffer: 1 << 28 }).toString();
  const i = out.lastIndexOf('\n');
  const text = out.slice(0, i), code = +out.slice(i + 1);
  return { code, json: text ? JSON.parse(text) : null };
}
function pullAll(select) {
  let all = [];
  for (let skip = 0; ; skip += 1000) {
    const r = call('POST', `${EP}/indexes/${IDX}/docs/search?${API}`, { search: '*', top: 1000, skip, orderby: 'content_id asc', select });
    if (r.code !== 200) throw new Error('search failed ' + r.code + ' ' + JSON.stringify(r.json).slice(0, 200));
    all = all.concat(r.json.value);
    if (r.json.value.length < 1000) break;
  }
  if (new Set(all.map(d => d.content_id)).size !== all.length) throw new Error('paging returned duplicates; refusing to continue');
  return all;
}
// "401483 Rev B.pdf" -> "401483 Rev B"; underscores -> spaces; "20180131200843_emp-cooling-fans-service-manual.pdf" -> readable
function cleanName(f) { return f.replace(/\.pdf$/i, '').replace(/_+/g, ' ').replace(/\s+/g, ' ').trim(); }
function build(d) {
  const page = d.locationMetadata && d.locationMetadata.pageNumber;
  const name = cleanName(d.document_title);
  return { content_id: d.content_id, title: page != null ? `${name}, p. ${page}` : name, url: BLOB + encodeURIComponent(d.document_title), metadata_storage_path: BLOB + encodeURIComponent(d.document_title) };
}

if (mode === 'verify') {
  const all = pullAll('content_id,title,url,document_title');
  console.log('chunks', all.length, '| with title', all.filter(d => d.title).length, '| with url', all.filter(d => d.url).length);
  const seen = new Set(); for (const d of all) if (!seen.has(d.document_title) && seen.size < 6) { seen.add(d.document_title); console.log(' ', d.title, '|', d.url); }
  process.exit(0);
}

const def = call('GET', `${EP}/indexes/${IDX}?${API}`);
if (def.code !== 200) throw new Error('GET index ' + def.code);
const hasTitle = def.json.fields.some(f => f.name === 'title'), hasUrl = def.json.fields.some(f => f.name === 'url'), hasMsp = def.json.fields.some(f => f.name === 'metadata_storage_path');
const docs = pullAll('content_id,document_title,locationMetadata');
const actions = docs.map(d => ({ '@search.action': 'mergeOrUpload', ...build(d) }));
console.log(`index ${IDX}: ${docs.length} chunks | field title exists: ${hasTitle} | field url exists: ${hasUrl}`);
const seen = new Set(); for (const a of actions) { const d = docs.find(x => x.content_id === a.content_id); if (!seen.has(d.document_title) && seen.size < 5) { seen.add(d.document_title); console.log('  e.g.', a.title, '|', a.url); } }
if (mode !== 'apply') { console.log('PLAN ONLY. Nothing was written. Run with "apply" to execute.'); process.exit(0); }

const backup = path.join(__dirname, 'index-v1-definition-backup-2026-10-06.json');
const raw = JSON.stringify(def.json, null, 2);
if (/"(apiKey|key)"\s*:\s*"[^"]{8,}"/.test(raw.replace(/"name"/g, ''))) console.log('(note: definition contains a key-like value; backup NOT written)'); else fs.writeFileSync(backup, raw);
if (!hasTitle || !hasUrl || !hasMsp) {
  const next = JSON.parse(raw); delete next['@odata.context']; delete next['@odata.etag'];
  if (!hasTitle) next.fields.push({ name: 'title', type: 'Edm.String', searchable: true, filterable: false, retrievable: true, sortable: false, facetable: false });
  if (!hasUrl) next.fields.push({ name: 'url', type: 'Edm.String', searchable: false, filterable: false, retrievable: true, sortable: false, facetable: false });
  if (!hasMsp) next.fields.push({ name: 'metadata_storage_path', type: 'Edm.String', searchable: false, filterable: false, retrievable: true, sortable: false, facetable: false }); // Microsoft Learn: Copilot Studio uses this field as the citation link when present
  const put = call('PUT', `${EP}/indexes/${IDX}?${API}`, next);
  console.log('PUT index definition ->', put.code); if (put.code >= 300) { console.log(JSON.stringify(put.json).slice(0, 500)); process.exit(1); }
}
let ok = 0, bad = 0;
for (let i = 0; i < actions.length; i += 500) {
  const r = call('POST', `${EP}/indexes/${IDX}/docs/index?${API}`, { value: actions.slice(i, i + 500) });
  if (r.json && r.json.value) for (const v of r.json.value) v.status ? ok++ : (bad++, console.log('  fail', v.key.slice(0, 20), v.errorMessage));
  else { console.log('batch error', r.code, JSON.stringify(r.json).slice(0, 300)); bad += 500; }
}
console.log(`merge done: ${ok} ok, ${bad} failed`);
