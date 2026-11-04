---
title: Chunking
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/rag-plan-reference.md, ../../docs/review-rag-pipeline.md, ../../docs/review-architecture.md, ../../docs/index-facts.md]
---

**Bottom line:** chunking means cutting each manual into small searchable pieces; BOULON's pilot used the wizard's defaults, which is why tables were flattened, and the v2 rebuild splits big manuals by chapter.

Plain words: a 600-page manual is too big to hand to an AI whole, so it is broken into "chunks" so the search can find just the relevant bit ([[rag]]). The pilot index has 2,250 chunks from 23 PDFs ([[azure-search-index]]).

## Facts
- Pilot chunking is the Layout skill's defaults, with no explicit size or overlap set and `markdownHeaderDepth` null ([[review-findings-rag-pipeline]]).
- Architecture review M4: tables were never handled deliberately; audit the longest and table chunks before the full re-index ([[review-findings-architecture]]).
- Plan intent: tables extracted and kept intact; diagrams keep their captions attached ([[rag-plan-reference]]).
- Chunk counts range from 3 (a short French heater circuit sheet) to 630 (emp cooling fans manual, truncated) ([[index-facts]]).
- Separate from chunking: splitting a whole PDF into chapter files so each fits the per-file limit ([[tier-limits]]). Chapter splitting also gives more precise citations ([[manuals-library]]).

## Related
[[torque-tables]] · [[citation-projection]]

See also in the field: [[rag-field-map]] · [[document-parsing-and-ocr]] (how pages become text and tables before chunking) · [[retrieval-selection-gap]] · [[greg-interest-map]]
