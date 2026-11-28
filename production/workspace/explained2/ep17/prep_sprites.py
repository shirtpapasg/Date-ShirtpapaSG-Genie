"""prep_sprites.py: the teacher's painted buddies (characters/sprites: sitting talk sprites + poses/) -> spr/*.png at 0.75 scale
and spr/manifest.js (window.SPR = {name: {file, w, h, ax, ay, bh}}; ax, ay = the feet anchor, bh = sitting body height, all in spr px).
Read-only on characters/sprites. Re-run when new poses appear.  /home/user/heart-tts/venv/bin/python prep_sprites.py
EP14 is the first episode IN COLOUR (teacher, 22 Nov): Momo and Basil come ONLY from their coloured sets (momo_c_sit_*, basil_c_sit_*,
poses/momo_c_*, poses/basil_c_*), written under the plain names (momo_sit_closed, basil_cheer ...) so the scene code is unchanged; Pip
stays grey (his own files). No grey Momo / Basil file is copied (never mix grey and coloured in one episode): a pose with no coloured
painting is simply absent, and lib.js POSE_SUB swaps it (Momo pointing -> waving, Basil arms_crossed -> thinking).
Momo's coloured pointing painting is cropped (its tail ends in a straight cut): it is written as momo_pointing_cut, for shots where her
tail side is hidden only (pose "pointing_cut"); until an uncropped one comes, "pointing" stays the waving stand-in."""
import cv2, json, os
H = os.path.dirname(os.path.abspath(__file__)); S = f"{H}/../characters/sprites"; O = f"{H}/spr"; os.makedirs(O, exist_ok=True); K = .75; M = {}
def put(name, src, ax, ay, bh):
    im = cv2.imread(src, -1); h, w = im.shape[:2]; im = cv2.resize(im, (round(w * K), round(h * K)), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f"{O}/{name}.png", im, [cv2.IMWRITE_PNG_COMPRESSION, 6]); M[name] = dict(file=f"spr/{name}.png", w=im.shape[1], h=im.shape[0], ax=round(ax * K, 1), ay=round(ay * K, 1), bh=round(bh * K, 1))
for f in os.listdir(O):
    if f.endswith(".png"): os.remove(f"{O}/{f}")           # no stale grey sprite may survive a re-run
SET = {"pip": "pip", "basil": "basil_v2", "momo": "momo_v2"}   # buddy -> the sprite set (EP15 on: the v2 cast, one style: Momo and Basil v2, Pip unchanged; EP16, EP17 the same)
RENAME = {}   # (Momo's cropped pointing was replaced by an uncropped painting on 22 Nov: plain "pointing" now)
BH = {}
for b, src in SET.items():
    m = json.load(open(f"{S}/{src}_sit.json")); x0, y0, x1, y1 = m["states"]["closed"]["bbox"]; hx, hy = m["anchors"]["hips"]; BH[b] = y1 - y0
    for st in ("closed", "half", "wide", "blink", "half_blink", "wide_blink"): put(f"{b}_sit_{st}", f"{S}/{src}_sit_{st}.png", hx, hy, y1 - y0)
pj = f"{S}/poses/poses.json"
if os.path.exists(pj):
    P = json.load(open(pj))
    for b, src in SET.items():
        for pose, v in P.get(src, {}).items():
            if pose.startswith("_"): continue
            f = f"{S}/{v.get('file', f'poses/{src}_{pose}.png')}"
            if "offmodel" in f or not os.path.exists(f): continue
            a = v["anchor"]; put(f"{b}_{RENAME.get((b, pose), pose)}", f, a[0], a[1], BH[b])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";"); print(len(M), "sprites:", " ".join(sorted(M)))
