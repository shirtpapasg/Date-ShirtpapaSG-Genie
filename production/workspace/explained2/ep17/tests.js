// tests.js: EP17's data and Stage 1 helpers ("The caterpillar that becomes a butterfly: 4 stages"). Loaded after pics.js, before ep16dare.js
// and common.js. STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the community garden (EP15 / EP16's garden beside
// the HDB block: the lime plant in its big pot at the garden's edge with the caterpillar, its pupa and the butterfly; the void deck behind;
// the far corner by the tap after rain with the old pail of rainwater, a flower pot on its plate, the watering can and the bamboo stakes),
// the HDB corridor (Part 2's plate), the loop boards OUR BUTTERFLY'S LIFE CYCLE and the mosquito loop, the easels, the four look-closers, the
// two journeys and the two hidden animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names:
// p1.js / p2.js call them).

/* ---------- the answer colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one". No red, no buddy
   colour and no sun yellow for an answer. EP17's part colours (script section 3): six legs teal, prolegs orange, tiny hooks violet;
   pupal case purple (the book-term colour). ---------- */
const GOODC = P.leaf, WEAKC = P.blue, LEGC = "#14A3A3", PROLEGC = "#F28A3A", HOOKC = "#8B5CF6", CASEC = "#7C4DDB";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little MOTH (small, brown-grey, resting flat with its wings like a little
   triangle, feathery feelers, a fuzzy body, big round eyes), Part 2 a little DRAGONFLY (small, red body, four clear wings held out flat,
   huge round eyes). A NEW fair spot in every scene (SCENES_TODO), never back at the spot where the game's push-in introduced it (the void
   deck's pillar / the tip of a bamboo stake in the planter bed), never twice in one spot; not on screen during a [LOOK CLOSER], a journey
   or a countdown. Free, never touched. HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["moth", hiddenPH("moth"), "moth"] : ["dragonfly", hiddenPH("dragonfly"), "dragonfly"];   // Stage 2: mothArt(t, o) / dragonflyArt(t, o)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#EFE6DA" : "#E2F1FA"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shots the push-ins go into. INTRO = the game's push-in (the void deck's pillar behind the garden / the tip
// of a bamboo stake in the planter bed); REVEAL = the reveal's spot (the side of the lime plant's big pot / the handle of the watering can):
// never the same. Stage 2 moves these to the drawing.
const MOTH = [1390, 380], MOTH_R = [640, 760], DRAGONFLY = [1400, 360], DRAGONFLY_R = [560, 700];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn garden (`VL` the lime-plant side, `VC` the far corner after rain).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const limePH = (t, at = MOTH) => setPH(t, "The garden's lime-plant side (the wide shot)", ["EP15 / EP16's community garden beside the HDB block: the LIME PLANT in its big glazed pot at the garden's edge (glossy leaves, a chewed leaf edge, the green caterpillar), the void deck behind with its square pillars and letterboxes, planter beds, the bench, a watering can by the pot, a fence post. Dawn, then morning.",
  "Life: the caterpillar munches; leaves stir; a bulbul hops; far traffic. Camera: a slow drift."], at, "moth");
const cornerPH = (t, at = DRAGONFLY) => setPH(t, "The garden's far corner after rain (the wide shot)", ["The same garden's far corner by the tap, mid-morning after a shower: wet leaves, a puddle drying on the path, the old plastic PAIL of rainwater by the tap (leaves floating, the surface flat and still), a flower pot on a little plate holding water, a watering can, a planter bed with bamboo stakes, the bench, the block behind.",
  "Life: drips from the leaves, rings on the pail's surface, a far bus, birds. Camera: a gentle drift."], at, "dragonfly");

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
const CAT_RULE = "We look, and we do not pick it up.", MOTH_RULE = "We look, and we let it fly away.", PAIL_RULE = "We look; we do not touch the water.",
  ADULT_RULE = "Ask an adult to help.", DRAGON_RULE = "We look, and we let it fly away.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP16's dare: its two cards), Block B (into EP18)
const DARE_CARDS = ["Yes, a nymph", "No"], DARE_LABEL = "Is the caterpillar a nymph?", DARE_CLUES = ["long, soft body", "chews leaves"];
const NEXT_CARDS = ["Yes, the same", "No, different"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
// a book strip that holds more than one sentence: ONE cream strip per sentence (lcStrip is one line; two sentences would run off the frame),
// each from its first word until the next sentence starts, the last one until the strip's hold ends
const lcStrips = (t, id, text, o = {}) => { const ss = text.match(/[^.!?]+[.!?]+/g).map((x) => x.trim()), W_ = TL.lines[id].words; let off = 0, out = "";
  ss.forEach((s, i) => { const n = s.split(" ").length, t1 = i < ss.length - 1 ? W_[off + n].a - .35 : o.t1; out += lcStrip(t, id, s, { ...o, off, t1 }); off += n; }); return out; };
