# P3–P6 thumbnails v3 ("P5 formula")

Pill + giant `P4 <Topic>` + drawn topic scene with one hero + yellow idea banner. 1280x720 JPG.

- `data.json` – one row per episode: `topic` (title word), `banner` (2–5 words), `scene` (name of the drawing), `titleMaxW` (px the title may span).
- `template.html` – the shared frame (pill, title, banner, filters). Auto-fits title and banner.
- `scenes.js` (+ `lib.js` helpers) – the SVG drawing for each `scene`.
- `make.js` – renders with Playwright/Chromium.

Re-make everything, or just some episodes (contact sheets are always refreshed):

    NODE_PATH=$(npm root -g) node make.js          # everything
    NODE_PATH=$(npm root -g) node make.js 7 16     # only P4 EP07 and EP16
    NODE_PATH=$(npm root -g) node make.js P6 P3:2  # all of P6, and P3 EP02

To change words edit `data.json`; to change a picture edit its function in `scenes.js`.
Keep the bottom-right 200x80 px empty (YouTube time stamp). Fonts: Fredoka from `../workspace/sau/fonts`, Noto Color Emoji (system).
Outputs: `P4_EPnn.jpg`, `contact_sheet.png`, `contact_small.png` (168x94 each). `.work/` holds the rendered HTML pages.

## P3, P5 and P6 (added 2026-11-18)
Same template. Rows in `data.json` carry `set` (P3/P4/P5/P6, the file prefix) and `level` (the yellow title word; "Mind" for the P3 EP00 special).
Their drawings are in `scenes_p356.js` (loaded by `scenes.js`). `P5_EP01.jpg` is the teacher's original panda thumbnail, kept as it is (`"static": true`).
Outputs: `P3_EP00…05.jpg`, `P5_EP01/02/03/05/06/16.jpg`, `P6_EP01…12.jpg`, `contact_sheet_p3p5p6.png`, `contact_small_p3p5p6.png`.

P3 EP06–14B (Materials, Life Cycles, Magnets) are the rows with `"batch": "p3more"`; `ep` may be a string such as `"7A"` (`node make.js P3:7A`). Sheets: `contact_sheet_p3_more.png`, `contact_small_p3_more.png`.
