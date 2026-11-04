---
title: Greg's interest map
type: concept
status: current
updated: 2026-11-04
sources: [../../../4-learning/interests/interest-map.md, ../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/lexicon-project-management.md]
---

**Bottom line:** the six areas [[greg-riley]] wants to learn deeply, kept as a growing tree in `4-learning/interests/interest-map.md`. The `morning-brief` skill filters news through it and writes new terms and branches back after every run.

## Branches (2026-11-04, Greg's words)
1. **RAG logic**: retrieval vs selection, agentic routing, evaluation. Feeds [[boulon]] and the weekly RAG radar.
2. **AI/ML taxonomy and lexicon**: one shared vocabulary file (`lexicon-ai-ml.md`).
3. **Orchestration, hierarchy, architecture, infrastructure**: multi-agent patterns such as an orchestrator plus specialists in the [[copilot-studio-agent]], agent harness, skills.
4. **Project management and continuous improvement**: beginner; charter, scope, Lean tools (`lexicon-project-management.md`). First need: the DIX30 project charter.
5. **Community tools watch**: GitHub trending and X every morning; skill repos for the workspace and [[azure-search-index]] work.
6. **Hobbies**: motion design and Claude's creative capability.

**Excluded:** transit and school-bus maintenance industry news (Greg, 2026-11-04).

## Field maps (where each branch lives in the wiki)
- Branch 1 RAG, and the whole retrieval field: [[rag-field-map]] (embeddings, hybrid search, multimodal retrieval, parsing, GraphRAG, agentic retrieval, selection gap, evaluation, local models)
- Branches 2-3 vocabulary and architecture: [[agent-architecture-map]] (orchestration patterns, harness, Agent Skills, MCP) and [[azure-ai-stack-map]] (indexer, skillset, vectorization, projections, Copilot Studio orchestration)

## How it grows
- A `UserPromptSubmit` hook (`.claude/hooks/interest-capture.js`) catches any stated interest and makes Claude file it the same turn.
- Each brief adds lexicon terms and new sub-branches.

## Related
[[greg-riley]] · [[learning-research-prd-workstream]] · [[boulon]] · [[rag-field-map]] · [[azure-ai-stack-map]] · [[agent-architecture-map]]
