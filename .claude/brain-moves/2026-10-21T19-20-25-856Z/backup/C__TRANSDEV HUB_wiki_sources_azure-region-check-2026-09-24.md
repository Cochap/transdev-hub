---
title: Source — Azure region and compatibility check
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/azure-region-check-2026-09-24.md]
---

**Bottom line:** Greg asked for 100% certainty before the ticket; the check moved the new search service to Canada Central and added a Canada Central AI resource (v5) because Canada East lacks Document Intelligence.

## Key facts
- Existing resources and regions: [[azure-resources-inventory]] (the pilot search service is in East US, not Canada).
- Rules (Microsoft Learn, read 2026-09-24): Canada East has no AI enrichment; key billing needs the Foundry resource in the same region as search, keyless billing has no region rule; Free cannot be upgraded; embedding and chat skills have no region requirement.
- Options: Canada East search rejected; East US rejected (data leaves Canada); Central search plus keyless billing to `boulon-pilot-ai` downgraded to "not guaranteed" at 16:55; **Central search plus a new AIServices S0 in Central chosen** ([[decision-d4b-canada-central]]).
- Portal checks by [[greg-riley]] at 16:30: `boulon-pilot-ai` API kind AIServices in canadaeast; Greg has Owner on the subscription (plus Foundry User). The ticket still goes through IT because [[pierre-zivec]] approves spending there.
- The Copilot Studio environment is in Europe (Direct Line answers only on the europe endpoint); this does not affect compatibility.
- Document Intelligence: 0 price meters in Canada East; CAD 13.8605 per 1,000 pages in Canada Central.

## Related
[[azure-ticket-77048]] · [[it-request-2026-09-24-azure-search-plan]] · [[azure-search-index]]
