# P4 EP1 v2 build state (for a resume after a restart)
P4 EP1 **v2, "The Great Void Deck Race"** (Systems: bike, body, tree), ONE video, **7:10.3** (the story to 6:41, then the read-along,
"Now you know!", 4.6 s of outro with Chilli, and a 6 s blooper after the end card). Script approved by the teacher on 26 Nov 2026 ("OK to
the EP1 v2 script"): `../p4/p4_ep01_script.md` (v2; every spoken line word for word: `script.py`). Built by one Opus agent on 26 Nov 2026.
**NOT uploaded**: the main session shows the teacher first. It REPLACES the old P4 EP01 FOvUezOZJbo (never deleted) and supersedes the v1
build `../p4ep01/` (left as it was).

## Decisions on the script's open questions (the teacher did not object)
- **Fix cards 2 and 3 swapped:** card 2 = ALL THREE PARTS BACK (Pip, right), card 3 = CHAIN + BRAKES, skip the bell (Momo, near miss). Every
  reference follows: Pip's pitch "Fix two: put all three parts back. I made a checklist." comes second (so the checklist tease follows it),
  Momo's "Fix three: ..." third; picks Basil 1, Pip 2, Momo 3; the lock-in; card 2 READY TO RIDE!, card 3 NOT SAFE YET; "That's my fix
  three!"; "Picked fix two? You win a point, and so does Pip!"; the app moments; the chapters.
- Length kept (no cuts); slapstick, both talk-to-camera moments and Heart's trailer voice kept as written.
- **The teacher's toot (26 Nov, via the coordinator):** after "Slowly, slowly." Basil slumps over his bars, a tiny toot (sound only), Momo:
  "Was that the bike?" Basil (deadpan): "Yes." (r703m, r703b; the only gag of that kind).

## The build model
Engine copied from `../p4ep01/` (lib.js with stayOf / carryIn / the melt fixes, common.js, main.js, render.js, song.js "Scoop Parade"
family). New files: `artv2.js` (Uncle Lim, his roadster, head-on and rear views, the snail, pigeons, ice box, stools, ball, crown, clipboard,
flag, ribbon, comic-book sound words, battle-cry letters, the sets vdv2 / rampv2 / gardenv2 (baked) and the scrolling runaway track),
`p1.js` (helpers + cold open to picks), `p2.js` (flashback, runaway, race), `p3.js` (look-closer to blooper), `new_poses.py`, `thumbP4v2.js`.
- **Items** (`items_options.js`, loaded live with `window.ITEM_OPT = { pip: "B", momo: "A", basil: "A" }`, switchable in page.html): Pip's
  lilac helmet + goggles + chin strap (B; anchors added for pointing / arms_crossed / waving), Momo's short teal cord and small magnifier
  (A; anchor added for oops), Basil's re-pinned badge (A) **plus Basil's bike helmet** (`window.BASIL_HELMET`, on all episode: he rides):
  Pip's helmet shell in sun-orange over his crown spines, the side spines showing below the rim, chin straps down the cheeks to the jaw
  corners (a strap across a lizard's face reads as a mouth), measured per pose (BASILH). His back view wears a matching helmet (code-drawn).
- **The bikes**: Basil's bike = artp4 bikeP4 (drive side, sprocket on the back hub, chain tangent; centred as bike_options found); the
  four-pictures fix became the five pictures (PEDALS → FRONT GEAR → CHAIN → BACK GEAR → BACK WHEEL) with centred icons. Riders sit on the
  SADDLE only: head-on with a cardboard race plate (it hides Basil's sitting legs), from behind (his back view on the saddle), the
  snail-cam (only his tail shows), or riderless. Uncle Lim is code-drawn, so his feet are on the pedals.
- **Basil's back view**: the teacher's grey `poses/basil_back.png` recoloured to the v2 teal by `new_poses.py` (no v2 back painting yet).

## New emotion paintings: switchable by name (lib.js resolvePose / NEWPOSE_FALLBACK)
The scenes ask for `pip_embarrassed, pip_panic, pip_proud, pip_angry, pip_dizzy, pip_ride, momo_facepalm, momo_laugh, momo_unimpressed,
momo_horrified, basil_deadpan, basil_shocked, basil_laugh, basil_shrug, basil_hero` (as "panic/oops" = new name / today's stand-in). When the
teacher's painting is in `characters/sprites/poses/` (`<who>_<pose>.png` or the v2 cast's `<who>_v2_<pose>.png`), run `python3 new_poses.py`
and re-render: no code change. Stand-ins now: deadpan/unimpressed → sit, shocked/horrified/dizzy → surprised, shrug/embarrassed/facepalm →
oops, panic → thinking, proud → arms crossed, angry → pointing, hero → arms crossed + wind lines, momo laugh → cheer with a giggle shake,
basil laugh → laughing. pip_ride: Pip rides alongside in the victory lap when present. **Before using a new painting, measure its helmet /
goggles / magnifier / badge anchors** (items_options.js PIPH, MOMOH, BASH, BASILH): an unmeasured pose shows no item (no helmet).

## Voices
All lines recorded and aligned (`voice.log`, `voice2.log`; not aligned: none). Heart af_heart .90, buddies 12% slower (Character Voice Kit).
Ritual voices copied from v1. **Heart's trailer voice** (r701): her own recording pitched down 3 semitones + a hall reverb (make_voice.py
`trailer_fx`). **New guest voice: Uncle Lim** (`vm.CHARACTERS["lim"]`: bm_george .45 + am_michael .55, speed .96 (x.88), formant .95,
median 112 Hz, range 1.15; measured median F0 114 Hz). Test clip for the teacher: `../pron_clips/UncleLim_p4ep01v2_voice_test.mp3`.
"I told you s..." is spoken as "sss..." (pron), cut off.

## Pacing
810 spoken words, **7:10.3 = 113 words a minute** (series range 105-117), voice on 66%. The script's 6:30 estimate assumed the v1 ratio;
with every line kept the series pace puts it at about 7:10 (the gaps were tightened from 7:27: .8 s between lines, about 1.2 s between scenes).

## Checks (from explained2/)
- `qa/ghost_scan.txt`: no buddy ghosting. `qa/facing_scan.txt`: no backwards movers (FACES notes on every mover: bikes, Uncle Lim, the snail,
  pigeons, the YOU link; mirrored where they travel left). `qa/flicker_scan.txt`: no POP / GONE; the JUMP lines left are the deliberate camera
  cuts inside a scene (bell: three-shot → from behind → the front; brakes: the low angle on the front wheel; runaway: four shots; ride: the lap →
  the rain tree), each checked by eye. `qa/overlap.txt` (popfix2 overlap.js at 5 fps): no buddy over a label, card or another buddy's face that
  matters (the runs left are the riders sitting ON the journey's chain links, the ice behind Basil in the box, and a blurred backdrop).
- Every 2.5 s of the video checked as stills (`qa/sweep/` sheets in the scratchpad) and fixed: bubbles over labels, the refrain strip
  doubling the bubble, comic words over faces, the trailer push-ins (now letterbox panels), the split screen's clip, crowded two-shots.

## Upload (the main session, after the teacher's OK)
`upload.json` (key `explained-p4-ep01-v2`; replaces FOvUezOZJbo, retire_old; playlists PLK9BW3T6kXx4 and PLPfEuT7l4KjI, both `after`
FOvUezOZJbo), `thumb.jpg` (LOST TO A SNAIL?!) + `qa/thumb_320.jpg`, chapters `production/youtube/chapters_p3.json` key `P4EP01V2`,
`app_moments.json` (videos.js P4 entry no. 1, 9 moments), `p4ep01v2.srt`. Heart mystery hint #2 logged in SecondBrain
`Plans/videos/P4-new-direction.md` (5:28.3, 6 frames).
