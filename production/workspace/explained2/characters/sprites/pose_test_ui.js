// pose_test_ui.js: the drawn (vector) pieces of the pose test, rendered once to transparent PNGs in work/ui/ with the approved
// look (kit/style.js: palette, gradients, robot; frames/frames.js: scoreboard). node pose_test_ui.js
// Each PNG has its anchor in the centre of its canvas; work/ui/ui.json lists the sizes. The Python renderer only places them.
const path = require('path'), fs = require('fs'); const { chromium } = require('/opt/node-tools/node_modules/playwright');
const X2 = path.resolve(__dirname, '../..'), OUT = path.join(__dirname, 'work/ui'); fs.mkdirSync(OUT, { recursive: true });
const style = fs.readFileSync(path.join(X2, 'kit/style.js'), 'utf8').replace(/if \(typeof module[^\n]*\n?/, '');
const fr = fs.readFileSync(path.join(X2, 'frames/frames.js'), 'utf8'); const sb = fr.match(/function scoreboard[\s\S]*?\n(?=function speech)/)[0];
const F = n => `file://${X2}/fonts/node_modules/@fontsource/${n}`;
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Fredoka;font-weight:500;src:url(${F('fredoka/files/fredoka-latin-500-normal.woff2')})}
@font-face{font-family:Fredoka;font-weight:600;src:url(${F('fredoka/files/fredoka-latin-600-normal.woff2')})}
@font-face{font-family:Fredoka;font-weight:700;src:url(${F('fredoka/files/fredoka-latin-700-normal.woff2')})}
html,body{margin:0;background:transparent} svg{display:block}</style><body><div id="s"></div>
<script>${style}\n${sb}
function robotK(step, key) { // style.js robot(), with the wind-up key turning (key = 0..1 of half a turn)
  const kr = Math.abs(Math.cos(Math.PI * key)); return robot(step).replace(/<ellipse cx="46" cy="-20" rx="15" ry="20"\\/><ellipse cx="46" cy="20" rx="15" ry="20"\\/>/,
    '<ellipse cx="46" cy="' + (-20 * kr - 1) + '" rx="15" ry="' + (3 + 17 * kr) + '"/><ellipse cx="46" cy="' + (20 * kr + 1) + '" rx="15" ry="' + (3 + 17 * kr) + '"/>'); }
function bubble(w, h, l1, c1, l2, tail) { // paper bubble, two lines: the pick word in its colour, then the reason
  return '<g filter="url(#dropS)"><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="44" fill="#FFF8EA"/><path d="M' + (tail * w * .16 - 26) + ' ' + (h / 2 - 3) + ' l26 44 l22-44z" fill="#FFF8EA"/></g>'
    + T(0, -8, l1, 46, c1, {w: 700}) + T(0, 44, l2, 39, P.ink, {w: 600}); }
window.A = {
  sb00: [480, 150, () => scoreboard(0, 0, 0, 0, .7)], sb11: [480, 150, () => scoreboard(0, 0, 1, 1, .7)],
  logo: [380, 100, () => logoPill(-160, -27, .86)],
  round: [420, 110, () => T(0, 16, "ROUND 1", 50, P.sun, {ls: 9, x: 'filter="url(#dropS)"'})],
  question: [1100, 110, () => T(0, 18, "The wind-up robot: living or non-living?", 50, "#fff", {w: 600, x: 'filter="url(#dropS)"'})],
  stamp: [760, 300, () => '<g transform="rotate(-6)"><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="124" text-anchor="middle" letter-spacing="6" fill="' + P.sun + '" stroke="' + P.ink + '" stroke-width="22" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">LOCKED IN!</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="124" text-anchor="middle" letter-spacing="6" fill="url(#gSun)">LOCKED IN!</text></g>'],
  tag: [460, 190, () => '<g transform="rotate(-3)"><g filter="url(#dropS)"><path d="M-22 40 l22 34 l22-34z" fill="#2C6FE8"/><rect x="-190" y="-46" width="380" height="92" rx="46" fill="url(#gBlue)"/></g><rect x="-180" y="-40" width="360" height="36" rx="18" fill="#fff" opacity=".18"/>' + T(0, 17, "NON-LIVING", 48, "#fff", {ls: 5, x: 'style="font-variant-ligatures:none"'}) + '</g>'],
  plus1: [130, 130, () => '<g filter="url(#dropS)"><circle r="46" fill="url(#gSun)"/><circle r="46" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4"/></g>' + T(0, 17, "+1", 50, P.ink)],
  star: [80, 80, () => '<path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#FFF3DC"/>'],
  b_basil1: [560, 240, () => bubble(500, 138, "Living!", P.leafDeep, "It moves, so it\\u2019s living!", 0)],
  b_pip1: [620, 240, () => bubble(560, 138, "Non-living.", P.blueDeep, "I saw you wind it up, Basil.", -.6)],
  b_momo1: [580, 240, () => bubble(520, 138, "Non-living.", P.blueDeep, "Does it ever get hungry?", .6)],
  b_basil2: [600, 240, () => bubble(540, 138, "Aww.", P.ink, "So moving is not the clue!", 0)],
};
for (let s = 0; s <= 4; s++) for (let k = 0; k < 4; k++) A["robot_" + s + "_" + k] = [300, 320, () => '<g transform="translate(0 60) scale(-.8 .8)" filter="url(#rim)">' + robotK(s / 4, k / 4) + '</g>'];
for (let i = 0; i <= 90; i++) A["ring_" + String(i).padStart(2, "0")] = [300, 340, () => { const R = 96, C = 2 * Math.PI * R, left = 1 - i / 90, n = Math.max(1, Math.ceil(3 * left - 1e-9));
  return '<g transform="translate(0 -20)"><circle r="' + (R + 26) + '" fill="' + P.night + '" opacity=".7"/><circle r="' + R + '" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="22"/>'
  + (left > 0 ? '<circle r="' + R + '" fill="none" stroke="' + P.sun + '" stroke-width="30" opacity=".5" filter="url(#b4)" stroke-dasharray="' + C * left + ' ' + C + '" transform="rotate(-90) scale(1 -1)"/><circle r="' + R + '" fill="none" stroke="url(#gSun)" stroke-width="22" stroke-linecap="round" stroke-dasharray="' + Math.max(.01, C * left) + ' ' + C + '" transform="rotate(-90) scale(1 -1)"/>' : '')
  + T(0, 34, i >= 90 ? "0" : n, 96, "#fff") + '</g>'; }];
window.draw = n => { const [w, h, f] = A[n]; document.getElementById("s").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="' + (-w / 2) + ' ' + (-h / 2) + ' ' + w + ' ' + h + '">' + defs() + f() + '</svg>'; return [w, h]; };
</script>`;
(async () => { const f = path.join(OUT, '_ui.html'); fs.writeFileSync(f, html); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 400 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('file://' + f); await p.evaluate(() => document.fonts.load('700 40px Fredoka').then(() => document.fonts.load('600 40px Fredoka')).then(() => document.fonts.ready));
  const names = await p.evaluate(() => Object.keys(A)), meta = {};
  for (const n of names) { const [w, h] = await p.evaluate(n => draw(n), n); meta[n] = [w, h]; await p.screenshot({ path: path.join(OUT, n + '.png'), omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } }); }
  fs.writeFileSync(path.join(OUT, 'ui.json'), JSON.stringify(meta)); console.log(names.length, 'pieces', errs.length ? 'ERRORS ' + errs.join(' | ') : 'no page errors'); await b.close(); })();
