// buddy_flicker_scan.js <epdir> <part> [t0=0] [t1=END] [fps=30]   (teacher, 2026-11-25, on EP26 Part 2 at 0:10: "issues with pet buddies
//   popping out and gone. Some episodes also have this issue for starting pet buddies scene"; SERIES_FORMAT 6, "buddies arrive once")
//   NODE_PATH=$(npm root -g) node qa/buddy_flicker_scan.js ep26 2          -> the whole part: one line per flicker, exit 1 when any
//   NODE_PATH=$(npm root -g) node qa/buddy_flicker_scan.js ep26 2 0 30     -> the first 30 s only (the first buddy scene after the cold open)
// Probes the render (page.html, window.render(t)) at fps samples a second (30 = every frame: a one-frame blink shows) and tracks where each buddy (pip, momo, basil) stands on
// screen: its largest sprite (<use href="#s_<who>_...">) at least MINH (60) px tall, on screen, not inside a clip-path or mask (cards and
// round face frames are skipped) and not faded below 4 %. From those presence runs it lists:
//   POP   a buddy on screen for less than POP_S (2.5 s) that then disappears (pops in, pops out) while the part goes on;
//   GONE  a buddy that disappears and is back within GAP_S (2 s): "moved" when it comes back at a clearly different screen place
//         (more than 120 px and 40 % of its height away), "back" when it pops back where it was; the line names the scene change.
//         When the gap covers a whole scene with no buddy at all (a ROUND card, a title card), it is a chapter break, listed as CARD
//         and not counted;
//   JUMP  a buddy that is on screen in two consecutive samples but has moved more than 220 px and 60 % of its height (a teleport,
//         e.g. a buddy drawn in screen space while the camera pans, or a hard cut that redraws it elsewhere); "cut" when the samples
//         straddle a scene change (only flagged when the buddy then stays under POP_S or the cut is inside 3 s of a GONE/POP).
// Lines name the scenes and the 10 s render chunks to re-render (msplice spans). Env: POP_S, GAP_S, MINH, OUT=file.json (raw runs).
// A buddy that walks or glides off the frame edge counts as gone too: look at the stills of every flagged time before changing code.
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => {
  const [dir0, P, a0, a1, fps0] = process.argv.slice(2), dir = path.resolve(dir0), TL = JSON.parse(fs.readFileSync(path.join(dir, `tl_p${P}.json`)));
  const FPS = +(fps0 || 30), T0 = +(a0 || 0), T1 = Math.min(TL.END, a1 === undefined || a1 === 'end' ? TL.END : +a1);
  const POP_S = +(process.env.POP_S || 2.5), GAP_S = +(process.env.GAP_S || 2), MINH = +(process.env.MINH || 60);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.join(dir, 'page.html') + '?part=' + P); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  const N0 = Math.round(T0 * FPS), N1 = Math.floor((T1 - .001) * FPS), S = [];
  for (let f = N0; f <= N1; f += 300) {
    S.push(...await p.evaluate(([f0, f1, FPS, MINH]) => { const out = [];
      for (let f = f0; f <= f1; f++) { const t = f / FPS; window.render(t); const pos = {};
        for (const u of document.querySelectorAll('#dyn use')) { const m = (u.getAttribute('href') || '').match(/^#s_(pip|momo|basil)_/); if (!m) continue;
          let op = 1, el = u, skip = false; while (el && el.id !== 'dyn') { const tn = el.tagName.toLowerCase(); if (['mask', 'clippath', 'defs', 'pattern', 'symbol'].includes(tn) || (el.getAttribute && (el.getAttribute('clip-path') || el.getAttribute('mask')))) { skip = true; break; }
            const a = el.getAttribute && el.getAttribute('opacity'); if (a !== null && a !== undefined) op *= +a; const so = el.style && el.style.opacity; if (so) op *= +so; el = el.parentNode; }
          if (skip || op < .04) continue; const r = u.getBoundingClientRect(); const w = Math.min(r.right, 1920) - Math.max(r.left, 0), hh = Math.min(r.bottom, 1080) - Math.max(r.top, 0);
          if (w <= 0 || hh <= 0 || w * hh < 1500 || r.height < MINH) continue; const c = { x: Math.round(r.left + r.width / 2), y: Math.round(r.bottom), h: Math.round(r.height) };
          if (!pos[m[1]] || c.h > pos[m[1]].h) pos[m[1]] = c; }
        out.push({ t: +t.toFixed(3), sc: window._S.name, pos }); }
      return out; }, [f, Math.min(N1, f + 299), FPS, MINH]));
  }
  await b.close();
  const sceneAt = (t) => { let s = TL.scenes[0]; for (const x of TL.scenes) if (t >= x.t0) s = x; return s; };
  const chunk = (a, z) => { const e = Math.ceil((z + .001) / 10) * 10; return `${Math.floor(a / 10) * 10} ${e >= TL.END ? 'end' : e}`; };
  const flags = [], runs = {};
  for (const who of ['pip', 'momo', 'basil']) { const R = []; let cur = null;
    for (const s of S) { const q = s.pos[who]; if (q) { if (!cur) R.push(cur = { a: s.t, z: s.t, first: q, last: q, sa: s.sc, sz: s.sc }); else { cur.z = s.t; cur.last = q; cur.sz = s.sc; } } else cur = null; }
    runs[who] = R;
    for (let i = 0; i < R.length; i++) { const r = R[i], len = r.z - r.a + 1 / FPS;
      if (len < POP_S && r.z < T1 - 1 / FPS - .01 && r.z < TL.END - .5) flags.push({ who, kind: 'POP', t: r.a, z: r.z, txt: `${who} on screen only ${len.toFixed(2)} s (${r.a.toFixed(2)}-${r.z.toFixed(2)} s, ${r.sa}${r.sz !== r.sa ? '>' + r.sz : ''}) then gone` });
      if (i > 0) { const g = R[i - 1], gap = r.a - g.z - 1 / FPS;
        if (gap < GAP_S) { const d = Math.hypot(r.first.x - g.last.x, r.first.y - g.last.y), moved = d > 120 && d > .4 * Math.max(r.first.h, g.last.h), sc0 = sceneAt(g.z).name, sc1 = sceneAt(r.a).name;
          const card = TL.scenes.some((x) => x.t0 >= g.z && x.t1 <= r.a + 1 / FPS && !S.some((q) => q.t >= x.t0 && q.t < x.t1 && Object.keys(q.pos).length));
          flags.push({ who, kind: card ? 'CARD' : 'GONE', t: g.z, z: r.a, txt: `${who} gone ${gap.toFixed(2)} s (${(g.z + 1 / FPS).toFixed(2)}-${r.a.toFixed(2)} s${sc0 !== sc1 ? ', ' + sc0 + '>' + sc1 : ', in ' + sc0}) then back ${moved ? 'at another place (' + Math.round(d) + ' px away)' : 'where it was'}` }); } } }
    for (let i = 1; i < S.length; i++) { const a = S[i - 1].pos[who], c = S[i].pos[who]; if (!a || !c || Math.abs(S[i].t - S[i - 1].t - 1 / FPS) > .01) continue;
      const d = Math.hypot(c.x - a.x, c.y - a.y); if (d > 220 && d > .6 * Math.max(a.h, c.h)) { const cut = S[i].sc !== S[i - 1].sc;
        flags.push({ who, kind: 'JUMP', cut, t: S[i - 1].t, z: S[i].t, txt: `${who} jumps ${Math.round(d)} px at ${S[i].t.toFixed(2)} s (${cut ? 'cut ' + S[i - 1].sc + '>' + S[i].sc : 'in ' + S[i].sc})` }); } } }
  // a jump on a hard cut is ordinary editing unless the buddy is flickering around it
  const keep = flags.filter(f => f.kind !== 'JUMP' || !f.cut || flags.some(g => g.kind !== 'JUMP' && g.kind !== 'CARD' && Math.abs(g.t - f.t) < 3)).sort((x, y) => x.t - y.t), bad = keep.filter((f) => f.kind !== 'CARD');
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify({ dir, P, T0, T1, FPS, errs: [...new Set(errs)], runs, flags: keep, samples: S }));
  if (errs.length) console.log('PAGE ERRORS', [...new Set(errs)].join(' | '));
  console.log(`${path.basename(dir)} P${P} ${T0.toFixed(1)}-${T1.toFixed(1)} s at ${FPS} fps: ` + ['pip', 'momo', 'basil'].map(w => `${w} ${runs[w].length} run(s)`).join(', '));
  for (const f of keep) console.log(`${f.kind.padEnd(4)} ${f.t.toFixed(2).padStart(7)} s  ${f.txt}   [chunk ${chunk(f.t, f.z)}]`);
  console.log(bad.length ? `${bad.length} buddy flicker(s)` : 'no buddy flicker');
  process.exitCode = bad.length ? 1 : 0;
})();
