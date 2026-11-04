---
title: Skills catalog (project skills)
type: concept
status: current
updated: 2026-09-30
sources: [../../../.claude/skills/boulon-agent-testing/SKILL.md, ../../../.claude/skills/boulon-approval-package/SKILL.md, ../../../.claude/skills/boulon-end-of-day/SKILL.md, ../../../.claude/skills/boulon-greg-steps/SKILL.md, ../../../.claude/skills/boulon-hq-update/SKILL.md, ../../../.claude/skills/boulon-morning-check/SKILL.md, ../../../.claude/skills/boulon-report-pipeline/SKILL.md, ../../../.claude/skills/ecc-operating-notes/SKILL.md, ../../../.claude/skills/transdev-pc-shell-quirks/SKILL.md, ../../../CLAUDE.md]
---

**Bottom line:** a "skill" is a saved set of instructions Claude follows for a recurring job, so Greg never has to re-explain it. BOULON has nine project skills in `.claude/skills/`; Claude triggers them itself using the skill map in the root `CLAUDE.md`.

| Skill | Use it when | Page |
|---|---|---|
| `boulon-morning-check` | first exchange of a day: prep workspace, no status questions to Greg | [[skill-boulon-morning-check]] |
| `boulon-hq-update` | end of EVERY exchange: refresh BOULON HQ | [[skill-boulon-hq-update]] |
| `boulon-greg-steps` | anything Greg must click by hand: tutorial with EN+FR labels | [[skill-boulon-greg-steps]] |
| `boulon-approval-package` | money or company resources: story page for Henri | [[skill-boulon-approval-package]] |
| `boulon-agent-testing` | testing the live agent or index | [[skill-boulon-agent-testing]] |
| `boulon-report-pipeline` | report, deck or approval page for Henri | [[skill-boulon-report-pipeline]] |
| `boulon-end-of-day` | "end of day" or about 16:45 | [[skill-boulon-end-of-day]] |
| `ecc-operating-notes` | an ECC hook blocks or warns; model choice for helpers | [[skill-ecc-operating-notes]] |
| `transdev-pc-shell-quirks` | a command fails or hangs on the locked PC | [[skill-transdev-pc-shell-quirks]] |

## Other skills Claude uses
User-level `attention-architecture` (Greg's visual/deck playbook) plus `artifact-design` for any visual deliverable; ECC skills and agents from the root map (golden runs, RAG review, decision records, planning, deep research), see [[ecc-plugin]]. Most of ECC's skills show no description in the list, so they do not trigger by themselves; the map in [[claude-md-root]] exists for that reason.

## Why it matters
Skills carry the project's lessons: for example the approval-package "before calling a ticket ready" checklist came from the Azure ticket being called ready 4 times too early. The HQ Control room buttons run these skills ([[boulon-hq-control-room]]).

## Related
[[claude-operating-model]] · [[boulon]] · [[greg-working-style]]

**Where this sits in the stack:** the project instance of [[agent-skills]] (the SKILL.md standard) inside [[agent-architecture-map]].
