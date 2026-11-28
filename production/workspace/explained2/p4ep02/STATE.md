# P4 EP2 build state (for a resume after a restart)
P4 EP2, **"Help! I'm Wilting!"** (the Plant System), ONE video, **7:33.2** (453.18 s; P4 max 8:00): the story to 6:55, then the read-along,
"Now you know!", 4.6 s of outro, the blooper and GLITCH's final sting ("New knowledge acquired.", 7:30.6, then 0.5 s of black).
Script approved by the teacher on 27 Nov 2026 ("OK to the EP2 script"): `../p4/p4_ep02_script.md` **v2.1** (every spoken line word for word:
`script.py`). Built by one Opus agent on 27 Nov 2026 from the P4 EP1 v2 engine (`../p4ep01v2/`). **NOT uploaded**: the main session shows
the teacher first. It REPLACES the old P4 EP02 loaPYprOWDQ (never deleted).

## The build model
Engine copied from `../p4ep01v2/` (lib.js, common.js, main.js, render.js, song.js, the humour bus, the sad trombone, the pigeons, the
painted runs, the face_cover_scan, the VERIFY/splice method). EP2 files: `script.py`, `ep2art.js` (Chilli, GLITCH, the props and sets),
`p1.js` (helpers + cold open to picks), `p2.js` (water, lunch, both look-closers, system, GLITCH), `p3.js` (repair to the sting; it also
keeps EP1's code-drawn `chilliP4v2` as the stand-in), `sound_cues.js`, `guest_sprites.py`, `make_moments.py`, `thumbP4ep02.js`.
- **The desk:** the Science Help Desk (EP1's outro desk, bigger: `deskV3`), a cloth skirt carrying the sign in THREE handwritings
  (ALL PROBLEMS FIXED FAST! Basil teal / (carefully) Pip purple / (but WHY?) Momo coral). The sign is on the skirt, not standing on the desk,
  so nobody behind the desk is hidden by it; Chilli stands in the middle of the desk top (its home position in every desk scene), the bell at
  the right end. FAST is crossed out and PROPERLY written in teal at the finish.
- **Picks:** Momo 1 (right), Basil 2, Pip 3; OUTCOMES in lib.js (Basil shy w306 to the end of `water` and x603-x605; Pip shy u406 to the end
  of `lunch`). Key words: MAKE FOOD (u407), ABSORB (x604), TRANSPORT (j805). Score at k1006 (YOU +1, BUDDIES +1).

## The teacher's paintings (27 Nov 2026, `../characters/teacher_ep02_2026-11-27/`): ALL used; no stand-ins left
- **Chilli** (`../characters/chilli/cut_chilli.py` -> `cut/`, then `guest_sprites.py` -> `spr/`): every pose on ONE scale (the pot rim 200
  local units wide, the base centre at 0,0; the pots line up exactly: onion sheet scratchpad `p4ep02review/work/chilli_onion.jpg`).
  **Two layers** (coordinator, 27 Nov): the PLANT body follows the story, the FACE the emotion; a face is moved onto the body's pot in the
  shared pot coordinates and blended over the union of the two face areas (`transplant`). Bodies: `wilt` (chilli_droop's plant, green
  chillies), `mid` (chilli_midrecovery, half-recovered, green), `tallg` (chilli_alarmed's upright plant, two green chillies; its shake marks
  are not cut), `tallr` (chilli_tall's plant, ONE red chilli). Faces: droop, flat, alarmed, shy, tall, tall_happy, smug. Each face has
  closed / half / wide talking mouths and a blink, made by editing the face only (the painted mouth kept as one state; the eyes in-painted
  with a fitted glaze surface, not cv2.inpaint, which streaked the blush). The hop frames: `hop_a` (the teacher's landing frame, dust puffs
  kept) and **`hop_b` made from it** (dust erased, the frame un-squashed from the base 7% taller / 5% narrower, the original face pasted back
  unscaled, the leaf mass stretched up 8% from the rim). The right half of `chilli_hop_pair` is used as `tall_happy`.
  **Beat -> plant + face:** cold open hops: hop_a/hop_b alternating (squash on landing, dust on landing only); c102 wilt+droop; c104 and the
  pun pause wilt+flat; fixes, lock, picks, water, lunch, system, GLITCH: wilt+droop; d506-d508 (the soil noise, the freeze-frame) wilt+alarmed;
  x606 and r704 (the turn-round) wilt+shy; after the fix (the screen folds away, the water test, "Slowly, slowly lah") wilt+tall (hopeful);
  the time-lapse: wilt -> mid -> tallg -> tallr (hopeful face), with a new white root spreading in the window; t753 "I'm standing tall
  again!" tallr+tall; the journey dive, TRANSPORT, "Now you know!" tallr+tall_happy; the finish tallr+tall, k1004 "Then, no." tallr+smug,
  the high-five tallr+tall_happy; the blooper tallr+tall, then tallr+smug ("Now YOU'RE the droopy one."); the lock-in ring, the fix card,
  the THINK card: wilt+droop. `CHILLI_PAINTED = false` (ep2art.js, one line) brings back EP1's code drawing everywhere.
- **GLITCH** (`../characters/glitch/cut_glitch.py` -> `cut/glitch.json` + layers; `spr/glitch.js` = window.GLITCHM): the base painting
  (`glitch_base`: body, the two painted arms, the blank screen, both wheels, the struts, the front hub) and the four arm poses from
  `glitch_arms_four.jpg` (`jug` = holding the watering can (used as his jug), `crossed` (smug, grumpy), `up` (happy), `down` (acquired; the body
  for error / surprised)), each scaled to the base painting's screen height on one ground line. **The screen is the expression layer:** the
  painted face strokes are in-painted (the glass and its glare kept) and the faces are drawn in code in the painting's line style (dark
  rounded strokes, white catch-lights): smug, happy, error (swirly eyes + "?"), surprised, grumpy, acquired / narrow (calm slits), brb,
  plain; screen content: the 07:00 clock and can icon, SCANNING, the UPDATING bar, WET, TOP DRY? THEN WATER. The painted face is kept for
  smug (base / jug / crossed) and the painted happy face for up / down while he is silent; when he talks, a code mouth animates.
  **Wheels:** each tyre is its own layer, rotated in its ellipse's normalised space with the distance rolled; the strut and the front hub
  stay still on top (tyre ellipses measured on gridded crops: automatic detection merged them). **Antenna:** a soft code glow (the
  painting's halo is light and floods away with the paper). **His glitch** (`o.stutter`): seven horizontal bands of his own picture jump
  sideways and silver / teal / white tints show in at most 3 windows a second, clipped to his own picture (never the full frame).
  He is mirrored (negative x scale only) when he travels left. His chest display (the evidence, then KNOWLEDGE LOG · ENTRY 1) slides out
  beside him as a second, lower screen on a short arm (the painted chest panel is too small to read).
- **Pip squeamish** (`pip_squeamish.jpg`, helmet and goggles painted in): cut by `../characters/sprites/poses.py` (pip set; the scale checked
  against oops on an onion sheet: the body sizes match, no ADJ needed) -> `new_poses.py` -> `spr/pip_squeamish.png`; no code helmet on it
  (unmeasured pose). Used at d504 and d508. lib.js NEWPOSE_FALLBACK pip squeamish -> oops.
- EP1's other requested emotion paintings (basil_deadpan etc.) are still the stand-ins EP1 used (they are not EP2 art).

## Voices (`make_voice.py`; every line aligned word by word, not aligned: none)
Heart af_heart .90, buddies 12% slower (Character Voice Kit), ritual voices copied from EP1 v2. **New guest voices:** Chilli
(`vm.CHARACTERS["chilli"]`: am_michael .6 + am_echo .4, speed 1.05, formant 1.1, median 182 Hz, range 1.0: polite, a little dry);
**GLITCH** (`"glitch"`: bm_lewis .6 + bm_george .4, speed 1.0, formant 1.0, median 138 Hz, range .55, then `glitch_fx`: the pitch quantised
to semitone steps, a 3.1 ms comb at .28 and a 70 Hz ring modulation at .10 = the light vocoder edge; every GLITCH line force-aligns word by
word, the check that no word blurs) and his sting take (`"glitch_sting"`: speed .9, median 116 Hz, range .4, dry). Uncle Lim (EP1's voice)
with sg_pron.shape_particles: "Aiyoh." (EYE-yoh, a fall), "lah." and the particle "one." in "Plants cannot rush one." (a short fall).
Test clips: `../pron_clips/Chilli_p4ep02_voice_test.mp3`, `../pron_clips/GLITCH_p4ep02_voice_test.mp3`, `../pron_clips/UncleLim_p4ep02_lines_test.mp3`.

## Pacing
878 words (incl. the unison read-along) in 7:33.2 = **116 words a minute** (series range 105-117); .8 s between scenes (SC_GAP), .38 s
between a guest's or buddy's sentences, think time after Heart's teaching lines (THINK_AFTER). The script's model said 7:57 / about 7:33
built; it built at 7:33.2, so no ready cut was needed.

## Sound (`sound_cues.js`, `song.js`)
The original series music (Scoop Parade family; never Kampong Walk), one bar clock, 0.8 s crossfades; the help-desk voicing adds a desk-bell
ding on beat 1 every four bars. The SAD TROMBONE exactly three times, each in the pause after the flop: 0:17.5 (after "CHILLI! Get it?"),
1:20.9 (after "Blub. I feel worse."), 1:56.7 (the pigeons fly off with the lunch). The pigeons' loud KOO! and KOO-ROO! (pigeonkoo), wings,
pecks. New synthesized sounds: GLUG, the wet rude PFFRRRT (sound only, with a record scratch on the freeze-frame), BEEP-BOOP, BZZT, the
scanner and beeps, the upgrade chime, the drill, SNIP SNIP, FLUMP, the marker squeak, GLITCH's pompous square-wave fanfare (and its two-note
version as he rolls off), the noir tease under the mystery leaf, the charger hum and the stutter of the sting. New comic cues are on the
humour bus (kit/humour_sfx.js HUMOUR + glug, pffrt, bzzt, beepboop, drill, snip, splashsmall, flump, skid, cricket, smugding: +3 dB over the
dialogue, never on a word). **GLITCH's sting:** no music, no ambience; the 1.8 s before "New knowledge acquired." and the black end are
hard-muted in the final mix (measured peak 0.0), and the end fade starts after his line.

## Deviations from the script (each for a reason)
- Uncle Lim does not walk in on r703: his paintings are front views (a front view sliding across the floor would travel sideways, against the
  facing rule), so he is already standing at the right of the desk with his kopi when the repair starts; r701/r702 are spoken to him there.
  He does not hold the drill and scissors on screen; they are shown in the r702 inset (scissors at a brown root) with the small print.
- The time-lapse is 3.0 s: the trio cannot each pop in and out for 2.5 s inside it without breaking the flicker rule, so they stand in the
  corridor watching and cheer on "I'm standing tall again!". Basil's finger test is left out.
- Momo's "turns Basil's head back with one paw" is a lean and a point (no paint for a paw on his cheek).
- The blooper: the can is in Basil's paw and pours a burst of water round him (a stream from a paw-height can onto his head would cross his face).
- Chilli's limp leaf flopping onto the bell (c102) and Chilli lifting a leaf at the high-five are not animated (the leaves are painted).
- Basil "taps FAST on the sign" (c101) is a point: the sign hangs on the desk's skirt, in front of him. At the finish he points at the sign
  from behind the desk while FAST is crossed out and PROPERLY written.
- The chest display is a pop-out panel beside GLITCH (the painted chest panel is too small to read the evidence or the log).

## Checks (from explained2/, on the final code)
`qa/ghost_scan.txt`: no buddy ghosting. `qa/facing_scan.txt`: no backwards movers (Chilli's hops, GLITCH both ways, the pigeons, Momo's run,
the drop). `qa/flicker_scan.txt`: one JUMP, the deliberate camera cut in `wait` (Basil + Uncle Lim two-shot -> the corridor), checked by eye;
no POP / GONE. `qa/face_cover_scan.txt` (5 fps, the whole video, with Chilli's and GLITCH's face boxes added to FACEFN): 11 runs, all by
design: GLITCH far back and Chilli hopping in pass behind Momo and Basil in the cold open; the pick cards rising past the faces (one frame);
single frames of the trio gliding into / out of the polite row in front of the folding screen; the FOUND IT, FIXED IT! stamp over the fix
card's own small Chilli picture. `qa/overlap.txt` (popfix2 overlap.js, 5 fps): the runs left are buddies in front of the desk top slab and
the crate (props), and the far GLITCH's tiny screen clock passing behind buddies.

## Upload (the main session, after the teacher's OK)
`upload.json` (key `explained-p4-ep02`; replaces loaPYprOWDQ, retire_old; playlists PLK9BW3T6kXx4 and PLPfEuT7l4KjI, both `after`
loaPYprOWDQ), `thumb.jpg` (WHY WILTING?!) + `qa/thumb_320.jpg`, chapters `production/youtube/chapters_p3.json` key `P4EP02`,
`app_moments.json` (videos.js P4 entry no. 2, 8 moments; videos.js has no CH key for Plant System: suggest CH.plantSystem), `p4ep02.srt`.
**Heart mystery hint #3** (for the log in SecondBrain `Plans/videos/P4-new-direction.md`): t754 "I know the feeling." at **5:31.4**
(331.41-332.41 s), after Chilli's "...Nobody ever listens to a plant."; nobody reacts; GLITCH is not in the shot.

## Render (27 Nov 2026, 13:51-14:07 UTC; flock /tmp/explained_render.lock)
One full render (`out/run_render.sh`: render.js, 3 workers; the chunks deleted as soon as they were joined): `p4ep02.mp4` 1920x1080, 30 fps,
**13596 frames = 7:33.2**, decode 0 errors, **-16.0 LUFS, true peak -2.4 dBTP**. Disk never below **3151 MB** free (render.js now launches
Chromium with its shared memory in /dev/shm, RAM: with the Playwright default it held about 1 GB of deleted files in /tmp).
**Splice (blooper fix):** the blooper's watering can was drawn floating near the battle-cry words; it is now in Basil's raised paw and the
SPLOSH! is a burst of droplets and a puddle at his feet (no stream over his face). Span 430-450 s re-rendered and spliced (scratchpad
ghost/msplice.sh + nyk/tools/verify.py): **VERIFY OK** (13596 frames, decode 0, audio packets bit-identical, every video packet outside the
span bit-identical, the four seam frames bit-identical; 278 frames changed, 437.77-447.00 s). -16.0 LUFS, -2.4 dBTP after the splice.
`sheet.png` (30 stills) remade from the spliced file; `p4ep02.srt` (captions, from the timeline); `thumb.jpg` + `qa/thumb_320.jpg`.
Every 2.5 s of the final video checked as stills (scratchpad `p4ep02review/sweep/sheet_1..7.jpg`).
Review material (scratchpad `p4ep02review/`, 960 px with sound, not committed): `review_1_opening.mp4` (0-30 s), `review_2_pigeons_lunch.mp4`
(1:36-2:09), `review_3_soil_root_window.mp4` (2:23-2:56), `review_4_glitch_crash_and_sting.mp4` (4:13-4:30 + 7:24.5-7:33.2),
`review_5_water_journey.mp4` (5:31.5-6:04.5), `key_frames.jpg` + `keyframes/` (12), and the three voice test clips.

## Fix pass 1: readable cards (27 Nov 2026, main-session check; NOT uploaded)
- **The three FIX CARDS were unreadable on a phone** (about 210x225 px, 12 px labels). `x2fixCard` redesigned: labels on two short lines at
  72 local units (CHECK / EVERY PART, WATER IT / MORE, FEED IT at 80), a big number badge (r 76, 92-unit digit), the picture above the label
  band, verdict stamps that wrap onto two lines at 64 units. Placed at: fix cards .8 (368x400 px, labels 58 px, cap height about 41 px);
  lock-in .8 across the lower third (x 600 / 990 / 1380, y 880; the ring moved up to y 345 so its number clears card 2; LOCK IT IN! at
  1745, 800); picks: the cards rise from the lock-in row to a row over the buddies at .7; the verdict cards in water / lunch / repair at .7
  (NOT|THIRSTY, NOT FOOD FROM|THE SOIL, FOUND IT,|FIXED IT!; the repair card moved to the upper left, clear of Uncle Lim's face).
- Other story text enlarged: the KNOWLEDGE LOG panel (560x380 at full size, 40-44-unit lines, moved to (1250, 390) clear of the score and the
  shelf; the evidence pictures fill it; SCANNING... 52), "✗ plants eat food from the soil" (38, above the card), "0 LEAKS ✓" (48), the
  TRANSPORT arrow labels (40). Bubbles moved clear of them (Momo's in the GLITCH scene, GLITCH's g460 and r708).
- Also from the overlap scan: Basil no longer covers Pip's face on the words card (Pip 1480) or in the corridor (Pip 1340); the recap pills
  are clear of Pip.
- **Splices** (msplice + verify.py, each VERIFY OK: 13596 frames, decode 0, audio packets bit-identical, every video packet outside the spans
  bit-identical): spans 20-70, 90-100, 120-130, 240-290, 300-320, 350-370 s; then 120-130, 310-340, 360-400 s. -16.0 LUFS, -2.4 dBTP.
  face_cover_scan and overlap.js re-run on every changed span: only the by-design runs (the pick cards rising past the faces for one frame,
  the FOUND IT stamp over the card's own small Chilli). sheet.png, key_frames.jpg and the five review clips remade from the final file.

## Fix pass 2: bubbles next to their speaker, one 214 (28 Nov 2026; the teacher on the LIVE EP2 E-HFXLaeP94; NOT uploaded)
The teacher: "bring the speech bubble closer to the characters" / "speech bubbles too far off" (Chilli's c102 bubble at the top of the
frame, Basil's u405 by the notice board) and "also, one block number 214 will do" (three plaques on the void deck pillars).
- **Bubbles:** every say() bubble page (110 of the 111; the chant u1300 has no speaker on screen) is now placed by `../kit/bubble_layout.js`
  (writes `bubplace_p1.js`; build_part.sh runs it before the render) and drawn there by lib.js bubble() through `../kit/bubbles.js`: just
  above or beside the speaker's head, the tail from the nearest edge aimed at the mouth (tails 22-62 px), clear of every face, card, word
  and data-obst mark, inside the frame, a narrower wrap where it fits better (34 pages), a line's pages kept in one spot. 103 pages moved
  more than 40 px (83 more than 150 px; mean 348 px). Chilli's head for the layout is the whole plant (bubbles go above the leaves, not on
  them). Guest face boxes carry `data-face` (chilliFaceBox, glitchFaceBox, limHeadBox). Two scene items moved to make room: the 0 LEAKS
  label (p2.js, 1720,600 -> 1420,610, off GLITCH's head) and the FOUND IT card (p3.js, 560 -> 690, so GLITCH's r708 bubble fits above him).
- **214:** artp4.js BG.vdp4 (and so vdv2) puts the plaque on the middle pillar only (`VD_PLAQUE_X = 1080`; plaque x 1096-1184, y 220-280);
  bg/vdp4.png and bg/vdv2.png re-baked (bake.js vdp4 vdv2; _grain.png kept). BG_OBST marks it, main.js bg() adds the invisible mark.
- **Render:** one full picture render (`out/run_fix.sh`, flock), muxed with the LIVE file's audio stream COPIED (the sound is bit-identical;
  no song.js / mix rebuild). The live cut is kept as `p4ep02_live_E-HFXLaeP94.mp4`.
- **Result (28 Nov, 04:28-04:43 UTC, 878 s render):** `p4ep02.mp4` 1920x1080, 30 fps, 13596 frames = 7:33.2, decode 0 errors; audio stream
  md5 234633d23520c4e646c99def2fd4d195 = the live file's (bit-identical); -16.0 LUFS, true peak -2.4 dBFS (as before); blackdetect: only
  the planned 0.47 s at the end; freezedetect (1.5 s): none. face_cover_scan (5 fps, whole video, `bubplace_p1.js` loaded): no bubble on any
  face; the runs left are the by-design ones listed above (cold-open hops, pick cards rising, the FOUND IT stamp on the card's own Chilli).
- Review (scratchpad `p4ep02_fix_review/`, not committed): index.html, a 720p preview (27 MB), before/after stills of c102 (0:08.85) and
  u405 (1:54.15), the 110-bubble contact sheets. NOT uploaded; upload as a NEW video after the teacher's OK (the old one keeps its views).
- **P4 EP1 v2 (live XkBQqzYyMdM)** has the same old engine: far-off bubbles (scene-fixed _BUBAT / say spots) and the 214 plaque on every
  pillar (vdp4 / vdv2 / rampv2 / trackV2). Not re-rendered. To fix it: copy kit hooks (lib.js bubble/say, main.js bg marks, page.html,
  limv2 data-face), run kit/bubble_layout.js, one 214, full render, mux with the live audio.

## v3: "complete new EP2" in DOCTOR COSTUMES + the four-face score bar (28 Nov 2026; NOT uploaded)
The teacher: "Since they are role playing as doctors, can we give new costumes to the pet buddies?" and "complete new EP2"; the score bar
she chose for P4 (YOU plus Pip, Momo and Basil, each with their own face and score). Script, voices, timing and the whole sound are the live
GLY4mDzxdaA's (the audio stream is COPIED); bubbles beside the speakers; one 214 plaque. Only the picture changes.
- **Where the costumes go on:** on Basil's "open!" in c101 ("The Science Help Desk is open!", 1.28 s) every buddy on screen swaps to its
  doctor painting with the usual pose-swap pop and sparkles (before that, the first second, they still wear their P4 helmets), and keeps it
  to the end (the whole episode is the Help Desk role-play, the journey dive, the ritual ending and the blooper included). `costume.js`
  (`window.COSTUME_T0`); lib.js buddy0() swaps every sprite name `<who>_<pose>` -> `<who>_doc_<pose>` from then on when it exists (same
  canvas, so face boxes, paws, bubbles and pose swaps are unchanged; `o.nocostume` keeps the plain painting); doctor sprites carry no code
  items (the cap, goggles, head mirror and badge are painted).
- **How each pose is dressed (`costume_bake.py`, run with the heart-tts venv python; writes spr/*_doc_*.png + the manifest; 43 sprites):**
  1. PAINTED (the teacher's paintings, characters/teacher_doctor_2026-11-27/, cut by poses.py): arms_crossed, pointing, surprised for all
     three; they are pixel-aligned edits of the plain poses, so they sit on the plain pose's canvas as they are.
  2. PAINTED TRANSPLANT, Momo's talking set (6 mouth / blink states): her talking set IS her arms-crossed painting, so each state is her
     doctor arms-crossed painting with that state's own eyes and mouth. All painted.
  3. DRESSED FROM A DOCTOR PAINTING ON THE SAME BODY (`dress()`): the doctor paintings share their lower body with the other poses of the
     same set (Basil v2: oops, thinking, laughing, cheer, waving AND his sit pose; Pip: sit, thinking, oops, cheer; Momo nk: thinking, cheer,
     waving), found by template-matching the legs (0.82-0.997). The painted costume pixels (doctor painting minus its plain painting) are
     moved onto the pose wherever the pose shows exactly the same body (blurred difference < 30), so the coats, scrubs, Pip's cap and
     goggles, Momo's head mirror, the stethoscopes, the pocket magnifier and Basil's badge are mostly the teacher's own pixels; the rest of
     the garment (where the pose's arms differ) is code-painted fabric (the painting's own light, rim shade, its ink lines kept, an ink edge)
     plus measured sleeve polygons; the pose's paws are drawn again on top (paw pixels only, not the belly round them).
     Used for: Pip's and Basil's TALKING sets (sit, 6 states each, masks from the closed mouth), basil oops / thinking / laughing / cheer /
     waving, pip thinking / oops / cheer, momo thinking / cheer / waving.
  4. CODE ONLY (no doctor painting on that body): the three back views (journey dive) and Momo's two run frames (0.8 s): measured garment
     polygons, Pip's cap + goggle strap from behind, Momo's head-mirror band from behind.
  5. STAND-IN BY EMOTION: pip squeamish -> pip doctor surprised (d504/d508); momo oops -> momo doctor surprised (3 s).
  QA sheets: scratchpad p4ep02_v3_review/costumes_*.jpg (plain pose beside its doctor version).
- **Paintings that would replace the code-dressed stand-ins** (each an edit of the exact plain painting, like the doctor paintings were;
  cut with poses.py into characters/sprites/poses/<who>_doc_<pose>.png and re-run costume_bake.py: a painted `<who>_doc_sit` replaces the
  dressed talking set automatically, any other painted pose replaces its recipe): see the list in the v3 review page / the journal.
- **Score bar:** `../kit/score4.js` (from the P4 EP3 build; EP2 now loads it too, page.html), `SCORE4.push([MK("coin1") - .05, 1, 0, 1, 0])`
  in p1.js: YOU +1 and Momo +1 at k1006 (Momo picked fix 1 for the right reason: find out WHY); Pip 0, Basil 0. `costume.js` overrides the
  bar's face chips (s4chip) to show the doctor sit painting once the desk is open. NOTE: kit/score4.js is the EP3 helper's file (committed
  with their work); EP2 v3 needs it.
- **Bubbles:** kit/bubble_layout.js re-run (the head mirror, the caps and the wider score bar are new obstacles): 110 of 111 pages placed next
  to the speaker; 52 pages moved (the bubplace of the live cut kept in the scratchpad).
- **Render:** `out/run_v3.sh` (render.js now takes RENDER_OUT; chunks and the joined picture in /dev/shm/p4ep02v3), muxed with the live
  p4ep02.mp4's audio stream copied.
- **Result (28 Nov, 07:58-08:17 UTC render, 1019 s):** `/dev/shm/p4ep02v3/p4ep02_v3.mp4` (171.6 MB; left in RAM: the disk had 3022 MB free
  and moving it would go below 3 GB; copy it to `p4ep02/p4ep02_v3.mp4` once there is room, BEFORE a reboot) 1920x1080, 30 fps, 13596
  frames = 7:33.2, decode 0 errors; audio stream md5 234633d23520c4e646c99def2fd4d195 = the live file's (bit-identical); -16.0 LUFS,
  -2.4 dBTP; blackdetect: only the planned 0.47 s at the end; freezedetect (n .003, 1.5 s): one 1.97 s hold at 315.07 s (wait: Uncle Lim
  "Slowly, slowly lah", Basil's head only behind the desk; 750-30000 px still change per frame: breathing, blinks; the live file's helmet
  moved just enough to pass the threshold). face_cover_scan (5 fps, whole video): no bubble on a face; the runs left are the by-design
  ones (cold-open GLITCH / Chilli behind the buddies, the pick cards rising for 1-2 frames, the FOUND IT stamp on its card's own Chilli,
  one frame of the flying MAKE FOOD pill over Momo's head mirror at 127.8 s). Stills every 2.5 s and all 110 bubble pages checked by eye.
- Review (scratchpad `p4ep02_v3_review/`, not committed): index.html, preview_part1-4.mp4 (720p, 6.3-7.5 MB each), before_after_01-10.jpg,
  costumes_on.jpg, costumes_{momo,pip,basil}.jpg. NOT uploaded; upload as a NEW video after the teacher's "OK" (upload_v2.json is the
  metadata model; the thumbnail still shows the helmets: remake it from a costume frame if wanted).
