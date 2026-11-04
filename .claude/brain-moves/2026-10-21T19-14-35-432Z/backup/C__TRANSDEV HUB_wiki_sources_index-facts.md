---
title: Source — Pilot index facts
type: source
status: current
updated: 2026-09-30
sources: [../../docs/index-facts.md]
---

**Bottom line:** verified live from Azure on 2026-09-23: the index is `multimodal-rag-1790098589411`, holds 2,250 chunks from 23 PDFs, and sits on the Free tier, 90 percent full.

Plain words: a fact sheet pulled straight from the search service (not from memory). It names the real index, the files indexed, the two excluded and two truncated manuals, and the first retrieval test results. Entity page: [[azure-search-index]].

## Key facts
- The docs' `boulon-pilot-index` was never the real name (**Superseded** in docs, 2026-09-23).
- Fields: `content_id`, `text_document_id`, `document_title`, `image_document_id`, `content_text`, `content_embedding`, `content_path`, `locationMetadata`.
- Free tier evidence: 50 MB per index, 3 indexes, 3 indexers, cut-off at 262,144 characters (Basic allows 512,000). 44.9 MB used. Free services might be deleted after extended inactivity, have no SLA and cannot be switched to or from. See [[tier-limits]].
- Excluded: Vicinity Service Manual Final - 2013.pdf (103 MB) and Vicinity Parts Manual 2015.pdf (23 MB). Truncated: Vicinity Service Manual.pdf and the emp-cooling-fans service manual.
- Biggest chunk counts: 630 (emp cooling fans), 536 (Vicinity Service Manual), 351 (Baultar seat AS98-5005, French), 201 (ProHeat), 109, 94 (Wheelchair Ramp); 16 short "RP-01-" procedure sheets with 12 to 37 each.
- No Orion manual is indexed, so T3 is a must-abstain test ([[abstention]]).
- T1 HK98-0021 and T2 12052641 PASS; T3 correctly absent.
- Count note: the chunk table lists 24 files while the stated total is 23 (recount flagged as L1 in [[review-findings-architecture]]).

## Related
[[manuals-library]] · [[torque-tables]] · [[phase-1-manuals-pilot]]
