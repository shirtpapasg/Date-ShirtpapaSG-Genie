"""make_todo.py (EP0, the mind map special): tl_p1.json / tl_p2.json + the staging notes below -> SCENES_TODO.md: every scene with its time,
its place and camera, the hidden animal's spot, the buddies' poses WITH THEIR REASONS, and every spoken line with its time. EP0 was staged
and drawn in one session (Stage 1 and Stage 2 together), so this file records what p1.js / p2.js draw (the code's comments say the same)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
NOTES = {1: {
 "void": "Void deck study corner, Monday after school. Heart speaks at 0.30 s. Pip big left reading the poster (calm smile), Basil big right at his sheet (thinking: working out his first branch), Momo mid. Tags joined: a ready-made map, Basil's own map. Crow: top of the lamp post (intro spot). One slow eased push from frame 1.",
 "title": "READ IT OR MAKE IT? / WHO REMEMBERS MORE? over the dimmed void deck.",
 "plans": "Pip a happy hop (his plan), tag read ×5; Basil a bold hop (his plan). Crow: lamp post (before the game: intro spot allowed).",
 "rules": "Glide to the notice board (ONE-WEEK MEMORY TEST readable, ~2 s), then on to the lamp post. Momo big, pointing at the card (showing it).",
 "game": "ONE push-in onto the crow; black ring on the game stage; Basil the finder points at it; rules. Small print: We look, and we do not feed it.",
 "goals": "Basil reads the three goal cards (his turn).",
 "puzzle": "Stone table from above, six cards (READ / WORK IT OUT), readable. All three thinking after the puzzle is set (a question). Basil's teal pencil writes p, o, r with ticks. Momo pleased after her line (no pose swap).",
 "r1": "Cloth over the cards (no peeking!), lockN 5 s: ONE set of three numbered picture cards, clue labels read / worked out / later on top of the ring. Basil worried in the ring; picks Pip 1, Momo 2, Basil 2; Basil points after his line (showing).",
 "later": "The cloth stays; memory test: later! tag.",
 "lcmaps": "[LOOK CLOSER] read it (the app's poster, Pip's eye-line sliding, read ×n) / make it (Basil's sheet, pencil stops: he stops and thinks; his own words glow gold). Faces: Pip lower left (listening), Basil lower right briefly (thinking: working out a branch), Momo (teaching MAKE YOUR OWN, pointing at Two poles, cheer after her line: a key word learnt). Verdict MAKE IT YOURSELF.",
 "mark1": "Momo: Say it with me!, 0.8 s, reads Mark Sentence 1; under it the poster (read) and Basil's map (made).",
 "memtest": "Stone table, cloth on; THINK!; a 4 s quiet with no music (sound_cues cuts the bed); all three thinking, eyes on the cloth.",
 "lcmem": "[LOOK CLOSER] two whiteboards; Pip's needle written then fades COMPLETELY (gone); the cloth lifts, the cards come back, the worked-out words glow; answer cards with card 2 ticked. Pip face close-up (a big feeling: his own word gone): surprised, then oops from the answer (OUTCOMES, to the end of lcmem). Basil teaches GENERATION EFFECT, cheer after (a key word learnt). Momo and Basil confident (OUTCOMES). Coin +1.",
 "holdon": "Momo copies the poster word for word (eye-line arrow, look · copy · look · copy). HOLD ON! stamp; the ring takes the stage (her sheet and the poster, clue labels poster open / word for word / her own?); only Momo (worried in the ring). After the bell: Momo face close-up (oops: a big feeling); Momo shy to the end of mark2; Pip and Basil confident. Pip turns the poster to the wall (pointing: showing it), poster closed tag; Basil MEMORY FIRST. Crow: on the playground railing past the pillars (new spot). Small print: Mistakes are how we learn.",
 "mark2": "Basil reads Mark Sentence 2; under it Momo's copied sheet (grey) and Basil's map with the poster's back (gold). Momo small, still shy.",
 "final": "Score hand YOU 2 : BUDDIES 1, high five.",
 "liz": "ONE push-in onto the crow on top of the letterboxes (reveal spot, new); fun fact panel: a plain cartoon mask, years later, crows remember. Momo surprised then talks; Pip surprised on years later; Basil points at the crow; Pip waves on Tell someone at home!",
 "kwrecap": "Read-along: MAKE YOUR OWN · GENERATION EFFECT · MEMORY FIRST.",
 "cliff": "Dusk, lights coming on. Pip with the poster on its easel (read ×5 tonight), Basil with his map and a Tue · Thu card on the table.",
 "nextq": "NEXT · Who remembers more? THREE numbered picture cards 1 Pip, 2 Basil, 3 Both the same; PART 2 slams.",
 "nyk": "Now you know! Basil's own map and the ONE-WEEK MEMORY TEST card between the buddies."},
 2: {
 "lasttime": "Three pictures one at a time (>= 2.5 s each), one label each: Read it or make it? · Worked out: remembered better · Memory first: poster closed. Heart speaks at 0.30 s.",
 "week": "Void deck, Monday evening (lights on, moths, crickets). Day pill Mon. Cat: asleep under the stone bench beside the potted plant (intro spot). MAKE YOUR OWN carried onto the shelf (kw_carry).",
 "game": "ONE push-in onto the sleeping cat; Momo the finder (a knowing smile, points under the benches). Small print: We look, and we let it rest.",
 "goals": "Momo reads the three goal cards.",
 "r1": "Part 1's lock-in, a short 3 s ring; picks Pip 2, Momo 2, Basil 3 (a bold grin: he believes it). see you next Monday! tag.",
 "app1": "The tablet big, TheOneApp's REAL screens (capture.js): home (the Supertree's Mind Maps label glows, tap ripple) -> Mind Maps page -> tap Make my own mind map -> the sheet. Basil big at the left (focused smile, doing the steps). Cat: on the low wall, washing a paw (new spot).",
 "app2": "Chapter drop-down -> Magnets (P3) -> Start a new mind map -> the editor: middle word Magnets (glow + tag). The poster on its easel turns to the wall (poster closed).",
 "app3": "Basil types from memory: ed01..ed12 step on his words (the app's own map drawing), a smooth eased push onto the map and back for the Mark button (⏳ Marking…).",
 "lccheck": "[LOOK CLOSER] the app's ✓ badges pop at the app's own pace (130 ms frames); the marks box with + Something from the poster is missing (ringed); Compare with the poster: Making a magnet ringed (missing from Basil's map); Back to my mind map; the new branch typed; Mark it again: Every idea is right and your map is complete. Well done!. Basil's face: thinking at the missing row, CHECK AND FIX, cheer after (a key word learnt). Verdict CHECKED AND FIXED.",
 "mark3": "Pip reads Mark Sentence 1 of Part 2; under it Basil's map with ticks and the new gold branch.",
 "show": "Pip's steps poster, lines light as he reads; Showdown ring 5 s (the poster big, the YOU hand); Pip worried in the ring. Cat: behind the potted plant at the lift lobby, only its striped tail (new spot).",
 "fix": "Line 2 struck at Basil's 'two' (kept), the green rewrite; Pip face close-up (oops) as the strike lands, shy through the fix (OUTCOMES); Basil (pointing at line 2: showing) and Momo confident. Coin +2.",
 "waitw": "The camera glides into Basil's map on the tablet (to Like poles repel); Be an idea!; the buddies wave goodbye and shrink. Small print: A picture of remembering, not a real brain.",
 "garden": "BE AN IDEA (a picture of Basil's memory): the sign like poles repel (two bar magnets, red N ends facing, pushing apart), the path to the gate Basil, faint paths to North pole and iron and steel; grass grows over the path (blades rooted in the ground) between the days, a speeded up tag and a day pill; on Tuesday and Thursday the light comes along the path from the gate and the path clears, then is wide and bright. Riders: Momo surprised as the grass grows (an unexpected sight).",
 "pullout": "Out through the tablet; Thursday afternoon in the rain (a wet umbrella by the table). Heart: There is no real garden in your head.",
 "space": "Thursday, rain. The camera pushes to the card: Basil's row fills Mon/Tue/Thu (ticks), Pip's row read ×5 on Mon only; the tablet on the table shows My Magnets mind map, 2, 3. Momo teaches SPACE IT OUT (pointing along the row, cheer after). Cat: sheltering under the bicycle bay's roof (new spot).",
 "mark4": "Basil reads Mark Sentence 2; under it Day 1 · Day 3 · Day 7 with a small map on each.",
 "pages": "Next Monday morning (sun through the pillars). Two sheets on the table, the maps drawn from memory (speeded up); the poster turned to the wall, the tablet face down. Both thinking (remembering). Cat: stretched out in the sun on the top step of the stairs (new spot).",
 "lcpages": "[LOOK CLOSER] Pip's page 2 branches, Basil's page all 5 and his three practice maps (drawn from memory 3 times); answer card 2 ticked; coin +1. Basil face close-up: surprised (he won, but picked three), then a sheepish oops (OUTCOMES); Pip confident, his line. Verdict MADE, CHECKED, SPACED OUT.",
 "chant": "Call and response: Make it yourself! · Memory first, then check! · One day, three days, a week! (YOUR TURN after each).",
 "final": "Score hand YOU 3 : BUDDIES 1, high five.",
 "liz": "ONE push-in onto the cat asleep on the doormat by the lift (reveal spot, new); fun fact: a pet cat learns its own name, even from a stranger. Basil points at the cat; Pip waves.",
 "dare": "YOUR DARE: three cards, each a crop of TheOneApp's real screen; all three point at the viewer (inviting). Small print: Pick any chapter you are learning.",
 "kwrecap": "Read-along: MAKE YOUR OWN · CHECK AND FIX · SPACE IT OUT.",
 "nyk": "Now you know! Basil's five-branch map and the filled card."}}
mm = lambda s: f"{int(s // 60)}:{s % 60:05.2f}"
out = ["# EP0 (the mind map special): scenes, staging and lines", "", "Generated by `make_todo.py` from `tl_p1.json` / `tl_p2.json`. Rules followed throughout: SERIES_FORMAT.md (a voice in the first second; Kampong Walk as the one bed, added by ../add_lofi.py; the corrected buddy shy through the whole fix, the right ones confident (lib.js OUTCOMES); face close-ups only for a big feeling; every leaf on a stem; nothing floats; labels joined; lock-in ring pictures clipped and centred; Look Closer faces clear of labels).", ""]
for P in (1, 2):
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json")))
    out += [f"## Part {P} ({mm(tl['END'])})", ""]
    for s in tl["scenes"]:
        out += [f"### {mm(s['t0'])} `{s['name']}` ({s['t1'] - s['t0']:.1f} s)", "", NOTES[P].get(s["name"], ""), ""]
        for id in tl["order"]:
            L = tl["lines"][id]
            if s["t0"] - .01 <= L["t"] < s["t1"]: out.append(f"- {mm(L['t'])} `{id}` {L['who']}: {L['text']}")
        out.append("")
open(os.path.join(H, "SCENES_TODO.md"), "w").write("\n".join(out)); print(len(out), "lines")
