// Rebuilds INDEX.md next to this file from the real skill files. Run after any ECC or synced-skill update:
//   node .claude/skills/boulon-skill-finder/build-index.js
const fs = require('fs'), path = require('path');
const home = process.env.USERPROFILE || process.env.HOME;
const roots = [
  { ns: 'ecc', dir: path.join(home, '.claude/plugins/marketplaces/ecc/skills') },
  { ns: 'anthropic-skills', dir: path.join(home, '.claude/skills/synced/46aa3309-8afb-44c3-88a4-fdea11316a5c_95cacff1-283e-4a9d-861c-6a3054ee6cab') }
];
function desc(file) {
  let t; try { t = fs.readFileSync(file, 'utf8'); } catch (e) { return null; }
  t = t.replace(/\r\n/g, '\n'); const m = t.match(/^---\n([\s\S]*?)\n---/); if (!m) return '';
  const r = m[1].match(/^description:\s*(.*)$/m); if (!r) return '';
  let v = r[1].trim();
  if (/^[>|][-+]?$/.test(v)) { const rest = m[1].slice(m[1].indexOf(r[0]) + r[0].length).split('\n').slice(1); const o = []; for (const l of rest) { if (/^\s+\S/.test(l)) o.push(l.trim()); else break; } v = o.join(' '); }
  return v.replace(/^["']|["']$/g, '').replace(/\s+/g, ' ');
}
// What BOULON uses now (curated from the project history), then topic buckets by keyword.
const NOW = new Set(['verification-loop', 'eval-harness', 'ai-regression-testing', 'deep-research', 'architecture-decision-records', 'living-docs-governance', 'blueprint', 'prompt-optimizer', 'council', 'agent-eval', 'agent-self-evaluation', 'cost-aware-llm-pipeline', 'token-budget-advisor', 'context-budget', 'iterative-retrieval', 'search-first', 'documentation-lookup', 'security-review', 'error-handling', 'knowledge-ops', 'research-ops', 'strategic-compact', 'continuous-learning-v2', 'click-path-audit', 'regex-vs-llm-structured-text', 'api-design', 'cost-tracking', 'benchmark', 'safety-guard', 'gateguard', 'frontend-slides', 'dashboard-builder', 'article-writing', 'unified-memory', 'project-flow-ops', 'plan-orchestrate', 'delivery-gate']);
const bucket = (n, d) => {
  const s = (n + ' ' + d).toLowerCase();
  if (NOW.has(n)) return '1. BOULON now (used or directly useful today)';
  if (/deploy|canary|monitor|observab|incident|production|audit|enterprise|governance|health|quality|compliance-free|rollback|ops\b|operator|scheduling|notification|billing|release/.test(s)) return '2. Production and operations (use at launch and after)';
  if (/rag|retriev|embedding|llm|\bml\b|mle|prompt|context|token|agent|harness|loop|memory|skill|research|knowledge|eval/.test(s)) return '3. AI, agents, retrieval and evaluation';
  if (/doc|slide|deck|article|content|brand|design|video|motion|email|message|visual|ui|frontend|a11y|accessib|seo|marketing|writing|report/.test(s)) return '4. Documents, visuals and communication';
  if (/test|tdd|review|refactor|git|commit|build|lint|verification|security|coding-standards|pattern/.test(s)) return '5. Engineering practice (language-neutral)';
  return '6. Other languages, frameworks and industries (not used by BOULON today)';
};
const rows = [];
for (const r of roots) {
  if (!fs.existsSync(r.dir)) continue;
  for (const d of fs.readdirSync(r.dir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const ds = desc(path.join(r.dir, d.name, 'SKILL.md')); if (ds === null) continue;
    rows.push({ id: r.ns + ':' + d.name, name: d.name, ns: r.ns, d: ds.length > 150 ? ds.slice(0, 147) + '...' : ds });
  }
}
const groups = {};
for (const x of rows) { const b = x.ns === 'anthropic-skills' ? '0. Anthropic synced skills (files, browsers, research)' : bucket(x.name, x.d); (groups[b] = groups[b] || []).push(x); }
let out = '# Skill index (generated ' + new Date().toISOString().slice(0, 10) + ', ' + rows.length + ' skills)\n\nInvoke any of these by name with the Skill tool, even when the list shows only a bare name. Regenerate: `node .claude/skills/boulon-skill-finder/build-index.js`.\n';
for (const k of Object.keys(groups).sort()) { out += '\n## ' + k + ' (' + groups[k].length + ')\n'; for (const x of groups[k].sort((a, b) => a.id.localeCompare(b.id))) out += '- `' + x.id + '`: ' + x.d + '\n'; }
fs.writeFileSync(path.join(__dirname, 'INDEX.md'), out);
const c = {}; for (const k of Object.keys(groups).sort()) c[k] = groups[k].length;
console.log(JSON.stringify(c, null, 1));
