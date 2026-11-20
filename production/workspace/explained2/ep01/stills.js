// stills.js: PNG/JPG frames at given times. node stills.js outPrefix t1 t2 ...   (NOBAKE=1 for live backgrounds)
const { chromium } = require('playwright'); const path = require('path');
(async () => { const [pre, ...ts] = process.argv.slice(2); const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + path.resolve(__dirname, 'page.html') + (process.env.NOBAKE ? '?nobake' : '')); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const t0 = Date.now();
  for (const t of ts) { await p.evaluate(x => window.render(x), +t); await p.screenshot({ path: `${pre}_${(+t).toFixed(2).padStart(7, '0')}.jpg`, type: 'jpeg', quality: 88 }); }
  console.log(((Date.now() - t0) / ts.length | 0) + ' ms/frame', errs.length ? 'ERRORS ' + [...new Set(errs)].join(' | ') : 'no page errors'); await b.close(); })();
