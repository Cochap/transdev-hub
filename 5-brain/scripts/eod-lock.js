// End-of-day guard: stops two end-of-day runs working on the same files, and catch-up runs
// at app start from closing a day that has just begun.
// Usage: node 5-brain/scripts/eod-lock.js start|done|release|status
//   start   -> prints GO, RUNNING, DONE or EARLY (see boulon-end-of-day step 0a)
//   done    -> writes today into .claude/hooks/.eod-done and removes the lock (needs today's hand-off)
//   release -> removes the lock only (use after a failed run)
const fs = require('fs');
const path = require('path');

const HUB = path.resolve(__dirname, '..', '..');
const hooks = path.join(HUB, '.claude', 'hooks');
const lock = path.join(hooks, '.eod-running');
const done = path.join(hooks, '.eod-done');
const now = new Date();
const today = now.toLocaleDateString('en-CA');
const read = (f) => { try { return fs.readFileSync(f, 'utf8').trim(); } catch { return ''; } };
const STALE_MIN = 60;

const cmd = process.argv[2] || 'status';
if (cmd === 'start' || cmd === 'status') {
  if (read(done) === today) { console.log('DONE'); process.exit(0); }
  const held = read(lock);
  if (held) {
    const age = (now - new Date(held.split(' ')[0])) / 60000;
    if (age < STALE_MIN) { console.log(`RUNNING (started ${Math.round(age)} min ago)`); process.exit(0); }
  }
  if (now.getHours() * 60 + now.getMinutes() < 15 * 60 + 30) { console.log('EARLY'); process.exit(0); }
  if (cmd === 'start') fs.writeFileSync(lock, `${now.toISOString()} pid${process.ppid}\n`);
  console.log('GO');
} else if (cmd === 'done') {
  const handoff = path.join(HUB, '5-brain', 'handoffs', `${today}-eod-handoff.md`);
  if (!fs.existsSync(handoff)) { console.log(`REFUSED: ${handoff} missing; write the hand-off first`); process.exit(1); }
  fs.writeFileSync(done, today + '\n');
  try { fs.unlinkSync(lock); } catch {}
  console.log(`closed ${today}`);
} else if (cmd === 'release') {
  try { fs.unlinkSync(lock); } catch {}
  console.log('released');
}
