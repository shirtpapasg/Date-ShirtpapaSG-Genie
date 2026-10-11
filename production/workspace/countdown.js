// 4-second "think" countdown between the quiz question and the answer (shared by every episode).
// It sits in the caption strip, which is empty during the silent pause, so it never covers the quiz.
const QZ = TL.segs.find(s => s.id === "quiz1"), CD = el("g", {opacity: 0}, $("v"));
el("rect", {x: -300, y: -46, width: 600, height: 92, rx: 46, fill: "#1b1b3a", stroke: "#fff", "stroke-width": 4, filter: "url(#sh)"}, CD);
tx(CD, {x: -120, y: 17, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff"}, "⏸ Think!");
el("circle", {cx: 190, cy: 0, r: 38, fill: "#f77f00", stroke: "#fff", "stroke-width": 4}, CD);
const CDT = tx(CD, {x: 190, y: 19, "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#fff"}, "4");
const CDB = el("rect", {x: -250, y: 30, width: 500, height: 8, rx: 4, fill: "#ffd166"}, CD);
function drawCD(t) { if (!QZ) return; const t0 = QZ.t1 + .5, k = clamp((t - t0) / 4);
  op(CD, on(t, t0, t0 + 4.15, .15)); tf(CD, "translate(960 1004)");
  CDT.textContent = String(Math.max(1, 4 - Math.floor(k * 4))); set(CDB, "width", 500 * (1 - k));
  if (S.quiz && S.quiz.ring) op(S.quiz.ring, 0); }
