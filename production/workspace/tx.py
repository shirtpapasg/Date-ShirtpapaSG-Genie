import sys
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
segs, info = m.transcribe(sys.argv[1], word_timestamps=False, language="en")
for s in segs: print(f"[{s.start:5.1f}-{s.end:5.1f}] {s.text.strip()}")
