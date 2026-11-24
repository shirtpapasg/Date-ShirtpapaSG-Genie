# Promo films 1-3: thumbnails v3

Made by `thumbs_v3.js` (`NODE_PATH=$(npm root -g) node thumbs_v3.js [copy-dir]`) -> `up/thumb<N>_v3<a|b>.jpg`
(1280x720, JPG, 140-240 KB). These replace the rejected v2 set (`up/thumb<N>_v2.jpg`, made by `thumbs_v2.js`).
Teacher, 24 Nov 2026: "I honestly don't think these are the thumbnails that will get extra impressions and clicks.
You have done the research, recreate them properly."

## Why v2 failed
- Each was a busy, dark purple Station scene with small subjects. There was no single face or object to look at.
- Each had two text blocks (a long hook and a pill), and the hook repeated the idea of the title.
- All three shared one layout and palette, so they blurred into each other and into film 4's "EARN YOUR STYLE".
- Film 1's hero was a vague purple haze.

## Principles applied (research, Nov 2026)
Most published thumbnail advice comes from vendor blogs. Where only a blog backs a point, it is marked
*convention*, not proof. YouTube's own Test & Compare is the real judge (see the last section).

1. **One focal subject, big (about 40-60% of the frame); cut or blur everything else.** In vidIQ's study of 500 breakout
   videos, 89% had a face, high contrast or both. Thumbnail breakdowns describe the hero face at 40-50% of the frame.
   *Convention.* [vidIQ thumbnail study (Jun 2026)](https://vidiq.com/research/youtube-thumbnail-study/);
   [Artiphik, MrBeast analysis](https://artiphik.com/blog/mrbeast-thumbnail-analysis);
   [touhfa.art, MrBeast style](https://touhfa.art/blog/thumbnails/mrbeast-thumbnail-article/)
2. **A big, clearly emotional face, looking at the object of curiosity.** Faces appeared in 69% of breakout thumbnails, and
   in 80% of the top 50 (vidIQ). Gaze cueing is well established: viewers follow a face's gaze. In an ad study, a model who
   looks at the product sends viewers' eyes there sooner, and they stay longer. A model who looks at the camera holds
   attention on the face instead. [vidIQ](https://vidiq.com/research/youtube-thumbnail-study/);
   [gaze-cueing meta-analysis](https://www.researchgate.net/publication/358701907_Visual_Attentional_Orienting_by_Eye_Gaze_A_Meta-Analytic_Review_of_the_Gaze-Cueing_Effect);
   [Gaze cueing in ads (Wedel and Pieters, summarised)](https://ux-strategy.ch/en/effects/gaze-cueing-effect.html)
3. **0-3 words, and never the title.** 28% of breakout thumbnails had no text. Advice converges on 1-5 words because more
   is unreadable in the mobile feed. Kids' channels are also told to avoid small text, because young children cannot read
   it. The title and thumbnail should add to each other, not repeat. *Convention.*
   [vidIQ](https://vidiq.com/research/youtube-thumbnail-study/);
   [thumbnailcreator, simplicity and CTR](https://www.thumbnailcreator.com/blog/simplicity-impacts-thumbnail-click-through-rates);
   [miraflow, thumbnail rules](https://miraflow.ai/blog/rules-for-youtube-thumbnails)
4. **Strong contrast against YouTube's white and dark UI, with saturated complementary colours.** In a 2020 study, nearly
   9 in 10 popular thumbnails were colourful, and popular animation (e.g. Peppa Pig) used bold, bright backgrounds. Value
   contrast matters more than hue. Use 2-3 main colours, opposite on the wheel.
   [Digital Information World (2020 study)](https://www.digitalinformationworld.com/2020/10/the-perfect-thumbnail-is-key-to-youtube.html);
   [vidIQ design tips](https://vidiq.com/blog/post/youtube-thumbnail-design-tips/);
   [usevisuals](https://usevisuals.com/blog/youtube-thumbnail-design-best-practices)
5. **A curiosity gap: show the problem, not the answer, and make sure the film pays it off.** A misleading thumbnail loses
   watch time, and that is the measure Test & Compare uses.
   [ClickyApps](https://clickyapps.com/creator/thumbnails/guides/youtube-thumbnail-best-practices);
   [thumbnailpeak, Test & Compare](https://thumbnailpeak.com/blog/youtube-thumbnail-ab-testing)
6. **Readable at phone size (168x94).** Shrink it and check it in the feed. Do not put anything that matters in the
   bottom-right corner, where YouTube draws the duration.
   [vidIQ design tips](https://vidiq.com/blog/post/youtube-thumbnail-design-tips/);
   [YouMind, sizes and safe zones](https://youmind.com/blog/youtube-thumbnail-size-dimensions-and-safe-zones)
7. **A consistent series mark, with each episode visually distinct.** Keep one font and a logo in the same corner. Give
   each episode its own solid background colour (as WIRED does per series), so returning viewers spot the brand and still
   see that this is a new film. Pinkfong keeps a small brand mark in one corner.
   [Alici.AI](https://alici.ai/blog/how-to-make-youtube-thumbnails-best-practices-2026);
   [Thomas J. Frank](https://thomasjfrank.com/creator/youtube-thumbnail-design-the-ultimate-guide/);
   [Tuberanker examples (Pinkfong)](https://tuberanker.com/blog/thumbnail-examples)
8. **Kids' animation style: bright flat colour, bold outlines, exaggerated expressions.**
   [thumbnailcreator, cartoon style](https://www.thumbnailcreator.com/styles/cartoon);
   [SocialBee](https://socialbee.com/blog/how-to-make-a-thumbnail-for-youtube/)

**Test & Compare (YouTube Help).** You can upload up to 3 thumbnails per video in YouTube Studio. The winner is judged by
**watch-time share**, not click-through rate, and results take a few days to 2 weeks. If any thumbnail is below 720p, all
are shown at 480p, so keep them at 1280x720. Variants that look too alike take longer to decide or come out inconclusive,
so A and B here differ in subject and idea, not in small tweaks.
[YouTube Help: Test & compare thumbnails](https://support.google.com/youtube/answer/13861714);
[vidIQ on Test & Compare](https://vidiq.com/blog/post/youtube-launches-new-thumbnail-testing-tool/)

## The system used on all six
- **One colour per film:** 1 sunny yellow (against the purple fog), 2 sky blue (against the red-orange Dragon), 3 hot
  magenta (against a black sun with a gold corona). None is the dark navy/purple of film 4, or of the Station films.
- **One giant subject:** a cast sprite (`explained2/ep20/spr`) at about 1.05-1.3x, or the app's legendary Dragon sticker
  (`theoneapp/pets/zodiac-full/dragon-happy.png`, eyes closed, the pose the film's sleeping Guardian uses).
- **1-2 huge words:** Fredoka 700, white with gold accent, thick ink outline. They never repeat the title.
- **Brand mark:** a tiny dark "The**One**App" pill at the top-left (the films' end-card colours). The bottom-right is
  kept clear for the duration stamp.

## The variants
| File | Shows | Words | Why |
|---|---|---|---|
| `thumb1_v3a` | Giant shocked Pip, left, staring at a smoky purple fog wall (the film's spirals in it) swallowing a yellow world | IT'S COMING! | Threat plus reaction; fog is the problem, the fix is not shown |
| `thumb1_v3b` | Giant gasping Basil looking up at a wobbly tower of six batteries under a dead bulb | MORE?! | The film's own wrong guess ("More batteries!"). A science puzzle that parents like and kids find funny; the answer (an open circuit) is not shown |
| `thumb2_v3a` | The legendary Dragon, fast asleep, filling the right; Momo yelling at it, shout lines, Zzz | WAKE UP!! | Hero creature plus emotional face; "shouting won't wake them" is the gap |
| `thumb2_v3b` | All three Guardians asleep (Dragon huge in the middle, Unicorn and Robot at its sides), Zzz | HOW?! | The legendary trio as spectacle (the app's prize buddies); the question is how to wake them |
| `thumb3_v3a` | A black sun with a blazing corona; giant shocked Pip looking up at it | A CURSE?! | Momo's line in the film. Raises the mystery without showing the airship |
| `thumb3_v3b` | The black sun on the left; giant worried Basil looking up at it from the right | WHO DID IT? | Hints that something caused it, without saying what |

## Checks
- 1280x720, each under 250 KB (limit 2 MB). Review sheet and phone check: `sheet.jpg` and `small.jpg` (all six at 168x94
  beside film 4, on YouTube's white and dark UI) in the session scratchpad `promothumbs3/`, rebuilt by the script.
- At 168x94 every word is legible. Each film is a different colour, and none resembles film 4.

## Recommended
- Film 1: **B** (MORE?!). It is the clearest single idea and the most "science", and the battery tower reads at phone size.
  Run A against it in Test & Compare.
- Film 2: **A** (WAKE UP!!). It has a giant Dragon plus an emotional face; B is the spectacle alternative.
- Film 3: **A** (A CURSE?!). It is the cleanest of the six: one face, one object, two words.
