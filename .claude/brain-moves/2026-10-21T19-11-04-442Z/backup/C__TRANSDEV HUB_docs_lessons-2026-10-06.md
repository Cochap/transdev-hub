# Lessons 2026-10-06

| # | Failure | Fix | Enforced in |
| --- | --- | --- | --- |
| 1 | Ticket one-time budget (CAD 650) rested on an unmeasured guess of a 150-300 file core library; the measured folder is 131,756 pages | Measured every PDF; labelled all figures Measured, Verified, Estimate, Unknown | Constitution rule, memory feedback-measure-before-forecast |
| 2 | Claimed Vicinity was 713 pages and 22 percent searchable (two different files conflated) | Downloaded and counted all stored PDFs; retracted | Same rule |
| 3 | Said the searchable copy is smaller than the PDFs (compared against 181 MB that included two unindexed files) | Showed pilot 63.3 MB copy vs 59.6 MB PDFs | specs-and-costs artifact |
| 4 | Wrote 2 Basic partitions without saying it is one service with extra capacity | Explained; tested 8-bit vectors on real vectors (93-94 percent kept) | specs-and-costs artifact |
| 5 | Asked Greg for the agent instructions he had already given; scheduled work for tomorrow while he was in until 17:30 | Saved the instructions to docs; ran the loop today | Constitution rule, memory feedback-use-saved-files-and-clock |
| 6 | Put the schedule in a docs file, and listed ticket checks as a task | Moved to HQ Today and Week; removed ticket checks | memory feedback-schedule-in-hq |
| 7 | Three full-index merge passes pushed the Free index over quota and blocked writes | Recreated the same index from a backup in one pass | log, rule: no writes to the Free index |
| 8 | Proposed a coverage statement and a new SharePoint site without being asked or checking records | Dropped both; used the existing SharePoint | memory feedback-pm-reports-to-greg |
| 9 | Over-applied the advisor note and stopped agent-side testing | Restarted: 36 failure cases, hand scoring, daily loop | docs/agent-instructions.md, skill boulon-agent-testing |
| 10 | Evaluation tool marks correct abstentions as Fail | Score by hand against expected behavior | skill boulon-agent-testing |
| 11 | Inline shell heredocs broke on quotes (twice, including the end-of-day script); Claude in Chrome screenshots freeze | Write scripts as files; do not drive Chrome for screenshots | skill transdev-pc-shell-quirks |
| 12 | Early tool output printed key lines from the env file | Never print the env file; read keys by name and report length only | existing rule, restated in the continuity log |
