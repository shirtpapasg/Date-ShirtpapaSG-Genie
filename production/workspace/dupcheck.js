const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  for (const f of process.argv.slice(2)) { await p.goto('file://' + f); await p.waitForFunction(() => window.READY === true);
    const r = await p.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(e => e.id); const c = {}; ids.forEach(i => c[i] = (c[i] || 0) + 1); return Object.entries(c).filter(([k, v]) => v > 1); });
    console.log(f.split('/').slice(-1)[0], JSON.stringify(r)); }
  await b.close(); })();
