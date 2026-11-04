# Cutover runbook: the day ticket #77048 lands (P1-7, written 2026-10-08)

Goal: go from the Free index to Basic with the citation link intact, in one pass. Claude runs every step marked **Claude**; Greg only does the steps marked **Greg** (EN / FR labels).

## Before anything (Claude, today, no ticket needed)
- [ ] `node 1-boulon/tests/check-citations.js` passes on the Free index (baseline: 2,250 chunks, label <= 27 chars, page matches, SharePoint host).
- [ ] Golden v1 baseline on file: `1-boulon/tests/results/golden_2026-10-06_1342.md` (semantic 41/41, hybrid 35/41, keyword 30/41).
- [ ] Patch script for P0-1 written (below, step 5) and dry-run against the 2,250-chunk backup.

## When IT replies "done"
1. **Greg** hands over three things, pasted into `.env` himself (Claude never types keys): new search endpoint, admin key, query key (read-only); AI services endpoint + key (Canada Central).
   - Portal: Azure portal > the new search service > Settings > Keys ("Clés") and Overview > Url. AI services resource > Resource Management > Keys and Endpoint ("Clés et point de terminaison").
2. **Claude** fills the `<PLACEHOLDERS>` in `1-boulon/rebuild/v2/*.json` in memory only, never on disk.
3. **Claude** 1-file Basic trial (P0-3). Pass only if ALL true:
   - text chunks have a non-null `page_number` (unverified for markdown mode in v2);
   - the patch produces label (<= 27 chars) + SharePoint link `#page=N`;
   - a split file's link lands on the right ORIGINAL page (P0-5: original page = chapter offset + chapter page).
4. **Greg** clicks one citation from the trial in the Copilot Studio test panel; it must open the right page. Report back: opened / wrong page / error.
5. **Claude** post-indexing patch (same logic as `1-boulon/rebuild/v1-citation-fix/rebuild-index-with-links.js`): v2 maps `url` from the private blob path and `title` from the bare file name, which would BREAK the link. Re-run the patch after EVERY indexer run, then `node 1-boulon/tests/check-citations.js`.
6. **Claude** full ingest (D36 ceiling CAD 1,200). Before it: confirm enrichment cache (P1-9) is possible. Status 2026-10-08: it is a PREVIEW feature (REST preview API), needs a general-purpose v2 storage account and storage roles for the search identity. Do not rely on it until verified on the official Learn page ([configure](https://learn.microsoft.com/en-us/azure/search/enrichment-cache-how-to-configure)); otherwise run in small batches and watch the per-1,000-page meter.
7. **Claude** golden v1 on the new index (compare to baseline); `check-citations.js` again.
8. **Greg** in Copilot Studio: Knowledge > replace the source with the NEW endpoint using the QUERY key (read-only), never the admin key. Publish ("Publier"). Click test on one citation.
9. **Claude** logs result in `1-boulon/docs/test-ledger.md`, continuity log, timeline; keeps the Free index untouched until Greg confirms the cutover works.

## Red flags (stop and report)
- any chunk with a null `page_number`, a label > 27 chars, or a non-SharePoint host;
- the indexer reports failed items (v2 has `maxFailedItems: 0`, so it should stop itself);
- cost meter climbing faster than the CAD 7.08 / 1,000 pages estimate.

## Standing rules still in force until cutover
No writes to the Free index; never run the old v1 indexer; no Henri-facing material.
