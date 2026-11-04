---
title: Source — skill ecc-operating-notes
type: source
status: current
updated: 2026-09-30
sources: [../../.claude/skills/ecc-operating-notes/SKILL.md]
---

**Bottom line:** the project skill explaining how the ECC plugin behaves on Greg's PC: its checkpoint hook, settings rules, helper-model defaults and learning commands. Catalogued in [[skills-catalog]]; background in [[ecc-plugin]].

- GateGuard "Fact-Forcing Gate" shows as a `PreToolUse:Write hook error`. It is a checkpoint, not a failure: the first time a session writes outside exempt folders it asks Claude to state four facts (who uses the file, no duplicate exists, data format, Greg's exact words); Claude states them and retries. Exempt folders are in `GATEGUARD_EXEMPT_GLOBS` in `.claude/settings.json`. Do not turn GateGuard off: its shell checks catch destructive commands. PowerShell `Parser::ParseFile` checks are flagged every time.
- In AUTO permission mode, Claude editing `.claude/settings.json` is refused as "Self-Modification"; in bypass mode (current) it can, and the JSON must be validated with node after every edit.
- ECC's own helper agents carry a preset model (about 58 Sonnet, 6 Haiku, 4 Opus); generic helpers default to Sonnet via `CLAUDE_CODE_SUBAGENT_MODEL=sonnet`. Still set `model` on every Agent call ([[claude-operating-model]]).
- `/ecc:instinct-export` returns 0 until `/ecc:learn-eval` has run; learn-eval runs inside [[skill-boulon-end-of-day]]. From 16:45 on weekdays the hook `.claude/hooks/eod-reminder.js` nudges Claude until `.eod-done` holds today's date.

## Related
[[ecc-plugin]] · [[skills-catalog]] · [[claude-operating-model]]
