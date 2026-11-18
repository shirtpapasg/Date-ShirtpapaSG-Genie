/* TheOneApp, Explored EP06: Where does your food go? (P4, the digestive system). Load after common.js and geo_map.js.
   Narrated scenes: hook, answer, news, recap, textbook, fibre, try, think, close. The picture-only shots are in ep06/pov.js.
   Scenes draw in a 1200 x 900 box; times come from cue(scene, word, fallback).
   Rule 9: the diagram follows the real order and position of the organs (seen from the front: the stomach is on the viewer's right,
   the large intestine frames the small intestine and starts at the lower left). Rule 10: every row is a part's name plus what happens there. */

const U6 = (name, t) => (SC[name] ? t - SC[name].t0 : 0), D6 = name => (SC[name] ? SC[name].t1 - SC[name].t0 : 1);
const OL6 = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
const A6 = (a, b) => Object.assign({}, OL6, a, b || {});
const sg6 = (u, a, b) => clamp((u - a) / (b - a));
let uid6 = 0; const defs6 = () => $("v").querySelector("defs");
function grad6(kind, attrs, stops) { const id = "e6g" + (++uid6); const g = el(kind, Object.assign({id}, attrs), defs6());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
const card6 = (p, text, col = INK, fs = 44) => chip(p, text, col, {fs});
function showC6(c, t, a, b, y = 905, x = VP[0]) { tf(c, `translate(${x} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .25)); }
const wrap6 = (s, k, dx, dy) => (s.stage = el("g", {transform: `translate(${dx} ${dy}) scale(${k})`}, s.stage));   // use more of the screen
const still6 = (c, x, y) => { tf(c, `translate(${x} ${y})`); op(c, 1); return c; };

/* ---- the food characters ---- */
function face6(g, x, y, k = 1, happy = 1) { const f = el("g", {transform: `translate(${x} ${y}) scale(${k})`}, g);
  [-13, 13].forEach(dx => { el("ellipse", {cx: dx, cy: 0, rx: 6, ry: 8, fill: INK}, f); el("circle", {cx: dx + 2, cy: -3, r: 2.4, fill: "#fff"}, f); });
  el("path", {d: happy ? "M-9 13 Q0 22 9 13" : "M-8 18 Q0 12 8 18", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, f);
  [-24, 24].forEach(dx => el("circle", {cx: dx, cy: 10, r: 6, fill: "#ff8fa3", opacity: .7}, f)); return f; }
function rice6(p) { const g = el("g", {}, p); el("ellipse", A6({rx: 30, ry: 50, fill: "#fffdf2", "stroke-width": 5})  , g);
  el("path", {d: "M-14 -34 Q-20 -10 -16 16", fill: "none", stroke: "#e9e2c8", "stroke-width": 5, "stroke-linecap": "round"}, g); face6(g, 0, -4, .9); return g; }
function egg6(p) { const g = el("g", {}, p); el("path", A6({d: "M-46 -8 Q-52 -44 -14 -42 Q10 -56 34 -40 Q58 -30 48 2 Q56 36 22 42 Q-6 54 -30 40 Q-58 30 -46 -8 Z", fill: "#fffdf7", "stroke-width": 5}), g);
  el("ellipse", A6({cx: 2, cy: -2, rx: 30, ry: 28, fill: "#ffc93c", "stroke-width": 4}), g); face6(g, 2, -6, .8); return g; }
function fibre6(p) { const g = el("g", {}, p); el("path", A6({d: "M-52 26 Q-58 -30 -8 -44 Q40 -54 56 -20 Q62 14 30 34 Q-10 52 -52 26 Z", fill: "#52b788", "stroke-width": 5}), g);
  el("path", {d: "M-40 18 Q0 -6 44 -18 M-18 6 Q-16 -14 -4 -26 M8 -4 Q14 -22 28 -30", fill: "none", stroke: "#2d6a4f", "stroke-width": 4, "stroke-linecap": "round"}, g); face6(g, 0, 4, .85); return g; }
function lump6(p, k = 1) { const g = el("g", {}, p); el("path", A6({d: "M0 -74 C34 -70 30 -40 50 -30 C96 -10 92 62 40 66 H-40 C-92 62 -96 -10 -50 -30 C-30 -40 -34 -70 0 -74 Z", fill: "#b07d56", "stroke-width": 5}), g);
  el("path", {d: "M-50 -14 Q0 -2 50 -14", fill: "none", stroke: "#8f6240", "stroke-width": 4, "stroke-linecap": "round", opacity: .7}, g);
  el("path", {d: "M-22 44 q8 -8 16 0 M14 -50 q6 -6 12 0", fill: "none", stroke: "#52b788", "stroke-width": 6, "stroke-linecap": "round"}, g); face6(g, 0, 14, 1.05); return g; }
function drop6(p, col = "#4cc9f0", k = 1) { return el("path", A6({d: "M0 -22 C10 -6 16 2 16 10 A16 16 0 0 1 -16 10 C-16 2 -10 -6 0 -22 Z", fill: col, "stroke-width": 4, transform: `scale(${k})`}), p); }

/* ---- the digestive system, seen from the front (local units: the mouth is at (0, -255), the anus at (0, 458)) ---- */
const ORG6 = {
  gullet: "M0 -250 V-70 Q0 -30 28 -18",
  stomach: "M25 -25 C70 -60 150 -40 150 40 C150 110 80 135 20 110 C-5 100 -25 105 -40 122 L-58 100 C-35 75 -5 70 15 60 C30 20 20 0 25 -25 Z",
  stomachMid: "M28 -18 Q115 5 85 75 Q30 100 -48 112",
  small: "M-48 112 Q-82 150 -78 210 H80 Q105 210 105 232 Q105 255 80 255 H-80 Q-105 255 -105 277 Q-105 300 -80 300 H80 Q105 300 105 322 Q105 345 80 345 H-110 Q-140 345 -150 350",
  large: "M-150 374 V168 H150 V330 Q150 384 80 386 Q0 388 0 425 V458"};
const OCOL6 = {gullet: "#f4978e", stomach: "#ff8fa3", small: "#ffb09c", large: "#b79ced"};
function tube6(p, d, col, w) { const g = el("g", {}, p);
  g.glow = el("path", {d, fill: "none", stroke: "#ffe14d", "stroke-width": w + 30, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0}, g);
  el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 10, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
  g.c = el("path", {d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; }
function organ6(p, k) { if (k !== "stomach") return tube6(p, ORG6[k], OCOL6[k], k === "large" ? 30 : k === "small" ? 17 : 20);
  const g = el("g", {}, p); g.glow = el("path", {d: ORG6.stomach, fill: "#ffe14d", stroke: "#ffe14d", "stroke-width": 30, "stroke-linejoin": "round", opacity: 0}, g);
  g.c = el("path", A6({d: ORG6.stomach, fill: OCOL6.stomach, "stroke-width": 5}), g); el("path", {d: "M60 -20 Q120 0 118 50 M40 10 Q80 30 70 70", fill: "none", stroke: "#e56b87", "stroke-width": 5, "stroke-linecap": "round"}, g); return g; }
function figure6(p) { const g = el("g", {}, p), SKIN = "#fbe0c4";
  [-1, 1].forEach(d => el("path", A6({d: `M${d * 150} -170 Q${d * 262} -168 ${d * 276} -60 L${d * 300} 330 Q${d * 302} 372 ${d * 268} 372 Q${d * 236} 372 ${d * 232} 330 L${d * 200} -40 Z`, fill: SKIN}), g));
  el("path", A6({d: "M-70 -185 Q-215 -180 -225 -70 L-208 458 H208 L225 -70 Q215 -180 70 -185 Z", fill: SKIN}), g);
  el("rect", A6({x: -34, y: -222, width: 68, height: 54, fill: SKIN, "stroke-width": 5}), g); el("rect", {x: -31, y: -192, width: 62, height: 20, fill: SKIN}, g);
  [-92, 92].forEach(x => el("ellipse", A6({cx: x, cy: -298, rx: 14, ry: 20, fill: SKIN, "stroke-width": 5}), g));
  el("circle", A6({cx: 0, cy: -300, r: 92, fill: SKIN}), g);
  el("path", A6({d: "M-92 -306 Q-100 -398 0 -400 Q100 -398 92 -306 Q76 -350 34 -356 Q-10 -360 -40 -340 Q-76 -334 -92 -306 Z", fill: "#3d2c1e", "stroke-width": 5}), g);
  [-34, 34].forEach(x => { el("ellipse", {cx: x, cy: -306, rx: 9, ry: 12, fill: INK}, g); el("circle", {cx: x + 3, cy: -310, r: 3.4, fill: "#fff"}, g); });
  [-52, 52].forEach(x => el("circle", {cx: x, cy: -276, r: 13, fill: "#ff8fa3", opacity: .6}, g));
  g.mouth = el("ellipse", A6({cx: 0, cy: -256, rx: 20, ry: 11, fill: "#7a1c1c", "stroke-width": 4}), g);
  g.org = el("g", {}, g); g.o = {}; ["gullet", "small", "stomach", "large"].forEach(k => g.o[k] = organ6(g.org, k));
  g.mglow = el("circle", {cx: 0, cy: -256, r: 34, fill: "none", stroke: "#ffe14d", "stroke-width": 12, opacity: 0}, g);
  g.aglow = el("circle", {cx: 0, cy: 452, r: 30, fill: "none", stroke: "#ffe14d", "stroke-width": 12, opacity: 0}, g);
  return g; }

// ---- HOOK: chomp! Food gave you energy; but what happens to it inside you, and where do the leftovers go?
S.hook = (() => { const s = scene("hook", "#ff9f1c", "#ef476f");
  s.fig = el("g", {}, s.stage); s.f = figure6(s.fig); op(s.f.org, 0);
  s.path = el("path", {d: "M0 -230 V-60 Q10 30 60 60 Q110 110 30 170 Q-70 220 -20 290 Q30 340 0 400", fill: "none", stroke: "#e63946", "stroke-width": 12, "stroke-dasharray": "4 26", "stroke-linecap": "round"}, s.f);
  s.dot = el("circle", A6({r: 17, fill: "#52b788", "stroke-width": 5}), s.f);
  s.qm = tx(s.f, {x: 0, y: 190, "text-anchor": "middle", "font-size": 250, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 16}, "?");
  s.ch = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 130, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 18}, "CHOMP!");
  s.plate = el("g", {}, s.stage); emo(s.plate, 0, 0, 260, "🍛");
  s.run1 = el("g", {}, s.stage); emo(s.run1, 0, 0, 230, "🏃"); still6(chip(s.run1, "food gives you energy to run and jump", "#3a86ff", {fs: 38}), 0, 170);
  s.bits = el("g", {}, s.stage); tf(fibre6(s.bits), "translate(-80 -10) scale(2.4)"); tx(s.bits, {x: 100, y: 60, "font-size": 200, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "?");
  still6(chip(s.bits, "the bits your body can't use", "#2a9d8f", {fs: 40}), 0, 180);
  s.q = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 92, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 15}, "Where does your food go?");
  const L = s.path.getTotalLength();
  s.run = t => { const a = (w, f) => cue("hook", w, f), ti = a("inside", .55), tw = a("where", .9);
    tf(s.fig, `translate(330 452) scale(.98)`); set(s.f.mouth, "ry", 11 + 9 * on(t, SC.hook.t0 - .2, SC.hook.t0 + .5, .15));
    const k = ramp(t, ti - .7, ti + 1.6); set(s.path, "stroke-dasharray", `4 26`); set(s.path, "stroke-dashoffset", 0); op(s.path, ramp(t, ti - .8, ti - .4));
    s.path.style.clipPath = ""; const P = s.path.getPointAtLength(L * k); tf(s.dot, `translate(${P.x} ${P.y})`); op(s.dot, ramp(t, ti - .8, ti - .6));
    tf(s.qm, `translate(0 100) scale(${Math.max(0, pop(t, ti)) * (1 + .05 * Math.sin(t * 5))}) translate(0 -100)`);
    tf(s.ch, `translate(950 130) rotate(-6) scale(${Math.max(0, pop(t, SC.hook.t0 - .1)) * (1 - ramp(t, a("last", .1) + .2, a("last", .1) + .5))})`);
    popAt(s.plate, 950, 420, t, SC.hook.t0); op(s.plate, on(t, SC.hook.t0, a("energy", .25) - .1, .2));
    popAt(s.run1, 980, 330, t, a("energy", .25) - .2); op(s.run1, on(t, a("energy", .25) - .2, a("bits", .7) - .2, .2));
    popAt(s.bits, 980, 330, t, a("bits", .7) - .1);
    tf(s.q, `translate(960 760) scale(${Math.max(0, pop(t, tw - .1))})`); }; return s; })();

// ---- LAST TIME'S ANSWER: buy food from many countries; if one has trouble, we buy from the others
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee"); wrap6(s, 1.22, -90, -50);
  s.top = chip(s.stage, "✅ Last time's answer", "#06d6a0", {fs: 44});
  s.qq = chip(s.stage, "Why buy food from many countries, not just one?", "#1b1b3a", {fs: 34});
  const P = [[190, 320, "country A"], [190, 600, "country B"], [1010, 320, "country C"], [1010, 600, "country D"]], C = [600, 450];
  s.lines = P.map(([x, y]) => { const g = el("g", {}, s.stage), dx = C[0] - x, dy = C[1] - y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    const x1 = x + ux * 150, y1 = y + uy * 150, x2 = C[0] - ux * 150, y2 = C[1] - uy * 150;
    el("line", {x1, y1, x2, y2, stroke: INK, "stroke-width": 22, "stroke-linecap": "round"}, g);
    g.f = el("line", {x1, y1, x2, y2, stroke: "#ffd166", "stroke-width": 11, "stroke-dasharray": "18 18", "stroke-linecap": "round"}, g);
    el("path", A6({d: "M-22 -24 L22 0 L-22 24 Z", fill: "#ffd166", "stroke-width": 5, transform: `translate(${x2 + ux * 16} ${y2 + uy * 16}) rotate(${Math.atan2(uy, ux) * 180 / Math.PI})`}), g); return g; });
  s.src = P.map(([x, y, lab]) => { const g = el("g", {}, s.stage); el("rect", A6({x: -110, y: -84, width: 220, height: 150, rx: 22, fill: "#fff"}), g);
    emo(g, -52, -14, 70, "🥚"); emo(g, 0, -14, 70, "🥚"); emo(g, 52, -14, 70, "🥚"); el("rect", A6({x: -110, y: 22, width: 220, height: 44, rx: 12, fill: "#f4a261"}), g);
    still6(chip(g, lab, "#1b1b3a", {fs: 28}), 0, 104); g.x = x; g.y = y; return g; });
  s.sg = el("g", {}, s.stage); el("circle", A6({r: 118, fill: "#fff", "stroke-width": 7}), s.sg); emo(s.sg, 0, -14, 120, "🇸🇬"); still6(chip(s.sg, "Singapore", "#e63946", {fs: 32}), 0, 108);
  s.bad = [["🌊", "flood"], ["🦠", "disease"], ["🚫", "stops"]].map(([e, w]) => { const g = el("g", {}, s.stage); el("circle", A6({r: 62, fill: "#ffe14d"}), g); emo(g, 0, 0, 74, e); g.w = w; return g; });
  s.x = el("g", {}, s.stage); [[-1, 1], [1, 1]].forEach(([a]) => el("line", {x1: -34 * a, y1: -34, x2: 34 * a, y2: 34, stroke: "#e63946", "stroke-width": 16, "stroke-linecap": "round"}, s.x));
  s.ok = chip(s.stage, "✔ we can still buy from the others", "#06d6a0", {fs: 36});
  s.egg = chip(s.stage, "🧺 Don't put all your eggs in one basket!", "#f72585", {fs: 40});
  s.run = t => { const a = (w, f) => cue("answer", w, f), t0 = SC.answer.t0, tfl = a("flood", .5), to = a("others", .78), te = a("eggs", .9);
    popAt(s.top, 760, 40, t, t0 - .2); popAt(s.qq, 600, 130, t, a("why", .15));
    popAt(s.sg, C[0], C[1], t, a("singapore", .2) - .2);
    s.src.forEach((g, i) => popAt(g, g.x, g.y, t, a("many", .28) + i * .18));
    s.lines.forEach((g, i) => { const dead = i === 1 ? ramp(t, tfl, tfl + .3) : 0; op(g, ramp(t, a("many", .28) + .3 + i * .18, a("many", .28) + .7 + i * .18) * (1 - .7 * dead));
      set(g.f, "stroke-dashoffset", i === 1 && t > tfl ? -tfl * 90 : -t * 90); set(g.f, "stroke-width", i !== 1 ? 11 + 6 * on(t, to, to + 1.4, .3) : 11); });
    s.bad.forEach((g, i) => { const tw = a(g.w, .5 + i * .06), tn = i < 2 ? a(s.bad[i + 1].w, .56 + i * .06) : 1e9; popAt(g, 330, 470, t, tw - .1); op(g, on(t, tw - .1, tn - .05, .12)); });
    tf(s.x, `translate(${lerp(P[1][0], C[0], .5)} ${lerp(P[1][1], C[1], .5)}) scale(${Math.max(0, pop(t, tfl + .1))})`);
    popAt(s.ok, 600, 745, t, to - .5); op(s.ok, on(t, to - .5, te - .1, .2)); popAt(s.egg, 600, 745, t, te - .2); }; return s; })();

// ---- NEWS: every flush goes on a journey too. HDB toilet -> deep tunnel -> water reclamation plant -> NEWater (up to 40% of our needs)
S.news = (() => { const s = scene("news", "#90e0ef", "#caf0f8"), st = s.stage, G = 430;
  el("rect", {x: -400, y: G, width: 2600, height: 900, fill: "#b08968"}, st); el("rect", {x: -400, y: G, width: 2600, height: 44, fill: "#74c69d"}, st);
  el("rect", {x: -400, y: 640, width: 2600, height: 700, fill: "#9c7352"}, st); el("line", {x1: -400, y1: G, x2: 2200, y2: G, stroke: INK, "stroke-width": 6}, st);
  seed = 61; for (let i = 0; i < 26; i++) el("ellipse", {cx: -100 + rnd() * 1700, cy: 500 + rnd() * 480, rx: 10 + rnd() * 22, ry: 6 + rnd() * 10, fill: "#7f5539", opacity: .45}, st);
  // the pipes: used water (murky) to the plant, clean water after it
  const dUsed = "M210 330 V560 Q210 610 260 618 L700 700 Q770 712 770 650 V400", dNew = "M850 380 H1010";
  const pipe = (d, w, col) => { const g = el("g", {}, st); el("path", {d, fill: "none", stroke: INK, "stroke-width": w + 12, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
    el("path", {d, fill: "none", stroke: "#dee2e6", "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
    g.f = el("path", {d, fill: "none", stroke: col, "stroke-width": w * .55, "stroke-dasharray": "22 20", "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; };
  s.pU = pipe(dUsed, 40, "#8a7f5c"); s.pN = pipe(dNew, 30, "#3a86ff");
  el("path", {d: "M262 618 L700 700", stroke: INK, "stroke-width": 90, "stroke-linecap": "round", fill: "none"}, st); el("path", {d: "M262 618 L700 700", stroke: "#ced4da", "stroke-width": 78, "stroke-linecap": "round", fill: "none"}, st);
  s.tun = el("path", {d: "M262 618 L700 700", stroke: "#8a7f5c", "stroke-width": 40, "stroke-dasharray": "34 26", "stroke-linecap": "round", fill: "none"}, st);
  // the HDB block with one flat's toilet shown large
  const hb = el("g", {}, st); el("rect", A6({x: 60, y: 60, width: 300, height: G - 60, rx: 8, fill: "#f4a261"}), hb); el("rect", A6({x: 60, y: G - 70, width: 300, height: 70, fill: "#e9c46a"}), hb);
  [100, 200, 300].forEach(x => el("rect", {x: x - 8, y: G - 70, width: 16, height: 70, fill: "#b5651d"}, hb));
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) el("rect", {x: 78 + c * 46, y: 80 + r * 48, width: 30, height: 30, rx: 4, fill: "#fdf0d5", stroke: INK, "stroke-width": 3}, hb);
  tx(hb, {x: 210, y: G - 24, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "BLK 612");
  s.lens = el("g", {}, st); el("circle", A6({r: 100, fill: "#e0fbfc", "stroke-width": 8}), s.lens);
  for (let k = -2; k <= 2; k++) { el("line", {x1: k * 40, y1: -Math.sqrt(1e4 - 1600 * k * k), x2: k * 40, y2: Math.sqrt(1e4 - 1600 * k * k), stroke: "#bde0fe", "stroke-width": 3}, s.lens); el("line", {y1: k * 40, x1: -Math.sqrt(1e4 - 1600 * k * k), y2: k * 40, x2: Math.sqrt(1e4 - 1600 * k * k), stroke: "#bde0fe", "stroke-width": 3}, s.lens); }
  el("rect", A6({x: -52, y: -74, width: 104, height: 56, rx: 10, fill: "#fff", "stroke-width": 5}), s.lens); s.btn = el("circle", A6({cx: 0, cy: -62, r: 11, fill: "#adb5bd", "stroke-width": 4}), s.lens);
  el("ellipse", A6({cx: 0, cy: 22, rx: 58, ry: 50, fill: "#fff", "stroke-width": 5}), s.lens); el("ellipse", {cx: 0, cy: 26, rx: 38, ry: 31, fill: "#4cc9f0", stroke: INK, "stroke-width": 4}, s.lens);
  s.sw = el("path", {d: "M-26 26 A26 22 0 1 1 0 48 M-12 26 A12 10 0 1 1 0 36", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round"}, s.lens);
  // the water reclamation plant: round tanks and a building
  const pl = el("g", {}, st); el("rect", A6({x: 690, y: 300, width: 190, height: 130, rx: 8, fill: "#adb5bd"}), pl); el("rect", A6({x: 730, y: 250, width: 110, height: 56, rx: 6, fill: "#ced4da"}), pl);
  [[600, 0], [935, 1]].forEach(([x, i]) => { el("rect", A6({x: x - 60, y: 372, width: 120, height: 58, fill: "#e9ecef"}), pl); s["tk" + i] = el("ellipse", A6({cx: x, cy: 372, rx: 60, ry: 20, fill: i ? "#4cc9f0" : "#8a7f5c"}), pl); });
  el("path", {d: "M660 380 H690", stroke: INK, "stroke-width": 16}, pl);
  // NEWater
  const nw = el("g", {}, st); el("rect", A6({x: 1010, y: 250, width: 170, height: 180, rx: 10, fill: "#3a86ff"}), nw); el("rect", A6({x: 1000, y: 232, width: 190, height: 30, rx: 8, fill: "#1d3557"}), nw);
  s.dropN = el("g", {transform: "translate(1095 350)"}, nw); drop6(s.dropN, "#e0fbfc", 2.6);
  s.spk = [[1040, 290], [1150, 300], [1160, 400]].map(([x, y]) => emo(nw, x, y, 34, "✨"));
  // labels: one kind (the name of the thing)
  const L = (label, col) => chip(st, label, col, {fs: 30});
  s.l = [[L("HDB flat", "#e76f51"), 210, 100, "flush", .12], [L("deep tunnel", "#6c584c"), 440, 555, "tunnels", .36], [L("water reclamation plant", "#495057"), 770, 200, "reclamation", .42], [L("NEWater", "#1d3557"), 1095, 186, "new", .7]];
  s.me = el("g", {}, st); s.meD = drop6(s.me, "#8a7f5c", 1.5);
  s.forty = el("g", {}, st); el("rect", A6({x: -330, y: -66, width: 660, height: 150, rx: 30, fill: "#fff"}), s.forty);
  for (let i = 0; i < 10; i++) { const d = el("g", {transform: `translate(${-270 + i * 60} -14)`}, s.forty); drop6(d, i < 4 ? "#3a86ff" : "#e9ecef", 1.3); }
  tx(s.forty, {x: 0, y: 64, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "up to 40% of Singapore's water needs");
  const PU = el("path", {d: dUsed, fill: "none"}, st), LU = PU.getTotalLength();
  s.run = t => { const a = (w, f) => cue("news", w, f), tf0 = a("flush", .14), tt = a("tunnels", .36), tp = a("plants", .46), tc = a("cleaned", .54), tn = a("new", .72), t4 = a("forty", .84);
    tf(s.lens, `translate(210 260) scale(${Math.max(0, pop(t, SC.news.t0 + .3)) * lerp(1, .62, ramp(t, tt - 1, tt))})`);
    const fl = on(t, tf0, tf0 + 2.2, .2); tf(s.sw, `rotate(${(t - tf0) * 500} 0 26)`); op(s.sw, fl); set(s.btn, "cy", -62 + 5 * on(t, tf0 - .1, tf0 + .4, .08));
    op(s.pU, 1); set(s.pU.f, "stroke-dashoffset", -t * 70); set(s.tun, "stroke-dashoffset", -t * 70); set(s.pN.f, "stroke-dashoffset", -t * 70); op(s.pN.f, ramp(t, tc + .6, tc + 1.2));
    s.l.forEach(([c, x, y, w, f]) => popAt(c, x, y, t, a(w, f) - .15));
    // the drop we follow: down from the flat, along the deep tunnel, up into the plant, out clean to NEWater
    const k1 = ease(sg6(t, tf0 + .3, tp)), k2 = ease(sg6(t, tc + .5, tn));
    let P = PU.getPointAtLength(LU * k1); let x = P.x, y = P.y; if (t > tc + .5) { x = lerp(770, 1010, k2); y = lerp(400, 380, Math.min(1, k2 * 4)); }
    tf(s.me, `translate(${x} ${y})`); op(s.me, on(t, tf0 + .2, tn + .1, .2)); set(s.meD, "fill", mix("#8a7f5c", "#4cc9f0", ramp(t, tc - .2, tc + .5)));
    set(s.tk1, "fill", mix("#8a7f5c", "#4cc9f0", ramp(t, tc - .2, tc + .5)));
    tf(s.dropN, `translate(1095 350) scale(${.85 + .15 * Math.max(0, pop(t, tn, .5))})`); s.spk.forEach((e, i) => op(e, ramp(t, tn + i * .15, tn + .3 + i * .15) * (.6 + .4 * Math.sin(t * 5 + i * 2))));
    popAt(s.forty, 720, 810, t, t4 - .2); }; return s; })();

// ---- RECAP: the journey, one card per stop; each lights up as Heart names it
S.recap = (() => { const s = scene("recap", "#fff3b0", "#ffd6a5"); wrap6(s, 1.22, -70, -40);
  const ST = [["fibre", "a bit of fibre", "that's YOU!", "fibre"], ["🦷", "mouth", "chewed", "teeth"], ["gullet", "gullet", "squeezed down", "gullet"], ["stomach", "stomach", "churned", "stomach"],
    ["small", "small intestine", "your friends left here", "small"], ["large", "large intestine", "water taken back", "large"], ["🚽", "toilet", "plop!", "plop"]];
  s.cards = ST.map(([e, lab, sub, w], i) => { const g = el("g", {}, s.stage), x = i < 4 ? 150 + i * 300 : 300 + (i - 4) * 300, y = i < 4 ? 200 : 520;
    el("rect", A6({x: -128, y: -140, width: 256, height: 290, rx: 30, fill: "#fff"}), g);
    if (e === "fibre") tf(fibre6(g), "translate(0 -46) scale(1.25)");
    else if (ORG6[e]) { const o = organ6(g, e); tf(o, e === "gullet" ? "translate(0 34) scale(.52)" : e === "stomach" ? "translate(-36 -70) scale(.72)" : e === "small" ? "translate(8 -196) scale(.62)" : "translate(0 -210) scale(.56)"); }
    else emo(g, 0, -44, 110, e);
    tx(g, {x: 0, y: 84, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK, "data-fit": 236}, lab);
    tx(g, {x: 0, y: 122, "text-anchor": "middle", "font-size": 24, "font-weight": 600, fill: "#7209b7", "data-fit": 236}, sub);
    tx(g, {x: -104, y: -100, "font-size": 30, "font-weight": 700, fill: "#f77f00"}, String(i + 1)); g.x = x; g.y = y; g.w = w; return g; });
  s.arrows = ST.slice(0, 6).map((_, i) => { const a = el("path", {d: "M-14 -16 L14 0 L-14 16 Z", fill: INK}, s.stage);
    tf(a, i === 3 ? "translate(1050 362) rotate(90)" : i < 3 ? `translate(${300 + i * 300} 200)` : `translate(${450 + (i - 4) * 300} 520)`); return a; });
  s.fr = el("g", {}, s.stage); tf(rice6(s.fr), "translate(-40 0) scale(.7)"); tf(egg6(s.fr), "translate(40 6) scale(.7)");
  s.blood = chip(s.stage, "🍚🥚 digested → passed into the blood", "#e63946", {fs: 36});
  s.fib = chip(s.stage, "🥬 fibre can't be digested → it moves on", "#2a9d8f", {fs: 36});
  s.run = t => { const a = (w, f) => cue("recap", w, f);
    s.cards.forEach((g, i) => { const tw = a(g.w, (i + .7) / 8), now = on(t, tw - .1, tw + 1.5, .2); tf(g, `translate(${g.x} ${g.y}) scale(${1 + .12 * now})`); op(g, t >= tw - .1 ? 1 : .3); });
    s.arrows.forEach((ar, i) => op(ar, t >= a(s.cards[i + 1].w, (i + 1.7) / 8) - .1 ? 1 : .25));
    const tr = a("rice", .5), tb = a("blood", .62), tc = a("can't", .7), k = ramp(t, a("passed", .6) - .2, tb + .3);
    tf(s.fr, `translate(${lerp(300, 330, k)} ${lerp(480, 730, k)}) scale(${Math.max(0, pop(t, tr - .1)) * lerp(1, .5, k)})`); op(s.fr, on(t, tr - .1, tb + .4, .2));
    popAt(s.blood, 600, 735, t, tb - .2); op(s.blood, on(t, tb - .2, tc - .1, .2)); popAt(s.fib, 600, 735, t, tc); }; return s; })();

// ---- TEXTBOOK (P4): the labelled digestive system, in step with Heart
S.textbook = (() => { const s = scene("textbook", "#fff8e8", "#ffe1c2"), st = s.stage, FX = 250, FY = 440, K = .95;
  s.fg = el("g", {transform: `translate(${FX} ${FY}) scale(${K})`}, st); s.f = figure6(s.fg);
  s.vein = el("g", {}, s.f); el("path", {d: "M-128 300 Q-196 190 -176 20 Q-160 -70 -110 -120", fill: "none", stroke: "#e63946", "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "2 16"}, s.vein);
  el("path", {d: "M-128 -108 L-100 -130 L-104 -96 Z", fill: "#e63946", stroke: "#e63946", "stroke-width": 6, "stroke-linejoin": "round"}, s.vein);
  tx(s.vein, {x: -182, y: -134, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#e63946"}, "blood");
  s.vp = el("path", {d: "M-128 300 Q-196 190 -176 20 Q-160 -70 -110 -120", fill: "none"}, s.f);
  s.reds = []; for (let i = 0; i < 7; i++) s.reds.push(el("circle", {r: 9, fill: "#e63946", stroke: INK, "stroke-width": 3}, s.f));
  s.blues = []; for (let i = 0; i < 8; i++) { const g = el("g", {}, s.f); drop6(g, "#4cc9f0", .7); s.blues.push(g); }
  s.juice = [[0, -256], [86, 44], [0, 277]].map(([x, y]) => { const g = el("g", {}, s.f); [-18, 6, 26].forEach((dx, i) => tf(drop6(g, "#b5e48c", .75), `translate(${dx} ${i % 2 ? -12 : 6}) scale(.75)`)); g.x = x; g.y = y; return g; });
  s.food = el("g", {}, s.f); s.fd = el("circle", A6({r: 15, fill: "#f77f00", "stroke-width": 4}), s.food);
  const SEG = ["gullet", "stomachMid", "small", "large"].map(k => { const p = el("path", {d: ORG6[k], fill: "none"}, s.f); return {p, L: p.getTotalLength()}; });
  const VL = s.vp.getTotalLength();
  const ROWS = [["mouth", "mouth", "teeth chew · saliva starts digestion", [0, -256], "#f77f00"], ["gullet", "gullet", "pushes food down to the stomach", [0, -150], "#e5383b"],
    ["stomach", "stomach", "churns food with digestive juices", [148, 30], "#d6336c"], ["small", "small intestine", "digested food passes into the blood", [105, 277], "#e63946"],
    ["large", "large intestine", "water is taken back", [150, 315], "#7b2cbf"], ["anus", "anus", "undigested food leaves the body", [0, 452], "#6c584c"]];
  s.rows = ROWS.map(([w, name, sub, [ox, oy], col], i) => { const y = 110 + i * 132, g = el("g", {}, st), wd = name.length * 26 + 58;
    g.ln = el("g", {}, st); el("line", {x1: FX + ox * K, y1: FY + oy * K, x2: 612, y2: y, stroke: INK, "stroke-width": 4}, g.ln); el("circle", {cx: FX + ox * K, cy: FY + oy * K, r: 8, fill: INK}, g.ln);
    g.pill = el("g", {}, g); el("rect", A6({x: 0, y: -34, width: wd, height: 68, rx: 34, fill: col, "stroke-width": 5}), g.pill);
    tx(g.pill, {x: wd / 2, y: 16, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff"}, name);
    g.sub = tx(g, {x: 14, y: 78, "font-size": 36, "data-fit": 700, "font-weight": 600, fill: INK}, sub); g.y = y; g.w = w; return g; });
  s.leg = el("g", {}, st); tf(drop6(s.leg, "#b5e48c", 1), "translate(0 0)"); tx(s.leg, {x: 28, y: 12, "font-size": 30, "font-weight": 700, fill: INK}, "digestive juices");
  s.run = t => { const a = (w, f) => cue("textbook", w, f), tj = a("juices", .38), tpa = a("passes", .62), tw = a("water", .8), tan = a("anus", .98), tsm = a("small#2", .52), tlg = a("large#2", .76), tlv = a("leaves", .93);
    const NT = [a("mouth", .19), a("gullet", .21), a("stomach", .23), a("small", .26), a("large", .3), tan];           // when each name is said
    const FT = [tj, tj, tj + .25, tpa, tw, tan];                                                                    // when its fact is said
    s.rows.forEach((g, i) => { const k = Math.max(0, pop(t, NT[i] - .1)); tf(g, `translate(620 ${g.y})`); tf(g.pill, `scale(${k * (1 + .1 * on(t, FT[i] - .1, FT[i] + 1.6, .2))})`);
      op(g, clamp(k * 3)); op(g.ln, ramp(t, NT[i] - .1, NT[i] + .2)); op(g.sub, ramp(t, NT[i] + .15, NT[i] + .45) * (t >= FT[i] - .1 || i === 1 ? 1 : .45)); });
    // each organ glows as it is named, and again at its fact
    const glow = (e, i) => op(e, .9 * Math.max(on(t, NT[i] - .1, NT[i] + .7, .15), on(t, FT[i] - .1, FT[i] + 1.8, .25)));
    glow(s.f.mglow, 0); glow(s.f.o.gullet.glow, 1); glow(s.f.o.stomach.glow, 2); glow(s.f.o.small.glow, 3); glow(s.f.o.large.glow, 4); glow(s.f.aglow, 5);
    op(s.f.o.small.glow, .9 * Math.max(on(t, NT[3] - .1, NT[3] + .7, .15), on(t, tsm - .1, tpa + 2.4, .25))); op(s.f.o.large.glow, .9 * Math.max(on(t, NT[4] - .1, NT[4] + .7, .15), on(t, tlg - .1, tw + 1.6, .25)));
    // digestive juices in the mouth, the stomach and the small intestine
    s.juice.forEach((g, i) => { const k = Math.max(0, pop(t, tj + i * .25)); tf(g, `translate(${g.x + (i === 0 ? 46 : 0)} ${g.y + 3 * Math.sin(t * 4 + i)}) scale(${k})`); op(g, on(t, tj + i * .25, tsm - .2, .3)); });
    tf(s.leg, `translate(545 34) scale(${Math.max(0, pop(t, tj))})`); op(s.leg, on(t, tj, tsm - .2, .3));
    // the food: mouth -> gullet -> stomach (stays for the juices) -> small intestine (the digested part leaves) -> large intestine -> out
    const KT = [[NT[0], NT[2] - .2], [NT[2] - .2, tsm - .3], [tsm - .3, tlg - .3], [tlg - .3, tlv + 1.0]];
    let P = {x: 0, y: -256}; KT.forEach(([p, q], i) => { if (t >= p) { const k = i === 1 ? ease(sg6(t, p, p + 1.2)) : i === 3 ? lerp(0, .93, ease(sg6(t, p, tlv - .4))) + .07 * ease(sg6(t, tlv, q)) : ease(sg6(t, p, q)); P = SEG[i].p.getPointAtLength(SEG[i].L * k); } });
    tf(s.food, `translate(${P.x} ${P.y}) scale(${lerp(1, .62, ramp(t, tpa - .6, tlg - .3))})`); op(s.food, ramp(t, NT[0] - .2, NT[0]) * (1 - ramp(t, tlv + .9, tlv + 1.2)));
    set(s.fd, "fill", t < tlg ? mix("#f77f00", "#e9c46a", ramp(t, NT[2], tj + 2)) : mix("#e9c46a", "#a47148", ramp(t, tlg, tw + 1)));
    // digested food passes into the blood, which carries it around the body
    op(s.vein, ramp(t, tpa - .2, tpa + .3));
    s.reds.forEach((e, i) => { const k = ((t - tpa) * .28 + i / 7) % 1, Q = s.vp.getPointAtLength(VL * k); set(e, "cx", Q.x); set(e, "cy", Q.y); op(e, t > tpa + i * .12 ? Math.sin(k * Math.PI) * 1.6 * (1 - ramp(t, tlg + .4, tlg + 1)) : 0); });
    // water is taken back through the wall of the large intestine
    s.blues.forEach((g, i) => { const k = ((t - tw) * .55 + i / 8) % 1, sd = i % 2 ? 1 : -1, y0 = 190 + (i * 37) % 150; tf(g, `translate(${sd * (150 + 14 + 58 * k)} ${y0}) scale(${1 - .5 * k})`); op(g, t > tw - .1 ? Math.sin(k * Math.PI) * 1.5 : 0); }); };
  return s; })();

// ---- FIBRE: not digested, but it helps food move smoothly. Vegetables, fruit, wholegrain foods
S.fibre = (() => { const s = scene("fibre", "#d8f3dc", "#95d5b2"), st = wrap6(s, 1.2, -90, -30);
  s.top = chip(st, "🥬 Fibre: can't be digested, but still important!", "#2a9d8f", {fs: 38});
  s.tube = el("g", {}, st); el("rect", A6({x: 40, y: 150, width: 1120, height: 170, rx: 85, fill: "#ffb09c", "stroke-width": 7}), s.tube); el("rect", {x: 70, y: 180, width: 1060, height: 110, rx: 55, fill: "#7a1c1c", opacity: .85}, s.tube);
  const cp = el("clipPath", {id: "e6fc"}, defs6()); el("rect", {x: 70, y: 180, width: 1060, height: 110, rx: 55}, cp); s.in = el("g", {"clip-path": "url(#e6fc)"}, s.tube);
  s.lumps = [0, 1, 2, 3].map(i => { const g = el("g", {}, s.in); el("rect", A6({x: -70, y: -36, width: 140, height: 72, rx: 36, fill: "#c9a27a", "stroke-width": 5}), g);
    el("path", {d: "M-46 -12 l22 8 M-30 16 l24 -6 M-4 -8 l20 10 M16 14 l24 -8 M30 -14 l18 4", fill: "none", stroke: "#40916c", "stroke-width": 8, "stroke-linecap": "round"}, g); return g; });
  s.arr = [300, 600, 900].map(x => el("path", {d: "M-16 -14 L12 0 L-16 14", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round", transform: `translate(${x} 350)`, opacity: 0}, s.tube));
  s.sub = chip(st, "helps food move smoothly through your intestines", "#1b1b3a", {fs: 32});
  s.items = [["🥬", "🥦", "vegetables", "chye sim, kangkong", "vegetables", "#2a9d8f"], ["🍌", "🍎", "fruit", "banana, papaya, apple", "fruit", "#f77f00"], ["🍞", "🌾", "wholegrain foods", "brown rice, wholemeal bread", "wholegrain", "#9c6644"]]
    .map(([e1, e2, lab, sub, w, col], i) => { const g = el("g", {}, st); el("ellipse", A6({cx: 0, cy: 30, rx: 160, ry: 44, fill: "#fff"}), g); emo(g, -56, -30, 120, e1); emo(g, 62, -22, 104, e2);
      still6(chip(g, lab, col, {fs: 34}), 0, 118); tx(g, {x: 0, y: 172, "text-anchor": "middle", "font-size": 27, "font-weight": 600, fill: INK}, sub); g.w = w; g.x = 210 + i * 390; return g; });
  s.run = t => { const a = (w, f) => cue("fibre", w, f), tm = a("helps", .35);
    popAt(s.top, 600, 96, t, SC.fibre.t0 - .1); tf(s.tube, "translate(0 40)"); op(s.tube, ramp(t, tm - .5, tm - .1)); popAt(s.sub, 600, 436, t, a("move", .42));
    s.lumps.forEach((g, i) => { const k = (((t - tm) * .16 + i / 4) % 1 + 1) % 1; tf(g, `translate(${lerp(-40, 1240, k)} 235)`); });
    s.arr.forEach((e, i) => op(e, 0));
    s.items.forEach((g, i) => popAt(g, g.x, 606, t, a(g.w, .68 + i * .08) - .15)); }; return s; })();

// ---- TRY THIS: chew plain bread for a minute; saliva breaks starch into sugar
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = wrap6(s, 1.15, -60, -20);
  s.top = chip(st, "🏠 Try this at home!", "#7209b7", {fs: 44});
  s.bread = el("g", {}, st); el("path", A6({d: "M-120 -60 Q-150 -130 -70 -140 Q0 -170 70 -140 Q150 -130 120 -60 V130 Q120 150 100 150 H-100 Q-120 150 -120 130 Z", fill: "#c68642", "stroke-width": 7}), s.bread);
  el("path", {d: "M-98 -62 Q-118 -112 -62 -118 Q0 -144 62 -118 Q118 -112 98 -62 V122 Q98 128 92 128 H-92 Q-98 128 -98 122 Z", fill: "#fff1d0"}, s.bread);
  still6(chip(s.bread, "plain bread", "#9c6644", {fs: 30}), 0, 200);
  s.bite = el("circle", {cx: 118, cy: -96, r: 52, fill: "#caffbf"}, s.bread);
  s.timer = el("g", {}, st); el("circle", A6({r: 120, fill: "#fff", "stroke-width": 8}), s.timer); s.arc = el("path", {fill: "#ff5d73"}, s.timer); el("circle", A6({r: 64, fill: "#fff", "stroke-width": 5}), s.timer);
  tx(s.timer, {x: 0, y: 2, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: INK}, "1"); tx(s.timer, {x: 0, y: 36, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "minute");
  still6(chip(s.timer, "chew, don't swallow", "#3a86ff", {fs: 30}), 0, 200);
  s.sweet = el("g", {}, st); emo(s.sweet, 0, 0, 180, "😋"); still6(chip(s.sweet, "does it taste sweet?", "#f72585", {fs: 30}), 0, 200);
  // starch (a long chain) -> saliva -> sugar (small pieces)
  s.sci = el("g", {}, st); el("rect", A6({x: -520, y: -84, width: 1040, height: 190, rx: 30, fill: "#fff"}), s.sci);
  s.chain = el("line", {x1: -470, y1: -10, x2: -150, y2: -10, stroke: INK, "stroke-width": 8}, s.sci);
  s.beads = []; for (let i = 0; i < 8; i++) s.beads.push(el("circle", A6({r: 21, fill: "#ffd166", "stroke-width": 5}), s.sci));
  tx(s.sci, {x: -310, y: 76, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "starch");
  s.sugL = tx(s.sci, {x: 330, y: 76, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "sugar");
  s.ar = el("g", {}, s.sci); el("path", A6({d: "M-60 -8 H30 V-24 L66 0 L30 24 V8 H-60 Z", fill: "#4cc9f0", "stroke-width": 5, transform: "translate(0 -10)"}), s.ar); tf(drop6(s.ar, "#4cc9f0", 1), "translate(-4 -62)");
  tx(s.ar, {x: 0, y: 76, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#0077b6"}, "saliva");
  s.run = t => { const a = (w, f) => cue("try", w, f), t1 = a("one", .3), t2 = a("swallowing", .48) + .5, ts = a("saliva", .8), tb = a("breaking", .85);
    popAt(s.top, 780, 50, t, SC.try.t0 - .1); popAt(s.bread, 220, 330, t, a("bread", .25) - .5); op(s.bite, ramp(t, a("chew", .15), a("chew", .15) + .15));
    popAt(s.timer, 600, 320, t, t1 - .3); const k = clamp((t - t1) / (t2 - t1)) * .9999, an = k * 2 * Math.PI;
    set(s.arc, "d", `M0 0 L0 -112 A112 112 0 ${k > .5 ? 1 : 0} 1 ${112 * Math.sin(an)} ${-112 * Math.cos(an)} Z`);
    popAt(s.sweet, 980, 320, t, a("sweet", .62) - .25);
    popAt(s.sci, 600, 690, t, ts - .3); const sp = ease(sg6(t, tb, tb + 1.1));
    s.beads.forEach((b, i) => { const x0 = -460 + i * 44, pr = Math.floor(i / 2), x1 = 180 + pr * 96 + (i % 2) * 40; set(b, "cx", lerp(x0, x1, sp)); set(b, "cy", -10 - 50 * Math.sin(sp * Math.PI)); });
    op(s.chain, 1 - ramp(t, tb, tb + .2)); op(s.sugL, ramp(t, tb + .7, tb + 1)); }; return s; })();

// ---- THINK ABOUT IT: the small intestine is about 6 m long, longer than a car. Why so long?
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = wrap6(s, 1.15, -80, -30), X0 = 100, PXM = 1000 / 6;
  s.title = tx(st, {x: 720, y: 90, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.coil = el("g", {}, st); tf(organ6(s.coil, "small"), "translate(0 -230) scale(.85)");
  s.long = el("g", {}, st); const d = `M${X0} 280 H${X0 + 1000}`;
  s.lo = el("path", {d, fill: "none", stroke: INK, "stroke-width": 44, "stroke-linecap": "round"}, s.long); s.lc = el("path", {d, fill: "none", stroke: OCOL6.small, "stroke-width": 32, "stroke-linecap": "round"}, s.long);
  s.rule = el("g", {}, st); el("line", {x1: X0, y1: 345, x2: X0 + 1000, y2: 345, stroke: "#fff", "stroke-width": 6}, s.rule);
  for (let m = 0; m <= 6; m++) { el("line", {x1: X0 + m * PXM, y1: 331, x2: X0 + m * PXM, y2: 359, stroke: "#fff", "stroke-width": 6}, s.rule); tx(s.rule, {x: X0 + m * PXM, y: 398, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, m + " m"); }
  s.l6 = chip(st, "small intestine (adult): about 6 m", "#e63946", {fs: 34});
  // a car drawn to the same scale: about 4.5 m long and 1.45 m tall
  s.car = el("g", {}, st); const CL = 4.5 * PXM, CH = 1.45 * PXM;
  el("path", A6({d: `M0 0 V${-CH * .42} Q0 ${-CH * .56} ${CL * .08} ${-CH * .58} L${CL * .2} ${-CH * .62} L${CL * .32} ${-CH * .96} Q${CL * .34} ${-CH} ${CL * .4} ${-CH} H${CL * .66} Q${CL * .72} ${-CH} ${CL * .76} ${-CH * .94} L${CL * .88} ${-CH * .62} L${CL * .97} ${-CH * .54} Q${CL} ${-CH * .5} ${CL} ${-CH * .4} V0 Z`, fill: "#3a86ff", "stroke-width": 7, transform: `translate(0 ${-CH * .16})`}), s.car);
  el("path", A6({d: `M${CL * .25} ${-CH * .66} L${CL * .35} ${-CH * .92} H${CL * .52} V${-CH * .66} Z M${CL * .55} ${-CH * .92} H${CL * .68} L${CL * .8} ${-CH * .66} H${CL * .55} Z`, fill: "#caf0f8", "stroke-width": 5, transform: `translate(0 ${-CH * .16})`}), s.car);
  [.2, .78].forEach(k => { el("circle", A6({cx: CL * k, cy: -CH * .2, r: CH * .2, fill: "#22223b", "stroke-width": 6}), s.car); el("circle", {cx: CL * k, cy: -CH * .2, r: CH * .09, fill: "#ced4da"}, s.car); });
  s.lcar = chip(st, "a car: about 4.5 m", "#3a86ff", {fs: 34});
  s.q = tx(st, {x: 0, y: 0, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Why is it so long? ❓");
  s.ans = chip(st, "Answer next time!", "#f72585", {fs: 44});
  s.run = t => { const a = (w, f) => cue("think", w, f), t6 = a("six", .32), tc = a("longer", .5), tw = a("why", .66);
    popAt(s.title, 0, 0, t, SC.think.t0 - .2);
    const un = ramp(t, t6 - .4, t6 + 1.4); tf(s.coil, `translate(${lerp(600, 160, ramp(t, t6 - .6, t6 - .1))} ${lerp(300, 240, ramp(t, t6 - .6, t6 - .1))}) scale(${Math.max(0, pop(t, a("small", .18) - .2)) * (1 - ramp(t, t6 - .2, t6 + .3))})`);
    [s.lo, s.lc].forEach(p => { set(p, "stroke-dasharray", `${1000 * un} 2000`); }); op(s.long, t > t6 - .4 ? 1 : 0); op(s.rule, ramp(t, t6, t6 + .5)); popAt(s.l6, 600, 205, t, t6 + .2);
    const ck = ramp(t, tc - .4, tc + .4); tf(s.car, `translate(${lerp(-1100, X0, ck)} 770)`); popAt(s.lcar, 1085, 725, t, tc + .3);
    popAt(s.ans, 1030, 580, t, a("next", .9));
    tf(s.q, `translate(720 100) scale(${Math.max(0, pop(t, tw))})`); op(s.title, 1 - ramp(t, tw - .3, tw)); }; return s; })();

// ---- CLOSE: what to remember, then next time's teaser (rows from CFG.close)
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440"); wrap6(s, 1.15, -90, -40);
  const CL = CFG.close || {}, rows = CL.rows || [];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 40}), w, f, y: 130 + i * 150}));
  s.plop = el("g", {}, s.stage); emo(s.plop, -150, 0, 110, "🚽"); tf(lump6(s.plop), "translate(-10 0) scale(.8)");
  tx(s.plop, {x: 70, y: 28, "font-size": 80, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "plop!");
  s.tease = chip(s.stage, CL.tease || "Next time!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85), tp = cue("close", "plop", .76);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.plop, 560, 600, t, tp - .15); op(s.plop, ramp(t, tp - .2, tp) * (1 - .6 * ramp(t, tn - .2, tn + .3)));
    popAt(s.tease, 600, 775, t, tn); }; return s; })();
