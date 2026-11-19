// props.js: the Short's drawn things as SVG strings in the approved look (kit/style.js palette, gradients and filters;
// shapes after frames/frames.js). Everything is a pure function of its arguments. Rendered through kit/sprites.js.
(function () {
  const M = globalThis.Motion, { clamp, lerp } = M;
  const n = (v) => Math.round(v * 100) / 100;
  const rnd = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
  let P = null, K = null;
  const Props = { init(kit) { K = kit; P = kit.P; Props.P = P; } };
  const lg = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`;
  const rg = (id, stops, cx = .5, cy = .5, r = .5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</radialGradient>`;
  Props.defs = () => K.defs().replace("</defs>", `
    ${rg("xRoom", [[0, "#5A3F9E"], [.5, "#2B1F6B"], [1, "#120E2E"]], .5, .42, .8)}${lg("xSoil", [[0, "#8A5E3E"], [1, "#3A2420"]])}${lg("xGlass", [[0, "#BFE6FF", .2], [.5, "#fff", .04], [1, "#BFE6FF", .16]], 1, 1)}
    ${lg("xDesk", [[0, "#B9794F"], [1, "#5A3626"]])}${rg("xLamp", [[0, "#FFE9A8", .85], [1, "#FFE9A8", 0]])}${rg("xStage", [[0, "#4A36B0"], [.55, "#251B5C"], [1, "#120E2E"]], .5, .4, .78)}
    ${lg("xFloor", [[0, "#3B2A8C", 0], [1, "#0D0A24", .9]])}${lg("xWorm", [[0, "#F2CB8A"], [1, "#C9924E"]])}${lg("xCarrot", [[0, "#FFB05A"], [1, "#F27A1E"]])}${lg("xBean", [[0, "#9CC46A"], [1, "#5E8F3A"]], 1, 1)}
    ${lg("xDish", [[0, "#EAF4FF"], [1, "#B9C8E6"]])}${rg("xWin", [[0, "#3B2A8C"], [1, "#1A1340"]])}
    <filter id="rimS" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#FFE9A8" flood-opacity=".9"/></filter></defs>`);

  /* ---------- the wind-up robot: style.js robot() rebuilt as a rig. Origin = the floor between its feet. ----------
     o = { liftL, liftR: 0..1 foot lift;  slideL, slideR: px a foot is ahead;  rock: body lean in degrees;  bob: px up;
           head: head tilt in degrees (lags the body);  ant: antenna bend in degrees (lags the head);  arm: swing in degrees;
           key: the wind-up key's turn in radians;  sy: squash (1 = none);  blink: 0..1;  win: 0..1 the window on its front;
           coil: 0 = wound tight .. 1 = loose;  glow: 0..1 rim light } */
  Props.robot = (o = {}) => {
    const { liftL = 0, liftR = 0, slideL = 0, slideR = 0, rock = 0, bob = 0, head = 0, ant = 0, arm = 0, key = 0, sy = 1, blink = 0, win = 0, coil = 0 } = o;
    const L = "#147A72", sx = 1 / Math.sqrt(sy), c = Math.cos(key), eyeH = 22 * (1 - .9 * blink);
    const wing = (sgn) => `<ellipse cx="46" cy="${n(sgn * 20 * c)}" rx="15" ry="${n(3.5 + 16.5 * Math.abs(c))}"/>`;
    const foot = (x, lift, slide) => `<rect x="${n(x + slide)}" y="${n(60 - lift * 16)}" width="36" height="34" rx="10" fill="#FF8A66" stroke="#C4502E" transform="rotate(${n(-lift * 7)} ${n(x + slide + 18)} 94)"/>`;
    let panel;
    if (win > .01) {   // the see-through window: a loose (or tight) coil spring inside
      const u = clamp(coil), turns = lerp(4.6, 2.1, u), r1 = lerp(15, 21, u); let d = "";
      for (let i = 0; i <= 70; i++) { const k = i / 70, a = k * turns * Math.PI * 2 + .6, r = 3 + (r1 - 3) * Math.pow(k, lerp(1, .8, u)); d += `${i ? "L" : "M"}${n(Math.cos(a) * r - u * 2)} ${n(Math.sin(a) * r * lerp(1, .88, u) + u * 3)}`; }
      const s = n(clamp(win) * 1.0);
      panel = `<rect x="-40" y="-18" width="80" height="50" rx="12" fill="#fff" opacity="${n(.9 * (1 - win))}"/>
        <g transform="translate(0 7) scale(${s})"><rect x="-44" y="-30" width="88" height="60" rx="16" fill="url(#xWin)" stroke="#EEF2FA" stroke-width="5"/>
        <path d="${d}" fill="none" stroke="#7F89A8" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#EEF2FA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="${n(-u * 2)}" cy="${n(u * 3)}" r="4.5" fill="${P.sun}"/>
        <path d="M-34 -22 L-12 -22 L-30 14 L-34 14z" fill="#fff" opacity=".16"/></g>`;
    } else panel = `<rect x="-40" y="-18" width="80" height="50" rx="12" fill="#fff" opacity=".9"/><circle cx="-20" cy="7" r="9" fill="${P.coral}"/><circle cx="4" cy="7" r="9" fill="${P.sun}"/><rect x="20" y="-6" width="12" height="26" rx="4" fill="${P.blue}"/>`;
    return `<g transform="translate(0 -94)">
      <g stroke="${L}" stroke-width="5" stroke-linejoin="round">${foot(-46, liftL, slideL)}${foot(10, liftR, slideR)}</g>
      <g transform="translate(0 ${n(94 - bob)}) rotate(${n(rock)}) scale(${n(sx)} ${n(sy)}) translate(0 -94)">
        <g transform="translate(64 -10)"><rect x="0" y="-7" width="30" height="14" rx="5" fill="url(#gMetal)" stroke="#7F89A8" stroke-width="4"/>
          <g fill="url(#gSun)" stroke="#C98200" stroke-width="4" stroke-linejoin="round">${wing(-1)}${wing(1)}</g></g>
        <g stroke="${L}" stroke-width="5" stroke-linejoin="round">
          <rect x="-86" y="-22" width="26" height="56" rx="12" fill="url(#gMetal)" stroke="#7F89A8" transform="rotate(${n(arm)} -73 -16)"/>
          <rect x="-62" y="-38" width="124" height="106" rx="24" fill="url(#gBot)"/></g>
        ${panel}
        <g transform="rotate(${n(head)} 0 -44)">
          <g transform="rotate(${n(ant)} 0 -128)"><path d="M0-128 v-22" stroke="#7F89A8" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-158" r="11" fill="${P.coral}" stroke="#C4502E" stroke-width="4"/><circle cx="-3" cy="-161" r="3" fill="#fff" opacity=".6"/></g>
          <rect x="-52" y="-128" width="104" height="80" rx="22" fill="url(#gBot)" stroke="${L}" stroke-width="5"/>
          <rect x="-38" y="-112" width="76" height="46" rx="14" fill="${P.ink}"/>
          <rect x="-26" y="${n(-89 - eyeH / 2)}" width="18" height="${n(eyeH)}" rx="${n(Math.min(6, eyeH / 2))}" fill="#FFE27A"/><rect x="8" y="${n(-89 - eyeH / 2)}" width="18" height="${n(eyeH)}" rx="${n(Math.min(6, eyeH / 2))}" fill="#FFE27A"/>
          <path d="M-40-118 q40-12 80 0" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/></g>
      </g></g>`;
  };
  Props.robotBox = [-150, -290, 300, 310];

  // a mealworm: nine soft segments along a gentle curve. bend: -1..1 curl; origin = its middle on the ground
  Props.mealworm = (bend = .25, len = 150) => { let s = ""; const N = 10;
    for (let i = 0; i < N; i++) { const k = i / (N - 1) - .5, x = k * len, y = -12 - Math.sin((k + .5) * Math.PI) * 10 * bend - Math.abs(k) * 6 * Math.abs(bend), r = 13 - Math.abs(k) * 7;
      s += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(len / N * .68)}" ry="${n(r)}" fill="url(#xWorm)" stroke="#9A6A2E" stroke-width="3.5"/>`; }
    return s + `<circle cx="${n(len / 2 - 4)}" cy="${n(-14 - 3 * Math.abs(bend))}" r="2.6" fill="${P.ink}"/><path d="M${n(-len / 2 + 14)} -21 q${n(len / 2 - 14)} -9 ${n(len - 28)} 0" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".4"/>`; };
  // a shallow dish of oats
  Props.oats = () => { const r = rnd(7); let fl = ""; for (let i = 0; i < 26; i++) { const x = -92 + r() * 184, y = -20 - r() * 16 * (1 - Math.abs(x) / 110); fl += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(9 + r() * 5)}" ry="${n(4 + r() * 2)}" fill="${["#F3DDB0", "#E8C98E", "#FBEBC8"][i % 3]}" stroke="#C9A566" stroke-width="2" transform="rotate(${n(r() * 60 - 30)} ${n(x)} ${n(y)})"/>`; }
    return `<ellipse cx="0" cy="-2" rx="128" ry="20" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><path d="M-120 -24 Q-110 4 -70 6 H70 Q110 4 120 -24z" fill="url(#xDish)" stroke="#7F89A8" stroke-width="5" stroke-linejoin="round"/>${fl}<path d="M-108 -14 Q-100 0 -70 1" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>`; };
  // a carrot slice (a thick coin lying on the soil). bites: 0, 1 or 2 round bites taken out of its rim
  Props.carrot = (bites = 0, id = "cb") => { const cut = [[52, -34, 23], [30, -58, 19]].slice(0, bites).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join("");
    return `<mask id="${id}"><rect x="-90" y="-110" width="180" height="130" fill="#fff"/>${cut}</mask><ellipse cx="0" cy="0" rx="74" ry="12" fill="${P.ink}" opacity=".25" filter="url(#b4)"/>
      <g mask="url(#${id})"><ellipse cx="0" cy="-22" rx="66" ry="30" fill="#D9620F" stroke="#B4500C" stroke-width="5"/><ellipse cx="0" cy="-34" rx="66" ry="30" fill="url(#xCarrot)" stroke="#B4500C" stroke-width="5"/>
      <ellipse cx="0" cy="-34" rx="38" ry="16" fill="#FFC982" opacity=".8"/><path d="M0 -34 L-40 -44 M0 -34 L34 -50 M0 -34 L30 -20 M0 -34 L-28 -20" stroke="#FFE0B0" stroke-width="3" opacity=".7"/>
      <path d="M-46 -50 q40 -16 86 -2" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".45"/></g>`; };
  // a green bean (mung bean): a small oval seed with a pale scar
  Props.bean = () => `<ellipse cx="2" cy="2" rx="62" ry="12" fill="${P.ink}" opacity=".3" filter="url(#b4)"/><ellipse cx="0" cy="-34" rx="56" ry="38" fill="url(#xBean)" stroke="#3F6A28" stroke-width="5" transform="rotate(-12 0 -34)"/>
    <rect x="-9" y="-50" width="20" height="9" rx="4.5" fill="#F3F6DC" stroke="#3F6A28" stroke-width="2.5" transform="rotate(-12 0 -34)"/><path d="M-36 -52 q20 -16 46 -12" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/>`;

  /* ---------- the 30-day box, re-staged for a tall frame. The box: x 70..1010, y 560..1290, on a desk. ---------- */
  const BX = 70, BY = 560, BW = 940, BH = 730, FLOOR = 1180; Props.BOX = { BX, BY, BW, BH, FLOOR };
  // far plane: the bedroom out of focus (bokeh). Drawn larger than the frame so the camera can move. vb -160 -160 1400 2240
  Props.boxFar = (night = 0) => { const r = rnd(17);
    return `<rect x="-160" y="-160" width="1400" height="2240" fill="url(#xRoom)"/>
    <g filter="url(#b30)"><rect x="-40" y="230" width="430" height="560" rx="20" fill="${night ? "#1B2A6B" : "#3C5FB8"}" opacity=".6"/><circle cx="940" cy="380" r="170" fill="${night ? "#8FA4E8" : "#FFB86B"}" opacity="${night ? .28 : .55}"/><rect x="700" y="900" width="600" height="260" rx="40" fill="#2EC4B6" opacity=".3"/></g>
    ${night ? `<g filter="url(#b4)"><circle cx="170" cy="420" r="46" fill="#FFF6D0" opacity=".8"/></g>` : ""}
    ${Array.from({ length: 26 }, () => { const rr = 14 + r() * 44; return `<circle cx="${n(r() * 1300 - 110)}" cy="${n(180 + r() * 900)}" r="${n(rr)}" fill="${["#FFE9A8", "#FFB38A", "#B9A6FF", "#7FE3C4"][Math.floor(r() * 4)]}" opacity="${n((.1 + r() * .22) * (night ? .5 : 1))}" filter="url(#b4)"/>`; }).join("")}
    <rect x="-160" y="1392" width="1400" height="700" fill="url(#xDesk)"/><rect x="-160" y="1392" width="1400" height="8" fill="#FFD9A8" opacity=".5"/>`; };
  // mid plane, behind the things: lamp glow, the inside of the box, the soil
  Props.boxBack = () => { const r = rnd(5);
    return `<clipPath id="xBoxC"><rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="34"/></clipPath>
    <ellipse cx="540" cy="900" rx="640" ry="560" fill="url(#xLamp)" opacity=".4"/>
    <ellipse cx="540" cy="1322" rx="520" ry="34" fill="${P.ink}" opacity=".5" filter="url(#b10)"/>
    <g clip-path="url(#xBoxC)"><rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" fill="#E9F4FF" opacity=".14"/>
      <ellipse cx="540" cy="760" rx="400" ry="240" fill="#FFF3B8" opacity=".28" filter="url(#b30)"/>
      <path d="M${BX} 1108 Q250 1086 420 1102 Q620 1122 800 1098 Q920 1084 ${BX + BW} 1104 V${BY + BH} H${BX}z" fill="url(#xSoil)"/>
      <path d="M${BX} 1108 Q250 1086 420 1102 Q620 1122 800 1098 Q920 1084 ${BX + BW} 1104" fill="none" stroke="#B9835A" stroke-width="8" opacity=".7"/>
      ${Array.from({ length: 46 }, () => `<circle cx="${n(BX + r() * BW)}" cy="${n(1126 + r() * 150)}" r="${n(3 + r() * 6)}" fill="#2E1C1F" opacity=".45"/>`).join("")}
      ${Array.from({ length: 12 }, () => `<circle cx="${n(BX + r() * BW)}" cy="${n(1130 + r() * 140)}" r="${n(2 + r() * 3)}" fill="#E8C9A0" opacity=".5"/>`).join("")}</g>`; };
  // the clear box itself, in front of the things: glass, reflections, the teal lid with air holes
  Props.boxFront = () => `<rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="34" fill="url(#xGlass)"/>
    <rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="34" fill="none" stroke="#E9F4FF" stroke-width="9" opacity=".85"/>
    <path d="M${BX + 50} ${BY + 60} L${BX + 220} ${BY + 60} L${BX + 76} ${BY + 640} L${BX + 50} ${BY + 640}z" fill="#fff" opacity=".1"/><path d="M${BX + 256} ${BY + 60} L${BX + 300} ${BY + 60} L${BX + 150} ${BY + 640} L${BX + 108} ${BY + 640}z" fill="#fff" opacity=".07"/>
    <g filter="url(#dropS)"><rect x="${BX - 24}" y="${BY - 46}" width="${BW + 48}" height="64" rx="24" fill="#3FD0C3"/><rect x="${BX - 12}" y="${BY - 38}" width="${BW + 24}" height="18" rx="9" fill="#fff" opacity=".3"/></g>
    ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="${BX + 120 + i * 100}" cy="${BY - 6}" rx="16" ry="9" fill="${P.night}" opacity=".75"/>`).join("")}`;
  // near plane: one or two dark, soft shapes at the frame edge (a leaf, the corner of a school bag)
  Props.boxNear = () => `<g filter="url(#b10)" opacity=".93"><g transform="translate(1090 1500) rotate(-150)">${K.leaf(210, false, false).replace(/url\(#gLeaf\)/g, "#1B1440").replace(/#1F7F47|#D8F6C8/g, "#1B1440")}</g>
    <path d="M-160 1640 Q-40 1500 130 1560 Q250 1610 250 1760 V2080 H-160z" fill="#1B1440"/></g>`;

  // the lock-in stage (dark violet, a spotlight from above). vb -160 -160 1400 2240
  Props.stage = () => { const r = rnd(9);
    return `<rect x="-160" y="-160" width="1400" height="2240" fill="url(#xStage)"/>
    <g opacity=".5">${Array.from({ length: 46 }, () => `<circle cx="${n(r() * 1300 - 110)}" cy="${n(r() * 1400)}" r="${n(1.5 + r() * 3)}" fill="#fff" opacity="${n(.15 + r() * .4)}"/>`).join("")}</g>
    <g style="mix-blend-mode:screen" opacity=".55"><path d="M400 -160 H680 L1000 1300 H80z" fill="#FFE9A8" opacity=".3" filter="url(#b30)"/></g>
    <rect x="-160" y="1380" width="1400" height="700" fill="url(#xFloor)"/>`; };
  Props.stageGlow = () => `<ellipse cx="170" cy="1160" rx="330" ry="300" fill="${P.blue}" opacity=".3" filter="url(#b60)"/><ellipse cx="840" cy="1160" rx="330" ry="300" fill="${P.orange}" opacity=".3" filter="url(#b60)"/>`;

  // icons for "it does not need water, food or air": small grey line icons in a paper chip
  Props.icon = (kind) => { const g = "#6E6A92"; const body = kind === "water" ? `<path d="M0 -30 C18 -6 22 6 22 14 a22 22 0 0 1 -44 0 C-22 6 -18 -6 0 -30z" fill="#C9D2E8" stroke="${g}" stroke-width="5" stroke-linejoin="round"/><path d="M-10 12 q2 10 12 12" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>`
    : kind === "food" ? `<path d="M-30 -2 H30 Q28 26 0 28 Q-28 26 -30 -2z" fill="#C9D2E8" stroke="${g}" stroke-width="5" stroke-linejoin="round"/><path d="M-24 -4 Q-14 -26 0 -24 Q14 -26 24 -4" fill="#fff" stroke="${g}" stroke-width="5" stroke-linejoin="round"/><path d="M-10 -12 l3 -3 M2 -15 l3 3 M12 -10 l3 -3" stroke="${g}" stroke-width="3" stroke-linecap="round"/>`
    : `<g fill="none" stroke="${g}" stroke-width="6" stroke-linecap="round"><path d="M-30 -12 H8 a10 10 0 1 0 -10 -10"/><path d="M-30 4 H20 a11 11 0 1 1 -11 11"/><path d="M-30 20 H-6"/></g>`;
    return `<g filter="url(#dropS)"><circle r="50" fill="${P.paper}"/></g>${body}`; };

  globalThis.Props = Props;
})();
