const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('https://www.transdev.ca', { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
  await p.screenshot({ path: 'transdev-home.png' });
  const info = await p.evaluate(() => {
    const cnt = {};
    const add = (c) => { if (!c || c === 'rgba(0, 0, 0, 0)' || c==='transparent') return; cnt[c] = (cnt[c]||0)+1; };
    document.querySelectorAll('a,button,h1,h2,h3,header,nav,footer,[class*=btn],[class*=button]').forEach(e => {
      const s = getComputedStyle(e); add(s.backgroundColor); add(s.color); });
    const vars = [];
    for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) if (r.style) for (const n of r.style) if (n.startsWith('--') && /#|rgb|hsl/.test(r.style.getPropertyValue(n))) vars.push(n+': '+r.style.getPropertyValue(n).trim()); } catch(e){} }
    const logo = [...document.querySelectorAll('img,svg')].map(e => e.getAttribute('src')||e.getAttribute('alt')||'svg').filter(x=>/logo/i.test(x)).slice(0,5);
    const fonts = [...new Set([...document.querySelectorAll('h1,h2,p,a,button')].map(e=>getComputedStyle(e).fontFamily.split(',')[0].trim()))].slice(0,6);
    return { top: Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,12), vars: vars.slice(0,20), logo, fonts };
  });
  console.log(JSON.stringify(info, null, 1));
  await b.close();
})().catch(e => { console.error('FAIL', e.message.split('\n')[0]); process.exit(1); });
