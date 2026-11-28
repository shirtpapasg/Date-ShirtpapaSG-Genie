// bubble_layout.js <epdir> <part> [fps=10]: speech bubbles next to their speaker (teacher, 28 Nov 2026, P4 EP2: "bring the speech bubble
// closer to the characters"). Writes <epdir>/bubplace_p<part>.js (window.BUBPLACE) for kit/bubbles.js; prints one line per bubble page.
//   NODE_PATH=$(npm root -g) node ../kit/bubble_layout.js . 1      (from the episode folder; before render.js; re-run after any scene change)
// Needs the episode's page.html to load ../kit/bubbles.js and bubplace_p<part>.js, lib.js bubble()/say() to pass o.bkey / o.who (P4 EP2 lib.js),
// and the guests' face boxes to carry data-face="<who>" (chilliFaceBox, glitchFaceBox, limHeadBox). Rules for a bubble page:
//   - the speaker's head: a buddy's from the painting's alpha (the widest part of the top 42 %; a helmet drawn on top counts), a guest's
//     face box; the mouth about 70 % down the head. A page whose speaker is not on screen in most samples keeps the scene's own spot.
//   - the spots tried: just above the head (centred, or slid left / right), beside the head (left, right; level or a little higher), all
//     pulled inside the frame (16 px). The tail is a short triangle from the nearest edge to just outside the head, aimed at the mouth.
//   - cost: covering ANY face (huge), another bubble on screen at the same time (huge), cards / words / data-obst marks (big), a buddy's or
//     guest's body (small), the tail's length beyond 40 px, a side spot (small), sliding off-centre (tiny). The cheapest spot wins.
//   - the speaker moving during the page by more than 30 px (a camera move): the bubble rides along (trk), smoothed over .5 s.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const [dir0 = '.', PART = '1', FPSs = '10'] = process.argv.slice(2), dir = path.resolve(dir0), FPS = +FPSs;
const TL = JSON.parse(fs.readFileSync(path.join(dir, `tl_p${PART}.json`)));
const GAP = 46, MARGIN = 16, DBG = process.env.DEBUG ? new RegExp(process.env.DEBUG) : null;
const BODY = 30, BODY_OWN = 30, BODY_CHILLI = 160;   // the cost of covering a body (per bubble area)
(async () => {
  const b = await chromium.launch({ ignoreDefaultArgs: ['--disable-dev-shm-usage'], args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('file://' + path.join(dir, 'page.html') + '?part=' + PART + '&bubrec'); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  // the buddy paintings' head boxes (in image units)
  await p.evaluate(async () => { window._HB = {};
    for (const im of document.querySelectorAll('image[id^="s_"]')) { const id = im.id.slice(2); if (!/^(pip|momo|basil|chilli|glitch|lim)/.test(id)) continue; const src = im.getAttribute('href'); const I = new Image(); I.src = src;
      try { await I.decode(); } catch (e) { continue; } const c = document.createElement('canvas'), W = c.width = I.naturalWidth, H = c.height = I.naturalHeight, g = c.getContext('2d'); g.drawImage(I, 0, 0);
      const d = g.getImageData(0, 0, W, H).data, A = (x, y) => d[(y * W + x) * 4 + 3] > 128; let y0 = H, y1 = -1, x0 = W, x1 = -1;
      for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (A(x, y)) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (x < x0) x0 = x; if (x > x1) x1 = x; }
      if (y1 < 0) continue; const HH = y1 - y0, bandB = Math.round(y0 + .42 * HH), cnt = new Array(W).fill(0);
      for (let x = 0; x < W; x++) for (let y = y0; y < bandB; y += 2) if (A(x, y)) cnt[x]++;
      let m = 0; for (let x = 0; x < W; x++) if (cnt[x] > cnt[m]) m = x; const thr = .35 * cnt[m]; let l = m, r = m; while (l > 0 && cnt[l - 1] > thr) l--; while (r < W - 1 && cnt[r + 1] > thr) r++;
      let top = y0; for (let y = y0; y < bandB; y++) { let n = 0; for (let x = l; x <= r; x += 2) if (A(x, y)) n++; if (n > .3 * (r - l + 1) / 2) { top = y; break; } }
      const sx = +im.getAttribute('width') / W, sy = +im.getAttribute('height') / H;
      window._HB[id] = { l: l * sx, r: r * sx, t: top * sy, b: (y0 + .45 * HH) * sy, body: { l: x0 * sx, r: x1 * sx, t: y0 * sy, b: y1 * sy } }; } });
  const N = Math.ceil(TL.END * FPS), samples = [];
  for (let f0 = 0; f0 < N; f0 += 50) samples.push(...await p.evaluate(([f0, f1, FPS]) => { const out = [];
    const vis = (el) => { let op = 1; for (let e = el; e && e.id !== 'dyn' && e.tagName; e = e.parentNode) { const tn = e.tagName.toLowerCase(); if (['mask', 'clippath', 'defs', 'pattern', 'symbol', 'filter'].includes(tn)) return -1;
      const o = e.getAttribute && e.getAttribute('opacity'); if (o !== null && o !== undefined && o !== '') op *= +o; } return op; };
    const bx = (R) => ({ l: R.left, t: R.top, r: R.right, b: R.bottom });
    const mapBox = (M, B) => { const P = [[B.l, B.t], [B.r, B.t], [B.l, B.b], [B.r, B.b]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(M)); return { l: Math.min(...P.map((q) => q.x)), r: Math.max(...P.map((q) => q.x)), t: Math.min(...P.map((q) => q.y)), b: Math.max(...P.map((q) => q.y)) }; };
    const clipped = (el) => { for (let e = el.parentNode; e && e.id !== 'dyn'; e = e.parentNode) if (e.getAttribute && e.getAttribute('clip-path')) return true; return false; };
    for (let f = f0; f < f1; f++) { const t = f / FPS; window.render(t); const dyn = document.getElementById('dyn'); const bubs = [...dyn.querySelectorAll('[data-bub]')];
      if (!bubs.length) continue; const inBub = (el) => bubs.some((B) => B.contains(el));
      const heads = {}, faces = [], bodies = [], obs = [], hats = [];
      for (const u of dyn.querySelectorAll('use')) { const hr = u.getAttribute('href') || ''; const m = hr.match(/^#s_((pip|momo|basil|chilli|glitch|lim)\w*)$/); if (!m || vis(u) < .3) continue;
        const who = m[2], name = m[1], M = u.getScreenCTM(); if (!M) continue;
        if (who === 'pip' || who === 'momo' || who === 'basil') { const H = window._HB[name]; if (!H) continue; const body = mapBox(M, H.body); if (body.b - body.t < 50) continue;
          let head = mapBox(M, H); const hh = head.b - head.t, face0 = { ...head };
          for (const c of u.parentNode.children) { if (c === u) continue; const R = c.getBoundingClientRect(); if (R.width < 2) continue; const cx = (R.left + R.right) / 2;
            if (cx > head.l && cx < head.r && R.top < head.t && R.bottom < head.b + .2 * hh) { head.t = Math.min(head.t, R.top); head.l = Math.min(head.l, Math.max(R.left, head.l - .15 * hh)); head.r = Math.max(head.r, Math.min(R.right, head.r + .15 * hh)); } }
          const back = /_back/.test(name), cand = { who, ...head, mx: (head.l + head.r) / 2, my: head.t + .72 * (head.b - head.t), area: (body.r - body.l) * (body.b - body.t), cl: clipped(u) };
          if (!back) faces.push({ who, ...face0 }); bodies.push({ who, ...body }); if (head.t < face0.t - 2) hats.push({ who, l: head.l, r: head.r, t: head.t, b: face0.t + .2 * hh });   // a helmet: not the face, but keep off it
          const cur = heads[who]; if (!cur || (cur.cl && !cand.cl) || (cur.cl === cand.cl && cand.area > cur.area)) heads[who] = cand; }
        else { const H = window._HB[name]; bodies.push({ who, ...(H ? mapBox(M, H.body) : bx(u.getBoundingClientRect())) }); } }
      for (const g of dyn.querySelectorAll('[data-face]')) { if (vis(g) < .3) continue; const B = bx(g.getBoundingClientRect()); if (B.r - B.l < 6 || B.r < 0 || B.l > 1920 || B.b < 0 || B.t > 1080) continue; const who = g.getAttribute('data-face');
        faces.push({ who, ...B }); const area = (B.r - B.l) * (B.b - B.t), cur = heads[who]; if (cur && area <= cur.area) continue;
        // Chilli: the head is the whole plant above the pot's face (a bubble goes above the leaves or beside the pot, never on the leaves)
        let top = B.t; if (who === 'chilli') for (const u of g.parentNode.querySelectorAll('use')) { const hr = (u.getAttribute('href') || '').slice(3), H = window._HB[hr], M = u.getScreenCTM(); if (H && M) top = Math.min(top, mapBox(M, H.body).t); }
        heads[who] = { who, ...B, t: top, ft: B.t, mx: (B.l + B.r) / 2, my: B.t + .7 * (B.b - B.t), area }; }
      for (const e of dyn.querySelectorAll('text')) { if (inBub(e)) continue; const tx = (e.textContent || '').trim(); if (!tx || vis(e) < .3) continue; const R = e.getBoundingClientRect(); if (R.width < 4) continue; obs.push({ k: 'word', ...bx(R) }); }
      for (const e of dyn.querySelectorAll('rect[rx]')) { if (inBub(e) || vis(e) < .3) continue; if (e.getAttribute('fill') === 'none') continue; const R = e.getBoundingClientRect(); if (R.width < 40 || R.width > 1500 || R.height < 30 || R.height > 900) continue; obs.push({ k: 'card', ...bx(R) }); }
      for (const e of dyn.querySelectorAll('[data-obst]')) { const R = e.getBoundingClientRect(); if (R.width < 2) continue; obs.push({ k: e.getAttribute('data-obst'), ...bx(R) }); }
      const bl = bubs.map((B) => { const M = B.parentNode.getScreenCTM(); const id = M && (Math.abs(M.a - 1) > 1e-3 || Math.abs(M.d - 1) > 1e-3 || Math.abs(M.b) > 1e-3 || Math.abs(M.c) > 1e-3 || Math.abs(M.e) > .5 || Math.abs(M.f) > .5) ? M.inverse() : null;
        const BR = B.getBoundingClientRect(); return { ox: (BR.left + BR.right) / 2, oy: (BR.top + BR.bottom) / 2, key: B.getAttribute('data-bub'), who: B.getAttribute('data-who'), w: +B.getAttribute('data-bw') + 14, h: +B.getAttribute('data-bh') + 14, sz: +B.getAttribute('data-sz') || 40, xc: +B.getAttribute('data-xc') || 0, txt: decodeURIComponent(B.getAttribute('data-txt') || ''), m: id ? [id.a, id.b, id.c, id.d, id.e, id.f].map((v) => +v.toFixed(5)) : null }; });
      out.push({ t, scene: window._S.name, bubs: bl, heads, faces, bodies, obs, hats }); }
    return out; }, [f0, Math.min(N, f0 + 50), FPS]));
  // the pages
  const pages = {}; for (const S of samples) for (const B of S.bubs) { const P = pages[B.key] || (pages[B.key] = { ...B, S: [] }); P.S.push(S); }
  const keys = Object.keys(pages).sort((a, c) => pages[a].S[0].t - pages[c].S[0].t);
  // each page also as a narrower bubble (more lines), so it can fit beside a head where the wide one cannot
  const VAR = await p.evaluate((list) => list.map(([key, txt, sz, xc, w, h]) => { const out = [{ w, h, mw: 0, n: Math.round((h - 54) / (sz * 1.22)) }];
    if (txt) for (const mw of [460, 380, 320, 260, 220, 190]) { const ls = wrap(txt, sz, mw); if (ls.length > 5 || out.some((v) => v.n === ls.length)) continue;
      out.push({ w: Math.max(...ls.map((l) => tw(l, sz, 600))) + 70 + xc * 64 + 14, h: ls.length * sz * 1.22 + 40 + 14, mw, n: ls.length }); } return [key, out]; }),
    keys.map((k) => [k, pages[k].txt, pages[k].sz, pages[k].xc, pages[k].w, pages[k].h]));
  for (const [k, v] of VAR) pages[k].vars = v;
  await b.close();
  const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[s.length >> 1] : 0; };
  const inter = (A, B) => Math.max(0, Math.min(A.r, B.r) - Math.max(A.l, B.l)) * Math.max(0, Math.min(A.b, B.b) - Math.max(A.t, B.t));
  const placed = [], OUT = {}, report = [];
  for (const key of keys) { const P = pages[key], { who } = P, with_ = P.S.filter((S) => S.heads[who]);
    if (with_.length < P.S.length * .5) { report.push(`${key.padEnd(10)} ${who.padEnd(7)} ${P.S[0].scene.padEnd(10)} KEPT (speaker not on screen)`); continue; }
    const Hs = with_.map((S) => S.heads[who]); const H = {}; for (const k of ['l', 't', 'r', 'b', 'mx', 'my']) H[k] = med(Hs.map((q) => q[k])); H.ft = med(Hs.map((q) => q.ft !== undefined ? q.ft : q.t));
    if (DBG && DBG.test(key)) console.error('HEAD', JSON.stringify(H), 'FACES', JSON.stringify(P.S[P.S.length >> 1].faces.map((F) => [F.who, Math.round(F.l), Math.round(F.t), Math.round(F.r), Math.round(F.b)])), 'VARS', JSON.stringify(P.vars));
    const dev = Math.max(...Hs.map((q) => Math.hypot(q.mx - H.mx, q.t - H.t))), follow = dev > 30;
    // smoothed head offset over time (follow mode)
    let trk = null; if (follow) { trk = P.S.map((S, i) => { const win = P.S.filter((Q) => Math.abs(Q.t - S.t) <= .25 && Q.heads[who]); if (!win.length) return null;
      return [+S.t.toFixed(2), +(win.reduce((a, Q) => a + Q.heads[who].mx, 0) / win.length - H.mx).toFixed(1), +(win.reduce((a, Q) => a + Q.heads[who].t, 0) / win.length - H.t).toFixed(1)]; }).filter(Boolean); }
    const offAt = (S) => { if (!trk) return [0, 0]; let best = trk[0]; for (const q of trk) if (Math.abs(q[0] - S.t) < Math.abs(best[0] - S.t)) best = q; return [best[1], best[2]]; };
    let best = null; for (const V of P.vars) { const { w, h } = V, n0 = P.vars[0].n;
    const clampC = (cx, cy) => [Math.max(w / 2 + MARGIN, Math.min(1920 - MARGIN - w / 2, cx)), Math.max(h / 2 + MARGIN, Math.min(1080 - MARGIN - h / 2, cy))];
    // the tail for a bubble centred at cx, cy (screen): side, base, tip (relative), length
    const tailOf = (cx, cy) => { const R = { l: cx - w / 2, r: cx + w / 2, t: cy - h / 2, b: cy + h / 2 }, E = 12; let side, base, tip;
      const rx = Math.min((h - 14) / 2, 44);
      if (R.b <= H.t - 8) { side = 'b'; base = [Math.max(R.l + rx + 30, Math.min(R.r - rx - 30, H.mx)), R.b]; const ty = H.t - E, s = (ty - base[1]) / ((H.my - base[1]) || 1); tip = [base[0] + (H.mx - base[0]) * s, ty]; }
      else if (R.l >= H.r - 4) { side = 'l'; base = [R.l, Math.max(R.t + 30, Math.min(R.b - 30, H.my))]; const tx = H.r + E, s = (tx - base[0]) / ((H.mx - base[0]) || 1); tip = [tx, base[1] + (H.my - base[1]) * s]; }
      else if (R.r <= H.l + 4) { side = 'r'; base = [R.r, Math.max(R.t + 30, Math.min(R.b - 30, H.my))]; const tx = H.l - E, s = (tx - base[0]) / ((H.mx - base[0]) || 1); tip = [tx, base[1] + (H.my - base[1]) * s]; }
      else { side = 'b'; base = [Math.max(R.l + rx + 30, Math.min(R.r - rx - 30, H.mx)), R.b]; tip = [base[0], R.b + 24]; }
      let L = Math.hypot(tip[0] - base[0], tip[1] - base[1]); if (L < 22) { const d = [tip[0] - base[0], tip[1] - base[1]], n = L || 1; tip = [base[0] + (L ? d[0] / n : 0) * 22, base[1] + (L ? d[1] / n : (side === 'b' ? 1 : 0)) * 22]; L = 22; }
      if (L > 170) { const s = 170 / L; tip = [base[0] + (tip[0] - base[0]) * s, base[1] + (tip[1] - base[1]) * s]; }   // never a long spike: the cost below keeps it short anyway
      return { side, at: side === 'b' ? base[0] - cx : base[1] - cy, tip: [tip[0] - cx, tip[1] - cy], L, R }; };
    const cands = [], fc = (H.ft + H.b) / 2;
    for (const f of [0, .2, -.2, .36, -.36]) { cands.push(['above' + f, H.mx + f * w, H.t - GAP - h / 2, 0]);
      // 'clear': lifted over every other face in the bubble's column (a buddy standing in front of / beside the speaker); a longer tail
      const l = H.mx + f * w - w / 2 - 10, r = H.mx + f * w + w / 2 + 10; let top = H.t - GAP;
      for (const S of P.S) for (const F of S.faces) if (F.who !== who && F.r > l && F.l < r && F.b > top - 10) top = Math.min(top, F.t - 18);
      if (top < H.t - GAP - 4) cands.push(['clear' + f, H.mx + f * w, top - h / 2, 0]);
      // 'lift': lifted over the faces AND the cards / words / marks in the column (a label sitting just over the speaker's head)
      let bot = H.t - GAP; for (let k = 0; k < 6; k++) { let moved = false;
        for (const S of P.S) for (const F of [...S.faces.filter((q) => q.who !== who), ...S.obs]) if (F.r > l && F.l < r && F.b > bot - h - 10 && F.t < bot + 10) { bot = F.t - 18; moved = true; }
        if (!moved) break; }
      if (bot < top - 4 && bot - h > MARGIN) cands.push(['lift' + f, H.mx + f * w, bot - h / 2, 0]); }
    for (const sd of [1, -1]) { const cx = sd > 0 ? H.r + GAP + w / 2 : H.l - GAP - w / 2; cands.push([sd > 0 ? 'right' : 'left', cx, fc, 25], [sd > 0 ? 'upright' : 'upleft', cx - sd * GAP * .6, H.t - h / 2 + 4, 15]); }
    for (const [nm, cx0, cy0, extra] of cands) { const [cx, cy] = clampC(cx0, cy0), T = tailOf(cx, cy), why = {}; let cost = extra + Math.abs(cx - H.mx) * .02 + Math.max(0, T.L - 40) * 2 + .06 * Math.max(0, T.L - 70) ** 2 + (Math.hypot(cx - cx0, cy - cy0) > 2 ? 10 : 0), worst = 0;
      for (const S of P.S) { const [dx, dy] = offAt(S), R = { l: T.R.l + dx, r: T.R.r + dx, t: T.R.t + dy, b: T.R.b + dy };
        const tb = { l: Math.min(cx + T.tip[0], cx + (T.side === 'b' ? T.at : T.side === 'l' ? -w / 2 : w / 2)) + dx - 6, r: Math.max(cx + T.tip[0], cx + (T.side === 'b' ? T.at : T.side === 'l' ? -w / 2 : w / 2)) + dx + 6, t: Math.min(cy + T.tip[1], cy + (T.side === 'b' ? h / 2 : T.at)) + dy - 6, b: Math.max(cy + T.tip[1], cy + (T.side === 'b' ? h / 2 : T.at)) + dy + 6 };
        let c = 0;
        for (const F of S.faces) { const Fe = { l: F.l - 8, r: F.r + 8, t: F.t - 8, b: F.b + 8 }, a = (Fe.r - Fe.l) * (Fe.b - Fe.t), v = 1e5 * (inter(R, Fe) + inter(tb, F) * .5) / a; c += v; if (DBG && v > 1) why['face ' + F.who] = (why['face ' + F.who] || 0) + v / P.S.length; }
        for (const O of S.obs) { const a = Math.max(200, (O.r - O.l) * (O.b - O.t)), v = 1500 * inter(R, O) / a + inter(R, O) / 400; c += v; if (DBG && v > 1) why['obs ' + O.k + ' ' + Math.round(O.l) + ',' + Math.round(O.t)] = (why['obs ' + O.k + ' ' + Math.round(O.l) + ',' + Math.round(O.t)] || 0) + v / P.S.length; }
        for (const B of S.hats) { if (B.who === who) continue; const v = 3000 * inter(R, B) / ((B.r - B.l) * (B.b - B.t)); c += v; if (DBG && v > 1) why['hat ' + B.who] = (why['hat ' + B.who] || 0) + v / P.S.length; }
        for (const B of S.bodies) { const v = (B.who === who ? BODY_OWN : B.who === 'chilli' ? BODY_CHILLI : BODY) * inter(R, B) / (w * h); c += v; if (DBG && v > 1) why['body ' + B.who] = (why['body ' + B.who] || 0) + v / P.S.length; }
        for (const Q of placed) if (Q.line !== key.split('#')[0] && Q.t0 <= S.t && S.t <= Q.t1) {   // the line's own earlier page fades out under the new one
          const v = 2e4 * inter(R, Q.R) / (w * h); c += v; if (DBG && v > 1) why.bubble = (why.bubble || 0) + v / P.S.length; }
        cost += c / P.S.length; worst = Math.max(worst, c); }
      if (DBG && DBG.test(key)) console.error(key, nm.padEnd(10), Math.round(cx), Math.round(cy), 'cost', cost.toFixed(1), 'tail', Math.round(T.L), JSON.stringify(Object.fromEntries(Object.entries(why).map(([k, v]) => [k, Math.round(v)]))));
      const prev = placed.filter((Q) => Q.line === key.split('#')[0]).pop(); if (prev) cost += .3 * Math.hypot(cx - prev.cx, cy - prev.cy);   // a line's pages stay put if they can
      cost += 25 * Math.max(0, V.n - n0); if (!best || cost < best.cost) best = { nm, cx, cy, T, cost, worst, V }; } }
    const t0 = P.S[0].t, t1 = P.S[P.S.length - 1].t; placed.push({ t0, t1, R: best.T.R, line: key.split('#')[0], cx: best.cx, cy: best.cy });
    OUT[key] = { x: +best.cx.toFixed(1), y: +best.cy.toFixed(1), w: +best.V.w.toFixed(1), h: +best.V.h.toFixed(1), ...(best.V.mw ? { mw: best.V.mw } : {}), side: best.T.side, at: +best.T.at.toFixed(1), tip: best.T.tip.map((v) => +v.toFixed(1)), ...(P.m ? { m: P.m } : {}), ...(trk ? { trk } : {}) };
    report.push(`${key.padEnd(10)} ${who.padEnd(7)} ${P.S[0].scene.padEnd(10)} ${t0.toFixed(1).padStart(6)}-${t1.toFixed(1).padEnd(6)} ${(best.nm + (best.V.mw ? '/w' + best.V.mw : '')).padEnd(15)} at ${Math.round(best.cx)},${Math.round(best.cy)} tail ${best.T.side} ${Math.round(best.T.L)}px moved ${Math.round(Math.hypot(best.cx - med(P.S.map((S) => S.bubs.find((q) => q.key === key).ox)), best.cy - med(P.S.map((S) => S.bubs.find((q) => q.key === key).oy))))}px cost ${best.cost.toFixed(1)}${best.worst > 5000 ? ' WORST ' + Math.round(best.worst) : ''}${follow ? ' follows' : ''}${P.m ? ' matrix' : ''}`); }
  fs.writeFileSync(path.join(dir, `bubplace_p${PART}.js`), `// written by kit/bubble_layout.js (${new Date().toISOString().slice(0, 10)}): every speech bubble page's spot next to its speaker\nwindow.BUBPLACE = ${JSON.stringify(OUT)};\n`);
  console.log(report.join('\n')); console.log(`${keys.length} bubble pages, ${Object.keys(OUT).length} placed next to the speaker -> bubplace_p${PART}.js`); if (errs.length) console.log('PAGE ERRORS', [...new Set(errs)].join(' | ')); })();
