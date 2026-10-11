/* =================== SCENES (Episode 13: energy + sources of light) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
function firefly(p, s = 1) { const g = el("g", {transform: `scale(${s})`}, p); const glow = el("circle", {cx: 0, cy: 14, r: 34, fill: "#fff3b0", opacity: .7}, g); el("circle", {cx: 0, cy: 14, r: 16, fill: "#ffe14d"}, g);
  el("ellipse", {cx: 0, cy: -10, rx: 12, ry: 20, fill: "#3d2c1e", stroke: INK, "stroke-width": 3}, g); el("ellipse", {cx: -16, cy: -16, rx: 14, ry: 8, fill: "#ffffff99", stroke: INK, "stroke-width": 2}, g); el("ellipse", {cx: 16, cy: -16, rx: 14, ry: 8, fill: "#ffffff99", stroke: INK, "stroke-width": 2}, g);
  g.glow = glow; return g; }
function fwBurst(p, col) { const g = el("g", {}, p); for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; el("line", {x1: Math.cos(a) * 20, y1: Math.sin(a) * 20, x2: Math.cos(a) * 90, y2: Math.sin(a) * 90, stroke: col, "stroke-width": 7, "stroke-linecap": "round"}, g); el("circle", {cx: Math.cos(a) * 100, cy: Math.sin(a) * 100, r: 7, fill: col}, g); } return g; }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#1d3557", "#3a0ca3");
  s.n = el("g", {}, s.stage); el("circle", {r: 220, fill: "#06d6a033", stroke: "#06d6a0", "stroke-width": 10}, s.n); tx(s.n, {x: 0, y: -150, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🌿 NATURE");
  s.pp = el("g", {}, s.stage); el("circle", {r: 220, fill: "#3a86ff33", stroke: "#3a86ff", "stroke-width": 10}, s.pp); tx(s.pp, {x: 0, y: -150, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: "#fff"}, "🧑 PEOPLE");
  s.items = [["☀️", 0], ["⚡", 0], ["💡", 1], ["🎆", 1]].map(([e, side], i) => ({e: emo(s.stage, 0, 0, 100, e), side, i}));
  s.ff = firefly(s.stage, 1.6); s.q = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "Every light comes from…");
  s.run = t => { const a = w => C("hook", w); const sort = ramp(t, a("sort"), a("sort") + 1.2);
    op(s.q, ramp(t, .3, .6)); op(s.n, ramp(t, a("nature"), a("nature") + .2)); tf(s.n, `translate(440 560) scale(${pop(t, a("nature"))})`);
    op(s.pp, ramp(t, a("people"), a("people") + .2)); tf(s.pp, `translate(1080 560) scale(${pop(t, a("people"))})`);
    s.items.forEach(it => { const tx0 = 760 + (it.i - 1.5) * 90, cx = (it.side ? 1080 : 440) + (it.i % 2 ? 70 : -70); op(it.e, ramp(t, a("two"), a("two") + .3)); set(it.e, "x", lerp(tx0, cx, sort)); set(it.e, "y", lerp(330, 600, sort) - Math.sin(sort * Math.PI) * 120); });
    op(s.ff, ramp(t, a("firefly"), a("firefly") + .2)); tf(s.ff, `translate(${440 + Math.sin(t * 2) * 60} ${520 + Math.cos(t * 3) * 30}) scale(1.6)`); op(s.ff.glow, .4 + .5 * Math.abs(Math.sin(t * 4))); }; return s; })();

// ---- ENERGY
S.energy = (() => { const s = scene("energy", "#ffd166", "#f77f00");
  s.title = tx(s.stage, {x: 760, y: 190, "text-anchor": "middle", "font-size": 100, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "⚡ ENERGY");
  s.ic = [["🏃", "run + climb", "run"], ["🌱", "plants grow", "plants"], ["🍳", "cook food", "cooks"], ["📻", "a radio works", "radio"]].map(([e, n, w], i) => { const g = el("g", {}, s.stage); el("circle", {r: 100, fill: "#fff", stroke: INK, "stroke-width": 6}, g); emo(g, 0, -6, 110, e);
    tx(g, {x: 0, y: 150, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, n); return {g, w, i}; });
  s.forms = chip(s.stage, "many FORMS of energy:", "#1b1b3a", {fs: 38}); s.l = chip(s.stage, "💡 LIGHT", "#ffbe0b", {fs: 44}); s.h = chip(s.stage, "🔥 HEAT", "#e63946", {fs: 44});
  s.run = t => { const a = w => C("energy", w); const up = ramp(t, a("forms") - .3, a("forms") + .3);
    op(s.title, ramp(t, a("energy"), a("energy") + .2)); tf(s.title, `translate(760 190) scale(${pop(t, a("energy"))}) translate(-760 -190)`);
    s.ic.forEach(c => { const tt = a(c.w); op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${310 + c.i * 300} ${lerp(470, 400, up)}) scale(${pop(t, tt) * lerp(1, .8, up)})`); });
    op(s.forms, ramp(t, a("forms"), a("forms") + .2)); popAt(s.forms, 760, 680, t, a("forms"));
    op(s.l, ramp(t, a("light"), a("light") + .2)); popAt(s.l, 600, 790, t, a("light")); op(s.h, ramp(t, a("heat"), a("heat") + .2)); popAt(s.h, 920, 790, t, a("heat")); }; return s; })();

// ---- NEED (dark room)
S.need = (() => { const s = scene("need", "#bde0fe", "#ffd6a5");
  s.bed = el("g", {}, s.stage); el("rect", {x: -220, y: -40, width: 440, height: 90, rx: 20, fill: "#7209b7", stroke: INK, "stroke-width": 6}, s.bed); el("rect", {x: -220, y: -110, width: 70, height: 160, rx: 14, fill: "#560bad", stroke: INK, "stroke-width": 6}, s.bed);
  s.toy = emo(s.stage, 0, 0, 100, "🧸"); s.kid = emo(s.stage, 0, 0, 170, "🧒"); s.ouch = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#ff595e", class: "out", "stroke-width": 8}, "OUCH!");
  s.dark = el("rect", {x: 0, y: 0, width: 1920, height: 1080, fill: "#0b0b1e"}, s.stage); s.eyes = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 60, fill: "#fff"}, "👀");
  s.c = [["👀 see", "see"], ["🔎 find things", "find#2"], ["🛡️ stay safe", "safe"]].map(([n, w], i) => ({c: chip(s.stage, n, ["#3a86ff", "#7209b7", "#06d6a0"][i], {fs: 40}), w, i}));
  s.run = t => { const a = w => C("need", w); const lit = ramp(t, a("light#2") - .2, a("light#2") + .4), trip = ramp(t, a("trip"), a("trip") + .4);
    tf(s.bed, "translate(420 620)"); set(s.toy, "x", 920); set(s.toy, "y", 690); op(s.toy, 1);
    op(s.kid, 1); set(s.kid, "x", lerp(1300, 1000, ramp(t, a("find"), a("trip")))); set(s.kid, "y", 620 + trip * 40); tf(s.kid, `rotate(${-trip * 50} ${lerp(1300, 1000, ramp(t, a("find"), a("trip")))} 620)`);
    op(s.ouch, on(t, a("trip") + .2, a("light#2"), .2)); set(s.ouch, "x", 1080); set(s.ouch, "y", 480);
    op(s.dark, (1 - lit) * .9); op(s.eyes, (1 - lit) * ramp(t, a("night"), a("night") + .3) * (1 - trip)); set(s.eyes, "x", lerp(1300, 1000, ramp(t, a("find"), a("trip")))); set(s.eyes, "y", 600);
    s.c.forEach(c => { op(c.c, ramp(t, a(c.w), a(c.w) + .2)); popAt(c.c, 440 + c.i * 320, 200, t, a(c.w)); }); }; return s; })();

// ---- SOURCES
S.sources = (() => { const s = scene("sources", "#fff3b0", "#ffd166");
  s.card = el("g", {}, s.stage); el("rect", {x: -560, y: -100, width: 1120, height: 200, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.card);
  tx(s.card, {x: 0, y: -20, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#f77f00"}, "💡 SOURCE OF LIGHT"); tx(s.card, {x: 0, y: 50, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, "anything that gives off its OWN light");
  s.d1 = chip(s.stage, "🌿 NATURAL", "#06d6a0", {fs: 56}); s.d2 = chip(s.stage, "🏭 MAN-MADE", "#3a86ff", {fs: 56}); s.or = tx(s.stage, {x: 760, y: 690, "text-anchor": "middle", "font-size": 50, "font-weight": 700, fill: INK}, "or");
  s.run = t => { const a = w => C("sources", w);
    op(s.card, ramp(t, a("source") - .3, a("source"))); tf(s.card, `translate(760 330) scale(${pop(t, a("source") - .3)})`);
    op(s.d1, ramp(t, a("natural"), a("natural") + .2)); popAt(s.d1, 450, 670, t, a("natural")); op(s.or, ramp(t, a("natural"), a("natural") + .2));
    op(s.d2, ramp(t, a("manmade"), a("manmade") + .2)); popAt(s.d2, 1070, 670, t, a("manmade")); }; return s; })();

// ---- NATURAL
S.natural = (() => { const s = scene("natural", "#48cae4", "#ade8f4");
  s.night = el("rect", {x: 0, y: 0, width: 1920, height: 1080, fill: "#03045e"}, s.stage);
  s.sun = emo(s.stage, 0, 0, 260, "☀️"); s.c1 = chip(s.stage, "our MAIN source of light", "#f77f00", {fs: 36}); s.c2 = chip(s.stage, "⭐ the Sun is a STAR!", "#ffbe0b", {fs: 40});
  seed = 13; s.st = []; for (let i = 0; i < 26; i++) s.st.push({x: 100 + rnd() * 1300, y: 120 + rnd() * 560, ph: rnd() * 6, e: el("circle", {r: 3 + rnd() * 5, fill: "#fff"}, s.stage)});
  s.c3 = chip(s.stage, "other stars: too DIM to light up the night", "#7209b7", {fs: 34});
  s.bolt = el("path", {d: "M0 0 L-60 160 L10 160 L-50 340 L90 120 L20 120 L70 0 Z", fill: "#ffe14d", stroke: INK, "stroke-width": 6}, s.stage); s.flash = el("rect", {x: 0, y: 0, width: 1920, height: 1080, fill: "#fff"}, s.stage);
  s.c4 = chip(s.stage, "⚡ LIGHTNING in a thunderstorm", "#ffbe0b", {fs: 38});
  s.run = t => { const a = w => C("natural", w); const nt = ramp(t, a("stars") - .3, a("stars") + .2), lt = ramp(t, a("lightning") - .2, a("lightning"));
    op(s.night, nt); op(s.sun, ramp(t, a("sun") - .2, a("sun")) * (1 - nt)); set(s.sun, "x", 760); set(s.sun, "y", 470); tf(s.sun, `rotate(${t * 10} 760 470)`);
    op(s.c1, on(t, a("main"), a("stars") - .3, .2)); popAt(s.c1, 760, 730, t, a("main")); op(s.c2, on(t, a("star"), a("stars") - .3, .2)); popAt(s.c2, 760, 820, t, a("star"));
    s.st.forEach(q => { set(q.e, "cx", q.x); set(q.e, "cy", q.y); op(q.e, nt * (.4 + .6 * Math.abs(Math.sin(t * 2 + q.ph))) * (1 - lt * .5)); });
    op(s.c3, on(t, a("little"), a("lightning") - .2, .2)); popAt(s.c3, 760, 800, t, a("little"));
    op(s.bolt, lt); tf(s.bolt, "translate(760 260) scale(1.3)"); op(s.flash, on(t, a("lightning"), a("lightning") + .15, .05) * .8);
    op(s.c4, ramp(t, a("thunderstorm") - .3, a("thunderstorm"))); popAt(s.c4, 760, 820, t, a("thunderstorm") - .3); }; return s; })();

// ---- LIVING LIGHT
S.living = (() => { const s = scene("living", "#03045e", "#023e8a");
  seed = 17; s.ffs = []; for (let i = 0; i < 9; i++) s.ffs.push({x: 160 + rnd() * 520, y: 180 + rnd() * 260, ph: rnd() * 6, g: firefly(s.stage, .8)});
  s.c1 = chip(s.stage, "fireflies flash PATTERNS to find each other", "#38b000", {fs: 30});
  s.jel = emo(s.stage, 0, 0, 160, "🪼"); s.jg = el("circle", {r: 110, fill: "#c77dff", opacity: .35}, s.stage); s.fish = emo(s.stage, 0, 0, 110, "🐟"); s.fl = el("circle", {r: 20, fill: "#ffe14d"}, s.stage);
  s.c2 = chip(s.stage, "deep sea: NO sunlight reaches here", "#0077b6", {fs: 30});
  s.cave = el("path", {d: "M980 260 Q1200 140 1440 260 L1440 300 Q1200 200 980 300 Z", fill: "#495057", stroke: INK, "stroke-width": 6}, s.stage); s.gw = []; for (let i = 0; i < 14; i++) s.gw.push({x: 1020 + i * 30, y: 280 + Math.sin(i) * 14 + (i % 3) * 8, e: el("circle", {r: 6, fill: "#80ffdb"}, s.stage)});
  s.c3 = chip(s.stage, "glow-worms light up caves", "#06d6a0", {fs: 30});
  s.run = t => { const a = w => C("living", w);
    s.ffs.forEach(f => { tf(f.g, `translate(${f.x + Math.sin(t + f.ph) * 30} ${f.y + Math.cos(t * 1.3 + f.ph) * 20}) scale(.8)`); op(f.g, ramp(t, a("fireflies"), a("fireflies") + .3)); op(f.g.glow, (Math.sin(t * 6 + f.ph * 2) > .3 ? .9 : .1)); });
    op(s.c1, ramp(t, a("patterns"), a("patterns") + .2)); popAt(s.c1, 440, 520, t, a("patterns"));
    const jy = 700 + Math.sin(t * 1.5) * 20; op(s.jel, ramp(t, a("jellyfish"), a("jellyfish") + .2)); set(s.jel, "x", 360); set(s.jel, "y", jy); op(s.jg, ramp(t, a("jellyfish"), a("jellyfish") + .2) * (.5 + .4 * Math.sin(t * 3))); set(s.jg, "cx", 360); set(s.jg, "cy", jy - 20);
    op(s.fish, ramp(t, a("deepsea"), a("deepsea") + .2)); set(s.fish, "x", 660 + Math.sin(t) * 30); set(s.fish, "y", 760); op(s.fl, ramp(t, a("deepsea"), a("deepsea") + .2) * (.6 + .4 * Math.sin(t * 5))); set(s.fl, "cx", 600 + Math.sin(t) * 30); set(s.fl, "cy", 700);
    op(s.c2, ramp(t, a("ocean"), a("ocean") + .2)); popAt(s.c2, 520, 880, t, a("ocean"));
    op(s.cave, ramp(t, a("glowworms"), a("glowworms") + .2)); s.gw.forEach((g, i) => { set(g.e, "cx", g.x); set(g.e, "cy", g.y); op(g.e, ramp(t, a("glowworms"), a("glowworms") + .3) * (.5 + .5 * Math.sin(t * 3 + i))); });
    op(s.c3, ramp(t, a("caves"), a("caves") + .2)); popAt(s.c3, 1210, 380, t, a("caves")); }; return s; })();

// ---- MAN-MADE
S.manmade = (() => { const s = scene("manmade", "#ff9e00", "#3a0ca3");
  s.sky = el("rect", {x: 0, y: 0, width: 1920, height: 1080, fill: "#10002b"}, s.stage);
  s.house = el("g", {}, s.stage); el("rect", {x: -160, y: -120, width: 320, height: 240, fill: "#e9c46a", stroke: INK, "stroke-width": 7}, s.house); el("path", {d: "M-190 -120 L0 -260 L190 -120 Z", fill: "#e76f51", stroke: INK, "stroke-width": 7}, s.house);
  s.win = el("rect", {x: -110, y: -70, width: 100, height: 90, fill: "#adb5bd", stroke: INK, "stroke-width": 6}, s.house); el("rect", {x: 30, y: -10, width: 80, height: 130, fill: "#8d5524", stroke: INK, "stroke-width": 6}, s.house);
  s.bulb = emo(s.stage, 0, 0, 110, "💡"); s.c1 = chip(s.stage, "💡 light bulbs: light after the Sun sets", "#3a86ff", {fs: 32});
  s.fw = [["#ff595e", 1050, 260], ["#ffca3a", 1280, 380], ["#8ac926", 1450, 230], ["#1982c4", 1200, 180]].map(([c, x, y], i) => ({g: fwBurst(s.stage, c), x, y, i}));
  s.c2 = chip(s.stage, "🎆 fireworks at celebrations", "#f72585", {fs: 34}); s.n1 = chip(s.stage, "National Day", "#e63946", {fs: 30}); s.n2 = chip(s.stage, "New Year", "#7209b7", {fs: 30});
  s.run = t => { const a = w => C("manmade", w); const dusk = ramp(t, a("set") - .4, a("set") + .4);
    op(s.sky, dusk * .9); tf(s.house, "translate(460 600)"); op(s.house, 1); set(s.win, "fill", t > a("bulbs") ? "#ffe14d" : "#adb5bd");
    op(s.bulb, ramp(t, a("bulbs"), a("bulbs") + .2)); set(s.bulb, "x", 400); set(s.bulb, "y", 380);
    op(s.c1, ramp(t, a("bulbs"), a("bulbs") + .2) * (1 - ramp(t, a("fireworks") - .2, a("fireworks")))); popAt(s.c1, 460, 860, t, a("bulbs"));
    s.fw.forEach(f => { const st = a("fireworks") + f.i * .35, k = ((t - st) % 1.6) / 1.6; op(f.g, t > st ? (1 - k) : 0); tf(f.g, `translate(${f.x} ${f.y}) scale(${t > st ? .3 + k * .9 : 0})`); });
    op(s.c2, ramp(t, a("celebrations"), a("celebrations") + .2)); popAt(s.c2, 1250, 600, t, a("celebrations"));
    op(s.n1, ramp(t, a("national"), a("national") + .2)); popAt(s.n1, 1130, 700, t, a("national")); op(s.n2, ramp(t, a("new"), a("new") + .2)); popAt(s.n2, 1380, 700, t, a("new")); }; return s; })();

// ---- EDISON
S.edison = (() => { const s = scene("edison", "#fefae0", "#faedcd");
  s.b1 = emo(s.stage, 0, 0, 200, "💡"); s.x1 = chip(s.stage, "✗ too BIG", "#e63946", {fs: 34}); s.b2 = emo(s.stage, 0, 0, 120, "💡"); s.glare = el("circle", {r: 120, fill: "#fff3b0", opacity: .8}, s.stage); s.x2 = chip(s.stage, "✗ too BRIGHT", "#e63946", {fs: 34});
  s.ed = emo(s.stage, 0, 0, 170, "🧑‍🔬"); s.name = chip(s.stage, "Thomas Edison + his team", "#1b1b3a", {fs: 32});
  s.tries = []; for (let i = 0; i < 12; i++) s.tries.push(tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#adb5bd"}, "✗"));
  s.ok = emo(s.stage, 0, 0, 150, "💡"); s.okc = chip(s.stage, "✓ practical for HOMES", "#06d6a0", {fs: 36}); s.p = chip(s.stage, "💪 PERSISTENCE", "#e63946", {fs: 50});
  s.run = t => { const a = w => C("edison", w); const fade = ramp(t, a("edison") - .3, a("edison"));
    op(s.b1, ramp(t, a("big"), a("big") + .2) * (1 - fade)); set(s.b1, "x", 460); set(s.b1, "y", 420); op(s.x1, ramp(t, a("big"), a("big") + .2) * (1 - fade)); popAt(s.x1, 460, 620, t, a("big"));
    op(s.b2, ramp(t, a("bright"), a("bright") + .2) * (1 - fade)); set(s.b2, "x", 1060); set(s.b2, "y", 420); op(s.glare, ramp(t, a("bright"), a("bright") + .2) * (1 - fade) * (.5 + .4 * Math.sin(t * 9))); set(s.glare, "cx", 1060); set(s.glare, "cy", 410);
    op(s.x2, ramp(t, a("bright"), a("bright") + .2) * (1 - fade)); popAt(s.x2, 1060, 620, t, a("bright"));
    op(s.ed, fade); set(s.ed, "x", 360); set(s.ed, "y", 460); op(s.name, fade); popAt(s.name, 360, 640, t, a("edison"));
    s.tries.forEach((q, i) => { const tt = a("testing") + i * .18; op(q, t > tt ? 1 : 0); set(q, "x", 620 + (i % 6) * 80); set(q, "y", 380 + Math.floor(i / 6) * 80); });
    op(s.ok, ramp(t, a("practical"), a("practical") + .2)); set(s.ok, "x", 1250); set(s.ok, "y", 430); op(s.okc, ramp(t, a("practical"), a("practical") + .2)); popAt(s.okc, 1250, 600, t, a("practical"));
    op(s.p, ramp(t, a("persistence"), a("persistence") + .2)); popAt(s.p, 760, 200, t, a("persistence")); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 150, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.cards = [["🕯️", "CANDLE", "candle", 1], ["☀️", "SUN", "sun", 0], [null, "FIREFLY", "firefly", 0], ["🔦", "TORCH", "torch", 1]].map(([e, n, w, mm], i) => { const g = el("g", {}, s.stage);
    const face = el("rect", {x: -125, y: -150, width: 250, height: 300, rx: 28, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    if (e) emo(g, 0, -40, 110, e); else { const f = firefly(g, 1.2); tf(f, "translate(0 -40) scale(1.2)"); }
    tx(g, {x: 0, y: 90, "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: INK}, n); const tag = chip(g, mm ? "MAN-MADE" : "NATURAL", mm ? "#3a86ff" : "#06d6a0", {fs: 28}); return {g, face, tag, w, mm, i}; });
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("natural"), .2)); tf(s.pause, `translate(760 150) scale(${pop(t, a("pause"))}) translate(-760 -150)`);
    s.cards.forEach(c => { const tt = a(c.w); op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${300 + c.i * 300} 520) scale(${pop(t, tt)})`);
      const rv = c.mm ? b("manmade") : b("natural"); op(c.tag, ramp(t, rv, rv + .2)); popAt(c.tag, 0, 200, t, rv); set(c.face, "fill", t > rv ? (c.mm ? "#dbeafe" : "#d8f3dc") : "#fff"); }); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["💡 A source of light is an object that gives off light."], ["🌿 Natural sources: the Sun, other stars, lightning", "     and some living things."], ["🏭 Man-made sources: light bulbs and fireworks."]];
  let y = -150; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 50, "font-size": 40, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 50 + 50; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("source"), a("sun"), a("bulbs")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (celebrate small wins)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🎉 CELEBRATE SMALL WINS");
  s.list = chip(s.stage, "✅ revision DONE", "#1b1b3a", {fs: 44}); s.cheer = emo(s.stage, 0, 0, 150, "📣"); s.hi = emo(s.stage, 0, 0, 150, "🙌");
  s.brain = emo(s.stage, 0, 0, 150, "🧠"); s.heart = emo(s.stage, 0, 0, 80, "💖"); s.c = chip(s.stage, "good feeling ➜ your brain wants to do it AGAIN", "#f72585", {fs: 34});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("celebrate"), a("celebrate") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("celebrate"))}) translate(-760 -180)`);
    op(s.list, ramp(t, a("finish"), a("finish") + .2)); popAt(s.list, 760, 330, t, a("finish"));
    op(s.cheer, ramp(t, a("cheer"), a("cheer") + .2)); set(s.cheer, "x", 520); set(s.cheer, "y", 500 - Math.abs(Math.sin(t * 6)) * 20); op(s.hi, ramp(t, a("five"), a("five") + .2)); set(s.hi, "x", 1000); set(s.hi, "y", 500 - Math.abs(Math.sin(t * 6 + 1)) * 20);
    op(s.brain, ramp(t, a("brain"), a("brain") + .2)); set(s.brain, "x", 760); set(s.brain, "y", 650); op(s.heart, ramp(t, a("brain"), a("brain") + .2) * (.6 + .4 * Math.sin(t * 6))); set(s.heart, "x", 840); set(s.heart, "y", 600);
    op(s.c, ramp(t, a("feeling"), a("feeling") + .2)); popAt(s.c, 760, 820, t, a("feeling")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  const CX = 600, CY = 480;
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 170, ry: 76, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: 16, "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: INK}, "💡 LIGHT");
  const br = [["natural", "🌿 NATURAL SOURCES", "#06d6a0", 370, 300, ["Sun (a star) · other stars", "lightning", "fireflies · jellyfish · glow-worms"]], ["manmade", "🏭 MAN-MADE SOURCES", "#3a86ff", 900, 300, ["light bulbs", "fireworks", "candles · torches"]]];
  s.br = br.map(([k, n, col, x, y, subs]) => { const line = el("path", {d: `M${CX} ${CY} Q${(CX + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 32}), x, y, tw: subs.map(sn => chip(s.stage, sn, "#fff", {fs: 26, ink: INK}))}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr13"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  const IH = 224 * 2000 / 780; s.scr = el("g", {"clip-path": "url(#scr13)"}, s.phone); s.shot = el("image", {href: "oneapp_mind2.png", x: -112, y: -122, width: 224, height: IH, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("light"), a("light") + .2)); tf(s.center, `translate(${CX} ${CY}) scale(${pop(t, a("light"))})`);
    s.br.forEach(b => { const k = a(b.k); set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .1, k + .3)); popAt(b.c, b.x, b.y, t, k + .1);
      b.tw.forEach((tw, j) => { const tt = a("add") + j * .3 + (b.k === "manmade" ? .15 : 0); op(tw, ramp(t, tt, tt + .2)); popAt(tw, b.x, 600 + j * 76, t, tt); }); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 640, 150, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1380, ph)} 560) rotate(${lerp(12, -4, ph)})`);
    const nx = a("ultimate") + .6; const off = -122 - (IH - 327) * ramp(t, a("save"), nx); set(s.shot, "y", off); const sc = IH / 2000;
    set(s.ring, "x", -112 + 36 * sc * 780 / 780 * (224 / 224)); set(s.ring, "y", off + 1722 * sc); set(s.ring, "width", 156 * sc); set(s.ring, "height", 72 * sc);
    op(s.ring, on(t, nx, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#3a0ca3", "#f72585");
  s.ans = el("g", {}, s.stage); el("rect", {x: -380, y: -70, width: 760, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: "#fff"}, "🌿 Nature or 🧑 people!");
  s.moon = emo(s.stage, 0, 0, 130, "🌙");
  s.boxes = [0, 1, 2].map(i => { const g = el("g", {}, s.stage); el("rect", {x: -110, y: -110, width: 220, height: 220, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 6}, g); tx(g, {x: 0, y: 34, "text-anchor": "middle", "font-size": 100, "font-weight": 700, fill: "#ffbe0b"}, String(i + 1)); return g; });
  s.q = chip(s.stage, "🌿 natural or 🏭 man-made?", "#1b1b3a", {fs: 40});
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("nature"), a("nature") + .15) * (1 - tn)); tf(s.ans, `translate(760 420) scale(${pop(t, a("nature"))})`);
    op(s.moon, ramp(t, a("tonight"), a("tonight") + .2)); set(s.moon, "x", 1300); set(s.moon, "y", 220);
    s.boxes.forEach((g, i) => { const tt = a("three") + i * .2; op(g, ramp(t, tt, tt + .2)); tf(g, `translate(${420 + i * 340} 430) scale(${pop(t, tt)})`); });
    op(s.q, ramp(t, a("decide"), a("decide") + .2)); popAt(s.q, 760, 720, t, a("decide")); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "The Moon has never shone.");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Not once. 🌕");
  s.run = () => {}; return s; })();

