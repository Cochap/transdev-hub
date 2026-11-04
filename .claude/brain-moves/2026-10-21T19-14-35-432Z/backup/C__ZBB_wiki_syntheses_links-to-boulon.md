---
type: synthesis
tags: [cross-project, mir, data-source]
sources: [external: C:/TRANSDEV HUB/docs/mir-data-map.md, external: C:/TRANSDEV HUB/data/mir-export/dump/ (headers only), external: C:/TRANSDEV HUB/docs/meeting-2026-09-24-pierre.md]
updated: 2026-10-14
---
# Links to the BOULON project (C:/TRANSDEV HUB)

BOULON is Greg's other project: an AI maintenance assistant for mechanics. It is **not** a financial tool and stays separate from ZBB (Pierre, 2026-09-24). The two share one thing: **the MIR work-order data**.

## What BOULON has that ZBB can use
- **A raw MIR export on this PC:** `C:/TRANSDEV HUB/data/mir-export/dump/` (3.5 GB; received 2026-10-05; 426,883 work orders 2014 to 2026). Tables: TBONS (work orders: odometer `ODOAVIE`, parts `TOT_PIECES`, labour `TOT_MDOEUV`, vehicle `VECLEUNIK`, date), TBONSMEC (labour lines: `TEMPS`, `TEMPSREEL` hours, `COUT_TOT`), TBONSDET (parts lines), VEHICUL (make, model, year, `TYPEVEC`, odometer), plus exclusion code lists.
- **A map of those tables:** `C:/TRANSDEV HUB/docs/mir-data-map.md` (from the MIR data dictionary).

## Why it matters for ZBB (inferred, not yet tested)
- ZBB's pipeline starts from a MIR extraction ([[mir-source-tables]], 492,009 WOs to 2026-03-03, via Power BI). The BOULON export is a different, more recent extraction (different table names, 426,883 WOs), so counts will not match exactly.
- It could let us **rebuild or check [[donnees-pb-csv]] without Power BI**, test the model against **actual costs**, and settle the **hours conflict** ([[hours-estimation]]): TBONSMEC carries real labour time per job.
- The folder names `TBONSMEC_QUEBEC` / `TBONSMEC_VOYAGO` in [[onedrive-project-folders]] match the TBONSMEC table name (inferred: the intern used the same table).

## Rules
- Read the export in place; never copy rows into the wiki, git or published pages. Aggregates only.
- Do not change BOULON files from the ZBB project.

## Voyago export (2026-10-20)
The Voyago MIR export was supplied separately (not in the BOULON dump) and sits in `raw/data/mir-voyago-2026-10-20/` of this project; see [[mir-voyago-export-2026-10-20]]. BOULON could reuse it the same way (same tables and columns), read in place from there.