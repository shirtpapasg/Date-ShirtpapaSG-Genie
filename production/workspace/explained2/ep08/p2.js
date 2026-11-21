// p2.js: PART 2, "Your School Shoe Came from a TREE? The 7 Materials": wood, rubber, fabric; count the parts; all seven.
// Segments 1-14 of p3_ep08_script.md. STAGE 2 (drawn): the set and props are in canteen.js, the picture boards in pics.js, the journey in shrink.js.
if (PART === 2) { (() => {
const L1 = "j502", L2 = "j803";
// the scores (script section 3): Round 1 1 : 1, Round 2 2 : 2, Showdown 4 : 2
SCORE.push([W("j704", "one") - .1, 1, 1]);
SCORE.push([W("j809", "one") - .1, 2, 2]);
SCORE.push([W("j909", "two") - .1, 4, 2]);
// Part 2's table: your school things. A pencil, the white canvas school shoe, the folded school T-shirt
const QX = { pencil: 330, shoe: 700, tee: 1070 };
const p2Items = (t, o = {}) => { const g = o.glow || {}; return glowDisc(QX.pencil, TY + 20, 130, g.pencil || 0) + glowDisc(QX.shoe, TY - 40, 190, g.shoe || 0) + glowDisc(QX.tee, TY - 60, 170, g.tee || 0)
  + (o.pencil === false ? "" : TF(QX.pencil, TY + 22, .8, woodPencil())) + (o.shoe === false ? "" : TF(o.shoeX || QX.shoe, TY + 8, .62 * (1 + .2 * (o.shoeK || 0)), shoe(o.shoeO || {}))) + (o.tee === false ? "" : TF(QX.tee, TY + 4, .72 * (1 + .2 * (o.teeK || 0)), tshirt())); };
const view2 = (t, o = {}, cam = CAMW) => canteenView(t, { noitems: true, liz2: o.liz2, items: (o.back || "") + p2Items(t, o) + (o.front || "") }, cam);

/* ============ 1-2 · the calm recap under Heart's "Last time..." (teacher, 2026-11-21, SERIES_FORMAT section 2): no fast montage.
   Three pictures from Part 1, one at a time, centred and large, each held at least 2.5 s with a gentle push-in and one short label:
   the spoon (objects are made of materials); where glass and ceramic come from (one picture, two rows); the board, three tiles to go. ============ */
const TCAM = [1.75, 620, 800];
// the thumbnail's frame: the white school shoe on the table, the rubber-tree picture board behind it (the cut and the cup), Momo surprised
const THUMB2 = (t) => canteenView(t, { noitems: true, items: picBoard("rubberTree", 574, BACKY + 26, 1, { sc: .94, id: "th" }) + TF(814, TY + 34, .75, shoe()) }, TCAM) + buddy("momo", 190, 800, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
const recapCard = (inner, lab) => `<g filter="url(#drop)"><rect x="-690" y="-360" width="1380" height="720" rx="44" fill="#E3C9A8"/><rect x="-674" y="-344" width="1348" height="688" rx="32" fill="url(#gPaper)"/></g>${tpill(-540, -360, "Part 1", 34, P.ink, P.sun, { w: 700, ls: 3 })}${inner}${lab ? tpill(0, 262, lab, 56, P.ink, "#fff", { w: 700 }) : ""}`;
const srcRow = (y, src, obj, lab, k = 1) => k < .02 ? "" : `<g transform="translate(0 ${y})" opacity="${n2(Math.min(1, k))}"><g transform="translate(-500 0)">${src}</g>${pline(-390, -70, -300, -70, 1, P.ink)}<g transform="translate(-190 0)">${obj}</g></g>` + TF(290, y - 80, Math.min(1.04, k), tpill(0, 0, lab, 46, "#fff", P.ink, { w: 700 }));
SC.lasttime = (t, s) => { if (location.search.includes("thumb")) return THUMB2(t); const L = "j201", tB = W(L, "glass") - .2, tR2 = W(L, "ceramic") - .15, tC = W(L, "three") - .2, sl = (t0) => eio((t - t0) / .55);
  const push = (t0) => 1 + .04 * clamp((t - t0) / 4), card = (x, t0, inner) => `<g transform="translate(${n2(960 + x)} 520) scale(${n2(push(t0))})">${inner}</g>`, q = .5 + .5 * Math.sin((t - tC) * 3.2);
  const A = recapCard(TF(0, -10, 2.3, spoon()) + pline(-330, -190, -230, -30, 1, P.ink) + pline(330, -190, 250, -40, 1, P.ink) + TF(-330, -200, 1, kindTag("OBJECT", "spoon", OBJC)) + TF(330, -200, 1, kindTag("MATERIAL", "metal", MATC)), "Objects are made of materials");
  const B = recapCard(srcRow(-40, TF(0, 0, 1.25, sandPile()), TF(0, 0, .82, glassJar()), "Glass is made from sand", spring(t, tB + .45, .45)) + srcRow(270, TF(0, 0, 1.25, clayLump()), TF(0, 0, .82, bowl()), "Ceramic is made from clay", spring(t, tR2, .45)));
  let out = bg("daystage");
  if (t < tB + .6) out += card(-2000 * sl(tB), s.t0, A);
  if (t >= tB && t < tC + .6) out += card(2000 * (1 - sl(tB)) - 2000 * sl(tC), tB, B);
  if (t >= tC) out += `<g transform="translate(${n2(960 + 2000 * (1 - sl(tC)))} 0)">` + TF(0, 990, 1.22 * push(tC), board7(t, { q: { wood: q, rubber: q, fabric: q } })) + TF(0, 190, 1, tpill(0, 0, "Three materials to go!", 64, P.sun, P.ink, { w: 700 })) + `</g>`;
  return out + HUD(t); };

/* ============ 3 · today's goals, the game ============ */
const tile3 = [["wood", -52], ["rubber", 0], ["fabric", 52]].map(([k, x]) => `<rect x="${x - 22}" y="-22" width="44" height="44" rx="10" fill="${MATK[k].col}" stroke="#fff" stroke-width="4"/>`).join("");
SC.goals = (t, s) => goals3(t, s, [["Wood, rubber and fabric", TF(0, 0, 1.1, tile3)], ["Where each one comes from", TF(0, 38, 1.5, miniTree())], ["Count the parts", TF(0, 36, .3, shoe())]], ["j311", "j312", "j313", "j314"], "basil");
SC.game = (t, s) => gameScene(t, s, "j301", false);

/* ============ 4 · wood: the bench and the pencil; wood comes from trees ============ */
const CAMB = [1.8, 420, 1130];
SC.wood = (t, s) => { const L = "j401", e = eio((t - s.t0) / 1.0), cam = [lerp(CAMW[0], CAMB[0], e), lerp(CAMW[1], CAMB[1], e), lerp(CAMW[2], CAMB[2], e)], tB = W(L, "bench") - .15, tP = W(L, "pencil") - .2;
  return view2(t, { glow: { pencil: pulse(t, tP, .1, 1.6) }, front: benchNear() + `<path d="M190 986 H1730 L1806 1030 H114z" fill="${P.sun}" opacity="${n2(.4 * pulse(t, tB, .1, 1.2))}"/>` }, cam)
    + (t >= tB ? ltag(t, tB, 1000, 760, "made of wood", gx(CAMB, 760), gy(CAMB, 1004), { size: 44, fill: MATK.wood.col, ink: "#fff" }) : "") + (t >= tP ? ltag(t, tP, 400, 420, "your pencil", gx(CAMB, QX.pencil), gy(CAMB, TY + 6), { size: 40 }) : "")
    + buddy("momo", 1700, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .15, poses: [[s.t0, "pointing"], [tP, "cheer"], [tP + 1.4, "sit"]], nohop: true }) + HUD(t); };
const teach2 = (t, o, cam = [1.03, 900, 640]) => view2(t, o, cam) + boardAt(t, ...BRDT);
SC.trees = (t, s) => { const a = "j402", b = "j403", c = "j404", tA = s.t0 + .1, tB = LT(b) - .3, tC = LT(c) - .25, [ax, ad] = slideX(t, tA, .7, 2500, 1330, BACKY), [bx, bd] = slideX(t, tB, .7, 2500, 1660, BACKY);
  const back = ad + picBoard("trees", ax, BACKY, 1, { sc: .9, id: "t" }) + (t >= tB ? bd + picBoard("planks", bx, BACKY, 1, { sc: .9, lab: "long, flat planks", size: 36, id: "t2" }) : "");
  return teach2(t, { glow: { pencil: .25 }, back: back + (t >= tC ? picBoard("book", 1010, BACKY, spring(t, tC, .45), { sc: .62, lab: "paper", size: 46, id: "t3" }) : "") })
    + bookCaption(t, a, "Wood comes from the trees in fields and forests.", 170, { size: 52, t1: tC - .1 }) + sPip(t, { in: s.t0 + .1 }) + sBasil(t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [tileT("wood"), "cheer"]], nohop: true }) + HUD(t); };

/* ============ 5 · Round 1: where do the white drops come from? ============ */
const CAMSHOE = [1.7, 700, 800];
SC.r1 = (t, s) => { const tL = LT(L1), a = "j501", tSo = W(a, "sole") - .2;
  return lockN(t, { cards: ["A cow", "A tree", "A rock"], tag: "white drops", icons: [TF(0, 0, 1.0, cowIcon(t)), TF(0, -4, 1.1, treeIcon()), TF(0, -2, 1.1, rockIcon())], q: "Where do the white drops come from?", tq: W(L1, "where") - .1, tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "j503", tin: W(L1, "where") - .3,
    obj: (tt) => TF(430, 470, 1, dropsDisc(tt, 166, "rg")), picks: [{ who: "momo", id: "j504", word: "1", x: true }, { who: "pip", id: "j505", word: "2" }, { who: "basil", id: "j506", word: "2" }],
    react: [[LE("j504") + .1, "momo", "thinking"], [LE("j505") + .1, "pip", "pointing"], [LE("j506") + .1, "basil", "cheer"]],
    pre: (tt) => { if (tt >= tL - .3) return wipe(tt, tL - .04, P.indigo, 430, 470); const e = eio((tt - s.t0) / 1.0), cam = [lerp(CAMW[0], CAMSHOE[0], e), lerp(CAMW[1], CAMSHOE[1], e), lerp(CAMW[2], CAMSHOE[2], e)], gl = tt >= tSo ? .55 + .45 * Math.sin((tt - tSo) * 4) : 0;
      return view2(tt, { shoeO: { sole: gl } }, cam) + (tt >= tSo ? ltag(tt, tSo, 420, 980, "the sole", gx(CAMSHOE, QX.shoe - 90), gy(CAMSHOE, TY - 8), { size: 44 }) : "") + boardAt(tt, ...SBRD2)
        + buddy("pip", 1730, 1060, 200, tt, { aura: true, flip: true, in: s.t0 + .15, poses: [[s.t0, "pointing"], [s.t0 + 2, "sit"]] }) + wipe(tt, tL - .04, P.indigo, 430, 470); } }); };
const SBRD2 = [1180, 1066, .46];

/* ============ 6 · be a drop of sap: the dive (the journey is SC.shrink in shrink.js) ============ */
SC.waitw = (t, s) => { const L = "j601", dive = ei((t - (s.t1 - .6)) / .6), tP = W(L, "be") - .2, DX = 1300, DY = 520, k = spring(t, s.t0 + .2, .5), z = 1 + 9 * dive;
  return `<g transform="translate(${DX} ${DY}) scale(${n2(z)}) translate(${-DX} ${-DY})">${view2(t, { shoeO: { sole: .6 } }, CAMSHOE)}${pline(DX - 150, DY + 110, gx(CAMSHOE, QX.shoe + 60), gy(CAMSHOE, TY - 6), k)}${TF(DX, DY, k, dropsDisc(t, 190, "ww"))}</g>`
    + OP(1 - dive, buddy("basil", 240, 1056, 220, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [s.t0 + 1.6, "sit"]] }) + (t >= tP ? TF(700, 250, spring(t, tP, .45), tpill(0, 0, "Be a drop of sap!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#FFFFFF", DX, DY); };

/* ============ 7 · the reveal: rubber ============ */
SC.reveal = (t, s) => { const a = "j701", e = eo((t - s.t0) / 1.0), cam = [lerp(3.4, 1.5, e), lerp(QX.shoe, 760, e), lerp(TY - 10, 800, e)], tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, [bx, bd] = slideX(t, tA + .1, .7, 2600, 1160, BACKY + 20);
  return view2(t, { tee: false, back: t >= tA + .1 ? bd + picBoard("rubberTree", bx, BACKY + 20, 1, { sc: .95, t, id: "rv" }) : "" }, cam) + TF(1620, 700, .62 * spring(t, s.t0 + .5, .45), ansCard(2, "A tree", { lit, icon: TF(0, -4, 1.1, treeIcon()) }))
    + buddy("momo", 230, 1056, 230, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "surprised"], [tA + 1.3, "cheer"]] }) + buddy("pip", 470, 1060, 170, t, { aura: true, tag: false, in: s.t0 + .6, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.8, "sit"]], nohop: true }) + wipe(t, s.t0, "#FFF8EA") + HUD(t); };
const USES = [["boots", "rain boots"], ["tyre", "bicycle tyre"], ["bands", "rubber bands"], ["ball", "ball"]];
SC.mark1 = (t, s) => { const b = "j703", tO = W(b, "oil") - .5, tT = tileT("rubber"), tU = MK("uses_rubber") + .5, tc = W("j704", "one") - .1;
  return markScene(t, s, { id: b, sayId: "j702", who: "basil", n: "1 of 2", text: "Rubber can come from the sap of a rubber tree. It can also be made by man using oil from the ground.", keys: ["rubber", "sap", "tree.", "oil", "ground."], size: 56, y: 176,
    extra: picBoard("oil", 800, 1066, spring(t, tO, .45) * (1 - ramp(t, tU - .3, .25)), { sc: .6, id: "mo" }) + (t >= tO + .2 && t < tU ? TF(800, 822, spring(t, tO + .2, .4) * (1 - ramp(t, tU - .3, .25)), tpill(0, 0, "or made by man, using oil", 32, "#fff", P.ink, { w: 700 })) : "")
      + USES.map(([p, lab], i) => picBoard(p, 700 + i * 196, 1016, spring(t, tU + i * .18, .45), { sc: .52, lab, size: 54, t, id: "us" + i })).join("")
      + (t >= tT - .5 ? TF(1640, 1066, spring(t, tT - .5, .45), `<g transform="scale(.34)">${board7(t)}</g>`) : "") + coin(t, tc, 1700, 760, "+1", "if you showed two fingers") }); };

/* ============ 8 · fabric; Round 2: where does cotton come from? ============ */
const CAMT = [1.6, 1000, 800];
SC.fabric = (t, s) => { const a = "j801", b = "j802", e = eio((t - s.t0) / 1.0), cam = [lerp(CAMW[0], CAMT[0], e), lerp(CAMW[1], CAMT[1], e), lerp(CAMW[2], CAMT[2], e)], tW = MK("kw_fabric") + KWHOLD + .1, tT = W(a, "t-shirt") - .2;
  return view2(t, { glow: { tee: pulse(t, tT, .1, 1.4) } }, cam) + (t >= tW ? pline(620, 520, gx(CAMT, QX.tee - 60), gy(CAMT, TY - 70), ramp(t, tW, .2)) + TF(540, 440, spring(t, tW, .5), weave(150, "fb")) + TF(540, 640, spring(t, tW + .2, .4), tpill(0, 0, "woven threads", 36, "#fff", P.ink, { w: 700 })) : "")
    + boardAt(t, 1560, 1066, .44) + bookCaption(t, b, "Fabric is a material that can come from animals or plants.", 170, { size: 48, keys: ["animals", "plants."] }) + buddy("momo", 200, 1056, 210, t, { aura: true, in: s.t0 + .15, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + HUD(t); };
// the T-shirt's collar label, turned to the camera (the ring picture)
const labelRing = (tt) => `<g clip-path="url(#cRing)"><rect x="250" y="290" width="360" height="360" fill="#F4F6FA"/><rect x="250" y="290" width="360" height="360" fill="url(#cWeave)"/><path d="M250 330 Q430 470 610 330 V290 H250z" fill="#D5DCEA"/><path d="M250 330 Q430 470 610 330" fill="none" stroke="#2EA3A0" stroke-width="26"/><path d="M250 330 Q430 470 610 330" fill="none" stroke="#57C4BE" stroke-width="7" stroke-dasharray="6 10"/>
  <g transform="translate(430 500) rotate(-3)"><g filter="url(#dropS)"><rect x="-128" y="-66" width="256" height="132" rx="10" fill="#fff" stroke="#9AA6C0" stroke-width="4"/></g><path d="M-116 -54 H116" stroke="#9AA6C0" stroke-width="3" stroke-dasharray="8 6"/>${T(0, 0, "100%", 50, P.ink)}${T(0, 46, "cotton", 46, P.ink)}</g></g>`;
SC.r2 = (t, s) => lockN(t, { cards: ["An animal", "A plant"], tag: "the T-shirt’s label", q: "Where does cotton come from?", tq: W(L2, "where") - .1, tc: [W(L2, "one"), W(L2, "two", 1)], ring0: MK("ring0_r2"), dur: 5, lock: "j804",
  obj: labelRing, picks: [{ who: "basil", id: "j805", word: "1", x: true }, { who: "momo", id: "j806", word: "2" }, { who: "pip", id: "j807", word: "2" }],
  react: [[LE("j805") + .1, "basil", "surprised"], [LE("j806") + .1, "momo", "pointing"], [LE("j807") + .1, "pip", "cheer"]] });
// a source and an object on one board, joined by one plain line
const half = (inner, x, id) => `<clipPath id="hf_${id}"><rect x="-118" y="-118" width="236" height="236" rx="18"/></clipPath><g transform="translate(${x} 0)"><g clip-path="url(#hf_${id})"><g transform="scale(.82)">${inner}</g></g><rect x="-118" y="-118" width="236" height="236" rx="18" fill="none" stroke="#C9D2E8" stroke-width="5"/></g>`;
const pairPic = (src, obj, id, tt = 0) => `<rect x="-300" y="-200" width="600" height="400" fill="#FFF8EA"/>` + half(PIC[src](tt), -138, id + "a") + half(obj, 138, id + "b") + `<path d="M-30 0 H30" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><circle cx="-30" cy="0" r="7" fill="${P.ink}"/><circle cx="30" cy="0" r="7" fill="${P.ink}"/>`;
const teePic = () => pbg("#DDF4FF", "#C4E6F7", 100) + TF(0, 110, .9, tshirt());
SC.r2ans = (t, s) => { const a = "j808", j = "j810", tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tw_ = [W(a, "cotton") - .15, W(a, "wool") - .15, W(a, "silk") - .15], tc = W("j809", "one") - .1;
  const rows = [["cotton", teePic(), "cotton: a plant"], ["sheep", PIC.sweater(), "wool: sheep"], ["cocoon", PIC.scarf(), "silk: a kind of caterpillar"]];
  return bg("daystage") + rows.map(([src, obj, lab], i) => { const k = spring(t, tw_[i], .45); return k < .02 ? "" : TF(330 + i * 470, 800, .84 * k * (1 + .04 * pulse(t, tw_[i] + .3, .1, .8)), wboard(pairPic(src, obj, "pp" + i, t), 520, 260, "pr" + i, { lab, size: 40 })); }).join("")
    + TF(1700, 600, .6 * spring(t, s.t0 + .15, .45), ansCard(2, "A plant", { lit })) + boardAt(t, 1300, 1066, .42)
    + buddy("basil", 170, 1066, 200, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [W(a, "wool") - .1, "oops"], [W(a, "wool") + 1.2, "sit"], [LE(j) + .1, "cheer"]], nohop: true }) + say(j, 600, 890, t, { size: 44, tail: -300, maxW: 640 }) + buddy("momo", 520, 1066, 150, t, { aura: true, tag: false, in: s.t0 + .3, poses: [[s.t0, "sit"], [tA, "cheer"], [tA + 1.6, "sit"]], nohop: true })
    + coin(t, tc, 960, 330, "+1", "if you showed two fingers") + HUD(t); };

/* ============ 9 · the Showdown: Pip's notes; count the parts ============ */
// Pip's notes on a small easel; 960 x 640; origin = the middle of the easel's feet
function pipNotes(t, o = {}) { const lit = o.lit || [0, 0, 0], rub = o.rub || 0, wr = o.write === undefined ? 1 : o.write, A = "A school shoe is made of one material.", B = "A school shoe is made of four materials.";
  const rows = [["Wood comes from trees.", TF(0, -8, .9, treeIcon())], ["Glass is made from sand.", TF(0, 34, .28, glassJar())], [A, TF(0, 26, .2, shoe())]]; let s = "";
  rows.forEach(([txt, pic], i) => { const y = -610 + i * 150, fx = i === 2 && (o.fixing || o.fixed); s += `<g transform="translate(0 ${y})">${lit[i] > .05 ? `<rect x="-440" y="-64" width="880" height="128" rx="24" fill="${P.sun}" opacity="${n2(.55 * lit[i])}"/>` : ""}<g transform="translate(-390 0) scale(${n2(1 + .18 * (o.badge || [0, 0, 0])[i])})"><circle r="38" fill="${P.pip}"/>${T(0, 17, i + 1, 50, "#fff")}</g>
    ${fx ? `<text x="-326" y="14" font-family="Fredoka" font-weight="600" font-size="36" fill="${P.ink}" opacity="${n2(1 - rub)}">${esc(A)}</text><text x="-326" y="14" font-family="Fredoka" font-weight="600" font-size="36" fill="#1F8A4C" style="clip-path:inset(-30px ${n2(100 - 100 * wr)}% -30px 0)">${esc(B)}</text>` : `<text x="-326" y="14" font-family="Fredoka" font-weight="600" font-size="36" fill="${P.ink}">${esc(txt)}</text>`}
    <g transform="translate(412 0)">${pic}</g>${i === 2 && o.x ? TF(-456, 0, o.x, xBadge(22)) : ""}</g><path d="M-430 ${y + 74} H430" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".4"/>`; });
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-90 -400 M200 0 L90 -400 M0 0 V-300" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-330" y="-176" width="660" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-490" y="-810" width="980" height="640" rx="26" fill="url(#gPaper)" stroke="${P.pip}" stroke-width="8"/></g>${T(0, -716, "Pip’s notes: materials", 54, P.ink)}${s}${o.tick ? TF(430, -250, o.tick, tickBadge(40)) : ""}`; }
const CAMSH = [.92, 960, -140], NOTES = [1190, 1068, .76], SHX = 590;
const showView = (t, o = {}) => view2(t, { pencil: false, tee: false, shoeX: SHX, liz2: o.liz }, CAMSH) + TF(NOTES[0], NOTES[1], NOTES[2], pipNotes(t, o.notes || {}));
SC.show = (t, s) => { const a = "j901", b = "j902", r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tLz = r0 + 1;
  const tr = [W(a, "one"), W(a, "two"), W(a, "three")], tcn = [W(b, "one"), W(b, "two"), W(b, "three")], tM = LT("j904"), tB = LT("j905"), tO = LE("j905") + .1;
  const lit = [0, 1, 2].map((i) => t < LT(b) ? (t >= tr[i] - .1 && t < (tr[i + 1] || LE(a)) - .1 ? 1 : 0) : 0), badge = [0, 1, 2].map((i) => Math.max(pulse(t, tcn[i], .04, .5), t >= r0 && t < bell ? (Math.floor((t - r0) / .5) % 3 === i ? .5 + .5 * rs.tick : 0) : 0));
  const nf = t >= tcn[2] - .1 ? 3 : t >= tcn[1] - .1 ? 2 : 1, ringOn = t >= tcn[0] - .3 && t < bell + .8, RX = 235, RY = 560;
  return showView(t, { liz: 1 - ramp(t, tLz, .5), notes: { lit, badge, x: spring(t, tM + .5, .4) } })
    + buddy("pip", 1750, 1060, 230, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "cheer"], [LT(a) - .12, "sit"], [LE(a) + .2, "thinking"], [tO, "oops"]], nohop: true }) + say(a, 1560, 330, t, { size: 40, tail: 150, maxW: 560 })
    + (ringOn ? OP(1 - ss(bell + .5, bell + .8, t), TF(RX, RY, spring(t, tcn[0] - .3, .4), `<g transform="translate(${-RX} ${-RY})">${ringTimer(RX, RY, t < r0 ? 1 : rs.frac, t < r0 ? 6 : rs.secs, t, { R: 128, sw: 22, tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(RX, RY + 60, .62, countHand(nf)) })}</g>`) + youPill(RX, RY - 178, 1.0) + tpill(RX, RY + 222, "line 1, 2 or 3?", 30, P.ink, "#fff")) : "")
    + (t >= bell + .9 ? buddy("momo", 150, 1062, 200, t, { aura: true, in: bell + .9, poses: [[bell + .9, "thinking"], [tM - .12, "sit"], [LE("j904") + .1, "pointing"]] }) + pickNum("momo", 290, 990, t, tM - .1, "3") + buddy("basil", 420, 1062, 180, t, { aura: true, in: bell + 1.0, poses: [[bell + 1, "arms_crossed"], [tB - .12, "sit"], [LE("j905") + .1, "cheer"]], nohop: true }) + pickNum("basil", 540, 990, t, tB - .1, "3")
      + say("j904", 300, 720, t, { size: 42, tail: -110, maxW: 520 }) + say("j905", 560, 700, t, { size: 42, tail: -100, maxW: 560 }) : "")
    + stamp(t, LT("j903") - .08, 700, 420) + bellIcon(t, r0) + HUD(t); };
const SH4 = [600, 720, 1.35], sp = (x, y) => [SH4[0] + x * SH4[2], SH4[1] + y * SH4[2]];
const PARTS = [["sole", "rubber", "rubber", [1000, 830], sp(150, -22)], ["top", "fabric", "fabric", [210, 470], sp(-170, -110)], ["rings", "metal", "metal", [1010, 610], sp(112, -89)], ["tips", "plastic", "plastic", [900, 330], sp(52, -156)]];
SC.count4 = (t, s) => { const a = "j906", b = "j907", p = "j908", tw_ = [W(a, "sole"), W(a, "top"), W(a, "rings"), W(a, "tips")].map((x) => x - .15), tm = [W(a, "rubber"), W(a, "fabric"), W(a, "metal"), W(a, "plastic")].map((x) => x - .1), tO = W(b, "one") - .1, tc = W("j909", "two") - .1;
  const so = {}, flash = {}; PARTS.forEach(([k, m], i) => { so[k] = t >= tw_[i] && t < (tw_[i + 1] || tO) ? .6 + .4 * Math.sin((t - tw_[i]) * 5) : 0; flash[m] = pulse(t, tm[i], .04, .6); });
  const rub = ss(LT(p) + .5, LT(p) + .95, t), wr = ss(LT(p) + .95, LE(p), t), fixing = t >= LT(p) + .4;
  return bg("daystage") + `<ellipse cx="${SH4[0]}" cy="${SH4[1] + 8}" rx="460" ry="30" fill="${P.ink}" opacity=".1"/>` + TF(SH4[0], SH4[1], SH4[2], shoe(so))
    + PARTS.map(([k, m, word, [lx, ly], [px, py]], i) => t < tw_[i] ? "" : pline(lx, ly, px, py, ramp(t, tw_[i], .2), P.ink) + TF(lx, ly, spring(t, tw_[i], .4) * (1 + .1 * pulse(t, tm[i], .03, .5)), `<g filter="url(#dropS)"><rect x="-46" y="-40" width="${n2(tw(word, 46, 700) + 130)}" height="80" rx="40" fill="${t >= tm[i] ? MATK[m].col : "#fff"}"/><circle cx="-4" cy="0" r="32" fill="url(#gSun)"/></g>${T(-4, 16, i + 1, 46, P.ink)}${t >= tm[i] ? T(46, 16, word, 46, "#fff", { a: "start" }) : ""}`)).join("")
    + boardAt(t, 420, 1066, .46, { flash }) + TF(NOTES[0] + 290, 1068, .58, pipNotes(t, { fixing, rub, write: wr, x: 1 - rub, tick: spring(t, LE(p) - .1, .45) }))
    + (fixing ? TF(1400, 440, spring(t, LT(p) + .4, .45), `<g transform="rotate(-1.5)"><g filter="url(#drop)"><rect x="-440" y="-56" width="880" height="112" rx="22" fill="url(#gPaper)" stroke="${P.pip}" stroke-width="7"/></g><circle cx="-386" cy="0" r="34" fill="${P.pip}"/>${T(-386, 16, 3, 46, "#fff")}<text x="-336" y="14" font-family="Fredoka" font-weight="600" font-size="40" fill="${P.ink}" opacity="${n2(1 - rub)}">A school shoe is made of one material.</text><text x="-336" y="14" font-family="Fredoka" font-weight="600" font-size="40" fill="#1F8A4C" style="clip-path:inset(-30px ${n2(100 - 100 * wr)}% -30px 0)">A school shoe is made of four materials.</text></g>`) : "")
    + (t >= tO ? TF(700, 170, spring(t, tO, .45) * (1 + .05 * pulse(t, W(b, "four") - .1, .03, .5)), `<g filter="url(#drop)"><rect x="-430" y="-62" width="860" height="124" rx="62" fill="${P.ink}"/></g>${T(0, 26, `1 object <tspan fill="${P.sun}">·</tspan> 4 materials`, 76, "#fff")}`) : "")
    + buddy("pip", 1810, 1066, 150, t, { aura: true, tag: false, flip: true, in: LT(p) - .3, poses: [[LT(p) - .3, "oops"], [LT(p) + .8, "sit"], [LE(p) + .1, "cheer"]], nohop: true }) + say(p, 1380, 270, t, { size: 44, tail: 200, maxW: 560 }) + coin(t, tc, 1240, 250, "+2", "if you showed three fingers") + HUD(t); };

/* ============ 10 · seven tiles (Mark Sentence 2 of 2), and the chant ============ */
SC.seven = (t, s) => { const L = "j1002", flash = {}; MAT.forEach((m) => { flash[m.k] = pulse(t, W(L, m.k) - .05, .04, .55); });
  return markScene(t, s, { id: L, sayId: "j1001", who: "momo", n: "2 of 2", text: "Wood, metal, ceramic, rubber, glass, plastic and fabric are some of the materials we use to make the things we need.", keys: ["wood,", "metal,", "ceramic,", "rubber,", "glass,", "plastic", "fabric"], size: 56, y: 176,
    extra: TF(1150, 1072, .7 * spring(t, s.t0 + .25, .5), board7(t, { flash })) }); };
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", board: (tt, flash) => TF(236, 1066, .37, board7(tt, { flash })) });

/* ============ 11 · the score hand and the lizard ============ */
SC.final = (t, s) => { const L = "j1101"; return finalScene(t, s, L, 2, [[s.t0, null, 1], [W(L, "four") - .1, null, 4]], TF(1250, 1062, .36, board7(t))); };
SC.liz = (t, s) => { const L = "j1102", tN = W(L, "ant") - .15; return `<rect width="1920" height="1080" fill="#C2B49E"/>` + lizReveal(t, s, L, view2(t, { pencil: false, tee: false, shoeX: SHX, liz2: 0 }, CAMSH), gx(CAMSH, LIZ2[0]), gy(CAMSH, LIZ2[1]), W(L, "where") - .1, "Where does wood come from?", 0, -170)
  + (t >= tN ? TF(960, 190, spring(t, tN, .45), tpill(0, 0, "The ant, under the wooden bench!", 50, P.sun, P.ink, { w: 700 })) : ""); };

/* ============ 12 · the dare for Episode 9 ============ */
SC.dare = (t, s) => { const a = "j1201", b = "j1202", c = "j1203", tR = W(a, "rubber") - .2, tS = W(a, "wooden") - .2, tQ = W(a, "which") - .15, tB = LT(b) - .1, tL = LT(c) - .1, DXs = [880, 1400];
  const brd = (name, i, t0, lab, col) => picBoard(name, DXs[i], 690, spring(t, t0, .45), { sc: .9, lab, size: 40, id: "d" + i }) + (t >= t0 + .25 ? TF(DXs[i] - 140, 376, spring(t, t0 + .25, .4), `<g transform="rotate(-8)">${tpill(0, 0, ["rubber", "wood"][i], 36, col, "#fff", { w: 700 })}</g>`) : "");
  return view2(t, { pencil: false, shoe: false, tee: false }, CAMW) + `<rect width="1920" height="1080" fill="#FFF8EA" opacity=".35"/>` + brd("band1", 0, tR, "a rubber band", MATK.rubber.col) + brd("stick", 1, tS, "a wooden ice-cream stick", MATK.wood.col)
    + [["The rubber band", 0], ["The ice-cream stick", 1]].map(([txt, i]) => TF(DXs[i], 922, .66 * spring(t, tQ + i * .2, .45), ansCard(i + 1, txt, { pulse: t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0 }))).join("")
    + TF(1140, 110, slamK(t - s.t0, .15), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-150" y="-44" width="300" height="88" rx="44" fill="${P.coral}"/><rect x="-142" y="-36" width="284" height="72" rx="36" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 20, "NEXT", 54, "#fff", { ls: 8 })}</g>`)
    + (t >= tB ? TF(1140, 212, spring(t, tB, .45), tpill(0, 0, "Snap it or bend it?", 64, P.ink, "#fff", { w: 700 })) : "") + (t >= tL ? TF(1140, 296, spring(t, tL, .45) * (1 + .03 * Math.sin(t * 8)), tpill(0, 0, "Lock in your answer!", 40, P.sun, P.ink, { w: 700 })) : "")
    + (t >= tQ ? TF(1660, 1036, spring(t, tQ + .4, .4), tpill(0, 0, "Just think. Do not break things!", 30, P.ink, "#fff", { w: 600 })) : "")
    + buddy("basil", 300, 1056, 360, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tQ, "arms_crossed"], [tB - .1, "sit"], [LE(b) + .1, "cheer"]], nohop: true }) + say(b, 420, 520, t, { size: 52, tail: -60 }) + HUD(t); };

/* ============ 14 · "Now you know!": the full board and the school shoe stand between the buddies ============ */
SC.nyk = (t, s) => nykScene(t, s, TF(640, 1044, .5, shoe()) + TF(950, 1046, .38, board7(t)));
})(); }
