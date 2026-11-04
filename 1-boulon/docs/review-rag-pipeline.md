# BOULON Pilot RAG Pipeline Review
**Reviewed:** 2026-09-23 by `ecc:rag-pipeline-reviewer` · Index `multimodal-rag-1790098589411` (23 PDFs, 2,250 chunks) · read-only probes against the live index.
**Claude verification (2026-09-23):** the CRITICAL torque-table finding is confirmed on raw data. Vicinity Service Manual p.22 is stored with 0 pipes, 0 line breaks and 0 table tags, so the rows run together (e.g. `M61.0012.715`, meaning M6 bolt / 1.00 pitch / 12.7 kN / 15 Nm).

## Summary
The architecture is fundamentally sound: real chunk-level citations with page numbers, real French/English content indexed, and image captions generated for diagrams. Three things need attention before mechanics rely on it for torque specs:
1. A torque table has lost its row/column structure.
2. Two manuals, one of them the Vicinity **Parts** manual, are missing because of a tier size limit.
3. There is no automated grounding-quality check, only three manually run spot checks.

## Terms
- **Chunk:** one small searchable slice of a manual.
- **Skillset:** the Azure pipeline that turns a PDF into chunks, table text, image captions and embeddings.
- **Embedding / vector search:** text turned into numbers, so passages with similar meaning are found even when the words differ.
- **Semantic ranker:** a second pass that re-sorts results by how well they answer the question.
- **Grounded:** backed by a retrieved passage.
- **RAGAS:** an automated way to score faithfulness and retrieval quality.

## Findings (ranked by severity)

### CRITICAL: the torque table loses its row/column structure in extraction
**Evidence:** Vicinity Service Manual p.22, "Recommended Assembly Torques Class 12.9…", is stored as `…DiameterPitch (mm)kNNmM30.503.171.9M40.705.544.4M50.808.978.9M61.0012.715M81.2523.1…`. There are no separators at all. This is the table case `rag-plan-reference.md` §3.2 flagged as highest-risk.
**Risk:** the model, or a mechanic reading the snippet, pairs the wrong torque with the wrong bolt size. That's a direct safety hazard.
**Fix:** reconfigure the Document Intelligence Layout skill output so tables are kept as markdown tables, or add a table-preserving step, then re-run on the affected manuals. Claude drafts the skillset JSON; Greg approves and applies it.

### CRITICAL: two manuals excluded by the 16 MB extraction limit, one of them the Parts manual
**Evidence** (indexer status):
- `Vicinity Service Manual Final - 2013.pdf` is 103,915,627 bytes and was excluded.
- `Vicinity Parts Manual 2015.pdf` is 23,849,408 bytes and was excluded.

A different file, `Vicinity Service Manual.pdf`, is indexed (536 chunks).
**Risk:** Vicinity part-number questions get false "I don't have that" answers or a citation from the wrong manual, and Greg and Henri may believe Vicinity coverage is complete.
**Fix:** either split the PDFs to under the limit, or move to a higher tier. **Verify current limits and prices before deciding** (standing rule).

### HIGH: two manuals silently truncated at 262,144 characters
**Evidence:** `limits.maxDocumentContentCharactersToExtract: 262144`. Two files show "Truncated extracted text to '262144' characters":
- `Vicinity Service Manual.pdf`
- `20180131200843_emp-cooling-fans-service-manual.pdf`, the largest file in the index

**Risk:** later sections of these manuals can't be searched, and nothing warns anyone.
**Fix:** the same split-or-tier decision as above. After re-indexing, Claude confirms the truncation warnings are gone.

### HIGH: no automated grounding evaluation
**Evidence:** only T1–T3 exist. They're index-only keyword-presence checks, with no baseline, thresholds, slices or regression gate.
**Risk:** nobody can tell whether a pipeline change made grounding better or worse.
**Fix:** a versioned golden set of 20–30 questions to start (8 below), scored after every change. Claude builds it on top of the existing script. Installing an actual RAGAS package needs Greg's approval.

### MEDIUM: unclear whether Copilot Studio uses the semantic reranker
**Evidence:** a semantic config exists in the index. The spec step 1.7.8 says only "accept the defaults".
**Fix:** Greg checks the Azure AI Search knowledge source's advanced settings in Copilot Studio for a semantic-search toggle.

### MEDIUM: cross-language retrieval is weak in keyword mode
**Evidence:**
- English "how to replace the left advance lock cylinder on the driver seat" returned only image captions.
- French "comment remplacer le cylindre d'avance gauche du siège" found the procedure straight away (score 30.95).

The script uses keyword-only search, so this doesn't show how the live agent behaves.
**Fix:** Greg runs both questions in the Test panel. Claude adds a vector/hybrid mode to the script for comparison.

### LOW: no explicit chunk size/overlap in the skillset
The `DocumentIntelligenceLayoutSkill` defaults are in effect, with `markdownHeaderDepth: null`. **Fix:** confirm the defaults against current Microsoft docs.

### LOW: accented characters show as `�` in the terminal
This is probably just a console display issue. **Fix:** check a French citation in the Test panel.

## Retrieval configuration summary
| Item | Value | Note |
|---|---|---|
| Vector store | HNSW, cosine, `m=4, efConstruction=400, efSearch=500` | |
| Embedding model | `text-embedding-3-small`, 1536 dims | Same model for text and image captions |
| Chunking | Layout skill defaults | See LOW finding |
| Tables | Delegated to Layout skill | Confirmed flattened (CRITICAL) |
| Images | ChatCompletionSkill describes every image, then embeds the description | Working |
| Citations | `locationMetadata.pageNumber` + `boundingPolygons` | Page numbers exist; unconfirmed whether the agent shows them |
| Semantic config | Present | Live use unconfirmed |
| Tier limits | 16 MB per doc, 262,144 characters per doc | 2 excluded, 2 truncated |
| Insufficient-context fallback | Prompt instruction only | No relevance-score cutoff |
| Scale readiness | Not ready | Limits will hit more manuals at 100+ |

## Evaluation coverage
| Item | Status |
|---|---|
| Baseline dataset (versioned) | Absent |
| Acceptance thresholds | Absent |
| Slice coverage (FR/EN, table/diagram/text) | Absent |
| Regression gate | Absent |
| Faithfulness / recall / precision scoring | Absent |

## Golden test questions (from real retrieved passages)
1. `In the Baultar seat manual, what is the part number for the left advance-lock cylinder assembly?`
   Expected: HK98-0021. Source: PROCEDURE DE MAINTENANCE DU SIEGE AS98-5005.pdf §3.9.1.
2. `What torque should the nuts be tightened to when replacing the Motor Control Unit (MCU)?`
   Expected: 17.4 ft-lb (23.5 Nm). Source: RP-01-11-00-00-002 MCU Replacement.pdf, step 21, p.10.
3. `What torque is used for the wiper motor crank on the Vicinity?`
   Expected: 22–27 Nm (16–20 lb-ft). Source: Vicinity Service Manual.pdf, wiper alignment section.
4. `Quel est le numéro de pièce du cylindre d'ajustement d'angle du dossier du siège Baultar?`
   Expected: HK98-0062. Source: AS98-5005 §3.10.1.
5. `What is METRI-PACK connector 12052641 used for in the ProHeat manual?`
   Expected: AUX connector keying on the G-I PCM. Source: ProHeat SL9150.
6. `What are the safety precautions before replacing the BTMS compressor?`
   Expected: starter switch OFF, parking brake set, tires chocked, and only trained/certified technicians work on the refrigerant system. Source: RP-01-13-00-00-006, p.2–3.
7. `What is the recommended assembly torque for an M6 Class 12.9 bolt per the Vicinity manual's torque table?`
   Expected: 15 Nm, per the source PDF p.22. This is the flattened-table stress test, so record the agent's answer verbatim.
8. `What's the part number for the pipe fitting in the Orion manual, part 080808082?`
   Expected: "I don't have that information". This is a must-abstain test, because no Orion manual is indexed.

## Handoffs
- `ecc:docs-lookup`: confirm the current Layout skill defaults and the tier limits and prices.
- `ecc:mle-reviewer`: help design the evaluation baseline and thresholds for a safety-relevant system.
