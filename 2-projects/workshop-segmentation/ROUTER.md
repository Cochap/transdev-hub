# ROUTER — workshop-segmentation
Bus maintenance workshop segmentation for Transdev Canada (ID card, three segments, bronze/silver/gold maturity). Assigned to Greg 2026-10-27. Compiled knowledge lives in the wiki: `1-boulon/wiki/projects/workshop-segmentation.md`. Confidential: the meeting asked to limit sharing the method with external AI tools; this folder stays local.

## Contents
- `cloud-repo/` — local git repo (workbooks, compte rendu, task briefs, results/) to push to a private GitHub repo so cloud routines can run the analyses → ROUTER.md
- `raw/` — immutable originals of this project (drop new meeting files, slides, spreadsheets here before ingesting) → ROUTER.md
- `~$banc-essai-segmentation-v2.xlsx` — Excel workbook
- `~$segmentation-atelier.xlsx` — Excel workbook
- `backup-banc-essai-segmentation-v2-2026-10-29.xlsx` — Excel workbook
- `backup-questionnaire-travaux-sur-place-2026-10-29.xlsx` — Excel workbook
- `backup-questionnaire-travaux-sur-place-2026-11-03.xlsx` — Excel workbook
- `banc-essai-segmentation-v2.xlsx` — CURRENT test bench: 16 imaginary workshops, provisional curve parameters, 12 property tests (all OK on 2026-10-29); supersedes banc-essai-segmentation.xlsx
- `banc-essai-segmentation.xlsx` — superseded first test bench
- `brief-checkin-2026-10-29.md` — French brief for the Thu 10-29 check-in with Henri and Pierre: agenda, scripts, Greg's positions, stock plan, reference cases
- `compte-rendu-v0.2-corrections.md` — 2026-10-29: corrections to compte rendu v0.1 (Q01-Q18 status, dated decisions D13-D16, actions A01-A12)
- `grille-segment-medaille.html` — visual explainer (French), published at https://claude.ai/artifact/NSkN343P9qyuGAyFstAdi2: how to read a grid row, mission + tension classification, levels 0-3, bar per segment, medal rule, simulator
- `medaille-exemple-v2.xlsx` — CURRENT (2026-11-03): same as medaille-exemple.xlsx, with ladder practices grouped as x.1/x.2/x.3 (30, 31, 39, 81, 82); 110 numbers for 120 rows
- `medaille-exemple.xlsx` — superseded by -v2: the 120 referential practices (Audit tab of Scoring test.xlsx, minus segment rows) with S1/S2/S3 tag, replaced-by rule, random sample answers; pick a segment and the medal recalculates (example thresholds)
- `project-status.md` — PM status file: what Greg confirmed at the 2026-10-27 interview, material received, next actions for the Thu 10-29 check-in
- `proposition-segment-medaille-2026-10-30.md` — French from-zero proposal for the Fri/Mon call: mission sets base segment, tension moves one step, no weights; medal by levels 0-3
- `proposition-segment-medaille.html` — the proposal for Eckern as a visual page (French): problem, idea, mission, tension, medal, example, why sturdier, asks
- `questionnaire-niveau-maintenance-v2.xlsx` — superseded draft (level 2-4 wording); kept until Greg closes it
- `questionnaire-niveau-maintenance.xlsx` — bilingual FR/EN form (from referential p. 41): work items and equipment per maintenance level 2-4, Oui/Non dropdowns, auto level and base segment; header for workshop manager, technical lead, auditor
- `questionnaire-travaux-sur-place-LEAN.xlsx` — 2026-11-03 lean labels (short workflow annotations); replaces the original once Greg closes it in Excel
- `questionnaire-travaux-sur-place.xlsx` — CURRENT form (FR/EN, 2026-10-29): S1/S2/S3 work and equipment from referential p. 41, majority rule, automatic base segment and coherence check (supersedes questionnaire-niveau-maintenance.xlsx and -v2)
- `segmentation-atelier.xlsx` — CURRENT single workbook (2026-11-03): 0 Atelier → 1 Travaux → 2 Effectif → 3 Audit → 4 Résultat + Paramètres; clickable step bar, one red "do this" line per tab, short guide column, all criteria as French yes/no questions (audit hover = referential text); tested in Excel: C03 sample = S2 bronze, 7 techs = S1. Supersedes the questionnaire + medaille-exemple for filling
- `warroom-2026-10-29.md` — 4-voice ECC council (French): self-assessed targets vs computed segment; verdict = computed / claimed / final decision columns, signed capped overrides, equipment criteria in v2
- `workflow-segment-medaille.html` — 2026-11-03 walkthrough (EN) of the full process with the three workbooks: questionnaire → staffing check → test bench → required practices → medal, plus live simulator; published https://claude.ai/artifact/FR2sXqixgF4KmV8CdbDch7
