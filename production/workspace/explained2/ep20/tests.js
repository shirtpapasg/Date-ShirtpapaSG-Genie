// tests.js: EP20's data and Stage 1 helpers ("Magnets that float in mid-air: poles, pulls and pushes"). Loaded after pics.js, before
// ep19dare.js and common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws Part 1's SCHOOL SCIENCE ROOM on Monday after school (lab
// benches with stools tucked under, a whiteboard with THE POLES BOARD, a science poster, a ceiling fan, a sink, the class plant in a pot on
// the window sill (every leaf on a stem), a bookshelf by the door, the fan's switch box, the school field and a corridor outside the
// windows; on the front bench the class STATIONERY TRAY of steel paper clips, Basil's red-and-blue bar magnet, round pencils, Pip's pencil in
// plasticine with the two ring magnets, the top one floating), Part 2's HDB FLAT that evening (the KITCHEN: a white fridge with the card
// WHICH POLES FACE? held by four round whiteboard magnets, a ceiling light, the window with laundry poles and the next block outside, a
// potted plant on the sill, a small table; through the doorway the LIVING ROOM: a wooden toy train track on the floor, a wall clock, the TV
// cabinet, a toy box, a curtain rail), the four look-closers, the two journeys and the two hidden animals (SCENES_TODO.md), and replaces
// each placeholder below with the real drawing (keep the names: p1.js / p2.js call them).

/* ---------- the colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one" (as every episode). EP20's
   two fixed colours for the topic (script section 3), everywhere (the arrows, the POLES BOARD's pairs, the fridge card's boxes, the chips,
   the chant's answers): ATTRACT / PULL green (PULLC), REPEL / PUSH magenta (PUSHC, #D9468F). Blue is NOT used for repel, because every
   magnet's South pole is painted blue: NORTHC red and SOUTHC blue are the magnets' own paint only, never a tag's. The ring magnets dark grey
   (RINGC), the steel paper clips silver (STEELC), Dad's two bars plain unpainted grey (BARC). ---------- */
const GOODC = P.leaf, WEAKC = P.blue, PULLC = P.leaf, PUSHC = "#D9468F", NORTHC = "#E0453A", SOUTHC = "#2F6FD6", RINGC = "#4A4E5A", STEELC = "#9AA4B4", BARC = "#8A8F98";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it
// a PULL / PUSH chip (green / magenta): k = 0 a pull (attract), 1 a push (repel). Stage 2 joins each chip to its pair of poles with a line
// (SERIES_FORMAT 6: every tag points to what it describes)
const ppChip = (t, t0, x, y, k, txt, size = 32) => t < t0 ? "" : TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, k ? PUSHC : PULLC, "#fff", { w: 700 }));

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little SPIDER (a jumping spider, about a fingernail's size: fuzzy, black with
   small white marks, two big round glossy front eyes with a highlight, EIGHT legs (four a side), short and stout; it hops in tiny jumps,
   turns its head-and-body to "look", and hangs from a thin visible silk line, never in mid-air), Part 2 a little LIZARD (a house lizard:
   slim, pale pinkish grey-brown, slightly see-through, big round friendly dark eyes, wide flat toe pads on all four feet, five toes each, a
   long tapering tail; quick little dashes and pauses; a soft "chik-chik-chik"; its toes always ON the wall or ceiling; say "lizard", never
   "cicak"). A NEW fair spot in every scene (SCENES_TODO), never back at the spot where the game's push-in introduced it (the window frame's
   top corner / the kitchen wall beside the ceiling light), never twice in one spot; not on screen during a [LOOK CLOSER], a journey or a
   countdown. Free, never touched or fed. HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["spider", hiddenPH("spider"), "spider"] : ["lizard", hiddenPH("lizard"), "lizard"];   // Stage 2: spiderArt(t, o) / lizardArt(t, o)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#E4E8F0" : "#F3E9DC"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shots the push-ins go into. INTRO = the game's push-in (the window frame's top corner / the kitchen wall
// beside the ceiling light); REVEAL = the reveal's spot (hanging on its silk thread under the edge of the front bench / upside down on the
// ceiling above the fridge): never the same, and never a spot used in another scene. Stage 2 moves these to the drawing.
const SPIDER = [1500, 230], SPIDER_R = [760, 760], LIZARD = [1180, 200], LIZARD_R = [1560, 120];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn sets (e.g. `SR20` the science room, `KT20` the kitchen).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const roomPH = (t, at = SPIDER) => setPH(t, "The school science room, Monday after school (the wide shot)", ["Lab benches with stools tucked under, the whiteboard with THE POLES BOARD (a big bar-magnet outline, its label boxes), a science poster, a ceiling fan turning, a sink, the class plant in a pot on the window sill (every leaf on a stem), a bookshelf by the door, sunlight through the windows, the school field and a corridor outside. On the front bench: the clear STATIONERY TRAY (Paper clips), Basil's red-and-blue bar magnet, round pencils, Pip's pencil in plasticine with the two ring magnets, the top one floating.",
  "Life: the fan turns, a far-off school bell, children's voices fading down the corridor, a bird outside. Camera: a slow drift."], at, "spider");
const kitchenPH = (t, at = LIZARD) => setPH(t, "Pip's HDB kitchen, that evening (the wide shot)", ["A white fridge with the cream card WHICH POLES FACE? on its door, held by four round whiteboard magnets (four boxes: North + South, South + North, North + North, South + South); a ceiling light on; the window open with laundry poles and the next HDB block outside; a potted plant on the sill (every leaf on a stem); a small table with Pip's pencil and rings. Through the doorway: the living room, a wooden toy train track on the floor, a wall clock, the TV cabinet, a toy box, a curtain rail.",
  "Life: a fan, a pot lid's clink from a neighbour's kitchen, a far-off TV, a bus outside, the lizard's soft chik-chik-chik. Camera: a slow drift."], at, "lizard");

/* ---------- the two boards (the build-and-reveal, script section 3): Stage 1 placeholders, drawn wherever the board is at its HOME.
   THE POLES BOARD (Part 1, the science room's whiteboard): a big bar-magnet outline; fills on its marks: N red / S blue and POLES (kw_poles),
   the two gold stars *strongest pull* and *weakest* in the middle (stars), the green pull pair and the magenta push pair with *it depends
   which poles face* (board2). WHICH POLES FACE? (Part 2, the fridge door): four boxes; ATTRACT (green) in N+S and S+N (ns, sn), REPEL (magenta)
   in N+N and S+S (nn, ss); the rule *Unlike poles attract and like poles repel.* across the bottom (rule: the reveal); the small note card
   *Is it a magnet? Test: does it repel?* under it (note). Nothing jumps across a cut: once filled, a box stays filled. Stage 2 draws the real
   boards (keep the calls and the marks). ---------- */
function polesBoardPH(t, x, y, k = 1) { const on = (m) => t >= MKS(m), f = (m) => ss(MKS(m) - .1, MKS(m) + .4, t);
  let s = `<g filter="url(#dropS)"><rect x="-430" y="-230" width="860" height="460" rx="20" fill="#FBFBF7" stroke="${P.ink}" stroke-width="5"/></g>` + T(0, -180, "THE POLES BOARD", 36, P.ink)
    + `<rect x="-300" y="-80" width="600" height="120" rx="10" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="14 10"/>`
    + (on("kw_poles") ? OP(f("kw_poles"), `<rect x="-300" y="-80" width="300" height="120" fill="${NORTHC}"/><rect x="0" y="-80" width="300" height="120" fill="${SOUTHC}"/>` + T(-150, -2, "N", 70, "#fff") + T(150, -2, "S", 70, "#fff") + tpill(0, 90, "POLES", 30, P.sun, P.ink, { w: 700 })) : "")
    + (on("stars") ? OP(f("stars"), T(-260, -100, "★", 60, "#F5B700") + T(260, -100, "★", 60, "#F5B700") + tpill(0, -120, "strongest pull at the ends · weakest in the middle", 22, "#fff", P.ink, { w: 500 })) : "")
    + (on("board2") ? OP(f("board2"), tpill(-200, 175, "→ ← pull", 28, PULLC, "#fff", { w: 700 }) + tpill(60, 175, "← → push", 28, PUSHC, "#fff", { w: 700 }) + T(300, 185, "it depends which poles face", 20, P.ink, { w: 500 })) : "");
  return TF(x, y, k, s); }
const FRIDGE_BOX = [["North + South", "ns", 0], ["South + North", "sn", 0], ["North + North", "nn", 1], ["South + South", "ss", 1]];
function fridgeCardPH(t, x, y, k = 1) { let s = `<g filter="url(#dropS)"><rect x="-330" y="-300" width="660" height="600" rx="22" fill="#FFF6E2" stroke="${P.ink}" stroke-width="5"/></g>` + T(0, -240, "WHICH POLES FACE?", 40, P.ink);
  for (const [i, [lab, m, rep]] of FRIDGE_BOX.entries()) { const bx = (i % 2 ? 150 : -150), by = (i < 2 ? -110 : 60), on = t >= MKS(m);
    s += `<rect x="${bx - 135}" y="${by - 70}" width="270" height="150" rx="14" fill="${on ? (rep ? PUSHC : PULLC) : "#fff"}" opacity="${on ? .9 : 1}" stroke="${P.ink}" stroke-width="4"/>` + T(bx, by - 25, lab, 26, on ? "#fff" : P.ink)
      + (on ? TF(bx, by + 35, spring(t, MKS(m), .4), T(0, 12, rep ? "REPEL" : "ATTRACT", 40, "#fff")) : ""); }
  if (t >= MKS("rule")) s += OP(ramp(t, MKS("rule"), .5), T(0, 235, "Unlike poles attract and like poles repel.", 30, P.ink, { w: 700 }));
  [[-310, -280], [310, -280], [-310, 280], [310, 280]].forEach(([mx, my]) => { s += `<circle cx="${mx}" cy="${my}" r="20" fill="#5A7BD8" stroke="${P.ink}" stroke-width="3"/>`; });
  if (t >= MKS("note")) s += TF(0, 370, spring(t, MKS("note"), .45), `<rect x="-230" y="-40" width="460" height="80" rx="10" fill="#FFFDF4" stroke="${P.ink}" stroke-width="4"/>` + T(0, 10, "Is it a magnet? Test: does it repel?", 26, P.ink, { w: 600 }));
  return TF(x, y, k, s); }

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
const LOOK_RULE = "We look, and we do not touch.", PHONE_RULE = "Keep magnets away from phones and cards.", TRAIN_RULE = "Keep magnets away from phones, cards and little brothers and sisters.", TOOLBOX_RULE = "Ask an adult before you borrow things from the toolbox.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP19's dare: its two cards, ep19dare.js), Block B (into EP21)
const DARE_CARDS = ["A pull", "A push"], DARE_LABEL = "What holds it up?", DARE_CLUES = ["no glue", "no string", "a gap"];
const NEXT_CARDS = ["A different way every time", "The same way every time"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
