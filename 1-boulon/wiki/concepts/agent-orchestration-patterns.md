---
title: Agent orchestration patterns
type: concept
status: open
updated: 2026-11-04
sources: [../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../docs/rag-plan-reference.md]
---

**Bottom line:** four patterns recur in the sources: an orchestrator that routes to specialists, asynchronous subagents the parent does not wait on, ambient agents that wake on events, and adaptive routing that skips the heavy agent path for easy questions. BOULON uses none of them yet; the first is the candidate for Phase 2.

Plain words: "orchestration" is deciding which agent or tool does which part of a job. All four patterns below were read in the 2026-11-04 morning brief (research agents opened each link); treat them as news items, not tested practice.

## The patterns
| Pattern | Plain meaning | Source | In BOULON |
|---|---|---|---|
| Orchestrator + specialists | One agent classifies a request and routes it to narrow agents; it owns out-of-scope and fallback | [Microsoft Learn reference architecture](https://learn.microsoft.com/en-us/power-platform/architecture/reference-architectures/modernize-hr-support), 2026-10-13 | Candidate for Phase 1 + Phase 2 ([[copilot-studio-orchestration]]) |
| Asynchronous subagent | A worker the parent starts, checks or cancels without waiting | [LangChain](https://langchain.com/blog/managed-deep-agents-browser-use-and-asynchronous-subagents), 2026-10-29 | Used by Claude in this workspace for research ([[claude-operating-model]]) |
| Ambient agent | Triggered by events or a schedule, not a message | [LangChain](https://langchain.com/blog/components-building-company-harness), 2026-10-24 | Not used by the chat agent; scheduled routines exist on the Claude side ([[agent-harness]]) |
| Adaptive routing (agent gating) | A small classifier decides whether a question needs the heavy agent path | [arXiv 2610.36444](https://arxiv.org/abs/2610.36444) (RouteDRAG), 2026-10-27 | Idea only ([[agentic-retrieval-azure]]) |

## Why it matters for BOULON
- The brief's own reading: the Microsoft shape suits Phase 1 (manuals) and Phase 2 (diagnosis) as separate agents ([briefing](../../../4-learning/interests/briefs/2026-11-04-briefing.html)). The 2026-09-22 plan already named "connected agent" as the building block for specialists ([rag-plan-reference](../../docs/rag-plan-reference.md) section 2).
- RouteDRAG argues against multi-step retrieval on every question; it fits the cost question in [[agentic-retrieval-azure]].
- On-behalf-of (calls run with the signed-in user's own permissions) is part of the Microsoft pattern ([lexicon](../../../4-learning/interests/lexicon-ai-ml.md)).

## Related
[[agent-architecture-map]] · [[agent-harness]] · [[agent-skills]] · [[mcp]] · [[copilot-studio-orchestration]] · [[azure-ai-stack-map]] · [[greg-interest-map]] · [[copilot-studio-agent]] · [[phase-2-architecture]] · [[rebuild-v2-pipeline]] · [[boulon]]
