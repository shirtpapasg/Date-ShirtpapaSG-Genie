# Style Guide — "TheOneApp, Explained"

## Voice
- A warm, curious teacher talking to ONE 10-year-old: "you", short sentences, one idea per sentence.
- Spoken English, not textbook English. Contractions are fine ("don't", "here's"). There is no Singlish in the narration, so it works in both countries.
- **Explain, then name:** first describe the thing in everyday words, then give the science term. For example: "it gets bigger, takes up more space — scientists call that *expanding*".
- Every claim is accurate to the P4 syllabus. Simplify, but never say something that a P5/P6 teacher would have to "unteach".
- Never invent numbers. Use only textbook-safe values (body temperature about 37 °C, water boils at 100 °C, 1 cm³ = 1 ml) or clearly hypothetical "say, 50 degrees" numbers.

## Positive language (parents and educators)
- Never use words with negative connotations, even playfully: no "cheat", "lying", "trap", "stupid", "kill" and the like.
- Use positive or neutral swaps: "cheat" → **"superpower"**; "exam trap" → **"exam tip"** ("Lots of students mix this up"); "your touch is lying" → **"your sense of touch got mixed up"**; "killing" → **"harming"**.
- Science words that only sound negative are fine in their real meaning: "trapped air", "if one part fails", "it lies next to" (position).
- Apply this everywhere: narration, on-screen text, titles, thumbnails, descriptions, chapters and the review board.

## Pacing
- Leave a pause after every teaching point so learners can process it: **0.55 s between lines in the same scene, 1.0 s between scenes**. That's 0.2 s longer than the first renders.
- Speaking speed: see Narrator below (voice 3).

## Narrator (decided 10 Oct 2026)
- **Heart, voice 3 ("expressive")** narrates every YouTube episode: Kokoro `af_heart`, `en-us`; speed 0.92 for statements and 0.86 for questions/exclamations, read sentence by sentence with a 0.3 s beat, pitch range widened 1.6x (Praat). The Heart Voice Kit's `--style expressive` makes exactly this.
- **Heart, voice 4 ("foundation")** is for **Foundation Science** resources (learners who need more time and support): speed 0.84/0.80, 0.6 s between sentences, 1.4 s between paragraphs, pitch range 1.9x (`--style foundation`).
- George (`bm_george`) is retired from the series.
- Write the script in neutral English that works in both accents. Avoid spellings or idioms that sound odd in one accent ("mum" vs "mom": use "your parents").
- Write numbers as words when the TTS might misread them ("thirty-seven degrees", not "37°").

## Structure (4–6 min, about 650–850 spoken words)
1. **Hook (0:00–0:12):** one surprising, specific line. It confirms the title, opens a question and promises the payoff.
2. **Welcome + "Today you'll learn" (right after the hook, about 15–20 s):** a quick greeting ("Hi there, and welcome to The One App, Explained! (spoken as "The One App", shown as "TheOneApp") I'm so happy you're here.") then exactly **three learning goals**, spoken as "First… Second… And third…" while each goal pops onto the "🎯 TODAY YOU'LL LEARN" board. End with "Let's get started!" No "subscribe".
3. **Body (3–4 beats):** one idea per beat, each ending on a mini-cliffhanger or question.
4. **Try-it moment:** a safe home experiment or a "pause and predict" question.
5. **Exam corner (30–45 s):** "In your exam, say it like this…" plus the exact wording.
6. **Payoff and recap:** deliver the hook's promise, explicitly.
7. **Habit + revision segment (every episode, about 30 s):** link the topic to ONE atomic habit (for example habit stacking, a two-minute rule, or making it obvious) and show how to revise it with a **mind map**. Then send viewers to **TheOneApp, the ultimate science app**: our own education project for students, where they keep their mind maps and revise.
8. **Close:** ONE ask (for example "Try it and tell me in the comments what you saw").
9. **Goodbye over the end card:** a short spoken sign-off ("Thanks for watching! See you next time. Bye!"), under about 3 seconds, so the video never stops abruptly. The hook still opens the video, so any clip from the start works as a Short or TikTok.

## On-screen conventions (Episode 1 onwards)
- Bright, colourful, kid-friendly look for ages 9–12: a new background colour for each scene, rounded Fredoka font, cartoon outlines, bouncy pop-ins, confetti on "aha" moments. Rendered at 60 fps.
- **Keywords:** when a key term is first spoken, it pops up in a box at the bottom centre (with a "pop" sound), then flies to the **⭐ KEY WORDS** list at the top right (with a "whoosh") and stays there for the rest of the episode.
- Word-by-word captions sit in a dark pill below the keyword box.

## On-screen conventions (to match the haze video)
- `[ON SCREEN: …]` on every beat. Visuals are triggered by **key words** in the narration: name the word in brackets, e.g. `[ON SCREEN @ "spoon": metal spoon pops in]`.
- Word-by-word captions are always on; key science terms are highlighted yellow.
- A recurring "TheOneApp, Explained - <topic>" tag sits top-left (e.g. "TheOneApp, Explained - Systems").
- Chips (top-right) hold the term + a 3-word definition.
- An **Exam corner** card (dark panel, green ✓ / red ✗) appears for model answers.
- Temperatures are shown as °C first with °F small underneath (for US viewers).

## Text layout rules (checked on every video)
- **Text never spills out of its box.** Every pill, chip, keyword box and caption bar is sized from the *measured* width of its text once the font has loaded, never estimated from the number of letters. Emoji count toward the width.
- If a box has a fixed width, the text shrinks to fit inside it; it never runs past the border.
- **Text never overlaps visuals or other text.** Keep labels clear of the drawing they describe: put them beside it, with a pointer line if needed.
- **Reserved zones:** nothing important goes in the caption band (bottom 115 px), the ⭐ KEY WORDS shelf (top right, x > 1500 px) or the episode tag (top left).
- Keep every word inside the 1920 × 1080 frame with a 40 px safe margin.
- Before rendering, run the layout checker (`audit.js`). It steps through the episode every 0.25 s and flags text out of its box, off screen, under the captions or keyword shelf, or overlapping other text. Fix every flag that lasts 0.5 s or more, then check the fixed frames by eye.

## Drawing quality
- Things that are one object in real life must look connected on screen: stems grow out of roots, leaves sit on stalks attached to the stem, side roots branch out of main roots.
- Rows of repeated parts (teeth, bricks, tiles) touch each other with no stray gaps, unless the gap is the point being taught.
- Objects must look and behave as they do in real life, because children learn the science from the picture:
  tools point at what they act on (a torch's lens faces along its beam, a spout faces its stream), moving things face the way they move,
  water and other clear liquids are blue or clear (never brown unless the script says so), organs are pink, red or dark maroon (never purple),
  blood is red, bones off-white, a container being filled is open, liquid surfaces stay level, shadows fall away from the light,
  the heavier pan of a balance goes down, and insects have 6 legs and 3 body parts.

## Two audiences, one video
- **Singapore anchors:** hawker food, MRT, HDB, school canteen, NEA, Botanic Gardens, Sembawang hot spring, wayang kulit, local fruits and vegetables.
- **US bridges:** °F conversions, Thanksgiving, backyard fireflies, Yellowstone, school cafeteria, "Grade 4".
- Use each lightly, one or two per episode, so neither audience feels it's "not for them".

## Safety lines
- Any try-it involving heat, flames or sharp tools carries an on-screen **"Ask an adult"** badge and a spoken safety line.
