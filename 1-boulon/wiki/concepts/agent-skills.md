---
title: Agent Skills (the SKILL.md standard)
type: concept
status: current
updated: 2026-11-04
sources: [../../../4-learning/interests/lexicon-ai-ml.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../.claude/skills/azure-search-index-projection-parent-fields/SKILL.md, ../../../CLAUDE.md]
---

**Bottom line:** an Agent Skill is a folder with a `SKILL.md` (instructions) and optional scripts that an agent loads only when needed. On 2026-10-22 Anthropic moved the format to the Linux Foundation as an open standard, reported as adopted by 70+ platforms. Copilot Studio support was not stated.

Plain words: a recipe card the agent reads only when the job comes up, so the main prompt stays small ([lexicon](../../../4-learning/interests/lexicon-ai-ml.md) row "Agent Skill"). Source: [Anthropic announcement](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation), via the [2026-11-04 brief](../../../4-learning/interests/briefs/2026-11-04-briefing.html).

## In this workspace
- Project skills live in `.claude/skills/<name>/SKILL.md`; the list and what each does is [[skills-catalog]].
- One skill is Azure-specific: `azure-search-index-projection-parent-fields` (frontmatter name, model haiku, a description saying when to use it) documents the projection trap ([[index-projections]]).
- Skill repos seen in the brief's tools watch: github.com/microsoft/skills and github.com/microsoft/azure-skills (crawled 2026-11-04: findings in `1-boulon/docs/azure-copilot-skills-findings-2026-11-04.md`).

## Related
[[agent-architecture-map]] · [[agent-harness]] · [[agent-orchestration-patterns]] · [[mcp]] · [[skills-catalog]] · [[claude-operating-model]] · [[azure-ai-stack-map]] · [[greg-interest-map]] · [[copilot-studio-agent]] · [[boulon]]
