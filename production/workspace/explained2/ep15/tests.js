// tests.js: EP15's data and Stage 1 helpers ("One mango seed to a tree full of mangoes: 3 stages"). Loaded after pics.js, before ep14dare.js
// and common.js. STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the HDB kitchen and the corridor with its potted
// plants (Part 1), the pot with its window (the seed time-lapse), the observation journal, the ruler, the community garden with the old mango
// tree (Part 2), the young plant beside the tree, the board OUR MANGO'S LIFE CYCLE, Momo's homework, the seed bank, the two journeys and the
// two hidden animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names: p1.js / p2.js call them).

/* ---------- the answer colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one". No red, no buddy
   colour and no sun yellow for an answer. ---------- */
const GOODC = P.leaf, WEAKC = P.blue;
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words (A CYCLE / NOT A CYCLE / LIVING / NON-LIVING). origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT A CYCLE" : "A CYCLE"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
// the verdict options for lcVerdict (closer.js): [text, fill, opts]. VSTYLE(txt, 0) green; VSTYLE(txt, "sun") = sun-yellow letters on cream
// with a dark-violet border (DAY AND NIGHT: A REPEATED PATTERN: "not an answer colour", as EP12 / EP13)
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little garden SNAIL (kitchen window ledge, corridor pots: a new spot in every
   scene, SCENES_TODO), Part 2 a little WEAVER ANT (on the old mango tree's leaves and branches: a new spot in every scene). Cute and alive,
   free, never touched. Not on screen during a [LOOK CLOSER] or a journey. HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["snail", hiddenPH("snail"), "snail"] : ["ant", hiddenPH("weaver ant"), "weaver ant"];   // Stage 2: snailArt(t, o) / weaverAnt(t, o)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#E6F2DA" : "#FFF0DA"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shot the push-ins go into (Stage 2 moves these to the drawn ledge / leaf)
const SNAIL = [1430, 470], ANT = [1380, 360];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn sets (the kitchen / corridor, the garden).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const kitchenPH = (t) => setPH(t, "The HDB kitchen, morning (the wide shot)", ["A bright HDB kitchen: the window over the sink open, a grille, the far blocks; a chopping board with a ripe mango; a fruit bowl; a rice cooker; a calendar. The little snail sits on the OUTSIDE ledge of the kitchen window, by a pot of herbs (wet after rain).",
  "Life: a fan, drips from the window ledge, a bird on the grille, a neighbour's wind chime. Camera: a slow drift."], SNAIL, "snail");
const corridorPH = (t) => setPH(t, "The HDB corridor outside the flat (the wide shot)", ["The common corridor: the ledge with potted plants in the morning sun, OUR pot (the mango seed), a shoe rack, a laundry pole, the far blocks and sky beyond the parapet. The snail is on the rim of a neighbour's pot (it moves each scene).",
  "Life: leaves stir, a neighbour's wind chime, a bird on the parapet, a far bus. Camera: a gentle drift."], SNAIL, "snail");
const gardenPH = (t) => setPH(t, "The community garden beside an HDB block (the wide shot)", ["Bright morning: planter beds, a bench, the void deck behind; the big OLD MANGO TREE (thick trunk, a wide crown, sprays of tiny cream flowers, a few green mangoes, red new leaves at the tips); our young plant in its pot on the bench; a little pond with lily pads. The weaver ant walks along a leaf of the mango tree (its leaf nest is high up).",
  "Life: leaves stir, a butterfly passes, a bird hops, clouds drift slowly, the pond ripples. Camera: a gentle drift."], ANT, "weaver ant");

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
// the small print (SERIES_FORMAT 1, safety): always fully inside the frame, upper left under the logo pill
const KNIFE_RULE = "Only an adult uses the knife.", TASTE_RULE = "We never taste a plant we are studying.", ANT_RULE = "Weaver ants can bite. We look, and we do not touch.", SNAIL_RULE = "We look. We let the snail go on its way.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP14's dare), Block B (into EP16)
const DARE_CARDS = ["A mango", "A flower", "A young plant"], DARE_LABEL = "What will the seed grow into first?", DARE_CLUES = ["one big seed", "we plant it"];
const NEXT_CARDS = ["A fish", "A frog", "A lizard"];
// the day pill of the seed time-lapse and the journal (Day 1 ...). origin = its centre
const DAYS = [["d1", "Day 1"], ["d10", "Day 10"], ["d20", "Day 20"], ["d30", "Day 30"], ["d45", "Day 45"]];
const stepPill = (t, list, x, y, size = 34) => { const cur = list.filter(([mk]) => TL.marks[mk] !== undefined && t >= TL.marks[mk]).pop(); if (!cur) return ""; const t0 = MK(cur[0]);
  return TF(x, y, 1 + .12 * pulse(t, t0, .02, .3), `<g filter="url(#dropS)"><rect x="${n2(-tw(cur[1], size, 700) / 2 - 64)}" y="-${size}" width="${n2(tw(cur[1], size, 700) + 128)}" height="${size * 2}" rx="${size}" fill="${P.ink}"/></g><circle cx="${n2(-tw(cur[1], size, 700) / 2 - 30)}" cy="0" r="${n2(size * .45)}" fill="#fff"/><path d="M${n2(-tw(cur[1], size, 700) / 2 - 30)} 0 l0 ${n2(-size * .32)} M${n2(-tw(cur[1], size, 700) / 2 - 30)} 0 l${n2(size * .24)} 0" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` + T(16, n2(size * .36), cur[1], size, "#fff", { w: 700 })); };

// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
