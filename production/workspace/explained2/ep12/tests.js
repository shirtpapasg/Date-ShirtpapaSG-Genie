// tests.js: EP12's data and Stage 1 helpers ("Why isn't a trolley made of glass? Choosing materials"). Loaded after pics.js, before common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the covered walkway in front of a neighbourhood supermarket
// (the trolley bay, the aquarium shop next door), the open-air car park beside the block, the trolley, the fish tank, the three bottles, the car,
// the board MATCH THE JOB, the two journeys and the two hidden animals (SCENES_TODO.md), and replaces each placeholder below with the real
// drawing (keep the names and arguments: p1.js / p2.js already call them).

/* ---------- the topic's two answer colours (script section 3): RIGHT FOR THE JOB green (with a tick), NOT FOR THIS JOB blue. In Part 2,
   once SUITABLE has popped (mark kw_suitable), the green tag reads SUITABLE. No red, no buddy colour and no sun yellow for an answer. ---------- */
const GOODC = P.leaf, WEAKC = P.blue;
const goodWord = (t) => PART === 2 && TL.marks.kw_suitable !== undefined && t >= TL.marks.kw_suitable ? "SUITABLE" : "RIGHT FOR THE JOB";
// a job tag: k = 0 (RIGHT FOR THE JOB / SUITABLE, green, with a tick) or 1 (NOT FOR THIS JOB, blue). origin = its centre. txt overrides the words
const jobTag = (t, k, size = 36, txt) => { const w0 = txt || (k ? "NOT FOR THIS JOB" : goodWord(t)), tick = k ? 0 : size * 1.25, w = tw(w0, size, 700, "Fredoka", 2) + size * 1.4 + tick, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${k ? WEAKC : GOODC}"/></g>`
    + (tick ? `<g transform="translate(${n2(-w / 2 + size * .95)} 0)">${tickBadge(size * .55)}</g>` : "") + T(n2(tick / 2), n2(size * .35), w0, size, "#fff", { ls: 2 }); };
// the verdict options for lcVerdict (closer.js): [text, fill, opts]. VSTYLE(txt, 0) green; VSTYLE(txt, "sun") = sun-yellow letters on cream
// (the purpose verdict ITS PURPOSE: TO CARRY HEAVY GROCERIES: "not an answer colour"; a dark-violet border keeps the letters readable)
const VSTYLE = (txt, k) => k === "sun" ? [txt, "#FFF6DE", { ink: "#E39B00", edge: P.ink }] : [txt, k ? WEAKC : GOODC];

/* ---------- the property chips: EP9 to EP11's words, in the colours they were taught in (EP9 STRONG / FLEXIBLE green, FRAGILE blue; EP10
   WATERPROOF green; EP11 TRANSPARENT green). They come back as chips, not as new shelf words (script section 1, rules bent (3)). ---------- */
const CHIPC = { STRONG: GOODC, FRAGILE: WEAKC, FLEXIBLE: GOODC, WATERPROOF: GOODC, TRANSPARENT: GOODC };
const propChip = (word, size = 34) => tpill(0, 0, word, size, CHIPC[word] || P.ink, "#fff", { w: 700, ls: 3 });
// a chip that pops in at t0 (origin = its centre)
const chipAt = (t, t0, x, y, word, size = 34) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), propChip(word, size));

/* ---------- the board MATCH THE JOB (script section 3): a cream board on a low stand, four columns OBJECT · PURPOSE · MATERIAL · PROPERTY,
   room for seven rows. A row fills from left to right: the object's picture tile hops low onto the board, then its purpose is written, then the
   material's tile, then the property chip or chips. Part 1 fills rows 1-2 (marks row1o, row1p, row1m; row2); Part 2 starts with rows 1-2
   filled, fills row 3 (row3: the school bottle) and rows 4-7 under ONE picture of the car (carrows), then a green tick lands at the end of
   every row (ticks, .14 s apart). ---------- */
const COLS = ["OBJECT", "PURPOSE", "MATERIAL", "PROPERTY"];
const BROWS = [["trolley", "to carry heavy groceries", "metal", ["STRONG"]],
  ["fish tank", "to hold water and show the fish", "glass", ["TRANSPARENT", "WATERPROOF"]],
  ["water bottle for school", "to hold water; see inside; not break", "plastic", ["WATERPROOF", "TRANSPARENT", "does not break easily"]],
  ["tyres", "carry the car", "rubber", ["STRONG"]], ["seats", "sit on", "fabric", ["FLEXIBLE"]],
  ["windscreen", "keep water out; see the road", "glass", ["WATERPROOF", "TRANSPARENT"]], ["body", "protect the people", "metal", ["STRONG"]]];
// when each cell of each row appears: [object, purpose, material, property] (s; -1 = already there; 1e9 = not yet in this part)
const ROWT = () => { const m = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k], four = (t0, d = .3) => t0 >= 1e9 ? [1e9, 1e9, 1e9, 1e9] : [t0, t0 + d, t0 + 2 * d, t0 + 3 * d];
  if (PART === 1) return [[m("row1o") + .2, m("row1p"), m("row1m"), m("row1m") + .3], four(m("row2") + .1), ...Array(5).fill([1e9, 1e9, 1e9, 1e9])];
  const c = m("carrows"); return [[-1, -1, -1, -1], [-1, -1, -1, -1], four(m("row3") + .1), ...[0, 1, 2, 3].map((i) => four(c + .2 + i * .25, .12))]; };
const tickT = (r) => PART === 2 && TL.marks.ticks !== undefined ? TL.marks.ticks + r * .14 : 1e9;
// TROLLEY BOARD (teacher, 22 Nov 2026: "change the object to a trolley instead of a whiteboard. A glass trolley episode."): the board is a big
// supermarket trolley (walk.js trolleyS's metal: MET / METD / METL, the red grip, the wire grid, the dark wheels on their forks) with the chart
// MATCH THE JOB clipped to the side of its basket. Wheels on the ground; origin = the ground under the basket's middle. The chart is laid out
// per part so its words are big: Part 1 two tall rows (36 px words), Part 2 seven rows (26 px words). o.col = a column that glows (0..3) or -1;
// o.flash = [purpose, property, material] (the chant); o.row = a row that glows; o.good = the green tag SUITABLE above the MATERIAL column.
// The cells still appear at ROWT()'s times and the ticks at tickT(): no timing lives here. MBL.W / MBL.TOP: the chart's width, the rim's height.
const MBL = (() => { const L = PART === 1
  ? { W: 1260, X: [-610, -294, 62, 274], CW: [300, 340, 196, 340], tF: 50, tH: 74, hH: 50, hF: 30, RH: [124, 124], F: 36, FP: 34, FC: 30, ts: 1.45, ss: 1.4, stack: true, gb: 104, padB: 44, rim: 52, tail: 20 }
  : { W: 1310, X: [-639, -319, 11, 165], CW: [306, 318, 142, 446], tF: 44, tH: 62, hH: 44, hF: 24, RH: [50, 66, 100, 50, 50, 66, 50], F: 27, FP: 26, FC: 25, ts: 1.1, ss: 1, stack: false, gb: 70, padB: 14, rim: 40, tail: 12 };
  L.H = L.tH + L.hH + 10 + L.RH.reduce((a, b) => a + b, 0) + L.tail; L.bot = -(L.gb + L.padB); L.top = L.bot - L.H; L.TOP = -(L.top - L.rim); return L; })();
function trolleyFrame() { const L = MBL, hw = L.W / 2, yb = -L.gb, yt = L.top - L.rim, xl0 = -hw - 30, xr0 = hw + 30, xl1 = -hw - 62, xr1 = hw + 80, st = `fill="none" stroke-linecap="round" stroke-linejoin="round"`, wr = L.gb > 90 ? 28 : 24, ry = -(2 * wr + 10);
  const wheel = (x) => `<g transform="translate(${x} ${-wr})"><path d="M0 -4 L${x < 0 ? 12 : -12} ${ry + wr}" stroke="${METD}" stroke-width="13" stroke-linecap="round"/><circle r="${wr}" fill="#3A4258" stroke="#232A3B" stroke-width="7"/><path d="M${-wr * .62} 0 H${wr * .62} M0 ${-wr * .62} V${wr * .62}" stroke="#9AA5BD" stroke-width="5" stroke-linecap="round"/><circle r="6.5" fill="${METL}"/></g>`;
  const body = `M${xl1} ${yt} H${xr1} L${xr0} ${yb} H${xl0}z`; let grid = ""; const nv = Math.round((xr1 - xl1) / 74), nh = Math.max(3, Math.round((yb - yt) / 74));
  for (let i = 1; i < nv; i++) { const u = i / nv; grid += `<path d="M${n2(lerp(xl1, xr1, u))} ${yt} L${n2(lerp(xl0, xr0, u))} ${yb}" stroke="${MET}" stroke-width="5"/>`; }
  for (let j = 1; j < nh; j++) { const v = j / nh, y = lerp(yt, yb, v); grid += `<path d="M${n2(lerp(xl1, xl0, v))} ${n2(y)} H${n2(lerp(xr1, xr0, v))}" stroke="${MET}" stroke-width="5"/>`; }
  const clip = (x) => `<path d="M${x} ${yt - 10} V${L.top + 22}" ${st} stroke="${METD}" stroke-width="15"/><path d="M${x} ${yt - 10} V${L.top + 22}" ${st} stroke="${METL}" stroke-width="5"/><circle cx="${x}" cy="${L.top + 24}" r="9" fill="${METL}" stroke="${METD}" stroke-width="4"/>`;
  return `<ellipse cx="0" cy="4" rx="${hw + 60}" ry="16" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + wheel(-hw + 130) + wheel(hw - 110)
    + `<path d="M${xl0 + 14} ${ry} H${xr0 - 26} M${xl0 + 6} ${yb} L${xl0 + 14} ${ry} M${xr0 - 6} ${yb} L${xr0 - 26} ${ry}" ${st} stroke="${METD}" stroke-width="13"/><path d="M${xl0 + 14} ${ry} H${xr0 - 26}" ${st} stroke="${METL}" stroke-width="4" opacity=".8"/>
      <path d="${body}" fill="#DCE4F2" opacity=".5"/><g ${st}>${grid}</g>
      <path d="${body}" ${st} stroke="${METD}" stroke-width="13"/><path d="M${xl1 + 6} ${yt - 4} H${xr1 - 6}" ${st} stroke="${METL}" stroke-width="4"/><path d="M${xl0} ${yb} H${xr0}" ${st} stroke="${MET}" stroke-width="16"/><path d="M${xl0 + 4} ${yb - 4} H${xr0 - 4}" ${st} stroke="${METL}" stroke-width="4" opacity=".9"/>
      <path d="M${xl1} ${yt} l-62 -44" ${st} stroke="${METD}" stroke-width="15"/><rect x="${xl1 - 98}" y="${yt - 64}" width="60" height="34" rx="17" fill="#E8604E" stroke="#B8402E" stroke-width="6"/>`
    + `<g filter="url(#drop)"><rect x="${-hw}" y="${L.top}" width="${L.W}" height="${L.H}" rx="26" fill="#C99A62"/><rect x="${-hw + 12}" y="${L.top + 12}" width="${L.W - 24}" height="${L.H - 24}" rx="16" fill="url(#gPaper)"/></g>` + clip(-hw * .52) + clip(hw * .52); }
function matchBoard(t, o = {}) { const L = MBL, RT = ROWT(), fl = o.flash || [0, 0, 0], X = L.X, CW = L.CW, top = L.top, hy = top + L.tH, y0 = hy + L.hH + 10; let s = "";
  const RY = []; { let y = y0; L.RH.forEach((h) => { RY.push(y + h / 2); y += h; }); } const yEnd = y0 + L.RH.reduce((a, b) => a + b, 0);
  const colG = [o.col === 0 ? 1 : 0, Math.max(o.col === 1 ? 1 : 0, fl[0]), Math.max(o.col === 2 ? 1 : 0, fl[2]), Math.max(o.col === 3 ? 1 : 0, fl[1])];
  COLS.forEach((c, i) => { const g = colG[i]; if (g > .02) s += `<rect x="${X[i] - 8}" y="${hy - 6}" width="${CW[i] + 10}" height="${yEnd - hy + 10}" rx="14" fill="${P.sun}" opacity="${n2(.5 * Math.min(1, g))}"/>`;
    s += `<rect x="${X[i] - 4}" y="${hy}" width="${CW[i] + 2}" height="${L.hH}" rx="11" fill="${P.ink}"/>` + T(X[i] + CW[i] / 2 - 3, hy + L.hH / 2 + L.hF * .36, c, L.hF, "#fff", { ls: L.stack ? 3 : 1.5 }); });
  const carT = RT[3][0]; if (L.RH.length > 3 && t >= carT) { const k = carT < 0 ? 1 : spring(t, carT, .35), ya = RY[3] - L.RH[3] / 2 + 8, yb = RY[6] + L.RH[6] / 2 - 8;
    s += OP(Math.min(1, k), `<path d="M${X[0] + 86} ${ya} h-12 V${yb} h12" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`) + TF(X[0] + 36, (ya + yb) / 2 - 14 - (carT < 0 ? 0 : 22 * Math.sin(Math.PI * clamp((t - carT) / .35))), k * 1.15, `<g transform="rotate(-90)">${TILE.car()}</g>` + T(0, 64, "car", 23, P.ink)); }
  BROWS.forEach((row, r) => { if (r >= L.RH.length) return; const y = RY[r], rh = L.RH[r], ts = RT[r], part = r >= 3; if (o.row === r) s += `<rect x="${-L.W / 2 + 16}" y="${y - rh / 2 + 3}" width="${L.W - 32}" height="${rh - 6}" rx="14" fill="${P.sun}" opacity=".4"/>`;
    if (r < L.RH.length - 1) s += `<path d="M${part ? X[0] + 92 : -L.W / 2 + 22} ${y + rh / 2} H${L.W / 2 - 22}" stroke="${P.ink}" stroke-width="2" stroke-dasharray="3 9" opacity=".3"/>`;
    row.forEach((cell, i) => { const t0 = ts[i]; if (t < t0) return; const k = t0 < 0 ? 1 : spring(t, t0, .35), hop = t0 < 0 ? 0 : 22 * Math.sin(Math.PI * clamp((t - t0) / .35));
      let inner; const x = X[i];
      if (i === 3) { const z = L.FC, chips = cell.filter((w) => CHIPC[w]), rest = cell.filter((w) => !CHIPC[w]), gap = z * 1.9;
        if (L.stack) inner = cell.map((w, j) => { const ww = tw(w, z, 700, "Fredoka", 3) + z * 1.5; return TF(ww / 2, (j - (cell.length - 1) / 2) * gap, 1, CHIPC[w] ? propChip(w, z) : tpill(0, 0, w, z, "#fff", P.ink, { w: 700 })); }).join("");
        else { let cx = 0; const yy = rest.length ? -gap / 2 : 0; inner = chips.map((w) => { const ww = tw(w, z, 700, "Fredoka", 1) + z * 1.5, g = TF(cx + ww / 2, yy, 1, tpill(0, 0, w, z, CHIPC[w], "#fff", { w: 700, ls: 1 })); cx += ww + 6; return g; }).join("")
          + rest.map((w) => TF((tw(w, z, 700) + z * 1.5) / 2, gap / 2, 1, tpill(0, 0, w, z, "#fff", P.ink, { w: 700 }))).join(""); } }
      else if (i === 1) { const ls = wrap(cell, L.FP, CW[1] - 6, 600); inner = ls.map((l, j) => T(0, L.FP * .34 + (j - (ls.length - 1) / 2) * L.FP * 1.14, l, L.FP, P.ink, { a: "start", w: 600 })).join(""); }
      else if (i === 2) inner = TF(17 * L.ss + 2, 0, L.ss, SWATCH[cell]) + T(34 * L.ss + 14, L.F * .35, cell, L.F, P.ink, { a: "start" });
      else { const sc = part ? .76 : Math.min(L.ts, (rh - 6) / 58), x0 = part ? 90 : 0, tx = x0 + 64 * sc + 12, ls = wrap(cell, L.F, CW[0] - tx - 4, 700); inner = TF(x0 + 32 * sc + 2, 0, sc, TILE[cell]()) + ls.map((l, j) => T(tx, L.F * .35 + (j - (ls.length - 1) / 2) * L.F * 1.1, l, L.F, P.ink, { a: "start" })).join(""); }
      s += TF(x, y - hop, k, inner); });
    const tt = tickT(r); if (t >= tt) s += TF(L.W / 2 - 34, y, spring(t, tt, .35), tickBadge(18)); });
  if (o.good) s += TF(X[2] + CW[2] / 2, top - L.rim - 44, o.good, jobTag(t, 0, 34));
  return trolleyFrame() + T(0, top + L.tH * .5 + L.tF * .42, "MATCH THE JOB", L.tF, P.ink, { ls: 5 }) + s; }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little MYNAH on top of the TROLLEYS sign of the trolley bay (every wide shot of the walkway): black body, a yellow beak, yellow
   legs, a small white patch on each wing; it tilts its head and hops; outdoors, never inside the shop or on food. Part 2: a little SQUIRREL (a
   plantain squirrel: brown back, a cream and black stripe along its side, an orange-brown belly, a bushy tail) on a low branch of the rain tree
   by the cars (every wide shot of the car park); it flicks its tail. Both drawn cute AND alive (SERIES_FORMAT section 6): round shapes, big
   friendly eyes with a highlight, a little smile, an idle loop. Free, never touched. Not on screen during a [LOOK CLOSER]. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: mynahArt(t) / squirrelArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["mynah", mynahArt] : ["squirrel", squirrelArt];   // STAGE 2: the drawn animals (walk.js)
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#DDF4FF" : "#E3F5D8"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
  + TF(0, -r - 4, 1, tpill(0, 0, "a little " + HIDDEN[0], n2(r * .24), P.ink, "#fff", { w: 700 }));

/* ---------- LOOK CLOSER, Stage 1: the real lookCloser frame (closer.js: push-in, dim, the window opens from the thing, the LOOK CLOSER tag,
   the verdict at v_*) with a placeholder art() that lists what Stage 2 draws inside the window. o: { title, notes: [..], verdict: [text, colour, opts],
   v: mark, strips: [[id, text, {off, y, size, keys}], ...], setNote: (when the scene before is not the set we zoom in from) a placeholder set,
   fx, fy, beats: [[mark, label], ...] (a small clock of the picture beats inside the window, so Stage 2 sees when each thing happens) } ---------- */
function lcPH(t, s, o) { const set = o.setNote ? (tt) => { window._noHud = true; try { return phScene(tt, s, "SET: " + o.setNote, []); } finally { window._noHud = false; } } : undefined;
  const art = (tt) => { let a = `<rect x="-800" y="-380" width="1600" height="760" rx="30" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="16 12"/>`
    + tpill(0, -300, "LOOK CLOSER · STAGE 2: TO DRAW", 28, P.coral, "#fff", { w: 700, ls: 2 }) + T(0, -220, o.title, 46, P.ink); let y = -150;
    for (const n of o.notes || []) for (const ln of wrap(n, 28, 1480, 500)) { a += `<text x="-740" y="${y}" font-family="Fredoka" font-weight="500" font-size="28" fill="${P.ink}">${esc(ln)}</text>`; y += 38; }
    const bt = (o.beats || []).filter(([mk]) => TL.marks[mk] !== undefined && tt >= TL.marks[mk]).pop();
    if (bt) a += TF(560, -300, 1, tpill(0, 0, "NOW: " + bt[1], 26, P.sun, P.ink, { w: 700 }));
    for (const id of TL.order) { const L = TL.lines[id]; if (L.who === "heart" && tt >= L.t - .05 && tt < L.end + .3) a += tpill(0, 300, ("HEART: " + L.text).slice(0, 96), 26, "#120E2E", "#fff", { w: 600 }); }
    return a; };
  return lookCloser(t, s, { tz: s.t0, fx: o.fx || 960, fy: o.fy || 560, art, set, verdict: o.verdict, tv: MK(o.v), over: o.strips ? (tt) => o.strips.map(([id, text, so]) => lcStrip(tt, id, text, so || {})).join("") : undefined }); }

/* ---------- small Stage 1 helpers for p1.js / p2.js ---------- */
// the placeholder object in a lock-in ring (Stage 2 draws the real picture inside the ring)
const ringPH = (txt) => (tt) => `<circle cx="430" cy="470" r="150" fill="#fff" opacity=".6"/>` + T(430, 482, txt, 30, P.ink);
// the small print (script section 1, Safety; always fully inside the frame, upper left under the logo pill, as EP11's torch rule).
// Part 1: "Trolleys are for groceries, not for rides." in every walkway shot; "We do not tap the glass." by the tank for the whole fish-tank
// shot; Part 2: "The car is parked and switched off." and "In a car park, stay with an adult." in every car-park shot; "We do not drop glass."
// beside the glass bottle (lcbottles, from mark noglass).
const TROLLEY_RULE = "Trolleys are for groceries, not for rides.", TANK_RULE = "We do not tap the glass.", GLASS_RULE = "We do not drop glass.";
const CAR_RULES = ["The car is parked and switched off.", "In a car park, stay with an adult."];
const smallPrint = (t, t0, txt, i = 0, y0 = 196) => { const w = tw(txt, 28, 500) + 60; return finePrint(t, t0, txt, Math.max(40 + w / 2, 300), y0 + i * 64); };
const trolleyRule = (t, t0 = -9) => smallPrint(t, t0, TROLLEY_RULE, 0, 126);   // Stage 2: just under the logo, clear of the SUPERMARKET sign
const carRules = (t, t0 = -9) => smallPrint(t, t0, CAR_RULES[0], 0) + smallPrint(t, t0 + .15, CAR_RULES[1], 1);
// the dare blocks' on-screen words (script section 3; the same as script.py DARE_CARDS / DARE_LABEL / NEXT_CARDS): Block A (fabric), Block B
const DARE_CARDS = ["Glass", "Metal", "Fabric"], DARE_LABEL = "Which material would you choose to make it?", NEXT_CARDS = ["Fabric", "Metal", "Wood"];
