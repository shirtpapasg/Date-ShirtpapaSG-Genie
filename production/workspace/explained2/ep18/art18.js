// art18.js: EP18's own art (Stage 2, drawn 2026-11-23). Loaded after home15.js, garden15.js, pond16.js, art16.js (EP16's animals and
// helpers), art17.js, sets17.js, lc17.js (EP17's mosquito, butterfly, lime plant, void deck) and ep17dare.js; before common.js / p1 / p2.
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   the CICADA (Part 1's hidden animal: green-brown, a short wide head, big wide-set eyes, clear wings folded like a tent; its nymph with big
//   digging front legs), the HONEYBEE (Part 2's hidden animal: golden-brown with dark stripes, fuzzy, see-through wings; the queen longer),
//   the MEALWORM (golden-brown, shiny, hard, segmented, six tiny legs at the front), its PUPA (pale, still, curled, little bumps) and the
//   mealworm BEETLE (dark, hard wing covers); EP16's hen sitting on her straw nest (henNest18).
// THE LOOPS: loopN draws any life cycle as n tiles round a ring of curved arrows all one way, in ONE style (so three tiles and four tiles are
//   a real difference): no numbers, no START, no END (5.16).
// THE PLACES: BG.deck18 (our block's VOID DECK on LIFE CYCLE DAY, baked) + VDK(t, o, cam) live (the ceiling fan, a pigeon, a child cycling
//   past outside, the rain tree's leaves, the LIFE CYCLE DAY board with its COMPARE FRAME, the cicada in its spot); VGE(t, o, cam) the
//   garden's edge (EP17's lime-plant side BG.lime17: the hen's straw nest under a low bush, a planter of IXORA, the lime plant in its big pot
//   with small white flowers, the bench, the watering can; the honeybee in its spot); the pond (EP16's VP16) for the raindrop.

/* ================================================================ small helpers ================================================================ */
const SAMEL = "#1F8A4C", DIFFL = "#B4531A";
// an "=" / "≠" disc in the comparing colours (green same, orange different)
const eqDisc = (t, t0, x, y, sym, k = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .45) * k, `<g filter="url(#dropS)"><circle r="46" fill="${sym === "=" ? SAMEC : DIFFC}" stroke="#fff" stroke-width="5"/></g>${T(0, 24, sym, 70, "#fff")}`);
// a dot counter in a white pill (a tally: never numbers on a loop)
const dotPill = (t, t0, x, y, n, filled, glow = -1, k = 1, r = 16) => t < t0 ? "" : TF(x, y, spring(t, t0, .45) * k, `<g filter="url(#dropS)"><rect x="${n2(-n * r * 1.3 - 18)}" y="${-r - 14}" width="${n2(n * r * 2.6 + 36)}" height="${2 * r + 28}" rx="${r + 14}" fill="#fff"/></g>` + dots(0, 0, n, filled, glow, r));
// a pointing hand (four fingers and a thumb: hand15) whose finger tip sits at (0, 0), pointing down-left
const tipHand = (k = 1, rot = 0) => TF(0, 0, k, TF(-6, -92, 1, hand15({ curl: .55 })), rot);

/* ================================================================ THE ANIMALS ================================================================ */
// the CICADA, seen from above / on a trunk, head UP. origin = its middle. o.buzz: the little buzz-wobble of its belly
function cicada18(t, o = {}) { const bz = (o.buzz === undefined ? 1 : o.buzz) * ((t % 3.1) < .5 ? 1.6 * Math.sin(t * 80) : 0), sh = blink16(t, .4);
  const legs = [[-20, -10, -36, -2], [-22, 8, -40, 18], [-20, 24, -36, 40]].map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d} l-6 6 M${-a} ${b} L${-c} ${d} l6 6" stroke="#4A5A2A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
  return `<g transform="translate(${n2(bz)} 0)">${legs}<ellipse cx="0" cy="8" rx="22" ry="44" fill="#7E8C46" stroke="#3E4A1E" stroke-width="4"/>`
    + [0, 1, 2, 3].map((i) => `<path d="M-18 ${16 + i * 9} Q0 ${20 + i * 9} 18 ${16 + i * 9}" stroke="#5E6A2E" stroke-width="2.5" fill="none"/>`).join("")
    + `<path d="M-6 -22 Q-46 10 -30 84 Q-14 90 -3 46 Q-2 10 -6 -22z" fill="#E9F6EE" fill-opacity=".55" stroke="#6E8A62" stroke-width="3"/><path d="M6 -22 Q46 10 30 84 Q14 90 3 46 Q2 10 6 -22z" fill="#E9F6EE" fill-opacity=".55" stroke="#6E8A62" stroke-width="3"/>`
    + `<path d="M-8 -10 Q-26 30 -24 70 M-10 6 Q-18 40 -10 74 M8 -10 Q26 30 24 70 M10 6 Q18 40 10 74" stroke="#8AA27E" stroke-width="2" fill="none"/>`
    + `<path d="M-24 -26 Q0 -40 24 -26 Q20 -12 0 -10 Q-20 -12 -24 -26z" fill="#8E9C52" stroke="#3E4A1E" stroke-width="3.5"/>`
    + `<ellipse cx="0" cy="-36" rx="22" ry="12" fill="#98A85A" stroke="#3E4A1E" stroke-width="3.5"/>` + eye16(-24, -38, 9, { shut: sh }) + eye16(24, -38, 9, { shut: sh })
    + `<circle cx="-9" cy="-30" r="3" fill="#FFB4A0" opacity=".7"/><circle cx="9" cy="-30" r="3" fill="#FFB4A0" opacity=".7"/><path d="M-5 -32 q5 4 10 0" stroke="${INK16}" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`; }
const cicadaAt = (t, x, y, k = .5, rot = 0) => TF(x, y, k, cicada18(t, {}), rot);
// the cicada NYMPH underground (side view, facing right): brown, humped, big digging front legs with claws. origin = under it
function cicNymph18(t, o = {}) { const dg = Math.sin(t * 3), sh = blink16(t, 1.2);
  return `<path d="M-60 -10 l-14 18 M-30 -6 l-10 22" stroke="#7A4E22" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-90 -40 Q-90 -96 -10 -100 Q60 -100 74 -56 Q76 -24 40 -14 Q-40 -6 -90 -40z" fill="#C9894A" stroke="#6A3E16" stroke-width="5"/>`
    + [0, 1, 2, 3].map((i) => `<path d="M${-74 + i * 22} -88 Q${-70 + i * 22} -52 ${-76 + i * 22} -24" stroke="#A86A30" stroke-width="3" fill="none"/>`).join("")
    + `<g transform="translate(58 -36) rotate(${n2(-20 + 22 * dg)})"><path d="M0 0 Q30 -6 44 14 L58 8 M44 14 L52 26 M44 14 L40 28" stroke="#7A4E22" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`
    + `<circle cx="64" cy="-64" r="26" fill="#D69A58" stroke="#6A3E16" stroke-width="4.5"/>` + eye16(72, -70, 8, { shut: sh }) + `<path d="M70 -54 q6 4 12 0" stroke="${INK16}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`; }
// the HONEYBEE (facing right). origin = its middle. o.queen: the longer body and a tiny crown sticker; o.fly: wings a blur
function bee18(t, o = {}) { const q = !!o.queen, L = q ? 50 : 30, fl = o.fly ? 32 * Math.sin(t * 90) : 10 * Math.sin(t * 9), sh = blink16(t, .9);
  const fuzz = (cx, cy, rx, ry, n, col) => [...Array(n)].map((_, i) => { const a = i / n * Math.PI * 2; return `<circle cx="${n2(cx + rx * Math.cos(a))}" cy="${n2(cy + ry * Math.sin(a))}" r="4.5" fill="${col}"/>`; }).join("");
  return `<g transform="rotate(${n2(-30 + fl)} 10 -14)"><ellipse cx="2" cy="-30" rx="26" ry="13" fill="#EAF6FF" fill-opacity=".7" stroke="#8FB8D0" stroke-width="2.5"/></g><g transform="rotate(${n2(-60 + fl)} 14 -14)"><ellipse cx="8" cy="-26" rx="18" ry="10" fill="#EAF6FF" fill-opacity=".6" stroke="#8FB8D0" stroke-width="2.5"/></g>`
    + `<path d="M0 14 l-6 14 M12 14 l-2 16 M22 12 l6 14" stroke="#3A2A1A" stroke-width="4" stroke-linecap="round"/><ellipse cx="-8" cy="28" rx="6" ry="5" fill="#F7C548"/>`
    + fuzz(-L * .5 - 4, 0, L * .9, 19, 16, "#E8A93A") + `<ellipse cx="${-L * .5 - 4}" cy="0" rx="${L * .9}" ry="20" fill="#E8A93A" stroke="#6A4210" stroke-width="3"/>`
    + [0, 1, 2].map((i) => `<path d="M${n2(-L * .5 - 4 - L * .5 + i * L * .42)} -18 Q${n2(-L * .5 + 4 - L * .5 + i * L * .42)} 0 ${n2(-L * .5 - 4 - L * .5 + i * L * .42)} 18" stroke="#3A2A1A" stroke-width="7" fill="none"/>`).join("")
    + `<path d="M${-L * 1.4 - 4} 0 l-8 2 l8 3" fill="#3A2A1A"/>` + fuzz(12, -2, 15, 15, 12, "#D9A040") + `<circle cx="12" cy="-2" r="16" fill="#C98A2E" stroke="#6A4210" stroke-width="3"/>`
    + `<path d="M36 -12 Q42 -34 32 -42 M40 -8 Q52 -28 48 -38" stroke="#3A2A1A" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="36" cy="0" r="13" fill="#5A3A1E" stroke="#3A2A1A" stroke-width="3"/>`
    + eye16(39, -3, 6, { shut: sh }) + `<path d="M38 7 q4 3 8 -1" stroke="#FFD9A0" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + (q ? `<g transform="translate(34 -18)"><path d="M-12 0 L-12 -14 L-6 -6 L0 -16 L6 -6 L12 -14 L12 0z" fill="#FFD75A" stroke="#C98A00" stroke-width="2.5" stroke-linejoin="round"/></g>` : ""); }
const beeAt = (t, x, y, k = .5, rot = 0, fly) => TF(x, y + (fly ? 4 * Math.sin(t * 7) : 0), k, bee18(t, { fly }), rot);
// the MEALWORM (facing right). origin = its middle. o.crawl: the wave along its body
function mealworm18(t, o = {}) { const n = 12, cr = o.crawl === undefined ? 1 : o.crawl, sh = blink16(t, 1.7); let s = "", top = "";
  for (let i = 0; i < n; i++) { const x = -110 + i * 20, y = cr * 3.5 * Math.sin(t * 5 - i * .8), r = i === 0 ? 11 : 15;
    s += `<ellipse cx="${x}" cy="${n2(y)}" rx="13" ry="${r}" fill="#D9A441" stroke="#8A5A1C" stroke-width="3"/>`; top += `<path d="M${x - 6} ${n2(y - r * .6)} q6 -3 12 0" stroke="#FFF2C8" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`; }
  const hy = cr * 3.5 * Math.sin(t * 5 - n * .8);
  const legs = [0, 1, 2].map((i) => { const x = 100 - i * 16, w = 4 * Math.sin(t * 8 + i); return `<path d="M${x} 12 l${n2(-4 + w)} 12" stroke="#7A4A14" stroke-width="3.5" stroke-linecap="round"/>`; }).join("");
  return legs + s + top + `<ellipse cx="128" cy="${n2(hy)}" rx="16" ry="14" fill="#A8692A" stroke="#6A3E10" stroke-width="3"/>` + eye16(134, n2(hy - 4), 4.5, { shut: sh }) + `<path d="M136 ${n2(hy + 5)} q4 3 7 0" stroke="${INK16}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-122 0 l-12 -5 M-122 3 l-12 6" stroke="#8A5A1C" stroke-width="3" stroke-linecap="round"/>`; }
// the mealworm beetle's PUPA: pale cream, curled, still, little bumps down its sides, folded legs. origin = its middle
function mwPupa18(t) { const br = 1 + .008 * Math.sin(t * 1.4);
  return `<g transform="scale(${n2(br)})"><path d="M-60 -30 Q-70 30 -20 50 Q40 64 64 20 Q76 -20 40 -40 Q10 -54 -20 -50 Q-50 -48 -60 -30z" fill="#F4E8C8" stroke="#B89A5A" stroke-width="4"/>`
    + [...Array(6)].map((_, i) => `<path d="M${-40 + i * 18} ${n2(-48 + 6 * Math.abs(i - 2.5))} l4 -9 l4 9" fill="#F4E8C8" stroke="#B89A5A" stroke-width="2.5"/>`).join("")
    + `<path d="M-30 -20 Q-34 10 -10 26 M-14 -26 Q-16 6 6 20" stroke="#C9B07A" stroke-width="3" fill="none"/>` + [0, 1, 2, 3].map((i) => `<path d="M${18 + i * 10} -36 Q${30 + i * 8} 0 ${20 + i * 10} 36" stroke="#D9C79A" stroke-width="2.5" fill="none"/>`).join("") + `</g>`; }
// the mealworm BEETLE (from above, head right): dark, hard wing covers. origin = its middle
function beetle18(t, o = {}) { const w = 5 * Math.sin(t * 6), sh = blink16(t, 2.3);
  const legs = [-30, 0, 30].map((x, i) => `<path d="M${x} -26 l${n2(-10 + (i % 2 ? w : -w))} -24 M${x} 26 l${n2(-10 + (i % 2 ? -w : w))} 24" stroke="#2A1E18" stroke-width="5" stroke-linecap="round"/>`).join("");
  return legs + `<path d="M64 -10 Q90 -34 98 -44 M64 10 Q90 34 98 44" stroke="#2A1E18" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-20" cy="0" rx="62" ry="36" fill="#3E2C22" stroke="#1E140E" stroke-width="4"/><path d="M-80 0 H40" stroke="#1E140E" stroke-width="3"/>`
    + [-12, 12].map((y) => `<path d="M-70 ${y} H30" stroke="#5A4232" stroke-width="2" opacity=".7"/>`).join("") + `<path d="M-60 -22 Q-20 -32 20 -24" stroke="#8A7462" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>`
    + `<ellipse cx="48" cy="0" rx="20" ry="28" fill="#4A3628" stroke="#1E140E" stroke-width="4"/><circle cx="72" cy="0" r="16" fill="#4A3628" stroke="#1E140E" stroke-width="4"/>` + eye16(78, -8, 5, { shut: sh }) + eye16(78, 8, 5, { shut: sh }); }
// the hen on her straw nest (origin = the nest on the ground, facing right). o.lift 0..1 she stands (the eggs show), o.peck 0..1 she turns
// an egg with her beak, o.eggs (how many show when she lifts), o.k
const NESTEGGS = [[-40, -6], [8, -2], [48, -8]];
function henNest18(t, o = {}) { const lf = o.lift || 0, pk = o.peck || 0, nb = (i) => `<path d="M${-160 + i * 21} ${n2(-8 + 10 * hash(i, 9))} q${n2(14 + 8 * hash(i, 3))} ${n2(-18 - 8 * hash(i, 5))} ${n2(30 + 8 * hash(i, 7))} -2" stroke="${i % 3 ? "#D9B86A" : "#B8944A"}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  let s = `<ellipse cx="0" cy="10" rx="190" ry="34" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><ellipse cx="0" cy="-10" rx="170" ry="44" fill="#C9A45A" stroke="#8A6A2E" stroke-width="5"/><ellipse cx="0" cy="-20" rx="128" ry="26" fill="#8A6A2E"/>`;
  s += NESTEGGS.slice(0, o.eggs === undefined ? 3 : o.eggs).map(([x, y], i) => `<ellipse cx="${x}" cy="${y - 30}" rx="26" ry="20" fill="#FFF6E6" stroke="#D9C9A8" stroke-width="3"/><ellipse cx="${x - 8}" cy="${y - 38}" rx="7" ry="4" fill="#fff"/>`).join("");
  if (o.hen !== false) s += TF(-10, n2(26 - 80 * eio(lf)), .92, hen16(t, { peck: pk }));
  s += `<path d="M-172 -12 Q0 -30 172 -12 Q166 30 0 40 Q-166 30 -172 -12z" fill="#D9B86A" stroke="#8A6A2E" stroke-width="5"/>` + [...Array(16)].map((_, i) => TF(0, -14, 1, nb(i))).join("") + [...Array(12)].map((_, i) => TF(10, 12, .9, nb(i + 2))).join("");
  return o.k ? TF(0, 0, o.k, s) : s; }

/* ================================================================ THE LOOPS ================================================================ */
// ONE style for every life cycle: n tiles round a ring of curved arrows, all one way (clockwise), no numbers, no start, no end.
// origin = its middle. o.R ring radius, o.r tile radius, o.id, o.fl (i) -> 0..1 glow, o.dim [..] 0..1, o.faint [..] 0..1 (the beetle's easy-
// to-miss pupa), o.names (labels), o.lsize, o.run (the arrows run round: a time), o.arrow colour, o.lit (which arrows are lit, default all)
function loopN(t, pic, n, o = {}) { const R = o.R || 150, r = o.r || 66, id = o.id || "ln", col = o.arrow || P.leaf, gap = (r + 12) / R, sw = o.sw || Math.max(5, r * .14);
  let s = "";
  for (let i = 0; i < n; i++) { const a0 = -Math.PI / 2 + i * 2 * Math.PI / n + gap, a1 = -Math.PI / 2 + (i + 1) * 2 * Math.PI / n - gap - .02, x0 = R * Math.cos(a0), y0 = R * Math.sin(a0), x1 = R * Math.cos(a1), y1 = R * Math.sin(a1), ang = a1 * 180 / Math.PI + 90, lit = !o.lit || o.lit[i];
    s += `<path d="M${n2(x0)} ${n2(y0)} A${R} ${R} 0 0 1 ${n2(x1)} ${n2(y1)}" fill="none" stroke="${lit ? col : "#C9B48F"}" stroke-width="${n2(sw)}" stroke-linecap="round"${o.run !== undefined && t > o.run ? ` stroke-dasharray="${n2(sw * 2)} ${n2(sw * 1.2)}" stroke-dashoffset="${n2(-(t - o.run) * sw * 4)}"` : ""}/>`
      + `<g transform="translate(${n2(x1)} ${n2(y1)}) rotate(${n2(ang)})"><path d="M${n2(-sw * 1.6)} ${n2(-sw * 1.1)} L0 ${n2(sw * 1.2)} L${n2(sw * 1.6)} ${n2(-sw * 1.1)}z" fill="${lit ? col : "#C9B48F"}"/></g>`; }
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n, x = R * Math.cos(a), y = R * Math.sin(a), f = o.fl ? o.fl(i) : 0, d = o.dim ? o.dim[i] || 0 : 0, fa = o.faint ? o.faint[i] || 0 : 0;
    s += TF(x, y, r / 104 * (1 + .14 * f), (f > .05 ? `<circle r="${n2(118 + 20 * f)}" fill="${P.sun}" opacity="${n2(.7 * f)}"/>` : "") + OP(1 - .62 * fa, tile16(pic(i, t), 104, id + i, P.leaf)) + (d > .02 ? `<circle r="96" fill="#2B2147" opacity="${n2(.6 * d)}"/>` : ""));
    if (o.names) s += TF(x, y + r + (o.lsize || 22) * .9, 1, tpill(0, 0, o.names[i], o.lsize || 22, "#FFF8EA", P.ink, { w: 700 })); }
  return s; }
// the mealworm beetle's four stage pictures (a tile: -110..110): tiny eggs in the bran, a mealworm, the pupa, the beetle
const branBg = (h = 220) => `<rect x="-110" y="-110" width="220" height="220" fill="#F3E2BC"/>` + [...Array(40)].map((_, j) => `<ellipse cx="${n2(-104 + 208 * hash(j, 3))}" cy="${n2(110 - h * .5 + h * .5 * hash(j, 5))}" rx="6" ry="3" fill="${j % 2 ? "#D9BE86" : "#C9A86A"}" transform="rotate(${n2(180 * hash(j, 7))} ${n2(-104 + 208 * hash(j, 3))} ${n2(110 - h * .5 + h * .5 * hash(j, 5))})"/>`).join("");
const beetlePic = (i, t) => i === 0 ? branBg(300) + [[-30, -10], [-6, 6], [20, -6], [8, 24], [-22, 22]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#FFFDF4" stroke="#C9B07A" stroke-width="2"/>`).join("")
  : i === 1 ? branBg() + TF(-8, 10, .62, mealworm18(t, {}))
  : i === 2 ? branBg() + TF(0, 6, 1.05, mwPupa18(t))
  : branBg() + TF(-10, 0, .9, beetle18(t, {}), -20);
// the mango's loop pictures (EP15) and their names, for the board's small cards
const LOOPKINDS = { mango: [tilePic, 3], frog: [frogPic, 3], chicken: [chickPic, 3], grasshopper: [hopPic, 3], cockroach: [roachPic, 3], butterfly: [bPic, 4], mosquito: [mPic, 4], beetle: [beetlePic, 4] };
const kindLoop = (t, kind, o = {}) => loopN(t, LOOPKINDS[kind][0], LOOPKINDS[kind][1], { id: (o.id || "k") + kind, ...o });

/* ================================================================ THE LIFE CYCLE DAY BOARD and its COMPARE FRAME ================================================================ */
// absolute coordinates in the void deck. The cork board 760 x 560 on two easels; the COMPARE FRAME in its middle (two windows: the frog's
// loop and the mosquito's loop; under them the green SAME strip and the orange DIFFERENT strip); five small loop cards round it.
const BRD18 = [1000, 470], CF = { x: 1000, wl: [888, 372], wr: [1112, 372], same: 572, diff: 646 };
const SMALLCARDS = [["mango", 690, 300, -3], ["chicken", 690, 470, 2], ["grasshopper", 690, 640, -2], ["cockroach", 1310, 300, 3], ["butterfly", 1310, 470, -2]];
// a chip on a strip (k: 0 same, 1 different); s = scale
const stripChip = (t, t0, x, y, k, txt, size = 22) => t < t0 ? "" : TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, k ? DIFFC : SAMEC, "#fff", { w: 700 }));
// the COMPARE FRAME on its own (origin = its middle, 470 x 470 at k 1). o.loops [kF, kM] (0..1: the loops slide in), o.same / o.diff: chips
// [[t0, txt]], o.glow [same, diff] 0..1, o.dots [t3, t4] (the counters fill), o.lit [frog fl(i), mosquito fl(i)], o.words (the strips also say
// similarities / differences), o.young (the young tiles light with an orange ≠ to the adult), o.id
function compareFrame(t, o = {}) { const id = o.id || "cf", lp = o.loops || [1, 1], gl = o.glow || [0, 0], wl = [CF.wl[0] - CF.x, CF.wl[1] - BRD18[1] + 15], wr = [CF.wr[0] - CF.x, CF.wr[1] - BRD18[1] + 15];
  let s = `<g filter="url(#dropS)"><rect x="-240" y="-236" width="480" height="478" rx="20" fill="#FFFDF6" stroke="#8A5A36" stroke-width="7"/></g>` ;
  [[wl, "frog", frogPic, 3, lp[0], 0], [wr, "mosquito", mPic, 4, lp[1], 1]].forEach(([w, nm, pic, n, k, j]) => {
    s += `<rect x="${w[0] - 104}" y="${w[1] - 128}" width="208" height="236" rx="14" fill="#EAF3F7" stroke="#C9B48F" stroke-width="4"/>`;
    if (k > .01) s += OP(Math.min(1, k * 1.5), TF(w[0] + 300 * (1 - eo(k)) * (j ? 1 : -1), w[1] - 10, 1, loopN(t, pic, n, { R: 62, r: n === 3 ? 34 : 31, id: id + nm, sw: 6, fl: o.lit ? o.lit[j] : null }))
      + T(w[0], w[1] + 92, nm, 22, P.ink));
    if (o.dots && t >= o.dots[j]) s += TF(w[0], w[1] - 108, spring(t, o.dots[j], .45), dots(0, 0, n, n, j && o.glowPupa ? 2 : -1, 8)); });
  [["SAME", "similarities", CF.same, SAMEC, gl[0], o.same || []], ["DIFFERENT", "differences", CF.diff, DIFFC, gl[1], o.diff || []]].forEach(([lab, wd, y, c, g, chips], j) => { const yy = y - BRD18[1];
    s += (g > .02 ? `<rect x="-230" y="${yy - 34}" width="460" height="68" rx="18" fill="${P.sun}" opacity="${n2(.6 * g)}"/>` : "") + `<rect x="-224" y="${yy - 28}" width="448" height="56" rx="14" fill="${c}" opacity=".18" stroke="${c}" stroke-width="4"/>`
      + `<rect x="-224" y="${yy - 28}" width="${o.words ? 150 : 118}" height="56" rx="14" fill="${c}"/>` + T(o.words ? -149 : -165, yy + (o.words ? -1 : 8), lab, lab.length > 4 ? 20 : 24, "#fff") + (o.words ? T(-149, yy + 20, wd, 16, "#fff", { w: 600 }) : "");
    chips.forEach(([t0, txt], i) => { s += stripChip(t, t0, (o.words ? -34 : -60) + 110 + i * 150 - (chips.length > 1 ? 70 : 0), yy, j, txt, chips.length > 1 ? 15 : 18); }); });
  return o.k ? TF(0, 0, o.k, s) : s; }
// the whole board on its easels (absolute, in the void deck). o: as compareFrame + o.cardsK (the small cards), o.banner
function lcdBoard(t, o = {}) { const [bx, by] = BRD18, L = bx - 380, R_ = bx + 380, Tp = by - 280, B = by + 280;
  let s = `<path d="M${L + 110} ${Tp - 40} L${L + 60} ${B + 150} M${R_ - 110} ${Tp - 40} L${R_ - 60} ${B + 150}" stroke="#7A4A26" stroke-width="20" stroke-linecap="round"/><path d="M${L + 110} ${Tp - 40} L${L + 190} ${B + 120} M${R_ - 110} ${Tp - 40} L${R_ - 190} ${B + 120}" stroke="#5E3A1E" stroke-width="14" stroke-linecap="round"/>`
    + `<ellipse cx="${bx}" cy="${B + 156}" rx="420" ry="18" fill="${P.ink}" opacity=".18" filter="url(#b4)"/>`;
  s += `<g filter="url(#drop)"><rect x="${L - 14}" y="${Tp - 14}" width="${R_ - L + 28}" height="${B - Tp + 28}" rx="22" fill="#8A5A36"/></g><rect x="${L}" y="${Tp}" width="${R_ - L}" height="${B - Tp}" rx="12" fill="#D9A866"/>`
    + [...Array(70)].map((_, i) => `<circle cx="${n2(L + 10 + (R_ - L - 20) * hash(i, 41))}" cy="${n2(Tp + 10 + (B - Tp - 20) * hash(i, 43))}" r="${n2(2 + 3 * hash(i, 47))}" fill="#B8864A" opacity=".6"/>`).join("")
    + `<rect x="${L - 30}" y="${B + 6}" width="${R_ - L + 60}" height="22" rx="8" fill="#7A4A26"/>`;
  // the hand-made banner and its bunting
  s += `<path d="M${L - 10} ${Tp - 40} Q${bx} ${Tp - 4} ${R_ + 10} ${Tp - 40}" stroke="#8A5A36" stroke-width="4" fill="none"/>` + [...Array(13)].map((_, i) => { const x = L + 10 + i * 60, y = Tp - 36 + 26 * Math.sin(Math.PI * (i + .5) / 13); return `<path d="M${x - 16} ${n2(y)} L${x + 16} ${n2(y)} L${x} ${n2(y + 30)}z" fill="${["#FB7158", "#FFC83A", "#14B8A6", "#8B5CF6"][i % 4]}"/>`; }).join("")
    + TF(bx, Tp + 34, 1, `<g filter="url(#dropS)"><rect x="-230" y="-30" width="460" height="60" rx="12" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="4"/></g>` + T(0, 14, "LIFE CYCLE DAY", 40, "#C4581E", { ls: 4 }));
  // the five small loop cards, pinned
  SMALLCARDS.forEach(([kind, x, y, r], i) => { s += TF(x, y, 1, `<g filter="url(#dropS)"><rect x="-72" y="-74" width="144" height="152" rx="10" fill="#FFFDF6"/></g><circle cx="0" cy="-66" r="7" fill="${["#FB7158", "#14B8A6", "#8B5CF6"][i % 3]}"/>` + TF(0, -8, 1, kindLoop(t, kind, { R: 40, r: LOOPKINDS[kind][1] === 3 ? 22 : 19, sw: 4, id: "bc" + (o.id || "") })) + T(0, 66, kind, 18, P.ink), r); });
  s += TF(bx, by + 20, 1, compareFrame(t, o));
  return s; }

/* ================================================================ THE VOID DECK ================================================================ */
const TABLE18 = [1000, 914], PILA = [470, 130], PILB = [1440, 150], RAINT = [1775, 600];
BG.deck18 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="#E9E1D2"/>`;
  // the garden beyond the open side (right): sky, far blocks, grass, bushes, the RAIN TREE (its trunk and the low branches under the ceiling)
  s += `<rect x="1500" y="60" width="700" height="660" fill="url(#e17Sky)"/><g opacity=".55">${farBlocks(1560, 2140, 360, 23, 1)}</g><rect x="1500" y="540" width="700" height="180" fill="url(#g14Grass)"/>`
    + [...Array(6)].map((_, i) => `<circle cx="${1560 + i * 110}" cy="${n2(560 + 10 * hash(i, 4))}" r="${n2(44 + 18 * hash(i, 6))}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`).join("")
    + `<path d="M${RAINT[0] - 52} 610 Q${RAINT[0] - 30} 400 ${RAINT[0] - 40} 220 Q${RAINT[0] - 120} 150 ${RAINT[0] - 260} 120 M${RAINT[0] + 40} 610 Q${RAINT[0] + 30} 380 ${RAINT[0] + 46} 220 Q${RAINT[0] + 140} 160 ${RAINT[0] + 300} 140" fill="none" stroke="#6E4A2E" stroke-width="18"/>`
    + `<path d="M${RAINT[0] - 54} 616 Q${RAINT[0] - 36} 400 ${RAINT[0] - 44} 200 L${RAINT[0] + 50} 200 Q${RAINT[0] + 34} 400 ${RAINT[0] + 44} 616z" fill="#7A5236" stroke="#4E3220" stroke-width="5"/>`
    + [0, 1, 2, 3, 4].map((i) => `<path d="M${RAINT[0] - 30 + i * 14} ${600 - i * 10} Q${RAINT[0] - 26 + i * 14} ${420 - i * 30} ${RAINT[0] - 34 + i * 16} ${240 + i * 6}" stroke="#5E3E26" stroke-width="3" fill="none" opacity=".6"/>`).join("")
    + [...Array(16)].map((_, i) => `<circle cx="${n2(1520 + i * 42 + 20 * hash(i, 8))}" cy="${n2(110 + 70 * hash(i, 9))}" r="${n2(50 + 30 * hash(i, 11))}" fill="${["#2F7F48", "#3E9A5A", "#4FAE66"][i % 3]}"/>`).join("");
  // the ceiling and its beam
  s += `<rect x="-200" y="-120" width="2320" height="196" fill="#D9CFBC"/><rect x="-200" y="66" width="2320" height="18" fill="#C9BCA4"/>`;
  // the back wall: the notice board (left), the letterboxes, a block sign
  s += `<rect x="-200" y="84" width="1700" height="630" fill="#F2E8D6"/><rect x="-200" y="690" width="1700" height="24" fill="#E3D6BE"/>`
    + `<rect x="-170" y="270" width="230" height="200" rx="8" fill="#7A5A34"/><rect x="-158" y="282" width="206" height="176" fill="#F4E6C8"/><rect x="-140" y="300" width="80" height="60" fill="#FFC38A"/><rect x="-46" y="300" width="80" height="110" fill="#8FD3C8"/><rect x="-140" y="372" width="80" height="70" fill="#FFF"/>`
    + `<rect x="90" y="250" width="360" height="262" rx="10" fill="#B9C4D0" stroke="#7A8798" stroke-width="5"/>${[...Array(32)].map((_, i) => `<rect x="${104 + (i % 8) * 42}" y="${264 + Math.floor(i / 8) * 61}" width="34" height="52" rx="4" fill="#D9E1EA" stroke="#8C98A8" stroke-width="2"/><rect x="${112 + (i % 8) * 42}" y="${274 + Math.floor(i / 8) * 61}" width="18" height="4" rx="2" fill="#8C98A8"/>`).join("")}`
    + `<rect x="175" y="168" width="190" height="56" rx="10" fill="#4E6A8A"/>` + T(270, 208, "BLK 218", 34, "#fff", { ls: 3 });
  // the floor
  s += `<rect x="-200" y="712" width="2320" height="500" fill="url(#e17Deck)"/>${[...Array(12)].map((_, i) => `<path d="M${-200 + i * 220} 712 L${-500 + i * 300} 1200" stroke="#B8AE9C" stroke-width="2" opacity=".6"/>`).join("")}<path d="M-200 830 H2120 M-200 990 H2120" stroke="#B8AE9C" stroke-width="2" opacity=".5"/>`;
  // the square pillars
  [[PILA[0], PILA[1]], [PILB[0], PILB[1]], [2020, 190]].forEach(([x, w]) => { s += `<rect x="${x}" y="84" width="${w}" height="${n2(712 - 84 + w * .3)}" fill="#F7EFE0" stroke="#D9CBB2" stroke-width="4"/><rect x="${x + w - 28}" y="84" width="28" height="${n2(712 - 84 + w * .3)}" fill="#E3D6BE"/><rect x="${x}" y="${n2(650 + w * .3)}" width="${w}" height="62" fill="#C9BCA4" opacity=".55"/>`; });
  return s; };
// the stone table and its stools (live: in front of the board's easel legs)
const table18 = () => { const [tx, ty] = TABLE18; return `<ellipse cx="${tx}" cy="${ty + 160}" rx="320" ry="28" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${tx - 60} ${ty} L${tx - 80} ${ty + 160} H${tx + 80} L${tx + 60} ${ty}z" fill="#BFB6A6" stroke="#8C8272" stroke-width="5"/><ellipse cx="${tx}" cy="${ty}" rx="290" ry="56" fill="#D6CDBC" stroke="#8C8272" stroke-width="5"/><ellipse cx="${tx}" cy="${ty - 6}" rx="260" ry="42" fill="#E3DACA"/>`
  + [[-400, 110], [400, 110]].map(([dx, dy]) => `<path d="M${tx + dx - 50} ${ty + dy - 30} L${tx + dx - 40} ${ty + dy + 60} H${tx + dx + 40} L${tx + dx + 50} ${ty + dy - 30}z" fill="#BFB6A6" stroke="#8C8272" stroke-width="4"/><ellipse cx="${tx + dx}" cy="${ty + dy - 30}" rx="70" ry="20" fill="#D6CDBC" stroke="#8C8272" stroke-width="4"/>`).join(""); };
// the cicada's spot in each void-deck scene [x, y, k, rot]: the INTRO (the rain tree's trunk) only before and at the game's push-in; then a
// new spot every scene, never twice; the REVEAL on the leg of the board's easel
const CICAT = { cold: [RAINT[0] + 4, 430, .34, 0], back: [RAINT[0] + 4, 430, .34, 0], title: [RAINT[0] + 4, 430, .34, 0], game: [RAINT[0] + 4, 430, .34, 0],
  board: [PILA[0] + 62, 640, .32, 0], answer: [452, 360, .3, -90], holdon: null, liz: [668, 828, .32, -6] };
// VDK: the live void deck. o: board (false: no LIFE CYCLE DAY board) + the board's options, cicAt ([..] | false), items0 (behind the
// board), items (between the board and the table), front (in front of the table), dim, child (a child cycles past outside: time)
function VDK(t, o = {}, cam) { let s = bg("deck18");
  // the rain tree's leaves stir; a mynah hops on the grass outside; a child cycles past (o.child)
  s += [...Array(7)].map((_, i) => `<circle cx="${n2(1650 + i * 56 + 6 * Math.sin(t * 1.3 + i))}" cy="${n2(200 + 30 * hash(i, 2))}" r="${n2(34 + 10 * hash(i, 3))}" fill="${i % 2 ? "#3E9A5A" : "#58B56C"}" opacity=".85"/>`).join("");
  s += TF(1640 + 40 * Math.sin(t * .3), 690 - hop(t % 1.9, 0, .3, 10), .8, bird15(t, 1, 1.1));
  if (o.child !== undefined) { const u = clamp((t - o.child) / 4); if (u > 0 && u < 1) { const x = lerp(2150, 1450, u), w = t * 8; s += TF(x, 700, .55, `<circle cx="-60" cy="-40" r="40" fill="none" stroke="#3A3A4A" stroke-width="8"/><circle cx="60" cy="-40" r="40" fill="none" stroke="#3A3A4A" stroke-width="8"/><path d="M-60 -40 L-10 -100 L40 -100 L60 -40 M-10 -100 L-20 -120 M40 -100 L50 -130 h20" stroke="#E0453A" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="0" cy="-200" r="30" fill="#F2C29B"/><path d="M-30 -210 Q0 -250 30 -210z" fill="#5A3A22"/><path d="M0 -170 L-10 -110 M0 -160 L40 -120" stroke="#5B7BD6" stroke-width="22" stroke-linecap="round"/><path d="M-10 -110 L${n2(-20 + 20 * Math.sin(w))} -60" stroke="#3A4A7A" stroke-width="14" stroke-linecap="round"/>`); } }
  // the ceiling fan turning
  s += `<path d="M1000 84 V126" stroke="#6E6A60" stroke-width="8"/>` + TF(1000, 136, 1, `<ellipse rx="210" ry="12" fill="#8C8272" transform="scale(${n2(Math.cos(t * 12))} 1)"/><ellipse rx="12" ry="210" fill="#8C8272" transform="scale(1 .06)"/><circle r="22" fill="#6E6A60"/>`);
  const ca = o.cicAt === undefined ? CICAT[(window._S || {}).name] : o.cicAt; if (ca) s += cicadaAt(t, ca[0], ca[1], ca[2], ca[3]);
  if (o.items0) s += o.items0;
  if (o.board !== false) s += lcdBoard(t, o);
  if (o.items) s += o.items;
  s += table18();
  // a pigeon walks past, now and then
  { const u = (t / 16) % 1, x = 2150 - 2600 * u, st = Math.sin(t * 9); if (x > -100 && x < 2100) s += TF(x, 1040 + 3 * Math.abs(st), 1, `<ellipse cx="0" cy="-30" rx="40" ry="26" fill="#8A90A8"/><circle cx="-36" cy="-58" r="16" fill="#7A809A"/><circle cx="-40" cy="-60" r="3.5" fill="#E0453A"/><path d="M-52 -56 l-10 4 l10 3" fill="#E9C46A"/><path d="M-4 -40 Q20 -50 40 -24" fill="#6E7490"/><path d="M${n2(-8 + 6 * st)} -6 v10 M${n2(8 - 6 * st)} -6 v10" stroke="#E0786A" stroke-width="4"/>`); }
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* ================================================================ THE GARDEN'S EDGE ================================================================ */
// EP17's lime-plant side (BG.lime17: the block and its void deck behind, the bench, the planter bed, the fence) + a planter of IXORA at the
// planter's right end, a low bush with small yellow flowers over the hen's straw nest, the lime plant in its big pot (small white flowers)
const NEST18 = [700, 905], BUSH18 = [660, 795], IXORA = [930, 720];
const IXCL = [[-80, -40], [-20, -70], [40, -50], [90, -20], [-50, 0], [20, -10], [70, 20]];
const ixoraArt = (t) => { const [x, y] = IXORA; let s = `<ellipse cx="${x}" cy="${y + 10}" rx="140" ry="74" fill="#2F7F48"/><ellipse cx="${x - 30}" cy="${y - 10}" rx="100" ry="54" fill="#3E9A5A"/>` + [...Array(14)].map((_, i) => `<g transform="translate(${n2(x - 120 + 240 * hash(i, 31))} ${n2(y - 40 + 80 * hash(i, 33))}) rotate(${n2(360 * hash(i, 35))})">${leaf15(40, 14, i % 2 ? "#2F7F48" : "#4FAE66", "#1E5E34")}</g>`).join("");
  IXCL.forEach(([dx, dy], j) => { const cx = x + dx + 1.5 * Math.sin(t * 1.2 + j), cy = y + dy; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, r = i ? 14 : 0, fx = cx + r * Math.cos(a), fy = cy + r * Math.sin(a) * .8;
    s += `<g transform="translate(${n2(fx)} ${n2(fy)})">${[0, 1, 2, 3].map((k) => `<ellipse cx="0" cy="-5" rx="3.6" ry="6" fill="${j % 2 ? "#F0502E" : "#F77A2A"}" transform="rotate(${k * 90 + 45})"/>`).join("")}<circle r="2" fill="#FFD75A"/></g>`; } });
  return s; };
const BUSHFL = [[-150, -40], [-80, -100], [0, -120], [90, -90], [160, -30], [-30, -60], [60, -40]];
const bushArt = (t) => { const [x, y] = BUSH18; return `<ellipse cx="${x}" cy="${y + 40}" rx="250" ry="60" fill="#2A6E3E"/>` + [[-150, 0, 110], [-40, -50, 130], [90, -20, 120], [180, 20, 90], [-210, 30, 80]].map(([dx, dy, r], i) => `<circle cx="${x + dx}" cy="${y + dy + 2 * Math.sin(t + i)}" r="${r}" fill="${["#2F7F48", "#3E9A5A", "#358A50", "#4FAE66", "#2A6E3E"][i]}"/>`).join("")
  + [...Array(18)].map((_, i) => `<g transform="translate(${n2(x - 220 + 440 * hash(i, 13))} ${n2(y - 130 + 150 * hash(i, 15))}) rotate(${n2(360 * hash(i, 17))})">${leaf15(34, 12, "#5FB56C", "#2A6E3E")}</g>`).join("")
  + BUSHFL.map(([dx, dy], i) => `<g transform="translate(${x + dx} ${y + dy})">${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="0" cy="-7" rx="5" ry="8" fill="#FFE27A" transform="rotate(${k * 72})"/>`).join("")}<circle r="4" fill="#F2A23A"/></g>`).join(""); };
// the lime plant's small white flowers (EP17's lime plant flowers now)
const LIMEFL = [[980, 470], [1290, 300], [1080, 250], [1400, 470], [1220, 610], [1350, 380]];
const limeFlowers = (t) => LIMEFL.map(([x, y], i) => `<g transform="translate(${n2(x + 2 * Math.sin(t * 1.1 + i))} ${y})">${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="0" cy="-9" rx="6" ry="10" fill="#FFFDF4" stroke="#D9D2C0" stroke-width="1.5" transform="rotate(${k * 72})"/>`).join("")}<circle r="5" fill="#F7E27A"/></g>`).join("");
// the honeybee's spot in each garden / void-deck scene [x, y, k, rot]: the INTRO (an ixora flower) only before and at the game's push-in
const BEEAT = { place: [IXORA[0] + 20, IXORA[1] - 76, .42, 0], game: [IXORA[0] + 20, IXORA[1] - 76, .42, 0],
  waitw: [BUSH18[0] + 90, BUSH18[1] - 104, .4, 0], eggans: [BENCHL[0] + 190, BENCHL[1] - 80, .4, 0], closure: [POTL[0] - 196, POTL[1] - 262, .4, 0], liz: [LIMEFL[3][0] + 6, LIMEFL[3][1] - 22, .42, -10] };
// VGE: the live garden's edge. o: lift / peck (the hen), eggs, bfly / egg (the lime plant), beeAt ([..] | false), items0, items (in front of
// the plant), front, dim, flowers (default true)
function VGE(t, o = {}, cam) { let s = bg("lime17") + clouds17(t, [[200, 90, 1], [1250, 60, .8], [1850, 150, .7]]);
  s += TF(1840 + 10 * Math.sin(t * .4), FENCE.y - 64 - hop(t % 2.3, 0, .3, 10), .9, bird15(t, 1, 1.3));
  if (o.items0) s += o.items0;
  s += ixoraArt(t) + TF(POTL[0] + 330, POTL[1] + 4, .9, canArt17());
  s += limePlant(t, { egg: o.egg === undefined ? false : o.egg, bfly: o.bfly, bites: -3, mothAt: false }) + (o.flowers === false ? "" : limeFlowers(t));
  s += bushArt(t) + TF(NEST18[0], NEST18[1], .95, henNest18(t, { lift: o.lift || 0, peck: o.peck || 0, hen: o.hen, eggs: o.eggs }));
  const ba = o.beeAt === undefined ? BEEAT[(window._S || {}).name] : o.beeAt; if (ba) s += beeAt(t, ba[0], ba[1], ba[2], ba[3]);
  if (o.items) s += o.items;
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// a flower-pot plate (a terracotta saucer of still water). origin = its middle
const plate18 = (t, o = {}) => `<ellipse cx="0" cy="18" rx="150" ry="34" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><ellipse cx="0" cy="0" rx="140" ry="40" fill="#C8643E" stroke="#8A3E22" stroke-width="6"/><ellipse cx="0" cy="-4" rx="118" ry="28" fill="${o.dry ? "#B4572F" : "#9FD0DE"}"/>` + (o.dry ? "" : `<ellipse cx="${n2(-20 + 10 * Math.sin(t))}" cy="-8" rx="40" ry="6" fill="#fff" opacity=".5"/>`);
// rain over a set (falling streaks) and the grey light; k 0..1
const rain18 = (t, k) => k < .02 ? "" : OP(k, `<rect x="-200" y="-120" width="2320" height="1320" fill="#5A6A8A" opacity=".28"/>` + [...Array(70)].map((_, i) => { const x = (hash(i, 3) * 2300 - 200 + t * 140) % 2300 - 200, y = ((hash(i, 5) + t * (1.4 + .4 * hash(i, 7))) % 1) * 1300 - 120; return `<path d="M${n2(x)} ${n2(y)} l-10 46" stroke="#E6F0FF" stroke-width="3" opacity=".6" stroke-linecap="round"/>`; }).join(""));

/* ================================================================ THE LOOK-CLOSERS ================================================================ */
// each art(t) is centred on (0, 0) inside +-830 x +-395 (the bottom 70 px are the verdict's)
const tPos = (cx, cy, R, n, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
// Part 1 · [LOOK CLOSER] the COMPARE FRAME: the frog's loop (three tiles) and the mosquito's loop (four tiles), the SAME and DIFFERENT strips
const CA = { fx: -400, mx: 400, y: -150, R: 172, rf: 78, rm: 70, same: 180, diff: 260 };
function compareArt(t) { const m = MK, tS = MKS("kw_similarities"), tD = MKS("kw_differences"), t1 = MKS("same1"), t2 = MKS("same2"), tc = MKS("count");
  const c = camSeq(t, [SCN.lccompare.t0, m("frame"), tS, t1, t2, tc, MKS("v_compare") - .2], [[0, 30, .96], [0, 0, 1], [0, 40, 1.03], [0, -30, 1.04], [0, -10, 1.03], [-100, -10, 1.04], [0, -20, .98]]);
  const fl = (j) => (i) => Math.max(i === 0 ? pulse(t, t1, .05, 2.4) : 0, i === 1 ? pulse(t, t2, .05, 2.4) : 0);
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#FFF8EA"/>`;
  s += TF(CA.fx, CA.y, 1, loopN(t, frogPic, 3, { R: CA.R, r: CA.rf, id: "caf", fl: fl(0), sw: 13 })) + TF(CA.mx, CA.y, 1, loopN(t, mPic, 4, { R: CA.R, r: CA.rm, id: "cam", fl: fl(1), sw: 13 }));
  s += TF(-700, -350, 1, tpill(0, 0, "the frog", 36, P.ink, "#fff", { w: 700 })) + TF(700, -350, 1, tpill(0, 0, "the mosquito", 36, P.ink, "#fff", { w: 700 }));
  // same1: a water drop joins the two egg tiles (green lines): both lay their eggs in water
  const e1 = tPos(CA.fx, CA.y, CA.R, 3, 0), e2 = tPos(CA.mx, CA.y, CA.R, 4, 0);
  if (t >= t1) { const k = spring(t, t1, .45), a = ramp(t, t1, .4); s += OP(a, `<path d="M${e1[0] + 80} ${e1[1]} L-50 ${e1[1] - 10} M50 ${e2[1] - 10} L${e2[0] - 74} ${e2[1]}" stroke="${SAMEC}" stroke-width="9" stroke-linecap="round" stroke-dasharray="18 12"/>`)
    + TF(0, e1[1] - 10, k, `<path d="M0 -50 Q38 0 28 22 Q14 48 -12 42 Q-38 30 -28 6 Q-18 -14 0 -50z" fill="#5BB8F0" stroke="#2E7AB8" stroke-width="5"/><circle cx="-8" cy="10" r="8" fill="#fff" opacity=".8"/>`); }
  // same2: each young beside its adult with an orange ≠ (the young do not look like the adult)
  if (t >= t2) { const y1 = tPos(CA.fx, CA.y, CA.R, 3, 1), a1 = tPos(CA.fx, CA.y, CA.R, 3, 2), y2 = tPos(CA.mx, CA.y, CA.R, 4, 1), a2 = tPos(CA.mx, CA.y, CA.R, 4, 3);
    s += eqDisc(t, t2 + .1, (y1[0] + a1[0]) / 2, y1[1] + 6, "≠", .8) + eqDisc(t, t2 + .3, (y2[0] + a2[0]) / 2, y2[1], "≠", .8); }
  // count: a hand stands ready at the frog's first tile (the egg); a ? waits on the DIFFERENT strip
  if (t >= tc) s += TF(e1[0] - 120, e1[1] + 20 + 6 * Math.sin(t * 4), spring(t, tc, .45) * .55, hand15({}), 20);
  // the strips (between the two faces' corners)
  [["SAME", "similarities", CA.same, SAMEC, tS], ["DIFFERENT", "differences", CA.diff, DIFFC, tD]].forEach(([lab, wd, y, col, tw0], j) => { const g = pulse(t, tw0, .05, 1.6), w = t >= tw0;
    s += (g > .02 ? `<rect x="-566" y="${y - 40}" width="1132" height="80" rx="22" fill="${P.sun}" opacity="${n2(.6 * g)}"/>` : "") + `<rect x="-560" y="${y - 34}" width="1120" height="68" rx="18" fill="${col}" opacity=".16" stroke="${col}" stroke-width="5"/>`
      + `<rect x="-560" y="${y - 34}" width="250" height="68" rx="18" fill="${col}"/>` + T(-435, y + (w ? -3 : 12), lab, lab.length > 4 ? 30 : 36, "#fff", { ls: 1 }) + (w ? OP(ramp(t, tw0, .3), T(-435, y + 26, wd, 24, "#fff", { w: 600 })) : ""); });
  s += stripChip(t, t1 + .5, -130, CA.same, 0, "eggs in water", 32) + stripChip(t, t2 + .6, 240, CA.same, 0, "young unlike the adult", 32);
  if (t >= tc) s += TF(0, CA.diff, spring(t, tc + .3, .45) * (1 + .06 * Math.sin(t * 5)), `<circle r="30" fill="#fff" stroke="${DIFFC}" stroke-width="5"/>` + T(0, 13, "?", 40, DIFFC));
  return inCam(c, s); }
// Part 1 · [LOOK CLOSER] the young beside their parents: the tadpole and the frog (left), the nymph and the grasshopper (right)
function youngArt(t) { const a = "k1102m", b = "k1103b", tT = MKS("tad"), tN = MKS("nymph"), t3 = MKS("same3"), tD = MKS("diff3");
  const c = camSeq(t, [SCN.lcyoung.t0, tT, tN, t3], [[0, 20, .97], [-300, 0, 1.08], [300, 0, 1.08], [0, 0, 1]]);
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#FFF8EA"/><rect x="-800" y="-260" width="770" height="470" rx="30" fill="#8FD3E0"/><rect x="-800" y="-260" width="770" height="60" rx="30" fill="#CFEFF6"/>`
    + `<rect x="30" y="-260" width="770" height="470" rx="30" fill="#E8F5DC"/><path d="M30 120 Q400 90 800 130 V210 H30z" fill="#9FD07A"/>`;
  // the frog's young: a tadpole (a tail, no legs, in water) beside the adult frog on a lily pad
  s += TF(-480, -60, 2.7, tadpole16(t, 0, { ph: .4 }), 4 * Math.sin(t * 2)) + `<ellipse cx="-150" cy="150" rx="150" ry="40" fill="#58B56C" stroke="#2F8048" stroke-width="5"/>` + TF(-150, 150, 1.5, frog16(t));
  s += lcLab(t, W(a, "tail") - .1, -690, -190, "a tail", -650, -60, { size: 40 }) + lcLab(t, W(a, "legs") - .1, -520, 110, "no legs", -480, -20, { size: 40 }) + lcLab(t, W(a, "water") - .1, -700, 150, "in water", -640, 60, { size: 40 })
    + eqDisc(t, W(a, "nothing") - .1, -310, -70, "≠", .9) + (t >= W(a, "nothing") - .1 ? TF(-330, -212, spring(t, W(a, "nothing"), .4), tpill(0, 0, "looks nothing like the adult", 28, DIFFC, "#fff", { w: 700 })) : "");
  // the grasshopper's young: a nymph (six legs, two feelers, no wings yet: smaller) beside the adult with long wings
  const nx = 200, ax = 560, gy = 110, nk = 1.15, ak = 1.5;
  s += TF(nx, gy, nk, hopper16(t, { ph: .3 })) + TF(ax, gy, ak, hopper16(t, { adult: true, ph: 1.4 }));
  s += lcLab(t, W(b, "six") - .1, 390, 200, "six legs", nx, gy - 18, { size: 40 }) + lcLab(t, W(b, "six") - .1, 390, 200, "six legs", ax - 10, gy - 22, { size: 40 })
    + lcLab(t, W(b, "feelers") - .1, 610, -215, "two feelers", nx + 150 * nk, gy - 135 * nk, { size: 40 }) + lcLab(t, W(b, "feelers") - .1, 610, -215, "two feelers", ax + 150 * ak, gy - 135 * ak, { size: 40 })
    + eqDisc(t, W(b, "just") - .1, 395, -100, "=", .9) + (t >= W(b, "just") - .1 ? TF(395, -178, spring(t, W(b, "just"), .4), tpill(0, 0, "looks like the adult", 28, SAMEC, "#fff", { w: 700 })) : "");
  if (t >= W(b, "wings") - .1) { const k = ramp(t, W(b, "wings") - .1, .4); s += OP(k, `<ellipse cx="${nx - 10}" cy="${gy - 70}" rx="95" ry="34" fill="none" stroke="${SAMEL}" stroke-width="5" stroke-dasharray="14 10"/>`) + lcLab(t, W(b, "wings"), 110, 210, "no wings yet", nx - 30, gy - 50, { size: 36, fill: "#fff", ink: SAMEL }); }
  s += stripChip(t, t3, 0, -340, 0, "both: 3 stages", 40) + stripChip(t, tD, 0, 268, 1, "the young: different", 40);
  return inCam(c, s); }
// Part 2 · [LOOK CLOSER] the chicken's loop: put your finger anywhere and follow the arrows round; day and night beside it
const LA = { x: -300, y: -40, R: 228, r: 100 };
const dayNight18 = (t, t0, k = 1) => { const rot = t > t0 ? (t - t0) * 28 : 0; let s = `<circle r="214" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="5"/>`;
  s += `<g transform="rotate(${n2(rot)})"><path d="M-200 0 A200 200 0 0 1 200 0z" fill="#8FD0F6"/><path d="M-200 0 A200 200 0 0 0 200 0z" fill="#1E2A5E"/>` + [...Array(8)].map((_, i) => `<circle cx="${n2(-150 + 300 * hash(i, 3))}" cy="${n2(30 + 140 * hash(i, 5))}" r="4" fill="#FFF6C8"/>`).join("")
    + `<g transform="translate(0 -110)"><circle r="46" fill="#FFC83A" stroke="#E39B00" stroke-width="5"/>${[...Array(8)].map((_, i) => `<path d="M0 -58 V-74" stroke="#FFC83A" stroke-width="8" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join("")}</g>`
    + `<g transform="translate(0 110) rotate(${n2(-rot)})"><path d="M10 -44 A44 44 0 1 0 10 44 A34 34 0 1 1 10 -44z" fill="#FFF3B0" stroke="#D9C56A" stroke-width="4"/></g></g>`;
  s += [0, 1].map((i) => `<path d="M${i ? 230 : -230} 0 A230 230 0 0 1 ${i ? -40 : 40} ${i ? 226 : -226}" fill="none" stroke="${P.leaf}" stroke-width="12" stroke-linecap="round" transform="rotate(${n2(i ? 0 : 0)})"/>`).join("")
    + `<g transform="translate(40 -226) rotate(10)"><path d="M-14 -18 L18 0 L-14 18z" fill="${P.leaf}"/></g><g transform="translate(-40 226) rotate(190)"><path d="M-14 -18 L18 0 L-14 18z" fill="${P.leaf}"/></g>`;
  return TF(0, 0, k, s + T(0, -150, "day", 30, "#fff") + T(0, 186, "night", 30, "#fff")); };
function loopArt(t) { const tF = MKS("finger"), tDN = MKS("daynight"), tR = MKS("kw_repeated"), tN = MKS("kw_no_first_or_last_stage");
  const c = camSeq(t, [SCN.lcloop.t0, tF, tDN, tR], [[0, 20, .96], [-200, -20, 1.08], [120, 0, 1.0], [0, 0, 1]]);
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#FFF8EA"/>`;
  // the finger's lap: from the chick (tile 1) round the arrows back to the chick (3.4 s), then from the hen (tile 2), round again
  const lap = (t0, i0, d) => { const u = clamp((t - t0) / d); if (t < t0) return null; const a0 = -Math.PI / 2 + i0 * 2 * Math.PI / 3, a = a0 + u * 2 * Math.PI; return { u, a0, a }; };
  const L1 = lap(tF, 1, 3.4), L2 = lap(tF + 3.8, 2, 2.2), L = L2 && t >= tF + 3.8 ? L2 : L1;
  if (L) { const big = L.u >= 1 ? pulse(t, (L === L2 ? tF + 6 : tF + 3.4), .05, 1.2) : 0, ex = LA.x + LA.R * Math.cos(L.a), ey = LA.y + LA.R * Math.sin(L.a);
    s += `<path d="M${n2(LA.x + LA.R * Math.cos(L.a0))} ${n2(LA.y + LA.R * Math.sin(L.a0))} A${LA.R} ${LA.R} 0 ${L.u > .5 ? 1 : 0} 1 ${n2(ex)} ${n2(ey)}" fill="none" stroke="${P.sun}" stroke-width="30" stroke-linecap="round" opacity=".55"/>`; }
  s += TF(LA.x, LA.y, 1, loopN(t, chickPic, 3, { R: LA.R, r: LA.r, id: "lac", sw: 15, run: tR, names: ["an egg", "a chick", "a hen"], lsize: 30, fl: (i) => L && L.u >= 1 ? pulse(t, L === L2 ? tF + 6 : tF + 3.4, .05, 1.2) * (i === (L === L2 ? 2 : 1) ? 1 : 0) : 0 }));
  if (L && t < tDN + 2.5) { const ex = LA.x + LA.R * Math.cos(L.a), ey = LA.y + LA.R * Math.sin(L.a); s += OP(1 - ramp(t, tDN + 2, .4), TF(ex - 60, ey + 18, .9, hand15({}), 0)); }
  if (L1 && L1.u >= 1 && t < tDN) s += TF(LA.x, LA.y + 10, spring(t, tF + 3.4, .45), tpill(0, 0, "back again!", 40, P.sun, P.ink, { w: 700 }));
  // repeated: the arrows run round (o.run) and a ↻ sits in the middle; no first or last stage: a "Stage 1" tag pops on the egg and is crossed out
  if (t >= tR) s += TF(LA.x, LA.y + 8, spring(t, tR, .45), `<circle r="56" fill="${P.leaf}"/><path d="M26 -20 A32 32 0 1 0 30 14" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M14 -34 L34 -20 L18 -6z" fill="#fff"/>`);
  if (t >= tN) { const e = tPos(LA.x, LA.y, LA.R, 3, 0), x2 = ss(tN + .7, tN + 1.1, t); s += TF(e[0] - 210, e[1] - 30, spring(t, tN, .45), tpill(0, 0, "Stage 1", 36, "#9A94A8", "#fff", { w: 700 }) + (x2 > .01 ? `<path d="M-80 -24 L${n2(-80 + 160 * x2)} ${n2(-24 + 48 * x2)} M80 -24 L${n2(80 - 160 * x2)} ${n2(-24 + 48 * x2)}" stroke="${DIFFC}" stroke-width="10" stroke-linecap="round"/>` : "")); }
  if (t >= tDN - .3) s += TF(470, -20, spring(t, tDN - .3, .5) * .92, dayNight18(t, tDN)) + TF(470, 250, spring(t, tDN, .45), tpill(0, 0, "day and night", 32, P.ink, "#fff", { w: 700 }));
  return inCam(c, s); }
// Part 2 · [LOOK CLOSER] the two larvae: the same four stages, still different (physical features)
function larvaeArt(t) { const b = "d904b", tP = MKS("pupa"), tw_ = MKS("wrig"), tm = MKS("meal");
  const c = camSeq(t, [SCN.lcbeetle.t0, tP, MKS("kw_physical_features"), tw_, tm], [[0, -40, 1.0], [0, -100, 1.04], [0, 10, 1.0], [-140, 20, 1.05], [140, 20, 1.05]]);
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#FFF8EA"/>`;
  // the band across the top: both loops, four tiles each, their dots, the chip
  s += TF(-560, -300, 1, loopN(t, mPic, 4, { R: 62, r: 28, id: "lbm", sw: 6 })) + TF(-370, -300, 1, tpill(0, -22, "mosquito", 26, "#fff", P.ink, { w: 700 }) + dots(0, 26, 4, 4, -1, 11))
    + TF(560, -300, 1, loopN(t, beetlePic, 4, { R: 62, r: 28, id: "lbb", sw: 6 })) + TF(350, -300, 1, tpill(0, -22, "mealworm beetle", 26, "#fff", P.ink, { w: 700 }) + dots(0, 26, 4, 4, -1, 11))
    + stripChip(t, tP, 0, -300, 0, "same number of stages", 32);
  // LEFT the wriggler hanging at the still water's surface (a cut-away); RIGHT the mealworm crawling on the bran
  s += `<rect x="-800" y="-200" width="770" height="440" rx="30" fill="#BFE7E0"/><rect x="-800" y="-200" width="770" height="80" rx="30" fill="#EAF6FF"/><path d="M-800 -124 H-30" stroke="#fff" stroke-width="8"/><path d="M-800 -124 H-30" stroke="#8FC8DE" stroke-width="3"/>`
    + TF(-420, -124, 1.6, wrig17(t, { lean: 16, wig: .25 })) + TF(-650, -124, .9, wrig17(t, { lean: 26, wig: .2, ph: 1 }));
  s += `<g clip-path="url(#lbBran)"><clipPath id="lbBran"><rect x="30" y="-200" width="770" height="440" rx="30"/></clipPath><rect x="30" y="-200" width="770" height="440" fill="#FFF3DC"/>` + [...Array(120)].map((_, j) => `<ellipse cx="${n2(40 + 750 * hash(j, 3))}" cy="${n2(20 + 220 * hash(j, 5))}" rx="9" ry="4.5" fill="${j % 2 ? "#D9BE86" : "#C9A86A"}" transform="rotate(${n2(180 * hash(j, 7))} ${n2(40 + 750 * hash(j, 3))} ${n2(20 + 220 * hash(j, 5))})"/>`).join("") + `</g>`
    + TF(340 + 8 * Math.sin(t * .8), 40, 1.6, mealworm18(t, { crawl: 1 }));
  s += lcLab(t, W(b, "thin") - .1, -170, -10, "thin", -500, 40, { size: 42, fill: WRIGC, ink: "#fff" }) + lcLab(t, W(b, "hangs") - .1, -430, -260, "hangs at the water surface", -420, -124, { size: 36, fill: WRIGC, ink: "#fff" })
    + lcLab(t, W(b, "golden") - .1, 380, -110, "golden and hard", 360, 20, { size: 40, fill: MEALC, ink: "#fff" }) + lcLab(t, W(b, "crawls") - .1, 560, 200, "crawls on land", 520, 90, { size: 38, fill: MEALC, ink: "#fff" })
    + eqDisc(t, tm + .4, 0, 30, "≠", 1);
  return inCam(c, s); }

/* ================================================================ THE JOURNEYS ================================================================ */
// the raindrop's own lens: the curved rim of the drop round the frame, a highlight, little drops sliding down its edge
const dropLens = (t) => `<radialGradient id="dlG" cx=".5" cy=".5" r=".72"><stop offset=".72" stop-color="#DDF2FF" stop-opacity="0"/><stop offset=".94" stop-color="#BFE3FA" stop-opacity=".55"/><stop offset="1" stop-color="#8FC8EA" stop-opacity=".85"/></radialGradient><rect width="1920" height="1080" fill="url(#dlG)"/>`
  + `<path d="M260 210 Q520 60 900 50" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" opacity=".5"/>` + [0, 1, 2].map((i) => { const u = ((t * .22 + i / 3) % 1), x = [120, 1800, 1700][i], y = 120 + 820 * u; return `<ellipse cx="${x}" cy="${n2(y)}" rx="9" ry="14" fill="#E6F6FF" opacity="${n2(.7 * (1 - u))}"/>`; }).join("");
// a leaf the riders sit on (bobbing along the bottom edge)
const riderLeaf = (t, x, y, k, fl) => TF(x, y + 5 * Math.sin(t * 1.3 + x), k * (fl ? -1 : 1), `<path d="M-250 30 Q-120 -46 60 -38 Q230 -20 260 30 Q120 84 -250 30z" fill="#4FAE66" stroke="#2A6E3E" stroke-width="6"/><path d="M-240 28 Q0 4 250 28" stroke="#2A6E3E" stroke-width="4" fill="none" opacity=".6"/>`, 0, k);
// BE A RAINDROP (Part 1): the camera IS the raindrop: the fall into the pond (frog eggs; tadpoles, speeded up; legs grow, the tail shrinks; a
// frog on a lily pad), the splash across the path into a flower-pot plate (tiny mosquito eggs; wrigglers hang at the surface; each curls into
// a pupa; a mosquito climbs out and flies)
function rainJourney(t, s) { const m = MK, tP = m("jpond"), tT = m("jtadpole"), tF = m("jfrog"), tS = m("jsplash"), tW = m("jwrig"), tU = m("jpupa"), tM = m("jmosq"); let o = "";
  if (t < tP) { // the fall: grey rain sky, drops streaking past (near ones big and fast), the pond rushing up from below
    const u = clamp((t - s.t0) / (tP - s.t0)), z = .3 + 2.6 * u * u;
    o += `<rect width="1920" height="1080" fill="#8E9DB8"/><rect y="${n2(600 - 400 * u)}" width="1920" height="1200" fill="#7FBF6A"/>` + TF(960, n2(760 - 120 * u), z, `<ellipse rx="420" ry="160" fill="url(#p16Water)" stroke="#BFB6A6" stroke-width="18"/>` + LILY.slice(0, 5).map(([x, y, r], i) => lilyPad(t, (x - 1040) * .5, (y - 800) * .6, r * .6, i)).join("") + TF(-40, -20, .5, eggClump(t, { n: 40, r: 11, R: 80 })));
    o += [...Array(26)].map((_, i) => { const sp = .6 + 1.4 * hash(i, 3), y = ((hash(i, 5) + t * sp) % 1) * 1300 - 150, x = 1920 * hash(i, 7); return `<path d="M${n2(x)} ${n2(y)} l0 ${n2(30 + 60 * sp)}" stroke="#E6F0FF" stroke-width="${n2(2 + 3 * sp)}" opacity=".7" stroke-linecap="round"/>`; }).join("");
    o += dip(t, tP, "#fff", .35); }
  else if (t < tS) { // in the pond: green-gold water, the surface above; the egg clump in its jelly; tadpoles; one grows legs; then up to the lily pad
    const up = eio((t - tF + .9) / 1.4), sy = lerp(110, 640, up);
    o += `<rect width="1920" height="1080" fill="#6FB89A"/><rect width="1920" height="${n2(sy)}" fill="#CFEFF6"/><rect y="${n2(sy - 6)}" width="1920" height="12" fill="#fff" opacity=".7"/>` + `<g opacity=".35">${uwRays(t, "#F6F0C0", .1)}</g>`;
    if (up > .02) o += OP(up, `<rect width="1920" height="${n2(sy - 6)}" fill="#BFE6FF"/><rect y="${n2(sy - 160)}" width="1920" height="160" fill="#7FBF6A"/>` + LILY.slice(0, 3).map(([x, y, r], i) => lilyPad(t, 300 + i * 600, sy - 10, r * 1.6, i)).join(""));
    const eg = 1 - ss(tT, tT + 1.6, t), dy = -500 * up;
    o += OP(.4 + .6 * eg, TF(1080, 560 + dy, 3.2, eggClump(t, { n: Math.round(14 + 40 * eg), r: 11, R: 92 })));
    for (let i = 0; i < 5; i++) { const k = ss(tT + .2 * i, tT + .2 * i + .8, t); if (k < .02 || i === 0) continue; const u = ((t - tT) * .07 + hash(i, 3)) % 1; o += OP(k * (1 - up), TF(300 + 1300 * u, 380 + 420 * hash(i, 9) + 30 * Math.sin(t * 2 + i) + dy, 1.6, tadpole16(t, 0, { ph: i }), 10 * Math.sin(t * 3 + i))); }
    if (t >= tT) { const st = t < tT + 2.6 ? 0 : t < tT + 4.6 ? 1 : 2, gx = lerp(1300, 900, ss(tT, tT + 2, t)), k = ss(tT, tT + .8, t);
      o += OP(k * (1 - up), TF(gx + 30 * Math.sin(t * 1.4), 620 + 20 * Math.sin(t * 2), 3.1, tadpole16(t, st, {}), -8)) + (t >= tT + 2.6 && t < tF ? TF(gx - 120, 400, spring(t, tT + 2.6, .4), tpill(0, 0, st === 1 ? "legs grow" : "the tail shrinks", 40, "#fff", P.ink, { w: 700 })) : ""); }
    if (up > .02) o += TF(960, sy - 10 - 40 * up, 2.0 * up, `<ellipse cx="0" cy="0" rx="160" ry="44" fill="#58B56C" stroke="#2F8048" stroke-width="5"/>` + TF(0, 0, 1, frog16(t, { hop: hop(t, tF, .5) })));
    o += [...Array(8)].map((_, i) => { const u = ((t * .4 + hash(i, 2)) % 1); return `<circle cx="${n2(200 + 1500 * hash(i, 4))}" cy="${n2(1000 - 900 * u)}" r="${n2(6 + 6 * hash(i, 6))}" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(.6 * (1 - u) * (1 - up))}"/>`; }).join("");
    o += dip(t, tS, "#fff", .3); }
  else { // the splash: an arc across the path, then into the flower-pot plate: the still water's surface (sky and the plate's rim above,
    // the water below): tiny eggs; wrigglers hang head-down; each curls into a pupa; a mosquito climbs out and flies away
    const a = clamp((t - tS) / .9), surf = 520;
    if (a < 1) { o += `<rect width="1920" height="1080" fill="#BFE6FF"/><rect y="${n2(700 - 300 * Math.sin(Math.PI * a))}" width="1920" height="700" fill="#7FBF6A"/><rect x="${n2(-400 + 1600 * a)}" y="${n2(760 - 300 * Math.sin(Math.PI * a))}" width="700" height="200" fill="#EAD9B8"/>`
      + [...Array(10)].map((_, i) => `<circle cx="${n2(960 + 600 * (hash(i, 3) - .5) * a)}" cy="${n2(540 + 400 * (hash(i, 5) - .5) * a)}" r="${n2(10 + 20 * hash(i, 7))}" fill="#EAF6FF" opacity="${n2(1 - a)}"/>`).join(""); }
    else { o += `<rect width="1920" height="${surf}" fill="#CFE8F6"/><path d="M-50 ${surf - 60} Q960 ${surf - 210} 1970 ${surf - 60} L1970 ${surf} L-50 ${surf}z" fill="#C8643E" stroke="#8A3E22" stroke-width="10"/><rect y="${surf}" width="1920" height="${1080 - surf}" fill="#A9D6DE"/><rect y="${surf - 4}" width="1920" height="10" fill="#fff" opacity=".8"/>`
      + `<path d="M-50 1080 Q960 900 1970 1080" fill="#B4572F" opacity=".5"/>`;
      // tiny eggs float on the surface; then wrigglers hang head-down; each curls into a pupa; a mosquito climbs out of one and flies
      const X = [520, 960, 1400], eg = 1 - ss(tW - .4, tW + .6, t);
      if (eg > .02) o += OP(eg, X.map((x, i) => TF(x, surf - 2, 3.2, mEggs17(1, 6 + i))).join(""));
      X.forEach((x, i) => { const ti = tU + .35 * i, wv = t >= tW + .2 * i && t < ti, pu = t >= ti;
        if (wv) o += TF(x, surf + 2, 1.5 * spring(t, tW + .2 * i, .5), wrig17(t, { lean: 18, wig: .3, ph: i }));
        if (pu && !(i === 1 && t >= tM)) o += TF(x, surf + 2, 1.7 * (t < ti + .25 ? .8 + .2 * spring(t, ti, .4) : 1), mpupa17(t, { roll: 5 * Math.sin(t * 1.5 + i) }));
        if (pu && i === 1 && t >= tM) o += OP(1 - ramp(t, tM + .6, .4), TF(x, surf + 2, 1.7, mpupa17(t, {}), 0)) + (() => { const u = clamp((t - tM) / 3.2); return TF(lerp(x, x + 500, u * u), lerp(surf - 30, 220, eo(u)) + 20 * Math.sin(t * 5), 1.6, mosq17(t, { wing: u > .15 ? 1 : 0 })); })(); });
      o += `<g opacity=".25">${uwRays(t, "#fff", .1)}</g>`; }
    o += dip(t, tS + .9, "#fff", .25); }
  return o + dropLens(t); }
// the mother hen's head (EP16's hen16 head, at its own origin), for the chick's view of her friendly face
const hen16Head = (t) => `<path d="M-10 -36 q4 -16 12 -6 q6 -18 14 -4 q8 -14 12 4 q4 10 -6 14z" fill="#E0402E" stroke="#9A2A1E" stroke-width="3" stroke-linejoin="round"/><circle cx="6" cy="-10" r="28" fill="#B5652E" stroke="#6E3814" stroke-width="4"/><path d="M30 -16 L52 -8 L30 0z" fill="#F2B23A" stroke="#B8761C" stroke-width="3" stroke-linejoin="round"/><path d="M26 2 q8 16 -2 20 q-8 -8 -4 -18z" fill="#E0402E" stroke="#9A2A1E" stroke-width="2.5"/>${eye16(14, -16, 7, { shut: blink16(t, .7), white: "#FFE7A8" })}<circle cx="20" cy="2" r="5" fill="#FFB4A0" opacity=".6"/>`;
// your own little wings at the frame's edges (fluffy and yellow as a chick, brown feathers as a hen: f 0..1)
const myWings = (t, f, k = 1) => { const col = hexL("#FFF1A8", "#A8602A", f), ln = hexL("#D9B44A", "#6E3814", f), fl = 6 * Math.sin(t * 2.2);
  const wing = (sx) => TF(sx > 0 ? 0 : 1920, 1080, k, `<g transform="scale(${sx} 1) rotate(${n2(fl)})"><path d="M0 0 Q120 -340 330 -300 Q300 -180 250 -120 Q210 -60 150 0z" fill="${col}" stroke="${ln}" stroke-width="7"/>${[0, 1, 2, 3].map((i) => `<path d="M${60 + i * 50} -${40 + i * 40} Q${120 + i * 50} -${120 + i * 40} ${200 + i * 30} -${170 + i * 26}" stroke="${ln}" stroke-width="5" fill="none" opacity="${n2(.3 + .6 * f)}"/>`).join("")}${f < .5 ? [...Array(7)].map((_, i) => `<circle cx="${80 + i * 34}" cy="${-60 - i * 34}" r="26" fill="${col}" opacity="${n2(1 - 2 * f)}"/>`).join("") : ""}</g>`);
  return wing(1) + wing(-1); };
// straw all round the nest (seen from inside it)
const strawRing = (t, k = 1) => [...Array(60)].map((_, i) => { const a = hash(i, 3) * Math.PI * 2, r = 560 + 260 * hash(i, 5), x = 960 + r * Math.cos(a) * 1.3, y = 640 + r * Math.sin(a) * .9, l = 120 + 90 * hash(i, 7);
  return `<path d="M${n2(x)} ${n2(y)} q${n2(l * .5)} ${n2(-l * .3 + 6 * Math.sin(t + i))} ${n2(l)} ${n2(-l * .1)}" stroke="${i % 3 ? "#D9B86A" : "#B8944A"}" stroke-width="${n2(10 * k)}" fill="none" stroke-linecap="round"/>`; }).join("");
// BE AN EGG (Part 2): under the hen's warm feathers; crack! a fluffy chick (your own little wings), the hen's big face; you grow (speeded up),
// feathers grow; an adult hen; one morning a new egg lies under you; the golden circle of arrows round it
function eggJourney18(t, s) { const m = MK, tE = m("jegg"), tH = m("jhatch"), tC = m("jchick"), tA = m("jhen"), tL = m("jlay"), tG = m("jagain"); let o = "";
  if (t < tH + .5) { // inside the nest, under the hen: warm golden light through the feathers, straw all round, two eggs like hills
    const bob = 6 * Math.sin(t * 1.2), g = ss(s.t0, tE, t);
    o += `<rect width="1920" height="1080" fill="#3A2412"/>` + OP(g, `<radialGradient id="ejG" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#FFE9A8"/><stop offset=".6" stop-color="#E8A04A"/><stop offset="1" stop-color="#7A4416"/></radialGradient><rect width="1920" height="1080" fill="url(#ejG)"/>`);
    o += [...Array(14)].map((_, i) => { const x = -100 + i * 160, y = lerp(-400, -60, g) + 40 * Math.sin(i * 1.7) + bob; return `<path d="M${x} ${n2(y)} Q${x + 80} ${n2(y + 260)} ${x + 180} ${n2(y + 40)} Q${x + 90} ${n2(y + 120)} ${x} ${n2(y)}z" fill="${i % 2 ? "#9A5222" : "#B5652E"}" stroke="#6E3814" stroke-width="5" opacity=".95"/><path d="M${x + 20} ${n2(y + 30)} Q${x + 80} ${n2(y + 150)} ${x + 150} ${n2(y + 50)}" stroke="#FFD58A" stroke-width="4" fill="none" opacity=".5"/>`; }).join("");
    o += strawRing(t) + `<ellipse cx="${n2(240 + bob)}" cy="880" rx="300" ry="230" fill="#FFF3DC" stroke="#D9C9A8" stroke-width="8"/><ellipse cx="${n2(150 + bob)}" cy="800" rx="70" ry="40" fill="#fff" opacity=".6"/><ellipse cx="${n2(1700 - bob)}" cy="900" rx="320" ry="240" fill="#FFF3DC" stroke="#D9C9A8" stroke-width="8"/><ellipse cx="${n2(1600 - bob)}" cy="810" rx="70" ry="40" fill="#fff" opacity=".6"/>`;
    // your own shell round the frame's lower edge
    o += `<path d="M-40 1100 Q960 860 1960 1100z" fill="#FFF6E6" stroke="#D9C9A8" stroke-width="10"/>`;
    if (t >= tH) { const u = clamp((t - tH) / .45); o += [...Array(6)].map((_, i) => { const a = i / 6 * Math.PI * 2 + .3, r = 900 * u; let d = `M960 560`; for (let k = 1; k <= 6; k++) d += ` L${n2(960 + Math.cos(a + (k % 2 ? .12 : -.12)) * r * k / 6)} ${n2(560 + Math.sin(a + (k % 2 ? .12 : -.12)) * r * k / 6)}`; return `<path d="${d}" stroke="#fff" stroke-width="12" fill="none" stroke-linejoin="round"/>`; }).join("") + `<rect width="1920" height="1080" fill="#FFFBEA" opacity="${n2(ss(tH + .25, tH + .5, t))}"/>`; } }
  else { // outside: the garden's edge, morning; you are a chick, then you grow (the world gets smaller round you), an adult hen
    const gr = ss(tC + 1.4, tA, t), lay = ss(tL - .4, tL + .8, t), gl = ss(tG - .2, tG + 1.6, t), z = lerp(1.7, 1.0, gr) * lerp(1, 1.6, lay) * lerp(1, 1.9, gl), cy = lerp(620, 760, lay);
    const world = VGE(t, { beeAt: false, hen: false, eggs: lay > .3 ? 1 : 2, flowers: true }, [z, lerp(NEST18[0] + 40, (z * (NEST18[0] - 38) - 960) / Math.max(.01, z - 1), lay), lerp(lerp(760, 800, gr), (z * (NEST18[1] - 34) - 560) / Math.max(.01, z - 1), lay)]);
    o += world + `<rect width="1920" height="1080" fill="#FFF3DC" opacity="${n2(.12 * (1 - gr))}"/>`;
    // the mother hen's big friendly face above you (a chick); she steps back as you grow
    if (t < tA) { const hk = lerp(3.6, 2.4, gr), nod = 6 * Math.sin(t * 1.6); o += OP(1 - ss(tA - 1.2, tA, t), TF(lerp(1560, 1780, gr), lerp(250, 150, gr), hk, `<g transform="scale(-1 1) rotate(${n2(35 + nod)})"><ellipse cx="20" cy="120" rx="110" ry="100" fill="url(#p16Hen)" stroke="#6E3814" stroke-width="4"/><path d="M-10 20 Q0 60 30 70 Q50 40 30 10z" fill="#B5652E"/>${hen16Head(t)}</g>`)); }
    // the grain you peck at (speeded up)
    if (t < tL) o += [...Array(10)].map((_, i) => `<ellipse cx="${n2(700 + 520 * hash(i, 3))}" cy="${n2(900 + 120 * hash(i, 5))}" rx="9" ry="6" fill="#F2D28A" stroke="#B88A3A" stroke-width="2" opacity="${n2(1 - gr * .7)}"/>`).join("");
    o += myWings(t, gr, lerp(.9, 1.1, gr) * (1 - .4 * gl));
    if (gl > .01) { const R = 430, sw = 26, run = (t - tG) * 50; o += OP(gl, `<circle cx="960" cy="560" r="${R}" fill="none" stroke="${P.sun}" stroke-width="${sw + 14}" opacity=".35"/><circle cx="960" cy="560" r="${R}" fill="none" stroke="${P.sun}" stroke-width="${sw}" stroke-dasharray="${n2(2 * Math.PI * R * gl)} 4000" transform="rotate(-90 960 560)"/>`
      + [...Array(6)].map((_, i) => { const a = (i * 60 + run) * Math.PI / 180; return `<g transform="translate(${n2(960 + R * Math.cos(a))} ${n2(560 + R * Math.sin(a))}) rotate(${n2(i * 60 + run + 90)})"><path d="M-22 -26 L30 0 L-22 26z" fill="${P.sun}" stroke="#C98A00" stroke-width="4"/></g>`; }).join("")); } }
  return o; }

/* ================================================================ BOARDS, SHEETS AND PROPS ================================================================ */
// a low easel with a big paper sheet (origin = the easel's feet on the floor; the sheet 700 x 760 at k 1)
const easel18 = (inner, o = {}) => `<ellipse cx="0" cy="6" rx="330" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-250 0 L-200 -940 M250 0 L200 -940 M0 -20 L0 -900" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><rect x="-340" y="-150" width="680" height="22" rx="8" fill="#7A4A26"/>`
  + `<g filter="url(#drop)"><rect x="-350" y="-920" width="700" height="760" rx="20" fill="${o.paper || "#FFFDF6"}" stroke="#D9C9A8" stroke-width="6"/></g>` + `<path d="M-350 -${o.lines ? 640 : 9999} H350" stroke="#E3D6BE"/>` + inner;
// Pip's own sheet (HOLD ON!): the frog's loop and the grasshopper's loop side by side, a big = and his title THE SAME!, the green chip 3 stages;
// after the countdown an empty orange chip "the young?" beside the =. o.young (t), o.lit (0..1: the = pulses)
const pipSheet = (t, o = {}) => easel18(T(0, -850, "THE SAME!", 56, P.pip, { ls: 2 }) + TF(-170, -620, 1, loopN(t, frogPic, 3, { R: 98, r: 48, id: "psf", sw: 8 })) + TF(170, -620, 1, loopN(t, hopPic, 3, { R: 98, r: 48, id: "psh", sw: 8 }))
  + T(-170, -470, "frog", 30, P.ink) + T(170, -470, "grasshopper", 30, P.ink) + TF(0, -620, 1 + .15 * (o.lit || 0), `<circle r="48" fill="${SAMEC}" stroke="#fff" stroke-width="5"/>` + T(0, 26, "=", 76, "#fff"))
  + TF(0, -360, 1, tpill(0, 0, "3 stages", 40, SAMEC, "#fff", { w: 700 })) + (o.young !== undefined && t >= o.young ? TF(0, -252, spring(t, o.young, .45), tpill(0, 0, "the young?", 40, DIFFC, "#fff", { w: 700 }) + `<path d="M0 -40 V-300" stroke="${DIFFC}" stroke-width="5" stroke-dasharray="10 8"/>`) : ""));
// Momo's homework (the Showdown): "The mosquito and the mealworm beetle", the two loops small at the top (the beetle's pupa tile faint), three
// ruled lines with a small drawing each; o.lit [l1, l2, l3] 0..1, o.strike / o.fix 0..1 (line 3 struck, rewritten in green), o.pupa 0..1 (the
// faint pupa tile glows bright)
const HW18 = ["1  In both, the young do not look like the adult.", "2  The mosquito larva lives near the water surface, but the beetle larva lives on land.", "3  The mosquito has four stages, but the beetle has three."];
const momoSheet = (t, o = {}) => { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0, pu = o.pupa || 0; let s = T(0, -862, "The mosquito and the mealworm beetle", 34, P.momo);
  s += TF(-170, -720, 1, loopN(t, mPic, 4, { R: 64, r: 30, id: "msm", sw: 6 })) + TF(170, -720, 1, loopN(t, beetlePic, 4, { R: 64, r: 30, id: "msb", sw: 6, faint: [0, 0, 1 - pu, 0], fl: (i) => i === 2 ? pu * (.6 + .4 * Math.sin(t * 6)) : 0 }))
    + T(-170, -612, "mosquito", 24, P.ink) + T(170, -612, "mealworm beetle", 24, P.ink);
  const Y = [-540, -420, -280];
  HW18.forEach((txt, i) => { const y = Y[i], ls = wrap(txt, 30, 430, 600), g = lit[i];
    s += (g > .02 ? `<rect x="-340" y="${y - 40}" width="680" height="${ls.length * 38 + 36}" rx="12" fill="${P.sun}" opacity="${n2(.45 * g)}"/>` : "") + `<path d="M-330 ${y + ls.length * 38 - 4} H330" stroke="#B9C4D0" stroke-width="3"/>`
      + ls.map((l, j) => `<text x="-330" y="${y + j * 38}" font-family="Fredoka" font-weight="600" font-size="30" fill="${P.ink}">${esc(l)}</text>`).join(""); });
  // the small drawings at the right of each line
  s += TF(240, -575, .3, wrig17(t, { lean: 20 })) + TF(305, -540, .38, mosq17(t, {})) + TF(260, -420, .25, mealworm18(t, {})) + TF(260, -290, 1, dots(0, 0, 4, 4, -1, 9) + dots(0, 30, 3, 3, -1, 9));
  if (st > .01) s += `<path d="M-330 -290 L${n2(-330 + 660 * st)} -290 M-330 -252 L${n2(-330 + 500 * st)} -252" stroke="${DIFFC}" stroke-width="7" stroke-linecap="round"/>`;
  if (fx > .01) { const ls = wrap("Both have four stages: the egg, the larva, the pupa and the adult.", 30, 640, 600); s += OP(fx, `<rect x="-340" y="-226" width="680" height="${ls.length * 38 + 20}" rx="12" fill="#E2F6E6"/>` + ls.map((l, j) => `<text x="-330" y="${-196 + j * 38}" font-family="Fredoka" font-weight="600" font-size="30" fill="${SAMEL}">${esc(l)}</text>`).join("")); }
  return easel18(s); };
// the class mealworm tub (a small clear tub of oat bran, mealworms in it, the lid with air holes) and a card of a jar of still water with a
// wriggler drawn on it. origin = the tub's bottom middle
const tub18 = (t, o = {}) => { let s = `<ellipse cx="0" cy="6" rx="190" ry="22" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-170 0 L-185 -160 H185 L170 0z" fill="#EAF6FF" fill-opacity=".45" stroke="#8FB8D0" stroke-width="5"/>`;
  s += `<path d="M-168 -4 L-178 -100 H178 L168 -4z" fill="#E3C98E"/>` + [...Array(50)].map((_, j) => `<ellipse cx="${n2(-160 + 320 * hash(j, 3))}" cy="${n2(-90 + 84 * hash(j, 5))}" rx="7" ry="3.5" fill="${j % 2 ? "#D9BE86" : "#B8945A"}"/>`).join("");
  s += [[-90, -70, 0], [10, -50, 1], [100, -80, 2]].map(([x, y, i]) => TF(x, y, .38, mealworm18(t + i, { crawl: 1 }), i * 20 - 20)).join("");
  s += `<path d="M-180 -100 H180" stroke="#8FB8D0" stroke-width="3" opacity=".6"/><rect x="-196" y="-186" width="392" height="30" rx="10" fill="#5FB7C9" stroke="#2E7A8A" stroke-width="5"/>` + [...Array(9)].map((_, i) => `<circle cx="${-150 + i * 38}" cy="-171" r="5" fill="#2E7A8A"/>`).join("");
  return s; };
const jarCard18 = (t) => `<g filter="url(#dropS)"><rect x="-130" y="-170" width="260" height="300" rx="18" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="5"/></g><path d="M-70 -110 H70 V90 Q70 110 50 110 H-50 Q-70 110 -70 90z" fill="#DDF3FF" stroke="#8FB8D0" stroke-width="5"/><rect x="-70" y="-80" width="140" height="190" fill="#BFE7E0"/><path d="M-70 -80 H70" stroke="#fff" stroke-width="5"/>`
  + TF(0, -80, .5, wrig17(t, { lean: 18, wig: .2 })) + T(0, 150, "still water", 26, WRIGC) + T(0, -128, "a picture", 22, "#9A94A8", { w: 600 });
// the OUR CYCLES THEME board (Part 2 closure: the Cycles theme closes): C1 to C3 and their answers, lit one by one. origin = its feet
const THEME = [["C1. What makes up a cycle?", "a repeated pattern of change"], ["C2. How does a cycle help us predict events and processes?", "we know what comes next (night after day; a pupa after a wriggler)"], ["C3. Why are cycles important to life?", "living things of the same kind can continue"]];
const themeBoard = (t, lit = [0, 0, 0]) => { let s = `<ellipse cx="0" cy="6" rx="300" ry="18" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-220 0 L-190 -110 M220 0 L190 -110" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-400" y="-820" width="800" height="720" rx="28" fill="url(#gPaper)" stroke="#C9A974" stroke-width="8"/></g>` + T(0, -760, "OUR CYCLES THEME", 44, P.ink, { ls: 3 });
  THEME.forEach(([q, a], i) => { const y = -680 + i * 200, k = lit[i], ql = wrap(q, 30, 720, 700), al = wrap("→ " + a, 30, 700, 600);
    s += ql.map((l, j) => `<text x="-370" y="${y + j * 34}" font-family="Fredoka" font-weight="700" font-size="30" fill="${P.ink}">${esc(l)}</text>`).join("")
      + OP(.25 + .75 * k, (k > .05 ? `<rect x="-380" y="${y + ql.length * 34 - 26}" width="760" height="${al.length * 34 + 16}" rx="12" fill="#E2F6E6"/>` : "") + al.map((l, j) => `<text x="-360" y="${y + ql.length * 34 + 4 + j * 34}" font-family="Fredoka" font-weight="600" font-size="30" fill="${SAMEL}">${esc(l)}</text>`).join("")); });
  return s; };
// a young lime plant in a small pot (for the picture model). origin = the pot's bottom
const smallLime = (k = 1) => TF(0, 0, k, `<path d="M-40 0 L-48 -60 H48 L40 0z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="4"/><path d="M0 -60 V-150" stroke="#7A5230" stroke-width="7"/>` + [[-1, -100], [1, -120], [-1, -140], [1, -84]].map(([d, y], i) => `<g transform="translate(0 ${y}) rotate(${d > 0 ? -30 : 210})">${leaf15(56, 22, i % 2 ? "#3E9E5A" : "#58B56C", "#2A6E3E")}</g>`).join(""));
// the picture model (Momo's line): the butterfly loop beside a row of lime plants; with too few plants the tiles dim; new plants, it glows
const fewerModel = (t, tf, tp) => { const gone = [0, 1, 2, 3].map((i) => ss(tf + .5 * i, tf + .5 * i + .5, t) * (1 - ss(tp + .2 * i, tp + .2 * i + .4, t))), dim = Math.max(...gone) * (1 - ss(tp, tp + .6, t)), gl = t >= tp ? pulse(t, tp + .9, .05, 2) : 0;
  let s = `<g filter="url(#drop)"><rect x="-430" y="-250" width="860" height="500" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>` + TF(-210, -10, 1, loopN(t, bPic, 4, { R: 120, r: 54, id: "fwb", sw: 9, dim: [dim * .9, dim * .9, dim * .9, dim * .9], fl: () => gl }))
    + T(-210, 220, "the butterfly", 30, P.ink);
  [0, 1, 2, 3].map((i) => { s += OP(1 - .85 * gone[i], TF(120 + (i % 2) * 150, -40 + Math.floor(i / 2) * 200, 1, smallLime(.95))); });
  s += T(195, 220, "lime plants", 30, P.ink);
  return s; };
// the dare (into EP19): Basil's red-and-blue bar magnet, a steel pin, a short piece of copper wire. origin = their middle
const magnet18 = (k = 1) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-120" y="-34" width="120" height="68" rx="10" fill="#E0453A" stroke="#9A2A1E" stroke-width="5"/><rect x="0" y="-34" width="120" height="68" rx="10" fill="#3A6ADB" stroke="#1E3E8A" stroke-width="5"/></g>` + T(-60, 16, "N", 44, "#fff") + T(60, 16, "S", 44, "#fff"));
const pin18 = (k = 1) => TF(0, 0, k, `<path d="M-110 0 H96" stroke="#9AA4B4" stroke-width="10" stroke-linecap="round"/><path d="M-110 -3 H90" stroke="#E8EEF6" stroke-width="3"/><path d="M96 -6 L124 0 L96 6z" fill="#9AA4B4"/><circle cx="-116" cy="0" r="14" fill="#C9D2DE" stroke="#7A8798" stroke-width="4"/>`);
const wire18 = (k = 1) => TF(0, 0, k, `<path d="M-110 10 Q-60 -26 -10 4 Q40 34 110 -6" stroke="#C8723A" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M-106 6 Q-60 -24 -12 0 Q40 28 106 -10" stroke="#F2A86A" stroke-width="4" fill="none" stroke-linecap="round"/>`);
const darePic3 = (i) => `<rect x="-200" y="-140" width="400" height="280" fill="#EAF3F7"/>` + (i === 0 ? TF(0, 0, 1.3, pin18()) : i === 1 ? TF(0, 0, 1.3, wire18()) : TF(0, -50, 1.05, pin18()) + TF(0, 60, 1.05, wire18()));
// Part 2 Round 1's three card pictures (the egg · the chicken · neither: it goes round) and the ring's picture (the hen on her nest, eggs showing)
const r1Pic18 = (i, t) => `<rect x="-200" y="-140" width="400" height="280" fill="${i === 2 ? "#FFF8EA" : "#FFF0D6"}"/>` + (i === 0 ? `<ellipse cx="0" cy="10" rx="74" ry="96" fill="#FFF6E6" stroke="#D9C9A8" stroke-width="7"/><ellipse cx="-22" cy="-30" rx="18" ry="12" fill="#fff"/>`
  : i === 1 ? TF(0, 120, 1.15, hen16(t, { peck: peckAt(t, 1) })) : TF(0, 0, 1, loopN(t, chickPic, 3, { R: 90, r: 44, id: "r1l", sw: 8 })));
const ringHen18 = (t) => `<circle cx="430" cy="470" r="180" fill="#E8F5DC"/>` + TF(440, 560, 1.15, henNest18(t, { lift: .55 + .1 * Math.sin(t * 1.5) }));
// Part 1 Round 1's ring picture: the frog's loop and the mosquito's loop side by side (three tiles, four tiles)
const ringLoops18 = (t) => `<circle cx="430" cy="470" r="180" fill="#FFF8EA"/>` + TF(345, 470, 1, loopN(t, frogPic, 3, { R: 58, r: 30, id: "rlf", sw: 6 })) + TF(520, 470, 1, loopN(t, mPic, 4, { R: 58, r: 27, id: "rlm", sw: 6 })) + T(345, 568, "frog", 24, P.ink) + T(520, 568, "mosquito", 24, P.ink);
// the chant board: the COMPARE FRAME above, the chicken's loop below; each line flashes its own part
const chantBoard18 = (t, f) => { let s = `<g filter="url(#drop)"><rect x="-330" y="-440" width="660" height="880" rx="30" fill="url(#gPaper)" stroke="#C9A974" stroke-width="7"/></g>`;
  s += TF(0, -190, .62, compareFrame(t, { id: "chf", glow: [f[0], f[0]], same: [[0, "eggs in water"], [0, "young unlike the adult"]], diff: [[0, "the number of stages"]], dots: f[1] > .05 ? [0, 0] : null, lit: [() => f[1], () => f[1]] }));
  s += TF(0, 230, 1, (f[2] > .05 ? `<circle r="${n2(170 + 20 * f[2])}" fill="${P.sun}" opacity="${n2(.5 * f[2])}"/>` : "") + loopN(t, chickPic, 3, { R: 120, r: 54, id: "chc", sw: 10, run: f[2] > .05 ? t - 1 : undefined }));
  return s; };
// the cicada's three stages (the fun fact): eggs on a twig, a nymph, an adult
const cicPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/><path d="M-120 40 L120 -20" stroke="#7A5230" stroke-width="22" stroke-linecap="round"/>` + [...Array(6)].map((_, j) => `<ellipse cx="${-60 + j * 22}" cy="${n2(22 - j * 5.5)}" rx="6" ry="10" fill="#FFF6D0" stroke="#C9B07A" stroke-width="2" transform="rotate(-14 ${-60 + j * 22} ${n2(22 - j * 5.5)})"/>`).join("")
  : i === 1 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E9D2B0"/>` + TF(-10, 60, .95, cicNymph18(t)) : `<rect x="-110" y="-110" width="220" height="220" fill="#DCEFFB"/>` + TF(0, 6, 1.15, cicada18(t, {}), 90);
// the fun-fact pictures (common.js funFact: each draws inside -w/2..w/2 x -h/2..h/2)
const ffThree18 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF8EA"/>` + TF(-w / 4 + 6, -10, 1, loopN(t, cicPic, 3, { R: 64, r: 34, id: "ffc", sw: 6 })) + TF(w / 4 - 6, -10, 1, loopN(t, hopPic, 3, { R: 64, r: 34, id: "ffh", sw: 6 }))
  + T(-w / 4 + 6, 110, "cicada", 26, P.ink) + T(w / 4 - 6, 110, "grasshopper", 26, P.ink) + eqDisc(t, MK("ff_three") + .3, 0, -10, "=", .5);
const ffUnder18 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#8A5A36"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="60" fill="#8FD0F6"/><rect x="${-w / 2}" y="${-h / 2 + 50}" width="${w}" height="16" fill="#58B56C"/>`
  + `<path d="M-20 ${-h / 2 + 60} Q-40 -40 -120 40 M-20 ${-h / 2 + 60} Q10 0 90 90 M-30 -40 Q-80 20 -60 130" stroke="#C9A07A" stroke-width="10" fill="none" stroke-linecap="round"/>` + [...Array(14)].map((_, j) => `<circle cx="${n2(-w / 2 + w * hash(j, 3))}" cy="${n2(-60 + 200 * hash(j, 5))}" r="${n2(4 + 4 * hash(j, 7))}" fill="#6E4428"/>`).join("") + TF(20, 90, 1.1, cicNymph18(t));
const ff17_18 = (t, w, h) => { const n = Math.min(17, Math.floor(clamp((t - MK("ff_17")) / 2.2) * 17) + 1); let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF8EA"/>`;
  s += `<g transform="translate(${n2(-w / 2 + 70)} -60)"><path d="M-40 -40 Q-10 -60 30 -50 Q50 -30 46 0 Q60 20 40 40 Q0 50 -30 30 Q-50 0 -40 -40z" fill="#BFE3A8" stroke="#5E9A44" stroke-width="4"/>${T(4, 74, "America", 22, "#3E7A2E")}</g>`;
  for (let i = 0; i < 17; i++) { const x = -w / 2 + 160 + (i % 6) * 44, y = -110 + Math.floor(i / 6) * 60, on = i < n; s += `<g transform="translate(${n2(x)} ${y}) scale(${on ? 1 : .6})"><circle r="15" fill="${on ? P.sun : "#E3D6BE"}" stroke="${on ? "#E39B00" : "#C9BCA4"}" stroke-width="3"/></g>`; }
  return s + TF(60, 110, 1, tpill(0, 0, n + (n === 1 ? " year" : " years"), 34, P.ink, "#fff", { w: 700 })); };
const comb18 = (w, h, fill = 0, t = 0) => { let s = ""; const r = 30; let i = 0; for (let y = -h / 2 + 10; y < h / 2 + 30; y += r * 1.5) for (let x = -w / 2 + ((Math.round(y) / (r * 1.5)) % 2 ? r * .87 : 0); x < w / 2 + 30; x += r * 1.74, i++) {
    s += `<path d="${[0, 1, 2, 3, 4, 5].map((k) => { const a = (k * 60 + 30) * Math.PI / 180; return (k ? "L" : "M") + n2(x + r * Math.cos(a)) + " " + n2(y + r * Math.sin(a)); }).join(" ")}z" fill="#F6C25A" stroke="#C98A1E" stroke-width="4"/>` + (i < fill ? `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="4" ry="8" fill="#FFFDF4" stroke="#C9B07A" stroke-width="1.5"/>` : ""); }
  return s; };
const ffQueen18 = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F6C25A"/>` + comb18(w, h) + TF(0, 10, 1.9, bee18(t, { queen: true }), -8);
const ffEggs18 = (t, w, h) => { const u = clamp((t - MK("ff_eggs")) / 3), n = Math.floor(u * 40), cnt = Math.round(1000 * Math.min(1.08, u * 1.1));
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F6C25A"/>` + comb18(w, h, n, t) + TF(0, 110, 1, `<g filter="url(#dropS)"><rect x="-150" y="-36" width="300" height="72" rx="36" fill="#fff"/></g>` + `<g transform="translate(-104 0)"><circle r="18" fill="${P.sun}" stroke="#E39B00" stroke-width="3"/></g>` + T(20, 16, (cnt >= 1000 ? "1000+" : cnt) + " eggs", 40, P.ink)) + TF(0, -110, 1, tpill(0, 0, "in one day", 30, P.ink, "#fff", { w: 700 })); };
// Part 2's calm recap pictures (Part 1's own art): the COMPARE FRAME with both strips filled; the two dot counters beside the loops; the hen on
// her nest with a ?
const recapPic18 = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#F2E8D6", "#FFF3DC", "#E8F5DC"][i]}"/>`;
  if (i === 0) s += TF(0, 20, 1.15, compareFrame(t, { id: "rp0", same: [[0, "eggs in water"], [0, "young unlike the adult"]], diff: [[0, "the number of stages"]], words: true }));
  if (i === 1) s += TF(-230, -20, 1, loopN(t, frogPic, 3, { R: 140, r: 64, id: "rp1f", sw: 11 })) + TF(230, -20, 1, loopN(t, mPic, 4, { R: 140, r: 58, id: "rp1m", sw: 11 })) + dotPill(t, 0, -230, 220, 3, 3) + dotPill(t, 0, 230, 220, 4, 4, 2) + T(-230, -235, "frog", 36, P.ink) + T(230, -235, "mosquito", 36, P.ink);
  if (i === 2) s += `<rect x="-520" y="60" width="1040" height="240" fill="#9FD07A"/>` + TF(-60, 180, 1.6, henNest18(t, {})) + TF(330, -80, 1, `<g filter="url(#dropS)"><circle r="70" fill="url(#gSun)"/></g>` + T(0, 36, "?", 110, P.ink));
  return s; };
