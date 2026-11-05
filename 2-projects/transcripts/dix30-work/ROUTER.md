# ROUTER — 2-projects/transcripts/dix30-work
Open only the line you need. Every child of this folder is listed below.

## Contents
- `grid.md` — war-room grid: every ask/decision of the 2026-11-03 meeting with timestamp, inferred speaker, existing doc, delta
- `tx.py` — faster-whisper chunk transcriber (int8 CPU, writes each segment as it goes)
- `assemble.py` — joins chunk TSVs into .txt/.srt and reports gaps and thin segments
- `build-plan-docx.js` — docx-js script that builds `1-boulon/docs/plan-projet-boulon-poc-scolaire-v1.0.docx` (run: node build-plan-docx.js out.docx, then refresh the TOC in Word)
