// Web Audio API — no external dependencies
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function tone(frequency, duration, type = 'sine', gain = 0.3, delay = 0) {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = frequency;
    g.gain.setValueAtTime(0, ac.currentTime + delay);
    g.gain.linearRampToValueAtTime(gain, ac.currentTime + delay + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration);
    osc.start(ac.currentTime + delay);
    osc.stop(ac.currentTime + delay + duration);
  } catch {}
}

export function playCorrect() {
  tone(523, 0.12, 'sine', 0.25, 0);
  tone(659, 0.12, 'sine', 0.25, 0.1);
  tone(784, 0.2, 'sine', 0.3, 0.2);
}

export function playWrong() {
  tone(220, 0.15, 'sawtooth', 0.2, 0);
  tone(185, 0.25, 'sawtooth', 0.15, 0.12);
}

export function playComplete() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'sine', 0.25, i * 0.12));
}

export function playXP() {
  tone(880, 0.08, 'sine', 0.2, 0);
  tone(1100, 0.12, 'sine', 0.2, 0.08);
}
