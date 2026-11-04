# BOULON cost breakdown (2026-10-06)

All figures are CAD. They are compiled from existing project docs, not re-priced today. Sources: `azure-tiers-verified-2026-09-24.md`, `it-requests/2026-09-24-azure-search-plan.md`, `viability-check-2026-10-06.md`, `phase2-plan-cmms.md`. Budget: **$5,000 CAD** (Greg's discretion, scoped for Phase 1); Pierre approves spending.

## 1. Where the money goes

| Line | Type | Amount | Status |
|---|---|---|---|
| Azure AI Search, Basic, Canada Central | Monthly | ~$112 to $115 (one copy, no uptime guarantee) | Ticket #77048 sent 2026-09-25, waiting on IT |
| Reading the PDFs (Document Intelligence), $13.86 to $14.17 per 1,000 pages | One-time per full indexing run | ~$277 per 20,000 pages (one pass) | Estimate |
| Image extraction + image descriptions (gpt-5-mini) + embeddings | One-time per run | ~$50 to $100 | Estimate |
| **Full indexing run, ticket figure** | One-time | **~$650, ceiling $1,200** | Ticket |
| Phase 2 (MIR) embeddings | One-time | under $1.50 | Measured size, estimated price |
| Phase 2 per-symptom summaries | One-time | ~USD $10 to $20 | Estimate |
| Second search partition (only if manuals pass ~450K chunks) | Monthly | +~$112 | Conditional |
| Semantic ranker | Per use | free for 1,000 requests/month, then USD $1 per 1,000 | Verified |
| **Copilot Studio credits (NOT in the ticket)** | Monthly | ~$305 at 50 mechanics (2 credits per answer at USD $0.01) | **UNVERIFIED price; may already be covered by a Transdev licence** |
| Free tier today | n/a | $0 | Running |

## 2. Scenarios (Azure only, from the 2026-10-06 cost audit)

| Scenario | Monthly | One-time | 12 months |
|---|---|---|---|
| Low: 10k pages, 1 run, 10 mechanics | ~115 | ~333 | ~1,710 |
| Expected: 20k pages, 2 indexing runs, 50 mechanics | ~130 | ~1,286 | ~2,850 |
| High: 40k pages, 3 runs, 200 mechanics, S1 for Phase 2 | ~179 Basic / ~446 S1 | ~4,300 | ~8,280 |
| **Expected + Copilot Studio credits** | ~435 | ~1,286 | **~6,500** |

Against $5,000: Low and Expected (Azure only) fit. Expected with Copilot Studio credits and High do not, over 12 months.

## 3. What can move the number
- **Re-indexing is the main risk.** Each full run is ~$600 to $650 and re-runs re-bill everything. The enrichment cache (preview) would cut re-runs to cents but must be set before the first big run.
- **Timed-out PDF pages are still billed.** Billing continues until the service is deleted.
- **Exchange rate:** the ticket used 1.3861, today is 1.4166, so the 40,000-page ceiling is ~$1,226, above the $1,200 cap.
- **"Two passes per page" has no Microsoft basis** (one Layout call per document), so it is margin. The one-file trial measures the real cost.
- **Image-description reasoning tokens** could make that line up to ~6 times the ticket figure (unmeasured, still tens of dollars).
- **Uptime guarantee** needs 2 replicas, roughly double the monthly search cost.
- **S1** would be ~$374/month (Canada Central), a free in-place switch later, so not worth buying now.

## 4. Open items before this is final
1. Copilot Studio credit price and whether Transdev already has capacity or Microsoft 365 Copilot licences covering it. Not verified.
2. Actual spend to date: check the Azure portal (Cost Management) for `BOULON-PILOT-RG`; nothing in the docs records it.
3. Which Canada Central meter (old or +10% "CC") the new service is billed on.
4. A named payer for Phase 2 running costs (the $5,000 was scoped for Phase 1).
5. Claude Code / ECC usage is outside this Azure picture.
