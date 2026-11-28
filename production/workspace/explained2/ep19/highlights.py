"""highlights.py: qa/highlights.jpg, 10 labelled stills from the final renders (the v2 cast, the reasons, the fixes)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; f1 = ImageFont.truetype(F, 26); ft = ImageFont.truetype(F, 34)
S = [(1, 5.5, "P1 0:05  Cold open: our void deck, the INTERACTIONS banner, the MAGNET TEST TABLE; Momo waves hello"),
     (1, 28.8, "P1 0:28  A brand-new theme: the banner's two questions, readable"),
     (1, 111.0, "P1 1:51  Look closer: grey metal under the paint; Momo's guess (plastic) crossed out, Momo shy"),
     (1, 156.5, "P1 2:36  Be a steel pin: the tug towards the magnet's END"),
     (1, 176.0, "P1 2:56  The answer: Momo confident, Pip and Basil shy through the whole answer"),
     (1, 203.0, "P1 3:23  HOLD ON! countdown: Mum's iron wok in the ring, YOU cross arms, Momo thinking"),
     (1, 237.0, "P1 3:57  Slow motion: the pin jumps the gap before it touches; Basil's face"),
     (1, 292.0, "P1 4:52  The pigeon on the bicycle rack; Momo's fun fact: the Earth's magnetism"),
     (2, 93.0, "P2 1:33  Be an aluminium can: the giant magnet lifts the steel tins"),
     (2, 141.0, "P2 2:21  Look closer: the METALS family, iron and steel magnetic, copper and aluminium not"),
     (2, 192.0, "P2 3:12  Showdown countdown: Basil's homework (drawn to his spoken lines), Basil worried"),
     (2, 204.0, "P2 3:24  The fix: line 3 rewritten; Basil shy, Momo and Pip confident"),
     (2, 241.5, "P2 4:01  The tray's halves get the book's names: magnetic / non-magnetic materials"),
     (2, 302.0, "P2 5:02  The dare: the top ring magnet floats; a pull or a push?")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep19_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 20), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP19 (v2 cast): highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
