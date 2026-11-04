# Digest 2026-10-22 (26 sessions; 9 are duplicates or summariser wrappers)

## Meeting prep and AI architecture (BOULON, 6bbac6f6 + 15f00339, 34d68ff1, 39318a20, dccbd761, d6b077c1)
- Purpose: prep for tonight's "AI maintenance catalogue" meeting, cloud-AI architecture review, cost-optimisation agent, HTML explainer.
- Decisions: meeting prep covers all projects incl. ZBB. Ask Sebastien in person, no more texts. Hand-off table lives in `C:\TRANSDEV HUB\5-brain\handoffs\INDEX.md`.
- Corrections in the prep (stale figures): "no wrong answer since pilot" is false (12.7 Nm given vs 15 Nm manual, Vicinity p.22). 41/41 is search only; finished agent scored ~39/41 with 4 serious failures on the 36-case stress set. One-time reading cost is ~CAD 933 to 3,652, not 650 to 1,200. Library 131,756 pages, 2,785 files, 6.53 GB.
- Verdicts: adopt heading chunking, int8 compression, Standard plan for semantic ranker. Reject RAPTOR, ColBERT, HyDE, step-back.
- Files: `C:\TRANSDEV HUB\1-boulon\docs\meeting-prep-2026-10-22-ai-maintenance-catalogue.md` (corrected); `C:\TRANSDEV HUB\1-boulon\docs\cloud-ai-architecture-brief-2026-10-22.md` (~8,000 words, only top read); `C:\TRANSDEV HUB\1-boulon\docs\boulon-scale-story-2026-10-22.html` (private artifact https://claude.ai/artifact/4figJ5qTvTrLq6Y5S6EiVw); `C:\TRANSDEV HUB\5-brain\handoffs\INDEX.md` (new); `C:\TRANSDEV HUB\.claude\skills\boulon-morning-check\NOTES.md` (parked note).
- Open: Greg checks explainer on phone and desktop; re-reads corrected prep; asks Sebastien in person. Cost-optimisation agent result unknown. Brief not fully read; HQ, timeline and continuity log not updated for it. Ticket #77048 waits on IT.
- Failures: stray `python` call hung (use file tools). `brain.js build` wiped the hand-edited table in the router; table moved to INDEX.md.
- Greg's corrections: "good morning, resume from yesterday" must trigger `ecc:resume-session` every time (parked on boulon-morning-check). Hand-offs should be grouped in one place.
- Risk: stale figures (41/41, "no wrong answer", CAD 650 to 1,200) may remain in other documents.

## Model routing and skills (878ff8f8, a4fee5b2)
- 439 skills classified; 28 pinned to Haiku. Hook timeouts raised to 45 s and 50 s (PowerShell startup ~20 s). Hook gave no output after folder move; not re-tested.
- Stale line: `5-brain/routers/workspace.md` says "7 skills pinned", should say 28.
- Greg's preference: skill upkeep must be passive and silent (no output when nothing is new).
- Greg to decide: keep Sonnet minimums for approval-package, report-pipeline, security and review skills.
- Open: check `C:\TRANSDEV HUB\5-brain\logs\model-routing.jsonl` after restart. Possible typo "visa openrouter" to confirm.

## Ponytail plugin (476cbf3e)
- Added ponytail plugin at project scope in `C:\TRANSDEV HUB\.claude\settings.json` and `.claude\ROUTER.md`. Session saved to `C:\Users\rilg01\.claude\session-data\2026-10-22-ponytail01-session.tmp`.
- Open: restart, accept trust prompt, run `/ponytail-help`. Hook scripts not reviewed. Install unverified.

## ZBB (C:\ZBB): 123893c9, 8d2ac4cc, ce404b34, 1a628059, 2f12f8ae, bd26d3aa, bf57ba32, e8dea300
- Model: HCOUNTER raised vehicle-years 5,496 to 7,300. Depot error 21.3% to 13.8%; fleet error 5.2% to 6.6% (noise). Age effect: 0-5 yr buses cost 6-13% less than odometer suggests; over 8 yr about 11% more. Standard school 20,000 km at $65/h: history ~$2,960, our tool $3,090, Matteo's $7,186. Young-bus accuracy gap unresolved (-24%, -36% with age correction; per-type age correction worse at -41%).
- Commits `c92f968`, `bc18f36`, `b7248c9`, `064cf02`. Guide `C:\ZBB\docs\zbb-mastery-guide.md`. Deck `C:\ZBB\docs\deck\ZBB-supervisor-deck.html` and `C:\ZBB\docs\deck\ZBB-presentation-superviseurs-FR.html`. Backup `C:\ZBB\data\backup_2026-10-22_pre-hcounter`. Voyago copied to `C:\ZBB\dump_voyago`; `dump/` in .gitignore.
- Open: hourly rate $65 or $75 (finance). Sealed 2026 test and browser tests (Playwright missing; 28 tests not run). Greg confirms recalibrated ranges. Text to Henri is Greg's to send.
- Greg's preferences: app "moins de clutter", like the old ZBB; no band-error percentages in app; claims need context and worked examples; define jargon; simple explanations (12-year-old level). No caps-lock style.
- Hard to find: HCOUNTER dictionary in Downloads (`C:\Users\rilg01\Downloads\veripep 2022-10-14.pdf`); summary `C:\TRANSDEV HUB\1-boulon\docs\mir-data-map.md`. Gabriel is not on the authorised data-contact list (Michée Dumoulin, Alex Dumenne).

## ZBB Power BI (4bd3f34d, 25948956, c56ce15c, cc20559f, d1a06a08)
- Built `C:\ZBB\powerbi\ZBB-Budget\ZBB-Budget.pbip` from `C:\ZBB\powerbi\build_pbip.py`, Québec only (Voyago excluded). Exports in `C:\ZBB\powerbi\data\`.
- Open: Greg checks Power BI Desktop window; unconfirmed that pages load. OneDrive "ZBB Final New UX" never searched for an existing report.

## Other
- 37d04c67 (C:\Users\rilg01): explanation of ZBB budget calculation (running maximum, 1,000 to 200,000 km filter, non-maintenance removed). No files changed.
- 2749a73c: this scheduled routine.
- Harness flag: the BOULON digest subagent output matched an instruction-shaped pattern ("settings-json"). Read as data; nothing acted on.
