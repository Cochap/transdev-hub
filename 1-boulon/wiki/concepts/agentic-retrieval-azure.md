---
title: Agentic retrieval in Azure AI Search (knowledge bases)
type: concept
status: open
updated: 2026-11-04
sources: [../../docs/research-2026-10-07/c-copilot-studio-integration.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../4-learning/interests/lexicon-ai-ml.md]
---

**Bottom line:** agentic retrieval is Azure's feature where an AI model plans the search for a hard question. BOULON does not use it. It improves answers on multi-part questions but does not cut ingestion cost, and its LLM-planning part is still preview.

Plain words: normal search sends the question once. Agentic retrieval has a model split a hard question into sub-questions, search them in parallel, re-rank, and return passages with references. General field idea: [[agentic-retrieval]].

## What the sources say
- A **knowledge base** exposes an MCP endpoint (tool `knowledge_base_retrieve`). It reads the same index, so the PDF-reading bill is unchanged. GA REST version 2026-04-01 covers minimal, non-LLM retrieval; LLM planning is preview. Billing: per token for ranking plus Azure OpenAI tokens for planning. Microsoft's own illustration: about USD 4.32 for 2,000 retrievals (an example, not a quote). Verified 2026-10-07 ([c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) section 4).
- **Retrieval reasoning effort** (none, low, medium, auto): how much LLM planning is spent per question. "Auto" does a light pass first and plans with an LLM only when grounding is weak. The same release adds per-source reranking, streamed results and citation URLs. Read in the 2026-11-04 brief from Microsoft Learn (what's new, Aug 2026; older than the brief window) ([briefing](../../../4-learning/interests/briefs/2026-11-04-briefing.html), [lexicon](../../../4-learning/interests/lexicon-ai-ml.md)).
- Unknown and decisive: whether Copilot Studio shows clickable citations for a tool or MCP result ([[mcp]]).
- Option 5 in the 2026-10-07 table: verdict "Later" (preview blocks production) ([c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) section 8).

## Related idea: adaptive routing
RouteDRAG (arXiv 2610.36444, per the brief) argues for sending easy questions down a short path and only hard ones through the agent loop ([[agent-orchestration-patterns]]). Cost angle: a tool call costs 5 Copilot credits versus about 2 for a generative answer (Verified, same research file) ([[azure-cost-figures]]).

## For BOULON
Candidate lever for the school-bus MVP and for Phase 2 questions that combine manuals and MIR history ([[phase-2-architecture]]). Test only after the v2 index works ([[rebuild-v2-pipeline]]).

## Related
[[azure-ai-stack-map]] · [[azure-search-indexer-and-skillset]] · [[semantic-reranker]] · [[copilot-studio-orchestration]] · [[rag-field-map]] · [[greg-interest-map]] · [[azure-search-index]] · [[copilot-studio-agent]] · [[boulon]]
