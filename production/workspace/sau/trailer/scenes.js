/* TheOneApp, Explored trailer (outreach Short). Load after ../common.js and from_ep01.js (tiny, lungs). */
function skyScene(name, toGrey) { const s = scene(name, "#8ecae6", "#219ebc");
  s.sky = el("rect", {x: 50, y: 60, width: 1100, height: 700, rx: 36, fill: "#8ecae6", stroke: INK, "stroke-width": 8}, s.stage);
  s.sun = emo(s.stage, 960, 190, 130, "☀️"); skyline(s.stage, 110, 760, "#264653");
  s.haze = el("rect", {x: 50, y: 60, width: 1100, height: 700, rx: 36, fill: "#a89f91", opacity: 0}, s.stage);
  s.run = t => { const t0 = SC[name].t0, h = toGrey ? ramp(t, t0 + .2, t0 + .6) : 1 - ramp(t, t0 + .3, t0 + 1.2);
    set(s.sky, "fill", mix("#8ecae6", "#9a9184", h)); op(s.haze, .6 * h); op(s.sun, 1 - .75 * h); }; return s; }
S.sky = skyScene("sky", true);
S.skyclear = skyScene("skyclear", false);
S.tease = (() => { const s = scene("tease", "#1b263b", "#415a77");
  s.cards = [["🌫️", "Smoke from hundreds of km away", "smoke", "#6c757d"], ["🦟", "Mosquitoes that fight dengue", "mosquitoes", "#2a9d8f"], ["⚡", "No oil or gas of our own", "country", "#f77f00"]].map(([e, l, w, col], i) => {
    const g = el("g", {}, s.stage); el("rect", {x: -520, y: -110, width: 1040, height: 220, rx: 40, fill: "#fff", stroke: col, "stroke-width": 12, filter: "url(#sh)"}, g);
    emo(g, -400, 0, 130, e); tx(g, {x: -300, y: 20, "font-size": 52, "font-weight": 700, fill: INK}, l); g.w = w; g.i = i; return g; });
  s.run = t => { s.cards.forEach(g => popAt(g, 600, 170 + g.i * 270, t, cue("tease", g.w, .1 + g.i * .3))); }; return s; })();
S.promise = (() => { const s = scene("promise", "#ffd166", "#ef476f");
  s.badge = chip(s.stage, "🌏 TheOneApp, Explored", "#f72585", {fs: 64});
  s.cal = el("g", {}, s.stage); el("rect", {x: -200, y: -170, width: 400, height: 340, rx: 30, fill: "#fff", stroke: INK, "stroke-width": 8}, s.cal);
  el("rect", {x: -200, y: -170, width: 400, height: 100, rx: 30, fill: "#e63946"}, s.cal); el("rect", {x: -200, y: -110, width: 400, height: 40, fill: "#e63946"}, s.cal);
  s.day = tx(s.cal, {x: 0, y: -100, "text-anchor": "middle", "font-size": 48, "font-weight": 700, fill: "#fff"}, "MONDAY"); tx(s.cal, {x: 0, y: 70, "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: INK}, "📰➜🔬");
  s.lv = ["P3", "P4", "P5", "P6"].map((l, i) => { const c = chip(s.stage, l, ["#ff5d73", "#3a86ff", "#06d6a0", "#7209b7"][i], {fs: 60, w: 160}); c.i = i; return c; });
  s.run = t => { const a = (w, f) => cue("promise", w, f), th = a("thursday", .1);
    popAt(s.badge, 600, 110, t, SC.promise.t0 - .2); popAt(s.cal, 600, 430, t, th - .4);
    s.day.textContent = t > th ? "THURSDAY" : "MONDAY"; tf(s.day, `scale(1 ${t > th ? 1 - Math.max(0, .5 - Math.abs(t - th - .1) * 4) : 1})`);
    s.lv.forEach(c => popAt(c, 240 + c.i * 240, 790, t, a("primary", .75) + c.i * .2)); }; return s; })();
S.subscribe = (() => { const s = scene("subscribe", "#3a0ca3", "#7209b7");
  s.btn = el("g", {}, s.stage); s.btnR = el("rect", {x: -300, y: -80, width: 600, height: 160, rx: 80, fill: "#e63946", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.btn);
  s.btnT = tx(s.btn, {x: 0, y: 26, "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: "#fff"}, "SUBSCRIBE");
  s.hand = emo(s.stage, 0, 0, 150, "👆");
  s.next = el("g", {}, s.stage); el("rect", {x: -500, y: -110, width: 1000, height: 220, rx: 40, fill: "#fff", stroke: "#ffbe0b", "stroke-width": 12}, s.next);
  tx(s.next, {x: 0, y: -30, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#7209b7", "letter-spacing": 4}, "NEXT WEEK");
  tx(s.next, {x: 0, y: 50, "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: INK}, "How does Singapore keep the lights on? 💡");
  s.run = t => { const tp = cue("subscribe", "subscribe", .05) + .5;
    popAt(s.btn, 600, 260, t, SC.subscribe.t0 - .2); const press = on(t, tp, tp + .25, .08);
    tf(s.btn, `translate(600 260) scale(${(1 - .08 * press) * Math.max(0, pop(t, SC.subscribe.t0 - .2))})`);
    set(s.btnR, "fill", t > tp + .1 ? "#6c757d" : "#e63946"); s.btnT.textContent = t > tp + .1 ? "SUBSCRIBED ✓" : "SUBSCRIBE";
    tf(s.hand, `translate(${lerp(900, 640, ramp(t, tp - .8, tp))} ${lerp(560, 330, ramp(t, tp - .8, tp))})`); op(s.hand, on(t, tp - .9, tp + 1.2, .2));
    popAt(s.next, 600, 640, t, cue("subscribe", "lights", .7) - .6); }; return s; })();
