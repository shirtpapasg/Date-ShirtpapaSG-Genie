"""ep13/geo13.py: writes ep13/geo13.js, EP13's real maps (rule 9), from Natural Earth (geo/land10.geojson, geo/countries.geojson),
drawn in scene units (the 1200 x 900 box at screen (150, 60); the whole screen is x -150..1770, y -60..1020).
  PAC    the tropical Pacific, a plain longitude/latitude map (equirectangular), 95E to 70W, 32S to 32N, Asia on the LEFT
         (the trade wind blows from the right to the left): Singapore, the Nino 3.4 box (5S-5N, 170W-120W), Peru, Darwin
  GLOBE  an orthographic globe centred 160E 5N (the zoom out from Singapore over the Pacific)
  IND    India, orthographic, centre 80E 22N: India's outline (for the shading clip), the South Peninsula and the
         North-East at their real places (IMD regions), New Delhi
  USA    the United States, orthographic, centre 97W 39N: California, Florida, the northern states (Montana, Minnesota, Maine)
Every place is put at its real longitude and latitude.     python3 ep13/geo13.py      (from workspace/sau)"""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); G = os.path.join(H, '..', 'geo')
land = json.load(open(f'{G}/land10.geojson')); ctry = json.load(open(f'{G}/countries.geojson'))
def rings(g): return g['coordinates'] if g['type'] == 'Polygon' else [r for p in g['coordinates'] for r in p] if g['type'] == 'MultiPolygon' else []
def ortho(lon0, lat0, R, cx, cy):
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
        pts = [(min(max(x, box[0] - 300), box[2] + 300), min(max(y, box[1] - 300), box[3] + 300)) for x, y in pts]
        if len(pts) < 3 or not any(box[0] < x < box[2] and box[1] < y < box[3] for x, y in pts): continue
        o = [pts[0]]
        for q in pts[1:]:
            if math.hypot(q[0] - o[-1][0], q[1] - o[-1][1]) >= step: o.append(q)
        if len(o) > 3: out.append('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in o) + 'Z')
    return ''.join(out)
r1 = lambda q: [round(q[0], 1), round(q[1], 1)]
OUT = {}
# ---- PAC: equirectangular, lon 95E..290E (= 70W), lat -32..32, x from -110 to 1730 (the whole screen width)
LON0, LON1, LAT0, LAT1, X0, X1, YC = 95, 290, -32, 32, -110, 1730, 470
K = (X1 - X0) / (LON1 - LON0)
def pe(lon, lat):
    lon = lon % 360
    return (X0 + (lon - LON0) * K, YC - lat * K)
def pac_rings():
    for f in ctry['features']:
        for r in rings(f['geometry']):
            ls = [x % 360 for x, _ in r]
            if max(ls) - min(ls) > 180: continue          # rings that cross 0 degrees (Europe, Africa): far outside this map
            if all(not (LON0 - 5 <= x <= LON1 + 5) for x in ls[::max(1, len(ls) // 80)]): continue
            yield [(x % 360, y) for x, y in r]
OUT['PAC'] = {"land": path(list(pac_rings()), pe, (-150, -60, 1770, 1020), 2.0), "k": round(K, 4), "yc": YC, "x0": X0, "lon0": LON0,
              "sg": r1(pe(103.82, 1.35)), "nino34": [r1(pe(190, 5)), r1(pe(240, -5))], "peru": r1(pe(-77.0, -12.0)), "darwin": r1(pe(130.84, -12.46)),
              "eq": [r1(pe(LON0, 0)), r1(pe(LON1, 0))], "date": r1(pe(180, 0)), "ecuador": r1(pe(-79.0, -1.5)), "indo": r1(pe(113.9, -0.8))}
# ---- GLOBE: the Pacific seen from space (countries at 1:50m)
pg = ortho(160, 5, 430, 600, 450)
OUT['GLOBE'] = {"land": path([r for f in ctry['features'] for r in rings(f['geometry'])], pg, (-500, -500, 1700, 1400), 2.2),
                "grat": ' '.join('M' + 'L'.join(f'{q[0]:.1f} {q[1]:.1f}' for q in (pg(lo, la) for lo in range(60, 270, 3)) if q) for la in range(-60, 61, 30)) + ' ' +
                        ' '.join('M' + 'L'.join(f'{q[0]:.1f} {q[1]:.1f}' for q in (pg(lo, la) for la in range(-80, 81, 3)) if q) for lo in range(80, 261, 30)),
                "c": [600, 450], "r": 430, "sg": r1(pg(103.82, 1.35)), "mid": r1(pg(-150, 0)), "east": r1(pg(-128, 0))}
# ---- IND: India (ADMIN India), neighbours at 1:50m
pi = ortho(80, 22, 1650, 600, 470)
ind = [r for f in ctry['features'] if f['properties'].get('ADMIN') == 'India' for r in rings(f['geometry'])]
nb = [r for f in ctry['features'] if f['properties'].get('ADMIN') != 'India' for r in rings(f['geometry'])]
box = (-150, -60, 1770, 1020)
OUT['IND'] = {"india": path(ind, pi, box, 1.6), "others": path(nb, pi, box, 1.8),
              # IMD's South Peninsula (Kerala, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana: about 8N-19N) and East & North-East
              # (the seven north-east states, about 22N-29N, 89E-97E): centres and sizes at their real places
              "south": r1(pi(77.6, 13.6)), "southR": [round(pi(77.6, 19.0)[1] - pi(77.6, 8.2)[1], 1)], "ne": r1(pi(93.4, 25.6)),
              "delhi": r1(pi(77.21, 28.61)), "mumbai": r1(pi(72.88, 19.08)), "kolkata": r1(pi(88.36, 22.57))}
OUT['IND']["southR"] = [abs(OUT['IND']["southR"][0]) / 2, abs(pi(80.5, 14)[0] - pi(74.5, 14)[0]) / 2]
OUT['IND']["neR"] = [abs(pi(97.4, 26)[0] - pi(89.6, 26)[0]) / 2, abs(pi(93, 29.3)[1] - pi(93, 22.3)[1]) / 2]
# ---- USA: the lower 48 (countries at 1:50m; Canada and Mexico drawn paler)
pu = ortho(-97, 39, 1450, 600, 470)
usa = [r for f in ctry['features'] if f['properties'].get('ADMIN') == 'United States of America' for r in rings(f['geometry'])]
oth = [r for f in ctry['features'] if f['properties'].get('ADMIN') in ('Canada', 'Mexico', 'Cuba', 'The Bahamas', 'Guatemala') for r in rings(f['geometry'])]
OUT['USA'] = {"usa": path(usa, pu, box, 1.6), "others": path(oth, pu, box, 1.8),
              "california": r1(pu(-119.6, 37.2)), "florida": r1(pu(-81.6, 28.3)), "texas": r1(pu(-99.0, 31.2)), "montana": r1(pu(-109.6, 47.0)),
              "minnesota": r1(pu(-94.3, 46.3)), "maine": r1(pu(-69.2, 45.3)), "michigan": r1(pu(-84.7, 44.3))}
js = "/* ep13/geo13.js: made by ep13/geo13.py from Natural Earth (real coastlines; places at real longitude and latitude). */\nconst GEO13 = " + json.dumps(OUT) + ";\n"
open(os.path.join(H, 'geo13.js'), 'w').write(js)
print('geo13.js', len(js) // 1024, 'KB', {k: {kk: v for kk, v in OUT[k].items() if kk not in ('land', 'grat', 'india', 'others', 'usa')} for k in OUT})
