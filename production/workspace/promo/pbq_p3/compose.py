"""compose.py h|v [--still SECONDS OUT.png] [--frames A B]: builds a promo cut from the captured gameplay (clips/), Heart's voice
(voice/), the game's own sounds (sfx/ and the game's voice files) and the original music (make_music.py).
  h = 16:9 1920x1080 (desk clips)    v = 9:16 1080x1920 (phone clips)
The edit is in edit.py. Video: 60 fps, every frame composed here (zoom, captions, tap rings, flashes), piped to x264.
Audio: 48 kHz; music ducked under every voice; loudness normalised (two-pass loudnorm) to -14 LUFS, true peak -1.5 dBTP."""
import sys, os, json, subprocess, re, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
GAME = "/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/p3quest"
FONT = GAME + "/pub/fredoka-700.woff2"
FPS = 60; SR = 48000
CUT = sys.argv[1]; import edit
E = edit.CUTS[CUT]; W, Hh = E["size"]
NAVY = (27, 21, 69); SUN = (255, 200, 58); INK = (26, 20, 51)

# ---------- clip data: frame times and events ----------
CL = {}
def clip(name):
    if name not in CL:
        d = json.load(open(f"clips/{name}.json")); d["fr"] = np.array(d["frames"]); CL[name] = d
    return CL[name]
def ct(name, vt):   # clip time (s) of a virtual time (ms): the first captured frame at or after it
    fr = clip(name)["fr"]; i = int(np.searchsorted(fr, vt - 1e-6)); return min(i, len(fr) - 1) / FPS
def find(name, spec, n=0):
    """event anchors: 'sfx:lock' 'vo:glitch:New knowledge' 'tap:#hi5' 'drag' ; returns clip time"""
    d = clip(name); k = spec.split(":", 2); hits = []
    if k[0] == "sfx": hits = [e["t"] for e in d["log"] if e["ev"] == "sfx" and e["k"] == k[1]]
    elif k[0] == "vo": hits = [e["t"] for e in d["log"] if e["ev"] == "vo" and e["who"] == k[1] and (len(k) < 3 or k[2] in e["text"])]
    elif k[0] == "tap": hits = [t["t"] for t in d["taps"] if t["kind"] == "tap" and (len(k) < 2 or k[1] in t.get("sel", ""))]
    elif k[0] == "drag": hits = [t["t"] for t in d["taps"] if t["kind"] == "drag"]
    if len(hits) <= n: raise SystemExit(f"anchor {spec}#{n} not found in {name}")
    return ct(name, hits[n])
edit.find = find

# ---------- timeline ----------
SEG = E["segs"](find); t = 0.0
for s in SEG: s["at"] = t; t += s["d"]
TOTAL = t; NF = int(round(TOTAL * FPS))
print(f"{CUT}: {len(SEG)} segments, {TOTAL:.2f}s")

# ---------- captions ----------
_fc = {}
def font(sz):
    if sz not in _fc: _fc[sz] = ImageFont.truetype(FONT, sz)
    return _fc[sz]
def cap_img(text, size, maxw, box=False):
    """Fredoka Bold, white with a thick navy outline, [words] in yellow; centred lines; RGBA"""
    f = font(size); sw = max(4, int(size * .15)); words = []; yel = False
    for tok in text.split():            # a word is a list of (text, colour) runs; [ ] switch yellow on and off
        runs = []
        for part in re.split(r"([\[\]])", tok):
            if part == "[": yel = True
            elif part == "]": yel = False
            elif part: runs.append((part, SUN if yel else (255, 255, 255)))
        if runs: words.append(runs)
    wlen = lambda runs: sum(f.getlength(t) for t, _ in runs)
    sp = f.getlength(" "); lines = [[]]; lw = 0
    for w in words:
        wl = wlen(w)
        if lines[-1] and lw + sp + wl > maxw: lines.append([]); lw = 0
        lw += (sp if lines[-1] else 0) + wl; lines[-1].append(w)
    lh = int(size * 1.12); asc = f.getmetrics()[0]
    widths = [sum(wlen(w) for w in L) + sp * (len(L) - 1) for L in lines]
    iw = int(max(widths) + 2 * sw + 16); ih = int(lh * len(lines) + 2 * sw + 20)
    im = Image.new("RGBA", (iw, ih), (0, 0, 0, 0)); sh = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
    d = ImageDraw.Draw(im); ds = ImageDraw.Draw(sh)
    for li, L in enumerate(lines):
        x = (iw - widths[li]) / 2; y = sw + 6 + li * lh
        for runs in L:
            for w, c in runs:
                ds.text((x, y + size * .09), w, font=f, fill=(10, 8, 30, 150), stroke_width=sw, stroke_fill=(10, 8, 30, 150))
                d.text((x, y), w, font=f, fill=c + (255,), stroke_width=sw, stroke_fill=NAVY + (255,))
                x += f.getlength(w)
            x += sp
    sh = sh.filter(ImageFilter.GaussianBlur(size * .06)); sh.alpha_composite(im)
    if box:   # a wide navy band behind the words (hides the game's own caption text underneath)
        bw, bh = E["size"][0] + 60, max(ih + 40, int(size * 3.7)); bx = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
        ImageDraw.Draw(bx).rounded_rectangle([0, 0, bw - 1, bh - 1], radius=28, fill=NAVY + (255,)); bx.alpha_composite(sh, ((bw - iw) // 2, (bh - ih) // 2)); return bx
    return sh
CAPS = []   # (t0, t1, img, cx, cy)
for s in SEG:
    for c in s.get("caps", []):
        text, a, b, pos = c[0], c[1], c[2], c[3] if len(c) > 3 else "top"
        img = cap_img(text, E["capsize"], E["capw"], box=len(c) > 4 and c[4]); cx, cy = (E["pos"][pos] if isinstance(pos, str) else pos)
        CAPS.append((s["at"] + a, s["at"] + b, img, cx, cy, len(c) > 4 and c[4]))

def ease_back(u):
    c1 = 1.70158; c3 = c1 + 1; return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2
def paste(base, img, cx, cy, scale=1.0, alpha=1.0):
    if scale != 1.0: img = img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.BILINEAR)
    if alpha < 1: a = np.asarray(img).copy(); a[..., 3] = (a[..., 3] * alpha).astype(np.uint8); img = Image.fromarray(a)
    x = int(cx - img.width / 2); y = int(cy - img.height / 2); base.alpha_composite(img, (max(0, x), max(0, y)), (max(0, -x), max(0, -y)))

# ---------- tap rings ----------
def taps_for(s):
    d = clip(s["clip"]); out = []; sc = E["tapscale"](d)
    for tp in d["taps"]:
        t0 = ct(s["clip"], tp["t"]); rel = t0 - s["t"]
        if -1 < rel < s["d"] + .1:
            if tp["kind"] == "tap": out.append(("tap", s["at"] + rel, tp["x"] * sc[0], tp["y"] * sc[1]))
            else:
                n = len(tp["path"]); pts = [(tp["x"] * sc[0], tp["y"] * sc[1])] * 6 + [(x * sc[0], y * sc[1]) for x, y in tp["path"]] + [(tp["path"][-1][0] * sc[0], tp["path"][-1][1] * sc[1])] * 3
                out.append(("drag", s["at"] + rel, pts))
    return out
TAPS = [x for s in SEG if s.get("taps", True) for x in taps_for(s)]
def draw_taps(base, tt, z):
    d = ImageDraw.Draw(base); R = E["tapr"]
    for tp in TAPS:
        if tp[0] == "tap":
            u = (tt - tp[1]) / .5
            if 0 <= u <= 1:
                x, y = z(tp[2], tp[3]); r = R * (.45 + .9 * u); a = int(255 * (1 - u) ** 1.2)
                d.ellipse([x - r, y - r, x + r, y + r], outline=(255, 255, 255, a), width=max(3, int(R * .16)))
                if u < .35: rr = R * .38; d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=(255, 255, 255, int(170 * (1 - u / .35))), outline=NAVY + (int(200 * (1 - u / .35)),), width=3)
        else:
            k = int(round((tt - tp[1]) * FPS)); pts = tp[2]
            if 0 <= k < len(pts) + 12:
                x, y = z(*pts[min(k, len(pts) - 1)]); fade = 1 if k < len(pts) else 1 - (k - len(pts)) / 12; rr = R * .42
                d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=(255, 255, 255, int(150 * fade)), outline=NAVY + (int(220 * fade),), width=4)


# ---------- 9:16 frame: a caption header (inside the platforms' safe zone) above the phone gameplay ----------
FR = E.get("frame")
if FR:
    _hdr = Image.new("RGBA", (W, FR["top"]), NAVY + (255,)); _d = ImageDraw.Draw(_hdr)
    for y in range(FR["top"]):   # soft vertical gradient
        c = tuple(int(a + (b - a) * y / FR["top"]) for a, b in zip((44, 34, 110), NAVY)); _d.line([(0, y), (W, y)], fill=c + (255,))
    if FR.get("logo_y"): _logo = cap_img("Pet Buddy Quest · [Primary 3]", 46, 900); _hdr.alpha_composite(_logo, ((W - _logo.width) // 2, FR["logo_y"] - _logo.height // 2))
    _gw = int(W * FR["scale"]); _gh = int(Hh * FR["scale"]); _gx = (W - _gw) // 2; _gy = FR["top"]
    _mask = Image.new("L", (_gw, _gh), 0); ImageDraw.Draw(_mask).rounded_rectangle([0, 0, _gw - 1, _gh + 60], radius=36, fill=255)
def framed(img, z):
    bg = img.convert("RGB").resize((W // 12, Hh // 12), Image.BILINEAR).filter(ImageFilter.GaussianBlur(2)).resize((W, Hh), Image.BILINEAR)
    bg = Image.blend(bg, Image.new("RGB", (W, Hh), NAVY), .55).convert("RGBA")
    bg.alpha_composite(_hdr, (0, 0))
    g = img.resize((_gw, _gh), Image.LANCZOS)
    ImageDraw.Draw(bg).rounded_rectangle([_gx - 6, _gy - 6, _gx + _gw + 5, Hh + 80], radius=40, fill=(255, 255, 255, 255))
    bg.paste(g, (_gx, _gy), _mask)
    k = FR["scale"]; return bg, (lambda x, y, z=z: ((z(x, y)[0]) * k + _gx, (z(x, y)[1]) * k + _gy))

# ---------- video ----------
def reader(s):
    fl = f"scale={W}:{Hh}" if s.get("scale", True) else "null"
    return subprocess.Popen(["ffmpeg", "-v", "error", "-ss", f"{s['t']:.4f}", "-i", f"clips/{s['clip']}.mp4", "-frames:v", str(int(round(s['d'] * FPS)) + 2),
                             "-vf", fl, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
def frame_at(seg, rd, last):
    raw = rd.stdout.read(W * Hh * 3)
    if len(raw) < W * Hh * 3: return last   # clip ran out: hold (reported by QA)
    return np.frombuffer(raw, np.uint8).reshape(Hh, W, 3)
def render(out_video, lo=0, hi=None, stills=None):
    hi = NF if hi is None else hi
    enc = None
    if out_video:
        enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{Hh}", "-r", str(FPS), "-i", "-",
                                "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709",
                                "-color_trc", "bt709", "-movflags", "+faststart", out_video], stdin=subprocess.PIPE)
    si = -1; rd = None; last = None
    for f in range(lo, hi):
        tt = f / FPS
        while si + 1 < len(SEG) and SEG[si + 1]["at"] <= tt + 1e-9:
            si += 1; s = SEG[si]
            if rd: rd.kill()
            s2 = dict(s); s2["t"] = s["t"] + (tt - s["at"]); s2["d"] = s["d"] - (tt - s["at"]); rd = reader(s2)
        s = SEG[si]; arr = frame_at(s, rd, last); last = arr; u = (tt - s["at"]) / s["d"]
        img = Image.fromarray(arr).convert("RGBA")
        z = lambda x, y: (x, y)
        if s.get("zoom"):
            z0, z1, cx, cy = s["zoom"]; e = u * u * (3 - 2 * u); k = z0 + (z1 - z0) * e
            if k > 1.0001:
                cw, ch = W / k, Hh / k; x0 = min(max(cx * W - cw / 2, 0), W - cw); y0 = min(max(cy * Hh - ch / 2, 0), Hh - ch)
                img = img.resize((W, Hh), Image.BICUBIC, box=(x0, y0, x0 + cw, y0 + ch)); z = lambda x, y, x0=x0, y0=y0, k=k: ((x - x0) * k, (y - y0) * k)
        if E.get("frame"): img, z = framed(img, z)
        draw_taps(img, tt, z)
        for (a, b, ci, cx, cy, bx) in CAPS:
            if a <= tt < b:
                p = (tt - a) / .22; q = (b - tt) / .15
                paste(img, ci, cx, cy, scale=(.6 + .4 * ease_back(min(1, p))) if p < 1 and not bx else 1.0, alpha=min(1, p * 2.5, q) if not bx else 1.0)
        fl = s.get("flash", 0)
        if fl and tt - s["at"] < fl:
            a = 1 - (tt - s["at"]) / fl; w = Image.new("RGBA", img.size, (255, 255, 255, int(230 * a))); img.alpha_composite(w)
        fo = s.get("fadeout", 0)
        if fo and s["at"] + s["d"] - tt < fo:
            a = 1 - (s["at"] + s["d"] - tt) / fo; img.alpha_composite(Image.new("RGBA", img.size, NAVY + (int(255 * a),)))
        rgb = img.convert("RGB")
        if stills is not None and f in stills: rgb.save(stills[f]);
        if enc: enc.stdin.write(rgb.tobytes())
        if f % 600 == 0: print(f"  frame {f}/{NF}", flush=True)
    if rd: rd.kill()
    if enc: enc.stdin.close(); enc.wait()

# ---------- audio ----------
def load(path, gain_db=0.0):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64) * 10 ** (gain_db / 20)
def place(buf, x, t, pan=0.0):
    i = int(round(t * SR))
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n, 0] += x[:n] * (1 - pan * .5); buf[i:i + n, 1] += x[:n] * (1 + pan * .5)
def audio(out_wav):
    N = int(TOTAL * SR) + SR; voice = np.zeros((N, 2)); game = np.zeros((N, 2)); gvox = np.zeros((N, 2))
    for s in SEG:
        for v in s.get("vo", []):
            place(voice, load(f"voice/{v[0]}.wav", 0), s["at"] + v[1])
        d = clip(s["clip"]); end = s["at"] + s["d"]
        if s.get("sfx", True):
            for e in d["log"]:
                if e["ev"] != "sfx": continue
                rel = ct(s["clip"], e["t"]) - s["t"]
                if -.05 <= rel < s["d"] - .03 and e["k"] not in s.get("mute", []) and e["k"] not in ("type", "talk", "tick", "squeak"):
                    nm = e["k"] + ("_" + "_".join(str(a) for a in e["a"]) if e["a"] else ""); x = load(f"sfx/{nm}.wav", E["sfxdb"] + s.get("sfxdb", 0) + edit.SFXDB.get(e["k"], 0))
                    room = int((end - (s["at"] + rel)) * SR)
                    if room < len(x): x = x[:max(0, room)].copy(); x[-min(len(x), 480):] *= np.linspace(1, 0, min(len(x), 480))
                    place(game, x, s["at"] + rel)
        for g in s.get("gvo", []):   # the game's own voice lines kept in this shot: (who, text substring)
            for i, e in enumerate(d["log"]):
                if e["ev"] == "vo" and e["who"] == g[0] and g[1] in e["text"]:
                    rel = ct(s["clip"], e["t"]) - s["t"]
                    if not (-e["dur"] < rel < s["d"]): continue
                    stop = next((ct(s["clip"], f["t"]) - s["t"] for f in d["log"][i + 1:] if f["ev"] == "voend" and f["k"] == e["k"]), s["d"])
                    x = load(f"{GAME}/v/{e['k']}.mp3", (g[2] if len(g) > 2 else 0) + E["gvodb"])
                    if rel < 0: x = x[int(-rel * SR):].copy(); x[:240] *= np.linspace(0, 1, min(240, len(x))); rel = 0.0
                    room = int((min(stop + .05, s["d"]) - rel) * SR)
                    if room < len(x): x = x[:max(0, room)].copy(); x[-min(len(x), 960):] *= np.linspace(1, 0, min(len(x), 960))
                    place(gvox, x, s["at"] + rel)
    hit = E["hit"](SEG); tmp = f"music_{CUT}.wav"
    subprocess.run(["/home/user/heart-tts/venv/bin/python", "make_music.py", tmp, f"{TOTAL + .6:.3f}", f"{hit:.3f}"], check=True)
    mus = load(tmp); os.remove(tmp)
    mus = np.stack([mus, mus], 1)[:N] if mus.ndim == 1 else mus
    mus = np.vstack([mus, np.zeros((N - len(mus), 2))]) if len(mus) < N else mus[:N]
    # duck: envelope from every voice (Heart + kept game voices), 0.12 s attack, 0.4 s release
    v = np.abs(voice[:, 0]) + np.abs(gvox[:, 0]); hop = SR // 100; env = np.array([v[i:i + hop].max() if i < len(v) else 0 for i in range(0, len(v), hop)]) > .02
    sm = np.zeros(len(env)); g = 0.0
    for i, on in enumerate(env): g = g + (1 - g) * .45 if on else g * .955; sm[i] = g   # fast up, slow down (10 ms steps)
    sm = np.maximum(sm, np.concatenate([sm[12:], np.zeros(12)]))                        # start ducking ~0.12 s before a word
    duck = 10 ** (-E["duckdb"] * np.repeat(sm, hop)[:N] / 20)
    mix = voice + gvox + game * 10 ** (-3 * np.repeat(sm, hop)[:N] / 20)[:, None] + mus * (10 ** (E["musdb"] / 20)) * duck[:, None]
    mix = mix[:int(TOTAL * SR)]; fo = int(.25 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
    import soundfile as sf
    sf.write("mix_" + CUT + "_pre.wav", mix.astype(np.float32), SR, subtype="FLOAT")
    # two-pass loudnorm to -14 LUFS / -1.5 dBTP
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", "mix_" + CUT + "_pre.wav", "-af", "loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(r[r.rindex("{"):r.rindex("}") + 1])
    af = f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "mix_" + CUT + "_pre.wav", "-af", af + ",aresample=48000", "-c:a", "pcm_s16le", out_wav], check=True)
    os.remove("mix_" + CUT + "_pre.wav"); print("  audio", m["input_i"], "->", out_wav)

if __name__ == "__main__":
    a = sys.argv[2:]
    if "--still" in a:
        i = a.index("--still"); tt = float(a[i + 1]); f = int(tt * FPS); render(None, f, f + 1, {f: a[i + 2]}); sys.exit()
    if "--stills" in a:      # many stills: --stills OUTDIR every_s
        i = a.index("--stills"); od = a[i + 1]; ev = float(a[i + 2]); os.makedirs(od, exist_ok=True)
        st = {int(k * ev * FPS): f"{od}/{CUT}_{k * ev:05.1f}.jpg" for k in range(int(TOTAL / ev) + 1)}; render(None, 0, NF, st); sys.exit()
    name = E["out"]; wav = f"{name}.wav"; vid = f"{name}_video.mp4"
    if "--remix" in a:   # new soundtrack on the existing picture
        audio(wav); subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{name}.mp4", "-map", "0:v", "-c:v", "copy", vid], check=True); os.remove(f"{name}.mp4"); a.append("--noaudio-render")
    if "--noaudio" not in a and "--noaudio-render" not in a: audio(wav)
    if "--noaudio-render" not in a: render(vid)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", vid, "-i", wav, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
                    "-shortest", "-movflags", "+faststart", f"{name}.mp4"], check=True)
    os.remove(vid); os.remove(wav); print("wrote", f"{name}.mp4")
