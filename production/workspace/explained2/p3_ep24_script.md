# SCRIPT: TheOneApp, Explained (revamp) · P3 Episode 24 · Was that test fair? Change only one thing · Part 1 and Part 2

**Episode title (P3 plan row 24):** "Was that test fair? Change only one thing" · Ch 7 Making and Using Magnets, p. 118 (How do we conduct a fair test? Let's Think and Do: Designing investigations, the variables table) + Let's Apply Q1 and Q2(b), pp. 123-124 · NGSS 3-5-ETS1-3 · School Lab 7.2 "Create a toy", Part (b): Test and improve · the sixth episode of the Magnets theme (EP19 to EP25).
**Big idea (plan row 24, exact):** In a fair test only one variable is changed, the others are kept the same and one thing is measured; repeat for reliable results.
**The three goals (plan row 24, exact):** ❓ What an experiment does · "what an experiment is for" / ⚖️ What a fair test is · "what a fair test is" / 🔁 Why we repeat · "why scientists repeat a test".
**Status:** Autopilot (teacher, 20 and 22 Nov: full automation, quality first; 25 Nov: "Go ahead with all the rules, build episode 24, 25 ... I prefer the rhythm and music of episode 1 to 10. Do not use the Kampong Walk for new episodes."). **Version 1** (25 Nov 2026, Opus), written to `SERIES_FORMAT.md` as it stands on 25 Nov, every rule dated 21-25 Nov included: a voice within the first second; face close-ups only for a big feeling (none planned); smooth zooms (4-decimal camera values); the corrected buddy stays shy through the WHOLE fix; every leaf on a stem; what is gone fades out completely; nothing floats; labels joined to what they name; the one-job-per-pose table; the v2 cast; "Now you know!": all three cheer ON the words; no ghost buddies at scene changes; **buddies WATCH every demonstration** (turned and flipped towards the object; one buddy at most a scene gives a single 1 s wave, never on the teaching line; the watching paintings drop in by name when they exist); **everything that moves faces the way it moves** (§6x); **no picture plants a misconception**; **the ORIGINAL series music, never Kampong Walk.** `ep24/script.py` is written from the tables below word for word and becomes the source of every spoken word.
**The dare wording is in ONE place:** section 3, "The dare blocks". EP23's closing dare opens this episode word for word (checked against `ep23/script.py` `NEXT_DARE` and `NEXT_CARDS`).

## 0. The rhythm and the music of EP1 to EP10 (teacher, 25 Nov: "I prefer the rhythm and music of episode 1 to 10")

Measured on the rendered timelines (`epNN/tl_pN.json`) before writing:

| | EP1-EP10 (ep01, 02, 03, 05, 08, 10) | EP22-EP23 | **EP24 (this script)** |
|---|---|---|---|
| Spoken words per minute (whole part) | 105-117 | 125-136 | **about 110** (about 590-620 words a part, rituals included) |
| Share of the part with a voice | 68-75% | 79-81% | **about 70-72%**: longer pauses after every question and every new picture |
| Average scene length | 10-11 s (26-32 scenes) | 13 s (26 scenes) | **about 11 s** (about 30 scenes a part; something changes every 10-15 s) |
| Lock-in rings | 5 s every round (the Showdown 6 s) | 3 s for the dare round | **5 s every round, 6 s for the Showdown**; no 3 s ring |
| Mean pause after a line (`post`) | 0.6 s | 0.41 s | **0.6 s** (and a 1.0-1.5 s "think" wait after each question to the viewer) |
| Music | the series' own beds: the game groove (marimba, ukulele, claps, 104 BPM) under game scenes, the calm bed under teaching, the micro-world pad in the journey | Kampong Walk (EP22) / the original beds smoothed (EP23) | **the original beds (EP23's `song.js`, EP1's engine)**, smoothed: ONE bar clock per part (a bed that stops resumes on the beat), 0.8 s crossfades between beds and around every countdown; the groove stops for each countdown (only the ticks and the bell) and the chant; **the journey is QUIET**: no groove or calm bed from "Shrink down. Quietly." to the end of the pull-out, only the soft micro-world pad. **Never Kampong Walk, never `add_lofi.py`** (left commented out in `finish.sh`). |

## Overview

| | Part 1 | Part 2 |
|---|---|---|
| Title | Is Basil's Test FAIR? Change Only ONE Thing | Plan It, Test It, Count It AGAIN! Why Scientists Repeat |
| Length (estimated) | **about 5:30** (about 600 words) | **about 5:30** (about 610 words) |
| Its own goals (read aloud by a buddy) | What an experiment does · What a fair test is · Spot an unfair test (Momo) | Plan a fair test · Measure one thing · Why we repeat (Pip) |
| Key words on the shelf | VARIABLE · FAIR TEST · EXPERIMENT | PREDICTION · VARIABLE TO BE MEASURED · RELIABLE |
| Mark Sentences (each read by a buddy) | 2: 7.9 (Momo); 7.8a (Basil) | 2: 7.12's prediction (Pip); 7.11 (Basil) |
| Book sentences on cream strips, read by Heart | 7.10 (look-closer 1) | 7.12's table, read row by row as it fills (look-closer 1) |
| **[LOOK CLOSER]** | 2: two things changed (the kind of nail AND the number of turns: which one did it? VARIABLE / FAIR TEST) · make it fair (twenty turns each, the same battery, the same clips; only the nail is different: EXPERIMENT) | 2: our plan (the variables table fills: changed, kept the same, measured: VARIABLE TO BE MEASURED) · count it again (nine, eight, nine: close to each other: RELIABLE) |
| Game | Round 1, EP23's dare (1 point; Pip and Momo right: the Buddies score too) · HOLD ON! Momo's magnet race (the distance changed too; 1 point) | Round 1, Momo's plan X and Y (1 point; only Basil right: no Buddy point) · Showdown, Pip's plan card: "count the clips once" (2 points) |
| Be the thing | **Be a steel paper clip** in the tray between Basil's two nails: the iron nail with many turns pulls you up hard; the steel nail with few turns hardly pulls; was it the iron or the turns? you cannot tell (about 30 s) | **Be a steel paper clip, counted again and again**: the two-battery nail lifts you, a giant adult hand counts you onto the bench, back into the tray, up again: nine, eight, nine (about 30 s) |
| The chant | (none, as in every Part 1) | "Change?" → "Only one thing!" / "The others?" → "Kept the same!" / "Test it once?" → "No! Repeat it!" |
| Hidden animal | A little **woodlouse** (intro: in the shadow under the sink's edge; revealed under the cupboard door) | A little **sparrow** (intro: on the outside window ledge; revealed on the corridor railing outside the door) |
| Fun fact | Basil: a woodlouse is a cousin of crabs and prawns; in a fair test with a damp side and a dry side, woodlice crawl to the damp side | Pip: a sparrow's heart beats hundreds of times in one minute; scientists count it again and again to be sure |
| Opens with | Heart at 0.8 s over the cold open (the science room; Basil's two coiled nails over two trays), then EP23's dare word for word | A calm "Last time...": three pictures, one at a time, Heart from 0.3 s |
| Ends with | Momo: "I will test if more batteries make it stronger!"; "Will Momo's plan be fair? Find out in Part Two!" | The dare for EP25 (`{NEXT_DARE}`): Pip's fridge door swings shut and stays closed: what keeps it closed? |
| Scores | Round 1 1 : 1 · HOLD ON! 2 : 1 | Round 1 1 : 0 · Showdown 3 : 0 |

**Times** in the tables are estimates from EP23's measured syllable rates and the EP1-10 pauses above; Stage 1's real timelines replace them. Aim: 5:15-5:40 a part.

**Sources used:** `SERIES_FORMAT.md` (all, with every 21-25 Nov rule, §6x), `EXPLAINED_PLAYBOOK.md`, `STYLE_GUIDE.md`, `MOTION_GUIDE.md`, `PRONUNCIATION.md`, `success_examples.md`, `EP01_vs_EP04_NOTES.md`, `Plans/videos/P3-new/EP01_TEACHER_NOTES.md`; `p3_ep23_script.md` and `p3_ep22_script.md` (the model); `ep23/script.py` (`NEXT_DARE`, `NEXT_CARDS`, word for word) and `ep23/STATE.md`; the 2nd brain: `Plans/videos/P3-series-plan.md` rows 23 to 25, `Plans/videos/P3/briefs/ep24.md` (beats, misconceptions, the exam box, the quiz, realism) and `ep25.md` (for the dare), `Plans/videos/P3-definitions.md` rows 7.8a to 7.12 (the textbook's exact words, machine-checked against the book; `Reference/Textbooks-and-Sources.md` gives the book's Drive id). **The textbook itself was not opened** (not in the repository): every book sentence comes from the definitions file. No web check: facts are from established knowledge, each with how sure I am (section 3, "Facts to check").

---

## 1. How this episode follows the rulebook

| Rulebook item | Where it is in this episode |
|---|---|
| Two parts, each with its own goals, score and key-word recap | Part 1: what an experiment does, what a fair test is, spotting an unfair test (EP23's dare; Let's Apply Q1 and Q2(b)). Part 2: the book's own investigation (7.12): plan with the variables table, measure one thing, repeat for reliable results (7.11). Part 1 ends on Momo's plan ("Will it be fair?"), Part 2's Round 1. |
| One story spine | **A build-and-reveal: THE BEST HOOK for the mini crane** (EP23's Recycling Week crane, now in the science room). Part 1, Tuesday after school: Basil's nail race (iron or steel?) is not fair; the board **IRON OR STEEL? our fair test** fills (*Change:* the kind of nail ✓ · *Keep the same:* turns, battery, wire, clips ✓). Part 2, Wednesday after school: **OUR PLAN** (the book's variables table) fills row by row; the counts *9 · 8 · 9* and *5 · 6 · 5* go up; the crane gets two batteries: *READY!*. |
| 1c the chain of questions | Section 2. |
| LOOK CLOSER from the learner's seat (two per part) | Part 1: Basil's question ("my iron nail picked up the most clips; why is that not fair?") → two things changed, side by side, each difference in red → which one did it? we cannot tell (7.10) → VARIABLE, FAIR TEST → verdict TWO THINGS CHANGED: NOT FAIR; Basil's "How do I make it fair?" → twenty turns each, the same battery, wire and clips, dipped the same way → only the nail is different → EXPERIMENT → verdict ONLY ONE THING CHANGED: FAIR. Part 2: Pip's "so many things on the bench: how do we keep track?" → the table fills (changed / kept the same / measured) → VARIABLE TO BE MEASURED → verdict ONE CHANGED · THE REST THE SAME · ONE MEASURED; Momo's "Pip counted nine, then seven: which is right?" → three counts each, close to each other → RELIABLE → verdict COUNT A FEW TIMES. The panel is filled; the speaking buddy's face peeks in a lower corner and reacts, never over a label. |
| BE THE THING with the buddies riding along | Part 1: *You: a steel paper clip.* Part 2: *You: a steel paper clip, counted.* The three buddies ride along, shrunk, on the tray's rim, WATCHING the nails (turned and flipped towards them); one waves once at the viewer while nothing is being taught. The giant hands that lower the nails and count the clips are an adult's (four fingers and a thumb). |
| 1d Buddies teach | VARIABLE: Pip ("A variable is a thing that can change in a test, such as the kind of nail, or the number of turns!"); FAIR TEST: Momo ("A fair test is a test where we change only one thing, and keep all the other things the same, such as changing only the kind of nail!"); EXPERIMENT: Basil ("An experiment is a test that we plan and do to answer a question, such as: which nail makes a stronger electromagnet?"); PREDICTION: Basil ("A prediction is what we think will happen, such as: more batteries will make our electromagnet stronger!"); VARIABLE TO BE MEASURED: Momo ("The variable to be measured is the one thing we count or measure, such as the number of steel clips attracted!"); RELIABLE: **Pip** defines it (and **Basil** reads 7.11) ("Reliable means we can trust the results, because we get nearly the same results each time we repeat the test, such as nine, eight and nine clips!"). |
| Real Singapore place | **The school science room** (EP23 Part 2's room, `sets23.js` SR23: wooden benches, tall stools, the window onto the school garden and its tree, the sink, the bookshelf, the cupboard with the tray of AA batteries, the notice board, the old electric bell on the corridor wall). Part 1 Tuesday after school, Part 2 Wednesday after school (the window's light warmer). The class is getting ready for **Science Week**: a notice *SCIENCE WEEK: plan a fair test!* on the board. |
| Exam-exact | Mark Sentences 7.9, 7.8a, 7.12's prediction, 7.11; strip 7.10; the table 7.12 word for word ("Number of batteries"; "Type of batteries", "Type of steel clips", "Type of iron nail", "Number of turns of wire around the iron nail"; "Number of steel clips attracted"). P3 words only: *prediction, variable to be changed / kept the same / measured*; never "hypothesis", never "constant / changed / measured variable" (P4 names). 7.9's brackets are read as a pause: "only one thing, called a variable, is changed". |
| Nothing may teach a wrong idea | Wrong ideas are only a buddy's pick, plan or card line, answered within seconds: Basil (his own test is fair, iron wins), Momo (the magnet held close wins; her X / Y plan is fair), Pip (use a steel nail), Pip's card (count once and we are done). **Never said or drawn:** which nail, iron or steel, makes the stronger electromagnet (Basil's fair test is set up, never scored: see "Facts to check" 1); a count of clips for an unfair set-up presented as a result; "hypothesis". |
| Talking = a moving mouth; reactions follow the answer | `OUTCOMES` (section 3). Only a buddy who was right explains a right answer: Pip (VARIABLE) and Momo (FAIR TEST) in Part 1 Round 1's fix; Basil the HOLD ON! fix; Basil (PREDICTION) in Part 2 Round 1; Basil the Showdown. A wrong buddy speaks only to ask or to read their own card. |
| 23 Nov: the corrected buddy stays shy through the WHOLE fix | Part 1 Round 1: Basil oops from the answer to the end of `mark1` (look-closer 1 tests his test); Pip and Momo arms crossed. HOLD ON!: Momo oops to the end of `holdon`; Basil and Pip arms crossed. Part 2 Round 1: Momo and Pip oops to the end of `r1ans`; Basil arms crossed. Showdown: Pip oops to the end of `fix`; Basil and Momo arms crossed. |
| 25 Nov: buddies WATCH demonstrations | Every close-up demonstration (the cold open's dip, the look-closers' faces, the HOLD ON!'s race, the journeys' riders, the cliffhanger's set-up) turns the listening buddies towards the object (`watchO`: flip and lean; `buddy0` swaps in `<buddy>_watch_closed` / `_watch_ooh` automatically once those paintings are in `spr/`). One glance-and-wave at most a scene (Pip in the cold open on Heart's first words; Momo in journey 2 between counts); never on a teaching line. |
| 25 Nov: everything that moves faces the way it moves | Movers: the woodlouse and the sparrow (walk / hop facing their way; mirrored with a negative x-scale only), the clips (round, no facing). `FACES:` comments on each mover; `qa/facing_scan.js` before render. |
| 25 Nov: no science picture plants a misconception | The iron nail and the steel nail are drawn the same size and shape (the steel one a little bluer-grey, both labelled), so the picture never suggests one is "more magnetic" by its looks; the coils are drawn as neat side-by-side turns, the count in the label; Momo's and Pip's bar magnets are each ONE piece of metal end to end, red / blue paint only. |
| Full human sentences | Every fact, clue and verdict spoken as a sentence with its reason. Tags may stay short. |
| Hidden animal | Named first, then a buddy makes the search fun, then the rules. A new fair spot in every scene; never back at the intro spot. The reveal says where it was in the reveal scene, then a buddy's surprising TRUE fact linked to the episode (the woodlouse: the classic school fair test; the sparrow: counting again and again), then "Tell someone at home!". Neither hidden before. |
| Basil speaks most | Part 1: Basil 7 lines, Pip 4, Momo 7 (goal cards as one). Part 2: Basil 6, Pip 7 (goal cards as one), Momo 4. |
| "Say it with me!" spoken, 0.8 s, the same buddy reads | All four Mark Sentences, the chant, the ending. |
| Safety and care | *With an adult. Batteries only, never the wall socket.* · *Join it only for a moment: it can get hot.* · *We look, and we do not touch.* (the woodlouse, the sparrow) |

**Rules bent:** (1) Part 1 has no Showdown or chant and Part 2 no HOLD ON! (as EP3 to EP23). (2) Part 2's journey comes after the Showdown (it is the repeat that look-closer 2 explains). (3) Basil's fair iron-or-steel test is set up but its result is never shown (section 3, "Facts to check" 1).

## 2. The chain of questions, the spine and the split

1. *EP23's dare:* Basil coils twenty-five turns round an iron nail and eight round a steel nail. Is his test fair? → (Basil: yes, his iron nail picked up the most clips; Pip: no, maybe the turns did it; Momo: no, he changed the nail AND the turns.)
2. *Be a steel paper clip:* → the iron nail with many turns pulls you up hard; the steel nail with few turns hardly pulls. Was it the iron, or the turns? You cannot tell. **Answer: 2, no.** Pip: VARIABLE.
3. *Basil: "my iron nail picked up the most clips. Why is that not fair?"* → **two things changed; we cannot be sure which variable explains the result (7.10).** Momo: FAIR TEST. Mark Sentence 7.9.
4. *Momo: "my magnet picked up more pins than Pip's, so mine is stronger!"* (HOLD ON!, Let's Apply Q1) → **she held hers close and Pip held his far: the distance changed too. Same height, same pins.**
5. *Basil: "How do I make my test fair?"* → **twenty turns each, the same battery, wire and clips, dipped the same way: only the nail is different.** That is an experiment: EXPERIMENT; Mark Sentence 7.8a.
6. *Momo: "I will test if more batteries make it stronger!"* → Part 2: is her plan fair?
7. *Momo's plan: X one battery and ten turns, Y two batteries and twenty turns. Fair?* (Round 1) → **No: two things changed. Keep the turns the same; change only the batteries.** Basil: PREDICTION.
8. *Pip: "So many things on the bench: how do we keep track?"* → **the plan table: change one, keep the rest the same, measure one (7.12).** Momo: VARIABLE TO BE MEASURED. Mark Sentence: the prediction.
9. *Pip's card: "count the clips once, and we are done!"* (Showdown) → **No: repeat the test a few times.** *Be a steel clip, counted again and again* → *Momo: "Pip counted nine, then seven. Which is right?"* → **nine, eight, nine: close to each other: reliable (7.11).** One battery: five, six, five. Our prediction was right. → the dare: the fridge door (EP25).

**The spine:** a build-and-reveal. The mini crane needs the best hook and a fair way to choose it. Part 1: a fair test (one changed, the rest the same). Part 2: a plan, one thing measured, repeats; the crane gets two batteries: *READY!*.

**Why the split is here:** the plan row's three goals and the book's page. Part 1: what an experiment does and what a fair test is (7.8a, 7.9, 7.10), with both Let's Apply questions. Part 2: the book's own table (7.12) and repeating (7.11).

## 3. Cast, the game and the conventions

- **Heart** narrates (Kokoro af_heart, speed 0.90; 0.85 and softer in the journeys and every [LOOK CLOSER]). Never says a wrong idea. Never reads a goal card or a Mark Sentence card. Reads the 7.10 strip and the table rows.
- **Pip** (grey, careful: right in Part 1's dare and HOLD ON!; teaches VARIABLE and RELIABLE; in Part 2 he picks "use a steel nail" and his plan card says "count once"), **Basil** (teal, bold, funny: his own nail race is unfair; he fixes the HOLD ON!, teaches EXPERIMENT and PREDICTION, spots the Showdown's mistake; the most lines), **Momo** (coral, curious: right in the dare; teaches FAIR TEST and VARIABLE TO BE MEASURED; her magnet race and her X / Y plan go wrong). v2 cast, no aura discs, big, in the scene; Basil at 0.88 height (SIZE_K).
- **Every pose has a reason** (SERIES_FORMAT 23 Nov). Cheers per part: Part 1: Pip (VARIABLE, about 2:15), Momo (FAIR TEST, about 2:55), Basil (EXPERIMENT, about 4:35); Part 2: Basil (PREDICTION, about 1:20), Momo (VARIABLE TO BE MEASURED, about 2:20), Pip (RELIABLE, about 4:15); Mark Sentences end with a big smile and a nod. Nobody cheers in a scene where their own mistake is being corrected.
- **The game:** cream answer cards with big numbers (ONE set per lock-in); fingers 1, 2, 3; arms crossed for HOLD ON!; one finger per point. The Buddies score on a lock-in when two of the three are right for the right reason; nothing in HOLD ON! or a Showdown built on a buddy's mistake.
- **OUTCOMES (lib.js):**

  | Part | Reveal | Right (arms crossed) | Wrong (oops) |
  |---|---|---|---|
  | 1 | Round 1, EP23's dare (answer 2, not fair) | Pip, Momo | Basil, to the end of `mark1` |
  | 1 | HOLD ON! (Momo's magnet race) | Basil, Pip | Momo, to the end of `holdon` |
  | 2 | Round 1, Momo's plan X / Y (answer 2, no, two things changed) | Basil | Momo (1), Pip (3), to the end of `r1ans` |
  | 2 | Showdown, Pip's card (answer line 3) | Basil, Momo | Pip, to the end of `fix` |

- **Colours:** the two dare cards (EP23's `ep23dare.js`, unchanged); the CHANGED things in red outline and red tags, the SAME things in green (the table's rows: *changed* green-teal #06D6A0 header, *kept the same* blue #3A86FF, *measured* gold #FFD166, the brief's colours); the iron nail grey with a flat round head; the steel nail the same size, a slightly bluer, shinier grey with a flat head, tagged *steel nail*; the orange-red wire in neat turns; AA batteries in black holders; steel paper clips silver.
- **The dare blocks (the ONLY place the dares are worded).**

  **Block A: EP23's dare** (`ep23/script.py` `NEXT_DARE`: "Next time: Basil tests which makes a stronger electromagnet, an iron nail or a steel nail. He coils twenty-five turns round the iron nail, but only eight turns round the steel nail. Is his test fair? One, yes. Two, no. Lock in your answer!"), spoken without "Next time:" and "Lock in your answer!" (EP14's convention; `ep24/script.py` asserts the match).

  | Name | Kind | Words |
  |---|---|---|
  | `{DARE_Q}` | Heart (m102 + m103) | "Basil tests which makes a stronger electromagnet, an iron nail or a steel nail. He coils twenty-five turns round the iron nail, but only eight turns round the steel nail. Is his test fair?" · "One, yes. Two, no." |
  | `{DARE_CARDS}` | on screen (EP23's cards from `ep23dare.js`, unchanged) | **1 Yes** · **2 No** |
  | `{DARE_LABEL}` | on screen | *Is Basil's test fair?* |
  | `{DARE_CLUES}` | on screen (on top of the ring) | *iron nail · 25 turns* · *steel nail · 8 turns* · *one battery each* |

  **Block B: the dare into EP25** (plan row 25, "Magnets are everywhere"; the book's 7.12a fridge sentence; EP25's answer 2, a strip of magnet).

  | Name | Kind | Words |
  |---|---|---|
  | `{NEXT_DARE}` | Heart | "Next time: Pip pushes his fridge door gently. It swings shut by itself, and stays closed. There is no lock and no catch. What keeps it closed? One, the cold air inside. Two, a strip of magnet. Three, sticky glue. Lock in your answer!" |
  | `{NEXT_CARDS}` | on screen | **1 The cold air inside** (a fridge door with blue cold puffs) · **2 A strip of magnet** (the door's soft edge, a red-and-blue strip drawn small inside it, a "?") · **3 Sticky glue** (a glue bottle by the door's edge); one fridge drawn the same on all three cards |
  | `{NEXT_JOKE}` | Basil (cut for length) | "My fridge has a lock. It's called my mum!" |

  Keep the cards in one helper (`ep24dare.js`) so EP25 copies them unchanged.
- **The boards** (HOME positions, never jump): **IRON OR STEEL? our fair test** (Part 1; the whiteboard on its stand on the bench, centre right, where EP23's HOW STRONG? stood): *Change:* ☐ · *Keep the same:* ☐ ☐ ☐ ☐ (filled with ticks in look-closer 2: *the kind of nail* / *20 turns · 1 battery · same wire · same clips*). **OUR PLAN** (Part 2; the same stand): the book's table, three coloured rows, filled in look-closer 1; under it *Our counts:* *2 batteries: 9 · 8 · 9* and *1 battery: 5 · 6 · 5* (look-closer 2); *READY!* at the end.
- **Realism:** two NEW nails of the same length from the same bag (iron, steel), the same wire, the same AA batteries and holders; 25 turns is a long neat coil (two layers), 8 turns a short one; the tips dip into two identical trays of steel paper clips. Magnet race (HOLD ON!): two bar magnets of the same size (red N half, blue S half), two identical trays of steel pins; Momo's held just above her tray, Pip's held high above his; the fix: a ruler stands between them and both are held at the same height. In Part 2 the counts are written on the board as the clips are counted off the nail onto the bench (a giant adult hand in the journey; Basil's paw slides them in the set, never code-drawn paws). *Join it only for a moment.*
- **The hidden animals:** **the woodlouse** (Part 1): a grey-brown woodlouse (pill bug), small (a fingernail), an oval body of overlapping plates, seven pairs of short legs rippling, two short feelers, big friendly eyes with a highlight; it walks slowly (faces its way), and at the reveal rolls into a ball for a moment, then unrolls. Spots: intro in the shadow under the sink's edge; then the foot of the cupboard, the bottom of the bookshelf, a stool's foot, the base of the notice board's stand, by the bin; revealed under the cupboard door. **The sparrow** (Part 2): a Eurasian tree sparrow (the common Singapore sparrow: chestnut cap, a black cheek spot on a white cheek, a little black bib, brown streaked back), small; it hops (faces its way), pecks, tilts its head. Spots: intro on the outside window ledge; then the tree's branch outside, the top of the open window, the door's top frame, the corridor railing seen through the door; revealed on the corridor railing outside the door.
- **Facts to check (no web check; how sure I am):**
  1. **Iron nail or steel nail, which makes a stronger electromagnet?** For a hardened steel nail against a soft iron nail, the iron one usually attracts more clips (soft iron is easier to magnetise); but shop "iron nails" are mostly mild steel and results vary. The book does not give a result. **So the episode never says or shows which wins**: Basil's fair set-up is shown and the board says *Now it's fair: let's test!*; Part 2 moves to the book's own investigation (batteries), whose result the book states. (very sure this is the safe choice)
  2. **25 turns versus 8 turns, iron versus steel, is not fair** (Let's Apply Q2(b)'s hint: the number of turns must be the same): very sure. "We cannot tell which one made the difference" = 7.10.
  3. **The magnet race** (Let's Apply Q1): a magnet held closer to the pins attracts more of them; the magnets must be held at the same distance above identical trays: very sure.
  4. **More batteries in a row, same coil: more clips** (7.7, EP23): very sure. **The counts** *9, 8, 9* (two batteries) and *5, 6, 5* (one battery), twenty turns, small steel paper clips: illustrative, plausible for a nail electromagnet (about 80% sure of the size; the board says *Our counts*, never a rule). "A clip may slip off, or we may count too fast" (why one count can trick us): very sure.
  5. **The woodlouse:** woodlice are crustaceans, related to crabs and prawns (very sure); pill bugs roll into a ball (very sure; common in Singapore gardens: about 90% sure of the species seen); the classic school "choice chamber" fair test, damp side and dry side with everything else the same: woodlice gather on the damp side (very sure).
  6. **The sparrow:** the Eurasian tree sparrow is Singapore's common sparrow (very sure); a sparrow's heart beats several hundred times a minute at rest, many more in flight (very sure of "hundreds"; a child's resting heart beats about 70 to 100 times); measured again and again by scientists (true of any such measurement). Spoken as "hundreds of times in one minute", no exact number.
  7. **The fridge (the dare):** a fridge door's soft edge (the gasket) has a magnetic strip inside that is attracted to the steel body and keeps the door closed (7.12a; very sure). "Swings shut by itself": many fridge doors close themselves from a small angle (hinges / a slight tilt); the magnet holds them closed (very sure).

---

## 4. PART 1 · "Is Basil's Test FAIR? Change Only ONE Thing" · about 5:30

| Segment | Time | Length |
|---|---|---|
| 1 · Cold open, Heart from 0.8 s: EP23's dare word for word, and the title | 0:00-0:25 | 25 s |
| 2 · Today: the best hook, and the hidden woodlouse | 0:25-0:50 | 25 s |
| 3 · Today's goals (Momo reads) and the countdown | 0:50-1:01 | 11 s |
| 4 · Round 1: EP23's dare (5 s ring) | 1:01-1:33 | 32 s |
| 5 · BE A STEEL PAPER CLIP (the journey) | 1:33-2:06 | 33 s |
| 6 · The answer: not fair; VARIABLE | 2:06-2:24 | 18 s |
| 7 · Two things changed [LOOK CLOSER]: 7.10; FAIR TEST; Mark Sentence 1 (7.9) | 2:24-3:22 | 58 s |
| 8 · HOLD ON! Momo's magnet race | 3:22-4:04 | 42 s |
| 9 · Make it fair [LOOK CLOSER]: EXPERIMENT; Mark Sentence 2 (7.8a) | 4:04-4:52 | 48 s |
| 10 · Score hand, the woodlouse and its fun fact, the key words | 4:52-5:16 | 24 s (+ the key words) |
| 11 · The cliffhanger: Momo's plan | 5:16-5:24 | 8 s |
| 12 · "Now you know!" and the outro | 5:24-5:36 | 12 s |

### Segment 1 · Cold open (0:00-0:25)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 0:00.0 | **`cold`** THE SCHOOL SCIENCE ROOM, Tuesday after school (SR23: benches, stools, the window onto the garden and its tree, the sink, the bookshelf, the notice board with *SCIENCE WEEK: plan a fair test!*; ceiling fans turning). On the bench: the board **IRON OR STEEL? our fair test** (empty boxes), the mini crane from EP23 with an empty hook, two trays of steel clips, two battery holders, Basil's two coiled nails: an **iron nail with a long coil (25 turns)** and a **steel nail with a short coil (8 turns)**, each tagged. Basil dips both tips into their trays at once (`dip0`, on "steel nail"): a big bunch of clips on the iron nail, a small one on the steel nail. Place card *A school science room, Singapore · Tuesday after school* (0.2-7 s). Small print *With an adult. Batteries only, never the wall socket.* *Frame:* Basil big at the left with the two nails; Momo big at the right; Pip mid-ground. *Camera:* one slow push towards the two tips (no cut). *Hidden animal:* woodlouse in the shadow under the sink's edge (intro spot). Buddies: Pip turns to the viewer with a single wave on Heart's first words (hello), then watches the nails; Momo watches (turned towards the nails). | Heart: "Last time, we asked:" *(0.8 s)* | The science room: fans, the garden's birds through the window, a far school bell; a soft clink and tinkle as the clips jump. **The calm bed** fades in under Heart. | A voice within the first second; the dare is in the picture while Heart reads it. |
| 0:02.4 | *The room stays on screen under the dare's first sentence (it describes what the picture shows).* | Heart: "Basil tests which makes a stronger electromagnet, an iron nail or a steel nail. He coils twenty-five turns round the iron nail, but only eight turns round the steel nail. Is his test fair?" |  |  |
| 0:14.0 | **`lasttime`** (0.3 s before "Is"): EP23's two cards (`ep23dare.js`), each steps forward as Heart says it; the label *Is Basil's test fair?*; the room blurred behind. | Heart: "One, yes. Two, no." | A pluck and a soft pop per card. |  |
| 0:20.5 | **`back`** The bench: Basil holding both nails up, proud. Pill *Hold on to your answer!* *Basil a proud hop; Momo watches the nails; Pip covers his eyes for a second (fun suspense, a small hop).* | Heart: "Hold on to your answer!" |  |  |
| 0:22.5 | **`title`** **IS IT FAIR?** (white) **CHANGE ONE THING!** (sun yellow). | (nobody) | The title's slam. |  |

### Segment 2 · Today: the best hook, and the hidden woodlouse (0:25-0:50)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 0:25.0 | **`today`** The camera glides to the mini crane's empty hook, then to the board (HOME). *Basil talking, pointing at the hook (showing it).* | Basil: "Our mini crane needs the strongest hook. So I am testing an iron nail and a steel nail!" | A two-note sting on the board. | The story's problem: choose a hook, fairly. |
| 0:31.5 | *Momo talking, pointing at the big bunch on the iron nail (showing it); the others watch the nails.* | Momo: "Your iron nail picked up a lot more clips, Basil!" |  |  |
| 0:35.5 | **`game`** (`gameScene`): one smooth push-in onto the woodlouse under the sink's edge; the black-ringed circle on the blue stage; *a little woodlouse* · *Can you spot it?*; small print *We look, and we do not touch.* *Pip surprised on "woodlouse" (the animal named).* | Heart: "A little woodlouse is hiding in this video. Can you spot it?" | A whoosh; a tiny patter of legs. |  |
| 0:41.0 | *Momo talking, pointing low (showing where).* | Pip: "Woodlice love dark, damp corners. Look low!" |  |  |
| 0:44.0 | *Basil waves on "Buddies" (hello to the game).* | Heart: "You against the Buddies! Lock in first with your fingers. One finger for every point." | **The game groove** comes in (crossfade 0.8 s). |  |

### Segment 3 · Today's goals (Momo reads) and the countdown (0:50-1:01)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 0:50.5 | **`goals`** (`goals3`): **What an experiment does** · **What a fair test is** · **Spot an unfair test**. *Momo big, talking; pointing at card 1.* | Momo: "Today you'll learn:" · "What an experiment does." · "What a fair test is." · "How to spot an unfair test." | A pop per card; drums; a cymbal on Go. | Momo's turn (Basil read EP23 Part 1, Pip EP23 Part 2). The first two are the plan row's own labels. |
| 0:57.0 | **`count`** | Heart: "Are you ready? Three! Two! One! Go!" |  |  |

### Segment 4 · Round 1: EP23's dare (1:01-1:33)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 1:01.0 | **`r1card`** ROUND 1 · YOUR ANSWER FROM LAST TIME. | (nobody) | The groove fades to silent under the ring (0.8 s): only the ticks speeding up, the bell, LOCKED IN!; the groove returns softly after the stamp. | Each pick is a real child's idea. |
| 1:02.5 | **`r1`** (`lockN`): ONE set of two numbered picture cards (1 *Yes* · 2 *No*, EP23's pictures); the ring's picture INSIDE the frame: the two coiled nails side by side over their trays, the long coil and the short coil obvious; clue labels ON TOP: *iron nail · 25 turns* · *steel nail · 8 turns* · *one battery each*; the 5 s ring. *Basil worried in the ring (before the answer).* | Heart: "Round one! Is Basil's test fair? One, yes. Two, no. Show me your fingers!" |  |  |
| 1:16.0 |  | Heart: "Locked in!" |  |  |
| 1:17.5 | *Basil talking, a bold hop (his pick).* | Basil: "One! It's my test, and my iron nail picked up the most clips. Iron wins!" |  |  |
| 1:22.5 | *Pip talking, pointing at the long coil (showing it).* | Pip: "Two. The iron nail has many more turns of wire. Maybe the turns did it." |  |  |
| 1:27.5 | *Momo talking, pointing at each nail in turn.* | Momo: "Two. Basil changed the nail, and he changed the turns too." |  |  |

### Segment 5 · BE A STEEL PAPER CLIP (1:33-2:06)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 1:33.0 | **`waitw`** Pill **Be a steel paper clip!**; one glide down to the two trays. Shelf aside. *The buddies wave, then shrink (a pop each).* | Heart: "Be a steel paper clip! Shrink down. Quietly." | The groove and the calm bed fade OUT (1.2 s) before "Shrink down"; silence but the room's hush. | The journey is quiet (teacher, 25 Nov; EP1-10's first journeys). |
| 1:37.5 | **`shrink`** *You: a steel paper clip* tag. First person: you lie among silver clips in a wide tray (a field of loops); far above, two giant nails hang side by side: the iron nail wrapped in a thick coil of many turns, the steel nail with a short coil of a few turns, each with its tag. `jmany`: the camera looks up at the long coil. `jpull`: a soft gold shimmer at the iron nail's tip; you rise and cling to it with many clips (the view lifts). `jweak`: across the gap the steel nail's tip: only two or three clips. `jwonder`: two thought tags appear, *the iron?* and *the turns?*, a "?" between them. *Riders: the three buddies, shrunk, on the tray's rim, turned towards the nails (watching); Basil surprised at `jweak` (a real surprise); Momo nods at `jwonder`.* | Heart: "You are a steel paper clip, lying in a tray. Above you hangs Basil's iron nail, wrapped in many, many turns of wire." | **The micro-world pad** alone, soft; a deep hum at this size; a tinkle as the clips rise; a soft shimmer. |  |
| 1:47.5 |  | Heart: "It pulls you up, hard! You cling to its tip with lots of other clips. Over there, the steel nail has only a few turns. Its pull is weak." |  |  |
| 1:57.5 |  | Heart: "But you wonder. Was it the iron that pulled you? Or all those turns? You cannot tell!" |  |  |

### Segment 6 · The answer: not fair; VARIABLE (2:06-2:24)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 2:06.0 | **`pullout`** Whoosh out to the bench, normal size (0.6 s); the buddies already where `answer` has them (no ghosts). | (nobody) | A sting; the calm bed back in (1.5 s). |  |
| 2:07.0 | **`answer`** The bench and the board (HOME); the two dare cards small on top: card 2 the green tick (`ansglow`), an x chip on card 1. Coins: YOU +1, BUDDIES +1. *Pip and Momo arms crossed (right); Basil oops (wrong) to the end of `mark1`.* | Heart: "The answer is two: Basil's test is not fair! Did you show two fingers? Put one finger up!" |  | Pip, right for the right reason, names the idea in his words. |
| 2:13.5 | *Pip talking, pointing at the nail tags, then the coils; VARIABLE pops with a line to the two tags; Pip cheer at the end (a key word learnt).* | Pip: "A variable is a thing that can change in a test, such as the kind of nail, or the number of turns!" | The key-word chime. |  |

### Segment 7 · Two things changed [LOOK CLOSER]; FAIR TEST; Mark Sentence 1 (2:24-3:22)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 2:24.0 | **`lc1q`** The bench. *Basil talking (a question: a wrong buddy may ask), shy, pointing at his iron nail's bunch.* | Basil: "But my iron nail picked up the most clips. Why is that not fair?" | LOOK CLOSER: a soft whoosh in; the calm bed low. |  |
| 2:29.5 | **`lcunfair`** [LOOK CLOSER] (`lookCloser`): the two set-ups BIG side by side, filling the panel. `kind`: the nails' tags glow red, *iron nail* / *steel nail*, a red line between them *different!*; `turns`: the coils glow red, *25 turns* / *8 turns*, *different!*; `same`: the batteries and the trays tick green *the same*; `which`: over the big bunch, two arrows from the two red differences meet at a "?" (*the iron? the turns?*). Basil's face peeks in the lower left (shy; thinking at `which`). Then the cream strip 7.10. | Heart: "Look closer. Basil changed two things. The kind of nail is different. And the number of turns is different too." | A soft tick for each green "same", a low two-note for each red "different". |  |
| 2:38.0 |  | Heart: "The iron nail attracts more clips. Was it because of the iron? Or because of the twenty-five turns? We cannot be sure." |  |  |
| 2:46.0 | Cream strip (Heart reads, exact 7.10). | Heart: "If the experiment is not fair, we will not be sure which variable can explain the results." |  |  |
| 2:53.5 | *Momo's face peeks in the lower right (right: confident); talking; FAIR TEST pops with a line to a small picture of two set-ups with only the nail different; Momo cheer at the end (a key word learnt). Basil still shy.* | Momo: "A fair test is a test where we change only one thing, and keep all the other things the same, such as changing only the kind of nail!" | The chime. |  |
| 3:03.0 | Verdict **TWO THINGS CHANGED: NOT FAIR** (held 2.5 s). |  | The stamp + a chime. |  |
| 3:06.0 | **`mark1`** (`markScene`): Momo, "Say it with me!", 0.8 s, reads 7.9; header *A fair test*; highlights *only one thing*, *a variable*, *kept the same*. Under the card: the two fair set-ups, one red tag (the nail), the rest green. *Momo pointing at the viewer (inviting); a big smile and a nod after; Basil shy to the end.* | Momo: "Say it with me!" · "To conduct a fair test, scientists need to ensure that only one thing, called a variable, is changed. The other variables are kept the same." *(book, exact: 7.9)* |  |  |

### Segment 8 · HOLD ON! Momo's magnet race (3:22-4:04)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 3:22.0 | **`holdon`** The bench's other end: two identical trays of steel pins; Momo holds her bar magnet just above her tray (a big bunch of pins), Pip holds his high above his tray (a few pins). Ring picture INSIDE the frame: the two magnets at different heights over the two trays; clue labels ON TOP: *the same magnets* · *the same pins* · *Momo's is closer*. *Momo talking, proud; Pip watches his magnet.* | Momo: "Pip, my magnet picked up more pins than yours! So my magnet is the stronger one!" | The calm bed; a tinkle as pins jump. | Let's Apply Q1: the distance is a variable too. |
| 3:28.5 | *Momo thinking (a question to her).* | Heart: "Something is not right. If you can spot it, cross your arms. Hold on!" | The bed fades to silent under the 5 s ring; ticks, bell, stamp. |  |
| 3:39.0 | *Momo oops to the end of the segment; Basil and Pip arms crossed.* | Heart: "Arms crossed? One finger up!" |  |  |
| 3:41.0 | The fix: a ruler stands up between the trays; both magnets glide to the same mark (a green dashed line *the same height*); both bunches redrawn. *Basil talking, pointing at the two heights, then the ruler.* | Basil: "Momo held her magnet close to the pins, and Pip held his far away. The distance changed too! Hold them at the same height, over the same pins." | A soft slide; a click as the magnets reach the mark. |  |
| 3:53.0 | Tag *Only the magnet is different* (green). | Pip: "Now only the magnet is different. That is fair!" |  |  |

### Segment 9 · Make it fair [LOOK CLOSER]; EXPERIMENT; Mark Sentence 2 (4:04-4:52)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 4:04.0 | **`lc2q`** The bench. *Basil talking (a question), still shy until `mark1` ended: now listening and keen.* | Basil: "Okay! How do I make my iron and steel test fair?" |  |  |
| 4:09.0 | **`lcfair`** [LOOK CLOSER]: the two set-ups BIG side by side again. `twenty`: the long coil unwinds to twenty turns and the short coil winds up to twenty turns (counters *20 turns* / *20 turns*, both green); `samebat`: both holders *1 battery* green; `samewire`, `sameclips`: green ticks *the same wire*, *the same tray of steel clips*; `onlynail`: only the nails' tags glow, *the only thing changed: the kind of nail*; `dipfair`: both tips lower the same way to the same depth (a green dashed line), a "?" over each tip (no result shown). On the board, seen as the panel eases back: *Change: the kind of nail ✓ · Keep the same: 20 turns · 1 battery · same wire · same clips ✓ ✓ ✓ ✓*. Basil's face peeks in the lower left (keen, then cheer at EXPERIMENT). | Heart: "Look closer. Give both nails twenty turns of wire. Use the same kind of battery, the same wire, and the same steel clips." | A soft whirr as the coils change; ticks for each green "same". |  |
| 4:18.5 |  | Heart: "Dip both tips the same way. Now only one thing is different: the kind of nail. If one nail attracts more clips, we know the nail did it!" |  |  |
| 4:28.0 | *Basil talking, teaching; EXPERIMENT pops; Basil cheer at the end (a key word learnt).* | Basil: "An experiment is a test that we plan and do to answer a question, such as: which nail makes a stronger electromagnet?" | The chime. |  |
| 4:37.0 | Verdict **ONLY ONE THING CHANGED: FAIR** (2.5 s). |  | The stamp. |  |
| 4:40.0 | **`mark2`**: Basil, "Say it with me!", 0.8 s, reads 7.8a; header *An experiment*; highlights *answer a question*, *test a prediction*. Under the card: the fair set-up with a "?" (*a question*). | Basil: "Say it with me!" · "When scientists plan and conduct an experiment, they answer a question or test a prediction." *(book, exact: 7.8a)* |  |  |

### Segment 10 · Score, the woodlouse, the key words (4:52-5:16 + 0:15)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 4:52.0 | **`final`** (`finalScene`): the score hand; 2 : 1. | Heart: "Show me your score hand! Two fingers? You beat the Buddies. High five!" | The groove back, softly. |  |
| 4:58.0 | **`liz`** (`lizReveal`): back in the room, one push-in onto the woodlouse under the cupboard door; the black ring; it rolls into a ball, then unrolls. | Heart: "Did you spot the woodlouse? It was under the cupboard door!" | A whoosh; a tiny roll. |  |
| 5:03.5 | Fun-fact pictures (`funFact`): a woodlouse beside a crab and a prawn (*cousins!*); a choice box, *damp* | *dry*, the woodlice gathering on the damp side (*a fair test!*). *Basil talking, excited; surprised (a fun fact).* | Basil: "Here is a fun fact! A woodlouse is a cousin of crabs and prawns! And in a fair test, with a damp side and a dry side, woodlice crawl to the damp side!" |  |  |
| 5:14.0 |  | Heart: "Tell someone at home!" |  |  |
| 5:16.0 | **`kwrecap`** the shelf to the centre. | Heart: "Let's read today's key words together! Ready?" · "Variable." · "Fair test." · "Experiment." · "Well done!" (the buddies say each word quietly with the class) |  |  |

### Segment 11 · The cliffhanger: Momo's plan (5:31-5:41)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 5:31.0 | **`cliff`** The bench: Momo pulls the battery tray from the cupboard and holds up a second holder with TWO batteries; two coils beside her, a short one and a long one (her plan, not yet named). *Momo talking, keen; the others watch the batteries.* | Momo: "My turn! I will test if more batteries make our electromagnet stronger!" |  |  |
| 5:36.0 |  | Heart: "Will Momo's plan be fair? Find out in Part Two!" |  |  |

### Segment 12 · "Now you know!" and the outro (5:41-5:52)
As EP23 (`nykScene`): "Say it with us!" (all three), 0.8 s, "Ready? One! two!" 1.0 s apart, "Now you know!" with the sting; Pip and Basil sit and smile before the words, Momo waves; ON the words all three cheer and hop to the end; about 4 s of outro, nothing new spoken, no text in the bottom fifth. The groove plays out and fades.

---

## 5. PART 2 · "Plan It, Test It, Count It AGAIN! Why Scientists Repeat" · about 5:30

| Segment | Time | Length |
|---|---|---|
| 1 · "Last time...": a calm recap (Heart from 0.3 s) | 0:00-0:11 | 11 s |
| 2 · The science room on Wednesday, and the hidden sparrow | 0:11-0:31 | 20 s |
| 3 · Today's goals (Pip reads) | 0:31-0:39 | 8 s |
| 4 · Round 1: Momo's plan, X and Y | 0:39-1:20 | 41 s |
| 5 · The answer: two things changed; PREDICTION | 1:20-1:42 | 22 s |
| 6 · Our plan [LOOK CLOSER]: the table; VARIABLE TO BE MEASURED; Mark Sentence 1 | 1:42-2:50 | 68 s |
| 7 · Showdown: Pip's plan card | 2:50-3:30 | 40 s |
| 8 · BE A STEEL PAPER CLIP, COUNTED AGAIN AND AGAIN (the journey) | 3:30-4:00 | 30 s |
| 9 · Count it again [LOOK CLOSER]: RELIABLE; Mark Sentence 2 | 4:00-4:45 | 45 s |
| 10 · The chant | 4:45-5:02 | 17 s |
| 11 · Score hand, the sparrow and its fun fact | 5:02-5:20 | 18 s |
| 12 · The dare for Episode 25 | 5:20-5:37 | 17 s |
| 13 · The key words | 5:37-5:50 | 13 s |
| 14 · "Now you know!" and the outro | 5:50-6:01 | 11 s |

(The table's total is about 6:00 before Stage 1 trims; EP23's tables ran about 20 s over their timelines. Section 6 lists the cuts in use and the next ones.)

### Segment 1 · "Last time..." (0:00-0:11)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 0:00.3 | **`lasttime`** three pictures, one at a time, centred, large, a gentle push-in, one label each: *Two things changed: not fair* (25 turns / 8 turns, two red tags) · *Change only one thing: fair* (twenty turns each, only the nails' tags red) · *The same height: fair* (the two magnets level by the ruler). | Heart: "Last time, Basil changed two things at once, so his test was not fair. In a fair test, we change only one thing." *(0.3 s)* | A soft pop per picture; the calm bed fades in. | Rule 2: each picture >= 2.5 s, one label, true to Part 1. |

### Segment 2 · The science room, and the hidden sparrow (0:11-0:31)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 0:11.0 | **`lab`** THE SCIENCE ROOM, Wednesday after school (warmer light). On the bench: the board **OUR PLAN** (empty table), the mini crane, the battery tray, Momo's two set-ups X (one battery, a short coil) and Y (two batteries, a long coil), tagged X and Y. Place card *A school science room, Singapore · Wednesday after school*. *Momo talking, holding up her two set-ups (showing them).* | Momo: "Here is my plan! Set-up X and set-up Y." | Fans; birds; a door far off. |  |
| 0:15.5 | **`game`**: one push-in onto the sparrow on the outside window ledge; the black ring; *a little sparrow* · *Can you spot it?* | Heart: "A little sparrow is hiding in this video. Can you spot it?" | A whoosh; a sparrow's chirp. |  |
| 0:21.0 | *Pip talking, pointing up at the window.* | Pip: "Sparrows love ledges and railings. Look up high!" |  |  |
| 0:24.5 |  | Heart: "Lock in first with your fingers. One finger for every point." | The groove in. |  |

### Segment 3 · Goals (Pip reads) (0:31-0:39)
**`goals`**: Pip: "Today you'll learn:" · "Plan a fair test." · "Measure one thing." · "Why we repeat." (a pop per card).

### Segment 4 · Round 1: Momo's plan, X and Y (0:39-1:20)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 0:39.0 | **`r1card`** ROUND 1. | (nobody) |  | The brief's quiz: a new set-up, the same skill. |
| 0:40.0 | **`r1`** (`lockN`): THREE big numbered picture cards: 1 *Yes, it is fair* (X and Y with a green tick) · 2 *No, two things changed* (X and Y, the batteries and the coils outlined red) · 3 *No, use a steel nail* (a steel nail with a "?"); the ring's picture: X (one battery, ten turns) and Y (two batteries, twenty turns) side by side over two trays; clue labels ON TOP: *X: 1 battery · 10 turns* · *Y: 2 batteries · 20 turns* · *the same iron nails*; the 5 s ring. *Momo worried in the ring.* | Heart: "Round one. Here is Momo's plan. Set-up X has one battery and ten turns. Set-up Y has two batteries and twenty turns. Is her test fair? One, yes. Two, no, two things changed. Three, no, use a steel nail. Show me your fingers." | Ticks, bell, stamp under silence. |  |
| 1:02.5 |  | Heart: "Locked in!" |  |  |
| 1:04.0 | *Momo talking (her pick).* | Momo: "One! X and Y are both electromagnets, so it is a fair race." |  |  |
| 1:09.0 | *Pip talking, pointing at Basil's steel nail on the bench.* | Pip: "Three. Basil's steel nail is still here. We should use it." |  |  |
| 1:13.5 | *Basil talking, laughing at the end (a funny line about himself).* | Basil: "Two! Momo changed the batteries and the turns. I did that too, last time!" |  |  |

### Segment 5 · The answer; PREDICTION (1:20-1:42)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 1:20.0 | **`r1ans`** The bench and OUR PLAN (HOME); card 2 the tick; an x on 1 and 3; YOU +1 (BUDDIES +0: only Basil was right). The fix: Y's long coil unwinds to ten turns (*10 turns* green); *Only the batteries are different.* *Basil arms crossed (right); Momo and Pip oops to the end of `r1ans`.* | Heart: "The answer is two! Did you show two fingers? Put one finger up!" |  |  |
| 1:26.5 | *Basil talking, pointing at the two coils.* | Basil: "Keep the turns the same, and change only the batteries!" |  |  |
| 1:31.0 | *Basil talking, teaching; PREDICTION pops with a line to a thought cloud *2 batteries → stronger?*; Basil cheer at the end.* | Basil: "A prediction is what we think will happen, such as: more batteries will make our electromagnet stronger!" | The chime. |  |

### Segment 6 · Our plan [LOOK CLOSER]; VARIABLE TO BE MEASURED; Mark Sentence 1 (1:42-2:50)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 1:42.0 | **`lc1q`** The bench (every object out: batteries, holders, nails, wire, clips, the tray). *Pip talking (a question), thinking.* | Pip: "There are so many things on the bench. How do we keep track of them all?" |  |  |
| 1:48.0 | **`lctable`** [LOOK CLOSER]: the book's table BIG, filling the panel, three coloured rows (*Variable to be changed* teal, *Variables to be kept the same* blue, *Variable to be measured* gold); each row fills as Heart reads it, and the thing on the bench it names lifts with a line to its row (the two holders; the battery tray, the clip tray, the nail bag, the coils; a hand counting clips). Heart's words are the table's words (book, exact). Momo's face peeks lower right (listening; cheer at her key word). | Heart: "Look closer. Here is our plan. The variable to be changed is the number of batteries." | A soft pen squeak per row; a pop as each thing lifts. |  |
| 1:56.5 |  | Heart: "The variables to be kept the same are the type of batteries, the type of steel clips, the type of iron nail, and the number of turns of wire around the iron nail." |  |  |
| 2:10.0 |  | Heart: "The variable to be measured is the number of steel clips attracted." |  |  |
| 2:16.5 | *Momo talking, teaching; VARIABLE TO BE MEASURED pops; Momo cheer at the end.* | Momo: "The variable to be measured is the one thing we count or measure, such as the number of steel clips attracted!" | The chime. |  |
| 2:27.0 | Verdict **CHANGE ONE · KEEP THE REST THE SAME · MEASURE ONE** (2.5 s). |  |  |  |
| 2:30.5 | **`mark1`**: Pip, "Say it with me!", 0.8 s, reads the book's prediction; header *Our prediction*; highlights *increase the number of batteries*, *the strength*. Under it: X and Y (both ten turns), one and two batteries. | Pip: "Say it with me!" · "When we increase the number of batteries, the strength of the electromagnet will increase." *(book, exact: 7.12)* |  |  |

### Segment 7 · Showdown: Pip's plan card (2:50-3:30)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 2:50.0 | **`showcard`** SHOWDOWN · DOUBLE POINTS. |  |  |  |
| 2:51.0 | **`show`** Pip's plan card on Momo's easel (from EP23), three lines with pictures: 1 *Change only the number of batteries.* (one and two batteries) · 2 *Keep everything else the same.* (green ticks) · 3 *Count the clips once, and we are done!* (one tally mark); the 6 s ring. *Pip proud; then worried? no: Basil worried in the ring.* | Heart: "Showdown! Double points. Pip's plan card has one mistake. Line one, two, or three? Show me with your fingers." |  |  |
| 2:58.0 | *Pip reads his card, pointing at each line.* | Pip: "One: change only the number of batteries. Two: keep everything else the same. Three: count the clips once, and we are done!" | Ticks, bell, stamp under silence (6 s). |  |
| 3:15.5 |  | Heart: "Locked in!" |  |  |
| 3:17.0 | **`fix`**: line 3 struck through, rewritten in green *Count the clips a few times.* *Basil talking; Pip oops through the fix; Basil and Momo arms crossed.* | Basil: "Three! One count is not enough. Scientists repeat the test a few times." |  |  |
| 3:24.0 |  | Heart: "Three fingers? Put up two more on your score hand!" |  |  |

### Segment 8 · BE A STEEL PAPER CLIP, COUNTED AGAIN AND AGAIN (3:30-4:00)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 3:30.0 | **`waitw`** Pill **Be a steel paper clip!**; a glide down to the tray under Y. | Heart: "Be a steel paper clip! Shrink down. Quietly." | Music out (1.2 s); the room's hush. |  |
| 3:34.5 | **`shrink`** *You: a steel paper clip* tag. `jup`: the two-battery nail comes down; you jump up and cling to its tip with other clips. `jcount`: a giant adult hand (four fingers and a thumb) unclips the battery; you all drop onto the bench in a row and a finger taps each one (a soft count *1, 2, 3 … 9* at the side); `jback`: swept back into the tray; `jagain`: up again (*8*), and again (*9*): a tally builds in the corner *9 · 8 · 9*. *Riders: on the tray's rim, watching; Momo gives one quick wave at `jback` (nothing taught then); Pip surprised at the second count.* | Heart: "You are a steel paper clip in the tray. The nail with two batteries comes down. You jump up, and cling to its tip!" | The micro-world pad alone; a tinkle per jump; a soft tap per count. |  |
| 3:44.0 |  | Heart: "A giant hand counts you and the other clips. Then back you go into the tray, and up again. Count after count." |  |  |
| 3:53.0 |  | Heart: "Nine clips. Then eight. Then nine again." |  |  |

### Segment 9 · Count it again [LOOK CLOSER]; RELIABLE; Mark Sentence 2 (4:00-4:45)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 4:00.0 | **`pullout`** then **`lc2q`** the bench; OUR PLAN with *Our counts:*. *Momo talking (a question).* | Momo: "But Pip counted only once, and got seven. Which count is right?" |  |  |
| 4:05.5 | **`lccount`** [LOOK CLOSER]: the board's counts BIG: *2 batteries: 9 · 8 · 9*, bars drawn as rows of clips of nearly the same length (*close to each other*); beside it Pip's one count *7* with a clip slipping off the nail (*a clip slipped off!*); then *1 battery: 5 · 6 · 5* below (shorter rows). Pip's face peeks lower left. | Heart: "Look closer. One count can trick us. A clip may slip off, or we may count too fast." | A tiny clink as the clip slips. |  |
| 4:13.5 |  | Heart: "When we count again and again, the counts are close to each other. Nine, eight, nine. And with one battery: five, six, five. Our prediction was right!" |  |  |
| 4:23.5 | *Pip talking, teaching; RELIABLE pops; Pip cheer at the end.* | Pip: "Reliable means we can trust the results, because we get nearly the same results each time we repeat the test, such as nine, eight and nine clips!" | The chime. |  |
| 4:33.0 | Verdict **COUNT A FEW TIMES: RELIABLE** (2.5 s). |  |  |  |
| 4:36.0 | **`crane`** the mini crane gets the two-battery hook; it lifts the steel bolt and drops it into the lorry; the board: *READY!* |  | A click, a clang. | The build's reveal. |
| 4:40.0 | **`mark2`**: Basil, "Say it with me!", 0.8 s, reads 7.11; header *Repeat it*; highlights *repeat*, *a few times*, *reliable*. | Basil: "Say it with me!" · "It is also important to repeat the experiment a few times to ensure that the results are reliable." *(book, exact: 7.11)* |  |  |

### Segment 10 · The chant (4:52-5:09)
**`chant`** (`chantScene`): all three "Say it with us!", 0.8 s; then call and response on the clap-clap-stomp beat, YOUR TURN! after each line: "Change?" → "Only one thing!" · "The others?" → "Kept the same!" · "Test it once?" → "No! Repeat it!" (the groove off; only the beat).

### Segment 11 · Score, the sparrow (5:09-5:27)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 5:09.0 | **`final`**: the score hand; 3 : 0. | Heart: "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!" |  |  |
| 5:15.0 | **`liz`**: one push-in onto the sparrow on the corridor railing outside the door; the black ring. | Heart: "Did you spot the sparrow? It was on top of the door frame!" | A chirp. |  |
| 5:20.0 | Fun-fact pictures: a sparrow with a heart that beats fast (*hundreds of beats in one minute!*), beside a child's heart (*yours: about eighty*); a scientist counting again (*count, count, count*). *Pip talking, excited; surprised.* | Pip: "Here is a fun fact! A sparrow's heart beats hundreds of times in one minute! Scientists count it again and again, to be sure." |  |  |
| 5:28.0 |  | Heart: "Tell someone at home!" |  |  |

### Segment 12 · The dare for Episode 25 (5:30-5:47)

| Time | On screen | Who speaks, exact words | Sound | Why |
|---|---|---|---|---|
| 5:30.0 | **`dare`** An HDB kitchen (a quick wired picture, not a new set): Pip gives the fridge door a gentle push; it swings shut by itself (`swing`) and stays closed; the three cards come in (`dareIn`) BEFORE any answer is shown: 1 *The cold air inside* · 2 *A strip of magnet* · 3 *Sticky glue*. | Heart: "Next time: Pip pushes his fridge door gently. It swings shut by itself, and stays closed. There is no lock and no catch. What keeps it closed? One, the cold air inside. Two, a strip of magnet. Three, sticky glue. Lock in your answer!" | A soft door thud. | Opens EP25 (magnets at home). |

### Segment 13 · The key words
**`kwrecap`**: "Prediction." · "Variable to be measured." · "Reliable." · "Well done!"

### Segment 14 · "Now you know!" and the outro
As Part 1.

---

## 6. What to cut if a part runs over (and what is already cut)

**In use from the start** (`ep24/script.py` `CUTS`): `nextjoke` (Basil's "My fridge has a lock. It's called my mum!"); `momoclips` (Momo's "Your iron nail picked up a lot more clips, Basil!": the dip in the cold open shows it).
**If a part must lose more** (in this order, none of it teaching): Part 1: Momo's woodlouse tip "Woodlice love dark, damp corners. Look low!" (`lousetip`); Momo's "Your iron nail picked up a lot more clips, Basil!" (`momoclips`); Heart's "Now only the magnet is different. That is fair." (`fairline`: the green tag carries it); the title's hold (1.8 to 1.2 s). Part 2: Pip's sparrow tip (`sparrowtip`); Basil's "Keep the turns the same, and change only the batteries!" (`basilfix`: the coil unwinding carries it); the crane's reveal hold (`cranehold`). **Never cut:** a [LOOK CLOSER], a book sentence, a key-word definition, a pause around a new term, the countdowns.

## 7. Titles, thumbnails, description, chapters, upload and app moments

- **Part 1 title:** Is Basil's Test FAIR? Change Only ONE Thing (Part 1) | Fair Tests · **Thumbnail:** words **FAIR?!** (white then yellow), Basil surprised big at the left; the two coiled nails, the long coil and the short coil, over their trays, a red "?" between them; a radial burst of teal-blue to navy; tiny **1** chip.
- **Part 2 title:** Plan It, Test It, Count It AGAIN! Why Scientists Repeat (Part 2) | Fair Tests · **Thumbnail:** words **COUNT AGAIN?!**; Pip surprised big at the left; a steel paper clip bunch on a nail tip with *9 · 8 · 9* counts; warm amber burst; tiny **2** chip.
- **Description (both, `ep24/upload.json`):** the in-this-part bullets, key words, the safety line, the book line ("When scientists plan and conduct an experiment, they answer a question or test a prediction. To conduct a fair test, scientists need to ensure that only one thing (called a variable) is changed. The other variables are kept the same. If the experiment is not fair, we will not be sure which variable can explain the results. It is also important to repeat the experiment a few times to ensure that the results are reliable."), the US bridge ("Grade 3 science fairs in the US ask the same question: was it fair? NGSS 3-5-ETS1-3."), the Singapore anchor (a school science room getting ready for Science Week).
- **Chapters** (`production/youtube/chapters_p3.json` `EP24_P1` / `EP24_P2`, from the real timelines by `make_moments.py`).
- **Upload:** NOT uploaded by this session (the main session asks the teacher first). Playlists PLb8LpPqxQI4E and PLPfEuT7l4KjI after `explained-p3-ep23-part2`. The classic **`zAUE_ZuxcDs`** ('23B' in videos.js: fair tests and magnets everywhere) is retired by EP24 + EP25 together: EP24's `upload.json` names it in `replaces` but with `retire_old: false` (EP25's upload retires it, once both are live; the NEW VERSION line then lists both).
- **App moments** (`ep24/app_moments.json`): Part 1: Round 1 (is it fair?), the journey, "Two things changed: not fair", "A fair test: change only one thing", "Same height: the magnet race", "Make it fair", "An experiment answers a question". Part 2: Round 1 (X and Y), "A prediction", "Our plan: changed, kept the same, measured", "Showdown: count once?", "Repeat the test: reliable". Keys: `CH.makingMagnets`, `O.magProps`, `lab:p3-7-2` (the old '23B' entry's keys checked at Stage 1).

## 8. The three Shorts
1. **FAIR?! · "Change only one thing"** (Part 1, about 55 s): the dare, the picks, the journey, the answer, Momo's FAIR TEST line.
2. **CLOSER WINS?! · "The magnet race"** (Part 1, about 40 s): Momo's race, the HOLD ON! ring, Basil's fix with the ruler.
3. **COUNT AGAIN?! · "Why scientists repeat"** (Part 2, about 50 s): the Showdown's line 3, the journey's counts, RELIABLE, Basil's Mark Sentence 7.11.

## 9. One-page teacher sheet
**TheOneApp, Explained · P3 Science · Was that test fair? (Ch 7, p. 118; Let's Apply Q1, Q2(b)) · Part 1 about 5:30 · Part 2 about 5:30.** Fingers 1, 2, 3 = the answer card; arms crossed = "HOLD ON!"; one hand answers, the other keeps score (the Showdown is worth two). When a buddy says "Say it with me!", read aloud with them. **After watching, ask:** What does a scientist change in a fair test? (only one thing, called a variable) · What stays the same? (the other variables) · Why did Momo's magnet "win"? (it was held closer) · Why do we count a few times? (so the results are reliable). **Try it (with an adult):** plan a fair test to find which of two fridge magnets is stronger: what will you change, keep the same and measure?

## 10. For the teacher to check: every sentence that is NOT textbook wording
- **A. Textbook wording used:** 7.8a, 7.9 (brackets read as a pause), 7.10, 7.11, 7.12 (prediction and the three table rows).
- **B. EP23's dare, word for word,** and the ritual lines from EP1 to EP23.
- **C. New sentences in our own words (as spoken):** every line in sections 4 and 5 not in A or B; in particular the six definitions (VARIABLE, FAIR TEST, EXPERIMENT, PREDICTION, VARIABLE TO BE MEASURED, RELIABLE), "Was it because of the iron? Or because of the twenty-five turns? We cannot be sure.", "If one nail attracts more clips, we know the nail did it!", "One count can trick us. A clip may slip off, or we may count too fast.", "Our prediction was right!", the two fun facts.
- **D. The chant** (original, from the book's terms).
- **E. Buddies' wrong ideas** (a pick or a card line only; answered within seconds): Basil "Iron wins!"; Momo "my magnet is the stronger one"; Momo "a fair race"; Pip "use a steel nail"; Pip's card "count the clips once, and we are done".
- **F. On-screen words not from the book:** the verdicts, the board titles, the place cards, *the iron? the turns?*, *Our counts*, *READY!*.
- **G. Words to check for sound:** woodlouse, woodlice, twenty-five (the dare), "electromagnet" (as EP23).

## 11. Choices I made
- Iron or steel is never answered (section 3, "Facts to check" 1); the book's own investigation (batteries) carries the result in Part 2.
- The counts 9, 8, 9 and 5, 6, 5 are drawn as "Our counts", not a rule.
- One place (the science room) for both parts, on two afternoons, to keep EP23's room, the crane and the board's home.

## 12. Status, next steps and open points
- Stage 1 (voices, timelines) and Stage 2 (drawing, sound, render, checks) follow from this script in `ep24/`.
- Open for the teacher: the definitions' wording (C); the counts; the sparrow heart fact; Part 2's Round 1 has only Basil right, so the Buddies score no point there.
