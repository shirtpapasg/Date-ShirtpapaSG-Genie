#!/bin/bash
# ep10/build.sh [page]: scenes.js + sound cues + timeline + page for EP10 (run from anywhere). Then ./render_all.sh ep10 ep10
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
# scenes.js = scenes.src.js with three things copied in under our own names (prefix q): the series' pupil (krKid in
# ep02/coldopen.js), the Aedes mosquito of ep09 (m9Moz) and the accurate Singapore map of ep03b (SG3, r3Map: Natural Earth coast)
python3 - <<'PYEOF'
import re
src = open('ep02/coldopen.js').read(); a = src.index('function krKid('); b = src.index('\nS.kidRoom', a)
kid = '// the pupil (copied from ep02/coldopen.js krKid): side view, facing right, feet at (0, 0)\n' + src[a:b].rstrip().replace('krKid', 'qKid')
m = open('ep09/scenes.src.js').read(); a = m.index('function m9Moz('); b = m.index('// a mosquito flying away', a)
moz = '// the Aedes mosquito (copied from ep09/scenes.src.js m9Moz)\n' + m[a:b].rstrip().replace('m9Moz', 'qMoz').replace('m9A', 'qA').replace('M9K', 'QK')
g = open('ep03b/scenes.js').read(); a = g.index('const SG3'); b = g.index('\n', a); c = g.index('function r3Map('); d = g.index('function r3Pin(', c)
geo = '// the real Singapore coastline (copied from ep03b/scenes.js: made by ep03b/sg_geo.py from Natural Earth)\n' + (g[a:b] + '\n' + g[c:d].rstrip()).replace('SG3', 'QSG').replace('r3Map', 'qMap').replace('r3Defs', 'qDefs')
open('ep10/scenes.js', 'w').write(open('ep10/scenes.src.js').read().replace('/*LIB*/', kid + '\n' + moz + '\n' + geo))
PYEOF
[ -f ep10/set_sfx.py ] && python3 ep10/set_sfx.py
[ "$1" = "page" ] || $PY build_tl.py ep10/ep10_segments.json ep10/aud ep10/ep10 | grep -v aligned
python3 build_page.py ep10/ep10_segments.json ep10/ep10_tl.json common.js,geo_map.js,ep10/scenes.js,ep10/pov.js ep10/ep10_page.html 1920x1080
