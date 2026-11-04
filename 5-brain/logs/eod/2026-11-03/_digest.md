# End-of-day digest 2026-11-03 (Tue), 5 sessions
Short form (Mon-Thu). Extracts beside this file. Cross-checked with the session list: every session active today is in the index.

## 1. Segmentation progress and schedule (2b600f87), workshop segmentation
- Purpose: build ONE guided workbook (segment, staffing, audit, medal) with new medal thresholds, plus a French message to Pierre.
- Decisions (Greg): ladder practices share a number with sub-numbers (30.1/30.2/30.3); one workbook with a lean guide on every tab; medal rule (Greg + Gabriel): bronze = everything below silver, gold below 100%; Argent 75% total / 60% weakest pillar, Or 90% / 75%; do NOT ask Pierre for the 3 curve points in the message, keep it for the face-to-face; Pierre messages use the segmentation-voice skill.
- Facts: Pierre has no formula for the staffing curve (slide 52), he drew it on a whiteboard. Gabriel: workbook "pas pire". Severe conditions OR >20 models = one x0.8 on expected buses per technician (not cumulative; not in audit or medal). Placeholders still invented: 70, 20%, 0.8. "En place" answers in medaille-exemple are random (10-29).
- Files (`2-projects/workshop-segmentation/`): `segmentation-atelier.xlsx` (new single workbook, Greg's one test answer kept), `medaille-exemple-v2.xlsx` (120 rows, 110 numbers), `questionnaire-travaux-sur-place-LEAN.xlsx` + backup, `workflow-segment-medaille.html` (artifact https://claude.ai/artifact/FR2sXqixgF4KmV8CdbDch7 v4), ROUTER.md, project-status.md; memory `feedback-lean-excel-cells.md`.
- Open: Greg sends the French Pierre message (Teams); face-to-face with Pierre on curve points (~3, 7, 12 years) or whiteboard photo; Pierre confirms ladder groups 31.x/81.x/82.x and thresholds; tension rule (curve only, or 2 of 3 ratios); safety gate yes/no; 67 vs 78 grid count; review 120 FR questions; test on 2-3 real workshops; clear the test answer; D11 check. Verdict: internal draft only, not for workshops.
- Half done: artifact step 4 line still shows a stale formula mock; LEAN file not visually checked; artifact not browser-tested; pre-send checklist text never shown in full.
- Don't retry: Python heredocs; `python -I` (loses openpyxl); overwriting files open in Excel (edit live via COM); re-running build.py onto segmentation-atelier.xlsx (wipes answers); COM read of the second workbook; looking for an Excel connector.
- Preferences: explainer cells were "AI slop": concise workflow labels only (memory saved); caveman-style briefs; plain-language explanations.

## 2. Scholar buses chatbot MVP (be1ed6ea), BOULON
- NEW SCOPE after the meeting with Pierre, Seb, Alex, Henri and the new AI consultant: MVP chatbot fed ONLY on school-bus (scolaire) manuals and procedures; work orders for that bus type optional, at Greg's discretion.
- Decisions: school bus = MIR `VEHICUL.TYPEVEC` 15 (SCOLAIRE): Blue Bird Vision 74, Saf-T-Liner C2 56, IC PB105 48, IC Leeds 7, Lion 3. LionC eLion (type 23, 106 units) OUT. Corpus = SharePoint `Manuels` only; Blue Bird and Thomas manuals live on maker portals (later). A file is in only if its own text is about school buses. Replace the current Free index now with what fits under 50 MB; the rest when Basic (#77048) lands.
- Open: full-text scan of 2,976 PDFs (`school-scan.jsonl`) was running at 15:59; final file list not named. Risk: very little may be left. Free tier indexes about 20 docs/day. Deleting the current index is irreversible (settings backed up). "Flotte" unknown. Methodology / professional-practice document waits on the DIX30 transcript.
- Security note: the Thomas and Minibus guides hold portal passwords in plain text; not used, not copied.
- File: `1-boulon/docs/mvp-school-bus-2026-11-03.md`; continuity log entry 2026-11-03.

## 3. Whisper setup for French transcription (1f50e746), meeting DIX30
- Whisper installed per user (no admin), torch CPU. Model `large-v3-turbo.pt` downloaded with `curl.exe` after Python hit CERTIFICATE_VERIFY_FAILED. Transcription of `C:\Users\rilg01\Downloads\Quartier DIX30 2.m4a` (76 min) started 15:17; at 16:20 python PID 4900 was still running (3.3 GB). Output goes to `2-projects/transcripts/` (empty so far; Whisper writes only at the end).
- Hand-off: `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md`. Next: notes (decisions, actions, questions, people), then the project charter.
- Don't retry: Whisper's own model download on the company network.
- Unfinished Greg request: "we need to make sure this is done by 5pm, or that progress is saved to be resumed".

## 4. Explainer video production (821bd967), media
- Geotab-at-Transdev explainer, angle A "It was warning us"; history and fleet count dropped (Greg). Facts from geotab.com only (40% collision claim labelled as Geotab's).
- Output `3-media/film/geotab-explainer/geotab-explainer-v1.mp4`: 64.9 s, 1080p60, -14 LUFS. About 56 Higgsfield credits + 1 ElevenLabs take. Installed playwright+Chromium, faster-whisper, opencv-python, pyloudnorm.
- Open: nobody has listened to the sound mix yet (Greg reviews).

## 5. End of day routine performance audit (7fafdf3c), workspace
- EOD ran 11-40 min from 16:45. Fixes: routine 16:10, `5-brain/scripts/eod-lock.js`, gather skips routine runs and auto-summaries, Mon-Thu short form, morning check reads newest hand-off + missed days. This run is the first real test.
- Fact: ECC continuous-learning-v2 observer does not run on Windows (needs WSL2/Linux/macOS, ECC #2489), so instincts stay empty.
- Open (Greg): save draft skill `scheduled-routine-audit` (yes/no); cleanup of the 22 self-improvement skills (table with Keep proposals, no decision). Request quoted: "itd be good to clean that up and know exactly the ones we use".
- Don't retry: `/ecc:evolve`, `instinct-status`, `promote`, `prune` on this PC; treating learn-eval as an instinct source.

## Ideas floated today
- MVP = school-bus manuals only (adopted). Professional methodology document from the transcript (not started). Single guided segmentation workbook (done). Self-improvement skill inventory (in progress).
