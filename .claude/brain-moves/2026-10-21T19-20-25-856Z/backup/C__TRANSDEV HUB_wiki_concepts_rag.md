---
title: RAG (retrieval-augmented generation)
type: concept
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/rag-plan-reference.md, ../../1-boulon/docs/explainer-for-henri.md]
---

**Plain words:** an "open-book exam". The AI first searches the manuals for the passages that matter, then writes its answer only from those passages and cites them. Keyword search is Ctrl+F; the semantic re-ranker adds meaning (finds a French procedure from an English question). This is how [[boulon]] stays grounded and can say "I don't have that". Details: [[azure-search-index]], [[golden-set]].

Contrast: Karpathy's LLM Wiki (this wiki) compiles knowledge once in advance; RAG re-derives it per question. Both are used: RAG for 3,000 manuals, the wiki for Greg's business knowledge.

## Related
[[copilot-studio-agent]]

## Added 2026-09-30 (how BOULON got here, verified facts)
- Why RAG: the SharePoint-era agent returned internet sellers, wrong parts files and wrong absences (V0 to V2); filtering after search cannot recover a chunk that was never retrieved ([[project-history]], [[test-ledger]]).
- Not chosen: a knowledge graph (too costly to build) and fine-tuning (poor for exact numbers; redo every revision) ([[rag-plan-reference]]).
- Nothing removes hallucination completely; the design target is cited answers or an honest refusal ([[abstention]]).
- Building blocks explained for Henri: [[explainer-for-henri]]. Key parts: [[chunking]], [[semantic-reranker]], [[citation-projection]], [[torque-tables]].
