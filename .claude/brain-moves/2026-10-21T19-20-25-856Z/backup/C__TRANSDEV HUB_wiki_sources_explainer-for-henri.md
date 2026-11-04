---
title: Source — Plain-language RAG explainer for Henri
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/explainer-for-henri.md]
---

**Bottom line:** a non-technical explanation of why BOULON moved from a SharePoint connector to RAG, using a made-up trucking company, "Aurora Freight", as a scaling example.

Plain words: before, a general AI peeked into a SharePoint folder (a smarter Ctrl+F) and sometimes filled gaps from general knowledge. Now it searches a prepared index and must answer only from retrieved passages with a citation. Concept page: [[rag]].

## Key facts
- Building blocks: Azure AI Search (the librarian), multimodal indexing (diagram descriptions), Azure AI Foundry (hosts the embedding and chat models), Copilot Studio (unchanged front door), a grounding layer ([[abstention]]).
- Weaknesses of the old setup: tables and diagrams not read well; gaps filled from general knowledge.
- Budget statement (2026-09-22): a 6-month pilot about 615 CAD within the 5,000 CAD project budget. **Superseded** by later Basic quotes ([[tier-limits]]).
- The document says "100+ manuals"; the measured count is 3,052 files ([[manuals-library]]).

## Related
[[rag-plan-reference]] · [[project-history]]
