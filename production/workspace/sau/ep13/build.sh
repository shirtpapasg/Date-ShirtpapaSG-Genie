#!/bin/bash
# ep13/build.sh: EP13 and its Shorts: segments, voices (cached by words), timelines, buddy pictures, maps, pages (run from anywhere).
# Then: flock /tmp/explained_render.lock ./render_all.sh ep13 ; python3 ep13/make_upload.py ; ep13/check.sh
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
python3 ep13/make_segments.py; python3 ep13/spr13.py > /dev/null; [ -f ep13/geo13.js ] || python3 ep13/geo13.py
for V in ep13 short1 short2; do A=$([ $V = ep13 ] && echo aud || echo aud_s${V#short}); $PY ep13/voice13.py ep13/${V}_segments.json ep13/$A > /dev/null 2>&1
  $PY ep13/build_tl13.py ep13/${V}_segments.json ep13/$A ep13/$V | grep -E "PROPORTIONAL|WARN|END"; done
LIBS=common.js,ep13/geo13.js,ep13/spr13.js,ep13/mouth13.js,ep13/scenes.js,ep13/habitat.js
python3 build_page.py ep13/ep13_segments.json ep13/ep13_tl.json $LIBS ep13/ep13_page.html 1920x1080
for V in short1 short2; do python3 build_page.py ep13/${V}_segments.json ep13/${V}_tl.json $LIBS ep13/${V}_page.html 1080x1920; done
