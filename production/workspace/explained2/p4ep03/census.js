// census.js (P4 EP3 v2): what is on screen, where, every <step> s of the BASE staging (?nodir: no director camera), for plan_shots.py and QA.
//   NODE_PATH=$(npm root -g) node census.js out/census.json [step=.25] [nodir=1]
// Per sample: t, scene, chars {who: {b: tight body box, h: head box, name}} (buddies, GLITCH, Uncle Lim, from the paintings' alpha),
// cards [boxes of cards and panels, not bubbles; a 5th value 1 = fixed on the screen (DHUD)], mir [mirrored words], hud boxes.
// Also used for the checks: GLITCH must keep >= 60 px clear of every buddy; no mirrored words; Uncle Lim only in his line.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const [out = 'out/census.json', stepS = '.25', nodir = '1'] = process.argv.slice(2), step = +stepS;
(async () => {
  const b = await chromium.launch({ ignoreDefaultArgs: ['--disable-dev-shm-usage'], args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('file://' + path.join(__dirname, 'page.html') + '?part=1' + (nodir === '1' ? '&nodir' : '')); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  await p.evaluate(async () => { window._HB = {};
    for (const im of document.querySelectorAll('image[id^="s_"]')) { const id = im.id.slice(2); if (!/^(pip|momo|basil|glitch|lim)/.test(id)) continue; const I = new Image(); I.src = im.getAttribute('href');
      try { await I.decode(); } catch (e) { continue; } const c = document.createElement('canvas'), W = c.width = I.naturalWidth, H = c.height = I.naturalHeight, g = c.getContext('2d'); g.drawImage(I, 0, 0);
      const d = g.getImageData(0, 0, W, H).data, A = (x, y) => d[(y * W + x) * 4 + 3] > 128; let y0 = H, y1 = -1, x0 = W, x1 = -1;
      for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (A(x, y)) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (x < x0) x0 = x; if (x > x1) x1 = x; }
      if (y1 < 0) continue; const sx = +im.getAttribute('width') / W, sy = +im.getAttribute('height') / H;
      // the alpha column profile, for an exact horizontal extent per row band (GLITCH vs a buddy's tail)
      const rows = []; for (let k = 0; k < 12; k++) { const ya = y0 + (y1 - y0) * k / 12, yb = y0 + (y1 - y0) * (k + 1) / 12; let l = W, r = -1; for (let y = Math.round(ya); y < yb; y += 2) for (let x = 0; x < W; x += 2) if (A(x, y)) { if (x < l) l = x; if (x > r) r = x; } rows.push(r < 0 ? null : [l * sx, r * sx]); }
      window._HB[id] = { body: { l: x0 * sx, r: x1 * sx, t: y0 * sy, b: y1 * sy }, rows, y0: y0 * sy, y1: y1 * sy }; } });
  const END = await p.evaluate(() => TL.END), N = Math.ceil(END / step), all = [];
  for (let i0 = 0; i0 < N; i0 += 40) all.push(...await p.evaluate(([i0, i1, step]) => { const res = [];
    const vis = (el) => { let op = 1; for (let e = el; e && e.id !== 'dyn' && e.tagName; e = e.parentNode) { const tn = e.tagName.toLowerCase(); if (['mask', 'clippath', 'defs', 'pattern', 'symbol', 'filter'].includes(tn)) return -1;
      const o = e.getAttribute && e.getAttribute('opacity'); if (o !== null && o !== undefined && o !== '') op *= +o; } return op; };
    const r1 = (v) => Math.round(v), box = (B) => [r1(B.l), r1(B.t), r1(B.r), r1(B.b)];
    const mapBox = (M, B) => { const P = [[B.l, B.t], [B.r, B.t], [B.l, B.b], [B.r, B.b]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(M)); return { l: Math.min(...P.map((q) => q.x)), r: Math.max(...P.map((q) => q.x)), t: Math.min(...P.map((q) => q.y)), b: Math.max(...P.map((q) => q.y)) }; };
    const inside = (el, sel) => { for (let e = el; e && e.id !== 'dyn'; e = e.parentNode) if (e.matches && e.matches(sel)) return true; return false; };
    for (let i = i0; i < i1; i++) { const t = i * step; window.render(t); const dyn = document.getElementById('dyn'); const chars = {}, cards = [], mir = [], hud = [];
      for (const u of dyn.querySelectorAll('use')) { const hr = u.getAttribute('href') || ''; const m = hr.match(/^#s_((pip|momo|basil|glitch|lim)\w*)$/); if (!m) continue; const v = vis(u); if (v < .3) continue;
        const M = u.getScreenCTM(), H = window._HB[m[1]]; if (!M || !H) continue; const B = mapBox(M, H.body); if (B.b - B.t < 30 || B.r < 0 || B.l > 1920) continue;
        const hh = (H.y1 - H.y0) * .42, head = mapBox(M, { l: H.body.l, r: H.body.r, t: H.y0, b: H.y0 + hh });
        const rows = H.rows.map((rw, k) => rw ? box(mapBox(M, { l: rw[0], r: rw[1], t: H.y0 + (H.y1 - H.y0) * k / 12, b: H.y0 + (H.y1 - H.y0) * (k + 1) / 12 })) : null).filter(Boolean);
        const who = m[2], cur = chars[who], area = (B.r - B.l) * (B.b - B.t); if (cur && cur.area >= area) continue; chars[who] = { name: m[1], b: box(B), h: box(head), rows, area: r1(area), peek: 0 }; }
      for (const e of dyn.querySelectorAll('rect[rx], text')) { if (inside(e, '[data-bub]') || vis(e) < .3) continue; const R = e.getBoundingClientRect(); if (R.width < 4) continue;
        const isHud = inside(e, '[data-hud]'), tn = e.tagName.toLowerCase(), B = [r1(R.left), r1(R.top), r1(R.right), r1(R.bottom)];
        if (tn === 'text') { const M = e.getScreenCTM(); if (M && M.a * M.d - M.b * M.c < 0 && (e.textContent || '').trim()) mir.push([(e.textContent || '').trim().slice(0, 30), ...B]); }
        if (tn === 'rect') { if (e.getAttribute('fill') === 'none' || R.width < 120 || R.height < 80 || R.width > 1800) { if (isHud) hud.push(B); continue; } cards.push(isHud ? [...B, 1] : B); } else if (isHud) hud.push(B); }
      res.push({ t: +t.toFixed(2), sc: window._S.name, chars, cards, mir: mir.slice(0, 6), hud: hud.length }); }
    return res; }, [i0, Math.min(N, i0 + 40), step]));
  fs.writeFileSync(out, JSON.stringify(all)); console.log(all.length, 'samples ->', out, errs.length ? 'ERRORS ' + [...new Set(errs)].join(' | ') : 'no page errors'); await b.close(); })();
