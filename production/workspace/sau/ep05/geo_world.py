"""ep05/geo_world.py: the world map EP05 uses (shipMap, security). Natural Earth land (../geo/land10.geojson), plain
equirectangular projection (8 px per degree), drawn in scene units so that it fills the whole 1920 x 1080 screen:
longitude -70..170 -> x -150..1770, latitude 70..-65 -> y -60..1020. Points closer than about 3 px are dropped; specks are left out.
    python3 ep05/geo_world.py        rewrites the line between /*WORLD*/ markers at the top of ep05/scenes.js
"""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
K = 8.0
def proj(lon, lat): return (-150 + (lon + 70) * K, -60 + (70 - lat) * K)
def rings(g): return g['coordinates'] if g['type'] == 'Polygon' else [r for poly in g['coordinates'] for r in poly] if g['type'] == 'MultiPolygon' else []
def d(ring):
    pts = [proj(x, y) for x, y in ring]
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    if max(xs) < -160 or min(xs) > 1780 or max(ys) < -70 or min(ys) > 1030: return ''
    if max(xs) - min(xs) < 4 and max(ys) - min(ys) < 4: return ''
    out = [pts[0]]
    for q in pts[1:]:
        if abs(q[0] - out[-1][0]) + abs(q[1] - out[-1][1]) >= 3.2: out.append(q)
    out = [(min(1800, max(-180, x)), min(1050, max(-90, y))) for x, y in out]
    return ('M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in out) + 'Z') if len(out) > 2 else ''
land = json.load(open(f'{HERE}/../geo/land10.geojson'))
LAND = ''.join(d(r) for f in land['features'] for r in rings(f['geometry']))
P = lambda lon, lat: [round(v, 1) for v in proj(lon, lat)]
G = {"land": LAND, "sg": P(103.82, 1.35),
     # places food comes from (capital or main port; lon, lat)
     "pl": {"Brazil": P(-46.3, -24.0), "Malaysia": P(101.7, 3.1), "Thailand": P(100.5, 13.7), "Vietnam": P(106.7, 10.8), "Australia": P(115.9, -32.0),
            "China": P(113.3, 23.1), "India": P(80.3, 13.1)},
     # the grain ship: Santos (Brazil), round the Cape of Good Hope, across the Indian Ocean, Sunda Strait, Singapore
     "ship": [P(-46.3, -24.0), P(-38, -27), P(-10, -34), P(18, -37.5), P(40, -33), P(75, -20), P(98, -9), P(105.2, -6.6), P(106.6, -3.5), P(105.6, 0.2), P(104.2, 1.2)],
     "names": [["Atlantic Ocean", P(-22, -8)], ["Indian Ocean", P(76, -30)], ["Africa", P(22, 8)], ["Asia", P(95, 42)], ["South America", P(-58, -8)], ["Australia", P(134, -25)]]}
line = "/*WORLD*/ const WORLD5 = " + json.dumps(G, separators=(',', ':')) + "; /*WORLD*/"
f = f'{HERE}/scenes.js'; s = open(f).read()
s2 = re.sub(r"/\*WORLD\*/.*?/\*WORLD\*/", lambda m: line, s, count=1, flags=re.S)
open(f, 'w').write(s2); print('world', len(line) // 1024, 'KB', 'injected' if s2 != s or line in s else 'NO MARKER')
