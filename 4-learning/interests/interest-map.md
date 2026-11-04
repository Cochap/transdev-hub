# Greg's interest map (the trunk every brief and lesson grows from)

Bottom line: one tree of everything Greg wants to understand deeply. Each branch has sub-branches, a lexicon file, and "frontier" questions (what to learn next). The `morning-brief` skill reads this to filter news and writes back to it after every run, so the tree keeps branching.

- Source of each branch: Greg's own words, with date. Never add a branch Greg did not state or approve.
- Status per node: `seed` (named, nothing learned) · `growing` (some briefs/lessons) · `solid` (Greg can explain it).
- Excluded on purpose: transit or school-bus maintenance industry news (Greg, 2026-11-04).

## 1. RAG — deepening the logic `growing`
Stated 2026-11-04: "deepening my logic around rag". Work link: BOULON (Azure AI Search + Copilot Studio).
- 1.1 Retrieval vs selection (top-k, reranking, chunk budget) `seed` — lexicon: selection gap, retrieval reasoning effort
- 1.2 Agentic retrieval and routing (when to run the heavy path) `seed` — lexicon: adaptive routing
- 1.3 Evaluation and failure signals (golden sets, reformulation rate, lineage) `growing` — lexicon: lineage schema
- 1.4 Chunking, parsing, multimodal manuals `growing` — see `1-boulon/docs/rag-radar/knowledge-web.md`
- Frontier: why do correct chunks get dropped before the answer? What does "auto" reasoning effort cost on Free/Basic?
- Feeds: `rag-radar` skill (weekly), `1-boulon/docs/rag-radar/knowledge-web.md`

## 2. AI/ML taxonomy and lexicon `seed`
Stated 2026-11-04: "an understanding or lexicon of the taxonomy and terminology of the AI/ML world".
- 2.1 Core ML vocabulary (model, embedding, training vs inference, eval) `growing` — see `4-learning/LEARNING.md`
- 2.2 LLM application vocabulary (context engineering, offloading, tools, skills) `seed`
- 2.3 Agent vocabulary (orchestrator, subagent, ambient agent, harness) `seed`
- Lexicon file: [lexicon-ai-ml.md](lexicon-ai-ml.md)

## 3. Orchestration, hierarchy, architecture, infrastructure best practices `seed`
Stated 2026-11-04: "orchestrating/hierarchy/architecture/infrastructure best practices news, filtered to my work".
- 3.1 Multi-agent patterns (orchestrator + specialists, async subagents) `seed` — Copilot Studio reference architecture
- 3.2 Agent harness / platform parts (identity, memory, sandbox, schedules) `seed`
- 3.3 Agent security and sandboxing `seed`
- 3.4 Skills as packaging (Agent Skills standard, community skill repos) `growing` — this vault's `.claude/skills/`
- Frontier: how should BOULON Phase 1 and Phase 2 split into agents?

## 4. Project management and continuous improvement `seed`
Stated 2026-11-04: beginner; needs the proper terms, document types and best practices (first need: DIX30 project charter).
- 4.1 Project documents in order (charter → scope → WBS → plans → closing) `seed`
- 4.2 Lean / CI toolkit (A3, SIPOC, DMAIC, PDCA, gemba, kaizen) `seed`
- Lexicon file: [lexicon-project-management.md](lexicon-project-management.md)
- Frontier: charter vs A3 for the DIX30 project; how Transdev names these documents internally.

## 5. Community tools watch (GitHub trending, X) `growing`
Stated 2026-11-04: checks GitHub trending day/week/month and X every morning for skills and repos.
- 5.1 Briefing / news-aggregation skills (last30days installed; tech-digest candidate)
- 5.2 Azure skills (microsoft/skills, microsoft/azure-skills) — candidates for BOULON
- Rule: research and propose; installs need Greg's yes.

## 6. Hobbies `seed`
- 6.1 Motion design / Claude creative capability (Geotab explainer = capability test only, not a work task)

## Briefs that grew this map
| Date | Brief | Branches touched |
|---|---|---|
| 2026-11-04 | [briefs/2026-11-04-briefing.html](briefs/2026-11-04-briefing.html) · https://claude.ai/artifact/LDy4dVje5kx6BGPxdEvmLx | 1, 2, 3, 4, 5 |
