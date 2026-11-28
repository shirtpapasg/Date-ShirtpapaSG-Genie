// tests.js: EP21's data and Stage 1 helpers ("Hang a magnet and it points North-South. Every time."). Loaded after pics.js, before
// ep20dare.js and common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws Part 1's SCHOOL FIELD on Tuesday after school (green grass, a
// red running track, white goalposts, two floodlight poles with a wire between them, a netball court with two hoops, a sports shed, a
// chain-link fence, the school block with classroom windows behind, a big RAIN TREE at the far end (every leaf cluster on a twig, on a
// branch, on the trunk), a WOODEN BENCH, two plastic chairs back to back with a wooden broom handle across them, Basil's red-and-blue bar
// magnet hanging level from it on a thin string, THE SPIN CHART (a portable whiteboard on wheels), a PE equipment trolley, two orange PE
// cones), Part 2's PULAU UBIN on Saturday morning (the JETTY with bumboats (tyres hung on their sides), THE TRAIL MAP on a wooden signboard
// with an empty compass rose, the sea with big ships at anchor, the mangroves and the coastal path (prop roots joining the trunks), a
// wooden BOARDWALK over the shore with green seagrass in the clear shallows), the four look-closers, the two journeys and the two hidden
// animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names: p1.js / p2.js call them).

/* ---------- the colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one" (as every episode). EP21
   (script section 3, "Colours"): THE NORTH-SOUTH LINE is a dashed GOLD line (NSC) with a small N at one end and S at the other, the same in
   every panel and on THE SPIN CHART (gold is not a buddy colour, not sun-yellow #FFC83A, not an answer colour); when the bar magnet meets
   the needle, PULL is green (PULLC) and PUSH magenta (PUSHC, #D9468F: EP20's colours); every magnet a red North half (NORTHC) with a white
   N and a blue South half (SOUTHC) with a white S; Momo's compass needle red at its North end (NEEDLEC) and white at its South end; the
   Earth blue seas, green and sand-brown land, white cloud, with the place words North / South in white: NEVER red or blue on the Earth,
   never a bar magnet inside it. ---------- */
const GOODC = P.leaf, WEAKC = P.blue, PULLC = P.leaf, PUSHC = "#D9468F", NORTHC = "#E0453A", SOUTHC = "#2F6FD6", NSC = "#C9932E", NEEDLEC = "#E0453A", NEEDLEW = "#F4F2EC", CONEC = "#F28C28";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it
// a PULL / PUSH chip (green / magenta): k = 0 a pull (attract), 1 a push (repel). Stage 2 joins each chip to what it describes with a line
const ppChip = (t, t0, x, y, k, txt, size = 32) => t < t0 ? "" : TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, k ? PUSHC : PULLC, "#fff", { w: 700 }));
// THE NORTH-SOUTH LINE: a dashed gold line from (x1, y1) to (x2, y2) with a small N at the first end and S at the second; it draws in from
// t0 over .6 s. The same look everywhere (the cones, the look-closers, THE SPIN CHART, the compasses).
const nsLine = (t, t0, x1, y1, x2, y2, size = 34) => { if (t < t0) return ""; const u = eo(clamp((t - t0) / .6)), xe = x1 + (x2 - x1) * u, ye = y1 + (y2 - y1) * u;
  return `<path d="M${n2(x1)} ${n2(y1)} L${n2(xe)} ${n2(ye)}" stroke="${NSC}" stroke-width="${n2(size * .24)}" stroke-dasharray="${n2(size * .6)} ${n2(size * .4)}" stroke-linecap="round"/>`
    + TF(x1, y1, spring(t, t0, .4), `<circle r="${n2(size * .72)}" fill="${NSC}"/>` + T(0, n2(size * .36), "N", size, "#fff"))
    + (u > .95 ? TF(x2, y2, spring(t, t0 + .5, .4), `<circle r="${n2(size * .72)}" fill="${NSC}"/>` + T(0, n2(size * .36), "S", size, "#fff")) : ""); };

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little SWALLOW (a barn swallow, a sparrow's length with long tail streamers:
   glossy dark blue back and wings, a rust-red throat and forehead, a creamy white belly, a deeply forked tail, big round dark glossy eyes
   with a highlight, a tiny beak; it perches on wires and edges with tiny feet, twitters, preens, and swoops low over the grass), Part 2 a
   little SEA TURTLE (a young green turtle, small in the frame: a smooth olive-brown shell with a pattern of plates, a rounded head with big
   gentle dark eyes and a short beak; only its head and the top of its shell show when it comes up to breathe; it blinks, takes a breath, and
   slips under with a small ripple). A NEW fair spot in every scene (SCENES_TODO), never back at the spot where the game's push-in introduced
   it (the wire between the floodlight poles / beside a jetty pillar), never twice in one spot; not on screen during a [LOOK CLOSER], a
   journey or a countdown. Free, never touched or fed. HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["swallow", hiddenPH("swallow"), "swallow"] : ["turtle", hiddenPH("sea turtle"), "sea turtle"];   // Stage 2: swallowArt(t, o) / turtleArt(t, o). HIDDEN[0] is the word looked up in Heart's lines ("sea turtle": the word "turtle")
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#E4EEF6" : "#DDF0F0"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shots the push-ins go into. INTRO = the game's push-in (on the wire between the floodlight poles /
// beside a jetty pillar, its head up to breathe); REVEAL = the reveal's spot (on the rim of the netball hoop / in the seagrass at the end of
// the boardwalk): never the same, and never a spot used in another scene. Stage 2 moves these to the drawing.
const SWALLOW = [1460, 210], SWALLOW_R = [1500, 470], TURTLE = [1180, 760], TURTLE_R = [1420, 820];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn sets (e.g. `FD21` the field, `UB21` the jetty, `BW21` the boardwalk).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const fieldPH = (t, at = SWALLOW) => setPH(t, "The school field, Tuesday after school (the wide shot)", ["Green grass, a red running track, white goalposts, two floodlight poles with a wire between them, a netball court with two hoops, a sports shed, a chain-link fence, the school block with classroom windows behind, and at the far end a big RAIN TREE (every leaf cluster on a twig, on a branch, on the trunk). By the WOODEN BENCH: two plastic chairs back to back with a wooden broom handle across them; Basil's red-and-blue bar magnet hanging level on a thin string; THE SPIN CHART (a whiteboard on wheels); a PE equipment trolley by the shed.",
  "Life: children's voices far off, a PE whistle, a football thud, birds in the rain tree, a soft breeze; the string's faint creak. Light: warm late-afternoon sun, long shadows."], at, "swallow");
const jettyPH = (t, at = TURTLE) => setPH(t, "Pulau Ubin, Saturday morning: the jetty (the wide shot)", ["The end of the JETTY (concrete and wood), two or three bumboats bobbing alongside with tyres hung on their sides, THE TRAIL MAP on a wooden signboard at the right (its compass rose empty, a dotted route to the beach), the sea with big cargo ships at anchor on the horizon, the mangroves and the coastal path beyond (every mangrove leaf on a twig, prop roots joining the trunks and going into the mud), jetty pillars in the water.",
  "Life: waves lapping the jetty, a bumboat's putt-putt engine fading, a far ship's horn, birds in the mangroves, a soft breeze; footsteps on the boards. Light: bright morning sun on the water."], at, "sea turtle");
const bwalkPH = (t, at = TURTLE_R) => setPH(t, "Pulau Ubin: the boardwalk over the shore (the wide shot)", ["A wooden boardwalk on posts over the shore, green SEAGRASS growing from the sea floor in the clear shallows (every blade from the bottom), rocks, the mangroves' edge, the big ships at anchor on the horizon, a few clouds coming over; at the end of the boardwalk the seagrass meadow.",
  "Life: small waves, a far ship's horn, birds, the boards creaking underfoot. Light: morning sun, a few cloud shadows on the water."], at, "sea turtle");

/* ---------- the two boards (the build-and-reveal, script section 3): Stage 1 placeholders, drawn wherever the board is at its HOME.
   THE SPIN CHART (Part 1, a portable whiteboard on wheels on the grass by the bench, left of frame): three rows Spin 1 · Spin 2 · Spin 3,
   each with a small hanging magnet and an empty box. Fills: an arrow in each row, all the same way, and *the same way every time!* (chart1);
   the rows are WIPED (they fade out completely) and rewritten *the field* · *the classroom* · *the basin*, each with the same arrow, and the
   dashed gold N – S line beside them (nsline: the look-closer's result, seen when the panel eases back); a small Earth at the bottom with
   *Why? Earth behaves like a magnet* (chartEarth). THE TRAIL MAP (Part 2, a wooden signboard at the end of the jetty, right of frame): a
   hand-drawn map of the island (jetty, paths, mangroves, the beach and the boardwalk at the far end), a dotted route, and an empty compass
   rose (a star with four empty boxes). Fills: N in the box the needle's red end points to, then E, S, W (rose); the dotted route lights up
   gold with *the beach: this way* (route: the reveal). Nothing jumps across a cut: once filled, a box stays filled. Stage 2 draws the real
   boards (keep the calls and the marks). ---------- */
const arrowRow = (x, y, k = 1) => TF(x, y, k, `<path d="M-60 0 H50 M30 -18 L54 0 L30 18" stroke="${NORTHC}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
function spinChartPH(t, x, y, k = 1) { const f = (m) => ss(MKS(m) - .1, MKS(m) + .4, t), wipe = ss(MKS("nsline") - .6, MKS("nsline") - .1, t), re = f("nsline");
  let s = `<g filter="url(#dropS)"><rect x="-330" y="-300" width="660" height="600" rx="18" fill="#FBFBF7" stroke="#8A949E" stroke-width="10"/></g>` + T(0, -240, "THE SPIN CHART", 40, P.ink)
    + `<path d="M-300 300 V380 M300 300 V380" stroke="#8A949E" stroke-width="10"/><circle cx="-300" cy="392" r="16" fill="${P.ink}"/><circle cx="300" cy="392" r="16" fill="${P.ink}"/>`;
  const rows1 = ["Spin 1", "Spin 2", "Spin 3"], rows2 = ["the field", "the classroom", "the basin"];
  rows1.forEach((r, i) => { const ry = -150 + i * 110; s += OP(1 - wipe, T(-170, ry + 12, r, 34, P.ink) + `<rect x="20" y="${ry - 40}" width="220" height="80" rx="10" fill="none" stroke="${P.ink}" stroke-width="4"/>` + (t >= MKS("chart1") ? OP(f("chart1"), arrowRow(130, ry)) : "")); });
  if (t >= MKS("chart1")) s += OP(f("chart1") * (1 - wipe), T(0, 210, "the same way every time!", 32, P.ink, { w: 700 }));
  if (t >= MKS("nsline")) { rows2.forEach((r, i) => { const ry = -150 + i * 110; s += OP(re, T(-140, ry + 12, r, 32, P.ink) + arrowRow(110, ry)); }); s += nsLine(t, MKS("nsline"), 250, -170, 250, 90, 28); }
  if (t >= MKS("chartEarth")) s += OP(f("chartEarth"), `<circle cx="-200" cy="220" r="44" fill="#3F7FD0"/><path d="M-228 200 q20 -14 34 4 q10 18 -8 30 q-20 4 -26 -34z" fill="#5FAE5A"/>` + T(60, 230, "Why? Earth behaves like a magnet", 26, P.ink, { w: 600 }));
  return TF(x, y, k, s); }
const ROSE = [["N", 0, -110], ["E", 110, 0], ["S", 0, 110], ["W", -110, 0]];
function trailMapPH(t, x, y, k = 1) { const r0 = MKS("rose"), rt = MKS("route");
  let s = `<path d="M-40 330 V520 M40 330 V520" stroke="#7A5230" stroke-width="22"/><g filter="url(#dropS)"><rect x="-420" y="-330" width="840" height="660" rx="16" fill="#C99A62" stroke="#7A5230" stroke-width="10"/></g>`
    + `<rect x="-390" y="-300" width="780" height="600" rx="10" fill="#F6EBD2"/>` + T(0, -250, "THE TRAIL MAP", 40, "#5A3A1E")
    + `<path d="M-300 230 Q-200 120 -80 140 Q60 160 120 40 Q170 -60 300 -120" fill="none" stroke="${t >= rt ? "#E8B020" : "#7A5230"}" stroke-width="${t >= rt ? 14 : 8}" stroke-dasharray="${t >= rt ? "" : "16 14"}" stroke-linecap="round"/>`
    + T(-300, 280, "jetty", 26, "#5A3A1E") + T(300, -150, "the beach", 26, "#5A3A1E");
  if (t >= rt) s += TF(120, -20, spring(t, rt, .45), tpill(0, 0, "the beach: this way", 28, "#E8B020", P.ink, { w: 700 }));
  let rose = `<path d="M0 -70 L16 -16 L70 0 L16 16 L0 70 L-16 16 L-70 0 L-16 -16z" fill="#fff" stroke="#5A3A1E" stroke-width="4"/>`;
  ROSE.forEach(([l, rx, ry], i) => { const ti = r0 + .4 * i, on = t >= ti; rose += `<rect x="${rx - 30}" y="${ry - 30}" width="60" height="60" rx="8" fill="${on ? "#fff" : "#EFE2C6"}" stroke="#5A3A1E" stroke-width="4"/>` + (on ? TF(rx, ry, spring(t, ti, .4), T(0, 14, l, 40, l === "N" ? NEEDLEC : "#5A3A1E")) : ""); });
  s += TF(-230, -60, 1, rose);
  return TF(x, y, k, s); }
// a simple STAGE 1 compass (Momo's clear hiking compass, seen from above): the dial with N, E, S, W (turned by caseDeg), the thin needle
// (red North end, white South end) at needleDeg (0 = pointing up the frame). Stage 2 draws the real one.
const compassPH = (needleDeg = 0, caseDeg = 0, k = 1) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-150" y="-170" width="300" height="380" rx="26" fill="#DDEFF5" opacity=".85" stroke="#6A8A96" stroke-width="5"/></g><circle r="130" fill="#FBFBF7" stroke="${P.ink}" stroke-width="6"/>`
  + `<g transform="rotate(${n2(caseDeg)})">` + ROSE.map(([l, rx, ry]) => T(rx * .95, ry * .95 + 14, l, 38, l === "N" ? NEEDLEC : P.ink)).join("") + `</g>`
  + `<g transform="rotate(${n2(needleDeg)})"><path d="M0 -108 L12 0 L-12 0z" fill="${NEEDLEC}" stroke="${P.ink}" stroke-width="3"/><path d="M0 108 L12 0 L-12 0z" fill="${NEEDLEW}" stroke="${P.ink}" stroke-width="3"/></g><circle r="9" fill="#8A949E" stroke="${P.ink}" stroke-width="3"/>`);
// the needle settling: a damped swing from a0 to 0 starting at t0 (degrees)
const settle = (t, t0, a0 = 90, tau = 1.1, w = 5) => t < t0 ? a0 : a0 * Math.exp(-(t - t0) / tau) * Math.cos((t - t0) * w);

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
const LOOK_RULE = "We look, and we do not touch.", PHONE_RULE = "Keep magnets away from phones and compasses.", CLOSE_RULE = "Bring a magnet close slowly, and never press it onto the compass.", HIKE_RULE = "Hiking at Pulau Ubin? Go with an adult.";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP20's dare: its two cards, ep20dare.js), Block B (into EP22)
const DARE_CARDS = ["A different way every time", "The same way every time"], DARE_LABEL = "Where does it stop?", DARE_CLUES = ["a string", "spin, spin, spin", "free to turn"];
const NEXT_CARDS = ["Nothing happens", "The nail attracts the clips"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
