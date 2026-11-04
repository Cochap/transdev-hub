---
title: GraphRAG (knowledge-graph retrieval)
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/rag-radar/knowledge-web.md, ../../docs/rag-radar/runs/2026-11-02.md, ../../docs/rag-plan-reference.md]
---

**Bottom line:** GraphRAG builds a map of linked facts from the documents and answers over that map; BOULON deliberately did not choose it (too costly to build), and the sources only tag it "learning only", with a possible later use for Phase 2 fault-part-procedure links. Evidence in the sources is thin.

## Plain definition (as the sources define it)
- "Microsoft's toolkit that builds a knowledge graph from documents and answers over it" (knowledge web `#graphrag`, `1-boulon/docs/rag-radar/knowledge-web.md`).
- GEMS-RAG: "graph-grounded RAG that splits figures and tables of an engineering standard (the US traffic-sign manual) into linked visual entities" (`#gems-rag`; arXiv 2610.33277, abstract gives no numbers).

## How it shows up in BOULON
- Not chosen in Phase 1: "a knowledge graph (too costly to build)" ([[rag]], citing `1-boulon/docs/rag-plan-reference.md`).
- Possible fit, per the radar: "Phase 2 fault-part-procedure links someday"; cost is "Python plus LLM indexing cost" (`#graphrag`, BOULON fit line). Phase 2 design: [[phase-2-architecture]], [[phase-2-cmms-diagnosis]].
- Latest release seen: Microsoft GraphRAG v3.3.0, a small SQLite performance fix (8 Oct, year inferred); a blog claim of incremental indexing "was not in the primary notes, so dropped" (`#graphrag`).
- A YouTube lead, "RAG Needs a Map: Using GraphRAG to Retrieve Connected Context" (AI Engineer / Neo4j, 2026-10-11, 12,157 views), is listed as "background for Phase 2" but is **not confirmed** (`runs/2026-11-02.md`, last30days leads). Treat as unverified.

## Tools in the knowledge web
Microsoft GraphRAG `#graphrag` (status watch); GEMS-RAG `#gems-rag`; RouteDRAG `#routedrag` is related (routing across pages, tables, figures).

## Go deeper
- GraphRAG releases: https://github.com/microsoft/graphrag/releases
- GEMS-RAG: https://arxiv.org/abs/2610.33277

## Related
[[agentic-retrieval]] · [[multimodal-retrieval]] · [[vector-database]] · [[rag]] · [[rag-field-map]] · [[greg-interest-map]]
