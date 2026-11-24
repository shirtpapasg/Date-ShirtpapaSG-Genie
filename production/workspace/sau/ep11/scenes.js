/* TheOneApp, Explored EP11 "How do you build a chip that helps AI think?" (P5 electrical systems: the switch; P4 light: light
   travels in straight lines, an opaque object blocks light and forms a shadow; P4 heat: heat flows from a hotter to a colder object).
   This file: the drawings every EP11 scene shares and the narrated scenes. Picture-only shots are in ep11/pov.js; the real maps in
   ep11/geo11.js (made by ep11/geo11.py from Natural Earth). scenes.js is built from this file by ep11/build.sh (it copies in the
   series' pupil from ep02/coldopen.js as kKid).
   Rule 9 (true to the science and the world): one Blackwell die is about 26 x 33 mm (about a postage stamp) and holds about 104
   billion transistors (the GPU is two dies, 208 billion); a 300 mm wafer is about 0.8 mm thick (a coin is about 2 mm); a silicon
   crystal (ingot) is pulled from the melt on a turning seed, 30 cm across and up to about 2 m long; silica is SiO2 (one silicon to
   two oxygen); light from the lamp goes in straight lines; the mask's chrome is opaque and the special layer (photoresist) under
   it stays in shadow; heat flows from the hot chip to the cool water. No faces of real people: Jensen Huang is a name plate.
   Rule 10: one kind of label per row. */

const kA = (a, b) => Object.assign({stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, a, b || {});
const kDefs = () => $("v").querySelector("defs"); let kUid = 0;
function kGrad(stops, kind = "linearGradient", attrs = {x1: 0, y1: 0, x2: 0, y2: 1}) { const id = "kg" + (++kUid), g = el(kind, Object.assign({id}, attrs), kDefs());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
const kT = (p, x, y, s, fs = 40, fill = "#fff", o = {}) => tx(p, Object.assign({x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: fill === INK ? "" : "out", "stroke-width": fs * .2}, o), s);
// narrated scenes: the 1200 x 900 picture fills the screen left of the key-word shelf (episode); as it is in a Short
const kW = s => el("g", {transform: SHORT ? "" : "translate(650 432) scale(1.12) translate(-600 -450)"}, s.stage);
const kPop = (e, x, y, t, a, s = 1, r = 0) => { tf(e, `translate(${x} ${y}) rotate(${r}) scale(${s * Math.max(0, pop(t, a))})`); op(e, ramp(t, a - .05, a + .1)); };
const kHash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
function kClip(p, shape) { const id = "kc" + (++kUid), cp = el("clipPath", {id}, kDefs()); el(shape[0], shape[1], cp); return el("g", {"clip-path": `url(#${id})`}, p); }
const kTick = (p, r = 40) => { const g = el("g", {}, p), d = `M${-r} ${r * .1} L${-r * .3} ${r * .8} L${r} ${-r * .8}`; el("path", {d, fill: "none", stroke: INK, "stroke-width": r * .52, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); el("path", {d, fill: "none", stroke: "#06d6a0", "stroke-width": r * .32, "stroke-linecap": "round", "stroke-linejoin": "round"}, g); return g; };
function kArrow(p, len, col = "#ffbe0b", w = 26) { const g = el("g", {}, p); el("path", {d: `M0 ${-w / 2} H${len - w * 1.6} V${-w * 1.3} L${len} 0 L${len - w * 1.6} ${w * 1.3} V${w / 2} H0 Z`, fill: col, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); return g; }
// the pupil (copied from ep02/coldopen.js krKid): side view, facing right, feet at (0, 0)
function kKid(p) { const K = el("g", {}, p), SKIN = "#f1c27d", BLUE = "#3a86ff", NAVY = "#1d3557", HAIR = "#3d2c1e", o = {stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"};
  const A = (a, b) => Object.assign({}, o, a, b || {});
  K.sh = el("ellipse", {cx: 6, cy: 2, rx: 92, ry: 15, fill: INK, opacity: .22}, K);
  K.body = el("g", {}, K);
  const leg = far => { const g = el("g", {}, K.body);
    el("rect", A({x: -17, y: -6, width: 34, height: 96, rx: 15, fill: far ? "#dba968" : SKIN}), g);
    el("rect", A({x: -17, y: 62, width: 34, height: 34, rx: 6, fill: "#fff"}), g);                               // sock
    el("path", A({d: "M-20 92 H24 Q44 94 44 110 Q44 120 34 120 H-20 Z", fill: far ? "#2b2b45" : "#33334f"}), g); return g; };       // school shoe
  K.bag = el("g", {}, K.body);
  el("rect", A({x: -104, y: -316, width: 78, height: 150, rx: 22, fill: "#e63946"}), K.bag); el("rect", A({x: -98, y: -238, width: 50, height: 56, rx: 12, fill: "#ff7b54", "stroke-width": 5}), K.bag);
  el("path", A({d: "M-84 -316 Q-66 -340 -46 -318", fill: "none", "stroke-width": 7}), K.bag);
  K.armF = el("g", {}, K.body); el("rect", A({x: -13, y: 36, width: 26, height: 70, rx: 13, fill: "#dba968"}), K.armF); el("rect", A({x: -17, y: -8, width: 34, height: 58, rx: 15, fill: "#2f6fd6"}), K.armF);
  K.legF = leg(1); K.legN = leg(0);
  K.torso = el("g", {}, K.body);
  el("path", A({d: "M-50 -186 H50 L54 -112 H4 L0 -136 L-4 -112 H-54 Z", fill: NAVY}), K.torso);                                   // shorts
  el("rect", A({x: -54, y: -326, width: 108, height: 152, rx: 30, fill: BLUE}), K.torso);                                          // school shirt
  el("rect", A({x: 6, y: -278, width: 34, height: 34, rx: 6, fill: "#fff", "stroke-width": 4}), K.torso);                          // pocket (no badge: no real school)
  el("path", A({d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: INK, "stroke-width": 18}), K.torso); el("path", {d: "M-30 -326 Q-14 -252 -50 -212", fill: "none", stroke: "#c1121f", "stroke-width": 9, "stroke-linecap": "round"}, K.torso);   // bag strap
  K.head = el("g", {}, K.body);
  el("rect", A({x: -15, y: -340, width: 34, height: 30, fill: SKIN, "stroke-width": 5}), K.head);
  el("path", A({d: "M-26 -324 L4 -300 L34 -324 L22 -336 H-14 Z", fill: "#fff", "stroke-width": 5}), K.head);                       // collar
  el("circle", A({cx: 6, cy: -402, r: 80, fill: SKIN}), K.head);
  el("path", A({d: "M-72 -372 Q-92 -486 0 -488 Q84 -490 88 -420 Q60 -446 22 -448 Q-4 -444 -14 -412 Q-22 -384 -40 -352 Q-66 -352 -72 -372 Z", fill: HAIR}), K.head);   // hair: fringe and the back of the head
  el("path", A({d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 9}), K.head); el("path", {d: "M-8 -487 Q0 -506 16 -500", fill: "none", stroke: HAIR, "stroke-width": 6, "stroke-linecap": "round"}, K.head);
  el("ellipse", A({cx: -18, cy: -394, rx: 13, ry: 17, fill: SKIN, "stroke-width": 5}), K.head);                                     // ear
  el("circle", {cx: 26, cy: -370, r: 15, fill: "#ff8fa3", opacity: .6}, K.head);                                                    // cheek
  K.eyes = el("g", {}, K.head);
  [[32, 11, 15], [66, 9, 14]].forEach(([x, rx, ry]) => { el("ellipse", {cx: x, cy: -404, rx, ry, fill: INK}, K.eyes); el("circle", {cx: x + 3, cy: -410, r: 4.4, fill: "#fff"}, K.eyes); });
  K.brow = el("g", {}, K.head); [[20, 44], [58, 76]].forEach(([a, b]) => el("path", {d: `M${a} -430 Q${(a + b) / 2} -437 ${b} -431`, fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round"}, K.brow));
  K.m0 = el("path", {d: "M38 -372 Q52 -362 66 -372", fill: "none", stroke: INK, "stroke-width": 5.5, "stroke-linecap": "round"}, K.head);          // small smile
  K.m1 = el("g", {opacity: 0}, K.head); el("path", A({d: "M34 -376 Q52 -371 72 -378 Q69 -348 51 -348 Q37 -350 34 -376 Z", fill: "#7a1c1c", "stroke-width": 5}), K.m1); el("path", {d: "M39 -372 Q52 -368 68 -373 L67 -366 Q52 -362 40 -365 Z", fill: "#fff"}, K.m1);   // big open smile
  K.armN = el("g", {}, K.body);
  el("rect", A({x: -14, y: 36, width: 28, height: 92, rx: 14, fill: SKIN}), K.armN); K.finger = el("rect", A({x: -6, y: 122, width: 12, height: 28, rx: 6, fill: SKIN, "stroke-width": 4.5}), K.armN);
  el("circle", A({cx: 0, cy: 126, r: 17, fill: SKIN, "stroke-width": 5}), K.armN);
  el("rect", A({x: -19, y: -10, width: 38, height: 62, rx: 17, fill: BLUE}), K.armN);
  return K; }
function kPose(K, sw = 0, arm) { tf(K.legN, `translate(16 -120) rotate(${sw})`); tf(K.legF, `translate(-14 -120) rotate(${-sw})`); tf(K.armF, `translate(-6 -300) rotate(${sw * .9})`);
  tf(K.armN, `translate(10 -300) rotate(${arm === undefined ? -sw * .9 : arm})`); }

// ============================================================ EP11 DRAWINGS ============================================================
// YOU: two eyes and a smile that ride on whatever you are (a grain, a pot of silicon, a crystal, a wafer, a chip). blink(t).
function kFace(p, r = 30) { const F = el("g", {}, p); F.eyes = el("g", {}, F);
  [-1, 1].forEach(s => { el("ellipse", {cx: s * r * .42, cy: -r * .12, rx: r * .17, ry: r * .24, fill: INK}, F.eyes); el("circle", {cx: s * r * .42 + r * .05, cy: -r * .2, r: r * .07, fill: "#fff"}, F.eyes); });
  el("path", {d: `M${-r * .3} ${r * .28} Q0 ${r * .55} ${r * .3} ${r * .28}`, fill: "none", stroke: INK, "stroke-width": Math.max(3, r * .11), "stroke-linecap": "round"}, F);
  F.blink = t => { const k = (t * .37) % 1; tf(F.eyes, `scale(1 ${k > .96 ? .15 : 1})`); }; return F; }
// a grain of sand (quartz): pale, glassy, irregular; r = size
function kGrain(p, r, sd, col = "#f2d49b") { const g = el("g", {}, p); seed = sd; const P = [];
  for (let k = 0; k < 9; k++) { const an = k / 9 * Math.PI * 2, rr = r * (.75 + .35 * rnd()); P.push([Math.cos(an) * rr, Math.sin(an) * rr * .85]); }
  const d = `M${(P[8][0] + P[0][0]) / 2} ${(P[8][1] + P[0][1]) / 2} ` + P.map((q, k) => { const n = P[(k + 1) % 9]; return `Q${q[0]} ${q[1]} ${(q[0] + n[0]) / 2} ${(q[1] + n[1]) / 2}`; }).join(" ") + " Z";
  g.body = el("path", {d, fill: col, stroke: INK, "stroke-width": Math.max(2.5, r * .08)}, g);
  el("path", {d: `M${-r * .45} ${-r * .3} Q${-r * .2} ${-r * .55} ${r * .15} ${-r * .48}`, fill: "none", stroke: "#fff", "stroke-width": Math.max(2, r * .12), "stroke-linecap": "round", opacity: .75}, g); return g; }
// a computer-chip die (top view), w x h: a silicon square with many identical cores (a GPU is many small cores side by side)
function kDie(p, w, h, o = {}) { const g = el("g", {}, p), C = o.cols || 8, R = o.rows || 10;
  el("rect", kA({x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(w, h) * .03, fill: kGrad([[0, "#5a4fcf"], [.35, "#2a9d8f"], [.6, "#4361ee"], [1, "#7b2cbf"]], "linearGradient", {x1: 0, y1: 0, x2: 1, y2: 1}), "stroke-width": Math.max(3, w * .02)}), g);
  const m = w * .07, cw = (w - 2 * m) / C, ch = (h - 2 * m - h * .12) / R; g.cores = [];
  for (let i = 0; i < C; i++) for (let j = 0; j < R; j++) g.cores.push(el("rect", {x: -w / 2 + m + i * cw + cw * .1, y: -h / 2 + m + j * ch + ch * .1, width: cw * .8, height: ch * .8, rx: cw * .08, fill: "#c8b6ff", opacity: .55}, g));
  el("rect", {x: -w / 2 + m, y: h / 2 - m - h * .1, width: w - 2 * m, height: h * .09, rx: 4, fill: "#ffd166", opacity: .6}, g);   // the memory link along one edge
  el("path", {d: `M${-w * .4} ${-h * .44} L${w * .1} ${-h * .44}`, stroke: "#fff", "stroke-width": w * .03, "stroke-linecap": "round", opacity: .5}, g); return g; }
// a postage stamp, w x h, with perforated edges and an orchid
function kStamp(p, w, h) { const g = el("g", {}, p), n = 9, r = w / n / 3.2; let d = `M${-w / 2} ${-h / 2}`;
  for (let i = 0; i < n; i++) d += ` H${-w / 2 + (i + .5) * w / n - r} a${r} ${r} 0 0 0 ${2 * r} 0`; d += ` H${w / 2}`;
  const m = Math.round(n * h / w); for (let i = 0; i < m; i++) d += ` V${-h / 2 + (i + .5) * h / m - r} a${r} ${r} 0 0 0 0 ${2 * r}`; d += ` V${h / 2}`;
  for (let i = n - 1; i >= 0; i--) d += ` H${-w / 2 + (i + .5) * w / n + r} a${r} ${r} 0 0 0 ${-2 * r} 0`; d += ` H${-w / 2}`;
  for (let i = m - 1; i >= 0; i--) d += ` V${-h / 2 + (i + .5) * h / m + r} a${r} ${r} 0 0 0 0 ${-2 * r}`; d += " Z";
  el("path", {d, fill: "#fffdf5", stroke: INK, "stroke-width": 4}, g);
  el("rect", kA({x: -w * .38, y: -h * .4, width: w * .76, height: h * .68, fill: "#bde0fe", "stroke-width": 3}), g);
  for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 - Math.PI / 2; el("ellipse", {cx: Math.cos(a) * w * .12, cy: -h * .08 + Math.sin(a) * w * .12, rx: w * .1, ry: w * .055, transform: `rotate(${a * 180 / Math.PI} ${Math.cos(a) * w * .12} ${-h * .08 + Math.sin(a) * w * .12})`, fill: "#c77dff", stroke: INK, "stroke-width": 2.5}, g); }
  el("circle", {cx: 0, cy: -h * .08, r: w * .05, fill: "#ffd60a", stroke: INK, "stroke-width": 2.5}, g);
  el("path", {d: `M0 ${-h * .02} Q${w * .05} ${h * .12} ${-w * .02} ${h * .25}`, fill: "none", stroke: "#2d6a4f", "stroke-width": 5, "stroke-linecap": "round"}, g);
  tx(g, {x: 0, y: h * .4, "text-anchor": "middle", "font-size": w * .1, "font-weight": 700, fill: INK}, "STAMP"); return g; }
// a computer chip in its case (package): green board, gold pads, the die under a metal lid
function kPackage(p, s = 300, face) { const g = el("g", {}, p);
  el("rect", kA({x: -s / 2, y: -s / 2, width: s, height: s, rx: s * .05, fill: "#2d6a4f"}), g);
  for (let i = 0; i < 12; i++) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([a, b]) => { const u = -s * .4 + i * s * .8 / 11;
    el("rect", {x: a ? a * s * .46 - s * .015 : u - s * .015, y: b ? b * s * .46 - s * .015 : u - s * .015, width: s * .03, height: s * .03, fill: "#ffd166"}, g); });
  g.lid = el("rect", kA({x: -s * .34, y: -s * .34, width: s * .68, height: s * .68, rx: s * .04, fill: kGrad([[0, "#e9ecef"], [1, "#adb5bd"]]), "stroke-width": 5}), g);
  tx(g, {x: 0, y: s * .06, "text-anchor": "middle", "font-size": s * .14, "font-weight": 700, fill: "#495057"}, "GPU"); return g; }
// a little light switch / transistor tile: on = glowing, off = dark
function kTile(p, s = 40) { const g = el("g", {}, p); g.r = el("rect", {x: -s / 2, y: -s / 2, width: s, height: s, rx: s * .18, fill: "#22223b", stroke: INK, "stroke-width": 2}, g); return g; }
// a school pupil at a desk (front view, tiny): for the hall and the class
function kPupil(p, s = 1, shirt = "#3a86ff") { const g = el("g", {transform: `scale(${s})`}, p);
  el("circle", kA({cx: 0, cy: -58, r: 22, fill: "#f1c27d", "stroke-width": 4}), g); el("path", {d: "M-22 -62 Q-20 -86 0 -84 Q22 -86 22 -62 Q10 -74 -22 -62 Z", fill: "#3d2c1e", stroke: INK, "stroke-width": 3}, g);
  el("path", kA({d: "M-26 -10 Q-26 -36 0 -36 Q26 -36 26 -10 Z", fill: shirt, "stroke-width": 4}), g);
  el("rect", kA({x: -40, y: -12, width: 80, height: 20, rx: 4, fill: "#d9a066", "stroke-width": 4}), g); return g; }
// a sum card a pupil holds: "3 x 4"
function kCard(p, s, w = 70) { const g = el("g", {}, p); el("rect", kA({x: -w / 2, y: -20, width: w, height: 40, rx: 8, fill: "#fff", "stroke-width": 3}), g); tx(g, {x: 0, y: 9, "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: INK}, s); return g; }
// a silicon crystal (ingot) standing up: seed on top, a cone (shoulder), the body; h = length of the body
function kIngot(p, r, h, face) { const g = el("g", {}, p), sh = kGrad([[0, "#6c757d"], [.25, "#dee2e6"], [.45, "#adb5bd"], [.8, "#495057"], [1, "#343a40"]], "linearGradient", {x1: 0, y1: 0, x2: 1, y2: 0});
  g.body = el("path", kA({d: `M${-r * .08} 0 L${-r} ${r * .9} V${r * .9 + h} Q0 ${r * 1.3 + h} ${r} ${r * .9 + h} V${r * .9} L${r * .08} 0 Z`, fill: sh, "stroke-width": 5}), g);
  g.st = el("g", {}, g); for (let i = 0; i < 5; i++) g.st.appendChild(el("path", {d: "", stroke: "#fff", "stroke-width": 4, opacity: .35, fill: "none"}));
  g.spin = t => g.st.childNodes.forEach((e, i) => { const x = r * Math.sin(((t * .9 + i / 5) % 1) * Math.PI * 2 - Math.PI / 2); set(e, "d", `M${x * .98} ${r * .9 + 10} V${r * .9 + h - 6}`); op(e, .35 * Math.cos(((t * .9 + i / 5) % 1) * Math.PI * 2 - Math.PI / 2) ** 2 * (x > -r * .9 ? 1 : 0)); });
  return g; }
// a cut-away compost bin (for last time's answer)
function kBin(p) { const B = el("g", {}, p); el("ellipse", {cx: 0, cy: 4, rx: 170, ry: 18, fill: INK, opacity: .18}, B);
  el("path", kA({d: "M-130 -330 H130 L150 0 H-150 Z", fill: "#2d6a4f"}), B);
  B.in = el("path", kA({d: "M-110 -260 H110 L124 -26 H-124 Z", fill: "#5c3d2e", "stroke-width": 5}), B);
  seed = 4; B.bits = []; for (let i = 0; i < 16; i++) { B.bits.push(el("ellipse", {cx: -95 + rnd() * 190, cy: -230 + rnd() * 190, rx: 14 + rnd() * 10, ry: 8 + rnd() * 5, fill: ["#f4a261", "#e9c46a", "#90be6d", "#f77f00"][i % 4], stroke: INK, "stroke-width": 2.5, }, B)); B.bits[i].setAttribute("transform", `rotate(${rnd() * 180} ${B.bits[i].getAttribute("cx")} ${B.bits[i].getAttribute("cy")})`); }
  B.bugs = []; for (let i = 0; i < 22; i++) { const b = el("g", {}, B); el("ellipse", {rx: 7, ry: 4, fill: i % 3 ? "#ffffff" : "#c77dff", stroke: INK, "stroke-width": 2}, b); b.x = -95 + rnd() * 190; b.y = -235 + rnd() * 200; b.ph = rnd() * 6; B.bugs.push(b); }
  el("path", kA({d: "M-148 -350 Q-148 -372 -120 -374 H120 Q148 -372 148 -350 Z", fill: "#1b4332"}), B);
  el("rect", kA({x: -40, y: -128, width: 80, height: 0.1, fill: "none", "stroke-width": 0}), B); return B; }
// a thermometer: k = 0 cold .. 1 hot
function kTherm(p) { const g = el("g", {}, p); el("rect", kA({x: -20, y: -170, width: 40, height: 250, rx: 20, fill: "#fff"}), g); el("circle", kA({cx: 0, cy: 100, r: 38, fill: "#e63946"}), g);
  g.m = el("rect", {x: -9, width: 18, fill: "#e63946"}, g); for (let i = 0; i < 5; i++) el("line", {x1: 20, y1: -140 + i * 44, x2: 38, y2: -140 + i * 44, stroke: INK, "stroke-width": 4, "stroke-linecap": "round"}, g);
  g.set = k => { const h = lerp(30, 215, clamp(k)); set(g.m, "y", 78 - h); set(g.m, "height", h); }; g.set(0); return g; }
// wavy heat lines rising from (x, y)
function kHeat(p, n = 3, col = "#ff922b") { const g = el("g", {}, p); g.L = []; for (let i = 0; i < n; i++) g.L.push(el("path", {fill: "none", stroke: col, "stroke-width": 9, "stroke-linecap": "round"}, g));
  g.run = (t, x, y, w = 140, k = 1) => g.L.forEach((e, i) => { const f = (t * .6 + i / n) % 1, xx = x - w / 2 + i * w / Math.max(1, n - 1), yy = y - f * 90; set(e, "d", `M${xx} ${yy} q14 -18 0 -36 q-14 -18 0 -36`); op(e, k * Math.sin(Math.PI * f)); }); return g; }
// a clean-room worker in a white suit from head to toe (hood, mask, goggles, gloves, boots; no face shows)
function kSuit(p, s = 1) { const g = el("g", {transform: `scale(${s})`}, p);
  el("path", kA({d: "M-56 -10 L-48 -230 Q-46 -262 0 -264 Q46 -262 48 -230 L56 -10 Z", fill: "#f8f9fa"}), g);      // the suit
  el("rect", kA({x: -54, y: -20, width: 46, height: 30, rx: 10, fill: "#ade8f4"}), g); el("rect", kA({x: 8, y: -20, width: 46, height: 30, rx: 10, fill: "#ade8f4"}), g);   // boots
  el("rect", kA({x: -88, y: -230, width: 32, height: 130, rx: 16, fill: "#f8f9fa"}), g); el("rect", kA({x: 56, y: -230, width: 32, height: 130, rx: 16, fill: "#f8f9fa"}), g);
  el("circle", kA({cx: -72, cy: -96, r: 18, fill: "#48cae4"}), g); el("circle", kA({cx: 72, cy: -96, r: 18, fill: "#48cae4"}), g);                                         // gloves
  el("path", kA({d: "M-50 -270 Q-52 -350 0 -352 Q52 -350 50 -270 Q50 -244 0 -240 Q-50 -244 -50 -270 Z", fill: "#f8f9fa"}), g);                                              // hood
  el("rect", kA({x: -36, y: -318, width: 72, height: 30, rx: 12, fill: "#8ecae6", "stroke-width": 5}), g);                                                                       // goggles
  el("path", kA({d: "M-32 -284 H32 Q30 -256 0 -254 Q-30 -256 -32 -284 Z", fill: "#e9ecef", "stroke-width": 4}), g);                                                             // mask
  el("line", {x1: 0, y1: -232, x2: 0, y2: -40, stroke: "#adb5bd", "stroke-width": 4}, g); return g; }
// a dust speck (fuzzy grey)
function kDust(p, r) { const g = el("g", {}, p); seed = 77; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28; el("circle", {cx: Math.cos(a) * r * .4 * rnd(), cy: Math.sin(a) * r * .4 * rnd(), r: r * (.35 + .3 * rnd()), fill: "#8d8f99", stroke: INK, "stroke-width": 2.5}, g); } return g; }
// a world-map pin
function kPin(p, col = "#e63946", s = 1) { const g = el("g", {}, p); el("path", kA({d: "M0 0 Q-30 -40 -30 -62 A30 30 0 1 1 30 -62 Q30 -40 0 0 Z", fill: col, "stroke-width": 5, transform: `scale(${s})`}), g); el("circle", {cx: 0, cy: -62 * s, r: 11 * s, fill: "#fff"}, g); return g; }
// a factory icon (wafer fab): low building with a clean-room roof and air units
function kFab(p, s = 1, col = "#ffd166") { const g = el("g", {transform: `scale(${s})`}, p); el("rect", kA({x: -60, y: -50, width: 120, height: 50, rx: 4, fill: col, "stroke-width": 5}), g);
  [-34, 0, 34].forEach(x => el("rect", kA({x: x - 11, y: -68, width: 22, height: 18, fill: "#adb5bd", "stroke-width": 4}), g)); el("rect", kA({x: -50, y: -36, width: 100, height: 12, fill: "#fff", "stroke-width": 3}), g); return g; }

// ============================================================ NARRATED SCENES ============================================================

// ---- HOOK: one chip die, about the size of a postage stamp; inside, more than a hundred billion switches, every one drawn with light
S.hook = (() => { const s = scene("hook", "#10002b", "#3c096c"), st = kW(s);
  s.glow = el("circle", {cx: 0, cy: 0, r: 260, fill: "#7b2cbf", filter: "url(#blur)", opacity: .7}, st);
  s.cam = el("g", {}, st);
  s.die = el("g", {}, s.cam); kDie(s.die, 260, 330); s.stamp = el("g", {}, s.cam); kStamp(s.stamp, 290, 350);
  s.ld = kT(st, 0, 0, "one chip", 46, "#fff"); s.ls = kT(st, 0, 0, "a postage stamp", 46, "#fff");
  s.sz = chip(st, "about the same size", "#f72585", {fs: 40});
  // inside: tiles that are switches (the zoomed-in view)
  s.in = kClip(st, ["rect", {x: 120, y: 60, width: 960, height: 720, rx: 40}]); el("rect", {x: 120, y: 60, width: 960, height: 720, fill: "#14142b"}, s.in);
  s.tiles = []; for (let i = 0; i < 24; i++) for (let j = 0; j < 18; j++) { const g = kTile(s.in, 34); tf(g, `translate(${150 + i * 40} ${90 + j * 40})`); g.i = i; g.j = j; s.tiles.push(g); }
  s.frame = el("rect", {x: 120, y: 60, width: 960, height: 720, rx: 40, fill: "none", stroke: "#fff", "stroke-width": 8}, st);
  s.num = el("g", {}, st); el("rect", kA({x: -400, y: -70, width: 800, height: 140, rx: 70, fill: "#fff", "stroke-width": 8, filter: "url(#sh)"}), s.num);
  tx(s.num, {x: 0, y: -6, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#7209b7"}, "100,000,000,000+"); tx(s.num, {x: 0, y: 46, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "more than a hundred billion switches");
  s.beam = el("rect", {x: 0, y: 60, width: 70, height: 720, fill: kGrad([[0, "#fff", 0], [.5, "#fffbe0", .95], [1, "#fff", 0]], "linearGradient", {x1: 0, y1: 0, x2: 1, y2: 0})}, st);
  s.lt = kT(st, 600, 860, "drawn… with LIGHT ✨", 70, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("hook", w, f), t0 = SC.hook.t0, tS = a("stamp", .28), tI = a("inside", .42), tB = a("billion", .55), tD = a("drawn", .82), tL = a("light", .9);
    const kIn = ramp(t, tI - .2, tI + .5); op(s.glow, .6 + .2 * Math.sin(t * 2));
    tf(s.die, `translate(${lerp(600, 400, ramp(t, tS - .9, tS - .3))} 450) scale(${Math.max(0, pop(t, t0 - .1, .6)) * (1.3 + 2.5 * kIn)})`);
    kPop(s.stamp, 820, 450, t, tS - .6, 1.3); op(s.stamp, ramp(t, tS - .6, tS - .4) * (1 - kIn));
    op(s.ld, on(t, tS - .5, tI - .2, .2)); tf(s.ld, "translate(400 710)"); set(s.ld, "x", 0); op(s.ls, on(t, tS - .4, tI - .2, .2)); tf(s.ls, "translate(820 710)"); set(s.ls, "x", 0);
    kPop(s.sz, 600, 150, t, tS + .1); op(s.sz, on(t, tS + .1, tI - .2, .2));
    op(s.in, kIn); op(s.frame, kIn); op(s.die, 1 - ramp(t, tI + .2, tI + .5));
    const sweep = ramp(t, tD - .2, tL + .9), bx = lerp(100, 1100, sweep);
    s.tiles.forEach(g => { const x = 150 + g.i * 40, lit = x < bx ? 1 : 0, f = kHash(g.i, g.j + Math.floor(t * 6)) > .5;
      set(g.r, "fill", lit ? (f ? "#ffd60a" : "#7b2cbf") : (t < tD - .2 && f && t > tB ? "#4cc9f0" : "#22223b")); });
    set(s.beam, "x", bx - 35); op(s.beam, on(t, tD - .2, tL + 1.1, .2));
    kPop(s.num, 600, 420, t, tB - .3); op(s.num, on(t, tB - .3, tD - .3, .2)); kPop(s.lt, 0, 0, t, tL - .1); tf(s.lt, `translate(600 ${790}) scale(${Math.max(0, pop(t, tL - .1))})`); set(s.lt, "x", 0); set(s.lt, "y", 0); };
  return s; })();

// ---- LAST TIME'S ANSWER (EP10): why does a compost bin get warm inside? Decomposers give off heat as they work.
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#7209b7"), st = kW(s);
  s.top = chip(st, "✅ Last time: why does a compost bin get warm inside?", "#06d6a0", {fs: 36, ink: INK});
  s.bg = el("g", {transform: "translate(430 790) scale(1.35)"}, st); s.bin = kBin(s.bg); s.heat = kHeat(st, 4);
  s.th = kTherm(st); tf(s.th, "translate(860 520)");
  s.mag = el("g", {}, st); el("circle", kA({r: 120, fill: "#5c3d2e", "stroke-width": 8}), s.mag); s.mb = []; seed = 12;
  for (let i = 0; i < 9; i++) { const b = el("g", {}, s.mag); el("ellipse", {rx: 18, ry: 10, fill: i % 3 ? "#fff" : "#c77dff", stroke: INK, "stroke-width": 3}, b); b.x = -70 + rnd() * 140; b.y = -60 + rnd() * 120; b.ph = rnd() * 6; s.mb.push(b); }
  el("circle", {r: 120, fill: "none", stroke: "#fff", "stroke-width": 10}, s.mag); s.ml = chip(st, "decomposers", "#c77dff", {fs: 36});
  s.c1 = chip(st, "they give off heat 🔥", "#e63946", {fs: 40}); s.c2 = chip(st, "A busy bin is a warm bin!", "#ffbe0b", {fs: 46, ink: INK});
  s.run = t => { const a = (w, f) => cue("answer", w, f), t0 = SC.answer.t0, tD = a("decomposers", .4), tH = a("heat", .7), tB = a("busy", .85), kH = ramp(t, tH - .5, tH + 1.2);
    kPop(s.top, 600, 125, t, t0 - .2); op(s.bg, ramp(t, t0, t0 + .3));
    s.bin.bugs.forEach(b => { tf(b, `translate(${b.x + 5 * Math.sin(t * 3 + b.ph)} ${b.y + 4 * Math.cos(t * 2.6 + b.ph)})`); op(b, ramp(t, tD - .3, tD + .2)); });
    kPop(s.mag, 820, 330, t, tD - .1); s.mb.forEach(b => tf(b, `translate(${b.x + 8 * Math.sin(t * 3 + b.ph)} ${b.y + 6 * Math.cos(t * 2.4 + b.ph)}) rotate(${40 * Math.sin(t + b.ph)})`)); kPop(s.ml, 820, 480, t, tD + .1);
    op(s.mag, on(t, tD - .1, tH - .3, .2)); op(s.ml, on(t, tD + .1, tH - .3, .2));
    op(s.th, ramp(t, tH - .4, tH)); s.th.set(kH); s.heat.run(t, 430, 300, 220, kH);
    kPop(s.c1, 760, 280, t, tH); kPop(s.c2, 600, 800, t, tB - .1); };
  return s; })();

// ---- THE NEWS: November 2026, Nvidia (Santa Clara, California) on a real globe; the CEO steps down, and is back 11 days later
S.news = (() => { const s = scene("news", "#0b132b", "#1c2541"), st = kW(s), G = GEO11.GLOBE;
  s.W = el("g", {}, st); el("circle", {cx: G.c[0], cy: G.c[1], r: G.r + 30, fill: "#4cc9f0", opacity: .18, filter: "url(#blur)"}, s.W);
  el("circle", kA({cx: G.c[0], cy: G.c[1], r: G.r, fill: kGrad([[0, "#4cc9f0"], [1, "#1d3557"]], "radialGradient", {cx: .4, cy: .35, r: .8})}), s.W);
  const gc = kClip(s.W, ["circle", {cx: G.c[0], cy: G.c[1], r: G.r}]); el("path", {d: G.grat, fill: "none", stroke: "#fff", "stroke-width": 1.5, opacity: .25}, gc);
  el("path", {d: G.land, fill: "#95d5b2", stroke: INK, "stroke-width": 2, "stroke-linejoin": "round"}, gc);
  el("circle", {cx: G.c[0], cy: G.c[1], r: G.r, fill: "none", stroke: INK, "stroke-width": 7}, s.W);
  s.rip = [0, 1, 2].map(() => el("circle", {cx: G.santaclara[0], cy: G.santaclara[1], fill: "none", stroke: "#ffd60a", "stroke-width": 6}, s.W));
  s.pin = kPin(s.W, "#e63946", 1.1); tf(s.pin, `translate(${G.santaclara[0]} ${G.santaclara[1]})`);
  s.pl = el("g", {}, s.W); el("rect", kA({x: 30, y: -150, width: 300, height: 92, rx: 16, fill: "#fff", "stroke-width": 5}), s.pl);
  tx(s.pl, {x: 180, y: -112, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "Nvidia"); tx(s.pl, {x: 180, y: -76, "text-anchor": "middle", "font-size": 24, "font-weight": 600, fill: "#495057"}, "Santa Clara, California");
  s.sgL = kT(s.W, G.sg[0] - 6, G.sg[1] + 44, "Singapore", 28, "#fff"); s.sgD = el("circle", {cx: G.sg[0], cy: G.sg[1], r: 10, fill: "#e63946", stroke: "#fff", "stroke-width": 4}, s.W);
  s.papers = [[150, 250], [1000, 560], [260, 720], [980, 180], [620, 120]].map(([x, y]) => { const e = emo(s.W, 0, 0, 74, "📰"); e.px = x; e.py = y; return e; });
  s.date = chip(st, "📅 November 2026", "#f72585", {fs: 46});
  // B: the boss's chair, a name plate and the calendar (no face)
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#f1e3d3"}, s.B); el("rect", {x: -300, y: 660, width: 1900, height: 500, fill: "#c9a227", opacity: .45}, s.B);
  s.light = el("path", {d: "M330 -100 L180 700 H620 L470 -100 Z", fill: "#fff3b0", opacity: .7}, s.B);
  s.chair = el("g", {transform: "translate(400 690)"}, s.B); el("rect", kA({x: -120, y: -430, width: 240, height: 300, rx: 50, fill: "#3d405b"}), s.chair); el("rect", kA({x: -140, y: -150, width: 280, height: 60, rx: 26, fill: "#3d405b"}), s.chair);
  el("rect", kA({x: -14, y: -90, width: 28, height: 70, fill: "#adb5bd"}), s.chair); el("path", kA({d: "M-110 -10 H110", "stroke-width": 14}), s.chair); [-110, 0, 110].forEach(x => el("circle", kA({cx: x, cy: 0, r: 14, fill: "#495057", "stroke-width": 4}), s.chair));
  s.desk = el("g", {transform: "translate(400 720)"}, s.B); el("rect", kA({x: -330, y: -110, width: 660, height: 40, rx: 8, fill: "#8d5524"}), s.desk); el("rect", kA({x: -300, y: -70, width: 50, height: 150, fill: "#6f4518"}), s.desk); el("rect", kA({x: 250, y: -70, width: 50, height: 150, fill: "#6f4518"}), s.desk);
  s.plate = el("g", {}, s.B); el("path", kA({d: "M-170 0 L-150 -80 H150 L170 0 Z", fill: "#2b2d42", "stroke-width": 5}), s.plate);
  tx(s.plate, {x: 0, y: -42, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#ffd166"}, "Jensen Huang"); tx(s.plate, {x: 0, y: -10, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "CEO");
  s.cal = el("g", {transform: "translate(930 330)"}, s.B); el("rect", kA({x: -150, y: -170, width: 300, height: 330, rx: 24, fill: "#fff"}), s.cal); el("rect", kA({x: -150, y: -170, width: 300, height: 80, rx: 24, fill: "#e63946"}), s.cal);
  tx(s.cal, {x: 0, y: -116, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "NOVEMBER"); s.day = tx(s.cal, {x: 0, y: 80, "text-anchor": "middle", "font-size": 170, "font-weight": 700, fill: INK}, "12");
  s.cnt = chip(st, "11 days later…", "#3a0ca3", {fs: 44}); s.bk = chip(st, "back as CEO", "#06d6a0", {fs: 46, ink: INK}); s.sd = chip(st, "stepped down for a short time", "#6c757d", {fs: 38});
  // C: why the world watches: chips are the engines of AI
  s.C = el("g", {}, st); s.cp = el("g", {transform: "translate(600 450)"}, s.C); kPackage(s.cp, 300);
  s.ais = [["💬", -380, -170], ["🤖", 380, -170], ["🖼️", -380, 220], ["🔬", 380, 220]].map(([e, x, y]) => { const g = el("g", {}, s.C); const ar = kArrow(g, 170, "#ffd60a", 22); tf(ar, `translate(600 450) rotate(${Math.atan2(y, x) * 180 / Math.PI}) translate(170 0)`); g.e = emo(g, 600 + x, 450 + y, 120, e); return g; });
  s.eng = chip(st, "the engines that run today's AI", "#f72585", {fs: 42});
  s.run = t => { const a = (w, f) => cue("news", w, f), t0 = SC.news.t0, tN = a("nvidia", .15), tW = a("world", .25), tF = a("founder", .3), tS = a("stepped", .36), tE = a("eleven", .46), tBk = a("came", .5), tWhy = a("why", .62), tEng = a("engines", .86);
    const kB = on(t, tF - .4, tWhy - .3, .4), kC = ramp(t, tWhy + 1.8, tWhy + 2.3);
    op(s.W, 1 - kB - kC < 0 ? 0 : 1 - Math.max(kB, kC)); tf(s.W, `translate(600 460) scale(${(1.05 + .08 * ramp(t, t0, tF)) * (1 + .1 * ramp(t, tWhy, tWhy + 2))}) translate(-600 -460)`);
    kPop(s.date, 600, 125, t, t0 - .2); op(s.date, on(t, t0 - .2, tF - .3, .2));
    kPop(s.pin, G.santaclara[0], G.santaclara[1], t, tN - .2, 1.1); op(s.pl, ramp(t, tN, tN + .3)); tf(s.pl, `translate(${G.santaclara[0] - 420} ${G.santaclara[1] + 50})`);
    s.rip.forEach((r, i) => { const f = ((t - tW) * .7 + i / 3) % 1; set(r, "r", Math.max(1, 20 + f * 260)); op(r, t > tW ? (1 - f) * .8 : 0); });
    s.papers.forEach((e, i) => { tf(e, `translate(${e.px} ${e.py}) scale(${Math.max(0, pop(t, tW + .1 + i * .12))}) rotate(${(i % 2 ? 1 : -1) * 10})`); op(e, ramp(t, tW, tW + .2)); });
    op(s.B, kB); const out = ramp(t, tS + .3, tS + .9), back = ramp(t, tBk - .1, tBk + .5);
    tf(s.plate, `translate(${400 + 1300 * out * (1 - back)} ${600 - 40 * Math.sin(Math.PI * out) * (1 - back)})`); op(s.light, .7 * (1 - .7 * out + .7 * back));
    const d = t < tE - .3 ? 12 : t > tE + .8 ? 23 : Math.round(lerp(12, 23, ramp(t, tE - .3, tE + .8))); s.day.textContent = String(d);
    kPop(s.sd, 400, 140, t, tS); op(s.sd, on(t, tS, tE - .2, .2)); kPop(s.cnt, 930, 600, t, tE - .2); op(s.cnt, on(t, tE - .2, tWhy, .2)); kPop(s.bk, 400, 140, t, tBk + .1); op(s.bk, on(t, tBk + .1, tWhy - .3, .2));
    op(s.C, kC); s.ais.forEach((g, i) => { op(g, ramp(t, tEng - .2 + i * .15, tEng + i * .15)); }); tf(s.cp, `translate(600 450) scale(${1 + .05 * Math.sin(t * 5) * ramp(t, tEng, tEng + .3)})`); kPop(s.eng, 600, 800, t, tEng); };
  return s; })();

// ---- GPUs draw video games: a picture is made of pixels; the GPU works out the colour of every dot, many times a second
S.pixels = (() => { const s = scene("pixels", "#14213d", "#3a0ca3"), st = kW(s), X0 = 200, Y0 = 140, CW = 800, CH = 520, NX = 40, NY = 26;
  s.card = el("g", {}, st); el("rect", kA({x: -330, y: -120, width: 660, height: 240, rx: 24, fill: "#2b2d42"}), s.card); [-160, 160].forEach(x => { const f = el("g", {transform: `translate(${x} 0)`}, s.card); el("circle", kA({r: 92, fill: "#495057"}), f); f.bl = el("g", {}, f); for (let k = 0; k < 7; k++) el("path", {d: "M0 0 Q30 -40 0 -84", fill: "none", stroke: "#adb5bd", "stroke-width": 12, "stroke-linecap": "round", transform: `rotate(${k * 360 / 7})`}, f.bl); el("circle", kA({r: 22, fill: "#343a40"}), f); s.card["f" + x] = f; });
  el("rect", kA({x: -300, y: 120, width: 600, height: 26, fill: "#ffd166", "stroke-width": 4}), s.card);
  s.gl = kT(st, 600, 0, "GPU", 110, "#ffe14d"); s.gn = kT(st, 600, 0, "graphics processing unit", 46, "#fff");
  // the game picture, drawn as NX x NY pixels (a sky, hills, a coin and a jumping pupil)
  const scr = el("g", {}, st); s.scr = scr; el("rect", kA({x: X0 - 30, y: Y0 - 30, width: CW + 60, height: CH + 60, rx: 26, fill: "#1b1b3a", "stroke-width": 8}), scr);
  const colAt = (i, j, k) => { const x = i / NX, y = j / NY, hill = .72 + .08 * Math.sin(x * 9 + k * .4), kx = .35 + .02 * Math.sin(k), ky = .58 - .18 * Math.abs(Math.sin(k * 1.6));
    if (Math.hypot((x - .78) * 1.6, y - .25) < .07) return "#ffd60a"; if (Math.abs(x - kx) < .025 && y > ky - .06 && y < ky + .1) return y < ky ? "#f1c27d" : "#3a86ff";
    if (y > hill + .12) return "#6b4423"; if (y > hill) return "#52b788"; return mix("#4cc9f0", "#bde0fe", y); };
  s.px = []; for (let i = 0; i < NX; i++) for (let j = 0; j < NY; j++) { const r = el("rect", {x: X0 + i * CW / NX, y: Y0 + j * CH / NY, width: CW / NX + .6, height: CH / NY + .6}, scr); r.i = i; r.j = j; s.px.push(r); }
  s.grid = el("g", {opacity: 0}, scr); for (let i = 0; i <= NX; i++) el("line", {x1: X0 + i * CW / NX, y1: Y0, x2: X0 + i * CW / NX, y2: Y0 + CH, stroke: INK, "stroke-width": 1.5}, s.grid); for (let j = 0; j <= NY; j++) el("line", {x1: X0, y1: Y0 + j * CH / NY, x2: X0 + CW, y2: Y0 + j * CH / NY, stroke: INK, "stroke-width": 1.5}, s.grid);
  s.scan = el("rect", {x: X0, width: CW, height: CH / NY, fill: "#fff", opacity: .55}, scr);
  s.zoom = el("g", {}, st); el("circle", kA({r: 150, fill: "#fff", "stroke-width": 8}), s.zoom); s.zc = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s.zc.push(el("rect", kA({x: -110 + i * 55, y: -110 + j * 55, width: 52, height: 52, rx: 6, "stroke-width": 3}), s.zoom));
  s.pl = chip(st, "pixels: tiny dots of colour", "#f72585", {fs: 40}); s.fast = chip(st, "🔁 many times every second", "#3a86ff", {fs: 40});
  s.run = t => { const a = (w, f) => cue("pixels", w, f), t0 = SC.pixels.t0, tG = a("games", .3), tP = a("picture", .38), tX = a("pixels", .6), tC = a("colour", .78), tM = a("many", .9);
    const kS = ramp(t, tG - .6, tG - .1);
    tf(s.card, `translate(600 ${380 - 60 * kS}) scale(${Math.max(0, pop(t, t0 - .1)) * (1 - kS)})`); s.card["f-160"] && [s.card["f-160"], s.card["f160"]].forEach(f => tf(f.bl, `rotate(${t * 400})`));
    tf(s.gl, `translate(0 ${200 - 40 * kS})`); set(s.gl, "x", 600); op(s.gl, ramp(t, t0, t0 + .3) * (1 - kS)); tf(s.gn, "translate(0 0)"); set(s.gn, "x", 600); set(s.gn, "y", 640); op(s.gn, ramp(t, a("graphics", .12), a("graphics", .12) + .3) * (1 - kS));
    const kX = ramp(t, tX - .3, tX + .6), fr = Math.floor(t * 8); op(scr, kS);
    tf(scr, `translate(600 400) scale(${lerp(1, SHORT ? 1.12 : 1.55, kX)}) translate(${-600 + lerp(0, SHORT ? 0 : -170, kX)} ${-400 + lerp(0, SHORT ? 0 : 60, kX)})`);
    s.px.forEach(r => set(r, "fill", colAt(r.i, r.j, t > tC ? fr : 0))); op(s.grid, .6 * kX);
    const sc = ((t - tC) * 3) % 1; set(s.scan, "y", Y0 + Math.floor(sc * NY) * CH / NY); op(s.scan, on(t, tC, tM + 2.5, .2));
    kPop(s.zoom, 1060, 640, t, tX + .2); op(s.zoom, on(t, tX + .2, tC, .2)); s.zc.forEach((r, i) => set(r, "fill", colAt(8 + (i / 4 | 0), 13 + i % 4, 0)));
    kPop(s.pl, 600, 800, t, tX); op(s.pl, on(t, tX, tM - .2, .2)); kPop(s.fast, 600, 800, t, tM - .1); };
  return s; })();

// ---- CPU vs GPU: one very clever teacher doing sums one after another, or a whole school hall of pupils, one small sum each, all at once
S.hall = (() => { const s = scene("hall", "#fff3d6", "#ffe0b2"), st = kW(s);
  s.L = el("g", {}, st); el("rect", kA({x: 30, y: 210, width: 500, height: 590, rx: 30, fill: "#fff", "stroke-width": 7}), s.L);
  s.wb = el("rect", kA({x: 80, y: 260, width: 400, height: 250, rx: 12, fill: "#f8f9fa", "stroke-width": 6}), s.L);
  s.sums = ["3 × 4 = 12", "7 × 6 = 42", "9 × 8 = 72", "5 × 5 = 25"].map((q, i) => tx(s.L, {x: 280, y: 320 + i * 54, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#3a0ca3"}, q));
  s.tch = el("g", {transform: "translate(280 700)"}, s.L); s.tk = kKid(s.tch); tf(s.tk, "scale(.38)");
  s.R = el("g", {}, st); el("rect", kA({x: 580, y: 210, width: 600, height: 590, rx: 30, fill: "#fff", "stroke-width": 7}), s.R); el("rect", {x: 586, y: 216, width: 588, height: 70, rx: 24, fill: "#ffd8a8"}, s.R);
  tx(s.R, {x: 880, y: 263, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "the school hall");
  s.pp = []; seed = 21; for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { const g = el("g", {transform: `translate(${640 + i * 92} ${410 + j * 110})`}, s.R); kPupil(g, .85, ["#3a86ff", "#e63946", "#06d6a0", "#ffbe0b"][(i + j) % 4]);
    const c = kCard(g, `${2 + ((i * 3 + j * 5) % 8)}×${2 + ((i + j * 2) % 7)}`, 64); tf(c, "translate(0 -112)"); g.c = c; g.tk = kTick(g, 16); tf(g.tk, "translate(30 -130)"); s.pp.push(g); }
  s.cpu = chip(st, "CPU", "#3a86ff", {fs: 56}); s.gpu = chip(st, "GPU", "#06a77d", {fs: 56});
  s.n1 = kT(st, 280, 850, "one very clever teacher", 36, INK); s.n2 = kT(st, 880, 850, "a whole hall of pupils", 36, INK);
  s.c1 = chip(st, "one after another…", "#3a0ca3", {fs: 34}); s.c2 = chip(st, "all at the same time!", "#f72585", {fs: 38});
  s.run = t => { const a = (w, f) => cue("hall", w, f), t0 = SC.hall.t0, tC = a("cpu", .12), tO = a("one#2", .3), tA = a("another", .45), tG = a("gpu", .55), tH = a("hall", .65), tSa = a("same", .92);
    op(s.L, ramp(t, t0 - .2, t0 + .2)); kPop(s.cpu, 280, 150, t, tC - .1); op(s.n1, ramp(t, a("teacher", .3) - .2, a("teacher", .3) + .1));
    s.sums.forEach((e, i) => op(e, ramp(t, tO + i * .9, tO + i * .9 + .2))); kPop(s.c1, 280, 560, t, tA - .2);
    kPose(s.tk, 8 * Math.sin(t * 4) * on(t, tO, tG, .2), -60 - 40 * Math.abs(Math.sin(t * 3)) * on(t, tO, tG, .2));
    op(s.R, ramp(t, tG - .3, tG)); kPop(s.gpu, 880, 150, t, tG - .1); op(s.n2, ramp(t, tH - .2, tH + .1));
    s.pp.forEach((g, i) => { op(g, ramp(t, tH - .3 + i * .02, tH + i * .02)); kPop(g.tk, 30, -130, t, tSa + (i % 3) * .03); }); kPop(s.c2, 880, 300, t, tSa + .2); };
  return s; })();

// ---- AI learns by doing billions of small multiplications: the hall's answers flow into a robot learning cat from dog
S.ai = (() => { const s = scene("ai", "#e0fbfc", "#c2dfe3"), st = kW(s);
  s.hall = el("g", {}, st); el("rect", kA({x: 40, y: 200, width: 360, height: 420, rx: 26, fill: "#fff", "stroke-width": 6}), s.hall);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const g = el("g", {transform: `translate(${95 + i * 84} ${330 + j * 110})`}, s.hall); kPupil(g, .7, ["#3a86ff", "#e63946", "#06d6a0", "#ffbe0b"][(i + j) % 4]); }
  kT(s.hall, 220, 180, "GPU", 54, "#06a77d");
  s.nums = []; seed = 3; for (let i = 0; i < 14; i++) { const e = tx(st, {"text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#3a0ca3"}, `${1 + (rnd() * 9 | 0)}×${1 + (rnd() * 9 | 0)}`); e.ph = i / 14; e.vy = (rnd() - .5) * 160; s.nums.push(e); }
  s.bot = el("g", {transform: "translate(860 560)"}, st); el("rect", kA({x: -120, y: -140, width: 240, height: 230, rx: 40, fill: "#adb5bd"}), s.bot); el("rect", kA({x: -90, y: -110, width: 180, height: 110, rx: 26, fill: "#1b1b3a"}), s.bot);
  s.eyes = [-40, 40].map(x => el("circle", {cx: x, cy: -55, r: 18, fill: "#4cc9f0"}, s.bot)); el("line", kA({x1: 0, y1: -140, x2: 0, y2: -190}), s.bot); s.ant = el("circle", kA({cx: 0, cy: -200, r: 16, fill: "#e63946"}), s.bot);
  el("rect", kA({x: -150, y: 90, width: 300, height: 120, rx: 30, fill: "#868e96"}), s.bot); kT(s.bot, 0, 170, "AI", 60, "#ffe14d");
  s.pc = el("g", {}, st); el("rect", kA({x: -120, y: -110, width: 240, height: 220, rx: 18, fill: "#fff"}), s.pc); s.cat = emo(s.pc, 0, -6, 140, "🐱"); s.dog = emo(s.pc, 0, -6, 140, "🐶");
  s.guess = chip(st, "cat?  dog?", "#6c757d", {fs: 36}); s.right = chip(st, "a cat! ✓", "#06d6a0", {fs: 40, ink: INK});
  s.bil = chip(st, "billions and billions of small multiplications", "#3a0ca3", {fs: 34});
  s.games = el("g", {}, st); s.ctl = emo(s.games, 250, 450, 170, "🎮"); s.ar = kArrow(s.games, 260, "#ffbe0b"); tf(s.ar, "translate(380 450)"); s.chp = el("g", {transform: "translate(600 450)"}, s.games); kPackage(s.chp, 200); s.ar2 = kArrow(s.games, 150, "#ffbe0b"); tf(s.ar2, "translate(720 450)");
  s.c1 = chip(st, "built for games…", "#f72585", {fs: 38}); s.c2 = chip(st, "…now it helps teach AI", "#06a77d", {fs: 38});
  s.run = t => { const a = (w, f) => cue("ai", w, f), t0 = SC.ai.t0, tB = a("billions", .3), tSo = a("so", .62), tGm = a("games", .75), tT = a("teach", .9);
    const kG = ramp(t, tSo - .3, tSo + .2); op(s.hall, ramp(t, t0 - .2, t0 + .2) * (1 - kG)); op(s.bot, 1);
    tf(s.bot, `translate(${lerp(860, 1010, kG)} ${lerp(560, 450, kG)}) scale(${lerp(1, .8, kG)})`);
    s.nums.forEach(e => { const f = ((t - t0) * .5 + e.ph) % 1; set(e, "x", lerp(420, 740, f)); set(e, "y", 420 + e.vy * Math.sin(Math.PI * f)); op(e, on(t, t0 + .5, tSo, .2) * Math.sin(Math.PI * f)); });
    const learn = clamp((t - tB) / 3); s.eyes.forEach(e => set(e, "fill", learn > .9 ? "#06d6a0" : "#4cc9f0")); op(s.ant, .5 + .5 * Math.sin(t * 8));
    op(s.pc, on(t, t0 + .3, tSo - .2, .2)); tf(s.pc, "translate(860 230)"); const show = Math.floor((t - t0) * 1.5) % 2; op(s.cat, show || learn > .9 ? 1 : 0); op(s.dog, show || learn > .9 ? 0 : 1);
    kPop(s.guess, 860, 400, t, t0 + .6); op(s.guess, on(t, t0 + .6, tB + 2.6, .2)); kPop(s.right, 860, 400, t, tB + 2.7); op(s.right, on(t, tB + 2.7, tSo - .2, .2));
    kPop(s.bil, 600, 800, t, tB - .1); op(s.bil, on(t, tB - .1, tSo - .2, .2));
    op(s.games, kG); tf(s.chp, `translate(600 450) scale(${1 + .06 * Math.sin(t * 6)})`); kPop(s.c1, 360, 680, t, tGm - .3); kPop(s.c2, 860, 680, t, tT - .2); };
  return s; })();

// ---- P5 TEXTBOOK: a circuit with a battery, a bulb and a switch: closed, current flows and the bulb lights; open, a gap, no current
S.circuit = (() => { const s = scene("circuit", "#e9f5db", "#cfe1b9"), st = kW(s);
  s.h = chip(st, "📘 Primary 5: electric circuits", "#3a86ff", {fs: 40});
  const P = "M300 640 H180 V300 H560 M640 300 H1020 V640 H900 M700 640 H500";   // battery at (300..500, 640)? drawn piece by piece below
  el("path", {d: "M250 640 H170 V300 H560", fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round"}, st);
  el("path", {d: "M680 300 H1030 V640 H950", fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round"}, st);
  el("path", {d: "M450 640 H750", fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round"}, st);
  // battery (a dry cell, + end on the right) between x 250 and 450
  s.bat = el("g", {transform: "translate(350 640)"}, st); el("rect", kA({x: -100, y: -45, width: 190, height: 90, rx: 14, fill: "#212529"}), s.bat); el("rect", kA({x: 30, y: -45, width: 60, height: 90, rx: 6, fill: "#ffbe0b"}), s.bat); el("rect", kA({x: 90, y: -16, width: 14, height: 32, rx: 4, fill: "#adb5bd", "stroke-width": 4}), s.bat);
  tx(s.bat, {x: 70, y: 16, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "+"); tx(s.bat, {x: -70, y: 14, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "–");
  // the switch on the top wire: a lever that closes onto the contact at x 680
  s.sw = el("g", {}, st); el("circle", kA({cx: 560, cy: 300, r: 14, fill: "#adb5bd", "stroke-width": 5}), s.sw); el("circle", kA({cx: 680, cy: 300, r: 14, fill: "#adb5bd", "stroke-width": 5}), s.sw);
  s.lev = el("g", {transform: "translate(560 300)"}, s.sw); el("rect", kA({x: 0, y: -10, width: 132, height: 20, rx: 10, fill: "#e63946", "stroke-width": 5}), s.lev);
  // the bulb at (850, 640) on the bottom wire
  s.bulb = el("g", {transform: "translate(850 640)"}, st); s.bg = el("circle", {cx: 0, cy: -100, r: 120, fill: "#ffe14d", filter: "url(#blur)", opacity: 0}, s.bulb);
  el("rect", kA({x: -50, y: -30, width: 100, height: 60, rx: 10, fill: "#868e96"}), s.bulb); s.gl = el("path", kA({d: "M-36 -30 Q-80 -110 0 -160 Q80 -110 36 -30 Z", fill: "#f8f9fa"}), s.bulb);
  s.fil = el("path", {d: "M-16 -36 L-10 -90 Q0 -110 10 -90 L16 -36", fill: "none", stroke: "#6c757d", "stroke-width": 5, "stroke-linecap": "round"}, s.bulb);
  // current: dots along the loop (from the + end round to the - end)
  const loop = [[454, 640], [750, 640], [1030, 640], [1030, 300], [680, 300], [560, 300], [170, 300], [170, 640], [250, 640]];
  s.dots = []; for (let i = 0; i < 26; i++) s.dots.push(el("circle", {r: 9, fill: "#ffd60a", stroke: INK, "stroke-width": 3}, st));
  const L = []; let tot = 0; for (let i = 1; i < loop.length; i++) { const d = Math.hypot(loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]); L.push(d); tot += d; }
  const at = u => { let d = ((u % 1) + 1) % 1 * tot; for (let i = 0; i < L.length; i++) { if (d <= L[i]) { const k = d / L[i]; return [lerp(loop[i][0], loop[i + 1][0], k), lerp(loop[i][1], loop[i + 1][1], k)]; } d -= L[i]; } return loop[0]; };
  s.lb = [["battery", 350, 740], ["switch", 620, 230], ["bulb", 850, 760]].map(([n, x, y]) => kT(st, x, y, n, 38, INK));
  s.cl = chip(st, "switch closed: current flows ✓", "#06a77d", {fs: 36}); s.opn = chip(st, "switch open: a gap, no current ✗", "#e63946", {fs: 36});
  s.gap = el("circle", {cx: 680, cy: 300, r: 40, fill: "none", stroke: "#e63946", "stroke-width": 7, "stroke-dasharray": "10 8"}, st);
  s.run = t => { const a = (w, f) => cue("circuit", w, f), t0 = SC.circuit.t0, tC = a("closed", .3), tO = a("open", .7), tG = a("gap", .8);
    kPop(s.h, 600, 125, t, t0 - .2); s.lb.forEach((e, i) => op(e, ramp(t, t0 + .4 + i * .2, t0 + .6 + i * .2)));
    const closed = ramp(t, tC - .2, tC + .1) * (1 - ramp(t, tO - .1, tO + .2)); tf(s.lev, `rotate(${-32 * (1 - closed)})`);
    const flow = closed > .95 ? 1 : 0; s.dots.forEach((d, i) => { const [x, y] = at(i / 26 + (t - tC) * .12); set(d, "cx", x); set(d, "cy", y); op(d, flow); });
    op(s.bg, .85 * flow); set(s.gl, "fill", flow ? "#fff3b0" : "#f8f9fa"); set(s.fil, "stroke", flow ? "#ff9f1c" : "#6c757d");
    kPop(s.cl, 600, 800, t, tC + .3); op(s.cl, on(t, tC + .3, tO - .2, .2)); kPop(s.opn, 600, 800, t, tO + .2); op(s.gap, on(t, tG - .2, 1e9, .2) * (.6 + .4 * Math.sin(t * 6))); };
  return s; })();

// ---- TRANSISTORS: tiny switches with no moving parts; on or off, one or zero; billions flicking billions of times a second
S.switches = (() => { const s = scene("switches", "#10002b", "#240046"), st = kW(s);
  // A: one transistor, drawn as a switch: two ends joined by a channel; the gate on top turns it on (current) or off (no current)
  s.A = el("g", {}, st);
  const tr = (x, on1) => { const g = el("g", {transform: `translate(${x} 380)`}, s.A); el("rect", kA({x: -190, y: 20, width: 380, height: 110, rx: 18, fill: "#495057"}), g);
    el("rect", kA({x: -190, y: -10, width: 120, height: 60, rx: 10, fill: "#adb5bd"}), g); el("rect", kA({x: 70, y: -10, width: 120, height: 60, rx: 10, fill: "#adb5bd"}), g);
    g.ch = el("rect", {x: -70, y: 22, width: 140, height: 24, fill: "#343a40"}, g); el("rect", kA({x: -60, y: -80, width: 120, height: 70, rx: 10, fill: "#f72585"}), g);
    g.dots = [0, 1, 2, 3].map(() => el("circle", {r: 9, fill: "#ffd60a", stroke: INK, "stroke-width": 2}, g)); g.lab = kT(g, 0, 230, on1 ? "ON  →  1" : "OFF  →  0", 64, on1 ? "#06d6a0" : "#adb5bd"); return g; };
  s.t1 = tr(330, 1); s.t0 = tr(870, 0);
  s.np = chip(st, "no moving parts", "#3a0ca3", {fs: 40}); s.tn = chip(st, "transistors: tiny switches", "#f72585", {fs: 44});
  // B: a field of switches flicking; then a sum worked out
  s.B = el("g", {}, st); s.tiles = []; for (let i = 0; i < 30; i++) for (let j = 0; j < 20; j++) { const g = kTile(s.B, 26); tf(g, `translate(${30 + i * 39} ${80 + j * 39})`); g.i = i; g.j = j; s.tiles.push(g); }
  s.bits = []; for (let i = 0; i < 8; i++) s.bits.push(tx(st, {x: 330 + i * 80, y: 470, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "0"));
  s.sum = chip(st, "7 × 8 = 56", "#06d6a0", {fs: 64, ink: INK}); s.sp = chip(st, "billions of times a second", "#f72585", {fs: 42});
  s.q = kT(st, 600, 520, "100,000,000,000 switches?", 76, "#ffe14d"); s.qm = emo(st, 600, 300, 200, "🤔");
  s.run = t => { const a = (w, f) => cue("switches", w, f), t0 = SC.switches.t0, tN = a("no", .2), tOn = a("on", .3), tB = a("billions", .5), tW = a("works", .78), tSo = a("so", .82), tF = a("find", .95);
    const kB = ramp(t, tB - .4, tB), kQ = ramp(t, tSo - .3, tSo + .1); op(s.A, ramp(t, t0 - .2, t0 + .2) * (1 - kB));
    kPop(s.tn, 600, 125, t, t0 + .2); op(s.tn, on(t, t0 + .2, tB - .3, .2)); kPop(s.np, 600, 210, t, tN - .1); op(s.np, on(t, tN - .1, tB - .3, .2));
    [s.t1, s.t0].forEach((g, k) => { const lit = k === 0; set(g.ch, "fill", lit ? "#ffd60a" : "#343a40"); g.dots.forEach((d, i) => { const f = ((t * .8 + i / 4) % 1); set(d, "cx", lerp(-150, 150, f)); set(d, "cy", 34); op(d, lit ? 1 : 0); }); op(g.lab, ramp(t, tOn - .1, tOn + .2)); });
    op(s.B, kB * (1 - .7 * kQ)); const fr = Math.floor(t * 14); s.tiles.forEach(g => set(g.r, "fill", kHash(g.i + fr, g.j) > .5 ? "#ffd60a" : "#3c096c"));
    s.bits.forEach((e, i) => { e.textContent = kHash(i, fr) > .5 ? "1" : "0"; op(e, on(t, tB + .3, tW - .3, .2)); });
    kPop(s.sp, 600, 640, t, tB + 1.2); op(s.sp, on(t, tB + 1.2, tW - .3, .2)); kPop(s.sum, 600, 470, t, tW - .1); op(s.sum, on(t, tW - .1, tSo - .2, .2));
    op(s.q, ramp(t, tSo - .2, tSo + .1)); tf(s.q, `translate(0 ${-30 * (1 - ramp(t, tSo - .2, tSo + .3))})`); tf(s.qm, `translate(600 300) scale(${Math.max(0, pop(t, tF - .2))}) translate(-600 -300)`); op(s.qm, ramp(t, tF - .25, tF)); };
  return s; })();

// ---- SILICA -> SILICON: inside the grain, silicon and oxygen; cleaned, melted, the oxygen taken away: almost pure silicon
S.povMelt = (() => { const s = scene("povMelt", "#1b1b3a", "#3c096c"), st = kW(s);
  // A: inside a grain of silica: each silicon joined to oxygen, two oxygen for every silicon
  s.A = el("g", {}, st); el("circle", kA({cx: 600, cy: 430, r: 340, fill: "#f2d49b", "stroke-width": 8}), s.A);
  const ac = kClip(s.A, ["circle", {cx: 600, cy: 430, r: 334}]); s.si = []; s.ox = [];
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const x = 600 + i * 120 + (j % 2) * 60, y = 430 + j * 104; s.si.push(el("circle", kA({cx: x, cy: y, r: 30, fill: "#8d99ae", "stroke-width": 4}), ac));
    [[60, 0], [30, 52]].forEach(([dx, dy]) => { el("line", {x1: x, y1: y, x2: x + dx, y2: y + dy, stroke: INK, "stroke-width": 5}, ac); const o = el("circle", kA({cx: x + dx, cy: y + dy, r: 17, fill: "#e63946", "stroke-width": 3}), ac); o.x = x + dx; o.y = y + dy; s.ox.push(o); }); }
  s.si.forEach(e => ac.appendChild(e));
  s.lS = chip(st, "silicon", "#8d99ae", {fs: 40}); s.lO = chip(st, "oxygen", "#e63946", {fs: 40}); s.sil = chip(st, "silica = silicon + oxygen", "#3a0ca3", {fs: 42});
  // B: cleaned and melted in a furnace: a glowing pot; you melt into it
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#240046"}, s.B);
  s.fire = el("ellipse", {cx: 600, cy: 690, rx: 360, ry: 120, fill: "#ff6d00", filter: "url(#blur)"}, s.B);
  el("path", kA({d: "M330 420 Q330 700 600 700 Q870 700 870 420 Z", fill: "#e9ecef"}), s.B); s.melt = el("path", {d: "M346 440 Q350 684 600 684 Q850 684 854 440 Z", fill: kGrad([[0, "#ffd166"], [1, "#ff6d00"]])}, s.B);
  el("ellipse", kA({cx: 600, cy: 420, rx: 270, ry: 44, fill: "none"}), s.B); s.surf = el("ellipse", {cx: 600, cy: 440, rx: 254, ry: 36, fill: "#ffe8a3"}, s.B);
  s.gr = el("g", {}, s.B); kGrain(s.gr, 70, 5); s.face = kFace(s.gr, 46);
  s.drops = [0, 1, 2, 3, 4].map(i => el("path", {d: "M0 -14 Q11 4 0 12 Q-11 4 0 -14 Z", fill: "#4dabf7", stroke: INK, "stroke-width": 3}, s.B));
  s.cl = chip(st, "cleaned 💧", "#3a86ff", {fs: 40}); s.ml = chip(st, "melted 🔥", "#ff6d00", {fs: 40}); s.pure = chip(st, "almost pure silicon", "#8d99ae", {fs: 46});
  s.run = t => { const a = (w, f) => cue("povMelt", w, f), t0 = SC.povMelt.t0, tSi = a("silicon", .35), tO = a("oxygen", .45), tC = a("cleaned", .6), tM = a("melted", .72), tP = a("pure", .9);
    const kB = ramp(t, tC - .4, tC); op(s.A, 1 - kB); tf(s.A, `translate(600 430) scale(${lerp(.4, 1, ramp(t, t0 - .3, t0 + .6))}) translate(-600 -430)`);
    kPop(s.sil, 600, 125, t, t0 + .3); op(s.sil, on(t, t0 + .3, tC - .3, .2)); kPop(s.lS, 300, 800, t, tSi - .1); kPop(s.lO, 900, 800, t, tO - .1); op(s.lS, on(t, tSi - .1, tC - .3, .2)); op(s.lO, on(t, tO - .1, tC - .3, .2));
    s.si.forEach(e => set(e, "stroke-width", t > tSi && t < tO ? 7 : 4)); s.ox.forEach(o => set(o, "r", t > tO && t < tC ? 20 : 17));
    op(s.B, kB); const dip = ramp(t, tM - .3, tM + 1.2), shine = ramp(t, tP - .4, tP + .4);
    tf(s.gr, `translate(600 ${lerp(250, 470, dip)}) scale(${1 - .65 * dip})`); op(s.gr, 1 - ramp(t, tM + .9, tM + 1.3)); s.face.blink(t);
    s.drops.forEach((d, i) => { const f = ((t - tC) * 1.5 + i / 5) % 1; tf(d, `translate(${520 + i * 40} ${120 + f * 160})`); op(d, on(t, tC - .1, tM - .2, .2) * (1 - f)); });
    op(s.fire, .6 + .3 * Math.sin(t * 7) * ramp(t, tM - .3, tM)); set(s.surf, "fill", mix("#ffe8a3", "#e9ecef", shine)); set(s.melt, "fill", shine > .5 ? "#ced4da" : s.melt.getAttribute("fill"));
    kPop(s.cl, 300, 140, t, tC - .1); op(s.cl, on(t, tC - .1, tM - .1, .2)); kPop(s.ml, 900, 140, t, tM - .1); op(s.ml, on(t, tM - .1, tP - .1, .2)); kPop(s.pure, 600, 800, t, tP - .1); };
  return s; })();

// ---- THE CRYSTAL: a seed crystal dipped into the melt, pulled up slowly, turning; a shiny cylinder as long as a child is tall
S.crystal = (() => { const s = scene("crystal", "#1b1b3a", "#2b2d42"), st = kW(s);
  s.A = el("g", {}, st);
  el("rect", kA({x: 260, y: 20, width: 680, height: 820, rx: 40, fill: "#343a40"}), s.A); el("rect", {x: 300, y: 60, width: 600, height: 740, rx: 24, fill: "#14142b"}, s.A);
  s.fire = el("ellipse", {cx: 600, cy: 720, rx: 260, ry: 70, fill: "#ff6d00", filter: "url(#blur)"}, s.A);
  el("path", kA({d: "M400 600 Q400 760 600 760 Q800 760 800 600 Z", fill: "#e9ecef"}), s.A); el("path", {d: "M412 612 Q414 746 600 746 Q786 746 788 612 Z", fill: "#ced4da"}, s.A); el("ellipse", {cx: 600, cy: 612, rx: 188, ry: 26, fill: "#f1f3f5"}, s.A);
  s.rod = el("line", {x1: 600, y1: 40, x2: 600, y2: 200, stroke: "#adb5bd", "stroke-width": 8}, s.A);
  s.ing = el("g", {}, s.A); s.I = kIngot(s.ing, 110, 10); s.seedR = el("rect", kA({x: -10, y: -40, width: 20, height: 44, fill: "#adb5bd", "stroke-width": 4}), s.ing);
  s.face = kFace(s.ing, 34);
  s.arc = el("path", {d: "M520 150 A90 26 0 1 0 680 150", fill: "none", stroke: "#ffd60a", "stroke-width": 7, "marker-end": ""}, s.A); s.arh = el("path", kA({d: "M680 150 l-28 -16 l6 28 Z", fill: "#ffd60a", "stroke-width": 3}), s.A);
  s.l1 = chip(st, "seed crystal", "#4361ee", {fs: 36}); s.l2 = chip(st, "liquid silicon", "#ff6d00", {fs: 36}); s.tu = chip(st, "🔄 pulled up slowly, turning", "#3a0ca3", {fs: 36});
  // B: you, a crystal as long as a child is tall (real proportions: about 30 cm across, about 1.4 m long like the pupil)
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#e0e1dd"}, s.B); el("rect", {x: -300, y: 800, width: 1900, height: 400, fill: "#adb5bd"}, s.B);
  s.kg = el("g", {transform: "translate(420 800) scale(1.3)"}, s.B); s.kid = kKid(s.kg); kPose(s.kid, 0, -20);
  s.big = el("g", {transform: "translate(760 800) scale(1.3)"}, s.B); s.BI = kIngot(el("g", {transform: "translate(0 -520)"}, s.big), 52, 430); s.bf = kFace(el("g", {transform: "translate(0 -240)"}, s.big), 30);
  s.ruler = el("g", {}, s.B); el("line", kA({x1: 940, y1: 124, x2: 940, y2: 800, "stroke-width": 5}), s.ruler); [124, 800].forEach(y => el("line", kA({x1: 920, y1: y, x2: 960, y2: y, "stroke-width": 5}), s.ruler));
  s.hl = chip(st, "as long as a child is tall", "#f72585", {fs: 40}); s.sh = chip(st, "a shiny cylinder of crystal", "#4361ee", {fs: 40});
  s.run = t => { const a = (w, f) => cue("crystal", w, f), t0 = SC.crystal.t0, tD = a("dipped", .2), tP = a("pulled", .3), tT = a("turning", .45), tG = a("grow", .62), tC = a("child", .9);
    const kB = ramp(t, tG + .2, tG + .7); op(s.A, 1 - kB); op(s.B, kB); op(s.fire, .6 + .25 * Math.sin(t * 6));
    const down = ramp(t, t0, tD), up = ramp(t, tP, tG + .6), y = lerp(200, 580, down) - 330 * up, L = 10 + 300 * up;
    set(s.rod, "y2", y - 40); tf(s.ing, `translate(600 ${y})`);
    set(s.I.body, "d", `M-8 0 L${-110 * Math.min(1, up * 4)} ${110 * .9 * Math.min(1, up * 4)} V${100 + L} Q0 ${130 + L} ${110 * Math.min(1, up * 4)} ${100 + L} V${99 * Math.min(1, up * 4)} L8 0 Z`);
    s.I.spin(t * (t > tP ? 1 : 0)); s.I.st.childNodes.forEach((e, i) => set(e, "d", (e.getAttribute("d") || "").replace(/V[-\d.]+$/, `V${90 + L}`)));
    tf(s.face, `translate(0 ${60 + L * .55}) scale(${ramp(t, tP + .5, tP + 1)})`); s.face.blink(t);
    op(s.arc, on(t, tT - .2, tG + .2, .2)); op(s.arh, on(t, tT - .2, tG + .2, .2));
    kPop(s.l1, 330, 220, t, a("seed", .1)); op(s.l1, on(t, a("seed", .1), tG, .2)); kPop(s.l2, 870, 800, t, tD - .1); op(s.l2, on(t, tD - .1, tG, .2)); kPop(s.tu, 600, 800, t, tT - .3); op(s.tu, on(t, tT - .3, tG, .2));
    s.BI.spin(t); s.bf.blink(t); op(s.ruler, ramp(t, tC - .3, tC)); kPop(s.sh, 600, 125, t, tG + .5); kPop(s.hl, 600, 215, t, tC - .2); kPose(s.kid, 0, -20 - 10 * Math.sin(t * 2)); };
  return s; })();

// ---- WAFERS: sliced into thin round plates, thinner than a coin (side by side at real thickness), polished like a mirror
S.wafer = (() => { const s = scene("wafer", "#caf0f8", "#90e0ef"), st = kW(s);
  // the crystal lying down, the slices coming off its end
  s.A = el("g", {}, st); s.lay = el("g", {transform: "translate(300 330)"}, s.A);
  el("rect", kA({x: -260, y: -110, width: 520, height: 220, rx: 30, fill: kGrad([[0, "#495057"], [.3, "#dee2e6"], [.5, "#adb5bd"], [1, "#343a40"]])}), s.lay);
  s.wire = el("line", {x1: 0, y1: -170, x2: 0, y2: 170, stroke: "#e63946", "stroke-width": 5, "stroke-dasharray": "14 6"}, s.A);
  s.sl = [0, 1, 2, 3, 4].map(i => { const g = el("g", {}, s.A); el("ellipse", kA({rx: 14, ry: 110, fill: kGrad([[0, "#495057"], [.5, "#ced4da"], [1, "#343a40"]], "linearGradient", {x1: 0, y1: 0, x2: 1, y2: 0}), "stroke-width": 4}), g); return g; });
  // a wafer seen face on, then polished
  s.W = el("g", {}, st); el("circle", kA({r: 250, fill: kGrad([[0, "#6c757d"], [.5, "#ced4da"], [1, "#495057"]], "linearGradient", {x1: 0, y1: 0, x2: 1, y2: 1}), "stroke-width": 8}), s.W);
  s.shine = el("circle", {r: 244, fill: kGrad([[0, "#ffffff", .95], [.5, "#dee2e6", .3], [1, "#adb5bd", .9]], "linearGradient", {x1: 0, y1: 0, x2: 1, y2: 1})}, s.W);
  s.refl = el("g", {}, s.W); const rc = kClip(s.refl, ["circle", {r: 244}]); [[-140, -200], [-20, -200], [100, -200]].forEach(([x, y]) => el("rect", {x, y, width: 70, height: 26, rx: 8, fill: "#fff", opacity: .9}, rc)); s.rk = el("g", {transform: "translate(60 250) scale(.55)"}, rc); kKid(s.rk);
  s.sweep = el("rect", {x: -60, y: -260, width: 120, height: 520, fill: "#fff", opacity: .7, transform: "rotate(25)"}, kClip(s.W, ["circle", {r: 244}]));
  s.face = kFace(s.W, 60); s.wl = kT(s.W, 0, 320, "wafer", 50, "#fff");
  // thickness side by side (real proportions, about 30 times bigger than life): a wafer is under 1 mm, a coin about 2 mm
  s.T = el("g", {}, st); el("rect", kA({x: 760, y: 560, width: 380, height: 22, rx: 4, fill: "#adb5bd", "stroke-width": 4}), s.T); el("rect", kA({x: 760, y: 680, width: 300, height: 56, rx: 6, fill: "#e9c46a", "stroke-width": 4}), s.T);
  kT(s.T, 950, 540, "wafer (edge)", 32, INK); kT(s.T, 910, 790, "coin (edge)", 32, INK);
  s.tc = chip(st, "thinner than a coin", "#f72585", {fs: 40}); s.mc = chip(st, "✨ shines like a mirror", "#3a0ca3", {fs: 40});
  s.run = t => { const a = (w, f) => cue("wafer", w, f), t0 = SC.wafer.t0, tW = a("wafers", .3), tC = a("coin", .5), tP = a("polished", .66), tM = a("mirror", .9);
    const kW2 = ramp(t, tW - .2, tW + .3); op(s.A, ramp(t, t0 - .2, t0) * (1 - kW2));
    s.sl.forEach((g, i) => { const f = clamp((t - t0 - i * .35) / .6); tf(g, `translate(${560 + f * 60 + i * 38} ${330 + 140 * f * f * (i % 2 ? 1 : .6)}) rotate(${20 * f})`); op(g, f > 0 ? 1 : 0); });
    set(s.wire, "x1", 560); set(s.wire, "x2", 560); tf(s.wire, `translate(0 ${330 - 170 + 30 * Math.sin(t * 20)})`); set(s.wire, "y1", 0); set(s.wire, "y2", 340);
    tf(s.W, `translate(${lerp(600, 400, ramp(t, tC - .4, tC))} 430) scale(${Math.max(0, pop(t, tW - .1, .5))})`); op(s.W, kW2);
    op(s.shine, ramp(t, tP, tM)); op(s.refl, ramp(t, tP + .4, tM + .2)); set(s.sweep, "x", lerp(-500, 500, ((t - tP) * .6) % 1)); op(s.sweep, on(t, tP, tM + 2, .2)); s.face.blink(t);
    op(s.T, on(t, tC - .3, tP + .2, .2)); kPop(s.tc, 950, 440, t, tC - .2); op(s.tc, on(t, tC - .2, tP + .2, .2)); kPop(s.mc, 600, 800, t, tM - .2); };
  return s; })();

// ---- THE CLEAN ROOM: yellow light, clean air falling from the ceiling filters, workers in suits from head to toe
S.cleanroom = (() => { const s = scene("cleanroom", "#fff3b0", "#ffe066"), st = kW(s);
  s.R = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fff5c2"}, s.R); el("rect", {x: -300, y: 700, width: 1900, height: 500, fill: "#e9e3c4"}, s.R);
  for (let i = 0; i < 12; i++) el("rect", kA({x: -160 + i * 160, y: -40, width: 140, height: 60, rx: 6, fill: "#f8f9fa", "stroke-width": 4}), s.R);      // ceiling filters
  s.air = []; for (let i = 0; i < 18; i++) s.air.push(el("path", {d: "M0 0 V40 l-10 -12 M0 40 l10 -12", fill: "none", stroke: "#4cc9f0", "stroke-width": 5, "stroke-linecap": "round", opacity: .6}, s.R));
  [[120, 260], [880, 260]].forEach(([x, w]) => { el("rect", kA({x, y: 360, width: w, height: 340, rx: 20, fill: "#dee2e6"}), s.R); el("rect", kA({x: x + 30, y: 400, width: w - 60, height: 120, rx: 10, fill: "#343a40"}), s.R); el("rect", {x: x + 40, y: 410, width: (w - 80) * .6, height: 20, rx: 4, fill: "#4cc9f0"}, s.R); });
  s.track = el("line", kA({x1: -200, y1: 130, x2: 1400, y2: 130, stroke: "#adb5bd", "stroke-width": 12}), s.R); s.pod = el("g", {}, s.R); el("rect", kA({x: -50, y: 0, width: 100, height: 80, rx: 14, fill: "#e9ecef"}), s.pod); el("line", kA({x1: 0, y1: -20, x2: 0, y2: 0}), s.pod);
  s.w1 = el("g", {}, s.R); kSuit(s.w1, 1.25); s.w2 = el("g", {}, s.R); kSuit(s.w2, 1.05);
  s.cmp = el("g", {}, st); [["operating theatre", 0, 7], ["clean room", 1, 1]].forEach(([n, k, dots]) => { const g = el("g", {transform: `translate(${k ? 780 : 420} 430)`}, s.cmp); el("circle", kA({r: 150, fill: "#fff", "stroke-width": 7}), g);
    seed = 9 + k; for (let i = 0; i < dots; i++) { const r = 60 + rnd() * 70, an = rnd() * 6.28; kDust(el("g", {transform: `translate(${Math.cos(an) * r * .8} ${Math.sin(an) * r * .8})`}, g), 22 + rnd() * 10); }
    kT(g, 0, 210, n, 38, INK); });
  s.cmpH = chip(st, "dust in the same amount of air", "#3a0ca3", {fs: 34});
  s.cr = chip(st, "the clean room", "#f77f00", {fs: 44}); s.ht = chip(st, "suits cover them from head to toe", "#3a86ff", {fs: 38});
  s.run = t => { const a = (w, f) => cue("cleanroom", w, f), t0 = SC.cleanroom.t0, tA = a("air", .3), tCl = a("cleaner", .4), tWk = a("workers", .66), tH = a("head", .9);
    const kC = on(t, tCl - .2, tWk - .3, .3); op(s.R, 1 - .85 * kC); op(s.cmp, kC); kPop(s.cmpH, 600, 220, t, tCl); op(s.cmpH, kC);
    s.air.forEach((e, i) => { const f = ((t * .7 + (i % 6) / 6)) % 1; tf(e, `translate(${-90 + i * 80} ${40 + f * 600})`); op(e, .7 * Math.sin(Math.PI * f) * (1 - kC)); });
    tf(s.pod, `translate(${-100 + ((t - t0) * 160) % 1500} 150)`);
    tf(s.w1, `translate(${lerp(-200, 500, ramp(t, t0, t0 + 3))} 760) scale(1.25)`); tf(s.w2, `translate(1050 760) scale(1.05)`);
    kPop(s.cr, 600, 250, t, t0 + .2); op(s.cr, on(t, t0 + .2, tCl - .3, .2)); kPop(s.ht, 600, 800, t, tH - .4); };
  return s; })();

// ---- P4 TEXTBOOK: light travels in a straight line; an opaque object blocks light and forms a shadow. Then the same on you:
//      the mask's opaque parts block the light; where light reaches the special layer, it changes; the shadow keeps the pattern
S.shadow = (() => { const s = scene("shadow", "#1d3557", "#14213d"), st = kW(s);
  s.h = chip(st, "📘 Primary 4: light and shadows", "#ffbe0b", {fs: 40, ink: INK});
  // A: torch (a small bulb at L), an opaque star card, a screen with the star's shadow (rays drawn from the bulb past the card's edges)
  s.A = el("g", {}, st); const L = [120, 420], CX = 470, SX = 850, HC = 70, HS = HC * (SX - L[0]) / (CX - L[0]);     // the shadow's size follows the rays
  s.torch = el("g", {transform: `translate(${L[0]} ${L[1]})`}, s.A); el("rect", kA({x: -150, y: -40, width: 140, height: 80, rx: 14, fill: "#3a86ff"}), s.torch); el("path", kA({d: "M-12 -60 L20 -60 L20 60 L-12 60 Z", fill: "#adb5bd"}), s.torch); el("circle", {cx: 0, cy: 0, r: 20, fill: "#fff3b0"}, s.torch);
  const star = k => { let d = ""; for (let i = 0; i < 10; i++) { const r = i % 2 ? 40 : 100, an = i / 10 * Math.PI * 2 - Math.PI / 2; d += (i ? "L" : "M") + (Math.cos(an) * r * k).toFixed(1) + " " + (Math.sin(an) * r * k).toFixed(1); } return d + "Z"; };
  s.zone = el("path", {d: `M${CX} ${L[1] - HC} L${SX} ${L[1] - HS} V${L[1] + HS} L${CX} ${L[1] + HC} Z`, fill: "#000", opacity: 0}, s.A);
  s.rays = el("g", {}, s.A); const R = []; for (let k = -5; k <= 5; k++) { const yy = L[1] + k * 26, dx = CX - L[0], dy = yy - L[1], hit = Math.abs(k) <= 2;     // rays that meet the card stop there
    const ex = hit ? CX - 12 : SX, ey = L[1] + dy * (ex - L[0]) / dx; R.push(el("line", {x1: L[0] + 20, y1: L[1] + dy * 20 / dx, x2: ex, y2: ey, stroke: "#ffe14d", "stroke-width": 6, "stroke-linecap": "round", opacity: .9, "stroke-dasharray": "1000", "stroke-dashoffset": 1000}, s.rays)); }
  s.R = R; el("rect", kA({x: SX, y: 135, width: 40, height: 580, fill: "#f8f9fa"}), s.A);
  s.shd = el("rect", {x: SX + 3, y: L[1] - HS, width: 34, height: 2 * HS, fill: "#1b1b3a", opacity: 0}, s.A);
  s.card = el("rect", kA({x: CX - 12, y: L[1] - HC, width: 24, height: 2 * HC, fill: "#8d5524", "stroke-width": 5}), s.A);
  s.front = el("g", {}, s.A); el("rect", kA({x: -110, y: -150, width: 220, height: 300, rx: 12, fill: "#f8f9fa"}), s.front); el("path", {d: star(1.0), fill: "#1b1b3a"}, s.front); kT(s.front, 0, -170, "the screen, from the front", 24, "#fff");
  s.la = [["light source", L[0] - 50, 520], ["opaque object", CX, 560], ["shadow", 1080, 830]].map(([n, x, y]) => kT(s.A, x, y, n, 34, "#fff"));
  s.sl = chip(st, "light travels in a straight line", "#ffbe0b", {fs: 36, ink: INK});
  // B: the same on the wafer: a lamp, light in straight lines, the mask (glass with opaque chrome), the special layer, you (the wafer)
  s.B = el("g", {}, st); const MX = [200, 1000], MY = 330, WY = 560, BL = [[250, 340], [430, 520], [610, 700], [790, 880]];       // chrome blocks (x from..to)
  el("rect", kA({x: 400, y: 20, width: 400, height: 90, rx: 20, fill: "#495057"}), s.B); el("rect", {x: 430, y: 100, width: 340, height: 14, fill: "#c77dff"}, s.B);
  s.bR = []; for (let x = 215; x <= 985; x += 30) { const blocked = BL.some(([a, b]) => x > a - 4 && x < b + 4); s.bR.push(el("line", {x1: x, y1: 130, x2: x, y2: blocked ? MY - 8 : WY - 2, stroke: "#e0aaff", "stroke-width": 6, "stroke-linecap": "round", opacity: .9, "stroke-dasharray": "600", "stroke-dashoffset": 600}, s.B)); }
  s.mask = el("g", {}, s.B); el("rect", kA({x: MX[0], y: MY - 10, width: MX[1] - MX[0], height: 26, fill: "#caf0f8", opacity: .8, "stroke-width": 4}), s.mask); BL.forEach(([a, b]) => el("rect", kA({x: a, y: MY - 14, width: b - a, height: 14, fill: "#212529", "stroke-width": 3}), s.mask));
  s.layer = []; for (let x = 200; x < 1000; x += 10) { const shade = BL.some(([a, b]) => x + 5 > a && x + 5 < b); s.layer.push(el("rect", {x, y: WY, width: 10.6, height: 28, fill: "#9d4edd", "data-sh": shade ? 1 : 0}, s.B)); }
  el("rect", kA({x: 200, y: WY, width: 800, height: 28, fill: "none", "stroke-width": 4}), s.B);
  el("rect", kA({x: 200, y: WY + 28, width: 800, height: 70, fill: kGrad([[0, "#ced4da"], [1, "#6c757d"]]), "stroke-width": 5}), s.B); s.yf = kFace(el("g", {transform: "translate(600 625)"}, s.B), 26);
  s.shz = BL.map(([a, b]) => el("rect", {x: a, y: MY + 4, width: b - a, height: WY - MY - 4, fill: "#000", opacity: 0}, s.B));
  s.lb = [["mask", 1080, MY + 10], ["special layer", 1080, WY + 22], ["you (the wafer)", 1080, WY + 75]].map(([n, x, y]) => kT(s.B, x, y, n, 32, "#fff", {"text-anchor": "start"}));
  s.lt = kT(s.B, 900, 90, "light", 38, "#e0aaff", {"text-anchor": "start"});
  s.c1 = chip(st, "light reaches it: the layer changes", "#9d4edd", {fs: 34}); s.c2 = chip(st, "in the shadow: the pattern stays", "#1b1b3a", {fs: 34});
  s.run = t => { const a = (w, f) => cue("shadow", w, f), t0 = SC.shadow.t0, tSt = a("straight", .12), tBl = a("blocks", .2), tSh = a("shadow", .27), tCo = has("shadow", "coated") ? a("coated", .36) : (SEGS("shadow")[1] ? SEGS("shadow")[1].t0 - .2 : SC.shadow.t0 - 1), tSt2 = a("stencil", .55), tR = a("reaches", .72), tK = a("keeps", .93);
    const kB = ramp(t, tCo - .4, tCo); op(s.A, 1 - kB); op(s.B, kB); kPop(s.h, 400, 125, t, t0 - .2); op(s.h, 1 - kB);
    const rp = ramp(t, tSt - .3, tSt + .8); s.R.forEach(r => set(r, "stroke-dashoffset", 1000 * (1 - rp))); kPop(s.sl, 600, 800, t, tSt); op(s.sl, on(t, tSt, tCo - .3, .2));
    op(s.card, ramp(t, tBl - .4, tBl - .2)); op(s.shd, ramp(t, tBl, tSh)); op(s.zone, .3 * ramp(t, tBl, tSh)); kPop(s.front, 1080, 640, t, tSh); op(s.la[0], ramp(t, t0 + .5, t0 + .8)); op(s.la[1], ramp(t, tBl, tBl + .3)); op(s.la[2], ramp(t, tSh + .2, tSh + .5));
    // B
    s.lb.forEach((e, i) => op(e, ramp(t, [tSt2, tCo, tCo - .3][i], [tSt2, tCo, tCo - .3][i] + .3))); op(s.mask, ramp(t, tSt2 - .3, tSt2)); tf(s.mask, `translate(0 ${-60 * (1 - ramp(t, tSt2 - .3, tSt2 + .2)) - 260 * ramp(t, tK - .1, tK + .8)})`);
    const lp = ramp(t, tSt2 + .6, tR - .1); s.bR.forEach(r => { set(r, "stroke-dashoffset", 600 * (1 - lp)); op(r, .9 * (1 - ramp(t, tK - .3, tK))); }); op(s.lt, ramp(t, tSt2 + .6, tSt2 + .9));
    const ch = ramp(t, tR - .2, tR + .6), wash = ramp(t, tK + .3, tK + 1);
    s.layer.forEach(r => { const sh = r.getAttribute("data-sh") === "1"; set(r, "fill", sh ? mix("#9d4edd", "#e0aaff", wash) : mix("#9d4edd", "#fde68a", ch)); op(r, sh ? 1 : 1 - wash); });
    s.shz.forEach(r => op(r, .45 * ramp(t, tSt2 + .8, tR) * (1 - ramp(t, tK - .3, tK)))); s.yf.blink(t);
    kPop(s.c1, 600, 760, t, tR); op(s.c1, on(t, tR, tK - .3, .2)); kPop(s.c2, 600, 760, t, tK); };
  return s; })();

// ---- LENSES: the pattern is shrunk through a column of lenses; each line ends thousands of times thinner than a hair
S.lens = (() => { const s = scene("lens", "#3c096c", "#10002b"), st = kW(s);
  s.A0 = el("g", {}, st); s.A = el("g", {transform: "translate(0 70)"}, s.A0); const Y = [150, 250, 340, 420, 490];
  el("rect", kA({x: 230, y: 60, width: 340, height: 60, rx: 8, fill: "#caf0f8"}), s.A); [[260, 320], [370, 430], [480, 540]].forEach(([a, b]) => el("rect", {x: a, y: 66, width: b - a, height: 48, fill: "#212529"}, s.A));
  s.beam = el("path", {d: "M240 120 L560 120 L440 600 L360 600 Z", fill: "#e0aaff", opacity: .35}, s.A);
  Y.forEach((y, i) => { const w = 170 - i * 22; el("ellipse", kA({cx: 400, cy: y, rx: w, ry: 20, fill: "#90e0ef", opacity: .85, "stroke-width": 4}), s.A); });
  el("rect", kA({x: 280, y: 600, width: 240, height: 30, fill: "#adb5bd"}), s.A); [[370, 385], [397, 412], [425, 440]].forEach(([a, b]) => el("rect", {x: a, y: 594, width: b - a, height: 8, fill: "#fde68a"}, s.A));
  kT(s.A, 400, 40, "mask", 32, "#fff"); kT(s.A, 400, 680, "wafer", 32, "#fff"); kT(s.A, 650, 330, "lenses", 34, "#90e0ef", {"text-anchor": "start"});
  s.sm = chip(st, "the pattern shrinks", "#f72585", {fs: 38});
  // B: one hair, and a 1000-times zoom on the wafer's lines beside it
  s.B = el("g", {}, st); el("path", {d: "M780 -60 Q800 400 760 960", fill: "none", stroke: "#6f4518", "stroke-width": 120, "stroke-linecap": "round"}, s.B); el("path", {d: "M770 -60 Q790 400 750 960", fill: "none", stroke: "#a47148", "stroke-width": 40, "stroke-linecap": "round", opacity: .6}, s.B);
  kT(s.B, 640, 760, "a hair", 40, "#fff");
  s.zm = el("g", {transform: "translate(1060 420)"}, s.B); el("circle", kA({r: 130, fill: "#fff", "stroke-width": 8}), s.zm); const zc = kClip(s.zm, ["circle", {r: 124}]); for (let i = 0; i < 40; i++) el("rect", {x: -124 + i * 6.4, y: -124, width: 3.2, height: 248, fill: i % 2 ? "#fde68a" : "#7b2cbf"}, zc);
  el("line", kA({x1: -230, y1: 0, x2: -132, y2: 0, "stroke-dasharray": "10 8"}), s.zm); kT(s.zm, 0, 180, "lines on a chip", 30, "#fff"); kT(s.zm, 0, 215, "(zoomed in 1000 times)", 24, "#fff");
  s.th = chip(st, "thousands of times thinner than a hair", "#3a0ca3", {fs: 34});
  s.run = t => { const a = (w, f) => cue("lens", w, f), t0 = SC.lens.t0, tAg = a("again", .3), tTh = a("thousands", .6), tH = a("hair", .9);
    tf(s.A0, `translate(${-120 * ramp(t, tTh - .6, tTh)} 0)`); op(s.beam, .25 + .15 * Math.sin(t * 5));
    kPop(s.sm, 400, 800, t, tAg - .3); op(s.sm, on(t, tAg - .3, tTh - .4, .2));
    op(s.B, ramp(t, tTh - .4, tTh)); kPop(s.zm, 1060, 420, t, tTh - .1); kPop(s.th, 600, 800, t, tH - .3); };
  return s; })();

// ---- LAYERS: the pattern etched in, metal added, again and again: layer on layer, hundreds of steps, many weeks
S.layers = (() => { const s = scene("layers", "#e0fbfc", "#98c1d9"), st = kW(s);
  s.base = el("rect", kA({x: 200, y: 640, width: 800, height: 90, fill: kGrad([[0, "#ced4da"], [1, "#6c757d"]])}), st);
  s.L = []; for (let k = 0; k < 7; k++) { const g = el("g", {}, st), y = 640 - (k + 1) * 62; g.base = el("rect", kA({x: 200, y, width: 800, height: 62, fill: k % 2 ? "#cdb4db" : "#bde0fe", "stroke-width": 4}), g);
    g.cuts = []; for (let i = 0; i < 7; i++) { const x = 240 + i * 110 + (k % 2) * 40; g.cuts.push(el("rect", {x, y: y + 12, width: 48, height: 40, fill: "#14213d"}, g)); g.cuts[i].m = el("rect", {x, y: y + 12, width: 48, height: 40, fill: "#e9a03b", stroke: INK, "stroke-width": 2}, g); }
    s.L.push(g); }
  s.plasma = []; for (let i = 0; i < 10; i++) s.plasma.push(el("path", {d: "M0 0 v34 l-8 -10 M0 34 l8 -10", fill: "none", stroke: "#f72585", "stroke-width": 5, "stroke-linecap": "round"}, st));
  s.cal = el("g", {transform: "translate(1080 160)"}, st); el("rect", kA({x: -90, y: -90, width: 180, height: 190, rx: 16, fill: "#fff"}), s.cal); el("rect", kA({x: -90, y: -90, width: 180, height: 50, rx: 16, fill: "#e63946"}), s.cal); s.wk = tx(s.cal, {x: 0, y: 60, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: INK}, "1"); tx(s.cal, {x: 0, y: -55, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "WEEK");
  s.c1 = chip(st, "etched", "#f72585", {fs: 40}); s.c2 = chip(st, "metal added", "#e9a03b", {fs: 40, ink: INK}); s.c3 = chip(st, "🔁 and again…", "#3a0ca3", {fs: 40}); s.c4 = chip(st, "hundreds of steps", "#1d3557", {fs: 44});
  s.run = t => { const a = (w, f) => cue("layers", w, f), t0 = SC.layers.t0, tE = a("etched", .15), tM = a("metal", .3), tA = a("again", .45), tLy = a("layer", .6), tH = a("hundreds", .75), tW = a("weeks", .95);
    s.L.forEach((g, k) => { const t1 = k === 0 ? t0 - .2 : tA + (k - 1) * (tW + .8 - tA) / 6; op(g, ramp(t, t1, t1 + .2)); tf(g, `translate(0 ${-40 * (1 - ramp(t, t1, t1 + .3))})`);
      const e = k === 0 ? ramp(t, tE - .1, tE + .5) : ramp(t, t1 + .1, t1 + .3), m = k === 0 ? ramp(t, tM - .1, tM + .5) : ramp(t, t1 + .2, t1 + .4); g.cuts.forEach(c => { op(c, e); op(c.m, m); }); });
    s.plasma.forEach((p, i) => { const f = ((t * 1.5 + i / 10) % 1); tf(p, `translate(${250 + i * 80} ${470 + f * 80})`); op(p, on(t, tE - .2, tM - .1, .2) * Math.sin(Math.PI * f)); });
    s.wk.textContent = String(1 + Math.floor(11 * ramp(t, tLy, tW + .5))); op(s.cal, ramp(t, tLy - .3, tLy));
    kPop(s.c1, 420, 120, t, tE - .1); op(s.c1, on(t, tE - .1, tA, .2)); kPop(s.c2, 720, 120, t, tM - .1); op(s.c2, on(t, tM - .1, tA, .2)); kPop(s.c3, 560, 120, t, tA); op(s.c3, on(t, tA, tH - .1, .2)); kPop(s.c4, 560, 120, t, tH - .1); };
  return s; })();

// ---- CHIPS: one wafer holds many chips (dies 26 x 33 mm on a 300 mm wafer); cut apart, tested, packed into a case: now you are a chip
S.chips = (() => { const s = scene("chips", "#14213d", "#3a0ca3"), st = kW(s), R = 300, MM = 2;     // 2 px per mm: wafer 300 mm across
  s.W = el("g", {transform: "translate(600 440)"}, st); el("circle", kA({r: R, fill: "#adb5bd", "stroke-width": 8}), s.W); s.dies = [];
  const dw = 26 * MM, dh = 33 * MM, g = 2 * MM; for (let i = -6; i <= 6; i++) for (let j = -5; j <= 5; j++) { const x = i * (dw + g), y = j * (dh + g) + dh / 2;
    if ([[-1, -1], [1, -1], [-1, 1], [1, 1]].every(([u, v]) => Math.hypot(x + u * dw / 2, y + v * dh / 2) < R - 6)) { const d = el("g", {}, s.W); kDie(d, dw, dh, {cols: 3, rows: 4}); d.x = x; d.y = y; tf(d, `translate(${x} ${y})`); s.dies.push(d); } }
  s.n = s.dies.length; s.face = kFace(s.W, 60);
  s.saw = el("g", {}, st); el("circle", kA({r: 60, fill: "#e9ecef", "stroke-dasharray": "10 6"}), s.saw);
  s.probe = el("g", {}, st); el("path", kA({d: "M0 -200 V-30 L-20 0 M0 -30 L20 0", fill: "none", "stroke-width": 8}), s.probe); s.ok = kTick(st, 46);
  s.pk = el("g", {}, st); s.P = kPackage(s.pk, 320); s.pf = kFace(el("g", {transform: "translate(0 70)"}, s.pk), 44);
  s.c0 = chip(st, `one wafer, about ${s.n} chips`, "#4361ee", {fs: 38}); s.c1 = chip(st, "cut apart ✂️", "#f72585", {fs: 38}); s.c2 = chip(st, "tested ✓", "#06a77d", {fs: 38}); s.c3 = chip(st, "packed into a case", "#3a86ff", {fs: 38});
  s.you = kT(st, 600, 860, "Now you are a chip! 🎉", 66, "#ffe14d");
  s.run = t => { const a = (w, f) => cue("chips", w, f), t0 = SC.chips.t0, tC = a("cut", .45), tT = a("tested", .55), tP = a("packed", .65), tY = a("now", .85);
    const kP = ramp(t, tP - .2, tP + .3); op(s.W, 1 - kP); s.face.blink(t); op(s.face, 1 - ramp(t, tC - .3, tC));
    const sp = ramp(t, tC - .1, tC + .6); s.dies.forEach(d => tf(d, `translate(${d.x * (1 + .25 * sp)} ${d.y * (1 + .25 * sp)})`));
    tf(s.saw, `translate(${lerp(240, 960, ((t - tC) * .9) % 1)} 440) rotate(${t * 900})`); op(s.saw, on(t, tC - .2, tT - .1, .2));
    tf(s.probe, `translate(600 ${380 + 30 * Math.abs(Math.sin(t * 4))})`); op(s.probe, on(t, tT - .2, tP - .1, .2)); kPop(s.ok, 690, 330, t, tT + .3); op(s.ok, on(t, tT + .3, tP, .2));
    tf(s.pk, `translate(600 430) scale(${Math.max(0, pop(t, tP))})`); op(s.pk, kP); s.pf.blink(t); op(s.pf, ramp(t, tY - .2, tY));
    kPop(s.c0, 600, 125, t, t0); op(s.c0, on(t, t0, tC - .1, .2)); kPop(s.c1, 600, 125, t, tC - .1); op(s.c1, on(t, tC - .1, tT - .1, .2)); kPop(s.c2, 600, 125, t, tT - .1); op(s.c2, on(t, tT - .1, tP - .1, .2)); kPop(s.c3, 600, 125, t, tP - .1);
    op(s.you, ramp(t, tY - .1, tY + .2)); tf(s.you, `translate(600 780) scale(${Math.max(0, pop(t, tY - .1))}) translate(-600 -860)`); };
  return s; })();

// ---- WHERE CHIPS ARE MADE: designed in the US (Santa Clara), the newest built in Taiwan (Hsinchu); Singapore: about 1 in 10 of the world's chips
S.chipMap = (() => { const s = scene("chipMap", "#0b132b", "#1c2541"), st = kW(s), G = GEO11.GLOBE, M = GEO11.SGMAP;
  s.W = el("g", {}, st); el("circle", kA({cx: G.c[0], cy: G.c[1], r: G.r, fill: kGrad([[0, "#4cc9f0"], [1, "#1d3557"]], "radialGradient", {cx: .4, cy: .35, r: .8})}), s.W);
  const gc = kClip(s.W, ["circle", {cx: G.c[0], cy: G.c[1], r: G.r}]); el("path", {d: G.grat, fill: "none", stroke: "#fff", "stroke-width": 1.5, opacity: .25}, gc); el("path", {d: G.land, fill: "#95d5b2", stroke: INK, "stroke-width": 2}, gc);
  el("circle", {cx: G.c[0], cy: G.c[1], r: G.r, fill: "none", stroke: INK, "stroke-width": 7}, s.W);
  const [x1, y1] = G.santaclara, [x2, y2] = G.hsinchu; s.route = el("path", {d: `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 230} ${x2} ${y2}`, fill: "none", stroke: "#ffd60a", "stroke-width": 9, "stroke-dasharray": "22 14", "stroke-linecap": "round"}, s.W);
  s.p1 = kPin(s.W, "#e63946"); tf(s.p1, `translate(${x1} ${y1})`); s.p2 = kPin(s.W, "#f77f00"); tf(s.p2, `translate(${x2} ${y2})`);
  s.l1 = el("g", {}, s.W); kT(s.l1, x1 + 10, y1 + 50, "Santa Clara, USA", 30, "#fff"); s.l2 = el("g", {}, s.W); kT(s.l2, x2 - 10, y2 + 50, "Hsinchu, Taiwan", 30, "#fff");
  s.sgD = el("circle", {cx: G.sg[0], cy: G.sg[1], r: 12, fill: "#e63946", stroke: "#fff", "stroke-width": 4}, s.W); s.sgL = kT(s.W, G.sg[0], G.sg[1] + 48, "Singapore", 30, "#fff");
  s.d1 = chip(st, "✏️ designed", "#e63946", {fs: 38}); s.d2 = chip(st, "🏭 the newest built", "#f77f00", {fs: 38});
  // B: Singapore (real coast), chip factories at Woodlands and Tampines; 1 in 10 of the world's chips
  s.B = el("g", {}, st); const mc = kClip(s.B, ["rect", {x: 40, y: 40, width: 1120, height: 640, rx: 36}]); el("rect", {x: 0, y: 0, width: 1200, height: 900, fill: "#48cae4"}, mc);
  el("path", {d: M.land, fill: "#95d5b2", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, mc); el("path", {d: M.border, fill: "none", stroke: INK, "stroke-width": 2, opacity: 0}, mc);
  el("rect", {x: 40, y: 40, width: 1120, height: 640, rx: 36, fill: "none", stroke: INK, "stroke-width": 7}, s.B);
  s.fabs = [M.woodlands, M.tampines].map(([x, y], i) => { const g = el("g", {}, s.B); g.x = x; g.y = y; kFab(g, .8); kT(g, 0, 50, i ? "Tampines" : "Woodlands", 34, "#fff"); return g; });
  kT(s.B, 380, 620, "Singapore", 40, INK, {opacity: .7}); kT(s.B, 520, 110, "Malaysia", 34, INK, {opacity: .6});
  s.leg = el("g", {}, s.B); kFab(el("g", {transform: "translate(110 735)"}, s.leg), .55); kT(s.leg, 150, 746, "= chip factories (wafer fabs)", 30, "#fff", {"text-anchor": "start"});
  s.ten = el("g", {}, st); s.tc = []; for (let i = 0; i < 10; i++) { const g = el("g", {transform: `translate(${150 + i * 100} 820)`}, s.ten); kPackage(g, 76); s.tc.push(g); }
  s.one = chip(st, "about 1 in every 10 chips in the world", "#e63946", {fs: 36}); s.src = kT(s.ten, 1150, 890, "Source: EDB Singapore", 22, "#fff", {"text-anchor": "end"});
  s.run = t => { const a = (w, f) => cue("chipMap", w, f), t0 = SC.chipMap.t0, tD = a("designs", .1), tU = a("united", .22), tTw = a("taiwan", .38), tS = a("singapore", .55), tO = a("one", .7);
    const kB = ramp(t, tS - .3, tS + .1); op(s.W, 1 - kB); op(s.B, kB);
    kPop(s.p1, x1, y1, t, tD - .2); op(s.l1, ramp(t, tU - .2, tU)); kPop(s.d1, x1 - 30, y1 - 140, t, tD);
    set(s.route, "stroke-dashoffset", -t * 60); op(s.route, ramp(t, tTw - .8, tTw - .3)); kPop(s.p2, x2, y2, t, tTw - .2); op(s.l2, ramp(t, tTw - .1, tTw + .2)); kPop(s.d2, x2 + 60, y2 - 140, t, tTw + .2);
    s.fabs.forEach((g, i) => kPop(g, g.x, g.y, t, tS + .4 + i * .3)); op(s.leg, ramp(t, tS + .9, tS + 1.2));
    op(s.ten, ramp(t, tO - .3, tO)); s.tc.forEach((g, i) => { tf(g, `translate(${150 + i * 100} 820) scale(${i === 3 ? 1 + .25 * ramp(t, tO + .6, tO + 1) : 1})`); op(g, i === 3 ? 1 : 1 - .6 * ramp(t, tO + .6, tO + 1)); });
    kPop(s.one, 600, 730, t, tO + .5); op(s.leg, ramp(t, tS + .9, tS + 1.2) * (1 - ramp(t, tO - .3, tO))); };
  return s; })();

// ---- THE TURN: a data centre; thousands of GPUs, a lot of electricity, hot; heat flows from hotter to colder (P4), cool water carries it away
S.heat = (() => { const s = scene("heat", "#0b132b", "#1c2541"), st = kW(s);
  s.A = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#161a33"}, s.A); el("path", {d: "M-300 700 L600 470 L1500 700 V1100 H-300 Z", fill: "#22264a"}, s.A);
  s.rk = []; for (let side = -1; side <= 1; side += 2) for (let k = 0; k < 5; k++) { const sc = 1 - k * .16, x = 600 + side * (520 - k * 85), y = 470 + 230 * sc; const g = el("g", {transform: `translate(${x} ${y}) scale(${sc})`}, s.A);
    el("rect", kA({x: -80, y: -420, width: 160, height: 420, rx: 8, fill: "#2b2d42"}), g); g.led = []; for (let r = 0; r < 9; r++) g.led.push(el("rect", {x: -60, y: -400 + r * 44, width: 120, height: 30, rx: 6, fill: "#3a86ff"}, g)); s.rk.push(g); }
  s.bolt = []; for (let i = 0; i < 6; i++) s.bolt.push(emo(s.A, 0, 0, 60, "⚡"));
  s.ht = kHeat(s.A, 5, "#ff6b35");
  s.c1 = chip(st, "thousands of GPUs, training an AI", "#4361ee", {fs: 36}); s.c2 = chip(st, "⚡ a lot of electricity → 🔥 hot", "#e63946", {fs: 36});
  // B: P4 textbook: heat flows from a hotter object to a colder one
  s.B = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#fff3e0"}, s.B);
  s.hot = el("g", {transform: "translate(320 450)"}, s.B); el("rect", kA({x: -150, y: -150, width: 300, height: 300, rx: 30, fill: "#e63946"}), s.hot); kT(s.hot, 0, 220, "hotter object", 38, INK);
  s.cold = el("g", {transform: "translate(880 450)"}, s.B); el("rect", kA({x: -150, y: -150, width: 300, height: 300, rx: 30, fill: "#4cc9f0"}), s.cold); kT(s.cold, 0, 220, "colder object", 38, INK);
  s.ha = kArrow(s.B, 220, "#ff922b", 34); tf(s.ha, "translate(490 450)"); kT(s.B, 600, 390, "heat", 44, "#ff6b35");
  s.h4 = chip(st, "📘 Primary 4: heat flows from hotter to colder", "#ff6b35", {fs: 36});
  // C: cool water and air past the chips: a cold plate on a hot GPU, water pipes in (cool) and out (warm); fans
  s.C = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 1300, fill: "#e0fbfc"}, s.C);
  s.gp = el("g", {transform: "translate(600 520)"}, s.C); s.gpk = kPackage(s.gp, 340); el("rect", kA({x: -150, y: -200, width: 300, height: 80, rx: 14, fill: "#90e0ef"}), s.gp); kT(s.gp, 170, -147, "cold plate", 30, INK, {"text-anchor": "start"});
  s.pin = el("path", {d: "M-300 230 H420 Q470 230 470 280 V320", fill: "none", stroke: "#3a86ff", "stroke-width": 40, "stroke-linecap": "round"}, s.C); s.pout = el("path", {d: "M730 320 V280 Q730 230 780 230 H1500", fill: "none", stroke: "#ff922b", "stroke-width": 40, "stroke-linecap": "round"}, s.C);
  s.wd = []; for (let i = 0; i < 16; i++) s.wd.push(el("circle", {r: 9, fill: "#fff", opacity: .8}, s.C));
  s.ha2 = [0, 1, 2].map(i => { const g = kArrow(s.C, 90, "#ff6b35", 18); return g; });
  s.lw = [["cool water in", 120, 190], ["warmer water out", 1080, 190]].map(([n, x, y]) => kT(s.C, x, y, n, 32, INK));
  s.fan = el("g", {transform: "translate(170 560)"}, s.C); el("circle", kA({r: 110, fill: "#dee2e6"}), s.fan); s.fb = el("g", {}, s.fan); for (let k = 0; k < 5; k++) el("path", {d: "M0 0 Q40 -50 0 -96", fill: "none", stroke: "#495057", "stroke-width": 16, "stroke-linecap": "round", transform: `rotate(${k * 72})`}, s.fb); kT(s.fan, 0, 160, "cool air", 30, INK);
  s.eng = chip(st, "🔧 engineers: use less energy", "#06a77d", {fs: 38, ink: INK});
  s.run = t => { const a = (w, f) => cue("heat", w, f), t0 = SC.heat.t0, tE = a("electricity", .2), tHo = a("hot", .28), tR = a("remember", .32), tC = a("cool", .55), tEn = a("engineers", .74);
    const kB = on(t, tR - .3, tC - .3, .3), kC = ramp(t, tC - .4, tC); op(s.A, 1 - Math.max(kB, kC)); op(s.B, kB); op(s.C, kC);
    const hot = ramp(t, tE, tHo + .5); s.rk.forEach((g, i) => g.led.forEach((e, r) => set(e, "fill", mix("#3a86ff", kHash(i, r + Math.floor(t * 4)) > .4 ? "#ff6b35" : "#ffd166", hot))));
    s.bolt.forEach((e, i) => { const f = ((t - tE) * .8 + i / 6) % 1; tf(e, `translate(${i % 2 ? lerp(-100, 300, f) : lerp(1300, 900, f)} ${380 + (i % 3) * 60})`); op(e, on(t, tE - .2, tR, .2) * Math.sin(Math.PI * f)); });
    s.ht.run(t, 600, 360, 700, ramp(t, tHo - .3, tHo + .3) * (1 - kB));
    kPop(s.c1, 600, 125, t, t0); op(s.c1, on(t, t0, tE - .2, .2)); kPop(s.c2, 600, 125, t, tE - .1); op(s.c2, on(t, tE - .1, tR - .3, .2)); kPop(s.h4, 600, 125, t, tR); op(s.h4, kB);
    const kc = ramp(t, tC, tC + 3); s.wd.forEach((d, i) => { const f = ((t * .35 + i / 16) % 1), seg = f < .5; const x = seg ? lerp(-260, 470, f * 2) : lerp(730, 1460, f * 2 - 1), y = 230; set(d, "cx", x); set(d, "cy", y); op(d, .8 * kC); });
    s.ha2.forEach((g, i) => { const f = ((t * .8 + i / 3) % 1); tf(g, `translate(${520 + i * 80} ${430 - f * 100}) rotate(-90)`); op(g, kC * Math.sin(Math.PI * f)); }); set(s.gpk.lid, "fill", mix("#ff6b35", "#adb5bd", kc));
    tf(s.fb, `rotate(${t * 500})`); kPop(s.eng, 600, 800, t, tEn - .1); };
  return s; })();

// ---- TRY THIS with your class: one friend with twenty sums, or twenty friends with one sum each. Who finishes first?
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff"), st = kW(s);
  s.h = chip(st, "✏️ Try this with your class!", "#7209b7", {fs: 44});
  s.L = el("g", {}, st); el("rect", kA({x: 40, y: 190, width: 440, height: 600, rx: 30, fill: "#fff", "stroke-width": 6}), s.L);
  s.one = el("g", {transform: "translate(260 560)"}, s.L); kPupil(s.one, 1.6, "#3a86ff"); s.stack = []; for (let i = 0; i < 20; i++) s.stack.push(kCard(s.L, `${2 + i % 8}+${3 + i % 5}`, 80));
  s.cnt = kT(s.L, 260, 760, "0 / 20 done", 40, INK);
  s.R = el("g", {}, st); el("rect", kA({x: 520, y: 190, width: 660, height: 600, rx: 30, fill: "#fff", "stroke-width": 6}), s.R); s.pp = [];
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const g = el("g", {transform: `translate(${600 + i * 125} ${320 + j * 130})`}, s.R); kPupil(g, .9, ["#3a86ff", "#e63946", "#06d6a0", "#ffbe0b"][(i + j) % 4]); g.c = kCard(g, `${2 + (i + j) % 8}+${3 + i % 5}`, 66); tf(g.c, "translate(0 -112)"); g.tk = kTick(g, 18); s.pp.push(g); }
  s.timer = chip(st, "⏱️ 0 s", INK, {fs: 40});
  s.cpu = chip(st, "CPU", "#3a86ff", {fs: 54}); s.gpu = chip(st, "GPU", "#06a77d", {fs: 54}); s.win = chip(st, "🏁 finished first!", "#f72585", {fs: 38});
  s.run = t => { const a = (w, f) => cue("try", w, f), t0 = SC.try.t0, tO = a("alone", .3), tTw = a("twenty#2", .4), tWho = a("who", .6), tD = a("difference", .8);
    kPop(s.h, 600, 125, t, t0 - .2); op(s.h, on(t, t0 - .2, tD - .3, .2)); op(s.L, ramp(t, a("one", .15) - .2, a("one", .15))); op(s.R, ramp(t, tTw - .4, tTw));
    const go = tWho - .3, doneL = Math.min(20, Math.max(0, Math.floor((t - go) * 1.6))); s.cnt.textContent = `${doneL} / 20 done`;
    s.stack.forEach((c, i) => { tf(c, `translate(${i < doneL ? 400 : 140} ${i < doneL ? 710 - (i % 10) * 10 : 710 - i * 18}) rotate(${i < doneL ? 8 : -4})`); op(c, i < doneL ? .5 : 1); });
    s.pp.forEach((g, i) => { tf(g.tk, "translate(36 -132)"); op(g.tk, t > go + .7 ? 1 : 0); tf(g.c, `translate(0 -112) scale(${t > go + .7 ? .8 : 1})`); });
    s.timer.querySelector("text").textContent = `⏱️ ${Math.max(0, Math.floor(t - go))} s`; kPop(s.timer, 600, 800, t, go); op(s.timer, on(t, go, tD - .3, .2));
    kPop(s.win, 850, 200, t, go + 1); kPop(s.cpu, 260, 200, t, tD - .2); kPop(s.gpu, 850, 200, t, tD); if (t > tD - .3) op(s.win, 0); };
  return s; })();

// ---- THINK ABOUT IT: why must chip factories be even cleaner than an operating theatre? (a dust speck drifts towards the wafer)
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7"), st = kW(s);
  s.title = kT(st, 600, 150, "🤔 Think about it!", 76, "#ffe14d");
  s.w = el("g", {transform: "translate(600 640)"}, st); el("ellipse", kA({rx: 420, ry: 90, fill: kGrad([[0, "#ced4da"], [1, "#6c757d"]])}), s.w);
  const wc = kClip(s.w, ["ellipse", {rx: 412, ry: 84}]); for (let i = 0; i < 40; i++) el("rect", {x: -420 + i * 21, y: -90, width: 9, height: 180, fill: i % 2 ? "#9d4edd" : "#fde68a", opacity: .55}, wc);
  s.d = el("g", {}, st); kDust(s.d, 80); s.q = emo(st, 960, 330, 120, "❓");
  s.c = chip(st, "Why must chip factories be cleaner than an operating theatre?", "#e63946", {fs: 32}); s.ans = chip(st, "Answer next time!", "#f72585", {fs: 46});
  s.run = t => { const a = (w, f) => cue("think", w, f), t0 = SC.think.t0, tC = a("cleaner", .45);
    tf(s.title, `scale(${Math.max(0, pop(t, t0 - .2))})`); set(s.title, "x", 600); tf(s.title, `translate(600 150) scale(${Math.max(0, pop(t, t0 - .2))}) translate(-600 -150)`);
    const f = clamp((t - t0) / 6); tf(s.d, `translate(${lerp(260, 640, f)} ${lerp(260, 540, f) + 18 * Math.sin(t * 2)}) rotate(${t * 30})`);
    tf(s.q, `translate(960 330) scale(${Math.max(0, pop(t, tC)) * (1 + .08 * Math.sin(t * 5))}) translate(-960 -330)`);
    kPop(s.c, 600, 800, t, a("why", .2)); kPop(s.ans, 600, 260, t, a("next", .9)); };
  return s; })();

// ---- CLOSE: back to the chip, pull out to the grain of sand on the beach where it all started
S.close = (() => { const s = scene("close", "#ffd6a5", "#fdffb6"), st = kW(s);
  s.beach = el("g", {}, st); el("rect", {x: -300, y: -200, width: 1900, height: 700, fill: "#8ecae6"}, s.beach); el("rect", {x: -300, y: 380, width: 1900, height: 140, fill: "#219ebc"}, s.beach);
  el("path", {d: "M-300 500 Q300 470 600 500 T1500 490 L1800 490 V1100 H-300 Z", fill: "#f2d49b"}, s.beach); el("circle", {cx: 1000, cy: 120, r: 70, fill: "#ffd60a", stroke: INK, "stroke-width": 6}, s.beach);
  seed = 41; for (let i = 0; i < 70; i++) el("circle", {cx: -200 + rnd() * 1600, cy: 540 + rnd() * 480, r: 3 + rnd() * 4, fill: "#d4a373"}, s.beach);
  s.gr = el("g", {transform: "translate(600 700)"}, st); kGrain(s.gr, 70, 5); s.gf = kFace(s.gr, 46);
  s.ch = el("g", {}, st); s.die = el("g", {}, s.ch); kDie(s.die, 260, 330);
  s.r1 = chip(st, "100 billion+ switches", "#7209b7", {fs: 42}); s.r2 = chip(st, "drawn with light and shadow", "#3a0ca3", {fs: 42}); s.r3 = chip(st, "🏖️ from a grain of sand", "#f77f00", {fs: 42});
  s.run = t => { const a = (w, f) => cue("close", w, f), t0 = SC.close.t0, tD = a("drawn", .3), tA = a("all", .62), tG = a("grain", .9);
    const k = ramp(t, tA - .4, tA + .6); op(s.beach, k); tf(s.ch, `translate(600 ${lerp(430, 700, k)}) scale(${lerp(1, .1, k)})`); op(s.ch, 1 - ramp(t, tA + .2, tA + .6));
    tf(s.gr, `translate(600 700) scale(${ramp(t, tA + .2, tA + .8)})`); s.gf.blink(t);
    kPop(s.r1, 600, 130, t, t0); kPop(s.r2, 600, 220, t, tD - .1); kPop(s.r3, 600, 310, t, tG - .2); };
  return s; })();
