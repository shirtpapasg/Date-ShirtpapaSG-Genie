"""guest_sprites.py (P4 EP2, 27 Nov 2026): the teacher's painted guests into spr/ + spr/manifest.js (as lim_sprites.py did for Uncle Lim).
  python3 guest_sprites.py      (after ../characters/chilli/cut_chilli.py and ../characters/glitch/cut_glitch.py); then re-render.
CHILLI (two layers: the plant body by story state, the face by emotion; cut_chilli.py COMBOS): chilli_<body>_<face>_<state>, body wilt /
  tallg / tallr, face droop / flat / alarmed / shy / tall / tall_happy / smug, state closed / half / wide (+ _blink); the hop frames
  chilli_hop_a_closed(_blink) and chilli_hop_b_closed. Entry: w, h, ax/ay = the base centre on the ground (px), scale = local units per px
  (the pot rim 200 units wide in every pose), face = the face box (px) for qa/face_cover_scan.js.
GLITCH: glitch_<layer> (base painting: body, armL, armR, screen, wheelF, wheelB, hubF, strutF, strutB) and glitch_<pose>_<layer> (jug,
  crossed, up, down: body, screen, wheelF/B, strutF/B); glitch.json goes to spr/glitch.js as window.GLITCHM (screen boxes, eyes, wheels,
  scales: every pose scaled to the base painting's screen height, all on one ground line)."""
import os, json, shutil, glob
H = os.path.dirname(os.path.abspath(__file__)); O = f"{H}/spr"; CC = f"{H}/../characters/chilli/cut"; GC = f"{H}/../characters/glitch/cut"
src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")])
for k in [k for k in M if k.startswith("chilli_") or k.startswith("glitch_")]: M.pop(k)
for f in glob.glob(f"{O}/chilli_*.png") + glob.glob(f"{O}/glitch_*.png"): os.remove(f)
CM = json.load(open(f"{CC}/chilli.json")); n = 0
for key, m in CM.items():
    if not (m.get("body") or key.startswith("hop_")): continue          # only the body+face combos and the hop frames are used
    for st in m["states"]:
        name = f"chilli_{key}_{st}"; shutil.copy(f"{CC}/{name}.png", f"{O}/{name}.png")
        M[name] = dict(file=f"spr/{name}.png", w=m["w"], h=m["h"], ax=round(m["ox"], 1), ay=round(m["oy"], 1), bh=0, scale=round(m["scale"], 4), face=[round(v, 1) for v in m["face"]]); n += 1
GM = json.load(open(f"{GC}/glitch.json"))
for f in sorted(glob.glob(f"{GC}/glitch_*.png")):
    name = os.path.basename(f)[:-4]; shutil.copy(f, f"{O}/{name}.png")
    pose = name.split("_")[1] if name.count("_") >= 2 else None; P = GM["poses"][pose] if pose in GM.get("poses", {}) else GM
    M[name] = dict(file=f"spr/{name}.png", w=P["w"], h=P["h"], ax=0, ay=0, bh=0); n += 1
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
open(f"{O}/glitch.js", "w").write("window.GLITCHM=" + json.dumps(GM) + ";")
print(n, "guest sprites;", sorted(set(k.rsplit("_", 1)[0] for k in M if k.startswith("chilli_")))[:40])
