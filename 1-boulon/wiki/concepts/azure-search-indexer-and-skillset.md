---
title: Azure AI Search indexer, skillset and datasource
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/index-facts.md, ../../rebuild/v2/README.md, ../../rebuild/v2/skillset.json, ../../rebuild/v2/indexer.json, ../../rebuild/v2/datasource.json, ../../docs/cutover-runbook.md, ../../docs/research-2026-10-07/00-combined-recommendation.md]
---

**Bottom line:** the indexer is the job, the skillset is the list of AI reading steps it runs, the datasource is where the PDFs sit, and the index is where chunks land. BOULON's pilot has all four; v2 redesigns the skillset.

Plain words: think of a factory line. The **datasource** is the loading dock (Blob Storage with the PDFs). The **indexer** is the foreman who runs the line on a schedule or on demand. The **skillset** is the list of stations (read the PDF, cut it up, turn text into numbers, describe pictures). The **index** is the finished shelf ([[azure-search-index]]).

## In BOULON today (pilot, Free tier)
- Names: index `multimodal-rag-1790098589411`, skillset `...-skillset`, indexer `...-indexer` ([[index-facts]]). Config exports with secrets removed are in `1-boulon/tests/results/`.
- The indexer config has no override of the 262,144-character cut-off, and indexer failures were ignored (v1 setting -1) ([[rebuild-v2-pipeline]], [[tier-limits]]).

## In v2 (draft, not deployed)
Four files in `1-boulon/rebuild/v2/` ([[rebuild-v2-pipeline]]):
- `datasource.json`: PDFs in Blob Storage plus deletion tracking.
- `index.json`: fields (`title`, `url`, `page_number`, `header_1` to `header_3`, `vehicle_family`, `content_embedding` and more) and the semantic configuration.
- `skillset.json`: seven steps in this order: `layout-markdown` (Document Intelligence Layout, markdown mode, keeps tables as tables), `split-sections` (only cuts sections over 4,000 characters), `embed-text`, `layout-images` (text mode, only to pull pictures), `verbalize-image` (a chat model describes a picture), `embed-image-text`, `shape-image-path`. It also carries the index projections ([[index-projections]]).
- `indexer.json`: `maxFailedItems: 0`, so a failed manual stops the run instead of showing a silent "Success".
Source: [v2 README](../../rebuild/v2/README.md).

## Rules from the cutover runbook
Re-run the post-indexing citation patch after every indexer run, then `node 1-boulon/tests/check-citations.js` (step list in `1-boulon/docs/cutover-runbook.md`; why in [[citation-projection]]). The enrichment cache (saves re-reading) is a preview feature and is not to be relied on until verified.

## Cost lever
The reader step is the money line. Swapping Layout for Microsoft's newer Content Understanding is estimated at CAD 7.08 per 1,000 pages instead of 13.86 (verified on the price list 2026-10-07; table accuracy untested) ([00-combined-recommendation](../../docs/research-2026-10-07/00-combined-recommendation.md), [[azure-cost-figures]]).

## Related
[[azure-ai-stack-map]] · [[integrated-vectorization]] · [[index-projections]] · [[chunking]] · [[torque-tables]] · [[greg-interest-map]] · [[copilot-studio-agent]] · [[phase-2-architecture]] · [[boulon]]
