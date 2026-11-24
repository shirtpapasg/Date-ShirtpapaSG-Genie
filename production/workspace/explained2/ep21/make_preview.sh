#!/bin/bash
# make_preview.sh: the teacher's review clips (720p, with sound, 60-80 s): qa/preview_p1_clips.mp4, qa/preview_p2_clips.mp4 from the final
# renders; each span: the cast together, a countdown with the worried face, a reveal (right/wrong faces), a look-closer, a fun fact, the ending.
# EP21 (Stage 2): the field, the game, Round 1's countdown (Basil worried), the journey, the answer (right/wrong faces), the three places,
# HOLD ON! (the bench and the fix), the whole Earth, the fun fact, the cliffhanger, the ending; Part 2 the same kinds of moments at Pulau Ubin.
cd "$(dirname "$0")"; T=out/prev; rm -rf "$T"; mkdir -p "$T"
P1="2.0:6.0 28.5:36.0 62.0:69.0 104.0:116.0 120.5:129.0 152.0:165.0 198.0:216.0 238.0:252.0 282.5:291.5 308.5:316.0 320.0:326.0"
P2="10.3:18.5 44.0:52.0 89.0:100.0 108.0:118.5 130.0:146.0 180.0:192.0 193.5:201.0 214.0:233.0 245.0:254.0 278.0:287.5 290.0:300.0 322.0:328.0"
for P in 1 2; do eval S=\$P$P; i=0; : > $T/l$P.txt
  for sp in $S; do a=${sp%:*}; b=${sp#*:}; d=$(python3 -c "print(round($b-$a,3))"); f=$T/p${P}_$i.mp4
    ffmpeg -y -loglevel error -ss $a -t $d -i ep21_part$P.mp4 -vf "scale=1280:720,fade=t=in:st=0:d=0.12,fade=t=out:st=$(python3 -c "print(round($d-0.12,3))"):d=0.12" -af "afade=t=in:st=0:d=0.1,afade=t=out:st=$(python3 -c "print(round($d-0.15,3))"):d=0.15" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 160k -ar 48000 $f
    echo "file '$(realpath $f)'" >> $T/l$P.txt; i=$((i+1)); done
  ffmpeg -y -loglevel error -f concat -safe 0 -i $T/l$P.txt -c copy -movflags +faststart qa/preview_p${P}_clips.mp4
  echo qa/preview_p${P}_clips.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 qa/preview_p${P}_clips.mp4) s; done
rm -rf "$T"
