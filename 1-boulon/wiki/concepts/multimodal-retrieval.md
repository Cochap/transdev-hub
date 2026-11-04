---
title: Multimodal and page-image retrieval
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/research-2026-10-07/b-visual-retrieval.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../docs/research-2026-10-07/00-combined-recommendation.md, ../../docs/rag-radar/knowledge-web.md]
---

**Bottom line:** page-image search (ColPali style) beats text search on benchmarks, especially figures, but BOULON's index cannot store it and the agent could not read the picture anyway; the decision on 2026-10-07 was "test offline only", with picture descriptions covering the need for now.

## Plain definition (as the sources define it)
- Search the page as a picture instead of (or next to) its text. "*Multi-vector (late interaction, ColBERT style)* = hundreds of small lists per page, matched piece by piece to the question (the matching step is called MaxSim)"; "*VLM* = vision-language model, an AI that reads images" (`1-boulon/docs/research-2026-10-07/b-visual-retrieval.md`).
- ColPali "embeds page images into many small vectors, no OCR or chunking" (`d1-awesome-papers.md`, paper 8). Perplexity's model is "late-interaction (ColBERT-style: one vector per token, compared word by word)" (knowledge web `#pplx-embed-v2-late`).

## What the evidence says
- ColPali: ViDoRe average 81.3 nDCG@5 vs 66.1 for OCR; tables 83.9 vs 70.8; figures 79.1 vs 31.4; indexing 0.39 s per page; 257.5 KB per page (`d1-awesome-papers.md`, papers 8 and corrections list).
- ViDoRe V3: visual retriever 59.8 vs best text 51.0 nDCG@10, but a text reranker adds +13.2 and a visual one +0.2 (`d1-awesome-papers.md`, paper 30).
- Counter-evidence: "Lost in OCR Translation" found a strong 90B vision reader plus text search beat image search on scans, so "images always win" is not safe (`d1-awesome-papers.md`, paper 28 and point 4). MMDocIR: text written by a vision model gets close and equals images at region level.
- A 2026-10-15 paper: vision models underuse retrieved pages; raising the page-image token budget from 1K to 32K improved accuracy by 15.22 points (knowledge web `#loc-multimodal-rag`, abstract not re-checked).
- No paper tests wiring diagrams; French bilingual service manuals untested (`d1-awesome-papers.md`, "Gaps"; `b-visual-retrieval.md` section 2).

## How it shows up in BOULON
- Today BOULON does the cheap version: a model describes each picture and the description is embedded ([[azure-search-index]], [[review-findings-rag-pipeline]]). This "captures much of this without GPUs" (`d1-awesome-papers.md`, "Reading across the papers", point 2).
- Real blockers for true page-image search (`b-visual-retrieval.md` section 1): ColPali needs about 34 GB for the library vs 15 GB maximum on Basic; the index has no MaxSim; Azure AI Search cannot store images; and a found diagram page still has no text for the agent to answer from. GPU cost is small (about USD 6 on a rented L4).
- Cheapest fit if ever tried: Cohere Embed v4 as a second vector field (listed in Azure's vectorizer, preview); the deciding unknown is whether Copilot Studio accepts that vectorizer. Decide before the paid reading run because the field "cannot be added cheaply afterwards" (`b-visual-retrieval.md` sections 1, 8).
- Decision (`00-combined-recommendation.md`): "Do not do now: ColPali and other page-image search". Offline test ideas: ColQwen2 on a rented L4 (under CAD 5 for one manual); HF ColPali cookbook on a free Colab T4. See [[phase-1-manuals-pilot]], [[rebuild-v2-pipeline]], [[copilot-studio-agent]].
- Licence trap: ColQwen2.5 uses the Qwen Research License (non-commercial); Marker and Jina v4 weights also restricted (`b-visual-retrieval.md` section 3).

## Tools in the knowledge web
- NVIDIA Nemotron 3.5 Embed/Rerank (top ViDoRe v3.1 score; GPU) `#nemotron-3-5-retriever`; Perplexity pplx-embed-v2-late (MIT, ViDoRe v3 nDCG@10 65.2% for 9B) `#pplx-embed-v2-late`; EmbeddingGemma 2 `#embeddinggemma-2`.
- RouteDRAG sends a question through pages, tables or figures `#routedrag`; GEMS-RAG splits figures and tables of an engineering standard into linked visual entities `#gems-rag`.
- Parsers that output tables as HTML: [[document-parsing-and-ocr]].

## Go deeper
- ColPali https://arxiv.org/abs/2407.01449 . ViDoRe V3 https://arxiv.org/abs/2601.08620 . MMDocIR https://arxiv.org/abs/2501.08828 . M3DocRAG https://arxiv.org/abs/2411.04952
- Multimodal RAG underuse: https://arxiv.org/abs/2610.21318 . Awesome list: https://github.com/JarvisUSTC/Awesome-Multimodal-RAG

## Related
[[embeddings]] · [[vector-database]] · [[document-parsing-and-ocr]] · [[agentic-retrieval]] · [[graphrag]] · [[rag-field-map]] · [[greg-interest-map]]
