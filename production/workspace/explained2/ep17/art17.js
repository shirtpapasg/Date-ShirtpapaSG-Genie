// art17.js: EP17's animals, boards and small pictures (Stage 2, drawn 2026-11-23). Loaded after pond16.js / art16.js (EP16's helpers:
// eye16, tile16, xChip16, tickChip16, ideaBubble16) and before sets17.js / lc17.js / p1.js / p2.js.
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   the lime butterfly's egg (tiny, round, pale yellow), its caterpillar (cat17: a big round head end, THREE pairs of small pointed jointed
//   true legs under the front, chubby PROLEGS under the back half: four middle pairs and one tail pair, each with a flat sole of tiny hooks;
//   green with a pale band), its pupa (pupa17: green, smooth, held to the stem by a silk pad at its tail end and a thin silk girdle; NO
//   cocoon; it darkens and the wing colours show through before the butterfly comes out; a cut-away window can open in it), the lime
//   butterfly (bfly17: black with cream-yellow patches, a red-and-blue eyespot near each hind wing's inner corner, no tails, clubbed
//   feelers; crumpled wings that pump flat), the moth (moth17: brown-grey, resting flat, wings like a triangle, FEATHERY feelers, a fuzzy
//   body), a moth caterpillar's silk cocoon, the mosquito's eggs, wriggler (wrig17: hangs head-down, a little tube at its tail end at the
//   surface), pupa (mpupa17: comma-shaped, two little trumpets) and adult (mosq17: small, six thin legs, two narrow wings; never scary,
//   never biting), the dragonfly (dfly17: red, four clear wings held out flat, huge eyes) and its nymph (dnymph17: underwater, six legs,
//   big eyes, no wings).
// THE BOARDS: loop4 (OUR BUTTERFLY'S LIFE CYCLE and the mosquito's: four round tiles, curved arrows all ONE way, the last arrow back to the
//   egg; no numbers, no START, no END), the stage pictures (bPic / mPic), Pip's JUST RESTING! board, Basil's homework sheet.
const XDEFS17 = () => `${lg("e17Cat", [[0, "#B5E06A"], [.6, "#86C64A"], [1, "#5E9E36"]])}${lg("e17Pupa", [[0, "#C9EC8A"], [.55, "#8FCB5A"], [1, "#5E9A3A"]])}
  ${lg("e17PupaD", [[0, "#4A4038"], [1, "#2A221E"]])}${lg("e17Pot", [[0, "#3F8FB8"], [.5, "#2E7AA6"], [1, "#1E5878"]])}${lg("e17PotHi", [[0, "#7FC6E8"], [1, "#3F8FB8"]])}
  ${lg("e17Water", [[0, "#9FD8E4"], [1, "#4E9EB0"]])}${lg("e17WaterUW", [[0, "#BFE7E0"], [.4, "#7CC2B8"], [1, "#3E8A86"]])}${lg("e17Pail", [[0, "#58A8E8"], [1, "#2E6FB8"]])}
  ${lg("e17Dawn", [[0, "#8FA4E8"], [.5, "#F7C39A"], [1, "#FFE9C4"]])}${lg("e17Sky", [[0, "#8AD2FF"], [.75, "#DDF3FF"], [1, "#F3FBF2"]])}${lg("e17Wet", [[0, "#9FD08A"], [1, "#5E9E4E"]])}
  ${lg("e17Corr", [[0, "#F4E9D8"], [1, "#E0CFB6"]])}${lg("e17Tile", [[0, "#D9C8B0"], [1, "#BFA98C"]])}${lg("e17Deck", [[0, "#E8E2D6"], [1, "#CFC6B6"]])}
  ${rg("e17Glow", [[0, "#FFF6C8", .95], [.6, "#FFE08A", .5], [1, "#FFD24A", 0]], .5, .5, .5)}${lg("e17Steel", [[0, "#C9D2DC"], [1, "#8D99A8"]])}`;
const INK17 = "#3A2E52";
const blink17 = (t, ph = 0) => ((t + ph) % 3.9) < .12;

/* ---------------------------------------------------------------- the lime butterfly ---------------------------------------------------------------- */
// its egg: tiny, round, pale yellow (origin = its middle; r 10 at k 1)
const limeEgg = (k = 1, t = 0) => TF(0, 0, k, `<circle r="10" fill="#F6E58A" stroke="#C9A93A" stroke-width="2"/><circle cx="-3" cy="-3" r="3" fill="#fff" opacity=".85"/>`);
// the caterpillar, side view, facing right. Origin = under its middle, ON the twig line (y 0). Length about 440 (x -232..222).
// o.legs [0..1 x3] lights the three pairs of TRUE legs (teal); o.pro [0..1 x5] lights the prolegs (orange); o.walk: a wave of prolegs back
// to front; o.chew: the mouth works; o.hook: the soles' tiny hooks drawn; o.k scale. The true legs and the prolegs are at CATLEG / CATPRO.
const CATSEG = [[150, 40], [116, 43], [80, 44], [44, 42], [8, 41], [-28, 40], [-63, 38], [-98, 36], [-132, 33], [-164, 30], [-193, 27], [-218, 24]];
const CATLEG = [150, 116, 80], CATPRO = [-28, -63, -98, -132, -214];
function cat17(t, o = {}) { const wk = o.walk ? 1 : 0, ch = o.chew === false ? 0 : Math.sin(t * 9), lg = o.legs || [0, 0, 0], pr = o.pro || [0, 0, 0, 0, 0], hump = (x) => wk * 7 * Math.max(0, Math.sin(t * 5 - x * .03));
  const liftAt = (x) => wk * 9 * Math.max(0, Math.sin(t * 5 - x * .03)); let s = "", legs = "";
  // the prolegs: chubby stumps with a flat sole (a ring of tiny hooks)
  CATPRO.forEach((x, i) => { const lf = liftAt(x), hi = pr[i] || 0, c = hi > .05 ? mixC("#8FCB4E", "#F28A3A", hi) : "#7DB845", line = hi > .05 ? mixC("#3E7A2A", "#B4531A", hi) : "#3E7A2A";
    legs += `<g transform="translate(${x} ${n2(-lf)})">${hi > .05 ? `<ellipse cx="0" cy="-8" rx="${n2(24 + 8 * hi)}" ry="${n2(18 + 6 * hi)}" fill="#FFD9B0" opacity="${n2(.7 * hi)}"/>` : ""}<path d="M-13 -24 L-12 -4 Q0 2 12 -4 L13 -24z" fill="${c}" stroke="${line}" stroke-width="3.5" stroke-linejoin="round"/><path d="M-12 -4 Q0 2 12 -4" stroke="${line}" stroke-width="4" fill="none"/>${o.hook ? [-8, -3, 2, 7].map((h) => `<path d="M${h} -2 q2 4 4 1" stroke="#6E4A2A" stroke-width="2" fill="none"/>`).join("") : ""}</g>`; });
  // the true legs: small, pointed and jointed, near the head
  CATLEG.forEach((x, i) => { const hi = lg[i] || 0, c = hi > .05 ? mixC("#3E5A2A", LEGC, hi) : "#3E5A2A", sw = Math.sin(t * 6 + i) * 2 * (wk ? 1 : .3);
    legs += (hi > .05 ? `<circle cx="${x + 4}" cy="-6" r="${n2(22 + 6 * hi)}" fill="#BFF5EE" opacity="${n2(.7 * hi)}"/>` : "") + `<path d="M${x - 6} -20 L${x - 2 + sw} -8 L${x + 6 + sw} 2" stroke="${c}" stroke-width="${hi > .05 ? 7 : 6}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M${x + 8} -22 L${x + 11 + sw} -10 L${x + 18 + sw} -1" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".75"/>`; });
  s += legs;
  // the body, back to front: green segments with a soft belly; the pale band (saddle) across the middle
  for (let i = CATSEG.length - 1; i >= 0; i--) { const [x, r] = CATSEG[i], y = -r - 14 - hump(x) + (i === CATSEG.length - 1 ? 6 : 0);
    s += `<ellipse cx="${x}" cy="${n2(y)}" rx="${n2(r * .78)}" ry="${r}" fill="url(#e17Cat)" stroke="#3E7A2A" stroke-width="3.5"/><path d="M${n2(x - r * .5)} ${n2(y + r * .62)} Q${x} ${n2(y + r * .95)} ${n2(x + r * .5)} ${n2(y + r * .62)}" stroke="#D9EFA8" stroke-width="5" fill="none" opacity=".8"/>`;
    if (i >= 6 && i % 2 === 0) s += `<circle cx="${x}" cy="${n2(y - r * .35)}" r="3.5" fill="#F4F1DA" opacity=".8"/>`; }
  { const y1 = -88 - hump(20), y2 = -20 - hump(-40); s += `<path d="M20 ${n2(y1)} Q44 ${n2(y1 + 4)} 40 ${n2(y1 + 20)} Q20 ${n2((y1 + y2) / 2)} -20 ${n2(y2 - 4)} Q-44 ${n2(y2)} -40 ${n2(y2 - 18)} Q-10 ${n2((y1 + y2) / 2 - 16)} 20 ${n2(y1)}z" fill="#F4F1DA" stroke="#B8C98A" stroke-width="2.5" opacity=".95"/>`; }
  // two soft false-eye spots on the swollen front (as the real one), and the head with its cute face
  s += `<ellipse cx="96" cy="${n2(-78 - hump(96))}" rx="9" ry="6" fill="#2B2147" opacity=".55"/><ellipse cx="96" cy="${n2(-80 - hump(96))}" rx="4" ry="3" fill="#fff" opacity=".7"/>`;
  { const hx = 194 + 2 * ch * (o.chew === false ? 0 : 1), hy = -40 - hump(194), b = blink17(t, 1.3);
    s += `<g transform="translate(${n2(hx)} ${n2(hy)})"><ellipse rx="34" ry="32" fill="#A9D96A" stroke="#3E7A2A" stroke-width="3.5"/><ellipse cx="-4" cy="-14" rx="16" ry="8" fill="#C9EC8A" opacity=".8"/>`
      + (b ? `<path d="M2 -4 q8 5 16 0" stroke="${INK17}" stroke-width="4" fill="none" stroke-linecap="round"/>` : eye16(12, -4, 10)) + `<ellipse cx="18" cy="10" rx="6" ry="4" fill="#FF9F8A" opacity=".6"/>`
      + `<path d="M16 16 q6 ${n2(3 + 3 * Math.abs(ch))} 12 -1" stroke="#3E7A2A" stroke-width="3" fill="none" stroke-linecap="round"/></g>`; }
  return o.k ? TF(0, 0, o.k, s) : s; }
// the caterpillar curled from above-right, small (for tiles): a simple side view, a little shorter
const catTile = (t) => TF(0, 30, .42, cat17(t, { chew: true }));

// the pupa (chrysalis), held to a stem: origin = the silk pad at its tail end (on the stem). It leans out from a vertical stem (the stem
// is drawn here, from y 70 up to y -380). Length about 300 up the stem. o.dark (0..1): it darkens, the black and cream-yellow wing colours
// show through; o.win (0..1): a cut-away window opens on its side (cream frame) with a soft glow inside; o.form (0..1): the folded wings,
// feelers and legs take shape inside the window (o.lit {wings, feelers, legs} lights each); o.split (0..1): the case splits at the top;
// o.empty: an empty, pale, see-through case; o.stem false: no stem.
const PUPA_ROT = 16;
function pupa17(t, o = {}) { const dk = o.dark || 0, wn = o.win || 0, fm = o.form || 0, sp = o.split || 0, em = !!o.empty, br = 1 + .006 * Math.sin(t * 1.6);
  let s = o.stem === false ? "" : `<path d="M-14 80 Q-10 -150 -20 -400" stroke="#7A5A34" stroke-width="16" fill="none" stroke-linecap="round"/><g transform="translate(-18 -300) rotate(-130)">${leaf15(90, 34, "#58B56C", "#2F7A45")}</g>`;
  const fill = em ? "#EFEAD2" : dk > .02 ? mixC("#8FCB5A", "#3A322C", dk) : "url(#e17Pupa)", line = em ? "#BFB58E" : mixC("#4E8A2E", "#1E1814", dk);
  // the case: a swallowtail's angular pupa (two little points at the head end, a hump over the wings, tapering to the tail)
  const body = `M0 0 Q-24 -40 -34 -110 Q-44 -170 -30 -210 Q-16 -250 -26 -290 L-10 -278 L4 -300 L14 -276 Q34 -240 40 -190 Q60 -150 46 -100 Q30 -40 0 0z`;
  let g = `<path d="${body}" fill="${fill}" stroke="${line}" stroke-width="5" stroke-linejoin="round" ${em ? 'fill-opacity=".75"' : ""}/>`
    + `<path d="M-30 -210 Q8 -200 40 -190" stroke="${em ? "#D9D1AE" : mixC("#E8F6B0", "#8A7A5A", dk)}" stroke-width="4" fill="none" opacity=".9"/><path d="M-26 -120 Q6 -100 40 -150" stroke="${em ? "#D9D1AE" : mixC("#E8F6B0", "#8A7A5A", dk)}" stroke-width="3" fill="none" opacity=".7"/>`
    + `<path d="M-6 -30 Q-14 -70 -18 -110" stroke="${line}" stroke-width="2.5" fill="none" opacity=".45"/><path d="M8 -26 Q16 -70 22 -100" stroke="${line}" stroke-width="2.5" fill="none" opacity=".45"/>`;
  // the wing colours show through the darkening shell: cream-yellow patches on black over the wing pad
  if (dk > .3 && !em) g += OP((dk - .3) / .7, `<path d="M-28 -190 Q10 -186 40 -170 Q48 -130 30 -100 Q0 -120 -26 -130z" fill="#1A1614" opacity=".7"/>${[[-14, -168], [6, -160], [24, -150], [-6, -140], [18, -128]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="#F2DC7A" opacity=".85"/>`).join("")}<circle cx="26" cy="-112" r="5" fill="#E8503A" opacity=".8"/>`);
  // the cut-away window (like EP1's robot window): a cream frame, inside a soft glow and the picture model
  if (wn > .02 && !em) { const r = 62 * eo(wn); g += `<clipPath id="pw${o.id || ""}"><ellipse cx="4" cy="-150" rx="${n2(r * .62)}" ry="${n2(r * 1.3)}"/></clipPath><g clip-path="url(#pw${o.id || ""})"><rect x="-60" y="-260" width="120" height="220" fill="#FFF3D6"/><ellipse cx="4" cy="-150" rx="50" ry="90" fill="url(#e17Glow)" opacity="${n2(.6 + .3 * Math.sin(t * 3))}"/>`
      + (fm > .02 ? OP(fm, insideModel(t, o.lit || {})) : "") + `</g><ellipse cx="4" cy="-150" rx="${n2(r * .62)}" ry="${n2(r * 1.3)}" fill="none" stroke="#FFF8EA" stroke-width="7"/><ellipse cx="4" cy="-150" rx="${n2(r * .62 + 5)}" ry="${n2(r * 1.3 + 5)}" fill="none" stroke="${INK17}" stroke-width="2.5" opacity=".5"/>`; }
  // the split at the top (the head end)
  if (sp > .02 || em) { const a = em ? 1 : sp; g += `<path d="M-26 -290 L-10 ${n2(-278 + 20 * a)} L4 -300" fill="none" stroke="${INK17}" stroke-width="3"/><path d="M-12 -280 L-${n2(4 + 30 * a)} -${n2(250 - 10 * a)} M-2 -282 L${n2(10 + 26 * a)} -${n2(252 - 10 * a)}" stroke="${em ? "#BFB58E" : line}" stroke-width="5" stroke-linecap="round"/>`; }
  s += `<g transform="translate(-6 0) rotate(${PUPA_ROT}) scale(${n2(br)})">${g}</g>`;
  // the silk pad at the tail end and the thin silk girdle round its middle, both fixed to the stem
  s += `<ellipse cx="-10" cy="4" rx="12" ry="8" fill="#FFFDF2" stroke="#D9D1B8" stroke-width="2"/><path d="M-16 -128 Q20 -150 58 -122 Q30 -108 -16 -116" stroke="#FFFDF2" stroke-width="2.5" fill="none" opacity=".95"/>`;
  return o.k ? TF(0, 0, o.k, s) : s; }
// inside the pupa's window: a simple picture model (folded wings, long feelers, thin legs take shape). origin = the pupa's own frame
function insideModel(t, lit = {}) { const w = lit.wings || 0, f = lit.feelers || 0, l = lit.legs || 0, cw = mixC("#E9C86A", "#A86BEA", w), cf = mixC("#C99A4A", "#E36A12", f), cl = mixC("#B98A4A", LEGC, l);
  return `<path d="M-10 -210 Q-34 -160 -20 -110 Q0 -120 10 -150 Q8 -190 -10 -210z" fill="${cw}" opacity=".85" stroke="#8A6A2A" stroke-width="2"/><path d="M16 -206 Q40 -160 30 -112 Q12 -124 6 -150 Q6 -190 16 -206z" fill="${cw}" opacity=".85" stroke="#8A6A2A" stroke-width="2"/>`
    + `<path d="M-2 -230 Q-20 -200 -16 -150 M8 -230 Q26 -200 22 -150" stroke="${cf}" stroke-width="${n2(3 + 2 * f)}" fill="none" stroke-linecap="round"/>`
    + `<path d="M0 -150 l-12 30 M4 -146 l-2 34 M8 -150 l12 30" stroke="${cl}" stroke-width="${n2(3 + 2 * l)}" fill="none" stroke-linecap="round"/>`; }

// the lime butterfly, from above. Origin = its middle. Wingspan about 420. o.flap (0 open .. 1 shut, the wings fold up), o.crump (0..1:
// small, crumpled, drooping wings: just out of the case), o.k scale
function bfly17(t, o = {}) { const fl = o.flap || 0, cr = o.crump || 0, ws = 1 - .55 * cr, sx = Math.max(.08, Math.cos(fl * Math.PI / 2)), dr = 20 * cr;
  const wavy = (d) => cr > .05 ? `stroke-dasharray="${n2(10 - 6 * cr)} 3"` : "";
  const side = (sg) => { const fore = `M6 -8 Q60 -150 196 -128 Q212 -96 176 -50 Q120 -20 6 -8z`, hind = `M6 4 Q120 4 150 46 Q160 104 104 126 Q50 132 14 70z`;
    let w = `<g transform="rotate(${n2(sg * dr)}) scale(${n2(sg * sx * ws)} ${n2(ws)})"><path d="${hind}" fill="#1E1A1C" stroke="#0E0C0E" stroke-width="4" ${wavy()}/><path d="${fore}" fill="#1E1A1C" stroke="#0E0C0E" stroke-width="4" ${wavy()}/>`
      + [[70, -60, 18, 12], [104, -84, 14, 10], [136, -100, 12, 9], [160, -112, 9, 7], [44, -36, 14, 10], [88, -40, 12, 9], [128, -66, 10, 8], [176, -82, 8, 6], [60, 30, 22, 14], [98, 50, 16, 12], [124, 82, 12, 9], [40, 56, 14, 11]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#F4DE86"/>`).join("")
      + `<circle cx="38" cy="100" r="15" fill="#3A6FD8"/><circle cx="38" cy="100" r="10" fill="#E8432E"/><circle cx="34" cy="96" r="3" fill="#FFE3D8"/>`
      + [120, 150, 176].map((x, i) => `<circle cx="${x}" cy="${-116 + i * 6 - 4}" r="3.5" fill="#F4DE86" opacity=".8"/>`).join("") + `</g>`; return w; };
  let s = side(-1) + side(1);
  s += `<ellipse cx="0" cy="34" rx="10" ry="54" fill="#2A2426" stroke="#0E0C0E" stroke-width="3"/>${[0, 1, 2, 3].map((i) => `<path d="M-9 ${18 + i * 16} h18" stroke="#F4DE86" stroke-width="3" opacity=".7"/>`).join("")}<ellipse cx="0" cy="-12" rx="14" ry="20" fill="#3A3236"/>`
    + `<circle cx="0" cy="-38" r="16" fill="#3A3236" stroke="#0E0C0E" stroke-width="3"/>${eye16(-7, -40, 6, { white: "#fff" })}${eye16(7, -40, 6, { white: "#fff" })}`
    + `<path d="M-4 -52 Q-20 -96 -30 -116 M4 -52 Q20 -96 30 -116" stroke="#2A2426" stroke-width="3.5" fill="none"/><circle cx="-31" cy="-118" r="6" fill="#2A2426"/><circle cx="31" cy="-118" r="6" fill="#2A2426"/>`;
  return o.k ? TF(0, 0, o.k, s) : s; }
// the butterfly side-on, wings up (resting on a leaf edge or the empty case): origin = its feet
const bflySide = (t, o = {}) => { const fl = .5 + .5 * Math.sin(t * (o.slow ? 2 : 6)), cr = o.crump || 0, ws = 1 - .5 * cr;
  return `<g transform="scale(${n2(ws)} ${n2(ws * (.75 + .25 * fl))})"><path d="M0 -40 Q-40 -200 60 -230 Q120 -180 80 -100 Q50 -60 0 -40z" fill="#1E1A1C" stroke="#0E0C0E" stroke-width="4" ${cr > .05 ? 'stroke-dasharray="6 3"' : ""}/>${[[30, -190], [56, -170], [70, -140], [20, -150], [44, -120]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="#F4DE86"/>`).join("")}<path d="M0 -40 Q60 -60 90 -10 Q60 10 10 -20z" fill="#1E1A1C" stroke="#0E0C0E" stroke-width="4"/><circle cx="20" cy="-22" r="9" fill="#3A6FD8"/><circle cx="20" cy="-22" r="5" fill="#E8432E"/></g>`
    + `<ellipse cx="0" cy="-26" rx="8" ry="30" fill="#2A2426" transform="rotate(-20)"/><circle cx="-14" cy="-56" r="11" fill="#3A3236"/>${eye16(-18, -58, 5)}<path d="M-18 -64 Q-40 -100 -46 -110" stroke="#2A2426" stroke-width="3" fill="none"/><circle cx="-47" cy="-112" r="4" fill="#2A2426"/><path d="M-6 -10 l-10 12 M2 -8 l2 14 M8 -12 l12 10" stroke="#2A2426" stroke-width="3" stroke-linecap="round"/>`; };

/* ---------------------------------------------------------------- the moth (Part 1's hidden animal) ---------------------------------------------------------------- */
// resting flat, from above: brown-grey wings like a little triangle, FEATHERY feelers, a fuzzy body, big round eyes. Origin = its middle;
// about 150 wide at k 1. o.open: the wings open a little (once); o.tw: the feelers twitch
function moth17(t, o = {}) { const op = o.open || 0, tw = 6 * Math.sin(t * 5) * (o.tw === undefined ? 1 : o.tw), b = blink17(t, 2.2);
  const wing = (sg) => `<g transform="scale(${sg} 1) rotate(${n2(-14 * op)})"><path d="M2 -16 Q40 -6 78 52 Q40 64 4 40z" fill="#A08C78" stroke="#6E5C4A" stroke-width="3.5"/><path d="M14 4 Q40 18 58 44" stroke="#6E5C4A" stroke-width="3" fill="none" stroke-dasharray="5 4"/><path d="M10 -6 Q30 10 34 30" stroke="#C8B6A0" stroke-width="3" fill="none"/><circle cx="36" cy="22" r="4" fill="#5A4A3A"/></g>`;
  const feeler = (sg) => { let f = `<path d="M${sg * 6} -26 Q${sg * 22} ${-52 + tw * .3} ${sg * (34 + tw)} -66" stroke="#6E5C4A" stroke-width="3" fill="none"/>`; for (let i = 1; i < 7; i++) { const u = i / 7, x = sg * (6 + (28 + tw) * u), y = -26 - 40 * u; f += `<path d="M${n2(x)} ${n2(y)} l${sg * 7} -3 M${n2(x)} ${n2(y)} l${-sg * 3} -7" stroke="#8A7660" stroke-width="2.2"/>`; } return f; };
  return feeler(-1) + feeler(1) + wing(-1) + wing(1) + `<ellipse cx="0" cy="14" rx="9" ry="26" fill="#B8A48E" stroke="#6E5C4A" stroke-width="3"/>${[0, 1, 2].map((i) => `<path d="M-8 ${8 + i * 10} h16" stroke="#8A7660" stroke-width="2"/>`).join("")}`
    + `<circle cx="0" cy="-16" r="15" fill="#C9B8A2" stroke="#6E5C4A" stroke-width="3"/>${[...Array(8)].map((_, i) => `<circle cx="${n2(12 * Math.cos(i * .8))}" cy="${n2(-16 + 12 * Math.sin(i * .8))}" r="4" fill="#D9CAB6"/>`).join("")}`
    + (b ? `<path d="M-11 -18 q5 3 9 0 M2 -18 q5 3 9 0" stroke="${INK17}" stroke-width="2.5" fill="none"/>` : eye16(-6, -18, 6) + eye16(6, -18, 6)) + `<path d="M-3 -6 q3 2 6 0" stroke="${INK17}" stroke-width="2" fill="none"/>`; }
const mothAt = (t, x, y, k = .42, o = {}) => TF(x, y, k, moth17(t, o), o.rot || 0);
// a moth caterpillar's soft white silk cocoon on a twig (o.cut: a cut-away showing the pupa inside). origin = its middle
const cocoon17 = (t, o = {}) => { const c = o.cut || 0; let s = `<path d="M-140 -70 Q0 -96 150 -76" stroke="#7A5A34" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M-40 -84 L-30 -50 M40 -86 L30 -50" stroke="#F4F1E8" stroke-width="4"/>`
    + `<ellipse cx="0" cy="10" rx="96" ry="58" fill="#FBF8EE" stroke="#D9D1B8" stroke-width="4"/>${[...Array(9)].map((_, i) => `<path d="M${-80 + i * 20} ${-30 + 8 * Math.sin(i)} Q${-70 + i * 20} 10 ${-80 + i * 20} ${50 - 6 * Math.cos(i)}" stroke="#E6DFCC" stroke-width="3" fill="none"/>`).join("")}`;
  if (c > .02) s += OP(c, `<clipPath id="cc17${o.id || ""}"><ellipse cx="0" cy="10" rx="58" ry="34"/></clipPath><ellipse cx="0" cy="10" rx="58" ry="34" fill="#FFF3D6" stroke="#C9B888" stroke-width="3"/><g clip-path="url(#cc17${o.id || ""})"><path d="M-46 10 Q-40 -16 0 -18 Q44 -16 48 10 Q40 34 0 32 Q-40 32 -46 10z" fill="#B07A3A" stroke="#7A4A1E" stroke-width="3"/>${[-24, -8, 8, 24].map((x) => `<path d="M${x} -14 Q${x + 3} 10 ${x} 30" stroke="#7A4A1E" stroke-width="2" fill="none"/>`).join("")}</g>`);
  return s; };

/* ---------------------------------------------------------------- the mosquito ---------------------------------------------------------------- */
// a wriggler, hanging head-down from the surface. Origin = the tip of its little tube (the breathing tube) AT the surface (y 0); it hangs
// down and a little to one side. Length about 230. o.wig (0..1) an S-shaped wriggle; o.tube (0..1) lights the tube; o.k
function wrig17(t, o = {}) { const wg = o.wig || 0, ph = o.ph || 0, lean = o.lean === undefined ? 22 : o.lean, tl = o.tube || 0; let s = "";
  const pts = []; for (let i = 0; i <= 9; i++) { const u = i / 9, y = 30 + u * 150, x = wg * 26 * Math.sin(u * 5 + t * 14 + ph) + .6 * Math.sin(t * 2 + ph + u) * 4; pts.push([x, y]); }
  // the tube (siphon): short, at the tail end, touching the surface
  s += `<path d="M0 0 L${n2(pts[0][0] * .5 - 4)} 30" stroke="${tl > .05 ? mixC("#4A4458", "#E36A12", tl) : "#4A4458"}" stroke-width="${n2(8 + 3 * tl)}" stroke-linecap="round"/>` + (tl > .05 ? `<circle cx="-2" cy="14" r="${n2(18 + 6 * tl)}" fill="#FFD9B0" opacity="${n2(.5 * tl)}"/>` : "");
  // little tail brushes; then the segments (thin), bristles on each side
  s += `<path d="M${n2(pts[0][0] + 4)} 30 l14 -10 M${n2(pts[0][0] + 4)} 32 l16 -2" stroke="#6E6880" stroke-width="2"/>`;
  for (let i = 0; i < 9; i++) { const [x, y] = pts[i], [x2, y2] = pts[i + 1]; s += `<path d="M${n2(x)} ${n2(y)} L${n2(x2)} ${n2(y2)}" stroke="#5A5468" stroke-width="${n2(10 + i * .6)}" stroke-linecap="round"/><path d="M${n2(x)} ${n2(y + 8)} l-12 -4 M${n2(x)} ${n2(y + 8)} l12 -4" stroke="#8A84A0" stroke-width="1.6"/>`; }
  // the thorax (wider) and the head with friendly eyes and mouth brushes
  const [hx, hy] = pts[9]; s += `<ellipse cx="${n2(hx)}" cy="${n2(hy + 22)}" rx="18" ry="22" fill="#5A5468" stroke="#3A3448" stroke-width="2.5"/><path d="M${n2(hx - 16)} ${n2(hy + 14)} l-12 -6 M${n2(hx + 16)} ${n2(hy + 14)} l12 -6" stroke="#8A84A0" stroke-width="1.6"/>`
    + `<ellipse cx="${n2(hx)}" cy="${n2(hy + 52)}" rx="13" ry="12" fill="#4A4458" stroke="#3A3448" stroke-width="2.5"/>${eye16(n2(hx - 5), n2(hy + 54), 4.5)}${eye16(n2(hx + 6), n2(hy + 54), 4.5)}<path d="M${n2(hx - 6)} ${n2(hy + 63)} l-6 8 M${n2(hx + 6)} ${n2(hy + 63)} l6 8" stroke="#8A84A0" stroke-width="2"/>`;
  return TF(0, 0, o.k || 1, s, lean); }
// the mosquito's pupa: comma-shaped (a big round front with two little trumpets on top that touch the surface, a curled tail with two small
// paddles). Origin = the trumpets' tips at the surface. o.roll: a tumble angle
const mpupa17 = (t, o = {}) => TF(0, 0, o.k || 1, `<path d="M-10 0 L-8 18 M10 0 L8 18" stroke="#5A5468" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="48" r="36" fill="#5E5870" stroke="#3A3448" stroke-width="3"/><path d="M30 60 Q46 100 20 128 Q-6 146 -16 120" stroke="#5E5870" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-16 120 l-18 6 M-16 120 l-8 16" stroke="#7A7490" stroke-width="5" stroke-linecap="round"/>${eye16(-12, 50, 6)}<path d="M-20 32 Q0 22 20 32" stroke="#8A84A0" stroke-width="3" fill="none"/>`, o.roll || 0);
// the adult mosquito, side-on: small, simple, never scary (no biting): slender body, pale bands, two narrow clear wings, six long thin legs,
// a short mouth tube folded down, a round head with one big friendly eye. Origin = its feet line. o.wing (0..1 the wings buzz), o.k
function mosq17(t, o = {}) { const wb = (o.wing || 0) * Math.sin(t * 80), lf = o.lift || 0;
  return TF(0, -lf, o.k || 1, `<path d="M-10 -34 L-40 0 M-2 -34 L-14 0 M6 -34 L22 0 M10 -34 L54 2 M-14 -34 L-62 -6 M14 -34 L70 -8" stroke="#4A4458" stroke-width="3" stroke-linecap="round" fill="none"/>`
    + `<g transform="translate(0 -44) rotate(${n2(-22 + 14 * wb)})"><ellipse cx="-50" cy="-8" rx="52" ry="12" fill="#E6F4FF" fill-opacity=".75" stroke="#9AB8D0" stroke-width="2.5"/></g><g transform="translate(4 -44) rotate(${n2(-12 + 14 * wb)})"><ellipse cx="-46" cy="-6" rx="48" ry="11" fill="#E6F4FF" fill-opacity=".6" stroke="#9AB8D0" stroke-width="2"/></g>`
    + `<path d="M-10 -40 Q-60 -36 -96 -22" stroke="#4A4458" stroke-width="11" stroke-linecap="round" fill="none"/>${[-36, -56, -76].map((x) => `<path d="M${x} -42 v12" stroke="#E8E4F0" stroke-width="3"/>`).join("")}<ellipse cx="4" cy="-42" rx="16" ry="12" fill="#4A4458"/>`
    + `<circle cx="24" cy="-44" r="11" fill="#5A5468"/>${eye16(27, -46, 6)}<path d="M32 -38 Q42 -30 44 -20" stroke="#4A4458" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 -54 q8 -12 18 -14 M26 -54 q4 -14 12 -18" stroke="#4A4458" stroke-width="2" fill="none"/>`); }
// mosquito eggs on still water: tiny, dark, long-oval, floating (origin = the middle of the little group)
const mEggs17 = (k = 1, n = 7) => TF(0, 0, k, [...Array(n)].map((_, i) => `<ellipse cx="${n2((i % 4) * 14 - 22 + 6 * hash(i, 3))}" cy="${n2(Math.floor(i / 4) * 12 - 4)}" rx="7" ry="3.5" fill="#3A3448" transform="rotate(${n2(-30 + 60 * hash(i, 5))} ${n2((i % 4) * 14 - 22)} ${n2(Math.floor(i / 4) * 12 - 4)})"/>`).join(""));

/* ---------------------------------------------------------------- the dragonfly (Part 2's hidden animal) and its nymph ---------------------------------------------------------------- */
// from above: a long red body, four clear wings held out flat (they shimmer), a round head with HUGE eyes. Origin = its middle; about 200
// across at k 1. o.turn tilts the head
function dfly17(t, o = {}) { const sh = .55 + .25 * Math.sin(t * 9), tn = (o.turn || 0) * 14, b = blink17(t, .8), fl = o.flap ? Math.abs(Math.sin(t * 40)) : 0;
  const wing = (sg, fy, L) => `<g transform="translate(0 ${fy}) scale(${sg} ${n2(1 - .6 * fl)})"><path d="M4 -4 Q${L * .6} -24 ${L} -8 Q${L * .9} 10 4 6z" fill="#E8F6FF" fill-opacity="${n2(sh)}" stroke="#8AB4D0" stroke-width="2.5"/><path d="M8 0 L${L * .95} -6" stroke="#9AC0DA" stroke-width="1.5"/><ellipse cx="${L * .82}" cy="-10" rx="5" ry="3" fill="#8A3A2A" opacity=".6"/></g>`;
  return wing(-1, -10, 104) + wing(1, -10, 104) + wing(-1, 6, 92) + wing(1, 6, 92)
    + `<path d="M0 10 L0 130" stroke="#D8402E" stroke-width="10" stroke-linecap="round"/>${[30, 50, 70, 90, 110].map((y) => `<path d="M-5 ${y} h10" stroke="#9A2A1E" stroke-width="2.5"/>`).join("")}<ellipse cx="0" cy="0" rx="13" ry="18" fill="#E2523A" stroke="#9A2A1E" stroke-width="3"/>`
    + `<g transform="translate(0 -24) rotate(${n2(tn)})"><circle r="15" fill="#E2523A" stroke="#9A2A1E" stroke-width="3"/><circle cx="-10" cy="-6" r="11" fill="#7A2218"/><circle cx="10" cy="-6" r="11" fill="#7A2218"/>`
    + (b ? `<path d="M-16 -6 q6 4 12 0 M4 -6 q6 4 12 0" stroke="#fff" stroke-width="2.5" fill="none"/>` : `<circle cx="-12" cy="-9" r="3.5" fill="#fff"/><circle cx="8" cy="-9" r="3.5" fill="#fff"/>`) + `<path d="M-4 6 q4 3 8 0" stroke="#7A2218" stroke-width="2" fill="none"/></g>`; }
const dflyAt = (t, x, y, k = .4, o = {}) => TF(x, y, k, dfly17(t, o), o.rot || 0);
// a dragonfly nymph underwater, side-on, facing right: a stout brown-green body, six legs, big eyes, NO wings. o.gulp (0..1): its long
// folding lower lip shoots out (a quick cartoon gulp). Origin = its belly middle
function dnymph17(t, o = {}) { const g = o.gulp || 0, sw = 3 * Math.sin(t * 2.4), b = blink17(t, 1.7);
  return `<path d="M-40 6 L-70 34 M-10 8 L-24 40 M20 8 L30 40" stroke="#5A6A3A" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M-30 6 L-50 36 M0 8 L4 40 M30 6 L50 34" stroke="#4A5A2E" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8"/>`
    + `<path d="M-150 ${n2(-4 + sw)} Q-150 -36 -60 -34 Q20 -38 40 -20 Q46 0 30 10 Q-40 18 -150 ${n2(-4 + sw)}z" fill="#8A8E4A" stroke="#4E5228" stroke-width="4"/>${[-120, -96, -72, -48].map((x) => `<path d="M${x} -30 Q${x + 4} -10 ${x} 10" stroke="#5E622E" stroke-width="2.5" fill="none"/>`).join("")}`
    + `<ellipse cx="56" cy="-20" rx="30" ry="24" fill="#9A9E52" stroke="#4E5228" stroke-width="4"/><circle cx="66" cy="-38" r="16" fill="#5E6A2E" stroke="#3E4A1E" stroke-width="3"/>` + (b ? `<path d="M58 -38 q8 5 16 0" stroke="#fff" stroke-width="3" fill="none"/>` : `<circle cx="66" cy="-40" r="9" fill="#fff"/><circle cx="68" cy="-40" r="5" fill="${INK17}"/><circle cx="66" cy="-42" r="2" fill="#fff"/>`)
    + `<path d="M76 -10 Q${n2(90 + 60 * g)} ${n2(-4 + 6 * g)} ${n2(84 + 80 * g)} ${n2(-14 + 4 * g)}" stroke="#7A7E3E" stroke-width="7" fill="none" stroke-linecap="round"/>` + (g > .1 ? `<path d="M${n2(82 + 80 * g)} ${n2(-24 + 4 * g)} l10 10 l-10 10" stroke="#7A7E3E" stroke-width="5" fill="none"/>` : "")
    + `<path d="M64 -2 q8 5 14 0" stroke="#3E4A1E" stroke-width="2.5" fill="none"/>`; }

/* ---------------------------------------------------------------- the boards ---------------------------------------------------------------- */
// the four stage pictures, each drawn in -110..110 (a tile). kind "b" the lime butterfly, "m" the mosquito
const bPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/><g transform="translate(-60 40) rotate(-24)">${leaf15(190, 64, "#6CC36E", "#2F8048")}</g>` + TF(50, -6, 2.4, limeEgg(1, t))
  : i === 1 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/><path d="M-110 54 Q0 40 110 60 V110 H-110z" fill="#7A5A34"/>` + TF(0, 56, .45, cat17(t, {}))
  : i === 2 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/>` + TF(10, 84, .56, pupa17(t, {}))
  : `<rect x="-110" y="-110" width="220" height="220" fill="#DCEFFB"/>` + TF(0, 0, .5, bfly17(t, { flap: .25 + .25 * Math.sin(t * 3) }));
const mPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#BFE7E0"/><rect x="-110" y="-110" width="220" height="90" fill="#DDF3FF"/><path d="M-110 -20 H110" stroke="#fff" stroke-width="6"/>` + TF(0, -24, 2.2, mEggs17(1, 6))
  : i === 1 ? `<rect x="-110" y="-110" width="220" height="220" fill="#BFE7E0"/><rect x="-110" y="-110" width="220" height="30" fill="#DDF3FF"/><path d="M-110 -80 H110" stroke="#fff" stroke-width="6"/>` + TF(-6, -80, .82, wrig17(t, { lean: 18, wig: .1 }))
  : i === 2 ? `<rect x="-110" y="-110" width="220" height="220" fill="#BFE7E0"/><rect x="-110" y="-110" width="220" height="40" fill="#DDF3FF"/><path d="M-110 -70 H110" stroke="#fff" stroke-width="6"/>` + TF(0, -70, 1.05, mpupa17(t, { roll: 6 * Math.sin(t * 1.5) }))
  : `<rect x="-110" y="-110" width="220" height="220" fill="#DCEFFB"/><path d="M-110 70 H110 V110 H-110z" fill="#BFE7E0"/>` + TF(10, 60, 1.25, mosq17(t, { wing: .3 }));
const BN = ["the egg", "the larva", "the pupa", "the adult"];
const LOOP4 = [[0, -640], [250, -430], [0, -220], [-250, -430]];
// a loop board on a low stand (origin = the stand's feet on the ground; about 900 high at k 1). o.tiles [t x4] when each tile lands, o.back
// when the last arrow lights (then the arrows run round), o.flash [x4], o.pics, o.title, o.labels false, o.drop: a water drop by the egg
// tile (the mosquito: needs still water), o.dim [x4] (0..1: a tile goes dim with its "no ..." tag), o.id
function loop4(t, o = {}) { const tl = o.tiles || [-9, -9, -9, -9], fl = o.flash || [0, 0, 0, 0], tb = o.back === undefined ? -9 : o.back, run = t >= tb + .6 ? (t - tb) : 0, pic = o.pics || bPic, nm = o.names || BN, dm = o.dim || [0, 0, 0, 0];
  let s = o.stand === false ? "" : `<ellipse cx="0" cy="6" rx="320" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-230 0 L-190 -110 M230 0 L190 -110" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/>`;
  s += `<g filter="url(#drop)"><rect x="-430" y="-850" width="860" height="760" rx="32" fill="url(#gPaper)" stroke="#C9A974" stroke-width="8"/></g>` + T(0, -790, o.title || "OUR BUTTERFLY'S LIFE CYCLE", o.title && o.title.length > 26 ? 36 : 40, P.ink, { ls: 2 });
  const arc = (a, b, lit) => { const [x1, y1] = LOOP4[a], [x2, y2] = LOOP4[b], mx = (x1 + x2) / 2, my = (y1 + y2) / 2, cx = mx * 1.55, cy = -430 + (my + 430) * 1.55;
    const sx = x1 + (cx - x1) * .52, sy = y1 + (cy - y1) * .52, ex = x2 + (cx - x2) * .52, ey = y2 + (cy - y2) * .52, ang = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI, col = lit ? P.leaf : "#C9B48F";
    return `<path d="M${n2(sx)} ${n2(sy)} Q${n2(cx)} ${n2(cy)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="${col}" stroke-width="15" stroke-linecap="round" ${run ? `stroke-dasharray="28 16" stroke-dashoffset="${n2(-run * 60)}"` : ""}/><g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(ang)})"><path d="M-6 -21 L25 0 L-6 21z" fill="${col}"/></g>`; };
  s += arc(0, 1, t >= tl[1]) + arc(1, 2, t >= tl[2]) + arc(2, 3, t >= tl[3]) + arc(3, 0, t >= tb);
  if (t >= tb && t < tb + 1) s += OP(1 - (t - tb), `<circle cx="-180" cy="-600" r="${n2(30 + 80 * (t - tb))}" fill="none" stroke="${P.sun}" stroke-width="8"/>`);
  LOOP4.forEach(([x, y], i) => { const k = t >= tl[i] ? spring(t, tl[i], .45) : 0, f = fl[i], d = dm[i];
    s += `<g transform="translate(${x} ${y})"><circle r="100" fill="#F3EAD8" stroke="#D9C9A8" stroke-width="5" stroke-dasharray="${k > .5 ? "0" : "14 10"}"/>`
      + (k > .02 ? TF(0, 0, k * (1 + .12 * f) * (1 - .06 * d), (f > .05 ? `<circle r="${n2(106 + 14 * f)}" fill="${P.sun}" opacity="${n2(.5 * f)}"/>` : "") + tile16(pic(i, t), 92, "l4" + i + (o.id || ""), P.leaf) + (d > .02 ? `<circle r="92" fill="#2B2147" opacity="${n2(.62 * d)}"/>` : "")) : "")
      + (k > .02 && o.labels !== false ? OP(k, tpill(0, 128, nm[i], 30, "#FFF8EA", P.ink, { w: 700 })) : "")
      + (d > .02 && o.noTags ? OP(d, TF(0, -4, spring(d, .1, .5), tpill(0, 0, o.noTags[i], 30, "#5B6BD6", "#fff", { w: 700 }))) : "") + `</g>`; });
  if (o.drop) { const k = spring(t, o.drop, .45); if (k > .02) s += TF(-150, -700, k, `<path d="M0 -40 Q30 0 22 18 Q10 40 -10 34 Q-30 24 -22 4 Q-14 -10 0 -40z" fill="#5BB8F0" stroke="#2E7AB8" stroke-width="4"/><circle cx="-6" cy="8" r="6" fill="#fff" opacity=".8"/>`) + pline(-150, -650, -84, -660, ramp(t, o.drop, .2)) + TF(-300, -620, k, tpill(0, 0, "needs still water", 28, "#2E7AB8", "#fff", { w: 700 })); }
  return o.k ? TF(0, 0, o.k, s) : s; }
// a small loop (no board): four tiles round a ring of arrows, for the chant board and the Mark Sentence pictures. origin = its middle
const miniLoop4 = (t, pic, id, fl = [0, 0, 0, 0], r = 64) => { const Q = [[0, -1], [1, 0], [0, 1], [-1, 0]].map(([a, b]) => [a * r * 1.65, b * r * 1.65]); let s = `<circle r="${n2(r * 1.65)}" fill="none" stroke="${P.leaf}" stroke-width="8" stroke-dasharray="20 12"/>`;
  [[.7, -.7], [.7, .7], [-.7, .7], [-.7, -.7]].forEach(([a, b], i) => { const x = a * r * 1.65, y = b * r * 1.65, ang = (i * 90 + 135); s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${ang})"><path d="M-12 -16 L14 0 L-12 16z" fill="${P.leaf}"/></g>`; });
  Q.forEach(([x, y], i) => { const f = fl[i] || 0; s += TF(x, y, r / 104 * (1 + .14 * f), (f > .05 ? `<circle r="${n2(118 + 20 * f)}" fill="${P.sun}" opacity="${n2(.7 * f)}"/>` : "") + tile16(pic(i, t), 104, id + i, P.leaf)); }); return s; };

// Pip's own board on a low easel: the pupa drawn with a sleepy zzz, JUST RESTING!. o.zzz (1..0 the zzz pops away), o.glow (0..1 a small
// glow appears inside the pupa drawing). origin = the easel's feet
function restBoard(t, o = {}) { const z = o.zzz === undefined ? 1 : o.zzz, gl = o.glow || 0;
  let s = `<ellipse cx="0" cy="6" rx="250" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-170 0 L-120 -640 M170 0 L120 -640 M0 -40 L0 -620" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-250" y="-300" width="500" height="18" rx="8" fill="#8A5A36"/>`
    + `<g transform="translate(0 -560) rotate(-1.5)"><g filter="url(#drop)"><rect x="-260" y="-300" width="520" height="560" rx="18" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g>${T(0, -232, "JUST RESTING!", 54, P.pip)}<path d="M-190 -210 H190" stroke="${P.pip}" stroke-width="5" opacity=".5"/>`
    + TF(-20, 210, .9, pupa17(t, { id: "rb" }) + (gl > .02 ? `<g transform="rotate(${PUPA_ROT})"><ellipse cx="2" cy="-150" rx="${n2(36 * gl)}" ry="${n2(70 * gl)}" fill="url(#e17Glow)" opacity="${n2(.95 * gl)}"/></g>` : ""))
    + (z > .02 ? OP(z, [0, 1, 2].map((i) => { const u = ((t * .5 + i / 3) % 1); return T(110 + 36 * i + 10 * Math.sin(t * 2 + i), 0 - 70 * i - 20 * u, "z", 46 + 16 * i, P.pip); }).join("")) : "") + `</g>`;
  return s; }
// Basil's homework on the mosquito: three ruled lines, each with a small cute drawing. o.lit [x3], o.strike, o.fix (line 3 rewritten in green,
// its drawing: only one mosquito keeps a small badge). origin = the easel's feet
const HWL17 = ["It has four stages.", "Its larva is a wriggler.", "All mosquitoes spread dengue."];
function mosqSheet(t, o = {}) { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0;
  let s = `<ellipse cx="0" cy="6" rx="280" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-140 -700 M200 0 L140 -700 M0 -40 L0 -690" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-280" y="-250" width="560" height="18" rx="8" fill="#8A5A36"/>`;
  let p = `<g filter="url(#drop)"><rect x="-330" y="-330" width="660" height="620" rx="18" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g><path d="M-250 -330 V290" stroke="#F4A3A3" stroke-width="4"/>${T(-40, -270, "My homework", 46, P.ink)}${T(220, -270, "by Basil", 30, P.basil)}`;
  HWL17.forEach((ln, i) => { const y = -170 + i * 160, L = lit[i] || 0;
    p += (L > .02 ? `<rect x="-310" y="${y - 62}" width="620" height="140" rx="16" fill="${P.sun}" opacity="${n2(.35 * L)}"/>` : "") + `<circle cx="-282" cy="${y - 8}" r="22" fill="${P.ink}"/>${T(-282, y + 2, String(i + 1), 28, "#fff")}<path d="M-240 ${y + 14} H300" stroke="#BFD9F2" stroke-width="3"/>`;
    if (i < 2) p += `<text x="-230" y="${y}" font-family="Fredoka" font-weight="600" font-size="38" fill="${P.ink}">${esc(ln)}</text>`;
    else { p += `<text x="-230" y="${y}" font-family="Fredoka" font-weight="600" font-size="38" fill="${P.ink}" opacity="${n2(1 - .5 * fx)}">${esc(ln)}</text>` + (st > .02 ? `<path d="M-236 ${y - 12} L${n2(-236 + 540 * st)} ${y - 12}" stroke="#E0453A" stroke-width="7" stroke-linecap="round"/>` : "")
      + (fx > .02 ? OP(fx, `<text x="-230" y="${y + 52}" font-family="Fredoka" font-weight="600" font-size="30" fill="#1F8A4C">Most mosquitoes do not spread diseases,</text><text x="-230" y="${y + 88}" font-family="Fredoka" font-weight="600" font-size="30" fill="#1F8A4C">but some do.</text>`) : ""); }
    // the little drawings on the right of each line
    if (i === 0) p += TF(230, y + 54, .55, miniLoop4(t, mPic, "hw0", [0, 0, 0, 0], 44));
    if (i === 1) p += `<g transform="translate(200 ${y + 20})"><rect x="-40" y="-40" width="140" height="90" rx="12" fill="#BFE7E0"/><path d="M-40 -34 H100" stroke="#fff" stroke-width="4"/>${TF(30, -34, .45, wrig17(t, { wig: .2 }))}</g>`;
    if (i === 2) { [0, 1, 2, 3, 4].forEach((j) => { const keep = j === 2, a = keep ? 1 : 1 - fx, x = 60 + j * 52, yy = y + (fx > .02 ? 130 : 60); p += TF(x, yy, .34, mosq17(t, { wing: .2 })) + (a > .02 ? OP(a, `<g transform="translate(${x + 8} ${yy - 34})"><circle r="11" fill="#E0453A" stroke="#fff" stroke-width="2.5"/>${T(0, 6, "!", 16, "#fff")}</g>`) : ""); });
      if (fx > .5) p += OP((fx - .5) * 2, TF(176, y + 166, 1, tpill(0, 0, "only some", 24, "#1F8A4C", "#fff", { w: 700 }))); } });
  s += `<g transform="translate(0 -580) rotate(-1)">${p}</g>`; return s; }

// small chips and the answer helpers borrowed from EP16 (art16.js): xChip16, tickChip16, ideaBubble16, tile16
// a "≠" or "=" sign in a sun disc
const signDisc = (t, t0, x, y, sym, k = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .45) * k, `<g filter="url(#dropS)"><circle r="64" fill="${sym === "=" ? P.leaf : "#F28A3A"}" stroke="#fff" stroke-width="6"/></g>${T(0, 32, sym, 96, "#fff")}`);
