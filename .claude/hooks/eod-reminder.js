// UserPromptSubmit hook: from 16:45 on a weekday, push Claude to run the boulon-end-of-day
// skill. Fires on EVERY message until the skill writes today's date into .eod-done
// (a one-shot reminder was too easy to defer and then never came back).
const fs = require('fs');
const path = require('path');

const now = new Date();
const day = now.getDay(); // 0 = Sunday, 6 = Saturday
const minutes = now.getHours() * 60 + now.getMinutes();
// Background runs started by the HQ control room must not be pushed into end of day.
if (process.env.BOULON_HQ_RUN || day === 0 || day === 6 || minutes < 16 * 60 + 40) process.exit(0);

const stamp = now.toLocaleDateString('en-CA'); // local YYYY-MM-DD
// The 16:10 routine (or a manual run) holds this lock while it works: do not start a second one.
try {
  const held = fs.readFileSync(path.join(__dirname, '.eod-running'), 'utf8').trim().split(' ')[0];
  if ((now - new Date(held)) / 60000 < 60) process.exit(0);
} catch (_) { /* no run in progress */ }
try {
  if (fs.readFileSync(path.join(__dirname, '.eod-done'), 'utf8').trim() === stamp) process.exit(0);
} catch (_) { /* not done yet today */ }

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'UserPromptSubmit',
    additionalContext:
      "END OF DAY: it is past 16:45 on a workday and the boulon-end-of-day skill has not run today. " +
      "Open your reply with one line saying so. Answer Greg's message, then run the boulon-end-of-day skill " +
      "in this same turn, unless Greg's message explicitly says he is still working (then ask him once, " +
      "in the final line, whether to close the day now)."
  }
}));
