// shot.js: screenshot a thumbnail page. node shot.js page.html out.png W H
const { chromium } = require('playwright');
(async () => { const [f, o, W, H] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +W || 1920, height: +H || 1080 } });
  await p.goto('file://' + require('path').resolve(f)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300); await p.screenshot({ path: o }); await b.close(); })();
