"""script.py: P3 EP6 "Count the legs!" THREE MOMENTS (the Fable clips): 1 = the cold open, 2 = the BE THE THING journey, 3 = the ending. The words: SCRIPT.md.
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
CHANT = [["Frog!", "Bird!", "Fish!"], "Moist skin, feathers, scales!"]   # not used in the three moments
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


# ================= MOMENT 1 · the cold open: from EP5's dare to today's hook and today's dare =================
SEQ1 = [
 # silent: the Singapore Botanic Gardens, by the Bandstand. Ants march up a trunk; a spider drops into its web; the buddies pop in.
 ("scene", "cold"), ("wait", 5.6),
 # the callback to EP5's dare (the same two picture boards), Basil's bold guess, Pip's careful fix: the title
 ("scene", "callback"),
 ("say", "c101", H, "Last time, we dared you. An ant. And a spider. Only one is an insect!", {"pre": .3}),
 ("say", "c102", B, "Easy! Both! They are small, and they crawl.", {"pre": .45}),
 ("say", "c103", P, "Small is not the clue, Basil. Count the legs!", {"pre": .4, "post": .5}),
 ("say", "c104", H, "Did you lock in your answer? Hold on to it.", {"pre": .5, "post": .5}),
 # today's big dare: Basil himself
 ("scene", "dare"),
 ("say", "c105", M, "Ooh! Can I count Basil's legs too?", {"pre": .7}),
 ("say", "c106", H, "Good idea, Momo! Here is today's big dare. Insect, reptile, or mammal. Which group is Basil in?", {"pre": .45, "gap": .4}),
 ("say", "c107", B, "The cool group!", {"pre": .45}),
 ("say", "c108", P, "That is not a group, Basil.", {"pre": .5}),
 ("mark", "lockit"), ("wait", 3.0),
]
# ================= MOMENT 2 · BE THE THING: you are one scale on a lizard's back =================
SEQ2 = [
 ("scene", "waitw"),
 ("say", "j201", H, "Be a lizard's scale! Shrink down. Quietly.", {"pre": 1.0, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.2),
 ("say", "j202", H, "You are one tiny scale, on a lizard's back.", {**SLOW, "pre": 0, "post": 1.0}),
 ("say", "j203", H, "You are dry. Not moist, like the frog. All around you, more scales.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "cool"),
 ("say", "j204", H, "It is early morning. The shade is cool. So the lizard is cool too.", {**SLOW, "pre": 0, "post": .9}),
 ("mark", "walk"),
 ("say", "j205", H, "Now it crawls into the sun.", {**SLOW, "pre": 0}),
 ("wait", 1.5), ("mark", "sun"),
 ("say", "j206", H, "The rock is warm. You warm up. The whole lizard warms up!", {**SLOW, "pre": 0, "post": 1.2}),
 ("mark", "cloud"),
 ("say", "j207", H, "A cloud hides the sun. You cool down again.", {**SLOW, "pre": 0}),
 ("wait", 1.7),
 # back out to normal size: the book's words name what you just lived through (definition 2.21, word for word)
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.3),
 ("say", "j208", H, "Reptiles are cold-blooded animals. This means that they do not have a constant body temperature like humans. Their body temperature changes with the environment that they are in.", {"pre": 0, "gap": .5}),
 ("wait", .3), ("mark", "kw_cold"), ("wait", 2.2),
 ("say", "j209", B, "Dry, scaly skin. Cold-blooded. That is me! I am a reptile!", {"pre": .3}),
 ("mark", "stampR"), ("wait", 2.6),
]
# ================= MOMENT 3 · the ending: the read-along, next episode's dare, "Now you know!", the outro =================
SEQ3 = [
 *kwrecap(["Reptiles", "Cold-blooded", "Mammals", "Warm-blooded"]),
 ("scene", "next"), ("wait", .9),
 ("say", "e301", H, "Next time: a mushroom. It grows in the soil. It stays in one place. So, is it a plant?", {"pre": 0, "gap": .5}),
 ("say", "e302", M, "Hmm. But where are its leaves?", {"pre": .45}),
 ("say", "e303", H, "Lock in your answer for next time!", {"pre": .45, "post": .5}),
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2, 3: SEQ3}
