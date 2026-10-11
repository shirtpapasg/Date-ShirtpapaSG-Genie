const { chromium } = require('playwright');
(async () => { const [file, outdir, ...ts] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto('file://' + file); await p.waitForFunction(() => window.READY === true);
  for (const t of ts) { try { await p.evaluate(t => window.render(+t), t); await p.screenshot({ path: `${outdir}/s_${t}.jpg`, type: 'jpeg', quality: 70 }); } catch (e) { console.log('ERR at', t, e.message.split('\n')[0]); } }
  await b.close(); })();
