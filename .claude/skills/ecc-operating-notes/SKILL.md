---
name: ecc-operating-notes
model: haiku
description: Use when an ECC hook blocks or warns (GateGuard "Fact-Forcing Gate", config-protection), when choosing a model for a helper agent, or when an ECC learning command (instinct-export, learn-eval) returns nothing. How ECC behaves on Greg's BOULON PC.
---
# ECC operating notes (BOULON PC)

## GateGuard "Fact-Forcing Gate"
- It shows as `PreToolUse:Write hook error: [Fact-Forcing Gate]` (or Edit). It is a checkpoint, not a failure. The first time a session creates or edits a file outside the exempt folders, GateGuard asks Claude to state four facts (who uses the file, no duplicate exists, data format, Greg's exact words). Claude states them in chat and retries, and the write goes through.
- Nothing is lost when it fires. The blocked write simply didn't happen yet.
- Exempt folders are listed in `GATEGUARD_EXEMPT_GLOBS` in `.claude/settings.json` (project docs, tests, rebuild, skills, hooks, session-data and the memory folder). Add a folder there if the gate keeps firing on routine files. Don't turn GateGuard off entirely: its shell checks catch destructive commands.
- PowerShell `Parser::ParseFile` syntax checks are flagged as destructive every time. Check scripts by running them.

## Settings files
- In AUTO permission mode, Claude editing `.claude/settings.json` is refused as "Self-Modification". This applies only to auto mode. In bypass mode (current), Claude can edit it; still validate the JSON with node after every edit.

## Helper models
- ECC's own helper agents come with a preset model (about 58 Sonnet, 6 Haiku, 4 Opus). Generic helpers get Sonnet by default through `CLAUDE_CODE_SUBAGENT_MODEL=sonnet`. Still set `model` on every Agent call (Greg's routing rule).

## Learning commands
- Instincts (`/ecc:instinct-status`, `/ecc:instinct-export`, `/ecc:evolve`) stay at 0 on this PC. Only the continuous-learning-v2 background observer creates them, and on native Windows it is killed when the hook exits (ECC skill `continuous-learning-v2` SKILL.md, "Observer platform support", issue #2489). Raw observations still pile up in `C:Usersilg01.localshareecc-homunculusobservations.jsonl`, but nothing reads them. `/ecc:learn-eval` writes skills, not instincts. Our working loop: `boulon-end-of-day`, `calibrate`, `/note`, `routine-recos` (audit 2026-11-03).
- learn-eval runs as part of `boulon-end-of-day`. From 16:40 on weekdays (the routine itself runs at 16:10), the project hook `.claude/hooks/eod-reminder.js` pushes Claude to run end of day on every message until `boulon-end-of-day` writes today's date to `.claude/hooks/.eod-done`. A hook can only add text for Claude; it can't run a skill by itself.
