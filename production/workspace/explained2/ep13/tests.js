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
/* STAGE 1 placeholder of the board (functional: five boxes, tiles that hop on, ticks, glows, the test card). Stage 2 redraws it on its low
   stand with picture tiles. o.flash = [boxes 1-4, box 5 (+ the green SUITABLE tag), the test card] (the chant); o.small: no tile words (far
   away). origin = the middle of the stand's feet; about 1500 wide, 560 tall (+ the test card to the right) */
function planBoard(t, o = {}) { const pl = PLAN(), fl = o.flash || [0, 0, 0], X0 = -600, DX = 300, top = -620, Wb = 1500; let s = "";
  BOXES.forEach((b, i) => { const x = X0 + i * DX, y = top + 120, g = Math.max(pl.glow[i][0] <= t && t < pl.glow[i][1] + .3 ? .7 + .3 * Math.sin(t * 6) : 0, i < 4 ? fl[0] : fl[1]);
    if (i) s += `<path d="M${x - DX + 120} ${y + 150} H${x - 120}" stroke="${P.ink}" stroke-width="5" opacity=".55"/>`;
    if (g > .02) s += `<rect x="${x - 134}" y="${y - 14}" width="268" height="328" rx="26" fill="${P.sun}" opacity="${n2(.55 * Math.min(1, g))}"/>`;
    s += `<rect x="${x - 120}" y="${y}" width="240" height="300" rx="20" fill="#fff" stroke="${P.ink}" stroke-width="4"/>` + wrap(b, 26, 210, 700).map((l, j) => T(x, y + 44 + j * 30, l, 26, P.ink, { ls: 1 })).join("");
    // the tile(s) in this box: the bag's (Part 1; Part 2 until wipe) then the goat home's (Part 2)
    const tf = pl.fill[i]; let tile = null, k = 0;
    if (pl.pre && t < pl.off + .5) { tile = PLAN_TILES[pl.pre][i]; const u = (t - pl.off) / .45; k = t < pl.off ? 1 : 1 - eo(u); }
    else if (t >= tf) { tile = PLAN_TILES[pl.tiles][i]; k = spring(t, tf, .35); }
    if (tile && k > .02) { const hp = t >= tf && t < tf + .35 ? 26 * Math.sin(Math.PI * (t - tf) / .35) : 0, yy = y + 190 - hp - (pl.pre && t >= pl.off ? 60 * (1 - k) : 0);
      s += TF(x, yy, k, `<rect x="-104" y="-70" width="208" height="140" rx="14" fill="#FFF3DC" stroke="#E3C9A8" stroke-width="3"/>` + (o.small ? "" : wrap(tile, 22, 190, 600).slice(0, 4).map((l, j, a) => T(0, 8 + j * 26 - (a.length - 1) * 13, l, 22, P.ink, { w: 600 })).join(""))); }
    const ticked = (pl.pre && t < pl.off) || (t >= tf && tf < 1e8); if (ticked) s += TF(x + 104, y + 6, t >= tf && tf > 0 ? spring(t, tf + .15, .35) : 1, tickBadge(22)); });
  // HOLD ON! (Part 1): four small fabric tiles hop towards the last box at fabhop, and back off at fabback
  const fh = MKS("fabhop"), fb = MKS("fabback");
  if (t >= fh && t < fb + .8) { const out = ss(fb, fb + .6, t); [0, 1, 2, 3].forEach((i) => { const u = clamp((t - fh - i * .08) / .45), hx = lerp(X0 + 150 + i * 70, X0 + 4 * DX - 60 + (i % 2) * 120, eo(u)), hy = top + 330 + (i > 1 ? 60 : 0) - 60 * Math.sin(Math.PI * u) + 260 * out;
    s += OP(1 - out, TF(hx, hy, .9, `<rect x="-52" y="-24" width="104" height="48" rx="10" fill="#FFD7A8" stroke="#C97A2E" stroke-width="3"/>` + T(0, 9, "fabric", 22, "#8A4A12"))); }); }
  // the green SUITABLE tag over the last box in the chant's line 2
  if (fl[1] > .05) s += OP(Math.min(1, fl[1] * 1.5), TF(X0 + 4 * DX, top + 60, 1, jobTag(t, 0, 24)));
  // THEN: TEST IT, beside the board (outside the row of five), joined by one plain curved line
  const tc = pl.test; if (t >= tc) { const k = tc < 0 ? 1 : spring(t, tc, .45), sx = Wb / 2 + 170, g = fl[2], tt = pl.testTick;
    s += OP(k, `<path d="M${X0 + 4 * DX + 120} ${top + 260} Q${sx - 60} ${top + 120} ${sx} ${top + 200}" fill="none" stroke="${P.ink}" stroke-width="5" opacity=".55"/>`)
      + TF(sx, top + 290 - 40 * (1 - eo((t - tc) / .3)), k * (1 + .1 * g), `${g > .02 ? `<rect x="-140" y="-84" width="280" height="168" rx="24" fill="${P.sun}" opacity="${n2(.6 * g)}"/>` : ""}<rect x="-124" y="-70" width="248" height="140" rx="20" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>${T(0, -10, "THEN:", 30, P.ink, { ls: 2 })}${T(0, 34, "TEST IT", 36, P.ink, { ls: 2 })}` + (t >= tt ? TF(110, -60, spring(t, tt, .35), tickBadge(24)) : "")); }
  return `<path d="M-420 0 V-70 M420 0 V-70" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="${-Wb / 2 - 20}" y="${top}" width="${Wb + 40}" height="560" rx="28" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>`
    + T(0, top + 74, "OUR DESIGN PLAN", 50, P.ink, { ls: 5 }) + s + tpill(0, -40, "STAGE 2: draw (tiles = small pictures)", 22, P.coral, "#fff"); }

/* ---------- Basil's zoo map (Part 2 Showdown) and the full zoo map (script section 5, segments 9-10). All twelve animals are the book's own
   list for "Design my zoo!" (pp. 71-72). ---------- */
const MAP_LINES = [["FISH", "goldfish, koi"], ["BIRDS", "flamingo, macaw, dragonfly"], ["AMPHIBIANS", "frog, salamander"]], MAP_FIX = ["INSECTS", "dragonfly, beetle"];
const ZONES = [["FISH", "goldfish", "koi"], ["INSECTS", "dragonfly", "beetle"], ["AMPHIBIANS", "frog", "salamander"], ["REPTILES", "crocodile", "snake"], ["BIRDS", "flamingo", "macaw"], ["MAMMALS", "hippopotamus", "goat"]];
// STAGE 1 placeholder: the easel MY ZOO (functional: each line lights as Basil reads it, the lines stay through the countdown; at dfly the
// dragonfly's drawing hops down off line 2 onto a new fourth line written in green). o.lit [3]; o.fix 0..1. origin = the easel's feet
function zooEasel(t, o = {}) { const lit = o.lit || [0, 0, 0], fx = o.fix || 0; let s = "";
  MAP_LINES.forEach(([g, a], i) => { const y = -560 + i * 120, txt = i === 1 && fx > .5 ? "flamingo, macaw" : a; if (lit[i] > .02) s += `<rect x="-560" y="${y - 50}" width="1120" height="96" rx="16" fill="${P.sun}" opacity="${n2(.35 * lit[i])}"/>`;
    s += T(-520, y + 14, (i + 1) + "", 44, P.basil, { a: "start" }) + T(-470, y + 12, g + ": " + txt, 38, P.ink, { a: "start", w: 600 }) + tpill(420, y, "drawings", 20, "#fff", P.ink2, { w: 500 }); });
  if (fx > 0) s += OP(fx, T(-520, -560 + 3 * 120 + 14, "4", 44, "#1F8A4C", { a: "start" }) + T(-470, -560 + 3 * 120 + 12, MAP_FIX[0] + ": " + MAP_FIX[1], 38, "#1F8A4C", { a: "start", w: 700 }));
  return `<path d="M-260 0 L-130 -260 M260 0 L130 -260" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-600" y="-740" width="1200" height="600" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>`
    + T(-560, -650, "MY ZOO", 52, P.basil, { a: "start", ls: 4 }) + s + tpill(0, -165, "STAGE 2: easel + a small drawing of each animal", 22, P.coral, "#fff"); }
// STAGE 1 placeholder: the full zoo map (six zones, two animals each, each with a small idle loop in Stage 2). o.pop = when the zones pop; o.glow 0..1 (all twelve glow)
function zooMap(t, o = {}) { let s = ""; const t0 = o.pop === undefined ? -9 : o.pop, g = o.glow || 0;
  ZONES.forEach(([z, a, b], i) => { const x = -480 + (i % 3) * 480, y = -380 + Math.floor(i / 3) * 300, k = spring(t, t0 + i * .15, .4); if (k < .02) return;
    s += TF(x, y, k, `${g > .02 ? `<rect x="-224" y="-134" width="448" height="268" rx="30" fill="${P.sun}" opacity="${n2(.5 * g)}"/>` : ""}<rect x="-210" y="-120" width="420" height="240" rx="24" fill="#EAF6DD" stroke="#7FAF5A" stroke-width="5"/>${T(0, -60, z, 34, P.ink, { ls: 2 })}${T(0, 10, a, 30, P.ink, { w: 600 })}${T(0, 56, b, 30, P.ink, { w: 600 })}`); });
  return `<g filter="url(#drop)"><rect x="-760" y="-560" width="1520" height="680" rx="34" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g>` + T(0, -490, "OUR ZOO", 44, P.ink, { ls: 5 }) + s + tpill(0, 110, "STAGE 2: draw the zones and the twelve animals", 22, P.coral, "#fff"); }
// STAGE 1 placeholder: the chapter's map (p. 70) under Mark Sentence 1 of Part 2, small and silent: seven material tiles, five property chips, one
// plain line to "suitable for making objects", with the school bag and the goat fence at its end. origin = its centre (about 1100 x 150)
const MATS = ["wood", "metal", "ceramic", "rubber", "glass", "plastic", "fabric"], PROPS5 = ["strength", "flexibility", "float or sink", "waterproof", "transparency"];
const chapterMap = () => MATS.map((m, i) => TF(-500 + i * 120, -40, 1, tpill(0, 0, m, 20, "#fff", P.ink, { w: 600 }))).join("") + PROPS5.map((p, i) => TF(-430 + i * 170, 20, 1, tpill(0, 0, p, 18, GOODC, "#fff", { w: 600 }))).join("")
  + `<path d="M420 -10 H520" stroke="${P.ink}" stroke-width="3"/>` + TF(600, -10, 1, tpill(0, 0, "suitable for making objects", 18, "#FFF8EA", P.ink, { w: 700 })) + tpill(0, 62, "STAGE 2: draw (with the school bag and the goat fence at its end)", 18, P.coral, "#fff");

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little BUTTERFLY (a plain tiger: orange wings with black tips and white spots, a small body, big friendly eyes with a highlight, a
   little smile, two feelers) on the potted plant on the corridor ledge, just outside the open louvre window (every wide shot of the
   classroom); it opens and closes its wings slowly. Part 2: a little FROG (a small green frog: a round body, big friendly eyes, a pale belly,
   a wide little smile) on a lily pad in the eco-garden's pond (every wide shot of the garden); it blinks and puffs its throat. Both drawn cute
   AND alive (SERIES_FORMAT section 6). Free, never touched. Not on screen during a [LOOK CLOSER] or a journey. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: butterflyArt(t) / frogArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["butterfly", hiddenPH("butterfly")] : ["frog", hiddenPH("frog")];
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
