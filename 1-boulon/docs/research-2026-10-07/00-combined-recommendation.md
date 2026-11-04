# BOULON: combined recommendation from the five research reports (2026-10-07)

Reports: `a-cheaper-ingestion.md`, `b-visual-retrieval.md`, `c-copilot-studio-integration.md`, `d1-awesome-papers.md`, `d2-tools-datasets-and-beyond.md` (all in this folder). Claude verified one price itself (below). Everything else is the agents' reading, tagged in each report.

## The one finding that changes the budget
Reading all 131,756 pages with Azure's current reader (Layout) costs about CAD 1,826. Azure's newer reader, **Content Understanding**, does the same job (text, tables, pictures) in the same skillset step for **CAD 7.08 per 1,000 pages instead of 13.86**. Verified by Claude on the Azure price list for Canada Central, 2026-10-07 (meter "Doc Content Extraction Standard Pages").
- Whole library, reading only: about **CAD 933**.
- Plus picture descriptions (about CAD 196) and embeddings (a few dollars): about **CAD 1,150**, under the CAD 1,200 ceiling already in the ticket, so no ticket change.
- It extracts pictures in one pass and returns page ranges, which may also remove the second reading pass and the empty-page-number risk.
- Unknown until tested: whether its tables keep torque values correct, whether picture extraction adds a separate charge, and which meter the skillset step bills against (both candidate meters list the same price).

## What to do, in order
**1. Now, free, no key needed (Claude does it):**
- Build 10 table tests from our own torque tables (M6 class 12.9 = 15 Nm on Vicinity p.22 is test 1), so every reader is judged on the same pages.
- Measure with `pdftotext` (already installed) how many of the 131,756 pages have a table or a picture. That sets how much the free text layer can replace the paid reader.
- Prepare the skillset edits: swap Layout for Content Understanding, repeat the manual title and headings at the top of every chunk, stop splitting tables and numbered procedures.

**2. When the ticket clears (needs the PDF-reading resource):** one-manual test on the Vicinity Service Manual (157 pages). Pass = M6 row reads 15 Nm, page number present on text chunks, tables stay tables, a French question finds it. Compare Content Understanding with Layout on the same pages.

**3. If it passes:** load brand by brand, most-used first, inside the CAD 1,200 ceiling.

**4. Only if it fails the table test (each needs your approval, defended in the report):**

| Option | Cost for 131,756 pages | What it needs |
|---|---|---|
| olmOCR | about CAD 32 | one rented GPU, about 29 hours; Apache licence |
| PaddleOCR-VL | about CAD 45-65 | a rented GPU; Apache licence |
| Docling (free, MIT) | no cash | 40-61+ hours on a PC CPU; install needs an IT ticket |
| Cohere Embed v4 (page images) | CAD 140-1,100 | unknown whether Copilot Studio can use it; test first |

## Do not do now
- ColPali and other page-image search: the GPU cost is small (about CAD 9) but it needs about 34 GB of storage (Basic holds 15 GB), the index can't match that way, and answering still needs text.
- MinerU and Marker: likely need a paid licence at Transdev's size; ask Legal first.
- Building our own retrieval backend around Copilot Studio: only as a fallback after the swap fails.

## Decisions waiting for you later (not now)
1. Legal question on MinerU/Marker (only matters if the swap fails).
2. A one-hour rented-GPU test (a few dollars) (only if the swap fails).
3. Sign-in type for the search connection: Microsoft now recommends Entra ID sign-in over a key. Claude will prepare the click path before any rebuild.

## What the papers add
- Tables are the weak spot in every benchmark; reading them as tables (not flat text) is the right fix.
- Text written by a vision model gets close to page-image search, which supports our picture descriptions.
- A text reranker is the cheapest large gain; Azure's semantic ranker is one. Test with it on and off.
- Score "right page cited", not only "right value".
- No paper tests wiring diagrams, so our own diagram questions matter.
