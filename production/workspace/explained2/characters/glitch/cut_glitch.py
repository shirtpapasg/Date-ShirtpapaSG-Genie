"""cut_glitch.py (P4 EP2, 27 Nov 2026): the teacher's painted GLITCH (../teacher_ep02_2026-11-27/glitch_base.jpg) -> layers for the episode.
  /home/user/heart-tts/venv/bin/python cut_glitch.py      -> cut/glitch_<layer>.png + cut/glitch.json
Layers (all in the painting's own pixel frame, cropped to one shared box, so they stack with no offsets):
  body        the painting minus both arms (the shoulder joints stay), the screen as painted (his painted smug face), the wheels as painted
  armL, armR  the painted arms (L = his right, hanging at the picture's left; R = his left, raised at the picture's right): drawn back on for
              the painted "base / lecturing" pose; other poses draw code arms in the same style (p4ep02/glitch.js)
  screen      the screen glass with the painted face strokes in-painted (the glare stripes kept): the expression layer, faces drawn in code
  wheelF, wheelB  each wheel inside its fitted ellipse (rotated in code as he rolls); hubF  the front wheel's hub, drawn static on top
The antenna's soft glow is cleared with the white paper (it is light) and redrawn in code as a radial glow (soft, it can pulse).
glitch.json: the crop box, the screen's rounded box and the painted face's eye / mouth positions, the shoulder points, the wheel ellipses,
the antenna bulb, the body's lowest tyre point (the ground) and the face box for qa/face_cover_scan.js."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); T = f"{H}/../teacher_ep02_2026-11-27"; sys.path.insert(0, f"{H}/../sprites")
from cutout import cutout
im = cv2.imread(f"{T}/glitch_base.jpg"); cut = cutout(im); a = cut[..., 3].copy()
Hh, Ww = a.shape; yy, xx = np.mgrid[:Hh, :Ww]
# ---- arms (measured on the 1024 px painting): everything of the arm outside the body's outline; the shoulder joints stay on the body
# the body's left and right edges (outer side of the dark outline), traced on the painting; the shoulder joints (discs) are kept
edgeL = np.interp(yy, [480, 540, 600, 650, 700, 750, 790, 810], [236, 236, 241, 247, 252, 258, 272, 300]) - 9
keepL = ((xx >= edgeL) | ((xx - 265) ** 2 + (yy - 575) ** 2 < 52 ** 2)) & (yy < 815)
armL = (a > 0) & (xx < 310) & (yy > 520) & ~keepL
edgeR = np.interp(yy, [300, 400, 500, 560, 620], [744, 752, 756, 758, 758]) + 9
keepR = (xx <= edgeR) | ((xx - 772) ** 2 + (yy - 558) ** 2 < 30 ** 2)
armR = (a > 0) & (xx > 740) & (yy < 640) & (yy > 300) & ~keepR
# ---- the screen glass: the light region inside the dark bezel, grown round the face strokes (its convex hull)
L = im.min(2); hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
dark = (L < 110).astype(np.uint8)
seed = (555, 520)   # glass below the smile
ff = (1 - dark).copy(); pad = np.pad(ff, 1); cv2.floodFill(pad, None, (seed[0] + 1, seed[1] + 1), 2); reg = (pad[1:-1, 1:-1] == 2).astype(np.uint8)
reg[:300] = 0; reg[600:] = 0; reg[:, :370] = 0; reg[:, 730:] = 0
hull = cv2.convexHull(cv2.findNonZero(reg)); scr = np.zeros_like(reg); cv2.fillPoly(scr, [hull], 1); scr = cv2.erode(scr, np.ones((5, 5), np.uint8))
sx, sy, sw, sh = cv2.boundingRect(scr)
# the painted face strokes inside the screen: dark pixels (and their soft edge) -> in-painted from the glass round them
strokes = cv2.dilate(((L < 150) & (scr > 0)).astype(np.uint8), np.ones((3, 3), np.uint8), iterations=3) & cv2.erode(scr, np.ones((13, 13), np.uint8))
blank = cv2.inpaint(im, strokes * 255, 9, cv2.INPAINT_TELEA)
# the painted eyes and mouth (for the code faces: the same positions and stroke weight)
n, lab, st, cen = cv2.connectedComponentsWithStats(((L < 90) & (scr > 0)).astype(np.uint8))
comps = sorted([(st[i, 4], cen[i], st[i]) for i in range(1, n) if st[i, 4] > 60], key=lambda c: -c[0])
eyes = sorted([c for c in comps if c[2][3] > 30][:2], key=lambda c: c[1][0])
mouth = [c for c in comps if c[1][1] > max(e[1][1] for e in eyes) + 30]
mouth = max(mouth, key=lambda c: c[0]) if mouth else None
# ---- wheels: ellipses fitted to the tyres' dark outline (front = the picture's left wheel, nearer the camera; back = the right one)
# measured on the painting (fitEllipse was pulled off by the struts): the tyres' outer ellipses
WF = dict(cx=378.0, cy=880.0, rx=66.0, ry=72.0, ang=0.0); WB = dict(cx=675.0, cy=857.0, rx=63.0, ry=67.0, ang=0.0)
STRUT = {"F": np.array([[416, 786], [472, 786], [472, 880], [428, 884]], np.int32), "B": np.array([[586, 786], [642, 786], [642, 874], [600, 874]], np.int32)}
def ell_mask(w, grow=0):
    m = np.zeros_like(a); cv2.ellipse(m, (int(w["cx"]), int(w["cy"])), (int(w["rx"] + grow), int(w["ry"] + grow)), w["ang"], 0, 360, 255, -1); return m
hub = np.zeros_like(a); cv2.ellipse(hub, (348, 885), (29, 43), 0, 0, 360, 255, -1)
# ---- the antenna bulb (the yellow disc) for the code glow
yel = ((hsv[..., 0] > 18) & (hsv[..., 0] < 35) & (hsv[..., 1] > 120) & (yy < 200)).astype(np.uint8)
by, bx = np.where(yel); bulb = dict(x=float(bx.mean()), y=float(by.mean()), r=float(np.sqrt(yel.sum() / np.pi)))
# ---- crop box shared by every layer
ys_, xs_ = np.where(a > 0); X0, Y0, X1, Y1 = int(xs_.min()) - 30, int(ys_.min()) - 60, int(xs_.max()) + 30, int(ys_.max()) + 8
def save(name, rgb, alpha):
    o = np.dstack([rgb, alpha]).astype(np.uint8)[Y0:Y1, X0:X1]; cv2.imwrite(f"{H}/cut/glitch_{name}.png", o)
os.makedirs(f"{H}/cut", exist_ok=True)
body_a = a.copy(); body_a[armL | armR] = 0
save("body", cut[..., :3], body_a)
save("armL", cut[..., :3], np.where(armL, a, 0)); save("armR", cut[..., :3], np.where(armR, a, 0))
scr_a = (cv2.GaussianBlur(scr.astype(np.float32), (0, 0), .8) * 255).clip(0, 255)
save("screen", blank, scr_a)
for nm, w in (("wheelF", WF), ("wheelB", WB)): save(nm, cut[..., :3], np.minimum(a, ell_mask(w, 2)))
save("hubF", cut[..., :3], np.minimum(a, cv2.GaussianBlur(hub, (0, 0), 1)))
for k in ("F", "B"):   # the silver strut stays still while the tyre turns (drawn over the turning wheel)
    m = np.zeros_like(a); cv2.fillPoly(m, [STRUT[k]], 255); save("strut" + k, cut[..., :3], np.minimum(a, cv2.GaussianBlur(m, (0, 0), 1)))
gy = float(max(WF["cy"] + WF["ry"], WB["cy"] + WB["ry"]))
o = lambda x, y: [round(float(x) - X0, 1), round(float(y) - Y0, 1)]
meta = dict(src="../teacher_ep02_2026-11-27/glitch_base.jpg", w=X1 - X0, h=Y1 - Y0, ground=round(gy - Y0, 1), cx=round((sx + sw / 2) - X0, 1),
  screen=dict(x=sx - X0, y=sy - Y0, w=sw, h=sh, r=34, hull=[o(*p[0]) for p in hull[::max(1, len(hull) // 40)]]),
  eyes=[dict(c=o(*e[1]), w=int(e[2][2]), h=int(e[2][3])) for e in eyes], mouth=dict(c=o(*mouth[1]), w=int(mouth[2][2]), h=int(mouth[2][3])) if mouth else None,
  shoulderL=o(265, 575), shoulderR=o(776, 548), bulb=dict(x=round(bulb["x"] - X0, 1), y=round(bulb["y"] - Y0, 1), r=round(bulb["r"], 1)),
  wheelF={k: round(float(v) - (X0 if k == "cx" else Y0 if k == "cy" else 0), 1) for k, v in WF.items()},
  wheelB={k: round(float(v) - (X0 if k == "cx" else Y0 if k == "cy" else 0), 1) for k, v in WB.items()},
  hubF=o(348, 885), face=[sx - X0, sy - Y0, sw, sh])
json.dump(meta, open(f"{H}/cut/glitch.json", "w"), indent=1); print(json.dumps(meta)[:900])
