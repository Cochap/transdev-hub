# Morning hand-off for 2026-10-27 (backfilled 2026-10-28 from the 8 session extracts)
Format: `/ecc:resume-session` briefing. Read by `boulon-morning-check` step 0.

## Workshop segmentation (Transdev Canada). Source of truth: the compte rendu
WHAT WE'RE BUILDING: a bus workshop ID card, 3 segments (S1 small, S2 medium/regional, S3 large/multi-site), and a bronze/silver/gold maturity grid. Greg owns and approves; Gabriel (intern) helps; Henri and Pierre review.

WORKING:
- Wiki: `1-boulon/wiki/projects/workshop-segmentation.md` (rules D01-D12; D11 settled: Claude and ChatGPT allowed)
- Status: `2-projects/workshop-segmentation/project-status.md`
- PowerPoint ID card v2: `C:\Users\rilg01\OneDrive - TRANSDEV\Documents\workshop id slide - fillable.pptm` (fields inside cells, 18 pt, ▼ on dropdowns, 26-country map, % spare ring)
- Web demo FR/EN (private): https://claude.ai/artifact/NK4HrpNshyytjdEYYwCf7u
- Local repo `2-projects/workshop-segmentation/cloud-repo/` (commit c5a3225), no GitHub remote

IN PROGRESS: PowerPoint layout fixes (Greg).
NOT STARTED: task 01 workbook analysis and task 02 maturity grid critique (`cloud-repo/tasks/`). Needed for Thu 10-29.

WHAT NOT TO RETRY:
- Cloud routines without a GitHub repo (they only see GitHub; gh CLI not installed).
- Setting Bold on a PowerPoint ActiveX control from code: set the font weight instead.
- 20 pt values in the card: 18 pt works.
- Map shapes crossing the 180° line: they draw grey bands (fixed in the generator).
- Building before telling Greg whether something is possible.

UNFINISHED GREG REQUESTS:
- Session 30650a54 (interrupted 16:32): "when clicking either of the ownership logos, nothing pops up, i told you to input the choice feature and simply put placeho[lders]". v2 only added the ▼ arrows; the logo choice is not confirmed to open.
- City pin: Claude said it's possible offline with GeoNames (~1-3 MB, Estimate); waiting for Greg's OK.

OPEN QUESTIONS: Châteauguay is S2 in the workbook but the meeting expected S1. The workshops in scope are unknown (the workbook has 5, and Ottawa is not in the calculation). The HSE supplement is missing. The Greg/Gabriel split is not decided. Greg still has to send the 4 logos and untick "Trust access to the VBA project object model".

NEXT STEP: run tasks 01 and 02 here (~15 min), then check the ownership logo click in the .pptm.

CONTEXT TO LOAD: `5-brain/logs/eod/2026-10-27/_digest.md`, extracts 13eb95f9, dd697504, 636529f8, 30650a54, 608333df in that folder, plus the status file above.

## Other areas
VoiceStudio installed (`2-projects/voicestudio`). No activity: ZBB, Daily Digest, Learning, BOULON agent (ticket 77048 still with IT).
