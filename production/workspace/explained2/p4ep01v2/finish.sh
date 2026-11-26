#!/bin/bash
# finish.sh (P4 EP1 v2, one video): out/video_p1.mp4 + out/mix_p1.wav -> p4ep01v2.mp4 (1920x1080, 30 fps, about -16 LUFS), sheet.png (30 stills), p4ep01v2.srt (captions);
# then the checks: a full decode (0 errors), integrated loudness and true peak
cd "$(dirname "$0")"; P=${1:-1}
ffmpeg -y -loglevel error -i out/video_p$P.mp4 -i out/mix_p$P.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest out/_p4ep01v2.mp4 && mv out/_p4ep01v2.mp4 p4ep01v2.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 p4ep01v2.mp4); echo "p4ep01v2.mp4 $D s"
# Kampong Walk, the one background bed of every part (SERIES_FORMAT.md 9, teacher 2026-11-24): rebuilds the soundtrack from song.js with the
# old beds left out, re-muxes the mp4 (video copied), checks -16 LUFS / -1.5 dBTP / decode. build_part.sh already holds the render lock.
# EXPLAINED_LOCK_HELD=1 python3 ../add_lofi.py . $P || exit 1   # teacher 2026-11-25: from EP23 on, the ORIGINAL series music (no Kampong Walk); see SERIES_FORMAT.md
rm -rf out/sheet; mkdir -p out/sheet
python3 - "$D" "$P" <<'P'
import sys, subprocess, json
D = float(sys.argv[1]); PT = sys.argv[2]; tl = json.load(open(f'tl_p{PT}.json'))
# 30 stills: one inside each scene that lasts long enough, the rest spread evenly
ts = sorted(set([round(s['t0'] + (s['t1'] - s['t0']) * .62, 2) for s in tl['scenes'] if s['t1'] - s['t0'] > 4]))
extra = [1.2, 5.5] + [tl['marks'][k] + d for k, d in (('cry1', .3), ('c3', .6), ('ring0_fix', 3), ('miss1', .3), ('flap', .3), ('sproing', .2), ('ovt', .5), ('clang', .2), ('chainrx', .7), ('splash', .3), ('tr1', 1.0), ('racego', 3.0), ('kw_function', .8), ('jgrab', .3), ('kw_interact', .8), ('think0', 1.0), ('side', 1.0), ('kw_system', .8), ('cry4', .4), ('bones', 1.0), ('rts', .6), ('clap', .3), ('coin1', .6), ('take2', -.4)) if k in tl['marks']]
ts = sorted(set(ts + extra))
while len(ts) > 30: ts.pop(len(ts) // 2 * 0 + min(range(1, len(ts)), key=lambda i: ts[i] - ts[i - 1]))
for i, t in enumerate(ts): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t), '-i', 'p4ep01v2.mp4', '-frames:v', '1', '-vf', 'scale=640:-1', f'out/sheet/s_{i:02d}.png'], check=True)
print(len(ts), 'stills')
# captions
def ft(t): h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60; return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.', ',')
out = []; n = 1
for id in tl['order']:
    if id.startswith('uk_') or id == 'u1305' or id.startswith('__'): continue
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
open('p4ep01v2.srt', 'w').write('\n'.join(f"{i + 1}\n{ft(a)} --> {ft(b)}\n{txt}\n" for i, (a, b, txt) in enumerate(out)))
P
ffmpeg -y -loglevel error -pattern_type glob -i 'out/sheet/s_*.png' -vf "tile=6x5:padding=8:color=0x120E2E" -frames:v 1 sheet.png && echo sheet.png
ffmpeg -hide_banner -i p4ep01v2.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
echo "decode check:"; ffmpeg -v error -i p4ep01v2.mp4 -f null - 2>&1 | head -5 | tee out/decode.log; echo "decode errors: $(wc -l < out/decode.log)"
ffmpeg -hide_banner -i p4ep01v2.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A1 -E "True peak:" | tail -1
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames,width,height,r_frame_rate -of csv=p=0 p4ep01v2.mp4
