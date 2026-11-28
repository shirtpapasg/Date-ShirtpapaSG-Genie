# Pet Buddy Quest: Primary 3 — promo video (27 Nov 2026)

Two cuts of a promo for the interactive game, made only from **real gameplay** of the build in the scratchpad (`p3quest/pub`):

| Cut | File (not in git) | Size | For |
|---|---|---|---|
| 16:9 | `pbq_p3_promo_16x9.mp4` | 1920x1080, 60 fps | YouTube, the app |
| 9:16 | `pbq_p3_promo_9x16.mp4` | 1080x1920, 60 fps | Shorts, TikTok, Reels (phone-sized gameplay, 390 px viewport) |

## How it is made

1. **Capture** (`cap.js` on `vcap.js`). Playwright plays the game like a pupil. The page's clock (`requestAnimationFrame`,
   `performance.now`, `Date.now`) and its CSS animations are put on a virtual clock, so every frame is exactly 1/60 s of game time at
   normal speed, however long a screenshot takes (no dropped or doubled frames). Voice lines keep their real length on that clock;
   every voice line, sound effect, tap and drag is logged with its time (`clips/*.json`).
   Desk: 1280x720 CSS px at 1.5x. Phone: 390x693 at 2.77x. Progress is set in `localStorage` (Worlds 1-4 finished, EP19 next;
   for GLITCH, Magnets finished with three saved mistakes).
2. **Sound effects** (`sfx.js`): the game's own Web Audio effects, rendered offline in the page (`OfflineAudioContext`).
3. **Voice** (`make_voice.py`, `script.py`): Heart, the game's recipe (`render_all.heart`: Kokoro `af_heart`, speed 0.90, pitch swing
   1.6), every sentence through `sg_pron`; "TheOneApp" is said "The One App". GLITCH's "New knowledge acquired." / "I will return."
   are the game's own files (`p3quest/v/<key>.mp3`).
4. **Music** (`make_music.py`): "Buddy Bounce", original, 120 bpm, C major, built on the vault composer's voices
   (`secondbrain/tools/kits/relax-music-composer.py`) with a mallet tune, claps and hats. Not Kampong Walk. Ducked 10 dB under voices.
5. **Edit** (`edit.py`, `compose.py`): shots found from game events (e.g. the `lock` sound = the moment the card is locked in),
   captions in Fredoka Bold (white, navy outline, key words yellow), tap rings where the pupil taps, the end card is the game's own
   title scene with the promo words. 9:16: a caption header (y 0-480; captions in y ~280-490, inside Meta's and TikTok's safe zones)
   above the phone gameplay (810 px wide, rounded frame, blurred fill at the sides). Two-pass loudnorm to -14 LUFS, true peak -2 dBTP
   (about -1.9 after AAC). `compose.py h --remix` rebuilds only the soundtrack on the finished picture.
   The raw recordings (`clips/*.mp4`) were deleted after the finals to save disk; `clips/*.json` (frame times and the event log) are kept,
   so `./run_caps.sh` recreates them exactly (the game runs on the virtual clock).
6. **Finish** (`finish.py <dir>`): 720p previews, posters, QA contact sheets (every 2 s), `checks.json`.

## Rebuild

```
(cd <scratchpad>/p3quest/work && node serve.js 8765 &)
./run_caps.sh                                            # both layouts (about 40 min; holds the render lock)
NODE_PATH=$(npm root -g) node sfx.js
/home/user/heart-tts/venv/bin/python make_voice.py
flock /tmp/explained_render.lock /home/user/heart-tts/venv/bin/python compose.py h
flock /tmp/explained_render.lock /home/user/heart-tts/venv/bin/python compose.py v
python3 finish.py <review dir>
/home/user/heart-tts/venv/bin/python compose.py h --still 12.5 /tmp/x.png   # one frame, for checking
```

## Claims (Reference/Social-Ads.md rules)
Spoken or shown: "All 28 Primary 3 episodes" (data/ep00-ep27), "Fully voiced" (every line has a voice file), "Now in TheOneApp".
No "PSLE", "official", "approved", "guaranteed", MOE or SEAB wording.
