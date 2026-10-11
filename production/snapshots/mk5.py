import json
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
F=[]
for d in "12345":
    F.append([f'x: 160, y: 200, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}}, "{d}")',
              f'x: 90, y: 280, "font-size": 160, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 14}}, "{d}")'])
F += [
 ['popAt(s.trouble, 760, 760 - 30', 'popAt(s.trouble, 760, 805'],
 ['tf(mk.g, "translate(0 -250) scale(.6)")', 'tf(mk.g, "translate(0 -268) scale(.58)")'],
 ['tf(rk.g, "translate(0 -250) scale(.6)")', 'tf(rk.g, "translate(0 -268) scale(.58)")'],
 ['y: 230, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "MODEL 📐"', 'y: 245, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "MODEL 📐"'],
 ['y: 230, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "REAL BODY 🤯"', 'y: 245, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: INK}, "REAL BODY 🤯"'],
 ['popAt(s.shape, 420, 420, t, a("shape"))', 'popAt(s.shape, 320, 330, t, a("shape"))'],
 ['popAt(s.pair, 760, 180, t, a("pairs"))', 'popAt(s.pair, 1110, 180, t, a("pairs"))'],
 ['popAt(s.simple, 760, 790 - 40, t, a("simpler"))', 'popAt(s.simple, 760, 870, t, a("simpler"))'],
 ['x: 760, y: 770, "text-anchor": "middle", "font-size": 64', 'x: 760, y: 820, "text-anchor": "middle", "font-size": 64'],
 ['translate(760 770) scale(${pop(t, a("art"))}) translate(-760 -770)', 'translate(760 820) scale(${pop(t, a("art"))}) translate(-760 -820)'],
]
json.dump(F, open(f"{S}/fixes/ep5.json","w"), ensure_ascii=False, indent=1)
