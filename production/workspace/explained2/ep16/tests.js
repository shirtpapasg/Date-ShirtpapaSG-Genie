// tests.js: EP16's data and Stage 1 helpers ("A chick looks like a hen. A tadpole doesn't look like a frog!"). Loaded after pics.js, before
// ep15dare.js and common.js. STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the community garden (EP15's garden:
// its little pond with lily pads, reeds, the big leaf over the water, the frog-egg clump and tadpoles; its grassy edge by the void deck with
// the hen and her chicks, the little grasshopper and its empty skin; the lime plant in its pot), the loop board OUR FROG'S LIFE CYCLE, Pip's
// easel boards, the four look-closers, the two journeys and the two hidden animals (SCENES_TODO.md), and replaces each placeholder below with
// the real drawing (keep the names: p1.js / p2.js call them).

/* ---------- the answer colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one". No red, no buddy
   colour and no sun yellow for an answer. EP16's two fixed colours for the chick look-closer and the chant board: LIKEC "looks like the
   adult" (green) and UNLIKEC "does not look like the adult" (orange). ---------- */
const GOODC = P.leaf, WEAKC = P.blue, LIKEC = P.leaf, UNLIKEC = "#F28A3A";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little TREE FROG (Singapore's four-lined tree frog: slim, brown-beige with darker
   stripes, big round toe pads), Part 2 a little PRAYING MANTIS (green, a triangle head, two front legs folded like hands). A NEW fair spot in
   every scene (SCENES_TODO), never back at the spot where the game's push-in introduced it (the big leaf over the pond / the flower stem in
   the planter bed), never twice in one spot; not on screen during a [LOOK CLOSER] or a journey. Free, never touched.
   HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["frog", hiddenPH("tree frog"), "tree frog"] : ["mantis", hiddenPH("mantis"), "praying mantis"];   // Stage 2: treeFrogArt(t, o) / mantisArt(t, o)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#E6F2DA" : "#EAF6D8"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shots the push-ins go into. INTRO = the game's push-in (the big leaf over the pond / a flower stem in the
// planter bed); REVEAL = the reveal's spot (the garden tap beside the pond / a sunflower): never the same. Stage 2 moves these to the drawing.
const TREEFROG = [1430, 330], TREEFROG_R = [520, 640], MANTIS = [1380, 420], MANTIS_R = [600, 400];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn garden (`VP` the pond side, `VG` the grassy corner).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const pondPH = (t, at = TREEFROG) => setPH(t, "The community garden's little pond (the wide shot)", ["EP15's garden beside the HDB block, just after rain: the void deck behind, planter beds, the bench, the old mango tree at the edge. The little POND: lily pads, a reed clump, a big leafy plant (an elephant-ear leaf) leaning over the water, a clump of frog eggs in clear jelly among the lily pads, tadpoles wriggling; the garden tap on its pipe beside the pond.",
  "Life: drips from the leaves, ripples, tadpoles darting, a dragonfly, birds; frogs calling at dawn. Camera: a slow drift."], at, "tree frog");
const grassPH = (t, at = MANTIS) => setPH(t, "The garden's grassy corner (the wide shot)", ["Bright mid-morning: long grass, a planter bed of flowers and herbs (a sunflower, a hibiscus), a lime plant in a big pot at the edge, the bench, the void deck and the block behind. The little wingless grasshopper on a blade of grass; its empty skin on another blade.",
  "Life: grass stirs, a butterfly passes, a bird hops, a far bus. Camera: a gentle drift."], at, "praying mantis");

/* ---------- LOOK CLOSER, Stage 1: the real lookCloser frame (closer.js: push-in, dim, the window opens from the thing, the LOOK CLOSER tag,
   the verdict at v_*) with a placeholder art() that lists what Stage 2 draws inside the window. o: { title, notes: [..], verdict: [text, colour, opts],
   v: mark, setNote, fx, fy, beats: [[mark, label], ...] (a small clock of the picture beats inside the window), over(t) } ---------- */
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
// the small print (SERIES_FORMAT 1, safety and care): always fully inside the frame, upper left under the logo pill
const EGG_RULE = "We look, and we leave the eggs in the pond.", HEN_RULE = "We watch from a distance. We do not chase them.", FROG_RULE = "We look, and we let the frog hop away.",
  SKIN_RULE = "We look, and we leave the skin on the grass.", MANTIS_RULE = "We look, and we do not touch.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP15's dare, its three real cards in ep15dare.js), Block B (into EP17)
const DARE_CARDS = ["A fish", "A frog", "A lizard"], DARE_LABEL = "What will the tadpole grow into?", DARE_CLUES = ["lives in water", "has a tail"];
const NEXT_CARDS = ["Yes, a nymph", "No"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
