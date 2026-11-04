---
type: synthesis
tags: [data, mir, validation, voyago]
sources: [audit/matteo_load.py, audit/matteo_compare.py, audit/matteo_coverage.py, external: C:/Users/rilg01/Downloads/ZBB NEW DATA/ (Matteo's MIR extraction, downloaded by Greg 2026-10-15), external: C:/TRANSDEV HUB/data/mir-export/dump/ (aggregates only)]
updated: 2026-10-15
---
# Matteo's MIR extraction vs the BOULON export

Greg downloaded Matteo's extraction from SharePoint (MATTEO D'ALENA/Autre/projet budget (outdated)) on 2026-10-15. Files received as `.xlsx`: `MIR_QC_FACT_MAINTENANCE_WORKORDER.xlsx` (493,150 work orders, 40 columns), `MIR_QC_DIM_CONF_VEHICLE.xlsx` (5,471 vehicle rows; 4,639 distinct vehicles with work orders). Converted locally to `audit/out/matteo_*.parquet` (git-ignored).

## Data quality of this copy
- **Dates are destroyed:** `DATE` and `DATE_CLOSE` hold 0 (the cell value itself, not only the display; Excel number format `mmss.0`). The CSV was opened and re-saved by Excel, which lost the dates (inferred). 33,967 rows have shifted columns (commas in `DESCRIPTION`, as the handover says), which also puts text into `DATE`.
- Amounts, odometer, vehicle keys and `SOURCE_SYSTEM_ROW_ID` are intact.

## Transdev Québec: identical to our export
`SOURCE_SYSTEM_ROW_ID` = `TBONS.TBCLEUNIK` for Transdev Québec: 382,068 work orders matched (100%), with **100% equal** internal parts adjusted (`IN_PARTS_ADJUSTED_AMOUNT` = `TOT_PIECEA`), external parts adjusted (`EX_PARTS_ADJUSTED_AMOUNT` = `TOT_PARTIA`) and odometer (`ODOMETER` = `ODOINSPEC`, not `ODOAVIE`). Same ZBB class for 96.7% of 767 vehicles classed by both.
- This **confirms** the column meanings we had inferred from the misaligned MIR dictionary ([[model-audit]]), the choice of `ODOINSPEC` as odometer, and the class mapping including the disposed-by-model rule ([[budget-calculation-v2]]).
- Other pairs: `SHOPSUP_ADJUSTED_AMOUNT` = `TOT_SSUPPA`, `IN_WORK_ADJ_AMOUNT` = `TOT_MDOEUA`, `EXTERN_ADJ_TIME` = `TOT_TIMEINT` (equal on matched Québec rows; overall shares 83-96% include false Voyago matches).

## Voyago: the real difference
- Our BOULON export is **Transdev Québec only**. Matteo's file adds **Voyago: 77,078 work orders, 2,577 vehicles** (his 3,568 "vehicles in work orders" figure and 18.71% Voyago share in the handover).
- Voyago row ids collide with Québec ids by chance (separate MIR database, inferred): matched Voyago rows agree on odometer 0.1% of the time, so they cannot be linked to our export.
- Using Voyago needs **dates** (year, inflation, km per year) and preferably real hours; this copy has neither.
- **2026-10-15 update: the dates are lost at the source.** A second download (`MIR_QC_FACT_MAINTENANCE_WORKORDER (1).xlsx`, 110.7 MB) also holds 0 in `DATE`/`DATE_CLOSE`, and the separate `MIR_QC_FACT_MAINTENANCE_FUEL.csv` shows `FUEL_DATE` = `00:00.0` and `DATE_CHARGEMENT` = `03:59.0`: the files were saved through Excel before being put on SharePoint (inferred). Voyago cannot be dated from Matteo's files; only a new MIR export of Voyago would allow it.

## Coverage of our own data
Our VEHICUL is complete (0.1% of work orders have an unknown vehicle). 10.7% of work orders have no ZBB class, mostly non-revenue units (shop, building, external vehicles, tools), correctly excluded; Matteo's table would add a class for 169 vehicles only.

> **2026-10-20 update:** a clean, dated Voyago extraction was received and ingested ([[mir-voyago-export-2026-10-20]]): 109,194 work orders, 3,315 vehicles, 2021 to 2026-10-20, real labour hours, same columns as Québec. The "Voyago cannot be dated" limit above is lifted.