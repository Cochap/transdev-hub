---
title: Copilot Studio orchestration (generative orchestration, multi-agent, fallback)
type: concept
status: open
updated: 2026-11-04
sources: [../../docs/rag-plan-reference.md, ../../docs/research-2026-10-07/c-copilot-studio-integration.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../4-learning/interests/lexicon-ai-ml.md, ../../docs/continuity-log.md]
---

**Bottom line:** Copilot Studio can run one agent that answers from its knowledge, or an orchestrator agent that routes to narrow specialist agents. BOULON runs the first today (one agent, one knowledge source, no connected agents); Microsoft's own blueprint for the second is the likely shape for Phase 1 plus Phase 2.

Plain words: **generative orchestration** is the Copilot setting where the AI decides which tool, knowledge source or helper agent answers each message, instead of a fixed script. A **topic** is one scripted skill inside the agent. A **connected agent** is a specialist mini-assistant the main agent calls and folds into its reply ([[rag-plan-reference]] glossary). Where this sits: [[azure-ai-stack-map]]; the general field is [[agent-orchestration-patterns]].

## Building blocks (from the 2026-09-22 plan)
Agent, topic, knowledge source, connected agent. Connecting Azure AI Search needs no hand-built topic: "Add knowledge, Azure AI Search" does it ([rag-plan-reference](../../docs/rag-plan-reference.md) section 2). Only one vector index can be added per agent (Verified, [c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) section 2).

## Orchestrator plus specialists
- Microsoft Learn reference architecture (2026-10-13, read in the 2026-11-04 brief): an orchestrator classifies the request, routes it to five specialists, owns out-of-scope and fallback rules, and actions run as the signed-in user ("on-behalf-of", calls use the user's own permissions) ([briefing](../../../4-learning/interests/briefs/2026-11-04-briefing.html); lexicon row "Orchestrator agent").
- Fit for BOULON: Phase 1 (manuals) and Phase 2 (diagnosis from MIR history) as separate agents. That matches decision D3, a new agent only for a new data source or new permissions, and the expert-only Phase 2 agent in [[phase-2-architecture]]. Note: the 2026-09-23 review had dropped "Phase 2 as specialist agents" in favour of one agent plus one index ([[review-findings-architecture]]); the 2026-09-24 plan then chose a separate expert agent. Treat the orchestrator idea as an option, not a decision.

## What it requires or costs (Verified 2026-10-07 unless noted)
- MCP tools need generative orchestration ([[mcp]]).
- Credits: generative answer 2, agent action 5, tenant graph grounding 10. Pack CAD 271.40 per 25,000 credits per month. A tool call adds 5 credits, so retrieval through a tool roughly triples per-question cost versus a knowledge source (Inferred) ([[azure-cost-figures]]).
- With "Allow ungrounded responses" off, an answer without an in-text citation is withheld.
- Whether the live BOULON agent has generative orchestration switched on is not stated in the files read (unverified).

## Fallback
The live agent has a Secours fallback topic with the fixed bilingual "I don't have that information" line ([[copilot-studio-agent]], [[abstention]]). In an orchestrator design the orchestrator would own this ([briefing](../../../4-learning/interests/briefs/2026-11-04-briefing.html)).

## Testing channel
Direct Line is blocked by the agent's sign-in setting (`IntegratedAuthenticationNotSupportedInChannel`); the agent sits in the Europe environment ([[boulon-testing]], `1-boulon/docs/continuity-log.md`, [[azure-resources-inventory]]).

## Related
[[azure-ai-stack-map]] · [[agent-architecture-map]] · [[agent-orchestration-patterns]] · [[agentic-retrieval-azure]] · [[agent-skills]] · [[greg-interest-map]] · [[copilot-studio-agent]] · [[phase-2-architecture]] · [[rebuild-v2-pipeline]] · [[boulon]]
