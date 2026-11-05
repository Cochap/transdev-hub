# Hand-off index: every hand-off, resume note and saved session, in one table
Hand-written (the router build does not touch this file). Open the row for the project you are resuming; read the newest file first. `boulon-end-of-day` refreshes this table every day (step 4.2); `boulon-morning-check` reads it first.

## Newest hand-off per area (read these on "resume from yesterday")
| Area | Newest hand-off | Also read |
|---|---|---|
| Morning hand-off (resume-session format, written by end of day; read FIRST) | `5-brain/handoffs/<date>-eod-handoff.md` (newest: 2026-11-04) | `5-brain/logs/eod/<date>/_digest.md` and the extracts beside it |
| Whole workspace (status, waiting on Greg, next steps) | `C:\TRANSDEV HUB\RESUME.md` (rewritten by every end of day) | `1-boulon/docs/continuity-log.md` Status, `1-boulon/docs/timeline.md` tail |
| BOULON MVP school-bus manuals (STANDARD SCHOOL, 2026-11-04) | `5-brain/handoffs/2026-11-04-eod-handoff.md` "BOULON" block | `1-boulon/docs/mvp-school-bus-2026-11-03.md` |
| Hub in the cloud (GitHub repo, Actions routines) | `5-brain/handoffs/2026-11-04-eod-handoff.md` "Workspace — hub in the cloud" block | `5-brain/scripts/cloud-sync.ps1`, `.github/workflows/routines.yml` |
| DIX30 meeting transcript → plan proposal (DONE 11-05: transcript, minutes, plan v0.1) | `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md` | `1-boulon/docs/proposition-plan-projet-2026-11.md` |
| Second-brain build (skills consolidation, moves, plugins) | `5-brain/handoffs/2026-10-21-second-brain-build-handoff.md` | `5-brain/improvements.md` |
| ZBB (budget tool) | `C:\ZBB\docs\HANDOFF-2026-10-21.md` (pending request, next command, known limits) | `C:\ZBB\docs\HANDOFF-2026-10-20.md` (older, French), last 5 entries of `C:\ZBB\wiki\log.md`, `C:\ZBB\wiki\index.md` |
| Daily Digest | `5-brain/handoffs/2026-10-29-eod-handoff.md` "Daily Digest / World Monitor" block (`wm` certificate fix 10-29; modes only in the web app) | `2-projects/daily-digest/ROUTER.md`, `C:\Users\rilg01\DAILY DIGEST\LAUNCH.md` |
| Learning | `4-learning/LEARNING.md` (progress log) | the from-zero deck link in `1-boulon/docs/timeline.md` 2026-10-21 |
| Meeting prep | `1-boulon/docs/meeting-prep-2026-10-22-ai-maintenance-catalogue.md` | |
| Workshop ID Card (web app + fillable PowerPoint) | `5-brain/handoffs/2026-11-02-eod-handoff.md` "Workshop ID card" block (ready to send; web app live, PowerPoint rebuilt 11-02) | older: `5-brain/handoffs/2026-10-29-workshop-id-card-handoff.md`;  `2-projects/workshop-id-card/henri-changes-2026-10-29.md`, `2-projects/workshop-id-card/ROUTER.md` |
| Workshop segmentation (new 2026-10-27) | `2-projects/workshop-segmentation/project-status.md` (PM status; section "End of day 2026-10-29"), then `5-brain/handoffs/2026-10-29-eod-handoff.md` segmentation block | `2-projects/workshop-segmentation/cloud-repo/results/` (01 analysis, 02 critique, 03 v2 proposal, 04 formula guide) and `cloud-repo/data/Segment Scoring System (v2 proposal).xlsx`, `1-boulon/wiki/projects/workshop-segmentation.md`, `2-projects/workshop-segmentation/raw/` (original debrief), `2-projects/workshop-id-card/ROUTER.md` (ID card app) |

## Raw sources behind the hand-offs
- Saved sessions (what `/ecc:resume-session` loads): `C:\Users\rilg01\.claude\session-data\<date>-<id>-session.tmp`, one per session (12 on 2026-10-21; `...-eod-session.tmp` is the day close).
- Per-session extracts of every conversation: `5-brain/logs/eod/<date>/` (index `_index.json`).
- Sessions closed one by one: `5-brain/logs/closed-sessions.md`.
