// node fill_measure.js PAGE OUT.json  -> per-scene union bbox of the visible stage content (SVG coords), sampled every 0.25 s
// (welcome and end are shared full-frame scenes and are never enlarged). Used by prep_p3.py for the scene enlargement "fills".
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [page, out] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1920, height: 1080}});
  p.on('pageerror', e => { console.log('PAGEERR', e.message); process.exitCode = 1; });
  await p.goto('file://' + page); await p.waitForFunction(() => window.READY === true); await p.waitForTimeout(300);
  const res = await p.evaluate(() => { const R = {}; const svg = document.querySelector('svg'); const sr = svg.getBoundingClientRect(); const sc = 1920 / sr.width;
    for (const name of order) { if (name === 'welcome' || name === 'end' || !S[name]) continue; const st = S[name].stage;
      const leaves = [...st.querySelectorAll('text,rect,path,circle,ellipse,line,polyline,polygon,image,use')];
      let box = null, wide = 0;
      for (let t = SC[name].t0 + .5; t < SC[name].t1 - .3; t += .25) { window.render(t);
        for (const e of leaves) { if (e.closest('clipPath,defs,mask')) continue; let o = 1, n = e;
          while (n && n !== st.parentNode) { const cs = getComputedStyle(n); if (cs.display === 'none' || cs.visibility === 'hidden') { o = 0; break; } o *= parseFloat(cs.opacity); n = n.parentNode; }
          if (o < .05) continue; const r = e.getBoundingClientRect(); if (r.width === 0 && r.height === 0) continue;
          const x0 = (r.left - sr.left) * sc, y0 = (r.top - sr.top) * sc, x1 = (r.right - sr.left) * sc, y1 = (r.bottom - sr.top) * sc;
          if (x1 - x0 >= 1500 || y1 - y0 >= 900) { wide = 1; continue; }
          box = box ? [Math.min(box[0], x0), Math.min(box[1], y0), Math.max(box[2], x1), Math.max(box[3], y1)] : [x0, y0, x1, y1]; } }
      R[name] = {box: box && box.map(v => Math.round(v)), wide}; }
    return R; });
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); await b.close(); })();
