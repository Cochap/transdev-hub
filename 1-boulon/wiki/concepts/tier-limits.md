---
title: Search tier limits (Free, Basic, S1)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/index-facts.md, ../../docs/manuals-inventory-2026-09-23.md, ../../docs/report-copy-final.md, ../../docs/lessons-2026-09-24.md]
---

**Bottom line:** the pilot runs on the Free tier (50 MB, 90 percent full); Basic fixes space and text limits but still has a 16 MB per-file limit, so big manuals must be split into chapters either way.

Plain words: the "tier" is the Azure AI Search price level; it sets how much you can store and how much of each file is read. Wider pricing context: [[azure-search-tiers]] and [[decision-d4-paid-search-tier]].

## Limits as recorded in the project docs
| | Free (now) | Basic | S1 |
|---|---|---|---|
| Storage | 50 MB per index (44.9 used) | 15 GB | larger |
| Indexes | 3 | 15 | n/a in sources |
| Text read per file | 262,144 characters (about 256K) | 512,000 characters | n/a in sources |
| Per-file size | 16 MB | 16 MB | up to 128 MB |
| Notes | may be deleted after inactivity; no SLA; cannot switch to or from | upgrades in place; no SLA with one replica | about 15 to 25 pieces still needed |
Enrichment limit on Free: 20 transactions per indexer per day; indexer runs capped at 3 to 10 minutes.

## Prices quoted
- Basic about 102 CAD per month (Canada East, 2026-09-23); 112 CAD in Canada Central per CLAUDE.md; S1 about 340 CAD per month.
- One-time reading of the core library about 277 CAD; ticket budget about 650 dollars (ceiling 1,200).
- **Superseded:** Canada East (102) replaced by Canada Central (112), because Canada East lacks AI enrichment per Microsoft ([[lessons-2026-09-24]]). Logged in [[open-questions]].

## Consequences
2 excluded and 2 truncated pilot manuals; 101 library files over 16 MB ([[manuals-library]], [[review-findings-rag-pipeline]]).

## Related
[[azure-search-index]] · [[azure-ticket-77048]]
