#!/bin/bash
# make_preview.sh: the teacher's review clips (720p, with sound, 60-80 s): qa/preview_p1_clips.mp4, qa/preview_p2_clips.mp4 from the final
# renders; each span: the cast together, a countdown with the worried face, a reveal (right/wrong faces), a look-closer, a fun fact, the ending.
# EP22 (Stage 2): P1 the cold open, the board, Round 1's countdown (Basil worried), the journey, the answer (right/wrong faces), the
# look-closer (pull, Pip's clips), HOLD ON!, what can be magnetised, the fun fact, the cliffhanger, the ending; P2 the maker space, the
# countdown, the journey, the answer, lift up and away, the Showdown and fix, the big fish, the ant's fun fact, the dare, the ending.
cd "$(dirname "$0")"; T=out/prev; rm -rf "$T"; mkdir -p "$T"
P1="0.5:6.0 30.5:36.0 66.0:73.5 101.0:112.5 118.5:131.5 152.0:158.5 163.5:172.0 195.0:204.0 209.0:220.0 247.5:257.0 287.0:296.0 313.5:322.0 327.5:332.0"
P2="9.2:15.0 44.0:51.5 78.0:98.0 99.0:110.0 117.5:133.5 175.0:194.0 202.0:207.5 215.0:234.5 279.0:290.0 291.0:306.0 327.5:332.5"
for P in 1 2; do eval S=\$P$P; i=0; : > $T/l$P.txt
  for sp in $S; do a=${sp%:*}; b=${sp#*:}; d=$(python3 -c "print(round($b-$a,3))"); f=$T/p${P}_$i.mp4
    ffmpeg -y -loglevel error -ss $a -t $d -i ep22_part$P.mp4 -vf "scale=1280:720,fade=t=in:st=0:d=0.12,fade=t=out:st=$(python3 -c "print(round($d-0.12,3))"):d=0.12" -af "afade=t=in:st=0:d=0.1,afade=t=out:st=$(python3 -c "print(round($d-0.15,3))"):d=0.15" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 160k -ar 48000 $f
    echo "file '$(realpath $f)'" >> $T/l$P.txt; i=$((i+1)); done
  ffmpeg -y -loglevel error -f concat -safe 0 -i $T/l$P.txt -c copy -movflags +faststart qa/preview_p${P}_clips.mp4
  echo qa/preview_p${P}_clips.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 qa/preview_p${P}_clips.mp4) s; done
rm -rf "$T"
