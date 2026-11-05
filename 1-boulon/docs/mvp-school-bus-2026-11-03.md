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

## Transcript check (2026-11-05, `2-projects/transcripts/Quartier DIX30 2.txt`)
- **Confirmed:** school bus as proof of concept v0.1, Pierre agrees ("c'est notre priorité") `[0:46:05]`; Quebec first `[1:06:45]`; documentation only in v0.1 `[1:07:59]`; work orders are phase 2 ("En deux étapes") `[0:55:21]`. The old wording "work orders optional" is superseded by phase 2.
- **New:** firm group presentation in February `[0:49:46]`; seniors validate before juniors get access `[0:37:18]`; test day at Saint-Jean with Mario's team `[0:50:37]`; 75% threshold to split results by system `[0:48:28]`; one language first `[1:03:33]`.
- **Tension (open):** Pierre's example is "Thomas 2016, brakes, page 712" `[0:57:48]`, but Thomas manuals are on maker portals, which Greg ruled out on 11-04. Decision asked in `1-boulon/docs/proposition-plan-projet-2026-11.md` §12.

## Free path check (2026-11-05)
- **Azure today:** Greg's account sees ONE subscription only, "Azure subscription 1", state Disabled (live `azmcp subscription list`, 2026-11-05). Getting out of Disabled means upgrading to pay-as-you-go, and Microsoft requires a payment method (https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/subscription-disabled). A Free search tier inside it would then be $0, but it is blocked until a card is approved. Deleting old indexes does not help while the subscription is Disabled.
- **$0 path with page citations (verified on Microsoft Learn 2026-11-05):** in Copilot Studio, Add knowledge > **SharePoint** > Browse items (the "Upload files > SharePoint" path). The file is copied into Dataverse, up to 512 MB per file, and "PDFs added through this path support page-level citations" (https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-unstructured-data). No Azure needed. It uses Dataverse storage and Copilot credits (already in brief 551). Document libraries are not supported; single files and folders are. Sensitivity-labelled PDFs show "Ready" but never answer.
- **Fallback:** direct file upload (512 MB, document-level citations only).
- **IC file content (opened 2026-11-05):** `IC Leeds/IC bus 2016-2024.pdf` is the **"MY 2016-2024 IC Bus BE / CE Series and Electric CE Bus — Electrical Circuit Diagram Manual"**, revision 7, March 2024, 1,567 pages, 45.9 MB, not encrypted. It is circuit diagrams, fuse and relay charts, not a full service manual. Demo questions must be electrical: fuses, relays, circuit numbers, wire colours, connector locations. The mapping of MIR "IC PB105" to the BE/CE series is not checked.

## 2026-11-05 pivot: Azure-free multimodal pipeline
**Why.** The $0 fallback above (Copilot Studio knowledge from SharePoint/Dataverse) is text-only RAG. The maintenance documents are rich (tables, diagrams), so it cannot meet the multimodal MVP requirement (raised by Greg, agreed). The target architecture (layout extraction + image verbalization + Azure AI Search) does not change. The Azure subscription is still Disabled and needs a payment method (Pierre).

**What was built (code: `1-boulon/rag-local/`).** Local, offline, deterministic ingestion of the IC BE/CE Electrical Circuit Diagram Manual (1,567 pages, vector drawings, no scanned images), about 2 min on laptop CPU:
- Tables rebuilt from word coordinates + PDF ruling lines, merged cells filled, option-marker legends attached: 1,529 tables, ~12,600 rows; 777 bound to their own connector ID.
- Fuse/relay charts (sheets 2.24-2.34, PDF p.64-74) captured after a gap was found (the first "100% fuse" score covered a tiny slice).
- Relay-panel graphic (p.64) verbalized spatially: 36/36 slots correct vs the rendered image.
- Diagram pages: components (name + ID), wires (circuit + gauge/colour), sheet cross-refs CHx_y.
- Independent poppler `pdftotext -layout` text per page as a fallback chunk.

**Reference engine (`rag.py`).** BM25 code-aware + title boost + RRF with multilingual embeddings; structured routes that add rows (connector+cavity, fuse chart, relay slot); FR-EN glossary; scope guard (other makes abstain, which answers the "Thomas 2016 page 712" case honestly); injection refusal; out-of-domain gate only when no electrical term; value-evidence gate; citations = section + printed page + PDF page.

**Results (honest).**
| Test | Result | Caveat |
|---|---|---|
| Self-generated golden (190 q, EN/FR) | 98% answer rows, 10/10 abstain | Built from our own extraction: self-consistency only |
| Fidelity vs poppler | 95.6% row agreement | Weak: "GAUGE" connector tables ~67%, some fuse-description tables (partly poppler layout splits); visual review ongoing |
| Blind set (45 q, 21 FR / 24 EN, from page images only) | 53% untuned -> 82% | Odd ids dev, even ids held out, reported once at the end |
| Must-answer (electrical words like oil/pressure/bypass) | false refusals 5/15 -> 1/15 | Known leak: one refuse case (sensor ohms) answered |
| Latency | 5-100 ms per question | Engine only, no LLM generation |

**Scale path.** The same per-page enriched output (tables as markdown, verbalized graphics) feeds (a) Copilot Studio knowledge files now, (b) Azure AI Search when the subscription is reactivated, (c) the GB10 128 GB machine for a local vision model on the remaining pure-graphic pages.

**Open.** Answer generation (LLM) in Copilot Studio not tested end-to-end; IC PB105 <-> BE/CE mapping unverified; Saint-Jean test day with Mario's team and senior validation (D4) to schedule. Formal plan: `plan-projet-boulon-poc-scolaire-v1.1.docx` (decision D7).
