// stills.js: PNG frames at given times, to check a page before the full render. node stills.js page.html outPrefix W H t1 t2 ...
const { chromium } = require('playwright');
(async () => { const [file, pre, Ws, Hs, ...ts] = process.argv.slice(2); const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +Ws, height: +Hs } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + require('path').resolve(file)); await p.waitForFunction(() => window.READY === true, null, {timeout: 20000});
  for (const t of ts) { await p.evaluate(x => window.render(x), +t); await p.screenshot({ path: `${pre}_${String(t).padStart(6, '0')}.png` }); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no page errors'); await b.close(); })();
