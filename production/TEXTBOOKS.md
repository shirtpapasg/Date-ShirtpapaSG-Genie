# Textbook sources for "TheOneApp, Explained" (Google Drive, owner shirtpapasg@gmail.com)

The teacher asked us (11 Oct 2026) to take note of the P5 and P6 textbooks for future series.
Use every book only as a topic map: paraphrase, never copy text or pictures (books are marked "For Teachers' Use Only. Not For Distribution").
Read a book with the Drive connector: mcp__Google_Drive__read_file_content(fileId). Direct download from the container is blocked (proxy 403).

Main folder "1bUKCWPGSiqCN9kzlC7WOWHH6nUsU3JNw" (the folder the teacher shares from):

| Level | Book | Drive file id | Size | Notes |
|---|---|---|---|---|
| P3 | Inspiring Science P3 Textbook | 1rqAhBU29SUCwBbgCVZGkUwUfCfr44ZbI | 47 MB | P3 series source (started 11 Oct 2026) |
| P3 | Inspiring Science P3 Activity Book | 1AEmGrt8efAZS9JnUnP-h0DkrcqZ3jHAs | 15 MB | activities / experiments |
| P3 | Table of Contents | 1BPVIUS7_Zf86-K2o4XUdEdY09_1a4kyr | 0.9 MB | quick chapter list |
| P4 | Inspiring Science P4 Textbook | 18Cf1xd0CmOQUkDSh6Z_CJJDyW1shRyw2 | 51 MB | P4 series used flipbook 1sKc5ihg-V0J54YShOlGYHbNhq5byZG9n |
| P5 | Inspiring Science P5 Textbook (Standard) | 1QLTh7wafdKBJSlYEzBEp0zkojPwUQKYr | 106 MB | same book also 1ASKI4nhU50s1p2kofbkKwT-V8oNd917i; Foundation: 1ciPtW8wPVynGj-GRD9QBfX9Ey7PF3MjY |
| P5 | P5 Activity Book (Standard) | 1uJSYifVNGY8kGgm4IueQS_DiWJLt1Jbf | 36 MB | also 1DSYL4X3Z8U_HFu3bTNy0mWhSZhRgygti |
| P6 | Inspiring Science P6 Textbook (Standard) | 1gTZSnjGLHP2ktmvVf_KR_9N9gwB3FOfA | 18 MB | in folder "1. P6 Inspiring Science Textbook" (1OjPK-rbV-I9J1tjQ0troeodYIzyM9rps) |
| P6 | Inspiring Science P6 Textbook (Foundation) | 1faK4j167XO7I8trpFFmhUN9BK2CCvpgN | 47 MB | in the main folder; same as 11qggAQ-UB3DMsUvAQ4NkZ4ge5bsAyPOb |
| P6 | P6 Activity Book (Standard) | 1OxmxLLHjdIOumACDO5yUgZWBX7-jqUFr | 23 MB | Foundation: 1Kduc8f6Bm2qNyvbDO36W8vWWOQj3sipl |
| All | 2025 Primary Science Monograph (Essential Reading) | 17OzDgiPCrOGfh8fOXyrO2RlzScH922Fo | 11 MB | MOE reference: use it to check definitions |

Also in Drive (teacher's own material, useful for exam wording): P4/P5/P6 Science AL1 recitation tables, P5/P6 WA1 trigger banks, P6 Science booklets A/B 2026.

## Review boards
- P4: https://claude.ai/artifact/4LdsCNE87uai78ZDNHTPss (db/comments via https://claude.ai/code/artifact/1b094449-aeee-4680-b42d-ad21bf56d5ce)
- P3: https://claude.ai/artifact/LfKMLzdwANDQsbRkNjE3gP (page source W/review_p3/index.html; collection "episodes", same schema as P4)

## YouTube publishing (channel "TheOneApp")
- Google Cloud OAuth client "TheOneApp Publisher", type TVs and Limited Input devices (device flow, scope https://www.googleapis.com/auth/youtube).
- Client ID (public identifier, not a secret): 780560926873-6ofcq6456cldkmgugtc32tuj6ots6l16.apps.googleusercontent.com
- Client secret: environment variable YT_CLIENT_SECRET only (never in chat or files).
- Plan: teacher uploads the MP4s in Studio (API uploads from unaudited projects are locked Private); we set metadata, thumbnails, made-for-kids, playlist, visibility via the API.

## Character voices (tts/character_voices.py)
- Method now: Praat 'Change gender' (tts/*_kid.py), not rubberband (sounded robotic). Then ffmpeg loudnorm I=-16, 48 kHz.
- Pip (chinchilla, cute and lively): CHOSEN pip_kid3 = af_heart .6 + af_nova .4, speed 1.10, formant 1.18, pitch median 340, range 1.4 (tts/pip_kid.py).
- Basil (kid lizard, sharp and energetic): CHOSEN basil_kid2 = am_puck .6 + am_fenrir .4, speed 1.10, formant 1.16, pitch median 245, range 1.3 (tts/basil_kid.py). Replaces basil_A.
- Momo (playful, cute, friendly): CHOSEN momo_kid3 = af_heart .5 + af_aoede .3 + af_jessica .2, speed 1.06, formant 1.16, pitch median 325, range 1.4 (tts/momo_kid.py).
