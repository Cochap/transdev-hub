---
title: Copilot Studio agent (BOULON)
type: entity
status: current
updated: 2026-09-30
sources: [../../docs/continuity-log.md]
---

The live chat agent. Model GPT-4.1 (writes the replies). Only knowledge source: [[azure-search-index]] ("BOULON Manuals — AI Search Pilot"); SharePoint was retired on purpose for testing ([[retired-items]]). No tools, triggers or connected agents. Instructions: answer only from retrieved text, cite every claim, say "I don't have that information" rather than guess (fixed bilingual line in the Secours fallback topic), never link a part number to a spec unless both appear in the same passage, open every reply with the safety line. Sign-in ("Authenticate with Microsoft") stays ON, which blocks Direct Line tests; the route to automated tests is under review ([[boulon-testing]]).

## Related
[[boulon]] · [[henri]]
