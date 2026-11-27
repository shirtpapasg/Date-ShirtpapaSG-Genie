"""edit.py: the two cuts of the Pet Buddy Quest: Primary 3 promo, shot by shot. Read by compose.py.
Each shot: clip (clips/<name>.mp4), t = start in clip seconds (often found from a game event: find(clip, 'sfx:lock')), d = length,
vo = Heart's lines [(id, at)], caps = [(text, from, to, position)] ([words] in yellow), gvo = the game's own voice lines kept
[(who, text, dB)], zoom = (from, to, centre x, centre y), flash = white flash-in seconds. Game sound effects play unless sfx=False."""
SFXDB = {"whoosh": -4, "rumble": -2, "fanfare": -1, "slap": 3, "hold": 2, "lock": 1, "glitch": 1, "boot": 1, "down": 0}

def H(find):
    F = find; S = []
    # 1. the game's title scene: "Watching is fun. Playing is better!"
    S.append(dict(clip="desk_title", t=0.5, d=3.3, vo=[("watch", .35)],
                  caps=[("Watching is fun.", 0, 1.45, "panel", 1), ("Playing is [BETTER!]", 1.45, 3.3, "panel", 1)]))
    # 2. Episode 19 opens: "Pet Buddy Quest! Play along with Pip, Momo and Basil."
    S.append(dict(clip="desk_ep19", t=0.0, d=3.75, vo=[("title", .15)], flash=.12,
                  caps=[("[Pet Buddy Quest!]", .1, 1.2, "top"), ("Play along with Pip, Momo and Basil.", 1.2, 3.75, "top")]))
    # 3. a lock-in round: ring timer, tap, LOCKED IN!, the buddies' cards, the score
    tl = F("desk_ep19", "sfx:lock")
    S.append(dict(clip="desk_ep19", t=tl - 2.3, d=6.6, vo=[("lockin", .1), ("beat", 4.95)],
                  caps=[("Lock in your answer.", .1, 1.5, "top"), ("Then see what the buddies picked!", 1.5, 4.8, "top"), ("[Beat the Buddies!]", 4.8, 6.6, "top")]))
    # 4. HOLD ON! (EP5: Basil says ducks are fish)
    th = F("desk_ep05", "sfx:hold"); tc = F("desk_ep05", "sfx:right", -1)
    a = th - 2.85; S.append(dict(clip="desk_ep05", t=a, d=(tc + 1.0) - a, vo=[("holdon", th - .3 - a)], gvo=[("basil", "fish", 0)],
                  caps=[("Hear a mistake?", th - .3 - a, th + .75 - a, "top"), ("Shout [HOLD ON!]", th + .75 - a, tc + 1.0 - a, "top")]))
    # 5. Showdown: tap the wrong line in Basil's homework
    ts = F("desk_ep19", "sfx:fanfare", 0)
    S.append(dict(clip="desk_ep19", t=ts - 2.9, d=5.2, vo=[("show", .15)], flash=.1,
                  caps=[("[Showdown!]", .1, 1.1, "top"), ("Spot Basil's mistake.", 1.1, 5.2, "top")]))
    # 6. the mission: drag each card into its bin
    td = F("desk_ep19", "drag", 0)
    S.append(dict(clip="desk_ep19", t=td - .8, d=4.0, vo=[("mission", .2)],
                  caps=[("Then get hands-on in a [mission!]", .2, 4.0, "top")]))
    # 7. GLITCH v0.3: arrives, reads his log of your mistakes, loses, glitches, "New knowledge acquired… I will return."
    ga = F("desk_glitch", "sfx:rumble"); gl = F("desk_glitch", "vo:glitch:scanning"); gz = F("desk_glitch", "sfx:glitch", 0)
    gn = F("desk_glitch", "vo:glitch:New knowledge"); gr = F("desk_glitch", "vo:glitch:I will return")
    S.append(dict(clip="desk_glitch", t=ga - .1, d=1.7, vo=[("glitch", .25)], flash=.1, caps=[("Meet [GLITCH v0.3].", .25, 1.7, "top")]))
    S.append(dict(clip="desk_glitch", t=gl + 2.2, d=1.75, zoom=(1.3, 1.38, .3, .8), caps=[("He learns from [your mistakes]…", 0, 1.75, "top")]))
    gk = F("desk_glitch", "sfx:glitch", -2)
    S.append(dict(clip="desk_glitch", t=gk - .35, d=2.7, caps=[("…so [beat him!]", 0, 2.7, "top")]))
    S.append(dict(clip="desk_glitch", t=gn - 1.4, d=(gr - gn) + 1.4 + 1.7, flash=.08, gvo=[("glitch", "New knowledge", 2), ("glitch", "I will return", 2)],
                  caps=[("New knowledge acquired…", 1.4, gr - gn + 1.4, "top"), ("I will return.", gr - gn + 1.4, gr - gn + 3.1, "top")]))
    # 8. a perfect game: the score hand, then HIGH FIVE!
    th5 = F("desk_ep19", "sfx:slap")
    S.append(dict(clip="desk_ep19", t=th5 - 2.4, d=4.4, vo=[("hi5", .5)], caps=[("Perfect game?", .5, 1.45, "top"), ("[High five!]", 1.45, 2.4, "top")]))
    # 9. stars and the badge
    tr = F("desk_ep19", "tap:#next", -1)
    S.append(dict(clip="desk_ep19", t=tr + .2, d=3.4, vo=[("stars", .3)], caps=[("Win [stars] and [badges]!", .3, 3.4, "top")]))
    # 10. the map: every episode
    S.append(dict(clip="desk_map", t=.7, d=4.3, vo=[("all28", .25)], caps=[("[All 28] Primary 3 episodes.", .25, 2.4, "top"), ("[Fully voiced!]", 2.4, 4.3, "top")]))
    # 11. end card
    S.append(dict(clip="desk_end", t=.0, d=5.4, vo=[("now", .7)], flash=.12, end=True))
    return S

def V(find):
    F = find; S = []
    S.append(dict(clip="phone_title", t=.4, d=2.75, vo=[("watch", .2)], caps=[("Watching is fun.", .15, 1.3, "top"), ("Playing is [BETTER!]", 1.3, 2.75, "top")]))
    tl = F("phone_ep19", "sfx:lock")
    S.append(dict(clip="phone_ep19", t=tl - 1.5, d=4.6, vo=[("beat", 3.3)], caps=[("Tap. [Lock it in!]", 0, 3.2, "top"), ("[Beat the Buddies!]", 3.2, 4.6, "top")]))
    th = F("phone_ep05", "sfx:hold")
    S.append(dict(clip="phone_ep05", t=th - 2.0, d=3.4, vo=[("holdon", .25)], caps=[("Hear a mistake?", .2, 1.2, "top"), ("Shout [HOLD ON!]", 1.2, 3.4, "top")]))
    ts = F("phone_ep19", "sfx:fanfare", 0)
    S.append(dict(clip="phone_ep19", t=ts - 1.9, d=3.5, vo=[("spot", .1)], caps=[("Spot [Basil's mistake!]", .1, 3.5, "top")]))
    ga = F("phone_glitch", "sfx:rumble"); gk = F("phone_glitch", "sfx:glitch", -2); gn = F("phone_glitch", "vo:glitch:New knowledge"); gr = F("phone_glitch", "vo:glitch:I will return")
    S.append(dict(clip="phone_glitch", t=ga - .1, d=1.7, vo=[("glitch2", .1)], caps=[("[GLITCH] learns from your mistakes…", .1, 1.7, "top")]))
    S.append(dict(clip="phone_glitch", t=gk - .35, d=1.5, caps=[("…so [beat him!]", 0, 1.5, "top")]))
    S.append(dict(clip="phone_glitch", t=gn - 1.0, d=(gr - gn) + 1.0 + 1.25, gvo=[("glitch", "New knowledge", 2), ("glitch", "I will return", 2)],
                  caps=[("New knowledge acquired…", 1.0, gr - gn + 1.0, "top"), ("I will return.", gr - gn + 1.0, gr - gn + 2.25, "top")]))
    th5 = F("phone_ep19", "sfx:slap")
    S.append(dict(clip="phone_ep19", t=th5 - 1.4, d=2.9, vo=[("hi5", .0)], caps=[("Perfect game?", 0, .9, "top"), ("[HIGH FIVE!]", .9, 2.9, "top")]))
    S.append(dict(clip="phone_end", t=.0, d=4.0, vo=[("every", .5)], end=True,
                  caps=[("[Every] Primary 3 episode!", .5, 4.0, "top")]))
    return S

def end_at(segs):
    return next(s["at"] for s in segs if s.get("end"))

CUTS = {
    "h": dict(size=(1920, 1080), segs=H, out="pbq_p3_promo_16x9", capsize=74, capw=1500, pos={"top": (960, 122), "mid": (960, 470), "low": (960, 760), "panel": (960, 962)},
              tapscale=lambda d: (1920 / d["w"], 1080 / d["h"]), tapr=46, sfxdb=-5, gvodb=-1, musdb=-9, duckdb=10, hit=end_at),
    "v": dict(size=(1080, 1920), segs=V, out="pbq_p3_promo_9x16", capsize=76, capw=820, pos={"top": (540, 382)},
              frame=dict(top=480, scale=(1920 - 480) / 1920, logo_y=None),   # no brand line: the top 14 % is under the apps' buttons
              tapscale=lambda d: (1080 / d["w"], 1920 / d["h"]), tapr=46, sfxdb=-5, gvodb=-1, musdb=-9, duckdb=10, hit=end_at),
}
