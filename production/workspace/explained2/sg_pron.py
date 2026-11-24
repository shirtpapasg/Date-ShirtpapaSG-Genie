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
    # teacher, 2026-11-21 (P3 EP5 Part 1 at 1:34, "Some animals live only on land"): "you read 'live' wrongly. It should be read
    # as 'leaf'" -> the verb, said "leev" (long ee, as in 'leaf' with a v), never "laiv". Whole word only ("living", "alive", "olive" untouched).
    "live": {"ph": "lˈiːv"},  # "leev": the teacher's "leaf" (clip M)
    "lives": {"ph": "lˈiːvz"},
    "fragile": {"ph": "fɹˈædʒaɪl"},             # "FRAJ-ile" (teacher, 2026-11-21, clip B)
    # P3 EP16 Stage 1 (Opus, 2026-11-23): Kokoro's own "mantis" is "mˈæntiz" (ends in a z, "man-teez"); the dictionary sound is "MAN-tis".
    # Test clips pron_clips/Heart_ep16_new_words.m4a (before/after). Not a Singapore name: an English word Kokoro misreads (like "fragile").
    "mantis": {"ph": "mˈæntɪs"},
    # P3 EP17 Stage 1 (Opus, 2026-11-23; WAITING FOR THE TEACHER'S LISTEN, clip pron_clips/Heart_ep17_new_words.m4a):
    # Kokoro's own "prolegs" is "pɹˈoʊləɡz" ("PRO-lugz": the "legs" swallowed); the dictionary's is "PRO-legs" with a full "leg".
    "prolegs": {"ph": "pɹˈoʊlˌɛɡz"},
    # the book's two dengue mosquitoes (5.10a, read by Heart on the strip): Kokoro says "eeds" for "Aedes" (and the script's respelling
    # "Ay-ee-deez" came out "EYE-ee-deez"); the usual sound is "ay-EE-deez al-boh-PIK-tus" / "ay-EE-deez ee-JIP-tie".
    "Aedes albopictus": {"ph": "eɪˈiːdiːz ˌælboʊpˈɪktəs"},
    "Aedes aegypti": {"ph": "eɪˈiːdiːz iːdʒˈɪptaɪ"},
    # Explored EP11 (Opus, 2026-11-24; WAITING FOR THE TEACHER'S LISTEN, clip pron_clips/Heart_explored11_new_words.mp3):
    # Kokoro's own "Tampines" is "tˈæmpaɪnz" ("TAM-pines"); the Singapore way is "TAM-pin-ees". EP11 only shows it on its map.
    "Tampines": {"ph": "tˈæmpɪnˌiːs"},
    # "cicada": NO entry. The teacher listened (23 Nov 2026, EP18 clip) and chose Kokoro's own "sih-KAY-duh" over "sih-KAH-duh".
}
_tok = None
def _tokz():
    global _tok
    if _tok is None:
        from kokoro_onnx.tokenizer import Tokenizer
        _tok = Tokenizer()
    return _tok

def _pattern():
    # whole words only, any capital letters ("Live" at the start of a sentence too)
    keys = "|".join(re.escape(k) for k in sorted(FIX, key=len, reverse=True))
    return re.compile("((?<![A-Za-z])(?:" + keys + ")(?![A-Za-z]))", re.IGNORECASE)

def _key(word):
    for k in FIX:
        if k.lower() == word.lower(): return k
    return None

def needs_fix(text):
    return bool(_pattern().search(text))

def to_phonemes(text, lang="en-us"):
    """The whole line as phonemes with the fixed names in place (no pitch fall)."""
    out = [FIX[_key(p)]["ph"] if _key(p) else _tokz().phonemize(p, lang=lang) for p in _pattern().split(text) if p and p.strip()]
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
    """Say a line with fixed words. Returns (audio float32, sample rate).
    Words without a "fall" are spoken in one natural pass from phonemes. Only a name with a "fall" (Sungei Buloh) is said on its
    own, pitched down, and joined back with short gaps."""
    falls = [w for w in FIX if FIX[w].get("fall")]
    fp = re.compile("((?<![A-Za-z])(?:" + "|".join(re.escape(w) for w in falls) + ")(?![A-Za-z]))", re.IGNORECASE) if falls else None
    parts = [p for p in (fp.split(text) if fp else [text]) if p and p.strip()]
    pieces, sr = [], 24000
    for p in parts:
        key = _key(p)
        if key and FIX[key].get("fall"):
            f = FIX[key]
            a, sr = k.create(f["ph"], voice=voice, speed=speed, lang=lang, is_phonemes=True)
            pieces.append(("name", _trim(_fall(a, sr, f["fall"], f.get("tail", 0.32)))))
        else:
            q = p.strip().lstrip(",").strip()
            if not q: continue
            if needs_fix(q): a, sr = k.create(to_phonemes(q, lang), voice=voice, speed=speed, lang=lang, is_phonemes=True)
            else: a, sr = k.create(q, voice=voice, speed=speed, lang=lang)
            pieces.append(("text", _trim(a)))
    out = []
    for j, (kind, a) in enumerate(pieces):
        if j: out.append(np.zeros(int(sr * (gap_out if pieces[j - 1][0] == "name" else gap_in)), np.float32))
        out.append(a)
    return np.concatenate(out), sr
