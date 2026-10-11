# Style Guide — "TheOneApp, Explained" · Primary 3 series

This guide carries over **every** rule of the P4 style guide (`S/p4/01_style_guide.md`) and the teacher's standing rules, then adds the P3 adjustments for 8–9-year-olds and the build-kit conventions (`R/kit/README.md`). Where a P3 rule tightens a P4 rule, the P3 rule wins for P3 episodes.

---

## 1. Voice

- A warm, curious teacher talking to ONE 8-year-old: "you", short sentences, one idea per sentence.
- Spoken English, not textbook English. Contractions are fine ("don't", "here's"). No Singlish in the narration, so it works in both countries.
- **Explain, then name:** describe the thing in everyday words first, then give the science term. "It bends without breaking. Scientists call that *flexible*."
- Every claim is accurate to the P3 syllabus. Simplify, but never say something a P4, P5 or P6 teacher would have to "unteach" (for example never "plants eat sunlight", never "the tadpole is a larva", never "magnets attract metal").
- Never invent numbers. Use only book-safe values (the Earth's rotation takes 24 hours; three or four stages; six legs; two poles; rabbits have one to twelve young; a female mosquito lays 100 to 200 eggs) or clearly hypothetical "say, ten clips" numbers.
- Keep the book's hedge words: *usually*, *most*, *some*. They are part of the definition (ostriches and penguins cannot fly; guppies give birth; mudskippers live on land; snakes have no legs).

## 2. Positive language (parents and educators)

- Never use words with negative connotations, even playfully: no "cheat", "lying", "trap", "stupid", "dumb", "kill", "dead", "bad guys", "gross".
- Swaps: "cheat" → **"superpower"**; "exam trap" → **"Exam tip"** ("Lots of students mix this up"); "your touch is lying" → "your senses got mixed up"; "killing" → "harming"; "bacteria killer" → **"a medicine that stops harmful bacteria from growing"**; "die / die out" → **"stop living" / "disappear forever"** (keep **extinct** as the science term, defined as the book does); "the pupa looks dead" → **"the pupa is alive and busy changing inside"**; "bad bacteria" → **"harmful bacteria"**.
- Science words that only sound negative are fine in their real meaning: "harmful fungi", "repel", "fragile", "non-living", "break", "extinct".
- Apply this everywhere: narration, on-screen text, titles, thumbnails, descriptions, chapters and the review board.

## 3. Pacing

- Pauses after every teaching point: the kit leaves **0.55 s between lines in the same scene and 1.0 s between scenes** (P4 values). For P3, get extra breathing room by **writing shorter segments** (two or three sentences each), so the scene gap falls more often. Do not change the kit's timings.
- **Voice 3** speed (0.92 statements, 0.86 questions) is already slower than voice 1; it stays as the series voice for P3. Reserve **voice 4 ("foundation")** for Foundation Science resources, not for the P3 YouTube episodes.
- One new idea per beat, then show it, then say it again in the Exam corner. Three touches per idea.

## 4. Narrator (same as P4, decided 10 Oct 2026)

- **Heart, voice 3 ("expressive")** narrates every P3 episode: Kokoro `af_heart`, `en-us`, pitch range widened 1.6x, read sentence by sentence (the kit's default).
- One narrator from start to finish; no voice swap mid-video, no alternation across episodes.
- Write in neutral English that works in both accents ("your parents", not "mum" or "mom").
- Write numbers as words whenever the TTS or the aligner needs a cue ("twenty-four hours", "six legs", "experiment one point one"). Digits are read aloud but get no word timing, so never put a visual cue on a digit.
- Every spoken word must be in cmudict or in `R/kit/pron.txt` (or the episode config `pron`). Watch P3-specific words: *mimosa, tempeh, rambutan, tadpole, nymph, pupa, pupae, larva, larvae, wriggler, prolegs, moult, moulting, lodestone, maglev, Aedes, kopitiam, kiln, sapling*. Prefer an everyday synonym when a rare word is not needed.

## 5. Structure (3:15–4:15, about 420–580 authored spoken words)

1. **Hook (0:00–0:12):** one surprising, specific line that confirms the title, opens a question and promises the payoff. Segment id `hook`, scene `hook`.
2. **Welcome + "Today you'll learn" (kit-made, about 15 s):** "Hi there, and welcome to The One App, Explained! I'm so happy you're here. Today, you will learn three big ideas. First, … Second, … And third, … Let's get started!" Exactly **three goals**, each popping onto the "🎯 TODAY YOU'LL LEARN" board. No "subscribe".
3. **Body (3–4 beats):** one idea per beat, each ending on a mini-question. P3: name the object, show it, count it, then name the science word.
4. **Try-it moment:** the School Lab link (spoken + card) or a safe home observation ("gently touch a mimosa leaf").
5. **Pause and predict (`quiz1` then `quiz2`, scene `quiz`):** one question, **three options** for P3 (A, B, C), the kit's **4-second silent "Think!" countdown with soft ticks**, then the answer with the reason. Options stay on screen through the countdown; reveal on `quiz2` cues; never draw your own timer.
6. **Exam corner (`exam`, 25–40 s):** "In your exam, say it like this…" then the exact wording from `definitions.md`, line by line with a ✓.
7. **Payoff and recap:** deliver the hook's promise, explicitly.
8. **Habit + revision (`habit1` in scene `habit`, `habit2` in scene `mindmap`, about 30 s):** ONE atomic habit (habit stacking, two-minute rule, make it obvious, habit tracker, never miss twice, implementation intention, temptation bundling, environment design, identity, accountability partner, reward after, start tiny), then the mind map (middle word, branches, sub-branches) and the app steps.
9. **Close (`close`):** ONE ask ("Tell me in the comments…", "Find one … at home").
10. **Goodbye over the end card (kit-made):** "Thanks for watching! See you next time. Bye!" (last episode: "See you soon."), under 3.15 s.

## 6. The teacher's standing rules (checked before every render)

1. **Definition accuracy.** Every definition shown or spoken is the FULL, correct MOE wording from `definitions.md`, never a shortened version. Shortening is how errors creep in. Summaries, mind maps, habit lines, key-word labels and one-line recaps follow the same rule: if a line states what something IS, it uses the full definition. Fact-check every science statement against `definitions.md` before rendering and flag anything that would lose marks in a Singapore exam.
   - P3 watch-list: *classification* = "the grouping of things based on their similarities and differences" (row 2.33); *comparing* = finding similarities **and** differences (5.12); *strength* = "ability to be pulled or pushed without breaking or tearing" (3.12); *flexibility* = "ability to bend without breaking" (3.15); *waterproof* = "do not absorb water at all" (3.18); *life cycle* = "a repeated pattern of change as a living thing grows over time and reproduces" (4.2); *fair test* (7.9); magnet lines (6.2–6.17).
2. **Plain label lines.** Every label of a part is joined to that part by one plain line, **no arrowhead**. **Never use numbered markers** beside a drawing in place of labels (and never number the stages of a life cycle: the book says there is no first or last stage, 5.16).
   - Arrows are allowed only to show **motion, flow or direction**: the loop arrows of a life cycle, the pull and push between magnet poles, water flowing. Never for pointing at a label.
3. **Wrong statements:** a ✗ at the start of the statement only. **No strikeout**; pupils must still be able to read the words.
4. **Positive language:** "Exam tip", never "trap" (section 2).
5. **Realism** of objects, colours and directions (section 9).
6. **Every named skill or term becomes a key word, with its full name** ("FLOWERING PLANTS", not "FLOWERING"; "STROKE METHOD"; "FREELY SUSPENDED MAGNET"; "CLASSIFYING", "COMPARING", "OBSERVING", "FAIR TEST" when the skill is named).
7. **The 4-second silent "Think!" countdown with soft ticks** before every quiz answer (kit: `quiz1` → `quiz2`).
8. **School Lab card plus the spoken link** in every episode that has a matching lab: "You can try it in The One App. Open the School Lab, experiment one point two, and press, Let's test it now!" (codes with a letter: "two point one A", "six point three C"). The card shows from the cue word "try" to 0.6 s after the segment.
9. **Mind-map habit with the real app steps:** "Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map, and pick Living and Non-Living." (`habit2` must say "save" and "tap"; the chapter name is one of the four P3 Mind Lab names: Living & Non-Living, Diversity of Materials, Life Cycles, Magnets; speak "&" as "and").
10. **Bigger objects filling the empty space.** Draw the main object large (a third of the stage or more) and let the kit's scene fills enlarge up to 1.5x; never leave a small drawing floating in a big empty scene.
11. **Welcome with three goals and a spoken goodbye** on every episode (kit-made from the config `goals` and `bye`).

## 7. P3 adjustments for 8–9-year-olds

- **Shorter sentences:** about 8–12 words, one clause. Split anything with "because … and … so …" into two sentences.
- **Simpler words:** "pull" before "attract", "push" before "repel", "see-through" before "transparent", "young one" before "young", "turn into" before "develop into". Then give the science word, every time, and use the science word in the Exam corner.
- **Define every new word on screen.** When a term first appears, a word box shows the term and its meaning:
  - exam terms: the **full** `definitions.md` wording (for example "Waterproof: materials that do not absorb water at all are waterproof");
  - helper words that are not exam definitions (kiln, sap, pulp, lodestone, feelers, egg case): a short plain gloss ("kiln: a very hot oven").
- **Slower pace:** fewer words per beat, one visual change every 3–4 seconds instead of 2–3, and a full second of "look at it" after each reveal. Count things aloud ("one, two, three body parts") while the parts light up.
- **Concrete Singapore examples** pupils have touched: recess snack box, school bag, HDB bathroom frosted window, fridge magnets, the kopi sock at the kopitiam, mimosa on the school field, rambutan and mango, tempeh, yoghurt drinks, free-roaming chickens near HDB blocks, NEA's Mozzie Wipeout, Tree Planting Day, the Botanic Gardens seed bank, hiking at MacRitchie.
- **Three quiz options, not four.** One question, one skill, one reason in the answer.
- **One mind map, three to five branches**, two or three sub-branches each (the maker allows 10 branches of 8 but P3 maps stay small).
- **Hedge words stay**, but explain them once in kid words: "most means nearly all, not every single one".
- **No numbers on stages, no stage called "first".** Life cycles and day-and-night are loops.
- **Characters:** do not reuse the textbook's cast names (Ali, Belle, Chen, Devi, Mr Bala, Mrs Lim). Use "a girl in class", "your friend", "you".
- **Safety line and "Ask an adult" badge** for the electromagnet (battery only, not too long, never the mains), mould ("never touch or sniff real mould"), torches ("never shine a torch into anyone's eyes") and real yards ("look at small animals without picking them up; wash your hands").

## 8. On-screen conventions (unchanged from P4, kit-built)

- Bright, colourful, kid-friendly look: a new background colour per scene, rounded Fredoka font, cartoon outlines, bouncy pop-ins, confetti bursts on "aha" moments (config `bursts`). 1920 × 1080, 60 fps.
- **Keywords:** when a key term is first spoken, a "⭐ LABEL" pill pops at the bottom centre (pop sound), then flies to the **⭐ KEY WORDS** shelf top right (whoosh) and stays for the episode. Up to 14 per episode (P3: aim for 6–10). Labels are terms, not abbreviations; add a `short` shelf label only when the full label would not fit.
- Word-by-word captions in a dark pill below the keyword box, chunks of up to 5 words, broken after `, . ? !`. "The One App" is shown as "TheOneApp".
- The episode tag "🔍 TheOneApp, Explained - <topic>" sits top left, sized to its text.
- **Exam corner:** a dark chalkboard panel with green ✓ lines; wrong statements get a red ✗ at the start.
- Temperatures (rare in P3) are °C first with °F small underneath.

## 9. Text layout rules (checked on every video)

- **Text never spills out of its box.** Every pill, chip, keyword box and caption bar is sized from the measured width of its text once the font has loaded. Emoji count toward the width. Fixed-width boxes shrink the text to fit.
- **Text never overlaps visuals or other text.** Labels sit beside the drawing with a plain pointer line.
- **Reserved zones:** nothing important in the caption band (y > 950), the ⭐ KEY WORDS shelf (x > 1480) or the episode tag (top left). Keep content inside x 50..1480, y 100..950; stage centre is x = 760. Avoid the bottom centre for about 2.5 s after a key-word cue.
- The kit renders the whole page every 0.1 s before TTS and again after; fix every flagged frame, then check the fixed frames by eye (`W/snap.js`, `R/epN/stills.sh`).

## 10. Drawing quality and realism (P3 additions in bold)

- Things that are one object in real life look connected on screen: stems grow out of roots, leaves sit on stalks attached to the stem, **wings and six legs attach to an insect's thorax, feelers to its head**.
- Rows of repeated parts touch each other with no stray gaps unless the gap is the point (**ring magnets floating with a gap IS the point**).
- Objects look and behave as in real life: tools point at what they act on (**a torch's lens faces along its beam; a bar magnet's pole faces the nail it strokes**), moving things face the way they move, water and other clear liquids are blue or clear, organs pink or red, blood red, bones off-white, a container being filled is open, liquid surfaces stay level, shadows fall away from the light, the heavier pan goes down, **insects have 6 legs and 3 body parts, spiders 8 legs, frogs 4 legs with webbed hind feet, tadpoles a tail and no legs, caterpillars 3 pairs of true legs plus prolegs, mushrooms have gills under the cap, a ship's hull sits partly below the waterline, a sinking spoon rests on the bottom, magnet poles are red (N) and blue (S) with white letters, a compass needle's red end points North, a hanging magnet is tied at its middle and hangs level, an electromagnet's wire is coiled in neat turns round the nail with both ends on the battery's two terminals, steel clips hang from a magnet's poles (not its middle), a maglev train floats with a visible gap above its track**.
- Diagram labels: one plain line each, no arrowheads, no numbered markers (section 6.2).
- Heat (rare in P3): wiggly arrows outward; flame emojis only for real fires and stoves (the kiln).
- **Life-cycle loops:** stages placed round a circle, joined by curved arrows in one direction, labelled by name (egg, young, adult / egg, larva, pupa, adult / seed, young plant, adult plant), never numbered.
- **Magnets:** pull shown as two arrows pointing toward each other between unlike poles, push as two arrows pointing away between like poles; iron-powder field patterns only if the beat is about the field.

## 11. Two audiences, one video

- **Singapore anchors:** see section 7. Use the book's own Singapore items where they exist (seed bank, herbarium, butterfly conservation, dengue and NEA, Tree Planting Day, tempeh).
- **US bridges:** "Grade 3", backyard, school cafeteria, science fair, monarch butterfly and milkweed, bullfrog, robin, alligator, national-park hiking with a compass, a pizza dough rising (yeast).
- One or two of each per episode, lightly, so neither audience feels it is "not for them".

## 12. Kit conventions the scripts must follow (`R/kit/README.md`)

- Three authored files per episode: `R/plan/epNN_segments.json`, `R/plan/epNN.json`, `R/epN/scenes_epN.js`.
- Segments: first id `hook`; no `welcome`/`bye` (kit adds them); `quiz1` immediately followed by `quiz2` in the same scene; `habit2` in scene `mindmap` and it says "save" and "tap"; segments of a scene are consecutive; ids lowercase `[a-z][a-z0-9_]*`.
- Config: `topic` (the tag), `icon`, 3 `goals`, `kw` (1–14), optional `short`, `bursts`, `lab` (or `null` when no lab fits), `mm` (phone shot path + boxes; P3 shots live in their own folder, never `W/mm/`), `end` lines, `output`.
- The School Lab card text is `School Lab › <code>  <title>` / `Part (x): <part title>`; the spoken code uses words ("three point two"); letters are spoken ("two point one A").
- Scene code: `s.run(t)` is a pure function of `t`; use `C(seg, word)` cues; keep y > 950 clear; no own countdown timer; `S.mindmap` uses `mmPhone()`.

## 13. Pre-render checklist (P3)

1. Every definition line matches `definitions.md` word for word.
2. Hedge words present where the book has them.
3. No numbered stages, no arrowheads on label lines, no strikeout, ✗ only at the start of wrong lines.
4. Positive language sweep (section 2) over narration, screen text, title, thumbnail, description.
5. Key words: full names; every named skill included.
6. Three goals, welcome, Think! countdown, lab card + spoken line, mind map with app steps and chapter pick, one ask, goodbye.
7. Realism sweep (section 10) on every drawing.
8. Layout checker clean; fixed frames checked by eye.
9. Safety badge where needed.
10. Lab named on the card is signed off (status `ready`) before the video goes public.
