"""app_manifest.py: app/shots.json (capture.js) + the extra pictures (capture2.js: home.jpg, posterP.jpg) -> app/manifest.js (window.APP:
each picture's file, pixel size, the boxes of its buttons; Part 1 loads only the printed poster). Run after capture.js and capture2.js."""
import json, os, subprocess
H = os.path.dirname(os.path.abspath(__file__)); A = os.path.join(H, 'app'); m = json.load(open(os.path.join(A, 'shots.json'))); out = {}
def size(f): r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip().split(','); return int(r[0]), int(r[1])
for k, v in m.items():
    if k.endswith('_frames'): out[k] = v; continue
    f = os.path.join(A, k + '.jpg')
    if os.path.exists(f): w, h = size(f); out[k] = {'file': 'app/' + k + '.jpg', 'w': w, 'h': h, 'boxes': v.get('boxes', {}), 'part': 2}
    fh = os.path.join(A, k + '_hi.jpg')
    if os.path.exists(fh): w, h = size(fh); out[k + '_hi'] = {'file': 'app/' + k + '_hi.jpg', 'w': w, 'h': h, 'at': v['hi']['at'], 'part': 2}
w, h = size(os.path.join(A, 'posterP.jpg')); out['posterP'] = {'file': 'app/posterP.jpg', 'w': w, 'h': h}
w, h = size(os.path.join(A, 'home.jpg')); out['home'] = {'file': 'app/home.jpg', 'w': w, 'h': h, 'boxes': {'mm': [0.925, 0.135, 0.06, 0.025]}, 'part': 2}   # the Supertree's "Mind Maps" label (read off the picture)
open(os.path.join(A, 'manifest.js'), 'w').write('window.APP=' + json.dumps(out) + ';')
print(len(out), 'pictures')
