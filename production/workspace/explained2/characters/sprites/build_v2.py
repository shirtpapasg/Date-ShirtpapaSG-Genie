"""build_v2.py: the buddies in ONE style (Pip's; teacher, 23 Nov 2026): Momo and Basil repainted with Gemini as "v2".
  /home/user/heart-tts/venv/bin/python build_v2.py        -> {momo,basil}_v2_sit_{closed,half,wide,blink,half_blink,wide_blink}.png,
                                                              {momo,basil}_v2_sit.json, qa/v2_talk_<buddy>.png, qa/v2_lineup.png
Gemini made each talking set as ONE picture with only the face changed (checked pixel by pixel), so unlike align.py / align_set.py no
fitting is needed: every picture of a set gets the SAME transform (the base's cut-out scaled to the set's body height, feet on the
ground line). half_blink / wide_blink = the half / wide picture with the eyelids of the blink picture (the eye zone where blink differs
from the base, feathered). Poses are cut by poses.py (POSES["momo_v2"], POSES["basil_v2"]) on these sets' scale."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); S = 1024
sys.path.insert(0, H); from cutout import cutout, on
from poses import body_cx
I = f"{H}/poses_inbox"
SETS = {
  # same body height and feet line as the grey / coloured sets, so the scenes' sizes stay the same
  "basil_v2": dict(src=dict(closed="basil_v2_sit_closed.jpg", half="basil_v2_sit_half2.jpg", wide="basil_v2_sit_half.jpg", blink="basil_v2_sit_blink.jpg"),
                   body_h=791, ground_y=917, centre_x=491, eye_y=(100, 285)),
  "momo_v2": dict(src=dict(closed="momo_v2_talk_closed.jpg", half="momo_v2_talk_half.jpg", wide="momo_v2_talk_wide.jpg", blink="momo_v2_talk_blink.jpg"),
                  body_h=807, ground_y=851, centre_x=560, eye_y=(200, 330)),
}

def build(name, cfg):
    raw = {k: cv2.imread(f"{I}/{f}") for k, f in cfg["src"].items()}
    base = cutout(raw["closed"]); ys, xs = np.where(base[..., 3] > 128); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    s = cfg["body_h"] / (y1 - y0); cx = (x0 + x1) / 2
    M = np.float32([[s, 0, cfg["centre_x"] - cx * s], [0, s, cfg["ground_y"] - y1 * s]])
    def norm(img):
        c = cutout(img).astype(np.float32); c[..., :3] *= c[..., 3:] / 255
        o = cv2.warpAffine(c, M, (S, S), flags=cv2.INTER_AREA if s < 1 else cv2.INTER_CUBIC)
        a = np.clip(o[..., 3:], 0, 255); o[..., :3] = np.where(a > 0, o[..., :3] / np.maximum(a, 1) * 255, 0)
        return np.clip(o, 0, 255).astype(np.uint8)
    # the eyelid zone: where the blink picture differs from the base, inside the eye band, grown and feathered
    d = (np.abs(raw["blink"].astype(int) - raw["closed"].astype(int)).max(2) > 40).astype(np.uint8)
    band = np.zeros_like(d); band[cfg["eye_y"][0]:cfg["eye_y"][1]] = 1; d = d * band
    d = cv2.morphologyEx(d, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)); d = cv2.dilate(d, np.ones((15, 15), np.uint8))
    lid = cv2.GaussianBlur(d.astype(np.float32), (0, 0), 3)[..., None]
    out = {k: raw[k] for k in ("closed", "half", "wide", "blink")}
    for k in ("half", "wide"): out[k + "_blink"] = (raw[k] * (1 - lid) + raw["blink"] * lid).astype(np.uint8)
    meta = dict(size=S, states={}, source=cfg["src"], note="build_v2.py: one transform for the whole set (Gemini kept the body identical)")
    for k, img in out.items():
        n = norm(img); cv2.imwrite(f"{H}/{name}_sit_{k}.png", n)
        yy, xx = np.where(n[..., 3] > 128); meta["states"][k] = dict(file=f"{name}_sit_{k}.png", bbox=[int(xx.min()), int(yy.min()), int(xx.max()), int(yy.max())])
    b = cv2.imread(f"{H}/{name}_sit_closed.png", -1)[..., 3]; yy, xx = np.where(b > 128)
    hx = round(body_cx(b, int(yy.min()), int(yy.max())) + 6)
    meta["anchors"] = dict(hips=[hx, int(yy.max()) - 6], ground_y=int(yy.max()))
    json.dump(meta, open(f"{H}/{name}_sit.json", "w"), indent=1)
    tiles = [on(cv2.imread(f"{H}/{name}_sit_{k}.png", -1))[40:960, 40:960] for k in ("closed", "half", "wide", "blink", "half_blink", "wide_blink")]
    cv2.imwrite(f"{H}/qa/v2_talk_{name}.png", cv2.resize(np.hstack(tiles), None, fx=.4, fy=.4, interpolation=cv2.INTER_AREA))
    print(name, "scale", round(float(s), 3), "bbox", meta["states"]["closed"]["bbox"], "hips", meta["anchors"]["hips"])

if __name__ == "__main__":
    for n, c in SETS.items(): build(n, c)
    # the three buddies side by side as the scenes draw them (same sitting height; Basil x0.88 as lib.js SIZE_K)
    row = []
    for n, k in (("pip_sit_closed", 1.0), ("momo_v2_sit_closed", 1.0), ("basil_v2_sit_closed", .88)):
        im = cv2.imread(f"{H}/{n}.png", -1); yy, xx = np.where(im[..., 3] > 128); c = im[yy.min():yy.max() + 1, xx.min():xx.max() + 1]
        sc = 560 * k / c.shape[0]; c = cv2.resize(c, None, fx=sc, fy=sc, interpolation=cv2.INTER_AREA)
        T = np.full((620, max(c.shape[1] + 40, 520), 4), 0, np.uint8); x = (T.shape[1] - c.shape[1]) // 2; T[600 - c.shape[0]:600, x:x + c.shape[1]] = c
        row.append(on(T, (236, 240, 244)))
    cv2.imwrite(f"{H}/qa/v2_lineup.png", np.hstack(row))
