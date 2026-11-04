# Morning hand-off — written by end of day 2026-11-04 (Wed)
Digest: `5-brain/logs/eod/2026-11-04/_digest.md` · extracts beside it · lessons `1-boulon/docs/lessons-2026-11-04.md` · week list `5-brain/ideas/2026-W45-ideas-and-tasks.md` §6.

## BOULON — MVP school-bus (STANDARD SCHOOL)
- **WHAT WE'RE BUILDING:** a manuals Q&A MVP for one bus class, STANDARD SCHOOL (MIR SCOLAIRE + SCOLAIRE ADAPTÉ, 193 vehicles).
- **WORKING:** scan done 2,976/2,976 (`1-boulon/tests/school-scan.js` → `1-boulon/tests/results/school-scan.jsonl`); scope + findings in `1-boulon/docs/mvp-school-bus-2026-11-03.md`; continuity log §3 row 2026-11-04.
- **IN PROGRESS:** none running.
- **NOT STARTED:** file list + size vs cap under the new rules; settings backup; delete old Free index; load.
- **WHAT NOT TO RETRY:** chapter extracts of one manual to represent a bus; assuming the MVP needs every manual; maker-website manuals in the KB; scan patterns "IC Bus"/"Vision" as-is; scan output in a temp folder; rating a repo from its README.
- **UNFINISHED GREG REQUESTS:** "exlain the bottleneck and what choices we have" — answered 16:06, but the decision is open. "i would have liked some sort of progress bar for the 2 major tasks from today" — only the scan had one.
- **OPEN QUESTIONS:** subscription path: reactivate "Azure subscription 1" (Greg is Owner, Pierre approves spend) or move ticket 77048 to a company subscription? Does the IC manual cover models beyond PB105 (file not opened)?
- **NEXT STEP:** Greg picks the subscription path; Claude then opens the IC manual's table of contents to confirm what it covers.
- **CONTEXT TO LOAD:** `5-brain/logs/eod/2026-11-04/eb74c70b.md`, `ee480915.md`, memory `feedback-flex-scope-sample.md`.

## Workspace — hub in the cloud (GitHub)
- **WHAT WE'RE BUILDING:** routines (RAG radar, end of day, Friday suggester) running from the cloud, not the PC.
- **WORKING:** private repo `Cochap/transdev-hub` (549 MB); `5-brain/scripts/cloud-sync.ps1` + 3 Windows tasks (30 min sync; weekdays 16:00 sessions; Fri 15:20 week); GitHub CLI `C:\Users\rilg01\tools\gh`.
- **IN PROGRESS:** GitHub Actions `.github/workflows/routines.yml` + `.github/routine-prompts/` (on GitHub, never run).
- **NOT STARTED:** test-run each Actions routine; turn off the PC copies; pause/delete the 3 Claude cloud routines (`trig_01SKAmmvisHv5CTFVeFGvt6g`, `trig_01Qy7wur43cDepH7jLBMvQm2`, `trig_01NNT5Z4x93KfhwLB2FuQWrL`; delete only by Greg at claude.ai/code/routines).
- **WHAT NOT TO RETRY:** built-in browser for GitHub sign-in on this PC; GitHub CLI installer (admin); GitHub API from company IP; `claude.ai/connect-github`; Claude cloud routines for jobs that write back.
- **UNFINISHED GREG REQUESTS:** "your abolsute goal is to work around whatever obstacle you have and get these routines working" — waits on the token secret. "also ive been trying to install the actual desktop app for openwisper" — never answered.
- **OPEN QUESTIONS:** keep or revoke `HUB_TOKEN`? Segmentation files (D11 confidential) are now in the private repo: OK, or remove them from the repo?
- **NEXT STEP:** Greg runs `claude setup-token`, stores it as an Actions secret on the repo; Claude test-runs.
- **CONTEXT TO LOAD:** `5-brain/logs/eod/2026-11-04/09e86e57.md` (newer fork), `067c0a2c.md`.

## DIX30 meeting → charter
- **WHAT WE'RE BUILDING:** notes, project charter and methodology doc from the 2026-11-03 meeting.
- **WORKING:** PM lexicon `4-learning/interests/lexicon-project-management.md`.
- **IN PROGRESS / NOT STARTED:** transcript (Whisper stopped 16:29 with no output); notes; charter.
- **WHAT NOT TO RETRY:** Whisper on the Transdev PC alongside other jobs.
- **UNFINISHED GREG REQUESTS:** none new.
- **OPEN QUESTIONS:** none.
- **NEXT STEP:** Greg runs Whisper at home on his own wifi; Claude writes notes + charter once the transcript exists.
- **CONTEXT TO LOAD:** `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md`.

## Learning
- **WORKING:** skill `morning-brief`, `4-learning/interests/` (interest map, 2 lexicons, briefs), 23 new wiki pages in `1-boulon/wiki/concepts/` (hubs `rag-field-map`, `azure-ai-stack-map`, `agent-architecture-map`).
- **NOT STARTED:** pick a community skill (`microsoft/skills`, `tech-digest`) — Greg. Wiki conflict 35/41 vs 36/41 (hybrid search) not logged as an open question.
- **WHAT NOT TO RETRY:** transit/school-bus news in briefs. **NEXT STEP:** tomorrow's morning brief.

## VoiceStudio
- **WORKING:** backend healthy after one-launch fix (skill `transdev-pc-shell-quirks`). **OPEN:** Greg yes/no on permanent `UV_SYSTEM_CERTS=1`; model downloads untested.

## No activity today
ZBB, Daily Digest, Workshop ID card, Workshop segmentation (except the GitHub push), Media.
