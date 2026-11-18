/* TheOneApp, Explored EP02 Part 2 ("Can Singapore keep the lights on?"): the opening map shot and the first-person hero sequence.
   Load after common.js and ep02/scenes.js. Everything lives inside one function so no name can clash with another scene file.
   Scenes: hook2 (outside shot, real map) · povSpace · povPanel · povSea · povNeutron (first person: the camera is the energy).
   Every frame depends only on t. Times inside a scene are "u" = seconds after the scene's t0 (u can be about -0.5: the engine
   fades a scene in 0.4 s before its t0 and out about 0.25 s before its t1). */
(() => {
const CX = VP[0], CY = VP[1];
const T0 = n => (SC[n] ? SC[n].t0 : 0), DUR = n => (SC[n] ? SC[n].t1 - SC[n].t0 : 1);
const defs = () => $("v").querySelector("defs");
let uid = 0;
// helper: a gradient in <defs>; stops are [offset, colour, opacity]
function grad(kind, attrs, stops) { const id = "pvb" + (++uid); const g = el(kind, Object.assign({id}, attrs), defs());
  stops.forEach(([o, c, a]) => el("stop", {offset: o, "stop-color": c, "stop-opacity": a === undefined ? 1 : a}, g)); return `url(#${id})`; }
// helper: a bigger one-line card (42 px: readable on a phone) and its show/hide
function card(p, text, col = INK, fs = 42) { return chip(p, text, col, {fs}); }
function showC(c, t, a, b, y = 900, x = CX) { tf(c, `translate(${x} ${y}) scale(${Math.max(0, pop(t, a))})`); op(c, on(t, a, b, .25)); }
// helper: a point on a quadratic curve, and the first part (0..k) of that curve as a path
const qPt = ([a, b, c], k) => [(1 - k) * (1 - k) * a[0] + 2 * (1 - k) * k * b[0] + k * k * c[0], (1 - k) * (1 - k) * a[1] + 2 * (1 - k) * k * b[1] + k * k * c[1]];
const qPart = ([a, b, c], k) => { const q = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)], r = qPt([a, b, c], k); return `M${a[0]} ${a[1]} Q${q[0]} ${q[1]} ${r[0]} ${r[1]}`; };
const expo = (a, b, k) => a * Math.pow(b / a, clamp(k));          // a steady zoom from a to b
// helper: a soft coloured edge that says "this is you", kept to the rim so the picture stays clean
function edge(p, col, a = .5, inner = .74) { return fullRect(p, grad("radialGradient", {cx: .5, cy: .5, r: .75}, [[inner, col, 0], [1, col, a]])); }
// helper: a flat floor seen from just above it. A point at depth d (1 = one unit ahead) and sideways x lands on screen at floorPt.
// floorStrip is a band on the floor from depth d0 to d1, centred on x = xc with half-width w (the cable, a line between cells...).
function floorKit(HY, G) { const pt = (x, d) => [CX + x * G / d, HY + G / d];
  const strip = (xc, w, d0, d1) => { const a = pt(xc - w, d0), b = pt(xc + w, d0), c = pt(xc + w, d1), e = pt(xc - w, d1); return `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]} L${e[0]} ${e[1]} Z`; };
  return {pt, strip}; }

/* =====================================================================================================================
   HOOK2 (outside shot): the real map, full screen. Picture-only first: three gas pipelines light up one by one, each from
   its named gas field into Singapore, and an LNG ship sails in. Then Heart speaks and three cards pop on her words.
   Rule 10: every line starts and ends somewhere named. */
S.hook2 = (() => { const s = scene("hook2", "#0077b6", "#023e8a");
  fullRect(s.stage, "#48cae4");
  s.camA = el("g", {}, s.stage);
  for (let i = 0; i < 26; i++) el("path", {d: `M${150 + (i % 7) * 150 + (i % 3) * 40} ${150 + Math.floor(i / 7) * 150 + (i % 2) * 50} q9 -6 18 0 t18 0`, fill: "none", stroke: "#fff", "stroke-width": 2, opacity: .35}, s.camA);
  el("path", {d: GEO.land, fill: "#95d5b2", stroke: INK, "stroke-width": 2.2, "stroke-linejoin": "round"}, s.camA);
  el("path", {d: GEO.border, fill: "none", stroke: INK, "stroke-width": 1.5, "stroke-dasharray": "5 4", opacity: .5}, s.camA);
  s.geo = GEO.labels.map(([n, [x, y]]) => tx(s.camA, {x: n === "Malaysia" ? 528 : x, y: n === "Malaysia" ? 252 : y, "text-anchor": "middle", "font-size": 24, "font-weight": 700, fill: INK, opacity: .75}, n));
  s.night = fullRect(s.stage, "#0b1030", 0);
  s.camB = el("g", {}, s.stage);
  // the LNG ship's route (through the Karimata Strait, east of Bintan, into the Singapore Strait)
  s.routeD = "M940 696 Q880 640 822 584 Q760 520 700 478 Q668 452 656 440 Q650 433 641 431";
  s.route = el("path", {d: s.routeD, fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round"}, s.camB);
  s.rl = el("g", {}, s.camB);
  ["LNG by ship,", "from around", "the world"].forEach((ln, i) => tx(s.rl, {x: 948, y: 612 + i * 26, "text-anchor": "start", "font-size": 23, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 5.5}, ln));
  // pipelines
  s.pipes = ["my", "su", "na"].map(k => { const g = el("g", {}, s.camB); g.P = GEO.pipes[k];
    g.glow = el("path", {fill: "none", stroke: "#ffe14d", "stroke-width": 18, "stroke-linecap": "round", opacity: 0, filter: "url(#pvbSoft)"}, g);
    g.a = el("path", {fill: "none", stroke: INK, "stroke-width": 10, "stroke-linecap": "round"}, g);
    g.f = el("path", {fill: "none", stroke: "#ffd166", "stroke-width": 5, "stroke-dasharray": "8 9", "stroke-linecap": "round"}, g);
    g.head = el("circle", {r: 8, fill: "#fff8d6", stroke: "#ffbe0b", "stroke-width": 3}, g); return g; });
  const sf = el("filter", {id: "pvbSoft", x: "-50%", y: "-50%", width: "200%", height: "200%"}, defs()); el("feGaussianBlur", {stdDeviation: 5}, sf);
  // gas fields: the marker and its name (same names as geo_map's gasSources)
  const order = [0, 2, 1];                       // GEO.sources is Malaysia, Natuna, Sumatra; the pipes are my, su, na
  s.src = order.map(i => { const [[x, y], name, side] = GEO.sources[i]; const g = el("g", {}, s.camB), m = el("g", {}, g);
    el("circle", {r: 20, fill: INK, stroke: "#ffd166", "stroke-width": 4}, m); tx(m, {x: 0, y: 5.5, "text-anchor": "middle", "font-size": 15.5, "font-weight": 700, fill: "#ffd166"}, "GAS");
    const lx = side === "end" ? -28 : side === "start" ? 28 : 0, ly = side === "below" ? 46 : 8;
    tx(g, {x: lx, y: ly, "text-anchor": side === "below" ? "middle" : side, "font-size": 23, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 5.5}, name);
    g.m = m; g.x = x; g.y = y; return g; });
  // Singapore
  s.sgGlow = el("circle", {cx: GEO.sg[0], cy: GEO.sg[1], r: 40, fill: "#ffe14d", opacity: 0, filter: "url(#blur)"}, s.camB);
  s.sg = el("g", {transform: `translate(${GEO.sg[0]} ${GEO.sg[1]})`}, s.camB);
  s.sgRays = el("g", {opacity: 0}, s.sg); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; el("line", {x1: Math.cos(a) * 17, y1: Math.sin(a) * 17, x2: Math.cos(a) * 30, y2: Math.sin(a) * 30, stroke: "#ffe14d", "stroke-width": 4, "stroke-linecap": "round"}, s.sgRays); }
  s.sgDot = el("circle", {r: 10, fill: "#e63946", stroke: "#fff", "stroke-width": 3.5}, s.sg);
  tx(s.sg, {x: -17, y: 4, "text-anchor": "end", "font-size": 29, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 6}, "Singapore");
  // the LNG ship (side view, bow to the left: four round tanks on a long hull)
  s.ship = el("g", {}, s.camB); { const g = el("g", {transform: "scale(.8)"}, s.ship);
    el("path", {d: "M-52 -2 H50 L46 14 H-40 Z", fill: "#e63946", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, g);
    [-34, -14, 6, 26].forEach(x => el("path", {d: `M${x - 9} -2 a9 9 0 0 1 18 0 Z`, fill: "#fff", stroke: INK, "stroke-width": 3.5}, g));
    el("rect", {x: 37, y: -18, width: 11, height: 16, fill: "#fff", stroke: INK, "stroke-width": 3.5}, g);
    tx(g, {x: -4, y: 11.5, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#fff"}, "LNG"); }
  // cards (top band: the map keeps the rest of the screen)
  s.c1 = card(s.stage, "no oil · no coal · no gas of our own", "#e63946");
  s.c2 = card(s.stage, "almost all our energy comes from other countries", INK);
  s.q = el("g", {opacity: 0}, s.stage);
  tx(s.q, {x: 0, y: 0, "text-anchor": "middle", "font-size": 104, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 20}, "How do we keep the lights on?");
  s.run = t => { const t0 = T0("hook2"), u = t - t0, a = (w, f) => cue("hook2", w, f), tO = a("oil", .36), tB = a("bring", .57), tL = a("lights", .84);
    // camera: a slow push in while the pipes light up; on "lights" it closes in on Singapore and night falls
    const kL = ramp(t, tL - .5, tL + .9), z = lerp(lerp(1.7, 2.0, ramp(u, -.6, 3.2)), 2.45, kL);
    const cx = lerp(632, GEO.sg[0], kL), cy = lerp(418, GEO.sg[1], kL), ax = CX, ay = lerp(CY - 12, 600, kL);
    const M = `translate(${ax} ${ay}) scale(${z}) translate(${-cx} ${-cy})`; tf(s.camA, M); tf(s.camB, M);
    op(s.night, .62 * kL); op(s.geo[0], .75 * (1 - ramp(t, tO - .35, tO - .05)));     // "Malaysia" makes room for the cards (its gas field keeps the name)
    let arrived = 0;
    s.pipes.forEach((g, i) => { const a0 = .15 + i * .8, k = ramp(u, a0, a0 + .7), d = qPart(g.P, Math.max(.001, k)); set(g.a, "d", d); set(g.f, "d", d); set(g.glow, "d", d);
      op(g, u > a0 - .02 ? 1 : 0); set(g.f, "stroke-dashoffset", -t * 46); const h = qPt(g.P, k); set(g.head, "cx", h[0]); set(g.head, "cy", h[1]); op(g.head, k > 0 && k < 1 ? 1 : 0);
      const bump = on(u, a0 + .6, a0 + 1.3, .3) + .8 * on(t, tB - .1, tB + 1.2, .4) + .7 * kL; op(g.glow, .75 * clamp(bump)); arrived += on(u, a0 + .6, a0 + 1.2, .25);
      const sg = s.src[i]; tf(sg, `translate(${sg.x} ${sg.y})`); op(sg, ramp(u, a0 - .15, a0)); tf(sg.m, `scale(${Math.max(0, pop(u, a0 - .15, .4)) * (1 + .25 * on(t, tB - .05 + i * .12, tB + .5 + i * .12, .2))})`); });
    // the ship: sails in along its route and berths at Singapore
    const ts = 2.4, ks = 1 - Math.pow(1 - clamp((u - ts) / 2.9), 2.2), L = s.route.getTotalLength(), p = s.route.getPointAtLength(L * ks);
    tf(s.ship, `translate(${p.x + 34 * ks * ks} ${p.y + 4}) scale(${Math.max(0, pop(u, ts - .15, .4)) * (1 + .2 * on(t, tB + .3, tB + .9, .2))})`); op(s.ship, ramp(u, ts - .15, ts));
    op(s.route, ramp(u, ts - .2, ts + .2) * (1 - .5 * kL)); op(s.rl, ramp(u, ts - .2, ts + .1) * (1 - kL)); arrived += on(u, ts + 2.7, ts + 3.4, .25);
    // Singapore lights up a little as each supply arrives, and fully on "lights"
    op(s.sgGlow, clamp(.55 * arrived + .95 * kL)); set(s.sgGlow, "r", 34 + 26 * kL); op(s.sgRays, kL); set(s.sgDot, "fill", kL > .5 ? "#ffe14d" : "#e63946"); set(s.sgDot, "stroke", kL > .5 ? INK : "#fff");
    showC(s.c1, t, tO, tB - .1, 80); showC(s.c2, t, tB, tL - .35, 80);
    tf(s.q, `translate(${CX} 160) scale(${Math.max(0, pop(t, tL - .1, .5))})`); op(s.q, ramp(t, tL - .1, tL + .1)); };
  return s; })();

/* =====================================================================================================================
   FIRST-PERSON SHOT 1: povSpace. We are a bit of sunlight. We look back at the Sun we have just left, turn, and race to
   Earth: a blue disc with cloud swirls (no invented continents) that grows ahead. Light keeps one speed, so the
   distance counter climbs steadily: 150 million km in about 8 minutes (500 seconds). */
function earthArt(p) { const g = el("g", {}, p), id = "pvb" + (++uid); const cp = el("clipPath", {id}, defs()); el("circle", {r: 100}, cp);
  el("circle", {r: 112, fill: "#8fdcff", opacity: .28}, g); el("circle", {r: 106, fill: "#bfe9ff", opacity: .5}, g);
  el("circle", {r: 100, fill: grad("radialGradient", {cx: .42, cy: .38, r: .75}, [[0, "#63c8ff"], [.55, "#1f86e0"], [1, "#0b4aa6"]])}, g);
  const c = el("g", {"clip-path": `url(#${id})`, fill: "none", stroke: "#fff", "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
  [["M-96 -52 q26 -16 52 -6 q20 8 40 -4 q16 -10 34 -2", 11], ["M-40 -82 q22 -8 40 2 q14 8 30 0", 8], ["M-88 -10 q18 -12 36 -2 q16 10 34 0", 9],
   ["M8 -28 a16 16 0 1 1 -14 -16 a27 27 0 0 1 37 22 q2 16 -12 26", 10], ["M34 6 q24 -14 44 -4 q10 6 22 2", 9], ["M-70 34 q24 -10 44 2 q18 10 40 0 q12 -6 22 0", 11],
   ["M-36 66 a12 12 0 1 1 -10 -12 a21 21 0 0 1 28 16", 8], ["M20 58 q22 -10 40 0 q12 6 24 0", 8], ["M-20 92 q20 -8 40 0", 7], ["M52 -62 q16 -8 30 2", 7]]
    .forEach(([d, w]) => el("path", {d, "stroke-width": w, opacity: .93}, c));
  el("circle", {r: 100, fill: grad("radialGradient", {cx: .5, cy: .5, r: .5}, [[.72, "#062a66", 0], [1, "#062a66", .5]])}, g);
  el("circle", {r: 100, fill: "none", stroke: INK, "stroke-width": 3}, g); return g; }
S.povSpace = (() => { const s = scene("povSpace", "#05051a", "#05051a"); fullRect(s.stage, "#05051a");
  // stars: dots while we look back, sideways streaks in the turn, streaks from the middle in flight
  seed = 311; s.stars = []; for (let i = 0; i < 110; i++) s.stars.push({a: rnd() * Math.PI * 2, r: .12 + rnd() * .95, z0: rnd(), x: rnd(), y: rnd(), w: 1.5 + rnd() * 2.5,
    e: el("line", {stroke: i % 5 ? "#fff" : "#bde0fe", "stroke-linecap": "round"}, s.stage)});
  // the Sun (seen looking back)
  s.sun = el("g", {}, s.stage);
  el("circle", {r: 150, fill: "#ffb703", opacity: .5, filter: "url(#blur)"}, s.sun);
  s.spikes = el("g", {}, s.sun); for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, L = i % 2 ? 128 : 142, w = .07;
    el("path", {d: `M${Math.cos(a - w) * 98} ${Math.sin(a - w) * 98} L${Math.cos(a) * L} ${Math.sin(a) * L} L${Math.cos(a + w) * 98} ${Math.sin(a + w) * 98} Z`, fill: "#ffbe0b", stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round"}, s.spikes); }
  el("circle", {r: 100, fill: grad("radialGradient", {cx: .5, cy: .5, r: .5}, [[0, "#fffbe0"], [.55, "#ffe14d"], [.86, "#ffb703"], [1, "#fb8500"]]), stroke: INK, "stroke-width": 2.5}, s.sun);
  seed = 77; for (let i = 0; i < 16; i++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 78; el("ellipse", {cx: Math.cos(a) * r, cy: Math.sin(a) * r, rx: 5 + rnd() * 9, ry: 3 + rnd() * 5, fill: "#ff9f1c", opacity: .45}, s.sun); }
  tx(s.sun, {x: 0, y: 12, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "the Sun");
  // Earth ahead
  s.earth = earthArt(s.stage);
  s.el = el("g", {}, s.stage); tx(s.el, {x: 0, y: -40, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, "Earth");
  el("path", {d: "M0 -26 V-12", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round"}, s.el);
  s.glow = fullRect(s.stage, "#fff3b0", 0); s.vg = edge(s.stage, "#ffe14d", .5); s.air = fullRect(s.stage, "#dff3ff", 0);
  s.km = chip(s.stage, "150 million km · 8 min", INK, {fs: 44, w: 620});
  s.c = card(s.stage, "Sunlight: 150 million km to Earth in about 8 minutes", "#f77f00");
  s.run = t => { const u = t - T0("povSpace"), D = DUR("povSpace");
    const tw = 1.05, pan = ease((u - tw) / .42), W = FULL.w + 500;       // pan 0 = looking back at the Sun, 1 = looking ahead at Earth
    const f = clamp((u - tw - .3) / (D - tw - .3 - .3));                    // the flight
    // Sun: shrinks behind us as we leave, then swings out of view in the turn
    const rs = 150 + 1500 * Math.pow(1 - clamp((u + .45) / (tw + .45)), 2.2); tf(s.sun, `translate(${CX + pan * W} ${CY}) scale(${rs / 100})`); op(s.sun, pan < 1 ? 1 : 0);
    op(s.glow, .9 * (1 - ramp(u, -.45, .15)));
    // Earth
    const re = expo(9, 640, f), ex = CX - (1 - pan) * W; tf(s.earth, `translate(${ex} ${CY}) scale(${re / 100})`); op(s.earth, pan > 0 ? 1 : 0);
    tf(s.el, `translate(${ex} ${CY - re})`); op(s.el, ramp(pan, .6, 1) * (1 - ramp(re, 60, 130)));
    // stars
    const dpan = pan > 0 && pan < 1 ? 1 : 0, sp = Math.sin(clamp((u - tw) / .42) * Math.PI);
    s.stars.forEach(o => { if (pan < 1) { const x = FULL.x + (((o.x + pan * 1.7) % 1 + 1) % 1) * FULL.w, y = FULL.y + o.y * FULL.h, L = dpan * sp * 420;
        set(o.e, "x1", x); set(o.e, "y1", y); set(o.e, "x2", x - L - .01); set(o.e, "y2", y); set(o.e, "stroke-width", o.w); op(o.e, .9);
      } else { const z = ((o.z0 - (u - tw) * .5) % 1 + 1) % 1, r1 = o.r * 260 / (.08 + z * 1.6), r2 = r1 * (1 + .1 + .25 * (1 - z));
        set(o.e, "x1", CX + Math.cos(o.a) * r1); set(o.e, "y1", CY + Math.sin(o.a) * r1); set(o.e, "x2", CX + Math.cos(o.a) * r2); set(o.e, "y2", CY + Math.sin(o.a) * r2);
        set(o.e, "stroke-width", o.w * (1 + 1.6 * (1 - z))); op(o.e, clamp((1 - z) / .3) * clamp(z / .06) * .95); } });
    op(s.air, ramp(f, .93, 1) * .55);
    const g = clamp(u / (D - .5)), km = Math.round(150 * g), sec = Math.round(500 * g);
    s.km.querySelector("text").textContent = `${km} million km · ${Math.floor(sec / 60)} min ${String(sec % 60).padStart(2, "0")} s`;
    tf(s.km, `translate(${CX} 10) scale(${Math.max(0, pop(u, .1))})`); op(s.km, on(u, .1, D, .2));
    showC(s.c, u, .25, D - .1); };
  return s; })();

/* =====================================================================================================================
   FIRST-PERSON SHOT 2: povPanel. Still sunlight: we dive from the sky over the real map of Singapore, through the clouds,
   onto the floating solar farm on Tengeh Reservoir (west Singapore, 103.65°E 1.345°N). We hit one panel: a flash, and the
   light energy becomes electrical energy; we race off along the panel's metal strip as electricity.
   PANEL_END picks the last beat: "skim" (low over the panel, along its silver strip) or "wire" (inside a copper wire). */
const PANEL_END = "skim";
S.povPanel = (() => { const s = scene("povPanel", "#48cae4", "#48cae4"); const TG = [605.2, 418.2];   // Tengeh Reservoir on geo_map's map
  // A) the real map from high above
  s.A = el("g", {}, s.stage); fullRect(s.A, "#48cae4"); s.map = el("g", {}, s.A);
  el("path", {d: GEO.land, fill: "#8fd3a8", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round", "vector-effect": "non-scaling-stroke"}, s.map);
  s.sgl = tx(s.A, {x: 0, y: 0, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Singapore");
  // C) the reservoir from just above: water, then the farm (rows of dark blue panels on floats)
  s.C = el("g", {}, s.stage); fullRect(s.C, grad("radialGradient", {cx: .5, cy: .5, r: .7}, [[0, "#2aa7dd"], [1, "#1379b8"]]));
  s.farm = el("g", {}, s.C);
  const wp = el("pattern", {id: "pvbWave", patternUnits: "userSpaceOnUse", width: 700, height: 420}, defs());
  [[60, 80], [380, 40], [240, 230], [560, 300], [90, 350]].forEach(([x, y]) => el("path", {d: `M${x} ${y} q30 -20 60 0 t60 0`, fill: "none", stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round", opacity: .3}, wp));
  s.waves = el("rect", {x: -30000, y: -30000, width: 60000, height: 60000, fill: "url(#pvbWave)"}, s.farm);
  // one tile = one panel on its float (60 x 36); the tile under the camera is centred on (0, 0)
  const pp = el("pattern", {id: "pvbPanel", patternUnits: "userSpaceOnUse", x: -30, y: -18, width: 60, height: 36}, defs());
  el("rect", {width: 60, height: 36, fill: "#aebdc7"}, pp); el("rect", {x: 2.2, y: 2.2, width: 55.6, height: 31.6, rx: 1, fill: "#e9eef2", stroke: "#56667a", "stroke-width": .5}, pp);
  el("rect", {x: 3.4, y: 3.4, width: 53.2, height: 29.2, fill: "#1d3557"}, pp);
  for (let c = 1; c < 12; c++) el("line", {x1: 3.4 + c * 53.2 / 12, y1: 3.4, x2: 3.4 + c * 53.2 / 12, y2: 32.6, stroke: "#3f6291", "stroke-width": .28}, pp);
  for (let r = 1; r < 6; r++) el("line", {x1: 3.4, y1: 3.4 + r * 29.2 / 6, x2: 56.6, y2: 3.4 + r * 29.2 / 6, stroke: "#3f6291", "stroke-width": .28}, pp);
  for (let r = 0; r < 6; r++) [.33, .67].forEach(k => el("line", {x1: 3.4, y1: 3.4 + (r + k) * 29.2 / 6, x2: 56.6, y2: 3.4 + (r + k) * 29.2 / 6, stroke: "#c9d6e2", "stroke-width": .12}, pp));
  el("path", {d: "M3.4 3.4 H30 L14 32.6 H3.4 Z", fill: "#fff", opacity: .07}, pp);
  s.solid = el("g", {}, s.farm);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 5; i++) { const x = -1230 + (i - 2) * 2760, y = -558 + j * 1296;
    el("rect", {x: x - 40, y: y - 40, width: 2480, height: 1160, rx: 30, fill: "#aebdc7", stroke: INK, "stroke-width": 14}, s.farm);
    el("rect", {x, y, width: 2400, height: 1080, fill: "url(#pvbPanel)"}, s.farm);
    const g = el("g", {}, s.solid); el("rect", {x, y, width: 2400, height: 1080, fill: "#1d3557"}, g);
    for (let r = 1; r < 10; r++) el("line", {x1: x, y1: y + r * 108, x2: x + 2400, y2: y + r * 108, stroke: "#aebdc7", "stroke-width": 16}, g); }
  s.spot = el("circle", {cx: CX, cy: CY, r: 100, fill: grad("radialGradient", {cx: .5, cy: .5, r: .5}, [[0, "#ffffff", 1], [.35, "#fff6a8", .9], [1, "#ffe14d", 0]]), opacity: 0}, s.C);
  // clouds we fall through
  s.clouds = field(s.stage, 22, 421, (e, i) => { [[0, 0, 150, 80], [-120, 30, 110, 60], [120, 34, 120, 62], [-40, -44, 100, 60], [60, -36, 90, 54]].forEach(([x, y, rx, ry]) => el("ellipse", {cx: x, cy: y, rx, ry, fill: "#fff"}, e)); }, .3);
  s.white = fullRect(s.stage, "#fff", 0);
  s.D = el("g", {}, s.stage);
  if (PANEL_END === "wire") {         // inside the wire
    fullRect(s.D, grad("radialGradient", {cx: .5, cy: .5, r: .6}, [[0, "#7a3b10"], [1, "#2a1206"]]));
    s.tun = tunnelG(s.D, 12, (e, i) => { el("circle", {r: 300, fill: "none", stroke: INK, "stroke-width": 44}, e); el("circle", {r: 300, fill: "none", stroke: i % 2 ? "#e07a2f" : "#f4a261", "stroke-width": 30}, e);
      el("circle", {r: 288, fill: "none", stroke: "#ffd9a0", "stroke-width": 5, opacity: .7}, e); });
    s.zaps = []; seed = 97; for (let i = 0; i < 26; i++) s.zaps.push({a: rnd() * 6.28, z0: rnd(), e: el("line", {stroke: "#ffe14d", "stroke-width": 7, "stroke-linecap": "round"}, s.D)});
    el("circle", {cx: CX, cy: CY, r: 150, fill: "#ffe14d", opacity: .8, filter: "url(#blur)"}, s.D); el("circle", {cx: CX, cy: CY, r: 46, fill: "#fffbe0"}, s.D);
  } else {                            // low over the panel: dark blue cells rush under us; we follow the silver strip that collects the electricity
    const HY = 300, F = floorKit(HY, 170); s.F = F;
    fullRect(s.D, grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#3aa9f5"], [.33, "#cfeeff"], [1, "#cfeeff"]]));
    el("circle", {cx: CX + 560, cy: 70, r: 150, fill: "#fff3b0", opacity: .9, filter: "url(#blur)"}, s.D); el("circle", {cx: CX + 560, cy: 70, r: 62, fill: "#fffbe0"}, s.D);
    el("rect", {x: FULL.x, y: HY, width: FULL.w, height: FULL.y + FULL.h - HY, fill: grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#7fa6d6"], [.1, "#3c64a0"], [.4, "#1d3557"], [1, "#132443"]])}, s.D);
    for (let k = -16; k <= 16; k++) el("path", {d: F.strip(k + .5, .022, .1, 80), fill: "#5f86bd"}, s.D);
    s.cross = []; for (let i = 0; i < 16; i++) s.cross.push({z0: i / 16, e: el("path", {fill: "#5f86bd"}, s.D)});
    s.side = []; [-4, -2, 2, 4].forEach(k => { el("path", {d: F.strip(k, .035, .1, 80), fill: "#c9d6e2"}, s.D); for (let i = 0; i < 5; i++) s.side.push({k, z0: i / 5 + k * .13, e: el("path", {fill: "#ffe14d"}, s.D)}); });
    el("path", {d: F.strip(0, .21, .1, 80), fill: INK}, s.D); el("path", {d: F.strip(0, .18, .1, 80), fill: "#e9eef2"}, s.D); el("path", {d: F.strip(-.1, .035, .1, 80), fill: "#fff"}, s.D);
    s.core = el("path", {d: F.strip(0, .1, .1, 80), fill: "#ffe14d"}, s.D);
    s.pul = []; for (let i = 0; i < 8; i++) s.pul.push({z0: i / 8, e: el("path", {fill: "#fffbe0"}, s.D)});
    el("circle", {cx: CX, cy: HY + 2, r: 60, fill: "#ffe14d", opacity: .9, filter: "url(#blur)"}, s.D);
    s.dglow = el("ellipse", {cx: CX, cy: FULL.y + FULL.h + 30, rx: 560, ry: 230, fill: "#ffe14d", opacity: .8, filter: "url(#blur)"}, s.D); }
  s.vg = edge(s.stage, "#ffe14d", .5); s.flash = fullRect(s.stage, "#fffbe0", 0);
  s.c1 = card(s.stage, "Tengeh Reservoir, Singapore: floating solar panels", "#1d3557"); s.c2 = card(s.stage, "light energy → electrical energy", "#f77f00", 50);
  s.run = t => { const u = t - T0("povPanel"), D = DUR("povPanel"), tc = 1.25, th = 2.9;          // tc: through the cloud layer; th: we hit the panel
    op(s.A, u < tc ? 1 : 0); op(s.C, u >= tc && u < th + .12 ? 1 : 0); op(s.D, u >= th + .12 ? 1 : 0);
    const z = expo(1.7, 17, (u + .45) / (tc + .45)); tf(s.map, `translate(${CX} ${CY}) scale(${z}) translate(${-TG[0]} ${-TG[1]})`);
    tf(s.sgl, `translate(${CX + (GEO.sg[0] - TG[0]) * z} ${CY - 6.5 * z - 30})`); op(s.sgl, 1 - ramp(u, tc - .5, tc - .2));
    const sc = expo(.07, 34, (u - tc) / (th - tc)); tf(s.farm, `translate(${CX} ${CY}) scale(${sc})`); op(s.solid, 1 - ramp(sc, .45, 1.1)); op(s.waves, ramp(sc, .12, .4));
    op(s.spot, ramp(u, th - .6, th - .1)); set(s.spot, "r", 60 + 520 * ramp(u, th - .6, th));
    flyField(s.clouds, (u + .5) * .46, 900); op(s.clouds.G, .96 * (1 - ramp(u, tc + .15, tc + .55)));
    op(s.white, Math.max(on(u, tc - .28, tc + .32, .26), .7 * (1 - ramp(u, -.45, 0))));
    op(s.flash, u < th ? ramp(u, th - .08, th) : 1 - ramp(u, th + .1, th + .6));
    const v = u - th;
    if (PANEL_END === "wire") { runTunnel(s.tun, v * 1.15, 400);
      s.zaps.forEach(o => { const zz = ((o.z0 - v * 1.6) % 1 + 1) % 1, r1 = 70 / (.1 + zz * 1.4), r2 = r1 * 1.35; set(o.e, "x1", CX + Math.cos(o.a) * r1); set(o.e, "y1", CY + Math.sin(o.a) * r1); set(o.e, "x2", CX + Math.cos(o.a) * r2); set(o.e, "y2", CY + Math.sin(o.a) * r2); op(o.e, clamp((1 - zz) / .3) * clamp(zz / .1)); });
    } else { const F = s.F, dep = (z0, k) => .1 + 7.9 * (((z0 - v * k) % 1 + 1) % 1);
      s.cross.forEach(o => { const d = dep(o.z0, .42); set(o.e, "d", F.strip(0, 40, d, d * 1.012 + .003)); op(o.e, clamp((8 - d) / 3)); });
      s.pul.forEach(o => { const d = dep(o.z0, -.9); set(o.e, "d", F.strip(0, .1, d, d * 1.18)); op(o.e, clamp((8 - d) / 2)); });
      s.side.forEach(o => { const d = dep(o.z0, -.9); set(o.e, "d", F.strip(o.k, .05, d, d * 1.14)); op(o.e, clamp((8 - d) / 2)); });
      op(s.dglow, .7 + .12 * Math.sin(u * 40)); }
    showC(s.c1, u, tc + .05, th - .05); showC(s.c2, u, th + .1, D); };
  return s; })();

/* =====================================================================================================================
   FIRST-PERSON SHOT 3: povSea. We are electricity, riding a power cable laid on the seabed. Sunlight slants down through
   the water, bubbles rise, rocks, sea grass and corals rush past. (Nothing is built yet, so the card says "Planned".) */
S.povSea = (() => { const s = scene("povSea", "#0a5c9c", "#0a5c9c"); const HY = 380, G = 150, DN = .2, DF = 7, F = floorKit(HY, G), BOT = FULL.y + FULL.h;
  fullRect(s.stage, grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#5fd0f5"], [.16, "#2aa3dc"], [.42, "#0b6aa8"], [1, "#0b6aa8"]]));
  // sunlight slanting down from the surface
  [[330, 120, 260], [660, 80, 190], [930, 130, 250], [1290, 70, 200], [80, 60, 170], [1560, 90, 240]].forEach(([x, w, lean]) =>
    el("path", {d: `M${x} ${FULL.y} h${w} l${lean + w} ${HY + 380 - FULL.y} h${-w * 3} Z`, fill: grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#eafcff", .42], [.6, "#eafcff", .12], [1, "#eafcff", 0]])}, s.stage));
  // the seabed: sand under blue water, fading into the distance
  el("rect", {x: FULL.x, y: HY, width: FULL.w, height: BOT - HY, fill: grad("linearGradient", {x1: 0, y1: 0, x2: 0, y2: 1}, [[0, "#0b6aa8"], [.1, "#1d7fae"], [.4, "#4f9fae"], [1, "#a9c7a4"]])}, s.stage);
  s.ripples = []; for (let i = 0; i < 16; i++) s.ripples.push({z0: i / 16, e: el("path", {fill: "none", stroke: "#2c6f86", "stroke-linecap": "round"}, s.stage)});
  s.items = el("g", {}, s.stage); seed = 913; s.things = [];
  for (let i = 0; i < 46; i++) { const side = i % 2 ? 1 : -1, X = side * (1.25 + Math.pow(rnd(), 1.5) * 10), z0 = (i + rnd() * .8) / 46, kind = i % 5, e = el("g", {}, s.items), sv = seed;
    if (kind === 0 || kind === 3) { blob(e, 34 + (i % 3) * 14, ["#7d8597", "#5c677d", "#979dac"][i % 3], 200 + i); e.lastChild.setAttribute("transform", "translate(0 -22) scale(1.3 .8)"); }
    else if (kind === 1 || kind === 4) [-26, -9, 8, 24].forEach((x, k) => el("path", {d: `M${x} 0 q${-12 + k * 7} -${60 + k * 13} ${4 + k * 3} -${105 + (k % 2) * 34} q${10 - k * 2} ${50 + k * 5} ${9} ${105 + (k % 2) * 34} Z`, fill: k % 2 ? "#2d9d5c" : "#52b788", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round"}, e));
    else { [[-18, -22, 20], [16, -26, 24], [0, -52, 20], [-30, -50, 13], [30, -58, 13]].forEach(([x, y, r]) => el("circle", {cx: x, cy: y, r, fill: i % 4 === 2 ? "#ff8fab" : "#ffb86b", stroke: INK, "stroke-width": 4}, e)); }
    seed = sv; s.things.push({X, z0, e}); }
  // the cable: a thick round cable that runs from under us to the far distance; the glow around it is the electricity (us)
  s.halo = []; for (let i = 0; i < 10; i++) s.halo.push({z0: i / 10, e: el("path", {fill: "#ffe14d", filter: "url(#pvbSoft2)"}, s.stage)});
  const sf = el("filter", {id: "pvbSoft2", x: "-60%", y: "-60%", width: "220%", height: "220%"}, defs()); el("feGaussianBlur", {stdDeviation: 14}, sf);
  el("path", {d: F.strip(.06, .44, .1, 60), fill: "#06304f", opacity: .4}, s.stage);
  el("path", {d: F.strip(0, .36, .1, 60), fill: INK}, s.stage); el("path", {d: F.strip(0, .32, .1, 60), fill: "#30395c"}, s.stage);
  el("path", {d: F.strip(-.1, .13, .1, 60), fill: "#4c5a8a"}, s.stage); el("path", {d: F.strip(-.13, .035, .1, 60), fill: "#8fa0d0"}, s.stage);
  s.bands = []; for (let i = 0; i < 20; i++) s.bands.push({z0: i / 20, e: el("path", {fill: "#f4a261", stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round"}, s.stage)});
  s.glow = el("ellipse", {cx: CX, cy: BOT + 40, rx: 620, ry: 240, fill: "#ffe14d", opacity: .7, filter: "url(#blur)"}, s.stage);
  // bubbles rising
  seed = 55; s.bub = []; for (let i = 0; i < 24; i++) s.bub.push({X: (rnd() * 2 - 1) * 6, h0: rnd(), z0: rnd(), r: 10 + rnd() * 16, v: .25 + rnd() * .3, e: el("g", {}, s.stage)});
  s.bub.forEach(b => { el("circle", {r: b.r, fill: "#fff", "fill-opacity": .16, stroke: "#eafcff", "stroke-width": 3.5}, b.e); el("path", {d: `M${-b.r * .5} ${-b.r * .2} A${b.r * .55} ${b.r * .55} 0 0 1 ${-b.r * .1} ${-b.r * .55}`, fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round"}, b.e); });
  s.vg = edge(s.stage, "#ffe14d", .45);
  s.c = card(s.stage, "Planned: solar power from Indonesia, by cable under the sea", "#1d3557");
  s.run = t => { const u = t - T0("povSea"), D = DUR("povSea"), off = (u + .5) * .2;
    const dep = z0 => DN + (DF - DN) * (((z0 - off) % 1 + 1) % 1);
    s.things.forEach(o => { const d = dep(o.z0) - .08, q = F.pt(o.X, d); o.d = d; tf(o.e, `translate(${q[0]} ${q[1]}) scale(${1.25 / d})`); op(o.e, clamp((DF - d) / 3)); });
    s.things.slice().sort((a, b) => b.d - a.d).forEach(o => s.items.appendChild(o.e));
    s.ripples.forEach((o, i) => { const d = dep(o.z0), q = F.pt((i % 2 ? 1 : -1) * (1.2 + (i * .67) % 3.4), d), w = 34 / d; set(o.e, "d", `M${q[0]} ${q[1]} q${w} ${-w * .22} ${w * 2} 0 t${w * 2} 0`); set(o.e, "stroke-width", 4.5 / d); op(o.e, .5 * clamp((DF - d) / 3)); });
    s.bands.forEach(o => { const d = dep(o.z0); set(o.e, "d", F.strip(0, .335, d, d * 1.04 + .014)); op(o.e, clamp((DF - d) / 1.5)); });
    s.halo.forEach(o => { const d = DN * .8 + (DF - DN) * (((o.z0 + off * 1.6) % 1 + 1) % 1); set(o.e, "d", F.strip(0, .46, d, d * 1.22)); op(o.e, .95 * clamp((DF - d) / 1.5)); });
    s.bub.forEach(b => { const d = dep(b.z0), h = ((b.h0 + u * b.v) % 1) * 2.4, q = F.pt(b.X, d); tf(b.e, `translate(${q[0]} ${HY + (G - h * 150) / d}) scale(${.5 / d})`); op(b.e, clamp((DF - d) / 2.5) * clamp((d - DN) / .1)); });
    op(s.glow, .62 + .12 * Math.sin(u * 9));
    showC(s.c, u, .25, D - .1); };
  return s; })();

/* =====================================================================================================================
   FIRST-PERSON SHOT 4: povNeutron. We are a neutron flying at a uranium atom (its centre: a ball of protons, red, and
   neutrons, blue, in the real 92 : 143 mix). We hit it; it wobbles, stretches and splits into two smaller atoms of
   different sizes (the smaller one flies off faster); three new neutrons fly out and heat bursts outward. */
S.povNeutron = (() => { const s = scene("povNeutron", "#240046", "#5a189a"); const PR = "#ef476f", NE = "#4cc9f0";
  fullRect(s.stage, grad("radialGradient", {cx: .5, cy: .5, r: .75}, [[0, "#6a1fb0"], [1, "#1c0038"]]));
  // other uranium atoms far away (the fuel is full of them)
  s.far = field(s.stage, 14, 631, (e, i) => { seed = 40 + i; for (let k = 0; k < 12; k++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 36; el("circle", {cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 13, fill: rnd() < .39 ? PR : NE, stroke: INK, "stroke-width": 2.5}, e); } }, .5);
  s.heat = el("circle", {cx: CX, cy: CY, r: 100, fill: grad("radialGradient", {cx: .5, cy: .5, r: .5}, [[0, "#fffbe0", 1], [.22, "#ffe14d", .95], [.55, "#ff9f1c", .6], [1, "#ff7b00", 0]]), opacity: 0}, s.stage);
  s.rings = [0, 1, 2, 3].map(i => el("circle", {cx: CX, cy: CY, r: 10, fill: "none", stroke: i % 2 ? "#ffe14d" : "#ff9f1c", "stroke-width": 16, opacity: 0}, s.stage));
  // the uranium nucleus: 150 balls packed in a sphere, 39 % protons. The part left of x = 16 becomes the bigger new atom.
  s.nuc = el("g", {}, s.stage); s.L = el("g", {}, s.nuc); s.R = el("g", {}, s.nuc); seed = 2026; const pts = [];
  while (pts.length < 150) { const x = rnd() * 2 - 1, y = rnd() * 2 - 1, z = rnd() * 2 - 1; if (x * x + y * y + z * z <= 1) pts.push({x: x * 150, y: y * 150, z, p: rnd() < .39}); }
  pts.sort((a, b) => a.z - b.z); const side = [pts.filter(q => q.x < 16), pts.filter(q => q.x >= 16)];
  side.forEach((P, k) => { const cx = P.reduce((a, q) => a + q.x, 0) / P.length, hw = Math.max(...P.map(q => Math.abs(q.x - cx))), hh = Math.max(...P.map(q => Math.abs(q.y))), rf = 150 * Math.cbrt(P.length / 150);
    P.forEach(q => { q.tx = cx + (q.x - cx) * rf / hw; q.ty = q.y * rf / hh; const g = q.e = el("g", {}, k ? s.R : s.L), sh = .34 * (1 - (q.z + 1) / 2);
      el("circle", {r: 25, fill: mix(q.p ? PR : NE, INK, sh), stroke: INK, "stroke-width": 3.5}, g);
      el("path", {d: "M-15 -5 A16 16 0 0 1 -3 -16", fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: .45 * (1 - sh * 2)}, g); }); });
  // the new neutrons
  s.ns = [[-.52, -.86, 1], [.8, .6, 1], [-.66, .75, 3.2]].map(([dx, dy, grow]) => { const g = el("g", {}, s.stage); g.tr = el("line", {stroke: "#bdefff", "stroke-width": 12, "stroke-linecap": "round", opacity: .6}, g);
    g.b = el("g", {}, g); el("circle", {r: 25, fill: NE, stroke: INK, "stroke-width": 3.5}, g.b); el("path", {d: "M-15 -5 A16 16 0 0 1 -3 -16", fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: .5}, g.b);
    g.dx = dx; g.dy = dy; g.grow = grow; return g; });
  s.vg = edge(s.stage, NE, .5); s.flash = fullRect(s.stage, "#eaffff", 0);
  s.c1 = card(s.stage, "Inside a nuclear reactor: a neutron hits a uranium atom", "#5a189a"); s.c2 = card(s.stage, "It splits and gives out lots of heat", "#f77f00", 48);
  s.run = t => { const u = t - T0("povNeutron"), D = DUR("povNeutron"), ti = 2.0, tsp = 2.95, v = u - tsp, w = Math.max(0, v), ZO = 1.55;       // ti: we hit; tsp: it splits
    flyField(s.far, Math.min(u, ti) * .16 + .3, 900); op(s.far.G, .6);
    // approach: the atom grows until it fills the view; after the hit the camera sits just outside to watch
    const sc = u < ti ? expo(.085, 3.1, (u + .45) / (ti + .45)) : lerp(3.1, ZO, ramp(u, ti, ti + .28));
    const A = u < ti ? 0 : v < 0 ? lerp(.05, .32, (u - ti) / (tsp - ti)) * Math.sin(14.88 * (u - ti)) : .32;
    const jig = u > ti && v < 0 ? 4 * Math.sin(u * 61) : 0;
    tf(s.nuc, `translate(${CX + jig} ${CY}) scale(${sc})`);      // the wobble moves the balls (they stay round): wider, then taller, then wider...
    const m = ramp(v, 0, .4), dx = 85 * w + 270 * (1 - Math.exp(-5 * w));
    side.forEach((P, k) => P.forEach(q => tf(q.e, `translate(${lerp(q.x * (1 + A), q.tx, m)} ${lerp(q.y / (1 + A * .8), q.ty, m)})`)));
    tf(s.L, `translate(${-dx * .8} ${dx * .14})`); tf(s.R, `translate(${dx * 1.15} ${-dx * .2})`);
    s.ns.forEach((g, i) => { const q = Math.max(0, v - i * .06), d = 150 + 760 * q, x = CX + g.dx * d, y = CY + g.dy * d, k = 1 + (g.grow - 1) * clamp(q / 1.1), L = Math.min(d - 100, 170 * k);
      tf(g.b, `translate(${x} ${y}) scale(${k * ZO * .75})`); set(g.tr, "x1", x); set(g.tr, "y1", y); set(g.tr, "x2", x - g.dx * L); set(g.tr, "y2", y - g.dy * L); set(g.tr, "stroke-width", 12 * k); op(g, v > i * .06 ? 1 : 0); });
    op(s.heat, v < 0 ? .55 * ramp(u, ti + .1, tsp) : 1); set(s.heat, "r", v < 0 ? 330 : 420 + 800 * (1 - Math.exp(-3 * w)));
    s.rings.forEach((r, i) => { const f = v < 0 ? 0 : (v * .8 + i / 4) % 1; set(r, "r", 150 + 1250 * f); set(r, "stroke-width", 10 + 22 * f); op(r, v > i * .31 ? .8 * (1 - f) : 0); });
    op(s.flash, Math.max(on(u, ti - .06, ti + .3, .12) * .85, v > -.04 ? .7 * (1 - ramp(v, -.02, .16)) : 0));
    showC(s.c1, u, .2, tsp - .1); showC(s.c2, u, tsp + .15, D); };
  return s; })();
})();
