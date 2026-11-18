/* TheOneApp, Explored EP02: How does Singapore keep the lights on? Load after ../common.js.
   Scenes draw in a 1200 x 900 box; times come from cue(scene, word, fallback) so the Shorts can reuse them. */

const cross = (p, x, y, r) => { const g = el("g", {}, p);
  el("line", {x1: x - r, y1: y - r, x2: x + r, y2: y + r, stroke: "#e63946", "stroke-width": 16, "stroke-linecap": "round"}, g);
  el("line", {x1: x + r, y1: y - r, x2: x - r, y2: y + r, stroke: "#e63946", "stroke-width": 16, "stroke-linecap": "round"}, g); return g; };
function hdb(p, x, y, w, h, col) { const g = el("g", {}, p);
  el("rect", {x, y: y - h, width: w, height: h, rx: 6, fill: col, stroke: INK, "stroke-width": 5}, g);
  for (let r = 0; r < Math.floor(h / 46); r++) for (let c = 0; c < Math.floor(w / 40); c++) el("rect", {x: x + 12 + c * 40, y: y - h + 18 + r * 46, width: 22, height: 26, rx: 3, fill: "#fdf0d5", opacity: .9}, g);
  g.roof = el("g", {}, g); for (let c = 0; c < Math.floor(w / 46); c++) el("rect", {x: x + 8 + c * 46, y: y - h - 22, width: 40, height: 18, fill: "#1d3557", stroke: "#a8dadc", "stroke-width": 2, transform: `skewX(-20)`, "transform-origin": `${x + 28 + c * 46} ${y - h - 13}`}, g.roof);
  return g; }

// ---- HOOK: flip a switch; no oil, coal or gas of our own
S.hook = (() => { const s = scene("hook", "#1b263b", "#415a77");
  s.glow = el("circle", {cx: 300, cy: 260, r: 200, fill: "#ffe066", filter: "url(#blur)", opacity: 0}, s.stage);
  s.bulb = emo(s.stage, 300, 260, 190, "💡");
  s.sw = el("g", {}, s.stage); el("rect", {x: -80, y: -120, width: 160, height: 240, rx: 24, fill: "#f8f9fa", stroke: INK, "stroke-width": 7}, s.sw);
  el("rect", {x: -32, y: -80, width: 64, height: 160, rx: 18, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.sw); s.tog = el("rect", {x: -28, y: 0, width: 56, height: 76, rx: 14, fill: "#f8f9fa", stroke: INK, "stroke-width": 4}, s.sw);
  s.icons = [["🛢️", "oil", "oil"], ["🪨", "coal", "coal"], ["🔥", "gas", "gas"]].map(([e, lab, w], i) => { const g = el("g", {}, s.stage);
    emo(g, 0, 0, 130, e); tx(g, {x: 0, y: 120, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff"}, lab); g.x = cross(g, 0, 0, 80); g.w = w; g.i = i; return g; });
  s.q = tx(s.stage, {x: 600, y: 860, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "So where does our electricity come from?");
  s.run = t => { const a = (w, f) => cue("hook", w, f), tf0 = a("switch", .1);
    popAt(s.sw, 300, 640, t, SC.hook.t0 - .2); set(s.tog, "y", lerp(0, -76, ramp(t, tf0 - .08, tf0 + .05)));
    const lit = ramp(t, tf0, tf0 + .2); op(s.glow, .8 * lit); op(s.bulb, .35 + .65 * lit);
    s.icons.forEach(g => { const tw = a(g.w, .4 + g.i * .1); popAt(g, 640 + g.i * 220, 330, t, tw - .5); op(g.x, ramp(t, tw, tw + .15)); });
    popAt(s.q, 0, 0, t, a("where", .8)); }; return s; })();

// ---- LAST WEEK'S ANSWER: cloth gaps vs the N95 filter
S.answer = (() => { const s = scene("answer", "#3a0ca3", "#4361ee");
  s.top = chip(s.stage, "✅ Last week's answer", "#06d6a0", {fs: 44});
  const lens = (cx, lab, n) => { const g = el("g", {}, s.stage); const cp = "c" + cx; const d = el("clipPath", {id: cp}, $("v").querySelector("defs")); el("circle", {cx: 0, cy: 0, r: 220}, d);
    el("circle", {r: 220, fill: "#f8f9fa"}, g); const m = el("g", {"clip-path": `url(#${cp})`}, g);
    for (let i = -220; i <= 220; i += n) { el("line", {x1: i, y1: -230, x2: i, y2: 230, stroke: "#4895ef", "stroke-width": n > 40 ? 18 : 6}, m); el("line", {x1: -230, y1: i, x2: 230, y2: i, stroke: "#4895ef", "stroke-width": n > 40 ? 18 : 6}, m); }
    g.dots = particles(m, 14, "#e63946", 6, 8); el("circle", {r: 220, fill: "none", stroke: INK, "stroke-width": 10}, g);
    tx(g, {x: 0, y: 290, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 8}, lab); g.cx = cx; return g; };
  s.cloth = lens(300, "cloth mask: big gaps", 70); s.n95 = lens(900, "N95: a fine filter", 14);
  s.c95 = chip(s.stage, "traps at least 95 of every 100 tiny particles", "#f72585", {fs: 36});
  s.run = t => { const a = (w, f) => cue("answer", w, f);
    popAt(s.top, 600, 40, t, SC.answer.t0 - .2);
    popAt(s.cloth, 300, 360, t, a("cloth#2", .35) - .2); popAt(s.n95, 900, 360, t, a("filter", .6) - .2);
    s.cloth.dots.forEach(d => { const k = (t * .5 + d.u) % 1; set(d.e, "cx", -200 + d.v * 400); set(d.e, "cy", lerp(-240, 240, k)); });
    s.n95.dots.forEach((d, i) => { const k = clamp(((t - a("filter", .6)) * .4 + d.u * .3)); set(d.e, "cx", -180 + d.v * 360); set(d.e, "cy", lerp(-240, -150 + (i % 4) * 14, k)); });
    popAt(s.c95, 600, 760, t, a("traps", .7)); }; return s; })();

// ---- HISTORY: 1965 oil -> 1991 Senoko gas -> 1992 pipelines -> 2013 LNG terminal
S.history = (() => { const s = scene("history", "#ffd6a5", "#ffadad");
  el("line", {x1: 60, y1: 560, x2: 1140, y2: 560, stroke: INK, "stroke-width": 12, "stroke-linecap": "round"}, s.stage);
  s.prog = el("line", {x1: 60, y1: 560, x2: 60, y2: 560, stroke: "#f72585", "stroke-width": 12, "stroke-linecap": "round"}, s.stage);
  const M = [["1965", "🛢️", "Power stations burn OIL", "sixty-five", .1, "#6c757d"], ["1991", "🔥", "Senoko: first to use GAS", "ninety-one", .3, "#3a86ff"],
    ["1992", "🧵", "Gas by PIPELINE (Malaysia, then Indonesia)", "ninety-two", .5, "#2a9d8f"], ["2013", "🚢", "LNG by SHIP from around the world", "thirteen", .8, "#7209b7"]];
  s.ms = M.map(([yr, e, lab, w, f, col], i) => { const g = el("g", {}, s.stage), x = 150 + i * 300;
    el("circle", {cx: 0, cy: 0, r: 26, fill: col, stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 90, "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: INK}, yr);
    const icon = e === "🧵" ? (() => { const p = el("g", {}, g); el("path", {d: "M-90 -170 H40 Q70 -170 70 -140 V-110", fill: "none", stroke: "#2a9d8f", "stroke-width": 26, "stroke-linecap": "round"}, p); el("path", {d: "M-90 -170 H40 Q70 -170 70 -140 V-110", fill: "none", stroke: "#99e2b4", "stroke-width": 10, "stroke-dasharray": "14 14", class: "flow"}, p); return p; })() : emo(g, 0, -150, 120, e);
    const c = chip(g, lab, col, {fs: 26}); tf(c, `translate(0 ${i % 2 ? -275 : 175})`); op(c, 1); g.x = x; g.w = w; g.f = f; return g; });
  s.flow = s.ms[2].querySelector(".flow");
  s.run = t => { const a = (w, f) => cue("history", w, f);
    s.ms.forEach(g => popAt(g, g.x, 560, t, a(g.w, g.f)));
    const last = s.ms.filter(g => t >= a(g.w, g.f)).pop(); set(s.prog, "x2", last ? last.x : 60);
    if (s.flow) set(s.flow, "stroke-dashoffset", -t * 60); }; return s; })();

// ---- TODAY: 100 light bulbs, 93 blue for gas, under 3 yellow for solar
S.today = (() => { const s = scene("today", "#caf0f8", "#90e0ef");
  s.cells = []; for (let i = 0; i < 100; i++) { const r = Math.floor(i / 10), c = i % 10;
    s.cells.push(el("circle", {cx: 150 + c * 60, cy: 150 + r * 60, r: 24, fill: "#fff", stroke: INK, "stroke-width": 3}, s.stage)); }
  s.l1 = chip(s.stage, "🔥 93 natural gas", "#3a86ff", {fs: 44}); s.l2 = chip(s.stage, "☀️ under 3 solar", "#f4a261", {fs: 44}); s.l3 = chip(s.stage, "other: the rest", "#6c757d", {fs: 30});
  s.run = t => { const a = (w, f) => cue("today", w, f), tg = a("ninety-three", .3), ts = a("solar", .75);
    const nB = Math.floor(clamp((t - tg) / 1.4) * 93);
    s.cells.forEach((c, i) => set(c, "fill", i < nB ? "#3a86ff" : (i >= 97 && t > ts ? "#ffbe0b" : (i >= 93 && i < 97 && t > ts + .6 ? "#adb5bd" : "#fff"))));
    popAt(s.l1, 960, 260, t, tg); popAt(s.l2, 960, 420, t, ts); popAt(s.l3, 960, 560, t, ts + .6); }; return s; })();

// ---- NEWS: pipelines into Singapore, a little less from Indonesia, LNG ships, contracts to 2028
S.news = (() => { const s = scene("news", "#023e8a", "#0077b6");
  s.map = regionMap(s.stage);
  const pipe = (d, col) => { const g = el("g", {}, s.stage); el("path", {d, fill: "none", stroke: INK, "stroke-width": 18, "stroke-linecap": "round"}, g);
    const f = el("path", {d, fill: "none", stroke: col, "stroke-width": 9, "stroke-dasharray": "16 18", "stroke-linecap": "round"}, g); g.f = f; return g; };
  s.pMy = pipe(pipeD("my"), "#ffd166"); s.pSu = pipe(pipeD("su"), "#ffd166"); s.pNa = pipe(pipeD("na"), "#ffd166");
  s.src = gasSources(s.stage); s.ship = emo(s.stage, 0, 0, 110, "🚢");
  s.h = chip(s.stage, "Oct 2026: a little less gas by pipeline from Indonesia", "#e63946", {fs: 30});
  s.small = chip(s.stage, "under 2 of every 100 units we use", "#2a9d8f", {fs: 32});
  s.cal = chip(s.stage, "📅 some contracts end in 2028 → planning ahead", "#7209b7", {fs: 32});
  s.run = t => { const a = (w, f) => cue("news", w, f), tl = a("less", .3), tsh = a("ship", .6);
    [s.pMy, s.pSu, s.pNa].forEach((p, i) => { op(p, ramp(t, SC.news.t0 - .3 + i * .2, SC.news.t0 + i * .2)); set(p.f, "stroke-dashoffset", -t * 80); });
    s.src.forEach((g, i) => op(g, ramp(t, SC.news.t0 - .1 + i * .2, SC.news.t0 + .2 + i * .2)));
    [s.pSu, s.pNa].forEach(p => set(p.f, "stroke-dasharray", t > tl ? "8 34" : "16 18"));
    popAt(s.h, 600, 50, t, a("october", .1)); op(s.h, on(t, a("october", .1), a("two", .45) + .3, .2));
    popAt(s.small, 600, 50, t, a("two", .45) + .3); op(s.small, on(t, a("two", .45) + .3, a("twenty-eight", .8), .2));
    const k = ramp(t, tsh - .3, tsh + 2.5); tf(s.ship, `translate(${lerp(1130, 790, k)} ${lerp(170, 350, k)})`); op(s.ship, ramp(t, tsh - .4, tsh - .1));
    popAt(s.cal, 600, 50, t, a("twenty-eight", .8)); }; return s; })();

// ---- CONVERT: a working power station. Gas flows in, burns, hot gas spins the turbine, the shaft turns a magnet inside a
// copper coil (the generator), current flows along the wires and a lamp lights in an HDB flat. Each part comes alive when
// Heart names it; every label row is the same kind: the thing's name above, its form of energy below (rule 10).
S.convert = (() => { const s = scene("convert", "#e9f5ff", "#cfe8fb"); const st = s.stage, Y = 470;
  s.p6 = chip(st, "P6: energy changes from one form to another", "#7209b7", {fs: 34});
  // 1 natural gas pipe
  s.pipe = el("g", {}, st); el("rect", {x: -20, y: Y - 26, width: 240, height: 52, rx: 10, fill: "#adb5bd", stroke: INK, "stroke-width": 6}, s.pipe);
  s.gas = []; for (let k = 0; k < 9; k++) s.gas.push(el("circle", {r: 9, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, s.pipe));
  // 2 combustion chamber with a flame
  s.ch = el("g", {}, st); el("rect", {x: 210, y: Y - 95, width: 160, height: 190, rx: 18, fill: "#495057", stroke: INK, "stroke-width": 7}, s.ch);
  el("rect", {x: 228, y: Y - 77, width: 124, height: 154, rx: 12, fill: "#1b1b3a"}, s.ch);
  s.flame = el("g", {transform: `translate(290 ${Y + 55})`}, s.ch);
  s.fo = el("path", {d: "M0 0 C-48 -20 -40 -80 -6 -120 C-10 -80 18 -70 12 -100 C44 -60 44 -18 0 0 Z", fill: "#f77f00"}, s.flame);
  s.fi = el("path", {d: "M0 0 C-24 -12 -20 -50 -2 -70 C2 -48 20 -40 14 -56 C26 -34 22 -10 0 0 Z", fill: "#4cc9f0"}, s.flame);
  // 3 hot gas duct and turbine
  s.duct = el("g", {}, st); el("rect", {x: 366, y: Y - 34, width: 80, height: 68, fill: "#6c757d", stroke: INK, "stroke-width": 6}, s.duct);
  s.hot = []; for (let k = 0; k < 10; k++) s.hot.push(el("circle", {r: 8, fill: "#ff7b00"}, s.duct));
  s.tb = el("g", {transform: `translate(530 ${Y})`}, st); el("circle", {r: 92, fill: "#e9ecef", stroke: INK, "stroke-width": 7}, s.tb);
  s.bl = el("g", {}, s.tb); for (let k = 0; k < 8; k++) el("path", {d: "M10 -8 L80 -22 Q86 0 80 22 L10 8 Z", fill: "#457b9d", stroke: INK, "stroke-width": 3, transform: `rotate(${k * 45})`}, s.bl);
  el("circle", {r: 16, fill: INK}, s.tb);
  // shaft to the generator
  s.shaft = el("g", {}, st); el("rect", {x: 620, y: Y - 12, width: 110, height: 24, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.shaft);
  s.stripes = []; for (let k = 0; k < 5; k++) s.stripes.push(el("rect", {y: Y - 12, width: 8, height: 24, fill: INK, opacity: .45}, s.shaft));
  // 4 generator: a magnet turning inside a copper coil
  s.gen = el("g", {}, st); el("rect", {x: 728, y: Y - 110, width: 200, height: 220, rx: 18, fill: "#f8f9fa", stroke: INK, "stroke-width": 7}, s.gen);
  for (let k = 0; k < 7; k++) { el("path", {d: `M${748 + k * 26} ${Y - 92} h16`, stroke: "#b5651d", "stroke-width": 12, "stroke-linecap": "round"}, s.gen);
    el("path", {d: `M${748 + k * 26} ${Y + 92} h16`, stroke: "#b5651d", "stroke-width": 12, "stroke-linecap": "round"}, s.gen); }
  s.mag = el("g", {transform: `translate(828 ${Y})`}, s.gen); el("rect", {x: -70, y: -18, width: 70, height: 36, fill: "#e63946", stroke: INK, "stroke-width": 4}, s.mag);
  el("rect", {x: 0, y: -18, width: 70, height: 36, fill: "#3a86ff", stroke: INK, "stroke-width": 4}, s.mag);
  tx(s.mag, {x: -35, y: 10, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "N"); tx(s.mag, {x: 35, y: 10, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "S");
  // 5 wires to an HDB flat with a lamp
  s.wire = el("g", {}, st); const wd = `M928 ${Y - 40} H1010 V250 H1050`; const wd2 = `M928 ${Y + 40} H1040 V290 H1050`;
  el("path", {d: wd, fill: "none", stroke: INK, "stroke-width": 9}, s.wire); el("path", {d: wd2, fill: "none", stroke: INK, "stroke-width": 9}, s.wire);
  s.cur = el("path", {d: wd, fill: "none", stroke: "#ffd166", "stroke-width": 5, "stroke-dasharray": "10 16"}, s.wire);
  s.cur2 = el("path", {d: wd2, fill: "none", stroke: "#ffd166", "stroke-width": 5, "stroke-dasharray": "10 16"}, s.wire);
  s.flat = el("g", {}, st); el("rect", {x: 1050, y: 130, width: 140, height: 300, rx: 6, fill: "#f4a261", stroke: INK, "stroke-width": 6}, s.flat);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) el("rect", {x: 1068 + c * 62, y: 150 + r * 66, width: 42, height: 44, rx: 4, fill: "#fdf0d5"}, s.flat);
  s.glow = el("circle", {cx: 1151, cy: 238, r: 60, fill: "#ffe066", filter: "url(#blur)", opacity: 0}, s.flat);
  s.win = el("rect", {x: 1130, y: 216, width: 42, height: 44, rx: 4, fill: "#fdf0d5", stroke: INK, "stroke-width": 3}, s.flat);
  s.lamp = emo(s.flat, 1151, 236, 34, "💡");
  // labels: name above, energy below, one pair per part
  const L = [["Natural gas", 90, "chemical potential energy", "#f77f00", "chemical", .15], ["Burning", 300, "heat energy", "#e63946", "burns", .3],
             ["Turbine", 530, "kinetic energy", "#457b9d", "turbines", .55], ["Generator", 828, "electrical energy", "#e0a800", "generators", .7],
             ["Lamp", 1135, "light energy", "#06d6a0", "electrical", .85]];
  s.labs = L.map(([name, x, energy, col, w, f], i) => { const g = el("g", {}, st);
    tx(g, {x, y: i === 4 ? 105 : Y - 130, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: INK}, name);
    const by = i === 4 ? 478 : Y + 150, lab = el("g", {transform: `translate(${x} ${by})`}, g); el("rect", {x: -88, y: -32, width: 176, height: 64, rx: 18, fill: col, stroke: INK, "stroke-width": 4}, lab);
    const wds = energy.split(" "), lines = energy.length > 12 ? [wds.slice(0, -1).join(" "), wds[wds.length - 1]] : [energy];
    lines.forEach((ln, k) => tx(lab, {x: 0, y: lines.length > 1 ? -5 + k * 26 : 9, "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: "#fff"}, ln));
    g.w = w; g.f = f; return g; });
  s.run = t => { const a = (w, f) => cue("convert", w, f);
    const T = s.labs.map(g => a(g.w, g.f)); T[4] += .9;          // the lamp lights just after "electrical energy"
    const on1 = k => ramp(t, T[k] - .3, T[k] + .2);
    popAt(s.p6, 600, 70, t, SC.convert.t0 - .1);
    [s.pipe, s.ch, s.duct, s.tb, s.gen].forEach((g, k) => op(g, .25 + .75 * on1(Math.min(k === 2 ? 2 : k === 3 ? 2 : k === 4 ? 3 : k, 4))));
    op(s.shaft, .25 + .75 * on1(2)); op(s.wire, .25 + .75 * on1(3)); op(s.flat, .25 + .75 * on1(4));
    s.labs.forEach((g, k) => op(g, on1(k)));
    // gas flowing in the pipe
    s.gas.forEach((d, k) => { const u = ((t * .5 + k / 9) % 1); set(d, "cx", -10 + u * 220); set(d, "cy", Y + Math.sin(k * 2.1) * 10); op(d, on1(0)); });
    // the flame grows when it burns
    const fl = on1(1); tf(s.flame, `translate(290 ${Y + 55}) scale(${(.2 + .8 * fl) * (1 + .06 * Math.sin(t * 13))} ${(.2 + .8 * fl) * (1 + .1 * Math.sin(t * 17))})`);
    // hot gas rushes into the turbine; it spins faster as the hot gas arrives
    s.hot.forEach((d, k) => { const u = ((t * 1.2 + k / 10) % 1); set(d, "cx", 366 + u * 120); set(d, "cy", Y - 24 + (k % 3) * 24); op(d, on1(2) * (1 - u * .3)); });
    const spin = 40 + 520 * on1(2); s.ang = (s.ang || 0); const dt = s.lt ? Math.max(0, Math.min(.1, t - s.lt)) : 0; s.lt = t; s.ang += spin * dt;
    tf(s.bl, `rotate(${s.ang})`); tf(s.mag, `translate(828 ${Y}) rotate(${s.ang})`);
    s.stripes.forEach((r, k) => set(r, "x", 624 + ((k * 22 + s.ang * .3) % 104)));
    // current flows once the generator turns; the lamp lights
    const cur = on1(3); set(s.cur, "stroke-dashoffset", -t * 90); set(s.cur2, "stroke-dashoffset", t * 90); op(s.cur, cur); op(s.cur2, cur);
    const lit = on1(4); op(s.glow, .9 * lit); set(s.win, "fill", lit > .5 ? "#ffe066" : "#fdf0d5"); op(s.lamp, .3 + .7 * lit); }; return s; })();

// ---- SUN: sunlight -> tiny sea life -> buried under rock for millions of years -> natural gas
S.sun = (() => { const s = scene("sun", "#8ecae6", "#023047");
  el("rect", {x: 0, y: 0, width: 1200, height: 260, rx: 30, fill: "#bde0fe"}, s.stage); s.sunE = emo(s.stage, 160, 120, 150, "☀️");
  s.rays = el("g", {}, s.stage); for (let i = 0; i < 6; i++) el("line", {x1: 230 + i * 120, y1: 130, x2: 290 + i * 120, y2: 330, stroke: "#ffbe0b", "stroke-width": 8, "stroke-linecap": "round", "stroke-dasharray": "20 16"}, s.rays);
  el("rect", {x: 0, y: 260, width: 1200, height: 220, fill: "#0096c7"}, s.stage);
  seed = 71; s.life = particles(s.stage, 30, "#95d5b2", 8, 14);
  s.layers = ["#bc6c25", "#dda15e", "#a68a64", "#7f5539", "#936639"].map((c, i) => el("rect", {x: 0, y: 480 + i * 70, width: 1200, height: 70, fill: c, stroke: INK, "stroke-width": 3, opacity: 0}, s.stage));
  s.gas = el("ellipse", {cx: 760, cy: 760, rx: 0, ry: 0, fill: "#4cc9f0", stroke: INK, "stroke-width": 6}, s.stage);
  s.gl = tx(s.stage, {x: 760, y: 772, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK, opacity: 0}, "natural gas");
  s.myr = chip(s.stage, "⏳ millions of years", "#7f5539", {fs: 38});
  s.wow = chip(s.stage, "even gas power started as SUNLIGHT!", "#f72585", {fs: 40});
  s.co2 = chip(s.stage, "burning it releases carbon dioxide", "#495057", {fs: 32}); s.gone = chip(s.stage, "used up = gone", "#e63946", {fs: 32});
  s.run = t => { const a = (w, f) => cue("sun", w, f), tl = a("tiny", .15), tm = a("millions", .3), tg = has("sun", "sunlight") ? a("sunlight", .62) - .4 : a("gas", .55);
    tf(s.sunE, `translate(160 120) scale(${1 + .06 * Math.sin(t * 3)}) translate(-160 -120)`); set(s.rays, "stroke-dashoffset", -t * 40); s.rays.querySelectorAll("line").forEach(l => l.setAttribute("stroke-dashoffset", -t * 50));
    const bury = ramp(t, tm, tm + 3);
    s.life.forEach(d => { const sink = clamp(bury * 1.3 - d.u * .3); set(d.e, "cx", 60 + d.v * 1080 + Math.sin(t + d.w) * 15); set(d.e, "cy", lerp(300 + d.u * 150, 760 + (d.v - .5) * 60, sink)); op(d.e, ramp(t, tl - .2, tl + .3) * (1 - ramp(t, tg, tg + .6))); });
    s.layers.forEach((l, i) => op(l, ramp(t, tm + i * .5, tm + i * .5 + .4)));
    const gk = ramp(t, tg, tg + .6); set(s.gas, "rx", 190 * gk); set(s.gas, "ry", 60 * gk); op(s.gl, gk);
    popAt(s.myr, 600, 440, t, tm); op(s.myr, on(t, tm, tg + 1, .2));
    if (!has("sun", "sunlight")) op(s.wow, 0); else { popAt(s.wow, 600, 340, t, a("sunlight", .62)); op(s.wow, on(t, a("sunlight", .62), has("sun", "carbon") ? a("carbon", .8) : 1e9, .2)); }
    if (has("sun", "carbon")) { popAt(s.co2, 600, 340, t, a("carbon", .8)); popAt(s.gone, 600, 420, t, a("gone", .95)); } else { op(s.co2, 0); op(s.gone, 0); } }; return s; })();

// ---- OPTIONS: rooftop and floating solar (Tengeh), clean power from our neighbours by cable
S.options = (() => { const s = scene("options", "#a8dadc", "#457b9d");
  s.b1 = hdb(s.stage, 40, 560, 200, 330, "#f4a261"); s.b2 = hdb(s.stage, 270, 560, 200, 280, "#e76f51");
  s.res = el("g", {}, s.stage); el("ellipse", {cx: 260, cy: 740, rx: 240, ry: 110, fill: "#48cae4", stroke: INK, "stroke-width": 6}, s.res);
  s.float = el("g", {}, s.res); for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) el("rect", {x: 90 + c * 38, y: 690 + r * 26, width: 32, height: 20, fill: "#1d3557", stroke: "#a8dadc", "stroke-width": 2}, s.float);
  s.tg = chip(s.stage, "Tengeh Reservoir: about 120,000 floating panels", "#1d3557", {fs: 28});
  s.mini = el("g", {}, s.stage); el("circle", {cx: 0, cy: 0, r: 230, fill: "#caf0f8", stroke: INK, "stroke-width": 6}, s.mini);
  el("circle", {cx: 0, cy: 0, r: 18, fill: "#e63946", stroke: "#fff", "stroke-width": 5}, s.mini); tx(s.mini, {x: 0, y: 52, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "Singapore");
  s.cables = [[-200, -120, "☀️"], [200, -100, "💧"], [-180, 150, "🌬️"], [170, 160, "☀️"]].map(([x, y, e]) => { const g = el("g", {}, s.mini);
    const l = el("line", {x1: x, y1: y, x2: 0, y2: 0, stroke: "#ffbe0b", "stroke-width": 8, "stroke-dasharray": "14 10"}, g); emo(g, x, y, 60, e); g.l = l; return g; });
  s.third = chip(s.stage, "about 1/3 of our electricity by 2035", "#7209b7", {fs: 32});
  s.run = t => { const a = (w, f) => cue("options", w, f), tr = a("rooftops", .2), tres = a("reservoirs", .3), tn = a("neighbours", .62);
    op(s.b1.roof, ramp(t, tr, tr + .4)); op(s.b2.roof, ramp(t, tr + .2, tr + .6));
    popAt(s.res, 0, 0, t, tres - .1); op(s.float, ramp(t, a("tengeh", .4), a("tengeh", .4) + .6));
    popAt(s.tg, 300, 870, t, a("tengeh", .4)); op(s.tg, on(t, a("tengeh", .4), a("third", .9), .2));
    popAt(s.mini, 870, 420, t, tn - .3); s.cables.forEach((g, i) => { op(g, ramp(t, tn + i * .25, tn + i * .25 + .3)); set(g.l, "stroke-dashoffset", t * 50); });
    popAt(s.third, 870, 760, t, a("third", .9)); }; return s; })();

// ---- NUCLEAR: atoms split and release heat; Singapore is studying small modular reactors; safety first
S.nuclear = (() => { const s = scene("nuclear", "#240046", "#5a189a");
  s.at = el("g", {}, s.stage); seed = 81; s.atIn = el("g", {}, s.at);
  const half = (side) => { const g = el("g", {}, s.atIn); for (let i = 0; i < 9; i++) el("circle", {cx: side * (10 + rnd() * 34), cy: (rnd() - .5) * 80, r: 22, fill: i % 2 ? "#ef476f" : "#4cc9f0", stroke: INK, "stroke-width": 3}, g); return g; };
  s.h1 = half(-1); s.h2 = half(1); s.n = el("circle", {r: 14, fill: "#adb5bd", stroke: INK, "stroke-width": 3}, s.stage);
  s.heat = el("circle", {r: 10, fill: "#ffbe0b", filter: "url(#blur)", opacity: 0}, s.at);
  s.l1 = chip(s.stage, "atoms split → lots of HEAT", "#f77f00", {fs: 36}); s.l2 = chip(s.stage, "no carbon dioxide while it runs", "#2a9d8f", {fs: 32});
  s.smr = el("g", {}, s.stage); el("rect", {x: -90, y: -120, width: 180, height: 200, rx: 16, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.smr);
  el("path", {d: "M-90 -120 Q0 -200 90 -120", fill: "#ced4da", stroke: INK, "stroke-width": 6}, s.smr); tx(s.smr, {x: 0, y: 130, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, "small modular reactor");
  s.st = chip(s.stage, "🔍 being studied: no decision yet", "#7209b7", {fs: 34}); s.sf = chip(s.stage, "🛡️ safety first on a small, crowded island", "#e63946", {fs: 32});
  s.run = t => { const a = (w, f) => cue("nuclear", w, f), ts = a("split", .15);
    const nx = lerp(-200, 380, ramp(t, ts - 1.2, ts)); tf(s.n, `translate(${nx} 330)`); op(s.n, t < ts + .1 ? ramp(t, ts - 1.4, ts - 1.1) : 0);
    tf(s.at, "translate(400 330)"); const sp = ramp(t, ts, ts + .6); tf(s.h1, `translate(${-140 * sp} ${-30 * sp})`); tf(s.h2, `translate(${140 * sp} ${30 * sp})`);
    tf(s.atIn, "scale(1.7)"); op(s.heat, .55 * sp * (.7 + .3 * Math.sin(t * 6))); set(s.heat, "r", 40 + 80 * sp);
    popAt(s.l1, 400, 560, t, ts + .3); popAt(s.l2, 400, 640, t, a("carbon", .4));
    popAt(s.smr, 950, 380, t, a("modular", .55)); popAt(s.st, 600, 790, t, a("studying", .55)); popAt(s.sf, 600, 860, t, a("safe", .9));
    if (t > a("safe", .9)) op(s.st, 0); }; return s; })();

// ---- TRY THIS: energy detective
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff");
  s.mag = emo(s.stage, 0, 0, 160, "🔍");
  const fan = p => { const g = el("g", {}, p); el("line", {x1: 0, y1: 0, x2: 0, y2: 130, stroke: INK, "stroke-width": 12}, g); el("ellipse", {cx: 0, cy: 135, rx: 70, ry: 16, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, g);
    el("circle", {r: 90, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, g); g.bl = el("g", {}, g); for (let i = 0; i < 3; i++) el("ellipse", {cx: 0, cy: -45, rx: 22, ry: 45, fill: "#4cc9f0", stroke: INK, "stroke-width": 3, transform: `rotate(${i * 120})`}, g.bl); return g; };
  const T = [["fan", "electrical → kinetic + sound", "#3a86ff"], ["lamp", "electrical → light + heat", "#ffbe0b"], ["kettle", "electrical → heat", "#e63946"]];
  s.items = T.map(([w, lab, col], i) => { const g = el("g", {}, s.stage), x = 220 + i * 380;
    if (w === "fan") g.f = fan(g); else emo(g, 0, 0, 170, w === "lamp" ? "💡" : "🫖");
    const c = chip(g, lab, col, {fs: 24}); tf(c, `translate(0 ${i % 2 ? 290 : 220})`); op(c, 1); g.w = w; g.x = x; return g; });
  s.five = chip(s.stage, "Find 5 at home! Write the energy changes ✏️", "#7209b7", {fs: 38});
  s.run = t => { const a = (w, f) => cue("try", w, f);
    s.items.forEach((g, i) => { popAt(g, g.x, 380, t, a(g.w, .4 + i * .1)); if (g.f) tf(g.f.bl, `rotate(${t * 500})`); });
    const ti = Math.min(2, Math.max(0, s.items.findIndex(g => t < a(g.w, .4)) - 1)); const k = ramp(t, SC.try.t0, SC.try.t1);
    tf(s.mag, `translate(${lerp(150, 1000, k)} ${200 + Math.sin(t * 2) * 30})`);
    popAt(s.five, 600, 820, t, a("five", .3)); }; return s; })();

// ---- THINK ABOUT IT: rooftops of solar? (episode) · which would you choose? (Short 2) · is gas secretly solar? (Short 1)
S.think = (() => { const s = scene("think", "#3a0ca3", "#7209b7");
  s.title = tx(s.stage, {x: 600, y: 90, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 10}, "🤔 Think about it!");
  s.roofs = el("g", {}, s.stage); s.roofList = [[60, 330, "#f4a261"], [290, 260, "#e76f51"], [520, 380, "#2a9d8f"], [750, 300, "#e9c46a"], [980, 240, "#f4a261"]].map(([x, h, c]) => hdb(s.roofs, x, 760, 170, h, c).roof);
  s.pick = el("g", {}, s.stage); [["☀️", "more solar"], ["🔌", "from neighbours"], ["⚛️", "nuclear"]].forEach(([e, l], i) => { const g = el("g", {transform: `translate(${250 + i * 350} 470)`}, s.pick);
    el("circle", {r: 120, fill: "#fff", stroke: INK, "stroke-width": 7}, g); emo(g, 0, -5, 120, e); tx(g, {x: 0, y: 180, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, l); });
  s.eq = tx(s.stage, {x: 600, y: 520, "text-anchor": "middle", "font-size": 120, class: "emo"}, "🔥 = ☀️ ?");
  s.q = emo(s.stage, 600, 300, 150, "❓");
  s.ans = chip(s.stage, has("think", "next") ? "Answer next week!" : "▶ Full episode: TheOneApp, Explored", "#f72585", {fs: 44});
  s.run = t => { const a = (w, f) => cue("think", w, f), mode = has("think", "rooftop") ? 0 : has("think", "choose") ? 1 : 2;
    popAt(s.title, 0, 0, t, SC.think.t0 - .2);
    op(s.roofs, mode === 0 ? ramp(t, a("rooftop", .2), a("rooftop", .2) + .4) : 0); s.roofList.forEach(r => op(r, mode === 0 ? ramp(t, a("panels", .35), a("panels", .35) + .5) : 0));
    op(s.pick, mode === 1 ? ramp(t, a("choose", .2), a("choose", .2) + .4) : 0); op(s.eq, mode === 2 ? ramp(t, SC.think.t0, SC.think.t0 + .4) : 0);
    tf(s.q, `translate(600 300) scale(${(mode === 0 ? Math.max(0, pop(t, a("why", .55))) : 0) * (1 + .08 * Math.sin(t * 5))}) translate(-600 -300)`);
    popAt(s.ans, 600, 840, t, has("think", "next") ? a("next", .9) : a("watch", .6)); }; return s; })();

// ---- CLOSE: what to remember, then next week's teaser
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const rows = [["🔥", "Most of our electricity: burning natural gas", "natural", .15, "#3a86ff"], ["🚢", "We bring the gas in from other countries", "bring", .3, "#2a9d8f"], ["💡", "So we save energy", "save", .55, "#f77f00"], ["☀️", "Next: the Sun, neighbours, maybe nuclear", "sun", .7, "#7209b7"]];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 42}), w, f, y: 150 + i * 160}));
  s.tease = chip(s.stage, "🦟 Next week: the mosquitoes that fight dengue!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 820, t, tn); }; return s; })();
