# TheOneApp parent ads: copy to paste (drafted 24 Nov 2026)

For the teacher. Nothing here has been posted, uploaded or boosted. Every claim below is in the app or on theoneapp.sg (sources:
`ADS_NOTES.md` section 3). No testimonials, ratings, user numbers or exam results: there are none to quote, so none are used.

**Before you run any of it:** settle the "free" line (section 5). Until then, use the copy marked *(no trial wording)*.

## 1. Which file goes where

| File | Length | Use it for |
|---|---|---|
| `ad15_9x16.mp4` | 15.0 s | TikTok In-Feed; Instagram/Facebook **Reels** and **Stories** |
| `ad30_9x16.mp4` | 30.0 s | Instagram/Facebook **Reels**; TikTok, if you want the longer cut there too |
| `ad15_4x5.mp4` | 15.0 s | Facebook/Instagram **Feed** (short) |
| `ad30_4x5.mp4` | 30.0 s | Facebook/Instagram **Feed** (the full story: problem, three features, the fun, the CTA) |

In Meta Ads Manager, upload the 9:16 and the 4:5 of the same ad into one ad ("customise placements"), so Reels/Stories get the
9:16 and Feeds get the 4:5. Captions are burned in (sound-off safe); you do not need Meta's auto-captions.

## 2. Meta (Facebook and Instagram)

**Primary text, short** (the first 125 characters show before "See more"; both of these fit):
- 15 s ad: `Right idea, but still losing marks in Science? TheOneApp marks written answers the Singapore way.` (97)
- 30 s ad: `Knows the science, still losing marks? See how TheOneApp marks a written answer, hint first.` (92)

**Primary text, full** (paste under the short line, for "See more"):

> Right idea, but marks still missing in Science?
>
> In TheOneApp, your child writes the answer as they would on paper, and it is marked the way Singapore mark schemes do.
> A half-right answer gets a hint, not the answer. The full answer comes after the second try.
>
> • Primary 3 to 6 Science, MOE syllabus (2023)
> • Short videos, 3D simulations (Primary 3 and 4 now; Primary 5 and 6 coming), mind maps and quizzes
> • A Progress Report for you: what is strong, and the gaps to fix
> • Credits for the Gift Shop come only from finished work, never from money
>
> Built by a Singapore Primary Science teacher.
> **[pick one line from section 5]**

**Headline** (Feed shows about 27-40 characters):
- `Science answers marked the Singapore way` (40)
- `A hint first, not the answer` (28)
- `Try TheOneApp free` (18) *(trial wording: see section 5)*

**Description** (shown on some placements): `Primary 3–6 · MOE syllabus (2023)` (33)

**Call-to-action button:** `Learn More` (sends people to theoneapp.sg, where the real app runs on the page). Switch to `Sign Up` once
the members-only lock and the free trial are live.

**Website URL:** `https://theoneapp.sg` (add `?utm_source=meta&utm_medium=paid&utm_campaign=parents_launch` if you want to see the visits apart).

## 3. TikTok (In-Feed)

**Ad text** (max 100 characters; all fit):
- 15 s ad: `Right idea, but still losing marks in Science? P3–P6 answers, marked the Singapore way. Try it free.` (100)
- 30 s ad: `Knows the science, still losing marks? Hints first, a Progress Report for you. P3–P6. Try it free.` (98)
- *(no trial wording)*: `A hint first, not the answer. Primary Science answers marked the Singapore way.` (78)

**Display name:** TheOneApp. **Profile image:** the test-tube icon (`../film4/img/logo.png`).
**CTA button:** `Learn more` (later `Sign up`). **URL:** `https://theoneapp.sg` (`?utm_source=tiktok&utm_medium=paid&utm_campaign=parents_launch`).
**Sound:** the ads carry Heart's voice and Kampong Walk; leave TikTok's own music off.

## 4. Three hooks to A/B test (first 2 seconds)

Only hook A is rendered. To make B or C: change the first line in `script.py` (and its captions), delete `voice/h1.wav` / `voice/a1.wav`,
run `make_voice.py`, then `make_ad.py`. Change nothing else, so the test measures the hook alone.

| | Words on screen and spoken (2 s) | Picture | Why |
|---|---|---|---|
| **A** (rendered) | "Right idea… but still losing marks in Science?" | The app's real verdict: "Half the concept is there" | Names a pain Singapore parents know from open-ended questions; the product is on screen from frame 0 |
| **B** | "A hint first. Not the answer." | The real "Something to think about" hint card | Leads with what is different about the app (it does not give the answer away) |
| **C** | "Science homework battles at home?" | The pupil's answer being typed | Problem-first, about the evening routine rather than marks; softer, no claim about the child |

Keep every hook a question or a plain description. Do not tell the viewer something about their own child (Meta's personal-attributes
rule; see notes).

## 5. The "free" line: confirm before running

The ads end on **"Try it free at theoneapp.sg"**. Today that is true in one way: theoneapp.sg says *"Open to try today, no sign-up"*
(the member lock is off). The app's payment code also supports a **7-day free trial** on a subscription (`api/stripe-webhook.js`), but
the website's price section does not mention a trial, and I could not check the Stripe links. Pick one line for the copy:

1. While the app is open to all: `Try it free at theoneapp.sg: open on any phone, iPad or laptop, no sign-up.`
2. Once members-only with a trial: `7-day free trial, then S$9.99 a month or S$99 a year (launch price for those who join by 31 Dec 2026). Cancel before day 7 and you pay nothing.`
   *(only if both Stripe links really carry the 7-day trial, and the website says so too)*
3. If neither is true when the ads run: re-render without "free" (`script.py` h3 / a7: "Try it at theoneapp.sg") and use the *(no trial wording)* copy.

## 6. Targeting (suggestions only)

- **Location:** Singapore. **Age:** 25–54 (adults only). Never target or include under-18s: both platforms restrict ads for products aimed
  at children to adult audiences, and pupils are not the audience of these cuts.
- **Meta:** Advantage+ audience with age 25–54 as a hard limit, or detailed targeting as a *suggestion*: "Parents with children aged 8–12"
  (if Ads Manager still offers it in Singapore), interests such as Parenting, Primary education, Homeschooling, Science education.
  Languages: English.
- **TikTok:** ages 25–34, 35–44, 45–54; interest categories such as Education and Family/Parenting (TikTok's own list names vary).
- **Placements:** 9:16 to Reels, Stories and TikTok; 4:5 to Facebook and Instagram Feeds.
- **Times:** weekday evenings (homework time) are a reasonable first guess; let the platform learn after a week.
- **Comments:** keep an eye on them, and answer price or trial questions with the exact wording from theoneapp.sg.
