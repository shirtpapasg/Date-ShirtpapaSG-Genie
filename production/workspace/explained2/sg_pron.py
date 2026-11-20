"""sg_pron.py: Singapore place names and words that Kokoro says wrongly, with the sounds the teacher approved.

Kokoro (kokoro-onnx) guesses from spelling: "Sungei Buloh" came out "sun-jay byoo-low". For these words we hand it the exact
phonemes. Use `to_phonemes(text)` to turn a whole line into phonemes with the fixes in place, then call
`kokoro.create(phonemes, voice=..., speed=..., lang="en-us", is_phonemes=True)`.
Add a word here only after the teacher has heard and approved a clip of it (PRONUNCIATION.md keeps the record).
"""
import re
from kokoro_onnx.tokenizer import Tokenizer

FIX = {
    # teacher, 2026-11-20: 'go with this "Soon-ai, bur-low"' (the comma is a short pause)
    "Sungei Buloh": "sˈuːnaɪ, bˈɜːɹloʊ",
}
_tok = None
def to_phonemes(text, lang="en-us"):
    global _tok
    _tok = _tok or Tokenizer()
    pat = re.compile("(" + "|".join(re.escape(k) for k in sorted(FIX, key=len, reverse=True)) + ")")
    out = []
    for part in pat.split(text):
        if not part: continue
        out.append(FIX[part] if part in FIX else _tok.phonemize(part, lang=lang))
    return " ".join(p.strip() for p in out if p.strip())

def needs_fix(text):
    return any(k in text for k in FIX)
