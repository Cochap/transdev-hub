---
name: calibrate
version: 1.0
updated: 2026-04-14
description: In-session self-improvement. Reviews the current conversation for corrections, preferences, and patterns, then suggests specific skill/setup updates. Triggers on "calibrate", "what can you improve", "update your skills", "what did we learn", "tune up". Also run it when Greg corrects the same thing twice.
---

# Calibrate: In-Session Self-Improvement

## What This Does

Reviews the current conversation and suggests specific updates to skills, CLAUDE.md rules, memory, or workflows based on what just happened. You pick which suggestions to apply.

## When to Use

- End of a work session
- After a task with multiple corrections
- When you say "calibrate", "what can you improve", "tune up", "update your skills"

## Process

### Step 1: Scan the Conversation

Review everything in the current session. Look for:

- **Corrections** — where the user said "no", "wrong", "not that", "I meant X"
- **Preferences revealed** — format choices, tone adjustments, workflow preferences
- **Process gaps** — steps you missed that a skill should encode
- **Repeated patterns** — same type of correction more than once = systemic issue
- **Things that worked** — approaches the user confirmed or accepted without pushback

### Step 2: Match to Updateable Targets

For each finding, identify WHERE the fix belongs:

- **Skill file** — if the issue is about how a specific task is executed
- **CLAUDE.md** — if the issue is about general agent behavior or rules
- **Memory** — if it's a preference or context that should persist across sessions
- **Workflow/cron** — if it's about when or how automated tasks run
- **SOUL.md / persona file** — if it's about tone or writing style (rare, check with the user)

### Step 3: Present Suggestions

Format as a numbered list. Each suggestion should be:

```
[number]. [TARGET: filename] — [what to change]
Brief why: [one sentence explaining the pattern that triggered this]
```

Example:
```
1. SKILL: thumbnail-skill — Add rule to always generate 3 thumbnail variations, not 1
Brief why: You asked for alternatives twice this session after I gave a single option.

2. CLAUDE.md — Add "never suggest routing to other agents" to red lines
Brief why: You corrected me when I suggested handing off to another agent.

3. MEMORY — Save preference: user prefers kebab-case for all file names
Brief why: You renamed two files I created in camelCase.
```

Rules for suggestions:
- **Max 7 suggestions.** If you find more, prioritize by impact (repeated corrections > one-offs).
- **Be specific.** Not "improve writing quality" but "add rule: no sentences over 20 words in community posts."
- **Only suggest changes the data supports.** Don't pad with generic improvements.
- **If nothing meaningful to update, say so.** "Clean session — nothing to calibrate" is a valid output.

### Step 4: Apply

Wait for the user to respond with which numbers to apply (e.g. "do 1 and 3", "all", "skip 2").

Then:
1. Make the changes to the target files
2. Confirm each change with the file path and a one-line summary
3. If updating a skill, re-read it after editing to verify it's coherent
4. If updating memory, follow the memory system rules (write file + update MEMORY.md index)

### Step 5: Done

No follow-up needed. Changes are live for the next time the skill/rule is invoked.

## What NOT to Suggest

- Changes that are already in the relevant skill or CLAUDE.md (check first)
- Generic "best practices" not grounded in this session's data
- Temporary fixes for one-off situations
- Changes to other agents' files unless this agent has write access

---

## Local additions for Greg's brain (2026-10-21; everything above is upstream, unchanged)

Source and licence: see `SOURCE.md`. The additions below adapt it to this workspace and to the ARMS "self-evolving memory" level.

**Where each target lives here**
- A skill → `.claude/skills/<name>/SKILL.md` (third-party skills such as `3d-brain`, `resume-tailoring`: put the change in that skill's `NOTES.md` instead, never edit the clone).
- "CLAUDE.md" → `CLAUDE.md` is only a map. Rules go in `5-brain/routers/workspace.md` (Standing rules) and, for project rules, `1-boulon/docs/continuity-log.md` §1. Never add rules to `CLAUDE.md`.
- Memory → `C:\Users\rilg01\.claude\projects\C--TRANSDEV-HUB\memory\`: update an existing file before creating one; new memory = one file with the standard frontmatter (`name`, `description`, `metadata.type`), plus one short line in `MEMORY.md` (one line, linked to its file).
- Scheduled task prompt → the task's `SKILL.md` under `C:\Users\rilg01\.claude\scheduled-tasks\<id>\`.

**Extra steps (in this order)**
1. Before Step 3, read `MEMORY.md` and the `NOTES.md` of every skill used this session. Parked notes from `/note` count as findings (they are Greg's feedback already); fold them into the suggestions and mark which `NOTES.md` lines each suggestion clears.
2. A lesson is worth keeping when Greg corrected the same thing twice, or said "always/never/from now on". Do not save it quietly: offer `/calibrate` instead. Save only after Greg picks the numbers.
3. When saving a memory, link it to related memories with `[[name]]` (look for memories on the same topic) and also fix the skill it belongs to, in the same pass. Tell Greg both file paths.
4. Prefer a principle that explains the miss over another rule stacked on the last one. A good update often makes the skill shorter. Show the change before saving it.
5. After applying, append one line to `5-brain/logs/calibrate-log.md`: date, target file, what changed, why. Create the file if missing.
6. Change nothing until Greg approves (Step 4 stays the gate).
