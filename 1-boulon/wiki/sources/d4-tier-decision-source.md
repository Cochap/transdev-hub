---
title: Source — D4 tier decision memo
type: source
status: current
updated: 2026-09-30
sources: [../../docs/d4-tier-decision.md]
---

**Bottom line:** the 2026-09-23 memo (architect agent as devil's advocate, checked against Microsoft Learn) recommended a Basic service in Canada East, with an in-place move to S1 if many manuals are cut off. Its region and some limits were later corrected; see [[decision-d4-paid-search-tier]].

## Key facts
- Options and devil's advocate outcomes: [[azure-search-tiers]] (Free, Serverless Developer preview, Basic, S1, Copilot Studio built-in).
- Fit estimate: 44.9 MB across 23 PDFs is about 1.95 MB per PDF and about 20 KB per chunk (2,250 chunks); 100 manuals is about 195 MB on average, about 3 GB worst case; Basic holds 15 GB. The real limits are 16 MB and 512,000 characters per PDF.
- Upgrade trigger: more than about 5 manuals cut off, then S1 the same day.
- Risks: CAD 150/month alert; Document Intelligence for about 30,000 pages about CAD 416 once (to verify); keep Free until the golden set passes on Basic ([[golden-set]]); delete the Basic service to stop billing.
- Still to verify then: serverless prices (since found), Copilot Studio built-in limits, Document Intelligence cost.

## Related
[[decision-adr-0001-paid-search-tier-basic]] · [[azure-limits-pricing-2026-09-23]]
