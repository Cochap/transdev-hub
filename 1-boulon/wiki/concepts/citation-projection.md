---
title: Citation projection (showing the real manual name)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/test-ledger.md, ../../docs/review-architecture.md, ../../docs/lessons-2026-09-24.md, ../../docs/implementation-spec.md]
---

**Bottom line:** today the agent's citations show the index name instead of the manual; the v2 rebuild fixes this by projecting the parent file's title and URL into every chunk.

Plain words: each chunk must carry the name of the manual (and page) it came from so a mechanic can check the paper copy. "Projection" means copying those parent fields onto the chunks during indexing.

## Facts
- Tests #98, #99, #102 (2026-09-23): right answers but the citation shows `multimodal-rag-…`; rule set: an index-name citation is a citation FAIL ([[golden-set]], [[test-ledger]]).
- Index fields: `document_title` is the raw file name; text chunks have no link back to the PDF; `locationMetadata.pageNumber` exists ([[review-findings-architecture]] H1).
- v2 fix: title and URL from `metadata_storage_name` and `metadata_storage_path`, read from the document metadata, not the indexer field mappings (global skill `azure-search-index-projection-parent-fields`, per [[lessons-2026-09-24]]; [[azure-search-index]]).
- Fix 1 (bold part numbers, spaced markers) stopped a citation marker touching a part number (read as "HK98-00211"); retest 2026-09-24 09:15 PASS.
- Golden G12 (citation fields) waits for v2.

## Related
[[phase-1-manuals-pilot]] · [[chunking]]
