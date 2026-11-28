#!/bin/bash
# finish.sh (EP27, one video): out/video_p1.mp4 + out/mix_p1.wav -> ep27.mp4 (1920x1080, 30 fps, about -16 LUFS), sheet.png (30 stills), ep27.srt (captions)
cd "$(dirname "$0")"; P=${1:-1}
ffmpeg -y -loglevel error -i out/video_p$P.mp4 -i out/mix_p$P.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest out/_ep27.mp4 && mv out/_ep27.mp4 ep27.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ep27.mp4); echo "ep27.mp4 $D s"
# Kampong Walk, the one background bed of every part (SERIES_FORMAT.md 9, teacher 2026-11-24): rebuilds the soundtrack from song.js with the
# old beds left out, re-muxes the mp4 (video copied), checks -16 LUFS / -1.5 dBTP / decode. build_part.sh already holds the render lock.
# EXPLAINED_LOCK_HELD=1 python3 ../add_lofi.py . $P || exit 1   # teacher 2026-11-25: from EP23 on, the ORIGINAL series music (no Kampong Walk); see SERIES_FORMAT.md
rm -rf out/sheet; mkdir -p out/sheet
python3 - "$D" "$P" <<'P'
import sys, subprocess, json
D = float(sys.argv[1]); PT = sys.argv[2]; tl = json.load(open(f'tl_p{PT}.json'))
# 30 stills: one inside each scene that lasts long enough, the rest spread evenly
ts = sorted(set([round(s['t0'] + (s['t1'] - s['t0']) * .62, 2) for s in tl['scenes'] if s['t1'] - s['t0'] > 4]))
extra = [1.2, 5.5] + [tl['marks'][k] + d for k, d in (('therm', .8), ('c3', .6), ('ring0_fix', 3), ('flop', 1.0), ('gains', .6), ('drip', .4), ('slow0', 3), ('arrows', 1.5), ('kw_hotter_to_colder', .8), ('v_fan', .8), ('wrap', 1.2), ('jslow', .6), ('kw_poor_conductor_of_heat', .8), ('v_wool', .8), ('kw_fair_test', .8), ('r3', 1.0), ('v_test', 2.0), ('snap', .5), ('liftup', .8), ('fanclick', 1.0), ('items', 1.0), ('glitch', .07), ('p5', .8)) if k in tl['marks']]
ts = sorted(set(ts + extra))
while len(ts) > 30: ts.pop(len(ts) // 2 * 0 + min(range(1, len(ts)), key=lambda i: ts[i] - ts[i - 1]))
for i, t in enumerate(ts): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t), '-i', 'ep27.mp4', '-frames:v', '1', '-vf', 'scale=640:-1', f'out/sheet/s_{i:02d}.png'], check=True)
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
open('ep27.srt', 'w').write('\n'.join(f"{i + 1}\n{ft(a)} --> {ft(b)}\n{txt}\n" for i, (a, b, txt) in enumerate(out)))
P
ffmpeg -y -loglevel error -pattern_type glob -i 'out/sheet/s_*.png' -vf "tile=6x5:padding=8:color=0x120E2E" -frames:v 1 sheet.png && echo sheet.png
ffmpeg -hide_banner -i ep27.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
