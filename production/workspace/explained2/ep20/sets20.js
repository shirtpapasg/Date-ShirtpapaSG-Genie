// sets20.js: EP20's two real places (Stage 2, drawn 2026-11-23). The static parts are baked (bake.js -> bg/sci20.png, bg/kit20.png); the
// live parts (the fan, the plant, the light, the boards, the props, the hidden animal) are drawn every frame on top, in WORLD coordinates
// (1920 x 1080 at camera 1; cam = [z, cx, cy] as CAM / camPt / camOn).
// PART 1: a SCHOOL SCIENCE ROOM on a Monday after school (SR20): the window onto the school field (left), the class plant on the sill, the sink
// counter under it, the whiteboard with THE POLES BOARD (centre-left, about 45% of the frame high), the science poster, the fan's switch box,
// the bookshelf by the door, the door with its glass panel onto the corridor, the ceiling fan, the back lab bench with its stools tucked under,
// and the FRONT BENCH (where the props stand). Warm afternoon sunlight in long patches.
// PART 2: Pip's HDB flat that evening (KT20): the KITCHEN (the window at dusk with the laundry poles and the next block's lit windows, the
// curtain rail, the potted plant on the sill, the sink counter, the ceiling light, the white fridge with WHICH POLES FACE?, the small table)
// and, through the doorway, the LIVING ROOM (the wall clock, the TV cabinet and the TV's glow, the toy box, the wooden toy train track).

/* ================================================================ THE SCIENCE ROOM ================================================================ */
const SR = { win: [40, 120, 470, 540], wb: [540, 110, 1240, 560], poster: [1290, 140, 1480, 400], sw: [1300, 470], shelf: [1500, 300, 1665, 700], door: [1690, 160, 1890, 700],
  fan: [1400, 70], floor: 690, back: [560, 640, 1260], front: [330, 790, 1590, 852], plant: [395, 540] };
const FB = SR.front;   // the front bench: x0, back edge y, x1, front edge y
BG.sci20 = () => { const [wx0, wy0, wx1, wy1] = SR.win, [bx0, by0, bx1, by1] = SR.wb, [px0, py0, px1, py1] = SR.poster, [sx0, sy0, sx1, sy1] = SR.shelf, [dx0, dy0, dx1, dy1] = SR.door, fl = SR.floor;
  let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#srWall)"/><rect x="-200" y="-120" width="2320" height="150" fill="#F4F6F2"/><path d="M-200 30 H2120" stroke="#C9D6CC" stroke-width="6"/>`;
  // the floor: grey-blue vinyl tiles in perspective
  s += `<rect x="-200" y="${fl}" width="2320" height="${1200 - fl}" fill="url(#srFloor)"/><rect x="-200" y="${fl - 14}" width="2320" height="18" fill="#B9C6BE"/>`;
  for (let i = -14; i <= 14; i++) s += `<path d="M${960 + i * 120} ${fl} L${960 + i * 260} 1200" stroke="#9EACB8" stroke-width="2" opacity=".6"/>`;
  for (const y of [740, 800, 880, 980, 1100]) s += `<path d="M-200 ${y} H2120" stroke="#9EACB8" stroke-width="2" opacity=".5"/>`;
  // the window onto the school field (sky, the field, a tree, the fence, the block across)
  s += `<rect x="${wx0 - 16}" y="${wy0 - 16}" width="${wx1 - wx0 + 32}" height="${wy1 - wy0 + 32}" rx="8" fill="#E8ECEF" stroke="#9AA4AE" stroke-width="5"/><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" fill="url(#srSky)"/>`
    + `<ellipse cx="180" cy="200" rx="90" ry="26" fill="#fff" opacity=".85"/><ellipse cx="350" cy="168" rx="60" ry="18" fill="#fff" opacity=".7"/>`
    + `<rect x="${wx0}" y="330" width="${wx1 - wx0}" height="60" fill="#E9E1D2"/>` + [...Array(6)].map((_, i) => `<rect x="${60 + i * 70}" y="${300 - 20 * hash(i, 4)}" width="60" height="${40 + 20 * hash(i, 4)}" fill="${["#F4E6D2", "#E9EEF5", "#F6DDD0"][i % 3]}" stroke="#C8B8A8" stroke-width="2"/>`).join("")
    + `<rect x="${wx0}" y="380" width="${wx1 - wx0}" height="${wy1 - 380}" fill="url(#srGrass)"/><path d="M${wx0} 430 Q250 410 ${wx1} 436" stroke="#fff" stroke-width="5" opacity=".7" fill="none"/>`
    + `<rect x="330" y="250" width="22" height="150" fill="#7A5226"/><circle cx="340" cy="240" r="70" fill="#4BA862"/><circle cx="300" cy="270" r="50" fill="#58B56C"/><circle cx="385" cy="268" r="48" fill="#3E9A5A"/>`
    + `<path d="M${wx0} 372 H${wx1}" stroke="#8A9AA6" stroke-width="3"/>` + [...Array(14)].map((_, i) => `<path d="M${wx0 + 12 + i * 31} 352 V380" stroke="#8A9AA6" stroke-width="3"/>`).join("")
    + `<path d="M${(wx0 + wx1) / 2} ${wy0} V${wy1} M${wx0} 330 H${wx1}" stroke="#E8ECEF" stroke-width="12"/><path d="M${(wx0 + wx1) / 2} ${wy0} V${wy1} M${wx0} 330 H${wx1}" stroke="#B8C2CA" stroke-width="3"/>`
    + `<path d="M${wx0 + 20} ${wy0 + 20} L${wx0 + 120} ${wy0 + 120} M${wx0 + 60} ${wy0 + 20} L${wx0 + 150} ${wy0 + 110}" stroke="#fff" stroke-width="10" opacity=".35"/>`;
  // the sill and the sink counter under the window
  s += `<rect x="${wx0 - 30}" y="${wy1 + 12}" width="${wx1 - wx0 + 60}" height="24" rx="6" fill="#F4F6F2" stroke="#9AA4AE" stroke-width="4"/>`
    + `<rect x="0" y="640" width="500" height="22" rx="4" fill="#4A4E5A"/><rect x="10" y="662" width="480" height="${fl + 40 - 662}" fill="#E4ECEA" stroke="#A8B4B0" stroke-width="4"/>`
    + `<path d="M170 662 V${fl + 40} M330 662 V${fl + 40}" stroke="#A8B4B0" stroke-width="3"/><rect x="140" y="680" width="10" height="26" rx="4" fill="#8A949E"/><rect x="350" y="680" width="10" height="26" rx="4" fill="#8A949E"/>`
    + `<ellipse cx="250" cy="642" rx="90" ry="10" fill="#C9D2DA" stroke="#8A949E" stroke-width="3"/><path d="M238 640 V598 Q238 582 256 582 H284 V592" fill="none" stroke="#A8B0BA" stroke-width="10" stroke-linecap="round"/>`;
  // the whiteboard (the POLES BOARD is drawn on it live) and its pen tray with markers
  s += `<g filter="url(#drop)"><rect x="${bx0 - 14}" y="${by0 - 14}" width="${bx1 - bx0 + 28}" height="${by1 - by0 + 28}" rx="10" fill="#C9D0D8"/></g><rect x="${bx0}" y="${by0}" width="${bx1 - bx0}" height="${by1 - by0}" fill="#FDFEFE"/>`
    + `<path d="M${bx0 + 60} ${by0 + 40} L${bx0 + 200} ${by0 + 180} M${bx1 - 160} ${by0 + 60} L${bx1 - 60} ${by0 + 160}" stroke="#EEF2F6" stroke-width="30"/>`
    + `<rect x="${bx0 + 200}" y="${by1 + 14}" width="300" height="16" rx="6" fill="#A8B0BA"/><rect x="${bx0 + 230}" y="${by1 + 4}" width="56" height="12" rx="5" fill="#3A8DFF"/><rect x="${bx0 + 300}" y="${by1 + 4}" width="56" height="12" rx="5" fill="#E0453A"/><rect x="${bx0 + 380}" y="${by1 + 2}" width="70" height="16" rx="4" fill="#4A4E5A"/>`;
  // the science poster: OBSERVE · ASK · TEST (a magnifier, a question mark, a test tube)
  s += `<g filter="url(#dropS)"><rect x="${px0}" y="${py0}" width="${px1 - px0}" height="${py1 - py0}" rx="6" fill="#FFF6DE"/></g><rect x="${px0}" y="${py0}" width="${px1 - px0}" height="46" fill="#43BF6C"/>${T((px0 + px1) / 2, py0 + 32, "SCIENCE", 30, "#fff", { ls: 3 })}`
    + [["OBSERVE", 0], ["ASK", 1], ["TEST", 2]].map(([w, i]) => { const y = py0 + 90 + i * 74; return `<circle cx="${px0 + 40}" cy="${y}" r="24" fill="${["#3A8DFF", "#FF9838", "#9B6BFF"][i]}"/>` + T(px0 + 40, y + 10, ["◎", "?", "▲"][i], 26, "#fff") + T(px0 + 120, y + 9, w, 26, P.ink); }).join("")
    + `<circle cx="${px0 + 8}" cy="${py0 + 8}" r="6" fill="#E0453A"/><circle cx="${px1 - 8}" cy="${py0 + 8}" r="6" fill="#E0453A"/>`;
  // the fan's switch box
  s += `<rect x="${SR.sw[0] - 34}" y="${SR.sw[1] - 44}" width="68" height="88" rx="8" fill="#FBFBF8" stroke="#A8B0BA" stroke-width="4"/><circle cx="${SR.sw[0]}" cy="${SR.sw[1] - 10}" r="18" fill="#E8ECEF" stroke="#8A949E" stroke-width="3"/><path d="M${SR.sw[0]} ${SR.sw[1] - 10} L${SR.sw[0] + 10} ${SR.sw[1] - 22}" stroke="#4A4E5A" stroke-width="4"/><rect x="${SR.sw[0] - 12}" y="${SR.sw[1] + 16}" width="24" height="16" rx="3" fill="#C9D0D8"/><path d="M${SR.sw[0]} ${SR.sw[1] - 44} V30" stroke="#C9D0D8" stroke-width="6"/>`;
  // the bookshelf by the door
  s += `<rect x="${sx0}" y="${sy0}" width="${sx1 - sx0}" height="${sy1 - sy0}" fill="#B07A42" stroke="#7A5226" stroke-width="5"/>`;
  for (let r = 0; r < 4; r++) { const y = sy0 + 12 + r * 96; s += `<rect x="${sx0 + 10}" y="${y}" width="${sx1 - sx0 - 20}" height="84" fill="#8A5A30"/>`;
    for (let i = 0, x = sx0 + 14; x < sx1 - 28; i++) { const w = 14 + 10 * hash(i + r * 9, 2), h = 56 + 24 * hash(i + r * 9, 5); s += `<rect x="${n2(x)}" y="${n2(y + 84 - h)}" width="${n2(w)}" height="${n2(h)}" rx="2" fill="${["#E0453A", "#3A8DFF", "#43BF6C", "#FFC83A", "#9B6BFF", "#FF9838"][(i + r) % 6]}" stroke="#5A3A20" stroke-width="2"/>`; x += w + 3; } }
  // the door with its glass panel (the corridor beyond: light, a railing, the far block)
  s += `<rect x="${dx0 - 10}" y="${dy0 - 10}" width="${dx1 - dx0 + 20}" height="${dy1 - dy0 + 10}" fill="#C9D0D8"/><rect x="${dx0}" y="${dy0}" width="${dx1 - dx0}" height="${dy1 - dy0}" fill="#C99A5E" stroke="#8A6A3A" stroke-width="5"/>`
    + `<rect x="${dx0 + 40}" y="${dy0 + 50}" width="${dx1 - dx0 - 80}" height="210" fill="#F4F8FA" stroke="#8A6A3A" stroke-width="5"/><rect x="${dx0 + 40}" y="${dy0 + 170}" width="${dx1 - dx0 - 80}" height="90" fill="#E2D8C6"/><path d="M${dx0 + 40} ${dy0 + 180} H${dx1 - 40} M${dx0 + 40} ${dy0 + 205} H${dx1 - 40}" stroke="#8A949E" stroke-width="4"/>`
    + `<circle cx="${dx0 + 30}" cy="${dy0 + 320}" r="10" fill="#E8C26A" stroke="#8A6A3A" stroke-width="3"/>`;
  // the long patch of afternoon sun from the window across the floor
  s += `<path d="M470 ${fl} L900 ${fl} L1300 1200 L600 1200z" fill="#FFF4C8" opacity=".22"/>`;
  // the back lab bench with its stools tucked under
  const [b0, by, b1] = SR.back;
  s += `<rect x="${b0}" y="${by}" width="${b1 - b0}" height="22" rx="4" fill="url(#srTop)"/><rect x="${b0 + 14}" y="${by + 22}" width="${b1 - b0 - 28}" height="${fl + 70 - by - 22}" fill="#EEF2F0" stroke="#A8B4B0" stroke-width="4"/>`
    + [0, 1, 2, 3].map((i) => `<path d="M${b0 + 14 + (i + 1) * (b1 - b0 - 28) / 5} ${by + 22} V${fl + 70}" stroke="#A8B4B0" stroke-width="3"/>`).join("")
    + STOOLX.map((x) => `<path d="M${x - 30} ${by + 64} L${x - 40} ${fl + 82} M${x + 30} ${by + 64} L${x + 40} ${fl + 82} M${x - 34} ${by + 120} H${x + 34}" stroke="#6E7884" stroke-width="7" stroke-linecap="round"/><ellipse cx="${x}" cy="${by + 60}" rx="48" ry="12" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/>`).join("");
  // the FRONT BENCH: a dark lab top in perspective, white cupboards below
  const [f0, fy0, f1, fy1] = FB;
  s += `<path d="M${f0 + 30} ${fy0} H${f1 - 30} L${f1} ${fy1} H${f0}z" fill="url(#srTop)" stroke="#2E323C" stroke-width="4"/><path d="M${f0 + 40} ${fy0 + 8} H${f1 - 40}" stroke="#8A92A2" stroke-width="5" opacity=".5"/>`
    + `<rect x="${f0}" y="${fy1}" width="${f1 - f0}" height="16" fill="#2E323C"/><rect x="${f0 + 10}" y="${fy1 + 16}" width="${f1 - f0 - 20}" height="${1200 - fy1}" fill="#F2F5F3" stroke="#A8B4B0" stroke-width="4"/>`
    + [1, 2, 3, 4, 5].map((i) => `<path d="M${f0 + 10 + i * (f1 - f0 - 20) / 6} ${fy1 + 16} V1200" stroke="#A8B4B0" stroke-width="3"/><rect x="${f0 + 10 + i * (f1 - f0 - 20) / 6 - 44}" y="${fy1 + 60}" width="30" height="8" rx="4" fill="#8A949E"/>`).join("");
  s += `<path d="M${f0 + 60} ${fy0 + 4} L${f0 + 420} ${fy0 + 4} L${f0 + 480} ${fy1 - 4} L${f0 + 40} ${fy1 - 4}z" fill="#FFF4C8" opacity=".16"/>`;
  return s; };
const STOOLX = [700, 920, 1140];
// the ceiling fan (live: the blades turn); the class plant on the sill (its leaves stir in the fan's breeze); a child walking past in the
// corridor behind the door's glass (o.child = a time); the sun's soft flicker through the field's tree
const fan20 = (t) => { const [x, y] = SR.fan, a = t * 210; return `<path d="M${x} 30 V${y - 6}" stroke="#8A949E" stroke-width="8"/><ellipse cx="${x}" cy="${y + 14}" rx="210" ry="18" fill="#000" opacity=".05"/>`
  + [0, 120, 240].map((d) => { const c = Math.cos((a + d) * Math.PI / 180); return `<ellipse cx="${n2(x + c * 105)}" cy="${y + 4}" rx="${n2(Math.abs(c) * 100 + 12)}" ry="10" fill="#F4F6F2" stroke="#A8B0BA" stroke-width="3"/>`; }).join("") + `<circle cx="${x}" cy="${y}" r="22" fill="#C9D0D8" stroke="#8A949E" stroke-width="3"/>`; };
// FACES: none (a child seen from the front through the door glass; checked on a still, 2026-11-25)
const corridorKid = (t, t0) => { const u = clamp((t - t0) / 3.2); if (u <= 0 || u >= 1) return ""; const [dx0, dy0, dx1] = SR.door, x = lerp(dx1 - 30, dx0 + 30, u), w = Math.sin(t * 9);
  return `<clipPath id="srDoorG"><rect x="${dx0 + 40}" y="${dy0 + 50}" width="${dx1 - dx0 - 80}" height="210"/></clipPath><g clip-path="url(#srDoorG)" opacity=".75" filter="url(#b2)"><g transform="translate(${n2(x)} ${dy0 + 270})"><rect x="-26" y="-150" width="52" height="80" rx="18" fill="#FFFFFF"/><rect x="-24" y="-74" width="48" height="40" rx="8" fill="#3A56A8"/><circle cx="0" cy="-176" r="26" fill="#F2C29B"/><path d="M-26 -186 Q0 -214 26 -186z" fill="#2A1E16"/><rect x="-34" y="-148" width="18" height="60" rx="8" fill="#E0453A" transform="rotate(${n2(10 * w)} -25 -148)"/></g></g>`; };
/* the hidden SPIDER's spots in the science room [x, y, k, o] (SCENES_TODO rule 8): INTRO = the window frame's top corner (cold .. game: never
   used again); then a NEW fair spot in every scene: the whiteboard's pen tray (waitw), the leg of a lab stool (answer), the top edge of the
   science poster (bench), the rim of the class plant's pot (holdon), the top of the bookshelf by the door (pushpull); the REVEAL: hanging on
   its silk thread under the edge of the front bench (liz). Spare, unused: the fan's switch box. */
const SPAT = { intro: [446, 168, .3, { silk: 34 }], waitw: [920, 582, .28, { line: [1000, 560] }], answer: [1146, 772, .26, { rot: 0, line: [1146, 740] }], bench: [1330, 142, .26, { line: [1296, 140] }],
  holdon: [428, 486, .26, { line: [440, 476] }], pushpull: [1530, 296, .28, { line: [1500, 300] }], liz: [790, 940, .34, { silk: 84 }] };
['cold', 'back', 'title', 'today', 'game'].forEach((k) => { SPAT[k] = SPAT.intro; });
// SR20: the live science room. o: board (true), bench (the props on the front bench, world coordinates), front (in front of the bench),
// spider (a SPAT entry | false; default the scene's own), child (a time), dim, items (between the back wall and the front bench)
function SR20(t, o = {}, cam) { const sc = (window._S || {}).name, sp = o.spider === undefined ? SPAT[sc] : o.spider;
  let s = bg("sci20") + fan20(t) + TF(SR.plant[0], SR.plant[1] + 12, .78, plant20(t, { sw: 1 })) + (o.child !== false ? corridorKid(t, o.child !== undefined ? o.child : 9) : "");
  if (o.board !== false) s += poles20(t);
  if (o.items) s += o.items;
  if (sp && sp[1] < FB[1]) s += spiderAt(t, sp[0], sp[1], sp[2], { ...sp[3], hop: Math.floor(t / 3.1) * 3.1 + .4, wave: sc === "game" });
  s += `<path d="M${FB[0] + 30} ${FB[1]} H${FB[2] - 30} L${FB[2]} ${FB[3]} H${FB[0]}z" fill="none"/>`;
  if (o.bench) s += o.bench;
  if (sp && sp[1] >= FB[1]) s += spiderAt(t, sp[0], sp[1], sp[2], sp[3]);
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* THE POLES BOARD (Part 1's build, the science room's whiteboard; its HOME): the big bar-magnet outline (dashed), its two label boxes; it fills
   on its marks: N red / S blue and POLES (kw_poles), the gold stars "strongest pull" (stars), the green pull pair and the magenta push pair
   "it depends which poles face" (board2). Once filled, a part stays filled. o.k: the whole board's scale about its centre (for a card) */
function poles20(t, o = {}) { const [x0, y0, x1, y1] = SR.wb, cx = (x0 + x1) / 2, on = (m) => t >= MKS(m) || o.all, f = (m) => o.all ? 1 : ss(MKS(m) - .1, MKS(m) + .5, t);
  let s = T(cx, y0 + 62, "THE POLES BOARD", 44, "#2B5FC4", { ls: 3 }) + `<path d="M${cx - 230} ${y0 + 78} H${cx + 230}" stroke="#2B5FC4" stroke-width="4"/>`;
  const mx = cx, my = y0 + 175, mw = 440, mh = 96;
  if (!on("kw_poles")) s += `<rect x="${mx - mw / 2}" y="${my - mh / 2}" width="${mw}" height="${mh}" rx="14" fill="none" stroke="#5A6070" stroke-width="6" stroke-dasharray="18 12"/>` + T(mx, my + 14, "a bar magnet", 34, "#8A949E", { w: 600 });
  else s += OP(f("kw_poles"), `<rect x="${mx - mw / 2}" y="${my - mh / 2}" width="${mw / 2}" height="${mh}" rx="14" fill="${NORTHC}" stroke="#9A2A1E" stroke-width="6"/><rect x="${mx}" y="${my - mh / 2}" width="${mw / 2}" height="${mh}" rx="14" fill="${SOUTHC}" stroke="#1E3E8A" stroke-width="6"/>`
    + T(mx - mw / 4, my + 24, "N", 68, "#fff") + T(mx + mw / 4, my + 24, "S", 68, "#fff"));
  // the two label boxes under the ends: empty, then "North pole" / "South pole" and POLES between them
  [[-1, "North pole", NORTHC], [1, "South pole", SOUTHC]].forEach(([sd, w, c]) => { const bx = mx + sd * (mw / 2 - 70), by = my + 96;
    s += `<path d="M${bx} ${my + mh / 2 + 4} V${by - 26}" stroke="#5A6070" stroke-width="4"/><rect x="${bx - 100}" y="${by - 26}" width="200" height="52" rx="10" fill="#fff" stroke="#5A6070" stroke-width="4" ${on("kw_poles") ? "" : 'stroke-dasharray="10 8"'}/>`
      + (on("kw_poles") ? OP(f("kw_poles"), T(bx, by + 11, w, 30, c)) : ""); });
  if (on("kw_poles")) s += OP(f("kw_poles"), TF(mx, my + 98, 1, `<rect x="-62" y="-24" width="124" height="48" rx="24" fill="url(#gSun)" stroke="${P.ink}" stroke-width="3"/>` + T(0, 10, "POLES", 28, P.ink)));
  if (on("stars")) s += OP(f("stars"), [-1, 1].map((sd) => TF(mx + sd * (mw / 2 - 20), my - mh / 2 - 26, 1 + .06 * Math.sin(t * 4 + sd), `<path d="M0 -30 L9 -9 L31 -9 L13 5 L20 27 L0 14 L-20 27 L-13 5 L-31 -9 L-9 -9z" fill="#F5B700" stroke="#9A6A00" stroke-width="3"/>`)).join("") + T(mx, my - mh / 2 - 22, "strongest pull at the ends", 26, "#9A6A00", { w: 600 }));
  if (on("board2")) { const yy = y1 - 82, k = f("board2"); s += OP(k, TF(cx - 225, yy, .34, bar20(t, { glint: false })) + TF(cx - 123, yy, .34, bar20(t, { glint: false })) + ppArrows(t, cx - 174, yy - 34, "pull", 1, { gap: 8, len: 26, w: 9 })
    + TF(cx + 115, yy, .34, bar20(t, { glint: false, flip: true })) + TF(cx + 225, yy, .34, bar20(t, { glint: false })) + ppArrows(t, cx + 170, yy - 34, "push", 1, { gap: 8, len: 26, w: 9 })
    + T(cx - 174, yy + 42, "pull", 26, PULLC) + T(cx + 170, yy + 42, "push", 26, PUSHC) + T(cx, yy + 70, "it depends which poles face", 22, P.ink, { w: 600 })); }
  return o.k ? TF(cx, (y0 + y1) / 2, o.k, `<g transform="translate(${-cx} ${-(y0 + y1) / 2})">${s}</g>`) : s; }
// THE POLES BOARD as its own card (Now you know!): the whiteboard frame + the filled board, centred on (x, y)
const polesCard = (t, x, y, k = 1) => { const [x0, y0, x1, y1] = SR.wb, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  return TF(x, y, k, `<g transform="translate(${-cx} ${-cy})"><g filter="url(#drop)"><rect x="${x0 - 14}" y="${y0 - 14}" width="${x1 - x0 + 28}" height="${y1 - y0 + 28}" rx="10" fill="#C9D0D8"/></g><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#FDFEFE"/>${poles20(t, { all: true })}</g>`); };

/* ================================================================ PIP'S HDB FLAT, the kitchen, that evening ================================================================ */
const KT = { win: [90, 150, 640, 460], rail: [60, 118, 680], door: [720, 180, 1080, 760], fridge: [1180, 80, 1700, 800], card: [1240, 240, 1640, 670], floor: 760, light: [960, 36],
  table: [250, 850, 980], clock: [900, 300], tv: [760, 560, 1010, 650], tbox: [1000, 650, 1078, 750], plant: [560, 460] };
BG.kit20 = () => { const [wx0, wy0, wx1, wy1] = KT.win, [dx0, dy0, dx1, dy1] = KT.door, [fx0, fy0, fx1, fy1] = KT.fridge, fl = KT.floor;
  let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#ktWall)"/><rect x="-200" y="-120" width="2320" height="156" fill="#F7F2EA"/><path d="M-200 36 H2120" stroke="#E2D6C2" stroke-width="6"/>`;
  s += `<rect x="-200" y="${fl}" width="2320" height="${1200 - fl}" fill="url(#ktFloor)"/>`;
  for (let i = -16; i <= 16; i++) s += `<path d="M${960 + i * 110} ${fl} L${960 + i * 230} 1200" stroke="#B8AA92" stroke-width="2" opacity=".55"/>`;
  for (const y of [800, 860, 950, 1070]) s += `<path d="M-200 ${y} H2120" stroke="#B8AA92" stroke-width="2" opacity=".5"/>`;
  // the window at dusk: the next HDB block with its lit windows (some lit), the laundry poles are drawn live
  s += `<rect x="${wx0 - 14}" y="${wy0 - 14}" width="${wx1 - wx0 + 28}" height="${wy1 - wy0 + 28}" rx="6" fill="#FBFBF8" stroke="#C8BCA8" stroke-width="4"/><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" fill="url(#ktDusk)"/>`
    + `<circle cx="520" cy="200" r="3" fill="#fff"/><circle cx="160" cy="180" r="2.5" fill="#fff"/><circle cx="420" cy="170" r="2" fill="#fff"/>`;
  { const bx = 150, bw = 380; s += `<rect x="${bx}" y="230" width="${bw}" height="${wy1 - 230}" fill="#5A5C86"/><rect x="${bx}" y="230" width="${bw}" height="10" fill="#7A6CA8"/>`;
    for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) { const lit = hash(r * 8 + c, 7) > .45; s += `<rect x="${bx + 16 + c * 46}" y="${248 + r * 30}" width="26" height="16" fill="${lit ? (hash(r * 8 + c, 3) > .5 ? "#FFE7A0" : "#FFD27A") : "#3E406A"}"/>`; } }
  s += `<path d="M${(wx0 + wx1) / 2} ${wy0} V${wy1}" stroke="#FBFBF8" stroke-width="10"/>` + [...Array(10)].map((_, i) => `<path d="M${wx0 + 24 + i * 56} ${wy0} V${wy1}" stroke="#E6E6E0" stroke-width="4" opacity=".8"/>`).join("");
  // the sill, the counter and its cupboards, the sink, the tiles
  s += `<rect x="${wx0 - 24}" y="${wy1 + 12}" width="${wx1 - wx0 + 48}" height="20" rx="5" fill="#FBFBF8" stroke="#C8BCA8" stroke-width="3"/>`;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) s += `<rect x="${-120 + c * 54}" y="${494 + r * 18}" width="52" height="16" fill="#FDFCF8" stroke="#E2DACB" stroke-width="1.5"/>`;
  s += `<rect x="-200" y="560" width="880" height="24" rx="4" fill="#D9D2C4" stroke="#A89E8A" stroke-width="3"/><rect x="-190" y="584" width="860" height="${fl + 10 - 584}" fill="#9CC7C0" stroke="#6E9A92" stroke-width="4"/>`
    + [0, 1, 2, 3].map((i) => `<path d="M${-190 + (i + 1) * 172} 584 V${fl + 10}" stroke="#6E9A92" stroke-width="3"/><rect x="${-190 + (i + 1) * 172 - 30}" y="610" width="8" height="40" rx="4" fill="#F4F6F2"/>`).join("")
    + `<ellipse cx="380" cy="562" rx="96" ry="10" fill="#C9D2DA" stroke="#8A949E" stroke-width="3"/><path d="M366 560 V520 Q366 504 384 504 H412 V514" fill="none" stroke="#B8C0CA" stroke-width="10" stroke-linecap="round"/>`;
  // the doorway onto the living room: warm lamp light, the wall clock, the TV cabinet and its TV, the toy box, the wooden floor
  s += `<rect x="${dx0 - 16}" y="${dy0 - 16}" width="${dx1 - dx0 + 32}" height="${dy1 - dy0 + 16}" fill="#E9D7B8"/><rect x="${dx0}" y="${dy0}" width="${dx1 - dx0}" height="${dy1 - dy0}" fill="url(#ktLiving)"/>`
    + `<rect x="${dx0}" y="680" width="${dx1 - dx0}" height="${dy1 - 680}" fill="#C08A54"/>` + [0, 1, 2, 3, 4].map((i) => `<path d="M${dx0} ${690 + i * 16} H${dx1}" stroke="#A8743E" stroke-width="2"/>`).join("")
    + `<circle cx="${KT.clock[0]}" cy="${KT.clock[1]}" r="46" fill="#FFFDF6" stroke="#8A5A30" stroke-width="8"/>` + [...Array(12)].map((_, i) => { const a = i * 30 * Math.PI / 180; return `<circle cx="${n2(KT.clock[0] + Math.sin(a) * 36)}" cy="${n2(KT.clock[1] - Math.cos(a) * 36)}" r="3" fill="${P.ink}"/>`; }).join("")
    + `<path d="M${KT.clock[0]} ${KT.clock[1]} L${KT.clock[0] + 18} ${KT.clock[1] + 14} M${KT.clock[0]} ${KT.clock[1]} L${KT.clock[0] - 4} ${KT.clock[1] - 28}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>`;
  { const [a, b, c, d] = KT.tv; s += `<rect x="${a}" y="${b}" width="${c - a}" height="${d - b}" rx="6" fill="#8A5A30" stroke="#5A3A20" stroke-width="4"/><path d="M${(a + c) / 2} ${b} V${d}" stroke="#5A3A20" stroke-width="3"/><rect x="${a + 30}" y="${b - 100}" width="${c - a - 60}" height="96" rx="6" fill="#1E2030" stroke="#0E0E18" stroke-width="5"/><rect x="${(a + c) / 2 - 20}" y="${b - 6}" width="40" height="8" fill="#2E2E3A"/>`; }
  { const [a, b, c, d] = KT.tbox; s += `<rect x="${a}" y="${b}" width="${c - a}" height="${d - b}" rx="6" fill="#FF9838" stroke="#B85A18" stroke-width="4"/><rect x="${a - 4}" y="${b - 10}" width="${c - a + 8}" height="16" rx="5" fill="#FFB860" stroke="#B85A18" stroke-width="3"/><circle cx="${(a + c) / 2}" cy="${(b + d) / 2}" r="14" fill="#FFE27A"/>`; }
  // the wooden toy train track on the living-room floor
  s += `<path d="M${dx0} 736 Q900 712 ${dx1} 740" stroke="#D9B07A" stroke-width="30" fill="none"/><path d="M${dx0} 728 Q900 704 ${dx1} 732 M${dx0} 744 Q900 720 ${dx1} 748" stroke="#A8743E" stroke-width="4" fill="none"/>`;
  s += `<path d="M${dx0 - 16} ${dy0 - 16} V${dy1} M${dx1 + 16} ${dy0 - 16} V${dy1}" stroke="#C8B490" stroke-width="6"/>`;
  // the fridge (white, tall), its handle, the freezer drawer; the card is drawn live on its door
  s += `<g filter="url(#drop)"><rect x="${fx0}" y="${fy0}" width="${fx1 - fx0}" height="${fy1 - fy0}" rx="26" fill="url(#ktFridge)" stroke="#B8C0CA" stroke-width="5"/></g><path d="M${fx0 + 6} 700 H${fx1 - 6}" stroke="#B8C0CA" stroke-width="5"/>`
    + `<rect x="${fx0 + 22}" y="290" width="16" height="300" rx="8" fill="#D2D8E0" stroke="#A8B0BA" stroke-width="3"/><rect x="${fx0 + 150}" y="730" width="220" height="16" rx="8" fill="#D2D8E0" stroke="#A8B0BA" stroke-width="3"/><path d="M${fx1 - 30} ${fy0 + 30} V${fy1 - 30}" stroke="#fff" stroke-width="10" opacity=".6"/>`;
  s += `<rect x="${fx1 + 10}" y="${fl - 10}" width="400" height="10" fill="#E2D6C2"/>`;
  // the curtain rail above the kitchen window and the gathered curtain at its left
  { const [r0, ry, r1] = KT.rail; s += `<rect x="${r0}" y="${ry - 6}" width="${r1 - r0}" height="12" rx="6" fill="#B07A42" stroke="#7A5226" stroke-width="3"/><circle cx="${r0}" cy="${ry}" r="11" fill="#8A5A30"/><circle cx="${r1}" cy="${ry}" r="11" fill="#8A5A30"/>`
    + `<path d="M${r0 + 10} ${ry + 6} Q${r0 + 70} ${ry + 200} ${r0 + 30} 500 H${r0 - 30} Q${r0 - 20} ${ry + 200} ${r0 - 10} ${ry + 6}z" fill="#F4B6A0" stroke="#C97E64" stroke-width="4"/><path d="M${r0 + 10} ${ry + 30} Q${r0 + 30} 300 ${r0 + 10} 490" stroke="#C97E64" stroke-width="3" fill="none"/>`; }
  return s; };
// the live parts: the ceiling light's glow, the laundry swaying outside the window, a flicker of the TV through the doorway
const laundry20 = (t) => { const [wx0, wy0, wx1, wy1] = KT.win; let s = `<clipPath id="ktWinC"><rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}"/></clipPath><g clip-path="url(#ktWinC)">`;
  for (const y of [330, 372]) s += `<path d="M${wx0} ${y} H${wx1}" stroke="#C9D0D8" stroke-width="6"/>`;
  [[150, 330, "#FF8FB1"], [240, 330, "#FFE27A"], [360, 372, "#8FD3C8"], [470, 330, "#FFFFFF"], [560, 372, "#B9A6FF"]].forEach(([x, y, c], i) => { const sw = 5 * Math.sin(t * 1.4 + i);
    s += `<g transform="translate(${x} ${y}) rotate(${n2(sw)})"><path d="M-34 0 H34 L28 ${i % 2 ? 70 : 56} H-28z" fill="${c}" stroke="#6A5A8A" stroke-width="3"/><path d="M-30 0 L-30 -6 M30 0 L30 -6" stroke="#6A5A8A" stroke-width="3"/></g>`; });
  return s + `</g>`; };
const kitLife = (t) => { const [a, b, c] = KT.tv, fl = .5 + .5 * Math.sin(t * 7) * Math.sin(t * 2.3);
  return laundry20(t) + `<rect x="${a + 36}" y="${b - 94}" width="${c - a - 72}" height="84" rx="4" fill="#7FB8E6" opacity="${n2(.35 + .2 * fl)}"/><path d="M${a} ${b - 120} L${c} ${b - 120} L${c + 60} 760 L${a - 60} 760z" fill="#BFE0FF" opacity="${n2(.05 + .04 * fl)}"/>`
    + `<circle cx="${KT.light[0]}" cy="${KT.light[1] + 10}" r="300" fill="url(#ktLamp)" opacity=".55"/><ellipse cx="${KT.light[0]}" cy="${KT.light[1]}" rx="76" ry="18" fill="#FFFBEA" stroke="#D9CFB8" stroke-width="3"/>`
    + `<circle cx="${n2(KT.light[0] + 90 + 30 * Math.sin(t * 3.1))}" cy="${n2(KT.light[1] + 60 + 20 * Math.sin(t * 4.3))}" r="4" fill="#C9BBA0"/>`; };
/* the hidden LIZARD's spots in the flat [x, y, k, rot, o] (SCENES_TODO rule 8): INTRO = the kitchen wall beside the ceiling light (kitchen,
   game: never used again); then the living room's wall clock (waitw), the kitchen window frame by the laundry poles (r1ans), the top of the
   fridge's side near the back (fridge), the curtain rail above the kitchen window (show), the top of the TV cabinet seen through the doorway
   (fix), the side of the toy box through the doorway (bars); the REVEAL: upside down on the ceiling above the fridge (liz). */
const LZAT = { intro: [1110, 92, .2, 90, { lift: true }], waitw: [948, 268, .13, 30, {}], r1ans: [652, 330, .2, 0, {}], fridge: [1700, 250, .2, -10, {}], show: [400, 108, .18, 90, {}],
  fix: [940, 548, .14, 80, {}], bars: [1068, 700, .13, 10, {}], liz: [1450, 14, .26, 100, { flick: true, squash: .42 }] };
['kitchen', 'game'].forEach((k) => { LZAT[k] = LZAT.intro; });
// KT20: the live kitchen. o: card (true: the fridge card at its HOME), table (true), tableTop (props on the table, world), items, front,
// lizard (a LZAT entry | false), dim
function KT20(t, o = {}, cam) { const sc = (window._S || {}).name, lz = o.lizard === undefined ? LZAT[sc] : o.lizard;
  let s = bg("kit20") + kitLife(t) + TF(KT.plant[0], KT.plant[1] + 12, .62, plant20(t, { sw: .4 }));
  if (o.card !== false) s += fridgeCard20(t, KT.card);
  if (lz) s += lizardAt(t, lz[0], lz[1], lz[2], lz[3], { ...lz[4], dash: Math.floor(t / 4.3) * 4.3 + 1 });
  if (o.items) s += o.items;
  if (o.table !== false) s += table20(t, o.tableTop || "");
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
// the small kitchen table (wood), what lies on it drawn by `top` (world coordinates)
const table20 = (t, top = "") => { const [x0, y, x1] = KT.table; return `<ellipse cx="${(x0 + x1) / 2}" cy="${y + 220}" rx="${(x1 - x0) * .55}" ry="26" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${x0 + 40} ${y + 30} L${x0 + 30} ${y + 230} M${x1 - 40} ${y + 30} L${x1 - 30} ${y + 230}" stroke="#8A5A30" stroke-width="22" stroke-linecap="round"/>`
  + `<path d="M${x0 + 30} ${y - 40} H${x1 - 30} L${x1} ${y + 10} H${x0}z" fill="url(#ktWood)" stroke="#7A5226" stroke-width="5"/><rect x="${x0}" y="${y + 10}" width="${x1 - x0}" height="24" fill="#A8743E" stroke="#7A5226" stroke-width="4"/>` + top; };

/* WHICH POLES FACE? (Part 2's build and reveal, on the fridge door: its HOME). Four boxes, each with two small magnets drawn face to face:
   North + South, South + North (ATTRACT, green: ns, sn), North + North, South + South (REPEL, magenta: nn, ss); the rule written across the
   bottom (rule: the reveal); the small note card under it held by one more magnet (note). Held by four round whiteboard magnets. A filled
   box stays filled. r = [x0, y0, x1, y1] where it is drawn; o.all: everything filled */
const FBOX = [["North + South", "ns", 0, ["N", "S"]], ["South + North", "sn", 0, ["S", "N"]], ["North + North", "nn", 1, ["N", "N"]], ["South + South", "ss", 1, ["S", "S"]]];
const miniPair = (a, b, k = 1, push = false) => { const end = (p, x, w) => `<rect x="${x}" y="-18" width="${w}" height="36" rx="6" fill="${p === "N" ? NORTHC : SOUTHC}" stroke="${P.ink}" stroke-width="3"/>` + T(x + w / 2, 11, p, 26, "#fff");
  const g = push ? 40 : 6; return TF(0, 0, k, end(a === "N" ? "S" : "N", -g / 2 - 120, 60) + end(a, -g / 2 - 60, 60) + end(b, g / 2, 60) + end(b === "N" ? "S" : "N", g / 2 + 60, 60)); };
function fridgeCard20(t, r, o = {}) { if (r[2] - r[0] < 2) return ""; const [x0, y0, x1, y1] = r, w = x1 - x0, h = y1 - y0, k = w / 400, cx = (x0 + x1) / 2;
  let s = `<g filter="url(#dropS)"><rect x="0" y="0" width="400" height="${n2(h / k)}" rx="14" fill="#FFF6E2" stroke="#D9C49A" stroke-width="4"/></g>` + T(200, 50, "WHICH POLES FACE?", 32, P.ink);
  const H = h / k, bw = 176, bh = 118;
  FBOX.forEach(([lab, m, rep, [a, b]], i) => { const bx = i % 2 ? 210 : 14, by = 74 + (i < 2 ? 0 : bh + 14), on = o.all || t >= MKS(m), f = o.all ? 1 : ss(MKS(m) - .05, MKS(m) + .35, t), col = rep ? PUSHC : PULLC;
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="#fff" stroke="${P.ink}" stroke-width="3"/>` + T(bx + bw / 2, by + 26, lab, 19, P.ink, { w: 600 }) + TF(bx + bw / 2, by + 56, .62, miniPair(a, b, 1, rep && on));
    if (on) s += OP(f, `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="${col}" opacity=".16"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="none" stroke="${col}" stroke-width="6"/>`
      + TF(bx + bw / 2, by + 98, spring(t, MKS(m) + .1, .4) || 1, `<rect x="-66" y="-17" width="132" height="34" rx="17" fill="${col}"/>` + T(0, 10, rep ? "REPEL" : "ATTRACT", 24, "#fff"))); });
  const ry = 74 + 2 * (bh + 14) + 30;
  if (o.all || t >= MKS("rule")) { const f = o.all ? 1 : ss(MKS("rule"), MKS("rule") + 1.4, t); s += `<clipPath id="ktRule${o.id || ""}"><rect x="0" y="${ry - 26}" width="${n2(400 * f)}" height="70"/></clipPath><g clip-path="url(#ktRule${o.id || ""})">`
    + `<text x="200" y="${ry}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="22" text-anchor="middle" fill="${P.ink}"><tspan fill="${PULLC}">Unlike poles attract</tspan> and <tspan fill="${PUSHC}">like poles repel.</tspan></text></g>`; }
  s += [[14, 14], [386, 14], [14, H - 14], [386, H - 14]].map(([x, y], i) => wbMag(x, y, ["#5A7BD8", "#FFC83A", "#43BF6C", "#FF6F61"][i], 16)).join("");
  let out = TF(x0, y0, k, s);
  if (o.all || t >= MKS("note")) { const q = o.all ? 1 : spring(t, MKS("note"), .45); out += TF(cx, y1 + 52 * k, q * k, `<g filter="url(#dropS)"><rect x="-170" y="-34" width="340" height="68" rx="8" fill="#FFFDF4" stroke="#C9B48A" stroke-width="3"/></g>` + T(0, -4, "Is it a magnet?", 22, P.ink) + T(0, 24, "Test: does it repel?", 22, PUSHC) + wbMag(0, -34, "#9B6BFF", 14)); }
  return out; }
// the card centred on (x, y) at a size: k 1 = 400 x 430
const fridgeCardAt = (t, x, y, k = 1, o = {}) => fridgeCard20(t, [x - 200 * k, y - 215 * k, x + 200 * k, y + 215 * k], o);
