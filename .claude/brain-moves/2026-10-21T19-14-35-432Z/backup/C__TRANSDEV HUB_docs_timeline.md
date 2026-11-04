# BOULON RAG Build — Project Timeline & Time-Keeper Log
**Set up:** 2026-09-22 (Tuesday) | **Purpose:** one place tracking the whole project end to end — planned dates, what's actually happened, and whether we're ahead, on track, or behind. Updated as we go without being asked; I'll flag plainly the moment something drifts from plan.

**How to read the dates below:** working estimates built from the time estimates in the Implementation Spec doc, laid onto a real calendar (business days, skipping weekends). Not commitments carved in stone — I'll re-date openly the moment reality diverges.

---

## Where we actually are right now (2026-09-22, afternoon EDT)

**Ahead of plan.** Step 1.5 (build + verify the index) is now fully done — same day it started, originally estimated to spill into 2026-09-23. Two real snags along the way, both resolved:
1. `gpt-4o-mini` (originally planned chat model) turned out to be deprecated since March 2026 — swapped to `gpt-5-mini`, trivial cost increase.
2. **Plan correction:** I can't reach Azure directly from this workspace (org network policy on my side) — Step 1.5c/d were reassigned from "me, via API" to "you, via the Import and vectorize data wizard." Turned out faster than the original plan anyway.

**Verified working, with evidence:** indexer `multimodal-rag-1790098589411-indexer` finished with status Success, 23/23 docs, 0 errors/4 warnings. A real test question ("tools + time for a BTMS repair") returned the correct answer with a high relevance score, pulled from the right manual, plus a second supporting manual, plus working image-verbalization on diagrams/screenshots. This is real evidence the multimodal RAG pipeline works, not just a passed setup checklist.

**One accepted, logged gap:** 2 of the 25 pilot PDFs (103MB, 23MB) were too large for the Free/Basic tier's 16MB extraction limit and got excluded (source of the 4 warnings). Greg's explicit call: don't spend time/tokens splitting them now — revisit later only if testing shows it actually matters.

Moving into Step 1.6 next.

---

## Full project timeline

| Phase / Step | Owner | Est. duration | Target dates | Actual status |
|---|---|---|---|---|
| 1.1 Confirm pilot document list | You + me | Same day | 2026-09-22 | Open (non-blocking) |
| 1.2 Live Azure pricing | Me | Same day | 2026-09-22 | ✅ Done |
| 1.3a-e Azure resource setup | You | Under 1 hr | 2026-09-22 | ✅ Done |
| 1.4 Upload manuals | You | Under 1 day | 2026-09-22 | ✅ Done |
| 1.5a-b Deploy embedding + chat models | You | Same day | 2026-09-22 | ✅ Done (with a model substitution — see above) |
| 1.5c Build the index (wizard) | You (plan corrected — was going to be me) | 2026-09-22 → 2026-09-23 | 2026-09-22 | ✅ Done — same day, ahead of estimate. 2 Vicinity files excluded by 16 MB tier limit (103 MB, 23 MB); 2 manuals truncated at 262K chars. (Corrected 2026-09-23: 4 warnings = 2 excluded + 2 truncated; see review-architecture.md C1.) |
| 1.5d Verify the index works | You + me | Same day as 1.5c | 2026-09-22 | ✅ Done — real test query confirmed correct, high-relevance, multimodal results |
| 1.6 Add "don't guess" safety layer | You (settings) | A few days | 2026-09-23 → 2026-09-24 | ✅ Done 2026-09-22 (Corrected 2026-09-23: owner is Greg for settings changes; Claude for docs/instructions. Settings + instructions done; verification layer not built — see review-architecture.md C2.) |
| 1.7 Connect index into Copilot Studio (test agent) | Me | Under 1 day + buffer | 2026-09-25 → 2026-09-28 | ✅ Done 2026-09-22 |
| 1.8 Test pilot against real questions | Me + you | About a week | 2026-09-29 → 2026-10-05 | Started 2026-09-23 (ahead) |
| **Phase 1 complete (target)** | | | **Re-dated: ~2026-09-25 (was 2026-10-05)** | |
| 2.1 Confirm first specialist | You (+Henri) | Same day | 2026-10-06 | Not started |
| 2.2-2.4 Build, connect, test first specialist | Me (+you) | ~1-1.5 weeks (estimated) | 2026-10-07 → 2026-10-13 | Not started |
| **Phase 2 complete (target)** | | | **~2026-10-13** | |
| 3.1 Remaining specialists (assuming 2 more) | Me (+you) | ~1 week each (estimated) | 2026-10-14 → 2026-10-27 | Not started |
| 3.2 Extend search index to full 100+ manual library | Me | Mostly automated re-run | 2026-10-28 → 2026-10-30 | Not started |
| 3.3 Final review with Henri | You, me, Henri | Depends on Henri's calendar | Week of 2026-11-02 | Not started |
| **Phase 3 / project complete (target)** | | | **~early November 2026** | |

Phase 2/3 durations remain my own estimate, not a separately researched figure. Dates through Phase 1 nudged earlier given today's pace (all of Steps 1.3–1.5 completed same-day).

---

## Running time log (raw entries, most recent first)

| Timestamp | Event |
|---|---|
| 2026-10-21 (Wed, morning) | Morning check (run on the session hook, not on request). Repaired a garbled D4b row in the continuity log (decision and reasoning merged into one cell; a copied tail removed). Search service answers (401 without key) with `--ssl-no-revoke`; plain curl fails TLS on this PC (certificate revocation check). `.env` key still a 14-character placeholder (fine: no Azure step today). Inbox digest folder is empty. `RESUME.md` is 0 bytes (end-of-day 10-20 wrote no hand-off). EOD marker = 10-20, so the 16:45 reminder fires. Waiting on: IT ticket 77048; Henri (Exo Rails); Sebastien (needs). |
| 2026-10-15 | **Outside method check (TikTok RAG video, 15 of 15 frames read):** standard recipe, nothing new on cost or security; its value is the evaluation habits (known-answer question set, retrieval tested apart from generation, answer-supported check), which the golden set already mostly covers. Four free gaps logged in the continuity log. |
| 2026-10-06 | **Citation fix applied on the live v1 index (no IT needed):** added `title` (manual name + page, e.g. "Vicinity Service Manual, p. 22") and `url` to all 2,250 chunks; index definition backed up; vector + semantic search re-checked OK. Script `rebuild/v1-citation-fix/apply-citation-fields.js`. Third field `metadata_storage_path` added but not filled: Free-tier quota exceeded (writes blocked, reads fine). Greg's Test-panel check: the citation now names the manual (ledger #112); the link fails (private storage). Two-tier knowledge structure and Gate board added to the continuity log. |
| 2026-10-06 | **Viability check** (4 agents, details in `docs/viability-check-2026-10-06.md`): MIR data sized (design C, 2.54 GB, fits Basic); ticket re-verified against Microsoft (prices stale, "two passes" unsupported, 1-copy Basic has no SLA, Copilot Studio credits not in ticket); cost audit 1.7k to 2.9k expected, 8.3k worst case; design review: Phase 1 viable with changes, ticket viable (don't resend), Phase 2 not viable as planned until redesigned statistics-first and backtested. Day plan set around Henri call 9:30 and ZBB onboarding 2:30. |
| 2026-10-06 | **Citation link fixed end to end** (Greg's click test passed: label + page + link opens at the page; ledger #114-115), index rebuilt in place with SharePoint links, 23/23 links checked, golden v1 41/41, `tests/check-citations.js`. Tier 2 parked (Greg). Schedule reset in BOULON HQ (Today and Week tabs). |
| 2026-10-07 (end of day) | **END OF DAY.** Research crawl done; Content Understanding reader about CAD 1,150 all-in fits the CAD 1,200 ceiling (D36, no ticket change). Resume section for the internship drafted with the resume-tailoring skill. Waiting on Greg: original job posting, top 3 brands, mechanics' language. Waiting on IT: ticket 77048. |
| 2026-10-07 | **Project brief 551 (4 May 2026) ingested as the source of truth**: 3 workshops (Beloeil, Sudbury, Kitimat), 15 users, French/English/Spanish, KPIs, estimated project cost CAD 5,510.50 without an Azure Search line. Routed to CLAUDE.md, log, wiki, memory, HQ, costs document. |
| 2026-10-06 (end of day) | Decisions: Tier 2 parked; scope = entire folder; schedule lives in HQ; Claude is PM reporting to Greg. Blockers: Basic tier (ticket 77048). Waiting on Greg: v2b rerun, two yes/no answers, brands to load first. Waiting on Claude: score the rerun, next agent change, Basic trial script and cutover runbook. |
| 2026-10-05 | **MIR export received** from Alex (`dump.zip`, in `data/mir-export/dump/`): 426,883 work orders 2014–2026, ~4.99 M job lines, 1.27 M task lines, vehicles, code lists. Phase 2 simplified by Greg (no expert scoring, no data cleaning/quality report, mechanic-rating rule removed). Plan, MIR data map, continuity log, memory updated. Update for Henri written in French; Henri moved the call to 2026-10-06; message to Henri drafted (ask: push IT on #77048). Blocked only by ticket #77048. |
| 2026-10-01 | Alex agreed to read-only MIR access, sent the MIR data dictionary (330 pages); mapped the tables (`docs/mir-data-map.md`); verified Azure limits on Microsoft Learn (24 billion docs/index) to answer Alex's scale doubt; exact column list sent to Alex and accepted. HQ v47–53. |
| 2026-09-30, 16:50 EDT | **End of day.** Ticket #77048 still under IT analysis (no reply by 09:05; no nudge, per Greg). Note to Henri sent; reply to Henri's "what is the subscription for" drafted. AIOS kit installed, onboard intake started (Q1 of 7); ~114-page wiki and motion-library built. Waiting on: IT (ticket), Alex (MIR access, back Thu 10-01). Nothing blocked for Claude. |
| 2026-09-29, morning EDT | Automatic morning check (Greg away). No logged work since 09-25 13:45. Overnight inbox folder is empty (email digest not producing files yet), so no ticket number or IT reply known. Search service up (401 without key); .env key is a 14-character placeholder (fine: no Azure step today). Log tables clean; end-of-day marker holds 09-24, so 16:45 reminder will fire. HQ not republished (no publish tool in this unattended run). |
| 2026-09-25, ~13:45 EDT | Ticket sent by Greg (option A); rebuild config switched to keys. Learn-eval over all 11 past sessions: skills transdev-pc-shell-quirks + boulon-morning-check saved. Session-start hook + email-digest steps (Power Automate) done; digest waits on Greg (15 min). BOULON HQ Control room built and verified (docs/hq-control-room.md). |
| 2026-09-25, morning EDT | Session start. Hand-off read; garbled 1.9 row in continuity log repaired; search service up (401 without key), .env key is a placeholder so no index tests until the Basic key exists; end-of-day reminder confirmed for 16:45; HQ refreshed (v34). Waiting on Greg: A or B for ticket v6. |
| 2026-09-24, ~13:50 EDT | Phase 2 scope review done: Basic confirmed for phases 1 and 2 (one re-decision at go/no-go). Azure ticket v2 ready to submit. v2 citation fix and test-script fixes done. ADR 0001–0003 created. |
| 2026-09-24, ~15:50 EDT | Azure ticket v3: region switched to Canada Central (Canada East lacks AI enrichment per Microsoft). Agent-test route changed to a Power Automate flow (no app registration). GateGuard exemptions + 16:45 end-of-day hook added. |
| 2026-09-24, ~16:15 EDT | Region/compatibility check of every Azure resource (DNS + Microsoft Learn). Ticket v4: Canada Central + keyless billing to the existing AI resource. On hold for 3 portal checks by Greg (~5 min). |
| 2026-09-24, ~16:30 EDT | Portal checks confirm the plan (AI resource = AIServices, Canada East; Greg = Owner). Azure ticket v4 cleared to submit. |
| 2026-09-24, ~16:55 EDT | Ticket v5: one-time indexing budget (~$650, ceiling $1,200) added; PDF-reading billing moved to a new pay-per-use AI resource in Canada Central (Document Intelligence not sold in Canada East). |
| 2026-09-24, ~17:20 EDT | END OF DAY. Ticket not submitted: final form agreed (3 items in Canada Central: Basic, pay-per-use PDF-reading AI resource, one-time budget ~$650/max $1,200). Waiting on Greg: A (keys, recommended) or B (managed identity). Waiting on Alex: MIR Q13. Power Automate agent-test trial after the ticket. |
| 2026-09-23, 17:00 EDT | **End of day.** Fixes 1–2 applied (Fix 2 PASS). Agent published. Direct Line works on the Europe endpoint but is blocked by the sign-in setting. Storage key works. D3, D12, D13 and D14 decided. D4 = paid Basic, **awaiting Henri's approval**. D1 leaning toward loading the full core library. D2 open. Manuals inventory: 3,052 files / 6.95 GB. Master timeline and a 111-test ledger built. Report + cost request v6 ready: send it Thu morning, present it at Henri's 4:30 check-in. v2 index config drafted offline. Internal target launch is Oct 16 (docs/plan-to-oct16.md), **not shown to Henri** (no-projections rule). |
| 2026-09-23, ~10:45 EDT | Resumed after reinstall. Golden set v0 built and run against the index: semantic 10/10, hybrid 9/10, keyword 8/10. Step 1.8 index side essentially done; agent side waits on Greg's Test panel run. |
| 2026-09-23, morning EDT | **Moved to Claude Code.** Azure now reachable directly — Claude can run index tests itself again. Steps 1.6 and 1.7 were already done (per Continuity Log), so **Step 1.8 starts today, ~6 days ahead of its 2026-09-29 target.** Phase 1 target pulled in to ~2026-09-25 if tests pass. |
| 2026-09-22, afternoon EDT | **Step 1.5c and 1.5d both confirmed done.** Indexer Success, 23/23 docs. Real test query returned correct, high-relevance, multimodal (image-verbalized) results. Greg decided to skip splitting the 2 oversized PDFs for now — logged as an accepted gap, not a blocker. Moving to Step 1.6. |
| 2026-09-22, 1:20 PM EDT | **Plan correction:** discovered I can't reach Azure directly from this workspace (network policy). Reassigned Step 1.5c/d from "me" to "you, via the Import and vectorize data wizard." Both models confirmed deployed (embedding + gpt-5-mini after the 4o-mini deprecation swap). |
| 2026-09-22, 12:59 PM EDT | Search endpoint+keys received, Step 1.3e fully closed. Step 1.5 broken into sub-steps. |
| 2026-09-22, 12:11 PM EDT | All of Step 1.3 (a-e) and Step 1.4 confirmed complete. Ahead of pace. |
| 2026-09-22, 12:02 PM EDT | Step 1.3d (Foundry) done; Foundry + Storage keys/endpoints collected. |
| 2026-09-22, ~morning | Azure account created; Steps 1.3a-1.3c done. |
| 2026-09-22, ~midday (earlier) | Live Azure pricing confirmed (~$615 CAD for a 6-month pilot); Step 1.2 closed. |

---

## What triggers a re-date
I'll update target dates (and say so plainly) whenever: a step takes meaningfully longer than its estimate, a step needs something from you that doesn't arrive on the assumed same-day turnaround, or a real correction to the plan (like today's) changes who does what.

| 2026-10-08 (Thu 16:00) | Ticket #77048 silent 13 days. Wrote `docs/cutover-runbook.md` (P1-7) and the French note to Henri (`docs/it-requests/2026-10-08-note-henri-billet-77048.md`, Greg sends). P1-9 enrichment cache checked: preview feature, not added to rebuild/v2 until verified. |
| 2026-10-14 (Wed, morning) | Back from long weekend. Morning check: ticket #77048 still pending (Greg). Search service up; .env key still placeholder. ZBB state reviewed (C:\ZBB wiki: 4 sources ingested; OneDrive ZBB folders still show 0 files, final COEFFS CLASS REGION code not yet read). Day plan given to Greg. |
| 2026-10-14 (Wed) | ZBB: full read of mega_script_v3.py, ZBB.py and Données_PB.csv. Model check: the degree-15 curve is within 0.3–6% of a plain bin average; negative costs only outside the recommended km range; author = Matteo D'Alena (former intern, has left; not contactable). Written to C:\ZBB\wiki\syntheses\takeover-brief.md. REGION version folder still 0 files on OneDrive. |
| 2026-10-14 (Wed) | ZBB source of truth set by Greg: `ZBB Final New UX` (mega_script_v3.py, Données_PB.csv, ZBB.py) + the intern's handover; runs on Greg's PC. Wiki updated (C:\ZBB). No contacts for ZBB. Deep work continues in the ZBB project. |
| 2026-10-20 (Tue) | Learning: cloned ai-engineering-from-scratch into `references/`, routed in CLAUDE.md, installed `learn`/`start-learning`/`check-understanding` skills. Lesson 1 (Linear Algebra Intuition) done, quiz 2/3, logged in LEARNING.md. |
| 2026-10-20 (Tue) | Learning: Lesson 2 (Vectors, Matrices & Operations) done, quiz 1/2, logged in LEARNING.md. Process fix: teach every quizzed concept before quizzing. |
| 2026-10-20 (Tue) | Learning: Lesson 3 (Matrix Transformations) done, quiz 2/3, logged in LEARNING.md. Phase 1 progress: 3 of 22 lessons. |
| 2026-10-20 (Tue) | Learning: rebuilt `learning/matrix-cheatsheet.html` as an exam-style reference (29 entries, test-data driven), published v2. Review quiz 4/4 after re-teaching. Added eigenvector and low-rank step-by-step entries. |
| 2026-10-20 (Tue) | Learning: Lesson 4 (Calculus for ML) done, quiz 3/3, logged in LEARNING.md. Cheat sheet v4 adds Part 5 Calculus (5 entries with sliders). Phase 1 progress: 4 of 22 lessons. |
| 2026-10-20 (Tue) | Learning: Lesson 5 (Chain rule & autodiff) done, quiz 3/3 after guided steps; cheat sheet v5 adds 6 entries plus symbol rows (relu, x₁, ∂, +=). Greg asked for real symbols and original wording with decoding: saved as feedback. Phase 1 progress: 5 of 22. |
| 2026-10-20 (Tue) | Learning: Lesson 6 (Probability & distributions) done, quiz 3/3 with decoding guides; cheat sheet v6 adds Part 6 (6 entries). Phase 1 progress: 6 of 22. |
| 2026-10-20 (Tue, end of day) | Learning Phase 1 lessons 1-6 done (cheat sheet v6). Drafted a French text for Henri: ask for Exo Rails updates and who to contact for IT help (Greg sends; project not described in any BOULON file). Waiting on Greg: send the text; top 3 brands and mechanics' language; job posting. Waiting on IT: ticket 77048. |
| 2026-10-20 (Tue, 17:00) | Exo Rails: Henri replied he is preparing something and will come back; he suggests Greg ask Sebastien whether he has needs Greg can help with. Greg will contact Sebastien (text drafted). Waiting on Henri (what he prepares) and Sebastien (needs). |
| 2026-10-21 (Wed) | Learning: Lesson 7 (Bayes theorem) done, quiz 3/3; counting method worked best for Greg; cheat sheet v7 adds Part 7 (5 entries). Phase 1 progress: 7 of 22. |
