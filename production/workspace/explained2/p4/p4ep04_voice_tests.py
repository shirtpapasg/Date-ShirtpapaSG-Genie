"""p4ep04_voice_tests.py (P4 EP4 "The Prickly Patient", 28 Nov 2026; the script v2.1's questions 12 and 19; NOTHING is built).
Test clips the teacher hears before the EP4 build:
  1. SPIKE (the cactus guest, "he"): three candidate voices, each saying the same three of his real lines (c101, c110, c104);
     measured against the cast (GLITCH, Chilli, Uncle Lim, Pip, Basil, Momo) saying the same line: pitch, formants, MFCC distance.
  2. Q19 pronunciations in real script lines, in the speaking character's voice: cactus / cacti, spine-like, non-woody, butterfly pea,
     "Doctor Basil", Uncle Lim's s601 (+ Spike's "I AM a plant", which Kokoro ran together as "I'm a plant").
  /home/user/heart-tts/venv/bin/python p4ep04_voice_tests.py          -> /dev/shm/p4ep04/vt/*.wav  (then p4ep04_pron_check.py measures)
Recipes copied from p4ep03/make_voice.py unchanged (buddy(): the Character Voice Kit, 12% slower, -18 dB RMS; GLITCH glitch_fx; Heart
af_heart .90 with the x1.6 pitch swing; Uncle Lim through sg_pron.shape_particles)."""
import os, sys, re, json, wave, subprocess, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
H = os.path.dirname(os.path.abspath(__file__)); E2 = os.path.dirname(H); SPR = os.path.join(E2, "characters", "sprites")
sys.path.insert(0, SPR); sys.path.insert(0, E2)
import voice_maker as vm
from sg_pron import needs_fix, speak_line, shape_particles, SG_PARTICLES
OUT = "/dev/shm/p4ep04/vt"; os.makedirs(OUT, exist_ok=True); SR = 24000

# the cast, exactly as p4ep03/make_voice.py has them
vm.CHARACTERS["chilli"] = dict(mix={"am_michael": .6, "am_echo": .4}, speed=1.05, formant=1.1, median=182, range=1.0)
vm.CHARACTERS["lim"] = dict(mix={"bm_george": .45, "am_michael": .55}, speed=.96, formant=.95, median=112, range=1.15)
vm.CHARACTERS["glitch"] = dict(mix={"bm_lewis": .6, "bm_george": .4}, speed=1.0, formant=1.0, median=138, range=.55)
# SPIKE candidates (the script: "a calm, dry British voice, bm_daniel-based, speed .95", distinct from GLITCH and Chilli). As every
# character line, buddy() makes them 12% slower again. "dry" = a narrow pitch range (range < 1). B's "lang" needs the Character Voice
# Kit's voice_maker.speak to read p["lang"] (added 28 Nov 2026; every other voice keeps "en-us"). The teacher picks one (question 12).
SPIKE = {
    "spike_A": dict(desc="A: bm_daniel, calm and dry (the script's suggestion; American sounds, as GLITCH)", mix={"bm_daniel": 1.0}, speed=.95, formant=1.0, median=150, range=.75),
    "spike_B": dict(desc="B: bm_daniel + bm_fable with BRITISH sounds (lang en-gb: 'wor-tuh', no r), calm and a little prim", mix={"bm_daniel": .7, "bm_fable": .3}, speed=.95, formant=1.03, median=160, range=.7, lang="en-gb"),
    "spike_C": dict(desc="C: am_onyx + am_santa, a deep, deadpan voice (the lowest in the cast)", mix={"am_onyx": .5, "am_santa": .5}, speed=.93, formant=.93, median=95, range=.55),
}
vm.CHARACTERS.update(SPIKE)

class _FixK:
    def __init__(self, k): self.k = k
    def create(self, text, voice="af_heart", speed=1.0, lang="en-us", **kw):
        if not kw.get("is_phonemes") and needs_fix(text): return speak_line(self.k, text, voice=voice, speed=speed, lang=lang)
        return self.k.create(text, voice=voice, speed=speed, lang=lang, **kw)
    def __getattr__(self, n): return getattr(self.k, n)
RAW = vm.load("/home/user/heart-tts/kokoro.onnx", "/home/user/heart-tts/voices.bin"); FK = _FixK(RAW)

def glitch_fx(x, sr, step=1.0, comb=.28, ring=.10):
    x = np.asarray(x, np.float64); snd = parselmouth.Sound(x, sr); mm = call(snd, "To Manipulation", 0.01, 70, 400); pt = call(mm, "Extract pitch tier")
    med = call(snd.to_pitch(time_step=0.01, pitch_floor=70, pitch_ceiling=400), "Get quantile", 0, 0, 0.5, "Hertz")
    call(pt, "Formula", f"{med} * 2 ^ (round(12 * log2(self / {med}) / {step}) * {step} / 12)"); call([pt, mm], "Replace pitch tier")
    y = call(mm, "Get resynthesis (overlap-add)").values[0]; d = int(.0031 * sr); yc = y.copy(); yc[d:] += comb * y[:-d]
    tt = np.arange(len(yc)) / sr; yc = yc * (1 - ring) + ring * yc * np.sin(2 * np.pi * 70 * tt)
    sp = yc[np.abs(yc) > .003]; return np.clip(yc * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98)

def buddy(who, text, gap=.16, k=None):
    c = dict(vm.CHARACTERS[who]); c["speed"] = c["speed"] * .88
    x, sr = vm.speak(k or FK, text, c, gap=gap + .06, para_gap=0)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98), sr

def heart(text, gap=.5, spd=.90, k=None):
    parts = []
    for p in [s for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]:
        a, sr = (k or FK).create(p, voice="af_heart", speed=spd, lang="en-us"); x = a.astype(np.float64)
        snd = parselmouth.Sound(x, SR); m = call(snd, "To Manipulation", 0.01, 120, 500); pt = call(m, "Extract pitch tier")
        med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), "Get quantile", 0, 0, 0.5, "Hertz")
        call(pt, "Formula", f"{med} * 2 ^ (1.6 * log2(self / {med}))"); call([pt, m], "Replace pitch tier")
        x = call(m, "Get resynthesis (overlap-add)").values[0]; idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 240]
        parts += [x, np.zeros(int(SR * gap))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
    return np.clip(x * (10 ** (-21.7 / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98), SR

def say(who, text, k=None):
    if who == "heart": return heart(text, k=k)
    x, sr = buddy(who, text, k=k)
    if who == "glitch": x = glitch_fx(x, sr)
    return x, sr

def lim_line(text):
    """Uncle Lim as make_voice.py: record, align (pocketsphinx, the episode's EXTRA words), shape_particles."""
    from pocketsphinx import Decoder
    import pocketsphinx
    x, sr = buddy("lim", text); f = f"{OUT}/_lim.wav"; sf.write(f, x.astype(np.float32), sr)
    EXTRA = {"aiyoh": "AY Y OW", "lah": "L AA"}
    toks = text.split(); spoken = [(i, w) for i, t in enumerate(toks) for w in re.findall(r"[a-z'][a-z'\-]*[a-z]|[a-z]", t.lower())]
    w16 = f[:-4] + "_16k.wav"; subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", w16], check=True)
    d = Decoder(samprate=16000, loglevel="FATAL")
    for w in EXTRA: d.add_word(w, EXTRA[w], True)
    d.set_align_text(" ".join(w for _, w in spoken)); data = wave.open(w16, "rb"); raw = data.readframes(data.getnframes())
    d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
    al = [(s.word, s.start_frame / 100, (s.end_frame + 1) / 100) for s in d.seg() if s.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
    os.remove(w16); os.remove(f)
    assert len(al) == len(spoken), (al, spoken)
    tw = {}
    for (ti, _), (_, a, b) in zip(spoken, al):
        if ti not in tw: tw[ti] = [a, b]
        else: tw[ti][1] = b
    words = [{"w": t, "a": round(tw[i][0], 3), "b": round(tw[i][1], 3)} for i, t in enumerate(toks)]
    y, rep = shape_particles(x, sr, words); print("   singlish:", rep); return y, sr, words, rep

if __name__ == "__main__":
    W = lambda name, x, sr: sf.write(f"{OUT}/{name}.wav", np.asarray(x, np.float32), sr)
    SPIKE_LINES = [("c101", "Doctor, my family loves me too much!"), ("c110", "I AM a plant, thank you!"),
                   ("c104", "They water me every day. They keep me in the dark bathroom. And someone taped plastic leaves on me!")]
    # 1. Spike: three candidates x three lines; and the whole cast on c104 (the measuring line)
    for who in SPIKE:
        for lid, t in SPIKE_LINES: W(f"{who}_{lid}", *say(who, t)); print(who, lid)
        W(f"{who}_c110_own", *say(who, SPIKE_LINES[1][1], k=RAW))     # Kokoro's own "I AM" (before any fix)
    for who in ("glitch", "chilli", "lim", "pip", "basil", "momo"): W(f"cast_{who}_c104", *say(who, SPIKE_LINES[2][1])); print("cast", who)
    # 2. Q19: the words in real lines, in the speaker's voice (script v2.1 line ids)
    Q19 = [("cactus_heart_l403", "heart", "A cactus lives in dry places. Its leaves are shaped like spines, to reduce water loss."),
           ("cactus_basil_p303", "basil", "Two. A cactus isn't even a real plant, so it hardly needs anything."),
           ("cacti_pip_p301", "pip", "Two. Cacti live in dry places, so they need lots of light and only a little water."),
           ("spinelike_pip_l408", "pip", "Spike already has leaves. Spine-like leaves!"),
           ("spinelike_heart_w506", "heart", "A cactus stores water in its thick stem, and its spine-like leaves lose very little."),
           ("nonwoody_momo_t804", "momo", "And this mint's stem is soft and bendy: a non-woody stem!"),
           ("nonwoody_heart_hk", "heart", "Woody, non-woody."),
           ("butterflypea_basil_t805", "basil", "The butterfly pea has a weak stem. It coils round the pole to climb up to more light. A climber!"),
           ("doctorbasil_basil_c102", "basil", "Doctor Basil is in. I'm an expert at plants."),
           ("doctorbasil_dr_basil", "basil", "Dr Basil is in.")]                  # the spelling the script avoids, for the check only
    for name, who, t in Q19: W(name, *say(who, t)); print(name)
    y, sr, words, rep = lim_line("Aiyoh, cactus in the bathroom? Put here lah. My corridor got sun."); W("lim_s601", y, sr)
    json.dump({"words": words, "particles": rep}, open(f"{OUT}/lim_s601.json", "w"))
    xo, sro = buddy("lim", "Aiyoh, cactus in the bathroom? Put here lah. My corridor got sun.", k=RAW); W("lim_s601_own", xo, sro)
    # the words alone, for the forced choice (the speaker's voice)
    for name, who, t in [("w_cactus_heart", "heart", "cactus"), ("w_cacti_pip", "pip", "cacti"), ("w_spinelike_pip", "pip", "spine-like"),
                         ("w_nonwoody_momo", "momo", "non-woody"), ("w_butterflypea_basil", "basil", "butterfly pea"), ("w_doctorbasil_basil", "basil", "Doctor Basil")]:
        W(name, *say(who, t))
    print("ok")
