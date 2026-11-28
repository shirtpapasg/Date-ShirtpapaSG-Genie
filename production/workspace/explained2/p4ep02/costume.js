// costume.js (P4 EP2 v3, 28 Nov 2026): the Science Help Desk role-play in DOCTOR COSTUMES (the teacher: "Since they are role playing as
// doctors, can we give new costumes to the pet buddies?") and the FOUR-FACE score bar (../kit/score4.js, from P4 EP3: YOU, Pip, Momo,
// Basil, each with their own face and score). The costumes go on when Basil opens the desk: on "open!" in c101 ("The Science Help Desk is
// open!", 1.28 s) every buddy on screen swaps to its doctor painting with the usual pose-swap pop and sparkles, and keeps it to the end.
// The sprites are baked by costume_bake.py (spr/<who>_doc_*.png); lib.js buddy0() swaps the names from COSTUME_T0.
window.COSTUME_T0 = W("c101", "open");
// the score bar's face chips wear the costume too (kit/score4.js s4chip, with the doctor sit painting once the desk is open)
s4chip = function (who, t, r) { const [fx, fy, fr] = S4FACE[who], dn = `${who}_doc_sit_closed`, doc = t >= window.COSTUME_T0 && SPR[dn], nm = doc ? dn : `${who}_sit_closed`, S = SPR[nm]; if (!S) return "";
  const k = r / fr, id = "s4" + who, it = !doc && typeof itemsOf === "function" ? itemsOf(who, nm, 1, {}) : "";
  return `<clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r + 5}" fill="${P[who] || "#888"}"/><circle r="${r}" fill="#FFF1D6"/>`
    + `<g clip-path="url(#${id})"><g transform="scale(${n2(k)}) translate(${-fx} ${-fy})"><use href="#s_${nm}"/>${it}</g></g>`; };
