> STALE (Stage 3, 21 Nov): written before Stage 2. Its descriptions (the lizard, the old recap montage) no longer match the built scenes; see STATE.md and p1.js / p2.js.

# EP7 scenes to draw (Stage 2, for the artist)

P3 EP7 "A mushroom is NOT a plant: fungi and bacteria". Script: `../p3_ep07_script.md`. Stage 1 (setup) is done: `script.py`, the voices,
the timelines (`tl_p1.json` 5:17.2, `tl_p2.json` 5:15.5), the sound (`sound_cues.js` -> `cues_p*.json` -> `song.js` ->
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

- **Pip:** sit (talking, with lip-sync and blinks), arms crossed, cheer, oops, pointing, surprised, thinking, waving.
- **Basil:** sit (talking, with lip-sync and blinks), arms crossed, cheer, oops, surprised.
- **Momo:** sit (talking, with lip-sync and blinks), arms crossed, cheer, oops, pointing, surprised, thinking, waving.
- Basil has NO pointing, thinking or waving pose (only off-model drafts in `poses_inbox/`): where a routine asks for one he falls back to
  sit. The script never asks Basil to point. Every pose the script names exists; no new pose is needed.
- Other buddy sources: `characters/sprites/*_sit_*.png` (the talking sit sprites), `spr/` (this episode's copies).

## Part 1 · "We Sealed Bread in a Bag for 10 Days. What GREW?" · 5:17.2

### 0:00.0-0:06.5 · `cold` (6.5 s)

- **Draw:** Silent cold open. A bright morning KITCHEN IN AN HDB FLAT: a table by the window (far HDB blocks and a rain tree outside), the sink with a tap and a soap pump, a fridge with magnets, a wall clock, a pedal bin. On the table, spaced out: a white tray labelled **OUR BREAD BAG** with a fresh slice of white bread and an open, empty clear resealable bag beside it; a mixing bowl of pale dough under a cloth with a small packet labelled **yeast**; a day pill **DAY 1**. At mark `coldBoards` EP6's two picture boards slide in LOW along the table with dust puffs and stand at the back: the slice with grey-green mould (tag *mould*) and the loaf with its packet (tag *yeast*). Pip, Basil (surprised) and Momo pop in, in their aura discs. Location pill *A kitchen in an HDB flat, Singapore*. No title.
- **Reuse:** `hdbBlock` (props.js) for the far blocks; `rainTree` (ep06/gardens.js); `wallClock` (hotel.js); EP6's dare boards `mouldBread` and `yeastLoaf` (ep06/beasts.js; copy, do not edit ep06) on `wboard` (wetland.js) or EP4's `board` (ep04/ep4.js); `dayCounter`/`counter` (common.js/lib.js) for the day pill; `slideX`/`dust` (hotel.js) for the low slide with dust puffs; `buddy(..., {aura:true})`.
- **New:** The whole kitchen set (`BG.kitchen`, morning; bake it with `node bake.js kitchen`): window, sink + tap + soap pump, fridge with magnets, pedal bin, table. The tray **OUR BREAD BAG**, the clear resealable bag (coloured zip strip, lies flat, a shadow), the slice, the dough bowl + cloth + yeast packet.
- Marks: `coldBoards` 0:03.0

### 0:06.5-0:18.9 · `callback` (12.4 s)

- **Draw:** The two boards glow in turn as Heart names them (words *mould*, *yeast* in g201); EP6's two answer cards pop under them: **1 Mould · 2 Yeast**; tag between them *Both are fungi!* (word *fungi*). Then Basil big in his disc (cheer); the slice, the bag and the day pill pulse at his words *slice*, *bag*, *days* (g202).
- **Reuse:** `ansCard` (trail.js); EP5 `SC.callback` (ep05/p1.js) for the layout; the kitchen and boards from `cold`.
- **New:** Nothing beyond the kitchen props.
- Lines: `g201` Heart 0:06.7; `g202` Basil 0:14.3

### 0:18.9-0:20.8 · `title` (1.9 s)

- **Draw:** The picture dims; title slams in: **BREAD IN A BAG** (white) and **10 DAYS. WHAT GREW?** (sun yellow), BOTH at mark `slam1` (CUT 1: the second slam was cut). Pill *Hold on to your answer!*
- **Reuse:** EP5 `SC.title` (ep05/p1.js) / EP4 `SC.title`: make it one slam.
- **New:** -
- Marks: `slam1` 0:18.9

### 0:20.8-0:28.8 · `game` (8.0 s)

- **Draw:** EP1's rules scene, short: the YOU vs BUDDIES board, the answer hand and the score hand, the three buddies, the little lizard with a question mark, *Find the lizard!*
- **Reuse:** `gameScene(t, s, "g301", true)` (common.js). NOTE: it looks up the word *buddies*, which this short line does not have (the console says "no word buddies"): time the buddies on another word (e.g. *every*) or on `LT("g301")`.
- **New:** -
- Lines: `g301` Heart 0:21.1

### 0:28.8-0:36.4 · `goals` (7.6 s)

- **Draw:** *Today you'll learn*: three chips drop in and light up in turn: **How fungi get their food** · **How fungi spread** · **Useful or harmful fungi**. Nothing is spoken.
- **Reuse:** `goals3(t, s, [[text, icon], ...])` (common.js).
- **New:** Three small chip icons (bread with threads, a mushroom dropping spores, a green/blue pair of trays).
- Lines: `g401` Momo 0:29.2; `g402` Momo 0:30.7; `g403` Momo 0:32.6; `g404` Momo 0:34.3

### 0:36.4-0:42.1 · `count` (5.7 s)

- **Draw:** The countdown.
- **Reuse:** Already drawn: `SC.count` (common.js).
- **New:** -
- Lines: `h501` Heart 0:36.6

### 0:42.1-0:49.6 · `day1` (7.5 s)

- **Draw:** Close on the tray; the day pill **DAY 1** pulses. The slice slides low into the open bag (word *slice*); the zip strip closes left to right with a small glow (word *seal*), tag *sealed*. The bag lies flat on the tray. Small print, fully inside the frame, UPPER LEFT: *An adult helps. The bag is never opened. Wash your hands.* In the background the dough bowl under its cloth, tag *bread dough + yeast*.
- **Reuse:** `finePrint` (common.js; move it to the upper left); `tpill` tags.
- **New:** The zip-closing animation; the bag with the slice inside.
- Lines: `g501` Heart 0:42.7

### 0:49.6-0:57.2 · `days` (7.6 s)

- **Draw:** Time-lapse, tag **speeded up**. The window light sweeps day -> night -> day; the day pill counts **DAY 2 ... DAY 10**: DAY d shows from `MK("lapse0") + (d - 2) * DAYSTEP` (DAYSTEP = .85 s, set in sound_cues.js; a soft tick sounds on each). In the bag: nothing until Day 4 (small WHITE fuzzy dots; a low "ooh" note), Day 6 (green patches), Day 8 (bigger, some grey-black), Day 10 (large fuzzy patches, white edges, green and grey-black middles; fine drops of water inside the bag). HIDDEN LIZARD: on the fridge door among the magnets during two night sweeps, about 3 s in all (the quiet "chek-chek" sounds at `lapse0 + 2.5 * DAYSTEP` and `lapse0 + 6.5 * DAYSTEP`: make those two nights). The buddies lean in, surprised. (CUT 2: Heart's "Day ten!" was cut; DAY 10 lands in silence at mark `day10`.)
- **Reuse:** `cicak` (props.js) for the house lizard (teacher's note 11: rounder head, small eyes, soft rim light; see EP6's `houseLiz`, ep06/gardens.js); the kitchen set with a night version of the window light.
- **New:** Six mould stages (none, white dots, green patches, bigger grey-black, Day 10 fuzzy with drops): mould is FUZZY, never a flat stain. Day/night window light sweep. Fridge magnets.
- Marks: `lapse0` 0:49.6

### 0:57.2-1:20.5 · `holdon` (23.3 s)

- **Draw:** Momo big in her disc, leaning to the bag (POINTING pose), her bubble with the ✗ chip (g602). HOLD ON! stamp (word *hold* in g603); the YOU ring with crossed arms, 5 s (`ring0_1` -> `bell_1`). Coin **+1** *arms crossed* (word *one* in g604). A cream safety card stands on the table: **Never touch or sniff mould.** · *The bag stays shut.* (word *never*); the zip strip glows (word *bag*). Momo: OOPS pose (g605). Score 1 : 0.
- **Reuse:** EP5's HOLD ON! routine `SC.rule` (ep05/p1.js: the stamp, the arms-crossed ring, the coin); `ringTimer`, `scoreboard` (lib.js).
- **New:** The safety card.
- Lines: `g602` Momo 0:57.5; `g603` Heart 1:00.9; `g604` Heart 1:11.7; `g605` Momo 1:18.3
- Marks: `day10` 0:57.2, `ring0_1` 1:05.9, `bell_1` 1:10.9

### 1:20.5-1:33.3 · `patches` (12.8 s)

- **Draw:** Close on the Day 10 bag. A small replay strip above it: the patches on Day 4, Day 6, Day 10, each bigger (tag *It grew!*), on g702 (CUT 3: Momo's "Is it dust?" was cut; Heart now says "It is not dust. It grew!"). The book's sentence g703 on a CREAM STRIP (see `strip` times below). Key word **BREAD MOULD** pops large at `kw_mould`, holds 2.0 s, flies to the shelf (lib.js does this). Then a small cream word box **one fungus · many fungi**: each word lights as Heart says it (g704 words *fungus*, *fungi*).
- **Reuse:** `bookCaption` (common.js) for the cream strip; the shelf pop is automatic (lib.js `KW`).
- **New:** The replay strip (three small frames of the bag); the word box.
- Lines: `g702` Heart 1:20.9; `g703` Heart 1:23.8 (strip 1:23.8-1:27.2); `g704` Heart 1:30.2
- Marks: `kw_mould` 1:27.7

### 1:33.3-1:34.4 · `r1card` (1.1 s)

- **Draw:** ROUND 1 card.
- **Reuse:** Already drawn: `SC.r1card` (common.js).
- **New:** -

### 1:34.4-2:04.8 · `r1` (30.4 s)

- **Draw:** Lock-in, three cards: **1 It makes its own food · 2 From the bread · 3 It needs no food**; question on top *How does the mould get its food?*; in the ring: the sealed bag with its patches, tag *Nobody fed it!* Ring 5 s (`ring0_2`). LOCKED IN! The buddies reveal after the viewer: Pip **3** (THINKING pose, ✗ chip, g803), Basil **2** (CHEER, g804), Momo **2** (she flips her card and nods, no line: at mark `momoFlip`).
- **Reuse:** `lockN` (common.js), as in every round. NOTE: Momo answers without a line: give her pick a flip time of `MK("momoFlip")` (lockN's `fixed` flips at the start).
- **New:** The bag for the ring.
- Lines: `g801` Heart 1:34.6; `g802` Heart 1:53.8; `g803` Pip 1:54.9; `g804` Basil 1:59.3
- Marks: `ring0_2` 1:48.1, `bell_2` 1:53.1, `momoFlip` 2:03.6

### 2:04.8-2:08.8 · `waitw` (4.0 s)

- **Draw:** Back at the table. The day pill flips back to **DAY 1**. Pill **Be a spore!** The camera dives towards the fresh slice; a soft cream wipe (g901).
- **Reuse:** `wipe` (lib.js); EP5's `SC.waitw` (ep05/p1.js).
- **New:** -
- Lines: `g901` Heart 2:05.2

### 2:08.8-2:37.5 · `shrink` (28.7 s)

- **Draw:** BE A SPORE, first person, present tense (in shrink.js). Mark by mark: `dive` -> **in the air** (g902): the kitchen from a floating speck, the table edge like a cliff, a cup far away as big as a tower, slow dust motes near you, big and soft; tags *You: one spore* · *too small to see*. `land` (g903): the slice rises to meet you, a white field full of holes like caves; soft landing; tag *on the bread*. `bag` (g904): a clear plastic sky slides over you, the zip closes far above with a glow (word *closes*); tag *inside the bag*. `threads` (g905; tag **speeded up**): thin WHITE threads spread from you along the bread and down into its holes; tag *threads*. `substance` (g906): a clear shiny film spreads from the threads; where it touches, the crumb breaks into small pale dots (word *breaks*); tags *a substance* · *simpler substances*. `absorb` (g907): the dots flow gently into the threads, which thicken; tag *absorb = take in*. `patch` (g908): the camera rises a little: fuzzy white growth all around, tiny stalks with green-grey heads, fine dust lifting off; tag *new spores*. No buddies in the journey. The fungus ABSORBS, it never eats.
- **Reuse:** `youTag`, `feelTag`, `uwSpecks` (shrink.js, kept); the journey structure of EP5 (ep05/shrink.js) and EP4's spore on the wind (ep04/shrink.js); `cup` (ep02/p2.js) for the far cup.
- **New:** The whole spore world: kitchen air at speck scale, the bread landscape with caves, the plastic sky, threads, the film, crumbs breaking into dots, the fuzzy patch with stalks and dust.
- Lines: `g902` Heart 2:10.9; `g903` Heart 2:15.4; `g904` Heart 2:17.8; `g905` Heart 2:21.7; `g906` Heart 2:24.5; `g907` Heart 2:30.7; `g908` Heart 2:33.2
- Marks: `dive` 2:08.8, `land` 2:15.3, `bag` 2:17.6, `threads` 2:21.5, `substance` 2:24.3, `absorb` 2:30.5, `patch` 2:33.0

### 2:37.5-2:41.2 · `reveal` (3.7 s)

- **Draw:** Pull back out to the table, Day 10 (mark `pullout`). Answer card **2 From the bread** glows (word *two* in g1001). Basil and Momo CHEER; Pip SURPRISED, then a nod.
- **Reuse:** EP5 `SC.reveal` (ep05/p1.js); `ansCard`.
- **New:** -
- Lines: `g1001` Heart 2:38.5
- Marks: `pullout` 2:37.5

### 2:41.2-3:02.7 · `mark1` (21.5 s)

- **Draw:** **MARK SENTENCE 1 of 2.** Basil beside the card says "Say it with me!" (g1002) with a hop; 0.8 s; Heart reads slowly (g1003), words appear as she says them. Highlights: *do not make their own food*, *grow on another object*, *substance*, *simpler substances*, *absorb*. Under the card three small pictures light in turn (the patch on the bread at *grow*, the shiny film at *substance*, the dots flowing in at *absorb*). The card holds 2.5 s. Then **ABSORB** pops (`kw_absorb`, automatic) with a small tag *absorb = take in*. Coin **+1** *if you showed two fingers* (word *one* in g1004). Score 2 : 1.
- **Reuse:** `markScene(t, s, {who: "basil", sayId: "g1002", id: "g1003", ...})` and `markCard` (common.js, lib.js); footer *P3 · Diversity · Classification of living things*.
- **New:** Three small under-card pictures.
- Lines: `g1002` Basil 2:41.6; `g1003` Basil 2:43.5; `g1004` Heart 3:00.2
- Marks: `kw_absorb` 2:57.8

### 3:02.7-3:19.3 · `mushroom` (16.7 s)

- **Draw:** A picture board slides in LOW and stands on the table: a fresh market mushroom, side view, large. Plain-line labels pop as Heart says them: **cap**, **stalk** (g1101); then the board flips to the UNDERSIDE of the cap (word *under*): thin lines running out from the stalk, label **gills**, small tag *not a fish's gills: these hold spores*. Basil CHEER, his joke g1102. At mark `gillsdust` a fine BROWN dust falls from the gills; two white wind streaks carry it off right, past the window (word *wind*). The book's two sentences on a cream strip (g1103); small tag under *dispersed*: *spread far and wide*.
- **Reuse:** EP4's `mushroom` (side view) and `lab4` labels and `board` (ep04/ep4.js); `windLines` (trail.js) for the wind streaks; `bookCaption`.
- **New:** The mushroom's UNDERSIDE with gills (new); the spore dust.
- Lines: `g1101` Heart 3:03.1; `g1102` Basil 3:10.0; `g1103` Heart 3:12.7 (strip 3:12.7-3:19.3)
- Marks: `gillsdust` 3:12.4

### 3:19.3-3:29.5 · `mark2` (10.2 s)

- **Draw:** **MARK SENTENCE 2 of 2.** Momo says "Say it with me!" (g1104); 0.8 s; Heart reads (g1105). Highlights: *reproduce*, *very quickly*, *spores*. Under the card: the mushroom with its dust, and the fuzzy patch with its dust. Holds 2.5 s. Then **SPORES** pops (`kw_spores`, automatic).
- **Reuse:** `markScene` (Momo, pointing pose).
- **New:** -
- Lines: `g1104` Momo 3:19.8; `g1105` Momo 3:21.8
- Marks: `kw_spores` 3:27.5

### 3:29.5-3:30.6 · `r2card` (1.1 s)

- **Draw:** Round card **ROUND 2 · YOUR ANSWER FROM LAST TIME**.
- **Reuse:** `roundCard` (common.js): change `SC.r2card` for Part 1 to `roundCard(t, s, "ROUND 2", "YOUR ANSWER FROM LAST TIME")`.
- **New:** -

### 3:30.6-3:48.8 · `r2` (18.2 s)

- **Draw:** EP6's two boards and its two cards again: **1 Mould · 2 Yeast**; *Which fungus is useful?* A SHORT ring, 3 s (`ring0_3`). LOCKED IN! The three buddies flip **2** together (unison u1203); then Basil alone, CHEER (g1204). Card 2 glows (g1205 *Yes! Yeast.*).
- **Reuse:** `lockN` with a 2-card set; the unison pick is supported (`uni`).
- **New:** -
- Lines: `g1201` Heart 3:30.8; `g1202` Heart 3:42.4; `u1203` all three 3:43.6; `g1204` Basil 3:44.6; `g1205` Heart 3:46.9
- Marks: `ring0_3` 3:38.7, `bell_3` 3:41.7

### 3:48.8-4:24.5 · `trays` (35.7 s)

- **Draw:** Pip, THINKING pose, small ✗ chip (a question, g1206). At `traysIn` two trays slide in low and stand side by side: a GREEN tray **USEFUL** and a BLUE tray **HARMFUL**, both empty. Cream strip g1207, *useful* and *harmful* highlighted. Four picture boards hop low, one by one, onto the trays as Heart reads the strips: `b_mush` USEFUL (1) a punnet of market mushrooms, tags *edible = safe to eat* and a small safety badge *Never pick wild mushrooms!* (g1209); `b_dough` USEFUL (2) the dough bowl: short replay, tag **speeded up: about 1 hour**, the dough swells and lifts its cloth, the packet glows; **YEAST** pops (`kw_yeast`, automatic); `b_tempeh` USEFUL (3) a white slab of tempeh on a banana leaf, a nasi padang stall behind, tag *tempeh*; `b_mould` HARMFUL (4) the mouldy slice in its sealed bag, a small tummy-ache icon. Coin **+1** *if you showed two fingers* (g1213). Score 3 : 2.
- **Reuse:** EP1's sorting trays (`tray` in ep01/scenes_d.js); `mushroom` (ep04) for the punnet; the dough bowl and the bag from this episode; `bookCaption`.
- **New:** Two trays (green USEFUL, blue HARMFUL); the punnet; the rising-dough replay; the tempeh board with a nasi padang stall; tummy-ache icon; the safety badge.
- Lines: `g1206` Pip 3:49.2; `g1207` Heart 3:51.7 (strip 3:51.7-3:55.6); `g1208` Heart 3:56.0 (strip 3:56.0-3:59.5); `g1209` Heart 3:59.9; `g1210` Heart 4:02.1 (strip 4:02.1-4:08.9); `g1211` Heart 4:11.7 (strip 4:11.7-4:15.2); `g1212` Heart 4:15.6 (strip 4:15.6-4:21.5); `g1213` Heart 4:22.0
- Marks: `traysIn` 3:51.3, `b_mush` 3:55.6, `b_dough` 4:01.8, `kw_yeast` 4:09.3, `b_tempeh` 4:11.3, `b_mould` 4:15.2

### 4:24.5-4:32.2 · `final` (7.7 s)

- **Draw:** The score hand (3 fingers = high five). Buddies 2.
- **Reuse:** `finalScene(t, s, "g1301", 2, tips)` (common.js).
- **New:** -
- Lines: `g1301` Heart 4:24.9

### 4:32.2-4:39.2 · `liz` (7.0 s)

- **Draw:** A replay of the fridge door at night with a ring round the little lizard among the magnets. Question pill *Is a lizard a fungus?* · *Tell someone at home!*
- **Reuse:** `lizReveal` (common.js) with the night kitchen view.
- **New:** -
- Lines: `g1302` Heart 4:32.6

### 4:39.2-4:53.8 · `kwrecap` (14.6 s)

- **Draw:** The read-along: BREAD MOULD · ABSORB · SPORES · YEAST.
- **Reuse:** Already drawn: `SC.kwrecap` (common.js).
- **New:** -
- Lines: `h860` Heart 4:39.7; `hk_bread_mould` Heart 4:43.3; `uk_bread_mould` all three 4:44.3; `hk_absorb` Heart 4:45.7; `uk_absorb` all three 4:46.7; `hk_spores` Heart 4:48.1; `uk_spores` all three 4:49.1; `hk_yeast` Heart 4:50.4; `uk_yeast` all three 4:51.3; `h864` Heart 4:52.6

### 4:53.8-5:05.4 · `cliff` (11.6 s)

- **Draw:** The table, **DAY 10**. An adult's GLOVED hand carries the sealed bag LOW to the pedal bin and drops it in, still zipped; the lid closes (word *bin*); tag *still shut*. Cut to the sink (word *then*): two bare child's hands under the tap, the soap pump beside them; the hands look perfectly clean. Pip, POINTING pose (g1402). A big **?** pops over the hands. **PART 2** slams in (word *find* in g1403).
- **Reuse:** `adultArm` (hotel.js) / `adultHand` (trail.js) with a glove colour; `countHand` (lib.js) as a starting point for the child's hands.
- **New:** The gloved hand; the bin lid; the sink close-up with two child's hands under running water.
- Lines: `g1401` Heart 4:54.6; `g1402` Pip 5:00.1; `g1403` Heart 5:01.6
- Marks: `cliffend` 5:04.5

### 5:05.4-5:17.2 · `nyk` (11.7 s)

- **Draw:** EP1's ending exactly; the two trays stand between the buddies; about 4 s of outro; no text in the bottom fifth.
- **Reuse:** `nykScene(t, s, prop)` (common.js) with the two trays as `prop`.
- **New:** -
- Lines: `u1300` all three 5:06.1; `h1304a` Heart 5:08.1; `h1304o` Heart 5:08.9; `h1304t` Heart 5:09.9; `h1305` Heart 5:10.9; `u1305` all three 5:10.9

## Part 2 · "Your Hands LOOK Clean. What Is Living on Them?" · 5:15.5

### 0:00.0-0:10.5 · `lasttime` (10.5 s)

- **Draw:** The kitchen. The two trays from Part 1 on the table: the mouldy slice (in its bag, as a picture board) on the BLUE **HARMFUL** tray, the risen dough on the GREEN **USEFUL** tray; each glows as Heart names it (words *harmful*, *useful* in j201). Then the camera moves to the sink (word *washed*): the two clean hands, a big **?** over them.
- **Reuse:** Part 1's kitchen, trays and sink.
- **New:** -
- Lines: `j201` Heart 0:01.0

### 0:10.5-0:17.3 · `pipclean` (6.8 s)

- **Draw:** Pip big in his disc beside the hands (THINKING pose, small ✗ chip, j202). A white glove points at one fingertip (j203).
- **Reuse:** `pointHand` (lib.js) in white.
- **New:** -
- Lines: `j202` Pip 0:10.9; `j203` Heart 0:14.2

### 0:17.3-0:24.6 · `goals` (7.3 s)

- **Draw:** *Today you'll learn*: **How we see bacteria** · **Harmful or useful bacteria** · **The whole chapter on one map**. Nothing is spoken.
- **Reuse:** `goals3` (common.js).
- **New:** Three chip icons (a microscope, the two trays, a little map).
- Lines: `j251` Basil 0:17.7; `j252` Basil 0:19.1; `j253` Basil 0:20.7; `j254` Basil 0:22.7

### 0:24.6-0:30.4 · `game` (5.7 s)

- **Draw:** The short rules scene: the ring, the lizard with a question mark (j301).
- **Reuse:** `gameScene(t, s, "j301", false)` (common.js) works as is.
- **New:** -
- Lines: `j301` Heart 0:25.0

### 0:30.4-0:36.8 · `microscope` (6.4 s)

- **Draw:** A picture board slides in low and stands on the table: a MICROSCOPE with plain-line labels **eyepiece**, **lens**, **stage**. The book's sentence on a cream strip (j401). **MICROSCOPE** pops (`kw_microscope`, automatic).
- **Reuse:** EP4 `board` and `lab4` (ep04/ep4.js); `magnifier` (wetland.js) for style.
- **New:** The microscope (eyepiece, lens, stage).
- Lines: `j401` Heart 0:30.8 (strip 0:30.8-0:34.3)
- Marks: `kw_microscope` 0:34.8

### 0:36.8-0:45.2 · `scopes` (8.4 s)

- **Draw:** A row of three microscopes on the board, each bigger than the last (a simple one, a better one, a modern one); beside the last, a ROUND VIEW opens: first a soft fuzzy edge of mould (tag *fungi*), then the view pushes in past it to much smaller shapes (word *smaller*). Strip j402, *even smaller than fungi* highlighted. Never say or show fungi as too small to see.
- **Reuse:** -
- **New:** Two more microscopes (old, better); the round microscope view.
- Lines: `j402` Heart 0:37.1 (strip 0:37.1-0:45.2)

### 0:45.2-0:59.6 · `shapes` (14.5 s)

- **Draw:** The round view, large. Three kinds of bacteria drift in it; one of each comes to the middle with the book's label as Heart says it: **rod-shaped**, **sphere-shaped (round)**, **spiral-shaped** (j403). No faces, no legs. Then a small cream word box **one bacterium · many bacteria** (j404, each word lights). Then the strip j405.
- **Reuse:** EP4's `bact3` / `bRod` / `bRound` / `bSpiral` (ep04/ep4.js).
- **New:** The word box.
- Lines: `j403` Heart 0:45.5; `j404` Heart 0:51.4; `j405` Heart 0:55.2 (strip 0:55.2-0:59.6)

### 0:59.6-1:03.8 · `waitw` (4.1 s)

- **Draw:** Pill **Be a bacterium!** The camera dives from the round view onto a child's fingertip; a soft wipe (j501).
- **Reuse:** `wipe` (lib.js).
- **New:** -
- Lines: `j501` Heart 0:60.0

### 1:03.8-1:32.1 · `shrink` (28.3 s)

- **Draw:** BE A BACTERIUM, first person (in shrink.js). `dive` -> **on the fingertip** (j502): your own rounded rod-shaped front edge at the bottom of the frame; the skin of the fingertip a landscape of long curved RIDGES like rows of hills running away; other rods, spheres and spirals in the valleys (near ones big and soft, far ones tiny); tags *You: one bacterium* · *too small to see*; a small inset top left shows the same hand at normal size, perfectly clean. `hills` (j503). `recess` (j504): the hills tilt; far away and huge, a SCHOOL CANTEEN (long tables, stall signs, a tray); a sandwich comes closer like a cliff; tags *recess, at the school canteen* · *before eating...* `wash` (j505): a tap as tall as a tower, a wall of clear water (word *water*), then white bubbles as big as houses roll over the hills (*soap*, *bubbles*) and lift you off (*lift*); tags *water* · *soap*. `drain` (j506): you ride the foam down the sink in a slow spiral into the dark; tag *washed away*. `clean` (j507): back up, the rinsed shining hand lifts the sandwich. No faces on any bacterium; the camera is a rod.
- **Reuse:** `youTag`, `feelTag`, `uwSpecks` (shrink.js); EP2's first-person water journey (ep02/micro.js) for the one-long-shot structure.
- **New:** The whole fingertip world: ridge hills, bacteria in valleys, the far canteen, the sandwich cliff, the tower tap, house-sized bubbles, the drain spiral, the inset hand.
- Lines: `j502` Heart 1:05.9; `j503` Heart 1:11.7; `j504` Heart 1:15.9; `j505` Heart 1:20.3; `j506` Heart 1:25.7; `j507` Heart 1:29.0
- Marks: `dive` 1:03.8, `hills` 1:11.5, `recess` 1:15.8, `wash` 1:20.1, `drain` 1:25.5, `clean` 1:28.9

### 1:32.1-1:35.1 · `pullout` (3.0 s)

- **Draw:** Pull back out to the kitchen sink. Basil, CHEER pose (j508).
- **Reuse:** -
- **New:** -
- Lines: `j508` Basil 1:32.6

### 1:35.1-1:44.5 · `harmful` (9.4 s)

- **Draw:** The hands at the sink, soapy. The book's sentence on a cream strip (j601), *harmful* highlighted, a small tummy-ache icon. **HARMFUL** pops (`kw_harmful`, automatic). Then a cream reminder card **Wash your hands with soap before you eat.** (j602).
- **Reuse:** `bookCaption`; Part 1's tummy-ache icon.
- **New:** Soapy hands; the reminder card.
- Lines: `j601` Heart 1:35.5 (strip 1:35.5-1:39.0); `j602` Heart 1:41.8
- Marks: `kw_harmful` 1:39.4

### 1:44.5-1:45.6 · `r1card` (1.1 s)

- **Draw:** ROUND 1 card.
- **Reuse:** Already drawn: `SC.r1card` (common.js).
- **New:** -

### 1:45.6-2:10.8 · `r1` (25.3 s)

- **Draw:** Lock-in, two cards: **1 Yes · 2 No**; *Are all bacteria harmful?*; in the ring: the round microscope view with the three shapes. HIDDEN LIZARD: on the kitchen wall clock for about 3 s during the ring, from `ring0_1` to `ring0_1 + 3.0` (two quiet "chek-chek" at +1.0 and +2.6). Ring 5 s. LOCKED IN! Basil **1** (ARMS-CROSSED pose, ✗ chip, j703), Momo **2** (j704), Pip **2** (j705).
- **Reuse:** `lockN` (2 cards); `wallClock` (hotel.js) + `cicak` (props.js).
- **New:** -
- Lines: `j701` Heart 1:45.7; `j702` Heart 1:58.4; `j703` Basil 1:59.5; `j704` Momo 2:03.2; `j705` Pip 2:07.8
- Marks: `ring0_1` 1:52.7, `bell_1` 1:57.7

### 2:10.8-2:13.3 · `yoghurt` (2.5 s)

- **Draw:** The fridge door opens; a cup of yoghurt and a small yoghurt drink slide out LOW onto the table. Answer card **2 No** glows (word *two* in j706).
- **Reuse:** Part 1's fridge.
- **New:** The yoghurt cup and the yoghurt drink; the fridge door opening.
- Lines: `j706` Heart 2:12.0

### 2:13.3-2:23.7 · `mark1` (10.5 s)

- **Draw:** **MARK SENTENCE 1 of 2.** Basil says "Say it with me!" (j707); 0.8 s; Heart reads (j708). Highlights: *harmful*, *useful*. Under the card: the BLUE HARMFUL tray (the hands, unwashed, with a tummy-ache icon) and the GREEN USEFUL tray (the yoghurt). Holds 2.5 s. Then **USEFUL** pops (`kw_useful`, automatic).
- **Reuse:** `markScene` (Basil, cheer pose); Part 1's trays.
- **New:** -
- Lines: `j707` Basil 2:13.7; `j708` Basil 2:15.6
- Marks: `kw_useful` 2:21.7

### 2:23.7-2:34.7 · `body` (11.0 s)

- **Draw:** A simple outline of a child's body with a soft glow at the tummy and a few rod shapes in it (no faces); strip j709. Then the yoghurt cup and the yoghurt drink with tag *useful bacteria inside* (j710). Coin **+1** *if you showed two fingers* (j711). Score 1 : 1.
- **Reuse:** `bRod` (ep04).
- **New:** The body outline.
- Lines: `j709` Heart 2:24.1 (strip 2:24.1-2:27.6); `j710` Heart 2:28.1; `j711` Heart 2:32.1

### 2:34.7-2:35.7 · `showcard` (1.0 s)

- **Draw:** SHOWDOWN · DOUBLE POINTS card.
- **Reuse:** Already drawn: `SC.showcard` (common.js).
- **New:** -

### 2:35.7-3:17.8 · `show` (42.1 s)

- **Draw:** Pip's homework on an easel: a ruled table, no pictures. Columns **has spores** · **makes its own food** · **has feathers**. Rows **A** ✓ ✓ ✗ · **B** ✓ ✗ ✗ · **C** ✗ ✗ ✓. Each row lights cell by cell as Heart reads it (j801 words *spores*, *food*, *spores*, *food*, *feathers*, *food*: a soft tick on each). Under the table Pip's three answers appear as he says them (j802 *one*, *two*, *three*): **1** A is a fungus. **2** B is a fungus. **3** C is a bird. The YOU ring with a counting hand, 6 s (`ring0_2`). LOCKED IN! Basil **1** (CHEER, j805), Momo **1** (j806); Pip OOPS (j807).
- **Reuse:** `boardEasel` (hotel.js); EP4's `noteBoard` (ep04/ep4.js) and EP3's `notebook` (trail.js) for ruled tables; EP5's Showdown (`fieldNotes`, `showView` in ep05/p2.js); `lockN`/`ringTimer`.
- **New:** The characteristics table.
- Lines: `j801` Heart 2:36.0; `j802` Pip 2:47.3; `j803` Heart 2:54.3; `j804` Heart 3:08.8; `j805` Basil 3:09.9; `j806` Momo 3:13.9; `j807` Pip 3:16.9
- Marks: `ring0_2` 3:02.1, `bell_2` 3:08.1

### 3:17.8-3:26.8 · `fixed` (9.0 s)

- **Draw:** Line 1 is rubbed out and rewritten in green: *A is a plant.* Three pictures pop beside the rows: a bird's nest fern by A, a mushroom by B, the kingfisher by C. A cream tip card **Read every column.** · *spores + cannot make its own food = a fungus*. Coin **+2** (j809 *two*). Score 3 : 1.
- **Reuse:** `nestFern` and `mushroom` (ep04/ep4.js); `kingfisher` (wetland.js); EP5's `SC.fixed` (ep05/p2.js).
- **New:** The tip card.
- Lines: `j808` Heart 3:18.4; `j809` Heart 3:23.6

### 3:26.8-3:44.2 · `map` (17.4 s)

- **Draw:** A big MAP BOARD slides in low and stands on the floor in front of the table. It builds from the top: **LIVING THINGS** (j901 *living*); four branches in EP4's colours: **PLANTS** green, **ANIMALS** orange, **FUNGI** brown, **BACTERIA** blue. Sub-branches pop as Heart names them, each with a small picture: PLANTS **flowering** (the chilli plant) · **non-flowering** (the bird's nest fern) (j902); ANIMALS **amphibians** (frog) · **birds** (kingfisher) · **fish** · **insects** (ant) · **reptiles** (monitor lizard) · **mammals** (bat) (j903, in this order); FUNGI the mushroom and the bread mould; BACTERIA the three shapes (j904). Then the book's sentence on a cream strip under the map (j905).
- **Reuse:** EP4's `GROUPS` colours and `crate4` labels, `chilliPlant`, `nestFern`, `mushroom`, `bact3` (ep04/ep4.js); `frog`, `kingfisher`, `fishG`, `ant` (wetland.js); EP6's `monitor` and `fruitBat` (ep06/beasts.js, copy when EP6 is done).
- **New:** The map board itself (a tree of branches).
- Lines: `j901` Heart 3:27.2; `j902` Heart 3:31.0; `j903` Heart 3:33.5; `j904` Heart 3:38.2; `j905` Heart 3:40.7 (strip 3:40.7-3:44.2)

### 3:44.2-4:03.7 · `chant` (19.5 s)

- **Draw:** The map stays, smaller, behind the three buddies. "Say it with us!" (u1002), 0.8 s, then the call-and-response chant c1003 on clap, clap, stomp: line 1 (the FUNGI branch flashes), **YOUR TURN!**; line 2 (the BACTERIA branch flashes), **YOUR TURN!**; line 3 (the two trays flash), **YOUR TURN!** No all-together bar. Bar = 2.8 s: the call on the first clap, the answer from the second clap (lines 1 and 2) or on the stomp (line 3).
- **Reuse:** `chantScene` (common.js). Its words and colours are already set for EP7 (`PHR`, `PCOL`, `chantFlash`); replace its EP3 trail card (`trailCard`) with the small map.
- **New:** -
- Lines: `u1002` all three 3:44.7; `c1003` all three 3:46.5

### 4:03.7-4:05.0 · `exambanner` (1.3 s)

- **Draw:** Banner **EXAM CORNER** with a bell (j1101).
- **Reuse:** `roundCard(t, s, "EXAM CORNER")` (common.js) works.
- **New:** -
- Lines: `j1101` Heart 4:03.9

### 4:05.0-4:20.8 · `mark2` (15.9 s)

- **Draw:** **MARK SENTENCE 2 of 2**, under the EXAM CORNER banner. Pip says "Say it with me!" (j1102); 0.8 s; Heart reads (j1103). Highlights: *classified*, *common observable characteristics*, *plants, animals, fungi and bacteria*. Under the card the four branches of the map light in turn (words *plants*, *animals*, *fungi*, *bacteria*). Holds 2.5 s.
- **Reuse:** `markScene` (Pip, pointing pose) with an EXAM CORNER tab.
- **New:** -
- Lines: `j1102` Pip 4:05.3; `j1103` Pip 4:07.3

### 4:20.8-4:28.4 · `final` (7.6 s)

- **Draw:** The score hand (3 fingers = high five). Buddies 1.
- **Reuse:** `finalScene(t, s, "j1201", 1, tips)`.
- **New:** -
- Lines: `j1201` Heart 4:21.2

### 4:28.4-4:36.1 · `liz` (7.7 s)

- **Draw:** A replay of the kitchen wall clock with a ring round the little lizard. Question pill *Can you see it without a microscope?* · *Tell someone at home!*
- **Reuse:** `lizReveal` (common.js).
- **New:** -
- Lines: `j1202` Heart 4:28.8

### 4:36.1-4:51.3 · `dare` (15.2 s)

- **Draw:** Three picture boards slide in low and stand in a row on the kitchen table, each clearly different: a **plastic snack box** with a clear lid and biscuits inside, a shiny **metal snack box**, a **glass jar** of biscuits with a metal lid; tags *plastic* · *metal* · *glass* (words in j1301). On *sand* a small pile of sand pops beside them with a big **?**. Three cards **1 The plastic box · 2 The metal box · 3 The glass jar**. Banner **NEXT · Materials · Lock in your answer!** Basil, SURPRISED (j1302). The same three containers and sand as EP8's cold open: draw them once and share them with EP8.
- **Reuse:** EP5 `SC.dare` (ep05/p2.js) for the layout; `ansCard`; `biscuit` (hotel.js).
- **New:** The three containers and the pile of sand (shared with EP8).
- Lines: `j1301` Heart 4:36.6; `j1302` Basil 4:48.0

### 4:51.3-5:03.8 · `kwrecap` (12.4 s)

- **Draw:** The read-along: MICROSCOPE · HARMFUL · USEFUL.
- **Reuse:** Already drawn: `SC.kwrecap` (common.js).
- **New:** -
- Lines: `h860` Heart 4:51.9; `hk_microscope` Heart 4:55.4; `uk_microscope` all three 4:56.5; `hk_harmful` Heart 4:58.1; `uk_harmful` all three 4:59.0; `hk_useful` Heart 5:00.3; `uk_useful` all three 5:01.2; `h864` Heart 5:02.6

### 5:03.8-5:15.5 · `nyk` (11.7 s)

- **Draw:** EP1's ending exactly; the chapter map stands between the buddies, all four branches lit.
- **Reuse:** `nykScene(t, s, prop)` with the map as `prop`.
- **New:** -
- Lines: `u1300` all three 5:04.5; `h1304a` Heart 5:06.4; `h1304o` Heart 5:07.3; `h1304t` Heart 5:08.3; `h1305` Heart 5:09.3; `u1305` all three 5:09.3

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
