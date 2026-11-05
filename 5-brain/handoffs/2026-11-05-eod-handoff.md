# Morning hand-off — written by end of day 2026-11-05 (Thu)
Digest: `5-brain/logs/eod/2026-11-05/_digest.md` · extracts beside it · lessons `1-boulon/docs/lessons-2026-11-05.md` · week list `5-brain/ideas/2026-W45-ideas-and-tasks.md` §7.
**Friday 11-06: Greg presents the new MVP.** End of day runs in FULL form (learn-eval over the week, hop test, clutter).

## BOULON — MVP school-bus (IC manual, Azure-free Phase 0)
- **WHAT WE'RE BUILDING:** a manuals Q&A MVP for STANDARD SCHOOL buses, starting with the IC BE/CE Electrical Circuit Diagram Manual (1,567 p.), that keeps tables and diagrams; Azure subscription still Disabled.
- **WORKING:** local engine `1-boulon/rag-local/rag.py` (BM25 + structured routes + glossary + scope/injection guards), README `1-boulon/rag-local/README.md`; 1,529 tables extracted (95.6% agreement with poppler); blind retrieval 82%, held-out 17/22 (77%), refusals 6/6. $0 Copilot Studio path verified (SharePoint > Dataverse copy, page citations). Plans: `1-boulon/docs/plan-projet-boulon-poc-scolaire-v1.0.docx` (11 p.) and `...-v1.1.docx` (15 p., adds D7).
- **IN PROGRESS:** session "Multimodal RAG architecture without Azure" was still running at 16:20: end-to-end answer test on the fresh 40-q set (graders pending); `1-boulon/rag-local/blind2/contexts*.md` + `make_context.py` uncommitted edits belong to it.
- **NOT STARTED:** e5-large comparison result; name-only lookup routing; upload companion PDF to Copilot Studio; test tables/rich content inside Copilot Studio; IC PB105 <-> BE/CE mapping.
- **WHAT NOT TO RETRY:** MiniLM as primary retriever (44%); 5-pt column-gap merge; 3,500-char answer packets; shell/sed escaped edits on code-page files; deleting old Azure indexes / free search tier (subscription Disabled); SharePoint-link knowledge source for the 46 MB IC file (7 MB cap); live Azure SDK queries without credentials; `gh` commands (not signed in).
- **UNFINISHED GREG REQUESTS:** "most reliable, thoroughly edge case tested… ready to scale" (Stop-hook goal, not met). Original ask: confirm Copilot Studio handles tables/rich content — untested.
- **OPEN QUESTIONS:** Greg: approve D7 (written as adopted by a helper, never approved)? Accept targets 85% blind / 97% fidelity / 95% abstain / 0 false refusals? Which plan version goes to Dominique (v1.0 or v1.1)?
- **NEXT STEP:** before the MVP demo, read the end-to-end test result from the running session; Greg signs in to Copilot Studio and uploads the IC PDF / companion PDF; test 3 electrical questions (pass = cites IC PDF at the right page).
- **CONTEXT TO LOAD:** `5-brain/logs/eod/2026-11-05/7c03a197.md`, `c1e30a25.md`, `1-boulon/docs/mvp-school-bus-2026-11-03.md` (pivot section), continuity log entries 2026-11-05.

## DIX30 meeting → project plan
- **WHAT WE'RE BUILDING:** the "proposition de plan de projet" Dominique asked for [1:15:01].
- **WORKING:** transcript `2-projects/transcripts/Quartier DIX30 2.txt` + `.srt`; minutes `1-boulon/docs/meeting-2026-11-03-dix30.md`; plan v1.0/v1.1 (.docx); working draft `1-boulon/docs/proposition-plan-projet-2026-11.md`.
- **IN PROGRESS:** none.
- **NOT STARTED:** send to Dominique; Pierre's answer on 5 proposed 551 changes; delete old pandoc draft .docx (Greg must close it in Word first).
- **WHAT NOT TO RETRY:** openai-whisper on this laptop; `python -I`; PyAV decode.
- **UNFINISHED GREG REQUESTS:** none on the plan itself.
- **OPEN QUESTIONS:** first recipient = Dominique?
- **NEXT STEP:** Greg reads plan, re-listens the 10 flagged timestamps, sends.
- **CONTEXT TO LOAD:** `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md`, continuity log 2026-11-05 (551 conflicts).

## ThinkStation PGX (new hardware)
- **WHAT WE'RE BUILDING:** BOULON's local back end (vision model for diagrams, e5-large index, local search host).
- **WORKING:** `1-boulon/docs/pgx-integration-plan-2026-11-05.md`, `1-boulon/docs/pgx-beginner-guide.md`. Left monitor moved to the PGX (correct).
- **IN PROGRESS:** none. **NOT STARTED:** first boot (needs USB keyboard/mouse or the setup Wi-Fi/QR on the box); `nvidia-smi` test; IT network request (French, Claude drafts on yes).
- **WHAT NOT TO RETRY:** plugging the PGX into the docking station or the wall network port before IT approves.
- **UNFINISHED GREG REQUESTS:** "i need the step by step guide" — written; follow-up on keyboard/mouse answered, waiting for Greg to check the box card.
- **OPEN QUESTIONS:** is there a setup Wi-Fi name / QR on the box? Does IT allow network access?
- **NEXT STEP:** Greg borrows a USB keyboard+mouse and does guide Parts 1-3 (~40 min).
- **CONTEXT TO LOAD:** `5-brain/logs/eod/2026-11-05/94fc639b.md`.

## Workspace — hub in the cloud / tools
- **WORKING:** Azure MCP CLI test passed (`@azure/mcp@4.0.0-beta.4`, `MCP_TIMEOUT=120000`); microsoft/skills + 5 M365 skills installed (81).
- **NOT STARTED:** Azure MCP test inside Claude after restart (azure-cost MCP failed to connect at 16:16: "Incompatible auth server"); GitHub Actions test run (waits on Claude token secret; gh not signed in).
- **UNFINISHED GREG REQUESTS:** "guide me on the claude github secret again i lost track since yesterday"; "i mightve forgotten to answer to any open decisions so please point me back" — both not visibly answered.
- **NEXT STEP:** morning check gives Greg the token-secret tutorial and the open-decisions list.

## No activity today
ZBB, Daily Digest, Workshop segmentation, Workshop ID card, Media, Learning.
