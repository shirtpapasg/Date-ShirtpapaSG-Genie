"""patch_aligned.py: the sprite states for paintings that are ALREADY pixel-aligned (Pip, Momo): no warping at all.
  /home/user/heart-tts/venv/bin/python patch_aligned.py pip momo
Cut-out of the base (cutout.py), then for half / wide / eyes-closed: find where the painting really differs from the base
(JPEG noise is ignored: blurred difference, threshold, only the blobs that touch the mouth or the eyes), grow that a little,
feather it, and lay just that patch over the base. Body, ears, tail and outline are the base's own pixels in every state.
Writes <name>_sit_closed/_half/_wide/_blink(+_half_blink, _wide_blink).png and <name>_sit.json."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H); from cutout import cutout
CFG = {  # seed boxes x0,y0,x1,y1 (where the mouth / the eyes are), anchors for the animation
  "pip": dict(mouth=(700, 380, 815, 550), eyes=(596, 228, 850, 425),
              anchors=dict(hips=[690, 0], neck=[700, 468], neck_band=[430, 505], head_xmin=[468, 500], tail=dict(root=[475, 700], xband=[470, 400], ymin=[420, 460]))),
  "momo": dict(mouth=(630, 312, 760, 430), eyes=(538, 176, 800, 348),
               anchors=dict(hips=[650, 0], neck=[650, 440], neck_band=[405, 470], head_xmin=[385, 415], tail=dict(root=[420, 720], xband=[415, 345], ymin=[410, 450]))),
}
def patch_mask(B, V, seed, limit=None, thr=20, grow=7):
    d = np.abs(V.astype(np.float32) - B.astype(np.float32)).max(2); d = cv2.GaussianBlur(d, (0, 0), 1.6)
    m = (d > thr).astype(np.uint8); m = cv2.dilate(m, np.ones((5, 5), np.uint8))
    n, lab = cv2.connectedComponents(m); x0, y0, x1, y1 = seed; keep = np.unique(lab[y0:y1, x0:x1]); keep = keep[keep > 0]
    m = np.isin(lab, keep).astype(np.uint8)
    if limit is not None: lx0, ly0, lx1, ly1 = limit; z = np.zeros_like(m); z[ly0:ly1, lx0:lx1] = 1; m &= z
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
    return cv2.dilate(m, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * grow + 1, 2 * grow + 1))) > 0
def soft(m, px=3.0): return np.clip(cv2.GaussianBlur(m.astype(np.float32), (0, 0), px), 0, 1)[..., None]

def build(name):
    c = CFG[name]; src = lambda s: cv2.imread(f"{H}/{name}_src/{name}_sit_{s}.jpg")
    B = src("mouth_closed"); base = cutout(B); a = base[..., 3]; out = {"closed": base}; masks = {}
    def lay(under, V, m):
        f = soft(m) ; o = under.copy().astype(np.float32); o[..., :3] = under[..., :3] * (1 - f) + V * f     # colour only: the outline and alpha stay the base's
        return o.round().astype(np.uint8)
    pad = lambda b, p: (b[0] - p, b[1] - p, b[2] + p, b[3] + p)
    for s, f in (("half", "mouth_half"), ("wide", "mouth_wide")):
        V = src(f); m = patch_mask(B, V, c["mouth"], limit=pad(c["mouth"], 60)); m &= cv2.erode((a == 255).astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
        masks[s] = m; out[s] = lay(base, V, m)
    V = src("eyes_closed"); m = patch_mask(B, V, c["eyes"], limit=pad(c["eyes"], 12)); m &= cv2.erode((a == 255).astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    mouths = cv2.dilate((masks["half"] | masks["wide"]).astype(np.uint8), np.ones((15, 15), np.uint8)) > 0
    m &= ~mouths                                                   # the lids only: the eyes-closed painting's own smile is not used, so a blink fits every mouth
    masks["blink"] = m; out["blink"] = lay(base, V, m)
    for s in ("half", "wide"):
        out[s + "_blink"] = lay(out[s], V, m)
        print(f"  {name} {s}: patch {int(masks[s].sum())} px; overlap with the eyelid patch {int((cv2.dilate(masks[s].astype(np.uint8), np.ones((13, 13), np.uint8)) > 0)[m].sum())} px")
    ys, xs = np.where(a > 0); meta = {"size": list(a.shape[::-1]), "states": {}, "anchors": dict(c["anchors"])}
    meta["anchors"]["hips"][1] = int(ys.max()) - 6; meta["anchors"]["ground_y"] = int(ys.max())
    for s, im in out.items():
        cv2.imwrite(f"{H}/{name}_sit_{s}.png", im); meta["states"][s] = dict(file=f"{name}_sit_{s}.png", bbox=[int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())])
    json.dump(meta, open(f"{H}/{name}_sit.json", "w"), indent=1)
    # QA: head at 200%, on violet, all states + the patch edges
    from cutout import on
    x0, x1 = max(xs.min() - 10, 0), xs.max() + 10; y0 = max(ys.min() - 10, 0); y1 = y0 + int((ys.max() - ys.min()) * .62); tiles = []
    for s in ("closed", "half", "wide", "blink", "wide_blink"):
        im = on(out[s]).copy()
        tiles.append(im[y0:y1, x0:x1])
    ov = on(out["closed"]).copy()
    for s, col in (("half", (0, 255, 255)), ("wide", (0, 160, 255)), ("blink", (255, 255, 0))):
        cs, _ = cv2.findContours(masks[s].astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); cv2.drawContours(ov, cs, -1, col, 1)
    for x in range(0, ov.shape[1], 50): cv2.line(ov, (x, 0), (x, ov.shape[0]), (90, 90, 90), 1); cv2.putText(ov, str(x), (x + 2, y0 + 14), 0, .4, (0, 255, 255), 1)
    for y in range(0, ov.shape[0], 50): cv2.line(ov, (0, y), (ov.shape[1], y), (90, 90, 90), 1); cv2.putText(ov, str(y), (x0 + 2, y - 2), 0, .4, (0, 255, 255), 1)
    cv2.imwrite(f"{H}/qa/{name}_states.png", np.vstack([np.hstack(tiles[:3]), np.hstack(tiles[3:] + [ov[y0:y1, x0:x1]])]))
    cv2.imwrite(f"{H}/qa/{name}_grid.png", ov[y0:, x0:x1])
    print(name, "bbox", xs.min(), ys.min(), xs.max(), ys.max())

if __name__ == "__main__":
    for n in sys.argv[1:]: build(n)
