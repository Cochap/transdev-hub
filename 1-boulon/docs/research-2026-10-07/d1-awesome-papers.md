# D1: Awesome-Multimodal-RAG papers, full-text read for BOULON (2026-10-07, second pass)

Source list: https://github.com/JarvisUSTC/Awesome-Multimodal-RAG. Its README has 10 papers in the Papers section, 8 benchmark papers in Datasets, 3 tools and 3 tutorials. I added 6 newer papers one hop out (OHRBench, OmniDocBench, a table-chunking paper, Lost in OCR Translation, ViDoRe V2 and V3).

**Method.** First pass used a summarizer and was partly wrong. This pass: I downloaded all 24 PDFs (`curl --ssl-no-revoke`), converted them with `pdftotext`, and read the abstract, method, results tables and limitations myself with targeted reads of each file. I did not read every line of every paper. Tags: **Verified** = full text in hand, key sections and tables read by me; **Partial** = only some of the page read (reason given).

**Corrections to my first pass** (numbers that changed):
- ColPali: the OCR baseline on tables (TabFQuAD) is 70.8, not 46.5; on infographics 60.1, not 62.9; on arXiv figures 31.4. So the gain on tables is +13.1, not +37.
- MMDocIR page-level Recall@5 (Recall@5 = the right page is in the top 5 results): OCR-text 49-66.5, VLM-text 57.8-72.3, images 79.2-83.0. Layout level: VLM-text 40-56, images 52-54.5, OCR-text 24-33.
- OHRBench: the "up to 50% drop" is from mild to severe OCR *errors*, not tables. The table result is in the table below.
- OmniDocBench table score (TEDS = how well table structure is rebuilt): MinerU 78.6, Mathpix 77.0, Marker 67.6, Qwen2-VL-72B 76.8, GPT-4o 72.0 (English).
- ViDoRe V2 top average is 0.597 (colqwen2.5), not 0.599.
- The earlier BOULON review quoted MMLongBench-Doc as 33.2% cross-page and 42.7% F1. The paper says 33.7% and 44.9%. Likely an older version.

Terms: *RAG* = AI searches the manuals, then answers from what it found. *Retriever* = the search step. *nDCG@5* = score for "right page near the top of the top 5". *OCR* = turning a picture of text into text. *VLM* = an AI model that reads images. *GPU* = graphics card used to run AI models. *Embedding* = list of numbers capturing a chunk's meaning.

## Master table

| # | Title (link) | Read | Method in plain words | Key number | Applies to BOULON? | Verdict |
|---|---|---|---|---|---|---|
| 1 | [Retrieving Multimodal Info for Augmented Generation: Survey](https://arxiv.org/abs/2303.10868) | Verified (survey; intro and structure read) | Reviews how images, tables, code, audio are added to LLM answers | none (review) | 2023 background only | Skip |
| 2 | [GME](https://arxiv.org/abs/2412.16855) | Verified | One Qwen2-VL-based embedding model for text, images, document pages | UMRB avg 67.44 (7B), 64.45 (2B) vs 42.52 E5-V, 37.32 VISTA; trained on 8M pairs | Needs GPU hosting; English-only training; can't plug into Copilot Studio | Test only if we self-host a retriever |
| 3 | [MegaPairs](https://arxiv.org/abs/2412.14475) | Verified | Makes 26M synthetic training pairs with VLMs for image retrieval | Beats data 70x larger on composed-image benchmarks | Photo search training recipe, not manuals | Skip |
| 4 | [AR-MCTS](https://arxiv.org/abs/2412.14835) | Verified | Retrieves help at every step of a math tree search, with a step scorer | MathVista 58.8 to 64.1; trained on 8 A800 GPUs | Math reasoning; many calls per question | Skip |
| 5 | [VisDoM / VisDoMRAG](https://arxiv.org/abs/2412.10704) | Verified | Runs text and image pipelines in parallel, third call reconciles them | Gains vs baselines 0.24-52% depending on dataset; headline "12-20%"; 100 GPU hours on one RTX A6000 | Three LLM calls per query; keeps text parsing; custom pipeline | Skip |
| 6 | [IDentIfy (Unified Interleaved Doc Representation)](https://arxiv.org/abs/2410.02729) | Verified | Embeds a whole document's sections (text, images, tables) together, plus a reranker | R@1 20.5 vs 16.4 (text and image); one H100; 0.5B model | Wikipedia-style data; authors say table retrieval stays weak | Skip |
| 7 | [VisRAG](https://arxiv.org/abs/2410.10594) | Verified | Embeds page images with a VLM, answers from page images | Retrieval MRR@10 77.91 vs 74.78 OCR text and 76.54 ColPali; answers 56.12 (MiniCPM-V) vs text RAG, "40% relative" gain; 4.5 KB per page; trained on 8 A100 | Needs GPU and own index; gain against weak OCR baseline | Test offline (Idea 4) |
| 8 | [ColPali](https://arxiv.org/abs/2407.01449) | Verified | Embeds page images into many small vectors, no OCR or chunking | ViDoRe avg 81.3 nDCG@5 vs 66.1 (OCR) / 67.0 (captioning); tables 83.9 vs 70.8; figures 79.1 vs 31.4; index 0.39 s per page vs 7.22 s; 257.5 KB per page | Strongest evidence for diagrams and tables; storage 10x text | Test (Idea 4) |
| 9 | [DSE (Document Screenshot Embedding)](https://arxiv.org/abs/2406.11251) | Verified | One vector per page screenshot, Phi-3-vision 4B | Slides 75.3 vs BM25 55.8, E5 59.3; web pages top-1 46.2 vs E5 47.6 (text model wins on text) | ColPali is the better version | Skip |
| 10 | [AlzheimerRAG](https://arxiv.org/abs/2412.16701) | Verified | Medical RAG over PubMed with fine-tuned Llama and LLaVA | F1 0.86 vs 0.85 for BioRAG baseline; 84% on 50 cases (GPT-4 RAG also 84%) | Tiny gain; fine-tuning | Skip |
| 11 | [MMDocIR](https://arxiv.org/abs/2501.08828) | Verified | Benchmark: 313 docs, 1,658 questions, page-level and layout-level (region) retrieval | See corrections above; ColPali needs 10 GB vs 0.24 GB for DSE | VLM-text beats OCR-text; VLM-text equals images at region level | Adopt as test method |
| 12 | [Document Haystacks](https://arxiv.org/abs/2411.16740) | Verified | Benchmark of 1000-document piles; vision ensemble + AI filter | V-RAG R@1 66.06 on DocHaystack-1000; BM25 on OCR 56.88 | 264 questions; not manual-like | Skip |
| 13 | [LongDocURL](https://arxiv.org/abs/2412.18424) | Verified | 2,325 questions, 396 docs, tasks: understand, reason, locate | GPT-4o 64.5, best open model 30.6, human 84.8 | Scores "locating the page" separately: copy it | Adopt (evaluation idea) |
| 14 | [Dyn-VQA](https://arxiv.org/abs/2411.02937) | Verified | 1,452 changing-knowledge questions; OmniSearch agent re-searches | OmniSearch GPT-4V 44.04 vs 24.90 two-step RAG; humans 51.63 | Web-news questions | Skip |
| 15 | [M3DocRAG](https://arxiv.org/abs/2411.04952) | Verified | ColPali finds pages; Qwen2-VL 7B reads top pages | 36.5 F1 (4 pages) vs 23.7 text RAG; 41,005 pages; one H100; search 21 s to 1.8 s with IVFFlat | Shows page RAG scales to 40K pages (we have 131K) | Test offline (Idea 4) |
| 16 | [M-Longdoc](https://arxiv.org/abs/2411.06176) | Verified | 851 questions, avg 210 pages; includes product manuals (manualslib); tunes answer model on retrieved pages with distractors | Qwen2-VL: text 4.08, figure 3.83, table 3.62; tuning +4.6%; judge matches humans 88.9% | Nearest to BOULON data; tables weakest | Adopt (as warning on tables) |
| 17 | [MMLongBench-Doc](https://arxiv.org/abs/2407.01523) | Verified | 1,082 questions on 135 PDFs | GPT-4o 44.9 F1, humans 66.0; 12 vision models lost to OCR-text models; 33.7% cross-page; 20.6% unanswerable | Don't paste whole manuals in; includes "unanswerable" test | Adopt (unanswerable questions in golden set) |
| 18 | [SPIQA](https://arxiv.org/abs/2407.09413) | Verified | 270,194 questions on 25,859 CS papers' figures and tables | Open models gain large amounts after fine-tuning | Science papers | Skip |
| 19 | [Kiln (README)](https://github.com/Kiln-AI/Kiln) | Verified (README) | Desktop app for evals, prompt tuning, RAG, fine-tuning; MIT library | none | Free eval tooling, but another install on a locked PC | Skip for now |
| 20 | [Together Cookbook (README)](https://github.com/togethercomputer/together-cookbook) | Verified (README) | Notebooks incl. "Multimodal RAG with slide deck", OCR | none | Needs Together API key | Skip |
| 21 | [Pixeltable (README)](https://github.com/pixeltable/pixeltable) | Verified (README) | Python database for multimodal data, Apache 2.0 | none | Duplicates Azure AI Search | Skip |
| 22 | Pathway multimodal RAG template | Verified (page) | Parses tables with `table_parsing_strategy="llm"` using GPT-4o | none | Same idea as BOULON's image-description step | Skip |
| 23 | Hugging Face ColPali cookbook | Partial (notebook searched, not read in full) | Runs ColPali via byaldi on a free Colab T4 GPU | none | Ready recipe for Idea 4 | Use for Idea 4 |
| 24 | Analytics Vidhya guide | Partial (page text skimmed) | Multi-vector retrieval with GPT-4o over text, images, tables | none | Generic blog | Skip |

### One-hop additions (newer work)

| # | Title (link) | Read | Method | Key number | Applies? | Verdict |
|---|---|---|---|---|---|---|
| 25 | [OHRBench](https://arxiv.org/abs/2412.02592) | Verified | 8,561 pages from 7 domains (incl. manuals); measures how OCR errors hurt RAG | Overall answer score: perfect text 36.1, best OCR (Qwen2.5-VL-72B) 31.1 (about 14% lower); table retrieval 69.6 perfect vs 59.8 Qwen, 57.8 Marker, 48.5 MinerU; severe OCR errors cut scores about 50% | Direct evidence that bad table reading hurts retrieval | Adopt (explains torque failures) |
| 26 | [OmniDocBench](https://arxiv.org/abs/2412.07626) | Verified | 981 pages, 9 document types; compares parsers | Table TEDS English: Mathpix 77.0, MinerU 78.6, Qwen2-VL-72B 76.8, GPT-4o 72.0, Marker 67.6 | Best tools still rebuild only about 77-79 of 100 table structure; no cost data | Test (Idea 3) |
| 27 | [Structure-Aware Tabular Chunking](https://arxiv.org/abs/2605.00318) | Verified (short paper) | Each table row is a key-value block; rows are merged to 512 tokens, never cut | Hybrid MRR 0.3576 to 0.5945; BM25 Recall@1 0.366 to 0.754; 40-56% fewer chunks | Tested on legal CSV/Excel only; idea transfers | Adopt the idea (Idea 1) |
| 28 | [Lost in OCR Translation](https://arxiv.org/abs/2505.05666) | Verified | ColQwen2 (7B) vs Llama 3.2 90B OCR + text embeddings on 4,196 degraded documents | MRR 0.4852 (OCR) vs 0.2471 (images); ROUGE-L 0.2355 vs 0.1903; memory 9.5 GB vs 1.38 GB per 1,000 docs | Counter-evidence: strong VLM reading beat image search on scans | Adopt as caution |
| 29 | [ViDoRe V2](https://arxiv.org/abs/2505.17166) | Verified (short report) | Harder page-retrieval set, queries in FR, EN, ES, DE | colqwen2.5 avg 0.597; ColSmol-256M 0.397; multilingual scores lower | French-vs-English test | Test (French queries) |
| 30 | [ViDoRe V3](https://arxiv.org/abs/2601.08620) | Verified | 10 datasets, 26,000 pages, 3,099 queries, 6 languages | Visual retriever 59.8 vs best text 51.0 nDCG@10; text reranker +13.2 (text pipeline then best); visual reranker +0.2; hybrid text+image context 54.7% vs 52.1% text on hard questions | Reranking is the cheap lever | Adopt |

**Count: 30 entries; 28 Verified (24 papers, 3 tool READMEs, the Pathway page) and 2 Partial (HF cookbook, Analytics Vidhya).**

## Reading across the papers

1. **Tables are the common weak spot** (OHRBench, M-Longdoc, LongDocURL, ViDoRe V3). This matches BOULON's wrong torque values.
2. **Image search wins on benchmarks but needs a GPU and its own index.** ColPali beats OCR pipelines by 47 points on figures and 13 on tables. But MMDocIR shows text written by a vision model gets close, and at region level it equals images. BOULON's "describe the page with a VLM" step captures much of this without GPUs.
3. **A text reranker is the cheapest big gain** (+13.2 in ViDoRe V3). Azure's semantic ranker is one.
4. **Evidence conflicts.** Lost in OCR found a 90B vision reader plus text search beat image search. So "images always win" is not safe.
5. **Gaps.** No paper tests wiring diagrams or procedure completeness. Only M-Longdoc and OHRBench include manuals.
6. **Index risk.** MMDocIR notes text retrievers cut input at 512 tokens, and 61-63% of pages exceed that. Check that our embedding model's limit does not silently truncate big chunks.

## Top 5 ideas to try, with a one-manual test

Pick one manual with a torque table, a numbered procedure over 12 steps and a wiring diagram. Write 15 questions (5 torque, 5 procedure, 5 diagram), English and French, with the correct page noted. Score: correct value, all steps present, correct page cited. Include 2 unanswerable questions (MMLongBench idea).

1. **Table rows keep their header and manual title (papers 25, 27).** Ingest twice, with and without header repeated on every table chunk. Pass: at least 4 of 5 torque answers right and no wrong-table answers. Cost: free.
2. **Score the page, not just the answer (papers 11, 13, 30).** For each question, check whether the right page is in the top 5 with the semantic ranker on and off. Pass: 12 of 15. Cost: query calls only.
3. **Table reading bake-off (papers 25, 26).** On 10 table pages compare Document Intelligence markdown, the gpt-5-mini image description, and (if installable) MinerU or Marker. Check every torque digit by eye. Pass: zero wrong digits. Cost: cents.
4. **ColPali offline bake-off (papers 7, 8, 15, 23).** Run ColPali on the same manual on a free Colab T4 GPU using the Hugging Face recipe (manuals are not private per Greg), then compare page Recall@5 to Azure on the 15 questions. Pass: if it beats Azure by 15+ points on diagram and table questions, cost a self-hosted page index for wiring books only. Not usable in Copilot Studio as is.
5. **Cap retrieved pages (papers 16, 17).** Answer the 5 procedure questions with the top 3, 5 and 8 chunks. Pass: the setting with all steps present and fewest wrong-source errors. Cost: free.

Not worth testing: GME, MegaPairs, AR-MCTS, VisDoMRAG, DSE, AlzheimerRAG, SPIQA, Dyn-VQA, Document Haystacks.

## Remaining limits

- "Verified" means full text in hand and key sections and tables read; I did not read every line.
- No paper covers wiring diagrams; only Idea 4 can measure that.
- HF cookbook and Analytics Vidhya remain Partial.
