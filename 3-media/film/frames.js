const { chromium } = require('playwright'); const path = require('path');
const pts = process.argv.slice(2).map(Number); const DUR = 16;
(async () => {
  const b = await chromium.launch({ headless: true, args:['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto(require('url').pathToFileURL(path.resolve('launch.html')).href + '#still');
  await p.evaluate(() => window.ready);
  for (const pc of (pts.length ? pts : [0,25,50,75,100])) {
    const t = pc/100*DUR;
    await p.evaluate(t => window.seek(t), t);
    await p.locator('canvas').screenshot({ path: `frames/f${String(pc).padStart(3,'0')}.png` });
    console.log('ok', pc, t.toFixed(2));
  }
  await b.close();
})();
