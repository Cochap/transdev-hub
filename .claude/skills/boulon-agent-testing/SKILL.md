---
name: boulon-agent-testing
model: haiku
description: Use when testing the live BOULON Copilot Studio agent or the Azure AI Search index from this PC. Covers running 1-boulon/tests/ask-agent.ps1 (Direct Line), 1-boulon/tests/run-golden.ps1 and 1-boulon/tests/run-pilot-tests.ps1, the known error codes and what they mean, and logging every run in 1-boulon/docs/test-ledger.md.
---
# Testing BOULON

## Index side (no Greg needed)
- `powershell -File 1-boulon\tests\run-golden.ps1`: runs the golden set in keyword / hybrid / semantic modes. 41 questions. Baseline 2026-09-24 13:38: keyword 30/41, hybrid 36/41, semantic 41/41, 0 errors. Exit 1 = setup problem or at least one search call errored; the run then does NOT count.
- `1-boulon\tests\run-pilot-tests.ps1`: T1ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“T3.
- Keys come from `.env` only. Never print them.

## Agent side, through Direct Line
- `powershell -File 1-boulon\tests\ask-agent.ps1 "<question>"`. The secret is the `COPILOT STUDIO:` line in `.env`.
- **The endpoint is `europe.directline.botframework.com`.** The global endpoint returns 403 for this environment.
- Known errors:
  - `LatestPublishedVersionNotFound`: the agent isn't published. Greg clicks Publish.
  - `IntegratedAuthenticationNotSupportedInChannel`: the agent's sign-in ("Authenticate with Microsoft") blocks Direct Line. Sign-in stays ON ("No authentication" blocks the Teams app store). Automatic agent tests need another route; see the continuity log for the current one.
- Exit codes of `ask-agent.ps1`: 0 = reply received; 2 = script/setup error (test did not run); 3 = no reply in time (script worked, agent silent); 4 = agent returned an error code. Anything but 0 is never a pass.
- Copilot Studio's Test panel runs the DRAFT agent; Direct Line runs the PUBLISHED one.

## Scoring rules
- A PASS needs a correct answer AND a citation that names the manual (not `multimodal-rag-ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦`).
- A hit from the WRONG manual (other model, other fleet) is a FAIL, even if the text looks plausible.
- An error, timeout or empty result is never counted as a pass. Say so in the ledger.
- A "don't know" question passes only with the exact D14 bilingual line and no number.
- Setup errors (keys, index name, publish or auth state) are logged as FAIL-setup and never counted as answer quality.

## Logging
Append every run to `1-boulon/docs/test-ledger.md` (#, date, version, where, input, expected, actual, verdict, what changed) and save raw output in `1-boulon/tests/results/`.

## Copilot Studio Evaluation tab (added 2026-10-06)
- Two sets: `1-boulon/tests/copilot-eval/boulon-golden-v1.csv` (41 retrieval questions) and `1-boulon/tests/copilot-eval/boulon-failure-v1.csv` (36 failure cases, index in `1-boulon/tests/golden/failure-v1-index.json`). Greg imports each in Evaluation, runs, exports; the files land in Downloads.
- The tool Answer quality mark counts a correct "I do not have that information" as Fail. Never use its marks: score each case by hand against the expected behavior and save `tests/results/agent-baseline-<date>.md`.
- Loop: save the live instructions, baseline, change ONE thing (1-boulon/docs/agent-instructions.md), rerun, keep only if nothing that passed now fails.
