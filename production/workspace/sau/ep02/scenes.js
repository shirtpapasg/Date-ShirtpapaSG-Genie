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

// ---- THE GAS JOURNEY (hero sequence). Picture-only shots first (sound effects, no voice), then Heart explains in step with
// recap boards and the labelled power station. Rules 9 and 10: true to the science, one kind of label per row.
const FR = name => { const c = SC[name]; return c ? (tt => clamp((tt - c.t0) / Math.max(.1, c.t1 - c.t0))) : (() => 0); };
function meGas(p) { const g = el("g", {}, p); el("circle", {r: 46, fill: "#4cc9f0", opacity: .45, filter: "url(#blur)"}, g);
  el("circle", {r: 24, fill: "#4cc9f0", stroke: INK, "stroke-width": 4}, g);
  [-8, 8].forEach(x => { el("circle", {cx: x, cy: -4, r: 5, fill: "#fff"}, g); el("circle", {cx: x + 1, cy: -3, r: 2.5, fill: INK}, g); });
  el("path", {d: "M-7 7 Q0 13 7 7", fill: "none", stroke: INK, "stroke-width": 2.5, "stroke-linecap": "round"}, g); return g; }
function seabedArt(p) { const g = el("g", {}, p);
  el("rect", {x: -700, y: -600, width: 2700, height: 710, fill: "#bde0fe"}, g); el("rect", {x: -700, y: 110, width: 2700, height: 250, fill: "#0096c7"}, g);
  for (let k = 0; k < 14; k++) el("path", {d: `M${-600 + k * 190} ${170 + (k % 3) * 60} q25 -14 50 0 t50 0`, fill: "none", stroke: "#fff", "stroke-width": 4, opacity: .4}, g);
  el("rect", {x: -700, y: 360, width: 2700, height: 40, fill: "#e9c46a"}, g);
  el("rect", {x: -700, y: 400, width: 2700, height: 120, fill: "#6c757d"}, g);
  for (let k = 0; k < 15; k++) el("path", {d: `M${-600 + k * 180} ${430 + (k % 2) * 40} h120`, stroke: "#495057", "stroke-width": 5}, g);
  el("rect", {x: -700, y: 520, width: 2700, height: 180, fill: "#dda15e"}, g);
  seed = 91; for (let k = 0; k < 110; k++) { const x = -600 + rnd() * 2500, y = 535 + rnd() * 150; el("circle", {cx: x, cy: y, r: 9 + rnd() * 6, fill: "#fefae0", opacity: .9}, g); el("circle", {cx: x, cy: y, r: 4, fill: "#4cc9f0"}, g); }
  el("rect", {x: -700, y: 700, width: 2700, height: 900, fill: "#7f5539"}, g);
  tx(g, {x: 1150, y: 465, "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#fff", opacity: .85}, "rock that seals the gas in");
  tx(g, {x: 1150, y: 690, "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: INK, opacity: .85}, "rock with tiny gaps, full of natural gas");
  tx(g, {x: 1150, y: 150, "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#fff", opacity: .85}, "the sea");
  return g; }
function platform(p) { const g = el("g", {}, p);
  [480, 720].forEach(x => el("rect", {x: x - 9, y: 90, width: 18, height: 275, fill: "#adb5bd", stroke: INK, "stroke-width": 4}, g));
  el("rect", {x: 440, y: 50, width: 320, height: 46, rx: 6, fill: "#f4a261", stroke: INK, "stroke-width": 5}, g);
  el("rect", {x: 660, y: -40, width: 16, height: 90, fill: "#6c757d", stroke: INK, "stroke-width": 3}, g); emo(g, 668, -55, 40, "🔥");
  tx(g, {x: 600, y: 30, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, "gas platform"); return g; }

S.seabed = (() => { const s = scene("seabed", "#023047", "#023047"); s.cam = el("g", {}, s.stage); const c = s.cam, D = $("v").querySelector("defs");
  // outside shot 1: the sea near the Natuna Islands, the rock layers, the gas trapped in rock. It ends by diving INTO the gas: from then on we see through its eyes.
  const lg = el("linearGradient", {id: "seaG", x1: 0, y1: 0, x2: 0, y2: 1}, D); el("stop", {offset: 0, "stop-color": "#48cae4"}, lg); el("stop", {offset: 1, "stop-color": "#0077b6"}, lg);
  el("rect", {x: -2500, y: -1800, width: 6200, height: 1910, fill: "#bde0fe"}, c);
  el("path", {d: "M-120 112 Q-60 52 10 78 Q70 30 150 70 Q200 60 250 112 Z", fill: "#52b788", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, c);
  tx(c, {x: 65, y: 12, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, "Natuna Islands");
  el("rect", {x: -2500, y: 110, width: 6200, height: 250, fill: "url(#seaG)"}, c);
  for (let k = 0; k < 22; k++) el("path", {d: `M${-1400 + k * 190} ${160 + (k % 3) * 62} q25 -14 50 0 t50 0`, fill: "none", stroke: "#fff", "stroke-width": 4, opacity: .4}, c);
  el("rect", {x: -2500, y: 360, width: 6200, height: 40, fill: "#e9c46a"}, c);
  el("rect", {x: -2500, y: 400, width: 6200, height: 120, fill: "#6c757d"}, c);
  for (let k = 0; k < 26; k++) el("path", {d: `M${-1500 + k * 180} ${430 + (k % 2) * 40} h120`, stroke: "#495057", "stroke-width": 5}, c);
  el("rect", {x: -2500, y: 520, width: 6200, height: 180, fill: "#dda15e"}, c);
  seed = 91; for (let k = 0; k < 230; k++) { const x = -1500 + rnd() * 4200, y = 538 + rnd() * 146; if (Math.abs(x - 600) < 60 && Math.abs(y - 610) < 50) continue;
    el("circle", {cx: x, cy: y, r: 9 + rnd() * 6, fill: "#fefae0", opacity: .9}, c); el("circle", {cx: x, cy: y, r: 4, fill: "#4cc9f0"}, c); }
  el("rect", {x: -2500, y: 700, width: 6200, height: 2400, fill: "#7f5539"}, c);
  const pf = el("g", {transform: "translate(330 0)"}, c); el("rect", {x: 588, y: 96, width: 24, height: 480, fill: "#495057", stroke: INK, "stroke-width": 3}, pf); platform(pf);
  tx(c, {x: 330, y: 335, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff"}, "the sea");
  tx(c, {x: 560, y: 472, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, "rock that seals the gas in");
  s.gl = tx(c, {x: 590, y: 690, "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: INK}, "rock with tiny gaps, full of natural gas");
  el("circle", {cx: 600, cy: 610, r: 34, fill: "#fefae0"}, c); s.me = meGas(c);
  s.you = el("g", {}, c); el("path", {d: "M-150 -26 H-46 V-44 L0 0 L-46 44 V26 H-150 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round"}, s.you);
  tx(s.you, {x: -98, y: 13, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, "YOU");
  s.flood = el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: "#4cc9f0", opacity: 0}, s.stage);
  s.title = tx(s.stage, {x: VP[0], y: 52, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "You are a tiny bit of natural gas…");
  s.run = t => { const f = FR("seabed")(t), k = ease((f - .12) / .5), d = Math.pow(clamp((f - .72) / .2), 3);
    const z = lerp(1, 2.15, k) * (1 + 34 * d), cx = lerp(700, 600, k), cy = lerp(350, 590, k) + 16 * clamp(d * 4);
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-cx} ${-cy})`);
    tf(s.me, "translate(600 610)"); op(s.me.firstChild, .45 * (1 - clamp(d * 30)));
    tf(s.you, `translate(562 610) scale(${.62 * Math.max(0, pop(t, SC.seabed.t0 + .34 * (SC.seabed.t1 - SC.seabed.t0)))})`); op(s.you, 1 - ramp(f, .68, .74));
    op(s.gl, 1 - ramp(f, .7, .76)); op(s.flood, ramp(f, .86, .93));
    op(s.title, on(t, SC.seabed.t0 + .2, SC.seabed.t0 + .74 * (SC.seabed.t1 - SC.seabed.t0), .4)); }; return s; })();

S.well = (() => { const s = scene("well", "#023047", "#023047"); s.cam = el("g", {}, s.stage); seabedArt(s.cam); platform(s.cam);
  s.pipe = el("rect", {x: 588, y: 96, width: 24, height: 0, fill: "#495057", stroke: INK, "stroke-width": 3}, s.cam);
  s.streak = el("rect", {x: 594, width: 12, fill: "#4cc9f0", opacity: 0}, s.cam); s.me = meGas(s.cam);
  s.run = t => { const f = FR("well")(t), dl = ease(f / .35), up = ease((f - .4) / .45);
    set(s.pipe, "height", 514 * dl); const y = lerp(610, 74, up); tf(s.me, `translate(600 ${y})`);
    set(s.streak, "y", y + 20); set(s.streak, "height", up > 0 && up < 1 ? 140 : 0); op(s.streak, .6 * (up > 0 && up < 1 ? 1 : 0));
    const camY = lerp(610, 230, ease((f - .3) / .6)); tf(s.cam, `translate(600 450) scale(1.25) translate(-600 ${-camY})`); }; return s; })();

S.clean = (() => { const s = scene("clean", "#e9f5ff", "#cfe8fb");
  el("rect", {x: 0, y: 380, width: 300, height: 44, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.stage);
  el("rect", {x: 900, y: 380, width: 300, height: 44, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.stage);
  el("rect", {x: 520, y: 140, width: 40, height: 200, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.stage);
  el("rect", {x: 700, y: 640, width: 40, height: 180, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.stage);
  el("rect", {x: 300, y: 300, width: 600, height: 340, rx: 150, fill: "#f8f9fa", stroke: INK, "stroke-width": 8}, s.stage);
  s.water = el("rect", {x: 330, width: 540, fill: "#48cae4", opacity: .8}, s.stage); s.sand = el("rect", {x: 380, width: 300, rx: 10, fill: "#bc6c25"}, s.stage);
  const lab = (x, y, t) => tx(s.stage, {x, y, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: INK}, t);
  s.L = [lab(540, 120, "other gases out"), lab(720, 860, "water and sand out"), lab(1050, 360, "clean gas"), lab(150, 360, "gas from the well")];
  seed = 93; s.mix = []; for (let k = 0; k < 24; k++) { const kind = k % 4; s.mix.push({kind, u: rnd(), v: rnd(), e: kind === 0 ? el("circle", {r: 10, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, s.stage)
    : kind === 1 ? el("path", {d: "M0 -12 Q9 0 0 9 Q-9 0 0 -12 Z", fill: "#0077b6"}, s.stage) : kind === 2 ? el("circle", {r: 6, fill: "#7f5539"}, s.stage) : el("circle", {r: 9, fill: "#adb5bd", stroke: INK, "stroke-width": 2}, s.stage)}); }
  s.me = meGas(s.stage);
  s.run = t => { const f = FR("clean")(t); const sep = ease((f - .25) / .45);
    set(s.water, "y", 610 - 90 * sep); set(s.water, "height", 90 * sep + 1); set(s.sand, "y", 604 - 18 * sep); set(s.sand, "height", 18 * sep + 1);
    s.L.forEach((l, k) => op(l, ramp(f, .3 + k * .1, .45 + k * .1) * (k === 3 ? 0 : 1) + (k === 3 ? on(f, 0, .3, .1) : 0)));
    s.mix.forEach(m => { const k = (m.u + f * 1.6) % 1; let x = lerp(-20, 600, Math.min(1, k * 1.6)), y = 402 + (m.v - .5) * 30;
      if (k > .62) { const q = (k - .62) / .38; if (m.kind === 0) { x = lerp(600, 1220, q); } else if (m.kind === 3) { x = 540; y = lerp(380, 120, q); } else { x = 500 + m.v * 300; y = lerp(420, 600 - (m.kind === 2 ? 0 : 20), q); } }
      tf(m.e, `translate(${x} ${y})`); op(m.e, ramp(f, 0, .1)); });
    const mx = lerp(-20, 1240, ease((f - .1) / .85)); tf(s.me, `translate(${mx} 402)`); }; return s; })();

S.route = (() => { const s = scene("route", "#023e8a", "#0077b6"); s.cam = el("g", {}, s.stage); s.map = regionMap(s.cam);
  // outside shot 2, on the real map: the pipe on the seabed from the West Natuna gas fields to Singapore (about 650 km). The map fills the screen.
  const [a, b, c] = GEO.pipes.na; el("path", {d: pipeD("na"), fill: "none", stroke: INK, "stroke-width": 13, "stroke-linecap": "round"}, s.cam);
  el("path", {d: pipeD("na"), fill: "none", stroke: "#ffd166", "stroke-width": 7, "stroke-linecap": "round"}, s.cam);
  s.done = el("path", {fill: "none", stroke: "#4cc9f0", "stroke-width": 7, "stroke-linecap": "round"}, s.cam);
  op(gasSources(s.cam)[1], 1); s.me = meGas(s.cam);
  s.km = tx(s.stage, {x: VP[0], y: 96, "text-anchor": "middle", "font-size": 96, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 18}, "0 km");
  s.card = chip(s.stage, "Along a pipe on the seabed, all the way to Singapore", "#1b1b3a", {fs: 50});
  s.run = t => { const f = FR("route")(t), q = ease((f - .14) / .68), B = (k, u) => (1 - u) * (1 - u) * a[k] + 2 * (1 - u) * u * b[k] + u * u * c[k];
    const x = B(0, q), y = B(1, q), m = [lerp(a[0], b[0], q), lerp(a[1], b[1], q)];
    set(s.done, "d", `M${a[0]} ${a[1]} Q${m[0]} ${m[1]} ${x} ${y}`); op(s.done, q > .002 ? 1 : 0);
    const z = lerp(1.75, 2.8, ease(f / .8)) * (1 + .9 * Math.pow(clamp((f - .9) / .1), 2)), k = ease((f - .05) / .5), hw = 960 / z, hh = 540 / z;
    const cx = clamp(lerp(650, x + lerp(30, 130, ease((f - .4) / .4)) * (1 - clamp((f - .9) / .1)), k), hw + 4, 1196 - hw), cy = clamp(lerp(350, y - 6 - 66 * ease((f - .4) / .5), k), hh + 4, 896 - hh);
    tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-cx} ${-cy})`);
    tf(s.me, `translate(${x} ${y}) scale(${1.9 / z})`);
    const ar = clamp((f - .84) / .13); set(s.map.sgRing, "r", 16 + 46 * ar); op(s.map.sgRing, ar > 0 ? 1 - ar : 0);
    s.km.textContent = Math.round(650 * q) + " km"; op(s.km, ramp(f, .04, .1));
    tf(s.card, `translate(${VP[0]} 884) scale(${Math.max(0, pop(t, SC.route.t0 + .3))})`); op(s.card, ramp(t, SC.route.t0 + .3, SC.route.t0 + .5)); }; return s; })();

// The power station, drawn once and used twice: "station" (picture-only, paced by the shot) and "convert" (labelled, paced by Heart's words)
function makeStation(name, labelled) { const s = scene(name, "#e9f5ff", "#cfe8fb"); const st = s.stage, Y = 470;
  if (labelled) s.p6 = chip(st, "P6: energy changes from one form to another", "#7209b7", {fs: 34});
  s.pipe = el("g", {}, st); el("rect", {x: -20, y: Y - 26, width: 240, height: 52, rx: 10, fill: "#adb5bd", stroke: INK, "stroke-width": 6}, s.pipe);
  s.gas = []; for (let k = 0; k < 9; k++) s.gas.push(el("circle", {r: 9, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, s.pipe));
  s.ch = el("g", {}, st); el("rect", {x: 210, y: Y - 95, width: 160, height: 190, rx: 18, fill: "#495057", stroke: INK, "stroke-width": 7}, s.ch);
  el("rect", {x: 228, y: Y - 77, width: 124, height: 154, rx: 12, fill: "#1b1b3a"}, s.ch);
  s.flame = el("g", {transform: `translate(290 ${Y + 55})`}, s.ch);
  el("path", {d: "M0 0 C-48 -20 -40 -80 -6 -120 C-10 -80 18 -70 12 -100 C44 -60 44 -18 0 0 Z", fill: "#f77f00"}, s.flame);
  el("path", {d: "M0 0 C-24 -12 -20 -50 -2 -70 C2 -48 20 -40 14 -56 C26 -34 22 -10 0 0 Z", fill: "#4cc9f0"}, s.flame);
  s.duct = el("g", {}, st); el("rect", {x: 366, y: Y - 34, width: 80, height: 68, fill: "#6c757d", stroke: INK, "stroke-width": 6}, s.duct);
  s.hot = []; for (let k = 0; k < 10; k++) s.hot.push(el("circle", {r: 8, fill: "#ff7b00"}, s.duct));
  s.tb = el("g", {transform: `translate(530 ${Y})`}, st); el("circle", {r: 92, fill: "#e9ecef", stroke: INK, "stroke-width": 7}, s.tb);
  s.bl = el("g", {}, s.tb); for (let k = 0; k < 8; k++) el("path", {d: "M10 -8 L80 -22 Q86 0 80 22 L10 8 Z", fill: "#457b9d", stroke: INK, "stroke-width": 3, transform: `rotate(${k * 45})`}, s.bl);
  el("circle", {r: 16, fill: INK}, s.tb);
  s.shaft = el("g", {}, st); el("rect", {x: 620, y: Y - 12, width: 110, height: 24, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, s.shaft);
  s.stripes = []; for (let k = 0; k < 5; k++) s.stripes.push(el("rect", {y: Y - 12, width: 8, height: 24, fill: INK, opacity: .45}, s.shaft));
  s.gen = el("g", {}, st); el("rect", {x: 728, y: Y - 110, width: 200, height: 220, rx: 18, fill: "#f8f9fa", stroke: INK, "stroke-width": 7}, s.gen);
  for (let k = 0; k < 7; k++) { el("path", {d: `M${748 + k * 26} ${Y - 92} h16`, stroke: "#b5651d", "stroke-width": 12, "stroke-linecap": "round"}, s.gen);
    el("path", {d: `M${748 + k * 26} ${Y + 92} h16`, stroke: "#b5651d", "stroke-width": 12, "stroke-linecap": "round"}, s.gen); }
  s.mag = el("g", {transform: `translate(828 ${Y})`}, s.gen); el("rect", {x: -70, y: -18, width: 70, height: 36, fill: "#e63946", stroke: INK, "stroke-width": 4}, s.mag);
  el("rect", {x: 0, y: -18, width: 70, height: 36, fill: "#3a86ff", stroke: INK, "stroke-width": 4}, s.mag);
  tx(s.mag, {x: -35, y: 10, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "N"); tx(s.mag, {x: 35, y: 10, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: "#fff"}, "S");
  s.wire = el("g", {}, st); const wd = `M928 ${Y - 40} H1010 V250 H1050`, wd2 = `M928 ${Y + 40} H1040 V290 H1050`;
  el("path", {d: wd, fill: "none", stroke: INK, "stroke-width": 9}, s.wire); el("path", {d: wd2, fill: "none", stroke: INK, "stroke-width": 9}, s.wire);
  s.cur = el("path", {d: wd, fill: "none", stroke: "#ffd166", "stroke-width": 5, "stroke-dasharray": "10 16"}, s.wire);
  s.cur2 = el("path", {d: wd2, fill: "none", stroke: "#ffd166", "stroke-width": 5, "stroke-dasharray": "10 16"}, s.wire);
  s.flat = el("g", {}, st); el("rect", {x: 1050, y: 130, width: 140, height: 300, rx: 6, fill: "#f4a261", stroke: INK, "stroke-width": 6}, s.flat);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) el("rect", {x: 1068 + c * 62, y: 150 + r * 66, width: 42, height: 44, rx: 4, fill: "#fdf0d5"}, s.flat);
  s.glow = el("circle", {cx: 1151, cy: 238, r: 60, fill: "#ffe066", filter: "url(#blur)", opacity: 0}, s.flat);
  s.win = el("rect", {x: 1130, y: 216, width: 42, height: 44, rx: 4, fill: "#fdf0d5", stroke: INK, "stroke-width": 3}, s.flat);
  s.lamp = emo(s.flat, 1151, 236, 34, "💡");
  if (!labelled) s.me = meGas(st);
  const L = [["Natural gas", 90, "chemical potential energy", "#f77f00", "chemical", .15], ["Burning", 300, "heat energy", "#e63946", "heat", .3],
             ["Turbine", 530, "kinetic energy", "#457b9d", "turbine", .55], ["Generator", 828, "electrical energy", "#e0a800", "generator", .7],
             ["Lamp", 1135, "light energy", "#06d6a0", "electrical", .85]];
  s.labs = labelled ? L.map(([nm, x, energy, col, w, f], i) => { const g = el("g", {}, st);
    tx(g, {x, y: i === 4 ? 105 : Y - 130, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: INK}, nm);
    const by = i === 4 ? 478 : Y + 150, lab = el("g", {transform: `translate(${x} ${by})`}, g); el("rect", {x: -88, y: -32, width: 176, height: 64, rx: 18, fill: col, stroke: INK, "stroke-width": 4}, lab);
    const wds = energy.split(" "), lines = energy.length > 12 ? [wds.slice(0, -1).join(" "), wds[wds.length - 1]] : [energy];
    lines.forEach((ln, k) => tx(lab, {x: 0, y: lines.length > 1 ? -5 + k * 26 : 9, "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: "#fff", "data-fit": 156}, ln));
    g.w = w; g.f = f; return g; }) : [];
  s.run = t => { let T;
    if (labelled) { T = L.map(([, , , , w, f]) => cue(name, w, f)); T[4] += .9; popAt(s.p6, 600, 70, t, SC[name].t0 - .1); }
    else { const c = SC[name], d = c.t1 - c.t0; T = [.05, .22, .42, .6, .8].map(k => c.t0 + k * d); }
    const on1 = k => ramp(t, T[k] - .3, T[k] + .2);
    [s.pipe, s.ch, s.duct, s.tb, s.gen].forEach((g, k) => op(g, .25 + .75 * on1([0, 1, 2, 2, 3][k])));
    op(s.shaft, .25 + .75 * on1(2)); op(s.wire, .25 + .75 * on1(3)); op(s.flat, .25 + .75 * on1(4)); s.labs.forEach((g, k) => op(g, on1(k)));
    s.gas.forEach((d, k) => { const u = ((t * .5 + k / 9) % 1); set(d, "cx", -10 + u * 220); set(d, "cy", Y + Math.sin(k * 2.1) * 10); op(d, on1(0)); });
    if (s.me) { const u = ramp(t, T[0] - .3, T[1]); tf(s.me, `translate(${lerp(-10, 290, u)} ${Y}) scale(${1 - .8 * ramp(t, T[1] - .2, T[1] + .3)})`); op(s.me, 1 - ramp(t, T[1], T[1] + .3)); }
    const fl = on1(1); tf(s.flame, `translate(290 ${Y + 55}) scale(${(.2 + .8 * fl) * (1 + .06 * Math.sin(t * 13))} ${(.2 + .8 * fl) * (1 + .1 * Math.sin(t * 17))})`);
    s.hot.forEach((d, k) => { const u = ((t * 1.2 + k / 10) % 1); set(d, "cx", 366 + u * 120); set(d, "cy", Y - 24 + (k % 3) * 24); op(d, on1(2) * (1 - u * .3)); });
    const spin = 40 + 520 * on1(2); const dt = s.lt !== undefined ? Math.max(0, Math.min(.1, t - s.lt)) : 0; s.lt = t; s.ang = (s.ang || 0) + spin * dt;
    tf(s.bl, `rotate(${s.ang})`); tf(s.mag, `translate(828 ${Y}) rotate(${s.ang})`); s.stripes.forEach((r, k) => set(r, "x", 624 + ((k * 22 + s.ang * .3) % 104)));
    const cur = on1(3); set(s.cur, "stroke-dashoffset", -t * 90); set(s.cur2, "stroke-dashoffset", t * 90); op(s.cur, cur); op(s.cur2, cur);
    const lit = on1(4); op(s.glow, .9 * lit); set(s.win, "fill", lit > .5 ? "#ffe066" : "#fdf0d5"); op(s.lamp, .3 + .7 * lit); }; return s; }
S.station = makeStation("station", false);
S.convert = makeStation("convert", true);

S.chimney = (() => { const s = scene("chimney", "#cfe8fb", "#a2d2ff"); s.cam = el("g", {}, s.stage); const c = s.cam;
  // outside shot 3: the burnt gases (carbon dioxide and water vapour) leave by the chimney; the ENERGY goes on as electricity, along a cable under the ground.
  el("rect", {x: -2500, y: -2500, width: 6500, height: 3140, fill: "#cfe8fb"}, c);
  el("g", {transform: "translate(700 642) scale(1.05)", opacity: .8}, c).appendChild(skyline(c, 0, 0, "#a9c9e8"));
  el("rect", {x: -2500, y: 640, width: 6500, height: 3000, fill: "#9c6644"}, c); el("rect", {x: -2500, y: 626, width: 6500, height: 30, fill: "#52b788", stroke: INK, "stroke-width": 4}, c);
  el("rect", {x: 330, y: 130, width: 92, height: 280, fill: "#f8f9fa", stroke: INK, "stroke-width": 6}, c);
  [130, 222, 314].forEach(y => el("rect", {x: 330, y, width: 92, height: 46, fill: "#e63946", stroke: INK, "stroke-width": 6}, c));
  el("rect", {x: 520, y: 500, width: 210, height: 130, fill: "#dee2e6", stroke: INK, "stroke-width": 7}, c);
  el("rect", {x: 60, y: 400, width: 470, height: 230, rx: 8, fill: "#f1f3f5", stroke: INK, "stroke-width": 7}, c);
  for (let k = 0; k < 5; k++) el("rect", {x: 96 + k * 84, y: 520, width: 54, height: 70, rx: 5, fill: "#ffd166", stroke: INK, "stroke-width": 4}, c);
  tx(c, {x: 295, y: 476, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, "power station");
  const cd = "M730 590 H800 V730 H2600"; el("path", {d: cd, fill: "none", stroke: INK, "stroke-width": 22, "stroke-linejoin": "round"}, c);
  el("path", {d: cd, fill: "none", stroke: "#6c757d", "stroke-width": 12, "stroke-linejoin": "round"}, c);
  s.cur = el("path", {d: cd, fill: "none", stroke: "#ffe14d", "stroke-width": 10, "stroke-linejoin": "round", "stroke-dasharray": "34 46"}, c);
  s.el = tx(c, {x: 1180, y: 700, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 9}, "electricity ⚡");
  const mol = (p, atoms) => { const g = el("g", {}, p); atoms.forEach(([x, y, r, col, l]) => { el("circle", {cx: x, cy: y, r, fill: col, stroke: INK, "stroke-width": 3}, g); tx(g, {x, y: y + r * .34, "text-anchor": "middle", "font-size": r, "font-weight": 700, fill: col === "#fff" ? INK : "#fff"}, l); }); return g; };
  const CO2 = [[-34, 0, 20, "#e63946", "O"], [0, 0, 22, "#212529", "C"], [34, 0, 20, "#e63946", "O"]], H2O = [[0, 0, 22, "#e63946", "O"], [-26, 18, 15, "#fff", "H"], [26, 18, 15, "#fff", "H"]];
  seed = 57; s.m = []; for (let k = 0; k < 8; k++) s.m.push({e: mol(c, k % 3 === 1 ? CO2 : H2O), u: k / 8, w: rnd() - .5, v: rnd()});
  const leg = el("g", {}, c); tf(mol(leg, CO2), "translate(1010 300) scale(1.25)"); tf(mol(leg, H2O), "translate(1010 392) scale(1.25)");
  tx(leg, {x: 1100, y: 317, "font-size": 50, "font-weight": 700, fill: INK}, "carbon dioxide"); tx(leg, {x: 1100, y: 412, "font-size": 50, "font-weight": 700, fill: INK}, "water vapour"); s.leg = leg;
  s.flood = el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, fill: "#ffe14d", opacity: 0}, s.stage);
  s.card = chip(s.stage, "The gases leave. The energy travels on as electricity!", "#1b1b3a", {fs: 50});
  s.run = t => { const f = FR("chimney")(t), tau = t - SC.chimney.t0;
    s.m.forEach(m => { const p = ((m.u + tau * .16) % 1 + 1) % 1; tf(m.e, `translate(${376 + 1150 * Math.pow(p, 1.25) + m.w * 150 * p} ${118 - 60 * p - 190 * (m.v - .35) * p}) scale(${1 + 1.1 * p})`); op(m.e, clamp(p / .06) * clamp((1 - p) / .15)); });
    op(s.leg, ramp(f, .1, .2)); set(s.cur, "stroke-dashoffset", -tau * 330); op(s.el, ramp(f, .3, .4));
    const d = Math.pow(clamp((f - .7) / .22), 2); tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${1.1 * (1 + 8 * d)}) translate(${-lerp(810, 1180, clamp(d * 5))} ${-lerp(440, 730, clamp(d * 5))})`);
    op(s.flood, ramp(f, .86, .93));
    tf(s.card, `translate(${VP[0]} 884) scale(${Math.max(0, pop(t, SC.chimney.t0 + .2))})`); op(s.card, on(t, SC.chimney.t0 + .2, SC.chimney.t0 + .74 * (SC.chimney.t1 - SC.chimney.t0), .25)); }; return s; })();

S.cables = (() => { const s = scene("cables", "#cfe8fb", "#cfe8fb");
  el("rect", {x: -200, y: 420, width: 1600, height: 500, fill: "#9c6644"}, s.stage); el("rect", {x: -200, y: 400, width: 1600, height: 26, fill: "#52b788"}, s.stage);
  el("rect", {x: 40, y: 260, width: 170, height: 140, fill: "#e9ecef", stroke: INK, "stroke-width": 5}, s.stage); el("rect", {x: 150, y: 170, width: 34, height: 90, fill: "#adb5bd", stroke: INK, "stroke-width": 4}, s.stage);
  tx(s.stage, {x: 125, y: 245, "text-anchor": "middle", "font-size": 24, "font-weight": 700, fill: INK}, "power station");
  el("rect", {x: 520, y: 320, width: 130, height: 80, fill: "#ced4da", stroke: INK, "stroke-width": 5}, s.stage); tx(s.stage, {x: 585, y: 305, "text-anchor": "middle", "font-size": 24, "font-weight": 700, fill: INK}, "substation");
  s.hdb = el("g", {}, s.stage); el("rect", {x: 880, y: 40, width: 230, height: 360, fill: "#f4a261", stroke: INK, "stroke-width": 6}, s.hdb);
  s.wins = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) s.wins.push(el("rect", {x: 896 + c * 54, y: 56 + r * 56, width: 36, height: 38, rx: 3, fill: "#fdf0d5"}, s.hdb));
  tx(s.stage, {x: 995, y: 28, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: INK}, "HDB flats");
  const path = "M125 400 V600 H585 V400 M585 400 V600 H995 V400 V198 H1010";
  el("path", {d: path, fill: "none", stroke: INK, "stroke-width": 12, "stroke-linejoin": "round"}, s.stage);
  s.lab = tx(s.stage, {x: 360, y: 650, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff"}, "cables under the ground");
  s.pulse = el("circle", {r: 22, fill: "#ffd166", filter: "url(#blur)"}, s.stage); s.dot = el("circle", {r: 11, fill: "#ffe066"}, s.stage);
  const P = [[125, 400], [125, 600], [585, 600], [585, 400], [585, 600], [995, 600], [995, 198]]; const segL = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1])); const TL0 = segL.reduce((a, b) => a + b);
  const at = u => { let d = u * TL0; for (let i = 0; i < segL.length; i++) { if (d <= segL[i]) { const k = d / segL[i]; return [lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k)]; } d -= segL[i]; } return P[P.length - 1]; };
  s.unit = 9;   // the flat that lights: 3rd floor from the top, 2nd from the left
  s.run = t => { const f = FR("cables")(t), q = ease((f - .05) / .75); const [x, y] = at(q); [s.pulse, s.dot].forEach(p => { set(p, "cx", x); set(p, "cy", y); });
    set(s.wins[s.unit], "fill", f > .82 ? "#ffe066" : "#fdf0d5"); op(s.lab, ramp(f, .15, .3)); }; return s; })();

// Top-down: the camera looks down from the ceiling. The desk lamp clicks on over a pupil's book.
S.ceiling = (() => { const s = scene("ceiling", "#3d2c1e", "#3d2c1e"); s.cam = el("g", {}, s.stage);
  // last shot, top-down from the ceiling: the electricity arrives along the lamp's cord, and the desk lamp clicks on over a pupil's book.
  el("rect", {x: -2000, y: -2000, width: 5200, height: 4900, fill: "#3d2c1e"}, s.cam);
  el("rect", {x: 60, y: 30, width: 1080, height: 840, fill: "#d4a373", stroke: "#6c584c", "stroke-width": 24}, s.cam);
  for (let k = 0; k < 12; k++) el("line", {x1: 72, y1: 60 + k * 70, x2: 1128, y2: 60 + k * 70, stroke: "#bc8a5f", "stroke-width": 3}, s.cam);
  el("rect", {x: 380, y: 18, width: 300, height: 26, fill: "#a2d2ff", stroke: INK, "stroke-width": 4}, s.cam);
  el("rect", {x: 760, y: 120, width: 330, height: 460, rx: 18, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.cam); el("rect", {x: 790, y: 140, width: 270, height: 90, rx: 20, fill: "#fff", stroke: INK, "stroke-width": 4}, s.cam);
  el("rect", {x: 760, y: 300, width: 330, height: 280, rx: 18, fill: "#8ecae6", stroke: INK, "stroke-width": 6}, s.cam);
  el("rect", {x: 130, y: 520, width: 460, height: 230, rx: 12, fill: "#a5a58d", stroke: INK, "stroke-width": 6}, s.cam);
  el("rect", {x: 52, y: 452, width: 30, height: 50, rx: 5, fill: "#fff", stroke: INK, "stroke-width": 4}, s.cam);
  s.cord = el("path", {d: "M82 477 C190 470 150 600 300 540 S440 500 505 548", fill: "none", stroke: INK, "stroke-width": 7, "stroke-linecap": "round"}, s.cam);
  el("rect", {x: 250, y: 580, width: 180, height: 120, fill: "#fff", stroke: INK, "stroke-width": 4}, s.cam); el("line", {x1: 340, y1: 580, x2: 340, y2: 700, stroke: INK, "stroke-width": 3}, s.cam);
  for (let k = 0; k < 4; k++) { el("line", {x1: 262, y1: 603 + k * 22, x2: 326, y2: 603 + k * 22, stroke: "#adb5bd", "stroke-width": 3}, s.cam); el("line", {x1: 352, y1: 603 + k * 22, x2: 416, y2: 603 + k * 22, stroke: "#adb5bd", "stroke-width": 3}, s.cam); }
  el("rect", {x: 452, y: 640, width: 70, height: 12, rx: 6, fill: "#ffbe0b", stroke: INK, "stroke-width": 3, transform: "rotate(-25 487 646)"}, s.cam);
  s.lampGlow = el("circle", {cx: 430, cy: 625, r: 290, fill: "#ffe066", filter: "url(#blur)", opacity: 0}, s.cam);
  el("ellipse", {cx: 340, cy: 812, rx: 120, ry: 56, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, s.cam); el("circle", {cx: 340, cy: 800, r: 52, fill: "#3d2c1e", stroke: INK, "stroke-width": 4}, s.cam);
  el("ellipse", {cx: 280, cy: 736, rx: 22, ry: 40, fill: "#f1c27d", stroke: INK, "stroke-width": 4}, s.cam); el("ellipse", {cx: 400, cy: 736, rx: 22, ry: 40, fill: "#f1c27d", stroke: INK, "stroke-width": 4}, s.cam);
  s.dark = el("rect", {x: -2000, y: -2000, width: 5200, height: 4900, fill: "#0b1020", opacity: .7}, s.cam);
  s.pulse = el("g", {}, s.cam); el("circle", {r: 26, fill: "#ffe14d", opacity: .5}, s.pulse); el("circle", {r: 12, fill: "#fff8d6"}, s.pulse);
  s.shade = el("circle", {cx: 530, cy: 548, r: 50, fill: "#f4a261", stroke: INK, "stroke-width": 6}, s.cam); s.bulb = el("circle", {cx: 530, cy: 548, r: 22, fill: "#6c584c", stroke: INK, "stroke-width": 4}, s.cam);
  s.rays = el("g", {transform: "translate(530 548)", opacity: 0}, s.cam); for (let k = 0; k < 10; k++) el("path", {d: "M0 -70 V-104", stroke: "#ffe14d", "stroke-width": 9, "stroke-linecap": "round", transform: `rotate(${k * 36})`}, s.rays);
  s.card = chip(s.stage, "…and the lamp in your room lights up!", "#1b1b3a", {fs: 50}); const L = s.cord.getTotalLength();
  s.run = t => { const f = FR("ceiling")(t), CL = .2, lit = ramp(f, CL, CL + .03), c = SC.ceiling;
    op(s.dark, .78 * (1 - lit) + .12 * lit * (1 - ramp(f, .3, .8)) ); op(s.lampGlow, .85 * lit); op(s.rays, lit * (1 - ramp(f, .34, .44))); set(s.bulb, "fill", lit > .5 ? "#fff8d6" : "#6c584c"); set(s.shade, "fill", lit > .5 ? "#ffbe0b" : "#f4a261");
    const pq = clamp((t - (c.t0 - .35)) / (CL * (c.t1 - c.t0) + .35)), P = s.cord.getPointAtLength(L * ease(pq)); tf(s.pulse, `translate(${P.x} ${P.y})`); op(s.pulse, pq < 1 ? 1 : 0);
    const k = ease((f - CL - .04) / .6), z = lerp(2.3, 1.58, k); tf(s.cam, `translate(${VP[0]} ${VP[1]}) scale(${z}) translate(${-lerp(400, 600, k)} ${-lerp(600, 560, k)})`);
    tf(s.card, `translate(${VP[0]} 40) scale(${Math.max(0, pop(t, c.t0 + (CL + .12) * (c.t1 - c.t0)))})`); op(s.card, ramp(f, CL + .12, CL + .18)); }; return s; })();

// Recap boards: the journey in eight steps; each lights up as Heart names it (in step with her words)
function makeRecap(name, from, to, words) { const s = scene(name, "#fff3b0", "#ffd6a5");
  const ST = [["🪨", "rock under the seabed"], ["PLATFORM", "gas platform"], ["TANK", "cleaned"], ["🌊", "650 km pipe"], ["🏭", "power station"], ["💨", "out of the chimney"], ["⚡", "cables under the ground"], ["💡", "the lamp in your room"]];
  s.cards = ST.map(([e, lab], i) => { const g = el("g", {}, s.stage), x = 150 + (i % 4) * 300, y = i < 4 ? 260 : 620;
    el("rect", {x: -120, y: -120, width: 240, height: 240, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    if (e === "PLATFORM") { el("rect", {x: -70, y: 30, width: 140, height: 22, fill: "#0096c7"}, g); [-40, 40].forEach(x => el("rect", {x: x - 5, y: -30, width: 10, height: 70, fill: "#adb5bd", stroke: INK, "stroke-width": 3}, g));
      el("rect", {x: -60, y: -50, width: 120, height: 24, rx: 4, fill: "#f4a261", stroke: INK, "stroke-width": 4}, g); el("rect", {x: 30, y: -86, width: 8, height: 36, fill: "#6c757d"}, g); emo(g, 34, -94, 22, "🔥"); }
    else if (e === "TANK") { el("rect", {x: -70, y: -60, width: 140, height: 90, rx: 45, fill: "#f8f9fa", stroke: INK, "stroke-width": 5}, g); el("rect", {x: -58, y: -4, width: 116, height: 26, fill: "#48cae4"}, g);
      el("rect", {x: -40, y: 14, width: 60, height: 8, fill: "#bc6c25"}, g); el("circle", {cx: 0, cy: -34, r: 8, fill: "#4cc9f0", stroke: INK, "stroke-width": 2}, g); }
    else emo(g, 0, -20, 100, e);
    tx(g, {x: 0, y: 92, "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: INK, "data-fit": 220}, lab);
    tx(g, {x: -96, y: -88, "font-size": 28, "font-weight": 700, fill: "#7209b7"}, String(i + 1)); g.x = x; g.y = y; return g; });
  s.arrows = ST.slice(0, 7).map((_, i) => { const a = el("path", {d: "M-14 -14 L12 0 L-14 14 Z", fill: INK}, s.stage); if (i === 3) tf(a, "translate(1050 440) rotate(90)"); else tf(a, `translate(${150 + (i % 4) * 300 + 150} ${i < 4 ? 260 : 620})`); return a; });
  s.run = t => { s.cards.forEach((g, i) => { const tw = i >= from && i <= to ? cue(name, words[i - from], (i - from + .5) / (to - from + 1)) : null;
      const done = i < from || (tw !== null && t >= tw), now = tw !== null && on(t, tw - .1, tw + 1.6, .2);
      tf(g, `translate(${g.x} ${g.y}) scale(${1 + .12 * now})`); op(g, done ? 1 : .3); }); }; return s; }
S.recap1 = makeRecap("recap1", 0, 3, ["rock", "natuna", "cleaned", "kilometres"]);
S.recap2 = makeRecap("recap2", 4, 7, ["burning", "carbon", "cables", "lamp"]);

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
  s.top = chip(s.stage, "✅ The answer from Part 1", "#06d6a0", {fs: 40});
  s.run = t => { if (has("sun", "question")) { popAt(s.top, 600, 40, t, cue("sun", "question", .05)); op(s.top, on(t, cue("sun", "question", .05), cue("sun", "tiny", .3), .2)); } else op(s.top, 0); const a = (w, f) => cue("sun", w, f), tl = a("tiny", .15), tm = a("millions", .3), tg = has("sun", "sunlight") ? a("sunlight", .62) - .4 : a("gas", .55);
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


// a desk lamp (not a bare bulb) and an electric kettle (not a teapot), drawn in the series style
function deskLamp(p) { const g = el("g", {}, p);
  const glow = el("path", {d: "M58 -8 L92 -36 L175 135 L-5 135 Z", fill: "#ffe066", opacity: .35}, g);
  el("ellipse", {cx: 0, cy: 140, rx: 80, ry: 18, fill: "#495057", stroke: INK, "stroke-width": 5}, g);
  el("path", {d: "M0 135 L-30 30 L40 -60", fill: "none", stroke: INK, "stroke-width": 16, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
  el("path", {d: "M0 135 L-30 30 L40 -60", fill: "none", stroke: "#3a86ff", "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round"}, g);
  el("circle", {cx: -30, cy: 30, r: 9, fill: "#adb5bd", stroke: INK, "stroke-width": 4}, g);
  el("path", {d: "M10 -95 L95 -40 L60 5 Z", fill: "#3a86ff", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g);
  el("circle", {cx: 66, cy: -12, r: 15, fill: "#fff3b0", stroke: INK, "stroke-width": 4}, g);
  return glow; }
function kettle(p) { const g = el("g", {}, p);
  el("rect", {x: -80, y: 105, width: 160, height: 30, rx: 10, fill: "#495057", stroke: INK, "stroke-width": 5}, g);
  el("path", {d: "M80 120 Q120 120 125 150", fill: "none", stroke: INK, "stroke-width": 6}, g);
  el("path", {d: "M-65 105 L-55 -40 Q0 -70 55 -40 L65 105 Z", fill: "#e9ecef", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g);
  el("path", {d: "M-55 -40 L-95 -65 L-62 -10", fill: "#e9ecef", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, g);
  el("path", {d: "M58 -25 Q115 -20 110 40 Q105 80 62 80", fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round"}, g);
  el("rect", {x: -20, y: -62, width: 40, height: 12, rx: 6, fill: "#adb5bd", stroke: INK, "stroke-width": 4}, g);
  el("rect", {x: -48, y: 0, width: 14, height: 70, rx: 7, fill: "#90e0ef", stroke: INK, "stroke-width": 3}, g);
  el("circle", {cx: 40, cy: 85, r: 7, fill: "#e63946"}, g);
  const st = el("g", {}, g); [[-90, -95], [-105, -125], [-85, -150]].forEach(([x, y], i) => el("circle", {cx: x, cy: y, r: 14 - i * 2, fill: "#fff", opacity: .8}, st));
  return st; }
// ---- TRY THIS: energy detective
S.try = (() => { const s = scene("try", "#caffbf", "#9bf6ff");
  s.mag = emo(s.stage, 0, 0, 160, "🔍");
  const fan = p => { const g = el("g", {}, p); el("line", {x1: 0, y1: 0, x2: 0, y2: 130, stroke: INK, "stroke-width": 12}, g); el("ellipse", {cx: 0, cy: 135, rx: 70, ry: 16, fill: "#adb5bd", stroke: INK, "stroke-width": 5}, g);
    el("circle", {r: 90, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, g); g.bl = el("g", {}, g); for (let i = 0; i < 3; i++) el("ellipse", {cx: 0, cy: -45, rx: 22, ry: 45, fill: "#4cc9f0", stroke: INK, "stroke-width": 3, transform: `rotate(${i * 120})`}, g.bl); return g; };
  const T = [["fan", "electrical → kinetic + sound", "#3a86ff"], ["lamp", "electrical → light + heat", "#ffbe0b"], ["kettle", "electrical → heat", "#e63946"]];
  s.items = T.map(([w, lab, col], i) => { const g = el("g", {}, s.stage), x = 220 + i * 380;
    if (w === "fan") g.f = fan(g); else if (w === "lamp") g.lit = deskLamp(g); else g.steam = kettle(g);
    const c = chip(g, lab, col, {fs: 24}); tf(c, `translate(0 ${i % 2 ? 290 : 220})`); op(c, 1); g.w = w; g.x = x; return g; });
  s.five = chip(s.stage, "Find 5 at home! Write the energy changes ✏️", "#7209b7", {fs: 38});
  s.run = t => { const a = (w, f) => cue("try", w, f);
    s.items.forEach((g, i) => { popAt(g, g.x, 380, t, a(g.w, .4 + i * .1)); if (g.f) tf(g.f.bl, `rotate(${t * 500})`);
      if (g.steam) { tf(g.steam, `translate(0 ${-((t * 30) % 30)})`); op(g.steam, .5 + .5 * Math.sin(t * 3)); }
      if (g.lit) op(g.lit, .25 + .15 * Math.sin(t * 2)); });
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
  const AW = has("think", "part") ? "part" : has("think", "next") ? "next" : "watch";
  s.ans = chip(s.stage, AW === "part" ? "Answer in Part 2!" : AW === "next" ? (has("think", "time") ? "Answer next time!" : "Answer next week!") : "▶ Full episode: TheOneApp, Explored", "#f72585", {fs: 44});
  s.run = t => { const a = (w, f) => cue("think", w, f), mode = has("think", "rooftop") ? 0 : has("think", "choose") ? 1 : 2;
    popAt(s.title, 0, 0, t, SC.think.t0 - .2);
    op(s.roofs, mode === 0 ? ramp(t, a("rooftop", .2), a("rooftop", .2) + .4) : 0); s.roofList.forEach(r => op(r, mode === 0 ? ramp(t, a("panels", .35), a("panels", .35) + .5) : 0));
    op(s.pick, mode === 1 ? ramp(t, a("choose", .2), a("choose", .2) + .4) : 0); op(s.eq, mode === 2 ? ramp(t, SC.think.t0, SC.think.t0 + .4) : 0);
    tf(s.q, `translate(600 300) scale(${(mode === 0 ? Math.max(0, pop(t, a("why", .55))) : 0) * (1 + .08 * Math.sin(t * 5))}) translate(-600 -300)`);
    popAt(s.ans, 600, 840, t, a(AW, AW === "watch" ? .6 : .9)); }; return s; })();

// ---- CLOSE: what to remember, then next week's teaser
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  const CL = CFG.close || {}, rows = CL.rows || [["🔥", "Most of our electricity: burning natural gas", "natural", .15, "#3a86ff"], ["🚢", "We bring the gas in from other countries", "bring", .3, "#2a9d8f"], ["💡", "So we save energy", "save", .55, "#f77f00"], ["☀️", "Next: the Sun, neighbours, maybe nuclear", "sun", .7, "#7209b7"]];
  s.rows = rows.map(([e, lab, w, f, col], i) => ({c: chip(s.stage, e + "  " + lab, col, {fs: 42}), w, f, y: 150 + i * (rows.length > 3 ? 160 : 190)}));
  s.tease = chip(s.stage, CL.tease || "🦟 Next week: the mosquitoes that fight dengue!", "#3a0ca3", {fs: 40});
  s.run = t => { const tn = cue("close", CL.teaseWord || "next", .85);
    s.rows.forEach(r => { const tw = cue("close", r.w, r.f); popAt(r.c, 600, r.y, t, tw); op(r.c, ramp(t, tw - .05, tw + .1) * (1 - .6 * ramp(t, tn - .2, tn + .3))); });
    popAt(s.tease, 600, 820, t, tn); }; return s; })();
