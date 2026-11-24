"""ep11/geo11.py: writes ep11/geo11.js, EP11's three real maps (rule 9), from the same Natural Earth files as geo_map.js
(geo/land10.geojson, geo/countries.geojson). Orthographic views, drawn in the scenes' 1200 x 900 box:
  GLOBE   the Pacific, centre 172E 22N: Nvidia's home (Santa Clara, California), Hsinchu (Taiwan) and Singapore
  REGION  East and South-East Asia, centre 112E 13N: Taiwan and Singapore
  SGMAP   Singapore close up: Woodlands and Tampines (chip factories, "wafer fabs")
Every place is put at its real longitude and latitude.     python3 ep11/geo11.py      (from workspace/sau)"""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); G = os.path.join(H, '..', 'geo')
land = json.load(open(f'{G}/land10.geojson')); ctry = json.load(open(f'{G}/countries.geojson'))
def rings(g): return g['coordinates'] if g['type'] == 'Polygon' else [r for p in g['coordinates'] for r in p] if g['type'] == 'MultiPolygon' else []
def view(lon0, lat0, R, cx, cy):
    L0, P0 = math.radians(lon0), math.radians(lat0)
    def proj(lon, lat):
        l, p = math.radians(lon), math.radians(lat)
        if math.sin(P0) * math.sin(p) + math.cos(P0) * math.cos(p) * math.cos(l - L0) < 0.02: return None
        return (cx + R * math.cos(p) * math.sin(l - L0), cy - R * (math.cos(P0) * math.sin(p) - math.sin(P0) * math.cos(p) * math.cos(l - L0)))
    return proj
def path(rs, proj, box, step):
    out = []
    for r in rs:
        pts = [proj(x, y) for x, y in r]; pts = [q for q in pts if q]
        pts = [(min(max(x, box[0] - 300), box[2] + 300), min(max(y, box[1] - 300), box[3] + 300)) for x, y in pts]   # off-screen parts flattened
        if len(pts) < 3 or not any(box[0] < x < box[2] and box[1] < y < box[3] for x, y in pts): continue
        o = [pts[0]]
        for q in pts[1:]:
            if math.hypot(q[0] - o[-1][0], q[1] - o[-1][1]) >= step: o.append(q)
        if len(o) > 3: out.append('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in o) + 'Z')
    return ''.join(out)
PL = {"santaclara": (-121.955, 37.354), "hsinchu": (120.97, 24.80), "sg": (103.82, 1.35), "woodlands": (103.786, 1.436), "tampines": (103.945, 1.354)}
OUT = {}
# GLOBE: whole visible hemisphere (countries at 1:50m; the coast is the countries' outer edge)
pg = view(172, 22, 430, 600, 460)
OUT['GLOBE'] = {"land": path([r for f in ctry['features'] for r in rings(f['geometry'])], pg, (-500, -500, 1700, 1400), 2.2),
                "grat": ' '.join('M' + 'L'.join(f'{q[0]:.1f} {q[1]:.1f}' for q in (pg(lo, la) for lo in range(80, 270, 3)) if q) for la in range(-60, 61, 30)) + ' ' +
                        ' '.join('M' + 'L'.join(f'{q[0]:.1f} {q[1]:.1f}' for q in (pg(lo, la) for la in range(-80, 81, 3)) if q) for lo in range(90, 271, 30)),
                "c": [600, 460], "r": 430, **{k: [round(v, 1) for v in pg(*PL[k])] for k in ("santaclara", "hsinchu", "sg")}}
# REGION: land at 1:10m
pr = view(112, 13, 1500, 600, 450)
near = lambda r: any(88 < x < 140 and -15 < y < 40 for x, y in r[::max(1, len(r) // 60)] + [r[0]])
OUT['REGION'] = {"land": path([r for f in land['features'] for r in rings(f['geometry']) if near(r)], pr, (-200, -200, 1400, 1100), 1.6),
                 **{k: [round(v, 1) for v in pr(*PL[k])] for k in ("hsinchu", "sg")}}
# SGMAP: Singapore and its neighbours' coasts at 1:10m
ps = view(103.83, 1.36, 115000, 600, 470)
nr = lambda r: any(103.3 < x < 104.4 and 0.9 < y < 1.8 for x, y in r[::max(1, len(r) // 200)] + [r[0]])
OUT['SGMAP'] = {"land": path([r for f in land['features'] for r in rings(f['geometry']) if nr(r)], ps, (-300, -300, 1500, 1200), 1.4),
                "border": path([r for f in ctry['features'] if f['properties'].get('ADMIN') in ('Malaysia', 'Indonesia') for r in rings(f['geometry']) if nr(r)], ps, (-300, -300, 1500, 1200), 1.4),
                **{k: [round(v, 1) for v in ps(*PL[k])] for k in ("woodlands", "tampines", "sg")}}
js = "/* ep11/geo11.js: made by ep11/geo11.py from Natural Earth (real coastlines; places at real longitude and latitude). */\nconst GEO11 = " + json.dumps(OUT) + ";\n"
open(os.path.join(H, 'geo11.js'), 'w').write(js); print('geo11.js', len(js) // 1024, 'KB', {k: {kk: v for kk, v in OUT[k].items() if kk not in ('land', 'grat', 'border')} for k in OUT})
