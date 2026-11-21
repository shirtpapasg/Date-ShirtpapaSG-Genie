"""align.py: steps 2 of the sprite pipeline. Four separate paintings -> four states that differ ONLY in the face.
  /home/user/heart-tts/venv/bin/python align.py
Reads work/<state>_cut.png (cutout.py). Writes basil_sit_closed.png, _half.png, _wide.png, _blink.png (+ _half_blink, _wide_blink),
basil_sit.json (anchors, patch boxes) and QA sheets in qa/.

How:
 1. BODY fit (report + QA only): SIFT matches on the body and tail (below the neck), RANSAC similarity. It tells how far apart the
    paintings are (scale 0.97 to 1.14) and proves the bodies are the same drawing.
 2. HEAD fit (used for the patches): the head sits at a different angle on the body in each painting, so the face is fitted on
    its own: SIFT on the head first, then both eyes are located by template matching and the similarity that puts the two eye
    centres exactly on the base's eye centres is used. The eyes are what must not move when the mouth changes.
 3. MOUTH patch (half, wide): everything stays the base painting except a patch around the mouth and jaw. The patch edge is not
    drawn by hand: it is the closed path around the mouth where the two paintings differ least (a shortest-path search in polar
    coordinates, kept outside the eyes), so it crosses the outline where the two outlines meet. Inside the patch the small colour
    difference left at the edge is spread smoothly inwards (a membrane, as in Poisson blending) and the edge is feathered 2 px.
 4. BLINK patch: the eyes-closed painting has a different head, so only its two eyelids are used, each fitted over the base's
    eye (own affine fit), blended the same way. It sits clear of the mouth patch, so a blink works on every mouth state."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); S = 1024
sys.path.insert(0, H); from cutout import on

def load(s): return cv2.imread(f"{H}/work/{s}_cut.png", -1)
def pm(im):                                   # uint8 RGBA -> float premultiplied 0..1
    f = im.astype(np.float32) / 255; f[..., :3] *= f[..., 3:]; return f
def unpm(f):
    f = np.clip(f, 0, 1); a = f[..., 3:]; rgb = np.where(a > 1e-4, f[..., :3] / np.maximum(a, 1e-4), 0)
    return (np.dstack([np.clip(rgb, 0, 1), a]) * 255).round().astype(np.uint8)
def warp(f, M, flags=cv2.INTER_CUBIC): return np.clip(cv2.warpAffine(f, M, (S, S), flags=flags), 0, 1)
def white(im): a = im[..., 3:] / 255.; return (im[..., :3] * a + 255 * (1 - a)).astype(np.uint8)
def grayw(im): return cv2.cvtColor(white(im), cv2.COLOR_BGR2GRAY)
def sim_info(M): return float(np.hypot(M[0, 0], M[1, 0])), float(np.degrees(np.arctan2(M[1, 0], M[0, 0])))

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

# ---- the base's eyes (ellipses measured on the base painting: centre, radii, tilt) --------------------------------------
EYES = {"L": dict(c=(567, 266), r=(66, 72), ang=0), "R": dict(c=(802, 232), r=(35, 60), ang=0)}
NECK_Y = 470                                   # body/tail features are taken below this line, head features above

def ell_mask(c, r, ang, grow=0):
    m = np.zeros((S, S), np.uint8); cv2.ellipse(m, (int(c[0]), int(c[1])), (int(r[0] + grow), int(r[1] + grow)), ang, 0, 360, 255, -1, cv2.LINE_AA); return m

def eye_fit(V, B, M0):
    """refine the head fit: find each base eye in the roughly fitted variant, return the similarity through both eye centres"""
    gB = grayw(B).astype(np.float32); gW = grayw(unpm(warp(pm(V), M0))).astype(np.float32); src, dst = [], []
    for k, e in EYES.items():
        cx, cy = e["c"]; rx, ry = e["r"]; x0, x1, y0, y1 = cx - rx - 8, cx + rx + 8, cy - ry - 8, cy + ry + 8
        tpl = gB[y0:y1, x0:x1]; best = (-2, 0, 0, 1)
        for sc in np.arange(.92, 1.09, .02):
            t = cv2.resize(tpl, None, fx=sc, fy=sc, interpolation=cv2.INTER_AREA); pad = 40
            reg = gW[y0 - pad:y1 + pad, x0 - pad:x1 + pad]
            if t.shape[0] >= reg.shape[0] or t.shape[1] >= reg.shape[1]: continue
            res = cv2.matchTemplate(reg, t, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(res)
            if mx > best[0]: best = (mx, x0 - pad + loc[0] + t.shape[1] / 2, y0 - pad + loc[1] + t.shape[0] / 2, sc)
        # found centre is in fitted coords; take it back to the variant's own coords
        Mi = cv2.invertAffineTransform(M0); p = Mi @ np.array([best[1], best[2], 1.0])
        src.append(p); dst.append(((x0 + x1) / 2, (y0 + y1) / 2)); print(f"    eye {k}: score {best[0]:.3f} scale {best[3]:.2f} off {best[1] - (x0 + x1) / 2:+.1f},{best[2] - (y0 + y1) / 2:+.1f}")
    (a, b), (c, d) = src, dst; va = complex(*(b - a)); vb = complex(d[0] - c[0], d[1] - c[1]); z = vb / va
    t = complex(*c) - z * complex(*a)
    return np.float32([[z.real, -z.imag, t.real], [z.imag, z.real, t.imag]])

def membrane(base, var, mask, iters=3000):
    """var's COLOUR corrected so it meets base on the mask edge: solve Laplace(d)=0 inside the mask with d = base-var on the edge
    (only where both are solid: at the outline and outside it nothing is corrected, the alpha is the variant's own)"""
    ys, xs = np.where(mask); y0, y1, x0, x1 = ys.min() - 2, ys.max() + 3, xs.min() - 2, xs.max() + 3
    def col(f): return f[..., :3] / np.maximum(f[..., 3:], 1e-3)
    b, v = base[y0:y1, x0:x1], var[y0:y1, x0:x1]; m = mask[y0:y1, x0:x1]
    both = (np.minimum(b[..., 3], v[..., 3]) > .98).astype(np.float32)
    both = cv2.erode(both, np.ones((3, 3), np.uint8), iterations=2)[..., None]                # not on the antialiased rim
    d = (col(b) - col(v)) * both; d = cv2.GaussianBlur(d, (0, 0), 1.2); fixed = d.copy()      # ignore pixel-level texture
    w = (~m).astype(np.float32); g = cv2.GaussianBlur(d * w[..., None], (0, 0), 25) / np.maximum(cv2.GaussianBlur(w, (0, 0), 25), 1e-4)[..., None]
    d[m] = g[m]
    for _ in range(iters):
        n = (np.roll(d, 1, 0) + np.roll(d, -1, 0) + np.roll(d, 1, 1) + np.roll(d, -1, 1)) / 4
        d = np.where(m[..., None], n, fixed)
    c = np.clip(col(v) + d, 0, 1); res = np.dstack([c * v[..., 3:], v[..., 3]])
    out = base.copy(); out[y0:y1, x0:x1] = np.where(m[..., None], res, b); return out

def edge_register(base, var, mask, reach=34, maxpx=9):
    """nudge var (a smooth, small warp) so that along the patch edge it lines up with base: dense optical flow base->var, smoothed,
    used at full strength on the edge and fading to nothing `reach` px inside the patch, so the mouth itself is never bent"""
    def g(f): return np.clip((f[..., :3] @ np.float32([.114, .587, .299]) + .45 * (1 - f[..., 3])) * 255, 0, 255).astype(np.uint8)
    dis = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM); dis.setFinestScale(1)
    flow = dis.calc(g(base), g(var), None)
    mag = np.linalg.norm(flow, axis=2, keepdims=True); flow = flow * np.minimum(1, maxpx / np.maximum(mag, 1e-3))
    flow = cv2.GaussianBlur(flow, (0, 0), 5)
    din = cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5)                        # how deep inside the patch
    w = np.clip(1 - din / reach, 0, 1); w = (w * w * (3 - 2 * w))[..., None]
    yy, xx = np.mgrid[0:S, 0:S].astype(np.float32); mp = np.dstack([xx, yy]) + flow * w
    return np.clip(cv2.remap(var, mp[..., 0], mp[..., 1], cv2.INTER_CUBIC), 0, 1)

def feather(mask, px=2.0):
    """soft 0..1 weight that is 0 outside the mask (the blur is pulled inside)"""
    k = int(round(px * 2)); er = cv2.erode(mask.astype(np.uint8), np.ones((2 * k + 1, 2 * k + 1), np.uint8)).astype(np.float32)
    return np.clip(cv2.GaussianBlur(er, (0, 0), px), 0, 1) * mask

def poly(pts): m = np.zeros((S, S), np.uint8); cv2.fillPoly(m, [np.int32(pts)], 255); return m > 0

def seam_mask(base, var, inner, forbid, centre, nth=900):
    """closed path around `centre` between `inner` (must be inside) and `forbid` (must stay outside) where base and var differ least"""
    diff = np.abs(base - var).sum(2); diff = cv2.GaussianBlur(diff, (0, 0), 1.5) + .004
    cx, cy = centre; R = 330; th = np.linspace(0, 2 * np.pi, nth, endpoint=False)
    rr = np.arange(8, R); X = cx + np.outer(np.cos(th), rr); Y = cy + np.outer(np.sin(th), rr)
    Xi, Yi = np.clip(X.round().astype(int), 0, S - 1), np.clip(Y.round().astype(int), 0, S - 1)
    C = diff[Yi, Xi].astype(np.float64); inn = inner[Yi, Xi]; forb = forbid[Yi, Xi] | (X < 1) | (Y < 1) | (X > S - 2) | (Y > S - 2)
    lo = np.array([(np.where(row)[0].max() + 1) if row.any() else 0 for row in inn])          # first free radius after the inner zone
    hi = np.array([(np.where(row)[0].min() - 1) if row.any() else len(rr) - 1 for row in forb])  # last radius before a forbidden one
    BIG = 1e6
    for i in range(nth):
        if hi[i] < lo[i]: m_ = (lo[i] + hi[i]) // 2; lo[i] = hi[i] = max(0, m_)
        C[i, :lo[i]] = BIG; C[i, hi[i] + 1:] = BIG
    C *= (rr / 100.0)[None, :] ** .5 * 1.0                                                  # arc length grows with radius (mild)
    K = 3                                                                                  # max radius change per angle step
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
    D, back = run(); r_end = int(np.argmin(D)); D, back = run(r_end)                         # close the loop: start where it ends
    cand = [r for r in range(max(0, r_end - K), min(len(rr), r_end + K + 1))]; r = min(cand, key=lambda q: D[q]); path = [r]
    for i in range(nth - 1, 0, -1): r = r + back[i][r]; path.append(r)
    path = np.array(path[::-1]); pts = np.stack([cx + np.cos(th) * rr[path], cy + np.sin(th) * rr[path]], 1)
    return poly(pts), pts, float(diff[np.clip(pts[:, 1].round().astype(int), 0, S - 1), np.clip(pts[:, 0].round().astype(int), 0, S - 1)].mean())

# ---- mouth zones (base coordinates), read off the gridded crops in qa/ -----------------------------------------------------
MOUTH = {
  "half": dict(centre=(690, 385), inner=[(512, 338), (560, 338), (640, 335), (720, 318), (790, 305), (838, 292), (862, 300), (866, 335), (850, 385),
                                         (800, 420), (720, 432), (620, 425), (540, 395), (512, 365)]),
  "wide": dict(centre=(690, 385), inner=[(512, 335), (560, 335), (640, 322), (700, 300), (760, 293), (838, 290), (866, 298), (872, 335), (858, 395),
                                         (815, 448), (740, 468), (660, 468), (585, 440), (530, 385), (512, 362)]),
}
ALLOW = [(455, 300), (500, 352), (640, 350), (720, 320), (770, 302), (832, 286), (1000, 240), (1000, 560), (780, 540), (700, 500), (560, 495), (470, 440)]
# blink: where each closed lid is in the eyes-closed painting AFTER its rough head fit (lash centre, lash half-width), and where
# the lash should sit on the base eye
LIDS = {"L": dict(src=(577, 306), dst=(567, 308), sx=1.0, sy=1.12, rot=0), "R": dict(src=(805, 245), dst=(803, 262), sx=.9, sy=1.1, rot=0)}

LID_INSET = 6
def main():
    os.makedirs(f"{H}/qa", exist_ok=True)
    B8 = load("closed"); B = pm(B8); meta = {"size": S, "states": {}, "fit": {}}
    out = {"closed": B.copy()}; masks = {}
    eyes_forbid = (ell_mask(**EYES["L"], grow=3) > 0) | (ell_mask(**EYES["R"], grow=3) > 0)
    for s in ("half", "wide", "blink"):
        V8 = load(s); V = pm(V8)
        Mb, ni, ng = sift_sim(V8, B8, NECK_Y, S); sc, rot = sim_info(Mb); print(f"{s}: body fit scale {sc:.3f} rot {rot:+.2f} deg, {ni}/{ng} matches")
        cv2.imwrite(f"{H}/work/{s}_bodyfit.png", unpm(warp(V, Mb)))
        Mh, hi_, hg = sift_sim(V8, B8, 0, NECK_Y); sch, roth = sim_info(Mh); print(f"    head fit (SIFT) scale {sch:.3f} rot {roth:+.2f} deg, {hi_}/{hg} matches")
        meta["fit"][s] = dict(body_scale=round(sc, 4), body_rot=round(rot, 2), body_inliers=ni, head_rot_vs_body=round(roth - rot, 2))
        if s != "blink":
            Me = eye_fit(V8, B8, Mh); sce, rote = sim_info(Me); print(f"    head fit (eyes)  scale {sce:.3f} rot {rote:+.2f} deg")
            W = warp(V, Me); cv2.imwrite(f"{H}/work/{s}_headfit.png", unpm(W)); z = MOUTH[s]
            inner = poly(z["inner"]); allow = poly(ALLOW)
            band = poly([(740, 270), (1000, 270), (1000, 520), (740, 520)])                    # where the jaw outline may truly change
            ab, av = B[..., 3] > .5, W[..., 3] > .5
            inner |= cv2.dilate(((ab ^ av) & band & allow).astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
            inner &= ~eyes_forbid
            near = cv2.dilate((ab | av).astype(np.uint8), np.ones((13, 13), np.uint8)) > 0   # the path may leave the shape by 6 px, no further
            forbid = ~allow | eyes_forbid | ~near
            mask, pts, cost = seam_mask(B, W, inner, forbid, z["centre"]); print(f"    seam mean difference {cost:.4f}")
            W = edge_register(B, W, mask)                                                     # make the two drawings agree along the patch edge
            cv2.imwrite(f"{H}/work/{s}_headfit_reg.png", unpm(W))
            res = membrane(B, W, mask); f = feather(mask, 2.0)[..., None]
            res = res + B * (1 - res[..., 3:])                                                # the patch goes OVER the base (the jaw in front of the neck)
            out[s] = np.clip(B * (1 - f) + res * f, 0, 1); masks[s] = (mask, pts, inner, forbid)
        else:
            cur = B.copy(); W0 = warp(V, Mh); cv2.imwrite(f"{H}/work/blink_headfit.png", unpm(W0)); lidm = np.zeros((S, S), bool)
            solid = cv2.erode((B[..., 3] > .99).astype(np.uint8), np.ones((3, 3), np.uint8), iterations=LID_INSET) > 0   # stay off the outline
            for k, L in LIDS.items():
                e = EYES[k]; th = np.radians(L["rot"]); A = np.array([[L["sx"] * np.cos(th), -L["sy"] * np.sin(th)], [L["sx"] * np.sin(th), L["sy"] * np.cos(th)]])
                t = np.array(L["dst"]) - A @ np.array(L["src"]); Ml = np.float32(np.hstack([A, t[:, None]]))
                Mfull = (np.vstack([Ml, [0, 0, 1]]) @ np.vstack([Mh, [0, 0, 1]]))[:2].astype(np.float32)
                Wl = warp(V, Mfull); m = (ell_mask(e["c"], e["r"], e["ang"], grow=0) > 0) & solid & (Wl[..., 3] > .99)
                res = membrane(cur, Wl, m, iters=2500); f = feather(m, 1.5)[..., None]; cur = np.clip(cur * (1 - f) + res * f, 0, 1); lidm |= m
            out["blink"] = cur; masks["blink"] = lidm
    # a blink on the other mouth states: the lids go on top of the mouth patch
    lid = masks["blink"]; fl = feather(lid, 1.5)[..., None]
    for s in ("half", "wide"):
        out[s + "_blink"] = np.clip(out[s] * (1 - fl) + out["blink"] * fl, 0, 1)
        ov = (masks[s][0] & cv2.dilate(lid.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0).sum(); print(f"{s}: mouth patch and lids overlap {ov} px")
    # outside the patches every state must be the base, bit for bit
    for s, f in out.items():
        im = unpm(f); 
        if s != "closed":
            keep = np.ones((S, S), bool)
            for q in ("half", "wide"):
                if s.startswith(q): keep &= ~masks[q][0]
            if "blink" in s: keep &= ~lid
            im[keep] = B8[keep]
            print(f"{s}: {int((~keep).sum())} px patched ({(~keep).mean() * 100:.1f}% of the canvas); rest identical to base: {bool((im[keep] == B8[keep]).all())}")
        cv2.imwrite(f"{H}/basil_sit_{s}.png", im)
        ys, xs = np.where(im[..., 3] > 0); meta["states"][s] = dict(file=f"basil_sit_{s}.png", bbox=[int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())])
    ys, xs = np.where(B8[..., 3] > 0)
    meta["anchors"] = dict(hips=[640, int(ys.max()) - 6], neck=[650, 472], neck_band=[432, 500], head_xmin=[372, 394], tail=dict(root=[445, 790], xband=[445, 335], ymin=[400, 440]), ground_y=int(ys.max()))
    meta["eyes"] = EYES; json.dump(meta, open(f"{H}/basil_sit.json", "w"), indent=1)
    np.save(f"{H}/work/seams.npy", {s: masks[s][1] for s in ("half", "wide")}, allow_pickle=True)
    return out, masks

if __name__ == "__main__": main()
