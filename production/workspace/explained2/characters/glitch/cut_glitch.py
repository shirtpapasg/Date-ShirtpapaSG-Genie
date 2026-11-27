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

# ======== the teacher's four arm poses (glitch_arms_four.jpg, 27 Nov): 1 jug (a watering can, both arms), 2 arms crossed (smug / grumpy),
# 3 both arms up (happy), 4 arms straight down (acquired; the body for error / surprised). Each robot is cut from the sheet, its screen glass
# masked (the faces are drawn in code), its wheels measured; scale = the base painting's screen height / this screen's height; origin = the
# screen's centre x on the wheels' ground line, in the base layers' units (glitch.json "poses").
POSES4 = ["jug", "crossed", "up", "down"]
def find_screen(img, alpha, seed):
    Lm = img.min(2); dk = (Lm < 110).astype(np.uint8); ff = 1 - dk; pad = np.pad(ff, 1); cv2.floodFill(pad, None, (int(seed[0]) + 1, int(seed[1]) + 1), 2)
    reg = (pad[1:-1, 1:-1] == 2).astype(np.uint8) & (alpha > 0)
    h_ = cv2.convexHull(cv2.findNonZero(reg)); sc = np.zeros_like(reg); cv2.fillPoly(sc, [h_], 1); return cv2.erode(sc, np.ones((5, 5), np.uint8)), h_
def wheels_of(alpha, img, ground):
    """the two tyres: dark columns in the band just above the ground, split in two clusters; each tyre's box = its dark rows/cols"""
    Lm = img.min(2); band = (alpha > 0) & (Lm < 125); out = []
    y0b = int(ground - 40); cols = np.where(band[y0b:int(ground) + 1].sum(0) > 4)[0]
    if not len(cols): return out
    groups = np.split(cols, np.where(np.diff(cols) > 8)[0] + 1); groups = sorted(groups, key=len)[-2:]
    for g in sorted(groups, key=lambda g: g[0]):
        x0, x1 = int(g[0]), int(g[-1]); sub = band[int(ground) - 110:int(ground) + 1, x0:x1 + 1]; widths = sub.sum(1); wmax = widths.max()
        r = len(widths) - 1
        while r > 0 and (widths[r - 1] > .4 * wmax or r > len(widths) - 12): r -= 1   # the contiguous tyre rows up from the ground
        ty0 = int(ground) - 110 + r; ty1 = int(ground)
        out.append(dict(cx=(x0 + x1) / 2, cy=(ty0 + ty1) / 2, rx=(x1 - x0) / 2, ry=(ty1 - ty0) / 2, ang=0.0, x0=int(x0), x1=int(x1), top=int(ty0)))
    return out
SHEET = f"{T}/glitch_arms_four.jpg"
if os.path.exists(SHEET):
    sh_im = cv2.imread(SHEET); sh_cut = cutout(sh_im); sa = sh_cut[..., 3]
    n_, lb_, st_, cen_ = cv2.connectedComponentsWithStats((sa > 20).astype(np.uint8))
    big = sorted([i for i in range(1, n_) if st_[i, 4] > 20000], key=lambda i: cen_[i][0])[:4]
    owner = np.zeros_like(lb_)
    for j, i in enumerate(big): owner[lb_ == i] = j + 1
    for i in range(1, n_):   # small pieces (the antenna bulbs, a claw tip) join the nearest robot
        if i in big or st_[i, 4] < 15: continue
        j = int(np.argmin([abs(cen_[i][0] - cen_[b][0]) for b in big])); owner[lb_ == i] = j + 1
    BASE_SH = meta["screen"]["h"]; meta["poses"] = {}
    Lsh = sh_im.min(2)
    for j, name in enumerate(POSES4):
        al = np.where(owner == j + 1, sa, 0).astype(np.uint8); ys2, xs2 = np.where(al > 0)
        top_, gnd = ys2.min(), ys2.max()
        # the screen: seed in the glass, below the painted smile (the body's upper-middle)
        bx = int(np.median(xs2[ys2 < top_ + .55 * (gnd - top_)])); by = int(top_ + .42 * (gnd - top_))
        cand = [(abs(x - bx) + abs(y - by), x, y) for y in range(by - 25, by + 26, 5) for x in range(bx - 40, bx + 41, 5) if Lsh[y, x] > 190 and al[y, x] > 0]
        _, sxs, sys_ = min(cand); scm, hl = find_screen(sh_im, al, (sxs, sys_)); qx, qy, qw, qh = cv2.boundingRect(scm)
        stk = cv2.dilate(((Lsh < 150) & (scm > 0)).astype(np.uint8), np.ones((3, 3), np.uint8), iterations=2) & cv2.erode(scm, np.ones((9, 9), np.uint8))
        blank_ = cv2.inpaint(sh_im, stk * 255, 7, cv2.INPAINT_TELEA)
        W2 = wheels_of(al, sh_im, gnd)
        ex0, ey0, ex1, ey1 = xs2.min() - 20, ys2.min() - 40, xs2.max() + 20, gnd + 6
        def save2(lname, rgb, alpha_):
            o_ = np.dstack([rgb, alpha_]).astype(np.uint8)[ey0:ey1, ex0:ex1]; cv2.imwrite(f"{H}/cut/glitch_{name}_{lname}.png", o_)
        save2("body", sh_cut[..., :3], al)
        save2("screen", blank_, (cv2.GaussianBlur(scm.astype(np.float32), (0, 0), .8) * 255).clip(0, 255))
        wl = []
        for k_, w in zip("FB", W2):
            m = np.zeros_like(al); cv2.ellipse(m, (int(w["cx"]), int(w["cy"])), (int(w["rx"] + 2), int(w["ry"] + 2)), 0, 0, 360, 255, -1)
            save2("wheel" + k_, sh_cut[..., :3], np.minimum(al, m))
            # the strut: the narrow alpha between the body and this tyre's top, kept still over the turning tyre
            gap = al[w["top"] - 40: w["top"] + 4, w["x0"]: w["x1"] + 1] > 0; colsS = np.where(gap[: 30].sum(0) > 10)[0]
            if len(colsS):
                s0, s1 = w["x0"] + colsS.min() - 3, w["x0"] + colsS.max() + 3; ms = np.zeros_like(al); ms[w["top"] - 40: int(w["cy"] + .1 * w["ry"]), s0: s1] = 255
                save2("strut" + k_, sh_cut[..., :3], np.minimum(al, np.minimum(m, ms)))
            wl.append({kk: round(float(v) - (ex0 if kk in ("cx", "x0", "x1") else ey0 if kk in ("cy", "top") else 0), 1) for kk, v in w.items()})
        k = BASE_SH / qh
        meta["poses"][name] = dict(w=int(ex1 - ex0), h=int(ey1 - ey0), ox=round(qx + qw / 2 - ex0, 1), oy=round(gnd - ey0, 1), scale=round(k, 4),
            screen=dict(x=qx - ex0, y=qy - ey0, w=qw, h=qh), wheels=wl, face=[qx - ex0, qy - ey0, qw, qh])
        print(name, meta["poses"][name]["scale"], "screen", qw, qh, "wheels", [(w["cx"], w["cy"], w["rx"], w["ry"]) for w in wl])
    json.dump(meta, open(f"{H}/cut/glitch.json", "w"), indent=1, default=float)
