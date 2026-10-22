/**
 * マイルームメーカー 🛋️✨ - audio.js
 * Web Audio API によるシンセサイザーBGM ＆ 効果音（SFX）エンジン
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.bgmTimer = null;
    this.isBgmPlaying = false;
    this.currentTrack = 0;

    // 5種類のオリジナルBGMトラック
    this.tracks = [
      // 0: 🧸 ゆめかわワルツ (Dreamy Waltz)
      {
        name: '🧸 1. ゆめかわワルツ',
        notes: [523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25, 587.33, 659.25, 698.46, 783.99, 659.25, 523.25, 440.00, 523.25],
        tempo: 240,
        type: 'sine',
        vol: 0.08
      },
      // 1: 🎶 たのしいポップ (Cheerful Pop)
      {
        name: '🎶 2. たのしいポップ',
        notes: [523.25, 659.25, 783.99, 987.77, 1046.50, 783.99, 880.00, 659.25, 587.33, 698.46, 880.00, 1046.50, 987.77, 783.99, 659.25, 587.33],
        tempo: 160,
        type: 'triangle',
        vol: 0.09
      },
      // 2: 🌙 ほしぞらオルゴール (Starry Musicbox)
      {
        name: '🌙 3. ほしぞらオルゴール',
        notes: [1046.50, 1318.51, 1567.98, 1318.51, 1174.66, 1318.51, 1046.50, 880.00, 987.77, 1046.50, 1174.66, 1318.51, 1046.50, 880.00, 783.99, 880.00],
        tempo: 300,
        type: 'sine',
        vol: 0.07
      },
      // 3: ☕ おだやかカフェ (Peaceful Cafe)
      {
        name: '☕ 4. おだやかカフェ',
        notes: [392.00, 440.00, 523.25, 587.33, 659.25, 523.25, 440.00, 392.00, 349.23, 392.00, 440.00, 523.25, 440.00, 392.00, 349.23, 329.63],
        tempo: 280,
        type: 'triangle',
        vol: 0.08
      },
      // 4: 🕶️ クールシンセ (Cyber Cool Synth)
      {
        name: '🕶️ 5. クールシンセ',
        notes: [440.00, 523.25, 659.25, 880.00, 783.99, 659.25, 523.25, 440.00, 493.88, 587.33, 739.99, 987.77, 880.00, 739.99, 587.33, 493.88],
        tempo: 150,
        type: 'sawtooth',
        vol: 0.035
      }
    ];
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
    this.currentTrack = parseInt(trackIdx, 10) || 0;
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.playBgm();
    }
  }

  playBgm() {
    this.init();
    if (!this.ctx) return;
    this.isBgmPlaying = true;

    const track = this.tracks[this.currentTrack] || this.tracks[0];
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

          const duration = (track.tempo / 1000) * 0.9;
          gain.gain.setValueAtTime(track.vol, this.ctx.currentTime);
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

  // --------------------------------------------------
  // 効果音 (SFX)
  // --------------------------------------------------

  // 1. 家具を置いたとき（ポンッ♪）
  playPlace() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  // 2. キラキラ音（チリンチリン〜✨）
  playSparkle() {
    this.init();
    if (!this.ctx) return;
    const freqs = [1046.50, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);

        const startTime = this.ctx.currentTime + idx * 0.04;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.linearRampToValueAtTime(0.0001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.18);
      } catch (e) {}
    });
  }

  // 3. バッグにしまったとき（シュポッ♪）
  playRemove() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // 4. 写真撮影（カシャッ！📸）
  playCamera() {
    this.init();
    if (!this.ctx) return;
    try {
      // 1音目（メカニカルクリック）
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain1.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start();
      osc1.stop(this.ctx.currentTime + 0.05);

      // 2音目（シャッター開放音）
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1200, this.ctx.currentTime + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.14);

      gain2.gain.setValueAtTime(0.2, this.ctx.currentTime + 0.06);
      gain2.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(this.ctx.currentTime + 0.06);
      osc2.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }
}

// グローバルインスタンス
window.soundManager = new SoundManager();
