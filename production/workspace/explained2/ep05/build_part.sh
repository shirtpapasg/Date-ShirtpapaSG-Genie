#!/bin/bash
# VERSION 2: run as  EP_OUT=v2 ./build_part.sh P  so the picture goes to v2/out and the film to v2/ep05_partP.mp4 (never overwrite the live ep05_partP.mp4).
# build_part.sh P: one part from the current files (timeline, sound, picture, mux). Heavy steps wait for the shared render lock.
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g); P=$1
python3 build_tl.py $P | tail -1; node dump_cues.js $P; node song.js $P | tail -1
flock /tmp/explained_render.lock node render.js $P 3 | tail -1; flock /tmp/explained_render.lock ./finish.sh $P
