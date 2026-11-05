# rag-local: Azure-free multimodal ingestion + reference engine (BOULON Phase 0)

Local, offline, deterministic ingestion and question answering over the IC BE/CE Electrical Circuit Diagram Manual (1,567 pages, vector drawings). Costs $0 and needs no Azure. Status date: 2026-11-05. Context: `1-boulon/docs/mvp-school-bus-2026-11-03.md` (section "2026-11-05 pivot") and the formal plan v1.1.

## Files
| File | Role |
|---|---|
| `ingest.py` | Entry point. PDF -> per-page enriched records (`pages.jsonl`): page text, reconstructed tables, relay map, diagram components/wires/cross-refs, poppler layout text as fallback chunk. About 2 min for 1,567 pages. |
| `tables.py` | Table reconstruction from word coordinates + PDF ruling lines; merged cells filled; option-marker legends attached; connector-ID binding. |
| `graphic.py` | Spatial verbalization of graphics (relay panel, PDF p.64) and diagram-page components/wires/CHx_y refs. |
| `rag.py` | Reference engine: BM25 (code-aware) + title boost + RRF with multilingual embeddings; structured routes (connector+cavity, fuse chart, relay slot); FR-EN glossary; scope guard; injection refusal; out-of-domain and value-evidence gates; citations (section, printed page, PDF page). |
| `build_emb.py` | Builds embedding caches (MiniLM, multilingual-e5-large) for `rag.py`. |
| `make_golden.py` | Generates the self-made golden set from our own extraction. |
| `golden-ic-v0.json` | Self-generated golden set (190 q, EN/FR). Measures self-consistency only. |
| `evaluate.py` | Runs a golden set; page@1, page@5, answer-in-top5, abstain accuracy, latency per slice. |
| `eval_blind.py` | Runs the blind set (pass = every `must_contain` token appears in the context). |
| `blind/golden-blind-v0.json`, `blind/png/`, `blind/BASELINE.md` | Blind set (45 q, 21 FR / 24 EN) written from page images only, the page images, and the untuned baseline. |
| `fidelity.py` | Compares every reconstructed table row to poppler `pdftotext -layout` (independent engine). Disagreements go to `fidelity-disagree.json`. |
| `must_answer.py` | Electrical questions containing words the out-of-domain/injection gates match (oil, pressure, bypass...): must not abstain. |
| `probe.py`, `dbg.py`, `scanhdr.py` | Throwaway diagnostics. |
| `fails-bm25-none.json`, `layout.txt`, `*.png` | Artifacts and page renders from runs. |

## Run (from this folder)
Commands use `PYTHONPATH=. python -P ...`. Needs PyMuPDF (`pymupdf`), numpy, a BM25 library, sentence-transformers for the embedding modes, and poppler (`pdftotext`) for the layout text and fidelity.

```
pdftotext -layout "<IC bus 2016-2024.pdf>" layout.txt
PYTHONPATH=. python -P ingest.py "<IC bus 2016-2024.pdf>" pages.jsonl layout.txt
PYTHONPATH=. python -P rag.py "fuse for the wiper motor"      # ask questions
PYTHONPATH=. python -P evaluate.py golden-ic-v0.json bm25     # self-made golden
PYTHONPATH=. python -P eval_blind.py bm25                     # blind set (set EMB=<model>, after build_emb.py, for embeddings)
PYTHONPATH=. python -P fidelity.py                            # vs poppler
PYTHONPATH=. python -P must_answer.py                         # false-refusal check
```

Argument order was read from each script's `sys.argv` handling; check the script before automating a run. Blind-set discipline: tune only on odd ids; even ids are held out and reported once at the end.

## Current scores (2026-11-05)
- Ingest: 1,529 tables, ~12,600 rows, 777 tables bound to a connector ID; relay panel p.64 36/36 slots; fuse/relay charts p.64-74 captured.
- Self-generated golden (190 q): 98% answer rows, 10/10 abstain. Self-consistency only.
- Fidelity vs poppler: 95.6% row agreement.
- Blind set (45 q): 53% untuned -> 82% after fixes. Held-out (even ids) score not yet reported.
- Must-answer: false refusals 5/15 -> 1/15.
- Latency 5-100 ms per question (engine only).

## Known gaps
- Weak extraction classes: "GAUGE" connector tables (~67% fidelity), some fuse-description tables (partly poppler layout splits); under visual review.
- Pure-graphic pages are not verbalized beyond the relay panel; plan: local vision model on the GB10.
- One refuse case (sensor ohms) is now answered (leak).
- Answer generation (LLM) runs in Copilot Studio and has not been tested end-to-end.
- IC PB105 <-> BE/CE series mapping unverified.
- Embedding comparison (MiniLM vs multilingual-e5-large) still running.
- Scope: IC BE/CE electrical manual only; Thomas/Blue Bird/Freightliner/Lion questions abstain by design.
