# BOULON: Building a Real Multi-Skill Assistant with Copilot Studio + Azure AI Search
**Written:** 2026-09-22 (Tuesday), updated same day after a second research pass and a live-pricing check | **For:** Greg Riley | **Style:** plain language throughout — every technical word is explained the first time it's used

---

## 0. What changed, and what's now confirmed

This has been checked multiple times now — broadly, then adversarially (actively trying to find something better before accepting it), then against real numbers. Confirmed, not just assumed:

- **Nothing available today completely eliminates AI hallucination — checked directly, not assumed.** I went looking specifically for anything that claims "zero hallucination." Nothing credible exists — not a product, not a research paper that holds up under its own fine print. OpenAI's own published research says current AI will never hit 100% accuracy on open-ended questions, for structural reasons, not because the engineering isn't good enough yet. So the honest target isn't "never wrong" — it's "every answer is traceable to a real page in a real manual, and the assistant says 'I don't know, ask a person' instead of guessing when it can't find a good answer." That's achievable, and it's what this plan builds toward.
- **Azure AI Search — with one small addition — is confirmed as the right choice, not just the default.** I checked it against the alternatives (a "knowledge graph" approach, retraining the AI itself on the manuals, and a few others). None of them are a better fit given the budget, the team, and the platform. The one worthwhile addition: a cheap second check that confirms every claim in an answer actually traces back to a real cited passage before it's shown to a mechanic — more on this in §3. (Corrected 2026-09-23: that verification pass was not built in Phase 1; see review-architecture.md C2.)
- **Good news on effort: it's less manual work than first thought.** Copilot Studio now has a simple, point-and-click way to connect an Azure AI Search "smart lookup" as a knowledge source — no hand-written conversation logic required for the basic version.
- **Pilot size, corrected:** a tiny pilot (10-20 manuals) isn't actually the safest choice, and doing all 100+ manuals at once isn't either. The better fit, and the reasoning why, is in §4.
- **Cost, now confirmed with real numbers (2026-09-22):** running the pilot for a full 6 months, on a reliable (not free) tier, costs roughly **$615 CAD** — about **12% of the $5,000 CAD budget**. Even a full 12 months of just the search engine running costs under $900 CAD. There's a large amount of budget room left over for real-world surprises (bigger-than-expected usage, needing a higher tier, adding the optional relevance-boosting add-on). Full math in §6.

---

## 1. The idea in plain terms

Right now, when a mechanic asks the assistant something, it either does an exact lookup (type a part number, get that exact record) or reads through connected manuals and answers in its own words. What you want is something closer to a real coworker: something that can help troubleshoot a problem, walk someone through a procedure, flag safety steps, look up a part, and reason across all of that in one conversation — reliably, and without making things up.

The technical name for the trick that stops an AI from making things up is **RAG**, short for **Retrieval-Augmented Generation**. Plain version: before the AI answers, it first goes and finds the actual relevant pages from your real manuals, and then it's only allowed to answer using what it found — with a citation pointing back to the exact source. It's the difference between someone answering from memory versus someone answering with the manual open in front of them, quoting it. **Azure AI Search** is Microsoft's tool for building that "look it up in the manual first" step.

**On eliminating hallucination completely:** checked directly, twice — see §0. Not possible today, by anyone, at any price. What's possible, and what this plan delivers: every answer traceable to a real cited page, and a hard "I don't know" instead of a guess when the evidence isn't there.

---

## 2. How Copilot Studio actually fits together

Four building blocks, plain-English:

- **Agent** = the assistant itself — the overall thing a mechanic talks to.
- **Topic** = one self-contained skill inside the agent, like "look up a part number." **Good news: you don't need to hand-build one of these to connect Azure AI Search.** There's now a simple "Add knowledge → Azure AI Search" button that does the connecting for you — point it at your search index, done. Hand-building conversation logic is only needed later for advanced custom control, not for the basic setup.
- **Knowledge source** = wherever the AI is allowed to pull facts from. The plan uses a proper Azure AI Search index. (Corrected 2026-09-23: SharePoint is not used as a live knowledge source during the pilot; it has been deliberately retired from Copilot Studio so test results measure Azure AI Search alone.)
- **Connected agent** = a specialist mini-assistant that the main assistant can call in for help, get an answer from, and fold into its reply — like calling in a specialist coworker instead of trying to know everything yourself. This is the real building block for "bigger than part lookup" — Microsoft's own current guidance describes exactly this pattern: one main assistant that decides which specialist to bring in (parts, troubleshooting, safety), gets their answer, and replies as one coherent voice. It's a real, supported way of building things today.

---

## 3. What actually gets built (the retrieval engine itself)

Confirmed as the right design after checking it against the alternatives:

1. **Azure AI Search**, set up with both keyword and "meaning-based" search working together (this combination performs better than either alone), pointed at your manuals.
2. **Tables and diagrams handled deliberately, not as an afterthought.** Plain manuals get chopped into readable pieces automatically; tables (like torque spec tables) need to be pulled out and kept intact rather than getting sliced apart, and diagrams need their captions/labels kept attached to them. This is exactly the case most likely to go wrong if skipped, so it's called out explicitly rather than left to default settings.
3. **Every answer shows its source** — which manual, which page/section — so a mechanic can double check against the physical manual before acting on it. This is the real safety net, not a promise that the AI is never wrong.
4. **One added safety layer beyond "standard" RAG, and it's the one addition worth the extra cost/effort:** a second, cheap check that looks at the AI's draft answer and confirms every factual claim actually traces back to a real retrieved passage — and forces the assistant to say "not found in the manuals, ask a person" instead of guessing when it can't find solid backing. This directly targets the actual risk (a mechanic acting on an unsupported claim), and it's affordable within the budget.

Explicitly **not** doing, and why: a "knowledge graph" approach (better at connecting facts across documents, but expensive to build and maintain — would likely eat the whole budget on setup before answering one real question) and retraining the AI itself on the manuals (a poor fit for exact numbers like torque specs — it tends to guess a "close enough" number rather than quote the real one, and needs to be redone every time a manual is revised).

---

## 4. The pilot: how big, and why

**Revised answer, checked directly against both extremes:** neither "start tiny" nor "do everything at once" is right here. The better fit is **roughly 25-35 manuals**, chosen on purpose to include your hardest cases — at least one very long manual, one with heavy/complex tables, one that's diagram-heavy — not just whichever ones are easiest to grab.

**Why not tiny (10-20):** the setup work (getting the pipeline built and configured) costs about the same whether it's pointed at 15 documents or 35 — so a tiny pilot doesn't actually save much effort, and it risks a false "it works!" result if your easiest documents happen to be the ones tested, only to fail later on the harder ones.

**Why not everything at once (100+):** the real risk here isn't running out of budget (confirmed — see §6, there's plenty of room), it's wasted redo work. If the way documents get broken into pieces needs adjusting after seeing real results (likely, especially for tables/diagrams), fixing that after 100+ documents means redoing 100+ documents' worth of processing. Fixing it after 25-35 means redoing a few days of work, not weeks.

**The logic in one line:** prove it against the hardest cases early, on a slice big enough to be trustworthy, small enough that a wrong turn is cheap to fix.

Full assumptions behind this whole plan — written out explicitly so they can be checked and shown to Henri later — are logged separately in **"Phase 0 — Design Assumptions Log (for Henri)."** The exact step-by-step build spec, with a status-tracked task for every step, is in **"Implementation Spec - Step by Step Build Plan."**

---

## 5. The plan, phase by phase

**Phase 0 — Assumptions logged, not a meeting.** Done — see the separate assumptions log.

**Phase 1 — The pilot.** Build the Azure AI Search index and safety-check layer described in §3, against the 25-35 manuals described in §4. Connect it into Copilot Studio using the simple point-and-click method (§2). Test it against the same question types already validated in the current tool, plus the harder cases (tables, torque specs, diagrams) this pilot was specifically built to stress-test. **Full step-by-step breakdown now in the separate Implementation Spec doc, with 8 tracked steps (1.1–1.8).** (Corrected 2026-09-23: was "11 tracked steps"; actual Phase 1 scope is 8 steps.)

**Phase 2 — First specialist.** Once the pilot proves out, build the second real capability from the Phase 0 list (most likely troubleshooting/diagnostics or safety/procedures) as its own connected specialist, with its own focused knowledge.

**Phase 3 — Expand.** Add remaining specialists one at a time, each proven individually, then extend the search index to the rest of the 100+ manuals — this last step is mostly a re-run of the already-built pipeline, not new setup work.

**What this doesn't touch:** this RAG plan is focused on the retrieval system itself; agent instructions and Copilot Studio connection are handled in the Implementation Spec. (Corrected 2026-09-23: V1 part-lookup reference removed; that context is no longer current.)

**Time-blocking:** once the pilot manual list is confirmed (Step 1.1 in the Implementation Spec), days will get scheduled and time-blocked exactly, as requested.

---

## 6. Live-checked cost and remaining open items

**Cost — confirmed 2026-09-22 with real Microsoft pricing, pilot only:** a reliable (paid, not free) tier of Azure AI Search runs about $74 USD/month; a 6-month pilot on that tier costs roughly $615 CAD total including AI model usage for testing, and even 12 months of just the search engine stays under $900 CAD. That's about 12% of the $5,000 CAD budget — plenty of room left for surprises, a bigger tier, or the optional relevance-boosting feature if needed later. (Corrected 2026-09-23: this is Basic tier, pilot only — full corpus pending cost comparison with higher tiers to handle the two excluded 100+ MB manuals; see review-architecture.md H5.)

**Still open:**
- Whether Copilot Studio can currently handle photos (e.g., a mechanic photographing a part) inside a conversation — still unconfirmed either way.
- The point-and-click Azure AI Search connection has a couple of reported hiccups in some setups per Microsoft's own support forum — worth testing early against a real index rather than assuming it works flawlessly the first try (this is Step 1.7 in the Implementation Spec).
- The exact 25-35 pilot manuals still need picking from your SharePoint library — I don't have direct access to browse it, so this needs your input (Step 1.1).

---

## 7. Glossary

- **RAG (Retrieval-Augmented Generation):** the AI looks up real facts first, then answers using only what it found, instead of answering from memory.
- **Azure AI Search:** Microsoft's tool for building a fast, smart "look it up" engine over your documents.
- **Index:** a searchable, organized copy of your documents — like a book's index, but for computers.
- **Chunking:** breaking a big document into smaller pieces so the AI can find just the relevant bit instead of the whole 600-page manual.
- **Knowledge source:** wherever the AI is allowed to pull facts from.
- **Grounding / citation:** tying an AI answer to the exact real document it came from, so it can be checked.
- **Hallucination:** the AI confidently stating something false or unsupported.
- **Topic:** one self-contained skill inside the assistant (not required for the basic Azure AI Search connection anymore).
- **Connected agent / specialist agent:** a mini-assistant focused on one job that the main assistant can call in and fold into its answer.
- **Verification/abstention layer:** a second check that confirms an answer's claims are actually backed by a real source, and forces "I don't know" over guessing when they're not.
- **Knowledge graph (GraphRAG):** an alternative approach that maps how facts relate to each other across documents — more powerful for connecting information across sources, but expensive to build and not used in this plan for cost reasons.

---

## 8. Concrete next actions

1. **Pilot manual list is confirmed** (Step 1.1 in the Implementation Spec) — see implementation-spec.md and continuity-log.md for the actual 23 PDFs indexed.
2. **Azure subscription and resources are set up** (Step 1.3) — the search service, API keys, and storage are live.
3. **Phase 1 testing is underway** (Step 1.8) — running the golden question set and evaluating coverage against the manuals actually indexed. (Corrected 2026-09-23: see review-architecture.md for Phase 1 closure criteria: golden set pass mark, zero unsupported safety/spec numbers, 100% cited answers, 95% correct abstention.)
