// ui.js: the recurring screen pieces of "TheOneApp, Explained" drawn on canvas (STYLE_GUIDE section 7): text, pills, the
// logo pill, the scoreboard, the ring timer, choice cards, speech bubbles, captions, the day tile, the cream card.
// Plus the two actors' draw calls: buddy() (our SVG rigs through Sprites) and robot().
(function () {
  const G = globalThis.G, M = globalThis.Motion, S = globalThis.SCORE, Sprites = globalThis.Sprites, Props = globalThis.Props, B = globalThis.Buddies;
  const { clamp, lerp, ease } = M, TAU = Math.PI * 2;
  const P = () => Props.P;
  const X = {};
  X.FRED = 'Fredoka, "Arial Rounded MT Bold", Arial, sans-serif'; X.ATK = '"Atkinson Hyperlegible", Arial, sans-serif';
  // text. o = { size, w (weight), fam, color, align, ls (letter spacing px), alpha, base, shadow }
  X.font = (ctx, o) => { ctx.font = `${o.w || 700} ${o.size || 40}px ${o.fam || X.FRED}`; ctx.letterSpacing = (o.ls || 0) + "px"; };
  X.measure = (ctx, str, o) => { ctx.save(); X.font(ctx, o); const w = ctx.measureText(str).width - (o.ls || 0); ctx.restore(); return w; };
  X.text = (ctx, str, x, y, o = {}) => {
    ctx.save(); X.font(ctx, o); ctx.textAlign = o.align || "center"; ctx.textBaseline = o.base || "alphabetic"; ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha;
    const dx = o.ls && (o.align || "center") === "center" ? o.ls / 2 : 0;
    if (o.shadow) { ctx.fillStyle = o.shadow === true ? "rgba(18,14,46,.55)" : o.shadow; ctx.fillText(str, x + dx, y + Math.max(3, (o.size || 40) * .07)); }
    if (o.stroke) { ctx.lineJoin = "round"; ctx.lineWidth = o.strokeW || 10; ctx.strokeStyle = o.stroke; ctx.strokeText(str, x + dx, y); }
    ctx.fillStyle = o.color || "#fff"; ctx.fillText(str, x + dx, y); ctx.restore();
  };
  X.shadow = (ctx, blur = 12, dy = 6, a = .3) => { const k = (G.scale || 1) * Math.hypot(ctx.getTransform().a, ctx.getTransform().b) / (G.scale || 1); ctx.shadowColor = `rgba(43,33,71,${a})`; ctx.shadowBlur = blur * k; ctx.shadowOffsetY = dy * k; ctx.shadowOffsetX = 0; };
  X.noShadow = (ctx) => { ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; };
  X.vgrad = (ctx, y0, y1, c0, c1) => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, c0); g.addColorStop(1, c1); return g; };
  X.rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(r, w / 2, h / 2)); };
  // a soft pill or card: no outline, depth from a soft shadow and a top highlight
  X.pill = (ctx, cx, cy, w, h, fill, o = {}) => {
    ctx.save(); if (o.shadow !== false) X.shadow(ctx, o.blur || 12, o.dy || 6, o.sa || .3);
    ctx.fillStyle = fill; X.rr(ctx, cx - w / 2, cy - h / 2, w, h, o.r == null ? h / 2 : o.r); ctx.fill(); X.noShadow(ctx);
    if (o.hi !== false) { ctx.globalAlpha *= o.hi || .18; ctx.fillStyle = "#fff"; X.rr(ctx, cx - w / 2 + 6, cy - h / 2 + 5, w - 12, h * .42, o.r == null ? h * .21 : Math.max(4, o.r - 6)); ctx.fill(); }
    ctx.restore();
  };
  X.SUN = (ctx, y0, y1) => X.vgrad(ctx, y0, y1, "#FFE27A", "#FFB52E");
  X.heart = (ctx, x, y, s, fill) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = fill; ctx.fill(new Path2D("M0 10 c-11-8-13-15-8-19 c4-3 7 0 8 3 c1-3 4-6 8-3 c5 4 3 11-8 19z")); ctx.restore(); };
  // the white pointing hand of the choice cards (points right; dir = -1 points left)
  X.hand = (ctx, x, y, s, dir = 1, fill = "#fff") => { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.fillStyle = fill;
    X.rr(ctx, -70, -34, 92, 76, 30); ctx.fill(); X.rr(ctx, -10, -34, 110, 34, 17); ctx.fill(); ctx.globalAlpha *= .85; X.rr(ctx, -78, -10, 30, 46, 14); ctx.fill(); ctx.restore(); };
  X.tick = (ctx, x, y, r, p = 1, color = "#43BF6C") => { ctx.save(); ctx.translate(x, y); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = r * .26; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath(); ctx.moveTo(-r * .45, 0); ctx.lineTo(-r * .12, r * .36); if (p > .5) ctx.lineTo(r * .5, -r * .36); ctx.stroke(); ctx.restore(); };

  // channel identity: the logo pill. beat: 0..1, Heart's voice (the heart in the pill pulses when she speaks)
  X.logo = (ctx, x, y, s = 1, beat = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    X.pill(ctx, 186, 32, 372, 64, P().ink, { hi: .1 });
    const r = 19 * (1 + .16 * beat); ctx.fillStyle = X.SUN(ctx, 32 - r, 32 + r); ctx.beginPath(); ctx.arc(34, 32, r, 0, TAU); ctx.fill();
    X.heart(ctx, 34, 32, 1 + .22 * beat, P().ink);
    X.font(ctx, { size: 29 }); ctx.textAlign = "left"; ctx.fillStyle = "#fff"; ctx.fillText("TheOneApp", 64, 43); const w = ctx.measureText("TheOneApp").width; ctx.fillStyle = P().sun; ctx.fillText(", Explained", 64 + w, 43);
    ctx.restore(); };
  // the scoreboard: YOU [n] vs [n] BUDDIES. bumpY / bumpB: 0..1 pulses when a number changes
  X.scoreboard = (ctx, x, y, s, you, bud, bumpY = 0, bumpB = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    X.pill(ctx, 0, 0, 580, 104, P().ink, { blur: 14, dy: 14, sa: .28, hi: false });
    ctx.fillStyle = X.SUN(ctx, -44, 44); X.rr(ctx, -282, -44, 258, 88, 44); ctx.fill(); ctx.fillStyle = "#CFC2FF"; X.rr(ctx, 24, -44, 258, 88, 44); ctx.fill();
    X.text(ctx, "YOU", -200, 12, { size: 34, color: P().ink, ls: 2 }); X.text(ctx, "vs", 0, 12, { size: 30 }); X.text(ctx, "BUDDIES", 204, 11, { size: 27, color: P().ink, ls: 1 });
    const num = (cx, v, col, b) => { ctx.save(); ctx.translate(cx, 0); ctx.scale(1 + .25 * b, 1 + .25 * b); ctx.fillStyle = P().ink; X.rr(ctx, -46, -34, 92, 68, 22); ctx.fill(); X.text(ctx, String(v), 0, 20, { size: 58, color: col }); ctx.restore(); };
    num(-94, you, P().sun, bumpY); num(94, bud, "#DDD3FF", bumpB); ctx.restore(); };

  // the ring timer. left: 0..1 of the ring still lit (drains anticlockwise from 12 o'clock); pulse: 0..1 tick bump; shut: 0..1 snapped closed
  X.ring = (ctx, cx, cy, R, left, o = {}) => { const { pulse = 0, num = null, numPop = 0, shut = 0 } = o;
    ctx.save(); ctx.translate(cx, cy);
    ctx.fillStyle = "rgba(18,14,46,.7)"; ctx.beginPath(); ctx.arc(0, 0, R + 34, 0, TAU); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.1)"; ctx.beginPath(); ctx.arc(0, 0, R - 22, 0, TAU); ctx.fill();
    if (o.inside) o.inside(ctx);
    ctx.lineWidth = 30; ctx.strokeStyle = "rgba(255,255,255,.16)"; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.stroke();
    const a0 = -Math.PI / 2, lw = 30 + 9 * pulse;
    if (left > .002) { ctx.lineCap = "round";
      ctx.save(); ctx.shadowColor = "rgba(255,200,58,.85)"; ctx.shadowBlur = (18 + 22 * pulse + 30 * shut) * (G.scale || 1); ctx.strokeStyle = "#FFC83A"; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(0, 0, R, a0, a0 - TAU * Math.min(left, .9999), true); ctx.stroke(); ctx.restore();
      const g = ctx.createLinearGradient(0, -R, 0, R); g.addColorStop(0, "#FFE27A"); g.addColorStop(1, "#FFB52E"); ctx.strokeStyle = g; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(0, 0, R, a0, a0 - TAU * Math.min(left, .9999), true); ctx.stroke(); }
    if (num != null) { ctx.save(); ctx.translate(0, R); const s = 1 + .22 * numPop; ctx.scale(s, s); X.shadow(ctx, 8, 5, .35);
      ctx.fillStyle = X.SUN(ctx, -54, 54); ctx.beginPath(); ctx.arc(0, 0, 54, 0, TAU); ctx.fill(); X.noShadow(ctx); ctx.strokeStyle = P().night; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 54, 0, TAU); ctx.stroke();
      if (num === "tick") { ctx.strokeStyle = P().ink; ctx.lineWidth = 11; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath(); ctx.moveTo(-20, 2); ctx.lineTo(-6, 17); ctx.lineTo(22, -15); ctx.stroke(); }
      else X.text(ctx, String(num), 0, 24, { size: 70, color: P().ink });
      ctx.restore(); }
    ctx.restore(); };

  // a choice card. side: "L" (blue, LIVING) or "R" (orange, NON-LIVING). k: 0 = slim tab, 1 = full card. poke: 0..1 the hand pokes outward
  X.choice = (ctx, side, cx, cy, k, o = {}) => { const L = side === "L", { poke = 0, dim = 1, glow = 0, tally = [] } = o;
    const w = lerp(400, 424, k), h = lerp(92, 250, k), deep = L ? P().blueDeep : P().orangeDeep, c0 = L ? "#5FB0FF" : "#FFB45C", c1 = L ? "#2C6FE8" : "#F27A1E";
    ctx.save(); ctx.translate(cx, cy); ctx.rotate((L ? 1 : -1) * 2 * Math.PI / 180 * k); ctx.globalAlpha *= dim;
    if (glow > 0) { ctx.save(); ctx.shadowColor = L ? "rgba(58,141,255,.9)" : "rgba(255,152,56,.95)"; ctx.shadowBlur = 50 * glow * (G.scale || 1); ctx.fillStyle = c1; X.rr(ctx, -w / 2, -h / 2, w, h, lerp(46, 48, k)); ctx.fill(); ctx.restore(); }
    const r = lerp(46, 48, k);
    ctx.save(); X.shadow(ctx, 14, 12, .3); ctx.fillStyle = deep; X.rr(ctx, -w / 2, -h / 2 + 10, w, h, r); ctx.fill(); ctx.restore();
    ctx.fillStyle = X.vgrad(ctx, -h / 2, h / 2, c0, c1); X.rr(ctx, -w / 2, -h / 2, w, h, r); ctx.fill();
    ctx.save(); ctx.globalAlpha *= .16; ctx.fillStyle = "#fff"; X.rr(ctx, -w / 2 + 14, -h / 2 + 10, w - 28, lerp(34, 84, k), lerp(17, 34, k)); ctx.fill(); ctx.restore();
    const word = L ? "LIVING" : "NON-LIVING", dir = L ? -1 : 1;
    if (k > .5) { const a = clamp((k - .5) * 2);
      ctx.save(); ctx.globalAlpha *= a; X.hand(ctx, dir * (10 + 26 * poke), -52, .8, dir); ctx.restore();
      X.text(ctx, word, 0, 62, { size: L ? 76 : 54, ls: L ? 10 : 5, shadow: "rgba(18,14,46,.25)" });
      ctx.save(); ctx.globalAlpha *= a * .35; ctx.fillStyle = P().ink; X.rr(ctx, -100, 80, 200, 40, 20); ctx.fill(); ctx.restore();
      X.text(ctx, L ? "point LEFT" : "point RIGHT", 0, 109, { size: 27, w: 600, ls: 1, alpha: a });
    } else {
      X.hand(ctx, dir * (w / 2 - 62 + 14 * poke), 0, .42, dir);
      X.text(ctx, word, -dir * 34, 16, { size: L ? 46 : 40, ls: L ? 5 : 2, shadow: "rgba(18,14,46,.25)" });
    }
    // who picked this side: one aura dot per buddy
    tally.forEach((d, i) => { if (d.a <= 0) return; ctx.save(); ctx.translate(-w / 2 + 34 + i * 44, -h / 2 - 4); ctx.scale(d.a, d.a); X.shadow(ctx, 6, 3, .35); ctx.fillStyle = d.c; ctx.beginPath(); ctx.arc(0, 0, 19, 0, TAU); ctx.fill(); X.noShadow(ctx); ctx.strokeStyle = "#fff"; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); });
    ctx.restore(); };

  // a buddy's pick card. flip: 0 = face down ("?"), 1 = face up (the answer word); in between it turns edge-on
  X.pick = (ctx, who, x, y, s, flip, side, rot = 8) => { const face = flip > .5, sx = Math.abs(Math.cos(Math.PI * flip)), L = side === "L";
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot * Math.PI / 180); ctx.scale(s * Math.max(.04, sx), s);
    X.shadow(ctx, 8, 6, .35); ctx.fillStyle = face ? X.vgrad(ctx, -56, 56, L ? "#5FB0FF" : "#FFB45C", L ? "#2C6FE8" : "#F27A1E") : P().ink; X.rr(ctx, -44, -56, 88, 112, 18); ctx.fill(); X.noShadow(ctx);
    ctx.strokeStyle = face ? "#fff" : P()[who]; ctx.lineWidth = 6; X.rr(ctx, -44, -56, 88, 112, 18); ctx.stroke();
    if (face) { X.hand(ctx, L ? 6 : -6, -14, .34, L ? -1 : 1); G.decor(() => X.text(ctx, L ? "LIVING" : "NON-", 0, 28, { size: L ? 18 : 17, ls: 1 })); if (!L) G.decor(() => X.text(ctx, "LIVING", 0, 46, { size: 17, ls: 1 })); }
    else G.decor(() => X.text(ctx, "?", 0, 22, { size: 64, color: P()[who] }));
    ctx.restore(); };

  // a speech bubble whose words appear as they are spoken. lines: [[{w, t}]], now: time; cross: a ✗ chip at the start
  X.bubble = (ctx, cx, cy, lines, now, o = {}) => { const { pop = 1, tailX = 0, size = 46, cross = false, first = null } = o; if (pop <= 0.01) return;
    const lh = size * 1.3, ws = lines.map((ln) => ln.reduce((q, w) => q + X.measure(ctx, w.w, { size, w: 600 }), 0) + (ln.length - 1) * size * .27), chip = cross ? size * 1.25 : 0;
    const w = Math.max(...ws) + 90 + chip, h = lines.length * lh + 44;
    ctx.save(); ctx.translate(cx, cy + h / 2); ctx.scale(pop, pop); ctx.translate(0, -h / 2);
    X.shadow(ctx, 10, 6, .3); ctx.fillStyle = "#fff"; X.rr(ctx, -w / 2, -h / 2, w, h, Math.min(h / 2, 56)); ctx.fill();
    ctx.beginPath(); ctx.moveTo(tailX - 22, h / 2 - 4); ctx.lineTo(tailX + (tailX > 0 ? 14 : -14), h / 2 + 42); ctx.lineTo(tailX + 22, h / 2 - 4); ctx.fill(); X.noShadow(ctx);
    lines.forEach((ln, i) => { const y = -h / 2 + 22 + lh * (i + .74); let x = -ws[i] / 2 + (i === 0 ? chip / 2 : 0);
      if (cross && i === 0) { ctx.save(); ctx.translate(x - chip + size * .42, y - size * .32); X.shadow(ctx, 4, 2, .25); ctx.fillStyle = P().paper; ctx.beginPath(); ctx.arc(0, 0, size * .5, 0, TAU); ctx.fill(); X.noShadow(ctx); ctx.strokeStyle = "#E9DCC0"; ctx.lineWidth = 3; ctx.stroke();
        ctx.strokeStyle = P().ink; ctx.lineWidth = size * .13; ctx.lineCap = "round"; const q = size * .2; ctx.beginPath(); ctx.moveTo(-q, -q); ctx.lineTo(q, q); ctx.moveTo(q, -q); ctx.lineTo(-q, q); ctx.stroke(); ctx.restore(); }
      const sp = size * .27;
      ln.forEach((wd) => { const a = clamp((now - wd.t + .04) / .09), col = first && i === 0 ? first : P().ink;
        if (a > 0) { ctx.save(); ctx.translate(x, y); const s = lerp(1.25, 1, ease.out3(a)); ctx.scale(s, s); X.text(ctx, wd.w, 0, 0, { size, w: 600, color: col, align: "left", alpha: a }); ctx.restore(); }
        else X.text(ctx, wd.w, x, y, { size, w: 600, color: P().ink, align: "left", alpha: .13 });
        x += X.measure(ctx, wd.w, { size, w: 600 }) + sp; });
    });
    ctx.restore(); };

  // captions, word by word: an ink pill at the bottom of the safe area, the word being said in sun-yellow
  X.caption = (ctx, sub, now, cx, cy, o = {}) => { const size = o.size || 48, str = sub.words.map((w) => w.w).join(" ");
    const tw = X.measure(ctx, str, { size, w: 600 }), w = tw + 72, h = size * 1.75, a = clamp((now - sub.t + .06) / .1) * clamp((sub.end - now) / .12), pop = lerp(.92, 1, ease.back(clamp((now - sub.t + .06) / .18)));
    if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(pop, pop);
    X.pill(ctx, 0, 0, w, h, "rgba(27,20,64,.9)", { hi: .08 });
    if (o.dot) { ctx.fillStyle = o.dot; ctx.beginPath(); ctx.arc(-w / 2 + 4, -h / 2 + 4, 13, 0, TAU); ctx.fill(); }
    let x = -tw / 2; const sp = X.measure(ctx, "a a", { size, w: 600 }) - 2 * X.measure(ctx, "a", { size, w: 600 });
    sub.words.forEach((wd, i) => { const on = now >= wd.t - .03, cur = on && (i === sub.words.length - 1 || now < sub.words[i + 1].t - .03);
      X.text(ctx, wd.w, x, size * .34, { size, w: 600, align: "left", color: cur ? P().sun : "#fff", alpha: on ? 1 : .32 }); x += X.measure(ctx, wd.w, { size, w: 600 }) + sp; });
    ctx.restore(); };

  // the day counter tile. flip: 0..1 through a flip (the number changes at .5)
  X.dayTile = (ctx, cx, cy, s, day, flip = 0) => { ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s * (flip > 0 && flip < 1 ? Math.max(.08, Math.abs(Math.cos(Math.PI * flip))) : 1));
    X.shadow(ctx, 14, 12, .3); ctx.fillStyle = P().ink; X.rr(ctx, -110, -110, 220, 230, 38); ctx.fill(); X.noShadow(ctx);
    ctx.save(); X.rr(ctx, -110, -110, 220, 230, 38); ctx.clip(); ctx.fillStyle = X.SUN(ctx, -110, -46); ctx.fillRect(-110, -110, 220, 64); ctx.restore();
    X.text(ctx, "DAY", 0, -62, { size: 42, color: P().ink, ls: 8 }); X.text(ctx, String(day), 0, 92, { size: 150 });
    ctx.strokeStyle = "rgba(18,14,46,.7)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-110, 34); ctx.lineTo(110, 34); ctx.stroke(); ctx.restore(); };

  // a label: a white pill with the part's name, joined to the part by one plain line that touches it (no arrowheads)
  X.label = (ctx, str, lx, ly, px, py, a = 1, size = 34) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(a);
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lerp(lx, px, clamp(a)), lerp(ly, py, clamp(a))); ctx.stroke();
    const w = X.measure(ctx, str, { size, w: 600 }) + 52; X.pill(ctx, lx, ly, w, size * 1.65, "#fff", { hi: false }); X.text(ctx, str, lx, ly + size * .34, { size, w: 600, color: P().ink }); ctx.restore(); };

  // the cream card (the Mark Sentence card's look) with a sun spine and a tab. inner(ctx) draws the sentence.
  X.card = (ctx, cx, cy, w, h, tab, inner, rot = -1) => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot * Math.PI / 180);
    ctx.save(); X.shadow(ctx, 16, 14, .3); ctx.fillStyle = "#D9C7A8"; X.rr(ctx, -w / 2 + 10, -h / 2 + 14, w, h, 44); ctx.fill(); ctx.restore();
    ctx.fillStyle = X.vgrad(ctx, -h / 2, h / 2, "#FFFDF6", "#FFF1D6"); X.rr(ctx, -w / 2, -h / 2, w, h, 44); ctx.fill();
    ctx.save(); X.rr(ctx, -w / 2, -h / 2, w, h, 44); ctx.clip(); ctx.fillStyle = X.SUN(ctx, -h / 2, h / 2); ctx.fillRect(-w / 2, -h / 2, 22, h); ctx.restore();
    const tw = X.measure(ctx, tab, { size: 34, ls: 3 }) + 120; X.pill(ctx, -w / 2 + 60 + tw / 2, -h / 2 - 6, tw, 72, X.SUN(ctx, -h / 2 - 42, -h / 2 + 30), { hi: false, blur: 8, dy: 5 });
    ctx.fillStyle = P().ink; ctx.beginPath(); ctx.arc(-w / 2 + 104, -h / 2 - 6, 23, 0, TAU); ctx.fill(); ctx.strokeStyle = P().sun; ctx.lineWidth = 6.5; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath(); ctx.moveTo(-w / 2 + 93, -h / 2 - 6); ctx.lineTo(-w / 2 + 101, -h / 2 + 3); ctx.lineTo(-w / 2 + 116, -h / 2 - 15); ctx.stroke();
    X.text(ctx, tab, -w / 2 + 140, -h / 2 + 6, { size: 34, color: P().ink, ls: 3, align: "left" });
    inner(ctx); ctx.restore(); };

  /* ---------- the actors ---------- */
  const H0 = 400;   // the rigs are rasterised at this height and scaled when drawn
  // buddy(ctx, who, x, y, h, t, o, f): o = Buddies.draw options;  f = { sx, sy, rot (degrees), aura (0..1), rim, alpha }
  X.buddy = (ctx, who, x, y, h, t, o = {}, f = {}) => { const k = h / H0, hh = H0 * B.REL[who];
    ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= f.alpha == null ? 1 : f.alpha;
    if (f.aura) { const r = h * .6, cy = -h * .46; ctx.save(); ctx.globalAlpha *= f.aura; ctx.fillStyle = P()[who]; ctx.beginPath(); ctx.arc(0, cy, r, 0, TAU); ctx.fill();
      const g = ctx.createRadialGradient(0, cy, 0, 0, cy, r); g.addColorStop(0, "rgba(255,255,255,.5)"); g.addColorStop(1, "rgba(255,255,255,0)"); ctx.fillStyle = g; ctx.fill(); ctx.restore(); }
    ctx.rotate((f.rot || 0) * Math.PI / 180); ctx.scale((f.sx || 1) * k, (f.sy || 1) * k);
    const svg = `<g filter="url(#${f.rim || "rim"})">${B.draw(who, 0, 0, hh, t, o)}</g>`;
    Sprites.draw(ctx, { svg, vb: [-H0 * 1.0, -H0 * 1.5, H0 * 2.0, H0 * 1.68], px: 1.25 }, 0, 0, 1);
    ctx.restore(); };
  X.robot = (ctx, x, y, s, o = {}, f = {}) => { ctx.save(); ctx.translate(x, y); ctx.rotate((f.rot || 0) * Math.PI / 180);
    Sprites.draw(ctx, { svg: `<g filter="url(#${f.rim || "rimS"})">${Props.robot(o)}</g>`, vb: Props.robotBox, px: 2.2 }, 0, 0, s); ctx.restore(); };
  X.sprite = (ctx, svg, vb, x, y, s = 1, o = {}) => Sprites.draw(ctx, { svg, vb, px: o.px || 2, still: o.still, key: o.key }, x, y, s);
  // lip-sync: the mouth opening of `who` at t from the real voice envelope of the line being spoken (else null = the rig's own mouth)
  X.mouthOf = (who, t) => { for (const L of Object.values(S.vo)) if (L.who === who && M.talking(L, t, L.t)) return M.mouth(L, t, L.t); return null; };
  X.loud = (who, t) => X.mouthOf(who, t) || 0;

  globalThis.XUI = X;
})();
