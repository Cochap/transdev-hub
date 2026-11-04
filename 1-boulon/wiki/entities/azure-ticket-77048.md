---
title: Azure IT ticket #77048
type: entity
status: open
updated: 2026-09-30
sources: [../../docs/continuity-log.md, ../../docs/it-requests/2026-09-24-azure-search-plan.md, ../../docs/azure-region-check-2026-09-24.md]
---

**Bottom line:** the request for a paid search service is sent and waiting on IT. No update as of 2026-09-30 09:05.

- Sent by [[greg-riley]] on 2026-09-25, option A (all connections by key, like the pilot). Approver [[pierre-zivec]]. Written in French ([[feedback-french-requests]]).
- Asks for: Azure AI Search **Basic** in **Canada Central** (about CAD 112/month max), a pay-per-use AI services resource in Canada Central for reading PDFs, and a one-time indexing budget of about CAD 650 (ceiling CAD 1,200).
- Why Canada Central: Microsoft's region table lists no AI enrichment in Canada East, and v2 needs it.
- IT reply: "further analysis will need to be done". Greg checks the IT portal once a day; no nudging ([[feedback-waiting-on-it]]).
- Why now: the free tier caps the index at 50 MB and is about 90% full ([[azure-search-index]]).

## Related
[[decision-d4-paid-search-tier]] · [[henri]] · [[phase-1-manuals-pilot]]

## Added 2026-09-30 (from the ticket and region-check docs)
- **Exact ask (v5):** Basic in Canada Central with system-assigned identity; an AIServices S0 resource in Canada Central that only bills PDF reading (Cognitive Services User role for the search identity); existing storage and `boulon-pilot-ai` unchanged. Resource group BOULON-PILOT-RG. See [[it-request-2026-09-24-azure-search-plan]].
- **Money:** up to CAD 112.42/month; one-time indexing about CAD 650, ceiling CAD 1,200; alerts at CAD 150/month and CAD 1,200 ([[azure-cost-figures]]).
- **Why Central, precisely:** Canada East has no AI enrichment and no Document Intelligence meters ([[decision-d4b-canada-central]], [[azure-region-check-2026-09-24]]). The pilot search service is in East US ([[azure-resources-inventory]]).
- **Version history:** v2 to v5 on 2026-09-24; sent text may be v4-like, harmless under option A ([[decision-d22-option-a-all-keys]]).
- **Would become S1 only if** more than about 300,000 work orders must be searchable from day 1 ([[azure-search-tiers]]).
- Superseded: ADR 0001 and 0003 list Canada East prices (CAD 102.20 Basic); the ticket supersedes them ([[decision-adr-0001-paid-search-tier-basic]]).
