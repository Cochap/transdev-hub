# D2: Tools, datasets and beyond (research, second pass, 2026-10-07)

Read-only research. Tags: **VF** = Verified from full text (README, licence file or whole paper downloaded and read, 2026-10-07). **V** = Verified from a page or the GitHub API (stars, licence, last push). **P** = Partial (secondary source or abstract only). **U** = Unknown. Dollars are USD; CAD is converted at about 1.4 (my **assumption**).

Terms. *Parser* = software that turns a PDF page into text and tables. *VLM* (vision-language model) = an AI that reads page pictures. *CPU* = ordinary processor; *GPU* = graphics card that runs AI fast. *TEDS* = a 0-100 score for how well a recovered table matches the true table (rows, columns, cell text). *MCP* (Model Context Protocol) = standard way for an AI agent to call outside tools. *Custom skill* = an Azure AI Search indexing step that calls a web address you choose.

## 1. What changed in this pass

- **olmOCR cost confirmed and sharpened (VF).** The paper measures USD 176 per million pages on an NVIDIA L40S GPU rented at USD 0.79 an hour (RunPod, Feb 2025), including a 12% retry rate: 1,288 pages in 17 min 10 s, about 4,500 pages an hour. For 131,756 pages: about **USD 23 (CAD 32)**, about 29 GPU-hours. The README's "under USD 200 per million" matches.
- **PaddleOCR-VL throughput corrected upward (VF).** Last pass I used a third-party blog's 1,320 pages an hour (an estimate). The authors measured 1.12 to 1.62 pages per second on one A100, i.e. 4,000 to 5,800 pages an hour. For our corpus: about 23 to 33 GPU-hours, **USD 32 to 47** at the A100 rate of USD 1.43 an hour (P rate, blog dated 2026-06-23). The old CAD 75 to 135 range is withdrawn.
- **Docling now has a measured CPU speed (VF).** On 225 test pages with OCR off: 0.60 pages/s (4 threads) to 0.92 pages/s (16 threads) on an Intel Xeon E5-2690, 1.27 to 1.34 on an Apple M3 Max, 6 GB memory. For 131,756 pages: **40 to 61 hours** on that Xeon. This PC (4 cores, older chip, 15.7 GB RAM) is probably slower (Inferred). Fine for a one-time overnight batch run in several nights, but real speed on our manuals is still Unknown. The paper is from 2024, so current versions may differ.
- **Licence findings (VF).** Docling, RAG-Anything: MIT. olmOCR, PaddleOCR: Apache-2.0. MinerU: Apache-2.0 plus a paid licence required above USD 20M monthly revenue (plus affiliates) or 100M monthly users, plus mandatory "powered by" notice if you offer an online service. Marker: code Apache-2.0, model weights free only for research, personal use and startups under USD 5M funding or revenue. Transdev very likely exceeds both thresholds (Inferred), so **MinerU and Marker need Legal or a paid licence**.
- **Granite-Docling: only partly verified.** Hugging Face model pages did not load from this PC (the proxy returned an empty page). I read the IBM announcement (258M parameters, "cost-effective") and the Docling README (it names Granite-Docling as an optional model), plus the predecessor SmolDocling paper in full. Its own speed and licence text remain **P/U**.

## 2. The six deep-read candidates

| Candidate | Cost per page or million pages | Table accuracy (benchmark) | Licence (text read) | CPU? | Tag |
|---|---|---|---|---|---|
| **Docling** (repo, README, LICENSE, 2024 paper, TableFormer paper) | No cash cost. Time: 0.6 to 0.92 pages/s CPU (paper, Xeon) | TableFormer (its table model): TEDS 91 to 98.5 on PubTabNet (paper); on olmOCR-Bench, Marker's README ranks Docling below Marker's 76.0 overall (P, no table score) | MIT, VF | **Yes**, designed for it; GPU optional | VF |
| **olmOCR** (README, LICENSE, paper v1, olmOCR 2 paper) | **USD 176 per million pages** (L40S, paper); about USD 23 for us | olmOCR 2 table column on olmOCR-Bench: **84.9** (VF); Mistral OCR API 60.6, Marker 72.9, MinerU 84.9, DeepSeek-OCR 80.2, PaddleOCR-VL 84.1 | Apache-2.0, VF | **No**: needs NVIDIA GPU 12 GB+, 30 GB disk; Ubuntu or Docker (README) | VF |
| **PaddleOCR-VL (0.9B) / PP-StructureV3** (README, LICENSE, VL paper, PP-StructureV3 report) | Not stated in USD. 1.12 to 1.62 pages/s on one A100 (paper); about USD 32 to 47 for us (my calculation) | **Table-TEDS 90.89** page-level, **0.9195** on 512 cropped tables, OmniDocBench v1.5 (VL paper, VF); on olmOCR-Bench table column 84.1 (olmOCR 2 paper) | Apache-2.0, VF | Paddle toolkit lists CPU, GPU, other chips; PP-StructureV3 has a CPU mode (report). The VL model's measured speed is GPU-only (VF); VL on CPU is U | VF |
| **Granite-Docling (258M)** | U (no per-page price or speed in sources read) | Predecessor SmolDocling: TEDS 0.52 including text (0.81 structure only) on table task (VF paper); Granite's own numbers not read | Apache-2.0 not confirmed (U) | Runs through Docling; 256M model needs 0.49 GB VRAM (SmolDocling paper); CPU speed U | P |
| **RAG-Anything** (README, LICENSE) | No parser cost of its own; spends LLM calls on every chunk (LightRAG) and on pictures; no figure given (U) | None of its own; inherits the parser (MinerU, Docling or PaddleOCR) | MIT, VF | Yes, CPU capable; MinerU part benefits from GPU | VF |
| **Marker** (best other; README, LICENSE, olmOCR paper) | Old Marker 1.7.5: USD 1,484 per million pages on H100 with forced OCR (VF, olmOCR paper). Current README: new "fast" mode built for CPU, VLM only on bad or scanned pages (VF), no new price | olmOCR-Bench table column 72.9; overall 76.1 (olmOCR 2 paper, VF) | Apache-2.0 code; **weights restricted** (VF) | **Yes** (`--mode fast`, `--disable_ocr` text-layer only) | VF |

Other points (olmOCR paper, VF): MinerU 1.3.10 USD 596 per million pages; Mistral OCR API USD 1 per 1,000 pages in May 2025 (a 2026 search result said USD 2 to 4, so current price is U); GPT-4o USD 6,240 to 12,480.

**Two findings that matter for BOULON.**
1. Our manuals are mostly digital PDFs, not scans (Inferred: they have searchable text). Marker's fast mode and Docling use the text already in the PDF and only use AI for tables, so they are cheaper than the scanned-page benchmarks suggest.
2. **RAG-Anything keeps page numbers (VF README).** It tags each text chunk with the page it came from and leaves the field empty rather than guess when it cannot be sure. Page numbers are exactly what our markdown-mode citations risk losing.

## 3. Everything else in the master table

Stars, licence, last push from GitHub API 2026-10-07. "Fit" = could Copilot Studio or Azure AI Search use it. Copilot Studio accepts MCP servers over the Streamable transport (VF, Learn, updated 2026-08-19). Azure AI Search can call an **https** Custom Web API skill, up to 230 seconds per call, 10 calls in parallel (VF, Learn, 2026-07-30).

| # | Name | What it is | CPU / GPU | Licence | Cost | Fit | Verdict |
|---|---|---|---|---|---|---|---|
| **Awesome list: tools and challenges** | | | | | | | |
| 1 | [Kiln](https://github.com/Kiln-AI/Kiln) 5.2k, push 10-07 | Desktop app plus library to build RAG and auto-generate evals; PDF, image, video, audio (README read, P) | CPU, Ollama locally | Library MIT; app source-available | Free; Pro paid | REST server; no Azure Search export seen | Try for evals only |
| 3 | [Pixeltable](https://github.com/pixeltable/pixeltable) 1.6k | Python multimodal database, HTTP serving | CPU | Apache-2.0 | Free | Duplicates Azure Search | Skip |
| **Datasets and benchmarks (what to borrow)** | | | | | | | |
| 5 | [MMDocIR](https://arxiv.org/abs/2501.08828) | Page- and layout-level retrieval; 1,685 expert and 173,843 bootstrapped questions (abstract: visual retrievers beat text ones, P) | n/a | Paper | Free | Method | **Borrow**: score the page found |
| 7 | [LongDocURL](https://arxiv.org/abs/2412.18424) | 2,325 questions, 33,000+ pages; understanding, numbers, locating (P) | n/a | Paper | Free | Method | **Borrow** "locating" |
| 11 | [MMLongBench-Doc](https://arxiv.org/abs/2407.01523) | 1,062 questions (abstract; list says 1,082); GPT-4o 42.7% F1 (P) | n/a | Paper | Free | Method | **Borrow** multi-page tagging |
| 14 | **olmOCR-Bench** (inside olmOCR papers, VF) | 1,403 PDFs; table test = "cell with value X sits next to cell Y"; 1,020 table tests | n/a | Open | Free | Method we can copy | **Borrow**: build 20 such tests from our torque tables |
| **Beyond the list: parsers** | | | | | | | |
| 15 | MinerU 81.2k | PDF to Markdown; CPU tier via ONNX, GPU 8 GB+ best; REST API (README P) | CPU or GPU | Apache plus conditions, VF | Free | Files out | Legal first; olmOCR paper: table score 84.9 |
| 16 | PaddleOCR 90.7k (push 09-16) | Toolkit incl. PP-OCRv5 and PaddleOCR-VL-1.6 (README says 96.3 on OmniDocBench v1.6, P) | CPU or GPU | Apache-2.0 | Free | Open WebUI supports it | See table above |
| **Beyond the list: toolkits and front ends** | | | | | | | |
| 19 | LightRAG 40.0k | Graph RAG; REST server, Ollama-style API, Azure OpenAI (VF as page, P) | CPU | MIT | LLM call per chunk | Could sit behind MCP | Skip: cost, graph risk |
| 20 | RAGFlow 91.8k (v1.0.0-rc1, 2026-09-29) | Full RAG engine; DeepDoc parser runs on CPU; Azure OpenAI; MCP optional; 4 cores, 16 GB, 50 GB disk | CPU | Apache-2.0 | Free + server | API and MCP | **Try as complement** |
| 22 | Open WebUI 154k | Chat UI; extraction engines Docling, Document Intelligence, Mistral OCR, PaddleOCR-vl; MCP and OpenAPI tools | CPU, GPU image | Custom, branding clause | Free | Fallback UI | Hold |
| 24 | LlamaIndex 52.4k / LlamaParse | Framework; paid parser: 1 to 10 credits a page, USD 1.25 per 1,000 credits (P); free LiteParse text parser | Cloud or CPU | MIT; parser paid | About USD 165 (Fast) to 494 (3 credits) for us (P) | Cloud; data leaves | Comparator |
| 25 | R2R 8.0k, **last push 2025-11-07** | REST RAG system | CPU + Postgres | MIT | Free | REST | Skip: stale |
| 27 | PageIndex 38.9k | Vectorless tree index; about USD 0.001 per page to index (vendor, P) = about USD 132 for us; local mode text PDFs only; MCP only in cloud | CPU + LLM | MIT | USD 132 (P) | Cloud only | One-manual trial |
| 29 | azure-search-openai-demo 7.8k | Microsoft sample on our exact stack | Azure | MIT | Azure | Same stack | Read the ingestion script |
| 30 | ColPali 2.8k | Searches page images | GPU | MIT | Hosting | No Copilot path (Inferred) | Side experiment only |

## 4. Cost to read 131,756 pages: best three versus Azure

Baseline: Azure Layout CAD 1,826 for page reading (VF, `docs/specs-and-costs.html`). Picture descriptions (CAD 196), picture extraction (CAD 358 on Azure) and embeddings (CAD 3) are separate lines; the open parsers also extract pictures, so the CAD 358 line may shrink (U). I compare the page-reading line only.

| Option | Cash cost USD | CAD (x1.4) | Time | Basis |
|---|---|---|---|---|
| Azure Layout (baseline) | n/a | **1,826** | hours | VF |
| 1. olmOCR on rented L40S | about **23** (USD 176 per million) | about **32** | about 29 GPU-hours | VF paper; olmOCR 2 price not published (U) |
| 2. PaddleOCR-VL on rented A100 | about **32 to 47** | about **45 to 65** | 23 to 33 GPU-hours | VF throughput; P hourly rate |
| 3. Docling on CPU (this PC or a server) | **0** | **0** | 40 to 61+ hours | VF paper, 2024 Xeon; this PC slower (Inferred) |
| Comparator: MinerU on L40S (v1.3.10) | about 79 | about 110 | about 52 hours | VF, 2025 paper |
| Comparator: LlamaParse 3 credits | about 494 | about 690 | n/a | P |

Even tripling for re-runs, options 1 and 2 stay under CAD 200, about one tenth of Azure. Unmeasured in all cases: accuracy on **our** torque tables and wiring pages, page-number recovery, French. The real gates are non-money: a GPU rental or machine needs IT and Greg's approval (Azure GPU resources are company resources), and installs on this PC need an IT ticket.

## 5. Top 5 to try, each on ONE manual

Use one golden-set manual with known answers (one torque-table page, one numbered procedure, one wiring page). For every candidate check: (a) table rows and columns intact; (b) steps complete; (c) page number recoverable per chunk; (d) French accents survive; (e) seconds per page. Build 10 olmOCR-Bench-style table tests first ("cell 15 Nm sits next to M6").

1. **Docling (CPU).** Needs an IT ticket to install here, or run on an approved server. Pass: all 10 table tests and under 3 s a page. Red flag: slower than 6 s a page (more than about 220 hours).
2. **Marker `--mode fast` (CPU).** Licence question for Legal first (weights). Pass: tables right on a digital manual at CPU speed. Report: seconds per page.
3. **olmOCR on one rented L40S hour (about USD 1).** Greg approves the rental (`boulon-approval-package`). Pass: about 4,500 pages an hour confirmed within 2x and 8 or more of 10 table tests. Report: pages per hour, cost.
4. **PaddleOCR-VL on the same GPU hour.** Pass: at least 4,000 pages an hour and French intact. Report: tests passed.
5. **RAG-Anything with Docling as parser, on a small Linux box, or RAGFlow's DeepDoc.** Ask 10 golden questions and confirm page numbers are returned. RAG-Anything adds model cost per chunk (U), so measure tokens on the one manual before scaling.

## 6. Caveats

- No parser was run by me; every speed and price is from a paper, README or blog, mostly 2025 hardware prices.

## 5-line summary
1. **Verified full text:** Docling (MIT, CPU 0.6 to 0.92 pages/s), olmOCR (Apache-2.0, USD 176 per million pages, table score 84.9, GPU only), PaddleOCR-VL / PP-StructureV3 (Apache-2.0, 1.1 to 1.6 pages/s on an A100, table TEDS 90.89), RAG-Anything (MIT, keeps page numbers), Marker (restricted weights, CPU fast mode), MinerU licence.
2. **Corrected:** PaddleOCR-VL cost fell from CAD 75 to 135 to about CAD 45 to 65; olmOCR is about CAD 32; Docling CPU time is 40 to 61+ hours.
3. **Still Partial:** Granite-Docling (Hugging Face blocked; only IBM announcement and the SmolDocling paper read), the benchmark papers (abstracts only), all other repos (README summaries).
4. **Licence risk:** MinerU and Marker likely need a paid licence at Transdev's size; Docling, olmOCR, PaddleOCR, RAG-Anything do not.
5. Next: write 10 table tests, run Docling and Marker fast mode on one manual (IT ticket), then one approved GPU hour for olmOCR and PaddleOCR-VL.
