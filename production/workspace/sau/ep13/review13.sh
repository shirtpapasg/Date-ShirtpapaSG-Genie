#!/bin/bash
# ep13/review13.sh: for the teacher: the BE THE THING section as a short clip (<= 40 s, 960 px wide, with sound) and 10 key frames
# from the rendered episode -> ep13/review/ (not in git).       ep13/review13.sh   (after render_all.sh)
cd "$(dirname "$0")"; mkdir -p review
read A B <<< $(python3 -c "
import json; tl = json.load(open('ep13_tl.json')); sc = {s['scene']: s for s in tl['scenes']}
a = sc['povShrink']['t0'] - .3; b = min(a + 40, sc['povDry']['t1'] + .5); print(round(a, 2), round(b, 2))")
ffmpeg -v error -y -ss $A -to $B -i ep13.mp4 -vf scale=960:-2 -c:v libx264 -crf 23 -preset veryfast -c:a aac -b:a 128k -movflags +faststart review/ep13_be_the_thing_review.mp4
echo "clip: $A to $B s"
i=0; for T in $(python3 -c "
import json; tl = json.load(open('ep13_tl.json')); c = tl['cues']; S = {s['scene']: s for s in tl['scenes']}
mid = lambda n, f=.5: S[n]['t0'] + (S[n]['t1'] - S[n]['t0']) * f
print(' '.join(str(round(x, 2)) for x in [c['basil1']['_t0'] + .8, mid('povWind', .4), mid('povCloud', .8), c['pip2']['_t0'] + .5, mid('povDry', .9),
      mid('thermo', .8), c['wcycle']['condensation'] + 1.5, c['basil2']['_t0'] + .3, c['india']['northeast'] + .6, c['usa']['north'] + 1.0]))"); do
  i=$((i + 1)); ffmpeg -v error -y -ss $T -i ep13.mp4 -frames:v 1 -q:v 3 review/key$(printf %02d $i)_$(printf %06.1f $T).jpg; done; ls review
