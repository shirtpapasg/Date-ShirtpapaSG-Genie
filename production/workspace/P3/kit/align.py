"""Word timings for every segment: pocketsphinx forced alignment of aud/<id>.wav against the segment text.

CLI (prep_p3.py calls the functions directly):
  python3 align.py SEGMENTS.json AUD_DIR OUT.json [PRON.json]

Rules (same as the finished P4 pipeline):
  * each whitespace token of the text is one caption word; "TheOneApp" is spoken as "the one app"
  * tokens with no letters (digits like 7.3) get no timing from the aligner: they borrow the neighbours' times
  * if the aligner misses ONLY the final word of a segment, that word is timed from its neighbour (tolerated);
    any other mismatch is an error
  * words missing from cmudict must have a pronunciation in kit/pron.txt or the episode config "pron"
"""
import json, os, re, subprocess, sys, wave

K = os.path.dirname(os.path.abspath(__file__))
_DIC = None


class AlignError(Exception):
    pass


def cmudict():
    global _DIC
    if _DIC is None:
        import pocketsphinx
        _DIC = set(l.split()[0].split('(')[0] for l in open(os.path.join(pocketsphinx.get_model_path(), 'en-us', 'cmudict-en-us.dict')))
    return _DIC


def load_pron(extra=None):
    d = {}
    for l in open(K + "/pron.txt"):
        l = l.strip()
        if l and not l.startswith("#"):
            w, ph = l.split(None, 1); d[w.lower()] = ph.strip()
    d.update({k.lower(): v for k, v in (extra or {}).items()})
    return d


def spoken(text):
    """caption tokens, and the spoken words as (token index, word)"""
    toks = text.split()
    return toks, [(i, w) for i, t in enumerate(toks) for w in re.findall(r"[a-z']+", t.replace("TheOneApp", "the one app").lower())]


def oov(segs, pron):
    """{segment id: [words neither in cmudict nor in pron]}"""
    dic, res = cmudict(), {}
    for s in segs:
        o = sorted(set(w for _, w in spoken(s["text"])[1] if w not in dic and w not in pron))
        if o: res[s["id"]] = o
    return res


def align(segs, aud, pron, log=print):
    from pocketsphinx import Decoder
    dic = cmudict(); out = []; errors = []
    for s in segs:
        toks, sp = spoken(s["text"])
        miss = sorted(set(w for _, w in sp if w not in dic))
        if any(w not in pron for w in miss):
            raise AlignError(f"{s['id']}: words not in the dictionary: {[w for w in miss if w not in pron]} (add them to kit/pron.txt or the config \"pron\")")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{aud}/{s['id']}.wav", "-ar", "16000", "-ac", "1", f"{aud}/{s['id']}_16k.wav"], check=True)
        d = Decoder(samprate=16000, loglevel="FATAL")
        for w in miss: d.add_word(w, pron[w], True)
        d.set_align_text(" ".join(w for _, w in sp))
        wv = wave.open(f"{aud}/{s['id']}_16k.wav", "rb"); data = wv.readframes(wv.getnframes()); wv.close()
        d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
        al = [(x.word, x.start_frame / 100, (x.end_frame + 1) / 100) for x in d.seg() if x.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
        status = "OK"
        if len(al) != len(sp):
            got = [re.sub(r"\(\d+\)$", "", w) for w, _, _ in al]; want = [w for _, w in sp]
            if len(got) == len(want) - 1 and got == want[:-1]:
                status = f"OK (final word '{want[-1]}' missed by the aligner: timed from its neighbour)"
            else:
                status = "MISMATCH"
                errors.append(f"{s['id']}: aligned {len(al)} of {len(sp)} words. Check the audio says exactly the text (re-run TTS by deleting aud/{s['id']}.wav), or reword. aligned: {' '.join(got)}")
        tw = {}
        for (ti, w), (aw, a, b) in zip(sp, al):
            if ti not in tw: tw[ti] = [a, b]
            else: tw[ti][1] = b
        W = [{"t": t, "a": tw.get(i, [None])[0], "b": tw.get(i, [None, None])[1]} for i, t in enumerate(toks)]
        for i, w in enumerate(W):   # digits / a missed final word: borrow the neighbours' times
            if w["a"] is None:
                prev = next((W[j]["b"] for j in range(i - 1, -1, -1) if W[j]["b"] is not None), 0.0)
                nxt = next((W[j]["a"] for j in range(i + 1, len(W)) if W[j]["a"] is not None), prev + .3)
                w["a"], w["b"] = prev, nxt
        out.append({"id": s["id"], "scene": s["scene"], "words": W})
        log(f"  align {s['id']}: {len(al)}/{len(sp)} {status}")
    if errors:
        raise AlignError("alignment failed:\n  " + "\n  ".join(errors))
    return out


if __name__ == "__main__":
    segp, aud, outp = sys.argv[1:4]
    pron = load_pron(json.load(open(sys.argv[4])) if len(sys.argv) > 4 else None)
    segs = json.load(open(segp))
    o = oov(segs, pron)
    if o: sys.exit(f"OOV words (add to kit/pron.txt): {o}")
    json.dump(align(segs, aud, pron), open(outp, "w"))
