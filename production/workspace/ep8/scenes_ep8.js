/* =================== SCENES (Episode 8: is air nothing? the matter test) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
function bottle(p, fill) { const g = el("g", {}, p); const cp = "bt" + Math.floor(rnd() * 1e9);
  const c = el("clipPath", {id: cp}, $("v").querySelector("defs")); el("path", {d: "M-60 -110 H60 V140 Q60 160 40 160 H-40 Q-60 160 -60 140 Z"}, c);
  const w = el("rect", {x: -60, width: 120, fill: "#4cc9f0", "clip-path": `url(#${cp})`}, g); el("rect", {x: -22, y: -160, width: 44, height: 50, rx: 6, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, g);
  el("path", {d: "M-60 -110 H60 V140 Q60 160 40 160 H-40 Q-60 160 -60 140 Z", fill: "#ffffff55", stroke: INK, "stroke-width": 6}, g);
  g.level = k => { set(w, "y", 160 - 270 * k); set(w, "height", 270 * k); }; g.level(fill); return g; }
function balance(p) { const g = el("g", {}, p); el("path", {d: "M-120 330 L120 330 L20 0 L-20 0 Z", fill: "#adb5bd", stroke: INK, "stroke-width": 6}, g);
  const beam = el("rect", {x: -360, y: -12, width: 720, height: 24, rx: 12, fill: "#6c757d", stroke: INK, "stroke-width": 6}, g); el("circle", {r: 22, fill: "#ffd166", stroke: INK, "stroke-width": 6}, g);
  const pans = [-1, 1].map(sd => { const pg = el("g", {}, g); el("line", {x1: -80, y1: 150, x2: 0, y2: 0, stroke: INK, "stroke-width": 4}, pg); el("line", {x1: 80, y1: 150, x2: 0, y2: 0, stroke: INK, "stroke-width": 4}, pg);
    el("path", {d: "M-110 150 H110 Q90 190 0 190 Q-90 190 -110 150 Z", fill: "#ced4da", stroke: INK, "stroke-width": 6}, pg); return pg; });
  g.tilt = th => { tf(beam, `rotate(${th * 180 / Math.PI})`); pans.forEach((pg, i) => { const sd = i ? 1 : -1; tf(pg, `translate(${sd * 340 * Math.cos(th)} ${sd * 340 * Math.sin(th)})`); }); };
  g.panPos = (i, th) => { const sd = i ? 1 : -1; return [sd * 340 * Math.cos(th), sd * 340 * Math.sin(th) + 150]; }; g.tilt(0); return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#a2d2ff", "#cdb4db");
  s.q = tx(s.stage, {x: 760, y: 260, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "AIR = nothing?");
  s.wind = emo(s.stage, 0, 0, 170, "💨"); s.no = chip(s.stage, "✗ NO!", "#e63946", {fs: 60});
  s.items = [["💨", "air"], ["🪨", "rock"], ["🥤", "water"]].map(([e, n]) => { const g = el("g", {}, s.stage); emo(g, 0, 0, 130, e); tx(g, {x: 0, y: 110, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, n); return g; });
  s.eq = chip(s.stage, "all are MATTER", "#7209b7", {fs: 44}); s.eye = emo(s.stage, 0, 0, 130, "🙈"); s.test = chip(s.stage, "🧪 THE MATTER TEST", "#06d6a0", {fs: 46});
  s.run = t => { const a = w => C("hook", w); const row = ramp(t, a("matter") - .3, a("matter"));
    op(s.q, 1 - row); tf(s.q, `translate(760 260) scale(${pop(t, .3)}) translate(-760 -260)`);
    op(s.wind, 1 - row); set(s.wind, "x", 760 + Math.sin(t * 3) * 30); set(s.wind, "y", 520);
    op(s.no, on(t, a("no"), a("matter"), .2)); popAt(s.no, 1100, 520, t, a("no"));
    const ts = [a("matter"), a("rock"), a("water")]; s.items.forEach((g, i) => { op(g, ramp(t, ts[i], ts[i] + .2)); tf(g, `translate(${420 + i * 340} 360) scale(${pop(t, ts[i])})`); });
    op(s.eq, ramp(t, a("water") + .3, a("water") + .5)); popAt(s.eq, 760, 600, t, a("water") + .3);
    op(s.eye, ramp(t, a("invisible"), a("invisible") + .2)); set(s.eye, "x", 1180); set(s.eye, "y", 620);
    op(s.test, ramp(t, a("test"), a("test") + .2)); popAt(s.test, 760, 780, t, a("test")); }; return s; })();

// ---- WHAT IS MATTER
S.what = (() => { const s = scene("what", "#ffd6a5", "#ffadad");
  s.bub = el("g", {}, s.stage); el("path", {d: "M-330 -80 H330 A40 40 0 0 1 370 -40 V40 A40 40 0 0 1 330 80 H-150 L-220 140 L-210 80 H-330 A40 40 0 0 1 -370 40 V-40 A40 40 0 0 1 -330 -80 Z", fill: "#fff", stroke: INK, "stroke-width": 7}, s.bub);
  tx(s.bub, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, "😟 What's the matter?"); s.wrong = chip(s.stage, "= What's wrong?", "#6c757d", {fs: 38});
  s.sci = chip(s.stage, "🔬 In SCIENCE, matter means…", "#3a86ff", {fs: 40});
  s.card = el("g", {}, s.stage); el("rect", {x: -560, y: -150, width: 1120, height: 300, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.card);
  tx(s.card, {x: 0, y: -70, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#7209b7"}, "MATTER = anything that");
  s.m1 = tx(s.card, {x: -270, y: 60, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#ef476f"}, "⚖️ has MASS"); s.plus = tx(s.card, {x: 0, y: 60, "text-anchor": "middle", "font-size": 60, "font-weight": 700, fill: INK}, "+"); s.m2 = tx(s.card, {x: 280, y: 60, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#3a86ff"}, "📦 takes up SPACE");
  s.run = t => { const a = w => C("what", w); const d = ramp(t, a("science") - .3, a("science"));
    op(s.bub, ramp(t, a("everyday"), a("everyday") + .2) * (1 - d)); tf(s.bub, `translate(760 300) scale(${pop(t, a("everyday"))})`);
    op(s.wrong, ramp(t, a("wrong"), a("wrong") + .2) * (1 - d)); popAt(s.wrong, 760, 520, t, a("wrong"));
    op(s.sci, d * (1 - ramp(t, a("matter#3") - .3, a("matter#3")) * .0)); popAt(s.sci, 760, 180, t, a("science"));
    op(s.card, ramp(t, a("matter#3"), a("matter#3") + .2)); tf(s.card, `translate(760 500) scale(${pop(t, a("matter#3"))})`);
    op(s.m1, ramp(t, a("mass"), a("mass") + .2)); op(s.plus, ramp(t, a("mass"), a("mass") + .2)); op(s.m2, ramp(t, a("space"), a("space") + .2)); }; return s; })();

// ---- MASS
S.mass = (() => { const s = scene("mass", "#caffbf", "#9bf6ff");
  seed = 11; s.bal = balance(s.stage); s.b1 = bottle(s.stage, .9); s.b2 = bottle(s.stage, .15);
  s.c1 = chip(s.stage, "MASS = the amount of matter", "#ef476f", {fs: 40}); s.l1 = chip(s.stage, "FULL: more matter", "#3a86ff", {fs: 30}); s.l2 = chip(s.stage, "nearly empty", "#6c757d", {fs: 30});
  s.c2 = chip(s.stage, "tilts towards the HEAVIER one ⬇", "#1b1b3a", {fs: 34});
  s.run = t => { const a = w => C("mass", w); const on2 = ramp(t, a("balance") - .2, a("balance") + .6), th = .2 * ramp(t, a("tilts"), a("tilts") + .8);
    op(s.bal, ramp(t, a("balance") - .4, a("balance"))); tf(s.bal, "translate(760 430)"); s.bal.tilt(-th);
    const p1 = s.bal.panPos(0, -th), p2 = s.bal.panPos(1, -th);
    op(s.b1, ramp(t, a("full") - .3, a("full"))); tf(s.b1, `translate(${lerp(560, 760 + p1[0], on2)} ${lerp(560, 430 + p1[1] - 90, on2)}) scale(${lerp(1, .55, on2)})`);
    op(s.b2, ramp(t, a("empty") - .3, a("empty"))); tf(s.b2, `translate(${lerp(960, 760 + p2[0], on2)} ${lerp(560, 430 + p2[1] - 90, on2)}) scale(${lerp(1, .55, on2)})`);
    op(s.c1, ramp(t, a("amount"), a("amount") + .2)); popAt(s.c1, 760, 160, t, a("amount"));
    op(s.l1, on(t, a("full"), a("balance"), .2)); popAt(s.l1, 560, 780, t, a("full")); op(s.l2, on(t, a("empty"), a("balance"), .2)); popAt(s.l2, 960, 780, t, a("empty"));
    op(s.c2, ramp(t, a("tilts"), a("tilts") + .2)); popAt(s.c2, 760, 250, t, a("tilts")); }; return s; })();

// ---- SPACE + VOLUME
S.space = (() => { const s = scene("space", "#bde0fe", "#a2d2ff");
  seed = 12; s.bot = bottle(s.stage, 1); s.jug = emo(s.stage, 0, 0, 150, "🫗");
  s.drops = []; for (let i = 0; i < 10; i++) s.drops.push({ph: i / 10, sd: i % 2 ? 1 : -1, e: emo(s.stage, 0, 0, 44, "💧")});
  s.c1 = chip(s.stage, "FULL: no room for more!", "#e63946", {fs: 36}); s.c2 = chip(s.stage, "the water inside is already TAKING UP THE SPACE", "#3a86ff", {fs: 32});
  s.cube = el("g", {}, s.stage); el("rect", {x: -120, y: -120, width: 240, height: 240, fill: "#ffd16688", stroke: INK, "stroke-width": 6, "stroke-dasharray": "16 10"}, s.cube); emo(s.cube, 0, 0, 120, "🧸");
  s.c3 = chip(s.stage, "VOLUME = the amount of space an object takes up", "#7209b7", {fs: 32});
  s.run = t => { const a = w => C("space", w); const v = ramp(t, a("volume") - .4, a("volume"));
    op(s.bot, 1 - v); tf(s.bot, "translate(560 520) scale(1.3)");
    op(s.jug, on(t, a("pour") - .2, a("inside"), .2)); set(s.jug, "x", 680); set(s.jug, "y", 230 + Math.sin(t * 4) * 6);
    s.drops.forEach(d => { const k = ((t * .9 + d.ph) % 1); set(d.e, "x", 560 + d.sd * (80 + k * 60)); set(d.e, "y", lerp(300, 740, k)); op(d.e, on(t, a("overflows"), a("inside") + 1, .2) * Math.sin(k * Math.PI)); });
    op(s.c1, on(t, a("full"), a("volume") - .4, .2)); popAt(s.c1, 1120, 360, t, a("full"));
    op(s.c2, on(t, a("inside"), a("volume") - .4, .2)); popAt(s.c2, 900, 820, t, a("inside"));
    op(s.cube, v); tf(s.cube, `translate(760 450) scale(${pop(t, a("volume") - .2)})`);
    op(s.c3, ramp(t, a("volume"), a("volume") + .2)); popAt(s.c3, 760, 720, t, a("volume")); }; return s; })();

// ---- NON-MATTER
S.non = (() => { const s = scene("non", "#3c096c", "#5a189a");
  s.title = chip(s.stage, "NOT MATTER", "#6c757d", {fs: 46});
  const ks = [["💡", "LIGHT", "light"], ["👤", "SHADOW", "shadows"], ["🔥", "HEAT", "heat"], ["🔊", "SOUND", "sound"]];
  s.cards = ks.map(([e, n, w], i) => { const g = el("g", {}, s.stage); el("rect", {x: -120, y: -110, width: 240, height: 220, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6}, g); emo(g, 0, -20, 100, e); tx(g, {x: 0, y: 80, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: INK}, n); return {g, w, i}; });
  s.scale = el("g", {}, s.stage); el("rect", {x: -170, y: -30, width: 340, height: 90, rx: 18, fill: "#e9ecef", stroke: INK, "stroke-width": 6}, s.scale); el("rect", {x: -200, y: -50, width: 400, height: 24, rx: 10, fill: "#ced4da", stroke: INK, "stroke-width": 6}, s.scale);
  el("rect", {x: -90, y: 0, width: 180, height: 46, rx: 8, fill: "#1b1b3a"}, s.scale); tx(s.scale, {x: 0, y: 36, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#80ffdb"}, "0.0 g");
  s.torch = emo(s.stage, 0, 0, 110, "🔦"); s.beam = el("path", {d: "M0 0 L-160 170 L60 190 Z", fill: "#fff3b0", opacity: .7}, s.stage);
  s.wall = el("g", {}, s.stage); for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) el("rect", {x: (r % 2 ? -40 : -60) + c * 60, y: r * 40, width: 60, height: 40, fill: "#bc6c25", stroke: INK, "stroke-width": 3}, s.wall);
  s.passers = ["🔥", "🎵", "🔥", "🎵"].map(e => emo(s.stage, 0, 0, 70, e)); s.kid = emo(s.stage, 0, 0, 130, "🧍"); s.sh = el("ellipse", {rx: 110, ry: 34, fill: "#00000088"}, s.stage);
  s.stamp = chip(s.stage, "✗ no mass   ✗ no space", "#e63946", {fs: 44});
  s.run = t => { const a = w => C("non", w); const st = ramp(t, a("mass") - .3, a("mass"));
    op(s.title, ramp(t, a("not"), a("not") + .2)); popAt(s.title, 760, 130, t, a("not"));
    s.cards.forEach(c => { const tt = a(c.w); op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${310 + c.i * 300} 330) scale(${pop(t, tt)})`); });
    const d1 = on(t, a("torch"), a("stand"), .2), d2 = on(t, a("stand"), a("walls"), .2), d3 = on(t, a("walls"), a("mass") + 3, .2) * (1 - st * .6);
    op(s.scale, d1); tf(s.scale, "translate(760 760)"); op(s.torch, d1); set(s.torch, "x", 980); set(s.torch, "y", 580); op(s.beam, d1 * .7); tf(s.beam, "translate(930 600)");
    op(s.kid, d2); set(s.kid, "x", 760); set(s.kid, "y", 690); op(s.sh, d2); set(s.sh, "cx", 760); set(s.sh, "cy", 760);
    op(s.wall, d3); tf(s.wall, "translate(760 580)"); s.passers.forEach((p, i) => { const k = ((t * .4 + i / 4) % 1); set(p, "x", lerp(420, 1100, k)); set(p, "y", 640 + (i % 2) * 60); op(p, d3); });
    op(s.stamp, st); tf(s.stamp, `translate(760 700) rotate(-4) scale(${pop(t, a("mass") - .3)})`); }; return s; })();

// ---- AIR TEST 1 (mass)
S.air1 = (() => { const s = scene("air1", "#ffe5d9", "#fec89a");
  s.big = tx(s.stage, {x: 760, y: 200, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧪 TEST 1: does air have MASS?");
  s.bal = balance(s.stage); s.ball = emo(s.stage, 0, 0, 150, "🏀"); s.flat = el("ellipse", {rx: 80, ry: 26, fill: "#e76f51", stroke: INK, "stroke-width": 5}, s.stage);
  s.l1 = chip(s.stage, "pumped up", "#f77f00", {fs: 30}); s.l2 = chip(s.stage, "flat", "#6c757d", {fs: 30});
  s.ok = chip(s.stage, "✓ AIR HAS MASS!", "#06d6a0", {fs: 50});
  s.run = t => { const a = w => C("air1", w); const th = .18 * ramp(t, a("tilts"), a("tilts") + .8);
    op(s.big, ramp(t, a("one"), a("one") + .2) * (1 - ramp(t, a("extra") - .2, a("extra")))); tf(s.big, `translate(760 200) scale(${pop(t, a("one")) * .8}) translate(-760 -200)`);
    op(s.bal, ramp(t, a("basketball") - .3, a("basketball"))); tf(s.bal, "translate(760 470)"); s.bal.tilt(-th);
    const p1 = s.bal.panPos(0, -th), p2 = s.bal.panPos(1, -th);
    op(s.ball, ramp(t, a("basketball"), a("basketball") + .2)); set(s.ball, "x", 760 + p1[0]); set(s.ball, "y", 470 + p1[1] - 70);
    op(s.flat, ramp(t, a("flat"), a("flat") + .2)); set(s.flat, "cx", 760 + p2[0]); set(s.flat, "cy", 470 + p2[1] - 22);
    op(s.l1, ramp(t, a("basketball"), a("basketball") + .2)); popAt(s.l1, 760 + p1[0], 470 + p1[1] + 90, t, a("basketball"));
    op(s.l2, ramp(t, a("flat"), a("flat") + .2)); popAt(s.l2, 760 + p2[0], 470 + p2[1] + 90, t, a("flat"));
    op(s.ok, ramp(t, a("extra"), a("extra") + .2)); popAt(s.ok, 760, 200, t, a("extra")); }; return s; })();

// ---- AIR TEST 2 (space)
S.air2 = (() => { const s = scene("air2", "#90e0ef", "#48cae4");
  s.big = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🧪 TEST 2: does air take up SPACE?");
  s.basin = el("rect", {x: 300, y: 400, width: 900, height: 420, fill: "#4361ee", opacity: .55}, s.stage); el("rect", {x: 300, y: 330, width: 900, height: 490, fill: "none", stroke: INK, "stroke-width": 8}, s.stage);
  s.air = el("rect", {x: 0, width: 240, fill: "#f8f9fa"}, s.stage); s.cup = el("path", {d: "M-130 320 V0 H130 V320", fill: "none", stroke: INK, "stroke-width": 12, "stroke-linejoin": "round"}, s.stage);
  s.hand = emo(s.stage, 0, 0, 110, "✋"); s.airL = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#3a86ff"}, "AIR");
  s.straw = el("path", {d: "M1350 340 V760 H760 V0", fill: "none", stroke: "#f72585", "stroke-width": 16, "stroke-linejoin": "round"}, s.stage); s.mouth = emo(s.stage, 1350, 290, 110, "😗");
  s.bub = []; for (let i = 0; i < 8; i++) s.bub.push({ph: i / 8, e: el("circle", {r: 12, fill: "#fff", stroke: INK, "stroke-width": 3}, s.stage)});
  s.c1 = chip(s.stage, "AIR is trapped inside, taking up the space", "#06d6a0", {fs: 32}); s.c2 = chip(s.stage, "more air ➜ water level DROPS", "#e63946", {fs: 32});
  s.run = t => { const a = w => C("air2", w); const k = ramp(t, a("push"), a("push") + 1.6), dr = ramp(t, a("straw") + .4, a("drops") + .5);
    op(s.big, on(t, a("two"), a("push"), .2)); tf(s.big, `translate(760 150) scale(${pop(t, a("two")) * .8}) translate(-760 -150)`);
    const top = lerp(60, 380, k), lvl = lerp(400, 620, k) + dr * 60;
    tf(s.cup, `translate(760 ${top})`); set(s.air, "x", 640); set(s.air, "y", top + 6); set(s.air, "height", Math.max(0, lvl - top - 6)); op(s.air, k > .05 ? 1 : 0);
    op(s.hand, on(t, a("push") - .2, a("cannot") + .5, .2)); set(s.hand, "x", 760); set(s.hand, "y", top - 60);
    op(s.airL, ramp(t, a("trapped"), a("trapped") + .2)); set(s.airL, "x", 760); set(s.airL, "y", top + (lvl - top) / 2 + 14);
    const sw = ramp(t, a("straw") - .2, a("straw") + .2); op(s.straw, sw); op(s.mouth, sw); set(s.straw, "d", `M1350 340 V760 H760 V${lerp(760, 650 + dr * 40, sw)}`);
    s.bub.forEach(b => { const q = ((t * 1.1 + b.ph) % 1); set(b.e, "cx", 760 + Math.sin(q * 9 + b.ph * 6) * 18); set(b.e, "cy", lerp(650 + dr * 40, lvl, q)); op(b.e, on(t, a("straw") + .3, SC.air2.t1 + .3, .2) * (1 - q * .5)); });
    op(s.c1, on(t, a("trapped"), a("straw"), .2)); popAt(s.c1, 760, 240, t, a("trapped"));
    op(s.c2, ramp(t, a("drops"), a("drops") + .2)); popAt(s.c2, 760, 240, t, a("drops")); }; return s; })();

// ---- VERDICT
S.verdict = (() => { const s = scene("verdict", "#ffd166", "#06d6a0");
  s.air = emo(s.stage, 0, 0, 240, "💨"); s.c1 = chip(s.stage, "✓ has mass", "#ef476f", {fs: 46}); s.c2 = chip(s.stage, "✓ takes up space", "#3a86ff", {fs: 46});
  s.stamp = el("g", {}, s.stage); el("rect", {x: -380, y: -70, width: 760, height: 140, rx: 22, fill: "#fff", stroke: "#d00000", "stroke-width": 12}, s.stamp); tx(s.stamp, {x: 0, y: 26, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#d00000"}, "AIR IS MATTER!");
  s.see = emo(s.stage, 0, 0, 110, "🙈");
  s.run = t => { const a = w => C("verdict", w);
    op(s.air, 1); set(s.air, "x", 760 + Math.sin(t * 3) * 20); set(s.air, "y", 380);
    op(s.c1, ramp(t, a("mass"), a("mass") + .2)); popAt(s.c1, 460, 300, t, a("mass")); op(s.c2, ramp(t, a("space"), a("space") + .2)); popAt(s.c2, 1080, 300, t, a("space"));
    op(s.stamp, ramp(t, a("matter"), a("matter") + .15)); tf(s.stamp, `translate(760 660) rotate(-5) scale(${1.4 - .4 * ramp(t, a("matter"), a("matter") + .25)})`);
    op(s.see, ramp(t, a("see"), a("see") + .2)); set(s.see, "x", 1230); set(s.see, "y", 640); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.cards = [["🌈", "RAINBOW", "rainbow"], ["🎈", "BALLOON", "balloon"], ["👤", "SHADOW", "shadow"], ["🥁", "DRUM SOUND", "drum"]].map(([e, n, w], i) => { const g = el("g", {}, s.stage);
    const face = el("rect", {x: -125, y: -150, width: 250, height: 300, rx: 28, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g); emo(g, 0, -40, 110, e);
    tx(g, {x: 0, y: 90, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, n); const mk = tx(g, {x: 0, y: 40, "text-anchor": "middle", "font-size": 180, "font-weight": 700, fill: i === 1 ? "#06d6a0" : "#e63946", class: "out", "stroke-width": 10, opacity: 0}, i === 1 ? "✓" : "✗"); return {g, face, mk, w, i}; });
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("only"), .2)); tf(s.pause, `translate(760 170) scale(${pop(t, a("pause"))}) translate(-760 -170)`);
    s.cards.forEach(c => { const tt = a(c.w); op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${300 + c.i * 300} 500) scale(${pop(t, tt)})`);
      const rv = c.i === 1 ? b("balloon") : b("rainbow"); op(c.mk, ramp(t, rv, rv + .2)); set(c.face, "fill", t > rv ? (c.i === 1 ? "#d8f3dc" : "#ffccd5") : "#fff"); }); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🧱 Matter is anything that has mass and occupies space."], ["💨 Air is matter, because it has mass and", "     occupies space."], ["💡 Light, shadow, heat and sound are not matter,", "     because they have no mass and do not occupy space."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 40; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("anything"), a("air"), a("light")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (identity)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🪪 CHOOSE WHO YOU WANT TO BE");
  s.b1 = chip(s.stage, "😩 I have to study…", "#6c757d", {fs: 44}); s.x1 = el("line", {x1: -260, y1: 0, x2: 260, y2: 0, stroke: "#e63946", "stroke-width": 12, "stroke-linecap": "round"}, s.stage);
  s.b2 = chip(s.stage, "🔬 I am a SCIENTIST!", "#7209b7", {fs: 54}); s.b3 = chip(s.stage, "scientists test their ideas 🧪", "#1b1b3a", {fs: 34});
  s.votes = []; for (let i = 0; i < 5; i++) { const g = el("g", {}, s.stage); el("rect", {x: -50, y: -50, width: 100, height: 100, rx: 18, fill: "#fff", stroke: INK, "stroke-width": 6}, g); s.votes.push({g, mk: tx(g, {x: 0, y: 26, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#06d6a0"}, "✓")}); }
  s.why = chip(s.stage, "each ❓why = 1 vote for the new you", "#ff9f1c", {fs: 32});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("choose"), a("choose") + .2)); tf(s.title, `translate(760 170) scale(${pop(t, a("choose")) * .9}) translate(-760 -170)`);
    op(s.b1, ramp(t, a("study"), a("study") + .2)); popAt(s.b1, 760, 330, t, a("study")); op(s.x1, ramp(t, a("scientist") - .3, a("scientist"))); tf(s.x1, "translate(760 330)");
    op(s.b2, ramp(t, a("scientist"), a("scientist") + .2)); popAt(s.b2, 760, 470, t, a("scientist"));
    op(s.b3, ramp(t, a("test"), a("test") + .2)); popAt(s.b3, 760, 580, t, a("test"));
    s.votes.forEach((v, i) => { const tt = a("why") - .4 + i * .35; op(v.g, ramp(t, a("every"), a("every") + .2)); tf(v.g, `translate(${520 + i * 120} 720)`); op(v.mk, ramp(t, tt, tt + .1)); });
    op(s.why, ramp(t, a("prove"), a("prove") + .2)); popAt(s.why, 760, 850, t, a("prove")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 520, CY = 470;
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 170, ry: 76, fill: "#7209b7", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "MATTER");
  const br = [["mass", "⚖️ HAS MASS", "#ef476f", 230, 290, "kg, g · use a balance"], ["space", "📦 TAKES UP SPACE", "#3a86ff", 860, 300, "volume"]];
  s.br = br.map(([k, n, col, x, y, sub]) => { const line = el("path", {d: `M${CX} ${CY} Q${(CX + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 34}), x, y, tw: chip(s.stage, sub, "#fff", {fs: 26, ink: INK})}; });
  s.stage.appendChild(s.center);
  s.not = el("g", {}, s.stage); el("rect", {x: -420, y: -120, width: 840, height: 240, rx: 40, fill: "#e9ecef", stroke: "#6c757d", "stroke-width": 6, "stroke-dasharray": "18 12"}, s.not); tx(s.not, {x: 0, y: -70, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#495057"}, "NOT MATTER ✗");
  s.nm = [["💡 light", "light"], ["👤 shadow", "shadow"], ["🔥 heat", "heat"], ["🔊 sound", "sound"]].map(([n, w], i) => ({w, i, c: chip(s.stage, n, "#fff", {fs: 30, ink: INK})}));
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr8"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr8)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("matter"), a("matter") + .2)); tf(s.center, `translate(${CX} ${CY}) scale(${pop(t, a("matter"))})`);
    s.br.forEach(b => { const k = a(b.k); set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .1, k + .3)); popAt(b.c, b.x, b.y, t, k + .1);
      op(b.tw, ramp(t, k + .5, k + .7)); popAt(b.tw, b.x, b.y - 78, t, k + .5); });
    op(s.not, ramp(t, a("separate"), a("separate") + .2)); tf(s.not, `translate(560 760) scale(${pop(t, a("separate"))})`);
    s.nm.forEach(n => { const tt = a(n.w); op(n.c, ramp(t, tt, tt + .2)); popAt(n.c, 260 + n.i * 200, 790, t, tt); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 130, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1300, ph)} 520) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - 190 * ramp(t, a("save"), nx); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1083 / 1688)); set(s.ring, "width", 224 * (176 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -380, y: -70, width: 760, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: "#fff"}, "💨 AIR IS MATTER!");
  s.home = emo(s.stage, 0, 0, 150, "🏠"); s.boxes = []; for (let i = 0; i < 4; i++) { const g = el("g", {}, s.stage); el("rect", {x: -90, y: -90, width: 180, height: 180, rx: 24, fill: i < 3 ? "#fff" : "#e9ecef", stroke: INK, "stroke-width": 6, "stroke-dasharray": i < 3 ? "" : "14 10"}, g); tx(g, {x: 0, y: 130, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, i < 3 ? "matter " + (i + 1) : "NOT matter"); tx(g, {x: 0, y: 28, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#adb5bd"}, "?"); s.boxes.push(g); }
  s.why = chip(s.stage, "🤔 Can you explain WHY?", "#1b1b3a", {fs: 40});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("find") - .2, a("find") + .1);
    op(s.ans, ramp(t, a("matter"), a("matter") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("matter"))})`);
    op(s.home, tn); set(s.home, "x", 230); set(s.home, "y", 420);
    s.boxes.forEach((g, i) => { const tt = (i < 3 ? a("three") : a("one")) + (i < 3 ? i * .2 : 0); op(g, ramp(t, tt, tt + .2)); tf(g, `translate(${470 + i * 250} 400) scale(${pop(t, tt)})`); });
    op(s.why, ramp(t, a("explain") - .3, a("explain"))); popAt(s.why, 760, 720, t, a("explain") - .3); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Solid, liquid, gas:");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "the squeeze test 🤏");
  s.run = () => {}; return s; })();

