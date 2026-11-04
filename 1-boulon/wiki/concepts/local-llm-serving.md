---
title: Local LLM serving (self-hosted models)
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/rag-radar/knowledge-web.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../docs/research-2026-10-07/a-cheaper-ingestion.md]
---

**Bottom line:** running the answer model (or embedding and parsing models) on your own machines; the 2026-10-15 comparison found a DIY stack gives no saving and loses the native Copilot Studio citation link, so BOULON keeps Azure and treats self-hosting as learning and as a fallback.

## Plain definition (as the sources define it)
- A **local LLM** runs on your own hardware; a **serving engine** is the program that loads it and answers requests. llama.cpp: "the main engine for running quantized (shrunk) models on CPUs and consumer GPUs"; vLLM: "production inference server for GPUs"; SGLang: "the main alternative to vLLM"; Ollama: "the easiest local model runner" (`1-boulon/docs/rag-radar/knowledge-web.md`, section D).
- Related words from the sources: *Model weights, Hugging Face* = "the downloaded files of an AI model, and the website that hosts them"; *VM* = "a rented virtual computer" (`diy-vs-azure-stack.md`).

## How it shows up in BOULON
- Today the answer model is GPT-4.1 chosen inside [[copilot-studio-agent]]; the Vectara leaderboard is "a model-choice signal only; BOULON's model is chosen by Copilot Studio" (`#vectara-hhem-leaderboard`).
- Option B (DIY on a rented VM: Qdrant or pgvector, an open reranker, an MCP wrapper) vs option A (Azure AI Search plus Copilot Studio), 2026-10-15: hosting about the same (about CAD 104 vs 103-202 a month), B adds about CAD 34 a month of Copilot credits and unpriced staff time; security clearly better on A; "A is a built-in knowledge source with manual-and-page citations"; whether a tool result shows clickable citations is "Unknown, and decisive". Recommendation: "Keep A. Do not build B" (`diy-vs-azure-stack.md` sections 0, 3, 6). See [[azure-search-index]], [[vector-database]].
- Self-hosted parsing is the closest realistic use: Docling on a rented GPU about USD 15 for the library, olmOCR about USD 23, run once and deleted, as defended to IT in `a-cheaper-ingestion.md` section 7 ([[document-parsing-and-ocr]]). Installs on Greg's PC need a ticket ([[company-it-constraints]]).
- Model weights from Hugging Face did not load from this PC in the 2026-10-07 test (`diy-vs-azure-stack.md`, security table).

## Models and servers in the knowledge web (all "learning only", status watch)
| Item | Note | Anchor |
|---|---|---|
| Granite Switch 4.1 (IBM) | Leader in the category: Apache 2.0, 131,072-token context, 12 languages incl. French, switchable adapters (RAG adapters not on this checkpoint) | `#granite-switch` |
| Mistral Large 4 | Open weights, modified-MIT licence, about 49B active, 1M context; datacentre-only (8-GPU examples) | `#mistral-large-4` |
| LFM3 (Liquid AI) | About 2B, about 1 GB at 4-bit; aimed at agents, not French grounded answers | `#lfm3` |
| llama.cpp v0.8.0, vLLM v0.33.0, SGLang v0.5.22, Ollama v0.40.x | Serving engines | `#llama-cpp`, `#vllm`, `#sglang`, `#ollama` |
| AnythingLLM, Open WebUI, LibreChat, Onyx, Dify, RAGFlow | Self-hosted chat apps wrapping a model plus RAG | `#anythingllm`, `#open-webui`, `#librechat`, `#onyx`, `#dify`, `#ragflow` |

The run found "no French grounded-QA result for any model" (`runs/2026-11-02.md`, rejected list D).

## Go deeper
- Granite Switch: https://huggingface.co/blog/ibm-granite/granite-switch-4-1
- llama.cpp: https://github.com/ggml-org/llama.cpp/releases/tag/v0.8.0 . vLLM: https://github.com/vllm-project/vllm/releases

## Related
[[vector-database]] · [[document-parsing-and-ocr]] · [[embeddings]] · [[rag]] · [[rag-field-map]] · [[greg-interest-map]]
