# BOULON progress report + cost request: technical copy deck
Technical writer agent, 2026-09-23. Saved by Claude. Sources are in [brackets]. **UNVERIFIED** marks a gap.

**Dates:** internship began Mon Sep 8; agent access came Sun Sep 14; work began Mon Sep 15. **Overseer:** Henri. ("Eric" was an earlier assistant's error.)

**Claude corrections after checking Microsoft Learn (2026-09-23):**
- Basic allows **15 indexes** (verified).
- **An SLA applies only with 2+ replicas.** A 1-replica Basic service has **no SLA**. Its gain over Free is dedicated capacity and no deletion for inactivity. Don't claim an SLA.

## 1. Hero
From an agent that quoted internet brake-pad sellers to a manual-grounded prototype that cites its sources, in 9 working days (Sep 15–23). **Ask:** Basic tier, ~$102 CAD/month, Canada East.

## 2. V0: inherited agent (from Sep 15)
- **Knowledge:** a single SharePoint connector (`Manuels d'entretien QC`, 7.79 GB, no filters).
- **Settings:** Web search ON; ungrounded responses ON.
- **Instructions:** claimed CMMS access, but no CMMS was connected.
- **Evidence:**
  - 1000-1259 returned public-web brake-pad sellers [ledger #2].
  - A vehicle-spec question was answered from the wrong manufacturer's manual [#1].

## 3. Debugging journey
| Ver | Change | Test and finding | Lesson |
|---|---|---|---|
| V1 (Sep 15–16) | Web OFF, ungrounded OFF, URL narrowed | 1000-1259: wrong `1359parts.pdf` "Hose, Drain" [#3]; `1259parts.pdf` matched on the filename [#4] | Internal retrieval itself was unreliable |
| V1 | Same | Correct Grande West manual cited, but 1000-4270 reported absent; it is present [#5]. Ground truth: 1000-4520 = bolt, p.162 [#8] | The right source does not mean the right passage |
| V2 (Sep 16) | Part Number Lookup topic: Custom Search → Filter | 15 results, 0 exact matches [#12]; 19 results, 0 matches [#13] | Retrieve-then-filter can't recover a chunk the search never returned |
| V3 (Sep 16–17) | Valeo 19-page pilot | Never run; scope not confirmed | Narrowing the scope doesn't fix the retrieval method |
| V4 (≈Sep 17–21, EST.) | **Greg built the Tier 1 exact lookup:** SharePoint list + topic + Get items tool + Power Automate flow | Test inputs UNVERIFIED; SharePoint generative answers found HK98-0021 [#15] | Exact lookup only covers hand-typed rows, so it doesn't scale |

## 4. Architecture shift: connector search → RAG on Azure AI Search
**RAG:** retrieve passages first, then answer only from them, with citations.
- **Chunking:** 23 PDFs → 2,250 chunks.
- **Hybrid retrieval:** keyword + vector (meaning) search.
- **Semantic re-ranking:** golden set scores semantic 10/10, hybrid 9/10, keyword 8/10 [#68–97].
- **Multimodal:** diagrams are described in text so they become searchable.
- **Citations.**
- **Grounding and abstention:** the D14 line [#103].

**Analogy: the open-book exam** (secondary image: the librarian). The student answers from the textbook and shows the page.

**What RAG means for bus manuals**
- **Torque values** must come from the table row.
- **Part numbers:** keyword matching keeps the exact string.
- **French/English:** the English→French seat question passes only with semantic ranking [#75, #85, #95].
- **Safety:** the agent abstains on unloaded manuals (Orion, Tesla) [#100–104].

## 5. Build and fixes
**V5, Sep 22**
- Azure set up; 25 PDFs uploaded; wizard index built.
- 23 documents indexed: 2 excluded (over 16 MB), 2 cut off at 262K characters.
- BTMS test PASS [#17].
- Tier 1 and SharePoint retired; CMMS lines removed.

**V6, Sep 23**
- Direct index tests; golden set v0.
- Fix 1 (bold part numbers, spaced citations).
- Fix 2 / D14: PASS [#103].
- Agent published.

## 6. Testing record
- **Totals:** 111 tests: 35 PASS, 13 SAFE-ABSTAIN, 6 PARTIAL, 57 FAIL. 41 FAILs were setup errors, leaving **70 valid tests and 16 real failures**.
- **V0–V2:** 14 tests, 11 real failures.
- **V4:** 2 tests, 0 failures.
- **V5–V6:** 54 valid tests, 5 real failures, all from direct index probes (G1/G8 keyword and hybrid [#68, #75, #85]; English keyword [#31]; flattened torque table [#33]).
- **No wrong answer from the agent since the Azure pilot.**
- **Open issues:**
  - The citation label shows the index name [#98, #99, #102].
  - The Vicinity p.22 torque table is flattened (CRITICAL before rollout) [#33].
  - The Fix 1 retest isn't logged.
  - Direct Line is blocked by sign-in [#107–111].

## 7. Free (now) vs Basic
| | Free | Basic | For BOULON |
|---|---|---|---|
| Storage | 50 MB, 90% full | 15 GB | Core library ~2.5–3.5 GB of PDFs → ~0.6–0.9 GB index |
| Max file | 16 MB | 16 MB | Split big manuals on either tier (34 core files) |
| Characters per file | 256,000 | 512,000 | Fewer manuals cut off |
| Indexes | 3 | 15 | Room for the new index with citation fields |
| AI processing | 20 documents per indexer per day free | Paid per page | Free would take weeks for the library |
| Deletion / capacity | Shared hardware; can be deleted if inactive | Dedicated; not deleted for inactivity (SLA needs 2+ replicas) | Stable base for mechanics |
| Upgrade | Never; a new service is required | In place to S1 | Not a dead end |
| Cost | $0 | ~$102/mo | Fits in the $5,000 budget |

## 8. Cost and safeguards
- **Cost:** ~$102/mo; ~$277 one-time reading (range $139–555; an earlier estimate said $416, to be verified Sep 25); first year ≈ $1,500.
- **Safeguards:**
  - Billed hourly, no contract.
  - $150/month alert.
  - Free is kept until Basic passes the tests.
  - Nothing is created before approval.
  - Copilot Studio uses the read-only query key.

## 9. The ask
1. Approve Basic at ~$102/month?
2. Who pays: which subscription or budget line?
3. Which Transdev purchasing or IT process applies?

## 10. Next steps
- **Sep 24:** approval → create Basic.
- **Sep 28–30:** new index with title and page fields; table-friendly extraction.
- **Oct 1, Gate A.**
- **Oct 5–6:** load the core library; Henri sets the targets.
- **Oct 9, Gate B.**
- **Oct 14:** soft launch.
- **Oct 16, Gate C:** sign-off.
