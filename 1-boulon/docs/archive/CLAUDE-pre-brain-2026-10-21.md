# BOULON Maintenance AI — Project Context

BOULON is an AI maintenance assistant for Transdev Quebec mechanics, built in Microsoft Copilot Studio with an Azure AI Search knowledge source (RAG). This folder holds the project's planning/decision/status docs plus a small PowerShell test harness that queries the Azure AI Search index directly.

**Read `docs/continuity-log.md` first, every session.** It is the living source of truth: current agent state, what's retired, open items, dated decisions. Greg's daily view is **BOULON HQ** (`boulon-hq.html`, https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9). Refresh it after EVERY exchange (project skill `boulon-hq-update`). TODAY.md is retired (archived in `docs/archive/`).

**Source of truth (2026-10-07, Greg): the project brief 551 (4 May 2026), scan in `docs/source-of-truth/2026-05-04-note-de-projet-551.pdf`, transcribed in `docs/project-brief-551.md`.** Where another doc conflicts with it, the brief wins and the conflict is logged in `docs/continuity-log.md`. Key points: 3 workshops (Beloeil QC, Sudbury ON, Kitimat BC), 5 users each; French, English and Spanish; KPIs 95% confidence and 7 requests per location per day; estimated project cost CAD 5,510.50 with no Azure AI Search line.

## Files
| File | Role | Changes |
|---|---|---|
| `docs/project-brief-551.md` | Founding brief (source of truth): scope, KPIs, budget, people | Rarely |
| `docs/continuity-log.md` | Source of truth — Constitution / Map / Status / History | Often |
| `docs/timeline.md` | Planned vs actual dates, running time log | Often |
| `docs/implementation-spec.md` | Step-by-step build plan (Phases 1–3) | Sometimes |
| `docs/rag-plan-reference.md` | Why this design; cost; glossary | Rarely |
| `docs/assumptions-log.md` | Phase 0 assumptions, for Henri | Rarely |
| `docs/explainer-for-henri.md` | Plain-language RAG explainer | Rarely |
| `boulon-hq.html` | Greg's live page (published artifact) | Every exchange |
| `hq/` | HQ Control room: local server (http://127.0.0.1:4777), skill buttons, live metrics, run history. See `docs/hq-control-room.md` | When buttons change |
| `docs/howto-email-digest.md` | Power Automate morning email digest (to OneDrive `BOULON-inbox`), read by the session-start hook | Rarely |
| `docs/d4-tier-decision.md` | Search tier memo + devil's advocate | Rarely |
| `LEARNING.md` | Greg's AI-engineering study plan + progress log (placement 2026-10-20, Phase 1 entry). Driven by project skills `learn`, `start-learning`, `check-understanding` | Each lesson |
| `learning/matrix-cheatsheet.html` | Greg's interactive tutor notebook (published: https://claude.ai/artifact/RMu8SNfCmFA5qRf4gZgYvi). After EVERY lesson, add a card for each concept taught or visual that helped, update "Added so far" and the review queue, then republish with this `url` | Each lesson |
| `references/ai-engineering-from-scratch/` | Local clone of https://github.com/rohitg00/ai-engineering-from-scratch (course content in `phases/`); read-only, `git pull` to update | Rarely |
| `tests/run-pilot-tests.ps1` | Runs pilot retrieval tests straight against Azure AI Search | When tests change |
| `tests/results/` | Dated test output (evidence for Henri) | Each run |

## Who's who
- **Greg Riley** — project lead and builder, Transdev Quebec. Non-technical by background; wants minimal questions, maximum progress.
- **Henri Eckern** — Project Manager (Chef de projet) in the brief; project overseer; has builder access on the live agent.
- **Greg Boulon** — the NAME OF THE ASSISTANT (agent), "Greg Bolt" in English (project brief 551, 2026-05-04). It is not a person. Earlier notes calling it a previous project owner were wrong.
- **Matteo D'Alena** — on the project team in the brief. **Sebastien Boudrias** — licence acquisition and management contact in the brief.
- **Pierre** — Project Sponsor in the brief; senior Transdev Canada maintenance leader; **approves spending** (approves the Azure IT ticket) and set the Phase 2 direction (CMMS/GMAO diagnosis). Full name **Pierre Zivec** (surname confirmed by Greg 2026-09-24; transcript speaker label "ZIVEC").
- **Alex Dumenne** — Pierre's team (office at the back, Seb's team; in on Tuesdays and Thursdays); has access to MIR (Quebec CMMS). Phase 2 data contact.
- **Samir Macarem** — Hexagone/A-Tune (West CMMS) project manager. Don't contact before the go-live (~Oct 5); Henri makes the intro, likely in November.

**Related project ZBB** (zero-based budget tool, separate from BOULON): work on it from `C:\ZBB\` (its `CLAUDE.md` → `wiki/index.md`). It reuses this project's MIR export (`data/mir-export/dump/`) and `docs/mir-data-map.md`, read-only.

Phase 2 (2026-09-24): diagnosis help from maintenance history. Plan in `docs/phase2-plan-cmms.md`; meeting in `docs/meeting-2026-09-24-pierre.md`. MIR data comes directly from Alex Dumenne (no IT ticket). No Law 25 / privacy-officer / anonymization steps: Greg confirmed with the authorities that none apply (2026-09-29). All requests to IT and colleagues are written in French.

## Key facts
- Search endpoint: `https://boulon-pilot-search.search.windows.net` (reachable from this machine — confirmed 2026-09-23).
- Index name: confirmed `multimodal-rag-1790098589411` (2026-09-23 live test; not `boulon-pilot-index`).
- Keys live ONLY in `.env` (git-ignored). Never write keys into docs, chat, or logs. Claude never types keys — Greg pastes them into `.env` himself. (Corrected 2026-09-23: two keys needed — query key (read-only) for Copilot Studio's knowledge source; admin key for Claude's offline index reads only. Do not use admin key in Copilot Studio.)
- Copilot Studio agent model: GPT-4.1. Pipeline models: embedding model + `gpt-5-mini` (replaced deprecated `gpt-4o-mini`).

## Standing rules (full list in the Continuity Log's Constitution section)
- Plain, non-technical language by default — explain every technical term the first time it's used in a message, every time.
- Log project state and decisions directly in `docs/continuity-log.md` and `docs/timeline.md` — never hand Greg copy-paste work.
- Every action for Greg = full click-by-click tutorial, EN+FR labels (project skill `boulon-greg-steps`).
- Use ECC agents/skills on Claude's own initiative whenever they fit; never pre-assign them or ask Greg to pick.
- Every proposed test states the exact literal input string, where to run it, what counts as pass vs red flag, and what to report back.
- Every message ends with concrete next actions.
- Verify Azure pricing/quota/limit claims against current Microsoft docs before stating them.
- Greg works continuously — don't suggest pauses.

## Model routing for skills (2026-10-21)
7 fixed-step skills are pinned to Haiku in their own frontmatter (`model: haiku`; list in `.claude/model-routing.json`). For every other skill, run `scripts/model-router.ps1 -Skill <name> -Task "<one line>"` first and give helper agents the `model` it prints (haiku, sonnet or opus). It asks OpenRouter's Jev router (`typesafe/jev-router`, set in `routerModel`), reads `OPENROUTER_API_KEY` from this PC (never ask Greg for it in chat), and logs each pick, time and cost to `logs/model-routing.jsonl`. Switch: `scripts/model-router.ps1 -Switch on|off|status`. With no key or the switch off it returns sonnet and still logs.

## What changed with the move to Claude Code (2026-09-23)
The web workspace could not reach Azure (network policy), so Greg had to run every Azure step by hand. From Claude Code on Greg's machine, Azure AI Search IS reachable: Claude can run retrieval tests, pull real passages to write test questions, and read the index configuration directly — once a key is in `.env`. Copilot Studio itself is still configured by Greg in the browser.

## Useful ECC tools for this project
- `ecc:rag-pipeline-reviewer` (agent) — review index/chunking/retrieval config and eval coverage.
- `ecc:eval-harness`, `ecc:verification-loop` — keep a golden question set and rerun it after every index change (critical before the 100+ manual re-index).
- `ecc:living-docs-governance` — keeps the continuity log's Constitution/Map/Status/History discipline.
- `ecc:save-session` / `ecc:resume-session` — hand-off between sessions.
- `ecc:architecture-decision-records` — decisions Henri can audit.
- `ecc:deep-research` — verify open questions (e.g. photo support in Copilot Studio) and pricing.
- `ecc:plan` / `ecc:blueprint` — Phase 2 specialist planning.
- Not relevant here: language reviewers, TDD, build-fix, PR tooling.

## Skill map: call these on your own, without waiting for Greg (added 2026-09-23)
The skill list carries about 405 entries (about 97,000 characters of descriptions, measured 2026-10-07; ECC alone is 292 skills plus 94 commands), so descriptions past the first part of the list are dropped and many skills appear as bare names, including some synced Anthropic skills such as `anthropic-skills:pdf`. Project skills (`.claude/skills/`) always keep their descriptions. A bare name still works: invoke it by name, or read its SKILL.md. Check the folders `.claude/skills`, `~/.claude/skills`, `~/.claude/skills/synced` and the ECC plugin before saying a skill does not exist. Use this map:
| When | Use |
|---|---|
| Unsure which skill fits, a skill shows only a bare name, or before saying a skill does not exist | `boulon-skill-finder` (project skill; full index of all 309 ECC and synced skills in its `INDEX.md`, including launch and production ones) |
| Reading a PDF, a scan or a document image; Read fails on a PDF | `boulon-read-pdf` (project skill), which also points to `anthropic-skills:pdf` |
| Word, Excel or PowerPoint files | `anthropic-skills:docx`, `anthropic-skills:xlsx`, `anthropic-skills:pptx` (synced; invoke by name) |
| Any action Greg must do by hand | `boulon-greg-steps` (project skill) |
| Spending money, company resources, or software installs | `boulon-approval-package`; IT ticket draft in `docs/it-requests/` |
| End of every exchange | `boulon-hq-update` |
| Any visual, deck or report | `attention-architecture` (user skill) + `artifact-design` |
| Golden-set runs, retests after any index or agent change | `ecc:verification-loop`, `ecc:eval-harness`, `ecc:ai-regression-testing` |
| Index, chunking or retrieval questions | `ecc:rag-pipeline-reviewer` (agent) |
| Prices, limits, Microsoft features | `ecc:deep-research` / the `claude-code-guide` agent for Claude Code questions |
| Logging decisions for Henri | `ecc:architecture-decision-records`, `ecc:living-docs-governance` |
| Planning or re-planning | `ecc:planner` (agent), `ecc:blueprint` |
| Briefing a helper agent | `ecc:prompt-optimizer` (sharpen the brief first) |
| Testing the agent or index | `boulon-agent-testing` (project skill) |
| Reports / presentations for Henri | `boulon-report-pipeline` (project skill) |
| End of day | `boulon-end-of-day` (project skill) → `ecc:save-session`; next morning `ecc:resume-session` |

Tooling on this PC (updated 2026-09-24): Node.js v24 and the Claude Code CLI are installed. ECC 2.2.2 is installed at **project scope** (`ecc@ecc`) with **standard** hooks, and the hooks are live (GateGuard asks for facts before the first shell command). The claude.ai-synced copy `ecc@synced` is shadowed by the local one; leave it alone. `/ecc:configure-ecc`'s setup script refuses because of that synced entry (INVALID_PLUGIN_INVENTORY); use `claude plugin ...` commands instead. It's a locked company machine: software installs need an IT ticket.

**Republishing artifacts from a new session:** always pass the existing `url`. Without it the Artifact tool creates a NEW page. BOULON HQ = https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9 · Report = https://claude.ai/artifact/TBMF4xCyCiCcCycp2HuULV · Continuity log doc = https://claude.ai/artifact/SxLo2jz4EUyb75QUbmWaSP
