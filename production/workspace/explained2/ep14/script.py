"""script.py: P3 EP14 "Why does the Sun come back every morning? Cycles" (Cycles opener p. 73 + Ch 4 pp. 74-75), Part 1 ("Why Does the Sun Come
BACK Every Morning?") and Part 2 ("The Boy GREW. The Tree GREW. Why Not the TEDDY BEAR?"): the script (../p3_ep14_script.md, version 1 of
22 Nov 2026, with the teacher's go-ahead in its section 12: "no changes to be made for now", the recommended answers (a)-(m), and the ONE
change of 22 Nov: Heart and the buddies speak in full, human sentences, never 2-3 word fragments; every reworded line is listed in section
12.1) as data. Every spoken line is word for word as in the script, with the dare names of section 3 resolved ({DARE_Q}, {DARE_SHORT},
{CARD1_PICK}, {CARD3_PICK}, {NAP_BACK}: Block A; {NEXT_DARE}, {NEXT_JOKE}: Block B); a cell with two speakers is split into one line per
speaker. make_voice.py records the lines; build_tl.py lays them on the timeline.

Cells split into lines of ONE speaker (words unchanged, in order): {DARE_Q} = g202 (the question, .5 s between sentences) + g203 (the three
cards, 1.8 s between them), so each of EP13's boards is forward >= 2.5 s while Heart says its card (as EP13 did with EP12's dare); the traffic
light's "Look closer. Green. Amber. Red. Green again! It changes, and it repeats, so the traffic light is a cycle!" = g1302 ("Look closer.",
while the camera glides down to the junction) + g1303 ("Green. Amber. Red. Green again!", 1.45 s between the words, so each lands ON its lamp
about 2 s apart: script section 10 H) + g1304 (the verdict sentence).

Pace (SERIES_FORMAT.md section 3, teacher 2026-11-20): Heart speed .90, .5 s between sentences; buddies 12% slower; a sentence that says a
NEW TERM (opts "term") is said a little slower and followed by at least .65 s; a key word pops large and holds 2.0 s ("hold" item); Mark
Sentence cards hold 2.5 s after the buddy's last word; the book's strip C0.2 stays up at least 3.5 s (opts "hold"). The journeys: Heart .85,
1.0 s between sentences, softer. LOOK CLOSER: Heart .85 with .8 s between sentences, each moment ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre / post = silence before / after (s; build_tl scales them by .75),
                                       speed, gap (silence between sentences), soft, term (substrings: said slowly, then >= .65 s),
                                       kw: [[mark, word, nth]] (a mark at that word's onset: a key word pops there, or a picture beat),
                                       hold: s (the cursor goes on no earlier than the line's start + s), after: [id, s],
                                       pron: {text: spoken as} for this line only (the caption keeps the script's words). EP14: Basil's
                                       Mark Sentence g1002 says "24" as "twenty-four" (script section 10 H).
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd, pron)

Marks the picture and the sound use (EP10 Stage 3's lesson: every sound lands on the action, so the picture and the sound key on the SAME mark):
  kw_* (shelf key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), boardsIn / budsIn / sunedge (cold open), title.
  Part 1: lcsky: clk0 (the clock pill starts: Monday 7:00 am), sunup ("morning": the Sun clears the far blocks), tagday, dusk ("evening": the
  light turns warm, then dark), lampson (the flats' windows and the street lamps), tagnight, stars, noclouds / nosun (the labels a clear sky ·
  no clouds · no Sun), tue7, tue730, wed7 (the clock pill), row1..row4 (the row of four small skies builds: bright, dark, bright, dark);
  curtains (the hands draw the curtains), sticker (the red sticker pressed on Singapore); lcglobe: torchon (an adult's hand switches the torch
  on), lab_earth / lab_sun / lab_sg (our Earth · our Sun · Singapore), pin ("still": the pin mark by the torch), turn ("turns": the hand
  starts turning the globe; it never stops), dday (the dot in the middle of the light: tag day time), ddark (the dot crosses into the
  shadow), dnight (tag nighttime), dlight (the dot comes into the light again); globeans: ansglow (card 2 glows), ticks (the green tick on its
  board, the small x chips on the other two boards and on Momo's and Pip's bubbles), coin1, curtainsopen; the journey (dive; jdot, jday,
  jturn, jaway, jnight, jstars, jback, jlight, jmorning); boardIn (the board CYCLE CHECK slides in), tileday / tilenight (the two tiles hop
  onto the ring), ringrun (the arrows light round and round), tick1 / tick2 (IT CHANGES / IT REPEATS), tagcycle (green A CYCLE); tilesoff
  (the day-and-night tiles hop off), pen1 / pen2 / pen3 (the three pencil tiles hop towards the ring), penrow (they settle in a ROW under
  the ring), penchg (one tick: IT CHANGES), pentag (blue NOT A CYCLE); lclight: glide (the camera glides through the window and down),
  lampG / lampA / lampR / lampG2 (each lamp lights ON Heart's word), lighttiles (on the small board three tiles sit on the ring, both boxes
  ticked); cards (the hen, the chick, the teddy bear slide in low: card1..card3), q (the big ? over "living").
  Part 2: pic1 / pic2 / pic3 (the recap pictures); photo (the hand holds up the old photo); lcthen: thenpic / nowpic, pair1 / line1
  (the boy and the man; the height line rises), pair2 / line2 / fruits, pair3 / line3 (the teddy bear; the line is flat), tagliving,
  tagnon; thenans: ansglow, coin1; lcchick: wk1 (the scene's start), labsame, wk6, wk12, wk24, nestwalk (the adult walks to the bush), settle,
  later3 (the dissolve: 3 weeks later), chicksout (she walks out with three chicks), labyoung; strip (the book's strip C0.2); the journey
  (dive; jegg, jhatch, jcrack, jlight, jout, jgrow, jpeck, jrise, jadult, jnest, jlay, jagain, jtap1..jtap3, jnew); tegg / tchick / tadult /
  tback (the three tiles hop onto the ring; the last arrow back to the egg), tick1 / tick2, tagcycle (A CYCLE + the title pill A LIFE
  CYCLE); l1 / l2 / l3 (Pip's lines light as he reads), strike (line 2 struck through), bend (rewritten in green; its drawing bends from a
  row into a ring), coin2; lchens: h_gm / h_m / h_c (a label line to each as Heart names it), heads (all three lift their heads together);
  dareIn (the three mango boards slide in).

TRIAL (teacher, 22 Nov; script section 12.2, SERIES_FORMAT 1d): the buddies teach. Every term is explained by a buddy in their own words
  (Pip step by step, Basil with funny comparisons, Momo asking the "but why?"); Heart sets up, names the book's term on its slow line and
  confirms. The game segment finds the hidden animal first (g301a / g301m / g301b; j201a / j201b / j201c), then the rules. Stage 1 (colour,
  22 Nov): the buddies-in-colour lines g301c (Momo) / g301p (Pip) / g301t (Basil) before g301b (script 12.3); the reveals end with a buddy's
  fun fact and Heart's "Tell someone at home!" (g1402 + g1403 Momo + g1404; j1202 + j1203 Pip + j1204; script 12.4). New line ids
  carry the speaker's letter (g602p Pip, g603b Basil, g701m Momo...). New cut tags: mrt (g803b Basil's MRT comparison), kitten (j804m Momo
  + j804 Heart). Lengths with the cuts below: Part 1 5:17.1, Part 2 5:16.8.

CUTS: script section 6 (non-teaching, in its order). Put a tag in CUTS to drop that beat (then rebuild the timeline; make_voice for the
  re-recorded short lines).
  Part 1: title2 (the title's second slam: a picture beat only), napback (g709 Basil {NAP_BACK}: the cheer pose in silence), noclouds
          (g605 Pip "Oh! There are no clouds, so clouds are not hiding the Sun!": the surprised pose and the nod in silence; the labels
          no clouds · no Sun still show), pencilback (g1204 Basil "Oops! My pencil never grows long again, so it is not a cycle!": the
          oops pose in silence), againnight (g606 Heart "Then it is morning again, and night again.": the clock pill and the row of four
          skies still show), yesmomo (g802 shortened to "Yes, Momo!"), lookmoves (g801 Momo "Oh! So the Sun only looks as if it moves!",
          last of all).
  Part 2: forgotegg (j907 Pip "Oops! I forgot that the adult lays an egg!": the oops pose in silence), notes13 (Pip reads only "Here are
          my notes!" and line two; lines one and three are shown and lit without being read: j902 re-recorded short), darkwarm (j702
          without "It is dark and warm in here."), nextjoke (j1302 Basil {NEXT_JOKE}), c02silent (the strip C0.2 shown 3.5 s without
          being read, last of all).
  Never cut: Heart's "Living things reproduce and have young." (j604) and the four Mark Sentence cards.
  If a Basil line is cut, cut one of Momo's or Pip's as well (Basil keeps at least as many lines as either).
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"forgotegg", "notes13", "napback", "title2", "pencilback", "mrt", "yesmomo", "kitten", "darkwarm", "nextjoke"}   # lookmoves RESTORED (teacher, 22 Nov: dialogue must make sense: Heart's "Yes, Momo!" answers Momo's line)   # c02silent RESTORED (teacher, 22 Nov: "part 2, 2:18 missing narration": Heart reads the book strip C0.2) # + lookmoves (Stage 1 colour, 22 Nov: the colour lines and the fun facts add ~20 s)   # trial (22 Nov): Part 2 keeps Stage 1's two cuts; Part 1 drops {NAP_BACK} (Basil's rotation line takes its place)
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP13's dare, as written in p3_ep13_script.md section 3 Block B (and EP13's script.py NEXT_DARE), without "Next time:" and
# "Lock in your answer!" (word for word: the recap repeats last time's own words, so it is NOT reworded)
DARE_Q = "The Sun! Every evening, it goes. Every morning, it comes back. Why? One, the Sun moves away. Two, the Earth turns. Three, clouds hide the Sun."
DARE_Q1, DARE_Q2 = "The Sun! Every evening, it goes. Every morning, it comes back. Why?", "One, the Sun moves away. Two, the Earth turns. Three, clouds hide the Sun."
assert DARE_Q1 + " " + DARE_Q2 == DARE_Q
DARE_CARDS = ["The Sun moves away", "The Earth turns", "Clouds hide the Sun"]
DARE_LABEL = "Why does the Sun come back?"
DARE_SHORT = "Why does the Sun come back?"
DARE_CLUES = ["every evening: it goes", "every morning: it comes back"]
CARD1_PICK = "One! I see the Sun move across the sky!"
CARD3_PICK = "Three! It was cloudy last night, so the clouds hid the Sun."          # 22 Nov: was "Three. It was cloudy last night."
NAP_BACK = "Ha! The Sun does not need a nap. We just turn away from it!"          # 22 Nov: was "Ha! No nap for the Sun!"
# Block B: the dare into EP15 (plan row 15, "One mango seed to a tree full of mangoes: 3 stages")
NEXT_DARE = "Next time: a mango! Inside it, there is one big seed. We plant the seed. What will it grow into first? One, a mango. Two, a flower. Three, a young plant. Lock in your answer!"
NEXT_CARDS = ["A mango", "A flower", "A young plant"]
NEXT_JOKE = "Yum! I will eat the mango, and you can keep the seed!"              # 22 Nov: was "Yum! I eat the mango. You keep the seed!"

# the chant (Part 2): call and response, EP7's form (a call on the bar line, its answer on the stomp), YOUR TURN! after each line, no
# all-together bar (script segment 11): line 1 the day-and-night ring flashes; line 2 the chicken ring; line 3 the two tick boxes, then the
# green tag A CYCLE. Basil's voice leads the first beat of each line (make_voice.py: his call is a little louder). Left as written (a chant).
CHANT = [("Day, night!", "Round and round!"), ("Egg, chick!", "Round and round!"), ("Change, repeat!", "That's a cycle!")]
CHANT_CAPS = ([1.0, 1.0, 1.1], [1.25, 1.25, 1.25])   # longest each call / answer may be (s)
CHANT_TOGETHER = False
# how the TTS should say a word for every line (the caption / script text is unchanged). EP14: none (the verb "live" in j1003 goes through
# ../sg_pron.py as every line does: "leev"; "Living" / "living" / "Life" are untouched by it). One line's own respelling is its opts "pron".
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys: softer and slower
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER: Heart describes what we SEE, slowly
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)            # a new term's pop: 2.0 s on screen; Heart waits at least .6 s
STRIP = 3.5                                         # a book sentence's cream strip: at least 3.5 s on screen
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]  # a look-closer's one verdict tag, held 2.5 s before the pull back

def kwrecap(words):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w)
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .4, "quiet": True})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
# the ending, exactly as EP1 round 3 (notes 14-16): "Say it with us!", 0.8 s, "Ready?", "One!", "two!", "Now you know!" 1.0 s apart, the blast, the outro
NYK = [("scene", "nyk"),
 ("unison", "u1300", "Say it with us!", {"pre": .7}), ("wait", .8),
 ("say", "h1304a", H, "Ready?", {"pre": 0}),
 ("say", "h1304o", H, "One!", {"pre": .45}),
 ("say", "h1304t", H, "two!", {"after": ["h1304o", 1.0]}),
 ("say", "h1305", H, "Now you know!", {"after": ["h1304t", 1.0], "shout": True}),
 ("unison", "u1305", "Now you know!", {"sync": True, "crowd": "h1305"}),
 ("wait", 5.2)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .5}), ("wait", .8), ("chant", "c1003"), ("wait", .4)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .90})]
LOCK = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]

SEQ1 = [
 # ---- 1 · silent cold open: an HDB flat before sunrise (6 s). 0:02 EP13's three dare boards slide in; 0:04 the buddies pop in, the Sun's first edge
 ("scene", "cold"), ("wait", 2.0), ("mark", "boardsIn"), ("wait", 2.0), ("mark", "budsIn"), ("mark", "sunedge"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP13's dare, word for word (one calm picture: each board steps forward as Heart says its card, >= 2.5 s each), then the title
 ("scene", "lasttime"),
 ("say", "g201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "g202", H, DARE_Q1, {"pre": .3}),
 ("say", "g203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "g204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "title2" in CUTS else 2.2),   # title2 cut: both slams land by .55 s; a shorter hold
 # ---- 3 · the game, and the hidden owl (Heart names it; ONE smooth push-in from the living room onto the owl on its branch)
 ("scene", "game"),
 ("say", "g301a", H, "A little owl is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "g301m", M, "It hides somewhere new each time, so keep your eyes open!", {"pre": .3, "post": .1}),
 # the buddies in colour (script 12.3, teacher 22 Nov): said once, lightly, as the three pop in for the rules; no card, no pause
 ("say", "g301c", M, "Did you notice? I have my colours now! The creator finally had the budget to paint me.", {"pre": .4, "post": .1, "kw": [["twirl", "colours"]]}),
 ("say", "g301p", P, "I am staying grey, and I love it. Real chinchillas are grey, you know!", {"pre": .3, "post": .1}),
 ("say", "g301t", B, "And I am teal now. I think I look very handsome today.", {"pre": .3, "post": .2, "kw": [["handsome", "handsome"]]}),
 ("say", "g301b", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Pip reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "g401", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", P, "Day and night.", {"pre": .3, "post": .3}),
 ("say", "g403", P, "What a cycle is.", {"pre": .3, "post": .3}), ("say", "g404", P, "Cycle or not?", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: the dare from EP13 (a short 3 s ring: the answer was locked in at the end of EP13)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "g502", H, "Locked in!", {"pre": 0}),
 ("say", "g503", M, CARD1_PICK, {"pre": .5}),
 ("say", "g504", P, CARD3_PICK, {"pre": .4}),
 ("say", "g505", B, "Two! The Earth turns, just like my spinning globe!", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · [LOOK CLOSER] the sky from our window, two days, speeded up: bright, dark (a clear night: no clouds, no Sun), bright, dark
 ("scene", "lcsky"),
 ("say", "g601", H, "Look closer. This is the sky from our window, speeded up.", {**LC, "gap": .6, "pre": 1.2, "kw": [["clk0", "speeded"]]}),
 ("say", "g602p", P, "First, the Sun comes up behind the blocks, and the sky gets bright. That is day time!", {"pre": .1, "kw": [["sunup", "up"], ["tagday", "day"]]}),
 ("wait", .2), ("mark", "dusk"), ("wait", .7),   # the clock pill runs to Monday 7:30 pm: the light turns warm, the sky orange, deep blue
 ("say", "g603b", B, "Then the sky goes dark, and the lamps come on. That is nighttime: pyjama time!", {"pre": 0, "kw": [["lampson", "lamps"], ["tagnight", "nighttime"]]}),
 ("wait", .2), ("mark", "stars"), ("wait", .5),
 ("say", "g605", P, "Look, there are no clouds tonight, and still no Sun. So clouds are not hiding the Sun!", {"pre": 0, "kw": [["noclouds", "clouds"], ["nosun", "sun", 0]]}),
 ("wait", .7),   # hold on the starry sky
 ("mark", "tue7"), ("wait", .3),
 ("say", "g607b", B, "Then it is morning again, and night again. Day, night, day, night: it changes, and it repeats!", {"pre": .1, "kw": [["tue730", "night", 0], ["row1", "day", 0], ["row2", "night", 1], ["row3", "day", 1], ["row4", "night", 2]]}),
 ("mark", "wed7"), ("wait", .6),
 *VERDICT("v_sky"),
 # ---- 7 · the curtains; [LOOK CLOSER] the globe and the torch (the torch stays still; the red dot turns into the light and out of it); the answer
 ("scene", "curtains"), ("mark", "curtains"),
 ("say", "g701m", M, "But why does it keep repeating?", {"pre": .5}),
 ("say", "g701", H, "Look closer.", {"pre": .3, "kw": [["sticker", "closer"]]}),
 ("scene", "lcglobe"),
 ("wait", 1.1), ("mark", "torchon"), ("wait", .6),   # the push-in; a hand switches the torch on: half of the globe is lit
 ("say", "g702", H, "A globe is our Earth. A torch is our Sun. The red dot is Singapore.", {**LC, "gap": .55, "pre": 0, "kw": [["lab_earth", "earth"], ["lab_sun", "sun"], ["lab_sg", "singapore"]]}),
 ("wait", .2),
 ("say", "g703p", P, "Watch. The torch stays still, and only the globe turns.", {"pre": 0, "kw": [["pin", "still"], ["turn", "turns"]]}),
 ("wait", .2), ("mark", "dday"), ("wait", .2),
 ("say", "g704b", B, "The red dot faces the torch, so it is day time.", {"pre": 0}),
 ("wait", .3), ("mark", "ddark"), ("wait", .2),
 ("say", "g705m", M, "Now it turns away, into the dark, so it is nighttime!", {"pre": 0, "kw": [["dnight", "nighttime"]]}),
 ("wait", .3),
 ("say", "g706b", B, "It keeps turning, so the red dot comes into the light again.", {"pre": .1, "kw": [["dlight", "light"]]}),
 ("wait", .5),
 *VERDICT("v_globe"),
 ("scene", "globeans"), ("mark", "curtainsopen"),
 ("say", "g707", H, "The answer is two: the Earth turns! Two fingers? One finger up!", {"pre": .5, "kw": [["ansglow", "two"], ["ticks", "earth"], ["coin1", "one", 0]]}),
 ("say", "g708", H, "Scientists call this turning: rotation.", {"pre": .4, "term": ["rotation"], "kw": [["kw_rotation", "rotation"]]}),
 HOLD("kw_rotation"),
 ("say", "g709r", B, "Rotation means the Earth spins round and round, like my globe when I flick it!", {"pre": .2, "post": .2}),
 *cut("napback", [("say", "g709", B, NAP_BACK, {"pre": .2, "post": .2})]),
 # ---- 8 · "It only looks as if it moves!"
 ("scene", "momo"),
 *cut("lookmoves", [("say", "g801", M, "Oh! So the Sun only looks as if it moves!", {"pre": .4})]),
 ("say", "g802", H, "Yes, Momo!" if "yesmomo" in CUTS else "Yes, Momo! We are the ones turning.", {"pre": .3, "post": .1}),
 *cut("mrt", [("say", "g803b", B, "It is like riding the MRT. The trees outside seem to move, but we are the ones moving!", {"pre": .3, "post": .3})]),
 # ---- 9 · BE THE LITTLE RED DOT (the first-person journey): one full turn of the Earth
 ("scene", "waitw"),
 ("say", "g901", H, "Be the little red dot! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jdot"),
 ("say", "g902", H, "You are a tiny dot on the Earth: Singapore.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "jday"),
 ("say", "g903", H, "Your side of the Earth faces the Sun, so it is day time!", {**SLOW, "pre": .2, "post": .8}),
 ("mark", "jturn"),
 ("say", "g904", H, "The Earth turns, and you turn away from the Sun. Now it is nighttime, and you can see the stars!", {**SLOW, "pre": .2, "post": .8, "kw": [["jaway", "away"], ["jnight", "nighttime"], ["jstars", "stars"]]}),
 ("mark", "jback"),
 ("say", "g905", H, "The Earth keeps turning, and the light comes back. Good morning!", {**SLOW, "pre": .2, "kw": [["jlight", "light"], ["jmorning", "morning"]]}),
 ("wait", 1.0),
 # ---- 10 · pull back out to the living room in full morning light; Mark Sentence 1 (Basil, C0.3, both sentences)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "mark1"),
 ("say", "g1001", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1002", B, "The repeated change between day and night is caused by the rotation of the Earth. This rotation takes 24 hours.", {"pre": 0, "gap": .6, "pron": {"24": "twenty-four"}}),
 ("wait", 2.5),
 ("say", "g1003p", P, "So one full turn takes 24 hours: one day and one night!", {"pre": .2, "post": .2, "pron": {"24": "twenty-four"}}),
 # ---- 11 · what a cycle is: the board CYCLE CHECK (two ticks; the ring closes; A CYCLE; CYCLE pops on "cycle"); Mark Sentence 2 (Momo, C0.1)
 ("scene", "cyclecheck"), ("mark", "boardIn"),
 ("say", "g1104p", P, "Let me check. Day changes into night, so it changes. It happens again and again, so it repeats!", {"pre": .5, "kw": [["tileday", "day", 0], ["tilenight", "night", 0], ["tick1", "changes", 1], ["ringrun", "again", 0], ["tick2", "repeats"]]}),
 ("say", "g1105b", B, "The same changes, again and again, like my school week. That is a repeated pattern!", {"pre": .2}),
 ("say", "g1101", H, "Yes, Basil! A repeated pattern of change is called a cycle.", {"pre": .3, "term": ["cycle"], "kw": [["tagcycle", "called"], ["kw_cycle", "cycle"]]}),
 HOLD("kw_cycle"),
 ("scene", "mark2"),
 ("say", "g1102", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1103", M, "Cycles are repeated patterns of change. They happen in living and non-living things.", {"pre": 0, "gap": .6}),
 ("wait", .3), ("mark", "kw_repeated_pattern"), ("wait", 2.2), HOLD("kw_repeated_pattern"),   # REPEATED PATTERN pops after the last word; the card holds 2.5 s
 # ---- 12 · HOLD ON! Basil: "My pencil ... is a cycle!" (a bad rule: the child crosses their arms)
 ("scene", "holdon"), ("mark", "tilesoff"),
 ("say", "g1201", B, "My pencil gets shorter and shorter, so it changes. That means it is a cycle!", {"pre": .5, "post": .2, "kw": [["pen1", "pencil"], ["pen2", "shorter", 0], ["pen3", "shorter", 1]]}),
 ("say", "g1202", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "g1203", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "g1205p", P, "The pencil changes, but it never grows long again, so the change does not repeat.", {"pre": .3, "post": .2, "kw": [["penrow", "pencil"], ["penchg", "changes"], ["pentag", "not"]]}),
 *cut("pencilback", [("say", "g1204", B, "Oops! You are right, Pip. My pencil is not a cycle!", {"pre": .3, "post": .2})]),
 # ---- 13 · Pip finds one: [LOOK CLOSER] the traffic light at the junction below (green, amber, red, green again)
 ("scene", "pipdown"),
 ("say", "g1301", P, "Then look down there, at the traffic light! I think it is a cycle.", {"pre": .4, "post": .1}),
 ("scene", "lclight"), ("mark", "glide"),
 ("say", "g1302", H, "Look closer.", {**LC, "pre": 1.6}),   # pre 1.6: the camera glides through the window and down to the junction
 ("wait", .3),
 ("say", "g1303", H, "Green. Amber. Red. Green again!", {**LC, "pre": 0, "gap": 1.45, "kw": [["lampG", "green", 0], ["lampA", "amber"], ["lampR", "red"], ["lampG2", "green", 1]]}),
 ("wait", .5),
 ("say", "g1304b", B, "It changes and it repeats, just like day and night, so it is a cycle too!", {"pre": .1, "kw": [["lighttiles", "repeats"]]}),
 ("wait", .2),
 *VERDICT("v_light"),
 # ---- 14 · score hand, the owl, the key words
 ("scene", "final"),
 ("say", "g1401", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 # the reveal ends with a surprising, TRUE fact linked to the topic (SERIES_FORMAT 4, teacher 22 Nov), a buddy says it with a labelled
 # picture (ff_day: an owl asleep in the day, ff_night: the owl awake at night), then Heart: "Tell someone at home!"
 ("say", "g1402", H, "Did you spot the owl? It was on the tree outside the window!", {"pre": .6, "post": .2}),
 ("say", "g1403", M, "Here is a fun fact! Most owls sleep in the day and wake up at night. Our day time is their bedtime!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_day", "day"], ["ff_night", "night"]]}),
 ("say", "g1404", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Rotation", "Cycle", "Repeated pattern"]),
 # ---- 15 · the cliffhanger: do living things have cycles too? (a hen, a chick, a teddy bear slide in; PART 2 slams in)
 ("scene", "cliff"), ("wait", .3),
 ("say", "g1501", M, "The Earth is non-living. Do living things have cycles too?", {"pre": .3, "kw": [["q", "living", 0]]}),
 ("say", "g1502", H, "Good question, Momo! A hen, a chick and a teddy bear will show us.", {"pre": .3, "kw": [["card1", "hen"], ["card2", "chick"], ["card3", "teddy"]]}),
 ("say", "g1503", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 16 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "and" and "But"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "j101", H, "Last time, we saw day, night, day, night. That is a cycle, and it repeats because the Earth turns. But do living things have cycles too?", {"pre": .4, "post": 1.6, "gap": .75, "kw": [["pic2", "and"], ["pic3", "but"]]}),
 # ---- 2 · the new place (a community garden beside an HDB block), the game, and the hidden ladybird (one smooth push-in onto the real leaf)
 ("scene", "place"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "j201a", H, "A little ladybird is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "j201b", B, "Maybe it is on a leaf, or on a flower. Keep looking!", {"pre": .3, "post": .2}),
 ("say", "j201c", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Basil reads the three cards)
 ("scene", "goals"), ("say", "j301", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j302", B, "Cycles in living things.", {"pre": .3, "post": .3}),
 ("say", "j303", B, "What a life cycle is.", {"pre": .3, "post": .3}), ("say", "j304", B, "Why life cycles matter.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: which ones are bigger today? (ring 6 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"), ("mark", "photo"),
 ("say", "j401", H, "Round one. Long ago, on Tree Planting Day, a boy planted a young tree. His teddy bear sat beside it. Today, which ones are bigger? One, the boy and the tree. Two, all three. Three, only the tree. Show me with your fingers.", {"pre": .3}),
 *LOCK("r1", 6.0),
 ("say", "j402", H, "Locked in!", {"pre": 0}),
 ("say", "j403", M, "Two! Everything gets bigger with time!", {"pre": .5}),
 ("say", "j404", B, "One! A teddy bear is non-living, so it cannot grow!", {"pre": .4}),
 ("say", "j405", P, "One. I think only living things grow.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] then and now (the boy and the man; the young tree and the tall tree; the teddy bear, the same size); GROW pops
 ("scene", "lcthen"),
 ("say", "j501", H, "Look closer. Here is the same place, then and now.", {**LC, "pre": 1.2, "kw": [["thenpic", "then"], ["nowpic", "now"]]}),
 ("wait", .2),
 ("say", "j502b", B, "Whoa! The boy is a man now, and he is much taller!", {"pre": 0, "kw": [["pair1", "boy"], ["line1", "taller"]]}),
 ("wait", .4),
 ("say", "j503p", P, "And the young tree is a tall tree now, with fruits.", {"pre": 0, "kw": [["pair2", "young"], ["line2", "tall"], ["fruits", "fruits"]]}),
 ("wait", .4),
 ("say", "j504m", M, "But the teddy bear is the same size. Why did it not grow?", {"pre": 0, "kw": [["pair3", "teddy"], ["line3", "same"]]}),
 ("wait", .2),
 ("say", "j505p", P, "Because it is non-living. Living things grow over time, and non-living things do not.", {"pre": .1, "kw": [["tagnon", "non-living", 0], ["tagliving", "living", 0], ["kw_grow", "grow", 0]]}),
 HOLD("kw_grow"),
 ("say", "j507b", B, "Growing means getting bigger, like my height marks on the door!", {"pre": .1}),
 *VERDICT("v_then"),
 ("scene", "thenans"),
 ("say", "j506", H, "The answer is one: the boy and the tree grew bigger! One finger? One finger up!", {"pre": .5, "post": .3, "kw": [["ansglow", "one", 0], ["coin1", "one", 2]]}),
 # ---- 6 · [LOOK CLOSER] one chick, week after week (it grows into an adult chicken; it has chicks of its own); REPRODUCE pops; the strip C0.2
 ("scene", "lcchick"), ("mark", "wk1"),
 ("say", "j601", H, "Look closer. Here is one chick. Week after week, it grows.", {**LC, "pre": 1.4, "kw": [["labsame", "chick"], ["wk6", "week", 0]]}),   # pre 1.4: the camera glides low across the grass
 ("wait", 1.0), ("mark", "wk12"), ("wait", 2.6),
 ("say", "j602m", M, "It is so big now. Is it an adult chicken?", {"pre": 0, "kw": [["wk24", "it", 0]]}),
 ("wait", .3), ("mark", "nestwalk"),
 ("say", "j602p", P, "Yes! It is fully grown, so we call it an adult.", {"pre": .1}),
 ("wait", .3), ("mark", "settle"), ("wait", 1.0), ("mark", "later3"), ("wait", .8), ("mark", "chicksout"), ("wait", .8),
 ("say", "j603b", B, "And look! It has chicks of its own. Its young are its babies!", {"pre": 0, "kw": [["labyoung", "young"]]}),
 ("wait", .2),
 ("say", "j604", H, "Living things reproduce and have young.", {**LC, "pre": 0, "term": ["reproduce"], "kw": [["kw_reproduce", "reproduce"]]}),
 HOLD("kw_reproduce"),
 ("say", "j606m", M, "What does reproduce mean?", {"pre": .1, "post": .1}),
 ("say", "j606b", B, "It means making more of your own kind. Now there are more chickens!", {"pre": .2}),
 *VERDICT("v_chick"),
 ("scene", "strip"), ("mark", "strip"),
 *(cut("c02silent", [("say", "j605", H, "Cycles in living things happen when living things grow and have young. Their life cycles follow a repeated pattern of change.", {"pre": .5, "hold": STRIP, "post": .2})]) or [("wait", 3.8)]),
 # ---- 7 · BE A CHICK (the first-person journey): inside the egg, the hatch, growing, the adult and her egg, a new chick
 ("scene", "waitw"),
 ("say", "j701", H, "Be a chick! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jegg"),
 ("say", "j702", H, "You are a chick, inside an egg." if "darkwarm" in CUTS else "You are a chick, inside an egg. It is dark and warm in here.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "jhatch"),
 ("say", "j703", H, "Crack! Light comes in, and you hatch.", {**SLOW, "pre": .2, "post": .8, "kw": [["jcrack", "crack"], ["jlight", "light"], ["jout", "hatch"]]}),
 ("mark", "jgrow"),
 ("say", "j704", H, "You eat, and you grow, week after week.", {**SLOW, "pre": .2, "post": .8, "kw": [["jpeck", "eat"], ["jrise", "grow"]]}),
 ("mark", "jadult"),
 ("say", "j705", H, "Now you are an adult chicken. You lay an egg.", {**SLOW, "pre": .2, "post": .8, "kw": [["jnest", "adult"], ["jlay", "egg"]]}),
 ("mark", "jagain"),
 ("say", "j706", H, "Tap, tap, tap. A new chick hatches, and round we go again!", {**SLOW, "pre": .2, "kw": [["jtap1", "tap", 0], ["jtap2", "tap", 1], ["jtap3", "tap", 2], ["jnew", "new"]]}),
 ("wait", 1.0),
 # ---- 8 · pull back out; the ring closes (egg, chick, adult chicken, egg again: A LIFE CYCLE; LIFE CYCLE pops); Mark Sentence 1 (Basil, 4.2)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "ring"),
 ("say", "j801p", P, "First an egg, then a chick, then an adult chicken, and then an egg again!", {"pre": .5, "post": .1, "kw": [["tegg", "egg", 0], ["tchick", "chick"], ["tadult", "adult"], ["tback", "egg", 1]]}),
 ("say", "j801", H, "It goes round and round: that is a life cycle!", {"pre": .2, "term": ["life cycle"], "kw": [["tick1", "round", 0], ["tick2", "round", 1], ["tagcycle", "that"], ["kw_life_cycle", "life"]]}),
 HOLD("kw_life_cycle"),
 ("scene", "mark1"),
 ("say", "j802", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j803", B, "A life cycle is a repeated pattern of change as a living thing grows over time and reproduces.", {"pre": 0}),
 ("wait", 2.5),
 *cut("kitten", [("say", "j804m", M, "I was a tiny kitten once, and now I am growing. Do I have a life cycle too?", {"pre": .2, "post": .1}),
  ("say", "j804", H, "Yes, Momo! Cats have a life cycle too, and so do you!", {"pre": .2, "post": .2})]),
 # ---- 9 · Showdown: Pip's notes (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j901", H, "Showdown! Double points. Pip's notes have one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("say", "j902", P, "Here are my notes! Two: a life cycle ends at the adult." if "notes13" in CUTS else "Here are my notes! One: day and night are a cycle. Two: a life cycle ends at the adult. Three: a teddy bear has no life cycle.", {"pre": .4, "post": .2, "kw": ([] if "notes13" in CUTS else [["l1", "one"], ["l3", "three"]]) + [["l2", "two"]]}),
 *LOCK("show", 6.0),
 ("say", "j903", H, "Locked in!", {"pre": 0}),
 ("say", "j904", B, "Two! The adult lays an egg, so round it goes again!", {"pre": .5}),
 ("say", "j905", M, "Two! A life cycle repeats, so it does not end at the adult!", {"pre": .4, "post": .2}),
 ("scene", "fix"), ("wait", .3), ("mark", "strike"), ("wait", .5), ("mark", "bend"), ("wait", .8),   # line 2 struck through, rewritten in green; its drawing bends into a ring
 ("say", "j906", H, "Two fingers? Put up two more on your score hand!", {"pre": .2, "post": .3, "kw": [["coin2", "two", 1]]}),
 *cut("forgotegg", [("say", "j907", P, "Oops! I forgot that the adult lays an egg!", {"pre": .3, "post": .3})]),
 # ---- 10 · [LOOK CLOSER] three chickens together (a grandmother hen, a mother hen, a chick), and Mark Sentence 2 (Momo, 4.1 third sentence)
 ("scene", "lchens"),
 ("say", "j1001", H, "Look closer.", {**LC, "pre": 1.4}),
 ("say", "j1001b", B, "It is like a chicken family photo: a grandmother hen, a mother hen and a chick!", {"pre": .1, "kw": [["h_gm", "grandmother"], ["h_m", "mother"], ["h_c", "chick"]]}),
 ("say", "j1001m", M, "So chickens come again and again, all of the same kind!", {"pre": .1, "post": .2, "kw": [["heads", "chickens"]]}),
 ("wait", .6),
 *VERDICT("v_hens"),
 ("scene", "mark2"),
 ("say", "j1002", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j1003", M, "Life cycles ensure that living things of the same kind can continue to live on Earth.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 11 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand and the ladybird
 ("scene", "final"),
 ("say", "j1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 # the fun fact (SERIES_FORMAT 4): Pip, step by step, with a labelled picture row (ff_larva, ff_pupa, ff_adult), then Heart's "Tell someone at home!"
 ("say", "j1202", H, "Did you spot the ladybird? It was on a leaf of the young tree!", {"pre": .5, "post": .2}),
 ("say", "j1203", P, "Here is a fun fact! A baby ladybird looks nothing like its parent. It hatches as a spiky larva, like a tiny crocodile. Then it becomes a pupa, and then a ladybird!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_larva", "larva"], ["ff_pupa", "pupa"], ["ff_adult", "ladybird", 1]]}),
 ("say", "j1204", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 13 · the dare for Episode 15 (a mango, one big seed)
 ("scene", "dare"), ("mark", "dareIn"), ("wait", .5),
 ("say", "j1301", H, NEXT_DARE, {"pre": 0}),
 *cut("nextjoke", [("say", "j1302", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 14 · the key words
 *kwrecap(["Grow", "Reproduce", "Life cycle"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
