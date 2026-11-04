---
title: Azure AI stack map (hub)
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/index-facts.md, ../../docs/rag-plan-reference.md, ../../rebuild/v2/README.md, ../../docs/research-2026-10-07/c-copilot-studio-integration.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../docs/azure-tiers-verified-2026-09-24.md, ../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html]
---

**Bottom line:** BOULON uses a small slice of the Microsoft AI stack today (a search index with an indexer, a skillset, vectors and the semantic ranker, read by a Copilot Studio agent). Most of the rest (agentic retrieval, multi-agent, MCP) is "available", not used. This page is the tree; each node points to its page.

Plain words: this is the map of every Microsoft tool in the chain from "a PDF in storage" to "a mechanic reads an answer in chat". "Used today" means the source files say BOULON runs it; "v2 draft" means designed but not deployed ([[rebuild-v2-pipeline]]); "available" means it exists at Microsoft but BOULON does not use it. Field context: [[rag-field-map]]. Your interest area: [[greg-interest-map]] (branches 1 and 3).

## The tree
```
Blob Storage (the PDFs)                                                      used today
 -> Azure AI Search (the search service; Free today, Basic requested)       used today
     -> index: the searchable chunks + fields                                used today
     -> indexer: the job that runs the pipeline                              used today
     -> skillset: the AI reading steps                                       used today
          -> Document Intelligence Layout skill (reads PDFs)                 used today (text mode); v2 draft: markdown mode
          -> Split skill (cuts long sections)                                v2 draft
          -> embedding skill + image description (chat) skill                used today
     -> integrated vectorization (text to vectors inside the service)       used today (Foundry text vectorizer)
     -> index projections (one searchable document per chunk)               v2 draft; chunk-per-document shape in pilot
     -> hybrid search, vector search                                         used today
     -> semantic ranker (re-sort by meaning)                                 used today
     -> agentic retrieval / knowledge bases                                  available (LLM planning is preview)
Azure OpenAI / Foundry models                                                used today (GPT-4.1 replies; text-embedding-3-small)
     -> Foundry IQ (managed knowledge layer)                                 available (preview)
Copilot Studio (the chat agent)                                              used today
     -> knowledge source = the Azure AI Search index                         used today
     -> topics (for example the Secours fallback topic)                      used today
     -> generative orchestration (AI picks tools and sources)                unverified for the live agent; required for MCP
     -> tools, MCP servers                                                   available
     -> multi-agent: orchestrator + specialists (connected agents)           available; no connected agents today
Direct Line (channel for scripted tests)                                     used for tests; blocked by the sign-in setting
```

## Node to page
| Node | Page | Status | Source |
|---|---|---|---|
| Index, fields, semantic config | [[azure-search-index]] | used today | [index-facts](../../docs/index-facts.md) |
| Indexer, skillset, datasource | [[azure-search-indexer-and-skillset]] | used today / v2 draft | [v2 README](../../rebuild/v2/README.md) |
| Integrated vectorization | [[integrated-vectorization]] | used today | [index-facts](../../docs/index-facts.md) |
| Index projections | [[index-projections]] | v2 draft | [skill](../../../.claude/skills/azure-search-index-projection-parent-fields/SKILL.md) |
| Semantic ranker | [[semantic-reranker]] | used today | [azure-tiers-verified](../../docs/azure-tiers-verified-2026-09-24.md) |
| Agentic retrieval, knowledge bases | [[agentic-retrieval-azure]] | available | [c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) |
| Copilot Studio agent | [[copilot-studio-agent]] | used today | [continuity-log](../../docs/continuity-log.md) |
| Generative orchestration, multi-agent | [[copilot-studio-orchestration]] | available | [briefing 2026-11-04](../../../4-learning/interests/briefs/2026-11-04-briefing.html) |
| MCP | [[mcp]] | available | [c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) |
| Tiers, limits, cost | [[azure-search-tiers]], [[tier-limits]], [[azure-cost-figures]] | used today | [azure-tiers-verified](../../docs/azure-tiers-verified-2026-09-24.md) |
| Where each resource lives | [[azure-resources-inventory]] | used today | [azure-region-check](../../docs/azure-region-check-2026-09-24.md) |
| Testing the agent (Direct Line) | [[boulon-testing]] | used for tests | [continuity-log](../../docs/continuity-log.md) |

## How BOULON uses it, in one line each
- Phase 1: Copilot Studio agent -> one Azure AI Search index -> cited answers ([[phase-1-manuals-pilot]], [[rag]]).
- Phase 2: a second agent and a second index on the same Basic service ([[phase-2-architecture]]). Today's research already points to an orchestrator-plus-specialists shape ([[agent-orchestration-patterns]]).

## Related
[[agent-architecture-map]] · [[greg-interest-map]] · [[rag-field-map]] · [[agentic-retrieval]] · [[hybrid-search]] · [[embeddings]] · [[multimodal-retrieval]] · [[boulon]] · [[azure-search-index]] · [[copilot-studio-agent]] · [[rebuild-v2-pipeline]] · [[phase-2-architecture]]
