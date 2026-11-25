#!/bin/bash
# resheet.sh P: the contact sheet (and captions) again from the finished epNN_partP.mp4, as finish.sh makes them (after a spliced fix)
cd "$(dirname "$0")"; P=${1:-1}; EP=$(basename "$PWD"); D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ${EP}_part$P.mp4)
rm -rf out/sheet; mkdir -p out/sheet
sed -n "/^python3 - \"\$D\" \"\$P\" <<'P'/,/^P$/p" finish.sh | sed '1d;$d' > out/_sheet.py
python3 out/_sheet.py "$D" "$P" && rm out/_sheet.py
ffmpeg -y -loglevel error -pattern_type glob -i 'out/sheet/s_*.png' -vf "tile=6x5:padding=8:color=0x120E2E" -frames:v 1 sheet_part$P.png && echo sheet_part$P.png && rm -rf out/sheet
