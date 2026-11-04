---
title: Azure and Copilot resources — where each one lives
type: entity
status: current
updated: 2026-09-30
sources: [../../docs/azure-region-check-2026-09-24.md, ../../docs/it-requests/2026-09-24-azure-search-plan.md]
---

**Bottom line:** the pilot search service is in East US (the USA), not Canada, which is one reason the new paid service is being requested in Canada Central. Checked 2026-09-24.

| Resource | What it is | Region | Confidence |
|---|---|---|---|
| `boulon-pilot-search` | Azure AI Search, Free tier | East US | Confirmed in portal 2026-09-24 16:30 |
| `boulonpilotstorage` | Storage account with PDFs in container `manuals` | Canada East | Inferred from DNS (Quebec City stamp); Greg to confirm |
| `boulon-pilot-ai` | AI resource, API kind AIServices; models text-embedding-3-small and gpt-5-mini | Canada East | Confirmed in portal |
| Copilot Studio environment (agent BOULON) | [[copilot-studio-agent]] | Europe | From behaviour (Direct Line europe endpoint) |
| New search service (requested) | Azure AI Search Basic | Canada Central | Requested in [[azure-ticket-77048]] |
| New AIServices S0 (requested) | Pay-per-use PDF reading | Canada Central | Requested, same ticket |

All existing Azure items sit in resource group BOULON-PILOT-RG, subscription "Azure subscription 1". [[greg-riley]] holds Owner at subscription level plus Foundry User. Links between regions: no region rule applies between search and storage, or between search and model calls; Copilot Studio (Europe) points to the search address plus a query key ([[azure-region-check-2026-09-24]]).

## Related
[[azure-search-index]] · [[decision-d4b-canada-central]] · [[azure-search-tiers]]

**Where this sits in the stack:** the resource list behind [[azure-ai-stack-map]] (search service, AI services, models, Copilot Studio environment).
