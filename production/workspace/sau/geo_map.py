"""geo_map.py: writes geo_map.js, the accurate region map every TheOneApp, Explored scene uses (regionMap).
Natural Earth coastlines (geo/, see globe_thumb.py), orthographic view centred on Singapore, drawn in the scenes'
1200 x 900 box with Singapore at (612, 418). Points closer than 1.2 px are dropped to keep frames fast.
    python3 geo_map.py
"""
import json, math, os
HERE = os.path.dirname(os.path.abspath(__file__))
L0, P0 = math.radians(103.82), math.radians(1.35); R = 2300; CX, CY = 612, 418; W, H = 1200, 900
def proj(lon, lat):
    l, p = math.radians(lon), math.radians(lat)
    return (CX + R * math.cos(p) * math.sin(l - L0), CY - R * (math.cos(P0) * math.sin(p) - math.sin(P0) * math.cos(p) * math.cos(l - L0)))
def rings(g): return g['coordinates'] if g['type'] == 'Polygon' else [r for poly in g['coordinates'] for r in poly] if g['type'] == 'MultiPolygon' else []
def inbox(pts, m=60): return any(-m < x < W + m and -m < y < H + m for x, y in pts)
def d(ring):
    pts = [proj(x, y) for x, y in ring if abs(x - 103.8) < 30 and abs(y) < 30]
    if len(pts) < 3 or not inbox(pts): return ''
    out = [pts[0]]
    for q in pts[1:]:
        if math.hypot(q[0] - out[-1][0], q[1] - out[-1][1]) >= 1.2: out.append(q)
    return ('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in out) + 'Z') if len(out) > 2 else ''
land = json.load(open(f'{HERE}/geo/land10.geojson')); ctry = json.load(open(f'{HERE}/geo/countries.geojson'))
LAND = ''.join(d(r) for f in land['features'] for r in rings(f['geometry']))
BORDER = ''.join(d(r) for f in ctry['features'] if f['properties'].get('ADMIN') in ('Malaysia', 'Brunei') for r in rings(f['geometry']))
P = lambda lon, lat: [round(v, 1) for v in proj(lon, lat)]
G = {"land": LAND, "border": BORDER, "sg": P(103.82, 1.35),
     # 2026 hotspot areas: Riau, Jambi, South Sumatra; West, Central and South Kalimantan
     "fires": [P(101.4, 0.6), P(102.6, -1.0), P(104.6, -2.9), P(110.6, -0.6), P(113.8, -2.3), P(114.9, -3.0)],
     "labels": [["Malaysia", P(102.2, 4.6), 30], ["Sumatra", P(100.6, -2.2), 32], ["Kalimantan", P(113.2, -0.6), 32], ["Java", P(108.8, -7.0), 26]],
     # gas pipelines into Singapore: from Kerteh (Malaysia), from Grissik in South Sumatra via Batam, from West Natuna
     "pipes": {"my": [P(103.42, 4.55), P(103.3, 2.6), P(103.82, 1.45)], "su": [P(103.3, -2.4), P(104.0, -0.5), P(103.9, 1.1)], "na": [P(105.6, 4.8), P(104.9, 2.9), P(103.95, 1.4)]}}
js = "/* geo_map.js: made by geo_map.py from Natural Earth coastlines (accurate shapes, orthographic, Singapore at 612,418). */\nconst GEO = " + json.dumps(G) + ";\n" + '''
function regionMap(p) { const g = el("g", {}, p);
  const cid = "mapclip" + (regionMap.n = (regionMap.n || 0) + 1); const cp = el("clipPath", {id: cid}, $("v").querySelector("defs")); el("rect", {x: 0, y: 0, width: 1200, height: 900, rx: 40}, cp);
  el("rect", {x: 0, y: 0, width: 1200, height: 900, rx: 40, fill: "#48cae4"}, g);
  const m = el("g", {"clip-path": `url(#${cid})`}, g);
  for (let i = 0; i < 7; i++) el("path", {d: `M${80 + i * 160} ${120 + (i % 3) * 260} q20 -12 40 0 t40 0`, fill: "none", stroke: "#fff", "stroke-width": 4, opacity: .35}, m);
  el("path", {d: GEO.land, fill: "#95d5b2", stroke: INK, "stroke-width": 3.5, "stroke-linejoin": "round"}, m);
  el("path", {d: GEO.border, fill: "none", stroke: INK, "stroke-width": 2.5, "stroke-dasharray": "9 7", opacity: .55}, m);
  GEO.labels.forEach(([s, [x, y], fs]) => tx(m, {x, y, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: INK, opacity: .85}, s));
  el("rect", {x: 0, y: 0, width: 1200, height: 900, rx: 40, fill: "none", stroke: INK, "stroke-width": 7}, g);
  g.sg = el("g", {transform: `translate(${GEO.sg[0]} ${GEO.sg[1]})`}, g); el("circle", {r: 16, fill: "#e63946", stroke: "#fff", "stroke-width": 5}, g.sg);
  g.sgRing = el("circle", {r: 16, fill: "none", stroke: "#e63946", "stroke-width": 4}, g.sg);
  tx(g.sg, {x: 26, y: -16, "font-size": 34, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 7}, "Singapore");
  g.fires = GEO.fires.map(f => f.slice()); return g; }
const pipeD = k => { const [a, b, c] = GEO.pipes[k]; return `M${a[0]} ${a[1]} Q${b[0]} ${b[1]} ${c[0]} ${c[1]}`; };
'''
open(f'{HERE}/geo_map.js', 'w').write(js); print('geo_map.js', len(js) // 1024, 'KB; SG', G['sg'])
