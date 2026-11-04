---
name: boulon-hq-update
model: haiku
description: Run at the end of EVERY work exchange in TRANSDEV HUB, any project (BOULON, workshop segmentation, ZBB, learning), not only BOULON. Refreshes Greg's HQ page (boulon-hq.html), including the Today and Week tabs, and mirrors durable facts into the continuity log.
---
# Refresh BOULON HQ after every exchange

BOULON HQ (https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9) is Greg's **only** daily view. It replaced TODAY.md on 2026-09-23. Design goal: engaging and low-clutter. One action in focus, progress visible, finished items gone.

1. Edit only the `const S = {...}` block in `C:\TRANSDEV HUB\boulon-hq.html`:
   - `updated`: the current time.
   - `headline`: one sentence saying where we stand now.
   - `progress`: done/total for the current step.
   - `move`: the **single** next thing Greg does, in full `boulon-greg-steps` format. If Greg has nothing to do, say so and show what Claude is doing.
   - `decisions`: states are good (decided), warn (open), bad (blocked). Remove a decision one exchange after it's decided, once it's logged.
   - `tiles` / `tests`: latest scores. The pass rule: the answer is right AND the citation names the manual.
   - `later`: at most 7 rows, relative times. Drop anything done.
   - `top3`: the 3 most valuable next moves across ALL projects (`who`, `what`, `why`, `p` = project id). Claude's recommendation, ranked by impact and by how long it has waited. Shown at the top of every tab.
   - `projects`: one entry per active project (`id`, `name`, `state` now/wait/next, `status` one line, `where` path, `moves` = exactly 3 ranked next moves with `why`). Drop a move once it's done and promote the next one. Add a project when a new one starts.
   - `feed`: newest first, at most 5 items. Name the ECC agents and skills actually used. This is how Greg sees ECC at work.
2. Republish with the Artifact tool. In the session that first published it, use the same file path; in ANY other session (terminal, new chat), pass `url: https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9`, or you'll create a duplicate page. Read it first (`action: read`) if this session hasn't published it. No icon.
   - The same file also feeds the local **Control room** (http://127.0.0.1:4777, `1-boulon/hq/server.js` + `1-boulon/hq/hq-local.js`, see `1-boulon/docs/hq-control-room.md`). Don't edit the Control room from here. It reads live numbers itself, and it never appears on the published page. Keep `boulon-hq.html`'s `#v-now` element and CSS tokens: the panel depends on them.
3. Mirror durable facts, such as decisions and results, into `1-boulon/docs/continuity-log.md` and the continuity log doc (see memory `live-log-doc`).
4. Plain language, no emoji, and no ECC tool pre-assigned to future slots.
