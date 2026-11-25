// lc26.js: EP26's look-closer panels, journeys and small pictures. Look-closer art is centred on (0, 0) inside +-830 x +-395.
// A "your turn" ring (TRY): a 6 s ring with YOUR TURN!, soft ticks (sound_cues.js), the YOU hand; nothing is revealed until it ends
const TRYD = 4.5;   // the YOUR TURN ring's length (script.py TRY)
const tryRing26 = (t, t0, x, y, k = 1) => { if (t < t0 - .2 || t > t0 + TRYD + .4) return ""; const u = clamp((t - t0) / TRYD), a = ramp(t, t0 - .2, .3) * (1 - ramp(t, t0 + TRYD, .3));
  return OP(a, TF(x, y, k, `<circle r="92" fill="#FFF8EA" stroke="${P.ink}" stroke-width="6"/><circle r="80" fill="none" stroke="#E8DCC8" stroke-width="16"/><path d="M0 -80 A80 80 0 ${u > .5 ? 0 : 1} 1 ${n2(80 * Math.sin(2 * Math.PI * (1 - u)) * -1 * -1)} ${n2(-80 * Math.cos(2 * Math.PI * (1 - u)))}" stroke="${P.sun}" stroke-width="16" fill="none" stroke-linecap="round"/>`
    + T(0, 22, String(Math.max(0, Math.ceil(TRYD - (t - t0)))), 64, P.ink) + TF(0, 136, 1, tpill(0, 0, "YOUR TURN!", 34, P.sun, P.ink, { w: 700 })))); };
const qText26 = (id) => { const L = TL.lines[id]; return L ? L.text.replace(/^(Here is the question\.|Question one\.|Question two\.|Look closer\.)\s*/, "") : ""; };
/* Part 1 look-closer 1 · BASIL'S ANSWER UNDER THE LAMP: the question card at the top (its words about X moving away glow blue at `eway`),
   Basil's answer card "X, because it moved." with 1/3 in red; the four CECL tiles: Choice lights (cred), Evidence lights as the question's
   own words are found (eblue), Concept and Link stay empty (crossed) */
function lcBasilArt(t) { const m = MK, tC = m("cred"), tE = m("eblue"), tW = m("eway");
  let A = lcBG23("#0E1A2E") + `<rect x="-930" y="-460" width="1860" height="920" fill="${GNAVY}"/>`;
  const q = wrap26(qText26("m401"), 70); A += TF(0, -360, 1, textCard26(t, q.map((s, i) => [s, (t >= tW && i >= 1 && i <= 2) ? 1 : -1]), { w: 1500, size: 30, lh: 44, fill: "#FFFDF6" }));
  A += TF(-380, 40, 1, textCard26(t, [["X, because it moved.", t >= tC ? 0 : -1]], { title: "Basil's answer", w: 700, size: 40 })) + TF(60, 100, spring(t, m("cred") - 3, .4), `<circle r="54" fill="#fff" stroke="#D84A3A" stroke-width="7"/>` + T(0, 16, "1/3", 40, "#D84A3A", { w: 700 }));
  A += TF(0, 290, .78, ceclTiles26(t, { lit: [tC, tE, undefined, undefined], on: [true, t >= tE, false, false], miss: t >= tE + 2 }));
  A += TF(400, 60, .7, genieLamp26(t, { rise: 1 }));
  return A; }
/* Part 1 look-closer 2 · MOMO'S ANSWER, BUILT: the full answer card fills line by line, each line underlined in its CECL colour as Heart reads
   it (b1..b4); the tiles light in turn; the picture of the two bars on strings beside it (X away, Y towards); at `ybonus` a small note on Y */
function lcBuildArt(t) { const m = MK, B = [m("b1"), m("b2"), m("b3"), m("b4")];
  let A = `<rect x="-930" y="-460" width="1860" height="920" fill="${GNAVY}"/>`;
  const lines = [["Bar X is a magnet.", 0, B[0]], ["When the North pole of the magnet was brought", 1, B[1]], ["near bar X, bar X moved away.", 1, B[1] + .8], ["Like poles repel. Only a magnet can be", 2, B[2]], ["repelled by another magnet.", 2, B[2] + .8], ["Thus, bar X was repelled, so bar X is a magnet.", 3, B[3]]];
  A += TF(-250, -330, 1, textCard26(t, lines, { title: "Momo's answer", w: 1100, size: 34, lh: 60 }));
  A += TF(-250, 250, .62, ceclTiles26(t, { lit: B, tick: true }));
  A += TF(560, 40, .7, barsPic26(t, { swing: 1, arrows: true }));
  if (t >= m("ybonus")) A += TF(560, 300, spring(t, m("ybonus"), .4), tpill(0, 0, "Y: attracted, so we cannot tell", 28, "#fff", P.ink, { w: 700 }));
  return A; }
/* Part 2 look-closer 1 · QUESTION ONE, PART BY PART (no Choice: "Explain"): the two set-ups A and B (EP24's set-ups); before each part a 6 s
   YOUR TURN ring (try1..try3), then the line appears in its colour (e1, c1, l1) */
function lcFairArt26(t) { const m = MK;
  let A = `<rect x="-930" y="-460" width="1860" height="920" fill="${GNAVY}"/>` + `<g filter="url(#dropS)"><rect x="-880" y="-400" width="560" height="560" rx="26" fill="#FFF8EA"/></g>`;
  A += trayClips22(t, -700, 60, .5, { n: 12 }) + setup24(t, { x: -700, y: 0, k: .55, kind: "iron", n: 10, batt: 1, hx: -220, hk: .6, tag: "A", tagS: 40 }) + trayClips22(t, -480, 60, .5, { n: 12 }) + setup24(t, { x: -480, y: 0, k: .55, kind: "steel", n: 20, batt: 2, hx: 260, hk: .45, tag: "B", tagS: 40 })
    + T(-600, 130, "iron · 10 turns · 1 battery", 22, P.ink, { w: 600 }) + T(-600, 156, "steel · 20 turns · 2 batteries", 22, P.ink, { w: 600 });
  A += TF(80, 150, .5, ceclTiles26(t, { lit: [undefined, m("e1"), m("c1"), m("l1")], on: [false, true, true, true] })) + TF(-600, 210, 1, tpill(0, 0, "Explain: no Choice", 28, "#e8493f", "#fff", { w: 700 }));
  const lines = [["Ali changed the type of nail, the number", 1, m("e1")], ["of turns of wire, and the number of batteries.", 1, m("e1") + .9], ["In a fair test, only one variable is changed.", 2, m("c1")], ["The other variables are kept the same.", 2, m("c1") + 1.2], ["Thus, Ali cannot be sure that the number of", 3, m("l1")], ["batteries made the electromagnet stronger.", 3, m("l1") + .9]];
  A += TF(310, -380, 1, textCard26(t, lines, { title: "Our answer", w: 1080, size: 31, lh: 58 }));
  [1, 2, 3].forEach((n) => { if (TL.marks["try" + n] !== undefined) A += tryRing26(t, m("try" + n), 640, 170, 1); });
  return A; }
/* Part 2 look-closer 2 · THE MOST COMMON MISTAKE: Pip's answer "Magnets attract steel." (a yellow Concept only); YOUR TURN (try4); then the
   Evidence (blue) and the Link (green) join it; the fridge picture (EP25: its strip all round the door's soft edge); "help with the Link" */
function lcFridgeArt26(t) { const m = MK;
  let A = `<rect x="-930" y="-460" width="1860" height="920" fill="${GNAVY}"/>` + `<g filter="url(#dropS)"><rect x="-880" y="-400" width="460" height="640" rx="26" fill="#FFF8EA"/></g>` + TF(-650, 200, .55, fridgeStrip25(t)) + TF(-650, -340, 1, tpill(0, 0, "Explain: no Choice", 26, "#e8493f", "#fff", { w: 700 }));
  const lines = [["Pip: Magnets attract steel.", 2, 0], ["There is a strip of magnet inside the edge of", 1, m("fe")], ["the door, and the body of the refrigerator", 1, m("fe") + .8], ["is made of steel.", 1, m("fe") + 1.6], ["Magnets attract objects made of iron and steel.", 2, m("fe") + 2.6], ["Thus, the magnetic strip is attracted to the steel", 3, m("fl")], ["body, and this keeps the door closed.", 3, m("fl") + .9]];
  A += TF(260, -390, 1, textCard26(t, lines, { title: "Explain why the door of a refrigerator stays closed.", w: 1160, size: 31, lh: 56 }));
  A += tryRing26(t, m("try4"), 260, 230, 1);
  if (t >= m("help")) A += TF(260, 330, spring(t, m("help"), .4), tpill(0, 0, "If you help with one thing, help with L.", 34, "#3fc35f", "#fff", { w: 700 }));
  return A; }

/* JOURNEY 1 · Be an answer, being built: you are an empty answer line in a quiz paper (ruled lines, a margin); four coloured pieces float
   down one by one and click into place (jred, jblue, jyellow, jgreen); the marker's red pen comes down and ticks (jpen, jtick); FULL MARKS */
function answerJourney(t, s) { const m = MK, T4 = [m("jred"), m("jblue"), m("jyellow"), m("jgreen")], tp = m("jpen");
  let o = `<rect width="1920" height="1080" fill="#FFFDF6"/>` + [...Array(9)].map((_, i) => `<path d="M0 ${200 + i * 100} H1920" stroke="#BFD8F2" stroke-width="4"/>`).join("") + `<path d="M220 0 V1080" stroke="#F2A0A0" stroke-width="5"/>`;
  const labs = ["Bar X is a magnet.", "X moved away.", "Like poles repel.", "Thus, X is a magnet."];
  T4.forEach((t0, i) => { if (t < t0 - 1) return; const u = eio(clamp((t - t0 + 1) / 1.0)), x = 300 + i * 400, y = lerp(-200, 560, u);
    o += TF(x + 170, y, 1, `<g filter="url(#dropS)"><rect x="-180" y="-60" width="360" height="120" rx="22" fill="${CECL[i][2]}"/></g>` + T(-130, 18, CECL[i][0], 56, "#fff") + T(30, 14, CECL[i][1], 26, "#fff", { w: 700 }) + T(0, 100, labs[i], 26, P.ink, { w: 600 })) + (u >= 1 && t < t0 + .4 ? OP(1 - (t - t0) / .4, `<circle cx="${x + 170}" cy="560" r="${n2(120 + 200 * (t - t0))}" fill="none" stroke="${CECL[i][2]}" stroke-width="8"/>`) : ""); });
  if (t >= tp - .8) { const u = eio(clamp((t - tp + .8) / .8)), ticks = Math.min(4, Math.floor(clamp((t - m("jtick")) / 1.4) * 4) + (t >= m("jtick") ? 1 : 0));
    for (let i = 0; i < ticks; i++) o += TF(470 + i * 400, 450, 1.2, `<path d="M-30 0 l18 22 l42 -50" stroke="#D84A3A" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
    o += TF(lerp(1900, 470 + Math.max(0, ticks - 1) * 400, u), lerp(-100, 380, u), 1, `<path d="M0 0 L40 -260 L80 -250 L40 10z" fill="#D84A3A" stroke="#8A1A1A" stroke-width="5"/><path d="M0 0 L20 30 L40 10z" fill="#3A2A1A"/>`); }
  if (t >= m("jfull")) o += TF(960, 860, spring(t, m("jfull"), .4), `<g transform="rotate(-4)"><rect x="-260" y="-60" width="520" height="120" rx="60" fill="#D84A3A"/>${T(0, 22, "FULL MARKS!", 62, "#fff")}</g>`);
  return o; }
/* JOURNEY 2 · Be the Link: you are a short green sentence; on the left the yellow science rule, on the right the question's words; you stretch
   out (jstretch) and join them (jthus: "Thus, ..."); click (jclick) */
function linkJourney(t, s) { const m = MK, st = eio(clamp((t - m("jstretch")) / 2.4)), clk = t >= m("jclick");
  let o = `<rect width="1920" height="1080" fill="${GNAVY}"/>` + [...Array(30)].map((_, i) => `<circle cx="${n2((i * 397) % 1920)}" cy="${n2((i * 211) % 1080)}" r="${2 + (i % 3)}" fill="${GCYAN}" opacity="${n2(.3 + .3 * Math.sin(t + i))}"/>`).join("");
  o += TF(300, 540, 1, `<g filter="url(#dropS)"><rect x="-240" y="-120" width="480" height="240" rx="28" fill="#ffb627"/></g>` + T(0, -40, "the science rule", 30, "#fff", { w: 700 }) + T(0, 20, "A cockroach has no pupa;", 26, "#3A2A10", { w: 600 }) + T(0, 56, "a butterfly does.", 26, "#3A2A10", { w: 600 }));
  o += TF(1620, 540, 1, `<g filter="url(#dropS)"><rect x="-240" y="-120" width="480" height="240" rx="28" fill="#FFFDF6"/></g>` + T(0, -40, "the question", 30, P.ink, { w: 700 }) + T(0, 20, "Do they have the", 26, P.ink, { w: 600 }) + T(0, 56, "same life cycle?", 26, P.ink, { w: 600 }));
  const x0 = 540, x1 = lerp(700, 1380, st); o += `<rect x="${x0}" y="500" width="${n2(x1 - x0)}" height="80" rx="40" fill="#3fc35f"/>` + (st > .3 ? OP(st, T((x0 + x1) / 2, 552, "Thus, they do not have the same life cycle.", n2(18 + 10 * st), "#fff", { w: 700 })) : "");
  if (clk) o += OP(1 - ramp(t, m("jclick") + .8, .4), `<circle cx="1380" cy="540" r="${n2(60 + 200 * clamp(t - m("jclick")))}" fill="none" stroke="#3fc35f" stroke-width="10"/>`) + TF(960, 820, spring(t, m("jclick"), .4), tpill(0, 0, "Click! The answer is whole.", 44, "#3fc35f", "#fff", { w: 700 }));
  return o; }

/* the small pictures */
const ringP1_26 = (t) => TF(430, 520, .55, barsPic26(t, { swing: 1 }));
// Part 1 Round 1's three cards: the three answers (Basil's, Pip's, Momo's), each with its parts' colour bars
const ansCard26 = (i, t) => { const A = [["X, because it moved.", [0]], ["Bar X. Like poles repel.", [0, 2]], ["Bar X is a magnet. X moved away. Like poles repel. Thus, X is a magnet.", [0, 1, 2, 3]]][i];
  return `<rect x="-200" y="-130" width="400" height="260" fill="#FFFDF6"/>` + wrap26(A[0], 22).map((s, j) => T(-180, -80 + j * 36, s, 24, P.ink, { a: "start", w: 600 })).join("") + A[1].map((c, j) => `<rect x="${-180 + j * 90}" y="80" width="80" height="34" rx="10" fill="${CECL[c][2]}"/>` + T(-140 + j * 90, 106, CECL[c][0], 26, "#fff")).join(""); };
const ringHold26 = (t) => TF(430, 470, 1, `<rect x="-260" y="-110" width="520" height="220" rx="20" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="4"/>` + T(-230, -40, "Concept:", 34, "#ffb627", { a: "start", w: 700 }) + T(-230, 20, "Bar X moves away", 32, P.ink, { a: "start", w: 600 }) + T(-230, 64, "from the magnet.", 32, P.ink, { a: "start", w: 600 }));
const ringP2_26 = (t) => TF(430, 470, 1, `<rect x="-260" y="-130" width="520" height="260" rx="20" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="4"/>` + T(-230, -70, "...Explain why Ali's", 34, P.ink, { a: "start", w: 600 }) + T(-230, -24, "experiment is not", 34, P.ink, { a: "start", w: 600 }) + T(-230, 22, "a fair test.", 34, P.ink, { a: "start", w: 600 }) + `<rect x="-240" y="60" width="200" height="50" rx="12" fill="#e8493f" opacity=".25"/>` + T(-140, 96, "Choice?", 30, "#e8493f", { w: 700 }));
const cardP2_26 = (i, t) => `<rect x="-200" y="-130" width="400" height="260" fill="#FFFDF6"/><rect x="-80" y="-80" width="160" height="160" rx="26" fill="${i ? "#9AA6B2" : "#e8493f"}"/>` + T(0, 34, "C", 100, "#fff") + (i ? `<path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke="#D84A3A" stroke-width="12"/>` : TF(80, -80, 1, tickBadge(26)));
const ringShow26 = (t) => [0, 1, 2, 3].map((i) => TF(250 + i * 120, 440, 1, `<rect x="-50" y="-50" width="100" height="100" rx="18" fill="${i === 3 ? "#9AA6B2" : CECL[i][2]}"/>` + T(0, 22, i === 3 ? "?" : CECL[i][0], 60, "#fff"))).join("");
// the Showdown card: Basil's answer to the life-cycle question, four numbered lines (line 4 empty), and the green rewrite in the fix
function basilCard26(t, x, y, k = 1, o = {}) { const L = [["No, I do not agree.", 0], ["A cockroach has three stages. A butterfly has four.", 1], ["An animal with three stages has no pupa stage.", 2], ["", 3]];
  let c = T(0, 50, "Basil's answer", 32, "#14B8A6", { w: 700 });
  L.forEach(([ln, ci], i) => { const ly = 90 + i * 110, lit = o.lit && o.lit[i] !== undefined && t >= o.lit[i] ? 1 - .6 * ss(o.lit[i] + 2.6, o.lit[i] + 3, t) : 0;
    if (lit > .01) c += `<rect x="-300" y="${ly - 6}" width="600" height="96" rx="14" fill="${P.sun}" opacity="${n2(.35 * lit)}"/>`;
    c += `<rect x="-290" y="${ly + 8}" width="64" height="64" rx="14" fill="${CECL[ci][2]}"/>` + T(-258, ly + 56, CECL[ci][0], 40, "#fff") + `<path d="M-210 ${ly + 86} H290" stroke="#D4DCE4" stroke-width="3"/>`;
    const ws = wrap26(ln, 34); ws.forEach((s, j) => { c += T(-200, ly + 34 + j * 34, s, 26, P.ink, { a: "start", w: 600 }); });
    if (i === 3) c += (o.rewrite !== undefined && t >= o.rewrite ? OP(ramp(t, o.rewrite, .3), T(-200, ly + 34, "Thus, the cockroach and the butterfly", 26, "#2FA35A", { a: "start", w: 700 }) + T(-200, ly + 68, "do not have the same life cycle.", 26, "#2FA35A", { a: "start", w: 700 })) : T(-200, ly + 50, "( nothing here )", 26, "#9AA6B2", { a: "start", w: 600 })); });
  return TF(x, y, k, `<path d="M-200 0 L-150 -620 M200 0 L150 -620 M0 0 L0 -560" stroke="#7A5230" stroke-width="12" stroke-linecap="round"/><g transform="translate(0 -650)"><g filter="url(#drop)"><rect x="-320" y="0" width="640" height="560" rx="14" fill="#FFFDF4" stroke="#C9B88A" stroke-width="5"/>${c}</g></g>`); }
// Part 2's recap pictures: the four tiles; Basil's 1/3; Momo's 3/3
const recapP2_26 = (i, t) => { if (i === 0) return `<rect x="-520" y="-300" width="1040" height="600" fill="${GNAVY}"/>` + TF(0, 0, .95, ceclTiles26(t, {}));
  if (i === 1) return TF(0, -80, 1, textCard26(t, [["X, because it moved.", 0]], { title: "Basil's answer", w: 700, size: 40 })) + TF(280, -120, 1.3, `<circle r="54" fill="#fff" stroke="#D84A3A" stroke-width="7"/>` + T(0, 16, "1/3", 40, "#D84A3A", { w: 700 }));
  return TF(0, -200, .8, textCard26(t, [["Bar X is a magnet.", 0], ["Bar X moved away.", 1], ["Like poles repel.", 2], ["Thus, bar X is a magnet.", 3]], { title: "Momo's answer", w: 800, size: 40 })) + TF(330, -150, 1.3, `<circle r="54" fill="#fff" stroke="#2FA35A" stroke-width="7"/>` + T(0, 16, "3/3", 40, "#2FA35A", { w: 700 })); };
// the question cards (Part 1 Q1 with the bars; Part 2 Q2 with the set-ups)
const qCard26 = (t, id, pic) => { const q = wrap26(qText26(id), 46); let s = textCard26(t, q.map((x) => [x, -1]), { w: 980, size: 32, lh: 48, title: "Question" }); return TF(960, 540, 1, TF(-420, -300, 1, s) + TF(540, 60, .9, pic)); };
// fun facts
const ffEyes26 = (t, w, h) => ffBg(w, h, "#E8F6FF") + TF(-40, 20, 3.2, dragonfly26(t, {})) + `<circle cx="100" cy="0" r="130" fill="none" stroke="#2F6FD6" stroke-width="5" stroke-dasharray="14 10"/>` + T(0, h / 2 - 24, "it sees almost all the way round", 30, P.ink, { w: 700 });
const ffSide26 = (t, w, h) => ffBg(w, h, "#FFF6E6") + TF(0, 0, 2.4, dragonfly26(t, {})) + [0, 1, 2, 3, 4, 5].map((i) => { const a = i / 6 * Math.PI * 2; return fatArrow(Math.cos(a) * 200, Math.sin(a) * 130, Math.cos(a) * 110, Math.sin(a) * 70, "#4a90e2", 7); }).join("") + T(0, h / 2 - 24, "evidence from every side!", 30, P.ink, { w: 700 });
const ffTrail26 = (t, w, h) => ffBg(w, h, "#FFF6E6") + `<path d="M-300 80 Q-100 -60 100 40 T300 -20" stroke="#D9A21B" stroke-width="10" stroke-dasharray="4 16" fill="none" stroke-linecap="round"/>` + [0, 1, 2, 3].map((i) => antAt26(t, -240 + i * 160, 60 - i * 20, .6, { ph: i })).join("") + T(-300, -80, "food", 30, P.ink, { w: 700 }) + T(300, -80, "nest", 30, P.ink, { w: 700 });
const ffLink26 = (t, w, h) => ffBg(w, h, "#EAF8EC") + `<rect x="-260" y="-40" width="160" height="80" rx="20" fill="#F2D6A8"/>` + T(-180, 10, "food", 30, P.ink, { w: 700 }) + `<rect x="100" y="-40" width="160" height="80" rx="20" fill="#B88A50"/>` + T(180, 10, "nest", 30, "#fff", { w: 700 }) + `<rect x="-100" y="-14" width="200" height="28" rx="14" fill="#3fc35f"/>` + T(0, 80, "a link!", 40, "#2FA35A", { w: 700 });
// Mark Sentence pictures
const markTiles26 = (t, x, y, k) => TF(x, y, k, underBox23(TF(0, 0, .8, ceclTiles26(t, {})), 1100, 260));
const markEC26 = (t, x, y, k) => TF(x, y, k, underBox23(TF(-250, 0, .9, `<rect x="-160" y="-70" width="320" height="140" rx="22" fill="#4a90e2"/>` + T(0, -8, "Evidence", 40, "#fff") + T(0, 40, "the question shows", 26, "#fff", { w: 600 })) + TF(250, 0, .9, `<rect x="-160" y="-70" width="320" height="140" rx="22" fill="#ffb627"/>` + T(0, -8, "Concept", 40, "#fff") + T(0, 40, "the rule you know", 26, "#fff", { w: 600 })), 900, 260));
const markChoice26 = (t, x, y, k) => TF(x, y, k, underBox23(TF(-220, 0, 1, tpill(0, 0, "Which ...? Do you agree?", 30, "#e8493f", "#fff", { w: 700 })) + TF(-220, 60, 1, T(0, 0, "a Choice ✓", 30, P.ink, { w: 700 })) + TF(260, 0, 1, tpill(0, 0, "Explain ... / Why ...?", 30, "#9AA6B2", "#fff", { w: 700 })) + TF(260, 60, 1, T(0, 0, "no Choice", 30, P.ink, { w: 700 })), 1000, 240));
const markLink26 = (t, x, y, k) => TF(x, y, k, underBox23(`<rect x="-420" y="-40" width="240" height="80" rx="20" fill="#ffb627"/>` + T(-300, 10, "the rule", 30, "#fff", { w: 700 }) + `<rect x="180" y="-40" width="240" height="80" rx="20" fill="#FFFDF6" stroke="${P.ink}" stroke-width="3"/>` + T(300, 10, "the question", 30, P.ink, { w: 700 }) + `<rect x="-180" y="-16" width="360" height="32" rx="16" fill="#3fc35f"/>` + T(0, 10, "Thus, ...", 26, "#fff", { w: 700 }), 1000, 240));
const chantBoard26 = (t, f) => { const box = (x, y, fl, i) => `<g transform="translate(${x} ${y}) scale(${n2(1 + .06 * fl)})"><g filter="url(#dropS)"><rect x="-170" y="-80" width="340" height="160" rx="24" fill="${CECL[i][2]}" stroke="${fl > .1 ? P.sun : "#fff"}" stroke-width="${n2(4 + 6 * fl)}"/></g>${T(-110, 30, CECL[i][0], 80, "#fff")}${T(40, 18, CECL[i][1], 34, "#fff", { w: 700 })}</g>`;
  return [0, 1, 2, 3].map((i) => box(1640, 240 + i * 190, f[i] || 0, i)).join(""); };
