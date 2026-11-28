"""costume_bake.py (P4 EP2 v3, 28 Nov 2026): the buddies' DOCTOR COSTUMES for the Science Help Desk role-play (the teacher: "Since they
are role playing as doctors, can we give new costumes to the pet buddies?"; "complete new EP2").
Every costume sprite is baked here into spr/<who>_doc_<pose>.png ON THE SAME CANVAS as the pose it dresses (same w, h, anchor), so the
engine's face boxes, paw points, bubble layout and pose swaps work unchanged; lib.js swaps the name (<who>_<pose> -> <who>_doc_<pose>)
while window.costumeOn(t) is true. Three ways, best first:
  1. PAINTED: the teacher's doctor paintings (characters/sprites/poses/<who>_doc_{arms_crossed,pointing,surprised}.png, cut by poses.py)
     are edits of the plain pose paintings (pixel-aligned, checked by template match: 0-1 px), so they drop onto the pose's canvas as they are.
  2. PAINTED TRANSPLANT (Momo's talking set): her talking set IS her arms-crossed painting with mouth shapes, so the pixels where her doctor
     arms-crossed painting differs from her neckerchief arms-crossed painting (the coat, the head mirror, the pocket magnifier) are laid on
     each of the six talking states (the nk_talk.py method: template match, then a premultiplied "over"; the mouth rows are left alone).
  3. CODE-PAINTED (every other pose): the garment is painted over the pose's own painting: inside hand-measured garment polygons (sprite px)
     the fur is replaced by fabric (white coat / teal scrubs), shaded from the painting's own light (a soft ratio to its local mean) and
     darkened towards the garment's edges; the painting's ink lines inside the garment are kept (arm outlines, folds); a new ink line runs
     along the garment's edge (lapels, cuffs, hems, the V-neck). The head items are the teacher's PAINTED pixels, cut from a doctor painting
     (Pip's cap + goggles, Momo's head mirror) and placed by a similarity transform from two measured head landmarks (the eye centres).
     The stethoscope is drawn here (tube, binaural, chest piece) in the paintings' ink; hands and paws that hold or cover it are drawn again
     on top (redraw polygons). Basil's lab badge on these poses is lib.js's code badge (itemsOf, as before).
Run: /home/user/heart-tts/venv/bin/python costume_bake.py [names...]   (writes spr/*_doc_*.png and the manifest entries; qa/costume_*.jpg)
"""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); O = f"{H}/spr"; POSES = f"{H}/../characters/sprites/poses"; K = .75
src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")])
INK = {"pip": (86, 62, 58), "momo": (46, 30, 42), "basil": (66, 52, 30)}          # BGR: each painting's own outline colour (sampled)
INKV = {"pip": 105, "momo": 80, "basil": 82}                                      # value below which a pixel is an ink line (kept)
FAB = {  # BGR light / mid / shade: sampled on the teacher's doctor paintings (white coat; Pip's teal scrubs)
    "coat": ((247, 245, 241), (229, 228, 222), (196, 196, 186)),
    "scrubs": ((178, 184, 92), (158, 160, 74), (112, 108, 50))}

def rd(name): return cv2.imread(f"{H}/{M[name]['file']}" if name in M else f"{O}/{name}.png", -1)   # the manifest's file (momo_sit_* -> momo_nkt_sit_*)
def fpoly(shape, polys, val=255):
    m = np.zeros(shape[:2], np.uint8)
    for p in polys:
        if p and p[0] == "E": cv2.ellipse(m, (int(p[1]), int(p[2])), (int(p[3]), int(p[4])), p[5] if len(p) > 5 else 0, 0, 360, val, -1, cv2.LINE_AA)
        else: cv2.fillPoly(m, [np.array(p, np.int32)], val, cv2.LINE_AA)
    return m
def over(dst, srcrgba, a=None):
    """premultiplied over: srcrgba on dst (both float32 RGBA 0-255); a = extra coverage 0-1"""
    sa = srcrgba[..., 3:] / 255. * (1 if a is None else a[..., None]); da = dst[..., 3:] / 255.; oa = sa + da * (1 - sa)
    dst[..., :3] = (srcrgba[..., :3] * sa + dst[..., :3] * da * (1 - sa)) / np.maximum(oa, 1e-6); dst[..., 3:] = oa * 255; return dst

def keepcol(I, who):
    """pixels a garment never covers, by colour: Basil's bright crest spines, Momo's teal neckerchief and gold medal"""
    Hs = cv2.cvtColor(I[..., :3], cv2.COLOR_BGR2HSV).astype(np.int32); h, s, v = Hs[..., 0], Hs[..., 1], Hs[..., 2]
    if who == "basil": k = (h > 74) & (h < 96) & (s > 120) & (v > 90)
    elif who == "momo": k = ((h > 70) & (h < 100) & (s > 60)) | ((h > 18) & (h < 32) & (s > 120) & (v > 150))
    else: k = np.zeros(h.shape, bool)
    k = cv2.morphologyEx(k.astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)); return cv2.GaussianBlur(k.astype(np.float32), (0, 0), .8)

def garment(I, who, polys, holes, fab, edge_px=4.0, shade_k=.55, rim=9., keep_ink=True, edge_skip=None, colkeep=True):
    """paint fabric inside polys - holes (sprite px), over the painting I (uint8 BGRA). Returns float32 BGRA and the garment mask."""
    S = I.astype(np.float32); al = I[..., 3]
    g = (polys.astype(np.float32) if isinstance(polys, np.ndarray) else fpoly(I.shape, polys).astype(np.float32) / 255.)
    g = np.minimum(g, 1 - fpoly(I.shape, holes).astype(np.float32) / 255.) if holes else g
    g *= (al > 8)
    if colkeep: g *= 1 - keepcol(I, who)
    V = I[..., :3].max(2).astype(np.float32); L = cv2.cvtColor(I[..., :3], cv2.COLOR_BGR2GRAY).astype(np.float32)
    ink = (V < INKV[who]).astype(np.float32); ink = cv2.GaussianBlur(ink, (0, 0), .7)
    # the painting's own light: a soft ratio to its local mean (big folds and shadows show; small marks such as scales and stripes wash out)
    Lb = cv2.GaussianBlur(L, (0, 0), {"momo": 6.0, "basil": 4.0}.get(who, 3.0))   # (Momo's stripes and Basil's scales wash out)
    w = cv2.GaussianBlur((g > .5).astype(np.float32), (0, 0), 22) + 1e-3
    Lm = cv2.GaussianBlur(Lb * (g > .5), (0, 0), 22) / w; r = np.clip(Lb / np.maximum(Lm, 1), .7, 1.12)
    s = 1 - shade_k * (1 - r)                    # 1 = light
    # rim shade: towards the garment's edge and the silhouette (a rounded body)
    d = cv2.distanceTransform(((g > .5) & (al > 128)).astype(np.uint8), cv2.DIST_L2, 5); e = np.exp(-d / rim) * .55
    t = np.clip((1 - s) * 2.2 + e, 0, 1)[..., None]
    lt, md, sh = [np.array(c, np.float32) for c in FAB[fab]]
    col = np.where(t < .5, lt + (md - lt) * (t / .5), md + (sh - md) * ((t - .5) / .5))
    if keep_ink: col = col * (1 - ink[..., None]) + S[..., :3] * ink[..., None]
    out = S.copy(); gg = g[..., None]; out[..., :3] = S[..., :3] * (1 - gg) + col * gg
    # the garment's own edge: an ink line inside the silhouette (not along the silhouette, which already has one)
    gm = (g > .5).astype(np.uint8); b = cv2.morphologyEx(gm, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8)).astype(np.float32)
    inner = cv2.erode((al > 200).astype(np.uint8), np.ones((9, 9), np.uint8)).astype(np.float32)
    b *= inner
    if edge_skip: b *= 1 - fpoly(I.shape, edge_skip).astype(np.float32) / 255.
    if edge_px > 0:
        b = cv2.dilate(b, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(edge_px), int(edge_px)))); b = cv2.GaussianBlur(b, (0, 0), .8)
        inkc = np.array(INK[who], np.float32); out[..., :3] = out[..., :3] * (1 - b[..., None]) + inkc * b[..., None]
    return out, g

def line(out, who, pts, w=4., closed=False, col=None, a=1.):
    """an anti-aliased ink stroke (sprite px) on float BGRA"""
    m = np.zeros(out.shape[:2], np.uint8); P = np.array(pts, np.float32)
    if len(P) > 2 and not closed:  # a smooth curve through the points (Catmull-Rom)
        Q = []
        for i in range(len(P) - 1):
            p0, p1, p2, p3 = P[max(i - 1, 0)], P[i], P[i + 1], P[min(i + 2, len(P) - 1)]
            for u in np.linspace(0, 1, 12, endpoint=False):
                Q.append(.5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u ** 3))
        Q.append(P[-1]); P = np.array(Q, np.float32)
    cv2.polylines(m, [np.round(P * 4).astype(np.int32)], closed, 255, max(1, int(round(w))), cv2.LINE_AA, shift=2)   # (thickness is in pixels; shift only scales the points)
    k = cv2.GaussianBlur(m.astype(np.float32) / 255., (0, 0), .5)[..., None] * a
    c = np.array(col if col is not None else INK[who], np.float32); out[..., :3] = out[..., :3] * (1 - k) + c * k
    out[..., 3:] = np.maximum(out[..., 3:], k * 255); return out

def steth(out, who, tubes, piece, r=14, ear=None):
    """a stethoscope: tubes = list of point lists (the rubber tube, dark grey with an ink edge), piece = (x, y) the chest piece"""
    for T in tubes: line(out, who, T, 9, col=INK[who]); line(out, who, T, 5, col=(78, 74, 70))
    x, y = piece
    m = np.zeros(out.shape[:2], np.float32); cv2.circle(m, (int(x * 4), int(y * 4)), int((r + 3) * 4), 1., -1, cv2.LINE_AA, shift=2)
    m = m[..., None]; out[..., :3] = out[..., :3] * (1 - m) + np.array(INK[who], np.float32) * m; out[..., 3:] = np.maximum(out[..., 3:], m * 255)
    for rr, c in ((r, (196, 192, 188)), (r * .62, (232, 230, 228)), (r * .3, (170, 166, 162))):
        m = np.zeros(out.shape[:2], np.float32); cv2.circle(m, (int(x * 4), int(y * 4)), int(rr * 4), 1., -1, cv2.LINE_AA, shift=2); m = m[..., None]
        out[..., :3] = out[..., :3] * (1 - m) + np.array(c, np.float32) * m
    line(out, who, [(x - r * .5, y - r * .45), (x - r * .1, y - r * .65)], 2.2, col=(255, 255, 255), a=.9)
    return out

def redraw(out, I, polys):
    """the original painting drawn again on top inside polys (a paw over the stethoscope, a hand over a lapel)"""
    m = fpoly(I.shape, polys).astype(np.float32) / 255.; m = cv2.GaussianBlur(m, (0, 0), .8)
    return over(out, I.astype(np.float32), m)

def sim(a0, a1, b0, b1):
    """the similarity transform (2x3) that takes the segment a0-a1 onto b0-b1"""
    a0, a1, b0, b1 = [np.array(v, np.float64) for v in (a0, a1, b0, b1)]; va, vb = a1 - a0, b1 - b0
    s = np.linalg.norm(vb) / np.linalg.norm(va); th = np.arctan2(vb[1], vb[0]) - np.arctan2(va[1], va[0]); c, si = s * np.cos(th), s * np.sin(th)
    R = np.array([[c, -si], [si, c]]); t = b0 - R @ a0; return np.hstack([R, t[:, None]])

def docsprite(who, pose, base):
    """the teacher's doctor painting of <pose> on the canvas of spr <base> (same transform as new_poses.py: x .75, then the base's offset)"""
    P = cv2.imread(f"{POSES}/{who}_doc_{pose}.png", -1); B = rd(base); sb = M[base]
    Pk = cv2.resize(P, (round(P.shape[1] * K), round(P.shape[0] * K)), interpolation=cv2.INTER_AREA)
    # the plain painting it was edited from (same canvas as base, by construction); align the doctor painting on it by its lower body
    def g(I): al = I[..., 3:] / 255.; return cv2.cvtColor((I[..., :3] * al + 255 * (1 - al)).astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
    gb, gp = g(B), g(Pk); h = gp.shape[0]; tpl = gp[int(h * .78): int(h * .97), 20: -20]
    res = cv2.matchTemplate(gb, tpl, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(res); dx, dy = loc[0] - 20, loc[1] - int(h * .78)
    out = np.zeros_like(B); H_, W_ = B.shape[:2]; x0, y0 = max(0, dx), max(0, dy); x1, y1 = min(W_, dx + Pk.shape[1]), min(H_, dy + Pk.shape[0])
    out[y0:y1, x0:x1] = Pk[y0 - dy:y1 - dy, x0 - dx:x1 - dx]
    print(f"  {who}_doc_{pose}: on {base} at ({dx},{dy}) match {mx:.3f}")
    return out

def costume_layer(who, pose, plain, rows=None, minpx=400):
    """the pixels where the doctor painting differs from the plain one (spr scale, the plain painting's own canvas), as BGRA float"""
    D = docsprite(who, pose, plain).astype(np.float32); B = rd(plain).astype(np.float32)
    d = np.abs(D[..., :3] - B[..., :3]).max(2); da = np.abs(D[..., 3] - B[..., 3])
    m = ((d > 40) & (D[..., 3] > 60)) | (da > 60)
    if rows: m[rows[0]:rows[1]] = False
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8)); keep = np.zeros(m.shape, np.uint8)
    for i in range(1, n):
        if st[i, 4] > minpx: keep[lab == i] = 1
    keep = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8)); keep = cv2.dilate(keep, np.ones((3, 3), np.uint8))
    return D, cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 1.0)

def gray(I): al = I[..., 3:] / 255.; return cv2.cvtColor((I[..., :3] * al + 255 * (1 - al)).astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
def place(Z, shape, dx, dy):
    """Z (uint8/float BGRA) placed at (dx, dy) on an empty canvas of shape"""
    out = np.zeros(shape[:2] + (4,), np.float32); H_, W_ = shape[:2]; x0, y0 = max(0, dx), max(0, dy); x1, y1 = min(W_, dx + Z.shape[1]), min(H_, dy + Z.shape[0])
    if x1 > x0 and y1 > y0: out[y0:y1, x0:x1] = Z[y0 - dy:y1 - dy, x0 - dx:x1 - dx]
    return out
def plainof(who, pose):
    """the plain painting a doctor painting was edited from (spr scale): Momo's neckerchief set, Basil's v2 set, Pip's own"""
    st = {"momo": "momo_nk", "basil": "basil_v2", "pip": "pip"}[who]; P = cv2.imread(f"{POSES}/{st}_{pose}.png", -1)
    return cv2.resize(P, (round(P.shape[1] * K), round(P.shape[0] * K)), interpolation=cv2.INTER_AREA)
def transfer(target, who, pose, band=(.80, .97), same_thr=30, minpx=300, exclude=None, force=None):
    """the teacher's PAINTED costume pixels of doctor painting <pose>, moved onto <target> (uint8 BGRA, a pose painted on the same body):
    aligned by the legs, kept only where the target shows exactly what the plain painting under the costume showed (the same body there).
    Returns (doc pixels on the target canvas, coverage 0-1)."""
    P = cv2.imread(f"{POSES}/{who}_doc_{pose}.png", -1); Pk = cv2.resize(P, (round(P.shape[1] * K), round(P.shape[0] * K)), interpolation=cv2.INTER_AREA)
    Bk = plainof(who, pose); h = Pk.shape[0]; tpl = gray(Pk)[int(h * band[0]):int(h * band[1]), 30:-30]
    pd = 160; gt = np.pad(gray(target), pd, constant_values=255)   # (a doctor painting can be wider than the pose's canvas)
    res = cv2.matchTemplate(gt, tpl, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(res); dx, dy = loc[0] - 30 - pd, loc[1] - int(h * band[0]) - pd
    # the plain painting is on the doctor painting's own grid (0-1 px; align it on the doctor painting by the legs too)
    r2 = cv2.matchTemplate(gray(Bk), tpl, cv2.TM_CCOEFF_NORMED); _, _, _, l2 = cv2.minMaxLoc(r2); bx, by = l2[0] - 30, l2[1] - int(h * band[0])
    D = place(Pk, target.shape, dx, dy); B = place(Bk, target.shape, dx - bx, dy - by); T = target.astype(np.float32)
    d = np.abs(D[..., :3] - B[..., :3]).max(2); C = (((d > 40) & (D[..., 3] > 60)) | (np.abs(D[..., 3] - B[..., 3]) > 60)).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(C); C2 = np.zeros_like(C)
    for i in range(1, n):
        if st[i, 4] > minpx: C2[lab == i] = 1
    C = cv2.morphologyEx(C2, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    bl = lambda X: cv2.GaussianBlur(X, (0, 0), 1.6)
    same = ((np.abs(bl(T[..., :3]) - bl(B[..., :3])).max(2) < same_thr) & (T[..., 3] > 200) & (B[..., 3] > 200)) | ((T[..., 3] < 30) & (B[..., 3] < 30))
    same = cv2.morphologyEx(same.astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)); same = cv2.erode(same, np.ones((3, 3), np.uint8))
    A = cv2.morphologyEx((C & same).astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)); A = cv2.morphologyEx(A, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8)).astype(np.float32) * C   # no speckle, no ragged holes
    if force: A = np.maximum(A, C * fpoly(target.shape, force).astype(np.float32) / 255.)   # e.g. a cap on a head that moved a hair
    if exclude: A *= 1 - fpoly(target.shape, exclude).astype(np.float32) / 255.
    A = cv2.GaussianBlur(A, (0, 0), 1.0)
    print(f"  transfer {who}_doc_{pose} -> legs match {mx:.3f} at ({dx},{dy}), plain at ({bx},{by}), {int(A.sum())} px")
    # the costume's whole area on this body (the doctor painting's garment, holes filled), for the code fill under the painted pixels
    R = cv2.morphologyEx(C, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17)))
    ff = np.pad(R, 1).copy(); cv2.floodFill(ff, None, (0, 0), 2); R = ((ff[1:-1, 1:-1] != 2)).astype(np.float32) * (T[..., 3] > 30)
    return D, A, R

def dress(target, who, src, fab, sleeves=(), skin=(), exclude=(), force=(), cuffs=(), drop=(), states=None):
    """one pose (or a talking set: states = the six sprite names, masks from the first) dressed from doctor painting <src>:
    the code fill over the whole garment area (the doctor painting's garment on this body + sleeves - skin - drop), the painted
    pixels on top where the body is the same, the skin (paws, hands) drawn again on top, cuff lines. Returns {sprite name: BGRA}"""
    names = states or [target]; I0 = rd(names[0])
    D, A, R = transfer(I0, who, src, exclude=list(exclude) or None, force=list(force) or None)
    sh = I0.shape
    if drop: R = R * (1 - fpoly(sh, list(drop)).astype(np.float32) / 255.); A *= 1 - cv2.GaussianBlur(fpoly(sh, list(drop)).astype(np.float32) / 255., (0, 0), 1)   # no painted pixels there; the sleeves still fill
    Rm = np.maximum(R, fpoly(sh, list(sleeves)).astype(np.float32) / 255.) if sleeves else R
    sk = fpoly(sh, list(skin)).astype(np.float32) / 255. if skin else np.zeros(sh[:2], np.float32)
    if skin and who in ("pip", "basil"):   # only the paw itself, not the belly fur round it (Pip's white belly, Basil's cream belly)
        Hs = cv2.cvtColor(I0[..., :3], cv2.COLOR_BGR2HSV).astype(np.int32); h_, s_, v_ = Hs[..., 0], Hs[..., 1], Hs[..., 2]
        bel = ((v_ > 222) & (s_ < 30)) if who == "pip" else ((h_ > 12) & (h_ < 38) & (s_ < 100) & (v_ > 185))
        paw = cv2.morphologyEx((~bel).astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)); paw = cv2.morphologyEx(paw, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
        sk *= cv2.GaussianBlur(paw.astype(np.float32), (0, 0), .8)
    Rm *= 1 - sk; A *= 1 - cv2.GaussianBlur(sk, (0, 0), 1.2)
    res = {}
    for n in names:
        I = rd(n); out, _ = garment(I, who, Rm, [], fab); out = over(out, D, A)
        if skin: out = over(out, I.astype(np.float32), cv2.GaussianBlur(sk, (0, 0), .8))
        for c in cuffs: line(out, who, c, 3.4)
        res[n] = out
    return res

def plain(target, who, fab, polys, drop=(), skin=(), lines=(), extra=None, keep_ink=True):
    """a pose with no doctor painting on its body (the back views, Momo's run): the code fill only, inside measured polygons"""
    I = rd(target); out, _ = garment(I, who, polys, list(drop), fab, keep_ink=keep_ink)
    if extra: out = extra(out, I)
    if skin: out = redraw(out, I, list(skin))
    for L in lines: line(out, who, L[0], L[1] if len(L) > 1 else 3.4, col=L[2] if len(L) > 2 else None)
    return {target: out}

# ------------------------------------------------------------------------------------------------ the recipes (sprite px)
TALK = ["closed", "half", "wide", "blink", "half_blink", "wide_blink"]
def cap_back(out, I):   # Pip's teal surgical cap from behind, with the goggles' black strap round the back of his head
    m = fpoly(I.shape, [[(232, 196), (240, 140), (276, 104), (336, 90), (400, 94), (446, 120), (468, 168), (466, 200), (350, 210)]]).astype(np.float32) / 255.
    o2, _ = garment(I, "pip", m, [], "scrubs", rim=7., colkeep=False); out[:] = o2
    line(out, "pip", [(214, 214), (300, 222), (400, 218), (488, 206)], 13, col=INK["pip"]); line(out, "pip", [(214, 214), (300, 222), (400, 218), (488, 206)], 8, col=(52, 50, 56))
    return out
def band_back(out, I):  # the head mirror's dark band round the back of Momo's head
    line(out, "momo", [(150, 176), (240, 150), (330, 144), (420, 150), (506, 168)], 17, col=INK["momo"]); line(out, "momo", [(150, 176), (240, 150), (330, 144), (420, 150), (506, 168)], 11, col=(64, 62, 66))
    return out
RECIPES = {
  # --- talking sets: dressed from a doctor painting on the same body; the masks from the closed mouth, every state gets the same costume
  "basil_sit": lambda: dress(None, "basil", "arms_crossed", "coat", states=[f"basil_sit_{s}" for s in TALK],
      skin=[[(406, 466), (440, 468), (474, 478), (484, 520), (450, 550), (402, 532), (396, 500)], [(496, 450), (552, 444), (560, 492), (538, 534), (490, 518)]]),
  "pip_sit": lambda: dress(None, "pip", "pointing", "scrubs", states=[f"pip_sit_{s}" for s in TALK],
      skin=[[(470, 405), (518, 415), (530, 440), (524, 472), (505, 490), (476, 484), (466, 450)], [(598, 376), (642, 376), (650, 410), (642, 450), (604, 452), (594, 420)]]),
  # --- other poses on the same body as a doctor painting
  "basil_oops": lambda: dress("basil_oops", "basil", "arms_crossed", "coat", drop=[[(492, 350), (524, 350), (524, 400), (492, 400)]],
      sleeves=[[(498, 75), (535, 60), (556, 130), (558, 210), (548, 275), (515, 320), (470, 330), (478, 280), (506, 230), (506, 150), (500, 100)]],
      skin=[[(410, 15), (500, 15), (505, 80), (470, 95), (415, 70)], [(322, 372), (350, 380), (395, 405), (400, 450), (375, 478), (340, 470), (318, 420)]]),
  "basil_thinking": lambda: dress("basil_thinking", "basil", "arms_crossed", "coat",
      skin=[[(355, 255), (445, 250), (450, 300), (420, 330), (385, 338), (360, 320)], [(388, 350), (450, 345), (470, 370), (460, 430), (420, 442), (390, 420)]]),
  "basil_laughing": lambda: dress("basil_laughing", "basil", "arms_crossed", "coat",
      skin=[[(325, 395), (370, 398), (395, 420), (390, 468), (350, 470), (322, 440)], [(425, 395), (480, 392), (500, 420), (490, 468), (440, 468), (422, 430)]]),
  "basil_cheer": lambda: dress("basil_cheer", "basil", "surprised", "coat", drop=[[(520, 250), (626, 250), (626, 362), (520, 362)]],
      sleeves=[[(130, 200), (165, 185), (200, 215), (235, 260), (240, 330), (205, 340), (175, 290), (140, 240)], [(515, 215), (548, 195), (560, 215), (540, 270), (510, 310), (478, 300), (495, 250)]]),
  "basil_waving": lambda: dress("basil_waving", "basil", "surprised", "coat", drop=[[(520, 250), (628, 250), (628, 362), (520, 362)]],
      sleeves=[[(505, 190), (540, 180), (560, 195), (540, 250), (515, 300), (478, 300), (490, 240)]],
      skin=[[(300, 380), (360, 385), (390, 420), (380, 465), (330, 470), (295, 430)]]),
  "pip_thinking": lambda: dress("pip_thinking", "pip", "arms_crossed", "scrubs"),
  "pip_oops": lambda: dress("pip_oops", "pip", "arms_crossed", "scrubs"),
  "pip_cheer": lambda: dress("pip_cheer", "pip", "arms_crossed", "scrubs",
      sleeves=[[(220, 320), (290, 330), (340, 345), (400, 345), (460, 320), (500, 330), (520, 380), (525, 450), (470, 485), (330, 495), (220, 470), (205, 400)]],
      force=[[(170, 30), (470, 30), (470, 160), (170, 160)]]),
  "momo_thinking": lambda: dress("momo_thinking", "momo", "pointing", "coat", drop=[[(372, 300), (480, 300), (480, 520), (392, 520)]],
      sleeves=[[(372, 318), (445, 300), (470, 360), (476, 522), (402, 530), (395, 380)]],
      skin=[[(360, 245), (440, 245), (445, 300), (430, 322), (372, 322)], [(250, 430), (330, 428), (345, 470), (330, 495), (262, 495)]]),
  "momo_cheer": lambda: dress("momo_cheer", "momo", "pointing", "coat", drop=[[(392, 140), (524, 140), (524, 345), (400, 345)]],
      sleeves=[[(70, 205), (100, 185), (150, 230), (190, 280), (200, 320), (160, 330), (120, 290), (80, 245)], [(415, 210), (455, 195), (470, 215), (450, 280), (420, 330), (385, 330), (395, 270)]]),
  "momo_waving": lambda: dress("momo_waving", "momo", "pointing", "coat", drop=[[(392, 140), (524, 140), (524, 345), (400, 345)]],
      sleeves=[[(420, 205), (460, 195), (478, 215), (455, 280), (425, 330), (385, 330), (398, 270)]],
      skin=[[(262, 395), (320, 395), (345, 430), (335, 495), (285, 500), (262, 450)]]),
  # --- no doctor painting on these bodies: the code fill only
  "pip_back": lambda: plain("pip_back", "pip", "scrubs", [[(168, 300), (520, 296), (534, 500), (160, 505)]], drop=[[(0, 380), (196, 380), (205, 690), (0, 690)]], extra=cap_back),
  "momo_back": lambda: plain("momo_back", "momo", "coat", [[(175, 318), (250, 300), (338, 296), (426, 300), (500, 318), (512, 560), (498, 648), (180, 652), (166, 560)]], drop=[[(0, 440), (150, 440), (160, 704), (0, 704)]],
      lines=[[[(338, 420), (340, 646)], 3.0], [[(232, 318), (338, 340), (444, 318)], 3.4], [[(250, 420), (238, 600)], 2.4, (206, 200, 190)], [[(428, 420), (442, 600)], 2.4, (206, 200, 190)]], extra=band_back),
  "basil_back": lambda: plain("basil_back", "basil", "coat", [[(115, 280), (190, 262), (268, 256), (346, 262), (420, 280), (438, 420), (428, 562), (108, 562), (95, 420)]],
      lines=[[[(268, 380), (268, 560)], 3.0], [[(170, 278), (268, 300), (366, 278)], 3.4]], keep_ink=False),
  "momo_run_a": lambda: plain("momo_run_a", "momo", "coat", [[(212, 318), (472, 318), (492, 450), (470, 560), (232, 560), (200, 450)]]),
  "momo_run_b": lambda: plain("momo_run_b", "momo", "coat", [[(118, 318), (372, 318), (380, 440), (360, 535), (130, 535), (110, 440)]]),
}
# the doctor paintings themselves (on the plain pose's canvas) and stand-ins by emotion where no body matches
PAINTED = {"momo": ["arms_crossed", "pointing", "surprised"], "pip": ["arms_crossed", "pointing", "surprised"], "basil": ["arms_crossed", "pointing", "surprised"]}
ALIAS = {"pip_doc_squeamish": "pip_doc_surprised", "momo_doc_oops": "momo_doc_surprised"}   # squeamish / oops -> the painted alarmed face

def talk_painted(who="momo"):
    """a talking set from a doctor painting of the talking pose: the painting, with each state's own eyes and mouth (the pixels where the
    state differs from the plain painting, face rows only). Momo: her talking set IS her arms-crossed painting (momo_v2), so her doctor
    arms-crossed painting is used. Pip / Basil: when the teacher paints poses/<who>_doc_sit.png (an edit of the sit painting, cut by
    poses.py like the other doctor poses), it replaces the code-dressed talking set automatically (see __main__)."""
    if who == "momo": D = docsprite("momo", "arms_crossed", "momo_arms_crossed"); v2 = cv2.imread(f"{O}/momo_arms_crossed.png", -1)
    else: D = docsprite(who, "sit", f"{who}_sit_closed"); v2 = rd(f"{who}_sit_closed")
    ref = rd(f"{who}_sit_closed"); h_, w_ = v2.shape[:2]; tp = gray(v2)[20:int(h_ * .42), 60:w_ - 60]
    res = cv2.matchTemplate(gray(ref), tp, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(res); ox, oy = loc[0] - 60, loc[1] - 20
    print(f"  {who} talking canvas: the painting at ({ox},{oy}) match {mx:.3f}"); out = {}
    for st in TALK:
        T = rd(f"{who}_sit_{st}").astype(np.float32); P = place(v2, T.shape, ox, oy); Dc = place(D, T.shape, ox, oy)
        e = (np.abs(T[..., :3] - P[..., :3]).max(2) > 30) & (T[..., 3] > 100); fr = (60, 300) if who == "momo" else (int(.06 * h_), int(.5 * h_)); e[:oy + fr[0]] = False; e[oy + fr[1]:] = False   # the face rows only
        n, lab, stt, _ = cv2.connectedComponentsWithStats(e.astype(np.uint8)); keep = np.zeros(e.shape, np.uint8)
        for i in range(1, n):
            if stt[i, 4] > 25: keep[lab == i] = 1
        keep = cv2.dilate(keep, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))); a = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 2.0)
        out[f"{who}_sit_{st}"] = over(Dc.copy(), T, a)
    return out

def save(base, img):
    """spr/<who>_doc_<rest>.png on the base sprite's canvas; the manifest entry copies the base's geometry"""
    who, rest = base.split("_", 1); dn = f"{who}_doc_{rest}"; f = f"spr/{dn}.png"
    cv2.imwrite(f"{H}/{f}", np.clip(img, 0, 255).astype(np.uint8)); M[dn] = dict(M[base], file=f); return dn

if __name__ == "__main__":
    want = sys.argv[1:]; done = []
    jobs = [("momo_sit", talk_painted)] + [(k, v) for k, v in RECIPES.items()]
    for who in ("pip", "basil"):   # a painted doctor sit (talking) pose, when it arrives, replaces the code-dressed talking set
        if os.path.exists(f"{POSES}/{who}_doc_sit.png"): jobs = [(k, (lambda w=who: talk_painted(w)) if k == f"{who}_sit" else v) for k, v in jobs]
    for who, ps in PAINTED.items():  # likewise any other painted doctor pose replaces its recipe
        for k in list(RECIPES):
            p = k.split("_", 1)[1]
            if k.startswith(who + "_") and p != "sit" and os.path.exists(f"{POSES}/{who}_doc_{p}.png") and p not in ps: ps.append(p); jobs = [j for j in jobs if j[0] != k]
    for k, f in jobs:
        if want and k not in want: continue
        print(k); 
        for base, img in f().items(): done.append(save(base, img))
    if not want or "painted" in want:
        for who, ps in PAINTED.items():
            for p in ps: done.append(save(f"{who}_{p}", docsprite(who, p, f"{who}_{p}").astype(np.float32)))
        for a, b in ALIAS.items(): M[a] = dict(M[b])
    open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
    print(len(done), "costume sprites:", " ".join(done))
