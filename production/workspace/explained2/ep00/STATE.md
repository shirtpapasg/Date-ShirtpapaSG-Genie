# EP0 build state (the mind map special; for a resume after a restart)
P3 EP0, the study-skills special for P3 to P6, "Make your own mind map" (the new-format replacement for the classic `zxerWQ9zGII`).
Part 1 "Read It or Make It? Which Mind Map Do You REMEMBER?" (Pip reads, Basil makes; the one-week test; the word puzzle; read it or make it?
[LOOK CLOSER]: MAKE YOUR OWN, Mark Sentence 1; the memory test [LOOK CLOSER]: GENERATION EFFECT; HOLD ON! Momo copies the poster: MEMORY
FIRST, Mark Sentence 2; the crow; the lock-in for Part 2) **5:02.6**. Part 2 "One Week, One Blank Page. Who Remembers MORE?" (the recap; the
cat; Round 1, Part 1's lock-in; make one together in TheOneApp, its real screens; the check [LOOK CLOSER]: CHECK AND FIX, Mark Sentence 1;
the Showdown, Pip's steps poster; BE AN IDEA (a garden of paths); SPACE IT OUT, Mark Sentence 2; two blank pages [LOOK CLOSER]; the chant;
the dare) **5:34.7**.
The script: `../p3_ep00_mindmap_script.md` (version 1, Opus, 24 Nov 2026). **APPROVED by the teacher (24 Nov 2026): "OK to the mind map
script"**, every recommendation of its section 13 accepted (two parts; GENERATION EFFECT a key word and "spaced practice" said once; "one day,
three days and a week"; the "Be an idea" journey; the four Mark Sentences as written; Magnets as the example, the poster's "Electrical method"
on the Compare screen is fine; the old video stays public, out of the playlist, with a NEW VERSION line, at upload time; the crow and the
community cat). Approve-before-render applied to this special. **For future episodes: whether approve-before-render applies is "ask the
teacher": the teacher did not answer this for later episodes.** The source of every spoken word: `script.py`.

Stages: **Stage 1 (setup, voices, timelines) and Stage 2 (drawing, sound, render, self-check): DONE 2026-11-24, Opus, in one session.**
NOT uploaded. Stage 3 (upload) waits for the teacher's review.

## For the teacher to listen to
- **`../pron_clips/Heart_ep00_new_words.mp3`** (MP3, 112.1 s, 18 sentences, 1.2 s apart; `make_clip.py` cuts the episode's OWN recorded lines,
  so the clip is exactly what the video says; start times by ffmpeg `silencedetect=noise=-45dB:d=1.0`). **Waiting for the teacher's listen.**

  | # | Start (s) | Who | Line | Checks |
  |---|---|---|---|---|
  | 1 | 0.50 | Basil | a606b "The generation effect means ..." | generation effect ("effect", not "affect") |
  | 2 | 8.29 | Heart | "Generation effect." | alone (the read-along) |
  | 3 | 10.73 | Heart | a101h "Pip reads a ready-made mind map ..." | ready-made, mind map (not "mine map"), "reads" |
  | 4 | 18.97 | Heart | a404h "Later in this video, which words ... the words you read ..." | "read" (present tense) in the question |
  | 5 | 30.58 | Heart | b501h "... make one together in TheOneApp. Tap Mind Maps, then Make my own mind map." | TheOneApp ("The One App"), Mind Maps |
  | 6 | 38.44 | Heart | b507h "Tap Compare with the poster ... Tap Back to my mind map ..." | the app's button names |
  | 7 | 47.91 | Heart | b801h "Scientists call this spaced practice." | spaced practice |
  | 8 | 51.19 | Heart | a802h "Did you spot the crow? It was on top of the letterboxes in the void deck!" | crow, letterboxes, void deck |
  | 9 | 56.72 | Basil | a203b "Look up high, on the railings and the lamp posts!" | railings, lamp posts |
  | 10 | 60.31 | Heart | a409h "We will test your memory later. No scrolling back!" | scrolling |
  | 11 | 64.63 | Momo | a407m "Two. When I work out a riddle, I never forget it!" | riddle |
  | 12 | 68.99 | Basil | a902b "... on Tuesday and on Thursday." | Tuesday, Thursday |
  | 13 | 74.10 | Heart | b602h "Showdown! Double points. ..." | Showdown |
  | 14 | 83.50 | Heart | a603h "Did you remember more of the words you worked out? ..." (look-closer pace) | grown-ups, worked-out |
  | 15 | 103.63 | Heart | "Make your own." | alone |
  | 16 | 105.62 | Heart | "Memory first." | alone |
  | 17 | 107.83 | Heart | "Check and fix." | alone |
  | 18 | 110.01 | Heart | "Space it out." | alone (the soft t) |

- No new `sg_pron.py` entry; no Singapore name is spoken. `../PRONUNCIATION.md` has a "Checked and left to Kokoro (P3 EP0)" paragraph marked
  waiting for the teacher's listen. I cannot listen: the check is on the phonemes (script section 10 G) and on the alignment (every line aligned).
- If a word is heard wrong: add an entry to `../sg_pron.py`, delete those lines' `voice/<id>.json`, re-run `make_voice.py` (heart-tts python),
  `build_tl.py 1|2`, `node dump_cues.js 1|2`, `make_clip.py`, then `./build_part.sh P` and `python3 ../add_lofi.py . P`.

## How it was built (2026-11-24)
- **Engine copied from `../ep22/`** (copied, never edited): lib.js, common.js, closer.js, shrink.js, props.js, hotel.js, garden.js, trail.js,
  materials.js, canteen.js, pics.js, tests.js, song.js, music.js, audio/, render.js, finish.sh, bake.js, build_part.sh, build_all.sh,
  dump_cues.js, probe.js, stills.js, sheet.sh, sweep.js, measure_countdowns.py, compare_ep1.py, build_tl.py, make_voice.py, make_clip.py,
  make_moments.py, highlights.py, make_preview.sh, make_todo.py (rewritten small), main.js, page.html, pose_audit.js, faces_sheet.*,
  prep_sprites.py, spr/ (the v2 cast), bg/ stage, stage2, daystage, _grain; the ritual voices h501, h860, h864, h1304a/o/t, h1305, u1300,
  u1305, u1002. The main session later set `n2()` in lib.js to 4 decimals (smooth slow zooms); kept.
- **Changed for EP0:** lib.js `OUTCOMES` (P1 Round 1 at `ansglow` to the end of `lcmem`: Momo, Basil right / Pip wrong; HOLD ON! at a703h to the
  end of `mark2`: Pip, Basil right / Momo wrong. P2 Showdown at Basil's b604b to the end of `fix`: Basil, Momo right / Pip wrong; Round 1 at
  `ansglow` to the end of `lcpages`: Pip, Momo right / Basil wrong, a sheepish happy oops), `learnAt` (kw_*, v_*), `KW` / `KWLINE` (P1 MAKE YOUR
  OWN, GENERATION EFFECT, MEMORY FIRST; P2 MAKE YOUR OWN carried from Part 1 at `kw_carry`, CHECK AND FIX, SPACE IT OUT), `SHELF_HIDE`;
  common.js `PHR` / `PCOL` (the chant); tests.js `HIDDEN` (crow / cat) and the small-print rules; make_voice.py EXTRA ("worked-out",
  "ready-made") and its aligner now maps a respelling with more words ("TheOneApp" -> "The One App") back to its script word (b302m, b501h,
  b601p, b1201h were proportional before; all aligned now); main.js preloads TheOneApp's screens (app/manifest.js) and XDEFS00.
- **New files:** `art00.js` (the crow, the community cat with its tipped left ear, the hand-drawn mind maps `handMap`, the word puzzle, the
  stone table, the tablet `tablet00`, the app-picture helpers), `sets00.js` (THE VOID DECK STUDY CORNER, baked `bg/vdday.png`, `bg/vdnight.png`
  + live parts: the notice board's ONE-WEEK MEMORY TEST card, the study table, the poster on its easel, the lamp, moths, rain, neighbours; times
  of day day / dusk / night / rain / morning), `lc00.js` (the four look-closer arts, the journey `gardenArt`, the answer-card pictures, Pip's
  steps poster, the fun-fact pictures, the dare), `p1.js`, `p2.js`, `sound_cues.js` (EP0's own: the void deck bed, night crickets, Thursday's
  rain, the puzzle's pencil, the crow's caw, the cat's mrrp, the app's taps and the ticks at the app's own 260 ms pace; song.js gained `caw`,
  `bounce`, `mrrp`), `capture.js` + `capture2.js` + `app_manifest.py` (TheOneApp's real screens), `make_todo.py` -> `SCENES_TODO.md`.
- **Cuts** (`script.py` CUTS): only the three lines the script keeps out of its tables: a706h (retrieval practice), b510b, b1202p. No section-6
  "if over" cut was needed (Part 1 5:02.6, Part 2 5:34.7, both inside the 5:46 the series accepts).
- **Scores:** Part 1 Round 1 1 : 1, HOLD ON! 2 : 1; Part 2 Showdown 2 : 0, Round 1 (answered next Monday) 3 : 1.

## TheOneApp's real screens (capture.js, capture2.js)
- `/home/user/theoneapp` was served READ-ONLY (`python3 -m http.server 8765 --bind 127.0.0.1`, as `../../promo/film4/README.md`) and driven with
  Playwright (1180 x 820, 2.6x): the home screen (the Supertree's "Mind Maps"), mindmap.html, the sheet "My mind maps" (Magnets (P3)), Start a new
  mind map, the editor (Basil's map typed into the real boxes one by one: ed00-ed12, the map drawn by the app), Mark my mind map, Compare with
  the poster, Back to my mind map, the new branch (ed20-ed22), Mark it again, the list with My Magnets mind map, 2, 3. The pupil's state (tour
  seen, first trip done, What's New seen, sound off) was set in the browser's storage; passing pop-ups (the credit toast, the journey's
  "Stamped" note) are hidden, as a pupil's tap on "Stay" would. Nothing in /home/user/theoneapp was edited. The server was stopped after.
- **The AI marker ("Mark my mind map", api/_mindmap.js) cannot run locally.** Its reply was STUBBED in the browser (page.route on POST /api/lab,
  in the reply format api/_mindmap.js returns): first mark, every idea "ok" and one poster branch missing; second mark, every idea "ok" and
  nothing missing. Everything shown after that is drawn by the app's OWN code and CSS: the ✓ badges popping in one by one (the app's CSS
  animation, captured frame by frame every 130 ms with the Web Animations API), "Every idea I could check is right! Now make your map
  complete.", the gold row "＋ Something from the poster is missing", "Every idea is right and your map is complete. Well done!". **The missing
  row's hint question is our stand-in** ("Can an ordinary iron nail be changed so that it attracts steel paper clips too?", written to
  api/_mindmap.js's rules: one short question, not naming the branch or its key words); the live marker writes its own. The live marker may
  also judge "Not copper or aluminium" unsure (script section 11 note 3): **not checked on the live app** (no internet marker here).
- The printed poster on the easel and in the Compare look-closer is the app's own Magnets poster (capture2.js, the drawn poster from Compare;
  the Exit button painted over in the poster's cream). The dare's three cards are crops of the real screens.

## Checks (see "Renders" below for the numbers)
- Stills of every scene looked at and fixed (qa/p1a-c.jpg, qa/p2a-d.jpg, qa/garden.jpg); sweeps every 0.5 s: 0 bad, 0 page errors (both parts).

## Open points
1. The new-words clip waits for the teacher's listen.
2. The marker's hint text is a stand-in (above); a live check of Basil's exact map on the deployed app is still to do before upload.
3. Upload: `upload.json` sets `after: zxerWQ9zGII` (explained_upload.py has no "first position": a missing `after` means the END); with
   retire_old the classic is removed after the two parts go in right after it, so they end up first IF the classic is at position 0 of both
   P3 playlists. `--check` output below says where it is.
