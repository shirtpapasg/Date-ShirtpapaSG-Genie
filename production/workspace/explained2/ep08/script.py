"""script.py: P3 EP8 "What's your snack box made of? The 7 materials", Part 1 ("This Jar Was Once SAND! What Are Things Made Of?")
and Part 2 ("Your School Shoe Came from a TREE? The 7 Materials"): the script (../p3_ep08_script.md, Part 1 Segment 2 as updated on
2026-11-20 to open from EP7's dare) as data. Every spoken line is word for word as in the script; a few long cells are split into two
consecutive lines (same words, same order) so a key word, a book strip or a cut can hang on its own line.
make_voice.py records the lines; build_tl.py lays them on the timeline.

New pace (SERIES_FORMAT.md section 3, teacher 2026-11-20, as EP6): Heart speed .90, .5 s between sentences; buddies 12% slower;
a sentence that says a NEW TERM (opts "term") is said a little slower and followed by at least .65 s; a key word / material name pops
large and holds 2.0 s ("hold" item: the next line waits until the pop has held 2.0 s and at least .6 s after the line); Mark Sentence
cards hold 2.5 s after Heart's last word; book sentences on cream strips stay up at least 3.5 s (opts "hold").

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre / post = silence before / after (s; build_tl scales them by .75 as in EP5),
                                       speed, gap, soft (journeys: Heart softer), term (substrings: sentences said slowly, then >= .65 s),
                                       kw: [[mark, word, nth]] (a mark at that word's onset: a key word or material name pops there),
                                       hold: s (the cursor goes on no earlier than the line's start + s: a cream strip's 3.5 s),
                                       holdw: [word, s] (no earlier than that word + s: a word strip such as "kiln"), after: [id, s]
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd)

Marks the picture and the sound use: kw_* (shelf key words), nm_* (material names that pop and hop to the board: GLASS, METAL,
PLASTIC, WOOD; CERAMIC, RUBBER and FABRIC are shelf key words whose copy hops to the tile), tile_* (that tile fills on the board),
uses_* (the small "uses" picture boards), ring0_* / bell_* (lock-in timers), and the journey stops.

CUTS: SERIES_FORMAT section 3 / script section 6. Put a tag in CUTS to drop that non-teaching beat (rebuild the timeline after).
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
# ---- cuts (script section 6, in its order). Part 1: goals, biscuits, boxlines, glassuses. Part 2: recap, together, rubberuses, planks.
CUTS = {"recap", "boxlines", "glassuses", "rubberuses"}   # boxlines / glassuses / rubberuses: script section 6 (non-teaching), cut on 2026-11-21 to make room for the LOOK-CLOSER moments. "recap": teacher, 2026-11-21 (SERIES_FORMAT section 2): no fast recap montage; the calm recap pictures are under j201 ("Last time...")
cut = lambda tag, items: [] if tag in CUTS else items

# the chant (Part 2): the seven names in the book's order, one name per beat (clap, clap, stomp); YOUR TURN! after each line; then all together
CHANT = [["Wood!", "Metal!", "Ceramic!"], ["Rubber!", "Glass!"], ["Plastic!", "Fabric!"]]
CHANT_BEATS = [[0, .25, .5], [0, .5], [0, .5]]          # where each word starts, in bars
CHANT_CAPS = [[.42, .42, .78], [.62, .7], [.62, .7]]    # longest each word may be (s)
CHANT_TOGETHER = "together" not in CUTS
# how the TTS should say a word (the caption/script text is unchanged)
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys: softer and slower (script: about .85, about 1.0 s between sentences)
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)            # a new term's pop: 2.0 s on screen; Heart waits at least .6 s
STRIP = 3.5                                         # a book sentence's cream strip: at least 3.5 s on screen
# LOOK CLOSER (teacher, 2026-11-21, SERIES_FORMAT section 1b): a slow zoom-in on the real thing with the evidence shown happening. Heart describes
# what we SEE, slowly, in short sentences (LC), then the book's words; the close-up holds 6-10 s and ends on ONE verdict tag (mark v_*).
# Scenes named lc*: the score and the shelf are away. Never cut for length.
LC = {"speed": .87, "gap": .6}

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
 # ---- 1 · silent cold open: the school canteen at recess (7 s). 0:03 the board slides in; 0:05 Pip and Basil pop in
 ("scene", "cold"), ("wait", 2.6), ("mark", "boardIn"), ("wait", 1.8), ("mark", "budsIn"), ("wait", 1.6),   # 6.0 s (was 7.0): the buddies now read the goals and the Mark Sentences, so 1.5 s of silent picture time was trimmed to stay under 5:15
 # ---- 2 · the new chapter, and the question (opens from EP7's dare)
 ("scene", "callback"),
 ("say", "g201", H, "Last time, we asked: a plastic box, a metal box and a glass jar. One of them was made from sand! Which one?", {"pre": .3}),
 ("say", "g202", H, "We have sorted living things. Now, non-living things. What are they made of?", {"pre": .5, "post": .3}),
 ("scene", "hook"),
 ("say", "g203", H, "A plastic box. A metal box. A glass jar. Did you lock in your answer?", {"pre": .4}),
 ("mark", "title"), ("wait", 2.1),
 # ---- 3 · the game
 ("scene", "game"),
 ("say", "g301", H, "You against the Buddies! Lock in first. One finger for every point. A little sparrow is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals (no voice) and the countdown
 # teacher, 2026-11-21 (SERIES_FORMAT section 11, step 3): a buddy READS the three goal cards aloud, word for word as printed (Part 1: Pip)
 ("scene", "goals"), ("say", "g401", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", P, "Objects and materials.", {"pre": .3, "post": .3}),
 ("say", "g403", P, "Four of the seven materials.", {"pre": .3, "post": .3}), ("say", "g404", P, "Where each one comes from.", {"pre": .3, "post": .9}),
 *COUNT,
 # ---- 5 · object and material: the spoon
 ("scene", "spoon"),
 ("say", "g501", H, "Look at this spoon. A spoon is an object: a thing you use.", {"pre": .4, "term": ["is an object"], "kw": [["kw_object", "object"]]}),
 HOLD("kw_object"),
 ("say", "g502", H, "What is it made of? Metal! Metal is its material.", {"pre": .2, "term": ["its material"], "kw": [["kw_material", "material"]]}),
 HOLD("kw_material"),
 ("scene", "mark1"),
 ("say", "g503", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 # teacher, 2026-11-21 (SERIES_FORMAT sections 4 and 7): the buddy who says "Say it with me!" READS the Mark Sentence card; Heart never reads a card
 ("say", "g504", P, "Materials are used to make objects. Objects are things you use for different purposes.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 6 · HOLD ON! Basil's rule
 ("scene", "listcard"), ("wait", 1.1),
 ("scene", "rule"),
 ("say", "g601", B, "My rule! A window is made of glass. So a window is a material!", {"pre": .6, "post": .4}),
 ("say", "g602", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .6),
 ("say", "g603", H, "Arms crossed? One finger up! Glass is the material. The window is the object.", {"pre": 0, "post": .4}),
 ("say", "g604", B, "Oops! Window: object. Glass: material!", {"pre": .4, "post": .5}),
 # ---- 7 · Round 1: which one was made from sand?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g701", H, "Round one. Which one was made from sand? One, the plastic box. Two, the metal box. Three, the glass jar. Show me with your fingers.", {"pre": .1}),
 *LOCK("r1"),
 ("say", "g702", H, "Locked in!", {"pre": 0}),
 ("say", "g703", M, "Two! Metal comes from the ground. So does sand!", {"pre": .5}),
 ("say", "g704", P, "Three. Sand has tiny clear grains.", {"pre": .4}),
 ("say", "g705", B, "Three! Very hot sand can melt. Like ice cream, but much hotter!", {"pre": .4, "post": .5}),
 # ---- 8 · BE A GRAIN OF SAND (the first-person journey)
 ("scene", "waitw"),
 ("say", "g801", H, "Be a grain of sand! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "pile"),
 ("say", "g802", H, "You are a grain of sand, in a huge pile of sand.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "scoop"),
 ("say", "g803", H, "A big scoop lifts you. You slide into a furnace, a very hot oven.", {**SLOW, "pre": 0, "post": 1.1}),
 ("mark", "melt"),
 ("say", "g804", H, "You get hotter, and hotter. You melt into a glowing liquid!", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "mould"),
 ("say", "g805", H, "You are poured into a mould, in the shape of a jar.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "cool"),
 ("say", "g806", H, "You cool down. You are hard again. And now, you are clear.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "isglass"),
 ("say", "g807", H, "You are glass.", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 9 · the reveal: glass
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "g901", H, "The answer is three. The glass jar!", {"pre": 0, "post": .3}),
 # [LOOK CLOSER] sand melting into glass: the furnace, cut open
 ("scene", "lcglass"),
 ("say", "g904", H, "Look closer. Here is the sand, in a furnace. Watch!", {**LC, "pre": .5}),
 ("say", "g905", H, "When sand is heated until it is very hot, it melts and becomes clear.", {"pre": .5, "hold": STRIP}),
 ("mark", "v_glass"), ("wait", 2.5),
 ("scene", "glass"),
 ("say", "g902", H, "Glass is made from sand.", {"pre": .4, "term": ["glass is made"], "hold": STRIP}),
 ("mark", "nm_glass"), HOLD("nm_glass"), ("mark", "tile_glass"),
 *cut("glassuses", [("mark", "uses_glass"), ("wait", 1.0)]),
 ("say", "g903", H, "Three fingers? One finger up!", {"pre": .2, "post": .4}),
 # ---- 10 · metal and plastic
 # [LOOK CLOSER] metal: the rock under the magnifying glass
 ("scene", "lcmetal"), ("wait", 1.0),
 *cut("boxlines", [("say", "g1001", H, "Now, the metal box.", {"pre": .5})]),
 ("say", "g1011", H, "Look closer at this rock. Shiny bits! That is metal, in the rock.", {**LC, "pre": .3}),
 ("say", "g1002", H, "Metals can be dug up from the ground.", {"pre": .5, "term": ["metals can"], "hold": STRIP}),
 ("mark", "v_metal"), ("wait", 2.5),
 ("scene", "metal"),
 ("say", "g1003", H, "Gold, iron, copper and aluminium are metals that are found naturally in the ground.", {"pre": .2, "hold": STRIP}),
 ("mark", "nm_metal"), HOLD("nm_metal"), ("mark", "tile_metal"), ("wait", .4),
 # [LOOK CLOSER] plastic: oil goes into the factory, plastic comes out
 ("scene", "lcplastic"), ("wait", 1.0),
 *cut("boxlines", [("say", "g1004", H, "And the plastic box.", {"pre": .4})]),
 ("say", "g1012", H, "Look closer. Dark, sticky oil goes into the factory. Plastic comes out!", {**LC, "pre": .3}),
 ("say", "g1005", H, "Plastic is made in factories using oil that comes from deep under the ground.", {"pre": .5, "term": ["plastic is made"], "hold": STRIP}),
 ("mark", "v_plastic"), ("wait", 2.5),
 ("scene", "plastic"),
 ("mark", "nm_plastic"), HOLD("nm_plastic"), ("mark", "tile_plastic"),
 *cut("biscuits", [("say", "g1006", B, "My snack box was oil? Good thing my biscuits do not taste like oil!", {"pre": .3, "post": .5})]),
 # ---- 11 · Round 2: ceramic (the hidden animal, a sparrow, is on the classroom window from the ring on; teacher, 2026-11-21: not always the lizard)
 ("scene", "r2card"), ("wait", 1.1),
 ("scene", "r2"),
 ("say", "g1101", H, "Round two. This noodle bowl is ceramic.", {"pre": .1, "term": ["is ceramic"], "kw": [["kw_ceramic", "ceramic"]]}),
 HOLD("kw_ceramic"),
 ("say", "g1102", H, "What is ceramic made from? One, sand. Two, clay. Three, oil. Show me with your fingers.", {"pre": .2}),
 *LOCK("r2"),
 ("say", "g1103", H, "Locked in!", {"pre": 0}),
 ("say", "g1104", P, "One. Sand. The bowl is smooth, like glass.", {"pre": .5}),
 ("say", "g1105", M, "Two! Not sand. Sand made the glass.", {"pre": .4}),
 ("say", "g1106", B, "Two! Clay! I made a clay pot in art class.", {"pre": .4, "post": .4}),
 ("scene", "clay"),
 ("say", "g1107", H, "The answer is two. Clay!", {"pre": .3}),
 ("say", "g1108", H, "Clay can be found in soil dug from the ground.", {"pre": .4, "term": ["clay can"], "hold": STRIP}),
 ("mark", "kw_clay"), HOLD("kw_clay"),
 ("scene", "kiln"),
 ("say", "g1109", H, "The clay is shaped. Then it is baked in a very hot oven, called a kiln.", {"pre": .3, "holdw": ["kiln", 1.6]}),
 # [LOOK CLOSER] clay goes into the kiln soft and comes out hard (the kiln, cut open; the word strip stays)
 ("scene", "lckiln"),
 ("say", "g1113", H, "Look closer. The clay bowl is soft. Into the kiln it goes!", {**LC, "pre": .4}),
 ("say", "g1114", H, "Heating hardens ceramic, but it can break easily.", {"pre": .6, "hold": STRIP}),
 ("mark", "v_ceramic"), ("wait", 2.5),
 ("scene", "mark2"),
 ("say", "g1110", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1111", B, "Ceramic is a material made from clay. Glass is made from sand.", {"pre": 0}),
 ("wait", 2.5), ("mark", "tile_ceramic"), ("wait", .8),
 ("say", "g1112", H, "Two fingers? One finger up!", {"pre": .2, "post": .5}),
 # ---- 12 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "g1201", H, "Show me your score hand! Three fingers? High five!", {"pre": .5, "post": .6}),
 ("scene", "liz"),
 ("say", "g1202", H, "Did you spot the sparrow? It was on the classroom window! What material is a window made of? Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Object", "Material", "Ceramic", "Clay"]),
 # ---- 13 · the cliffhanger: white drops
 ("scene", "cliff"), ("wait", .5),
 ("say", "g1301", H, "Three materials to go! The sole of your school shoe is rubber. Some rubber starts as white drops! Where do the drops come from? Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .9),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · silent recap montage (three shots of Part 1, one second each)
 *cut("recap", [("scene", "recap"), ("wait", 3.0)]),
 # ---- 2 · "Last time..."
 ("scene", "lasttime"),
 ("say", "j201", H, "Last time: objects are made of materials. Glass is made from sand. Ceramic is made from clay. Three materials to go!", {"pre": .4, "post": 1.6}),   # post 1.6: the board (the third recap picture) holds 2.5 s
 # ---- 3 · today's goals (no voice) and the game
 # (Part 2: Basil reads the three goal cards)
 ("scene", "goals"), ("say", "j311", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j312", B, "Wood, rubber and fabric.", {"pre": .3, "post": .3}),
 ("say", "j313", B, "Where each one comes from.", {"pre": .3, "post": .3}), ("say", "j314", B, "Count the parts.", {"pre": .3, "post": .9}),
 ("scene", "game"),
 ("say", "j301", H, "Lock in first. A little sheep is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · wood
 ("scene", "wood"),
 ("say", "j401", H, "First, wood. This bench is made of wood. So is your pencil.", {"pre": .4, "term": ["first, wood"]}),
 ("mark", "nm_wood"), HOLD("nm_wood"),
 ("scene", "trees"),
 ("say", "j402", H, "Wood comes from the trees in fields and forests.", {"pre": .2, "term": ["wood comes"], "hold": STRIP}),
 # [LOOK CLOSER] wood: the trunk is sawn into planks; the same lines in the plank and in the bench
 ("scene", "lcwood"),
 ("say", "j405", H, "Look closer at this tree trunk.", {**LC, "pre": .5}),
 ("say", "j403", H, "The trunks are cut into long, flat planks.", {"pre": .5}),
 ("say", "j406", H, "See the lines in the plank? The bench has the same lines!", {**LC, "pre": .5}),
 ("mark", "v_wood"), ("wait", 2.5),
 ("scene", "paper"),
 ("say", "j404", H, "Paper is made from wood too!", {"pre": .4}),
 ("mark", "tile_wood"), ("wait", 1.0),
 # ---- 5 · Round 1: where do the white drops come from?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j501", H, "Round one. The sole of this school shoe is rubber.", {"pre": .1, "term": ["is rubber"], "kw": [["kw_rubber", "rubber"]]}),
 HOLD("kw_rubber"),
 ("say", "j502", H, "Some rubber starts as white drops. Where do they come from? One, a cow. Two, a tree. Three, a rock. Show me with your fingers.", {"pre": .2}),
 *LOCK("r1"),
 ("say", "j503", H, "Locked in!", {"pre": 0}),
 ("say", "j504", M, "One! White drops. That is milk!", {"pre": .5}),
 ("say", "j505", P, "Two. I think it is a rubber tree.", {"pre": .4}),
 ("say", "j506", B, "Two! A rock cannot drip. And nobody milks a shoe!", {"pre": .4, "post": .5}),
 # ---- 6 · BE A DROP OF SAP (the first-person journey)
 ("scene", "waitw"),
 ("say", "j601", H, "Be a drop of sap! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "intree"),
 ("say", "j602", H, "You are a drop of white sap, inside a rubber tree.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "cut"),
 ("say", "j603", H, "Someone makes a thin cut in the bark. You ooze out!", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "cup"),
 ("say", "j604", H, "You run down the cut, and drip into a little cup.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "factory"),
 ("say", "j605", H, "At a factory, you are made into rubber.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "sole"),
 ("say", "j606", H, "You are pressed into a shape. The sole of a school shoe!", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "steps"),
 ("say", "j607", H, "Now, you bend with every step.", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 7 · the reveal: rubber
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "j701", H, "The answer is two. A tree!", {"pre": 0, "post": .3}),
 # [LOOK CLOSER] the cut in the bark: white sap, drop by drop, into the cup; then rubber
 ("scene", "lcsap"),
 ("say", "j705", H, "Look closer at the cut. White sap! Drop by drop, it fills the cup.", {**LC, "pre": .5}),
 ("say", "j706", H, "At the factory, the sap is made into rubber.", {**LC, "pre": .5}),
 ("mark", "v_rubber"), ("wait", 2.5),
 ("scene", "mark1"),
 ("say", "j702", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 # SAP pops large BESIDE the card on "sap" (2.0 s) while the reading goes on; its sentence is said slowly and followed by >= .65 s
 ("say", "j703", B, "Rubber can come from the sap of a rubber tree. It can also be made by man using oil from the ground.", {"pre": 0, "term": ["the sap of"], "kw": [["kw_sap", "sap"]]}),
 ("wait", 2.5), ("mark", "tile_rubber"),
 *cut("rubberuses", [("mark", "uses_rubber"), ("wait", 1.2)]),
 ("say", "j704", H, "Two fingers? One finger up!", {"pre": .2, "post": .4}),
 # ---- 8 · fabric; Round 2: where does cotton come from?
 ("scene", "fabric"),
 ("say", "j801", H, "Last one: fabric. Like this school T-shirt.", {"pre": .4, "term": ["last one: fabric"], "kw": [["kw_fabric", "fabric"]]}),
 HOLD("kw_fabric"),
 # [LOOK CLOSER] the weave of the T-shirt: threads going over and under
 ("scene", "lcfabric"),
 ("say", "j811", H, "Look closer at the T-shirt. Threads! Over, under, over, under. Woven threads make fabric.", {**LC, "pre": .5}),
 ("mark", "v_fabric"), ("wait", 2.5),
 ("scene", "fabricb"),
 ("say", "j802", H, "Fabric is a material that can come from animals or plants.", {"pre": .2, "hold": STRIP}),
 ("scene", "r2card"), ("wait", 1.1),
 ("scene", "r2"),
 ("say", "j803", H, "Round two. This T-shirt is cotton. Where does cotton come from? One, an animal. Two, a plant. Show me with your fingers.", {"pre": .1}),
 *LOCK("r2"),
 ("say", "j804", H, "Locked in!", {"pre": 0}),
 ("say", "j805", B, "One! Cotton is fluffy, like a sheep!", {"pre": .5}),
 ("say", "j806", M, "Two! Fluffy white balls, on a plant!", {"pre": .4}),
 ("say", "j807", P, "Two. Cotton grows on a cotton plant.", {"pre": .4, "post": .4}),
 ("scene", "r2ans"),
 ("say", "j808", H, "The answer is two. Cotton comes from a plant. Wool comes from sheep. Silk comes from a kind of caterpillar.", {"pre": .3}),
 ("say", "j809", H, "Two fingers? One finger up!", {"pre": .4}),
 ("mark", "tile_fabric"), ("wait", .3),
 ("say", "j810", B, "So sheep give wool, not cotton. Sorry, sheep!", {"pre": .3, "post": .5}),
 # ---- 9 · Showdown: Pip's notes, and "count the parts" (the hidden animal, an ant with a crumb, is under the wooden bench from the ring on)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j901", P, "My notes! One. Wood comes from trees. Two. Glass is made from sand. Three. A school shoe is made of one material.", {"pre": .6, "post": .3}),
 ("say", "j902", H, "Showdown! Double points. Which line has a mistake? One, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK("show", 6.0),
 ("say", "j903", H, "Locked in!", {"pre": 0}),
 ("say", "j904", M, "Three! Let's count the parts.", {"pre": .5}),
 ("say", "j905", B, "Three! A sole, a top, and shiny rings!", {"pre": .4, "post": .3}),
 ("scene", "count4"),
 ("say", "j906", H, "Count the parts! The sole: rubber. The top: fabric. The little rings: metal. The lace tips: plastic.", {"pre": .6, "gap": .6}),
 ("say", "j907", H, "One object, four materials!", {"pre": .5}),
 ("say", "j908", P, "Oops! Fixed. Not one. Four!", {"pre": .4}),
 ("say", "j909", H, "Showed three fingers? Put up two more on your score hand!", {"pre": .5, "post": .4}),
 # ---- 10 · seven tiles, and the chant
 ("scene", "seven"),
 ("say", "j1001", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j1002", M, "Wood, metal, ceramic, rubber, glass, plastic and fabric are some of the materials we use to make the things we need.", {"pre": 0, "speed": .84}),
 ("wait", 2.5),
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand and the lizard
 ("scene", "final"),
 ("say", "j1101", H, "Show me your score hand! Four fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1102", H, "Did you spot the sheep? It was in the field, beside the trees! Where does wood come from? Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 12 · the dare for Episode 9
 ("scene", "dare"), ("wait", .5),
 ("say", "j1201", H, "Next time, we test the materials! A rubber band. A wooden ice-cream stick. Which one can bend without breaking?", {"pre": 0}),
 ("say", "j1202", B, "Snap it, or bend it?", {"pre": .4}),
 ("say", "j1203", H, "Lock in your answer!", {"pre": .4, "post": .6}),
 # ---- 13 · the key words
 *kwrecap(["Rubber", "Sap", "Fabric"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
