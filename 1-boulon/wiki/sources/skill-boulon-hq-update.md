---
title: Source — skill boulon-hq-update
type: source
status: current
updated: 2026-09-30
sources: [../../../.claude/skills/boulon-hq-update/SKILL.md]
---

**Bottom line:** the project skill run at the end of EVERY BOULON exchange to refresh Greg's BOULON HQ page and mirror durable facts into the continuity log. Catalogued in [[skills-catalog]]; the page itself is in [[boulon-hq-control-room]].

- HQ is Greg's only daily view; it replaced TODAY.md on 2026-09-23. Design goal: engaging, low clutter, one action in focus.
- Edit only the `const S = {...}` block of `boulon-hq.html`: `updated`, `headline`, `progress`, `move` (single next action in [[skill-boulon-greg-steps]] format), `decisions` (good / warn / bad states, removed one exchange after being logged), `tiles` and `tests` (latest scores; pass rule = right answer AND citation names the manual), `later` (at most 7 rows), `feed` (newest first, at most 5, naming the ECC agents and skills used).
- Republish with the Artifact tool; in any session that did not first publish it, pass `url: https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9` or a duplicate page is created. Do not edit the Control room from here; keep the `#v-now` element and CSS tokens the panel depends on.
- Mirror durable facts into `1-boulon/docs/continuity-log.md` and the continuity log doc. Plain language, no emoji, no ECC tool pre-assigned to future slots.

## Related
[[skills-catalog]] · [[boulon-hq-control-room]] · [[hq-control-room]]
