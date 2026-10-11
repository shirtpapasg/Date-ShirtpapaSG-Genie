# Primary 3 labs — the build brief for Claude Design

Drop this file, unchanged, into every Primary 3 lab project as its `CLAUDE.md`,
next to the `_ds/` bundle and `support.js` copied from any finished lab (2.1 to
2.4 all carry the same ones). Then write the lab's own notes file
(`<code>-<name>.md`, template at the end) and build.

Everything in the Primary 4 labs that a pupil recognises must be the same here:
the same place, a different experiment. What changes for Primary 3 is the size
of the words, the number of steps, and how much is done by tapping rather than
reading.

---

## 1. Who it is for

Eight- and nine-year-olds in their first year of Science. Most read slowly; some
read with difficulty. So:

- **Short sentences, one idea each.** Nothing over about twelve words on the bench.
  "Tap the magnet. Watch the paper clips." not "Observe what happens to the paper
  clips when the magnet is brought near."
- **Syllabus words only, and only the P3 ones**: living / non-living, grow,
  respond, reproduce, need air, water and food; classify, group, plant, animal,
  fungi, bacteria; flexible, strong, waterproof (say "does not let water through"),
  absorb (say "soaks up"), float, sink; seed, seedling, life cycle, egg, young,
  adult; magnet, attract, repel, magnetic, non-magnetic, north pole, south pole.
  Never: molecule, particle, force (as a noun on its own), energy, mass, volume,
  density, property (say "what it can do"), pupa unless the animal really has one.
- **Doing before reading.** Every part opens on something to tap, drag or watch
  within the first two taps. The reading sits beside it, not before it.
- **Three parts at most, twenty-five to thirty minutes.** Two parts is fine.
- **Numbers stay small and whole.** A count of paper clips, a number of days, a
  length in centimetres. No percentages, no decimals, no two-axis graphs. A bar
  chart of counts, or a strip of day-by-day pictures, is the P3 graph.
- **Pictures carry the meaning.** Every reading has a glyph; every part of the
  scene is labelled in words on the bench (LEAF, SEED, MAGNET) and its unit if it
  has one (cm, days).

## 2. What stays exactly as in the P4 labs (the contract)

The page is one self-contained Design Component: `index.html` (byte copy of the
`.dc.html` source), `<name>-scene.js`, `support.js`, `_ds/`. No build step,
everything relative, no network calls apart from Google Fonts (Nunito 400–900)
and three.js `0.184.0` via `await import('https://unpkg.com/three@0.184.0/build/three.module.js')`.
Nothing is saved anywhere. No sign-in, member check, password, PIN, "teacher
unlock" or hidden override anywhere in the page — the gate is added on
integration, from the app repo.

**Steps and pills.** `const STEPS = [ { id, label }, … ]` in the page script;
one pill per step, in that order, as the direct children of `<nav>`; `intro`
first, `quiz` (🏆 Challenge) and `done` (Wrap-up) last. Step ids are short
lower-case words; they are what the app's record points at.

**Locks.** The page reads `?unlock=` from its URL, a comma-separated list of
step ids. `intro` is always open, `all` opens everything, **no parameter opens
everything** (that is how a lab is previewed alone). Locked pills are greyed
(opacity .38, not-allowed cursor) with 🔒 before the label; `goStep()` refuses
and shows the amber line for 3 s: "That part is locked. Finish the steps for it
first, then come back."

**Predict first.** Every experiment step opens on the prediction panel (the
P4 `PRED_TEXT` shape: intro line, the question, two or three options, "Then test
it" list). The bench for that step is closed until an option is tapped. The
chosen option wears the rainbow ring.

**The scene.** A custom element named `<something-scene>` holding the three.js
canvas. Attributes in, events out: one `window` event every frame with the
readings, one for each cue (`tap`, `land`, `click`, `correct`, `wrong`, …), and
a pure model on `window.<name>Model` with no DOM and no three.js. The renderer
is made with `preserveDrawingBuffer: true`. Instruments face the opening
camera, large enough to read without orbiting.

**Readings.** The right column's expandable rows, as in 2.2–2.4: label on the
left, coloured value on the right, a note when opened. Keep `buildRows(stepId)`
returning `{ label, value }` for the step being tested — integration hands those
back to the steps page. A bar chart or a results table is wrapped in
`<div data-lab-graph data-lab-title="…" style="position: relative; padding-top: 24px;">`
so the app can enlarge it and carry it back; an empty cell is a dash.

**Sound, theme, celebration.** Web Audio cues through `cue()`; the music and
theme buttons in the header as in P4 (integration removes them and hands both
to the app's own bar — build them anyway so the page previews on its own).
Celebration overlay with confetti and the success sound at the end of the
challenge, then the big-idea card with "↺ Start again".

**The idle coach.** After about twenty seconds with nothing tapped, one short
line in the hint bubble that says what to tap next. Never a chat, never a
character, never a pet. **No pet, mascot or chat bubble inside a lab page** —
the app's buddy lives on the steps page.

**Look.** The Science Claw bundle in `_ds/` and nothing else: its Panel,
buttons, pills, colours (`#66ccff` info, `#5ee07a` right, `#ffb627` warm,
`#cd7bf5` compare, `#ff6a5e` heat/wrong). Colours are written for the dark;
light mode is the app's job, through the rules below.

## 3. No flicker (learnt on 2.3 — every rule holds)

1. **Never put `backdrop-filter` over the 3D bench.** Bench overlays (orbit chip,
   caption chip, meters, hint bubble) use a solid or near-solid fill such as
   `rgba(7,13,21,.92)`. `backdrop-filter` only on side-column panels.
2. **Never restart an animation on a box that re-renders.** Readings rows,
   tables and callouts have no entrance animation. One-shot animations
   (`clLand`, `clShake`, `clRise`) only on things that mount once: the
   celebration, the wrap-up card.
3. **`setState` from the per-frame event only when a shown value changes.**
4. **Glass fills use only the mapped alphas** — `rgba(7,13,21,.78 / .8 / .9 /
   .92 / .94)` and `rgba(4,7,12,.78)` — because light mode swaps exactly those.
5. **The bench never changes width while you work.** Side columns have a fixed
   `width`, `flex: none` and `scrollbar-gutter: stable`.
6. Every dark column fill (`#060b12`, `#04070c`) has its light-mode rule.

Check before hand-off: each step in dark and light for 20 s; the callout and
Back / Next while values change; the left column grown past the screen height;
Safari as well as Chrome.

## 4. What P3 needs that P4 did not

- **A "Show me" on every prediction panel** (👀): plays the first three seconds
  of the bench with nothing changed, then returns, so a child who cannot picture
  the set-up can still predict. It does not reveal the result.
- **Tap targets at least 48 px**, pills included.
- **Every card and every reading has a 🔊.** The app reads the steps page aloud
  already; on the bench, the caption chip is the one thing that must be readable
  aloud, so keep captions to one sentence.
- **Sorting and matching are drag-free.** Tap a thing, then tap where it goes.
  A wrong place bounces it back, with a soft *boing*, and a hint that points at
  the right one without naming it — a question, as 2.2's tray asks "Where does
  food go right after the mouth?" — never "Try the stomach". Nothing is ever
  dragged with a finger held down.
- **Life cycles are days, not stages named in Latin.** A slider or ▶ that moves
  the calendar; the pictures change; the reading says *Day 12 · seedling*. A
  frog is egg → tadpole → adult; a butterfly is egg → caterpillar → pupa →
  adult; a chicken is egg → chick → adult. Three stages unless there is a pupa.
- **Magnets attract or repel; nothing "pulls"** without the word attract beside
  it. Poles are north and south, coloured red and blue on the bench and named.

## 4b. Delight: what makes an eight-year-old lean in

The P4 labs are calm and clear. P3 keeps that and adds warmth, because a
child one year younger stays for the pleasure of it before they stay for the
science. Each of these is cheap to build and none of them is a mascot.

- **Cute animals, and every one makes a sound when tapped.** In the life
  science labs (1.x, 2.x, 4.x, 5.x) each creature is drawn friendly: big eyes,
  round body, soft colours, an idle motion (a blink, a tail wag, a bob) so it
  looks alive before anyone touches it. A tap gives its sound — a short, real
  one (a cluck, a croak, a chirp, a buzz, a purr, a yip, a baa, a moo) — and a small wiggle. Plants
  rustle; a seed goes *pop* when it starts to grow. The sound plays only on a
  tap, never on a timer, and follows the app's sound button. Name each sound
  as a cue in the notes file (`<name>-cue: cluck`) so it can be made once
  in Web Audio and shared.
- **A sticker for every part.** Finishing a part lands a sticker on a strip
  at the top of the bench (a paw, a leaf, a magnet). The strip fills up across
  the lab; the challenge turns the last one gold.
- **Things that react before they teach.** Tap the pond and it ripples; tap
  the sun and it brightens; a magnet held near clips makes them shiver before
  they jump. One idle reaction per scene, no purpose beyond delight.
- **Big, few, friendly controls.** One primary button per screen, 48 px or
  more, with a picture on it as well as words.
- **A path, not a list.** The steps show as footprints or stepping stones
  across the bottom rail, filled in as the child goes, so "how far to go" is
  a picture.
- **Three stars, not marks, on the bench.** The challenge shows stars; marks
  stay on the steps page where the app marks written answers.
- **Time you can turn.** Anything that takes days (a seed, a tadpole) has a
  dial the child turns; the sky brightens and dims with each day.
- **Say it, then see it.** Every caption chip on the bench has a 🔊 and is
  one short sentence, because many P3 pupils will listen rather than read.
- **Never**: a talking character, a countdown that hurries, a buzzer for a
  wrong answer (wrong is a soft *boing* and a bounce back), or anything that
  moves on its own near the thing being observed.

## 4c. The welcome tour: every lab shows a nine-year-old round before it starts

A P3 pupil must never meet the bench cold. The first time the page opens it
plays a short **tour**, unique to that lab, that shows what is on the bench,
where to tap first, what will happen, and where to look for the result. It is
the lab's own "let me show you", not a help page.

**The rule.** The tour plays once, by itself, when the page first opens (before
anything is tapped); the child can skip it at any moment with one big
"Skip ▸" and replay it any time from a 🎬 button in the header. Six scenes,
no more than 45 seconds in all, then "Your turn!" and the first thing to tap
wears the rainbow ring.

**A scene.** The page dims to `rgba(4,7,12,.72)` except a soft-edged spotlight
cut out over the real thing being shown (a pill, the creature on the bench, the
prediction options, the readings box, the Next button). A pointing hand 👆
glides to it and bobs twice as if tapping. A speech card sits beside the
spotlight: one line of **no more than twelve words**, 20 px or larger, in
plain words a nine-year-old reads for themselves. Nothing in the tour is read
aloud by the page (the teacher's decision, 3 October 2026). While the card is
up, the bench **does the thing being described** as a demonstration: the
creature wiggles and makes its sound, the dial turns one notch and back, the
readings row fills a little and empties again. The demonstration never reveals
a result the pupil is meant to find.

**The six scenes, in this order** (the words change per lab; the order never does):

1. **The bench.** "This is your bench. Drag it to look all round." The bench
   turns a quarter and comes back.
2. **The steps.** "These stepping stones are your steps. Tap one to go there."
   The stones light up one after another.
3. **Guess first.** "Each step starts with a guess. Tap the one you believe."
   The three prediction options wobble in turn.
4. **The lab's own thing** — the tap that makes this lab what it is. "Tap the
   frog. It croaks!" "Turn the day dial and watch the seed." "Hold the magnet
   near the clips." The bench demonstrates it once.
5. **Watch here.** "Your readings show up here. Watch them change." The
   readings box glows amber, and one row fills and empties.
6. **Move on.** "When a part is done, tap Next. Collect every sticker!" The
   sticker strip fills with one sticker and the Next button rings.

Then the card says **"Your turn!"**, the dim lifts, and the first thing to tap
(the Intro's big button) wears the rainbow ring.

**What makes it this lab's own.** Scenes 1, 4 and 5 name the lab's creature,
its control and its reading in the lab's own words; scene 4 is a demonstration
only this lab can give. The notes file lists all six lines under **The tour**
with, for each, what is spotlit and what the bench does during it.

**Never**: a talking character, more than one line per scene, a scene the child
cannot skip, a tour on every visit (once, then from the 🎬 button only — remember
with `sm-tour-<code>` in localStorage), or a demonstration that gives away the
answer to a prediction.

## 5. The P3 chapters and their folders

| Chapter (syllabus name) | Theme | Folder |
| --- | --- | --- |
| Diversity of Living and Non-living Things | Diversity | `labs/living/` |
| Classification of Living Things | Diversity | `labs/classify/` |
| Diversity of Materials | Diversity | `labs/materials/` |
| Life Cycles of Plants | Cycles | `labs/plant-cycle/` |
| Life Cycles of Animals | Cycles | `labs/animal-cycle/` |
| Properties of Magnets | Interactions | `labs/magnets/` |
| Making and Using Magnets | Interactions | `labs/make-magnet/` |

The lab's `code` is the activity book's chapter and activity number (as 2.1,
2.2 … are for Primary 4); the notes file names it. A second lab in the same
chapter takes a second folder (`labs/magnets-2/`).

## 6. Hand-off

One folder per lab: `index.html`, `<name>-scene.js`, `support.js`, `_ds/`, the
notes file. Nothing from `uploads/` or `.thumbnail/`. Before hand-off, search
the folder for *password, teacher, admin* and any school's name: none may
appear. Every word is ours — reworded from the activity book, never copied;
no character names or artwork from it.

On integration the app adds the member gate and `noindex`, removes the header's
music and theme buttons, sets `music: false`, hands the readings and graphs to
the steps page, writes the record with `status: 'review'` and switches it to
`'ready'` at the teacher's word.

---

## The notes file, per lab (template)

```markdown
# <code> <Name> Lab — build notes

<One sentence: what the lab shows.> Sibling of 2.4 Model Builder: same page
skeleton, locks, prediction panel, expandable readings, bench rail, idle
coaching, sound, celebration and big-idea card.

## Steps

| id | label |
| --- | --- |
| `intro` | Intro |
| `<a>` | <emoji> <Part A> |
| `<b>` | <emoji> <Part B> |
| `quiz` | 🏆 Challenge |
| `done` | Wrap-up |

### intro
Title, one paragraph, three bullet cards, orbit hint, primary button.
Second panel: What I already know / What I want to find out (chips, never saved).
Bench: <what is on the bench before anything is tapped>.

### <a> — <what the pupil does>
Prediction first: "<question in the pupil's words>"
<What is tapped, what happens, what bounces back with which hint.>
Readings: *<label>* · *<label>*.
Note: *<the one-sentence idea, in syllabus words>.*

### <b> — …

### quiz — Challenge
Five questions, options shuffled every visit. Each wrong option is one real
mix-up ("a magnet attracts everything made of metal").

### done — Wrap-up
Celebration, then the big-idea card: <three or four lines>.

## The model
`window.<name>Model`, pure: <functions and what they return>.

## The scene element
`<name-scene experiment="…" …></name-scene>` — attributes in; events out:
`<name>` every frame with { … }, `<name>-cue` for sounds.

## Readings
<What each row shows, and which rows have a bar.>

## The tour
Six scenes, in the fixed order (bench · steps · guess first · this lab's own tap · watch here · move on). For each: the line (twelve words or fewer), what is spotlit, what the bench does to demonstrate it.

## Locks
`?unlock=` list; `intro` always open; `all` opens everything; no parameter opens
everything. No password, PIN, teacher unlock or override anywhere in the page.
```
