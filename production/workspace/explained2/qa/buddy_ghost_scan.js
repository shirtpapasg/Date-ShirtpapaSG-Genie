// buddy_ghost_scan.js <epdir> <part> [pre=1.5] [post=1.2]   (teacher, 2026-11-25: "pet buddies appear and reappear again"; SERIES_FORMAT 6)
//   NODE_PATH=$(npm root -g) node qa/buddy_ghost_scan.js ep18 2        -> one line per scene change, and the flagged frames
// Steps through every scene boundary (pre s before to post s after) at 30 fps and lists frames where a buddy sprite (any
// <use href="#s_<who>_...">, at least 150 px tall, not inside a clip-path or mask: cards and round face frames are skipped) shows twice,
// or once at a partial opacity (the product of its ancestors' opacities). It cannot see a buddy washed out UNDER a fading layer: look
// at stills of each melt too. OUT=file.json writes the raw result instead of the summary.
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => { const [dir0, P, pre = 1.5, post = 1.2] = process.argv.slice(2), dir = path.resolve(dir0); const TL = JSON.parse(fs.readFileSync(path.join(dir, `tl_p${P}.json`)));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(path.resolve(dir), 'page.html') + '?part=' + P); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  const res = [];
  for (let i = 1; i < TL.scenes.length; i++) { const s = TL.scenes[i], f0 = Math.max(0, Math.round((s.t0 - +pre) * 30)), f1 = Math.min(Math.floor(TL.END * 30) - 1, Math.round((s.t0 + +post) * 30));
    const hits = await p.evaluate(([f0, f1]) => { const out = [];
      for (let f = f0; f <= f1; f++) { window.render(f / 30); const vis = {};
        for (const u of document.querySelectorAll('#dyn use')) { const h = u.getAttribute('href') || ''; const m = h.match(/^#s_(pip|momo|basil)_/); if (!m) continue;
          let op = 1, el = u, skip = false; while (el && el.id !== 'dyn') { const tn = el.tagName.toLowerCase(); if (['mask', 'clippath', 'defs', 'pattern', 'symbol'].includes(tn) || (el.getAttribute && (el.getAttribute('clip-path') || el.getAttribute('mask')))) { skip = true; break; }
            const a = el.getAttribute && el.getAttribute('opacity'); if (a !== null && a !== undefined) op *= +a; const so = el.style && el.style.opacity; if (so) op *= +so; el = el.parentNode; }
          if (skip || op < .04) continue; const r = u.getBoundingClientRect(); const w = Math.min(r.right, 1920) - Math.max(r.left, 0), hh = Math.min(r.bottom, 1080) - Math.max(r.top, 0); if (w <= 0 || hh <= 0 || w * hh < 3000 || r.height < 150) continue;
          (vis[m[1]] = vis[m[1]] || []).push({ op: +op.toFixed(2), x: Math.round(r.left + r.width / 2), y: Math.round(r.bottom), h: Math.round(r.height), sc: window._S.name }); }
        const big = {}; for (const [who, L] of Object.entries(vis)) big[who] = L.reduce((a, b) => (b.h > a.h ? b : a)); out.push({ f, pos: big });
        for (const [who, L] of Object.entries(vis)) { const twice = L.length > 1, half = L.some(v => v.op < .96); if (twice || half) out.push({ f, t: +(f / 30).toFixed(3), who, kind: twice ? 'twice' : 'half', L }); } }
      return out; }, [f0, f1]);
    res.push({ boundary: TL.scenes[i - 1].name + '>' + s.name, t0: +s.t0.toFixed(3), hits }); }
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify({ dir, P, errs: [...new Set(errs)], res }));
  else { let bad = 0; if (errs.length) console.log('PAGE ERRORS', [...new Set(errs)].join(' | '));
    for (const r of res) { const h = r.hits.filter(x => x.who); bad += h.length ? 1 : 0;
      console.log(`${r.boundary.padEnd(26)} ${r.t0.toFixed(2).padStart(7)} s  ${h.length ? 'GHOST ' + [...new Set(h.map(x => x.who + ' ' + x.kind))].join(', ') + ' at ' + h[0].t + '-' + h[h.length - 1].t + ' s (' + [...new Set(h.flatMap(x => x.L.map(v => v.sc)))].join('/') + ')' : 'ok'}`); }
    console.log(bad ? `${bad} scene change(s) with a buddy twice or half-faded` : 'no buddy ghosting'); }
  await b.close(); })();
