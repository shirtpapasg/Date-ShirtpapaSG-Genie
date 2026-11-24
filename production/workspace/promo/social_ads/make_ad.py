"""make_ad.py: the two PARENT-FACING ads (15 s and 30 s), each as 9:16 (1080x1920) and 4:5 (1080x1350), 30 fps, H.264 + AAC, -14 LUFS.
  python3 make_ad.py 15|30 [9x16|4x5 ...]          (CPU for more than a minute: run under  flock /tmp/explained_render.lock)
  python3 make_ad.py still 15|30 9x16|4x5 <t> <out.png> [--zones]     (one frame; --zones draws the platform safe zones on it)

Pictures: REAL app screens only (shots/, from capture_live.js and capture_local.js), plus 2.2 s of promo film 4 (the quiz that pays
+10 credits; labelled "From our animated film"). Every app screen carries a small "Real app screen" chip.
Words: script.py (Heart's lines, the burned-in captions). Voice: voice/<id>.wav (make_voice.py). Music: Kampong Walk, ducked under Heart.
Layout (9:16): every caption and the end card's words sit inside the union of the Meta Reels/Stories safe zone (top 14 %, bottom 35 %,
sides 6 %) and TikTok's (top ~12.5 %, bottom ~34 %, sides ~11 %, and the button rail on the right below ~44 % of the height); see
ADS_NOTES.md. Text box: x 120-960, y 290-800 (end card: x 140-940 above y 840). The app picture sits under the captions (y 530-1250).
Nothing is written to disk but the finished mp4 (and a temporary mix .wav, deleted)."""
import os, sys, json, re, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
H = os.path.dirname(os.path.abspath(__file__)); SH = os.path.join(H, 'shots'); sys.path.insert(0, H)
from script import AD15, AD30
W2 = os.path.join(H, '..', '..')
FONT = os.path.join(W2, 'sau', 'fonts', 'node_modules', '@fontsource', 'fredoka', 'files', 'fredoka-latin-%d-normal.woff')
LOGO = os.path.join(H, '..', 'film4', 'img', 'logo.png'); PIP = '/home/user/theoneapp/chin-cheer.png'
FILM4 = os.path.join(H, '..', 'film4', 'film4_v4.mp4'); MUSIC = os.path.join(W2, 'explained2', 'music', 'kampong_walk.wav')
FPS = 30; XF = 0.22; YEL = (255, 216, 77); NAVY = (14, 18, 52)
FMT = {'9x16': dict(W=1080, H=1920, card=(100, 530, 980, 1250), cap_y=395, cap_w=840, cap_px=74),
       '4x5': dict(W=1080, H=1350, card=(90, 250, 990, 1165), cap_y=135, cap_w=920, cap_px=66)}

# ── the running orders. roi = the part of the screen (source px, y from / to) to keep in view; it eases from roi0 to roi1 ──
APP = 'Real app screen'
def S(src, t0, t1, roi0, roi1=None, cx=None, w=None, w1=None, chip=APP, **k): return dict(src=src, t0=t0, t1=t1, roi0=roi0, roi1=roi1 or roi0, cx=cx, w=w, w1=w1, chip=chip, **k)
ADS = {
  15: dict(T=15.0, lines=AD15, voice={'h1': .10, 'h2': 3.30, 'h3': 10.25}, end=None, shots=[
    S('mk_fb_full', 0.0, 3.3, (380, 1330), w=1170, w1=1060),                       # hook: the real verdict "Half the concept is there"
    S('typing', 3.3, 5.1, (1080, 2040), reveal=(3.45, 4.95)),                       # the pupil writes the answer
    S('mk_fb_full', 5.1, 6.7, (1000, 1880), (1250, 2050)),                          # what to keep, what is worth adding
    S('mk_fb_full', 6.7, 8.9, (1900, 2640)),                                        # the hint ("Something to think about")
    S('mk_done_full', 8.9, 9.7, (440, 1600)),                                       # 2nd try: correct and complete, 2/2
    S('darkbox', 9.7, 10.3, (0, 1230), cx=640, w=1517),                             # School Lab, Dark Box (P4 Light)
    S('videos', 10.3, 12.3, (300, 1250), (500, 1450)),                              # the videos page: Primary 3, 4, 5, 6
  ]),
  30: dict(T=30.0, lines=AD30, voice={'a1': .10, 'a2': 3.00, 'a3': 8.60, 'a4': 13.50, 'a5': 16.70, 'a6': 20.10, 'a7': 26.70}, end=None, shots=[
    S('mk_fb_full', 0.0, 3.0, (380, 1330), w=1170, w1=1060),
    S('typing', 3.0, 5.8, (1080, 2040), reveal=(3.3, 5.3)),
    S('mk_fb_full', 5.8, 8.6, (1000, 1880), (1250, 2050)),
    S('mk_fb_full', 8.6, 10.5, (1900, 2640)),
    S('mk_done_full', 10.5, 13.4, (440, 1600), (1700, 2850)),                       # 2/2, then the full answer
    S('videos', 13.4, 14.4, (300, 1250)),
    S('darkbox', 14.4, 15.5, (0, 1230), cx=640, w=1517),
    S('mapland', 15.5, 16.6, (100, 1146), cx=885, w=1290),                          # Mind Maps: the Light poster drawing itself
    S('report_full', 16.6, 20.1, (0, 1000), (900, 2150), chip='Real report · one demo session'),
    S('film', 20.1, 22.3, (0, 720), film=(31.6, 960, 720), chip='From our animated film'),   # the quiz pays +10 credits
    S('shop', 22.3, 23.7, (300, 1250), (840, 1790)),
    S('dress', 23.7, 24.8, (300, 1300)),
    S('buddies', 24.8, 26.5, (1300, 2260)),
  ]),
}

def font(px, wt=700): return ImageFont.truetype(FONT % wt, px)
def smooth(u): u = min(1., max(0., u)); return u * u * (3 - 2 * u)
def ease(a, b, u): return a + (b - a) * smooth(u)

# ── captions: chunk timing inside each recorded line, by share of characters ──
def wav_len(p): return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))
def caption_track(ad):
    out = []
    for lid, text, chunks in ad['lines']:
        t0 = ad['voice'][lid]; d = wav_len(os.path.join(H, 'voice', lid + '.wav')); n = [len(c.replace('*', '')) + 3 for c in chunks]; tot = sum(n); acc = 0
        for c, k in zip(chunks, n): out.append([t0 + d * acc / tot, None, c, lid]); acc += k
        out[-1].append(t0 + d)
    for i, c in enumerate(out):   # a chunk stays until the next one (or 0.35 s after its line ends, if a gap follows)
        nxt = out[i + 1][0] if i + 1 < len(out) else 99
        end = c[4] + .35 if len(c) > 4 else nxt
        c[1] = min(nxt, end) if len(c) > 4 else nxt
    out[0][0] = 0.0   # frame 0 already carries the hook's words (the cover frame)
    return [(a, b, c, l) for a, b, c, l, *_ in out]

def text_img(chunk, px, maxw):
    while True:
        f = font(px); words = re.findall(r'\*[^*]+\*|[^*\s]+', chunk); parts = []
        for w in words: parts.append((w.strip('*'), YEL if w.startswith('*') else (255, 255, 255)))
        sp = f.getlength(' '); tw = sum(f.getlength(t) for t, _ in parts) + sp * (len(parts) - 1)
        if tw <= maxw - 30 or px < 40: break
        px -= 4
    st = max(6, px // 9); im = Image.new('RGBA', (int(tw) + 2 * st + 40, int(px * 1.45) + 2 * st), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    x = st + 20; y = st
    sh = Image.new('RGBA', im.size, (0, 0, 0, 0)); ds = ImageDraw.Draw(sh)
    for t, c in parts: ds.text((x + 4, y + 6), t, font=f, fill=(0, 0, 0, 150), stroke_width=st, stroke_fill=(0, 0, 0, 150)); x += f.getlength(t) + sp
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(6))); x = st + 20
    for t, c in parts: d.text((x, y), t, font=f, fill=c, stroke_width=st, stroke_fill=NAVY); x += f.getlength(t) + sp
    return im

def chip_img(label, px=30):
    f = font(px, 600); w = int(f.getlength(label)) + 64; h = px + 26; im = Image.new('RGBA', (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, w - 1, h - 1), radius=h // 2, fill=(10, 14, 34, 215), outline=(120, 200, 255, 160), width=2)
    d.ellipse((18, h // 2 - 7, 32, h // 2 + 7), fill=(80, 220, 140)); d.text((42, 11), label, font=f, fill=(235, 242, 255)); return im

# ── sources ──
_img = {}
def src(name):
    if name not in _img: _img[name] = Image.open(os.path.join(SH, name + '.jpg')).convert('RGB')
    return _img[name]
def typing_parts():
    """The answer box: the typed screen (focused box) with its text lines blanked is the base; the lines are then revealed left to
    right. Only the box's inside is compared (its border changes colour on focus and must not wipe in with the words)."""
    a, b = src('mk_ask'), src('mk_typed'); x0, y0, x1, y1 = 140, 1580, 1060, 1985
    d = np.asarray(ImageChops.difference(a.crop((x0, y0, x1, y1)), b.crop((x0, y0, x1, y1))).convert('L')) > 40
    rows = np.where(d.any(1))[0]; lines = []; s = rows[0]; p = rows[0]
    for r in rows[1:]:
        if r - p > 12: lines.append((s, p)); s = r
        p = r
    lines.append((s, p)); out = []; base = b.copy(); bg = b.getpixel((x0 + 20, y1 - 20)); dr = ImageDraw.Draw(base)
    for s, e in lines:
        if e - s < 15: continue   # not a line of text
        cols = np.where(d[s:e + 1].any(0))[0]; r = (x0 + int(cols[0]) - 4, y0 + s - 8, x0 + int(cols[-1]) + 6, y0 + e + 10); out.append(r); dr.rectangle(r, fill=bg)
    return base, b, out
def film_frames(t0, w, h, dur):
    raw = subprocess.check_output(['ffmpeg', '-loglevel', 'error', '-ss', str(t0), '-t', str(dur + .2), '-i', FILM4, '-vf',
        f'fps={FPS},crop=1200:900:360:0,scale={w}:{h}:flags=lanczos', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'])
    n = len(raw) // (w * h * 3); return [Image.frombuffer('RGB', (w, h), raw[i * w * h * 3:(i + 1) * w * h * 3]) for i in range(n)]

class Shot:
    def __init__(s, sp, fm):
        s.sp, s.fm = sp, fm; x0, y0, x1, y1 = fm['card']; s.cw, s.ch = x1 - x0, y1 - y0
        if sp['src'] == 'typing': s.base, s.top, s.lines = typing_parts(); s.img = s.top
        elif sp['src'] == 'film': s.frames = film_frames(sp['film'][0], sp['film'][1], sp['film'][2], sp['t1'] - sp['t0']); s.img = s.frames[0]
        else: s.img = src(sp['src'])
        s.mask = Image.new('L', (s.cw, s.ch), 0); ImageDraw.Draw(s.mask).rounded_rectangle((0, 0, s.cw - 1, s.ch - 1), radius=34, fill=255)
        s.chip = chip_img(sp['chip']) if sp['chip'] else None
        s.bg = s.make_bg()
        g = Image.new('RGBA', (s.cw + 80, s.ch + 80), (0, 0, 0, 0)); ImageDraw.Draw(g).rounded_rectangle((40, 40, s.cw + 40, s.ch + 40), radius=36, fill=(110, 170, 255, 110))
        s.glow = g.filter(ImageFilter.GaussianBlur(18))
    def rect(s, u, im):
        sp = s.sp; iw, ih = im.size; w = ease(sp['w'] or iw, sp['w1'] or sp['w'] or iw, u); w = min(w, iw); h = w * s.ch / s.cw
        if h > ih: h = ih; w = h * s.cw / s.ch
        cx = sp['cx'] if sp['cx'] is not None else iw / 2; x = min(max(0, cx - w / 2), iw - w)
        ra, rb = sp['roi0']; qa, qb = sp['roi1']; c = ease((ra + rb) / 2, (qa + qb) / 2, u); y = min(max(0, c - h / 2), ih - h)
        return (x, y, x + w, y + h)
    def picture(s, t):
        sp = s.sp; u = (t - sp['t0']) / max(.01, sp['t1'] - sp['t0'])
        if sp['src'] == 'film': im = s.frames[min(len(s.frames) - 1, int((t - sp['t0']) * FPS))]
        elif sp['src'] == 'typing':
            a, b = sp['reveal']; p = smooth((t - a) / (b - a)) if t > a else 0; im = s.base.copy()
            tot = sum(r[2] - r[0] for r in s.lines); done = p * tot
            for r in s.lines:
                ww = r[2] - r[0]; k = min(ww, max(0, done)); done -= ww
                if k > 0: im.paste(s.top.crop((r[0], r[1], int(r[0] + k), r[3])), (r[0], r[1]))
        else: im = s.img
        return im.resize((s.cw, s.ch), Image.LANCZOS, box=s.rect(u, im), reducing_gap=2.0)
    def make_bg(s):
        fm = s.fm; im = s.img.resize((s.cw, s.ch), Image.BILINEAR, box=s.rect(0, s.img)); W, Hh = fm['W'], fm['H']
        k = max(W / s.cw, Hh / s.ch) * 1.15; im = im.resize((int(s.cw * k), int(s.ch * k)), Image.BILINEAR)
        im = im.crop(((im.width - W) // 2, (im.height - Hh) // 2, (im.width - W) // 2 + W, (im.height - Hh) // 2 + Hh)).filter(ImageFilter.GaussianBlur(38))
        a = np.asarray(im).astype(np.float32) * .38 + np.array([10, 12, 40], np.float32) * .62
        return Image.fromarray(a.clip(0, 255).astype(np.uint8))
    def draw(s, t):
        fm = s.fm; fr = s.bg.copy(); x0, y0, _, _ = fm['card']
        fr.paste(s.glow, (x0 - 40, y0 - 40), s.glow)
        fr.paste(s.picture(t), (x0, y0), s.mask)
        ImageDraw.Draw(fr).rounded_rectangle((x0, y0, x0 + s.cw - 1, y0 + s.ch - 1), radius=34, outline=(150, 200, 255), width=3)
        if s.fm.get('footer') is not None: fr.paste(s.fm['footer'], (0, fm['H'] - s.fm['footer'].height), s.fm['footer'])
        if s.chip: fr.paste(s.chip, (x0 + 26, y0 - s.chip.height // 2), s.chip)   # on the card's top border: covers no app text
        return fr

# ── the end card ──
def end_card(fm, u):
    W, Hh = fm['W'], fm['H']; tall = Hh > 1500
    yy, xx = np.mgrid[0:Hh, 0:W].astype(np.float32); cy = 560 if tall else 420
    r = np.sqrt((xx - W / 2) ** 2 + ((yy - cy) * .8) ** 2) / 900
    base = np.stack([12 + 8 * (yy / Hh), 14 + 4 * (yy / Hh), 44 + 30 * (yy / Hh)], -1) + (np.clip(1 - r, 0, 1) ** 2)[..., None] * np.array([60, 70, 150])
    im = Image.fromarray(base.clip(0, 255).astype(np.uint8)).convert('RGBA'); d = ImageDraw.Draw(im)
    gr = Image.new('RGBA', im.size, (0, 0, 0, 0)); dg = ImageDraw.Draw(gr)   # a faint grid, like the app's home screen
    for gx in range(0, W, 60): dg.line((gx, 0, gx, Hh), fill=(255, 255, 255, 14))
    for gy in range(0, Hh, 60): dg.line((0, gy, W, gy), fill=(255, 255, 255, 14))
    im.alpha_composite(gr)
    def put(el, cx, y, k):   # staggered rise-in
        a = smooth((u - k * .12) / .35); el = el.copy(); el.putalpha(el.getchannel('A').point(lambda v: int(v * a)))
        im.alpha_composite(el, (int(cx - el.width / 2), int(y + 30 * (1 - a))))
    L = 230 if tall else 200; logo = Image.open(LOGO).convert('RGBA').resize((L, L), Image.LANCZOS)
    def words(parts, px, wt=700, stroke=0):
        f = font(px, wt); tw = sum(f.getlength(t) for t, _ in parts); e = Image.new('RGBA', (int(tw) + 20 + 2 * stroke, int(px * 1.35) + 2 * stroke), (0, 0, 0, 0)); dd = ImageDraw.Draw(e); x = 10 + stroke
        for t, c in parts: dd.text((x, stroke), t, font=f, fill=c, stroke_width=stroke, stroke_fill=NAVY); x += f.getlength(t)
        return e
    name = words([('The', (255, 255, 255)), ('One', (255, 166, 43)), ('App', (255, 255, 255))], 108 if tall else 96, stroke=5)
    sub = words([('Primary 3–6 Science · MOE syllabus (2023)', (200, 214, 255))], 38 if tall else 34, 500)
    cta1 = words([('Try it ', (255, 255, 255)), ('free', YEL), (' at', (255, 255, 255))], 64 if tall else 56, stroke=4)
    url = words([('theoneapp.sg', YEL)], 100 if tall else 86, stroke=6)
    pill = Image.new('RGBA', (url.width + 70, url.height + 34), (0, 0, 0, 0)); ImageDraw.Draw(pill).rounded_rectangle((0, 0, pill.width - 1, pill.height - 1), radius=pill.height // 2, fill=(124, 92, 255, 120), outline=YEL, width=4)
    pill.alpha_composite(url, (35, 12))
    pip = Image.open(PIP).convert('RGBA'); pip.thumbnail((260, 260) if tall else (190, 190))
    if tall:   # 9:16: every word between y 290 and 840, x 140-940 (clear of both apps' buttons and captions)
        lg = logo.resize((150, 150), Image.LANCZOS); row = Image.new('RGBA', (lg.width + 16 + name.width, max(lg.height, name.height)), (0, 0, 0, 0))
        row.alpha_composite(lg, (0, (row.height - lg.height) // 2)); row.alpha_composite(name, (lg.width + 16, (row.height - name.height) // 2 + 6))
        put(row, W / 2, 290, 0); put(sub, W / 2, 462, 1); put(cta1, W / 2, 545, 2); put(pill, W / 2, 635, 3)   # all words end by y ~800
        put(pip, W / 2, 900, 4)
    else:
        teach = words([('Built by a Singapore Primary Science teacher', (200, 214, 255))], 32, 500)
        put(logo, W / 2, 60, 0); put(name, W / 2, 268, 1); put(sub, W / 2, 392, 2); put(cta1, W / 2, 520, 3); put(pill, W / 2, 600, 4)
        put(teach, W / 2, 770, 5); put(pip, W / 2, 860, 5)
    return im.convert('RGB')

# ── the frame ──
def footer(W):   # 4:5 feed only (no app buttons over it): the name and the address, under the picture
    im = Image.new('RGBA', (W, 170), (0, 0, 0, 0)); lg = Image.open(LOGO).convert('RGBA').resize((76, 76), Image.LANCZOS); f = font(40); g = font(40, 500)
    parts = [('The', (255, 255, 255)), ('One', (255, 166, 43)), ('App', (255, 255, 255)), ('  ·  theoneapp.sg', (200, 214, 255))]
    tw = sum((f if i < 3 else g).getlength(t) for i, (t, _) in enumerate(parts)); x = (W - tw - 96) / 2; im.alpha_composite(lg, (int(x), 50)); x += 96; d = ImageDraw.Draw(im)
    for i, (t, c) in enumerate(parts): ff = f if i < 3 else g; d.text((x, 64), t, font=ff, fill=c); x += ff.getlength(t)
    return im

class Ad:
    def __init__(s, n, fk):
        s.ad = ADS[n]; s.fm = dict(FMT[fk]); s.fm['footer'] = footer(s.fm['W']) if fk == '4x5' else None; s.fk = fk; s.caps = caption_track(s.ad)
        s.end_t = next(a for a, b, c, l in s.caps if 'free' in c) - .15   # the end card arrives as Heart says "Try it free"
        s.shots = [Shot(sp, s.fm) for sp in s.ad['shots']]; s.shots[-1].sp['t1'] = s.end_t
        s.capim = {}; s.end_cache = {}
    def cap(s, c):
        if c not in s.capim: s.capim[c] = text_img(c, s.fm['cap_px'], s.fm['cap_w'])
        return s.capim[c]
    def frame(s, t):
        if t >= s.end_t:
            u = min(1.0, (t - s.end_t) / .9); k = round(u * 27)
            if k not in s.end_cache: s.end_cache[k] = end_card(s.fm, k / 27)
            fr = s.end_cache[k]
            if t - s.end_t < XF: fr = Image.blend(s.shot_at(s.end_t - .001), fr, (t - s.end_t) / XF)
            return fr
        fr = s.shot_at(t)
        for a, b, c, l in s.caps:
            if a <= t < b:
                im = s.cap(c); p = smooth((t - a) / .14) if a > 0 else 1; sc = .9 + .1 * p
                if sc < .999: im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.BILINEAR)
                if p < 1: im = im.copy(); im.putalpha(im.getchannel('A').point(lambda v: int(v * p)))
                fr.paste(im, (int(s.fm['W'] / 2 - im.width / 2), int(s.fm['cap_y'] - im.height / 2)), im)
        return fr
    def shot_at(s, t):
        i = max(k for k, sh in enumerate(s.shots) if sh.sp['t0'] <= t + 1e-6); fr = s.shots[i].draw(t)
        if i > 0 and t - s.shots[i].sp['t0'] < XF: fr = Image.blend(s.shots[i - 1].draw(t), fr, (t - s.shots[i].sp['t0']) / XF)
        return fr

# ── sound: Heart + Kampong Walk ducked under her, -14 LUFS ──
SR = 48000
def read_audio(p, ch, t0=0, dur=None):
    a = ['ffmpeg', '-loglevel', 'error', '-ss', str(t0)] + (['-t', str(dur)] if dur else []) + ['-i', p, '-f', 'f32le', '-ac', str(ch), '-ar', str(SR), '-']
    return np.frombuffer(subprocess.check_output(a), np.float32).reshape(-1, ch).copy()
def mix(n, out):
    ad = ADS[n]; T = ad['T']; N = int(T * SR); v = np.zeros(N, np.float32); on = np.zeros(N, np.float32)
    for lid, t0 in ad['voice'].items():
        x = read_audio(os.path.join(H, 'voice', lid + '.wav'), 1)[:, 0]; i = int(t0 * SR); x = x[:N - i]; v[i:i + len(x)] += x; on[i:i + len(x)] = 1
    k = int(.25 * SR); on = np.convolve(on, np.ones(k) / k, 'same').clip(0, 1)   # smooth duck in/out (~0.25 s)
    m = read_audio(MUSIC, 2, 0, T + .1)[:N]
    g = 10 ** ((-10 + (-19 - -10) * on) / 20)   # music -10 dB alone, -19 dB under Heart (relative; loudnorm sets the total)
    fade = np.ones(N, np.float32); fade[:int(.25 * SR)] = np.linspace(0, 1, int(.25 * SR)); fade[-int(1.4 * SR):] = np.linspace(1, 0, int(1.4 * SR))
    y = m * (g * fade)[:, None] + (v * 1.8)[:, None]
    raw = out + '.raw.wav'; subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', raw], input=y.astype(np.float32).tobytes(), check=True)
    st = subprocess.run(['ffmpeg', '-hide_banner', '-i', raw, '-af', 'loudnorm=I=-14:TP=-2:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    j = json.loads(st[st.rindex('{'):st.rindex('}') + 1])
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', raw, '-af', f"loudnorm=I=-14:TP=-2:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,aresample={SR}", '-ar', str(SR), out], check=True)
    os.remove(raw)

def render(n, fk):
    ad = Ad(n, fk); T = ADS[n]['T']; out = os.path.join(H, f'ad{n}_{fk}.mp4'); wav = os.path.join(H, f'.mix_{n}_{fk}.wav'); mix(n, wav)
    W, Hh = ad.fm['W'], ad.fm['H']
    p = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{Hh}', '-r', str(FPS), '-i', '-', '-i', wav,
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
        '-c:a', 'aac', '-b:a', '192k', '-ar', str(SR), '-movflags', '+faststart', '-t', str(T), out], stdin=subprocess.PIPE)
    for i in range(int(round(T * FPS))):
        p.stdin.write(ad.frame(i / FPS).tobytes())
        if i % 150 == 0: print(f'  ad{n} {fk} {i / FPS:.1f}s', flush=True)
    p.stdin.close(); p.wait(); os.remove(wav); print('done', out)

if __name__ == '__main__':
    if sys.argv[1] == 'still':
        n, fk, t, out = int(sys.argv[2]), sys.argv[3], float(sys.argv[4]), sys.argv[5]; Ad(n, fk).frame(t).save(out); print('still', out)
    else:
        for fk in (sys.argv[2:] or ['9x16', '4x5']): render(int(sys.argv[1]), fk)
