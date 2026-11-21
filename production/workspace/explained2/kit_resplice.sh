#!/bin/bash
# kit_resplice.sh <live_video> <out_video> <cut frames, comma list> <new span files...>
# Cuts the live render at the given keyframe frame numbers (segment muxer: exact frame counts, unlike concat inpoint/outpoint, which lets
# B-frame neighbours through) and puts the new spans in place of every odd segment: s0, new1, s2, new2, s4, [new3]. Prints the frame count.
LIVE=$1; OUT=$2; CUTS=$3; shift 3; T=$(dirname "$OUT")/resplice_tmp; rm -rf $T; mkdir -p $T
ffmpeg -y -loglevel error -i "$LIVE" -c copy -map 0 -f segment -segment_frames $CUTS -reset_timestamps 1 $T/s%d.mp4 || exit 1
i=0; : > $T/list.txt; NEW=("$@")
for s in $(ls $T/s*.mp4 | sort -V); do if (( i % 2 == 0 )); then echo "file '$(realpath $s)'" >> $T/list.txt; else echo "file '$(realpath ${NEW[$((i/2))]})'" >> $T/list.txt; fi; i=$((i+1)); done
ffmpeg -y -loglevel error -f concat -safe 0 -i $T/list.txt -c copy "$OUT" || exit 1
cat $T/list.txt | sed 's|.*/||'; ffprobe -v error -count_packets -select_streams v -show_entries stream=nb_read_packets -of csv=p=0 "$OUT"; rm -rf $T
