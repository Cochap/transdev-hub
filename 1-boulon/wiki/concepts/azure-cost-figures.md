---
title: Azure cost figures for BOULON
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/azure-tiers-verified-2026-09-24.md, ../../docs/it-requests/2026-09-24-azure-search-plan.md, ../../docs/azure-limits-pricing-2026-09-23.md, ../../docs/phase2-scope-sizing-2026-09-24.md]
---

**Bottom line:** the running cost asked for is about CAD 112.42/month (Basic, Canada Central) plus a one-time indexing budget of about CAD 650 with a CAD 1,200 ceiling, inside the CAD 5,000 project budget. Prices from the Azure Retail Prices API on 2026-09-24 unless noted.

## Monthly
- Basic: CAD 102.20 (East), 112.42 (Central). S1: 339.96 (East), 373.98 (Central). Hourly rate x 730 h, billed by the hour, no contract.
- Canada Central has an old meter and a "CC" meter about 10% higher since 2025-09-01; which a new service gets is unverified. Canada East has one meter.
- Alerts set: CAD 150/month on search, CAD 1,200 on the one-time budget.
- S1 instead of Basic: +CAD 237.76/month East, about 2,853/year ([[phase2-scope-sizing-2026-09-24]]). S1 12 months about CAD 4,080 (East) vs Basic about 1,226.

## One-time indexing (Canada Central, CAD)
| Item | Unit price | about 20k pages | about 40k pages |
|---|---|---|---|
| Document Layout, 2 passes | 13.8605 per 1,000 pages | 554 | 1,109 |
| Image extraction | 1.3861 per 1,000 images | 28 | 55 |
| Image descriptions (gpt-5-mini) | about 0.00076 per image | 15 | 30 |
| Embeddings (text-embedding-3-small) | - | under 5 | under 10 |
| Total | | about 602 (asked 650) | about 1,204 (ceiling 1,200) |

Page basis: about 20,000 pages from the manuals inventory; the real count comes from a 1-file trial. If over the ceiling, index in stages or drop the image pass for text-only manuals. The 2026-09-23 memo had 30,000 pages one pass at about CAD 416 ([[d4-tier-decision-source]]).

## Models and skills
text-embedding-3-small USD 0.02/1M tokens Global (0.025 Regional); text-embedding-3-large USD 0.13 (0.158); gpt-5-mini Global input USD 0.25, output 2.00 per 1M (Batch half price). Serverless search: CAD 0.3643 per CU-hour and 0.3327 per GB-month (Central). Document Intelligence free tier F0: 500 pages/month. Unverified: gpt-5-mini Regional in Canada East.

## Phase 2 extras (estimate, assumption)
Per-symptom summaries about USD 10 to 20 one-time; Phase 2 running costs need a named payer, since the CAD 5,000 was scoped for Phase 1.

## Related
[[azure-search-tiers]] · [[azure-ticket-77048]] · [[it-request-2026-09-24-azure-search-plan]] · [[pierre-zivec]]
