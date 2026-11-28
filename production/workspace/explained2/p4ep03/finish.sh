#!/bin/bash
# finish.sh (P4 EP3, one video; from P4 EP2's): $RENDER_OUT/video_p1.mp4 + out/mix_p1.wav -> $FINAL/p4ep03.mp4 (RAM: the disk is tight;
# move it next to this file only when there is room above 3 GB) (1920x1080, 30 fps, about -16 LUFS), sheet.png (30 stills), p4ep03.srt (captions);
# then the checks: a full decode (0 errors), integrated loudness and true peak
cd "$(dirname "$0")"; P=${1:-1}; RO=${RENDER_OUT:-out}; F=${FINAL:-/dev/shm/p4ep03}; mkdir -p $F
ffmpeg -y -loglevel error -i $RO/video_p$P.mp4 -i out/mix_p$P.wav -c:v copy -af lowpass=f=15000:p=2 -c:a aac -b:a 192k -movflags +faststart -shortest $F/_p4ep03.mp4 && mv $F/_p4ep03.mp4 $F/p4ep03.mp4 && ln -sf $F/p4ep03.mp4 p4ep03.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $F/p4ep03.mp4); echo "p4ep03.mp4 $D s"
# Kampong Walk, the one background bed of every part (SERIES_FORMAT.md 9, teacher 2026-11-24): rebuilds the soundtrack from song.js with the
# old beds left out, re-muxes the mp4 (video copied), checks -16 LUFS / -1.5 dBTP / decode. build_part.sh already holds the render lock.
# EXPLAINED_LOCK_HELD=1 python3 ../add_lofi.py . $P || exit 1   # teacher 2026-11-25: from EP23 on, the ORIGINAL series music (no Kampong Walk); see SERIES_FORMAT.md
rm -rf out/sheet; mkdir -p out/sheet
python3 - "$D" "$P" "$F" <<'P'
import sys, subprocess, json
D = float(sys.argv[1]); PT = sys.argv[2]; F = sys.argv[3]; tl = json.load(open(f'tl_p{PT}.json'))
# 30 stills: one inside each scene that lasts long enough, the rest spread evenly
ts = sorted(set([round(s['t0'] + (s['t1'] - s['t0']) * .62, 2) for s in tl['scenes'] if s['t1'] - s['t0'] > 4]))
extra = [1.2, 5.5] + [tl['marks'][k] + d for k, d in (('skr', .6), ('koo', .3), ('whip', .5), ('snailin', 1.8), ('flop1', .4), ('ring0_fix', 3), ('miss1', .3), ('swatch', 1.8), ('flop2', .4), ('measure', .6), ('flop3', .6), ('slow0', 1.0), ('kw_leaf_blade', .8), ('mainv', .8), ('jmain', .5), ('jnet', 1.0), ('kw_net_veins', .8), ('kw_parallel_veins', .8), ('freeze', .5), ('think0', 1.5), ('match', 1.0), ('stamp', .3), ('clap', .3), ('scan', 1.5), ('bzzt', .3), ('stored', 1.0), ('peel', 1.2), ('ff_in', 1.0), ('coin1', .8), ('ding', 1.2), ('take2', -.6), ('stutter', .4), ('acq', .2)) if k in tl['marks']]
ts = sorted(set(ts + extra))
while len(ts) > 30: ts.pop(len(ts) // 2 * 0 + min(range(1, len(ts)), key=lambda i: ts[i] - ts[i - 1]))
for i, t in enumerate(ts): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t), '-i', f'{F}/p4ep03.mp4', '-frames:v', '1', '-vf', 'scale=640:-1', f'out/sheet/s_{i:02d}.png'], check=True)
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
open('p4ep03.srt', 'w').write('\n'.join(f"{i + 1}\n{ft(a)} --> {ft(b)}\n{txt}\n" for i, (a, b, txt) in enumerate(out)))
P
ffmpeg -y -loglevel error -pattern_type glob -i 'out/sheet/s_*.png' -vf "tile=6x5:padding=8:color=0x120E2E" -frames:v 1 sheet.png && echo sheet.png
ffmpeg -hide_banner -i $F/p4ep03.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
echo "decode check:"; ffmpeg -v error -i $F/p4ep03.mp4 -f null - 2>&1 | head -5 | tee out/decode.log; echo "decode errors: $(wc -l < out/decode.log)"
ffmpeg -hide_banner -i $F/p4ep03.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A1 -E "True peak:" | tail -1
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames,width,height,r_frame_rate -of csv=p=0 $F/p4ep03.mp4
