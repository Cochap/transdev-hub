// Beat-grid linter: 120 BPM, 8 bars x 4 beats = 32 beats, 0.5 s per beat.
// state = [name, beats, wordsOnScreen, type]; type: logo | view | alert | coach | bulk | handoff | share
const FLOWS = {
 'A Feature tour': [
  ['logo',2,2,'logo'],['map morph',2,2,'view'],['fleet appears',4,3,'bulk'],['bus panel: location+speed',4,5,'view'],
  ['speeding',3,3,'alert'],['harsh braking',3,3,'alert'],['seat belt',3,3,'alert'],['engine fault',4,4,'alert'],
  ['work order',4,4,'handoff'],['logo',3,2,'logo']],
 'B One bus, one shift': [
  ['logo',2,2,'logo'],['depot map',2,2,'view'],['bus departs',3,3,'view'],['speed',3,3,'view'],['harsh braking',3,3,'alert'],
  ['coaching',4,5,'coach'],['engine fault',4,4,'alert'],['work order',4,4,'handoff'],['back in service',4,4,'view'],['logo',3,2,'logo']],
 'C Fleet-wide move (hybrid)': [
  ['logo',2,2,'logo'],['fleet appears',4,3,'bulk'],['bus panel: location+speed',3,4,'view'],
  ['speeding+braking+seat belt, one per beat',3,4,'alert'],['AI driver coaching sent',3,4,'coach'],
  ['lasso fleet, one rule on every bus',4,5,'bulk'],['engine fault code',3,3,'alert'],['work order in mechanics queue',3,4,'handoff'],
  ['maintenance reminders x5 buses',3,4,'view'],['report link copied',2,3,'share'],['logo',2,2,'logo']],
 'D Three roles handoff': [
  ['logo',2,2,'logo'],['dispatcher map',4,3,'bulk'],['safety events',4,5,'alert'],['coaching',3,4,'coach'],['fault code',4,4,'alert'],
  ['work order',4,4,'handoff'],['reminders',3,3,'view'],['report',3,3,'view'],['share',2,3,'share'],['logo',3,2,'logo']]
};
const features = ['location','speed','braking','seat belt','coaching','fault','work order','reminders','report'];
const cover = {
 'A Feature tour':['location','speed','braking','seat belt','fault','work order'],
 'B One bus, one shift':['location','speed','braking','coaching','fault','work order'],
 'C Fleet-wide move (hybrid)':['location','speed','braking','seat belt','coaching','fault','work order','reminders','report'],
 'D Three roles handoff':['location','braking','coaching','fault','work order','reminders','report']};
for (const [name, st] of Object.entries(FLOWS)) {
  const res = []; let t = 0, peakOk = false, openBulk = false, maxRun = 1, run = 1, over = [];
  st.forEach(([n,b,w,ty],i) => {
    const start = t; t += b;
    if (w > b*1.5) over.push(`${n} (${w} words/${b} beats)`);
    if (ty==='bulk' && start>=12 && start<24) peakOk = true;          // bulk gesture in bars 4-6
    if (ty==='bulk' && start<8) openBulk = true;
    if (i>0) { run = (ty===st[i-1][3] && ty==='alert') ? run+1 : 1; maxRun = Math.max(maxRun, run); }
  });
  const c = cover[name];
  const checks = {
   'sums to 32 beats': t===32,
   'starts+ends on logo': st[0][3]==='logo' && st[st.length-1][3]==='logo',
   'readable (<=1.5 words/beat)': over.length===0,
   'no 3+ alerts in a row': maxRun<3,
   'peak bulk move in bars 4-6': peakOk,
   'opening bulk move (fleet appears)': openBulk,
   'covers all 9 features': c.length===9
  };
  const pass = Object.values(checks).filter(Boolean).length;
  console.log(`\n${name}: ${pass}/7  | features ${c.length}/9  | states ${st.length}`);
  for (const [k,v] of Object.entries(checks)) console.log(`  ${v?'PASS':'FAIL'}  ${k}${k.startsWith('sums')?` (got ${t})`:''}`);
  if (over.length) console.log('  too much text:', over.join('; '));
}
