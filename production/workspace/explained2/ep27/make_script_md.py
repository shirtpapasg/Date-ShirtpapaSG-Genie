"""make_script_md.py: writes ../p3_ep27_bridge_script.md = the hand-written header (script_header.md) + the beat-by-beat table generated from
the built timeline (tl_p1.json) and script.py, so every time and every word in the table is exactly what the video has.
  python3 make_script_md.py"""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
tl = json.load(open(f"{H}/tl_p1.json"))
from script import SEQ1
WHO = {"heart": "Heart", "pip": "Pip", "basil": "Basil", "momo": "Momo", "chant": "All three"}
SCENE = {  # what is on screen in each scene (the [LOOK CLOSER] and journey rows marked)
 "cold": "THE PROBLEM. The mama shop at the foot of an HDB block, 2 pm: the ICE CREAM chest freezer with the class's box of ice-cream cups on it, the thermometer on the pillar (33 °C pops on \"thirty-three\"), the party clock PARTY IN 20:00 (pops on \"twenty\", ticks down). Basil worried after \"Oh no.\"",
 "title": "Title slam: THE GREAT / ICE CREAM / RESCUE! (the sun, a melting cup, the wrapped box)",
 "fixcards": "THE FIX CARDS: Pip's three fixes pop as he says each, one set of big numbered cards: 1 Run faster (speed lines, a sneaker), 2 Fan it (a paper fan blowing at the box), 3 Wrap it in wool (the box in Pip's purple and cream scarf). The YOU hand shows 3 fingers.",
 "lock": "THE LOCK-IN (the countdown takes the stage): the ring (6 s, ticks speeding up, bell, LOCKED IN!) with the box in the sun inside it and 33 °C; the three cards under it, each glowing in turn; Pip big at the left, worried.",
 "picks": "The picks: the cards rise to a row; each buddy stands under the card they picked (Pip 1, Momo 2, Basil 3), a coloured pin from each.",
 "run": "FIX 1, RUN (gentle slapstick): the sunny path (no shade, the sun, heat shimmer). Pip dashes right with the box, slows, wobbles and flops on the path, puffing (the sad trombone). He hugs the box to his tummy. The camera pushes in: orange heat arrows from Pip's chest and tummy INTO the box; tags \"Pip: warmer\", \"ice cream: colder\"; the box starts to drip. Pip sets it down; fix card 1 stamped MELTING!; Pip shy.",
 "fan": "FIX 2, FAN: the same path, the box on a low wall; Momo fans it hard (wind lines); the box sweats and DRIPS (DRIP! burst, the sad trombone).",
 "replay": "THE SLOW-MOTION REPLAY: a rewind flash, a film border, INSTANT REPLAY + SLOW MOTION ×¼: the fan swings at a quarter speed, one drip falls slowly; Momo's \"Oh no! It's dripping!\" stretched and low.",
 "lcfan": "[LOOK CLOSER] the fan: a cream panel; the fan pushes warm-air arrows (warm air: 33 °C) at a big cup (ice cream: about −18 °C); orange heat arrows into the scoop (\"heat flows in\"); HOTTER TO COLDER pops on Basil's \"hotter\"; a magnifier on the scoop's edge: melting!; verdict MELTS FASTER; fix card 2 stamped MELTS FASTER. Basil big at the right (he explains); Momo shy at the lower left.",
 "scarf": "FIX 3, THE TWIST: back at the freezer; the clock rolls to 15:00; Momo worried (\"snack emergency\"); Pip pulls out his wool scarf and wraps the box (the camera pushes in).",
 "waitw": "\"Be a tiny bit of air...\": the camera pushes into the knitted wool; the buddies pop out in turn.",
 "shrink": "BE THE THING (the journey, quiet: the journey pad only): inside the wool: huge curly purple and cream fibres; YOU = a little pocket of trapped air with eyes (\"You: a bit of trapped air\"); the hot side glows orange (hot air: 33 °C), the cold side icy (frozen box: −18 °C); orange heat arrows race through the hot air, then CREEP through the wool and the trapped air (slowed, thinner): \"wool and air: heat passes slowly\", \"very, very slowly...\". The three buddies ride along on a fibre, watching.",
 "pullout": "The pull-out: back out of the scarf to the shop (ends on the next scene's layout).",
 "wool": "POOR CONDUCTOR OF HEAT (Basil) pops; Momo's question; two insets: \"On a cold day\" (a child's neck in the scarf, heat arrows going OUT, slowed) and \"Today\" (the wrapped box, heat arrows coming IN, slowed); verdict WOOL SLOWS THE HEAT FLOW. Momo shy, Basil confident.",
 "test": "THE FAIR TEST (P3 skill): the sunny path; three cups on the low wall: 1 no wrapper, 2 a thin plastic bag, 3 the wool scarf; FAIR TEST pops on Momo's \"fair\"; \"Which cup melts least?\" think card (1, 2, 3); speeded up: five minutes in the sun (the clock rolls 14:00 to 9:00); the melted part poured into three measuring cups: 30 ml, 20 ml, 5 ml; WOOL WINS!; the three fix cards return, stamped MELTED / MELTED FASTER / WINNER!",
 "walk": "THE RESCUE: the covered walkway, out of the sun; the three walk right (facing the way they go), Pip carrying the wrapped box; the clock rolls down to about 3:00 (it turns red under 5:00).",
 "drain": "THE P3 CALLBACK: the bottle opener drops through the drain grating (a cut-away: inside the drain, the steel opener and an aluminium ring pull at the bottom). Pip: \"I've got a plan!\" Basil: \"No more plans.\" Basil's fishing rod (EP22's fishing game) lowers the bar magnet (one piece of metal, red and blue paint) on its line; CLICK! the steel opener jumps to it (steel: magnetic) and is lifted out; the ring pull does not move (aluminium: not magnetic).",
 "party": "THE PARTY: the void deck (bunting BYE BYE P3! HELLO P4!, balloons, a long table); one minute to spare; the scarf comes off, the box opens: a cold mist, \"still frozen!\"; Momo cheers. CALLBACK: a standing fan clicks on, blowing at the ice cream; Basil's one-liner; Pip turns the fan to blow on the buddies. The score: +1 (YOU 1, BUDDIES 1).",
 "words": "THE WORDS THAT EARN MARKS: Pip, big at the left, says \"Say it with me!\" (0.8 s) and reads the card (the key words highlighted as he reads): Heat flows from a hotter place to a colder place. Wool is a poor conductor of heat. It slows down the heat flowing from the warmer surroundings to the ice cream.",
 "year": "THE P3 YEAR: four polaroids pinned to the bunting pop as Heart names them (Living things, Materials, Life cycles, Magnets); LEVEL UP: PRIMARY 4!; the buddies' P4 items pop on with sparkles (Pip: safety goggles up on his forehead; Basil: a P4 LAB SCIENTIST badge; Momo: a magnifier).",
 "p4": "THE P4 TEASER: COMING UP IN PRIMARY 4: five tiles pop (Systems, Matter, Light, Shadows, Heat); \"See you in Primary 4!\" and the buddies wave. HEART MYSTERY HINT #1: on \"four\" the heart in the logo pill flickers for a few frames (a cyan and magenta double, a sliver offset; one tiny digital blip). Unexplained.",
 "kwrecap": "The key-word read-along (the shelf to the centre): Hotter to colder · Poor conductor of heat · Fair test.",
 "nyk": "\"Say it with us!\" ... \"Now you know!\" (all three cheer on the words), the sunburst, the rescued box open on the table; about 4.6 s of outro (end-screen time).",
 "blooper": "THE BLOOPER (after the end card): a record scratch, the clapperboard BLOOPER / TAKE 2; Pip: \"...a poor conductor of meat!\" (Pip shy), Basil laughs, Momo hopeful; the clapper snaps.",
}
def mmss(t): return f"{int(t // 60)}:{t % 60:04.1f}"
rows = []; cur = None
for it in SEQ1:
    if it[0] == "scene":
        cur = it[1]; s = next(x for x in tl["scenes"] if x["name"] == cur)
        rows.append(f"| **{mmss(s['t0'])}** | **{cur}** ({s['t1'] - s['t0']:.1f} s) | {SCENE.get(cur, '')} | | |")
    elif it[0] in ("say", "unison"):
        id = it[1]; L = tl["lines"].get(id)
        if not L: continue
        who = WHO.get(L["who"], L["who"]); text = it[3] if it[0] == "say" else it[2]
        rows.append(f"| {mmss(L['t'])} | `{id}` | | {who} | {text} |")
hdr = open(f"{H}/script_header.md").read().replace("{LENGTH}", mmss(tl["END"]))
table = "\n## 4. The video, beat by beat (generated from the built timeline: times are the video's own)\n\n| Time | Scene / line | On screen | Who | Exact words |\n|---|---|---|---|---|\n" + "\n".join(rows) + "\n"
tail = open(f"{H}/script_tail.md").read() if os.path.exists(f"{H}/script_tail.md") else ""
open(os.path.join(H, "..", "p3_ep27_bridge_script.md"), "w").write(hdr + table + tail)
print("wrote ../p3_ep27_bridge_script.md", len(rows), "rows; length", mmss(tl["END"]))
