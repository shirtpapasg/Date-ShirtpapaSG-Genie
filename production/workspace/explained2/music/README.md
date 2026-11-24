# music/: Kampong Walk, the background music of "TheOneApp, Explained"

The teacher (24 Nov 2026): "you may include the same music inside the 'lofi' into the youtube videos. I love the kampong walk music."
Chosen: TheOneApp, Explained only; Kampong Walk only. The rule: `../SERIES_FORMAT.md` section 9, "Background music: Kampong Walk".

| File | What |
|---|---|
| `kampong_walk.wav` | The tune, 48 kHz stereo 16-bit, 365.7 s, a seamless loop (128 bars = 16 passes of the 8-bar tune). **Not committed** (70 MB): rebuild it with `render_kampong.js`. |
| `render_kampong.js` | Renders it: `NODE_PATH=$(npm root -g) node render_kampong.js [/home/user/theoneapp] [passes=16]` (about 4 min). |
| `lofi_song.js` | Runs an episode's own `song.js` (unchanged on disk, patched in memory) with the old music beds left out and the Kampong Walk bed in. |
| `../add_lofi.py` | The tool for a finished part: `python3 add_lofi.py <epdir> <part>` (see its header). |
| `applied.json` | Every part that has the bed: levels, loudness, true peak, the new mp4's size and time. |

## How the tune was rendered
- **The app's own code, unchanged:** `theoneapp/tunes.js` (`STUDY_TUNES.start(ac, bus, k)` for Kampong Walk: 84 bpm, swing .18, the swung
  piano chords, the walking bass, the melody on bells and piano on alternate passes, every note a touch early or late and softer or louder)
  into the same output chain as `theoneapp/index.html`'s study-music engine (`mPlay`: the bus at .225, a 6 kHz low-pass Q .4, a 2.4 s room at
  .34 wet). `lofi.js` is the picture only (no sound). Nothing in `/home/user/theoneapp` was edited.
- **Headless Chromium (Playwright) on an OfflineAudioContext.** tunes.js schedules its bars from a 150 ms `setInterval` against
  `ac.currentTime`, 0.6 s ahead. The page captures that interval's function and calls it at `OfflineAudioContext.suspend()` points every
  0.4 s of audio time, so every bar is scheduled exactly as the live player schedules it.
- **The loop:** 16 passes (even, so bells and piano keep alternating across the seam). Everything that rings on after the last bar (note
  tails, both reverbs) is folded onto the start, so the file repeats without a click (measured: the seam's sample step is 0.0025, against
  0.047 for the file's 99.99th percentile). Bar levels are even (-18.0 to -19.4 dB RMS). Peak normalised to -1 dBFS (the level is set in the
  episode mix). The random parts (timing wobble, the noise reverbs) differ from one render to the next, as they do in the app.

## How it is mixed (lofi_song.js)
- Old beds out: `C.R.groove` (the game bed and the outro), `C.R.calm`, `C.R.wonder`. Every effect, ambience, voice, chant clap and stomp,
  tick and bell stays (song.js is deterministic, so they are identical to the finished part).
- One bed for the whole part, never restarted: it fades in over 3 s at the start and out over the last 4 s, and dips to silence (0.8 s
  smoothstep fade out, 1.5 s back in) under every countdown (ring start - 0.12 s to bell + 0.45 s, the same window the old groove left),
  under the clap-clap-stomp chant, and under "Now you know!" (to 1.2 s after the blast).
- Ducked under speech by audio/mix.js `duck` (depth 0.4 = -4.4 dB, attack 30 ms, release 0.6 s, so it does not pump between words).
- The level is set from the master drive the part gets without the bed: **about -28 LUFS short-term under speech, about -23 in the gaps.**
  The master is song.js's own (-16 LUFS integrated, true-peak limiter at -1.5 dBTP); add_lofi.py checks the AAC file and re-mixes with a lower
  ceiling if the true peak comes out over -1.5.
- Change the levels with `LOFI_UNDER=-27` (LUFS-S under speech) and `LOFI_DEPTH=0.4` in the environment of `add_lofi.py`.
