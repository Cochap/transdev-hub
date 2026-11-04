---
title: Agent harness
type: concept
status: open
updated: 2026-11-04
sources: [../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../CLAUDE.md]
---

**Bottom line:** the "harness" is everything around the model: channel, identity, memory, sandboxed code, schedules, tools and the prompt. LangChain's 2026-10-24 post lists five parts of a company harness and says identity and user experience were the hardest. This workspace is itself a small harness.

Plain words: the model is the engine; the harness is the car around it ([lexicon](../../../4-learning/interests/lexicon-ai-ml.md): "Everything around the model: prompts, tools, memory, identity, schedules").

## The five parts (LangChain, read in the 2026-11-04 brief)
Channel, identity, memory, sandboxed code, schedules ([briefing](../../../4-learning/interests/briefs/2026-11-04-briefing.html); [source post](https://langchain.com/blog/components-building-company-harness)).
- **Sandbox**: an isolated place where agent code runs without touching the real system (example in the brief: NVIDIA OpenShell, github.com/NVIDIA/OpenShell).
- **Ambient agent**: a harness feature, an agent triggered by events or a schedule ([[agent-orchestration-patterns]]).
- **Context engineering** and **offloading** (storing big tool output outside the prompt and passing a pointer) are harness design choices ([LangChain](https://langchain.com/blog/context-engineering-starts-with-retrieval), 2026-10-23).

## Where it shows up for Greg
- Claude's side: this repo's `CLAUDE.md` map, hooks, skills and scheduled routines are the harness ([[claude-operating-model]], [[skills-catalog]], [[agent-skills]]).
- BOULON's chat agent: the Copilot Studio agent is a minimal harness (instructions, one knowledge source, Secours fallback topic, sign-in) ([[copilot-studio-agent]]). Tools, triggers and schedules are not used.

## Related
[[agent-architecture-map]] · [[agent-orchestration-patterns]] · [[agent-skills]] · [[mcp]] · [[copilot-studio-orchestration]] · [[azure-ai-stack-map]] · [[greg-interest-map]] · [[phase-2-architecture]] · [[boulon]]
