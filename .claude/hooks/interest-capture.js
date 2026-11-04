// UserPromptSubmit hook: when Greg states an interest, preference or learning goal,
// remind Claude to root it in the vault (memory + interest map + wiki) in the same turn.
let raw = '';
process.stdin.on('data', d => (raw += d));
process.stdin.on('end', () => {
  let prompt = '';
  try { prompt = JSON.parse(raw).prompt || ''; } catch { return; }
  const re = /\b(i'?m (more |really |very )?(into|interested in|curious about)|my interests?|i (like|love|enjoy) (to )?(learn|read|check|follow)|i want to (learn|understand|get better at|deepen)|i check [^.]{0,60}every|i'?m (a |quite a )?beginner|i'?m not (into|interested)|i don'?t (care|want) (about|to read))/i;
  if (!re.test(prompt)) return;
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext:
        'Greg just stated an interest, learning goal or exclusion. In THIS turn, root it in the vault: ' +
        '(1) update 4-learning/interests/interest-map.md (new branch or sub-branch as seed, with his words and the date; exclusions in the excluded line), ' +
        '(2) update memory greg-interest-profile.md, ' +
        '(3) if branches changed, refresh 1-boulon/wiki/concepts/greg-interest-map.md and append to 1-boulon/wiki/log.md. ' +
        'Tell Greg in one line what you filed.'
    }
  }));
});
