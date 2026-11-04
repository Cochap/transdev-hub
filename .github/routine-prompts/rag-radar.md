GITHUB ROUTINE RUN: TRANSDEV HUB weekly RAG radar. Today is <today> (America/Toronto).

You are in a Linux checkout of Greg's Windows folder C:\TRANSDEV HUB: any path C:\TRANSDEV HUB\X means ./X. Skip Windows-only steps (PowerShell, HQ server on 127.0.0.1, %USERPROFILE% or ~/.claude paths) with one line each in your report. Do NOT run git commit or git push: the workflow commits and pushes everything you write.

Read CLAUDE.md, then .claude/skills/rag-radar/SKILL.md and follow it: window = last 30 days; read 1-boulon/docs/rag-radar/knowledge-web.md, sources.md and the newest runs/ file. Categories A-E (A self-hosted RAG apps/frameworks; B parsing, chunking, multimodal; C embeddings, rerankers, hybrid search, vector DBs, GraphRAG; D local LLMs and serving; E evaluation, hallucination checks, guardrails, papers) with parallel helper agents (model sonnet) using web search and fetch.

Lane F (last30days community engine): the engine source is in the last30days plugin repo (https://github.com/mvanhorn/last30days-skill). Clone it to /tmp, install its requirements with pip, and run it via 5-brain/scripts/last30days-run.py as the skill shows (drop --system-certs and the Windows uv wrapper; call python directly). Sources that need keys or cookies that are not set are skipped and counted 0. Never print keys.

Keep only items with a primary source URL and a date inside the window; never invent numbers. Update the knowledge web, write 1-boulon/docs/rag-radar/runs/<today>.md (line 1 = last30days health line; then Top 5 and Recommendations tied to known BOULON problems), update runs/ROUTER.md, add one row to 1-boulon/docs/timeline.md. Research only: change nothing in BOULON, Azure or .env.
