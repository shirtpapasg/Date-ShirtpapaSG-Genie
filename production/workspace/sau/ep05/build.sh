#!/bin/bash
# ep05/build.sh: timeline + page for EP05 (run from production/workspace/sau). Then ./render_all.sh ep05 ep05
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
ls sfx/ep05_bell.wav >/dev/null 2>&1 || $PY ep05/sfx_ep05.py
grep -q '"land"' ep05/scenes.js || python3 ep05/geo_world.py
$PY build_tl.py ep05/ep05_segments.json ep05/aud ep05/ep05 | grep -v aligned
python3 build_page.py ep05/ep05_segments.json ep05/ep05_tl.json common.js,geo_map.js,ep05/scenes.js,ep05/pov.js ep05/ep05_page.html 1920x1080
