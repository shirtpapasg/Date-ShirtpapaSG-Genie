/* EP05 Shorts only (loaded last; does nothing in the 1920x1080 episode).
   EP05's scenes are already centred for a vertical frame; these are the few places where words or the map ran off its sides. */
if (SHORT) {
  if ((CFG.headLines || []).length > 2) $("head").setAttribute("transform", "translate(0 52)");      // a three-line question: keep it clear of the series label
  // fit5(name, k, cx, cy): show the scene at scale k with scene point (cx, cy) in the middle of the box; full-screen backdrops still cover the frame
  const fit5 = (name, k, cx = 600, cy = 450) => { const s = S[name]; if (!s) return; const st = s.stage;
    const g = el("g", {transform: `translate(600 450) scale(${k}) translate(${-cx} ${-cy})`}); while (st.firstChild) g.appendChild(st.firstChild); st.appendChild(g);
    const X0 = cx - 600 / k - 30, X1 = cx + 600 / k + 30, Y0 = cy - 1100 / k, Y1 = cy + 1090 / k;
    g.querySelectorAll("rect").forEach(r => { const x = +r.getAttribute("x"), y = +r.getAttribute("y"), w = +r.getAttribute("width"), h = +r.getAttribute("height");
      if (x <= FULL.x && w >= FULL.w && y <= FULL.y && h >= FULL.h) { set(r, "x", X0); set(r, "width", X1 - X0); set(r, "y", Y0); set(r, "height", Y1 - Y0); } }); s.fitG = g; return s; };
  const hide = (s, list) => { const h = el("g", {display: "none"}, s.stage); list.forEach(e => h.appendChild(e)); };      // parts a Short's script never reaches
  // "You are light energy from the Sun…" is wider than the frame: shrink it
  if (S.povSun) { const s = S.povSun, w = el("g", {transform: "translate(600 70) scale(.84) translate(-600 -70)"}); s.title.parentNode.insertBefore(w, s.title); w.appendChild(s.title); }
  // inside the chloroplast: the labels at the sides come into view
  { const s = fit5("povPhoto", .86); if (s) s.fitG.querySelectorAll("text").forEach(e => { const x = {"carbon dioxide": 1010, "(in through tiny pores)": 1010, "oxygen": 1080}[e.textContent]; if (x) e.setAttribute("x", x); }); }
  // the world map: the whole route, from Brazil to Singapore, in view (the camera then moves in on Singapore as before)
  fit5("shipMap", .64, 810, 480);
  // the hook: this Short starts at "Singapore brings in more than nine out of every ten bites", so the playground opening is left out
  if (S.hook) { const s = S.hook, run = s.run; hide(s, [s.kids, s.gr, s.q1, s.q2, s.q4]);
    s.run = t => { run(t); const t0 = SC.hook.t0; popAt(s.q3, 600, 120, t, t0 - .1); const k = Math.max(0, pop(t, t0 - .1, .5)); tf(s.plate, `translate(600 310) scale(${k * .78})`); op(s.plate, k > 0 ? 1 : 0); }; }
}
