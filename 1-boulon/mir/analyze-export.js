#!/usr/bin/env node
'use strict';
/*
 * BOULON - MIR export analyzer (plain Node.js, no dependencies, no network).
 *
 * Usage:  node analyze-export.js [inputFolder] [--out report.md] [--json metrics.json]
 *
 * Reads one CSV per MIR table from the input folder (file name = table name,
 * case-insensitive), measures data quality and writes a Markdown report.
 * It never prints or stores free-text content, and it never loads the columns
 * that identify people (they are dropped while reading, and only their names are listed).
 */
const fs = require('fs');
const path = require('path');

// ===================================================================
// SETTINGS YOU MAY WANT TO CHANGE
// ===================================================================
const MIN_USABLE_CHARS = 15;            // a text is "usable" only if at least this many characters (after cleaning)
const TRIVIAL_TEXTS = [                 // texts that mean nothing (compared after trimming, removing accents and case)
  'ok', 'fait', 'repare', 'reparé', 'réparé', 'n/a', 'na', 'voir bon', 'idem', 'a verifier', '-', '.',
];
const REPEAT_WINDOW_DAYS = 30;          // "back within N days" = repeat repair
const BAR_CASES = 200;                  // ASSUMPTION: "a few hundred usable cases" read as >= 200 (plan section C gives no number)
const TOP_N = 20;
const VECTOR_DIMENSIONS = [1536, 3072];
const OVERHEAD_FACTORS = [1.0, 1.5];
const BASIC_VECTOR_QUOTA_GB = 5;        // per partition, figure given in the brief (not re-verified by this tool)
const BASIC_MAX_PARTITIONS = 3;
// Exact column names that identify a person (or pay), never used:
const PERSON_COLUMNS = ['NOMFULL', 'ALIAS', 'SALAIRE', 'SALAIREA', 'LUCLEUNIK', 'TFCLEUNIK', 'EMAILFACT', 'LUCLEUNIKAJOUT'];
// Any column whose name starts like this is also treated as personal and ignored:
const PERSON_PREFIXES = ['NOM', 'PRENOM', 'EMAIL', 'COURRIEL', 'TEL', 'ADRESSE', 'SALAIRE', 'ALIAS'];
const COST_COLUMNS = ['COUT_TOT'];      // cost columns: not requested, ignored too
// ===================================================================

const EXPECTED = {
  TBONS: ['TBCLEUNIK', 'DATE', 'DATE_CLOSE', 'NUM_BON', 'VECLEUNIK', 'CICLEUNIK', 'COD_DEPART', 'ODOAVIE', 'DESC_80', 'CB_PLANIFIE', 'CB_NONPLANIFIE', 'CB_URGENCE', 'IDStatutBT', 'Id_ClasseBT'],
  Plainte: ['PCLEUNIK', 'TBCLEUNIK', 'VECLEUNIK', 'PDATE', 'PDESC', 'PSymptome', 'PCAUSE', 'PCORRECTIF', 'PCODEREP', 'PCODERAI', 'PPOSI', 'PTEMPSR', 'PTYPE', 'PSTATUT', 'PDepannage', 'CPCLEUNIK'],
  PlainteDet: ['PCLEUNIK', 'TBCLEUNIK', 'VECLEUNIK', 'PDATE', 'PDESC', 'PSymptome', 'PCAUSE', 'PCORRECTIF', 'PCODEREP', 'PCODERAI', 'PPOSI', 'PTEMPSR', 'PTYPE', 'PSTATUT', 'PDepannage', 'CPCLEUNIK', 'PNOSEQ'],
  TBONSDET: ['TBCLEUNIK', 'PCLEUNIK', 'NUM_INTERN', 'DESC_80', 'QTE_INT', 'COM_JOB', 'DATA_COD', 'DATA_RAIS'],
  VEHICUL: ['VECLEUNIK', 'NOUNITE', 'MARQUE', 'MODELE', 'ANNEE', 'TYPEVEC', 'CICLEUNIK'],
  TBONSMEC: ['TBCLEUNIK', 'PCLEUNIK', 'PCLEUNIKDET', 'DESC_80', 'DATA_COD', 'DATA_RAIS', 'TEMPSREEL', 'TEMPSE', 'ORDRELIGNE', 'DATESTMP'],
  A_CodeReparationExclu: ['ID_CodeReparationExclu', 'CRECode', 'CREDescription', 'CREExclu'],
  A_CodeRaisonExclu: ['ID_CodeRaisonExclu', 'CRACode', 'CRADescription', 'CRAExclu'],
};
const TABLE_NAMES = Object.keys(EXPECTED);
const TEXT_COLUMNS = {
  Plainte: ['PDESC', 'PSymptome', 'PCAUSE', 'PCORRECTIF'],
  PlainteDet: ['PDESC', 'PSymptome', 'PCAUSE', 'PCORRECTIF'],
  TBONS: ['DESC_80'], TBONSDET: ['DESC_80'], TBONSMEC: ['DESC_80'],
};

// ---------- text helpers ----------
function norm(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}
const TRIVIAL = new Set(TRIVIAL_TEXTS.map(norm));
function isTrivial(n) {
  if (TRIVIAL.has(n)) return true;
  const s = n.replace(/^[\s.,;:!?\-_*()\/]+|[\s.,;:!?\-_*()\/]+$/g, '');
  return s === '' || TRIVIAL.has(s);
}
function classify(raw) {
  const t = (raw || '').trim();
  if (!t) return 'empty';
  const n = norm(t);
  if (isTrivial(n)) return 'trivial';
  if (n.length < MIN_USABLE_CHARS) return 'short';
  return 'usable';
}
const isUsable = (raw) => classify(raw) === 'usable';

// ---------- number / date helpers ----------
function parseDate(s) {
  if (s == null) return null;
  let t = String(s).trim();
  if (!t) return null;
  t = t.replace(/\.0+$/, '');
  let y, m, d, mt;
  if ((mt = /^(\d{4})(\d{2})(\d{2})$/.exec(t))) { y = +mt[1]; m = +mt[2]; d = +mt[3]; }
  else if ((mt = /^(\d{4})-(\d{2})-(\d{2})/.exec(t))) { y = +mt[1]; m = +mt[2]; d = +mt[3]; }
  else return null;
  if (y < 1990 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = Date.UTC(y, m - 1, d);
  const chk = new Date(dt);
  if (chk.getUTCMonth() !== m - 1) return null;
  return Math.round(dt / 86400000);
}
const dayToIso = (n) => new Date(n * 86400000).toISOString().slice(0, 10);
function parseFlag(s) {
  const t = norm(s || '');
  if (['1', '-1', 'true', 'vrai', 'oui', 'o', 'y', 'yes', 't', 'x'].includes(t)) return 'yes';
  if (['0', 'false', 'faux', 'non', 'n', 'no', 'f', ''].includes(t)) return 'no';
  return 'other:' + t;
}
function median(arr) {
  if (!arr.length) return 0;
  const a = arr.slice().sort((x, y) => x - y);
  const m = a.length >> 1;
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}
const pct = (x, y) => (y ? (100 * x / y).toFixed(1) + '%' : 'n/a');
const nf = (n) => Number(n).toLocaleString('en-US');
const cell = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
function mdTable(headers, rows) {
  const out = ['| ' + headers.map(cell).join(' | ') + ' |', '|' + headers.map(() => '---').join('|') + '|'];
  for (const r of rows) out.push('| ' + r.map(cell).join(' | ') + ' |');
  return out.join('\n');
}
function topEntries(map, n) {
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]))).slice(0, n);
}
const inc = (map, key, by = 1) => map.set(key, (map.get(key) || 0) + by);

// ---------- CSV reading ----------
function decodeBuffer(buf) {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) return { text: new TextDecoder('utf-16le').decode(buf.subarray(2)), enc: 'UTF-16' };
  let start = 0;
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) start = 3;
  try {
    return { text: new TextDecoder('utf-8', { fatal: true }).decode(buf.subarray(start)), enc: start ? 'UTF-8 (BOM)' : 'UTF-8' };
  } catch (e) {
    return { text: new TextDecoder('windows-1252').decode(buf), enc: 'Windows-1252' };
  }
}
function detectDelimiter(text) {
  const nl = text.search(/\r|\n/);
  const first = nl < 0 ? text : text.slice(0, nl);
  const counts = { ',': 0, ';': 0, '\t': 0, '|': 0 };
  let inQ = false;
  for (const c of first) {
    if (c === '"') inQ = !inQ;
    else if (!inQ && c in counts) counts[c]++;
  }
  let best = ',', bc = 0;
  for (const k of [',', ';', '\t', '|']) if (counts[k] > bc) { best = k; bc = counts[k]; }
  return best;
}
function parseCsv(text, delim) {
  const rows = [];
  let row = [], field = '', inQ = false, i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQ = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"' && field === '') { inQ = true; i++; continue; }
    if (c === delim) { row.push(field); field = ''; i++; continue; }
    if (c === '\r' && text[i + 1] === '\n') { i++; continue; }
    if (c === '\n' || c === '\r') {
      row.push(field);
      if (!(row.length === 1 && row[0] === '')) rows.push(row);
      row = []; field = ''; i++; continue;
    }
    field += c; i++;
  }
  if (field !== '' || row.length) {
    row.push(field);
    if (!(row.length === 1 && row[0] === '')) rows.push(row);
  }
  return rows;
}

// ---------- table loading ----------
function matchTable(stem) {
  const s = stem.toLowerCase();
  const names = TABLE_NAMES.slice().sort((a, b) => b.length - a.length);
  for (const tn of names) {
    const t = tn.toLowerCase();
    if (s === t || (s.startsWith(t) && /^[^a-z0-9]/.test(s.slice(t.length)))) return tn;
  }
  return null;
}
function loadTable(name, files, warnings) {
  const wanted = new Map(EXPECTED[name].map((c) => [c.toUpperCase(), c]));
  const t = { name, files: [], rows: [], present: new Set(), ignoredPerson: new Set(), ignoredCost: new Set(), extras: new Set(), encodings: [], ragged: 0 };
  for (const f of files) {
    const { text, enc } = decodeBuffer(fs.readFileSync(f));
    let body = text;
    let delim = null;
    const sep = /^sep=(.)\r?\n/i.exec(body);
    if (sep) { delim = sep[1]; body = body.slice(sep[0].length); }
    if (!delim) delim = detectDelimiter(body);
    const data = parseCsv(body, delim);
    t.files.push(path.basename(f));
    t.encodings.push(enc + ', delimiter ' + (delim === '\t' ? 'TAB' : "'" + delim + "'"));
    if (!data.length) { warnings.push(`${path.basename(f)} is empty.`); continue; }
    const header = data[0].map((h) => h.replace(/^﻿/, '').trim());
    const keep = []; // index -> canonical name
    const seen = new Set();
    header.forEach((h, idx) => {
      const up = h.toUpperCase();
      if (!up) return;
      t.present.add(up);
      if (wanted.has(up)) { if (!seen.has(up)) { keep.push([idx, wanted.get(up)]); seen.add(up); } }
      else if (PERSON_COLUMNS.includes(up) || PERSON_PREFIXES.some((p) => up.startsWith(p))) t.ignoredPerson.add(h);
      else if (COST_COLUMNS.includes(up)) t.ignoredCost.add(h);
      else t.extras.add(h);
    });
    for (let r = 1; r < data.length; r++) {
      const src = data[r];
      if (src.length !== header.length) t.ragged++;
      const o = {};
      for (const [idx, cname] of keep) o[cname] = src[idx] == null ? '' : src[idx];
      t.rows.push(o);
    }
  }
  t.missing = EXPECTED[name].filter((c) => !t.present.has(c.toUpperCase()));
  t.has = (c) => t.present.has(c.toUpperCase());
  return t;
}

// ---------- main ----------
function main() {
  const args = process.argv.slice(2);
  let input = null, out = null, jsonOut = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') out = args[++i];
    else if (args[i] === '--json') jsonOut = args[++i];
    else if (args[i] === '--help' || args[i] === '-h') { console.log('node analyze-export.js [inputFolder] [--out report.md] [--json metrics.json]'); return 0; }
    else input = args[i];
  }
  input = path.resolve(input || path.join(__dirname, 'export'));
  if (!fs.existsSync(input) || !fs.statSync(input).isDirectory()) {
    console.log(`Input folder not found: ${input}\nPut the CSV files (one per table) in that folder, or pass another folder as the first argument.`);
    return 1;
  }
  const synthetic = fs.existsSync(path.join(input, 'SYNTHETIC_DATA.txt'));
  out = path.resolve(out || path.join(synthetic ? input : __dirname, synthetic ? 'report-synthetic.md' : 'report.md'));

  const warnings = [];
  const all = fs.readdirSync(input);
  const spreadsheets = all.filter((f) => /\.(xlsx|xlsm|xls)$/i.test(f));
  const csvFiles = all.filter((f) => /\.(csv|tsv|txt)$/i.test(f) && f !== 'SYNTHETIC_DATA.txt');
  const byTable = {};
  const unrecognized = [];
  for (const f of csvFiles) {
    const tn = matchTable(path.parse(f).name);
    if (tn) (byTable[tn] = byTable[tn] || []).push(path.join(input, f));
    else unrecognized.push(f);
  }
  if (!Object.keys(byTable).length) {
    if (spreadsheets.length) {
      console.log('Only Excel files (.xlsx) were found. This tool cannot read Excel directly.\nIn Excel: open each file, then File > Save As > "CSV UTF-8 (Comma delimited)", one CSV per sheet,\nnamed after the table (for example TBONS.csv). Put the CSV files in:\n  ' + input);
    } else {
      console.log('No CSV files named after a MIR table were found in:\n  ' + input + '\nExpected names: ' + TABLE_NAMES.map((n) => n + '.csv').join(', '));
    }
    return 2;
  }
  if (spreadsheets.length) warnings.push('Excel files found and NOT read (save each sheet as CSV): ' + spreadsheets.join(', '));
  if (unrecognized.length) warnings.push('Files not matching any table name, skipped: ' + unrecognized.join(', '));

  const T = {};
  for (const tn of TABLE_NAMES) if (byTable[tn]) T[tn] = loadTable(tn, byTable[tn], warnings);
  const M = { synthetic, rows: {} }; // metrics for the JSON output / test checks
  const R = []; // report lines
  const P = (s = '') => R.push(s);

  // ----- lookups -----
  const tbons = T.TBONS;
  const comp = T.PlainteDet || T.Plainte;
  const compName = T.PlainteDet ? 'PlainteDet' : T.Plainte ? 'Plainte' : null;
  const woMap = new Map();
  if (tbons) for (const r of tbons.rows) if (r.TBCLEUNIK !== undefined && !woMap.has(r.TBCLEUNIK.trim())) woMap.set(r.TBCLEUNIK.trim(), r);
  const vehMap = new Map();
  if (T.VEHICUL) for (const r of T.VEHICUL.rows) if (r.VECLEUNIK !== undefined) vehMap.set(r.VECLEUNIK.trim(), r);
  const modelOf = (vec) => {
    if (!T.VEHICUL) return '(no VEHICUL table)';
    if (!T.VEHICUL.has('MODELE')) return '(no MODELE column)';
    const v = vehMap.get((vec || '').trim());
    if (!v) return '(vehicle not found)';
    return (v.MODELE || '').trim() || '(model empty)';
  };
  const dict = (tn, codeCol, descCol, flagCol) => {
    const m = new Map();
    const t = T[tn];
    if (!t) return m;
    for (const r of t.rows) {
      const code = (r[codeCol] || '').trim().toUpperCase();
      if (code) m.set(code, { code: r[codeCol].trim(), desc: (r[descCol] || '').trim(), flag: flagCol && t.has(flagCol) ? parseFlag(r[flagCol]) : 'n/a', rawFlag: (r[flagCol] || '').trim() });
    }
    return m;
  };
  const dictRep = dict('A_CodeReparationExclu', 'CRECode', 'CREDescription', 'CREExclu');
  const dictRai = dict('A_CodeRaisonExclu', 'CRACode', 'CRADescription', 'CRAExclu');

  // ===== header =====
  if (synthetic) {
    P('**SYNTHETIC DATA: this report was produced from FAKE data generated by make-fixtures.js. None of these numbers describe the real MIR system.**');
    P();
  }
  P('# MIR export analysis');
  P();
  P(`Generated ${new Date().toISOString().slice(0, 10)} from folder \`${path.basename(input)}\`. No free text and no person-identifying column is shown or stored in this report.`);
  P();
  P(`Settings: usable text = at least ${MIN_USABLE_CHARS} characters after trimming/removing accents and case, and not in the trivial list (${TRIVIAL_TEXTS.map((x) => '`' + x + '`').join(', ')}). Repeat window = ${REPEAT_WINDOW_DAYS} days. Both are constants at the top of analyze-export.js.`);
  P();

  // ===== 1. counts =====
  P('## 1. Size of the export');
  P();
  const rowsTable = [];
  for (const tn of TABLE_NAMES) {
    const t = T[tn];
    M.rows[tn] = t ? t.rows.length : null;
    rowsTable.push([tn, t ? nf(t.rows.length) : 'NOT FOUND', t ? t.files.join(', ') : '', t ? t.encodings.join('; ') : '']);
  }
  P(mdTable(['Table', 'Rows', 'File(s)', 'Detected format'], rowsTable));
  P();
  const woIds = new Set(woMap.keys());
  const woRows = tbons ? tbons.rows.length : 0;
  M.workOrders = woIds.size; M.complaintLines = comp ? comp.rows.length : null;
  P(`- Work orders (distinct TBCLEUNIK in TBONS): **${nf(woIds.size)}**` + (tbons && woRows !== woIds.size ? ` (WARNING: ${nf(woRows)} rows, so some TBCLEUNIK repeat)` : ''));
  P(`- Complaint lines (rows of ${compName || 'Plainte/PlainteDet, not found'}): **${comp ? nf(comp.rows.length) : 'n/a'}**` + (T.Plainte && T.PlainteDet ? ' (both tables present: PlainteDet is used for all analyses below)' : ''));
  if (tbons) {
    const dates = [], closes = [];
    let badD = 0, badC = 0;
    for (const r of tbons.rows) {
      if (tbons.has('DATE')) { const d = parseDate(r.DATE); if (d != null) dates.push(d); else if ((r.DATE || '').trim() && (r.DATE || '').trim() !== '0') badD++; }
      if (tbons.has('DATE_CLOSE')) { const d = parseDate(r.DATE_CLOSE); if (d != null) closes.push(d); else if ((r.DATE_CLOSE || '').trim() && (r.DATE_CLOSE || '').trim() !== '0') badC++; }
    }
    const rng = (a) => (a.length ? `${dayToIso(a.reduce((x, y) => Math.min(x, y)))} to ${dayToIso(a.reduce((x, y) => Math.max(x, y)))}` : 'none readable');
    M.dateRange = rng(dates);
    P(`- TBONS.DATE range: **${rng(dates)}** (${nf(dates.length)} readable; ${nf(badD)} unreadable)`);
    P(`- TBONS.DATE_CLOSE range: ${rng(closes)} (${nf(closes.length)} work orders have a close date; ${nf(badC)} unreadable)`);
    const cnt = (col) => { const m = new Map(); for (const r of tbons.rows) inc(m, (r[col] || '').trim() || '(empty)'); return topEntries(m, 8).map(([k, v]) => `${k}: ${nf(v)}`).join(', '); };
    for (const c of ['IDStatutBT', 'Id_ClasseBT']) if (tbons.has(c)) P(`- TBONS.${c} values (top 8): ${cnt(c)}`);
    const flagCounts = ['CB_PLANIFIE', 'CB_NONPLANIFIE', 'CB_URGENCE'].filter((c) => tbons.has(c)).map((c) => `${c}: ${nf(tbons.rows.filter((r) => parseFlag(r[c]) === 'yes').length)} set`);
    if (flagCounts.length) P(`- Work-order type flags (read as yes/no): ${flagCounts.join(', ')}`);
  }
  // join checks
  if (comp && tbons && comp.has('TBCLEUNIK')) {
    const orphan = comp.rows.filter((r) => !woMap.has((r.TBCLEUNIK || '').trim())).length;
    M.orphanComplaints = orphan;
    P(`- Join check: ${nf(orphan)} complaint lines (${pct(orphan, comp.rows.length)}) point to a work order not found in TBONS.`);
  }
  if (tbons && T.VEHICUL && tbons.has('VECLEUNIK')) {
    const orphan = tbons.rows.filter((r) => !vehMap.has((r.VECLEUNIK || '').trim())).length;
    P(`- Join check: ${nf(orphan)} work orders (${pct(orphan, tbons.rows.length)}) point to a vehicle not found in VEHICUL.`);
  }
  P();

  // ===== 2. text quality =====
  P('## 2. Free-text columns: how much is really usable?');
  P();
  P(`"Non-empty" and "usable" are shares of ALL rows. Empty = blank. Trivial = in the trivial list. Too short = under ${MIN_USABLE_CHARS} characters. Median length counts non-empty texts only (characters).`);
  P();
  M.text = {};
  const trows = [];
  for (const tn of Object.keys(TEXT_COLUMNS)) {
    const t = T[tn];
    if (!t) continue;
    for (const col of TEXT_COLUMNS[tn]) {
      if (!t.has(col)) { trows.push([`${tn}.${col}`, 'COLUMN MISSING', '', '', '', '', '']); continue; }
      const c = { rows: t.rows.length, empty: 0, trivial: 0, short: 0, usable: 0 };
      const lens = [];
      for (const r of t.rows) { const k = classify(r[col]); c[k]++; if (k !== 'empty') lens.push(r[col].trim().length); }
      M.text[`${tn}.${col}`] = c;
      trows.push([`${tn}.${col}`, nf(c.rows), pct(c.rows - c.empty, c.rows), pct(c.usable, c.rows), pct(c.usable, c.rows - c.empty), `${nf(c.empty)} / ${nf(c.trivial)} / ${nf(c.short)}`, median(lens)]);
    }
  }
  P(mdTable(['Column', 'Rows', 'Non-empty', 'Usable', 'Usable among non-empty', 'Empty / trivial / too short (rows)', 'Median length'], trows));
  P();

  // ===== 3. closed work orders and usable cases =====
  P('## 3. Closed work orders and usable corrective cases');
  P();
  M.closed = null;
  if (!tbons || !tbons.has('DATE_CLOSE') || !comp) {
    P('Skipped: needs TBONS with DATE_CLOSE and a Plainte/PlainteDet table.');
    P();
  } else {
    const closedSet = new Set();
    for (const [id, r] of woMap) if (parseDate(r.DATE_CLOSE) != null) closedSet.add(id);
    const goodWO = new Set(), anyComp = new Set();
    const perModel = new Map(), perCode = new Map(), perPair = new Map();
    let closedLines = 0, cases = 0;
    const needCols = ['PCAUSE', 'PCORRECTIF'].filter((c) => !comp.has(c));
    for (const r of comp.rows) {
      const wo = (r.TBCLEUNIK || '').trim();
      if (!closedSet.has(wo)) continue;
      closedLines++; anyComp.add(wo);
      if (isUsable(r.PCAUSE) && isUsable(r.PCORRECTIF)) {
        cases++; goodWO.add(wo);
        const w = woMap.get(wo);
        const model = modelOf((w && w.VECLEUNIK) || r.VECLEUNIK);
        const code = (r.PCODEREP || '').trim().toUpperCase() || '(no code)';
        inc(perModel, model); inc(perCode, code); inc(perPair, model + ' / ' + code);
      }
    }
    M.closed = { closedWorkOrders: closedSet.size, closedWithComplaint: anyComp.size, closedWithUsableCauseAndFix: goodWO.size, usableCases: cases, perModel: Object.fromEntries(perModel) };
    if (needCols.length) P(`WARNING: columns missing (${needCols.join(', ')}); usable counts below are zero.`), P();
    P(`- Closed work orders (DATE_CLOSE set): **${nf(closedSet.size)}** of ${nf(woIds.size)}`);
    P(`- Closed work orders with at least one complaint line: ${nf(anyComp.size)} (${pct(anyComp.size, closedSet.size)})`);
    P(`- **Closed work orders with at least one complaint whose PCAUSE AND PCORRECTIF are both usable: ${nf(goodWO.size)} (${pct(goodWO.size, closedSet.size)})**`);
    P(`- Usable corrective cases (complaint lines on closed work orders with usable PCAUSE and PCORRECTIF): **${nf(cases)}** of ${nf(closedLines)} closed complaint lines (${pct(cases, closedLines)})`);
    P();
    P(`Plan section C bar: "a few hundred usable corrective cases on at least one common model and system". The plan gives no number, so this report ASSUMES ${BAR_CASES} (constant BAR_CASES). The data map has no obvious "system" field, so the repair code (PCODEREP) is used as a stand-in for "system".`);
    P();
    P('**Usable cases per model (MODELE)**');
    P();
    P(mdTable(['Model', 'Usable cases', `>= ${BAR_CASES}?`], topEntries(perModel, 50).map(([k, v]) => [k, nf(v), v >= BAR_CASES ? 'yes' : 'no'])));
    P();
    P(`**Usable cases per repair code (PCODEREP), top ${TOP_N}**`);
    P();
    P(mdTable(['Repair code', 'Meaning (A_CodeReparationExclu)', 'Usable cases', `>= ${BAR_CASES}?`], topEntries(perCode, TOP_N).map(([k, v]) => [k, (dictRep.get(k) || {}).desc || (k === '(no code)' ? '(complaint line has no repair code)' : T.A_CodeReparationExclu ? '(code not in dictionary)' : '(dictionary table not provided)'), nf(v), v >= BAR_CASES ? 'yes' : 'no'])));
    P();
    P(`**Model + repair code pairs, top ${TOP_N}** (this is the closest thing to "one common model and system")`);
    P();
    P(mdTable(['Model / repair code', 'Usable cases', `>= ${BAR_CASES}?`], topEntries(perPair, TOP_N).map(([k, v]) => [k, nf(v), v >= BAR_CASES ? 'yes' : 'no'])));
    const nPairs = Array.from(perPair.values()).filter((v) => v >= BAR_CASES).length;
    M.closed.pairsAtBar = nPairs;
    P();
    P(`Model/code pairs reaching ${BAR_CASES} usable cases: **${nPairs}**.`);
    P();
  }

  // ===== 4. codes =====
  P('## 4. Repair codes and reason codes');
  P();
  const codeSection = (label, col, dc, dictTable, flagLabel) => {
    if (!comp || !comp.has(col)) { P(`${label}: column ${col} not available.`); P(); return null; }
    const counts = new Map();
    let empty = 0;
    for (const r of comp.rows) { const c = (r[col] || '').trim().toUpperCase(); if (!c) empty++; else inc(counts, c); }
    const nonEmpty = comp.rows.length - empty;
    const decoded = Array.from(counts.entries()).filter(([k]) => dc.has(k)).reduce((s, [, v]) => s + v, 0);
    P(`**${label}** (column ${col}, ${compName}): ${nf(counts.size)} distinct codes; ${pct(nonEmpty, comp.rows.length)} of lines have a code; ${dictTable ? pct(decoded, nonEmpty) + ' of those are found in ' + dictTable : 'dictionary table not provided, nothing can be decoded'}.`);
    P();
    P(mdTable(['Code', 'Description', flagLabel, 'Lines', 'Share of lines with a code'], topEntries(counts, TOP_N).map(([k, v]) => {
      const d = dc.get(k);
      return [k, d ? d.desc : '(not in dictionary)', d ? (d.rawFlag === '' ? '(blank)' : d.rawFlag) : '', nf(v), pct(v, nonEmpty)];
    })));
    P();
    return counts;
  };
  const repCounts = codeSection(`Repair codes, top ${TOP_N}`, 'PCODEREP', dictRep, T.A_CodeReparationExclu ? 'A_CodeReparationExclu' : null, 'CREExclu');
  const raiCounts = codeSection(`Reason codes, top ${TOP_N}`, 'PCODERAI', dictRai, T.A_CodeRaisonExclu ? 'A_CodeRaisonExclu' : null, 'CRAExclu');

  const excluSection = (label, dc, counts, flagName) => {
    P(`**${label}: what carries the "${flagName}" flag?** (we do not know what "Exclu" means; this only shows the facts)`);
    P();
    if (!dc.size) { P('Dictionary table not provided.'); P(); return; }
    const byFlag = new Map();
    for (const [code, d] of dc) {
      const f = d.flag.startsWith('other:') ? 'unrecognized value "' + d.rawFlag + '"' : d.flag;
      const e = byFlag.get(f) || { codes: 0, lines: 0 };
      e.codes++; e.lines += counts ? counts.get(code) || 0 : 0;
      byFlag.set(f, e);
    }
    const totalLines = counts ? Array.from(counts.values()).reduce((a, b) => a + b, 0) : 0;
    P(mdTable([`${flagName} (read as)`, 'Codes in dictionary', 'Complaint lines using them', 'Share of lines with a code'], Array.from(byFlag.entries()).map(([f, e]) => [f, nf(e.codes), nf(e.lines), pct(e.lines, totalLines)])));
    P();
    const flagged = Array.from(dc.values()).filter((d) => d.flag === 'yes').sort((a, b) => (counts ? (counts.get(b.code.toUpperCase()) || 0) - (counts.get(a.code.toUpperCase()) || 0) : 0));
    if (flagged.length) {
      P(`Codes flagged "yes" (${flagged.length}${flagged.length > 40 ? ', first 40 by frequency' : ''}):`);
      P();
      P(mdTable(['Code', 'Description', 'Lines'], flagged.slice(0, 40).map((d) => [d.code, d.desc, nf(counts ? counts.get(d.code.toUpperCase()) || 0 : 0)])));
    } else P('No code is flagged "yes".');
    P();
    M[flagName] = flagged.map((d) => d.code);
  };
  excluSection('Repair codes', dictRep, repCounts, 'CREExclu');
  excluSection('Reason codes', dictRai, raiCounts, 'CRAExclu');

  P('**Codes carried on the parts and task lines** (DATA_COD = repair code, DATA_RAIS = reason code)');
  P();
  const lineRows = [];
  for (const [tn, col, dc, dn] of [['TBONSDET', 'DATA_COD', dictRep, 'A_CodeReparationExclu'], ['TBONSDET', 'DATA_RAIS', dictRai, 'A_CodeRaisonExclu'], ['TBONSMEC', 'DATA_COD', dictRep, 'A_CodeReparationExclu'], ['TBONSMEC', 'DATA_RAIS', dictRai, 'A_CodeRaisonExclu']]) {
    const t = T[tn];
    if (!t || !t.has(col)) { lineRows.push([`${tn}.${col}`, t ? 'COLUMN MISSING' : 'TABLE NOT FOUND', '', '']); continue; }
    let ne = 0, dec = 0;
    for (const r of t.rows) { const c = (r[col] || '').trim().toUpperCase(); if (c) { ne++; if (dc.has(c)) dec++; } }
    lineRows.push([`${tn}.${col}`, pct(ne, t.rows.length), T[dn] ? pct(dec, ne) : '(no dictionary)', nf(t.rows.length)]);
  }
  P(mdTable(['Column', 'Rows with a code', 'Found in dictionary', 'Rows'], lineRows));
  P();

  // ===== 5. repeat repairs =====
  P('## 5. Repeat repairs');
  P();
  P(`Definition used: the same vehicle (VECLEUNIK) and the same repair code (PCODEREP) appears on a DIFFERENT work order 1 to ${REPEAT_WINDOW_DAYS} days after a previous one (by TBONS.DATE). Each (vehicle, code, work order) counts once.`);
  P();
  M.repeat = null;
  if (!comp || !comp.has('PCODEREP') || !tbons || !tbons.has('DATE')) {
    P('Skipped: needs a complaint table with PCODEREP and TBONS with DATE.');
    P();
  } else {
    const seen = new Set();
    const groups = new Map();
    for (const r of comp.rows) {
      const wo = (r.TBCLEUNIK || '').trim();
      const w = woMap.get(wo);
      const date = parseDate(w ? w.DATE : null) ?? parseDate(r.PDATE);
      const veh = ((w && w.VECLEUNIK) || r.VECLEUNIK || '').trim();
      const code = (r.PCODEREP || '').trim().toUpperCase();
      if (date == null || !veh || !code || !wo) continue;
      const key = veh + '\u0001' + code + '\u0001' + wo;
      if (seen.has(key)) continue;
      seen.add(key);
      const gk = veh + '\u0001' + code;
      if (!groups.has(gk)) groups.set(gk, []);
      groups.get(gk).push({ date, wo });
    }
    let events = 0, repeats = 0;
    const perCode = new Map();
    for (const [gk, arr] of groups) {
      const code = gk.split('\u0001')[1];
      arr.sort((a, b) => a.date - b.date);
      const pc = perCode.get(code) || { events: 0, repeats: 0 };
      for (let i = 0; i < arr.length; i++) {
        events++; pc.events++;
        for (let j = i - 1; j >= 0; j--) {
          const diff = arr[i].date - arr[j].date;
          if (diff > REPEAT_WINDOW_DAYS) break;
          if (diff >= 1 && arr[j].wo !== arr[i].wo) { repeats++; pc.repeats++; break; }
        }
      }
      perCode.set(code, pc);
    }
    M.repeat = { events, repeats };
    P(`- Events (vehicle + code + work order): **${nf(events)}**`);
    P(`- Repeat events: **${nf(repeats)}** = **${pct(repeats, events)}** overall`);
    P(`- Caution: the first ${REPEAT_WINDOW_DAYS} days of the export cannot see earlier work orders, so the real rate is probably slightly higher than shown.`);
    P();
    P('**Top 10 repair codes by number of events**');
    P();
    P(mdTable(['Code', 'Meaning', 'Events', 'Repeats', 'Repeat rate'], Array.from(perCode.entries()).sort((a, b) => b[1].events - a[1].events || a[0].localeCompare(b[0])).slice(0, 10).map(([k, v]) => [k, (dictRep.get(k) || {}).desc || '', nf(v.events), nf(v.repeats), pct(v.repeats, v.events)])));
    P();
  }

  // ===== 6. vector estimate =====
  P('## 6. Vector memory estimate (ESTIMATE ONLY)');
  P();
  const records = woIds.size + (comp ? comp.rows.length : 0);
  M.vector = { records };
  P(`Assumption: one record per work order (${nf(woIds.size)}) plus one per complaint line (${nf(comp ? comp.rows.length : 0)}) = **${nf(records)} records** in this export. Size of the vectors alone = records x dimensions x 4 bytes x overhead factor. This is an estimate, not a measurement: it ignores the text and other fields, and the overhead factors (1.0 and 1.5) are guesses to bracket the answer. Quota used for comparison: ${BASIC_VECTOR_QUOTA_GB} GB of vector storage per partition on the Basic tier, up to ${BASIC_MAX_PARTITIONS} partitions (figure taken from the project brief, not re-checked by this tool). GB here = 1,073,741,824 bytes.`);
  P();
  const vrows = [];
  for (const dim of VECTOR_DIMENSIONS) for (const ov of OVERHEAD_FACTORS) {
    const gb = records * dim * 4 * ov / 1073741824;
    vrows.push([dim, ov.toFixed(1), gb.toFixed(3) + ' GB', pct(gb, BASIC_VECTOR_QUOTA_GB), pct(gb, BASIC_VECTOR_QUOTA_GB * BASIC_MAX_PARTITIONS)]);
  }
  P(mdTable(['Dimensions', 'Overhead factor', 'Estimated vector size', `% of 1 partition (${BASIC_VECTOR_QUOTA_GB} GB)`, `% of ${BASIC_MAX_PARTITIONS} partitions (${BASIC_VECTOR_QUOTA_GB * BASIC_MAX_PARTITIONS} GB)`], vrows));
  P();
  P('This export covers the period shown in section 1. A longer history needs a proportionally larger estimate (records scale with the number of years).');
  P();

  // ===== 7. warnings =====
  P('## 7. Warnings, ignored columns, missing columns');
  P();
  const miss = [];
  for (const tn of TABLE_NAMES) {
    if (!T[tn]) miss.push(tn === "Plainte" && T.PlainteDet ? `- Table **Plainte**: no file, not needed because PlainteDet is present: PlainteDet is used for the complaint lines.` : `- Table **${tn}**: no file found.`);
    else if (T[tn].missing.length) miss.push(`- Table **${tn}**: expected columns missing: ${T[tn].missing.join(', ')}`);
  }
  P('**Missing tables / columns** (analyses depending on them are skipped or shown as missing, never silently):');
  P();
  P(miss.length ? miss.join('\n') : '- None. Every expected table and column is present.');
  P();
  const ign = [];
  for (const tn of TABLE_NAMES) {
    const t = T[tn];
    if (!t) continue;
    if (t.ignoredPerson.size) ign.push(`- **${tn}**: ${Array.from(t.ignoredPerson).join(', ')} (identifies a person: NOT read, NOT used)`);
    if (t.ignoredCost.size) ign.push(`- **${tn}**: ${Array.from(t.ignoredCost).join(', ')} (cost, not requested: NOT read, NOT used)`);
  }
  P('**Ignored columns (person-identifying or cost):**');
  P();
  P(ign.length ? ign.join('\n') : '- None found.');
  P();
  const ext = [];
  for (const tn of TABLE_NAMES) if (T[tn] && T[tn].extras.size) ext.push(`- **${tn}**: ${Array.from(T[tn].extras).join(', ')}`);
  P('**Other columns present but not part of this analysis (not read):**');
  P();
  P(ext.length ? ext.join('\n') : '- None.');
  P();
  const other = [];
  for (const tn of TABLE_NAMES) if (T[tn] && T[tn].ragged) other.push(`- ${tn}: ${nf(T[tn].ragged)} rows have a different number of fields than the header (check quotes/delimiter).`);
  for (const w of warnings) other.push('- ' + w);
  P('**Other warnings:**');
  P();
  P(other.length ? other.join('\n') : '- None.');
  P();
  M.ignoredPersonColumns = Object.fromEntries(TABLE_NAMES.filter((t) => T[t] && T[t].ignoredPerson.size).map((t) => [t, Array.from(T[t].ignoredPerson)]));
  M.missing = Object.fromEntries(TABLE_NAMES.filter((t) => T[t] && T[t].missing.length).map((t) => [t, T[t].missing]));

  fs.writeFileSync(out, R.join('\n'), 'utf8');
  if (jsonOut) fs.writeFileSync(path.resolve(jsonOut), JSON.stringify(M, null, 1), 'utf8');

  // ----- console summary (ASCII only) -----
  const c = (k) => M.text[k];
  const u = (k) => (c(k) ? pct(c(k).usable, c(k).rows) : 'n/a');
  console.log('');
  console.log((synthetic ? '*** SYNTHETIC DATA (fake) *** ' : '') + 'MIR export analysis');
  console.log('  Work orders: ' + nf(woIds.size) + ' | complaint lines: ' + (comp ? nf(comp.rows.length) : 'n/a') + ' | dates: ' + (M.dateRange || 'n/a'));
  console.log('  Usable text: PCAUSE ' + u(compName + '.PCAUSE') + ', PCORRECTIF ' + u(compName + '.PCORRECTIF') + ', PSymptome ' + u(compName + '.PSymptome') + ', PDESC ' + u(compName + '.PDESC'));
  if (M.closed) console.log('  Closed work orders with usable cause + fix: ' + M.closed.closedWithUsableCauseAndFix + ' of ' + M.closed.closedWorkOrders + ' (' + pct(M.closed.closedWithUsableCauseAndFix, M.closed.closedWorkOrders) + '); usable cases: ' + M.closed.usableCases + '; model/code pairs >= ' + BAR_CASES + ': ' + M.closed.pairsAtBar);
  if (M.repeat) console.log('  Repeat repairs within ' + REPEAT_WINDOW_DAYS + ' days: ' + M.repeat.repeats + ' of ' + M.repeat.events + ' (' + pct(M.repeat.repeats, M.repeat.events) + ')');
  console.log('  Vector estimate (1536 dims, x1.0): ' + (records * 1536 * 4 / 1073741824).toFixed(3) + ' GB, estimate only');
  const ignCount = Object.values(M.ignoredPersonColumns).reduce((s, a) => s + a.length, 0);
  console.log('  Ignored person columns: ' + ignCount + (ignCount ? ' (' + Object.entries(M.ignoredPersonColumns).map(([t, a]) => t + ': ' + a.join('/')).join('; ') + ')' : '') + ' | missing tables/columns: ' + (Object.keys(M.missing).length + TABLE_NAMES.filter((t) => !T[t] && !(t === 'Plainte' && T.PlainteDet)).length) + ' table(s) affected');
  console.log('  Full report: ' + out);
  return 0;
}

process.exitCode = main();
