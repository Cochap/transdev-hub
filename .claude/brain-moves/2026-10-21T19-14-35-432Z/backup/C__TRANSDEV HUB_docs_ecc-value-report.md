# ECC Plugin Value Report — BOULON Project

Prepared for Greg Riley · 2026-09-23 · covers "ECC" (a bundle of extra Claude Code helpers called agents and skills — think of them as specialist add-on tools Claude can call on)

**Purpose:** which of these add-on tools are actually worth using on BOULON, ranked by how much they'd help, how important the problem is, and how soon it matters. Most of ECC is built for software teams writing app code — BOULON is a chatbot config project, so most of the bundle doesn't apply. This report is deliberately short.

---

## Do now (this week — Step 1.8 testing)

**1. ecc:rag-pipeline-reviewer** (an "agent" — a specialist Claude can call in to look at one thing closely)
- What it does for BOULON: reads the Azure AI Search index settings (how manuals get cut into searchable chunks, how those chunks get matched to a mechanic's question) and flags weak spots — before we decide whether to fix chunking now (23 manuals) or after the full 100+ migration.
- Who does it: Claude alone, using the `.env` key once it's in.
- Effort: low (one command, minutes).
- Why it ranks here: directly answers TODAY.md's Block 6 decision #1 with evidence instead of guesswork, and it's cheap to run before committing to full migration.

**2. ecc:eval-harness** + **ecc:verification-loop** (skills — repeatable checklists/scripts Claude follows)
- What it does for BOULON: turns T1–T4 plus the hard-case questions (Block 5) into a saved "golden question set" that can be rerun automatically after any change to the index or agent instructions — so we can prove nothing broke instead of re-testing by hand every time.
- Who does it: Claude builds and runs it; Greg reviews the pass/fail summary.
- Effort: low-medium (builds on the test script that already exists).
- Why it ranks here: Step 1.8 is exactly this kind of testing, and it's the foundation for safely doing the Phase 3 full-corpus re-index later without repeating today's manual work.

**3. ecc:architecture-decision-records** (skill)
- What it does for BOULON: writes a short, dated, audit-ready record each time a real decision gets made (e.g. "finish Step 1.8 before full migration" or the fallback-source rule) — in a format Henri can review without reading the whole continuity log.
- Who does it: Claude writes it, using Greg's decision.
- Effort: low.
- Why it ranks here: Block 6 today produces exactly two decisions that need this; it's nearly free and directly serves the "Henri can audit" requirement in CLAUDE.md.

**4. ecc:ai-regression-testing** (skill)
- What it does for BOULON: specifically targets the failure mode this project already hit once — the AI answering from its own general knowledge instead of only the manuals (the Tesla torque test, and the Orion pressure-release item flagged as a possible past hallucination). It's built for catching exactly that kind of "sounds right but isn't grounded" error.
- Who does it: Claude alone, reviewing test results.
- Effort: low.
- Why it ranks here: this is BOULON's single biggest risk (a wrong torque spec could hurt someone), and Block 7 is actively investigating a suspected past instance today.

## What Claude/ECC can do on its own (no browser, no Greg needed)

- **ecc:rag-pipeline-reviewer**, **ecc:eval-harness**, **ecc:ai-regression-testing** (above) — all run against the Azure index directly now that Claude Code can reach it.
- **ecc:living-docs-governance** (skill): keeps continuity-log.md's Constitution/Map/Status/History sections consistent as the project evolves — already the working pattern, this just enforces it doesn't drift.
- **ecc:save-session** / **ecc:resume-session** (skills): saves full working context between sessions so nothing gets lost overnight — useful since this is a multi-week, multi-session project.
- **ecc:silent-failure-hunter** (agent): worth a one-time look at `tests\run-pilot-tests.ps1` to make sure a failed Azure query fails loudly rather than silently reporting a false pass — a test script that hides its own errors would be worse than no test script.

## What Greg and Claude do together

- **Running the actual tests**: Claude runs the PowerShell side against Azure; Greg runs the same questions by hand in Copilot Studio's Test panel (this is just today's plan, not an ECC tool — flagging it stays paired going forward).
- **ecc:deep-research** (skill): for open questions like "does Copilot Studio support photo/diagram answers" or checking current Azure pricing/limits — Claude researches, Greg confirms it matches what he sees in the Copilot Studio UI (which Claude can't access directly).
- **ecc:blueprint** or **ecc:plan** (skills): when Phase 2 (specialist topics/agents beyond basic Q&A) gets scoped, Claude drafts the plan, Greg reviews and approves before any Copilot Studio changes — since Greg is the only one with hands on that tool.

## Later-phase uses

- **Phase 2 (specialist agents/topics):** ecc:planner or ecc:architect (agents) to think through how new topics/tools should be structured before Greg builds them by hand in Copilot Studio; ecc:plan-prd or ecc:blueprint (skills) to turn Greg's goals into a concrete spec first.
- **Phase 3 (full 100+ manual re-index):** ecc:eval-harness / ecc:verification-loop (built this week) rerun automatically to catch any regression across the full corpus; ecc:rag-pipeline-reviewer re-checked once index size is ~4x larger, since chunking problems that don't show at 23 manuals can appear at 100+.
- **Final review with Henri:** ecc:architecture-decision-records (built up over the project) becomes the audit trail; a short plain-language status write-up (not an ECC tool, just good practice) summarizing what was tested, what passed, what the fallback rule is.
- **ecc:agent-evaluator** (agent): once BOULON has real usage, could periodically score answer quality on accuracy/completeness/clarity — worth revisiting in Phase 3, not now while the question set is still small.

## Skip — not relevant

Most of ECC assumes there's application code to build, test, or ship. BOULON has none of that (Copilot Studio is a point-and-click tool, not code Claude can edit). Skip:
- All language/framework code reviewers (React, Python, Go, etc.) and build-fix tools — no codebase to review.
- ecc:security-reviewer / ecc:security-scan — (Corrected 2026-09-23: security IS in scope for this project; see review-architecture.md H4.) Access control, key management, and Entra ID sign-in need design before wider rollout. Query key for Copilot Studio (read-only), admin key for Claude config reads only, mechanics-group restriction, conversation-log storage/retention compliance.
- ecc:cost-tracking / ecc:cost-report / ecc:token-budget-advisor — these track Claude Code's own token usage, not Azure's dollar cost; Azure spend against the $5,000 budget should be checked in the Azure portal itself.
- ecc:dashboard-builder, ecc:frontend-slides — no UI being built.
- ecc:jira-integration, ecc:email-ops — no Jira or email workflow in this project currently.
- ecc:hookify, ecc:agent-sort, ecc:workspace-surface-audit, ecc:enterprise-agent-ops — these tune Claude Code's own setup for large engineering teams; overkill for a one-person, single-folder project.
- ecc:council, ecc:santa-method (multi-AI-opinion tools) — useful for hard judgment calls, but nothing in BOULON right now needs a second opinion beyond Greg and Henri.

---

## Top 5 to do this week

1. **ecc:rag-pipeline-reviewer** — review the index/chunking config to inform the Block 6 "migrate now vs. finish testing first" decision.
2. **ecc:eval-harness / ecc:verification-loop** — turn T1–T4 and the hard-case questions into a rerunnable test set.
3. **ecc:ai-regression-testing** — apply it to the Orion pressure-release check (Block 7) and the Tesla "don't guess" test, since ungrounded answers are the top safety risk.
4. **ecc:architecture-decision-records** — log today's two Block 6 decisions in Henri-auditable form.
5. **ecc:save-session** — save state at end of day so tomorrow's session (or Henri's later review) picks up cleanly.

## Concrete next actions

- Greg: finish Blocks 1–4 and 7 in TODAY.md (key in `.env`, run Copilot Studio tests, check the Orion manual, reply agree/disagree on the two decisions).
- Claude: once the key is in, run ecc:rag-pipeline-reviewer against the index, then build the eval-harness question set from T1–T4 plus the hard-case questions from Block 5.
- Both: log the two Block 6 decisions using ecc:architecture-decision-records once Greg replies.
