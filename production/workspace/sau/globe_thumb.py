"""globe_thumb.py: a Science Around Us thumbnail on a real globe (Natural Earth coastlines, orthographic view)
centred on Singapore, in the P5 thumbnail style (pill, giant two-tone title, yellow banner).
    python3 globe_thumb.py ep01/globe_ep01.json ep01/thumb_ep01.html    then screenshot it at 1920x1080
Coastlines: Natural Earth 1:10m land and 1:50m countries (public domain), in geo/ (not in git: download
  ne_10m_land.geojson as geo/land10.geojson and ne_50m_admin_0_countries.geojson as geo/countries.geojson from
  github.com/nvkelso/natural-earth-vector, folder geojson).
"""
import json, math, sys, os
cfg = json.load(open(sys.argv[1])); out = sys.argv[2]; HERE = os.path.dirname(os.path.abspath(__file__))
L0, P0 = map(math.radians, cfg.get('centre', [103.82, 1.35])); R = cfg.get('R', 2200); CX, CY, DISK = cfg.get('cx', 960), cfg.get('cy', 600), cfg.get('disk', 520)
def proj(lon, lat):
    l, p = math.radians(lon), math.radians(lat)
    if math.sin(P0) * math.sin(p) + math.cos(P0) * math.cos(p) * math.cos(l - L0) < 0: return None
    return (CX + R * math.cos(p) * math.sin(l - L0), CY - R * (math.cos(P0) * math.sin(p) - math.sin(P0) * math.cos(p) * math.cos(l - L0)))
def near(ring, deg=28): return any(abs(x - 103.8) < deg and abs(y - 1.35) < deg for x, y in ring[::max(1, len(ring) // 50)] + [ring[0]])
def rings(geom):
    if geom['type'] == 'Polygon': return geom['coordinates']
    if geom['type'] == 'MultiPolygon': return [r for poly in geom['coordinates'] for r in poly]
    return []
def path(ring):
    pts = [proj(x, y) for x, y in ring]; pts = [q for q in pts if q]
    return ('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z') if len(pts) > 2 else ''
land = json.load(open(f'{HERE}/geo/land10.geojson')); ctry = json.load(open(f'{HERE}/geo/countries.geojson'))
land_d = ''.join(path(r) for f in land['features'] for r in rings(f['geometry']) if near(r))
border_d = ''.join(path(r) for f in ctry['features'] if f['properties'].get('ADMIN') in ('Indonesia', 'Malaysia', 'Brunei') for r in rings(f['geometry']) if near(r))
grat = ''
for lat in range(-30, 31, 5): grat += 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in (proj(lon / 2, lat) for lon in range(150, 260)) if x) + ' '
for lon in range(75, 131, 5): grat += 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in (proj(lon, lat / 2) for lat in range(-60, 61)) if x) + ' '
def P(ll): q = proj(*ll); return q
haze = ''.join(f'<ellipse cx="{P(h[0])[0]:.0f}" cy="{P(h[0])[1]:.0f}" rx="{h[1]}" ry="{h[2]}" fill="#7d6f5a" opacity="{h[3]}" filter="url(#blur)"/>' for h in cfg['haze'])
fires = ''.join(f'<text x="{P(f)[0]:.0f}" y="{P(f)[1]:.0f}" font-size="62" text-anchor="middle" dominant-baseline="central" class="emo">🔥</text>' for f in cfg['fires'])
labels = ''.join(f'<text x="{P(l[1])[0]:.0f}" y="{P(l[1])[1]:.0f}" font-size="{l[2]}" text-anchor="middle" fill="#fff" class="out" stroke-width="8" font-weight="700" opacity=".95">{l[0]}</text>' for l in cfg['labels'])
sg = P([103.82, 1.35])
import random; random.seed(5)
stars = ''.join(f'<circle cx="{random.random()*1920:.0f}" cy="{random.random()*1080:.0f}" r="{.8+random.random()*2:.1f}" fill="#fff" opacity="{.3+random.random()*.6:.2f}"/>' for _ in range(150))
fonts = os.path.relpath(os.path.join(HERE, 'fonts/node_modules/@fontsource/fredoka/files'), os.path.dirname(os.path.abspath(out)))
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Fredoka;font-weight:600;src:url({fonts}/fredoka-latin-600-normal.woff2)}}@font-face{{font-family:Fredoka;font-weight:700;src:url({fonts}/fredoka-latin-700-normal.woff2)}}
html,body{{margin:0;background:#000;width:1920px;height:1080px;overflow:hidden}} text{{font-family:Fredoka,sans-serif}} .emo{{font-family:"Noto Color Emoji"}} .out{{paint-order:stroke;stroke:#1b1b3a;stroke-linejoin:round}}
</style></head><body><svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg"><defs>
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
<clipPath id="disk"><circle cx="{CX}" cy="{CY}" r="{DISK}"/></clipPath>
<radialGradient id="sea" cx=".4" cy=".35"><stop offset="0" stop-color="#4fb3e8"/><stop offset="1" stop-color="#0b4f8a"/></radialGradient>
<radialGradient id="shade" cx=".4" cy=".35"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
<rect width="1920" height="1080" fill="#020817"/>{stars}
<circle cx="{CX}" cy="{CY}" r="{DISK + 18}" fill="#4cc9f0" opacity=".45" filter="url(#glow)"/>
<g clip-path="url(#disk)"><circle cx="{CX}" cy="{CY}" r="{DISK}" fill="url(#sea)"/>
<path d="{grat}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".18"/>
<path d="{land_d}" fill="#7fbf7f" stroke="#2d5a3d" stroke-width="2.5" stroke-linejoin="round"/>
<path d="{border_d}" fill="none" stroke="#2d5a3d" stroke-width="2" stroke-dasharray="7 6" opacity=".7"/>
{haze}{fires}{labels}
<circle cx="{CX}" cy="{CY}" r="{DISK}" fill="url(#shade)"/></g>
<circle cx="{sg[0]:.0f}" cy="{sg[1]:.0f}" r="13" fill="#e63946" stroke="#fff" stroke-width="5"/><circle cx="{sg[0]:.0f}" cy="{sg[1]:.0f}" r="34" fill="none" stroke="#fff" stroke-width="5"/>
<circle cx="{sg[0]:.0f}" cy="{sg[1]:.0f}" r="56" fill="none" stroke="#fff" stroke-width="2.5" opacity=".6"/>
<text x="{sg[0]+64:.0f}" y="{sg[1]+14:.0f}" font-size="46" font-weight="700" fill="#fff" class="out" stroke-width="10">Singapore</text>
<rect width="1920" height="330" fill="url(#top)"/>
<rect x="50" y="40" width="560" height="90" rx="45" fill="#1b1b3a" stroke="#fff" stroke-width="5"/>
<text x="330" y="101" text-anchor="middle" font-size="50" font-weight="700" fill="#fff">🌏 Science <tspan fill="#ffd60a">Around Us</tspan></text>
<text x="60" y="300" font-size="{cfg.get('titleSize', 170)}" font-weight="700" class="out" stroke-width="30"><tspan fill="#fff">{cfg['white']}</tspan> <tspan fill="#ffd60a">{cfg['yellow']}</tspan></text>
<rect x="60" y="870" width="1800" height="170" rx="85" fill="#ffd60a" stroke="#1b1b3a" stroke-width="10"/>
<text x="960" y="985" text-anchor="middle" font-size="100" font-weight="700" fill="#1b1b3a">{cfg['banner']}</text>
</svg></body></html>'''
open(out, 'w').write(html); print('wrote', out, 'land', len(land_d), 'border', len(border_d))
