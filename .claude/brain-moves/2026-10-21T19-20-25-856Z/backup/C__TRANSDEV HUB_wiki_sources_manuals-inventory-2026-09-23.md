---
title: Source — Manuals inventory and tier re-check
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/manuals-inventory-2026-09-23.md]
---

**Bottom line:** the real manual library is 3,052 files and 6.95 GB, not "100+ manuals"; 101 files exceed the 16 MB limit. Recommendation (medium confidence): Basic tier, core library only, split large manuals by chapter.

Plain words: Claude scanned file names, folders and sizes only (no file opened) in `OneDrive - TRANSDEV\Manuels`. Full detail on [[manuals-library]].

## Key facts
- 101 files over 16 MB (about 4.8 GB); 4 files over 128 MB. About 1,300 files are CD-ROM page fragments. Confirmed duplicates exist.
- Proposed core library: about 150 to 300 files, 2.5 to 3.5 GB, about 20,000 pages (range 10,000 to 40,000, a guess from file size). 34 core files exceed 16 MB.
- Prices (Azure Retail Prices API, CAD, Canada East, 2026-09-23): Basic 0.14 per hour, about 102 per month; S1 0.4657 per hour, about 340 per month; Serverless Developer not priced in Canada East.
- One-time layout extraction for the core library about 277 CAD (range 139 to 555).
- Real choice: about 15 hours of one-time splitting versus 2,856 dollars a year for S1.
- Needs from Greg: current fleet list, page counts of the 5 biggest core manuals, manual update frequency.
- **Superseded:** the Canada East assumption; later moved to Canada Central ([[lessons-2026-09-24]], [[tier-limits]]).

## Related
[[decision-d4-paid-search-tier]] · [[lessons-2026-09-23]]
