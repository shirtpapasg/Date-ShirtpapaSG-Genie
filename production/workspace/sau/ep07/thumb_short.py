"""ep07/thumb_short.py: the vertical thumbnails (1080 x 1920) of EP07's two Shorts, in the look of thumb_frame.py:
a strong frame of the Short itself (its question and series label hidden), the "TheOneApp Explored" pill, a two-tone title
(white + yellow) and one hook line with a yellow border.     python3 ep07/thumb_short.py   (run from sau/, after the pages are built)"""
import os, subprocess, json
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H); E = 'ep07'
NP = subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip(); env = dict(os.environ, NODE_PATH=NP)
C = {'short1': dict(t=7.75, zoom=2.3, cx=540, cy=880, white=['FOLLOW THE'], yellow=['OXYGEN!'], size=160, banner=['Ride the blood', 'to a leg muscle! 💪']),
     'short2': dict(t=7.6, zoom=1.12, cx=560, cy=860, white=['WHY DOES YOUR'], yellow=['HEART POUND?'], size=132, banner=['About 100 000', 'beats a day! ❤️'])}
JS = '''const { chromium } = require('playwright'); (async () => { const [f, o, t] = process.argv.slice(1); const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); await p.goto('file://' + require('path').resolve(f)); await p.waitForFunction(() => window.READY === true);
await p.evaluate(x => { window.render(x); ['head', 'tag'].forEach(i => { const e = document.getElementById(i); if (e) e.style.display = 'none'; }); }, +t); await p.screenshot({ path: o }); await b.close(); })();'''
fonts = os.path.relpath(f'{H}/fonts/node_modules/@fontsource/fredoka/files', f'{H}/{E}')
for v, c in C.items():
    bg = f'/tmp/{E}_{v}_thumb_bg.png'; subprocess.run(['node', '-e', JS, f'{E}/{v}_page.html', bg, str(c['t'])], check=True, env=env)
    TS, z = c['size'], c['zoom']; lines = [(w, '#fff') for w in c['white']] + [(y, '#ffd60a') for y in c['yellow']]
    title = ''.join(f'<text x="540" y="{250 + TS + i * TS * 1.08}" text-anchor="middle" font-size="{TS}" font-weight="700" class="out" stroke-width="30" fill="{col}">{w}</text>' for i, (w, col) in enumerate(lines))
    ban = ''.join(f'<text x="540" y="{1650 + i * 130}" text-anchor="middle" font-size="104" font-weight="700" letter-spacing="3" fill="#1b1b3a" stroke="{sc}" stroke-width="{sw}" stroke-linejoin="round" style="paint-order:stroke">{b}</text>'
                  for sc, sw in (('#1b1b3a', 30), ('#ffd60a', 15)) for i, b in enumerate(c['banner']))
    html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Fredoka;font-weight:700;src:url({fonts}/fredoka-latin-700-normal.woff2)}}
html,body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#000}} text{{font-family:Fredoka,sans-serif}} .out{{paint-order:stroke;stroke:#1b1b3a;stroke-linejoin:round}}
</style></head><body><svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".7"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="bot" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
<g transform="translate(540 960) scale({z}) translate({-c['cx']} {-c['cy']})"><image href="{bg}" x="0" y="0" width="1080" height="1920"/></g>
<rect width="1080" height="760" fill="url(#top)"/><rect y="1380" width="1080" height="540" fill="url(#bot)"/>
<rect x="260" y="110" width="560" height="90" rx="45" fill="#1b1b3a" stroke="#fff" stroke-width="5"/><text x="540" y="171" text-anchor="middle" font-size="50" font-weight="700" fill="#fff">TheOneApp <tspan fill="#ffd60a">Explored</tspan></text>
{title}{ban}</svg></body></html>'''
    open(f'{E}/thumb_{v}.html', 'w').write(html)
    subprocess.run(['node', 'shot.js', f'{E}/thumb_{v}.html', f'{E}/thumb_{v}.png', '1080', '1920'], check=True, env=env)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{E}/thumb_{v}.png', '-q:v', '3', f'{E}/thumb_{v}.jpg'], check=True)
    os.remove(bg); print(v, 'frame at', c['t'], os.path.getsize(f'{E}/thumb_{v}.jpg') // 1024, 'KB')
