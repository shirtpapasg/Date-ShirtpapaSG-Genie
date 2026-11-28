#!/bin/bash
# ep06/build.sh: sounds + timeline + page for EP06 (run from anywhere). Then ./render_all.sh ep06 ep06
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
ls sfx/ep06_plop.wav >/dev/null 2>&1 || $PY ep06/sfx_ep06.py
[ "$1" = "page" ] || $PY build_tl.py ep06/ep06_segments.json ep06/aud ep06/ep06 | grep -v aligned
python3 build_page.py ep06/ep06_segments.json ep06/ep06_tl.json common.js,geo_map.js,ep06/scenes.js,ep06/pov.js ep06/ep06_page.html 1920x1080
