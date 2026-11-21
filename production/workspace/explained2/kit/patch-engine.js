// patch-engine.js: two one-line patches to a vendored animation-studio engine so that `board` and `poster` wait for our
// SVG sprites (kit/sprites.js) before they grab frames. Safe to run twice.   node ../kit/patch-engine.js   (from the film folder)
const fs = require('fs'); const WARM = "for (const it of items) if (window.prepareAt) await window.prepareAt(it.t); /* explained2: sprites */\n";
for (const [file, anchor] of [['engine/render.js', "const BOARD_JS = `(async (items, cols) => {\n"], ['engine/tools/poster.js', "const POSTER_JS = `(async (items, o) => {\n"]]) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('explained2: sprites')) { console.log(file, 'already patched'); continue; }
  if (!s.includes(anchor)) { console.log(file, 'ANCHOR NOT FOUND (engine changed?)'); continue; }
  fs.writeFileSync(file, s.replace(anchor, anchor + '  ' + WARM)); console.log(file, 'patched');
}
