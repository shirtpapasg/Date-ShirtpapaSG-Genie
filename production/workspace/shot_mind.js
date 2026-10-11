const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:8765/mindmap.html'); await p.waitForTimeout(2500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight); console.log('height', h);
  await p.screenshot({ path: process.argv[2], fullPage: true }); await b.close(); })();
