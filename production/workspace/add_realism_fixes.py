import json, os, sys
S = os.path.dirname(os.path.abspath(__file__))
JUG = '''s.jug = el("g", {}, s.stage); s.stream = el("path", {d: "M601 253 Q572 290 562 380", fill: "none", stroke: "#4cc9f0", "stroke-width": 16, "stroke-linecap": "round"}, s.jug);
  { const jb = el("g", {transform: "translate(720 270) rotate(-35)"}, s.jug); const jc = "jug" + Math.floor(rnd() * 1e9); const cpj = el("clipPath", {id: jc}, $("v").querySelector("defs"));
    const JB = "M-60 -70 L-88 -84 L-62 -56 L-50 72 Q-48 84 -36 84 L36 84 Q48 84 50 72 L60 -70 Z"; el("path", {d: JB}, cpj);
    const wg = el("g", {"clip-path": `url(#${jc})`}, jb); el("rect", {x: -200, y: -15, width: 400, height: 300, fill: "#4cc9f0", transform: "rotate(35)"}, wg);
    el("path", {d: "M58 -48 Q118 -40 106 12 Q98 50 52 44", fill: "none", stroke: INK, "stroke-width": 10, "stroke-linecap": "round"}, jb);
    el("path", {d: JB, fill: "#ffffff55", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, jb); }
  s.bot.cap.remove();'''
NEW = {
 8: [
  ['el("rect", {x: -22, y: -160, width: 44, height: 50, rx: 6, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, g);',
   'g.cap = el("rect", {x: -22, y: -160, width: 44, height: 50, rx: 6, fill: "#3a86ff", stroke: INK, "stroke-width": 5}, g);'],
  ['s.jug = emo(s.stage, 0, 0, 150, "🫗");', JUG],
  ['set(s.jug, "x", 680); set(s.jug, "y", 230 + Math.sin(t * 4) * 6);',
   'set(s.stream, "d", `M601 253 Q${572 + Math.sin(t * 9) * 4} 290 562 380`); set(s.stream, "stroke-width", 15 + Math.sin(t * 13) * 2);'],
  ['set(s.torch, "x", 980); set(s.torch, "y", 580);',
   'set(s.torch, "x", 948); set(s.torch, "y", 556); tf(s.torch, "rotate(-112 948 556)");'],
 ],
 14: [['set(s.torch, "x", 330); set(s.torch, "y", 360);',
       'set(s.torch, "x", 325); set(s.torch, "y", 349); tf(s.torch, "rotate(170 325 349)");']],
 16: [['tf(torch, `rotate(45 ${T - 40} ${CY})`);', 'tf(torch, `rotate(135 ${T - 40} ${CY})`);'],
      ['tf(s.torch, `rotate(45 ${T - 40} ${CY})`);', 'tf(s.torch, `rotate(135 ${T - 40} ${CY})`);'],
      ['s.torch = emo(s.stage, 260, 500, 120, "🔦");', 's.torch = emo(s.stage, 260, 500, 120, "🔦"); tf(s.torch, "rotate(135 260 500)");']],
 17: [['emo(g, 280, 480, 110, "🔦"); return g;', 'tf(emo(g, 280, 480, 110, "🔦"), "rotate(135 280 480)"); return g;'],
      ['emo(g, 330, 0, 90, "🔦"); return g;', 'tf(emo(g, 330, 0, 90, "🔦"), "rotate(135 330 0)"); return g;']],
}
for n, pairs in NEW.items():
    src = open(f"{S}/bak_v1/ep{n}/ep{n}.html").read()
    p = f"{S}/fixes/ep{n}.json"; fx = json.load(open(p)) if os.path.exists(p) else []
    for a, b in fx: src = src.replace(a, b)
    for a, b in pairs:
        if [a, b] in fx: continue
        c = src.count(a); assert c >= 1, (n, a[:60]); src = src.replace(a, b); fx.append([a, b]); print(n, "ok x%d" % c, a[:50])
    json.dump(fx, open(p, "w"), indent=1, ensure_ascii=False)
