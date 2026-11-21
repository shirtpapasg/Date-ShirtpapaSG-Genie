"""ep10/thumb_short.py: the vertical thumbnails of EP10's two Shorts (1080 x 1920), in the look of thumb_frame.py: a strong frame
of the Short's own picture (no header, no caption), the "TheOneApp Explored" pill, a two-tone title and one hook line with a
yellow border.    python3 ep10/thumb_short.py     -> ep10/thumb_short1.jpg, ep10/thumb_short2.jpg"""
import json, os, subprocess, glob
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); E = 'ep10'; T = '/tmp/ep10_thumb'; os.makedirs(T, exist_ok=True)
PY = '/home/user/heart-tts/venv/bin/python'; env = dict(os.environ, NODE_PATH=subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip())
C = {'short1': dict(scene='povGrasshopper', dur=5.0, at=0.42, zoom=1.0, cx=540, cy=960, white=['DEAD', 'GRASSHOPPER'], yellow='= YOUR FOOD?!', size=[150, 132, 132], banner='Follow one tiny nutrient! 🌱', bs=70),
     'short2': dict(scene='helpers', dur=10.0, at=9.75, zoom=1.0, cx=540, cy=960, white=["DON'T KILL"], yellow='THE ANTS!', size=[170, 170], banner="Here's why 🐜", bs=96)}
fonts = os.path.relpath(f'{H}/fonts/node_modules/@fontsource/fredoka/files', T)
for name, c in C.items():
    seg = {'episode': 'thumb', 'title': ' ', 'tag': ' ', 'outro': 1, 'segments': [{'id': 'x', 'scene': c['scene'], 'silent': c['dur'], 'sfx': []}]}
    json.dump(seg, open(f'{T}/{name}_segments.json', 'w'))
    subprocess.run([PY, 'build_tl.py', f'{T}/{name}_segments.json', f'{T}/aud', f'{T}/{name}'], check=True, capture_output=True)
    subprocess.run(['python3', 'build_page.py', f'{T}/{name}_segments.json', f'{T}/{name}_tl.json', f'common.js,geo_map.js,{E}/scenes.js,{E}/pov.js,{E}/short_extra.js', f'{T}/{name}_page.html', '1080x1920'], check=True, capture_output=True)
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
<rect x="260" y="50" width="560" height="90" rx="45" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="540" y="111" text-anchor="middle" font-size="50" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>
{ttl}
<text x="540" y="1790" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="3" fill="#1b1b3a" stroke="#1b1b3a" stroke-width="30" stroke-linejoin="round">{c["banner"]}</text>
<text x="540" y="1790" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="3" fill="#1b1b3a" stroke="#ffd60a" stroke-width="15" stroke-linejoin="round" style="paint-order:stroke">{c["banner"]}</text>
</svg></body></html>'''
    open(f'{T}/{name}.html', 'w').write(html)
    subprocess.run(['node', 'shot.js', f'{T}/{name}.html', f'{T}/{name}.png', '1080', '1920'], check=True, env=env)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{T}/{name}.png', '-q:v', '3', f'{E}/thumb_{name}.jpg'], check=True)
    print(name, 'frame at', t, os.path.getsize(f'{E}/thumb_{name}.jpg'))
