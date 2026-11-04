#!/usr/bin/env node
'use strict';
/*
 * Generates SYNTHETIC (fake) MIR-style CSV files in mir\fixtures\ to test analyze-export.js.
 * Nothing here is real data. Everything is invented and deterministic (same seed = same files).
 *
 *   node make-fixtures.js            -> writes the CSV files + planted-truth.json
 *   node make-fixtures.js --check    -> compares planted-truth.json with metrics-synthetic.json
 *                                       (written by: node analyze-export.js fixtures --json fixtures\metrics-synthetic.json)
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'fixtures');

// ---------- seeded random ----------
let seed = 20261001;
function rnd() { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
function weighted(items, weights) { const tot = weights.reduce((a, b) => a + b, 0); let x = rnd() * tot; for (let i = 0; i < items.length; i++) { x -= weights[i]; if (x < 0) return items[i]; } return items[items.length - 1]; }
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// ---------- dates ----------
const START = Date.UTC(2025, 9, 1) / 86400000, END = Date.UTC(2026, 8, 30) / 86400000;
function ymd(day) { const d = new Date(day * 86400000); return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate(); }

// ---------- reference data ----------
const REP = [ // code, description, exclu, weight
  ['FRN-01', 'Freins avant - remplacement des garnitures', 0, 14], ['FRN-02', 'Freins arriere - remplacement des garnitures', 0, 9], ['FRN-03', 'Disques et tambours - resurfacage ou remplacement', 0, 5],
  ['SUS-01', "Suspension pneumatique - coussins d'air", 0, 10], ['SUS-02', 'Amortisseurs - remplacement', 0, 5], ['DIR-01', 'Direction - rotules et biellettes', 0, 4],
  ['MOT-01', "Moteur - fuite d'huile", 0, 6], ['MOT-02', 'Moteur - surchauffe', 0, 5], ['MOT-03', "Systeme d'admission d'air", 0, 3],
  ['TRM-01', 'Transmission - patinage', 0, 4], ['ELE-01', 'Electrique - alternateur', 0, 6], ['ELE-02', 'Batterie - remplacement', 0, 5],
  ['ELE-03', 'Eclairage exterieur', 0, 7], ['CLM-01', 'Climatisation - compresseur', 0, 6], ['CLM-02', 'Chauffage - circuit', 0, 4],
  ['POR-01', 'Portes - mecanisme', 0, 8], ['POR-02', "Rampe d'acces", 0, 3], ['PNE-01', 'Pneus - remplacement', 0, 7],
  ['ECH-01', 'Echappement - fuite', 0, 3], ['FIL-01', 'Filtres - remplacement', 0, 4], ['CAR-01', 'Carrosserie', 1, 3],
  ['VIT-01', 'Vitres', 0, 2], ['INS-01', 'Inspection mecanique', 1, 5], ['DIV-01', 'Divers', 1, 3], ['REF-01', 'Refroidissement - radiateur', 0, 3],
];
const RAI = [
  ['USU', 'Usure normale', 'Non'], ['DEF', 'Defaut de piece', 'Non'], ['BRI', 'Bris', 'Non'], ['COR', 'Corrosion', 'Non'], ['ENT', 'Entretien preventif', 'Non'],
  ['ACC', 'Accident', 'Oui'], ['VAN', 'Vandalisme', 'Oui'], ['MAL', 'Mauvaise utilisation', 'Non'], ['ELE', 'Defaillance electrique', 'Non'],
  ['FUI', 'Fuite', 'Non'], ['REG', 'Reglage requis', 'Non'], ['INC', 'Inconnu', 'Non'],
];
const MODELS = [['Nova LFS', 'Nova Bus', 35], ['Orion VII', 'Orion', 25], ['XD40', 'New Flyer', 20], ['Citaro', 'Mercedes-Benz', 12], ['D4500', 'MCI', 8]];

// Good texts are all >= 15 characters and not trivial. Some contain commas, quotes and line breaks on purpose.
const POOL = {
  FRN: { sym: ['Bruit de freinage au ralenti', 'Pedale de frein molle selon le chauffeur', 'Le vehicule tire a gauche au freinage'], cause: ['Garnitures usees a la limite', 'Cylindre de roue qui fuit, liquide present', 'Disque voile suite a surchauffe'], fix: ['Remplace les garnitures avant et verifie les disques', 'Remplace le cylindre, purge du circuit effectuee\nEssai routier concluant', 'Resurface le disque, valide au banc d\'essai'] },
  SUS: { sym: ['Vehicule penche vers la droite', 'Coussin d\'air qui perd la pression', 'Roulement dur et bruyant sur la route'], cause: ['Coussin d\'air perce, fuite audible', 'Valve de nivellement bloquee', 'Amortisseur a bout de course'], fix: ['Remplace le coussin d\'air, controle de la hauteur apres', 'Nettoye et remplace la valve de nivellement', 'Remplace les deux amortisseurs, serrage au couple'] },
  MOT: { sym: ['Voyant moteur allume en conduite', 'Perte de puissance en cote', 'Fuite visible sous le moteur'], cause: ['Joint de couvre-culbuteur deteriore', 'Thermostat bloque en position fermee', 'Capteur de pression defectueux, code present'], fix: ['Remplace le joint, nettoyage de la zone', 'Remplace le thermostat et refait le niveau du liquide', 'Remplace le capteur, efface les codes et fait un essai'] },
  ELE: { sym: ['Batteries a plat le matin', 'Feux de position intermittents', 'Tableau de bord qui scintille'], cause: ['Alternateur ne charge plus', 'Connecteur corrode au faisceau arriere', 'Mauvaise mise a la masse du circuit'], fix: ['Remplace l\'alternateur, test de charge conforme', 'Nettoye le connecteur et applique de la graisse dielectrique', 'Refait la mise a la masse, verifie "toutes les fonctions"'] },
  CLM: { sym: ['Pas d\'air froid a l\'avant', 'Chauffage insuffisant en hiver', 'Bruit du compresseur'], cause: ['Perte de refrigerant, fuite au raccord', 'Vanne de chauffage coincee', 'Embrayage du compresseur use'], fix: ['Repare le raccord et recharge le systeme', 'Remplace la vanne de chauffage, purge de l\'air', 'Remplace l\'embrayage du compresseur'] },
  POR: { sym: ['Porte avant ferme mal', 'Porte arriere reste ouverte', 'Alarme de porte qui sonne'], cause: ['Cylindre pneumatique qui fuit', 'Interrupteur de fin de course dereglé', 'Tringlerie usee aux articulations'], fix: ['Remplace le cylindre pneumatique de la porte', 'Regle l\'interrupteur et fait un test de cycle', 'Remplace la tringlerie et graisse les points'] },
  GEN: { sym: ['Anomalie signalee par le chauffeur', 'Probleme constate lors de la ronde', 'Defaut intermittent difficile a reproduire'], cause: ['Usure normale des composants', 'Piece defectueuse identifiee a l\'inspection', 'Reglage hors tolerance constate au controle'], fix: ['Remplace la piece et valide le fonctionnement', 'Effectue le reglage selon le manuel, essai concluant', 'Inspection complete, correction apportee et testee'] },
};
const groupOf = (code) => (POOL[code.slice(0, 3)] ? code.slice(0, 3) : 'GEN');
const DESC_GOOD = ['Entretien correctif suite a la plainte', 'Reparation demandee par le chauffeur', 'Intervention a l\'atelier de jour', 'Controle et correction du defaut signale', 'Travaux correctifs sur le vehicule'];
const PART_GOOD = ['Garniture de frein avant (jeu)', 'Coussin d\'air de suspension', 'Joint de couvre-culbuteur', 'Filtre a huile moteur', 'Capteur de pression d\'huile', 'Cylindre pneumatique de porte', 'Alternateur 24 volts reconditionne'];
const PART_SHORT = ['Filtre', 'Joint', 'Vis M8', 'Relais', 'Fusible', 'Collier'];
const MEC_GOOD = ['Diagnostic du circuit concerne', 'Demontage et remplacement de la piece', 'Essai routier apres reparation', 'Nettoyage et inspection des composants', 'Remontage et verification du couple'];
const SHORT = ['pneu use', 'fuite', 'bruit', 'joint HS', 'usure', 'a changer', 'voir pneu', 'casse'];
const TRIVIAL = ['OK', 'ok', 'Ok.', 'repare', 'Réparé', 'reparé', 'fait', 'N/A', 'na', 'voir bon', 'Idem', 'à vérifier', '-', '.', '  OK  '];

// ---------- exact-count planting of text quality ----------
function plan(n, fr) { // fr = {empty, trivial, short} fractions; the rest is good
  const cats = [];
  const e = Math.round(n * (fr.empty || 0)), t = Math.round(n * (fr.trivial || 0)), s = Math.round(n * (fr.short || 0));
  for (let i = 0; i < e; i++) cats.push('empty');
  for (let i = 0; i < t; i++) cats.push('trivial');
  for (let i = 0; i < s; i++) cats.push('short');
  while (cats.length < n) cats.push('good');
  return shuffle(cats);
}
const TRUTH_TEXT = {};
function realize(cat, goodPool, key) {
  const c = TRUTH_TEXT[key] || (TRUTH_TEXT[key] = { rows: 0, empty: 0, trivial: 0, short: 0, usable: 0 });
  c.rows++;
  if (cat === 'empty') { c.empty++; return rnd() < 0.5 ? '' : '   '; }
  if (cat === 'trivial') { c.trivial++; return pick(TRIVIAL); }
  if (cat === 'short') { c.short++; return pick(SHORT); }
  c.usable++;
  const g = pick(goodPool);
  if (g.trim().length < 15) throw new Error('bad good text: ' + g);
  return g;
}

// ---------- build data ----------
const vehicles = [];
for (let i = 0; i < 120; i++) {
  const m = weighted(MODELS, MODELS.map((x) => x[2]));
  vehicles.push({ id: 5000 + i, unit: 'S' + String(1000 + i), brand: m[1], model: m[0], year: int(2012, 2023), branch: int(1, 3) });
}
const repWeights = REP.map((r) => r[3]);
const reasonWeights = [8, 5, 4, 2, 3, 1, 1, 1, 3, 3, 3, 1];
const N_BASE = 2760, N_REP = 240, N_NEAR = 0; // planted repeats: 240 (3..28 days); 60 of the base are "near misses" (31..45 days)
const wos = [];
function newLine(code) { return { code, reason: weighted(RAI, reasonWeights)[0] }; }
for (let i = 0; i < N_BASE; i++) {
  const nl = weighted([1, 2, 3], [60, 30, 10]);
  const lines = [];
  for (let k = 0; k < nl; k++) lines.push(newLine(rnd() < 0.03 ? '' : weighted(REP, repWeights)[0]));
  wos.push({ veh: pick(vehicles), date: int(START, END), lines, kind: 'base' });
}
// planted repeats inside 30 days
const bases = wos.slice(0, N_BASE).filter((w) => w.date <= END - 45 && w.lines[0].code);
shuffle(bases);
for (let i = 0; i < N_REP; i++) {
  const src = bases[i];
  wos.push({ veh: src.veh, date: src.date + int(3, 28), lines: [newLine(src.lines[0].code)], kind: 'repeat' });
}
// near misses: same vehicle and code but 31..45 days later (must NOT count unless another event happens to be close)
for (let i = 0; i < 60; i++) {
  const src = bases[N_REP + i];
  wos.push({ veh: src.veh, date: src.date + int(31, 45), lines: [newLine(src.lines[0].code)], kind: 'near' });
}
wos.sort((a, b) => a.date - b.date);
const closedFlags = shuffle(wos.map((_, i) => i < Math.round(wos.length * 0.92)));
let plcId = 700000;
wos.forEach((w, i) => {
  w.id = 100000 + i; w.num = 'BT-' + (200000 + i); w.closed = closedFlags[i];
  w.close = w.closed ? w.date + int(0, 6) : null;
  w.type = weighted(['P', 'N', 'U'], [30, 60, 10]);
  w.lines.forEach((l, k) => { l.id = ++plcId; l.seq = k + 1; });
});
const allLines = [];
wos.forEach((w) => w.lines.forEach((l) => { l.wo = w; allLines.push(l); }));

// complaint texts
const NL = allLines.length;
const cPlan = {
  PDESC: plan(NL, { empty: 0.02, trivial: 0.03 }),
  PSymptome: plan(NL, { empty: 0.10, trivial: 0.05, short: 0.10 }),
  PCAUSE: plan(NL, { empty: 0.15, trivial: 0.15, short: 0.10 }),
  PCORRECTIF: plan(NL, { empty: 0.15, trivial: 0.15, short: 0.10 }),
};
const compCols = ['PDESC', 'PSymptome', 'PCAUSE', 'PCORRECTIF'];
allLines.forEach((l, i) => {
  const g = POOL[groupOf(l.code || 'GEN')];
  l.t = {};
  l.cat = {};
  for (const c of compCols) {
    l.cat[c] = cPlan[c][i];
    const pool = c === 'PDESC' ? DESC_GOOD : c === 'PSymptome' ? g.sym : c === 'PCAUSE' ? g.cause : g.fix;
    l.t[c] = realize(l.cat[c], pool, 'PlainteDet.' + c);
  }
});
// TBONS.DESC_80
const wPlan = plan(wos.length, { empty: 0.05, trivial: 0.05 });
wos.forEach((w, i) => { w.desc = realize(wPlan[i], DESC_GOOD, 'TBONS.DESC_80'); });
// parts and task lines
const parts = [], mecs = [];
allLines.forEach((l) => {
  const np = weighted([0, 1, 2], [30, 50, 20]);
  for (let k = 0; k < np; k++) parts.push({ l, no: 'P' + int(10000, 99999), qty: int(1, 4) });
  const nm = weighted([1, 2], [70, 30]);
  for (let k = 0; k < nm; k++) mecs.push({ l, seq: k + 1 });
});
const pPlan = plan(parts.length, { short: 0.30 });
parts.forEach((p, i) => { p.desc = realize(pPlan[i], PART_GOOD, 'TBONSDET.DESC_80'); if (pPlan[i] === 'short') p.desc = pick(PART_SHORT); });
// (short parts above are overwritten by PART_SHORT: re-count is identical because all are non-trivial and < 15 chars)
const mPlan = plan(mecs.length, { empty: 0.10, trivial: 0.10 });
mecs.forEach((m, i) => { m.desc = realize(mPlan[i], MEC_GOOD, 'TBONSMEC.DESC_80'); });
for (const p of PART_SHORT) if (p.length >= 15) throw new Error('part short too long');

// ---------- independent truth (brute force) ----------
const closedIds = new Set(wos.filter((w) => w.closed).map((w) => w.id));
const goodWO = new Set();
const perModel = {};
let cases = 0;
for (const l of allLines) {
  if (!l.wo.closed) continue;
  if (l.cat.PCAUSE === 'good' && l.cat.PCORRECTIF === 'good') { cases++; goodWO.add(l.wo.id); const m = l.wo.veh.model; perModel[m] = (perModel[m] || 0) + 1; }
}
const events = [];
{
  const seen = new Set();
  for (const l of allLines) {
    if (!l.code) continue;
    const k = l.wo.veh.id + '|' + l.code + '|' + l.wo.id;
    if (seen.has(k)) continue;
    seen.add(k);
    events.push({ veh: l.wo.veh.id, code: l.code, wo: l.wo.id, date: l.wo.date });
  }
}
let repeats = 0;
for (const e of events) {
  if (events.some((f) => f.veh === e.veh && f.code === e.code && f.wo !== e.wo && e.date - f.date >= 1 && e.date - f.date <= 30)) repeats++;
}
const truth = {
  workOrders: wos.length, complaintLines: allLines.length, partLines: parts.length, taskLines: mecs.length,
  text: TRUTH_TEXT,
  closed: { closedWorkOrders: closedIds.size, closedWithUsableCauseAndFix: goodWO.size, usableCases: cases, perModel },
  repeat: { events: events.length, repeats },
  CREExclu: REP.filter((r) => r[2]).map((r) => r[0]).sort(), CRAExclu: RAI.filter((r) => r[2] === 'Oui').map((r) => r[0]).sort(),
  ignoredPersonColumns: { TBONSMEC: ['NOMFULL', 'SALAIRE'] },
};

// ---------- CSV writing ----------
function esc(v, d) { const s = v == null ? '' : String(v); return /["\r\n]/.test(s) || s.includes(d) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function toCsv(cols, rows, d) { return [cols.join(d)].concat(rows.map((r) => r.map((v) => esc(v, d)).join(d))).join('\r\n') + '\r\n'; }
function write(name, cols, rows, opt = {}) {
  const d = opt.delim || ',';
  const text = toCsv(cols, rows, d);
  let buf;
  if (opt.latin1) {
    for (const ch of text) if (ch.charCodeAt(0) > 255) throw new Error('char not in Latin-1 in ' + name);
    buf = Buffer.from(text, 'latin1');
  } else buf = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(text, 'utf8')]);
  fs.writeFileSync(path.join(DIR, name + '.csv'), buf);
}

function checkMode() {
  const t = JSON.parse(fs.readFileSync(path.join(DIR, 'planted-truth.json'), 'utf8'));
  const m = JSON.parse(fs.readFileSync(path.join(DIR, 'metrics-synthetic.json'), 'utf8'));
  const rows = [];
  const cmp = (label, planted, measured) => rows.push([label, JSON.stringify(planted), JSON.stringify(measured), JSON.stringify(planted) === JSON.stringify(measured) ? 'PASS' : 'FAIL']);
  cmp('work orders', t.workOrders, m.workOrders);
  cmp('complaint lines', t.complaintLines, m.complaintLines);
  cmp('rows TBONSDET', t.partLines, m.rows.TBONSDET);
  cmp('rows TBONSMEC', t.taskLines, m.rows.TBONSMEC);
  for (const k of Object.keys(t.text)) {
    const a = t.text[k];
    const b = m.text[k];
    cmp(`${k} empty/trivial/short/usable`, [a.rows, a.empty, a.trivial, a.short, a.usable], b ? [b.rows, b.empty, b.trivial, b.short, b.usable] : null);
  }
  cmp('closed work orders', t.closed.closedWorkOrders, m.closed.closedWorkOrders);
  cmp('closed WOs with usable cause+fix', t.closed.closedWithUsableCauseAndFix, m.closed.closedWithUsableCauseAndFix);
  cmp('usable cases', t.closed.usableCases, m.closed.usableCases);
  cmp('usable cases per model', Object.entries(t.closed.perModel).sort(), Object.entries(m.closed.perModel).sort());
  cmp('repeat events', t.repeat.events, m.repeat.events);
  cmp('repeat repairs (30 days)', t.repeat.repeats, m.repeat.repeats);
  cmp('CREExclu flagged codes', t.CREExclu, (m.CREExclu || []).slice().sort());
  cmp('CRAExclu flagged codes', t.CRAExclu, (m.CRAExclu || []).slice().sort());
  cmp('ignored person columns', t.ignoredPersonColumns, m.ignoredPersonColumns);
  cmp('missing columns reported', {}, m.missing);
  let fail = 0;
  for (const r of rows) { console.log(`${r[3]}  ${r[0]}\n        planted ${r[1]}\n        measured ${r[2]}`); if (r[3] === 'FAIL') fail++; }
  console.log(`\n${rows.length - fail} PASS, ${fail} FAIL`);
  const pc = (a) => (100 * a.usable / a.rows).toFixed(1);
  console.log(`Planted usable PCAUSE ${pc(t.text['PlainteDet.PCAUSE'])}% (60% good planted, 40% unusable by design)`);
  process.exitCode = fail ? 1 : 0;
}

function main() {
  if (process.argv.includes('--check')) return checkMode();
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, 'SYNTHETIC_DATA.txt'), 'All files in this folder are SYNTHETIC (fake) data made by make-fixtures.js. Not real MIR data.\r\n');
  write('TBONS', ['TBCLEUNIK', 'DATE', 'DATE_CLOSE', 'NUM_BON', 'VECLEUNIK', 'CICLEUNIK', 'COD_DEPART', 'ODOAVIE', 'DESC_80', 'CB_PLANIFIE', 'CB_NONPLANIFIE', 'CB_URGENCE', 'IDStatutBT', 'Id_ClasseBT'],
    wos.map((w) => [w.id, ymd(w.date), w.close ? ymd(w.close) : 0, w.num, w.veh.id, w.veh.branch, pick(['ATEL', 'MEC']), int(10000, 600000), w.desc, w.type === 'P' ? 1 : 0, w.type === 'N' ? 1 : 0, w.type === 'U' ? 1 : 0, w.closed ? 3 : 1, int(1, 3)]));
  write('PlainteDet', ['PCLEUNIK', 'TBCLEUNIK', 'VECLEUNIK', 'PDATE', 'PDESC', 'PSymptome', 'PCAUSE', 'PCORRECTIF', 'PCODEREP', 'PCODERAI', 'PPOSI', 'PTEMPSR', 'PTYPE', 'PSTATUT', 'PDepannage', 'CPCLEUNIK', 'PNOSEQ'],
    allLines.map((l) => [l.id, l.wo.id, l.wo.veh.id, ymd(l.wo.date), l.t.PDESC, l.t.PSymptome, l.t.PCAUSE, l.t.PCORRECTIF, l.code, l.reason, pick(['AVG', 'AVD', 'ARG', 'ARD', '']), (int(1, 40) / 4).toFixed(2), pick(['F', 'G']), l.wo.closed ? 'C' : 'O', rnd() < 0.08 ? 1 : 0, '', l.seq]));
  write('TBONSDET', ['TBCLEUNIK', 'PCLEUNIK', 'NUM_INTERN', 'DESC_80', 'QTE_INT', 'COM_JOB', 'DATA_COD', 'DATA_RAIS'],
    parts.map((p) => [p.l.wo.id, p.l.id, p.no, p.desc, p.qty, 0, p.l.code, p.l.reason]));
  write('VEHICUL', ['VECLEUNIK', 'NOUNITE', 'MARQUE', 'MODELE', 'ANNEE', 'TYPEVEC', 'CICLEUNIK'],
    vehicles.map((v) => [v.id, v.unit, v.brand, v.model, v.year, 'Autobus urbain', v.branch]));
  // Windows-1252 + semicolon + a fake person column to test the ignore warning
  write('TBONSMEC', ['TBCLEUNIK', 'PCLEUNIK', 'PCLEUNIKDET', 'DESC_80', 'DATA_COD', 'DATA_RAIS', 'TEMPSREEL', 'TEMPSE', 'ORDRELIGNE', 'DATESTMP', 'NOMFULL', 'SALAIRE'],
    mecs.map((m) => [m.l.wo.id, m.l.id, m.l.id, m.desc, m.l.code, m.l.reason, (int(1, 16) / 4).toFixed(2), (int(1, 16) / 4).toFixed(2), m.seq, ymd(m.l.wo.date) + '120000', 'Mecanicien Fictif ' + int(1, 9), '99.99']),
    { delim: ';', latin1: true });
  write('A_CodeReparationExclu', ['ID_CodeReparationExclu', 'CRECode', 'CREDescription', 'CREExclu'], REP.map((r, i) => [i + 1, r[0], r[1], r[2]]));
  write('A_CodeRaisonExclu', ['ID_CodeRaisonExclu', 'CRACode', 'CRADescription', 'CRAExclu'], RAI.map((r, i) => [i + 1, r[0], r[1], r[2]]), { delim: ';' });
  fs.writeFileSync(path.join(DIR, 'planted-truth.json'), JSON.stringify(truth, null, 1));
  console.log(`SYNTHETIC fixtures written to ${DIR}`);
  console.log(`  ${wos.length} work orders, ${allLines.length} complaint lines, ${parts.length} part lines, ${mecs.length} task lines, ${vehicles.length} vehicles`);
  console.log(`  planted: usable PCAUSE ${(100 * TRUTH_TEXT['PlainteDet.PCAUSE'].usable / NL).toFixed(1)}%, repeats ${repeats}/${events.length}`);
}
main();
