---
name: boulon-data
model: haiku
description: Use when Greg asks for BOULON numbers, results, status, costs, test scores, usage or "where is the data". Says exactly where the live BOULON numbers and dashboards are and how to read each, read-only.
---
# BOULON data: where the numbers are
Read the one source that answers the question; do not open the rest.

| Number | Where | How |
|---|---|---|
| Current status, open items, decisions | `1-boulon/docs/continuity-log.md` Ã‚Â§3 Status, Ã‚Â§4 fix tracker | Read the section |
| Test runs and pass/fail history | `1-boulon/docs/test-ledger.md` (index of runs), `1-boulon/tests/results/` (dated outputs) | Latest dated file |
| Question sets | `1-boulon/tests/golden/golden-v1.json`, `1-boulon/tests/copilot-eval/boulon-golden-v1.csv`, `boulon-failure-v1.csv` | Run with `1-boulon/tests/run-golden.ps1` or `1-boulon/tests/ask-agent.ps1` (see skill `boulon-agent-testing`) |
| Live index (documents, chunks, retrieval) | Azure AI Search `boulon-pilot-search`, index `multimodal-rag-1790098589411`; facts in `1-boulon/docs/index-facts.md` | `1-boulon/tests/run-pilot-tests.ps1`; keys only in `.env`, never print |
| HQ dashboard (live metrics, run history) | http://127.0.0.1:4777 (start `1-boulon/hq/start-hq.cmd`), history `1-boulon/hq/runs.jsonl` | Open the page; online copy https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9 is read-only |
| Skill model picks and cost | `5-brain/logs/model-routing.jsonl` | One JSON line per pick |
| Spend / budget | `1-boulon/docs/cost-breakdown-2026-10-06.md`, brief 551 budget CAD 5,510.50 | Read file |
| MIR maintenance history (Phase 2) | `1-boulon/data/mir-export/dump/*.csv` (TBONS, TBONSDET, TBONSMEC, VEHICUL, reason codes); map `1-boulon/docs/mir-data-map.md`; analyzer `mir/` | Read-only; same data feeds ZBB |
| Planned vs actual dates | `1-boulon/docs/timeline.md` | Read file |

If a number is not in these places, say it is unknown and label any figure Estimate. Free checks before paid steps.
