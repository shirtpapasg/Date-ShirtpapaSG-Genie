function drawPlant(p, opts = {}) {
  const K = {}; const g = el("g", {}, p); K.g = g;
  const qb = (a, c, b, u) => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * c[1] + u * u * b[1]];
  const qd = (a, c, b) => `M${a[0]} ${a[1]} Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`;
  // ---- roots: three main roots, every side root grows out of one of them
  const O = [760, 596], mains = [[[728, 700], [612, 858]], [[770, 745], [758, 892]], [[798, 700], [948, 848]]];
  const side = [[0, .38, [-70, -20], [-20, 10]], [0, .68, [-60, 30], [-30, 40]], [1, .45, [-55, 25], [-20, 30]], [1, .62, [60, 20], [30, 30]], [2, .38, [75, -18], [20, 10]], [2, .68, [-20, 60], [-14, 30]]];
  const rootD = [], fine = [], tips = mains.map(m => m[1]);
  mains.forEach(([c, e]) => rootD.push(qd(O, c, e)));
  side.forEach(([mi, u, d, cOff]) => { const [c, e] = mains[mi], s0 = qb(O, c, e, u), e2 = [s0[0] + d[0], s0[1] + d[1]];
    fine.push(qd(s0, [s0[0] + d[0] * .5 + cOff[0], s0[1] + d[1] * .5 + cOff[1]], e2)); tips.push(e2); });
  const hairs = []; [...mains.map(([c, e]) => [O, c, e])].forEach(([a, c, e]) => [.8, .9].forEach(u => { const q = qb(a, c, e, u); hairs.push(`M${q[0]} ${q[1]} l${(q[0] < 760 ? -1 : 1) * 16} 10 M${q[0]} ${q[1]} l${(q[0] < 760 ? 1 : -1) * 12} 14`); }));
  K.tips = tips;
  K.rootsGlow = el("path", {d: rootD.concat(fine).join(" "), stroke: "#ffe14d", "stroke-width": 40, fill: "none", "stroke-linecap": "round", opacity: 0}, g);
  el("path", {d: rootD.join(" "), stroke: INK, "stroke-width": 24, fill: "none", "stroke-linecap": "round"}, g);
  el("path", {d: fine.join(" "), stroke: INK, "stroke-width": 15, fill: "none", "stroke-linecap": "round"}, g);
  el("path", {d: hairs.join(" "), stroke: INK, "stroke-width": 7, fill: "none", "stroke-linecap": "round"}, g);
  K.roots = el("path", {d: rootD.join(" "), stroke: "#fbe7c6", "stroke-width": 16, fill: "none", "stroke-linecap": "round"}, g);
  el("path", {d: fine.join(" "), stroke: "#fbe7c6", "stroke-width": 8, fill: "none", "stroke-linecap": "round"}, g);
  el("path", {d: hairs.join(" "), stroke: "#fbe7c6", "stroke-width": 3, fill: "none", "stroke-linecap": "round"}, g);
  // ---- stem: one tapered piece that flows into the roots
  K.top = el("g", {}, g);
  const S0 = [760, 610], SC_ = [750, 400], S1 = [760, 180];
  const sAt = u => qb(S0, SC_, S1, u), half = u => lerp(17, 7, u);
  K.sx = y => { let u = clamp((610 - y) / 430); return sAt(u)[0]; };
  const L = [], R = []; for (let i = 0; i <= 20; i++) { const u = i / 20, q = sAt(u); L.push(`${(q[0] - half(u)).toFixed(1)} ${q[1].toFixed(1)}`); R.unshift(`${(q[0] + half(u)).toFixed(1)} ${q[1].toFixed(1)}`); }
  const stemD = `M${L.join(" L")} Q760 166 ${R.join(" L")} Z`;
  K.stemGlow = el("path", {d: qd(S0, SC_, S1), stroke: "#ffe14d", "stroke-width": 56, fill: "none", "stroke-linecap": "round", opacity: 0}, K.top);
  // ---- leaves on short stalks, in matching pairs angled upward, plus a bud on top
  K.leaves = []; K.leafGlow = [];
  const leafAt = (u, sd, len, w, ang) => { const q = sAt(u), x = q[0] + sd * (half(u) - 3), y = q[1];
    const lg = el("g", {transform: `translate(${x} ${y}) rotate(${sd < 0 ? 180 + ang : -ang})`}, K.top);
    el("path", {d: "M0 0 Q18 -5 34 0", stroke: INK, "stroke-width": 14, fill: "none", "stroke-linecap": "round"}, lg);
    el("path", {d: "M0 0 Q18 -5 34 0", stroke: "#52b788", "stroke-width": 8, fill: "none", "stroke-linecap": "round"}, lg);
    const lf = el("g", {transform: "translate(30 0)"}, lg);
    const glow = el("path", {d: leafPath(len, w + 10), fill: "#ffe14d", opacity: 0, transform: "scale(1.08)"}, lf);
    el("path", {d: leafPath(len, w), fill: "#2dc653", stroke: INK, "stroke-width": 5}, lf);
    el("path", {d: `M0 0 L${len - 12} 0`, stroke: "#b7efc5", "stroke-width": 4}, lf);
    for (let i = 1; i < 4; i++) el("path", {d: `M${len * i / 4} 0 L${len * i / 4 + 24} ${-w * .42} M${len * i / 4} 0 L${len * i / 4 + 24} ${w * .42}`, stroke: "#b7efc5", "stroke-width": 3}, lf);
    K.leaves.push(lg); K.leafGlow.push(glow); return {x, y}; };
  [[.32, 200, 66, 22], [.55, 180, 60, 32], [.76, 150, 52, 42], [.92, 108, 40, 55]].forEach(([u, len, w, ang]) => { leafAt(u, -1, len, w, ang); leafAt(u, 1, len, w, ang); });
  el("path", {d: stemD, fill: "#52b788", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, K.top);
  el("path", {d: qd([766, 600], [757, 400], [762, 200]), stroke: "#95d5b2", "stroke-width": 5, fill: "none", "stroke-linecap": "round", opacity: .8}, K.top);
  const bud = el("g", {transform: `translate(${sAt(1)[0]} 178) rotate(-90)`}, K.top);
  const bg_ = el("path", {d: leafPath(64, 26 + 10), fill: "#ffe14d", opacity: 0, transform: "scale(1.08)"}, bud);
  el("path", {d: leafPath(64, 26), fill: "#2dc653", stroke: INK, "stroke-width": 5}, bud); K.leaves.push(bud); K.leafGlow.push(bg_);
  // point on the 2nd right leaf where made food starts its trip down
  const q = sAt(.55), a = 32 * Math.PI / 180; K.foodFrom = [q[0] + 14 + 120 * Math.cos(a), q[1] - 120 * Math.sin(a)];
  return K;
}
