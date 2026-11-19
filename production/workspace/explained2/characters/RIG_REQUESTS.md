# Rig requests from the animation lead (motion layer) to the rig agent

`characters/acting.js` wraps `Buddies.draw` and already PASSES every option below on each call. Today the rig ignores them and
acting.js falls back to what it can do from outside (whole-body transforms, `tilt`, `look`, `mouth`, `expr`, `gesture`). As soon as
the rig reads an option, list its name in `Buddies.HOOKS = ["lid", "eyes", ...]` and acting.js switches the fallback off by itself.
All values are plain numbers computed from t (deterministic). Every option must default to "no change" when absent.
Please keep `Buddies.blinkK` and `Buddies.SPEC[who].seed` exported until `lid` exists (the blink fallback uses them).

| Priority | Option | Range | What it should do | Why (the animation principle) |
|---|---|---|---|---|
| 1 | `lid` | 0..1 | Eyelid closure set from outside (0 open, 1 shut); when given, the rig's own blink is off. At 0.5 to 1 squash the eye a little (eye ry x 0.85) and drop the brows 2 units. | Blinks are placed by the acting (on head turns, before an expression change), with lid squash. Fallback today: a seed trick that re-phases the rig's blink. |
| 1 | `tailSwing` | degrees, about -25..25, or an ARRAY of 3 to 5 angles from base to tip | Rotate the tail about its root (array: bend each section in turn, so the tip lags the base). Replaces the rig's built-in sine sway when given. | Follow-through and overlap: the tail drags behind every hop, turn and landing. No fallback is possible from outside. |
| 1 | `earL`, `earR` | degrees, about -20..20 | Rotate each ear about its base (Pip, Momo), or flare/fold Basil's crest spikes. | Overlap on hops, nods and head shakes; ears also act (droop when sad, perk when curious). No fallback possible. |
| 1 | `eyes` | `[dx, dy]`, each -1..1 | Move the pupils/highlights inside the eye (about 30% of the eye radius), separately from `look`. | Eye darts LEAD a head turn by 2 to 4 frames; a thinking look up-left; a glance at another buddy. Today the eyes can only move with the whole face. |
| 2 | `headTurn` | -1..1 | A real turn of the head left/right for all three (features slide and foreshorten, far ear narrows, near ear widens). Pip and Momo today only shift the face 7 units. | Head shakes ("no") and looks to another buddy read weakly without it. |
| 2 | `headNod` | -1..1 | Pitch: features slide down/up the head by about 10 units, crown shows more/less. | Nods on stressed words, a look down at the pick card, a look up in wonder. |
| 2 | `headSquash` | about -0.12..0.12 | Scale the head (sy = 1 + v, sx = 1/(1 + v)) about the chin, apart from the body. | Squash on blinks and landings, stretch on a surprise take. |
| 2 | `gestureK` (+ `gestureFrom`) | 0..1 | Blend the arm from the `gestureFrom` pose (default "rest") to `gesture`: hand position lerped along an arc, bend lerped. | Arms now pop from pose to pose in one frame; I hide it under a squash, but a real in-between is better (anticipate, arc, overshoot, settle). |
| 2 | `exprK` (+ `exprFrom`) | 0..1 | Blend numeric face values (brow height/angle, eye size, mouth curve, cheek blush) between two expressions. | Expression changes through a controlled in-between rather than a hard switch. |
| 3 | `mouthShape` | "open" / "o" / "wide" / "closed" | The viseme family, chosen by the voice (bright sound: wide, dark sound: o). `mouth` 0..1 stays the opening. | Better lip-sync; `voice/*.json` already carries a `bright` track for this. |
| 3 | `bodyLean`, `hips` | degrees / units | Lean the torso about the hips while the feet stay planted; shift the hips sideways. | True weight shifts (today the whole figure rotates about the feet, which is fine for small angles only). |
| 3 | `breath` | -1..1 | Chest scale from outside (the rig's `breathe:false` then stays off). | Breath that speeds up when excited and holds before a line. Fallback today: a whole-body scale. |
| 3 | parts as layers | | `Buddies.parts(who, x, y, h, t, o)` returning `{shadow, tail, body, head, armsFront}` strings as well as `draw`. | Lets a prop (the pick card) sit between the body and the front arm, and lets motion blur be applied to one part. |

Not a request to change the look: all of these are no-ops at their defaults, so the approved stills stay exactly as they are.
