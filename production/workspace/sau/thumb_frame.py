"""thumb_frame.py: a unique thumbnail per episode (the teacher, 19 Nov 2026: "don't reuse the globe again and again").
The background is the episode's own most striking frame (a still of its page at a scene and fraction), with the series title style
on top: the "TheOneApp Explored" pill, a giant two-tone title, the hook words with a yellow border, and an optional PART badge.
    python3 thumb_frame.py epNN        (reads epNN/thumb_frame.json: scene, frac, zoom, cx, cy, white, yellow, banner, badge)"""
import json, sys, os, subprocess
e = sys.argv[1]; H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
c = json.load(open(f'{e}/thumb_frame.json')); tl = json.load(open(f'{e}/{e}_tl.json'))
sc = next(s for s in tl['scenes'] if s['scene'] == c['scene']); t = round(sc['t0'] + c.get('frac', .5) * (sc['t1'] - sc['t0']), 2)
subprocess.run(['node', 'stills.js', f'{e}/{e}_page.html', f'/tmp/tf_{e}', '1920', '1080', str(t)], check=True, capture_output=True)
bg = [f for f in os.listdir('/tmp') if f.startswith(f'tf_{e}_')][0]
fonts = os.path.relpath(f'{H}/fonts/node_modules/@fontsource/fredoka/files', f'{H}/{e}')
z, cx, cy = c.get('zoom', 1.15), c.get('cx', 960), c.get('cy', 600)
TS = c.get('titleSize', 150); badge = (f'<g transform="translate(1710 120) rotate(8)"><rect x="-170" y="-62" width="340" height="124" rx="26" fill="#e63946" stroke="#fff" stroke-width="8"/>'
        f'<text x="0" y="28" text-anchor="middle" font-size="84" font-weight="700" fill="#fff" class="out" stroke-width="10">{c["badge"]}</text></g>') if c.get('badge') else ''
bs = c.get('bannerSize', 104)
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Fredoka;font-weight:700;src:url({fonts}/fredoka-latin-700-normal.woff2)}}
html,body{{margin:0;width:1920px;height:1080px;overflow:hidden;background:#000}} text{{font-family:Fredoka,sans-serif}} .out{{paint-order:stroke;stroke:#1b1b3a;stroke-linejoin:round}}
</style></head><body><svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".7"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="bot" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
<g transform="translate(960 540) scale({z}) translate({-cx} {-cy})"><image href="/tmp/{bg}" x="0" y="0" width="1920" height="1080"/></g>
<rect width="1920" height="420" fill="url(#top)"/><rect y="760" width="1920" height="320" fill="url(#bot)"/>
<rect x="50" y="40" width="560" height="90" rx="45" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="330" y="101" text-anchor="middle" font-size="50" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>
<text x="60" y="{150 + TS}" font-size="{TS}" font-weight="700" class="out" stroke-width="30"><tspan fill="#fff">{c["white"]}</tspan> <tspan fill="#ffd60a">{c["yellow"]}</tspan></text>
<text x="960" y="1010" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="5" fill="#1b1b3a" stroke="#1b1b3a" stroke-width="30" stroke-linejoin="round">{c["banner"]}</text>
<text x="960" y="1010" text-anchor="middle" font-size="{bs}" font-weight="700" letter-spacing="5" fill="#1b1b3a" stroke="#ffd60a" stroke-width="15" stroke-linejoin="round" style="paint-order:stroke">{c["banner"]}</text>
{badge}</svg></body></html>'''
open(f'{e}/thumb_frame.html', 'w').write(html)
subprocess.run(['node', 'shot.js', f'{e}/thumb_frame.html', f'{e}/thumb_{e}.png', '1920', '1080'], check=True)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{e}/thumb_{e}.png', '-q:v', '3', f'{e}/thumb_{e}.jpg'], check=True)
os.remove(f'/tmp/{bg}'); print(e, 'frame at', t)
