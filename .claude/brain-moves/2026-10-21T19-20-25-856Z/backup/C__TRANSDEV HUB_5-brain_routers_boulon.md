# BOULON — maintenance AI for Transdev Quebec mechanics
Copilot Studio agent (GPT-4.1) + Azure AI Search RAG. Phase 1 = manuals Q&A; Phase 2 = diagnosis help from MIR maintenance history. Folder routers: `1-boulon/docs/ROUTER.md`, `1-boulon/tests/ROUTER.md`, `1-boulon/hq/ROUTER.md`, `1-boulon/mir/ROUTER.md`, `1-boulon/data/ROUTER.md`, `wiki/ROUTER.md`, `1-boulon/rebuild/ROUTER.md`, `1-boulon/recovery/ROUTER.md`, `1-boulon/requests/ROUTER.md`.

| Question | Open |
|---|---|
| What is true right now? | `1-boulon/docs/continuity-log.md` (Status, fix tracker, history); HQ page `boulon-hq.html` |
| What was promised (scope, KPIs, budget)? | `1-boulon/docs/project-brief-551.md` (source of truth; scan in `1-boulon/docs/source-of-truth/`) |
| Planned vs actual dates? | `1-boulon/docs/timeline.md` |
| How is it built? | `1-boulon/docs/implementation-spec.md`, `1-boulon/docs/rag-plan-reference.md`, `1-boulon/docs/index-facts.md` |
| Agent instructions? | `1-boulon/docs/agent-instructions.md` (+ live/paste versions in `docs/`) |
| Phase 2? | `1-boulon/docs/phase2-plan-cmms.md`, `1-boulon/docs/phase2-protocole-test-alex.md`, `1-boulon/docs/mir-data-map.md` |
| Cost, tiers, Azure limits? | `1-boulon/docs/cost-breakdown-2026-10-06.md`, `1-boulon/docs/d4-tier-decision.md`, `1-boulon/docs/azure-*.md` |
| Tickets / requests (French)? | `1-boulon/docs/it-requests/`, `requests/` |
| Decisions Henri can audit? | `1-boulon/docs/adr/` |
| Test evidence? | `1-boulon/docs/test-ledger.md`, `tests/` (use /boulon-data) |
| Explain it to Henri? | `1-boulon/docs/explainer-for-henri.md`, `boulon-report-pipeline` skill |
| Knowledge-wiki layer? | `wiki/index.md` (schema `wiki/CLAUDE.md`) |
| People? | `5-brain/context/people.md` |

Key facts: search endpoint `https://boulon-pilot-search.search.windows.net`; index `multimodal-rag-1790098589411`; two keys (read-only query key for Copilot Studio, admin key for Claude's offline reads) live ONLY in `.env`, never in docs or chat. Two knowledge tiers: manuals authoritative, work orders and notes advisory.
