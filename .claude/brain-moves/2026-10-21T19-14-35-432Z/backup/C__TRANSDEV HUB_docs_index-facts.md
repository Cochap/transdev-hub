# Pilot index — verified facts (pulled live from Azure, 2026-09-23)

- **Real index name:** `multimodal-rag-1790098589411` (the docs' `boulon-pilot-index` was never the real name). Skillset `multimodal-rag-1790098589411-skillset`, indexer `multimodal-rag-1790098589411-indexer`.
- **Size:** 2,250 chunks (searchable pieces) from 23 PDFs.
- **Fields:** `content_id`, `text_document_id`, `document_title`, `image_document_id`, `content_text`, `content_embedding` (vector), `content_path`, `locationMetadata` (page/location info). `document_title` is not facetable.
- **Search features on:** semantic ranking config `multimodal-rag-1790098589411-semantic-configuration`; vector search through an AI Foundry text vectorizer.
- **Full config exports (secrets removed):** `tests/results/*.json` (index, skillset, indexer, indexer status).

## ⚠ The service is on the FREE tier, not Basic (confirmed 2026-09-23)
Live `servicestats` shows a **50 MB storage limit per index**, **3 indexes** and **3 indexers**. Those are exactly the Free-tier limits in Microsoft's limits page (learn.microsoft.com/azure/search/search-limits-quotas-capacity, updated 2026-09-16). The 262,144-character cut-off also matches Free's ~256K limit; Basic's is 512,000. The indexer config has no override. What the Free tier means for BOULON, per Microsoft:
- **Storage is 90% full:** 44.9 MB used of 50 MB. The 2 missing Vicinity manuals, let alone 100+ manuals, **cannot fit**.
- **"A free search service might be deleted after extended periods of inactivity."** There's no SLA (service-level agreement, meaning no uptime guarantee).
- **"You can't switch to or from Free."** Moving to Basic means **creating a new service**, rebuilding the index there, and pointing Copilot Studio at the new address.
- Free allows 20 enrichment transactions (documents processed by the AI steps) per indexer per day, and indexer runs are capped at 3–10 minutes.

The plan's "$615 CAD for 6 months on a reliable paid tier" was budgeted, but that tier was never created. Basic costs about $102–112 CAD/month (see `azure-limits-pricing-2026-09-23.md`). Basic still has a 16 MB file limit, so the 2 Vicinity PDFs need splitting on Basic as well.

## Excluded files (by tier limit)
| File | Reason | Size |
|---|---|---|
| Vicinity Service Manual Final - 2013.pdf | 16 MB extraction limit, Basic tier | 103 MB |
| Vicinity Parts Manual 2015.pdf | 16 MB extraction limit, Basic tier | 23 MB |

## Truncated files (at 262,144 characters)
| File | Note |
|---|---|
| Vicinity Service Manual.pdf | Indexed; ~600+ pages, extraction cut off at 262K chars |
| 20180131200843_emp-cooling-fans-service-manual.pdf | Indexed; largest file in index, extraction cut off at 262K chars |

## Manuals actually indexed (chunk count)
| Chunks | File |
|---|---|
| 630 | 20180131200843_emp-cooling-fans-service-manual.pdf (truncated) |
| 536 | Vicinity Service Manual.pdf (truncated) |
| 351 | PROCEDURE DE MAINTENANCE DU SIEGE AS98-5005.pdf (Baultar driver seat, French) |
| 201 | ProHeat_service_manual_m50_m80___sl9150.pdf |
| 109 | 401483 Rev B.pdf |
| 94 | Wheelchair Ramp.pdf |
| 12–37 each | 16 short "RP-01-…" procedure sheets (BTMS, MCU, wheels, tires, steering, ABS, brakes, suspension, coolant pump) |
| 16 | moteur wiper modification electrique.pdf (French) |
| 3 | systeme moteur chauferette CIRCUIT.pdf (French) |
| **Total** | **23 PDFs indexed (2 excluded, 2 truncated; 25 total attempted)** |

**No Orion manual is in the index.** T3 (Orion part 080808082) therefore cannot be answered by the pilot. The correct agent behaviour is "I don't have that information", so T3 is now a "don't guess" test.

## Retrieval test results (index only, not the Copilot Studio agent)
| Test | Result | Evidence |
|---|---|---|
| T1 HK98-0021 | PASS | Baultar AS98-5005 §3.9: left advance-lock cylinder assembly (French: "Assemblage cylindre d'avance gauche") |
| T2 12052641 | PASS | ProHeat SL9150: METRI-PACK 12052641 AUX connector keying, G-I PCM |
| T3 080808082 | PASS (correctly absent) | No Orion manual indexed |

Run log: `tests/results/2026-09-23_1011.md`.

## Observations to review
- The corpus mixes French and English. Mechanics may ask in either language, so cross-language retrieval needs testing.
- **Torque table flattening (CRITICAL — confirmed 2026-09-23):** Vicinity Service Manual p.22's "Recommended Assembly Torques Class 12.9…" table is extracted as plain text with no row/column separators, causing bolt sizes and torque values to run together (e.g., `M61.0012.715` means M6 / 1.00 pitch / 12.7 kN / 15 Nm). This is a safety hazard if the model or a mechanic misreads which torque applies to which bolt. Needs table-preserving extraction before wider rollout. See review-rag-pipeline.md CRITICAL finding and test question T7 (golden set, scoring).
- The 2 oversized PDFs (103 MB, 23 MB) that were excluded are now named: Vicinity Service Manual Final - 2013.pdf and Vicinity Parts Manual 2015.pdf.
- The docs said "25 pilot manuals" and "Orion" as though Orion were in the pilot. The real list differs, so Step 1.1 (confirm the pilot list) is effectively answered by the table above. (Corrected 2026-09-23: no Orion manual is indexed, so T3 is a must-abstain test.)
