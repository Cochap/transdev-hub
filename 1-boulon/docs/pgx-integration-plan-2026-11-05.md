# ThinkStation PGX (GB10, 128 GB) — integration plan, 2026-11-05

## What the hub already planned for this machine
| Job | Source |
|---|---|
| Local vision model to verbalize the remaining pure-graphic manual pages | `1-boulon/rag-local/README.md` (Known gaps), `1-boulon/docs/mvp-school-bus-2026-11-03.md` (Scale path) |
| Run the e5-large embedding index (4.4 s/chunk on the laptop CPU, about 6 h) | `1-boulon/rag-local/blind/BASELINE.md` |
| Test, then host the vector base once the Copilot model works | `1-boulon/docs/proposition-plan-projet-2026-11.md` §8 |

So the PGX is the **local back end** for BOULON: same enriched pages, same tests, no cloud bill.

## Before plugging in (gate, see approval-gate rule)
1. Ask IT whether it may join the Transdev network (French ticket, `1-boulon/requests/`). Until yes: run it **offline / on a home or isolated network**, and copy only the SharePoint manuals already in `rag-local/`.
2. Do the first-boot setup yourself (Lenovo/NVIDIA OS = Ubuntu Linux on ARM). Create the local account on the device screen. Claude never types passwords.

## Week 1 — four steps, each with a pass test
| # | Step | Pass test |
|---|---|---|
| 1 | Boot, update the OS, note IP | `nvidia-smi` shows the GB10 GPU |
| 2 | Install a local model server (Ollama or vLLM) and pull one mid-size model plus one vision model | A French question answered in under 10 s |
| 3 | Copy `1-boulon/rag-local/` over, rebuild embeddings with e5-large on the GPU | Full index in minutes, not 6 h |
| 4 | Re-run `eval_blind.py` on the held-out set | Beat today's 17/22 (77 %) or match it |

## Week 2 — the real gains
- Vision model on the pure-graphic pages (wiring diagrams, B14/B20 misses) → re-run the blind test.
- End-to-end answer generation locally (the gap Copilot Studio never tested).
- Then decide: PGX as primary, or as the test bench feeding Copilot Studio / Azure.

## What Greg needs to learn (in this order)
1. **SSH** — open a terminal on the PGX from the laptop.
2. **Model server** — what Ollama/vLLM do (serve a model as an API on a port).
3. **Quantization** — why a 70 B model fits in 128 GB (smaller number formats). Cost: none.
4. **Vision-language model (VLM)** — a model that reads images and writes text.

## Open
- IT network approval (Greg).
- Which models: picked at step 2 from the current RAG radar `1-boulon/docs/rag-radar/knowledge-web.md`.
