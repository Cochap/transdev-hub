---
title: ECC plugin (Claude Code helpers)
type: entity
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/ecc-value-report.md, ../../.claude/skills/ecc-operating-notes/SKILL.md, ../../CLAUDE.md]
---

**Bottom line:** ECC is a bundle of hundreds of extra Claude Code helpers ("agents" are specialists Claude can call in; "skills" are repeatable checklists). Most are built for software teams and do not apply to BOULON; about a dozen matter, and Claude picks them itself.

## State on Greg's PC
ECC 2.2.2 is installed at project scope (`ecc@ecc`) with standard hooks, live since 2026-09-24. A claude.ai-synced copy (`ecc@synced`) is shadowed by the local one; leave it alone. `/ecc:configure-ecc`'s setup script refuses because of that entry, so use `claude plugin ...` commands. Locked company PC: installs need an IT ticket ([[company-it-constraints]]). Source: [[claude-md-root]].

## Which ones BOULON uses
From [[ecc-value-report]] (2026-09-23) and the root skill map: `ecc:rag-pipeline-reviewer` (index and chunking), `ecc:eval-harness`, `ecc:verification-loop`, `ecc:ai-regression-testing` (golden runs), `ecc:architecture-decision-records` and `ecc:living-docs-governance` (decisions for Henri), `ecc:deep-research` (prices, limits), `ecc:planner` / `ecc:blueprint` (planning), `ecc:prompt-optimizer` (sharpen a helper's brief), `ecc:save-session` / `ecc:resume-session` (hand-off). Not relevant: language reviewers, TDD, build-fix, PR tooling, cost trackers (they track Claude usage, not Azure).

## How it behaves here
See [[skill-ecc-operating-notes]]: the GateGuard "Fact-Forcing Gate" is a checkpoint not a failure (Claude states four facts and retries); ECC's own helpers come with preset models; `/ecc:instinct-export` is empty until `/ecc:learn-eval` has run, which happens inside [[skill-boulon-end-of-day]]. A hook from 16:45 weekdays nudges the end-of-day routine.

## Rule
Claude calls ECC on its own initiative; Greg never picks or pre-assigns them ([[claude-operating-model]]).

## Related
[[skills-catalog]] · [[boulon-hq-control-room]] · [[boulon]]
