---
name: rag-radar
description: Weekly RAG radar (Mondays 08:15, or on demand with "run the rag radar"). Scans the last 30 days of AI news outlets, GitHub, Hugging Face, arXiv and community forums for advances in self-hosted RAG chatbots (tools, models, techniques, community builds), and grows a linked knowledge web in 1-boulon/docs/rag-radar/ that Greg can learn from and use for BOULON. Research only, changes nothing in BOULON.
---
# RAG radar: a web of what the community builds for self-hosted RAG

Goal: every week, catch the best new tools, models and tricks for **self-hosted RAG chatbots** (Retrieval-Augmented Generation = the bot first finds the right passages in your own documents, then answers only from them, with citations), and file each one in a linked knowledge web so Greg can learn from it and pick what to try in BOULON.

Files (all in `1-boulon/docs/rag-radar/`):
- `knowledge-web.md` — the living web. One node per tool, model, technique or community project, grouped by category, linked to each other with `[[node-id]]`.
- `sources.md` — where to look. Add good new outlets you find; mark dead ones.
- `runs/<YYYY-MM-DD>.md` — one report per run.

## BOULON context (why something matters)
- **Phase 1:** answer mechanics' questions from bus maintenance manuals (PDF, English and French, tables, wiring diagrams, torque values, safety procedures) with page citations and an honest "I don't know".
- **Phase 2:** suggest diagnoses from MIR work-order history (structured tables plus short free-text notes).
- **Today's stack:** Copilot Studio + Azure AI Search (see `1-boulon/docs/rag-plan-reference.md`, `1-boulon/docs/index-facts.md`). Self-hosting is a learning and future option: GPU or self-hosted options are fine if defensible, but Greg's PC is locked (no admin, installs need an IT ticket). Say so when a tool needs it.
- BOULON is **not** a part-lookup tool: weight procedures, troubleshooting and safety.

## Steps
1. **Clock and memory.** Get today's real date (`date`). Window = the last 30 days before today. Read `knowledge-web.md` (node ids and "last seen" dates) and the newest file in `runs/` so nothing already filed is reported as new.
2. **Search in parallel.** Start one helper agent per category group below, each on **Sonnet** (`model: "sonnet"`), each told: the 30-day window with real dates, the sources in `sources.md`, the BOULON context above, and to return only items with a URL and a publish date inside the window. Use WebSearch (standard; extended only when results are thin) and read the actual page or repo before trusting a claim. Groups:
   - A. Full-stack self-hosted RAG chat apps and frameworks (chat UIs, RAG engines, orchestration libraries, agentic RAG)
   - B. Document parsing and chunking (PDF, tables, scans, diagrams, OCR, layout models), multimodal RAG
   - C. Embeddings, rerankers, hybrid search, vector databases, GraphRAG and knowledge graphs
   - D. Local LLMs and serving (open-weight models good at grounded answers, French, long context; inference servers; quantization; hardware needs)
   - E. Evaluation, hallucination checks, citation verification, guardrails; plus notable papers and community write-ups (forums, blog posts, benchmarks)
   - F. **Community buzz lane (last30days, runs alongside A-E, supports them, never replaces them).** Run the installed last30days engine (plugin `last30days@last30days-skill`, auto-updates) through the PC wrapper, which fixes the corporate-certificate error. Use a 5-minute timeout; run it in the background while the helpers search:
     ```
     uv run --system-certs --no-project --with truststore python "C:\TRANSDEV HUB\5-brain\scripts\last30days-run.py" --research-only "self-hosted RAG" --plan "C:\TRANSDEV HUB\5-brain\scripts\rag-radar\last30days-plan.json" --subreddits "LocalLLaMA,RAG,selfhosted,LangChain,MachineLearning" --no-x-handle "theme topic, not an entity" --emit md --output "C:\TRANSDEV HUB\1-boulon\docs\rag-radar\last30days-raw\<today>.md"
     python "C:\TRANSDEV HUB\5-brain\scripts\rag-radar\youtube-month.py" "C:\TRANSDEV HUB\1-boulon\docs\rag-radar\last30days-raw\<today>-youtube.md"
     ```
     The second command is the YouTube lane: last30days' own YouTube search ranks by relevance and returns almost nothing from the last 30 days (measured 2026-10-29), so `youtube-month.py` uses YouTube's "This month" filter instead. The wrapper also passes `--use-system-ca` to Node (X client) and hides `OPENROUTER_API_KEY` so no paid reranking is attempted.
     You are the planner: before running, refresh `5-brain/scripts/rag-radar/last30days-plan.json` (1-4 subqueries, keyword-heavy `search_query`, no dates or "news" words; schema in the plugin's `skills/last30days/references/research-runbook.md` Step 0.75), steering one subquery at whatever BOULON pain is open in the newest run report. Then read the raw file: every item it surfaces (Reddit threads, HN stories, X posts, YouTube videos, GitHub repos, with their upvotes and dates) is a **lead**, not evidence. Hand each relevant lead to the matching helper (or check it yourself) so it is confirmed against a primary source before it enters the web. Engagement numbers (upvotes, points, likes) may be quoted as "community signal" next to the primary evidence. Its "Your files" section matches leads against our own notes (`1-boulon/docs`, `1-boulon/wiki`): use those matches to say which known BOULON problem a lead could fix. Skip off-topic hits (anything not about RAG, retrieval, documents or local LLMs).
     **Health line:** from its footer, record per source the count it returned. If X returned 0 items, put `X empty: refresh the X cookies (auth_token, ct0) in C:\Users\rilg01\.config\last30days\.env` as the FIRST line of the run report. If the engine fails, say so on line 1 with the error and carry on with A-E.
3. **Check the evidence.** Keep an item only if the source is primary (repo, release notes, paper, official blog, leaderboard page) or a named community post with details. Numbers (stars, benchmark scores, speeds, sizes) are copied from the source with its date; vendor claims are labelled "claimed by vendor"; anything not measured is labelled "Estimate". No source, no entry. Never fill the web from memory.
4. **Score for BOULON.** For each kept item give: what it is (one plain sentence, define any jargon), why it matters (what problem it solves better than before), BOULON fit (Phase 1, Phase 2, both, learning only), effort to try (runs in browser / needs Python / needs GPU / needs IT ticket), and status: `watch`, `try`, or `adopt-candidate`. Be strict: `try` only when it solves a known BOULON pain (tables in manuals, French, citations, diagrams, MIR text); `adopt-candidate` only with strong evidence.
5. **Grow the web.** In `knowledge-web.md`: add new nodes under their category using the node template; update existing nodes (new release, new numbers, "last seen" date) instead of duplicating; add links between nodes (`builds on`, `competes with`, `pairs with`, `replaces`). Move nodes not seen in 90 days and superseded ones to the Retired list at the bottom with one line why. Update the "Leaders" table at the top: the current best pick per category with its evidence link.
6. **Write the run report** `runs/<today>.md`: line 1 = last30days health (installed version from `claude plugin list`, per-source counts, X warning if any); window dates; counts (found, kept, new nodes, updated nodes); **Top 5 for BOULON** (short, plain words, each with link and the one thing to do next); **Recommendations** (2-4 concrete improvements to BOULON, each tied to a known problem from our notes and to the evidence that supports it; this is the point of the radar); what's new by category (one line each, link to node); "Trends" (2-4 lines on where the community is heading, only from what was found); sources searched. Then add the new run file to `1-boulon/docs/rag-radar/runs/ROUTER.md` and add one table row to `1-boulon/docs/timeline.md` in its existing format: `| <YYYY-MM-DD> (<Day>) | RAG radar run: <n> new, <n> updated nodes; top pick <name> (`1-boulon/docs/rag-radar/runs/<date>.md`). |`.
7. **Finish.** Reply with the run file path, the Top 5 names, and anything worth Greg's attention (for example a tool that fixes a current BOULON test failure). Short, scannable.

## Never
- Install, download or run any tool found (the only tool this routine runs is last30days, through the wrapper); change BOULON, Azure, Copilot Studio, the index, `.env` or `C:\Users\rilg01\.config\last30days\.env`.
- Print or write keys or cookies, or open the last30days `.env`.
- Use last30days `--publish`, `--publish-html` or `library feed --publish` (public pages).
- Report something older than the window as new (it can still update an existing node).
- Invent numbers, stars, benchmarks or release dates.

## Node template (in knowledge-web.md)
```
### <Name>  {#node-id}
- **What:** one plain sentence.
- **Why it matters:** ...
- **Evidence:** [source](url) (YYYY-MM-DD); numbers with dates.
- **BOULON fit:** Phase 1 | Phase 2 | both | learning only. **Effort:** browser | Python | GPU | IT ticket.
- **Status:** watch | try | adopt-candidate. **First seen:** YYYY-MM-DD. **Last seen:** YYYY-MM-DD.
- **Links:** builds on [[x]], competes with [[y]], pairs with [[z]].
```
