---
title: RAG and retrieval field map
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/rag-radar/knowledge-web.md, ../../docs/rag-radar/runs/2026-11-02.md, ../../docs/research-2026-10-07/b-visual-retrieval.md, ../../docs/research-2026-10-07/a-cheaper-ingestion.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html]
---

**Bottom line:** the whole retrieval field as one tree, with each branch pointing to its page and marked "BOULON uses today" or "could use". Today BOULON uses a small, solid core: chunks, text embeddings, hybrid search with the semantic re-ranker, cited answers, abstention and a golden set. Everything else is watch or later.

This map is built from what Greg has read (the RAG radar knowledge web, the 2026-10-07 and 2026-10-15 research, the lexicon and the 2026-11-04 brief), not from general knowledge. It is branch 1 ("RAG logic") of [[greg-interest-map]], and the vocabulary lives in `4-learning/interests/lexicon-ai-ml.md`.

## The tree (one pipeline, left to right)
```
RAG  [[rag]]  = find passages in your documents, then answer only from them
|
+-- 1. GET THE TEXT IN
|     +-- Document parsing and OCR ......... [[document-parsing-and-ocr]]
|     +-- Chunking ......................... [[chunking]]
|
+-- 2. STORE AND FIND
|     +-- Embeddings ....................... [[embeddings]]
|     +-- Vector database .................. [[vector-database]]
|     +-- Hybrid search (keyword + meaning)  [[hybrid-search]]
|     +-- Reranking ........................ [[semantic-reranker]]
|     +-- Page-image retrieval ............. [[multimodal-retrieval]]
|     +-- Knowledge graph (GraphRAG) ....... [[graphrag]]
|
+-- 3. DECIDE WHAT THE MODEL SEES
|     +-- Retrieval-selection gap (top-k) .. [[retrieval-selection-gap]]
|     +-- Context engineering .............. [[context-engineering]]
|     +-- Agentic retrieval (planning, routing) [[agentic-retrieval]]
|
+-- 4. ANSWER SAFELY
|     +-- Citations ........................ [[citation-projection]]
|     +-- Abstention ("don't guess") ....... [[abstention]]
|     +-- Local / self-hosted models ....... [[local-llm-serving]]
|
+-- 5. PROVE IT WORKS
      +-- Golden set ....................... [[golden-set]]
      +-- RAG evaluation ................... [[rag-evaluation]]
```

## Node by node: what BOULON does today vs could do
| Node | BOULON today | Could use (status in sources) | Source |
|---|---|---|---|
| [[document-parsing-and-ocr]] | Azure Layout skill; torque table flattened in the pilot; v2 uses markdown mode | Content Understanding skill (half the per-page price, to test first); Docling as fallback (**try**) | `a-cheaper-ingestion.md`; knowledge-web `#docling` |
| [[chunking]] | Wizard defaults; v2 splits by headings, 4,000-character cap, tables not split | Header-carrying chunks (Tessera idea), tested the RAGit way | `#tessera`, `#ragit`; [[rebuild-v2-pipeline]] |
| [[embeddings]] | `text-embedding-3-small`, 1536 dimensions | Nemotron, EmbeddingGemma 2 etc.: **watch**, not needed now | `diy-vs-azure-stack.md` section 5 |
| [[vector-database]] | Built into [[azure-search-index]] | Qdrant, Milvus, pgvector: "Not needed" | `diy-vs-azure-stack.md` |
| [[hybrid-search]] | Keyword + vector + semantic ranker: 41/41 vs hybrid 35/41 vs keyword 30/41 | Standard ranker plan (about CAD 1 a month); Cohere Rerank 5 (reference only) | `diy-vs-azure-stack.md`; `#cohere-rerank-5` |
| [[multimodal-retrieval]] | Picture descriptions embedded as text | Page-image search offline test only; "Do not do now" | `00-combined-recommendation.md` |
| [[graphrag]] | No (judged too costly) | Phase 2 fault-part links "someday"; learning only | `#graphrag`; [[rag]] |
| [[retrieval-selection-gap]] | Not tested yet; agent's top-k not stated in sources | Cap-retrieved-chunks test (3, 5, 8); test top-k and reranker before blaming the index | `d1-awesome-papers.md`; brief 2026-11-04 |
| [[context-engineering]] | Instructions plus retrieved chunks via Copilot Studio (inferred) | Offloading, untrusted-text rule (thin source) | brief 2026-11-04 |
| [[agentic-retrieval]] | Single retrieval step | Azure reasoning effort "auto"; adaptive routing; abstention must be tracked | brief 2026-11-04; `#declinecraft` |
| [[citation-projection]] | Index name shown (pilot); v2 fixes title and URL | RAGFlow numbered citations (reference) | [[rebuild-v2-pipeline]]; `#ragflow` |
| [[abstention]] | Settings plus instructions; SAFE-ABSTAIN tests | Evidence-sufficiency check (RAGFlow rc3); calibrated reranker cut-off | `#ragflow`, `#cohere-rerank-5` |
| [[local-llm-serving]] | No (GPT-4.1 via Copilot Studio) | Granite Switch, vLLM, llama.cpp: learning; DIY stack rejected 2026-10-15 | `diy-vs-azure-stack.md` section 6 |
| [[golden-set]] | Golden v1, 41 usable questions | Add unanswerable and French/Spanish questions; page-level scoring | [[boulon-testing]]; `d1-awesome-papers.md` |
| [[rag-evaluation]] | Hand-scored agent baseline; Evaluations marks abstentions Fail | Custom graders (**try**), numeric check on torque values, separate abstention rate | `runs/2026-11-02.md` Top 5 |

## Five ideas the sources repeat (read these first)
1. **Tables are the common weak spot** in every benchmark and in BOULON's torque error ([[torque-tables]], [[document-parsing-and-ocr]]).
2. **A text reranker is the cheapest big gain** ([[hybrid-search]]); but every ranking or orchestration upgrade can quietly erode the honest "I don't know" ([[agentic-retrieval]], [[abstention]]).
3. **Retrieval and selection are two different failures** ([[retrieval-selection-gap]]).
4. **Test retrieval apart from generation, and score the cited page, not only the value** ([[rag-evaluation]], [[golden-set]]).
5. **Self-hosting is not cheaper** for BOULON and loses the native Copilot Studio citations ([[local-llm-serving]]).

## What is not covered here
Azure AI Search feature pages, Copilot Studio, agent orchestration, agent skills and MCP are separate topics (branch 3 of [[greg-interest-map]]). Terms the sources never explain are not defined here.

## Where the live sources are
- Weekly map of tools and papers, updated by the `rag-radar` routine: `1-boulon/docs/rag-radar/knowledge-web.md` (Leaders table at the top), newest run in `1-boulon/docs/rag-radar/runs/`.
- Research reports: `1-boulon/docs/research-2026-10-07/`, `1-boulon/docs/research-2026-10-15/diy-vs-azure-stack.md`.
- Daily news and new terms: `4-learning/interests/briefs/`.

## Go deeper
- Awesome-Multimodal-RAG list (30 papers read): https://github.com/JarvisUSTC/Awesome-Multimodal-RAG
- kapa.ai on retrieval vs selection: https://www.kapa.ai/blog/retrieval-bottleneck
- Azure AI Search what's new: https://learn.microsoft.com/azure/search/whats-new

## Related
[[rag]] · [[greg-interest-map]] · [[boulon]] · [[phase-1-manuals-pilot]] · [[phase-2-architecture]] · [[copilot-studio-agent]] · [[azure-search-index]] · [[review-findings-rag-pipeline]]
