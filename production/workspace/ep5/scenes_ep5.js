/* =================== SCENES (Episode 5: human body systems) =================== */
const S = {};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (h1, h2, k) => { const a = hex(h1), b = hex(h2); return "rgb(" + a.map((v, i) => Math.round(lerp(v, b[i], clamp(k)))).join(",") + ")"; };
const SKIN = "#ffcfa3";
function kid(p, opt = {}) { const g = el("g", {}, p), K = {g};
  K.legs = el("g", {}, g); K.legL = el("path", {d: "M-50 560 L-60 780", stroke: "#3a86ff", "stroke-width": 62, "stroke-linecap": "round"}, K.legs); K.legR = el("path", {d: "M50 560 L60 780", stroke: "#3a86ff", "stroke-width": 62, "stroke-linecap": "round"}, K.legs);
  K.armL = el("path", {d: "M-120 300 Q-200 400 -190 540", stroke: SKIN, "stroke-width": 46, "stroke-linecap": "round", fill: "none"}, g); K.armR = el("path", {d: "M120 300 Q200 400 190 540", stroke: SKIN, "stroke-width": 46, "stroke-linecap": "round", fill: "none"}, g);
  el("rect", {x: -135, y: 260, width: 270, height: 320, rx: 80, fill: opt.shirt || "#ffbe0b", stroke: INK, "stroke-width": 6}, g);
  el("circle", {cx: 0, cy: 170, r: 90, fill: SKIN, stroke: INK, "stroke-width": 6}, g);
  el("circle", {cx: -30, cy: 160, r: 9, fill: INK}, g); el("circle", {cx: 30, cy: 160, r: 9, fill: INK}, g); el("path", {d: "M-28 205 Q0 228 28 205", stroke: INK, "stroke-width": 6, fill: "none", "stroke-linecap": "round"}, g);
  K.parts = {}; const P = (k, f) => { const pg = el("g", {opacity: 0}, g); f(pg); K.parts[k] = pg; };
  P("nose", pg => el("circle", {cx: 0, cy: 185, r: 15, fill: "#ff8fab", stroke: INK, "stroke-width": 4}, pg));
  P("windpipe", pg => el("rect", {x: -11, y: 240, width: 22, height: 95, rx: 10, fill: "#ffafcc", stroke: INK, "stroke-width": 4}, pg));
  P("lungs", pg => { el("path", {d: "M-14 330 Q-110 320 -100 450 Q-55 478 -14 440 Z", fill: "#ff8fab", stroke: INK, "stroke-width": 5}, pg); el("path", {d: "M14 330 Q110 320 100 450 Q55 478 14 440 Z", fill: "#ff8fab", stroke: INK, "stroke-width": 5}, pg); });
  P("heart", pg => emo(pg, 28, 375, 66, "❤️"));
  P("vessels", pg => el("path", {d: "M28 375 Q-90 430 -190 540 M28 375 Q120 470 190 540 M0 380 L-60 770 M10 390 L70 770 M0 300 L0 210", stroke: "#e63946", "stroke-width": 7, fill: "none", "stroke-dasharray": "14 8"}, pg));
  P("bones", pg => { el("path", {d: "M-55 590 L-62 770 M55 590 L62 770 M-120 310 Q-190 410 -185 530 M120 310 Q190 410 185 530 M0 270 L0 560", stroke: "#fff", "stroke-width": 13, "stroke-linecap": "round", fill: "none"}, pg);
    for (let i = 0; i < 4; i++) el("path", {d: `M-85 ${330 + i * 32} Q0 ${348 + i * 32} 85 ${330 + i * 32}`, stroke: "#fff", "stroke-width": 8, fill: "none"}, pg); el("circle", {cx: 0, cy: 160, r: 80, fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-dasharray": "10 6"}, pg); });
  P("muscles", pg => { el("ellipse", {cx: -175, cy: 400, rx: 30, ry: 52, fill: "#ff595e", stroke: INK, "stroke-width": 4}, pg); el("ellipse", {cx: 175, cy: 400, rx: 30, ry: 52, fill: "#ff595e", stroke: INK, "stroke-width": 4}, pg); el("ellipse", {cx: -58, cy: 650, rx: 28, ry: 60, fill: "#ff595e", stroke: INK, "stroke-width": 4}, pg); el("ellipse", {cx: 58, cy: 650, rx: 28, ry: 60, fill: "#ff595e", stroke: INK, "stroke-width": 4}, pg); });
  P("digestive", pg => { el("path", {d: "M0 230 L0 450", stroke: "#e0aaff", "stroke-width": 12}, pg); el("path", {d: "M-10 450 Q60 440 50 490 Q20 520 -30 500 Z", fill: "#c77dff", stroke: INK, "stroke-width": 5}, pg);
    el("path", {d: "M-50 515 q30 -14 60 0 q30 14 0 28 q-30 14 -60 0 q-30 -14 0 -28 M-70 555 q60 30 120 0", stroke: "#e0aaff", "stroke-width": 12, fill: "none", "stroke-linecap": "round"}, pg); });
  return K; }
const showParts = (K, ks, v) => ks.forEach(k => op(K.parts[k], v));

// ---- HOOK
S.hook = (() => { const s = scene("hook", "#4cc9f0", "#7209b7");
  s.K = kid(s.stage); s.icons = ["🫁", "❤️", "🦴", "💪", "🍽️"].map(e => emo(s.stage, 0, 0, 100, e));
  s.five = el("g", {}, s.stage); el("circle", {r: 88, fill: "#ffbe0b", stroke: INK, "stroke-width": 7}, s.five); tx(s.five, {x: 0, y: 44, "text-anchor": "middle", "font-size": 124, "font-weight": 700, fill: INK}, "5");
  s.trouble = chip(s.stage, "⚠ one stops = whole body in trouble", "#e63946", {fs: 32});
  s.run = t => { const a = w => C("hook", w);
    tf(s.K.g, `translate(760 40) scale(.85)`); showParts(s.K, ["lungs", "heart", "bones", "muscles", "digestive"], .35 + .35 * Math.sin(t * 3));
    s.icons.forEach((e, i) => { const an = t * .8 + i * 2 * Math.PI / 5; op(e, ramp(t, a("five") + i * .15, a("five") + .2 + i * .15)); set(e, "x", 760 + Math.cos(an) * 400); set(e, "y", 420 + Math.sin(an) * 280); });
    popAt(s.five, 1300, 180, t, a("five")); op(s.five, ramp(t, a("five"), a("five") + .2));
    op(s.trouble, on(t, a("trouble") - .2, a("can"), .2)); popAt(s.trouble, 760, 760 - 30, t, a("trouble") - .2); }; return s; })();

// ---- RUN
S.run = (() => { const s = scene("run", "#80ed99", "#57cc99");
  s.K = kid(s.stage, {shirt: "#ef476f"}); s.heart = emo(s.stage, 0, 0, 120, "❤️"); s.bpm = tx(s.stage, {x: 1200, y: 380, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: INK}, "");
  s.puffs = [0, 1, 2].map(() => el("ellipse", {rx: 40, ry: 26, fill: "#fff", opacity: 0}, s.stage)); s.food = emo(s.stage, 0, 0, 90, "🍔"); s.think = el("ellipse", {rx: 90, ry: 70, fill: "#fff", stroke: INK, "stroke-width": 5, opacity: 0}, s.stage);
  s.tog = chip(s.stage, "systems working TOGETHER", "#3a86ff", {fs: 36}); s.timer = chip(s.stage, "🏃 30 seconds", "#ff9f1c", {fs: 36});
  s.run = t => { const a = w => C("run", w); const go = on(t, a("run"), SC.run.t1 + 1, .3);
    const sw = Math.sin(t * 12) * 18 * go; set(s.K.legL, "d", `M-50 560 L${-60 + sw * 3} 780`); set(s.K.legR, "d", `M50 560 L${60 - sw * 3} 780`); tf(s.K.g, `translate(560 ${-30 + Math.abs(Math.sin(t * 12)) * -14 * go}) scale(.85)`);
    op(s.timer, on(t, a("run"), a("notice"), .2)); popAt(s.timer, 1100, 180, t, a("run"));
    const hb = ramp(t, a("heart"), a("heart") + .3); op(s.heart, hb); tf(s.heart, `translate(1050 380) scale(${1 + .18 * Math.max(0, Math.sin(t * (hb ? 16 : 6)))})`); set(s.heart, "x", 0); set(s.heart, "y", 0);
    s.bpm.textContent = hb ? "faster! ⬆" : ""; op(s.bpm, hb);
    s.puffs.forEach((p, i) => { const k = ((t * 1.3 + i / 3) % 1); set(p, "cx", 700 + k * 160); set(p, "cy", 150 - k * 40); op(p, ramp(t, a("breathe"), a("breathe") + .3) * (1 - k) * .9); });
    op(s.think, ramp(t, a("hungry"), a("hungry") + .2)); set(s.think, "cx", 820); set(s.think, "cy", 80 + 40); op(s.food, ramp(t, a("hungry"), a("hungry") + .2)); set(s.food, "x", 820); set(s.food, "y", 120);
    op(s.tog, ramp(t, a("together"), a("together") + .2)); popAt(s.tog, 1100, 600, t, a("together")); }; return s; })();

// ---- MODELS
S.models = (() => { const s = scene("models", "#ffd166", "#ff9f1c");
  s.m = el("g", {}, s.stage); el("rect", {x: -230, y: -260, width: 460, height: 520, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.m);
  const mk = kid(s.m); tf(mk.g, "translate(0 -250) scale(.6)"); showParts(mk, ["lungs", "heart"], 1); tx(s.m, {x: 0, y: 230, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "MODEL 📐");
  s.r = el("g", {}, s.stage); el("rect", {x: -230, y: -260, width: 460, height: 520, rx: 26, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.r);
  const rk = kid(s.r, {shirt: "#9d4edd"}); tf(rk.g, "translate(0 -250) scale(.6)"); showParts(rk, ["lungs", "heart", "vessels", "bones", "muscles", "digestive"], 1); tx(s.r, {x: 0, y: 230, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "REAL BODY 🤯");
  s.simp = chip(s.stage, "a model is SIMPLER, but helps us understand", "#1b1b3a", {fs: 32});
  s.run = t => { const a = w => C("models", w);
    op(s.m, ramp(t, a("model"), a("model") + .2)); tf(s.m, `translate(470 450) scale(${pop(t, a("model"))})`);
    op(s.r, ramp(t, a("real"), a("real") + .2)); tf(s.r, `translate(1050 450) scale(${pop(t, a("real"))})`);
    op(s.simp, ramp(t, a("helps"), a("helps") + .2)); popAt(s.simp, 760, 790 - 40, t, a("helps")); }; return s; })();

// ---- RESPIRATORY
S.resp = (() => { const s = scene("resp", "#a2d2ff", "#bde0fe");
  s.K = kid(s.stage, {shirt: "#90e0ef"}); s.num = tx(s.stage, {x: 160, y: 200, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "1");
  s.lab = [["nose", "NOSE"], ["windpipe", "WINDPIPE"], ["lungs", "LUNGS"]].map(([k, n], i) => ({k, c: chip(s.stage, n, "#ff8fab", {fs: 36}), x: 400, y: 240 + i * 130}));
  s.in = [0, 1, 2, 3].map(() => tx(s.stage, {"font-size": 30, "font-weight": 700, fill: "#3a86ff", "text-anchor": "middle"}, "O₂")); s.out = [0, 1, 2].map(() => el("circle", {r: 14, fill: "#adb5bd", stroke: INK, "stroke-width": 2}, s.stage));
  s.ex = chip(s.stage, "exchange of gases: oxygen IN ↘ waste gases OUT ↗", "#3a86ff", {fs: 30});
  s.run = t => { const a = w => C("resp", w);
    tf(s.K.g, "translate(860 0) scale(.95)"); op(s.num, ramp(t, SC.resp.t0 - .2, SC.resp.t0 + .1));
    const T = {nose: a("nose"), windpipe: a("windpipe"), lungs: a("lungs")}; for (const k in T) op(s.K.parts[k], ramp(t, T[k], T[k] + .2));
    tf(s.K.parts.lungs, `translate(0 390) scale(${1 + .07 * Math.sin(t * 3)}) translate(0 -390)`);
    s.lab.forEach(L => { op(L.c, ramp(t, T[L.k], T[L.k] + .2)); popAt(L.c, L.x, L.y, t, T[L.k]); });
    const g = on(t, a("take"), SC.resp.t1 + .5, .2);
    s.in.forEach((e, i) => { const k = ((t * .7 + i / 4) % 1); set(e, "x", 860 + lerp(-200, 0, k)); set(e, "y", lerp(150, 400, k)); op(e, g * Math.sin(k * Math.PI)); });
    s.out.forEach((e, i) => { const k = ((t * .7 + i / 3 + .5) % 1); set(e, "cx", 860 + lerp(0, 230, k)); set(e, "cy", lerp(190, 80, k)); op(e, ramp(t, a("waste"), a("waste") + .3) * Math.sin(k * Math.PI)); });
    op(s.ex, ramp(t, a("exchange"), a("exchange") + .2)); popAt(s.ex, 760, 790 - 40, t, a("exchange")); }; return s; })();

// ---- CIRCULATORY
S.circ = (() => { const s = scene("circ", "#ffccd5", "#ffb3c1");
  s.K = kid(s.stage, {shirt: "#ffe5ec"}); s.num = tx(s.stage, {x: 160, y: 200, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "2");
  s.cells = []; for (let i = 0; i < 18; i++) s.cells.push({ph: i / 18, e: el("circle", {r: 9, fill: "#d00000", stroke: INK, "stroke-width": 2}, s.stage)});
  const loop = [[888, 375], [800, 420], [700, 540], [790, 600], [828, 770], [900, 600], [1050, 540], [960, 430]];
  s.loop = loop;
  s.lab = [["heart", "HEART ❤️", 1300, 240], ["vessels", "BLOOD VESSELS", 1300, 340]].map(([k, n, x, y]) => ({k, c: chip(s.stage, n, "#e63946", {fs: 34}), x, y}));
  s.carry = [chip(s.stage, "🍎 digested food", "#06d6a0", {fs: 30}), chip(s.stage, "O₂ oxygen", "#3a86ff", {fs: 30}), chip(s.stage, "🗑 waste away", "#6c757d", {fs: 30})];
  s.duo = chip(s.stage, "🫁 + ❤️ work together", "#7209b7", {fs: 34});
  s.run = t => { const a = w => C("circ", w);
    tf(s.K.g, "translate(860 0) scale(.95)"); op(s.num, ramp(t, SC.circ.t0 - .2, SC.circ.t0 + .1));
    op(s.K.parts.heart, ramp(t, a("heart"), a("heart") + .2)); tf(s.K.parts.heart, `translate(28 375) scale(${1 + .15 * Math.max(0, Math.sin(t * 9))}) translate(-28 -375)`);
    op(s.K.parts.vessels, ramp(t, a("vessels"), a("vessels") + .2)); op(s.K.parts.lungs, on(t, a("respiratory"), SC.circ.t1 + .5, .2) * .8);
    const flow = on(t, a("blood#2") , SC.circ.t1 + .5, .3);
    s.cells.forEach(c => { const k = ((t * .25 + c.ph) % 1) * s.loop.length; const i = Math.floor(k), f = k - i; const A = s.loop[i], B = s.loop[(i + 1) % s.loop.length];
      set(c.e, "cx", lerp(A[0], B[0], f) * .95 + 860 * .05 - 43 + 43); set(c.e, "cy", lerp(A[1], B[1], f) * .95); op(c.e, flow); });
    s.lab.forEach(L => { const tt = a(L.k); op(L.c, ramp(t, tt, tt + .2)); popAt(L.c, L.x, L.y, t, tt); });
    [a("digested"), a("oxygen"), a("waste")].forEach((tt, i) => { op(s.carry[i], ramp(t, tt, tt + .2)); popAt(s.carry[i], 330, 300 + i * 110, t, tt); });
    op(s.duo, ramp(t, a("respiratory"), a("respiratory") + .2)); popAt(s.duo, 1300, 520, t, a("respiratory")); }; return s; })();

// ---- SKELETAL
S.skel = (() => { const s = scene("skel", "#1d3557", "#457b9d");
  s.num = tx(s.stage, {x: 160, y: 200, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "3");
  const g = el("g", {transform: "translate(760 0)"}, s.stage); s.sk = g; const B = "#fffdf7";
  const part = (k, f) => { const pg = el("g", {}, g); f(pg); return pg; };
  s.skull = part("skull", pg => { el("circle", {cx: 0, cy: 150, r: 80, fill: B, stroke: INK, "stroke-width": 6}, pg); el("circle", {cx: -28, cy: 145, r: 16, fill: INK}, pg); el("circle", {cx: 28, cy: 145, r: 16, fill: INK}, pg); el("rect", {x: -30, y: 195, width: 60, height: 22, rx: 6, fill: B, stroke: INK, "stroke-width": 4}, pg); });
  s.spine = part("spine", pg => { for (let i = 0; i < 11; i++) el("rect", {x: -16, y: 240 + i * 30, width: 32, height: 24, rx: 7, fill: B, stroke: INK, "stroke-width": 3}, pg); });
  s.ribs = part("ribs", pg => { for (let i = 0; i < 5; i++) { el("path", {d: `M-6 ${280 + i * 32} Q-120 ${270 + i * 32} -100 ${330 + i * 34}`, stroke: B, "stroke-width": 12, fill: "none", "stroke-linecap": "round"}, pg); el("path", {d: `M6 ${280 + i * 32} Q120 ${270 + i * 32} 100 ${330 + i * 34}`, stroke: B, "stroke-width": 12, fill: "none", "stroke-linecap": "round"}, pg); }
    for (let i = 0; i < 5; i++) { el("path", {d: `M-6 ${280 + i * 32} Q-120 ${270 + i * 32} -100 ${330 + i * 34}`, stroke: INK, "stroke-width": 2, fill: "none", opacity: .5}, pg); el("path", {d: `M6 ${280 + i * 32} Q120 ${270 + i * 32} 100 ${330 + i * 34}`, stroke: INK, "stroke-width": 2, fill: "none", opacity: .5}, pg); } });
  s.arms = part("arms", pg => el("path", {d: "M-110 270 L-170 400 L-190 530 M110 270 L170 400 L190 530 M-120 260 L120 260", stroke: B, "stroke-width": 16, "stroke-linecap": "round", fill: "none"}, pg));
  el("path", {d: "M-80 580 Q0 540 80 580 L60 620 L-60 620 Z", fill: B, stroke: INK, "stroke-width": 5}, g);
  s.femur = part("femur", pg => { [-50, 50].forEach(x => { el("path", {d: `M${x} 620 L${x * 1.1} 760`, stroke: B, "stroke-width": 24, "stroke-linecap": "round"}, pg); el("path", {d: `M${x} 620 L${x * 1.1} 760`, stroke: INK, "stroke-width": 2, opacity: .4}, pg); }); });
  s.fglow = el("path", {d: "M-50 620 L-55 760 M50 620 L55 760", stroke: "#ffe14d", "stroke-width": 40, "stroke-linecap": "round", opacity: 0}, g); g.insertBefore(s.fglow, s.femur);
  s.lab = [["skull", "SKULL protects brain 🧠", 1250, 160], ["rib", "RIB CAGE protects heart + lungs", 1220, 330], ["backbone", "BACKBONE holds you up", 1240, 470], ["femur", "FEMUR: longest bone 📏", 1240, 680]].map(([k, n, x, y]) => ({k, c: chip(s.stage, n, "#6c757d", {fs: 30}), x, y}));
  s.ear = el("g", {}, s.stage); el("circle", {r: 110, fill: "#fff", stroke: INK, "stroke-width": 7}, s.ear); emo(s.ear, 0, -10, 110, "👂"); s.ec = chip(s.ear, "smallest bones", "#7209b7", {fs: 26}); tf(s.ec, "translate(0 140)"); op(s.ec, 1);
  s.shape = chip(s.stage, "gives SHAPE + PROTECTS", "#1b1b3a", {fs: 34});
  s.run = t => { const a = w => C("skel", w); op(s.num, ramp(t, SC.skel.t0 - .2, SC.skel.t0 + .1));
    op(s.shape, on(t, a("shape"), a("skull") , .2)); popAt(s.shape, 420, 420, t, a("shape"));
    const T = {skull: a("skull"), rib: a("rib"), backbone: a("backbone"), femur: a("femur")};
    s.lab.forEach(L => { op(L.c, ramp(t, T[L.k], T[L.k] + .2)); popAt(L.c, L.x, L.y, t, T[L.k]); });
    [[s.skull, "skull"], [s.ribs, "rib"], [s.spine, "backbone"]].forEach(([e, k]) => tf(e, `translate(0 0) scale(${1 + .04 * on(t, T[k], T[k] + 1.2, .2)})`));
    op(s.fglow, .9 * on(t, a("longest"), a("smallest"), .2));
    op(s.ear, ramp(t, a("ear") - .3, a("ear"))); tf(s.ear, `translate(380 650) scale(${pop(t, a("ear") - .3)})`); }; return s; })();

// ---- MUSCULAR
S.musc = (() => { const s = scene("musc", "#ffadad", "#ffd6a5");
  s.num = tx(s.stage, {x: 160, y: 200, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "4");
  s.arm = el("g", {}, s.stage); el("rect", {x: -30, y: -20, width: 380, height: 60, rx: 30, fill: SKIN, stroke: INK, "stroke-width": 6}, s.arm);
  el("rect", {x: 0, y: -2, width: 330, height: 24, rx: 12, fill: "#fffdf7", stroke: INK, "stroke-width": 3}, s.arm);
  s.fore = el("g", {transform: "translate(350 10)"}, s.arm); el("rect", {x: -20, y: -28, width: 340, height: 56, rx: 28, fill: SKIN, stroke: INK, "stroke-width": 6}, s.fore); el("rect", {x: 0, y: -10, width: 300, height: 20, rx: 10, fill: "#fffdf7", stroke: INK, "stroke-width": 3}, s.fore); emo(s.fore, 345, 0, 80, "✊");
  s.bi = el("ellipse", {cx: 175, cy: -40, rx: 130, ry: 34, fill: "#ff595e", stroke: INK, "stroke-width": 5}, s.arm);
  s.tri = el("ellipse", {cx: 175, cy: 62, rx: 130, ry: 28, fill: "#ffadad", stroke: INK, "stroke-width": 5}, s.arm);
  s.cl = chip(s.stage, "CONTRACTS (shorter) 💪", "#e63946", {fs: 32}); s.rl = chip(s.stage, "RELAXES", "#ff9f1c", {fs: 32});
  s.no = chip(s.stage, "bones can't move on their own", "#1b1b3a", {fs: 32}); s.pair = chip(s.stage, "muscles work in PAIRS", "#7b61ff", {fs: 34});
  s.heart = emo(s.stage, 0, 0, 160, "❤️"); s.moon = emo(s.stage, 0, 0, 100, "🌙"); s.zz = tx(s.stage, {"font-size": 60, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 6}, "z z z");
  s.ctrl = chip(s.stage, "✓ arm: under your control", "#06d6a0", {fs: 32}); s.nctrl = chip(s.stage, "✗ heart: you can't control it", "#e63946", {fs: 32});
  s.run = t => { const a = w => C("musc1", w), b = w => C("musc2", w); op(s.num, ramp(t, SC.musc.t0 - .2, SC.musc.t0 + .1));
    const two = ramp(t, b("some") - .3, b("some") + .2);
    op(s.arm, 1 - two); const lift = t > a("lift") ? .5 - .5 * Math.cos((t - a("lift")) * 2.2) : (t > a("contracts") ? ramp(t, a("contracts"), a("contracts") + .8) : 0);
    tf(s.arm, "translate(330 520)"); set(s.fore, "transform", `translate(350 10) rotate(${-lift * 100})`);
    set(s.bi, "rx", 130 - 30 * lift); set(s.bi, "ry", 34 + 22 * lift); set(s.bi, "cx", 175 + 20 * lift); set(s.tri, "ry", 28 - 6 * lift);
    op(s.no, on(t, a("bones"), a("pairs"), .2)); popAt(s.no, 760, 180, t, a("bones"));
    op(s.pair, on(t, a("pairs"), SC.musc.t1, .2) * (1 - two)); popAt(s.pair, 760, 180, t, a("pairs"));
    op(s.cl, on(t, a("contracts"), b("some") - .2, .2)); popAt(s.cl, 1200, 360, t, a("contracts")); op(s.rl, on(t, a("relaxes"), b("some") - .2, .2)); popAt(s.rl, 1200, 700, t, a("relaxes"));
    op(s.ctrl, ramp(t, b("arm"), b("arm") + .2) * two); popAt(s.ctrl, 760, 220, t, b("arm"));
    op(s.heart, two * ramp(t, b("heart"), b("heart") + .2)); tf(s.heart, `translate(760 470) scale(${1 + .15 * Math.max(0, Math.sin(t * 7))})`); set(s.heart, "x", 0); set(s.heart, "y", 0);
    op(s.nctrl, ramp(t, b("cannot"), b("cannot") + .2)); popAt(s.nctrl, 760, 320, t, b("cannot"));
    op(s.moon, ramp(t, b("sleep"), b("sleep") + .2)); set(s.moon, "x", 1050); set(s.moon, "y", 430); op(s.zz, ramp(t, b("sleep"), b("sleep") + .2)); set(s.zz, "x", 1110); set(s.zz, "y", 380 - (t % 1) * 20); }; return s; })();

// ---- DIGESTIVE (preview)
S.dig = (() => { const s = scene("dig", "#e0aaff", "#c77dff");
  s.num = tx(s.stage, {x: 160, y: 200, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}, "5");
  const d = "M760 160 L760 380 Q800 360 840 400 Q860 460 780 470 Q700 470 720 520 Q760 560 840 540 Q900 580 820 610 Q700 640 760 680 L760 760";
  s.tube = el("path", {d, stroke: "#9d4edd", "stroke-width": 30, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": 1500, "stroke-dashoffset": 1500}, s.stage);
  s.tubeIn = el("path", {d, stroke: "#f3e8ff", "stroke-width": 14, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 1500, "stroke-dashoffset": 1500}, s.stage);
  s.mouth = emo(s.stage, 760, 130, 90, "👄"); s.food = emo(s.stage, 0, 0, 60, "🍗");
  s.simple = chip(s.stage, "food ➜ simpler substances your body can use", "#7209b7", {fs: 30});
  s.next = chip(s.stage, "🍗 Episodes 6 + 7: follow your lunch!", "#ff9f1c", {fs: 32});
  s.run = t => { const a = w => C("dig", w); op(s.num, ramp(t, SC.dig.t0 - .2, SC.dig.t0 + .1));
    const dr = ramp(t, a("starts"), a("intestines") + .3); set(s.tube, "stroke-dashoffset", 1500 * (1 - dr)); set(s.tubeIn, "stroke-dashoffset", 1500 * (1 - dr));
    op(s.mouth, ramp(t, a("mouth"), a("mouth") + .2)); const L = s.tube.getTotalLength(); const k = ((t - a("mouth")) * .12) % 1; if (t > a("mouth")) { const pt = s.tube.getPointAtLength(L * k); set(s.food, "x", pt.x); set(s.food, "y", pt.y); op(s.food, 1); } else op(s.food, 0);
    op(s.simple, ramp(t, a("simpler"), a("simpler") + .2)); popAt(s.simple, 760, 790 - 40, t, a("simpler"));
    op(s.next, ramp(t, a("next"), a("next") + .2)); popAt(s.next, 1200, 300, t, a("next")); }; return s; })();

// ---- LEONARDO
S.leo = (() => { const s = scene("leo", "#f4e1c1", "#e9c46a");
  s.page = el("g", {}, s.stage); el("rect", {x: -380, y: -260, width: 760, height: 520, rx: 10, fill: "#f8edd5", stroke: "#8d5524", "stroke-width": 6, filter: "url(#sh)"}, s.page);
  const ink = "#6f4518"; el("path", {d: "M-280 -120 L-40 -60 L180 -140", stroke: ink, "stroke-width": 14, fill: "none", "stroke-linecap": "round"}, s.page); el("circle", {cx: -40, cy: -60, r: 18, fill: "none", stroke: ink, "stroke-width": 5}, s.page);
  el("path", {d: "M-260 -160 Q-150 -230 -60 -110 M-60 -110 Q60 -230 170 -170", stroke: ink, "stroke-width": 5, fill: "none"}, s.page);
  for (let i = 0; i < 9; i++) el("line", {x1: -330, y1: 60 + i * 22, x2: -330 + 300 + (i % 3) * 40, y2: 60 + i * 22, stroke: ink, "stroke-width": 3, opacity: .5}, s.page);
  el("circle", {cx: 220, cy: 120, r: 80, fill: "none", stroke: ink, "stroke-width": 4}, s.page); el("path", {d: "M150 120 L290 120 M220 50 L220 190", stroke: ink, "stroke-width": 3, opacity: .6}, s.page);
  s.name = chip(s.stage, "🎨 Leonardo da Vinci · artist + scientist", "#8d5524", {fs: 32});
  s.eq = tx(s.stage, {x: 760, y: 770, "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "🎨 + 🔬 = 💡 curiosity");
  s.run = t => { const a = w => C("leo", w);
    op(s.page, ramp(t, a("drew") - .3, a("drew"))); tf(s.page, `translate(760 440) rotate(${-2 + Math.sin(t) * 1}) scale(${pop(t, a("drew") - .3)})`);
    op(s.name, ramp(t, a("leonardo"), a("leonardo") + .2)); popAt(s.name, 760, 140, t, a("leonardo"));
    op(s.eq, ramp(t, a("art"), a("art") + .2)); tf(s.eq, `translate(760 770) scale(${pop(t, a("art"))}) translate(-760 -770)`); }; return s; })();

// ---- QUIZ
S.quiz = (() => { const s = scene("quiz", "#b5179e", "#560bad");
  s.pause = tx(s.stage, {x: 760, y: 170, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "⏸ PAUSE & PREDICT!");
  s.q = [["❤️ + blood vessels = ?", "CIRCULATORY", "#e63946"], ["gives the body its shape = ?", "SKELETAL", "#6c757d"]].map(([q, a, col], i) => { const g = el("g", {}, s.stage);
    el("rect", {x: -560, y: -70, width: 1120, height: 140, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, g);
    tx(g, {x: -520, y: 16, "font-size": 46, "font-weight": 700, fill: INK}, q); const an = chip(g, a, col, {fs: 40}); tf(an, "translate(370 0)"); return {g, an}; });
  s.run = t => { const a = w => C("quiz1", w), b = w => C("quiz2", w);
    op(s.pause, on(t, a("pause"), b("heart"), .2)); tf(s.pause, `translate(760 170) scale(${pop(t, a("pause"))}) translate(-760 -170)`);
    const qt = [a("which"), a("which#2")], at = [b("circulatory"), b("skeletal")];
    s.q.forEach((q, i) => { op(q.g, ramp(t, qt[i], qt[i] + .2)); tf(q.g, `translate(760 ${370 + i * 220}) scale(${pop(t, qt[i])})`); op(q.an, ramp(t, at[i], at[i] + .2)); }); }; return s; })();

// ---- EXAM
S.exam = (() => { const s = scene("exam", "#14213d", "#1d3557");
  const g = el("g", {transform: "translate(760 450)"}, s.stage);
  el("rect", {x: -670, y: -320, width: 1340, height: 640, rx: 34, fill: "#2b9348", stroke: "#8d5524", "stroke-width": 22, filter: "url(#sh)"}, g);
  tx(g, {x: -610, y: -240, "font-size": 50, "font-weight": 700, fill: "#ffe14d"}, "📝 EXAM CORNER · say it like this:");
  const L = [["🫁 Respiratory system: exchange of gases."], ["❤️ Circulatory system: carries digested food and oxygen", "     to all parts of the body, and removes waste."], ["🦴 Skeletal system: gives the body shape and protects", "     important parts."], ["💪 Muscular system: works with the skeletal system", "     to move the body."]];
  let y = -160; s.lines = L.map(ls => { const r = el("g", {opacity: 0}, g); ls.forEach((x, i) => tx(r, {x: -610, y: y + i * 46, "font-size": 36, "font-weight": 600, fill: "#fff"}, x)); y += ls.length * 46 + 26; return r; });
  s.run = t => { const a = w => C("exam", w); const k = [a("respiratory"), a("circulatory"), a("skeletal"), a("muscular")];
    s.lines.forEach((r, i) => { op(r, ramp(t, k[i] - .15, k[i] + .2)); tf(r, `translate(${(1 - ramp(t, k[i] - .15, k[i] + .3)) * -40} 0)`); }); }; return s; })();

// ---- HABIT (never miss twice)
S.habit = (() => { const s = scene("habit", "#06d6a0", "#118ab2");
  s.title = tx(s.stage, {x: 760, y: 180, "text-anchor": "middle", "font-size": 80, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "🔁 NEVER MISS TWICE");
  s.days = ["✓", "✓", "✗", "✓", "✓", "✓", "✓"].map((m, i) => { const g = el("g", {}, s.stage); el("rect", {x: -65, y: -65, width: 130, height: 130, rx: 22, fill: "#fff", stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: 0, y: 32, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: m === "✓" ? "#06d6a0" : "#e63946"}, m); return g; });
  s.ok = chip(s.stage, "missed once? that's OK 👍", "#ff9f1c", {fs: 34}); s.back = chip(s.stage, "straight back on track!", "#3a86ff", {fs: 34});
  s.never = el("g", {}, s.stage); el("rect", {x: -150, y: -70, width: 300, height: 140, rx: 22, fill: "#fff", stroke: "#e63946", "stroke-width": 8}, s.never); tx(s.never, {x: 0, y: 32, "text-anchor": "middle", "font-size": 90, "font-weight": 700, fill: "#e63946"}, "✗ ✗"); el("path", {d: "M-170 -90 L170 90", stroke: "#e63946", "stroke-width": 14}, s.never);
  s.run = t => { const a = w => C("habit1", w);
    op(s.title, ramp(t, a("never"), a("never") + .2)); tf(s.title, `translate(760 180) scale(${pop(t, a("never"))}) translate(-760 -180)`);
    s.days.forEach((g, i) => { const tt = a("skip") - .3 + i * .35; op(g, ramp(t, tt, tt + .15)); tf(g, `translate(${290 + i * 160} 420) scale(${pop(t, tt)})`); });
    op(s.ok, ramp(t, a("okay"), a("okay") + .2)); popAt(s.ok, 610, 590, t, a("okay"));
    op(s.never, ramp(t, a("two"), a("two") + .2)); tf(s.never, `translate(1170 640) scale(${pop(t, a("two")) * .8})`);
    op(s.back, ramp(t, a("back"), a("back") + .2)); popAt(s.back, 610, 700, t, a("back")); }; return s; })();

// ---- MIND MAP
S.mindmap = (() => { const s = scene("mindmap", "#fff3b0", "#ffd6a5");
  for (let i = 0; i < 16; i++) el("line", {x1: 0, y1: 120 + i * 60, x2: 1920, y2: 120 + i * 60, stroke: "#a2d2ff", "stroke-width": 2, opacity: .6}, s.stage);
  s.center = el("g", {}, s.stage); el("ellipse", {rx: 200, ry: 80, fill: "#ef476f", stroke: INK, "stroke-width": 7}, s.center); tx(s.center, {x: 0, y: -4, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff"}, "HUMAN BODY"); tx(s.center, {x: 0, y: 38, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff"}, "SYSTEMS");
  const br = [["respiratory", "🫁 RESPIRATORY", "#3a86ff", 330, 260], ["circulatory", "❤️ CIRCULATORY", "#e63946", 300, 520], ["skeletal", "🦴 SKELETAL", "#6c757d", 360, 750], ["muscular", "💪 MUSCULAR", "#ff595e", 1000, 760], ["digestive", "🍽️ DIGESTIVE", "#9d4edd", 1080, 300]];
  s.br = br.map(([k, n, col, x, y]) => { const line = el("path", {d: `M720 500 Q${(720 + x) / 2} ${y} ${x} ${y}`, stroke: col, "stroke-width": 12, fill: "none", "stroke-linecap": "round", "stroke-dasharray": 700}, s.stage); return {k, line, c: chip(s.stage, n, col, {fs: 32}), x, y}; });
  s.stage.appendChild(s.center);
  s.ult = chip(s.stage, "🚀 TheOneApp · the ultimate science app", "#7209b7", {fs: 30});
  s.phone = el("g", {}, s.stage); el("rect", {x: -130, y: -240, width: 260, height: 480, rx: 40, fill: INK}, s.phone); el("rect", {x: -112, y: -205, width: 224, height: 410, rx: 20, fill: "#fff"}, s.phone);
  tx(s.phone, {x: 0, y: -168, "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#7209b7"}, "TheOneApp"); tx(s.phone, {x: 0, y: -138, "text-anchor": "middle", "font-size": 17, "font-weight": 600, fill: "#6c757d"}, "the ultimate science app");
  const cp = el("clipPath", {id: "scr5"}, $("v").querySelector("defs")); el("rect", {x: -112, y: -122, width: 224, height: 327, rx: 4}, cp);
  s.scr = el("g", {"clip-path": "url(#scr5)"}, s.phone); s.shot = el("image", {href: "oneapp_mind.png", x: -112, y: -122, width: 224, height: 485, preserveAspectRatio: "xMidYMin slice"}, s.scr);
  s.ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 5, rx: 13}, s.scr);
  s.run = t => { const a = w => C("habit2", w);
    op(s.center, ramp(t, a("human"), a("human") + .2)); tf(s.center, `translate(720 500) scale(${pop(t, a("human"))})`);
    s.br.forEach(b => { const k = a(b.k); set(b.line, "stroke-dashoffset", 700 * (1 - ramp(t, k - .1, k + .4))); op(b.line, t > k - .1 ? 1 : 0); op(b.c, ramp(t, k + .1, k + .3)); popAt(b.c, b.x, b.y, t, k + .1); });
    op(s.ult, on(t, a("ultimate"), SC.mindmap.t1 + .5, .2)); popAt(s.ult, 760, 140, t, a("ultimate"));
    const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph); tf(s.phone, `translate(${lerp(1650, 1340, ph)} 560) rotate(${lerp(12, -4, ph)})`);
    const off = -122 - 260 * ramp(t, a("ultimate"), SC.mindmap.t1); set(s.shot, "y", off);
    set(s.ring, "x", -112 + 224 * (36 / 780)); set(s.ring, "y", off + 485 * (1235 / 1688)); set(s.ring, "width", 224 * (304 / 780)); set(s.ring, "height", 485 * (72 / 1688));
    op(s.ring, on(t, SC.mindmap.t1 - .8, SC.mindmap.t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; return s; })();

// ---- CLOSE
S.close = (() => { const s = scene("close", "#f15bb5", "#fee440");
  s.icons = [["🫁", "respiratory"], ["❤️", "circulatory"], ["🦴", "skeletal"], ["💪", "muscular"], ["🍽️", "digestive"]].map(([e, w], i) => ({e: emo(s.stage, 0, 0, 120, e), w, x: 300 + i * 230}));
  s.K = kid(s.stage, {shirt: "#ffbe0b"}); s.hand = emo(s.stage, 0, 0, 90, "✋");
  s.bubble = el("g", {}, s.stage); el("path", {d: "M-480 -90 H480 A40 40 0 0 1 520 -50 V50 A40 40 0 0 1 480 90 H-300 L-370 150 L-360 90 H-480 A40 40 0 0 1 -520 50 V-50 A40 40 0 0 1 -480 -90 Z", fill: "#fff", stroke: INK, "stroke-width": 7, filter: "url(#sh)"}, s.bubble);
  tx(s.bubble, {x: 0, y: 16, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "❤️ Feel your heartbeat: which 2 systems?");
  s.run = t => { const a = w => C("close", w); const tn = ramp(t, a("your") - .3, a("your"));
    s.icons.forEach(ic => { const k = a(ic.w); op(ic.e, ramp(t, k, k + .2) * (1 - tn)); popAt(ic.e, ic.x, 400, t, k); set(ic.e, "x", 0); set(ic.e, "y", 0); });
    op(s.K.g, tn); tf(s.K.g, "translate(330 120) scale(.7)"); showParts(s.K, ["heart"], tn); tf(s.K.parts.heart, `translate(28 375) scale(${1 + .2 * Math.max(0, Math.sin(t * 8))}) translate(-28 -375)`);
    op(s.hand, ramp(t, a("hand"), a("hand") + .2)); set(s.hand, "x", 360); set(s.hand, "y", 400);
    op(s.bubble, ramp(t, a("which") - .2, a("which") + .1)); tf(s.bubble, `translate(980 300) scale(${pop(t, a("which") - .2) * .85})`); }; return s; })();

// ---- END CARD
S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7");
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, "NEXT EPISODE");
  tx(s.stage, {x: 960, y: 480, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Where your chicken rice goes");
  tx(s.stage, {x: 960, y: 580, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Part 1: mouth to stomach 🍗");
  s.run = () => {}; return s; })();

