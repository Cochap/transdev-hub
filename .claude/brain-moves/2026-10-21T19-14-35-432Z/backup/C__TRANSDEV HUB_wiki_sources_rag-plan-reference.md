---
title: Source — RAG plan reference
type: source
status: current
updated: 2026-09-30
sources: [../../docs/rag-plan-reference.md]
---

**Bottom line:** the original 2026-09-22 design rationale: Azure AI Search with hybrid search, deliberate table and diagram handling, cited answers and a verification layer, on a 25 to 35 manual pilot costing about 615 CAD for 6 months.

Plain words: why Azure AI Search was chosen over a knowledge graph or fine-tuning, how the Copilot Studio pieces fit (agent, topic, knowledge source, connected agent) and a glossary. Many passages carry 2026-09-23 "Corrected" notes.

## Key facts
- No credible method eliminates hallucination; the honest goal is traceable answers and "I don't know" ([[abstention]]).
- Not chosen: a knowledge graph (expensive to build and maintain) and fine-tuning on manuals (poor for exact numbers like torque; redo on every revision).
- Pilot sizing logic: prove it against the hardest cases on a slice big enough to trust.
- Cost (2026-09-22): a paid tier about 74 USD per month; 6-month pilot about 615 CAD, about 12 percent of the budget. **Superseded 2026-09-23:** that is Basic, pilot only; the service was actually on Free ([[tier-limits]]).
- Corrected: Phase 1 is 8 tracked steps (not 11); SharePoint retired as a live source; the verification pass was not built.
- Still open at the time: photo support in Copilot Studio; reported hiccups with the Azure AI Search connection; the pilot list.
- Glossary includes chunking, grounding, index and knowledge graph ([[chunking]]).

## Related
[[rag]] · [[explainer-for-henri]] · [[implementation-spec]]
