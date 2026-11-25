#!/bin/bash
# run_both.sh: renders the parts given (default 1 2) one after the other, each under the shared render lock, retrying a crashed Chromium
# (finished 10 s chunks are kept, so a retry only redoes the chunk that crashed), then finish.sh. Sound and timeline first.
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g)
for P in ${@:-1 2}; do
  python3 build_tl.py $P | tail -1; node dump_cues.js $P; node song.js $P | tail -1
  for i in 1 2 3 4 5; do rm -f out/chunks_p$P/*.part.mp4; flock /tmp/explained_render.lock node render.js $P 2 2>&1 | tail -2 && [ -f out/video_p$P.mp4 ] && [ $(ls out/chunks_p$P/c_*.mp4 | wc -l) -ge $(python3 -c "import json,math;print(math.ceil(json.load(open('tl_p$P.json'))['END']*30/300))") ] && break; echo "retry $i"; done
  flock /tmp/explained_render.lock ./finish.sh $P
done
