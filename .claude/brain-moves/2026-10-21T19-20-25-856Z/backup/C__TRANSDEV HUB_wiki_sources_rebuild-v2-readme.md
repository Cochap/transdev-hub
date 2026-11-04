---
title: Source — 1-boulon/rebuild/v2 README
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/rebuild/v2/README.md]
---

**Bottom line:** the README for the draft index v2 (prepared 2026-09-23, updated to 2026-09-25) that will run on the paid Basic service. Nothing is deployed yet. Full synthesis in [[rebuild-v2-pipeline]].

## What the source says
- Four JSON files: `datasource.json`, `index.json`, `skillset.json`, `indexer.json`, with placeholders for endpoints and keys that Claude fills in memory at deploy time, never writing them to disk.
- Changes vs v1: citation `title` and `url` fields; `page_number`; torque table fix via markdown mode and heading-based chunks; `maxFailedItems: 0`; deletion tracking (may not work with chunked indexes); search modes kept (vector, hybrid, semantic, same embedding model, 1536 dimensions).
- 2026-09-25: option A chosen, billing by key to a NEW AIServices resource in Canada Central. Document Intelligence has no price meters in Canada East, so `boulon-pilot-ai` (Canada East) keeps only embedding and chat models.
- 2026-09-24 fix after `ecc:rag-pipeline-reviewer`: projections read `/document/metadata_storage_name` and `_path` directly (otherwise blank citations); new `vehicle_family` filter field from blob metadata.
- Validation plan: golden run 10/10 semantic (v1 baseline), torque query must show the M6 row `1.00 | 12.7 | 15` intact, citation fields check, coverage check, then T1 in the Test panel.
- Unverified: page numbers for text chunks in markdown mode, key property names, `extractTokenAtPosition` in projections, whether Copilot Studio reads `title` and `url`.
- Risks: deletion detection, doubled Document Intelligence cost (two layout passes), private blob links, big tables over 4,000 characters, one bad PDF stops the run (intended), 512,000-character cap on Basic.

## Related
[[rebuild-v2-pipeline]] · [[azure-search-index]] · [[azure-ticket-77048]]
