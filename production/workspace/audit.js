// Text layout audit: steps through an episode page and reports text that leaves its box, leaves the frame,
// collides with other text, or sits under the captions / keyword shelf. usage: node audit.js page.html out.json
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [file, out] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + file); await p.waitForFunction(() => window.READY === true);
  const END = await p.evaluate(() => TL.END); const hits = [];
  for (let t = 0.3; t < END - 0.3; t += 0.25) {
    const r = await p.evaluate(t => { window.render(t);
      const eff = e => { let o = 1; for (let n = e; n && n.tagName !== 'svg'; n = n.parentNode) { const a = n.getAttribute && n.getAttribute('opacity'); if (a !== null && a !== undefined && a !== '') o *= +a; if (n.hidden) o = 0; } return o; };
      const name = e => (e.textContent || '').trim().slice(0, 40);
      const inCaps = e => !!e.closest('#caps'), inKW = e => !!e.closest('#kwFly'), inTag = e => !!e.closest('#tag') || !!e.closest('#shelf');
      const T = [...document.querySelectorAll('#v text')].map(e => ({e, o: eff(e), r: e.getBoundingClientRect()})).filter(x => x.o > .35 && x.r.width > 2 && (x.e.textContent || '').trim());
      const iss = [];
      const inter = (a, c) => Math.max(0, Math.min(a.right, c.right) - Math.max(a.left, c.left)) * Math.max(0, Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top));
      for (const x of T) { const R = x.r;
        if (R.left < -2 || R.right > 1922 || R.top < -2 || R.bottom > 1082) iss.push(['offscreen', name(x.e), '']);
        const box = x.e.parentNode.querySelector(':scope > rect');
        if (box && eff(box) > .35) { const B = box.getBoundingClientRect(), cx = (R.left + R.right) / 2, cy = (R.top + R.bottom) / 2;
          if (cx > B.left && cx < B.right && cy > B.top && cy < B.bottom && (R.left < B.left - 3 || R.right > B.right + 3 || R.top < B.top - 6 || R.bottom > B.bottom + 6)) iss.push(['out-of-box', name(x.e), '']); } }
      const caps = [...document.querySelectorAll('#caps > g')].filter(g => eff(g) > .35).map(g => g.querySelector('rect').getBoundingClientRect());
      const shelf = [...document.querySelectorAll('#kwFly > g')].filter(g => eff(g) > .35).map(g => g.getBoundingClientRect());
      for (const x of T) { if (inCaps(x.e) || inKW(x.e)) continue;
        for (const c of caps) if (inter(x.r, c) > 0.15 * x.r.width * x.r.height) iss.push(['under-caption', name(x.e), '']);
        if (!inTag(x.e)) for (const s of shelf) if (inter(x.r, s) > 0.15 * Math.min(x.r.width * x.r.height, s.width * s.height)) iss.push(['under-keyword', name(x.e), '']); }
      // words partly covering a drawing (a panel that fully holds the words is fine)
      const words = T.filter(x => !x.e.classList.contains('emo') && /[A-Za-z0-9]/.test(x.e.textContent) && !inCaps(x.e) && !inKW(x.e) && !inTag(x.e));
      if (words.length) { const shapes = [...document.querySelectorAll('#scenes path, #scenes rect, #scenes circle, #scenes ellipse, #scenes polygon, #scenes line, #confetti rect')]
          .filter(e => { const f = e.getAttribute('fill'), st = e.getAttribute('stroke'); return !(f === 'none' && (!st || st === 'none')) && !e.closest('clipPath') && !e.closest('defs'); })
          .map(e => ({e, r: e.getBoundingClientRect()})).filter(x => x.r.width < 1900 && x.r.width * x.r.height > 300);
        for (const w of words) { const R = w.r, area = R.width * R.height, own = w.e.parentNode;
          for (const sh of shapes) { if (sh.e.parentNode === own) continue; const A = inter(R, sh.r); if (A < 0.12 * area) continue;
            if (sh.r.left <= R.left + 2 && sh.r.right >= R.right - 2 && sh.r.top <= R.top + 2 && sh.r.bottom >= R.bottom - 2) continue;
            if (eff(sh.e) < .35) continue; iss.push(['text-on-drawing', name(w.e), sh.e.tagName + ':' + (sh.e.getAttribute('fill') || '')]); break; } } }
      for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) { const a = T[i], c = T[j];
        if (inCaps(a.e) || inCaps(c.e) || a.e.parentNode === c.e.parentNode) continue;
        const A = inter(a.r, c.r), m = Math.min(a.r.width * a.r.height, c.r.width * c.r.height);
        if (A > 0.2 * m) iss.push(['text-overlap', name(a.e), name(c.e)]); }
      return iss; }, t);
    r.forEach(i => hits.push([...i, +t.toFixed(2)])); }
  // merge into time ranges, keep problems lasting >= 0.5 s
  const m = {}; hits.forEach(([k, a, c, t]) => { const key = k + '|' + a + '|' + c; (m[key] = m[key] || []).push(t); });
  const res = []; for (const key in m) { const ts = m[key]; let s = ts[0], prev = ts[0];
    for (const t of ts.slice(1).concat([1e9])) { if (t - prev > .3) { if (prev - s >= .45) res.push({kind: key.split('|')[0], text: key.split('|')[1], other: key.split('|')[2], from: s, to: prev}); s = t; } prev = t; } }
  res.sort((a, c) => a.from - c.from); fs.writeFileSync(out, JSON.stringify(res, null, 1)); console.log(file.split('/').pop(), res.length, 'issues');
  await b.close(); })();
