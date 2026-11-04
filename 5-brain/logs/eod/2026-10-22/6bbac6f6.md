# AI CLOUD ENGINEER AGENT — C--TRANSDEV-HUB — C:\TRANSDEV HUB
session 6bbac6f6-08bb-4927-80ee-8b5da1cad177

[09:21] GREG: good morning. lets resume from yesterday. i have a meeting tonight called "ai maintenace catalogue" if you look at our ledger or progress this week youll realizd ive delivered no actionable results, no deliverables, and nothing for my supervisors to look at, aside maybe the zbb demo we made from last week but theres so many changes and specifications that i cant explain that i counted it out lol. i started practicing studying and testing on learning machine learning with the ai engineering from scratch and also watching this Learn RAG From Scratch – Python AI Tutorial from a LangChain Engineer
freeCodeCamp.org video to help build the proper knowledge toxonomy comprehension and foundational concepts about rag before getting in a call surrounded by non larpers as opposed to me. this meeting is sort of a wildcard since i dont know what ill need to communicate progress on, what pain points theyll want to hear or that i should bring up, what concepts / facts about our projects i should have readily available or remember of the top of my head etc.

[09:21] GREG: Base directory for this skill: C:\TRANSDEV HUB\.claude\skills\boulon-morning-check

# BOULON morning check

**Extracted:** 2026-09-25
**Context:** First exchange of each BOULON day. Greg wants to arrive to a ready workspace, not be asked what happened.

## Problem
Each morning Claude re-derived the state by hand and then asked Greg for things it could look up, such as ticket numbers or colleagues' replies.

## Solution
1. Read `RESUME.md`, then `1-boulon/docs/continuity-log.md` Ãƒâ€šÃ‚Â§3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“4, then the end of `1-boulon/docs/timeline.md`.
2. Read the overnight inbox digest, if present: `C:\Users\rilg01\OneDrive - TRANSDEV\BOULON-inbox\` (newest file). Pull out ticket numbers and statuses, replies from Henri, Pierre, Alex and IT, and approvals. Log them. Never ask Greg to relay what the digest already says (memory `feedback-self-serve-status`).
3. Check the Azure search service. A request without a key should return 401, which means the service is up. Check the `.env` key length (52 characters = a real key) without printing it. A placeholder is fine when no Azure step is planned today.
4. Scan the log for garbled table rows (for example a `| 1.9 |` repeated inside one cell) and repair them.
5. Confirm `.claude/hooks/.eod-done` holds a past date, so today's 16:45 reminder fires.
6. Refresh BOULON HQ (`boulon-hq-update`): set a new `today` block, flip `week` states, clear finished items. Publish with the `url`.
7. Add a dated line to the timeline running log.
8. Reply with a short summary, then the next actions (memory `feedback-scannable-endings`).

## When to Use
The first message of a BOULON day, or after a restart.

[09:23] CLAUDE: Reading is done, so I'm writing your meeting brief as a file in the workspace now.

[09:25] CLAUDE: Good morning. I wrote your prep brief: [meeting-prep-2026-10-22-ai-maintenance-catalogue.md](1-boulon/docs/meeting-prep-2026-10-22-ai-maintenance-catalogue.md). I don't know the meeting's agenda or who is attending, so it covers BOULON generally.

**You have more to show than you think.** Nothing is demo-able to supervisors, so it feels like nothing. The files say otherwise:
- **Pilot:** the agent answers from 23 manuals, and citations name the manual and page. Your click test on 10-06 passed, so the link opens at the right page.
- **Test set:** the best search mode scored 41 of 41 questions. This is an index-side result. The agent-side sample is only 14 tests, so don't claim 100% accuracy.
- **Blocker:** the free search tier is 90% full (44.9 of 50 MB). IT ticket #77048 for the paid tier has been open 27 days with no reply.
- **Phase 2 data:** you hold 426,883 work orders from Alex (2014–2026), already sized.

**What's in the brief**
1. A 30-second opener you can say word for word.
2. A table of the numbers to keep in your head, each labelled Measured, Verified or Estimate.
3. Six pain points, with two or three to pick from. Examples are the stuck ticket, no Sudbury or Kitimat manuals, manuals that disagree (wheel nuts), Spanish untested, and the budget gap.
4. Questions you can ask them, so you sound like someone who understands the problem.
5. RAG terms mapped to your project: chunking, embeddings, hybrid search, semantic ranker, grounding, abstention and the golden set.
6 […]

[09:38] GREG: ok you failed to take into account literally our most latest project, the zbb, and the literal functional demo we have of that now. i think you have a right to have failed to mention so as i did mention the meeting was called ai maintenance catalogue which sounds like it solely has to do with greg boulon, but since were not meeting with colleagues or supervisors frequently, we need to group progress into the opportnities we get to talk with them. during this session start, did you run the resume session ecc skill? what files did you look through when picking up from yesterday. the end of day from yesterday produced many different handoff and resume documents and i want to make sure our end of day skill and second brain remapping from yesterady groups them all or places them all together easily for you retrieval. there sebastien boudrias henri eckern alexandre dumaine me gabriel lecavalier lenoir dominique venne alexandre and philippe brevet. there could possibly be many subjects on the agenda. probably mainly talk about greg boulon probably, the infrastructure services specs and such about that, shortly maybe about zbb where were at etc, possibly talk about what sebastien boudrias talked to me about as in the eventual promising local hosted version of greg boulon, and aside from that im pretty much in the dark. i think this will serve moreso as a major checkpoint update face to face with everyone as to greg boulon as i dont ever get to talk about it face to face with people.

[09:38] CLAUDE: Straight answers first. I did not run `ecc:resume-session`. I read these files: `RESUME.md`, the end of `timeline.md`, the first 140 lines of the continuity log, `project-brief-551.md`, `index-facts.md`, the tail of `test-ledger.md`, and a listing of the eod folder. I never opened ZBB, `people.md`, or the session-data handoffs, and that's why the ZBB demo was missing. I'm checking those now.

[09:44] CLAUDE: The hang came from my own stray `python` call, which hangs on this PC. I'm stopping it and writing the files with the file tools instead.

[09:49] CLAUDE: `brain.js build` regenerated the router and wiped my table. I'm moving the table into its own file, `INDEX.md`, which the build won't touch, and fixing the path the audit flagged.

[09:52] CLAUDE: You're right: I left ZBB out and treated this as a BOULON-only meeting. The prep is fixed, and the hand-offs are now in one place.

## Did I run `ecc:resume-session`?
No. I only read the files below.
- `RESUME.md`
- The tail of `timeline.md`
- The first 140 lines of the continuity log
- `project-brief-551.md`
- `index-facts.md`
- The tail of `test-ledger.md`
- A listing of the eod folder

I never opened the ZBB folder, `people.md`, or yesterday's saved sessions, so I had no idea ZBB had a working demo.

## Where yesterday's hand-offs were scattered
| Where | What |
|---|---|
| `C:\TRANSDEV HUB\RESUME.md` | The workspace summary. |
| `5-brain/handoffs/2026-10-21-second-brain-build-handoff.md` | The brain-build hand-off. |
| `C:\ZBB\docs\HANDOFF-2026-10-20.md` and `HANDOFF-2026-10-21.md` | ZBB, outside the vault. The brain's ZBB router pointed at the older one first. |
| `C:\Users\rilg01\.claude\session-data\` | 12 saved sessions from yesterday. This is what `resume-session` loads. |
| `5-brain/logs/eod/2026-10-21/` | Extracts of all 19 sessions. |

## What I changed
- **One table:** [5-brain/handoffs/INDEX.md](5-brain/handoffs/INDEX.md) lists the newest hand-off per area, including ZBB, plus the raw sources behind them.
- **Wired in:**
  - [CLAUDE.md](CLAUDE.md) has a row for it.
  - [RESUME.md](RESUME.md) links to it.
  - The ZBB router now points at the 10-21 hand-off first.
- **End-of-day skill:** step 4.2 now refreshes the table and says which areas had no activity.
- **Mo […]

[09:52] GREG: Base directory for this skill: C:\TRANSDEV HUB\.claude\skills\note

# /note: park feedback now, fix the skill later

Built from the ARMS v2 guide, Memory level 3 ("fix backlog"): fixing a skill right away loses the thread of the job, so the feedback is parked in that skill's own file and applied in one batch when Greg says so.

## `/note <skill> <feedback>` (park)
1. Resolve `<skill>`: exact folder in `.claude/skills/`, or a scheduled task id under `C:\Users\rilg01\.claude\scheduled-tasks\`. If Greg gave no skill, use the skill used most recently this session and say which in one line. If unsure, ask once.
2. Append one dated line to `<skill folder>/NOTES.md` (create it with the heading `# Parked notes for <skill>` if missing):
   `- 2026-MM-DD (open): <Greg's feedback in his words, plus one clause of context: what output it was about>`
3. Reply in one line: `Parked on <skill> (N open). Say "/note apply" when ready.` Do NOT edit `SKILL.md` now and do not start fixing.
4. If the same feedback is already parked or already in the skill, say so instead of adding it.

## `/note list`
Show every skill with open notes: skill name, count, the notes. Scan `.claude/skills/*/NOTES.md` and scheduled-task folders.

## `/note apply [skill|all]` (only when Greg says apply)
1. Work on the smallest model that can do it (this skill is pinned to Haiku). If a skill is over about 200 lines, or two notes contradict each other, say so and hand that one skill to a Sonnet helper.
2. For each skill with open notes: find the principle behind each note, fold it into `SKILL.md` so the skill gets sharper, not longer (a good update often shortens it). Never stack a new rule on the last one if one principle covers both.
3. Show the change as a short before/after for each skill and wait for Greg to approve. Third-party skills (3d-brain, resume-tailoring, calibrate upstream part): do not edit the clone; keep the note and say it stays parked.
4. After approval: save, mark each applied line `(applied YYYY-MM-DD)` in `NOTES.md`, and append one line to `5-brain/logs/calibrate-log.md` (date, skill, what changed, why).
5. Reply with the files changed and notes left open.

Related: `/calibrate` turns lessons from a whole session into memory and skill fixes; `/note` is the quick mid-job parking spot that `/calibrate` also reads.


ARGUMENTS: resume session should have been used as soon as i said good morning lets resume from yesterday. a line along the lines of that should ABSOLUTELY and consistently call this skill

[09:53] CLAUDE: Parked on boulon-morning-check (1 open). Say "/note apply" when ready.

The note is in `.claude/skills/boulon-morning-check/NOTES.md`. I did not edit `SKILL.md`.

[10:00] GREG: henri had told me to contact sebastien to ask if i can help with anythng and i was left on read... what do i do

[10:00] CLAUDE: **Do nothing more by text. Ask him in person tonight.** He is on the call, and a second message to someone who left you on read looks like chasing. It also costs you nothing to wait, because you'll be in the same room in a few hours.

**Why this is easier than it feels**
- Silence on a "can I help with anything?" text usually means he's busy or has no ready answer. It rarely means he's ignoring you.
- Sebastien already brought you the local-hosted BOULON idea himself. So you have a real topic to talk to him about, and you don't have to open with a vague offer.
- Henri sent you to Sebastien, so asking about it in front of Henri is natural.

**What to say, word for word (French, casual, one direct ask)**
- Before or after the call, one-on-one if you can: "Sebastien, j'ai pas voulu te relancer par texto. Henri m'a dit de te demander si t'avais des besoins où je peux aider. Y a-tu quelque chose que je peux prendre?"
- If it comes up during the meeting, shorter: "Sebastien, côté hébergement local de Greg Boulon, qu'est-ce que tu aimerais que je regarde en premier?"

**If he gives something vague** ("on verra", "je te reviens"), ask one thing: "Ça serait quoi la première chose utile, même petite?" Then stop. Don't push for a date.

**If nothing opens up tonight:** one short text tomorrow morning is fine. Make it concrete rather than a general offer: "Suite à la rencontre d'hier, je peux préparer [X] sur l'hébergement local. Ça t'aiderait?" Offering a specific thing is far easier to […]

[14:14] GREG: <task-notification>
<task-id>bv9sy5326</task-id>
<tool-use-id>toolu_01A5b91GCZCZ51yoQHXMA9WD</tool-use-id>
<status>stopped</status>
<summary>Background shell command didn't finish before the previous session ended</summary>
<note>No completion record was found for it in the previous session. It may have been stopped (via the UI, Monitor timeout, or agent teardown — these leave no transcript marker), or it may have been running when the previous Claude Code process exited. Check the output file for partial results before assuming it completed.</note>
</task-notification>

[14:15] GREG: can we have a ai cloud engineer agent or smt  of the sort or similar look at our current azure ai copilot reg bouloin architechture, chunking methods, indexing methods , classifications, retrieval methods, generation, query translation method options, multi query rag fusion decomposition step back hyde etc., routing, query construction, indexing options multi representation, raptor, colbert, options for crag, options for adaptive rag, etc. have it prepare it's role's typical brief/report for his stakeholder with his insights

[14:17] CLAUDE: I've started an AI cloud engineer (Azure AI and RAG architect) agent on it. It is still working, and I'll tell you when the report lands. Nothing from it has come back yet, so I can't report any findings.

**What it was told to do**
- **Read:** the continuity log, index facts, brief 551, agent instructions, cost and tier files, the earlier architecture and RAG reviews, and all research folders. It also reads the v2 rebuild definitions and the golden test set with its newest results.
- **Review:** every option you listed, area by area:
  - indexing and chunking, multi-representation, RAPTOR and ColBERT
  - query translation: multi-query, RAG-Fusion, decomposition, step-back and HyDE
  - routing
  - query construction
  - retrieval and reranking
  - generation
  - CRAG, Self-RAG and Adaptive RAG
  - evaluation, plus the Azure hosting and security questions
- **For each option:** what it is in plain words, whether BOULON already does it, whether it fits 7 requests per site per day, whether it works in Copilot Studio plus Azure AI Search, the cost and risk, and a verdict of Adopt now, Test next, Defer or Reject. It also names the cheapest free check on your 41 questions.
- **Rules it follows:**
  - Every figure is labelled Measured, Verified, Estimate or Unknown.
  - It gives no dates.
  - It doesn't recommend anything that breaks your approval gate or the locked-PC rule.
  - It doesn't touch `.env`.

**What you'll get:** one file, `1-boulon/docs/cloud-ai-architecture-brief-2026- […]

[14:54] GREG: <task-notification>
<task-id>a65b9b1c13e4aa41b</task-id>
<tool-use-id>toolu_01VYJyKJDkpZzzWRxXzzg8eZ</tool-use-id>
<output-file>C:\Users\rilg01\AppData\Local\Temp\claude\C--TRANSDEV-HUB\6bbac6f6-08bb-4927-80ee-8b5da1cad177\tasks\a65b9b1c13e4aa41b.output</output-file>
<status>completed</status>
<summary>Agent "AI cloud engineer architecture brief" finished</summary>
<note>A task-notification fires each time this agent stops with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</note>
<result>The brief is written: `C:\TRANSDEV HUB\1-boulon\docs\cloud-ai-architecture-brief-2026-10-22.md`. It follows your nine sections, with the options review as one table per numbered area (columns a to f), 8 talking points for tonight, and a Mermaid flow of one question.

It runs about 10,100 words by `wc -w`, which counts table pipes, so the real figure is nearer 8,000. That is above your 4,000 to 6,000 target. The ten option tables and the defined terms in every section account for it.

**Verdicts**
- **Adopt now:**
  - Heading-based chunks and markdown tables.
  - int8 vector compression with re-checking, set before the first paid run.
  - Fields for vehicle family, brand and language.
  - Keep hybrid search with the semantic ranker, and switch it to the Standard plan so it doesn't stop after 1,000 requests a month.
  - Updated agent instructions (language rule, friendly message for blocked prompts).
  - An offline check that every number and cited page appears in a retrieved passage.
  - Spanish and cross-language test questions.
  - A saved export of the index and skillset definitions.
  - Canada Central.
- **Test next:**
  - Content Understanding versus Layout (the two PDF readers) on the one-file trial.
  - Manual title and headings added to each chunk's embedded text.
  - Reranker-score separation between questions that should abstain and ones that should answer.
  - A groundedness judge on the exported answers.
  - Synonym maps or an analyzer for part numbers and acronyms.
  - text-embedding-3-large, only if Spanish or cross-language tests miss.
  - Scoring the picture descriptions.
  - What Copilot Studio Analytics records.
- **Defer:**
  - Parent-child chunks, page-level chunks, semantic chunking.
  - Hypothetical-question or proposition indexing.
  - Multi-query, RAG-Fusion and decomposition.
  - Self-query filters and vehicle extraction.
  - A live answer check inside Copilot Studio.
  - CRAG's grader.
  - Azure agentic retrieval, until it is generally available.
  - Two replicas for an uptime guarantee.
  - Tier 2 (the work orders) as a separate index.
  - Any local-hosting level, until Sebastien answers.
- **Reject:**
  - Fixed-size chunks, RAPTOR, ColBERT, HyDE, step-back.
  - Self-RAG, Adaptive RAG, CRAG's web fallback.
  - Your own cross-encoder reranker.

**What I could not verify (all labelled Unknown or Inferred in the brief)**
- Copilot Studio's documentation says nothing on per-query filters, top-k or score thresholds, so I wrote "test it", not "impossible".
- I could not confirm that Copilot Studio actually sends the semantic ranker, or how many searches it sends per question.
- Whether the "CC" Canada Central price meter means confidential computing is Inferred. Microsoft says confidential computing disables the semantic ranker, so confirm it is off on the new service.
- Table accuracy of Layout, Content Understanding or any open parser on your torque tables, and French and Spanish quality of text-embedding-3-small on your manuals.
- Whether a tool or MCP answer shows a clickable manual-and-page citation, and whether Copilot Studio accepts a query key instead of an admin key.
- Microsoft's index backup page returned 404, so I used your own `rebuild/` definitions and the v1 document backup as the recovery path.
- Sebastien's actual proposal is not in any file, so section 6 covers three levels of local hosting without judging any of them.
- The LangChain "RAG From Scratch" taxonomy was used from memory and not re-fetched.

**Stale figures to avoid tonight**
- One-time cost of CAD 650 to 1,200: that assumed about 20,000 pages, and the measured library is 131,756.
- The 262K-character truncation claim, which was retracted after counting.
- "No wrong answer since the pilot started": the agent has given wrong torque values more than once.
- "41/41": that is the search step only, not the finished agent's accuracy.

**Not done on purpose**
- I read only the first 60 rows of `test-ledger.md`.
- I did not update the HQ page, timeline or continuity log, because you said not to edit other files. I can add the logging if you want.</result>
<usage><subagent_tokens>396734</subagent_tokens><tool_uses>82</tool_uses><duration_ms>2271035</duration_ms></usage>
</task-notification>

[14:54] CLAUDE: The agent flagged that three figures I put in your meeting prep are stale or wrong. I'm checking them against the files before I touch anything.

[14:59] CLAUDE: The report is done: [cloud-ai-architecture-brief-2026-10-22.md](1-boulon/docs/cloud-ai-architecture-brief-2026-10-22.md). It is long, about 8,000 words, and I have only read its top sections and spot-checked the figures that matter. The recommendations in the sections I haven't read are the agent's own and unchecked.

## It caught three errors in my meeting prep, now fixed
These could have hurt you tonight, so please re-read the new prep:
1. **"No wrong answer since the pilot started."** I copied this from a stale line in the test ledger. The files show the agent gave 12.7 Nm where the manual says 15 Nm (M6 class 12.9, Vicinity p.22), and other wrong torque values too. I marked the ledger line as superseded.
2. **"41 of 41 correct."** That is the search step only, meaning it found the right passage. The finished agent scored about 39 of 41, and 4 serious failures remain on the 36-case stress set.
3. **"One-time reading cost CAD 650 to 1,200."** That figure assumed about 20,000 pages. The measured library is 131,756 pages, so the range is about CAD 933 to 3,652. The old 1.7k–2.9k total is out of date, so say "still being re-estimated".

The library is also 2,785 unique files (6.53 GB), not 3,052. The 3,052 count includes duplicates.

## What the engineer concluded
- **Design:** one Copilot Studio agent with one Azure AI Search index, using keyword and meaning search plus Microsoft's re-ranker, is right for about 21 questions a day. It found nothing in the advanced RAG catalogu […]

[16:08] GREG: its just cause that one time reading costs a lot more than i thought you knew, and im trying to research ways to reduce the chunking/embedding/vectorizing/ whatever why this costs so much's cost before i actually have to formally ask for the money yknow. i want you the agent to run on sonnet on high effort and to run some e2e testing on the entire ai azure / copilot environment ive created and worked on so far, and try to eliminate costs and optimize for effiency as much as possible, hes allowed to try different tests and modify the environment as he pleases, as long as he creates a safe state we can return to in case i dont like the final mvp he comes with when time to check in with his work.

[16:11] CLAUDE: I understand: the one-time reading cost was a surprise, and you want to bring cheaper options to the approval request. I started a cost-optimisation agent on Sonnet at high effort. It is running now, and I have no results from it yet.

**How it works (in this order)**
1. **Safe state first.** Before any experiment, it saves a snapshot to `1-boulon/recovery/snapshot-2026-10-22/`:
   - the index, skillset, indexer and data-source definitions, with secrets stripped
   - a full read-only backup of all 2,250 chunks
   - the live agent instructions
   - the names of the `.env` variables (never their values)
   - a plain-words `RESTORE.md`
   It then checks that the snapshot matches the live environment.
2. **End-to-end test, read-only.** It runs your existing scripts: citation check, golden set in all three search modes, and pilot tests. It adds Spanish and cross-language questions in a new file, checks all 23 links, and logs everything in the test ledger.
3. **Cost work.** This is the part that answers your question:
   - It counts every page of the 2,785 unique PDFs with free local tools. The counts cover how many pages have a real text layer versus scans, how many are blank or near-empty, and how many carry images.
   - It builds a cost simulator in the project folder, with every unit price sourced from Microsoft's official pages.
   - It compares strategies. These include v2 as written, Content Understanding for everything, and a hybrid where free local text extraction handles  […]

[16:21] GREG: could you prepare a neatly presented visual / image explainer / video explainer elements in a html for the current state, sizes, specs, against limitations, plan limits, our current specs, vs what full scale, where it blocks, what the next step for that is, what the specs of that would allow, a snapshot of the specs at that point, data, text, example, consistent storyline throughout

[16:23] GREG: Base directory for this skill: C:\Users\rilg01\.claude\skills\attention-architecture

# Attention Architecture ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â word bank and how to apply it

Treat the viewer's attention as a budget. Every element must earn its place.

## Core disciplines
- **Neuro-design:** design for how the brain actually perceives and processes information.
- **Attention economy design:** attention is scarce; spend it only on what moves the story.
- **Cognitive psychology:** the study of perception, memory and filtering. Design for what people will remember, not just what they see.
- **Neuromarketing:** use known emotional and sensory response patterns: urgency, relief, trust signals.
- **HCI (humanÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“computer interaction):** controls look clickable, feedback is immediate, and nothing surprises the user.

## Visual ingestion and eye movement
- **Visual saliency:** colour, contrast, size and orientation decide what's seen first. Spend saliency on one target per view.
- **Foveation:** the eye focuses sharply on one small point. Put the key number or claim where the eye lands, not spread around it.
- **Gaze cueing:** arrows, lines, pointing sketches and motion direction lead the eye to the next thing.
- **Predictive eye tracking:** before publishing, walk the page and ask where the eye lands first, second and third. Fix it if the answer isn't the intended order.
- **Saccadic suppression:** the eye goes briefly blind while it jumps. Avoid important changes mid-transition, and let slide/scene changes settle before showing key content.
- **Time-to-first-fixation (TTFF):** how quickly the eye lands on the target. The ask or decision should be found within about 1 second.

## Layout and contrast
- **Visual hierarchy:** size, weight, colour, then position. One headline per section.
- **Visual contrast dynamics:** light vs dark, big vs small, dense vs empty. Whitespace isolates the hero.
- **Visual attention optimization (VAO):** check each section for one job, one focal point and one takeaway.
- **Isolation effect (Von Restorff):** the one thing that differs gets remembered. Only the recommended option or the ask gets the brand colour and glow.
- **Micro-clutter:** strip decorative borders, extra icons, redundant labels and extra font weights.

## Mental resources
- **Attention budget:** each animation, font and colour costs attention. Use at most 1 accent colour and 2 typefaces (plus a handwriting face for annotations), and animate only what carries meaning.
- **Cognitive load theory:** reduce extraneous load (layout noise) so the intrinsic load (the content) fits. Chunk long content into 3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“5 item groups.
- **Attentional capture:** use sparingly, for the single thing that must not be missed (a pulsing decision chip).
- **Exogenous vs endogenous attention:** exogenous is bottom-up, grabbed by a red flash or motion; use it for the ask. Endogenous is top-down, when the reader is looking for something; support it with clear headings and scannable labels.
- **Inattentional blindness:** if focus is locked on one place, other things go unseen. Never hide a critical caveat next to a strong focal point; give it its own beat.
- **Sensory overload threshold:** too much motion or density and people skip the page. Stagger motion, keep it under about 1.5 s, and always respect reduced-motion settings.

## Added concepts (Claude, 2026-09-23)
- **Pre-attentive attributes:** the eye processes colour, size, motion and position in under ~250 ms. Encode status with these, not with text alone.
- **Gestalt principles:** proximity, similarity, continuity and closure group things without borders.
- **F / Z reading patterns:** text-heavy pages are read in an F shape, sparse ones in a Z. Put the ask on the path.
- **Serial position effect:** first and last items are remembered best. State the ask at the start and again at the end.
- **Peak-end rule:** people judge an experience by its best moment and its ending. Build one "wow" proof moment, and end on a clear, easy next step.
- **Progressive disclosure:** summary first, details on demand (drill-downs, expanders).
- **Hick's law:** more choices means a slower decision. At most 3 options, one recommended.
- **Fitts's law:** primary actions are big and easy to reach.
- **Chunking (Miller):** group items in 3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“5.
- **Dual coding:** a picture plus words is remembered better than either alone. Pair each key claim with a simple visual (whiteboard sketch, bar, icon).
- **Goal-gradient and Zeigarnik effects:** progress bars and unticked items pull people toward finishing.
- **Narrative transportation:** a before ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ struggle ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ turning point ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ result story holds attention longer than a list of facts.
- **Signal-to-noise ratio:** every pixel either carries the message or gets removed.

## Checklist before publishing any visual
1. Where does the eye land first? It should be the headline or the ask.
2. Is there one focal point per section, and only one thing isolated in the accent colour?
3. Is the ask at both the start and the end?
4. Is motion purposeful, staggered, under ~1.5 s, and off under reduced motion?
5. Any micro-clutter left to strip?
6. Is it a story (then ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ turning point ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ now ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ next), not a list?

## Motion patterns Greg approved (2026-09-23, BOULON request v4)
- **Deck cards + living connectors:** each chapter is a clearly separated card. Between cards, a thin line with a data pulse flowing down it, and a small branded node with an icon that breathes, or fills once like a "download" ring, when it appears.
- **Scroll reveal, never static:** cards rise 24px and scale from .985 on entering view, children staggered 60ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“90 ms. It plays once. Content stays readable at rest (never opacity 0), and everything is final under reduced motion.
- **Timelines move:** the progress line fills, dots pop in sequence, the key node breathes, a handwritten "Turning point" callout with an arrow points at it (gaze cueing + Von Restorff), and future nodes show a dashed or shimmer "loading" state.
- **Story chat scenes:** the user message "sends" (slide + tick), a typing indicator shows for about 1 s, then the answer parts appear one by one in hierarchy order. It plays once and stays loaded.
- **Progress rails:** SaaS style: charcoal track, brand-gradient fill that grows on reveal, slow shimmer, and rings that fill when the rail reaches them.
- **Info cards:** a 2ÃƒÆ’Ã¢â‚¬â€2 grid, each with an icon tile, a bold 3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“5 word title and one short line, equal heights, and an accent that draws in.
- **Numbers:** count-ups and bars trigger on reveal, not on page load.
- **Every stop-and-read spot** needs one focal point with a motion or contrast cue. A small dot alone isn't enough.

[16:28] CLAUDE: Everything I need is in the files. Now I'm building the page.

[16:45] CLAUDE: The explainer is published: [BOULON Scale Story](https://claude.ai/artifact/4figJ5qTvTrLq6Y5S6EiVw). The source file is [boulon-scale-story-2026-10-22.html](1-boulon/docs/boulon-scale-story-2026-10-22.html).

It is private, so only you can open it for now. To show it to the group, share it from the page's Share menu. I couldn't view it rendered, so check the layout on your phone and desktop before tonight. I did check that its script parses and re-computed every derived figure.

**The storyline**
The page follows one thread, from "725 pages read today, 131,756 to go". The first thing you see is a bar showing the pilot as a 0.55% sliver of the full library. Under it sits the ask: create the paid search tier (ticket #77048). That ask comes back at the end.
1. **Today:** an animated trip of one page (PDF, reader, chunks, vectors, index), the pilot specs, and one real question. The question is the M6 class 12.9 torque (15 Nm, Vicinity p.22), shown next to the wrong 12.7 Nm the agent gave once.
2. **Where it stops:** three gauges.
   - The free tier is over its cap, at 63.3 MB against 50 MB.
   - Free can't upgrade in place.
   - The ticket is still pending.
3. **Full scale:** the measured library (2,785 manuals, 131,756 pages, 6.53 GB, 112 files that need splitting) and a bar chart of pages by brand.
4. **Next step:** a table of Free, Basic and S1 limits with Basic highlighted, plus a gauge showing the full library needs about 8.3 GB of vector memory. One Basic partition holds 5  […]
