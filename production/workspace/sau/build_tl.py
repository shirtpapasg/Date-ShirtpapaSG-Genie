"""build_tl.py: word timings -> timeline, voice track and sound effects for a TheOneApp, Explored video.

    python build_tl.py ep01/ep01_segments.json ep01/aud ep01/ep01      (writes ep01_tl.json, ep01_voice.wav, ep01_sfx.wav)

Words are aligned with pocketsphinx; a segment it cannot align is timed by spreading its words over the clip in
proportion to their length (captions stay close enough, and the log says which segment it was).
"""
import json, re, wave, subprocess, os, sys, pocketsphinx
from pocketsphinx import Decoder
spec = json.load(open(sys.argv[1])); AUD = sys.argv[2]; OUT = sys.argv[3]
dic = set(l.split()[0].split('(')[0] for l in open(os.path.join(pocketsphinx.get_model_path(), 'en-us', 'cmudict-en-us.dict')))
EXTRA = {"kalimantan": "K AE L IH M AE N T AE N", "sumatra": "S UW M AA T R AH", "micrometres": "M AY K R OW M IY T ER Z",
         "kilometres": "K IH L AA M AH T ER Z", "windpipe": "W IH N D P AY P", "mucus": "M Y UW K AH S", "myenv": "M AY",
         "hotspots": "HH AA T S P AA T S", "singapore's": "S IH NG AH P AO R Z", "you'll": "Y UW L", "that's": "DH AE T S",
         "here's": "HH IY R Z", "let's": "L EH T S", "i'll": "AY L", "defence": "D IH F EH N S", "twenty-six": "T W EH N T IY S IH K S",
         "twenty-three": "T W EH N T IY TH R IY", "ninety-five": "N AY N T IY F AY V", "south-west": "S AW TH W EH S T",
         "north-east": "N AO R TH IY S T", "senoko": "S EH N OW K OW", "tengeh": "T EH NG EH", "liquefied": "L IH K W AH F AY D",
         "sixty-five": "S IH K S T IY F AY V", "ninety-one": "N AY N T IY W AH N", "ninety-two": "N AY N T IY T UW",
         "ninety-three": "N AY N T IY TH R IY", "twenty-eight": "T W EH N T IY EY T", "thirty-five": "TH ER T IY F AY V",
         "you're": "Y UH R", "it's": "IH T S", "we're": "W IY R", "modular": "M AA JH AH L ER", "co-": "K OW", "natuna": "N AH T UW N AH", "hdb": "EY CH D IY B IY", "vapour": "V EY P ER", "kinetic": "K IH N EH T IH K", "neighbours": "N EY B ER Z", "uranium": "Y UH R EY N IY AH M"}
dur = lambda f: float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]))

def align(s):
    toks = s["text"].split(); spoken = [(i, w) for i, t in enumerate(toks) for w in re.findall(r"[a-z'][a-z'\-]*[a-z]|[a-z]", t.replace("TheOneApp", "the one app").lower())]
    wav = f"{AUD}/{s['id']}.wav"; w16 = f"{AUD}/{s['id']}_16k.wav"; D = dur(wav)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ar", "16000", "-ac", "1", w16], check=True)
    al = []
    try:
        d = Decoder(samprate=16000, loglevel="FATAL")
        for w in set(w for _, w in spoken if w not in dic):
            if w in EXTRA: d.add_word(w, EXTRA[w], True)
        d.set_align_text(" ".join(w for _, w in spoken))
        data = wave.open(w16, "rb"); raw = data.readframes(data.getnframes())
        d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
        al = [(x.word, x.start_frame / 100, (x.end_frame + 1) / 100) for x in d.seg() if x.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
    except Exception as e:
        print(s["id"], "align error", e)
    tw = {}
    if len(al) == len(spoken):
        for (ti, _), (_, a, b) in zip(spoken, al):
            if ti not in tw: tw[ti] = [a, b]
            else: tw[ti][1] = b
        print(s["id"], "aligned", len(al))
    else:
        tot = sum(len(t) + 2 for t in toks); c = 0.05
        for i, t in enumerate(toks):
            L = (D - .1) * (len(t) + 2) / tot; tw[i] = [c, c + L * .85]; c += L
        print(s["id"], "PROPORTIONAL (aligned", len(al), "of", len(spoken), ")")
    return [{"t": t, "a": tw[i][0], "b": tw[i][1]} for i, t in enumerate(toks)], D

INTRO, GAP_SAME, GAP_SCENE, OUTRO = 0.6, 0.55, 1.0, spec.get("outro", 3.8)
t = INTRO; segs = []; parts = [("sil", INTRO)]
SEGSFX = []
for i, s in enumerate(spec["segments"]):
    if s.get("silent"): words, d = [], float(s["silent"])     # a picture-only beat: no voice, its own sound effects
    else: words, d = align(s)
    if i:
        g = GAP_SAME if spec["segments"][i - 1]["scene"] == s["scene"] else GAP_SCENE
        if s["scene"] == "nyk": g = 0.8
        if s.get("silent") and spec["segments"][i - 1].get("silent"): g = 0.15   # picture-only shots flow straight on
        g += spec["segments"][i - 1].get("hold", 0)          # a segment can hold its picture a little longer
        parts.append(("sil", g)); t += g
    segs.append({"id": s["id"], "scene": s["scene"], "t0": round(t, 3), "t1": round(t + d, 3), "silent": bool(s.get("silent")), "shots": s.get("shots", []),
                 "words": [{"t": w["t"], "a": round(t + w["a"], 3), "b": round(t + w["b"], 3)} for w in words]})
    parts.append(("sil", d) if s.get("silent") else ("seg", s["id"]))
    for kd, at in s.get("sfx", []): SEGSFX.append((kd, t + at))
    t += d
END = round(t + OUTRO, 3)
inputs = []
for kd, v in parts:
    inputs += (["-f", "lavfi", "-t", f"{v:.3f}", "-i", "anullsrc=r=24000:cl=mono"] if kd == "sil" else ["-i", f"{AUD}/{v}.wav"])
fc = "".join(f"[{i}:a]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=0:a=1,apad,atrim=0:{END}[out]"
subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + inputs + ["-filter_complex", fc, "-map", "[out]", OUT + "_voice.wav"], check=True)

# captions say acronyms and numbers the way pupils read them ("P S I" -> "PSI", "two point five" -> "2.5")
MERGE = [("nineteen sixty-five", "1965"), ("nineteen ninety-one", "1991"), ("nineteen ninety-two", "1992"), ("twenty thirteen", "2013"), ("twenty twenty-eight", "2028"), ("twenty thirty-five", "2035"), ("twenty twenty-six", "2026"), ("twenty twenty-three", "2023"), ("two point five", "2.5"), ("my E N V", "myENV"),
         ("P S I", "PSI"), ("P M", "PM"), ("N ninety-five", "N95")]
def capwords(ws):
    out, i = [], 0
    while i < len(ws):
        for src, dst in MERGE:
            n = len(src.split()); seq = ws[i:i + n]
            if len(seq) == n and " ".join(re.sub(r"[.,?!]+$", "", w["t"]) for w in seq).lower() == src.lower():
                tail = re.search(r"[.,?!]*$", seq[-1]["t"]).group(0)
                out.append({"t": dst + tail, "a": seq[0]["a"], "b": seq[-1]["b"]}); i += n; break
        else: out.append(ws[i]); i += 1
    return out
chunks = []
for s in segs:
    if s["scene"] == "nyk": continue                      # the big title says it
    cur = []
    for w in capwords(s["words"]):
        cur.append(w)
        if w["t"][-1] in ".,?!" or len(cur) >= 5: chunks.append(cur); cur = []
    if cur: chunks.append(cur)
caps = []
for i, c in enumerate(chunks):
    nxt = chunks[i + 1][0]["a"] - .06 if i + 1 < len(chunks) else c[-1]["b"] + .6
    caps.append({"t0": round(c[0]["a"] - .06, 3), "t1": round(min(nxt, c[-1]["b"] + .7), 3), "w": c})
cues = {}
for s in segs:
    cs = {}
    for w in s["words"]:
        kk = re.sub(r"[^a-z'\-]", "", w["t"].lower()); n = 1
        while f"{kk}#{n}" in cs: n += 1
        cs[f"{kk}#{n}"] = w["a"]
        if n == 1: cs[kk] = w["a"]
    cs["_t0"] = s["t0"]; cs["_t1"] = s["t1"]; cues[s["id"]] = cs
for s in spec["segments"]:
    for w, *_ in s.get("shots", []):
        if w not in cues.get(s["id"], {}): print("WARNING shot word not said:", s["id"], w)
kws = [{"t": cues[sid][w], "label": lab, "col": col} for sid, w, lab, col in spec.get("kws", [])]
scenes = []
for s in segs:
    if not scenes or scenes[-1]["scene"] != s["scene"]: scenes.append({"scene": s["scene"], "t0": s["t0"], "t1": s["t1"]})
    else: scenes[-1]["t1"] = s["t1"]
nyk = next((s["t0"] for s in segs if s["scene"] == "nyk"), END - 3)
json.dump({"END": END, "segs": [{k: v for k, v in s.items() if k != "words"} for s in segs], "caps": caps, "cues": cues, "kws": kws,
           "scenes": scenes, "spec": {k: v for k, v in spec.items() if k != "segments"}}, open(OUT + "_tl.json", "w"))

SIL = {s["scene"] for s in spec["segments"] if s.get("silent")}
ev = [("pop", k["t"]) for k in kws] + [("whoosh", s["t0"] - .35) for s in scenes[1:] if s["scene"] not in SIL] + [("ding", nyk), ("tada", nyk + .05)] + SEGSFX
src = {"pop": "sine=f=880:d=0.12,volume=0.5,afade=t=out:st=0.02:d=0.1,asetrate=44100*1.2,aresample=44100",
       "whoosh": "anoisesrc=d=0.5:c=pink:a=0.25,bandpass=f=1200:w=900,afade=t=in:d=0.15,afade=t=out:st=0.2:d=0.3",
       "ding": "sine=f=1318:d=0.6,volume=0.35,afade=t=out:st=0.05:d=0.55",
       "tada": "aevalsrc=0.18*sin(2*PI*784*t)*exp(-3*t)+0.15*sin(2*PI*988*t)*exp(-3*t)+0.15*sin(2*PI*1175*t)*exp(-3*t):s=44100:d=1.2",
       # picture-only beats (the hero journey): what each process sounds like
       "rumble": "anoisesrc=d=4.5:c=brown:a=0.5,lowpass=f=160,afade=t=in:d=0.8,afade=t=out:st=3.6:d=0.9",
       "bubble": "aevalsrc=0.35*sin(2*PI*(500+900*t)*t)*exp(-14*t):s=44100:d=0.35",
       "drill": "anoisesrc=d=2:c=brown:a=0.45,lowpass=f=500,tremolo=f=14:d=0.9,afade=t=out:st=1.5:d=0.5",
       "splash": "anoisesrc=d=0.7:c=white:a=0.3,highpass=f=900,afade=t=in:d=0.05,afade=t=out:st=0.1:d=0.6",
       "hiss": "anoisesrc=d=1.2:c=white:a=0.18,highpass=f=3000,afade=t=in:d=0.2,afade=t=out:st=0.7:d=0.5",
       "hum": "aevalsrc=0.16*sin(2*PI*70*t)+0.08*sin(2*PI*140*t):s=44100:d=5.2,afade=t=in:d=0.8,afade=t=out:st=4.2:d=1",
       "ping": "aevalsrc=0.3*sin(2*PI*1568*t)*exp(-4*t):s=44100:d=1.2",
       "roar": "anoisesrc=d=5.5:c=pink:a=0.4,lowpass=f=700,afade=t=in:d=0.4,afade=t=out:st=4.6:d=0.9",
       "whirr": "aevalsrc=0.16*sin(2*PI*(90+60*t)*t)+0.06*sin(2*PI*(270+180*t)*t):s=44100:d=4,afade=t=out:st=3.2:d=0.8",
       "buzz": "aevalsrc=0.12*sin(2*PI*100*t)+0.07*sin(2*PI*200*t)+0.04*sin(2*PI*300*t):s=44100:d=2.6,afade=t=in:d=0.2,afade=t=out:st=2:d=0.6",
       "zap": "aevalsrc=0.25*sin(2*PI*(2400-1800*t/0.4)*t)*exp(-5*t):s=44100:d=0.4",
       "click": "aevalsrc=0.6*sin(2*PI*2200*t)*exp(-180*t):s=44100:d=0.06",
       "chime": "aevalsrc=0.16*sin(2*PI*1046*t)*exp(-2*t)+0.12*sin(2*PI*1568*t)*exp(-2.4*t):s=44100:d=2",
       "cough": "anoisesrc=d=0.4:c=pink:a=0.55,bandpass=f=650:w=500,afade=t=in:d=0.02,afade=t=out:st=0.08:d=0.3",
       "crackle": "anoisesrc=d=2.6:c=white:a=0.12,highpass=f=2500,tremolo=f=23:d=1,afade=t=in:d=0.3,afade=t=out:st=2:d=0.6",
       "breath": "anoisesrc=d=1.8:c=pink:a=0.28,bandpass=f=900:w=800,afade=t=in:d=0.8,afade=t=out:st=0.9:d=0.9",
       "rain": "anoisesrc=d=5:c=white:a=0.16,highpass=f=900,lowpass=f=7000,afade=t=in:d=0.6,afade=t=out:st=4:d=1",
       "boom": "anoisesrc=d=1.8:c=brown:a=0.9,lowpass=f=140,afade=t=in:d=0.02,afade=t=out:st=0.2:d=1.6",
       "rush": "anoisesrc=d=4:c=pink:a=0.35,bandpass=f=900:w=700,afade=t=in:d=1.2,afade=t=out:st=3:d=1",
       "flash": "anoisesrc=d=1:c=white:a=0.3,lowpass=f=4000,afade=t=in:d=0.01,afade=t=out:st=0.05:d=0.9",
       "deep": "anoisesrc=d=5:c=brown:a=0.4,lowpass=f=300,tremolo=f=0.4:d=0.6,afade=t=in:d=0.8,afade=t=out:st=4:d=1",
       "wind": "anoisesrc=d=6:c=pink:a=0.32,bandpass=f=420:w=300,tremolo=f=0.6:d=0.5,afade=t=in:d=0.8,afade=t=out:st=5:d=1"}
inputs, fl = [], []
for i, (kd, tt) in enumerate(ev):
    inputs += ["-f", "lavfi", "-i", src[kd]]; fl.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=mono,adelay={int(max(0, tt) * 1000)}:all=1[e{i}]")
fl.append("".join(f"[e{i}]" for i in range(len(ev))) + f"amix=inputs={len(ev)}:normalize=0,apad,atrim=0:{END}[out]")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + inputs + ["-filter_complex", ";".join(fl), "-map", "[out]", OUT + "_sfx.wav"], check=True)
print("END", END); [print(" ", x["scene"], x["t0"], x["t1"]) for x in scenes]
