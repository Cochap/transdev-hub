// CLAUDE.md must map the WHOLE vault: every top-level item is named in it, and every path it cites exists.
// Returns a list of gaps (empty = complete). Called by brain.js audit.
const fs = require('fs');
const path = require('path');
module.exports = function mapCheck(HUB) {
  const txt = fs.readFileSync(path.join(HUB, 'CLAUDE.md'), 'utf8');
  const toks = [...txt.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  const esc = (s) => s.replace(/[.+?^${}()|[\]\\]/g, (c) => '\\' + c);
  const pats = toks.filter((t) => t.includes('*')).map((t) => new RegExp('^' + esc(t).split('*').join('.*') + '/?$'));
  const literal = new Set(toks.map((t) => t.replace(/\/$/, '')));
  const gaps = [];
  for (const e of fs.readdirSync(HUB)) if (!literal.has(e) && !pats.some((p) => p.test(e))) gaps.push('not in CLAUDE.md: ' + e);
  for (const t of toks) {
    if (/[<>*\s]|^C:|^\.\.\.|^\//.test(t) || !/\/|\.(md|json|js|ps1|html|txt)$/.test(t)) continue;
    if (!fs.existsSync(path.join(HUB, t))) gaps.push('CLAUDE.md cites missing path: ' + t);
  }
  return gaps;
};
