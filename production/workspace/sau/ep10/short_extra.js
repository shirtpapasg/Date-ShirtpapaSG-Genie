/* EP10 Shorts only (loaded last; does nothing in the 1920x1080 episode).
   The episode's pictures are drawn for a wide screen; here each one is refitted so that it reads in 1080 x 1920:
   nothing important off the sides, the ground and walls carried on to the top and bottom of the tall frame, wide cards shrunk. */
if (SHORT) {
  if ((CFG.headLines || []).length > 2) $("head").setAttribute("transform", "translate(0 52)");      // a three-line question: keep it clear of the series label
  // a Short says some lines differently: map the cue words the scenes look for onto the Short's own words
  { const cue0 = cue, MAP = {"helpers|don't#2": "don't"}, NEVER = {habit: ["benefits", "less", "richer", "healthier", "less#2"]};
    cue = (name, word, frac) => { const k = name + "|" + word; if (MAP[k] && !has(name, word) && has(name, MAP[k])) return cue0(name, MAP[k], frac);
      if (NEVER[name] && NEVER[name].includes(word) && !has(name, "benefits")) return 1e6; return cue0(name, word, frac); }; }
  const num = (e, a) => +e.getAttribute(a);
  // wrap(node, transform): put everything in node inside one new group
  const wrap = (node, tfm) => { const g = el("g", {transform: tfm}); while (node.firstChild) g.appendChild(node.firstChild); node.appendChild(g); return g; };
  const around = (e, tfm) => { const g = el("g", {transform: tfm}); e.parentNode.insertBefore(g, e); g.appendChild(e); return g; };      // one element inside its own group
  const fitAt = (k, cx = 600, cy = 450) => `translate(600 450) scale(${k}) translate(${-cx} ${-cy})`;
  // deep(root): ground and floors that stopped at the bottom of the wide screen go on to the bottom of the tall one
  const deep = root => root.querySelectorAll("rect").forEach(r => { const y = num(r, "y"), h = num(r, "height"); if (num(r, "width") >= 1900 && y + h > 1030 && y + h < 1310 && h < 1250) set(r, "height", 2400 - y); });
  // big(root): full-screen backdrops still cover the frame after the picture is made smaller
  const big = root => root.querySelectorAll("rect").forEach(r => { if (num(r, "x") === FULL.x && num(r, "width") === FULL.w && num(r, "y") === FULL.y) { set(r, "x", -500); set(r, "width", 2200); set(r, "y", -1300); set(r, "height", 3600); } });
  // a one-line card wider than the frame is shrunk to fit
  const fitCard = (c, y = 905, max = 1130) => { if (!c) return; const t = c.querySelector("text"), w = t.textContent.length * num(t, "font-size") * .56 + 44; if (w > max) around(c, `translate(600 ${y}) scale(${max / w}) translate(-600 ${-y})`); };
  // wide(name, k, cx, cy): undo a narrated scene's wide-screen wrap; show it at scale k with scene point (cx, cy) in the middle of the box
  const wide = (name, k = 1, cx = 600, cy = 450) => { const s = S[name]; if (!s) return; const g = s.stage.querySelector("g[transform^='translate(650 432)']"); if (!g) return;
    g.setAttribute("transform", fitAt(k, cx, cy)); s.fitG = g; deep(g); return s; };

  // twoLine(c, a, b): a long one-line card becomes a two-line card with big words (the same words)
  const twoLine = (c, a, b, fs = 50) => { const r = c.querySelector("rect"), t = c.querySelector("text"), w = Math.max(a.length, b.length) * fs * .53 + 70, h = fs * 2.2 + 44;
    [r, t].forEach(e => e.setAttribute("visibility", "hidden")); const g = el("g", {transform: `translate(0 ${-fs * .6})`}, c);
    el("rect", {x: -w / 2, y: -h / 2, width: w, height: h, rx: 36, fill: r.getAttribute("fill"), stroke: INK, "stroke-width": 4, filter: "url(#sh)"}, g);
    [a, b].forEach((ln, i) => tx(g, {x: 0, y: (i - .5) * fs * 1.14 + fs * .34, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: "#fff"}, ln)); };

  /* ---------------- the first-person shots ---------------- */
  ["povGrasshopper", "povDecompose", "povCompost", "povSpread", "povRoot", "povEaten"].forEach(n => { if (S[n]) deep(S[n].stage); });
  if (S.povGrasshopper) twoLine(S.povGrasshopper.c, "You are a tiny bit of nutrient,", "inside a dead grasshopper");
  if (S.povDecompose) twoLine(S.povDecompose.c, "Decomposers break it down…", "you're back in the soil!");
  if (S.povCompost) twoLine(S.povCompost.c, "Into the compost bin,", "with leaves and food scraps");
  // under the ground: the dark top of the soil goes on up to the top of the frame
  if (S.povRoot) S.povRoot.cam.querySelectorAll(":scope > rect").forEach(r => { if (num(r, "y") === -400 && num(r, "height") === 380) { set(r, "y", -1500); set(r, "height", 1480); } });
  // the school garden: the whole scene a little smaller, so that the pupil, the grasshopper and "eww!" stay in the frame; soil below
  if (S.gardenFind) { const s = S.gardenFind; el("rect", {x: -900, y: 1034, width: 3600, height: 1800, fill: "#a9744a"}, s.G); const g = wrap(s.stage, fitAt(.8)), run = s.run; big(g);
    // it opens closer on the pupil walking in, and the ground sits lower in the tall frame
    s.run = t => { run(t); const kz = ramp(t - SC.gardenFind.t0, 1.7, 3.1); tf(g, fitAt(lerp(1.12, .8, kz), lerp(560, 600, kz), lerp(640, 350, kz))); }; }
  // the decomposers: the labels at the right come into the frame
  if (S.povDecompose) { const s = S.povDecompose; around(s.lb, "translate(-290 0)"); around(s.l3, "translate(-315 -84)"); }
  // inside the compost bin: the whole bin in view, with us in the middle; its walls run to the top and bottom of the frame
  if (S.povCompost) { const s = S.povCompost, bn = s.bin, run = s.run;
    wrap(s.B, "translate(600 450) scale(.82) translate(-810 -600)");
    bn.querySelectorAll(":scope > rect").forEach(r => { const w = num(r, "width"), h = num(r, "height");
      if (w === 1320 && h === 1120) { set(r, "y", -760); set(r, "height", 2800); } else if (w === 1320 && h === 150) { set(r, "y", -760); set(r, "height", 420); } else if (w === 340) { set(r, "y", -780); set(r, "height", 2840); } });
    bn.querySelectorAll(":scope > line").forEach(l => { set(l, "y1", -760); set(l, "y2", 2040); });
    [[bn.fresh, "#5c3d2e"], [bn.done, "#2a170d"]].forEach(([g, fill]) => g.insertBefore(el("rect", {x: 150, y: 1030, width: 1320, height: 1010, fill}), g.firstChild.nextSibling));
    // things that fall in are hidden until they start to fall (their start is no longer off the top of the screen)
    s.run = t => { run(t); const u = t - SC.povCompost.t0; bn.leaves.forEach((o, i) => op(o.e, u > 2.15 + i * .04 ? 1 : 0)); bn.peels.forEach((o, i) => op(o.e, u > 2.9 + i * .2 ? 1 : 0)); op(s.meG, u > 2.2 ? 1 : 0); }; }

  /* ---------------- the recap board: a tall ring that fills the frame, with bigger pictures and words ---------------- */
  if (S.recap) { const s = wide("recap"), st = s.fitG, N = 7, CX = 600, CY = 525, RX = 425, RY = 385, P = [];
    for (let i = 0; i < N; i++) { const an = -Math.PI / 2 + i * 2 * Math.PI / N; P.push([CX + RX * Math.cos(an), CY + RY * Math.sin(an)]); }
    s.arr.forEach(g => g.remove()); s.arr = qRing(st, P, CX, CY, 132, .16); s.arr.forEach(g => st.insertBefore(g, s.it[0]));
    set(s.title, "x", 600); set(s.title, "y", -66); set(s.title, "font-size", 46);
    [...s.mid.children].forEach((e, i) => { set(e, "x", CX); set(e, "y", CY - 6 + i * 62); set(e, "font-size", 56); });
    s.it.forEach((g, i) => { tf(g.d, "scale(.9)"); const [bx, by] = i === 1 ? [-84, 84] : i === 2 ? [84, 84] : [-84, -84], c = g.children[1], n = g.children[2];
      set(c, "cx", bx); set(c, "cy", by); set(c, "r", 28); set(n, "x", bx); set(n, "y", by + 13); set(n, "font-size", 38);
      set(g.n, "font-size", 38); set(g.n, "y", i === 1 || i === 6 ? -128 : 154); if (i === 5) set(g.n, "x", -40); });
    // the answer to the Short's question: the chye sim from the garden bed
    s.veg = el("g", {}, st); tf(qVeg(s.veg), "translate(0 100) scale(1.2)"); tx(s.veg, {x: 0, y: 176, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#2d6a4f"}, "your vegetables!");
    s.run = t => { const a = (w, f) => cue("recap", w, f), t0 = SC.recap.t0, T = [a("inside", .17), a("decomposers", .27), a("soil", .39), a("raked", .45), a("spread", .62), a("roots", .75), a("grasshopper#2", .82)], tBk = a("back", .95);
      const tV = has("recap", "vegetables") ? cue("recap", "vegetables", 0) - .5 : 1e6, kV = ramp(t, tV, tV + .3);
      op(s.title, ramp(t, t0 - .1, t0 + .3)); op(s.mid, ramp(t, T[0], T[0] + .4) * (1 - kV)); tf(s.veg, `translate(${CX} ${CY}) scale(${Math.max(0, pop(t, tV + .1))})`); op(s.veg, kV);
      s.it.forEach((g, i) => { const now = on(t, T[i] - .1, (i < N - 1 ? T[i + 1] : tBk) - .1, .2) + (i === 0 ? ramp(t, tBk, tBk + .3) : 0) + (i === 5 ? on(t, tV, 1e9, .3) : 0); tf(g, `translate(${P[i][0]} ${P[i][1]}) scale(${1 + .1 * Math.min(1, now)})`); op(g, t >= T[i] - .1 ? 1 : .22); });
      s.arr.forEach((g, i) => { const tt = i < N - 1 ? T[i + 1] : tBk; op(g, t >= tt - .5 ? 1 : .18); g.lit(ramp(t, tt - .5, tt)); });
      let x = P[0][0], y = P[0][1]; for (let i = 0; i < N; i++) { const tt = i < N - 1 ? T[i + 1] : tBk, k = ease((t - tt + .5) / .5); if (k > 0) { const b = P[(i + 1) % N]; x = lerp(P[i][0], b[0], k); y = lerp(P[i][1], b[1], k) - 50 * Math.sin(Math.PI * k); } }
      tf(s.me, `translate(${x + 82} ${y - 82}) scale(${1.25 * Math.max(0, pop(t, T[0] - .2))})`); s.me.blink(t); }; }

  /* ---------------- the little helpers: three and two, big; the leaf row below ---------------- */
  if (S.helpers) { const s = wide("helpers"), run = s.run, XY = [[220, 70], [600, 70], [980, 70], [410, 405], [790, 405]], K = 1.3;
    s.band.querySelector("path").setAttribute("d", "M98 -58 V-82 H1102 V-58");
    const G2 = el("g", {transform: "translate(600 815) scale(1.1) translate(-583 -660)"}, s.A); [...s.r2, s.nib, s.nib2, s.a1, s.a2, s.b2, s.fin].forEach(e => G2.appendChild(e));
    around(s.lv, "translate(600 250) scale(.8) translate(-520 -250)");
    s.B.querySelectorAll(":scope > rect").forEach((r, i) => { set(r, "y", i ? 640 : -900); set(r, "height", i ? 1500 : 1560); });
    s.run = t => { run(t); const a = (w, f) => cue("helpers", w, f), t0 = SC.helpers.t0, T = [a("ants", .13), a("flies", .15), a("earthworms", .2), a("millipedes", .25), a("woodlice", .29)], tDt = a("detritivores", .45);
      qPop(s.h, 600, -128, t, t0 - .2); op(s.h, on(t, t0 - .2, tDt - .2, .2));
      s.it.forEach((g, i) => qPop(g, XY[i][0], XY[i][1], t, T[i] - .12, K * (1 + .1 * on(t, T[i] - .1, T[i] + .5, .15))));
      qPop(s.dt, 600, -128, t, tDt - .15); }; }

  /* ---------------- Pulau Semakau: the map as a card with the whole main island in it; the "how full" bar above the map ---------------- */
  if (S.semakau) { const s = wide("semakau", .96); deep(s.A); s.A.setAttribute("transform", "translate(600 700) scale(.9) translate(-700 -700)");
    s.C.querySelector("rect").setAttribute("y", -900); s.C.querySelector("rect").setAttribute("height", 2700);
    set(s.tl, "x", num(s.tl, "x") + 62); around(s.bar, "translate(-250 -215)"); }

  /* ---------------- the kitchen: the peel container in the middle; the Short stops before the list of benefits ---------------- */
  if (S.habit) { const s = wide("habit", 1, 560, 450); around(s.h, "translate(-240 -6)"); fitCard(s.kc, 150, 1080);
    s.A.querySelectorAll(":scope > rect").forEach(r => { if (num(r, "y") === 650) set(r, "height", 1300); if (num(r, "y") === -200 && num(r, "height") === 1300) { set(r, "y", -900); set(r, "height", 2700); } }); }
}
