"""ep13/thumb13.py: EP13's episode thumbnail in the series' globe style (globe_thumb.py, the teacher's favourite).
The globe is turned to the Pacific (centre 172E 3N) so that Singapore (left) and the warm middle of the Pacific (right) are both on it,
at their true places. globe_thumb.py keeps only land near Singapore, so the land and the grid are redrawn here for the whole visible
hemisphere with the SAME projection (Natural Earth 1:50m countries), so Japan and the Americas' edge are not missing (rule 9).
On top (our own drawing): the warm water (orange) over the Nino 3.4 region and east of it, rain clouds that moved east, a Sun over
Singapore, and Pip (the teacher's painting) with his paper fan.
    python3 ep13/thumb13.py        (from workspace/sau) -> ep13/globe_ep13.json, ep13/thumb_ep13.png, ep13/thumb_ep13.jpg (1280x720)"""
import json, os, subprocess, math
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); E = 'ep13'; T = '/tmp/ep13_thumb'; os.makedirs(T, exist_ok=True)
env = dict(os.environ, NODE_PATH=subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip())
G = {"centre": [172, 3], "R": 540, "cx": 1300, "cy": 590, "disk": 540, "white": "SUPER", "yellow": "EL NIÑO!", "titleSize": 170,
     "banner": "Why is Singapore so hot and dry?", "bannerSize": 92,
     "labels": [["Pacific Ocean", [-178, 20], 42]],
     "icons": [{"at": [-150, 3], "e": "🌧️", "size": 86}, {"at": [-118, -2], "e": "🌧️", "size": 76}, {"at": [104, 12], "e": "☀️", "size": 96}]}
json.dump(G, open(f'{E}/globe_ep13.json', 'w'), indent=1, ensure_ascii=False)
subprocess.run(['python3', 'globe_thumb.py', f'{E}/globe_ep13.json', f'{T}/ep.html'], check=True)
h = open(f'{T}/ep.html').read()
# the same orthographic projection as globe_thumb.py
L0, P0 = map(math.radians, G['centre']); R, CX, CY = G['R'], G['cx'], G['cy']
def proj(lon, lat):
    l, p = math.radians(lon), math.radians(lat)
    if math.sin(P0) * math.sin(p) + math.cos(P0) * math.cos(p) * math.cos(l - L0) < 0: return None
    return (CX + R * math.cos(p) * math.sin(l - L0), CY - R * (math.cos(P0) * math.sin(p) - math.sin(P0) * math.cos(p) * math.cos(l - L0)))
ctry = json.load(open('geo/countries.geojson'))
def rings(g): return g['coordinates'] if g['type'] == 'Polygon' else [r for p in g['coordinates'] for r in p] if g['type'] == 'MultiPolygon' else []
def path(r):
    q = [proj(x, y) for x, y in r]; q = [a for a in q if a]
    return ('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in q) + 'Z') if len(q) > 2 else ''
land = ''.join(path(r) for f in ctry['features'] for r in rings(f['geometry']))
grat = ' '.join('M' + 'L'.join(f'{q[0]:.1f} {q[1]:.1f}' for q in (proj(lo, la) for lo in range(60, 280, 2)) if q) for la in range(-60, 61, 15)) + ' ' + \
       ' '.join('M' + 'L'.join(f'{q[0]:.1f} {q[1]:.1f}' for q in (proj(lo, la) for la in range(-80, 81, 2)) if q) for lo in range(75, 271, 15))
a = h.index('<path d="', h.index('clip-path="url(#disk)"')); b = h.index('/>', a)          # the grid
h = h[:a] + f'<path d="{grat}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".18"/>' + h[b + 2:]
a = h.index('<path d="', a + 10); b = h.index('/>', a)                                       # the land
h = h[:a] + f'<path d="{land}" fill="#7fbf7f" stroke="#2d5a3d" stroke-width="2.5" stroke-linejoin="round"/>' + h[b + 2:]
# the warm water: the middle and east of the tropical Pacific (Nino 3.4 is 5S-5N, 170W-120W), drawn as a soft orange band under the land
pts = [proj(lo, la) for lo, la in ((-178, 0), (-150, 0), (-120, 0), (-95, 0))]
warm = ''.join(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{110 + i * 12}" ry="58" fill="#ff7b00" opacity=".85" filter="url(#blur)"/>' for i, (x, y) in enumerate(p for p in pts if p))
h = h.replace(f'<path d="{land}"', warm + f'<path d="{land}"', 1)
# Pip with his paper fan, bottom left (the teacher's painting; words never cover his face; no disc behind him: teacher, 27 Nov 2026)
pip = ('<g transform="translate(330 900)">'
       '<image href="../../explained2/ep27/spr/pip_surprised.png" x="-210" y="-390" width="420" height="420" preserveAspectRatio="xMidYMax meet"/>'
       '<g transform="translate(170 -215) rotate(25)"><path d="M0 0 L-60 -96 A112 112 0 0 1 60 -96 Z" fill="#ffb703" stroke="#1b1b3a" stroke-width="6" stroke-linejoin="round"/></g></g>')
h = h.replace('<rect width="1920" height="324"', pip + '<rect width="1920" height="324"', 1) if '<rect width="1920" height="324"' in h else h.replace('</svg></body>', pip + '</svg></body>')
open(f'{E}/thumb_ep13_globe.html', 'w').write(h)
subprocess.run(['node', 'shot.js', f'{E}/thumb_ep13_globe.html', f'{E}/thumb_ep13.png', '1920', '1080'], check=True, env=env)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{E}/thumb_ep13.png', '-vf', 'scale=1280:720', '-q:v', '2', f'{E}/thumb_ep13.jpg'], check=True)
print('wrote', f'{E}/thumb_ep13.jpg', os.path.getsize(f'{E}/thumb_ep13.jpg') // 1024, 'KB')
