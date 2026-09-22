// ===== バターASMR メインスクリプト =====

// ----- サウンドマネージャー (Web Audio API) -----
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn('AudioContext init notice:', e);
    }
  }

  // パキッ音（ワックスクラッキングASMR音）
  playCrack(progress) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. カチッ！と弾ける鋭い高周波スナップ（硬い殻がパキッと割れる核）
    const snapOsc = this.ctx.createOscillator();
    snapOsc.type = 'triangle';
    // 割れが進むにつれて基本周波数が微妙に下がり、ゴリパキ感が出る
    const startFreq = 3800 - progress * 1500 + (Math.random() * 400 - 200);
    snapOsc.frequency.setValueAtTime(startFreq, now);
    snapOsc.frequency.exponentialRampToValueAtTime(180, now + 0.016);

    const snapGain = this.ctx.createGain();
    snapGain.gain.setValueAtTime(0.5, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.02);

    // 2. パリパリッ！と広がる微細なマルチクラック音（破片・ヒビの走行音）
    const crackDuration = 0.045 + progress * 0.025;
    const crackSize = Math.floor(this.ctx.sampleRate * crackDuration);
    const crackBuf = this.ctx.createBuffer(1, crackSize, this.ctx.sampleRate);
    const crackData = crackBuf.getChannelData(0);

    // 3〜5箇所のランダムなスパイク（細かいワックスのパキパキ連打）
    const burstCount = 3 + Math.floor(Math.random() * 3);
    for (let b = 0; b < burstCount; b++) {
      const burstPos = Math.floor(Math.random() * (crackSize * 0.8));
      const burstLen = Math.floor(this.ctx.sampleRate * 0.003);
      for (let j = 0; j < burstLen && burstPos + j < crackSize; j++) {
        const decay = Math.pow(1 - j / burstLen, 2);
        crackData[burstPos + j] += (Math.random() * 2 - 1) * decay * 0.9;
      }
    }

    const crackSource = this.ctx.createBufferSource();
    crackSource.buffer = crackBuf;

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 4500 - progress * 1600;
    bpf.Q.value = 2.0;

    const crackGain = this.ctx.createGain();
    crackGain.gain.setValueAtTime(0.45, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + crackDuration);

    crackSource.connect(bpf);
    bpf.connect(crackGain);
    crackGain.connect(this.ctx.destination);
    crackSource.start(now + 0.002);
    crackSource.stop(now + crackDuration + 0.005);

    // 3. コッという指・ナイフで触れた手応え（低音インパクト）
    const thud = this.ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(220, now);
    thud.frequency.exponentialRampToValueAtTime(50, now + 0.022);

    const thudGain = this.ctx.createGain();
    thudGain.gain.setValueAtTime(0.28, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(now);
    thud.stop(now + 0.03);
  }

  // 完全に割れた時の音
  playBreak() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 重い割れ音
    const bufSize = this.ctx.sampleRate * 0.3;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + 0.3);

    // 低音のインパクト
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    const impactGain = this.ctx.createGain();
    impactGain.gain.setValueAtTime(0.3, now);
    impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(impactGain);
    impactGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // キラキラ音
  playSparkle(index) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 高音のサイン波
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    const baseFreq = 1200 + index * 150;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // もちもちスクイーズ音（むにゅ〜、ぷにっ）
  playSquish() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 柔らかいむにゅっという変形音
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);

    // バンドパスで水分・粘り気のある質感に
    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'lowpass';
    bpf.frequency.setValueAtTime(600, now);
    bpf.frequency.exponentialRampToValueAtTime(250, now + 0.09);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 離したときの反発音（ぽよん！ぷるん！）
  playPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // ぽよんと跳ねるサイン波ピッチモジュレーション
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.14);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // むにゅむにゅモード突入ファンファーレ
  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  // 1. クリーミー打鍵音（コトコト・トコトコ）
  playCreamyKey(pitch = 0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = 260 * Math.pow(1.06, pitch);

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.05);

    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(550, now);
    lpf.Q.value = 3.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(lpf);
    lpf.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // 底打ち感
    const thud = this.ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(120, now);
    thud.frequency.exponentialRampToValueAtTime(40, now + 0.04);
    const thudGain = this.ctx.createGain();
    thudGain.gain.setValueAtTime(0.3, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(now);
    thud.stop(now + 0.05);
  }

  // 2. クラッキー打鍵音（カチカチッ！ パチッ！）
  playClackyKey(pitch = 0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = 1800 * Math.pow(1.05, pitch);

    // 高音スナップ
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(baseFreq * 1.8, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.02);

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(baseFreq, now);
    bpf.Q.value = 4.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);

    // カチッというクリックノイズ
    const clickSize = Math.floor(this.ctx.sampleRate * 0.008);
    const clickBuf = this.ctx.createBuffer(1, clickSize, this.ctx.sampleRate);
    const data = clickBuf.getChannelData(0);
    for (let i = 0; i < clickSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / clickSize, 3);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = clickBuf;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
  }

  // 3. ゼリー打鍵音（ぽこぽこ・ぷちゅっ）
  playJellyKey(pitch = 0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = 420 * Math.pow(1.06, pitch);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 1.4, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.08);

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(baseFreq, now);
    bpf.Q.value = 5.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 4. ガラス打鍵音（カラン・チリン・キーン）
  playGlassKey(pitch = 0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = 1200 * Math.pow(1.07, pitch);

    // 澄んだガラスのベル倍音
    [1.0, 2.76, 5.4].forEach((ratio, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      const gain = this.ctx.createGain();
      const vol = 0.3 / (idx + 1);
      const decay = 0.14 / (idx * 0.5 + 1);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + decay);
    });
  }

  // フルーツ飴クラック音（パリンッ！カリッ！）
  playTanghuluCrack() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. 硬質ガラス飴の鋭い高域スナップ（パリンッ！）
    const snapOsc = this.ctx.createOscillator();
    snapOsc.type = 'triangle';
    const startFreq = 3800 + Math.random() * 800;
    snapOsc.frequency.setValueAtTime(startFreq, now);
    snapOsc.frequency.exponentialRampToValueAtTime(180, now + 0.015);

    const snapGain = this.ctx.createGain();
    snapGain.gain.setValueAtTime(0.6, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.02);

    // 2. ガラス結晶の破壊ノイズ（シャキッ、パリッ）
    const crackDur = 0.038;
    const crackSize = Math.floor(this.ctx.sampleRate * crackDur);
    const crackBuf = this.ctx.createBuffer(1, crackSize, this.ctx.sampleRate);
    const crackData = crackBuf.getChannelData(0);

    for (let i = 0; i < crackSize; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackSize, 2);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = crackBuf;

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 5500 + Math.random() * 1200;
    bpf.Q.value = 4.0;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + crackDur);

    noise.connect(bpf);
    bpf.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now + 0.001);

    // 3. 果肉・竹串の打撃感（コツッ）
    const thud = this.ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(320, now);
    thud.frequency.exponentialRampToValueAtTime(80, now + 0.02);

    const thudGain = this.ctx.createGain();
    thudGain.gain.setValueAtTime(0.3, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(now);
    thud.stop(now + 0.025);
  }

  // プッシュポップ バブル弾け音（ポコッ！パコッ！）
  playPopBubble(pitchIndex = 0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // ピッチの微妙な揺らぎ（ポコポコ連続で心地よい音程感）
    const pitches = [280, 310, 340, 370, 400, 440];
    const baseFreq = pitches[pitchIndex % pitches.length] * (0.95 + Math.random() * 0.1);

    // シリコンが奥へポンと反転する急速周波数スイープ
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 0.8, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + 0.012);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.055);

    // バンドパスフィルターでシリコンのふっくら感を演出
    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(baseFreq * 1.2, now);
    bpf.Q.value = 2.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);

    // 軽いクリックポップ
    const clickSize = Math.floor(this.ctx.sampleRate * 0.005);
    const clickBuf = this.ctx.createBuffer(1, clickSize, this.ctx.sampleRate);
    const clickData = clickBuf.getChannelData(0);
    for (let i = 0; i < clickSize; i++) {
      clickData[i] = (Math.random() * 2 - 1) * (1 - i / clickSize);
    }
    const clickSource = this.ctx.createBufferSource();
    clickSource.buffer = clickBuf;
    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.25, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.006);
    clickSource.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickSource.start(now);
  }
}

const sound = new SoundManager();

// ----- バター・スクイーズデータ -----
const BUTTERS = {
  // バタースクイーズ
  normal: {
    name: 'ふつうのバター',
    emoji: '🧈',
    cssClass: '',
    labelColor: '#ff8c42',
    type: 'butter'
  },
  choco: {
    name: 'チョコバター',
    emoji: '🍫',
    cssClass: 'butter-choco',
    labelColor: '#7a5020',
    type: 'butter'
  },
  ichigo: {
    name: 'いちごバター',
    emoji: '🍓',
    cssClass: 'butter-ichigo',
    labelColor: '#ff69b4',
    type: 'butter'
  },
  matcha: {
    name: 'まっちゃバター',
    emoji: '🍵',
    cssClass: 'butter-matcha',
    labelColor: '#5b8a3c',
    type: 'butter'
  },

  // 肉まんスクイーズ
  nikuman_normal: {
    name: 'ふつうの肉まん',
    emoji: '🥟',
    cssClass: 'butter-nikuman-normal',
    labelColor: '#8a6a4e',
    type: 'nikuman'
  },
  nikuman_ichigo: {
    name: 'いちご肉まん',
    emoji: '🍓🥟',
    cssClass: 'butter-nikuman-ichigo',
    labelColor: '#ff69b4',
    type: 'nikuman'
  },
  nikuman_choco: {
    name: 'チョコ肉まん',
    emoji: '🍫🥟',
    cssClass: 'butter-nikuman-choco',
    labelColor: '#7a5020',
    type: 'nikuman'
  },
  nikuman_matcha: {
    name: 'まっちゃ肉まん',
    emoji: '🍵🥟',
    cssClass: 'butter-nikuman-matcha',
    labelColor: '#5b8a3c',
    type: 'nikuman'
  },

  // キーボードASMR
  kb_creamy: {
    name: 'クリーミーキーボード',
    emoji: '🍦',
    cssClass: 'kb-theme-creamy',
    labelColor: '#7a5020',
    type: 'keyboard',
    soundType: 'creamy'
  },
  kb_clacky: {
    name: 'クラッキーキーボード',
    emoji: '⚡',
    cssClass: 'kb-theme-clacky',
    labelColor: '#2a7050',
    type: 'keyboard',
    soundType: 'clacky'
  },
  kb_jelly: {
    name: 'ゼリーキーボード',
    emoji: '🍮',
    cssClass: 'kb-theme-jelly',
    labelColor: '#d64d85',
    type: 'keyboard',
    soundType: 'jelly'
  },
  kb_glass: {
    name: 'ガラスキーボード',
    emoji: '💎',
    cssClass: 'kb-theme-glass',
    labelColor: '#257095',
    type: 'keyboard',
    soundType: 'glass'
  },

  // フルーツ飴ASMR
  tanghulu_ichigo: {
    name: 'いちご飴',
    emoji: '🍓✨',
    cssClass: '',
    labelColor: '#ff3366',
    type: 'tanghulu',
    fruitType: 'strawberry'
  },
  tanghulu_muscat: {
    name: 'マスカット飴',
    emoji: '🍇✨',
    cssClass: '',
    labelColor: '#43a047',
    type: 'tanghulu',
    fruitType: 'muscat'
  },
  tanghulu_mikan: {
    name: 'みかん飴',
    emoji: '🍊✨',
    cssClass: '',
    labelColor: '#f57c00',
    type: 'tanghulu',
    fruitType: 'mikan'
  },
  tanghulu_apple: {
    name: 'りんご飴',
    emoji: '🍎✨',
    cssClass: '',
    labelColor: '#d32f2f',
    type: 'tanghulu',
    fruitType: 'apple'
  },

  // プッシュポップASMR
  pushpop_rainbow: {
    name: 'レインボーハート',
    emoji: '💖🌈',
    cssClass: 'pushpop-theme-rainbow',
    labelColor: '#e91e63',
    type: 'pushpop',
    theme: 'rainbow'
  },
  pushpop_star: {
    name: 'パステルスター',
    emoji: '⭐✨',
    cssClass: 'pushpop-theme-star',
    labelColor: '#fbc02d',
    type: 'pushpop',
    theme: 'star'
  },
  pushpop_bear: {
    name: 'くまちゃん',
    emoji: '🐻🎈',
    cssClass: 'pushpop-theme-bear',
    labelColor: '#795548',
    type: 'pushpop',
    theme: 'bear'
  },
  pushpop_candy: {
    name: 'キャンディ',
    emoji: '🍭🍬',
    cssClass: 'pushpop-theme-candy',
    labelColor: '#ab47bc',
    type: 'pushpop',
    theme: 'candy'
  },
};

// 形状パス（バター用 ＆ 肉まん用）
const PATH_BUTTER = 'M 60,75 C 60,50 90,42 160,42 C 230,42 260,50 260,75 C 260,95 264,135 258,162 C 254,178 220,182 160,182 C 100,182 66,178 62,162 C 56,135 60,95 60,75 Z';
const PATH_NIKUMAN = 'M 65,165 C 55,140 55,100 90,65 C 120,40 160,36 160,36 C 160,36 200,40 230,65 C 265,100 265,140 255,165 C 250,175 220,180 160,180 C 100,180 70,175 65,165 Z';

// ----- State -----
let currentButter = null;
let crackCount = 0;
const MAX_CRACKS = 35; // パキパキ割ってむにゅむにゅモードへ入る回数
let isSquishMode = false;
let isPressing = false;

// ----- DOM -----
const selectScreen = document.getElementById('select-screen');
const playScreen = document.getElementById('play-screen');
const butterLabel = document.getElementById('butter-label');
const butterStage = document.getElementById('butter-stage');
const butterSvg = document.getElementById('butter-svg');
const butterArea = document.getElementById('butter-area');
const keyboardArea = document.getElementById('keyboard-area');
const waxShell = document.getElementById('wax-shell');
const crackLayer = document.getElementById('crack-layer');
const hintText = document.getElementById('hint-text');
const squishBanner = document.getElementById('squish-banner');
const completeButtons = document.getElementById('complete-buttons');
const btnBack = document.getElementById('btn-back');
const btnRetry = document.getElementById('btn-retry');
const btnChange = document.getElementById('btn-change');

// フルーツ飴DOM
const tanghuluArea = document.getElementById('tanghulu-area');
const tanghuluItems = document.getElementById('tanghulu-items');
const tanghuluBanner = document.getElementById('tanghulu-banner');
const tanghuluHint = document.getElementById('tanghulu-hint');

// プッシュポップDOM
const pushpopArea = document.getElementById('pushpop-area');
const pushpopPlate = document.getElementById('pushpop-plate');
const pushpopGrid = document.getElementById('pushpop-grid');
const pushpopBanner = document.getElementById('pushpop-banner');
const pushpopHint = document.getElementById('pushpop-hint');

// ----- 画面遷移 -----
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active', 'fade-in');
  });
  screen.classList.add('active', 'fade-in');
}

function goToPlay(butterKey) {
  currentButter = butterKey;
  const data = BUTTERS[butterKey];

  // 色テーマを適用
  document.body.className = data.cssClass;

  // ラベル更新
  butterLabel.textContent = data.emoji + ' ' + data.name;
  butterLabel.style.color = data.labelColor;

  // 全エリアをいったん隠す
  butterArea.classList.add('hidden');
  keyboardArea.classList.add('hidden');
  tanghuluArea.classList.add('hidden');
  pushpopArea.classList.add('hidden');

  if (data.type === 'keyboard') {
    // キーボード画面を表示（余計なボタンを排してキーボードに集中）
    keyboardArea.classList.remove('hidden');
    completeButtons.classList.add('hidden');
  } else if (data.type === 'tanghulu') {
    // フルーツ飴画面を表示
    tanghuluArea.classList.remove('hidden');
    completeButtons.classList.remove('hidden');
    btnRetry.classList.remove('hidden');
    initTanghulu(data.fruitType);
  } else if (data.type === 'pushpop') {
    // プッシュポップ画面を表示
    pushpopArea.classList.remove('hidden');
    completeButtons.classList.remove('hidden');
    btnRetry.classList.remove('hidden');
    initPushpop(data.theme);
  } else {
    // スクイーズ画面を表示
    butterArea.classList.remove('hidden');
    completeButtons.classList.remove('hidden');
    btnRetry.classList.remove('hidden');

    // バター vs 肉まんの形状切り替え
    const isNikuman = data.type === 'nikuman';
    const nikumanPleats = document.getElementById('nikuman-pleats');
    const nikumanPaper = document.getElementById('nikuman-paper');
    const nikumanFace = document.getElementById('nikuman-face');
    const faceNormal = document.getElementById('face-normal');
    const faceSquish = document.getElementById('face-squish');
    const coreBody = document.getElementById('core-body');
    const waxCover = document.getElementById('wax-cover');

    if (isNikuman) {
      if (nikumanPleats) nikumanPleats.classList.remove('hidden');
      if (nikumanPaper) nikumanPaper.classList.remove('hidden');
      if (nikumanFace) nikumanFace.classList.remove('hidden');
      if (faceNormal) faceNormal.classList.remove('hidden');
      if (faceSquish) faceSquish.classList.add('hidden');
      if (coreBody) coreBody.setAttribute('d', PATH_NIKUMAN);
      if (waxCover) waxCover.setAttribute('d', PATH_NIKUMAN);
    } else {
      if (nikumanPleats) nikumanPleats.classList.add('hidden');
      if (nikumanPaper) nikumanPaper.classList.add('hidden');
      if (nikumanFace) nikumanFace.classList.add('hidden');
      if (coreBody) coreBody.setAttribute('d', PATH_BUTTER);
      if (waxCover) waxCover.setAttribute('d', PATH_BUTTER);
    }

    // リセット
    resetButter();
  }

  // 画面切り替え
  showScreen(playScreen);
}

function goToSelect() {
  document.body.className = '';
  showScreen(selectScreen);
}

function resetButter() {
  crackCount = 0;
  isSquishMode = false;
  isPressing = false;
  document.body.classList.remove('mode-squish');

  if (crackLayer) crackLayer.innerHTML = '';
  if (waxShell) waxShell.style.opacity = '1';
  if (squishBanner) squishBanner.classList.add('hidden');
  if (butterStage) {
    butterStage.style.transform = '';
    butterStage.classList.remove('rebound', 'is-squeezing');
  }

  hintText.textContent = 'おしてパキパキわろう！';
  hintText.style.display = '';

  // かけら・キラキラ・破片を除去
  butterArea.querySelectorAll('.fragment, .sparkle, .wax-chip').forEach(el => el.remove());
}

// ----- カード選択 -----
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const butterKey = card.dataset.butter;
    goToPlay(butterKey);
  });
});

// ----- もどるボタン -----
btnBack.addEventListener('click', goToSelect);

// ----- もういっかい -----
btnRetry.addEventListener('click', () => {
  if (!currentButter || !BUTTERS[currentButter]) return;
  const data = BUTTERS[currentButter];
  if (data.type === 'tanghulu') {
    initTanghulu(data.fruitType);
  } else if (data.type === 'pushpop') {
    initPushpop(data.theme);
  } else {
    resetButter();
  }
});

// ----- べつのASMR -----
btnChange.addEventListener('click', goToSelect);

// ----- キーボード打鍵イベント（超高速ポチポチ連打＆スライド対応） -----
const keyboardGrid = document.getElementById('keyboard-grid');
let activeSwipingKey = null;

function triggerKey(keyEl) {
  if (!keyEl) return;
  const keyIdx = parseInt(keyEl.dataset.key, 10) || 0;

  // キーを即座に押し込む
  keyEl.classList.remove('pressed');
  void keyEl.offsetWidth; // アニメーション再トリガー
  keyEl.classList.add('pressed');

  // 即座に音を鳴らす（低遅延）
  if (currentButter && BUTTERS[currentButter]) {
    const soundType = BUTTERS[currentButter].soundType;
    const pitch = (keyIdx % 6) * 1.5;
    if (soundType === 'creamy') sound.playCreamyKey(pitch);
    else if (soundType === 'clacky') sound.playClackyKey(pitch);
    else if (soundType === 'jelly') sound.playJellyKey(pitch);
    else if (soundType === 'glass') sound.playGlassKey(pitch);
  }

  // 短時間で沈み込みを解除（超高速連打でも毎打鍵確実にカチャッと動く）
  setTimeout(() => {
    keyEl.classList.remove('pressed');
  }, 75);
}

// 各キーのポインターダウン
document.querySelectorAll('.key-cap').forEach(keyEl => {
  keyEl.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    activeSwipingKey = keyEl;
    triggerKey(keyEl);
  });
});

// 指でキーボードの上をなぞった（スライドした）ときも連打できる
if (keyboardGrid) {
  keyboardGrid.addEventListener('pointermove', (e) => {
    if (e.buttons === 0 && e.pointerType === 'mouse') return;
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const key = target ? target.closest('.key-cap') : null;
    if (key && key !== activeSwipingKey) {
      activeSwipingKey = key;
      triggerKey(key);
    }
  });

  window.addEventListener('pointerup', () => {
    activeSwipingKey = null;
  });
  window.addEventListener('pointercancel', () => {
    activeSwipingKey = null;
  });
}

// ----- タップ/スワイプでヒビ -----
// SVG座標への変換
function getLocalPoint(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svgEl.getScreenCTM().inverse();
  return pt.matrixTransform(ctm);
}

// スクイーズ変形を適用
function applySquish(screenX, screenY) {
  if (!butterStage) return;
  const rect = butterStage.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // 中心からのオフセット比率 (-1.0 〜 1.0)
  const dx = Math.max(-1, Math.min(1, (screenX - cx) / (rect.width / 2)));
  const dy = Math.max(-1, Math.min(1, (screenY - cy) / (rect.height / 2)));

  // 変形量（むにゅむにゅモードはより深く大きく変形）
  const squishDepth = isSquishMode ? 0.32 : 0.18;
  const scaleY = Math.max(0.65, 1 - squishDepth * (1 - Math.abs(dx) * 0.25));
  const scaleX = Math.min(1.35, 1 + squishDepth * 0.85);
  const translateY = (dy >= 0 ? 1 : -0.5) * (squishDepth * 28);
  const skewX = -dx * 7;

  butterStage.style.setProperty('--rebound-x', scaleX);
  butterStage.style.setProperty('--rebound-y', scaleY);
  butterStage.classList.remove('rebound');
  butterStage.classList.add('is-squeezing');
  butterStage.style.transform = `translateY(${translateY}px) scale(${scaleX}, ${scaleY}) skewX(${skewX}deg)`;

  // 肉まんのお顔を「むぎゅ〜顔」に切り替え
  const faceNormal = document.getElementById('face-normal');
  const faceSquish = document.getElementById('face-squish');
  if (faceNormal && faceSquish) {
    faceNormal.classList.add('hidden');
    faceSquish.classList.remove('hidden');
  }
}

// 指を離したときの反発（ぽよよん！）
function releaseSquish() {
  if (!butterStage) return;
  butterStage.classList.remove('is-squeezing');
  butterStage.style.transform = '';
  butterStage.classList.remove('rebound');
  void butterStage.offsetWidth;
  butterStage.classList.add('rebound');

  // 肉まんのお顔を「笑顔」に戻す
  const faceNormal = document.getElementById('face-normal');
  const faceSquish = document.getElementById('face-squish');
  if (faceNormal && faceSquish) {
    faceSquish.classList.add('hidden');
    faceNormal.classList.remove('hidden');
  }

  // ぽよん音
  sound.playPop();
}

// ヒビ線を追加（パキパキモード時）
function addCrack(x, y, screenX, screenY) {
  if (isSquishMode || crackCount >= MAX_CRACKS) return;

  crackCount++;

  // パキッ音を鳴らす（進捗に応じて音が変化）
  sound.playCrack(crackCount / MAX_CRACKS);

  // パキッとした微小振動
  triggerMicroShake();

  // タップ位置からワックス破片を弾けさせる
  if (screenX !== undefined && screenY !== undefined) {
    spawnTapChips(screenX, screenY);
  }

  // ワックスの不透明度を徐々に下げて、中身のもちもちバターを露出させる
  if (waxShell) {
    const remainingRatio = 1 - (crackCount / MAX_CRACKS);
    waxShell.style.opacity = Math.max(0.2, remainingRatio * 0.95);
  }

  // ワックス風の鋭いヒビ線を生成
  const numLines = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < numLines; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = 20 + Math.random() * 35;

    // 折れ線で鋭いクラックを表現（2〜3セグメント）
    const segments = 2 + Math.floor(Math.random() * 2);
    let pathD = `M ${x} ${y}`;
    let cx = x, cy = y;
    for (let s = 0; s < segments; s++) {
      const segAngle = angle + (Math.random() - 0.5) * 1.2;
      const segLen = len / segments;
      cx += Math.cos(segAngle) * segLen;
      cy += Math.sin(segAngle) * segLen;
      pathD += ` L ${cx} ${cy}`;
    }

    // メインのヒビ線（暗い線）
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('class', 'crack-line');
    path.style.strokeWidth = (1.5 + Math.random() * 2) + 'px';
    crackLayer.appendChild(path);

    // 内側のハイライト線（白い線で深さを表現）
    const inner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    inner.setAttribute('d', pathD);
    inner.setAttribute('class', 'crack-line-inner');
    crackLayer.appendChild(inner);
  }

  // 完成チェック
  if (crackCount >= MAX_CRACKS) {
    onComplete();
  }
}

// タップ時の微振動演出
function triggerMicroShake() {
  butterSvg.classList.remove('micro-shake');
  void butterSvg.offsetWidth;
  butterSvg.classList.add('micro-shake');
}

// タップ位置から小さなワックス片がパキッと弾ける
function spawnTapChips(clientX, clientY) {
  const areaRect = butterArea.getBoundingClientRect();
  const relX = clientX - areaRect.left;
  const relY = clientY - areaRect.top;

  const style = getComputedStyle(document.body);
  const colorLight = style.getPropertyValue('--butter-light').trim() || '#ffe680';
  const colorMain = style.getPropertyValue('--butter-main').trim() || '#ffd966';

  const chipCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < chipCount; i++) {
    const chip = document.createElement('div');
    chip.className = 'wax-chip';

    const w = 5 + Math.random() * 7;
    const h = 3 + Math.random() * 5;
    chip.style.width = w + 'px';
    chip.style.height = h + 'px';
    chip.style.left = (relX - w / 2) + 'px';
    chip.style.top = (relY - h / 2) + 'px';
    chip.style.background = (i % 2 === 0) ? colorLight : colorMain;

    const angle = Math.random() * Math.PI * 2;
    const dist = 25 + Math.random() * 45;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist + 15;
    const rot = (Math.random() - 0.5) * 540;

    chip.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.5) rotate(${rot}deg)`, opacity: 0 }
    ], {
      duration: 350 + Math.random() * 150,
      easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
      fill: 'forwards'
    });

    butterArea.appendChild(chip);
    setTimeout(() => chip.remove(), 550);
  }
}

// ----- タッチ/マウスイベント -----
let lastSwipeX = 0;
let lastSwipeY = 0;
let lastSoundTime = 0;

butterSvg.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  isPressing = true;
  lastSwipeX = e.clientX;
  lastSwipeY = e.clientY;

  applySquish(e.clientX, e.clientY);

  if (!isSquishMode) {
    const pt = getLocalPoint(butterSvg, e.clientX, e.clientY);
    addCrack(pt.x, pt.y, e.clientX, e.clientY);
  } else {
    // むにゅむにゅモード：押すとむにゅっ音
    sound.playSquish();
  }
});

butterSvg.addEventListener('pointermove', (e) => {
  if (!isPressing) return;
  e.preventDefault();

  applySquish(e.clientX, e.clientY);

  if (!isSquishMode) {
    const dist = Math.hypot(e.clientX - lastSwipeX, e.clientY - lastSwipeY);
    if (dist > 18) {
      lastSwipeX = e.clientX;
      lastSwipeY = e.clientY;
      const pt = getLocalPoint(butterSvg, e.clientX, e.clientY);
      addCrack(pt.x, pt.y, e.clientX, e.clientY);
    }
  } else {
    // むにゅむにゅモード中、ドラッグ中に定期的にむにゅ音
    const now = Date.now();
    if (now - lastSoundTime > 160) {
      lastSoundTime = now;
      sound.playSquish();
    }
  }
});

function endPress() {
  if (!isPressing) return;
  isPressing = false;
  releaseSquish();
}

butterSvg.addEventListener('pointerup', endPress);
butterSvg.addEventListener('pointerleave', endPress);
butterSvg.addEventListener('pointercancel', endPress);
window.addEventListener('pointerup', endPress);

// タッチスクロールを防止
butterArea.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

// ----- 完成演出（ワックス全壊 → むにゅむにゅモードへ突入） -----
function onComplete() {
  sound.playBreak();

  // ワックス破片が一気に飛び散る
  spawnFragments();
  spawnSparkles();

  if (waxShell) waxShell.style.opacity = '0';
  if (crackLayer) crackLayer.innerHTML = '';

  // むにゅむにゅモードへステート移行
  isSquishMode = true;
  document.body.classList.add('mode-squish');
  squishBanner.classList.remove('hidden');
  hintText.textContent = 'ゆびでもみもみ・むにゅむにゅしてね♡';

  // ファンファーレ
  sound.playFanfare();

  // ぽよんと大きく跳ねる
  setTimeout(() => {
    releaseSquish();
  }, 100);
}

// かけら生成
function spawnFragments() {
  const rect = butterSvg.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const butterData = BUTTERS[currentButter];

  for (let i = 0; i < 12; i++) {
    const frag = document.createElement('div');
    frag.className = 'fragment';
    const size = 8 + Math.random() * 16;
    frag.style.width = size + 'px';
    frag.style.height = size + 'px';
    frag.style.left = (centerX - size / 2) + 'px';
    frag.style.top = (centerY - size / 2) + 'px';

    // バターの色に合わせる
    const style = getComputedStyle(document.body);
    const color = style.getPropertyValue('--butter-main').trim() || '#ffd966';
    frag.style.background = color;

    // ランダムな方向に飛ばす
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const rot = Math.random() * 720 - 360;

    frag.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 0 },
    ], {
      duration: 600 + Math.random() * 400,
      easing: 'ease-out',
      fill: 'forwards',
    });

    butterArea.appendChild(frag);

    // 後片付け
    setTimeout(() => frag.remove(), 1200);
  }
}

// キラキラ生成
function spawnSparkles() {
  const rect = butterSvg.getBoundingClientRect();

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.textContent = '✨';
      sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
      sparkle.style.fontSize = (18 + Math.random() * 16) + 'px';
      butterArea.appendChild(sparkle);

      // キラキラ音
      sound.playSparkle(i);

      setTimeout(() => sparkle.remove(), 900);
    }, i * 100);
  }
}

// ==========================================
// 🍓 フルーツ飴（タンフル）ASMR ロジック
// ==========================================
let tanghuluState = {
  fruits: [],
  brokenCount: 0,
  totalCount: 0,
};

// 果物SVGテンプレート生成
function createFruitSvg(type) {
  if (type === 'strawberry') {
    return `
      <svg viewBox="0 0 100 100" class="fruit-svg">
        <defs>
          <radialGradient id="sb-grad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ff597b" />
            <stop offset="65%" stop-color="#d90429" />
            <stop offset="100%" stop-color="#6a040f" />
          </radialGradient>
        </defs>
        <path d="M 50,18 C 74,18 88,34 84,64 C 80,86 60,96 50,96 C 40,96 20,86 16,64 C 12,34 26,18 50,18 Z" fill="url(#sb-grad)" />
        <ellipse cx="36" cy="42" rx="1.5" ry="2.6" fill="#ffe066" transform="rotate(-10 36 42)" />
        <ellipse cx="50" cy="38" rx="1.5" ry="2.6" fill="#ffe066" />
        <ellipse cx="64" cy="42" rx="1.5" ry="2.6" fill="#ffe066" transform="rotate(10 64 42)" />
        <ellipse cx="30" cy="58" rx="1.5" ry="2.6" fill="#ffe066" transform="rotate(-15 30 58)" />
        <ellipse cx="50" cy="56" rx="1.5" ry="2.6" fill="#ffe066" />
        <ellipse cx="70" cy="58" rx="1.5" ry="2.6" fill="#ffe066" transform="rotate(15 70 58)" />
        <ellipse cx="40" cy="74" rx="1.5" ry="2.6" fill="#ffe066" transform="rotate(-5 40 74)" />
        <ellipse cx="60" cy="74" rx="1.5" ry="2.6" fill="#ffe066" transform="rotate(5 60 74)" />
        <!-- ヘタ -->
        <path d="M 50,20 C 44,8 32,10 28,18 C 34,15 44,18 50,20 C 56,18 66,15 72,18 C 68,10 56,8 50,20 Z" fill="#2d6a4f" />
        <path d="M 50,20 C 48,12 47,4 50,4 C 53,4 52,12 50,20 Z" fill="#40916c" />
      </svg>`;
  } else if (type === 'muscat') {
    return `
      <svg viewBox="0 0 100 100" class="fruit-svg">
        <defs>
          <radialGradient id="mc-grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#e8fccf" />
            <stop offset="45%" stop-color="#95d5b2" />
            <stop offset="85%" stop-color="#52b788" />
            <stop offset="100%" stop-color="#2d6a4f" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="52" rx="38" ry="42" fill="url(#mc-grad)" />
        <ellipse cx="38" cy="36" rx="16" ry="11" fill="rgba(255,255,255,0.6)" transform="rotate(-20 38 36)" />
        <ellipse cx="50" cy="18" rx="3.5" ry="2.5" fill="#40916c" />
      </svg>`;
  } else if (type === 'mikan') {
    return `
      <svg viewBox="0 0 100 100" class="fruit-svg">
        <defs>
          <radialGradient id="mk-grad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stop-color="#ffe494" />
            <stop offset="35%" stop-color="#ffa200" />
            <stop offset="85%" stop-color="#ff7b00" />
            <stop offset="100%" stop-color="#d9480f" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="54" rx="42" ry="36" fill="url(#mk-grad)" />
        <circle cx="50" cy="22" r="3.5" fill="#2d6a4f" />
        <path d="M 50,22 L 44,18 M 50,22 L 56,18 M 50,22 L 50,15" stroke="#2d6a4f" stroke-width="2.5" stroke-linecap="round" />
        <ellipse cx="36" cy="40" rx="16" ry="9" fill="rgba(255,255,255,0.45)" transform="rotate(-15 36 40)" />
      </svg>`;
  } else {
    // apple
    return `
      <svg viewBox="0 0 160 160" class="fruit-svg">
        <defs>
          <radialGradient id="ap-grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ff758f" />
            <stop offset="35%" stop-color="#e60049" />
            <stop offset="80%" stop-color="#a00030" />
            <stop offset="100%" stop-color="#4a0014" />
          </radialGradient>
        </defs>
        <path d="M 80,38 C 55,22 15,40 16,88 C 17,126 55,148 80,148 C 105,148 143,126 144,88 C 145,40 105,22 80,38 Z" fill="url(#ap-grad)" />
        <path d="M 80,38 C 82,24 88,14 96,8" stroke="#6b4a2e" stroke-width="5.5" stroke-linecap="round" fill="none" />
        <path d="M 86,23 C 96,16 110,20 112,27 C 104,31 92,29 86,23 Z" fill="#52b788" />
        <path d="M 38,55 C 32,70 34,92 42,108" stroke="rgba(255,255,255,0.6)" stroke-width="7" stroke-linecap="round" fill="none" />
      </svg>`;
  }
}

// ガラス飴コーティングSVG
function createCandyOverlaySvg(isApple) {
  const vb = isApple ? '0 0 160 160' : '0 0 100 100';
  const cx = isApple ? 80 : 50;
  const cy = isApple ? 88 : 52;
  const rx = isApple ? 66 : 41;
  const ry = isApple ? 60 : 43;

  return `
    <svg viewBox="${vb}" class="candy-layer">
      <defs>
        <radialGradient id="cg-${Math.random().toString(36).substr(2, 5)}" cx="30%" cy="25%" r="75%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.85)" />
          <stop offset="35%" stop-color="rgba(255,255,255,0.25)" />
          <stop offset="85%" stop-color="rgba(255,255,255,0.15)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.7)" />
        </radialGradient>
      </defs>
      <!-- 透明なガラス飴ドーム -->
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.85)" stroke-width="${isApple ? 3 : 2}" />
      <!-- ガラスの光沢ハイライト -->
      <path d="M ${cx - rx * 0.7},${cy - ry * 0.4} C ${cx - rx * 0.5},${cy - ry * 0.8} ${cx + rx * 0.2},${cy - ry * 0.8} ${cx + rx * 0.6},${cy - ry * 0.4}" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="${isApple ? 5 : 3.5}" stroke-linecap="round" />
      <!-- クラック線描画グループ -->
      <g class="candy-cracks-group"></g>
    </svg>`;
}

// フルーツ飴の初期化
function initTanghulu(fruitType) {
  tanghuluItems.innerHTML = '';
  tanghuluBanner.classList.add('hidden');
  tanghuluHint.textContent = 'タップして飴をパリンッと割ろう！';
  tanghuluArea.querySelectorAll('.candy-shard, .sparkle').forEach(el => el.remove());

  const isApple = fruitType === 'apple';
  const count = isApple ? 1 : 3;
  const maxCracks = isApple ? 5 : 3;

  tanghuluState = {
    fruits: [],
    brokenCount: 0,
    totalCount: count,
  };

  for (let i = 0; i < count; i++) {
    const itemEl = document.createElement('div');
    itemEl.className = 'tanghulu-item' + (isApple ? ' item-apple' : '');
    itemEl.dataset.index = i;

    itemEl.innerHTML = createFruitSvg(fruitType) + createCandyOverlaySvg(isApple);
    tanghuluItems.appendChild(itemEl);

    const fruitObj = {
      index: i,
      el: itemEl,
      cracks: 0,
      maxCracks: maxCracks,
      broken: false,
      isApple: isApple,
    };
    tanghuluState.fruits.push(fruitObj);

    // タップイベント
    itemEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handleFruitClick(fruitObj, e);
    });
  }
}

// フルーツタップ時の処理（パリンッ！）
function handleFruitClick(fruitObj, e) {
  if (fruitObj.broken) return;

  fruitObj.cracks++;
  sound.playTanghuluCrack();

  // 振動エフェクト
  fruitObj.el.classList.remove('micro-shake');
  void fruitObj.el.offsetWidth;
  fruitObj.el.classList.add('micro-shake');

  // クラック線の追加
  const cracksGroup = fruitObj.el.querySelector('.candy-cracks-group');
  if (cracksGroup) {
    const rect = fruitObj.el.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const vbScale = fruitObj.isApple ? 160 / rect.width : 100 / rect.width;
    const originX = clickX * vbScale;
    const originY = clickY * vbScale;

    // 放射状のヒビを2〜4本描画
    const lineCount = 2 + Math.floor(Math.random() * 3);
    for (let l = 0; l < lineCount; l++) {
      const angle = (Math.PI * 2 / lineCount) * l + (Math.random() - 0.5) * 0.8;
      const len = (fruitObj.isApple ? 30 : 20) + Math.random() * (fruitObj.isApple ? 40 : 25);
      const midLen = len * 0.5;
      const midAngle = angle + (Math.random() - 0.5) * 0.6;

      const x1 = originX + Math.cos(midAngle) * midLen;
      const y1 = originY + Math.sin(midAngle) * midLen;
      const x2 = originX + Math.cos(angle) * len;
      const y2 = originY + Math.sin(angle) * len;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${originX.toFixed(1)},${originY.toFixed(1)} L ${x1.toFixed(1)},${y1.toFixed(1)} L ${x2.toFixed(1)},${y2.toFixed(1)}`);
      path.setAttribute('class', 'candy-crack');
      cracksGroup.appendChild(path);
    }
  }

  // ガラス飴のかけらを飛び散らせる
  spawnCandyShards(fruitObj.el, e.clientX, e.clientY, 8);

  // 完全に割れたかチェック
  if (fruitObj.cracks >= fruitObj.maxCracks) {
    fruitObj.broken = true;
    tanghuluState.brokenCount++;

    // 飴レイヤーを消去
    const candyLayer = fruitObj.el.querySelector('.candy-layer');
    if (candyLayer) {
      candyLayer.style.opacity = '0';
    }

    // 大量のガラス破片を放出！
    const rect = fruitObj.el.getBoundingClientRect();
    spawnCandyShards(fruitObj.el, rect.left + rect.width / 2, rect.top + rect.height / 2, 22);

    // フルーツにキラキラ
    spawnSparklesAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // 全部の飴が割れたか判定
    if (tanghuluState.brokenCount >= tanghuluState.totalCount) {
      tanghuluBanner.classList.remove('hidden');
      tanghuluHint.textContent = '✨ カリカリあまくておいしい！ ✨';
      sound.playFanfare();

      // エリア全体にキラキラ祝福
      for (let s = 0; s < 14; s++) {
        setTimeout(() => {
          const areaRect = tanghuluArea.getBoundingClientRect();
          spawnSparklesAt(
            areaRect.left + 40 + Math.random() * (areaRect.width - 80),
            areaRect.top + 40 + Math.random() * (areaRect.height - 80)
          );
        }, s * 80);
      }
    }
  }
}

// ガラス飴の破片アニメーション生成
function spawnCandyShards(parentEl, clientX, clientY, count) {
  const rect = tanghuluArea.getBoundingClientRect();
  const relX = clientX - rect.left;
  const relY = clientY - rect.top;

  for (let i = 0; i < count; i++) {
    const shard = document.createElement('div');
    shard.className = 'candy-shard';

    const size = 5 + Math.random() * 9;
    shard.style.width = size + 'px';
    shard.style.height = (size * (0.6 + Math.random() * 0.8)) + 'px';
    shard.style.left = relX + 'px';
    shard.style.top = relY + 'px';

    const angle = Math.random() * Math.PI * 2;
    const dist = 35 + Math.random() * 85;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist + 15; // わずかに重力落下
    const rot = Math.random() * 540 - 270;

    shard.style.setProperty('--dx', `${dx}px`);
    shard.style.setProperty('--dy', `${dy}px`);
    shard.style.setProperty('--rot', `${rot}deg`);

    tanghuluArea.appendChild(shard);
    setTimeout(() => shard.remove(), 700);
  }
}

// 任意位置でのキラキラ生成
function spawnSparklesAt(x, y) {
  const rect = tanghuluArea.getBoundingClientRect();
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✨';
  sparkle.style.left = (x - rect.left - 12 + (Math.random() * 30 - 15)) + 'px';
  sparkle.style.top = (y - rect.top - 12 + (Math.random() * 30 - 15)) + 'px';
  sparkle.style.fontSize = (18 + Math.random() * 12) + 'px';
  tanghuluArea.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
}


// ==========================================
// 🫧 プッシュポップASMR ロジック
// ==========================================
let pushpopState = {
  bubbles: [],
  poppedCount: 0,
  totalBubbles: 16,
  isFlipping: false,
  isPointerDown: false,
};

// プッシュポップの初期化
function initPushpop(theme) {
  pushpopGrid.innerHTML = '';
  pushpopBanner.classList.add('hidden');
  pushpopPlate.classList.remove('flip');
  pushpopHint.textContent = '指でなぞってポコポコ押しこもう♪';

  pushpopState.bubbles = [];
  pushpopState.poppedCount = 0;
  pushpopState.isFlipping = false;
  pushpopState.isPointerDown = false;

  // テーマごとのシンボル
  const symbols = {
    rainbow: '♥',
    star: '★',
    bear: '●',
    candy: '✿',
  };
  const sym = symbols[theme] || '♥';

  for (let i = 0; i < pushpopState.totalBubbles; i++) {
    const bubble = document.createElement('button');
    bubble.className = 'pushpop-bubble';
    bubble.dataset.idx = i;
    bubble.innerHTML = sym;

    pushpopGrid.appendChild(bubble);
    pushpopState.bubbles.push(bubble);
  }
}

// バブルを押し込む処理
function popBubble(bubbleEl) {
  if (!bubbleEl || bubbleEl.classList.contains('popped') || pushpopState.isFlipping) return;

  const idx = parseInt(bubbleEl.dataset.idx, 10) || 0;
  bubbleEl.classList.add('popped');
  sound.playPopBubble(idx);

  pushpopState.poppedCount++;

  // 全押し判定（16個全て凹んだらくるっと裏返し！）
  if (pushpopState.poppedCount >= pushpopState.totalBubbles) {
    pushpopState.isFlipping = true;
    pushpopBanner.classList.remove('hidden');
    pushpopHint.textContent = '✨ ぜんぶ押せた！くるっとうらがえし！ ✨';
    sound.playFanfare();

    // くるっと3D回転裏返しアニメーション
    setTimeout(() => {
      pushpopPlate.classList.add('flip');
    }, 280);

    // 回転中にリセットして戻す
    setTimeout(() => {
      pushpopState.bubbles.forEach(b => b.classList.remove('popped'));
      pushpopPlate.classList.remove('flip');
      pushpopState.poppedCount = 0;
      pushpopState.isFlipping = false;
      pushpopBanner.classList.add('hidden');
      pushpopHint.textContent = '指でなぞってポコポコ押しこもう♪';
    }, 780);
  }
}

// プッシュポップのタッチ＆スワイプ（なぞり押し）イベント
pushpopGrid.addEventListener('pointerdown', (e) => {
  pushpopState.isPointerDown = true;
  const bubble = e.target.closest('.pushpop-bubble');
  if (bubble) {
    popBubble(bubble);
  }
});

window.addEventListener('pointermove', (e) => {
  if (!pushpopState.isPointerDown || pushpopState.isFlipping) return;
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el) {
    const bubble = el.closest('.pushpop-bubble');
    if (bubble) {
      popBubble(bubble);
    }
  }
});

window.addEventListener('pointerup', () => {
  pushpopState.isPointerDown = false;
});

window.addEventListener('pointercancel', () => {
  pushpopState.isPointerDown = false;
});

