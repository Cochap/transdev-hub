# RAG radar — sources to scan
Starting list for the weekly scan (last 30 days). The routine adds good new outlets it finds and marks dead ones. A source being listed is not evidence; read the item itself.

## News outlets and newsletters
- The Decoder, VentureBeat AI, MarkTechPost, InfoQ (AI/ML), The New Stack
- Simon Willison's weblog, Latent Space, Ahead of AI (Sebastian Raschka), Interconnects, TLDR AI, The Batch (DeepLearning.AI)

## Community
- Reddit: r/LocalLLaMA, r/RAG, r/LangChain, r/selfhosted
- Hacker News (search via hn.algolia.com, filter by date)
- GitHub: trending (Python), release notes of tracked repos, "awesome-rag" style lists
- Hugging Face: trending models, daily papers, MTEB leaderboard (embeddings), blog

## Research
- arXiv cs.IR (information retrieval) and cs.CL (language), via arxiv.org listing or Hugging Face papers
- Papers with Code / benchmark pages for retrieval and RAG evaluation

## Vendor and project blogs (primary for their own releases)
- Orchestration: LlamaIndex, LangChain/LangGraph, Haystack (deepset), DSPy
- Vector DBs and search: Qdrant, Weaviate, Milvus, Chroma, pgvector, Elastic, Vespa, OpenSearch
- Parsing: Docling (IBM), Unstructured, Marker, MinerU
- Serving: Ollama, vLLM, llama.cpp, SGLang
- Chat apps: Open WebUI, AnythingLLM, RAGFlow, Dify, Kotaemon, LibreChat
- Microsoft (Azure AI Search, GraphRAG) for comparison with the current BOULON stack

## Added by runs
- 2026-10-29: Microsoft 365 Message Center mirror https://mc.merill.net (Copilot Studio feature posts with dates; found MC1518085)
- 2026-10-29: Microsoft Learn "What's new in Azure AI Search" https://learn.microsoft.com/azure/search/whats-new (monthly, dated page)
- 2026-10-29: PyPI release history pages and the GitHub releases API (`api.github.com/repos/<owner>/<repo>/releases`) give full dates with year; GitHub release web pages show day and month only
- 2026-10-29: arXiv listings sorted by announcement date (searches: tables, abstention, maintenance manuals, multilingual)
- 2026-10-29: Hugging Face org blogs (nvidia, ibm-granite, lightonai, LiquidAI) were primary sources for model releases
- 2026-10-29: DEV Community (dev.to) for production RAG post-mortems

## Not reachable or thin (2026-10-29)
- Reddit r/LocalLLaMA, r/RAG, r/selfhosted: not reached this run (search snapshots only, out of window). Try old.reddit.com or Hacker News Algolia next time.

## Added by runs (2026-11-02)
- Cohere blog https://cohere.com/blog (dated vendor posts with benchmark tables; found Rerank 5)
- Vectara hallucination leaderboard repo https://github.com/vectara/hallucination-leaderboard (dated commits)
- GitHub `https://github.com/<owner>/<repo>/releases.atom` feeds: full timestamps when the releases API is blocked
- Message Center mirror: search "Copilot Studio" posts by date; the 29-30 Oct batch held all the evaluation features

## Not reachable or thin (2026-11-02)
- old.reddit.com: blocked for helper agents; Reddit comes only via last30days
- YouTube lane (`youtube-month.py`): works (87 videos 2026-11-02) but runs past 200 s; do not cap it
