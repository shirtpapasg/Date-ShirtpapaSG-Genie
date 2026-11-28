/* ep11/short_extra.js: Short-only scenes and the vertical-frame fixes for EP11's Shorts (loaded last, after pov.js).
   S.s1end (Short 1's close): "A hundred billion switches. Drawn with light and shadow." on a chip whose switches light up as a
   beam of light sweeps across, then the question (CFG.ask) over the mask, then "Watch the full episode". */
S.s1end = (() => { const s = scene("s1end", "#10002b", "#3c096c"), st = s.stage;
  s.die = el("g", {}, st); kDie(s.die, 300, 380);
  s.tiles = el("g", {}, st); s.T = []; for (let i = 0; i < 14; i++) for (let j = 0; j < 10; j++) { const g = kTile(s.tiles, 50); tf(g, `translate(${280 + i * 50} ${230 + j * 50})`); g.i = i; g.j = j; s.T.push(g); }
  s.beam = el("rect", {x: 0, y: 200, width: 60, height: 520, fill: "#fffbe0", opacity: .85}, st);
  s.r1 = chip(st, "100 billion+ switches", "#7209b7", {fs: 46}); s.r2 = chip(st, "drawn with light and shadow ✨", "#3a0ca3", {fs: 42});
  s.q = el("g", {}, st); el("rect", kA({x: -470, y: -130, width: 940, height: 260, rx: 40, fill: "#fff", "stroke-width": 8}), s.q);
  const qt = (CFG.ask || "").split(" "), h = Math.ceil(qt.length / 2);
  [qt.slice(0, h).join(" "), qt.slice(h).join(" ")].forEach((ln, i) => tx(s.q, {x: 0, y: -18 + i * 74, "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: INK}, ln));
  s.qm = emo(st, 600, 0, 150, "🤔");
  s.w = chip(st, "▶ Watch the full episode!", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("s1end", w, f), t0 = SC.s1end.t0, tD = a("drawn", .2), tQ = a("what", .5), tW = a("watch", .85);
    const kQ = ramp(t, tQ - .3, tQ); tf(s.die, `translate(600 460) scale(${Math.max(0, pop(t, t0 - .2)) * (1 - ramp(t, t0 + .6, t0 + 1))})`);
    op(s.tiles, ramp(t, t0 + .6, t0 + 1) * (1 - kQ)); const bx = lerp(260, 980, ramp(t, tD - .2, tD + 1.6));
    s.T.forEach(g => set(g.r, "fill", 280 + g.i * 50 < bx ? (kHash(g.i, g.j) > .45 ? "#ffd60a" : "#7b2cbf") : "#22223b")); set(s.beam, "x", bx - 30); op(s.beam, on(t, tD - .2, tD + 1.8, .2) * (1 - kQ));
    kPop(s.r1, 600, 120, t, t0); op(s.r1, 1 - kQ); kPop(s.r2, 600, 800, t, tD); op(s.r2, 1 - kQ);
    kPop(s.q, 600, 420, t, tQ - .1); tf(s.qm, `translate(600 150) scale(${Math.max(0, pop(t, tQ + .3)) * (1 + .06 * Math.sin(t * 5))}) translate(-600 0)`); op(s.qm, ramp(t, tQ + .2, tQ + .4));
    kPop(s.w, 600, 720, t, tW - .1); };
  return s; })();
// the vertical frame: the light-and-shadow diagram is wider than the frame (torch on the left, labels on the right): shrink it to fit
if (SHORT && S.shadow) set(S.shadow.stage, "transform", "translate(44 610) scale(.79)");
