# BOULON MVP: school-bus manuals only (scope set 2026-11-03)

Source: Greg, after the 2026-11-03 meeting (Pierre, Seb, Alex, Henri, new AI consultant). The transcript is still being made. When it is ready, check this file against it.

## MVP definition (Greg's words, 2026-11-03)
- The chatbot answers **only from the school-bus manuals and procedures**.
- **Done = the school-bus corpus is indexed and the agent answers from it.**
- Optional, Greg's call: add the work orders for that bus type (tier 2) and design an answer model for them. This is **not** part of MVP done.

## Candidate corpus (Measured 2026-10-06, `1-boulon/tests/results/library-measure-2026-10-06.jsonl`, duplicates removed)
| Folder | Files | Pages | MB | Need split | School bus? |
|---|---|---|---|---|---|
| LION | 44 | 696 | 335 | 3 | Likely (Lion makes LionC school buses). **Unconfirmed**: some files may cover other Lion models |
| IC Leeds | 1 | 1,567 | 46 | 1 | Unclear. IC Bus makes school buses, but this folder is not confirmed as school bus |
| **Total (both)** | **45** | **2,263** | **381** | **4** | |

Already in the pilot index: 16 Lion "RP-01-…" procedure sheets (`1-boulon/docs/index-facts.md`).

## Size and tier (Estimate, from the pilot rate of 87 KB per page, plus or minus 25%)
- 2,263 pages ≈ **197 MB of index** (148 to 246). The Free index cap is 50 MB and already full. **The MVP needs Basic, which is ticket #77048.**
- One Basic partition holds about 79,000 pages, so this corpus uses about 3% of it.
- One-time reading cost at CAD 13.86 per 1,000 pages: about **CAD 63 for 2 passes** (CAD 31 for one pass). This is well within the ticket budget.

## Open questions (one per person)
1. Greg: is this the full list of school-bus folders? Are there any brands not in the library (Thomas, Blue Bird, Micro Bird, Girardin), or school-bus manuals stored somewhere else?
2. Greg: should the agent's French procedures (Baultar seat, wiper, heater) that apply to school buses stay in?

## Build order (reuses `1-boulon/docs/cutover-runbook.md` and `1-boulon/rebuild/v2`)
1. Confirm the folder list (question 1).
2. Split the 4 oversize files (pre-ticket item P0-5: keep the page offset so citation links still work).
3. When Basic exists: upload with path-mirroring blob names, then run the v2 rebuild with the enrichment cache (P1-9) and the post-index link patch (P0-1).
4. Write a school-bus golden set: questions from Alex or Pierre, plus must-abstain questions for non-school-bus buses.
5. Agent instructions: answer only from school-bus manuals; otherwise say "I don't have that information".
6. Run the test: citations, pass targets (Gate B criteria), and Greg's click test, then mark the MVP done.

## Decisions (Greg, 2026-11-03, second pass)
- **Definition of "school bus" = MIR `VEHICUL.TYPEVEC` 15, labelled `TYPEAUTRE` = SCOLAIRE** (authoritative, from `1-boulon/data/mir-export/dump/VEHICUL.csv`). Type-15 makes and models: Blue Bird / Bluebird Vision (74), Freightliner Saf-T-Liner C2 (51), Thomas Saf-T-Liner C2 (5), IC PB105 (48), IC Leeds (7), Lion "LION" (3). LionC eLion (type 23, électrique, 106 units) is **out**.
- **Corpus = SharePoint only** (`OneDrive - TRANSDEV\Manuels`). Blue Bird and Thomas manuals are on the makers' portals (Blue Bird Vantage, DTNA), per the guides in `Manuels\Aide recherche information technique autobus\`; they come later.
- **A file is in only if its own text is about school buses**, including component manuals. Proof = the text scan (`school-scan.jsonl`) plus folder.
- **Replace now, fit what fits:** delete the current Free index content and load school-bus files up to the 50 MB cap; the rest goes in when Basic (#77048) lands.
- "Flotte" (where the guide says Lion info lives): unknown to Greg. Open.
- Security note: the Thomas and Minibus guides contain portal usernames and passwords in plain text. Not used, not copied.

## Decision 2026-11-04 (Greg): MVP bus type = ZBB class STANDARD SCHOOL
- Supersedes the 2026-11-03 wording "TYPEVEC 15 SCOLAIRE": same core, now named by the ZBB class (`C:\ZBB\zbb_engine\mir.py` line 40) = MIR TYPEAUTRE `SCOLAIRE` + `SCOLAIRE ADAPTÉ`.
- Fleet (VEHICUL.csv, all records): Blue Bird Vision 74, Freightliner/Thomas Saf-T-Liner C2 60, IC PB105 48, IC Leeds 7, Lion 3, Blue Bird TC3000 1.
- Out: MINI SCHOOL (minibus scolaire), E STANDARD SCHOOL (LionC electric).
- A manual is in scope when its text names one of these makes/models or a component fitted to them (scan `1-boulon/tests/results/school-scan.jsonl`).

## Scan result 2026-11-04 15:45 (source: `1-boulon/tests/results/school-scan.jsonl`, 2,976 PDFs, 15 unreadable)
- Only ONE SharePoint manual is a STANDARD SCHOOL vehicle manual: `IC Leeds/IC bus 2016-2024.pdf` (names PB105; 2,938k text chars, about 1,567 pages, PDF 46 MB per the 2026-10-06 measure).
- No Blue Bird, Thomas or Freightliner Saf-T-Liner C2 vehicle manual is in SharePoint (they are on the makers' portals, as the guides in `Manuels\Aide recherche information technique autobus\` say). Those makes are 135 of the 193 STANDARD SCHOOL vehicles.
- The 22 other hits are generic component manuals (Bendix, Meritor, Ricon, Proheat, Sportworks) that mention "school bus" or "Blue Bird" once or twice; they are not school-bus manuals.
- Scan pattern flaws to fix next run: "IC Bus" also matches "electrIC BUS" (52 files), "Vision" matches the word vision (122 files).
- Index estimate (Estimate, pilot rate 87 KB/page): IC Leeds manual alone about 136 MB, so it does not fit the 50 MB Free index. A Free-tier sample would be about 570 pages (chosen chapters).
- 2026-11-04: Greg rules out external manuals for good; corpus = SharePoint only. MVP corpus = IC Leeds manual (sample to fit Free 50 MB, rest on Basic).
