#!/bin/bash
# ep07/build.sh: sounds, timeline and page for EP07 (run from sau/). Then: ./render_all.sh ep07 ep07
cd "$(dirname "$0")/.." && PY=/home/user/heart-tts/venv/bin/python
[ -f sfx/ep07_heart.wav ] || $PY ep07/sfx_ep07.py
$PY build_tl.py ep07/ep07_segments.json ep07/aud ep07/ep07 | grep -E "WARNING|PROPORTIONAL|END"
python3 build_page.py ep07/ep07_segments.json ep07/ep07_tl.json common.js,geo_map.js,ep07/scenes.js,ep07/pov.js ep07/ep07_page.html 1920x1080
