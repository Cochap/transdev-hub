# Cheaper ways to turn 131,756 PDF pages into searchable chunks (research A, 2026-10-07)

Tags: **Verified** = I read it (URL + date 2026-10-07). **Inferred** = my reasoning. **Unknown** = not confirmed. "Via summary" = a README page I only saw through the fetch tool's summary, not the raw text. CAD conversion uses the project's own rate (CAD 13.8605 for USD 10, so 1.386). A *chunk* is one searchable piece of a manual. *OCR* turns a picture of letters into text. A *born-digital* PDF has real text inside it; a *scan* is only a picture of a page.

## 1. The headline finding: Microsoft already sells a cheaper reader that plugs into the same slot

Azure AI Search now has a **Content Understanding skill** (a skill is one step in the indexing pipeline). It is **generally available** in the `2026-04-01` API, the same version v2 already uses. It "implements the same interface as the Document Layout skill", so swapping it into `rebuild/v2/skillset.json` is a small edit. Microsoft's page says it keeps tables as markdown, can join a table that runs across pages, extracts images **in the same pass**, and returns page ranges per chunk (`pageNumberFrom`, `pageNumberTo`). Verified: https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-content-understanding (2026-10-07).

What that changes for BOULON:
- **Price: USD 5.00 per 1,000 pages ("Standard", layout and tables) versus USD 10.00 for Layout.** Verified from the Azure Retail Prices API, Canada Central, fetched 2026-10-07 (meter "Doc Content Extraction Standard Pages"). Canada Central is a supported region. Verified: https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/language-region-support
- **One pass, not two.** The Layout setup in v2 needs a markdown pass plus a text pass for pictures, which is why the cost doubles. The new skill's example asks for `["images","locationMetadata"]` in one call. Verified (docs). Whether Microsoft bills extracted images as an extra meter is **Unknown** (the price list has an "Add-On Layout" meter at USD 5 per 1,000 whose use here I could not confirm).
- **It may fix the open "page number for text chunks" risk** in the v2 README, because page ranges come with every chunk. Verified in the docs; behaviour on our manuals is **Unknown** until tested.
- Cost for the whole library: 131,756 pages x USD 5 per 1,000 = **USD 659, about CAD 913** (Inferred arithmetic on verified rates). The project's other one-time lines (picture descriptions about CAD 196, embeddings about CAD 3) bring the total to roughly **CAD 1,110**, just under the CAD 1,200 ceiling. That total is an estimate, because picture counts are carried over from the pilot.
- Catches: it has no "20 free documents per indexer per day" (Layout skill has it); a document that needs over 5 minutes times out and is still charged, so the 112 oversized manuals must be split as already planned; picture descriptions inside the skill are preview (`2026-05-01-preview`), so keep the existing gpt-5-mini step. All Verified (same page).

## 2. Other Azure options, verified prices (Canada Central, USD, retail API, 2026-10-07)

| Meter | Price per 1,000 pages |
|---|---|
| Document Intelligence Read (text only, no table structure) | 1.50 (0.60 above 1 million pages) |
| Document Intelligence Layout / prebuilt (also "batch") | 10.00 |
| Content Understanding Standard (layout + tables) | 5.00 |
| Content Understanding Basic (OCR only, like Read) | 1.00 |
| Content Understanding Minimal (digital Office files only, not PDF) | 0.01 |

- **Free allowance:** Document Intelligence free tier is 500 pages per month (Verified, pricing page text, though its table showed "$-"; the retail API shows a "Free Transactions" meter at 0). Negligible for us.
- **Commitment tiers (prepay a monthly page volume):** the prebuilt/Layout 100K tier is USD 900 a month with overage at USD 9 per 1,000. One month plus overage for 131,756 pages is about USD 1,186 against USD 1,318 pay-as-you-go, a 10% saving that locks money in. Read tiers (500K pages for USD 375 a month) only help if plain text is enough. Verified prices, Inferred arithmetic. Not worth it against option 1.
- **Batch** pricing for Layout is the same USD 10 (meter "S0 Batch Layout Pages"). No batch discount. Verified.
- Content Understanding's tiers explain the cheap rate: Minimal only applies to Office files, so PDFs always pay Basic or Standard. Verified: https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/pricing-explainer

## 3. Free text-layer extraction and page triage

Our library is overwhelmingly born-digital. From `tests/results/library-measure-2026-10-06.jsonl` and the continuity log (Measured by the project, with `pdftotext`): **131,756 pages, 169.8 million characters (about 1,290 per page), and only 202 image-like files (under 150 characters per page) holding 1,468 pages, about 1.1% of pages.** So about 99% of pages have a text layer and need no OCR. Layout and Content Understanding are paid mostly to recover **tables, picture positions and reading order**, not to read letters.

Free tools (cost: CAD 0):
- **pdftotext (poppler)** is already on this PC and measured the library. Good page numbers; **flattens tables** (the M6 torque problem). Verified by project use.
- **PyMuPDF / pymupdf4llm** outputs markdown with tables (`find_tables()`), page chunks, image extraction and an automatic OCR trigger for pages with no text. Licence is **AGPL, or a paid commercial licence from Artifex**; whether internal use triggers the AGPL is a legal question for IT. Verified (via summary): https://github.com/pymupdf/PyMuPDF and https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/
- **pdfplumber and pdfminer.six** are free Python table/text extractors; I did not open them. Unknown (licence believed permissive, not verified).

**Page triage** (run the paid reader only on pages that need it): a free script scans each page for (a) tables found, (b) embedded pictures, (c) almost no text. Plain-text pages go straight to chunks; the other pages go to Content Understanding. Scans: 1.1% measured. Table and picture shares of pages are **Unknown**: the pilot showed 1.96 pictures per page on average (Measured), which suggests many pages have a picture, so triage may save less than hoped. Formula: cost = USD 659 x (share of pages sent). At 50% that is USD 329 (CAD 457); at 80%, USD 527. Those shares are illustrations, not measurements. Triage also splits manuals page by page, so page numbers must be tracked in a manifest (see section 6).

## 4. Self-hosted open-source parsers

*GPU* = graphics card used for AI work. Numbers below come from the Docling paper (full text read via pdftotext, https://arxiv.org/abs/2501.17887, 2026-10-07; early-2025 versions of the tools, so now outdated) unless marked.

- **Docling (IBM, MIT licence).** On an 8-core x86 CPU: 3.1 s/page average across tools compared, median 0.79 s on their dataset. On an Nvidia L4 GPU 0.49 s/page in the cross-tool test (median 114 ms in their own test). Whole library: **about 113 hours CPU-only on one PC** (131,756 x 3.1 s), or **about 18 hours on an L4-class GPU** (Inferred arithmetic). A rented GPU for 18 hours at about USD 0.8 per hour (RunPod L40S community price, Verified at https://www.runpod.io/gpu-cloud/pricing, 2026-10-07; an L40S is not an L4, so speed is Unknown) is roughly **USD 15**. Table accuracy on our manuals: **Unknown** (needs our test). Verified licence (README via summary: https://github.com/docling-project/docling).
- **MinerU (OpenDataLab).** Fastest on GPU in the paper: 0.21 s/page (L4); 3.3 s/page on CPU. Licence is "Apache 2.0 with additional conditions"; conditions not read. Needs 16 GB RAM and 8 GB video memory for the full install. Via summary: https://github.com/opendatalab/MinerU.
- **Marker and Surya (Datalab).** Code Apache 2.0 but **model weights are free only for research, personal use and companies under USD 5M revenue/funding**, so Transdev would need a paid licence. Marker speed on an NVIDIA B200: 2.9 pages/s (best mode), 7.4 fast; Surya 5 pages/s on an RTX 5090. Via summary. Marker was 16+ s/page on CPU in the paper. Verdict: skip unless licensing is bought.
- **olmOCR (Allen AI, Apache 2.0).** Needs a recent NVIDIA GPU with at least 12 GB memory; README claims under USD 200 per million pages (so about USD 26 for us, a vendor claim, not tested) and a table score of 84.9 on its own benchmark. Via summary: https://github.com/allenai/olmocr. It is a vision-language model that reads page images, so it can misread digits (Inferred, same risk the review flagged for gpt-5-mini).
- **PaddleOCR / PP-StructureV3 / PaddleOCR-VL (Baidu, Apache 2.0).** Runs on CPU or GPU, 100+ languages including French and English; claims 96.3 on OmniDocBench (vendor claim). Via summary: https://github.com/PaddlePaddle/PaddleOCR.
- **Unstructured:** 4.2 s/page on CPU, no GPU gain, weakest table output of the group in the paper's framing (Verified speed; table quality Unknown). **Nougat:** built for academic papers; not evaluated, Unknown.
- **Mistral OCR (paid API, not self-hosted).** Search snippets only (Abstract/snippet only): OCR 3 listed at USD 2 per 1,000 pages, USD 1 batch; one snippet lists OCR 4 at USD 4 standard, USD 2 batch. That is USD 132 to 527 for us. Conflicting; the official page timed out. Also sends manuals to a non-Azure vendor, so it needs approval.

Common limits: none of these produce page-numbered chunks in Azure's format, so we write the glue (section 6). Self-hosting needs a Python install (IT ticket) or a rented cloud machine. **CPU-only on a normal PC works but is slow** (about five days of continuous running for Docling); it is a fallback, not a plan.

## 5. Lazy and on-demand ingestion

- **Brand by brand with a cache:** already in `over-budget-plan.md`; reading cost is per page so nothing is wasted. Verified in project docs. Indexer enrichment cache means re-runs do not re-pay (project docs say included; I did not re-check).
- **Read at question time:** Copilot Studio's knowledge source can only query the index; reading a PDF on each question needs a custom connector, adds seconds of wait, and pays every time a page is asked about. Inferred: reject.
- **Usage-driven loading** (load a manual the first time someone asks and it is missing) is cheap in money but needs custom code and fails the first question. Inferred.

## 6. Loading results into Azure AI Search without the Layout skill

- **Push API.** Upload JSON documents (our pre-made chunks) in batches of up to 1,000 documents or 16 MB. Verified: https://learn.microsoft.com/en-us/azure/search/search-what-is-data-import. **Catch:** skillsets and integrated vectorization only run with indexers, so we must compute embeddings ourselves (cheap: about CAD 3 for the library per the project's estimate) and keep a query-time vectorizer on the index. Verified (same page) / Inferred.
- **Custom Web API skill (Azure Function inside the skillset).** Default timeout 30 s, **maximum 230 s**, up to 10 calls in parallel. Fine for light text-layer triage; **too short for a heavy parser**. Verified: https://learn.microsoft.com/en-us/azure/search/cognitive-search-custom-skill-web-api
- **Pre-chunked JSON from a local or rented-GPU run** is the cleanest for open-source parsers. Keep the manifest (original name, page offset) from the continuity log so citations stay right.
- Upgrade path stays open: same index fields as v2, so changing the reader later does not change Copilot Studio.

## 7. IT approval defences (3 sentences each)

- **Content Understanding skill:** "It is a Microsoft first-party service in the same Azure subscription and region we are already requesting, so no new software or vendor is added. It replaces a more expensive Microsoft reader at half the per-page rate. Spend stays inside the ceiling already on the ticket."
- **Free triage script (PyMuPDF or pdfplumber):** "It reads PDFs locally and sends nothing outside the PC, and it only reads files we already own. It cuts how many pages go to the paid service. PyMuPDF's AGPL/commercial licence needs legal sign-off, so pdfplumber (permissive) is the fallback."
- **Docling on a rented GPU:** "It is an MIT-licensed open-source tool run once for about a day on a temporary cloud machine, then deleted. Manuals are not confidential, so no private data leaves the company. Estimated cost is under USD 50, and if it fails we fall back to the Azure option."

## 8. Everything evaluated

| Name | What it is | Cost to read 131,756 pages | Table quality | Needs GPU | Verdict |
|---|---|---|---|---|---|
| Doc Intelligence Layout (current plan) | Azure PDF reader, 1 pass | USD 1,318 (CAD 1,826); 2 passes CAD 3,652 | Good in markdown mode | No | Replace |
| Doc Intelligence Read | Azure OCR text only | USD 198 (CAD 274) | Poor (no table structure) | No | Only for plain pages |
| Content Understanding skill, Standard | Azure reader, same skill slot, 1 pass | USD 659 (CAD 913) | Claimed good, cross-page tables (Unknown on our files) | No | **Try first** |
| Content Understanding Basic | OCR only | USD 132 (CAD 183) | None | No | Only for scans |
| Commitment tier (Layout 100K) | Prepaid Azure volume | about USD 1,186 | Same as Layout | No | Skip (10% saving) |
| pdftotext | Free text-layer extractor (on PC) | CAD 0 | Flattens tables | No | Plain pages in triage |
| PyMuPDF / pymupdf4llm | Free, markdown + tables + images | CAD 0 (AGPL, or paid licence) | Medium (Unknown on our files) | No | **Triage tool**, licence check |
| pdfplumber / pdfminer.six | Free Python extractors | CAD 0 | Unknown | No | Fallback to PyMuPDF |
| Docling | IBM open-source parser, MIT | about USD 15 on rented GPU; CPU about 113 h | Good in paper (Unknown on ours) | Optional | **Try third** |
| MinerU | Open-source parser, custom licence | about USD 7 GPU time (Inferred) | Unknown | Better with | Backup, read licence |
| Marker | Open-source parser | GPU hours; licence fee likely | Unknown | Yes (CPU slow) | Skip (weights licence) |
| Surya | OCR/layout/table model | GPU hours; licence fee likely | Claims table support | Yes | Skip (weights licence) |
| olmOCR | Vision-language page reader | claimed under USD 26 | 84.9 on own benchmark | Yes (12 GB+) | Backup; digit-error risk |
| PaddleOCR / PP-StructureV3 | Baidu open-source parser | CPU or GPU hours | Vendor-claimed high | Optional | Backup |
| Unstructured | Open-source partitioner | CPU about 152 h | Unknown | No benefit | Skip |
| Nougat | Academic-paper OCR | Unknown | Unknown | Yes | Skip (wrong target) |
| Mistral OCR | Paid API | USD 132-527 (snippets) | Unknown | No (cloud) | Skip: outside Azure, price unclear |
| Lazy / on-demand reading | Read at question time | pay per question | Same as reader | No | Reject |
| Brand-by-brand loading | Stage the batch | same total, spread out | n/a | No | Keep (already planned) |

## 9. Ranked top 3: what to try first and how to test on one manual

**Test manual for all three:** `Vicinity Service Manual.pdf` (157 pages, 245,160 characters, one known torque table: M6 row `1.00 | 12.7 | 15` at page 22). Pass criteria come from the v2 README torque check.

1. **Swap in the Content Understanding skill (cost: a few cents).** Copy `rebuild/v2/skillset.json`, replace the Layout skill with `Microsoft.Skills.Util.ContentUnderstandingSkill` (`extractionOptions: ["images","locationMetadata"]`), run that one manual. **Pass:** the M6 row stays one markdown row, `page_number` is filled for text chunks and equals 22, pictures extracted, and the Azure usage shows Standard pages billed once per page with no second meter. **Red flag:** table split across chunks, empty page numbers, or a billed image meter.
2. **Triage script (cost: CAD 0, one hour).** Run `pdftotext`-based counting plus PyMuPDF `find_tables()` and image counts on the same 157 pages, then on 5 other manuals from different brands. **Pass:** you get the real share of pages with tables, pictures or no text, which turns the "Unknown" in section 3 into a number; plain-text pages match pdftotext output. If the share is under about 60%, triage is worth building; if higher, skip it and use option 1 on everything. Check the PyMuPDF licence question with IT before using it on the full run.
3. **Docling head-to-head (cost: under USD 5 for the test on a rented GPU, or free on CPU: 157 pages x 3.1 s is about 8 minutes).** Run the same manual, compare the M6 row and page 22 to option 1 line by line, and count wrong digits across 10 torque tables. **Pass:** equal or better table accuracy with page numbers. It becomes the plan only if option 1 fails the table test or costs go over the ceiling.

Nothing in this report was run against Azure or the index; `.env` was not touched.
