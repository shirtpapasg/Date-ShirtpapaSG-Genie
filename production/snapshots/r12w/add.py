import json, os, sys
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
F={}
F[12]=[
 ['fill: "#fff1e6", stroke: "#e63946", "stroke-width": 8}, s.stage)}); }',
  'fill: "#fff1e6", stroke: "#e9c46a", "stroke-width": 3}, s.stage)}); const sk = el("path", {d: `M${Math.cos(a0) * 90} ${Math.sin(a0) * 90} A90 90 0 0 1 ${Math.cos(a1) * 90} ${Math.sin(a1) * 90}`, fill: "none", stroke: "#e63946", "stroke-width": 10}, s.stage); const sq = s.sl[i]; const g = el("g", {}, s.stage); g.appendChild(sq.e); g.appendChild(sk); sq.e = g; }'],
]
F[13]=[
 ['s.fl = el("circle", {r: 20, fill: "#ffe14d"}, s.stage);',
  's.stalk = el("path", {fill: "none", stroke: "#8ecae6", "stroke-width": 5, "stroke-linecap": "round"}, s.stage); s.fl = el("circle", {r: 20, fill: "#ffe14d"}, s.stage);'],
 ['set(s.fl, "cx", 600 + Math.sin(t) * 30); set(s.fl, "cy", 700);',
  'set(s.fl, "cx", 600 + Math.sin(t) * 30); set(s.fl, "cy", 700); { const fx = 660 + Math.sin(t) * 30; set(s.stalk, "d", `M${fx - 45} 742 Q${fx - 42} 712 ${fx - 60} 718`); op(s.stalk, ramp(t, a("deepsea"), a("deepsea") + .2)); }'],
]
F[14]=[
 ['[["✏️", "pencil"], ["🛋️", "sofa"], ["🛝", "swing"]].map(([e, w], i) => ({e: emo(s.stage, 0, 0, 150, e), w, i}));',
  '[["✏️", "pencil"], ["🛋️", "sofa"], [null, "swing"]].map(([e, w], i) => ({e: e ? emo(s.stage, 0, 0, 150, e) : (() => { const g = el("svg", {overflow: "visible"}, s.stage); el("path", {d: "M-70 68 L-52 -62 M70 68 L52 -62", stroke: "#e63946", "stroke-width": 10, "stroke-linecap": "round"}, g); el("line", {x1: -62, y1: -62, x2: 62, y2: -62, stroke: "#e63946", "stroke-width": 12, "stroke-linecap": "round"}, g); el("path", {d: "M-24 -62 V28 M24 -62 V28", stroke: "#6c584c", "stroke-width": 5}, g); el("rect", {x: -36, y: 26, width: 72, height: 14, rx: 5, fill: "#ffbe0b", stroke: INK, "stroke-width": 4}, g); return g; })(), w, i}));'],
 ['s.pen = emo(s.stage, 760, 600, 110, "✏️");',
  's.pen = emo(s.stage, 760, 622, 110, "✏️"); tf(s.pen, "rotate(-45 760 622)");'],
 ['s.beam = el("path", {d: "M0 0 L420 230 L380 330 Z"',
  's.beam = el("path", {d: "M0 0 L400 175 L360 258 Z"'],
 ['s.r1.to(400, 400, 720, 570,', 's.r1.to(400, 400, 715, 600,'],
 ['s.r2.to(800, 570, 1190, 390,', 's.r2.to(805, 600, 1190, 390,'],
]
F[15]=[
 ['s.sh = el("ellipse", {rx: 170, ry: 40, fill: "#1b1b3a"}, s.stage);', 's.sh = el("ellipse", {rx: 200, ry: 40, fill: "#1b1b3a"}, s.stage);'],
 ['set(s.sh, "cx", 840); set(s.sh, "cy", 880);', 'set(s.sh, "cx", 1190); set(s.sh, "cy", 880);'],
 ['s.candle = emo(s.stage, 280, 520, 140, "🕯️");', 's.candle = emo(s.stage, 280, 565, 140, "🕯️");'],
 ['s.table = el("rect", {x: 260, y: 780, width: 1000, height: 30,', 's.table = el("rect", {x: 200, y: 780, width: 1120, height: 30,'],
 ['s.cb = el("rect", {x: 380, y: 500, width: 240,', 's.cb = el("rect", {x: 380, y: 628, width: 240,'],
 ['s.fp = el("rect", {x: 900, y: 500, width: 240,', 's.fp = el("rect", {x: 900, y: 628, width: 240,'],
 ['s.sh1 = el("ellipse", {cx: 470, cy: 770, rx: 170, ry: 18,', 's.sh1 = el("ellipse", {cx: 402, cy: 770, rx: 166, ry: 18,'],
 ['s.sh2 = el("ellipse", {cx: 1050, cy: 770, rx: 170, ry: 18,', 's.sh2 = el("ellipse", {cx: 1118, cy: 770, rx: 166, ry: 18,'],
 ['set(s.torch, "x", 420); set(s.torch, "y", 460);', 'set(s.torch, "x", 420); set(s.torch, "y", 460); tf(s.torch, "rotate(135 420 460)");'],
]
F[16]=[
 ['set(i.e, "y", 620 + 20 * (1 - pop(t, a(i.w)))); });',
  'set(i.e, "y", 620 + 20 * (1 - pop(t, a(i.w)))); if (i.i === 0) tf(i.e, `rotate(135 480 ${620 + 20 * (1 - pop(t, a(i.w)))})`); });'],
 ['tf(s.p, `scale(${dir < 0 ? 1 : -1} 1)`);', 'tf(s.p, "scale(-1 1)");'],
]
mode=sys.argv[1]
for n,L in F.items():
    h=open(f"{S}/ep{n}/preview.html").read() if os.path.exists(f"{S}/ep{n}/preview.html") else open(f"{S}/ep{n}/ep{n}b.html").read()
    for o,nw in L: print(n, h.count(o), o[:60])
    if mode=="write":
        p=f"{S}/fixes/ep{n}.json"; cur=json.load(open(p)) if os.path.exists(p) else []
        cur+= [list(x) for x in L]
        tmp=p+".tmp"; json.dump(cur,open(tmp,"w"),indent=1,ensure_ascii=False); os.replace(tmp,p)
