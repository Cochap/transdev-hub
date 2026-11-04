---
title: Source — IT request for Azure AI Search Basic (v5)
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/it-requests/2026-09-24-azure-search-plan.md]
---

**Bottom line:** the v5 ticket text asks IT for a Basic search service plus a pay-per-use PDF-reading resource, both in Canada Central, and a one-time indexing budget. Sent by Greg on 2026-09-25 with option A (all keys); it is [[azure-ticket-77048]].

## Key facts
- Approver [[pierre-zivec]] (approved in principle 2026-09-24). Resource group BOULON-PILOT-RG, subscription "Azure subscription 1".
- Resources: (1) Azure AI Search Basic, Canada Central, system-assigned managed identity on; (2) an Azure AI services (Foundry) resource, API kind AIServices, S0, Canada Central, only to bill PDF reading (Document Intelligence), with the Cognitive Services User role for the search identity. Storage `boulonpilotstorage` and `boulon-pilot-ai` stay as they are.
- Costs: monthly up to CAD 112.42 (S1 would be 373.98); one-time indexing about CAD 650 with a CAD 1,200 ceiling; alerts at CAD 150/month and CAD 1,200. Detail: [[azure-cost-figures]].
- Justification: Free is about 90% full with 23 manuals; inventory has 3,052 files (core 150 to 300); manuals plus a MIR prototype fit Basic; Basic to S1 is in place; Canada East lacks AI enrichment and Document Intelligence.
- Version history: v2 (13:45) Phase 2 scope and 3,052 manuals; v3 (15:50) Canada East to Central; v4 (16:15) keyless billing to `boulon-pilot-ai`; v5 (16:55) new AIServices resource in Canada Central because Document Intelligence is not sold in Canada East ([[azure-region-check-2026-09-24]]).
- The sent text may still contain managed-identity lines; harmless because option A works with keys ([[decision-d22-option-a-all-keys]]).
- Would change to S1 if Alex's numbers show more than about 300,000 work orders that must be searchable from day 1.
- Written in French ([[feedback-french-requests]]).

## Related
[[azure-search-tiers]] · [[decision-d4b-canada-central]] · [[decision-d4-paid-search-tier]]
