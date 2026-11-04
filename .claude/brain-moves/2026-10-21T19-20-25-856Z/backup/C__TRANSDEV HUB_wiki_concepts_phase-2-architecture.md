---
title: Phase 2 architecture components
type: concept
status: proposed
updated: 2026-09-30
sources: [../../1-boulon/docs/phase2-plan-cmms.md, ../../1-boulon/docs/phase2-scope-sizing-2026-09-24.md]
---

**Bottom line:** Phase 2 is a second, expert-only agent reading its own MIR index (plus the manuals index) on the same Basic search service. A draft, not approved (plan of 2026-09-24).

- **Separate index** `boulon-workorders-mir` and a **separate agent** "BOULON Diagnostic – pilote expert", shared only with an expert group; consistent with D3 (a new agent only for a new data source or new permissions) ([[copilot-studio-agent]]).
- **Two record types:** one per work order (symptom, cause, correction, parts, region, vehicle type, model, system) and **summaries per symptom** with statistics calculated beforehand, because a chat AI cannot count reliably across 5 search results.
- **Filters** by region, vehicle type and model; the agent asks which vehicle. A `vehicle_family` filterable field was added to `1-boulon/rebuild/v2` (free now, a full rebuild later). Whether the Copilot Studio connector supports filters is unverified; fallbacks: one index per scope (could reach 24 indexes, needing S1) or a Power Automate flow.
- **Citation format:** "MIR, WO #12345, 2021, Nova LFS, Quebec" plus the number of cases; never a name.
- **Answer rules:** "we recommend checking first"; always show the case count; for torque and specs send the mechanic to the manual; below N cases say there is not enough history.
- **Extra resources later:** Azure OpenAI Canada East Regional deployment, an Entra group for experts, Copilot Studio message capacity ([[phase2-scope-sizing-2026-09-24]]).
- **Data landing:** MIR hosting is unknown; Azure cannot read an on-premises SQL directly, so an export or Data Factory may be needed ([[azure-tiers-verified-2026-09-24]]).

## Related
[[phase-2-cmms-diagnosis]] · [[phase-2-evaluation-plan]] · [[phase-2-sizing-scenarios]] · [[mir-cmms]]
