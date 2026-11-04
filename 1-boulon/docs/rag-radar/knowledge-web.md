# RAG radar — knowledge web (self-hosted RAG chatbots)
Living map of the best tools, models, techniques and community builds for self-hosted RAG chatbots, kept by the weekly `rag-radar` routine (skill `.claude/skills/rag-radar/SKILL.md`). Every node has a source link and date. Links between nodes use `[[node-id]]`.

**Last updated:** 2026-11-02 (window 2026-10-03 to 2026-11-02; report `runs/2026-11-02.md`). Previous: 2026-10-29 seed run.

**Date note:** GitHub release pages show day and month only; for those nodes the year 2026 is inferred from the page footer and release order (marked "year inferred"). PyPI, arXiv, Hugging Face blog and Microsoft Message Center dates show the year.

## Leaders (current best pick per category)
| Category | Pick | Why | Evidence |
|---|---|---|---|
| Full-stack chat apps and frameworks | RAGFlow [[ragflow]] | Only engine whose in-window releases target all three BOULON pains: tables (rc3: one HTML path for PDF tables, DOCX tables captioned with their heading path), numbered citations, an evidence-sufficiency check before answering (still a release candidate, so watch) | [v1.0.0-rc3](https://github.com/infiniflow/ragflow/releases/tag/v1.0.0-rc3) (2026-10-30) |
| Parsing, chunking, multimodal | Docling [[docling]] | Steady table and OCR fixes in October: OCR word cells in table tokens, OCR for broken text layers, per-page confidence | [releases](https://github.com/docling-project/docling/releases) (v2.139.0 to v2.144.0, 14-28 Oct, year inferred) |
| Embeddings, rerankers, search, vector DBs, GraphRAG | NVIDIA Nemotron 3.5 Embed / Rerank [[nemotron-3-5-retriever]] | Top dense score on ViDoRe v3.1 (page-image retrieval: tables and diagrams as images); no French evidence, GPU | [HF blog](https://huggingface.co/blog/nvidia/nemotron-retriever-world-class-agentic-retrieval) (2026-10-21) |
| Local LLMs and serving | Granite Switch 4.1 [[granite-switch]] | Apache 2.0, 131,072-token context, French among 12 languages, switchable adapters (RAG adapters not on this checkpoint yet) | [model card](https://huggingface.co/ibm-granite/granite-switch-4.1-8b) (2026-10-14) |
| Evaluation, hallucination checks, guardrails | Copilot Studio Evaluations (improved) [[copilot-studio-evaluations]] | Native to today's BOULON stack, no install: explains pass/fail, shows cited sources, compares runs, 100-case datasets; now also generated custom graders (GA) and a shared grader library (GA 2026-11-15), the likely fix for abstentions graded Fail | [MC1518085](https://mc.merill.net/message/MC1518085) (2026-10-21); [MC1531924](https://mc.merill.net/message/MC1531924) (2026-10-30) |

## A. Full-stack self-hosted RAG chat apps and frameworks

### RAGFlow  {#ragflow}
- **What:** Open-source RAG engine (the whole pipeline: parse, chunk, search, chat) known for deep document parsing; being rewritten in Go.
- **Why it matters:** v1.0.0-rc2 emits tables as structured data instead of HTML (#20741, later chunker change #20918 renders table chunks as HTML again, so mixed), numbers citations from a per-turn evidence registry (#20677, verified verbatim), and keeps citations on no-answer replies (#20862). v1.0.0-rc1 (29 Sep) is the Go rewrite; its upgrade from v0.27.2 is one-way (cannot be rolled back); DeepDoc parsing CPU-only in rc1. v0.27.3 (23 Oct) is the Python line; the table/citation changes above were not seen in its notes.
- **Update 2026-11-02:** v1.0.0-rc3 (2026-10-30, last candidate before v1.0.0, upgrade from rc2 direct). Verified verbatim: PDF tables rendered through one canonical HTML path (#21083); DOCX tables captioned with their heading hierarchy (#21202); a "decision model for evidence sufficiency judgment within the agentic tool loop" (the engine checks whether it found enough before answering, close to BOULON's honest "I don't know"). Not verified (seen only in a page summary): citations numbered per message (#21531). No French items in the notes.
- **Evidence:** [v1.0.0-rc3](https://github.com/infiniflow/ragflow/releases/tag/v1.0.0-rc3) (2026-10-30T11:53Z, from the releases JSON); [v1.0.0-rc2](https://github.com/infiniflow/ragflow/releases/tag/v1.0.0-rc2) (16 Oct, year inferred); [releases](https://github.com/infiniflow/ragflow/releases) (v0.27.3 23 Oct, year inferred). Two of the three rc2 claims were read from a summarised part of the page.
- **BOULON fit:** Phase 1. **Effort:** IT ticket (Docker), GPU optional.
- **Status:** watch (release candidate with one-way migration; revisit at v1.0 final). **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** pairs with [[mineru]], [[docling]]; competes with [[dify]], [[onyx]].

### Open WebUI  {#open-webui}
- **What:** The most widely used self-hosted chat interface, with built-in RAG over uploaded documents.
- **Why it matters:** v0.12.0 lets you see and edit the text the model actually searches for each file (useful to see why a table answers badly); v0.12.2 fixes MinerU 4.x servers and shows sources under replies; v0.12.5 embeds large documents in batches of 1000 chunks, allows negative reranker thresholds, adds Mistral OCR model choice.
- **Evidence:** [releases](https://github.com/open-webui/open-webui/releases) (v0.12.0 10 Oct, v0.12.2 14 Oct, v0.12.5 29 Oct; year inferred).
- **BOULON fit:** Phase 1 / learning only. **Effort:** IT ticket (Python or Docker).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** pairs with [[mineru]], [[docling]]; competes with [[anythingllm]], [[librechat]].

### Onyx (formerly Danswer)  {#onyx}
- **What:** Enterprise self-hosted RAG and chat platform with many connectors.
- **Why it matters:** v5.0.0 removes Vespa (search engine) and consolidates the document index, adds OpenSearch vector quantization, moves file storage off MinIO. Infrastructure, not answer quality.
- **Update 2026-11-02:** v5.0.3 (30 Oct) fixes document-access selection and connector forms; v4.9.7 (2026-11-02) is a security patch on the older line. Maintenance only.
- **Evidence:** [releases](https://github.com/onyx-dot-app/onyx/releases) (v5.0.0 24 Oct, v5.0.1 26 Oct, v5.0.3 30 Oct; year inferred; v4.9.7 2026-11-02 from the atom feed).
- **BOULON fit:** learning only. **Effort:** IT ticket (Docker/Kubernetes).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[ragflow]], [[dify]].

### Dify  {#dify}
- **What:** Visual workflow and agent builder with a built-in knowledge base (closest open-source look-alike of Copilot Studio).
- **Why it matters:** v1.18.0 adds an opt-in beta "Agent Knowledge Base" with retrieval traces and quality evaluations; citations keep document metadata; hybrid search keeps the rerank setting; CSV cell content preserved.
- **Evidence:** [1.18.0](https://github.com/langgenius/dify/releases/tag/1.18.0) (23 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket (Docker).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[ragflow]], [[onyx]], [[copilot-studio-evaluations]] (as a platform).

### Haystack (deepset)  {#haystack}
- **What:** Python framework for building retrieval pipelines and agents.
- **Why it matters:** v3.3.0 in-memory BM25 now returns only documents matching a query term; v3.4.0 changes `page_number` handling in splitters (breaking; touches page citations) and the default embedder; v3.4.1 is a security release (certifi).
- **Update 2026-11-02:** v2.31.1-rc1 (2026-11-02) is a security candidate (newer `anyio` for a CVE, and `certifi`) on what looks like the 2.x maintenance line; branch not confirmed.
- **Evidence:** [releases](https://github.com/deepset-ai/haystack/releases) (v3.3.0 01 Oct, v3.4.0 15 Oct, v3.4.1 21 Oct; year inferred; v2.31.1-rc1 2026-11-02T16:51Z).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[langgraph]].

### LangGraph  {#langgraph}
- **What:** Library for building stateful agent workflows (graphs of steps).
- **Why it matters:** Maintenance releases: error handlers recover on every path, failed task results stream, snapshot default changed from every 1000 to every 100 updates.
- **Update 2026-11-02:** 1.2.19 fixes streaming and adds tool names to node metadata (minor).
- **Evidence:** [releases](https://github.com/langchain-ai/langgraph/releases) (1.2.16 16 Oct to 1.2.18 26 Oct; year inferred); [atom feed](https://github.com/langchain-ai/langgraph/releases.atom) (1.2.19, 2026-10-30).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[haystack]].

### DSPy  {#dspy}
- **What:** Framework that optimizes LLM prompts and pipelines automatically instead of hand-writing them.
- **Why it matters:** 3.4.1 released; release notes not read, so content unknown.
- **Evidence:** [PyPI history](https://pypi.org/project/dspy/#history) (3.4.1, 2026-10-12).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** —

### AnythingLLM  {#anythingllm}
- **What:** Desktop and Docker RAG chat app.
- **Why it matters:** v1.19.0 adds an optional built-in local LLM for Docker (Lemonade + llama.cpp); no table, French or citation changes seen.
- **Evidence:** [releases](https://github.com/Mintplex-Labs/anything-llm/releases) (v1.17.0 1 Oct to v1.19.0 26 Oct; year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket (desktop installer or Docker; no-admin install not verified).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** builds on [[llama-cpp]]; competes with [[open-webui]].

### LibreChat  {#librechat}
- **What:** Multi-provider chat interface.
- **Why it matters:** v0.8.8 agent controls (interrupt, steer, queue), unified Agent Builder; v0.8.9-rc1 Chat Projects with shared reference files. No RAG changes seen.
- **Evidence:** [releases](https://github.com/danny-avila/LibreChat/releases) (v0.8.8 1 Oct, v0.8.9-rc1 26 Oct; year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[open-webui]].

## B. Document parsing, chunking, multimodal RAG

### Docling (IBM)  {#docling}
- **What:** Open-source converter from PDF and Office files to structured text, with layout and table models and chunking.
- **Why it matters:** October releases hit manual pains: v2.143.1 keeps OCR word cells in table tokens; v2.144.0 replaces broken PDF text layers with OCR and adds `--heading-hierarchy`; v2.139.0 exposes a per-page confidence breakdown (a signal for "I'm not sure"); v2.141.0 supports Nemotron-3.5-Parse as a parsing model. No French-specific claim.
- **Update 2026-11-02:** v2.145.0 adds page-orientation detection for RapidOCR (rotated scanned pages) and fixes for PDF, XLSX and VLM handling.
- **Evidence:** [releases](https://github.com/docling-project/docling/releases) (v2.137.0 9 Oct, v2.139.0 14 Oct, v2.141.0 20 Oct, v2.143.1 27 Oct, v2.144.0 28 Oct; year inferred). Claims verified verbatim on 2026-10-29. [Releases API](https://api.github.com/repos/docling-project/docling/releases) (v2.145.0, 2026-10-29).
- **BOULON fit:** Phase 1 (flattened torque table, scanned manuals). **Effort:** Python (IT ticket on the locked PC).
- **Status:** try (when a parsing test is possible; fallback if Azure layout parsing keeps flattening tables). **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** pairs with [[nemotron-3-5-retriever]] (Parse); competes with [[mineru]], [[unstructured]], [[ocria-1]].

### MinerU  {#mineru}
- **What:** Open-source PDF-to-Markdown/JSON parser with layout and table recognition.
- **Why it matters:** 4.1.0 runs on CPU by default (auto-uses a GPU if present) on Windows, Linux and macOS; new `/v1/tasks` API (breaking). Notes say nothing about tables, French or accuracy.
- **Update 2026-11-02:** 4.1.1 to 4.1.4 (29 Oct to 2 Nov): stray private-use characters in native PDF text become spaces (the only parsing fix that could touch manuals); formula crops and router/API fixes otherwise.
- **Evidence:** [releases](https://github.com/opendatalab/MinerU/releases) (4.1.0 29 Oct; 4.0.10 29 Sep to 4.0.12 11 Oct; year inferred); [Releases API](https://api.github.com/repos/opendatalab/MinerU/releases) (4.1.1 2026-10-29 to 4.1.4 2026-11-02).
- **BOULON fit:** Phase 1 / learning only. **Effort:** Python (IT ticket).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** used by [[ragflow]], [[open-webui]]; competes with [[docling]].

### LlamaIndex OCRia-1 (LlamaParse)  {#ocria-1}
- **What:** LlamaIndex's 4B-parameter vision-language parsing model behind the hosted LlamaParse service.
- **Why it matters:** Claimed by vendor: ParseBench overall 87.4 (next: 75.3), tables 91.5, olmOCR-bench tables 92.9, fr-bench-pdf2md 72.1 (appears to be a French PDF benchmark; not confirmed). ParseBench is the vendor's own benchmark. Hosted only; open weights not stated.
- **Evidence:** [blog](https://www.llamaindex.ai/blog/parse-ocria-1) (2026-10-22 from blog listing).
- **BOULON fit:** Phase 1 (reference only; sending manuals to a third-party API needs Greg's approval). **Effort:** browser.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[docling]], Azure Document Intelligence.

### Unlimited-OCR-2 (Baidu)  {#unlimited-ocr-2}
- **What:** 3B, MIT-licensed OCR model that reads many pages in one pass with near-constant memory.
- **Why it matters:** Aimed at long documents (100-page manuals). Card claims state of the art on MPDocBench and MarathonDocBench with no numbers; languages not listed.
- **Evidence:** [model card](https://huggingface.co/baidu/Unlimited-OCR-2) (2026-10-27).
- **BOULON fit:** learning only. **Effort:** GPU.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** served by [[vllm]]; competes with [[docling]].

### pplx-embed-v2-late (Perplexity)  {#pplx-embed-v2-late}
- **What:** MIT-licensed late-interaction (ColBERT-style: one vector per token, compared word by word) retriever for page images and text, 0.6B and 9B sharing one vector space.
- **Why it matters:** ViDoRe v3 nDCG@10 65.2% (9B) and 62.3% (0.6B) on images (model card). Route to search diagram and table pages without OCR. Azure AI Search has no native multi-vector late interaction, so separate stack.
- **Evidence:** [model card](https://huggingface.co/perplexity-ai/pplx-embed-v2-late-9b); arXiv 2610.29523 (v1 2026-10-21).
- **BOULON fit:** learning only (Phase 1 diagrams later). **Effort:** GPU.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[nemotron-3-5-retriever]].

### Unstructured  {#unstructured}
- **What:** Open-source library that splits documents into typed elements and chunks them.
- **Why it matters:** 0.27.22 better figure/table cropping and stable chunk IDs; 0.27.33 stops a large element repeating in every chunk. Incremental.
- **Update 2026-11-02:** 0.27.36 keeps empty table cells' row spans, splits OCR lists into one element per item, keeps fast PDF mode working when ONNX fails.
- **Evidence:** [releases](https://github.com/Unstructured-IO/unstructured/releases) (0.27.22 8 Oct to 0.27.35 27 Oct; year inferred); [Releases API](https://api.github.com/repos/Unstructured-IO/unstructured/releases) (0.27.36, 2026-10-30).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[docling]].

### Marker (Datalab)  {#marker}
- **What:** Open-source PDF-to-Markdown converter built on the Surya OCR models.
- **Why it matters:** v2.1.0 moves to Surya 2.5, which the release notes say is 1.7x faster in pages per second than Surya 2 on one H100 (claimed by vendor). v2.0.0 (20 Jul, out of window) scored 76.0% on olmOCR-bench in balanced mode per the same notes. No table-specific or French claim.
- **Evidence:** [Releases API](https://api.github.com/repos/datalab-to/marker/releases) (v2.1.0, 2026-10-29).
- **BOULON fit:** learning only (a candidate in an offline parser comparison). **Effort:** Python / GPU.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** competes with [[docling]], [[mineru]]; testable with [[ragit]].

### MiniCPM-OCR 1.0 (OpenBMB)  {#minicpm-ocr-1}
- **What:** About 1.3B-parameter, Apache 2.0 OCR model that outputs tables as HTML, using the PP-DocLayoutV3 layout model.
- **Why it matters:** Claimed by vendor (model card): Real5-OmniDocBench 93.68 (93.75 in the evaluation table), OCRBench v2 54.7, olmOCR-Bench 82.7, 1.2 pages/s on an RTX 5090. Only Chinese and English documented; French not stated.
- **Evidence:** [model card](https://huggingface.co/openbmb/MiniCPM-OCR-1.0) (no date on the card; Hugging Face repo created 2026-10-21).
- **BOULON fit:** learning only. **Effort:** GPU, Python.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** competes with [[unlimited-ocr-2]], [[ocria-1]].

## C. Embeddings, rerankers, hybrid search, vector databases, GraphRAG

### NVIDIA Nemotron 3.5 Embed / Rerank / Parse  {#nemotron-3-5-retriever}
- **What:** Open multimodal embedding models (8B, 1B; text plus page image), an 8B reranker (re-orders search results) and a 631M document-parsing model.
- **Why it matters:** ViDoRe v3.1: Embed 8B 61.17 nDCG@10 (first among dense models), Embed 1B 58.38; Rerank 8B 60.49 vs Qwen-3-VL-Reranker-8B 59.17 (as of 2026-10-20). Parse: ParseBench 72.74 single pass. Text retrieval tested on 34 languages; French not named. "Open, commercially available"; licence not named (check model cards).
- **Evidence:** [HF blog](https://huggingface.co/blog/nvidia/nemotron-retriever-world-class-agentic-retrieval) (published 2026-10-21, updated 2026-10-29; verified).
- **BOULON fit:** both (diagrams and tables as images). **Effort:** GPU (IT ticket).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** Parse supported by [[docling]]; models supported by [[llama-cpp]]; competes with [[pplx-embed-v2-late]], [[embeddinggemma-2]].

### EmbeddingGemma 2 (Google)  {#embeddinggemma-2}
- **What:** Open embedding model putting text, images, video and audio in one vector space (740M; 270M text-only).
- **Why it matters:** Apache 2.0, 8,192-token context, MTEB multilingual v2 mean 61.36 (v1: 61.15), "100+ languages" (French not named). Small enough for CPU (text-only).
- **Evidence:** [model card](https://huggingface.co/google/embeddinggemma-2) (undated); [Simon Willison](https://simonwillison.net/2026/Oct/6/hn-49983751/) (2026-10-06); supported in [[vllm]] v0.32.0 (2026-10-18).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[nemotron-3-5-retriever]], [[bekko-static-embedding]].

### bekko-static-embedding-v1  {#bekko-static-embedding}
- **What:** Static (no neural network at query time, so very fast on CPU) multilingual embedding model, 40 languages including French.
- **Why it matters:** MMTEB Retrieval 49.96 vs multilingual-e5-small 50.9; overall mean 50.18 vs 56.4. Cheap but weaker.
- **Evidence:** [HF blog](https://huggingface.co/blog/hotchpotch/bekko-static-embedding) (2026-10-21).
- **BOULON fit:** learning only. **Effort:** Python (CPU).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[embeddinggemma-2]].

### Cohere Rerank 5 (Pro / Fast)  {#cohere-rerank-5}
- **What:** Hosted multilingual reranker (re-orders search results by relevance) from Cohere, model IDs `rerank-v5.0-pro` and `rerank-v5.0-fast`.
- **Why it matters:** Names French explicitly: RCP-nDCG@10 (Cohere's own variant of nDCG@10) French 90.5 Pro, 88.6 Fast; parsed PDFs average 89.9 Pro, 88.5 Fast (all claimed by vendor). The page says scores are "calibrated out of the box" (0.7 means about 70% chance the document is useful), which could set a clean "nothing relevant found" cut-off for an honest "I don't know". Context length not stated. Caution from [[declinecraft]]: adding rewriting plus reranking lowered abstention in every model tested.
- **Evidence:** [Cohere blog](https://cohere.com/blog/rerank-5) (2026-10-21, French cell and calibration sentence verified 2026-11-02); [changelog](https://docs.cohere.com/changelog/rerank-v5) (undated).
- **BOULON fit:** Phase 1 (reference only; sending manual text to a third-party API needs Greg's approval; no native Azure AI Search hook found). **Effort:** browser/Python for a test call; IT ticket to wire in.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** competes with [[nemotron-3-5-retriever]] (Rerank), Azure semantic ranker; checked by [[declinecraft]].

### SlideOn / mSlideOn (LightOn)  {#mslideon}
- **What:** Open learned-sparse retrievers (keyword-like search that learns related terms), 174M English and 339M multilingual.
- **Why it matters:** mSlideOn MIRACL (18 languages) 62.78, MLDR 61.68, BEIR-15 56.00. Could help part codes and fault terms where keyword search beats vectors. French not confirmed.
- **Evidence:** [HF blog](https://huggingface.co/blog/lightonai/slideon-mslideon) (2026-10-19).
- **BOULON fit:** learning only. **Effort:** Python/GPU.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** pairs with a dense embedder for hybrid search.

### Qdrant  {#qdrant}
- **What:** Open-source vector database.
- **Why it matters:** v1.20.0 adds BM25 scoring on the full-text index (keyword and vector hybrid in one store), `turbo8`/`turbo16` compressed vectors, nested payload indexes, audit log; auth enforced by default when a key is set.
- **Evidence:** [v1.20.0](https://github.com/qdrant/qdrant/releases/tag/v1.20.0) (22 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket (Docker); cloud free tier = browser.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[milvus]], [[weaviate]], [[lancedb]], Azure AI Search hybrid.

### Milvus  {#milvus}
- **What:** Open-source vector database.
- **Why it matters:** 3.0.3 adds Function Chain for hybrid search, partial updates of JSON/array fields; breaking: V1 REST routes removed.
- **Update 2026-11-02:** v3.0.5 published; release notes say "coming soon", so content unknown.
- **Evidence:** [releases](https://github.com/milvus-io/milvus/releases) (3.0.3 14 Oct, 3.0.4 26 Oct; year inferred); [v3.0.5](https://api.github.com/repos/milvus-io/milvus/releases/tags/v3.0.5) (2026-10-30).
- **BOULON fit:** learning only. **Effort:** IT ticket.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[qdrant]].

### Weaviate  {#weaviate}
- **What:** Open-source vector database.
- **Why it matters:** v1.40.1-1.40.3 patch releases only (fixes, security).
- **Evidence:** [releases](https://github.com/weaviate/weaviate/releases) (13-28 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[qdrant]].

### LanceDB  {#lancedb}
- **What:** Embedded vector database (a library, no server).
- **Why it matters:** v0.41.0 many breaking changes; `trust_remote_code` now off by default (safer).
- **Evidence:** [releases](https://github.com/lancedb/lancedb/releases) (29 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[qdrant]].

### Microsoft GraphRAG  {#graphrag}
- **What:** Microsoft's toolkit that builds a knowledge graph from documents and answers over it.
- **Why it matters:** v3.3.0 is a small fix (SQLite performance). A blog claim of incremental indexing was not in the primary notes, so dropped.
- **Evidence:** [releases](https://github.com/microsoft/graphrag/releases) (08 Oct, year inferred).
- **BOULON fit:** learning only (Phase 2 fault-part-procedure links someday). **Effort:** Python plus LLM indexing cost.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** related to [[gems-rag]].

## D. Local LLMs and serving

### Granite Switch 4.1 (IBM)  {#granite-switch}
- **What:** One Granite model checkpoint (8B and 30B) with small switchable adapters for tasks like safety and decisions.
- **Why it matters:** Apache 2.0, 131,072-token context, 12 languages including French. Adapters on this checkpoint: Guardian Core (safety), Decision, speech-to-text (4.1.1 adds French speech). RAG adapters (answerability, citations) are said to exist in a separate IBM library, not verified on a primary page. Runs in vLLM (plug-in) and llama.cpp.
- **Evidence:** [4.1 blog](https://huggingface.co/blog/ibm-granite/granite-switch-4-1) (2026-10-15); [4.1.1 blog](https://huggingface.co/blog/ibm-granite/granite-switch-4-1-1) (2026-10-29); [model card](https://huggingface.co/ibm-granite/granite-switch-4.1-8b).
- **BOULON fit:** Phase 1 (learning; the "honest I don't know" idea). **Effort:** GPU (IT ticket).
- **Status:** watch (upgrade to try if a checkpoint ships the RAG adapters). **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** served by [[vllm]], [[llama-cpp]].

### Mistral Large 4  {#mistral-large-4}
- **What:** Mistral's 1-trillion-parameter mixture-of-experts model (only part of it runs per word), API now, open weights promised end of October.
- **Why it matters:** Claimed by vendor: 52B active, fluent in 160+ languages (Simon Willison says 49B active; conflict). No licence or context window on the page; weights not confirmed public. Far beyond one GPU.
- **Update 2026-11-02:** Open weights are now on Hugging Face (`Mistral-Large-4-1T-A52B`). Model card: about 49B active per token (52B with embeddings), 1M-token context, modified-MIT licence (a separate commercial licence only to offer the model as a service to third parties). Card text says "160+ languages", its metadata tags 39: conflict. Examples use 8-GPU tensor parallelism. Release date about 29 Oct comes only from a secondary source; neither the card nor Mistral's page shows a date. No grounding or French-specific claim.
- **Evidence:** [Mistral](https://mistral.ai/news/mistral-large-4/) (2026-10-06); [Simon Willison](https://simonwillison.net/2026/Oct/6/le-chonk/) (2026-10-06); [model card](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) (undated); [Mistral OSS post](https://mistral.ai/news/mistral-large-4-oss/) (undated).
- **BOULON fit:** learning only. **Effort:** GPU cluster.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** —

### LFM3 (Liquid AI)  {#lfm3}
- **What:** Small open-weight models (about 2B: text, vision, audio) for laptops and edge devices.
- **Why it matters:** 256K context on the text model, about 1 GB at 4-bit. Aimed at agents, not French grounded answers; licence not named.
- **Evidence:** [HF blog](https://huggingface.co/blog/LiquidAI/lfm3) (2026-10-27).
- **BOULON fit:** learning only. **Effort:** Python or Ollama.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** runs in [[llama-cpp]], [[ollama]].

### llama.cpp  {#llama-cpp}
- **What:** The main engine for running quantized (shrunk) models on CPUs and consumer GPUs.
- **Why it matters:** v0.8.0 adds LFM3, Granite Switch Decision and Nemotron-3.5-Embed support, a cache for MoE experts kept in RAM (big models on one GPU plus RAM), realtime and TTS endpoints.
- **Evidence:** [v0.8.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.8.0) (28 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket (binaries and models).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** engine under [[ollama]], [[anythingllm]]; competes with [[vllm]].

### vLLM  {#vllm}
- **What:** Production inference server for GPUs.
- **Why it matters:** v0.32.0 adds FP8/NVFP4 low-precision KV cache (longer context per GPU), structured-output and tool-call fixes, EmbeddingGemma 2 support; v0.31.0 adds draft-model speculative decoding.
- **Update 2026-11-02:** v0.33.0 (02 Nov, year inferred; notes truncated): PyTorch 2.14, CUDA 13.0-only wheels and images, Medusa and MLP speculator removed, a `/v1/decisions` endpoint. Serving stack only.
- **Evidence:** [v0.32.0](https://github.com/vllm-project/vllm/releases/tag/v0.32.0) (18 Oct, year inferred); [releases](https://github.com/vllm-project/vllm/releases) (v0.33.0, 02 Nov, year inferred).
- **BOULON fit:** learning only. **Effort:** GPU (IT ticket).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** serves [[granite-switch]], [[embeddinggemma-2]]; competes with [[llama-cpp]], [[sglang]].

### SGLang  {#sglang}
- **What:** Open-source GPU inference server, the main alternative to vLLM.
- **Why it matters:** v0.5.22 adds a faster weight loader (claimed up to 10x by the project), Apple Silicon via PyTorch, needs Python 3.11+; v0.5.21 (02 Oct) added a `/v1/decisions` API. Serving only, no RAG-quality change.
- **Evidence:** [releases](https://github.com/sgl-project/sglang/releases) (v0.5.22, 19 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** GPU (IT ticket).
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** competes with [[vllm]].

### Ollama  {#ollama}
- **What:** The easiest local model runner.
- **Why it matters:** v0.40.4-0.40.13 add Nemotron 3.5 Super (120B MoE, up to 1M context), Nemotron 3.5 Bolt E4B, LFM3.
- **Evidence:** [releases](https://github.com/ollama/ollama/releases) (12-28 Oct, year inferred).
- **BOULON fit:** learning only. **Effort:** IT ticket (installer).
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** wraps [[llama-cpp]].

## E. Evaluation, hallucination checks, citations, guardrails

### Copilot Studio Evaluations (improved)  {#copilot-studio-evaluations}
- **What:** Microsoft's built-in test tool for Copilot Studio agents (BOULON's current platform).
- **Why it matters:** New: explains why a test passes or fails, shows reasoning traces and cited knowledge sources, compares runs (spot regressions), datasets up to 100 test cases, generates questions from the knowledge sources. Says nothing about how "I don't know" answers are graded (the 2026-10-06 baseline had to be hand-scored because abstentions were graded Fail).
- **Update 2026-11-02 (custom graders):** Message Center posts of 29-30 Oct. "Generated custom grader" (MC1531924, posted 2026-10-30, GA 2026-10-15): Copilot Studio generates a grader "tailored to a specific agent and evaluation scenario", and makers can "review and adapt the grader before use". "Custom Graders Library and Ready-to-Use Microsoft Graders" (MC1531932, posted 2026-10-30, GA 2026-11-15): one place to save and reuse graders across agents, plus out-of-the-box Microsoft graders (not listed). Neither post mentions refusals, abstentions or "I don't know" (verified on the pages). Also posted, titles only: task-completion grader (MC1530742), evaluation for automation flows (MC1531903), warnings when an agent was never evaluated or its model changed (MC1532071), tool-accuracy grader (MC1530748), Evaluation Viewer role (MC1532073).
- **Evidence:** [MC1518085](https://mc.merill.net/message/MC1518085) (2026-10-21, "now available"; verified); [MC1531924](https://mc.merill.net/message/MC1531924) and [MC1531932](https://mc.merill.net/message/MC1531932) (2026-10-30; verified 2026-11-02).
- **BOULON fit:** both. **Effort:** browser.
- **Status:** try (a custom grader that passes correct abstentions is the direct fix for the 2026-10-06 hand-scoring problem). **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[deepeval]], [[phoenix]], [[promptfoo]]; checked by [[ago-quality-gate]]; abstention metric from [[declinecraft]].

### DeepEval  {#deepeval}
- **What:** Open-source Python test framework for LLM answers (faithfulness, relevance and similar scores).
- **Why it matters:** Six releases 4.2.7 to 4.3.2; notes not readable. setup-v0.1.0 adds a setup wizard and a "context exceeded" error.
- **Evidence:** [PyPI history](https://pypi.org/project/deepeval/#history) (2026-09-29 to 2026-10-27).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** competes with [[phoenix]], [[copilot-studio-evaluations]].

### Arize Phoenix  {#phoenix}
- **What:** Open-source tracing and evaluation tool for LLM apps.
- **Why it matters:** evals v3.9.3 excluded a compromised litellm 1.107.0 and a compromised root certificate: a supply-chain warning for pip-installing eval tools on a work PC.
- **Update 2026-11-02:** arize-phoenix v21.0.0 (2026-10-30) adds DECISION and AGENT annotation kinds; client, CLI and MCP packages bumped 2026-11-02. Low priority.
- **Evidence:** [releases](https://github.com/Arize-ai/phoenix/releases) (22-28 Oct 2026, via GitHub API; v21.0.0 2026-10-30).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-11-02.
- **Links:** competes with [[deepeval]].

### TruLens  {#trulens}
- **What:** Open-source library for scoring LLM app answers with AI judges and tracing them.
- **Why it matters:** 2.16.0 leaves unparsable judge scores out of averages and adds a "Jury" (several judges) with reliability metadata: judge reliability is exactly what [[ago-quality-gate]] warns about. Not an abstention fix.
- **Evidence:** [Releases API](https://api.github.com/repos/truera/trulens/releases) (2.15.0 2026-10-05, 2.16.0 2026-10-19).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** competes with [[deepeval]], [[phoenix]].

### promptfoo  {#promptfoo}
- **What:** Open-source test runner for prompts and LLM apps, with rubric grading by an AI judge.
- **Why it matters:** 0.125.0 makes rubric grading fail closed when the judge gives no verdict (no silent passes). A written rubric could grade a correct "I don't know" as a pass. Minor.
- **Evidence:** [Releases API](https://api.github.com/repos/promptfoo/promptfoo/releases) (0.125.0 2026-10-23, 0.125.1 2026-10-25).
- **BOULON fit:** learning only. **Effort:** Python or Node (IT ticket).
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** competes with [[copilot-studio-evaluations]], [[deepeval]].

### Vectara hallucination leaderboard  {#vectara-hhem-leaderboard}
- **What:** Public leaderboard measuring how often models add facts not in a source document when summarizing it.
- **Why it matters:** 2026-10-22 commit lists DeepSeek-V4.1-Flash at 4.2% and claude-opus-5-5 at 9.9% hallucination rate (Vectara's own measurement). A model-choice signal only; BOULON's model is chosen by Copilot Studio.
- **Evidence:** [repo](https://github.com/vectara/hallucination-leaderboard) (commits 2026-10-16 and 2026-10-22).
- **BOULON fit:** learning only. **Effort:** browser.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** —

## Papers and community write-ups

### Tessera: structure-completed evidence units  {#tessera}
- **What:** Training-free method that rebuilds pages into small evidence units, each carrying its page title, section path and table headers.
- **Why it matters:** +5 to 6 points answer accuracy on three QA benchmarks. Same cure BOULON needs for the flattened torque table: every chunk keeps its table header and section path. Targets web HTML, not PDF, so the idea transfers, not the code.
- **Evidence:** [arXiv 2610.37080](https://arxiv.org/abs/2610.37080) (v1 2026-10-27, verified); [code](https://github.com/sarendis56/Tessera).
- **BOULON fit:** Phase 1. **Effort:** browser (read); Python to reuse.
- **Status:** watch (idea to check against the index v2 chunking design). **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** pairs with [[docling]] (`--heading-hierarchy`).

### AGO AI Quality Gate  {#ago-quality-gate}
- **What:** Framework for deciding whether to release a new RAG version, including checking the AI judge itself.
- **Why it matters:** On RAGBench (N=1200), gpt-4.1-nano spotted unfaithful answers at AUROC 0.603, gpt-4o at 0.783 (0.62-0.88 by domain). Lesson: calibrate any AI judge against hand-scored answers before trusting it.
- **Evidence:** [arXiv 2610.01218](https://arxiv.org/abs/2610.01218) (v1 2026-10-01).
- **BOULON fit:** both (test method). **Effort:** browser.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** checks [[copilot-studio-evaluations]], [[deepeval]].

### When does uncertainty measure RAG hallucination risk?  {#uncertainty-hallucination}
- **What:** Study of when the model's own uncertainty predicts a hallucination in RAG.
- **Why it matters:** Perplexity reaches AUROC 0.81-0.91 on unsupported edits, but detection weakens when only the top passage is retrieved. An honest "I don't know" needs a retrieval check, not only a confidence score.
- **Evidence:** [arXiv 2610.22615](https://arxiv.org/abs/2610.22615) (v1 2026-10-15).
- **BOULON fit:** learning only. **Effort:** browser.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** related to [[parcel]].

### PARCEL: claim-level citation benchmark  {#parcel}
- **What:** 3,396 legal claims labelled Supported, Refuted or Not Found against the cited source.
- **Why it matters:** Top models reach up to 0.97 accuracy but still pass some unsupported claims; missing support is harder to catch than contradiction. Same task as "does this manual page support the answer?".
- **Evidence:** [arXiv 2610.10971](https://arxiv.org/abs/2610.10971) (v1 2026-10-07); [code/data](https://github.com/mmikaildemir/PARCEL).
- **BOULON fit:** learning only. **Effort:** Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** related to [[uncertainty-hallucination]].

### RouteDRAG  {#routedrag}
- **What:** Router that sends each question through pages, tables or figures in a document.
- **Why it matters:** +3.47 points average accuracy over the short path on two benchmarks.
- **Evidence:** [arXiv 2610.36444](https://arxiv.org/abs/2610.36444) (v1 2026-10-27).
- **BOULON fit:** learning only. **Effort:** GPU/Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** related to [[gems-rag]].

### GEMS-RAG  {#gems-rag}
- **What:** Graph-grounded RAG that splits figures and tables of an engineering standard (the US traffic-sign manual) into linked visual entities.
- **Why it matters:** Close use case to BOULON manuals; abstract gives no numbers.
- **Evidence:** [arXiv 2610.33277](https://arxiv.org/abs/2610.33277) (v1 2026-10-23).
- **BOULON fit:** learning only. **Effort:** GPU/Python.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** related to [[graphrag]], [[routedrag]].

### "5 RAG mistakes that broke in production" (Nicola Mastromarino, DEV)  {#dev-5-rag-mistakes}
- **What:** Community post on five failures from a clinical QA project.
- **Why it matters:** Checklist matching BOULON's choices: golden set of 30-50 real questions measuring retrieval apart from generation; chunk by structure (fixed chunks cut tables); BM25 plus embeddings plus reranker for exact codes; relevance threshold for "I couldn't find this"; required citations.
- **Evidence:** [DEV post](https://dev.to/nicolamastromarino/5-rag-mistakes-that-looked-fine-in-the-demo-and-broke-in-production-cp9) (Oct 3; year inferred).
- **BOULON fit:** Phase 1. **Effort:** browser.
- **Status:** watch. **First seen:** 2026-10-29. **Last seen:** 2026-10-29.
- **Links:** pairs with [[tessera]].

### DeclineCraft: RAG abstention benchmark  {#declinecraft}
- **What:** Benchmark measuring how often RAG systems correctly say they don't know (Correct Abstention Rate, CAR) on unanswerable questions, across 27 LLMs.
- **Why it matters:** Single-shot retrieval raises CAR in 38 of 40 configurations. But iterative RAG (the model asks for up to two more searches) lowers CAR in 30 of 40 (mean 46.4%) while accuracy barely moves (68.5% to 69.3%); adding query rewriting plus reranking lowered CAR for all 12 models tested; "thinking" mode lowered it for 8 of 13 models by 14 points on average. Lesson for BOULON: every change to ranking or orchestration can quietly erode the honest "I don't know", so abstention must be its own tracked metric.
- **Evidence:** [arXiv 2610.28340](https://arxiv.org/abs/2610.28340) (v1 2026-10-20; numbers verified 2026-11-02).
- **BOULON fit:** both (test method). **Effort:** browser.
- **Status:** watch (the lesson is actionable now; see run 2026-11-02 Recommendations). **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** related to [[uncertainty-hallucination]]; checks [[copilot-studio-evaluations]], [[cohere-rerank-5]].

### Governed Sovereign RAG: deterministic numeric verification  {#numeric-verification}
- **What:** Government-services RAG over 1,143 procedures that, after the answer is written, checks by plain code that every fee or validity number in it comes from the retrieved official record.
- **Why it matters:** 0 of 40 fiscal-amount hallucinations at Level 1 (95% bound ≤ 8.81%) over 380 production traces; 86.50% strict Top-1 accuracy on a 200-query benchmark. The same check would catch BOULON's flattened-table error (12.7 given instead of 15 Nm): a torque value in the answer must appear in the cited chunk, in the right row.
- **Evidence:** [arXiv 2610.36561](https://arxiv.org/abs/2610.36561) (v1 2026-10-27; verified 2026-11-02).
- **BOULON fit:** Phase 1 (safety check on numbers). **Effort:** browser (read); a scripted check in the test runner is Python-free PowerShell work.
- **Status:** watch (idea to add to tests). **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** pairs with [[tessera]], [[parcel]].

### RAGit: preprocessing as an experiment  {#ragit}
- **What:** Open-source workbench that treats the choice of parser and chunker as a variable to test, keeping everything downstream fixed and tracing each retrieved chunk back to its source page.
- **Why it matters:** The fair way to answer "does a header-carrying chunk fix the torque table?": compare parsers ([[docling]], [[marker]], [[mineru]]) and chunkers on the same questions with page-level scoring. Accepted at the APSEC 2026 tool-demo track.
- **Evidence:** [arXiv 2610.24659](https://arxiv.org/abs/2610.24659) (v1 2026-10-17; verified 2026-11-02).
- **BOULON fit:** Phase 1. **Effort:** Python (IT ticket).
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** tests [[docling]], [[marker]], [[mineru]], [[tessera]].

### Multimodal RAG: models underuse retrieved pages  {#loc-multimodal-rag}
- **What:** Study showing vision-language models do not make full use of the page images handed to them.
- **Why it matters:** Raising the page-image token budget from 1K to 32K improved accuracy by 15.22 points; adding OCR of the question-relevant region beat ColQwen3 by 8.88, 3.09 and 4.22 points on three benchmarks. Relevant only if BOULON later sends diagram pages as images.
- **Evidence:** [arXiv 2610.21318](https://arxiv.org/abs/2610.21318) (v1 2026-10-15; from lane B, abstract not re-checked).
- **BOULON fit:** learning only. **Effort:** browser.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** related to [[pplx-embed-v2-late]], [[nemotron-3-5-retriever]].

### CalibraRL  {#calibrarl}
- **What:** Reinforcement-learning method that trains a RAG model to state confidence that matches how often it is right.
- **Why it matters:** Cuts mean expected calibration error by 30.8% (from the arXiv listing). Needs model training, so not usable with Copilot Studio.
- **Evidence:** [arXiv 2610.35142](https://arxiv.org/abs/2610.35142) (v1 2026-10-26; abstract not re-checked).
- **BOULON fit:** learning only. **Effort:** GPU.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** related to [[uncertainty-hallucination]].

### Machine-readable operator manuals for multilingual help  {#manual-multilingual-rag}
- **What:** Paper on offline RAG over a tractor operator manual for multilingual users.
- **Why it matters:** Reports that semantic retrieval works across languages where keyword search fails: the French-question-on-English-manual case in BOULON.
- **Evidence:** [arXiv 2610.31863](https://arxiv.org/abs/2610.31863) (v1 2026-10-22; from lane E, abstract not re-checked).
- **BOULON fit:** Phase 1. **Effort:** browser.
- **Status:** watch. **First seen:** 2026-11-02. **Last seen:** 2026-11-02.
- **Links:** related to [[gems-rag]].

## Retired (superseded or not seen in 90 days)
(none yet)
