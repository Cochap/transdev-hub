---
title: Azure AI Search index (pilot)
type: entity
status: current
updated: 2026-09-30
sources: [../../docs/index-facts.md, ../../docs/continuity-log.md]
---

The search library behind [[boulon]]. Endpoint `https://boulon-pilot-search.search.windows.net` (service in East US, **Free tier**: 50 MB, 3 indexes, no SLA). Index name `multimodal-rag-1790098589411` holds about 2,250 chunks from 23 PDFs (44.9 of 50 MB used). Two PDFs over 16 MB were excluded; two were cut at about 262K characters. The semantic re-ranker works and is the only mode that finds a French passage from an English question. Keys live only in `.env` ([[rules-index]]); Claude never types keys.

A v2 rebuild (`1-boulon/rebuild/v2/`) on the paid tier fixes citations (title and url from `metadata_storage_name/path`), keeps tables, and adds a `vehicle_family` filter. See [[azure-ticket-77048]], [[rag]]. Full design, validation plan and risks: [[rebuild-v2-pipeline]]. Tier limits and prices: [[azure-limits-pricing-2026-09-23]] (Basic caps a file at 16 MB and 512,000 extracted characters; Free at 16 MB and 256,000).

## Related
[[copilot-studio-agent]] · [[golden-set]]

## Added 2026-09-30 (verified facts from index-facts and the RAG review)
- Sources: [[index-facts]], [[review-rag-pipeline]].
- Fields: `content_id`, `text_document_id`, `document_title`, `image_document_id`, `content_text`, `content_embedding`, `content_path`, `locationMetadata` (page info). Skillset and indexer share the index name prefix `multimodal-rag-1790098589411`.
- Vector search: HNSW, cosine, `m=4, efConstruction=400, efSearch=500`; embedding `text-embedding-3-small`, 1536 dimensions; images described by a ChatCompletionSkill then embedded; semantic configuration `multimodal-rag-1790098589411-semantic-configuration` ([[semantic-reranker]]).
- Excluded: Vicinity Service Manual Final - 2013.pdf (103 MB) and Vicinity Parts Manual 2015.pdf (23 MB). Truncated at 262,144 characters: Vicinity Service Manual.pdf and the emp-cooling-fans manual ([[tier-limits]]).
- Biggest chunk counts: 630, 536, 351, 201, 109, 94. No Orion manual indexed ([[abstention]]).
- Known defects: torque table flattened ([[torque-tables]]); citations show the index name ([[citation-projection]]); chunking is defaults ([[chunking]]).
- Superseded: the docs' index name `boulon-pilot-index` (never real). The chunk table sums to 24 files against a stated 23 (recount pending). Library context: [[manuals-library]].

**Where this sits in the stack:** the index node of [[azure-ai-stack-map]]; the pipeline that fills it is [[azure-search-indexer-and-skillset]], with [[integrated-vectorization]], [[index-projections]] and [[agentic-retrieval-azure]] as neighbours.
