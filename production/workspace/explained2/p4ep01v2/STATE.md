# P4 EP1 v2 build state (for a resume after a restart)
P4 EP1 **v2, "The Great Void Deck Race"** (Systems: bike, body, tree), ONE video, **7:16.2** (was 7:10.3 before Uncle Lim's longer Singlish lines; P4 max 8:00) (the story to 6:41, then the read-along,
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
- **Items** (`items_options.js`, loaded live with `window.ITEM_OPT = { pip: "B", momo: "N", basil: "A" }`, switchable in page.html): Pip's
  lilac helmet + goggles + chin strap (B; anchors added for pointing / arms_crossed / waving), Momo's magnifier on a **teal polka-dot neckerchief** (option N, 26 Nov: the cord (A) read like a second smile; the scarf is tied
  at the neck below the cheek fur, a ring at its tip holds the magnifier; fitted per pose, flipped too; sheet scratchpad p4items/momo_cord_fix.jpg), Basil's re-pinned badge (A) **plus Basil's bike helmet** (`window.BASIL_HELMET`, on all episode: he rides):
  Pip's helmet shell in sun-orange over his crown spines, the side spines showing below the rim, chin straps down the cheeks to the jaw
  corners (a strap across a lizard's face reads as a mouth), measured per pose (BASILH). His back view wears a matching helmet (code-drawn).
- **The bikes**: Basil's bike = artp4 bikeP4 (drive side, sprocket on the back hub, chain tangent; centred as bike_options found); the
  four-pictures fix became the five pictures (PEDALS → FRONT GEAR → CHAIN → BACK GEAR → BACK WHEEL) with centred icons. Riders sit on the
  SADDLE only: head-on with a cardboard race plate (it hides Basil's sitting legs), from behind (his back view on the saddle), the
  snail-cam (only his tail shows), or riderless. Uncle Lim is code-drawn, so his feet are on the pedals.
- **Basil's back view**: the teacher's NEW coloured back painting (26 Nov, `poses/basil_v2_back.png`), copied by `new_poses.py` (the ride-off,
  the victory lap, the journey's last rider). Pip's and Momo's coloured backs exist too and are unused here.

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

## Fix pass 2 (26 Nov 2026, after the coordinator's review; NOT uploaded)
- **Uncle Lim redrawn** (`limv2.js`, loaded after artv2.js; it replaces artv2's limStand / limRideV2 / limFrontRideV2 / limRearRideV2):
  head on a neck, shoulders, two arms with mitten hands, a checked short-sleeved shirt with folds and shading, khaki shorts, knees, sandals.
  Riding: seat ON the saddle, BOTH hands on the grips (far arm and leg darker, behind the frame), feet ON the pedals (two-bone legs solved per
  pedal, turning with the cranks); ringing: near hand on the bell. Sips only when stopped: the near hand lifts the kopi bag (straw at his
  lips), the far hand stays on the bar; his kopi otherwise rides in the basket. Standing: hands at his sides / the bag in one hand / a sip /
  a wave. Head-on and rear views: both mittens on the grips. He does not sip while he talks (race). Sheet: scratchpad p4items/uncle_lim_redraw.jpg.
- **Uncle Lim speaks light Singlish** (teacher: "lacking the singlish element"): r703 "Slowly, slowly lah. Where got need to rush?", e1303 "Aiyoh,
  boy. Slowly, slowly also can win one, mah. Every part working together!". Particles shaped by `../sg_pron.py shape_particles` (short, level then
  falling, a small pause before; "Aiyoh" = EYE-yoh with a fall): see ../PRONUNCIATION.md. Test clip re-made: ../pron_clips/UncleLim_p4ep01v2_voice_test.mp3.
- **The ice box (runaway D)**: Momo shoves the box in and stays right of it (box + 340, h 340); Pip runs in from the LEFT after the bonk and
  stops left of the crown stool facing Basil (430, h 330). overlap.js 166-186: no buddy over another buddy's face.

## Upload (the main session, after the teacher's OK)
`upload.json` (key `explained-p4-ep01-v2`; replaces FOvUezOZJbo, retire_old; playlists PLK9BW3T6kXx4 and PLPfEuT7l4KjI, both `after`
FOvUezOZJbo), `thumb.jpg` (LOST TO A SNAIL?!) + `qa/thumb_320.jpg`, chapters `production/youtube/chapters_p3.json` key `P4EP01V2`,
`app_moments.json` (videos.js P4 entry no. 1, 9 moments), `p4ep01v2.srt`. Heart mystery hint #2 logged in SecondBrain
`Plans/videos/P4-new-direction.md` (5:30.69-5:30.89, frames 9921-9926 = 6 frames, checked in the video after the fix-pass-2 render).

## Render (26 Nov 2026)
One full render of the final code (after the review fixes: the stop-3 / runaway bike without its chain, the cold open's labels clear of the
battle cry, the SYSTEM bubble clear of the key word, spacing at the bell / ice box / rain tree, the journey riders leaving before the
pull-out, the cards rising in front at the picks, the coloured back view). `p4ep01v2.mp4`: see the numbers in the main report / finish.log
(`out/finish.log`): 1920x1080, 30 fps, 12910 frames = 7:10.3, decode 0 errors, -16.0 LUFS, true peak -1.9 dBTP. `sheet.png` (30 stills),
`p4ep01v2.srt`, `qa/key_frames.jpg`, `qa/review_opening_0-30.mp4` and `qa/review_runaway.mp4` (960 px, with sound, 30 s each: not committed),
`thumb.jpg` + `qa/thumb_320.jpg`. Intermediates (chunks, the silent video) deleted; `out/mix_p1.wav` kept for a splice.

## Render, fix pass 2 (26 Nov 2026, 16:12 UTC)
One full render of all the fix-pass-2 code (flock): `p4ep01v2.mp4` 1920x1080, 30 fps, **13086 frames = 7:16.2** (well under P4's 8:00),
decode 0 errors, -16.0 LUFS, true peak -1.9 dBTP; 831 words, 114 wpm. `p4ep01v2.srt` carries the new Singlish lines. `sheet.png`,
`qa/key_frames.jpg` (12), review clips (960 px, sound, not committed): `qa/review_opening_0-30.mp4`, `qa/review_runaway.mp4` (153.45-183.45,
the ice box), **new** `qa/review_race_lim.mp4` (196.4-226.4, "Slowly, slowly lah. Where got need to rush?") and `qa/review_finish_lim.mp4`
(386.6-407.6, "Aiyoh, boy. ..."). Scans re-run on the final code: no ghosting; no backwards movers; flicker 10 JUMPs, all deliberate camera
cuts, no POP/GONE; overlap.js (5 fps, whole video): **no buddy over another buddy's face** (the shrink riders were re-ordered: Basil drawn first,
a little further back on the chain). Hint #2 checked in the video at frames 9921-9926.

## Fix pass 3: faces (26 Nov 2026, after the main session's still check; NOT uploaded)
- **Race split screen (3:21-3:27):** Uncle Lim's bubble is one line, drawn in the empty space right of his helmet with its tail pointing
  down-left to him (`say("r703", 1490, 372, ...)`): never over his head or the WINNER pill. Momo sits behind his bike (the right panel is
  drawn as backdrop, Momo, then Uncle Lim) and a little further left (x 240), so the roadster reads clearly.
- **New check `../qa/face_cover_scan.js`** (from explained2/: `NODE_PATH=$(npm root -g) node qa/face_cover_scan.js p4ep01v2 1 0-437`): bubbles,
  pills, cards, words, comic words AND buddy sprites (by their painted alpha) against EVERY face: the buddies' and the code-drawn
  characters' (Uncle Lim's head, the snail, Chilli, the YOU link). Skips a buddy's own items and faces under a full-frame dim layer.
  Result: `qa/face_cover_scan.txt`.
- Fixed from it: CLINK! (1:24) below Pip's face; SPROING! (1:52) above the faces; snail-cam "squelch." off the snail; the replay pill
  ("it looks exactly the same") above the snail; the tease (2:09-2:13) snail moved where it shows (it was wholly behind Momo); the brakes
  YOUR TURN! pill clear of Pip's helmet and Momo's ears; Momo's "But WHY..." bubble (2:25) off Pip's head; Pip in the ice-box shot at 470
  (off the snail); Basil's look-closer bubbles (4:03, 4:14) off his helmet; the see-saw card (4:10-4:13) left so Uncle Lim's face shows;
  the chain-ride tag "You: one link of a bike chain" fades before the riders pass under it; the finish snail starts right of Pip; the
  outro (7:06-7:10) Momo 1470 / Basil 1795 so Chilli shows on the desk and Momo no longer covers Basil.
- Left by design (eye-checked): Pip's own CHECKLIST clipboard at her chest; the pick cards rising past the faces (56.0-56.2 s); the
  trailer push-in panel (3:05); the side-by-side cards springing in over the dimmed race (one frame); runners passing the snail; the
  THINK card over the dimmed scene; Chilli hopping in behind the buddies (0.4 s each); the heart inset on Basil's chest (his face clear).
- **Splice** (scratchpad ghost/msplice.sh + nyk/tools/verify.py): spans 80-90, 110-150, 170-210, 240-280, 380-400, 410-end re-rendered;
  VERIFY OK (13086 frames, decode 0, audio bit-identical, every packet outside the spans bit-identical). -16.0 LUFS, -1.9 dBTP. Scans
  after: no ghosting, no backwards movers, flicker 10 JUMPs (camera cuts) no POP/GONE, overlap.js no face, face_cover_scan as above.
  srt unchanged; hint #2 frames 9921-9926 untouched (outside the spans).

## Fix pass 4: the teacher's painted Momo (27 Nov 2026; NOT uploaded)
- The teacher painted Momo with the neckerchief and a GOLD MEDAL ("i got the pose of the collar fixed"): five paintings in
  `../characters/teacher_momo_neckerchief_2026-11-27/` (arms_crossed, thinking, pointing, cheer, surprised). Cut out by
  `../characters/sprites/poses.py` (set `momo_nk`, on momo_v2's sitting set: same scale and feet line; `WHO=momo_nk python poses.py <poses>`;
  the cheer painting faced the other way and is mirrored, FLIPX) -> `poses/momo_nk_<pose>.png`. Checked against each momo_v2 twin (onion
  sheet: same head top, feet line and body centre; scratchpad p4items/momo_nk_vs_v2.jpg). `nk_poses.py` scales them into `spr/momo_nk_<pose>.png`
  and points the manifest's momo_<pose> entries at them (the v2 sprites stay on disk). horrified/surprised and laugh/cheer use them too.
- items_options.js option N: no code overlay on the five painted poses (MOMO_PAINTED); the others (sit, oops, waving) keep the code-drawn
  neckerchief with the painting's gold medal (`medalP`: short black strap, small ring, 48 px gold disc, two shines) instead of the magnifier.
- The magnifier is a hand-held prop (`momoMagHeld`), drawn only when a scene passes `{ mag: true }` to Momo in her pointing pose: after
  b404 (81.5-83.2 s, she points at the bell with it) and after l803 (236.9-238.3 s, at the chain in the look-closer). Her pointing poses
  there were lengthened to hold it.
- **Render (27 Nov, 02:02-02:18 UTC):** a full re-render to a NEW file (`out/run_render_nk.sh`: the new video + the verified file's own
  audio stream, copied), checked with verify.py against the verified mp4 before replacing it: VERIFY OK (13086 frames = 7:16.2, decode 0,
  audio packets bit-identical, streams identical; frames before 10.17 s bit-identical, Momo enters there). -16.0 LUFS, -1.9 dBTP; srt
  unchanged; timings unchanged. Scans on the final code: no ghosting, no backwards movers, flicker 10 JUMPs (the camera cuts) no POP/GONE,
  overlap.js no face, face_cover_scan the same 68 runs as before (all reviewed, by design). Before/after sheet: scratchpad
  p4items/momo_painted_before_after.jpg; key frames, sheet.png and the four review clips refreshed.
