"""prep_p3.py N [N ...]  -- build P3 episode N, ready to preview and render.

Inputs (see kit/README.md for the exact contract):
  R/plan/epNN_segments.json   narration segments WITHOUT welcome/goodbye (first id "hook"; quiz1 then quiz2; habit2 in scene "mindmap")
  R/plan/epNN.json            episode config (topic, goals, key words, bursts, lab card, mind-map phone, end card, output name)
  R/epN/scenes_epN.js         scene code (one S.<scene> per segment "scene" value)
Steps: validate everything (before any TTS) -> add welcome + goodbye -> voice 3 TTS (cached per segment text) -> align ->
timeline, captions, cues, key words, bursts -> page (kit/template.html + scenes + shared modules) -> measure + apply
scene enlargement fills -> render the whole page once to catch errors -> R/epN/epN.html, epNb.html, tl.json, voice.wav, meta.json.
Env: P3_ROOT (default: the folder that holds kit/), NICE (niceness for TTS/browser work, default 10).
Exit code 1 if any episode failed; every problem is listed.
"""
import difflib, html, json, os, re, shutil, subprocess, sys

K = os.path.dirname(os.path.abspath(__file__))
R = os.path.abspath(os.environ.get("P3_ROOT") or os.path.dirname(K))
S4 = os.path.dirname(os.path.dirname(K))          # the P4 workspace: read only (TTS engine, fonts)
TTS = S4 + "/tts"
NICE = ["nice", "-n", os.environ.get("NICE", "10")]
sys.path.insert(0, K)
import align as AL, build_tl as BT, fill_calc as FC   # noqa: E402

STD_INTRO = ("Hi there, and welcome to The One App, Explained! I'm so happy you're here. Today, you will learn three big ideas. "
             "First, {0}. Second, {1}. And third, {2}. Let's get started!")
STD_BYE = "Thanks for watching! See you next time. Bye!"
BYE_MAX = 3.15                                    # the goodbye plays over the 4 s end card
CFG_KEYS = {"topic", "icon", "goals", "kw", "short", "bursts", "lab", "mm", "end", "output", "intro", "bye", "pron", "fills", "nofill"}
WELCOME_CUES = ["welcome", "today", "first", "second", "third", "started"]


class PrepError(Exception):
    pass


def node(*args, **kw):
    env = dict(os.environ, NODE_PATH=subprocess.check_output(["npm", "root", "-g"], text=True).strip())
    return subprocess.run(NICE + ["node"] + list(args), env=env, capture_output=True, text=True, **kw)


def cue_keys(text):
    """the cue names C(seg, ...) accepts for a segment text: word, word#1, word#2, ..."""
    return set(BT.cue_table([{"id": "x", "words": [{"t": t, "a": 0} for t in text.split()]}])["x"])


def closest(word, keys):
    m = difflib.get_close_matches(word, sorted(keys), 3, .6)
    return f" (did you mean {', '.join(m)}?)" if m else ""


# ---------------------------------------------------------------- validation
def load_json(p, what, err):
    if not os.path.exists(p):
        err.append(f"missing {what}: {p}"); return None
    try:
        return json.load(open(p))
    except Exception as e:
        err.append(f"{what} is not valid JSON ({p}): {e}"); return None


def check_segments(segs, err):
    if not isinstance(segs, list) or not segs:
        err.append("segments: must be a non-empty JSON list of {id, scene, text}"); return
    for i, s in enumerate(segs):
        if not isinstance(s, dict) or not all(isinstance(s.get(k), str) and s.get(k).strip() for k in ("id", "scene", "text")):
            err.append(f"segments[{i}]: needs non-empty string fields id, scene, text"); return
    ids = [s["id"] for s in segs]
    for d in sorted(set(x for x in ids if ids.count(x) > 1)): err.append(f"segments: id '{d}' is used twice")
    for s in segs:
        if not re.fullmatch(r"[a-z][a-z0-9_]*", s["id"]): err.append(f"segments: id '{s['id']}' must be lowercase letters/digits/_ (it is a file name and a cue key)")
        if not re.fullmatch(r"[a-z][A-Za-z0-9_]*", s["scene"]): err.append(f"segments: scene '{s['scene']}' must be a JS identifier starting lowercase (it becomes S.{s['scene']})")
        if s["id"] in ("welcome", "bye") or s["scene"] in ("welcome", "end"):
            err.append(f"segments: '{s['id']}'/'{s['scene']}' is reserved: the kit adds the welcome (after hook) and the goodbye (end card) itself")
        if re.search(r"\d", s["text"]): print(f"  note: {s['id']} contains digits; they are read by the TTS but get no word timing (spell numbers out to cue them)")
    if ids[0] != "hook": err.append(f"segments: the first segment id must be 'hook' (got '{ids[0]}'); the welcome is inserted after it")
    if "quiz1" not in ids or "quiz2" not in ids: err.append("segments: need a 'quiz1' (question) and a 'quiz2' (answer) segment")
    else:
        i = ids.index("quiz1")
        if i + 1 >= len(ids) or ids[i + 1] != "quiz2": err.append("segments: 'quiz2' must come right after 'quiz1' (the 4-second countdown sits between them)")
        elif segs[i]["scene"] != segs[i + 1]["scene"]: err.append("segments: quiz1 and quiz2 must share one scene")
    h2 = next((s for s in segs if s["id"] == "habit2"), None)
    if not h2 or h2["scene"] != "mindmap": err.append("segments: need a 'habit2' segment in scene 'mindmap' (the mind-map habit with the TheOneApp phone)")
    seen = []
    for s in segs:
        if seen and seen[-1] == s["scene"]: continue
        if s["scene"] in seen: err.append(f"segments: scene '{s['scene']}' comes back after another scene; segments of one scene must be consecutive (use a new scene name)")
        seen.append(s["scene"])


def check_config(cfg, n, segs, err):
    if not isinstance(cfg, dict): err.append("config: must be a JSON object"); return
    for k in cfg:
        if k not in CFG_KEYS and not k.startswith("_"): err.append(f"config: unknown key '{k}' (allowed: {', '.join(sorted(CFG_KEYS))}; prefix comments with _)")
    if not isinstance(cfg.get("topic"), str) or not cfg["topic"].strip(): err.append('config: "topic" (tag text after "TheOneApp, Explained - ") is required')
    g = cfg.get("goals")
    if not (isinstance(g, list) and len(g) == 3 and all(isinstance(x, list) and len(x) == 3 and all(isinstance(y, str) and y for y in x) for x in g)):
        err.append('config: "goals" must be 3 x [icon, on-screen label, spoken phrase]')
    else:
        for x in g:
            if len(x[1]) > 32: print(f"  warning: goal label '{x[1]}' is {len(x[1])} chars; over ~32 may not fit the welcome board")
    kw = cfg.get("kw")
    if not isinstance(kw, list) or not kw: err.append('config: "kw" needs at least one key word [segId, cueWord, LABEL, "#colour"(, SHORT)]')
    else:
        for k in kw:
            if not (isinstance(k, list) and len(k) in (4, 5) and all(isinstance(y, str) for y in k) and re.fullmatch(r"#[0-9a-fA-F]{6}", k[3])):
                err.append(f"config: bad key word {k}: want [segId, cueWord, LABEL, \"#rrggbb\"(, SHORT)]")
        if len(kw) > 14: err.append(f"config: {len(kw)} key words; the shelf holds at most 14")
    if not isinstance(cfg.get("short", {}), dict): err.append('config: "short" must map LABEL -> short shelf label')
    b = cfg.get("bursts", [])
    if not (isinstance(b, list) and all(isinstance(x, list) and len(x) == 2 and all(isinstance(y, str) for y in x) for x in b)):
        err.append('config: "bursts" must be a list of [segId, cueWord]')
    lab = cfg.get("lab")
    if lab is not None and not (isinstance(lab, dict) and all(isinstance(lab.get(k), str) and lab.get(k) for k in ("seg", "word", "code", "title", "part"))):
        err.append('config: "lab" must be null or {seg, word, code, title, part}')
    mm = cfg.get("mm")
    if mm is not None:
        if not (isinstance(mm, dict) and isinstance(mm.get("href"), str) and all(isinstance(mm.get(k), list) and len(mm[k]) == 4 for k in ("saved", "map"))):
            err.append('config: "mm" must be null or {href: "<png>", saved: [x, y, w, h], map: [x, y, w, h]}')
        elif not os.path.exists(mm_path(mm)): err.append(f'config: mind-map shot not found: {mm_path(mm)}')
    e = cfg.get("end")
    if e is not None and not (isinstance(e, dict) and isinstance(e.get("lines"), list) and 1 <= len(e["lines"]) <= 2 and all(isinstance(x, str) for x in e["lines"])):
        err.append('config: "end" must be {"kicker": "NEXT EPISODE" (optional), "lines": ["line 1", "line 2"]} (1 or 2 lines)')
    o = cfg.get("output")
    if not isinstance(o, str) or not re.fullmatch(r"(P3_EP\d\d_)?[A-Za-z0-9_]+(\.mp4)?", o): err.append('config: "output" must be like "SolidLiquidGas" or "P3_EP09_SolidLiquidGas.mp4"')
    elif o.startswith("P3_EP") and not o.startswith(f"P3_EP{n:02d}_"): err.append(f'config: "output" {o} does not match episode {n}')
    for k in ("intro", "bye"):
        if k in cfg and not (isinstance(cfg[k], str) and cfg[k].strip()): err.append(f'config: "{k}" must be a non-empty string when given')
    if not isinstance(cfg.get("pron", {}), dict): err.append('config: "pron" must map word -> ARPAbet phones')
    f = cfg.get("fills", "auto")
    if not (f == "auto" or f is False or isinstance(f, dict)): err.append('config: "fills" must be "auto" (default), false, or {scene: transform}')
    if not isinstance(cfg.get("nofill", []), list): err.append('config: "nofill" must be a list of scene names')


def mm_path(mm):
    p = mm["href"]
    return p if os.path.isabs(p) else os.path.join(R, p)


def output_name(cfg, n):
    o = cfg["output"]
    if not o.endswith(".mp4"): o += ".mp4"
    return o if o.startswith("P3_EP") else f"P3_EP{n:02d}_{o}"


def scan_scene_cues(code):
    """(seg, word) pairs used by the scene code: C("seg", "word") and aliases like  const a = w => C("seg", w)  ... a("word")"""
    found = []
    for blk in re.split(r"\n(?=S\.\w+\s*=)", code):
        alias = {}
        for m in re.finditer(r"(\w+)\s*=\s*\(?\s*(\w+)\s*\)?\s*=>\s*C\(\s*\"(\w+)\"\s*,\s*\2\s*\)", blk): alias.setdefault(m.group(1), set()).add(m.group(3))
        for m in re.finditer(r"(?<![\w.$])C\(\s*\"(\w+)\"\s*,\s*\"([^\"]+)\"\s*\)", blk): found.append(({m.group(1)}, m.group(2)))
        for a, segs in alias.items():
            for m in re.finditer(r"(?<![\w.$])" + re.escape(a) + r"\(\s*\"([^\"]+)\"\s*\)", blk): found.append((segs, m.group(1)))
    return found


def check_scenes(code, segs, cfg, err):
    if re.search(r"^\s*(const|let|var)\s+S\s*=", code, re.M): err.append("scenes: remove 'const S = {};' (the template declares S)")
    defined = set(re.findall(r"(?<![\w.$])S\.(\w+)\s*=(?!=)", code))
    for sc in dict.fromkeys(s["scene"] for s in segs):
        if sc not in defined: err.append(f"scenes: no S.{sc} = ... for scene '{sc}'")
    if "welcome" in defined: err.append("scenes: S.welcome is shared (kit/modules/welcome.js); do not define it")
    if "end" not in defined and not cfg.get("end"): err.append('scenes/config: no end card: give config "end": {"lines": [...]} (or define S.end in the scenes)')
    if "end" in defined and cfg.get("end"): print('  note: scenes define S.end, so config "end" is ignored')
    if cfg.get("mm") and not re.search(r"\.shot\s*=", code): err.append('scenes: config "mm" is set but the mindmap scene has no s.shot (use mmPhone(), see README)')
    extra = defined - {s["scene"] for s in segs} - {"end"}
    if extra: print(f"  note: scenes define S.{', S.'.join(sorted(extra))} but no segment uses those scenes")


def check_cues(full, cfg, code, err):
    keys = {s["id"]: cue_keys(s["text"]) for s in full}
    def need(seg, word, why):
        if seg not in keys: err.append(f"{why}: no segment '{seg}'")
        elif word not in keys[seg]: err.append(f"{why}: '{word}' is not spoken in segment '{seg}'{closest(word, keys[seg])}")
    for k in cfg.get("kw", []): need(k[0], k[1], f"key word {k[2]}")
    for sg, w in cfg.get("bursts", []): need(sg, w, "burst")
    lab = cfg.get("lab")
    if lab:
        if lab["seg"] not in keys: err.append(f"lab card: no segment '{lab['seg']}'")
        elif lab["word"] not in keys[lab["seg"]]: err.append(f"lab card: '{lab['word']}' is not spoken in segment '{lab['seg']}'")
    if cfg.get("mm"): need("habit2", "save", "mind-map phone (ring on Saved)")
    for w in WELCOME_CUES: need("welcome", w, "welcome (custom intro text)")
    for segset, w in scan_scene_cues(code):
        ok = [sg for sg in segset if sg in keys and w in keys[sg]]
        if not ok:
            sg = sorted(segset)[0]
            if sg not in keys: err.append(f"scenes: C(\"{sg}\", \"{w}\"): there is no segment '{sg}'")
            else: err.append(f"scenes: C(\"{sg}\", \"{w}\"): '{w}' is not spoken in segment '{sg}'{closest(w, keys[sg])}")


# ---------------------------------------------------------------- build steps
def tts(D, full, log):
    cache = f"{D}/aud/voice3_cache.json"; done = json.load(open(cache)) if os.path.exists(cache) else {}
    todo = [s for s in full if done.get(s["id"]) != s["text"] or not os.path.exists(f"{D}/aud/{s['id']}.wav")]
    if not todo: log("  TTS: all segments cached"); return
    log(f"  TTS voice 3 (Heart, expressive): {', '.join(s['id'] for s in todo)}")
    json.dump(todo, open(f"{D}/new_segs.json", "w"))
    with open(f"{D}/tts.log", "w") as lf:
        r = subprocess.run(NICE + [f"{TTS}/venv/bin/python", "expressive_batch.py", "model_q8.onnx", "voices.npz", f"{D}/new_segs.json", f"{D}/aud", "1.6"], cwd=TTS, stdout=lf, stderr=subprocess.STDOUT)
    if r.returncode: raise PrepError(f"TTS failed (exit {r.returncode}); see {D}/tts.log")
    for s in todo:
        if not os.path.exists(f"{D}/aud/{s['id']}.wav"): raise PrepError(f"TTS produced no aud/{s['id']}.wav; see {D}/tts.log")
        done[s["id"]] = s["text"]
    json.dump(done, open(cache, "w"))


def assemble(n, cfg, code, tl, fills, scenes_define_end):
    h = open(f"{K}/template.html").read()
    mod = lambda f: open(f"{K}/modules/{f}").read()
    lab = cfg.get("lab"); mm = cfg.get("mm")
    modules = ("window.LABCARD = " + json.dumps({k: lab[k] for k in ("seg", "word", "code", "title", "part")} if lab else None, ensure_ascii=False) + ";\n" + mod("labcard.js") + "\n"
               + "window.MMPHONE = " + json.dumps({"href": os.path.basename(mm_path(mm)), "saved": mm["saved"], "map": mm["map"]} if mm else None) + ";\n" + mod("mmphone.js") + "\n"
               + mod("countdown.js") + "\n")
    if fills: modules += "const FILL = " + json.dumps(fills) + '; for (const k in FILL) if (S[k]) S[k].stage.setAttribute("transform", FILL[k]);\n'
    shared = ""
    if not scenes_define_end:
        shared += "window.ENDCARD = " + json.dumps({"kicker": cfg["end"].get("kicker", "NEXT EPISODE"), "lines": cfg["end"]["lines"]}, ensure_ascii=False) + ";\n" + mod("endcard.js") + "\n"
    shared += "window.INTRO = " + json.dumps({"goals": [[g[0], g[1], c] for g, c in zip(cfg["goals"], ["first", "second", "third"])]}, ensure_ascii=False) + ";\n" + mod("welcome.js") + "\n"
    icon = cfg.get("icon") or cfg["goals"][0][0]
    for slot, val in [("/*@@MODULES@@*/", modules), ("/*@@SHARED_SCENES@@*/", shared), ("@@TAG@@", html.escape(f"{icon} TheOneApp, Explained - {cfg['topic']}")), ("/*@@SCENES@@*/", code.rstrip() + "\n")]:
        assert h.count(slot) == 1, slot
        h = h.replace(slot, val, 1)
    D = f"{R}/ep{n}"
    open(f"{D}/ep{n}.html", "w").write(h)
    open(f"{D}/ep{n}b.html", "w").write(h.replace("window.TL = __TL__;", "window.TL = " + open(f"{D}/tl.json").read() + ";", 1))
    return f"{D}/ep{n}b.html"


def prep(n, log=print):
    NN = f"{n:02d}"; D = f"{R}/ep{n}"; err = []
    log(f"ep{n}: prep ({R})")
    if not os.path.isdir(D): raise PrepError(f"no episode folder {D}: run kit/new_ep.sh {n} first")
    segs = load_json(f"{R}/plan/ep{NN}_segments.json", "segments", err)
    cfg = load_json(f"{R}/plan/ep{NN}.json", "config", err)
    scp = f"{D}/scenes_ep{n}.js"
    code = open(scp).read() if os.path.exists(scp) else (err.append(f"missing scene code: {scp}") or "")
    if err: raise PrepError("\n".join(err))
    check_segments(segs, err)
    if err: raise PrepError("\n".join(err))
    check_config(cfg, n, segs, err)
    if err: raise PrepError("\n".join(err))
    # full narration: hook, welcome, ..., goodbye
    G = cfg["goals"]
    full = [{k: s[k] for k in ("id", "scene", "text")} for s in segs]
    full.insert(1, {"id": "welcome", "scene": "welcome", "text": cfg.get("intro") or STD_INTRO.format(G[0][2], G[1][2], G[2][2])})
    full.append({"id": "bye", "scene": "end", "text": cfg.get("bye") or STD_BYE})
    check_scenes(code, segs, cfg, err)
    check_cues(full, cfg, code, err)
    pron = AL.load_pron(cfg.get("pron"))
    for sid, ws in AL.oov(full, pron).items():
        err.append(f"OOV: segment '{sid}' has words the aligner does not know: {ws}. Add 'word PHONES' lines to kit/pron.txt (ARPAbet, see cmudict) or the config \"pron\", or reword.")
    if err: raise PrepError("\n".join(err))
    json.dump(full, open(f"{D}/segments.json", "w"), indent=1, ensure_ascii=False)
    # voice + timing
    os.makedirs(f"{D}/aud", exist_ok=True)
    tts(D, full, log)
    byedur = BT.dur(f"{D}/aud/bye.wav")
    if byedur > BYE_MAX: raise PrepError(f"goodbye is {byedur:.2f} s; it must be <= {BYE_MAX} s to fit the 4 s end card (shorten config \"bye\")")
    try:
        al = AL.align(full, f"{D}/aud", pron, log=log)
    except AL.AlignError as e:
        raise PrepError(str(e))
    json.dump(al, open(f"{D}/align.json", "w"))
    tl = BT.build(D, al, cfg, log)
    # page
    if cfg.get("mm"): shutil.copy(mm_path(cfg["mm"]), f"{D}/{os.path.basename(mm_path(cfg['mm']))}")
    scenes_define_end = bool(re.search(r"(?<![\w.$])S\.end\s*=(?!=)", code))
    def check(page):
        r = node(f"{K}/check_page.js", page, "0.1")
        if r.returncode: raise PrepError("page check failed (fix the scene code):\n" + (r.stdout + r.stderr).strip())
        return r
    f = cfg.get("fills", "auto"); skip = set(cfg.get("nofill", []))
    fills = f if isinstance(f, dict) else {}
    page = assemble(n, cfg, code, tl, fills, scenes_define_end)
    r = check(page)
    if f == "auto":   # enlarge each scene into the empty space: measure the unfilled page, then rebuild with the transforms
        m = node(f"{K}/fill_measure.js", page, f"{D}/fills_box.json")
        if m.returncode: raise PrepError(f"fill measure failed:\n{m.stdout}{m.stderr}")
        fills = FC.calc(json.load(open(f"{D}/fills_box.json")), skip)
        json.dump(fills, open(f"{D}/fills.json", "w"), indent=1)
        page = assemble(n, cfg, code, tl, fills, scenes_define_end)
        r = check(page)
    out = f"{R}/{output_name(cfg, n)}"
    json.dump({"n": n, "page": page, "out": out, "END": tl["END"]}, open(f"{D}/meta.json", "w"), indent=1)
    w = next(s for s in tl["segs"] if s["id"] == "welcome")
    log(f"ep{n}: END {tl['END']:.1f}s  welcome {w['t0']:.1f}-{w['t1']:.1f}  bye {byedur:.2f}s  key words {len(tl['kws'])}  bursts {len(tl['bursts'])}  "
        f"fills {len(fills)}  lab {'yes' if cfg.get('lab') else 'no'}  mm {'yes' if cfg.get('mm') else 'no'}")
    log(f"ep{n}: {r.stdout.strip()}")
    log(f"ep{n}: OK -> {page}  (render: bash {D}/run_all.sh -> {out})")


if __name__ == "__main__":
    if len(sys.argv) < 2: sys.exit(__doc__)
    bad = 0
    for a in sys.argv[1:]:
        try:
            prep(int(a))
        except PrepError as e:
            bad += 1; print(f"ep{a}: PREP FAILED\n  " + str(e).replace("\n", "\n  "), file=sys.stderr, flush=True)
    sys.exit(1 if bad else 0)
