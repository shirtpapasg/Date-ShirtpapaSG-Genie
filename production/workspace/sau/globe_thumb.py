"""globe_thumb.py: the TheOneApp, Explored thumbnail style (the teacher's favourite, 18 Nov 2026).

A real globe (Natural Earth coastlines, orthographic view) in space, centred on Singapore, with the story drawn on it
at true longitude and latitude: haze, fires, pipelines, wind arrows, ships, the Sun. On top: the "TheOneApp Explored"
pill, a giant two-tone title and the hook words with a yellow border (no box). Landscape 1920x1080 for episodes,
vertical 1080x1920 for Shorts.

    python3 globe_thumb.py ep02/globe_ep02.json ep02/thumb_ep02_globe.html     then screenshot (shot.js) at W x H

Config keys (all optional except white, yellow, banner):
  W, H                 canvas (default 1920x1080; Shorts 1080x1920)
  centre [lon, lat]    globe centre (default Singapore); R zoom; cx, cy, disk = where the globe sits and its radius
  haze  [[[lon,lat], rx, ry, opacity], ...]       fires [[lon,lat], ...]       labels [[text, [lon,lat], size], ...]
  lines [{"pts": [[lon,lat], ...], "col": "#ffd166", "w": 10, "dash": "18 14"}, ...]   (pipelines, cables, routes)
  arrows [{"from": [lon,lat], "to": [lon,lat], "col": "#ffd166"}, ...]                (winds)
  icons [{"at": [lon,lat] or "xy": [x,y], "e": "🚢", "size": 80}, ...]
  sun {"xy": [x, y], "size": 220}                 a Sun off the globe with rays towards it
  sources [{"at": [lon,lat], "label": "West Natuna gas fields", "dy": -60}, ...]   where a pipeline starts (a gas-field marker)
  singapore true/false (marker and label; default true)
  badge "PART 1"       a tilted red sticker in the top-right corner (a two-part episode)
Coastlines: Natural Earth 1:10m land and 1:50m countries (public domain), in geo/ (not in git: download
  ne_10m_land.geojson as geo/land10.geojson and ne_50m_admin_0_countries.geojson as geo/countries.geojson from
  github.com/nvkelso/natural-earth-vector, folder geojson).
"""
import json, math, sys, os, random
cfg = json.load(open(sys.argv[1])); out = sys.argv[2]; HERE = os.path.dirname(os.path.abspath(__file__))
W, H = cfg.get('W', 1920), cfg.get('H', 1080); V = H > W
L0, P0 = map(math.radians, cfg.get('centre', [103.82, 1.35])); R = cfg.get('R', 2300)
CX, CY, DISK = cfg.get('cx', W / 2), cfg.get('cy', 960 if V else 600), cfg.get('disk', 500 if V else 520)
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
for lat in range(-30, 31, 5): grat += 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in filter(None, (proj(lon / 2, lat) for lon in range(150, 260)))) + ' '   # points behind the globe are skipped (a centre far from Singapore)
for lon in range(75, 131, 5): grat += 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in filter(None, (proj(lon, lat / 2) for lat in range(-60, 61)))) + ' '
P = lambda ll: proj(*ll)
haze = ''.join(f'<ellipse cx="{P(h[0])[0]:.0f}" cy="{P(h[0])[1]:.0f}" rx="{h[1]}" ry="{h[2]}" fill="#7d6f5a" opacity="{h[3]}" filter="url(#blur)"/>' for h in cfg.get('haze', []))
fires = ''.join(f'<text x="{P(f)[0]:.0f}" y="{P(f)[1]:.0f}" font-size="62" text-anchor="middle" dominant-baseline="central" class="emo">🔥</text>' for f in cfg.get('fires', []))
labels = ''.join(f'<text x="{P(l[1])[0]:.0f}" y="{P(l[1])[1]:.0f}" font-size="{l[2]}" text-anchor="middle" fill="#fff" class="out" stroke-width="8" font-weight="700" opacity=".95">{l[0]}</text>' for l in cfg.get('labels', []) if l[2])
def curve(pts):
    q = [P(p) for p in pts]; d = f'M{q[0][0]:.0f} {q[0][1]:.0f}'
    if len(q) == 3: return d + f' Q{q[1][0]:.0f} {q[1][1]:.0f} {q[2][0]:.0f} {q[2][1]:.0f}'
    return d + ''.join(f' L{x:.0f} {y:.0f}' for x, y in q[1:])
lines = ''.join(f'<path d="{curve(l["pts"])}" fill="none" stroke="#1b1b3a" stroke-width="{l.get("w", 10) + 9}" stroke-linecap="round"/>'
                f'<path d="{curve(l["pts"])}" fill="none" stroke="{l.get("col", "#ffd166")}" stroke-width="{l.get("w", 10)}" stroke-linecap="round" stroke-dasharray="{l.get("dash", "none")}"/>' for l in cfg.get('lines', []))
def arrow(a):
    (x1, y1), (x2, y2) = P(a['from']), P(a['to']); ang = math.degrees(math.atan2(y2 - y1, x2 - x1)); L = math.hypot(x2 - x1, y2 - y1)
    return (f'<g transform="translate({x1:.0f} {y1:.0f}) rotate({ang:.1f})"><path d="M0 -16 H{L - 46:.0f} V-40 L{L:.0f} 0 L{L - 46:.0f} 40 V16 H0 Z" '
            f'fill="{a.get("col", "#ffd166")}" stroke="#1b1b3a" stroke-width="6" stroke-linejoin="round" opacity=".95"/></g>')
arrows = ''.join(arrow(a) for a in cfg.get('arrows', []))
def icon(i):
    x, y = P(i['at']) if 'at' in i else i['xy']
    return f'<text x="{x:.0f}" y="{y:.0f}" font-size="{i.get("size", 80)}" text-anchor="middle" dominant-baseline="central" class="emo">{i["e"]}</text>'
def source(sr):
    x, y = P(sr['at']); dy = sr.get('dy', -58)
    return (f'<circle cx="{x:.0f}" cy="{y:.0f}" r="30" fill="#1b1b3a" stroke="#ffd166" stroke-width="7"/>'
            f'<text x="{x:.0f}" y="{y + 9:.0f}" text-anchor="middle" font-size="24" font-weight="700" fill="#ffd166">GAS</text>'
            f'<text x="{x + sr.get("dx", 0):.0f}" y="{y + dy:.0f}" text-anchor="{sr.get("anchor", "middle")}" font-size="{sr.get("size", 30)}" font-weight="700" fill="#fff" class="out" stroke-width="8">{sr["label"]}</text>')
sources = ''.join(source(sr) for sr in cfg.get('sources', []))
icons_in = ''.join(icon(i) for i in cfg.get('icons', []) if 'at' in i); icons_out = ''.join(icon(i) for i in cfg.get('icons', []) if 'xy' in i)
sun = ''
if cfg.get('sun'):
    sx, sy = cfg['sun']['xy']; sz = cfg['sun'].get('size', 220); a0 = math.atan2(CY - sy, CX - sx)
    rays = ''.join(f'<line x1="{sx + math.cos(a0 + d) * sz * .7:.0f}" y1="{sy + math.sin(a0 + d) * sz * .7:.0f}" x2="{sx + math.cos(a0 + d) * (sz * .7 + 520):.0f}" '
                   f'y2="{sy + math.sin(a0 + d) * (sz * .7 + 520):.0f}" stroke="#ffd166" stroke-width="14" stroke-linecap="round" stroke-dasharray="40 26" opacity=".85"/>' for d in (-.28, -.14, 0, .14, .28))
    sun = f'<circle cx="{sx}" cy="{sy}" r="{sz * .8:.0f}" fill="#ffbe0b" opacity=".45" filter="url(#glow)"/>{rays}<text x="{sx}" y="{sy}" font-size="{sz}" text-anchor="middle" dominant-baseline="central" class="emo">☀️</text>'
sg = P([103.82, 1.35])
sgm = '' if cfg.get('singapore') is False else (f'<circle cx="{sg[0]:.0f}" cy="{sg[1]:.0f}" r="13" fill="#e63946" stroke="#fff" stroke-width="5"/><circle cx="{sg[0]:.0f}" cy="{sg[1]:.0f}" r="34" fill="none" stroke="#fff" stroke-width="5"/>'
    f'<circle cx="{sg[0]:.0f}" cy="{sg[1]:.0f}" r="56" fill="none" stroke="#fff" stroke-width="2.5" opacity=".6"/>'
    f'<text x="{sg[0] + 64:.0f}" y="{sg[1] + 14:.0f}" font-size="46" font-weight="700" fill="#fff" class="out" stroke-width="10">Singapore</text>')
random.seed(5)
stars = ''.join(f'<circle cx="{random.random() * W:.0f}" cy="{random.random() * H:.0f}" r="{.8 + random.random() * 2:.1f}" fill="#fff" opacity="{.3 + random.random() * .6:.2f}"/>' for _ in range(int(150 * W * H / 2073600)))
fonts = os.path.relpath(os.path.join(HERE, 'fonts/node_modules/@fontsource/fredoka/files'), os.path.dirname(os.path.abspath(out)))
TS = cfg.get('titleSize', 150 if V else 170)
if V:   # Short: the two title parts on two centred lines, the hook words near the bottom
    title = (f'<text x="{W / 2}" y="330" text-anchor="middle" font-size="{TS}" font-weight="700" class="out" stroke-width="28" fill="#fff">{cfg["white"]}</text>'
             f'<text x="{W / 2}" y="{330 + TS * 1.05:.0f}" text-anchor="middle" font-size="{TS}" font-weight="700" class="out" stroke-width="28" fill="#ffd60a">{cfg["yellow"]}</text>')
    pill = f'<rect x="{W / 2 - 290}" y="70" width="580" height="96" rx="48" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="{W / 2}" y="135" text-anchor="middle" font-size="54" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>'
    by, bs = H - 260, cfg.get('bannerSize', 96)
else:
    title = f'<text x="60" y="300" font-size="{TS}" font-weight="700" class="out" stroke-width="30"><tspan fill="#fff">{cfg["white"]}</tspan> <tspan fill="#ffd60a">{cfg["yellow"]}</tspan></text>'
    pill = '<rect x="50" y="40" width="560" height="90" rx="45" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="330" y="101" text-anchor="middle" font-size="50" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>'
    by, bs = 1000, cfg.get('bannerSize', 112)
banner = (f'<text x="{W / 2}" y="{by}" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="5" fill="#1b1b3a" stroke="#1b1b3a" stroke-width="30" stroke-linejoin="round">{cfg["banner"]}</text>'
          f'<text x="{W / 2}" y="{by}" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="5" fill="#1b1b3a" stroke="#ffd60a" stroke-width="15" stroke-linejoin="round" style="paint-order:stroke">{cfg["banner"]}</text>')
bx, bg_ = (W - 230, 260) if V else (W - 210, 110)
badge = (f'<g transform="translate({bx} {bg_}) rotate(8)"><rect x="-170" y="-62" width="340" height="124" rx="26" fill="#e63946" stroke="#fff" stroke-width="8"/>'
         f'<text x="0" y="28" text-anchor="middle" font-size="84" font-weight="700" fill="#fff" class="out" stroke-width="10">{cfg["badge"]}</text></g>') if cfg.get('badge') else ''
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Fredoka;font-weight:600;src:url({fonts}/fredoka-latin-600-normal.woff2)}}@font-face{{font-family:Fredoka;font-weight:700;src:url({fonts}/fredoka-latin-700-normal.woff2)}}
html,body{{margin:0;background:#000;width:{W}px;height:{H}px;overflow:hidden}} text{{font-family:Fredoka,sans-serif}} .emo{{font-family:"Noto Color Emoji"}} .out{{paint-order:stroke;stroke:#1b1b3a;stroke-linejoin:round}}
</style></head><body><svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg"><defs>
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
<clipPath id="disk"><circle cx="{CX}" cy="{CY}" r="{DISK}"/></clipPath>
<radialGradient id="sea" cx=".4" cy=".35"><stop offset="0" stop-color="#4fb3e8"/><stop offset="1" stop-color="#0b4f8a"/></radialGradient>
<radialGradient id="shade" cx=".4" cy=".35"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="#020817"/>{stars}{sun}
<circle cx="{CX}" cy="{CY}" r="{DISK + 18}" fill="#4cc9f0" opacity=".45" filter="url(#glow)"/>
<g clip-path="url(#disk)"><circle cx="{CX}" cy="{CY}" r="{DISK}" fill="url(#sea)"/>
<path d="{grat}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".18"/>
<path d="{land_d}" fill="#7fbf7f" stroke="#2d5a3d" stroke-width="2.5" stroke-linejoin="round"/>
<path d="{border_d}" fill="none" stroke="#2d5a3d" stroke-width="2" stroke-dasharray="7 6" opacity=".7"/>
{haze}{lines}{sources}{fires}{labels}{icons_in}{arrows}
<circle cx="{CX}" cy="{CY}" r="{DISK}" fill="url(#shade)"/></g>
{sgm}{icons_out}
<rect width="{W}" height="{H * .3:.0f}" fill="url(#top)"/>
{pill}{title}{banner}{badge}
</svg></body></html>'''
open(out, 'w').write(html); print('wrote', out, W, 'x', H)
