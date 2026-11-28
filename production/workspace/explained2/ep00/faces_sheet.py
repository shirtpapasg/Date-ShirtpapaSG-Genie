"""faces_sheet.py <part>: out/faces_p<part>/ (faces_sheet.js) -> qa/buddy_faces_p<part>.jpg, every buddy pose on screen with its time and
reason (pose_reasons.json; automatic ones from lib.js). Kept under 8000 px tall (a second file _b if needed)."""
import json, os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); P = sys.argv[1] if len(sys.argv) > 1 else "1"
L = json.load(open(f"{H}/out/faces_p{P}/list.json")); R = json.load(open(f"{H}/pose_reasons.json"))
F = "/usr/share/fonts/truetype/dejavu/DejaVuSans"; fb = ImageFont.truetype(F + "-Bold.ttf", 22); fr = ImageFont.truetype(F + ".ttf", 19); ft = ImageFont.truetype(F + "-Bold.ttf", 34)
COL = {"pip": (139, 92, 246), "basil": (20, 184, 166), "momo": (251, 113, 88)}
TW, TH, LH, N = 340, 300, 112, 5
mm = lambda t: f"{int(t // 60)}:{t % 60:04.1f}"
tiles = []
for v in L:
    if R.get(f"{P}|{v['scene']}|{v['who']}|{v['pose']}", "").startswith("-"): continue   # behind a panel: not on screen
    im = Image.open(v["file"]).convert("RGB"); im.thumbnail((TW, TH)); tile = Image.new("RGB", (TW, TH + LH), (250, 246, 238)); tile.paste(im, ((TW - im.width) // 2, TH - im.height))
    d = ImageDraw.Draw(tile); d.rectangle([0, TH, TW, TH + 6], fill=COL[v["who"]])
    pose = v["pose"]
    d.text((8, TH + 10), f"{mm(v['t0'])}  {v['who'].capitalize()}  {pose}", font=fb, fill=(30, 26, 60))
    why = R.get(f"{P}|{v['scene']}|{v['who']}|{v['pose']}", v["why"])
    for j, ln in enumerate(textwrap.wrap(why, 33)[:4]): d.text((8, TH + 38 + j * 19), ln, font=fr, fill=(60, 56, 80))
    tiles.append(tile)
rows = [tiles[i:i + N] for i in range(0, len(tiles), N)]; per = (8000 - 70) // (TH + LH + 10)
for k in range(0, len(rows), per):
    rr = rows[k:k + per]; W = N * TW + (N + 1) * 10; Ht = 70 + len(rr) * (TH + LH + 10); sh = Image.new("RGB", (W, Ht), (18, 14, 46)); d = ImageDraw.Draw(sh)
    d.text((14, 16), f"EP22 Part {P}: every buddy pose on screen, with its reason (v2 cast){'' if k == 0 else ' (cont.)'}", font=ft, fill=(255, 200, 58))
    for r, row in enumerate(rr):
        for c, tl in enumerate(row): sh.paste(tl, (10 + c * (TW + 10), 70 + r * (TH + LH + 10)))
    out = f"{H}/qa/buddy_faces_p{P}{'' if k == 0 else '_b'}.jpg"; sh.save(out, quality=86); print(out, sh.size)
