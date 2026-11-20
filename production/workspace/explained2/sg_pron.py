"""sg_pron.py: Singapore names that Kokoro says wrongly, spoken from the sounds the teacher approved (record: PRONUNCIATION.md).

Kokoro guesses from spelling ("Sungei Buloh" came out "sun-jay byoo-low"). For these names it is given exact phonemes, and a name
can also end on a falling tone ("fall": semitones the last syllable glides down, applied with Praat).

    from sg_pron import needs_fix, speak_line
    if needs_fix(text): audio, sr = speak_line(kokoro, text, voice="af_heart", speed=0.90)
    else:               audio, sr = kokoro.create(text, voice="af_heart", speed=0.90, lang="en-us")

speak_line says the line in pieces (before the name, the name, after it) and joins them with short natural gaps, so a falling
name works anywhere in a sentence. Add a name only after the teacher has heard and approved a clip of it.
"""
import re, numpy as np

FIX = {
    # teacher, 2026-11-20: 'go with this "Soon-ai, bur-low"', then 'end the "low" with a lower tone' -> approved clip H
    "Sungei Buloh": {"ph": "sˈuːnaɪ, bˈɜːɹloʊ", "fall": 5.0, "tail": 0.32},
    # teacher, 2026-11-20: 'pulau semakau is "pu-lao, sir-ma-kao"' -> approved clip I (stress on MA)
    "Pulau Semakau": {"ph": "pˈuːlaʊ, sɜːmˈɑːkaʊ"},
    "Semakau": {"ph": "sɜːmˈɑːkaʊ"},
}
_tok = None
def _tokz():
    global _tok
    if _tok is None:
        from kokoro_onnx.tokenizer import Tokenizer
        _tok = Tokenizer()
    return _tok

def needs_fix(text):
    return any(k in text for k in FIX)

def _pattern():
    return re.compile("(" + "|".join(re.escape(k) for k in sorted(FIX, key=len, reverse=True)) + ")")

def to_phonemes(text, lang="en-us"):
    """The whole line as phonemes with the fixed names in place (no pitch fall)."""
    out = [FIX[p]["ph"] if p in FIX else _tokz().phonemize(p, lang=lang) for p in _pattern().split(text) if p and p.strip()]
    return " ".join(x.strip() for x in out if x.strip())

def _fall(audio, sr, semis, tail):
    import parselmouth
    from parselmouth.praat import call
    snd = parselmouth.Sound(audio.astype(np.float64), sr)
    man = call(snd, "To Manipulation", 0.01, 75, 500)
    pt = call(man, "Extract pitch tier")
    dur = snd.get_total_duration(); t0 = dur * (1 - tail)
    f0 = call(snd.to_pitch(), "Get mean", max(0, t0 - 0.15), t0, "Hertz")
    if not f0 or f0 != f0: return audio
    call(pt, "Remove points between", t0, dur)
    call(pt, "Add point", t0, f0)
    call(pt, "Add point", dur - 0.02, f0 * 2 ** (-semis / 12))
    call([pt, man], "Replace pitch tier")
    return call(man, "Get resynthesis (overlap-add)").values[0].astype(np.float32)

def _trim(x, th=0.01):
    nz = np.flatnonzero(np.abs(x) > th)
    return x[nz[0]:nz[-1] + 1] if len(nz) else x

def speak_line(k, text, voice="af_heart", speed=0.90, lang="en-us", gap_in=0.08, gap_out=0.22):
    """Say a line that contains a fixed name. Returns (audio float32, sample rate)."""
    parts = [p for p in _pattern().split(text) if p and p.strip()]
    pieces, sr = [], 24000
    for i, p in enumerate(parts):
        if p in FIX:
            a, sr = k.create(FIX[p]["ph"], voice=voice, speed=speed, lang=lang, is_phonemes=True)
            if FIX[p].get("fall"): a = _fall(a, sr, FIX[p]["fall"], FIX[p].get("tail", 0.32))
            pieces.append(("name", _trim(a)))
        else:
            q = p.strip().lstrip(",").strip()
            if not q: continue
            a, sr = k.create(q, voice=voice, speed=speed, lang=lang)
            pieces.append(("text", _trim(a)))
    out = []
    for j, (kind, a) in enumerate(pieces):
        if j: out.append(np.zeros(int(sr * (gap_out if pieces[j - 1][0] == "name" else gap_in)), np.float32))
        out.append(a)
    return np.concatenate(out), sr
