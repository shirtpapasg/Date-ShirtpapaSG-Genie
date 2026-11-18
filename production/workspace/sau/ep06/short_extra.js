/* EP06 Shorts only (loaded last; does nothing in the 1920x1080 episode). */
if (SHORT) {
  if ((CFG.headLines || []).length > 2) $("head").setAttribute("transform", "translate(0 52)");
  // fit6s(name, k, cx, cy): show the scene at scale k with scene point (cx, cy) in the middle of the box; full-screen backdrops still cover the frame
  const fit6s = (name, k, cx = 600, cy = 450, unwrap = true) => { const s = S[name]; if (!s) return; const st = s.stage; if (unwrap) st.removeAttribute("transform");      // drop the episode's wide-screen wrap
    const g = el("g", {transform: `translate(600 450) scale(${k}) translate(${-cx} ${-cy})`}); while (st.firstChild) g.appendChild(st.firstChild); st.appendChild(g);
    const X0 = cx - 600 / k - 30, X1 = cx + 600 / k + 30, Y0 = cy - 1100 / k, Y1 = cy + 1090 / k;
    g.querySelectorAll("rect").forEach(r => { const x = +r.getAttribute("x"), y = +r.getAttribute("y"), w = +r.getAttribute("width"), h = +r.getAttribute("height");
      if (x <= FULL.x && w >= FULL.w && y <= FULL.y && h >= FULL.h) { set(r, "x", X0); set(r, "width", X1 - X0); set(r, "y", Y0); set(r, "height", Y1 - Y0); } }); s.fitG = g; return s; };
  const hide = (s, list) => { const h = el("g", {display: "none"}, s.stage); list.forEach(e => h.appendChild(e)); };
  fit6s("try", .97);
  // the recap board: the Short's script skips the rice and egg friends
  { const s = fit6s("recap", .96); if (s) hide(s, [s.fr, s.blood]); }
  // the textbook diagram: every part is named, but only the mouth row keeps its fact, with the digestive juices
  { const s = fit6s("textbook", .88, 645, 450, false); if (s) { const run = s.run;
    hide(s, [s.vein, s.food, ...s.reds, ...s.blues, ...s.rows.slice(1).map(g => g.sub)]);
    s.run = t => { run(t); const tj = cue("textbook", "juices", .38); s.juice.forEach((j, i) => op(j, t >= tj + i * .25 ? 1 : 0)); op(s.leg, t >= tj ? 1 : 0); }; } }
}
