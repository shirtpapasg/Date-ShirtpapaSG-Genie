// p2.js: PART 2, "2 Weeks in a Dark Cupboard. What Is This Plant MISSING?": food, and how a plant gets its food. Segments 1-12 of the approved script.
if (PART === 2) { (() => {
const BX = [110, 320, 530], BY = 1064, BH = 180;   // the buddies' discs, to the left of the rooms
const trio = (t, o = {}) => ["pip", "basil", "momo"].map((w, i) => buddy(w, BX[i], BY, BH, t, { aura: true, tag: false, ...(o[w] || {}) })).join("");
const T5 = { "1w": 0, "1a": 0, "2w": 0, "2f": 0, "2a": 0 };
// the board over the whole part: Room 3's three boxes tick when the pale plant moves into the light; Room 1's FOOD box is the last one, at sunset
const tk3 = [LT("b514") + 1.0, LT("b514") + 1.4, LE("b514") - .3], tk1f = LE("b702") - .15, TK = { ...T5, "3w": tk3[0], "3a": tk3[1], "3f": tk3[2], "1f": tk1f };
const GX = 1370, PX = 1535, WBX = 585, CT = 300, BK = .82;   // the window plant and the cupboard plant, side by side in front of Room 3; where the window plant stands later; the cloths
/* ---------- Part 2's own props ---------- */
// a spotted cloth (no pot): origin = the middle of the pot's base
const clothOnly = (tall = CT) => { let dots = ""; for (let i = 0; i < 20; i++) { const cx = -70 + (i % 4) * 46 + (Math.floor(i / 4) % 2) * 22, cy = -tall + 44 + Math.floor(i / 4) * 54; if (cy < -62 && Math.abs(cx) < 74) dots += `<circle cx="${cx}" cy="${cy}" r="8"/>`; }
  return `<g filter="url(#dropS)"><path d="M-78 -40 Q-96 ${-tall * .6} -44 ${-tall + 8} Q0 ${-tall - 12} 44 ${-tall + 8} Q96 ${-tall * .6} 80 -44 Q62 -30 44 -44 Q22 -58 0 -42 Q-22 -28 -44 -44 Q-62 -56 -78 -40z" fill="url(#xCloth)" stroke="#C4476A" stroke-width="4" stroke-linejoin="round"/></g><g fill="#fff" opacity=".45">${dots}</g><path d="M-40 ${-tall + 26} Q0 ${-tall + 6} 40 ${-tall + 26}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".35"/>`; };
const potOnly = () => `<ellipse cx="0" cy="3" rx="112" ry="12" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><path d="M-50 -110 H50 L40 -6 Q0 6 -40 -6z" fill="url(#gPot)" stroke="#9C4423" stroke-width="5" stroke-linejoin="round"/>`;
const pipTag = () => `<g transform="translate(96 -150) rotate(7)"><path d="M-70 -6 L-98 -22" stroke="${P.ink2}" stroke-width="3"/><g filter="url(#dropS)"><rect x="-74" y="-36" width="170" height="72" rx="10" fill="${P.paper}" stroke="${P.sunDeep}" stroke-width="3"/></g><circle cx="-60" cy="-22" r="5" fill="${P.ink2}"/>${T(12, -4, "from Pip’s", 23, P.ink, { w: 600 })}${T(12, 24, "cupboard", 23, P.ink, { w: 600 })}</g>`;
// a covered pot: o.peek (the thin pale tip under the edge), o.tag
const covered = (o = {}) => potOnly() + (o.peek ? `<path d="M-64 -30 q-22 4 -34 -22" fill="none" stroke="#E9DE8A" stroke-width="7" stroke-linecap="round"/><ellipse cx="-100" cy="-54" rx="13" ry="7" fill="#F4EBA0" stroke="#C9B85A" stroke-width="3" transform="rotate(-30 -100 -54)"/>` : "") + clothOnly() + (o.tag ? pipTag() : "");
const gCov = (x, o = {}) => TF(x, HT.fy, .9, covered(o)), gBn = (x, o = {}) => TF(x, HT.fy, .9, beanPot({ k: BK, ...o }));
// a small cupboard: origin = the middle of its base, 320 wide, 420 tall. open 0..1 (the door swings), inner = svg inside, dark = 0..1 darkness over what is inside
function cupboard(o = {}) { const op = o.open || 0, dw = 280 * (1 - .8 * op), dk = o.dark === undefined ? .5 : o.dark;
  return `<ellipse cx="0" cy="4" rx="184" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><rect x="-160" y="-420" width="320" height="420" rx="14" fill="url(#hWood)" stroke="#8A5E34" stroke-width="6"/><rect x="-140" y="-400" width="280" height="380" rx="6" fill="#3A2C4E"/><rect x="-140" y="-40" width="280" height="20" fill="#5A4630"/>
  ${o.inner || ""}<rect x="-140" y="-400" width="280" height="380" rx="6" fill="#170F2A" opacity="${n2(dk)}"/>
  <rect x="-140" y="-400" width="${n2(dw)}" height="380" rx="6" fill="url(#hCard)" stroke="#8A5E34" stroke-width="5"/>${dw > 90 ? `<rect x="-118" y="-378" width="${n2(dw - 44)}" height="336" rx="6" fill="none" stroke="#B58A52" stroke-width="4" opacity=".7"/>` : ""}<circle cx="${n2(-140 + dw - 24)}" cy="-210" r="11" fill="#FFE27A" stroke="#C98200" stroke-width="4"/>
  <rect x="-176" y="-436" width="352" height="26" rx="10" fill="url(#hWood)" stroke="#8A5E34" stroke-width="5"/>`; }
const paleLeaf = (L) => `<path d="M0 0 C${n2(L * .3)} ${n2(-L * .3)} ${n2(L * .8)} ${n2(-L * .22)} ${n2(L)} 0 C${n2(L * .8)} ${n2(L * .2)} ${n2(L * .3)} ${n2(L * .26)} 0 0z" fill="url(#hPale)" stroke="#C2B052" stroke-width="3" stroke-linejoin="round"/>`;
// a pot seen from above: only soil and the plant. Nobody put food here
const potTop = (pale) => { const r = rndm(pale ? 5 : 9); let sp = ""; for (let i = 0; i < 16; i++) { const a = r() * 6.28, d = 20 + r() * 86; sp += `<circle cx="${n2(Math.cos(a) * d)}" cy="${n2(Math.sin(a) * d)}" r="${n2(3 + r() * 4)}" fill="#8A6040" opacity=".7"/>`; }
  return `<circle r="150" fill="url(#gPot)" stroke="#9C4423" stroke-width="8"/><circle r="140" fill="none" stroke="#fff" stroke-width="5" opacity=".25"/><circle r="120" fill="url(#hSoil)" stroke="#3A2420" stroke-width="5"/>${sp}`
    + (pale ? [30, 215].map((a) => `<g transform="rotate(${a})">${paleLeaf(58)}</g>`).join("") + `<circle r="9" fill="#DDD27E" stroke="#C2B052" stroke-width="3"/>` : [20, 110, 200, 290].map((a, i) => `<g transform="rotate(${a}) scale(${i % 2 ? .8 : 1})">${bleaf(104, i % 2 === 0)}</g>`).join("") + `<circle r="11" fill="#2C9A55" stroke="#1F7F47" stroke-width="3"/>`); };
// a small sun (for "light")
const sunIcon = (r = 30) => `<circle r="${r}" fill="${P.sun}" stroke="${P.sunDeep}" stroke-width="${n2(r * .16)}"/><g stroke="${P.sunDeep}" stroke-width="${n2(r * .2)}" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M0 ${n2(-r * 1.35)} v${n2(-r * .45)}" transform="rotate(${a})"/>`).join("")}</g>`;
// light from the window lands on a plant's leaves: a soft beam from the upper right to (x, y); k 0..1
const beam = (x, y, k = 1, w = 190) => k < .02 ? "" : `<g style="mix-blend-mode:screen" opacity="${n2(.75 * k)}"><path d="M${x + 760} ${y - 900} L${x + 1060} ${y - 760} L${x + w} ${y + 60} L${x - w} ${y - 40}z" fill="#FFE27A" filter="url(#b10)"/></g><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${n2(w * .7)}" fill="#FFF3B8" opacity="${n2(.4 * k)}" filter="url(#b30)"/>`;
// a small picture: light on green leaves, "making food" (Room 3's picture, used on Momo's fixed homework)
const foodPic = (t) => `<g filter="url(#dropS)"><rect x="-150" y="-120" width="300" height="220" rx="20" fill="#DDF1FF" stroke="${P.sunDeep}" stroke-width="4"/></g><g transform="translate(96 -74)">${sunIcon(20)}</g><path d="M80 -58 L-70 40 L10 60z" fill="#FFE27A" opacity=".55"/>${TF(-36, 92, .5, beanPot({ k: .7 }))}${leafSparkles(t, -36, -6, 60, 40, 5, 4)}<g transform="translate(64 62)"><rect x="-78" y="-22" width="156" height="44" rx="14" fill="${P.ink}"/>${T(0, 9, "making food", 24, "#fff", { w: 600 })}</g>`;
const ring = (x, y, rx, ry, a) => a < .02 ? "" : `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${P.sun}" stroke-width="9" opacity="${n2(a)}"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${P.sun}" opacity="${n2(.18 * a)}" filter="url(#b10)"/>`;
// the check-in board, stepped forward so its boxes can be read in a wide shot
const FB = [1768, HT.fy + 70, .7], fwdBoard = (t, o = {}) => TF(FB[0], FB[1], FB[2], boardEasel(t, TK, o));
/* what stands in the hotel in Part 2. o: r3: "cover1" (the covered cupboard pot, as Part 1 ended) | "covers" | "beans" | "final" (the pale plant in Room 3, the window plant by the sign); sway, box, jar, extra */
function items2(t, o = {}) { const r3 = o.r3 || "cover1"; let s = "";
  if (r3 === "final") s += gBn(WBX, { sway: 2 * Math.sin(t * 1.1) });
  s += gPlant({ droop: 0, wet: 1, sway: o.sway || 0 }) + (o.jar === false ? "" : gJar(o.jarIn === undefined ? dishIn({ s: .6, y: -6, bites: 2, id: o.id || "ck2" }) : o.jarIn, { lid: "holes", ...(o.jarO || {}) })) + (o.box === false ? "" : gBox("", {}));
  if (r3 === "cover1") s += gCov(1485, { tag: true, peek: 1 });
  else if (r3 === "covers") s += gCov(GX) + gCov(PX, { tag: true, peek: 1 });
  else if (r3 === "beans") s += gBn(GX, { sway: 2 * Math.sin(t * 1.1), ...(o.bk ? { k: o.bk } : {}) }) + gBn(PX, { pale: 1, ...(o.bk ? { k: o.bk } : {}) });
  else if (r3 === "final") s += gBn(HT.rx[2], { pale: 1 });
  return s + (o.extra || ""); }

/* ============ 1 · the silent recap montage: five shots from Part 1 ============ */
const J2 = [HT.rx[1], HT.fy - 232];
SC.recap = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const d = 1.32, i = Math.min(4, Math.floor((t - s.t0) / d)), u = t - s.t0 - i * d; let v;
  const p1 = (o) => gPlant({ droop: o.droop, wet: o.wet, shine: o.wet ? .6 : 0 }) + (o.jar ? gJar(o.jar[0], o.jar[1]) : "") + gBox(o.dish === false ? "" : dishIn({ s: .62, y: -22, id: "ckr" }), {}) + TF(HT.rx[2], HT.fy, .9, covered({ tag: true }));
  if (i === 0) v = hotelView(t, { items: p1({ droop: .9, wet: 0 }) }, [2.0 + .06 * u, 830, 700]) + dayCounter(t, 31);
  else if (i === 1) { const dr = lerp(.9, 0, ss(.25, 1.0, u)); v = hotelView(t, { clock: 9 + 4 * ss(.2, 1.0, u), items: p1({ droop: dr, wet: 1 }) + TF(960, HT.fy, .8, wateringCan(0, 0, t)) }, [1.9, 830, 690]) + buddy("pip", 210, 1062, 280, t, { aura: true, tag: false, pose: u > .8 ? "cheer" : "pointing", still: true }) + dayCounter(t, 31); }
  else if (i === 2) { const ly = -150 * (1 - ss(.15, .7, u)); let sw = ""; for (let k = 0; k < 3; k++) sw += airSwirl(t, J2[0] - 150 + k * 30, J2[1] - 150 + k * 14, 110, 200, k / 3, "#fff", ss(.7, 1, u));
    v = hotelView(t, { clock: 13.3, items: p1({ droop: 0, wet: 1, dish: false, jar: [dishIn({ s: .6, y: -6, id: "ckq" }), { lid: "holes", lidY: ly }] }) + TF(J2[0] - 190, HT.fy + 216 * .9, .9, jarLid("tight")) + (u < .95 ? TF(J2[0], J2[1] + ly * .9 - 14 - 400 * ss(.72, .95, u), .62, adultArm()) : "") + sw }, [2.25, 1165, 745]) + dayCounter(t, 31); }
  else if (i === 3) v = bg("daystage") + TF(960, 1030, 1.56, boardEasel(t, T5, {}));
  else v = hotelView(t, { mode: "pm", clock: 14.1, ticks: T5, items: gPlant({ droop: 0, wet: 1 }) + gJar(dishIn({ s: .6, y: -6, bites: 2, id: "cks" }), { lid: "holes" }) + gBox("", {}) + gCov(1485, { tag: true, peek: 1 })
      + TF(1485 + 215, HT.fy + 10, .5 * spring(u, .25, .5), `<path d="M-50 0 L-34 -36 H34 L50 0z" fill="url(#hWood)" stroke="#8A5E34" stroke-width="4"/><g filter="url(#dropS)"><rect x="-90" y="-250" width="180" height="220" rx="24" fill="url(#gSun)"/></g>${T(0, -84, "?", 170, P.ink)}`) }, [2.0, 1700, 740]) + dayCounter(t, 31);
  return v + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.5 * (1 - clamp(u / .18)))}"/>` + tpill(960, 60, "Part 1", 34, P.ink, P.sun, { w: 700, ls: 3 }); };

/* ============ 2 · "Last time..." ============ */
SC.lasttime = (t, s) => { const L = "b201", tA = W(L, "plant") - .2, tWl = W(L, "wilting") - .15, tB = W(L, "mealworm") - .2, tH = W(L, "holes") - .15, tC = W(L, "room") - .2, tQ = W(L, "what") - .1, g = (t0, d = 2.2) => pulse(t, t0 + .2, .2, d);
  const cam = [1 + .04 * clamp((t - s.t0) / 12), 960, 560];
  const st = { mode: "pm", clock: 14.2, ticks: T5, items: ring(HT.rx[0], HT.fy - 150, 150, 190, g(tA, 3.4)) + ring(HT.rx[1], HT.fy - 120, 135, 160, g(tB, 3.4)) + ring(1485, HT.fy - 130, 150, 170, g(tC, 3.0)) + items2(t, {}) };
  return hotelView(t, st, cam) + trio(t, { pip: { poses: [[tC, "pointing"]] }, momo: { poses: [[tQ, "thinking"]] }, basil: { poses: [[tB, "cheer"], [tB + 1.6, "sit"]], nohop: true } })
    + (t >= tWl ? OP(1 - ramp(t, tB - .2, .25), TF(camX(cam, HT.rx[0]), 420, spring(t, tWl, .4), tpill(0, 0, "It was wilting.", 44, "#fff", P.ink, { w: 700 }))) : "")
    + (t >= tH ? OP(1 - ramp(t, tC - .2, .25), TF(camX(cam, HT.rx[1]), 470, spring(t, tH, .4), tpill(0, 0, "a lid with holes", 44, "#fff", P.ink, { w: 700 }))) : "")
    + (t >= tQ ? TF(camX(cam, 1485), 400, spring(t, tQ, .45), `<g filter="url(#dropS)"><circle r="66" fill="url(#gSun)"/></g>${T(0, 30, "?", 90, P.ink)}`) : "")
    + lowerPill(60, 300, "2 o’clock") + dayCounter(t, 31) + HUD(t); };

/* ============ 3 · today's goals, the game ============ */
SC.goals = (t, s) => goalsScene(t, s, "b301", [["Why living things need food", TF(0, 0, 1.5, `<circle r="42" fill="${P.paper}"/>` + needIcon("food", "#B4580C", "#FFE0B8"))], ["How a plant gets its food", TF(0, 46, .46, beanPot({ k: .8 }))],
  ["The three needs of living things", [-1, 0, 1].map((i) => TF(i * 104, 0, 1.05, `<circle r="42" fill="${P.paper}"/>` + needIcon(NEEDS[i + 1][2], NCOL[NEEDS[i + 1][1]][3], NCOL[NEEDS[i + 1][1]][4]))).join("")]], [["why"], ["how"], ["three"]]);
SC.game = (t, s) => gameScene(t, s, "b302", false);

/* ============ 4 · food gives energy ============ */
const plate = `<ellipse cx="0" cy="0" rx="70" ry="16" fill="#fff" stroke="#B9C6DE" stroke-width="4"/><ellipse cx="-8" cy="-10" rx="44" ry="16" fill="#FFF6DC" stroke="#E0CF9A" stroke-width="3"/><path d="M4 -22 q30 -6 44 8 q-22 10 -46 4z" fill="#E9B878" stroke="#B4762E" stroke-width="3"/><ellipse cx="-44" cy="-4" rx="12" ry="5" fill="#57B77A"/>`;
SC.energy = (t, s) => { const L = "b401", tp = [W(L, "after") - .2, W(L, "so") - .15, W(L, "our") - .15], tU = W(L, "used") - .1, tE = W(L, "eat") - .05, tH = W(L, "hungry") - .1, tF = W(L, "food") - .1;
  const en = t < tE ? lerp(.85, .12, ss(tp[0] + .2, tU + .9, t)) : lerp(.12, .95, ss(tE, tE + .9, t)), low = en < .3, rum = pulse(t, tH, .05, .9);
  const cards = [[`<rect x="-200" y="-170" width="400" height="90" fill="#7BCB8C"/><path d="M-200 -170 H200" stroke="#fff" stroke-width="5" opacity=".7"/>` + TF(0, -118, .88, kid({ armR: 34, armL: 34, mouth: "o", hair: "tails", sweat: 1, lean: 3 }))
      + (rum > .05 ? `<g transform="translate(74 -250)" opacity="${n2(rum)}" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"><path d="M0 0 q10 -10 20 0 t20 0"/><path d="M6 18 q10 -10 20 0 t20 0"/></g>` : ""), "after PE"],
    [`<rect x="-200" y="-190" width="400" height="120" fill="#F6CFA0"/>` + TF(-40, -100, .86, kid({ armR: 70, armL: 30, mouth: "open", hair: "tails", exR: `<rect x="-5" y="80" width="10" height="46" rx="4" fill="#AAB3CC"/><ellipse cx="0" cy="130" rx="11" ry="8" fill="#C9D2E8"/>` })) + `<rect x="-200" y="-190" width="400" height="110" fill="#E6C39A"/><rect x="-200" y="-196" width="400" height="12" fill="#B98A5A"/>` + TF(60, -206, 1, plate), "you eat"],
    [TF(-10, -150, 1.25, wormDish({ bites: 2, wx: 20, wl: 84, id: "ce8" })) + `<rect x="-200" y="-150" width="400" height="60" fill="#F4E3C3"/>` + TF(-10, -150, 1.25, wormDish({ bites: 2, wx: 20 + 6 * Math.sin(t * 5), wl: 84, id: "ce9" })), "the mealworm eats"]];
  let out = bg("daystage"); cards.forEach(([inner, lab], i) => { const k = spring(t, tp[i], .5); if (k < .02) return; out += TF(400 + i * 560, 1000, k * 1.2 * (1 + .04 * pulse(t, tp[i] + .1, .05, .6)), picCard(inner, lab, { id: "pe" + i, rot: [-2, 1, -1.5][i], size: i === 2 ? 38 : 44 })); });
  // the energy bar: nearly empty after PE, full again after eating
  const bk = spring(t, tp[0] + .3, .45); if (bk > .02) out += TF(960, 300, bk, `<g filter="url(#drop)"><rect x="-470" y="-62" width="940" height="124" rx="40" fill="${P.ink}"/></g>${T(-430, 20, "energy", 54, "#fff", { a: "start" })}<rect x="-210" y="-34" width="640" height="68" rx="22" fill="#3A3160"/><rect x="-204" y="-28" width="${n2(628 * en)}" height="56" rx="18" fill="${low ? P.coral : "url(#gSun)"}" opacity="${n2(low ? .75 + .25 * Math.sin(t * 10) : 1)}"/>`);
  return out + (t >= tF ? OP(1 - ramp(t, tp[0], .25), TF(960, 420, spring(t, tF, .45), needChip(1, 110, { num: false }))) : "") + HUD(t); };
SC.mark1 = (t, s) => markScene(t, s, { id: "b403", sayId: "b402", who: "basil", n: "1 of 3", text: "All living things need food. Food provides living things with energy.", keys: ["food.", "energy."], size: 70, y: 200, poses: [[LE("b403") + .2, "cheer"]] });
SC.whofeeds = (t, s) => { const m = "b404", tR = W(m, "rice") - .3, tO = W(m, "oats") - .5, tN = W(m, "nobody") - .2, tW = W(m, "who") - .2, cam = [1.45, 1060, 650], g = (t0, d = 1.6) => pulse(t, t0 + .2, .2, d);
  const q = (x) => t >= tW ? TF(camX(cam, x), 330, spring(t, tW + (x > 1000 ? .15 : 0), .45), `<g filter="url(#dropS)"><circle r="56" fill="url(#gSun)"/></g>${T(0, 26, "?", 78, P.ink)}`) : "";
  return hotelView(t, { mode: "pm", clock: 14.4, ticks: T5, items: ring(HT.rx[1], HT.fy - 120, 135, 160, g(tO)) + ring(HT.rx[0], HT.fy - 150, 150, 190, g(tN, 3)) + ring(1485, HT.fy - 130, 150, 170, g(tN, 3)) + items2(t, {}) }, cam)
    + q(HT.rx[0]) + q(1485) + buddy("momo", 190, 1066, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "thinking"], [LT(m) - .12, "sit"], [LE(m) + .1, "thinking"]] }) + say(m, 400, 520, t, { size: 46, maxW: 620, tail: -100 })
    + dayCounter(t, 31) + HUD(t); };

/* ============ 5 · Round 1: the bean plant from the dark cupboard ============ */
const CAMC = [2.0, 2000, 860];
SC.notebook = (t, s) => { const L = "b501", tT = MK("today");
  if (t >= tT) { const [gx, gd] = slideX(t, tT + .15, .7, 1130, GX, HT.fy), [px, pd] = slideX(t, tT + .1, .5, 1485, PX, HT.fy);
    return hotelView(t, { mode: "pm", clock: 14.6, ticks: T5, items: gd + pd + gPlant({ droop: 0, wet: 1 }) + gJar(dishIn({ s: .6, y: -6, bites: 2, id: "ckn" }), { lid: "holes" }) + gBox("", {}) + gCov(gx) + gCov(px, { tag: true, peek: 1 }) }, CAMC)
      + TF(960, 190, lerp(2, 1, eo((t - tT) / .16)), `<g transform="rotate(-3)"><g filter="url(#drop)"><rect x="-200" y="-64" width="400" height="128" rx="40" fill="url(#gSun)"/></g>${T(0, 30, "TODAY", 88, P.ink, { ls: 8 })}</g>`)
      + buddy("pip", 200, 1062, 290, t, { aura: true, poses: [[s.t0, "sit"], [tT, "pointing"]], jump: [[tT + .15, 22]] }) + dayCounter(t, 31) + HUD(t); }
  const tB = W(L, "two", 1) - .15, tS = [W(L, "same") - .12, W(L, "same", 1) - .12, W(L, "same", 2) - .12], tWn = W(L, "one") - .15, tCp = W(L, "one", 1) - .15, tDk = W(L, "dark") - .05, tCl = WE(L, "cupboard") + .05;
  const op = t < tCp ? 0 : t < tCl ? .92 * ss(tCp, tCp + .35, t) : .92 * (1 - ss(tCl, tCl + .45, t)), drops = (x) => t < tS[2] ? "" : [0, 1, 2].map((i) => { const uu = ((t * 1.2 + i / 3) % 1); return `<path d="M0 -16 C9 -4 11 2 11 7 a11 11 0 0 1 -22 0 C-11 2 -9 -4 0 -16z" fill="#6FC3FF" stroke="#1F5FD0" stroke-width="3" transform="translate(${x - 30 + i * 30} ${n2(210 + 110 * uu)}) scale(1.3)" opacity="${n2(Math.sin(Math.PI * uu) * ramp(t, tS[2], .3))}"/>`; }).join("");
  const lab = (i, txt, y, yA) => t < tS[i] ? "" : OP(ramp(t, tS[i], .2), `<path d="M620 ${y} L${i ? 362 : 382} ${yA} M620 ${y} L${i ? 878 : 858} ${yA}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="${i ? 362 : 382}" cy="${yA}" r="7" fill="${P.ink}"/><circle cx="${i ? 878 : 858}" cy="${yA}" r="7" fill="${P.ink}"/>`) + TF(620, y, spring(t, tS[i], .4), tpill(0, 0, txt, 38, P.ink, "#fff", { w: 700 }));
  // the page: 1240 x 720, two young bean plants of the same size; A by the window, B into the cupboard
  const bp = () => beanPot({ k: .5 });
  const win = t < tWn ? "" : OP(ramp(t, tWn, .3), `<rect x="96" y="150" width="408" height="470" rx="12" fill="#BFE6FF" stroke="#F7F1FF" stroke-width="14"/><path d="M300 150 V620 M96 330 H504" stroke="#F7F1FF" stroke-width="10"/><g transform="translate(430 220)">${sunIcon(26)}</g><path d="M410 250 L150 650 H470z" fill="#FFE27A" opacity=".35"/>`);
  const cap = (t0, x, txt, fill, ink) => t >= t0 ? TF(x, 690, spring(t, t0, .4), tpill(0, 0, txt, 32, fill, ink, { w: 700 })) : "";
  const cup = t < tCp ? "" : TF(940, 674, spring(t, tCp, .45) * 1.25, cupboard({ open: op, dark: t >= tCl ? .5 : .1, inner: TF(0, -20, 1.2, bp()) }));
  const page = `<g filter="url(#drop)"><rect x="0" y="0" width="1240" height="720" rx="30" fill="url(#gPaper)" stroke="${P.pip}" stroke-width="8"/></g>${Array.from({ length: 9 }, (_, i) => `<circle cx="${90 + i * 132}" cy="0" r="15" fill="${P.night}"/><rect x="${84 + i * 132}" y="-30" width="12" height="40" rx="6" fill="#AAB3CC"/>`).join("")}
    <g transform="translate(620 78)"><rect x="-250" y="-40" width="500" height="80" rx="40" fill="url(#gSun)"/>${T(0, 20, "TWO WEEKS AGO", 52, P.ink, { ls: 5 })}</g><path d="M620 140 V700" stroke="${P.ink2}" stroke-width="3" stroke-dasharray="4 10" opacity=".35"/>
    ${win}${t >= tCp ? "" : (t >= tB ? TF(940, 650, 1.5 * spring(t, tB + .12, .45), bp()) : "")}${t >= tB ? TF(300, 650, 1.5 * spring(t, tB, .45), bp()) : ""}${cup}${t < tCp ? drops(300) + drops(940) : drops(300)}
    ${t < tCp - .1 ? lab(0, "same pot", 596, 596) + lab(1, "same soil", 496, 486) + (t >= tS[2] ? TF(620, 250, spring(t, tS[2], .4), tpill(0, 0, "same water every day", 38, P.ink, "#fff", { w: 700 })) : "") : ""}${cap(tWn, 300, "by the window", "#fff", P.ink)}${cap(tDk, 940, "in a dark cupboard", P.ink, "#fff")}`;
  return bg("stage2") + TF(540, 200, 1, `<g transform="translate(620 360) scale(${n2(spring(t, s.t0 + .1, .5))}) rotate(-1) translate(-620 -360)">${page}</g>`)
    + buddy("pip", 250, 1062, 330, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT(L) - .12, "sit"]] }) + HUD(t); };
SC.r1 = (t, s) => { const L = "b502", tq = W(L, "so") - .25;
  if (t < tq) { const tWa = W(L, "water") - .1, tAi = W(L, "air") - .1, tCp = W(L, "cupboard") - .2;
    const chip = (t0, kind, x, col, fill) => t < t0 ? "" : TF(x, 300, spring(t, t0, .45), `<g filter="url(#dropS)"><circle r="70" fill="${P.paper}"/></g>` + TF(0, 0, 1.7, needIcon(kind, col, fill)) + TF(52, 46, 1, tickMark(28)));
    return hotelView(t, { mode: "pm", clock: 14.7, ticks: T5, items: ring(PX, HT.fy - 140, 120, 170, pulse(t, tCp + .2, .2, 2.5)) + items2(t, { r3: "covers" }) }, CAMC) + chip(tWa, "water", 1500, "#1F5FD0", "#BFE0FF") + chip(tAi, "air", 1680, "#4E93B4", "#EAF6FF")
      + (t >= tCp ? TF(camX(CAMC, PX), 190, spring(t, tCp, .4), tpill(0, 0, "the cupboard plant", 42, "#fff", P.ink, { w: 700 })) : "") + buddy("pip", 200, 1062, 290, t, { aura: true, pose: "pointing" }) + dayCounter(t, 31) + HUD(t); }
  return lock3(t, { s: { t0: tq }, q: "Which need was it missing?", tq, tc: [W(L, "one", 1), W(L, "two"), W(L, "three")], ring0: MK("ring0_1"), dur: 5, lock: "b503",
    obj: () => TF(430, 592, .88, covered({ peek: 1 })),
    picks: [{ who: "pip", id: "b506", word: "2 FOOD", kind: "orange" }, { who: "basil", id: "b504", word: "3 AIR", kind: "sky", x: true }, { who: "momo", id: "b505", word: "2 FOOD", kind: "orange", q: true }],
    props: { pip: [W("b506", "only") - .1, `<g filter="url(#dropS)"><rect x="-58" y="-70" width="116" height="140" rx="12" fill="${P.paper}" stroke="${P.pip}" stroke-width="5"/></g><g transform="translate(-24 -22) scale(.6)">${sunIcon(22)}</g><g transform="translate(26 -22)"><rect x="-17" y="-17" width="34" height="34" rx="6" fill="#3A2C4E"/></g><path d="M-36 22 H36 M-36 42 H20" stroke="${P.ink2}" stroke-width="5" stroke-linecap="round" opacity=".6"/>`] } }); };
SC.cloths = (t, s) => { const L = "b507", tr = MK("reveal"), u = (t - tr) / .6, lift = t < tr ? 0 : 520 * ei(u), sx = t < tr ? 0 : 110 * ei(u), tAns = W(L, "two") - .1, tFd = W(L, "food") - .1, tG = W(L, "green") - .15, tP = W(L, "pale") - .15;
  const cl = (x, dir, kind, o) => u >= 1.2 ? "" : TF(x + dir * sx, HT.fy - lift, .9, clothOnly() + (o.tag ? pipTag() : "")) + (t >= tr - .5 ? pawDown(x + dir * sx, HT.fy - lift - CT * .9 + 16 - 260 * (1 - ss(tr - .5, tr - .12, t)), kind, .7) : "");
  const card = t >= tAns ? TF(1262, HT.fy + 26, .5 * spring(t, tAns, .45), TF(0, -200, 1, needCard(1, { lit: pulse(t, tFd, .1, 2.2) * .9 + .25 }))) : "";
  return hotelView(t, { mode: "pm", clock: 14.8, ticks: T5, items: items2(t, { r3: "beans", bk: lerp(.56, BK, eo((t - tr) / .3)) }) + (t < tr + .1 ? TF(PX, HT.fy, .9, `<path d="M-64 -30 q-22 4 -34 -22" fill="none" stroke="#E9DE8A" stroke-width="7" stroke-linecap="round"/>`) : "") + cl(GX, -1, 1, {}) + cl(PX, 1, 0, { tag: true }) + card }, CAMC)
    + (t >= tG ? TF(camX(CAMC, GX) - 20, 180, spring(t, tG, .4), tpill(0, 0, "green and strong", 40, "#fff", P.ink, { w: 700 })) : "") + (t >= tP ? TF(camX(CAMC, PX) + 40, 180, spring(t, tP, .4), tpill(0, 0, "pale and weak", 40, "#fff", P.ink, { w: 700 })) : "")
    + buddy("pip", 180, 1062, 270, t, { aura: true, in: s.t0 + .05, poses: [[s.t0, "pointing"], [tr + .5, "cheer"], [tr + 2.3, "sit"]] }) + buddy("momo", 1740, 1062, 270, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tr + .5, "surprised"], [tAns, "thinking"]] })
    + dayCounter(t, 31) + HUD(t); };
SC.evidence = (t, s) => { const L = "b508", m = "b509", tAir = W(L, "air") - .15, tM = W(L, "and") - .25, tTwo = W(L, "two") - .1, tBut = W(L, "but") - .2, tN = W(L, "nobody") - .15;
  let out = bg("daystage");
  if (t < tBut) { let sw = ""; for (let i = 0; i < 4; i++) sw += airSwirl(t, 330, -360 + i * 86, -196, 10, i / 4, "#4E93B4", ramp(t, tAir, .3));
    out += TF(820, 1010, 1.5 * spring(t, s.t0 + .1, .5), cupboard({ open: 0 }) + `<path d="M140 -400 V-20" stroke="#170F2A" stroke-width="7"/>` + sw)
      + (t >= tAir ? TF(1330, 330, spring(t, tAir + .5, .4), tpill(0, 0, "air still gets in", 48, "#fff", P.ink, { w: 700 })) + OP(ramp(t, tAir + .5, .2), `<path d="M1200 370 L1040 520" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="1040" cy="520" r="8" fill="#fff"/>`) : "")
      + buddy("basil", 1560, 1062, 330, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "arms_crossed"], [tAir + .6, "surprised"], [tM, "sit"]] })
      + (t >= tM ? buddy("momo", 250, 1062, 300, t, { aura: true, in: tM, poses: [[tM, "pointing"], [tTwo + .9, "sit"]] }) + (t >= tTwo ? TF(250, 640, spring(t, tTwo, .45), needChip(1, 56) + TF(150, -30, 1, tickMark(30))) : "") : ""); }
  else { const k = (i) => spring(t, tBut + .1 + i * .18, .5), cx = [760, 1330], lab = t >= tN;
    out += [0, 1].map((i) => TF(cx[i], 1010, 1.25 * k(i), picCard(TF(0, -240, .84, potTop(i === 1)), i ? "the cupboard plant" : "the window plant", { id: "pt" + i, rot: i ? 1.5 : -1.5, size: 38, w: 440, sky: ["#F4E9FF", "#FFF3DC"] }))).join("")
      + (lab ? OP(ramp(t, tN, .2), `<path d="M1045 300 L${cx[0] + 20} 600 M1045 300 L${cx[1] - 20} 600" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="${cx[0] + 20}" cy="600" r="9" fill="${P.ink}"/><circle cx="${cx[1] - 20}" cy="600" r="9" fill="${P.ink}"/>`) + TF(1045, 300, spring(t, tN, .4), tpill(0, 0, "nobody put food here", 50, P.ink, "#fff", { w: 700 })) : "")
      + buddy("momo", 230, 1062, 320, t, { aura: true, poses: [[s.t0, "sit"], [tBut, "thinking"], [tN + .5, "surprised"], [LT(m) - .12, "sit"], [LE(m) + .1, "thinking"]] }) + say(m, 330, 440, t, { size: 46, maxW: 520, tail: -40 }); }
  return out + HUD(t); };
// light reaches the green plant's leaves ("making food"); the cupboard picture stays dark beside it
const CAML = [2.3, 1885, 801];
const lightView = (t, k, o = {}) => hotelView(t, { mode: "pm", clock: 15, ticks: T5, items: items2(t, { r3: "beans" }) + beam(GX, HT.fy - 240, k) + (k > .3 ? leafSparkles(t, GX, HT.fy - 240, 80, 80, 8, 3) : "") }, o.cam || CAML)
  + TF(1330, 1010, 1.2 * (o.card === undefined ? 1 : o.card), picCard(`<rect x="-240" y="-470" width="480" height="420" fill="#2A1F3A"/>` + TF(0, -72, .9, cupboard({ open: .86, dark: .55, inner: TF(20, -30, .78, beanPot({ k: BK, pale: 1 })) })), "", { id: "pcd", rot: 1.5, w: 400, h: 470 }))
  + (k > .5 ? label(420, 240, "making food", camX(o.cam || CAML, GX) - 60, camY(o.cam || CAML, HT.fy - 250), 46) : "");
SC.light = (t, s) => lightView(t, ss(s.t0 + .3, s.t0 + 1.3, t), { card: spring(t, s.t0 + .1, .5) }) + dayCounter(t, 31) + HUD(t);
SC.mark2 = (t, s) => markScene(t, s, { id: "b511", sayId: "b510", who: "pip", n: "2 of 3", text: "Plants do not eat but they can make their own food when there is light.", keys: ["do", "not", "eat", "make", "their", "own", "food", "light."], size: 70, y: 200, poses: [[LE("b511") + .2, "cheer"]] });
SC.dark = (t, s) => { const k = spring(t, s.t0 + .1, .5);
  return bg("daystage") + TF(640, 1000, 1.45 * k, cupboard({ open: .86, dark: .6, inner: TF(20, -30, .78, beanPot({ k: BK, pale: 1 })) + `<g transform="translate(78 -330)" opacity=".9">${sunIcon(24)}<path d="M-44 44 L44 -44" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/></g>` }))
    + TF(1300, 1000, 1.5 * spring(t, s.t0 + .3, .5), beanPot({ k: BK, pale: 1, sway: 2 * Math.sin(t * 1.2) })) + HUD(t); };
SC.r1score = (t, s) => { const a = "b513", b = "b514", tc = WE(a, "fingers") + .2, tb = tc + .7, tGo = LT(b) - .1, cam = [1.7, 2251, 741];
  const [px, pd] = slideX(t, tGo, .8, PX, HT.rx[2], HT.fy), bm = ss(tGo + .8, tGo + 1.5, t);
  return hotelView(t, { mode: "pm", clock: 15.2, board: 0, items: pd + gPlant({ droop: 0, wet: 1 }) + gJar(dishIn({ s: .6, y: -6, bites: 2, id: "cku" }), { lid: "holes" }) + gBox("", {}) + gBn(GX) + beam(HT.rx[2], HT.fy - 230, bm * .8, 150) + gBn(px, { pale: 1 }) + (t >= tGo && t < tGo + .9 ? pawUp(px + 70, HT.fy + 60, 1, .7) : "") }, cam)
    + TF(1640, 1046, .82, boardEasel(t, TK, { sun: "3f", blink: t >= tk3[0] - .3 && t < tk3[2] ? "3f" : null })) + (t >= tk3[1] + .3 ? TF(1640, 530, spring(t, tk3[1] + .3, .4), tpill(0, 0, "making its own", 38, P.sun, P.ink, { w: 700 })) : "")
    + coin(t, tc, 520, 300, "+1", "if you showed two fingers") + coin(t, tb, 900, 300, "0", "needs two good reasons")
    + buddy("pip", 210, 1062, 300, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tGo, "pointing"], [LT(b) - .05, "sit"], [LE(b) + .1, "cheer"]], nohop: true }) + say(b, 480, 620, t, { size: 46, maxW: 560, tail: -160 })
    + dayCounter(t, 31) + HUD(t); };
SCORE.push([WE("b513", "fingers") + .2, 1, 0]);

/* ============ 6 · Showdown: spot the mistake in Momo's homework ============ */
// Momo's homework sheet on its easel; 960 x 640; origin = the middle of the easel's feet. o: lit, badge, x, fixing: {rub, write}, pic, tick
const HW = ["A bean plant is a living thing.", "It needs water and air.", "It does not need food because it does not eat."], HWFIX = "It needs food too.";
function homework(t, o = {}) { const lit = o.lit || [0, 0, 0], bd = o.badge || [0, 0, 0], fx = o.fixing; let s = "";
  HW.forEach((txt, i) => { const y = -590 + i * 138, ls = wrap(txt, 40, 660, 600);
    s += `<g transform="translate(0 ${y})">${lit[i] > .05 ? `<rect x="-440" y="-62" width="880" height="124" rx="24" fill="${P.sun}" opacity="${n2(.55 * lit[i])}"/>` : ""}<g transform="translate(-378 0) scale(${n2(1 + .18 * bd[i])})"><circle r="38" fill="${P.momo}"/>${T(0, 17, i + 1, 50, "#fff")}</g>`
      + (i === 2 && fx ? `<g opacity="${n2(1 - fx.rub)}">${ls.map((l, j) => `<text x="-312" y="${n2(14 + (j - (ls.length - 1) / 2) * 46)}" font-family="Fredoka" font-weight="600" font-size="40" fill="${P.ink}">${esc(l)}</text>`).join("")}</g><text x="-312" y="14" font-family="Fredoka" font-weight="600" font-size="44" fill="#1F8A4C" style="clip-path:inset(-30px ${n2(100 - 100 * fx.write)}% -30px 0)">${esc(HWFIX)}</text>`
        : ls.map((l, j) => `<text x="-312" y="${n2(14 + (j - (ls.length - 1) / 2) * 46)}" font-family="Fredoka" font-weight="600" font-size="40" fill="${P.ink}">${esc(l)}</text>`).join(""))
      + (i === 2 && o.x && !fx ? TF(-452, 0, o.x, `<circle r="26" fill="${P.paper}" stroke="${P.ink}" stroke-width="3"/><path d="M-11 -11 L11 11 M11 -11 L-11 11" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`) : "") + `</g><path d="M-430 ${y + 70} H430" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".4"/>`; });
  const paw = `<g transform="translate(396 -742) rotate(14) scale(.95)" opacity=".85"><circle r="38" fill="none" stroke="${P.momo}" stroke-width="4" stroke-dasharray="5 5"/><g fill="${P.momo}"><ellipse cx="0" cy="9" rx="15" ry="12"/><circle cx="-17" cy="-7" r="6.5"/><circle cx="-6" cy="-17" r="6.5"/><circle cx="7" cy="-17" r="6.5"/><circle cx="18" cy="-7" r="6.5"/></g></g>`;
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-90 -400 M200 0 L90 -400 M0 0 V-300" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-330" y="-176" width="660" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-480" y="-810" width="960" height="640" rx="26" fill="url(#gPaper)" stroke="${P.momo}" stroke-width="8"/></g><g transform="translate(-380 -764) rotate(-5)">${T(0, 0, "last night", 34, P.momo, { w: 600 })}</g>${T(0, -700, "What does a bean plant need?", 54, P.ink)}${paw}${s}
  ${o.pic ? TF(300, -296, .86 * o.pic, foodPic(t)) : ""}${o.tick ? TF(96, -330, o.tick, tickMark(34)) : ""}`; }
const NT = [1000, 1058, 1.14];
const showView = (t, o = {}) => bg("stage2") + (o.side || "") + TF(NT[0], NT[1], NT[2], homework(t, o.notes || {}));
SC.show = (t, s) => { const a = "b601", rd = ["b602a", "b602b", "b602c"], c = "b603", r0 = MK("ring0_2"), bell = MK("bell_2"), rs = ringState(t, r0, 6);
  const tcn = [W(c, "one", 1), W(c, "two"), W(c, "three")], tP = LT("b605"), tB = LT("b606"), tO = LT("b607");
  const lit = [0, 1, 2].map((i) => t >= LT(rd[i]) - .1 && t < (rd[i + 1] ? LT(rd[i + 1]) - .1 : LE(rd[2]) + .3) ? 1 : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 235, RY = 600;
  return showView(t, { notes: { lit, badge, x: spring(t, tP + .5, .4) } })
    + buddy("momo", 1745, 1062, 250, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT(a) - .12, "sit"], [LE(rd[2]) + .2, "thinking"], [tO - .12, "oops"], [LE("b607") + .1, "sit"]], nohop: true }) + say(a, 1500, 640, t, { size: 44, tail: 160, maxW: 480 }) + say("b607", 1520, 600, t, { size: 50, tail: 150, maxW: 480 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("pip", 140, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tP - .12, "sit"], [LE("b605") + .1, "pointing"]] }) + pickCard("pip", 262, 850, t, tP - .1, "LINE 3", "purple")
      + buddy("basil", 395, 1062, 200, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "arms_crossed"], [tB - .12, "sit"], [LE("b606") + .1, "cheer"]], nohop: true }) + pickCard("basil", 520, 850, t, tB - .1, "LINE 3", "purple") + pickCard("momo", 1590, 850, t, tO + .5, "LINE 3", "purple") : "")
    + say("b605", 232, 430, t, { size: 40, maxW: 360, tail: -40, tdx: -30 }) + say("b606", 232, 620, t, { size: 40, maxW: 370, tail: 150 })
    + stamp(t, LT("b604") - .08, 1000, 470) + bellIcon(t, r0) + HUD(t); };
SC.fixed = (t, s) => { const b = "b608", h = "b609", tc = W(h, "two", 1) - .1, rub = ss(s.t0 + .15, s.t0 + .6, t), wr = ss(s.t0 + .65, LT(b) + .9, t), tPic = W(b, "makes") - .1, t2 = W(h, "two") - .15;
  return showView(t, { notes: { fixing: { rub, write: wr }, lit: [0, pulse(t, t2 + .1, .1, 2.2), 0], pic: t >= tPic ? spring(t, tPic, .45) : 0, tick: spring(t, LE(b) - .2, .45) } })
    + (t < s.t0 + .7 ? TF(lerp(760, 1180, ss(s.t0 + .1, s.t0 + .6, t)) + 20 * Math.sin(t * 40), 790, .5, `<g transform="rotate(-20)"><rect x="-70" y="-40" width="140" height="80" rx="16" fill="#FF9CA8" stroke="#C4476A" stroke-width="6"/><rect x="-70" y="-40" width="50" height="80" rx="12" fill="#6FB8FF" stroke="#2C6FE8" stroke-width="6"/></g>`) + pawUp(lerp(760, 1180, ss(s.t0 + .1, s.t0 + .6, t)) + 20 * Math.sin(t * 40), 812, 0, .6) : "")
    + (t >= s.t0 + .65 && wr < 1 ? TF(lerp(690, 1070, wr), 800, .46, pencil()) + pawUp(lerp(690, 1070, wr) - 46, 836, 0, .6) : "")
    + buddy("momo", 1745, 1062, 250, t, { aura: true, flip: true, poses: [[s.t0, "sit"], [LE(b) + .1, "cheer"], [LE(b) + 2, "sit"]], nohop: true }) + say(b, 1490, 560, t, { size: 44, tail: 170, maxW: 500 })
    + buddy("pip", 140, 1062, 200, t, { aura: true, tag: false, poses: [[s.t0, "sit"], [LE(b), "cheer"]] }) + buddy("basil", 395, 1062, 200, t, { aura: true, tag: false, poses: [[s.t0, "sit"], [LE(b), "cheer"]], nohop: true })
    + coin(t, tc, 250, 520, "+2", "if you showed three fingers") + coin(t, tc + .6, 250, 740, "+2", "the Buddies") + HUD(t); };
SCORE.push([W("b609", "two", 1) - .1, 3, 0], [W("b609", "two", 1) + .5, 3, 2]);

/* ============ 7 · sunset: the last box ============ */
const LIZ2 = [HT.clock[0] + 80, HT.clock[1] - 66];
const sunsetView = (t, o = {}) => hotelView(t, { mode: o.mode || "sunset", mode2: o.mode2, mix: o.mix, clock: 19, board: 0, wall0: o.liz === undefined ? "" : TF(LIZ2[0] - 56 * (1 - o.liz), LIZ2[1] + 46 * (1 - o.liz), .85, `<g transform="rotate(34)">${cicak()}</g>`),
  items: (o.back || "") + items2(t, { r3: "final", sway: o.sway || 0 }) + (o.noBoard ? "" : fwdBoard(t, o.bopt || {})) + (o.more || "") }, o.cam || [1, 960, 540]);
SC.sunset = (t, s) => { const L = "b701", tE = W(L, "eight") - .1, tO = W(L, "one") - .1, tR = W(L, "room") - .15, tF = W(L, "food") - .1, lz0 = s.t0 + .9, lz = t < lz0 ? 0 : t < lz0 + 3.0 ? eo((t - lz0) / .45) : 1 - ei((t - lz0 - 3.0) / .4);
  return sunsetView(t, { mode: "pm", mode2: "sunset", mix: ss(s.t0 - .2, s.t0 + .9, t), liz: lz, bopt: { blink: t >= tO ? "1f" : null, flash: [0, pulse(t, tF, .05, .8), 0] } })
    + trio(t, { pip: { poses: [[tO, "surprised"]] }, basil: { poses: [[tO + .1, "surprised"]] }, momo: { poses: [[tO + .2, "surprised"], [tF + .9, "thinking"]] } })
    + (t >= tE ? OP(1 - ramp(t, tO - .15, .2), TF(1250, 300, spring(t, tE, .4), tpill(0, 0, "Eight ticks.", 50, P.ink, "#fff", { w: 700 }))) : "") + (t >= tO ? OP(1 - ramp(t, tR - .15, .2), TF(1250, 300, spring(t, tO, .4), tpill(0, 0, "One box is empty.", 50, P.sun, P.ink, { w: 700 }))) : "")
    + (t >= tR ? TF(1250, 300, spring(t, tR, .4), tpill(0, 0, "Room 1: FOOD?", 54, "#fff", P.ink, { w: 700 })) : "")
    + lowerPill(60, 300, "Sunset") + dayCounter(t, 31) + HUD(t); };
SC.lastbox = (t, s) => { const m = "b702", h = "b703", tW = LT(h) - .5, e = eio((t - tW) / 1.0), cam = [lerp(1.9, 1, e), lerp(636, 960, e), lerp(726, 540, e)], tMk = W(m, "made") - .2;
  const tg = [W(h, "plant") - .15, W(h, "mealworm") - .15, W(h, "bean") - .15], tD = W(h, "three") - .1, tS = W(h, "same") - .25, g = (i) => pulse(t, tg[i] + .15, .15, 1.2);
  const spk = OP(1 - e * .4, beam(HT.rx[0], HT.fy - 210, .8, 170) + leafSparkles(t, HT.rx[0], HT.fy - 210, 110, 100, 9, 6));
  const back = ring(HT.rx[0], HT.fy - 150, 150, 190, g(0)) + ring(HT.rx[1], HT.fy - 120, 135, 160, g(1)) + ring(HT.rx[2], HT.fy - 150, 130, 190, g(2));
  return sunsetView(t, { cam, noBoard: true, back, more: spk, sway: 1.2 * Math.sin(t * 1.3) })
    + TF(lerp(1560, FB[0], e), lerp(1040, FB[1], e), lerp(.95, FB[2], e), boardEasel(t, TK, { blink: t < tk1f ? "1f" : null, flash: t >= tS ? [pulse(t, tS + .3, .05, .5), pulse(t, tS + .5, .05, .5), pulse(t, tS + .7, .05, .5)] : null }))
    + (t < tW + .2 ? OP(1 - ramp(t, tW - .2, .3), (t >= tMk ? label(560, 250, "making food", camX(cam, HT.rx[0]) - 40, camY(cam, HT.fy - 250), 46) : "") + buddy("momo", 230, 1062, 320, t, { aura: true, in: s.t0 + .05, poses: [[s.t0, "pointing"], [LT(m) - .12, "sit"], [LE(m) + .05, "cheer"]], nohop: true }) + say(m, 470, 560, t, { size: 46, maxW: 560, tail: -150 })) : "")
    + (t >= tW + .5 ? trio(t, { pip: { in: tW + .5, poses: [[tW + .5, "cheer"], [tD, "sit"], [tS + .8, "cheer"]] }, basil: { in: tW + .58, poses: [[tW + .58, "cheer"], [tD, "sit"], [tS + .8, "cheer"]], nohop: true }, momo: { in: tW + .66, poses: [[tW + .66, "cheer"], [tD, "sit"], [tS + .8, "cheer"]] } }) : "")
    + (t >= tD ? OP(1 - ramp(t, tS - .1, .2), TF(1000, 300, spring(t, tD, .4), tpill(0, 0, "Three different guests.", 56, "#fff", P.ink, { w: 700 }))) : "") + (t >= tS ? TF(1000, 300, spring(t, tS, .4), tpill(0, 0, "The same three needs.", 56, P.sun, P.ink, { w: 700 })) : "")
    + dayCounter(t, 31) + HUD(t); };
SC.mark3 = (t, s) => { const id = "b705", tw_ = [W(id, "water") - .05, W(id, "food") - .05, W(id, "air") - .05], t6 = LT("b706");
  return markScene(t, s, { id, sayId: "b704", who: "momo", n: "3 of 3", text: "Living things need water, food and air.", keys: ["water,", "food", "air."], size: 80, y: 190, poses: [[LE(id) + .2, "cheer"], [t6, "sit"]],
    extra: [0, 1, 2].map((i) => t < tw_[i] ? "" : TF(880 + i * 290, 740, spring(t, tw_[i], .45) * (1 + .12 * pulse(t, tw_[i], .04, .5)), needChip(i, 60, { num: false }))).join("")
      + (t >= t6 - .05 ? TF(1150, 900, spring(t, t6 - .05, .45), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-430" y="-62" width="860" height="124" rx="62" fill="${P.ink}"/></g>${T(0, 22, `Say all three. <tspan fill="${P.sun}">Every time.</tspan>`, 64, "#fff")}</g>`) : "") }); };

/* ============ 8 · the chant ============ */
SC.chant = (t, s) => chantScene(t, s, "c1003", { ticks: TK });

/* ============ 9 · the score hand, the lizard ============ */
SC.final = (t, s) => { const L = "b901"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "more") - .1, "More than two? You beat the Buddies!", 3], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "b902"; return lizReveal(t, s, L, sunsetView(SCN.sunset.t0 + 2.5, { liz: 1, bopt: { blink: "1f" } }) + `<rect width="1920" height="1080" fill="#FF8A4A" opacity=".1" style="mix-blend-mode:multiply"/>`, LIZ2[0] + 44, LIZ2[1] + 12, W(L, "what") - .1, "What does a lizard need?"); };

/* ============ 10 · check-out, and the dare for Episode 3 ============ */
SC.day32 = (t, s) => { const L = "b1001", tf = s.t0 + .3, t0 = s.t0 + 1.1, J = [HT.rx[1], HT.fy], TB = [HT.box, HT.fy + 6], cam = [2.0, 1160, 800];
  const a = eio((t - t0 - .3) / .5), b = eio((t - t0 - .8) / .7), c = eio((t - t0 - 1.5) / .5), dx = lerp(J[0], TB[0], b), dy = HT.fy - 12 - 250 * a * (1 - c) - 10 * c, inTub = t >= t0 + 2.0, lidUp = ss(t0, t0 + .4, t) * (1 - ss(t0 + 2.1, t0 + 2.6, t));
  const tl0 = t0 + 2.2, tl = eio((t - tl0 - .3) / .5), lidOn = t >= tl0 + .8, carried = !inTub ? TF(dx, t < t0 + .3 ? HT.fy - 12 : dy, .9 * .6, wormDish({ bites: 2, id: "cmo" })) : "";
  const lidFlat = `<ellipse cx="0" cy="4" rx="150" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="-152" y="-26" width="304" height="30" rx="12" fill="#5FB0FF" stroke="#2C6FE8" stroke-width="4"/><rect x="-142" y="-22" width="284" height="8" rx="4" fill="#fff" opacity=".35"/>${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${-90 + i * 36}" cy="-12" rx="8" ry="4.5" fill="${P.night}" opacity=".8"/>`).join("")}`;
  const lx = TB[0] + 10, ly0 = HT.fy + 34, ly1 = TB[1] - 120 * .8 + 4, lidY = lerp(ly0, ly1, tl);
  const hands = (t > t0 && t < t0 + 2.3 ? TF(dx + 4, (t < t0 + .3 ? HT.fy - 12 - 300 * (1 - ss(t0, t0 + .3, t)) : dy) - 30 - 500 * ss(t0 + 2.0, t0 + 2.3, t), .6, adultArm()) : "") + (lidUp > .02 ? TF(J[0] - 150, HT.fy - 232 - 170 * lidUp - 16, .6, adultArm("#5B7BD6", "#3A56A8")) : "")
    + (t > tl0 && t < tl0 + 1.2 ? TF(lx, lidY - 22 - 300 * (1 - ss(tl0, tl0 + .3, t)) - 420 * ss(tl0 + .85, tl0 + 1.2, t), .6, adultArm()) : "");
  return hotelView(t, { clock: 9, ticks: TK, items: gBn(WBX) + gPlant({ droop: 0, wet: 1 }) + gJar(inTub ? "" : (t < t0 + .3 ? dishIn({ s: .6, y: -6, bites: 2, id: "cmp" }) : ""), { lid: "holes", lidY: -170 * lidUp, lidX: -150 * lidUp })
      + TF(TB[0], TB[1], .8, tub(inTub ? dishIn({ s: .62, y: -14, bites: 2, id: "cmq" }) : "", { lid: lidOn ? 1 : 0 })) + gBn(HT.rx[2], { pale: 1 }) + (lidOn ? "" : TF(lx, lidY, .8, lidFlat)) + (inTub ? "" : carried) + hands + dust(lx, ly1 + 10, (t - tl0 - .8) / .3, .5) }, cam)
    + finePrint(t, t0 + .2, "An adult helps. Wash your hands.", 520, 1040) + lowerPill(60, 300, "Check-out time") + dayCounter(t, t >= tf ? 32 : 31, tf) + HUD(t); };
const CAMG = [1.05, 1150, 760];
SC.dare = (t, s) => { const b = "b1002", h = "b1003", tT = s.t0 + .75, tip = leafTip(0, 0), px = camX(CAMG, MXY[0] + tip[0]), py = camY(CAMG, MXY[1] + tip[1]), dn = eo((t - tT + .35) / .3), up = ss(tT + .15, tT + .5, t), tN = W(h, "touch") - .15, tLk = W(h, "lock") - .1;
  const f0 = [ss(tT + .02, tT + .6, t), ss(tT + .45, tT + .85, t)], k = t < tT - .35 ? 0 : 1 - up;
  return gardenView(t, { f: { 0: f0 } }, [CAMG[0] + .03 * clamp((t - s.t0) / 10), CAMG[1], CAMG[2]])
    + (k > .02 ? TF(px + 6, py - 8 - 60 * (1 - dn) - 50 * up, .62 * Math.min(1, k * 3), `<g transform="rotate(24)">${pointer()}</g>`) : "") + OP(pulse(t, tT, .02, .5), `<circle cx="${n2(px)}" cy="${n2(py)}" r="34" fill="none" stroke="${P.sun}" stroke-width="6"/>`)
    + buddy("basil", 650, 1000, 200, t, { aura: true, in: s.t0 + .05, poses: [[s.t0, "sit"], [tT + .12, "surprised"], [LT(b) - .12, "sit"], [LE(b) + .1, "surprised"]], jump: [[tT + .12, 40]] }) + say(b, 640, 640, t, { size: 46, maxW: 560, tail: 0 })
    + (t >= tN ? TF(960, 250, lerp(1.6, 1, eo((t - tN) / .16)) + .04 * wob(t, tN + .16, .4), `<g filter="url(#drop)"><rect x="-620" y="-120" width="1240" height="240" rx="50" fill="${P.ink}"/></g>${T(0, -30, "NEXT", 54, P.sun, { ls: 12 })}${T(0, 62, "Touch this plant and it folds up!", 68, "#fff")}`) : "")
    + (t >= tLk ? TF(960, 440, spring(t, tLk, .45), tpill(0, 0, "Lock in your answer for next time!", 42, P.sun, P.ink, { w: 700 })) : "")
    + OP(1 - ramp(t, tN - .3, .3), lowerPill(60, 300, "Community garden,", "Toa Payoh")) + HUD(t); };

/* ============ 12 · "Now you know!" ============ */
SC.nyk = (t, s) => nykScene(t, s, miniHotel([TF(0, -50, .8, potPlant({ droop: 0, wet: 1 })), TF(0, 0, .8, jar("", { lid: "holes" })), TF(0, 0, .86, beanPot({ k: BK, pale: 1 }))]) + TF(1082, 1040, .27, boardEasel(t, TK, {})));
// the thumbnail frame: the cloth reveal, the two bean plants side by side, Pip on the far left with the spotted cloth, the window on the right
const THUMB2 = (t) => hotelView(t, { mode: "am", clock: 14.8, board: 0, rooms: [0, 0, 0], sign: 0, items: TF(730, 990, 1.6, beanPot({ k: .95 })) + TF(1050, 990, 1.6, beanPot({ k: .95, pale: 1 })) }) + TF(520, 800, 1.05, `<g transform="rotate(-16 0 -150)">${clothOnly()}</g>`)
  + buddy("pip", 260, 800, 330, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
})(); }
