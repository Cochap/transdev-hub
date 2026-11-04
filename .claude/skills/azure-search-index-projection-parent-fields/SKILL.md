---
name: azure-search-index-projection-parent-fields
model: haiku
description: Use when writing or reviewing an Azure AI Search skillset that uses indexProjections with projectionMode skipIndexingParentDocuments (chunk-per-document indexing, integrated vectorization, multimodal RAG). Explains why parent fields like file name and path must be read from /document/metadata_storage_* and not from indexer fieldMappings.
---
# Parent fields in Azure AI Search index projections

## The trap
With `indexProjections.parameters.projectionMode = "skipIndexingParentDocuments"`, the parent document is never written to the index. So the indexer's `fieldMappings` (which map onto parent index fields) never reach the chunk documents. Chunks that expect `title`, `file_name` or `url` from a field mapping end up with those fields empty. Citations then show a generated id (for example `multimodal-rag-ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦`) instead of the manual's name.

## The fix
In each projection's `mappings`, read parent values straight from the enriched document:

```json
{ "name": "file_name",   "source": "/document/metadata_storage_name" },
{ "name": "source_path", "source": "/document/metadata_storage_path" }
```

Do not point `source` at a field-mapping target (for example `/document/title`) unless a skill actually writes that path.

## How to check
- After a 1-file trial run, query the index with `$select=file_name,source_path&$top=5`. Every chunk must show the real file name.
- If the source path needs to be a key or a URL, note that `metadata_storage_path` is the raw blob URL (not base64-encoded) when it comes through a projection.

Found 2026-09-24 in the BOULON v2 rebuild (`1-boulon/rebuild/v2/skillset.json`) during review.
