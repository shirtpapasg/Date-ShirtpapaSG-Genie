// tests.js: EP14's data and Stage 1 helpers ("Why does the Sun come back every morning? Cycles"). Loaded after pics.js, before ep13dare.js
// and common.js. STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the HDB living room by the east window (Part 1),
// the window's view in all its lights, the globe and torch model, the traffic light, the community garden (Part 2), the old photo and its
// "today" twin, the chickens, the board CYCLE CHECK, Pip's notes on their easel, the EP15 mango boards, the two journeys and the two hidden
// animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names and arguments: p1.js / p2.js call them).

/* ---------- the topic's two answer colours (script section 3): A CYCLE green (with a tick), NOT A CYCLE blue; in Part 2's first look-closer
   EP1's own LIVING green / NON-LIVING blue. No red, no buddy colour and no sun yellow for an answer. ---------- */
const GOODC = P.leaf, WEAKC = P.blue;
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words (A CYCLE / NOT A CYCLE / LIVING / NON-LIVING). origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT A CYCLE" : "A CYCLE"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
// the verdict options for lcVerdict (closer.js): [text, fill, opts]. VSTYLE(txt, 0) green; VSTYLE(txt, "sun") = sun-yellow letters on cream
// with a dark-violet border (DAY AND NIGHT: A REPEATED PATTERN: "not an answer colour", as EP12 / EP13)
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
// the cream day time / nighttime tags (a small sun, a small moon; dark letters: not an answer colour)
const dnTag = (t, t0, x, y, night, txt, o = {}) => { if (t < t0) return ""; const a = o.t1 === undefined ? 1 : 1 - ramp(t, o.t1, .25); if (a <= .01) return ""; const size = o.size || 40, w = tw(txt, size, 700) + size * 2.6, h = size * 1.6;
  const ic = night ? `<path d="M8 -16 A18 18 0 1 0 8 16 A13 13 0 1 1 8 -16z" fill="#FFE27A"/>` : `<circle r="13" fill="#FFD75A" stroke="#F59E0B" stroke-width="3"/>`;
  return OP(a, TF(x, y, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="#FFF8EA" stroke="${P.ink}" stroke-width="3"/></g><g transform="translate(${n2(-w / 2 + size * .95)} 0)">${ic}</g>` + T(n2(size * .55), n2(size * .35), txt, size, P.ink))); };
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it

/* ---------- the board CYCLE CHECK (script section 3, the spine): a cream board on a low stand. At the top two tick boxes, IT CHANGES · IT
   REPEATS; under them a ring of plain curved lines with small arrowheads that all run the same way round, with round slots for picture tiles:
   NO numbers, no "Stage 1", no START. A thing is "checked" when its tiles hop low onto the ring, the boxes get their ticks (or stay empty),
   and one tag lands (green A CYCLE / blue NOT A CYCLE).
   Part 1: boardIn (empty) -> tileday, tilenight (two slots) -> ringrun (the arrows light round and round) -> tick1, tick2 -> tagcycle ->
   tilesoff (the tiles hop off, ticks and tag go) -> pen1..pen3 (three pencil tiles hop towards the ring) -> penrow (they settle in a ROW under
   the ring; the ring stays open) -> penchg (one tick) -> pentag (NOT A CYCLE) -> lighttiles (pencils off; green · amber · red on three slots,
   both ticks, A CYCLE) -> the end of the part: the day-and-night ring again (o.show = "daynight").
   Part 2: empty -> tegg, tchick, tadult (three slots) -> tback (the last arrow lights back to the egg) -> tick1, tick2 -> tagcycle (A CYCLE
   + the title pill A LIFE CYCLE above the ring) -> chant / nyk: TWO closed rings side by side (o.two): non-living: day and night · living: a
   chicken. o.flash = [ring 1, ring 2, the boxes + A CYCLE] (the chant). o.small: no tile words (far away).
   STAGE 1 placeholder (functional: every tile, tick, tag and glow lands ON its mark). Stage 2 redraws it on its low stand with picture tiles
   (a small sun sky / a starry sky; the three pencils; three round lamps; an egg, a chick, an adult chicken). origin = the middle of the stand's
   feet; about 900 wide (1500 with two rings), 760 tall. ---------- */
const TILE_W = { day: "day time", night: "nighttime", green: "green", amber: "amber", red: "red", egg: "an egg", chick: "a chick", adult: "an adult chicken", pen1: "long pencil", pen2: "shorter", pen3: "a stub" };
// one ring (centre cx, cy, radius R): slots evenly round it from the top, clockwise; tiles [[key, k]] (k = 0..1 how far it has landed);
// lit = 0..1 how many arrows are lit (round and round when run); glow = 0..1 (the chant's flash)
function cycRing(t, cx, cy, R, tiles, lit, run, glow = 0, small = false) { const n = Math.max(2, tiles.length); let s = "";
  if (glow > .02) s += `<circle cx="${cx}" cy="${cy}" r="${R + 70}" fill="${P.sun}" opacity="${n2(.35 * glow)}"/>`;
  for (let i = 0; i < n; i++) { const a0 = -Math.PI / 2 + (i + .22) * 2 * Math.PI / n, a1 = -Math.PI / 2 + (i + .78) * 2 * Math.PI / n, on = run ? (Math.floor((t * 1.6) % n) === i ? 1 : .55) : (lit * n > i ? 1 : 0);
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), col = on ? P.ink : "#C9BBA6", ah = a1 + Math.PI / 2;
    s += `<path d="M${n2(x0)} ${n2(y0)} A${R} ${R} 0 0 1 ${n2(x1)} ${n2(y1)}" fill="none" stroke="${col}" stroke-width="${on ? 9 : 7}" stroke-linecap="round" opacity="${on ? 1 : .8}"/>`
      + `<path d="M${n2(x1 + 18 * Math.cos(ah + 2.6))} ${n2(y1 + 18 * Math.sin(ah + 2.6))} L${n2(x1)} ${n2(y1)} L${n2(x1 + 18 * Math.cos(ah - 2.6))} ${n2(y1 + 18 * Math.sin(ah - 2.6))}" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`; }
  tiles.forEach(([key, k], i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="56" fill="#fff" stroke="#E3C9A8" stroke-width="4" stroke-dasharray="8 6"/>`;
    if (k > .02) s += TF(x, y - 40 * Math.sin(Math.PI * clamp(k)) * (k < 1 ? 1 : 0), clamp(k * 1.2), `<circle r="58" fill="#FFF3DC" stroke="${P.ink}" stroke-width="4"/>` + (small ? "" : wrap(TILE_W[key] || key, 22, 100, 600).map((l, j, A) => T(0, 8 + j * 24 - (A.length - 1) * 12, l, 22, P.ink, { w: 600 })).join(""))); });
  return s; }
const BOX2 = ["IT CHANGES", "IT REPEATS"];
const tickBox = (x, y, label, on, glow = 0) => `${glow > .02 ? `<rect x="${x - 196}" y="${y - 58}" width="392" height="116" rx="24" fill="${P.sun}" opacity="${n2(.5 * glow)}"/>` : ""}<rect x="${x - 180}" y="${y - 44}" width="360" height="88" rx="18" fill="#fff" stroke="${P.ink}" stroke-width="4"/><rect x="${x - 160}" y="${y - 26}" width="52" height="52" rx="10" fill="#fff" stroke="${P.ink}" stroke-width="5"/>`
  + T(x + 30, y + 12, label, 34, P.ink, { ls: 2 }) + (on > .02 ? TF(x - 134, y, spring(on, 0, 1), `<path d="M-18 0 L-5 14 L22 -18" fill="none" stroke="${GOODC}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`) : "");
function CYC(t, o = {}) { const m = MKS, k = (mk, d = .35) => t < m(mk) ? 0 : clamp((t - m(mk)) / d);
  if (o.show === "daynight") return { tiles: [["day", 1], ["night", 1]], lit: 1, run: 1, ticks: [1, 1], tag: [0, 1], row: null };
  if (PART === 1) { const off = k("tilesoff", .4);
    if (t >= m("lighttiles")) return { tiles: [["green", k("lighttiles")], ["amber", k("lighttiles", .5)], ["red", k("lighttiles", .6)]], lit: 1, run: 1, ticks: [1, 1], tag: [0, 1], row: null };
    if (t >= m("tilesoff")) return { tiles: [["day", 1 - off], ["night", 1 - off]], lit: 0, run: 0, ticks: [k("penchg"), 0], tag: t >= m("pentag") ? [1, k("pentag")] : null,
      row: [["pen1", k("pen1", .4)], ["pen2", k("pen2", .4)], ["pen3", k("pen3", .4)]], rowk: k("penrow", .4) };
    return { tiles: [["day", k("tileday")], ["night", k("tilenight")]], lit: k("ringrun", .8), run: t >= m("ringrun") + .8 ? 1 : 0, ticks: [k("tick1"), k("tick2")], tag: t >= m("tagcycle") ? [0, k("tagcycle")] : null, row: null }; }
  return { tiles: [["egg", k("tegg")], ["chick", k("tchick")], ["adult", k("tadult")]], lit: t >= m("tback") ? 1 : (k("tegg") > 0 ? (t >= m("tadult") ? .67 : t >= m("tchick") ? .34 : 0) : 0), run: t >= m("tback") + .6 ? 1 : 0,
    ticks: [k("tick1"), k("tick2")], tag: t >= m("tagcycle") ? [0, k("tagcycle")] : null, title: k("tagcycle"), row: null }; }
function cycleBoard(t, o = {}) { const fl = o.flash || [0, 0, 0], top = -760; let s = "", Wb = o.two ? 1500 : 900;
  if (o.two) { // the reveal: two closed rings side by side, one non-living, one living
    const ticks = 1; s += tickBox(-200, top + 140, BOX2[0], ticks, fl[2]) + tickBox(200, top + 140, BOX2[1], ticks, fl[2]);
    s += cycRing(t, -380, top + 460, 170, [["day", 1], ["night", 1]], 1, 1, fl[0], o.small) + cycRing(t, 380, top + 460, 170, [["egg", 1], ["chick", 1], ["adult", 1]], 1, 1, fl[1], o.small);
    s += TF(-380, top + 700, 1, tpill(0, 0, "non-living: day and night", 30, "#fff", P.ink, { w: 700 })) + TF(380, top + 700, 1, tpill(0, 0, "living: a chicken", 30, "#fff", P.ink, { w: 700 }));
    if (fl[2] > .05) s += OP(Math.min(1, fl[2] * 1.5), TF(0, top + 460, 1, cycTag(t, 0, 30)));
  } else { const c = CYC(t, o);
    s += tickBox(-210, top + 140, BOX2[0], c.ticks[0]) + tickBox(210, top + 140, BOX2[1], c.ticks[1]);
    s += cycRing(t, 0, top + 450, 180, c.tiles, c.lit, c.run, 0, o.small);
    if (c.row) c.row.forEach(([key, k], i) => { if (k < .02) return; const x = lerp(-120 + i * 120, -230 + i * 230, c.rowk), y = lerp(top + 450, top + 690, c.rowk) - 50 * Math.sin(Math.PI * k) * (k < 1 ? 1 : 0);
      s += TF(x, y, clamp(k * 1.2), `<rect x="-90" y="-36" width="180" height="72" rx="14" fill="#FFE9A8" stroke="#C9952E" stroke-width="4"/>` + (o.small ? "" : T(0, 9, TILE_W[key], 24, "#6B4A10", { w: 600 }))); });
    if (c.tag) s += TF(0, top + 450 - 60 * (1 - eo(c.tag[1] / .7)), spring(c.tag[1], 0, .6), cycTag(t, c.tag[0], 34));
    if (c.title > .02) s += TF(0, top + 230, spring(c.title, 0, .6), tpill(0, 0, "A LIFE CYCLE", 40, P.sun, P.ink, { w: 700, ls: 3 })); }
  return `<path d="M${-Wb * .32} 0 V-70 M${Wb * .32} 0 V-70" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="${-Wb / 2}" y="${top}" width="${Wb}" height="720" rx="28" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>`
    + T(0, top + 66, "CYCLE CHECK", 48, P.ink, { ls: 5 }) + s + tpill(0, -30, "STAGE 2: draw (tiles = small pictures)", 20, P.coral, "#fff"); }

/* ---------- Pip's notes on an easel (Part 2 Showdown; script section 5, segment 9): the heading MY NOTES and three ruled lines, each with a
   small drawing; line 2 is the mistake. STAGE 1 placeholder (functional: each line lights as Pip reads it, the lines stay through the
   countdown; at strike line 2 is struck through once; at bend it is rewritten under it in green and its little drawing bends from a ROW into
   a RING with an arrow from the adult back to the egg). o.lit [3]; o.strike 0..1; o.fix 0..1. origin = the easel's feet ---------- */
const NOTES = [["Day and night are a cycle.", "(a sun and a moon on a ring)"], ["A life cycle ends at the adult.", "(egg, chick, adult chicken in a ROW, a full stop)"], ["A teddy bear has no life cycle.", "(the teddy bear)"]], NOTE_FIX = "A life cycle repeats: the adult has young.";
function notesEasel(t, o = {}) { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0; let s = "";
  NOTES.forEach(([txt, pic], i) => { const y = -560 + i * 130 + (i === 2 ? 50 * fx : 0); if (lit[i] > .02) s += `<rect x="-560" y="${y - 50}" width="1120" height="100" rx="16" fill="${P.sun}" opacity="${n2(.35 * lit[i])}"/>`;
    s += T(-520, y + 14, (i + 1) + "", 44, P.pip, { a: "start" }) + T(-470, y + 12, txt, 38, P.ink, { a: "start", w: 600 }) + tpill(400, y, i === 1 && fx > .5 ? "(the row bends into a RING)" : pic, 18, "#fff", P.ink2, { w: 500 });
    if (i === 1 && st > .02) s += `<path d="M-480 ${y} H${n2(-480 + 760 * st)}" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>`; });
  if (fx > 0) s += OP(fx, T(-470, -560 + 130 + 66, NOTE_FIX, 36, "#1F8A4C", { a: "start", w: 700 }));
  return `<path d="M-260 0 L-130 -260 M260 0 L130 -260" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-600" y="-740" width="1200" height="600" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>`
    + T(-560, -650, "MY NOTES", 52, P.pip, { a: "start", ls: 4 }) + s + tpill(0, -165, "STAGE 2: easel + a small drawing on each line", 22, P.coral, "#fff"); }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start, revealed at the end, each as ONE smooth push-in from the
   real place (teacher, 2026-11-22; common.js gameScene / lizReveal). Part 1: a little OWL (a small brown owl with little ear tufts, a round
   body, big friendly eyes, closed in the day, a small beak) asleep on a branch of the rain tree outside the window (every wide shot of the
   room), breathing slowly; at the reveal it opens one eye, looks at us and closes it again. Part 2: a little LADYBIRD (red with black spots,
   a round body, two small feelers, friendly eyes) walking slowly along one leaf of the young tree and back (every wide shot of the garden);
   at the reveal it lifts its wing cases, flies a hand's width to the next leaf and settles. Both cute AND alive (SERIES_FORMAT section 6).
   Free, never touched. Not on screen during a [LOOK CLOSER] or a journey. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: owlArt(t, o) / ladybirdArt(t, o).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["owl", hiddenPH("owl")] : ["ladybird", hiddenPH("ladybird")];
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#FFF0DA" : "#E3F5D8"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[0], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shot (the world the push-ins go into). Stage 2 moves these to the drawn tree / leaf.
const OWL = [1530, 330], LADY = [1210, 560];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, with the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn sets: VF(t, o) (the living room) and VG(t, o) (the garden).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const flatPH = (t) => setPH(t, "The HDB living room, early morning (the wide shot)", ["Window with a grille, curtains drawn back; far blocks, a strip of sky (deep blue to pale orange), the top of a rain tree at the RIGHT side of the window (the little owl asleep on a branch), the junction and its traffic light below. A sofa, a low table with a globe, a torch on four books; a clock on the wall (five to seven); a ceiling fan turning slowly; a school bag by the door.",
  "Life: the fan turns, one bird crosses the sky, a far bus, lit windows go out one by one as the sky gets light. Camera: a slow drift towards the window."], OWL, "owl");
const gardenPH = (t) => setPH(t, "The community garden beside an HDB block (the wide shot)", ["Bright morning: planter beds, a bench, a young tree tied to a stake (the little ladybird on one of its leaves), a tall old tree with red fruits, the void deck behind, a water dish, a bush. A hen and three chicks peck on the grass; far off, a rooster. The board CYCLE CHECK by the bench.",
  "Life: leaves stir, the hen pecks, chicks hop, a butterfly passes, clouds drift slowly. Camera: a gentle drift."], LADY, "ladybird");

/* ---------- LOOK CLOSER, Stage 1: the real lookCloser frame (closer.js: push-in, dim, the window opens from the thing, the LOOK CLOSER tag,
   the verdict at v_*) with a placeholder art() that lists what Stage 2 draws inside the window. o: { title, notes: [..], verdict: [text, colour, opts],
   v: mark, setNote: (when the scene before is not the set we zoom in from) a placeholder set, fx, fy, beats: [[mark, label], ...] (a small
   clock of the picture beats inside the window, so Stage 2 sees when each thing happens), over(t) } ---------- */
function lcPH(t, s, o) { const set = o.setNote ? (tt) => { window._noHud = true; try { return phScene(tt, s, "SET: " + o.setNote, []); } finally { window._noHud = false; } } : undefined;
  const art = (tt) => { let a = `<rect x="-800" y="-380" width="1600" height="760" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="16 12"/>`
    + tpill(0, -300, "LOOK CLOSER · STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 2 }) + T(0, -220, o.title, 46, P.ink); let y = -150;
    for (const n of o.notes || []) for (const ln of wrap(n, 27, 1480, 500)) { a += `<text x="-740" y="${y}" font-family="Fredoka" font-weight="500" font-size="27" fill="${P.ink}">${esc(ln)}</text>`; y += 36; }
    const bt = (o.beats || []).filter(([mk]) => TL.marks[mk] !== undefined && tt >= TL.marks[mk]).pop();
    if (bt) a += TF(560, -300, 1, tpill(0, 0, "NOW: " + bt[1], 26, P.sun, P.ink, { w: 700 }));
    for (const id of TL.order) { const L = TL.lines[id]; if (L.who !== "chant" && tt >= L.t - .05 && tt < L.end + .3) a += tpill(0, 300, (L.who.toUpperCase() + ": " + L.text).slice(0, 100), 26, "#120E2E", "#fff", { w: 600 }); }
    return a; };
  const over = (tt) => (o.over ? o.over(tt) : "");
  return lookCloser(t, s, { tz: s.t0, fx: o.fx || 960, fy: o.fy || 560, art, set, verdict: o.verdict, tv: MK(o.v), over }); }

/* ---------- small Stage 1 helpers for p1.js / p2.js ---------- */
// the placeholder object in a lock-in ring (Stage 2 draws the real picture inside the ring)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + wrap(txt, 28, 260, 600).map((l, j, A) => T(430, 480 + j * 32 - (A.length - 1) * 16, l, 28, P.ink)).join("");
// the small print (script section 1, Safety; always fully inside the frame, upper left under the logo pill, as EP12 / EP13's rules).
const SUN_RULE = "Never look at the Sun.", SUN_DRAW_RULE = "A drawing. Never look at the real Sun.", TORCH_RULE = "A model. Never shine a torch at anyone's eyes.", HEN_RULE = "We look. We do not chase or touch the chickens.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (script section 3; the same as script.py DARE_CARDS / DARE_LABEL / DARE_CLUES / NEXT_CARDS): Block A, Block B
const DARE_CARDS = ["The Sun moves away", "The Earth turns", "Clouds hide the Sun"], DARE_LABEL = "Why does the Sun come back?", DARE_CLUES = ["every evening: it goes", "every morning: it comes back"];
const NEXT_CARDS = ["A mango", "A flower", "A young plant"];
// the clock pill of the time-lapse (Monday · 7:00 am ...) and the week pill of the chick (Week 1 ...). origin = its centre
const CLOCK = [["clk0", "Monday · 7:00 am"], ["dusk", "Monday · 7:30 pm"], ["tue7", "Tuesday · 7:00 am"], ["tue730", "Tuesday · 7:30 pm"], ["wed7", "Wednesday · 7:00 am"]];
const WEEKS = [["wk1", "Week 1"], ["wk6", "Week 6"], ["wk12", "Week 12"], ["wk24", "Week 24"], ["later3", "3 weeks later"]];
const stepPill = (t, list, x, y, size = 34) => { const cur = list.filter(([mk]) => TL.marks[mk] !== undefined && t >= TL.marks[mk]).pop(); if (!cur) return ""; const t0 = MK(cur[0]);
  return TF(x, y, 1 + .12 * pulse(t, t0, .02, .3), `<g filter="url(#dropS)"><rect x="${n2(-tw(cur[1], size, 700) / 2 - 64)}" y="-${size}" width="${n2(tw(cur[1], size, 700) + 128)}" height="${size * 2}" rx="${size}" fill="${P.ink}"/></g><circle cx="${n2(-tw(cur[1], size, 700) / 2 - 30)}" cy="0" r="${n2(size * .45)}" fill="#fff"/><path d="M${n2(-tw(cur[1], size, 700) / 2 - 30)} 0 l0 ${n2(-size * .32)} M${n2(-tw(cur[1], size, 700) / 2 - 30)} 0 l${n2(size * .24)} 0" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` + T(16, n2(size * .36), cur[1], size, "#fff", { w: 700 })); };
