# Lessons — 2026-09-30

| # | What went wrong or was learned | Fix | Where it's enforced |
|---|---|---|---|
| 1 | The AIOS kit's `/onboard` intake is written for a business owner (revenue, customers, ICP). Greg's situation is an intern on a single project, so Q3-Q7 don't map and were left as template text. | Answer Q2-Q7 in intern/BOULON terms (priorities = BOULON milestones, tools = Teams/Outlook/SharePoint/Copilot Studio/Azure, tasks tracked in BOULON HQ + continuity log), then re-run `/onboard`. | `aios-intake.md` (open); next-session action in RESUME.md |
| 2 | The kit generates its own root `CLAUDE.md`, which would overwrite the project's `CLAUDE.md` (the BOULON source of truth). | Before re-running `/onboard`, back up `CLAUDE.md` and merge the kit's output into it instead of accepting an overwrite. | RESUME.md; here |
| 3 | Kit skills (`grill-me`, `level-up`, `audit`) overlap with existing BOULON routines (council, end-of-day, living-docs). | Use kit skills for Greg's own AI OS/learning; keep BOULON work on the BOULON skills. BOULON facts still go to `docs/continuity-log.md` only. | This note |
| 4 | A second knowledge store (`wiki/`) now exists next to `docs/`. Risk of two sources of truth. | `docs/continuity-log.md` stays authoritative; `wiki/` is a derived index. If they disagree, the log wins and the wiki gets fixed. | `wiki/CLAUDE.md`, this note |
