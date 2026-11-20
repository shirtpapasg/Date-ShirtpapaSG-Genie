#!/bin/bash
# build_part.sh <part>: timeline, sound cues, soundtrack, render (finished 10 s chunks are kept), mux, sheet, captions. One render at a time (flock).
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g); P=${1:-1}
python3 build_tl.py $P | tail -1 && node dump_cues.js $P && flock /tmp/explained_render.lock node song.js $P | tail -1 && flock /tmp/explained_render.lock node render.js $P 3 | tail -1 && ./finish.sh $P
