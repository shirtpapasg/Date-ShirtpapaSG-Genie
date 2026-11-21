"""cutout.py: step 1 of the sprite pipeline. White background -> clean alpha, flooding from the image border only.
  /home/user/heart-tts/venv/bin/python cutout.py            (all four Basil states -> work/<state>_cut.png)
How: a pixel is background if it is light (min channel > T) AND connected to the image border through light pixels, so the
near-white belly and throat (closed in by the outline) stay opaque. The soft grey ground shadow is light, so it floods away
with the background (we draw our own contact shadow). The edge: the one-pixel ring just outside the solid shape gets a
partial alpha un-mixed from white (alpha = how far it is from white towards the outline colour next to it), and every edge
pixel takes the clean outline colour of its nearest inside neighbour, so no white fringe shows on dark backgrounds."""
import cv2, numpy as np, os, sys
H = os.path.dirname(os.path.abspath(__file__)); T = 175
STATES = {"closed": "mouth_closed", "half": "mouth_half", "wide": "mouth_wide", "blink": "eyes_closed"}

def cutout(bgr, T=T):
    L = bgr.min(2).astype(np.float32)
    light = (L > T).astype(np.uint8)
    pad = np.pad(light, 1, constant_values=1); cv2.floodFill(pad, None, (0, 0), 2)
    bg = pad[1:-1, 1:-1] == 2
    fg = (~bg).astype(np.uint8)
    # drop specks: keep the biggest blob (plus anything at least 2% of it)
    n, lab, st, _ = cv2.connectedComponentsWithStats(fg, connectivity=8)
    big = st[1:, cv2.CC_STAT_AREA].max(); keep = np.zeros_like(fg)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] >= .02 * big: keep[lab == i] = 1
    fg = keep
    k3 = np.ones((3, 3), np.uint8)
    core = cv2.erode(fg, k3, iterations=2)                       # safely inside: clean outline colour, no white mixed in
    # nearest core pixel for every pixel (colour to bleed outwards)
    _, idx = cv2.distanceTransformWithLabels(1 - core, cv2.DIST_L2, 5, labelType=cv2.DIST_LABEL_PIXEL)
    ys, xs = np.where(core == 1); lut_y = np.zeros(idx.max() + 1, np.int32); lut_x = np.zeros(idx.max() + 1, np.int32)
    lut_y[idx[ys, xs]] = ys; lut_x[idx[ys, xs]] = xs
    ny, nx = lut_y[idx], lut_x[idx]
    near = bgr[ny, nx].astype(np.float32); nearL = L[ny, nx]
    ring = cv2.dilate(fg, k3, iterations=1) - fg                  # one pixel outside the solid shape
    edge = fg - core                                              # the two solid pixels at the rim
    un = np.clip((255 - L) / np.maximum(255 - nearL, 30), 0, 1)   # un-mix from white
    a = fg.astype(np.float32)
    a[ring == 1] = un[ring == 1]
    a[edge == 1] = np.maximum(un[edge == 1], .0)                  # rim pixels: mostly 1, a little lower where white leaked in
    a[(edge == 1) & (cv2.erode(fg, k3) == 1)] = 1                 # only the outermost solid pixel may be partial
    rgb = bgr.astype(np.float32)
    m = ((ring == 1) | (edge == 1))
    # de-contaminate: colour = (seen - (1-a)*white)/a, falling back to the neighbour's colour when alpha is small
    aa = a[..., None]; dec = np.where(aa > .5, (rgb - (1 - aa) * 255) / np.maximum(aa, .5), near)
    dec = np.clip(.5 * dec + .5 * near, 0, 255)
    rgb[m] = dec[m]
    rgb[a == 0] = near[a == 0]                                    # colour under fully clear pixels too (clean resampling)
    return np.dstack([rgb, a * 255]).round().clip(0, 255).astype(np.uint8)

def on(rgba, col=(0x8C, 0x2A, 0x3B)):                            # BGR preview on a flat colour
    a = rgba[..., 3:].astype(np.float32) / 255
    return (rgba[..., :3] * a + np.array(col, np.float32) * (1 - a)).astype(np.uint8)

if __name__ == "__main__":
    os.makedirs(f"{H}/work", exist_ok=True)
    for s, n in STATES.items():
        im = cv2.imread(f"{H}/basil_src/basil_sit_{n}.jpg"); out = cutout(im)
        cv2.imwrite(f"{H}/work/{s}_cut.png", out)
        ys, xs = np.where(out[..., 3] > 0); print(s, "bbox", xs.min(), ys.min(), xs.max(), ys.max(), "opaque", (out[..., 3] == 255).mean().round(4))
