---
name: morning-brief
description: Use when Greg asks for a briefing, learning brief, "what's new", news on his interests, something to read while long jobs run, or when a day plan has wait time to fill. Collects many sources in parallel, routes items to Greg's interest map (4-learning/interests/interest-map.md), selects and enriches the best, renders a private briefing page, and files every new term and branch back into the second brain so the map keeps growing.
---
# Morning brief: collect → route to profile → select → enrich → render → file back

The point is not one page of news. Every run must **grow the second brain**: new terms go in a lexicon, new sub-topics become branches on the interest map, and the brief links from the map. A run that leaves the vault unchanged failed.

## Inputs (read first, every run)
1. `4-learning/interests/interest-map.md` — the branches, their status, frontier questions, excluded topics. This IS the filter.
2. Today's real date (`date`) and the newest file in `4-learning/interests/briefs/` (do not repeat its items).
3. Greg's current tasks: `RESUME.md` "Waiting on Greg" + today's plan in the conversation. A task Greg is new to (e.g. a project charter) becomes a learning branch for this brief.
4. `1-boulon/docs/rag-radar/runs/` newest file (RAG items already covered).
5. Memory `greg-interest-profile` for tone and exclusions.

Never include topics the map marks excluded (transit / school-bus industry news). Never list side experiments as tasks.

## Steps
1. **Pick lanes.** One lane per active branch of the map (usually 3-5), plus one "current task" lane if a task needs new knowledge. Window: last 14 days unless Greg says otherwise.
2. **Collect in parallel.** One background helper agent per lane, `model: "sonnet"`, each told: the window with real dates, the branch text and frontier questions, what to skip (previous brief + rag-radar run), and to return only items opened at a real URL with a date, each with: what it is (2 lines), why it matters for Greg's work (1 line), and one new term with a plain definition. Sources: GitHub trending (day/week), HN, arXiv, Microsoft Learn what's-new (Azure AI Search, Copilot Studio), Anthropic / LangChain / LlamaIndex blogs, Reddit and X when reachable. For community buzz use the installed `last30days` engine through `5-brain/scripts/last30days-run.py` (see the `rag-radar` skill for the exact command). For the current-task lane use authoritative sources (PMI, ASQ, LEI, OQLF for French).
3. **Route and select.** Tag each item with its map branch (e.g. `1.1`). Keep the 3 best as "read first", 6-10 total. Drop anything unverified or off-profile.
4. **Enrich.** For each kept item: the term it teaches, the branch, and one line tying it to BOULON / segmentation / the current task.
5. **Render.** Write `4-learning/interests/briefs/<YYYY-MM-DD>-briefing.html` (artifact-design rules: tokens, light+dark, phone width) and publish it as a private Artifact (icon `news`). Sections: Read first · items by branch · lexicon added today · tools to plug in (with locked-PC check; never install without Greg's yes).
6. **File back (required).**
   - Append new terms to `4-learning/interests/lexicon-ai-ml.md` or `lexicon-project-management.md` (or create `lexicon-<branch>.md` for a new branch). Update a line instead of duplicating.
   - Update `interest-map.md`: new sub-branches as `seed`, bump status, refresh frontier questions, add a row to "Briefs that grew this map".
   - Wiki: refresh `1-boulon/wiki/concepts/greg-interest-map.md` if branches changed; append to `1-boulon/wiki/log.md`.
   - Run `node 5-brain/scripts/brain.js build` then `audit`.
7. **Reply.** Link, the 3 reads, branches that grew, terms added. End with summary + next actions.

## Done means
The page opens, every item has a URL and date, and `git`-free proof: the lexicon and map files changed this run.
