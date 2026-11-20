#!/bin/bash
# finish.sh: out/video.mp4 + out/mix.wav -> ep01.mp4 (1920x1080, 30 fps, about -16 LUFS), sheet.png (30 stills), ep01.srt (captions)
cd "$(dirname "$0")"
ffmpeg -y -loglevel error -i out/video.mp4 -i out/mix.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest out/_ep01.mp4 && mv out/_ep01.mp4 ep01.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ep01.mp4); echo "ep01.mp4 $D s"
rm -rf out/sheet; mkdir -p out/sheet
python3 - "$D" <<'P'
import sys, subprocess, json
D = float(sys.argv[1]); tl = json.load(open('tl.json'))
# 30 stills: one inside each scene that lasts long enough, the rest spread evenly
ts = sorted(set([round(s['t0'] + (s['t1'] - s['t0']) * .62, 2) for s in tl['scenes'] if s['t1'] - s['t0'] > 4]))
extra = [1.2, 5.5, 31.0, 122.0, 190.0, 200.5, 207.0, 272.0, 326.0, 371.5, 377.0]
ts = sorted(set(ts + extra))
while len(ts) > 30: ts.pop(len(ts) // 2 * 0 + min(range(1, len(ts)), key=lambda i: ts[i] - ts[i - 1]))
for i, t in enumerate(ts): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t), '-i', 'ep01.mp4', '-frames:v', '1', '-vf', 'scale=640:-1', f'out/sheet/s_{i:02d}.png'], check=True)
print(len(ts), 'stills')
# captions
def ft(t): h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60; return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.', ',')
out = []; n = 1
for id in tl['order']:
    L = tl['lines'][id]; ws = L['words']; cur = []
    for i, w in enumerate(ws):
        cur.append(w)
        if w['w'][-1] in '.!?' or i == len(ws) - 1 or len(cur) >= 12:
            out.append(f"{n}\n{ft(cur[0]['a'])} --> {ft(cur[-1]['b'] + .25)}\n{' '.join(x['w'] for x in cur)}\n"); n += 1; cur = []
open('ep01.srt', 'w').write('\n'.join(out))
P
ffmpeg -y -loglevel error -pattern_type glob -i 'out/sheet/s_*.png' -vf "tile=6x5:padding=8:color=0x120E2E" -frames:v 1 sheet.png && echo sheet.png
ffmpeg -hide_banner -i ep01.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
