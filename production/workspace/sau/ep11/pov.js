/* TheOneApp, Explored EP11: the picture-only shots (no narration, sound effects only). Load after ep11/scenes.js.
   coldOpen  a dark HDB bedroom at night: a hand presses the laptop's power key, CLICK, a game lights up; the laptop goes see-through
             and shows the chip inside (into the hook)
   povSand   outside shot of a beach, then we dive into the sand: grains loom up and rush past until one grain is YOU
   povLight  first person: you are the wafer, looking up. The mask slides over, the lamp flashes, light comes down in straight
             lines through the mask's gaps; under its opaque parts, shadow. The pattern glows on you. */
const FR = name => t => { const sc = SC[name]; return sc ? clamp((t - sc.t0) / Math.max(.01, sc.t1 - sc.t0)) : 0; };
// the seconds into a silent segment (so the Short can reuse a scene even if its narrated part differs)
const SEGT = (id, t) => { const sg = TL.segs.find(s => s.id === id); return sg ? t - sg.t0 : t - (SC.povSand ? SC.povSand.t0 : 0); };

S.coldOpen = (() => { const s = scene("coldOpen", "#0b0b1e", "#1b1b3a"), st = s.stage;
  s.room = el("g", {}, st); fullRect(s.room, "#0d0d24"); el("rect", {x: -170, y: 640, width: 1960, height: 500, fill: "#2b2118"}, s.room);       // desk
  el("rect", kA({x: 1240, y: 40, width: 360, height: 300, rx: 10, fill: "#16213e"}), s.room); el("line", {x1: 1420, y1: 40, x2: 1420, y2: 340, stroke: INK, "stroke-width": 6}, s.room);   // the window: night
  el("circle", {cx: 1520, cy: 110, r: 30, fill: "#f8f9fa", opacity: .8}, s.room); [[1290, 260], [1340, 300], [1480, 280], [1550, 250]].forEach(([x, y]) => el("rect", {x, y, width: 26, height: 60, fill: "#ffd166", opacity: .6}, s.room));   // HDB windows across
  s.glow = el("ellipse", {cx: 810, cy: 420, rx: 900, ry: 600, fill: "#4cc9f0", filter: "url(#blur)", opacity: 0}, st);
  s.lap = el("g", {transform: "translate(810 470)"}, st);
  el("path", kA({d: "M-520 330 L-440 180 H440 L520 330 Z", fill: "#adb5bd"}), s.lap);             // keyboard base (seen from the pupil's seat)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) el("rect", {x: -400 + c * 62 - r * 8 + (r * 16) / 2, y: 196 + r * 30, width: 52, height: 24, rx: 5, fill: "#495057"}, s.lap);
  s.key = el("rect", kA({x: 360, y: 196, width: 52, height: 24, rx: 5, fill: "#e63946", "stroke-width": 3}), s.lap);
  el("rect", kA({x: -460, y: -330, width: 920, height: 520, rx: 26, fill: "#343a40"}), s.lap); s.scr = el("rect", {x: -425, y: -298, width: 850, height: 458, rx: 10, fill: "#05050f"}, s.lap);
  s.game = el("g", {}, s.lap); const gc = kClip(s.game, ["rect", {x: -425, y: -298, width: 850, height: 458, rx: 10}]);
  el("rect", {x: -425, y: -298, width: 850, height: 458, fill: kGrad([[0, "#4cc9f0"], [1, "#bde0fe"]])}, gc); el("path", {d: "M-425 60 Q-250 -20 -60 50 T300 30 T425 40 V160 H-425 Z", fill: "#52b788", stroke: INK, "stroke-width": 4}, gc);
  el("rect", {x: -425, y: 110, width: 850, height: 50, fill: "#6b4423"}, gc); s.coin = el("circle", {cx: 220, cy: -140, r: 30, fill: "#ffd60a", stroke: INK, "stroke-width": 5}, gc);
  s.hero = el("g", {}, gc); el("rect", kA({x: -18, y: -50, width: 36, height: 50, rx: 8, fill: "#3a86ff", "stroke-width": 4}), s.hero); el("circle", kA({cx: 0, cy: -70, r: 20, fill: "#f1c27d", "stroke-width": 4}), s.hero);
  // the X-ray: the laptop's insides, with the chip
  s.xr = el("g", {}, s.lap); el("rect", {x: -520, y: 180, width: 1040, height: 150, fill: "#0b3d2e", opacity: .92}, s.xr); s.xc = el("g", {transform: "translate(0 255)"}, s.xr); kPackage(s.xc, 120);
  for (let i = 0; i < 6; i++) el("line", {x1: -420 + i * 60, y1: 210 + (i % 3) * 30, x2: -60, y2: 255, stroke: "#ffd166", "stroke-width": 3, opacity: .7}, s.xr);
  s.hand = el("g", {}, st); el("path", kA({d: "M0 0 Q-20 -40 0 -70 Q30 -90 60 -60 L120 40 L40 90 Z", fill: "#f1c27d"}), s.hand); el("rect", kA({x: -10, y: -110, width: 26, height: 70, rx: 13, fill: "#f1c27d", transform: "rotate(-20)"}), s.hand);
  el("path", kA({d: "M40 90 L120 40 L240 160 L150 220 Z", fill: "#3a86ff"}), s.hand);   // school-shirt sleeve
  s.run = t => { const k = t - SC.coldOpen.t0, lit = ramp(k, .5, .75), xr = ramp(k, 2.1, 2.5), push = ramp(k, 2.4, 3.6);
    tf(s.hand, `translate(${1270 - 120 * ramp(k, 0, .45) + 140 * ramp(k, .8, 1.3)} ${700 - 40 * ramp(k, 0, .45) + 160 * ramp(k, .8, 1.3)}) rotate(-25)`);
    set(s.key, "y", 196 + 5 * on(k, .45, .6, .05)); set(s.scr, "fill", mix("#05050f", "#ffffff", lit * .2)); op(s.game, lit); op(s.glow, .35 * lit);
    tf(s.hero, `translate(${-180 + 60 * Math.max(0, k - .8)} ${100 - 120 * Math.abs(Math.sin(Math.max(0, k - .8) * 2.4))})`); op(s.coin, k > 2 ? 0 : 1);
    op(s.xr, xr); tf(s.xc, `translate(0 255) scale(${1 + .15 * Math.sin(k * 8) * xr})`);
    op(s.room, 1 - .4 * push); tf(s.lap, `translate(810 ${470 - 260 * push}) scale(${1 + 2.6 * push * push})`); };
  return s; })();

S.povSand = (() => { const s = scene("povSand", "#8ecae6", "#f2d49b"), st = s.stage;
  s.out = el("g", {}, st); fullRect(s.out, "#8ecae6"); el("rect", {x: -170, y: 380, width: 1960, height: 120, fill: "#219ebc"}, s.out); el("circle", {cx: 1350, cy: 140, r: 80, fill: "#ffd60a", stroke: INK, "stroke-width": 6}, s.out);
  s.waves = [0, 1, 2].map(i => el("path", {fill: "none", stroke: "#fff", "stroke-width": 6, opacity: .7, "stroke-linecap": "round"}, s.out));
  el("path", {d: "M-170 520 Q400 480 810 520 T1790 500 V1100 H-170 Z", fill: "#f2d49b", stroke: INK, "stroke-width": 5}, s.out);
  seed = 13; for (let i = 0; i < 160; i++) el("circle", {cx: -150 + rnd() * 1920, cy: 540 + rnd() * 480, r: 2 + rnd() * 4, fill: ["#d4a373", "#e9c46a", "#b08968"][i % 3]}, s.out);
  s.in = el("g", {}, st); fullRect(s.in, "#e9c891");
  s.F = field(s.in, 70, 5, (e, i) => { kGrain(e, 60 + (i % 5) * 12, 100 + i, ["#f2d49b", "#e9c46a", "#d4a373", "#f8e1b5"][i % 4]); }, .2);
  s.me = el("g", {}, s.in); s.meGlow = el("circle", {r: 150, fill: "#ffe14d", filter: "url(#blur)"}, s.me); s.meG = kGrain(s.me, 100, 5); s.face = kFace(s.me, 62);
  s.vig = vignette(s.in, "#ffbe0b", .5);
  s.card = povCard(st, "You: a grain of sand 🏖️", "#f77f00");
  s.run = t => { const k = SEGT("c1", t), dive = ramp(k, .5, 1.3), fly = ramp(k, .9, 2.4);
    s.waves.forEach((w, i) => { const x = -100 + ((t * 90 + i * 600) % 1900); set(w, "d", `M${x} ${420 + i * 22} q40 -16 80 0 t80 0`); });
    op(s.out, 1 - ramp(k, 1.0, 1.4)); tf(s.out, `translate(${VP[0]} 760) scale(${1 + 5 * dive * dive}) translate(${-VP[0]} -760)`);
    op(s.in, ramp(k, 1.0, 1.4)); flyField(s.F, fly * 1.4 + .05 * Math.max(0, k - 2.4), 1100);
    const me = ramp(k, 2.1, 2.6); tf(s.me, `translate(${VP[0]} ${VP[1]}) scale(${me * (1 + .03 * Math.sin(t * 3))})`); op(s.meGlow, .55 * me); s.face.blink(t);
    showCard(s.card, t, SC.povSand.t0 + 2.3, SC.povSand.t1 + .3, SHORT ? 960 : 905); };
  return s; })();

S.povLight = (() => { const s = scene("povLight", "#14082b", "#3c096c"), st = s.stage, H = 330, N = 9;
  fullRect(st, "#120a24");
  s.ground = el("g", {}, st); s.ceil = el("g", {}, st); s.beams = el("g", {}, st);
  // rows of the pattern in depth: each row has openings (light) and chrome (shadow); x in world units, depth z from 1 (near) to 9 (far)
  const COLS = [[-3.2, -2.2, 1], [-2.2, -1.4, 0], [-1.4, -.4, 1], [-.4, .5, 0], [.5, 1.6, 1], [1.6, 2.3, 0], [2.3, 3.3, 1]];
  s.rows = []; for (let z = 0; z < N; z++) { const r = {z, g: [], c: [], b: []}; COLS.forEach(([a, b, open]) => { r.g.push(el("path", {stroke: INK, "stroke-width": 1.5}, s.ground)); r.c.push(el("path", {stroke: INK, "stroke-width": 1.5}, s.ceil)); r.b.push(open ? el("path", {fill: "#e0aaff"}, s.beams) : null); r.open = r.open || []; r.open.push([a, b, open]); }); s.rows.push(r); }
  s.lamp = el("rect", {x: FULL.x, y: FULL.y, width: FULL.w, height: 160, fill: "#e0aaff", opacity: 0}, st);
  s.flash = fullRect(st, "#f8f0ff", 0); s.vig = vignette(st, "#c77dff", .5);
  s.card = povCard(st, "the mask's shadow draws the pattern ✨", "#7209b7");
  s.run = t => { const k = t - SC.povLight.t0, slide = ramp(k, .1, 1.1), lit = ramp(k, 1.7, 1.85), fl = on(k, 1.72, 2.05, .1), drawn = ramp(k, 2.2, 2.8), cam = .6 * k;
    const P = (x, z, up) => { const zz = Math.max(.35, z - cam); return [VP[0] + x * 260 / zz, VP[1] + (up ? -1 : 1) * H / zz]; };
    s.rows.forEach(r => { const z0 = r.z + 1, z1 = r.z + 2; r.open.forEach(([a, b, open], i) => {
      const g = [P(a, z0), P(b, z0), P(b, z1), P(a, z1)], c = [P(a + 8 * (1 - slide), z0, 1), P(b + 8 * (1 - slide), z0, 1), P(b + 8 * (1 - slide), z1, 1), P(a + 8 * (1 - slide), z1, 1)];
      const d = q => "M" + q.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join("L") + "Z";
      set(r.g[i], "d", d(g)); set(r.g[i], "fill", open ? mix("#9d4edd", "#fde68a", drawn) : "#7b2cbf");
      set(r.c[i], "d", d(c)); set(r.c[i], "fill", open ? "#caf0f8" : "#212529"); op(r.c[i], open ? .25 : 1);
      if (r.b[i]) { set(r.b[i], "d", d([c[0], c[1], g[1], g[0]])); op(r.b[i], .45 * lit * (1 - .5 * ramp(k, 2.6, 3.3))); } }); });
    op(s.lamp, .5 * lit); op(s.flash, .9 * fl);
    showCard(s.card, t, SC.povLight.t0 + 2.3, SC.povLight.t1 + .2, SHORT ? 960 : 905); };
  return s; })();
