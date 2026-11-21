"""script.py: P3 EP5 "Feathers, scales or moist skin? Animal groups (Part 1)", Part 1 and Part 2: the script (p3_ep05_script.md) as data.
Every spoken line is exactly as in the script. make_voice.py records the lines; build_tl.py lays them on the timeline.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre = silence before it (s), post = silence after it (s)
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("chant", id)                        the buddies' chant, call and response: a line, a bar for the viewers ("YOUR TURN!"), ... then all together
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet)

Version 2 (21 Nov 2026, the teacher's notes): a buddy reads the three goal cards (g1xx Pip in Part 1, g2xx Momo in Part 2); the buddy who says
"Say it with me!" reads the Mark Sentence card (never Heart), with 2.5 s of stillness after it; the hidden animal is no longer the lizard (Part 1: a
duck behind the boardwalk rail; Part 2: the frog on a mangrove root) and its lines do not depend on the animal; Part 2 opens with a calm recap under
Heart's "Last time..." line (words unchanged). "live" is said "leev" (sg_pron). opts: bs = a buddy's speed factor (default .93; .88 = the slower reading pace).
"""
H, P, B, M = "heart", "pip", "basil", "momo"
# the chant: line 1 is three words on clap, clap, stomp; line 2 is one phrase
CHANT = [["Frog!", "Bird!", "Fish!"], "Moist skin, feathers, scales!"]
CHANT_CAPS = [.40, .40, .46]
# how the TTS should say a word (the caption/script text is unchanged)
PRON = {}
SLOW = {"speed": .9, "gap": .55}
slug = lambda w: w.lower().replace(" ", "_")

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
 ("wait", 5.5)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .6}), ("wait", .8), ("chant", "c1003"), ("wait", .6)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .94})]

LOCK = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]
SEQ1 = [
 # ---- 1 · silent cold open: the pond at the wetland (8 s)
 ("scene", "cold"), ("wait", 3.6), ("mark", "coldCard"), ("wait", 3.6),
 # ---- 2 · the callback to Episode 4 and the dare
 ("scene", "callback"),
 ("say", "a201", H, "Last time, we sorted living things into four groups. Today, we zoom in on one group. Animals!", {"pre": .3}),
 ("say", "a203", M, "A frog, a bird and a fish. All at one pond! Are they one group?", {"pre": .4, "post": .3}),
 ("scene", "title"),
 ("say", "a204", H, "Did you lock in your answer? One group, or three? Hold on to it.", {"pre": .6, "post": .5}),
 # ---- 3 · the game (the field-trip card slides in during the cold open)
 ("scene", "game"),
 ("say", "a302", H, "It's You against the Buddies. You lock in first. One finger for every point. A little duck is hiding in this video. Can you spot it?", {"pre": .5, "post": 0.385333}),
 # ---- 4 · Round Zero: a warm-up
 ("scene", "r0card"), ("wait", 1.1),
 ("scene", "r0"),
 ("say", "a401", H, "Round Zero. A warm-up! A plant makes its own food. Can an animal? One, yes. Two, no. Show me with your fingers.", {"pre": .1}),
 *LOCK(0),
 ("say", "a402", H, "Locked in!", {"pre": 0}),
 ("unison", "u403", "Two!", {"pre": .5, "post": .1}),
 ("say", "a404", H, "Animals are unable to make their own food. They depend on other living things for food.", {"pre": .45}),
 ("say", "a405", H, "Two fingers? One finger up!", {"pre": .5, "post": .6}),
 # ---- 5 · today's goals, read aloud by Pip (word for word as printed; about 0.4 s between cards), and the countdown
 ("scene", "goals"), ("wait", .5),
 ("say", "g100", P, "Today you'll learn…", {"pre": .2, "bs": .88}),
 ("say", "g101", P, "What an animal is.", {"pre": .5, "bs": .88}),
 ("say", "g102", P, "How scientists group animals.", {"pre": .4, "bs": .88}),
 ("say", "g103", P, "What makes a frog an amphibian.", {"pre": .4, "bs": .88}),
 ("wait", 1.0),
 *COUNT,
 # ---- 6 · what an animal is
 ("scene", "parts"),
 ("say", "a501", H, "So, what is an animal? Look at the frog. A head. A body. And limbs. Its legs are its limbs.", {"pre": .5, "post": .4, "gap": .5}),
 ("scene", "mark1"),
 ("say", "a502", P, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "a503", P, "Animals are living things that usually have parts such as a head, a body and limbs.", {"pre": 0, "bs": .88}),
 ("wait", 2.5),
 # ---- 7 · where animals live; outer coverings; observable characteristics
 ("scene", "homes"),
 ("say", "a601", H, "Some animals live only on land, while some live only in water. There are also some animals that can live both on land and in water.", {"pre": .5, "post": .5}),
 ("scene", "cover"),
 ("say", "a602", H, "Animals have different outer coverings as they live in different places.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_cover"), ("wait", 1.9),
 ("wait", 1.2),
 ("scene", "observe"),
 ("say", "a701", H, "Scientists have grouped the diversity of animals around us according to their similarities and differences.", {"pre": .5}),
 ("say", "a702", H, "They use things we can see or measure. These are called observable characteristics.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_observe"), ("wait", 2.9),
 # ---- 8 · Round 1: where can a frog live?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "a801", H, "Round one. This frog sits on a leaf. Then, splash! It swims. Where can a frog live? One, only on land. Two, only in water. Three, both. Show me with your fingers.", {"pre": .1}),
 *LOCK(1),
 ("say", "a802", H, "Locked in!", {"pre": 0}),
 ("say", "a803", M, "Two! It swims so well. It must live in water.", {"pre": .5}),
 ("say", "a804", P, "Three. I saw it on a leaf, and in the pond.", {"pre": .4}),
 ("say", "a805", B, "Three! It hops, and it swims.", {"pre": .4, "post": .5}),
 # ---- 9 · BE THE FROG
 ("scene", "waitw"),
 ("say", "a901", H, "Be the frog! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.1),
 ("say", "a902", H, "You are a frog. You sit on a leaf, on land.", {**SLOW, "pre": 0, "post": .9}),
 ("say", "a903", H, "Your skin is moist. It stops you from drying out.", {**SLOW, "pre": 0, "post": .9}),
 ("say", "a904", H, "Now, jump!", {**SLOW, "pre": 0}),
 ("mark", "jump"), ("wait", 1.7), ("mark", "under"),
 ("say", "a905", H, "You are under water. Your strong legs and webbed feet push you along.", {**SLOW, "pre": 0, "post": .8}),
 ("say", "a906", H, "Here, you breathe through your skin.", {**SLOW, "pre": 0}),
 ("wait", 1.3), ("mark", "up"),
 ("say", "a907", H, "Back on land, you breathe with your lungs as well.", {**SLOW, "pre": 0, "post": .9}),
 ("say", "a908", H, "Land and water. Both are home.", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 10 · the reveal: an amphibian
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "a1001", H, "The answer is three. Both!", {"pre": 0, "post": .4}),
 ("scene", "mark2"),
 ("say", "a1002", M, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "a1003", M, "Amphibians are animals that can live both on land and in water. Amphibians usually have four legs.", {"pre": 0, "bs": .88}),
 ("wait", 2.5), ("mark", "kw_amphibians"), ("wait", 1.9),
 ("scene", "skin"),
 ("say", "a1004", H, "Amphibians can breathe through their skin as well as their lungs.", {"pre": .5}),
 ("say", "a1005", H, "They have protective moist skin to prevent them from drying out when they are on land.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_moist"), ("wait", 1.9),
 ("scene", "eggs"),
 ("say", "a1006", H, "Amphibians lay their eggs in water.", {"pre": .5}),
 ("say", "a1007", H, "Frogs, toads and salamanders are amphibians.", {"pre": .6}),
 ("say", "a1008", M, "So the frog is an amphibian!", {"pre": .5}),
 ("mark", "stamp1"), ("wait", 1.3),
 ("say", "a1009", H, "Three fingers? One finger up!", {"pre": .2, "post": .6}),
 # ---- 11 · HOLD ON! Basil's rule
 ("scene", "listcard"), ("wait", 1.1),
 ("scene", "rule"),
 ("say", "a1101", B, "My rule! If it swims, it is a fish. A frog swims. A duck swims. So they are fish!", {"pre": .6, "post": .5}),
 ("say", "a1102", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK(2)[:-1], ("wait", .6),
 ("say", "a1103", H, "Arms crossed? One finger up! Many animals swim. To find the group, look at the outer covering.", {"pre": 0, "post": .5}),
 ("say", "a1104", B, "Oops. I must check the cover first!", {"pre": .4, "post": .6}),
 # ---- 12 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "a1201", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .7}),
 ("scene", "liz"),
 ("say", "a1202", H, "Did you spot the duck? It was behind the boardwalk rail! Tell someone at home.", {"pre": .7, "post": 0.679111}),
 *kwrecap(["Outer covering", "Observable characteristics", "Amphibians", "Moist skin"]),
 # ---- 13 · the cliffhanger: a fish that hops on the mud
 ("scene", "cliff"), ("wait", .4),
 ("say", "a1301", H, "Next: this animal has fins. But it hops about on the mud! Is it a fish, or an amphibian? Find out in Part Two!", {"pre": .5}),
 ("mark", "hopend"), ("wait", 1.3),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1-2 · the calm recap: two Part 1 pictures, one at a time, each held, each with a label, under Heart's "Last time..." (the words are unchanged);
 #            then the new question ("Two more animals to spot!")
 ("scene", "recap"), ("wait", 1.0),
 ("say", "b201", H, "Last time, we met a frog. It is an amphibian, with moist skin. Its outer covering is an observable characteristic. Two more animals to spot!", {"pre": 0, "post": 1.5}),
 # ---- 3 · today's goals, read aloud by Momo (word for word as printed; about 0.4 s between cards), and the game
 ("scene", "goals"), ("wait", .5),
 ("say", "g200", M, "Today you'll learn…", {"pre": .2, "bs": .88}),
 ("say", "g201", M, "How to spot a bird.", {"pre": .5, "bs": .88}),
 ("say", "g202", M, "What makes a fish a fish.", {"pre": .4, "bs": .88}),
 ("say", "g203", M, "The fish that hops on land.", {"pre": .4, "bs": .88}),
 ("wait", 1.0),
 ("scene", "game"),
 ("say", "b301", H, "Lock in first. A little frog is hiding in this video. Can you spot it?", {"pre": .5, "post": 0.479111}),
 # ---- 4 · the kingfisher; Round 1: is a penguin a bird?
 ("scene", "bird"),
 ("say", "b401", H, "Look up! A kingfisher. It has a beak. It has wings. And its outer covering?", {"pre": .5, "post": .4, "gap": .5}),
 ("scene", "r1card"), ("wait", 1.0),
 ("scene", "r1"),
 ("say", "b402", H, "Round one. A penguin has feathers. It lays eggs. But it cannot fly! Is a penguin a bird? One, yes. Two, no. Show me with your fingers.", {"pre": .1}),
 *LOCK(1),
 ("say", "b403", H, "Locked in!", {"pre": 0}),
 ("say", "b404", P, "Two. Birds fly. A penguin cannot fly.", {"pre": .5}),
 ("say", "b405", M, "One! It has a beak and wings.", {"pre": .4}),
 ("say", "b406", B, "One! Look at its feathers.", {"pre": .4, "post": .5}),
 ("scene", "birds"),
 ("say", "b408", H, "Birds live largely on land. Birds have beaks that enable them to pick up food.", {"pre": .5}),
 ("say", "b409", H, "Birds have wings and can usually fly.", {"pre": .6}),
 ("say", "b410", H, "Some birds such as ostriches and penguins cannot fly.", {"pre": .6}),
 ("say", "b411", H, "Birds lay eggs.", {"pre": .6, "post": .5}),
 ("scene", "mark1"),
 ("say", "b412", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "b413", B, "Birds have an outer covering of feathers.", {"pre": 0, "bs": .88}),
 ("wait", 2.5), ("mark", "kw_feathers"), ("wait", 1.9),
 ("scene", "birdans"),
 ("say", "b414", H, "The answer is one. A penguin has feathers. So it is a bird.", {"pre": .4}),
 ("say", "b415", P, "So flying is not the clue. Feathers are!", {"pre": .4}),
 ("mark", "stamp2"), ("wait", 1.3),
 ("say", "b416", H, "One finger? One finger up!", {"pre": .2, "post": .6}),
 # ---- 5 · fish: fins, scales, gills
 ("scene", "fish"),
 ("say", "b501", H, "Now look down, into the water. A fish!", {"pre": .5}),
 ("say", "b502", H, "Fish are animals that usually live only in water. They have fins to help them swim in water.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_fins"), ("wait", 1.9),
 ("scene", "mark2"),
 ("say", "b503", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "b504", M, "Fish have an outer covering of scales.", {"pre": 0, "bs": .88}),
 ("wait", 2.5), ("mark", "kw_scales"), ("wait", 1.9),
 ("scene", "gills"),
 ("say", "b505", H, "Fish usually breathe through their gills.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_gills"), ("wait", 1.9),
 ("say", "b506", H, "Some fish, such as cod, lay eggs. Other fish, such as the guppy and some sharks, give birth to their young alive.", {"pre": .3, "post": .5}),
 # ---- 6 · Round 2: the animal on the mud
 ("scene", "r2card"), ("wait", 1.0),
 ("scene", "r2"),
 ("say", "b601", H, "Round two. Look at the mud! This animal hops about on land. But it has fins, scales and gills. What is it? One, an amphibian. Two, a bird. Three, a fish. Show me with your fingers.", {"pre": .1}),
 *LOCK(2),
 ("say", "b602", H, "Locked in!", {"pre": 0}),
 ("say", "b603", B, "One! Land and water. Just like the frog!", {"pre": .5}),
 ("say", "b604", P, "Three. I count fins, scales and gills.", {"pre": .4}),
 ("say", "b605", M, "Three! Frogs have legs. It has fins.", {"pre": .4, "post": .5}),
 # ---- 7 · BE THE MUDSKIPPER
 ("scene", "waitw"),
 ("say", "b701", H, "Be the mudskipper! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.1),
 ("say", "b702", H, "You are a mudskipper. You are in the water. You breathe through your gills.", {**SLOW, "pre": 0, "post": .9}),
 ("mark", "tide"),
 ("say", "b703", H, "The tide goes out. The water gets shallow.", {**SLOW, "pre": 0}),
 ("wait", 1.4), ("mark", "hop"),
 ("say", "b704", H, "You push with your fins. Hop. Hop. You are on the mud.", {**SLOW, "pre": 0, "post": .9}),
 ("say", "b705", H, "Now, on land, you breathe through your skin.", {**SLOW, "pre": 0, "post": 1.0}),
 ("say", "b706", H, "Fins, scales and gills. You are still a fish.", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 8 · the reveal: a special fish
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "b801", H, "The answer is three.", {"pre": 0}),
 ("say", "b802", H, "Mudskippers are special fish that can live on land as well as in water.", {"pre": .5}),
 ("mark", "stamp3"), ("wait", 1.3),
 ("say", "b803", H, "Three fingers? One finger up!", {"pre": .2, "post": .6}),
 # ---- 9 · Showdown: Momo's field notes
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "b901", M, "My field notes!", {"pre": .5}),
 ("say", "b902", M, "One. A frog is an amphibian. Two. A penguin is a bird. Three. A starfish is a fish.", {"pre": .5, "post": .3}),
 ("say", "b903", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 *LOCK(3, 6.0),
 ("say", "b904", H, "Locked in!", {"pre": 0}),
 ("say", "b905", P, "Three. A starfish has no scales.", {"pre": .5}),
 ("say", "b906", B, "Three! And no gills.", {"pre": .4}),
 ("say", "b907", M, "Oops!", {"pre": .4, "post": .4}),
 ("scene", "fixed"),
 ("say", "b908", M, "Fixed! Not a fish.", {"pre": .9}),
 ("say", "b909", H, "Starfish are not fish! This is because they do not have scales or gills.", {"pre": .5}),
 ("say", "b910", H, "Showed three fingers? Put up two more on your score hand!", {"pre": .5, "post": .5}),
 # ---- 10 · three stamps, and the chant
 ("scene", "stamps"),
 ("say", "b1001", H, "Three stamps! Three animal groups.", {"pre": .5, "post": .5, "gap": .5}),
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand and the lizard
 ("scene", "final"),
 ("say", "b1201", H, "Show me your score hand! More than two? You beat the Buddies. Four fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "b1202", H, "Did you spot the frog? It was on a mangrove root! Tell someone at home.", {"pre": .5, "post": 0.513333}),
 # ---- 13 · the dare for Episode 6
 ("scene", "dare"), ("wait", 1.1),
 ("say", "b1301", H, "Three more animal groups to go: insects, reptiles and mammals. Here is an ant. And a spider. Only one is an insect! Can you tell which, by counting its legs? Lock in your answer for next time.", {"pre": 0, "post": .6}),
 # ---- 14 · the key words
 *kwrecap(["Feathers", "Fins", "Scales", "Gills"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
