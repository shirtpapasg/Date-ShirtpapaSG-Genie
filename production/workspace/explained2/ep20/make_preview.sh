#!/bin/bash
# make_preview.sh: the teacher's review clips (720p, with sound, 60-80 s): qa/preview_p1_clips.mp4, qa/preview_p2_clips.mp4 from the final
# renders; each span: the cast together, a countdown with the worried face, a reveal (right/wrong faces), a look-closer, a fun fact, the ending.
# EP20 (Stage 2): the cast together, Round 1's countdown (Basil worried), the journey, the answer (right/wrong faces), the poles look-closer,
# HOLD ON! (the click), push or pull, the fun fact, the cliffhanger / the dare, the ending.
cd "$(dirname "$0")"; T=out/prev; rm -rf "$T"; mkdir -p "$T"
P1="2.5:6.0 28.3:36.0 58.5:66.0 99.5:112.0 123.0:131.0 146.5:158.0 213.5:231.0 250.5:259.0 291.5:300.5 313.6:322.0 327.0:331.5"
P2="9.6:18.5 42.5:50.0 72.5:84.0 98.0:104.0 115.5:125.0 146.0:158.5 188.0:194.0 200.5:205.0 229.0:239.0 293.0:301.5 305.0:312.0 337.0:342.0"
for P in 1 2; do eval S=\$P$P; i=0; : > $T/l$P.txt
  for sp in $S; do a=${sp%:*}; b=${sp#*:}; d=$(python3 -c "print(round($b-$a,3))"); f=$T/p${P}_$i.mp4
    ffmpeg -y -loglevel error -ss $a -t $d -i ep20_part$P.mp4 -vf "scale=1280:720,fade=t=in:st=0:d=0.12,fade=t=out:st=$(python3 -c "print(round($d-0.12,3))"):d=0.12" -af "afade=t=in:st=0:d=0.1,afade=t=out:st=$(python3 -c "print(round($d-0.15,3))"):d=0.15" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 160k -ar 48000 $f
    echo "file '$(realpath $f)'" >> $T/l$P.txt; i=$((i+1)); done
  ffmpeg -y -loglevel error -f concat -safe 0 -i $T/l$P.txt -c copy -movflags +faststart qa/preview_p${P}_clips.mp4
  echo qa/preview_p${P}_clips.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 qa/preview_p${P}_clips.mp4) s; done
rm -rf "$T"
