// tests.js: EP19's data and Stage 1 helpers ("Why a magnet ignores a copper wire"). Loaded after pics.js, before ep18dare.js and common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws our block's VOID DECK on a Saturday afternoon (EP18's void deck:
// stone tables and round stools, the letterboxes, square pillars, a ceiling fan, the lift lobby's steel doors at the back (background only,
// never tested), a notice board, a bicycle rack, a grey pipe under the ceiling, a lamp post and the playground just outside; EP18's LIFE CYCLE
// DAY easels and metal frame now carrying the banner OUR NEW THEME: INTERACTIONS with I1 and I2 printed small), the MAGNET TEST TABLE (a
// stone table with a big shallow tray in two halves, ATTRACTED green / NOT ATTRACTED blue, and a basket of the book's objects), the
// RECYCLING CORNER at the void deck's edge after a shower (the big blue recycling bin with round openings and its Recyclables label, the wet
// path, a planter with wet leaves, a potted plant by the pillar), the playground's swing, the four look-closers, the two journeys and the
// two hidden animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names: p1.js / p2.js call them).

/* ---------- the answer colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one". No red, no buddy
   colour and no sun yellow for an answer. EP19's two fixed colours (script section 3), everywhere (the tray's halves, the tags, the METALS
   board's rims, the chant's answers): ATTRACTED / MAGNETIC green (MAGC), NOT ATTRACTED / NON-MAGNETIC blue (NONC). The copper wire orange-brown
   (COPC), aluminium silver (ALUC), steel silver-grey (STEELC), iron dark grey (IRONC): the objects' own colours, never a tag's. ---------- */
const GOODC = P.leaf, WEAKC = P.blue, MAGC = P.leaf, NONC = P.blue, COPC = "#C8723A", ALUC = "#C9D2DE", STEELC = "#9AA4B4", IRONC = "#5A6070";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it
// an ATTRACTED / NOT ATTRACTED chip (green / blue): k = 0 attracted / magnetic, 1 not attracted / non-magnetic. Stage 2 joins each chip to its
// object with a line (SERIES_FORMAT 6: every tag points to what it describes)
const matChip = (t, t0, x, y, k, txt, size = 32) => t < t0 ? "" : TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, k ? NONC : MAGC, "#fff", { w: 700 }));

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little PIGEON (a rock pigeon: grey, two dark bars on each wing, a shiny
   green-and-purple neck, round orange eyes, pink feet; it bobs its head as it walks), Part 2 a little SNAIL (a small land snail: a brown spiral
   shell, a soft grey-brown body, two pairs of feelers with the eyes on the tips of the long pair, a shiny trail; it glides, its feelers
   wiggle). A NEW fair spot in every scene (SCENES_TODO), never back at the spot where the game's push-in introduced it (the grey pipe under the
   void deck's ceiling / the side of the blue recycling bin), never twice in one spot; not on screen during a [LOOK CLOSER], a journey or a
   countdown. Free, never touched or fed. HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["pigeon", hiddenPH("pigeon"), "pigeon"] : ["snail", hiddenPH("snail"), "snail"];   // Stage 2: pigeonArt(t, o) / snailArt(t, o)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#E4E8F0" : "#E9EFD8"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shots the push-ins go into. INTRO = the game's push-in (the grey pipe under the void deck's ceiling / the
// side of the blue recycling bin); REVEAL = the reveal's spot (on top of the bicycle rack / a wet leaf of the potted plant by the pillar):
// never the same, and never a spot used in another scene. Stage 2 moves these to the drawing.
const PIGEON = [1380, 250], PIGEON_R = [1560, 780], SNAIL = [1320, 700], SNAIL_R = [520, 640];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn sets (e.g. `VD19` the void deck with the test table, `RC19` the corner).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const deckPH = (t, at = PIGEON) => setPH(t, "Our block's void deck, Saturday afternoon (the wide shot)", ["EP18's HDB void deck: square pillars, stone tables and round stools, the letterboxes on the back wall, a ceiling fan turning, a grey PIPE under the ceiling, the lift lobby's steel doors at the back, a notice board, a BICYCLE RACK, a lamp post and the playground just outside. EP18's easels and metal frame carry the banner OUR NEW THEME: INTERACTIONS (I1 and I2 printed small). The MAGNET TEST TABLE in the middle: a stone table, a big shallow tray in two halves (ATTRACTED green, NOT ATTRACTED blue), a basket of the book's objects.",
  "Life: the fan turns, children's voices from the playground, a bicycle bell, the lift's soft ding, a pigeon's coo from above. Camera: a slow drift."], at, "pigeon");
const cornerPH = (t, at = SNAIL) => setPH(t, "The recycling corner at the void deck's edge, after a shower (the wide shot)", ["The edge of our block's void deck just after the rain: the big BLUE RECYCLING BIN (round openings, a Recyclables label), the wet path shining, drips from the void deck's edge, a planter with wet leaves, a POTTED PLANT by the pillar; the MAGNET TEST TABLE in the foreground (the pin in its green half, the copper wire in its blue half).",
  "Life: drips, a gurgling drain, birds, a far-off rubbish truck. Camera: a slow drift from the bin to the table."], at, "snail");

/* ---------- the MAGNET TEST TABLE's tray (the build-and-reveal, script section 3): Stage 1 placeholder, drawn wherever the table is at its
   HOME (cold, back, table, answer, holdon, sticky, cliff, nyk; Part 2 place, tinans, table, show, interact, dare, nyk). items: [[label, half,
   t0]] (half 0 = ATTRACTED green, 1 = NOT ATTRACTED blue); an item shows from t0 on, slid low into its half (never across a cut). In Part 2 the
   halves' labels flip to the book's names at the mark `groups` (MAGNETIC MATERIALS / NON-MAGNETIC MATERIALS) and stay so. Stage 2 draws the
   real tray and objects (keep the call). ---------- */
const TRAY1 = [["steel pin", 0, "trayPin"], ["copper wire", 1, "trayWire"]];
const TRAY2 = [["steel pin", 0, 0], ["copper wire", 1, 0], ["food tin", 0, "ansglow"], ["drink can", 1, "ansglow"], ["8 book objects", 1, "v_metals"], ["iron nail, paper clip", 0, "groups"]];
function trayPH(t, x, y, k = 1, items = PART === 1 ? TRAY1 : TRAY2) { const flip = PART === 2 && t >= MKS("groups") - .2, f = flip ? ss(MKS("groups") - .2, MKS("groups") + .2, t) : 0;
  const lab = (i) => flip ? ["MAGNETIC MATERIALS", "NON-MAGNETIC MATERIALS"][i] : ["ATTRACTED", "NOT ATTRACTED"][i];
  let s = `<g filter="url(#dropS)"><rect x="-430" y="-110" width="860" height="220" rx="26" fill="#EDE6D6" stroke="${P.ink}" stroke-width="5"/></g>`
    + `<rect x="-414" y="-94" width="404" height="188" rx="18" fill="${MAGC}" opacity=".28"/><rect x="10" y="-94" width="404" height="188" rx="18" fill="${NONC}" opacity=".28"/>`
    + [0, 1].map((i) => TF(i ? 212 : -212, -132, 1 + .08 * pulse(t, MKS("groups"), .05, .5), tpill(0, 0, lab(i), flip ? 24 : 28, i ? NONC : MAGC, "#fff", { w: 700 }))).join("");
  const n = [0, 0];
  for (const [l, h, m] of items) { const t0 = typeof m === "string" ? MKS(m) : m; if (t < t0) continue; const j = n[h]++; s += TF((h ? 212 : -212) + (j % 2 ? 100 : -100), -40 + Math.floor(j / 2) * 64, spring(t, t0, .4), tpill(0, 0, l, 24, "#fff", P.ink, { w: 500 })); }
  return TF(x, y, k, s + (f > 0 && f < 1 ? `<rect x="-430" y="-150" width="860" height="40" fill="#fff" opacity="${n2(.5 * Math.sin(f * Math.PI))}"/>` : "")); }

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
const PIGEON_RULE = "We look, and we do not feed pigeons.", LOOK_RULE = "We look, and we do not touch.", KITCHEN_RULE = "Ask an adult before you borrow things from the kitchen.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP18's dare: its three cards, ep18dare.js), Block B (into EP20)
const DARE_CARDS = ["The steel pin", "The copper wire", "Both"], DARE_LABEL = "Which will the magnet pull?", DARE_CLUES = ["both are metal", "a bar magnet"];
const NEXT_CARDS = ["A pull", "A push"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
