"""trousers.py (P4 EP1 v2, 27 Nov 2026): the teacher's Uncle Lim paintings wear shorts when standing and head-on, long trousers when riding
side-on and from behind. One outfit all the way through: the default is LONG green trousers, so the four shorts paintings get their shorts
extended down to the shoe tops (the same green, the same outline weight, a slight taper, a crease line like the riding paintings; the bare
shins hidden). Originals untouched: ../teacher_uncle_lim_2026-11-27/<name>.jpg -> characters/lim/<name>_trousers.png (same 1024 x 1024, white ground).
How, per painting: the shorts' green and the skin are found by colour; below the shorts' hem each leg's skin (a connected patch) is covered
by a trouser leg whose sides run straight from the hem (just above it, so the old hem line disappears) to just over the shoe top, a little
narrower at the bottom; dark outline 5 px; a crease line down the middle; the inner side shaded.   /home/user/heart-tts/venv/bin/python trousers.py"""
import cv2, numpy as np, os
H = os.path.dirname(os.path.abspath(__file__)); SRC = f"{H}/../teacher_uncle_lim_2026-11-27"
NAMES = ["lim_ride_front"]   # (27 Nov) the teacher repainted the three standing poses in long trousers (teacher_uncle_lim_2026-11-27/*_trousers.jpg): only the head-on ride is edited here
def masks(im):
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV); h, s, v = [hsv[..., i].astype(int) for i in range(3)]
    green = (h >= 28) & (h <= 50) & (s >= 35) & (s <= 140) & (v >= 70) & (v <= 200)
    skin = (h >= 5) & (h <= 22) & (s >= 35) & (s <= 150) & (v >= 170)
    brown = (h <= 20) & (s >= 60) & (v <= 120) & (v >= 25)
    return green, skin, brown
def legs(name, im):
    green, skin, brown = masks(im); ys, xs = np.where(green); gy1 = ys.max()
    gcol = np.median(im[green], axis=0)
    # skin patches below the shorts' hem zone (the shins)
    top = int(np.percentile(ys, 90)) - 10
    sk = skin.copy(); sk[:top] = False; sk = cv2.morphologyEx(sk.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    n, lab, st, cen = cv2.connectedComponentsWithStats(sk)
    L = [i for i in range(1, n) if st[i, 4] > 1500 and st[i, 3] > 50]
    out = []
    for i in L:
        x, y, w, hh, a = st[i]; m = lab == i
        # the hem above this leg: the lowest green row over the leg's top columns
        cols = range(x, x + w); hem = max([np.where(green[:, c])[0].max() for c in cols if green[:, c].any()] or [y])
        # the shoe top under the leg: the highest brown row below the patch, near its bottom columns
        yb = y + hh; rows = np.where(m[yb - 6:yb].any(1))[0]; bx = np.where(m[yb - 6:yb].any(0))[0]
        sh = brown[yb - 10: yb + 60, max(0, x - 30): x + w + 30]; sy = np.where(sh.any(1))[0]; shoe = yb - 10 + (sy.min() if len(sy) else 10)
        r0 = np.where(m[y + 3])[0]; r1 = np.where(m[min(yb - 4, shoe - 2)])[0]
        out.append(dict(top=(hem, r0.min(), r0.max()), bot=(shoe, r1.min(), r1.max()), y=y))
    return out, gcol
def paint(name):
    im = cv2.imread(f"{SRC}/{name}.jpg"); L, gcol = legs(name, im); g = tuple(int(c) for c in gcol); dark = tuple(int(c * .86) for c in gcol); ink = (28, 26, 30)
    if name in HULL: return hull_legs(name, im, g, dark, ink)
    for lg in L:
        (hy, l0, r0), (sy, l1, r1) = lg["top"], lg["bot"]
        pad0 = 9; wt = (r0 - l0) + 2 * pad0; cx0 = (l0 + r0) / 2; cx1 = (l1 + r1) / 2; wb = max(wt * .82, (r1 - l1) + 14)
        ytop, ybot = hy - 8, sy + 9
        poly = np.array([[cx0 - wt / 2, ytop], [cx0 + wt / 2, ytop], [cx1 + wb / 2, ybot], [cx1 - wb / 2, ybot]], np.int32)
        cv2.fillPoly(im, [poly], g, lineType=cv2.LINE_AA)
        inner = np.array([[cx0 + wt * .18, ytop + 6], [cx0 + wt / 2 - 4, ytop + 6], [cx1 + wb / 2 - 4, ybot - 4], [cx1 + wb * .12, ybot - 4]], np.int32)
        side = 1 if cx0 > im.shape[1] / 2 else -1   # shade the side towards the middle of his body
        if side == 1: inner = np.array([[cx0 - wt / 2 + 4, ytop + 6], [cx0 - wt * .18, ytop + 6], [cx1 - wb * .12, ybot - 4], [cx1 - wb / 2 + 4, ybot - 4]], np.int32)
        ov = im.copy(); cv2.fillPoly(ov, [inner], dark, lineType=cv2.LINE_AA); im = cv2.addWeighted(ov, .35, im, .65, 0)
        cv2.line(im, tuple(poly[0]), tuple(poly[3]), ink, 5, cv2.LINE_AA); cv2.line(im, tuple(poly[1]), tuple(poly[2]), ink, 5, cv2.LINE_AA)
        cv2.line(im, tuple(poly[3]), tuple(poly[2]), ink, 4, cv2.LINE_AA)
        cv2.line(im, (int(cx0 + side * wt * .08), ytop + 30), (int(cx1 + side * wb * .06), ybot - 26), dark, 3, cv2.LINE_AA)   # the crease
        print(name, "leg", "hem", hy, "shoe", sy, "top", int(wt), "bottom", int(wb))
    cv2.imwrite(f"{H}/{name}_trousers.png", im)
    return im
# head-on (lim_ride_front): the shins are bent and angled (one knee up), so each trouser leg is the convex hull of that leg's skin, a little
# wider, outlined where it does not meet the shorts; the crease from the knee to the ankle
HULL = {"lim_ride_front"}
def hull_legs(name, im, g, dark, ink):
    green, skin, brown = masks(im); ys, xs = np.where(green); top = int(np.percentile(ys, 60))
    sk = skin.copy(); sk[:top] = False; sk = cv2.morphologyEx(sk.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    n, lab, st, cen = cv2.connectedComponentsWithStats(sk); shorts = cv2.dilate(green.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
    for i in range(1, n):
        if st[i, 4] < 1200: continue
        m = (cv2.dilate((lab == i).astype(np.uint8), np.ones((9, 9), np.uint8)) > 0).astype(np.uint8)
        cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); hl = cv2.convexHull(np.vstack(cs))
        reg = np.zeros(m.shape, np.uint8); cv2.fillPoly(reg, [hl], 1)
        im[reg > 0] = g
        ol = np.zeros(m.shape, np.uint8); cv2.polylines(ol, [hl], True, 1, 5, cv2.LINE_AA); ol[shorts & ~(reg > 0)] = 0
        ol[cv2.erode(green.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0] = 0
        im[ol > 0] = ink
        yy, xx = np.where(reg > 0); y0, y1 = yy.min(), yy.max(); cx0 = xx[yy < y0 + 12].mean(); cx1 = xx[yy > y1 - 12].mean()
        cv2.line(im, (int(cx0), int(y0 + 18)), (int(cx1), int(y1 - 16)), dark, 3, cv2.LINE_AA)
        print(name, "leg (hull)", int(y0), int(y1))
    cv2.imwrite(f"{H}/{name}_trousers.png", im); return im
if __name__ == "__main__":
    for n in NAMES: paint(n)
