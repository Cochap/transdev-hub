---
title: D4b — Canada Central, not Canada East
type: decision
status: current
updated: 2026-09-30
sources: [../../docs/azure-region-check-2026-09-24.md, ../../docs/it-requests/2026-09-24-azure-search-plan.md]
---

**Bottom line:** on 2026-09-24 the search service region changed from Canada East to Canada Central, and the ticket added a pay-per-use AI services resource in Canada Central (v5, 16:55). Reason: Microsoft lists no AI enrichment in Canada East, and the Azure price list shows no Document Intelligence (the PDF-reading AI) there at all.

- Rejected: Canada East (no AI enrichment) and East US (data leaves Canada).
- Cost effect: Basic about CAD 112.42/month in Central vs 102.20 in East ([[azure-cost-figures]]).
- Data stays in Canada. Storage `boulonpilotstorage` and models in `boulon-pilot-ai` stay in Canada East ([[azure-resources-inventory]]).
- Unverified: which Canada Central meter (old or "CC", about 10% higher since 2025-09-01) a new service is billed on.

**Supersedes:** the Canada East assumption in [[decision-adr-0001-paid-search-tier-basic]], [[decision-adr-0003-tier-rescoped-for-phase2]] and [[d4-tier-decision-source]].

## Related
[[azure-ticket-77048]] · [[azure-region-check-2026-09-24]] · [[decision-register]]
