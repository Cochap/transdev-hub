# BOULON — maintenance AI for Transdev Quebec mechanics
Copilot Studio agent (GPT-4.1) + Azure AI Search RAG. Phase 1 = manuals Q&A; Phase 2 = diagnosis help from MIR maintenance history. Folder routers: `docs/ROUTER.md`, `tests/ROUTER.md`, `hq/ROUTER.md`, `mir/ROUTER.md`, `data/ROUTER.md`, `wiki/ROUTER.md`, `rebuild/ROUTER.md`, `recovery/ROUTER.md`, `requests/ROUTER.md`.

| Question | Open |
|---|---|
| What is true right now? | `docs/continuity-log.md` (Status, fix tracker, history); HQ page `boulon-hq.html` |
| What was promised (scope, KPIs, budget)? | `docs/project-brief-551.md` (source of truth; scan in `docs/source-of-truth/`) |
| Planned vs actual dates? | `docs/timeline.md` |
| How is it built? | `docs/implementation-spec.md`, `docs/rag-plan-reference.md`, `docs/index-facts.md` |
| Agent instructions? | `docs/agent-instructions.md` (+ live/paste versions in `docs/`) |
| Phase 2? | `docs/phase2-plan-cmms.md`, `docs/phase2-protocole-test-alex.md`, `docs/mir-data-map.md` |
| Cost, tiers, Azure limits? | `docs/cost-breakdown-2026-10-06.md`, `docs/d4-tier-decision.md`, `docs/azure-*.md` |
| Tickets / requests (French)? | `docs/it-requests/`, `requests/` |
| Decisions Henri can audit? | `docs/adr/` |
| Test evidence? | `docs/test-ledger.md`, `tests/` (use /boulon-data) |
| Explain it to Henri? | `docs/explainer-for-henri.md`, `boulon-report-pipeline` skill |
| Knowledge-wiki layer? | `wiki/index.md` (schema `wiki/CLAUDE.md`) |
| People? | `context/people.md` |

Key facts: search endpoint `https://boulon-pilot-search.search.windows.net`; index `multimodal-rag-1790098589411`; two keys (read-only query key for Copilot Studio, admin key for Claude's offline reads) live ONLY in `.env`, never in docs or chat. Two knowledge tiers: manuals authoritative, work orders and notes advisory.
