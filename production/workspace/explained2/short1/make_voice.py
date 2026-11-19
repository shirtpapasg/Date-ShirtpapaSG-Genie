"""make_voice.py: every spoken line of the Short, one wav per line + the lip-sync envelopes.
  /home/user/heart-tts/venv/bin/python make_voice.py            (VOICESET=script uses the script's cast note: Pip af_sky, Basil am_liam, Momo af_heart)
Heart = Kokoro af_heart, the episodes' recipe (sau/voice.py: speed .94, pitch swing x1.6, levelled).
Buddies = the Character Voice Kit (voice_maker.py: voice blend, Praat "Change gender" lifts formants and pitch to a child's voice).
Writes voice/<id>.wav (24 kHz mono) and voice/voice_data.js = { id: {who, text, dur, sents:[{text,t,dur}], words:[{w,t,end}], fps:30, open:[], bright:[]} }
(UMD: score.js reads it in node AND in the page, so sound and picture share one set of timings).
The envelope is motion_test/make_voice.py's (loudness per 1/30 s -> mouth opening; fast attack, slower release)."""
import sys, json, os, re, subprocess, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import voice_maker as VM
D = '/home/user/heart-tts'; k = Kokoro(D + '/kokoro.onnx', D + '/voices.bin'); SR = 24000
ENV = os.path.join(H, '..', 'motion_test', 'make_voice.py')
CH = dict(VM.CHARACTERS)
if os.environ.get('VOICESET') == 'script':   # the pilot script's cast note, lifted with the kit's recipe
    CH = {"pip": dict(mix={"af_sky": 1.0}, speed=1.10, formant=1.18, median=340, range=1.4),
          "basil": dict(mix={"am_liam": 1.0}, speed=1.10, formant=1.16, median=245, range=1.3),
          "momo": dict(mix={"af_heart": 1.0}, speed=1.06, formant=1.16, median=325, range=1.4)}
LINES = [  # id, who, text
 ("h1", "heart", "A wind-up robot. Look at it go!"),
 ("h2", "heart", "Point left for living. Point right for non-living."),
 ("h3", "heart", "Locked in!"),
 ("b1", "basil", "Living! It moves, so it's living!"),
 ("p1", "pip", "Non-living. I saw you wind it up, Basil."),
 ("m1", "momo", "Non-living. Does it ever get hungry?"),
 ("h4", "heart", "Watch. The robot stops."),
 ("h5", "heart", "A spring inside was pushing it. Nobody winds it up, so it stays still."),
 ("h6", "heart", "It does not need water, food or air. It does not grow."),
 ("h7", "heart", "The wind-up robot is a non-living thing."),
 ("h8", "heart", "Pointed right? One finger up!"),
 ("b2", "basil", "Aww. So moving is not the clue!"),
 ("h9", "heart", "Some non-living things move when something pushes them."),
 ("h10", "heart", "Watch the full episode!")]
GAP = {"heart": .30, "pip": .22, "basil": .20, "momo": .22}
LEVEL = {"heart": -21.7, "pip": -21.0, "basil": -20.5, "momo": -21.0}   # dB RMS of the speech
sents = lambda t: [p for p in re.split(r'(?<=[.!?])\s+', t) if p.strip()]
trim = lambda x: (lambda i: x[max(0, i[0] - 120): i[-1] + 360])(np.where(np.abs(x) > 0.01 * max(1e-6, np.abs(x).max() / .5))[0])

def heart(p):
    a, sr = k.create(p, voice='af_heart', speed=0.97, lang='en-us'); x = a.astype(np.float64)
    snd = parselmouth.Sound(x, SR); m = call(snd, 'To Manipulation', 0.01, 120, 500); pt = call(m, 'Extract pitch tier')
    med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), 'Get quantile', 0, 0, 0.5, 'Hertz')
    call(pt, 'Formula', f'{med} * 2 ^ (1.6 * log2(self / {med}))'); call([pt, m], 'Replace pitch tier')
    return call(m, 'Get resynthesis (overlap-add)').values[0]

def buddy(who, p):
    c = CH[who]; style = sum(w * k.get_voice_style(v) for v, w in c["mix"].items())
    a, sr = k.create(p, voice=style, speed=c["speed"], lang="en-us")
    snd = parselmouth.Sound(a.astype(np.float64), sampling_frequency=sr)
    return call(snd, "Change gender", 75, 500, c["formant"], c["median"], c["range"], 1.0).values[0]

syl = lambda w: max(1, len(re.findall(r'[aeiouy]+', w.lower())))
out = {}; os.makedirs(H + '/voice', exist_ok=True)
for id, who, text in LINES:
    f = f"{H}/voice/{id}.wav"; meta = f"{H}/voice/{id}.sents.json"
    if not (os.path.exists(f) and os.path.exists(meta)):
        parts, ss, t = [], [], 0.0
        for p in sents(text):
            x = trim(heart(p) if who == "heart" else buddy(who, p)); ss.append({"text": p, "t": round(t, 3), "dur": round(len(x) / SR, 3)})
            parts += [x, np.zeros(int(SR * GAP[who]))]; t += len(x) / SR + GAP[who]
        x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
        x = np.clip(x * (10 ** (LEVEL[who] / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98)
        sf.write(f, x.astype(np.float32), SR, subtype='PCM_16'); json.dump(ss, open(meta, 'w'))
    ss = json.load(open(meta)); ej = f"{H}/voice/{id}.env.json"
    subprocess.run([sys.executable, ENV, '--env', f, ej], check=True); e = json.load(open(ej))
    words = []
    for s in ss:   # word times: each sentence's own start and length are exact; inside it, words share the time by syllables
        ws = s["text"].split(); tot = sum(syl(w) + .35 for w in ws); t = s["t"]
        for w in ws: d = (syl(w) + .35) / tot * s["dur"]; words.append({"w": w, "t": round(t, 3), "end": round(t + d, 3)}); t += d
    x, _ = sf.read(f)
    out[id] = {"who": who, "text": text, "dur": round(len(x) / SR, 3), "sents": ss, "words": words, "fps": e["fps"], "open": e["open"], "bright": e["bright"]}
    print(id, who, out[id]["dur"], flush=True)
open(f"{H}/voice/voice_data.js", "w").write("(function(){var V=" + json.dumps(out) + ";if(typeof module!=='undefined'&&module.exports)module.exports=V;else globalThis.VOICE=V;})();\n")
print("total speech", round(sum(v["dur"] for v in out.values()), 2))
