---
title: Source — RAG pipeline review
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/review-rag-pipeline.md]
---

**Bottom line:** `ecc:rag-pipeline-reviewer` found two CRITICAL issues (a flattened torque table, two manuals excluded by the size limit), and Claude confirmed the torque-table finding on raw data.

Plain words: a read-only probe of the live index on 2026-09-23. Good news: real chunk-level citations with page numbers, French and English content, and image captions for diagrams all work. Details on [[review-findings-rag-pipeline]].

## Key facts
- Torque table: Vicinity Service Manual p.22 is stored with 0 pipes, 0 line breaks, 0 table tags, for example `M61.0012.715` meaning M6 / 1.00 pitch / 12.7 kN / 15 Nm. See [[torque-tables]].
- Retrieval configuration: HNSW vector store, cosine, `m=4, efConstruction=400, efSearch=500`; embedding model `text-embedding-3-small` with 1536 dimensions; chunking is Layout skill defaults (no explicit size or overlap); images described by a ChatCompletionSkill then embedded; no relevance-score cutoff.
- Eight golden test questions drawn from real retrieved passages (the seed of [[golden-set]]).
- The English keyword query for the driver-seat cylinder returned only image captions; the French version found the procedure (score 30.95). See [[semantic-reranker]].
- Handoffs suggested: `ecc:docs-lookup` for current limits, `ecc:mle-reviewer` for the evaluation baseline.

## Related
[[chunking]] · [[azure-search-index]] · [[tier-limits]]
