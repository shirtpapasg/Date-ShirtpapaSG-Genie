"""sg_geo.py: prints the Singapore close-up map data used by ep04/scenes.js (const SG4), from the same Natural Earth
coastline file as geo_map.py (geo/land10.geojson). Equirectangular (fine this close to the equator): 2400 px per degree,
(103.82 E, 1.352 N) at (600, 430) of the 1200 x 900 scene box.   python3 ep04/sg_geo.py"""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__)); K = 2400
P = lambda lon, lat: (600 + (lon - 103.82) * K, 430 - (lat - 1.352) * K)
X0, X1, Y0, Y1 = -260, 1880, -160, 1120          # clip box in scene units (a little more than the whole screen)
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
land = json.load(open(os.path.join(HERE, '..', 'geo', 'land10.geojson'))); d = ''
for f in land['features']:
    g = f['geometry']; polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    for poly in polys:
        r = [p for p in poly[0]]
        if max(p[0] for p in r) < 103.0 or min(p[0] for p in r) > 104.7 or max(p[1] for p in r) < 0.8 or min(p[1] for p in r) > 1.9: continue
        pts = clip([P(x, y) for x, y in r])
        if len(pts) > 2: d += 'M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in pts) + 'Z'
R = lambda lon, lat: [round(v) for v in P(lon, lat)]
SG = {"land": d,
      # reservoirs at their real positions (lon, lat); the first four carry a name on the map
      "res": [["MacRitchie Reservoir", R(103.826, 1.344)], ["Marina Reservoir", R(103.867, 1.287)], ["Kranji Reservoir", R(103.738, 1.432)], ["Bedok Reservoir", R(103.925, 1.342)],
              ["", R(103.795, 1.372)], ["", R(103.827, 1.371)], ["", R(103.803, 1.403)], ["", R(103.833, 1.410)], ["", R(103.741, 1.315)], ["", R(103.727, 1.341)],
              ["", R(103.917, 1.393)], ["", R(103.905, 1.402)], ["", R(103.648, 1.345)], ["", R(103.662, 1.381)], ["", R(103.675, 1.396)], ["", R(103.690, 1.420)]],
      # the Kallang River: Lower Peirce Reservoir -> Bishan -> Potong Pasir -> Kallang Basin -> Marina Reservoir
      "kallang": [R(103.827, 1.371), R(103.842, 1.358), R(103.853, 1.349), R(103.866, 1.333), R(103.871, 1.318), R(103.868, 1.303), R(103.867, 1.287)]}
print("const SG4 = " + json.dumps(SG) + ";")
