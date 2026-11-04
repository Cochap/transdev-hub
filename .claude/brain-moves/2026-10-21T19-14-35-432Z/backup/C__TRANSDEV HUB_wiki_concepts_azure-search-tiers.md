---
title: Azure AI Search tiers (Free, Basic, S1 and others)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/azure-tiers-verified-2026-09-24.md, ../../docs/d4-tier-decision.md, ../../docs/azure-limits-pricing-2026-09-23.md]
---

**Bottom line:** a "tier" is the size of search service you pay for. BOULON is on Free today, is asking for Basic, and can switch Basic to S1 in place later if measured data demands it.

Plain words: a **partition** is a block of storage; a **replica** is a copy that answers queries; a **search unit (SU)** is partition x replica and each extra SU costs the same as the first.

| Tier | CAD/month East | CAD/month Central | Storage per partition | Vector quota per partition | Indexes | Max file / chars per file |
|---|---|---|---|---|---|---|
| Free | 0 | 0 | 50 MB total | unverified | 3 | 16 MB / 256,000 |
| Basic | 102.20 | 112.42 | 15 GB | 5 GB | 15 | 16 MB / 512,000 |
| S1 | 339.96 | 373.98 | 160 GB | 35 GB | 50 | 128 MB / 4,000,000 |
| S2 | 1,359.92 | 1,495.84 | 512 GB | 150 GB | 200 | 256 MB / 8,000,000 |
| S3 | 2,719.76 | 2,991.76 | 1 TB | 300 GB | 200 | 256 MB / 16,000,000 |

Basic: up to 3 partitions and 3 replicas (Basic services created after 2024-04-03); 3 partitions give 45 GB and 15 GB of vectors for about CAD 306.60/month (East). The vector quota usually runs out before storage.

## Changing tier
- **Basic to/from S1, S2, S3: in place** (portal Settings, Scale, Change Pricing Tier), up to several hours, service stays online, cannot be cancelled. The current setup must fit the target limits and the region must have capacity.
- **Free to anything: not possible.** A new service is needed (new address and keys, re-point Copilot Studio, re-index).
- **Serverless to/from anything: not possible.** Serverless is priced since 2026-09-13, capped at 1 GB per index and 300 MB of vectors.
- This resolves the planner's doubt in [[phase2-plan-cmms]]: it holds only for Free to Basic.

## Basic vs S1 for BOULON
Basic fits the core library and a MIR prototype ([[phase-2-sizing-scenarios]]); S1 would add about CAD 237.76/month East for capacity not yet needed. Devil's-advocate rule from the D4 memo: upgrade if more than about 5 manuals are cut off ([[d4-tier-decision-source]]). S1 from day 1 only if IT requires private endpoints ([[phase-2-risks-and-flip-conditions]]).

Also: semantic ranker free plan is 1,000 requests/month; Standard plan USD 1.00 per 1,000 after that. SLA needs 2 replicas (queries) or 3 (queries plus indexing).

## Related
[[decision-d4-paid-search-tier]] · [[azure-cost-figures]] · [[azure-search-index]] · [[azure-tiers-verified-2026-09-24]]
