# BOULON index v2: draft for the Basic service (NOT deployed)

Prepared 2026-09-23. **2026-09-25: option A chosen (all keys). Billing is `AIServicesByKey` (`<AI_SERVICES_KEY>` + `<AI_SERVICES_ENDPOINT>`) to a NEW pay-per-use AIServices resource in Canada Central, next to the search service (key billing requires the same region). Earlier (09-24, v5) it was keyless `AIServicesByIdentity`; switching back to that later needs no rebuild. Document Intelligence has no price meters in Canada East, so `boulon-pilot-ai` (Canada East) only keeps the embedding and chat models. `<AI_SERVICES_ENDPOINT>` = the new Canada Central resource. See `docs/azure-region-check-2026-09-24.md`.** Nothing here has been sent to Azure. The files contain placeholders (`<BASIC_ENDPOINT>`, `<STORAGE_CONNECTION>`, `<MANUALS_CONTAINER>`, `<AI_SERVICES_KEY>`, `<AI_SERVICES_ENDPOINT>`, `<AOAI_ENDPOINT>`, `<AOAI_KEY>`, `<AOAI_CHAT_COMPLETIONS_URI>`). Claude fills them from `.env` in memory at deploy time and never writes them to disk. All four JSON files pass a syntax check.

| File | What it is |
|---|---|
| `datasource.json` | Where the PDFs live (Blob Storage), plus deletion tracking |
| `index.json` | The fields: what the search index stores for each chunk (searchable piece of a manual) |
| `skillset.json` | The AI steps that read each PDF and turn it into chunks |
| `indexer.json` | The job that runs those steps and fills the index |

## What changed and why (plain language)

1. **Manual name and link for citations.** New `title` field holds the manual's file name without ".pdf" (for example `401483 Rev B`). New `url` field holds the PDF's web address in storage (`metadata_storage_path`). Copilot Studio's Azure AI Search connector reportedly looks for a field called `title` and a URL field; we had neither, so citations showed the index name. `document_title` (full file name) is kept. The semantic ranker (Microsoft's re-ranking step) now uses `title` as its title.
2. **Page number.** New `page_number` field (a whole number). For picture chunks it is certain: the layout skill gives `locationMetadata.pageNumber` for images. For text chunks, see "Unverified" below.
3. **Torque table fix.** Today the layout skill (Microsoft's PDF reader, "Document Layout skill") runs in *text* mode, which glues table cells together (`M61.0012.715`). v2 runs it in *markdown* mode. Markdown is a simple text format where a table stays a table: `| M6 | 1.00 | 12.7 | 15 |`. It also cuts the manual by its headings (chapter, section, sub-section, stored in `header_1..3`) instead of every 2,000 characters. A second step (Split skill) only cuts sections longer than 4,000 characters, so a normal torque table stays in one chunk. Markdown mode can't output pictures, so a second copy of the layout skill runs in text mode *only* to extract pictures for the existing picture-description step.
4. **Failures stop the job.** `maxFailedItems: 0` and `maxFailedItemsPerBatch: 0`: any manual that fails makes the run report an error instead of a silent "Success" (the v1 setting was -1 = ignore all failures).
5. **Deletion tracking.** When a manual is removed from storage, its chunks should leave the index (native blob soft delete policy). Feasibility caveat in Risks.
6. **Search modes kept.** Vector search (meaning-based), hybrid (words + meaning) and semantic ranking are all kept with the same embedding model (`text-embedding-3-small`, 1536 dimensions). The semantic configuration is named `boulon-v2-index-semantic-configuration` so `tests/run-golden.ps1` finds it without changes.

## Steps Claude will run after approval (in order)

All calls use `api-version=2026-04-01` and the Basic service's admin key from `.env`. Nothing runs until Greg says go.

0. Pre-checks (read-only): `GET <BASIC_ENDPOINT>/servicestats` to confirm Basic limits; confirm on the storage account that blob soft delete is ON and blob versioning is OFF (Greg checks in the portal if Claude has no storage access). Split the 2 Vicinity PDFs (103 MB, 23 MB) under 16 MB and upload them.
1. `PUT <BASIC_ENDPOINT>/datasources/boulon-v2-datasource` with `datasource.json`
2. `PUT <BASIC_ENDPOINT>/indexes/boulon-v2-index` with `index.json`
3. `PUT <BASIC_ENDPOINT>/skillsets/boulon-v2-skillset` with `skillset.json`
4. `PUT <BASIC_ENDPOINT>/indexers/boulon-v2-indexer` with `indexer.json` (creating it starts the first run)
5. Poll `GET <BASIC_ENDPOINT>/indexers/boulon-v2-indexer/status` until done; save the result to `tests/results/`. Any error or warning = stop and report.
6. `GET <BASIC_ENDPOINT>/indexes/boulon-v2-index/stats` for chunk count and size.
7. Point `.env` at the new endpoint/index (Greg pastes the new query key; Claude never types keys) and run the validation below.
8. Only after validation passes: Greg switches Copilot Studio's knowledge source to the new service with the **query key** (read-only).

## How to validate

1. `powershell -ExecutionPolicy Bypass -File tests\run-golden.ps1` with `.env` set to the new index. **Pass = 10/10 in semantic mode** (same as v1). Anything less = red flag, report which question failed.
2. **Torque check** (new). Query string, literal: `recommended assembly torque M6 Class 12.9 bolt`. Pass = the top result's `content_text` contains a pipe-separated row for M6 showing `1.00`, `12.7` and `15` in separate cells, and `title` = `Vicinity Service Manual`. Red flag = `M61.0012.715` or the row split across chunks.
3. **Citation fields check** (new). Same query with `select=title,document_title,url,page_number`. Pass = `title` = the PDF file name (it now keeps `.pdf`, see 2026-09-24 fix), `url` starts with `https://` and ends in `.pdf`, `page_number` = 22 for the torque row. Red flag = any empty.
4. **Coverage check.** Highest `page_number` per manual vs the real page count (the 262K-character cut-off should be gone on Basic, whose limit is 512,000 chars; the Vicinity Service Manual may still hit that).
5. Then in Copilot Studio's Test panel: ask T1 (`What is part HK98-0021?`) and check that the citation shows the manual name, not the index name.

Suggested runner update (not done here): add the two new checks to the golden set as G11/G12 and add `title,url,page_number` to its `select`.

## Verified against Microsoft Learn (fetched 2026-09-23)

- Layout skill parameters `outputFormat`, `markdownHeaderDepth`, `extractionOptions` (applies to both formats), `chunkingProperties` (text only), outputs `markdown_document` / `text_sections` / `normalized_images` (images only in text mode), `locationMetadata.pageNumber`: https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout
- Markdown + Split skill + index projection pattern, `sections/h1..h3`, `/document/title` in projections, `api-version=2026-04-01`, `parsingMode: default`: https://learn.microsoft.com/en-us/azure/search/search-how-to-semantic-chunking
- `NativeBlobSoftDeleteDeletionDetectionPolicy`, soft delete ON / versioning OFF, set from first run: https://learn.microsoft.com/en-us/azure/search/search-how-to-index-azure-blob-changed-deleted
- `extractTokenAtPosition` (`delimiter` is a string, `position` zero-based), mapping one source to several targets, transform in field mappings then project to chunks: https://learn.microsoft.com/en-us/azure/search/search-indexer-field-mappings

## Unverified (test on first run)

- **Page number for text chunks in markdown mode.** The docs say `extractionOptions: ["locationMetadata"]` applies to markdown, but the markdown sample output shows no `locationMetadata`. If `page_number` comes back empty for text chunks, options: (a) switch text chunks to text mode with `chunkingProperties` (page numbers certain, but tables flatten again, so no); (b) move to Microsoft's newer **Content Understanding skill**, which the chunking doc now recommends for new pipelines and which improves table extraction; (c) accept section headings as the locator.
- `cognitiveServices` `AIServicesByKey` properties `key` / `subdomainUrl`, and the ChatCompletionSkill `uri` / `apiKey` properties: not re-checked; the v1 export hid them. Claude will copy their exact shape from the live v1 skillset at deploy time.
- `extractTokenAtPosition` feeding index projections: the field-mappings page both allows it (scenario 3) and says mapping functions "aren't compatible with chunked index mapping". If `title` comes out empty, fallback = map the full name to `title` and strip ".pdf" with a small skill, or keep `.pdf`.
- That Copilot Studio actually reads `title` and `url` (community reports only, see continuity log 11:40). Fallback: Microsoft's documented custom-data-source pattern (`Title` + `ContentLocation`).

## Risks

- **Deletion detection may not work with chunked indexes.** Microsoft: soft delete doesn't apply to "one-to-many" indexing; index projections are one-to-many. If it doesn't remove chunks, removals are done by deleting documents filtered on `text_document_id` / `image_document_id`, or by a full rebuild.
- **Cost.** Two layout skill passes per page (markdown + images) roughly doubles Document Intelligence charges for the build. Pricing not re-checked here; Claude checks the current price before running. Option: drop the image pass if pictures add little.
- **Private PDF links.** `url` points to a private blob; a mechanic clicking it gets "access denied" unless storage access (SAS link or SharePoint copy) is arranged. The manual name still shows.
- **Big tables over 4,000 characters** can still be cut between chunks (with a 400-character overlap). The torque check catches this.
- **`maxFailedItems: 0`** means one bad PDF stops the whole run. That is intended; fix the file and rerun.
- **Truncation.** Basic still cuts extraction at 512,000 characters per file; very long manuals must be split.
- The v1 index keeps running on the Free service until Copilot Studio is switched, so there is no downtime.

## Fix 2026-09-24 (after the `ecc:rag-pipeline-reviewer` review)

- **CRITICAL fixed.** The index projections read `/document/title`, `/document/document_title` and `/document/url`. The indexer's fieldMappings never fill those paths, because the parent row is skipped (`skipIndexingParentDocuments`). The result would have been blank citations, with no error. Projections now read the blob's own fields directly: `title` and `document_title` come from `/document/metadata_storage_name`, and `url` comes from `/document/metadata_storage_path`. So `title` keeps ".pdf" for now. If we want it without ".pdf", add a small skill later. The fieldMappings in `indexer.json` are left in place; they do no harm.
- **New filter field `vehicle_family`**, filterable and facetable. It's filled from a blob metadata value named `vehicle_family` (for example `Lion`, `Vicinity`, `Nova`), set on each PDF when it's uploaded. Why: manuals disagree between models (Lion vs Vicinity on greasing wheel nuts), and Phase 2 needs vehicle-type filters (decision D18). Adding a field later means a full rebuild; adding it now is free. UNVERIFIED: that a missing metadata value just gives an empty field and not an error. The 1-file trial checks this.
