/**
 * Tranquil procedural audio soundscape using Web Audio API.
 * Synthesizes gentle rain/stream ambience and harmonic singing bowl bells
 * with no external network dependencies or broken audio files.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private chimeTimer: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Main master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 2.5); // Soft tranquil volume
      this.gainNode.connect(this.ctx.destination);

      // Pink noise / gentle bamboo rain stream synthesis
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Warm low-pass filter (simulates soothing bamboo water fountain)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.gainNode);
      whiteNoise.start(0);
      this.noiseNode = whiteNoise;

      // Occasional gentle Tibetan harmonic bell chime
      this.triggerChime();
      this.chimeTimer = window.setInterval(() => {
        if (this.isPlaying && Math.random() > 0.3) {
          this.triggerChime();
        }
      }, 9000);

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public triggerChime() {
    if (!this.ctx || !this.isPlaying || !this.gainNode) return;
    try {
      const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major pentatonic
      const root = frequencies[Math.floor(Math.random() * frequencies.length)];

      const osc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(root, this.ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 0.1);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 5.0);

      osc.connect(chimeGain);
      chimeGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 5.2);
    } catch {
      // Audio node cleanup
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // Safe catch
      }
    }
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
    setTimeout(() => {
      if (this.noiseNode) {
        try {
          (this.noiseNode as AudioBufferSourceNode).stop();
        } catch {
          // ignore
        }
        this.noiseNode = null;
      }
      this.isPlaying = false;
    }, 600);
    this.isPlaying = false;
  }
}

export const soundscape = new SoundscapeEngine();
