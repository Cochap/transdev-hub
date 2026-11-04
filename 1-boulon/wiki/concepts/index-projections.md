---
title: Index projections (one searchable document per chunk)
type: concept
status: current
updated: 2026-11-04
sources: [../../../.claude/skills/azure-search-index-projection-parent-fields/SKILL.md, ../../rebuild/v2/skillset.json, ../../rebuild/v2/README.md, ../../docs/index-facts.md, ../../docs/cutover-runbook.md]
---

**Bottom line:** an index projection tells the skillset to write each chunk as its own search document and copy chosen parent fields onto it. In v2 the parent file name and path must be read from `/document/metadata_storage_*`, not from indexer field mappings, or citations come out empty.

Plain words: the PDF is the "parent"; each chunk is a "child". Projection means copying the parent's name and link onto every child so each search hit knows which manual it came from. This is the mechanism behind [[citation-projection]] (that page explains the user-visible problem; this page explains the Azure setting).

## The rule (found 2026-09-24 in the v2 review)
- With `projectionMode = skipIndexingParentDocuments` the parent is never written to the index, so the indexer's `fieldMappings` never reach the chunks.
- Fix: in each projection's `mappings`, set `file_name` from `/document/metadata_storage_name` and `source_path` from `/document/metadata_storage_path` (the raw blob URL, not base64, when it comes through a projection).
- Check after a one-file trial: query with `$select=file_name,source_path&$top=5`; every chunk must show the real file name.
Source: [skill](../../../.claude/skills/azure-search-index-projection-parent-fields/SKILL.md).

## In BOULON
- v2 skillset uses `skipIndexingParentDocuments` ([skillset.json](../../rebuild/v2/skillset.json)); status: draft, not deployed ([[rebuild-v2-pipeline]]).
- The pilot already has the chunk-per-document shape (fields `text_document_id`, `image_document_id`, [[index-facts]]); its citations show the index name, the symptom v2 fixes. How the pilot's own projection is configured was not read for this page (unverified).
- Residual v2 risk: the private blob link gives "access denied", so a post-indexing patch maps a SharePoint link with `#page=N` (`1-boulon/docs/cutover-runbook.md`).

## Related
[[azure-ai-stack-map]] · [[azure-search-indexer-and-skillset]] · [[integrated-vectorization]] · [[chunking]] · [[multimodal-retrieval]] · [[greg-interest-map]] · [[azure-search-index]] · [[copilot-studio-agent]] · [[phase-2-architecture]] · [[boulon]]
