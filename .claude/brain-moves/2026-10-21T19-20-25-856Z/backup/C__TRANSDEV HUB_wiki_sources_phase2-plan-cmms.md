---
title: Source — Phase 2 plan (CMMS diagnosis)
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/phase2-plan-cmms.md]
---

**Bottom line:** a draft, not approved, six-step plan (A to F) for a second, expert-only BOULON helper that suggests "check X first" from past MIR work orders. Written 2026-09-24 by the planner agent after the [[meeting-2026-09-24-pierre]] summary.

Plain words: CMMS/GMAO is the repair-records software ([[mir-cmms]]). The plan is for [[phase-2-cmms-diagnosis]].

## Key facts
- **Core idea:** the mechanic types a symptom; the agent says "we recommend checking X first" and shows how often X was the real cause in N past cases. Only a few expert mechanics use it at first. The Phase 1 manuals agent does not change ([[copilot-studio-agent]]).
- **A Discovery:** Greg meets [[alex-dumenne]]; nobody contacts [[samir-macarem]] before the Hexagone go-live. Risk: MIR may have only free text, no symptom field.
- **B Data access:** an export or sample directly from Alex (no IT ticket); data stays in Azure Canada East (as written in the plan; the later ticket uses Canada Central for search, see [[azure-resources-inventory]]).
- **C Data quality:** measure usable text, code consistency, unit-to-model mapping, and repeat-repair rate (same vehicle/system back within about 30 days). Greg reviews 20 records with a senior mechanic. Proposed bar: a few hundred usable corrective cases on at least one common model and system.
- **D Prototype / E Evaluation / F Go-no-go:** see [[phase-2-architecture]] and [[phase-2-evaluation-plan]].
- **Tier:** stay on Basic for the prototype; decide at go/no-go; if needed jump only once to S1 (about CAD 340/month East meter). See [[azure-search-tiers]].
- **Not verified in the plan:** Basic/S1 limits, in-place upgrade, Copilot Studio connector filters. The in-place question was later answered in [[azure-tiers-verified-2026-09-24]].

## Related
[[phase-2-cmms-diagnosis]] · [[decision-adr-0002-phase2-cmms-diagnosis]] · [[phase2-scope-sizing-2026-09-24]]
