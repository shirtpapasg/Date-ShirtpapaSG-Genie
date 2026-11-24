"""make_short.py: a promo film (1920x1080, 60 fps) -> a vertical YouTube Short (1080x1920, 60 fps), reframed shot by shot.

    python3 make_short.py <N>                     -> film<N>_short.mp4       (the whole film)
    python3 make_short.py <N> --cut               -> film<N>_short60.mp4     (the <=60 s ad cut: plan's CUT ranges)
    python3 make_short.py <N> --preview [step]    -> /tmp/.../preview<N>.jpg (a sheet of rendered frames, no encode)
Run the full renders under the shared lock:  flock /tmp/explained_render.lock python3 make_short.py <N>

How a frame is made (all from the film's own frame; nothing of the source project is needed):
- plan_film<N>.py holds KF, the keyframed crop plan: (t, ease, cx, w, ybot). From t the window eases (smoothstep, `ease`
  seconds; 0 = a hard cut on that frame) to centre cx, width w (source pixels) and bottom edge ybot. The window is
  w x min(w/0.72, ybot): a tall window fills the picture area (1080 x 1500, its bottom at y 1440, above the Shorts UI);
  a wider one keeps its width, so the picture gets shorter and the blurred, zoomed fill of the same frame shows above it.
  So one number (w) runs smoothly from a full vertical crop (w = 634) to the whole 16:9 frame (w = 1920).
- ybot <= 880 keeps the film's own burned-in captions (pill + line from y ~ 900) out of the picture.
- Under y 1440 (the bottom 25%, where the title, channel and buttons sit) only a soft blurred reflection of the picture.
- Captions: every spoken line, 2-4 words at a time, from words_film<N>.json (align_words.py), centre y ~ 640, x 80..960.
- Hook title over the opening (0 - 1.5 s), end card over the last END seconds: "Try TheOneApp free / theoneapp.sg".
- Audio: the film's own mix, untouched (re-encoded AAC 192k). Video: H.264 High, CRF 18, yuv420p, +faststart.
"""
import json, os, sys, math, subprocess, importlib.util
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from multiprocessing import Pool

H = os.path.dirname(os.path.abspath(__file__)); REV = os.path.join(H, '..', 'revoice')
FONT = os.path.join(H, '..', '..', 'sau', 'fonts', 'node_modules', '@fontsource', 'fredoka', 'files', 'fredoka-latin-700-normal.woff')
LOGO = os.path.join(H, '..', 'film4', 'img', 'logo.png')
SCR = os.environ.get('SHORTS_SCRATCH', '/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/shorts')
OW, OH, FPS = 1080, 1920, 60
PIC_BOT, PIC_H, ASPECT = 1440, 1500, 1080 / 1500          # picture area: bottom at y 1440, full height 1500
INK, YEL, WHITE = (27, 27, 58), (255, 214, 10), (255, 255, 255)
SPEAKER = {'Heart': ((253, 124, 176), INK), 'Pip': ((201, 195, 236), INK), 'Momo': ((254, 136, 113), INK),
           'Basil': ((52, 207, 192), INK), 'Pip, Momo and Basil': ((254, 212, 9), INK)}

N = sys.argv[1]; CUT = '--cut' in sys.argv; PREVIEW = '--preview' in sys.argv
spec = importlib.util.spec_from_file_location('plan', os.path.join(H, f'plan_film{N}.py')); P = importlib.util.module_from_spec(spec); spec.loader.exec_module(P)
SRC = os.path.join(REV, f'film{N}_v2.mp4')
probe = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-count_packets', '-show_entries', 'stream=nb_read_packets,width,height',
                                   '-of', 'json', SRC], capture_output=True, text=True).stdout)['streams'][0]
NF = int(probe['nb_read_packets']); DUR = NF / FPS
KEEP = [(round(a * FPS) / FPS, round(b * FPS) / FPS) for a, b in P.CUT] if CUT else [(0, DUR)]   # source ranges kept, snapped to frames so sound and picture cut together
def kept(i):
    t = i / FPS; return any(a - 1e-9 <= t < b - 1e-9 for a, b in KEEP)
OUT_FRAMES = [i for i in range(NF) if kept(i)]; OUT_DUR = len(OUT_FRAMES) / FPS
END = getattr(P, 'END', 2.6)

# ---------------------------------------------------------------- the crop plan
def smooth(u): u = min(1, max(0, u)); return u * u * (3 - 2 * u)
def plan_at(t):
    cur = list(P.KF[0][2:5])
    for k in P.KF[1:]:
        t0, d, tgt = k[0], k[1], list(k[2:5])
        if t < t0 - 1e-9: break
        if d <= 0 or t >= t0 + d: cur = tgt
        else: u = smooth((t - t0) / d); cur = [a + (b - a) * u for a, b in zip(cur, tgt)]; break
    return cur

# ---------------------------------------------------------------- overlays (RGBA, made once per process)
def font(px): return ImageFont.truetype(FONT, px)
def text_img(lines, px, colours, stroke, shadow=True, gap=1.08):
    """lines: list of [(word, colour)]; returns a centred RGBA block with a stroke and a soft drop shadow"""
    f = font(px); sp = f.getlength(' ')
    widths = [sum(f.getlength(w) for w, _ in ln) + sp * (len(ln) - 1) for ln in lines]
    lh = int(px * gap); W = int(max(widths) + 2 * stroke + 40); Hh = int(lh * len(lines) + 2 * stroke + 40)
    im = Image.new('RGBA', (W, Hh), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for r, (ln, lw) in enumerate(zip(lines, widths)):
        x = (W - lw) / 2; y = 20 + stroke + r * lh
        for w, c in ln:
            d.text((x, y), w, font=f, fill=c, stroke_width=stroke, stroke_fill=INK); x += f.getlength(w) + sp
    if shadow:
        a = im.split()[3].filter(ImageFilter.GaussianBlur(px * .08)).point(lambda v: v * .55)
        sh = Image.new('RGBA', im.size, INK + (0,)); sh.putalpha(a)
        base = Image.new('RGBA', im.size, (0, 0, 0, 0)); base.alpha_composite(sh, (0, int(px * .06))); base.alpha_composite(im); im = base
    return im

def pill(label, bg, fg, px=40):
    f = font(px); w = int(f.getlength(label) + px * 1.1); h = int(px * 1.45)
    im = Image.new('RGBA', (w + 8, h + 8), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle([4, 4, w + 4, h + 4], radius=h // 2, fill=bg + (255,), outline=INK + (255,), width=4)
    d.text((w / 2 + 4, h / 2 + 4), label, font=f, fill=fg, anchor='mm'); return im

def chunks(words, key):
    """2-4 words per caption; break after punctuation; a single trailing word joins the chunk before"""
    out, cur = [], []
    for k, w in enumerate(words):
        cur.append(w); txt = ' '.join(x['w'] for x in cur); left = len(words) - k - 1
        if (len(cur) >= 3 and left != 1) or len(cur) == 4 or (w['w'][-1] in ',.!?:' and len(cur) >= 2 and left != 1) or (len(txt) >= 15 and len(cur) >= 2 and left != 1):
            out.append(cur); cur = []
    if cur:
        if len(cur) == 1 and out and len(out[-1]) < 4 and not out[-1][-1]['w'][-1] in '.!?': out[-1] += cur
        else: out.append(cur)
    return out

def build_captions():
    W = json.load(open(os.path.join(H, f'words_film{N}.json')))
    key = {k.lower() for k in getattr(P, 'KEY', [])}; caps = []
    for ln in W['lines']:
        cs = chunks(ln['words'], key)
        for j, c in enumerate(cs):
            s = c[0]['s'] - .06
            e = (cs[j + 1][0]['s'] - .06) if j + 1 < len(cs) else ln['end'] + .25
            words = [(x['w'], YEL if x['w'].lower().strip('.,!?:') in key else WHITE) for x in c]
            caps.append({'s': s, 'e': e, 'spk': ln['speaker'], 'words': words, 'first': j == 0})
    for a, b in zip(caps, caps[1:]):        # no flicker: hold a caption up to the next one if the gap is short
        if 0 < b['s'] - a['e'] < .35: a['e'] = b['s']
        a['e'] = min(a['e'], b['s'])
    for c in caps:
        f = font(88); ws = c['words']; total = sum(f.getlength(w) for w, _ in ws) + f.getlength(' ') * (len(ws) - 1)
        lines = [ws] if total <= 860 or len(ws) < 2 else [ws[:(len(ws) + 1) // 2], ws[(len(ws) + 1) // 2:]]
        c['img'] = text_img(lines, 88, None, 11); bg, fg = SPEAKER.get(c['spk'], ((220, 220, 220), INK))
        c['pill'] = pill(c['spk'], bg, fg)
    return caps

def build_hook():
    lines = P.HOOK; out = []
    for k, ln in enumerate(lines):
        out.append([(w, YEL if k == len(lines) - 1 else WHITE) for w in ln.split()])
    return text_img(out, getattr(P, 'HOOK_PX', 124), None, 15, gap=1.04)

def build_end():
    card = Image.new('RGBA', (OW, 820), (0, 0, 0, 0))
    logo = Image.open(LOGO).convert('RGBA').resize((250, 250), Image.LANCZOS); card.alpha_composite(logo, ((OW - 250) // 2, 0))
    t1 = text_img([[('Try', WHITE), ('TheOneApp', YEL)], [('free', WHITE)]], 118, None, 14, gap=1.02)
    card.alpha_composite(t1, ((OW - t1.width) // 2, 250))
    f = font(70); url = 'theoneapp.sg'; w = int(f.getlength(url) + 90); h = 118
    p = Image.new('RGBA', (w + 12, h + 12), (0, 0, 0, 0)); d = ImageDraw.Draw(p)
    d.rounded_rectangle([6, 6, w + 6, h + 6], radius=h // 2, fill=YEL + (255,), outline=INK + (255,), width=7)
    d.text((w / 2 + 6, h / 2 + 8), url, font=f, fill=INK, anchor='mm'); card.alpha_composite(p, ((OW - p.width) // 2, 250 + t1.height + 10))
    return card

def faded(im, a):
    if a >= .999: return im
    im = im.copy(); im.putalpha(im.split()[3].point(lambda v: int(v * a))); return im

# ---------------------------------------------------------------- one frame
G = {}
def init():
    G['caps'] = build_captions(); G['hook'] = build_hook(); G['end'] = build_end(); G['masks'] = {}
    ramp = np.linspace(0, 1, 90) ** 1.2
    G['topramp'] = ramp
    rr = (np.linspace(1, 0, OH - PIC_BOT) ** 1.6 * 150).astype(np.uint8)
    G['reflmask'] = Image.fromarray(np.repeat(rr[:, None], OW, 1), 'L')

def picmask(dh):
    if dh not in G['masks']:
        m = np.full((dh, OW), 255, np.uint8); n = min(90, dh); m[:n] = (G['topramp'][-n:] * 255 if n < 90 else G['topramp'] * 255).astype(np.uint8)[:, None]
        G['masks'][dh] = Image.fromarray(m, 'L')
    return G['masks'][dh]

def render(frame, t, tout):
    im = Image.frombuffer('RGB', (1920, 1080), frame, 'raw', 'RGB', 0, 1)
    cx, w, yb = plan_at(t); w = min(1920, max(200, w)); yb = min(1080, yb)
    h = min(w / ASPECT, yb); top = yb - h; x0 = min(1920 - w, max(0, cx - w / 2))
    dh = int(round(h * OW / w)); Y = PIC_BOT - dh
    # blurred, zoomed fill of the same frame
    small = im.resize((240, 135), Image.BOX)
    bw = 135 * OW / OH; bx = min(240 - bw, max(0, cx / 8 - bw / 2))
    bg = small.resize((54, 96), Image.BILINEAR, box=(bx, 0, bx + bw, 135)).filter(ImageFilter.GaussianBlur(2.2)).resize((OW, OH), Image.BICUBIC)
    canvas = Image.eval(bg, lambda v: int(v * .6))
    pic = im.resize((OW, dh), Image.BICUBIC, box=(x0, top, x0 + w, yb))
    if Y >= 0: canvas.paste(pic, (0, Y), picmask(dh) if Y > 4 else None)
    else: canvas.paste(pic.crop((0, -Y, OW, dh)), (0, 0))
    # soft reflection under the picture (the Shorts UI zone)
    rh = min(dh, OH - PIC_BOT)
    refl = pic.crop((0, dh - rh, OW, dh)).transpose(Image.FLIP_TOP_BOTTOM).resize((OW // 6, max(1, rh // 6)), Image.BOX)
    refl = refl.filter(ImageFilter.GaussianBlur(1.5)).resize((OW, rh), Image.BICUBIC)
    refl = Image.eval(refl, lambda v: int(v * .7)); canvas.paste(refl, (0, PIC_BOT), G['reflmask'].crop((0, 0, OW, rh)))
    # end card: the picture dims, then the card
    ea = smooth((tout - (OUT_DUR - END)) / .35)
    if ea > 0:      # the picture goes soft and dark under the card
        soft = canvas.resize((OW // 8, OH // 8), Image.BOX).filter(ImageFilter.GaussianBlur(1.2)).resize((OW, OH), Image.BICUBIC)
        canvas = Image.blend(Image.blend(canvas, soft, ea), Image.new('RGB', canvas.size, INK), .5 * ea)
    # captions (hidden under the end card and the hook)
    for c in G['caps']:
        if c['s'] <= t < c['e'] and ea < .5:
            age = t - c['s']; pop = 1 + .12 * max(0, 1 - age / .12) ** 2 if age < .12 else 1.0
            img = c['img'] if pop == 1 else c['img'].resize((int(c['img'].width * pop), int(c['img'].height * pop)), Image.BILINEAR)
            cy = getattr(P, 'CAP_Y', 640)
            for (a, b, y) in getattr(P, 'CAP_Y_AT', []):
                if a <= t < b: cy = y
            CX = 520
            canvas.paste(img, (int(CX - img.width / 2), int(cy - img.height / 2)), img)
            pl = c['pill']; canvas.paste(pl, (int(CX - pl.width / 2), int(cy - c['img'].height / 2 - pl.height + 14)), pl)
    # hook title over the opening (the first frame is the cover: full strength from frame 0)
    ha = 1 - smooth((tout - getattr(P, 'HOOK_OUT', 1.35)) / .3)
    if ha > 0:
        hk = faded(G['hook'], ha); canvas.paste(hk, (int(520 - hk.width / 2), getattr(P, 'HOOK_Y', 250)), hk)
    if ea > 0:
        e = faded(G['end'], ea); dy = int((1 - ea) * 40); canvas.paste(e, (0, 430 + dy), e)
    return canvas.tobytes()

def work(args):
    i, tout, buf = args
    return render(buf, i / FPS, tout)

# ---------------------------------------------------------------- main
def frames(sel_times=None):
    vf = 'null' if sel_times is None else 'select=' + '+'.join(f'eq(n\\,{int(round(t * FPS))})' for t in sel_times)
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', SRC, '-vf', vf, '-vsync', '0', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE, bufsize=1920 * 1080 * 3 * 2)
    i = 0
    while True:
        b = p.stdout.read(1920 * 1080 * 3)
        if len(b) < 1920 * 1080 * 3: break
        yield i, b; i += 1
    p.wait()

if __name__ == '__main__':
    if PREVIEW:
        step = float(sys.argv[sys.argv.index('--preview') + 1]) if len(sys.argv) > sys.argv.index('--preview') + 1 else 1.0
        t0 = float(os.environ.get('T0', 0)); t1 = float(os.environ.get('T1', DUR))
        ts = [round(t * FPS) / FPS for t in np.arange(t0, t1, step)]
        init(); tiles = []
        for (k, b), t in zip(frames(ts), ts):
            tw = int(os.environ.get('PW', 216)); th = tw * 16 // 9
            img = Image.frombytes('RGB', (OW, OH), render(b, t, t)).resize((tw, th), Image.BILINEAR)
            d = ImageDraw.Draw(img); d.rectangle([0, 0, 52, 14], fill='black'); d.text((2, 1), f'{t:.2f}', fill='yellow')
            d.line([0, th * 3 // 4, tw, th * 3 // 4], fill=(255, 0, 0)); d.line([tw * 190 // 216, 0, tw * 190 // 216, th], fill=(255, 0, 0)); tiles.append(img)
        cols = int(os.environ.get('COLS', 10)); sh = Image.new('RGB', (cols * (tw + 4), ((len(tiles) + cols - 1) // cols) * (th + 4)), 'white')
        for k, im in enumerate(tiles): sh.paste(im, ((k % cols) * (tw + 4), (k // cols) * (th + 4)))
        out = os.path.join(SCR, f'preview{N}.jpg'); sh.save(out, quality=85); print(out); sys.exit()

    out = os.path.join(H, f'film{N}_short60.mp4' if CUT else f'film{N}_short.mp4')
    # audio: the kept ranges of the film's own mix (a 60 ms fade at each join of the ad cut), AAC 192k
    if CUT:
        parts = ''.join(f'[1:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.06,afade=t=out:st={b - a - 0.06:.3f}:d=0.06[a{k}];' for k, (a, b) in enumerate(KEEP))
        afil = ['-filter_complex', parts + ''.join(f'[a{k}]' for k in range(len(KEEP))) + f'concat=n={len(KEEP)}:v=0:a=1[aout]', '-map', '0:v', '-map', '[aout]']
    else:
        afil = ['-map', '0:v', '-map', '1:a']
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{OW}x{OH}', '-r', str(FPS), '-i', '-', '-i', SRC] + afil +
                           ['-c:v', 'libx264', '-profile:v', 'high', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', str(FPS),
                            '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
                            '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', f'{OUT_DUR:.4f}', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    keep = set(OUT_FRAMES); pos = {i: k for k, i in enumerate(OUT_FRAMES)}
    def jobs():
        for i, b in frames():
            if i in keep: yield (i, pos[i] / FPS, b)
    n = 0
    with Pool(3, initializer=init) as pool:
        for out_bytes in pool.imap(work, jobs(), chunksize=4):
            enc.stdin.write(out_bytes); n += 1
            if n % 600 == 0: print(f'  {n}/{len(OUT_FRAMES)} frames', flush=True)
    enc.stdin.close(); enc.wait(); print('wrote', out, n, 'frames', f'{OUT_DUR:.3f}s')
