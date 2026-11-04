---
title: Source — Implementation spec
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/implementation-spec.md]
---

**Bottom line:** the step-by-step Phase 1 build plan (Steps 1.1 to 1.8), written 2026-09-22 and annotated with corrections on 2026-09-23.

Plain words: each step is a small checkable unit. Steps 1.2 to 1.6 are done; 1.1 (confirm pilot list) stays open but is effectively answered by the index facts; 1.8 (testing) is in progress.

## Key facts
- Step 1.6 (don't guess layer): turn Allow ungrounded responses OFF and add an abstention instruction. Corrected 2026-09-23: only settings plus instructions are done; the verification layer is not built. See [[abstention]].
- Step 1.7: retire Tier 1 (topic "Part Number Lookup", flow "BOULON Exact Part Lookup", tool "Get items") and connect Azure AI Search as knowledge source. Sub-step 4 ("leave SharePoint ON") is **Superseded 2026-09-23**: SharePoint is not re-enabled; a coverage list is published before wider rollout ([[retired-items]]).
- Step 1.8 tests: T1 `Is part number HK98-0021 in the Baultar manual, and what is it?`; T2 `What is part number 12052641 used for in the Proheat manual?`; T3 (must-abstain) `What's the part number for the pipe fitting in the Orion manual, part 080808082?`; T4 needs rows from the legacy SharePoint list.
- The spec names index `boulon-pilot-index`; the real name is `multimodal-rag-1790098589411` ([[index-facts]]).
- Phase 2 "first specialist" was put under review; one agent plus one index was recommended ([[review-findings-architecture]]). **Superseded** by [[phase-2-cmms-diagnosis]] (diagnosis help from MIR history).

## Related
[[phase-1-manuals-pilot]] · [[golden-set]] · [[copilot-studio-agent]]
