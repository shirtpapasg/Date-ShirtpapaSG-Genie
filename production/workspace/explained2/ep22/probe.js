// probe.js: draw any expression on the stage, for checking props. node probe.js out.jpg part "js expression -> svg"  (NOBAKE=1 for live backgrounds)
const { chromium } = require('playwright'); const path = require('path');
(async () => { const [out, part, expr] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + path.resolve(__dirname, 'page.html') + '?part=' + part + (process.env.NOBAKE ? '&nobake' : '')); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  await p.evaluate((e) => { document.getElementById('dyn').innerHTML = eval(e); }, expr); await p.screenshot({ path: out, type: 'jpeg', quality: 88 }); await b.close(); })();
