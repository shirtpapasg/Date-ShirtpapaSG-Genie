import json,os
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
def add(n, entries):
    p=f"{S}/fixes/ep{n}.json"; fx=json.load(open(p)) if os.path.exists(p) else []
    fx+=entries; tmp=p+".tmp"
    with open(tmp,"w") as f: json.dump(fx,f,indent=1,ensure_ascii=False)
    os.replace(tmp,p)
add(8,[
 ['s.straw = el("path", {d: "M1350 340 V760 H760 V0"', 's.straw = el("path", {d: "M1340 295 H1150 V760 H760 V0"'],
 ['set(s.straw, "d", `M1350 340 V760 H760 V${', 'set(s.straw, "d", `M1340 295 H1150 V760 H760 V${'],
])
add(11,[
 ['s.straw = el("path", {d: "M1250 380 V760 H750 V680"', 's.straw = el("path", {d: "M1240 335 H1060 V760 H750 V680"'],
])
jug = ('s.jug = el("g", {}, s.stage); el("path", {d: "M631 313 Q600 340 590 470", fill: "none", stroke: "#4cc9f0", "stroke-width": 14, "stroke-linecap": "round"}, s.jug);\n'
 '  { const jb = el("g", {transform: "translate(750 330) rotate(-35) scale(.85)"}, s.jug); const jc = "jug" + Math.floor(rnd() * 1e9); const cpj = el("clipPath", {id: jc}, $("v").querySelector("defs"));\n'
 '    const JB = "M-60 -70 L-88 -84 L-62 -56 L-50 72 Q-48 84 -36 84 L36 84 Q48 84 50 72 L60 -70 Z"; el("path", {d: JB}, cpj);\n'
 '    const wg = el("g", {"clip-path": `url(#${jc})`}, jb); el("rect", {x: -200, y: -15, width: 400, height: 300, fill: "#4cc9f0", transform: "rotate(35)"}, wg);\n'
 '    el("path", {d: "M58 -48 Q118 -40 106 12 Q98 50 52 44", fill: "none", stroke: INK, "stroke-width": 10, "stroke-linecap": "round"}, jb);\n'
 '    el("path", {d: JB, fill: "#ffffff55", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round"}, jb); }')
add(10,[['s.jug = emo(s.stage, 0, 0, 120, "🫗");', jug]])
