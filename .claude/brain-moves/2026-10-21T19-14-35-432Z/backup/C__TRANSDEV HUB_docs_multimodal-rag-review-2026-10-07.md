# BOULON multimodal RAG review, 2026-10-07

Reviewer: Claude (senior RAG consultant role), read-only. Sources: `rebuild/v2/` (README, skillset.json), `tests/results/agent-baseline-2026-10-06.md`, `docs/over-budget-plan.md`, the two 2026-10-06 evaluation exports (16:33: 19 Pass / 17 Fail of 36; 16:44: 31 Pass / 10 Fail of 41), and the Awesome-Multimodal-RAG list (https://github.com/JarvisUSTC/Awesome-Multimodal-RAG).

Tags: **Verified** = I read it. **Inferred** = my reasoning. **Unknown** = not confirmed.

Terms: *RAG* (retrieval-augmented generation) = the AI first searches the manuals, then answers from what it found. A *chunk* = one searchable piece of a manual. An *embedding* = a list of numbers that captures a chunk's meaning so similar text can be found. *Retriever* = the search step. *Layout skill* = Microsoft's PDF reader (Document Intelligence) that turns pages into text and tables.

## 1. Top 5 recommendations (best gain for the cost first)

**R1. Put the manual name and section headings at the top of every chunk before it is turned into an embedding.** Add one small step that joins `title + header_1..3 + chunk text` into one string and embed that string instead of the bare text.
- Fixes: wrong torque table picked (F17, F34, brake disc and caliper bolts), and naming a manual that was not retrieved (F13). A row like `| M6 | 1.00 | 12.7 | 15 |` carries no clue about which manual or table it comes from. *Inferred.*
- Cost: free (only embedding calls, which are already budgeted). Effort: about 1 hour of JSON. It must go in before the first paid run, because changing it later means paying to re-read the pages.
- Risk: low. Test: golden set 10/10, plus the torque check in the v2 README, plus F12, F17, F34, F36 and the two brake-bolt questions.
- Source: MMDocIR finds that searching at the level of page *regions* (layout level) helps on long documents (https://arxiv.org/abs/2501.08828). *Verified (abstract only).* That this helps BOULON is *Inferred*.

**R2. Don't split tables or numbered procedures.** Raise the split size above 4,000 characters for sections that hold a table or numbered steps (or simply raise the limit to around 8,000), and keep the 400-character overlap.
- Fixes: incomplete MCU steps 11 to 28 and the missing 23.5 Nm (F22), 9 steps out of more (F19), and tables cut in half. *Inferred.*
- Cost: free. Effort: low. Risk: bigger chunks blur meaning-based search a little, but keyword search (hybrid) makes up for it. *Inferred.*
- Test: F22, F19, F24 and the README torque check ("row not split").
- Source: MMLongBench-Doc says 33.2% of its questions need evidence from more than one page, and even GPT-4o only scores 42.7% F1 (*F1* = a combined accuracy score) (https://arxiv.org/abs/2407.01523). *Verified (abstract).* So "the answer spans chunks" is a common way these systems fail, not a quirk of BOULON.

**R3. Find out with a test whether the second (picture) reading pass is worth paying for.** Run the 1-file trial twice: once with markdown only, once with markdown plus pictures. Score the diagram questions (F31 and the wiring questions).
- Fixes: the cost of two reading passes (about 30,000 pages vs 60,000 under the CAD 1,200 ceiling). *Verified from repo.*
- Cost: a few cents for the trial. Effort: low. Risk: losing diagram answers if the picture pass is dropped everywhere.
- Middle option: run the picture pass only on manuals that are mostly diagrams (wiring books). *Inferred.*
- Source: MMDocIR reports that text built by a vision model (an AI that reads images) beats plain OCR text (*OCR* = turning pictures of letters into text) (https://arxiv.org/abs/2501.08828). *Verified (abstract).* So picture descriptions do add value. How much they add for BOULON is *Unknown* until we test.

**R4. Make the agent check page numbers, not just the final value.**
- What it is: add "correct page cited" as a pass condition to the golden set and to the Copilot Studio evaluation (F36 cited page 19 when the answer is on page 22).
- Fixes: wrong citations, and it catches right-value-wrong-table answers.
- Cost: free. Effort: low.
- Source: LongDocURL scores "locating" (finding where the answer is) separately from answering (https://arxiv.org/abs/2412.18424). *Verified (list description).*

**R5. Fix the instructions (no paper needed, but the biggest free win).**
- Rules to add: answer in the language of the question (F18, F19); never drop warnings (F05); state the component and bolt class, or ask (F14, F15); never guess causes (F16); a friendly message when the content filter blocks a prompt (F01 to F03); a maintenance-only redirect for off-topic questions; when two vehicle families disagree, say so (F21).
- Cost: free. Effort: Greg pastes the text in Copilot Studio. Risk: low. Test: rerun the 36-case failure set.
- Source: the 2026-10-06 baseline. *Verified.*

## 2. What we are already doing right

- Markdown-mode layout so tables keep their rows and columns: the right fix for flattened torque values. *Verified (skillset.json).*
- Splitting by headings rather than every 2,000 characters. *Verified.*
- Hybrid search (keywords plus meaning) and the semantic ranker (Microsoft's re-ranking step). Part numbers and "M6" need the keyword side. *Verified (README).*
- Turning pictures into text descriptions instead of searching images directly. This is the cheap version of what VisRAG and ColPali do. *Inferred.*
- The `vehicle_family` filter, added now because adding a field later means a full rebuild. *Verified.*
- `maxFailedItems: 0`, so failures can't hide. *Verified.*
- A golden set plus failure-case sets scored by hand. The tool's own "Fail" mark on correct "I don't know" answers is rightly ignored. *Verified.*

## 3. What NOT to do

- **ColPali, VisRAG, M3DocRAG** (search page *images* with a vision model). They beat text pipelines on benchmarks (ColPali: "largely outperforms", https://arxiv.org/abs/2407.01449, *Verified*), but they need GPUs (graphics cards for AI) and self-hosting. Copilot Studio can't use them as a knowledge source. *Inferred.* No exception is worth it.
- **VisDoMRAG** (https://arxiv.org/abs/2412.10704): reports 12 to 20% gains, but it is a custom pipeline that runs two models side by side. It doesn't fit Copilot Studio. *Verified (gain claim); fit Inferred.*
- **Pixeltable** (https://github.com/pixeltable/pixeltable): a Python install. Not allowed on a locked PC without an IT ticket, and it duplicates Azure AI Search. *Inferred.*
- **Sending whole manuals to the model (long context).** MMLongBench-Doc shows even top models score poorly this way. *Verified.*
- **Fine-tuning (retraining a model on our data), and benchmark datasets (SPIQA, MMDocIR training data).** They are for research teams. Our own test sets fit better. *Inferred.*
- **Re-reading everything to try each idea.** Every change to the skillset after the paid run costs pages. Settle R1 to R3 on the 1-file trial first. *Inferred.*

## 4. What looks wrong or risky

1. **Page numbers for text chunks may come back empty** in markdown mode. The README flags this as unverified. Without them, R4 and the citations fail. Check it on the 1-file trial before paying for the big run. *Verified (README).*
2. **The budget plan and the brief disagree.** `over-budget-plan.md` says the CAD 1,200 ticket "must be updated" before going over it. The brief says no ticket changes. The plan's own estimates (CAD 1,830 for 1 pass, 3,650 for 2) are both above 1,200. *Verified.*
3. **gpt-5-mini is told to "reproduce every row" of tables found in images.** An AI copying torque values from a picture can get digits wrong, and nothing checks it. Treat image-table chunks as lower trust, or tag them. *Inferred.*
4. **French questions against English manuals.** `text-embedding-3-small` handles several languages, but how well it matches French questions to English text here is *Unknown*. Test F18 and F19 at the search level, not only the answer.
5. **The 512,000-character limit per file** can silently cut long manuals (the Vicinity manual was already split). Check the highest page number per manual. *Verified (README).*
6. **The ProHeat M120 answer was invented** (0.78 gph): the model fills gaps. Rules alone may not be enough. Keep it in every rerun. *Verified (baseline).*

## 5. Questions for the owner / PM

1. Is "no ticket changes" final, even though the budget plan says the ticket must be updated above CAD 1,200?
2. Which 3 brands make up most of the mechanics' questions (they get loaded first)?
3. Can the 1-file trial run both settings (markdown only, and markdown plus pictures) before the batch?
4. Do mechanics mostly ask in French, English, or both?
5. How many manuals are mostly wiring diagrams, roughly?

## Summary
1. Biggest free wins: headings in every chunk (R1), tables and procedures kept whole (R2), stricter instructions (R5).
2. The picture pass must earn its cost on the 1-file trial (R3); it decides 30k vs 60k pages under CAD 1,200.
3. Image-search research (ColPali, VisRAG, M3DocRAG, VisDoM) and Pixeltable don't fit a locked PC with Copilot Studio.
4. Biggest risks: empty page numbers in markdown mode, and the budget plan contradicting "no ticket changes".
5. Test every change with the golden set, the torque check and the 36-case failure set, scoring the cited page too.
