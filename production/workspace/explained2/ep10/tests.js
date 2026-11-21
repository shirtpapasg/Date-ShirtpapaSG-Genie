// tests.js: EP10's data and Stage 1 helpers ("A metal ship floats but a metal spoon sinks. Why?"). Loaded after pics.js, before common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the beach shelter at East Coast Park, the void deck in the rain,
// the tub, the blocks and spoons, the ship and its cut-away, the bowl, the raincoat, the school shoe, the fabric boots and the shoe wax, the
// trays, the two journeys and the two hidden animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the
// names and arguments: p1.js / p2.js already call them).

/* ---------- the two answer colours (SERIES_FORMAT section 4; script section 3): FLOATS and WATERPROOF green, SINKS and NOT WATERPROOF blue
   (tags and trays). Water is a clear light blue everywhere, so blue tags always sit on cream. ---------- */
const GOODC = P.leaf, WEAKC = P.blue;

/* ---------- the board OUR 3 WATER TESTS (script section 3): a cream board on a low stand, three rows with a tick box each:
   1 DROP IT IN · 2 DRIP ON IT · 3 WAX IT. Part 1 stamps row 1 at tick1; Part 2 starts with row 1 ticked and stamps rows 2 and 3 at tick2 /
   tick3. ---------- */
const TESTS = [["1", "DROP IT IN", "tick1"], ["2", "DRIP ON IT", "tick2"], ["3", "WAX IT", "tick3"]];
const tickT = (i) => { const mk = TL.marks[TESTS[i][2]]; return PART === 2 && i < 1 ? -1 : mk === undefined ? 1e9 : mk; };
const ticked = (i, t) => t >= tickT(i);
// STAGE 1 placeholder of the board (functional: rows, ticks, a glowing row). Stage 2 redraws it on its low stand, standing on the table or ground.
// o.glow = row index that glows (0..2) or -1; origin = the middle of the stand's feet
// Stage 2: the drawn board is board3Art (water.js); the name and arguments are kept.
function board3(t, o = {}) { return board3Art(t, o); }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little OTTER swimming on the spot by the breakwater rocks at the left of the beach (every wide shot of the beach), head up.
   Part 2: a little SNAIL gliding on the rim of the biggest flower pot at the void deck's edge, in the rain (every wide shot of the void deck).
   Both drawn cute AND alive (SERIES_FORMAT section 6): round shapes, big friendly eyes with a highlight, a little smile, an idle loop
   (the otter paddles and bobs, lifts its head, whiskers twitch; the snail glides, stretches its neck, waves an eye stalk). ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: otterArt(t) / snailArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["otter", (t) => TF(4, 8, 1.02, otterArt(t))] : ["snail", (t) => TF(4, 6, 1.0, snailArt(t))];   // Stage 2: drawn in water.js
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#DDF4FF" : "#CFEFD6"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[0], n2(r * .24), P.ink, "#fff", { w: 700 }));

/* ---------- LOOK CLOSER, Stage 1: the real lookCloser frame (closer.js: push-in, dim, the window opens from the thing, the LOOK CLOSER tag,
   the verdict at v_*) with a placeholder art() that lists what Stage 2 draws inside the window. o: { title, notes: [..], verdict: [text, colour],
   v: mark, strips: [[id, text, {off, y, size, keys}], ...] (a book sentence on cream strips at the window's top; off = index of its first word in the line), setNote: (when the scene before is not the set we
   zoom in from) a placeholder set, fx, fy } ---------- */
function lcPH(t, s, o) { const set = o.setNote ? (tt) => { window._noHud = true; try { return phScene(tt, s, "SET: " + o.setNote, []); } finally { window._noHud = false; } } : undefined;
  const art = (tt) => { let a = `<rect x="-800" y="-380" width="1600" height="760" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="16 12"/>`
    + tpill(0, -300, "LOOK CLOSER · STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 2 }) + T(0, -220, o.title, 46, P.ink); let y = -150;
    for (const n of o.notes || []) for (const ln of wrap(n, 28, 1480, 500)) { a += `<text x="-740" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
    for (const id of TL.order) { const L = TL.lines[id]; if (L.who === "heart" && tt >= L.t - .05 && tt < L.end + .3) a += tpill(0, 300, ("HEART: " + L.text).slice(0, 96), 26, "#120E2E", "#fff", { w: 600 }); }
    return a; };
  return lookCloser(t, s, { tz: s.t0, fx: o.fx || 960, fy: o.fy || 560, art, set, verdict: o.verdict, tv: MK(o.v), over: o.strips ? (tt) => o.strips.map(([id, text, so]) => lcStrip(tt, id, text, so || {})).join("") : undefined }); }

/* ---------- small Stage 1 helpers for p1.js / p2.js ---------- */
// (the two trays, traysPH, are drawn in rainy.js)
// the placeholder object in a lock-in ring (Stage 2 draws the real picture inside the ring)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 30, P.ink);
