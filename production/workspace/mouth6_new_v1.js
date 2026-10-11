  s.mouth = el("g", {}, s.stage); el("path", {d: "M-330 -40 Q0 -230 330 -40 L330 40 Q0 230 -330 40 Z", fill: "#e5383b", stroke: INK, "stroke-width": 8}, s.mouth);
  const cav = "M-292 -30 Q0 -178 292 -30 L292 30 Q0 178 -292 30 Z";
  const mc = el("clipPath", {id: "mouthclip6"}, $("v").querySelector("defs")); el("path", {d: cav}, mc);
  el("path", {d: cav, fill: "#6a040f"}, s.mouth);
  const inner = el("g", {"clip-path": "url(#mouthclip6)"}, s.mouth);
  el("ellipse", {cx: 0, cy: 70, rx: 190, ry: 60, fill: "#ff758f", stroke: "#c9184a", "stroke-width": 4}, inner);
  s.top = el("g", {}, inner); s.bot = el("g", {}, inner);
  const curve = (x, sgn) => { const u = (x + 292) / 584; return sgn * ((1 - u) * (1 - u) * 30 + 2 * u * (1 - u) * 178 + u * u * 30); };
  const N = 9, W = 62, x0 = -(N - 1) * W / 2;
  [[s.top, -1], [s.bot, 1]].forEach(([grp, sgn]) => {
    el("path", {d: sgn < 0 ? "M-300 -30 Q0 -178 300 -30" : "M-300 30 Q0 178 300 30", stroke: "#ff8fa3", "stroke-width": 64, fill: "none"}, grp);
    for (let i = 0; i < N; i++) { const x = x0 + i * W, edge = curve(x, sgn), len = 40 - Math.abs(i - (N - 1) / 2) * 3, tip = edge - sgn * (len + 16), r = 12;
      const y1 = edge - sgn * 16, y2 = tip; // root under the gum, tip toward the middle of the mouth
      const d = sgn < 0 ? `M${x - W / 2} ${y1} L${x + W / 2} ${y1} L${x + W / 2} ${y2 - r} Q${x + W / 2} ${y2} ${x + W / 2 - r} ${y2} L${x - W / 2 + r} ${y2} Q${x - W / 2} ${y2} ${x - W / 2} ${y2 - r} Z`
                        : `M${x - W / 2} ${y1} L${x + W / 2} ${y1} L${x + W / 2} ${y2 + r} Q${x + W / 2} ${y2} ${x + W / 2 - r} ${y2} L${x - W / 2 + r} ${y2} Q${x - W / 2} ${y2} ${x - W / 2} ${y2 + r} Z`;
      el("path", {d, fill: "#fffdf7", stroke: "#adb5bd", "stroke-width": 3, "stroke-linejoin": "round"}, grp); }
  });
