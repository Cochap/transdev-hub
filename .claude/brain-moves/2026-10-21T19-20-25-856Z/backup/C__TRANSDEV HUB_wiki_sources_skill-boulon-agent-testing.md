---
title: Source — skill boulon-agent-testing
type: source
status: current
updated: 2026-09-30
sources: [../../.claude/skills/boulon-agent-testing/SKILL.md]
---

**Bottom line:** the project skill (a saved set of instructions Claude follows) for testing the live agent and the search index from Greg's PC. Catalogued in [[skills-catalog]].

- Index side: `1-boulon\tests\run-golden.ps1` runs 41 questions in keyword / hybrid / semantic modes. Baseline 2026-09-24 13:38: keyword 30/41, hybrid 36/41, semantic 41/41, 0 errors. Exit 1 means a setup problem or errored search call, and that run does not count. `1-boulon\tests\run-pilot-tests.ps1` runs T1-T3.
- Agent side: `1-boulon\tests\ask-agent.ps1 "<question>"` uses Direct Line at `europe.directline.botframework.com` (the global endpoint returns 403). Known errors: `LatestPublishedVersionNotFound` (agent not published), `IntegratedAuthenticationNotSupportedInChannel` (sign-in ON blocks Direct Line; sign-in stays ON because "No authentication" blocks the Teams app store). Exit codes: 0 reply, 2 setup error, 3 no reply in time, 4 agent error; only 0 can be a pass.
- The Test panel runs the DRAFT agent; Direct Line runs the PUBLISHED one.
- Scoring: PASS needs a correct answer AND a citation naming the manual; a wrong-manual hit is a FAIL; errors and timeouts never pass; a "don't know" question passes only with the exact D14 bilingual line and no number; setup errors are FAIL-setup, not answer quality.
- Log every run in `1-boulon/docs/test-ledger.md`, raw output in `1-boulon/tests/results/`.

## Related
[[boulon-testing]] · [[golden-set]] · [[skills-catalog]]
