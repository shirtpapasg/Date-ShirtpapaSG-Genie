# P4 EP3 build state (for a resume after a restart)
P4 EP3, **"The Case of the Mystery Leaf"** (Read a Leaf Like a Scientist; the Plant System), ONE video, **7:39.0** (459.03 s; P4 max 8:00):
the story to 6:58, then the read-along, "Now you know!", 4.0 s of outro, the blooper and GLITCH's final sting ("New knowledge acquired.",
then 0.5 s of black). Script: `../p4/p4_ep03_script.md` **v2** (Genie 3cbc25d), every spoken line word for word (`script.py`). The teacher
(28 Nov 2026) replied "ok" to the script and its 20 questions: every question takes the script's own recommendation (list below).
Built by one Opus agent on 28 Nov 2026 from the P4 EP2 engine (`../p4ep02/`). **NOT uploaded**: the main session shows the teacher first.
It REPLACES the old P4 EP03 PNe2DU8sFTI (never deleted).

## The teacher's 20 questions (all: the script's recommendation)
Q1 the pandan is cleared on its veins only (no pandan leaf stalk labelled) · Q2 the book's "straight edge" for the mango · Q3 the journey
says water travels through the veins, no P5 words · Q4 four key words (LEAF BLADE, LEAF STALK, NET VEINS, PARALLEL VEINS) · Q5 the snail's
tongue fact, "radula" not said · Q6 Uncle Lim's "cannot stick back... grows new leaves" · Q7 the hibiscus match on veins, edge and shape ·
Q8 GLITCH again (LEAF RETURN SERVICE, KNOWLEDGE LOG · ENTRY 2) · **Q9 A: the four-face score bar** (`../kit/score4.js`, below) · **Q10 A:
no doctor costumes in EP3** (they start in EP4) · Q11 A: Basil's detective cap drawn in code (no painting arrived) · Q12 the cactus link and
"...Not me." · Q13 the last slapstick (the cap, the pandan flop and its replay) · Q14 EP1's snail with its crown as the witness · Q15 Basil
right but rushes (CASE CLOSED! stopped by Pip) · Q16 Pip reads the card · Q17 test clips made and measured (below) · Q18 GLITCH's growth
signs kept small (log 2, a steadier, slightly brighter antenna light, sting voice speed .88 / range .38, the 8-frame chill) · Q19 build as
written (it built at 7:39, under the 7:45 cut line: no cut taken) · Q20 no Heart hint in EP3.

## The build model
Engine copied from `../p4ep02/` (lib.js, common.js, main.js, render.js from `../p4ep01v2/` with RENDER_OUT, song.js, the humour bus, the
sad trombone, the pigeons, the face_cover_scan, the bubble layout). EP3 files: `script.py`, `ep3art.js` (the leaves, the plants, the set,
the props, the cap, the cactus), `s1.js` (helpers + cold open to picks), `s2.js` (colour, size, look-closer, journey, NET VEINS), `s3.js`
(suspects to the sting), `sound_cues.js`, `make_moments.py`, `thumbP4ep03.js`, `run_render.sh`. lib.js: EP3's OUTCOMES, KW (all four pop
in place at [1180, 236]/[1200, 196], no dimming; the flight to the shelf no longer arcs over the score bar), KWLINE, SHELF_HIDE (+ witness,
reveal, glitch, dive, journey), learnAt. main.js: XDEFSE3 + `window._T` (the frame time, for the cap drawn inside Basil's sprite).
`spr` is a symlink to `../p4ep02/spr` (the same paintings; no new sprite). `voice/` and `out/` live in RAM (`/dev/shm/p4ep03/`; the voice
JSONs are committed in `voice/` after the build).
- **The set `vd3`** (ep3art.js BG.vd3, baked to bg/vd3.png): EP2's void deck (one 214 on the middle pillar; EP1's chalk race line repaved)
  with the three suspects: the pandan in a big blue pot by the letterboxes (left), the mango tree on the grass in the void deck's open side
  at the left (a bunch of young coppery-red leaves; the pigeon's low branch), the hibiscus hedge in a long planter in front of the bicycle bay
  (red flowers), Uncle Lim's round stone table beside it. The Help Desk (EP2's deskV3) in the middle, its sign corrected to PROPERLY.
- **The leaves** (drawn from the NParks facts in the script's section 2): `hibLeaf` (THE mystery leaf: oval, pointed tip, 19 saw teeth =
  jagged edge, a leaf stalk, net veins that split and join, the same small dusty mark in every shot; `glow` = lit from behind; `hi` =
  blade / edge / stalk / main / small highlights), `mangoLeaf` (long, lance-shaped, a smooth slightly wavy edge, net veins; `young` =
  smaller and coppery red), `pandanLeaf` (a strap with parallel veins side by side, no stalk). Every comparison is side by side on a card,
  never overlapped; labels are joined by plain lines.
- **GLITCH** (EP2's paintings): with his tape roll he is the "crossed" painting with the roll drawn in front of his arms (`glitchTape`; the
  "jug" painting holds a watering can); his screen: LEAF RETURN SERVICE, OWNER: ..., the laugh meter at 0, the thumbs-up, the parts check
  (BLADE / STALK / VEINS ticks), UPDATING; the chest panel shows the three evidence cards (parallel vs net, straight vs jagged, the match)
  then KNOWLEDGE LOG with entry 2 on top of entry 1 (the counter ticks 1 -> 2 at the chill, 1.0 s after "weak clues", the eyes narrow 8 frames).
- **Basil's detective cap** (Q11 A, code): `detCap` in the helmet's own frame (BASILH anchors), a soft brown cap two sizes too big ON TOP of
  his orange helmet; it plops on at "Finally", slides to his eyebrows (never his eyes), he pushes it up at "expert"; worn to the end (not in
  the sting, not on back views).
- **The snail** (EP1's `snailV2` with its crown, an invisible face box): the pandan pot's rim (cold, witness), the mango trunk (colour), the
  floor by the open side (size), the desk's leg (look-closer), the case board's corner (suspects), low in the hedge (GLITCH; the reveal).

## The four-face score bar (Q9 A; `../kit/score4.js`, for EP4+ too)
YOU plus Pip, Momo and Basil, each with their own face (the sit painting cropped round, with their P4 helmet) and their own score in a
sun-yellow badge (Pet Buddy Quest's phone layout), top right (446 x 76 px, right edge 1888). `SCORE4.push([t, you, pip, momo, basil])`;
it replaces lib.js `scoreboard()`, so `HUD()` draws it; the changed number bumps. EP3: at k1106 YOU 1, BASIL 1, Pip 0, Momo 0 (no mark
against a 0). EP1 and EP2 keep "YOU vs BUDDIES".

## Voices (`make_voice.py`; every line aligned, none proportional)
EP2's recipes: Heart af_heart .90 (the journey .85, softer; the look-closer .85), the buddies 12% slower (Character Voice Kit), GLITCH
(`glitch`, glitch_fx) and his sting `glitch_sting` **speed .88, range .38** (a shade calmer than EP2's .9 / .4), Uncle Lim with
`sg_pron.shape_particles` ("Aiyoh." EYE-yoh with a 4-semitone fall, "lah." shortened to .30 s with a 3-semitone fall). Every line through
`../sg_pron.py`. **New sg_pron entries (Q17; WAITING FOR THE TEACHER'S LISTEN):** "pandan" -> pˈɑːndˌɑːn (PAHN-dahn; Kokoro said PAN-dun),
"hibiscus" -> haɪbˈɪskəs (hy-BIS-kus; Kokoro stressed HIB). "jagged": no entry (Kokoro's own dʒˈæɡᵻd is JAG-id).
**Measured** (pocketsphinx, a two-way forced choice between the spellings + an allphone pass; child/robot voices moved to an adult range
first): all 15 uses of pandan / hibiscus / jagged in the episode were heard as the intended form (e.g. Basil's q801 "pandan" phones
P AA N AE N; Heart's q814 "hibiscus" AH HH AY B IH Z G ER Z; k1103 "jagged" JH AE G IH D); Uncle Lim's "Aiyoh" heard as EYE-yoh (pitch
134 -> 118 Hz), his "lah" .29 s falling 109 -> 102 Hz; a free transcription of his line: "...leave drop already cannot speak that one lol
the plant grows new leaves slowly slowly" (the English words land; Singlish words are not in the English model).
Test clips: `../pron_clips/p4ep03_pandan_test.mp3`, `p4ep03_hibiscus_test.mp3`, `p4ep03_jagged_test.mp3`, `p4ep03_UncleLim_test.mp3`.

## Pacing
875 words (incl. the read-along) in 7:39.0 = **114 words a minute** (series range 105-117), voice on 75%. The script's model said 7:54 /
about 7:30 built; it built at 7:39 (under 7:45), so no ready cut was needed.

## Sound (`sound_cues.js`, `song.js`)
New: **Scoop Parade NOIR** (`noirBar`: Dm7 | Bb | Gm7 | A7, brushed snare, a walking upright bass, a D-minor glockenspiel hook answered
by a muted trumpet; original): the cold open, the witness, the fix cards, the picks, the colour and size tests, the suspects (to the stamp,
where the finale takes over), the reveal. ACTION stab on "Hold it!" (resolves) and on the too-early CASE CLOSED! (cut short). Lite under
o405, the look-closer, NET VEINS, the words; the help-desk voicing in the GLITCH scene and the EP4 tag; the micro-world pad alone in the
journey; the calm bed in the read-along; silence in the lock-in, on the frozen stamp (record scratch) and in GLITCH's sting. The SAD
TROMBONE exactly three times (after "Leaf it to me!", after "They're ALL green!", the pandan flop); rimshots at a202, o406, k1105; the
pigeon's KOO! New comic sounds on the humour bus (+3 dB over the dialogue, never on a word): taperip (SKRRRITCH), tapestrip (SKRITCH),
leafflop (FLOP), folderslap. Also: the swatch boops, ruler clacks, the noir title "dun-dun", the cap's flump, the big CASE CLOSED thump.

## Deviations from the script (each for a reason)
- One set for every void-deck scene: the mango tree stands in the void deck's open side at the LEFT (the script: "on the grass, centre
  back"), so all three suspects are in the wide shot; the hibiscus hedge is in a planter in front of the bicycle bay.
- The suspects: the case board is the left third of the frame (on the wall); Basil stays at it with the stamp (the hibiscus match
  "beside a leaf still on the hedge" is a side-by-side card); Momo and Pip glide with the camera along the suspects.
- The size test's bigger / smaller pairs are side-by-side cards (no invented numbers), not held up at the branch.
- Pip sets his tools down on the floor beside him (not on the desk) before the high-five lands.
- GLITCH peels the hedge's taped leaf in shot; the pandan's and the trunk's come off as he rolls on (gone in the later wide shots); the
  basket fills to three.
- Uncle Lim is a front view (EP2's rule): far back by his stone table in the desk shots, by the hedge's end in the GLITCH scene; no walk.
- Not animated: Basil's pat on GLITCH's arm (a lean), Momo's fingertip along the edges (the two edges light up on the card).
- The key-word shelf is hidden in the GLITCH scene (his chest panel and the KNOWLEDGE LOG need the top of the frame).
- The cactus has no face yet (EP4's Spike is still to be designed); an invisible face box keeps bubbles and words off it.

## Checks (on the final code; see the end of this file for the render)
`qa/face_cover_scan.txt` (5 fps, the whole video): no speech bubble on any face; the runs left are by design (the pick cards rising past
the faces for one frame as in EP2, "Now you know!" sliding past for one frame) and single frames of Pip's shoulder by Basil's chin in the
colour pan. `kit/bubble_layout.js`: 102 of 103 pages beside their speaker (the chant u1300 has no speaker on screen).
Other scans (in `qa/`): `ghost_scan.txt` no buddy ghosting; `facing_scan.txt` no backwards movers; `flicker_scan.txt` no buddy flicker
(after the fix below).

## Render (28 Nov 2026, 07:23-07:43 UTC; flock /tmp/explained_render.lock)
One full render (`run_render.sh`: render.js, 3 workers, chunks and the joined video in RAM, `RENDER_OUT=/dev/shm/p4ep03/render`; 1158 s),
then `finish.sh`. **Splice** (the flicker scan found the journey's raft jumping 340 px between two phases at 201.3 s; s2.js now keeps the
raft in one place): frames 6000-6300 (200-210 s, exactly one render chunk, so it starts on a key frame) re-rendered with `render.js 1 3 200
210` and joined with `-f segment -segment_frames 6000,6300` + the concat demuxer (stream copy); frames outside the span decode
bit-identical (checked at frames 3000, 5999, 12000, 13770). **Sound:** the first mux measured a true peak of -1.5 dBTP: the new tape
sounds' top end overshoots in the AAC encoder. Lowering the master ceiling only made it worse (+2.6 dBTP: more limiting, more top end), so
the master is back at EP2's .66 and finish.sh low-passes at 15 kHz just before the AAC encode.
**Result:** `p4ep03.mp4` 1920x1080, 30 fps, **13771 frames = 7:39.0**, decode 0 errors, **-16.0 LUFS, true peak -2.7 dBTP**;
blackdetect: only the planned 0.47 s at the end; freezedetect (1.5 s): 42.4 s for 3.5 s (the witness hold: the snail in its ring).
**Disk was tight (3.06-3.07 GB free; keep 3 GB): the final file is in RAM at `/dev/shm/p4ep03/p4ep03.mp4`** (197 MB; `p4ep03.mp4` here is a
symlink to it); move it here only when there is room. The same for `sheet.png` (30 stills) and the review media.
Review (scratchpad `p4ep03_review/`, not committed): index.html, the 720p preview in 3 parts (14.4 / 13.7 / 14.9 MB), thumb.jpg, a contact
sheet every 5 s, the four Q17 test clips. The media files there are symlinks into `/dev/shm/p4ep03/review/` (disk). NOT uploaded.
To rebuild: the voice WAVs are in `/dev/shm/p4ep03/voice` (RAM; `voice/` here keeps only the committed JSONs): point `voice` back there
(`rm -r voice && ln -s /dev/shm/p4ep03/voice voice`) or re-run make_voice.py (it re-records only what is missing); `out` is a symlink to
`/dev/shm/p4ep03/out` (mix, cues, logs). Then `python3 build_tl.py 1; node dump_cues.js 1; node song.js 1; node ../kit/bubble_layout.js . 1;
./run_render.sh`.
