# P3 build kit: "TheOneApp, Explained - &lt;topic&gt;"

Builds Primary 3 episodes with every feature of the finished P4 series (welcome with 3 goals, Heart "voice 3",
word-timed captions with the TheOneApp brand merge, key-word pops and shelf, confetti bursts, the 4-second quiz
countdown, the School Lab card, the "My mind map" phone, scene enlargement fills, the end card with spoken goodbye,
48 kHz stereo mix, review-board web parts) from three authored files per episode. No P4 patch layers: everything
P4's `prep_all.py` patched in is built in here.

Paths below: `R` = `/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/P3`,
`K` = `R/kit`, `W` = `/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad`.
The kit reads (never writes) the P4 workspace: TTS engine `../tts`, fonts `../ep1/fonts`, default phone image `../ep1/oneapp_mind.png`.

## Commands

```bash
bash R/kit/new_ep.sh 9                    # once: R/ep9/ (aud/, st/, fonts link, wrappers, placeholder scenes_ep9.js)
# author R/plan/ep09_segments.json, R/plan/ep09.json, R/ep9/scenes_ep9.js   (contracts below)
bash R/ep9/prep.sh                        # = python3 R/kit/prep_p3.py 9   (several: prep_p3.py 1 2 3)
```

`prep_p3.py` validates everything first (no TTS is spent on a broken episode), then: adds welcome + goodbye, runs
voice 3 TTS for new/changed segments only (cache `R/epN/aud/voice3_cache.json`), aligns words, builds the timeline,
assembles the page, measures + applies scene fills, and finally renders the whole page every 0.1 s to catch scene
errors. Outputs in `R/epN/`: `epN.html` (template, TL placeholder), `epNb.html` (self-contained page: preview/render this),
`tl.json`, `voice.wav`, `segments.json` (with welcome/bye), `align.json`, `fills.json`, `meta.json`. Exit code 1 and a
list of problems on any failure. Env: `P3_ROOT` (default `R`), `NICE` (default 10).

Preview (look up times in `R/epN/tl.json`: `scenes`, `segs`, `cues`, `kws`, `bursts`):
```bash
NODE_PATH=$(npm root -g) node W/snap.js R/ep9/ep9b.html W/snaps/ep9 16.5 34 119.1 155.6 213.8 233.8   # -> W/snaps/ep9_<t>.jpg
bash R/ep9/stills.sh 16.5 34                                                                            # -> R/ep9/st/s_<t>.jpg
```

Render (60 fps, 4 parallel parts, waits while any other render runs):
```bash
bash R/ep9/run_all.sh                     # -> R/P3_EP09_<Name>.mp4 (name from config "output")
bash R/kit/render_queue.sh 9 10           # render + split into W/web3/epNN_<i>.mp4 parts (<= ~14 MB); log R/render_queue.log
# batch, in the background:
nohup bash R/kit/prep_loop.sh 1 2 3 > /dev/null 2>&1 &   # log R/prep.log; good episodes -> R/queue.txt
nohup bash R/kit/render_loop.sh > /dev/null 2>&1 &       # renders R/queue.txt in order; stops after "PREP DONE" or 95 min
```
Other wrappers in `R/epN/`: `sfx.sh` (rebuild `sfx.wav`), `align.sh` (re-align only, debug).

## 1. Segments: `R/plan/epNN_segments.json`

```json
[{"id": "hook", "scene": "hook", "text": "Can you squeeze a rock into a smaller space? No. ..."},
 {"id": "intro", "scene": "intro", "text": "Matter can be in three states. ..."},
 ...
 {"id": "quiz1", "scene": "quiz", "text": "Pause and predict! Which one ...? A marble, milk, or air?"},
 {"id": "quiz2", "scene": "quiz", "text": "Milk! It is a liquid. ..."},
 ...
 {"id": "habit2", "scene": "mindmap", "text": "Now your mind map. ... Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map."},
 {"id": "close", "scene": "close", "text": "..."}]
```
* No welcome and no goodbye (the kit adds both). First id is `hook`.
* `id`: lowercase `[a-z][a-z0-9_]*`, unique (audio file name and cue key). `scene`: JS identifier starting lowercase; it becomes `S.<scene>`.
  `welcome`/`bye` ids and `welcome`/`end` scenes are reserved.
* Segments of one scene are consecutive (a scene cannot come back later; use a new name).
* Must contain `quiz1` immediately followed by `quiz2`, both in the same scene, and `habit2` in scene `mindmap`.
* Text = exactly what Heart says. "TheOneApp" is spoken "The One App"; captions always show "TheOneApp" (also when you write "The One App").
  Captions are chunks of up to 5 words, broken after `, . ? !`.
  Digits are read aloud but get no word timing (borrowed from neighbours): spell numbers out when you need a cue or a lab code ("experiment three point two").
* Every spoken word must be in cmudict or in `K/pron.txt` / config `"pron"` (else prep stops with `OOV`).

## 2. Config: `R/plan/epNN.json`

```json
{
 "topic": "States of Matter",
 "icon": "🧊",
 "goals": [["🧊", "What a solid is", "what a solid is"],
           ["💧", "What a liquid is", "what a liquid is"],
           ["💨", "What a gas is", "what a gas is, and which one can be squeezed"]],
 "kw": [["intro", "states", "3 STATES OF MATTER", "#7209b7", "3 STATES"],
        ["intro", "shape", "DEFINITE SHAPE", "#ef476f"],
        ["gas1", "compressed", "GAS CAN BE COMPRESSED", "#06d6a0"]],
 "short": {"GAS CAN BE COMPRESSED": "GAS: SQUEEZABLE"},
 "bursts": [["earth", "three"], ["quiz2", "milk"], ["close", "gas"]],
 "lab": {"seg": "gas2", "word": "try", "code": "3.2", "title": "Solids, liquids and gases side by side", "part": "Part (c): A gas"},
 "mm": {"href": "/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/mm/mm_ep9.png", "saved": [327, 35, 158, 62], "map": [24, 266, 732, 371]},
 "end": {"lines": ["How to weigh air", "(yes, really) ⚖️"]},
 "output": "SolidLiquidGas"
}
```

| key | required | meaning |
|---|---|---|
| `topic` | yes | top-left tag reads `<icon> TheOneApp, Explained - <topic>` (pill sized to the text) |
| `icon` | no | tag emoji (default: first goal's icon) |
| `goals` | yes | 3 x `[icon, on-screen label (<= ~32 chars), spoken phrase]`. Spoken: "Today, you will learn three big ideas. First, <g1>. Second, <g2>. And third, <g3>. Let's get started!" |
| `kw` | yes (1-14) | `[segId, cueWord, LABEL, "#rrggbb", SHORT?]` key word pops at that cue, then flies to the shelf (shelf order = time order) |
| `short` | no | `{LABEL: SHORT}` shelf labels (or 5th kw item); default SHORT = LABEL |
| `bursts` | no | `[[segId, cueWord], ...]` confetti + ding at those cues |
| `lab` | no / null | School Lab card `{seg, word, code, title, part}`: shows from the LAST `word` in `seg` until 0.6 s after `seg` ends |
| `mm` | no / null | "My mind map" shot (780x1688 PNG from TheOneApp's maker; path absolute or relative to `R`), `saved` = box of the "Saved ✓" pill, `map` = box of the map, both `[x, y, w, h]` in shot pixels |
| `end` | yes unless scenes define `S.end` | end card: `{"kicker": "NEXT EPISODE" (default), "lines": [1 or 2 lines]}` |
| `output` | yes | `"Name"` -> `R/P3_EPNN_Name.mp4` (or a full `"P3_EPNN_Name.mp4"`) |
| `bye` | no | goodbye text (default "Thanks for watching! See you next time. Bye!"; last episode: "Thanks for watching! See you soon. Bye!"); must speak in <= 3.15 s |
| `intro` | no | full welcome text override; must still say welcome, today, first, second, third, started |
| `pron` | no | `{"word": "ARPABET PHONES"}` one-off pronunciations for the aligner |
| `fills` | no | `"auto"` (default: measured), `false` (none) or `{scene: "transform"}` (fixed) |
| `nofill` | no | scenes never enlarged |
| `_anything` | no | comments |

Unknown keys are an error (typo guard).

## 3. Scene code: `R/epN/scenes_epN.js`

Plain JavaScript pasted into the page right after `const S = {};`. It runs once to build SVG; then for every frame
`window.render(t)` calls `s.run(t)` of each visible scene. Frames are rendered out of order by 4 parallel workers, so
**`s.run(t)` must be a pure function of `t`** (no state carried between frames, no `Math.random`/`Date`: use `rnd()` at build time).

### Shape of a scene
```js
// ---- SOLID
S.solid = (() => { const s = scene("solid", "#ffe8d6", "#ddbea9");          // name = the segment "scene" value; 2 background colours
  s.ham = emo(s.stage, 0, 0, 140, "🔨");                                      // build everything on s.stage at load time
  s.c = chip(s.stage, "✓ definite SHAPE", "#ef476f", {fs: 34});
  s.run = t => { const a = w => C("solid", w);                               // cue alias for this segment
    op(s.ham, ramp(t, a("hammer"), a("hammer") + .2)); set(s.ham, "x", 440); set(s.ham, "y", 560 + Math.sin(t * 6) * 8);
    op(s.c, ramp(t, a("shape#2"), a("shape#2") + .2)); popAt(s.c, 760, 160, t, a("shape#2"));
  }; return s; })();
```
* One `S.<scene>` for every distinct segment `scene`. Do not declare `S`, do not define `S.welcome` (shared).
  `S.end` is optional (default end card from config `end`).
* Canvas is 1920x1080. Stage centre is x = 760. Keep content inside x 50..1480 (the key-word shelf is on the right),
  y 100..950 (tag top-left, captions at y 975..1045).
* A scene fades in 0.4 s before its first segment starts (`SC.<scene>.t0`) with a small zoom, and fades out 0.4 s before the next scene starts.

### Cues
* `C(seg, word)` = start time (s) of that word in segment `seg`. `word` is the text token lowercased with everything except
  a-z and `'` removed: `"Squeeze?"` -> `squeeze`, `"ball's"` -> `ball's`, `"TheOneApp,"` -> `theoneapp`.
  First occurrence: `word` (= `word#1`); later ones `word#2`, `word#3`, ...
* Any segment can be cued, including `welcome` and `bye`. A missing cue throws `cue seg:word`; prep reports it before TTS
  (literal `C("seg", "w")` calls and aliases like `const a = w => C("seg", w); a("w")`) and again by rendering every 0.1 s.
* Also available: `SC[scene]` = `{scene, t0, t1}`, `TL.segs` = `[{id, scene, t0, t1}]`, `TL.END`, `TL.cues[seg]`.

### Helpers (from `K/template.html`)
| helper | does |
|---|---|
| `scene(name, c1, c2)` | new scene group with gradient background and floating bubbles: `{g, b, stage, name}` |
| `el(tag, attrs, parent)` | create an SVG element: `el("rect", {x: 0, y: 0, width: 10, height: 10, fill: INK}, s.stage)` |
| `tx(parent, attrs, text)` | SVG text: `tx(s.stage, {x: 760, y: 200, "text-anchor": "middle", "font-size": 72, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 12}, "TITLE")` (`class: "out"` = dark outline) |
| `emo(parent, x, y, size, "🔥")` | colour emoji centred on x, y |
| `chip(parent, label, colour, {fs, ink, w})` | pill label, hidden until you `op()` it; width fits the real text (or fixed `w` with text shrunk to fit) |
| `mmPhone(parent)` | TheOneApp phone for the mind-map scene: `{g, scr, shot}` (see below) |
| `op(e, v)` `set(e, k, v)` `tf(e, transform)` | opacity (clamped) / attribute / transform |
| `ramp(t, a, b)` | 0 -> 1 eased between a and b |
| `on(t, a, b = 1e9, f = .25)` | 0 -> 1 at a (over f), back to 0 at b |
| `pop(t, a, d = .45)` | overshooting 0 -> 1 scale from a |
| `popAt(e, x, y, t, a, extra = "")` | `translate(x y) scale(pop(t, a))`; pair with `op(e, ramp(t, a, a + .2))` |
| `clamp(x, a = 0, b = 1)` `lerp(a, b, k)` `ease(k)` `back(k)` | maths |
| `rnd()` / `seed` | deterministic random (build time only; set `seed = 21` for a stable layout) |
| `INK` | `"#1b1b3a"` outline/ink colour; filters `url(#sh)` (drop shadow), `url(#soft)` (blur) |

Reserved global names (do not redeclare): `S SC TL C KW CAPS conf order FILL drawCD drawLC drawKW drawCaps drawConfetti burst
chip bg scene moveBubbles mmPhone fitPill shrinkText CHIPS INK seed rnd NS $ el tx emo clamp lerp ease ramp back pop on set op tf popAt`.

### Features driven by the kit (nothing to code)
* **Welcome** (after `hook`) and **goodbye** (over the end card) are shared: `K/modules/welcome.js`, `K/modules/endcard.js`.
* **Key words** (config `kw`): a big "⭐ LABEL" pill pops at bottom centre (960, 860) on the cue with a pop sound, then after 1.9 s
  flies to the shelf (whoosh). Avoid important content near the bottom centre for ~2.5 s after a key-word cue.
* **Bursts** (config `bursts`): confetti from (760, 450) for 1.6 s + a ding. Old `burst(t)` calls in scene code do nothing.
* **Fills**: after a first build, the kit measures each scene's visible content (every 0.25 s) and scales the stage up to 1.5x
  into the safe area (skipped below 1.05x). A scene with anything >= 1500 wide or >= 900 tall on `s.stage` (ruled lines,
  a floor) is never enlarged. Use config `nofill` to keep a scene as drawn. Result in `R/epN/fills.json`.
* **Quiz countdown**: the timeline leaves 4.9 s between `quiz1` and `quiz2`; from `quiz1` end + 0.5 s a "⏸ Think! 4-3-2-1" pill
  with 4 clock ticks fills the caption strip. Keep the question and options on screen through the gap, reveal on `quiz2` cues,
  do not draw your own timer (a `S.quiz.ring` is hidden automatically), keep y > 950 clear.
* **School Lab card** (config `lab`): dims the frame and shows "🧪 Try it yourself in TheOneApp / School Lab › <code> <title> / <part> /
  Let's test it now! ▶". Say it in the narration, e.g. "You can try it in The One App. Open the School Lab, experiment three point two, and press, Let's test it now!".
* **Mind-map phone** (config `mm`): `S.mindmap` must have `s.shot`, the phone image. Use the helper:
  ```js
  const P = mmPhone(s.stage); s.phone = P.g; s.shot = P.shot;            // in the mindmap scene builder
  const ph = ramp(t, a("save"), a("save") + .6); op(s.phone, ph);        // in s.run (a = w => C("habit2", w)): show it from "save"
  tf(s.phone, `translate(${lerp(1650, 1320, ph)} 520) rotate(${lerp(12, -4, ph)})`);
  ```
  The kit loads the episode's shot into `s.shot`, rings "Saved ✓" from `habit2:save` + 0.7 s, and scrolls the whole map into view
  from the last `habit2:tap` (fallback `save` + 2.5 s). `habit2` must say "save"; the standard line is
  "Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map." Do not set `s.shot`'s y yourself.
  A hand-made phone also works if `s.shot` is an `<image>` at x -112, y -122, width 224 inside a 224x327 clip window.

## Checks (prep stops with a message)
Segments shape/ids/reserved names/consecutive scenes/quiz1->quiz2/habit2 in mindmap; config keys and types; mind-map shot
exists; `S.<scene>` for every scene; end card present; `s.shot` when `mm` is set; every cue used by key words, bursts, lab
card, mind-map phone, welcome and the scene code; OOV words; TTS output; goodbye <= 3.15 s; alignment (only a missed final
word is tolerated); fill measuring; a full render pass with no page errors.

## Files
`prep_p3.py` (pipeline), `build_tl.py` (timeline, captions, cues, brand merge), `align.py` + `pron.txt` (aligner),
`template.html` (page), `modules/` (welcome, endcard, labcard, mmphone, countdown), `fill_measure.js` + `fill_calc.py`,
`check_page.js`, `new_ep.sh`, `run_all.sh` + `render_par.js` + `sfx.py` (render + 48 kHz stereo mix), `stills.js`,
`prep_loop.sh`, `render_loop.sh`, `render_queue.sh`, `split_web.py` (W/web3 parts). Not in the kit: thumbnails (`../thumb.js`
works on any `epNb.html`) and YouTube chapters (scene times are in `tl.json`).

Verified 11 Oct 2026: P4 EP09 re-expressed in this format and built with the kit gave byte-identical `tl.json`, alignment,
fills and `voice.wav`, and byte-identical frames at 16 timestamps (welcome, key-word pop/fly, lab card, burst, countdown,
quiz reveal, mind-map ring/scroll, end card) compared with `../ep9/ep9b.html`.
