  // open-mouth model (front view): lips, gums, two rows of teeth on the jaw's curve, throat + uvula, tongue; m.set(open, lift) moves the lower jaw
  window.mouthRig = (p, id) => { const W = 380, m = {g: el("g", {}, p)};
    const q = (x, c) => { const u = (x + W) / (2 * W); return 2 * u * (1 - u) * c; };          // y of the curve M-W 0 Q0 c W 0
    const curve = c => `M${-W} 0 Q0 ${c} ${W} 0`;
    m.lipLo = el("path", {fill: "#d9475a", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, m.g);
    m.cav = el("path", {fill: "#5c0a14"}, m.g);
    const cp = el("clipPath", {id}, $("v").querySelector("defs")); m.cp = el("path", {}, cp);
    const inner = el("g", {"clip-path": `url(#${id})`}, m.g);
    m.throat = el("ellipse", {cx: 0, rx: 120, fill: "#2e050b"}, inner);
    m.uvula = el("path", {d: "M-16 -96 Q-20 -40 0 -34 Q20 -40 16 -96 Z", fill: "#e5737f", stroke: "#a4133c", "stroke-width": 3}, inner);
    m.tongue = el("g", {}, inner); m.tBody = el("path", {fill: "#f28a9d", stroke: "#b5304f", "stroke-width": 5}, m.tongue);
    m.tGroove = el("path", {fill: "none", stroke: "#d0566f", "stroke-width": 5, "stroke-linecap": "round"}, m.tongue);
    m.food = el("g", {}, inner);                                                               // food sits in front of the tongue, behind the teeth
    el("path", {d: curve(-200), fill: "none", stroke: "#f4a3b4", "stroke-width": 58}, inner);
    m.gumLo = el("path", {fill: "none", stroke: "#f4a3b4", "stroke-width": 58}, inner);
    const widths = [62, 56, 50, 44, 38, 32], lens = [56, 52, 50, 42, 36, 30], xs = [];
    let x = 0; widths.forEach((w, i) => { xs.push([x + w / 2, w, lens[i]]); x += w; });
    const teeth = xs.flatMap(([cx, w, l]) => [[cx, w, l], [-cx, w, l]]);
    const tooth = (w, l, up) => { const r = 12, s = up ? 1 : -1;                                // root at y=0 (under the gum), tip at y = s*l
      return `M${-w / 2} ${-s * 30} L${w / 2} ${-s * 30} L${w / 2} ${s * (l - r)} Q${w / 2} ${s * l} ${w / 2 - r} ${s * l} L${-w / 2 + r} ${s * l} Q${-w / 2} ${s * l} ${-w / 2} ${s * (l - r)} Z`; };
    const ang = (x, c) => Math.atan2(-c * x / (W * W), 1) * 180 / Math.PI;                       // slope of the curve at x, in degrees
    teeth.forEach(([tx0, w, l]) => { const e = el("path", {d: tooth(w, l, 1), fill: "#fffdf7", stroke: "#b8bec6", "stroke-width": 3, "stroke-linejoin": "round"}, inner);
      e.setAttribute("transform", `translate(${tx0} ${q(tx0, -200) + 6}) rotate(${ang(tx0, -200)})`); });
    m.lower = teeth.map(([tx0, w, l]) => ({x: tx0, e: el("path", {d: tooth(w, l * .92, 0), fill: "#fffdf7", stroke: "#b8bec6", "stroke-width": 3, "stroke-linejoin": "round"}, inner)}));
    m.lipUp = el("path", {d: `M${-W - 10} 4 Q-200 -175 -40 -150 Q0 -120 40 -150 Q200 -175 ${W + 10} 4 Q0 -205 ${-W - 10} 4 Z`, fill: "#d9475a", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round"}, m.g);
    el("path", {d: `M${-W + 40} -6 Q0 -150 ${W - 40} -6`, fill: "none", stroke: "#f08a9a", "stroke-width": 6, "stroke-linecap": "round", opacity: .8}, m.g);
    m.set = (open, lift = 0) => { const c = 40 + 380 * open, yL = q(0, c);
      const cav = `M${-W} 0 Q0 -200 ${W} 0 Q0 ${c} ${-W} 0 Z`; set(m.cav, "d", cav); set(m.cp, "d", cav);
      set(m.lipLo, "d", `M${-W - 10} 4 Q0 ${c} ${W + 10} 4 Q0 ${c + 120} ${-W - 10} 4 Z`);
      set(m.throat, "cy", (yL - 100) / 2); set(m.throat, "ry", Math.max(10, (yL + 100) / 2 - 20));
      set(m.gumLo, "d", curve(c));
      m.lower.forEach(t => t.e.setAttribute("transform", `translate(${t.x} ${q(t.x, c) - 6}) rotate(${ang(t.x, c)})`));
      const ty = yL - 80, tip = -60 - 60 * lift;                                                   // tongue rests on the lower jaw; lift curls the tip up
      set(m.tBody, "d", `M-250 ${ty + 60} Q-262 ${ty - 50} -130 ${ty - 62} Q0 ${ty + tip} 130 ${ty - 62} Q262 ${ty - 50} 250 ${ty + 60} Z`);
      set(m.tGroove, "d", `M0 ${ty + tip / 2 - 8} Q6 ${ty - 10} 0 ${ty + 40}`); m.tongueTop = ty + tip / 2; return yL; };
    m.set(.5); return m; };
  s.mouth = el("g", {}, s.stage); s.rig = mouthRig(s.mouth, "mouthclip6");
  s.top = el("g", {}, s.mouth); s.bot = el("g", {}, s.mouth);
