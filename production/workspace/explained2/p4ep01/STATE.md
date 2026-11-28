# P4 EP1 build state (for a resume after a restart)
P4 EP1, the first "TheOneApp, Explained" episode in the new P4 style: **"The Great Bike Breakdown"** (Systems: bike, body, tree), ONE video,
**6:20.2** (the story to 5:51, then the read-along, "Now you know!", 4.6 s of outro and a 5.7 s blooper after the end card). Script approved by
the teacher on 25 Nov 2026 ("ok for the first script"): `../p4/p4_ep01_script.md` (every spoken line word for word: `script.py`, checked
against the beat table). Built by one Opus agent on 25 Nov 2026 (voices, drawing, music, render, checks). **NOT uploaded**: the main session
reviews it and asks the teacher first. It REPLACES the old P4 EP01 FOvUezOZJbo (never deleted).

## The build model
Engine copied from `../ep27/` (the P3-to-P4 pilot; itself from ep22): lib.js, common.js, closer.js, main.js, render.js, song.js (the P4
"Scoop Parade" family unchanged), make_voice.py (+ the `slowof` slow-motion line). Not edited: ep27/ or any other episode.
- `artp4.js` (new): Pip's bike drawn true (drive side, front at the right; chain loop on the front gear and the back gear with pitch = tooth
  spacing, so the rollers sit between the teeth and move as the gears turn; rim brakes, levers, cables; the bell), the skipping rope, the box
  USELESS PARTS, the sign, the ride clock RIDE IN mm:ss, the three fix cards, the void deck (baked `bg/vdp4.png`), the rain tree (baked
  `bg/rtp4.png`), the park connector (live, for the tracking shot), the look-closer chain on a gear, the journey world (one loop of huge links
  round the two gears, the huge back wheel), YOU as a chain link.
- `p1.js` (new): every scene. `sound_cues.js` (new). `song.js`: + the P4 EP1 ambiences (void deck, park), the series calm bed, the new
  one-shots (pedal whirr, grass thump, helmet bonk, rope hiss / zip / flop, chain clicks, freewheel, spanner, bells, Heart's hint #2).
- lib.js: P4 EP1 OUTCOMES / learnAt / KW / SHELF_HIDE / KWLINE, and **the P4 items worn in every pose** (`ITEM_AT`, `itemsOf`): Pip's goggles
  (on the brim of his bike helmet: `window.PIP_HELMET`, he wears the helmet all episode), Basil's P4 LAB SCIENTIST badge (its words mirrored
  back so they always read), Momo's magnifier on a cord round her neck. Drawn inside the sprite's transform, so they follow squash, hop and
  flips. The read-along lists the pills in the order Heart reads them (System, Function, Interact).
- common.js: markScene takes `bin`; the read-along and "Now you know!" buddies no longer pop in after the cut (the new flicker rule).

## Voices
All 76 lines recorded and aligned (`voice.log`, `voice_redo.log`; not aligned: none). Heart af_heart .90, buddies 12% slower (Character
Voice Kit). The ritual voices (h860, h864, h1304*, h1305, u1300, u1305) copied from ep27. **New guest voice: Chilli** (one line, e1102g; the
link to EP2): `vm.CHARACTERS["chilli"] = mix am_echo .45 + af_river .55, speed 1.02, formant 1.12, median 275 Hz, range 1.25` (make_voice.py).
The P4 README says a guest voice is tested for the teacher before use: **clip `../pron_clips/Chilli_p4ep01_voice_test.mp3` waits for the
teacher's listen** (keep the same recipe for EP2). No Singapore name is spoken; no sg_pron entry needed.

## Pacing (P4 README section 4)
First timeline 5:43 = 130 words a minute, voice on 76% (the recorded buddies speak at about 3.3 words a second, faster than the script's 2.7
estimate). Per the README ("lengthen the holds and think pauses, never add words"): .85 s between lines, about 1.4 s between scenes, a .38 s
pause between the sentences of a buddy line, the holds a little longer, think time after Heart's teaching sentences (script.py THINK_AFTER).
Result: **6:20.2, 741 words, 117 words a minute, voice on 70%**; the lock-in ring 6 s; the think card 3.5 s of silence.

## Departures from the script (the most faithful choice where it could not be built as written)
- Fix 1: Basil steadies the bike standing **behind** the back wheel (a buddy's paw cannot reach the saddle of a bike Pip can ride).
- Fixes 2 and 3 (the mechanic's test): Pip lifts the back of the bike standing behind the back wheel; Momo stands in front of the front wheel
  and **points** at the pedal she turns (the paintings have no hand-on-pedal pose).
- Pip's fall: the bike tips over sideways (drawn lying down away from us, on the grass); Pip falls forward-right onto his back, head first the
  way he goes (SERIES_FORMAT 6x), legs wiggling, then sits up sheepish (no "laughing" painting for Pip: his oops pose).
- The journey dive starts from the look-closer's drive picture (the chain is not on Pip's bike yet at that point); the pull-out lands on the
  bike in the void deck, on fix 3's layout.
- e710: the brakes and the bell are shown in two picture insets joined by lines to where they go on the bike (they are off the bike when the
  line is said); then they go back on, speeded up.
- Faces close-up (round frame) twice, both impacts as the script: Basil's wince at the topple (his "surprised" painting), his surprise at the
  rope flop.
- App moments: the body look-closer uses `O.respCirc` (it shows the heart and lungs working harder; videos.js now has that outcome), not
  `O.digestive` as the script's draft.

## Checks
- `qa/ghost_scan.txt`: no buddy ghosting (every scene change). `qa/facing_scan.txt`: no backwards movers (bikeP4, kidRiderP4, linkYouP4
  annotated FACES right, chilliP4 none); eye review: the riders on the chain travel right on the top run; Basil's face frame.
- `qa/flicker_scan.txt`: no buddy flicker (the new rule, 25 Nov: buddies arrive once and stay; no pop-ins after a cut).
- Every 2.5 s of the video was rendered as stills and checked for text over text, a bubble over a chip or label, a buddy over a word or a
  face; fixed before the render: fix-card bubbles, the replay bubble, the look-closer labels and verdict, the four pictures vs INTERACT, the
  inside-Pip bubble, the small print, the cold-open layout.

## Upload (the main session, after the teacher's OK)
`upload.json` (key `explained-p4-ep01`; replaces FOvUezOZJbo, retire_old true; playlists PLK9BW3T6kXx4 (P4) and PLPfEuT7l4KjI (main), both
`after` FOvUezOZJbo: the old video is at position 0 of both, read-only check 25 Nov), `thumb.jpg` (WHICH PART?), chapters
`production/youtube/chapters_p3.json` key `P4EP01`, `app_moments.json` (videos.js P4 entry no. 1, swap the whole entry), `p4ep01.srt`.
Heart mystery hint #2 logged in SecondBrain `Plans/videos/P4-new-direction.md` (5:31.8, 6 frames).

## Render (25 Nov 2026, 23:26-23:41 UTC)
**`p4ep01.mp4`**: 1920x1080, 30 fps, **11406 frames = 6:20.2**, decodes end to end (0 errors), **-16.0 LUFS, true peak -2.0 dBTP**.
`sheet.png` (30 stills), `p4ep01.srt` (captions for Studio), `qa/key_frames.jpg` (12 key frames from the video), `thumb.jpg` + `qa/thumb_320.jpg`.
Heart's hint #2 checked in the video: frames 9955-9960 (5:31.83-5:32.00, exactly 6 frames) show the heart in the bell's dome.
Intermediates (chunks, the silent video) deleted after the checks; `out/mix_p1.wav` kept for a splice if a fix is needed.
