---
title: D4 — paid Basic search tier
type: decision
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/d4-tier-decision.md, ../../1-boulon/docs/adr/0001-paid-search-tier-basic.md, ../../1-boulon/docs/adr/0003-tier-rescoped-for-phase2.md, ../../1-boulon/docs/azure-tiers-verified-2026-09-24.md]
---

**Decision (2026-09-23, revised 09-24):** move from Free to paid **Basic in Canada Central**; split big manuals by chapter; Basic→S1 is an in-place switch if needed later. **Why:** Free caps at 50 MB (pilot is 90% full); the core library needs about 0.6–0.9 GB of index. Basic is about CAD 102/month (112 max in Canada Central). **Approval:** [[pierre-zivec]] in principle 2026-09-24, via [[azure-ticket-77048]]. Free→Basic needs a new service (new address and keys, re-point Copilot Studio, about 5 minutes).

## Related
[[decision-register]] · [[phase-1-manuals-pilot]]

## Added 2026-09-30 (from the ADRs and verified-tiers docs)
- **Tier comparison and in-place rules:** [[azure-search-tiers]]; **costs:** [[azure-cost-figures]].
- **ADR trail:** [[decision-adr-0001-paid-search-tier-basic]], [[decision-adr-0003-tier-rescoped-for-phase2]], [[decision-d4a-pick-plan-once]], [[decision-d4b-canada-central]].
- **Superseded:** the 2026-09-23 memo's "Basic holds 15 GB" is per partition (a new Basic service can scale to 45 GB) and it omitted the 5 GB per-partition vector quota, the likelier ceiling; its "switch in either direction" holds only if the service still fits Basic limits; its serverless "price not checked" is now priced (since 2026-09-13, 300 MB vector cap per index). Source: [[azure-tiers-verified-2026-09-24]].
- **Superseded:** Canada East as the region (memo and ADRs) by Canada Central (ticket v3/v5).
- Memo's other facts: upgrade to S1 if more than about 5 manuals are cut off; keep Free until the golden set passes on Basic ([[d4-tier-decision-source]]).
