#!/bin/bash
# PART=1|2 sheet.sh name cols t1 t2 ...  -> qa/<name>.jpg: a contact sheet of stills at those times
cd "$(dirname "$0")"; name=$1; cols=$2; shift 2; rm -rf qa/_st; mkdir -p qa/_st
NODE_PATH=$(npm root -g) node stills.js qa/_st/f "$@" || exit 1
n=$#; rows=$(( (n + cols - 1) / cols ))
ffmpeg -y -loglevel error -pattern_type glob -i 'qa/_st/f_*.jpg' -vf "scale=640:-1,tile=${cols}x${rows}:padding=6:color=0x120E2E" -frames:v 1 -q:v 3 qa/$name.jpg && echo qa/$name.jpg
