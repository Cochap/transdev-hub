---
title: ADR 0001 — Move from Free to paid Basic search plan
type: decision
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/adr/0001-paid-search-tier-basic.md, ../../1-boulon/docs/adr/README.md]
---

**Bottom line:** Accepted 2026-09-24: leave the Free search plan for Basic (then written as Canada East, CAD 102.20/month), with a CAD 150/month spending alert. Approved in principle by [[pierre-zivec]]; official once he approves the IT ticket. Deciders: Pierre (spending), [[henri]] (oversight), [[greg-riley]] (lead).

## Context
Free is 90% full with 23 manuals, cuts each file off at about 262,000 characters, and Microsoft can delete it if unused. The library has 3,052 files (core 150 to 300).

## Options
1. Stay on Free (impossible, already full). 2. **Basic.** 3. S1 (CAD 339.96/month). 4. Serverless (priced since 2026-09-13, caps vectors at 300 MB per index).

## Decision and why
Basic, with Free kept running until Basic passes every test. Smallest plan that holds the full library; Pierre: "100 balles par mois, ce n'est pas du tout le sujet". If the plan must change again, jump straight to one big enough ([[decision-d4a-pick-plan-once]], [[decision-adr-0003-tier-rescoped-for-phase2]]).

## Consequences
Needs an IT ticket ([[azure-ticket-77048]]); the v2 rebuild runs on Basic.

**Superseded in part:** the region. ADR 0001 says Canada East; the ticket v3/v5 (2026-09-24) moved to Canada Central, about CAD 112.42/month ([[decision-d4b-canada-central]]). Newer wins.

## Related
[[decision-d4-paid-search-tier]] · [[source-adr-0001]] · [[azure-search-tiers]]
