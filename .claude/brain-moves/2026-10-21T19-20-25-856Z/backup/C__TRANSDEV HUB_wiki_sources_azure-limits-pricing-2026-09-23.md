---
title: Source — Azure AI Search limits and pricing notes (2026-09-23)
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/azure-limits-pricing-2026-09-23.md]
---

**Bottom line:** first research pass on tier limits and prices; its key correction is that the pilot runs on the Free tier, not Basic. Partly refined by [[azure-tiers-verified-2026-09-24]].

Plain words: a tier is the size level of the search service; the indexer is the job that reads files into the searchable index.

## Key facts
- Correction header: live service stats showed a 50 MB storage limit and 3 indexes/indexers, so the service is Free. Free cannot be upgraded in place.
- Per-file limits: Free 16 MB / 256,000 characters; Basic 16 MB / 512,000; S1 128 MB / 4,000,000; S2 256 MB / 8,000,000; S3 256 MB / 16,000,000. The observed 262,144-character cut-off is 256 x 1,024, not a documented cap (check the indexer setting).
- Two files were excluded for size (103 MB and 23 MB); S1 alone would fit both.
- Paid Document Intelligence S0 allows 500 MB / 2,000 pages; the search tier cap is the real bottleneck. A 5-minute timeout per document applies and failed attempts are still billed.
- Prices (CAD per month, 730 h): Basic Central 112.42, East 102.20; S1 Central 373.98, East 339.96; S2 Central 1,495.84. Canada Central had a rate increase on 2025-09-01. See [[azure-cost-figures]].
- Document Layout CAD 13.8605 per 1,000 pages; 20 free transactions per indexer per day.
- Example plan: 100 manuals x 300 pages = 30,000 pages, about CAD 416 once; Basic about 1,226 a year vs S1 about 4,080 against the CAD 5,000 budget.
- Not verified then: model per-token rates, the actual region (later found to be East US, see [[azure-region-check-2026-09-24]]), the indexer character setting.

## Related
[[azure-search-tiers]] · [[decision-d4-paid-search-tier]] · [[d4-tier-decision-source]]
