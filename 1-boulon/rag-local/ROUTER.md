# ROUTER — 1-boulon/rag-local
Open only the line you need. Every child of this folder is listed below.

## Contents
- `blind/` — folder, 51 files → ROUTER.md
- `blind2/` — folder, 48 files → ROUTER.md
- `export/` — folder, 3 files → ROUTER.md
- `a1231.png` — image
- `a1248.png` — image
- `build_emb.py` — py script
- `dbg.py` — py script
- `emb-minilm.npy` — npy file
- `eval_blind.py` — Blind set (written from page images only). Pass = every must_contain token appears in the cont…
- `evaluate.py` — Run golden-ic set against the engine. Metrics per slice: page@1, page@5, answer-in-top5 (regex…
- `export_knowledge.py` — Export enriched knowledge for Copilot Studio / Azure AI Search.
- `fails-bm25-none.json` — JSON data
- `fidelity-disagree.json` — JSON data
- `fidelity.py` — Extraction fidelity: compare every reconstructed table row against poppler 'pdftotext -layout'…
- `fuse.png` — image
- `golden-ic-v0.json` — JSON data
- `grade_e2e.py` — Grade generated answers end to end: correctness (must_contain), refusal, citation page, langua…
- `graphic.py` — py script
- `ingest.py` — Ingest IC electrical manual -> per-page enriched records (jsonl). $0, offline, deterministic."…
- `layout.txt` — text file
- `make_context.py` — Build the grounded-generation packet for each question: exactly what a generator (Copilot Stud…
- `make_golden.py` — Build an IC golden set. Ground truth = every page whose reconstructed table holds the target r…
- `must_answer.py` — Electrical questions containing words the out-of-domain/injection gates match: must NOT abstai…
- `p101.png` — image
- `p1201.png` — image
- `p64.png` — image
- `pages.jsonl` — JSON data lines
- `probe.py` — py script
- `rag.py` — BOULON local multimodal RAG (Azure-free reference engine).
- `README.md` — rag-local: Azure-free multimodal ingestion + reference engine (BOULON Phase 0)
- `scanhdr.py` — py script
- `tables.py` — py script
- `v1231.png` — image
- `v1543.png` — image
