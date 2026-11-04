# D4: Which Azure AI Search tier for BOULON

As of 2026-09-23 · written with `ecc:architect` (devil's advocate) and checked by Claude against Microsoft Learn

**Terms**
- **Search service:** the Azure product that stores the manuals so BOULON can look things up.
- **Tier:** the size of search service you pay for.
- **Index:** one searchable library inside the service.
- **Indexer:** the Azure job that reads the PDFs into the index.
- **Chunk:** one searchable slice of a manual.
- **Re-index:** rebuilding the library from the PDFs.
- **SLA (service-level agreement):** Microsoft's written promise to keep the service running.

## Recommendation
**Create a Basic search service in Canada East and build the full library there.** If the first full upload shows many manuals cut off because they're too long, upgrade the same service to S1 in place (no rebuild).

This matters even more now that D1 is leaning "no": you want every manual loaded now, and the Free tier physically can't do that.

## Options

Prices come from `1-boulon/docs/azure-limits-pricing-2026-09-23.md` (Azure price list, checked 2026-09-23). The limits come from Microsoft Learn: [limits page](https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity) and [capacity page](https://learn.microsoft.com/en-us/azure/search/search-capacity-planning), both updated 2026-09-16/17.

| Option | CAD/month | 12 months | Storage | Max file | Max text per file | What breaks |
|---|---|---|---|---|---|---|
| Stay Free | $0 | $0 | 50 MB (90% full) | 16 MB | 256,000 chars | Full library can't fit. Only **20 AI-processed documents per indexer per day**. Can be deleted if inactive. No SLA. Can never be upgraded |
| Serverless Developer (preview) | Pay per use (price not checked) | ? | 1 GB per index | 256 MB | 16 million chars | Preview with no SLA. **Can't be moved to any other tier later.** Only some regions |
| **Basic** | **~$102 (Canada East)** | **~$1,226** | **15 GB** | 16 MB | 512,000 chars | Very long manuals (roughly 250+ dense pages) get cut off |
| Standard S1 | ~$340 (Canada East) | ~$4,080 | 160 GB | 128 MB | 4 million chars | Uses about 82% of the $5,000 budget |
| Copilot Studio's own file upload or SharePoint | Included in licence (not checked) | ~$0 | not checked | not checked | not checked | Less control over tables and citations. The golden test set would have to be rebuilt |

## Devil's advocate

**"Stay Free, and trim or split the files."**
Loses. The full library is roughly 4 to 60 times bigger than 50 MB (see "Will the full library fit?"). The Free tier's limit of 20 AI-processed documents a day would also take weeks. And a Free service can never be upgraded.

**"Go straight to S1 — the 600-page manuals are the whole point."**
Partly right. Basic stops reading a file after 512,000 characters, roughly 250 dense pages. Our biggest manuals will likely hit that. The answer is to start on Basic anyway: Microsoft lets you switch Basic → S1 in the portal (**Settings → Scale → Change Pricing Tier**) with no rebuild. That way we only pay about $238 more a month if the tests prove we need to. *The devil's advocate wins if more than about 5 manuals are cut off.* In that case we upgrade the same day.

**"Serverless is cheaper: it drops to $0 when idle."**
Tempting for a bursty pilot, and the per-file limits are huge. But it's a preview with no SLA, the index is capped at 1 GB, and it can never move to a normal tier. A project heading to production for mechanics shouldn't sit on a dead end. *Loses for now.* Worth revisiting when it's generally available.

**"Skip Azure — use Copilot Studio's built-in knowledge."**
We'd lose the direct test harness, the citation fix, and control over how tables are read. Four days of measurements would have to start over. *Loses as the main path.* Could be tried side by side as an experiment.

## Will the full library fit on Basic?
- Today: 44.9 MB ÷ 23 PDFs ≈ **1.95 MB per PDF** in the index, or about **20 KB per chunk** (44.9 MB ÷ 2,250).
- Average case: 100 manuals × 1.95 MB ≈ **195 MB**.
- Worst case: every manual is 600 pages and read in full, at about 1,500 chunks × 20 KB = 30 MB each. 100 × 30 MB = **3 GB**.
- Basic holds **15 GB**, so storage fits either way. The real limits are **16 MB per PDF** (bigger files must be split) and **512,000 characters per PDF**.

## Risks and reversal
- **Cut-off long manuals:** Claude's coverage report lists every file that was cut off after the first full upload. If there are more than about 5, switch to S1 in place.
- **Cost:** set an Azure budget alert at $150/month. Separately, reading about 30,000 pages with Document Intelligence (the AI that reads PDF layout) costs about $416 once. Verify that figure before the upload.
- **No downtime:** keep the Free service until the golden test set passes on Basic, then point Copilot Studio at the new service.
- **Reversal:** delete the Basic service to stop billing. Basic and S1 switch in either direction.

## Still to verify
- Serverless per-use prices.
- Copilot Studio built-in knowledge limits.
- The Document Intelligence cost for the full library.
