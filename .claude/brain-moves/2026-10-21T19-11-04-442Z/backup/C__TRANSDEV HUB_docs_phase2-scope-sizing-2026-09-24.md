# BOULON: Phase 1 + Phase 2 scope and plan-size review (2026-09-24)

This review was requested by Greg after the Pierre meeting. The goal: before opening the Azure ticket, make sure the plan it asks for covers the NEW scope (Phase 2 = maintenance history from MIR and the other maintenance systems, called CMMS), not just the pre-meeting goal. Pierre's advice (decision D4a): if we'll need a bigger plan later, pick it from the start.

Method: an `ecc:architect` review read every project doc, and a research agent checked prices and limits against Microsoft's live price list and Microsoft Learn (details and sources: `docs/azure-tiers-verified-2026-09-24.md`). Claude merged the two below. **A** = assumption.

## Verdict

**Ask for Basic now (Canada East, CAD $102.20/month). Submit the ticket today. Re-decide the plan once, at go/no-go, on measured MIR numbers.**

Why this also satisfies Pierre's "pick the right plan from the start":
1. **Upgrading later costs nothing extra.** Microsoft confirms Basic → S1 is an **in-place** switch (Settings → Scale): no rebuild, same address, Copilot Studio untouched, a few hours, the service stays online. Buying S1 now means paying +CAD $237.76/month (= $2,853/year) for capacity nobody can use yet.
2. **Nothing from MIR can be loaded for weeks anyway.** Alex has to provide an export first, and the data quality check has to be done.
3. **Every realistic Quebec scenario fits Basic** (table below). Only the US data lake or all of Canada at full history would need S1, and those are months away.

**The one thing that would force S1 from day 1: Transdev IT requiring private network connections** ("private endpoints") between the search service and storage. Basic can't use them for our type of processing (AI reading of PDFs). This question is now in the ticket.

## Sizing scenarios

Measured basis: the pilot index is 44.9 MB for 2,250 chunks (about 20 KB each, vectors included). One 1,536-number vector is about 6.2 KB.

Basic limits (verified): 15 GB storage, 5 GB vectors, 15 indexes per partition; up to 3 partitions at CAD $102.20 each.
S1 limits (verified): 160 GB storage and 35 GB vectors per partition, 50 indexes.

| Scenario | Chunks or records | Storage | Vectors | Indexes | Fits |
|---|---|---|---|---|---|
| (a) Phase 1 core library (about 20k pages, A: 1.5 chunks per page) | about 30k | about 0.6 GB | about 0.2 GB | 1–2 | **Basic**. The real limit is per file: 16 MB / 512k characters, and about 34 core files need splitting |
| (a+) plus the "later" manuals | about 60k | about 1.2 GB | about 0.4 GB | 1–2 | Basic |
| (b) plus MIR, base case (A: 90k corrective orders plus 5k summaries) | +95k | about 2.2 GB total | about 1.0 GB | 5–6 | **Basic** |
| (b) plus MIR, high case (A: 600k orders) | +600k | about 7.2 GB | about 4.3 GB | 5–6 | Basic, close to the vector limit. Fix with compressed vectors (4× smaller), or upgrade in place |
| (c) plus all Canadian CMMS | 0.2–1.2M | 2–12 GB | 1.3–7.8 GB | 6–10 | Basic → S1 (in-place) |
| (c) plus US data lake (A: 3M) | +3M | +30 GB | +20 GB | 8+ | S1 |
| If Copilot Studio can't filter by vehicle or region, so each one needs its own index | same | same | same | up to 24 | S1 (Basic allows 15 indexes) |

## What we still need from Alex Dumenne (MIR)

The original 12 questions are in `docs/it-requests/2026-09-24-mir-access.md`. Questions 13–21 were added today. The most important:
- Q13: total number of work orders since 2014, and what share is corrective.
- Q15: attachments.
- Q16: whether MIR runs on an in-house server. If yes, Azure can't read it directly, and we'd need an export file or Data Factory.
- Q20: whether the extract can land straight in Azure Canada storage, never on a laptop.

## Other Phase 2 needs (future company resources, not in this ticket)

1. **Azure OpenAI in Canada East, "Regional" deployment.** A "Global" deployment may process data outside Canada. Needed for embeddings (cents) and per-symptom summaries (about USD $10–20 one-time, A).
2. **Copilot Studio:** a second, expert-only agent plus an Entra security group, and message capacity.
3. **Budget:** the $5,000 was scoped for Phase 1. Phase 2 running costs need a named payer.

## Fixes applied because of this review

- The Azure ticket was rewritten (v2): Phase 2 paragraph, verified prices, the private-network question, and the manual count corrected from "100+" to 3,052 files.
- The MIR ticket: the false line « aucune donnée ne quitte l'environnement Microsoft » was corrected (Claude processes extracts outside Microsoft), and 9 sizing questions were added.
- `rebuild/v2`: a filterable `vehicle_family` field was added (free now, a full rebuild later). Manuals already disagree between models, and Phase 2 needs it.

## Flip conditions (re-open this decision if any is true)

- IT requires private endpoints → S1 from the start.
- MIR has more than about 300k indexable orders and full history is wanted early → still Basic now, upgrade in place when loading.
- US data or all-Canada data confirmed within 6 months → consider S1 at go/no-go.
- Microsoft reports no capacity for S1 in Canada East at upgrade time → new service plus re-index (about $300–600 once plus 1–2 days, from the scripted `rebuild/` files).

Still unverified:
- The Free tier's vector quota.
- Whether gpt-5-mini deploys regionally in Canada East.
- Whether Document Intelligence exists in Canada East.
- Which Canada Central rate a new service gets.
- Whether the Copilot Studio connector supports filters and per-index permissions.
