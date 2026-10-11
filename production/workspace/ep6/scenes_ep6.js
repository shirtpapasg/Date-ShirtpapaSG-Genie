/* =================== SCENES (Episode 6: digestion part 1 — mouth to stomach) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
function plate(p) { const g = el("g", {}, p); el("ellipse", {rx: 300, ry: 190, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
  el("ellipse", {cx: -70, cy: 0, rx: 140, ry: 90, fill: "#fff8e7", stroke: "#e9d8a6", "stroke-width": 5}, g); seed = 3; for (let i = 0; i < 60; i++) el("ellipse", {cx: -70 + (rnd() - .5) * 230, cy: (rnd() - .5) * 140, rx: 8, ry: 4, fill: "#fff", stroke: "#e9d8a6", "stroke-width": 1.5, transform: ""}, g);
  for (let i = 0; i < 4; i++) el("rect", {x: 60 + i * 34, y: -80, width: 30, height: 150, rx: 10, fill: "#ffe8cc", stroke: "#d4a373", "stroke-width": 4, transform: `rotate(${8 - i * 4} ${75 + i * 34} 0)`}, g);
  [0, 1, 2].forEach(i => el("ellipse", {cx: 220, cy: -60 + i * 50, rx: 28, ry: 18, fill: "#95d5b2", stroke: INK, "stroke-width": 3}, g)); return g; }
function cube(p, x, y, s, col = "#ffb703") { const g = el("g", {transform: `translate(${x} ${y})`}, p);
  el("path", {d: `M0 ${-s} L${s * .87} ${-s / 2} L0 0 L${-s * .87} ${-s / 2} Z`, fill: mix(col, "#ffffff", .35), stroke: INK, "stroke-width": 3}, g);
  el("path", {d: `M${-s * .87} ${-s / 2} L0 0 L0 ${s} L${-s * .87} ${s / 2} Z`, fill: col, stroke: INK, "stroke-width": 3}, g);
  el("path", {d: `M${s * .87} ${-s / 2} L0 0 L0 ${s} L${s * .87} ${s / 2} Z`, fill: mix(col, "#000000", .2), stroke: INK, "stroke-width": 3}, g); return g; }
function stomachShape(p) { return el("path", {d: "M-60 -160 Q-40 -60 -120 20 Q-190 120 -60 170 Q80 210 150 80 Q190 -40 60 -60 Q10 -70 0 -160 Z", fill: "#c77dff", stroke: INK, "stroke-width": 7}, p); }

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#ffd166", "#ef476f");
  s.pl = plate(s.stage); s.mouth = emo(s.stage, 0, 0, 180, "👄"); s.chick = emo(s.stage, 0, 0, 90, "🍗");
  s.before = tx(s.stage, {x: 1160, y: 300, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "BEFORE you");
  s.before2 = tx(s.stage, {x: 1160, y: 410, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "swallow?!");
  s.mark = chip(s.stage, "✗ −1 mark", "#e63946", {fs: 44});
  s.run = t => { const a = w => C("hook", w);
    tf(s.pl, `translate(500 520) scale(${pop(t, .2)})`);
    const k = ramp(t, a("digested") - .5, a("digested") + .6); op(s.chick, 1); set(s.chick, "x", lerp(640, 560, k)); set(s.chick, "y", lerp(500, 250, k) - Math.sin(k * Math.PI) * 80);
    op(s.mouth, ramp(t, a("digested") - .3, a("digested"))); set(s.mouth, "x", 560); set(s.mouth, "y", 200);
    op(s.before, ramp(t, a("before"), a("before") + .2)); op(s.before2, ramp(t, a("swallow"), a("swallow") + .2)); tf(s.before2, `translate(1160 410) scale(${pop(t, a("swallow"))}) translate(-1160 -410)`);
    op(s.mark, on(t, a("lose"), a("do"), .2)); popAt(s.mark, 1160, 560, t, a("lose")); }; return s; })();

// ---- WHAT IS DIGESTION
S.what = (() => { const s = scene("what", "#90e0ef", "#48cae4");
  s.big = el("rect", {x: -130, y: -130, width: 260, height: 260, rx: 30, fill: "#ffb703", stroke: INK, "stroke-width": 8}, s.stage);
  s.bits = []; seed = 8; for (let i = 0; i < 40; i++) s.bits.push({a: rnd() * 6.28, r: 60 + rnd() * 240, e: el("circle", {r: 6 + rnd() * 8, fill: ["#ffb703", "#fb8500", "#ffd166"][i % 3], stroke: INK, "stroke-width": 2}, s.stage)});
  s.kid = emo(s.stage, 1200, 430, 220, "🧍"); s.spark = emo(s.stage, 1290, 300, 80, "✨");
  s.lbl = chip(s.stage, "big pieces ➜ SIMPLER SUBSTANCES your body can use", "#7b61ff", {fs: 32});
  s.route = el("g", {}, s.stage); [["👄", "mouth"], ["⬇️", "gullet"], ["🫃", "stomach"]].forEach(([e, n], i) => { emo(s.route, 300 + i * 260, 720, 80, e); tx(s.route, {x: 300 + i * 260, y: 800, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 6}, n); });
  s.run = t => { const a = w => C("what", w); const br = ramp(t, a("breaking"), a("breaking") + 1);
    op(s.big, 1 - br); tf(s.big, `translate(560 400) rotate(${Math.sin(t * 2) * 4}) scale(${pop(t, SC.what.t0 - .2) * (1 - br * .5)})`);
    s.bits.forEach(b => { const k = br, use = ramp(t, a("use"), a("use") + 1.4); set(b.e, "cx", 560 + Math.cos(b.a) * b.r * k + use * (640 - Math.cos(b.a) * b.r * k)); set(b.e, "cy", 400 + Math.sin(b.a) * b.r * k * .7 + use * (30 - Math.sin(b.a) * b.r * k * .7)); op(b.e, br * (1 - use * .9)); });
    op(s.kid, ramp(t, a("body"), a("body") + .2)); op(s.spark, ramp(t, a("use"), a("use") + .5) * (.6 + .4 * Math.sin(t * 6)));
    op(s.lbl, ramp(t, a("simpler"), a("simpler") + .2)); popAt(s.lbl, 760, 160, t, a("simpler"));
    op(s.route, ramp(t, a("follow"), a("follow") + .3)); }; return s; })();

// ---- TEETH (two jobs + cube model)
S.teeth = (() => { const s = scene("teeth", "#ffccd5", "#ffb3c1");
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
    for (let i = 0; i < N; i++) { const x = x0 + i * W, edge = curve(x, sgn), len = 58 - Math.abs(i - (N - 1) / 2) * 5, tip = edge - sgn * (len + 22), r = 12;
      const y1 = edge, y2 = tip; // root under the gum, tip toward the middle of the mouth
      const d = sgn < 0 ? `M${x - W / 2} ${y1} L${x + W / 2} ${y1} L${x + W / 2} ${y2 - r} Q${x + W / 2} ${y2} ${x + W / 2 - r} ${y2} L${x - W / 2 + r} ${y2} Q${x - W / 2} ${y2} ${x - W / 2} ${y2 - r} Z`
                        : `M${x - W / 2} ${y1} L${x + W / 2} ${y1} L${x + W / 2} ${y2 + r} Q${x + W / 2} ${y2} ${x + W / 2 - r} ${y2} L${x - W / 2 + r} ${y2} Q${x - W / 2} ${y2} ${x - W / 2} ${y2 + r} Z`;
      el("path", {d, fill: "#fffdf7", stroke: "#adb5bd", "stroke-width": 3, "stroke-linejoin": "round"}, grp); }
    el("path", {d: sgn < 0 ? "M-300 -30 Q0 -178 300 -30" : "M-300 30 Q0 178 300 30", stroke: "#ff8fa3", "stroke-width": 44, fill: "none"}, grp);
  });
  s.chunks = []; seed = 2; for (let i = 0; i < 12; i++) s.chunks.push({dx: (rnd() - .5) * 360, dy: (rnd() - .5) * 60, e: el("rect", {width: 30, height: 24, rx: 6, fill: "#ffe8cc", stroke: "#d4a373", "stroke-width": 3}, s.mouth)});
  s.big = el("rect", {x: -90, y: -40, width: 180, height: 80, rx: 18, fill: "#ffe8cc", stroke: "#d4a373", "stroke-width": 5}, s.mouth);
  s.j1 = chip(s.stage, "JOB ①: easier to SWALLOW", "#06d6a0", {fs: 36}); s.j2 = chip(s.stage, "JOB ②: more SURFACE for digestive juices", "#ff9f1c", {fs: 34});
  s.cubeBig = cube(s.stage, 0, 0, 150); s.cubes = []; for (let i = 0; i < 8; i++) s.cubes.push(cube(s.stage, 0, 0, 70));
  s.f6 = chip(s.stage, "1 cube = 6 faces", "#1b1b3a", {fs: 34}); s.f48 = chip(s.stage, "8 small cubes = 48 faces!", "#e63946", {fs: 34});
  s.drops = []; for (let i = 0; i < 10; i++) s.drops.push({ph: i / 10, e: emo(s.stage, 0, 0, 44, "💧")}); s.fast = chip(s.stage, "⏩ digestion is FASTER", "#3a86ff", {fs: 36});
  s.run = t => { const a = w => C("teeth1", w), b = w => C("teeth2", w); const two = ramp(t, b("imagine") - .3, b("imagine") + .1);
    op(s.mouth, 1 - two); tf(s.mouth, "translate(760 430)");
    const chew = t > a("chew") ? Math.abs(Math.sin((t - a("chew")) * 6)) : 0; tf(s.top, `translate(0 ${chew * 40})`); tf(s.bot, `translate(0 ${-chew * 40})`);
    const sp = ramp(t, a("chew"), a("smaller") + .5); op(s.big, 1 - sp); s.chunks.forEach(c => { set(c.e, "x", c.dx * sp - 15); set(c.e, "y", c.dy * sp - 12); op(c.e, sp); });
    op(s.j1, ramp(t, a("first"), a("first") + .2) * (1 - two)); popAt(s.j1, 760, 160, t, a("first"));
    op(s.j2, ramp(t, b("surface"), b("surface") + .2) * (1 - two)); popAt(s.j2, 760, 760 - 40, t, b("surface"));
    const cut = ramp(t, b("many"), b("many") + .8);
    op(s.cubeBig, two * (1 - cut)); tf(s.cubeBig, `translate(480 430) scale(${pop(t, b("imagine") - .2)})`);
    s.cubes.forEach((c, i) => { const gx = (i % 4) * 150, gy = Math.floor(i / 4) * 170; op(c, cut); tf(c, `translate(${lerp(480, 860 + gx, cut)} ${lerp(430, 330 + gy, cut)})`); });
    op(s.f6, two * ramp(t, b("one"), b("one") + .2) * (1 - cut * .4)); popAt(s.f6, 480, 180, t, b("one"));
    op(s.f48, ramp(t, b("surfaces"), b("surfaces") + .2)); popAt(s.f48, 1080, 180, t, b("surfaces"));
    s.drops.forEach((d, i) => { const k = ((t * .8 + d.ph) % 1); set(d.e, "x", 860 + (i % 4) * 150); set(d.e, "y", lerp(160, 360 + Math.floor(i / 5) * 170, k)); op(d.e, ramp(t, b("juices#2"), b("juices#2") + .3) * Math.sin(k * Math.PI)); });
    op(s.fast, ramp(t, b("faster"), b("faster") + .2)); popAt(s.fast, 760, 760 - 40, t, b("faster")); }; return s; })();

// ---- SALIVA + TONGUE
S.saliva = (() => { const s = scene("saliva", "#a2d2ff", "#bde0fe");
  s.mouth = el("path", {d: "M-330 -40 Q0 -230 330 -40 L330 40 Q0 230 -330 40 Z", fill: "#9d0208", stroke: INK, "stroke-width": 8}, s.stage);
  s.tongue = el("path", {d: "M-220 60 Q0 -10 220 60 Q0 160 -220 60 Z", fill: "#ff8fab", stroke: INK, "stroke-width": 6}, s.stage);
  s.bits = []; seed = 5; for (let i = 0; i < 14; i++) s.bits.push({x: (rnd() - .5) * 400, y: (rnd() - .5) * 80, e: el("rect", {width: 26, height: 20, rx: 6, fill: "#ffe8cc", stroke: "#d4a373", "stroke-width": 3}, s.stage)});
  s.ball = el("circle", {r: 0, fill: "#f3d5b5", stroke: "#d4a373", "stroke-width": 5}, s.stage);
  s.drops = []; for (let i = 0; i < 8; i++) s.drops.push({ph: i / 8, e: emo(s.stage, 0, 0, 46, "💧")});
  s.c1 = chip(s.stage, "SALIVA softens food + has digestive juices", "#00b4d8", {fs: 32}); s.c2 = chip(s.stage, "TONGUE tastes 😋 + rolls food into a ball", "#ff8fab", {fs: 32});
  s.stamp = el("g", {}, s.stage); el("rect", {x: -330, y: -60, width: 660, height: 120, rx: 18, fill: "none", stroke: "#e63946", "stroke-width": 10}, s.stamp); tx(s.stamp, {x: 0, y: 22, "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: "#e63946"}, "DIGESTION BEGINS HERE!");
  s.run = t => { const a = w => C("saliva", w); const X = 760, Y = 430;
    tf(s.mouth, `translate(${X} ${Y})`); tf(s.tongue, `translate(${X} ${Y}) scale(1 ${1 + .1 * Math.sin(t * 3) * ramp(t, a("rolls"), a("rolls") + .3)})`);
    const soft = ramp(t, a("softens"), a("softens") + 1), roll = ramp(t, a("rolls"), a("ball") + .5);
    s.bits.forEach(b => { set(b.e, "x", X + b.x * (1 - roll) - 13); set(b.e, "y", Y + b.y * (1 - roll) - 10); set(b.e, "fill", mix("#ffe8cc", "#f3d5b5", soft)); op(b.e, 1 - roll); });
    set(s.ball, "cx", X); set(s.ball, "cy", Y); set(s.ball, "r", 70 * roll);
    s.drops.forEach((d, i) => { const k = ((t * .7 + d.ph) % 1); set(d.e, "x", X - 250 + i * 70); set(d.e, "y", lerp(Y - 140, Y, k)); op(d.e, on(t, a("saliva#2"), a("tongue"), .3) * Math.sin(k * Math.PI)); });
    op(s.c1, ramp(t, a("softens"), a("softens") + .2)); popAt(s.c1, 760, 160, t, a("softens"));
    op(s.c2, ramp(t, a("tongue"), a("tongue") + .2)); popAt(s.c2, 760, 700, t, a("tongue"));
    op(s.stamp, ramp(t, a("begins"), a("begins") + .15)); tf(s.stamp, `translate(760 430) rotate(-8) scale(${1.5 - .5 * ramp(t, a("begins"), a("begins") + .25)})`); }; return s; })();

// ---- TOOTHACHE
S.tooth = (() => { const s = scene("tooth", "#ffd6a5", "#fdffb6");
  s.t = emo(s.stage, 0, 0, 260, "🦷"); s.face = emo(s.stage, 0, 0, 160, "😖"); s.ache = el("g", {stroke: "#e63946", "stroke-width": 10, "stroke-linecap": "round"}, s.stage);
  [[-170, -100, -230, -150], [170, -100, 230, -150], [-190, 20, -260, 20], [190, 20, 260, 20]].forEach(([a, b, c, d]) => el("line", {x1: a, y1: b, x2: c, y2: d}, s.ache));
  s.c1 = chip(s.stage, "hurts to chew ➜ hard to swallow and eat", "#e63946", {fs: 32}); s.c2 = chip(s.stage, "🪥 care for your teeth + see a dentist", "#06d6a0", {fs: 34});
  s.run = t => { const a = w => C("tooth", w);
    op(s.t, 1); set(s.t, "x", 0); set(s.t, "y", 0); tf(s.t, `translate(560 430) rotate(${Math.sin(t * 18) * 4 * on(t, SC.tooth.t0, a("so"), .2)})`);
    op(s.ache, on(t, SC.tooth.t0, a("so"), .2) * (.6 + .4 * Math.sin(t * 10))); tf(s.ache, "translate(560 430)");
    op(s.face, ramp(t, a("hurts"), a("hurts") + .2)); set(s.face, "x", 1050); set(s.face, "y", 330);
    op(s.c1, ramp(t, a("hard"), a("hard") + .2)); popAt(s.c1, 1050, 520, t, a("hard"));
    op(s.c2, ramp(t, a("dentist") - .3, a("dentist"))); popAt(s.c2, 1050, 640, t, a("dentist") - .3); }; return s; })();

// ---- GULLET
S.gullet = (() => { const s = scene("gullet", "#caffbf", "#9bf6ff");
  s.tube = el("rect", {x: -45, y: 150, width: 90, height: 520, rx: 44, fill: "#ffafcc", stroke: INK, "stroke-width": 7}, s.stage);
  s.mouth = emo(s.stage, 0, 110, 110, "👄"); s.st = stomachShape(s.stage);
  s.ball = el("circle", {r: 34, fill: "#f3d5b5", stroke: "#d4a373", "stroke-width": 5}, s.stage);
  s.sq = [0, 1].map(() => el("ellipse", {rx: 58, ry: 18, fill: "none", stroke: "#e63946", "stroke-width": 9}, s.stage));
  s.c1 = chip(s.stage, "GULLET: a muscular tube", "#ef476f", {fs: 36}); s.c2 = chip(s.stage, "muscles SQUEEZE + push food down ⬇", "#ff9f1c", {fs: 32}); s.c3 = chip(s.stage, "✗ does NOT digest food, just moves it", "#1b1b3a", {fs: 32});
  s.run = t => { const a = w => C("gullet", w); const X = 560;
    tf(s.tube, `translate(${X} 0)`); set(s.mouth, "x", X); tf(s.st, `translate(${X + 40} 790) scale(.7)`);
    const k = t > a("swallow") ? ((t - a("swallow")) * .28) % 1 : 0; const y = lerp(170, 650, k);
    set(s.ball, "cx", X); set(s.ball, "cy", y); op(s.ball, t > a("swallow") ? 1 : 0);
    s.sq.forEach((q, i) => { set(q, "cx", X); set(q, "cy", y - 60 - i * 40); op(q, ramp(t, a("squeeze"), a("squeeze") + .2)); });
    op(s.c1, ramp(t, a("muscular"), a("muscular") + .2)); popAt(s.c1, 1150, 240, t, a("muscular"));
    op(s.c2, ramp(t, a("squeeze"), a("squeeze") + .2)); popAt(s.c2, 1150, 400, t, a("squeeze"));
    op(s.c3, ramp(t, a("not"), a("not") + .2)); popAt(s.c3, 1150, 560, t, a("not")); }; return s; })();

// ---- SAFETY (windpipe vs gullet)
S.safety = (() => { const s = scene("safety", "#ffadad", "#ff595e");
  s.wp = el("g", {}, s.stage); el("rect", {x: -40, y: 0, width: 80, height: 500, rx: 30, fill: "#bde0fe", stroke: INK, "stroke-width": 7}, s.wp); for (let i = 0; i < 12; i++) el("line", {x1: -40, y1: 30 + i * 40, x2: 40, y2: 30 + i * 40, stroke: "#4cc9f0", "stroke-width": 6}, s.wp);
  s.gu = el("g", {}, s.stage); el("rect", {x: -40, y: 0, width: 80, height: 500, rx: 30, fill: "#ffafcc", stroke: INK, "stroke-width": 7}, s.gu);
  s.l1 = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, "WINDPIPE (air)"); s.l2 = tx(s.stage, {x: 0, y: 0, "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, "GULLET (food)");
  s.food = el("circle", {r: 30, fill: "#f3d5b5", stroke: "#d4a373", "stroke-width": 5}, s.stage); s.talk = emo(s.stage, 0, 0, 120, "🗣️"); s.cough = emo(s.stage, 0, 0, 140, "😵");
  s.rule = el("g", {}, s.stage); el("rect", {x: -380, y: -55, width: 760, height: 110, rx: 55, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.rule); tx(s.rule, {x: 0, y: 20, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#fff"}, "✓ chew ➜ swallow ➜ then talk");
  s.run = t => { const a = w => C("safety", w);
    tf(s.wp, "translate(480 200)"); tf(s.gu, "translate(640 200)"); set(s.l1, "x", 360); set(s.l1, "y", 170); set(s.l2, "x", 760); set(s.l2, "y", 170);
    op(s.wp, ramp(t, a("windpipe"), a("windpipe") + .2)); op(s.l1, ramp(t, a("windpipe"), a("windpipe") + .2)); op(s.l2, 1);
    const wrong = ramp(t, a("instead") - .6, a("instead") + .4); const k = clamp((t - a("talk") - .2) / 1.4);
    set(s.food, "cx", lerp(640, 480, wrong)); set(s.food, "cy", lerp(220, 480, k)); op(s.food, on(t, a("talk"), a("so"), .2));
    op(s.talk, on(t, a("talk"), a("so"), .2)); set(s.talk, "x", 1050); set(s.talk, "y", 330);
    op(s.cough, on(t, a("cough"), a("so"), .2)); set(s.cough, "x", 1050 + Math.sin(t * 30) * 8); set(s.cough, "y", 520);
    op(s.rule, ramp(t, a("chew"), a("chew") + .2)); tf(s.rule, `translate(760 760) scale(${pop(t, a("chew"))})`); }; return s; })();

// ---- STOMACH
S.stomach = (() => { const s = scene("stomach", "#e0aaff", "#c77dff");
  s.bag = el("g", {}, s.stage); s.shape = stomachShape(s.bag); s.mixIn = el("circle", {r: 0, fill: "#f3d5b5", opacity: .8}, s.bag);
  s.bits = []; seed = 6; for (let i = 0; i < 18; i++) s.bits.push({x: (rnd() - .5) * 200, y: (rnd() - .3) * 200, ph: rnd() * 6, e: el("rect", {width: 22, height: 18, rx: 5, fill: "#ffe8cc", stroke: "#d4a373", "stroke-width": 3}, s.bag)});
  s.drops = []; for (let i = 0; i < 8; i++) s.drops.push({ph: i / 8, e: emo(s.bag, 0, 0, 40, "🧪")});
  s.clock = emo(s.stage, 0, 0, 110, "⏰");
  s.c1 = chip(s.stage, "STOMACH: a muscular bag", "#7b2cbf", {fs: 36}); s.c2 = chip(s.stage, "holds food for a few hours", "#fff", {fs: 30, ink: INK}); s.c3 = chip(s.stage, "makes DIGESTIVE JUICES + churns", "#06d6a0", {fs: 32}); s.c4 = chip(s.stage, "food is PARTLY digested ➜ soupy", "#ff9f1c", {fs: 32});
  s.run = t => { const a = w => C("stomach", w); const ch = ramp(t, a("churns"), a("churns") + .3);
    tf(s.bag, `translate(520 460) scale(${1.25 + .05 * ch * Math.sin(t * 7)}) rotate(${ch * 4 * Math.sin(t * 5)})`);
    const soup = ramp(t, a("partly"), a("soupy") + .5);
    s.bits.forEach(b => { set(b.e, "x", b.x + Math.sin(t * 3 + b.ph) * 20 * ch - 11); set(b.e, "y", b.y + Math.cos(t * 3 + b.ph) * 14 * ch - 9); op(b.e, ramp(t, SC.stomach.t0, SC.stomach.t0 + .5) * (1 - soup)); });
    set(s.mixIn, "r", 120 * soup); set(s.mixIn, "cx", 10); set(s.mixIn, "cy", 40);
    s.drops.forEach((d, i) => { const k = ((t * .6 + d.ph) % 1); set(d.e, "x", -120 + i * 34); set(d.e, "y", lerp(-140, 60, k)); op(d.e, ramp(t, a("juices"), a("juices") + .3) * Math.sin(k * Math.PI) * (1 - soup * .5)); });
    op(s.clock, on(t, a("hours"), a("makes"), .2)); set(s.clock, "x", 860); set(s.clock, "y", 300 + Math.sin(t * 4) * 6);
    [[s.c1, a("muscular"), 160], [s.c2, a("hours"), 300], [s.c3, a("juices"), 440], [s.c4, a("partly"), 580]].forEach(([c, tt, y]) => { op(c, ramp(t, tt, tt + .2)); popAt(c, 1150, y, t, tt); }); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.cards = [["👄", "MOUTH", "mouth"], ["⬇️", "GULLET", "gullet"], ["🫃", "STOMACH", "stomach"]].map(([e, n, w], i) => { const g = el("g", {}, s.stage);
    const face = el("rect", {x: -150, y: -170, width: 300, height: 340, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g); emo(g, 0, -40, 120, e);
    tx(g, {x: 0, y: 100, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: INK}, n); const mk = tx(g, {x: 0, y: 40, "text-anchor": "middle", "font-size": 200, "font-weight": 700, fill: i ? "#e63946" : "#06d6a0", class: "out", "stroke-width": 10, opacity: 0}, i ? "✗" : "✓"); return {g, face, mk, w, i}; });
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("it"), .2)); tf(s.pause, `translate(760 170) scale(${pop(t, a("pause"))}) translate(-760 -170)`);
    s.cards.forEach(c => { const tt = a(c.w); op(c.g, ramp(t, tt, tt + .2)); tf(c.g, `translate(${360 + c.i * 400} 480) scale(${pop(t, tt)})`);
      const rv = c.i === 0 ? b("mouth") : b(c.w); op(c.mk, ramp(t, rv, rv + .2)); set(c.face, "fill", t > rv ? (c.i ? "#ffccd5" : "#d8f3dc") : "#fff"); }); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["👄 Digestion begins in the mouth."], ["🦷 Teeth break food into smaller pieces: easier to swallow,", "     and more surface exposed to digestive juices."], ["⬇️ The gullet pushes food to the stomach."], ["🫃 The stomach mixes food with digestive juices and", "     digests it further."]];
  let y = -160; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 46, "font-size": 36, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 46 + 28; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("begins"), a("teeth"), a("gullet"), a("stomach#2")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (plan time + place)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "📅 PLAN THE TIME + PLACE");
  s.card = el("g", {}, s.stage); el("rect", {x: -560, y: -150, width: 1120, height: 300, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.card);
  s.parts = [["I will", "#1b1b3a", -500, -25], ["revise science for 10 min", "#3a86ff", -330, -25], ["at 8:00,", "#ef476f", -500, 75], ["at my desk", "#ff9f1c", -300, 75]].map(([w, c, x, y]) => tx(s.card, {x, y, "font-size": 44, "font-weight": 700, fill: c, opacity: 0}, w));
  s.clock = emo(s.stage, 0, 0, 120, "🕗"); s.desk = emo(s.stage, 0, 0, 120, "🪑");
  s.likely = chip(s.stage, "decide WHEN + WHERE ➜ much more likely to do it ✓", "#1b1b3a", {fs: 32});
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("plan"), a("plan") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("plan"))}) translate(-760 -180)`);
    op(s.card, ramp(t, a("will") - .3, a("will"))); tf(s.card, "translate(760 450)");
    [a("will"), a("revise"), a("eight"), a("desk")].forEach((tt, i) => op(s.parts[i], ramp(t, tt, tt + .2)));
    op(s.clock, ramp(t, a("eight"), a("eight") + .2)); set(s.clock, "x", 860); set(s.clock, "y", 680); op(s.desk, ramp(t, a("desk"), a("desk") + .2)); set(s.desk, "x", 1060); set(s.desk, "y", 680);
    op(s.likely, ramp(t, a("likely"), a("likely") + .2)); popAt(s.likely, 760, 790 - 30, t, a("likely")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 200, ry: 80, fill: "#9d4edd", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: -4, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "DIGESTIVE"); tx(s.center, {x: 0, y: 38, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#fff"}, "SYSTEM");
  const br = [["mouth", "👄 MOUTH", "#e63946", 380, 300, ["teeth", "saliva", "tongue"]], ["gullet", "⬇️ GULLET", "#ef476f", 340, 720, ["pushes food down"]], ["stomach", "🫃 STOMACH", "#7b2cbf", 1020, 720, ["mixes with juices"]]];
  s.br = br.map(([k, n, col, x, y, subs]) => { const line = el("path", {d: `M720 500 Q${(720 + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage);
    return {k, line, c: chip(s.stage, n, col, {fs: 34}), x, y, tw: subs.map(sn => chip(s.stage, sn, "#fff", {fs: 26, ink: INK}))}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr6"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr6)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("digestive"), a("digestive") + .2)); tf(s.center, `translate(720 500) scale(${pop(t, a("digestive"))})`);
    s.br.forEach(b => { const k = a(b.k); set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .1, k + .3)); popAt(b.c, b.x, b.y, t, k + .1);
      const n = b.tw.length; b.tw.forEach((tw, j) => { const tt = a("add") + j * .3 + (b.k === "mouth" ? 0 : b.k === "gullet" ? 1 : 1.3); op(tw, ramp(t, tt, tt + .2)); const ang = (j - (n - 1) / 2) * .8; popAt(tw, b.x + Math.sin(ang) * 250, b.y + (b.y < 500 ? -1 : 1) * 90, t, tt); }); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 760, 140, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1340, ph)} 560) rotate(${lerp(12, -4, ph)})`);
    const off = -122 - 260 * ramp(t, a("ultimate"), a("next")); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1235 / 1688)); set(s.ring, "width", 224 * (304 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, a("next"), SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.ans = el("g", {}, s.stage); el("rect", {x: -330, y: -70, width: 660, height: 140, rx: 70, fill: "#06d6a0", stroke: INK, "stroke-width": 7}, s.ans); tx(s.ans, {x: 0, y: 22, "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: "#fff"}, "👄 In the MOUTH!");
  s.face = emo(s.stage, 0, 0, 170, "😋"); s.cnt = tx(s.stage, {x: 1150, y: 520, "text-anchor": "middle", "font-size": 150, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "0");
  s.bubble = el("g", {}, s.stage); el("path", {d: "M-420 -80 H420 A40 40 0 0 1 460 -40 V40 A40 40 0 0 1 420 80 H-260 L-330 140 L-320 80 H-420 A40 40 0 0 1 -460 40 V-40 A40 40 0 0 1 -420 -80 Z", fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.bubble);
  tx(s.bubble, {x: 0, y: 14, "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: INK}, "🔢 How many chews per mouthful?");
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .2, a("your") + .1);
    op(s.ans, ramp(t, a("mouth"), a("mouth") + .15) * (1 - tn)); tf(s.ans, `translate(760 400) scale(${pop(t, a("mouth"))})`);
    op(s.face, tn); set(s.face, "x", 520); set(s.face, "y", 420 + Math.abs(Math.sin(t * 8)) * 12);
    op(s.cnt, tn); s.cnt.textContent = String(Math.min(20, Math.floor(Math.max(0, t - a("count")) * 4)));
    op(s.bubble, ramp(t, a("tell") - .3, a("tell"))); tf(s.bubble, `translate(820 760) scale(${pop(t, a("tell") - .3) * .85})`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Part 2: the 6.5-metre tube");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "inside your belly 🌀");
  s.run = () => {}; return s; })();

