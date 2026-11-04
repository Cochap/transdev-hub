---
title: Phase 2 sizing scenarios (what fits on Basic)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/phase2-scope-sizing-2026-09-24.md, ../../docs/azure-tiers-verified-2026-09-24.md]
---

**Bottom line:** every realistic Quebec scenario fits Basic; only all-Canada full history, the US data lake, or an index-per-scope design needs S1. Figures marked A are assumptions.

Measured basis: the pilot index is 44.9 MB for 2,250 chunks (about 20 KB each with vectors); one 1,536-number vector is about 6.2 KB.

| Scenario | Records | Storage | Vectors | Indexes | Fits |
|---|---|---|---|---|---|
| (a) Phase 1 core library (A: about 20k pages) | about 30k | about 0.6 GB | about 0.2 GB | 1-2 | Basic (about 34 core files need splitting) |
| (a+) plus later manuals | about 60k | about 1.2 GB | about 0.4 GB | 1-2 | Basic |
| (b) plus MIR base (A: 90k corrective + 5k summaries) | +95k | about 2.2 GB | about 1.0 GB | 5-6 | Basic |
| (b) MIR high (A: 600k orders) | +600k | about 7.2 GB | about 4.3 GB | 5-6 | Basic, near the 5 GB vector limit; compress vectors (4x smaller) or upgrade |
| (c) all Canadian CMMS | 0.2-1.2M | 2-12 GB | 1.3-7.8 GB | 6-10 | Basic then S1 in place |
| (c) plus US data lake (A: 3M) | +3M | +30 GB | +20 GB | 8+ | S1 |
| No Copilot Studio filtering, index per vehicle/region | same | same | same | up to 24 | S1 (Basic allows 15) |

Vector rule of thumb per 1M chunks at 1,536 dims: float32 about 6.2 GB, float16 about 3.1 GB, int8 about 1.5 GB, binary about 0.19 GB plus overhead; disk is about 3x memory ([[azure-tiers-verified-2026-09-24]]).

## Related
[[azure-search-tiers]] · [[phase-2-risks-and-flip-conditions]] · [[decision-adr-0003-tier-rescoped-for-phase2]] · [[phase-2-architecture]]
