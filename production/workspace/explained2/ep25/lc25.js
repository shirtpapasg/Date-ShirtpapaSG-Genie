// lc25.js: EP25's look-closer panels, its two journeys, and the ring / card / recap / fun-fact / Mark Sentence / chant / goodbye pictures.
// Look-closer art is centred on (0, 0) inside +-830 x +-395 (closer.js); keep the top 110 px for a book strip and the bottom 80 px for the verdict.
const PULL25 = "#F2B233";
// the fridge from the front, its door open a little or shut; o.cut (0..1) cuts the door's soft edge open all the way round to show the dark
// magnetic strip inside; o.pull (gold pull lines from the strip to the steel body); o.cold (blue cold swirls inside)
function fridgeCut25(t, o = {}) { const op = clamp(o.open || 0), cut = clamp(o.cut || 0), W = 520, H = 760, dx = -op * 140;
  let s = `<rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" rx="26" fill="#DDE3E8" stroke="#6E7882" stroke-width="7"/>` + T(-W / 2 + 70, -H / 2 + 50, "steel body", 30, "#4E565E", { a: "start", w: 700 })
    + `<rect x="${-W / 2 + 26}" y="${-H / 2 + 80}" width="${W - 52}" height="${H - 110}" rx="16" fill="#CFE6F2"/>`;
  if (o.cold) for (let i = 0; i < 5; i++) { const u = ((t * .4 + i * .2) % 1); s += `<circle cx="${n2(-150 + i * 70)}" cy="${n2(240 - 360 * u)}" r="${n2(26 + 10 * Math.sin(i))}" fill="#BFE3FA" opacity="${n2(.8 * Math.sin(Math.PI * u))}"/>`; }
  // the door (in front, swung by dx), its soft white edge all round, and the strip inside the edge
  s += `<g transform="translate(${n2(dx)} 0) scale(${n2(1 - op * .35)} 1)"><rect x="${-W / 2 - 8}" y="${-H / 2 - 8}" width="${W + 16}" height="${H + 16}" rx="30" fill="#F7F9FA" opacity="${n2(1 - .8 * cut)}" stroke="#8C98A4" stroke-width="6"/>`
    + `<rect x="${-W / 2 + 4}" y="${-H / 2 + 4}" width="${W - 8}" height="${H - 8}" rx="24" fill="none" stroke="#FFFFFF" stroke-width="26"/>`
    + `<rect x="${-W / 2 + 4}" y="${-H / 2 + 4}" width="${W - 8}" height="${H - 8}" rx="24" fill="none" stroke="#C9D2DA" stroke-width="26" opacity="${n2(cut * .5)}"/>`
    + (cut > .02 ? OP(cut, `<rect x="${-W / 2 + 4}" y="${-H / 2 + 4}" width="${W - 8}" height="${H - 8}" rx="24" fill="none" stroke="#3E434C" stroke-width="10"/><rect x="${-W / 2 + 4}" y="${-H / 2 + 4}" width="${W - 8}" height="${H - 8}" rx="24" fill="none" stroke="#6E7480" stroke-width="3" stroke-dasharray="24 10"/>`) : "") + `</g>`;
  if (o.pull) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, x = Math.cos(a) * (W / 2 - 6), y = Math.sin(a) * (H / 2 - 6); s += OP(o.pull * (.5 + .5 * Math.sin(t * 6 + i)), `<path d="M${n2(x * 1.08 + dx)} ${n2(y * 1.04)} L${n2(x * .96)} ${n2(y * .97)}" stroke="${PULL25}" stroke-width="7" stroke-linecap="round"/>`); }
  return s; }
// a small fridge picture with its magnetic strip shown as a dark band all round the door's soft edge (for recaps, cards and icons)
const fridgeStrip25 = (t) => fridge24(t, { open: 0, photos: false }) + `<rect x="-146" y="-466" width="292" height="452" rx="16" fill="none" stroke="#3E434C" stroke-width="9" stroke-dasharray="26 8"/>`;
/* Part 1 look-closer 1 · WHERE IS THE MAGNET? Left: the fridge from the front (fridge24), its door shut; a yellow dot runs round the door's soft
   edge (round: the strip goes all the way round). Right: a magnifier joined to the door's edge shows the edge cut across (cut): the white soft
   rubber edge with the dark magnetic strip inside, the steel body's edge beside it; the door swings in (close): gold pull lines, the edge
   presses flat against the steel; the cold stays inside (seal) */
function lcFridgeArt(t) { const m = MK, tC = m("cut"), tR = m("round"), tS = m("steelb"), tCl = m("close"), tSe = m("seal");
  const cut = eio(clamp((t - tC) / 1.0)), gap = t < tCl ? 70 : 70 * (1 - eio(clamp((t - tCl) / .9))), pull = t >= tCl - .3 && t < tCl + 1.4 ? 1 : 0;
  let A = lcBG23("#FFF6E6") + TF(-470, 380, 1.0, fridge24(t, { open: 0, photos: true }));
  // the dot running round the door's edge (fridge24's main door: x -150..150, y -470..-10 relative to its feet)
  if (t >= tR && t < tS + 3) { const u = ((t - tR) / 2.6) % 1, W = 300, H = 460, per = 2 * (W + H), d = u * per; let x, y; if (d < W) { x = -150 + d; y = -470; } else if (d < W + H) { x = 150; y = -470 + d - W; } else if (d < 2 * W + H) { x = 150 - (d - W - H); y = -10; } else { x = -150; y = -10 - (d - 2 * W - H); }
    A += `<circle cx="${n2(-470 + x)}" cy="${n2(380 + y)}" r="20" fill="${P.sun}" stroke="${P.ink}" stroke-width="4"/>`; }
  // the magnifier: its line to the door's left edge
  const M = [330, -20], R = 330; A += `<path d="M${-470 - 150} ${380 - 240} L${M[0] - R * .95} ${M[1] + 60}" stroke="${P.ink}" stroke-width="5" opacity="${n2(cut)}"/>`;
  let c = `<rect x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="#FFFDF6"/>`;
  // the steel body's edge (right), the door (left) moving in by `gap`; the soft edge on the door's inner face, the strip inside it
  c += `<rect x="40" y="${-R}" width="${R}" height="${2 * R}" fill="#B8C2CC"/><rect x="40" y="${-R}" width="20" height="${2 * R}" fill="#8C98A4"/>` + (t >= tSe ? [0, 1, 2, 3].map((i) => { const u = ((t * .4 + i * .25) % 1); return `<circle cx="${n2(150 + 60 * i)}" cy="${n2(260 - 480 * u)}" r="34" fill="#DDF0FA" opacity="${n2(.9 * Math.sin(Math.PI * u))}"/>`; }).join("") : "");
  c += `<g transform="translate(${n2(-gap)} 0)"><rect x="${-R}" y="${-R}" width="${R - 120}" height="${2 * R}" fill="#F7F9FA" stroke="#8C98A4" stroke-width="6"/><path d="M-120 ${-R} V${R}" stroke="#8C98A4" stroke-width="6"/>`
    + `<rect x="-118" y="-150" width="${n2(150 - 20 * (1 - gap / 70))}" height="300" rx="60" fill="#FFFFFF" stroke="#C9D2DA" stroke-width="6"/>` + OP(cut, `<rect x="-96" y="-100" width="${n2(100 - 14 * (1 - gap / 70))}" height="200" rx="16" fill="#3E434C"/><path d="M-90 -60 h86 M-90 0 h86 M-90 60 h86" stroke="#6E7480" stroke-width="4"/>`) + `</g>`;
  if (pull) for (let i = 0; i < 5; i++) c += OP(.5 + .5 * Math.sin(t * 7 + i), `<path d="M${n2(-40 - gap)} ${-80 + i * 40} L36 ${-80 + i * 40}" stroke="${PULL25}" stroke-width="7" stroke-dasharray="14 10" stroke-linecap="round"/>`);
  A += OP(cut, TF(M[0], M[1], 1, `<clipPath id="fmag"><circle r="${R}"/></clipPath><g clip-path="url(#fmag)">${c}</g><circle r="${R}" fill="none" stroke="${P.ink}" stroke-width="10"/>`));
  A += lcLab(t, tC + .5, 560, -340, "magnetic strip", M[0] - 60, M[1], { size: 38 }) + lcLab(t, tC + 1.0, -100, -360, "the door's soft edge", M[0] - 90, M[1] - 140, { size: 32 }) + lcLab(t, tR, -560, -340, "all the way round", -620, -100, { size: 34, fill: "#FFF3C8" })
    + lcLab(t, tS, 620, 250, "steel body", M[0] + 200, M[1] + 60, { size: 38, fill: "#E6E9EC" }) + (t >= tCl ? lcLab(t, tCl + .2, 650, -190, "attracted!", M[0] + 20, M[1] - 40, { size: 36, fill: "#FFF3C8", t1: tSe }) : "") + (t >= tSe ? lcLab(t, tSe, 560, 330, "the cold stays in", M[0] + 180, M[1] + 200, { size: 36, fill: "#DDF0FA" }) : "");
  return A; }
/* Part 1 look-closer 2 · A WHITEBOARD AND A DOORSTOP: the whiteboard big, a corner cut away in layers (white surface, steel sheet, backing),
   the magnet on the front with gold pull lines through to the steel (board); then a pan to Pip's bedroom door wide open, the doorstop on the
   floor and the small steel plate on the door's edge; a gust from the window: the door tugs but stays (door, gust, held) */
function lcHomeArt(t) { const m = MK, tL = m("layers"), tSh = m("sheet"), tSt = m("stick"), tD = m("door"), tG = m("gust"), tH = m("held");
  const pan = eio(clamp((t - tD + .4) / 1.3)), px = 1900 * pan;
  let A = lcBG23("#FFF6E6");
  // the board: layers peel apart at the corner
  const peel = eio(clamp((t - tL) / 1.0));
  A += `<g transform="translate(-60 20)"><rect x="-500" y="-300" width="1000" height="600" rx="20" fill="#E3E6EA" stroke="#8C98A4" stroke-width="8"/>`
    + `<rect x="-480" y="-280" width="960" height="560" rx="10" fill="#9AA3AB"/><rect x="-480" y="-280" width="${n2(960 - 300 * peel)}" height="${n2(560 - 220 * peel)}" rx="10" fill="#FDFEFF"/>`
    + (peel > .02 ? OP(peel, `<path d="M${n2(480 - 300 * peel)} -280 L480 -280 L480 ${n2(280 - 220 * peel)} z" fill="#9AA3AB"/><rect x="${n2(480 - 300 * peel)}" y="${n2(280 - 220 * peel)}" width="${n2(300 * peel)}" height="${n2(220 * peel)}" fill="#B8865A"/>`) : "")
    + `<rect x="-420" y="-230" width="300" height="220" fill="#FFF6C8" stroke="#D9C27A" stroke-width="4" transform="rotate(-3)"/>` + TF(-240, -220, 1.6, `<circle r="18" fill="#E0453A" stroke="#9A2A1E" stroke-width="3"/>`)
    + (t >= tSt ? [0, 1, 2].map((i) => OP(.5 + .5 * Math.sin(t * 6 + i), `<path d="M${-250 + i * 18} -200 v40" stroke="${PULL25}" stroke-width="7" stroke-linecap="round"/>`)).join("") : "") + `</g>`;
  A += lcLab(t, tL + .2, -560, 320, "white writing surface", -360, 200, { size: 34 }) + lcLab(t, tSh, 600, -330, "steel sheet", 360, -200, { size: 40, fill: "#E6E9EC" }) + lcLab(t, tSh + .6, 600, 330, "backing board", 360, 260, { size: 32 })
    + (t >= tSt ? lcLab(t, tSt + .2, -650, -360, "attracted to the steel", -300, -200, { size: 34, fill: "#FFF3C8" }) : "");
  // the bedroom door (x 1900): the door wide open against the doorstop; a gust tugs it, it stays
  const tug = t >= tG ? 6 * Math.sin(Math.PI * clamp((t - tG) / 1.2)) * Math.sin(t * 18) : 0;
  let B = `<rect x="-930" y="-460" width="1860" height="920" fill="#F2E6D2"/><rect x="-930" y="260" width="1860" height="200" fill="#C9A87A"/><rect x="-420" y="-380" width="420" height="640" fill="#E8DCC8" stroke="#A8906A" stroke-width="6"/>`
    + `<g transform="translate(0 -380) rotate(${n2(tug)} 0 0)"><path d="M0 0 L360 -40 L360 600 L0 640z" fill="#C98A5A" stroke="#7A5230" stroke-width="6"/><circle cx="320" cy="300" r="14" fill="#E0B040"/><rect x="330" y="560" width="26" height="30" fill="#9AA3AB" stroke="#4E565E" stroke-width="3"/></g>`
    + TF(400, 262, 1.6, doorstop25(1)) + (t >= tG ? [0, 1, 2].map((i) => { const u = ((t - tG) * 1.2 + i * .3) % 1; return `<path d="M${n2(-860 + 500 * u)} ${-120 + i * 70} q60 -20 120 0" stroke="#9AC4DA" stroke-width="6" fill="none" opacity="${n2(1 - u)}"/>`; }).join("") : "");
  B += lcLab(t, tD + .6, -600, 100, "Pip's bedroom door", -200, 0, { size: 34 }) + lcLab(t, tH, 650, -100, "magnet", 400, 140, { size: 34, fill: "#FFF3C8" }) + lcLab(t, tH + .4, 650, 20, "steel plate", 370, 200, { size: 34, fill: "#E6E9EC" })
    + (t >= tG ? lcLab(t, tG + .2, -650, -300, "a gust of wind", -560, -120, { size: 34 }) : "");
  return panIn(A + `<g transform="translate(1900 0)">${B}</g>`, px, 0, 1); }
/* Part 2 look-closer 1 · THE SCRAPYARD CRANE (EP23's yardCrane23): ON, the disc lowers and lifts the iron and steel (old pipes, a bicycle
   frame, a car door), the wooden planks and plastic crates stay on the ground; it swings over the lorry; OFF, the scrap drops; an inset: a
   normal bar magnet with clips that cannot let go */
function lcCraneArt(t) { const m = MK, tOn = m("on"), tL = m("lift"), tSt = m("stay"), tSw = m("swing"), tOff = m("off"), tN = m("normal");
  const lift = t < tOn ? 1 : t < tOn + 1.2 ? 1 - eio(clamp((t - tOn) / 1.2)) : eio(clamp((t - tOn - 1.2) / 1.2)), sway = eio(clamp((t - tSw) / 1.8)), on = t >= tOn + .9 && t < tOff;
  let A = `<rect x="-930" y="-460" width="1860" height="920" fill="#BFE6FF"/><rect x="-930" y="120" width="1860" height="340" fill="#B8A890"/>`;
  // the heap of iron and steel scrap (under the disc), and the wood and plastic that stay behind
  A += TF(360, 330, 1.15, `<path d="M-260 0 Q-130 -190 0 -200 Q130 -190 260 0z" fill="#8A5A3E" stroke="#5A3420" stroke-width="5"/>` + [...Array(14)].map((_, i) => `<rect x="${n2(-200 + 400 * hash(i, 3))}" y="${n2(-30 - 140 * hash(i, 4) * (1 - Math.abs(hash(i, 3) - .5)))}" width="56" height="12" rx="4" fill="${["#A8683E", "#6E5A4E", "#B8784A"][i % 3]}" transform="rotate(${n2(180 * hash(i, 5))})"/>`).join(""));
  A += TF(-20, 380, 1.3, `<rect x="-160" y="-30" width="220" height="24" rx="4" fill="#B8864A" stroke="#7A5230" stroke-width="3" transform="rotate(-6)"/><rect x="-140" y="-56" width="200" height="22" rx="4" fill="#C9965A" stroke="#7A5230" stroke-width="3" transform="rotate(4)"/><rect x="60" y="-70" width="110" height="70" rx="6" fill="#2F6FD6" stroke="#1E3E8A" stroke-width="4"/><rect x="74" y="-58" width="82" height="10" fill="#5A8FE6"/>`);
  A += TF(-380, 140, 1.3, `<rect x="-170" y="-150" width="260" height="110" rx="8" fill="#4E7AB0" stroke="#2E4A70" stroke-width="5"/><rect x="90" y="-140" width="90" height="100" rx="8" fill="#E8E2D0" stroke="#7A7262" stroke-width="5"/><rect x="104" y="-126" width="60" height="38" rx="4" fill="#BFE6FF"/><rect x="-180" y="-44" width="370" height="14" fill="#3A3A44"/>` + [-120, -20, 130].map((wx) => `<circle cx="${wx}" cy="-20" r="24" fill="#2E2E36"/>`).join(""));
  A += TF(620, 340, 1.35, yardCrane23(t, { sw: sway, lift, on, fall: tOff }));
  A += lcLab(t, tOn + .2, 300, -330, "ON", 420, -120, { size: 44, fill: "#EAF8EC", t1: tOff - .2 }) + lcLab(t, tL + .5, 720, -60, "iron and steel: lifted", 380, 120, { size: 34, t1: tSw }) + lcLab(t, tSt, -560, -40, "wood and plastic: left behind", -30, 330, { size: 34, t1: tOff })
    + lcLab(t, tOff, -300, -330, "OFF: it lets go", -380, 100, { size: 44, t1: tN + 3 });
  if (t >= tN) A += TF(560, -230, spring(t, tN, .4), `<g filter="url(#dropS)"><rect x="-220" y="-110" width="440" height="220" rx="24" fill="#FFF8EA"/></g>` + TF(-30, -20, .7, bar20(t, { glint: false })) + clipBunch(t, -130, 10, 4, { k: .8 }) + T(0, 90, "a normal magnet: it never lets go", 24, P.ink, { w: 700 }));
  return A; }
/* Part 2 look-closer 2 · THE FLOATING TRAIN, then THE MRI SCANNER: the train and its guideway cut away big (magnets on the train's underside
   and on the track, like poles facing: N above N, push arrows between them, the gap: it floats); then a calm hospital room */
function lcTrainArt(t) { const m = MK, tC = m("cutt"), tR = m("repel"), tF = m("floats"), tM = m("mri"), tP = m("pics");
  const pan = eio(clamp((t - tM + .4) / 1.3)), px = 1900 * pan, g = 30 + 8 * Math.sin(t * 2);
  let A = lcBG23("#E8F4FB") + TF(0, 120, 1.0, guideway25({ mags: true }) + maglev25(t, { gap: g, mags: true }));
  if (t >= tR) for (let i = 0; i < 5; i++) { const x = -360 + i * 180, a = .6 + .4 * Math.sin(t * 6 + i); A += OP(a, fatArrow(x, 120 - 4, x, 120 - g + 4, "#2FA35A", 8) + fatArrow(x + 30, 120 - g + 4, x + 30, 120 - 4, "#2FA35A", 8)); }
  A += lcLab(t, tC, -560, -330, "magnets on the train", -300, 120 - g - 20, { size: 36 }) + lcLab(t, tC + .6, -560, 330, "magnets on the track", -300, 130, { size: 36 }) + (t >= tR ? lcLab(t, tR, 520, -330, "they repel: push apart", 0, 120 - g / 2, { size: 36, fill: "#EAF8EC" }) : "")
    + (t >= tF ? lcLab(t, tF, 560, 300, "a gap: it floats!", 360, 120 - g / 2, { size: 40, fill: "#FFF3C8" }) : "");
  let B = `<rect x="-930" y="-460" width="1860" height="920" fill="#EEF4F8"/><rect x="-930" y="220" width="1860" height="240" fill="#D8E2EA"/>` + TF(60, 40, .95, mri25(t, { bed: eio(clamp((t - tM - .2) / 2.4)) }));
  B += lcLab(t, tM + .6, -600, -330, "a large round magnet", -200, -260, { size: 34 }) + lcLab(t, tM + 1.2, 640, 330, "a tunnel in the centre", 80, -40, { size: 34 }) + (t >= tP ? lcLab(t, tP, 600, -360, "a picture of the inside of the body", 470, -230, { size: 30, fill: "#FFF3C8" }) : "");
  return panIn(A + `<g transform="translate(1900 0)">${B}</g>`, px, 0, 1); }

/* ============================================================ JOURNEY 1 · Be the magnetic strip in the fridge door (Part 1) ============================================================
   You lie inside the soft rubbery edge (a tunnel of white rubber): a long thin dark strip running away round a corner (jalong); the door
   swings (jswing); the fridge's steel body (a grey steel wall) comes closer (jsteel); soft gold pull lines from you to the steel (jpull);
   thup: the edge presses flat all round (jsnug); the cold air (blue swirls) stays inside, the warm kitchen outside (jcold) */
function stripJourney(t, s) { const m = MK, tA = m("jalong"), tSw = m("jswing"), tS = m("jsteel"), tP = m("jpull"), tSn = m("jsnug"), tC = m("jcold");
  const near = eio(clamp((t - tSw) / (tSn - tSw))), run = (t - m("jlie")) * 120;
  let o = `<rect width="1920" height="1080" fill="#F7F9FA"/>`;
  // the steel wall, coming in from the right
  const wx = lerp(2200, 1180, near);
  o += `<rect x="${n2(wx)}" y="0" width="1200" height="1080" fill="#B8C2CC"/><rect x="${n2(wx)}" y="0" width="30" height="1080" fill="#8C98A4"/>` + [0, 1, 2, 3, 4].map((i) => `<path d="M${n2(wx + 80 + i * 150)} 0 V1080" stroke="#CAD2DA" stroke-width="10"/>`).join("") + (t >= tS ? OP(ramp(t, tS, .3), TF(wx + 300, 200, 1, tpill(0, 0, "steel", 44, "#fff", P.ink, { w: 700 }))) : "");
  // the rubber tunnel (perspective) and YOU, the dark strip running away round the door
  o += `<path d="M0 260 Q520 300 1080 420 L1080 660 Q520 780 0 820z" fill="#FFFFFF" stroke="#D4DCE4" stroke-width="8"/><path d="M0 330 Q520 370 1080 470 L1080 610 Q520 710 0 750z" fill="#EEF2F5"/>`
    + `<path d="M0 470 Q520 490 1080 525 L1080 555 Q520 590 0 610z" fill="#3E434C"/>` + [...Array(10)].map((_, i) => { const x = ((i * 130 - run) % 1300 + 1300) % 1300; return `<path d="M${n2(x)} ${n2(480 + x * .04)} v${n2(120 - x * .07)}" stroke="#6E7480" stroke-width="4" opacity=".7"/>`; }).join("");
  if (t >= tA && t < tSw + 1) o += lcLab(t, tA + .2, 520, 180, "you go all the way round the door", 600, 520, { size: 36, t1: tSw + .6 });
  if (t >= tP) for (let i = 0; i < 6; i++) { const y = 470 + i * 26, a = .5 + .5 * Math.sin(t * 7 + i); o += OP(a, `<path d="M1080 ${y} L${n2(wx)} ${n2(y + (i - 2.5) * 30)}" stroke="${PULL25}" stroke-width="8" stroke-linecap="round" stroke-dasharray="20 14"/>`); }
  if (t >= tSn) o += OP(ramp(t, tSn, .3), TF(900, 900, 1, tpill(0, 0, "snug!", 52, P.sun, P.ink, { w: 700 })));
  if (t >= tC) { for (let i = 0; i < 6; i++) { const u = ((t * .35 + i * .17) % 1); o += `<circle cx="${n2(1300 + 500 * (i / 6))}" cy="${n2(900 - 700 * u)}" r="38" fill="#BFE3FA" opacity="${n2(.8 * Math.sin(Math.PI * u))}"/>`; } o += lcLab(t, tC + .2, 1500, 160, "the cold stays in", 1500, 400, { size: 40, fill: "#DDF0FA" }); }
  return o; }
/* ============================================================ JOURNEY 2 · Be a floating train (Part 2) ============================================================
   From the driver's window: the guideway ahead, converging; you rise a little (jfloat); the magnets below, push arrows (jmag, jpush); the gap
   (jgap); you glide forward, faster and faster (jfast: speed lines, trees and blocks blur past; the train always faces forward) */
function trainJourney(t, s) { const m = MK, tF = m("jfloat"), tM = m("jmag"), tP = m("jpush"), tG = m("jgap"), tFa = m("jfast");
  const rise = eio(clamp((t - tF) / 1.2)), sp = t < tFa ? .3 : .3 + 2.2 * eio(clamp((t - tFa) / 2)), go = (t - m("jtrack")) * 400 * sp;
  let o = `<rect width="1920" height="1080" fill="#BFE6FF"/><rect y="520" width="1920" height="560" fill="#8ACB6A"/>`;
  // HDB blocks and trees passing on both sides (near big and fast, far small and slow)
  for (let i = 0; i < 8; i++) { const u = (((i * 240 + go * .4) % 1920) + 1920) % 1920, k = .4 + u / 1920; o += `<rect x="${n2(960 - 960 * k - 120)}" y="${n2(520 - 300 * k)}" width="${n2(110 * k)}" height="${n2(300 * k)}" fill="#F2E6D2" stroke="#C9B8A0" stroke-width="3"/><rect x="${n2(960 + 960 * k)}" y="${n2(520 - 280 * k)}" width="${n2(110 * k)}" height="${n2(280 * k)}" fill="#E8DCC8" stroke="#C9B8A0" stroke-width="3"/>`; }
  // the guideway converging to the vanishing point
  o += `<path d="M960 520 L1260 1080 H660z" fill="#B8C2CC"/><path d="M960 520 L1060 1080 H860z" fill="#9AA6B2"/>`;
  for (let i = 0; i < 9; i++) { const u = ((i / 9 + go * .0006) % 1), y = 520 + 560 * u * u, w = 300 * u * u; o += `<rect x="${n2(960 - w)}" y="${n2(y)}" width="${n2(w * 2)}" height="${n2(3 + 9 * u)}" fill="#8C98A4"/><rect x="${n2(960 - w * .3)}" y="${n2(y)}" width="${n2(w * .6)}" height="${n2(2 + 4 * u)}" fill="#E0453A" opacity=".7"/>`; }
  if (sp > .5) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r0 = 200 + ((go * 2 + i * 90) % 600); o += `<path d="M${n2(960 + Math.cos(a) * r0)} ${n2(520 + Math.sin(a) * r0 * .6)} l${n2(Math.cos(a) * 120)} ${n2(Math.sin(a) * 72)}" stroke="#fff" stroke-width="5" opacity=".6"/>`; }
  // the cab's window frame and dashboard (you)
  o += `<g transform="translate(0 ${n2(-rise * 40)})"><path d="M0 0 H1920 V120 Q960 70 0 120z M0 1080 V860 Q960 800 1920 860 V1080z" fill="#F7F9FA"/><path d="M0 860 Q960 800 1920 860" stroke="#14B8A6" stroke-width="18" fill="none"/><rect x="760" y="900" width="400" height="90" rx="20" fill="#3A4A5A"/>${T(960, 960, sp > .5 ? "FAST" : "float", 44, "#9BF5B4", { w: 700 })}</g>`;
  if (t >= tM && t < tFa) o += TF(1500, 700, spring(t, tM, .4), `<g filter="url(#dropS)"><rect x="-260" y="-150" width="520" height="300" rx="24" fill="#FFF8EA"/></g>` + TF(0, 40, .3, guideway25({ mags: true }) + maglev25(t, { gap: 40, mags: true }))
    + (t >= tP ? [-60, 60].map((x) => fatArrow(x, 32, x, 6, "#2FA35A", 6) + fatArrow(x + 16, 6, x + 16, 32, "#2FA35A", 6)).join("") : "") + T(0, -110, t >= tP ? "push!" : "magnets", 34, P.ink, { w: 700 }));
  if (t >= tG && t < tFa + 2) o += lcLab(t, tG, 520, 300, "nothing rubs on the track", 900, 760, { size: 38, t1: tFa + 1.6 });
  return o; }

/* ============================================================ the ring / card / recap pictures ============================================================ */
const ringP1_25 = (t) => TF(440, 560, .62, fridge24(t, { open: .05 })) + TF(560, 260, 1, `<circle r="40" fill="#fff" stroke="${P.ink}" stroke-width="5"/>` + T(0, 20, "?", 56, P.ink, { w: 700 }));
const ringHold25 = (t) => `<rect x="220" y="220" width="420" height="420" fill="#BFE6FF"/>` + TF(0, 0, 1, `<rect x="210" y="210" width="440" height="440" fill="none" stroke="${ALUC[0]}" stroke-width="28"/><rect x="210" y="210" width="440" height="440" fill="none" stroke="${ALUC[1]}" stroke-width="4"/>`) + TF(640, 430, .5, bar20(t, { glint: false })) + TF(560, 340, 1, `<circle r="34" fill="#fff" stroke="${P.ink}" stroke-width="5"/>` + T(0, 16, "?", 46, P.ink, { w: 700 }));
// Part 2 Round 1: the fishing rod's magnet over fish with silver (aluminium) clips
const fishAl = (x, y, k, col) => TF(x, y, k, `<path d="M-54 0 Q-10 -40 40 -6 L66 -26 L60 0 L66 26 L40 6 Q-10 40 -54 0z" fill="${col}" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/><circle cx="-30" cy="-8" r="7" fill="#fff" stroke="${P.ink}" stroke-width="2.5"/><circle cx="-31" cy="-8" r="3.6" fill="${P.ink}"/>`) + clip21(x - 58 * k, y + 2 * k, 0, .62 * k);
const ringP2_25 = (t) => `<rect x="160" y="560" width="560" height="200" rx="30" fill="#3A74C4"/>` + [[300, 640, 0], [460, 690, 1], [600, 640, 2]].map(([x, y, c]) => fishAl(x + 4 * Math.sin(t + c), y, .9, FISHC[c])).join("") + `<path d="M420 200 V470" stroke="#555" stroke-width="3"/>` + TF(420, 490, .45, bar20(t, { glint: false })) + TF(600, 330, 1, chip24("aluminium clips", "#7E8A96", 30));
const cardP2_25 = (i, t) => { const bgc = `<rect x="-200" y="-130" width="400" height="260" fill="#DDEEFA"/><rect x="-200" y="40" width="400" height="90" fill="#3A74C4"/>`, rod = (y) => `<path d="M0 -130 V${y - 20}" stroke="#555" stroke-width="3"/>` + TF(0, y, .3, bar20(t, { glint: false }));
  if (i === 0) return bgc + rod(-40) + TF(0, 10, .9, fishP(0, 0, 1, FISHC[0])) + TF(-130, 85, 1, fishP(0, 0, .7, FISHC[1]));
  if (i === 1) return bgc + rod(-40) + TF(-110, 85, 1, fishP(0, 0, .7, FISHC[0])) + TF(110, 85, 1, fishP(0, 0, .7, FISHC[2])) + T(0, 30, "…", 50, P.ink, { w: 700 });
  return bgc + rod(-40) + TF(-140, 85, 1, fishP(0, 0, .7, FISHC[0])) + TF(140, 85, 1, fishP(0, 0, .7, FISHC[2])) + fatArrow(-40, 60, -110, 60, "#D84A3A", 8) + fatArrow(40, 60, 110, 60, "#D84A3A", 8); };
const ringShow25 = (t) => TF(330, 470, .55, toyCar25(t, {})) + TF(480, 420, .3, bar20(t, { glint: false })) + TF(600, 420, .3, bar20(t, { glint: false, flip: true })) + [1, 2, 3].map((n, i) => TF([300, 440, 600][i], 330, 1, `<circle r="24" fill="${P.momo}"/>` + T(0, 10, n, 30, "#fff"))).join("");
// Part 2's recap pictures: 1 the fridge door's strip · 2 the whiteboard's steel sheet · 3 aluminium: not magnetic
const recapP2_25 = (i, t) => { if (i === 0) return TF(-120, 280, .74, fridgeStrip25(t)) + TF(230, -40, 1, chip24("a magnetic strip in the soft edge", "#3E434C", 28)) + pline(230, -10, -40, -20, 1, P.ink);
  if (i === 1) return TF(0, 0, 1.4, whiteboard25(t, 0, 0, 1)) + TF(260, 150, 1, chip24("a steel sheet inside", "#6E7882", 30));
  return TF(-120, 0, 1, `<rect x="-180" y="-200" width="360" height="400" fill="#BFE6FF"/><rect x="-190" y="-210" width="380" height="420" fill="none" stroke="${ALUC[0]}" stroke-width="30"/><rect x="-190" y="-210" width="380" height="420" fill="none" stroke="${ALUC[1]}" stroke-width="4"/>`) + TF(250, 60, .8, bar20(t, { glint: false })) + TF(250, -120, 1, chip24("aluminium: not magnetic", "#7E8A96", 30)); };
// fun-fact pictures
const ffBee25 = (t, w, h) => ffBg(w, h, "#FFF6E0") + TF(-120, 20, 2.4, honeybee25(t, {})) + TF(160, 0, 1, `<circle r="80" fill="#fff" stroke="${P.ink}" stroke-width="6"/><path d="M0 -60 L14 0 L0 60 L-14 0z" fill="#E0453A"/><path d="M0 0 L14 0 L0 60 L-14 0z" fill="#2F6FD6"/><circle r="8" fill="${P.ink}"/>`) + T(0, h / 2 - 24, "a compass inside?", 32, P.ink, { w: 700 });
const ffEarth25 = (t, w, h) => ffBg(w, h, "#0E1A3A") + `<circle cx="0" cy="0" r="120" fill="#2F6FD6"/><path d="M-60 -60 q30 -20 60 0 q20 40 -20 60 q-40 10 -40 -60z M40 20 q30 10 30 40 q-30 20 -40 -10z" fill="#4FBF6A"/>` + [-1, 1].map((d) => [0, 1, 2].map((i) => `<path d="M0 -130 C${d * (180 + i * 60)} -100 ${d * (180 + i * 60)} 100 0 130" stroke="#FFC83A" stroke-width="4" fill="none" opacity="${n2(.7 - i * .15)}"/>`).join("")).join("") + T(0, h / 2 - 24, "the Earth's magnetism", 30, "#fff", { w: 700 });
const ffStand25 = (t, w, h) => ffBg(w, h, "#DDEFFA") + `<rect x="${-w / 2}" y="0" width="${w}" height="${h / 2}" fill="#5A9AD6"/>` + TF(0, 0, 2.6, strider25(t, {})) + T(0, h / 2 - 24, "it does not sink!", 32, "#fff", { w: 700 });
const ffHairs25 = (t, w, h) => ffBg(w, h, "#EEF6EA") + `<path d="M-260 40 L260 -20" stroke="#2E2A26" stroke-width="22" stroke-linecap="round"/>` + [...Array(26)].map((_, i) => { const x = -240 + i * 19, y = 38 - i * 2.3; return `<path d="M${x} ${n2(y - 10)} l10 -22" stroke="#6E625A" stroke-width="3"/>`; }).join("") + `<circle cx="0" cy="10" r="90" fill="none" stroke="#D84A3A" stroke-width="6"/>` + T(0, h / 2 - 24, "tiny hairs keep it dry", 32, P.ink, { w: 700 });
// Mark Sentence pictures
const markFridge25 = (t, x, y, k) => TF(x, y, k, underBox23(TF(-200, 130, .3, fridgeStrip25(t)) + TF(150, 0, 1, chip24("a strip inside the door's edge", "#3E434C", 26)) + TF(150, 80, 1, chip24("the door stays closed", GOODC, 28)), 900, 300));
const markDoor25 = (t, x, y, k) => TF(x, y, k, underBox23(TF(-150, 120, .9, doorstop25(1)) + `<path d="M-60 -120 L120 -140 L120 110 L-60 130z" fill="#C98A5A" stroke="#7A5230" stroke-width="5"/>` + TF(200, 60, 1, chip24("held in place", GOODC, 28)), 900, 300));
const markCrane25 = (t, x, y, k) => TF(x, y, k, underBox23(TF(0, 120, .42, yardCrane23(t, { sw: 0, lift: .8, on: true })), 900, 300));
const markTrain25 = (t, x, y, k) => TF(x, y, k, underBox23(TF(0, 40, .5, guideway25({ mags: true }) + maglev25(t, { gap: 30, mags: true })), 1000, 300));
// the interacting scene's three pictures: attract (unlike poles pulling), repel (like poles pushing), a magnetic object (a steel clip pulled)
const interPics25 = (t, k = 1) => TF(0, 0, k, [0, 1, 2].map((i) => { const x = -560 + i * 560, w = 460; let s = `<g filter="url(#dropS)"><rect x="${x - w / 2}" y="-150" width="${w}" height="300" rx="26" fill="#FFF8EA"/></g>`;
  if (i === 0) s += TF(x - 90, -10, .5, bar20(t, { glint: false })) + TF(x + 90, -10, .5, bar20(t, { glint: false })) + fatArrow(x - 20, 60, x + 10, 60, "#2FA35A", 7) + T(x, 120, "attract", 34, P.ink, { w: 700 });
  if (i === 1) s += TF(x - 95, -10, .5, bar20(t, { glint: false })) + TF(x + 95, -10, .5, bar20(t, { glint: false, flip: true })) + fatArrow(x - 10, 60, x - 60, 60, "#D84A3A", 7) + fatArrow(x + 10, 60, x + 60, 60, "#D84A3A", 7) + T(x, 120, "repel", 34, P.ink, { w: 700 });
  if (i === 2) s += TF(x - 70, -10, .5, bar20(t, { glint: false })) + clipBunch(t, x + 40, -40, 3, { k: .9 }) + T(x, 120, "a magnetic object", 32, P.ink, { w: 700 });
  return s; }).join(""));
// the chant's flashing board
const chantBoard25 = (t, f) => { const box = (x, y, w, h, fl, inner) => `<g transform="translate(${x} ${y}) scale(${n2(1 + .06 * fl)})"><g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="24" fill="#FFF8EA" stroke="${fl > .1 ? P.sun : "#E3C9A8"}" stroke-width="${n2(5 + 6 * fl)}"/></g>${inner}</g>`;
  return box(1640, 300, 400, 200, f[0], TF(0, 86, .24, fridgeStrip25(t))) + box(1640, 530, 400, 200, f[1], TF(0, 80, .26, yardCrane23(t, { sw: 0, lift: .8, on: true }))) + box(1640, 760, 400, 200, f[2], TF(0, 30, .38, guideway25() + maglev25(t, { gap: 30 }))); };
// the goodbye map: MAGNETS EVERYWHERE!, the eight finds as small round icons joined to the middle
const MAPI = [["fridge door", (t) => TF(0, 50, .16, fridgeStrip25(t))], ["whiteboard", (t) => TF(0, 0, .35, whiteboard25(t, 0, 0, 1))], ["doorstop", (t) => TF(0, 26, .6, doorstop25(1))], ["fishing game", (t) => TF(0, 0, .8, fishP(0, 0, 1, FISHC[0]))],
  ["crane", (t) => TF(0, 40, .16, yardCrane23(t, { sw: 0, lift: .8, on: true }))], ["floating train", (t) => TF(0, 20, .12, maglev25(t, { gap: 20 }))], ["MRI scanner", (t) => TF(0, 10, .2, mri25(t, { bed: 1, people: false }))], ["magnet car", (t) => TF(0, 20, .5, toyCar25(t, {}))]];
const mapEverywhere25 = (t, t0, k = 1) => { let s = `<g filter="url(#drop)"><rect x="-760" y="-330" width="1520" height="560" rx="34" fill="#FFF8EA"/></g>`, top = "";
  MAPI.forEach(([lab, pic], i) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2, x = Math.cos(a) * 560, y = Math.sin(a) * 210 - 40, tt = t0 + .3 + i * .18; if (t < tt) return; const k2 = spring(t, tt, .4);
    s += pline(0, -10, x, y, ramp(t, tt, .2), P.ink); top += TF(x, y, k2, `<circle r="74" fill="#fff" stroke="${P.ink}" stroke-width="5"/><clipPath id="mi${i}"><circle r="70"/></clipPath><g clip-path="url(#mi${i})">${pic(t)}</g>` + TF(0, 100, 1, tpill(0, 0, lab, 24, "#fff", P.ink, { w: 700 }))); });
  return TF(0, 0, k, s + top + TF(0, -10, spring(t, t0, .45), tpill(0, 0, "MAGNETS EVERYWHERE!", 56, P.sun, P.ink, { w: 700, ls: 2 }))); };
