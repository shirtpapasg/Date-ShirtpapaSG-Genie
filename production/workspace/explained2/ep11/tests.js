// tests.js: EP11's data and Stage 1 helpers ("See-through, blurry or blocked? Light and materials"). Loaded after pics.js, before common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the living room of an HDB flat at dusk, the common corridor at
// night, the test table (the torch on its stand with its beam, the holder, the card OUR CARD, the rack of framed sheets), the sheets, the
// robot behind each sheet, the board OUR TORCH TEST, the two journeys and the two hidden animals (SCENES_TODO.md), and replaces each
// placeholder below with the real drawing (keep the names and arguments: p1.js / p2.js already call them).

/* ---------- the three answer styles (script section 3; teacher's answer (e)): MOST LIGHT / TRANSPARENT green, ONLY SOME LIGHT / TRANSLUCENT
   blue (the rulebook's two answer colours), NO LIGHT / OPAQUE plain WHITE with a dark-violet border and dark-violet letters (never a dark
   colour: that would teach "opaque means dark"). No red, no buddy colour, no sun yellow for an answer. The torch's light is a soft pale cream
   (LIGHTC), never sun yellow (that is YOU). ---------- */
const GOODC = P.leaf, WEAKC = P.blue, NONEC = "#FFFFFF", NONEINK = P.ink, LIGHTC = "#FFF6D8";
const ANS = [{ fill: GOODC, ink: "#fff", edge: null }, { fill: WEAKC, ink: "#fff", edge: null }, { fill: NONEC, ink: NONEINK, edge: NONEINK }];
// a tag in one of the three styles: k = 0 (most / transparent), 1 (only some / translucent), 2 (none / opaque). origin = its centre
const ansTag = (txt, k, size = 40) => { const a = ANS[k], w = tw(txt, size, 700, "Fredoka", 2) + size * 1.3, h = size * 1.5;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${a.fill}"${a.edge ? ` stroke="${a.edge}" stroke-width="5"` : ""}/></g>` + T(0, n2(size * .35), txt, size, a.ink, { ls: 2 }); };
// the verdict options for lcVerdict (closer.js) in each style: [text, fill, {ink, edge, plain}]
const VSTYLE = (txt, k) => [txt, ANS[k].fill, ANS[k].edge ? { ink: ANS[k].ink, edge: ANS[k].edge } : {}];

/* ---------- the board OUR TORCH TEST (script section 3): a cream board on a low stand at the end of the table, three rows
   MOST LIGHT · ONLY SOME LIGHT · NO LIGHT, each with room for picture tiles and a blank space for its word. When a sheet has been tested its
   tile hops low onto its row; when the book's word has been read it is stamped on the row in the row's colour. Part 1 fills rows 1-2 (marks
   row1, row2); Part 2 starts with rows 1-2 filled, fills row 3 (row3: the door; mat / tray: the doormat and the metal tray), adds the two
   plastic boxes to rows 1 and 2 (the fix scene) and stamps the heading TRANSPARENCY (mark heading). ---------- */
const ROWS = [["MOST LIGHT", "TRANSPARENT"], ["ONLY SOME LIGHT", "TRANSLUCENT"], ["NO LIGHT", "OPAQUE"]];
// the tiles: [row, name, when it hops on (s), (Part 2) when Part 1 already had it]; the word is stamped .8 s after the row's first tile
const TILES = () => { const S = TL.scenes.find((x) => x.name === "fix"), m = (k) => TL.marks[k] === undefined ? 1e9 : TL.marks[k];
  return PART === 1 ? [[0, "clear glass", m("row1") + .2], [1, "frosted glass", m("row2") + .2]]
    : [[0, "clear glass", -1], [1, "frosted glass", -1], [2, "white door", m("row3") + .2], [2, "doormat", m("mat") - .1], [2, "metal tray", m("tray") - .1],
       [0, "clear box", S ? S.t0 + .3 : 1e9], [1, "cloudy box", S ? S.t0 + .7 : 1e9]]; };
const stampT = (r) => { const ts = TILES().filter((x) => x[0] === r).map((x) => x[2]); return ts.length ? Math.min(...ts) + .8 : 1e9; };
const headT = () => PART === 2 && TL.marks.heading !== undefined ? TL.marks.heading : 1e9;
// The board, drawn (Stage 2): a cream board on a low wooden stand; each row a soft band in its answer colour with its label (MOST LIGHT green,
// ONLY SOME LIGHT blue, NO LIGHT white with a dark border), picture tiles (flat.js TILEPIC) that hop on low, and the book's word stamped in the
// row's style. o.glow = row index that glows (0..2) or -1; o.flash = [3] (the chant). origin = the middle of the stand's feet; 900 wide
function torchBoard(t, o = {}) { const g = o.glow === undefined ? -1 : o.glow, fl = o.flash || [0, 0, 0], hk = t >= headT() ? spring(t, headT(), .4) : 0, top = hk > 0 ? -606 : -526; let rows = "";
  ROWS.forEach(([lab, word], i) => { const y = -370 + i * 118, st = stampT(i), k = t >= st ? spring(t, st, .4) : 0, glow = Math.max(g === i ? .35 + .2 * Math.sin(t * 5) : 0, fl[i]), lw = tw(lab, 27, 700, "Fredoka", 2) + 35;
    rows += `<rect x="-432" y="${y - 53}" width="864" height="106" rx="22" fill="${["#DDF3E3", "#DCEBFF", "#ECE8F6"][i]}"/>` + (glow > .02 ? `<rect x="-432" y="${y - 53}" width="864" height="106" rx="22" fill="${P.sun}" opacity="${n2(Math.min(.8, glow))}"/>` : "") + TF(-420 + lw / 2, y, 1, ansTag(lab, i, 27));
    TILES().filter((x) => x[0] === i).forEach(([r, nm, tin], j) => { if (t < tin) return; const kk = tin < 0 ? 1 : spring(t, tin, .35), hop = tin < 0 ? 0 : 34 * Math.sin(Math.PI * clamp((t - tin) / .35));
      rows += (o.tg && o.tg[nm] > .05 ? `<rect x="${-78 + j * 82 - 44}" y="${y - 49}" width="88" height="98" rx="16" fill="${P.sun}" opacity="${n2(Math.min(1, o.tg[nm]))}"/>` : "") + TF(-78 + j * 82, y - hop, kk * (1 + .12 * (o.tg && o.tg[nm] || 0)), `<g filter="url(#dropS)"><rect x="-37" y="-42" width="74" height="84" rx="11" fill="#fff"/></g>${TILEPIC[nm]}`); });
    rows += k > .02 ? TF(302, y, k, `<g transform="rotate(-2)">${ansTag(word, i, 26)}</g>`) : `<rect x="190" y="${y - 23}" width="224" height="46" rx="23" fill="none" stroke="${P.ink}" stroke-width="3" stroke-dasharray="8 6" opacity=".35"/>`; });
  return `<path d="M-250 0 L-230 -80 M250 0 L230 -80" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><rect x="-300" y="-16" width="100" height="16" rx="7" fill="#8A5A36"/><rect x="200" y="-16" width="100" height="16" rx="7" fill="#8A5A36"/><g filter="url(#drop)"><rect x="-456" y="${top}" width="912" height="${-64 - top}" rx="28" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g>`
    + T(0, -458, "OUR TORCH TEST", 46, P.ink, { ls: 4 }) + (hk > .02 ? TF(0, -548, hk, `<g transform="rotate(-1.5)"><g filter="url(#dropS)"><rect x="-250" y="-34" width="500" height="68" rx="34" fill="${P.ink}"/></g>${T(0, 16, "TRANSPARENCY", 46, P.sun, { ls: 5 })}</g>`) : "") + rows; }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little GOLDFISH swimming slowly in the small glass fish tank on the shelf by the window of the living room (every wide shot of
   the room): water plants, a lid, a line of small bubbles (cared for). Part 2: a little MOTH fluttering in a slow loop by the corridor's
   ceiling lamp (every wide shot of the corridor); it is never touched. Both drawn cute AND alive (SERIES_FORMAT section 6): round shapes,
   big friendly eyes with a highlight, a little smile, an idle loop (the goldfish swims, its fan tail waves, it blows tiny bubbles; the moth's
   soft furry cream-brown body, two feathery feelers, wings that open and close). Not on screen during a [LOOK CLOSER]. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: goldfishArt(t) / mothArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["goldfish", (t) => TF(-6, 14, 1.05, goldfishArt(t))] : ["moth", (t) => TF(0, 14, 1.0, mothArt(t))];
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#DDF4FF" : "#2B2A5E"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
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
// the small print that stays on screen in both parts (script section 3: "Never shine a torch at anyone's eyes." said once by Heart, kept on screen)
const TORCH_RULE = "Never shine a torch at anyone's eyes.";
const torchRule = (t, t0 = -9) => finePrint(t, t0, TORCH_RULE, 300, 196);   // upper left, under the logo pill (as EP10's water rule)
