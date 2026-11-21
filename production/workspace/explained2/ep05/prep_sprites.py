"""prep_sprites.py: the teacher's painted buddies (characters/sprites: sitting talk sprites + poses/) -> spr/*.png at 0.75 scale
and spr/manifest.js (window.SPR = {name: {file, w, h, ax, ay, bh}}; ax, ay = the feet anchor, bh = sitting body height, all in spr px).
Read-only on characters/sprites. Re-run when new poses appear.  /home/user/heart-tts/venv/bin/python prep_sprites.py"""
import cv2, json, os
H = os.path.dirname(os.path.abspath(__file__)); S = f"{H}/../characters/sprites"; O = f"{H}/spr"; os.makedirs(O, exist_ok=True); K = .75; M = {}
def put(name, src, ax, ay, bh):
    im = cv2.imread(src, -1); h, w = im.shape[:2]; im = cv2.resize(im, (round(w * K), round(h * K)), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f"{O}/{name}.png", im, [cv2.IMWRITE_PNG_COMPRESSION, 6]); M[name] = dict(file=f"spr/{name}.png", w=im.shape[1], h=im.shape[0], ax=round(ax * K, 1), ay=round(ay * K, 1), bh=round(bh * K, 1))
BH = {}
for b in ("pip", "basil", "momo"):
    m = json.load(open(f"{S}/{b}_sit.json")); x0, y0, x1, y1 = m["states"]["closed"]["bbox"]; hx, hy = m["anchors"]["hips"]; BH[b] = y1 - y0
    for st in ("closed", "half", "wide", "blink", "half_blink", "wide_blink"): put(f"{b}_sit_{st}", f"{S}/{b}_sit_{st}.png", hx, hy, y1 - y0)
pj = f"{S}/poses/poses.json"
if os.path.exists(pj):
    P = json.load(open(pj))
    for b, poses in P.items():
        if b not in BH: continue
        for pose, v in poses.items():
            f = f"{S}/{v.get('file', f'poses/{b}_{pose}.png')}"
            if "offmodel" in f or not os.path.exists(f): continue
            a = v["anchor"]; put(f"{b}_{pose}", f, a[0], a[1], BH[b])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";"); print(len(M), "sprites:", " ".join(sorted(M)))
