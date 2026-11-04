---
title: Source — ECC plugin value report
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/ecc-value-report.md]
---

**Bottom line:** a short 2026-09-23 report ranking which of ECC's many add-on helpers are worth using on BOULON. Most of ECC is for software teams and does not apply; a handful do.

## What the source says
- Do now: `ecc:rag-pipeline-reviewer`, `ecc:eval-harness` + `ecc:verification-loop`, `ecc:architecture-decision-records`, `ecc:ai-regression-testing` (targets the "answers from general knowledge" failure, BOULON's biggest risk).
- Claude can do alone: `ecc:living-docs-governance`, `ecc:save-session` / `ecc:resume-session`, `ecc:silent-failure-hunter` (check the pilot test script fails loudly).
- Together with Greg: `ecc:deep-research`, `ecc:blueprint` / `ecc:plan`.
- Later: planner/architect for Phase 2, re-run the RAG review at 100+ manuals, `ecc:agent-evaluator` once real usage exists.
- Skip: language reviewers and build tools, dashboards and slides, Jira/email, cost trackers (they track Claude usage, not Azure spend).
- Correction inside the file (2026-09-23): security IS in scope (query key vs admin key, mechanics-group sign-in), so the security reviewer is not skipped.
- The report's "skip" of `ecc:council` and `ecc:santa-method` was later overtaken: [[orchestration-plan]] uses them for decisions and sign-off checks.

## Related
[[ecc-plugin]] · [[claude-operating-model]] · [[skills-catalog]]
