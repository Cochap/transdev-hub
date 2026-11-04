---
name: note
model: haiku
description: Park a piece of feedback on a skill without losing your thread. "/note <skill> <what was wrong or what you want>" saves it to that skill's own NOTES.md; "/note apply" later folds the parked notes into the skills (smallest model, shows the change first); "/note list" shows what is parked. Use whenever Greg notices mid-job that a skill, routine or app should do better.
---
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
