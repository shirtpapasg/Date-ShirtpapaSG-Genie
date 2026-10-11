const { chromium } = require('playwright');
(async () => { const [file, outp, ...ts] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + file); await p.waitForFunction(() => window.READY === true);
  for (const t of ts) { await p.evaluate(t => window.render(t), +t); await p.screenshot({ path: `${outp}_${t}.jpg`, type: 'jpeg', quality: 70 }); }
  await b.close(); })();
