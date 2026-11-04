---
title: Source — root CLAUDE.md (project instructions)
type: source
status: current
updated: 2026-09-30
sources: [../../CLAUDE.md]
---

**Bottom line:** the repo-root instruction file every Claude session reads first. It holds the project context, who's who, key facts, standing rules, the skill map and tooling notes. This wiki's own schema is separate ([[claude-operating-model]] covers how the two fit).

## What the source says
- BOULON: Copilot Studio agent with an Azure AI Search knowledge source. Read `docs/continuity-log.md` first each session; refresh BOULON HQ after every exchange ([[boulon-hq-control-room]]); TODAY.md is retired.
- File table (continuity log, timeline, implementation spec, HQ, `hq/`, tests, etc.) and people: Greg Riley, Henri, Greg Boulon (possible mistranscription of "BOULON"), Pierre Zivec, Alex Dumenne, Samir Macarem.
- Key facts: search endpoint and index name, keys only in `.env` (query key read-only for Copilot Studio, admin key for Claude's offline reads), agent model GPT-4.1, pipeline models embedding + `gpt-5-mini`.
- Standing rules: plain language, log directly (no copy-paste work for Greg), click-by-click tutorials with EN+FR labels, ECC on Claude's own initiative, tests state literal input and pass/red flag, every message ends with next actions, verify Azure claims against current Microsoft docs, no pauses.
- Skill map (which skill when) and tooling: Node v24, Claude Code CLI, ECC 2.2.2 at project scope with standard hooks, locked company PC needing IT tickets for installs. Republish artifacts with the existing `url`.
- Phase 2 direction and the no-invented-compliance correction (2026-09-29) are recorded here too ([[feedback-no-invented-compliance]]).

## Related
[[skills-catalog]] · [[ecc-plugin]] · [[claude-operating-model]] · [[boulon]]
