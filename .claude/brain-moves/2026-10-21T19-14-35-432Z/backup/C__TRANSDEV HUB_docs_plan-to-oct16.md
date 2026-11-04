# BOULON: plan to launch by Fri 2026-10-16
Written Wed 2026-09-23 by `ecc:planner`. It replaces the dates in `docs/orchestration-plan.md`, which targeted 11-18.

**Why the old plan said November:** it assumed Greg would run every agent test by hand, a 2-week drive to collect mechanics' questions, a full claim checker, and a 2-week mechanic pilot. Three things remove most of that waiting:
- Direct Line (Claude sends test questions to the agent itself)
- direct access to the blob storage
- Greg working on this full time

| Day | Key outcome | Greg min |
|---|---|---|
| Wed 09-23 | **Publish the agent**. First automatic test run | 20 |
| Thu 09-24 | Decide D1 (load the whole library) and D4 (Basic + splitting). Create the Basic service in Canada East. Send the mechanics a short request (5 questions each, 3 days) | 30 |
| Fri 09-25 | Exact file list, page counts, and list of oversize files. Document Intelligence cost verified | 10 |
| Mon 09-28 | New index on Basic: readable title + page fields (fixes citations), table-friendly reading, stops on the first failure | 15 |
| Tue 09-29 | Pilot files indexed on Basic. Torque table on Vicinity p.22 checked | 10 |
| Wed 09-30 | Point the agent at Basic with the read-only key. Re-publish. Golden test run | 20 |
| Thu 10-01 | **Gate A:** citations show manual + page, p.22 torque correct, 0 failed files | 10 |
| Fri 10-02 | Golden set grows to ~40 questions. Targets memo to Henri | 20 |
| Mon 10-05 | Big files split into chapters. Full core library uploaded | 60 |
| Tue 10-06 | **Henri, 30 min: agree the targets.** Full re-index | 40 |
| Wed 10-07 | Coverage check on every file. Sign-in and log-retention requests sent to IT | 15 |
| Thu 10-08 | Full golden run + a simple number check | 10 |
| Fri 10-09 | **Gate B:** every page searchable + Henri's targets met | 20 |
| Mon 10-12 | Thanksgiving | 0 |
| Tue 10-13 | Fixes. Mechanics-only sign-in (depends on IT) | 30 |
| Wed 10-14 | Soft launch to 3–5 mechanics | 20 |
| Thu 10-15 | Final golden run. Sign-off pack | 15 |
| Fri 10-16 | **Gate C: Henri sign-off** | 60 |

About 7 hours of Greg's time in total.

**Proposed targets for Gate B:**
- 0 unsupported safety/spec numbers
- 100% of answers cited
- ≥95% correct "I don't know" when a manual isn't loaded
- ≥85% correct answers

**Cut to fit:**
- Golden set: 120 → ~40 questions
- Mechanic questions: 3 days instead of 2 weeks
- Claim checker: a simple number check instead of the full version
- Henri's targets: one 30-minute meeting
- Mechanic pilot: a 2-day soft launch instead of 2 weeks

**Phase 2, after launch:**
- full claim checker
- golden set grown to 120
- 2-week pilot review
- the live second-check decision
- upgrade to S1 if needed

**Risks:**
- **A 40-question set gives weaker statistics.** Mitigation: weight it toward safety and torque questions.
- **The number check can miss the right number attached to the wrong bolt.** Mitigation: manually check every torque answer.
- **Many manuals get cut off.** Mitigation: switch Basic → S1 in place.
- **IT sign-in is late.** Mitigation: soft launch with named test users.
- **Henri isn't available on 10-06 or 10-16.** Mitigation: book both dates today.
- **Document Intelligence cost is higher than planned.** Mitigation: verify it on 09-25 and set a budget alert.
