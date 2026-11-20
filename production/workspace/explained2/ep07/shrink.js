// shrink.js (EP7): the first-person journeys (the series' signature). The camera IS the thing.
// EP5's two journeys (the frog, the mudskipper) were cleared; their code stays in ../ep05/shrink.js for reference.
// Stage 2 (the artist) draws here:
//   Part 1 SC.shrink: BE A SPORE of bread mould (marks dive, land, bag, threads, substance, absorb, patch; lines g902-g908)
//   Part 2 SC.shrink: BE A BACTERIUM on a fingertip (marks dive, hills, recess, wash, drain, clean; lines j502-j507)
// See SCENES_TODO.md. The generic helpers below (tags, rays, drifting specks) are kept.
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
// a soft tag that names what you feel (bottom centre, above the bottom fifth)
const feelTag = (t, t0, t1, txt, y = 790, x = 960) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 46, "#fff", P.ink, { w: 700 }));
// light rays under water
const uwRays = (t, col = "#fff", o = .13) => [0, 1, 2, 3, 4].map((i) => { const x = 200 + i * 400 + 60 * Math.sin(t * .5 + i * 1.3); return `<path d="M${n2(x)} -20 L${n2(x + 150)} -20 L${n2(x - 120 + 80 * Math.sin(t * .3 + i))} 1100 L${n2(x - 380)} 1100z" fill="${col}" opacity="${n2(o * (.6 + .4 * Math.sin(t * .8 + i * 2)))}"/>`; }).join("");
// specks drifting past as you move forward: d = how far you have swum (in "screens")
const uwSpecks = (d, n = 36, col = "#fff") => { let s = ""; for (let i = 0; i < n; i++) { const an = hash(i, 3) * Math.PI * 2, v = (hash(i, 7) + d * (.6 + .8 * hash(i, 5))) % 1, r = 60 + v * v * 1300, x = 960 + Math.cos(an) * r, y = 470 + Math.sin(an) * r * .62; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 9 * v)}" fill="${col}" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; } return s; };

