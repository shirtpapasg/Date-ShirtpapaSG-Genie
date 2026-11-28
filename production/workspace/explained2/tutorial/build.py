import cv2, base64, html, os
IMG='/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/images/'
QA='/home/user/Date-ShirtpapaSG-Genie/production/workspace/explained2/ep12/qa/'
def b64(path, w=900, q=82):
    im=cv2.imread(path)
    if im is None:
        im=cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im.shape[1]>w: im=cv2.resize(im,(w,int(im.shape[0]*w/im.shape[1])),interpolation=cv2.INTER_AREA)
    ok,buf=cv2.imencode('.jpg',im,[cv2.IMWRITE_JPEG_QUALITY,q]); return 'data:image/jpeg;base64,'+base64.b64encode(buf).decode()
def img(n):
    for ext in ('jpg','png','webp'):
        p=f'{IMG}{n}.{ext}'
        if os.path.exists(p): return b64(p)
# (time, teacher's words, [screenshots], what it changed)
STEPS=[
("Stage 1 · Naming the problem honestly", [
 ("02:52","before we continue, I have a question... Compare Episode 1, Living and non-living things, to the recent episodes. I feel there's less connections built. Be honest, is fable still writing the script?",[],
  "Claude compared the episodes and admitted the cause: the later episodes had been made on autopilot, with no human review."),
 ("02:58","less connections meaning as a viewer, I see lesser efforts in the rendering of each scene. The scripts are fine, but the visuals has lesser emphaisis on the cuteness of the pet buddies, the explanations are less in depth, and the visuals less engaging. Give me a series of questions to make the later episodes better",[],
  "Three precise complaints (cuteness, depth, engagement) turned into a list of questions about buddies, scenes and depth."),
 ("03:09","i need you to summarise all the notes i have given you to make the episode 1 and 4. I want to see the difference. Let me download",[],
  "The evidence: Episode 1 had about 45 notes from the teacher before it went live; Episode 4 had none. The gap was a review gap."),
 ("03:11","(the most recent one would be the light episode, on opaque and translucent. I felt is leaning back to the previous version of pushing our facts, and not focusing the perspective of young learners, requiring a combination of visual and more in depth explanations to have a better idea of the concepts",[],
  "New rule: explain from the learner's seat, with a chain of questions first and fewer look-closers that go deeper."),
 ("03:22","one lsat thing to be aware of, the responds of the pet buddy and Heart must be more human like, and try to avoid 2-3 words sentence. (such as no water, no living) Rewrite as a sentence, \"no water drink by the robot, so it is a non-living thing\".",[],
  "New rule: talk like people, in full sentences. Every short fragment in the scripts was rewritten."),
 ("03:51","(Ultimately I want a workflow that automates, not waiting for me. Save the rules, follow my directions, put in more effort, then you will need my approval to render.)",[],
  "The goal is set: every note becomes a saved rule, so the workflow can run automatically later."),
]),
("Stage 2 · Pointing at the screen", [
 ("03:41","change the object to a trolley instead of a whiteboard. A glass trolley episode",[97],
  "EP12's dare changed from a whiteboard to a trolley: glass, metal or fabric?"),
 ("03:46","for every of these scene finding the creatures, i want the transition to be from (right picture), directly zoom into the bird, then the other objects (left picture) to pop out. The script need not change, but the visual is more smooth and not disjoint, having no unnecessary cutting of scene.",[98,99],
  "The hidden-animal reveal became one smooth push-in from the scene onto the animal, with no hard cut."),
 ("06:09","when zoomed into the animal, with a circular circle and add a black ring around this animal. i want the entire screen to be in the previous blue layout (the right photo) instead of the grey. Also, ensure this animal doesnt stay at the same spot like episode 12 and 13! It makes things easy to guess and lost the fun, giving a sloppy vibe to the young audience",[101,102],
  "The zoom now lands in a black-ringed circle on the blue starry stage, and the animal hides in a different place each time."),
 ("06:10","as for the script, talk about finding this animal, before moving into the fingers explanation",[],
  "The order of the game segment was fixed: search for the animal first, then the finger rules."),
 ("06:11","then make the change for episode 12 and 13, show me before making it live",[],
  "EP12 and EP13 were both redone, with before/after previews and nothing uploaded until the teacher said OK."),
]),
("Stage 3 · Showing good AND bad examples", [
 ("06:14","this \"Look Closer\" segment is good!",[103],
  "Saved as the approved example that every look-closer is measured against."),
 ("06:18","this is a good example of a good scene",[106],
  "Saved as the approved scene layout: the reader is big on one side and the card is large on the other."),
 ("06:16","the option 1 2 and 3 is a waste of space, repeating the textbox above with the bag. Put the number 1,2, and 3 right beside the options above, make the textbox bigger showing a noticeable difference among the 3 options.",[104],
  "New rule: one set of big numbered choice cards. The duplicate rows were removed everywhere."),
 ("06:17","like I said previously, I want the audience to connect more to the pet buddy characters. Make the characters bigger and occupy 50% more space. Ensure you consider the layout of this scene, not too clustered at one side.",[],
  "Every buddy is now 1.5× bigger and spread across the frame."),
 ("06:18","Momo can also be bigger by 50% in this scene You get what I mean.",[105],""),
 ("06:19","The classroom setting is ok, but when talking about \"Our design plan\", you need to zoom into the plan, showing a bigger image of it. The 3 pet buddies are too small to make any impact in this scene",[107],
  "New rule: the camera goes to what is being talked about."),
 ("06:22","Dont you think a lot of wasted space, when the main focus is \"Our Design Plan\" which now is so small... Then the \"base\", \"zip\" and \"fabric\" segment can be bigger, higher emphasis. Also, why dont insert one of the pet buddy in, focusing on it's face, looking shock/ agreeing. You decide.",[108,109,110],
  "Look-closers now use the whole panel, with a buddy's face peeking in from a corner to react."),
 ("06:23","When at the next scene, the \"Our Design Plan\" is now at the bottom, shifted it position unnecessary when it can just remain at the top left as before.",[111],
  "New rule: things stay where they were. Each board has one home position."),
 ("06:25","this bag with the count down is so small, I can barely see the 3 descriptive words. How do you want the young viewers to know what to focus on?",[112],
  "New rule: the countdown takes the stage, with a big ring and big clue words."),
 ("06:25","ALL these are important and you did not make these mistakes when creating episode 1.",[],
  "Episode 1 became the benchmark. Every new episode is now compared with it side by side before upload."),
]),
("Stage 4 · Small details children notice", [
 ("06:28","did you realised Pip is basically not doing anything here. Also, the \"+1\" arm crossed is covered by the keyword \"Intended use\". The countdown timer rhythm is off! Basic",[113],
  "New checks: no buddy is ever frozen, nothing overlaps the key-word shelf, and the countdown rhythm is measured (now exactly 1 per second, with the bell on 0). The cause of the off rhythm: background music was playing under the countdown."),
 ("06:29","I no longer see the Animation on the countdown., nor the interactive pet buddies reactions",[],
  "Episode 1's animated countdown and buddy reactions were brought back."),
 ("06:30","this is good. But please, human has 4 fingers and a thumb.",[114],"New check: hands have four fingers and a thumb."),
 ("06:31","there's also missing information \"plastic\" on the darker material and \"fabric for the orange material on the right",[115],"New rule: every sample, tile or picture is named on screen."),
 ("06:32","poor display of visual information.... Which is flexible, strong and waterproof? Where's the arrows, or you can even consider colour coding.",[116],
  "New rule: every tag points to what it describes, with a line and colour coding."),
 ("06:35","I love these shrink down scenes! Can we bring the 3 pet buddies along? Or even including the Audiences like what you did for \"A frog , a Bird and a Fish\"",[117,118],
  "Journeys now carry a \"You: …\" tag, and the buddies ride along."),
]),
("Stage 5 · Feeling, story and sound", [
 ("06:36","please redo them now. Quality really dropped quite extensively.....",[],"Both redos started, with every note so far."),
 ("06:37","this does not give me the \"hard knock\" vibe. You can actually make use of pip, momo or basil, showing an angry / shock face!",[119],
  "Big moments are felt: a jolt, a burst (CLANG!, BONK!, SPLASH!) and a buddy's shocked face."),
 ("06:38","if you need more expressive expression of momo, pip and basil, just tell me",[],
  "This led to new paintings: back views and more expressions, and then the coloured cast for EP14."),
 ("06:40","instead of finding this animal and tell someone at home, (about what? you didnt specify), this ends up with a boring sharing. It must be a fun fact which most children are shock to find out! Then it makes sense to share. Just finding an animal that is not related to the episode is sloppy pscript writing",[120],
  "Each reveal now ends with a surprising fun fact tied to the topic (for example, what a mynah's nest is made of)."),
 ("06:42","I still recall there's raining sound during episode 1. Now for this supermarket scene, there's no sound effects of shoppers, laughters, bells.. I feel the quality indeed dipped quite significantly",[],
  "New rule: every place sounds alive, with shoppers, laughter, scanner beeps and the door chime, plus sounds for actions."),
]),
("Stage 6 · The verdict", [
 ("08:20","so much better!",[],"After seeing the before/after sheets and clips, the teacher said to upload EP12, and the redo went live."),
]),
]
TIPS=[
 ("Compare with your best work.","\"Compare Episode 1 … to the recent episodes\" gave Claude a standard to measure against, not just \"make it better\"."),
 ("Send a screenshot with every note.","Each screenshot shows exactly which scene and which element you mean."),
 ("Say why it matters to a child.","\"How do you want the young viewers to know what to focus on?\" explains the purpose, so the fix goes beyond that one scene."),
 ("Suggest a fix when you have one.","\"Put the number 1, 2 and 3 right beside the options\" and \"consider colour coding\" are fast to act on."),
 ("Praise what works.","\"This Look Closer segment is good!\" became the approved example, so good things are kept, not just bad things removed."),
 ("Ask for rules, not one-off fixes.","\"Save the rules, follow my directions\" made every note permanent, so later episodes improve without the same note."),
 ("Ask to see it before it goes live.","\"Show me before making it live\" kept quality under your control while the new rules settled in."),
]
css='''body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:980px;margin:0 auto;padding:24px 16px;color:#1d1d2b;background:#faf8f5;line-height:1.5}
h1{font-size:28px;margin:0 0 6px}h2{margin-top:44px;padding-bottom:6px;border-bottom:3px solid #8B5CF6}.sub{color:#555}
.step{background:#fff;border-radius:14px;padding:16px 18px;margin:18px 0;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.t{font-size:12px;color:#888}.you{font-size:17px;border-left:5px solid #FB7158;padding:6px 12px;margin:6px 0 10px;background:#fff6f3;border-radius:6px}
.res{border-left:5px solid #14B8A6;padding:6px 12px;background:#f0fbf9;border-radius:6px}.res b{color:#0f766e}
.imgs{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.imgs img{max-width:100%;border-radius:8px;border:1px solid #ddd}
.imgs.two img{max-width:calc(50% - 4px)}.tips li{margin:8px 0}.full img{width:100%;border-radius:8px;margin:8px 0}
@media (max-width:600px){.imgs.two img{max-width:100%}}'''
o=[f'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>How My Prompts Changed EP12</title><style>{css}</style></head><body>']
o.append('<h1>How my prompts made Episodes 12 and 13 better</h1><p class="sub">A tutorial from one working day with Claude (22 Nov 2026), for the YouTube series <i>TheOneApp, Explained</i> (P3 Science). Below are my own words, the screenshots I sent, and what each prompt changed. Old versions: the downloaded EP12 and EP13 videos. New versions: on YouTube.</p>')
o.append('<h2>7 things that made the prompts work</h2><ol class="tips">'+''.join(f'<li><b>{html.escape(a)}</b> {html.escape(b)}</li>' for a,b in TIPS)+'</ol>')
for title,steps in STEPS:
    o.append(f'<h2>{html.escape(title)}</h2>')
    for ts,words,imgs,res in steps:
        o.append(f'<div class="step"><div class="t">{ts} · my prompt</div><div class="you">{html.escape(words)}</div>')
        if imgs:
            cls='imgs two' if len(imgs)>1 else 'imgs'
            o.append(f'<div class="{cls}">'+''.join(f'<img src="{img(n)}" alt="screenshot I sent">' for n in imgs)+'</div>')
        if res: o.append(f'<div class="res"><b>What changed:</b> {html.escape(res)}</div>')
        o.append('</div>')
o.append('<h2>The result: Episode 12, before and after</h2><p>OLD = the version that was live; NEW = the redo, now on YouTube (Part 1: youtube.com/watch?v=zCCVRRtDffc · Part 2: youtube.com/watch?v=Mb9XNdpTSrk).</p>')
for f in ['preview_p1_before_after.jpg','preview_p2_before_after.jpg']:
    o.append(f'<div class="full"><img src="{b64(QA+f,1600,80)}" alt="EP12 before and after"></div>')
o.append('<p class="sub">Episode 13\'s redo follows the same notes; its before/after sheet is added when it is finished.</p></body></html>')
open('/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/tut/How-my-prompts-changed-EP12-EP13.html','w').write('\n'.join(o))
print('ok', os.path.getsize('/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/tut/How-my-prompts-changed-EP12-EP13.html')//1024,'KB')
