"""ep11/thumb11.py: EP11's thumbnails.
  episode  the globe style (globe_thumb.py: a real Natural Earth globe, here centred between Taiwan and Singapore, both at their
           true places), with a drawn chip in front and a grain of sand turning into it; two-tone title and hook words
  Shorts   1080 x 1920 from a strong frame of each Short's own picture (as ep10/thumb_short.py / SHORTS_BRIEF.md)
    python3 ep11/thumb11.py        (from workspace/sau)  -> ep11/thumb_ep11.jpg, ep11/thumb_short1.jpg, ep11/thumb_short2.jpg"""
import json, os, subprocess, glob
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); E = 'ep11'; T = '/tmp/ep11_thumb'; os.makedirs(T, exist_ok=True)
PY = '/home/user/heart-tts/venv/bin/python'; env = dict(os.environ, NODE_PATH=subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip())

# ---- episode: the globe, then our own chip drawn on top
G = {"centre": [112, 14], "R": 1500, "cx": 1350, "cy": 560, "disk": 500, "white": "SAND", "yellow": "→ AI CHIP?!", "titleSize": 165,
     "banner": "How do you build a chip that helps AI think?", "bannerSize": 74,
     "labels": [["Taiwan", [126.2, 23.4], 44]]}
json.dump(G, open(f'{E}/globe_ep11.json', 'w'), indent=1)
subprocess.run(['python3', 'globe_thumb.py', f'{E}/globe_ep11.json', f'{T}/ep.html'], check=True)
h = open(f'{T}/ep.html').read()
def die(x, y, s):      # the chip die (top view): a silicon square of identical cores, like the episode's kDie
    o = f'<g transform="translate({x} {y})"><rect x="{-s/2}" y="{-s*.63}" width="{s}" height="{s*1.27}" rx="8" fill="url(#dieg)" stroke="#1b1b3a" stroke-width="8"/>'
    for i in range(6):
        for j in range(8): o += f'<rect x="{-s/2 + s*.07 + i*s*.143 + 3}" y="{-s*.63 + s*.07 + j*s*.125 + 3}" width="{s*.143 - 8}" height="{s*.125 - 8}" rx="4" fill="#c8b6ff" opacity=".6"/>'
    return o + f'<rect x="{-s*.43}" y="{s*.5}" width="{s*.86}" height="{s*.07}" rx="4" fill="#ffd166" opacity=".7"/></g>'
grain = ('<g transform="translate(250 700)"><path d="M-62 -10 Q-58 -60 -10 -64 Q48 -70 62 -18 Q74 30 30 54 Q-20 70 -52 40 Q-70 20 -62 -10 Z" fill="#f2d49b" stroke="#1b1b3a" stroke-width="7"/>'
         '<path d="M-30 -36 Q-10 -52 18 -48" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>'
         '<ellipse cx="-16" cy="0" rx="7" ry="10" fill="#1b1b3a"/><ellipse cx="18" cy="0" rx="7" ry="10" fill="#1b1b3a"/><path d="M-12 22 Q2 34 16 22" fill="none" stroke="#1b1b3a" stroke-width="6" stroke-linecap="round"/>'
         '<text x="0" y="120" text-anchor="middle" font-size="44" font-weight="700" fill="#fff" class="out" stroke-width="9">a grain of sand</text></g>')
arrow = '<path d="M340 680 H470 V650 L540 700 L470 750 V720 H340 Z" fill="#ffd60a" stroke="#1b1b3a" stroke-width="7" stroke-linejoin="round"/>'
chip = (f'<circle cx="790" cy="640" r="260" fill="#9d4edd" opacity=".55" filter="url(#glow)"/>' + die(790, 640, 300) +
        '<text x="790" y="880" text-anchor="middle" font-size="44" font-weight="700" fill="#fff" class="out" stroke-width="9">a chip</text>')
defs = '<linearGradient id="dieg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a4fcf"/><stop offset=".35" stop-color="#2a9d8f"/><stop offset=".6" stop-color="#4361ee"/><stop offset="1" stop-color="#7b2cbf"/></linearGradient>'
h = h.replace('</defs>', defs + '</defs>', 1).replace('<rect x="50" y="40" width="560"', grain + arrow + chip + '<rect x="50" y="40" width="560"', 1)
open(f'{T}/ep.html', 'w').write(h)
subprocess.run(['node', 'shot.js', f'{T}/ep.html', f'{T}/thumb_ep11.png', '1920', '1080'], check=True, env=env)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{T}/thumb_ep11.png', '-vf', 'scale=1280:720', '-q:v', '3', f'{E}/thumb_ep11.jpg'], check=True)

# ---- the Shorts: a frame of the Short's own picture (one picture-only segment of that scene), pill, title, hook line
C = {'short1': dict(scene='povSand', id='c1', dur=4.0, at=3.6, zoom=1.0, cx=540, cy=960, white=['A GRAIN', 'OF SAND'], yellow='→ A CHIP?!', size=[150, 150, 150], banner='Drawn with light! ✨', bs=86),
     'short2': dict(scene='hall', id='x', dur=10.0, at=9.8, zoom=1.0, cx=540, cy=960, white=['ONE TEACHER'], yellow='OR A WHOLE HALL?', size=[140, 112], banner='CPU vs GPU 🧠', bs=96)}
fonts = os.path.relpath(f'{H}/fonts/node_modules/@fontsource/fredoka/files', T)
for name, c in C.items():
    seg = {'episode': 'thumb', 'title': ' ', 'tag': ' ', 'outro': 1, 'segments': [{'id': c['id'], 'scene': c['scene'], 'silent': c['dur'], 'sfx': []}]}
    json.dump(seg, open(f'{T}/{name}_segments.json', 'w'))
    subprocess.run([PY, 'build_tl.py', f'{T}/{name}_segments.json', f'{T}/aud', f'{T}/{name}'], check=True, capture_output=True)
    subprocess.run(['python3', 'build_page.py', f'{T}/{name}_segments.json', f'{T}/{name}_tl.json', f'common.js,{E}/geo11.js,{E}/scenes.js,{E}/pov.js,{E}/short_extra.js', f'{T}/{name}_page.html', '1080x1920'], check=True, capture_output=True)
    t0 = json.load(open(f'{T}/{name}_tl.json'))['scenes'][0]['t0']; t = round(t0 + c['at'], 2)
    for f in glob.glob(f'{T}/{name}_bg_*'): os.remove(f)
    subprocess.run(['node', 'stills.js', f'{T}/{name}_page.html', f'{T}/{name}_bg', '1080', '1920', str(t)], check=True, capture_output=True, env=env)
    bg = glob.glob(f'{T}/{name}_bg_*')[0]; lines = c['white'] + [c['yellow']]; y = 150; ttl = ''
    for i, ln in enumerate(lines):
        fs = c['size'][i]; y += fs * 1.06
        ttl += f'<text x="540" y="{y:.0f}" text-anchor="middle" font-size="{fs}" font-weight="700" class="out" stroke-width="{fs * .2:.0f}" fill="{"#ffd60a" if i == len(lines) - 1 else "#fff"}">{ln}</text>'
    bs = c['bs']
    html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Fredoka;font-weight:700;src:url({fonts}/fredoka-latin-700-normal.woff2)}}
html,body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#000}} text{{font-family:Fredoka,sans-serif}} .out{{paint-order:stroke;stroke:#1b1b3a;stroke-linejoin:round}}
</style></head><body><svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".72"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="bot" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
<g transform="translate(540 960) scale({c['zoom']}) translate({-c['cx']} {-c['cy']})"><image href="{os.path.basename(bg)}" x="0" y="0" width="1080" height="1920"/></g>
<rect width="1080" height="{y + 160:.0f}" fill="url(#top)"/><rect y="1500" width="1080" height="420" fill="url(#bot)"/>
<rect x="250" y="60" width="580" height="96" rx="48" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="540" y="125" text-anchor="middle" font-size="54" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>
{ttl}
<text x="540" y="1760" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="4" fill="#1b1b3a" stroke="#1b1b3a" stroke-width="28" stroke-linejoin="round">{c['banner']}</text>
<text x="540" y="1760" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="4" fill="#1b1b3a" stroke="#ffd60a" stroke-width="14" stroke-linejoin="round" style="paint-order:stroke">{c['banner']}</text>
</svg></body></html>'''
    open(f'{T}/{name}_thumb.html', 'w').write(html)
    subprocess.run(['node', 'shot.js', f'{T}/{name}_thumb.html', f'{T}/{name}_thumb.png', '1080', '1920'], check=True, env=env)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{T}/{name}_thumb.png', '-vf', 'scale=720:1280', '-q:v', '3', f'{E}/thumb_{name}.jpg'], check=True)
print('thumbnails: ep11/thumb_ep11.jpg, ep11/thumb_short1.jpg, ep11/thumb_short2.jpg')
