#!/bin/bash
# build_clip.sh N: one moment from the current files (timeline, cues, sound, picture, mux) -> clipN_<name>.mp4 (1920x1080, 30 fps, -16 LUFS) + .srt
#   N = 1 (cold open) | 2 (journey) | 3 (ending). The render and the mux wait for the shared render lock. FRESH=1 drops the kept 10 s chunks first.
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g); P=$1; NAME=$(echo "x coldopen journey ending" | cut -d' ' -f$((P + 1)))
python3 build_tl.py $P | tail -1; node dump_cues.js $P; node song.js $P | tail -1
[ -n "$FRESH" ] && rm -rf out/chunks_p$P
flock /tmp/explained_render.lock node render.js $P 3 | tail -1
flock /tmp/explained_render.lock ffmpeg -y -loglevel error -i out/video_p$P.mp4 -i out/mix_p$P.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest out/_c$P.mp4 && mv out/_c$P.mp4 clip${P}_$NAME.mp4
python3 - $P $NAME <<'PY'
import sys, json
P, NAME = sys.argv[1], sys.argv[2]; tl = json.load(open(f'tl_p{P}.json'))
def ft(t): h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60; return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.', ',')
out = []; n = 1
for id in tl['order']:
    if id.startswith('uk_') or id == 'u1305': continue
    ws = tl['lines'][id]['words']; cur = []
    for i, w in enumerate(ws):
        cur.append(w)
        if w['w'][-1] in '.!?' or i == len(ws) - 1 or len(cur) >= 12:
            out.append(f"{n}\n{ft(cur[0]['a'])} --> {ft(cur[-1]['b'] + .25)}\n{' '.join(x['w'] for x in cur)}\n"); n += 1; cur = []
open(f'clip{P}_{NAME}.srt', 'w').write('\n'.join(out))
PY
echo "clip${P}_$NAME.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 clip${P}_$NAME.mp4) s"
ffmpeg -hide_banner -i clip${P}_$NAME.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
