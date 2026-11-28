# TheOneApp parent ads: copy to paste (v2, 24 Nov 2026)

For the teacher. Nothing here has been posted, uploaded or boosted. Every claim below is in the app or on theoneapp.sg (sources:
`ADS_NOTES.md` section 3). No testimonials, ratings, user numbers or exam results are used: none exist to quote.

**v2 changes (the teacher, 24 Nov 2026):**
- The marking is described as "the way accepted in PSLE". This replaces "the Singapore way". It describes how answers are marked. It never says SEAB or MOE endorse the app, and it never promises a PSLE result.
- The member lock is on, so the offer is the **7-day free trial**: "7 days free, then S$9.99 a month or S$99 a year. Cancel any time."

**Wording rules for anything you add:**
- Say "marked the way answers are accepted in PSLE".
- Never say "PSLE-approved", "official", "by SEAB/MOE", "guaranteed", "score higher in PSLE" or "AL1".
- Keep "Not affiliated with SEAB or MOE" in the longer texts.

## 1. Which file goes where

| File | Length | Use it for |
|---|---|---|
| `ad15_9x16.mp4` | 15.0 s | TikTok In-Feed; Instagram/Facebook **Reels** and **Stories** |
| `ad30_9x16.mp4` | 30.0 s | Instagram/Facebook **Reels**; TikTok, if you want the longer cut there too |
| `ad15_4x5.mp4` | 15.0 s | Facebook/Instagram **Feed** (short) |
| `ad30_4x5.mp4` | 30.0 s | Facebook/Instagram **Feed** (the full story: problem, three features, the fun, the offer) |

In Meta Ads Manager, upload the 9:16 and the 4:5 of the same ad into one ad ("customise placements"). Reels and Stories then get the 9:16, and Feeds get the 4:5.
- Captions are burned in for sound-off viewing, so you do not need Meta's auto-captions.
- The end card reads "Try 7 days free · theoneapp.sg", with the terms underneath: "Then S$9.99 a month or S$99 a year. Cancel any time."

## 2. Meta (Facebook and Instagram)

**Primary text, short.** The first 125 characters show before "See more", and both of these fit:
- 15 s ad: `Right idea, but still losing marks in Science? TheOneApp marks answers the way PSLE accepts.` (92)
- 30 s ad: `Knows the science, still losing marks? See how TheOneApp marks an answer the way PSLE accepts.` (94)

**Primary text, full.** Paste this under the short line, for "See more":

> Right idea, but marks still missing in Science?
>
> In TheOneApp, your child writes the answer as they would on paper. It is marked the way answers are accepted in PSLE.
> A half-right answer gets a hint, not the answer. The full answer comes after the second try.
>
> • Primary 3 to 6 Science, MOE syllabus (2023)
> • Short videos, 3D simulations (Primary 3 and 4 now; Primary 5 and 6 coming), mind maps and quizzes
> • A Progress Report for you: what is strong, and the gaps to fix
> • Credits for the Gift Shop come only from finished work, never from money
>
> Built by a Singapore Primary Science teacher. Not affiliated with SEAB or MOE.
>
> **7 days free, then S$9.99 a month or S$99 a year. Cancel any time.**
> (Launch price for members who join by 31 Dec 2026. Cancel within the 7 days and you pay nothing.)

**Headline.** Feed shows about 27 to 40 characters:
- `Marked the way PSLE accepts` (27)
- `A hint first, not the answer` (28)
- `Try 7 days free` (15)

**Description.** Some placements show it: `Then S$9.99/month or S$99/year. Cancel any time.` (48). Alternative: `Primary 3–6 · MOE syllabus (2023)` (33).

**Call-to-action button:** `Sign Up`, because the trial starts with sign-up. Use `Learn More` if you would rather people see the website first.

**Website URL:** `https://theoneapp.sg`. To see these visits separately, use `https://theoneapp.sg/?utm_source=meta&utm_medium=paid&utm_campaign=parents_launch`.

## 3. TikTok (In-Feed)

**Ad text.** The limit is 100 characters, and all of these fit:
- 15 s ad: `Right idea, still losing marks? Answers marked the way PSLE accepts. 7 days free, then S$9.99/mo.` (97)
- 30 s ad: `Marked the way PSLE accepts, with a hint first. P3–P6 Science. 7 days free, cancel any time.` (92)
- Alternative: `A hint first, not the answer. P3–P6 Science, marked the way PSLE accepts. Try 7 days free.` (90)

The full trial terms (S$9.99 a month or S$99 a year, cancel any time) are on the end card. Repeat them on the landing page.

**Display name:** TheOneApp. **Profile image:** the test-tube icon (`../film4/img/logo.png`).

**CTA button:** `Sign up`. **URL:** `https://theoneapp.sg/?utm_source=tiktok&utm_medium=paid&utm_campaign=parents_launch`.

**Sound:** the ads carry Heart's voice and Kampong Walk, so leave TikTok's own music off.

## 4. Three hooks to A/B test (the first 2 seconds)

Only hook A is rendered. To make B or C:
1. Change the first line in `script.py` (the spoken text and its captions).
2. Delete `voice/h1.wav` or `voice/a1.wav`.
3. Run `make_voice.py`, then `make_ad.py`.

Change nothing else, so the test measures the hook alone.

| | Words on screen and spoken (2 s) | Picture | Why |
|---|---|---|---|
| **A** (rendered) | "Right idea… but still losing marks in Science?" | The app's real verdict: "Half the concept is there" | Names a problem Singapore parents know from open-ended questions. The product is on screen from frame 0 |
| **B** | "A hint first. Not the answer." | The real "Something to think about" hint card | Leads with what is different about the app: it does not give the answer away |
| **C** | "Marked the way PSLE accepts?" (spoken: "Is your child's answer written the way PSLE accepts?") | The pupil's answer being typed | Leads with the new PSLE wording as a question. It describes how marking works and promises no result |

Keep every hook a question or a plain description. Do not tell the viewer something about their own child (Meta's personal-attributes rule; see the notes). Never use "PSLE" with a promise ("ace PSLE", "PSLE-ready", "score AL1").

## 5. The offer

The ads and the copy use the trial as the teacher gave it, and as the website's price cards say ("7 Days Free First. Cancel in that week and you pay nothing"): **"7 days free, then S$9.99 a month or S$99 a year. Cancel any time."**

Check these two things on the day the ads go live:
- **The launch price.** S$9.99 a month and S$99 a year are the launch prices, for members who join by 31 Dec 2026. From 1 Jan 2027 the website says new members pay S$19.90 a month or S$199 a year. Any ad still running in January must change its price line, and the end card must be re-rendered (the price is in `make_ad.py`, `end_card`).
- **The website.** theoneapp.sg still shows "Open to try today, no sign-up", because `MEMBERS_ONLY = false` in the website's `index.html`. Its Join buttons need to be live too. Switch both on before the ads run, so the page matches the ad.

## 6. Targeting (suggestions only)

- **Location:** Singapore.
- **Age:** 25 to 54, adults only. Never target or include under-18s. Both platforms restrict ads for products aimed at children to adult audiences, and pupils are not the audience of these cuts.
- **Meta:** use Advantage+ audience with age 25 to 54 as a hard limit. Detailed targeting is only a suggestion:
  - "Parents with children aged 8–12", if Ads Manager still offers it in Singapore.
  - Interests such as Parenting, Primary education, Homeschooling and Science education.
  - Language: English.
- **TikTok:** ages 25–34, 35–44 and 45–54. Interest categories such as Education and Family/Parenting (TikTok's own list names vary).
- **Placements:** 9:16 goes to Reels, Stories and TikTok. 4:5 goes to the Facebook and Instagram Feeds.
- **Times:** weekday evenings (homework time) are a reasonable first guess. Let the platform learn for a week.
- **Comments:** answer price or trial questions with the exact wording from theoneapp.sg. Answer PSLE questions with the app's own line: "Marks can differ from school to school. Each school has its own marking scheme, and PSLE marking changes a little every year too."
