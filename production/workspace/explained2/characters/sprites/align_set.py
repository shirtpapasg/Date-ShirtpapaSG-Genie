"""align_set.py: align.py made reusable. One talking/blink sprite set per CONFIG entry (the coloured buddies from EP14).
  /home/user/heart-tts/venv/bin/python align_set.py basil_c            -> basil_c_sit_*.png, basil_c_sit.json, qa/basil_c_*.png
  /home/user/heart-tts/venv/bin/python align_set.py basil_c --grid     -> qa/<set>_grid_*.png only (to measure eyes, mouth zones, lids)
The grey sets are NOT built here (align.py = grey Basil, patch_aligned.py = grey Pip/Momo) and nothing they wrote is touched.

Same method as align.py (read its docstring), with the per-set numbers moved into CONFIG:
 0. NORMALISE: every painting is cut out (cutout.py) at its own size; the base (mouth closed) is resampled ONCE onto a 1024 canvas so
    its body height (feet to top of head) is `body_h` px with the feet on `ground_y`, the grey sets' pixel scale (grey Basil: 791 px,
    feet at 917). Each variant gets a rough bbox pre-fit to the base; that pre-fit is folded into its final fit, so a variant is
    also resampled only once.
 1. BODY fit (report only) and HEAD fit: SIFT below / above the neck line; the head fit is refined so both eye centres land on the
    base's eye centres (template match per eye).
 2. MOUTH patch (half, wide): the closed path around the mouth where base and fitted variant differ least (shortest path, polar),
    kept off the eyes and inside `allow`; edge registration, membrane colour blend, 2 px feather. Outside the patch: the base, bit for bit.
 3. BLINK patch: only the two lids of the eyes-closed painting, each with its own small fit (LIDS) over the base eye ellipse.
All coordinates in CONFIG are in the NORMALISED base frame (what basil_c_sit_closed.png shows); read them off qa/<set>_grid_*.png.
A source missing from disk falls back to `fallback` (e.g. a quadrant of a sheet, upscaled): swap in a full-size painting by putting it
at the main path and re-running."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); S = 1024
sys.path.insert(0, H); from cutout import cutout, on
QA_BG = (0x8C, 0x2A, 0x3B)

EYES_MOMO_C = {"L": dict(c=(0, 0), r=(1, 1), ang=0), "R": dict(c=(0, 0), r=(1, 1), ang=0)}; NECK_MOMO_C = 420
LIDS_MOMO_C = {}; DRAWN_MOMO_C = {}
CONFIG = {
  "basil_c": dict(
    src={"closed": "poses_inbox/basil_c_sit_closed.jpg", "half": "poses_inbox/basil_c_sit_half.jpg",
         "wide": "poses_inbox/basil_c_sit_wide.jpg", "blink": "poses_inbox/basil_c_sit_blink.jpg"},
    fallback={"half": dict(file="poses_inbox/basil_c_sheet_sit_cheer.jpg", crop=(512, 0, 1024, 450), up=2.0)},
    body_h=791, ground_y=917, centre_x=491,          # grey Basil: bbox 93..889 x 127..917
    eyes={"L": dict(c=(563, 259), r=(60, 62), ang=0), "R": dict(c=(795, 229), r=(31, 52), ang=0)},
    neck_y=470,
    mouth={"half": dict(centre=(680, 370), inner=[(522, 352), (560, 350), (640, 345), (720, 330), (790, 318), (832, 298), (848, 305), (840, 340),
                                                 (800, 375), (730, 402), (650, 405), (580, 390), (535, 370)]),
           "wide": dict(centre=(680, 375), inner=[(518, 350), (560, 345), (640, 335), (720, 320), (800, 305), (838, 296), (852, 305), (845, 350),
                                                 (800, 395), (730, 425), (650, 428), (580, 410), (530, 375)])},
    allow=[(440, 300), (620, 300), (700, 290), (760, 285), (1000, 240), (1000, 560), (800, 520), (620, 500), (470, 470), (420, 400)],
    jaw_band=[(800, 260), (1000, 260), (1000, 470), (800, 470)], seam_r=330,
    lids={"L": dict(src=(563, 259), dst=(563, 259), sx=1.0, sy=1.0, rot=0, grow=4), "R": dict(src=(795, 229), dst=(795, 229), sx=1.0, sy=1.0, rot=0, grow=4)},
    lid_inset=6,
    # anchors for talk_render.py / poses.py, read off the normalised base (the hips' y is filled in from the feet line):
    # hips x = body centre (poses.body_cx, 622) + the same +6 px grey Basil's hips have; the coloured beard hangs ~25 px lower
    # than grey Basil's chin fur, so the neck pivot and its blend band sit lower; the tail tip stays left of head_xmin
    anchors=dict(hips=[628, None], neck=[650, 495], neck_band=[455, 522], head_xmin=[375, 395],
                 tail=dict(root=[450, 790], xband=[450, 340], ymin=[415, 455])),
  ),
  # Momo in colour (coral): her talking base is the ARMS-CROSSED painting (teacher, 22 Nov). Only closed + blink are painted so far;
  # half / wide are a SMALL DRAWN MOUTH (drawn_mouth below: an opening under her own "w" smile; the rulebook's one-face fallback,
  # SERIES_FORMAT 6 "Talking") until the teacher paints them: then add them to `states` / `src` and re-run (the drawn ones are replaced).
  "momo_c": dict(
    states=("blink",),
    src={"closed": "poses_inbox/momo_c_talk_closed.jpg", "blink": "poses_inbox/momo_c_talk_blink.jpg"},
    fallback={},
    body_h=807, ground_y=851, centre_x=560,          # grey Momo: bbox 236..885 x 44..851 (the same pixel scale and feet line)
    eyes=EYES_MOMO_C, neck_y=NECK_MOMO_C,
    mouth={}, allow=[], jaw_band=None, seam_r=0,
    lids=LIDS_MOMO_C, lid_inset=6,
    drawn_mouth=DRAWN_MOMO_C,
    anchors=dict(hips=[None, None], hips_dx=6),       # hips x = body centre + 6 (grey Momo: 650 vs 644.5); talk_render anchors not set
  ),
}

# ---------------------------------------------------------------------------------------------------------------- helpers
def pm(im):
    f = im.astype(np.float32) / 255; f[..., :3] *= f[..., 3:]; return f
def unpm(f):
    f = np.clip(f, 0, 1); a = f[..., 3:]; rgb = np.where(a > 1e-4, f[..., :3] / np.maximum(a, 1e-4), 0)
    return (np.dstack([np.clip(rgb, 0, 1), a]) * 255).round().astype(np.uint8)
def warp(f, M, flags=cv2.INTER_CUBIC): return np.clip(cv2.warpAffine(f, np.float32(M), (S, S), flags=flags), 0, 1)
def white(im): a = im[..., 3:] / 255.; return (im[..., :3] * a + 255 * (1 - a)).astype(np.uint8)
def grayw(im): return cv2.cvtColor(white(im), cv2.COLOR_BGR2GRAY)
def sim_info(M): return float(np.hypot(M[0, 0], M[1, 0])), float(np.degrees(np.arctan2(M[1, 0], M[0, 0])))
def h3(M): return np.vstack([np.float64(M), [0, 0, 1]])
def compose(A, B): return (h3(A) @ h3(B))[:2].astype(np.float32)          # A after B
def bbox(alpha, t=128):
    ys, xs = np.where(alpha > t); return int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())
def ell_mask(c, r, ang, grow=0):
    m = np.zeros((S, S), np.uint8); cv2.ellipse(m, (int(c[0]), int(c[1])), (int(r[0] + grow), int(r[1] + grow)), ang, 0, 360, 255, -1, cv2.LINE_AA); return m
def poly(pts): m = np.zeros((S, S), np.uint8); cv2.fillPoly(m, [np.int32(pts)], 255); return m > 0

sift = cv2.SIFT_create(4000, contrastThreshold=0.02)
def sift_sim(V, B, y0, y1):
    gV, gB = grayw(V), grayw(B)
    mB = np.zeros((S, S), np.uint8); mB[y0:y1] = 255; mB[B[..., 3] == 0] = 0
    mV = np.zeros((S, S), np.uint8); mV[max(0, y0 - 40):y1 + 60] = 255; mV[V[..., 3] == 0] = 0
    ka, da = sift.detectAndCompute(gV, mV); kb, db = sift.detectAndCompute(gB, mB)
    good = [a for a, b in cv2.BFMatcher().knnMatch(da, db, k=2) if a.distance < .8 * b.distance]
    pa = np.float32([ka[g.queryIdx].pt for g in good]); pb = np.float32([kb[g.trainIdx].pt for g in good])
    M, inl = cv2.estimateAffinePartial2D(pa, pb, method=cv2.RANSAC, ransacReprojThreshold=4, maxIters=5000)
    return M, int(inl.sum()), len(good)

def eye_fit(V, B, M0, EYES):
    """refine the head fit: find each base eye in the roughly fitted variant, return the similarity through both eye centres"""
    gB = grayw(B).astype(np.float32); gW = grayw(unpm(warp(pm(V), M0))).astype(np.float32); src, dst = [], []
    for k, e in EYES.items():
        cx, cy = e["c"]; rx, ry = e["r"]; x0, x1, y0, y1 = cx - rx - 8, cx + rx + 8, cy - ry - 8, cy + ry + 8
        tpl = gB[y0:y1, x0:x1]; best = (-2, 0, 0, 1)
        for sc in np.arange(.92, 1.09, .02):
            t = cv2.resize(tpl, None, fx=sc, fy=sc, interpolation=cv2.INTER_AREA); pad = 40
            reg = gW[max(0, y0 - pad):y1 + pad, max(0, x0 - pad):x1 + pad]; ox, oy = max(0, x0 - pad), max(0, y0 - pad)
            if t.shape[0] >= reg.shape[0] or t.shape[1] >= reg.shape[1]: continue
            res = cv2.matchTemplate(reg, t, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(res)
            if mx > best[0]: best = (mx, ox + loc[0] + t.shape[1] / 2, oy + loc[1] + t.shape[0] / 2, sc)
        Mi = cv2.invertAffineTransform(np.float32(M0)); p = Mi @ np.array([best[1], best[2], 1.0])
        src.append(p); dst.append(((x0 + x1) / 2, (y0 + y1) / 2)); print(f"    eye {k}: score {best[0]:.3f} scale {best[3]:.2f} off {best[1] - (x0 + x1) / 2:+.1f},{best[2] - (y0 + y1) / 2:+.1f}")
    (a, b), (c, d) = src, dst; va = complex(*(b - a)); vb = complex(d[0] - c[0], d[1] - c[1]); z = vb / va
    t = complex(*c) - z * complex(*a)
    return np.float32([[z.real, -z.imag, t.real], [z.imag, z.real, t.imag]])

def membrane(base, var, mask, iters=3000):
    """var's COLOUR corrected so it meets base on the mask edge (Laplace(d)=0 inside, d = base-var on the edge, only where both solid)"""
    ys, xs = np.where(mask); y0, y1, x0, x1 = ys.min() - 2, ys.max() + 3, xs.min() - 2, xs.max() + 3
    def col(f): return f[..., :3] / np.maximum(f[..., 3:], 1e-3)
    b, v = base[y0:y1, x0:x1], var[y0:y1, x0:x1]; m = mask[y0:y1, x0:x1]
    both = (np.minimum(b[..., 3], v[..., 3]) > .98).astype(np.float32)
    both = cv2.erode(both, np.ones((3, 3), np.uint8), iterations=2)[..., None]
    d = (col(b) - col(v)) * both; d = cv2.GaussianBlur(d, (0, 0), 1.2); fixed = d.copy()
    w = (~m).astype(np.float32); g = cv2.GaussianBlur(d * w[..., None], (0, 0), 25) / np.maximum(cv2.GaussianBlur(w, (0, 0), 25), 1e-4)[..., None]
    d[m] = g[m]
    for _ in range(iters):
        n = (np.roll(d, 1, 0) + np.roll(d, -1, 0) + np.roll(d, 1, 1) + np.roll(d, -1, 1)) / 4
        d = np.where(m[..., None], n, fixed)
    c = np.clip(col(v) + d, 0, 1); res = np.dstack([c * v[..., 3:], v[..., 3]])
    out = base.copy(); out[y0:y1, x0:x1] = np.where(m[..., None], res, b); return out

def edge_register(base, var, mask, reach=34, maxpx=9):
    """nudge var (smooth small warp, full strength on the patch edge, none `reach` px inside) so it lines up with base along the edge"""
    def g(f): return np.clip((f[..., :3] @ np.float32([.114, .587, .299]) + .45 * (1 - f[..., 3])) * 255, 0, 255).astype(np.uint8)
    dis = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM); dis.setFinestScale(1)
    flow = dis.calc(g(base), g(var), None)
    mag = np.linalg.norm(flow, axis=2, keepdims=True); flow = flow * np.minimum(1, maxpx / np.maximum(mag, 1e-3))
    flow = cv2.GaussianBlur(flow, (0, 0), 5)
    din = cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5)
    w = np.clip(1 - din / reach, 0, 1); w = (w * w * (3 - 2 * w))[..., None]
    yy, xx = np.mgrid[0:S, 0:S].astype(np.float32); mp = np.dstack([xx, yy]) + flow * w
    return np.clip(cv2.remap(var, mp[..., 0], mp[..., 1], cv2.INTER_CUBIC), 0, 1)

def feather(mask, px=2.0):
    k = int(round(px * 2)); er = cv2.erode(mask.astype(np.uint8), np.ones((2 * k + 1, 2 * k + 1), np.uint8)).astype(np.float32)
    return np.clip(cv2.GaussianBlur(er, (0, 0), px), 0, 1) * mask

def seam_mask(base, var, inner, forbid, centre, R=330, nth=900):
    """closed path around `centre` between `inner` (inside) and `forbid` (outside) where base and var differ least"""
    diff = np.abs(base - var).sum(2); diff = cv2.GaussianBlur(diff, (0, 0), 1.5) + .004
    cx, cy = centre; th = np.linspace(0, 2 * np.pi, nth, endpoint=False)
    rr = np.arange(8, R); X = cx + np.outer(np.cos(th), rr); Y = cy + np.outer(np.sin(th), rr)
    Xi, Yi = np.clip(X.round().astype(int), 0, S - 1), np.clip(Y.round().astype(int), 0, S - 1)
    C = diff[Yi, Xi].astype(np.float64); inn = inner[Yi, Xi]; forb = forbid[Yi, Xi] | (X < 1) | (Y < 1) | (X > S - 2) | (Y > S - 2)
    lo = np.array([(np.where(row)[0].max() + 1) if row.any() else 0 for row in inn])
    hi = np.array([(np.where(row)[0].min() - 1) if row.any() else len(rr) - 1 for row in forb])
    BIG = 1e6
    for i in range(nth):
        if hi[i] < lo[i]: m_ = (lo[i] + hi[i]) // 2; lo[i] = hi[i] = max(0, m_)
        C[i, :lo[i]] = BIG; C[i, hi[i] + 1:] = BIG
    C *= (rr / 100.0)[None, :] ** .5
    K = 3
    def run(start_r=None):
        D = C[0].copy()
        if start_r is not None: D = np.full(len(rr), BIG * 10); D[start_r] = C[0, start_r]
        back = np.zeros((nth, len(rr)), np.int16)
        for i in range(1, nth):
            best = np.full(len(rr), np.inf); arg = np.zeros(len(rr), np.int16)
            for k in range(-K, K + 1):
                sh = np.roll(D, k) + abs(k) * .002
                if k > 0: sh[:k] = np.inf
                if k < 0: sh[k:] = np.inf
                better = sh < best; best[better] = sh[better]; arg[better] = -k
            D = best + C[i]; back[i] = arg
        return D, back
    D, back = run(); r_end = int(np.argmin(D)); D, back = run(r_end)
    cand = [r for r in range(max(0, r_end - K), min(len(rr), r_end + K + 1))]; r = min(cand, key=lambda q: D[q]); path = [r]
    for i in range(nth - 1, 0, -1): r = r + back[i][r]; path.append(r)
    path = np.array(path[::-1]); pts = np.stack([cx + np.cos(th) * rr[path], cy + np.sin(th) * rr[path]], 1)
    return poly(pts), pts, float(diff[np.clip(pts[:, 1].round().astype(int), 0, S - 1), np.clip(pts[:, 0].round().astype(int), 0, S - 1)].mean())

def drawn_mouth(B, d):
    """a small open mouth DRAWN under the painted closed smile (no painted half / wide yet): an opening that hangs from the middle of
    the smile, outlined in the painting's own line colour, dark inside with a pink tongue. Returns (premultiplied image, (mask, pts)).
    d: centre (x, y) of the opening's top, half-width w, depth h, line colour (BGR), the line width."""
    Z = 4; cx, cy = d["c"]; w, h = d["w"], d["h"]; big = np.zeros((S * 0 + 1, 1), np.uint8)
    x0, y0 = int(cx - w - 12), int(cy - 12); x1, y1 = int(cx + w + 12), int(cy + h + 12); W, Hh = (x1 - x0) * Z, (y1 - y0) * Z
    t = np.linspace(0, np.pi, 60); top = [(cx + w * np.cos(a), cy + .18 * h * np.sin(a) * 0) for a in np.linspace(0, np.pi, 2)]
    # the opening: a flat top along the smile, a rounded bottom (half an ellipse)
    pts = [(cx + w * np.cos(a), cy + h * np.sin(a)) for a in np.linspace(0, np.pi, 60)] + [(cx - w, cy - 1), (cx + w, cy - 1)]
    P = np.int32([((x - x0) * Z, (y - y0) * Z) for x, y in pts])
    fill = np.zeros((Hh, W), np.uint8); cv2.fillPoly(fill, [P], 255, cv2.LINE_AA)
    tong = np.zeros((Hh, W), np.uint8); cv2.ellipse(tong, (int((cx - x0) * Z), int((cy + h * .95 - y0) * Z)), (int(w * .62 * Z), int(h * .55 * Z)), 0, 0, 360, 255, -1, cv2.LINE_AA)
    tong = cv2.bitwise_and(tong, fill)
    line = np.zeros((Hh, W), np.uint8); cv2.polylines(line, [P], True, 255, int(d["lw"] * Z), cv2.LINE_AA)
    def down(m): return cv2.resize(m, (x1 - x0, y1 - y0), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
    f, tg, ln = down(fill), down(tong), down(line)
    out = B.copy(); reg = out[y0:y1, x0:x1]
    def lay(reg, a, bgr):
        c = np.float32(bgr)[::-1][::-1] / 255; a = a[..., None]; reg[..., :3] = reg[..., :3] * (1 - a) + c * a * reg[..., 3:]; return reg
    reg = lay(reg, f, d["inside"]); reg = lay(reg, tg, d["tongue"]); reg = lay(reg, ln, d["line"]); out[y0:y1, x0:x1] = reg
    m = np.zeros((S, S), bool); m[y0:y1, x0:x1] = (np.maximum(f, ln) > 0)
    return out, (m, np.float32(pts))

# ---------------------------------------------------------------------------------------------------------------- sources
def read_src(cfg, s):
    """the painting for state s (BGR, its own size) and the factor it was enlarged by (1 unless it came from a small fallback)"""
    p = f"{H}/{cfg['src'][s]}"
    if os.path.exists(p): print(f"  {s}: {cfg['src'][s]}"); return cv2.imread(p), 1.0
    fb = cfg["fallback"][s]; im = cv2.imread(f"{H}/{fb['file']}"); x0, y0, x1, y1 = fb["crop"]
    im = cv2.copyMakeBorder(im[y0:y1, x0:x1], 12, 12, 12, 12, cv2.BORDER_CONSTANT, value=(255, 255, 255))
    im = cv2.resize(im, None, fx=fb["up"], fy=fb["up"], interpolation=cv2.INTER_LANCZOS4)
    print(f"  {s}: FALLBACK {fb['file']} crop {fb['crop']} x{fb['up']} (softer)"); return im, fb["up"]

def cut_to_canvas(im, M):
    """cut out at the painting's own size, then ONE premultiplied resample onto the SxS canvas"""
    c = cutout(im); return warp(pm(c), M), c

def prefit(alpha_src, Bbox):
    """scale + shift that puts this painting's bbox (height, feet line, centre) on the base's"""
    x0, y0, x1, y1 = bbox(alpha_src); bx0, by0, bx1, by1 = Bbox; s = (by1 - by0) / (y1 - y0)
    return np.float32([[s, 0, (bx0 + bx1) / 2 - s * (x0 + x1) / 2], [0, s, by1 - s * y1]])

# ---------------------------------------------------------------------------------------------------------------- build
def grid(im8, step=20, box=None, z=2):
    o = on(im8, QA_BG).copy(); x0, y0, x1, y1 = box or (0, 0, S, S); o = cv2.resize(o[y0:y1, x0:x1], None, fx=z, fy=z, interpolation=cv2.INTER_CUBIC)
    for x in range((x0 // step + 1) * step, x1, step):
        c = (0, 255, 255) if x % 100 == 0 else (110, 110, 110); X = (x - x0) * z; cv2.line(o, (X, 0), (X, o.shape[0]), c, 1)
        if x % 100 == 0: cv2.putText(o, str(x), (X + 2, 14), 0, .45, (0, 255, 255), 1)
    for y in range((y0 // step + 1) * step, y1, step):
        c = (0, 255, 255) if y % 100 == 0 else (110, 110, 110); Y = (y - y0) * z; cv2.line(o, (0, Y), (o.shape[1], Y), c, 1)
        if y % 100 == 0: cv2.putText(o, str(y), (2, Y - 2), 0, .45, (0, 255, 255), 1)
    return o

def build(name, grid_only=False):
    cfg = CONFIG[name]; os.makedirs(f"{H}/qa", exist_ok=True); os.makedirs(f"{H}/work/{name}", exist_ok=True)
    EYES = cfg["eyes"]; NECK_Y = cfg["neck_y"]
    # 0. the base, normalised to the grey scale (one resample)
    im, _ = read_src(cfg, "closed"); c = cutout(im); x0, y0, x1, y1 = bbox(c[..., 3], 0); s = cfg["body_h"] / (y1 - y0)   # alpha > 0, as the json bbox
    N = np.float32([[s, 0, cfg["centre_x"] - s * (x0 + x1) / 2], [0, s, cfg["ground_y"] - s * y1]])
    B = warp(pm(c), N); B[B[..., 3] < 1 / 255] = 0; B8 = unpm(B); B = pm(B8)
    print(f"base: painting body height {y1 - y0} px -> x{s:.4f} -> {bbox(B8[..., 3])}")
    cv2.imwrite(f"{H}/work/{name}/closed.png", B8)
    V = {}; Mpre = {}; src = {}; STATES = cfg.get("states", ("half", "wide", "blink"))
    for st in STATES:
        im, up = read_src(cfg, st); c = cutout(im); src[st] = pm(c)
        Mpre[st] = prefit(c[..., 3], bbox(B8[..., 3])); V[st] = unpm(warp(src[st], Mpre[st]))
        cv2.imwrite(f"{H}/work/{name}/{st}_prefit.png", V[st])
    if grid_only:
        hb = (300, 0, 1000, 560)
        cv2.imwrite(f"{H}/qa/{name}_grid_closed.png", grid(B8, box=hb, z=2))
        for st in V: cv2.imwrite(f"{H}/qa/{name}_grid_{st}_prefit.png", grid(V[st], box=hb, z=1))
        return
    meta = {"size": S, "states": {}, "fit": {}, "source": {k: cfg["src"][k] if os.path.exists(f"{H}/{cfg['src'][k]}") else cfg["fallback"][k]["file"] + " (crop, upscaled)" for k in cfg["src"]}}
    out = {"closed": B.copy()}; masks = {}
    eyes_forbid = (ell_mask(**EYES["L"], grow=3) > 0) | (ell_mask(**EYES["R"], grow=3) > 0)
    for st in STATES:
        V8 = V[st]
        Mb, ni, ng = sift_sim(V8, B8, NECK_Y, S); sc, rot = sim_info(Mb); print(f"{st}: body fit scale {sc:.3f} rot {rot:+.2f} deg, {ni}/{ng} matches (after the bbox pre-fit)")
        Mh, hi_, hg = sift_sim(V8, B8, 0, NECK_Y); sch, roth = sim_info(Mh); print(f"    head fit (SIFT) scale {sch:.3f} rot {roth:+.2f} deg, {hi_}/{hg} matches")
        meta["fit"][st] = dict(body_scale=round(float(sc * Mpre[st][0, 0]), 4), body_rot=round(float(rot), 2), body_inliers=ni, head_rot_vs_body=round(float(roth - rot), 2))
        if st != "blink":
            Me = eye_fit(V8, B8, Mh, EYES); sce, rote = sim_info(Me); print(f"    head fit (eyes)  scale {sce:.3f} rot {rote:+.2f} deg")
            W = warp(src[st], compose(Me, Mpre[st])); cv2.imwrite(f"{H}/work/{name}/{st}_headfit.png", unpm(W)); z = cfg["mouth"][st]
            inner = poly(z["inner"]); allow = poly(cfg["allow"])
            ab, av = B[..., 3] > .5, W[..., 3] > .5
            if cfg["jaw_band"]:
                band = poly(cfg["jaw_band"]); inner |= cv2.dilate(((ab ^ av) & band & allow).astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
            inner &= ~eyes_forbid
            near = cv2.dilate((ab | av).astype(np.uint8), np.ones((13, 13), np.uint8)) > 0
            forbid = ~allow | eyes_forbid | ~near
            mask, pts, cost = seam_mask(B, W, inner, forbid, z["centre"], R=cfg["seam_r"]); print(f"    seam mean difference {cost:.4f}")
            W = edge_register(B, W, mask); cv2.imwrite(f"{H}/work/{name}/{st}_headfit_reg.png", unpm(W))
            res = membrane(B, W, mask); f = feather(mask, 2.0)[..., None]
            res = res + B * (1 - res[..., 3:])
            out[st] = np.clip(B * (1 - f) + res * f, 0, 1); masks[st] = (mask, pts, inner, forbid)
        else:
            cur = B.copy(); Mh_full = compose(Mh, Mpre[st]); cv2.imwrite(f"{H}/work/{name}/blink_headfit.png", unpm(warp(src[st], Mh_full))); lidm = np.zeros((S, S), bool)
            solid = cv2.erode((B[..., 3] > .99).astype(np.uint8), np.ones((3, 3), np.uint8), iterations=cfg["lid_inset"]) > 0
            for k, L in cfg["lids"].items():
                e = EYES[k]; th = np.radians(L["rot"]); A = np.array([[L["sx"] * np.cos(th), -L["sy"] * np.sin(th)], [L["sx"] * np.sin(th), L["sy"] * np.cos(th)]])
                t = np.array(L["dst"]) - A @ np.array(L["src"]); Ml = np.float32(np.hstack([A, t[:, None]]))
                Wl = warp(src[st], compose(Ml, Mh_full)); m = (ell_mask(e["c"], e["r"], e["ang"], grow=L.get("grow", 0)) > 0) & solid & (Wl[..., 3] > .99)
                res = membrane(cur, Wl, m, iters=2500); f = feather(m, 1.5)[..., None]; cur = np.clip(cur * (1 - f) + res * f, 0, 1); lidm |= m
            out["blink"] = cur; masks["blink"] = lidm
    lid = masks["blink"]; fl = feather(lid, 1.5)[..., None]
    if cfg.get("drawn_mouth"):
        for st in ("half", "wide"): out[st], masks[st] = drawn_mouth(B, cfg["drawn_mouth"][st]); meta["source"][st] = "drawn mouth (code), stand-in"
    for st in ("half", "wide"):
        out[st + "_blink"] = np.clip(out[st] * (1 - fl) + out["blink"] * fl, 0, 1)
        ov = (masks[st][0] & cv2.dilate(lid.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0).sum(); print(f"{st}: mouth patch and lids overlap {ov} px")
    for st, f in out.items():
        im = unpm(f)
        if st != "closed":
            keep = np.ones((S, S), bool)
            for q in ("half", "wide"):
                if st.startswith(q): keep &= ~masks[q][0]
            if "blink" in st: keep &= ~lid
            im[keep] = B8[keep]
            print(f"{st}: {int((~keep).sum())} px patched ({(~keep).mean() * 100:.1f}% of the canvas); rest identical to base: {bool((im[keep] == B8[keep]).all())}")
        cv2.imwrite(f"{H}/{name}_sit_{st}.png", im)
        ys, xs = np.where(im[..., 3] > 0); meta["states"][st] = dict(file=f"{name}_sit_{st}.png", bbox=[int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())])
    ys, xs = np.where(B8[..., 3] > 0); A = json.loads(json.dumps(cfg["anchors"]))
    if A["hips"][0] is None:
        sys.path.insert(0, H); from poses import body_cx; A["hips"][0] = round(body_cx(B8[..., 3], int(ys.min()), int(ys.max())) + A.pop("hips_dx"))
    A["hips"] = [A["hips"][0], int(ys.max()) - 6]; A["ground_y"] = int(ys.max())
    meta["anchors"] = A; meta["eyes"] = EYES; json.dump(meta, open(f"{H}/{name}_sit.json", "w"), indent=1)
    np.save(f"{H}/work/{name}/seams.npy", {st: masks[st][1] for st in ("half", "wide")}, allow_pickle=True)
    np.save(f"{H}/work/{name}/lids.npy", lid)
    return out, masks

if __name__ == "__main__":
    for n in [a for a in sys.argv[1:] if not a.startswith("--")]: build(n, grid_only="--grid" in sys.argv)
