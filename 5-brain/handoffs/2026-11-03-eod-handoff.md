# Morning hand-off — written by end of day 2026-11-03 (Tue), for Wed 2026-11-04
Digest: `C:\TRANSDEV HUB\5-brain\logs\eod\2026-11-03\_digest.md` · extracts beside it · RESUME `C:\TRANSDEV HUB\RESUME.md` · hand-off table `C:\TRANSDEV HUB\5-brain\handoffs\INDEX.md`.
No activity today: ZBB, Daily Digest, Learning, Workshop ID card.

## BOULON — MVP school-bus manuals (NEW SCOPE)
- **WHAT WE'RE BUILDING:** chatbot fed ONLY on school-bus (scolaire) manuals and procedures. MVP done = that corpus indexed and answering. Work orders for that bus type: optional, Greg's call.
- **WORKING:** definition = MIR `VEHICUL.TYPEVEC` 15 SCOLAIRE (`1-boulon/data/mir-export/dump/VEHICUL.csv`); decisions and build order in `1-boulon/docs/mvp-school-bus-2026-11-03.md`; continuity log entry 2026-11-03.
- **IN PROGRESS:** text scan of 2,976 SharePoint PDFs (`school-scan.jsonl`, started in session "Scholar buses chatbot MVP"); check whether it finished.
- **NOT STARTED:** final file list; delete current Free index content (irreversible; settings backed up) and load what fits under 50 MB; school-bus golden set; agent instructions "school-bus only"; methodology / professional-practice document (waits on the DIX30 transcript).
- **WHAT NOT TO RETRY:** counting LionC (type 23) as school bus; looking for Blue Bird / Thomas manuals in SharePoint (they are on maker portals); copying portal passwords from the Thomas / Minibus guides.
- **UNFINISHED GREG REQUESTS:** "make 1 final proper professional practice and professional methodology document" (search industry terminology first, use the transcript).
- **OPEN QUESTIONS:** what is "Flotte"? Keep the French procedures (Baultar seat, wiper, heater) that apply to school buses? Ticket #77048 (Basic) still with IT.
- **NEXT STEP:** read the scan result, name the school-bus file list, show Greg the size vs 50 MB before deleting anything.

## DIX30 meeting transcription → project charter
- **WHAT WE'RE BUILDING:** French transcript of `C:\Users\rilg01\Downloads\Quartier DIX30 2.m4a` (76 min) → notes → project charter.
- **WORKING:** Whisper per user; model `C:\Users\rilg01\.cache\whisper\large-v3-turbo.pt`.
- **IN PROGRESS:** transcription started 15:17 (python PID 4900, still running at 16:20). Output `C:\TRANSDEV HUB\2-projects\transcripts\Quartier DIX30 2.txt` (+ .srt .vtt .tsv .json), written only at the end.
- **NOT STARTED:** notes (decisions, actions, open questions, people); charter (goal, scope, stakeholders, risks, timeline).
- **WHAT NOT TO RETRY:** Whisper's own model download (company certificate); use `curl.exe --ssl-no-revoke`.
- **UNFINISHED GREG REQUESTS:** "we need to make sure this is done by 5pm, or that progress is saved to be resumed".
- **NEXT STEP:** if the .txt exists, organize notes; else rerun with the command in `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md`.

## Workshop segmentation
- **WHAT WE'RE BUILDING:** segment (S1/S2/S3) + medal system and one guided workbook.
- **WORKING:** `2-projects/workshop-segmentation/segmentation-atelier.xlsx` (single workbook; thresholds Argent 75% / 60% weakest pillar, Or 90% / 75%); `medaille-exemple-v2.xlsx`; `questionnaire-travaux-sur-place-LEAN.xlsx`; workflow artifact https://claude.ai/artifact/FR2sXqixgF4KmV8CdbDch7 (v4); `project-status.md`.
- **IN PROGRESS:** French message to Pierre drafted (Greg sends in Teams).
- **NOT STARTED:** tension rule choice; safety gate; 67 vs 78 grid count; review 120 FR questions; test on 2-3 real workshops; clear the test answer; D11 check.
- **WHAT NOT TO RETRY:** Python heredocs; `python -I`; writing files open in Excel (use COM live); re-running build.py onto `segmentation-atelier.xlsx` (wipes answers); COM read of the second workbook; looking for an Excel connector.
- **UNFINISHED GREG REQUESTS:** pre-send checklist text never shown in full; artifact step 4 line still a stale formula mock.
- **OPEN QUESTIONS:** Pierre's curve points (~3, 7, 12 years) — ask face-to-face, not in the message; Pierre confirms ladder groups 31.x/81.x/82.x.
- **NEXT STEP:** fix artifact step 4 line, browser-test it, show the checklist.

## Media — Geotab explainer
- **WORKING:** `3-media/film/geotab-explainer/geotab-explainer-v1.mp4` (64.9 s, 1080p60, -14 LUFS).
- **NOT STARTED / OPEN:** nobody has heard the sound mix. **NEXT STEP:** Greg watches and gives notes.

## Workspace — routines
- **WORKING:** EOD routine at 16:10, `5-brain/scripts/eod-lock.js`, short form Mon-Thu. Today's run is the first test of it.
- **UNFINISHED GREG REQUESTS:** "itd be good to clean that up and know exactly the ones we use" (22 self-improvement skills, Keep proposals in session "End of day routine performance audit"); save draft skill `scheduled-routine-audit` (yes/no).
- **WHAT NOT TO RETRY:** `/ecc:evolve`, `instinct-status`, `promote`, `prune` on this PC (observer does not run on Windows).

## CONTEXT TO LOAD
`5-brain/logs/eod/2026-11-03/_digest.md`, `1-boulon/docs/mvp-school-bus-2026-11-03.md`, `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md`, `2-projects/workshop-segmentation/project-status.md`, `5-brain/ideas/2026-W45-ideas-and-tasks.md`.
