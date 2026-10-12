# P4 EP01 "Systems": changes waiting for a re-render

The episode on YouTube (https://www.youtube.com/watch?v=Dyw505BwWnI) was rendered before these changes.
The sources here are copies of the files on branch `claude/cool-hypatia-v13e6t`, edited in place.

## 12 Oct 2026: quiz card C "SPOKES" becomes "WHEEL" (teacher's request, for a young audience)

| File | Change |
|---|---|
| `p4/ep01_segments.json` quiz1 | "Some spokes?" → "A wheel?" |
| `p4/ep01_segments.json` quiz2 | "Broken spokes make the wheel wobbly and weak." → "Without a wheel, the bike cannot roll at all." |
| `ep1/ep1.html` quiz scene | card label SPOKES → WHEEL; cues `a("wheel")` and `b("wheel#2")` (the first "wheel" in quiz2 belongs to the chain line); reveal note "wobbly & weak" → "can't roll". The card picture was already a wheel. |
| `p4/ep01_script.md` | the two table rows to match |

Spoken words: +1 (quiz2). Everything after quiz2 moves later by about a second; the timeline is rebuilt by the pipeline.

## What the re-render needs

1. Heart "voice 3" narration for quiz1 and quiz2. **Update 12 Oct 2026:** Heart's app-tour voice has been rebuilt and saved in TheOneApp as `production/voice/heart_voice.py` (Kokoro `af_heart`, sentence by sentence, speed 0.92, 1.1 s pauses; timing and spectrum measured against her own tour clips). It is the likely starting point for these two lines too; match its speed and pauses by ear against EP01's existing narration before rendering. It was made by `expressive_batch.py` (Kokoro `af_heart`, setting 1.6) in an earlier session's scratch folder. That script and the old `voice3_cache.json` were never saved to the repo or Drive. The Kokoro model and voices can be downloaded again from the kokoro-onnx GitHub release; the expressive script must be recovered or rewritten and matched by ear against EP02–05.
2. Re-align, rebuild `tl.json` and `ep1b.html`, render (`ep1/run_all.sh`), check the quiz frames.
3. YouTube cannot replace a published video. Upload the new file (in Studio, or by API once the audit passes), copy the title, description, thumbnail, made-for-kids and playlist position from the old one, then set the old one to Unlisted.
4. Change EP01's link in TheOneApp `videos.js` to the new video. A credit for watching EP01 is keyed by level and episode number, so it carries over.
