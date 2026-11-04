---
title: Agent architecture map (hub)
type: concept
status: current
updated: 2026-11-04
sources: [../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../docs/research-2026-10-07/c-copilot-studio-integration.md]
---

**Bottom line:** the field of "how agents are built" in one tree: patterns (who does what), harness (what surrounds the model), skills (loadable instructions), and tool protocol (MCP). Each node has a page; BOULON's chat agent is at the simplest end of every branch.

Plain words: this is branch 3 of [[greg-interest-map]] (orchestration, hierarchy, architecture, infrastructure). The Microsoft-specific tree is [[azure-ai-stack-map]]. Definitions come from the vault's own lexicon and the 2026-11-04 brief, not from outside guesses.

## The tree
```
Agent architecture
 -> Orchestration patterns  [[agent-orchestration-patterns]]
      orchestrator + specialists | async subagents | ambient agents | adaptive routing
      Microsoft implementation: [[copilot-studio-orchestration]]
 -> Harness  [[agent-harness]]
      channel | identity | memory | sandbox | schedules | context engineering
 -> Skills  [[agent-skills]]
      SKILL.md folders loaded on demand; Claude's side: [[skills-catalog]]
 -> Tools protocol  [[mcp]]
      Copilot Studio tools, Azure knowledge-base endpoint
 -> Retrieval as a tool  [[agentic-retrieval-azure]], [[agentic-retrieval]]
```

## Status in BOULON
| Node | BOULON today | Source |
|---|---|---|
| Orchestrator + specialists | not used; candidate for Phase 2 | [[copilot-studio-orchestration]] |
| Harness | minimal (instructions, one knowledge source, fallback topic) | [[copilot-studio-agent]] |
| Skills | used on the Claude side (nine project skills) | [[skills-catalog]] |
| MCP | not used | [[mcp]] |

## Related
[[azure-ai-stack-map]] · [[rag-field-map]] · [[greg-interest-map]] · [[claude-operating-model]] · [[copilot-studio-agent]] · [[phase-2-architecture]] · [[rebuild-v2-pipeline]] · [[boulon]]
