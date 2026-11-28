// tests.js: EP9's data and Stage 1 helpers ("Snap it or bend it: strong vs flexible"). Loaded after pics.js, before common.js.
// STAGE 1 (setup): data, timing and placeholders only. STAGE 2 (Fable) draws the void deck, the playground, the test stand, the strips, the
// cups, the drop box, the rubber band and the ice-cream stick, the tubes, the two journeys and the two hidden animals (SCENES_TODO.md), and
// replaces each placeholder below with the real drawing (keep the names and arguments: p1.js / p2.js already call them).

/* ---------- the two answer colours (SERIES_FORMAT section 4): STRONG and FLEXIBLE green, FRAGILE and RIGID blue (tags and trays) ---------- */
const GOODC = P.leaf, WEAKC = P.blue;

/* ---------- the board OUR 3 TESTS (script section 3): a cream board on a low stand, three rows with a tick box each.
   Part 1 stamps 1 PULL at tick1 and 2 DROP at tick2; Part 2 starts with both ticked and stamps 3 BEND at tick3. ---------- */
const TESTS = [["1", "PULL", "tick1"], ["2", "DROP", "tick2"], ["3", "BEND", "tick3"]];
const tickT = (i) => { const mk = TL.marks[TESTS[i][2]]; return PART === 2 && i < 2 ? -1 : mk === undefined ? 1e9 : mk; };
const ticked = (i, t) => t >= tickT(i);
// STAGE 1 placeholder of the board (functional: rows, ticks, a glowing row). Stage 2 redraws it on its low stand, standing on the table or ground.
// o.glow = row index that glows (0..2) or -1; origin = the middle of the stand's feet
const _rowIcon = (i) => i === 0 ? `<rect x="-9" y="-26" width="18" height="34" rx="3" fill="#fff" stroke="${P.ink}" stroke-width="4"/><path d="M0 8 V18" stroke="${P.ink}" stroke-width="4"/><rect x="-18" y="18" width="36" height="12" rx="5" fill="#E8B23E" stroke="${P.ink}" stroke-width="4"/>`
  : i === 1 ? `<path d="M-14 -8 H14 L10 26 H-10z" fill="#DDF4FF" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M-16 -18 V-30 M0 -16 V-30 M16 -18 V-30" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`
  : `<path d="M-24 14 Q0 -34 24 14" fill="none" stroke="${P.ink}" stroke-width="13" stroke-linecap="round"/><path d="M-24 14 Q0 -34 24 14" fill="none" stroke="#C8925A" stroke-width="6" stroke-linecap="round"/>`;
function board3(t, o = {}) { const g = o.glow === undefined ? -1 : o.glow; let rows = "";
  TESTS.forEach(([n, w], i) => { const y = -322 + i * 98, on = ticked(i, t), k = on ? spring(t, tickT(i), .4) : 0, u = t - tickT(i);
    rows += (g === i ? `<rect x="-262" y="${y - 45}" width="524" height="90" rx="22" fill="${P.sun}" opacity="${n2(.5 + .25 * Math.sin(t * 5))}"/>` : `<rect x="-262" y="${y - 45}" width="524" height="90" rx="22" fill="#fff" opacity=".55"/>`)
      + `<g transform="translate(-218 ${y})"><circle r="30" fill="${P.ink}"/>${T(0, 15, n, 42, "#fff")}</g>` + T(-166, y + 19, w, 56, P.ink, { a: "start", ls: 3 }) + TF(88, y, 1, _rowIcon(i))
      + `<rect x="158" y="${y - 34}" width="68" height="68" rx="14" fill="#fff" stroke="${P.ink}" stroke-width="5"/>`
      + (k > .02 ? TF(192, y, k, `<path d="M-24 0 L-6 20 L30 -26" fill="none" stroke="#1F8A4C" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`) + (u >= 0 && u < .5 ? `<circle cx="192" cy="${y}" r="${n2(40 + 90 * eo(u / .5))}" fill="none" stroke="${GOODC}" stroke-width="${n2(10 * (1 - u / .5))}"/>` : "") : ""); });
  return `<ellipse cx="0" cy="4" rx="270" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-170 0 V-70 M170 0 V-70" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-220" y="-12" width="440" height="16" rx="8" fill="#8A5A36"/>
    <g filter="url(#drop)"><rect x="-296" y="-482" width="592" height="436" rx="28" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/><path d="M-296 -402 V-454 Q-296 -482 -268 -482 H268 Q296 -482 296 -454 V-402z" fill="${P.ink}"/></g>`
    + T(0, -422, "OUR 3 TESTS", 46, "#fff", { ls: 5 }) + rows; }

/* ---------- the hidden animals (teacher, 2026-11-21): named by Heart at the start with their picture, revealed at the end.
   Part 1: a little SPIDER hanging on its thread by the letterboxes (void deck), bobbing (every wide shot of the void deck).
   Part 2: a little CATERPILLAR inching along the handrail of the slide (playground), arching up and stretching out (every wide shot).
   Both drawn cute AND alive (SERIES_FORMAT section 6): round bodies, big friendly eyes with a highlight, a little smile, an idle loop. ---------- */
// STAGE 1 placeholder art (centred on 0, 0, about 200 px): a grey disc with the animal's name. Stage 2: spiderArt(t) / caterpillarArt(t).
const hiddenPH = (name) => (t) => `<circle r="92" fill="#D9D4EA" stroke="${P.ink}" stroke-width="4" stroke-dasharray="12 8"/>${T(0, -8, name, 40, P.ink)}${T(0, 34, "(Stage 2)", 24, P.ink, { w: 500 })}`;
const HIDDEN = PART === 1 ? ["spider", hiddenPH("spider")] : ["caterpillar", hiddenPH("caterpillar")];
const hiddenBadge = (t, r = 150) => `<g filter="url(#drop)"><circle r="${r}" fill="${P.paper}"/><circle r="${r - 10}" fill="${PART === 1 ? "#E4EEF8" : "#CFEFD6"}"/></g><g transform="scale(${n2(r / 150)})">${HIDDEN[1](t)}</g>`
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
