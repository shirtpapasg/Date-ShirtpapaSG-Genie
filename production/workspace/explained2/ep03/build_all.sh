#!/bin/bash
# build_all.sh: both parts from the current files. Finished 10 s chunks are kept (delete out/chunks_p<N>/c_*.mp4 to redo a span).
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g)
for P in 1 2; do python3 build_tl.py $P | tail -1; node dump_cues.js $P; node song.js $P | tail -1; node render.js $P 3 | tail -1; ./finish.sh $P; done
