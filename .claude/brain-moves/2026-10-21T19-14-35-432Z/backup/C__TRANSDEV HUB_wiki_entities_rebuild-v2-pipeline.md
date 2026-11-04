---
title: Rebuild v2 pipeline (draft index for the Basic tier)
type: entity
status: proposed
updated: 2026-09-30
sources: [../../rebuild/v2/README.md, ../../RESUME.md]
---

**Bottom line:** v2 is the redesigned search library (four JSON files in `rebuild/v2/`) that will be created once IT provides the paid Basic service. It fixes citations, keeps torque tables intact and stops silently skipping failed manuals. Nothing has been sent to Azure.

## The four files
`datasource.json` (where the PDFs are in Blob Storage, plus deletion tracking), `index.json` (fields stored per chunk), `skillset.json` (the AI steps that read each PDF), `indexer.json` (the job that runs them). Keys and endpoints are placeholders, filled in memory at deploy time, never written to disk.

## What changes from v1 ([[azure-search-index]])
- **Citations:** `title` and `url` fields read from `metadata_storage_name` / `metadata_storage_path` (the first design read empty paths and would have given blank citations; fixed 2026-09-24 after `ecc:rag-pipeline-reviewer`). Copilot Studio reading these is unverified.
- **Page number** field (certain for picture chunks; for text chunks unverified).
- **Tables:** the layout reader runs in markdown mode so a torque row stays `| M6 | 1.00 | 12.7 | 15 |`, not `M61.0012.715`; chunks follow headings, long sections split at 4,000 characters; a second text-mode pass extracts pictures.
- **Failures stop the job** (`maxFailedItems: 0`) instead of the old ignore-all setting.
- **`vehicle_family` filter** (Lion, Vicinity, Nova...) from blob metadata, needed because manuals disagree between models and Phase 2 wants vehicle filters (D18).
- Vector, hybrid and semantic search kept; embedding model `text-embedding-3-small`, 1536 dimensions.

## Billing and region (2026-09-25, option A)
All keys. Billing is by key to a NEW pay-per-use AIServices resource in Canada Central; Document Intelligence has no price meters in Canada East, so `boulon-pilot-ai` (Canada East) keeps only embedding and chat models. See [[azure-ticket-77048]].

## Steps after approval, and validation
Pre-checks, create datasource, index, skillset, indexer (creating the indexer starts the run), poll status, read index stats, re-point `.env`, then validate: golden run 10/10 semantic, torque query shows the M6 row intact, citation fields non-empty (page 22 for the torque row), coverage check, T1 in the Test panel. Only then does Greg switch Copilot Studio to the new service with the read-only query key ([[golden-set]]).

## Known risks
Deletion detection may not work with chunked indexes; two layout passes roughly double Document Intelligence cost; private blob links give "access denied"; big tables can still be cut; Basic caps extraction at 512,000 characters per file.

Source: [[rebuild-v2-readme]].

## Related
[[phase-1-manuals-pilot]] · [[decision-d4-paid-search-tier]] · [[launch-plan-oct16]]
