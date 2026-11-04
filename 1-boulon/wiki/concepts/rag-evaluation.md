---
title: RAG evaluation (faithfulness, hallucination checks, abstention scoring)
type: concept
status: current
updated: 2026-11-04
sources: [../../docs/rag-radar/knowledge-web.md, ../../docs/rag-radar/runs/2026-11-02.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../4-learning/interests/lexicon-ai-ml.md, ../../docs/continuity-log.md]
---

**Bottom line:** BOULON already has a retrieval test (the golden set); the gaps the sources point at are a grader that scores a correct "I don't know" as a pass, a separate abstention number, and a plain-code check that every torque value in an answer appears in the cited passage.

## Plain definition (as the sources define it)
- **Golden set** = "fixed test questions with known correct answers used to score the bot" ([[golden-set]]; lexicon).
- **Faithfulness / unfaithful answer** = an answer with facts not in the source; the Vectara leaderboard measures "how often models add facts not in a source document when summarizing it" (knowledge web `#vectara-hhem-leaderboard`).
- **Correct Abstention Rate (CAR)** = how often a RAG system correctly says it doesn't know on unanswerable questions (DeclineCraft, `#declinecraft`).
- **Reformulation rate** = "how often users rephrase a question; a free signal that retrieval failed". **Lineage schema** = "fixed IDs tying a user outcome back to the exact retrieval that produced it" (lexicon, from https://arxiv.org/abs/2610.30423, brief 2026-11-04; LARA reports users rephrase 44% of the time when answers are weak).

## How it shows up in BOULON
- Retrieval tests: golden v1 (41 usable questions) scored by rank of the right passage in the top 5 plus a citation check; test ledger of 111 tests ([[golden-set]], [[boulon-testing]], [[semantic-reranker]]).
- The known evaluator problem: Copilot Studio's Evaluations marked correct abstentions as Fail, so the 2026-10-06 agent baseline "had to be hand-scored" (`1-boulon/docs/continuity-log.md` 2026-10-06 16:00; `runs/2026-11-02.md`). The radar's top pick: a generated custom grader "tailored to a specific agent" (MC1531924, GA 2026-10-15) and a grader library (MC1531932, GA 2026-11-15); neither post mentions abstentions, so it is unproven (`#copilot-studio-evaluations`). See [[abstention]].
- Recommended by the 2026-11-02 run: (1) calibrate any AI judge against hand scores first (AGO Quality Gate: gpt-4.1-nano AUROC 0.603, gpt-4o 0.783 at spotting unfaithful answers, https://arxiv.org/abs/2610.01218); (2) track abstention rate as its own number after every ranker or instruction change (DeclineCraft); (3) add a numeric cross-check: each torque value in an answer must appear in the cited chunk, "a few lines in the existing PowerShell test runner" (https://arxiv.org/abs/2610.36561; 0 of 40 fee hallucinations in production). It would have caught 12.7 given instead of 15 Nm ([[torque-tables]]).
- Score the page, not only the answer: papers review idea 2 and the LongDocURL / MMDocIR method (`d1-awesome-papers.md`); add unanswerable questions (MMLongBench-Doc: 20.6% of its questions are unanswerable).
- Free failure signal: count rephrased questions in Copilot Studio transcripts (brief 2026-11-04). Not built yet.
- A fair way to test chunking: keep questions fixed, change only the parser or chunker, score at page level (RAGit, `#ragit`); see [[chunking]], [[document-parsing-and-ocr]].
- Related judge and citation papers: PARCEL (claim-level citation labels, up to 0.97 accuracy yet some unsupported claims pass) `#parcel`; uncertainty and hallucination (perplexity AUROC 0.81-0.91, weaker when only the top passage is retrieved) `#uncertainty-hallucination`; CalibraRL needs model training so is not usable with Copilot Studio `#calibrarl`.

## Tools in the knowledge web
Copilot Studio Evaluations (native; **try**) `#copilot-studio-evaluations`; DeepEval `#deepeval`; Arize Phoenix (evals v3.9.3 excluded a compromised litellm: supply-chain warning for pip installs on a work PC) `#phoenix`; TruLens 2.16.0 judge "Jury" with reliability data `#trulens`; promptfoo 0.125.0 rubric grading fails closed `#promptfoo`; Vectara hallucination leaderboard (DeepSeek-V4.1-Flash 4.2%, claude-opus-5-5 9.9% as of 2026-10-22, a model-choice signal only) `#vectara-hhem-leaderboard`. All in `1-boulon/docs/rag-radar/knowledge-web.md`, section E.

## Go deeper
- Custom graders: https://mc.merill.net/message/MC1531924 and https://mc.merill.net/message/MC1531932
- DeclineCraft https://arxiv.org/abs/2610.28340 . Numeric verification https://arxiv.org/abs/2610.36561 . PARCEL https://arxiv.org/abs/2610.10971

## Related
[[golden-set]] · [[abstention]] · [[boulon-testing]] · [[citation-projection]] · [[agentic-retrieval]] · [[retrieval-selection-gap]] · [[rag-field-map]] · [[greg-interest-map]]
