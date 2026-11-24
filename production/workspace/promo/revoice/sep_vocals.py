# the htdemucs_ft vocals specialist only (the bag's weights are one-hot, so its vocals stem equals the full bag's), no_vocals = mix - vocals
import sys, torch, numpy as np, soundfile as sf
from demucs.pretrained import get_model
from demucs.apply import apply_model
from demucs.audio import convert_audio
bag = get_model("htdemucs_ft"); vi = bag.sources.index("vocals")
k = max(range(len(bag.models)), key=lambda i: bag.weights[i][vi]); m = bag.models[k]; m.eval(); print("model", k, bag.weights[k])
torch.set_num_threads(4)
for src, out in zip(sys.argv[1::2], sys.argv[2::2]):
    x, sr = sf.read(src, always_2d=True); wav = torch.tensor(x.T, dtype=torch.float32)
    w = convert_audio(wav, sr, m.samplerate, m.audio_channels); ref = w.mean(0); w = (w - ref.mean()) / ref.std()
    with torch.no_grad(): y = apply_model(m, w[None], shifts=1, split=True, overlap=.25, progress=True)[0]
    voc = y[m.sources.index("vocals")] * ref.std() + ref.mean()
    import torchaudio; voc = torchaudio.functional.resample(voc, m.samplerate, sr)[:, :wav.shape[1]]
    v = voc.numpy().T; v = np.pad(v, ((0, x.shape[0] - len(v)), (0, 0)))
    sf.write(out + "_vocals.wav", v, sr, subtype="FLOAT"); sf.write(out + "_no_vocals.wav", x - v, sr, subtype="FLOAT"); print("done", out, flush=True)
