---
title: Testing the agent and the index
type: concept
status: current
updated: 2026-09-30
sources: [../../.claude/skills/boulon-agent-testing/SKILL.md, ../../docs/continuity-log.md]
---

Two layers. **Index tests** run from this PC straight against [[azure-search-index]] (`tests/run-pilot-tests.ps1`, `tests/run-golden.ps1`). **Agent tests** need the [[copilot-studio-agent]]: Direct Line fails because sign-in is ON (`IntegratedAuthenticationNotSupportedInChannel`). Routes: Copilot Studio's built-in Agent evaluation (CSV import, `tests/copilot-eval/boulon-golden-v1.csv`, 41 cases) or a Power Automate flow with the Copilot Studio connector (unverified). Hand tests in the Test panel continue meanwhile. Log every run in `docs/test-ledger.md`. See [[golden-set]].

## Related
[[phase-1-manuals-pilot]]
