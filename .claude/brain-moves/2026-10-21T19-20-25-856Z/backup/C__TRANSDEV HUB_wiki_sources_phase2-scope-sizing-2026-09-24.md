---
title: Source — Phase 1 + 2 scope and plan-size review
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/phase2-scope-sizing-2026-09-24.md]
---

**Bottom line:** the review concluded: ask for Basic now, submit the ticket, and re-decide the plan once at go/no-go on measured MIR numbers. Requested by Greg after the Pierre meeting.

Plain words: "scope sizing" means checking whether the paid search service you ask for is big enough for manuals plus maintenance history.

## Key facts
- Method: an architect agent read the project docs; a research agent checked Microsoft prices/limits ([[azure-tiers-verified-2026-09-24]]).
- Verdict reasons: Basic to S1 is in place (no rebuild); nothing from MIR can load for weeks; every realistic Quebec scenario fits Basic. Buying S1 now would add CAD 237.76/month (2,853/year) unused. See [[decision-adr-0003-tier-rescoped-for-phase2]].
- Only forcing condition for S1 on day 1: IT requiring private endpoints (Basic cannot use them with AI PDF reading).
- Sizing table, flip conditions: [[phase-2-sizing-scenarios]].
- Questions 13 to 21 were added for [[alex-dumenne]] (volume, attachments, hosting, daily changes, landing zone); later superseded by [[it-request-2026-09-29-mir-questions-alex]].
- Other future needs (not in the ticket): Azure OpenAI Canada East Regional deployment (Global may process outside Canada); a second expert-only Copilot Studio agent plus Entra security group and message capacity; a named payer for Phase 2 running costs (the CAD 5,000 was scoped for Phase 1).
- Fixes applied: Azure ticket rewritten v2; MIR ticket false line corrected; `vehicle_family` field added to `1-boulon/rebuild/v2`.
- Still unverified: Free-tier vector quota; gpt-5-mini regional deploy in Canada East; Document Intelligence in Canada East (later found not sold there, see [[azure-region-check-2026-09-24]]); Canada Central meter; Copilot Studio filters/permissions.

## Related
[[phase-2-cmms-diagnosis]] · [[azure-search-tiers]] · [[azure-ticket-77048]]
