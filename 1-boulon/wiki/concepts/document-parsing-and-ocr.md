---
title: Document parsing and OCR
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/research-2026-10-07/a-cheaper-ingestion.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../docs/research-2026-10-07/d2-tools-datasets-and-beyond.md, ../../docs/research-2026-10-07/00-combined-recommendation.md, ../../docs/rag-radar/knowledge-web.md]
---

**Bottom line:** parsing is the step that turns a PDF page into clean text and tables before chunking; for BOULON about 99% of pages already have text, so the paid reader is bought mainly to keep tables, picture positions and reading order, and tables are the common weak spot in every benchmark.

## Plain definition (as the sources define it)
- "A *chunk* is one searchable piece of a manual. *OCR* turns a picture of letters into text. A *born-digital* PDF has real text inside it; a *scan* is only a picture of a page." "*Parser* = software that turns a PDF page into text and tables." (`1-boulon/docs/research-2026-10-07/a-cheaper-ingestion.md`, `d2-tools-datasets-and-beyond.md`)
- *TEDS* = a 0-100 score for how well a recovered table matches the true table (`d2-tools-datasets-and-beyond.md`).

## How it shows up in BOULON
- Measured by the project with `pdftotext`: 131,756 pages, only 202 image-like files holding 1,468 pages (about 1.1%) lack a text layer; "Layout and Content Understanding are paid mostly to recover tables, picture positions and reading order, not to read letters" (`a-cheaper-ingestion.md` section 3).
- The pilot flattened the torque table (12.7 instead of 15 Nm); the v2 design runs the layout reader in markdown mode so a row stays a row ([[torque-tables]], [[review-findings-rag-pipeline]], [[rebuild-v2-pipeline]], [[azure-search-index]]). Tables then must not be split by [[chunking]].
- Headline research finding (2026-10-07): Azure's Content Understanding skill (GA in API 2026-04-01) sits in the same skillset slot, USD 5 per 1,000 pages (Standard) vs USD 10 for Layout, one pass, page ranges per chunk; whole library about USD 659 (CAD 913), total about CAD 1,110 (`a-cheaper-ingestion.md` section 1; `00-combined-recommendation.md`). Not yet tested on a manual. Test: Vicinity Service Manual p.22, M6 row must read 15 Nm. See [[phase-1-manuals-pilot]].
- Papers: table reading drives retrieval quality. OHRBench: perfect text 36.1 vs best OCR 31.1 overall; table retrieval 69.6 perfect vs 59.8 / 57.8 / 48.5 for Qwen / Marker / MinerU; OmniDocBench table TEDS tops out at 77-79 (`d1-awesome-papers.md`, papers 25-26). Structure-aware table chunking (each row as a key-value block) raised hybrid MRR from 0.3576 to 0.5945 on legal tables (paper 27).
- Licence warnings: MinerU needs a paid licence above USD 20M monthly revenue; Marker weights restricted; PyMuPDF is AGPL (`a-cheaper-ingestion.md` section 4; `d2-tools-datasets-and-beyond.md`).

## Tools in the knowledge web
(`1-boulon/docs/rag-radar/knowledge-web.md`, section B)
| Tool | Note | Anchor |
|---|---|---|
| Docling (IBM, MIT) | Leader for parsing; OCR word cells in table tokens, OCR for broken text layers, per-page confidence (a "not sure" signal); v2.145.0 page orientation. Status **try** | `#docling` |
| RAGFlow v1.0.0-rc3 | Tables through one canonical HTML path; DOCX tables captioned with heading path; evidence-sufficiency check. **watch** | `#ragflow` |
| MinerU, Unstructured, Marker | Parser comparison candidates; MinerU 4.1.x CPU by default | `#mineru`, `#unstructured`, `#marker` |
| LlamaParse OCRia-1, Unlimited-OCR-2, MiniCPM-OCR 1.0 | Vision-language OCR models; vendor-claimed scores; French unconfirmed | `#ocria-1`, `#unlimited-ocr-2`, `#minicpm-ocr-1` |
| Tessera (paper) | Each chunk keeps page title, section path and table headers; +5-6 points | `#tessera` |
| RAGit (paper) | Treat parser and chunker as an experiment, score at page level | `#ragit` |

## Go deeper
- Content Understanding skill: https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-content-understanding
- Docling releases: https://github.com/docling-project/docling/releases . Tessera https://arxiv.org/abs/2610.37080 . RAGit https://arxiv.org/abs/2610.24659 . OHRBench https://arxiv.org/abs/2412.02592

## Related
[[chunking]] · [[torque-tables]] · [[multimodal-retrieval]] · [[rag-evaluation]] · [[rag-field-map]] · [[greg-interest-map]]
