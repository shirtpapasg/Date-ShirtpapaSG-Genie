// ---- WELCOME (greeting + "today you'll learn")
S.welcome = (() => { const sv = seed; seed = 424242; const s = scene("welcome", "#ffd166", "#ef476f"), I = window.INTRO;
  s.wave = emo(s.stage, 0, 0, 190, "👋");
  s.hi = el("g", {}, s.stage);
  tx(s.hi, {x: 0, y: 0, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, "Welcome to");
  tx(s.hi, {x: 0, y: 125, "text-anchor": "middle", "font-size": 118, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 14}, "TheOneApp, Explained!");
  s.board = el("g", {}, s.stage);
  el("rect", {x: -700, y: -380, width: 1400, height: 720, rx: 46, fill: "#fffaf0", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, s.board);
  el("rect", {x: -700, y: -380, width: 1400, height: 130, rx: 46, fill: INK}, s.board);
  el("rect", {x: -700, y: -290, width: 1400, height: 40, fill: INK}, s.board);
  tx(s.board, {x: 0, y: -293, "text-anchor": "middle", "font-size": 66, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 3}, "🎯 TODAY YOU'LL LEARN");
  const cols = ["#ff5d73", "#3a86ff", "#06d6a0"];
  s.rows = I.goals.map(([icon, label, cue], i) => { const g = el("g", {}, s.board), y = -120 + i * 175;
    el("circle", {cx: -560, cy: y, r: 56, fill: cols[i], stroke: INK, "stroke-width": 6}, g);
    tx(g, {x: -560, y: y + 25, "text-anchor": "middle", "font-size": 70, "font-weight": 700, fill: "#fff"}, String(i + 1));
    emo(g, -420, y, 92, icon);
    tx(g, {x: -330, y: y + 21, "font-size": 58, "font-weight": 700, fill: INK}, label);
    return {g, y, cue}; });
  s.run = t => { const T0 = SC.welcome.t0, tB = C("welcome", "today") - .35, go = C("welcome", I.go || "started");
    // phase A: wave + welcome
    const a = 1 - ramp(t, tB - .3, tB + .1);
    tf(s.wave, `translate(960 ${330 - 40 * (1 - a)}) scale(${Math.max(0, pop(t, T0 - .1)) * a}) rotate(${Math.sin(t * 9) * 18})`);
    tf(s.hi, `translate(960 ${590 - 60 * (1 - a)}) scale(${Math.max(0, pop(t, C("welcome", "welcome") - .15)) * a})`); op(s.hi, a);
    // phase B: learning board, one row per goal
    const b = Math.max(0, pop(t, tB, .55)), bump = 1 + .04 * on(t, go, go + .5, .2);
    tf(s.board, `translate(960 ${520 + Math.sin(t * 1.5) * 6}) scale(${b * bump})`); op(s.board, b > 0 ? 1 : 0);
    s.rows.forEach(r => { const k = Math.max(0, pop(t, C("welcome", r.cue) - .1));
      tf(r.g, `translate(${-60 * (1 - Math.min(1, k))} 0)`); op(r.g, clamp(k)); });
  };
  seed = sv; return s; })();
