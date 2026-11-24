# TheOneApp promo films 1-3 as YouTube Shorts (24 Nov 2026)

Teacher: "make these promo videos into shorts, they are most suitable for it given its short durations. I will want to
advertise it soon." Nothing was uploaded; YouTube was not touched. Film 4 (being upgraded in `promo/film4`) is left for later.

## 1. What the research found (web search, 24 Nov 2026)

`support.google.com` could not be opened directly from this session (the host is outside its network allowlist), so the
facts below come from the search engine's reading of Google's own help pages plus third-party guides. Each is marked.

| Question | Finding | Source |
|---|---|---|
| Maximum length of a Short | **3 minutes.** Uploads from **15 Oct 2024** that are square or vertical and up to 3 min are Shorts (music-label channels got a later date). Confirmed. | YouTube Help, "Understand three-minute YouTube Shorts" https://support.google.com/youtube/answer/15424877 |
| How a video becomes a Short | By **shape and length** only: square or vertical aspect ratio and <= 3 min. A wider ratio (16:9) is long-form. `#Shorts` in the title is not required (our tools use it to route the video to the "TheOneApp Shorts" playlist). | same page |
| Aspect ratio / resolution | **9:16, 1080 x 1920** (Google calls 9:16 best suited to Shorts; 1080 x 1920 is the recommended HD vertical size). Square also counts as a Short. | Google Ads Help, "Your guide to YouTube Shorts ads" https://support.google.com/google-ads/answer/16041697 ; Piktochart size guide https://piktochart.com/blog/youtube-shorts-dimensions/ |
| Length for **ads** | Shorter than the 3-min organic limit: **Demand Gen: Shorts max 1 minute, 10-20 s recommended**; **Video reach: Shorts 6-60 s**; **Performance Max: a Shorts-eligible video is vertical, 10-60 s**. So an ad copy must be **<= 60 s** -> we made a <= 60 s cut of each film too. | Google Ads Help 16041697 (above); "Video reach campaigns" https://support.google.com/google-ads/answer/10581234 ; "About video assets for Performance Max" https://support.google.com/google-ads/answer/14528532 ; Demand Gen specs https://support.google.com/google-ads/answer/13704860 |
| Hook | Win the first 2-3 s; the first frame and first line carry the video (YouTube's own guide, as reported by ppc.land; vendor guides agree). | https://ppc.land/insider-tips-for-creating-viral-youtube-shorts-revealed/ ; https://www.opus.pro/blog/youtube-shorts-hook-formulas |
| Captions | Big, few words at a time, centred or a little above centre; not stacked at the bottom. | https://reap.video/blog/short-form-video-safe-zones ; https://klap.app/blog/youtube-shorts-best-practices |
| Safe zones | No official organic-Shorts overlay spec was found. Google's ad safe-zone sheet (universal, all devices "not guaranteed"); guides keep the **bottom ~25-30 %** (title, channel, music) and the **right-hand button column** clear; key visuals in a central ~900 x 1160-1400 box. | https://services.google.com/fh/files/misc/universalsafezones-youtube.pdf ; https://www.kapwing.com/video-editor/youtube-shorts/safe-zone ; https://syllaby.io/blog/aspect-ratios-safe-zones-shorts-reels-tiktok/ |
| Loops | Shorts replay automatically; an ending that flows back into the opening keeps people watching (vendor guidance, not an official rule). | https://www.socialmediaexaminer.com/youtube-shorts-hooks-and-curiosity-loops-that-explode-your-views/ |

### Made for kids and Google Ads: NOT confirmed

The teacher believes a video set "made for kids" (MFK) cannot be used as a Google Ads / YouTube video ad. **I could not
confirm this.** Four searches found no Google page that says an MFK video is barred from being an ad creative. What
Google's pages do say is about ads shown **on** MFK content:
- no personalised ads and no third-party trackers on MFK content; only contextual ads; and some ad categories are
  restricted there (Ads & made for kids content policy https://support.google.com/adspolicy/answer/9683742 ; How ads work on
  "made for kids" content https://support.google.com/youtube/answer/9713557 ; Google blog
  https://blog.google/products/ads-commerce/our-strict-privacy-standards-around-made-for-kids-content/);
- ads in the YouTube Kids app must be pre-approved, in-stream only (https://support.google.com/youtube/answer/6168681);
- advertisers can opt out of MFK inventory with one click, Performance Max included (same blog).

What that means for the teacher:
1. Before the ad campaign, **check it once in Google Ads** (add the MFK Short as a video asset and see if it is accepted), or
   ask Google Ads support. Reading the policy pages directly needs `support.google.com` allowed in the session's network.
2. The audience setting must be **honest**: YouTube asks whether the video is *directed at children*, and these films are
   cartoons with child characters made for Primary 3-6 pupils. Setting a copy "not made for kids" only to run it as an ad,
   when the content is directed at children, would be a mislabel (COPPA / YouTube terms). If ad copies are uploaded
   not-MFK, they should be genuinely aimed at **parents** (the title and description are written to parents; consider a
   parent-facing voice-over or end card for the ad version).
3. Whatever is decided, **keep the organic Shorts as they are** (the channel uploads everything MFK; see section 4).

## 2. What was made

`make_short.py <N>` turns `revoice/film<N>_v2.mp4` (1920 x 1080, 60 fps, new voices) into `film<N>_short.mp4`
(1080 x 1920, 60 fps). No source project is needed: every frame is made from the film's own frame.

- **Reframe**: `plan_film<N>.py` is the keyframed crop plan, written by stepping through the film (frames every 0.25-1 s,
  plus a frame-difference scan for scene changes, `scene_cuts.py`) and following the action: the buddy who is
  talking, or the object of the story (the circuit, the cards, the riddle, the shadow screen). Each keyframe eases
  (smoothstep) to a new window; at the film's own scene changes it is a hard cut on the exact frame.
- **One layout, one knob**: the window's width `w` runs from a full vertical crop (634 px) to a wide view; the wider it is,
  the shorter the sharp picture gets, and a blurred, zoomed fill of the same frame shows above it. So "the 16:9 frame over a
  blurred fill" is the same layout pushed wide, used only where two subjects are far apart (the School Lab quiz cards, the
  shadow torch-to-screen, the airship and the riddle), and it can ease in and out without a cut.
- **The picture sits above the Shorts UI**: its bottom is at y 1440 (75 %); below it only a soft blurred reflection, where
  the title, channel and buttons go.
- **Old captions out**: the films have burned-in captions from y ~900; the window's bottom edge stays at y <= 880 whenever
  one can be on screen (lower only in film 2's uncaptioned opening and film 3's last seconds).
- **Hook** (frame 0 = the cover, 0-1.5 s): film 1 "A FOG THAT MAKES YOU FORGET?!", film 2 "THE GUARDIANS WON'T WAKE UP!",
  film 3 "WHO STOLE THE LIGHT?!" (the line film 2 ends on). Placed clear of the subject (film 2's title sits under the
  glowing robot).
- **Captions**: every spoken line, 2-4 words at a time, Fredoka Bold white with a navy outline, key words yellow, a small
  pill with the speaker's name in the film's own colours; centre y ~ 640 (upper middle), x 80-960 (clear of the button
  column). Timing: each line's clean voice file (`revoice/voice/`) was placed by `mix.py` at a known time at tempo 1.0, so
  `align_words.py` runs faster-whisper (small.en) on each file and adds that offset: word times are exact to the frame.
- **End card**, last 2.3-2.6 s: logo, "Try TheOneApp free", "theoneapp.sg", over the soft, darkened last shot, in the hook's
  type and colours so the replay loops back into the hook.
- **Audio**: the full Shorts carry the film's own AAC stream **copied untouched** (192 kb/s, 48 kHz; mastered to -16 LUFS,
  true peak <= -1 dBTP). A first render re-encoded it and film 2's true peak rose to -0.2 dBTP, hence the copy. The ad cuts
  must re-encode: their ranges are joined with 60 ms fades, +0.2 dB, and a safety limiter at -1.7 dBFS.
- **Encode**: H.264 High, CRF 18, yuv420p, BT.709, 60 fps, +faststart.

### Files

| | Full Short | <= 60 s ad cut |
|---|---|---|
| Film 1, The Forgetting Fog | `film1_short.mp4` | `film1_short60.mp4` |
| Film 2, The Sleeping Guardians | `film2_short.mp4` | `film2_short60.mp4` |
| Film 3, The Eclipse Riddle | `film3_short.mp4` | `film3_short60.mp4` |

The mp4s are not committed; 720 x 1280 previews and contact sheets are in the session
scratchpad. Durations and checks: section 3.

The ad cuts keep the story beats and the app's features (Watch it / Quiz it / Keep it, the quiz cards, "We need you",
"The only app you need to learn Science") and drop the "Next time..." teaser; the joins sit in gaps between lines (60 ms
audio fades), mostly on the film's own scene changes. The music jumps a little at some joins; for a polished ad a
re-scored cut from the source project would be better.

## 3. Checks

`check_shorts.py`: every file decodes end to end with no errors; H.264 High 1080 x 1920 60 fps; A/V = the Short's sound
cross-correlated against the film's own sound in each kept range (0 = in sync; under 1 ms everywhere, a frame is 16.7 ms).

| File | Length | Frames | LUFS | True peak | A/V | Size | 720p preview |
|---|---|---|---|---|---|---|---|
| film1_short.mp4 | 1:23.0 (82.98 s) | 4979 | -16.0 | -1.3 dBTP | 0.0 ms | 50 MB | 13.5 MB |
| film1_short60.mp4 | 0:53.0 | 3182 | -15.9 | -1.5 | 0.6 ms | 33 MB | 9.9 MB |
| film2_short.mp4 | 1:15.6 (75.62 s) | 4537 | F2I | F2P | F2A | 57 MB | F2M |
| film2_short60.mp4 | 0:58.3 | 3497 | G2I | G2P | G2A | 45 MB | G2M |
| film3_short.mp4 | 1:16.8 (76.78 s) | 4607 | -16.0 | -1.5 | 0.0 ms | 44 MB | 13.6 MB |
| film3_short60.mp4 | 0:57.3 | 3436 | -15.5 | -1.5 | 0.6 ms | 31 MB | 10.8 MB |

Weak or hard moments (seen on the contact sheets):
- Film 1, 0:15-0:19 (the fog arrives): the airship is far left and the buddies far right; done as a pan between them.
  0:42-0:45 (the fog of questions) and 0:50-0:54 (Momo and Basil come in at the right of the quiz) are wide, so the picture is
  small there. 0:57-0:59: the scene's "Which one lets electricity through?" box is wider than the crop; captions moved above it.
- Film 2, 0:02-0:16: three Guardians fly all over the frame and then the buddies are tiny under the sleeping unicorn; a fixed
  medium crop, so a Guardian is sometimes half out of frame. 0:33-0:43: the School Lab's own label pills ("Heat flows from a
  hotter object...", "Light can be reflected.") are wider than the tall crop and show cut at the left edge. 0:52-0:56 (all
  Guardians awake under the rainbow) is wide and small.
- Film 3, 0:09-0:20: the riddle (LIGHT RETURNS WHEN NOTHING BLOCKS ITS PATH) and the buddies are too far apart: the riddle
  is shown, then the crop moves to the buddies and the riddle is half-cut at the left. 0:24-0:30: the mind map's outer nodes
  are cut at the edges. 0:31-0:38 (torch, ball, screen) is wide.
- Film 3's render predates a fix that also highlights key words written with punctuation ("riddle!", "shadow.", "Science."),
  so it has fewer yellow words than films 1-2 (film 1 lacks only "TheOneApp!"). Re-render with make_short.py to get them.

## 4. Upload JSONs and the tools

`upload_short<N>.json` follow `revoice/up/upload_film1.json` and fit `production/youtube/explained_upload.py`:
- a part whose title has `#Shorts` goes only into the "TheOneApp Shorts" playlist (`PLO1GzAf41cwM`), which the JSON lists;
- **made for kids**: `explained_upload.py` (and `sau_upload.py`) always send `selfDeclaredMadeForKids: true` and ignore any
  flag in the JSON. The JSONs carry `"madeForKids": null` (undecided) for the teacher. To upload a not-MFK copy, the
  uploader needs a small change to read that flag first;
- `explained_upload.py` makes every part **public**. The ad cut is therefore kept OUT of `parts` (under `ad_cut`), so a run
  of the tool cannot publish it by accident; ad videos are usually uploaded **unlisted** and linked from Google Ads.
- no custom thumbnail: a Short's cover is picked from its frames in the YouTube app (our frame 0 is designed as the cover).

## Rebuild

    <venv with faster-whisper>/bin/python align_words.py 1 2 3          # word times -> words_film<N>.json (committed)
    python3 make_short.py <N> --preview 0.5                               # a sheet of rendered frames, no encode
    flock /tmp/explained_render.lock python3 make_short.py <N>            # film<N>_short.mp4
    flock /tmp/explained_render.lock python3 make_short.py <N> --cut      # film<N>_short60.mp4
    python3 check_shorts.py                                               # decode, A/V, loudness, previews, contact sheets
