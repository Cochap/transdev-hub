const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const u of ['https://www.geotab.com/products/platform-overview/','https://www.geotab.com/fleet-management-solutions/fleet-safety/','https://www.geotab.com/fleet-management-solutions/fleet-maintenance/']) {
    await p.goto(u, { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
    const imgs = await p.evaluate(() => [...document.images].filter(i => i.naturalWidth>=700).map(i => `${i.naturalWidth}x${i.naturalHeight} ${i.currentSrc||i.src}`));
    console.log('\n'+u+' -> '+imgs.length+' large images'); imgs.slice(0,6).forEach(x=>console.log('  '+x.slice(0,150)));
  }
  await b.close();
})().catch(e=>{console.error('FAIL',e.message.split('\n')[0]);process.exit(1)});
