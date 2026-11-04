---
name: zbb-data
model: haiku
description: Use when Greg asks for ZBB numbers, model data, results, test outcomes, dashboards, or "where is the ZBB data". Says where the live ZBB data, outputs and the Power BI dashboard are, read-only, aggregate facts only.
---
# ZBB data: where the numbers are
Project folder `C:\ZBB\` (pointer router `projects/zbb/ROUTER.md`). Data is Transdev-sensitive: summarise, never paste raw rows into the wiki, public tools or published pages.

| Number | Where |
|---|---|
| Model data (source of truth) | `C:\ZBB\raw\data\DonnÃƒÂ©es_PB.csv`; working-version copy `C:\ZBB\ZBB Final New UX\DonnÃƒÂ©es_PB.csv`; original in OneDrive `projet budget Final\ZBB Final New UX\` |
| Fleet inputs | `raw/data/Fleet_Template.csv`, `fleet_coach.csv`, `fleet_umw19.csv`, `Sudbury2K26.csv`, `fleet2.xlsx`, `test1.csv`, `schools_km.csv` |
| MIR Voyago export (2026-10-20) | `raw/data/mir-voyago-2026-10-20/`; wiki `wiki/sources/mir-voyago-export-2026-10-20.md` |
| MIR source tables | BOULON `data/mir-export/dump/` (read-only), `docs/mir-data-map.md` |
| Engine state | `data/engine.pkl` |
| Audit and backtest outputs | `audit/out/` (backtest_m2, bins_test, ceiling_test, ...) |
| Test results | `docs/test-report-2026-10-15.md`, `docs/zbb-fail-cases.md`, `docs/zbb-test-notes.md`, `docs/test-plan.md`; `tests/` |
| Defects and model audit | `wiki/syntheses/defect-list.md`, `model-audit.md` |
| Dashboard | Power BI report `projet budget Final.pbix` (OneDrive); description in `wiki/entities/power-bi-dashboard.md` and `projet-budget-final-pbix.md` |
| Greg's results table | `results.csv` (see `wiki/entities/results-csv.md`) |

Conflicts: `mega_script_v3.py` and `DonnÃƒÂ©es_PB.csv` win (see `C:\ZBB\CLAUDE.md`).
