"""make_preview.py P: the teacher's before/after preview of the EP13 v2 redo (22 Nov 2026), from the rendered files.
  python3 make_preview.py 1|2
-> qa/preview_pP_before_after.jpg (pairs: OLD left, NEW right, each labelled with the time and what changed; <= 4 MB)
   qa/preview_pP_countdown_vs_ep1.jpg (EP1's countdown frames next to the new one: the ring pulsing, the number popping, the buddies reacting)
   qa/preview_pP_clips.mp4 (a 60-90 s highlights reel of the new part, 720p, small)
OLD = out/ep13_partP_OLD.mp4 (the live version, kept for comparison), NEW = ep13_partP.mp4."""
import sys, os, json, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); P = sys.argv[1] if len(sys.argv) > 1 else "1"
OLD, NEW = f"{H}/out/ep13_part{P}_OLD.mp4", f"{H}/ep13_part{P}.mp4"; TMP = f"/tmp/claude-0/ep13prev{P}"; os.makedirs(TMP, exist_ok=True); os.makedirs(f"{H}/qa", exist_ok=True)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F = lambda s: ImageFont.truetype(FONT, s) if os.path.exists(FONT) else ImageFont.load_default()
tl = json.load(open(f"{H}/tl_p{P}.json")); S = {s["name"]: s for s in tl["scenes"]}; M = tl["marks"]; LN = tl["lines"]
def grab(src, t, w=640, crop=None):
    out = f"{TMP}/{os.path.basename(src)}_{t:.2f}.png"
    if not os.path.exists(out): subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t:.3f}", "-i", src, "-frames:v", "1", out], check=True)
    im = Image.open(out).convert("RGB")
    if crop: im = im.crop(crop)
    return im.resize((w, round(w * im.height / im.width)))
def mmss(t): return f"{int(t // 60)}:{t % 60:04.1f}"
def pairs_p1():
    # [label, old time(s), new time(s)] ; a list of times = a strip of frames in one cell
    sh = S["liz"]["t0"]   # the reveal is 7.4 s longer in the new cut (the fun fact); later scenes shift
    return [
        ("1 · Buddies 1.5x, spread, nothing in a corner (HOLD ON!, Pip's own idea)", [166.0], [166.0]),
        ("2 · The camera goes to OUR DESIGN PLAN when it is introduced; Basil big beside it", [130.5], [130.5]),
        ("3 · Look-closer: the plan large at its home, each part its own push-in + big label, Basil's face reacts, no see-through ghost", [145.3, 148.5], [145.3, 148.5]),
        ("4 · OUR DESIGN PLAN keeps ONE home (top left): end of the look-closer -> next scene", [163.2, 165.2], [163.2, 165.2]),
        ("5 · HOLD ON! takes the stage: big ring, big clues, blue stage, only Pip (leaning in, then sheepish at 0)", [177.0, 180.0], [177.0, 180.0]),
        ("6 · Round 1: ONE set of big numbered strap cards; ring big; clues >= 40 px; Basil fidgets on the beat", [56.6], [56.6]),
        ("6b · The answer: verdict tags ON the same cards (no second row of 1/2/3 cards)", [100.0], [100.0]),
        ("7 · The butterfly: one smooth push-in from the classroom into a black-ringed circle on the blue stage, then the game pops", [27.0, 31.0], [26.6, 31.0]),
        ("8 · The drawing: every chip tied to its part by colour and a line; samples named; four fingers and a thumb", [222.0, 196.5], [222.0, 196.5]),
        ("9 · +1 coin clear of the key-word shelf", [182.0], [182.0]),
        ("10 · Journey: 'You: a book' with your bookmark, and the buddies ride along", [248.0], [248.0]),
        ("11 · The reveal ends on a fun fact (new line, Momo) before 'Tell someone at home!'", [276.0], [sh + 9.5]),
    ]
def pairs_p2():
    sh = S["liz"]["t0"]
    return [
        ("1 · Buddies 1.5x and spread in the eco-garden; the frog's pond kept clear", [12.5], [12.6]),
        ("2 · The frog: one smooth push-in into a black-ringed circle on the blue stage", [14.0, 17.0], [13.9, 17.0]),
        ("3 · Round 1 takes the stage: big ring, big clues, ONE set of numbered weight cards", [44.0], [44.0]),
        ("4 · Look-closer test: Momo's face reacts as the new strap passes five", [67.5], [67.5]),
        ("5 · The answer on the same big cards; Momo big", [87.0], [87.0]),
        ("6 · The plan for the goat home: the camera goes to OUR DESIGN PLAN; it glides back home", [122.0], [122.0]),
        ("7 · Look-closer goat home: Basil's face peeks in and reacts", [134.8], [134.8]),
        ("8 · Showdown countdown takes the stage; Basil big beside his map", [191.0], [191.0]),
        ("9 · The chant: the board big, the buddies 1.5x", [246.0], [246.0]),
        ("10 · Journey: the buddies ride along on the new strap", [107.5], [107.5]),
        ("11 · The dare: ONE set of big numbered picture cards", [288.0], [S["dare"]["t0"] + 9.0]),
        ("12 · The reveal ends on a fun fact (new line, Pip)", [268.0], [sh + 9.0]),
    ]
def build_pairs():
    rows = pairs_p1() if P == "1" else pairs_p2(); W = 620; cells = []
    for lab, to, tn in rows:
        def strip(src, ts):
            ims = [grab(src, t, W // len(ts) - (4 if len(ts) > 1 else 0)) for t in ts]; h = max(i.height for i in ims); c = Image.new("RGB", (W, h), (18, 14, 46)); x = 0
            for i in ims: c.paste(i, (x, (h - i.height) // 2)); x += i.width + 8
            return c
        a, b = strip(OLD, to), strip(NEW, tn); h = max(a.height, b.height)
        fl = F(21); words = lab.split(" "); lines = [""]
        for w_ in words:
            if fl.getlength((lines[-1] + " " + w_).strip()) > 2 * W + 20: lines.append(w_)
            else: lines[-1] = (lines[-1] + " " + w_).strip()
        dy = 28 * (len(lines) - 1)
        cell = Image.new("RGB", (2 * W + 60, h + 74 + dy), (255, 248, 234)); d = ImageDraw.Draw(cell)
        for j, l in enumerate(lines): d.text((16, 10 + 28 * j), l, fill=(43, 33, 71), font=fl)
        d.text((16, 40 + dy), "BEFORE (live) " + " / ".join(mmss(t) for t in to), fill=(160, 60, 40), font=F(18)); d.text((W + 44, 40 + dy), "AFTER (new) " + " / ".join(mmss(t) for t in tn), fill=(30, 130, 70), font=F(18))
        cell.paste(a, (16, 66 + dy)); cell.paste(b, (W + 44, 66 + dy)); cells.append(cell)
    head = Image.new("RGB", (cells[0].width, 90), (43, 33, 71)); d = ImageDraw.Draw(head)
    d.text((16, 14), f"EP13 Part {P}: before (left) · after (right), the 22 Nov fixes", fill=(255, 215, 90), font=F(30)); d.text((16, 54), "Not uploaded. Words, timing and sounds kept (one new line: the fun fact at the reveal).", fill=(255, 255, 255), font=F(20))
    out = Image.new("RGB", (cells[0].width, 90 + sum(c.height for c in cells)), (255, 248, 234)); out.paste(head, (0, 0)); y = 90
    for c in cells: out.paste(c, (0, y)); y += c.height
    q = 82; f = f"{H}/qa/preview_p{P}_before_after.jpg"
    while True:
        out.save(f, quality=q, optimize=True)
        if os.path.getsize(f) <= 4_000_000 or q < 40: break
        q -= 8
    print(f, out.size, os.path.getsize(f) // 1000, "KB")
def build_countdown():
    ep1 = f"{H}/../ep01/ep01_part1.mp4"; r1 = 138.108
    if P == "1": r0, nm = M["ring0_r1"], "Round 1 (3 s)"; extra = [M["ring0_hold"] + d for d in (0.3, 1.5, 3.5, 5.05)]
    else: r0, nm = M["ring0_r1"], "Round 1 (6 s)"; extra = [M["ring0_show"] + d for d in (0.3, 2.5, 5.5, 6.05)]
    dur = 3 if P == "1" else 6; rows = [("EP1 (the benchmark): the robot round", ep1, [r1 + .3, r1 + 2.0, r1 + 4.5, r1 + 5.05]), (f"EP13 Part {P} NEW: {nm}", NEW, [r0 + .3, r0 + 1.1, r0 + dur - .5, r0 + dur + .05]), (f"EP13 Part {P} NEW: {'HOLD ON!' if P == '1' else 'Showdown'}", NEW, extra)]
    W = 400; out = Image.new("RGB", (4 * W + 50, len(rows) * (W * 9 // 16 + 50) + 10), (255, 248, 234)); d = ImageDraw.Draw(out); y = 10
    for lab, src, ts in rows:
        d.text((12, y), lab, fill=(43, 33, 71), font=F(22)); y += 34
        for i, t in enumerate(ts): out.paste(grab(src, t, W), (10 + i * (W + 10), y))
        y += W * 9 // 16 + 16
    f = f"{H}/qa/preview_p{P}_countdown_vs_ep1.jpg"; out.save(f, quality=80, optimize=True); print(f, os.path.getsize(f) // 1000, "KB")
def build_clips():
    if P == "1": segs = [(S["game"]["t0"], S["game"]["t0"] + 9.5), (M["ring0_r1"] - 3, LE("g503") + .3), (S["plan"]["t0"] + .4, S["lcbag"]["t0"] + 1.5), (M["p_straps"] - .5, M["p_base"] + 1.5),
                        (LT("g902"), M["fabback"] + 1.0), (M["v_draw"] - 3.0, M["v_draw"] + 1.8), (M["jzipclose"] - 1, M["jbump"] + 1), (S["liz"]["t0"], S["liz"]["t1"])]
    else: segs = [(S["game"]["t0"], S["game"]["t1"]), (M["ring0_r1"] - 2, LT("j404")), (M["w5"] - 1, M["w9"] + 1.5), (M["wipe"] - .3, M["zfill2"] + .5), (M["push1"] - 1, M["push2"] + 1.5),
                  (M["ring0_show"] - 1, LE("j905")), (M["jw6"] - 1, M["jw9"] + 1.5), (S["liz"]["t0"], S["liz"]["t1"])]
    parts = []
    for i, (a, b) in enumerate(segs):
        o = f"{TMP}/seg{i}.mp4"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{a:.3f}", "-t", f"{b - a:.3f}", "-i", NEW, "-vf", "scale=1280:720,fade=t=in:st=0:d=0.25", "-af", "afade=t=in:st=0:d=0.2", "-c:v", "libx264", "-crf", "30", "-preset", "medium", "-c:a", "aac", "-b:a", "96k", o], check=True); parts.append(o)
    lst = f"{TMP}/list.txt"; open(lst, "w").write("\n".join(f"file '{p}'" for p in parts)); f = f"{H}/qa/preview_p{P}_clips.mp4"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", f], check=True)
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout); print(f, f"{d:.1f} s", os.path.getsize(f) // 1000, "KB")
LT = lambda i: LN[i]["t"]; LE = lambda i: LN[i]["end"]
if __name__ == "__main__":
    what = sys.argv[2:] or ["pairs", "countdown", "clips"]
    if "pairs" in what: build_pairs()
    if "countdown" in what: build_countdown()
    if "clips" in what: build_clips()
