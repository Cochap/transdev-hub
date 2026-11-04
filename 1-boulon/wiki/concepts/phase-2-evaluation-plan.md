---
title: Phase 2 evaluation and go/no-go plan
type: concept
status: proposed
updated: 2026-09-30
sources: [../../docs/phase2-plan-cmms.md]
---

**Bottom line:** expert mechanics test the diagnosis helper blind against a held-out set of real cases before anything opens wider; Henri decides the targets. Draft from 2026-09-24, not approved.

- **Data quality gate (step C):** share of usable text, code consistency, unit-to-model mapping, repeat-repair rate (same vehicle and system back within about 30 days). Greg reviews 20 records with a senior mechanic. One-page report plus [[henri]]'s yes. Proposed bar: a few hundred usable corrective cases on one common model and system.
- **Evaluation (step E):** holdout of 40 to 60 recent, confirmed cases kept out of the index. Measure top-1 and top-3 hits against two baselines: "most common cause" and the manuals-only agent. Three experts score blind (correct first check, safe, invented detail, needless part avoided), with overlapping cases to test agreement; sessions under 45 minutes.
- **Proposed targets (Henri decides):** 0 unsafe recommendations, 0 invented citations, top-3 clearly above the baseline.
- **Go/no-go (step F):** decision pack for Henri; options: expand, add Hexagone via [[samir-macarem]] after go-live, open to more mechanics, or stop. The US only after that.
- Related test method: [[golden-set]], [[boulon-testing]].

## Related
[[phase-2-cmms-diagnosis]] · [[phase-2-architecture]] · [[phase2-plan-cmms]]
