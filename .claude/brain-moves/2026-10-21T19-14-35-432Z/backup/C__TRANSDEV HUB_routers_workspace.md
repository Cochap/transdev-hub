# Workspace â€” how this brain runs
| Question | Open |
|---|---|
| Which skill fits? | `boulon-skill-finder` (index of all ECC/synced skills); skills live in `.claude/skills/` (`.claude/skills/ROUTER.md`) |
| Router builder / audit | `scripts/brain.js build` or `audit`, config `routers/brain.config.json`, skills `link` and `audit` |
| End of day | skill `boulon-end-of-day` + scheduled task `boulon-end-of-day-routine` (16:45 weekdays); gatherer `scripts/eod-gather-sessions.js`; extracts `logs/eod/` |
| Morning | `boulon-morning-check` |
| Model routing | `.claude/model-routing.json`, `scripts/model-router.ps1`, `logs/model-routing.jsonl`; 7 skills pinned to Haiku, helpers get the model the router prints |
| HQ page and control room | `boulon-hq.html` (artifact https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9; refresh via `boulon-hq-update` after EVERY exchange), `hq/`, `docs/hq-control-room.md` |
| Hooks and settings | `.claude/settings.json`, `.claude/hooks/` |
| AIOS kit files | `aios-intake.md`, `connections.md`, `EXPANSIONS.md`, `context/`, `decisions/log.md`, `audits/`, `brainstorms/` |
| Locked company PC (no admin; installs need an IT ticket) | skill `transdev-pc-shell-quirks`; memory: company-it-constraints |
| ECC notes | skill `ecc-operating-notes`; ECC 2.2.2 project scope, standard hooks |

Republishing artifacts from a new session: always pass the existing `url`. Report = https://claude.ai/artifact/TBMF4xCyCiCcCycp2HuULV Â· Continuity log doc = https://claude.ai/artifact/SxLo2jz4EUyb75QUbmWaSP

# Moved from the old CLAUDE.md (2026-10-21), unchanged

## Standing rules (full list in the Continuity Log's Constitution section)
- Plain, non-technical language by default â€” explain every technical term the first time it's used in a message, every time.
- Log project state and decisions directly in `docs/continuity-log.md` and `docs/timeline.md` â€” never hand Greg copy-paste work.
- Every action for Greg = full click-by-click tutorial, EN+FR labels (project skill `boulon-greg-steps`).
- Use ECC agents/skills on Claude's own initiative whenever they fit; never pre-assign them or ask Greg to pick.
- Every proposed test states the exact literal input string, where to run it, what counts as pass vs red flag, and what to report back.
- Every message ends with concrete next actions.
- Verify Azure pricing/quota/limit claims against current Microsoft docs before stating them.
- Greg works continuously â€” don't suggest pauses.
- Source of truth is `docs/project-brief-551.md`; conflicts are logged in the continuity log, the brief wins.
- Keys live ONLY in `.env` (git-ignored); never write, print or ask for them in chat.
- Money, resources or installs: approval package first (`boulon-approval-package`); IT tickets and colleague messages in French. Locked company PC, no admin.
- Refresh BOULON HQ after EVERY exchange (`boulon-hq-update`, always pass the artifact `url`).
- Give helper agents the `model` printed by `scripts/model-router.ps1`.
- New file or folder arrives: run `node scripts/brain.js build` (or `/link`); `node scripts/brain.js audit` must show nothing unrouted. Unsure which skill fits: `boulon-skill-finder`.
- Every message ends with a self-contained summary and concrete next actions.

## Model routing for skills (2026-10-21)
Covers ALL 439 skills and commands on this PC. Jev (`typesafe/jev-router` via OpenRouter, key from the `OPENROUTER_API_KEY` env var, never asked in chat) classified each once; result in `.claude/skill-routing.json` (pinned/routed + size; 28 pinned to Haiku, owned skills also carry `model: haiku` in frontmatter). A PreToolUse hook (`.claude/hooks/skill-model-route.js`) runs `scripts/model-router.ps1` on every Skill call and tells Claude which `model` to give helper agents; every pick, time and cost goes to `logs/model-routing.jsonl`. Switch: `scripts/model-router.ps1 -Switch on|off|status`. Minimum sizes (floors) and manual overrides: `.claude/model-routing.json`. Upkeep is automatic: a SessionStart hook (`.claude/hooks/sync-skill-routing.js`) starts `scripts/sync-skill-routing.ps1` in the background; silent when no skill was added or removed, otherwise it classifies only the new ones and notes it in `logs/routing-sync.log`.

## What changed with the move to Claude Code (2026-09-23)
The web workspace could not reach Azure (network policy), so Greg had to run every Azure step by hand. From Claude Code on Greg's machine, Azure AI Search IS reachable: Claude can run retrieval tests, pull real passages to write test questions, and read the index configuration directly â€” once a key is in `.env`. Copilot Studio itself is still configured by Greg in the browser.

## Useful ECC tools for this project
- `ecc:rag-pipeline-reviewer` (agent) â€” review index/chunking/retrieval config and eval coverage.
- `ecc:eval-harness`, `ecc:verification-loop` â€” keep a golden question set and rerun it after every index change (critical before the 100+ manual re-index).
- `ecc:living-docs-governance` â€” keeps the continuity log's Constitution/Map/Status/History discipline.
- `ecc:save-session` / `ecc:resume-session` â€” hand-off between sessions.
- `ecc:architecture-decision-records` â€” decisions Henri can audit.
- `ecc:deep-research` â€” verify open questions (e.g. photo support in Copilot Studio) and pricing.
- `ecc:plan` / `ecc:blueprint` â€” Phase 2 specialist planning.
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
| End of day | `boulon-end-of-day` (project skill) â†’ `ecc:save-session`; next morning `ecc:resume-session` |

Tooling on this PC (updated 2026-09-24): Node.js v24 and the Claude Code CLI are installed. ECC 2.2.2 is installed at **project scope** (`ecc@ecc`) with **standard** hooks, and the hooks are live (GateGuard asks for facts before the first shell command). The claude.ai-synced copy `ecc@synced` is shadowed by the local one; leave it alone. `/ecc:configure-ecc`'s setup script refuses because of that synced entry (INVALID_PLUGIN_INVENTORY); use `claude plugin ...` commands instead. It's a locked company machine: software installs need an IT ticket.
