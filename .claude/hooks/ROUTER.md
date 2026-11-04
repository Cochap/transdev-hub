# ROUTER — .claude/hooks
Open only the line you need. Every child of this folder is listed below.

## Contents
- `.eod-done` — file
- `eod-reminder.js` — UserPromptSubmit hook: from 16:45 on a weekday, push Claude to run the boulon-end-of-day
- `session-start.js` — SessionStart hook: hand Claude the morning facts before Greg types anything.
- `skill-model-route.js` — PreToolUse hook on the Skill tool: every time Claude invokes ANY skill, run the model router
- `sync-skill-routing.js` — SessionStart hook: start the skill-routing upkeep in the background and return immediately.
