# TheOneApp for Primary 3: what each P3 video can link to

Read from the app repo, read-only:
- `origin/main` at `e59768d` (fetched 11 Oct 2026): `labs-p4.js`, `labs-review.js`, `lab.html`, `api/lab.js`, every `labs/p3-*/index.html` and `labs/spotsort/index.html`, `labs/BRIEF-P3.md`, `labs/briefs-p3/`, `mindmap.html`, `mindmap-cloud.js`, `mixups.js`, `misconceptions.js`, `science-kb.js`, `recite.html`, `syllabus-p3p5.js`, `syllabus-map.js` and `index.html`.
- `origin/claude/my-mind-map` at `f39193c` (PR not merged yet): `mymap.js`, `mymap-core.js`, and the changes it makes to `mindmap.html` and `index.html`.

The machine-readable list is in `labs_p3.json`, in this folder. It has one row per experiment. Each row holds the fields that were asked for (`code`, `folder`, `title`, `parts[{label, does}]`, `startButton`, `navPath`, `topic`), plus `status`, `visibleToPupils`, `benchName`, `aim`, `bigIdea`, the matching mind map, the narration line and the text for the lab card. Rebuild it with `node gen.mjs` (in `W/p3map/`) whenever the app changes.

---

## 0. Read this first

1. **The School Lab has 28 P3 experiments, but pupils can open only one of them today.** Only **1.1 "Spot and sort"** is `status: 'ready'`. The other 27 (1.2 to 7.2) are `status: 'review'`. `lab.html` shows "review" activities only in admin mode or adult mode (`adminDevice()`). For everyone else, they are filtered out of the list.
   **Rule for P3 videos:** a video names an experiment only once the teacher has signed it off, which switches its status to `'ready'` in `labs-p4.js`. Check the status again on the day the video is published (see section 7).
2. **The labs skip 3.4.** The textbook points to Activity Book 3.4 (whether a material floats or sinks). The app has no 3.4 brief, bench or "coming soon" line, so a video on float-or-sink has no lab to link to. The mind map poster "Diversity of Materials" does have a "Float or sink" branch.
3. **All 28 benches use the same start button: "Let's test it now!"** (`sim.label`), the same as P4.
4. **The Mind Lab has 4 P3 posters.** In the rail they read: **Living & Non-Living** `P3`, **Diversity of Materials** `P3`, **Life Cycles** `P3`, **Magnets** `P3`.
5. **"My mind map" is still on the unmerged branch.** Its chapter drop-down is built from the same `TOPICS` list (through `window.MindLab.topics`). The P3 options read "Living & Non-Living (P3)", "Diversity of Materials (P3)", "Life Cycles (P3)" and "Magnets (P3)". The P4 narration ("Tap Mind maps, then, Make my own mind map") depends on this PR being merged, so the P3 narration depends on it as well.
6. **Quiz Yourself has a P3 tab.** It holds 3 recitation chapters (Living and Non-Living Things, Materials, Life Cycles) and 2 mix-up chapters (Life Cycles, Magnets). It has **no Magnets recitation table**.

---

## 1. School Lab: how a pupil gets to a P3 experiment

**Ways in:**
- The **"School Lab"** button in the bottom bar of `index.html` (`<button id="nav-lab" title="School Lab">`).
- The lab building's door in the scenery.

Both call `window.enterLab()`, which zooms into `lab.html`. The lab is for members only: a pupil who is not signed in sees "Members sign in here." first.

**The list (`lab.html`, `renderList`):**
- The heading reads "Every experiment in the books."
- There is one folder per level, named **"Primary 3"**, "Primary 4", "Primary 5" and "Primary 6".
- The first level that has a ready experiment opens by itself. Today that is **Primary 3**, because of 1.1, so the P3 folder is open on arrival and P4 is folded away. The folder's summary line reads "1 ready".
- Inside the folder, each chapter shows the eyebrow **"Chapter N"** and then its title. Chapters are numbered in the order they first appear in `LABS`, so for P3 they match the activity codes 1 to 7.
- Each experiment shows its code (eyebrow), its title, and a badge: "Ready", "In review", "Coming soon" or "🔍 Badge earned". Below that is a line such as "Observation · about 25 minutes · runs in 3D".
- A pupil who is not an admin sees Chapter 1 with only 1.1 in it. Chapters 2 to 7 show their headings with nothing under them.

**One experiment (the console):**
1. The pupil taps the experiment.
2. The **Briefing** screen shows "The big idea", "What we are finding out", and the line "Predict first. The moment you make a prediction, **Let's test it now!** lights up and the 3D bench opens for that part."
3. The **Part A** screen has the eyebrow "Part A · predict, then test it on the bench" (1.1 says "Part A · think it through, then observe on the bench") and the part title as its heading.
4. On the step with the **Predict** question, the pupil taps an answer. A glowing blue **"Let's test it now!"** button then appears beside it.
5. That button opens the 3D bench for this part (`page?unlock=intro,<step>`).
6. A part's bench opens once that part's prediction has been made. When the badge is earned, everything opens.

**Inside a P3 bench** (the P3 lab engine, the same in every P3 lab):
- Pills: "Intro", "🧠 Before I Start", one pill per part (an emoji and the part name in Title Case, for example "🌱 Test the Bean Plant"), "🏆 Challenge" and "Wrap-up".
- The Intro has its own big button, such as "To the table →".
- A six-scene welcome tour plays the first time the bench opens.
- Each part earns a sticker, and the Challenge awards three stars.

**How the P4 videos said it** (`S/prep_all.py`):
- Narration, from `_lab()`: "… Open the School Lab, experiment **one point two**, and press, Let's test it now!"
  - For a code with a letter, say "experiment two point one A".
  - The `narration` field in `labs_p3.json` already has the full line for every code.
- The card on screen (`labcard.js`, `LAB[n] = (seg, word, code, title, part)`):
  - A purple header: "🧪 Try it yourself in TheOneApp"
  - **"School Lab › 1.2  The needs test"** (the title as it appears in the lab list)
  - **"Part (a): Test the bean plant"**
  - A button: **"Let's test it now! ▶"**
- Note: inside the app the parts are labelled "Part A", "Part B" and "Part C". The P4 cards used "Part (a): <part title>". `labs_p3.json` keeps the P4 style in `label` and gives the app's own wording in `appHeading`.
- The title on the card should be the **list title** (what the pupil taps), not the bench's own name. Several bench names differ from the list title:

  | Code | List title | Bench name |
  |---|---|---|
  | 3.6 | The light box | Torch Test Lab |
  | 6.2 | Magnet poles | Strongest Spot Lab |
  | 6.1A | Magnet pairs | Attract or Repel Lab |
  | 4.1 | Find my young | Young and Adult Lab |
  | 3.1 | What is it made of? | Made-Of Lab |

**Navigation path, written out** (the same for every row; only the chapter and the experiment change):

> Home → tap **School Lab** (bottom bar, `#nav-lab`) → `lab.html` → **Primary 3** folder → **Chapter N "<chapter>"** → tap **"<code>  <title>"** → Briefing → the part named in the video (Part A, B or C) → **Predict**: tap an answer → press **"Let's test it now!"** (the 3D bench opens for that part)

---

## 2. Every P3 experiment

Source: `labs-p4.js` (`SOON_P3` with `REVIEW` from `labs-review.js`, plus the full record for 1.1), and each bench's own `LAB` block.

- "Live?" shows what a pupil can see today.
- In each part, the first name is the P4-style card label and the name in brackets is the bench pill.
- "What the pupil does" is the bench's own task line, word for word.
- The start button is **"Let's test it now!"** on every row.
