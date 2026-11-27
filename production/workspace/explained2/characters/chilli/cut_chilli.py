"""cut_chilli.py (P4 EP2, 27 Nov 2026): the teacher's painted Chilli -> cut-outs + talking / blink states, all on ONE scale.
  /home/user/heart-tts/venv/bin/python cut_chilli.py      -> cut/chilli_<pose>_<state>.png + cut/chilli.json
Sources: ../teacher_ep02_2026-11-27/*_pair.jpg (two poses side by side on white; the left half is the first pose of the name).
Scale: every pose is scaled so the pot's RIM is RIM_LOCAL (200) local units wide (the code stand-in chilliP4v2's rim), the origin is the
centre of the pot's BASE on the ground line, so a swap between poses keeps the same pot size and base line (pot rims lined up).
Talking states (the buddies' rule: edit the FACE only): the painted mouth is in-painted with the pot's own colour and a mouth is drawn in
the painting's navy outline (closed / half / wide); blink: the eyes in-painted and two closed-lid arcs drawn. The painting's own mouth is
kept as one state (droop: closed = the painted frown; tall: wide = the painted open smile). Faces and the face box are in chilli.json
(face = [x, y, w, h] px in the cut image) for qa/face_cover_scan.js.
A new pair (chilli_hop_pair, chilli_flat_shy_pair, chilli_alarmed_smug_pair) is picked up when its file is in the folder: no code change."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); T = f"{H}/../teacher_ep02_2026-11-27"; sys.path.insert(0, f"{H}/../sprites")
from cutout import cutout
PAIRS = {"chilli_droop_tall_pair": ("droop", "tall"), "chilli_hop_pair": ("hop_a", "tall_happy"), "chilli_flat_shy_pair": ("flat", "shy"),
         "chilli_alarmed_smug_pair": ("alarmed", "smug")}
TALK = {"droop": "closed", "tall": "wide", "tall_happy": "wide", "flat": "closed", "shy": "closed"}
CUT_T = {"hop_a": 236}   # hop_a keeps its light-grey dust puffs (the default 175 floods them away)   # which state the painted mouth is (the poses with talking sets); others: one face only
RIM_LOCAL = 200.0
NAVY = (58, 30, 33)          # BGR of the painting's outline (sampled)
MOUTH = (52, 40, 122)        # the open mouth's dark red (sampled from chilli_tall)
TONGUE = (138, 128, 236)

def pot_mask(img, a):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    m = (hsv[..., 0] >= 5) & (hsv[..., 0] <= 22) & (hsv[..., 1] > 110) & (hsv[..., 2] > 120) & (a > 200)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8)); i = 1 + np.argmax(st[1:, 4])
    reg = (lab == i).astype(np.uint8); return cv2.morphologyEx(reg, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))

def aa_draw(shape, fn, ss=4):
    """draw with fn(canvas, scale) at ss x size, return a float mask 0..1 at 1x (anti-aliased)"""
    big = np.zeros((shape[0] * ss, shape[1] * ss), np.uint8); fn(big, ss)
    return cv2.resize(big, (shape[1], shape[0]), interpolation=cv2.INTER_AREA).astype(np.float32) / 255

def paint(img, mask, col):
    m = mask[..., None]; img[:] = (img * (1 - m) + np.array(col, np.float32) * m).round().clip(0, 255).astype(np.uint8)

def face_parts(img, pot):
    """the dark blobs on the pot: eyes (two biggest in the upper face), brows, mouth (the lowest central one)"""
    ys, xs = np.where(pot > 0); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    hull = cv2.convexHull(cv2.findNonZero(pot)); inside = np.zeros_like(pot); cv2.fillPoly(inside, [hull], 1)
    inside = cv2.erode(inside, np.ones((15, 15), np.uint8))
    dark = ((img.max(2) < 110) & (inside > 0)).astype(np.uint8)
    dark[: y0 + int(.22 * (y1 - y0))] = 0   # below the rim band
    n, lab, st, cen = cv2.connectedComponentsWithStats(dark)
    comps = [dict(i=i, x=st[i, 0], y=st[i, 1], w=st[i, 2], h=st[i, 3], area=st[i, 4], cx=cen[i][0], cy=cen[i][1]) for i in range(1, n) if st[i, 4] > 25]
    eyes = sorted(sorted(comps, key=lambda c: -c["area"])[:2], key=lambda c: c["cx"])
    ey = np.mean([e["cy"] for e in eyes]); cx = np.mean([e["cx"] for e in eyes])
    below = [c for c in comps if c["cy"] > ey + 12 and abs(c["cx"] - cx) < 40]
    mouth = max(below, key=lambda c: c["area"])
    return eyes, mouth, lab, (x0, x1, y0, y1)

def inpaint(img, mask, r=6):
    """fill the masked face part with the pot's own glaze: a smooth quadratic surface fitted (per channel) to a ring of pot pixels round it,
    leaving out the blush and the outlines (cv2.inpaint dragged the pink blush up into streaks); the edge feathered over 2 px"""
    m = (mask > 0).astype(np.uint8); ring = cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=r + 6) - cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=2)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV); ok = (ring > 0) & (hsv[..., 0] >= 6) & (hsv[..., 0] <= 20) & (hsv[..., 1] > 150) & (hsv[..., 2] > 150)
    ys, xs = np.where(ok); X = np.stack([np.ones_like(xs), xs, ys, xs * xs, ys * ys, xs * ys], 1).astype(np.float64)
    yy, xx = np.where(cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=2) > 0); Xf = np.stack([np.ones_like(xx), xx, yy, xx * xx, yy * yy, xx * yy], 1).astype(np.float64)
    out = img.astype(np.float32); fill = out.copy()
    for c in range(3):
        coef, *_ = np.linalg.lstsq(X, img[ys, xs, c].astype(np.float64), rcond=None); fill[yy, xx, c] = Xf @ coef
    fm = cv2.GaussianBlur(cv2.dilate(m, np.ones((3, 3), np.uint8), iterations=2).astype(np.float32), (5, 5), 1.2)[..., None]
    return (out * (1 - fm) + fill * fm).round().clip(0, 255).astype(np.uint8)

def states(name, img, a):
    pot = pot_mask(img, a); eyes, mouth, lab, (px0, px1, py0, py1) = face_parts(img, pot)
    out = {}
    mx, my, mw, mh = mouth["x"], mouth["y"], mouth["w"], mouth["h"]; mcx = mx + mw / 2
    mmask = cv2.dilate((lab == mouth["i"]).astype(np.uint8), np.ones((5, 5), np.uint8), iterations=2)
    # the mouth's whole area (the open smile's inside is not dark): its bounding box, padded
    if name in ("tall", "tall_happy"):
        mmask[my - 3: my + mh + 4, mx - 4: mx + mw + 5] = 1
    noM = inpaint(img, mmask * 255, 7)
    lw = 3.6   # outline width (px at 1x)
    def mouth_draw(base, kind):
        im = base.copy().astype(np.uint8)
        W = mw if name == "tall" else mw * 1.05
        if kind == "frown_open":   # droop talking: an open frown (top arc bulging up, a flatter bottom)
            def poly(op):
                top = [(mcx - W / 2 + W * u, my + mh * .55 - np.sin(np.pi * u) * mh * .9) for u in np.linspace(0, 1, 24)]
                bot = [(mcx + W / 2 - W * u, my + mh * .55 - np.sin(np.pi * u) * mh * .9 + op * np.sin(np.pi * u) ** .7) for u in np.linspace(0, 1, 24)]
                return np.array(top + bot)
            return poly
        if kind == "smile_open":   # tall talking: a flat-topped open smile, height op
            def poly(op):
                top = [(mcx - W / 2 + W * u, my + 2 + 2.5 * np.sin(np.pi * u)) for u in np.linspace(0, 1, 24)]
                bot = [(mcx + W / 2 - W * u, my + 2 + 2.5 * np.sin(np.pi * u) + op * np.sin(np.pi * u) ** .8) for u in np.linspace(0, 1, 24)]
                return np.array(top + bot)
            return poly
    def draw_open(base, poly, op, tongue):
        im = base.copy(); P = poly(op)
        fill = aa_draw(im.shape, lambda c, s: cv2.fillPoly(c, [np.round(P * s).astype(np.int32)], 255, cv2.LINE_AA)); paint(im, fill, MOUTH)
        if tongue:
            tcx, tcy = P[:, 0].mean(), P[:, 1].max() - op * .28
            tm = aa_draw(im.shape, lambda c, s: cv2.ellipse(c, (int(tcx * s), int(tcy * s)), (int(mw * .28 * s), int(op * .32 * s)), 0, 0, 360, 255, -1, cv2.LINE_AA))
            paint(im, tm * fill, TONGUE)
        ol = aa_draw(im.shape, lambda c, s: cv2.polylines(c, [np.round(P * s).astype(np.int32)], True, 255, int(lw * s), cv2.LINE_AA)); paint(im, ol, NAVY)
        return im
    def draw_line(base, curve):
        im = base.copy(); P = np.array(curve)
        ol = aa_draw(im.shape, lambda c, s: cv2.polylines(c, [np.round(P * s).astype(np.int32)], False, 255, int(lw * s), cv2.LINE_AA)); paint(im, ol, NAVY); return im
    if name == "droop":
        poly = mouth_draw(noM, "frown_open")
        out["closed"] = img.copy()
        out["half"] = draw_open(noM, poly, 7, False)
        out["wide"] = draw_open(noM, poly, 13, True)
    elif name in ("tall", "tall_happy"):
        poly = mouth_draw(noM, "smile_open")
        out["wide"] = img.copy()
        out["half"] = draw_open(noM, poly, mh * .55, True)
        out["closed"] = draw_line(noM, [(mcx - mw * .42 + mw * .84 * u, my + 4 + mh * .38 * np.sin(np.pi * u)) for u in np.linspace(0, 1, 24)])
    elif name == "flat":   # unimpressed: the painted flat line; talking = a flat, level opening (no smile, no frown)
        W = max(mw, 22) * 1.1
        def fpoly(op):
            top = [(mcx - W / 2 + W * u, my + mh / 2 - op * .25 * np.sin(np.pi * u) ** .5) for u in np.linspace(0, 1, 24)]
            bot = [(mcx + W / 2 - W * u, my + mh / 2 + op * .75 * np.sin(np.pi * u) ** .6) for u in np.linspace(0, 1, 24)]
            return np.array(top + bot)
        out["closed"] = img.copy()
        out["half"] = draw_open(noM, fpoly, 6, False)
        out["wide"] = draw_open(noM, fpoly, 10, True)
    elif name == "shy":    # the painted small smile; talking = a small open smile
        W = mw * 1.0
        def spoly(op):
            top = [(mcx - W / 2 + W * u, my + 1 + 1.5 * np.sin(np.pi * u)) for u in np.linspace(0, 1, 24)]
            bot = [(mcx + W / 2 - W * u, my + 1 + 1.5 * np.sin(np.pi * u) + op * np.sin(np.pi * u) ** .8) for u in np.linspace(0, 1, 24)]
            return np.array(top + bot)
        out["closed"] = img.copy()
        out["half"] = draw_open(noM, spoly, 7, False)
        out["wide"] = draw_open(noM, spoly, 11, True)
    else:
        out["closed"] = img.copy()
    # blink: every state gets a blink twin (the eyes in-painted, two closed-lid arcs)
    emask = np.zeros(a.shape, np.uint8)
    for e in eyes:
        m = (lab == e["i"]).astype(np.uint8); h = cv2.convexHull(cv2.findNonZero(m)); cv2.fillPoly(emask, [h], 1)
    emask = cv2.dilate(emask, np.ones((5, 5), np.uint8), iterations=2)
    for k in list(out):
        b = inpaint(out[k], emask * 255, 7)
        for e in eyes:
            cx, cy, w = e["x"] + e["w"] / 2, e["y"] + e["h"] * (.6 if name == "droop" else .55), e["w"] * .8
            sag = 5 if name == "droop" else 7   # tall / tall_happy / hop: a happy arc   # a closed eye: a soft downward arc (a happy curve when tall)
            curve = [(cx - w / 2 + w * u, cy + (sag if name in ("tall", "tall_happy", "hop_a") else sag * .6) * np.sin(np.pi * u)) for u in np.linspace(0, 1, 20)]
            b = draw_line(b, curve)
        out[k + "_blink"] = b
    fx0 = min(e["x"] for e in eyes) - 10; fx1 = max(e["x"] + e["w"] for e in eyes) + 10
    fy0 = min(e["y"] for e in eyes) - 26; fy1 = mouth["y"] + mouth["h"] + 14
    return out, pot, [float(fx0), float(fy0), float(fx1 - fx0), float(fy1 - fy0)]

meta = {}; os.makedirs(f"{H}/cut", exist_ok=True)
for f, poses in PAIRS.items():
    src = f"{T}/{f}.jpg"
    if not os.path.exists(src): src = f"{T}/{f}.png"
    if not os.path.exists(src): continue
    full = cv2.imread(src); Hh, Ww = full.shape[:2]
    for side, name in enumerate(poses):
        img = full[:, side * Ww // 2: (side + 1) * Ww // 2].copy()
        cut = cutout(img, T=CUT_T.get(name, 175)); a = cut[..., 3]
        sts, pot, face = states(name, img, a)
        ys, xs = np.where(pot > 0)
        rows = [r for r in range(ys.min(), ys.min() + int(.3 * (ys.max() - ys.min())))]
        rimw = max((np.ptp((pot[r] > 0).nonzero()[0]) if pot[r].any() else 0) for r in rows)
        rimr = max(rows, key=lambda r: np.ptp((pot[r] > 0).nonzero()[0]) if pot[r].any() else 0)
        rx = (pot[rimr] > 0).nonzero()[0]; ox = (rx.min() + rx.max()) / 2
        bot = np.where(a.max(1) > 128)[0][-1]
        yy, xx = np.where(a > 128); x0, x1, y0, y1 = xx.min() - 6, xx.max() + 7, yy.min() - 6, bot + 7
        for st, im in sts.items():
            o = cut.copy(); o[..., :3] = np.where(a[..., None] > 0, im, cut[..., :3]); cv2.imwrite(f"{H}/cut/chilli_{name}_{st}.png", o[y0:y1, x0:x1])
        meta[name] = dict(src=os.path.relpath(src, H), w=int(x1 - x0), h=int(y1 - y0), ox=float(ox - x0), oy=float(bot - y0), rim=float(rimw),
                          scale=RIM_LOCAL / float(rimw), states=sorted(sts), face=[face[0] - x0, face[1] - y0, face[2], face[3]])
        print(name, {k: (round(v, 3) if isinstance(v, float) else v) for k, v in meta[name].items()})

def make_hop_b():
    """chilli_hop_b (in the air), made from the teacher's hop_a (landing) as asked (27 Nov): the dust puffs erased (only the plant-and-pot
    blob kept), the whole frame un-squashed from the base (7% taller, 5% narrower), the ORIGINAL face pasted back unscaled at the face's new
    centre (the face stays identical), and the drooping leaf mass above the rim stretched upwards by 8% from the rim (the leaves flick up,
    the stem stays joined). Its origin is the base centre like hop_a; the episode lifts it off the ground."""
    if "hop_a" not in meta: return
    m = meta["hop_a"]; im = cv2.imread(f"{H}/cut/chilli_hop_a_closed.png", -1); a = im[..., 3]
    n, lab, st, _ = cv2.connectedComponentsWithStats((a > 20).astype(np.uint8)); i = 1 + np.argmax(st[1:, 4])
    keep = cv2.dilate((lab == i).astype(np.uint8), np.ones((3, 3), np.uint8)); im = im.copy(); im[keep == 0] = 0
    hgt, wid = im.shape[:2]; ox, oy = m["ox"], m["oy"]; SX, SY = .95, 1.07
    pad = 60; big = np.zeros((hgt + pad, wid, 4), np.uint8); big[pad:] = im; oy2 = oy + pad
    M = np.float32([[SX, 0, ox * (1 - SX)], [0, SY, oy2 * (1 - SY)]])
    un = cv2.warpAffine(big, M, (wid, hgt + pad), flags=cv2.INTER_CUBIC, borderValue=(0, 0, 0, 0))
    fx, fy, fw, fh = m["face"]; fy2 = fy + pad; cxo, cyo = fx + fw / 2, fy2 + fh / 2
    ncx, ncy = ox + (cxo - ox) * SX, oy2 + (cyo - oy2) * SY
    patch = big[int(fy2): int(fy2 + fh), int(fx): int(fx + fw)].astype(np.float32)
    feather = np.zeros(patch.shape[:2], np.float32); cv2.ellipse(feather, (int(fw / 2), int(fh / 2)), (int(fw / 2 - 6), int(fh / 2 - 4)), 0, 0, 360, 1, -1)
    feather = cv2.GaussianBlur(feather, (0, 0), 4)[..., None]
    x0, y0 = int(round(ncx - fw / 2)), int(round(ncy - fh / 2)); reg = un[y0: y0 + patch.shape[0], x0: x0 + patch.shape[1]].astype(np.float32)
    un[y0: y0 + patch.shape[0], x0: x0 + patch.shape[1]] = (reg * (1 - feather) + patch * feather).round().astype(np.uint8)
    pot = pot_mask(un[..., :3], un[..., 3]); rim = int(np.where(pot.any(1))[0].min())
    ys = np.arange(hgt + pad, dtype=np.float32); mapy = np.where(ys < rim, rim - (rim - ys) / 1.08, ys)   # above the rim: an upward stretch from the rim
    mx_, my_ = np.meshgrid(np.arange(wid, dtype=np.float32), mapy)
    out = cv2.remap(un, mx_, my_, cv2.INTER_CUBIC, borderValue=(0, 0, 0, 0))
    al = out[..., 3]; yy, xx = np.where(al > 128); y0b, y1b = max(0, yy.min() - 6), yy.max() + 7
    out = out[y0b:y1b]; cv2.imwrite(f"{H}/cut/chilli_hop_b_closed.png", out)
    meta["hop_b"] = dict(src="made from hop_a (cut_chilli.make_hop_b)", w=int(out.shape[1]), h=int(out.shape[0]), ox=float(ox), oy=float(oy2 - y0b),
                         rim=m["rim"], scale=m["scale"], states=["closed"], face=[float(x0), float(y0 - y0b), float(fw), float(fh)])
    print("hop_b", meta["hop_b"]["w"], meta["hop_b"]["h"])
make_hop_b()
json.dump(meta, open(f"{H}/cut/chilli.json", "w"), indent=1)
