// sweep.js: renders every frame at a step (default 0.25 s) of one part IN THE PAGE (no screenshots, no video) and reports page errors,
// exceptions from render(t), and NaN / undefined / Infinity in the SVG. NODE_PATH=$(npm root -g) node sweep.js <part> [step=0.25]
const { chromium } = require('playwright'); const path = require('path');
(async () => { const PART = process.argv[2] || 1, step = +(process.argv[3] || .25); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; p.on('pageerror', e => errs.push('PAGEERR ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('ERR ' + m.text()); });
  await p.goto('file://' + path.resolve(__dirname, 'page.html') + '?part=' + PART); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  const r = await p.evaluate((step) => { const bad = [], END = TL.END; let n = 0;
    for (let t = 0; t < END; t += step) { n++; try { window.render(t); const h = document.getElementById('dyn').innerHTML; const m = h.match(/NaN|undefined|Infinity/);
        if (m) bad.push([+t.toFixed(2), window._S && window._S.name, m[0], h.slice(Math.max(0, m.index - 80), m.index + 20)]); }
      catch (e) { bad.push([+t.toFixed(2), window._S && window._S.name, 'EXC', String(e && e.message)]); } }
    return { n, bad, END }; }, step);
  const byScene = {}; for (const x of r.bad) (byScene[x[1] + ' ' + x[2]] = byScene[x[1] + ' ' + x[2]] || []).push(x);
  console.log(`part ${PART}: ${r.n} frames swept (every ${step} s to ${r.END.toFixed(1)} s), ${r.bad.length} bad, ${errs.length} page errors`);
  for (const [k, v] of Object.entries(byScene)) console.log('  ', k, v.length, 'frames, first at', v[0][0], 's:', v[0][3]);
  for (const e of [...new Set(errs)].slice(0, 10)) console.log('  ', e);
  await b.close(); process.exit(r.bad.length || errs.length ? 1 : 0); })();
