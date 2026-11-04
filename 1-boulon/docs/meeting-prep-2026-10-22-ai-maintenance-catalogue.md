# Meeting prep: "AI maintenance catalogue" (2026-10-22, evening) — v2

This is a face-to-face checkpoint with the whole group, the only one where BOULON is discussed in person. So it groups ALL progress to date, not one project. Built from the saved files: continuity log, test ledger, index facts, brief 551, cost files, timeline, and the ZBB wiki, README and hand-offs (`C:\ZBB`). Every number is labelled **Measured** (counted), **Verified** (Microsoft table or document) or **Estimate**.

**Attendees (as you listed them; spelling to confirm):** Sebastien Boudrias, Henri Eckern, Alexandre Dumaine (files say "Alex Dumenne"), Gabriel Lecavalier Lenoir, Dominique Venne Alexandre, Philippe Brevet, you. Pierre Zivec (sponsor) is NOT on your list. Roles known from files: Henri = project manager and overseer; Sebastien = licence contact in the brief; Alex = MIR data (his team supplied the export). Roles of the others: Unknown, do not guess.

**Likely agenda (your guess):** 1) BOULON and its infrastructure (services, specs); 2) ZBB, where it stands; 3) the local-hosted BOULON idea from Sebastien; 4) unknown. Suggested time split if you can steer: BOULON 60%, ZBB 25%, local-hosting 15%.

## 0. The honest framing
- BOULON is **proven on a small pilot, blocked on a ticket**. Nothing to scale until IT creates the paid search tier (ticket #77048, sent 2026-09-25, now 27 days).
- ZBB is **the one thing you can show working**: a running tool with a measured accuracy test. Lead the "what have you delivered" answer with it.

## 1. Opener (30 seconds, word for word)
"Two projects. BOULON is the AI assistant for mechanics: it answers from the manuals and names the manual and page. On the pilot's 23 manuals, the search step finds the right passage on 41 of 41 test questions, and the citations click through to the right page. The finished agent is good but not yet safe enough: it still gets some torque values wrong, and the paid rebuild is built to fix that. We are waiting on one IT ticket to load all the manuals, about 2,800 unique files. The second is ZBB, the maintenance budget tool: I rebuilt it on 10 years of real work orders, and on years it had never seen, its total-fleet error is about 5 to 6 percent a year, against 9 to 11 percent for the old version. It runs on my PC and I can show it."

## 2. BOULON: numbers to have in your head
| Fact | Value | Label |
|---|---|---|
| Pilot | 23 PDFs, 2,250 chunks (a chunk = one searchable piece) | Measured |
| Full library (Quebec Manuels folder) | 3,052 files = 2,785 unique (duplicates removed), 6.53 GB unique, about 131,756 pages | Measured |
| Search step on the test set | 41 questions: semantic 41/41, hybrid 35/41, keyword 30/41. **Search step only, not the final answer** | Measured |
| Finished agent (after latest instruction change) | about 39 of 41 questions behave correctly; stress set of 36 cases: 22 pass, 7 safe, 7 fail, 4 serious failures left | Measured (hand-scored) |
| Known wrong answer | agent said 12.7 Nm where the manual says 15 Nm (M6 class 12.9, Vicinity p.22); torque tables are flattened in the pilot, fix is in the paid rebuild, not proven yet | Measured |
| Free tier limit | 50 MB per index, 44.9 MB used, no uptime guarantee, cannot upgrade in place (new service) | Verified |
| Paid Basic tier | about CAD 102-112 per month | Verified |
| One-time PDF reading | **about CAD 933 to 3,652 depending on the reader** (the older CAD 650 / 1,200 assumed about 20,000 pages; the library is 131,756) | Estimate |
| Total cost | NOT final: the 10-06 range (1.7k-2.9k) predates this recount; say "still being re-estimated" | Unknown |
| Brief 551 budget | CAD 5,510.50 (software 2,510.50 + hardware placeholder 3,000), no search line | Verified |
| Scope per brief | Beloeil, Sudbury, Kitimat, 5 users each, FR/EN/ES | Verified |
| KPIs per brief | 95% agentic evaluation confidence; 7 requests per location per day | Verified |
| MIR history | 426,883 work orders 2014-2026, about 4.99 M job lines | Measured |

**Infrastructure in one breath (if they ask "what is it built on"):** manuals in Azure Blob storage, read and chunked by Azure AI Search with AI enrichment (text, images, diagrams), embeddings from an Azure OpenAI model, hybrid vector + keyword search with the semantic ranker, and a Copilot Studio agent (GPT-4.1) that answers only from retrieved passages and cites them. Region plan: Canada Central.

## 3. ZBB: the demo (read this, it was missing in v1)
What it is: a budget tool for yearly maintenance cost (parts, labour hours, total) with an 80% range, for a fleet file you load (CLASS, Start_Km, Distance). Streamlit app, double-click `C:\ZBB\run_zbb.bat`, opens in the browser **on this PC only, no data leaves**.
| Fact | Value | Label |
|---|---|---|
| Method | one cost-per-km curve per vehicle class, chosen by cross-validation on real MIR work orders (2015-2025), non-maintenance work excluded | Measured |
| Fleet total error, next-year test 2019-2025 (years the engine never saw) | about 5.4-5.8% a year, vs 8.7% (old ZBB, in its own comfortable range) to 11% | Measured |
| Single vehicle typical error | about 34-38% (old: 45-47%); extra vehicle info adds only about 1 point | Measured |
| Bad odometers | 57 vehicles (4%) with implausible odometer excluded by a permanent rule | Measured |
| Tests | 66 unit tests + 28 end-to-end tests (browser) | Measured |
| Old method check | the degree-15 curve of the previous version is within 0.3-6% of a plain average; negative costs outside the recommended km | Measured |
| Data | Quebec only; Voyago ruled out of scope (10-20); author Matteo has left | Verified |

**Be upfront about these (they are in your own hand-off):**
- The 80% range is **not yet honest**: it actually holds about 62-73% of the time for large fleets. Fix planned (widen the year-to-year spread), needs your OK before changing.
- Planned vs unplanned split is blocked until Alex explains the reason codes RMP, RDS, RND (changed in 2018). **This is a direct ask for Alex in the room.**
- The parts inflation index looks too steep for 2022-23: ask Henri.
- Demo to supervisors was milestone 4 of the ZBB plan: this meeting can be that, or set it up.
- Open question for you: which fleet gave "a 500k range" and what was its total budget? (If about 3M, that is about plus or minus 16%, close to what the data supports.)

## 4. Local-hosted BOULON (Sebastien's idea)
**Gap: nothing about what Sebastien said is saved in any file.** Before the call, write 3 lines in chat or tell me: what did he propose, what hardware or hosting, and what did he promise or ask? What the files already say that is relevant:
- You said GPU or self-host is acceptable if defensible (memory: open to heavy options).
- Today's design depends on Azure (storage, search, AI Search enrichment, embeddings) plus Copilot Studio. Local hosting means replacing each of those: a vector store (research notes list pgvector, Qdrant, Chroma), an embedding model (BGE or sentence-transformers), a local LLM, and a PDF-reading step (the Azure step handles scans, tables and diagrams, which is the hard part).
- Dify was looked at on 10-21: not suited to 30 GB of manuals (15 MB default per document). Verdict: do not install.
- The locked PC rule: installs need an IT ticket.
Safe line if asked cold: "I'm interested. To size it I need: which models, which server, how many users, and whether the manuals can leave the Azure path. I'd test it on the same 41 questions so we compare fairly."

## 5. Pain points to raise (pick 2-3)
1. **Ticket #77048** is the only blocker (27 days). Ask the room who can escalate and what IT needs. (No nudges to Henri's IT contacts, per your rule.)
2. **Sudbury and Kitimat manuals** are not collected: who holds them, and a fleet list per site?
3. **Manuals disagree** (wheel nuts: grease vs oil studs): answers must key on vehicle model, so we need the fleet list.
4. **Spanish** required and untested.
5. **Top 3 brands and mechanics' vocabulary** to load first.
6. **Budget gap:** brief says 5,510.50 with no search line.
7. **ZBB:** Alex, the reason codes; Henri, the parts index.

## 6. Questions to ask them
- What would count as success in 3 months, in your words?
- Which manuals do mechanics fail to find today?
- Who owns each workshop's manuals and how current are they?
- (Sebastien) What is the goal of local hosting: cost, data staying inside, or speed?

## 7. RAG vocabulary, mapped to BOULON
RAG = Retrieval-Augmented Generation: retrieve passages from our documents, then generate an answer using only them.
| Term | Plain meaning | In BOULON |
|---|---|---|
| Chunking | Cut documents into pieces | 2,250 chunks from 23 PDFs |
| Embedding | Numbers that capture meaning | 1,536 numbers per chunk |
| Vector search | Find chunks closest in meaning | semantic side |
| Keyword (BM25) | Match exact words | 30/41, weak on part numbers and cross-language |
| Hybrid | Both combined | 35/41 |
| Semantic ranker | Second model re-orders the top results | needed for English question on French manual: 41/41 |
| Grounding | Answer only from retrieved text | core rule in the agent instructions |
| Abstention | Say "I don't have that" | bilingual fallback line |
| Hallucination | Fluent but unsupported answer | main risk; safety numbers only from retrieved text |
| Golden set | Known-answer test questions | the 41 questions |
| Two knowledge tiers | manuals authoritative, work orders advisory | your design 10-06 |

## 8. Phase 2 in one sentence
From a reported symptom, suggest likely causes and the recommended diagnostic method from past work orders, as guidance with the number of past cases, never certainty; tier 1 (manuals) must be proven first, and a first version goes to a few expert mechanics.

## 9. Do not say
No dates or deadlines you cannot back. Do not call the pilot "production" or claim 100% accuracy. Never say "41 of 41 correct" without "search step only", never say "no wrong answer since the pilot started" (wrong torque, see section 2), never quote CAD 650 for reading (it assumed 20,000 pages), never say manuals are cut off at 262K characters (retracted after counting). Do not call costs final. Do not promise the ZBB 80% range as calibrated yet. Do not mention Matteo's code as wrong in front of others: say "the previous version".

## 10. Weak spots and honest answers
- "Why only 23 manuals?" Free tier cap; the ticket fixes it.
- "Is it safe?" Honest answer: not yet for torque values. It abstains rather than guesses in most cases and opens with a safety line, but it has given a wrong torque (12.7 instead of 15 Nm). That is why a check that every number appears in the retrieved passage is the first free fix, and why we test before launch.
- "Can we see it?" ZBB yes (run `run_zbb.bat` beforehand). BOULON via the Test panel, check it answers before the call.
- "How accurate is ZBB for one bus?" Honest: about a third off per vehicle; use the fleet total to budget.
