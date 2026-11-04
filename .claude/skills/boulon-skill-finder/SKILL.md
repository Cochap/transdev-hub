---
name: boulon-skill-finder
model: haiku
description: Use at the start of any new kind of task, when unsure which skill or agent fits, when a skill shows only a bare name, or before saying that a skill does not exist. Routes the task to the right ECC or Anthropic skill by name, from a full categorized index of every ECC and synced skill, including the ones needed at launch and in production.
---
# Find the right skill

The skill list is too long for Claude to see every description (about 405 entries; descriptions past the first part are dropped), so many skills appear as bare names. Nothing is missing: they all still work when invoked by name.

1. Open `.claude/skills/boulon-skill-finder/INDEX.md` (all ECC and synced skills, one line each, grouped: BOULON now, production and operations, AI and evaluation, documents and visuals, engineering practice, other domains).
2. Pick the skill whose line fits the task, then invoke it with the Skill tool using the exact id, for example `ecc:verification-loop` or `anthropic-skills:pdf`.
3. Agents (not skills) such as `ecc:rag-pipeline-reviewer`, `ecc:planner`, `ecc:security-reviewer`, `ecc:architect` are used through the Agent tool; the CLAUDE.md skill map names the ones BOULON uses.
4. If the index looks stale after an ECC update, run `node .claude/skills/boulon-skill-finder/build-index.js`.

## By project stage (check these first)
- **Now (pilot):** testing and evaluation (`ecc:verification-loop`, `ecc:eval-harness`, `ecc:ai-regression-testing`), research (`ecc:deep-research`), decisions (`ecc:architecture-decision-records`, `ecc:council`), cost and context control (`ecc:cost-aware-llm-pipeline`, `ecc:token-budget-advisor`).
- **Launch and production:** `ecc:security-review`, `ecc:error-handling`, `ecc:cost-tracking`, `ecc:benchmark`, the production and operations group in INDEX.md, then the BOULON skills `boulon-end-of-day`, `boulon-morning-check`.
- **Documents and reports:** `boulon-report-pipeline`, `attention-architecture`, `artifact-design`, `anthropic-skills:docx`, `:xlsx`, `:pptx`, `:pdf`.
- **Reading a PDF or scan:** `boulon-read-pdf`.
