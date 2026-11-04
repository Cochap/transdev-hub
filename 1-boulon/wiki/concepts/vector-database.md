---
title: Vector database
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/rag-radar/knowledge-web.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../docs/research-2026-10-07/b-visual-retrieval.md]
---

**Bottom line:** a vector database stores embeddings and finds the closest ones fast; BOULON already has one built into Azure AI Search, and the 2026-10-15 comparison concluded that adding Qdrant, Chroma or pgvector is "Not needed".

## Plain definition
The place that stores the embedding lists ([[embeddings]]) and answers "which stored chunks are closest in meaning to this question?". The knowledge web describes Qdrant, Milvus and Weaviate as "open-source vector database" and LanceDB as an "embedded vector database (a library, no server)" (`1-boulon/docs/rag-radar/knowledge-web.md`, section C).

## How it shows up in BOULON
- The vector store is the vector field of [[azure-search-index]] (HNSW, cosine). Azure also offers pgvector through PostgreSQL, "so no reason to self-host it" (`diy-vs-azure-stack.md` section 5).
- Limits that matter: Basic gives 5 GB of vector memory per partition, up to 3 partitions (15 GB max); the index matches one vector per field and has no multi-vector matching (MaxSim) (`b-visual-retrieval.md` section 1, Learn limits page 2026-09-25). See [[azure-search-tiers]], [[tier-limits]].
- Qdrant ships with login and TLS off by default; its own page says self-deployed instances are not secure until both are turned on (https://qdrant.tech/documentation/security/, quoted in `diy-vs-azure-stack.md` section 2). Part of why option B (DIY on a VM) lost.
- A separate vector database would only be needed for page-image models such as Nemotron ColEmbed (0.5 to 1.7 TB for the library, "needs Qdrant/Vespa") ([[multimodal-retrieval]]).

## Tools in the knowledge web
| Tool | Latest note in the web | Anchor |
|---|---|---|
| Qdrant | v1.20.0 adds BM25 on its full-text index (keyword plus vector in one store), compressed vectors | `#qdrant` |
| Milvus | 3.0.3 adds Function Chain for hybrid search; v3.0.5 notes not yet written | `#milvus` |
| Weaviate | patch releases only | `#weaviate` |
| LanceDB | v0.41.0 many breaking changes; `trust_remote_code` off by default | `#lancedb` |

All status **watch**, effort "IT ticket (Docker)" except LanceDB (Python). Chroma, pgvector and OpenSearch had "no verified notes" in the 2026-11-02 run (`runs/2026-11-02.md`).

## Go deeper
- Qdrant security: https://qdrant.tech/documentation/security/
- pgvector on Azure: https://learn.microsoft.com/en-us/azure/postgresql/extensions/how-to-use-pgvector

## Related
[[embeddings]] · [[hybrid-search]] · [[local-llm-serving]] · [[azure-search-index]] · [[rag-field-map]] · [[greg-interest-map]]
