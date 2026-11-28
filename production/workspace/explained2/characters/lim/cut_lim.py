"""cut_lim.py (P4 EP1 v2, 27 Nov 2026): the teacher's Uncle Lim paintings -> cut-outs for the episode, all on ONE scale (his helmet the same
width in every view), the side-view bikes fitted to the code roadster (RD in artv2.js: wheel centres 600 apart, ground at y 0).
  /home/user/heart-tts/venv/bin/python cut_lim.py   -> cut/lim_<view>.png + cut/lim.json (per view: the pixel that is the local origin, the
                                                       local units per pixel, the painted wheels; read by p4ep01v2/lim_sprites.py)
Background: cutout.cutout() (flood from the border), then the paper closed in by the drawing (inside the bike's frame, between an arm and the
body) made clear too: near-white patches over 250 px, except in the head (the white helmet). Side views: inside each painted wheel the
light pixels (paper, the thin grey spokes, the rim's highlight) are made clear (the hub, frame, chain outline, legs and shoes stay), so the
episode draws turning spokes behind the painting while the painted tyre (a circle) stays put.
OUTFIT: long trousers (teacher, 27 Nov). The shorts originals are kept; to switch, change OUTFIT in p4ep01v2/limv2.js (one line) after
cutting the shorts set here with OUTFIT = "shorts" (the riding side and rear views exist in trousers only)."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); T = f"{H}/../teacher_uncle_lim_2026-11-27"; sys.path.insert(0, f"{H}/../sprites")
from cutout import cutout
SRC = {"stand": f"{T}/lim_standing_trousers.jpg", "sip": f"{T}/lim_sip_trousers.jpg", "wave": f"{T}/lim_wave_trousers.jpg",
       "front": f"{H}/lim_ride_front_trousers.png", "back": f"{T}/lim_ride_back.jpg",
       "side": f"{T}/lim_ride_side.jpg", "look": f"{T}/lim_ride_side_look.jpg", "sidesip": f"{T}/lim_ride_side_sip.jpg"}
SIDE = {"side", "look", "sidesip"}
SEAL = {"side": 2, "look": 2, "sidesip": 2}
HELMFIX = {"look": 118, "sidesip": 112, "side": 100}   # rows from the top that are the helmet (by eye)   # the white helmet's outline has hairline breaks in the riding paintings: the flood must not leak in
# the helmet's width in each painting (px), measured on the teal rim band (standing, head-on) or by eye at full size (rear, side views):
# every view is scaled so this is HELMET_LOCAL wide; the side views are fitted to the roadster instead (their helmets come out 124-143)
HELMET = {"stand": 192, "sip": 190, "wave": 184, "front": 143, "back": 140, "side": 145, "look": 122, "sidesip": 149}; HELMET_LOCAL = 140
def wheels(im):
    g = cv2.medianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY), 5)
    c = cv2.HoughCircles(g, cv2.HOUGH_GRADIENT, dp=1.2, minDist=200, param1=100, param2=50, minRadius=115, maxRadius=180)
    c = [tuple(map(float, x)) for x in c[0] if x[1] > 600]
    pairs = [(p, q) for p in c for q in c if q[0] - p[0] > 450 and abs(q[1] - p[1]) < 30]   # the two wheels: level, far apart
    c = list(max(pairs, key=lambda pq: pq[1][0] - pq[0][0])); out = []
    gg = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    for (x, y, r) in c:   # the tyre: the dark ring, measured along the lower half
        dark = []
        for rr in range(90, 200):
            v = [gg[int(y + rr * np.sin(a)), int(x + rr * np.cos(a))] for a in np.linspace(.3, 2.8, 24) if 0 <= int(y + rr * np.sin(a)) < 1024 and 0 <= int(x + rr * np.cos(a)) < 1024]
            if np.median(v) < 90: dark.append(rr)
        out.append(dict(x=x, y=y, rin=float(min(dark)), rout=float(max(dark))))
    return out
def helmet_w(im, a):
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV); teal = (hsv[..., 0] >= 70) & (hsv[..., 0] <= 100) & (hsv[..., 1] > 60) & (a > 128)
    ys = np.where(a.max(1) > 128)[0]; top = ys[0]; teal[: top] = False; teal[top + int(.3 * (ys[-1] - top)):] = False
    yy, xx = np.where(teal); return float(np.percentile(xx, 98) - np.percentile(xx, 2)) if len(xx) else None
meta = {}
for k, f in SRC.items():
    im = cv2.imread(f); cut = cutout(im, seal=SEAL.get(k, 0)); a = cut[..., 3].copy()
    ys = np.where(a.max(1) > 128)[0]; top, bot = ys[0], ys[-1]
    light = (im.min(2) > 235) & (a > 0); n, lab, st, cen = cv2.connectedComponentsWithStats(light.astype(np.uint8))
    for i in range(1, n):
        if st[i, 4] > 250 and cen[i][1] > top + .22 * (bot - top): a[cv2.dilate((lab == i).astype(np.uint8), np.ones((3, 3), np.uint8)) > 0] = 0
    if k in HELMFIX:   # the helmet's white shell leaked into the flood: everything inside the hull of the helmet rows is opaque again
        hr = HELMFIX[k]; band = (a[top: top + hr] > 128).astype(np.uint8); pts = cv2.findNonZero(band)
        if pts is not None: hl = cv2.convexHull(pts); reg = np.zeros(band.shape, np.uint8); cv2.fillPoly(reg, [hl], 1); a[top: top + hr][reg > 0] = 255; cut[top: top + hr][reg > 0, :3] = im[top: top + hr][reg > 0]
    W = None
    if k in SIDE:
        W = wheels(im); hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV); L = im.min(2).astype(int); yy, xx = np.mgrid[:1024, :1024]
        for w in W:
            d = np.hypot(xx - w["x"], yy - w["y"]); zone = (d < w["rin"] - 1) & (d > .2 * w["rin"])
            clear = zone & (L > 150) & (hsv[..., 1] < 40); a[clear] = 0
    cut[..., 3] = a
    hw = helmet_w(im, a)
    xs = np.where(a.max(0) > 128)[0]; x0, x1 = xs[0] - 6, xs[-1] + 7; y0, y1 = top - 6, bot + 7
    out = cut[y0:y1, x0:x1]; cv2.imwrite(f"{H}/cut/lim_{k}.png", out)
    m = dict(src=os.path.relpath(f, H), w=int(x1 - x0), h=int(y1 - y0), helmet=hw)
    if W:
        wb = W[1]["x"] - W[0]["x"]; s = 600 / wb; m.update(scale=s, ox=W[0]["x"] + 300 / s - x0, oy=(W[0]["y"] + W[0]["rout"] + W[1]["y"] + W[1]["rout"]) / 2 - y0,
            wheels=[dict(x=(w["x"] - x0), y=(w["y"] - y0), rin=w["rin"], rout=w["rout"]) for w in W])
    else:   # standing / head-on / rear: the origin between the feet (or under the wheel) on the ground
        rows = a[bot - 8: bot + 1]; bx = np.where(rows.max(0) > 128)[0]; m.update(ox=float((bx.min() + bx.max()) / 2 - x0), oy=float(bot - y0))
    hsv2 = cv2.cvtColor(out[..., :3], cv2.COLOR_BGR2HSV); al = out[..., 3]; yy2 = np.where(al.max(1) > 128)[0]
    teal = (hsv2[..., 0] >= 72) & (hsv2[..., 0] <= 92) & (hsv2[..., 1] > 90) & (hsv2[..., 2] > 60) & (al > 128); teal[yy2[0] + int(.33 * (yy2[-1] - yy2[0])):] = False
    nt, lt, stt, _ = cv2.connectedComponentsWithStats(teal.astype(np.uint8))
    if k != "back" and nt > 1:   # the face box (for the QA face scans): from the helmet's rim band down to the chin
        i = 1 + np.argmax(stt[1:, 4]); bx, by, bw, bh, _ = stt[i]; hw_ = HELMET[k]
        m["face"] = [float(bx + bw / 2 - hw_ * .5), float(by - hw_ * .1), float(hw_), float(hw_ * .85)]
    meta[k] = m; print(k, {q: (round(v, 2) if isinstance(v, float) else v) for q, v in m.items() if q != "wheels"}, W and [(round(w["x"]), round(w["y"]), w["rin"], w["rout"]) for w in W])
hs = HELMET_LOCAL
for k, m in meta.items():
    m["helmet"] = HELMET[k]
    if k not in SIDE: m["scale"] = hs / m["helmet"]
    m["helmet_local"] = m["helmet"] * m["scale"]
json.dump(meta, open(f"{H}/cut/lim.json", "w"), indent=1); print("helmet width (local units):", round(hs, 1), {k: round(m["scale"], 3) for k, m in meta.items()})
