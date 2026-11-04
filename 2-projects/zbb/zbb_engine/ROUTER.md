# ROUTER — zbb_engine
Real path: `C:/ZBB/zbb_engine` (pointer router; the project lives outside the brain folder)
Open only the line you need. Every child of this folder is listed below.

## Contents
- `__init__.py` — ZBB v2 budget engine (M2): rates rebuilt from MIR, stable curve, confidence bands."""
- `ci_params.json` — JSON data
- `engine.py` — Build per-class rate curves from vehicle-years and budget a fleet.
- `fleet_io.py` — Read a fleet file robustly and report problems instead of crashing or guessing silently.
- `levels.py` — Separate the odometer *shape* of costs from the yearly *level*.
- `mir.py` — Load MIR work orders (BOULON export, read-only) into vehicle-years with a ZBB class.
- `model.py` — Rate curves fitted on vehicle-year intervals.
- `select.py` — Choose each class's curve by test, not by hand (v3, 2026-10-14).
- `settings.json` — JSON data
- `verify.json` — JSON data
