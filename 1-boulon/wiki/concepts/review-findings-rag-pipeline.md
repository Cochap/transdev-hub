---
title: RAG pipeline review findings (2026-09-23)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/review-rag-pipeline.md]
---

**Bottom line:** the retrieval design is sound, but a torque table lost its structure, two manuals are missing, two are truncated, and nothing measures grounding automatically.

Plain words: findings from a read-only probe of the live index by `ecc:rag-pipeline-reviewer`. Summary page: [[review-rag-pipeline]].

## Findings by severity
- **CRITICAL, torque table flattened:** Vicinity p.22 class 12.9 table stored with no separators. See [[torque-tables]].
- **CRITICAL, two manuals excluded by the 16 MB limit:** Vicinity Service Manual Final - 2013.pdf (103,915,627 bytes) and Vicinity Parts Manual 2015.pdf (23,849,408 bytes). Risk: false "I don't have that" for Vicinity parts questions ([[tier-limits]]).
- **HIGH, truncation at 262,144 characters:** Vicinity Service Manual.pdf and the emp-cooling-fans manual.
- **HIGH, no automated grounding evaluation:** only T1 to T3; fix is a versioned golden set of 20 to 30 questions to start ([[golden-set]]).
- **MEDIUM:** unclear whether Copilot Studio uses the semantic re-ranker; English keyword queries weak against French text ([[semantic-reranker]]).
- **LOW:** no explicit chunk size or overlap ([[chunking]]); accented characters show as a replacement glyph in the terminal (probably display only).

## Retrieval configuration
HNSW vectors (cosine), `text-embedding-3-small` 1536 dimensions, Layout-skill chunking, images described then embedded, no relevance-score cutoff, page numbers and bounding polygons available for citations ([[citation-projection]]).

## Evaluation coverage at review time
Baseline dataset, thresholds, slice coverage, regression gate and faithfulness scoring were all absent; the golden set was built afterwards.

## Related
[[review-findings-architecture]] · [[azure-search-index]]

See also in the field: [[rag-field-map]] · [[embeddings]] · [[document-parsing-and-ocr]] · [[rag-evaluation]] · [[greg-interest-map]]
