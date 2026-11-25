#!/bin/bash
# make_preview.sh: the teacher's review clips (720p, with sound, 60-80 s): qa/preview_p1_clips.mp4, qa/preview_p2_clips.mp4 from the final
# renders; each span: the cast together, a countdown with the worried face, a reveal (right/wrong faces), a look-closer, a fun fact, the ending.
# EP22 (Stage 2; P1 spans moved 5.5 s earlier on 24 Nov 2026: the cold open now speaks from 0.825 s): P1 the cold open, the board, Round 1's countdown (Basil worried), the journey, the answer (right/wrong faces), the
# look-closer (pull, Pip's clips), HOLD ON!, what can be magnetised, the fun fact, the cliffhanger, the ending; P2 the maker space, the
# countdown, the journey, the answer, lift up and away, the Showdown and fix, the big fish, the ant's fun fact, the dare, the ending.
cd "$(dirname "$0")"; T=out/prev; rm -rf "$T"; mkdir -p "$T"
P1="0.5:7.6 25:30.5 60.5:68 95.5:107 114:126 146.5:153 159:166.5 189.5:198.5 205.5:214.5 242.5:250.5 281.5:290.5 308:315.5 322:326.5"
P2="9.2:15.0 44.0:51.5 86.0:96.5 99.0:109.0 119.0:133.5 178.0:193.0 202.0:207.5 220.0:234.5 280.0:290.0 294.0:305.0 327.5:332.5"
for P in 1 2; do eval S=\$P$P; i=0; : > $T/l$P.txt
  for sp in $S; do a=${sp%:*}; b=${sp#*:}; d=$(python3 -c "print(round($b-$a,3))"); f=$T/p${P}_$i.mp4
    ffmpeg -y -loglevel error -ss $a -t $d -i ep22_part$P.mp4 -vf "scale=1280:720,fade=t=in:st=0:d=0.12,fade=t=out:st=$(python3 -c "print(round($d-0.12,3))"):d=0.12" -af "afade=t=in:st=0:d=0.1,afade=t=out:st=$(python3 -c "print(round($d-0.15,3))"):d=0.15" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 160k -ar 48000 $f
    echo "file '$(realpath $f)'" >> $T/l$P.txt; i=$((i+1)); done
  ffmpeg -y -loglevel error -f concat -safe 0 -i $T/l$P.txt -c copy -movflags +faststart qa/preview_p${P}_clips.mp4
  echo qa/preview_p${P}_clips.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 qa/preview_p${P}_clips.mp4) s; done
rm -rf "$T"
