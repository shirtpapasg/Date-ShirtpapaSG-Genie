// p2.js: PART 2, "It Is WHITE. So Can Light Pass Through a Wooden Door?": opaque, transparency, "some plastics".
// Segments 1-16 of p3_ep11_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, game, goals read by Basil, round card, the
// lock-in with its two clue labels on top of the ring, Mark Sentences read by the buddy, the book strips, the board OUR TORCH TEST as a
// functional placeholder (row 3, the two boxes, the heading TRANSPARENCY), the LOOK-CLOSER frame, the tip card, chant, score hand, read-along,
// "Now you know!"); every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame).
// STAGE 2 (Fable) draws them: see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j506", "one") - .1, 1, 1]);
SCORE.push([W("j1106", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Transparency";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each.
   (TRANSPARENT and TRANSLUCENT are NOT put on Part 2's shelf: it holds only this part's new words.) */
SC.lasttime = (t, s) => { const L = "j101", tb = [s.t0, W(L, "frosted") - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Transparent: most light", "Translucent: only some light", "The white door: how much light?"];
  const what = ["the torch, the clear glass and the bright spot on the card (Part 1's look-closer, the side view)", "the torch, the frosted glass and the soft, dim glow on the card", "the white door in the holder, the torch OFF, a big ? on the door; the board with two rows filled"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="410" y="200" width="1100" height="640" rx="36" fill="url(#gPaper)"/></g>${tpill(960, 250, "PICTURE " + (i + 1) + " · STAGE 2: TO DRAW", 26, P.coral, "#fff", { w: 700 })}${wrap(what[i], 40, 960, 600).map((l, j) => T(960, 420 + j * 56, l, 40, P.ink, { w: 600 })).join("")}</g>`
      + (i === 2 ? TF(960, 830, .4, torchBoard(t, { glow: 2 })) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), i < 2 ? ansTag(labs[i], i, 50) : tpill(0, 0, labs[i], 50, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the corridor of an HDB block at night), the game and the hidden moth; 3 · goals (Basil reads) */
SC.place = (t, s) => phScene(t, s, "2 · The common corridor of an HDB block at night (no voice)", ["The flat's white wooden front door (closed), its metal gate folded open, a rubber doormat, a shoe rack (a metal tray on it), potted plants; right of the door a clear glass window (the lit living room seen clearly); left of it a frosted window glowing softly (blurry shapes); the ceiling lamp with the little MOTH fluttering by it (every wide corridor shot); the parapet, the night sky, the lit windows of the block opposite.",
  "A small folding table by the door: the torch on its TORCH MARK, the holder with the white door piece, OUR CARD, the rack; the board OUR TORCH TEST beside it (two rows filled). Buddies in their discs. Pill: The corridor of an HDB block, Singapore. Small print upper left (torchRule, wired)."]) + torchRule(t, s.t0 + .3);
SC.game = (t, s) => gameScene(t, s, "j201", false);
SC.goals = (t, s) => goals3(t, s, [["Opaque", ""], ["What transparency is", ""], ["Transparent, translucent, opaque", ""]], ["j301", "j302", "j303", "j304"], "basil");

/* 4 · Round 1: the white wooden door (clue labels wood · painted white on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => { const tq = W(L1, "wooden") - .1; return t < tq ? "" : ["wood", "painted white"].map((l, i) => TF(430 + (i ? 110 : -120), 470 - RING_R - 14, spring(t, tq + i * .2, .4), tpill(0, 0, l, 32, "#fff", P.ink, { w: 700 }))).join(""); };
SC.r1 = (t, s) => lockN(t, { cards: ["Most", "Only some", "None"], labels: r1labels, q: "How much light will pass through?", tq: W(L1, "how") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "j402",
  obj: ringPH("white door + torch"), picks: [{ who: "momo", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "3" }, { who: "pip", id: "j405", word: "3" }],
  react: [[LE("j403") + .1, "momo", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] the torch on the white wooden door; the answer */
SC.lcdoor = (t, s) => lcPH(t, s, { title: "The torch on the white door: the bright front, nothing behind", v: "v_door", verdict: VSTYLE("NO LIGHT PASSES THROUGH", 2), fx: 960, fy: 600,
  setNote: "the corridor's test table from the side: the torch on its mark (off), the white door piece in the holder, the card behind",
  beats: [["on3", "torch on: the front is bright"], ["behind", "the camera slides behind the door"], ["off3", "torch off; camera swings to the front"], ["lift", "the door is lifted: the robot"], ["v_door", "verdict"]],
  notes: ["Torch, door and card fill the window; the corridor dims. MK on3: click; the beam reaches the door and ENDS there; the door's white front is brightly lit (a soft thud). Label the front is bright.",
    "MK behind: the camera slides slowly along the table to the far side of the door: no beam at all; the card looks the same as the rest of the dim corridor (only the crickets). Labels to the card: no bright spot · no glow. NO SHADOW is drawn or named.",
    "MK off3: torch off, corridor light up; the camera swings round to the door's front (its knob, nothing else); label We cannot see the robot. MK lift: an adult's hand lifts the door out for a moment: the robot is exactly where it was (tick-tick); the door goes back (tok). Verdict NO LIGHT PASSES THROUGH (white, dark-violet border and letters) at v_door."] });
SC.doorans = (t, s) => phScene(t, s, "5 · The answer is three: none!", ["Back to the round's cards: answer card 3 None glows. Momo: surprised pose, then a nod; she says j505 (cuttable last of all: if it goes, the tag White is only its colour shows instead). Coin +1 if you showed three fingers. Score 1 : 1 (SCORE, wired)."]);

/* 6 · Mark Sentence 1 (Pip): OPAQUE pops beside the card; row 3 (the door, the doormat, the metal tray); the book's strips */
SC.mark1 = (t, s) => markScene(t, s, { id: "j602", sayId: "j601", who: "pip", n: "1 of 2", text: "Some materials do not allow any light to pass through them. These materials are opaque.", keys: ["do", "not", "allow", "any", "light", "pass", "through", "opaque."], size: 60, y: 250, footer: FOOT,
  extra: stageNote("under the card: the white door with its bright front, the card behind it with no spot", 1040) });
SC.row3 = (t, s) => phScene(t, s, "6 · Row 3: NO LIGHT · OPAQUE; a rubber mat, a metal tray", ["MK row3: the white door's tile hops onto row 3 and OPAQUE is stamped (white, dark-violet border). MK mat: an adult's hands set the rubber doormat (in its frame) in the holder; torch on: its front lit, the card with no spot. MK tray: the metal tray from the shoe rack, the same (tags rubber · metal; the torch stays on its mark). Their tiles hop onto row 3.",
  "The book's two sentences on cream strips (wired, 3.5 s each); the three tiles light as Heart names rubber, wood, metal."])
  + bookCaption(t, "j604", "Rubber, wood and metal are opaque materials.", 120, { size: 46, keys: ["rubber,", "wood", "metal"] }) + bookCaption(t, "j604", "You cannot see objects placed behind opaque materials.", 215, { size: 46, off: 7, keys: ["cannot", "see", "placed", "behind"] })
  + TF(1500, 1060, .5, torchBoard(t, { glow: 2 })) + torchRule(t);

/* 7 · [LOOK CLOSER] three sheets, three cards (watched, not scored) */
SC.lcthree = (t, s) => lcPH(t, s, { title: "Three sheets, the same torch, three cards", v: "v_three", verdict: [`<tspan fill="#8FF0A4">MOST</tspan> · <tspan fill="#9FD8FF">ONLY SOME</tspan> · NONE`, P.violet, { plain: "MOST · ONLY SOME · NONE" }], fx: 960, fy: 600,
  beats: [["c1", "card 1: the bright spot"], ["c2", "card 2: the soft glow"], ["c3", "card 3: no spot, no glow"], ["bracket", "the bracket: How much light?"], ["v_three", "verdict"]],
  notes: ["The table seen from above and a little to the side; the corridor dims. Three small test lines, one above the other, each with the torch on its mark, a sheet and a card: the clear glass and the frosted glass as held pictures from Part 1, the white door live. Tags: clear glass · frosted glass · wooden door.",
    "The three cards light one after another as Heart speaks: MK c1 a bright spot (ting), MK c2 a soft glow (shh), MK c3 no spot and no glow (quiet). MK bracket: a plain bracket joins the three cards, label How much light?",
    "Verdict in three parts at v_three: MOST (green) · ONLY SOME (blue) · NONE (white). Stage 2: draw it as three pills in the three answer styles (ansTag) or keep this one pill with coloured words."] });

/* 8 · Mark Sentence 2 (Basil): TRANSPARENCY pops beside the card on "transparency"; the heading is stamped on the board */
SC.mark2 = (t, s) => markScene(t, s, { id: "j802", sayId: "j801", who: "basil", n: "2 of 2", text: "The transparency of a material refers to how much light can pass through it.", keys: ["transparency", "how", "much", "light", "can", "pass", "through"], size: 64, y: 250, footer: FOOT,
  extra: stageNote("under the card: the three cards in a row (bright spot, soft glow, nothing)", 1040) });
SC.heading = (t, s) => phScene(t, s, "8 · The board is complete: TRANSPARENCY", ["MK heading: the word TRANSPARENCY is stamped as a heading across the top of the board OUR TORCH TEST, above its three full rows (torchBoard below, functional; a stamp). The board centred between the discs."]) + TF(960, 1060, .62, torchBoard(t));

/* 9 · BE THE LIGHT OF THE LAMP (the first-person journey) */
SC.waitw = (t, s) => phScene(t, s, "9 · Be the light! (the glide in)", ["Pill Be the light! The camera glides to the clear window and through it into the lit living room, up to the ceiling lamp; a soft cream wipe at the scene end. The shelf slides aside (SHELF_HIDE)."]);
SC.shrink = (t, s) => phScene(t, s, "9 · BE THE LIGHT OF THE LAMP (first person, present tense)", ["MK lamp: you spread out from the ceiling lamp; the room below, warm and wide; the edges of the view glow softly. Tags You: light from the lamp · a flat at night. MK door: the inside of the white front door rushes up and fills the view; it lights up, bright, and the view stops there (soft thud). Tag wood · you cannot pass through.",
  "MK frost: a soft cream blink; a pale cloudy pane fills the view; part of the view goes on through it, dimmer; outside, the corridor is a blur of soft shapes. Tag frosted glass · only some pass through. MK clear: a soft cream blink; only a faint glint and a window frame; the frame slides past; the corridor is SHARP: parapet, plants, the night sky, the lit windows opposite. Tags clear glass · most pass through · out into the night. Calm pad, crickets."]);

/* 10 · Showdown: Pip's notes (double points) */
SC.show = (t, s) => phScene(t, s, "10 · SHOWDOWN: Pip's notes (ring0_show, 6 s)", ["Pip's notes on an easel on the ground between the discs: 1 A metal tray is opaque. (the tray) 2 This box is plastic, so it is transparent. (a cloudy lunch box: what is in it is only a soft blur) 3 Frosted glass is translucent. (the frosted sheet with its glow). Each line lights as Pip reads it. On the table, set down by an adult's hands: the real cloudy box and a clear box of the same shape.",
  "The YOU ring with a counting hand, 6 s; the three lines and drawings stay in view through the whole countdown. LOCKED IN! Momo 2 (pointing), Basil 2 (cheer); Pip oops. Model: ep10/p2.js SC.show (easel, ring, stamp, picks)."]);

/* 11 · [LOOK CLOSER] a clear plastic box and a cloudy plastic box; the two tiles, the strips, the fix, +2 */
SC.lcbox = (t, s) => lcPH(t, s, { title: "Two plastic boxes under the torch", v: "v_box", verdict: [`BOTH PLASTIC · <tspan fill="#8FF0A4">ONE TRANSPARENT</tspan>, <tspan fill="#9FD8FF">ONE TRANSLUCENT</tspan>`, P.violet, { plain: "BOTH PLASTIC · ONE TRANSPARENT, ONE TRANSLUCENT" }], fx: 960, fy: 600,
  setNote: "the corridor's test table: an adult's hands set the clear plastic box in the holder, on its side; the cloudy box waits beside it",
  beats: [["on4", "torch on: the clear box's bright spot"], ["swap", "the hands change the boxes"], ["split2", "before / after split"], ["v_box", "verdict"]],
  notes: ["Torch, box and card fill the window; the corridor dims. Tags plastic (on both boxes) · same torch · same place. MK on4: click; the beam goes through the clear box; a bright spot lands on the card (ting).",
    "MK swap: the hands change the boxes (two soft plastic toks; the torch stays on its mark): through the cloudy box only a soft, dim glow reaches the card (shh). MK split2: the frame splits: left the clear box and its bright spot, right the cloudy box and its soft glow; labels a bright spot · a soft glow.",
    "Both boxes empty and closed, the same shape and size, on their sides so the torch shines through two flat walls. Verdict in two parts (green, blue) at v_box: BOTH PLASTIC · ONE TRANSPARENT, ONE TRANSLUCENT."] });
SC.fix = (t, s) => { const L = "j1105", tTip = LE(L) - .8;
  return phScene(t, s, "11 · Some plastics: one material, two rows", ["The boxes' tiles hop low onto the board: the clear box onto MOST LIGHT, the cloudy box onto ONLY SOME LIGHT (torchBoard below). The book's two sentences on cream strips (wired, 3.5 s each; some plastics highlighted in both). On the easel line 2 is rubbed out and rewritten in green: This box is plastic, and it is translucent. The tip card (wired). Coin +2, score 3 : 1 (wired)."])
    + bookCaption(t, L, "Glass and some plastics are transparent.", 120, { size: 48, keys: ["some", "plastics"] }) + bookCaption(t, L, "Frosted glass and some plastics are translucent.", 215, { size: 48, off: 6, keys: ["some", "plastics"] })
    + (t >= tTip ? TF(560, 660, spring(t, tTip, .45), `<g filter="url(#drop)"><rect x="-330" y="-80" width="660" height="160" rx="30" fill="url(#gPaper)"/></g>${T(0, -14, "Do not go by the name.", 44, P.ink)}${T(0, 44, "How much light passes through?", 40, P.ink, { w: 600 })}`) : "")
    + TF(1500, 1060, .5, torchBoard(t)) + coin(t, W("j1106", "two") - .1, 1680, 400, "+2", "line 2") + torchRule(t); };

/* 12 · the chant: call and response (common.js chantScene); the board OUR TORCH TEST behind the buddies, each row flashing on its call */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 58, board: (tt, flash) => TF(250, 1066, .34, torchBoard(tt, { flash })) });

/* 13 · score hand, the moth (lizReveal in common.js) */
SC.final = (t, s) => { const L = "j1301"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => phScene(t, s, "13 · Did you spot the moth? (lizReveal in common.js)", ["A replay of the wide corridor with a ring round the little moth by the ceiling lamp; it flutters down, lands on the wall, opens its wings and waves a feeler. Pill: Tell someone at home! Use lizReveal(t, s, \"j1302\", view, x, y, tq, \"It was by the corridor lamp!\")."]);

/* 14 · the dare for Episode 12: a supermarket trolley (glass, metal, fabric). The three cards are wired (EP12 opens with these same boards and cards) */
const DRX = [560, 960, 1360];
SC.dare = (t, s) => { const a = "j1401", tQ = W(a, "which") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1;
  return phScene(t, s, "14 · The dare for Episode 12: a supermarket trolley", ["Three picture boards slide in low and stand side by side by the table, centred between the discs: the SAME supermarket trolley three times, each whole and unbroken, each with a big bag of rice beside it: one made of glass, one of metal, one of fabric. A big ? pops above them. Banner NEXT · Choosing materials! · Lock in your answer! Basil cheer (j1402, cuttable). A trolley's wheel squeak."])
    + ["Glass", "Metal", "Fabric"].map((txt, i) => TF(DRX[i], 690, .5 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 54, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + (t >= tQ ? TF(960, 560, spring(t, tQ, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="44" fill="url(#gSun)"/></g>${T(0, 23, "?", 68, P.ink)}`) : ""); };

/* 16 · "Now you know!": the board OUR TORCH TEST, complete (heading and three rows), centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(920, 1040, .62, torchBoard(t)), { bx: [200, 1715, 1375], hx: 470 });
})(); }
