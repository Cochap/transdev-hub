---
title: Semantic re-ranker
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/test-ledger.md, ../../docs/review-rag-pipeline.md, ../../docs/index-facts.md]
---

**Bottom line:** the semantic re-ranker is Microsoft's second pass that re-sorts search results by how well they answer the question; on BOULON's index it is the only mode that scored 41/41, and the only one that reliably finds a French passage from an English question.

Plain words: keyword search is Ctrl+F; hybrid adds meaning-based (vector) matching; semantic adds a re-sort on top ([[rag]]).

## Evidence
- Golden v0 (10 questions): semantic 10/10, hybrid 9/10, keyword 8/10. Golden v1 (41 run): semantic 41/41, hybrid 36/41, keyword 30/41 ([[golden-set]], [[test-ledger]]).
- G8 (English question, French Baultar seat manual): keyword and hybrid missed the top 5; semantic found it at result 3.
- Semantic ranking configuration exists in the index (`multimodal-rag-1790098589411-semantic-configuration`) ([[index-facts]]).

## Open
Whether Copilot Studio actually uses the re-ranker is unverified; the check was closed because the setting is not shown in the UI ([[review-findings-rag-pipeline]], [[open-questions]]).

## Related
[[azure-search-index]] · [[tier-limits]]

See also in the field: [[hybrid-search]] (keyword, vector and reranking together, other rerankers) · [[retrieval-selection-gap]] · [[rag-field-map]] · [[greg-interest-map]]
