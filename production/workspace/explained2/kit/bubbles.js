// bubbles.js: speech bubbles placed NEXT TO THEIR SPEAKER (teacher, 28 Nov 2026, on the live P4 EP2: "bring the speech bubble closer to
// the characters" / "speech bubbles too far off"). Runtime half; the layout half is kit/bubble_layout.js.
//
// How it works. Every bubble a scene draws with say() (lib.js) carries a key "<line id>#<page>" and its speaker. kit/bubble_layout.js
// renders the episode at 10 fps with the scene's own (old) bubble spots (?bubrec), measures the speaker's head on screen (the buddies' head
// from the painting's alpha, plus a helmet drawn on top; Chilli / GLITCH / Uncle Lim from their face boxes), every other face, the cards,
// words and data-obst marks (the 214 plaque), and picks for each bubble page the spot JUST ABOVE (or beside) the speaker's head that
// covers no face, stays inside the frame and keeps off cards and words; the tail is short and points at the speaker's mouth. It writes
// <ep>/bubplace_p<part>.js (window.BUBPLACE). At render time bubble() asks bubPlaceAt(key, t) for the spot; no entry -> the scene's own spot.
//   BUBPLACE[key] = { x, y, w, h, side: "b"|"l"|"r", at, tip: [dx, dy], m: [a,b,c,d,e,f] | undefined, trk: [[t, dx, dy], ...] | undefined }
//   x, y: the bubble centre on screen; side: the bubble edge the tail leaves from; at: the tail base along that edge (from the centre);
//   tip: the tail tip from the bubble centre; m: the inverse of the screen matrix of the group the bubble is drawn in (if not plain);
//   trk: when the speaker moves during the page (a camera move), the head's smoothed offset over time; the bubble rides along with it.
if (typeof location !== "undefined" && location.search.includes("bubrec")) window._BUBORIG = true;   // the layout pass: the scenes' own spots
function bubPlaceAt(key, t) {
  const B = typeof window !== "undefined" && !window._BUBORIG && window.BUBPLACE; const P = B && B[key]; if (!P) return null;
  let x = P.x, y = P.y, tip = P.tip;
  if (P.trk && P.trk.length) { const k = P.trk; let dx = k[0][1], dy = k[0][2];
    if (t >= k[k.length - 1][0]) { dx = k[k.length - 1][1]; dy = k[k.length - 1][2]; }
    else for (let i = 1; i < k.length; i++) if (t < k[i][0]) { const u = Math.max(0, Math.min(1, (t - k[i - 1][0]) / (k[i][0] - k[i - 1][0]))); dx = k[i - 1][1] + (k[i][1] - k[i - 1][1]) * u; dy = k[i - 1][2] + (k[i][2] - k[i - 1][2]) * u; break; }
    // ride along, but stay inside the frame; the tail tip keeps pointing at the same head point
    const X = Math.max(P.w / 2 + 16, Math.min(1904 - P.w / 2, x + dx)), Y = Math.max(P.h / 2 + 16, Math.min(1064 - P.h / 2, y + dy));
    tip = [tip[0] + (x + dx - X), tip[1] + (y + dy - Y)]; x = X; y = Y; }
  return { ...P, x, y, tip };
}
// the tail as a triangle from the bubble edge (side, at) to the tip; hw = half the base; ext = the tip pushed further out (the border copy)
function bubTailPath(w, h, side, at, tip, hw, ext = 0) {
  const rx = Math.min(h / 2, 44), r2 = (v) => Math.round(v * 100) / 100; let a, b, m;
  if (side === "b") { const lim = Math.max(0, w / 2 - rx - hw); at = Math.max(-lim, Math.min(lim, at)); a = [at - hw, h / 2 - 3]; b = [at + hw, h / 2 - 3]; m = [at, h / 2]; }
  else { const lim = Math.max(0, h / 2 - rx * .45 - hw * .4), sx = side === "l" ? -1 : 1; at = Math.max(-lim, Math.min(lim, at)); a = [sx * (w / 2 - 6), at - hw]; b = [sx * (w / 2 - 6), at + hw]; m = [sx * w / 2, at]; }
  let tx = tip[0], ty = tip[1]; if (ext) { const dx = tx - m[0], dy = ty - m[1], L = Math.hypot(dx, dy) || 1; tx += dx / L * ext; ty += dy / L * ext; }
  return `M${r2(a[0])} ${r2(a[1])} L${r2(tx)} ${r2(ty)} L${r2(b[0])} ${r2(b[1])}z`;
}
if (typeof module !== "undefined") module.exports = { bubPlaceAt, bubTailPath };
