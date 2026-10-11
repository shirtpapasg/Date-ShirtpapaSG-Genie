"""Scene enlargement ("fills"): from the measured content box of each scene, a stage transform that enlarges the content
into the safe area (below the tag, left of the key-word shelf, above the captions), at most 1.5x; skipped below 1.05x
and for scenes with full-width/height content. CLI: python3 fill_calc.py BOX.json OUT.json"""
import json, sys

X0, Y0, X1, Y1, KMAX, KMIN = 50, 100, 1480, 950, 1.5, 1.05


def calc(box, skip=()):
    out = {}
    for name, v in box.items():
        b = v["box"]
        if name in skip or not b or v["wide"]: continue
        w, h = b[2] - b[0], b[3] - b[1]; k = min(KMAX, (X1 - X0) / w, (Y1 - Y0) / h)
        if k < KMIN: continue
        k = round(k, 3); cx, cy = (b[0] + b[2]) / 2, (b[1] + b[3]) / 2; tx, ty = (X0 + X1) / 2, (Y0 + Y1) / 2
        out[name] = f"translate({tx:.0f} {ty:.0f}) scale({k}) translate({-cx:.0f} {-cy:.0f})"
    return out


if __name__ == "__main__":
    json.dump(calc(json.load(open(sys.argv[1]))), open(sys.argv[2], "w"), indent=1)
