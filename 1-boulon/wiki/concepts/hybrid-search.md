---
title: Hybrid search and reranking
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../docs/rag-radar/knowledge-web.md, ../../docs/test-ledger.md, ../../../4-learning/interests/lexicon-ai-ml.md]
---

**Bottom line:** hybrid search runs keyword and meaning-based search together and merges them; on BOULON's pilot the re-ranker added on top is the only mode that scored 41/41 on the golden set.

## Plain definition (as the sources define it)
- **Hybrid search** = "keyword plus meaning". Azure "runs keyword and vector search in parallel and merges with RRF"; RRF = "the method that merges keyword and meaning results" (`1-boulon/docs/research-2026-10-15/diy-vs-azure-stack.md`, sections 4-5, source [S5]).
- **Reranker** = "a second pass that re-sorts the first search results"; a cross-encoder reads the question and the passage together (`diy-vs-azure-stack.md`; lexicon `4-learning/interests/lexicon-ai-ml.md`).
- **Learned-sparse retrieval** = "keyword-like search that learns related terms" (knowledge web node `mslideon`).

## How it shows up in BOULON
- [[azure-search-index]] already does keyword plus vector plus a semantic re-ranker; the ranker re-scores the top 50 results with Microsoft's multilingual models, reading up to 2,048 tokens each (`diy-vs-azure-stack.md` section 4, source [S2]). Details and the open question (does Copilot Studio use it?): [[semantic-reranker]].
- Measured on golden v1 (41 questions, right passage in the top 5): semantic 41/41, hybrid 35/41, keyword 30/41 in the 2026-10-06 run (`diy-vs-azure-stack.md` section 4, citing `1-boulon/tests/results/golden_2026-10-06_1342.md`). The wiki pages [[golden-set]] and [[semantic-reranker]] record hybrid 36/41 for the 2026-09-24 run; the one-question gap is unresolved. Pilot index only (23 manuals), not yet shown at full-library scale.
- Real risk: the free semantic-ranker plan stops after 1,000 requests a month; the Standard plan costs about CAD 1.4166 per 1,000 (about CAD 1 a month at BOULON's volume) (`diy-vs-azure-stack.md` sections 4 and 6). Tier context: [[azure-search-tiers]].
- Why hybrid matters for BOULON: part codes and fault terms are exact strings where keyword beats vectors. A community checklist says to use "BM25 plus embeddings plus reranker for exact codes" (knowledge web node `dev-5-rag-mistakes`).
- Papers: a text reranker was "the cheapest big gain" (+13.2 nDCG@10 in ViDoRe V3); a visual reranker added only +0.2 (`1-boulon/docs/research-2026-10-07/d1-awesome-papers.md`, "Reading across the papers", point 3).
- Caution: adding query rewriting plus reranking lowered the rate of correct "I don't know" for all 12 models tested in DeclineCraft, so re-check abstention after any ranker change ([[abstention]], [[rag-evaluation]]).

## Tools in the knowledge web
(`1-boulon/docs/rag-radar/knowledge-web.md`)
- Rerankers: Cohere Rerank 5 Pro/Fast (hosted; French RCP-nDCG@10 90.5 / 88.6, vendor-claimed; calibrated scores could give a clean "nothing relevant" cut-off) `#cohere-rerank-5`; NVIDIA Nemotron 3.5 Rerank 8B (60.49 vs 59.17 for Qwen-3-VL-Reranker-8B) `#nemotron-3-5-retriever`. Both **watch**; third-party API use needs Greg's approval.
- One-store hybrid: Qdrant v1.20.0 BM25 `#qdrant`; Milvus Function Chain `#milvus`; Haystack v3.3.0 in-memory BM25 `#haystack`; mSlideOn as the sparse half `#mslideon`.
- Dify keeps its rerank setting in hybrid search (v1.18.0) `#dify`; Open WebUI v0.12.5 allows negative reranker thresholds `#open-webui`.

## Go deeper
- Hybrid search overview: https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview
- Semantic ranking overview: https://learn.microsoft.com/en-us/azure/search/semantic-search-overview
- Cohere Rerank 5: https://cohere.com/blog/rerank-5

## Related
[[semantic-reranker]] · [[embeddings]] · [[vector-database]] · [[retrieval-selection-gap]] · [[golden-set]] · [[rag-field-map]] · [[greg-interest-map]]
