# TheOneApp "My mind map": the real steps (for Special_MindMaps, ep 0)

Captured from **origin/main @ 67c3545** ("Add "My mind map": pupils make and save their own mind maps (#60)"),
served locally, with Playwright/Chromium. The first-run tour was skipped, as it would be after "Skip the tour" (`sm-seen-v1`), and the theme was light.

* Phone: 390x844 CSS px @2x, so the shots are **780x1688**. Files are `shots/NN_<step>_phone.png`.
* Desktop: 1280x800 @1x, so the shots are **1280x800**. Files are `shots/NN_<step>_desk.png`.
* `taps.json`: for each shot, the box `[x, y, w, h]` (in screenshot pixels) of the thing you tap **next**, or of the thing the step points at. `null` means there is no tap.
* `capture_log.json`: the per-shot notes, the full Chapter list and the download file name.
* Scripts: `capture.js` makes the step shots and `shoot_ep0.js` makes the clean saved-map shot.

## Sample content typed (from the app's own Heat poster key words)

| | Branch (colour) | Sub-branch 1 | Sub-branch 2 |
|---|---|---|---|
| Middle word **HEAT** | 1 Temperature (Red, set by the app) | How hot or cold | Measured with a thermometer |
| | 2 Heat flow (Orange, set by the app) | From hotter to colder | Until both are the same |
| | 3 Conductors (Yellow by default, **changed to Blue** by tapping the Blue dot) | Good: metals | Poor: plastic, wood, air |

The map's default name is **My Heat mind map**. In step 21 it is renamed **My Heat map**, so later shots and the downloaded picture show "My Heat map".

## How to get to the Mind Lab

* **Phone:** Home, Questions tab. Under **YOUR QUESTIONS** the pills are: My questions, AI practice, 🧞 CECL Genie, ✎ Practice, ☁ Quiz Yourself, **✏️ Mind maps**. Tap **✏️ Mind maps** (third row, right). The pill is only shown where there is no room for the sun.
* **Desktop / wide tablet:** the smiling **sun** at the top right of the scenery, with the tag **Mind maps** under it, opens it. At night or in dark mode the sun becomes a sleepy moon with the same tag. The pill is hidden on desktop.
* Either way, you land on **Science Claw Mind Lab** ("MOE PRIMARY SCIENCE SYLLABUS 2023 · P3–P6 · 17 CHAPTERS"). It has the buttons **✏️ Make my own mind map** and **← Back to my questions**.

## Tap order (exact labels as they appear)

| NN | You do | You see | Phone shot | Desktop shot |
|---|---|---|---|---|
| 01 | Open the app (Home, Questions tab). Tap **✏️ Mind maps** on a phone, or the **Mind maps** sun on a desktop. | The home screen with the way in. | 01_home_phone | 01_home_desk |
| 02 | Tap **✏️ Make my own mind map** (yellow, top). | Science Claw Mind Lab with the chapter posters. (A real "5 mix-ups in Plant System. Tap me!" bubble from the possum shows at the bottom right.) | 02_mindlab_phone | 02_mindlab_desk |
| 03 | Tap the **CHAPTER** box. | A sheet titled **✏️ My mind maps** opens. It has the CHAPTER picker, **＋ Start a new mind map**, the tip "Put your topic in the middle. Add a branch for each big idea, then sub-branches for the details. It saves by itself on this device." and "No mind maps yet. Pick a chapter and tap **Start a new mind map**. You can do it! 🌱". The picker starts on the poster the Mind Lab is showing (Plant System (P4/P5) on a first visit). | 03_mymaps_empty_phone | 03_mymaps_empty_desk |
| 04 | Pick **Heat (P4)**, then tap **＋ Start a new mind map**. | CHAPTER shows "Heat (P4)". (The phone's own drop-down list is not in the shot. The options are listed below.) | 04_chapter_heat_phone | 04_chapter_heat_desk |
| 05 | Type your middle word in the **MIDDLE WORD** box. | The maker opens: **← My mind maps**, the name **My Heat mind map**, "HEAT · P4", the **Saved ✓** pill and **×**. The map shows the chapter name "Heat" in the middle and the MIDDLE WORD box has it selected. Also shown: **🖼 Compare with the poster**, **⬇ Save as picture**, "Now add your first branch. One branch for each big idea!" and **＋ Add a branch**. | 05_new_map_phone | 05_new_map_desk |
| 06 | Typed **HEAT**. Tap **＋ Add a branch**. | HEAT in big letters in the middle of the map. | 06_middle_word_phone | 06_middle_word_desk |
| 07 | Type the branch word in the **Branch 1** box. | A Branch 1 card appears with a number, a text box ("Branch 1"), **▲ ▼ 🗑**, 8 colour dots (Red, Orange, Yellow, Green, Teal, Blue, Purple, Pink; Red is ticked) and **＋ Add a sub-branch**. A dashed **New branch** box appears on the map: you can see it on the desktop, and on a phone you scroll up to see it. | 07_add_branch_phone | 07_add_branch_desk |
| 08 | (while typing) | The pill says **Saving…** for a moment. | 08_saving_phone | 08_saving_desk |
| 09 | Typed **Temperature**. Tap **＋ Add a sub-branch**. | The pill is back to **Saved ✓**. | 09_branch_typed_phone | 09_branch_typed_desk |
| 10 | (phone: scroll up) | The map: HEAT joined by a red line to **Temperature**. (On the desktop this is the same view as 09.) | 10_branch_map_phone | 10_branch_map_desk |
| 11 | Type a detail in the **Sub-branch 1** box. | A sub-branch row with **▲ ▼ ✕**. A dashed **New idea** box appears on the map (seen on the desktop). | 11_add_subbranch_phone | 11_add_subbranch_desk |
| 12 | Typed "How hot or cold". Tap **＋ Add a sub-branch** and type "Measured with a thermometer". Then tap **＋ Add a branch**. | Two sub-branches under Temperature, and **Saved ✓**. | 12_subs_typed_phone | 12_subs_typed_desk |
| 13 | (phone: scroll up) | The map: Temperature with its two small detail boxes. | 13_subs_map_phone | 13_subs_map_desk |
| 14 | Branch 2 typed: **Heat flow**, with **＋ Add a sub-branch** twice: "From hotter to colder" and "Until both are the same". | Branch 2 is Orange (the app picks the next free colour). | 14_branch2_phone | 14_branch2_desk |
| 15 | Branch 3 typed: **Conductors**. Tap the **Blue** colour dot. | Branch 3 got Yellow by itself. The tap box is on the Blue dot. | 15_colour_pick_phone | 15_colour_pick_desk |
| 16 | Then **＋ Add a sub-branch** twice: "Good: metals" and "Poor: plastic, wood, air". | Blue is ticked and the Conductors card is blue. | 16_colour_blue_phone | 16_colour_blue_desk |
| 17 | (phone: scroll up) | On the map the Conductors box and its line are blue. | 17_colour_map_phone | 17_colour_map_desk |
| 18 | Look at the top. | **The finished map**: HEAT in the middle, 3 coloured branches and 6 sub-branches, with **Saved ✓**. It is kept on this device by itself, with no save button to press. | 18_finished_map_phone | 18_finished_map_desk |
| 19 | Tap **×** to close. Later (even after the app is closed and opened again), tap **✏️ Make my own mind map** again. | Back on the Mind Lab. This shot was taken after a full page reload. | 19_closed_phone | 19_closed_desk |
| 20 | Find your map in **My mind maps (1)**. | A card with a small picture of the map, **My Heat mind map**, "Heat · 3 branches", "Changed just now" and the buttons **Open**, **Rename** and **Delete**. Tapping the small picture also opens it. | 20_mymaps_list_phone | 20_mymaps_list_desk |
| 21 | Tap **Rename**, type the new name ("My Heat map") and press Enter. | The name turns into a text box. | 21_rename_phone | 21_rename_desk |
| 22 | Tap **Delete**, then **No, keep it**. | "**Delete it for good?**" with **Yes, delete** (red) and **No, keep it**. | 22_delete_confirm_phone | 22_delete_confirm_desk |
| 23 | Tap **Open**. | The map was kept, with its new name "My Heat map". | 23_open_phone | 23_open_desk |
| 24 | Tap **🖼 Compare with the poster**. | The map is open again, ready for more branches. | 24_opened_phone | 24_opened_desk |
| 25 | Check the poster, then tap **✏️ Back to my mind map**. | The sheet closes and the Mind Lab shows the **Heat** poster (theme "Hot and Cold"), with branches Heat flows, Temperature, Good conductors of heat, Poor conductors of heat, and Gaining or losing heat. A yellow **✏️ Back to my mind map** button floats at the top left (phone) or bottom left (desktop). | 25_compare_poster_phone | 25_compare_poster_desk |
| 26 | Tap **⬇ Save as picture**. | You are back in your own map, just where you left it. | 26_back_to_map_phone | 26_back_to_map_desk |
| 27 | (done) | The picture downloads as **My-Heat-map.png** and the pill says **Picture saved ✓**. | 27_picture_saved_phone | 27_picture_saved_desk |
| 28 | Use it as the reference for the paper copy. | The saved picture itself, 2030x980: the title "My Heat map", "Heat · made in TheOneApp" and the map on cream paper. It is the same from a phone or a desktop. | 28_downloaded_picture_phone | 28_downloaded_picture_desk |

Short tap order:
**✏️ Mind maps** (phone pill) or the **Mind maps** sun (desktop) → **✏️ Make my own mind map** → CHAPTER **Heat (P4)** → **＋ Start a new mind map** → MIDDLE WORD **HEAT** → **＋ Add a branch** → type → **＋ Add a sub-branch** → type → (repeat) → tap a colour dot → see **Saved ✓** → **×** → later **✏️ Make my own mind map** → **My mind maps** card → **Open** / **Rename** / **Delete** → **🖼 Compare with the poster** → **✏️ Back to my mind map** → **⬇ Save as picture** → **Picture saved ✓**.

## Small facts worth saying (all checked in the code: mymap.js, mymap-core.js, mindmap.html)

* It saves by itself as you type, about a third of a second after you stop: "Saving…" then "Saved ✓". It is kept **on this device only**; nothing is sent.
* **Enter** in the MIDDLE WORD box adds the first branch. **Enter** in a branch or sub-branch box adds a new sub-branch under it. **Backspace** in an empty sub-branch box removes that sub-branch.
* Tap any box on the map and its text box opens, ready to type.
* ▲ / ▼ move a branch or sub-branch. 🗑 deletes a branch and ✕ deletes a sub-branch. A deleted branch can be brought back for 7 seconds with **↶ Undo** (toast: "Branch deleted.").
* Limits: 10 branches per map and 8 sub-branches per branch. After 8 the card says "That’s plenty for one branch!". Up to 60 maps.
* Each new branch gets the next unused colour: Red, Orange, Yellow, Green, Teal, Blue, Purple, Pink.
* A new map that is left untouched is not kept in the list.
* The saved picture's file name is the map name with dashes (My-Heat-map.png).

## CHAPTER options (grouped exactly as in the picker)

* Diversity: Living & Non-Living (P3), Diversity of Materials (P3)
* Cycles: Life Cycles (P3), Reproduction in Plants (P5), Matter (P4), The Water Cycle (P5)
* Systems: Digestive System (P4), Circulatory System (P5), Plant System (P4/P5), Electrical System (P5)
* Interactions: Magnets (P3), Forces (P6), Living Things & Their Environment (P6)
* Energy: Light (P4), Heat (P4), Photosynthesis (P6), Energy Conversion (P6)

## Notes for the build

* On a phone the top bar (← My mind maps / Saved ✓ / ×) stays fixed, so after scrolling down to type, the map is hidden under it. Use the `_map` shots (10, 13, 17) or 18 to show the map. On the desktop the map stays in view on the left the whole time, so 09/10 are the same view.
* 25_compare_poster on the desktop is scrolled to the middle of the poster (the app scrolls it there), so the "Heat" title is just above the top edge. On the phone the title shows.
* The possum's "N mix-ups in Plant System. Tap me!" bubble on the Mind Lab is real app content.

## Clean saved-map phone shot (habit2, scene "mindmap")

* `mm_ep0.png`: 780x1688, made exactly like the P4 `W/mm/mm_epN.png` (shoot.js method, the map stored in `sm-mymaps-v1` then `MyMindMap.open`). It shows the map named **My Heat mind map** with the same HEAT map (Red / Orange / Blue) and the **Saved ✓** pill.
* `mm_box.json`: `{"saved":[327,35,158,62],"map":[24,266,732,365]}`. The saved box is identical to the P4 ones.
* For the config: `"mm": {"href": ".../mmhowto/mm_ep0.png", "saved": [327,35,158,62], "map": [24,266,732,365]}`.
