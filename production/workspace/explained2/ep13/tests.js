// tests.js: EP13's data and Stage 1 helpers ("Design a school bag like an engineer"). Loaded after pics.js, before ep12dare.js and common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the Primary 3 classroom after school, the school's eco-garden,
// the goat home at a zoo, the real school bag, the straps and the chair, the drawing and the sample tiles, the test stand (EP9's), the board
// OUR DESIGN PLAN, Basil's zoo map and the full zoo map, the chapter map (p. 70), the EP14 dare boards, the two journeys and the two hidden
// animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names and arguments: p1.js / p2.js call them).

/* ---------- the topic's two answer colours (script section 3, carried on from EP12): SUITABLE green (with a tick), NOT FOR THIS JOB blue.
   No red, no buddy colour and no sun yellow for an answer. ---------- */
const GOODC = P.leaf, WEAKC = P.blue;
// a job tag: k = 0 (SUITABLE, green, with a tick) or 1 (NOT FOR THIS JOB, blue). origin = its centre. txt overrides the words
const jobTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT FOR THIS JOB" : "SUITABLE"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
// the verdict options for lcVerdict (closer.js): [text, fill, opts]. VSTYLE(txt, 0) green; VSTYLE(txt, "sun") = sun-yellow letters on cream
// with a dark-violet border (ONE BAG · FOUR PARTS · FOUR USES: "not an answer colour", as EP12's purpose verdict)
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];

/* ---------- the property chips: EP9 to EP12's words, in the colours they were taught in (STRONG / FLEXIBLE / WATERPROOF green). They come
   back as chips, not as shelf words. ---------- */
const CHIPC = { STRONG: GOODC, FLEXIBLE: GOODC, WATERPROOF: GOODC, TRANSPARENT: GOODC, FRAGILE: WEAKC };
const propChip = (word, size = 34) => tpill(0, 0, word, size, CHIPC[word] || P.ink, "#fff", { w: 700, ls: 3 });
const chipAt = (t, t0, x, y, word, size = 34) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), propChip(word, size));
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it

/* ---------- the board OUR DESIGN PLAN (script section 3, the spine): a cream board on a low stand with five boxes in a row, joined by plain
   lines (no arrowheads, NO NUMBERS, no "Step 1"): WHAT IS IT FOR? · PARTS · USE OF EACH PART · DRAW IT · CHOOSE MATERIALS. A box is filled when
   a small tile hops low onto it and a tick lands on its corner. Beside the board, never inside the row of five: the small card THEN: TEST IT,
   joined to it by one plain curved line (from the end of Part 1: mark testcard; Part 2: there from the start, ticked at testtick).
   Part 1 (the school bag): box1 glows -> fill1; glow23 -> fill23; glow4 -> fill4; glow5 -> fill5 (five ticks); fabhop / fabback: four small
   fabric tiles hop towards the last box and back (HOLD ON!). Part 2: the bag's tiles are on it until wipe (they hop off), then the goat home:
   zfill1 (box 1), zfill2..zfill4, zglow5, woodtile (box 5: five ticks). ---------- */
const BOXES = ["WHAT IS IT FOR?", "PARTS", "USE OF EACH PART", "DRAW IT", "CHOOSE MATERIALS"];
const PLAN_TILES = { bag: ["to carry books to school", "straps · body · zip · base", "carry · hold · open and close · sit on the floor", "(a small copy of the drawing)", "fabric · fabric · metal · plastic"],
  goat: ["keep the goats safe; visitors can see them", "fence · shelter · gate · water trough", "fence: must not break; we can see through", "(a small drawing of the pen)", "fence: wood"] };
// when each box is filled (s; -1 = already filled; 1e9 = not yet) and which tiles it holds, and when each box glows: [t0, t1]
const PLAN = () => { const m = MKS;
  if (PART === 1) return { tiles: "bag", fill: [m("fill1"), m("fill23"), m("fill23") + .3, m("fill4"), m("fill5")], off: 1e9,
    glow: [[m("box1"), m("fill1")], [m("glow23"), m("fill23")], [m("glow23"), m("fill23") + .3], [m("glow4"), m("fill4")], [m("glow5"), m("fill5")]], test: m("testcard"), testTick: 1e9 };
  return { tiles: "goat", pre: "bag", off: m("wipe"), fill: [m("zfill1"), m("zfill2"), m("zfill3"), m("zfill4"), m("woodtile")],
    glow: [[m("zfill1") - 1.2, m("zfill1")], [-9, -9], [-9, -9], [-9, -9], [m("zglow5"), m("woodtile")]], test: -1, testTick: m("testtick") }; };
/* STAGE 2 (drawn): the board on its low stand, a wooden frame, five boxes with NO numbers joined by plain lines, small PICTURE tiles that hop
   on, a tick on each filled box, the glow, the four fabric tiles of the HOLD ON!, the green SUITABLE tag (chant), the card THEN: TEST IT on
   its own little feet beside the board. o.flash = [boxes 1-4, box 5 (+ SUITABLE), the test card]; o.small: no box words, bigger pictures (the
   little board at the edge of a look-closer). origin = the middle of the stand's feet; about 1540 wide, 620 tall (+ the test card at the right) */
const _mini4 = () => ["straps", "body", "zip", "base"].map((p, i) => TF(-48 + (i % 2) * 96, -8 + Math.floor(i / 2) * 84, .27, bag13({ lit: p, tag: false, id: "m" + i }))).join("");
const _penSketch = () => `<g fill="none" stroke="${PEN}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-80 -6 H80 M-80 22 H80 M-80 50 H80 M-66 -22 V62 M0 -22 V62 M66 -22 V62"/><path d="M-40 -30 L-10 -58 L20 -30z M-32 -30 V-6 M12 -30 V-6"/></g>`;
const PLAN_PIC = { bag: [() => TF(-30, 62, .52, bag13({ tag: false, id: "t0" })) + TF(52, 30, .5, bookC(0)) + TF(66, 44, .5, bookC(2)),
    () => TF(0, 64, .5, bag13({ tag: false, id: "t1" })) + [[-76, -40, -40, -34], [78, 0, 30, -4], [-80, 20, -24, -20], [80, 52, 40, 54]].map(([a, b, c, d], i) => `<path d="M${a} ${b} L${c} ${d}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="${a}" cy="${b}" r="9" fill="${[P.coral, P.blue, P.leaf, P.purple][i]}"/>`).join(""),
    _mini4, () => TF(0, 2, .25, drawingPic({ words: false })), () => TF(-52, -22, .5, sampleTile("fabric")) + TF(50, -22, .5, sampleTile("plastic")) + TF(0, 44, .5, zipShort(0))],
  goat: [() => TF(-10, 64, .62, goatS(0, GOATS[0])), () => TF(0, 0, .5, penFence(-170, 170, [40, 80, 120], { th: 20, step: 150, off: 20, bot: 150 })) + TF(-34, -6, .32, shelterS()) + TF(50, 2, .5, trough()),
    () => TF(0, 0, .56, TF(0, 150, .8, goatS(0, GOATS[1])) + penFence(-170, 170, [-40, 30, 100], { th: 22, step: 300, off: 20, bot: 150 })), () => TF(0, 0, 1, paperS(190, 150) + TF(0, -10, 1, _penSketch())), () => TF(0, 4, .9, sampleTile("wood"))] };
function planBoard(t, o = {}) { const pl = PLAN(), fl = o.flash || [0, 0, 0], X0 = -600, DX = 300, top = -620, Wb = 1500, sm = o.small; let s = "";
  BOXES.forEach((b, i) => { const x = X0 + i * DX, y = top + 138, g = Math.max(pl.glow[i][0] <= t && t < pl.glow[i][1] + .3 ? .7 + .3 * Math.sin(t * 6) : 0, i < 4 ? fl[0] : fl[1]);
    if (i) s += `<path d="M${x - DX + 120} ${y + 180} H${x - 120}" stroke="${P.ink}" stroke-width="7" stroke-linecap="round" opacity=".6"/>`;
    if (g > .02) s += `<rect x="${x - 136}" y="${y - 16}" width="272" height="382" rx="28" fill="${P.sun}" opacity="${n2(.75 * Math.min(1, g))}"/>`;
    s += `<rect x="${x - 120}" y="${y}" width="240" height="350" rx="20" fill="#fff" stroke="${P.ink}" stroke-width="5"/>` + (sm ? "" : wrap(b, 32, 220, 700).map((l, j, a) => T(x, y + (a.length > 1 ? 40 : 58) + j * 34, l, 32, P.ink, { ls: 1 })).join(""));
    const tf = pl.fill[i]; let kind = null, k = 0;
    if (pl.pre && t < pl.off + .5) { kind = pl.pre; const u = (t - pl.off - i * .06) / .45; k = t < pl.off + i * .06 ? 1 : 1 - eo(u); }
    else if (t >= tf) { kind = pl.tiles; k = spring(t, tf, .35); }
    if (kind && k > .02) { const hp = t >= tf && t < tf + .35 ? 30 * Math.sin(Math.PI * (t - tf) / .35) : 0, cy = sm ? y + 175 : y + 220, yy = cy - hp - (pl.pre && t >= pl.off && kind === pl.pre ? 90 * Math.sin(Math.PI * (1 - k)) : 0);
      s += TF(x, yy, k * (sm ? 1.5 : 1.12), `<rect x="-98" y="-90" width="196" height="180" rx="14" fill="#FFF3DC" stroke="#E3C9A8" stroke-width="4"/>` + PLAN_PIC[kind][i]()); }
    const ticked = (pl.pre && t < pl.off) || (t >= tf && tf < 1e8); if (ticked) s += TF(x + 104, y + 336, t >= tf && tf > 0 ? spring(t, tf + .15, .35) : 1, tickBadge(sm ? 44 : 32)); });
  // HOLD ON! (Part 1): four small fabric tiles hop towards the last box at fabhop, and back off the board at fabback
  const fh = MKS("fabhop"), fb = MKS("fabback");
  if (t >= fh && t < fb + .8) { const out = ss(fb, fb + .6, t); [0, 1, 2, 3].forEach((i) => { const u = clamp((t - fh - i * .08) / .45), hx = lerp(X0 + 150 + i * 70, X0 + 4 * DX - 56 + (i % 2) * 112, eo(u)), hy = top + 330 + (i > 1 ? 86 : 0) - 70 * Math.sin(Math.PI * u) + 300 * out - 40 * Math.sin(Math.PI * out);
    s += OP(1 - out, TF(hx, hy, .62, sampleTile("fabric"))); }); }
  if (fl[1] > .05) s += OP(Math.min(1, fl[1] * 1.5), TF(X0 + 4 * DX, top + 520, 1, jobTag(t, 0, 30)));
  // THEN: TEST IT, on its own little feet beside the board (outside the row of five), joined to it by one plain curved line
  const tc = pl.test; let card = ""; if (t >= tc) { const k = tc < 0 ? 1 : ramp(t, tc, .3), sx = Wb / 2 + 150 + (tc < 0 ? 0 : 700 * (1 - eio((t - tc) / .5))), g = fl[2], tt = pl.testTick;
    card = OP(k, `<path d="M${X0 + 4 * DX + 120} ${top + 300} Q${Wb / 2 + 60} ${top + 190} ${n2(sx - 100)} ${top + 300}" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linecap="round" opacity=".6"/>`)
      + (t < tc + .5 && tc > 0 ? dust(sx + 120, -4, (t - tc) * 2, 2.2) : "")
      + TF(sx, 0, 1, `<path d="M-60 0 V-250 M60 0 V-250" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/>` + TF(0, top + 320, 1 + .12 * g, `${g > .02 ? `<rect x="-118" y="-100" width="236" height="200" rx="26" fill="${P.sun}" opacity="${n2(.8 * g)}"/>` : ""}<g filter="url(#dropS)"><rect x="-100" y="-84" width="200" height="168" rx="20" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -22, "THEN:", 38, P.ink, { ls: 2 })}${T(0, 26, "TEST", 46, P.coral, { ls: 2 })}${T(0, 66, "IT", 40, P.coral, { ls: 2 })}` + (t >= tt ? TF(88, -74, spring(t, tt, .35), tickBadge(34)) : ""))); }
  return `<ellipse cx="0" cy="4" rx="${Wb * .5}" ry="18" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-520 0 V-80 M520 0 V-80" stroke="#8A5A36" stroke-width="20" stroke-linecap="round"/><g filter="url(#drop)"><rect x="${-Wb / 2 - 20}" y="${top}" width="${Wb + 40}" height="560" rx="30" fill="#C98F56" stroke="#7A4C26" stroke-width="6"/></g><rect x="${-Wb / 2 - 2}" y="${top + 18}" width="${Wb + 4}" height="524" rx="18" fill="url(#gPaper)"/>`
    + T(0, top + 92, "OUR DESIGN PLAN", sm ? 76 : 58, P.ink, { ls: 6 }) + s + card; }

/* ---------- Basil's zoo map (Part 2 Showdown) and the full zoo map (script section 5, segments 9-10). All twelve animals are the book's own
   list for "Design my zoo!" (pp. 71-72). ---------- */
const MAP_LINES = [["FISH", "goldfish, koi"], ["BIRDS", "flamingo, macaw, dragonfly"], ["AMPHIBIANS", "frog, salamander"]], MAP_FIX = ["INSECTS", "dragonfly, beetle"];
const ZONES = [["FISH", "goldfish", "koi"], ["INSECTS", "dragonfly", "beetle"], ["AMPHIBIANS", "frog", "salamander"], ["REPTILES", "crocodile", "snake"], ["BIRDS", "flamingo", "macaw"], ["MAMMALS", "hippopotamus", "goat"]];
// STAGE 2 (drawn): the easel MY ZOO: a sheet of paper with ruled lines; on each line its number, the group and a small drawing of each animal
// with its name; each line lights as Basil reads it; at dfly the dragonfly's drawing hops down off line 2 onto a new fourth line written in
// green (4 INSECTS: dragonfly, beetle). o.lit [3]; o.fix 0..1. origin = the easel's feet; the paper is 1240 x 640
const EROW = (i) => -640 + i * 132, ESLOT = (j) => -130 + j * 250;
const eAnimal = (t, name, x, y, o = {}) => TF(x, y, 1, TF(0, 2, .72, ZOO[name](t)) + T(58, 12, name, 28, o.ink || P.ink, { w: 600, a: "start" }));
function zooEasel(t, o = {}) { const lit = o.lit || [0, 0, 0], fx = clamp(o.fix || 0); let s = "";
  MAP_LINES.forEach(([g, a], i) => { const y = EROW(i); if (lit[i] > .02) s += `<rect x="-600" y="${y - 62}" width="1200" height="126" rx="18" fill="${P.sun}" opacity="${n2(.5 * lit[i])}"/>`;
    s += `<path d="M-590 ${y + 64} H590" stroke="#C9D6EA" stroke-width="4"/>` + `<circle cx="-545" cy="${y}" r="34" fill="${P.basil}"/>` + T(-545, y + 17, i + 1, 48, P.ink) + T(-490, y + 15, g, i === 2 ? 40 : 44, P.ink, { a: "start", ls: 1 });
    a.split(", ").forEach((nm, j) => { if (nm === "dragonfly") return; s += eAnimal(t, nm, ESLOT(j), y); }); });
  // the dragonfly: on line 2 (slot 2), then it hops down to line 4 (slot 0)
  const u = eio(fx), dx = lerp(ESLOT(2), ESLOT(0), u), dy = lerp(EROW(1), EROW(3), u) - 130 * Math.sin(Math.PI * u);
  if (fx > 0) { const y = EROW(3), G = "#1F8A4C"; s += OP(clamp(fx * 2), `<circle cx="-545" cy="${y}" r="34" fill="#BFF0C8" stroke="${G}" stroke-width="4"/>` + T(-545, y + 17, "4", 48, G) + T(-490, y + 15, MAP_FIX[0], 44, G, { a: "start", ls: 1 })) + OP(clamp(fx * 3 - 2), eAnimal(t, "beetle", ESLOT(1), y, { ink: G })); }
  s += eAnimal(t, "dragonfly", dx, dy, { ink: fx > .5 ? "#1F8A4C" : P.ink });
  return `<ellipse cx="0" cy="4" rx="420" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-330 0 L-170 -300 M330 0 L170 -300 M0 -60 V-300" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><rect x="-520" y="-112" width="1040" height="18" rx="8" fill="#A9703C" stroke="#7A4C26" stroke-width="4"/>
    <g filter="url(#drop)"><rect x="-620" y="-800" width="1240" height="690" rx="22" fill="#FFFDF4" stroke="#E3D6B8" stroke-width="6"/></g>` + T(-580, -728, "MY ZOO", 52, "#0E8F7E", { a: "start", ls: 4 }) + T(590, -734, "by Basil", 30, P.ink2, { a: "end", w: 500 }) + `<path d="M-590 -706 H590" stroke="#C9D6EA" stroke-width="4"/>` + s; }
// STAGE 2 (drawn): the full zoo map: six zones (a pond, a garden, a marsh, a sandy bank, an aviary, a paddock), two animals in each, every one
// with its small idle loop and its name. o.pop = when the zones pop; o.glow 0..1 (a soft glow round all twelve). origin: the map is 1520 x 700, its centre at (0, -220)
const ZCOL = [["#CDEBFA", "#7FB4D6"], ["#DDF4C8", "#7FAF5A"], ["#D5F1E4", "#5CB89A"], ["#F6E7C4", "#C9A76E"], ["#E6E0FA", "#9B8CBF"], ["#F9E3CF", "#D9A06A"]];
function zooMap(t, o = {}) { let s = ""; const t0 = o.pop === undefined ? -9 : o.pop, g = o.glow || 0;
  ZONES.forEach(([z, a, b], i) => { const x = -490 + (i % 3) * 490, y = -350 + Math.floor(i / 3) * 310, k = spring(t, t0 + i * .15, .4); if (k < .02) return;
    const an = (nm, ax) => (g > .02 ? `<ellipse cx="${ax}" cy="20" rx="${n2(100 + 6 * Math.sin(t * 5 + ax))}" ry="74" fill="${P.sun}" opacity="${n2(.75 * g)}" filter="url(#b4)"/>` : "") + TF(ax, 14, 1.08, ZOO[nm](t + i)) + T(ax, 112, nm, nm.length > 9 ? 26 : 30, P.ink, { w: 600 });
    s += TF(x, y, k, `<rect x="-228" y="-140" width="456" height="280" rx="26" fill="${ZCOL[i][0]}" stroke="${ZCOL[i][1]}" stroke-width="6"/><g transform="translate(0 -104)">${tpill(0, 0, z, 30, ZCOL[i][1], "#fff", { w: 700, ls: 2 })}</g>${an(a, -108)}${an(b, 108)}`); });
  return `<g filter="url(#drop)"><rect x="-770" y="-590" width="1540" height="720" rx="34" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="7"/></g>` + T(0, -524, "OUR ZOO", 46, P.ink, { ls: 6 }) + s; }
// STAGE 2 (drawn): the chapter's map (p. 70), small and silent: seven material tiles, five property chips, one plain line to "suitable for
// making objects", with the school bag and the goat fence at its end. origin = its centre (about 1180 x 170)
const MATS = [["wood", "#C98F56", "#fff"], ["metal", "#B9C3D4", P.ink], ["ceramic", "#F4EFE6", P.ink], ["rubber", "#4A4A55", "#fff"], ["glass", "#CDEBFA", P.ink], ["plastic", "#FF8FB1", P.ink], ["fabric", "#F47A14", "#fff"]], PROPS5 = ["strength", "flexibility", "float or sink", "waterproof", "transparency"];
const chapterMap = () => `<g filter="url(#dropS)"><rect x="-600" y="-88" width="1200" height="176" rx="22" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="5"/></g>`
  + MATS.map(([m, c, ink], i) => `<rect x="${-580 + i * 106}" y="-72" width="98" height="46" rx="10" fill="${c}" stroke="${P.ink}" stroke-width="3"/>` + T(-531 + i * 106, -41, m, 22, ink, { w: 600 })).join("")
  + T(-590, 4, "materials", 20, P.ink2, { a: "start", w: 500 }) + PROPS5.map((p, i) => TF(-506 + i * 150, 44, 1, tpill(0, 0, p, 19, GOODC, "#fff", { w: 600 }))).join("") + T(-590, 84, "physical properties", 20, P.ink2, { a: "start", w: 500 })
  + `<path d="M170 0 H250" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>` + T(420, -44, "suitable for", 22, P.ink, { w: 700 }) + T(420, -20, "making objects", 22, P.ink, { w: 700 })
  + TF(340, 76, .32, bag13({ strapR: "new", tag: false, id: "cm" })) + TF(500, 30, .3, penFence(-150, 150, [-40, 20, 80], { th: 22, step: 130, off: 20, bot: 130 }));

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little BUTTERFLY (a plain tiger: orange wings with black tips and white spots, a small body, big friendly eyes with a highlight, a
   little smile, two feelers) on the potted plant on the corridor ledge, just outside the open louvre window (every wide shot of the
   classroom); it opens and closes its wings slowly. Part 2: a little FROG (a small green frog: a round body, big friendly eyes, a pale belly,
   a wide little smile) on a lily pad in the eco-garden's pond (every wide shot of the garden); it blinks and puffs its throat. Both drawn cute
   AND alive (SERIES_FORMAT section 6). Free, never touched. Not on screen during a [LOOK CLOSER] or a journey. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: butterflyArt(t) / frogArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["butterfly", butterflyArt] : ["frog", frogArt];   // STAGE 2: the drawn animals (school.js, garden13.js)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#FFF0DA" : "#E3F5D8"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[0], n2(r * .24), P.ink, "#fff", { w: 700 }));

/* ---------- LOOK CLOSER, Stage 1: the real lookCloser frame (closer.js: push-in, dim, the window opens from the thing, the LOOK CLOSER tag,
   the verdict at v_*) with a placeholder art() that lists what Stage 2 draws inside the window. o: { title, notes: [..], verdict: [text, colour, opts],
   v: mark, strips: [[id, text, {off, y, size, keys}], ...], setNote: (when the scene before is not the set we zoom in from) a placeholder set,
   fx, fy, beats: [[mark, label], ...] (a small clock of the picture beats inside the window, so Stage 2 sees when each thing happens), over(t) } ---------- */
function lcPH(t, s, o) { const set = o.setNote ? (tt) => { window._noHud = true; try { return phScene(tt, s, "SET: " + o.setNote, []); } finally { window._noHud = false; } } : undefined;
  const art = (tt) => { let a = `<rect x="-800" y="-380" width="1600" height="760" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="16 12"/>`
    + tpill(0, -300, "LOOK CLOSER · STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 2 }) + T(0, -220, o.title, 46, P.ink); let y = -150;
    for (const n of o.notes || []) for (const ln of wrap(n, 28, 1480, 500)) { a += `<text x="-740" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
    const bt = (o.beats || []).filter(([mk]) => TL.marks[mk] !== undefined && tt >= TL.marks[mk]).pop();
    if (bt) a += TF(560, -300, 1, tpill(0, 0, "NOW: " + bt[1], 26, P.sun, P.ink, { w: 700 }));
    for (const id of TL.order) { const L = TL.lines[id]; if (L.who === "heart" && tt >= L.t - .05 && tt < L.end + .3) a += tpill(0, 300, ("HEART: " + L.text).slice(0, 96), 26, "#120E2E", "#fff", { w: 600 }); }
    return a; };
  const over = (tt) => (o.strips ? o.strips.map(([id, text, so]) => lcStrip(tt, id, text, so || {})).join("") : "") + (o.over ? o.over(tt) : "");
  return lookCloser(t, s, { tz: s.t0, fx: o.fx || 960, fy: o.fy || 560, art, set, verdict: o.verdict, tv: MK(o.v), over }); }

/* ---------- small Stage 1 helpers for p1.js / p2.js ---------- */
// the placeholder object in a lock-in ring (Stage 2 draws the real picture inside the ring)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 30, P.ink);
// the small print (script section 1, Safety; always fully inside the frame, upper left under the logo pill, as EP12's rules).
// Part 1: "We do not force it." for the whole three-straps look-closer. Part 2: "An adult adds the weights." for the whole test (from the
// garden's first wide shot through the test and the journey's glide in: script segment 2, "for the whole test"); "We look. We do not feed the
// goats." for the whole goat-home look-closer.
const FORCE_RULE = "We do not force it.", WEIGHTS_RULE = "An adult adds the weights.", GOAT_RULE = "We look. We do not feed the goats.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (script section 3; the same as script.py DARE_CARDS / DARE_LABEL / DARE_CLUES / NEXT_CARDS): Block A, Block B
const DARE_CARDS = ["Fabric", "Metal", "Wood"], DARE_LABEL = "Which material would you choose?", DARE_CLUES = ["must bend", "must not tear"];
const NEXT_CARDS = ["The Sun moves away", "The Earth turns", "Clouds hide the Sun"];
// the counter pill of the test (EP9's WEIGHTS: n; Stage 2 may use ep09/voiddeck.js counterPill). origin = its centre
const weightsPill = (n, k = 0) => TF(0, 0, 1 + .15 * k, tpill(0, 0, "WEIGHTS: " + n, 30, "#fff", P.ink, { w: 700 }));
