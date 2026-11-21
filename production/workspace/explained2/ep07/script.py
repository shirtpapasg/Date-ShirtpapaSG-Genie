"""script.py: P3 EP7 "A mushroom is NOT a plant: fungi and bacteria", Part 1 and Part 2: the script (../p3_ep07_script.md) as data.
Every spoken line is exactly as in the script. make_voice.py records the lines; build_tl.py lays them on the timeline.
New pace (SERIES_FORMAT section 3, teacher 20 Nov, as EP6): Heart .90 with .5 s between sentences; buddies 12% slower; a NEW TERM is said a
little slower ("term") with at least .65 s after its sentence; a new key word pops for 2.0 s; Mark Sentence cards hold 2.5 s after Heart
finishes; book sentences on cream strips ("strip") stay at least 3.5 s; the two journeys at .85.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre = silence before it (s), post = silence after it (s), speed, gap,
                                       term = words that make a sentence a NEW TERM (said slower, .65 s after it),
                                       strip = the line is a book sentence on a cream strip: the cursor waits until 3.5 s after it starts
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("chant", id)                        the buddies' chant, call and response: a line, a bar for the viewers ("YOUR TURN!"), three times
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet)
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
# the chant (Part 2): each line is a call on the first clap and its answer from the second clap (line 3: on the stomp); YOUR TURN! after
# each line; no all-together bar (script segment 10)
CHANT = [("Fungi!", "Cannot make their own food!"), ("Bacteria!", "Tiny living things!"), ("Useful or harmful?", "Both can be!")]
CHANT_CAPS = ([.62, .66, 1.2], [1.9, 1.5, 1.05])
# how the TTS should say a word (the caption/script text is unchanged). espeak says every EP7 word correctly (checked 20 Nov:
# tempeh = TEM-pay, yoghurt, bacterium, microscope, dispersed); "fungi" stays as in EP4 and EP6.
PRON = {}
SLOW = {"speed": .85, "gap": .65}   # the journeys: softer and slower than Heart's .90 (script section 3: "about 0.85")
STRIP = 3.5                         # a book sentence on a cream strip stays at least this long
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")

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
# a key word pops large .45 s after its sentence, holds 2.0 s, then flies to the shelf (lib.js KW)
KWPOP = lambda mk: [("wait", .45), ("mark", mk), ("wait", 2.0)]
MARKHOLD = ("wait", 2.5)            # a Mark Sentence card holds 2.5 s after Heart finishes reading

LOCK = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]
SEQ1 = [
 # ---- 1 · silent cold open: a kitchen table in an HDB flat (7 s); EP6's two boards slide in at 3 s
 ("scene", "cold"), ("wait", 3.0), ("mark", "coldBoards"), ("wait", 3.5),   # 6.5 s (was 7.0: .5 s of picture-only time given to the goals that Momo now reads)
 # ---- 2 · the callback to Episode 6's dare
 ("scene", "callback"),
 ("say", "g201", H, "Last time, we asked: mould on bread, or yeast for making bread? Both are fungi! Which one is useful?", {"pre": .3}),
 ("say", "g202", B, "Let's find out! One slice of bread. One bag. Ten days!", {"pre": .5, "post": .2}),
 # CUT 1 (script section 6, Part 1 ran 5:18.6): the title card's second slam. Both title lines slam in together at "slam1".
 ("scene", "title"), ("mark", "slam1"), ("wait", 1.9),
 # ---- 3 · the game
 ("scene", "game"),
 # the hidden animal (rulebook section 4, teacher 21 Nov): not always the lizard; Heart NAMES it and its picture shows for a moment. Part 1: a little snail; Part 2: an ant.
 ("say", "g301", H, "You lock in first. One finger for every point. A little snail is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals, READ ALOUD by a buddy (rulebook section 11 step 3, teacher 21 Nov: "make one of the pet buddies read these 3"):
 #      Momo says "Today you'll learn..." and then each card, word for word as printed, about .4 s between cards. Then the countdown.
 ("scene", "goals"),
 ("say", "g401", M, "Today you'll learn...", {"pre": .5}),
 ("say", "g402", M, "How fungi get their food.", {"pre": .53}),
 ("say", "g403", M, "How fungi spread.", {"pre": .53}),
 ("say", "g404", M, "Useful or harmful fungi.", {"pre": .53, "post": .5}),
 *COUNT,
 # ---- 5 · Day 1: seal the bag
 ("scene", "day1"), ("wait", .4),
 ("say", "g501", H, "Day one. A slice of bread goes into a bag. We seal it. It stays shut for ten days.", {"pre": .3, "post": .8}),
 # ---- 6 · ten days (speeded up; the lizard on the fridge during two night sweeps), and HOLD ON!
 # CUT 2 (script section 6): Heart's "Day ten!" over the time-lapse. The DAY 10 pill lands at "day10" in silence.
 ("scene", "days"), ("mark", "lapse0"), ("wait", 7.6), ("mark", "day10"),   # DAY 10 shows from lapse0 + 8 x DAYSTEP (sound_cues.js)
 ("scene", "holdon"),
 ("say", "g602", M, "Ooh, fuzzy! Let me open the bag and sniff it!", {"pre": .4, "post": .3}),
 ("say", "g603", H, "Something is not safe. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK(1)[:-1], ("wait", .6),
 ("say", "g604", H, "Arms crossed? One finger up! Never touch or sniff mould. The bag stays shut.", {"pre": 0, "post": .4}),
 ("say", "g605", M, "Oops. Eyes only!", {"pre": .4, "post": .5}),
 # ---- 7 · what the fuzzy patches are
 ("scene", "patches"),
 # CUT 3 (script section 6): Momo's "Is it dust?"; Heart then says "It is not dust. It grew!" (Momo still has 3 lines, Basil 5)
 ("say", "g702", H, "It is not dust. It grew!", {"pre": .5, "post": .3}),
 ("say", "g703", H, "Bread mould is a fungus that grows on bread.", {"pre": .6, "term": ["bread mould"], "strip": True}),
 *KWPOP("kw_mould"),
 ("say", "g704", H, "One fungus. Many fungi.", {"pre": .6, "term": ["fungus", "fungi"], "post": .8}),
 # ---- 8 · Round 1: how does the mould get its food?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g801", H, "Round one. Living things need food. But nobody fed this mould! How does it get its food? One, it makes its own. Two, from the bread. Three, it needs no food. Show me with your fingers.", {"pre": .1}),
 *LOCK(2),
 ("say", "g802", H, "Locked in!", {"pre": 0}),
 ("say", "g803", P, "Three. Nobody fed it. Maybe it needs no food?", {"pre": .5}),
 ("say", "g804", B, "Two! Living things need food. And the bread is the only food in there!", {"pre": .4}),
 ("mark", "momoFlip"), ("wait", 1.2),    # Momo flips her card (2) and nods; no line
 # ---- 9 · BE A SPORE (the first-person journey)
 ("scene", "waitw"),
 ("say", "g901", H, "Be a spore! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("say", "g902", H, "You are a spore of bread mould. You float in the kitchen air.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "land"),
 ("say", "g903", H, "You land on a slice of bread.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "bag"),
 ("say", "g904", H, "The bag closes. You are already inside!", {**SLOW, "pre": 0, "post": .9}),
 ("mark", "threads"),
 ("say", "g905", H, "You grow thin threads into the bread.", {**SLOW, "pre": 0, "post": .9}),
 ("mark", "substance"),
 ("say", "g906", H, "You make a substance. It breaks the bread down into simpler substances.", {**SLOW, "pre": 0, "post": .9, "term": ["substance"]}),
 ("mark", "absorb"),
 ("say", "g907", H, "You absorb them as food.", {**SLOW, "pre": 0, "post": 1.0, "term": ["absorb"]}),
 ("mark", "patch"),
 ("say", "g908", H, "You grow into a fuzzy patch, and make new spores.", {**SLOW, "pre": 0}),
 ("wait", 1.4),
 # ---- 10 · the reveal, and Mark Sentence 1 (Basil leads)
 ("scene", "reveal"), ("mark", "pullout"), ("wait", .9),
 ("say", "g1001", H, "The answer is two. From the bread!", {"pre": 0, "post": .4}),
 ("scene", "mark1"),
 ("say", "g1002", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 # Mark Sentence cards are READ BY THE BUDDY who says "Say it with me!", never by Heart (rulebook sections 4 and 7, teacher 21 Nov)
 ("say", "g1003", B, "Fungi are living things that do not make their own food. Fungi grow on another object. They produce a substance to break down the other object into simpler substances and absorb them as food.", {"pre": 0, "term": ["absorb"]}),
 MARKHOLD, *KWPOP("kw_absorb"),
 ("say", "g1004", H, "Two fingers? One finger up!", {"pre": .5, "post": .3}),
 # ---- 11 · a mushroom: cap, stalk, gills, spores
 ("scene", "mushroom"),
 ("say", "g1101", H, "A mushroom is a fungus too. The cap. The stalk. And under the cap, the gills.", {"pre": .6, "term": ["cap", "stalk", "gills"]}),
 ("say", "g1102", B, "Nice cap! Can I try it on?", {"pre": .4, "post": .4}),
 ("mark", "gillsdust"),
 ("say", "g1103", H, "Mushrooms have spores that are found in gills under the cap. When the wind blows, the spores are dispersed.", {"pre": .5, "term": ["dispersed"], "strip": True, "post": .4}),
 ("scene", "mark2"),
 ("say", "g1104", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1105", M, "Fungi can reproduce very quickly through spores.", {"pre": 0, "term": ["spores"]}),
 MARKHOLD, *KWPOP("kw_spores"),
 # ---- 12 · Round 2: the dare from Episode 6. Useful or harmful?
 ("scene", "r2card"), ("wait", 1.1),
 ("scene", "r2"),
 ("say", "g1201", H, "Now, the question from last time! Which fungus is useful? One, mould. Two, yeast. Show me your fingers!", {"pre": .1}),
 *LOCK(3, 3.0),
 ("say", "g1202", H, "Locked in!", {"pre": 0}),
 ("unison", "u1203", "Two!", {"pre": .4, "post": .1}),
 ("say", "g1204", B, "Yeast! It makes the dough rise.", {"pre": .4}),
 ("say", "g1205", H, "Yes! Yeast.", {"pre": .4, "post": .3}),
 ("scene", "trays"),
 ("say", "g1206", P, "So are all the other fungi harmful?", {"pre": .5, "post": .3}),
 ("mark", "traysIn"),
 ("say", "g1207", H, "There are some fungi that are useful, while others are harmful to us.", {"pre": .5, "strip": True, "post": .3}),
 ("mark", "b_mush"),
 ("say", "g1208", H, "Edible mushrooms are useful since they are food for us.", {"pre": .5, "term": ["edible"], "strip": True}),
 ("say", "g1209", H, "Never pick wild mushrooms!", {"pre": .6, "post": .3}),
 ("mark", "b_dough"),
 ("say", "g1210", H, "Yeast is another useful fungus as it is commonly used in baking bread to make the dough rise.", {"pre": .5, "term": ["yeast"], "strip": True}),
 *KWPOP("kw_yeast"),
 ("mark", "b_tempeh"),
 ("say", "g1211", H, "Tempeh is made with a useful fungus.", {"pre": .5, "strip": True}),
 ("mark", "b_mould"),
 ("say", "g1212", H, "Bread mould is an example of harmful fungi. Eating mouldy bread can cause us to fall sick.", {"pre": .5, "strip": True}),
 ("say", "g1213", H, "Two fingers? One finger up!", {"pre": .6, "post": .4}),
 # ---- 13 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "g1301", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .6}),
 ("scene", "liz"),
 ("say", "g1302", H, "Did you spot the snail? It was on the window! Is a snail a fungus? Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Bread mould", "Absorb", "Spores", "Yeast"]),
 # ---- 14 · the cliffhanger: clean hands?
 ("scene", "cliff"), ("wait", .6),
 ("say", "g1401", H, "Day ten. The bag goes into the bin, still shut. Then we wash our hands.", {"pre": .3}),
 ("say", "g1402", P, "But they look clean!", {"pre": .5}),
 ("say", "g1403", H, "So what is on them? Find out in Part Two!", {"pre": .5}),
 ("mark", "cliffend"), ("wait", .9),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1-2 · the calm recap (rulebook section 2, teacher 21 Nov: no fast montage). The old silent 4 s montage is gone: three pictures of
 #      Part 1, one at a time, centred and large, each held 2.5 s or more with its own label, UNDER Heart's "Last time..." line
 #      (the Day 10 bag "Bread mould: a harmful fungus" · the risen dough "Yeast: a useful fungus" · the clean hands "We washed our hands. Why?").
 ("scene", "lasttime"), ("wait", .6),
 ("say", "j201", H, "Last time, bread mould grew in our bag: a harmful fungus. Yeast made dough rise: a useful fungus. Then we washed our hands. Why?", {"pre": .5}),
 ("scene", "pipclean"),
 ("say", "j202", P, "They look clean. I see nothing on them!", {"pre": .5}),
 ("say", "j203", H, "Look closer, Pip. We need a microscope!", {"pre": .4, "post": .4}),
 # ---- 3 · today's goals, READ ALOUD by a buddy (rulebook section 11 step 3, teacher 21 Nov): Basil reads the three cards; then the game
 ("scene", "goals"),
 ("say", "j251", B, "Today you'll learn...", {"pre": .5}),
 ("say", "j252", B, "How we see bacteria.", {"pre": .53}),
 ("say", "j253", B, "Harmful or useful bacteria.", {"pre": .53}),
 ("say", "j254", B, "The whole chapter on one map.", {"pre": .53, "post": .5}),
 ("scene", "game"),
 ("say", "j301", H, "Lock in first. A little ant is hiding in this video. Can you spot it?", {"pre": .5, "post": .4}),
 # ---- 4 · the microscope, and bacteria
 ("scene", "microscope"),
 ("say", "j401", H, "A microscope allows us to see very small things.", {"pre": .6, "term": ["microscope"], "strip": True}),
 *KWPOP("kw_microscope"),
 ("scene", "scopes"),
 ("say", "j402", H, "As scientists developed more powerful microscopes, they were able to discover living things that are even smaller than fungi.", {"pre": .5, "strip": True, "post": .4}),
 ("scene", "shapes"),
 ("say", "j403", H, "Bacteria! Rod-shaped. Sphere-shaped. Spiral-shaped.", {"pre": .5, "term": ["rod-shaped", "sphere-shaped", "spiral-shaped"]}),
 ("say", "j404", H, "One bacterium. Many bacteria.", {"pre": .6, "term": ["bacterium", "bacteria"], "post": .6}),
 ("say", "j405", H, "Bacteria are tiny living things and they come in different shapes and sizes.", {"pre": .6, "strip": True}),
 # ---- 5 · BE A BACTERIUM (the first-person journey)
 ("scene", "waitw"),
 ("say", "j501", H, "Be a bacterium! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("say", "j502", H, "You are one bacterium. Rod-shaped. Far too small to see.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "hills"),
 ("say", "j503", H, "You sit on a fingertip. Its lines are like hills.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "recess"),
 ("say", "j504", H, "It is recess. The hand reaches for a sandwich.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "wash"),
 ("say", "j505", H, "But first: water! Soap! The bubbles lift you off.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "drain"),
 ("say", "j506", H, "Whoosh! Down the drain you go.", {**SLOW, "pre": 0, "post": .9}),
 ("mark", "clean"),
 ("say", "j507", H, "Now the hand is ready for food.", {**SLOW, "pre": 0}),
 ("wait", 1.2),
 ("scene", "pullout"), ("wait", .3),
 ("say", "j508", B, "Bye-bye, bacteria! Soap wins!", {"pre": .2, "post": .4}),
 # ---- 6 · harmful bacteria: wash your hands
 ("scene", "harmful"),
 ("say", "j601", H, "Bacteria can be harmful when they cause you to fall sick.", {"pre": .5, "term": ["harmful"], "strip": True}),
 *KWPOP("kw_harmful"),
 ("say", "j602", H, "So wash your hands with soap before you eat.", {"pre": .5, "post": .6}),
 # ---- 7 · Round 1: are all bacteria harmful? (Part 2's hidden animal, an ant, walks by the soap pump in the scene before, `harmful`)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j701", H, "Round one. Are all bacteria harmful? One, yes. Two, no. Show me with your fingers.", {"pre": .1}),
 *LOCK(1),
 ("say", "j702", H, "Locked in!", {"pre": 0}),
 ("say", "j703", B, "One! Bacteria make us sick. Wash them all away!", {"pre": .5}),
 ("say", "j704", M, "Two! Some fungi are useful. Maybe some bacteria are too.", {"pre": .4}),
 ("say", "j705", P, "Two. I think my yoghurt has some.", {"pre": .4, "post": .4}),
 ("scene", "yoghurt"), ("wait", 1.0),
 ("say", "j706", H, "The answer is two.", {"pre": .2, "post": .3}),
 ("scene", "mark1"),
 ("say", "j707", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j708", B, "Some bacteria are harmful, while others are useful to us.", {"pre": 0, "term": ["useful"]}),
 MARKHOLD, *KWPOP("kw_useful"),
 ("scene", "body"),
 ("say", "j709", H, "Useful bacteria in our body help us to break down food.", {"pre": .5, "strip": True}),
 ("say", "j710", H, "Yoghurt and yoghurt drinks have useful bacteria like these.", {"pre": .6}),
 ("say", "j711", H, "Two fingers? One finger up!", {"pre": .6, "post": .4}),
 # ---- 8 · Showdown: Pip's table of clues (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j801", H, "Pip's homework! Read the table. A has spores, and makes its own food. B has spores, and cannot make its own food. C has feathers, and cannot make its own food.", {"pre": .4}),
 ("say", "j802", P, "My answers. One: A is a fungus. Two: B is a fungus. Three: C is a bird.", {"pre": .5, "post": .3}),
 ("say", "j803", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK(2, 6.0),
 ("say", "j804", H, "Locked in!", {"pre": 0}),
 ("say", "j805", B, "One! A makes its own food. So A is a plant, like a fern!", {"pre": .5}),
 ("say", "j806", M, "One! Spores alone do not decide.", {"pre": .4}),
 ("say", "j807", P, "Oops!", {"pre": .4, "post": .3}),
 ("scene", "fixed"),
 ("say", "j808", H, "Read every column. Spores, and cannot make its own food: a fungus.", {"pre": .8}),
 ("say", "j809", H, "One finger? Put up two more on your score hand!", {"pre": .6, "post": .4}),
 # ---- 9 · the whole chapter on one map
 ("scene", "map"),
 ("say", "j901", H, "Now, the whole chapter on one map! Living things.", {"pre": .5}),
 ("say", "j902", H, "Plants: flowering, and non-flowering.", {"pre": .6}),
 ("say", "j903", H, "Animals: amphibians, birds, fish, insects, reptiles, mammals.", {"pre": .6}),
 ("say", "j904", H, "Fungi. And bacteria.", {"pre": .6}),
 ("say", "j905", H, "Fungi and bacteria are also living things.", {"pre": .7, "strip": True, "post": .3}),
 # ---- 10 · the chant (call and response; no all-together bar)
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · Exam corner (Pip leads)
 ("scene", "exambanner"),
 ("say", "j1101", H, "Exam corner!", {"pre": .3, "post": .2}),
 ("scene", "mark2"),
 ("say", "j1102", P, "Say it with me!", {"pre": .5}), ("wait", .8),
 ("say", "j1103", P, "Living things can be classified based on common observable characteristics. Scientists have classified different living things into groups such as plants, animals, fungi and bacteria.", {"pre": 0}),
 MARKHOLD,
 # ---- 12 · score hand and the lizard
 ("scene", "final"),
 ("say", "j1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1202", H, "Did you spot the ant? It was by the soap! Can you see an ant without a microscope? Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 13 · the dare for Episode 8
 ("scene", "dare"), ("wait", .3),
 ("say", "j1301", H, "Next time, something new: materials! A plastic box, a metal box and a glass jar. One of them was made from sand. Which one? Lock in your answer!", {"pre": 0, "post": .3}),
 ("say", "j1302", B, "Sand? In my snack box? Crunchy!", {"pre": .4, "post": .5}),
 # ---- 14 · the key words
 *kwrecap(["Microscope", "Harmful", "Useful"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
