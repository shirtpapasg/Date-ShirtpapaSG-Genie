# P4 thumbnails v3 ("P5 formula")

Pill + giant `P4 <Topic>` + drawn topic scene with one hero + yellow idea banner. 1280x720 JPG.

- `data.json` – one row per episode: `topic` (title word), `banner` (2–5 words), `scene` (name of the drawing), `titleMaxW` (px the title may span).
- `template.html` – the shared frame (pill, title, banner, filters). Auto-fits title and banner.
- `scenes.js` (+ `lib.js` helpers) – the SVG drawing for each `scene`.
- `make.js` – renders with Playwright/Chromium.

Re-make everything, or just some episodes (contact sheets are always refreshed):

    NODE_PATH=$(npm root -g) node make.js          # all 22
    NODE_PATH=$(npm root -g) node make.js 7 16     # only EP07 and EP16

To change words edit `data.json`; to change a picture edit its function in `scenes.js`.
Keep the bottom-right 200x80 px empty (YouTube time stamp). Fonts: Fredoka from `../workspace/sau/fonts`, Noto Color Emoji (system).
Outputs: `P4_EPnn.jpg`, `contact_sheet.png`, `contact_small.png` (168x94 each). `.work/` holds the rendered HTML pages.
