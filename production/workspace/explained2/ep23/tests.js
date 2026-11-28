// tests.js: EP23's data and small shared helpers ("The magnet you can switch off: electromagnets"). Loaded after pics.js, before
// ep21dare.js / ep22dare.js / ep23dare.js / art22.js / art23.js and common.js. The generic helpers (cycTag, tagAt, VSTYLE, MKS, chipAt,
// smallPrint, FF) are EP22's, copied unchanged.

/* ---------- the colours (script section 3, "Colours"): the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this
   one". EP23: the WIRE a long plastic-covered wire, orange-red (WIREC, WIRED dark edge), its two bare ends short shiny copper (COPC); the
   NAIL grey iron (NAILC), the same grey on and off (being a magnet does not change how it looks; the only sign is the clips); the STEEL
   CLIPS plain silver; the ON tag green with a glow (ONC), OFF grey (OFFC); ELECTRICITY a soft gold glow along the wire (FLOWC), only while
   both ends are joined, never sparks; the PULL (Part 2 look-closer 1) one small green arrow per turn (PULLC); every bar magnet a red North
   half (NORTHC) and a blue South half (SOUTHC); a mistake pointed out magenta (MISC). ---------- */
const GOODC = P.leaf, WEAKC = P.blue, NORTHC = "#E0453A", SOUTHC = "#2F6FD6", NAILC = "#8E979F", NAILE = "#4E565E", WIREC = "#F07A2E", WIRED = "#A8461A", COPC = "#E0A050",
  ONC = "#2FB35A", OFFC = "#8A949E", FLOWC = "#FFC83A", PULLC = "#2FB35A", MISC = "#D9468F", NOPTC = "#8A949E";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it
const chipAt = (t, t0, x, y, col, txt, size = 32, ink = "#fff") => t < t0 ? "" : TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, col, ink, { w: 700 }));

/* ---------- the hidden animals (SERIES_FORMAT 4; script section 3): Part 1 a little MILLIPEDE (a common brown Singapore millipede: rusty
   brown with darker rings, a long round body of many rings, two short legs per ring rippling in a wave, two short feelers, a rounded head
   with big friendly eyes; it walks in slow ripples, waves its feelers, and at the reveal coils into a tight flat spiral for a moment);
   Part 2 a little CRICKET (a brown field cricket: a round head with long feelers, big friendly eyes, folded wings, big jumping back legs;
   it twitches its feelers, cleans one, and makes small hops). A NEW fair spot in every scene (sets23.js MPAT / CKAT), never back at the
   intro spot, never in a [LOOK CLOSER], a journey or a countdown. HIDDEN = [the word Heart says, art(t), the label]. ---------- */
const HIDDEN = PART === 1 ? ["millipede", (t) => TF(0, 20, 2.6, millipede23(t, { walk: true })), "millipede"] : ["cricket", (t) => TF(0, 30, 2.4, cricket23(t, { clean: true })), "cricket"];

/* ---------- the small print (SERIES_FORMAT 1, safety and care; script section 1): always fully inside the frame, upper left under the logo ---------- */
const LOOK_RULE = "We look, and we do not touch.", ADULT_RULE = "With an adult. Batteries only, never the wall socket.", MOMENT_RULE = "Join it only for a moment: it can get hot.",
  COVER_RULE = "Hold the wire by its plastic cover.", YARD_RULE = "Scrapyards are for workers only. We watch from outside.", HOT_RULE = "More batteries get hot faster.",
  HOLD_RULE = "Batteries only. Join it only for a moment. Hold the wire by its plastic cover.";
const smallPrint = (t, t0, txt, i = 0, t1) => { const w = tw(txt, 28, 500) + 60, a = t1 === undefined ? 1 : 1 - ramp(t, t1, .3); return a <= .01 ? "" : OP(a, finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64)); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP22's dare: its two cards, ep22dare.js), Block B (into EP24: ep23dare.js)
const DARE_CARDS = ["They stay on the nail", "They drop off"], DARE_LABEL = "What happens to the clips?", DARE_CLUES = ["a wire coiled round a new nail", "joined to a battery", "the battery is taken away"];
const NEXT_CARDS = ["Yes", "No"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)])
const FF = (items) => items.map(([m, l, d]) => [m, l, d]);

// the small print INSIDE a look-closer (coordinator 25 Nov: "give every label its own clear space"): bottom centre, under the panel and
// clear of the corner faces, ONE rule at a time; gone before the verdict lands there. items = [[t0, t1, txt], ...]
const lcPrint = (t, items) => items.map(([t0, t1, txt]) => t < t0 || t > t1 + .4 ? "" : OP(1 - ramp(t, t1, .3), finePrint(t, t0, txt, 960, 1050))).join("");
