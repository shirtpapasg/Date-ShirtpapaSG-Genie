"""onion.py: every cut Chilli pose placed at its local scale on its base-centre origin (as the episode draws it), overlaid pairwise with
tall (50%), so pot size and base line can be checked by eye; plus a sheet of every talking / blink state.  python onion.py <out_dir>"""
import cv2, numpy as np, json, sys, os
H = os.path.dirname(os.path.abspath(__file__)); M = json.load(open(f"{H}/cut/chilli.json")); O = sys.argv[1]
def place(name, st="closed", S=1.6):
    m = M[name]; im = cv2.imread(f"{H}/cut/chilli_{name}_{st}.png", -1).astype(np.float32); k = m["scale"] * S
    im = cv2.resize(im, None, fx=k, fy=k, interpolation=cv2.INTER_AREA); can = np.zeros((1100, 900, 4), np.float32)
    x0 = int(450 - m["ox"] * k); y0 = int(1050 - m["oy"] * k); h, w = im.shape[:2]
    can[y0:y0 + h, x0:x0 + w] = im; return can
def comp(layers):
    out = np.full((1100, 900, 3), 235, np.float32)
    for L, a in layers: al = L[..., 3:] / 255 * a; out = out * (1 - al) + L[..., :3] * al
    cv2.line(out, (0, 1050), (900, 1050), (0, 0, 255), 1); return out.astype(np.uint8)
row = [comp([(place("tall"), 1), (place(n), .5)]) for n in M if n != "tall"]
cv2.imwrite(f"{O}/chilli_onion.jpg", cv2.resize(cv2.hconcat(row), None, fx=.5, fy=.5))
rows = []
for n in M:
    r = [comp([(place(n, st), 1)])[350:1100, 100:800] for st in ("closed", "half", "wide", "closed_blink")]
    rows.append(cv2.hconcat(r))
cv2.imwrite(f"{O}/chilli_states.jpg", cv2.resize(cv2.vconcat(rows), None, fx=.42, fy=.42))
