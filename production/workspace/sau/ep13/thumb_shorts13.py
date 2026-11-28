"""ep13/thumb_shorts13.py: the two Shorts' thumbnails (1080 x 1920 -> 720 x 1280 JPG), each from a strong frame of that Short's own picture
(SHORTS_BRIEF: not the globe, not the episode's thumbnail): the scene alone (no header or captions), the series pill, a two-tone title,
one hook line with a yellow border. Words stay clear of the buddies' faces.
    python3 ep13/thumb_shorts13.py      (from workspace/sau) -> ep13/thumb_short1.jpg, ep13/thumb_short2.jpg"""
import json, os, subprocess, glob
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); E = 'ep13'; T = '/tmp/ep13_thumbs'; os.makedirs(T, exist_ok=True)
PY = '/home/user/heart-tts/venv/bin/python'; env = dict(os.environ, NODE_PATH=subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip())
LIBS = f'common.js,{E}/geo13.js,{E}/spr13.js,{E}/mouth13.js,{E}/scenes.js'
C = {'short1': dict(scene='povWind', dur=6.0, at=4.2, white=['WHERE DID OUR'], yellow='RAIN GO?!', size=[118, 150], banner='Ride the trade wind! 🌬️', bs=80),
     'short2': dict(scene='thermo', dur=8.0, at=7.5, white=['ONLY'], yellow='2 °C?!', size=[150, 190], banner='Super El Niño 🔥', bs=96)}
fonts = os.path.relpath(f'{H}/fonts/node_modules/@fontsource/fredoka/files', T)
for name, c in C.items():
    seg = {'episode': 'thumb', 'title': ' ', 'tag': ' ', 'outro': 1, 'segments': [{'id': 'x', 'scene': c['scene'], 'silent': c['dur'], 'sfx': []}]}
    json.dump(seg, open(f'{T}/{name}_segments.json', 'w'))
    subprocess.run([PY, f'{E}/build_tl13.py', f'{T}/{name}_segments.json', f'{T}/aud', f'{T}/{name}'], check=True, capture_output=True)
    subprocess.run(['python3', 'build_page.py', f'{T}/{name}_segments.json', f'{T}/{name}_tl.json', LIBS, f'{E}/_thumb_{name}_page.html', '1080x1920'], check=True, capture_output=True)
    t0 = json.load(open(f'{T}/{name}_tl.json'))['scenes'][0]['t0']; t = round(t0 + c['at'], 2)
    for f in glob.glob(f'{T}/{name}_bg_*'): os.remove(f)
    subprocess.run(['node', 'stills.js', f'{E}/_thumb_{name}_page.html', f'{T}/{name}_bg', '1080', '1920', str(t)], check=True, capture_output=True, env=env)
    os.remove(f'{E}/_thumb_{name}_page.html')
    bg = glob.glob(f'{T}/{name}_bg_*')[0]; lines = c['white'] + [c['yellow']]; y = 170; ttl = ''
    for i, ln in enumerate(lines):
        fs = c['size'][i]; y += fs * 1.06
        ttl += f'<text x="540" y="{y:.0f}" text-anchor="middle" font-size="{fs}" font-weight="700" class="out" stroke-width="{fs * .2:.0f}" fill="{"#ffd60a" if i == len(lines) - 1 else "#fff"}">{ln}</text>'
    bs = c['bs']
    html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Fredoka;font-weight:700;src:url({fonts}/fredoka-latin-700-normal.woff2)}}
html,body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#000}} text{{font-family:Fredoka,sans-serif}} .emo{{font-family:"Noto Color Emoji"}} .out{{paint-order:stroke;stroke:#1b1b3a;stroke-linejoin:round}}
</style></head><body><svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".7"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="bot" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
<image href="{os.path.basename(bg)}" x="0" y="0" width="1080" height="1920"/>
<rect width="1080" height="{y + 120:.0f}" fill="url(#top)"/><rect y="1520" width="1080" height="400" fill="url(#bot)"/>
<rect x="250" y="60" width="580" height="96" rx="48" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="540" y="125" text-anchor="middle" font-size="54" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>
{ttl}
<text x="540" y="1780" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="4" fill="#1b1b3a" stroke="#1b1b3a" stroke-width="28" stroke-linejoin="round">{c['banner']}</text>
<text x="540" y="1780" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="4" fill="#1b1b3a" stroke="#ffd60a" stroke-width="14" stroke-linejoin="round" style="paint-order:stroke">{c['banner']}</text>
</svg></body></html>'''
    open(f'{T}/{name}_thumb.html', 'w').write(html)
    subprocess.run(['node', 'shot.js', f'{T}/{name}_thumb.html', f'{T}/{name}_thumb.png', '1080', '1920'], check=True, env=env)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{T}/{name}_thumb.png', '-vf', 'scale=720:1280', '-q:v', '3', f'{E}/thumb_{name}.jpg'], check=True)
    print('wrote', f'{E}/thumb_{name}.jpg', os.path.getsize(f'{E}/thumb_{name}.jpg') // 1024, 'KB')
