#!/bin/bash
# ep08/build.sh: sounds + scenes.js + timeline + page for EP08 (run from anywhere). Then ./render_all.sh ep08 ep08
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
ls sfx/ep08_rewind.wav >/dev/null 2>&1 || $PY ep08/sfx_ep08.py
# scenes.js = scenes.src.js with the series' pupil (krKid in ep02/coldopen.js) copied in under our own name, e8Kid
python3 - <<'PYEOF'
import re
src = open('ep02/coldopen.js').read(); a = src.index('function krKid('); b = src.index('\nS.kidRoom', a)
kid = '// the pupil (copied from ep02/coldopen.js krKid): side view, facing right, feet at (0, 0)\n' + src[a:b].rstrip().replace('krKid', 'e8Kid')
open('ep08/scenes.js', 'w').write(open('ep08/scenes.src.js').read().replace('/*KID*/', kid))
PYEOF
[ "$1" = "page" ] || $PY build_tl.py ep08/ep08_segments.json ep08/aud ep08/ep08 | grep -v aligned
python3 build_page.py ep08/ep08_segments.json ep08/ep08_tl.json common.js,geo_map.js,ep08/scenes.js,ep08/pov.js ep08/ep08_page.html 1920x1080
