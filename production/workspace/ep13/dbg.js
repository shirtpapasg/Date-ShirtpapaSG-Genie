const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + process.argv[2]); await p.waitForFunction(() => window.READY === true);
  const r = await p.evaluate(() => { try { window.render(83); return 'ok'; } catch (e) { return e.stack; } }); console.log(r); await b.close(); })();
