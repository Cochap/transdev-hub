# MIR data map (from Alex's data dictionary)

Written 2026-10-01 by Claude from `veripep 2022-10-14.pdf` (MIR-RT 9.0, ~330 pages, HFSQL Classic data dictionary sent by Alex Dumenne). Alex said read-only access is the simplest option; the documentation is sparse and the structure is not intuitive. **This is a map of the dictionary, not of real data**: nothing below says whether the fields are actually filled in. The dictionary dates from 2022-10-14; the live schema may have changed.

## The tables that matter (in the order a diagnosis record is assembled)

| Table | What it holds | Fields for BOULON |
|---|---|---|
| **TBONS** (Alex's starting table) | One row per work order (BT). 52 fields. | `TBCLEUNIK` (WO id), `DATE`, `NUM_BON` (WO number), `VECLEUNIK` (vehicle), `CICLEUNIK` (branch), `COD_DEPART`, `DESC_80` (80-char description), `TBMemoLoc` (200 chars), `ODOAVIE` (odometer), `CB_PLANIFIE` / `CB_NONPLANIFIE` / `CB_URGENCE` (planned / unplanned / road call), `IDStatutBT`, `Id_ClasseBT`, `TBCLeUnikParent`, `DATE_CLOSE`. Costs: `TOT_PIECES`, `TOT_MDOEUV`. |
| **Plainte / PlainteDet** | The complaint on a WO: what the driver or mechanic reported, the cause, the fix. `PlainteDet` = one row per complaint line (`PNOSEQ`), linked by `PCLEUNIK` and `TBCLEUNIK`. | **`PDESC`** (description, 250), **`PSymptome`** (symptoms, 250), **`PCAUSE`** (cause, 500), **`PCORRECTIF`** (corrective action, 500), `PCODEREP` (repair code), `PCODERAI` (reason code), `PPOSI` (position on the unit), `PTEMPSE` / `PTEMPSR` (estimated / real time), `PDepannage` (road call), `PBrisMateriel`, `PInspection`, `PTYPE` (billable / warranty). This is where the diagnosis text lives. |
| **PLAINTEANX** | Extra long text per complaint: `PDESC`, `PCAUSE`, `PCORRECTIF` again. | Possibly the overflow or latest version of the three text fields. To check against real rows. |
| **CodePlainte** | Complaint code list, FR and EN description (`CCODE`, `CDESCFR`, `CDESCAN`). | Standard symptom vocabulary, if mechanics use it. |
| **CodesBT** | Repair codes and reason codes for WOs; points to the multi-use list `ZLIST` for the code text. | Possible alternative to the two tables below; not requested (Alex pointed to the `A_` tables instead). |
| **A_CodeReparationExclu** (added 2026-10-01 on Alex's pointer) | Repair-code dictionary. | `CRECode` (code), `CREDescription` (250 chars), `CREExclu` (yes/no: "indicates whether the code is excluded"; meaning to ask Alex). Decodes `DATA_COD` / `PCODEREP`. |
| **A_CodeRaisonExclu** (added 2026-10-01) | Reason-code dictionary. | `CRACode`, `CRADescription` (250), `CRAExclu`. Decodes `DATA_RAIS` / `PCODERAI`. |
| **TBONSDET** | One row per line of a WO: parts and external jobs. 40 fields. | `NUM_INTERN` (part number), `DESC_80`, `QTE_INT`, `COUT_TOT`, `COM_JOB` (internal / external job flag, NOT a comment; corrected 2026-10-01), `DATA_COD` (repair code), `DATA_RAIS` (reason), `DATA_POS` (position), link `PCLEUNIK` to the complaint. Answers "which parts were replaced for this complaint". |
| **VEHICUL** | The vehicle. 62 fields. | `MARQUE`, `MODELE`, `ANNEE`, `TYPEVEC`, `NOUNITE`, `ODOMETER`, `CICLEUNIK`. Gives model, year and type for the filters. |
| **StatutBT, ClasseBT** | Status and class of a WO. | Keep only closed corrective WOs. |
| **TBONSMEC** (added 2026-10-01 on Alex's suggestion) | Labour lines per WO: one row per task done by a mechanic. | `TBCLEUNIK`, `PCLEUNIK`, `PCLEUNIKDET` (link to the complaint), `DESC_80` (80-char task description), `DATA_COD` / `DATA_RAIS` (repair / reason codes), `TEMPSREEL` / `TEMPSE` (real / estimated hours), `ORDRELIGNE` (line order), `DATESTMP`. **Requested without** `LUCLEUNIK`, `TFCLEUNIK`, `ALIAS`, `NOMFULL`, `SALAIRE`, `SALAIREA`, `COUT_TOT`, `LUCleUnikAjout` (the tool never rates individual mechanics). |
| **TBONSANX** | Billed-to / delivered-to owner details. | Contains names, addresses, emails, phones. Not needed (see exclusions). |

## Join path
`VEHICUL.VECLEUNIK` -> `TBONS.VECLEUNIK`; `TBONS.TBCLEUNIK` -> `Plainte.TBCLEUNIK` -> `PlainteDet.PCLEUNIK`; `TBONS.TBCLEUNIK` -> `TBONSDET.TBCLEUNIK` (parts), with `TBONSDET.PCLEUNIK` pointing to the complaint when the part belongs to one.

## Mapping to the Phase 2 record (symptom, cause, correction, parts, region, vehicle, model, system)
- **symptom** = `Plainte.PSymptome` + `PDESC` (+ `CodePlainte` description)
- **cause** = `PCAUSE`
- **correction** = `PCORRECTIF` (+ repair code `PCODEREP` decoded through `CodesBT`)
- **parts** = `TBONSDET` rows linked to the complaint
- **region / branch** = `CICLEUNIK` (and `COD_DEPART`)
- **vehicle type, model, year** = `VEHICUL.TYPEVEC`, `MODELE`, `ANNEE`
- **system** = not an obvious field. Candidates: `PPOSI`, `PCODEREP`, `A_CodeGestion` / `A_SousCodeGestion`. To determine from real data.
- **repeat repair** = same `VECLEUNIK` with a later WO in the same `PCODEREP` / system within ~30 days (plan section C).

## Left out on purpose
The mechanic-identifying columns of `TBONSMEC` (user id, alias, name, salary, cost): (2026-10-05: the "never rates individual mechanics" rule is removed; these columns were simply not requested.) The task lines themselves are requested. `TBONSANX` (owner names, addresses, emails, phones): not needed for diagnosis. Costs and billing tables (`TFACT*`): not needed.

## Open questions only the real data answers
1. Are `PCAUSE` and `PCORRECTIF` actually filled, or mostly empty / "OK" / "réparé"? (Plan section C: usable-text rate.)
2. How many WOs and complaint lines since 2014 (sizes the vector index; see plan section "Verified 2026-10-01").
3. Is the live schema the same as the 2022 dictionary? (MIR may have been updated.)
4. How to connect with read-only access from Greg's locked PC: HFSQL data is read through its own ODBC / OLE DB driver or tool, which may need an install (IT ticket, justification). **To verify.** No-admin fallback: Alex exports the tables to CSV. Do not suggest bypasses.
5. Is the complaint text in French only, or mixed?

## What "Exclu" means (asked 2026-10-01)
Alex does not know why the `A_CodeRaisonExclu` / `A_CodeReparationExclu` tables (and their `CRAExclu` / `CREExclu` flags) are named that way. Not pursued with him. The flags come with the export; we will read their meaning from the data (which codes carry the flag, and what their descriptions say) and decide then whether to filter on them.

## First extraction proposal (once access exists)
Last 12 months of closed corrective WOs, tables `TBONS`, `Plainte`, `PlainteDet`, `TBONSDET`, `VEHICUL`, `CodePlainte`, `CodesBT`, without the excluded tables. Measure text fill rate and the repeat-repair rate before anything else.
