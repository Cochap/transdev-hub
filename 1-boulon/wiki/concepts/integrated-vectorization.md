---
title: Integrated vectorization (Azure AI Search)
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/index-facts.md, ../../docs/research-2026-10-07/c-copilot-studio-integration.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../rebuild/v2/README.md]
---

**Bottom line:** integrated vectorization means Azure itself turns text into embeddings, both when indexing and when a question arrives, so no one writes code for it. BOULON uses it today and Copilot Studio supports it.

Plain words: an **embedding** is a list of numbers that stands for a text's meaning, so "find similar meaning" works ([[embeddings]]). A **vectorizer** is the index setting that turns the mechanic's question into an embedding at query time. It must use the same model as indexing, or the numbers do not line up (Verified, vectorizer page, via [c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md)).

## In BOULON
- Pilot: vector search runs through an AI Foundry text vectorizer ([[index-facts]]). Model `text-embedding-3-small`, 1,536 dimensions; pictures are described by a chat step and then embedded ([[azure-search-index]]).
- v2 keeps the same embedding model so existing tests find the same configuration names ([[rebuild-v2-pipeline]]).
- Copilot Studio's Azure AI Search knowledge source supports indexes with integrated vectorization and the semantic ranker (Verified, [diy-vs-azure-stack](../../docs/research-2026-10-15/diy-vs-azure-stack.md) source S9).

## Alternatives studied (not chosen)
Self-hosted embeddings behind a "Custom Web API" vectorizer need an always-on server; whether Copilot Studio works with that kind is Unknown, and it is not recommended for a non-technical owner ([c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) section 5).

## Related
[[azure-ai-stack-map]] · [[azure-search-indexer-and-skillset]] · [[index-projections]] · [[hybrid-search]] · [[semantic-reranker]] · [[rag-field-map]] · [[greg-interest-map]] · [[copilot-studio-agent]] · [[rebuild-v2-pipeline]] · [[phase-2-architecture]] · [[boulon]]
