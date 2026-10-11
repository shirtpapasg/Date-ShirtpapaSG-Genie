// "Try it in TheOneApp" card: shown while Heart points students to the matching School Lab experiment
const LC = window.LABCARD, LCG = el("g", {opacity: 0}, $("v")); $("v").insertBefore(LCG, $("confetti"));
el("rect", {x: 0, y: 0, width: 1920, height: 1080, fill: "#0b1020", opacity: .55}, LCG);
const LCB = el("g", {}, LCG);
el("rect", {x: -470, y: -190, width: 940, height: 380, rx: 36, fill: "#fffdf7", stroke: INK, "stroke-width": 8, filter: "url(#sh)"}, LCB);
el("rect", {x: -470, y: -190, width: 940, height: 92, rx: 36, fill: "#7209b7"}, LCB); el("rect", {x: -470, y: -130, width: 940, height: 32, fill: "#7209b7"}, LCB);
tx(LCB, {x: 0, y: -128, "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff"}, "🧪 Try it yourself in TheOneApp");
const LCT = tx(LCB, {x: 0, y: -30, "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: INK}, "School Lab › " + LC.code + "  " + LC.title);
tx(LCB, {x: 0, y: 30, "text-anchor": "middle", "font-size": 32, "font-weight": 600, fill: "#5b6782"}, LC.part);
const LCbtn = el("g", {transform: "translate(0 110)"}, LCB); el("rect", {x: -230, y: -40, width: 460, height: 80, rx: 40, fill: "#2a9d8f", stroke: INK, "stroke-width": 5}, LCbtn);
tx(LCbtn, {x: 0, y: 14, "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#fff"}, "Let's test it now! ▶");
function drawLC(t) { if (!LC.fit) { const bw = LCT.getBBox().width; if (bw > 870) LCT.setAttribute("font-size", 40 * 870 / bw); LC.fit = bw > 0; }   // long lab titles: shrink to fit the card
  const seg = TL.segs.find(s => s.id === LC.seg); if (!seg) return; const cs = TL.cues[LC.seg] || {};
  const t0 = Math.max(...Object.keys(cs).filter(k => k.replace(/#\d+$/, "") === LC.word).map(k => cs[k])), t1 = seg.t1 + .6;
  op(LCG, on(t, t0 - .2, t1, .3)); tf(LCB, `translate(760 520) scale(${Math.max(0, pop(t, t0 - .2))})`);
  tf(LCbtn, `translate(0 110) scale(${1 + .05 * Math.sin(t * 6)})`); }
