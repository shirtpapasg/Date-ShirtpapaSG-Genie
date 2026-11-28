/* EP04 Shorts only (loaded last; does nothing in the 1920x1080 episode).
   EP04's scenes are drawn across the whole wide screen (x -150..1770, middle 810). A vertical frame shows only x 0..1200 of the
   scene box, so in a Short each scene is shrunk and re-centred to fit, full-screen backdrops are stretched to cover the tall frame,
   the ground is carried on down to the bottom edge, and "your hands" (the two hydrogen atoms) move to the bottom corners. */
if (SHORT) {
  if (CFG.title === "Where does a puddle go?") CFG.headLines = ["Where does", "a puddle go?"];
  // fit4(name, k, cx, cy, ty, floor): show the scene at scale k with wide-screen point (cx, cy) at box point (600, ty).
  // floor = [[y, fill, x0, x1], ...]: carry the ground on down from y (to the bottom of the frame) between x0 and x1.
  const fit4 = (name, k, cx = 810, cy = 480, ty = 450, floor = []) => { const s = S[name]; if (!s) return; const st = s.stage;
    const g = el("g", {transform: `translate(600 ${ty}) scale(${k}) translate(${-cx} ${-cy})`}); while (st.firstChild) g.appendChild(st.firstChild); st.appendChild(g);
    const X0 = cx - 600 / k - 30, X1 = cx + 600 / k + 30, Y0 = cy + (-650 - ty) / k, Y1 = cy + (1540 - ty) / k;
    g.querySelectorAll("rect").forEach(r => { const x = +r.getAttribute("x"), y = +r.getAttribute("y"), w = +r.getAttribute("width"), h = +r.getAttribute("height");
      if (x <= FULL.x && w >= FULL.w && y <= FULL.y && h >= FULL.h) { set(r, "x", X0 - (FULL.x - x)); set(r, "width", X1 - X0 + (w - FULL.w)); set(r, "y", Y0 - (FULL.y - y)); set(r, "height", Y1 - Y0 + (h - FULL.h)); } });
    floor.forEach(([y, fill, x0 = X0, x1 = X1, before]) => { const r = el("rect", {x: x0, y, width: x1 - x0, height: Y1 - y, fill}); g.insertBefore(r, before ? before(s) : (s.hands || null)); });
    if (s.hands) s.hands.h.forEach((h, i) => { const sd = i ? 1 : -1, w = el("g", {transform: `translate(${cx + sd * (600 / k + 40) - (600 + sd * 870)} ${cy + (1511 - ty) / k - 1050})`}); while (h.firstChild) w.appendChild(h.firstChild); h.appendChild(w); });
    const run = s.run; s.run = t => { const a = VP[0], b = VP[1]; VP[0] = cx; VP[1] = cy; run(t); VP[0] = a; VP[1] = b; }; s.fitG = g; return s; };
  window.fit4 = fit4;
}
if (SHORT) { const fit4 = window.fit4;
  const big = (g, k) => { if (!g) return; const w = el("g", {transform: `scale(${k})`}); while (g.firstChild) w.appendChild(g.firstChild); g.appendChild(w); };   // a card or label, made bigger to stay readable
  const hide = (s, list) => { const h = el("g", {display: "none"}, s.fitG); list.forEach(e => h.appendChild(e)); };                                        // parts a Short's script never reaches
  { const s = fit4("hook", .72, 600, 480, 470); hide(s, [s.q2, s.dn]); }
  { const s = fit4("povEvap", .78); big(s.card, 1.5);                    // the long label goes on two lines
    const a = s.lab.firstChild; a.textContent = "Now you are water vapour:"; a.setAttribute("font-size", 66); a.setAttribute("stroke-width", 14);
    const b = a.cloneNode(); b.textContent = "a gas, too spread out to see"; b.setAttribute("y", 80); s.lab.appendChild(b); big(s.lab, 1); s.lab.firstChild.setAttribute("transform", "translate(0 -250)"); }
  big(fit4("povSea", .8, 700, 480, 450, [[1090, "#0f5fae"]]).card, 1.2);
  big(fit4("povCool", .8).card, 1.3);
  { const s = fit4("povFall", .8); big(s.card, 1.6); big(s.card2, 1.6); }
  big(fit4("povFriends", .82, 870, 480, 450, [[1300, "#6cc487", -1e4, 1400, s => s.gr], [1300, "#3a86ff", 1400, 1e4, s => s.gr]]).card, 1.12);
  { const s = fit4("salt", .8, 615, 480, 470, [[1030, "#133894", -1e4, 800], [1030, "#e9c46a", 800, 1e4]]); big(s.lvap, 1); s.lvap.firstChild.setAttribute("transform", "translate(130 0)"); }
  fit4("try", .95, 615);
  // the water cycle: this Short only tells the evaporation half, so the condensation half is left out
  { const s = fit4("cycle", .92, 525, 480, 450, [[1030, "#3a86ff", -1e4, 441], [1030, "#74c69d", 441, 1e4]]); hide(s, [s.hC, s.cloud, s.pC, s.lc, s.rain.G, s.lr, s.ld, s.cf, s.loopA, s.round, s.rC]);
    const w = el("g", {transform: "translate(-350 -440)"}); while (s.rE.firstChild) w.appendChild(s.rE.firstChild); s.rE.appendChild(w);
    big(s.title, 1); s.title.firstChild.setAttribute("transform", "translate(-180 0)"); }
}
