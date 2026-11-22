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
const TILE_W = { day: "day time", night: "nighttime", green: "green", amber: "amber", red: "red", egg: "an egg", chick: "a chick", adult: "an adult chicken" };
// STAGE 2 (drawn): the picture tiles are flat14.js tilePic (a tiny bright sky, a tiny starry sky, three round lamps, an egg, a chick, an adult
// chicken) and pencilTile (a long pencil, a shorter one, a stub with its shavings). The board stands on a low wooden stand.
// one ring (centre cx, cy, radius R): slots evenly round it from the top, clockwise; tiles [[key, k]] (k = 0..1 how far it has landed);
// lit = 0..1 how many arrows are lit (round and round when run); glow = 0..1 (the chant's flash)
function cycRing(t, cx, cy, R, tiles, lit, run, glow = 0, small = false, id = "") { const n = Math.max(2, tiles.length); let s = "";
  if (glow > .02) s += `<circle cx="${cx}" cy="${cy}" r="${R + 84}" fill="${P.sun}" opacity="${n2(.4 * glow)}"/>`;
  for (let i = 0; i < n; i++) { const a0 = -Math.PI / 2 + (i + .24) * 2 * Math.PI / n, a1 = -Math.PI / 2 + (i + .76) * 2 * Math.PI / n, on = run ? (Math.floor((t * 1.6) % n) === i ? 1 : .6) : (lit * n > i ? 1 : 0);
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), col = on ? (on === 1 && run ? "#E39B00" : P.ink) : "#D2C2A8", ah = a1 + Math.PI / 2;
    s += `<path d="M${n2(x0)} ${n2(y0)} A${R} ${R} 0 0 1 ${n2(x1)} ${n2(y1)}" fill="none" stroke="${col}" stroke-width="${on ? 11 : 8}" stroke-linecap="round" opacity="${on ? 1 : .85}"/>`
      + `<path d="M${n2(x1 + 24 * Math.cos(ah + 2.6))} ${n2(y1 + 24 * Math.sin(ah + 2.6))} L${n2(x1)} ${n2(y1)} L${n2(x1 + 24 * Math.cos(ah - 2.6))} ${n2(y1 + 24 * Math.sin(ah - 2.6))}" fill="none" stroke="${col}" stroke-width="${on ? 10 : 8}" stroke-linecap="round" stroke-linejoin="round"/>`; }
  tiles.forEach(([key, k], i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="62" fill="#fff" stroke="#D2C2A8" stroke-width="4" stroke-dasharray="9 7"/>`;
    if (k > .02) s += TF(x, y - 46 * Math.sin(Math.PI * clamp(k)) * (k < 1 ? 1 : 0), clamp(k * 1.2), tilePic(key, t, id + i)) + (small || k < .9 ? "" : T(n2(x), n2(y + 98), TILE_W[key] || key, 30, P.ink, { w: 600 })); });
  return s; }
const BOX2 = ["IT CHANGES", "IT REPEATS"];
const tickBox = (x, y, label, on, glow = 0) => `${glow > .02 ? `<rect x="${x - 200}" y="${y - 60}" width="400" height="120" rx="26" fill="${P.sun}" opacity="${n2(.55 * glow)}"/>` : ""}<rect x="${x - 184}" y="${y - 46}" width="368" height="92" rx="20" fill="#fff" stroke="${P.ink}" stroke-width="4"/><rect x="${x - 164}" y="${y - 28}" width="56" height="56" rx="12" fill="${on > .5 ? "#E5F7EA" : "#fff"}" stroke="${P.ink}" stroke-width="5"/>`
  + T(x + 32, y + 13, label, 36, P.ink, { ls: 2 }) + (on > .02 ? TF(x - 136, y, spring(on, 0, 1), `<path d="M-20 0 L-6 16 L24 -20" fill="none" stroke="${GOODC}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`) : "");
function CYC(t, o = {}) { const m = MKS, k = (mk, d = .35) => t < m(mk) ? 0 : clamp((t - m(mk)) / d);
  if (o.show === "daynight") return { tiles: [["day", 1], ["night", 1]], lit: 1, run: 1, ticks: [1, 1], tag: [0, 1], row: null };
  if (o.show === "empty") return { tiles: [["egg", 0], ["chick", 0], ["adult", 0]], lit: 0, run: 0, ticks: [0, 0], tag: null, row: null };
  if (PART === 1) { const off = k("tilesoff", .4);
    if (t >= m("lighttiles")) return { tiles: [["green", k("lighttiles")], ["amber", k("lighttiles", .5)], ["red", k("lighttiles", .6)]], lit: 1, run: 1, ticks: [1, 1], tag: [0, 1], row: null };
    if (t >= m("tilesoff")) return { tiles: [["day", 1 - off], ["night", 1 - off]], lit: 0, run: 0, ticks: [k("penchg"), 0], tag: t >= m("pentag") ? [1, k("pentag")] : null,
      row: [["pen1", k("pen1", .4)], ["pen2", k("pen2", .4)], ["pen3", k("pen3", .4)]], rowk: k("penrow", .4) };
    return { tiles: [["day", k("tileday")], ["night", k("tilenight")]], lit: k("ringrun", .8), run: t >= m("ringrun") + .8 ? 1 : 0, ticks: [k("tick1"), k("tick2")], tag: t >= m("tagcycle") ? [0, k("tagcycle")] : null, row: null }; }
  return { tiles: [["egg", k("tegg")], ["chick", k("tchick")], ["adult", k("tadult")]], lit: t >= m("tback") ? 1 : (k("tegg") > 0 ? (t >= m("tadult") ? .67 : t >= m("tchick") ? .34 : 0) : 0), run: t >= m("tback") + .6 ? 1 : 0,
    ticks: [k("tick1"), k("tick2")], tag: t >= m("tagcycle") ? [0, k("tagcycle")] : null, title: k("tagcycle"), row: null }; }
function cycleBoard(t, o = {}) { const fl = o.flash || [0, 0, 0], top = -800, id = o.id || (o.two ? "c2" : o.small ? "cs" : "c1"); let s = "", Wb = o.two ? 1500 : 900;
  if (o.two) { // the reveal: two closed rings side by side, one non-living, one living
    s += tickBox(-210, top + 150, BOX2[0], 1, fl[2]) + tickBox(210, top + 150, BOX2[1], 1, fl[2]);
    s += cycRing(t, -380, top + 440, 150, [["day", 1], ["night", 1]], 1, 1, fl[0], true, id + "a") + cycRing(t, 380, top + 440, 150, [["egg", 1], ["chick", 1], ["adult", 1]], 1, 1, fl[1], true, id + "b");
    s += TF(-380, top + 690, 1, tpill(0, 0, "non-living: day and night", 34, "#fff", P.ink, { w: 700 })) + TF(380, top + 690, 1, tpill(0, 0, "living: a chicken", 34, "#fff", P.ink, { w: 700 }));
    if (fl[2] > .05) s += OP(Math.min(1, fl[2] * 1.5), TF(0, top + 440, 1, cycTag(t, 0, 34)));
  } else { const c = CYC(t, o);
    s += tickBox(-214, top + 150, BOX2[0], c.ticks[0]) + tickBox(214, top + 150, BOX2[1], c.ticks[1]);
    s += cycRing(t, 0, top + 438, 170, c.tiles, c.lit, c.run, 0, o.small || !!c.row, id);
    if (c.row) c.row.forEach(([key, k], i) => { if (k < .02) return; const x = lerp(-150 + i * 150, -250 + i * 250, c.rowk), y = lerp(top + 438, top + 684, c.rowk) - 56 * Math.sin(Math.PI * k) * (k < 1 ? 1 : 0);
      s += TF(x, y, clamp(k * 1.2) * lerp(.72, 1, c.rowk), pencilTile(key, t)); });
    if (c.tag) s += TF(0, top + 438 - 60 * (1 - eo(c.tag[1] / .7)), spring(c.tag[1], 0, .6), cycTag(t, c.tag[0], 36));
    if (c.title > .02) s += TF(0, top + 236, spring(c.title, 0, .6), tpill(0, 0, "A LIFE CYCLE", 40, P.sun, P.ink, { w: 700, ls: 3 })); }
  return `<ellipse cx="0" cy="2" rx="${Wb * .5}" ry="16" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><path d="M${-Wb * .34} 0 L${-Wb * .3} -90 L${-Wb * .26} 0 M${Wb * .34} 0 L${Wb * .3} -90 L${Wb * .26} 0" fill="none" stroke="#8A5A36" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M${-Wb * .34} -26 H${Wb * .34}" stroke="#A9703C" stroke-width="12" stroke-linecap="round"/>
    <g filter="url(#drop)"><rect x="${-Wb / 2}" y="${top}" width="${Wb}" height="750" rx="30" fill="#B07A44"/><rect x="${-Wb / 2 + 12}" y="${top + 12}" width="${Wb - 24}" height="726" rx="22" fill="url(#gPaper)"/></g><rect x="${-Wb / 2 + 12}" y="${top + 12}" width="${Wb - 24}" height="84" rx="22" fill="#FFE9B8"/>`
    + T(0, top + 74, "CYCLE CHECK", 52, P.ink, { ls: 6 }) + s; }

/* ---------- Pip's notes on an easel (Part 2 Showdown; script section 5, segment 9): the heading MY NOTES and three ruled lines, each with a
   small drawing; line 2 is the mistake. STAGE 1 placeholder (functional: each line lights as Pip reads it, the lines stay through the
   countdown; at strike line 2 is struck through once; at bend it is rewritten under it in green and its little drawing bends from a ROW into
   a RING with an arrow from the adult back to the egg). o.lit [3]; o.strike 0..1; o.fix 0..1. origin = the easel's feet ---------- */
const NOTES = [["Day and night are a cycle.", ""], ["A life cycle ends at the adult.", ""], ["A teddy bear has no life cycle.", ""]], NOTE_FIX = "A life cycle repeats: the adult has young.";
// STAGE 2 (drawn): a real easel (three legs, a ledge), a sheet of paper, Pip's heading and a small drawing at the end of each line: the day
// and night tiles on their ring · an egg, a chick and an adult chicken in a ROW with a full stop (it bends into a RING at o.fix, with a green
// arrow from the adult back to the egg) · the teddy bear.
const miniArrow = (x0, y0, x1, y1, col = P.ink, w = 6) => { const a = Math.atan2(y1 - y0, x1 - x0); return `<path d="M${n2(x0)} ${n2(y0)} L${n2(x1)} ${n2(y1)} M${n2(x1 + 14 * Math.cos(a + 2.6))} ${n2(y1 + 14 * Math.sin(a + 2.6))} L${n2(x1)} ${n2(y1)} L${n2(x1 + 14 * Math.cos(a - 2.6))} ${n2(y1 + 14 * Math.sin(a - 2.6))}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`; };
function notesEasel(t, o = {}) { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0, Y0 = -606, DY = 136; let s = "";
  NOTES.forEach(([txt], i) => { const y = Y0 + i * DY + (i === 2 ? 60 * fx : 0); if (lit[i] > .02) s += `<rect x="-566" y="${n2(y - 56)}" width="1132" height="${i === 1 && fx > 0 ? n2(112 + 60 * fx) : 112}" rx="18" fill="${P.sun}" opacity="${n2(.38 * lit[i])}"/>`;
    s += `<path d="M-540 ${n2(y + 50 + (i === 1 ? 60 * fx : 0))} H540" stroke="#D9C9A8" stroke-width="3"/><circle cx="-506" cy="${n2(y)}" r="30" fill="${P.pip}"/>` + T(-506, n2(y + 15), (i + 1) + "", 42, "#fff") + T(-454, n2(y + 14), txt, 42, i === 1 && st > .5 ? "#8E86A8" : P.ink, { a: "start", w: 600 });
    if (i === 1 && st > .02) s += `<path d="M-458 ${n2(y + 2)} H${n2(-458 + (tw(txt, 42, 600) + 12) * st)}" stroke="${P.coral}" stroke-width="7" stroke-linecap="round"/>`;
    if (i === 0) s += TF(352, y, .4, tilePic("day", t, "n0")) + TF(476, y, .4, tilePic("night", t, "n1")) + `<path d="M380 ${n2(y - 22)} Q414 ${n2(y - 44)} 448 ${n2(y - 22)}" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><path d="M448 ${n2(y + 22)} Q414 ${n2(y + 44)} 380 ${n2(y + 22)}" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><path d="M438 ${n2(y - 34)} l10 12 l-15 4 M390 ${n2(y + 34)} l-10 -12 l15 -4" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i === 1) { const e = eio(fx), cx = 414, cy = y + 30 * e, R = 62, row = [[312, y], [414, y], [516, y]], ring = [-90, 30, 150].map((a) => [cx + R * Math.cos(a * Math.PI / 180) * 1.25, cy + R * Math.sin(a * Math.PI / 180)]), P3 = row.map((p, k) => [lerp(p[0], ring[k][0], e), lerp(p[1], ring[k][1], e)]);
      const short = (a, b, col, w) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / d, uy = (b[1] - a[1]) / d; return miniArrow(a[0] + ux * 30, a[1] + uy * 30, b[0] - ux * 32, b[1] - uy * 32, col, w); };
      s += short(P3[0], P3[1], P.ink, 5) + short(P3[1], P3[2], P.ink, 5) + (fx > .55 ? OP(clamp((fx - .55) / .3), short(P3[2], P3[0], "#1F8A4C", 7)) : "") + ["egg", "chick", "adult"].map((k, q) => TF(P3[q][0], P3[q][1], .38, tilePic(k, t, "n" + (q + 2)))).join("")
        + OP(1 - clamp(fx * 3), `<circle cx="556" cy="${n2(y + 16)}" r="8" fill="${P.ink}"/>`); }
    else s += TF(414, y + 6, .3, teddy()); });
  if (fx > 0) s += OP(fx, T(-454, Y0 + DY + 72, NOTE_FIX, 40, "#1F8A4C", { a: "start", w: 700 }));
  return `<ellipse cx="0" cy="2" rx="420" ry="18" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><path d="M-250 -720 L-400 0 M250 -720 L400 0 M0 -740 L0 -60" stroke="#8A5A36" stroke-width="20" stroke-linecap="round"/><rect x="-420" y="-176" width="840" height="24" rx="10" fill="#A9703C" stroke="#7E4F27" stroke-width="4"/>
    <g filter="url(#drop)"><rect x="-600" y="-790" width="1200" height="616" rx="18" fill="#FFFDF6"/></g><rect x="-600" y="-790" width="1200" height="96" rx="18" fill="#EDE4FF"/><circle cx="-540" cy="-778" r="12" fill="#C9D2DC" stroke="#8E9AA8" stroke-width="4"/><circle cx="540" cy="-778" r="12" fill="#C9D2DC" stroke="#8E9AA8" stroke-width="4"/>`
    + T(-540, -716, "MY NOTES", 56, P.pip, { a: "start", ls: 5 }) + TF(-180, -734, 1, `<g transform="rotate(-18)">${pencil14(90, { h: 16 })}</g>`) + s; }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start, revealed at the end, each as ONE smooth push-in from the
   real place (teacher, 2026-11-22; common.js gameScene / lizReveal). Part 1: a little OWL (a small brown owl with little ear tufts, a round
   body, big friendly eyes, closed in the day, a small beak) asleep on a branch of the rain tree outside the window (every wide shot of the
   room), breathing slowly; at the reveal it opens one eye, looks at us and closes it again. Part 2: a little LADYBIRD (red with black spots,
   a round body, two small feelers, friendly eyes) walking slowly along one leaf of the young tree and back (every wide shot of the garden);
   at the reveal it lifts its wing cases, flies a hand's width to the next leaf and settles. Both cute AND alive (SERIES_FORMAT section 6).
   Free, never touched. Not on screen during a [LOOK CLOSER] or a journey. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: owlArt(t, o) / ladybirdArt(t, o).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["owl", (t) => TF(0, 86, 1.25, owlArt(t, { open: 1 }))] : ["ladybird", (t) => TF(-8, 0, 2.6, ladybird14(t, { open: .5 + .5 * Math.sin(t * 2) }))];   // Stage 2: the drawn animals (flat14.js, garden14.js)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#FFF0DA" : "#E3F5D8"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[0], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shot (the world the push-ins go into). Stage 2 moves these to the drawn tree / leaf.
const OWL = [OWLW[0], OWLW[1]], LADY = LADYW(.5);   // Stage 2: the drawn branch (flat14.js OWLW) and leaf (garden14.js LADYW)
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
