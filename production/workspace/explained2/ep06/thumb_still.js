// thumb_still.js: one clean PNG frame for a thumbnail (no key-word shelf). node thumb_still.js <part> <t> <out.png>
const { chromium } = require('playwright'); const path = require('path');
(async () => { const [part, t, out, extra] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.resolve(__dirname, 'page.html') + `?part=${part}&noshelf${extra || ''}`); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  await p.evaluate(x => window.render(x), +t); await p.screenshot({ path: out }); await b.close(); })();
