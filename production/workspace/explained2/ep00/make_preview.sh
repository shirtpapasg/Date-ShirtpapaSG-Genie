#!/bin/bash
# make_preview.sh: the teacher's review clips (720p, with sound, 60-80 s): qa/preview_p1_clips.mp4, qa/preview_p2_clips.mp4 from the final
# renders; each span: the cast together, a countdown with the worried face, a reveal (right/wrong faces), a look-closer, a fun fact, the ending.
# EP0 (the mind map special): P1 the cold open (Heart from 0.3 s) and the title, the crow's push-in, the word puzzle, Round 1's countdown
# (Basil worried), the read-it-or-make-it look-closer, the memory test (needle fades, the answer, Pip's face), HOLD ON! and the fix, the
# crow's fun fact, the lock-in for Part 2, the ending; P2 the recap, the cat's push-in, the 3 s countdown, TheOneApp's real screens (home,
# Mind Maps, the sheet, the editor, Basil typing), the check (ticks, missing, the poster, the new branch, Mark it again), the Showdown and
# the fix, the journey (grass grows, Tuesday's light), SPACE IT OUT, the two pages, the chant, the dare, the ending.
cd "$(dirname "$0")"; T=out/prev$1; rm -rf "$T"; mkdir -p "$T"
P1="0.2:8.6 22.5:28 52:63.5 76.5:83 107:121 152:172 196.5:212 215:222.5 246:256 283:291.5 296:302.5"
P2="0.2:8.5 11:16.5 37:42.5 62:72 73:87 90:100 103.5:117 147.5:164 179:192.5 210:219 236.5:251 258:270 300:309 328:334.5"
for P in ${1:-1 2}; do eval S=\$P$P; i=0; : > $T/l$P.txt
  for sp in $S; do a=${sp%:*}; b=${sp#*:}; d=$(python3 -c "print(round($b-$a,3))"); f=$T/p${P}_$i.mp4
    ffmpeg -y -loglevel error -ss $a -t $d -i ep00_part$P.mp4 -vf "scale=1280:720,fade=t=in:st=0:d=0.12,fade=t=out:st=$(python3 -c "print(round($d-0.12,3))"):d=0.12" -af "afade=t=in:st=0:d=0.1,afade=t=out:st=$(python3 -c "print(round($d-0.15,3))"):d=0.15" -c:v libx264 -crf 25 -preset fast -c:a aac -b:a 160k -ar 48000 $f
    echo "file '$(realpath $f)'" >> $T/l$P.txt; i=$((i+1)); done
  ffmpeg -y -loglevel error -f concat -safe 0 -i $T/l$P.txt -c copy -movflags +faststart qa/preview_p${P}_clips.mp4
  echo qa/preview_p${P}_clips.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 qa/preview_p${P}_clips.mp4) s; done
rm -rf "$T"
