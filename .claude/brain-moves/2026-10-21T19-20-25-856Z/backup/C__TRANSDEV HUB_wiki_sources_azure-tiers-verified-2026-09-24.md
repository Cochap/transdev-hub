---
title: Source — Azure AI Search tiers verified (2026-09-24)
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/azure-tiers-verified-2026-09-24.md]
---

**Bottom line:** the authoritative table of tier limits and prices (Microsoft Learn plus the live price API, 2026-09-24). It settled that Basic to S1 is an in-place switch and corrected the earlier D4 memo.

## Key facts
- Tier table, in-place rules, scaling and vector-size rules: [[azure-search-tiers]] and [[phase-2-sizing-scenarios]].
- Prices and model/skill costs: [[azure-cost-figures]].
- Contradictions it lists against project docs: the D4 memo's "15 GB" is per partition and the 5 GB per-partition vector quota is the likelier ceiling; "either direction" works only if the service still fits Basic limits; serverless has been priced since 2026-09-13 with a 300 MB vector cap per index; the planner's in-place doubt holds only for Free to Basic; the Canada Central CC meter is confirmed (+10%) but which meter applies is unverified. Logged on [[decision-d4-paid-search-tier]] and [[open-questions]].
- Limits for structured records like work orders: indexer runs plan for 2 hours; push batches of 1,000 documents / 16 MB; the Azure SQL indexer reads one table or view and cannot read on-premises SQL directly; private endpoints are not supported on Basic for indexers with a skillset.

## Related
[[phase2-scope-sizing-2026-09-24]] · [[decision-adr-0003-tier-rescoped-for-phase2]]
