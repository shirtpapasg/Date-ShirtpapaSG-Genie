"""script.py: P3 EP6 "Count the legs! Insects, reptiles and mammals (Part 2 of the animal groups)", Part 1 and Part 2: the script
(../p3_ep06_script.md) as data. Every spoken line is exactly as in the script. make_voice.py records the lines; build_tl.py lays them on the timeline.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre = silence before it (s), post = silence after it (s), speed, gap
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("chant", id)                        the buddies' chant, call and response: a line, a bar for the viewers ("YOUR TURN!"), ... then all together
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet)
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
# the chant (Part 2): each line is a question on the two claps and its answer on the stomp; YOUR TURN! after each line (the all-together pass was cut, 21 Nov 2026, for length)
CHANT = [("Six legs?", "Insect!"), ("Dry, scaly skin?", "Reptile!"), ("Hair or fur?", "Mammal!")]
CHANT_CAPS = ([.66, .82, .66], [.62, .7, .66])
# how the TTS should say a word (the caption/script text is unchanged)
PRON = {}
SLOW = {"speed": .86, "gap": .65}   # the journeys: softer and slower than Heart's .90
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
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .5}), ("wait", .8), ("chant", "c1103"), ("wait", .4)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .90})]

LOCK = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]
SEQ1 = [
 # ---- 1 · silent cold open: the lake at the Singapore Botanic Gardens (7 s)
 ("scene", "cold"), ("wait", 3.0), ("mark", "coldCard"), ("wait", 4.0),
 # ---- 2 · the callback to Episode 5's dare
 ("scene", "callback"),
 ("say", "e201", H, "Last time, we found three animal groups. Amphibians, birds and fish. Three more to go!", {"pre": .3}),
 ("say", "e202", M, "An ant and a spider. Which one is the insect?", {"pre": .5, "post": .2}),
 ("scene", "title"), ("wait", 2.3),
 # ---- 3 · the game
 ("scene", "game"),
 ("say", "e301", H, "It's You against the Buddies. You lock in first. One finger for every point. A little animal is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · Round 1: which one is an insect?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "e401", H, "Round one. Which one is an insect? One, the ant. Two, the spider. Show me with your fingers.", {"pre": .1}),
 *LOCK(1),
 ("say", "e402", H, "Locked in!", {"pre": 0}),
 ("say", "e403", P, "Two. It is tiny, and it crawls. Like a bug!", {"pre": .5}),
 ("say", "e404", B, "One! The ant!", {"pre": .4}),
 ("say", "e405", M, "One! But how do we know?", {"pre": .4, "post": .5}),
 # ---- 5 · today's goals, read aloud by Basil, word for word as printed (rulebook section 11, step 3; teacher, 21 Nov), and the countdown
 ("scene", "goals"), ("wait", .5),
 ("say", "e5g0", B, "Today you'll learn...", {"pre": .2}),
 ("say", "e5g1", B, "How to spot an insect.", {"pre": .55}),
 ("say", "e5g2", B, "How to spot a reptile.", {"pre": .55}),
 ("say", "e5g3", B, "What cold-blooded means.", {"pre": .55, "post": .9}),
 *COUNT,
 # ---- 6 · count the legs: the ant, the spider
 ("scene", "ant"), ("mark", "antIn"), ("wait", 1.0),
 ("say", "e601", H, "Count with me! One, two, three, four, five, six. Six legs!", {"pre": 0, "speed": .86, "gap": .6}),
 ("say", "e602", H, "Two feelers on its head. And three body parts.", {"pre": .5, "post": .5}),
 ("scene", "spider"),
 ("say", "e603", H, "Now the spider. Eight legs! No feelers. Two body parts.", {"pre": .5, "post": .5}),
 ("scene", "antans"),
 ("say", "e604", H, "The ant is the insect! The spider is not. It belongs to a different group.", {"pre": .4}),
 ("mark", "stampIns"), ("wait", .9),
 ("say", "e605", H, "One finger? One finger up!", {"pre": .2}),
 ("say", "e606", P, "Oops! Count the legs!", {"pre": .4, "post": .4}),
 ("scene", "mark1"),
 ("say", "e607", M, "Say it with me!", {"pre": .7}), ("wait", .8),
 ("say", "e608", M, "Insects have six legs and a pair of feelers. The body of insects is divided into the head, thorax and abdomen.", {"pre": 0, "term": ["insects", "thorax"]}),
 ("wait", 2.5), ("mark", "kw_insects"), ("wait", 2.5), ("mark", "kw_hta"), ("wait", 2.4),
 ("scene", "shell"),
 ("say", "e609", H, "Insects have an outer covering that is usually hard and shell-like.", {"pre": .5, "post": .5}),
 # ---- 7 · wings are not the clue
 ("scene", "wings"),
 ("say", "e701", H, "Many adult insects have two pairs of wings. Some adult insects have only one pair of wings. Some do not have wings at all.", {"pre": .5, "post": .5}),
 # ---- 8 · HOLD ON! Basil's rule
 ("scene", "listcard"), ("wait", 1.1),
 ("scene", "rule"),
 ("say", "e801", B, "My rule! If it has wings, it is an insect. A butterfly. A pigeon. Both insects!", {"pre": .6, "post": .4}),
 ("say", "e802", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK(2)[:-1], ("wait", .6),
 ("say", "e803", H, "Arms crossed? One finger up! A pigeon has feathers. It is a bird. Count the legs, not the wings!", {"pre": 0, "post": .4}),
 ("say", "e804", B, "Oops. Six legs, not wings!", {"pre": .4, "post": .5}),
 # ---- 9 · Round 2: the monitor lizard
 ("scene", "r2card"), ("wait", 1.0),
 ("scene", "r2"),
 ("say", "e901", H, "Round two. A monitor lizard! Its skin is dry and scaly. Which group? One, amphibians. Two, reptiles. Three, mammals. Show me with your fingers.", {"pre": .1}),
 *LOCK(3),
 ("say", "e902", H, "Locked in!", {"pre": 0}),
 ("say", "e903", M, "One! Four legs, like a frog.", {"pre": .5}),
 ("say", "e904", P, "Two. Its skin is dry, not moist.", {"pre": .4}),
 ("say", "e905", B, "Two! Lizards like me!", {"pre": .4, "post": .4}),
 # ---- 10 · the reveal: reptiles, and Basil is one
 ("scene", "r2ans"),
 ("say", "e1001", H, "The answer is two. Reptiles!", {"pre": .3, "term": ["reptiles"]}),
 ("wait", .45), ("mark", "kw_reptiles"), ("wait", 2.0), ("mark", "stampRep"), ("wait", .5),
 ("say", "e1002", H, "Two fingers? One finger up!", {"pre": .2}),
 ("say", "e1003", B, "I knew it! I'm a reptile!", {"pre": .4, "post": .4}),
 ("scene", "rep4"),
 ("say", "e1004", H, "Most reptiles, except snakes, have four legs.", {"pre": .5, "post": .3}),
 ("scene", "repskin"),
 ("say", "e1005", H, "Reptiles usually have dry and scaly skin. They breathe through their lungs.", {"pre": .4, "post": .3}),
 ("scene", "repegg"),
 ("say", "e1006", H, "Most reptiles reproduce by laying eggs.", {"pre": .4}),
 ("say", "e1007", B, "I hatched from an egg!", {"pre": .4, "post": .3}),
 # ---- 11 · BE A SCALE
 ("scene", "waitw"),
 ("say", "e1101", H, "Be a scale! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("say", "e1102", H, "You are one scale on a monitor lizard's back. You are dry, and tough.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "shade"),
 ("say", "e1103", H, "Early morning. The air is cool, so you are cool. The lizard is slow.", {**SLOW, "pre": 0, "post": .7}),
 ("mark", "sun"),
 ("say", "e1104", H, "Now it crawls into the sun. Sunlight lands on you. You warm up!", {**SLOW, "pre": 0, "post": 1.2}),
 ("mark", "noon"),
 ("say", "e1105", H, "At noon, it is too hot. Splash! Into the cool lake. You cool down.", {**SLOW, "pre": 0}),
 ("wait", 1.4),
 ("scene", "pullout"), ("wait", 3.0),
 # ---- 12 · cold-blooded
 ("scene", "mark2"),
 ("say", "e1201", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "e1202", B, "Reptiles are cold-blooded animals. This means that they do not have a constant body temperature like humans. Their body temperature changes with the environment that they are in.", {"pre": 0, "term": ["cold-blooded"]}),
 ("wait", 2.5), ("mark", "kw_cold"), ("wait", 2.4),
 ("scene", "basilsun"),
 ("say", "e1203", B, "Cold-blooded does not mean I am always cold. I warm up in the sun!", {"pre": .4, "post": .5}),
 # ---- 13 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "e1301", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .6}),
 ("scene", "liz"),
 ("say", "e1302", H, "Did you spot the hidden animal? It was the grasshopper, on the lamp post! Is it an insect? Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Insects", "Head, thorax, abdomen", "Reptiles", "Cold-blooded"]),
 # ---- 14 · the cliffhanger: wings, at night
 ("scene", "cliff"), ("wait", .6),
 ("say", "e1401", H, "Next: this animal has wings. It flies at night. Is it a bird? Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", 1.2),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · silent recap montage
 ("scene", "recap"), ("wait", 1.2),   # the calm recap: picture 1 arrives, then Heart's "Last time" plays over the pictures (rulebook section 2; teacher, 21 Nov)
 # ---- 2 · "Last time..."
 ("scene", "lasttime"),
 ("say", "f201", H, "Last time, we counted legs. Insects have six. And we met the reptiles, with dry, scaly skin. Like Basil!", {"pre": .5}),
 ("say", "f202", B, "Cold-blooded, and proud!", {"pre": .4, "post": .4}), ("wait", 1.1),   # picture-only: the third recap picture holds at least 2.5 s
 # ---- 3 · today's goals, read aloud by Pip, word for word as printed (rulebook section 11, step 3; teacher, 21 Nov), and the game
 ("scene", "goals"), ("wait", .5),
 ("say", "f3g0", P, "Today you'll learn...", {"pre": .2}),
 ("say", "f3g1", P, "How to spot a mammal.", {"pre": .55}),
 ("say", "f3g2", P, "Which one does not belong.", {"pre": .55}),
 ("say", "f3g3", P, "Same and different, with a reason.", {"pre": .55, "post": .9}),
 ("scene", "game"),
 ("say", "f301", H, "Lock in first. A little animal is hiding in this video. Can you spot it?", {"pre": .5, "post": .4}),
 # ---- 4 · Palm Valley at dusk; Round 1: is a bat a bird?
 ("scene", "palms"), ("wait", 2.1),
 ("scene", "r1card"), ("wait", 1.0),
 ("scene", "r1"),
 ("say", "f401", H, "Round one. This animal has wings. It flies. Is a bat a bird? One, yes. Two, no. Show me with your fingers.", {"pre": .1}),
 *LOCK(1),
 ("say", "f402", H, "Locked in!", {"pre": 0}),
 ("say", "f403", B, "One! It flies, like a bird!", {"pre": .5}),
 ("say", "f404", M, "Two! I think I see fur.", {"pre": .4}),
 ("say", "f405", P, "Two. No feathers.", {"pre": .4, "post": .4}),
 # ---- 5 · BE A HAIR
 ("scene", "waitw"),
 ("say", "f501", H, "Be a hair! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("say", "f502", H, "You are one hair on a fruit bat's back. Soft fur, like a forest, all around you.", {**SLOW, "pre": 0, "post": .8}),
 ("mark", "wings"),
 ("say", "f503", H, "It spreads its wings. Thin skin. No feathers!", {**SLOW, "pre": .2, "post": .8}),
 ("mark", "fly"),
 ("say", "f504", H, "Whoosh! Out into the night. The air is cool. But the body under you stays warm.", {**SLOW, "pre": .3, "post": .9}),
 ("mark", "back"),
 ("say", "f505", H, "Back at the palm, a baby bat drinks its mother's milk.", {**SLOW, "pre": .3}),
 ("wait", 1.6),
 # ---- 6 · the reveal: a mammal
 ("scene", "reveal"), ("mark", "pullout"), ("wait", .9),
 ("say", "f601", H, "The answer is two. A bat is not a bird. It is a mammal!", {"pre": 0, "term": ["mammal!"]}),
 ("wait", .45), ("mark", "kw_mammals"), ("wait", 2.0), ("mark", "stampMam"), ("wait", .5),
 ("say", "f602", H, "Two fingers? One finger up!", {"pre": .2}),
 ("say", "f603", B, "Fur! Not feathers!", {"pre": .4, "post": .3}),
 ("scene", "mark1"),
 ("say", "f604", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "f605", P, "Mammals are animals that have hair or fur as their outer covering.", {"pre": 0, "term": ["mammals"]}),
 ("wait", 2.5),
 # ---- 7 · milk, and warm-blooded
 ("scene", "fur4"),
 ("say", "f701", H, "Monkeys, cats, bats, and you! They all have hair or fur.", {"pre": .5}),
 ("say", "f702", M, "Pip and I are mammals!", {"pre": .4}),
 ("say", "f702b", B, "And I'm the reptile. No fur for me!", {"pre": .35, "post": .3}),
 ("scene", "milk"),
 ("say", "f703", H, "Most mammals give birth to their young alive. The females have mammary glands that can produce milk for their young.", {"pre": .5, "term": ["mammary"]}),
 ("wait", .6), ("mark", "kw_glands"), ("wait", 2.4),
 ("scene", "warm"), ("wait", .3),
 ("say", "f704", H, "Mammals are warm-blooded, which means that they can maintain a constant body temperature.", {"pre": .2, "term": ["warm-blooded"]}),
 ("wait", 1.6), ("mark", "kw_warm"), ("wait", 2.4),
 # ---- 8 · exam tip: same and different, with a reason
 ("scene", "tip"),
 ("say", "f801", H, "Exam tip! Compare a bat and a bird.", {"pre": .5}),
 ("say", "f802", H, "A bat and a bird are similar because both have wings. They are different because a bat has fur, but a bird has feathers.", {"pre": .5, "post": .8}),
 # ---- 9 · Round 2: which one does not belong?
 ("scene", "r2card"), ("wait", 1.0),
 ("scene", "r2"),
 ("say", "f901", H, "Round two. Which one does not belong? One, a cat. Two, a monkey. Three, a lizard. Show me with your fingers.", {"pre": .1}),
 *LOCK(2),
 ("say", "f902", H, "Locked in!", {"pre": 0}),
 ("say", "f903", P, "Two. The monkey. It climbs trees.", {"pre": .5}),
 ("say", "f904", M, "Three! No fur.", {"pre": .4}),
 ("say", "f905", B, "Three! Like me!", {"pre": .4, "post": .3}),
 ("scene", "r2ans"),
 ("say", "f906", H, "The answer is three. Find what the others share. A cat and a monkey have fur: mammals. A lizard has dry, scaly skin: a reptile.", {"pre": .3}),
 ("say", "f907", H, "Three fingers? One finger up!", {"pre": .4}),
 ("say", "f908", P, "Oops. Cats climb too!", {"pre": .4}),
 ("say", "f908b", B, "Scales, not fur. The odd one out is me!", {"pre": .35, "post": .4}),
 # ---- 10 · Showdown: Momo's mystery creature
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "f1001", M, "One. It has scaly skin. Two. It breathes air with its lungs. Three. It swims in the sea, so it is a fish!", {"pre": .6, "post": .3}),
 ("say", "f1002", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK(4, 6.0),
 ("say", "f1003", H, "Locked in!", {"pre": 0}),
 ("say", "f1004", P, "Three. Fish usually breathe through gills.", {"pre": .5}),
 ("say", "f1005", B, "Three! That's my group!", {"pre": .4}),
 ("say", "f1006", M, "Oops!", {"pre": .4, "post": .3}),
 ("scene", "fixed"),
 ("say", "f1007", H, "Read all the clues. Scaly skin and lungs: a reptile. It is a sea turtle!", {"pre": .8}),
 ("say", "f1008", H, "Showed three fingers? Put up two more on your score hand!", {"pre": .5}),
 ("say", "f1009", M, "Fixed!", {"pre": .4, "post": .4}),
 # ---- 11 · six tiles, and the chant
 ("scene", "six"),
 ("say", "f1101", H, "Six animal groups!", {"pre": .4, "post": .7}),
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · Exam corner
 ("scene", "exambanner"),
 ("say", "f1201", H, "Exam corner!", {"pre": .3, "post": .2}),
 ("scene", "mark2"),
 ("say", "f1202", M, "Say it with me!", {"pre": .5}), ("wait", .8),
 ("say", "f1203", M, "Living things such as plants and animals can be classified based on common observable characteristics. There are different types of plants and animals.", {"pre": 0, "term": ["classified"]}),
 ("wait", 2.5),
 # ---- 13 · score hand and the lizard
 ("scene", "final"),
 ("say", "f1301", H, "Show me your score hand! More than two? You beat the Buddies. Four fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "f1302", H, "Did you spot the hidden animal? It was the squirrel, on the palm trunk! Is it cold-blooded, or warm-blooded? Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 14 · the dare for Episode 7
 ("scene", "dare"), ("wait", .6),
 ("say", "f1401", H, "Next time: fungi and bacteria! Mould on bread. Yeast, for making bread. Both are fungi! Which one is useful? Lock in your answer!", {"pre": 0, "post": .6}),
 # ---- 15 · the key words
 *kwrecap(["Mammals", "Mammary glands", "Warm-blooded"]),
 # ---- 16 · "Now you know!" and the outro (the outro is 0.4 s shorter than Part 1's, to keep the part near 5:15)
 *NYK[:-1], ("wait", 4.8),
]
SEQS = {1: SEQ1, 2: SEQ2}
