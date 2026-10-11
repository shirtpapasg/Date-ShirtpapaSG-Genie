// ---- END CARD (default; only built when the episode's scenes do not define S.end). Text comes from the config "end".
if (!S.end) S.end = (() => { const s = scene("end", "#3a0ca3", "#7209b7"), E = window.ENDCARD;
  tx(s.stage, {x: 960, y: 360, "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffe14d", "letter-spacing": 6}, E.kicker || "NEXT EPISODE");
  const y0 = E.lines.length === 1 ? 530 : 480;
  E.lines.forEach((L, i) => tx(s.stage, {x: 960, y: y0 + i * 100, "text-anchor": "middle", "font-size": 84, "font-weight": 700, fill: "#fff", class: "out", "stroke-width": 10}, L));
  s.run = () => {}; return s; })();
