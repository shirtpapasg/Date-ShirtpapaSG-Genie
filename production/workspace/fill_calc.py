"""fill_calc.py N: from fills/epN_box.json compute a per-scene stage transform that enlarges content into the safe area."""
import json, sys
n = sys.argv[1]; S = __import__("os").path.dirname(__import__("os").path.abspath(__file__))
box = json.load(open(f"{S}/fills/ep{n}_box.json"))
X0, Y0, X1, Y1, KMAX = 50, 100, 1480, 950, 1.5   # safe area: below the tag, left of the keyword shelf, above captions
out = {}
for name, v in box.items():
    b = v["box"]
    if not b or v["wide"]: continue
    w, h = b[2] - b[0], b[3] - b[1]; k = min(KMAX, (X1 - X0) / w, (Y1 - Y0) / h)
    if k < 1.05: continue
    k = round(k, 3); cx, cy = (b[0] + b[2]) / 2, (b[1] + b[3]) / 2; tx, ty = (X0 + X1) / 2, (Y0 + Y1) / 2
    out[name] = f"translate({tx:.0f} {ty:.0f}) scale({k}) translate({-cx:.0f} {-cy:.0f})"
json.dump(out, open(f"{S}/fills/ep{n}.json", "w"), indent=1); print(json.dumps(out, indent=1))
