// art19.js: EP19's own art (Stage 2, drawn 2026-11-23). Loaded after art18.js / ep18dare.js (EP15 to EP18's helpers: hand15 with four
// fingers and a thumb, leaf15, farBlocks, bird15, drips15, camPt, eye16, blink16, tile16, xChip16, tickChip16, BG.deck18 our void deck) and
// before common.js / p1.js / p2.js.
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   the ROCK PIGEON (Part 1's hidden animal: grey, two dark bars on each wing, a shiny green-and-purple neck, round orange eyes, pink feet; it
//   bobs its head), the LAND SNAIL (Part 2's: a brown spiral shell, the eyes on the tips of the long feelers, a shiny trail; it glides), the
//   SCALY-FOOT SNAIL (the fun fact: dark, almost black, its foot covered in small dark overlapping scales).
// THE OBJECTS (the book's, true to life): Basil's red-and-blue BAR MAGNET (white N and S drawn, never spoken; magnet19 with a cut-away), the
//   steel pin and the copper wire (EP18's pin18 / wire18), the iron nail, a steel paper clip, a cotton towel, aluminium foil, a wooden ruler, a
//   ceramic bowl, a rubber eraser, a plastic bottle, a glass cup, the aluminium DRINK CAN, the steel FOOD TIN (ridges, a rolled rim, no label),
//   Mum's IRON WOK (dark, seasoned), the lodestone, the six shapes, two ring magnets on a pencil.
// THE PLACE: our block's VOID DECK on a Saturday afternoon (EP18's BG.deck18, baked, turned to the afternoon light) + VD19(t, o, cam) live: the
//   grey pipe under the ceiling, the INTERACTIONS banner on EP18's easels, the notice board, the lamp post and the bicycle rack outside, the big
//   potted plant by the pillar, the ceiling fan, the rain tree, the MAGNET TEST TABLE with its tray (tray19); Part 2 after a shower (wet floor,
//   drips, the blue recycling bin, the planter of wet plants). The playground's swing (PG19). The hidden animal's spot per scene: PIGAT / SNAT.

/* ================================================================ small helpers ================================================================ */
// a camera that puts world point p at screen point (sx, sy) at zoom z (CAM / camPt convention: [z, cx, cy])
const camOn = (p, z, sx = 960, sy = 540) => Math.abs(z - 1) < .001 ? [1, 960, 540] : [z, (z * p[0] - sx) / (z - 1), (z * p[1] - sy) / (z - 1)];
const camMix = (a, b, u) => { const z = lerp(a[0], b[0], u); const pa = [(960 - a[1]) * (a[0] - 1), (540 - a[2]) * (a[0] - 1)], pb = [(960 - b[1]) * (b[0] - 1), (540 - b[2]) * (b[0] - 1)];   // blend the screen offsets, not the pivots
  const ox = lerp(pa[0], pb[0], u), oy = lerp(pa[1], pb[1], u); return Math.abs(z - 1) < .001 ? [1, 960, 540] : [z, 960 - ox / (z - 1), 540 - oy / (z - 1)]; };
// pull arrows: from (x1, y1) towards (x2, y2), n chevrons that run along (the PULL: always towards the magnet)
const pullArrows = (t, x1, y1, x2, y2, k = 1, col = MAGC, n = 3) => { if (k < .02) return ""; const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, d = Math.hypot(x2 - x1, y2 - y1); let s = "";
  for (let i = 0; i < n; i++) { const u = ((i / n) + t * .9) % 1, x = lerp(x1, x2, u), y = lerp(y1, y2, u), o = Math.sin(Math.PI * u);
    s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)})" opacity="${n2(o * k)}"><path d="M-14 -16 L6 0 L-14 16" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M-14 -16 L6 0 L-14 16" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
  return s; };
// a chip joined to the thing it describes by a short line (SERIES_FORMAT 6): (x, y) the chip, (px, py) the thing
const linkChip = (t, t0, x, y, px, py, k, txt, size = 32, t1) => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .25); if (a <= .01) return "";
  return OP(a, pline(x, y, px, py, ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, k === 2 ? P.ink : k ? NONC : MAGC, "#fff", { w: 700 }))); };
const wetSheen = (x, y, w, h, t, o = .35) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#DDF0FF" opacity="${o}"/><ellipse cx="${n2(x + w * .2 + 8 * Math.sin(t * .7))}" cy="${y - h * .25}" rx="${w * .35}" ry="${h * .2}" fill="#fff" opacity="${o * .9}"/>`;

/* ================================================================ THE ANIMALS ================================================================ */
// the ROCK PIGEON (side view, facing right). origin = between its feet. o.bob: the head bob (default on), o.walk: little steps, o.fluff
function pigeon19(t, o = {}) { const bob = o.bob === false ? 0 : Math.max(0, Math.sin(t * 5.2)) ** 3 * 14, wk = o.walk ? Math.sin(t * 10) : 0, sh = blink16(t, .3), fl = o.fluff ? 1 + .06 * Math.max(0, Math.sin(t * 2.2)) : 1;
  const hx = 52 + bob, hy = -112 + bob * .3;
  return `<ellipse cx="0" cy="2" rx="62" ry="10" fill="${P.ink}" opacity=".18"/>`
    + `<path d="M${n2(-14 + 6 * wk)} -26 L${n2(-16 + 8 * wk)} 0 M${n2(-24 + 8 * wk)} 0 h18 M${n2(14 - 6 * wk)} -26 L${n2(12 - 8 * wk)} 0 M${n2(4 - 8 * wk)} 0 h18" stroke="#E0786A" stroke-width="6" stroke-linecap="round" fill="none"/>`
    + `<path d="M-108 -62 L-64 -44 L-60 -80z" fill="#6E7488" stroke="#3E4256" stroke-width="4" stroke-linejoin="round"/><path d="M-104 -60 L-92 -55 L-90 -68z" fill="#2E3242"/>`
    + `<g transform="translate(0 -60) scale(${n2(fl)}) translate(0 60)"><ellipse cx="-2" cy="-60" rx="70" ry="42" fill="#A8AEC2" stroke="#4E5266" stroke-width="5"/><ellipse cx="18" cy="-48" rx="42" ry="22" fill="#B8BED0"/></g>`
    + `<path d="M-62 -70 Q-20 -98 34 -78 Q20 -52 -40 -48z" fill="#9096AC" stroke="#4E5266" stroke-width="4"/><path d="M-44 -72 L4 -78 M-48 -60 L-2 -64" stroke="#2E3242" stroke-width="7" stroke-linecap="round"/>`
    + `<path d="M22 -86 Q${n2(hx - 14)} ${n2(hy + 20)} ${n2(hx - 6)} ${n2(hy + 8)} L${n2(hx + 14)} ${n2(hy + 30)} Q54 -62 38 -52z" fill="#7E8AA8" stroke="#4E5266" stroke-width="4"/>`
    + `<path d="M28 -78 Q${n2(hx - 10)} ${n2(hy + 26)} ${n2(hx + 2)} ${n2(hy + 24)}" stroke="#3FAE7A" stroke-width="10" fill="none" stroke-linecap="round" opacity="${n2(.75 + .25 * Math.sin(t * 3))}"/><path d="M34 -70 Q${n2(hx - 4)} ${n2(hy + 34)} ${n2(hx + 8)} ${n2(hy + 34)}" stroke="#9B6BD6" stroke-width="8" fill="none" stroke-linecap="round" opacity="${n2(.75 + .25 * Math.cos(t * 3))}"/>`
    + `<circle cx="${n2(hx)}" cy="${n2(hy)}" r="26" fill="#7A84A0" stroke="#4E5266" stroke-width="4"/><path d="M${n2(hx + 22)} ${n2(hy - 2)} L${n2(hx + 40)} ${n2(hy + 4)} L${n2(hx + 22)} ${n2(hy + 9)}z" fill="#3A3E4E"/><ellipse cx="${n2(hx + 24)}" cy="${n2(hy - 3)}" rx="5" ry="3.5" fill="#F4F2EE"/>`
    + eye16(n2(hx + 6), n2(hy - 6), 9, { shut: sh, white: "#FF9A3A" }) + `<circle cx="${n2(hx - 6)}" cy="${n2(hy + 8)}" r="4" fill="#FFB4A0" opacity=".6"/>`; }
const pigeonAt = (t, x, y, k = .4, fl = 1, o = {}) => TF(x, y, k * fl, pigeon19(t, o), 0, k);
// the LAND SNAIL (side view, facing right). origin = under its foot. o.glide: it slides a little; o.wet: a shiny trail
function snail19(t, o = {}) { const g = o.glide === false ? 0 : 6 * Math.sin(t * .8), w1 = 8 * Math.sin(t * 2.3), w2 = 8 * Math.sin(t * 2.3 + 1.4), sh = blink16(t, .8);
  return `<path d="M-120 2 Q-40 6 ${n2(40 + g)} 2" stroke="#E8F4FF" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>`
    + `<g transform="translate(${n2(g)} 0)"><path d="M-80 0 Q-90 -26 -40 -30 L60 -30 Q96 -30 100 -10 Q104 4 80 4 Q0 6 -80 0z" fill="#B49A80" stroke="#6E5440" stroke-width="5"/>`
    + `<path d="M70 -26 Q${n2(84 + w1 * .4)} -76 ${n2(92 + w1)} -104" stroke="#8E745C" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M84 -22 Q${n2(104 + w2 * .4)} -66 ${n2(116 + w2)} -88" stroke="#8E745C" stroke-width="9" fill="none" stroke-linecap="round"/>`
    + `<path d="M94 -10 l22 6 M92 -4 l18 10" stroke="#8E745C" stroke-width="6" stroke-linecap="round"/>`
    + eye16(n2(92 + w1), -106, 9, { shut: sh }) + eye16(n2(116 + w2), -90, 9, { shut: sh }) + `<path d="M84 -12 q8 6 14 0" stroke="${INK16}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="76" cy="-16" r="4" fill="#FFB4A0" opacity=".7"/>`
    + `<circle cx="-18" cy="-72" r="56" fill="#A8693A" stroke="#5E3618" stroke-width="5"/><path d="M18 -72 A36 36 0 0 0 -54 -72 A26 26 0 0 0 -2 -72 A16 16 0 0 0 -34 -72 A8 8 0 0 0 -18 -72" fill="none" stroke="#6E4220" stroke-width="6" stroke-linecap="round"/>`
    + `<path d="M-56 -100 Q-30 -124 6 -116" stroke="#E6B07A" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/></g>`; }
const snail19At = (t, x, y, k = .4, rot = 0, fl = 1) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)}) scale(${n2(k * fl)} ${n2(k)})">${snail19(t)}</g>`;
// the SCALY-FOOT SNAIL (the fun fact): a dark, almost black shell; its foot covered in small dark overlapping scales; cute eyes. origin = under it
function scalyFoot19(t, o = {}) { const sh = blink16(t, 1.1), w = 5 * Math.sin(t * 2);
  let sc = ""; for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = -88 + i * 21 + (r % 2) * 10, y = -8 - r * 14; sc += `<path d="M${x - 12} ${y} Q${x} ${y - 16} ${x + 12} ${y} Q${x} ${y + 6} ${x - 12} ${y}z" fill="${(i + r) % 2 ? "#3A3A44" : "#2A2A32"}" stroke="#55556A" stroke-width="2"/>`; }
  return `<path d="M-110 0 Q-116 -44 -40 -50 L70 -46 Q104 -40 106 -14 Q108 4 80 4 Q0 8 -110 0z" fill="#46464F" stroke="#1E1E26" stroke-width="5"/>` + sc
    + `<path d="M84 -36 Q${n2(98 + w)} -74 ${n2(104 + w)} -90" stroke="#5A5A66" stroke-width="8" fill="none" stroke-linecap="round"/>` + eye16(n2(104 + w), -92, 9, { shut: sh }) + `<path d="M88 -18 q8 6 14 0" stroke="#E8E8F0" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + `<ellipse cx="-14" cy="-92" rx="66" ry="58" fill="#25252D" stroke="#0E0E14" stroke-width="5"/><path d="M26 -92 A40 36 0 0 0 -54 -92 A28 26 0 0 0 2 -92 A16 15 0 0 0 -30 -92 A8 8 0 0 0 -14 -92" fill="none" stroke="#4A4A56" stroke-width="6" stroke-linecap="round"/><path d="M-56 -126 Q-24 -148 16 -138" stroke="#8A8A9A" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"/>`; }

/* ================================================================ THE OBJECTS ================================================================ */
// Basil's BAR MAGNET (origin = its middle, 300 x 84 at k 1). o.cut 0..1: a cut-away window opens on the red half (the paint curls back like
// a sticker) and shows smooth grey METAL inside; o.glint
function magnet19(t, o = {}) { const cu = o.cut || 0;
  let s = `<g filter="url(#dropS)"><rect x="-150" y="-42" width="150" height="84" rx="12" fill="#E0453A" stroke="#9A2A1E" stroke-width="6"/><rect x="0" y="-42" width="150" height="84" rx="12" fill="#3A6ADB" stroke="#1E3E8A" stroke-width="6"/></g>`
    + `<rect x="-140" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".28"/><rect x="10" y="-34" width="130" height="16" rx="8" fill="#fff" opacity=".24"/>` + T(-75, 20, "N", 56, "#fff") + T(75, 20, "S", 56, "#fff");
  if (cu > .01) { const w = 96 * cu; s += `<rect x="${n2(-60 - w / 2)}" y="-30" width="${n2(w)}" height="60" rx="8" fill="#8E96A4" stroke="#5A6070" stroke-width="4"/><rect x="${n2(-60 - w / 2 + 8)}" y="-24" width="${n2(w * .7)}" height="10" rx="5" fill="#D6DCE6" opacity=".8"/>`
    + `<path d="M${n2(-60 + w / 2)} -30 q${n2(22 * cu)} 8 ${n2(30 * cu)} 30 q${n2(-8 * cu)} 22 ${n2(-30 * cu)} 30" fill="#F06A5E" stroke="#9A2A1E" stroke-width="4"/>`; }
  if (o.glint !== false) s += lcGlint(-110, -26, 16, t, 1.3);
  return s; }
// the IRON NAIL: dark grey, a flat round head, a point. origin = its middle, length ~220
const nail19 = (k = 1, rot = 0) => TF(0, 0, k, `<path d="M-96 -8 H88 L112 0 L88 8 H-96z" fill="${IRONC}" stroke="#2E323C" stroke-width="4" stroke-linejoin="round"/><path d="M-92 -4 H80" stroke="#8E96A6" stroke-width="3"/><rect x="-110" y="-24" width="16" height="48" rx="5" fill="#4A5060" stroke="#2E323C" stroke-width="4"/>`, rot);
// a steel PAPER CLIP: silver loops. origin = its middle, ~130 x 44
const clip19 = (k = 1, rot = 0) => TF(0, 0, k, `<path d="M-50 14 H52 A16 16 0 0 0 52 -18 H-58 A20 20 0 0 0 -58 22 H40 A10 10 0 0 0 40 2 H-36" fill="none" stroke="#7A8494" stroke-width="9" stroke-linecap="round"/><path d="M-50 14 H52 A16 16 0 0 0 52 -18 H-58 A20 20 0 0 0 -58 22 H40 A10 10 0 0 0 40 2 H-36" fill="none" stroke="#DCE2EA" stroke-width="3.5" stroke-linecap="round"/>`, rot);
// a folded COTTON TOWEL (fabric): cream with two stripes. origin = its middle
const towel19 = (k = 1) => TF(0, 0, k, `<path d="M-90 -40 H86 Q98 -40 98 -26 V30 Q98 44 84 44 H-90 Q-102 44 -102 30 V-26 Q-102 -40 -90 -40z" fill="#F6EDE0" stroke="#B8A890" stroke-width="5"/><path d="M-102 -6 H98" stroke="#B8A890" stroke-width="4"/><path d="M-100 16 H96 M-100 26 H96" stroke="#7FB8E6" stroke-width="5"/><path d="M-80 -30 q20 6 40 0 q20 -6 40 0" stroke="#E2D4BE" stroke-width="3" fill="none"/>`);
// a crinkled piece of ALUMINIUM FOIL: silver, folds and highlights. origin = its middle
const foil19 = (k = 1, t = 0) => TF(0, 0, k, `<path d="M-90 -50 L-30 -62 L20 -48 L86 -58 L94 -6 L82 46 L20 56 L-40 48 L-92 54 L-84 4z" fill="#C9D2DE" stroke="#7E8898" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -62 L-20 0 L-40 48 M20 -48 L30 6 L20 56 M-84 4 L-20 0 L30 6 L94 -6" stroke="#8E98A8" stroke-width="3" fill="none"/><path d="M-70 -40 L-36 -46 M40 -40 L74 -44 M-60 20 L-30 26" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>` + lcGlint(50, -20, 12, t, 2));
// a WOODEN RULER: tan, ticks and numbers. origin = its middle, 320 x 50
const ruler19 = (k = 1, rot = 0) => TF(0, 0, k, `<rect x="-160" y="-25" width="320" height="50" rx="6" fill="#E2B477" stroke="#9A6A34" stroke-width="5"/><path d="M-160 -8 H160" stroke="#C99A5E" stroke-width="2" opacity=".6"/>${[...Array(15)].map((_, i) => `<path d="M${-140 + i * 20} -25 v${i % 5 ? 12 : 20}" stroke="#6E4A22" stroke-width="3"/>`).join("")}${[0, 5, 10].map((v, i) => T(-140 + i * 100, 18, String(v), 16, "#6E4A22")).join("")}`, rot);
// a CERAMIC BOWL (side view): white with a blue rim line. origin = its base
const bowl19 = (k = 1) => TF(0, 0, k, `<ellipse cx="0" cy="-4" rx="46" ry="8" fill="#C9D2DE"/><path d="M-96 -86 Q-92 -6 0 -4 Q92 -6 96 -86z" fill="#FBFBF8" stroke="#8E98A8" stroke-width="5"/><ellipse cx="0" cy="-86" rx="96" ry="18" fill="#EEF2F6" stroke="#8E98A8" stroke-width="5"/><path d="M-90 -62 Q0 -46 90 -62" stroke="#3A6ADB" stroke-width="6" fill="none"/><path d="M-70 -70 Q-64 -30 -40 -20" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".9"/>`);
// a pink RUBBER ERASER. origin = its middle
const eraser19 = (k = 1) => TF(0, 0, k, `<path d="M-60 -16 L-36 -34 H64 L40 -16z" fill="#FFB8C8" stroke="#C26A84" stroke-width="4" stroke-linejoin="round"/><path d="M-60 -16 H40 V26 H-60z" fill="#FF8FB1" stroke="#C26A84" stroke-width="4"/><path d="M40 -16 L64 -34 V8 L40 26z" fill="#E97A9C" stroke="#C26A84" stroke-width="4" stroke-linejoin="round"/><rect x="-40" y="-6" width="60" height="22" rx="4" fill="#fff" opacity=".7"/>`);
// a PLASTIC BOTTLE: clear blue, a cap, ridges. origin = its base
const bottle19 = (k = 1) => TF(0, 0, k, `<path d="M-40 0 Q-48 0 -48 -10 V-150 Q-48 -176 -22 -192 V-212 H22 V-192 Q48 -176 48 -150 V-10 Q48 0 40 0z" fill="#CFE9FB" fill-opacity=".85" stroke="#5B9FD0" stroke-width="5"/><rect x="-26" y="-236" width="52" height="28" rx="6" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/><path d="M-48 -110 H48 M-48 -60 H48" stroke="#8FC4EC" stroke-width="4"/><path d="M-30 -160 V-20" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>`);
// a GLASS CUP: clear, see-through, a thick base. origin = its base
const cup19 = (k = 1) => TF(0, 0, k, `<path d="M-50 -150 L-40 0 H40 L50 -150z" fill="#EAF6FF" fill-opacity=".55" stroke="#7FB0CC" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-150" rx="50" ry="10" fill="#F4FBFF" fill-opacity=".6" stroke="#7FB0CC" stroke-width="4"/><rect x="-40" y="-16" width="80" height="16" fill="#CFE6F2" opacity=".8"/><path d="M-34 -136 L-28 -26" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/>`);
// the aluminium DRINK CAN (light, thin): silver with a teal band, a ring-pull on the top. origin = its base
const can19 = (k = 1, t = 0) => TF(0, 0, k, `<path d="M-48 -6 Q-48 0 -40 0 H40 Q48 0 48 -6 V-176 Q48 -184 40 -186 H-40 Q-48 -184 -48 -176z" fill="#D9E0EA" stroke="#7E8898" stroke-width="5"/><rect x="-48" y="-124" width="96" height="58" fill="#2EC4B6" opacity=".85"/><path d="M-48 -124 H48 M-48 -66 H48" stroke="#1E8A80" stroke-width="3"/><ellipse cx="0" cy="-186" rx="40" ry="9" fill="#EEF2F6" stroke="#7E8898" stroke-width="4"/><path d="M-6 -190 h18 a5 5 0 0 1 0 8 h-18z" fill="#B8C0CC" stroke="#7E8898" stroke-width="2"/><path d="M-32 -170 V-16" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".75"/>` + lcGlint(26, -150, 10, t, .4));
// the steel FOOD TIN: silver-grey, ridges round its side, a rolled rim, the paper label removed. origin = its base
const tin19 = (k = 1, t = 0) => TF(0, 0, k, `<path d="M-64 -4 Q-64 0 -56 0 H56 Q64 0 64 -4 V-160 H-64z" fill="${STEELC}" stroke="#5E6878" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M-64 ${-30 - i * 21} Q0 ${-22 - i * 21} 64 ${-30 - i * 21}" stroke="#7A8494" stroke-width="4" fill="none"/><path d="M-60 ${-26 - i * 21} Q0 ${-18 - i * 21} 60 ${-26 - i * 21}" stroke="#C8D0DA" stroke-width="2" fill="none"/>`).join("")}<ellipse cx="0" cy="-160" rx="64" ry="13" fill="#C8D0DA" stroke="#5E6878" stroke-width="5"/><ellipse cx="0" cy="-160" rx="52" ry="8" fill="#AEB6C2"/><path d="M-44 -150 V-14" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".55"/>` + lcGlint(30, -120, 10, t, 1.7));
// Mum's IRON WOK (side view): dark, black-seasoned, two small loop handles. origin = the middle of its rim
const wok19 = (k = 1, t = 0) => TF(0, 0, k, `<path d="M-200 0 Q-180 120 0 128 Q180 120 200 0z" fill="#3A3A42" stroke="#1E1E24" stroke-width="7"/><ellipse cx="0" cy="0" rx="200" ry="28" fill="#2A2A30" stroke="#1E1E24" stroke-width="7"/><ellipse cx="0" cy="4" rx="170" ry="18" fill="#46464E"/>`
  + `<path d="M-200 -2 q-40 -8 -46 16 q-4 22 30 18" fill="none" stroke="#1E1E24" stroke-width="12" stroke-linecap="round"/><path d="M200 -2 q40 -8 46 16 q4 22 -30 18" fill="none" stroke="#1E1E24" stroke-width="12" stroke-linecap="round"/>`
  + `<path d="M-150 40 Q-110 100 -20 108" stroke="#5E5E68" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>` + lcGlint(-120, 60, 12, t, .9));
// the LODESTONE: a dark, rough rock (o.nails: small iron nails cling to it)
const lodestone19 = (t, o = {}) => { let s = `<path d="M-150 30 Q-170 -40 -110 -80 Q-40 -120 40 -100 Q130 -90 160 -20 Q176 50 100 76 Q0 96 -90 80 Q-140 70 -150 30z" fill="#4A4652" stroke="#24202C" stroke-width="7"/>`
    + [...Array(16)].map((_, i) => `<circle cx="${n2(-120 + 250 * hash(i, 3))}" cy="${n2(-70 + 130 * hash(i, 5))}" r="${n2(5 + 9 * hash(i, 7))}" fill="${i % 2 ? "#3A3642" : "#5E5A68"}"/>`).join("") + `<path d="M-100 -60 Q-40 -90 30 -80" stroke="#7A7686" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>`;
  if (o.nails) s += [[-120, -60, -50], [-40, -96, -100], [60, -92, -70], [140, -40, -20], [-150, 10, -150]].map(([x, y, r], i) => TF(x, y, .34, nail19(1, r), 0)).join("");
  return s; };
// the six shapes in the book's order (origin = each one's middle): bar, U-shaped, button, rod, ring, horseshoe (two tips coloured)
const shape19 = (i, k = 1) => { const R = "#E0453A", B = "#3A6ADB", G = "#8E96A4", Rd = "#9A2A1E", Bd = "#1E3E8A";
  const sh = [`<rect x="-80" y="-24" width="80" height="48" rx="8" fill="${R}" stroke="${Rd}" stroke-width="5"/><rect x="0" y="-24" width="80" height="48" rx="8" fill="${B}" stroke="${Bd}" stroke-width="5"/>`,
    `<path d="M-50 60 V-10 A50 50 0 0 1 50 -10 V60 H22 V-10 A22 22 0 0 0 -22 -10 V60z" fill="${G}" stroke="#4E5462" stroke-width="5"/><rect x="-50" y="30" width="28" height="30" fill="${R}" stroke="${Rd}" stroke-width="4"/><rect x="22" y="30" width="28" height="30" fill="${B}" stroke="${Bd}" stroke-width="4"/>`,
    `<ellipse cx="0" cy="10" rx="52" ry="22" fill="#5A6070" stroke="#2E323C" stroke-width="5"/><ellipse cx="0" cy="0" rx="52" ry="22" fill="${G}" stroke="#4E5462" stroke-width="5"/><ellipse cx="-14" cy="-6" rx="18" ry="6" fill="#fff" opacity=".5"/>`,
    `<rect x="-80" y="-14" width="160" height="28" rx="14" fill="${G}" stroke="#4E5462" stroke-width="5"/><rect x="-80" y="-14" width="28" height="28" rx="12" fill="${R}" stroke="${Rd}" stroke-width="4"/><rect x="52" y="-14" width="28" height="28" rx="12" fill="${B}" stroke="${Bd}" stroke-width="4"/><path d="M-50 -6 H50" stroke="#fff" stroke-width="4" opacity=".5"/>`,
    `<path d="M-56 4 A56 22 0 1 0 56 4 V16 A56 22 0 1 1 -56 16z" fill="#5A6070" stroke="#2E323C" stroke-width="4"/><ellipse cx="0" cy="4" rx="56" ry="22" fill="${G}" stroke="#4E5462" stroke-width="5"/><ellipse cx="0" cy="4" rx="22" ry="9" fill="#FFF8EA" stroke="#4E5462" stroke-width="4"/>`,
    `<path d="M-54 56 Q-66 -50 0 -54 Q66 -50 54 56 L30 56 Q40 -26 0 -28 Q-40 -26 -30 56z" fill="${G}" stroke="#4E5462" stroke-width="5" stroke-linejoin="round"/><path d="M-56 30 L-58 56 H-30 L-31 30z" fill="${R}" stroke="${Rd}" stroke-width="4"/><path d="M56 30 L58 56 H30 L31 30z" fill="${B}" stroke="${Bd}" stroke-width="4"/>`][i];
  return TF(0, 0, k, sh); };
const SHAPES = ["bar", "U-shaped", "button", "rod", "ring", "horseshoe"];
// a dark grey RING MAGNET seen a little from above (origin = its middle)
const ringMag19 = (k = 1) => TF(0, 0, k, `<path d="M-90 0 A90 30 0 0 0 90 0 V22 A90 30 0 0 1 -90 22z" fill="#3A3E4A" stroke="#22252E" stroke-width="5"/><ellipse cx="0" cy="0" rx="90" ry="30" fill="#6A7080" stroke="#22252E" stroke-width="5"/><ellipse cx="0" cy="0" rx="34" ry="11" fill="#2A2D36"/><path d="M-70 -8 Q-20 -22 40 -18" stroke="#A8B0C0" stroke-width="5" fill="none" stroke-linecap="round"/>`);
// a hand holding something from above (four fingers and a thumb: hand15 turned fingers-down). origin = the finger tips
const holdHand = (k = 1, rot = 0) => TF(0, 0, k, TF(0, -84, 1, hand15({ curl: .62 }), 90), rot);

/* ================================================================ THE MAGNET TEST TABLE's TRAY ================================================================ */
// a kind -> its small drawing, centred on its own middle, about 120 wide at k 1
const OBJ = { pin: (t) => TF(0, 0, .5, pin18()), wire: (t) => TF(0, 0, .5, wire18()), nail: (t) => nail19(.55), clip: (t) => clip19(.8), tin: (t) => TF(0, 70, .62, tin19(1, t)), can: (t) => TF(0, 80, .58, can19(1, t)),
  towel: (t) => towel19(.62), foil: (t) => foil19(.66, t), ruler: (t) => ruler19(.42), bowl: (t) => TF(0, 30, .62, bowl19()), eraser: (t) => eraser19(.8), bottle: (t) => TF(0, 86, .5, bottle19()), cup: (t) => TF(0, 60, .55, cup19()) };
const OBJNAME = { pin: "steel pin", wire: "copper wire", nail: "iron nail", clip: "paper clip", tin: "food tin", can: "drink can", towel: "cotton towel", foil: "aluminium foil", ruler: "wooden ruler", bowl: "ceramic bowl", eraser: "eraser", bottle: "plastic bottle", cup: "glass cup" };
const TRAY1 = [["pin", 0, "trayPin"], ["wire", 1, "trayWire"]];
const TRAY1B = [["pin", 0, 0], ["nail", 0, 0], ["wire", 1, 0]];   // Part 1 after the look-closer: the pin and the nail attracted
const TRAY2 = [["pin", 0, 0], ["wire", 1, 0], ["tin", 0, "ansglow"], ["can", 1, "ansglow"], ["towel", 1, "v_metals"], ["foil", 1, "v_metals"], ["ruler", 1, "v_metals"], ["bowl", 1, "v_metals"], ["eraser", 1, "v_metals"], ["bottle", 1, "v_metals"], ["cup", 1, "v_metals"], ["nail", 0, "groups"], ["clip", 0, "groups"]];
// tray19: the shallow tray in two halves seen a little from above (origin = its middle; 760 x 200 at k 1). Green ATTRACTED / blue NOT
// ATTRACTED; in Part 2 the halves' names flip to the book's at `groups`. items [[kind, half, t0 | mark]] slide in low from the front.
function tray19(t, x, y, k = 1, items = PART === 1 ? TRAY1 : TRAY2, o = {}) { const gm = MKS("groups"), flip = PART === 2 && t >= gm - .2 && !o.noflip, f = flip ? ss(gm - .2, gm + .2, t) : 0;
  const lab = (i) => flip ? ["MAGNETIC MATERIALS", "NON-MAGNETIC MATERIALS"][i] : ["ATTRACTED", "NOT ATTRACTED"][i];
  let s = `<ellipse cx="0" cy="104" rx="400" ry="22" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-380 -86 H380 L400 86 H-400z" fill="#8A6A48" stroke="#5A4028" stroke-width="6" stroke-linejoin="round"/>`
    + `<path d="M-362 -72 H-8 V72 H-382z" fill="#E6F6E8"/><path d="M8 -72 H362 L382 72 H8z" fill="#E4EEFB"/><path d="M-362 -72 H-8 V72 H-382z" fill="${MAGC}" opacity=".3"/><path d="M8 -72 H362 L382 72 H8z" fill="${NONC}" opacity=".3"/>`
    + `<path d="M0 -80 V80" stroke="#5A4028" stroke-width="10"/><path d="M-400 86 H400 V104 H-400z" fill="#6E5236" stroke="#5A4028" stroke-width="5"/>`;
  const n = [0, 0], cnt = [0, 0]; for (const [kd, h, m] of items) { const t0 = typeof m === "string" ? MKS(m) : m; if (t >= t0) cnt[h]++; }
  for (const [kd, h, m] of items) { const t0 = typeof m === "string" ? MKS(m) : m; if (t < t0) continue; const j = n[h]++, N = Math.max(cnt[h], 1), cols = N <= 2 ? N : N <= 4 ? 2 : 3, rows = Math.ceil(N / cols), cw = 330 / cols, rh = 140 / rows;
    const cx = (h ? 16 : -362) + cw * (j % cols) + cw / 2 + (h ? 10 : 0), cy = -72 + rh * Math.floor(j / cols) + rh / 2, sc = Math.min(1.7, (cw - 14) / 150, (rh - 6) / 90) * (o.big || 1), u = eo(clamp((t - t0) / .45));
    s += TF(cx, cy + 40 * (1 - u), sc * (.7 + .3 * u), OBJ[kd](t)); }
  s = [0, 1].map((i) => TF(i ? 196 : -196, -128, 1 + .08 * pulse(t, gm, .05, .5), `<path d="M0 30 V58" stroke="${i ? NONC : MAGC}" stroke-width="8"/>` + tpill(0, 0, lab(i), flip ? 30 : 38, i ? NONC : MAGC, "#fff", { w: 700 }))).join("") + s
    + (f > 0 && f < 1 ? `<rect x="-400" y="-160" width="800" height="64" fill="#fff" opacity="${n2(.5 * Math.sin(f * Math.PI))}"/>` : "");
  return TF(x, y, k, s); }
const trayPH = tray19;   // Stage 1's name (p1.js / p2.js)
// the basket of the book's objects (a woven basket; origin = its base). o.left: which objects still lie in it
const basket19 = (t, k = 1, o = {}) => TF(0, 0, k, `<ellipse cx="0" cy="4" rx="150" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>` + TF(-60, -96, .5, ruler19(1, -12)) + TF(40, -110, .62, bottle19()) + TF(-80, -80, .5, towel19())
  + `<path d="M-130 -80 L-112 0 H112 L130 -80z" fill="#C99A5E" stroke="#7A5226" stroke-width="5"/>${[0, 1, 2, 3].map((i) => `<path d="M-128 ${-64 + i * 18} H128" stroke="#A8783E" stroke-width="5"/>`).join("")}${[...Array(9)].map((_, i) => `<path d="M${-110 + i * 27} -80 V0" stroke="#A8783E" stroke-width="3"/>`).join("")}<path d="M-130 -80 Q0 -170 130 -80" stroke="#7A5226" stroke-width="9" fill="none"/>`);

/* ================================================================ THE VOID DECK (Saturday afternoon) ================================================================ */
// world coordinates (the same as EP18's BG.deck18): the ceiling to y 84, the back wall to y 712, pillar A x 470-600, pillar B x 1440-1590,
// the open side (the garden, the rain tree) beyond x 1590. The test table TABLE19 at the centre front.
const TABLE19 = [1000, 914], BAN = [900, 420], PIPE = [610, 1430, 104], NB19 = [1335, 400], LAMP = [1680, 700], RACK = [1700, 760], POT19 = [372, 800], BIN19 = [1525, 840], PLNT19 = [1600, 770, 520];
// the hidden animals' spots [x, y, k, flip] in the world: PIGAT (Part 1, the rock pigeon) and SNAT (Part 2, the land snail); INTRO = the game's
// push-in; never used again; the REVEAL a new spot (SERIES_FORMAT 4)
const PIGAT = { cold: [1180, 93, .34, 1], back: [1180, 93, .34, 1], title: [1180, 93, .34, 1], theme: [1180, 93, .34, 1], game: [1180, 93, .34, 1],
  table: [300, 250, .34, 1], waitw: [300, 166, .3, 1], answer: [NB19[0] - 20, 318, .34, 1], holdon: [POT19[0] + 70, 618, .34, -1], sticky: [TABLE19[0] + 440, 960, .34, -1], liz: [RACK[0] + 40, 668, .34, -1] };
const SNAT = { place: [BIN19[0] + 98, 770, .3, 0, -1], game: [BIN19[0] + 98, 770, .3, 0, -1], waitw: [1300, 1010, .26, 0, 1], tinans: [TABLE19[0] + 66, TABLE19[1] + 110, .24, -90, 1], table: [585, 742, .26, 0, -1],
  show: [700, 1074, .26, 0, 1], fix: [PLNT19[0] + 40, PLNT19[1] - 118, .26, 0, 1], liz: [POT19[0] - 40, 618, .26, -14, 1] };
// the afternoon light: warm from the open side, sun patches on the floor
const afternoon19 = `<rect x="-200" y="-120" width="2320" height="1320" fill="#FFB054" opacity=".08"/><path d="M1590 712 L2120 712 L2120 1200 L1200 1200z" fill="#FFF2C4" opacity=".3"/><path d="M1590 760 L1380 1200 L1180 1200 L1520 760z" fill="#FFF2C4" opacity=".22"/><path d="M1590 84 L2120 84 L2120 712 L1590 712z" fill="#FFD890" opacity=".12"/>`;
// the INTERACTIONS banner on EP18's two easels and their metal frame (absolute)
const banner19 = (t, o = {}) => { const [x, y] = BAN, rip = 3 * Math.sin(t * 1.6);
  let s = `<ellipse cx="${x}" cy="${y + 300}" rx="420" ry="18" fill="${P.ink}" opacity=".16" filter="url(#b4)"/><path d="M${x - 350} ${y - 170} L${x - 400} ${y + 300} M${x + 350} ${y - 170} L${x + 400} ${y + 300} M${x - 350} ${y - 170} L${x - 290} ${y + 290} M${x + 350} ${y - 170} L${x + 290} ${y + 290}" stroke="#7A4A26" stroke-width="16" stroke-linecap="round"/>`
    + `<rect x="${x - 372}" y="${y - 184}" width="744" height="20" rx="8" fill="#9AA4B4" stroke="#5E6878" stroke-width="4"/>`;
  s += `<g filter="url(#drop)"><path d="M${x - 340} ${y - 168} H${x + 340} V${y + 130} Q${x} ${y + 130 + rip} ${x - 340} ${y + 130}z" fill="#FFF8EA" stroke="#C9A974" stroke-width="6"/></g>`
    + T(x, y - 112, "OUR NEW THEME:", 40, P.ink, { ls: 3 }) + T(x, y - 24, "INTERACTIONS", 92, "#C4581E", { ls: 4 })
    + `<text x="${x - 310}" y="${y + 40}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="27" fill="${P.ink}">I1. How do magnets interact with different things?</text>`
    + `<text x="${x - 310}" y="${y + 86}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="27" fill="${P.ink}">I2. How do the interactions of magnets affect us</text><text x="${x - 270}" y="${y + 118}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="27" fill="${P.ink}">in our daily life?</text>`;
  if (o.icon !== undefined) { const sp = clamp((t - o.icon) / .9); s += TF(x + 330, y - 230, .3 * spring(t, o.icon, .45), magnet19(t, { glint: false }), 360 * eio(sp)); }
  return s; };
// the grey PIPE under the ceiling, with brackets
const pipe19 = () => { const [a, b, y] = PIPE; return `<rect x="${a}" y="${y - 12}" width="${b - a}" height="24" rx="12" fill="#9AA0AA" stroke="#5E646E" stroke-width="4"/><rect x="${a}" y="${y - 8}" width="${b - a}" height="6" rx="3" fill="#D6DAE0" opacity=".8"/>` + [...Array(6)].map((_, i) => { const x = a + 60 + i * ((b - a - 120) / 5); return `<rect x="${n2(x - 8)}" y="84" width="16" height="${y - 84 + 14}" fill="#7A808A"/><rect x="${n2(x - 16)}" y="${y - 14}" width="32" height="28" rx="6" fill="#7A808A" stroke="#5E646E" stroke-width="3"/>`; }).join(""); };
// the notice board on the back wall
const notice19 = () => { const [x, y] = NB19; return `<g filter="url(#dropS)"><rect x="${x - 100}" y="${y - 82}" width="200" height="164" rx="8" fill="#7A5A34"/></g><rect x="${x - 90}" y="${y - 72}" width="180" height="144" fill="#D9A866"/><rect x="${x - 78}" y="${y - 62}" width="70" height="56" fill="#FFF6C8" transform="rotate(-4 ${x - 43} ${y - 34})"/><rect x="${x + 4}" y="${y - 60}" width="72" height="92" fill="#DFF0FF" transform="rotate(3 ${x + 40} ${y - 14})"/><rect x="${x - 70}" y="${y + 6}" width="66" height="54" fill="#FFE0E6"/>`
  + `<path d="M${x - 70} ${y - 46} h50 M${x - 70} ${y - 32} h40 M${x + 14} ${y - 40} h48 M${x + 14} ${y - 24} h40 M${x + 14} ${y - 8} h44" stroke="#8A7A6A" stroke-width="4"/><circle cx="${x - 43}" cy="${y - 62}" r="5" fill="#FB7158"/><circle cx="${x + 40}" cy="${y - 60}" r="5" fill="#14B8A6"/>`; };
// the lamp post just outside, and the bicycle rack with two bicycles
const lamp19 = () => { const [x, y] = LAMP; return `<rect x="${x - 7}" y="250" width="14" height="${y - 250}" fill="#5E646E"/><path d="M${x - 26} 252 Q${x} 226 ${x + 26} 252z" fill="#4E5460"/><rect x="${x - 14}" y="252" width="28" height="18" rx="4" fill="#FFF3C4"/><rect x="${x - 14}" y="${y - 14}" width="28" height="16" rx="4" fill="#4E5460"/>`; };
const bike19 = (x, y, col, k = 1) => TF(x, y, k, `<circle cx="-64" cy="-44" r="44" fill="none" stroke="#3A3A4A" stroke-width="7"/><circle cx="64" cy="-44" r="44" fill="none" stroke="#3A3A4A" stroke-width="7"/><path d="M-64 -44 L-14 -100 L40 -100 L64 -44 M-14 -100 L-24 -122 M40 -100 L48 -128 h22 M-14 -100 L6 -44 L-64 -44" stroke="${col}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-36 -126 h26" stroke="#3A3A4A" stroke-width="10" stroke-linecap="round"/>`);
const rack19 = (t) => { const [x, y] = RACK; return bike19(x - 40, y + 14, "#E0453A", .92) + bike19(x + 150, y + 20, "#3A8DFF", .92) + `<path d="M${x - 140} ${y} V${y - 92} H${x + 240} V${y}" fill="none" stroke="#8E96A4" stroke-width="12" stroke-linejoin="round"/><path d="M${x - 140} ${y - 92} H${x + 240}" stroke="#C8D0DA" stroke-width="4"/>${[0, 1, 2, 3].map((i) => `<path d="M${x - 90 + i * 100} ${y - 92} V${y}" stroke="#8E96A4" stroke-width="8"/>`).join("")}`; };
// the big potted plant by pillar A: the leaves grow on their stalks from the stems (SERIES_FORMAT 5, plants grow the way real plants grow).
// o.wet: drops on the leaves (Part 2)
const POTLV = [[-1, 120, 44, 1], [1, 112, 30, 1], [-1, 90, 58, 2], [1, 84, 52, 2], [-1, 62, 66, 3], [1, 58, 70, 3], [-1, 40, 60, 4], [1, 30, 50, 4]];
const pot19 = (t, o = {}) => { const [x, y] = POT19; let st = "", lv = "";
  const stems = [[x - 10, y - 160, x - 70, y - 300, x - 90, y - 400], [x + 6, y - 160, x + 40, y - 320, x + 80, y - 410], [x, y - 160, x - 6, y - 330, x + 6, y - 460], [x - 4, y - 160, x - 40, y - 250, x - 120, y - 300], [x + 4, y - 160, x + 60, y - 240, x + 130, y - 280]];
  stems.forEach((b, i) => { const sw = 3 * Math.sin(t * 1.1 + i); st += `<path d="M${b[0]} ${b[1]} Q${b[2] + sw} ${b[3]} ${b[4] + sw} ${b[5]}" stroke="#4E7A34" stroke-width="${i < 3 ? 9 : 7}" fill="none" stroke-linecap="round"/>`;
    for (let j = 0; j < 4; j++) { const u = .35 + j * .2, v = 1 - u, px = v * v * b[0] + 2 * v * u * (b[2] + sw) + u * u * (b[4] + sw), py = v * v * b[1] + 2 * v * u * b[3] + u * u * b[5], sd = (j + i) % 2 ? 1 : -1, ang = sd > 0 ? -30 - 10 * j : 210 + 10 * j;
      lv += `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${ang})"><path d="M0 0 L14 0" stroke="#4E7A34" stroke-width="4"/><g transform="translate(12 0)">${leaf15(72, 26, (i + j) % 2 ? "#3E9A5A" : "#58B56C", "#2A6E3E")}</g>${o.wet ? `<circle cx="56" cy="-6" r="5" fill="#E6F6FF" stroke="#9FCFE8" stroke-width="1.5"/>` : ""}</g>`; }
    lv += `<g transform="translate(${n2(b[4] + sw)} ${b[5]}) rotate(${i % 2 ? -70 : -110})"><g transform="translate(0 0)">${leaf15(64, 24, "#6CC27A", "#2A6E3E")}</g></g>`; });
  return `<ellipse cx="${x}" cy="${y + 8}" rx="140" ry="18" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>` + st + lv + `<path d="M${x - 120} ${y - 170} L${x - 96} ${y} H${x + 96} L${x + 120} ${y - 170}z" fill="#C8643E" stroke="#8A3E22" stroke-width="6"/><rect x="${x - 132}" y="${y - 186}" width="264" height="30" rx="10" fill="#D9774E" stroke="#8A3E22" stroke-width="6"/><ellipse cx="${x}" cy="${y - 186}" rx="120" ry="10" fill="#6A4424"/>`; };
// the low planter of wet plants at the back wall (Part 2): a brick box, shrubs on their stems
const planter19 = (t, o = {}) => { const [x0, y, w] = PLNT19; let s = `<rect x="${x0}" y="${y - 120}" width="${w}" height="120" fill="#B8674A" stroke="#7A3E2A" stroke-width="5"/>${[0, 1, 2].map((r) => `<path d="M${x0} ${y - 120 + r * 40} H${x0 + w}" stroke="#8A4A34" stroke-width="3"/>`).join("")}${[...Array(12)].map((_, i) => `<path d="M${x0 + 30 + i * 52 + (i % 2) * 20} ${y - 120 + (i % 3) * 40} v40" stroke="#8A4A34" stroke-width="3"/>`).join("")}<rect x="${x0 - 8}" y="${y - 132}" width="${w + 16}" height="18" rx="6" fill="#D9C9A8" stroke="#8C8272" stroke-width="4"/>`;
  for (let i = 0; i < 7; i++) { const bx = x0 + 50 + i * ((w - 100) / 6), by = y - 132, h = 90 + 40 * hash(i, 3), sw = 3 * Math.sin(t * 1.2 + i); s += `<path d="M${n2(bx)} ${by} Q${n2(bx + sw)} ${n2(by - h * .6)} ${n2(bx + sw * 2)} ${n2(by - h)}" stroke="#4E7A34" stroke-width="6" fill="none"/>`;
    for (let j = 0; j < 3; j++) { const py = by - h * (.35 + j * .28), sd = (i + j) % 2 ? 1 : -1; s += `<g transform="translate(${n2(bx + sw * (.7 + j * .4))} ${n2(py)}) rotate(${sd > 0 ? -25 : 205})">${leaf15(46, 18, (i + j) % 2 ? "#3E9A5A" : "#4FAE66", "#2A6E3E")}${o.wet ? `<circle cx="36" cy="-4" r="4" fill="#E6F6FF" stroke="#9FCFE8" stroke-width="1.5"/>` : ""}</g>`; } }
  return s; };
// the big BLUE RECYCLING BIN: round openings, the word Recyclables. origin = its base centre
const bin19 = (t, o = {}) => { const [x, y] = BIN19; return `<ellipse cx="${x}" cy="${y + 6}" rx="150" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M${x - 130} ${y - 300} L${x - 116} ${y} H${x + 116} L${x + 130} ${y - 300}z" fill="#2F6FD6" stroke="#1A3E8A" stroke-width="6"/><rect x="${x - 142}" y="${y - 330}" width="284" height="40" rx="12" fill="#3A80E8" stroke="#1A3E8A" stroke-width="6"/>`
  + [[-60, -250], [60, -250]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="36" fill="#14244A" stroke="#1A3E8A" stroke-width="5"/><circle cx="${x + dx}" cy="${y + dy}" r="36" fill="none" stroke="#9EC4FF" stroke-width="3" opacity=".6"/>`).join("")
  + `<rect x="${x - 92}" y="${y - 186}" width="184" height="54" rx="10" fill="#fff"/>` + T(x, y - 148, "Recyclables", 30, "#1A3E8A") + `<path d="M${x - 30} ${y - 100} l16 -24 l16 24 m-6 0 l22 0 l-10 18 M${x - 34} ${y - 96} l-12 18 h26" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  + (o.wet ? `<path d="M${x - 100} ${y - 290} V${y - 40}" stroke="#fff" stroke-width="10" opacity=".25" stroke-linecap="round"/><circle cx="${x + 70}" cy="${n2(y - 220 + ((t * 40) % 160))}" r="5" fill="#E6F6FF" opacity=".8"/>` : ""); };
// a small easel (Basil's homework, Momo's note card): the drawing on the board, legs to the floor. origin = its feet line centre
const smallEasel = (inner, w = 520, h = 600) => `<ellipse cx="0" cy="6" rx="${w * .55}" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${-w * .38} 0 L${-w * .3} ${-h - 80} M${w * .38} 0 L${w * .3} ${-h - 80} M0 -30 L0 ${-h - 40}" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="${-w * .5 - 10}" y="-200" width="${w + 20}" height="20" rx="8" fill="#7A4A26"/>`
  + `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h - 160}" width="${w}" height="${h - 30}" rx="16" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g><g transform="translate(0 ${-h / 2 - 175})">${inner}</g>`;
// the stone table and its stools, the tray and what lies on it (the MAGNET TEST TABLE)
const table19 = (t, o = {}) => { const [tx, ty] = TABLE19; let s = `<ellipse cx="${tx}" cy="${ty + 160}" rx="340" ry="28" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${tx - 60} ${ty} L${tx - 80} ${ty + 170} H${tx + 80} L${tx + 60} ${ty}z" fill="#BFB6A6" stroke="#8C8272" stroke-width="5"/>`
  + `<ellipse cx="${tx}" cy="${ty + 6}" rx="330" ry="66" fill="#C9C0AE" stroke="#8C8272" stroke-width="5"/><ellipse cx="${tx}" cy="${ty - 4}" rx="330" ry="62" fill="#D6CDBC" stroke="#8C8272" stroke-width="5"/><ellipse cx="${tx}" cy="${ty - 10}" rx="300" ry="48" fill="#E3DACA"/>`;
  if (o.stools !== false) s += [[-440, 110], [440, 110]].map(([dx, dy]) => `<path d="M${tx + dx - 50} ${ty + dy - 30} L${tx + dx - 40} ${ty + dy + 60} H${tx + dx + 40} L${tx + dx + 50} ${ty + dy - 30}z" fill="#BFB6A6" stroke="#8C8272" stroke-width="4"/><ellipse cx="${tx + dx}" cy="${ty + dy - 30}" rx="70" ry="20" fill="#D6CDBC" stroke="#8C8272" stroke-width="4"/>`).join("");
  if (o.back) s += o.back;
  if (o.tray !== false) s += tray19(t, tx, ty - 46, .52, o.titems, o.trayO || {});
  if (o.top) s += o.top;
  return s; };
// the rain tree's leaves stir, a mynah on the grass, a child cycles past outside (o.child: a time)
const outside19 = (t, o = {}) => { let s = [...Array(7)].map((_, i) => `<circle cx="${n2(1650 + i * 56 + 6 * Math.sin(t * 1.3 + i))}" cy="${n2(200 + 30 * hash(i, 2))}" r="${n2(34 + 10 * hash(i, 3))}" fill="${i % 2 ? "#3E9A5A" : "#58B56C"}" opacity=".85"/>`).join("")
    + TF(1900 + 30 * Math.sin(t * .3), 690 - hop(t % 1.9, 0, .3, 10), .8, bird15(t, 1, 1.1));
  if (o.child !== undefined) { const u = clamp((t - o.child) / 4); if (u > 0 && u < 1) { const x = lerp(2150, 1500, u), w = t * 8; s += TF(x, 706, .5, `<circle cx="-60" cy="-40" r="40" fill="none" stroke="#3A3A4A" stroke-width="8"/><circle cx="60" cy="-40" r="40" fill="none" stroke="#3A3A4A" stroke-width="8"/><path d="M-60 -40 L-10 -100 L40 -100 L60 -40 M-10 -100 L-20 -120 M40 -100 L50 -130 h20" stroke="#E0453A" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="0" cy="-200" r="30" fill="#F2C29B"/><path d="M-30 -210 Q0 -250 30 -210z" fill="#5A3A22"/><path d="M0 -170 L-10 -110 M0 -160 L40 -120" stroke="#5B7BD6" stroke-width="22" stroke-linecap="round"/><path d="M-10 -110 L${n2(-20 + 20 * Math.sin(w))} -60" stroke="#3A4A7A" stroke-width="14" stroke-linecap="round"/>`); } }
  return s; };
// VD19: the live void deck. o: banner (false: off), table (false) + table options (items, top, back, stools), items0 (behind everything
// in front of the wall), items (between the wall things and the table), front (in front of the table), pig ([x, y, k, fl] | false; default the
// scene's PIGAT spot in Part 1), snail ([x, y, k, rot, fl] | false; Part 2's SNAT), wet (Part 2: after a shower), child, dim
function VD19(t, o = {}, cam) { const sc = (window._S || {}).name, wet = o.wet === undefined ? PART === 2 : o.wet;
  let s = bg("deck18") + afternoon19 + outside19(t, o) + lamp19() + pipe19() + notice19();
  s += `<path d="M1000 84 V126" stroke="#6E6A60" stroke-width="8"/>` + TF(1000, 136, 1, `<ellipse rx="210" ry="12" fill="#8C8272" transform="scale(${n2(Math.cos(t * 12))} 1)"/><ellipse rx="12" ry="210" fill="#8C8272" transform="scale(1 .06)"/><circle r="22" fill="#6E6A60"/>`);
  if (wet) s += `<path d="M1590 712 L2120 712 L2120 1200 L1500 1200z" fill="#BFD4E6" opacity=".22"/>` + wetSheen(1800, 900, 220, 26, t) + wetSheen(1520, 1060, 160, 20, t, .3) + drips15(t, [[1640, 86, 0, 620], [1760, 86, 1.1, 620], [1880, 86, .5, 620], [2010, 86, 1.7, 620]]);
  if (o.items0) s += o.items0;
  if (PART === 1 || o.rack) s += rack19(t);
  if (PART === 2 || o.planter) s += planter19(t, { wet });
  if (o.banner !== false) s += banner19(t, o);
  const pg = o.pig === undefined ? (PART === 1 ? PIGAT[sc] : null) : o.pig; if (pg) s += pigeonAt(t, pg[0], pg[1], pg[2], pg[3]);
  s += pot19(t, { wet });
  if (PART === 2 || o.bin) s += bin19(t, { wet });
  const sn = o.snail === undefined ? (PART === 2 ? SNAT[sc] : null) : o.snail; const snB = sn && sn[1] < 900;
  if (sn && snB) s += snail19At(t, sn[0], sn[1], sn[2], sn[3], sn[4]);
  if (o.items) s += o.items;
  if (o.table !== false) s += table19(t, o);
  if (sn && !snB) s += snail19At(t, sn[0], sn[1], sn[2], sn[3], sn[4]);
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* ================================================================ PART 1 PICTURES ================================================================ */
// the lock-in ring's picture (centre 430, 470, about r 170): the bar magnet above a steel pin and a curl of copper wire, big
const ringP1 = (t) => `<circle cx="430" cy="470" r="180" fill="#FFF8EA"/>` + TF(430, 395, .78, magnet19(t)) + TF(360, 520, .6, pin18()) + TF(520, 560, .55, wire18()) + T(360, 488, "steel pin", 22, P.ink) + T(520, 620, "copper wire", 22, P.ink);
// the storybook hillside (lcmagnet, the LEFT beat): a person long ago with a stick with an IRON tip; the tip is tugged down onto a dark rock.
// origin = the frame's middle, 760 x 560. u 0..1: the tip is pulled down to the rock
const storyHill = (t, u) => { let s = `<rect x="-380" y="-280" width="760" height="560" rx="20" fill="#F7E6C2"/><rect x="-380" y="-280" width="760" height="300" rx="20" fill="#CFE6D8" opacity=".7"/>`
    + `<path d="M-380 40 Q-200 -40 0 10 Q200 60 380 -20 V280 H-380z" fill="#A9C97A"/><path d="M-380 140 Q-100 80 120 130 Q260 160 380 110 V280 H-380z" fill="#8EB860"/>`
    + [...Array(14)].map((_, i) => { const x = -350 + i * 52, y = 150 + 30 * hash(i, 3), w = 4 * Math.sin(t * 1.5 + i); return `<path d="M${x} ${y} q${n2(w)} -18 ${n2(w * 1.5 + 4)} -30 M${x + 8} ${y} q${n2(w)} -14 ${n2(w + 10)} -22" stroke="#5E8A3A" stroke-width="4" fill="none" stroke-linecap="round"/>`; }).join("")
    + `<circle cx="260" cy="-190" r="44" fill="#FFE59A"/><path d="M-300 -170 q30 -20 60 0 q30 -20 60 0" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" opacity=".85"/>`;
  // the rock (the lodestone) on the grass, and the person: a long robe, a straw hat, walking; the stick's iron tip pulled to the rock
  s += TF(80, 150, .62, lodestone19(t, {}));
  const bx = -140, by = 150, sx = lerp(-40, 40, eio(u)), sy = lerp(60, 110, eio(u));
  s += `<path d="M${bx - 30} ${by} L${bx - 20} ${by - 130} H${bx + 30} L${bx + 40} ${by}z" fill="#8A6AB8" stroke="#4E3A6E" stroke-width="5" stroke-linejoin="round"/><circle cx="${bx + 4}" cy="${by - 160}" r="30" fill="#F2C29B" stroke="#C98F66" stroke-width="4"/><path d="M${bx - 50} ${by - 176} Q${bx + 4} ${by - 230} ${bx + 58} ${by - 176}z" fill="#E8C468" stroke="#A88A3A" stroke-width="4"/>`
    + eye16(bx + 16, by - 162, 5, { shut: blink16(t, .5) }) + `<path d="M${bx + 10} ${by - 146} q8 4 14 -2" stroke="${INK16}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + `<path d="M${bx + 30} ${by - 100} L${bx + 70 + sx * .3} ${by - 80}" stroke="#8A6AB8" stroke-width="18" stroke-linecap="round"/><circle cx="${n2(bx + 72 + sx * .3)}" cy="${by - 80}" r="12" fill="#F2C29B" stroke="#C98F66" stroke-width="3"/>`
    + `<path d="M${n2(bx + 72 + sx * .3)} ${by - 120} L${n2(80 + sx)} ${n2(by - 40 + sy * .4)}" stroke="#8A5A30" stroke-width="10" stroke-linecap="round"/><path d="M${n2(80 + sx - 14)} ${n2(by - 44 + sy * .4)} L${n2(80 + sx + 6)} ${n2(by - 30 + sy * .4)}" stroke="#4A4E5A" stroke-width="12" stroke-linecap="round"/>`
    + pullArrows(t, 80 + sx, by - 120, 80 + sx, by - 50, u > .05 ? 1 : 0, MAGC, 2);
  return s; };
// the LOOK CLOSER inside (lcmagnet): the lodestone story (LEFT), the cut-away into Basil's magnet (RIGHT), then the six shapes
function magnetArt(t) { const tR = MKS("rock"), tL = MKS("lodestone"), tI = MKS("inside"), tS = MKS("shapes"), sh = ss(tS - .3, tS + .6, t), mv = ss(tI - .9, tI - .1, t);
  const zA = 1 + .1 * ss(tR, tR + 1.2, t), u = ss(tR + .4, tR + 2.6, t);
  let s = `<g transform="translate(0 ${n2(-120 * sh)}) scale(${n2(1 - .36 * sh)})">`;
  // LEFT (then moves aside): the storybook frame
  const fx = lerp(-330, -470, mv), fk = lerp(1.08, .74, mv) * zA;
  s += `<g transform="translate(${n2(fx)} 40) scale(${n2(fk)})"><g filter="url(#drop)"><rect x="-394" y="-294" width="788" height="588" rx="26" fill="#C9A974"/></g>` + storyHill(t, u)
    + (t >= tR ? TF(-250, -250, spring(t, tR, .4), tpill(0, 0, "long ago", 34, "#8A5A30", "#fff", { w: 700 })) : "") + `</g>`;
  // the magnifier on the rock (lodestone): beside the frame, joined to the rock by a line; it goes before the cut-away
  if (t >= tL && t < tI + .2) { const k = spring(t, tL, .45) * (1 - ss(tI - .9, tI - .3, t)), rx = fx + 80 * fk, ry = 40 + 150 * fk;
    s += `<clipPath id="lcLodeC"><circle cx="0" cy="0" r="176"/></clipPath>` + OP(Math.min(1, k * 1.5), `<path d="M${n2(rx + 60)} ${n2(ry - 40)} L${n2(230)} ${n2(-40)}` + `" stroke="${P.ink}" stroke-width="7" opacity=".45"/>`)
      + TF(400, -40, k, `<circle r="180" fill="#E6E2EE"/><g clip-path="url(#lcLodeC)">${TF(0, 20, 1.25, lodestone19(t, { nails: true }))}</g><circle r="180" fill="none" stroke="${P.ink}" stroke-width="14"/><circle r="180" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>`)
      + OP(1 - ss(tI - .9, tI - .3, t), lcLab(t, tL + .4, 330, 205, "a lodestone", 380, 130, { size: 44 })); }
  // RIGHT: Basil's magnet, big; the paint curls back and shows grey metal; Momo's guess (a plastic toy) crossed out
  const ki = t >= tI - .6 ? spring(t, tI - .6, .5) : 0, cut = ss(tI, tI + 1.0, t);
  if (ki > .02) s += TF(230, 40, 2.0 * ki, magnet19(t, { cut })) + (t >= tI + .9 ? lcLab(t, tI + .9, 120, 235, "metal inside: usually iron or steel", 110, 90, { size: 40 }) : "")
    + (t >= tI + .2 ? TF(620, -80, spring(t, tI + .2, .4) * .75, `<g opacity=".55"><rect x="-70" y="-40" width="140" height="80" rx="24" fill="#FFB8C8" stroke="#C26A84" stroke-width="5"/><circle cx="-30" cy="0" r="10" fill="#fff"/><circle cx="30" cy="0" r="10" fill="#fff"/></g><path d="M-70 -60 L70 60 M70 -60 L-70 60" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/>` + T(0, 96, "not plastic", 32, P.ink)) : "");
  s += `</g>`;
  // the six shapes along the bottom, in the book's order, each named (clear of the faces in the lower corners)
  if (t >= tS) SHAPES.forEach((nm, i) => { const a = tS + i * .35; if (t < a) return; const x = -450 + i * 180, k = spring(t, a, .45); s += TF(x, 190, k, `<g filter="url(#dropS)"><rect x="-84" y="-90" width="168" height="180" rx="22" fill="#fff" stroke="#E3C9A8" stroke-width="5"/></g>` + TF(0, -18, i === 1 || i === 5 ? .72 : .85, shape19(i)) + T(0, 74, nm, 28, P.ink)); });
  return s; }
// the slow-motion look-closer (lcattract): the magnet comes down slowly; the pin starts to move BEFORE it touches and jumps the gap; the pin
// and the nail click onto its END; then steel / iron labels. The table-top fills the panel.
function attractArt(t) { const tS = MKS("slow"), tG = MKS("gap"), tA = MKS("kw_attract"), tSt = MKS("steel"), tIr = MKS("iron");
  const down = ss(tS, tG - .8, t), my = lerp(-420, -150, down), jump = ss(tG + .3, tG + 2.2, t), jumpN = ss(tG + 1.0, tG + 2.9, t), wob = t > tG && t < tG + .3 ? 3 * Math.sin(t * 60) : 0;
  let s = `<rect x="-900" y="-420" width="1800" height="840" fill="#F3EEE4"/><rect x="-900" y="120" width="1800" height="300" fill="#E3DACA"/><path d="M-900 120 H900" stroke="#C9BCA4" stroke-width="6"/>`
    + [...Array(30)].map((_, i) => `<circle cx="${n2(-880 + 1760 * hash(i, 3))}" cy="${n2(140 + 260 * hash(i, 5))}" r="${n2(3 + 4 * hash(i, 7))}" fill="#CFC5B2"/>`).join("");
  // dust motes hang still in the slowed light
  s += [...Array(12)].map((_, i) => `<circle cx="${n2(-700 + 1400 * hash(i, 11) + 6 * Math.sin(t * .3 + i))}" cy="${n2(-350 + 400 * hash(i, 13))}" r="4" fill="#fff" opacity=".7"/>`).join("");
  s += `<g transform="translate(0 70) scale(1.22) translate(0 -70)">`;
  // the magnet, held from above by a hand (four fingers and a thumb), END down: its blue end points at the pin and the nail
  const mx = -60;
  s += TF(mx, my, 1, holdHand(1.1, 0).replace(/^/, "") ) ;
  s += TF(mx, my + 60, 1.5, `<g transform="rotate(90)">${magnet19(t, { glint: false })}</g>`);
  const endY = my + 60 + 225;
  // the pin (steel) and the nail (iron) on the table; they jump up across the gap onto the END
  const px = lerp(-30, mx - 30, jump), py = lerp(210, endY + 30, eio(jump)), nx = lerp(220, mx + 40, jumpN), ny = lerp(220, endY + 40, eio(jumpN));
  s += TF(nx, ny, 1.25, nail19(1, lerp(0, 80, jumpN))) + TF(px + wob, py, 1.4, pin18(), lerp(0, 75, jump));
  if (t >= tG && t < tG + 4) s += pullArrows(t, px, py - 20, mx - 20, endY + 20, (1 - jump) * ramp(t, tG, .3), MAGC, 3);
  if (t >= tG + .4 && t < tG + 2.6) s += `<path d="M${n2(-30)} 210 Q${n2(-50)} ${n2((210 + endY) / 2)} ${n2(mx - 30)} ${n2(endY + 30)}" stroke="${P.ink}" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round" fill="none" opacity=".6"/>`;
  s += `</g>`;
  const SC_ = (x, y) => [x * 1.22, (y - 70) * 1.22 + 70];
  // the magnifier circle on the gap (gap): it shows the clear gap BEFORE the pin touches
  if (t >= tG - .2 && t < tA + 1) { const k = spring(t, tG - .2, .45) * (1 - ss(tA + .4, tA + 1, t)), gy = (endY + py) / 2; s += TF(560, -40, k, `<circle r="210" fill="#F3EEE4"/><clipPath id="gapC"><circle r="204"/></clipPath><g clip-path="url(#gapC)">${TF(0, 0, 1.6, `<g transform="translate(${n2(-mx + 10)} ${n2(-gy)})"><rect x="-300" y="-300" width="600" height="600" fill="#F3EEE4"/>${TF(mx, my + 60, 1.5, `<g transform="rotate(90)">${magnet19(t, { glint: false })}</g>`)}${TF(px + wob, py, 1.4, pin18(), lerp(0, 75, jump))}</g>`)}</g><circle r="210" fill="none" stroke="${P.ink}" stroke-width="16"/><circle r="210" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>`)
      + (jump < .9 && t > tG + .3 ? TF(560, 210, k, tpill(0, 0, "a gap: not touching yet!", 34, P.ink, "#fff", { w: 700 })) : "") + `<path d="M${n2(SC_(mx + 40, gy)[0])} ${n2(SC_(mx + 40, gy)[1])} L350 -40" stroke="${P.ink}" stroke-width="6" opacity="${n2(.5 * k)}"/>`; }
  if (t >= tA) s += TF(-560, -40, spring(t, tA + .6, .45) * (1 - ss(tSt - .6, tSt - .2, t)), tpill(0, 0, "attract = pull", 48, MAGC, "#fff", { w: 700 }));
  if (t >= tSt) s += lcLab(t, tSt, -480, 20, "steel", SC_(px - 60, py)[0], SC_(px - 60, py)[1], { size: 46, fill: MAGC, ink: "#fff" });
  if (t >= tIr) s += lcLab(t, tIr, 380, 40, "iron", SC_(nx + 40, ny + 10)[0], SC_(nx + 40, ny + 10)[1], { size: 46, fill: MAGC, ink: "#fff" });
  if (t >= tSt) s += TF(-480, 100, spring(t, tSt + .3, .4), T(0, 0, "the pin", 34, P.ink)) + (t >= tIr ? TF(380, 120, spring(t, tIr + .3, .4), T(0, 0, "the nail", 34, P.ink)) : "");
  return s; }
// the HDB kitchen inset (holdon, fridge): a fridge magnet holds a child's drawing on an ordinary painted fridge door. origin = its middle, 520 x 380
const fridgeInset = (t) => `<g filter="url(#drop)"><rect x="-260" y="-190" width="520" height="380" rx="26" fill="#FFF8EA"/></g><clipPath id="frC"><rect x="-246" y="-176" width="492" height="352" rx="18"/></clipPath><g clip-path="url(#frC)"><rect x="-260" y="-190" width="520" height="380" fill="#F6EAD8"/><rect x="-260" y="60" width="520" height="140" fill="#D9C2A0"/>${[...Array(6)].map((_, i) => `<rect x="${-246 + i * 90}" y="-176" width="84" height="40" fill="#BFE0E6" stroke="#9FC4CC" stroke-width="2"/>`).join("")}`
  + `<rect x="-170" y="-150" width="250" height="330" rx="16" fill="#F4F6F8" stroke="#9AA4B4" stroke-width="5"/><path d="M-170 -40 H80" stroke="#9AA4B4" stroke-width="5"/><rect x="50" y="-120" width="12" height="60" rx="6" fill="#9AA4B4"/><rect x="50" y="-20" width="12" height="80" rx="6" fill="#9AA4B4"/>`
  + `<g transform="rotate(${n2(-3 + 2 * Math.sin(t * 2.2))} -60 0)"><rect x="-130" y="-10" width="140" height="110" fill="#fff" stroke="#D9D2C0" stroke-width="3"/><circle cx="-100" cy="20" r="14" fill="#FFC83A"/><path d="M-120 90 L-80 40 L-50 70 L-20 30 L0 90z" fill="#58B56C"/><path d="M-70 60 h20 v26 h-20z" fill="#C8643E"/></g>` + TF(-60, -8, .2, magnet19(t, { glint: false }))
  + `<path d="M120 -60 L10 -12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><path d="M20 -26 L6 -10 L26 -2" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`
  + tpill(170, -80, "holds on", 30, MAGC, "#fff", { w: 700 }) + `</g>` + tpill(0, 168, "a fridge door at home", 26, P.ink, "#fff", { w: 600 });
// Momo's note card on her small easel (holdon)
const momoNote = (t) => smallEasel(T(0, -120, "Mum's iron wok", 40, P.momo) + T(0, -40, "The magnet could", 36, P.ink) + T(0, 6, "not lift it.", 36, P.ink) + T(0, 92, "NOT ATTRACTED!", 46, NONC), 480, 420);
// the ring picture of HOLD ON!: the magnet on top of the wok, a hand trying to lift (a strain wobble)
const ringWok = (t) => `<circle cx="430" cy="470" r="180" fill="#FFF8EA"/>` + TF(430, 520, .62, wok19(1, t)) + TF(430 + 2 * Math.sin(t * 30), 458, .42, magnet19(t)) + TF(430, 440, .5, holdHand(1, 0));
// the fun-fact pictures (Momo: pigeons and the Earth's magnetism)
const loft19 = (k = 1) => TF(0, 0, k, `<path d="M-60 0 V-70 L0 -116 L60 -70 V0z" fill="#E9C99A" stroke="#8A5A30" stroke-width="5" stroke-linejoin="round"/><path d="M-74 -64 L0 -126 L74 -64" fill="none" stroke="#B8543A" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M-22 0 V-40 Q0 -60 22 -40 V0z" fill="#5A3A22"/><path d="M-8 -84 q8 -10 16 0 q-8 14 -8 14 q0 0 -8 -14z" fill="#FB7158"/><rect x="-80" y="0" width="160" height="10" fill="#8A5A30"/>`);
const flyPigeon = (t, k = 1) => TF(0, 0, k, `<g transform="rotate(${n2(10 * Math.sin(t * 9))} -10 -60)"><path d="M-10 -60 Q-70 -130 -130 -110 Q-80 -80 -40 -50z" fill="#9096AC" stroke="#4E5266" stroke-width="4"/></g>` + pigeon19(t, { bob: false }) + `<g transform="rotate(${n2(-10 * Math.sin(t * 9))} 10 -60)"><path d="M10 -64 Q-20 -150 -100 -150 Q-50 -100 -16 -50z" fill="#A8AEC2" stroke="#4E5266" stroke-width="4"/><path d="M-60 -136 L-30 -96 M-40 -140 L-16 -100" stroke="#2E3242" stroke-width="5"/></g>`);
const ffFly19 = (t, w, h) => { const u = clamp((t - MK("ff_fly")) / 3); return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#BFE3F6"/><path d="M${-w / 2} 60 Q-60 20 40 70 Q100 100 ${w / 2} 50 V${h / 2} H${-w / 2}z" fill="#A9C97A"/><path d="M${-w / 2 + 20} 120 Q0 80 ${w / 2 - 20} 110" stroke="#E9D9A6" stroke-width="10" fill="none" opacity=".8"/>`
  + TF(-w / 2 + 50, 100, .45, loft19()) + `<path d="M${-w / 2 + 50} 50 Q0 -120 ${w / 2 - 60} -40" stroke="${P.ink}" stroke-width="4" stroke-dasharray="6 10" fill="none" opacity=".5"/>` + TF(lerp(w / 2 - 50, w / 2 - 80, u), lerp(-20, -50, u) + 6 * Math.sin(t * 3), .38, flyPigeon(t), 0) + tpill(-w / 2 + 50, 128, "home", 20, "#fff", P.ink, { w: 700 }); };
const ffSense19 = (t, w, h) => { let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#1E2A5A"/>` + [...Array(10)].map((_, i) => `<circle cx="${n2((hash(i, 3) - .5) * w)}" cy="${n2((hash(i, 5) - .5) * h)}" r="2" fill="#fff" opacity=".8"/>`).join("");
  s += [1, 2, 3].map((i) => `<ellipse cx="0" cy="0" rx="${30 + i * 26}" ry="${70 + i * 18}" fill="none" stroke="#9FD4FF" stroke-width="3" opacity="${n2(.5 + .3 * Math.sin(t * 2 + i))}" transform="rotate(90)"/>`).join("").replace(/rotate\(90\)/g, "") ;
  s += `<circle r="60" fill="#3A8DFF" stroke="#BFE3F6" stroke-width="4"/><path d="M-36 -30 Q-10 -46 10 -26 Q24 -4 6 14 Q-20 30 -38 10z M20 20 Q40 10 46 30 Q30 46 14 36z" fill="#58B56C"/>`
    + [-1, 1].map((sd) => `<path d="M0 ${sd * -60} C${sd * 140} ${sd * -110} ${sd * 140} ${sd * 110} 0 ${sd * 60}" fill="none" stroke="#9FD4FF" stroke-width="3"/><path d="M0 ${sd * -60} C${sd * 90} ${sd * -90} ${sd * 90} ${sd * 90} 0 ${sd * 60}" fill="none" stroke="#9FD4FF" stroke-width="3" opacity=".7"/>`).join("").replace(/C(-?\d+) (-?\d+) (-?\d+) (-?\d+)/g, (m0) => m0)
    + `<path d="M-110 90 Q-40 40 60 80" stroke="#FFC83A" stroke-width="4" stroke-dasharray="6 9" fill="none"/>`;
  return s; };
const ffHome19 = (t, w, h) => { const u = clamp((t - MK("ff_home")) / 1.4); return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#CFE9F6"/><rect x="${-w / 2}" y="60" width="${w}" height="${h}" fill="#A9C97A"/>` + TF(0, 80, 1.15, loft19()) + TF(lerp(120, 20, eo(u)), lerp(-120, -60, eo(u)), .4, u < 1 ? flyPigeon(t) : pigeon19(t, {})) ; };
/* BE A STEEL PIN (Part 1's journey; the camera IS the pin). The table-top world at a pin's size: the copper wire a big orange pipe, the eraser
   a pink hill, the ruler a long road; the magnet a red-and-blue tower that slides closer; the tug, the slide across the gap, the CLICK onto its
   END; the lift; looking down: the wire and the eraser have not moved. Your own shiny pin at the bottom of the frame (first person). */
function pinJourney(t, s) { const m = MK, tT = m("jtable"), tP = m("jpipe"), tF = m("jfar"), tG = m("jtug"), tS = m("jslide"), tC = m("jclick"), tL = m("jlift"), tK = m("jlook");
  const near = ss(tF, tG, t), slide = ss(tS, tC, t) , lift = ss(tL, tK + .6, t), look = ss(tK - .2, tK + 1.2, t), trem = t > tG && t < tS + .2 ? 4 * Math.sin(t * 50) * ss(tG, tG + 1, t) : 0;
  const hor = 360 + 520 * lift - 160 * look, drop = 1 - .55 * lift;   // the horizon falls as you are lifted; looking down brings the table back up
  let o = `<rect width="1920" height="1080" fill="#E9E1D2"/>`;
  // far away above the table: the void deck, big and soft (pillars, the banner, the fan's slow shadow)
  o += `<g opacity="${n2(1 - .6 * look)}" transform="translate(0 ${n2(hor - 360)})"><rect x="0" y="-400" width="1920" height="760" fill="#F2E8D6"/><rect x="180" y="-400" width="220" height="760" fill="#F7EFE0"/><rect x="1500" y="-400" width="240" height="760" fill="#F7EFE0"/><rect x="560" y="-40" width="800" height="300" rx="20" fill="#FFF8EA" opacity=".85"/>${T(960, 110, "INTERACTIONS", 110, "#E8B08A", { ls: 6 })}<ellipse cx="${n2(960 + 300 * Math.sin(t * .8))}" cy="-200" rx="600" ry="40" fill="#C9BCA4" opacity=".35"/></g>`;
  // the table-top, a huge pale stone plain to the horizon (perspective lines run to the vanishing point)
  o += `<path d="M-200 ${n2(hor)} H2120 V1300 H-200z" fill="#E3DACA"/>` + [...Array(13)].map((_, i) => `<path d="M960 ${n2(hor)} L${-1400 + i * 360} 1400" stroke="#CFC5B2" stroke-width="3" opacity=".6"/>`).join("")
    + [...Array(26)].map((_, i) => { const d = hash(i, 3), y = hor + (1240 - hor) * d * d, x = 960 + (hash(i, 5) - .5) * 3200 * d; return `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(4 + 22 * d)}" ry="${n2(2 + 8 * d)}" fill="#CFC5B2"/>`; }).join("");
  // dust motes drifting in the light
  o += [...Array(14)].map((_, i) => `<circle cx="${n2((hash(i, 7) * 1920 + t * 14 * (1 + hash(i, 9))) % 1920)}" cy="${n2(120 + 600 * hash(i, 11) + 20 * Math.sin(t + i))}" r="${n2(3 + 5 * hash(i, 13))}" fill="#fff" opacity=".55"/>`).join("");
  const W0 = (x, y, k, inner) => TF(960 + (x - 960) * drop, hor + (y - 360) * drop, k * drop, inner);   // a thing on the table, placed relative to the horizon
  // the wooden ruler: a long road running away to the horizon (left)
  o += `<path d="M${n2(960 - 300 * drop)} ${n2(hor)} L${n2(960 - 260 * drop)} ${n2(hor)} L${n2(380 - 700 * (1 - drop))} ${n2(hor + 900 * drop)} L${n2(-400)} ${n2(hor + 900 * drop)}z" fill="#E2B477" stroke="#9A6A34" stroke-width="5"/>`
    + [...Array(9)].map((_, i) => { const u = (i + 1) / 10, y = hor + 900 * drop * u * u; return `<path d="M${n2(lerp(960 - 300 * drop, -400, u * u))} ${n2(y)} l${n2(60 * u)} ${n2(-8 * u)}" stroke="#6E4A22" stroke-width="${n2(2 + 6 * u)}"/>`; }).join("");
  // the rubber eraser: a pink hill (lower left), the buddies ride on it
  o += W0(330, 660, 1, `<path d="M-120 0 Q-40 -170 220 -190 Q460 -180 560 0z" fill="#FF8FB1" stroke="#C26A84" stroke-width="6"/><path d="M-20 -80 Q120 -160 300 -150" stroke="#FFC4D4" stroke-width="16" fill="none" stroke-linecap="round"/>`);
  // the copper wire: a big shiny orange pipe curling across the right
  o += W0(1400, 610, 1, `<path d="M-500 120 Q-200 -60 60 40 Q300 140 620 -20" stroke="#8A4A20" stroke-width="118" fill="none" stroke-linecap="round"/><path d="M-500 120 Q-200 -60 60 40 Q300 140 620 -20" stroke="${COPC}" stroke-width="104" fill="none" stroke-linecap="round"/><path d="M-480 92 Q-200 -86 60 12 Q300 110 600 -46" stroke="#F2A86A" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/><path d="M${n2(-300 + 500 * ((t * .12) % 1))} 10 l60 -20" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".7"/>`);
  if (t >= tP) o += lcLab(t, tP + .2, 1500, 400, "copper wire", 1400, 560, { size: 40, t1: tF + 4 }) + lcLab(t, tP + .6, 360, 380, "eraser", 330, 520, { size: 40, t1: tF + 4 }) + lcLab(t, tP + 1.0, 560, 820, "wooden ruler", 380, 900, { size: 40, t1: tF + 4 });
  // the magnet: a giant red-and-blue tower at the far end, sliding closer; you slide to it and click onto its END
  if (t >= tF - .4) { const app = ss(tF - .4, tF + .6, t), z = lerp(.28, .9, eio(near)) * lerp(1, 2.3, eio(slide)), mx = 960, my = lerp(hor - 10, hor + 40, near) + lerp(0, 380, eio(slide)) - 600 * lift + 260 * look;
    o += OP(app, TF(mx, my, z, `<ellipse cx="0" cy="30" rx="330" ry="40" fill="${P.ink}" opacity=".18"/><path d="M-260 -560 L-150 -760 H150 L260 -560z" fill="#3A6ADB" stroke="#1E3E8A" stroke-width="10" stroke-linejoin="round"/><path d="M-200 -670 L-150 -760 H150 L200 -670z" fill="#E0453A" stroke="#9A2A1E" stroke-width="8" stroke-linejoin="round"/>${T(0, -690, "N", 70, "#fff")}<path d="M-260 -560 H260 V0 H-260z" fill="#3A6ADB" stroke="#1E3E8A" stroke-width="10"/><path d="M-230 -530 V-30" stroke="#fff" stroke-width="22" opacity=".25" stroke-linecap="round"/>${T(0, -230, "S", 200, "#fff")}${T(0, -440, "the magnet's end", 44, "#DDE8FF")}<path d="M-260 0 H260" stroke="#1E1E2A" stroke-width="10"/>`));
    if (t >= tG && t < tC) o += `<ellipse cx="960" cy="${n2(my)}" rx="${n2(320 * z)}" ry="${n2(60 * z)}" fill="#FFF3B8" opacity="${n2(.35 * ss(tG, tG + 1, t))}"/>` + pullArrows(t, 960, 980, 960, my + 30, ss(tG, tG + .6, t), MAGC, 4); }
  // speed lines as you slide across the gap; a flash on the CLICK
  if (t > tS && t < tC + .2) o += [...Array(18)].map((_, i) => { const a = i / 18 * Math.PI * 2, r = 300 + 500 * (((t - tS) * 2 + hash(i, 3)) % 1); return `<path d="M${n2(960 + Math.cos(a) * r)} ${n2(560 + Math.sin(a) * r * .6)} l${n2(Math.cos(a) * 120)} ${n2(Math.sin(a) * 72)}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>`; }).join("");
  if (t >= tC && t < tC + .3) o += `<rect width="1920" height="1080" fill="#fff" opacity="${n2(1 - (t - tC) / .3)}"/>`;
  // YOU: your own shiny pin (first person): the round head at the bottom, the shaft running away from you to the point
  { const py = lerp(1010, 640, eio(slide)) - 200 * lift + 120 * look; o += TF(960 + trem, py, 1, `<path d="M-60 120 L-14 -150 L0 -210 L14 -150 L60 120z" fill="#AEB8C6" stroke="#5E6878" stroke-width="7" stroke-linejoin="round"/><path d="M-30 110 L-6 -150" stroke="#EEF2F8" stroke-width="14" stroke-linecap="round"/><ellipse cx="0" cy="150" rx="150" ry="70" fill="#C9D2DE" stroke="#6A7484" stroke-width="7"/><ellipse cx="-40" cy="128" rx="54" ry="18" fill="#fff" opacity=".6"/>`); }
  // looking down from the magnet's end: the wire, the eraser and the ruler lie exactly where they were
  if (t >= tK + .4) o += linkChip(t, tK + .6, 640, 560, 900, 700, 0, "pulled", 44) + linkChip(t, tK + .9, 1500, 420, 1400 , 610 * drop + hor - 360 * drop + 40, 1, "not pulled", 44);
  return o; }
