# BOULON — Complete Test Ledger
Compiled 2026-09-23 by the project historian (Claude) from every source in `recovery/`, `docs/`, `tests/` and Greg's statements this session. Companion to `docs/timeline-master.md`.

**How to read it**
- **Version** = the agent's configuration at the time (see "Configuration versions" in the timeline): V0 inherited · V1 grounding lockdown · V2 Custom Search topic · V3 Valeo pivot (no tests run) · V4 Tier 1 exact list lookup · V5 Azure AI Search RAG pilot · V6 current (Sep 23 fixes, published).
- **Where run**:
  - *Copilot Test panel*: the chat box inside Copilot Studio.
  - *Index direct*: Claude's scripts querying Azure AI Search, bypassing the agent.
  - *Direct Line*: Claude sending questions to the published agent through its API channel.
  - *Manual*: a person searching the PDF or SharePoint by hand.
- **Verdicts**:
  - PASS
  - FAIL
  - PARTIAL: the answer is right but something else is wrong, e.g. the citation.
  - SAFE-ABSTAIN: the agent correctly said "I don't have that", or the value was correctly absent.
- **Search modes** (index tests):
  - *keyword*: matches the exact words.
  - *hybrid*: keywords plus meaning-based (vector) search.
  - *semantic*: hybrid plus Microsoft's re-ranker, a second pass that re-sorts results by how well they answer the question.
- Dates marked ≈ are ESTIMATED. Nothing here is invented: where a source gives no input string or result, the cell says so.

| # | Date | Ver | Where run | Exact input | Expected | Actual | Verdict | What changed because of it |
|---|---|---|---|---|---|---|---|---|
| 1 | ≈ Sep 8–15 (ESTIMATED) | V0 | Copilot Test panel | Vehicle specification / VIN question (exact wording not recovered) | Answer from the Grande West manual under investigation | Answered from a **Vicinity** manual. The question did not name Grande West | FAIL | Showed the source wasn't constrained. Led to narrowing the knowledge URL |
| 2 | ≈ Sep 8–15 (ESTIMATED; before the Sep 16 audit) | V0 | Copilot Test panel | `who manufactures part number 1000-1259 and whats the description and whats the filename` | Internal manual evidence, or "not found" | Brake-pad sellers from the **public internet** (Quality-Built / MPA Electrical, BuyBrakes / FinditParts); said the part wasn't in the internal manuals | FAIL | **Web search turned OFF** |
| 3 | ≈ Sep 8–15 (ESTIMATED) | V1 | Copilot Test panel | Same as #2 | Internal evidence or "not found" | Cited New Flyer `1359parts.pdf` with a wrong `Hose, Drain` description. Greg checked: neither the number nor the description matches | FAIL | Proved internal retrieval itself is unreliable, not just the web setting |
| 4 | ≈ Sep 8–15 (ESTIMATED) | V1 | Copilot Test panel | Same as #2, after ungrounded OFF and/or the URL narrowed to `Manuels de service/Manuels` | Same | Cited New Flyer `1259parts.pdf` with an unverified manufacturer link (the filename contains "1259", not the part) | FAIL | Lesson logged: a filename match is not a part match |
| 5 | ≈ Sep 8–15 (ESTIMATED) | V1 | Copilot Test panel | Question naming `GRANDE WEST-2019-partsmanual`, part `1000-4270` (exact wording not recovered) | Part found in that PDF | Cited the correct PDF but said the part was absent. Greg confirmed it **is** in the manual | FAIL | Correct source ≠ correct retrieval |
| 6 | ≈ Sep 8–15 (ESTIMATED) | V1 | Copilot Test panel | Airtronic D2/D4 heater on a 2019 Grande West (wording not recovered) | Grounded answer that states which vehicles it applies to | Used a generic Espar manual, gave a procedure without showing it applies to this bus, and invented a 30–45 min estimate | FAIL | Two rules added to the plan: state applicability, and give no unsupported numbers |
| 7 | ≈ Sep 8–15 (ESTIMATED) | V1 | Copilot Test panel | Torque for fictional part `GW-9999-ABC` (wording not recovered) | No torque value | Gave no torque value, but claimed an exhaustive search it couldn't prove | PARTIAL | Recorded as useful abstention |
| 8 | ≈ Sep 8–15 (ESTIMATED) | V1 | Manual (PDF find) | `1000-4520` in `GRANDE WEST-2019-partsmanual.pdf` | Ground truth | p.162/713, item 1, qty 2, `BOLT M22 X 1.5 - 130 MM, HEXAGON HEAD, CLASS 10.9, PHOSPHATING` (screenshot 20) | PASS | Became the known-answer acceptance case |
| 9 | ≈ Sep 8–15 (ESTIMATED) | V1 | Manual (SharePoint search) | `1000-4520` | Manual found | 4 files, including the Grande West manual (screenshot 21) | PASS | Showed the text is searchable in SharePoint. It doesn't show what Copilot indexed |
| 10 | ≈ Sep 16 (ESTIMATED) | V2 | Copilot Test panel (Part Number Lookup topic) | Raw Custom Search run (part number(s) not recorded) | Search results | `[]` (empty) for both runs | FAIL | Showed that retrieval varied from run to run |
| 11 | **Sep 16, 09:48** | V2 | Copilot Test panel (topic) | `1000-1259` | Exact match with description and file | Raw dump of unrelated New Flyer SR1259 index pages (`1259parts/serv/oper.pdf`). The final answer said "No direct match…", listed ~40 other part numbers and cited `1259parts.pdf` (raw file in `02_raw_test_evidence`) | FAIL | Debug output capped to counts |
| 12 | ≈ Sep 16 (ESTIMATED) | V2 | Copilot Test panel (topic) | `1000-4520` | ≥1 exact match | 15 results, **0 exact matches** | FAIL | Lesson: filtering after the search can't recover a chunk that was never retrieved |
| 13 | ≈ Sep 16 (ESTIMATED) | V2 | Copilot Test panel (topic) | Filename + `1000-4520` (search input with context added) | ≥1 exact match | 19 results, **0 exact matches**. One attempt coincided with a browser freeze | FAIL | Reverted to the saved config |
| 14 | ≈ Sep 16 (ESTIMATED) | V2 | Copilot Test panel (topic) | Filename + number, re-run after the revert | ≥1 exact match | "Without success" (no counts recorded) | FAIL | Sep 16 audit: build a deterministic structured parts index; Valeo pivot |
| — | Sep 16–17 | V3 | *Planned, never run* | `20819B`, `11118536D`, `VALEO-TEST-99999` | Grid p.5; fuel pump kit p.10; "not verified" | No record of a run. Blocker: nobody confirmed whether the Valeo PDF was in the connected SharePoint scope | not counted | — |
| — | ≈ Sep 17–21 | V4 | *Tier 1 tests* | Not recorded anywhere | — | The assumptions log says part lookup was "built and tested", but no inputs or results survive | not counted | Gap question for Greg |
| 15 | ≈ Sep 17–21 (ESTIMATED) | V4 era | Copilot Test panel (SharePoint generative answers, "Tier 2") | HK98-0021 question (wording not recovered) | Part in the Baultar manual | "Confirmed present" (implementation-spec Step 1.8) | PASS | Chosen as T1 for the Azure pilot |
| 16 | ≈ Sep 17–21 (ESTIMATED) | V4 era | Copilot Test panel (SharePoint generative answers) | Orion question (wording not recovered) | Grounded answer | The answer mentioned pressure release and protective gear; the source was never verified | PARTIAL | Open item: check that line against the Orion manual |
| 17 | **Sep 22**, afternoon | V5 | Index direct (Azure portal) | "tools + time for a BTMS repair" (paraphrased in the timeline) | Right manual, tools, time | Correct answer with a high score, from the right manual plus a supporting one; image descriptions working | PASS | Step 1.5d done; Tier 1 retired |
| 18 | 09-23 10:01 | V6 | Index direct (keyword) | T1 `"HK98-0021"` | Baultar seat passage | (403) Forbidden (key/index setup) | FAIL (setup error) | Found the wrong index name `boulon-pilot-index` |
| 19 | 09-23 10:01 | V6 | Index direct | T2 `"12052641"` | ProHeat passage | (403) Forbidden | FAIL (setup error) | same |
| 20 | 09-23 10:01 | V6 | Index direct | T3 `"080808082"` | Absent | (403) Forbidden | FAIL (setup error) | same |
| 21 | 09-23 10:09 | V6 | Index direct | T1 `"HK98-0021"` | Baultar passage | #1 AS98-5005.pdf (score 11.77) | PASS | Real index name confirmed |
| 22 | 09-23 10:09 | V6 | Index direct | T2 `"12052641"` | ProHeat passage | #1–2 ProHeat SL9150 | PASS | — |
| 23 | 09-23 10:09 | V6 | Index direct | T3 `"080808082"` | Absent | No results, but the script scored it FAIL | FAIL (scoring bug) | T3 redefined as a must-abstain test |
| 24 | 09-23 10:11 | V6 | Index direct | T1 | Baultar passage | §3.9 "Assemblage cylindre d'avance gauche #HK98-0021" | PASS | — |
| 25 | 09-23 10:11 | V6 | Index direct | T2 | ProHeat passage | "METRI-PACK 12052641 AUX CONNECTOR KEYING" | PASS | — |
| 26 | 09-23 10:11 | V6 | Index direct | T3 | Absent | Absent (no Orion manual indexed) | SAFE-ABSTAIN | — |
| 27 | 09-23 10:13 | V6 | Index direct | `BTMS battery thermal management system` | BTMS procedures | Top 5 all RP-01-13 BTMS sheets (score 32.53) | PASS | Re-checked the Sep 22 query |
| 28 | 09-23 10:22 | V6 | Index direct | T1 | Baultar | Same as #24 | PASS | — |
| 29 | 09-23 10:22 | V6 | Index direct | T2 | ProHeat | Same as #25 | PASS | — |
| 30 | 09-23 10:22 | V6 | Index direct | T3 | Absent | Absent | SAFE-ABSTAIN | — |
| 31 | 09-23 ≈10:15–10:30 | V6 | Index direct (keyword, RAG reviewer probe) | `how to replace the left advance lock cylinder on the driver seat` | French procedure §3.9 | Only image captions returned | FAIL | Hybrid and semantic modes added to the golden runner |
| 32 | 09-23 ≈10:15–10:30 | V6 | Index direct (keyword, probe) | `comment remplacer le cylindre d'avance gauche du siège` | §3.9 | Procedure found, score 30.95 | PASS | — |
| 33 | 09-23 ≈10:15–10:30 | V6 | Index direct (raw chunk check) | Vicinity Service Manual p.22 torque table | Table rows kept | Rows run together: `M61.0012.715` (0 separators) | FAIL | CRITICAL finding: the table must keep its structure in extraction before rollout |
| 34 | 09-23 ≈10:30 | V6 | Index direct (coverage) | All 2,250 chunks, last page per file | Truncated files still reach their last page | Text reaches p.217 and p.157, same as the images | PARTIAL | "Truncation loss" downgraded to unverified; needs the real page counts |
| 35 | 09-23 10:44 | V6 | Index direct | T1 | Baultar | Same as #24 | PASS | — |
| 36 | 09-23 10:44 | V6 | Index direct | T2 | ProHeat | Same as #25 | PASS | — |
| 37 | 09-23 10:44 | V6 | Index direct | T3 | Absent | Absent | SAFE-ABSTAIN | — |
| 38 | 09-23 10:45 | V6 | Index direct (keyword) | G1: `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?` | HK98-0021, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 39 | 09-23 10:45 | V6 | Index direct (keyword) | G2: `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?` | 17.4 ft-lb, MCU sheet | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 40 | 09-23 10:45 | V6 | Index direct (keyword) | G3: `What torque is used for the wiper motor crank on the Vicinity?` | 22-27 Nm, Vicinity | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 41 | 09-23 10:45 | V6 | Index direct (keyword) | G4: `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?` | HK98-0062, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 42 | 09-23 10:45 | V6 | Index direct (keyword) | G5: `What is METRI-PACK connector 12052641 used for in the ProHeat manual?` | AUX connector keying, ProHeat | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 43 | 09-23 10:45 | V6 | Index direct (keyword) | G6: `What are the safety precautions before replacing the BTMS compressor?` | 'chock' in RP-01-13 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 44 | 09-23 10:45 | V6 | Index direct (keyword) | G7: `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?` | 12.9 row, Vicinity p.22 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 45 | 09-23 10:45 | V6 | Index direct (keyword) | G8: `How do I replace the left advance lock cylinder on the driver seat?` | HK98-0021 or 3.9, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 46 | 09-23 10:45 | V6 | Index direct (keyword) | A1: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | value must be ABSENT | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 47 | 09-23 10:45 | V6 | Index direct (keyword) | A2: `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | 'Tesla' must be ABSENT | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 48 | 09-23 10:45 | V6 | Index direct (hybrid) | G1: `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?` | HK98-0021, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 49 | 09-23 10:45 | V6 | Index direct (hybrid) | G2: `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?` | 17.4 ft-lb, MCU sheet | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 50 | 09-23 10:45 | V6 | Index direct (hybrid) | G3: `What torque is used for the wiper motor crank on the Vicinity?` | 22-27 Nm, Vicinity | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 51 | 09-23 10:45 | V6 | Index direct (hybrid) | G4: `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?` | HK98-0062, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 52 | 09-23 10:45 | V6 | Index direct (hybrid) | G5: `What is METRI-PACK connector 12052641 used for in the ProHeat manual?` | AUX connector keying, ProHeat | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 53 | 09-23 10:45 | V6 | Index direct (hybrid) | G6: `What are the safety precautions before replacing the BTMS compressor?` | 'chock' in RP-01-13 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 54 | 09-23 10:45 | V6 | Index direct (hybrid) | G7: `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?` | 12.9 row, Vicinity p.22 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 55 | 09-23 10:45 | V6 | Index direct (hybrid) | G8: `How do I replace the left advance lock cylinder on the driver seat?` | HK98-0021 or 3.9, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 56 | 09-23 10:45 | V6 | Index direct (hybrid) | A1: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | value must be ABSENT | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 57 | 09-23 10:45 | V6 | Index direct (hybrid) | A2: `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | 'Tesla' must be ABSENT | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 58 | 09-23 10:45 | V6 | Index direct (semantic) | G1: `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?` | HK98-0021, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 59 | 09-23 10:45 | V6 | Index direct (semantic) | G2: `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?` | 17.4 ft-lb, MCU sheet | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 60 | 09-23 10:45 | V6 | Index direct (semantic) | G3: `What torque is used for the wiper motor crank on the Vicinity?` | 22-27 Nm, Vicinity | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 61 | 09-23 10:45 | V6 | Index direct (semantic) | G4: `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?` | HK98-0062, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 62 | 09-23 10:45 | V6 | Index direct (semantic) | G5: `What is METRI-PACK connector 12052641 used for in the ProHeat manual?` | AUX connector keying, ProHeat | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 63 | 09-23 10:45 | V6 | Index direct (semantic) | G6: `What are the safety precautions before replacing the BTMS compressor?` | 'chock' in RP-01-13 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 64 | 09-23 10:45 | V6 | Index direct (semantic) | G7: `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?` | 12.9 row, Vicinity p.22 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 65 | 09-23 10:45 | V6 | Index direct (semantic) | G8: `How do I replace the left advance lock cylinder on the driver seat?` | HK98-0021 or 3.9, AS98-5005 | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 66 | 09-23 10:45 | V6 | Index direct (semantic) | A1: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | value must be ABSENT | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 67 | 09-23 10:45 | V6 | Index direct (semantic) | A2: `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | 'Tesla' must be ABSENT | (404) Not Found: script still used old index name | FAIL (setup error) | Fixed `.env` index name; errors now count as failures |
| 68 | 09-23 10:46 | V6 | Index direct (keyword) | G1: `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?` | HK98-0021, AS98-5005 | Right passage not in top 5 | FAIL | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 69 | 09-23 10:46 | V6 | Index direct (keyword) | G2: `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?` | 17.4 ft-lb, MCU sheet | Right passage at result #2 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 70 | 09-23 10:46 | V6 | Index direct (keyword) | G3: `What torque is used for the wiper motor crank on the Vicinity?` | 22-27 Nm, Vicinity | Right passage at result #2 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 71 | 09-23 10:46 | V6 | Index direct (keyword) | G4: `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?` | HK98-0062, AS98-5005 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 72 | 09-23 10:46 | V6 | Index direct (keyword) | G5: `What is METRI-PACK connector 12052641 used for in the ProHeat manual?` | AUX connector keying, ProHeat | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 73 | 09-23 10:46 | V6 | Index direct (keyword) | G6: `What are the safety precautions before replacing the BTMS compressor?` | 'chock' in RP-01-13 | Right passage at result #2 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 74 | 09-23 10:46 | V6 | Index direct (keyword) | G7: `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?` | 12.9 row, Vicinity p.22 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 75 | 09-23 10:46 | V6 | Index direct (keyword) | G8: `How do I replace the left advance lock cylinder on the driver seat?` | HK98-0021 or 3.9, AS98-5005 | Right passage not in top 5 | FAIL | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 76 | 09-23 10:46 | V6 | Index direct (keyword) | A1: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | value must be ABSENT | Value absent (correct) | SAFE-ABSTAIN | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 77 | 09-23 10:46 | V6 | Index direct (keyword) | A2: `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | 'Tesla' must be ABSENT | Value absent (correct) | SAFE-ABSTAIN | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 78 | 09-23 10:46 | V6 | Index direct (hybrid) | G1: `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?` | HK98-0021, AS98-5005 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 79 | 09-23 10:46 | V6 | Index direct (hybrid) | G2: `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?` | 17.4 ft-lb, MCU sheet | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 80 | 09-23 10:46 | V6 | Index direct (hybrid) | G3: `What torque is used for the wiper motor crank on the Vicinity?` | 22-27 Nm, Vicinity | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 81 | 09-23 10:46 | V6 | Index direct (hybrid) | G4: `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?` | HK98-0062, AS98-5005 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 82 | 09-23 10:46 | V6 | Index direct (hybrid) | G5: `What is METRI-PACK connector 12052641 used for in the ProHeat manual?` | AUX connector keying, ProHeat | Right passage at result #2 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 83 | 09-23 10:46 | V6 | Index direct (hybrid) | G6: `What are the safety precautions before replacing the BTMS compressor?` | 'chock' in RP-01-13 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 84 | 09-23 10:46 | V6 | Index direct (hybrid) | G7: `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?` | 12.9 row, Vicinity p.22 | Right passage at result #2 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 85 | 09-23 10:46 | V6 | Index direct (hybrid) | G8: `How do I replace the left advance lock cylinder on the driver seat?` | HK98-0021 or 3.9, AS98-5005 | Right passage not in top 5 | FAIL | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 86 | 09-23 10:46 | V6 | Index direct (hybrid) | A1: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | value must be ABSENT | Value absent (correct) | SAFE-ABSTAIN | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 87 | 09-23 10:46 | V6 | Index direct (hybrid) | A2: `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | 'Tesla' must be ABSENT | Value absent (correct) | SAFE-ABSTAIN | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 88 | 09-23 10:46 | V6 | Index direct (semantic) | G1: `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?` | HK98-0021, AS98-5005 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 89 | 09-23 10:46 | V6 | Index direct (semantic) | G2: `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?` | 17.4 ft-lb, MCU sheet | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 90 | 09-23 10:46 | V6 | Index direct (semantic) | G3: `What torque is used for the wiper motor crank on the Vicinity?` | 22-27 Nm, Vicinity | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 91 | 09-23 10:46 | V6 | Index direct (semantic) | G4: `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?` | HK98-0062, AS98-5005 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 92 | 09-23 10:46 | V6 | Index direct (semantic) | G5: `What is METRI-PACK connector 12052641 used for in the ProHeat manual?` | AUX connector keying, ProHeat | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 93 | 09-23 10:46 | V6 | Index direct (semantic) | G6: `What are the safety precautions before replacing the BTMS compressor?` | 'chock' in RP-01-13 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 94 | 09-23 10:46 | V6 | Index direct (semantic) | G7: `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?` | 12.9 row, Vicinity p.22 | Right passage at result #1 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 95 | 09-23 10:46 | V6 | Index direct (semantic) | G8: `How do I replace the left advance lock cylinder on the driver seat?` | HK98-0021 or 3.9, AS98-5005 | Right passage at result #3 | PASS | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 96 | 09-23 10:46 | V6 | Index direct (semantic) | A1: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | value must be ABSENT | Value absent (correct) | SAFE-ABSTAIN | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 97 | 09-23 10:46 | V6 | Index direct (semantic) | A2: `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | 'Tesla' must be ABSENT | Value absent (correct) | SAFE-ABSTAIN | Semantic 10/10, hybrid 9/10, keyword 8/10: semantic re-ranker needed for EN-question/FR-manual (G8) |
| 98 | 09-23 ≈10:55 | V6 | Copilot Test panel | `Is part number HK98-0021 in the Baultar manual, and what is it?` | Left advance-lock cylinder, AS98-5005, citation to the manual | Right answer; the citation shows the **index name** (`multimodal-rag-…`) | PARTIAL | New rule: an index-name citation is a citation FAIL. Fix 3 (title/URL fields) tied to the D4 rebuild |
| 99 | 09-23 ≈10:55 | V6 | Copilot Test panel | `What is part number 12052641 used for in the Proheat manual?` | METRI-PACK AUX connector keying, ProHeat citation | Right answer; the citation shows the index name | PARTIAL | same |
| 100 | 09-23 ≈10:55 | V6 | Copilot Test panel | `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | "I don't have that information" | No invented answer; generic French "Désolé" fallback line | SAFE-ABSTAIN | Fix 2: D14 bilingual line in the Secours (Fallback) topic |
| 101 | 09-23 ≈10:55 | V6 | Copilot Test panel | `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | "I don't have that", no number | No number; generic "Désolé" fallback line | SAFE-ABSTAIN | same |
| 102 | 09-23 ≈10:55 | V6 | Copilot Test panel | `How do I replace the left advance lock cylinder on the driver seat?` (G8) | French §3.9 procedure | Right procedure, but the citation "1" touched the part number, so it read "HK98-00211"; the citation shows the index name | PARTIAL | Fix 1: bold part numbers, space out citations |
| 103 | 09-23 ≈12:30 | V6 | Copilot Test panel (retest after Fix 2) | Tesla question (#101) | D14 line, no number | D14 bilingual line, no number | SAFE-ABSTAIN | D14 marked DONE |
| 104 | 09-23 ≈12:30 (per Greg) | V6 | Copilot Test panel (retest after Fix 2) | Orion question (#100) | D14 line | D14 line (Greg's statement; not in the log) | SAFE-ABSTAIN | — |
| 105 | 09-23, by 12:30 | V6 | Direct Line | Key test (question not recorded) | Reply | (403): Direct Line refused the Copilot Studio value in `.env` | FAIL (setup error) | The right secret is still needed |
| 106 | 09-23 ≈14:05 | V6 | Direct Line (`tests/ask-agent.ps1`) | First question (not recorded) | Reply | `LatestPublishedVersionNotFound`: the agent had never been published | FAIL (setup error) | Agent published (logged 14:35) |
| 107 | 09-23 17:47 UTC | V6 | Direct Line | `Is part number HK98-0021 in the Baultar manual, and what is it?` | As #98 | `IntegratedAuthenticationNotSupportedInChannel` | FAIL (setup error) | The sign-in setting "Authenticate with Microsoft" only works in Teams/M365 channels; the fix is Greg's call |
| 108 | 09-23 17:47 UTC | V6 | Direct Line | `What is part number 12052641 used for in the Proheat manual?` | As #99 | Same error | FAIL (setup error) | same |
| 109 | 09-23 17:48 UTC | V6 | Direct Line | `What's the part number for the pipe fitting in the Orion manual, part 080808082?` | Abstain | Same error | FAIL (setup error) | same |
| 110 | 09-23 17:49 UTC | V6 | Direct Line | `What is the torque spec for the wheel lug nuts on a Tesla Model 3?` | Abstain | Same error | FAIL (setup error) | same |
| 111 | 09-23 17:49 UTC | V6 | Direct Line | `How do I replace the left advance lock cylinder on the driver seat?` | §3.9 | Same error | FAIL (setup error) | same |
| 112 | 10-06 ≈10:35 | v1 + title/url fields | Copilot Test panel | `Is part number HK98-0021 in the Baultar manual, and what is it?` | Right answer; citation names the actual manual | Right answer (left advance cylinder, AS98-5005 seat); citation shows "PROCEDURE DE MAINTENANCE DU" (truncated manual name, no page). Clicking the link: Azure `PublicAccessNotPermitted` | PARTIAL (citation name PASS; link FAIL) | Fix verified for the name. Link needs a user-openable address (SharePoint). Page not shown in the label |
| 113 | 10-06 ≈11:32 | v1 + title/url fields | Copilot Test panel | `What is the recommended assembly torque for an M6 Class 12.9 bolt?` | 15 Nm (Vicinity p.22), citation names manual + page | 15 Nm correct; "Search sources" shows `Vicinity Service Manual, p. 22` (also p. 19, p. 69); the answer chip truncates to "Vicinity Service Manual, p…"; the link opens Azure `PublicAccessNotPermitted` | PARTIAL (answer + page PASS; chip truncation and link FAIL) | Confirms `title` is the displayed field. The flattened-table problem did not show here: the value 15 was right |
| 114 | 10-06 ≈13:40 | v1 rebuilt (title + SharePoint url) | Copilot Test panel | `What is the recommended assembly torque for an M6 Class 12.9 bolt?` | 15 Nm; chip shows manual + page; link opens the manual at the page | 15 Nm + surface factors; chip `Vicinity service, p. 22`; click opened the Vicinity manual at page 22 (Greg) | PASS | First full citation pass: name, page, short label, working link |
| 115 | 10-06 ≈13:40 | v1 rebuilt | Copilot Test panel | `Is part number HK98-0021 in the Baultar manual, and what is it?` | Left advance cylinder assembly, AS98-5005; chip names the manual + page | Left advance cylinder assembly (also names HK98-0028 as the right one); chip `Seat AS98-5005, p. 48`. Link click not reported | PASS (answer + citation); link not clicked | Reported by Greg |
| 116-151 | 10-06 15:30 | live instructions (before v2) | Copilot Evaluation | failure set F01-F36 | see `tests/results/agent-baseline-2026-10-06.md` | 17 pass / 6 safe / 13 fail (7 HIGH) | BASELINE | Tool marks unusable (abstentions graded Fail); hand-scored |
| 152-192 | 10-06 15:39 | live instructions (before v2) | Copilot Evaluation | golden v1 (41) | about 37 of 41 correct; 4 real failures | BASELINE | ProHeat M120 invented; brake torques generic |

**Note on #107–111:** the file is named `agent_2026-09-23_1425.md`, but the timestamps inside are 17:47–17:49 UTC, which is 13:47–13:49 EDT. The log entry at 14:35 reports them. The times above are copied from the file.

**Note on #2 (evidence correction):** the recovered raw file `RAW_Custom_Search_Test_Output_1000-1259.md` is **not** the web-search run. It's the Sep 16 09:48 run of the Part Number Lookup topic (#11): SharePoint results only, with no brake-pad sellers in it. Its "web" hits are just `?web=1` inside SharePoint links. The web-ON brake-pad result (#2) is documented only in the Sep 16–17 logs and the PM deck ("External web used").

## Not run yet (asked for, no result anywhere)
- **T4**: check 2–3 rows from the SharePoint list "BOULON - Parts Lookup Pilot" against the index. The rows were never supplied.
- **Fix 1 retest** (the citation touching the part number): Fix 1 was applied at 11:25, but no retest result is logged.
- **Valeo acceptance tests** (V3): planned, never run.
- **Semantic re-ranker check in Copilot Studio**: closed, because the setting isn't shown in the UI.

## Totals
**Total tests recorded: 111.** This excludes the 3 planned Valeo tests and the unrecorded Tier 1 tests.

| Verdict | Count |
|---|---|
| PASS | 35 |
| SAFE-ABSTAIN | 13 |
| PARTIAL | 6 |
| FAIL | 57 |
| of which setup/infrastructure errors (wrong key, wrong index name, agent not published, sign-in channel, T3 scoring bug) | 41 |
| of which real answer/retrieval failures | 16 |

| Phase (version) | Dates | Tests | PASS | SAFE-ABSTAIN | PARTIAL | FAIL |
|---|---|---|---|---|---|---|
| V0 inherited agent | ≈ Sep 8–15 | 2 | 0 | 0 | 0 | 2 |
| V1 grounding lockdown | ≈ Sep 8–15 (in place by Sep 16) | 7 | 2 | 0 | 1 | 4 |
| V2 Custom Search topic | Sep 16 | 5 | 0 | 0 | 0 | 5 |
| V3 Valeo pivot | Sep 16–17 | 0 | – | – | – | – |
| V4 Tier 1 exact lookup era | ≈Sep 17–21 | 2 | 1 | 0 | 1 | 0 |
| V5 Azure RAG pilot | Sep 22 | 1 | 1 | 0 | 0 | 0 |
| V6 current, index direct | Sep 23 | 80 | 31 | 9 | 1 | 39 |
| V6 current, agent (Test panel + Direct Line) | Sep 23 | 14 | 0 | 4 | 3 | 7 |
| **All** | | **111** | **35** | **13** | **6** | **57** |

**Scorecard without the setup errors:** 70 valid tests, of which 35 PASS, 13 SAFE-ABSTAIN, 6 PARTIAL and 16 FAIL. The 16 real failures come from two places:
- the SharePoint era (V0–V2)
- index-side findings on Sep 23: keyword-mode misses, the flattened torque table and the English keyword probe

On the agent side, **no wrong answer has been recorded since the Azure pilot started**. Two defects remain, both in citations: they show the index name instead of the manual, and one citation marker touched a part number.


## 2026-09-24: golden set v1 (43 questions; 41 run, 2 need the v2 index)
Run on index v1 (`tests/results/golden_2026-09-24_0918.md`): **semantic 41/41**, hybrid 36/41, keyword 30/41. Keyword-only misses are concentrated in cross-language and part-number questions, which confirms semantic ranking is needed. G11 (torque table structure) and G12 (citation fields) are skipped until v2 (`-V2`).
**Content finding (T7):** manuals disagree on wheel nuts: the Lion wheel sheet says never grease the nuts; the Vicinity manual says oil the studs. BOULON must answer per vehicle model and cite the right manual. Added to open items.

## 2026-09-24 09:40: Fix 1 retest and T4
- **Fix 1 retest: PASS** (Test panel, 09:15): HK98-0021 is bold and separated from the citation marker, and the full 13-step procedure is given, with 288 lbs/in torque and red Loctite. The citation still shows the index name (known; fixed in v2).
- **T4:** 3 rows from the legacy list (Valeo 2711011A p.12, 20818B p.5, 11113052A p.5). **None are in the current index**: the Valeo ETL Thermo Plus PDF isn't among the 23 pilot manuals. Added as golden L1–L3 (requiresV2): they must pass once the full library is loaded. That is the "nothing lost from the old lookup" check.

## 2026-09-24 13:38: Retest after the test-script fixes
- `run-pilot-tests.ps1` (now fails a match that comes from the wrong manual): T1, T2 and T3 PASS. Results: `tests/results/2026-09-24_1338.md`.
- `run-golden.ps1` (a real semantic error is now shown as ERROR, not n/a): keyword 30/41, hybrid 36/41, semantic 41/41. Same scores as 09:20, with 0 errors. Results: `tests/results/golden_2026-09-24_1338.md`.
- `ask-agent.ps1` `What is part HK98-0021?` → **AGENT ERROR `IntegratedAuthenticationNotSupportedInChannel`**, exit code 4. The script used to report this as a normal reply. The cause is unchanged: the agent's sign-in setting blocks Direct Line, and it's Henri's call.
