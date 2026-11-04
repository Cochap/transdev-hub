# Viability check, 2026-10-06 (four read-only agents)

Greg asked: is the plan reliable, does the MIR data fit, and what does the ticket really cost? Four agents ran (MIR data sizing, Microsoft fact-check, cost audit, design review). Full reports are in the job folder `C:\Users\rilg01\.claude\jobs\19a4f034\tmp\` (`mir-sizing.md`, `ticket-verification.md`, `cost-audit.md`); the design review had no file tool, so its findings are summarised here.

## 1. Does the MIR data fit? (MEASURED)
- Rows: TBONS 426,883 work orders; TBONSDET 4,994,844 job lines; TBONSMEC 1,270,804; VEHICUL 2,516. No encoding damage.
- Mechanic text lives in `TBONSDET.DESC_80` (cut at 80 characters). 93% of work orders have usable text once job lines are rolled up (median 98 characters). 27% of job lines are signatures or system notes.
- Repair codes: 99.3% of work orders, but only 94 codes, and they name body systems, not symptoms.
- Vector memory at 1536 dimensions, float32 (Basic = 5 GB per partition):
  - Design A, one record per work order: 397,840 records, 2.47 GB. Fits.
  - Design B, one record per job line: 2,095,312 records, 13.0 GB. Does not fit one partition (int8 compression does).
  - Design C, A plus 11,799 summary records: 2.54 GB. Fits. **Recommended.**
- Manuals plus MIR on one partition: pilot 0.93 GB + C = 3.47 GB fits. Full library at 300K chunks + C = 4.40 GB (88%), tight. At 450K or more manual chunks a second partition is needed (about CAD 112/month).
- Embedding cost for MIR: under CAD 1.50 (chars/3 case).

## 2. Ticket facts re-verified (Microsoft, 2026-10-06)
- Confirmed: Basic limits (15 GB, 5 GB vectors, 3 partitions, 15 indexes), Basic to S1 in place, 16 MB / 512,000-character file limits, AIServices must match the search region when attached by key, semantic ranker 1,000 free requests per month then USD 1 per 1,000.
- Stale or wrong in the ticket: exchange rate (now 1.4166, ticket used 1.3861): Basic about CAD 114.90/month (CC meter) or 104.46 (old meter); Layout CAD 14.1655 per 1,000 pages. The 40,000-page ceiling comes to about CAD 1,226, above the CAD 1,200 cap.
- "Two passes per page" has no Microsoft basis: one Layout call per document. Treat as margin; the one-file trial measures it.
- "CAD 112 at most" assumes one copy of the service with no uptime guarantee. A guarantee needs two copies (roughly double).
- Semantic ranker errors after 1,000 requests a month until the Standard plan is switched on.
- The Import data wizard may not work in Canada Central (Microsoft lists three other regions); the REST/script route works.
- Copilot Studio documents nothing on per-query filters or passage caps. Citations use `metadata_storage_path` or any full-URL field, no title mapping. One index per knowledge source. Generative answers cost 2 Copilot Credits each.
- Hidden: billing continues until the service is deleted; timed-out Layout documents are still billed; re-runs re-bill everything.

## 3. Cost audit (CAD, Azure only unless noted)
| Scenario | Monthly | One-time | 12-month total |
|---|---|---|---|
| Low (10k pages, 1 run, 10 mechanics) | ~115 | ~333 | ~1,710 |
| Expected (20k pages, 2 indexing runs, 50 mechanics) | ~130 | ~1,286 | ~2,850 |
| High (40k pages, 3 runs, 200 mechanics, S1 for Phase 2) | ~179 Basic / ~446 S1 | ~4,300 | ~8,280 |
- Not in the ticket: **Copilot Studio credits** (2 per answer; about CAD 305/month at 50 mechanics using USD 0.01 per credit, a price recalled from memory and NOT verified). Adding it to the Expected case gives about 6,500. Unknown whether Transdev already has Copilot Studio capacity or Microsoft 365 Copilot licences that cover it.
- Re-indexing is the cost risk: each full run is about 600 to 650. The enrichment cache (preview) cuts re-runs to cents but needs a setting added to the indexer before the first big run.
- Hidden reasoning tokens in the image-description model could make image descriptions about 6 times the ticket's figure (unmeasured).

## 4. Design review (opinions labelled as such)
- Phase 1: VIABLE WITH CHANGES. Evidence: index golden 41/41 semantic, agent 5/5 safe. Unproven: citations, Vicinity p.22 torque table (CRITICAL), scale beyond 23 files, abstention depends only on instructions. Gate rollout on the one-file v2 trial plus an agent-level evaluation (Copilot Studio Evaluation tab, `1-boulon/tests/copilot-eval/boulon-golden-v1.csv`).
- Ticket: VIABLE. Do not resubmit; IT is the bottleneck, not the money.
- Phase 2: NOT VIABLE AS PLANNED. MIR records what was done, not what was wrong; no symptom or cause field (Plainte tables empty). "How often X was the real cause" cannot be computed. Redesign statistics-first: a table precomputed by vehicle model and repair code (cases, top repairs and parts, repeat-visit rate within 30 days, date range); the chat model only picks the row and quotes it; below a minimum case count it says there isn't enough history. Alex is right that text search is the wrong tool for counting, wrong that Azure search collapses at this size.
- Cheap experiment (hours, no IT): build the table from 2014 to 2024, predict the repair on 2025 to 2026 corrective work orders, compare with a "most common repair" baseline, share of work orders in groups with enough cases, Alex reviews 20 results. `1-boulon/mir/analyze-export.js` needs adapting (built for the empty Plainte tables).
- Plan gap: expert scoring was dropped (Greg, 2026-10-05), so the hallucination safeguard Pierre asked for (D16) now has no replacement; the test above is the substitute.
- Conflict to note: the plan says "no pre-processing" but precomputed statistics are pre-processing in Azure or a script; this is design, not data cleaning, and stays allowed.

## 5. What changes in what we tell Henri
Monthly about CAD 115 for one copy (no uptime guarantee). One-time about 650 per full indexing run, ceiling 1,200, measured by a one-file trial. Copilot Studio usage is billed separately and is not in the ticket. Phase 2 stays at "testing what MIR can answer" until the backtest result.
