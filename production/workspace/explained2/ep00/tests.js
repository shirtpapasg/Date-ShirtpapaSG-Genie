// tests.js: EP22's data and Stage 1 helpers ("Turn a nail into a magnet (the stroke method)"). Loaded after pics.js, before ep21dare.js
// and common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws Part 1's HARDWARE SHOP at an HDB neighbourhood centre on
// Saturday morning (the shop front on the five-foot way: coils of rope, stacked pails, a tall rack of brooms and mops with wooden handles
// up, garden hoses, a wall of small wooden drawers labelled NAILS · SCREWS · HOOKS, a wind chime, the cash counter inside; a plain sign
// HARDWARE, no brand; outside, a WOODEN FOLDING TABLE and three plastic stools; across the walkway the square with a big ANGSANA TREE
// (every leaf on a twig, on a branch, on the trunk), a wooden pergola, a wooden notice board, a frangipani tree by the shop, a wooden
// planter box, a stack of wooden pallets beside the shop, a provision shop and a bakery along the walkway, HDB blocks behind), Part 2's
// SCHOOL MAKER SPACE on Monday after school (wooden-topped workbenches, tall stools, a pegboard of hand tools, a 3D printer, bins of
// cardboard, string and craft sticks, a small sink, a window onto the school garden with a big tree (leaves on twigs on branches), the
// poster MAKE · TEST · IMPROVE, Basil's snack box on the window ledge), the two boards, the four look-closers, the two journeys and the two
// hidden animals (SCENES_TODO.md), and replaces each placeholder below with the real drawing (keep the names: p1.js / p2.js call them).

/* ---------- the colours: the green verdict (GOODC, with a tick) for a right idea, blue (WEAKC) for "not this one" (as every episode). EP22
   (script section 3, "Colours"): every bar magnet a red North half (NORTHC) with a white N and a blue South half (SOUTHC) with a white S;
   THE STROKE: a GREEN arrow (STROKEC) from the head to the tip for every one-way stroke, the lift a DOTTED GOLD arc (LIFTC); Basil's
   back-and-forth strokes a double-headed GREY arrow (BACKC) whose halves cross out (a red x on the card, never on a buddy); the NAILS grey
   iron (NAILC) with a flat round head and a sharp point: Pip's magnetised nail is the SAME grey as a new nail (being magnetised does not
   change how it looks; the only sign is the clips): a small gold *magnetised* tag (MAGC) points to it when it is named; the STEEL CLIPS plain
   silver steel wire paper clips (CLIPC, never coloured plastic-coated clips); pull arrows, where drawn, green (EP20's colour). ---------- */
const GOODC = P.leaf, WEAKC = P.blue, NORTHC = "#E0453A", SOUTHC = "#2F6FD6", STROKEC = P.leaf, LIFTC = "#C9932E", BACKC = "#8A949E", NAILC = "#8E979F", NAILE = "#4E565E", CLIPC = "#BFC8D0", MAGC = "#C9932E", NOPTC = "#8A949E";
// an answer tag: k = 0 (green, with a tick) or 1 (blue). txt = its words. origin = its centre
const cycTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT THIS ONE" : "RIGHT"), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
const tagAt = (t, t0, x, y, k, txt, size = 34) => t < t0 ? "" : TF(x, y - 60 * (1 - eo((t - t0) / .25)), spring(t, t0, .45), cycTag(t, k, size, txt));
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];
const MKS = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];     // a mark, or "never" when this part does not have it
// a chip in a colour, popping at t0 (Stage 2 joins each chip to what it describes with a line): GOODC green (a fix, "clips!"), "#D9468F"
// magenta (a mistake pointed out: "the clips are on the magnet!"), NOPTC grey (the no-point pill), MAGC gold (*magnetised*)
const chipAt = (t, t0, x, y, col, txt, size = 32, ink = "#fff") => t < t0 ? "" : TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, col, ink, { w: 700 }));

/* ---------- the things (Stage 1 stand-ins; Stage 2 draws them properly, keeping the names) ---------- */
// an IRON NAIL lying level (origin = its middle; 300 long at k 1): flat round head at the LEFT, sharp point at the RIGHT; grey, the same
// grey before and after it is magnetised. o.a: its angle (degrees)
const nailArt = (x, y, k = 1, a = 0) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-130" y="-9" width="230" height="18" rx="5" fill="${NAILC}" stroke="${NAILE}" stroke-width="4"/><rect x="-146" y="-30" width="18" height="60" rx="6" fill="#9AA3AB" stroke="${NAILE}" stroke-width="4"/><path d="M100 -9 L150 0 L100 9z" fill="${NAILC}" stroke="${NAILE}" stroke-width="4" stroke-linejoin="round"/></g><rect x="-120" y="-6" width="200" height="4" rx="2" fill="#fff" opacity=".35"/>`, a);
// one plain silver STEEL PAPER CLIP (origin = its middle), a heap of n clips, and n clips hanging in a little chain from a point (x, y)
const clipArt = (x, y, a = 0, k = 1) => clip21(x, y, a, k);
const clipHeap = (x, y, k = 1) => TF(x, y, k, clipPile21(0, 0));
const clipsHang = (t, x, y, n, k = 1) => { let s = ""; for (let j = 0; j < n; j++) s += clip21(x + 4 * Math.sin(t * 2 + j) * (j + 1) * .4, y + 22 + j * 30, 90 + 6 * Math.sin(t * 1.6 + j), .9); return TF(0, 0, 1, k === 1 ? s : `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${s}</g>`); };
// a shallow TRAY of steel clips (origin = its middle, 360 x 90 at k 1)
const clipTray = (x, y, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><path d="M-180 -20 L-160 40 H160 L180 -20z" fill="#D7DCE0" stroke="#7A848C" stroke-width="5"/></g>` + clipPile21(-40, 0) + clipPile21(60, 6));
// the STROKE: a green one-way arrow from (x1, y1) to (x2, y2) drawing in from t0 (.5 s), and the lift: a dotted gold arc from the tip back
// over to the head (h = how high it rises), drawing in from t1 (.6 s)
const strokeArrow = (t, t0, x1, y1, x2, y2, w = 12) => { if (t < t0) return ""; const u = eo(clamp((t - t0) / .5)), xe = x1 + (x2 - x1) * u, ye = y1 + (y2 - y1) * u, an = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return `<path d="M${n2(x1)} ${n2(y1)} L${n2(xe)} ${n2(ye)}" stroke="${STROKEC}" stroke-width="${w}" stroke-linecap="round"/>` + (u > .9 ? TF(x2, y2, 1, `<path d="M${-w * 2.2} ${-w * 1.6} L0 0 L${-w * 2.2} ${w * 1.6}" stroke="${STROKEC}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`, an) : ""); };
const liftArc = (t, t1, x1, y1, x2, y2, h = 160, w = 8) => { if (t < t1) return ""; const u = eo(clamp((t - t1) / .6)), L = 1.6 * Math.hypot(x2 - x1, y2 - y1) + 2 * h;
  return `<path d="M${n2(x1)} ${n2(y1)} C${n2(x1)} ${n2(y1 - h * 1.3)} ${n2(x2)} ${n2(y2 - h * 1.3)} ${n2(x2)} ${n2(y2)}" fill="none" stroke="${LIFTC}" stroke-width="${w}" stroke-dasharray="${n2(w * 1.6)} ${n2(w * 1.4)}" stroke-linecap="round" opacity="${n2(u)}"/>`; };
// Basil's wrong way: a double-headed grey arrow, scratched back and forth (its halves crossing out after tx)
const backForth = (t, t0, x, y, len = 300, tx = 1e9) => t < t0 ? "" : OP(ramp(t, t0, .3), `<path d="M${x - len / 2} ${y} H${x + len / 2} M${x - len / 2 + 26} ${y - 20} L${x - len / 2} ${y} L${x - len / 2 + 26} ${y + 20} M${x + len / 2 - 26} ${y - 20} L${x + len / 2} ${y} L${x + len / 2 - 26} ${y + 20}" stroke="${BACKC}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  + (t >= tx ? TF(x, y, spring(t, tx, .4), `<path d="M-34 -34 L34 34 M34 -34 L-34 34" stroke="#D84A3A" stroke-width="14" stroke-linecap="round"/>`) : ""));
// the magnet's small cardboard BOX with a lid (origin = its middle, 340 x 130 at k 1). shut: 0 open (the magnet visible inside), 1 shut
const magBox = (t, x, y, k = 1, shut = 1, withMag = true) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-170" y="-50" width="340" height="110" rx="8" fill="#C99A62" stroke="#7A5230" stroke-width="5"/></g>`
  + (withMag && shut < 1 ? TF(0, -10, .9, bar20(t, { glint: false })) : "") + `<g transform="translate(-170 -50) rotate(${n2(-100 * (1 - shut))})"><rect x="0" y="-16" width="340" height="24" rx="6" fill="#D8AE76" stroke="#7A5230" stroke-width="5"/></g>`);

/* ---------- the hidden animals (SERIES_FORMAT 4): Part 1 a little WOODPECKER (a Sunda pygmy woodpecker, about a sparrow's length: a brown
   back and wings with neat white bars, a pale buff-white face stripe and throat, a darker brown cap and cheek, a pale streaky belly, a short
   straight pointed beak, two toes forward and two back, a stiff tail it props against the wood, big round glossy dark eyes with a highlight;
   it clings upright, taps with quick nods, hops up the wood in little jerks), Part 2 a little ANT (a small black house ant, a few
   millimetres long, drawn small but findable: three body parts, six legs, two elbowed feelers, big friendly eyes with a highlight; it
   waves its feelers, taps the crumb, trots in little zigzags; at the reveal four more ants trot after it in a line). A NEW fair spot in
   every scene (SCENES_TODO), never back at the spot where the game's push-in introduced it (the angsana trunk / beside the biscuit crumb on
   the window ledge), never twice in one spot; not on screen during a [LOOK CLOSER], a journey or a countdown. Free, never touched or fed.
   HIDDEN = [the word Heart says (W lookup), art(t), the label]. ---------- */
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["crow", (t) => TF(0, 60, 1.25, crow00(t, {})), "crow"] : ["cat", (t) => TF(0, 50, 1.2, cat00(t, { pose: "sit" })), "cat"];   // EP0: the house crow (Part 1), the community cat (Part 2): art00.js
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#EAF2E2" : "#F2ECE2"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[2], n2(r * .24), P.ink, "#fff", { w: 700 }));
// where the animal sits in the wide shots the push-ins go into. INTRO = the game's push-in (the angsana trunk in the square / beside a
// biscuit crumb on the maker space's window ledge, by Basil's snack box); REVEAL = the reveal's spot (the wooden handle of a broom in the
// shop's rack / the edge of the small sink, leading a little line of ants): never the same, and never a spot used in another scene. Stage 2
// moves these to the drawing.
const WOODPECKER = [1430, 380], WOODPECKER_R = [560, 520], ANT = [1500, 470], ANT_R = [600, 640];
// STAGE 1 placeholder "real places" for the smooth push-ins (gameScene R.world, lizReveal view): a paper card naming the set, the animal's
// placeholder where it sits. Stage 2 replaces them with the drawn sets (e.g. `HS22` the hardware shop and the square, `MS22` the maker space).
function setPH(t, title, notes, at, name) { let out = bg("stage2") + `<g filter="url(#drop)"><rect x="140" y="120" width="1640" height="840" rx="40" fill="url(#gPaper)"/></g>`
    + tpill(960, 120, "STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 3 }) + T(900, 210, title, 46, P.ink);
  let y = 280; for (const n of notes) for (const ln of wrap(n, 28, 1100, 500)) { out += `<text x="220" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
  return out + TF(at[0], at[1], .55, hiddenPH(name)(t)); }
const shopPH = (t, at = WOODPECKER) => setPH(t, "A hardware shop, an HDB neighbourhood centre (the wide shot)", ["The shop front on the five-foot way: coils of rope, stacked pails, a tall rack of brooms and mops with their wooden handles up, garden hoses, a wall of small wooden drawers labelled NAILS · SCREWS · HOOKS, a wind chime at the door, the cash counter inside (a plain sign HARDWARE, no brand). Outside: the WOODEN FOLDING TABLE, three plastic stools. Across the walkway: the square with a big ANGSANA TREE (every leaf on a twig, on a branch, on the trunk), a wooden pergola, a wooden notice board, a frangipani tree by the shop's door, a wooden planter box, a stack of wooden pallets beside the shop, a provision shop and a bakery further along, HDB blocks behind.",
  "Life: shoppers' chatter, a market trolley's wheels, the wind chime, a bicycle bell, cups clinking at a coffee shop far off, a radio inside the shop; a faint tap-tap-tap from the trees. Light: Saturday morning sun, soft shadows under the five-foot way."], at, "woodpecker");
const makerPH = (t, at = ANT) => setPH(t, "A school maker space, Monday after school (the wide shot)", ["Long workbenches with wooden tops, tall stools, a pegboard of hand tools on the far wall (hammers, pliers, screwdrivers, a hot-glue gun switched off and hung up), a 3D printer in a corner, bins of cardboard, string, card and craft sticks, a small sink, a window onto the school garden with a big tree (leaves on twigs on branches), a poster MAKE · TEST · IMPROVE. On the near bench THE FISHING POND and the FISH CAUGHT whiteboard. Basil's snack box on the window ledge, a biscuit crumb beside it.",
  "Life: ceiling fans turning, the 3D printer's soft hum and clicks, children's voices in the corridor, a far-off school bell, a stapler's clack. Light: afternoon light through the window, the fans' slow shadows."], at, "ant");

/* ---------- the two boards (the build-and-reveal, script section 3): Stage 1 placeholders, drawn wherever the board is at its HOME.
   OUR FISHING GAME (Part 1, a clipboard on a little wooden easel at the right end of the hardware shop's folding table): *OUR FISHING GAME ·
   Friday's class party*, a paper fish with a steel clip on its nose and a rod (a chopstick, a string, a nail as the hook), *3 rods · 1
   magnet!*, three boxes Rod 1 · Rod 2 · Rod 3, and *Which can be magnetised?* with five tick boxes. Fills: `rod1` Pip's nail in the Rod 1 box
   with *attracts clips ✓*; `try` Basil's note card *1 stroke: done!* on Rod 2; `chipfar` the green chip *Test it with the magnet far away!*;
   `list` the list ticked and crossed (iron nail ✓ · steel screwdriver ✓ · copper wire ✗ · aluminium foil ✗ · wooden chopstick ✗).
   THE FISHING POND (Part 2, on the near workbench of the maker space): a big shallow cardboard box painted blue, paper fish in bright
   colours each with ONE steel clip on its nose, one BIG gold fish with TWO clips; three rods (wooden chopsticks with string), Rod 1 with
   Pip's nail tied by its head; beside it the FISH CAUGHT whiteboard (rows Rod 1 · Rod 2 · Rod 3, a column strokes). Fills: `bigfish` the big
   gold fish lifted on Rod 3; `chart` *Rod 3 · 30 strokes · the big fish!* and Part 1's three Rod boxes drawn small in the corner, all filled;
   *READY FOR FRIDAY!* at the end (nyk). Nothing jumps across a cut: once filled, a box stays filled. Stage 2 draws the real boards (keep the
   calls and the marks). ---------- */
const LIST = [["iron nail", 1], ["steel screwdriver", 1], ["copper wire", 0], ["aluminium foil", 0], ["wooden chopstick", 0]];
function fishBoardPH(t, x, y, k = 1) { const f = (m) => ss(MKS(m) - .1, MKS(m) + .4, t);
  let s = `<path d="M-200 300 L-260 470 M200 300 L260 470 M0 300 V470" stroke="#8A5A30" stroke-width="16" stroke-linecap="round"/><g filter="url(#dropS)"><rect x="-300" y="-330" width="600" height="640" rx="18" fill="#B98A58" stroke="#7A5230" stroke-width="8"/></g>`
    + `<rect x="-270" y="-300" width="540" height="580" rx="8" fill="#FBFBF7"/><rect x="-60" y="-350" width="120" height="44" rx="10" fill="#9AA3AB" stroke="#4E565E" stroke-width="4"/>`
    + T(0, -250, "OUR FISHING GAME", 40, P.ink) + T(0, -212, "Friday's class party", 26, P.ink, { w: 500 }) + T(130, -160, "3 rods · 1 magnet!", 28, "#D84A3A");
  s += `<path d="M-230 -190 q40 -30 80 0 q-40 30 -80 0z M-150 -190 l20 -14 v28z" fill="#FFB347" stroke="${P.ink}" stroke-width="3"/>` + clip21(-238, -190, 0, .6);
  ["Rod 1", "Rod 2", "Rod 3"].forEach((r, i) => { const bx = -180 + i * 180; s += `<rect x="${bx - 80}" y="-120" width="160" height="150" rx="10" fill="none" stroke="${P.ink}" stroke-width="4"/>` + T(bx, -90, r, 26, P.ink); });
  if (t >= MKS("rod1")) s += OP(f("rod1"), nailArt(-180, -40, .42) + clipsHang(t, -180 + 62, -40, 2, .7) + T(-180, 18, "attracts clips ✓", 18, GOODC, { w: 700 }));
  if (t >= MKS("try")) s += TF(0, -40, spring(t, MKS("try") + .3, .4), `<rect x="-74" y="-40" width="148" height="80" rx="6" fill="#FFF3A8" stroke="#C9A800" stroke-width="3"/>` + T(0, 8, "1 stroke: done!", 20, P.ink, { w: 700 }), -4);
  if (t >= MKS("chipfar")) s += chipAt(t, MKS("chipfar") + .2, 0, 60, GOODC, "Test it with the magnet far away!", 20);
  s += T(0, 110, "Which can be magnetised?", 28, P.ink);
  LIST.forEach(([n, ok], i) => { const ly = 150 + i * 30, on = t >= MKS("list") + .25 * i; s += `<rect x="-200" y="${ly - 12}" width="22" height="22" rx="4" fill="#fff" stroke="${P.ink}" stroke-width="3"/>` + `<text x="-168" y="${ly + 7}" font-family="Fredoka" font-weight="500" font-size="22" fill="${P.ink}">${n}</text>`
    + (on ? T(-189, ly + 8, ok ? "✓" : "✗", 26, ok ? GOODC : "#D84A3A") : ""); });
  return TF(x, y, k, s); }
const fishArt = (x, y, k = 1, col = "#FF8A5B", big = false) => TF(x, y, k * (big ? 1.8 : 1), `<path d="M-50 0 q50 -40 100 0 q-50 40 -100 0z M50 0 l30 -22 v44z" fill="${col}" stroke="${P.ink}" stroke-width="3"/><circle cx="-26" cy="-6" r="5" fill="${P.ink}"/>`) + (big ? clip21(x - 96 * k, y - 4, 0, .7 * k) + clip21(x - 96 * k, y + 14, 0, .7 * k) : clip21(x - 56 * k, y, 0, .6 * k));
function pondPH(t, x, y, k = 1) { const up = t >= MKS("bigfish") ? eo(clamp((t - MKS("bigfish")) / 1.4)) : 0, f = (m) => ss(MKS(m) - .1, MKS(m) + .4, t);
  let s = `<g filter="url(#dropS)"><path d="M-380 -60 L-340 120 H340 L380 -60z" fill="#3F7FD0" stroke="#7A5230" stroke-width="10"/></g>` + T(-200, 80, "THE FISHING POND", 28, "#fff");
  [[-260, -20, "#FF8A5B"], [-120, 30, "#7FE58F"], [10, -30, "#F08CC0"], [140, 40, "#9FD0FF"]].forEach(([fx, fy, c]) => { s += fishArt(fx, fy, .9, c); });
  s += up < 1 ? fishArt(240, -10 - 300 * up, .9, "#FFC83A", true) : fishArt(240, -310, .9, "#FFC83A", true);
  s += `<path d="M120 -${n2(420)} L300 -${n2(420)}" stroke="#C99A62" stroke-width="12" stroke-linecap="round"/>` + (up > 0 ? `<path d="M300 -420 V${n2(-40 - 300 * up)}" stroke="${P.ink}" stroke-width="3"/>` + nailArt(300, -30 - 300 * up, .25, 90) : "");
  s += TF(640, -120, 1, `<g filter="url(#dropS)"><rect x="-220" y="-170" width="440" height="300" rx="12" fill="#FBFBF7" stroke="#8A949E" stroke-width="8"/></g><path d="M-120 130 V230 M120 130 V230" stroke="#8A949E" stroke-width="8"/>` + T(0, -120, "FISH CAUGHT", 32, P.ink) + T(120, -80, "strokes", 22, P.ink, { w: 500 })
    + ["Rod 1", "Rod 2", "Rod 3"].map((r, i) => T(-140, -40 + i * 50, r, 24, P.ink)).join("") + (t >= MKS("chart") ? OP(f("chart"), T(60, 60, "Rod 3 · 30 strokes · the big fish!", 20, GOODC, { w: 700 })) : ""));
  return TF(x, y, k, s); }
// Pip's poster on a small easel by the pond (the Showdown): How to make a fishing hook, three ruled lines lit at l1 / l2 / l3; line 3 struck
// at `strike` (kept, a strike-through) and rewritten in green below it at `rewrite`
const POSTER = ["1 Stroke from the head to the tip, with the red end.", "2 Lift the magnet away, back to the head.", "3 Halfway, turn the magnet round and use the blue end too, for more strength."];
function posterPH(t, x, y, k = 1) { let s = `<path d="M-200 360 L-250 520 M200 360 L250 520" stroke="#8A5A30" stroke-width="14" stroke-linecap="round"/><g filter="url(#dropS)"><rect x="-420" y="-380" width="840" height="740" rx="16" fill="#FBFBF7" stroke="#8A949E" stroke-width="8"/></g>` + T(0, -310, "How to make a fishing hook", 42, P.ink);
  POSTER.forEach((ln, i) => { const lit = t >= MKS("l" + (i + 1)), ly = -210 + i * 170; let yy = ly;
    for (const w of wrap(ln, 30, 700, 600)) { s += `<text x="-380" y="${yy}" font-family="Fredoka" font-weight="600" font-size="30" fill="${lit ? P.ink : "#9AA3AB"}">${esc(w)}</text>`; yy += 38; }
    if (i === 2 && t >= MKS("strike")) s += `<path d="M-384 ${ly - 10} L${n2(-384 + 770 * eo(clamp((t - MKS("strike")) / .4)))} ${ly + 30}" stroke="#D84A3A" stroke-width="8" stroke-linecap="round"/>`; });
  if (t >= MKS("rewrite")) s += OP(ramp(t, MKS("rewrite"), .4), `<text x="-380" y="290" font-family="Fredoka" font-weight="700" font-size="32" fill="${GOODC}">Keep stroking with the red end, every time.</text>`);
  return TF(x, y, k, s); }

/* ---------- LOOK CLOSER, Stage 1: the real lookCloser frame (closer.js: push-in, dim, the window opens from the thing, the LOOK CLOSER tag,
   the verdict at v_*) with a placeholder art() that lists what Stage 2 draws inside the window. o: { title, notes: [..], verdict: [text, colour, opts],
   v: mark, setNote, fx, fy, beats: [[mark, label], ...] (a small clock of the picture beats inside the window), over(t) } ---------- */
function lcPH(t, s, o) { const set = o.setNote ? (tt) => { window._noHud = true; try { return phScene(tt, s, "SET: " + o.setNote, []); } finally { window._noHud = false; } } : undefined;
  const art = (tt) => { let a = `<rect x="-800" y="-380" width="1600" height="760" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="16 12"/>`
    + tpill(0, -300, "LOOK CLOSER · STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 2 }) + T(0, -220, o.title, 46, P.ink); let y = -150;
    for (const n of o.notes || []) for (const ln of wrap(n, 27, 1480, 500)) { a += `<text x="-740" y="${y}" font-family="Fredoka" font-weight="500" font-size="27" fill="${P.ink}">${esc(ln)}</text>`; y += 36; }
    const bt = (o.beats || []).filter(([mk]) => TL.marks[mk] !== undefined && tt >= TL.marks[mk]).pop();
    if (bt) a += TF(560, -300, 1, tpill(0, 0, ("NOW: " + bt[1]).slice(0, 60), 26, P.sun, P.ink, { w: 700 }));
    for (const id of TL.order) { const L = TL.lines[id]; if (L.who !== "chant" && tt >= L.t - .05 && tt < L.end + .3) a += tpill(0, 300, (L.who.toUpperCase() + ": " + L.text).slice(0, 100), 26, "#120E2E", "#fff", { w: 600 }); }
    return a; };
  const over = (tt) => (o.over ? o.over(tt) : "");
  return lookCloser(t, s, { tz: s.t0, fx: o.fx || 960, fy: o.fy || 560, art, set, verdict: o.verdict, tv: MK(o.v), over }); }

/* ---------- small Stage 1 helpers for p1.js / p2.js ---------- */
// the placeholder object in a lock-in ring (Stage 2 draws the real picture inside the ring)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + wrap(txt, 28, 260, 600).map((l, j, A) => T(430, 480 + j * 32 - (A.length - 1) * 16, l, 28, P.ink)).join("");
// the small print (SERIES_FORMAT 1, safety and care): always fully inside the frame, upper left under the logo pill
const CROW_RULE = "We look, and we do not feed it.", CAT_RULE = "We look, and we let it rest.", MISTAKE_RULE = "Mistakes are how we learn.", PICTURE_RULE = "A picture of remembering, not a real brain.", CHAPTER_RULE = "Pick any chapter you are learning.";
const LOOK_RULE = "We look, and we do not touch.", NAIL_RULE = "Nails are sharp. Hold them by the head.", PHONE_RULE = "Keep magnets away from phones and compasses.",
  BATT_RULE = "With an adult. Batteries only, never the wall socket. Not for long: it can get hot.", CRUMB_RULE = "Crumbs go in the bin!";
const smallPrint = (t, t0, txt, i = 0) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), 196 + i * 64); };
// the dare blocks' on-screen words (the same as script.py): Block A (EP21's dare: its two cards, ep21dare.js), Block B (into EP23)
const DARE_CARDS = ["Nothing happens", "The nail attracts the clips"], DARE_LABEL = "What happens?", DARE_CLUES = ["an iron nail", "stroked again and again", "the same way"];
const NEXT_CARDS = ["They stay on the nail", "They drop off"];
// the fun-fact panel's pictures (common.js funFact items [mark, label, pic(t, w, h)]): Stage 1 placeholders that say what to draw
const ffPH = (txt) => (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/>` + wrap(txt, 24, w - 40, 500).map((l, j, A) => T(0, 10 + j * 30 - (A.length - 1) * 15, l, 24, P.ink)).join("");
const FF = (items) => items.map(([m, l, d]) => [m, l, typeof d === "string" ? ffPH(d) : d]);
