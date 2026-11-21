"""make_scenes_todo.py: writes SCENES_TODO.md (the artist's brief for Stage 2) from the two timelines (tl_p1.json, tl_p2.json) and the
notes below. Times, lines and marks come from the timelines, so re-run this after any retime:  python3 make_scenes_todo.py"""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
fmt = lambda t: f"{int(t // 60)}:{t % 60:04.1f}"
NAME = {"heart": "Heart", "pip": "Pip", "basil": "Basil", "momo": "Momo", "chant": "all three"}

# per scene: (what must be drawn, from the script's "On screen" column; reuse; new)
S1 = {
 "cold": ("Silent cold open. A bright morning KITCHEN IN AN HDB FLAT: a table by the window (far HDB blocks and a rain tree outside), the sink with a tap and a soap pump, a fridge with magnets, a wall clock, a pedal bin. On the table, spaced out: a white tray labelled **OUR BREAD BAG** with a fresh slice of white bread and an open, empty clear resealable bag beside it; a mixing bowl of pale dough under a cloth with a small packet labelled **yeast**; a day pill **DAY 1**. At mark `coldBoards` EP6's two picture boards slide in LOW along the table with dust puffs and stand at the back: the slice with grey-green mould (tag *mould*) and the loaf with its packet (tag *yeast*). Pip, Basil (surprised) and Momo pop in, in their aura discs. Location pill *A kitchen in an HDB flat, Singapore*. No title.",
          "`hdbBlock` (props.js) for the far blocks; `rainTree` (ep06/gardens.js); `wallClock` (hotel.js); EP6's dare boards `mouldBread` and `yeastLoaf` (ep06/beasts.js; copy, do not edit ep06) on `wboard` (wetland.js) or EP4's `board` (ep04/ep4.js); `dayCounter`/`counter` (common.js/lib.js) for the day pill; `slideX`/`dust` (hotel.js) for the low slide with dust puffs; `buddy(..., {aura:true})`.",
          "The whole kitchen set (`BG.kitchen`, morning; bake it with `node bake.js kitchen`): window, sink + tap + soap pump, fridge with magnets, pedal bin, table. The tray **OUR BREAD BAG**, the clear resealable bag (coloured zip strip, lies flat, a shadow), the slice, the dough bowl + cloth + yeast packet."),
 "callback": ("The two boards glow in turn as Heart names them (words *mould*, *yeast* in g201); EP6's two answer cards pop under them: **1 Mould · 2 Yeast**; tag between them *Both are fungi!* (word *fungi*). Then Basil big in his disc (cheer); the slice, the bag and the day pill pulse at his words *slice*, *bag*, *days* (g202).",
              "`ansCard` (trail.js); EP5 `SC.callback` (ep05/p1.js) for the layout; the kitchen and boards from `cold`.", "Nothing beyond the kitchen props."),
 "title": ("The picture dims; title slams in: **BREAD IN A BAG** (white) and **10 DAYS. WHAT GREW?** (sun yellow), BOTH at mark `slam1` (CUT 1: the second slam was cut). Pill *Hold on to your answer!*",
           "EP5 `SC.title` (ep05/p1.js) / EP4 `SC.title`: make it one slam.", "-"),
 "game": ("EP1's rules scene, short: the YOU vs BUDDIES board, the answer hand and the score hand, the three buddies, the little lizard with a question mark, *Find the lizard!*",
          "`gameScene(t, s, \"g301\", true)` (common.js). NOTE: it looks up the word *buddies*, which this short line does not have (the console says \"no word buddies\"): time the buddies on another word (e.g. *every*) or on `LT(\"g301\")`.", "-"),
 "goals": ("*Today you'll learn*: three chips drop in and light up in turn: **How fungi get their food** · **How fungi spread** · **Useful or harmful fungi**. Nothing is spoken.",
           "`goals3(t, s, [[text, icon], ...])` (common.js).", "Three small chip icons (bread with threads, a mushroom dropping spores, a green/blue pair of trays)."),
 "count": ("The countdown.", "Already drawn: `SC.count` (common.js).", "-"),
 "day1": ("Close on the tray; the day pill **DAY 1** pulses. The slice slides low into the open bag (word *slice*); the zip strip closes left to right with a small glow (word *seal*), tag *sealed*. The bag lies flat on the tray. Small print, fully inside the frame, UPPER LEFT: *An adult helps. The bag is never opened. Wash your hands.* In the background the dough bowl under its cloth, tag *bread dough + yeast*.",
          "`finePrint` (common.js; move it to the upper left); `tpill` tags.", "The zip-closing animation; the bag with the slice inside."),
 "days": ("Time-lapse, tag **speeded up**. The window light sweeps day -> night -> day; the day pill counts **DAY 2 ... DAY 10**: DAY d shows from `MK(\"lapse0\") + (d - 2) * DAYSTEP` (DAYSTEP = .85 s, set in sound_cues.js; a soft tick sounds on each). In the bag: nothing until Day 4 (small WHITE fuzzy dots; a low \"ooh\" note), Day 6 (green patches), Day 8 (bigger, some grey-black), Day 10 (large fuzzy patches, white edges, green and grey-black middles; fine drops of water inside the bag). HIDDEN LIZARD: on the fridge door among the magnets during two night sweeps, about 3 s in all (the quiet \"chek-chek\" sounds at `lapse0 + 2.5 * DAYSTEP` and `lapse0 + 6.5 * DAYSTEP`: make those two nights). The buddies lean in, surprised. (CUT 2: Heart's \"Day ten!\" was cut; DAY 10 lands in silence at mark `day10`.)",
          "`cicak` (props.js) for the house lizard (teacher's note 11: rounder head, small eyes, soft rim light; see EP6's `houseLiz`, ep06/gardens.js); the kitchen set with a night version of the window light.",
          "Six mould stages (none, white dots, green patches, bigger grey-black, Day 10 fuzzy with drops): mould is FUZZY, never a flat stain. Day/night window light sweep. Fridge magnets."),
 "holdon": ("Momo big in her disc, leaning to the bag (POINTING pose), her bubble with the ✗ chip (g602). HOLD ON! stamp (word *hold* in g603); the YOU ring with crossed arms, 5 s (`ring0_1` -> `bell_1`). Coin **+1** *arms crossed* (word *one* in g604). A cream safety card stands on the table: **Never touch or sniff mould.** · *The bag stays shut.* (word *never*); the zip strip glows (word *bag*). Momo: OOPS pose (g605). Score 1 : 0.",
            "EP5's HOLD ON! routine `SC.rule` (ep05/p1.js: the stamp, the arms-crossed ring, the coin); `ringTimer`, `scoreboard` (lib.js).", "The safety card."),
 "patches": ("Close on the Day 10 bag. A small replay strip above it: the patches on Day 4, Day 6, Day 10, each bigger (tag *It grew!*), on g702 (CUT 3: Momo's \"Is it dust?\" was cut; Heart now says \"It is not dust. It grew!\"). The book's sentence g703 on a CREAM STRIP (see `strip` times below). Key word **BREAD MOULD** pops large at `kw_mould`, holds 2.0 s, flies to the shelf (lib.js does this). Then a small cream word box **one fungus · many fungi**: each word lights as Heart says it (g704 words *fungus*, *fungi*).",
             "`bookCaption` (common.js) for the cream strip; the shelf pop is automatic (lib.js `KW`).", "The replay strip (three small frames of the bag); the word box."),
 "r1card": ("ROUND 1 card.", "Already drawn: `SC.r1card` (common.js).", "-"),
 "r1": ("Lock-in, three cards: **1 It makes its own food · 2 From the bread · 3 It needs no food**; question on top *How does the mould get its food?*; in the ring: the sealed bag with its patches, tag *Nobody fed it!* Ring 5 s (`ring0_2`). LOCKED IN! The buddies reveal after the viewer: Pip **3** (THINKING pose, ✗ chip, g803), Basil **2** (CHEER, g804), Momo **2** (she flips her card and nods, no line: at mark `momoFlip`).",
        "`lockN` (common.js), as in every round. NOTE: Momo answers without a line: give her pick a flip time of `MK(\"momoFlip\")` (lockN's `fixed` flips at the start).", "The bag for the ring."),
 "waitw": ("Back at the table. The day pill flips back to **DAY 1**. Pill **Be a spore!** The camera dives towards the fresh slice; a soft cream wipe (g901).",
           "`wipe` (lib.js); EP5's `SC.waitw` (ep05/p1.js).", "-"),
 "shrink": ("BE A SPORE, first person, present tense (in shrink.js). Mark by mark: `dive` -> **in the air** (g902): the kitchen from a floating speck, the table edge like a cliff, a cup far away as big as a tower, slow dust motes near you, big and soft; tags *You: one spore* · *too small to see*. `land` (g903): the slice rises to meet you, a white field full of holes like caves; soft landing; tag *on the bread*. `bag` (g904): a clear plastic sky slides over you, the zip closes far above with a glow (word *closes*); tag *inside the bag*. `threads` (g905; tag **speeded up**): thin WHITE threads spread from you along the bread and down into its holes; tag *threads*. `substance` (g906): a clear shiny film spreads from the threads; where it touches, the crumb breaks into small pale dots (word *breaks*); tags *a substance* · *simpler substances*. `absorb` (g907): the dots flow gently into the threads, which thicken; tag *absorb = take in*. `patch` (g908): the camera rises a little: fuzzy white growth all around, tiny stalks with green-grey heads, fine dust lifting off; tag *new spores*. No buddies in the journey. The fungus ABSORBS, it never eats.",
            "`youTag`, `feelTag`, `uwSpecks` (shrink.js, kept); the journey structure of EP5 (ep05/shrink.js) and EP4's spore on the wind (ep04/shrink.js); `cup` (ep02/p2.js) for the far cup.", "The whole spore world: kitchen air at speck scale, the bread landscape with caves, the plastic sky, threads, the film, crumbs breaking into dots, the fuzzy patch with stalks and dust."),
 "reveal": ("Pull back out to the table, Day 10 (mark `pullout`). Answer card **2 From the bread** glows (word *two* in g1001). Basil and Momo CHEER; Pip SURPRISED, then a nod.", "EP5 `SC.reveal` (ep05/p1.js); `ansCard`.", "-"),
 "mark1": ("**MARK SENTENCE 1 of 2.** Basil beside the card says \"Say it with me!\" (g1002) with a hop; 0.8 s; Heart reads slowly (g1003), words appear as she says them. Highlights: *do not make their own food*, *grow on another object*, *substance*, *simpler substances*, *absorb*. Under the card three small pictures light in turn (the patch on the bread at *grow*, the shiny film at *substance*, the dots flowing in at *absorb*). The card holds 2.5 s. Then **ABSORB** pops (`kw_absorb`, automatic) with a small tag *absorb = take in*. Coin **+1** *if you showed two fingers* (word *one* in g1004). Score 2 : 1.",
           "`markScene(t, s, {who: \"basil\", sayId: \"g1002\", id: \"g1003\", ...})` and `markCard` (common.js, lib.js); footer *P3 · Diversity · Classification of living things*.", "Three small under-card pictures."),
 "mushroom": ("A picture board slides in LOW and stands on the table: a fresh market mushroom, side view, large. Plain-line labels pop as Heart says them: **cap**, **stalk** (g1101); then the board flips to the UNDERSIDE of the cap (word *under*): thin lines running out from the stalk, label **gills**, small tag *not a fish's gills: these hold spores*. Basil CHEER, his joke g1102. At mark `gillsdust` a fine BROWN dust falls from the gills; two white wind streaks carry it off right, past the window (word *wind*). The book's two sentences on a cream strip (g1103); small tag under *dispersed*: *spread far and wide*.",
              "EP4's `mushroom` (side view) and `lab4` labels and `board` (ep04/ep4.js); `windLines` (trail.js) for the wind streaks; `bookCaption`.", "The mushroom's UNDERSIDE with gills (new); the spore dust."),
 "mark2": ("**MARK SENTENCE 2 of 2.** Momo says \"Say it with me!\" (g1104); 0.8 s; Heart reads (g1105). Highlights: *reproduce*, *very quickly*, *spores*. Under the card: the mushroom with its dust, and the fuzzy patch with its dust. Holds 2.5 s. Then **SPORES** pops (`kw_spores`, automatic).",
           "`markScene` (Momo, pointing pose).", "-"),
 "r2card": ("Round card **ROUND 2 · YOUR ANSWER FROM LAST TIME**.", "`roundCard` (common.js): change `SC.r2card` for Part 1 to `roundCard(t, s, \"ROUND 2\", \"YOUR ANSWER FROM LAST TIME\")`.", "-"),
 "r2": ("EP6's two boards and its two cards again: **1 Mould · 2 Yeast**; *Which fungus is useful?* A SHORT ring, 3 s (`ring0_3`). LOCKED IN! The three buddies flip **2** together (unison u1203); then Basil alone, CHEER (g1204). Card 2 glows (g1205 *Yes! Yeast.*).",
        "`lockN` with a 2-card set; the unison pick is supported (`uni`).", "-"),
 "trays": ("Pip, THINKING pose, small ✗ chip (a question, g1206). At `traysIn` two trays slide in low and stand side by side: a GREEN tray **USEFUL** and a BLUE tray **HARMFUL**, both empty. Cream strip g1207, *useful* and *harmful* highlighted. Four picture boards hop low, one by one, onto the trays as Heart reads the strips: `b_mush` USEFUL (1) a punnet of market mushrooms, tags *edible = safe to eat* and a small safety badge *Never pick wild mushrooms!* (g1209); `b_dough` USEFUL (2) the dough bowl: short replay, tag **speeded up: about 1 hour**, the dough swells and lifts its cloth, the packet glows; **YEAST** pops (`kw_yeast`, automatic); `b_tempeh` USEFUL (3) a white slab of tempeh on a banana leaf, a nasi padang stall behind, tag *tempeh*; `b_mould` HARMFUL (4) the mouldy slice in its sealed bag, a small tummy-ache icon. Coin **+1** *if you showed two fingers* (g1213). Score 3 : 2.",
           "EP1's sorting trays (`tray` in ep01/scenes_d.js); `mushroom` (ep04) for the punnet; the dough bowl and the bag from this episode; `bookCaption`.", "Two trays (green USEFUL, blue HARMFUL); the punnet; the rising-dough replay; the tempeh board with a nasi padang stall; tummy-ache icon; the safety badge."),
 "final": ("The score hand (3 fingers = high five). Buddies 2.", "`finalScene(t, s, \"g1301\", 2, tips)` (common.js).", "-"),
 "liz": ("A replay of the fridge door at night with a ring round the little lizard among the magnets. Question pill *Is a lizard a fungus?* · *Tell someone at home!*", "`lizReveal` (common.js) with the night kitchen view.", "-"),
 "kwrecap": ("The read-along: BREAD MOULD · ABSORB · SPORES · YEAST.", "Already drawn: `SC.kwrecap` (common.js).", "-"),
 "cliff": ("The table, **DAY 10**. An adult's GLOVED hand carries the sealed bag LOW to the pedal bin and drops it in, still zipped; the lid closes (word *bin*); tag *still shut*. Cut to the sink (word *then*): two bare child's hands under the tap, the soap pump beside them; the hands look perfectly clean. Pip, POINTING pose (g1402). A big **?** pops over the hands. **PART 2** slams in (word *find* in g1403).",
           "`adultArm` (hotel.js) / `adultHand` (trail.js) with a glove colour; `countHand` (lib.js) as a starting point for the child's hands.", "The gloved hand; the bin lid; the sink close-up with two child's hands under running water."),
 "nyk": ("EP1's ending exactly; the two trays stand between the buddies; about 4 s of outro; no text in the bottom fifth.", "`nykScene(t, s, prop)` (common.js) with the two trays as `prop`.", "-"),
}
S2 = {
 "recap": ("Silent recap montage, four shots of Part 1, one second each, tagged *Part 1*: the slice sealed in its bag on **DAY 1**; the white threads of the spore journey; the **DAY 10** patches beside the risen dough; the clean hands at the sink with a big **?**.", "Part 1's scenes (call them at fixed times); EP5 `SC.recap` (ep05/p2.js).", "-"),
 "lasttime": ("The kitchen. The two trays from Part 1 on the table: the mouldy slice (in its bag, as a picture board) on the BLUE **HARMFUL** tray, the risen dough on the GREEN **USEFUL** tray; each glows as Heart names it (words *harmful*, *useful* in j201). Then the camera moves to the sink (word *washed*): the two clean hands, a big **?** over them.", "Part 1's kitchen, trays and sink.", "-"),
 "pipclean": ("Pip big in his disc beside the hands (THINKING pose, small ✗ chip, j202). A white glove points at one fingertip (j203).", "`pointHand` (lib.js) in white.", "-"),
 "goals": ("*Today you'll learn*: **How we see bacteria** · **Harmful or useful bacteria** · **The whole chapter on one map**. Nothing is spoken.", "`goals3` (common.js).", "Three chip icons (a microscope, the two trays, a little map)."),
 "game": ("The short rules scene: the ring, the lizard with a question mark (j301).", "`gameScene(t, s, \"j301\", false)` (common.js) works as is.", "-"),
 "microscope": ("A picture board slides in low and stands on the table: a MICROSCOPE with plain-line labels **eyepiece**, **lens**, **stage**. The book's sentence on a cream strip (j401). **MICROSCOPE** pops (`kw_microscope`, automatic).", "EP4 `board` and `lab4` (ep04/ep4.js); `magnifier` (wetland.js) for style.", "The microscope (eyepiece, lens, stage)."),
 "scopes": ("A row of three microscopes on the board, each bigger than the last (a simple one, a better one, a modern one); beside the last, a ROUND VIEW opens: first a soft fuzzy edge of mould (tag *fungi*), then the view pushes in past it to much smaller shapes (word *smaller*). Strip j402, *even smaller than fungi* highlighted. Never say or show fungi as too small to see.", "-", "Two more microscopes (old, better); the round microscope view."),
 "shapes": ("The round view, large. Three kinds of bacteria drift in it; one of each comes to the middle with the book's label as Heart says it: **rod-shaped**, **sphere-shaped (round)**, **spiral-shaped** (j403). No faces, no legs. Then a small cream word box **one bacterium · many bacteria** (j404, each word lights). Then the strip j405.", "EP4's `bact3` / `bRod` / `bRound` / `bSpiral` (ep04/ep4.js).", "The word box."),
 "waitw": ("Pill **Be a bacterium!** The camera dives from the round view onto a child's fingertip; a soft wipe (j501).", "`wipe` (lib.js).", "-"),
 "shrink": ("BE A BACTERIUM, first person (in shrink.js). `dive` -> **on the fingertip** (j502): your own rounded rod-shaped front edge at the bottom of the frame; the skin of the fingertip a landscape of long curved RIDGES like rows of hills running away; other rods, spheres and spirals in the valleys (near ones big and soft, far ones tiny); tags *You: one bacterium* · *too small to see*; a small inset top left shows the same hand at normal size, perfectly clean. `hills` (j503). `recess` (j504): the hills tilt; far away and huge, a SCHOOL CANTEEN (long tables, stall signs, a tray); a sandwich comes closer like a cliff; tags *recess, at the school canteen* · *before eating...* `wash` (j505): a tap as tall as a tower, a wall of clear water (word *water*), then white bubbles as big as houses roll over the hills (*soap*, *bubbles*) and lift you off (*lift*); tags *water* · *soap*. `drain` (j506): you ride the foam down the sink in a slow spiral into the dark; tag *washed away*. `clean` (j507): back up, the rinsed shining hand lifts the sandwich. No faces on any bacterium; the camera is a rod.",
            "`youTag`, `feelTag`, `uwSpecks` (shrink.js); EP2's first-person water journey (ep02/micro.js) for the one-long-shot structure.", "The whole fingertip world: ridge hills, bacteria in valleys, the far canteen, the sandwich cliff, the tower tap, house-sized bubbles, the drain spiral, the inset hand."),
 "pullout": ("Pull back out to the kitchen sink. Basil, CHEER pose (j508).", "-", "-"),
 "harmful": ("The hands at the sink, soapy. The book's sentence on a cream strip (j601), *harmful* highlighted, a small tummy-ache icon. **HARMFUL** pops (`kw_harmful`, automatic). Then a cream reminder card **Wash your hands with soap before you eat.** (j602).", "`bookCaption`; Part 1's tummy-ache icon.", "Soapy hands; the reminder card."),
 "r1card": ("ROUND 1 card.", "Already drawn: `SC.r1card` (common.js).", "-"),
 "r1": ("Lock-in, two cards: **1 Yes · 2 No**; *Are all bacteria harmful?*; in the ring: the round microscope view with the three shapes. HIDDEN LIZARD: on the kitchen wall clock for about 3 s during the ring, from `ring0_1` to `ring0_1 + 3.0` (two quiet \"chek-chek\" at +1.0 and +2.6). Ring 5 s. LOCKED IN! Basil **1** (ARMS-CROSSED pose, ✗ chip, j703), Momo **2** (j704), Pip **2** (j705).", "`lockN` (2 cards); `wallClock` (hotel.js) + `cicak` (props.js).", "-"),
 "yoghurt": ("The fridge door opens; a cup of yoghurt and a small yoghurt drink slide out LOW onto the table. Answer card **2 No** glows (word *two* in j706).", "Part 1's fridge.", "The yoghurt cup and the yoghurt drink; the fridge door opening."),
 "mark1": ("**MARK SENTENCE 1 of 2.** Basil says \"Say it with me!\" (j707); 0.8 s; Heart reads (j708). Highlights: *harmful*, *useful*. Under the card: the BLUE HARMFUL tray (the hands, unwashed, with a tummy-ache icon) and the GREEN USEFUL tray (the yoghurt). Holds 2.5 s. Then **USEFUL** pops (`kw_useful`, automatic).", "`markScene` (Basil, cheer pose); Part 1's trays.", "-"),
 "body": ("A simple outline of a child's body with a soft glow at the tummy and a few rod shapes in it (no faces); strip j709. Then the yoghurt cup and the yoghurt drink with tag *useful bacteria inside* (j710). Coin **+1** *if you showed two fingers* (j711). Score 1 : 1.", "`bRod` (ep04).", "The body outline."),
 "showcard": ("SHOWDOWN · DOUBLE POINTS card.", "Already drawn: `SC.showcard` (common.js).", "-"),
 "show": ("Pip's homework on an easel: a ruled table, no pictures. Columns **has spores** · **makes its own food** · **has feathers**. Rows **A** ✓ ✓ ✗ · **B** ✓ ✗ ✗ · **C** ✗ ✗ ✓. Each row lights cell by cell as Heart reads it (j801 words *spores*, *food*, *spores*, *food*, *feathers*, *food*: a soft tick on each). Under the table Pip's three answers appear as he says them (j802 *one*, *two*, *three*): **1** A is a fungus. **2** B is a fungus. **3** C is a bird. The YOU ring with a counting hand, 6 s (`ring0_2`). LOCKED IN! Basil **1** (CHEER, j805), Momo **1** (j806); Pip OOPS (j807).", "`boardEasel` (hotel.js); EP4's `noteBoard` (ep04/ep4.js) and EP3's `notebook` (trail.js) for ruled tables; EP5's Showdown (`fieldNotes`, `showView` in ep05/p2.js); `lockN`/`ringTimer`.", "The characteristics table."),
 "fixed": ("Line 1 is rubbed out and rewritten in green: *A is a plant.* Three pictures pop beside the rows: a bird's nest fern by A, a mushroom by B, the kingfisher by C. A cream tip card **Read every column.** · *spores + cannot make its own food = a fungus*. Coin **+2** (j809 *two*). Score 3 : 1.", "`nestFern` and `mushroom` (ep04/ep4.js); `kingfisher` (wetland.js); EP5's `SC.fixed` (ep05/p2.js).", "The tip card."),
 "map": ("A big MAP BOARD slides in low and stands on the floor in front of the table. It builds from the top: **LIVING THINGS** (j901 *living*); four branches in EP4's colours: **PLANTS** green, **ANIMALS** orange, **FUNGI** brown, **BACTERIA** blue. Sub-branches pop as Heart names them, each with a small picture: PLANTS **flowering** (the chilli plant) · **non-flowering** (the bird's nest fern) (j902); ANIMALS **amphibians** (frog) · **birds** (kingfisher) · **fish** · **insects** (ant) · **reptiles** (monitor lizard) · **mammals** (bat) (j903, in this order); FUNGI the mushroom and the bread mould; BACTERIA the three shapes (j904). Then the book's sentence on a cream strip under the map (j905).",
         "EP4's `GROUPS` colours and `crate4` labels, `chilliPlant`, `nestFern`, `mushroom`, `bact3` (ep04/ep4.js); `frog`, `kingfisher`, `fishG`, `ant` (wetland.js); EP6's `monitor` and `fruitBat` (ep06/beasts.js, copy when EP6 is done).", "The map board itself (a tree of branches)."),
 "chant": ("The map stays, smaller, behind the three buddies. \"Say it with us!\" (u1002), 0.8 s, then the call-and-response chant c1003 on clap, clap, stomp: line 1 (the FUNGI branch flashes), **YOUR TURN!**; line 2 (the BACTERIA branch flashes), **YOUR TURN!**; line 3 (the two trays flash), **YOUR TURN!** No all-together bar. Bar = 2.8 s: the call on the first clap, the answer from the second clap (lines 1 and 2) or on the stomp (line 3).",
           "`chantScene` (common.js). Its words and colours are already set for EP7 (`PHR`, `PCOL`, `chantFlash`); replace its EP3 trail card (`trailCard`) with the small map.", "-"),
 "exambanner": ("Banner **EXAM CORNER** with a bell (j1101).", "`roundCard(t, s, \"EXAM CORNER\")` (common.js) works.", "-"),
 "mark2": ("**MARK SENTENCE 2 of 2**, under the EXAM CORNER banner. Pip says \"Say it with me!\" (j1102); 0.8 s; Heart reads (j1103). Highlights: *classified*, *common observable characteristics*, *plants, animals, fungi and bacteria*. Under the card the four branches of the map light in turn (words *plants*, *animals*, *fungi*, *bacteria*). Holds 2.5 s.", "`markScene` (Pip, pointing pose) with an EXAM CORNER tab.", "-"),
 "final": ("The score hand (3 fingers = high five). Buddies 1.", "`finalScene(t, s, \"j1201\", 1, tips)`.", "-"),
 "liz": ("A replay of the kitchen wall clock with a ring round the little lizard. Question pill *Can you see it without a microscope?* · *Tell someone at home!*", "`lizReveal` (common.js).", "-"),
 "dare": ("Three picture boards slide in low and stand in a row on the kitchen table, each clearly different: a **plastic snack box** with a clear lid and biscuits inside, a shiny **metal snack box**, a **glass jar** of biscuits with a metal lid; tags *plastic* · *metal* · *glass* (words in j1301). On *sand* a small pile of sand pops beside them with a big **?**. Three cards **1 The plastic box · 2 The metal box · 3 The glass jar**. Banner **NEXT · Materials · Lock in your answer!** Basil, SURPRISED (j1302). The same three containers and sand as EP8's cold open: draw them once and share them with EP8.", "EP5 `SC.dare` (ep05/p2.js) for the layout; `ansCard`; `biscuit` (hotel.js).", "The three containers and the pile of sand (shared with EP8)."),
 "kwrecap": ("The read-along: MICROSCOPE · HARMFUL · USEFUL.", "Already drawn: `SC.kwrecap` (common.js).", "-"),
 "nyk": ("EP1's ending exactly; the chapter map stands between the buddies, all four branches lit.", "`nykScene(t, s, prop)` with the map as `prop`.", "-"),
}

def part(p, notes):
    tl = json.load(open(f"{H}/tl_p{p}.json")); out = []
    for sc in tl["scenes"]:
        n = sc["name"]; draw, reuse, new = notes.get(n, ("(not in the notes)", "-", "-"))
        lines = [(id, L) for id, L in tl["lines"].items() if sc["t0"] - .01 <= L["t"] < sc["t1"] - .01]
        lines.sort(key=lambda x: x[1]["t"])
        marks = sorted((t, k) for k, t in tl["marks"].items() if sc["t0"] - .01 <= t < sc["t1"])
        out.append(f"### {fmt(sc['t0'])}-{fmt(sc['t1'])} · `{n}` ({sc['t1'] - sc['t0']:.1f} s)\n")
        out.append(f"- **Draw:** {draw}")
        out.append(f"- **Reuse:** {reuse}")
        out.append(f"- **New:** {new}")
        if lines:
            ls = "; ".join(f"`{id}` {NAME.get(L['who'], L['who'])} {fmt(L['t'])}" + (f" (strip {fmt(L['strip'][0])}-{fmt(L['strip'][1])})" if "strip" in L else "") for id, L in lines)
            out.append(f"- Lines: {ls}")
        if marks: out.append("- Marks: " + ", ".join(f"`{k}` {fmt(t)}" for t, k in marks))
        out.append("")
    return tl, "\n".join(out)

tl1, p1 = part(1, S1); tl2, p2 = part(2, S2)
poses = {}
for f in sorted(os.listdir(os.path.join(H, "..", "characters", "sprites", "poses"))):
    if f.endswith(".png"): w, _, ps = f[:-4].partition("_"); poses.setdefault(w, []).append(ps.replace("_", " "))
POSES = "\n".join(f"- **{w.capitalize()}:** sit (talking, with lip-sync and blinks), " + ", ".join(ps) + "." for w, ps in sorted(poses.items(), key=lambda x: ["pip", "basil", "momo"].index(x[0])))
md = f"""# EP7 scenes to draw (Stage 2, for the artist)

P3 EP7 "A mushroom is NOT a plant: fungi and bacteria". Script: `../p3_ep07_script.md`. Stage 1 (setup) is done: `script.py`, the voices,
the timelines (`tl_p1.json` {fmt(tl1['END'])}, `tl_p2.json` {fmt(tl2['END'])}), the sound (`sound_cues.js` -> `cues_p*.json` -> `song.js` ->
`out/mix_p*.wav`). This file is made by `python3 make_scenes_todo.py` from the timelines; re-run it after any retime.

**How to work.** One `SC.<scene>` per scene below, in `p1.js` / `p2.js` (journeys in `shrink.js`), as pure functions of `t`. Until a scene is
drawn the page shows its name. Time everything on the timeline (`LT(id)`, `LE(id)`, `W(id, word)`, `MK(mark)`, `SCN.<scene>`), never on
numbers: the sound uses the same cues. Look: `PART=1 ./sheet.sh name 4 t1 t2 ...`. Static sets go in `BG.<name>` and are baked with
`node bake.js <name>`. Wrap heavy commands in `flock /tmp/explained_render.lock ...`. Do not write in `ep06/`; copy what you reuse.

**Already done by the engine:** the key-word shelf and the big 2.0 s pops (lib.js `KW`, marks `kw_*`), the round cards, the countdown,
the read-along (`kwrecap`), the HUD. **Rules to keep** (SERIES_FORMAT): buddies always in their aura discs; pose swaps squash -> cut -> stretch
-> hop, never a cross-fade; things travel LOW with dust puffs, never float (only spores drift, in the journey and from the gills); labels fully
inside the frame; USEFUL green, HARMFUL blue; FUNGI brown, BACTERIA blue on the map (EP4's colours); bacteria are rods, spheres and spirals
with no faces; no text in the bottom fifth during the outro; "lizard", never "cicak" on screen.

**Cream strips (book sentences):** a line with `strip` below is a book sentence read aloud on a cream strip (`bookCaption`, common.js). Show it
from the line's start until at least the strip end given (3.5 s or more; the timeline already holds the time).

**Cuts made in Stage 1** (script section 6, Part 1 was 5:18.6): 1 the title's second slam; 2 Heart's "Day ten!"; 3 Momo's "Is it dust?" (Heart
now says "It is not dust. It grew!"). Part 2 (5:15.9) needed no script cut: 0.5 s came out of two picture-only waits (`pullout`, `dare`); its
first listed cut, the recap montage, is one the rulebook requires (section 2), so it stays.

## Poses that exist (`characters/sprites/poses/`)

{POSES}
- Basil has NO pointing, thinking or waving pose (only off-model drafts in `poses_inbox/`): where a routine asks for one he falls back to
  sit. The script never asks Basil to point. Every pose the script names exists; no new pose is needed.
- Other buddy sources: `characters/sprites/*_sit_*.png` (the talking sit sprites), `spr/` (this episode's copies).

## Part 1 · "We Sealed Bread in a Bag for 10 Days. What GREW?" · {fmt(tl1['END'])}

{p1}
## Part 2 · "Your Hands LOOK Clean. What Is Living on Them?" · {fmt(tl2['END'])}

{p2}
## Reuse index (where things already are)

- **ep04/ep4.js:** `mushroom` (side view), `bact3` / `bRod` / `bRound` / `bSpiral`, `chilliPlant`, `nestFern`, `crate4` / `GROUPS` (the four group colours), `board`, `noteBoard`, `lab4` (plain-line labels), `frog`, `fish`, `soilHeap`.
- **ep05/wetland.js** (copied here): `frog`, `kingfisher`, `fishG`, `ant`, `spider`, `wboard`, `magnifier`, `ruler`, `swatch`.
- **ep06/beasts.js** (being built now; copy when EP6 is done): `mouldBread`, `yeastLoaf` (EP6's two dare boards), `monitor`, `fruitBat`. **ep06/gardens.js:** `houseLiz`, `rainTree`.
- **hotel.js** (here): `wallClock`, `boardEasel`, `checkBoard`, `jar`, `adultArm`, `kid`, `picCard`, `biscuit`, `dust`, `slideX`.
- **trail.js** (here): `ansCard`, `adultHand`, `fernLeaf`, `fernClump`, `mushroomLog`, `crate`, `windLines`, `notebook`, `person`, `lizOnWall`.
- **props.js** (here): `cicak` (the house lizard), `hdbBlock`, `cloth`, `BG.stage`, `BG.stage2`, `BG.daystage`.
- **lib.js / common.js** (here): `buddy`, `say`, `countHand`, `pointHand`, `scoreboard`, `ringTimer`, `markCard`, `markScene`, `lockN`, `goals3`, `gameScene`, `finalScene`, `lizReveal`, `nykScene`, `chantScene`, `bookCaption`, `finePrint`, `roundCard`, `counter` / `dayCounter`, `wipe`.
- **ep01/scenes_d.js:** `tray` (EP1's sorting trays). **ep02/micro.js:** the one-long-shot first-person journey. **ep02/p2.js:** `cupboard`.

## Nothing in the script is impossible with the engine; things to watch

- `gameScene` (Part 1) looks for the word *buddies*, which the short rules line g301 does not say: time that beat on another word.
- Momo's Round 1 pick has no line: flip it at `MK("momoFlip")`.
- `chantScene` still stands EP3's trail card beside the buddies: put the small chapter map there.
- `SC.r2card` (Part 1) needs the second line *YOUR ANSWER FROM LAST TIME*.
- The Exam corner banner (`exambanner`) is new to this engine: `roundCard(t, s, "EXAM CORNER")` is enough.
- The dare boards (plastic box, metal box, glass jar, sand) are shared with EP8's cold open: draw them once.
"""
open(f"{H}/SCENES_TODO.md", "w").write(md); print("SCENES_TODO.md", len(md.splitlines()), "lines")
