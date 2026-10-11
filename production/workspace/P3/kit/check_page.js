// node check_page.js PAGE [STEP=0.1]: renders the whole episode (no screenshots) and reports every page error,
// e.g. "cue quiz2:milk" = a C("quiz2", "milk") lookup for a word that is not spoken in that segment. Exit code 1 on any error.
const { chromium } = require('playwright');
(async () => { const [page, stepS] = process.argv.slice(2); const step = +(stepS || .1);
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1920, height: 1080}});
  const errs = []; p.on('pageerror', e => errs.push('PAGEERR ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await p.goto('file://' + page);
  try { await p.waitForFunction(() => window.READY === true, null, {timeout: 20000}); } catch (e) { errs.push('page never became READY (script error while building scenes?)'); }
  if (!errs.length) {
    const r = await p.evaluate(step => { const bad = {}, info = {};
      for (let t = 0; t <= TL.END + 1e-6; t += step) { try { window.render(t); } catch (e) { const k = e.message; if (!bad[k]) bad[k] = []; if (bad[k].length < 3) bad[k].push(+t.toFixed(2)); } }
      if (window.MMPHONE && !(S.mindmap && S.mindmap.shot)) bad['mind-map phone: config "mm" is set but S.mindmap.shot is missing'] = [];
      const miss = TL.scenes.map(s => s.scene).concat(['end']).filter(n => !S[n] || typeof S[n].run !== 'function');
      if (miss.length) bad['scenes without S.<name> = scene(...) and a run(t): ' + miss.join(', ')] = [];
      info.scenes = TL.scenes.length; info.END = TL.END; return {bad, info}; }, step);
    for (const k in r.bad) errs.push(k + (r.bad[k].length ? '  (at t = ' + r.bad[k].join(', ') + ' ...)' : ''));
    if (!errs.length) console.log(`page check OK: ${r.info.scenes} scenes, END ${r.info.END}s, rendered every ${step}s without errors`);
  }
  errs.forEach(e => console.log('ERROR', e)); await b.close(); process.exit(errs.length ? 1 : 0); })();
