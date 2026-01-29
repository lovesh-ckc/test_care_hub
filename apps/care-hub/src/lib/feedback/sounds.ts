type SoundId = "tap" | "confirm" | "error" | "sos";

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return null;
    audioContext = new AudioContextCtor();
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
};

const playTone = (frequency: number, durationMs: number, gainValue = 0.08) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + durationMs / 1000 + 0.03);
};

export const playSound = (sound: SoundId) => {
  switch (sound) {
    case "tap":
      playTone(420, 80, 0.06);
      break;
    case "confirm":
      playTone(520, 140, 0.08);
      break;
    case "error":
      playTone(220, 180, 0.1);
      break;
    case "sos":
      playTone(660, 180, 0.12);
      break;
    default:
      break;
  }
};
