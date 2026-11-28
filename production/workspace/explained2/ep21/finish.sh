#!/bin/bash
# finish.sh: out/video_p$P.mp4 + out/mix_p$P.wav -> ep21_part$P.mp4 (1920x1080, 30 fps, about -16 LUFS), sheet.png (30 stills), ep21.srt (captions)
cd "$(dirname "$0")"; P=${1:-1}
ffmpeg -y -loglevel error -i out/video_p$P.mp4 -i out/mix_p$P.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest out/_ep21_p$P.mp4 && mv out/_ep21_p$P.mp4 ep21_part$P.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ep21_part$P.mp4); echo "ep21_part$P.mp4 $D s"
rm -rf out/sheet; mkdir -p out/sheet
python3 - "$D" "$P" <<'P'
import sys, subprocess, json
D = float(sys.argv[1]); PT = sys.argv[2]; tl = json.load(open(f'tl_p{PT}.json'))
# 30 stills: one inside each scene that lasts long enough, the rest spread evenly
ts = sorted(set([round(s['t0'] + (s['t1'] - s['t0']) * .62, 2) for s in tl['scenes'] if s['t1'] - s['t0'] > 4]))
extra = [1.2, 5.5] + [tl['marks'][k] + d for k, d in (('kw_freely_suspended', .8), ('kw_north_south_direction', .8), ('kw_earth_behaves_like_a_magnet', .8), ('kw_needle', .8), ('kw_compass', .8), ('kw_tell_the_direction', .8), ('v_places', .6), ('v_earth', .6), ('v_use', .6), ('v_night', .6), ('ring0_hold', 2), ('ring0_r1', 1.5), ('ring0_show', 3), ('budsIn', .8), ('chart', 1.0), ('jstop', .8), ('jstop2', .8), ('chart1', .8), ('cones', .8), ('field', .8), ('basin', .8), ('nsline', .8), ('try', .8), ('hangup', .8), ('everywhere', 1.0), ('compass', .8), ('boat', .8), ('jpush', .8), ('jpull', .8), ('jback', .8), ('still', .8), ('rose', 1.0), ('route', 1.0), ('rewrite', .6), ('ship', 1.0), ('fog', 1.0), ('stroke', .6), ('dareIn', 1.5)) if k in tl['marks']]
ts = sorted(set(ts + extra))
while len(ts) > 30: ts.pop(len(ts) // 2 * 0 + min(range(1, len(ts)), key=lambda i: ts[i] - ts[i - 1]))
for i, t in enumerate(ts): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t), '-i', f'ep21_part{PT}.mp4', '-frames:v', '1', '-vf', 'scale=640:-1', f'out/sheet/s_{i:02d}.png'], check=True)
print(len(ts), 'stills')
# captions
def ft(t): h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60; return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.', ',')
out = []; n = 1
for id in tl['order']:
    if id.startswith('uk_') or id == 'u1305': continue
    L = tl['lines'][id]; ws = L['words']; cur = []
    for i, w in enumerate(ws):
        cur.append(w)
        if w['w'][-1] in '.!?' or i == len(ws) - 1 or len(cur) >= 12:
            out.append([cur[0]['a'], cur[-1]['b'] + .25, ' '.join(x['w'] for x in cur)]); cur = []
out.sort(key=lambda c: c[0])
i = 0
while i < len(out) - 1:   # a cue that would show under .6 s before the next one starts joins it (no overlap, nothing too short to read)
    if out[i + 1][0] - out[i][0] < .6: out[i + 1] = [out[i][0], max(out[i][1], out[i + 1][1]), out[i][2] + ' ' + out[i + 1][2]]; del out[i]
    else: i += 1
for i in range(len(out) - 1): out[i][1] = max(out[i][0] + .3, min(out[i][1], out[i + 1][0] - .02))   # no two cues on screen at once
open(f'ep21_part{PT}.srt', 'w').write('\n'.join(f"{i + 1}\n{ft(a)} --> {ft(b)}\n{txt}\n" for i, (a, b, txt) in enumerate(out)))
P
ffmpeg -y -loglevel error -pattern_type glob -i 'out/sheet/s_*.png' -vf "tile=6x5:padding=8:color=0x120E2E" -frames:v 1 sheet_part$P.png && echo sheet_part$P.png
ffmpeg -hide_banner -i ep21_part$P.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
