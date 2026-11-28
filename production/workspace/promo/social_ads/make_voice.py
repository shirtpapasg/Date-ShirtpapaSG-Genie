"""make_voice.py: Heart's lines for the ads -> voice/<id>.wav, with Heart's narrator kit (voice 3, --style expressive).
  /home/user/heart-tts/venv/bin/python make_voice.py
Kit: /home/user/secondbrain/tools/kits/heart-voice-kit/heart_say.py (run as is; the local model files are passed in).
Every line is checked against ../../explained2/sg_pron.py (the approved pronunciation list): a line that needs a fix stops the run.
Existing files are kept; delete one to record it again."""
import os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H); sys.path.insert(0, os.path.join(H, '..', '..', 'explained2'))
from script import AD15, AD30, PRON
from sg_pron import needs_fix
KIT = '/home/user/secondbrain/tools/kits/heart-voice-kit/heart_say.py'; PY = '/home/user/heart-tts/venv/bin/python'
os.makedirs(os.path.join(H, 'voice'), exist_ok=True)
for lid, text, _ in AD15 + AD30:
    for a, b in PRON.items(): text = text.replace(a, b)
    if needs_fix(text): sys.exit(f'{lid}: "{text}" has a word on the pronunciation list: speak it with sg_pron.speak_line')
    out = os.path.join(H, 'voice', lid + '.wav')
    if os.path.exists(out): continue
    subprocess.run([PY, KIT, text, '--style', 'expressive', '--model', '/home/user/heart-tts/kokoro.onnx', '--voices', '/home/user/heart-tts/voices.bin', '-o', out], check=True)
