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
// STAGE 1 placeholder of the board (functional: rows, tiles hopping on, stamped words, the heading). Stage 2 redraws it on its low stand
// (the tiles as small pictures). o.glow = row index that glows (0..2) or -1; o.flash = [3] (the chant). origin = the middle of the stand's feet
function torchBoard(t, o = {}) { const g = o.glow === undefined ? -1 : o.glow, fl = o.flash || [0, 0, 0]; let rows = "";
  ROWS.forEach(([lab, word], i) => { const y = -350 + i * 110, st = stampT(i), k = t >= st ? spring(t, st, .4) : 0, glow = Math.max(g === i ? .35 + .2 * Math.sin(t * 5) : 0, fl[i]);
    rows += (glow > .02 ? `<rect x="-430" y="${y - 50}" width="860" height="100" rx="20" fill="${P.sun}" opacity="${n2(Math.min(.8, glow))}"/>` : "")
      + T(-410, y + 14, lab, 34, P.ink, { a: "start" });
    TILES().filter((x) => x[0] === i).forEach(([r, nm, tin], j) => { if (t < tin) return; const kk = tin < 0 ? 1 : spring(t, tin, .35), hop = tin < 0 ? 0 : 30 * Math.sin(Math.PI * clamp((t - tin) / .35));
      rows += TF(-40 + j * 78, y - hop, kk, `<rect x="-34" y="-36" width="68" height="72" rx="10" fill="#fff" stroke="${P.ink}" stroke-width="3"/>${T(0, 6, nm.split(" ").map((w) => w[0]).join("").toUpperCase(), 22, P.ink)}`); });
    rows += k > .02 ? TF(300, y, k, ansTag(word, i, 26)) : `<rect x="196" y="${y - 22}" width="210" height="44" rx="22" fill="none" stroke="${P.ink}" stroke-width="3" stroke-dasharray="8 6" opacity=".4"/>`; });
  const hk = t >= headT() ? spring(t, headT(), .4) : 0;
  return `<path d="M-220 0 V-60 M220 0 V-60" stroke="#8A5A36" stroke-width="14" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-450" y="-${hk > 0 ? 560 : 500}" width="900" height="${hk > 0 ? 510 : 450}" rx="26" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>`
    + T(0, -440, "OUR TORCH TEST", 46, P.ink, { ls: 4 }) + (hk > .02 ? TF(0, -510, hk, `<rect x="-230" y="-30" width="460" height="60" rx="30" fill="${P.ink}"/>${T(0, 14, "TRANSPARENCY", 40, P.sun, { ls: 4 })}`) : "") + rows + tpill(0, -84, "STAGE 2: draw (tiles = pictures)", 22, P.coral, "#fff"); }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little GOLDFISH swimming slowly in the small glass fish tank on the shelf by the window of the living room (every wide shot of
   the room): water plants, a lid, a line of small bubbles (cared for). Part 2: a little MOTH fluttering in a slow loop by the corridor's
   ceiling lamp (every wide shot of the corridor); it is never touched. Both drawn cute AND alive (SERIES_FORMAT section 6): round shapes,
   big friendly eyes with a highlight, a little smile, an idle loop (the goldfish swims, its fan tail waves, it blows tiny bubbles; the moth's
   soft furry cream-brown body, two feathery feelers, wings that open and close). Not on screen during a [LOOK CLOSER]. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: goldfishArt(t) / mothArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["goldfish", hiddenPH("goldfish")] : ["moth", hiddenPH("moth")];
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
