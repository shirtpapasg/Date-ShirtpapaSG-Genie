const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ proxy: { server: 'http://127.0.0.1:33675', bypass: 'localhost,127.0.0.1' } });
  const p = await b.newPage();
  p.on('console', m => console.log('console', m.type(), m.text()));
  p.on('requestfailed', r => console.log('fail', r.url(), r.failure().errorText));
  const r = await p.goto('http://localhost:8765/mindmap.html', { waitUntil: 'load', timeout: 60000 });
  console.log(r.status(), await p.title(), await p.locator('#mm-make').count());
  console.log(await p.evaluate(() => document.fonts.check('800 20px Nunito')));
  await b.close();
})();
