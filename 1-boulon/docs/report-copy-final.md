# BOULON progress report: final copy (plain-language writer + Claude edits)
Claude's edits after review:
- Written in Greg's voice ("I").
- V4 is credited to Greg ("I built").
- V3 is "set aside", not "stalled".
- "the $5,000 project budget" (it's not recorded as approved).
- No SLA is claimed.

Headline: **BOULON now answers from our manuals, not the internet.**
Chips: Where it started · What I tried · The breakthrough · The build · Testing record · Free vs Basic · Cost · What I need · Next steps

## Hero
In 9 working days (Sep 15–23), BOULON went from quoting internet brake-pad sellers to answering only from Transdev's own manuals, with the source shown. **Ask: approve the Basic search plan, ~$102 CAD/month (Canada East).**

## 1. Where it started (V0, Sep 15)
I received the agent on Sep 14 and started work on Sep 15. It had no guardrails:
- **Web search ON:** it could answer from the open internet, not just our manuals.
- **Ungrounded answers ON:** it could answer from general AI knowledge, with no document behind it.
- A vehicle question was answered from the wrong manufacturer's manual.
- Part 1000-1259 returned public brake-pad sellers instead of our parts manual.
- Its instructions promised maintenance-records (CMMS) data that wasn't connected.

## 2. What I tried (V1–V4)
| Version | Change | Test evidence |
|---|---|---|
| V1 · Sep 15–16 | Web search and ungrounded answers OFF | Cited the wrong parts file ("Hose, Drain"). Said part 1000-4270 was missing; it's on the page |
| V2 · Sep 16 | Built a search-then-filter lookup topic | 15 results, 0 exact matches |
| V3 · Sep 16–17 | Planned a small 19-page pilot manual | Set aside: it didn't fix the search method |
| V4 · ≈Sep 17–21 | I built an exact part-number lookup (SharePoint list + Power Automate flow) | Accurate, but only for rows typed in by hand; it couldn't scale |

Each attempt fixed a symptom. The real problem was how the agent searched.

## 3. The breakthrough: RAG
**RAG** (retrieval-augmented generation: look up the passage first, then answer only from it) works like an **open-book exam**:
1. **Question:** the mechanic asks.
2. **Look it up:** BOULON finds the exact passage in the manuals, using **hybrid search** (exact words + meaning) and **semantic ranking** (best answer first).
3. **Answer with the page:** it answers only from that passage and shows the source. It's **multimodal**: diagrams are readable too.

**What this means for bus manuals**
- Torque values come from the table row, not a guess.
- Part numbers keep their exact digits.
- An English question finds the French manual page.
- It says "I don't have that information" for manuals we haven't loaded.

**Why it beats what came before:** the old setup skimmed the whole library live and hoped. RAG builds an organised, searchable copy (an **index**) first, so every answer is checked against real text.

## 4. The build (Sep 22–23)
- **Sep 22:** index built on Azure AI Search (23 manuals, 2,250 passages); the old lookup and SharePoint source retired; first real test passed.
- **Sep 23:** full test set, citation display fix, a safe bilingual "I don't know" reply, agent published.

## 5. Testing record
- **111 tests run; 70 valid.** The other 41 were setup errors, such as a wrong password, not wrong answers.
- **Real failures: 11 in V0–V2, down to 5 in V5–V6.** All 5 came from probing the search engine directly. **No wrong answer from the agent since the new method.**
- **Two open issues:**
  1. Citations show a technical file name instead of the manual name. The fix comes with the new plan.
  2. One torque table's rows run together. It will be fixed before rollout.

## 6. Free vs Basic
| | Free (now) | Basic | What it means for us |
|---|---|---|---|
| Space | 50 MB, 90% full | 15 GB | Free is nearly full after 23 manuals; Basic fits the current fleet's library |
| File size limit | 16 MB | 16 MB | Big manuals get split into chapters either way |
| Text read per manual | 256,000 characters | 512,000 characters | Fewer manuals cut off |
| Libraries (indexes) | 3 | 15 | Room to rebuild with proper source labels |
| Deletion risk | Can be deleted if unused | Dedicated, and not deleted when unused | It won't disappear |
| Upgrade path | None; start over | Upgrades in place | Not a dead end |
| Cost | $0 | ~$102 CAD/month | Fits the $5,000 project budget |

## 7. Cost: ~$102 CAD/month, billed hourly, no contract
First year ≈ $1,500, including one-time manual reading of ~$280. Safeguards:
1. A spending alert at $150/month.
2. The Free version stays until Basic passes every test.
3. Nothing is created before you approve.

## 8. What I need from you
1. Do you approve Basic at ~$102 CAD/month?
2. Which budget or subscription pays?
3. Which purchasing or IT process should I follow?

## 9. Road to Oct 16
- **Oct 1, Gate A:** citations show the real manual and page.
- **Oct 9, Gate B:** the full current-fleet library loaded and passing tests.
- **Oct 14:** soft launch with 3–5 mechanics.
- **Oct 16, Gate C:** your sign-off.

## Visual labels
- **Timeline:** Sep 8 internship start → Sep 14 agent access → Sep 15 V0 audit → Sep 16 lookup topic → ≈Sep 17–21 exact lookup → Sep 22 RAG built → Sep 23 tested + published → Oct 16 launch
- **Failure bars:** V0–V2: 11 · V4: 0 · V5–V6: 5 (search probes only, none from the agent)
- **Analogy:** 1 Ask → 2 Look it up → 3 Answer with the page
