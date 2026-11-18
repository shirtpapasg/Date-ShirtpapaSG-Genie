"""sg_geo.py (EP03 Part 2): prints the Singapore close-up coastline used by ep03b/scenes.js (const SG3), from the same
Natural Earth file as geo_map.py (geo/land10.geojson). Equirectangular (fine this close to the equator): 3300 px per degree,
(103.82 E, 1.31 N) at (810, 480), the middle of the screen in scene units.   python3 ep03b/sg_geo.py   (the output is pasted at the top of ep03b/scenes.js; "tuas0", the start of the barge route on the drawn coast, is added by hand)"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); K = 3300
P = lambda lon, lat: (810 + (lon - 103.82) * K, 480 - (lat - 1.31) * K)
X0, X1, Y0, Y1 = -700, 2300, -500, 1500
def clip(poly):
    def cut(pts, inside, inter):
        out = []
        for i, a in enumerate(pts):
            b = pts[(i + 1) % len(pts)]
            if inside(a):
                out.append(a)
                if not inside(b): out.append(inter(a, b))
            elif inside(b): out.append(inter(a, b))
        return out
    ix = lambda x: (lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])))
    iy = lambda y: (lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y))
    for ins, it in ((lambda p: p[0] >= X0, ix(X0)), (lambda p: p[0] <= X1, ix(X1)), (lambda p: p[1] >= Y0, iy(Y0)), (lambda p: p[1] <= Y1, iy(Y1))):
        if not poly: return []
        poly = cut(poly, ins, it)
    return poly
land = json.load(open(os.path.join(HERE, '..', 'geo', 'land10.geojson'))); d = ''; info = []
for f in land['features']:
    g = f['geometry']; polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    for poly in polys:
        r = poly[0]
        if max(p[0] for p in r) < 103.0 or min(p[0] for p in r) > 104.8 or max(p[1] for p in r) < 0.7 or min(p[1] for p in r) > 2.0: continue
        pts = clip([P(x, y) for x, y in r])
        if len(pts) > 2:
            d += 'M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in pts) + 'Z'
            info.append((min(p[0] for p in r), max(p[0] for p in r), min(p[1] for p in r), max(p[1] for p in r), len(r)))
R = lambda lon, lat: [round(v) for v in P(lon, lat)]
SG = {"land": d, "tuas": R(103.636, 1.262), "sem": R(103.772, 1.205), "mid": R(103.82, 1.355)}
if '--info' in sys.argv:
    for i in info: print(i)
else: print("/* made by ep03b/sg_geo.py from Natural Earth coastlines: 3300 px per degree, (103.82 E, 1.31 N) at (810, 480) */\nconst SG3 = " + json.dumps(SG) + ";")
