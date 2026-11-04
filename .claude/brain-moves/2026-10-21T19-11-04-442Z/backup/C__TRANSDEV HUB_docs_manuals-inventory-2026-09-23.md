# Manuals inventory and D4 re-check — 2026-09-23

Source: file names, folders and sizes only (no file opened), scanned from `OneDrive - TRANSDEV\Manuels`. Raw output: `tests/results/inventory-raw.txt`. Analysis by `ecc:architect`; prices checked by Claude.

## Headline numbers
- **3,052 PDF/DOC files, 6.95 GB.** The project had assumed "100+ manuals".
- **101 files are over 16 MB.** These are the files Free and Basic won't read at all; they make up about 4.8 GB of the total. **4 files are over 128 MB**, the S1 limit.
- About 1,300 files are **CD-ROM page fragments** (MCI `pm55570`, `Dseries\parts`).
- Confirmed **duplicates** include:
  - the Delphi connector catalogue (twice);
  - the Lion gen2 electrical schematics (twice);
  - the 2019 Vicinity/Grande West parts manual (twice);
  - a file named "B21KLS-1 Parts Manual - Copie".

## By type (estimated from folder and file names)

| Type | Files | GB |
|---|---|---|
| Service / maintenance manuals | ~150 | ~2.0 |
| Parts catalogues | ~250 | ~1.8 |
| Supplier manuals (ZF, Voith, Delphi, Cummins…) | ~400 | ~1.2 |
| Electrical schematics / drawings | ~60 | ~0.8 |
| Operator manuals | ~40 | ~0.5 |
| CD-ROM fragments / support files | ~1,300 | ~0.35 |
| Duplicates | 5+ confirmed | 0.18+ |

## Proposed core library (phase 1) — needs Greg's fleet list
This assumes:
- Nova manuals labelled "Transdev Québec" are for current buses. Those labelled "Véolia" are older: Veolia Transport was the company's name before Transdev.
- New Flyer SR2254, SR2300 and SR1865 are current, and so are Lion and Vicinity.
- MCI, Prevost, Orion, IC and Grande West are unknown.

| Group | Files | GB |
|---|---|---|
| **Core:** service manual, parts catalogue and schematics for current models, one copy each | ~150–300 | ~2.5–3.5 |
| — of which over 16 MB | 34 | ~2.1 |
| — of which over 128 MB (Nova LB90 and LB52 service manuals) | 2 | 0.28 |
| Later (older models, supplier and operator manuals) | ~900 | ~3.0 |
| Never (fragments, duplicates, DVD/audio) | ~1,400+ | ~0.6 |

The core library is roughly **20,000 pages** (it could be anywhere from 10,000 to 40,000). That's a guess from file size, which can be off by 3× for scanned PDFs.

## Tier re-check
Prices are from the Azure Retail Prices API, CAD, Canada East, checked 2026-09-23:
- Basic: $0.14/hour, about **$102/month**.
- S1: $0.4657/hour, about **$340/month**.
- **Serverless Developer** (the pay-per-use option) has no price listed for Canada East. It's probably not offered in this region during the preview.

| Option | CAD/month | 12 months + one-time reading | Splitting work | Main risk |
|---|---|---|---|---|
| **Basic** | ~$102 | ~$1,530 | 12–20 h once, plus ~1 h a month | A manual that was missed when splitting is one BOULON can't see |
| S1 | ~$340 | ~$4,380 (88% of the budget) | 3–5 h once | Budget |
| Serverless Developer (pay per use) | not offered in Canada East (see above) | — | 0–1 h | Preview with no uptime promise (SLA), can never change tier, 1 GB cap per index |

- **One-time reading cost for the core library:** layout extraction (the AI that reads PDF pages and tables) runs about $277 CAD, somewhere between $139 and $555. Turning the text into searchable form costs under $5 (not verified).
- **Per-file character limits:** Basic reads up to 512,000 characters, roughly 100–250 pages. Nearly all 34 big core files are over that, so on Basic they must be split, about 150–250 pieces. On S1 about 15–25 pieces are still needed, because of the 2 files over 128 MB and the longest Nova manuals.
- **What changed from the first D4 memo:** that memo said "switch to S1 if more than 5 files are cut off". Real numbers show 34 core files would be rejected outright on Basic, not just cut off. But S1 doesn't remove splitting either. The real choice is **about 15 hours of one-time splitting versus $2,856 a year**.

## Recommendation (confidence: medium)
**Use Basic in Canada East. Load only the core library. Split the big manuals by chapter with a script.** Splitting by chapter also makes citations more precise. Switch to S1 in place if the fleet list pushes the core past about 40 oversized files, or the splitting past 20 hours.

## To raise confidence, Greg supplies
1. The current fleet list: Nova order numbers, New Flyer SR numbers, and whether MCI, Prevost, Lion, Vicinity, Grande West, IC or Orion buses are still in service.
2. Page counts for the 5 biggest core manuals. Claude can read these from file metadata once those files are downloaded.
3. How often manuals are updated each year.
