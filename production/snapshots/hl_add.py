import json, os, sys
S = "/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
HELP = r'''function heatPath(x, y, ux, uy, L, ph, A = 9, lam = 44) { const vx = -uy, vy = ux, Lb = L - 16, n = Math.max(6, Math.round(Lb / 5)); let d = "";
  for (let j = 0; j <= n; j++) { const s = Lb * j / n, w = A * Math.min(1, s / 14, (Lb - s) / 18) * Math.sin(2 * Math.PI * s / lam - ph); d += (j ? " L" : "M") + (x + ux * s + vx * w).toFixed(1) + " " + (y + uy * s + vy * w).toFixed(1); }
  const tx_ = x + ux * L, ty_ = y + uy * L, bx = x + ux * (L - 28), by = y + uy * (L - 28); return [d, `M${tx_.toFixed(1)} ${ty_.toFixed(1)} L${(bx + vx * 16).toFixed(1)} ${(by + vy * 16).toFixed(1)} L${(bx - vx * 16).toFixed(1)} ${(by - vy * 16).toFixed(1)} Z`]; }
function heatLines(g, n, col) { const L = [], H = []; for (let i = 0; i < n; i++) { L.push(el("path", {fill: "none", stroke: col, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round"}, g)); H.push(el("path", {fill: col, stroke: col, "stroke-width": 3, "stroke-linejoin": "round"}, g)); } return [L, H]; }
// heat LEAVING an object: n wavy arrows radiating outward in all directions (inward = true: heat coming IN from all around)
function heatOut(p, r0 = 70, n = 8, col = "#f77f00", len = 105, sy = 1, inward = false) { const g = el("g", {}, p); const [L, H] = heatLines(g, n, col);
  g.run = (t, k, x, y) => { op(g, k); if (x !== undefined) tf(g, `translate(${x} ${y})`); if (k <= 0) return; const off = 10 - 10 * Math.cos(t * 2.4);
    for (let i = 0; i < n; i++) { const th = -Math.PI / 2 + 2 * Math.PI * i / n, ux = Math.cos(th), uy = Math.sin(th), bx = ux * r0, by = uy * r0 * sy;
      const [d, h] = inward ? heatPath(bx + ux * (len + 20 - off), by + uy * (len + 20 - off), -ux, -uy, len, t * 5) : heatPath(bx + ux * off, by + uy * off, ux, uy, len, t * 5); set(L[i], "d", d); set(H[i], "d", h); } }; return g; }
// heat flowing FROM one place INTO another: parallel wavy arrows pointing along the flow
function heatFlow(p, col = "#f77f00", n = 3, gap = 36) { const g = el("g", {}, p); const [L, H] = heatLines(g, n, col);
  g.run = (x1, y1, x2, y2, t, k) => { op(g, k); if (k <= 0) return; const D = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / D, uy = (y2 - y1) / D, off = 8 - 8 * Math.cos(t * 2.4);
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * gap, [d, h] = heatPath(x1 - uy * o + ux * off, y1 + ux * o + uy * off, ux, uy, D - 16, t * 5); set(L[i], "d", d); set(H[i], "d", h); } }; return g; }
function readout('''
E = {
19: [
 ["function readout(", HELP],
 ["s.fl = arrowFlow(s.stage); s.q", "s.fl = heatFlow(s.stage); s.q"],
 ["s.out = arrowFlow(s.stage); s.inn = arrowFlow(s.stage);", "s.out = heatOut(s.stage, 72, 8, \"#f77f00\", 82); tf(s.out, \"translate(520 430)\"); s.inn = heatOut(s.stage, 72, 8, \"#f77f00\", 72, 1, true); tf(s.inn, \"translate(520 720)\");"],
 ["s.out.run(490, 385, 680, 290, t, ", "s.out.run(t, "],
 ["s.inn.run(680, 800, 490, 720, t, ", "s.inn.run(t, "],
 ["set(s.c1, \"x\", 400); set(s.c1, \"y\", 430);", "set(s.c1, \"x\", 520); set(s.c1, \"y\", 430);"],
 ["set(s.c2, \"x\", 400); set(s.c2, \"y\", 720);", "set(s.c2, \"x\", 520); set(s.c2, \"y\", 720);"],
 ["s.fl = arrowFlow(s.stage); s.ans", "s.fl = heatOut(s.stage, 100, 8, \"#f77f00\", 82); tf(s.fl, \"translate(760 380)\"); s.ans"],
 ["s.fl.run(870, 330, 1140, 200, t, ", "s.fl.run(t, "],
],
20: [
 ["function readout(", HELP],
 ["s.fl = flames(s.stage); s.pud", "s.fl = heatFlow(s.stage); s.pud"],
 ["s.fl = flames(s.stage); s.c = chip", "s.fl = heatFlow(s.stage); s.c = chip"],
 ["s.r2 = readout(s.stage); s.fl = flames(s.stage);", "s.r2 = readout(s.stage); s.fl = heatOut(s.stage, 175, 8, \"#f77f00\", 62, .78); tf(s.fl, \"translate(760 540)\");"],
 ["s.fl.run(860, 560, 1050, 620, t, ", "s.fl.run(t, "],
 ["s.fl.run(1200, 560, 560, 560, t,", "s.fl.run(1200, 560, 600, 560, t,"],
 ["else { emo(g, -50, -60, 140, e1); emo(g, 70, 30, 100, e2); }", "else { emo(g, 0, -30, 130, e1); g.ho = heatOut(g, 85, 8, \"#f77f00\", 68); tf(g.ho, \"translate(0 -30)\"); }"],
 ["const ar = bigArrow(g, HEATC);", "const ar = i === 2 ? el(\"g\", {}, g) : bigArrow(g, HEATC);"],
 ["op(p.ar, .6 + .4 * Math.sin(t * 5));", "op(p.ar, .6 + .4 * Math.sin(t * 5)); if (p.g.ho) p.g.ho.run(t, 1);"],
],
}
for n in map(int, sys.argv[1:]):
    f = f"{S}/fixes/ep{n}.json"; fx = json.load(open(f)); ORIG = {19: 17, 20: 15}[n]
    assert fx[ORIG][1].startswith("function heatPath("), "unexpected"; fx = fx[:ORIG]; page = open(f"{S}/ep{n}/ep{n}b.html").read()
    for a, b in E[n]:
        assert page.count(a) == 1, (n, a)
        if [a, b] in fx: continue
        fx.append([a, b])
    tmp = f + ".tmp_hl"; json.dump(fx, open(tmp, "w"), indent=1, ensure_ascii=False); os.replace(tmp, f); print(n, len(fx))
