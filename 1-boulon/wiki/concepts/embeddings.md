---
title: Embeddings
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/research-2026-10-07/b-visual-retrieval.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../docs/rag-radar/knowledge-web.md, ../../docs/index-facts.md, ../../docs/continuity-log.md]
---

**Bottom line:** an embedding is a list of numbers standing for the meaning of a chunk or a question; BOULON uses one text model today (`text-embedding-3-small`) and the sources only argue for changing it if page-image search is ever added.

## Plain definition (as the sources define it)
- "*Embedding* = a list of numbers that stands for the meaning of a page; similar pages get similar lists." (`1-boulon/docs/research-2026-10-07/b-visual-retrieval.md`)
- "*Embedding* = numbers standing for a text's meaning." (`1-boulon/docs/research-2026-10-15/diy-vs-azure-stack.md`)
- Two shapes matter. **Single vector** = one list per page or chunk. **Multi-vector (late interaction, ColBERT style)** = hundreds of small lists per page, matched piece by piece to the question; see [[multimodal-retrieval]].
- Searching with embeddings is what lets a French question find an English passage (same meaning, different words). A 2026-10-22 paper reports that semantic retrieval works across languages where keyword search fails (knowledge web node `manual-multilingual-rag`, arXiv 2610.31863, abstract not re-checked, in `1-boulon/docs/rag-radar/knowledge-web.md`).

## How it shows up in BOULON
- The pilot index [[azure-search-index]] stores a `content_embedding` field: `text-embedding-3-small`, 1536 dimensions, HNSW graph, cosine distance; images are described by a model first and the description is embedded ([[review-findings-rag-pipeline]], `1-boulon/docs/index-facts.md`). The v2 design keeps the same model ([[rebuild-v2-pipeline]]). Pilot behaviour: [[phase-1-manuals-pilot]].
- The index and the question must use the same embedding model; the query-time "vectorizer" is set on the index (`diy-vs-azure-stack.md`, source [P1]).
- Cost: embeddings for the whole library are "a few dollars" (about CAD 3) per the project estimate (`diy-vs-azure-stack.md`).
- Size trick tested on BOULON's own 2,250 vectors (2026-10-06): 8-bit compression kept 93.0% of the top-5 matches and made the library's vectors about 4 times smaller (about 8.3 GB down to about 2.1 GB, inside one Basic partition of 5 GB); 1-bit kept 82.2% (`1-boulon/docs/continuity-log.md`, entry 2026-10-06 15:50). To confirm on Basic.
- Risk named by the papers review: text retrievers often cut input at 512 tokens and 61-63% of pages exceed that, so check the embedding model does not silently truncate big chunks (`d1-awesome-papers.md`, "Reading across the papers", point 6; MMDocIR). See [[chunking]].

## Tools and models in the knowledge web
(all in `1-boulon/docs/rag-radar/knowledge-web.md`, section C unless noted)
| Model | What the web says | Anchor |
|---|---|---|
| NVIDIA Nemotron 3.5 Embed (8B, 1B) | Top dense score on ViDoRe v3.1 (61.17 nDCG@10); text plus page image; GPU; French not named | `#nemotron-3-5-retriever` |
| EmbeddingGemma 2 (Google) | Text, image, video, audio in one space; Apache 2.0; 8,192-token context; text-only 270M small enough for CPU | `#embeddinggemma-2` |
| bekko-static-embedding-v1 | Very fast on CPU, 40 languages including French, but weaker (MMTEB Retrieval 49.96 vs 50.9 for multilingual-e5-small) | `#bekko-static-embedding` |
| pplx-embed-v2-late (Perplexity) | Late-interaction page-image retriever, MIT; Azure AI Search has no native multi-vector matching | `#pplx-embed-v2-late` |
| SlideOn / mSlideOn (LightOn) | Learned-sparse (keyword-like) retrievers, relevant to part codes | `#mslideon` |
| Cohere Embed v4 | One vector per page image or text, listed on Azure Foundry; conflict: Azure lists French, Oracle says image input is English only | `b-visual-retrieval.md` section 3 |

All are status **watch** in the web; none is needed while the current model works (`diy-vs-azure-stack.md` section 5: sentence-transformers / BGE "Not needed").

## Go deeper
- ColPali: https://arxiv.org/abs/2407.01449 . ViDoRe V3: https://arxiv.org/abs/2601.08620 (both in `d1-awesome-papers.md`)
- Nemotron retriever post: https://huggingface.co/blog/nvidia/nemotron-retriever-world-class-agentic-retrieval

## Related
[[vector-database]] · [[hybrid-search]] · [[multimodal-retrieval]] · [[rag]] · [[chunking]] · [[rag-field-map]] · [[greg-interest-map]]
