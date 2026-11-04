# Morning hand-off for 2026-11-03 (written by end of day 2026-11-02)
Format: `/ecc:resume-session` briefing. Read by `boulon-morning-check` step 0. Digest of the day: `5-brain/logs/eod/2026-11-02/_digest.md`. Week list: `5-brain/ideas/2026-W45-ideas-and-tasks.md`.

## Workshop ID card (for Henri): ready to send
WHAT WE'RE BUILDING: the bilingual Workshop ID card in two forms, a web app and a fillable PowerPoint, with Henri's 26 changes (24 done; 2 wait on his logos).

WORKING:
- Live web app https://claude.ai/artifact/NK4HrpNshyytjdEYYwCf7u (same link as before). Loads signed-out; full city search works live. Published copy `C:\TRANSDEV HUB\2-projects\workshop-id-card\artifact-pub\` (republish from here to keep the link).
- Local app `C:\TRANSDEV HUB\2-projects\workshop-id-card\dist\` with city fallback (typed text accepted when the list is missing); launcher `dist\OUVRIR-fiche-atelier.cmd`; screenshots `test-shots\2026-11-02-cityfix-FR.png`, `-EN.png`.
- PowerPoint `C:\TRANSDEV HUB\2-projects\workshop-id-card\powerpoint\Workshop_ID_Card_Fiche_atelier.pptm`, rebuilt by `powerpoint\build-fillable-card.ps1` from the OneDrive original; macro test `powerpoint\test-macros.vbs`; previews `preview_FR.png`, `preview_EN.png`, `preview_FR_print.png`. Passed EN -> FR -> print -> EN, 100/400 = 25 %, « Or » = gold.
- Change list `C:\TRANSDEV HUB\2-projects\workshop-id-card\henri-changes-2026-10-29.md`.

IN PROGRESS: Greg sends Henri the link + .pptm (tips: click Activer le contenu / Enable Content; print with the ribbon's Imprimer / Print button, plain Ctrl+P keeps the yellow) and asks for his logos.

NOT STARTED: a full card generated on the LIVE page (only done locally); ribbon buttons clicked by hand; double-click test of `OUVRIR-fiche-atelier.cmd`; city files `cities-N.txt` copied into `dist/assets/` (they exist only on the live artifact).

WHAT NOT TO RETRY: opening `index.html` by double-click (file:// blocks the app's files); a required city field with no list; macro tests with a hidden PowerPoint window; trusting the .pptm on disk without rendering it (it had regressed to the old version); PowerShell 5 position values without `[single]` casts; npm/npx dev server; VBA chains over 24 continuations.

UNFINISHED GREG REQUESTS: none on the ID card ("make it live so i can send to henri ... give me the powerpoint" and "use thorough e2e testing and check your work" were both done).

OPEN QUESTIONS: does Henri want the "Sign in" button explained? (He does not need it.)

NEXT STEP: Greg opens the live link, generates one card in FR, then sends.

## Workshop segmentation
WHAT WE'RE BUILDING: from-zero segment (S1/S2/S3 = facts) + medal (bronze/silver/gold = quality) proposal.

WORKING: test bench `C:\TRANSDEV HUB\2-projects\workshop-segmentation\banc-essai-segmentation-v2.xlsx` renamed today (Écart -> « Au-dessus du normal de… », Effectif -> « Assez de techniciens ? (Oui/Non) », column O Oui/Non, segment formula R and Tests count updated; backup `backup-banc-essai-segmentation-v2-2026-10-29.xlsx`). Everything else as in `5-brain/handoffs/2026-10-29-eod-handoff.md`.

IN PROGRESS: recalculation of the test bench (Excel COM blocked; Greg opens it once in Excel, Tests should still read 12/12).

NOT STARTED: bronze/silver thresholds and medal weights; redo the grid question count (67 vs 78); commit 10-29 results to private repo Cochap/workshop-segmentation; call one-pager in S1/S2/S3 wording.

WHAT NOT TO RETRY: see the 10-29 hand-off list (MIR mission, target segments as truth, continuous scale, "level 3", free creative documents, opening `Scoring test.xlsx` in a batch).

UNFINISHED GREG REQUESTS: "on est mieux de demander a pierre pour les donnes de la actual courbe" and "jaimerais proposer ce systeme a gabriel ... en dessous de 50 mots": drafts in session "Good morning (fork)", NOT sent. Greg said today the segmentation Excel "is not totally ready so we dont consider it".

OPEN QUESTIONS: did the Fri 10-30 / Mon call happen? Who is "Eckern"?

NEXT STEP: Greg sends the two drafts; Claude finishes medal thresholds.

## BOULON (RAG radar, agent)
WHAT WE'RE BUILDING: Phase 1 manuals Q&A agent; weekly RAG radar for self-hosted RAG advances.
WORKING: run `C:\TRANSDEV HUB\1-boulon\docs\rag-radar\runs\2026-11-02.md` (13 new, 12 updated; first line = last30days health: v3.31.0, Reddit 5, X 22, HN 14, GitHub 12, Web 8, Instagram 4, TikTok 3, YouTube lane 87 videos). Top pick: Copilot Studio custom graders (shared grader library GA 11-15), status try.
IN PROGRESS: IT ticket 77048 (no nudge).
NOT STARTED: load the 41 golden questions into Copilot Studio Evaluations.
WHAT NOT TO RETRY: last30days with a 5-minute or 200-second cap.
UNFINISHED GREG REQUESTS: none.
OPEN QUESTIONS: none new.
NEXT STEP: try a custom grader on the golden set when Greg is in Copilot Studio.

## Workspace / brain
WORKING: routine recos page `C:\TRANSDEV HUB\5-brain\routines\recos\2026-11-02.html` (4 cards: HQ page check, unsent-messages reminder, company-certificate check, one end-of-day only). Audit 0 unrouted, 0 stale, 0 map gaps.
IN PROGRESS: Greg ticks routines and pastes "Copy picks" back.
NOT STARTED: marketing add-on choice (Anthropic Marketing plugin first pick; coreyhaines31/marketingskills not vetted).
WHAT NOT TO RETRY: `python` from a Bash heredoc (hangs; use node or a file).
UNFINISHED GREG REQUESTS: "marketing plugins or all in one marketing skills for claude ...": options presented, no pick.
OPEN QUESTIONS: 3 new proposals in `5-brain/improvements.md` (shell quirks, radar timeout, pre-send check) need Greg's yes; `Scoring test.xlsx` move still waits.
NEXT STEP: Greg's picks on the recos page.

No activity today: ZBB, Daily Digest, Learning.

CONTEXT TO LOAD: `5-brain/logs/eod/2026-11-02/_digest.md`, extracts `b1c0ade3.md` and `5431ca89.md` in the same folder, `5-brain/ideas/2026-W45-ideas-and-tasks.md`, `2-projects/workshop-id-card/ROUTER.md`, `2-projects/workshop-segmentation/project-status.md`, `1-boulon/docs/lessons-2026-11-02.md`.
