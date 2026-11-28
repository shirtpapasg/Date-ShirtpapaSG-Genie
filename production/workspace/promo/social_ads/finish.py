"""finish.py: checks and previews for the four ads.
  python3 finish.py <out_dir>
-> <out_dir>/ad{15,30}_{9x16,4x5}_720.mp4 (720 px wide previews, each under 15 MB), contact_ad{15,30}_{9x16,4x5}.jpg (one frame a second),
   safezones_9x16.jpg (the 15 s ad's 9:16 frames with Meta's and TikTok's covered areas drawn on), and checks.json (size, length,
   fps, loudness, true peak of every file). Reads the finished mp4s; writes nothing next to them."""
import os, sys, json, subprocess, io
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
FONT = os.path.join(H, '..', '..', 'sau', 'fonts', 'node_modules', '@fontsource', 'fredoka', 'files', 'fredoka-latin-600-normal.woff')
NAMES = [f'ad{n}_{k}' for n in (15, 30) for k in ('9x16', '4x5')]

def probe(p):
    j = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,width,height,r_frame_rate,sample_rate', '-of', 'json', p]))
    return j
def loud(p):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', p, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    s = e[e.rindex('Summary:'):]; I = float(s.split('I:')[1].split('LUFS')[0]); tp = float(s.split('Peak:')[1].split('dBFS')[0]); return I, tp
def frame(p, t):
    return Image.open(io.BytesIO(subprocess.check_output(['ffmpeg', '-loglevel', 'error', '-ss', str(t), '-i', p, '-frames:v', '1', '-f', 'image2', '-c:v', 'png', '-'])))

checks = {}
for n in NAMES:
    src = os.path.join(H, n + '.mp4'); pv = os.path.join(OUT, n + '_720.mp4')
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-vf', 'scale=720:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
                    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', pv], check=True)
    j = probe(src); v = [s for s in j['streams'] if s['codec_name'] == 'h264'][0]; a = [s for s in j['streams'] if s['codec_name'] == 'aac'][0]; I, tp = loud(src)
    checks[n] = dict(seconds=round(float(j['format']['duration']), 3), MB=round(int(j['format']['size']) / 1e6, 2), size=f"{v['width']}x{v['height']}", fps=v['r_frame_rate'],
                     audio_hz=a['sample_rate'], LUFS=I, true_peak_dBTP=tp, preview_MB=round(os.path.getsize(pv) / 1e6, 2))
    T = float(j['format']['duration']); ts = [i + .5 for i in range(int(T))]; tw = 216; th = int(tw * v['height'] / v['width'])
    sheet = Image.new('RGB', (tw * 5, th * ((len(ts) + 4) // 5)), (20, 20, 30)); d = ImageDraw.Draw(sheet); f = ImageFont.truetype(FONT, 22)
    for i, t in enumerate(ts):
        sheet.paste(frame(src, t).resize((tw, th)), ((i % 5) * tw, (i // 5) * th)); d.text(((i % 5) * tw + 6, (i // 5) * th + 4), f'{t:.1f}s', font=f, fill=(255, 230, 0), stroke_width=2, stroke_fill=(0, 0, 0))
    sheet.save(os.path.join(OUT, f'contact_{n}.jpg'), quality=85); print(n, checks[n])

# the safe zones on the 9:16 (1080 x 1920): Meta Reels/Stories (top 14 %, bottom 35 %, sides 6 %) and TikTok (third-party measurements of
# TikTok's own template: top ~12.5 %, bottom ~34.4 %, sides ~11.1 %, and the button rail, the right 27.8 % below 43.8 % of the height)
def zones(im):
    im = im.convert('RGBA'); o = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(o); W, Hh = im.size; f = ImageFont.truetype(FONT, 30)
    for r in [(0, 0, W, int(.14 * Hh)), (0, int(.65 * Hh), W, Hh), (0, 0, int(.06 * W), Hh), (W - int(.06 * W), 0, W, Hh)]: d.rectangle(r, fill=(255, 40, 60, 70))
    tk = [(0, 0, W, int(.125 * Hh)), (0, Hh - int(.344 * Hh), W, Hh), (0, 0, int(.111 * W), Hh), (W - int(.111 * W), 0, W, Hh), (W - int(.278 * W), int(.438 * Hh), W, Hh)]
    for r in tk: d.rectangle(r, outline=(60, 230, 255, 255), width=4)
    d.rectangle((120, 280, 960, 840), outline=(80, 255, 120, 255), width=5)
    d.text((24, 20), 'red: Meta Reels/Stories covered (14% / 35% / 6%)', font=f, fill=(255, 255, 255), stroke_width=3, stroke_fill=(0, 0, 0))
    d.text((24, 60), 'cyan: TikTok covered (approx. template)', font=f, fill=(255, 255, 255), stroke_width=3, stroke_fill=(0, 0, 0))
    d.text((130, 846), 'green: where every caption and CTA sits', font=f, fill=(140, 255, 160), stroke_width=3, stroke_fill=(0, 0, 0))
    return Image.alpha_composite(im, o).convert('RGB')
src = os.path.join(H, 'ad15_9x16.mp4'); a, b = zones(frame(src, 4.2)), zones(frame(src, 14.5))
z = Image.new('RGB', (2 * 1080 + 40, 1920), (30, 30, 40)); z.paste(a, (0, 0)); z.paste(b, (1120, 0)); z.resize((1080, 960)).save(os.path.join(OUT, 'safezones_9x16.jpg'), quality=88)
json.dump(checks, open(os.path.join(OUT, 'checks.json'), 'w'), indent=1); print('ok')
