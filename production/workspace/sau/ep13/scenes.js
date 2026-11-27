/* ep13/scenes.js: TheOneApp, Explored EP13 "Super El Niño! Why is Singapore so hot and dry?" (PHASE 1: the key scenes for the teacher's
   look-check stills; the remaining scenes are listed in ep13/SCRIPT.md and are built after the teacher's four answers).
   Load after common.js, ep13/geo13.js (real maps), ep13/spr13.js (buddy pictures), ep13/mouth13.js (lip-sync).
   Every map is Natural Earth at true longitude and latitude (rule 9); one kind of label per row (rule 10).
   Buddies: the teacher's paintings (no code-drawn buddies). Pip is "he", Momo "she", Basil "he" (SERIES_FORMAT section 5). */

/* ---------- helpers (n = Niño) ---------- */
const nA = (a, b) => Object.assign({stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round"}, a, b || {});
const nDefs = () => $("v").querySelector("defs"); let nUid = 0;
function nGrad(stops, kind = "linearGradient", attrs = {x1: 0, y1: 0, x2: 0, y2: 1}) { const id = "ng" + (++nUid), g = el(kind, Object.assign({id}, attrs), nDefs());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
const nT = (p, x, y, s, fs = 40, fill = "#fff", o = {}) => tx(p, Object.assign({x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill, class: fill === INK ? "" : "out", "stroke-width": fs * .2}, o), s);
const nPop = (e, x, y, t, a, s = 1, r = 0) => { tf(e, `translate(${x} ${y}) rotate(${r}) scale(${s * Math.max(0, pop(t, a))})`); op(e, ramp(t, a - .05, a + .1)); };
function nClip(p, shape) { const id = "nc" + (++nUid), cp = el("clipPath", {id}, nDefs()); el(shape[0], shape[1], cp); return el("g", {"clip-path": `url(#${id})`}, p); }
const nHash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
// scenes here draw on the whole screen (x -150..1770, y -60..1020). In a Short (1080 x 1920) only the 1200 x 900 box is free between the
// header question and the captions, so each scene used in a Short says which point (cx, cy) goes to the box centre, at scale k.
const nFIT = {povShrink: [810, 500, 1], povWind: [810, 500, 1], povWarm: [810, 500, 1], povCloud: [810, 500, 1], povRain: [810, 500, 1], povDry: [810, 500, 1],
  povWeak: [720, 470, .75], thermo: [720, 470, .75], india: [640, 520, .7], usa: [600, 500, .7], bye: [600, 450, 1]};
const nWhole = s => { const g = el("g", {}, s.stage), f = nFIT[s.name]; if (SHORT && f) tf(g, `translate(600 450) scale(${f[2]}) translate(${-f[0]} ${-f[1]})`); return g; };
const nYou = "#FFC83A";
// "this is you": a soft coloured edge, centred on the first-person view (810, 500) and big enough for the Shorts' fitted view too
function nVig(p, col, a = .55) { const id = "nv" + (++nUid), g = el("radialGradient", {id, cx: .5, cy: .5, r: .5}, nDefs());
  el("stop", {offset: .62, "stop-color": col, "stop-opacity": 0}, g); el("stop", {offset: 1, "stop-color": col, "stop-opacity": a}, g);
  const w = SHORT ? 1300 : 2000, h = SHORT ? 2300 : 1200; return el("rect", {x: 810 - w / 2, y: 500 - h / 2, width: w, height: h, fill: `url(#${id})`}, p); }                                                  // sun-yellow = YOU (series colour rule)
const BUDCOL = {pip: "#8B5CF6", basil: "#14B8A6", momo: "#FB7158"};
// a "You: ..." tag, as the Explained journeys (a yellow pill with a dark rim)
function nYouTag(p, text) { const g = el("g", {}, p); const w = text.length * 22 + 70;
  el("rect", {x: -w / 2, y: -36, width: w, height: 72, rx: 36, fill: nYou, stroke: INK, "stroke-width": 6, filter: "url(#sh)"}, g);
  tx(g, {x: 0, y: 14, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, text); return g; }
// a cloud: the outside of a cumulus cloud (made of tiny water droplets)
function nCloud(p, s = 1, col = "#fff", dark = "#cfe3f3") { const o = el("g", {}, p), g = el("g", {transform: `scale(${s})`}, o);
  el("path", nA({d: "M-120 30 Q-150 30 -150 0 Q-150 -34 -112 -36 Q-104 -82 -52 -80 Q-30 -118 18 -108 Q62 -104 72 -66 Q116 -76 134 -36 Q160 -30 156 4 Q154 30 124 30 Z", fill: col, "stroke-width": 6 / s}), g);
  el("path", {d: "M-118 22 H128", stroke: dark, "stroke-width": 10, "stroke-linecap": "round", opacity: .8}, g); return o; }
function nRainCloud(p, s = 1) { const g = el("g", {}, p); g.c = nCloud(g, s, "#dfe7ef", "#9fb3c8"); g.drops = [];
  for (let i = 0; i < 7; i++) g.drops.push(el("path", {d: "M0 0 l-6 22", stroke: "#3a86ff", "stroke-width": 6 * s, "stroke-linecap": "round"}, g)); return g; }
function runRain(g, t, s = 1, on1 = 1) { g.drops.forEach((d, i) => { const ph = ((t * 1.6 + i * .37) % 1); tf(d, `translate(${(-110 + i * 36) * s} ${(40 + ph * 110) * s})`); op(d, on1 * (1 - ph) * 1.2); }); }
function nSun(p, r = 60) { const g = el("g", {}, p); g.rays = el("g", {}, g);
  for (let i = 0; i < 12; i++) el("path", {d: `M0 ${-r - 14} V${-r - 40}`, stroke: "#ffbe0b", "stroke-width": 9, "stroke-linecap": "round", transform: `rotate(${i * 30})`}, g.rays);
  el("circle", nA({r, fill: "#ffd60a", "stroke-width": 6}), g); return g; }
function nArrow(p, len, col = "#ffd166", w = 24) { const g = el("g", len < 0 ? {transform: "scale(-1 1)"} : {}, p); len = Math.abs(len); el("path", {d: `M0 ${-w / 2} H${len - w * 1.5} V${-w * 1.2} L${len} 0 L${len - w * 1.5} ${w * 1.2} V${w / 2} H0 Z`, fill: col, stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, g); return g; }
// EP1's smoke particle (ep01/pov.js hzMote, copied under our own name): the inset that links to Episode 1
function nMote(p, r = 24) { const g = el("g", {}, p), k = r / 24, b = blob(g, r * 1.12, "#7d6f5a", 913); set(b, "stroke-width", 4 * k);
  el("ellipse", {cx: -9 * k, cy: -14 * k, rx: 7 * k, ry: 4 * k, fill: "#fff", opacity: .35, transform: `rotate(-30 ${-9 * k} ${-14 * k})`}, g);
  [-8, 8].forEach(x => { el("circle", {cx: x * k, cy: -3 * k, r: 5.6 * k, fill: "#fff"}, g); el("circle", {cx: (x + 1) * k, cy: -2 * k, r: 2.8 * k, fill: INK}, g); });
  el("path", {d: `M${-6 * k} ${9 * k} Q0 ${13 * k} ${6 * k} ${9 * k}`, fill: "none", stroke: INK, "stroke-width": 2.6 * k, "stroke-linecap": "round"}, g); return g; }

/* ---------- the buddies: the teacher's paintings as cut-out sprites ---------- */
// A speaking buddy is always in the talking sprite (lip-sync from mouth13.js) and blinks; a back view never speaks.
const nSeg = id => TL.segs.find(s => s.id === id);
// Every picture of a buddy is in the page from the start (one <image> each, shown or hidden), and the page reports READY only when all
// the buddy pictures have loaded: a pose change never shows a blank frame, whichever frame a render browser starts on.
(function () { const files = [...new Set(Object.values(SPR13).map(o => o.file))]; let n = 0, r = false;
  files.forEach(f => { const im = new Image(); im.onload = im.onerror = () => { n++; }; im.src = f; });
  Object.defineProperty(window, "READY", {configurable: true, get() { return r && n >= files.length; }, set(v) { r = v; }}); })();
function nBud(p, who, aura = true) { const g = el("g", {}, p); g.who = who; g.cur = "";
  g.aura = aura ? el("ellipse", {rx: 1, ry: 1, fill: BUDCOL[who], opacity: .28}, g) : null; g.imgs = {};
  Object.keys(SPR13).filter(k => k.startsWith(who + "_")).forEach(k => { const S = SPR13[k]; g.imgs[k] = el("image", {href: S.file, width: S.w, height: S.h, opacity: 0}, g); });
  return g; }
function nTalk(who, t) { let m = -1; for (const id in (window.MOUTH || {})) { const M = MOUTH[id]; if (M.who !== who) continue; const sg = nSeg(id);
    if (!sg || t < sg.t0 - .05 || t > sg.t1 + .05) continue; m = M.m[clamp(Math.floor((t - sg.t0) * 30), 0, M.m.length - 1)] || 0; } return m; }
// nShow(g, x, y, h, pose, t): feet at (x, y), body height h; pose "sit" talks and blinks by itself, else a painted pose ("waving", "back", ...)
function nShow(g, x, y, h, pose, t, o = {}) { const w = g.who; let name;
  if (pose === "sit") { const m = Math.max(0, nTalk(w, t)), bl = ((t + {pip: 0, momo: 1.3, basil: 2.1}[w]) % 3.7) < .13;
    name = m === 0 ? (bl ? `${w}_sit_blink` : `${w}_sit_closed`) : `${w}_sit_${m === 1 ? "half" : "wide"}${bl ? "_blink" : ""}`; }
  else name = `${w}_${pose}`;
  if (!SPR13[name]) name = `${w}_sit_closed`;                                 // e.g. no back painting: the front view
  const S = SPR13[name];
  if (g.cur !== name) { if (g.cur) op(g.imgs[g.cur], 0); op(g.imgs[name], 1); g.cur = name; }
  const k = h * (w === "basil" ? .88 : 1) / S.bh * (o.k || 1);
  tf(g.imgs[name], `scale(${(o.flip ? -1 : 1) * k} ${k}) translate(${-S.ax} ${-S.ay})`);
  if (g.aura) { set(g.aura, "cx", 0); set(g.aura, "cy", -h * .45); set(g.aura, "rx", h * .62); set(g.aura, "ry", h * .62); op(g.aura, o.aura === undefined ? .28 : o.aura); }
  tf(g, `translate(${x} ${y + (o.bob ? Math.sin(t * 2.2 + x) * o.bob : 0)}) rotate(${o.rot || 0})`); op(g, o.op === undefined ? 1 : o.op); }

/* ======================================================================================================================
   0:00 HDB CORRIDOR AT NOON. The silent cold open (fan whirring, birds), then Heart; the buddies flop in the heat.
   One-point perspective along the corridor: the open side (parapet and railing) on the left, the flats' doors on the right. */
S.corridor = (() => { const s = scene("corridor", "#fff3c4", "#ffd166"), st = nWhole(s);
  const V = [930, 330], F = {l: 860, r: 1000, t: 250, b: 420};           // the far end of the corridor
  // outside (seen over the parapet): the noon sky and the next HDB block, in the glare
  const out = nClip(st, ["path", {d: `M-150 -60 L${F.l} ${F.t} L${F.l} 372 L-150 600 Z`}]);
  el("rect", {x: -150, y: -60, width: 1100, height: 700, fill: nGrad([[0, "#9ad1ff"], [.6, "#e8f6ff"], [1, "#fffbe8"]])}, out);
  const blk = el("g", {}, out); el("path", {d: "M-150 120 L620 236 L620 520 L-150 640 Z", fill: "#f1e3c8", stroke: "#b9a688", "stroke-width": 3}, blk);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) { const u = c / 9, x = lerp(-120, 590, u), y0 = lerp(150, 250, u) + r * lerp(70, 44, u);
    el("rect", {x, y: y0, width: lerp(48, 26, u), height: lerp(34, 20, u), fill: (r + c) % 3 ? "#7fb0d6" : "#f4a261", opacity: .8}, blk); }
  s.sunG = nSun(out, 70); tf(s.sunG, "translate(700 60)");
  el("rect", {x: -150, y: -60, width: 1100, height: 700, fill: "#fff8d6", opacity: .35}, out);          // glare
  // ceiling, right wall, floor, parapet face
  el("path", {d: `M-150 -60 L${F.l} ${F.t} L${F.r} ${F.t} L1770 -60 Z`, fill: "#f2eadb"}, st);
  for (let i = 0; i < 5; i++) { const u = 1 - Math.pow(.62, i + 1), y = lerp(-60, F.t, u), x0 = lerp(-150, F.l, u), x1 = lerp(1770, F.r, u);
    el("rect", {x: lerp(x0, x1, .5) - lerp(90, 14, u), y: y + 6, width: lerp(180, 28, u), height: lerp(14, 3, u), rx: 4, fill: "#fffdf2", stroke: "#c9bda6", "stroke-width": 2}, st); }
  el("path", {d: `M${F.r} ${F.t} L1770 -60 L1770 1020 L${F.r} ${F.b} Z`, fill: "#efe2c6"}, st);
  el("path", {d: `M-150 1020 L${F.l} ${F.b} L${F.r} ${F.b} L1770 1020 Z`, fill: nGrad([[0, "#c9b99a"], [1, "#a8977a"]])}, st);
  for (let i = 1; i < 9; i++) { const u = 1 - Math.pow(.72, i); el("path", {d: `M${lerp(-150, F.l, u)} ${lerp(1020, F.b, u)} L${lerp(1770, F.r, u)} ${lerp(1020, F.b, u)}`, stroke: "#9a8a6e", "stroke-width": lerp(3, 1, u), opacity: .5}, st); }
  el("path", {d: `M-150 600 L${F.l} 372 L${F.l} ${F.b} L-150 1020 Z`, fill: "#e9dcc0", stroke: "#b9a688", "stroke-width": 3}, st);
  el("path", {d: `M-150 600 L${F.l} 372`, stroke: "#8d99ae", "stroke-width": 10}, st);                    // the railing on the parapet
  // doors along the right wall (gates, shoe racks, a potted plant)
  [.08, .45, .7].forEach((u, i) => { const x = lerp(1770, F.r, u), x2 = lerp(1770, F.r, u + .16), yt = lerp(-60, F.t, u), yb = lerp(1020, F.b, u), yt2 = lerp(-60, F.t, u + .16), yb2 = lerp(1020, F.b, u + .16);
    const hT = (a, b) => lerp(a, b, .3); el("path", {d: `M${x} ${hT(yt, yb)} L${x2} ${hT(yt2, yb2)} L${x2} ${yb2} L${x} ${yb} Z`, fill: ["#8d5a3b", "#3d6b8f", "#7a4e7e"][i], stroke: INK, "stroke-width": 3}, st);
    for (let k = 1; k < 6; k++) el("path", {d: `M${lerp(x, x2, k / 6)} ${lerp(hT(yt, yb), hT(yt2, yb2), k / 6)} V${lerp(yb, yb2, k / 6)}`, stroke: "#2b2d42", "stroke-width": lerp(4, 2, u), opacity: .55}, st); });
  // sun patches on the floor (light comes in over the parapet) and heat shimmer above them
  s.patch = el("path", {d: "M-150 760 L520 610 L900 640 L420 1020 L-150 1020 Z", fill: "#fff3a8", opacity: .55}, st);
  s.shim = []; for (let i = 0; i < 6; i++) s.shim.push(el("path", {fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: .5}, st));
  // a standing fan by Pip (its blades turn: the only moving prop)
  s.fan = el("g", {transform: "translate(70 560)"}, st); el("path", nA({d: "M0 30 V330 M-70 330 H70", stroke: "#6c757d", "stroke-width": 14}), s.fan);
  el("circle", nA({r: 118, fill: "#e9ecef", "stroke-width": 6}), s.fan); s.blades = el("g", {}, s.fan);
  for (let i = 0; i < 3; i++) el("path", {d: "M0 0 Q40 -30 0 -100 Q-30 -40 0 0 Z", fill: "#90e0ef", stroke: INK, "stroke-width": 3, transform: `rotate(${i * 120})`}, s.blades);
  el("circle", nA({r: 20, fill: "#adb5bd", "stroke-width": 4}), s.fan);
  for (let i = 0; i < 8; i++) el("line", {x1: 0, y1: 0, x2: Math.cos(i * .785) * 116, y2: Math.sin(i * .785) * 116, stroke: "#6c757d", "stroke-width": 2}, s.fan);
  // Momo's water bowl, half empty (the water level line and a dry ring where the water used to be)
  s.bowl = el("g", {}, st); el("ellipse", nA({cx: 0, cy: 0, rx: 96, ry: 30, fill: "#e63946", "stroke-width": 5}), s.bowl);
  el("ellipse", {cx: 0, cy: -2, rx: 80, ry: 22, fill: "#f1faee", stroke: INK, "stroke-width": 3}, s.bowl);
  el("ellipse", {cx: 0, cy: 4, rx: 58, ry: 14, fill: "#8ecae6", stroke: "#219ebc", "stroke-width": 3}, s.bowl);
  // Pip's paper hand fan (a prop he holds up; Pip himself is the teacher's painting)
  s.pfan = el("g", {}, st); el("path", nA({d: "M0 0 L-50 -80 A94 94 0 0 1 50 -80 Z", fill: "#ffb703", "stroke-width": 4}), s.pfan);
  for (let i = -2; i <= 2; i++) el("line", {x1: 0, y1: 0, x2: i * 24, y2: -86, stroke: INK, "stroke-width": 2, opacity: .6}, s.pfan);
  s.pip = nBud(st, "pip"); s.momo = nBud(st, "momo"); s.basil = nBud(st, "basil");
  st.appendChild(s.bowl); st.appendChild(s.pfan);
  s.card = chip(st, "📍 NOVEMBER, SINGAPORE", INK, {fs: 40});
  s.run = t => { const t0 = SC.corridor.t0, tO = cue("corridor", "oven", .3);
    tf(s.blades, `rotate(${t * 900})`);
    s.shim.forEach((e, i) => { const x = 40 + i * 130, ph = (t * .6 + i * .27) % 1, y = 840 - ph * 260;
      set(e, "d", `M${x} ${y} q12 -18 0 -36 q-12 -18 0 -36`); op(e, .45 * Math.sin(ph * Math.PI)); });
    const pf = Math.sin(t * 9) * 18; tf(s.pfan, `translate(410 800) rotate(${-25 + pf})`);
    nShow(s.pip, 330, 930, 250, "sit", t, {rot: -4}); tf(s.bowl, "translate(830 905)"); nShow(s.momo, 640, 935, 255, "sit", t);
    nShow(s.basil, 1120, 940, 260, "sit", t, {flip: true});
    popAt(s.card, 600, 60, t, t0 + .3); op(s.card, on(t, t0 + .3, tO + 1.2, .3));
    };
  return s; })();

/* ======================================================================================================================
   0:25 FROM SINGAPORE TO THE PACIFIC: a real globe (Natural Earth), the camera eases from Singapore out over the Pacific. */
S.globeFly = (() => { const s = scene("globeFly", "#020817", "#0b132b"), st = nWhole(s), G = GEO13.GLOBE;
  seed = 31; for (let i = 0; i < 120; i++) el("circle", {cx: -150 + rnd() * 1920, cy: -60 + rnd() * 1080, r: .8 + rnd() * 2, fill: "#fff", opacity: .3 + rnd() * .5}, st);
  s.W = el("g", {}, st); el("circle", {cx: G.c[0], cy: G.c[1], r: G.r + 16, fill: "#4cc9f0", opacity: .35, filter: "url(#blur)"}, s.W);
  el("circle", nA({cx: G.c[0], cy: G.c[1], r: G.r, fill: nGrad([[0, "#4fb3e8"], [1, "#0b4f8a"]], "radialGradient", {cx: .4, cy: .35, r: .8})}), s.W);
  const gc = nClip(s.W, ["circle", {cx: G.c[0], cy: G.c[1], r: G.r}]); el("path", {d: G.grat, fill: "none", stroke: "#fff", "stroke-width": 1.5, opacity: .2}, gc);
  el("path", {d: G.land, fill: "#95d5b2", stroke: INK, "stroke-width": 2}, gc);
  s.sg = el("g", {}, s.W); el("circle", {cx: G.sg[0], cy: G.sg[1], r: 10, fill: "#e63946", stroke: "#fff", "stroke-width": 4}, s.sg); nT(s.sg, G.sg[0] + 10, G.sg[1] + 44, "Singapore", 28);
  s.pac = nT(s.W, 760, 360, "Pacific Ocean", 44);
  s.run = t => { const a = (w, f) => cue("globeFly", w, f), tP = a("pacific", .5), tS = a("shrink", .8);
    const z = lerp(2.4, 1, ramp(t, SC.globeFly.t0, tP)), cx = lerp(G.sg[0], 640, ramp(t, SC.globeFly.t0, tP)), z2 = z * lerp(1, 3.2, ramp(t, tS, SC.globeFly.t1 + .4));
    const cx2 = lerp(cx, G.mid[0], ramp(t, tS - .4, SC.globeFly.t1)); tf(s.W, `translate(810 480) scale(${z2}) translate(${-cx2} ${-G.c[1]})`);
    op(s.pac, ramp(t, tP - .3, tP + .2)); };
  return s; })();

/* ======================================================================================================================
   0:40 BE THE THING: "You: a gust of the trade wind". First person, low over the Pacific, flying WEST (towards Asia, the horizon).
   Wave crests rush at the camera, wind streaks stream past; the buddies ride along SHRUNK DOWN (Momo and Basil in back view, looking
   ahead with the viewer; Pip turned to the camera because he speaks on this journey). A small real map (bottom right) shows where you are. */
function nPovSea(name, warm, mode) { const s = scene(name, "#3a86ff", "#bde0fe"), st = nWhole(s), HZ = 330, P = GEO13.PAC;
  el("rect", {x: -400, y: -800, width: 2400, height: HZ + 800, fill: nGrad([[0, "#1e4fb0"], [.55, "#2f6fd6"], [.85, "#9fd0ff"], [1, "#e6f4ff"]])}, st);
  // the western horizon: a line of tall rain clouds over the warm sea near Asia (a normal year)
  s.hcl = el("g", {}, st); [[-60, .55], [180, .8], [430, .6], [700, .9], [980, .65], [1250, .75], [1520, .55]].forEach(([x, k]) => { const c = nCloud(s.hcl, k * .9, "#ffffff", "#d7e3ef"); tf(c, `translate(${x} ${HZ - 30 * k})`); });
  el("rect", {x: -400, y: HZ, width: 2400, height: 1800 - HZ, fill: nGrad(warm ? [[0, "#5aa9d6"], [.35, "#2a7fb8"], [1, "#0b3d66"]] : [[0, "#5aa9d6"], [.35, "#2a7fb8"], [1, "#0b3d66"]])}, st);
  s.warm = el("rect", {x: -400, y: HZ, width: 2400, height: 1800 - HZ, fill: nGrad([[0, "#ffd29d"], [.3, "#ffa94d"], [.75, "#f76707"], [1, "#d9480f"]]), opacity: 0}, st);
  // wave crests on the sea plane, drawn in depth (near = big, fast)
  seed = 41; s.crest = []; for (let i = 0; i < 70; i++) { const e = el("path", {d: "M-40 0 Q-20 -10 0 0 Q20 -10 40 0", fill: "none", stroke: "#e0f4ff", "stroke-width": 5, "stroke-linecap": "round"}, st); s.crest.push({e, x: rnd() * 2 - 1, z0: rnd()}); }
  // warm-water flow arrows on the surface, pointing away from us: the warm top layer is pushed west with the wind
  s.flow = []; for (let i = 0; i < 10; i++) { const e = el("path", {d: "M-44 16 L0 -10 L44 16", fill: "none", stroke: "#fff3bf", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0}, st); s.flow.push({e, x: (i % 5) / 2 - 1 + (i > 4 ? .25 : 0), z0: i / 10}); }
  // wind streaks rushing past the camera (you ARE this moving air)
  seed = 43; s.wind = []; for (let i = 0; i < 26; i++) { const e = el("path", {fill: "none", stroke: "#ffffff", "stroke-width": 6, "stroke-linecap": "round"}, st); s.wind.push({e, a: rnd() * Math.PI * 2, z0: rnd(), c: .7 + rnd() * .6}); }
  nVig(st, "#d8f3ff", .7);
  // the buddies riding a curl of wind just below the camera
  s.curl = el("path", {d: "M-260 0 Q-120 -60 0 -20 Q120 20 260 -30", fill: "none", stroke: "#fff", "stroke-width": 16, "stroke-linecap": "round", opacity: .8}, st);
  s.rings = [0, 1, 2].map(() => el("circle", {cx: 810, cy: 640, r: 40, fill: "none", stroke: "#fff", "stroke-width": 10, opacity: 0}, st));   // the shrink
  s.pip = nBud(st, "pip", false); s.momo = nBud(st, "momo", false); s.basil = nBud(st, "basil", false);
  // a little real map: where you are (the tropical Pacific, Asia on the left, as the wind sees it)
  s.map = el("g", {}, st); const mk = .2, mx = 1030, my = 640;
  const mc = nClip(s.map, ["rect", {x: 0, y: 0, width: 1840 * mk, height: 640 * mk, rx: 18}]);
  el("rect", {x: 0, y: 0, width: 1840 * mk, height: 640 * mk, fill: "#48cae4"}, mc);
  s.mwarm = el("ellipse", {cx: (P.indo[0] + 110 + 230) * mk, cy: (P.yc - 150) * mk, rx: 400 * mk, ry: 120 * mk, fill: "#fb8500", opacity: 0, filter: "url(#blur)"}, mc);
  el("path", {d: P.land, fill: "#95d5b2", stroke: INK, "stroke-width": 8, transform: `scale(${mk}) translate(110 -150)`}, mc);
  el("rect", {x: 0, y: 0, width: 1840 * mk, height: 640 * mk, rx: 18, fill: "none", stroke: INK, "stroke-width": 5}, s.map);
  s.mdot = el("circle", {r: 10, fill: nYou, stroke: INK, "stroke-width": 3}, s.map); nT(s.map, (P.sg[0] + 110) * mk + 6, (P.sg[1] - 150) * mk + 34, "Singapore", 20);
  nT(s.map, 1840 * mk / 2, 640 * mk + 30, "Pacific Ocean", 22); s.mx = mx; s.my = my; s.mk = mk;
  s.tag = nYouTag(st, "You: a gust of the trade wind");
  s.card = chip(st, "WARM WATER PILES UP NEAR ASIA", "#e85d04", {fs: 38});
  s.run = t => { const sc = SC[name], k0 = sc.t0, f = clamp((t - k0) / (sc.t1 - k0)), spd = .32;
    s.crest.forEach(o => { const z = ((o.z0 - t * spd) % 1 + 1) % 1, zz = .06 + 1.6 * z, y = HZ + 120 / zz * .9, x = 810 + o.x * 1100 / zz * .5;
      tf(o.e, `translate(${x} ${y}) scale(${.5 / zz})`); op(o.e, clamp((1 - z) / .25) * clamp((z - .02) / .1) * .85); });
    s.flow.forEach(o => { const z = ((o.z0 + t * .18) % 1 + 1) % 1, zz = .1 + 1.4 * z, y = HZ + 120 / zz * .9, x = 810 + o.x * 900 / zz * .5;
      tf(o.e, `translate(${x} ${y}) scale(${.9 / zz} ${.5 / zz})`); op(o.e, warm ? ramp(t, cue(name, "warm#2", .3) - .2, cue(name, "warm#2", .3) + .4) * clamp((1 - z) / .3) * clamp((z - .03) / .1) : 0); });
    s.wind.forEach(o => { const z = ((o.z0 - t * .55) % 1 + 1) % 1, zz = .1 + 3 * z, r = 260 / zz, a = o.a, cx = 810 + Math.cos(a) * r * 1.4, cy = 480 + Math.sin(a) * r * .8;
      const L = 160 / zz * o.c; set(o.e, "d", `M${cx} ${cy} q${Math.cos(a) * L * .5 + 20} ${Math.sin(a) * L * .2 - 10} ${Math.cos(a) * L} ${Math.sin(a) * L * .5}`); set(o.e, "stroke-width", clamp(14 / zz, 2, 22));
      op(o.e, .85 * clamp((1 - z) / .3) * clamp((z - .05) / .2) * (Math.abs(Math.sin(a)) < .25 && cy > 400 && cy < 560 ? .3 : 1)); });
    op(s.warm, warm ? .92 * ramp(t, cue(name, "warm", .1) - .2, cue(name, "warm", .1) + .8) : 0);
    tf(s.curl, `translate(${SHORT ? 600 : 470} ${900 + Math.sin(t * 1.4) * 6})`); op(s.curl, mode === "shrink" ? ramp(t, k0 + 1.6, k0 + 2.4) : .8);
    const X = SHORT ? [360, 600, 830] : [230, 470, 700], sk = mode === "shrink" ? lerp(SHORT ? 1.7 : 2.3, 1, ramp(t, k0 + .3, k0 + 2.4)) : 1, Y = 915 - (sk - 1) * 120;
    nShow(s.pip, X[0] - (sk - 1) * (SHORT ? 120 : 200), Y, 200 * sk, mode === "shrink" && t < k0 + 1.9 ? "sit" : (nTalk("pip", t) >= 0 ? "sit" : "back"), t, {bob: 5});
    nShow(s.momo, X[1], Y, 195 * sk, mode === "shrink" && t < k0 + 1.9 ? "sit" : "back", t, {bob: 5});
    nShow(s.basil, X[2] + (sk - 1) * (SHORT ? 120 : 200), Y, 195 * sk, mode === "shrink" && t < k0 + 1.9 ? "sit" : "back", t, {bob: 5});
    if (mode === "shrink") { s.rings.forEach((r, i) => { const ph = clamp((t - k0 - .3 - i * .35) / 1.2); set(r, "r", 40 + ph * 600); op(r, (1 - ph) * (ph > 0 ? .8 : 0)); }); }
    popAt(s.tag, 810, 60, t, mode === "shrink" ? k0 + 2.3 : SC[name].t0 - .2);
    tf(s.map, `translate(${s.mx} ${s.my})`); op(s.map, mode === "shrink" ? ramp(t, k0 + 2.2, k0 + 2.8) : 1); const dx = lerp(1450, 1100, f); tf(s.mdot, `translate(${(dx + 110) * s.mk} ${(GEO13.PAC.yc - 4 - 150) * s.mk})`);
    op(s.mwarm, warm ? .85 * ramp(t, cue(name, "west", .6) - .3, cue(name, "west", .6) + .6) : 0);
    if (warm) { popAt(s.card, 810, 160, t, cue(name, "west", .6)); } else op(s.card, 0); };
  return s; }
S.povShrink = nPovSea("povShrink", false, "shrink");
S.povWind = nPovSea("povWind", false);
S.povWarm = nPovSea("povWarm", true);

/* ======================================================================================================================
   1:12 THIS YEAR: the outside shot that explains what the gust cannot see. The real tropical Pacific (Asia on the left): the trade-wind
   arrows shrink, the warm water (orange) slides back east, the rain clouds go with it, and Singapore is left under a clear sky.
   (Science: the warm water drives the rising, wet air that builds the big rain clouds; see SCRIPT.md, check 1.) */
S.povWeak = (() => { const s = scene("povWeak", "#0b3d66", "#1d6fa5"), st = nWhole(s), P = GEO13.PAC;
  const mc = nClip(st, ["rect", {x: -150, y: 150, width: 1920, height: 640}]);
  el("rect", {x: -150, y: 150, width: 1920, height: 640, fill: "#48cae4"}, mc);
  s.warmW = el("ellipse", {cx: P.indo[0] + 380, cy: P.yc, rx: 520, ry: 150, fill: "#fb8500", opacity: .8, filter: "url(#blur)"}, mc);
  s.warmE = el("ellipse", {cx: 1150, cy: P.yc + 10, rx: 620, ry: 120, fill: "#fb8500", opacity: 0, filter: "url(#blur)"}, mc);
  el("path", {d: `M-150 ${P.yc} H1770`, stroke: "#fff", "stroke-width": 2, "stroke-dasharray": "14 12", opacity: .6}, mc);
  el("path", {d: P.land, fill: "#95d5b2", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, mc);
  el("rect", {x: -150, y: 150, width: 1920, height: 640, fill: "none", stroke: INK, "stroke-width": 6}, st);
  nT(st, P.eq[0][0] + 1810, P.yc - 10, "Equator", 24, "#fff", {"text-anchor": "end"});
  // places (one kind of label: place names)
  s.sgD = el("g", {}, st); el("circle", {cx: P.sg[0], cy: P.sg[1], r: 12, fill: "#e63946", stroke: "#fff", "stroke-width": 4}, s.sgD); nT(s.sgD, P.sg[0] + 20, P.sg[1] + 52, "Singapore", 32);
  nT(st, 700, 640, "Pacific Ocean", 46, "#fff"); nT(st, P.peru[0] - 20, P.peru[1] + 90, "South America", 30, "#fff", {"text-anchor": "end"}); nT(st, 230, 720, "Australia", 30, "#fff");
  // the trade winds: arrows blowing east -> west along the equator
  s.tw = [0, 1, 2].map(i => { const g = el("g", {}, st); nArrow(g, -240, "#e63946", 30); return g; });
  // rain clouds that follow the warm water
  s.cl = [0, 1, 2].map(i => nRainCloud(st, .55));
  s.sun = nSun(st, 34);
  // legend (one kind of label: what the colours mean)
  s.leg = el("g", {transform: "translate(1140 840)"}, st); el("rect", {x: 0, y: -26, width: 52, height: 40, rx: 10, fill: "#fb8500", stroke: INK, "stroke-width": 3}, s.leg); nT(s.leg, 66, 6, "warm water", 30, "#fff", {"text-anchor": "start"});
  s.card = chip(st, "THIS YEAR", "#e63946", {fs: 44});
  s.pip = nBud(st, "pip");
  s.run = t => { const a = (w, f) => cue("povWeak", w, f), t0 = SC.povWeak.t0, tW = a("weaker", .2), tSl = a("slides", .4), tC = a("clouds", .7);
    const kw = ramp(t, tW - .3, tW + 1.5), ks = ramp(t, tSl - .2, tSl + 3.2), kc = ramp(t, tC - .6, tC + 2.4);
    s.tw.forEach((g, i) => { const ph = ((t * .5 + i / 3) % 1), x = lerp(1500, 600, ph), L = lerp(1, .55, kw);
      tf(g, `translate(${x} ${P.yc - 150 + i * 6 + (i - 1) * 90}) scale(${L})`); op(g, Math.sin(ph * Math.PI) * lerp(1, .75, kw)); });
    op(s.warmW, .85 * (1 - ks)); set(s.warmE, "cx", lerp(P.indo[0] + 380, 1150, ks)); op(s.warmE, .85 * ks);
    s.cl.forEach((g, i) => { const x0 = P.sg[0] + 60 + i * 200, x1 = 950 + i * 230; tf(g, `translate(${lerp(x0, x1, Math.max(ks * .6, kc))} ${P.yc - 140 + (i % 2) * 40})`); runRain(g, t + i, .55, 1); });
    tf(s.sun, `translate(${P.sg[0] + 30} ${P.sg[1] - 120}) scale(${Math.max(0, pop(t, tC + 1.6))})`); tf(s.sun.rays, `rotate(${t * 15})`);
    popAt(s.card, 810, 80, t, t0 + .1);
    nShow(s.pip, SHORT ? 300 : 60, SHORT ? 1060 : 960, SHORT ? 300 : 190, "sit", t); };
  return s; })();

/* ======================================================================================================================
   1:55 WHAT MAKES IT SUPER: the same real map; the Niño 3.4 box (5S to 5N, 170W to 120W: "the middle of the Pacific", NOAA's measuring
   box) lights up and a thermometer rises to +2 °C above usual. Momo asks "Only two degrees?". */
S.thermo = (() => { const s = scene("thermo", "#0b3d66", "#1d6fa5"), st = nWhole(s), P = GEO13.PAC, [b0, b1] = P.nino34;  // the thermometer stands over the open ocean west of the box
  const mc = nClip(st, ["rect", {x: -150, y: 150, width: 1920, height: 640}]);
  el("rect", {x: -150, y: 150, width: 1920, height: 640, fill: "#48cae4"}, mc);
  s.hot = el("ellipse", {cx: 1100, cy: P.yc + 10, rx: 640, ry: 125, fill: "#e85d04", opacity: .75, filter: "url(#blur)"}, mc);
  el("path", {d: P.land, fill: "#95d5b2", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round"}, mc);
  el("rect", {x: -150, y: 150, width: 1920, height: 640, fill: "none", stroke: INK, "stroke-width": 6}, st);
  s.box = el("rect", {x: b0[0], y: b0[1], width: b1[0] - b0[0], height: b1[1] - b0[1], fill: "#ffd60a", "fill-opacity": .2, stroke: "#ffd60a", "stroke-width": 7, "stroke-dasharray": "18 10"}, st);
  s.boxL = nT(st, (b0[0] + b1[0]) / 2, b0[1] - 22, "the middle of the Pacific", 30, "#ffd60a");
  el("circle", {cx: P.sg[0], cy: P.sg[1], r: 12, fill: "#e63946", stroke: "#fff", "stroke-width": 4}, st); nT(st, P.sg[0] + 20, P.sg[1] + 52, "Singapore", 32);
  // the thermometer: usual -> +2 °C (one kind of label: temperature above usual)
  s.th = el("g", {transform: "translate(600 300)"}, st); el("rect", nA({x: -34, y: -40, width: 68, height: 400, rx: 34, fill: "#fff"}), s.th);
  s.merc = el("rect", {x: -18, y: 200, width: 36, height: 150, rx: 18, fill: "#e63946"}, s.th); el("circle", nA({cx: 0, cy: 380, r: 56, fill: "#e63946"}), s.th);
  [[0, "usual"], [1, "+1 °C"], [2, "+2 °C"]].forEach(([d, l]) => { const y = 260 - d * 120; el("path", {d: `M-34 ${y} H-70`, stroke: INK, "stroke-width": 6}, s.th); nT(s.th, -82, y + 12, l, 34, "#fff", {"text-anchor": "end"}); });
  s.more = el("g", {}, s.th); el("path", nA({d: "M60 -80 L90 -120 L120 -80 Z", fill: "#ffd60a", "stroke-width": 4}), s.more);
  nT(s.more, 140, -76, "more than +2 °C", 34, "#ffd60a", {"text-anchor": "start"});
  s.tag = chip(st, "🔥 SUPER EL NIÑO", "#e63946", {fs: 50});
  s.momo = nBud(st, "momo");
  s.run = t => { const a = (w, f) => cue("thermo", w, f), t0 = SC.thermo.t0, tM = a("middle", .1), tD = a("degrees", .3), tS = a("super", .55), tH = a("heat", .9);
    op(s.box, ramp(t, tM - .2, tM + .3)); op(s.boxL, ramp(t, tM, tM + .3)); const k = ramp(t, tM + .3, tD + 1);
    set(s.merc, "y", lerp(200, -40, k)); set(s.merc, "height", lerp(150, 390, k)); popAt(s.th, 600, 300, t, t0 + .1, 1); op(s.more, ramp(t, tD + .6, tD + 1));
    op(s.hot, lerp(.35, .8, ramp(t, tD, tD + 1)) * (1 + .15 * on(t, tH - .3, tH + 1.4, .3) * Math.sin(t * 8)));
    popAt(s.tag, 810, 80, t, tS - .1); nShow(s.momo, SHORT ? 300 : 180, SHORT ? 1060 : 960, SHORT ? 300 : 200, "sit", t); };
  return s; })();

/* ======================================================================================================================
   2:15 THE WATER CYCLE, LOOK CLOSER: Singapore (the skyline, a reservoir, the sea), the Sun, water evaporating (water vapour cannot be
   seen: drawn as dotted arrows, never as white puffs), a cloud with a magnifier showing its tiny water droplets (liquid), rain, and the
   cycle arrow. Process words are the LOOK CLOSER tags; the things are named in plain white words (one kind of label per row). */
S.waterCycle = (() => { const s = scene("waterCycle", "#8ecae6", "#e0fbfc"), st = nWhole(s);
  el("path", {d: "M-150 640 Q300 610 700 640 T1400 630 L1770 630 V1020 H-150 Z", fill: "#a7c957"}, st);                                     // land
  el("path", {d: "M-150 660 Q100 640 300 668 Q360 760 330 1020 H-150 Z", fill: nGrad([[0, "#48cae4"], [1, "#0077b6"]]), stroke: INK, "stroke-width": 4}, st);   // the sea
  s.sk = skyline(st, 0, 0, "#6c757d"); tf(s.sk, "translate(560 655) scale(.7)");                                                   // Singapore
  el("ellipse", {cx: 700, cy: 800, rx: 150, ry: 40, fill: "#48cae4", stroke: INK, "stroke-width": 4}, st);                          // a reservoir
  s.sun = nSun(st, 64); tf(s.sun, "translate(40 150)");
  s.cloud = nCloud(st, 1.15);
  // evaporation: dotted arrows rising from the sea (water vapour is invisible, so it is never drawn as white puffs)
  s.ev = [0, 1, 2].map(i => el("path", {d: `M${-60 + i * 110} 700 Q${-30 + i * 110} 480 ${440 + i * 50} ${300 + i * 22}`, fill: "none", stroke: "#ffffff", "stroke-width": 8, "stroke-dasharray": "3 18", "stroke-linecap": "round"}, st));
  // FACES: each vapour path ends in a small white arrowhead pointing along the path (up and towards the cloud)
  s.evH = [0, 1, 2].map(i => { const ex = 440 + i * 50, ey = 300 + i * 22, cx = -30 + i * 110, cy = 480, a = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI;
    return el("path", {d: "M-14 -13 L10 0 L-14 13", fill: "none", stroke: "#ffffff", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round", transform: `translate(${ex} ${ey}) rotate(${a.toFixed(2)})`}, st); });
  s.rain = []; for (let i = 0; i < 16; i++) s.rain.push(el("path", {d: "M0 0 l-7 26", stroke: "#1d4ed8", "stroke-width": 7, "stroke-linecap": "round"}, st));
  // the water flows back: from the reservoir and drains to the sea (the cycle closes)
  s.back = el("path", {d: "M600 860 Q420 900 300 860", fill: "none", stroke: "#0077b6", "stroke-width": 10, "stroke-dasharray": "22 14", "stroke-linecap": "round"}, st);
  s.backH = el("path", {d: "M14 -16 L-12 0 L14 16 Z", fill: "#0077b6", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round", transform: `translate(292 857) rotate(${(Math.atan2(860 - 900, 300 - 420) * 180 / Math.PI - 180).toFixed(2)})`}, st);   // FACES: left, into the sea
  // the things, named in plain white words
  s.L = [["water", 90, 900], ["water vapour", 130, 430], ["clouds", 620, 70], ["rain", 840, 520]].map(([w, x, y]) => nT(st, x, y, w, 38));
  // LOOK CLOSER: a magnifier on the cloud: tiny water droplets, in the liquid state
  s.mag = el("g", {}, st); el("circle", {r: 150, fill: "#e8f4ff", stroke: INK, "stroke-width": 9}, s.mag);
  seed = 61; for (let i = 0; i < 40; i++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 126; el("circle", {cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 7 + rnd() * 6, fill: "#7cc6fe", stroke: "#1d4ed8", "stroke-width": 2}, s.mag); }
  el("path", {d: "M-106 106 L-180 180", stroke: INK, "stroke-width": 26, "stroke-linecap": "round"}, s.mag); nT(s.mag, 60, 200, "tiny water droplets", 32);
  s.look = chip(st, "🔍 LOOK CLOSER", "#7209b7", {fs: 40});
  s.tE = chip(st, "EVAPORATION", "#ef476f", {fs: 40}); s.tC = chip(st, "CONDENSATION", "#3a86ff", {fs: 40}); s.tW = chip(st, "🔄 THE WATER CYCLE", "#06d6a0", {fs: 44});
  s.run = t => { const a = (w, f) => cue("waterCycle", w, f), t0 = SC.waterCycle.t0, tE = a("evaporates", .12), tC = a("condensation", .32), tCl = a("clouds", .5),
      tR = a("rain", .6), tCy = a("continuous", .7);
    tf(s.sun.rays, `rotate(${t * 12})`);
    s.ev.forEach(e => { set(e, "stroke-dashoffset", -t * 60); op(e, ramp(t, tE - .2, tE + .4)); }); s.evH.forEach(h => op(h, ramp(t, tE - .2, tE + .4)));
    op(s.L[0], ramp(t, t0, t0 + .4)); op(s.L[1], ramp(t, tE, tE + .4)); op(s.L[2], ramp(t, tCl - .2, tCl + .2)); op(s.L[3], ramp(t, tR - .2, tR + .2));
    tf(s.cloud, `translate(620 210)`);
    s.rain.forEach((d, i) => { const ph = (t * 1.2 + i * .23) % 1; tf(d, `translate(${480 + (i % 8) * 40} ${270 + ph * 420})`); op(d, ramp(t, tR - .1, tR + .3) * (1 - ph)); });
    set(s.back, "stroke-dashoffset", -t * 50); op(s.back, ramp(t, tCy, tCy + .6)); op(s.backH, ramp(t, tCy, tCy + .6));   // dashes travel from the reservoir to the sea
    const kM = on(t, tC - .3, tCl + 2.2, .4); tf(s.mag, `translate(1010 260) scale(${.2 + .8 * kM})`); op(s.mag, kM);
    popAt(s.look, 1010, 40, t, tC - .3); op(s.look, on(t, tC - .3, tCl + 2.2, .3));
    popAt(s.tE, 200, 560, t, tE + 2.6); popAt(s.tC, 620, 340, t, tC + 2.6); /* after the key-word box has flown to the shelf */ popAt(s.tW, 1010, 760, t, tCy + .4); op(s.tW, on(t, tCy + .4, 1e9, .3)); };
  return s; })();

/* ======================================================================================================================
   2:40 HERE IN SINGAPORE: THE HAZE. A void deck under a soft grey-brown haze (gentle: no smoke clouds or fire, rule 3); the 24-hour PSI
   gauge climbs to 192 ("Unhealthy", NEA bands); an inset brings back EP1's smoke particle; Basil watches from indoors. */
S.haze = (() => { const s = scene("haze", "#d8cbb4", "#b8a98e"), st = nWhole(s);
  el("rect", {x: -150, y: -60, width: 1920, height: 1080, fill: "#cdbfa4"}, st);
  // the HDB block above the void deck
  el("rect", {x: -150, y: -60, width: 1920, height: 330, fill: "#eadfc8", stroke: "#9c8c70", "stroke-width": 4}, st);
  for (let c = 0; c < 14; c++) for (let r = 0; r < 2; r++) el("rect", {x: -120 + c * 135, y: 20 + r * 110, width: 90, height: 64, fill: "#9db4c0", stroke: "#7d8c96", "stroke-width": 3}, st);
  el("rect", {x: -150, y: 270, width: 1920, height: 30, fill: "#b8aa8f"}, st);
  el("rect", {x: -150, y: 700, width: 1920, height: 320, fill: "#a89a80"}, st);
  [60, 520, 980, 1440].forEach(x => el("rect", nA({x, y: 300, width: 80, height: 400, fill: "#e5d9c0", "stroke-width": 4}), st));     // pillars
  // a stone table and stools, letterboxes
  el("ellipse", nA({cx: 760, cy: 640, rx: 150, ry: 38, fill: "#8d99ae", "stroke-width": 5}), st); el("rect", nA({x: 735, y: 640, width: 50, height: 110, fill: "#6c757d", "stroke-width": 4}), st);
  [[560, 760], [960, 760]].forEach(([x, y]) => { el("ellipse", nA({cx: x, cy: y, rx: 50, ry: 16, fill: "#8d99ae", "stroke-width": 4}), st); el("rect", nA({x: x - 18, y, width: 36, height: 60, fill: "#6c757d", "stroke-width": 3}), st); });
  const lb = el("g", {transform: "translate(1150 380)"}, st); for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) el("rect", {x: c * 44, y: r * 40, width: 40, height: 36, fill: "#c9ada7", stroke: "#6d597a", "stroke-width": 2}, lb);
  s.haze = el("rect", {x: -150, y: -60, width: 1920, height: 1080, fill: "#9c8f7a", opacity: 0}, st);
  // the PSI gauge (24-hour PSI; NEA bands: 0-50 good, 51-100 moderate, 101-200 unhealthy, 201-300 very unhealthy, above 300 hazardous)
  s.ga = el("g", {transform: "translate(1180 860)"}, st); const R = 230, B = [[0, 50, "#06d6a0"], [50, 100, "#3a86ff"], [100, 200, "#ffbe0b"], [200, 300, "#f77f00"], [300, 400, "#9d0208"]];
  el("path", nA({d: `M${-R - 40} 20 A${R + 40} ${R + 40} 0 0 1 ${R + 40} 20 Z`, fill: "#fffaf0", "stroke-width": 7}), s.ga);
  const ang = v => Math.PI * (1 - v / 400);
  B.forEach(([a0, a1, c]) => { const p0 = [Math.cos(ang(a0)) * R, -Math.sin(ang(a0)) * R], p1 = [Math.cos(ang(a1)) * R, -Math.sin(ang(a1)) * R];
    el("path", {d: `M${p0[0]} ${p0[1]} A${R} ${R} 0 0 1 ${p1[0]} ${p1[1]}`, fill: "none", stroke: c, "stroke-width": 44}, s.ga); });
  s.needle = el("path", nA({d: "M0 -12 L196 0 L0 12 Z", fill: INK, "stroke-width": 3}), s.ga); el("circle", nA({r: 22, fill: INK}), s.ga);
  s.vb = el("g", {}, st); el("rect", nA({x: -120, y: -80, width: 240, height: 160, rx: 26, fill: "#fffaf0", "stroke-width": 7}), s.vb); nT(s.vb, 0, -30, "24-hour PSI", 30, INK); s.val = nT(s.vb, 0, 50, "0", 76, INK);
  s.band = chip(st, "UNHEALTHY", "#f77f00", {fs: 40}); s.date = chip(st, "9 Oct 2026", INK, {fs: 34});
  // EP1 inset: the smoke particle
  s.ins = el("g", {}, st); el("circle", nA({r: 120, fill: "#f6efe2", "stroke-width": 8}), s.ins); tf(nMote(s.ins, 60), "translate(0 -6)");
  nT(s.ins, 0, 158, "Episode 1", 32); nT(s.ins, 0, 196, "the smoke particle", 26);
  // Basil indoors, at a window
  s.win = el("g", {transform: "translate(70 560)"}, st); el("rect", nA({x: -150, y: -260, width: 300, height: 300, rx: 10, fill: "#ffe8a3", "stroke-width": 8}), s.win);
  s.basil = nBud(s.win, "basil", false); el("path", {d: "M0 -260 V40 M-150 -110 H150", stroke: INK, "stroke-width": 8}, s.win);
  el("rect", {x: -150, y: -260, width: 300, height: 300, fill: "#bde0fe", opacity: .18}, s.win);
  s.run = t => { const a = (w, f) => cue("haze", w, f), t0 = SC.haze.t0, tL = a("less", .05), tP = a("reading", .45), tN = a("ninety-two", .55), tU = a("unhealthy", .65), tE = a("episode", .8);
    op(s.haze, .55 * ramp(t, tL, tL + 2.5));
    const v = 192 * ramp(t, tP - .2, tN + .3); tf(s.needle, `rotate(${-180 * (1 - v / 400)})`); s.val.textContent = String(Math.round(v));
    popAt(s.ga, 880, 850, t, tP - 1); popAt(s.vb, 1220, 790, t, tP - .8); popAt(s.date, 1220, 600, t, tP - .6); popAt(s.band, 880, 560, t, tU - .1);
    popAt(s.ins, 420, 300, t, tE - .2); op(s.ins, on(t, tE - .2, SC.haze.t1 + 1, .3));
    nShow(s.basil, 0, 30, 220, "sit", t); op(s.win, ramp(t, nSeg("basil2") ? nSeg("basil2").t0 - 1.5 : 1e9, nSeg("basil2") ? nSeg("basil2").t0 - 1 : 1e9) || 0); };
  return s; })();

/* ======================================================================================================================
   3:00 INDIA: the real map (Natural Earth); the two driest regions shaded at their real places (IMD's South Peninsula and the
   North-East, soft-edged: we have no state borders, so no hard lines are drawn); two rain bars to scale: 868.6 mm normal, 759.4 mm. */
S.india = (() => { const s = scene("india", "#0b3d66", "#1d6fa5"), st = nWhole(s), I = GEO13.IND;
  el("rect", {x: -150, y: -60, width: 1920, height: 1080, fill: "#48cae4"}, st);
  el("path", {d: I.others, fill: "#d8e2dc", stroke: INK, "stroke-width": 2, opacity: .9}, st);
  el("path", {d: I.india, fill: "#95d5b2", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, st);
  const ic = nClip(st, ["path", {d: I.india}]);
  s.dS = el("ellipse", {cx: I.south[0], cy: I.south[1], rx: I.southR[1] * 1.3, ry: I.southR[0] * 1.1, fill: "#d4a373", opacity: 0, filter: "url(#blur)"}, ic);
  s.dN = el("ellipse", {cx: I.ne[0], cy: I.ne[1], rx: I.neR[0] * 1.1, ry: I.neR[1] * .9, fill: "#d4a373", opacity: 0, filter: "url(#blur)"}, ic);
  nT(st, I.delhi[0], I.delhi[1] - 24, "India", 54, "#fff");
  s.lS = nT(st, I.south[0] - 10, I.south[1] + 10, "the south", 34, "#fff"); s.lN = nT(st, I.ne[0] + 10, I.ne[1] - 70, "the north-east", 34, "#fff");
  // rain bars, to scale (1 px = 0.5 mm)
  s.bars = el("g", {transform: "translate(1140 860)"}, st); const kk = .4;
  el("rect", {x: -30, y: -868.6 * kk - 90, width: 360, height: 868.6 * kk + 150, rx: 24, fill: "#fffaf0", stroke: INK, "stroke-width": 6}, s.bars);
  el("rect", nA({x: 20, y: -868.6 * kk, width: 110, height: 868.6 * kk, fill: "#3a86ff", "stroke-width": 4}), s.bars);
  s.b2 = el("rect", nA({x: 180, y: -759.4 * kk, width: 110, height: 759.4 * kk, fill: "#f77f00", "stroke-width": 4}), s.bars);
  nT(s.bars, 75, 40, "normal", 28, INK); nT(s.bars, 75, -868.6 * kk - 10, "868.6 mm", 24, INK); s.b2l = nT(s.bars, 235, -759.4 * kk - 10, "759.4 mm", 24, INK); nT(s.bars, 235, 40, "2026", 28, INK); nT(s.bars, 150, -868.6 * kk - 40, "monsoon rain, June to September", 22, INK);
  s.card = chip(st, "☀️ 12.6% LESS RAIN", "#f77f00", {fs: 46});
  s.run = t => { const a = (w, f) => cue("india", w, f), t0 = SC.india.t0, tI = a("india", .25), tE = a("one-eighth", .45), tS = a("south", .8), tNE = a("northeast", .88);
    popAt(s.bars, 1140, 860, t, tI); const k = ramp(t, tE - .2, tE + .8); set(s.b2, "y", -759.4 * .4 * k); set(s.b2, "height", 759.4 * .4 * k); op(s.b2l, ramp(t, tE + .6, tE + 1));
    popAt(s.card, 810, 70, t, tE + .3); op(s.dS, .9 * ramp(t, tS - .2, tS + .6)); op(s.lS, ramp(t, tS, tS + .3)); op(s.dN, .9 * ramp(t, tNE - .2, tNE + .6)); op(s.lN, ramp(t, tNE, tNE + .3)); };
  return s; })();

/* ======================================================================================================================
   3:12 THE USA: the real lower 48; wetter than usual across the south (California, Florida: rain clouds at their real places), a warmer
   winter in the north (Montana, Minnesota, Maine: suns). NOAA's winter outlook, December to February. Pip asks his question. */
S.usa = (() => { const s = scene("usa", "#0b3d66", "#1d6fa5"), st = nWhole(s), U = GEO13.USA;
  el("rect", {x: -150, y: -60, width: 1920, height: 1080, fill: "#48cae4"}, st);
  el("path", {d: U.others, fill: "#d8e2dc", stroke: INK, "stroke-width": 2, opacity: .9}, st);
  el("path", {d: U.usa, fill: "#95d5b2", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, st);
  nT(st, 600, 470, "USA", 60, "#fff");
  s.wet = [U.california, U.texas, U.florida].map(p => { const g = nRainCloud(st, .5); g.p = p; return g; });
  s.warm = [U.montana, U.minnesota, U.maine].map(p => { const g = nSun(st, 30); g.p = p; return g; });
  s.lC = nT(st, U.california[0] + 10, U.california[1] + 80, "California", 32); s.lF = nT(st, U.florida[0] - 40, U.florida[1] + 90, "Florida", 32);
  s.leg = el("g", {transform: "translate(-110 650)"}, st); el("rect", {x: -20, y: -60, width: 430, height: 190, rx: 22, fill: "#fffaf0", stroke: INK, "stroke-width": 5}, s.leg);
  tf(nCloud(s.leg, .3, "#dfe7ef", "#9fb3c8"), "translate(40 -10)"); nT(s.leg, 90, 0, "wetter than usual", 30, INK, {"text-anchor": "start"});
  tf(nSun(s.leg, 16), "translate(40 55)"); nT(s.leg, 90, 66, "warmer than usual", 30, INK, {"text-anchor": "start"});
  s.src = nT(s.leg, 0, 112, "NOAA winter outlook, Dec 2026 to Feb 2027", 18, INK, {"text-anchor": "start"});
  s.pip = nBud(st, "pip");
  s.run = t => { const a = (w, f) => cue("usa", w, f), tW = a("wetter", .3), tC = a("california", .45), tF = a("florida", .55), tN = a("north", .75);
    s.wet.forEach((g, i) => { tf(g, `translate(${g.p[0]} ${g.p[1] - 20}) scale(${Math.max(0, pop(t, [tC, tW + .6, tF][i]))})`); runRain(g, t + i, .5, 1); });
    s.warm.forEach((g, i) => { tf(g, `translate(${g.p[0]} ${g.p[1]}) scale(${Math.max(0, pop(t, tN + i * .25))})`); tf(g.rays, `rotate(${t * 15})`); });
    op(s.lC, ramp(t, tC, tC + .3)); op(s.lF, ramp(t, tF, tF + .3)); op(s.leg, ramp(t, tW, tW + .4));
    nShow(s.pip, 1240, 960, 200, "sit", t, {flip: true}); };
  return s; })();

/* ======================================================================================================================
   1:30 THE HEADLINE: two source cards (NOAA, USA, 12 Nov 2026; MSS, Singapore, 29 May 2026). Our own drawing, no logos (rule 6). */
S.news = (() => { const s = scene("news", "#14213d", "#3a0ca3"), st = nWhole(s);
  const card = (x, flag, who, date, line) => { const g = el("g", {}, st); el("rect", {x: -330, y: -190, width: 660, height: 380, rx: 30, fill: "#fffaf0", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, g);
    el("rect", {x: -330, y: -190, width: 660, height: 90, rx: 30, fill: INK}, g); el("rect", {x: -330, y: -130, width: 660, height: 30, fill: INK}, g);
    tx(g, {x: 0, y: -128, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#ffe14d"}, `${flag} ${who}`);
    tx(g, {x: 0, y: -40, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#6c757d"}, date);
    line.forEach((l, i) => tx(g, {x: 0, y: 40 + i * 56, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, l)); return g; };
  s.c1 = card(0, "🇺🇸", "NOAA (USA)", "12 November 2026", ["El Niño:", "strong to very strong"]);
  s.c2 = card(0, "🇸🇬", "MSS (Singapore)", "29 May 2026", ["Warmer, drier weather", "June to October"]);
  s.run = t => { const a = (w, f) => cue("news", w, f), tN = a("noaa", .1), tM = a("may", .6);
    popAt(s.c1, 420, 470, t, tN - .4, 1); popAt(s.c2, 1200, 470, t, tM - .2, 1); };
  return s; })();

/* ======================================================================================================================
   0:53 BE THE THING, rising: you carry the water vapour up. The sea falls away below; the water vapour (invisible: drawn only as faint
   dotted trails, never as white puffs) rises beside you; high up it cools, and tiny water droplets appear all round you and gather into a
   cloud. Cards EVAPORATES, CONDENSES (one line each). The buddies ride along in back view. */
S.povCloud = (() => { const s = scene("povCloud", "#1d4ed8", "#90e0ef"), st = nWhole(s);
  s.sky = el("rect", {x: -400, y: -800, width: 2400, height: 2600, fill: nGrad([[0, "#1e3a8a"], [.5, "#3a86ff"], [1, "#bde0fe"]])}, st);
  s.sea = el("g", {}, st); el("rect", {x: -400, y: 0, width: 2400, height: 1400, fill: nGrad([[0, "#ffa94d"], [.4, "#f76707"], [1, "#d9480f"]])}, s.sea);  // the warm sea, far below
  seed = 71; for (let i = 0; i < 40; i++) el("path", {d: `M${-150 + rnd() * 1920} ${20 + rnd() * 900} q20 -8 40 0`, fill: "none", stroke: "#fff3bf", "stroke-width": 4, opacity: .7}, s.sea);
  s.trails = []; seed = 73; for (let i = 0; i < 9; i++) s.trails.push({e: el("path", {fill: "none", stroke: "#ffffff", "stroke-width": 7, "stroke-dasharray": "3 20", "stroke-linecap": "round"}, st), x: -60 + i * 215 + rnd() * 60, w: rnd()});
  s.drops = []; seed = 79; for (let i = 0; i < 90; i++) s.drops.push({e: el("circle", {r: 4 + rnd() * 9, fill: "#e0f2fe", stroke: "#60a5fa", "stroke-width": 2}, st), x: -150 + rnd() * 1920, y: -60 + rnd() * 1000, u: rnd()});
  s.fog = el("rect", {x: -400, y: -800, width: 2400, height: 2600, fill: "#ffffff", opacity: 0}, st);
  nVig(st, "#d8f3ff", .6);
  s.pip = nBud(st, "pip", false); s.momo = nBud(st, "momo", false); s.basil = nBud(st, "basil", false);
  s.cE = povCard(st, "EVAPORATES ↑", "#ef476f"); s.cC = povCard(st, "CONDENSES 💧", "#3a86ff");
  s.tag = nYouTag(st, "You: a gust of the trade wind");
  s.run = t => { const a = (w, f) => cue("povCloud", w, f), t0 = SC.povCloud.t0, t1 = SC.povCloud.t1, tE = a("evaporates", .25), tC = a("condenses", .7), tCl = a("clouds", .9);
    const up = ramp(t, t0, tC + 1.5);                                                  // how high we have risen
    tf(s.sea, `translate(0 ${lerp(520, 1250, up)})`);
    s.trails.forEach((o, i) => { const x = o.x + Math.sin(t * .6 + i) * 18; set(o.e, "d", `M${x} 1100 C${x + 40} 700 ${x - 40} 400 ${x + 10} ${80 + o.w * 120}`);
      set(o.e, "stroke-dashoffset", -t * 90); op(o.e, .55 * ramp(t, tE - .3, tE + .6) * (1 - ramp(t, tC + .5, tC + 2))); });
    const kd = ramp(t, tC - .2, tCl + .4);
    s.drops.forEach(o => { const on1 = clamp((kd - o.u * .8) / .2); tf(o.e, `translate(${o.x + Math.sin(t + o.u * 9) * 6} ${o.y + (1 - on1) * 40})`); op(o.e, on1 * .9); });
    op(s.fog, .55 * ramp(t, tCl - .3, tCl + 1.2));
    const X = SHORT ? [360, 600, 830] : [230, 470, 700];
    nShow(s.pip, X[0], 915, 200, "back", t, {bob: 5}); nShow(s.momo, X[1], 915, 195, "back", t, {bob: 5}); nShow(s.basil, X[2], 915, 195, "back", t, {bob: 5});
    popAt(s.tag, 810, 60, t, t0 - .2); popAt(s.cE, 810, 170, t, tE); op(s.cE, on(t, tE, tC - .3, .3)); popAt(s.cC, 810, 170, t, tC); op(s.cC, on(t, tC, t1 + .5, .3)); };
  return s; })();

/* ======================================================================================================================
   1:07 / 1:26 LOOKING DOWN AT SINGAPORE (real coast, Natural Earth 1:10m; MacRitchie Reservoir at its real place).
   povRain: a normal year, the clouds rain on the island (card A NORMAL YEAR). povDry: this year, blue sky and hardly any clouds, the
   island dries to straw colours; then the buddies grow back to normal size and turn round. */
function nPovSG(name, dry) { const s = scene(name, "#48cae4", "#0096c7"), st = nWhole(s), G = GEO13.SG;
  el("rect", {x: -400, y: -800, width: 2400, height: 2600, fill: "#48cae4"}, st);
  s.land = el("path", {d: G.land, fill: "#74c69d", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, st);
  el("ellipse", {cx: G.macritchie[0], cy: G.macritchie[1], rx: 22, ry: 14, fill: "#219ebc", stroke: INK, "stroke-width": 3}, st);
  nT(st, G.sg[0] + 10, G.sg[1] + 120, "Singapore", 54); nT(st, G.macritchie[0] + 30, G.macritchie[1] - 26, "MacRitchie Reservoir", 26, "#fff", {"text-anchor": "start"});
  s.cl = [[480, 300, 1.4], [820, 240, 1.7], [1150, 330, 1.3], [640, 620, 1.2], [1000, 660, 1.5]].map(([x, y, k]) => { const g = nRainCloud(st, k); g.x = x; g.y = y; g.k = k; return g; });
  s.sun = nSun(st, 80); nVig(st, dry ? "#fff3bf" : "#d8f3ff", .6);
  s.pip = nBud(st, "pip", false); s.momo = nBud(st, "momo", false); s.basil = nBud(st, "basil", false);
  s.card = chip(st, dry ? "THIS YEAR" : "A NORMAL YEAR", dry ? "#e63946" : "#3a86ff", {fs: 44});
  s.tag = nYouTag(st, "You: a gust of the trade wind");
  s.run = t => { const t0 = SC[name].t0, t1 = SC[name].t1, a = (w, f) => cue(name, w, f);
    if (!dry) { s.cl.forEach((g, i) => { tf(g, `translate(${g.x + (t - t0) * -8} ${g.y})`); runRain(g, t + i * .3, g.k, ramp(t, a("rain", .3) - .4, a("rain", .3))); }); op(s.sun, 0); }
    else { const tb = a("blue", .2), th = a("hardly", .4), tn = a("nino", .8);
      s.cl.forEach((g, i) => { tf(g, `translate(${g.x + 900 + (t - t0) * 40} ${g.y}) scale(${i === 1 ? .6 : 1})`); op(g, i === 1 ? .9 : 1 - ramp(t, t0, t0 + .8)); runRain(g, t, g.k, 0); });
      set(s.land, "fill", mix("#74c69d", "#d9c27a", ramp(t, tb, tb + 2.5))); tf(s.sun, `translate(${SHORT ? 1100 : 1300} 150) scale(${Math.max(0, pop(t, tb - .2))})`); tf(s.sun.rays, `rotate(${t * 15})`); }
    const grow = dry ? ramp(t, a("nino", .8) - 1.2, a("nino", .8) + .4) : 0, X = SHORT ? [360, 600, 830] : [230, 470, 700];
    nShow(s.pip, X[0], 915, lerp(200, 300, grow), grow > .5 ? "sit" : "back", t, {bob: 5 * (1 - grow)}); nShow(s.momo, X[1], 915, lerp(195, 290, grow), grow > .5 ? "sit" : "back", t, {bob: 5 * (1 - grow)});
    nShow(s.basil, X[2], 915, lerp(195, 290, grow), grow > .5 ? "sit" : "back", t, {bob: 5 * (1 - grow)});
    popAt(s.tag, 810, 60, t, t0 - .2); op(s.tag, 1 - grow); popAt(s.card, 810, 160, t, t0 + .2); };
  return s; }
S.povRain = nPovSG("povRain", false);
S.povDry = nPovSG("povDry", true);

/* ======================================================================================================================
   3:25 TRY THIS: back home on the HDB ledge. Two cups with the same amount of water, a marker line on each; one in the sun, one in the
   shade of the ledge above. Day 1 -> Day 3: the cup in the sun has lost more water (it gained more heat). Momo watches (her water bowl). */
S.try = (() => { const s = scene("try", "#fff3c4", "#ffd166"), st = nWhole(s);
  el("rect", {x: -400, y: -800, width: 2400, height: 1400, fill: nGrad([[0, "#9ad1ff"], [1, "#fffbe8"]])}, st);
  const blk = el("g", {}, st); for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) el("rect", {x: -120 + c * 190, y: 40 + r * 120, width: 120, height: 70, fill: (r + c) % 3 ? "#cfe0ec" : "#f4d6b0", opacity: .7}, blk);
  el("rect", nA({x: -400, y: 560, width: 2400, height: 90, fill: "#e9dcc0", "stroke-width": 5}), st);                 // the ledge
  el("rect", {x: -400, y: 650, width: 2400, height: 1200, fill: "#d8c7a3"}, st);
  s.shade = el("path", {d: "M760 560 L1500 560 L1500 650 L760 650 Z", fill: "#1b1b3a", opacity: .25}, st);              // shade from the ledge above
  el("rect", nA({x: 700, y: -60, width: 900, height: 120, fill: "#b8aa8f", "stroke-width": 5}), st);                    // the ledge above (makes the shade)
  s.sun = nSun(st, 70);
  const cup = (x) => { const g = el("g", {transform: `translate(${x} 560)`}, st);
    const cp = nClip(g, ["path", {d: "M-80 -260 L80 -260 L64 0 L-64 0 Z"}]); g.w = el("rect", {x: -90, y: -170, width: 180, height: 170, fill: "#4cc9f0", opacity: .8}, cp);
    el("path", {d: "M-80 -260 L80 -260 L64 0 L-64 0 Z", fill: "#e0fbfc", "fill-opacity": .25, stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g);
    el("path", {d: "M-90 -170 H90", stroke: "#e63946", "stroke-width": 6, "stroke-dasharray": "14 8"}, g); return g; };
  s.c1 = cup(330); s.c2 = cup(1080);
  nT(st, 330, 720, "in the sun", 40, INK); nT(st, 1080, 720, "in the shade", 40, INK);
  s.day = chip(st, "Day 1", INK, {fs: 40}); s.day3 = chip(st, "Day 3", "#e63946", {fs: 40});
  s.q = nT(st, 700, 380, "?", 160, "#e63946"); s.heat = el("g", {}, st); nArrow(s.heat, 180, "#ffbe0b", 22);
  s.card = chip(st, "🔍 TRY THIS", "#7209b7", {fs: 46});
  s.momo = nBud(st, "momo");
  s.run = t => { const a = (w, f) => cue("try", w, f), t0 = SC.try.t0, tM = a("mark", .4), tC = a("check", .55), tW = a("which", .7), tH = a("hint", .85);
    tf(s.sun, `translate(200 120)`); tf(s.sun.rays, `rotate(${t * 12})`);
    const k = ramp(t, tC + .3, tC + 2.2); set(s.c1.w, "y", lerp(-170, -105, k)); set(s.c2.w, "y", lerp(-170, -150, k));
    popAt(s.day, 700, 120, t, tM); op(s.day, on(t, tM, tC + .3, .2)); popAt(s.day3, 700, 120, t, tC + .3);
    op(s.q, on(t, tW, tH, .3)); tf(s.heat, `translate(240 230) rotate(60) scale(${Math.max(0, pop(t, tH + 1))})`); op(s.heat, ramp(t, tH + 1, tH + 1.3));
    popAt(s.card, 700, -10, t, t0 + .1); nShow(s.momo, 1370, 1000, 230, "sit", t, {flip: true}); };
  return s; })();

/* ======================================================================================================================
   3:51 GOODBYE: back in the HDB corridor's afternoon light; Momo says her line (talking), then the three buddies wave. Also the Shorts'
   "Watch the full episode" beat. */
S.bye = (() => { const s = scene("bye", "#ffd6a5", "#fdffb6"), st = nWhole(s);
  el("rect", {x: -400, y: -800, width: 2400, height: 2600, fill: nGrad([[0, "#ffd6a5"], [.6, "#fdffb6"], [1, "#e9dcc0"]])}, st);
  s.sk = skyline(st, 0, 0, "#f4a261"); tf(s.sk, "translate(110 520) scale(1) "); op(s.sk, .35);
  el("rect", {x: -400, y: 760, width: 2400, height: 1000, fill: "#c9b99a"}, st);
  s.card = chip(st, "Tell a friend in 🇮🇳 India or 🇺🇸 the USA!", "#06d6a0", {fs: 40});
  s.pip = nBud(st, "pip"); s.momo = nBud(st, "momo"); s.basil = nBud(st, "basil");
  s.run = t => { const t0 = SC.bye.t0, m3 = nSeg("momo3"), talkM = nTalk("momo", t) >= 0;
    nShow(s.pip, 250, 860, 280, "waving", t); nShow(s.momo, 600, 860, 290, talkM ? "sit" : "waving", t); nShow(s.basil, 960, 860, 290, "waving", t, {flip: true});
    popAt(s.card, 600, 120, t, m3 ? m3.t0 + .6 : 1e9); };
  return s; })();
