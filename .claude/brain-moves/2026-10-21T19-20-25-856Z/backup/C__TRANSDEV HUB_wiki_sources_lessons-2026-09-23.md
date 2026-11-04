---
title: Source — Lessons of 2026-09-23
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/lessons-2026-09-23.md]
---

**Bottom line:** 17 failures from the first Claude Code day, each with a fix and where the fix is now enforced (memory, skill or CLAUDE.md rule).

Plain words: a table of mistakes (for example scoring a test PASS when the citation showed the index name) and the standing rule created to stop each from repeating. All are consolidated on [[lessons-learned]].

## Key facts
- Testing rule: a PASS needs a correct answer AND a citation naming the manual.
- Sizing rule: measure first. The "100+ manuals" assumption was wrong; the inventory found 3,052 files, 6.95 GB ([[manuals-library]]).
- Money rule: anything that spends money goes through an approval package for Henri first ([[decision-d4-paid-search-tier]]).
- A claimed SLA for Basic was wrong (none with one replica); verify limits on Microsoft Learn first ([[tier-limits]]).
- Direct Line needed the Europe endpoint; publishing first and the sign-in setting caused later errors.
- Some sub-agents cannot write files; use general-purpose agents for writing.

## Related
[[lessons-learned]] · [[test-ledger]] · [[rules-index]]
