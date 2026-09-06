// Web Audio API Sound & 5 Original BGM Synthesizer Engine (100% Robust Edition)

class SoundManager {
  constructor() {
    this.ctx = null;
    this.bgmTimer = null;
    this.isBgmPlaying = false;
    this.currentTrack = 0;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn('AudioContext init notice:', e);
    }
  }

  toggleBgm() {
    this.init();
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.playBgm();
      return true;
    }
  }

  setTrack(trackIdx) {
    this.currentTrack = trackIdx;
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.playBgm();
    }
  }

  playBgm() {
    this.init();
    if (!this.ctx) return;
    this.isBgmPlaying = true;

    // 5 Distinct 100% Original Synthesizer Melodies
    const tracks = [
      // Track 0: ゆめかわワルツ (Original Dreamy Waltz)
      {
        notes: [523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25, 587.33, 659.25, 698.46, 783.99, 659.25, 523.25, 440.00, 523.25],
        tempo: 220,
        type: 'sine'
      },
      // Track 1: エレクトロポップ (Original Electronic Electro-Synth Arpeggio)
      {
        notes: [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98, 1318.51, 1046.50, 440.00, 554.37, 659.25, 880.00, 1174.66, 1318.51, 1046.50, 880.00],
        tempo: 120,
        type: 'sawtooth'
      },
      // Track 2: ほしぞらオルゴール (Original Starry Musicbox)
      {
        notes: [1046.50, 1318.51, 1567.98, 1318.51, 1174.66, 1318.51, 1046.50, 880.00, 987.77, 1046.50, 1174.66, 1318.51, 1046.50, 880.00, 783.99, 880.00],
        tempo: 300,
        type: 'triangle'
      },
      // Track 3: さくらのマーチ (Original Sakura March)
      {
        notes: [659.25, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 587.33, 659.25, 783.99, 659.25, 523.25, 587.33, 659.25, 523.25],
        tempo: 140,
        type: 'square'
      },
      // Track 4: きらめきシンセ (Original Sparkle Synthwave Arpeggio)
      {
        notes: [783.99, 987.77, 1174.66, 1567.98, 1174.66, 987.77, 880.00, 1046.50, 1318.51, 1760.00, 1318.51, 1046.50, 659.25, 783.99, 987.77, 659.25],
        tempo: 115,
        type: 'sine'
      }
    ];

    const track = tracks[this.currentTrack] || tracks[0];
    let noteIdx = 0;

    if (this.bgmTimer) clearInterval(this.bgmTimer);

    this.bgmTimer = setInterval(() => {
      if (!this.isBgmPlaying || !this.ctx) return;
      
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const freq = track.notes[noteIdx % track.notes.length];
      noteIdx++;

      if (freq > 0) {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = track.type;
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const volume = (track.type === 'sawtooth' || track.type === 'square') ? 0.03 : 0.065;
          const duration = (track.tempo / 1000) * 0.9;

          gain.gain.setValueAtTime(volume, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
          console.warn('Note play error:', e);
        }
      }
    }, track.tempo);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // --- Sound Effects (SFX) ---
  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch(e) {}
  }

  playSparkle() {
    this.init();
    if (!this.ctx) return;
    const freqs = [1046.50, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.15);
        } catch(e) {}
      }, idx * 50);
    });
  }

  playCamera() {
    this.init();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.1;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch(e) {}
  }

  playRoulette() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(600 + Math.random() * 300, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + (idx === 3 ? 0.4 : 0.12));

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + (idx === 3 ? 0.4 : 0.12));
        } catch(e) {}
      }, idx * 90);
    });
  }
}

window.soundManager = new SoundManager();
