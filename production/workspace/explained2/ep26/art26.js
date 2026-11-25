// art26.js: EP26's own drawings (the CECL exam-skills special). The CECL Genie as TheOneApp shows it: the gold lamp of the app's menu chip
// (#ffc53d, its handle #e39b12) with a purple wisp (#b388ff), the genie 🧞 rising from it; the four parts in the Genie's own colours: Choice
// red #e8493f, Evidence blue #4a90e2, Concept yellow #ffb627, Link green #3fc35f (genie/index.html), on the app's dark navy #0a1320 with
// cyan #66ccff. No science picture here may teach a wrong idea: the bar magnet is ONE piece of metal end to end (red / blue paint only).
const CECL = [["C", "Choice", "#e8493f"], ["E", "Evidence", "#4a90e2"], ["C", "Concept", "#ffb627"], ["L", "Link", "#3fc35f"]];
const GNAVY = "#0a1320", GCYAN = "#66ccff";
// the lamp (the app chip's own shape, scaled up; origin = its base) and the genie rising from it (o.rise 0..1)
const genieLamp26 = (t, o = {}) => { const r = clamp(o.rise || 0), glow = .5 + .5 * Math.sin(t * 3);
  return `<ellipse cx="0" cy="8" rx="150" ry="18" fill="${P.ink}" opacity=".2"/>` + (r > .02 ? OP(r, `<path d="M40 -150 C${n2(20 + 30 * Math.sin(t * 2))} -260 ${n2(-60 + 20 * Math.sin(t * 1.6))} -330 0 -420" stroke="#b388ff" stroke-width="${n2(40 * r)}" fill="none" stroke-linecap="round" opacity=".55"/>`
      + `<text x="0" y="${n2(-430 - 40 * r)}" font-size="${n2(200 * r)}" text-anchor="middle">🧞</text>` + [0, 1, 2, 3, 4].map((i) => `<circle cx="${n2(Math.cos(t * 2 + i * 1.3) * 140)}" cy="${n2(-380 + Math.sin(t * 2.4 + i) * 90)}" r="${n2(6 + 4 * Math.sin(t * 5 + i))}" fill="${GCYAN}" opacity=".8"/>`).join("")) : "")
    + `<g transform="scale(6) translate(-24 -42)"><path d="M10 28 q4 -10 16 -8 q10 2 10 8 q0 8 -10 10 h-8 q-8 -2 -8 -10 z" fill="#ffc53d" stroke="#c9961a" stroke-width=".8"/><path d="M34 24 q8 -2 8 4 q0 3 -4 3" fill="none" stroke="#e39b12" stroke-width="3" stroke-linecap="round"/><rect x="14" y="38" width="20" height="4" rx="2" fill="#e39b12"/><path d="M24 20 q-4 -8 2 -14 q2 6 -2 14z" fill="#b388ff" opacity="${n2(.6 + .3 * glow)}"/><path d="M14 26 q6 -4 14 -2" stroke="#fff3c4" stroke-width="1.5" fill="none" opacity=".8"/></g>`; };
// the four CECL tiles in a row (o.lit [t0..t3]: when each lights; o.on [bool..]: which are present; o.miss: dim the absent ones and cross them)
function ceclTiles26(t, o = {}) { let s = ""; const w = o.w || 230, gap = 20;
  CECL.forEach(([L, lab, col], i) => { const x = (i - 1.5) * (w + gap), lit = o.lit ? (o.lit[i] !== undefined && t >= o.lit[i] ? spring(t, o.lit[i], .4) : 0) : 1, on = o.on ? o.on[i] : true, a = on ? .35 + .65 * Math.min(1, lit) : .3;
    s += TF(x, 0, .9 + .1 * Math.min(1, lit), `<g opacity="${n2(a)}"><g filter="url(#dropS)"><rect x="${-w / 2}" y="-90" width="${w}" height="180" rx="26" fill="${on ? col : "#9AA6B2"}"/></g><rect x="${-w / 2 + 8}" y="-82" width="${w - 16}" height="60" rx="20" fill="#fff" opacity=".2"/>${T(0, 18, L, 96, "#fff")}${T(0, 72, lab, 30, "#fff", { w: 700 })}</g>`
      + (o.miss && !on ? `<path d="M${-w / 2 + 30} -60 L${w / 2 - 30} 60 M${w / 2 - 30} -60 L${-w / 2 + 30} 60" stroke="#D84A3A" stroke-width="12" stroke-linecap="round" opacity=".85"/>` : "") + (o.tick && on && lit > .5 ? TF(w / 2 - 22, -80, .8, tickBadge(26)) : "")); });
  return s; }
// a card of text lines, each optionally underlined in its CECL colour (lines: [[text, cecl index or -1, t0]]), o.title, o.w
function textCard26(t, lines, o = {}) { const w = o.w || 1200, lh = o.lh || 58, size = o.size || 36, top = o.title ? 70 : 30, h = top + lines.length * lh + 30;
  let s = `<g filter="url(#drop)"><rect x="${-w / 2}" y="0" width="${w}" height="${h}" rx="24" fill="${o.fill || "#FFFDF6"}" stroke="${o.stroke || "#D9C9A8"}" stroke-width="4"/></g>` + (o.title ? T(-w / 2 + 34, 50, o.title, 30, o.titleC || "#5A6A7A", { a: "start", w: 700 }) : "");
  lines.forEach(([txt, ci, t0], i) => { const y = top + i * lh + lh * .7, a = t0 === undefined ? 1 : ramp(t, t0, .35); if (a < .01) return;
    s += OP(a, (ci >= 0 ? `<rect x="${-w / 2 + 24}" y="${y - lh * .62}" width="12" height="${lh * .8}" rx="6" fill="${CECL[ci][2]}"/><rect x="${-w / 2 + 48}" y="${y + 8}" width="${n2(Math.min(w - 90, tw(txt, size, 600) + 10))}" height="8" rx="4" fill="${CECL[ci][2]}" opacity=".85"/>` : "") + T(-w / 2 + 50, y, txt, size, P.ink, { a: "start", w: 600 })); });
  return s; }
// split a long string into lines of at most n characters (by words)
const wrap26 = (s, n) => { const out = []; let cur = ""; for (const w of s.split(" ")) { if ((cur + " " + w).trim().length > n) { out.push(cur.trim()); cur = w; } else cur += " " + w; } if (cur.trim()) out.push(cur.trim()); return out; };
// Q1's picture: two metal bars, X and Y, on strings from a stand; a bar magnet (N end red, S blue: one piece) held near each; X swings away, Y
// swings towards (o.swing 0..1)
const barsPic26 = (t, o = {}) => { const sw = clamp(o.swing === undefined ? 1 : o.swing), bar = (x, lab, ang) => `<g transform="translate(${x} -260) rotate(${n2(ang)})"><path d="M0 0 V200" stroke="#5A4A3A" stroke-width="4"/><rect x="-60" y="200" width="120" height="34" rx="8" fill="#9AA3AB" stroke="#4E565E" stroke-width="4"/>${T(0, 226, lab, 26, "#fff", { w: 700 })}</g>`;
  return `<path d="M-330 -260 H330 M-300 -260 V40 M300 -260 V40" stroke="#8A6438" stroke-width="12" stroke-linecap="round"/>` + bar(-150, "X", 18 * sw) + bar(150, "Y", -10 * sw)
    + TF(-20, -20, .45, bar20(t, { glint: false })) + TF(290, -20, .45, bar20(t, { glint: false })) + (o.arrows ? fatArrow(-210, -10, -270, -40, "#D84A3A", 8) + fatArrow(130, 40, 200, 40, "#2FA35A", 8) : ""); };
// simple life-cycle tiles: a cockroach (egg case, nymph, adult) and a butterfly (egg, caterpillar, pupa, butterfly)
const roachS26 = (k = 1, wings = true) => TF(0, 0, k, `<ellipse cx="0" cy="0" rx="46" ry="22" fill="#8A4A2A" stroke="#4A2410" stroke-width="4"/>${wings ? `<path d="M-30 -14 Q10 -30 44 -4 Q10 8 -30 6z" fill="#B8703E" opacity=".9"/>` : ""}<circle cx="48" cy="0" r="12" fill="#5A3018"/><path d="M56 -6 q30 -30 50 -20 M56 4 q30 20 50 14" stroke="#4A2410" stroke-width="3" fill="none"/>` + [-20, 0, 20].map((x) => `<path d="M${x} 18 l-8 18 M${x} -18 l-8 -18" stroke="#4A2410" stroke-width="4"/>`).join(""));
const lifeRow26 = (t, kind) => { const labs = kind === "roach" ? ["egg", "nymph", "adult"] : ["egg", "larva", "pupa", "adult"], n = labs.length; let s = "";
  labs.forEach((lab, i) => { const x = (i - (n - 1) / 2) * 170; let pic = "";
    if (lab === "egg") pic = kind === "roach" ? `<rect x="-34" y="-16" width="68" height="32" rx="14" fill="#7A4A2A"/>` : `<circle r="16" fill="#F7F2D0" stroke="#C9B87A" stroke-width="3"/>`;
    else if (kind === "roach") pic = roachS26(lab === "nymph" ? .5 : .8, lab === "adult");
    else if (lab === "larva") pic = `<path d="M-50 0 q12 -18 24 0 q12 18 24 0 q12 -18 24 0 q12 18 24 0" stroke="#3FA35F" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="52" cy="-2" r="12" fill="#2E7A44"/>`;
    else if (lab === "pupa") pic = `<path d="M0 -40 Q30 -10 14 36 Q0 46 -14 36 Q-30 -10 0 -40z" fill="#9CCB7A" stroke="#5A8A3A" stroke-width="4"/>`;
    else pic = `<path d="M0 0 Q-60 -60 -70 -10 Q-60 30 0 0 Q60 30 70 -10 Q60 -60 0 0z" fill="#F2A65A" stroke="#8A4A1A" stroke-width="4"/><ellipse cx="0" cy="0" rx="8" ry="26" fill="#3A2A1A"/>`;
    s += `<g transform="translate(${x} 0)"><circle r="70" fill="#fff" stroke="#D9C9A8" stroke-width="4"/>${pic}${T(0, 104, lab, 28, P.ink, { w: 700 })}</g>` + (i < n - 1 ? fatArrow(x + 76, 0, x + 94, 0, "#9AA6B2", 6) : ""); });
  return s; };
// FACES: right. A dragonfly: a long thin blue body, four clear wings (a shimmer), huge round eyes with a highlight; it rests on a twig and
// flicks its wings (no travel)
function dragonfly26(t, o = {}) { const f = Math.sin(t * 30) * .5 + .5;
  return `<g transform="rotate(${n2(3 * Math.sin(t * 2))})"><ellipse cx="-10" cy="-18" rx="${n2(46 + 6 * f)}" ry="12" fill="#E8F6FF" opacity=".7" stroke="#8AC4E0" stroke-width="2" transform="rotate(-12 -10 -18)"/><ellipse cx="14" cy="-18" rx="${n2(42 + 6 * f)}" ry="11" fill="#E8F6FF" opacity=".7" stroke="#8AC4E0" stroke-width="2" transform="rotate(12 14 -18)"/>`
    + `<path d="M-90 2 H20" stroke="#2F6FD6" stroke-width="10" stroke-linecap="round"/>` + [-80, -64, -48, -32].map((x) => `<path d="M${x} -3 v10" stroke="#1E4A9A" stroke-width="2"/>`).join("") + `<ellipse cx="26" cy="2" rx="14" ry="10" fill="#3A8AE0"/>`
    + `<circle cx="44" cy="-2" r="14" fill="#2E7A44"/><circle cx="48" cy="-6" r="6" fill="#fff"/><circle cx="49" cy="-6" r="3.4" fill="#1A1410"/><circle cx="50.3" cy="-7.3" r="1.4" fill="#fff"/></g>`; }
// FACES: right (it rests on the spot)
const dragonflyAt = (t, x, y, k = .4, o = {}) => `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((o.dir || 1) * k)} ${n2(k)})">${dragonfly26(t, o)}</g>`;
// FACES: right. A small black ant carrying a crumb (pics.js ant() for the body); it stands on the spot, legs stepping
const antAt26 = (t, x, y, k = .5, o = {}) => `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2((o.dir || 1) * k)} ${n2(k)})">${ant(t)}<circle cx="34" cy="-30" r="9" fill="#F2D6A8" stroke="#B8905A" stroke-width="2"/></g>`;
// the spots: Part 1 the dragonfly in the science room (window, outside, on the garden tree / the sill plant); Part 2 the ant in Pip's kitchen
const DFAT = { intro: [580, 410, .45, {}], answer: [300, 240, .4, { dir: -1 }], lc1q: [470, 300, .4, {}], holdon: [200, 330, .4, {}], lc2q: [560, 250, .4, { dir: -1 }], cliff: [330, 360, .4, {}], liz: [420, 226, .5, {}] };
['cold', 'title', 'today', 'game', 'question'].forEach((k) => { DFAT[k] = DFAT.intro; });
const ANTAT = { intro: [560, 676, .55, {}], r1ans: [300, 742, .5, { dir: -1 }], lc1q: [1150, 742, .5, {}], show: [880, 742, .5, {}], fix: [880, 742, .5, {}], lc2q: [700, 742, .5, { dir: -1 }], liz: [1260, 548, .6, {}] };
['home', 'game', 'question'].forEach((k) => { ANTAT[k] = ANTAT.intro; });
// SR26: the science room (EP23's SR23) without its cricket or board; the lamp on the bench, the dragonfly; HOME26: Pip's kitchen (EP25's HOME25)
// without its bee, with the ant and the lamp on the counter
function SR26(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bug === undefined ? DFAT[sc] : o.bug, ani = bd ? dragonflyAt(t, bd[0], bd[1], bd[2], bd[3]) : "";
  return SR23(t, { ...o, bug: false, hs: false, bench: ani + (o.lamp === false ? "" : TF(1250, 858, .5, genieLamp26(t, { rise: o.rise || 0 }))) + (o.bench || "") }, cam); }
function HOME26(t, o = {}, cam) { const sc = (window._S || {}).name, bd = o.bug === undefined ? ANTAT[sc] : o.bug, ani = bd ? antAt26(t, bd[0], bd[1], bd[2], bd[3]) : "";
  return HOME25(t, { ...o, bug: false, front: ani + (o.lamp === false ? "" : TF(1250, 742, .42, genieLamp26(t, { rise: o.rise || 0 }))) + (o.front || "") }, cam); }
// TheOneApp on a phone: the Questions tab, the Answer Questions menu, the 🧞 CECL Genie chip, the Genie card "Learn the CECL way" (Members)
// o.step 0..3 (which screen), o.tap (a finger tap)
const phone26 = (t, o = {}) => { const st = o.step || 0; let s = `<rect x="-230" y="-440" width="460" height="880" rx="56" fill="#16161C"/><rect x="-210" y="-410" width="420" height="820" rx="40" fill="${GNAVY}"/>`;
  s += `<rect x="-210" y="330" width="420" height="80" fill="#121C2C"/>` + ["Home", "Questions", "Me"].map((lab, i) => T(-140 + i * 140, 380, lab, 24, i === 1 && st >= 1 ? GCYAN : "#9aa7b6", { w: 700 })).join("");
  if (st === 0) s += T(0, -60, "TheOneApp", 52, "#fff", { w: 700 }) + `<text x="0" y="60" font-size="80" text-anchor="middle">🧞</text>`;
  if (st >= 1) s += T(-180, -340, "Answer Questions", 30, "#fff", { a: "start", w: 700 }) + ["Practice", "Improve", "Reward"].map((lab, i) => `<rect x="-190" y="${-300 + i * 110}" width="380" height="84" rx="24" fill="#1C2A40"/>` + T(-160, -248 + i * 110, lab, 26, "#9aa7b6", { a: "start", w: 600 })).join("")
    + `<rect x="-190" y="30" width="380" height="96" rx="30" fill="#2A1D44" stroke="${st >= 2 ? "#ffc53d" : "#b388ff"}" stroke-width="${st >= 2 ? 6 : 3}"/>` + `<text x="-150" y="94" font-size="48">🧞</text>` + T(-80, 92, "CECL Genie", 34, "#fff", { a: "start", w: 700 });
  if (st >= 3) s += `<rect x="-210" y="-410" width="420" height="740" rx="40" fill="${GNAVY}"/>` + T(0, -300, "Learn the", 44, "#fff", { w: 700 }) + T(0, -246, "CECL way.", 44, "#ffc53d", { w: 700 })
    + CECL.map(([L, lab, col], i) => `<rect x="${-180 + i * 92}" y="-180" width="80" height="80" rx="16" fill="${col}"/>` + T(-140 + i * 92, -126, L, 44, "#fff")).join("")
    + `<rect x="-190" y="-50" width="380" height="200" rx="28" fill="#1C2A40" stroke="#ffc53d" stroke-width="4"/>` + `<text x="-170" y="40" font-size="60">🧞</text>` + T(-90, 10, "Not sure how", 26, "#fff", { a: "start", w: 700 }) + T(-90, 44, "to answer?", 26, "#fff", { a: "start", w: 700 }) + T(-90, 80, "Learn the CECL way.", 24, GCYAN, { a: "start", w: 600 })
    + `<rect x="40" y="170" width="150" height="46" rx="23" fill="#ffc53d"/>` + T(115, 202, "Members", 24, GNAVY, { w: 700 });
  if (o.tap !== undefined) s += OP(o.tap, `<circle cx="${o.tx || 0}" cy="${o.ty || 0}" r="44" fill="#fff" opacity=".35"/><circle cx="${o.tx || 0}" cy="${o.ty || 0}" r="22" fill="#fff" opacity=".6"/>`);
  return s; };
