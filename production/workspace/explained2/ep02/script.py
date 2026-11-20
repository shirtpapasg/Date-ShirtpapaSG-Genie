"""script.py: P3 EP2 "What living things need", Part 1 and Part 2: the approved script (p3_ep02_script.md) as data.
Every spoken line is exactly as in the script. make_voice.py records the lines; build_tl.py lays them on the timeline.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre = silence before it (s), post = silence after it (s)
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("chant", id)                        the buddies' chant, call and response: a line, a bar for the viewers ("YOUR TURN!"), ... then all together
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet)
"""
H, P, B, M = "heart", "pip", "basil", "momo"
# the chant: line 1 is three words on clap, clap, stomp; line 2 is one phrase
CHANT = [["Water!", "Food!", "Air!"], "Living things need all three!"]
# how the TTS should say a word (the caption/script text is unchanged)
PRON = {"PE,": "P.E.,"}
SLOW = {"speed": .92, "gap": .5}

def kwrecap(words):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = w.lower()
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .55, "quiet": True})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
# the ending, exactly as EP1 round 3 (notes 14-16): "Say it with us!", 0.8 s, "Ready?", "One!", "Two!", "Now you know!" 1.0 s apart, the blast, the outro
NYK = [("scene", "nyk"),
 ("unison", "u1300", "Say it with us!", {"pre": .7}), ("wait", .8),
 ("say", "h1304a", H, "Ready?", {"pre": 0}),
 ("say", "h1304o", H, "One!", {"pre": .45}),
 ("say", "h1304t", H, "Two!", {"after": ["h1304o", 1.0]}),
 ("say", "h1305", H, "Now you know!", {"after": ["h1304t", 1.0], "shout": True}),
 ("unison", "u1305", "Now you know!", {"sync": True, "crowd": "h1305"}),
 ("wait", 5.2)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .6}), ("wait", .8), ("chant", "c1003"), ("wait", .6)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .94})]

SEQ1 = [
 # ---- 1 · silent cold open: Day 31 on the window ledge (9 s)
 ("scene", "cold"), ("mark", "cold0"), ("wait", 3.2), ("mark", "coldBuild"), ("wait", 4.2),
 # ---- 2 · the callback and the dare
 ("scene", "callback"),
 ("say", "a201", H, "Day thirty-one. Our plant is drooping. Last time, Momo asked: is it sad?", {"pre": .3}),
 ("say", "a202", M, "Well? Is it?", {"pre": .4, "post": .3}),
 ("scene", "title"),
 ("say", "a203", H, "A drooping plant isn't sad. It needs something. Did you lock in your answer? Hold on to it.", {"pre": .45, "post": .5}),
 # ---- 3 · the Buddy Hotel and the game
 ("scene", "hotel"),
 ("say", "a301", H, "So the Buddies built a hotel on our window ledge. Three rooms. Three guests. Every guest must get everything it needs. By sunset.", {"pre": .5}),
 ("say", "a302", H, "Three guests: our plant, our mealworm, and a mystery guest.", {"pre": .5, "post": .4}),   # section 6, step 1 (was: "Room one: our drooping plant. Room two: our mealworm. Room three: a mystery guest from Pip's cupboard.")
 ("scene", "game"),
 ("say", "a303", H, "It's You against the Buddies. You lock in first. Every time you are right, put up one finger on your other hand. No lock-in, no point. And a lizard is hiding in this video. Find it!", {"pre": .5, "post": .3}),
 # ---- 4 · today's goals and the countdown
 ("scene", "goals"),
 ("say", "a401", H, "Today you will learn what a drooping plant needs, why living things need water, and why living things need air.", {"pre": .6, "post": .4}),
 *COUNT,
 # ---- 5 · Round 1: the drooping plant
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "a501", H, "Round one. Room one. The plant is drooping. What does it need? One, water. Two, food. Three, air. Show me with your fingers.", {"pre": .1}),
 ("mark", "ring0_1"), ("wait", 5.0), ("mark", "bell_1"), ("wait", .55),
 ("say", "a502", H, "Locked in!", {"pre": 0}),
 ("say", "a503", B, "Two, food! It's hungry. Give it my biscuit!", {"pre": .5}),
 ("say", "a504", P, "One, water. I touched the soil. It is dry.", {"pre": .4}),
 ("say", "a505", M, "One, water. Nobody watered it yesterday. But is it sad?", {"pre": .4, "post": .3}),
 # ---- 6 · we test it, and shrink down to follow the water
 ("scene", "test"),
 ("say", "a601", H, "Let's test Pip's idea. Pip waters the soil. Now we wait. This takes a few hours. So let's shrink down and follow the water. Quietly.", {"pre": .5, "post": .4}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 3.0),
 ("say", "a602", H, "You are tiny now. You are in the wet soil, with the water.", {**SLOW, "pre": 0, "post": 1.3}),
 ("mark", "toRoot"),
 ("say", "a603", H, "In through a root.", {**SLOW, "pre": 0}),
 ("wait", 2.0), ("mark", "toStem"),
 ("say", "a604", H, "Up the stem.", {**SLOW, "pre": 0}),
 ("wait", 2.0), ("mark", "toLeaf"),
 ("say", "a605", H, "All the way to a leaf.", {**SLOW, "pre": 0}),
 ("wait", 2.0), ("mark", "leafUp"),
 ("say", "a606", H, "Plants need water to make food.", {**SLOW, "pre": 0, "post": 1.6}),
 # ---- 7 · the reveal: it was wilting
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.2),
 ("say", "a701", H, "A few hours later. Look! The plant is standing up again. The answer is one. Water.", {"pre": 0}),
 ("wait", .3), ("mark", "kw_water"), ("wait", 2.1),
 ("scene", "mark1"),
 ("say", "a702", M, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "a703", H, "It is wilting. It does not have enough water.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_wilting"), ("wait", 2.1),
 ("scene", "notsad"),
 ("say", "a704", H, "That is what the drooping was. The plant is not sad. It was wilting.", {"pre": .4}),
 ("say", "a705", M, "Not sad. Wilting!", {"pre": .4, "post": .5}),
 ("scene", "r1score"),
 ("say", "a706", H, "Showed one finger? One finger up on your score hand!", {"pre": .5}),
 ("say", "a707", B, "More biscuit for me.", {"pre": .6, "post": .4}),
 # ---- 8 · who else needs water?
 ("scene", "who"),
 ("say", "a801", H, "All living things such as plants and animals need water.", {"pre": .6}),
 ("say", "a802", H, "The plant. The mealworm, with its juicy carrot. And you!", {"pre": .5, "post": .5}),
 ("scene", "why"),
 ("say", "a803", H, "We need water to digest food. We need water to carry out our daily activities. We need water to remove waste from our body.", {"pre": .5, "post": .5}),
 # ---- 9 · HOLD ON! Room 2 is not ready
 ("scene", "r2card"), ("wait", 1.1),
 ("scene", "room2"),
 ("say", "a901", P, "Room two is ready for our mealworm. A jar with a tight lid. Safe and snug!", {"pre": .9, "post": .6}),
 ("say", "a902", H, "Something is not right with this room. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 ("mark", "ring0_2"), ("wait", 5.0), ("mark", "bell_2"), ("wait", .6),
 ("say", "a903", H, "Arms crossed? One finger up! Look. The lid is shut tight. Air cannot get in.", {"pre": 0}),
 ("say", "a904", B, "Our glass box has holes in its lid!", {"pre": .4}),
 ("say", "a905", P, "Holes! I forgot. Sorry, little guest.", {"pre": .4, "post": .3}),
 ("scene", "newlid"),
 ("say", "a906", H, "A new lid, with holes, so air can get in.", {"pre": .8, "post": .8}),
 ("scene", "mark2"),
 ("say", "a907", B, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "a908", H, "Living things breathe in air that contains oxygen.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_oxygen"), ("wait", 2.1),
 # section 6, step 2: the swimming pool cutaway is left out ("You too. In the swimming pool, you come up for air.")
 ("scene", "movein"),
 ("say", "a910", H, "Now our guest can move in. Air, through the holes. Oats, for food. A juicy carrot, for water.", {"pre": 1.1, "post": .5}),
 ("scene", "plantair"),
 ("say", "a911", H, "All living things need air to live.", {"pre": .7}),
 ("say", "a912", H, "Even plants need air.", {"pre": .5, "post": .6}),
 # ---- 10 · the chant, call and response
 ("scene", "chant"),
 ("say", "a1001", H, "One guest. Three needs.", {"pre": .5}),
 *CHANTSEQ,
 # ---- 11 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "a1101", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "a1102", H, "Did you spot the lizard? It was on the wall, above the hotel sign. Does a lizard need water? Tell someone at home.", {"pre": .7, "post": .5}),
 *kwrecap(["Water", "Wilting", "Oxygen"]),
 # ---- 12 · the cliffhanger: Room 3
 ("scene", "cliff"),
 ("say", "a1201", H, "Five ticks. Four to go.", {"pre": .7}),
 ("say", "a1202", M, "The mealworm has oats. But nobody feeds a plant. So who feeds a plant?", {"pre": .5, "post": .3}),
 ("scene", "room3"),
 ("say", "a1203", H, "Room three. A bean plant from Pip's dark cupboard. It had water every day. It had air. But something is wrong under this cloth. What is it missing? Find out in Part Two!", {"pre": .8, "post": .9}),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · silent recap montage
 ("scene", "recap"), ("wait", 6.6),
 # ---- 2 · "Last time..."
 ("scene", "lasttime"),
 ("say", "b201", H, "Last time, our plant was drooping. It was wilting. It did not have enough water. Our mealworm got a lid with holes, so air can get in. Now, room three. What is under Pip's cloth?", {"pre": .5, "post": .6}),
 # ---- 3 · today's goals, the game, the countdown
 ("scene", "goals"),
 ("say", "b301", H, "Today you will learn why living things need food, how a plant gets its food, and the three needs of living things.", {"pre": .6, "post": .4}),
 ("scene", "game"),
 ("say", "b302", H, "Lock in first. And find the new lizard!", {"pre": .5, "post": .6}),   # section 6, step 4 (step 3: no countdown in Part 2)
 # ---- 4 · food gives energy
 ("scene", "energy"),
 ("say", "b401", H, "First, food. After PE, you feel hungry. You used up lots of energy. So you eat. Our mealworm eats too.", {"pre": .5, "post": .7}),
 ("scene", "mark1"),
 ("say", "b402", B, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b403", H, "All living things need food. Food provides living things with energy.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_food"), ("wait", 2.1), ("mark", "kw_energy"), ("wait", 2.1),
 ("scene", "whofeeds"),
 ("say", "b404", M, "You eat rice. The mealworm eats oats. But nobody feeds a plant. So who feeds a plant?", {"pre": .6, "post": .7}),
 # ---- 5 · Round 1: the bean plant from the dark cupboard
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "notebook"),
 ("say", "b501", P, "Two weeks ago, I started a needs test. Two bean plants. Same pot. Same soil. Same water every day. One by the window. One in a dark cupboard.", {"pre": .5, "post": .6}),
 ("mark", "today"), ("wait", 2.2),
 ("scene", "r1"),
 ("say", "b502", H, "Round one. The cupboard plant had water. It had air. So which need was it missing? One, water. Two, food. Three, air. Show me with your fingers.", {"pre": .2}),
 ("mark", "ring0_1"), ("wait", 5.0), ("mark", "bell_1"), ("wait", .55),
 ("say", "b503", H, "Locked in!", {"pre": 0}),
 ("say", "b504", B, "Three, air! The cupboard door was shut!", {"pre": .5}),
 ("say", "b505", M, "Two, food! Nobody put food in its pot!", {"pre": .4}),
 ("say", "b506", P, "Two, food. Only the light was different. So the light must matter.", {"pre": .4, "post": .5}),
 ("scene", "cloths"), ("wait", .7), ("mark", "reveal"), ("wait", 1.5),
 ("say", "b507", H, "The answer is two. Food. Look. The window plant is green and strong. The cupboard plant is pale and weak.", {"pre": 0, "post": .7}),
 ("scene", "evidence"),
 ("say", "b508", H, "Basil, air still gets in around a cupboard door. And Momo, two is right. But look. Nobody put food in the window plant's pot either.", {"pre": .5}),
 ("say", "b509", M, "Oh! Then where does its food come from?", {"pre": .4, "post": .5}),
 ("scene", "light"), ("mark", "lightOn"), ("wait", 2.4),
 ("scene", "mark2"),
 ("say", "b510", P, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b511", H, "Plants do not eat but they can make their own food when there is light.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_light"), ("wait", 2.1),
 ("scene", "dark"),
 ("say", "b512", H, "In the dark cupboard, the plant could not make its food.", {"pre": .6, "post": .9}),
 ("scene", "r1score"),
 ("say", "b513", H, "Showed two fingers? One finger up on your score hand!", {"pre": .6}),
 ("say", "b514", P, "Into the light you go. I will keep watching.", {"pre": .6, "post": .7}),
 # ---- 6 · Showdown: Momo's homework
 ("scene", "showcard"), ("wait", 1.2),
 ("scene", "show"),
 ("say", "b601", M, "My homework from last night. Before the hotel!", {"pre": .5}),
 ("say", "b602a", M, "One. A bean plant is a living thing.", {"pre": .5}),
 ("say", "b602b", M, "Two. It needs water and air.", {"pre": .35}),
 ("say", "b602c", M, "Three. It does not need food because it does not eat.", {"pre": .35, "post": .3}),
 ("say", "b603", H, "Showdown! Double points. One line has a mistake. Is it line one, line two, or line three? Show me with your fingers.", {"pre": .5}),
 ("mark", "ring0_2"), ("wait", 6.0), ("mark", "bell_2"), ("wait", .55),
 ("say", "b604", H, "Locked in!", {"pre": 0}),
 ("say", "b605", P, "Three. All living things need food.", {"pre": .5}),
 ("say", "b606", B, "Three! It does not eat. But it makes its own food. I learned that today!", {"pre": .4}),
 ("say", "b607", M, "Oh! Three. I forgot food!", {"pre": .4, "post": .5}),
 ("scene", "fixed"),
 ("say", "b608", M, "Fixed! It needs food too. It makes its own food when there is light.", {"pre": 1.5}),
 ("say", "b609", H, "Line two was true. It just was not the whole list. Showed three fingers? Put up two more on your score hand!", {"pre": .5, "post": .7}),
 # ---- 7 · sunset: the last box
 ("scene", "sunset"),
 ("say", "b701", H, "Sunset. Eight ticks. One box is empty. Room one. Food!", {"pre": .9}),
 ("wait", 1.2),
 ("scene", "lastbox"),
 ("say", "b702", M, "It stood by the window all day. It made its own food!", {"pre": .3}),
 ("say", "b703", H, "A plant. A mealworm. A bean plant. Three different guests. The same three needs.", {"pre": .7, "post": .6}),
 ("scene", "mark3"),
 ("say", "b704", M, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b705", H, "Living things need water, food and air.", {"pre": 0}),
 ("wait", 2.0),
 ("say", "b706", H, "Say all three. Every time.", {"pre": 0, "post": .7}),
 # ---- 8 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 9 · score hand and the lizard
 ("scene", "final"),
 ("say", "b901", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .7}),
 ("scene", "liz"),
 ("say", "b902", H, "Did you spot the lizard? It was behind the clock, at sunset. What does a lizard need? Tell someone at home.", {"pre": .7, "post": .7}),
 # ---- 10 · check-out, and the dare for Episode 3
 ("scene", "day32"), ("wait", 1.0),
 ("say", "b1001", H, "Day thirty-two. Check-out time. Our mealworm goes back to its tub.", {"pre": 0, "post": 1.0}),
 ("scene", "dare"), ("wait", .9),
 ("say", "b1002", B, "Whoa! I touched this plant and it folded up!", {"pre": .8}),
 ("say", "b1003", H, "Touch this plant and it folds up! What is it doing? Lock in your answer for next time.", {"pre": .5, "post": 1.0}),
 # ---- 11 · the key words
 *kwrecap(["Food", "Energy", "Light"]),
 # ---- 12 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
