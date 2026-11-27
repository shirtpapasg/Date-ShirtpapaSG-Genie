// face_cover_scan.js <epdir> <part> <a-b> [a-b ...]   (run from explained2/; FPS env, default 5; MIN env = share of a face, default .12)
// P4 EP1 v2 (26 Nov 2026, after the main session found Uncle Lim's two-line bubble over his face): lists every frame where something drawn
// ON TOP of a face covers part of it. Unlike popfix2's overlap.js (buddy sprites over words / cards / buddy faces), the obstacles here are
// EVERYTHING that can hide a face (a buddy sprite only where it is painted): speech bubbles, caption pills, cards and panels (<rect rx> 40..1500 x 30..900 px), words (<text>), comic
// sound words, and the buddy sprites themselves; and the faces are EVERY face: the buddies' (the top 45 % of the trimmed sprite box; back
// views have no face; only the painted pixels count, through the painting's alpha) and the code-drawn characters' (Uncle Lim's head, the snail, Chilli's pot, the YOU chain link; add more in FACEFN).
// Clipped groups count (the split screen's panels), masks / defs do not. Not counted: a buddy's own items (drawn in its sprite group) and
// a face in a dimmed background layer (a full-frame translucent rect drawn between the face and the card: a think card over the scene). One line per (face, obstacle) run, with the largest share covered.
//   NODE_PATH=$(npm root -g) node qa/face_cover_scan.js p4ep01v2 1 0-437 > p4ep01v2/qa/face_cover_scan.txt
const { chromium } = require('playwright'); const path = require('path');
const FACEFN = { limHead: 'uncle lim', limHeadBox: 'uncle lim', snailV2: 'snail', chilliP4v2: 'chilli', x2youLink: 'YOU link' };   // global drawing functions -> face name
(async () => { const [d, P, ...W] = process.argv.slice(2), dir = path.resolve(d), FPS = +(process.env.FPS || 5), MIN = +(process.env.MIN || .12);
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] }); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('file://' + path.join(dir, 'page.html') + '?part=' + P); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  // wrap each code-drawn character so its drawing carries a marker group (no pixels change: the scan only reads the DOM)
  const wrapped = await p.evaluate((F) => Object.entries(F).filter(([fn, nm]) => { const f = window[fn]; if (typeof f !== 'function') return false;
    window[fn] = (...a) => `<g data-qaface="${nm}">${f(...a)}</g>`; return true; }).map(([fn]) => fn), FACEFN);
  // every buddy painting's alpha, so a sprite covers only where it is painted (not its whole box)
  await p.evaluate(async () => { window._QA_A = {}; for (const im of document.querySelectorAll('image[id^="s_"]')) { const src = im.getAttribute('href') || im.getAttribute('xlink:href'); if (!src) continue;
    const I = new Image(); I.src = src; try { await I.decode(); } catch (e) { continue; } const c = document.createElement('canvas'); c.width = I.naturalWidth; c.height = I.naturalHeight; const g = c.getContext('2d'); g.drawImage(I, 0, 0);
    try { window._QA_A[im.id] = { w: +im.getAttribute('width'), h: +im.getAttribute('height'), nw: c.width, nh: c.height, d: g.getImageData(0, 0, c.width, c.height).data }; } catch (e) { } } });
  const hits = [];
  for (const w of W) { const [a, z] = w.split('-').map(Number);
    hits.push(...await p.evaluate(([a, z, FPS, MIN]) => { const out = [];
      const vis = (el) => { let op = 1; for (let e = el; e && e.id !== 'dyn' && e.tagName; e = e.parentNode) { const tn = e.tagName.toLowerCase(); if (['mask', 'clippath', 'defs', 'pattern', 'symbol', 'filter'].includes(tn)) return -1;
          const o = e.getAttribute && e.getAttribute('opacity'); if (o !== null && o !== undefined && o !== '') op *= +o; } return op; };
      const box = (R) => ({ l: R.left, r: R.right, t: R.top, b: R.bottom });
      const inter = (A, B) => Math.max(0, Math.min(A.r, B.r) - Math.max(A.l, B.l)) * Math.max(0, Math.min(A.b, B.b) - Math.max(A.t, B.t));
      const onScreen = (B) => B.r > 0 && B.l < 1920 && B.b > 0 && B.t < 1080;
      for (let f = Math.round(a * FPS); f <= Math.round(z * FPS); f++) { const t = f / FPS; window.render(t); const dyn = document.querySelector('#dyn'); const faces = [], obs = [];
        for (const u of dyn.querySelectorAll('use')) { const hr = u.getAttribute('href') || u.getAttribute('xlink:href') || ''; const m = hr.match(/^#s_(pip|momo|basil)_/); if (!m || vis(u) < .3) continue; const R = u.getBoundingClientRect(); if (R.height < 60) continue;
          const B = { l: R.left + R.width * .1, r: R.right - R.width * .1, t: R.top + R.height * .08, b: R.bottom };
          obs.push({ k: 'buddy', id: m[1], ...B, el: u });
          if (!/_back/.test(hr)) faces.push({ who: m[1], l: B.l, r: B.r, t: B.t, b: B.t + (B.b - B.t) * .45, el: u }); }
        for (const g of dyn.querySelectorAll('[data-qaface]')) { if (vis(g) < .3) continue; const B = box(g.getBoundingClientRect()); if (B.r - B.l < 8 || !onScreen(B)) continue; faces.push({ who: g.getAttribute('data-qaface'), ...B, el: g }); }
        for (const e of dyn.querySelectorAll('text')) { const tx = (e.textContent || '').trim(); if (!tx || vis(e) < .3) continue; const R = e.getBoundingClientRect(); if (R.width < 4) continue; obs.push({ k: 'word', id: tx.slice(0, 40), ...box(R), el: e }); }
        for (const e of dyn.querySelectorAll('rect[rx]')) { if (vis(e) < .3) continue; const fl = e.getAttribute('fill'); if (fl === 'none') continue; const R = e.getBoundingClientRect(); if (R.width < 40 || R.width > 1500 || R.height < 30 || R.height > 900) continue;
          const pt = [e.parentNode, e.parentNode && e.parentNode.parentNode].map((g) => g && g.querySelector && g.querySelector(':scope > text')).find((x) => x);
          obs.push({ k: 'card', id: pt ? '"' + (pt.textContent || '').trim().slice(0, 30) + '"' : `${Math.round(R.left)},${Math.round(R.top)} ${Math.round(R.width)}x${Math.round(R.height)}`, ...box(R), el: e }); }
        // a sprite's alpha at a screen point (through the <use>'s full transform)
        const alphaAt = (u, X, Y) => { const A = window._QA_A[(u.getAttribute('href') || '').slice(1)]; if (!A) return 1; const M = u.getScreenCTM(); if (!M) return 0; const q = new DOMPoint(X, Y).matrixTransform(M.inverse());
          if (q.x < 0 || q.y < 0 || q.x >= A.w || q.y >= A.h) return 0; const i = (Math.floor(q.y * A.nh / A.h) * A.nw + Math.floor(q.x * A.nw / A.w)) * 4 + 3; return A.d[i] / 255; };
        // full-frame dim layers (a think card / side-by-side cards over a darkened scene): a face under one is background, not covered by
        // what is drawn above the dim
        const dims = [...dyn.querySelectorAll('rect')].filter((e) => { if (e.getAttribute('rx')) return false; const R = e.getBoundingClientRect(); const op = vis(e); return R.width >= 1800 && R.height >= 1000 && op >= .15 && op < .95; });
        const dimBetween = (F, o) => dims.some((d) => (F.el.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING) && (d.compareDocumentPosition(o.el) & Node.DOCUMENT_POSITION_FOLLOWING));
        for (const F of faces) { if ((F.r - F.l) * (F.b - F.t) <= 0) continue;
          // the face's sample points: a 9 x 9 grid over its box, kept only where the face itself is painted (sprites)
          const pts = []; for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const X = F.l + (F.r - F.l) * (i + .5) / 9, Y = F.t + (F.b - F.t) * (j + .5) / 9; if (F.el.tagName.toLowerCase() === 'use' && alphaAt(F.el, X, Y) < .5) continue; pts.push([X, Y]); }
          if (pts.length < 6) continue;
          for (const o of obs) { if (o.el === F.el || F.el.contains(o.el) || o.el.contains(F.el)) continue; if (o.k === 'buddy' && o.id === F.who) continue;
            if (F.el.tagName.toLowerCase() === 'use' && F.el.parentNode && F.el.parentNode.contains(o.el)) continue;   // the buddy's own item (badge, clipboard) in its sprite group
            if (dimBetween(F, o)) continue;
            if (!(F.el.compareDocumentPosition(o.el) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;   // the obstacle is drawn after (on top of) the face
            if (!inter(F, o)) continue;
            const cov = pts.filter(([X, Y]) => X >= o.l && X <= o.r && Y >= o.t && Y <= o.b && (o.k !== 'buddy' || alphaAt(o.el, X, Y) >= .5)).length, c = cov / pts.length;
            if (c < MIN) continue; out.push({ t: +t.toFixed(2), sc: window._S.name, who: F.who, k: o.k, id: o.id, c: +c.toFixed(2) }); } } }
      return out; }, [a, z, FPS, MIN])); }
  await b.close();
  const runs = []; const last = {}; for (const h of hits) { const k = `${h.who}|${h.k}|${h.id}|${h.sc}`; const R = last[k]; if (R && h.t - R.z < .5) { R.z = h.t; R.c = Math.max(R.c, h.c); } else runs.push(last[k] = { ...h, a: h.t, z: h.t }); }
  runs.sort((x, y) => x.a - y.a); console.log(`faces wrapped: buddies + ${wrapped.join(', ')}; ${FPS} fps; a face counts as covered at ${Math.round(MIN * 100)} %`);
  for (const R of runs) console.log(`${R.a.toFixed(2)}-${R.z.toFixed(2)} s ${R.sc.padEnd(10)} ${R.who.padEnd(9)} face under ${R.k.padEnd(5)} ${R.id} (${Math.round(R.c * 100)} %)`);
  console.log(runs.length ? `${runs.length} face-cover run(s)` : 'no face covered'); if (errs.length) console.log('PAGE ERRORS', [...new Set(errs)].join(' | ')); })();
