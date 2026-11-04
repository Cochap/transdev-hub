const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('https://www.geotab.com', { waitUntil: 'domcontentloaded', timeout: 45000 });
  console.log('title:', await p.title());
  await p.screenshot({ path: 'smoke-geotab.png' });
  await b.close();
  console.log('OK');
})().catch(e => { console.error('FAIL', e.message.split('\n')[0]); process.exit(1); });
