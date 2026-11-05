# Azure and Copilot Studio skills: what we found (2026-11-04)

Recovered on 2026-11-05 from two sessions on 2026-11-04 ("Azure skills setup" and "Pending tasks checklist"). Until then, these findings existed only in session logs.
Sources:
- `C:\Users\rilg01\.claude\session-data\2026-11-04-azure-skills-setup-session.tmp`
- `5-brain/logs/eod/2026-11-04/ee480915.md` (lines 189–217)
- `5-brain/logs/eod/2026-11-04/7d963346.md`

## 1. microsoft/azure-skills: INSTALLED (user scope)
- **What it is.** Microsoft's official Claude Code plugin catalogue (MIT, 1.6k stars, updated weekly). It ships 7 plugins: `azure`, `azure-kusto-graph-skills`, `azure-local-skills`, `foundry-iq-skills`, `azure-cost`, `aks-skills`, `azure-advisor`. Together they hold 94 skills (`SKILL.md` files), plus MCP connectors: Azure MCP with 200+ tools, Foundry, and Azure Resource Manager cost.
- **Coverage for BOULON** (from a full crawl, 2,357 files):
  - Azure AI Search is covered by `azure-ai` and the `foundry-iq` plugin.
  - Copilot Studio appears only in passing, with no tools for it.
- **What works.** Signing in to Azure needs no Azure CLI: `npx -y @azure/mcp@4.0.0-beta.4 subscription list` returned 200. The same tool read the BOULON index definition (`search index get --service boulon-pilot-search`).
- **What doesn't work yet:**
  - `plugin:azure:azure` times out when Claude starts, because npx is slow on this PC. It still failed this morning.
  - The `azure-cost` connector fails with "Incompatible auth server: does not support dynamic client registration".
  - Search queries fail because the subscription is Disabled.
- **Fixes not tried yet:**
  - Raise the startup timeout with the env var `MCP_TIMEOUT=120000`, or install globally (`npm i -g @azure/mcp@4.0.0-beta.4`) and point the server at `azmcp`.
  - Use the main Azure connector for cost questions instead of `azure-cost`.
  - Telemetry is on unless `AZURE_MCP_COLLECT_TELEMETRY=false` is set.
- **Lesson.** The first rating (4/10) came from the README alone and was wrong. Memory: `feedback-crawl-full-repo`.

## 2. microsoft/skills: NOT installed (best fit for the BOULON build)
- **What it is.** Per-SDK skills (MIT, 3.2k stars). Relevant ones:
  - `azure-search-documents-py`, `-dotnet` and `-ts` (Azure AI Search);
  - `foundry-iq-knowledge-bases`;
  - `m365-agents-*`, which include a **Copilot Studio client**. This is the only Copilot Studio-related skill found.
- **Install.** `npx skills add microsoft/skills`, or copy skill folders by hand. The listed `/plugin marketplace add microsoft/skills` is written for Copilot CLI and has not been verified in Claude Code.
- **Red flags:**
  - The README calls it a work in progress, and its skill counts disagree (129, 174 and 175).
  - It bundles MCP configs for third-party servers (context7, deepwiki, playwright, markitdown). Review them before use.
  - Several Foundry skills are marked preview.
- **Verdict (researcher).** It's the closest fit for Azure AI Search work. `azure-skills` is better for operating Azure. Neither covers Copilot Studio directly. Third-party Copilot Studio skill repos have not been checked.

## 3. Already available locally
- `azure-search-index-projection-parent-fields`: an Azure AI Search `indexProjections` trap (chunk-per-document RAG).
- `last30days`: a community feed, already installed.

## 4. Briefing feeds (side finding)
- `camilleroux/tech-digest`: the safest feed for the locked PC (HN, Lobste.rs, RSS; no keys, plain Python). Not installed.

## Open (Greg)
- Pick which community skill to install first (`microsoft/skills` or `tech-digest`). This was asked on 11-04 and never decided.
