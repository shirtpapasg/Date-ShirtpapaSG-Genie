#!/bin/bash
# make_preview.sh: the teacher's review clips (720p, with sound, 60-80 s): qa/preview_p1_clips.mp4, qa/preview_p2_clips.mp4 from the final
# renders (EP17); each span: the cast together, a countdown with the worried face, a reveal (right/wrong faces), the look-closers, the journeys,
# HOLD ON!, the butterfly coming out, the fun fact, the cliffhanger / the plate tipped out, the dare.
cd "$(dirname "$0")"; T=out/prev; rm -rf "$T"; mkdir -p "$T"
P1="3.5:6.0 53.5:59.0 79.0:84.0 108.0:118.5 139.0:147.0 189.5:198.5 231.0:242.5 276.0:284.0 300.0:307.8"
P2="12.2:19.0 44.5:56.0 74.0:84.0 104.0:112.0 129.0:133.9 160.5:170.0 219.0:227.0 293.0:299.0"
for P in 1 2; do eval S=\$P$P; i=0; : > $T/l$P.txt
  for sp in $S; do a=${sp%:*}; b=${sp#*:}; d=$(python3 -c "print(round($b-$a,3))"); f=$T/p${P}_$i.mp4
    ffmpeg -y -loglevel error -ss $a -t $d -i ep17_part$P.mp4 -vf "scale=1280:720,fade=t=in:st=0:d=0.12,fade=t=out:st=$(python3 -c "print(round($d-0.12,3))"):d=0.12" -af "afade=t=in:st=0:d=0.1,afade=t=out:st=$(python3 -c "print(round($d-0.15,3))"):d=0.15" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 160k -ar 48000 $f
    echo "file '$(realpath $f)'" >> $T/l$P.txt; i=$((i+1)); done
  ffmpeg -y -loglevel error -f concat -safe 0 -i $T/l$P.txt -c copy -movflags +faststart qa/preview_p${P}_clips.mp4
  echo qa/preview_p${P}_clips.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 qa/preview_p${P}_clips.mp4) s; done
rm -rf "$T"
