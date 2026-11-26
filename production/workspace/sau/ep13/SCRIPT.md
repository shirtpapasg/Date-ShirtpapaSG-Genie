# TheOneApp, Explored · EP13 · "Super El Niño! Why Is Singapore So Hot And Dry?"

**Phase 1 (26 Nov 2026) was the plan below; PHASE 2 (same day) applied the teacher's answers and rendered it (next section). NOT uploaded.** The teacher asked to confirm four points
before rendering (section 5). Approved script: the teacher's draft doc https://claude.ai/artifact/7s2QmX4ZPN4ezyRgf8Es9U (read 26 Nov,
rev 7). Narrator Heart; buddies Pip, Momo, Basil (the saved Character Voice Kit recipes). Textbook link: the water cycle.

Files: `make_segments.py` -> `ep13_segments.json` · `voice13.py` (Heart + buddies, lip-sync `mouth13.js`) · `build_tl13.py` (build_tl.py +
5 marked lines) -> `ep13_tl.json` · `geo13.py` -> `geo13.js` (real maps) · `spr13.py` -> `spr13.js`, `spr/` (buddy pictures) · `scenes.js` ·
`thumb13.py` + `globe_ep13.json` -> `thumb_ep13.jpg` · `make_upload.py` -> `upload_ep13.json` · `stills/` (look-check stills, not in git).

```
cd production/workspace/sau; PY=/home/user/heart-tts/venv/bin/python
python3 ep13/make_segments.py && $PY ep13/voice13.py ep13/ep13_segments.json ep13/aud && $PY ep13/build_tl13.py ep13/ep13_segments.json ep13/aud ep13/ep13
python3 build_page.py ep13/ep13_segments.json ep13/ep13_tl.json common.js,ep13/geo13.js,ep13/spr13.js,ep13/mouth13.js,ep13/scenes.js ep13/ep13_page.html 1920x1080
(render, phase 2 only: flock /tmp/explained_render.lock ./render_all.sh ep13 ep13 ; then python3 ep13/make_upload.py)
```


## PHASE 2 (26 Nov 2026): rendered, NOT uploaded

The teacher's answers (26 Nov): "1 no level, 2 yes, 4 EP13, 3 Dec OK".
- No school level is said anywhere. 2:15 keeps the syllabus definitions WITHOUT "Clouds are made up of water droplets..." (still no evaporation
  definition sentence in the definitions file: the evaporation sentence is built from AB 2.8, as listed in section 2).
- The four checks applied: 1:12 version A ("The warm, wet air that rises from it, and builds the rain clouds, moves east too.") and "Hardly any
  rain clouds." at 1:22; the 2:40 fires wording; BASIL "I feel great, actually. Lizards love the heat!" + PIP "Not us! Drink lots of water and
  stay in the shade."; the teacher's title.
- Fact fixes: "more than two degrees Celsius warmer than usual" (the thermometer's mercury passes +2 °C, with "▲ more than +2 °C"); "a warmer,
  drier June to October"; PSI 192 is never called the peak.
- Defaults (not answered): Pip = "he"; the series standards stay (3 s silent cold open, countdown, "Now you know!").
- Back views: the teacher's coloured back paintings (26 Nov) are cut out by `explained2/characters/sprites/poses.py back` on the sitting scale
  and feet line (poses/pip_back.png, momo_back.png = momo_v2_back.png, basil_back.png = basil_v2_back.png; the old grey ones kept as
  *_back_grey.png). `spr13.py` picks the coloured painting first (switchable; a stand-in only if none exists). All three buddies ride in back
  view; a buddy turns to the front only to speak.
- Episode 4:13.4 (END 253.4 s incl. the end card); Short 1 "the journey" 51.1 s (Fri 4 Dec); Short 2 "only two degrees?" 52.8 s (Mon 7 Dec).
- Built with `ep13/build.sh`; rendered with `flock /tmp/explained_render.lock ./render_all.sh ep13`; QA `ep13/check.sh`; captions and upload
  details `python3 ep13/make_upload.py`; teacher review `ep13/review13.sh` (clip + 10 key frames in ep13/review/).
- Shorts' NEW sentences (teacher's list): "Why is Singapore so hot and dry this year?", "How can two degrees change the weather in India and
  the USA?", "Watch the full episode on TheOneApp, Explored." Everything else is the episode's own words.

## 1. Fact check (26 Nov 2026)

The official pages could NOT be opened from this cloud session: `www.cpc.ncep.noaa.gov` and `www.nea.gov.sg` (and other news hosts) are
outside the session's allowed network. Checked through web search results (which quote the pages); confirm on the pages once before render.

| Fact | Claimed | Result | Source and line |
|---|---|---|---|
| NOAA CPC, 12 Nov 2026 | >79% strong to very strong through Jan–Mar 2027 | **Confirmed** (search quote of CPC) | CPC ENSO discussion (ensodisc.shtml; also coyotegulch.blog 12 Nov reprint): "a strong-to-very strong El Niño is likely through January-March 2027 (remaining greater than a 79% chance)" |
| Next CPC update | 10 Dec 2026 | **Confirmed** | same: "The next ENSO Diagnostics Discussion is scheduled for 10 December 2026" |
| Pacific about +2 °C | Aug–Oct ONI ≈ +2.0 °C | **Different (index-dependent)**. Weekly Niño-3.4 was **+2.5 °C** (CPC, 12 Nov: "reaching +2.5°C in Niño-3.4"); trackers give ASO ONI **+2.46**; CPC's official index since Feb 2026 is the **RONI**, ASO about **+1.97** (one briefing, elninolive.com). "About 2 degrees" is true on NOAA's own index and slightly low on the others | Keep, or: "The middle of the Pacific is more than two degrees Celsius warmer than usual." (true on every index; Momo's "Only two degrees?" still works) |
| "Super" = ≥ +2.0 | convention | **Confirmed as a convention, not a NOAA term**: CPC's own word is "historic", at RONI ≥ +2.5 °C; CPC cut the chance of a historic event to about 60% for OND/NDJ on 12 Nov (was 83%/70%) | Script says "scientists call it a Super El Niño": OK (scientists and media use it); do not say NOAA calls it that |
| MSS, 29 May 2026 | >80% chance; warmer, drier Jun–Oct; haze risk | **Confirmed** (search quote) | NEA release: "a high chance of an El Niño event ... more than 80 per cent"; "warmer and drier conditions ... from June to October 2026"; "risk of transboundary haze affecting Singapore"; a positive IOD also expected |
| 1997 driest year (El Niño + positive IOD) | | **Not found** in any result. Not said in the script, so nothing to change; drop it from the fact sheet unless found on the NEA page | — |
| PSI first unhealthy | 4 Sep 2026, 101 | **Confirmed** | Malay Mail 4 Sep 2026 "Singapore haze tips air quality into unhealthy range for first time since 2023"; NEA Haze Situation Update (04 September 2026): central region 24-hr PSI 101 at 7 am |
| PSI 192 on 9 Oct 2026 | "peak 192" | **192 on 9 Oct confirmed; "peak" is DIFFERENT**: 192 was the year's high on 9 Oct, but later readings were higher: 229 (central) on 16 Oct, "highest in 2026" (The Online Citizen, 16 Oct); NEA 8 pm 16 Oct: "159 – 222, Unhealthy to Very Unhealthy". | NEA Haze Situation Update (9 October 2026): 24-hr PSI "135 – 192, in the Unhealthy range". The script does NOT say peak ("On 9 October ... reached 192. That is unhealthy."), so it is true as written. Do not call it the peak in cards or the description. |
| India IMD 2026 | 759.4 mm vs 868.6 mm, 12.6% short, weakest in over a decade, south and NE hardest hit | **Confirmed** (Indian news quoting IMD, 30 Sep 2026: "759.4 mm against a long-period average of 868.6 mm"; dsij.in "12.6% Deficient, Weakest Since 2015"). East & North-East India "driest monsoon since 1901" (reported); South Peninsula 542 mm, "fourth lowest since 1901" (one report; another says second lowest since 2001) | IMD's own press release not opened (mausam.imd.gov.in not tried: blocked hosts). "About one-eighth" = 12.5% ✓; "weakest in over ten years" (since 2015) ✓ |
| NOAA winter outlook 19 Nov 2026 | warmer north; wetter south incl. California and Florida | **Confirmed** (search quotes): "wetter-than-average conditions likely across the southern U.S., from California to Florida"; "above-normal temperatures ... across much of the northern two-thirds"; Florida >70% wet odds. The main Winter Outlook was 15/16 Oct; 19 Nov is CPC's monthly update | Card/description say "NOAA winter outlook, December to February" |

Wording note (optional, rule 5): MSS said "warmer and drier"; the script says "a hotter, drier June to October". Closer to source: "a warmer, drier June to October".

**Artifact vs paste:** every spoken line is identical. Differences are only in the "On screen" column (the paste abbreviates, e.g. "Buddies flopped
on the floor" -> "buddies flopped", "Basil basks happily" -> "Basil basks"), plus the doc's extra fact sheet and approval list. Both say "Pip fans herself".

## 2. The 2:15 definitions swap (applied in `ep13_segments.json`)

Source: `/home/user/secondbrain/Plans/videos/P5/definitions.md`, Chapter 2 "Cycles in Water" (MOE syllabus 2023 pp. 48–49; AB-C = the
Activity Book's MOE suggested responses). **There is no P4 definitions file for the water cycle**: in the 2023 syllabus the water cycle is P5
("Cycles in Water"; TheOneApp's `syllabus-map.js` also lists it under P5), although our EP4 (app no. 6, "Where Does All This Rain Come From?")
said "In Primary Four". Rule 2 (say the level aloud) is not met by the approved line: the teacher to choose "Primary Four" or "Primary Five".
The file has **no definition sentence for evaporation** (only for condensation, melting, boiling); the evaporation sentence below is built
from AB 2.8 ("evaporates to form water vapour") and the file's "gains heat" pattern: approval list.

- BEFORE (teacher): "Let's name what you saw. Water gains heat and evaporates into water vapour. Water vapour loses heat and condenses into
  tiny water droplets, which form clouds. The droplets fall as rain. That is the water cycle. El Niño does not stop the water cycle. It moves
  where the rain falls." (19.7 s)
- AFTER (built): "Let's name what you saw. Water gains heat and evaporates to form water vapour. [AB 2.8 + pattern] When water vapour loses
  heat, it changes into water droplets. This process is called condensation, where a change in state from gas to liquid occurs. [2.8, AB-C 2.3,
  exact] Clouds are made up of water droplets which are in the liquid state. [2.16, TLG, exact] The droplets fall as rain. The continuous
  movement of water from the Earth to the sky and back to the Earth again is called the water cycle. [2.14, AB-C 2.5, exact] El Niño does not
  stop the water cycle. It moves where the rain falls." (32.9 s, +13.2 s)
- Shorter option (−4.5 s): drop the "Clouds are made up of..." sentence.

## 3. Pip's pronoun

The series uses **he** for Pip (SERIES_FORMAT section 5: "Pip stays grey ... his current paintings are kept"; 271 he/his/him uses against 8
she/her in the vault's video notes, and those 8 are about Momo). Momo is "she", Basil "he". The draft's "Pip fans herself" becomes **"Pip fans
himself"** (on-screen note only; no spoken line has a pronoun). Note: Pip's saved voice is a high, girl-like blend (af_heart + af_nova); unchanged.

## 4. Script as rendered (phase 2), with times from the timeline (Heart soft = the BE THE THING journey voice)

| At | Scene | Voice | Words |
|---|---|---|---|
| 0:00 | corridor | (silent 3.0 s) |   [ADDED: silent cold open (series standard)] |
| 0:04 | corridor | HEART | It's the end of the year. The rainy season should be here. So why does Singapore still feel like an oven? |
| 0:10 | corridor | PIP | My fur is melting! |
| 0:12 | corridor | MOMO | My water bowl went down again. |
| 0:15 | corridor | BASIL | I feel great, actually. Lizards love the heat! |
| 0:18 | corridor | PIP | Not us! Drink lots of water and stay in the shade. |
| 0:23 | globeFly | HEART | The answer starts thousands of kilometres away, over the Pacific Ocean. Let's shrink down and go there. |
| 0:30 | countdown | HEART (excited) | Are you ready? Three! Two! One! Go!  [ADDED: countdown (series standard, as EP11)] |
| 0:35 | povShrink | (silent 3.2 s) |  |
| 0:40 | povWind | HEART (soft) | You are a gust of wind. You blow over the Pacific Ocean from east to west, day after day. People call you the trade wind. |
| 0:49 | povWarm | HEART (soft) | Below you, the sea is warm. You push the warm top layer of water along with you, west, towards Singapore. |
| 0:58 | povCloud | HEART (soft) | The warm water gains heat from the Sun. Some of it evaporates into water vapour and rises with you. High up, the water vapour loses heat, condenses into tiny water droplets and forms clouds. |
| 1:12 | povRain | HEART (soft) | Over Singapore, the clouds rain down. That is a normal year. |
| 1:19 | povWeak | HEART (soft) | But this year, you grow weaker and weaker. The warm water slides back east, away from Singapore. The warm, wet air that rises from it, and builds the rain clouds, moves east too. |
| 1:32 | povWeak | PIP | Wait for us, clouds! |
| 1:35 | povDry | HEART (soft) | You look down at Singapore. Blue sky. Hardly any rain clouds. What you just lived through has a name: El Niño. |
| 1:46 | news | HEART | On the twelfth of November, scientists at NOAA in the USA said this El Niño is strong to very strong. Back in May, Singapore's weather scientists had already warned us: a warmer, drier June to October. |
| 2:00 | thermo | HEART | The middle of the Pacific is more than two degrees Celsius warmer than usual. When it gets that warm, scientists call it a Super El Niño. |
| 2:09 | thermo | MOMO | Only two degrees? |
| 2:10 | thermo | HEART | Across a whole ocean, that is a huge amount of heat. |
| 2:15 | waterCycle | HEART | Let's name what you saw. Water gains heat and evaporates to form water vapour. When water vapour loses heat, it changes into water droplets. This process is called condensation, where a change in state from gas to liquid occurs. The droplets fall as rain. The continuous movement of water from the Earth to the sky and back to the Earth again is called the water cycle. El Niño does not stop the water cycle. It moves where the rain falls. |
| 2:46 | haze | HEART | With less rain, forests and peatland in our region dried out. Dry land burns easily, so the fires that started burned longer and spread further. On the ninth of October, Singapore's haze reading, the P S I, reached one hundred and ninety-two. That is unhealthy. Remember the smoke particle from Episode One? |
| 3:06 | haze | BASIL | Even I stayed indoors. |
| 3:09 | india | HEART | El Niño moves rain around the world. In India, this year's monsoon brought about one-eighth less rain than normal, the weakest in over ten years. The south and the northeast were driest. |
| 3:22 | usa | HEART | In the USA, it works the other way for some places. This winter, scientists expect wetter weather than usual across the south, like California and Florida, and a warmer winter up north. |
| 3:34 | usa | PIP | So one tired wind changes the weather in three countries? |
| 3:38 | usa | HEART | Yes. That is why scientists all over the world watch it. |
| 3:43 | try | HEART | Be a weather detective. Put two cups with the same amount of water outside: one in the sun, one in the shade. Mark the water level. Check after three days. Which cup lost more water, and why? Hint: which one gained more heat? |
| 4:00 | bye | MOMO | Then tell a friend in India or the USA what El Niño is doing to their weather! |
| 4:05 | bye | HEART | See you next time on TheOneApp, Explored. |
| 4:08 | nyk | HEART (excited) | Now you know!  [ADDED: rule 1] |

Spoken forms (captions keep digits and letters): "On the twelfth of November", "On the ninth of October", "the P S I" (Kokoro says "PSI" as
"sigh"), "one hundred and ninety-two", "two degrees", "Episode One". Kokoro's own phonemes checked: El Niño /ɛl ˈniːnjoʊ/ ✓, NOAA /ˈnoʊə/
("Noah") ✓, monsoon, peatland, kilometres ✓. No name on the teacher's pronunciation list (sg_pron) is said.
ADDED (series standards, not in the approved script; the teacher may say no): the 3 s silent cold open (fan and birds), the countdown "Are you
ready? Three! Two! One! Go!" (as EP11), "Now you know!" (rule 1). NOT added: "last time's answer" (EP11's think question about clean rooms;
no Explored EP12 exists in any branch) and a "Think about it" (the Try-this question plays that part).

## 5. The teacher's four checks: prepared wordings (NOT applied)

1. **1:12, "the rain clouds go with the warm water"** (truer, P4-safe; the gust stays the "you"). Recorded: `wind5` 9.0 s now.
   - A (closest to the draft, +4.0 s): "But this year, you grow weaker and weaker. The warm water slides back east, away from Singapore. The warm,
     wet air that rises from it, and builds the rain clouds, moves east too." PIP: "Wait for us, clouds!"
   - B (water-cycle words, +4.3 s): "... The warm water slides back east, away from Singapore. Most of the water vapour now rises far out at sea,
     so fewer rain clouds form over us." (true: Singapore still gets some rain; "fewer" not "no").
   - Recommend A; also change 1:22 "No rain clouds." -> "Hardly any rain clouds." (true for a dry spell, same length).
2. **2:40 fires** (never says El Niño starts fires; +2.0 s): "With less rain, forests and peatland in our region dried out. Dry land burns
   easily, so the fires that started burned longer and spread further." The draft's own line is already safe; this makes "El Niño does not light
   fires" plainer.
3. **0:12 Basil "I feel great, actually."** (heat not shown as good for people; +5.5 s): BASIL: "I feel great, actually. Lizards love the heat!"
   PIP: "Not us! Drink lots of water and stay in the shade." (Or Heart, +6.9 s: "Basil is a lizard, so he loves the heat. For us, a hot day
   means drinking water and staying in the shade.") Basil gets a laughing/cheer pose; Pip turns to the camera.
4. **Title options** (YouTube, then " | TheOneApp, Explored EP13"):
   - "Super El Niño! Why Is Singapore So Hot And Dry?" (the teacher's)
   - "Where Did Singapore's Rain Go? We Rode The Wind To Find Out!"
   - "One Tired Wind Made Singapore Hot And Dry! (Super El Niño)"
   - "Why Is Singapore SO HOT? The Super El Niño Mystery"

## 6. Length

As built (2:15 swap + cold open + countdown + "Now you know!"; checks not applied): **4:04.8** (244.8 s incl. the 4.2 s end card).
Teacher's own 2:15 wording: 3:51.6. With all four checks applied (1A, 2, 3 buddy version): about 4:16. Ways back to about 3:55: drop the
countdown (−5.7 s) and the "Clouds are made up..." sentence (−4.5 s) -> about 4:06 with all four checks, 3:55 with checks 1 and 2 only.

## 7. Build plan (scene list; the 8 starred scenes are drawn for the look-check stills, the rest are built in phase 2)

| Scene | At | What is on screen (why) | Sound |
|---|---|---|---|
| corridor ★ | 0:00 | HDB corridor at noon (one-point perspective, parapet and railing on the left, flats' gates right), sun patch and heat shimmer on the floor, a standing fan turning; card "📍 NOVEMBER, SINGAPORE". Pip with a paper fan, Momo by her half-empty water bowl, Basil basking in the sun patch (aura discs; talking sprites lip-synced). No made-up temperature number. | whirr, birds; silent 3 s cold open |
| globeFly | 0:17 | Real globe (Natural Earth, centre 160E 5N): from Singapore, ease out and east over the Pacific | whoosh |
| countdown | 0:25 | series countdown (common.js) | ADDED |
| povShrink | 0:30 | (silent 3.2 s) the buddies and the viewer shrink into a curl of wind over the sea; the "You: a gust of the trade wind" tag lands | pad_wonder (calm bed for the whole journey), space_warp, wind, sparkle |
| povWind ★ | 0:35 | BE THE THING, first person, low over the Pacific flying WEST: wave crests rush at the camera, wind streaks stream past, a line of rain clouds on the western horizon (warm sea near Asia); Momo and Basil ride in back view looking ahead, Pip faces the camera (he speaks on this journey); a small real map (bottom right) with a yellow "you" dot moving west | wind, sea_wash; Heart soft |
| povWarm | 0:44 | same, the sea turns warm orange, chevrons on the surface stream west; card "WARM WATER PILES UP NEAR ASIA"; the map's warm pool grows near Asia | sea_wash, wind |
| povCloud | 0:53 | first person rising: invisible water vapour shown only as faint rising dotted trails (never white puffs), cooling high up, droplets appearing and a cloud forming around the camera; cards "EVAPORATES", "CONDENSES" | sparkle, wind |
| povRain | 1:07 | looking down at Singapore (real coast, geo13 SG view to add), the clouds rain on the city and MacRitchie; card "A NORMAL YEAR" | rain, soft thunder |
| povWeak ★ | 1:14 | outside shot (the El Niño map): the real tropical Pacific, Asia LEFT (the wind's view): the trade-wind arrows shrink, the warm water slides east, the rain clouds follow it, a Sun appears over Singapore; card "THIS YEAR"; legend "warm water"; Pip: "Wait for us, clouds!" | wind fading, pass_by; pad_tension |
| povDry | 1:26 | look down at Singapore: blue sky, dry soil, yellowing grass at a void deck; pull back to normal size (the buddies grow back); tag "EL NIÑO" | reveal |
| news | 1:36 | two source cards: 🇺🇸 NOAA (USA), 12 November 2026 "El Niño: strong to very strong"; 🇸🇬 MSS (Singapore), 29 May 2026 "Warmer, drier weather, June to October" (our drawing, no logos, rule 6) | pop |
| thermo ★ | 1:50 | the same real map; NOAA's Niño 3.4 box (5S–5N, 170W–120W, "the middle of the Pacific") lights up; thermometer "usual / +1 °C / +2 °C"; chip "🔥 SUPER EL NIÑO"; Momo asks "Only two degrees?" | — |
| waterCycle ★ | 2:05 | LOOK CLOSER: the sea, the Sun, dotted evaporation arrows labelled "water vapour", a cloud with a magnifier of tiny liquid droplets, rain on the Singapore skyline and a reservoir, water flowing back to the sea; process tags EVAPORATION / CONDENSATION (pills) and the things in white words (one kind of label per row); "🔄 THE WATER CYCLE" | soft chime on key words |
| haze ★ | 2:40 | a void deck under a soft grey-brown haze (gentle, rule 3: no fires, no smoke clouds); the 24-hour PSI gauge with NEA bands climbs to 192, "UNHEALTHY", "9 Oct 2026"; inset: EP1's smoke particle ("Episode 1"); Basil at a window indoors | cough (soft), ambience |
| india ★ | 3:01 | the real map of India; the south (IMD's South Peninsula) and the north-east shaded soft brown at their real places (no state lines: we have no state borders, so no hard edges are drawn); rain bars to scale: 868.6 mm normal vs 759.4 mm in 2026; card "☀️ 12.6% LESS RAIN". To add: a strip of dry paddy fields | — |
| usa ★ | 3:14 | the real lower 48: rain clouds at California, Texas and Florida (the south), Suns at Montana, Minnesota and Maine (the north); legend "wetter / warmer than usual", "NOAA winter outlook, Dec 2026 to Feb 2027"; Pip asks his question | rain (soft) |
| try | 3:35 | the HDB ledge: two cups, same water, one in sun and one in shade, a marker line, "Day 1 / Day 3"; card "TRY THIS" | pour, tick |
| bye | 3:51 | the corridor again (closing the loop): the buddies wave (waving poses), end card | — |
| nyk / end | 4:00 | "Now you know!" (rule 1) and the series end card | ding, tada |

Captions: the series' word-by-word captions (build_tl13). Key words (shelf): TRADE WIND, EL NIÑO, EVAPORATION, CONDENSATION, WATER CYCLE.
Music: pad_wonder under the whole journey (0:30 to 1:35), pad_tension under "THIS YEAR"; no other music (series: one or two beds).

**Buddies (stills):** front views are the Explained cast as in EP27 (Pip grey, Momo coral v2, Basil teal v2). **Back views:** the teacher's
back paintings exist only in the OLD GREY art, and Pip has none. For the stills, Momo's and Basil's grey backs were recoloured by code to
coral/teal (`spr13.py`, as P4 EP1 v2 does for Basil) — SERIES_FORMAT says never to recolour grey art with code, so these are stand-ins:
**ask the teacher for coloured back paintings of Momo and Basil, and Pip's back view**, or approve the stand-ins.

## 8. Thumbnail, YouTube, schedule

- Thumbnail: `thumb_ep13.jpg` (1280x720) from `globe_ep13.json` via `globe_thumb.py` (globe turned to the Pacific, 172E 3N; Singapore with a
  Sun, the warm water and rain clouds over the middle/east Pacific at true places; Pip with his fan; "SUPER EL NIÑO!", "Why is Singapore so hot
  and dry?"). `thumb13.py` redraws the land for the whole visible hemisphere (globe_thumb.py keeps only land within 28° of Singapore).
  `globe_thumb.py` itself: a one-line crash fix (points behind the globe are skipped when the centre is far from Singapore); EP11's output is
  byte-identical after the fix.
- `upload_ep13.json`: sau_upload.py format, `"hold": true`, title/description (chapters from the timeline, sources)/tags. **Not uploaded.**
  Date set to **Thu 3 Dec 2026, 5 pm SGT** (the next Thursday after EP11, 26 Nov; no Explored EP12 exists): confirm. Shorts: not made (phase 1).
- **Episode number:** the teacher numbers like TheOneApp's NEWS list ("EP6 = the water cycle" is NEWS no. 6 = YouTube EP4 "Where Does All This
  Rain Come From?"). In that list, no. 12 = YouTube EP10 (compost); the chip episode (YouTube EP11, public today) will be NEWS no. 13, which
  makes El Niño **NEWS no. 14** and **YouTube "EP12"**. The json says "EP13" as asked: confirm before upload.

TheOneApp `videos.js` NEWS entry (prepare only; add after it is public; times from the final cut, 26 Nov; `no: 13` as the teacher asked: the chip episode is not in NEWS yet):
```js
    { no: 13, art: '🌊', topic: 'Weather and Water', title: "Super El Niño! Why Is Singapore So Hot And Dry?", len: '4:13', url: 'https://www.youtube.com/watch?v=VIDEO_ID', moments: [
      { at: '0:35', what: 'You are the trade wind' },
      { at: '1:45', what: 'The headline' },
      { at: '1:59', what: 'What makes it super' },
      { at: '2:15', what: 'The water cycle' },
      { at: '2:45', what: 'Here in Singapore: the haze' },
      { at: '3:09', what: 'Meanwhile in India and the USA' },
      { at: '3:42', what: 'Try this' } ] },
```
