  s.mouth = el("g", {}, s.stage); el("path", {d: "M-330 -40 Q0 -230 330 -40 L330 40 Q0 230 -330 40 Z", fill: "#9d0208", stroke: INK, "stroke-width": 8}, s.mouth);
  s.top = el("g", {}, s.mouth); s.bot = el("g", {}, s.mouth);
  for (let i = 0; i < 8; i++) { const x = -245 + i * 70; el("rect", {x: x - 28, y: -120 + Math.abs(i - 3.5) * 10, width: 56, height: 70, rx: 14, fill: "#fff", stroke: INK, "stroke-width": 4}, s.top); el("rect", {x: x - 28, y: 50 - Math.abs(i - 3.5) * 10, width: 56, height: 70, rx: 14, fill: "#fff", stroke: INK, "stroke-width": 4}, s.bot); }
