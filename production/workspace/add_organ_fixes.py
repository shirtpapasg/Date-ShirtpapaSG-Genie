import json, os
S = os.path.dirname(os.path.abspath(__file__))
STOM, TUBE, MAR, BGA, BGB, LARGE = "#e0707f", "#f4a3b4", "#9b2c45", "#ffd6de", "#ffadbb", "#c4566b"
NEW = {
 1: [['fill: "#c77dff"', f'fill: "{STOM}"'], ['"#e0aaff"', f'"{TUBE}"'], ['"DIGESTIVE SYSTEM", 1140, 600, "#9d4edd"]', f'"DIGESTIVE SYSTEM", 1140, 600, "{MAR}"]']],
 5: [['scene("dig", "#e0aaff", "#c77dff")', f'scene("dig", "{BGA}", "{BGB}")'], ['"#e0aaff"', f'"{TUBE}"'], ['fill: "#c77dff"', f'fill: "{STOM}"'],
     ['s.tube = el("path", {d, stroke: "#9d4edd"', f's.tube = el("path", {{d, stroke: "#f08a9a"'],
     ['"🍽️ DIGESTIVE", "#9d4edd"', f'"🍽️ DIGESTIVE", "{MAR}"'], ['"food ➜ simpler substances your body can use", "#7209b7"', f'"food ➜ simpler substances your body can use", "{MAR}"']],
 6: [['scene("stomach", "#e0aaff", "#c77dff")', f'scene("stomach", "{BGA}", "{BGB}")'], ['fill: "#c77dff"', f'fill: "{STOM}"'], ['"#7b2cbf"', f'"{MAR}"'],
     ['el("ellipse", {rx: 200, ry: 80, fill: "#9d4edd"', f'el("ellipse", {{rx: 200, ry: 80, fill: "{MAR}"']],
 7: [['"#f4a261"', f'"{LARGE}"'], ['"#7b2cbf"', f'"{MAR}"'], ['el("ellipse", {rx: 200, ry: 80, fill: "#9d4edd"', f'el("ellipse", {{rx: 200, ry: 80, fill: "{MAR}"']],
}
for n, pairs in NEW.items():
    src = open(f"{S}/bak_v1/ep{n}/ep{n}.html").read()
    p = f"{S}/fixes/ep{n}.json"; fx = json.load(open(p)) if os.path.exists(p) else []
    for a, b in fx: src = src.replace(a, b)
    for a, b in pairs:
        if any(f[:2] == [a, b] for f in fx): continue
        c = src.count(a); assert c >= 1, (n, a); src = src.replace(a, b); fx.append([a, b] + ([c] if c > 1 else [])); print(n, "x%d" % c, a[:60])
    json.dump(fx, open(p, "w"), indent=1, ensure_ascii=False)
