// stills.js: frames at given times -> out/stills/s_<t>.png (for checking by eye).   NODE_PATH=$(npm root -g) node stills.js 3 10.5 ...
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => console.log('PAGEERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
  await p.goto('file://' + path.join(__dirname, 'page.html')); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const dir = path.join(__dirname, 'out', 'stills'); fs.mkdirSync(dir, { recursive: true });
  for (const a of process.argv.slice(2)) { const t0 = Date.now(); await p.evaluate(t => window.render(t), +a); const f = path.join(dir, `s_${a}.png`); await p.screenshot({ path: f }); console.log(f, Date.now() - t0, 'ms'); }
  await b.close(); })();
