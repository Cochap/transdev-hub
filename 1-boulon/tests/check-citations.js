// Read-only citation regression check for the live index (written 2026-10-06).
// Run from the project root:  node 1-boulon/tests/check-citations.js
// Fails (exit 1) if any chunk breaks the rules that keep citations working in Copilot Studio:
//   - title <= 27 characters and ends with ", p. N" where N equals the chunk's locationMetadata.pageNumber
//   - url is a lehub.sharepoint.com address ending in #page=N with the same N
//   - no chunk is missing either field
// Run it after EVERY indexer run or rebuild: a re-projection replaces whole chunks and wipes title/url.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const env = fs.readFileSync(path.join((() => { let d = __dirname; while (!require('fs').existsSync(require('path').join(d, 'CLAUDE.md')) && require('path').dirname(d) !== d) d = require('path').dirname(d); return d; })(), '.env'), 'utf8');
const KEY = (env.match(/primary admin key:\s*(\S+)/i) || [])[1] || (env.match(/^AZURE_SEARCH_KEY\s*=\s*(\S+)/m) || [])[1];
const EP = env.match(/^AZURE_SEARCH_ENDPOINT=(\S+)/m)[1], IDX = env.match(/^AZURE_SEARCH_INDEX=(\S+)/m)[1];
if (!KEY || /^<|paste/i.test(KEY)) { console.error('No usable search key in .env'); process.exit(2); }
const q = b => JSON.parse(execFileSync('curl', ['-s', '--ssl-no-revoke', '-H', 'api-key: ' + KEY, '-H', 'Content-Type: application/json', '--data-binary', '@-', `${EP}/indexes/${IDX}/docs/search?api-version=2024-07-01`], { input: JSON.stringify(b), maxBuffer: 1 << 28 }).toString());
let all = [];
for (let s = 0; ; s += 1000) {
  const r = q({ search: '*', top: 1000, skip: s, orderby: 'content_id asc', select: 'content_id,title,url,locationMetadata' });
  if (!r.value) { console.error('Search failed', JSON.stringify(r).slice(0, 200)); process.exit(2); }
  all = all.concat(r.value); if (r.value.length < 1000) break;
}
const bad = { missing: 0, long: 0, titlePage: 0, urlPage: 0, urlHost: 0 }, ex = [];
for (const d of all) {
  const p = d.locationMetadata && d.locationMetadata.pageNumber;
  if (!d.title || !d.url) { bad.missing++; ex.push(d.content_id.slice(-12)); continue; }
  if (d.title.length > 27) bad.long++;
  const tp = (d.title.match(/, p\. (\d+)$/) || [])[1], up = (d.url.match(/#page=(\d+)$/) || [])[1];
  if (+tp !== p) bad.titlePage++;
  if (+up !== p) bad.urlPage++;
  if (!d.url.startsWith('https://lehub.sharepoint.com/sites/')) bad.urlHost++;
}
const fails = Object.values(bad).reduce((a, b) => a + b, 0);
console.log(`chunks ${all.length} | missing ${bad.missing} | label>27 ${bad.long} | title page mismatch ${bad.titlePage} | url page mismatch ${bad.urlPage} | non-SharePoint url ${bad.urlHost}`);
console.log(fails ? 'FAIL' : 'PASS: every chunk has a short label and a SharePoint link to the right page');
process.exit(fails ? 1 : 0);
