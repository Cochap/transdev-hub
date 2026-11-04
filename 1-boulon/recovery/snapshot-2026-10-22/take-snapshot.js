// READ-ONLY snapshot of the live BOULON pilot search service (written 2026-10-22).
// Run:  node take-snapshot.js        (from this folder or anywhere; takes a few minutes)
// Only GET and POST /docs/search are sent. Nothing is written to Azure.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const A = require('./lib-azure.js');
const OUT = __dirname, DEF = path.join(OUT, 'definitions'), OLD = path.join(A.ROOT, '1-boulon', 'rebuild', 'v1-citation-fix', 'backup', 'index-v1-docs-2026-10-06.json');
fs.mkdirSync(DEF, { recursive: true });
const API_A = '2024-07-01', API_B = '2026-04-01';
const manifest = { taken: new Date().toISOString(), service: new URL(A.EP).host, index: A.IDX, apiVersions: [API_A, API_B], etags: {}, files: {}, notes: [] };
const strip = j => { const c = JSON.parse(JSON.stringify(j)); return c; };
function save(name, obj) {
  const text = JSON.stringify(obj, null, 2);
  const hits = A.secretScan(text);
  if (hits.length) { console.error('SECRET SCAN FAILED for', name, hits); process.exit(3); }
  fs.writeFileSync(path.join(DEF, name), text);
  manifest.files['definitions/' + name] = { bytes: text.length, sha256: crypto.createHash('sha256').update(text).digest('hex') };
}
function must(r, what) { if (r.code !== 200 || !r.json) { console.error(what, 'failed, HTTP', r.code, String(r.text).slice(0, 200)); process.exit(1); } return r.json; }

// 1. service
const stats = must(A.call('GET', '/servicestats', undefined, API_A), 'servicestats'); save('servicestats.json', stats);
const idxList = must(A.call('GET', '/indexes?$select=name', undefined, API_A), 'index list');
const idxNames = idxList.value.map(x => x.name); manifest.indexNames = idxNames;
const iStats = must(A.call('GET', `/indexes/${A.IDX}/stats`, undefined, API_A), 'index stats'); save('index-stats.json', iStats);

// 2. definitions with both api versions (index, skillset, indexer, datasource); synonym maps
for (const v of [API_A, API_B]) {
  const tag = v === API_A ? '' : '-api' + v;
  const idx = must(A.call('GET', `/indexes/${A.IDX}`, undefined, v), 'index ' + v); save(`index${tag}.json`, idx); manifest.etags['index' + tag] = idx['@odata.etag'];
  const idxr = must(A.call('GET', '/indexers', undefined, v), 'indexers ' + v);
  const skl = must(A.call('GET', '/skillsets', undefined, v), 'skillsets ' + v);
  const ds = must(A.call('GET', '/datasources', undefined, v), 'datasources ' + v);
  const sm = must(A.call('GET', '/synonymmaps', undefined, v), 'synonymmaps ' + v);
  save(`indexers${tag}.json`, idxr); save(`skillsets${tag}.json`, skl); save(`datasources${tag}.json`, ds); save(`synonymmaps${tag}.json`, sm);
  idxr.value.forEach(x => manifest.etags['indexer:' + x.name + tag] = x['@odata.etag']);
  skl.value.forEach(x => manifest.etags['skillset:' + x.name + tag] = x['@odata.etag']);
  ds.value.forEach(x => manifest.etags['datasource:' + x.name + tag] = x['@odata.etag']);
  manifest.etags['synonymmaps-count' + tag] = sm.value.length;
  if (v === API_A) {
    for (const x of idxr.value) {
      const st = must(A.call('GET', `/indexers/${x.name}/status`, undefined, v), 'indexer status'); save('indexer-status.json', st);
      manifest.indexerSchedule = x.schedule; manifest.indexerLastRun = st.lastResult && { status: st.lastResult.status, startTime: st.lastResult.startTime, endTime: st.lastResult.endTime, itemsProcessed: st.lastResult.itemsProcessed, itemsFailed: st.lastResult.itemsFailed };
      manifest.indexerOverallStatus = st.status;
    }
    // vectorizer settings (extracted for the plain-words restore note; the key is never returned by Azure)
    save('vectorizer-settings.json', { vectorSearch: idx.vectorSearch, semantic: idx.semantic, note: 'Azure never returns the vectorizer apiKey; restore needs AZURE_OPENAI_KEY from .env.' });
  }
}

// 3. every document, all fields including vectors
console.log('Reading every document (all fields, vectors included)...');
const { docs, total } = A.fetchAllDocs(API_A, 500);
const ids = new Set(docs.map(d => d.content_id));
const vecOk = docs.filter(d => Array.isArray(d.content_embedding) && d.content_embedding.length === 1536).length;
const missingTitle = docs.filter(d => !d.title).length, missingUrl = docs.filter(d => !d.url).length;
const docsFile = path.join(OUT, 'documents.jsonl');
const body = docs.map(d => { const c = { ...d }; delete c['@search.score']; return JSON.stringify(c); }).join('\n') + '\n';
const bodyHits = A.secretScan(body.slice(0, 5_000_000)); // vectors are numbers, scan the first 5 MB plus all string fields below
const strOnly = docs.map(d => Object.entries(d).filter(([k, v]) => typeof v === 'string').map(([k, v]) => v).join(' ')).join('\n');
if (bodyHits.length || A.secretScan(strOnly).length) { console.error('SECRET SCAN FAILED on documents'); process.exit(3); }
fs.writeFileSync(docsFile, body);
const hashes = {}; docs.forEach(d => hashes[d.content_id] = A.docHash(d));
fs.writeFileSync(path.join(OUT, 'doc-hashes.json'), JSON.stringify(hashes));
manifest.documents = { count: docs.length, unique: ids.size, odataCount: total, statsDocumentCount: iStats.documentCount, withVector1536: vecOk, missingTitle, missingUrl, bytes: fs.statSync(docsFile).size, sha256: crypto.createHash('sha256').update(fs.readFileSync(docsFile)).digest('hex') };
const byManual = {}; docs.forEach(d => byManual[d.document_title] = (byManual[d.document_title] || 0) + 1);
manifest.manuals = Object.keys(byManual).length; fs.writeFileSync(path.join(OUT, 'chunks-per-manual.json'), JSON.stringify(byManual, null, 2));

// 4. compare with the old 10-06 backup (history only): is it current?
let cmp = { present: fs.existsSync(OLD) };
if (cmp.present) {
  const old = JSON.parse(fs.readFileSync(OLD, 'utf8')); const om = new Map(old.map(d => [d.content_id, d]));
  let same = 0, textDiff = 0, vecDiff = 0, titleDiff = 0, urlDiff = 0, missingInOld = 0, pageDiff = 0;
  for (const d of docs) {
    const o = om.get(d.content_id); if (!o) { missingInOld++; continue; }
    if (o.content_text !== d.content_text) textDiff++;
    if (JSON.stringify(o.content_embedding) !== JSON.stringify(d.content_embedding)) vecDiff++;
    if (o.title !== d.title) titleDiff++; if (o.url !== d.url) urlDiff++;
    if (JSON.stringify(o.locationMetadata) !== JSON.stringify(d.locationMetadata)) pageDiff++;
    if (o.content_text === d.content_text && o.title === d.title && o.url === d.url) same++;
  }
  Object.assign(cmp, { oldCount: old.length, liveCount: docs.length, idsOnlyInLive: missingInOld, textDiffs: textDiff, vectorDiffs: vecDiff, titleDiffs: titleDiff, urlDiffs: urlDiff, locationDiffs: pageDiff, fullyIdentical: same });
  cmp.verdict = (titleDiff || urlDiff) ? 'STALE on title/url (taken before the 13:20 rebuild that wrote the SharePoint links); text and vectors ' + ((textDiff || vecDiff) ? 'also differ' : 'identical') + '. Not reused; the new documents.jsonl replaces it.' : 'Current.';
}
manifest.oldBackupComparison = cmp;

// 5. spot check 5 random chunks by re-reading them from live (title, url, page)
const pick = [...ids].sort(() => Math.random() - 0.5).slice(0, 5); const spot = [];
for (const id of pick) {
  const r = A.search({ search: '*', filter: `content_id eq '${id.replace(/'/g, "''")}'`, select: 'content_id,title,url,document_title', top: 1 }, API_A);
  const live = r.json && r.json.value && r.json.value[0]; const snap = docs.find(d => d.content_id === id);
  spot.push({ id: id.slice(-14), title: live && live.title, titleMatches: !!live && live.title === snap.title, urlMatches: !!live && live.url === snap.url });
}
manifest.spotCheck = spot;
manifest.azureCallsThisRun = A.callsMade();
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
const checks = [
  ['document count = index stats', docs.length === iStats.documentCount && docs.length === total],
  ['all ids unique', ids.size === docs.length],
  ['all vectors 1536 numbers', vecOk === docs.length],
  ['every chunk has title and url', missingTitle === 0 && missingUrl === 0],
  ['spot check 5/5', spot.every(s => s.titleMatches && s.urlMatches)]
];
checks.forEach(([n, ok]) => console.log((ok ? 'PASS ' : 'FAIL ') + n));
console.log('docs', docs.length, '| manuals', manifest.manuals, '| bytes', manifest.documents.bytes, '| calls', A.callsMade());
console.log('old backup:', JSON.stringify(cmp));
process.exit(checks.every(c => c[1]) ? 0 : 1);
