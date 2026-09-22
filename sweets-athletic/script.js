/**
 * お菓子の国のアスレチック 🍰🎀
 * スイーツの世界をピンクツインテールの女の子が冒険するアクションゲーム！
 */

// ==========================================
// 1. サウンドマネージャー (Web Audio API)
// ==========================================
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.init();
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.soundEnabled;
  }

  // ぴょんっ！ジャンプ音
  playJump() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(680, t + 0.15);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch (e) {}
  }

  // キラリーン！スイーツゲット音
  playCollect() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const notes = [587.33, 880, 1174.66]; // D5, A5, D6
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.13);
      });
    } catch (e) {}
  }

  // キャンディ進化！キラキラレベルアップ音
  playCandyLevelUp() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5, E5, G5, B5, C6, E6
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.17);
      });
    } catch (e) {}
  }

  // ゴール！ファンファーレ
  playClear() {
    if (!this.soundEnabled || !this.ctx) return;
    this.stopBgm();
    try {
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.50, d: 0.35 } // C6
      ];
      let now = this.ctx.currentTime;
      melody.forEach(m => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(m.f, now);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0, now + m.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + m.d + 0.02);
        now += m.d;
      });
    } catch (e) {}
  }

  // プリンのトランポリン！ボヨヨン音
  playBoing() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(750, t + 0.18);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.35);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.36);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.37);
    } catch (e) {}
  }

  // おちちゃった音（ポヨン）
  playFall() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.25);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.26);
    } catch (e) {}
  }

  // まほうのワープ音（キラキラーンと上昇）
  playWarp() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.04;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.16);
      });
    } catch (e) {}
  }

  // いたっ！ダメージ音
  playDamage() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.16);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.17);
    } catch (e) {}
  }

  // 💖 ハート回復音
  playHeal() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.16);
      });
    } catch (e) {}
  }

  // ☁️ わたあめ大ジャンプ音
  playCottonJump() {
    if (!this.soundEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(950, t + 0.28);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.31);
    } catch (e) {}
  }

  // お菓子の国のはずむBGM
  startBgm() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx || this.bgmTimer) return;

    // ポップでかわいい8小節メロディ
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C, D, E, G, A, HighC
    const bgmNotes = [
      scale[0], scale[2], scale[3], scale[2],
      scale[4], scale[3], scale[2], scale[1],
      scale[0], scale[2], scale[3], scale[4],
      scale[5], scale[4], scale[3], scale[2]
    ];

    this.bgmStep = 0;
    this.bgmTimer = setInterval(() => {
      if (!this.soundEnabled || !this.ctx) return;
      const freq = bgmNotes[this.bgmStep % bgmNotes.length];
      this.bgmStep++;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    }, 220);
  }

  stopBgm() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

const sounds = new SoundSystem();


// ==========================================
// ==========================================
// 2. 主人公キャラクター（ピンクツインテール女の子 ＋ 背中のキャンディ）SVG作成 ＆ きせかえ
// ==========================================

const DRESS_COLORS = {
  pink: { id: 'pink', name: '🍓 いちごピンク', price: 0, top: '#ff80bf', bottom: '#ff3388', apronLine: '#ff88bb', icon: '🍓' },
  blue: { id: 'blue', name: '🐬 ミントソーダ', price: 15, top: '#70e1ff', bottom: '#00a6e0', apronLine: '#50c8ff', icon: '🐬' },
  yellow: { id: 'yellow', name: '🍋 レモンシフォン', price: 25, top: '#ffe666', bottom: '#f5a623', apronLine: '#ffcc33', icon: '🍋' },
  sakura: { id: 'sakura', name: '🌸 さくらプリンセス', price: 30, top: '#ffb3d9', bottom: '#ff6699', apronLine: '#ffd1dc', icon: '🌸' },
  purple: { id: 'purple', name: '🍇 ラベンダーベリー', price: 35, top: '#d48bff', bottom: '#9933ee', apronLine: '#bf70ff', icon: '🍇' },
  choco: { id: 'choco', name: '🍫 ショコラロリータ', price: 45, top: '#6a432d', bottom: '#3c2115', apronLine: '#c59b76', icon: '🍫' },
  white: { id: 'white', name: '🤍 マシュマロホワイト', price: 50, top: '#ffffff', bottom: '#d8e5f3', apronLine: '#ffb3d9', icon: '🤍' },
  galaxy: { id: 'galaxy', name: '🌌 ギャラクシードーム', price: 60, top: '#3b2d71', bottom: '#150936', apronLine: '#a78bfa', icon: '🌌', isGalaxy: true },
  gothic: { id: 'gothic', name: '🖤 ゴシックベリー', price: 65, top: '#2c1c28', bottom: '#110712', apronLine: '#9b2242', icon: '🖤' },
  rainbow: { id: 'rainbow', name: '🌈 にじいろドリーム', price: 70, top: '#ff66aa', bottom: '#bb55ff', apronLine: '#ffffff', icon: '🌈', isRainbow: true },
  mermaid: { id: 'mermaid', name: '🧜‍♀️ アクアマリンマーメイド', price: 75, top: '#38ef7d', bottom: '#11998e', apronLine: '#70ffe0', icon: '🧜‍♀️' },
  queen: { id: 'queen', name: '👑 ロイヤルクイーン', price: 85, top: '#ffe066', bottom: '#d48800', apronLine: '#ffffff', icon: '👑' }
};

const HEADWEAR_LIST = [
  { id: 'ribbon', name: '🎀 大きなリボン', price: 0, icon: '🎀' },
  { id: 'tiara', name: '👑 きらきらティアラ', price: 20, icon: '👑' },
  { id: 'beret', name: '🍓 いちごベレー帽', price: 25, icon: '🍓' },
  { id: 'sakura_flower', name: '🌸 さくらの花かざり', price: 30, icon: '🌸' },
  { id: 'cat_ears', name: '🐱 ねこみみカチューシャ', price: 35, icon: '🐱' },
  { id: 'witch_hat', name: '🧙‍♀️ まほうつかいの帽子', price: 40, icon: '🧙‍♀️' },
  { id: 'angel', name: '👼 エンジェルリング', price: 45, icon: '👼' },
  { id: 'bear_ears', name: '🐻 くまみみカチューシャ', price: 50, icon: '🐻' },
  { id: 'bunny', name: '🐰 うさみみカチューシャ', price: 55, icon: '🐰' }
];

const BACK_ACC_LIST = [
  { id: 'none', name: '✨ なし', price: 0, icon: '✨' },
  { id: 'cat_tail', name: '🐱 ねこのしっぽ', price: 25, icon: '🐱' },
  { id: 'bunny_tail', name: '🐰 まるいうさぎしっぽ', price: 30, icon: '🐰' },
  { id: 'angel_wings', name: '👼 てんしのはね', price: 45, icon: '👼' },
  { id: 'fairy_wings', name: '🧚 ようせいの羽', price: 50, icon: '🧚' },
  { id: 'devil_set', name: '😈 こあくまの羽としっぽ', price: 65, icon: '😈' },
  { id: 'rainbow_aura', name: '🌈 にじいろのオーラ', price: 80, icon: '🌈' }
];

const DRESS_COLOR_KEY = 'sweets_athletic_dress_color';
const HEADWEAR_KEY = 'sweets_athletic_headwear';
const BACK_ACC_KEY = 'sweets_athletic_back_acc';
const UNLOCKED_DRESSES_KEY = 'sweets_athletic_unlocked_dresses';
const UNLOCKED_HEADWEAR_KEY = 'sweets_athletic_unlocked_headwear';
const UNLOCKED_BACK_ACC_KEY = 'sweets_athletic_unlocked_back_acc';
const NIGHT_MODE_KEY = 'sweets_athletic_night_mode';

let isNightMode = false;
try {
  isNightMode = localStorage.getItem(NIGHT_MODE_KEY) === 'true';
} catch (e) {}

// よるのキラキラ星（45個の星）
const NIGHT_STARS = [];
for (let i = 0; i < 45; i++) {
  NIGHT_STARS.push({
    x: Math.random() * 800,
    y: Math.random() * 320,
    size: Math.random() * 2.5 + 1.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.003 + 0.002
  });
}

function getDressColor() {
  try {
    return localStorage.getItem(DRESS_COLOR_KEY) || 'pink';
  } catch (e) {
    return 'pink';
  }
}

function setDressColor(color) {
  try {
    localStorage.setItem(DRESS_COLOR_KEY, color);
  } catch (e) {}
  updateCharPreview(player ? player.candyColor : loadCandyColor());
  renderDressUpPreview();
}

function getHeadwear() {
  try {
    return localStorage.getItem(HEADWEAR_KEY) || 'ribbon';
  } catch (e) {
    return 'ribbon';
  }
}

function setHeadwear(hw) {
  try {
    localStorage.setItem(HEADWEAR_KEY, hw);
  } catch (e) {}
  updateCharPreview(player ? player.candyColor : loadCandyColor());
  renderDressUpPreview();
}

function getBackAcc() {
  try {
    return localStorage.getItem(BACK_ACC_KEY) || 'none';
  } catch (e) {
    return 'none';
  }
}

function setBackAcc(acc) {
  try {
    localStorage.setItem(BACK_ACC_KEY, acc);
  } catch (e) {}
  updateCharPreview(player ? player.candyColor : loadCandyColor());
  renderDressUpPreview();
}

function getUnlockedDresses() {
  try {
    const saved = localStorage.getItem(UNLOCKED_DRESSES_KEY);
    const list = saved ? JSON.parse(saved) : ['pink'];
    const current = getDressColor();
    if (current && !list.includes(current)) list.push(current);
    return list;
  } catch (e) {
    return ['pink'];
  }
}

function unlockDress(colorKey) {
  const list = getUnlockedDresses();
  if (!list.includes(colorKey)) {
    list.push(colorKey);
    try {
      localStorage.setItem(UNLOCKED_DRESSES_KEY, JSON.stringify(list));
    } catch (e) {}
  }
}

function getUnlockedHeadwear() {
  try {
    const saved = localStorage.getItem(UNLOCKED_HEADWEAR_KEY);
    const list = saved ? JSON.parse(saved) : ['ribbon'];
    const current = getHeadwear();
    if (current && !list.includes(current)) list.push(current);
    return list;
  } catch (e) {
    return ['ribbon'];
  }
}

function unlockHeadwear(hwId) {
  const list = getUnlockedHeadwear();
  if (!list.includes(hwId)) {
    list.push(hwId);
    try {
      localStorage.setItem(UNLOCKED_HEADWEAR_KEY, JSON.stringify(list));
    } catch (e) {}
  }
}

function getUnlockedBackAcc() {
  try {
    const saved = localStorage.getItem(UNLOCKED_BACK_ACC_KEY);
    const list = saved ? JSON.parse(saved) : ['none'];
    const current = getBackAcc();
    if (current && !list.includes(current)) list.push(current);
    return list;
  } catch (e) {
    return ['none'];
  }
}

function unlockBackAcc(accId) {
  const list = getUnlockedBackAcc();
  if (!list.includes(accId)) {
    list.push(accId);
    try {
      localStorage.setItem(UNLOCKED_BACK_ACC_KEY, JSON.stringify(list));
    } catch (e) {}
  }
}

function createGirlSvgString(isBlinking = false, twirlAngle = 0, candyColor = 'red', dressColor = null, headwear = null, backAcc = null) {
  dressColor = dressColor || getDressColor();
  headwear = headwear || getHeadwear();
  backAcc = backAcc || getBackAcc();

  // キャンディの色定義
  let candyFill = '#ff2a6d';
  let candyStroke = '#d61552';
  let candySpiral = `
    <path d="M -8 0 A 8 8 0 0 1 8 0 A 5 5 0 0 1 -3 0" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round" />
  `;

  if (candyColor === 'yellow') {
    candyFill = '#ffcc00';
    candyStroke = '#d99b00';
    candySpiral = `<path d="M -8 0 A 8 8 0 0 1 8 0 A 5 5 0 0 1 -3 0" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
  } else if (candyColor === 'black') {
    candyFill = '#332222';
    candyStroke = '#1c1212';
    candySpiral = `<path d="M -8 0 A 8 8 0 0 1 8 0 A 5 5 0 0 1 -3 0" stroke="#885544" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
  } else if (candyColor === 'white') {
    candyFill = '#ffffff';
    candyStroke = '#c0d4ec';
    candySpiral = `<path d="M -8 0 A 8 8 0 0 1 8 0 A 5 5 0 0 1 -3 0" stroke="#ffb3d9" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
  } else if (candyColor === 'rainbow') {
    candyFill = 'url(#rainbowGrad)';
    candyStroke = '#ffffff';
    candySpiral = `
      <circle cx="0" cy="0" r="8" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9"/>
      <circle cx="0" cy="0" r="3" fill="#ffffff"/>
    `;
  }

  // ドレスの色設定
  const dressInfo = DRESS_COLORS[dressColor] || DRESS_COLORS.pink;

  // あたまのかざりSVG
  let headwearSvg = '';
  if (headwear === 'tiara') {
    headwearSvg = `
      <g transform="translate(50, 24)">
        <path d="M -14 2 L -12 -8 L -4 -3 L 0 -11 L 4 -3 L 12 -8 L 14 2 Z" fill="#ffe066" stroke="#d49b00" stroke-width="1.2" />
        <circle cx="0" cy="-11" r="2.5" fill="#ff3388" />
        <circle cx="-12" cy="-8" r="2" fill="#00d4ff" />
        <circle cx="12" cy="-8" r="2" fill="#00d4ff" />
        <circle cx="-4" cy="-3" r="1.5" fill="#ff66b2" />
        <circle cx="4" cy="-3" r="1.5" fill="#ff66b2" />
      </g>
    `;
  } else if (headwear === 'beret') {
    headwearSvg = `
      <g transform="translate(50, 24)">
        <path d="M -17 4 C -16 -12, 16 -12, 17 4 C 10 7, -10 7, -17 4 Z" fill="#ff3355" stroke="#cc1133" stroke-width="1.2" />
        <circle cx="0" cy="-8" r="2.5" fill="#33cc55" />
        <ellipse cx="-7" cy="-1" rx="1.2" ry="1.6" fill="#ffffff" />
        <ellipse cx="6" cy="-1" rx="1.2" ry="1.6" fill="#ffffff" />
        <ellipse cx="0" cy="2" rx="1.2" ry="1.6" fill="#ffffff" />
      </g>
    `;
  } else if (headwear === 'sakura_flower') {
    headwearSvg = `
      <g transform="translate(50, 24)">
        <path d="M -14 5 Q 0 0 14 5" stroke="#ff88aa" stroke-width="1.5" fill="none" />
        <g transform="translate(-14, 2) scale(0.9)">
          <circle cx="-3" cy="-3" r="3.2" fill="#ffb7d5" />
          <circle cx="3" cy="-3" r="3.2" fill="#ffb7d5" />
          <circle cx="-4" cy="3" r="3.2" fill="#ffb7d5" />
          <circle cx="4" cy="3" r="3.2" fill="#ffb7d5" />
          <circle cx="0" cy="5" r="3.2" fill="#ffb7d5" />
          <circle cx="0" cy="1" r="2" fill="#ffe066" />
        </g>
        <g transform="translate(14, 2) scale(0.9)">
          <circle cx="-3" cy="-3" r="3.2" fill="#ffb7d5" />
          <circle cx="3" cy="-3" r="3.2" fill="#ffb7d5" />
          <circle cx="-4" cy="3" r="3.2" fill="#ffb7d5" />
          <circle cx="4" cy="3" r="3.2" fill="#ffb7d5" />
          <circle cx="0" cy="5" r="3.2" fill="#ffb7d5" />
          <circle cx="0" cy="1" r="2" fill="#ffe066" />
        </g>
      </g>
    `;
  } else if (headwear === 'cat_ears') {
    headwearSvg = `
      <g transform="translate(50, 24)">
        <polygon points="-16,4 -15,-9 -7,0" fill="#ff77aa" stroke="#e0266e" stroke-width="1.2"/>
        <polygon points="-14,2 -13,-6 -9,0" fill="#ffffff"/>
        <polygon points="16,4 15,-9 7,0" fill="#ff77aa" stroke="#e0266e" stroke-width="1.2"/>
        <polygon points="14,2 13,-6 9,0" fill="#ffffff"/>
        <path d="M -14 3 Q 0 -3 14 3" stroke="#ff3377" stroke-width="2" fill="none" />
      </g>
    `;
  } else if (headwear === 'witch_hat') {
    headwearSvg = `
      <g transform="translate(50, 20)">
        <ellipse cx="0" cy="4" rx="21" ry="5" fill="#3a2254" stroke="#251238" stroke-width="1.2" />
        <path d="M -13 3 C -10 -14, 6 -24, 15 -22 C 10 -16, 4 -12, 13 3 Z" fill="#4b2c6d" stroke="#251238" stroke-width="1.2" />
        <path d="M -11 3 Q 0 1 11 3 L 11 0 Q 0 -2 -11 0 Z" fill="#ffaa00" />
        <polygon points="0,0 1.5,-3 4,-3 2,-5 3,-8 0,-6 -3,-8 -2,-5 -4,-3 -1.5,-3" fill="#fffb88" />
      </g>
    `;
  } else if (headwear === 'angel') {
    headwearSvg = `
      <g transform="translate(50, 16)">
        <ellipse cx="0" cy="0" rx="14" ry="4" fill="none" stroke="#ffe066" stroke-width="2.6" />
        <ellipse cx="0" cy="0" rx="14" ry="4" fill="none" stroke="#ffffff" stroke-width="1" />
        <path d="M -12 4 C -18 2, -20 -3, -14 -1 C -17 3, -13 6, -9 5 Z" fill="#ffffff" opacity="0.9" />
        <path d="M 12 4 C 18 2, 21 -3, 15 -1 C 18 3, 14 6, 10 5 Z" fill="#ffffff" opacity="0.9" />
      </g>
    `;
  } else if (headwear === 'bear_ears') {
    headwearSvg = `
      <g transform="translate(50, 24)">
        <path d="M -15 3 Q 0 -4 15 3" stroke="#8b5a2b" stroke-width="2" fill="none" />
        <circle cx="-13" cy="-3" r="6.5" fill="#9c6634" stroke="#683d16" stroke-width="1.2" />
        <circle cx="-13" cy="-3" r="3.5" fill="#fce4d6" />
        <circle cx="13" cy="-3" r="6.5" fill="#9c6634" stroke="#683d16" stroke-width="1.2" />
        <circle cx="13" cy="-3" r="3.5" fill="#fce4d6" />
      </g>
    `;
  } else if (headwear === 'bunny') {
    headwearSvg = `
      <g transform="translate(50, 24)">
        <path d="M -15 3 Q 0 -5 15 3" stroke="#ff77aa" stroke-width="2" fill="none" />
        <path d="M -10 2 C -17 -16, -7 -22, -6 -2 Z" fill="#ffffff" stroke="#ff88bb" stroke-width="1.2"/>
        <path d="M -9 1 C -14 -13, -8 -17, -7 -1 Z" fill="#ffb6d5" />
        <path d="M 10 2 C 17 -16, 7 -22, 6 -2 Z" fill="#ffffff" stroke="#ff88bb" stroke-width="1.2"/>
        <path d="M 9 1 C 14 -13, 8 -17, 7 -1 Z" fill="#ffb6d5" />
        <polygon points="0,0 -4,-3 -3,3" fill="#ff3388" />
        <polygon points="0,0 4,-3 3,3" fill="#ff3388" />
        <circle cx="0" cy="0" r="1.5" fill="#ffe066" />
      </g>
    `;
  } else {
    // default: 大きなリボン
    headwearSvg = `
      <g transform="translate(50, 24)">
        <polygon points="0,0 -14,-7 -12,7" fill="#ff3377" />
        <polygon points="0,0 14,-7 12,7" fill="#ff3377" />
        <circle cx="0" cy="0" r="4" fill="#ffe066" />
      </g>
    `;
  }

  // せなか・よこのアクセサリーSVG
  let backAccSvg = '';
  if (backAcc === 'angel_wings') {
    backAccSvg = `
      <!-- 天使の羽（両脇に大きく広がる） -->
      <g transform="translate(30, 58)">
        <path d="M 0 0 C -18 -10, -34 -4, -40 12 C -36 18, -26 22, -18 16 C -24 24, -18 28, -10 22 C -15 30, -8 32, 0 16 Z"
              fill="#ffffff" stroke="#d5e4f7" stroke-width="1.5" filter="drop-shadow(0 2px 5px rgba(180,210,255,0.45))"/>
        <path d="M -5 3 C -18 -1, -26 2, -30 10" stroke="#d5e4f7" stroke-width="1.2" fill="none" />
      </g>
      <g transform="translate(70, 58) scale(-1, 1)">
        <path d="M 0 0 C -18 -10, -34 -4, -40 12 C -36 18, -26 22, -18 16 C -24 24, -18 28, -10 22 C -15 30, -8 32, 0 16 Z"
              fill="#ffffff" stroke="#d5e4f7" stroke-width="1.5" filter="drop-shadow(0 2px 5px rgba(180,210,255,0.45))"/>
        <path d="M -5 3 C -18 -1, -26 2, -30 10" stroke="#d5e4f7" stroke-width="1.2" fill="none" />
      </g>
    `;
  } else if (backAcc === 'fairy_wings') {
    backAccSvg = `
      <!-- 妖精の羽（透き通るパステルバタフライ） -->
      <g transform="translate(32, 60)">
        <path d="M 0 0 C -22 -14, -36 2, -32 20 C -22 26, -14 20, 0 12 Z" fill="#b3f0ff" fill-opacity="0.82" stroke="#4dd2ff" stroke-width="1.4"/>
        <path d="M 0 12 C -18 22, -26 34, -16 40 C -8 38, -4 28, 0 16 Z" fill="#ffbbf0" fill-opacity="0.82" stroke="#ff66cc" stroke-width="1.4"/>
        <circle cx="-16" cy="8" r="3" fill="#ffffff" opacity="0.8" />
        <circle cx="-10" cy="26" r="2.2" fill="#ffffff" opacity="0.8" />
      </g>
      <g transform="translate(68, 60) scale(-1, 1)">
        <path d="M 0 0 C -22 -14, -36 2, -32 20 C -22 26, -14 20, 0 12 Z" fill="#b3f0ff" fill-opacity="0.82" stroke="#4dd2ff" stroke-width="1.4"/>
        <path d="M 0 12 C -18 22, -26 34, -16 40 C -8 38, -4 28, 0 16 Z" fill="#ffbbf0" fill-opacity="0.82" stroke="#ff66cc" stroke-width="1.4"/>
        <circle cx="-16" cy="8" r="3" fill="#ffffff" opacity="0.8" />
        <circle cx="-10" cy="26" r="2.2" fill="#ffffff" opacity="0.8" />
      </g>
    `;
  } else if (backAcc === 'cat_tail') {
    backAccSvg = `
      <!-- ねこのしっぽ -->
      <g transform="translate(64, 76)">
        <path d="M 0 0 C 14 2, 26 -6, 25 -22 C 24 -30, 16 -30, 15 -22 C 14 -14, 8 -4, 0 2 Z" fill="#ff77aa" stroke="#e0266e" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M 23 -18 C 24 -28, 16 -28, 16 -20 Z" fill="#ffffff"/>
        <g transform="translate(21, -12)">
          <polygon points="0,0 -4,-3 -3,3" fill="#ffe066" />
          <polygon points="0,0 4,-3 3,3" fill="#ffe066" />
          <circle cx="0" cy="0" r="1.5" fill="#ff3377" />
        </g>
      </g>
    `;
  } else if (backAcc === 'bunny_tail') {
    backAccSvg = `
      <!-- まるいうさぎしっぽ -->
      <g transform="translate(66, 78)">
        <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#ffccd9" stroke-width="1.5"/>
        <circle cx="-2" cy="-2" r="6" fill="#fff5f8"/>
        <circle cx="-2" cy="-3" r="2" fill="#ffffff"/>
      </g>
    `;
  } else if (backAcc === 'devil_set') {
    backAccSvg = `
      <!-- 小悪魔の羽としっぽ -->
      <g transform="translate(30, 60)">
        <path d="M 0 0 L -14 -12 L -12 -2 L -22 -4 L -18 8 L -24 14 L -10 16 Z" fill="#4a184c" stroke="#260927" stroke-width="1.2"/>
      </g>
      <g transform="translate(70, 60) scale(-1, 1)">
        <path d="M 0 0 L -14 -12 L -12 -2 L -22 -4 L -18 8 L -24 14 L -10 16 Z" fill="#4a184c" stroke="#260927" stroke-width="1.2"/>
      </g>
      <g transform="translate(64, 76)">
        <path d="M 0 0 C 12 4, 22 -4, 24 -18" stroke="#4a184c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <polygon points="24,-24 20,-16 28,-16" fill="#ff2a6d" />
      </g>
    `;
  } else if (backAcc === 'rainbow_aura') {
    backAccSvg = `
      <!-- にじいろのオーラ -->
      <g>
        <ellipse cx="26" cy="62" rx="16" ry="24" fill="none" stroke="url(#rainbowGrad)" stroke-width="2.5" opacity="0.85" stroke-dasharray="4,3"/>
        <ellipse cx="74" cy="62" rx="16" ry="24" fill="none" stroke="url(#rainbowGrad)" stroke-width="2.5" opacity="0.85" stroke-dasharray="4,3"/>
        <polygon points="14,46 16,50 20,52 16,54 14,58 12,54 8,52 12,50" fill="#fffb88" opacity="0.9"/>
        <polygon points="84,46 86,50 90,52 86,54 84,58 82,54 78,52 82,50" fill="#fffb88" opacity="0.9"/>
        <polygon points="86,70 87,73 90,74 87,75 86,78 85,75 82,74 85,73" fill="#ff99dd" opacity="0.9"/>
      </g>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#fff9f5" />
          <stop offset="100%" stop-color="#ffe6dc" />
        </radialGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ff94c2" />
          <stop offset="100%" stop-color="#ff5292" />
        </linearGradient>
        <linearGradient id="dressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${dressInfo.top}" />
          <stop offset="100%" stop-color="${dressInfo.bottom}" />
        </linearGradient>
        <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff3366" />
          <stop offset="25%" stop-color="#ffbb00" />
          <stop offset="50%" stop-color="#33cc66" />
          <stop offset="75%" stop-color="#3399ff" />
          <stop offset="100%" stop-color="#cc33ff" />
        </linearGradient>
        <linearGradient id="rainbowDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff66aa" />
          <stop offset="25%" stop-color="#ffbb33" />
          <stop offset="50%" stop-color="#33dd88" />
          <stop offset="75%" stop-color="#33aaff" />
          <stop offset="100%" stop-color="#bb55ff" />
        </linearGradient>
        <linearGradient id="galaxyDressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3d2066" />
          <stop offset="60%" stop-color="#180b30" />
          <stop offset="100%" stop-color="#090314" />
        </linearGradient>
      </defs>

      <!-- 背中のキャンディ（リュック風・一番奥に描画） -->
      <g transform="translate(24, 60) rotate(-20)">
        <!-- 棒 -->
        <rect x="-2.5" y="0" width="5" height="28" rx="2.5" fill="#ffffff" stroke="#ffb8cf" stroke-width="1" />
        <!-- まるいロリポップ玉 -->
        <circle cx="0" cy="0" r="14" fill="${candyFill}" stroke="${candyStroke}" stroke-width="2.5" />
        <!-- うずまき・模様 -->
        ${candySpiral}
        <!-- ハイライト -->
        <ellipse cx="-4" cy="-5" rx="3.5" ry="2" fill="#ffffff" opacity="0.8" />
      </g>

      <!-- せなか・よこのアクセサリー（羽・しっぽ・オーラ） -->
      ${backAccSvg}

      <!-- 左ツインテール -->
      <g transform="rotate(${twirlAngle}, 30, 42)">
        <path d="M 28 42 C 12 30, 2 55, 12 75 C 18 85, 26 78, 28 62 Z" fill="url(#hairGrad)" />
        <circle cx="28" cy="42" r="5.5" fill="#ff2a70" />
        <circle cx="28" cy="42" r="3" fill="#ffffff" />
      </g>

      <!-- 右ツインテール -->
      <g transform="rotate(${-twirlAngle}, 72, 42)">
        <path d="M 72 42 C 88 30, 98 55, 88 75 C 82 85, 74 78, 72 62 Z" fill="url(#hairGrad)" />
        <circle cx="72" cy="42" r="5.5" fill="#ff2a70" />
        <circle cx="72" cy="42" r="3" fill="#ffffff" />
      </g>

      <!-- ワンピース（体） -->
      <path d="M 40 62 L 32 86 L 68 86 L 60 62 Z" fill="${dressInfo.isRainbow ? 'url(#rainbowDressGrad)' : (dressInfo.isGalaxy ? 'url(#galaxyDressGrad)' : 'url(#dressGrad)')}" />
      ${dressInfo.isGalaxy ? `
        <!-- ギャラクシードレスの星くず -->
        <circle cx="48" cy="74" r="1.1" fill="#ffffff" opacity="0.9"/>
        <circle cx="56" cy="80" r="1.4" fill="#ffe066" opacity="0.9"/>
        <circle cx="38" cy="82" r="0.9" fill="#70e1ff" opacity="0.8"/>
        <circle cx="62" cy="76" r="0.9" fill="#ffffff" opacity="0.8"/>
        <polygon points="50,68 51,70 53,70 51.5,71 52,73 50,72 48,73 48.5,71 47,70 49,70" fill="#ffffff" opacity="0.95"/>
      ` : ''}

      <!-- レースのエプロン -->
      <path d="M 44 65 L 40 84 L 60 84 L 56 65 Z" fill="#ffffff" opacity="0.95" />
      <path d="M 47 70 L 53 70" stroke="${dressInfo.apronLine}" stroke-width="2" stroke-linecap="round" />

      <!-- 顔 -->
      <circle cx="50" cy="46" r="22" fill="url(#faceGrad)" />

      <!-- 前髪 -->
      <path d="M 28 44 C 28 26, 72 26, 72 44 C 66 38, 60 46, 54 39 C 48 46, 40 38, 32 45 Z" fill="url(#hairGrad)" />

      <!-- ほっぺ -->
      <circle cx="37" cy="54" r="4.5" fill="#ff9ec6" opacity="0.75" />
      <circle cx="63" cy="54" r="4.5" fill="#ff9ec6" opacity="0.75" />

      <!-- 目 -->
      ${isBlinking ? `
        <path d="M 36 48 Q 42 44 48 48" stroke="#4a2536" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M 52 48 Q 58 44 64 48" stroke="#4a2536" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ` : `
        <!-- 左目 -->
        <ellipse cx="41" cy="47" rx="3.5" ry="5.5" fill="#4a2536" />
        <circle cx="42" cy="45" r="1.8" fill="#ffffff" />
        <circle cx="39.5" cy="49" r="0.9" fill="#ffffff" />
        <!-- 右目 -->
        <ellipse cx="59" cy="47" rx="3.5" ry="5.5" fill="#4a2536" />
        <circle cx="60" cy="45" r="1.8" fill="#ffffff" />
        <circle cx="57.5" cy="49" r="0.9" fill="#ffffff" />
      `}

      <!-- おくち -->
      <path d="M 47 55 Q 50 59 53 55" stroke="#ff4785" stroke-width="2" fill="none" stroke-linecap="round" />

      <!-- あたまのかざり -->
      ${headwearSvg}
    </svg>
  `;
}

// 動的Imageオブジェクトキャッシュ
const girlImageCache = new Map();
function getGirlImage(candyColor = 'red', dressColor = null, headwear = null, backAcc = null) {
  candyColor = candyColor || 'red';
  dressColor = dressColor || getDressColor();
  headwear = headwear || getHeadwear();
  backAcc = backAcc || getBackAcc();
  const key = `${candyColor}_${dressColor}_${headwear}_${backAcc}`;
  if (!girlImageCache.has(key)) {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(createGirlSvgString(false, 0, candyColor, dressColor, headwear, backAcc));
    girlImageCache.set(key, img);
  }
  return girlImageCache.get(key);
}

// キャンディ色のセーブ＆ロード（localStorage）
const CANDY_SAVE_KEY = 'sweets_athletic_saved_candy';
const CANDY_RANK = { red: 1, yellow: 2, black: 3, white: 4, rainbow: 5 };

function saveCandyColor(color) {
  try {
    const current = loadCandyColor();
    const currentRank = CANDY_RANK[current] || 1;
    const newRank = CANDY_RANK[color] || 1;
    // より高いランクのキャンディを手に入れたら保存（虹色をとったらずっと虹色！）
    if (newRank >= currentRank) {
      localStorage.setItem(CANDY_SAVE_KEY, color);
    }
  } catch (e) {}
}

function loadCandyColor() {
  try {
    return localStorage.getItem(CANDY_SAVE_KEY) || 'red';
  } catch (e) {
    return 'red';
  }
}

// スタート画面のプレビューにも表示
function updateCharPreview(color) {
  const preview = document.getElementById('char-preview');
  if (preview) {
    const dressColor = getDressColor();
    const headwear = getHeadwear();
    const backAcc = getBackAcc();
    preview.innerHTML = createGirlSvgString(false, 8, color, dressColor, headwear, backAcc);
    const svgEl = preview.querySelector('svg');
    if (svgEl) {
      svgEl.style.width = '110px';
      svgEl.style.height = '110px';
      svgEl.style.filter = 'drop-shadow(0 6px 12px rgba(255, 100, 160, 0.3))';
    }
  }
}

// ==========================================
// 2.5 ペットショップ＆スイーツ貯金システム 🐾🛍️
// ==========================================
const TOTAL_SWEETS_KEY = 'sweets_athletic_total_sweets';
const UNLOCKED_PETS_KEY = 'sweets_athletic_unlocked_pets';
const SELECTED_PET_KEY = 'sweets_athletic_selected_pet';

const PET_LIST = [
  // 買うたびに1コインずつもらえるコインが増加！
  // 猫=1, うさぎ=2, 犬=3, プリン=4, くま=5, 風船=6, ハムスター=7, 雲=8, 星=9, おばけ=10, ユニコーン=11, 虹風船=12
  { id: 'cat', name: 'しろねこ', icon: '🐱', price: 0, coinPower: 1, isFlying: false },
  { id: 'rabbit', name: 'いちごうさぎ', icon: '🐰', price: 10, coinPower: 2, isFlying: false },
  { id: 'dog', name: 'プリンいぬ', icon: '🐶', price: 20, coinPower: 3, isFlying: false },
  { id: 'pudding_pet', name: 'ぷるるんプリン', icon: '🍮', price: 25, coinPower: 4, isFlying: false },
  { id: 'bear', name: 'くまチョコ', icon: '🐻', price: 30, coinPower: 5, isFlying: false },
  { id: 'heart_balloon', name: 'ハート風船', icon: '🎈', price: 35, coinPower: 6, isFlying: true },
  { id: 'hamster', name: 'マカロンハム', icon: '🐹', price: 40, coinPower: 7, isFlying: false },
  { id: 'marshmallow_cloud', name: 'マシュマロ雲', icon: '☁️', price: 50, coinPower: 8, isFlying: true },
  { id: 'star_pet', name: 'きらきら星', icon: '⭐', price: 60, coinPower: 9, isFlying: true },
  { id: 'ghost_pet', name: 'キャンディおばけ', icon: '🍬', price: 70, coinPower: 10, isFlying: true },
  { id: 'unicorn', name: 'にじユニコーン', icon: '🦄', price: 80, coinPower: 11, isFlying: false },
  { id: 'rainbow_balloon', name: 'にじいろバルーン', icon: '🌈', price: 100, coinPower: 12, isFlying: true }
];

function getTotalSweets() {
  try {
    return parseInt(localStorage.getItem(TOTAL_SWEETS_KEY) || '0', 10);
  } catch (e) {
    return 0;
  }
}

function addTotalSweets(amount = 1) {
  try {
    const current = getTotalSweets() + amount;
    localStorage.setItem(TOTAL_SWEETS_KEY, current);
    updateSweetsUI();
    return current;
  } catch (e) {
    return 0;
  }
}

function getUnlockedPets() {
  try {
    const saved = localStorage.getItem(UNLOCKED_PETS_KEY);
    return saved ? JSON.parse(saved) : ['cat'];
  } catch (e) {
    return ['cat'];
  }
}

function unlockPet(petId) {
  const unlocked = getUnlockedPets();
  if (!unlocked.includes(petId)) {
    unlocked.push(petId);
    try {
      localStorage.setItem(UNLOCKED_PETS_KEY, JSON.stringify(unlocked));
    } catch (e) {}
  }
}

function getSelectedPet() {
  try {
    return localStorage.getItem(SELECTED_PET_KEY) || 'cat';
  } catch (e) {
    return 'cat';
  }
}

function setSelectedPet(petId) {
  try {
    localStorage.setItem(SELECTED_PET_KEY, petId);
  } catch (e) {}
  updateSweetsUI();
  renderPetShop();
}

function updateSweetsUI() {
  const total = getTotalSweets();
  const bankEl = document.getElementById('bank-sweets-val');
  const shopBankEl = document.getElementById('shop-sweets-val');
  const dressupBankEl = document.getElementById('dressup-sweets-val');
  if (bankEl) bankEl.textContent = total;
  if (shopBankEl) shopBankEl.textContent = total;
  if (dressupBankEl) dressupBankEl.textContent = total;

  const currentPetId = getSelectedPet();
  const currentPet = PET_LIST.find(p => p.id === currentPetId) || PET_LIST[0];
  const petPower = currentPet.coinPower || 1;

  const petNameEl = document.getElementById('start-pet-name');
  const petBonusEl = document.getElementById('start-pet-bonus');
  const coinBadgeEl = document.getElementById('score-coin-power');

  if (petNameEl) petNameEl.textContent = `${currentPet.icon} ${currentPet.name}`;
  if (petBonusEl) petBonusEl.textContent = `🍓 +${petPower}コイン`;
  if (coinBadgeEl) coinBadgeEl.textContent = `+${petPower}`;
}

let shopActiveTab = 'pets';

function setShopActiveTab(tab) {
  shopActiveTab = tab;
  const tabPets = document.getElementById('tab-shop-pets');
  const tabCostumes = document.getElementById('tab-shop-costumes');
  const petGrid = document.getElementById('pet-grid');
  const costumeGrid = document.getElementById('costume-grid');
  const subtitle = document.getElementById('shop-subtitle');
  const btnClose = document.getElementById('btn-close-shop');

  if (tab === 'costumes') {
    if (tabPets) tabPets.classList.remove('active');
    if (tabCostumes) tabCostumes.classList.add('active');
    if (petGrid) petGrid.style.display = 'none';
    if (costumeGrid) costumeGrid.style.display = 'grid';
    if (subtitle) subtitle.textContent = 'かわいいドレスやあたまのかざりを集めよう！👗✨';
    renderCostumeShop();
    if (btnClose) {
      if (gameState === 'PLAYING') {
        btnClose.textContent = '🎮 このコーデでつづきをあそぶ！ 💖';
      } else {
        btnClose.textContent = '💖 このコーデであそぶ！ 🎮';
      }
    }
  } else {
    if (tabPets) tabPets.classList.add('active');
    if (tabCostumes) tabCostumes.classList.remove('active');
    if (petGrid) petGrid.style.display = 'grid';
    if (costumeGrid) costumeGrid.style.display = 'none';
    if (subtitle) subtitle.textContent = 'すきなおともだちをえらんで一緒にあそぼう！';
    renderPetShop();
  }
}

function renderPetShop() {
  const grid = document.getElementById('pet-grid');
  if (!grid) return;
  const unlocked = getUnlockedPets();
  const selected = getSelectedPet();
  const totalSweets = getTotalSweets();

  updateSweetsUI();
  grid.innerHTML = '';

  PET_LIST.forEach(p => {
    const isUnlocked = unlocked.includes(p.id);
    const isSelected = selected === p.id;

    const card = document.createElement('div');
    card.className = `pet-card ${isSelected ? 'selected' : ''}`;

    let buttonHtml = '';
    if (isSelected) {
      buttonHtml = `<button class="btn-pet-action btn-active" disabled>連れてる！💖</button>`;
    } else if (isUnlocked) {
      buttonHtml = `<button class="btn-pet-action btn-select" onclick="selectPetAction('${p.id}')">えらぶ ✨</button>`;
    } else {
      const canBuy = totalSweets >= p.price;
      buttonHtml = `<button class="btn-pet-action btn-buy" onclick="buyPetAction('${p.id}')" ${!canBuy ? 'style="opacity:0.6;"' : ''}>お迎え 🍓${p.price}</button>`;
    }

    card.innerHTML = `
      <div class="pet-icon">${p.icon}</div>
      <div class="pet-name">${p.name}</div>
      <div class="pet-coin-badge">🍓 +${p.coinPower} コイン</div>
      <div class="pet-price">${isUnlocked ? 'おともだち' : `🍓 ${p.price}こ`}</div>
      ${buttonHtml}
    `;
    grid.appendChild(card);
  });

  // 選択中のペットに合わせて「あそぶ」ボタンを更新（ペットタブ表示時）
  if (shopActiveTab === 'pets') {
    const currentPetItem = PET_LIST.find(p => p.id === selected) || PET_LIST[0];
    const btnClose = document.getElementById('btn-close-shop');
    if (btnClose) {
      if (gameState === 'PLAYING') {
        btnClose.textContent = `🎮 ${currentPetItem.name} とつづきをあそぶ！ (🍓+${currentPetItem.coinPower}) 💖`;
      } else {
        btnClose.textContent = `💖 ${currentPetItem.name} とあそぶ！ (🍓+${currentPetItem.coinPower}) 🎮`;
      }
    }
  }
}

function renderCostumeShop() {
  const grid = document.getElementById('costume-grid');
  if (!grid) return;
  const unlockedDresses = getUnlockedDresses();
  const unlockedHeadwear = getUnlockedHeadwear();
  const unlockedBackAcc = getUnlockedBackAcc();
  const currentDress = getDressColor();
  const currentHeadwear = getHeadwear();
  const currentBackAcc = getBackAcc();
  const totalSweets = getTotalSweets();

  updateSweetsUI();
  grid.innerHTML = '';

  // 1. ドレス一覧
  Object.keys(DRESS_COLORS).forEach(key => {
    const d = DRESS_COLORS[key];
    const isUnlocked = unlockedDresses.includes(key);
    const isSelected = currentDress === key;

    const card = document.createElement('div');
    card.className = `costume-card ${isSelected ? 'selected' : ''}`;

    let buttonHtml = '';
    if (isSelected) {
      buttonHtml = `<button class="btn-costume-action btn-active" disabled>着てるよ！💖</button>`;
    } else if (isUnlocked) {
      buttonHtml = `<button class="btn-costume-action btn-select" onclick="selectCostumeAction('dress', '${key}')">きがえる ✨</button>`;
    } else {
      const canBuy = totalSweets >= d.price;
      buttonHtml = `<button class="btn-costume-action btn-buy" onclick="buyCostumeAction('dress', '${key}')" ${!canBuy ? 'style="opacity:0.6;"' : ''}>購入 🍓${d.price}</button>`;
    }

    card.innerHTML = `
      <div class="costume-type-badge">👗 ドレス</div>
      <div class="costume-icon">${d.icon || '👗'}</div>
      <div class="costume-name">${d.name}</div>
      <div class="costume-price">${isUnlocked ? 'ゲット済み ✨' : `🍓 ${d.price}こ`}</div>
      ${buttonHtml}
    `;
    grid.appendChild(card);
  });

  // 2. あたまのかざり一覧
  HEADWEAR_LIST.forEach(hw => {
    const isUnlocked = unlockedHeadwear.includes(hw.id);
    const isSelected = currentHeadwear === hw.id;

    const card = document.createElement('div');
    card.className = `costume-card ${isSelected ? 'selected' : ''}`;

    let buttonHtml = '';
    if (isSelected) {
      buttonHtml = `<button class="btn-costume-action btn-active" disabled>つけてる！💖</button>`;
    } else if (isUnlocked) {
      buttonHtml = `<button class="btn-costume-action btn-select" onclick="selectCostumeAction('headwear', '${hw.id}')">つける ✨</button>`;
    } else {
      const canBuy = totalSweets >= hw.price;
      buttonHtml = `<button class="btn-costume-action btn-buy" onclick="buyCostumeAction('headwear', '${hw.id}')" ${!canBuy ? 'style="opacity:0.6;"' : ''}>購入 🍓${hw.price}</button>`;
    }

    card.innerHTML = `
      <div class="costume-type-badge" style="background:#fff0f5; border-color:#ffccd9; color:#d62860;">🎀 かざり</div>
      <div class="costume-icon">${hw.icon || '🎀'}</div>
      <div class="costume-name">${hw.name}</div>
      <div class="costume-price">${isUnlocked ? 'ゲット済み ✨' : `🍓 ${hw.price}こ`}</div>
      ${buttonHtml}
    `;
    grid.appendChild(card);
  });

  // 3. せなか・よこのアクセサリー一覧 (なし以外)
  BACK_ACC_LIST.filter(acc => acc.id !== 'none').forEach(acc => {
    const isUnlocked = unlockedBackAcc.includes(acc.id);
    const isSelected = currentBackAcc === acc.id;

    const card = document.createElement('div');
    card.className = `costume-card ${isSelected ? 'selected' : ''}`;

    let buttonHtml = '';
    if (isSelected) {
      buttonHtml = `<button class="btn-costume-action btn-active" disabled>つけてる！💖</button>`;
    } else if (isUnlocked) {
      buttonHtml = `<button class="btn-costume-action btn-select" onclick="selectCostumeAction('back_acc', '${acc.id}')">つける ✨</button>`;
    } else {
      const canBuy = totalSweets >= acc.price;
      buttonHtml = `<button class="btn-costume-action btn-buy" onclick="buyCostumeAction('back_acc', '${acc.id}')" ${!canBuy ? 'style="opacity:0.6;"' : ''}>購入 🍓${acc.price}</button>`;
    }

    card.innerHTML = `
      <div class="costume-type-badge" style="background:#e8faff; border-color:#a5e6f8; color:#0088aa;">🪽 よこ・せなか</div>
      <div class="costume-icon">${acc.icon || '🪽'}</div>
      <div class="costume-name">${acc.name}</div>
      <div class="costume-price">${isUnlocked ? 'ゲット済み ✨' : `🍓 ${acc.price}こ`}</div>
      ${buttonHtml}
    `;
    grid.appendChild(card);
  });
}

window.selectPetAction = function(petId) {
  setSelectedPet(petId);
  sounds.playCollect();
};

window.buyPetAction = function(petId) {
  const petItem = PET_LIST.find(p => p.id === petId);
  if (!petItem) return;
  const totalSweets = getTotalSweets();
  if (totalSweets >= petItem.price) {
    addTotalSweets(-petItem.price);
    unlockPet(petId);
    setSelectedPet(petId);
    sounds.playCandyLevelUp();
    showBanner(`🎉 ${petItem.name} をお迎えしたよ！ ✨`);
  } else {
    alert(`スイーツが足りないよ！あと ${petItem.price - totalSweets} 個あつめてね 🍓`);
  }
};

window.selectCostumeAction = function(type, id) {
  if (type === 'dress') {
    setDressColor(id);
  } else if (type === 'headwear') {
    setHeadwear(id);
  } else if (type === 'back_acc') {
    setBackAcc(id);
  }
  sounds.playCollect();
  renderCostumeShop();
};

window.buyCostumeAction = function(type, id) {
  const totalSweets = getTotalSweets();
  let item = null;
  if (type === 'dress') {
    item = DRESS_COLORS[id];
  } else if (type === 'headwear') {
    item = HEADWEAR_LIST.find(h => h.id === id);
  } else if (type === 'back_acc') {
    item = BACK_ACC_LIST.find(b => b.id === id);
  }
  if (!item) return;

  if (totalSweets >= item.price) {
    addTotalSweets(-item.price);
    if (type === 'dress') {
      unlockDress(id);
      setDressColor(id);
    } else if (type === 'headwear') {
      unlockHeadwear(id);
      setHeadwear(id);
    } else if (type === 'back_acc') {
      unlockBackAcc(id);
      setBackAcc(id);
    }
    sounds.playCandyLevelUp();
    showBanner(`🎉 ${item.name} をゲットしたよ！ ✨`);
    renderCostumeShop();
  } else {
    alert(`スイーツが足りないよ！あと ${item.price - totalSweets} 個あつめてね 🍓`);
  }
};

// きせかえ画面のレンダリング＆プレビュー
function renderDressUpModal() {
  const currentDress = getDressColor();
  const currentHeadwear = getHeadwear();
  const currentBackAcc = getBackAcc();
  const unlockedDresses = getUnlockedDresses();
  const unlockedHeadwear = getUnlockedHeadwear();
  const unlockedBackAcc = getUnlockedBackAcc();
  const totalSweets = getTotalSweets();

  const dressupBankEl = document.getElementById('dressup-sweets-val');
  if (dressupBankEl) dressupBankEl.textContent = totalSweets;

  // ドレスの選択パレット
  const dressContainer = document.getElementById('dress-palette');
  if (dressContainer) {
    dressContainer.innerHTML = '';
    Object.keys(DRESS_COLORS).forEach(colorKey => {
      const info = DRESS_COLORS[colorKey];
      const isUnlocked = unlockedDresses.includes(colorKey);
      const isSelected = currentDress === colorKey;

      const btn = document.createElement('button');
      btn.className = 'swatch-btn' + (isSelected ? ' active' : '') + (!isUnlocked ? ' locked' : '');

      const dotBg = info.isRainbow
        ? 'linear-gradient(135deg, #ff6699, #ffbb33, #33dd88, #33aaff, #bb55ff)'
        : (info.isGalaxy ? 'linear-gradient(135deg, #4b2c6d, #1c0f33)' : info.top);

      let badgeHtml = '';
      if (!isUnlocked) {
        badgeHtml = `<span class="swatch-lock-badge">🔒 🍓${info.price}</span>`;
      }

      btn.innerHTML = `<span class="swatch-color-dot" style="background: ${dotBg}"></span><span>${info.name}</span>${badgeHtml}`;

      btn.addEventListener('click', () => {
        if (isUnlocked) {
          setDressColor(colorKey);
          renderDressUpModal();
          sounds.playCollect();
        } else {
          // 購入確認モーダル
          const nowTotal = getTotalSweets();
          if (confirm(`${info.name} を 🍓${info.price} こで買いますか？\n(もっているスイーツ: ${nowTotal}こ)`)) {
            if (nowTotal >= info.price) {
              addTotalSweets(-info.price);
              unlockDress(colorKey);
              setDressColor(colorKey);
              sounds.playCandyLevelUp();
              showBanner(`🎉 ${info.name} をゲットしたよ！ ✨`);
              renderDressUpModal();
            } else {
              alert(`スイーツが足りないよ！あと ${info.price - nowTotal} 個あつめてね 🍓`);
            }
          }
        }
      });
      dressContainer.appendChild(btn);
    });
  }

  // あたまのかざりパレット
  const headwearContainer = document.getElementById('headwear-palette');
  if (headwearContainer) {
    headwearContainer.innerHTML = '';
    HEADWEAR_LIST.forEach(hw => {
      const isUnlocked = unlockedHeadwear.includes(hw.id);
      const isSelected = currentHeadwear === hw.id;

      const btn = document.createElement('button');
      btn.className = 'swatch-btn' + (isSelected ? ' active' : '') + (!isUnlocked ? ' locked' : '');

      let badgeHtml = '';
      if (!isUnlocked) {
        badgeHtml = `<span class="swatch-lock-badge">🔒 🍓${hw.price}</span>`;
      }

      btn.innerHTML = `<span>${hw.name}</span>${badgeHtml}`;

      btn.addEventListener('click', () => {
        if (isUnlocked) {
          setHeadwear(hw.id);
          renderDressUpModal();
          sounds.playCollect();
        } else {
          // 購入確認モーダル
          const nowTotal = getTotalSweets();
          if (confirm(`${hw.name} を 🍓${hw.price} こで買いますか？\n(もっているスイーツ: ${nowTotal}こ)`)) {
            if (nowTotal >= hw.price) {
              addTotalSweets(-hw.price);
              unlockHeadwear(hw.id);
              setHeadwear(hw.id);
              sounds.playCandyLevelUp();
              showBanner(`🎉 ${hw.name} をゲットしたよ！ ✨`);
              renderDressUpModal();
            } else {
              alert(`スイーツが足りないよ！あと ${hw.price - nowTotal} 個あつめてね 🍓`);
            }
          }
        }
      });
      headwearContainer.appendChild(btn);
    });
  }

  // せなか・よこのアクセサリーパレット
  const backAccContainer = document.getElementById('back-acc-palette');
  if (backAccContainer) {
    backAccContainer.innerHTML = '';
    BACK_ACC_LIST.forEach(acc => {
      const isUnlocked = unlockedBackAcc.includes(acc.id);
      const isSelected = currentBackAcc === acc.id;

      const btn = document.createElement('button');
      btn.className = 'swatch-btn' + (isSelected ? ' active' : '') + (!isUnlocked ? ' locked' : '');

      let badgeHtml = '';
      if (!isUnlocked) {
        badgeHtml = `<span class="swatch-lock-badge">🔒 🍓${acc.price}</span>`;
      }

      btn.innerHTML = `<span>${acc.name}</span>${badgeHtml}`;

      btn.addEventListener('click', () => {
        if (isUnlocked) {
          setBackAcc(acc.id);
          renderDressUpModal();
          sounds.playCollect();
        } else {
          // 購入確認モーダル
          const nowTotal = getTotalSweets();
          if (confirm(`${acc.name} を 🍓${acc.price} こで買いますか？\n(もっているスイーツ: ${nowTotal}こ)`)) {
            if (nowTotal >= acc.price) {
              addTotalSweets(-acc.price);
              unlockBackAcc(acc.id);
              setBackAcc(acc.id);
              sounds.playCandyLevelUp();
              showBanner(`🎉 ${acc.name} をゲットしたよ！ ✨`);
              renderDressUpModal();
            } else {
              alert(`スイーツが足りないよ！あと ${acc.price - nowTotal} 個あつめてね 🍓`);
            }
          }
        }
      });
      backAccContainer.appendChild(btn);
    });
  }

  renderDressUpPreview();
}

function renderDressUpPreview() {
  const preview = document.getElementById('dressup-char-preview');
  if (preview) {
    const currentColor = (typeof player !== 'undefined' && player) ? player.candyColor : loadCandyColor();
    preview.innerHTML = createGirlSvgString(false, 0, currentColor, getDressColor(), getHeadwear(), getBackAcc());
    const svg = preview.querySelector('svg');
    if (svg) {
      svg.style.width = '88px';
      svg.style.height = '88px';
      svg.style.filter = 'drop-shadow(0 4px 10px rgba(255, 120, 180, 0.3))';
    }
  }
}

// ランダムで着せ替え（おまかせコーデ）
function randomizeDressUp() {
  sounds.init();
  const dresses = getUnlockedDresses();
  const headwears = getUnlockedHeadwear();
  const backs = getUnlockedBackAcc();

  if (dresses.length > 0) {
    const randomDress = dresses[Math.floor(Math.random() * dresses.length)];
    setDressColor(randomDress);
  }
  if (headwears.length > 0) {
    const randomHeadwear = headwears[Math.floor(Math.random() * headwears.length)];
    setHeadwear(randomHeadwear);
  }
  if (backs.length > 0) {
    const randomBack = backs[Math.floor(Math.random() * backs.length)];
    setBackAcc(randomBack);
  }

  // 選択枠などを再描画
  renderDressUpModal();

  // プレビューのポップアニメーション
  const preview = document.getElementById('dressup-char-preview');
  if (preview) {
    preview.classList.remove('spin-pop');
    void preview.offsetWidth; // リフローを発生させてアニメーションを再実行
    preview.classList.add('spin-pop');
  }

  sounds.playCandyLevelUp();
  showBanner('🎲 おまかせコーデに変身したよ！ ✨');
}

// ペットのおへや（なかよし広場）
let petRoomPets = [];
let petRoomInterval = null;

function renderPetRoomModal() {
  const unlocked = getUnlockedPets();
  const activeId = getSelectedPet();
  const activePetInfo = PET_LIST.find(p => p.id === activeId) || PET_LIST[0];

  const badge = document.getElementById('petroom-active-badge');
  if (badge) {
    badge.textContent = `いっしょ: ${activePetInfo.icon} ${activePetInfo.name} (+${activePetInfo.coinPower}🍓)`;
  }

  const playArea = document.getElementById('petroom-playarea');
  if (!playArea) return;
  playArea.innerHTML = '';

  // おへやのペットたちデータ
  petRoomPets = unlocked.map((id, index) => {
    const info = PET_LIST.find(p => p.id === id) || PET_LIST[0];
    return {
      id: info.id,
      name: info.name,
      icon: info.icon,
      coinPower: info.coinPower,
      x: 30 + (index % 5) * 85 + (Math.random() * 20),
      y: 65 + Math.floor(index / 5) * 65 + (Math.random() * 20),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 0.8,
      bubble: ['❤️', '✨', '🍓', '🎶', '💤'][Math.floor(Math.random() * 5)],
      timer: Math.random() * 100
    };
  });

  petRoomPets.forEach(p => {
    const el = document.createElement('div');
    el.className = 'petroom-pet' + (p.id === activeId ? ' active-equipped' : '');
    el.id = `petroom-pet-${p.id}`;
    el.style.left = `${Math.round(p.x)}px`;
    el.style.top = `${Math.round(p.y)}px`;
    el.innerHTML = `
      <div class="petroom-pet-bubble">${p.bubble}</div>
      <div class="petroom-pet-icon">${p.icon}</div>
      <div class="petroom-pet-label">${p.name}</div>
    `;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      setSelectedPet(p.id);
      sounds.playCandyLevelUp();
      p.bubble = '💖 だいすき！';
      renderPetRoomModal();
      showBanner(`💖 ${p.name} と一緒におでかけ！ ✨`);
    });

    playArea.appendChild(el);
  });

  if (petRoomInterval) clearInterval(petRoomInterval);
  petRoomInterval = setInterval(() => {
    const area = document.getElementById('petroom-playarea');
    const roomScreen = document.getElementById('petroom-screen');
    if (!area || !roomScreen || !roomScreen.classList.contains('active')) {
      clearInterval(petRoomInterval);
      return;
    }
    const boundsW = area.clientWidth || 500;
    const boundsH = area.clientHeight || 220;

    petRoomPets.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 15) { p.x = 15; p.vx = Math.abs(p.vx); }
      if (p.x > boundsW - 60) { p.x = boundsW - 60; p.vx = -Math.abs(p.vx); }
      if (p.y < 35) { p.y = 35; p.vy = Math.abs(p.vy); }
      if (p.y > boundsH - 60) { p.y = boundsH - 60; p.vy = -Math.abs(p.vy); }
      p.timer++;
      if (p.timer > 80) {
        p.timer = 0;
        p.bubble = ['❤️', '✨', '🍓', '🎶', '😋', '🐾', '🎀'][Math.floor(Math.random() * 7)];
        p.vx = (Math.random() - 0.5) * 1.5;
        p.vy = (Math.random() - 0.5) * 0.9;
      }
      const el = document.getElementById(`petroom-pet-${p.id}`);
      if (el) {
        el.style.left = `${Math.round(p.x)}px`;
        el.style.top = `${Math.round(p.y)}px`;
        const bubble = el.querySelector('.petroom-pet-bubble');
        if (bubble) bubble.textContent = p.bubble;
      }
    });
  }, 100);
}

function updateNightModeUI() {
  const btnNight = document.getElementById('btn-night');
  if (btnNight) {
    btnNight.textContent = isNightMode ? '🌙' : '☀️';
  }
  if (isNightMode) {
    document.body.classList.add('night-mode');
  } else {
    document.body.classList.remove('night-mode');
  }
}

function toggleNightMode() {
  isNightMode = !isNightMode;
  try {
    localStorage.setItem(NIGHT_MODE_KEY, isNightMode);
  } catch (e) {}
  updateNightModeUI();
  sounds.playCollect();
  showBanner(isNightMode ? '🌙 よるのお菓子の国になったよ！ ✨' : '☀️ あさのお菓子の国になったよ！ 🍓');
}

function setupModalEvents() {
  // ショップモーダル要素
  const shopScreen = document.getElementById('shop-screen');
  const btnOpenShop = document.getElementById('btn-open-shop');
  const btnHeaderShop = document.getElementById('btn-header-shop');
  const btnClearShop = document.getElementById('btn-clear-shop');
  const btnFailShop = document.getElementById('btn-fail-shop');
  const btnCloseShop = document.getElementById('btn-close-shop');
  const btnShopCloseCorner = document.getElementById('btn-shop-close-corner');

  // きせかえモーダル要素
  const dressupScreen = document.getElementById('dressup-screen');
  const btnDressup = document.getElementById('btn-dressup');
  const btnOpenDressup = document.getElementById('btn-open-dressup');
  const btnClearDressup = document.getElementById('btn-clear-dressup');
  const btnFailDressup = document.getElementById('btn-fail-dressup');
  const btnCloseDressup = document.getElementById('btn-close-dressup');
  const btnDressupCloseCorner = document.getElementById('btn-dressup-close-corner');

  // ペットのおへやモーダル要素
  const petroomScreen = document.getElementById('petroom-screen');
  const btnPetroom = document.getElementById('btn-petroom');
  const btnOpenPetroom = document.getElementById('btn-open-petroom');
  const btnClosePetroom = document.getElementById('btn-close-petroom');
  const btnPetroomCloseCorner = document.getElementById('btn-petroom-close-corner');
  const btnPetroomToShop = document.getElementById('btn-petroom-to-shop');

  // 夜モードボタン
  const btnNight = document.getElementById('btn-night');
  if (btnNight) btnNight.addEventListener('click', toggleNightMode);

  // ショップ開閉
  function openShop() {
    setShopActiveTab(shopActiveTab);
    if (shopScreen) shopScreen.classList.add('active');
    sounds.init();
  }
  function closeShopAndResume() {
    if (shopScreen) shopScreen.classList.remove('active');
    sounds.init();
    sounds.playJump();
    if (gameState === 'START' || gameState === 'CLEAR' || gameState === 'FAIL') {
      startGame();
    }
  }
  function closeShop() {
    if (shopScreen) shopScreen.classList.remove('active');
    sounds.init();
  }

  // ショップタブ切り替え
  const tabShopPets = document.getElementById('tab-shop-pets');
  const tabShopCostumes = document.getElementById('tab-shop-costumes');
  if (tabShopPets) {
    tabShopPets.addEventListener('click', () => {
      setShopActiveTab('pets');
      sounds.playCollect();
    });
  }
  if (tabShopCostumes) {
    tabShopCostumes.addEventListener('click', () => {
      setShopActiveTab('costumes');
      sounds.playCollect();
    });
  }

  if (btnOpenShop) btnOpenShop.addEventListener('click', openShop);
  if (btnHeaderShop) btnHeaderShop.addEventListener('click', openShop);
  if (btnClearShop) btnClearShop.addEventListener('click', openShop);
  if (btnFailShop) btnFailShop.addEventListener('click', openShop);
  if (btnCloseShop) btnCloseShop.addEventListener('click', closeShopAndResume);
  if (btnShopCloseCorner) btnShopCloseCorner.addEventListener('click', closeShop);
  if (shopScreen) {
    shopScreen.addEventListener('click', (e) => {
      if (e.target === shopScreen) closeShop();
    });
  }

  // きせかえカテゴリ切り替え
  const dressupCatTabs = document.querySelectorAll('.dressup-cat-tab');
  function applyDressupCategoryFilter(cat) {
    const groupDress = document.getElementById('dressup-group-dress');
    const groupHeadwear = document.getElementById('dressup-group-headwear');
    const groupBack = document.getElementById('dressup-group-back');
    if (groupDress) groupDress.style.display = (cat === 'all' || cat === 'dress') ? 'block' : 'none';
    if (groupHeadwear) groupHeadwear.style.display = (cat === 'all' || cat === 'headwear') ? 'block' : 'none';
    if (groupBack) groupBack.style.display = (cat === 'all' || cat === 'back') ? 'block' : 'none';
    const scrollArea = document.getElementById('dressup-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;
  }

  dressupCatTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dressupCatTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyDressupCategoryFilter(tab.dataset.category || 'all');
      sounds.playCollect();
    });
  });

  // きせかえ開閉
  function openDressup() {
    renderDressUpModal();
    dressupCatTabs.forEach(t => {
      if (t.dataset.category === 'all') t.classList.add('active');
      else t.classList.remove('active');
    });
    applyDressupCategoryFilter('all');
    if (dressupScreen) dressupScreen.classList.add('active');
    sounds.init();
  }
  function closeDressupAndResume() {
    if (dressupScreen) dressupScreen.classList.remove('active');
    sounds.init();
    sounds.playJump();
    if (gameState === 'START' || gameState === 'CLEAR' || gameState === 'FAIL') {
      startGame();
    }
  }
  function closeDressup() {
    if (dressupScreen) dressupScreen.classList.remove('active');
    sounds.init();
  }

  const btnDressupToShop = document.getElementById('btn-dressup-to-shop');
  if (btnDressupToShop) {
    btnDressupToShop.addEventListener('click', () => {
      closeDressup();
      setShopActiveTab('costumes');
      openShop();
    });
  }

  // ランダム着せ替えボタン（プレビュー横 & 下部バー）
  const btnQuickRandom = document.getElementById('btn-quick-random');
  const btnDressupRandom = document.getElementById('btn-dressup-random');
  if (btnQuickRandom) btnQuickRandom.addEventListener('click', randomizeDressUp);
  if (btnDressupRandom) btnDressupRandom.addEventListener('click', randomizeDressUp);

  if (btnDressup) btnDressup.addEventListener('click', openDressup);
  if (btnOpenDressup) btnOpenDressup.addEventListener('click', openDressup);
  if (btnClearDressup) btnClearDressup.addEventListener('click', openDressup);
  if (btnFailDressup) btnFailDressup.addEventListener('click', openDressup);
  if (btnCloseDressup) btnCloseDressup.addEventListener('click', closeDressupAndResume);
  if (btnDressupCloseCorner) btnDressupCloseCorner.addEventListener('click', closeDressup);
  if (dressupScreen) {
    dressupScreen.addEventListener('click', (e) => {
      if (e.target === dressupScreen) closeDressup();
    });
  }

  // ペットのおへや開閉
  function openPetroom() {
    renderPetRoomModal();
    if (petroomScreen) petroomScreen.classList.add('active');
    sounds.init();
  }
  function closePetroomAndResume() {
    if (petroomScreen) petroomScreen.classList.remove('active');
    if (petRoomInterval) clearInterval(petRoomInterval);
    sounds.init();
    sounds.playJump();
    if (gameState === 'START' || gameState === 'CLEAR' || gameState === 'FAIL') {
      startGame();
    }
  }
  function closePetroom() {
    if (petroomScreen) petroomScreen.classList.remove('active');
    if (petRoomInterval) clearInterval(petRoomInterval);
    sounds.init();
  }

  if (btnPetroom) btnPetroom.addEventListener('click', openPetroom);
  if (btnOpenPetroom) btnOpenPetroom.addEventListener('click', openPetroom);
  if (btnClosePetroom) btnClosePetroom.addEventListener('click', closePetroomAndResume);
  if (btnPetroomCloseCorner) btnPetroomCloseCorner.addEventListener('click', closePetroom);
  if (btnPetroomToShop) btnPetroomToShop.addEventListener('click', () => {
    closePetroom();
    openShop();
  });
  if (petroomScreen) {
    petroomScreen.addEventListener('click', (e) => {
      if (e.target === petroomScreen) closePetroom();
    });
  }

  // ステージ選択モーダル要素
  const stageScreen = document.getElementById('stage-screen');
  const btnStageSelect = document.getElementById('btn-stage-select');
  const btnStartSelectStage = document.getElementById('btn-start-select-stage');
  const btnClearStageSelect = document.getElementById('btn-clear-stage-select');
  const btnStageCloseCorner = document.getElementById('btn-stage-close-corner');
  const btnStagePlay = document.getElementById('btn-stage-play');
  const stageCard1 = document.getElementById('stage-card-1');
  const stageCard2 = document.getElementById('stage-card-2');
  const stageCard3 = document.getElementById('stage-card-3');
  const btnClearNextStage = document.getElementById('btn-clear-next-stage');

  function openStageSelect() {
    updateStageUI();
    if (stageScreen) stageScreen.classList.add('active');
    sounds.init();
  }

  function closeStageSelect() {
    if (stageScreen) stageScreen.classList.remove('active');
    sounds.init();
  }

  function chooseAndPlayStage() {
    closeStageSelect();
    sounds.init();
    sounds.playJump();
    startGame();
  }

  if (btnStageSelect) btnStageSelect.addEventListener('click', openStageSelect);
  if (btnStartSelectStage) btnStartSelectStage.addEventListener('click', openStageSelect);
  if (btnClearStageSelect) btnClearStageSelect.addEventListener('click', openStageSelect);
  if (btnStageCloseCorner) btnStageCloseCorner.addEventListener('click', closeStageSelect);
  if (stageScreen) {
    stageScreen.addEventListener('click', (e) => {
      if (e.target === stageScreen) closeStageSelect();
    });
  }

  if (stageCard1) {
    stageCard1.addEventListener('click', () => {
      setStage(1);
      sounds.playCollect();
    });
  }
  if (stageCard2) {
    stageCard2.addEventListener('click', () => {
      setStage(2);
      sounds.playCollect();
    });
  }
  if (stageCard3) {
    stageCard3.addEventListener('click', () => {
      setStage(3);
      sounds.playCollect();
    });
  }
  if (btnStagePlay) {
    btnStagePlay.addEventListener('click', chooseAndPlayStage);
  }

  if (btnClearNextStage) {
    btnClearNextStage.addEventListener('click', () => {
      if (currentStage === 1) {
        setStage(2);
      } else if (currentStage === 2) {
        setStage(3);
      } else {
        setStage(1);
      }
      sounds.init();
      sounds.playJump();
      startGame();
    });
  }
}

function initApp() {
  currentStage = loadCurrentStage();
  updateStageUI();
  const savedColor = loadCandyColor();
  updateCharPreview(savedColor);
  updateCandyUI(savedColor);
  updateSweetsUI();
  updateNightModeUI();
  renderPetShop();
  setupModalEvents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


// ==========================================
// 3. ゲーム本体（キャンバス・物理・ステージ）
// ==========================================
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// 仮想解像度（16:9）
const V_WIDTH = 800;
const V_HEIGHT = 450;
canvas.width = V_WIDTH;
canvas.height = V_HEIGHT;

// ゲーム状態
let gameState = 'START'; // 'START' | 'PLAYING' | 'CLEAR' | 'FAIL'
let score = 0;
let gameTime = 0;
let timerInterval = null;

// バナー通知（チェックポイント到達表示）
let bannerText = '';
let bannerTimer = 0;
function showBanner(text) {
  bannerText = text;
  bannerTimer = 90; // 約1.5秒表示
}

// カメラ
const camera = {
  x: 0,
  y: 950
};

// プレイヤー
const player = {
  x: 80,
  y: 2180,
  width: 46,
  height: 54,
  vx: 0,
  vy: 0,
  speed: 4.8,
  jumpPower: -12.8, // ジャンプ力を強化（高くふわっと跳べる）
  isGrounded: false,
  facingRight: true,
  walkFrame: 0,
  safeX: 80,
  safeY: 2180,
  candyColor: loadCandyColor(), // 保存されたキャンディ色をロード
  currentTier: 1,    // 1: 赤, 2: 黄, 3: 黒, 4: 白, 5: レインボー
  checkpointTier: 1, // 到達した最新のチェックポイント（旗）
  canDoubleJump: true,
  hasDoubleJumped: false,
  isParachuting: false,
  jumpHeldLastFrame: false,
  blinkTimer: 0,
  isBlinking: false,
  hp: 3,
  maxHp: 3,
  invincibleTimer: 0,
  trailTimer: 0
};

// ペット（女の子についてくるおともだち）
const pet = {
  x: 40,
  y: 2180,
  vx: 0,
  vy: 0,
  facingRight: true,
  walkFrame: 0,
  floatTimer: 0,
  isGrounded: true
};

// 入力状態
const keys = {
  left: false,
  right: false,
  jump: false
};

// 4色のチェックポイント（落下時の復帰場所＆キャンディの色）
let checkpoints = {
  1: { x: 80, y: 2196, color: 'red', name: 'あかステージ' },
  2: { x: 1422, y: 1736, color: 'yellow', name: 'きいろステージ' },
  3: { x: 2387, y: 1266, color: 'black', name: 'くろステージ' },
  4: { x: 3517, y: 806, color: 'white', name: 'しろステージ' }
};

// ステージ管理
const STAGE_KEY = 'sweets_athletic_current_stage';
let currentStage = 1;

function loadCurrentStage() {
  try {
    const s = parseInt(localStorage.getItem(STAGE_KEY), 10);
    return (s === 2 || s === 3) ? s : 1;
  } catch (e) {
    return 1;
  }
}

function setStage(stageNum) {
  currentStage = (stageNum === 3) ? 3 : (stageNum === 2 ? 2 : 1);
  try {
    localStorage.setItem(STAGE_KEY, currentStage);
  } catch (e) {}
  updateStageUI();
}

function updateStageUI() {
  const titleEl = document.getElementById('start-stage-title');
  if (titleEl) {
    if (currentStage === 3) {
      titleEl.textContent = '🌌 ステージ3：ほしぞらギャラクシー';
    } else if (currentStage === 2) {
      titleEl.textContent = '🍦 ステージ2：ひんやりフルーツパフェ';
    } else {
      titleEl.textContent = '🍰 ステージ1：スイーツマウンテン';
    }
  }
  const card1 = document.getElementById('stage-card-1');
  const card2 = document.getElementById('stage-card-2');
  const card3 = document.getElementById('stage-card-3');
  if (card1 && card2) {
    card1.classList.toggle('active', currentStage === 1);
    card2.classList.toggle('active', currentStage === 2);
    if (card3) card3.classList.toggle('active', currentStage === 3);
  }
}

// キャンディ表示更新
function updateCandyUI(color) {
  const dot = document.getElementById('candy-dot');
  const name = document.getElementById('candy-name');
  if (!dot || !name) return;

  const names = {
    red: 'あか',
    yellow: 'きいろ',
    black: 'くろ',
    white: 'しろ',
    rainbow: 'にじいろ'
  };

  const dots = {
    red: '🔴',
    yellow: '🟡',
    black: '⚫',
    white: '⚪',
    rainbow: '🌈'
  };

  dot.textContent = dots[color] || '🔴';
  name.textContent = names[color] || 'あか';

  if (color === 'rainbow') {
    name.classList.add('rainbow-text');
  } else {
    name.classList.remove('rainbow-text');
  }
}

// 💖 ハート（たいりょく）表示の更新
function updateHeartsUI() {
  const heartsEl = document.getElementById('hearts-display');
  if (!heartsEl) return;
  const current = Math.max(0, Math.min(player.maxHp, player.hp));
  const empty = Math.max(0, player.maxHp - current);
  heartsEl.textContent = '💖'.repeat(current) + '🖤'.repeat(empty);
}

// ステージデータ（お菓子の世界：4つのカラーエリア）
let platforms = [];
let items = [];
let goal = { x: 4850, y: 220, width: 160, height: 140 };
let particles = [];
let updrafts = [];
let donuts = [];
let spikes = [];
let stageWidth = 5200;
let stageHeight = 2400;

// ==========================================
// ステージ1：🍰 スイーツマウンテン（お菓子の国）
// ==========================================
function initStage1() {
  stageWidth = 5200;
  stageHeight = 2400;

  checkpoints = {
    1: { x: 80, y: 2196, color: 'red', name: 'あかステージ' },
    2: { x: 1422, y: 1736, color: 'yellow', name: 'きいろステージ' },
    3: { x: 2387, y: 1266, color: 'black', name: 'くろステージ' },
    4: { x: 3517, y: 806, color: 'white', name: 'しろステージ' }
  };

  platforms = [
    // ========================================================
    // エリア1: あか色ステージ 🍓（地上 y: 2250〜1850）
    // ========================================================
    { x: 0, y: 2250, width: 440, height: 180, type: 'cookie', tier: 1, colorTier: 'red' },
    // 🍮 プリンのトランポリン（ボヨヨン大ジャンプ！）
    { x: 330, y: 2220, width: 75, height: 30, type: 'pudding', tier: 1, colorTier: 'red' },
    { x: 490, y: 2180, width: 130, height: 32, type: 'wafer', tier: 1, colorTier: 'red' },
    { x: 680, y: 2100, width: 140, height: 32, type: 'wafer', tier: 1, colorTier: 'red' },
    // ☁️ わたあめのふかふかスーパージャンプ！
    { x: 740, y: 2190, width: 85, height: 32, type: 'cotton_candy', tier: 1, colorTier: 'red', squash: 0 },
    { x: 880, y: 2020, width: 110, height: 30, type: 'macaron', tier: 1, color: '#ff2a6d', vy: 0.8, minY: 1980, maxY: 2060, colorTier: 'red' },
    { x: 1060, y: 1950, width: 130, height: 36, type: 'cookie', tier: 1, colorTier: 'red' },
    // 赤から黄色へ届くステップ！
    { x: 1230, y: 1870, width: 100, height: 28, type: 'wafer', tier: 1, colorTier: 'red' },

    // ========================================================
    // エリア2: きいろステージ 🍋（y: 1850〜1400）
    // ========================================================
    // きいろチェックポイント広場（コンパクト）
    { x: 1380, y: 1790, width: 130, height: 38, type: 'cookie', tier: 2, colorTier: 'yellow', isCheckPoint: true },
    { x: 1560, y: 1710, width: 95, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },
    // 🍮 プリンのトランポリン
    { x: 1640, y: 1760, width: 75, height: 28, type: 'pudding', tier: 2, colorTier: 'yellow' },
    { x: 1710, y: 1630, width: 85, height: 24, type: 'macaron', tier: 2, color: '#ffdd00', vy: -0.8, minY: 1590, maxY: 1670, colorTier: 'yellow' },
    // 🍦 つるつるアイスクリーム床（きいろエリア）
    { x: 1850, y: 1550, width: 95, height: 26, type: 'ice_cream', tier: 2, colorTier: 'yellow' },
    // 🍫 とけるチョコの足場（きいろエリア）
    { x: 1950, y: 1510, width: 90, height: 28, type: 'melting_choco', tier: 2, colorTier: 'yellow', initialY: 1510, meltTimer: 0, isMelted: false, respawnTimer: 0, isStepped: false, shake: 0 },
    { x: 2050, y: 1470, width: 110, height: 36, type: 'cookie', tier: 2, colorTier: 'yellow' },
    // 黄色から黒へ届くステップ
    { x: 2180, y: 1395, width: 95, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },

    // ========================================================
    // エリア3: くろ色ステージ 🍫（y: 1400〜950）
    // ========================================================
    // くろチェックポイント広場
    { x: 2310, y: 1320, width: 200, height: 48, type: 'cookie', tier: 3, colorTier: 'black', isCheckPoint: true },
    { x: 2580, y: 1240, width: 130, height: 32, type: 'wafer', tier: 3, colorTier: 'black' },
    // 🍮 プリンのトランポリン
    { x: 2690, y: 1280, width: 75, height: 28, type: 'pudding', tier: 3, colorTier: 'black' },
    { x: 2770, y: 1160, width: 120, height: 30, type: 'macaron', tier: 3, color: '#2b1b17', vy: 0.9, minY: 1110, maxY: 1210, colorTier: 'black' },
    // 🍫 とけるチョコの足場（くろエリア）
    { x: 2880, y: 1120, width: 95, height: 28, type: 'melting_choco', tier: 3, colorTier: 'black', initialY: 1120, meltTimer: 0, isMelted: false, respawnTimer: 0, isStepped: false, shake: 0 },
    { x: 2990, y: 1080, width: 140, height: 32, type: 'wafer', tier: 3, colorTier: 'black' },
    { x: 3160, y: 1010, width: 160, height: 45, type: 'cookie', tier: 3, colorTier: 'black' },
    // 黒から白へ届く中継ステップ
    { x: 3340, y: 935, width: 110, height: 28, type: 'wafer', tier: 3, colorTier: 'black' },

    // ========================================================
    // エリア4: しろ色ステージ ☁️（y: 950〜450）
    // ========================================================
    // しろチェックポイント広場
    { x: 3480, y: 860, width: 200, height: 50, type: 'cookie', tier: 4, colorTier: 'white', isCheckPoint: true },
    { x: 3720, y: 780, width: 130, height: 32, type: 'wafer', tier: 4, colorTier: 'white' },
    { x: 3890, y: 700, width: 120, height: 30, type: 'macaron', tier: 4, color: '#ffffff', vy: -0.8, minY: 650, maxY: 750, colorTier: 'white' },
    // 🍮 プリンのトランポリン
    { x: 4000, y: 740, width: 75, height: 28, type: 'pudding', tier: 4, colorTier: 'white' },
    { x: 4080, y: 620, width: 140, height: 32, type: 'wafer', tier: 4, colorTier: 'white' },
    // ☁️ わたあめのふかふかスーパージャンプ！
    { x: 4180, y: 585, width: 85, height: 30, type: 'cotton_candy', tier: 4, colorTier: 'white', squash: 0 },
    // 🍦 つるつるアイスクリーム床
    { x: 4280, y: 550, width: 160, height: 35, type: 'ice_cream', tier: 4, colorTier: 'white' },

    // 天空への架け橋（虹のブリッジ）
    { x: 4500, y: 460, width: 150, height: 32, type: 'wafer', tier: 4, colorTier: 'rainbow' },

    // ========================================================
    // エリア5: 天空のレインボーケーキ城 🏰🌈（y: 350）
    // ========================================================
    { x: 4720, y: 360, width: 500, height: 180, type: 'cake_ground', tier: 5, colorTier: 'rainbow' }
  ];

  // 🍭 ふわふわキャンディの風（上昇気流）
  updrafts = [
    { x: 1130, y: 1780, width: 85, height: 260 },
    { x: 3260, y: 850, width: 85, height: 260 }
  ];

  // 🌵 とげとげ障害物（金平糖トゲ ＆ チョコツノ）
  spikes = [
    // 赤エリア：クッキーの間の地面にトゲ
    { x: 620, y: 2235, width: 50, height: 18, type: 'konpeito', color: '#ff66aa' },
    { x: 990, y: 2235, width: 60, height: 18, type: 'konpeito', color: '#ff88bb' },
    // 黄エリア：足場間のトゲ
    { x: 1780, y: 1770, width: 45, height: 18, type: 'konpeito', color: '#ffbb00' },
    // 黒エリア：ビターチョコツノ
    { x: 2630, y: 1335, width: 50, height: 20, type: 'choco_spike', color: '#331a0e' },
    { x: 2930, y: 1220, width: 45, height: 20, type: 'choco_spike', color: '#331a0e' },
    // 白エリア：クリスタル金平糖トゲ
    { x: 3840, y: 840, width: 45, height: 18, type: 'konpeito', color: '#aaddff' }
  ];

  // 🍩 ころがるトッピングドーナツ
  donuts = [
    { x: 220, y: 2232, radius: 18, vx: 1.5, minX: 80, maxX: 420, rotation: 0, dough: '#f6be79', frosting: '#ff6088', sprinkles: true, squash: 0 },
    { x: 2420, y: 1302, radius: 18, vx: -1.7, minX: 2330, maxX: 2490, rotation: 0, dough: '#4a2818', frosting: '#ffffff', sprinkles: true, squash: 0 },
    { x: 3580, y: 842, radius: 18, vx: 1.9, minX: 3500, maxX: 3660, rotation: 0, dough: '#f6e4cc', frosting: '#ff80bb', sprinkles: true, squash: 0 }
  ];

  // あつめるスイーツアイテム（各エリアにたっぷり配置）
  items = [
    // 赤エリア
    { x: 220, y: 2200, type: '🍓', collected: false, floatOffset: 0 },
    { x: 370, y: 2200, type: '🍒', collected: false, floatOffset: 1 },
    { x: 550, y: 2130, type: '⭐', collected: false, floatOffset: 2 },
    { x: 640, y: 2040, type: '💖', collected: false, floatOffset: 1 }, // 回復ハート
    { x: 740, y: 2050, type: '🍓', collected: false, floatOffset: 3 },
    { x: 780, y: 1950, type: '⭐', collected: false, floatOffset: 2 }, // わたあめ大ジャンプ上空スター
    { x: 930, y: 1970, type: '🍭', collected: false, floatOffset: 4 },

    // 黄エリア
    { x: 1430, y: 1730, type: '🍋', collected: false, floatOffset: 0 },
    { x: 1600, y: 1650, type: '🍌', collected: false, floatOffset: 1 },
    { x: 1740, y: 1570, type: '⭐', collected: false, floatOffset: 2 },
    { x: 1830, y: 1510, type: '💖', collected: false, floatOffset: 2 }, // 回復ハート
    { x: 1890, y: 1490, type: '🍯', collected: false, floatOffset: 3 },
    { x: 2045, y: 1410, type: '💛', collected: false, floatOffset: 4 },

    // 黒エリア
    { x: 2440, y: 1270, type: '🍫', collected: false, floatOffset: 0 },
    { x: 2670, y: 1190, type: '🍪', collected: false, floatOffset: 1 },
    { x: 2840, y: 1070, type: '💖', collected: false, floatOffset: 3 }, // 回復ハート
    { x: 2850, y: 1110, type: '⭐', collected: false, floatOffset: 2 },
    { x: 3050, y: 1030, type: '☕', collected: false, floatOffset: 3 },
    { x: 3260, y: 960, type: '🖤', collected: false, floatOffset: 4 },

    // 白エリア
    { x: 3560, y: 810, type: '☁️', collected: false, floatOffset: 0 },
    { x: 3760, y: 730, type: '🧁', collected: false, floatOffset: 1 },
    { x: 3940, y: 650, type: '⭐', collected: false, floatOffset: 2 },
    { x: 3950, y: 660, type: '💖', collected: false, floatOffset: 0 }, // 回復ハート
    { x: 4140, y: 570, type: '🍦', collected: false, floatOffset: 3 },
    { x: 4220, y: 380, type: '⭐', collected: false, floatOffset: 1 }, // わたあめ大ジャンプ上空スター
    { x: 4340, y: 500, type: '🤍', collected: false, floatOffset: 4 },

    // レインボー城
    { x: 4560, y: 410, type: '🌈', collected: false, floatOffset: 1 },
    { x: 4790, y: 310, type: '⭐', collected: false, floatOffset: 2 },
    { x: 4900, y: 310, type: '🎂', collected: false, floatOffset: 3 },
    { x: 5010, y: 310, type: '💖', collected: false, floatOffset: 4 }
  ];

  // ゴール位置（特大レインボーケーキ城）
  goal = {
    x: 4850,
    y: 220,
    width: 160,
    height: 140
  };

  particles = [];
}

// ==========================================
// ステージ2：🍦 ひんやりフルーツパフェ
// ==========================================
function initStage2() {
  stageWidth = 5200;
  stageHeight = 2400;

  checkpoints = {
    1: { x: 80, y: 2196, color: 'red', name: '🍨 ミントアイスの丘' },
    2: { x: 1380, y: 1736, color: 'yellow', name: '🍓 フローズンベリー' },
    3: { x: 2330, y: 1266, color: 'black', name: '🍫 チョコミント洞窟' },
    4: { x: 3420, y: 806, color: 'white', name: '🍒 天空フルーツパフェ' }
  };

  platforms = [
    // ========================================================
    // エリア1: 🍨 ミント＆バニラアイスの丘（地上 y: 2250〜1850）
    // ========================================================
    // スタート地点：つるつる滑るアイス床！
    { x: 0, y: 2250, width: 440, height: 180, type: 'ice_cream', tier: 1, colorTier: 'white' },
    // 🍮 プリンのトランポリン
    { x: 330, y: 2220, width: 75, height: 30, type: 'pudding', tier: 1, colorTier: 'white' },
    // キャンディケイン風ウエハース
    { x: 480, y: 2180, width: 120, height: 32, type: 'wafer', tier: 1, colorTier: 'red' },
    // ☁️ わたあめのふかふかスーパージャンプ！
    { x: 670, y: 2110, width: 85, height: 32, type: 'cotton_candy', tier: 1, colorTier: 'white', squash: 0 },
    // ミントマカロン（動く足場）
    { x: 860, y: 2020, width: 110, height: 30, type: 'macaron', tier: 1, color: '#66ffcc', vy: 0.8, minY: 1980, maxY: 2060, colorTier: 'white' },
    // つるつるアイス床
    { x: 1040, y: 1950, width: 140, height: 36, type: 'ice_cream', tier: 1, colorTier: 'white' },
    { x: 1230, y: 1870, width: 100, height: 28, type: 'wafer', tier: 1, colorTier: 'red' },

    // ========================================================
    // エリア2: 🍓 フローズンベリー＆かき氷の山（y: 1850〜1400）
    // ========================================================
    // チェックポイント
    { x: 1380, y: 1790, width: 140, height: 38, type: 'cookie', tier: 2, colorTier: 'yellow', isCheckPoint: true },
    { x: 1560, y: 1720, width: 95, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },
    // ☁️ わたあめ大ジャンプ
    { x: 1680, y: 1670, width: 80, height: 30, type: 'cotton_candy', tier: 2, colorTier: 'yellow', squash: 0 },
    // マカロン
    { x: 1800, y: 1560, width: 100, height: 28, type: 'macaron', tier: 2, color: '#ffbb33', vy: -0.9, minY: 1510, maxY: 1610, colorTier: 'yellow' },
    // つるつるアイス床
    { x: 1950, y: 1500, width: 110, height: 28, type: 'ice_cream', tier: 2, colorTier: 'yellow' },
    // 🍫 とけるチョコアイスの足場
    { x: 2100, y: 1450, width: 95, height: 28, type: 'melting_choco', tier: 2, colorTier: 'yellow', initialY: 1450, meltTimer: 0, isMelted: false, respawnTimer: 0, isStepped: false, shake: 0 },
    { x: 2220, y: 1390, width: 90, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },

    // ========================================================
    // エリア3: 🍫 チョコミント＆アイス洞窟（y: 1400〜950）
    // ========================================================
    { x: 2330, y: 1320, width: 200, height: 48, type: 'cookie', tier: 3, colorTier: 'black', isCheckPoint: true },
    // 🍮 プリンのトランポリン
    { x: 2570, y: 1290, width: 75, height: 28, type: 'pudding', tier: 3, colorTier: 'black' },
    // チョコミントマカロン
    { x: 2680, y: 1180, width: 110, height: 30, type: 'macaron', tier: 3, color: '#33cc99', vy: 1.0, minY: 1120, maxY: 1240, colorTier: 'black' },
    // つるつるアイス床
    { x: 2830, y: 1130, width: 100, height: 28, type: 'ice_cream', tier: 3, colorTier: 'black' },
    // 🍫 とけるチョコ足場
    { x: 2970, y: 1090, width: 95, height: 28, type: 'melting_choco', tier: 3, colorTier: 'black', initialY: 1090, meltTimer: 0, isMelted: false, respawnTimer: 0, isStepped: false, shake: 0 },
    // ☁️ わたあめ大ジャンプ
    { x: 3120, y: 1030, width: 85, height: 30, type: 'cotton_candy', tier: 3, colorTier: 'black', squash: 0 },
    { x: 3260, y: 940, width: 110, height: 28, type: 'wafer', tier: 3, colorTier: 'black' },

    // ========================================================
    // エリア4: 🍒 天空のフルーツパラダイス（y: 950〜450）
    // ========================================================
    { x: 3420, y: 860, width: 200, height: 50, type: 'cookie', tier: 4, colorTier: 'white', isCheckPoint: true },
    // つるつるアイス床
    { x: 3660, y: 790, width: 120, height: 30, type: 'ice_cream', tier: 4, colorTier: 'white' },
    // フルーツマカロン
    { x: 3820, y: 710, width: 110, height: 30, type: 'macaron', tier: 4, color: '#ff66aa', vy: -0.9, minY: 660, maxY: 760, colorTier: 'white' },
    // 🍮 プリンのトランポリン
    { x: 3960, y: 740, width: 75, height: 28, type: 'pudding', tier: 4, colorTier: 'white' },
    // ☁️ わたあめ大ジャンプ
    { x: 4070, y: 620, width: 85, height: 30, type: 'cotton_candy', tier: 4, colorTier: 'white', squash: 0 },
    // つるつるアイスブリッジ
    { x: 4200, y: 550, width: 140, height: 32, type: 'ice_cream', tier: 4, colorTier: 'white' },
    // レインボーフルーツブリッジ
    { x: 4420, y: 460, width: 180, height: 32, type: 'wafer', tier: 4, colorTier: 'rainbow' },

    // ========================================================
    // エリア5: 🍨 特大デラックスパフェタワー台座（y: 350）
    // ========================================================
    { x: 4680, y: 360, width: 520, height: 180, type: 'cake_ground', tier: 5, colorTier: 'rainbow' }
  ];

  updrafts = [
    { x: 1130, y: 1780, width: 85, height: 260 },
    { x: 3260, y: 850, width: 85, height: 260 }
  ];

  // 🌵 ペパーミントの氷トゲ＆チョコツノ
  spikes = [
    { x: 580, y: 2235, width: 50, height: 18, type: 'konpeito', color: '#66ffcc' },
    { x: 970, y: 2235, width: 50, height: 18, type: 'konpeito', color: '#99ffff' },
    { x: 1720, y: 1770, width: 45, height: 18, type: 'konpeito', color: '#ff66aa' },
    { x: 2610, y: 1335, width: 50, height: 20, type: 'choco_spike', color: '#225544' },
    { x: 2900, y: 1220, width: 45, height: 20, type: 'choco_spike', color: '#225544' },
    { x: 3760, y: 840, width: 45, height: 18, type: 'konpeito', color: '#66ccff' }
  ];

  // 🍩 チョコミント＆ストロベリーアイスドーナツ
  donuts = [
    { x: 220, y: 2232, radius: 18, vx: 1.6, minX: 80, maxX: 420, rotation: 0, dough: '#4a2818', frosting: '#66ffcc', sprinkles: true, squash: 0 },
    { x: 2420, y: 1302, radius: 18, vx: -1.8, minX: 2340, maxX: 2500, rotation: 0, dough: '#f6e4cc', frosting: '#33ccff', sprinkles: true, squash: 0 },
    { x: 3520, y: 842, radius: 18, vx: 2.0, minX: 3440, maxX: 3600, rotation: 0, dough: '#4a2818', frosting: '#ff66aa', sprinkles: true, squash: 0 }
  ];

  // アイテム（フルーツ＆アイス＆回復ハート）
  items = [
    // 赤エリア
    { x: 220, y: 2200, type: '🍒', collected: false, floatOffset: 0 },
    { x: 370, y: 2200, type: '🍨', collected: false, floatOffset: 1 },
    { x: 550, y: 2130, type: '❄️', collected: false, floatOffset: 2 },
    { x: 630, y: 2040, type: '💖', collected: false, floatOffset: 1 }, // 回復ハート
    { x: 710, y: 1970, type: '⭐', collected: false, floatOffset: 3 },
    { x: 890, y: 1960, type: '🍓', collected: false, floatOffset: 2 },
    { x: 1080, y: 1900, type: '🍒', collected: false, floatOffset: 4 },

    // 黄エリア
    { x: 1430, y: 1730, type: '🍌', collected: false, floatOffset: 0 },
    { x: 1600, y: 1650, type: '🍊', collected: false, floatOffset: 1 },
    { x: 1730, y: 1530, type: '⭐', collected: false, floatOffset: 2 },
    { x: 1830, y: 1490, type: '💖', collected: false, floatOffset: 2 }, // 回復ハート
    { x: 2000, y: 1440, type: '🍨', collected: false, floatOffset: 3 },
    { x: 2140, y: 1390, type: '❄️', collected: false, floatOffset: 4 },

    // 黒エリア
    { x: 2440, y: 1270, type: '🍫', collected: false, floatOffset: 0 },
    { x: 2600, y: 1190, type: '🍨', collected: false, floatOffset: 1 },
    { x: 2750, y: 1110, type: '💖', collected: false, floatOffset: 3 }, // 回復ハート
    { x: 2900, y: 1070, type: '⭐', collected: false, floatOffset: 2 },
    { x: 3150, y: 920, type: '⭐', collected: false, floatOffset: 3 },
    { x: 3300, y: 880, type: '🍒', collected: false, floatOffset: 4 },

    // 白エリア
    { x: 3500, y: 810, type: '🍨', collected: false, floatOffset: 0 },
    { x: 3720, y: 730, type: '🍓', collected: false, floatOffset: 1 },
    { x: 3900, y: 650, type: '💖', collected: false, floatOffset: 0 }, // 回復ハート
    { x: 4110, y: 490, type: '⭐', collected: false, floatOffset: 2 },
    { x: 4260, y: 490, type: '🍒', collected: false, floatOffset: 3 },
    { x: 4480, y: 400, type: '🌈', collected: false, floatOffset: 4 },

    // パフェタワー
    { x: 4740, y: 310, type: '🍨', collected: false, floatOffset: 1 },
    { x: 4850, y: 300, type: '🍒', collected: false, floatOffset: 2 },
    { x: 4960, y: 310, type: '💖', collected: false, floatOffset: 3 }
  ];

  goal = {
    x: 4800,
    y: 210,
    width: 180,
    height: 150
  };

  particles = [];
}

// ==========================================
// ステージ3：🌌 ほしぞらギャラクシースイーツ
// ==========================================
function initStage3() {
  stageWidth = 5400;
  stageHeight = 2400;

  checkpoints = {
    1: { x: 80, y: 2196, color: 'red', name: '🌠 ミルキーウェイ' },
    2: { x: 1400, y: 1736, color: 'yellow', name: '🪐 プラネットドーナツ' },
    3: { x: 2360, y: 1266, color: 'black', name: '☁️ ネビュラわたあめ' },
    4: { x: 3460, y: 806, color: 'white', name: '✨ スターライトブリッジ' }
  };

  platforms = [
    // ========================================================
    // エリア1: 🌠 ミルキーウェイ＆お砂糖の星屑（地上 y: 2250〜1850）
    // ========================================================
    { x: 0, y: 2250, width: 440, height: 180, type: 'cookie', tier: 1, colorTier: 'red' },
    // 🍮 プリンのトランポリン
    { x: 340, y: 2220, width: 75, height: 30, type: 'pudding', tier: 1, colorTier: 'red' },
    // ウエハースステップ
    { x: 490, y: 2160, width: 110, height: 30, type: 'wafer', tier: 1, colorTier: 'red' },
    // ☁️ ネビュラわたあめのスーパージャンプ！
    { x: 680, y: 2090, width: 85, height: 30, type: 'cotton_candy', tier: 1, colorTier: 'red', squash: 0 },
    // 宇宙マカロン（動く足場・パープル）
    { x: 870, y: 2000, width: 110, height: 30, type: 'macaron', tier: 1, color: '#aa77ff', vy: 0.85, minY: 1950, maxY: 2050, colorTier: 'red' },
    // つるつるアイス星屑床
    { x: 1060, y: 1930, width: 130, height: 32, type: 'ice_cream', tier: 1, colorTier: 'red' },
    { x: 1250, y: 1860, width: 95, height: 28, type: 'wafer', tier: 1, colorTier: 'red' },

    // ========================================================
    // エリア2: 🪐 プラネットドーナツ＆星空ステップ（y: 1850〜1400）
    // ========================================================
    { x: 1400, y: 1790, width: 150, height: 40, type: 'cookie', tier: 2, colorTier: 'yellow', isCheckPoint: true },
    { x: 1590, y: 1710, width: 90, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },
    // ☁️ わたあめ大ジャンプ
    { x: 1720, y: 1650, width: 85, height: 30, type: 'cotton_candy', tier: 2, colorTier: 'yellow', squash: 0 },
    // ゴールデンマカロン（動く足場）
    { x: 1840, y: 1540, width: 100, height: 28, type: 'macaron', tier: 2, color: '#ffdd44', vy: -0.95, minY: 1480, maxY: 1590, colorTier: 'yellow' },
    // 🍫 とけるチョコ足場
    { x: 2000, y: 1480, width: 95, height: 28, type: 'melting_choco', tier: 2, colorTier: 'yellow', initialY: 1480, meltTimer: 0, isMelted: false, respawnTimer: 0, isStepped: false, shake: 0 },
    // つるつるアイス床
    { x: 2150, y: 1420, width: 110, height: 30, type: 'ice_cream', tier: 2, colorTier: 'yellow' },
    { x: 2270, y: 1360, width: 90, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },

    // ========================================================
    // エリア3: ☁️ ネビュラわたあめ＆コズミックマカロン（y: 1400〜950）
    // ========================================================
    { x: 2360, y: 1320, width: 200, height: 48, type: 'cookie', tier: 3, colorTier: 'black', isCheckPoint: true },
    // 🍮 プリンのトランポリン
    { x: 2600, y: 1290, width: 75, height: 28, type: 'pudding', tier: 3, colorTier: 'black' },
    // ディープネビュラマカロン（動く足場）
    { x: 2720, y: 1170, width: 110, height: 30, type: 'macaron', tier: 3, color: '#8855ff', vy: 1.05, minY: 1110, maxY: 1230, colorTier: 'black' },
    // 🍫 とけるチョコ足場
    { x: 2880, y: 1120, width: 95, height: 28, type: 'melting_choco', tier: 3, colorTier: 'black', initialY: 1120, meltTimer: 0, isMelted: false, respawnTimer: 0, isStepped: false, shake: 0 },
    // ☁️ わたあめ大ジャンプ
    { x: 3030, y: 1060, width: 85, height: 30, type: 'cotton_candy', tier: 3, colorTier: 'black', squash: 0 },
    // つるつるアイス床
    { x: 3180, y: 990, width: 110, height: 30, type: 'ice_cream', tier: 3, colorTier: 'black' },
    { x: 3320, y: 920, width: 95, height: 26, type: 'wafer', tier: 3, colorTier: 'black' },

    // ========================================================
    // エリア4: ✨ スターライトクリスタルブリッジ（y: 950〜450）
    // ========================================================
    { x: 3460, y: 860, width: 200, height: 50, type: 'cookie', tier: 4, colorTier: 'white', isCheckPoint: true },
    // つるつるアイス床
    { x: 3700, y: 790, width: 120, height: 30, type: 'ice_cream', tier: 4, colorTier: 'white' },
    // シアンコズミックマカロン
    { x: 3860, y: 700, width: 110, height: 30, type: 'macaron', tier: 4, color: '#00e5ff', vy: -1.0, minY: 640, maxY: 750, colorTier: 'white' },
    // 🍮 プリンのトランポリン
    { x: 4010, y: 720, width: 75, height: 28, type: 'pudding', tier: 4, colorTier: 'white' },
    // ☁️ わたあめ大ジャンプ
    { x: 4130, y: 610, width: 85, height: 30, type: 'cotton_candy', tier: 4, colorTier: 'white', squash: 0 },
    // クリスタルレインボーアイスブリッジ
    { x: 4270, y: 530, width: 150, height: 32, type: 'ice_cream', tier: 4, colorTier: 'rainbow' },
    // レインボーウエハースブリッジ
    { x: 4490, y: 450, width: 180, height: 32, type: 'wafer', tier: 4, colorTier: 'rainbow' },

    // ========================================================
    // エリア5: 👑 特大コズミックスターケーキ城の台座（y: 350）
    // ========================================================
    { x: 4740, y: 360, width: 540, height: 180, type: 'cake_ground', tier: 5, colorTier: 'rainbow' }
  ];

  updrafts = [
    { x: 1190, y: 1780, width: 85, height: 260 },
    { x: 3310, y: 840, width: 85, height: 260 }
  ];

  spikes = [
    { x: 590, y: 2235, width: 50, height: 18, type: 'konpeito', color: '#ff77ff' },
    { x: 990, y: 2235, width: 50, height: 18, type: 'konpeito', color: '#66eeff' },
    { x: 1750, y: 1770, width: 45, height: 18, type: 'konpeito', color: '#ffe066' },
    { x: 2650, y: 1335, width: 50, height: 20, type: 'choco_spike', color: '#331144' },
    { x: 2940, y: 1210, width: 45, height: 20, type: 'choco_spike', color: '#331144' },
    { x: 3810, y: 840, width: 45, height: 18, type: 'konpeito', color: '#9977ff' }
  ];

  // 🪐 宇宙のプラネットドーナツ！
  donuts = [
    { x: 220, y: 2232, radius: 18, vx: 1.7, minX: 80, maxX: 420, rotation: 0, dough: '#1f1a3a', frosting: '#ff55bb', sprinkles: true, squash: 0 },
    { x: 2450, y: 1302, radius: 18, vx: -1.8, minX: 2370, maxX: 2530, rotation: 0, dough: '#1a2244', frosting: '#00e5ff', sprinkles: true, squash: 0 },
    { x: 3560, y: 842, radius: 18, vx: 2.1, minX: 3480, maxX: 3640, rotation: 0, dough: '#2e143b', frosting: '#ffe066', sprinkles: true, squash: 0 }
  ];

  // 宇宙スイーツアイテム
  items = [
    // 赤エリア
    { x: 220, y: 2200, type: '🌟', collected: false, floatOffset: 0 },
    { x: 380, y: 2200, type: '🪐', collected: false, floatOffset: 1 },
    { x: 560, y: 2110, type: '🚀', collected: false, floatOffset: 2 },
    { x: 640, y: 2020, type: '💖', collected: false, floatOffset: 1 }, // 回復ハート
    { x: 720, y: 1950, type: '⭐', collected: false, floatOffset: 3 },
    { x: 910, y: 1940, type: '🍬', collected: false, floatOffset: 2 },
    { x: 1100, y: 1880, type: '🌟', collected: false, floatOffset: 4 },

    // 黄エリア
    { x: 1450, y: 1730, type: '🪐', collected: false, floatOffset: 0 },
    { x: 1620, y: 1640, type: '⭐', collected: false, floatOffset: 1 },
    { x: 1760, y: 1510, type: '🍬', collected: false, floatOffset: 2 },
    { x: 1860, y: 1470, type: '💖', collected: false, floatOffset: 2 }, // 回復ハート
    { x: 2030, y: 1420, type: '🌟', collected: false, floatOffset: 3 },
    { x: 2180, y: 1360, type: '🚀', collected: false, floatOffset: 4 },

    // 黒エリア
    { x: 2470, y: 1260, type: '🪐', collected: false, floatOffset: 0 },
    { x: 2630, y: 1170, type: '🍬', collected: false, floatOffset: 1 },
    { x: 2780, y: 1100, type: '💖', collected: false, floatOffset: 3 }, // 回復ハート
    { x: 2930, y: 1060, type: '⭐', collected: false, floatOffset: 2 },
    { x: 3180, y: 910, type: '🌟', collected: false, floatOffset: 3 },
    { x: 3330, y: 860, type: '🚀', collected: false, floatOffset: 4 },

    // 白エリア
    { x: 3530, y: 800, type: '🪐', collected: false, floatOffset: 0 },
    { x: 3750, y: 720, type: '⭐', collected: false, floatOffset: 1 },
    { x: 3930, y: 640, type: '💖', collected: false, floatOffset: 0 }, // 回復ハート
    { x: 4140, y: 480, type: '🌟', collected: false, floatOffset: 2 },
    { x: 4290, y: 470, type: '🍭', collected: false, floatOffset: 3 },
    { x: 4520, y: 390, type: '🌈', collected: false, floatOffset: 4 },

    // ゴールエリア
    { x: 4780, y: 300, type: '🌟', collected: false, floatOffset: 1 },
    { x: 4900, y: 290, type: '👑', collected: false, floatOffset: 2 },
    { x: 5020, y: 300, type: '💖', collected: false, floatOffset: 3 }
  ];

  goal = {
    x: 4860,
    y: 200,
    width: 200,
    height: 160
  };

  particles = [];
}

// ステージ初期化（指定されたステージまたはcurrentStageを読み込む）
function initStage(stageNum) {
  const s = stageNum || currentStage || 1;
  currentStage = s;
  if (s === 3) {
    initStage3();
  } else if (s === 2) {
    initStage2();
  } else {
    initStage1();
  }
}

// パーティクル生成（スイーツ取得やクリア紙吹雪）
function createParticles(x, y, type = 'star', count = 10) {
  const colors = ['#ff66aa', '#ffbb33', '#66ccff', '#ff99dd', '#ffff66', '#aaffaa'];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.7) * 9,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      type: type,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2
    });
  }
}

// ふわっと浮かぶコイン獲得文字（+1🍓、+2🍓など）
function createFloatingText(x, y, text) {
  particles.push({
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -2.0,
    size: 20,
    text: text,
    alpha: 1,
    type: 'text',
    rot: 0,
    vRot: 0
  });
}


// 💔 プレイヤーダメージ処理（ハート減少・ノックバック・スイーツこぼし）
function damagePlayer(amount = 1, knockbackDirX = 0) {
  if (gameState !== 'PLAYING' || player.invincibleTimer > 0) return;

  player.hp = Math.max(0, player.hp - amount);
  player.invincibleTimer = 90; // 約1.5秒（60fps）無敵時間
  player.vy = -6.8;
  player.vx = (knockbackDirX !== 0 ? knockbackDirX : (player.facingRight ? -1 : 1)) * 5.2;
  player.isGrounded = false;

  // スイーツこぼし（集めたスイーツがポロポロ落ちる！）
  const dropCount = Math.min(score, 3);
  if (dropCount > 0) {
    score -= dropCount;
    const scoreEl = document.getElementById('score-val');
    if (scoreEl) scoreEl.textContent = score;
    createFloatingText(player.x + player.width / 2, player.y - 10, `-${dropCount} 🍓`);
    for (let i = 0; i < dropCount * 3; i++) {
      particles.push({
        x: player.x + player.width / 2,
        y: player.y + player.height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 5 + 2),
        size: 8,
        color: '#ff2b75',
        alpha: 1,
        type: 'dust',
        rot: 0,
        vRot: 0.1
      });
    }
  }

  createFloatingText(player.x + player.width / 2, player.y - 32, `-${amount} 💔`);
  updateHeartsUI();

  const heartsBox = document.getElementById('hearts-box');
  if (heartsBox) {
    heartsBox.classList.remove('damaged');
    void heartsBox.offsetWidth;
    heartsBox.classList.add('damaged');
  }

  sounds.playDamage();

  // ハートが0になったら「どんまい！」画面
  if (player.hp <= 0) {
    triggerFailScreen();
  }
}

// しっぱい（ゲームオーバー）画面の表示
function triggerFailScreen() {
  gameState = 'FAIL';
  sounds.playFall();
  const failScreen = document.getElementById('fail-screen');
  if (failScreen) failScreen.classList.add('active');
  if (timerInterval) clearInterval(timerInterval);
}

// チェックポイントからの復活（もう１かい！）
function retryFromCheckpoint() {
  const failScreen = document.getElementById('fail-screen');
  if (failScreen) failScreen.classList.remove('active');

  player.hp = player.maxHp;
  updateHeartsUI();
  player.invincibleTimer = 60; // 復活後1秒無敵

  const currentCpTier = player.checkpointTier || player.currentTier || 1;
  const cp = checkpoints[currentCpTier] || checkpoints[1];
  player.x = cp.x;
  player.y = cp.y;
  player.safeX = cp.x;
  player.safeY = cp.y;
  player.vx = 0;
  player.vy = 0;
  player.isGrounded = true;
  player.canDoubleJump = true;
  player.isParachuting = false;

  pet.x = cp.x - 30;
  pet.y = cp.y + player.height - 30;
  pet.vx = 0;
  pet.vy = 0;

  camera.x = Math.max(0, Math.min(stageWidth - V_WIDTH, player.x - V_WIDTH * 0.35));
  camera.y = Math.max(0, Math.min(stageHeight - V_HEIGHT, player.y - V_HEIGHT * 0.55));

  sounds.init();
  sounds.startBgm();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (gameState === 'PLAYING') {
      gameTime++;
      document.getElementById('timer-val').textContent = gameTime;
    }
  }, 1000);

  gameState = 'PLAYING';
}

// ==========================================
// 4. ゲームの更新と描画
// ==========================================

function update() {
  if (gameState !== 'PLAYING') {
    updateParticles();
    return;
  }

  // 無敵タイマーのカウントダウン
  if (player.invincibleTimer > 0) {
    player.invincibleTimer--;
  }

  // 1. プレイヤーの移動（きいろ以上のキャンディでダッシュ！）
  const candyRank = CANDY_RANK[player.candyColor] || 1;
  let currentSpeed = player.speed;
  if (candyRank >= 2) {
    currentSpeed = 6.2; // きいろキャンディのスピードアップ！
  }

  // アイスクリーム床の上にいるか判定
  let onIce = false;
  if (player.isGrounded) {
    platforms.forEach(p => {
      if (p.type === 'ice_cream' &&
          player.x + player.width > p.x &&
          player.x < p.x + p.width &&
          Math.abs(player.y + player.height - p.y) < 8) {
        onIce = true;
      }
    });
  }

  if (keys.left) {
    player.vx = -currentSpeed;
    player.facingRight = false;
    player.walkFrame += 0.2;
  } else if (keys.right) {
    player.vx = currentSpeed;
    player.facingRight = true;
    player.walkFrame += 0.2;
  } else {
    // 摩擦で減速（アイス床ならスーッと滑る！）
    player.vx *= onIce ? 0.982 : 0.65;
    if (Math.abs(player.vx) < 0.15) player.vx = 0;
  }

  // ✨ キラキラのあしあとエフェクト（走ると足元からハートや星が舞う！）
  if (player.isGrounded && Math.abs(player.vx) > 1.0) {
    player.trailTimer = (player.trailTimer || 0) + 1;
    if (player.trailTimer % 4 === 0) {
      particles.push({
        x: player.x + (player.facingRight ? 6 : player.width - 6) + (Math.random() - 0.5) * 6,
        y: player.y + player.height - 2,
        vx: (player.facingRight ? -1 : 1) * (Math.random() * 0.8 + 0.3),
        vy: -(Math.random() * 1.5 + 0.4),
        size: Math.random() * 5 + 3,
        color: (player.trailTimer % 8 === 0) ? '#ff66aa' : (player.trailTimer % 12 === 0 ? '#ffcc00' : '#66ccff'),
        alpha: 0.85,
        type: (player.trailTimer % 8 === 0) ? 'heart' : 'sparkle',
        rot: 0,
        vRot: 0
      });
    }
  }

  // きいろキャンディの足元キラキラスパーク
  if (candyRank >= 2 && Math.abs(player.vx) > 1 && player.isGrounded && Math.random() < 0.35) {
    particles.push({
      x: player.x + (player.facingRight ? 4 : player.width - 4),
      y: player.y + player.height - 4,
      vx: (player.facingRight ? -1 : 1) * (Math.random() * 2 + 1),
      vy: -(Math.random() * 1.5),
      size: Math.random() * 5 + 3,
      color: player.candyColor === 'yellow' ? '#ffe600' : (player.candyColor === 'rainbow' ? '#ff66dd' : '#ffd700'),
      alpha: 0.85,
      type: 'sparkle',
      rot: 0,
      vRot: 0
    });
  }

  // 2. ジャンプ＆2段ジャンプ（レインボーキャンディ）
  const justPressedJump = keys.jump && !player.jumpHeldLastFrame;

  if (justPressedJump && player.isGrounded) {
    player.vy = player.jumpPower;
    player.isGrounded = false;
    sounds.playJump();
    createParticles(player.x + player.width / 2, player.y + player.height, 'dust', 4);
  } else if (justPressedJump && !player.isGrounded && player.canDoubleJump && candyRank >= 5) {
    // レインボーキャンディ：空中2段ジャンプ！
    player.vy = player.jumpPower * 0.92;
    player.canDoubleJump = false;
    sounds.playJump();
    createParticles(player.x + player.width / 2, player.y + player.height / 2, 'star', 16);
    showBanner('✨ 2だんジャンプ！ 🌈');
  }

  // しろキャンディ＆レインボー：ふわふわパラシュート（空中でジャンプ長押しでゆっくり降下）
  if (keys.jump && player.vy > 0 && !player.isGrounded && candyRank >= 4) {
    player.isParachuting = true;
    player.vy = Math.min(player.vy, 2.2); // 落下速度をゆっくり制限
    if (Math.random() < 0.25) {
      particles.push({
        x: player.x + player.width / 2 + (Math.random() - 0.5) * 20,
        y: player.y - 8,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5,
        size: Math.random() * 5 + 3,
        color: '#ffffff',
        alpha: 0.85,
        type: 'sparkle',
        rot: 0,
        vRot: 0
      });
    }
  } else {
    player.isParachuting = false;
  }

  // 重力
  player.vy += 0.52;
  if (player.vy > 12) player.vy = 12;

  // 動く足場（マカロン）の更新
  platforms.forEach(p => {
    if (p.type === 'macaron' && p.vy) {
      p.y += p.vy;
      if (p.y < p.minY || p.y > p.maxY) {
        p.vy *= -1;
      }
    }
  });

  // 🍫 とけるチョコの足場の更新
  platforms.forEach(p => {
    if (p.type === 'melting_choco') {
      if (p.isMelted) {
        p.respawnTimer--;
        if (p.respawnTimer <= 0) {
          p.isMelted = false;
          p.meltTimer = 0;
          p.y = p.initialY;
          p.shake = 0;
          createParticles(p.x + p.width / 2, p.y + p.height / 2, 'sparkle', 8);
        }
      } else if (p.isStepped) {
        p.meltTimer++;
        p.shake = Math.sin(p.meltTimer * 0.9) * 3.5;
        p.y = p.initialY + (p.meltTimer / 45) * 14;
        if (Math.random() < 0.3) {
          particles.push({
            x: p.x + Math.random() * p.width,
            y: p.y + p.height,
            vx: 0,
            vy: Math.random() * 2 + 1,
            size: 4,
            color: p.colorTier === 'black' ? '#331a0e' : (p.colorTier === 'white' ? '#f0e6dd' : '#7c3f1d'),
            alpha: 0.85,
            type: 'dust',
            rot: 0,
            vRot: 0
          });
        }
        if (p.meltTimer > 45) {
          p.isMelted = true;
          p.respawnTimer = 150; // 2.5秒で復活
          p.isStepped = false;
          p.shake = 0;
          createParticles(p.x + p.width / 2, p.y + p.height / 2, 'dust', 10);
        }
      } else {
        // 乗っていないときはゆっくり元の高さに戻る
        if (p.meltTimer > 0) {
          p.meltTimer = Math.max(0, p.meltTimer - 0.5);
          p.y = p.initialY + (p.meltTimer / 45) * 14;
          p.shake = 0;
        }
      }
      p.isStepped = false; // 足場チェックで再設定
    }
  });

  // 3. 水平方向の移動と衝突判定
  player.x += player.vx;
  if (player.x < 0) player.x = 0;

  // 4. 垂直方向の移動と足場接地判定
  player.y += player.vy;
  player.isGrounded = false;

  platforms.forEach(p => {
    // とけて消えているチョコ足場はすり抜ける
    if (p.type === 'melting_choco' && p.isMelted) {
      return;
    }

    // 上から足場に乗ったかどうかの判定（ワンウェイ足場）
    const prevY = player.y - player.vy;
    if (
      player.x + player.width > p.x + 8 &&
      player.x < p.x + p.width - 8 &&
      prevY + player.height <= p.y + 10 &&
      player.y + player.height >= p.y
    ) {
      // 🍮 プリンのトランポリン！
      if (p.type === 'pudding') {
        player.y = p.y - player.height;
        player.vy = -16.8; // ボヨヨン大ジャンプ！
        player.isGrounded = false;
        player.canDoubleJump = true; // 2段ジャンプ可能に
        sounds.playBoing();
        createParticles(player.x + player.width / 2, p.y, 'star', 12);
        p.squash = 12;
        return;
      }

      // ☁️ わたあめのふかふかスーパージャンプ！
      if (p.type === 'cotton_candy') {
        player.y = p.y - player.height;
        player.vy = -20.5; // 空高く大ジャンプ！
        player.isGrounded = false;
        player.canDoubleJump = true;
        sounds.playCottonJump();
        createParticles(player.x + player.width / 2, p.y, 'star', 16);
        createFloatingText(player.x + player.width / 2, p.y - 30, '☁️ スーパージャンプ！ ✨');
        p.squash = 16;
        return;
      }

      // 🍫 とけるチョコの足場
      if (p.type === 'melting_choco') {
        p.isStepped = true;
      }

      player.y = p.y - player.height;
      player.vy = 0;
      player.isGrounded = true;
      player.canDoubleJump = true; // 着地で2段ジャンプ復活

      // 足場が動いている場合、プレイヤーも連動
      if (p.type === 'macaron' && p.vy) {
        player.y += p.vy;
      }

      // チェックポイント（旗）に乗ったら復帰地点を更新＆バナー表示！
      if (p.isCheckPoint && p.tier) {
        // 足場の中央・真上を安全なチェックポイント位置として保存
        checkpoints[p.tier].x = Math.round(p.x + p.width / 2 - player.width / 2);
        checkpoints[p.tier].y = p.y - player.height;

        if (!player.checkpointTier || p.tier > player.checkpointTier) {
          player.checkpointTier = p.tier;
          const cpInfo = checkpoints[p.tier];
          if (cpInfo) {
            showBanner(`🚩 ${cpInfo.name} に到達！ ✨`);
          }
        }
      }

      // 足場のTier（赤1, 黄2, 黒3, 白4）をチェックして、より高いTierに到達したときに進化！
      if (p.tier && p.tier > player.currentTier && p.tier <= 4) {
        player.currentTier = p.tier;
        const tierColorMap = { 1: 'red', 2: 'yellow', 3: 'black', 4: 'white' };
        const newColor = tierColorMap[p.tier];
        // まだ持っていない上位のキャンディなら進化＆セーブ！
        if (CANDY_RANK[newColor] > (CANDY_RANK[player.candyColor] || 1)) {
          player.candyColor = newColor;
          saveCandyColor(player.candyColor);
          updateCandyUI(player.candyColor);
          sounds.playCandyLevelUp();
          createParticles(player.x + player.width / 2, player.y, 'star', 25);
        }
      }

      // 安全な復帰ポイントを更新（落下救済用：クッキーやウエハースなど安定した足場）
      if (p.type !== 'macaron' && p.type !== 'melting_choco' && p.type !== 'cotton_candy') {
        player.safeX = Math.max(40, p.x + p.width / 2 - player.width / 2);
        player.safeY = p.y - player.height;
      }
    }
  });

  // 🌵 とげとげ障害物（金平糖トゲ・チョコツノ）との衝突判定
  spikes.forEach(sp => {
    if (
      player.x + player.width > sp.x + 6 &&
      player.x < sp.x + sp.width - 6 &&
      player.y + player.height > sp.y + 4 &&
      player.y < sp.y + sp.height
    ) {
      const knockDir = (player.x + player.width / 2 < sp.x + sp.width / 2) ? -1 : 1;
      damagePlayer(1, knockDir);
    }
  });

  // 🍭 ふわふわキャンディの風（上昇気流）
  updrafts.forEach(u => {
    if (
      player.x + player.width > u.x &&
      player.x < u.x + u.width &&
      player.y + player.height > u.y &&
      player.y < u.y + u.height
    ) {
      player.vy = Math.max(-6.5, player.vy - 0.95);
      player.canDoubleJump = true;
      if (Math.random() < 0.35) {
        particles.push({
          x: u.x + Math.random() * u.width,
          y: u.y + u.height - 10 - Math.random() * 30,
          vx: (Math.random() - 0.5) * 1,
          vy: -(Math.random() * 3.5 + 2.5),
          size: Math.random() * 5 + 3,
          color: isNightMode ? '#bb88ff' : '#ff99dd',
          alpha: 0.85,
          type: 'sparkle',
          rot: 0,
          vRot: 0
        });
      }
    }
  });

  // 🍩 ころがるトッピングドーナツの移動と衝突（踏みつけ大ジャンプ vs 体当たりダメージ！）
  donuts.forEach(d => {
    d.x += d.vx;
    d.rotation += d.vx / d.radius;
    if (d.x < d.minX) {
      d.x = d.minX;
      d.vx *= -1;
    } else if (d.x > d.maxX) {
      d.x = d.maxX;
      d.vx *= -1;
    }

    if (d.squash > 0) d.squash -= 0.5;

    // プレイヤーとの接触判定
    const pCenterX = player.x + player.width / 2;
    const pCenterY = player.y + player.height / 2;
    const dist = Math.hypot(pCenterX - d.x, pCenterY - (d.y - d.radius));
    if (dist < player.width * 0.45 + d.radius) {
      // 上から踏みつけた場合（踏みつけ大ジャンプ！）
      const prevPlayerBottom = (player.y - player.vy) + player.height;
      const donutTop = d.y - d.radius * 1.8;
      if (player.vy > 0 && prevPlayerBottom <= donutTop + 16) {
        player.vy = -13.5;
        player.isGrounded = false;
        player.canDoubleJump = true;
        d.squash = 10;
        sounds.playBoing();
        createParticles(d.x, d.y - d.radius, 'star', 14);
        createFloatingText(d.x, d.y - d.radius - 20, '🍩 ナイスジャンプ！');
      } else {
        // 横から当たった場合（悪いこと：ダメージ＆跳ね飛ばし！）
        const knockDir = pCenterX < d.x ? -1 : 1;
        damagePlayer(1, knockDir);
      }
    }
  });

  // 5. アイテム取得判定
  items.forEach(it => {
    if (!it.collected) {
      const itX = it.x;
      const itY = it.y + Math.sin(Date.now() * 0.005 + it.floatOffset) * 6;
      if (
        player.x + player.width > itX - 16 &&
        player.x < itX + 28 &&
        player.y + player.height > itY - 16 &&
        player.y < itY + 28
      ) {
        it.collected = true;
        // 💖 回復ハート
        if (it.type === '💖') {
          if (player.hp < player.maxHp) {
            player.hp = Math.min(player.maxHp, player.hp + 1);
            updateHeartsUI();
            sounds.playHeal();
            createParticles(itX + 10, itY + 10, 'heart', 15);
            createFloatingText(itX + 10, itY - 10, '💖 かいふく！');
          } else {
            // HP満タンならボーナススイーツ+5！
            score += 5;
            document.getElementById('score-val').textContent = score;
            addTotalSweets(5);
            sounds.playCandyLevelUp();
            createParticles(itX + 10, itY + 10, 'star', 15);
            createFloatingText(itX + 10, itY - 10, '+5 🍓 ボーナス！');
          }
        } else {
          // 通常のスイーツアイテム
          const currentPet = PET_LIST.find(p => p.id === getSelectedPet()) || PET_LIST[0];
          const earnAmount = currentPet.coinPower || 1;
          score += earnAmount;
          document.getElementById('score-val').textContent = score;
          addTotalSweets(earnAmount); // ペットのコインパワー分たまる！
          sounds.playCollect();
          createParticles(itX + 10, itY + 10, 'sparkle', 10);
          createFloatingText(itX + 10, itY - 10, `+${earnAmount} 🍓`);
        }
      }
    }
  });

  // 6. 穴に落ちたときの処理（ハート-1消費＆チェックポイントから復活！）
  if (player.y > player.safeY + 360 || player.y > stageHeight + 40) {
    player.hp = Math.max(0, player.hp - 1);
    updateHeartsUI();
    createFloatingText(player.x, player.y - 20, '-1 💔');

    const heartsBox = document.getElementById('hearts-box');
    if (heartsBox) {
      heartsBox.classList.remove('damaged');
      void heartsBox.offsetWidth;
      heartsBox.classList.add('damaged');
    }

    if (player.hp <= 0) {
      triggerFailScreen();
    } else {
      sounds.playFall();
      player.invincibleTimer = 60; // 復帰後少し無敵

      // 取った最新のチェックポイント（旗）から再開！
      const currentCpTier = player.checkpointTier || player.currentTier || 1;
      player.currentTier = currentCpTier;
      player.candyColor = loadCandyColor();
      updateCandyUI(player.candyColor);

      const cp = checkpoints[currentCpTier] || checkpoints[1];
      player.x = cp.x;
      player.y = cp.y;
      player.safeX = cp.x;
      player.safeY = cp.y;
      player.vx = 0;
      player.vy = 0;
      player.isGrounded = true; // しっかり接地状態で復活！
      player.canDoubleJump = true;
      player.isParachuting = false;

      // ペットもチェックポイントのプレイヤーの横に移動
      pet.x = cp.x - 30;
      pet.y = cp.y + player.height - 30;
      pet.vx = 0;
      pet.vy = 0;

      // カメラもチェックポイントへ瞬時に合わせる
      camera.x = Math.max(0, Math.min(stageWidth - V_WIDTH, player.x - V_WIDTH * 0.35));
      camera.y = Math.max(0, Math.min(stageHeight - V_HEIGHT, player.y - V_HEIGHT * 0.55));

      createParticles(player.x + player.width / 2, player.y + player.height / 2, 'heart', 12);
    }
  }

  // 7. ゴール判定（大ケーキに到達）
  if (
    player.x + player.width > goal.x + 20 &&
    player.x < goal.x + goal.width - 10 &&
    player.y + player.height > goal.y + 10
  ) {
    reachGoal();
  }

  // 8. カメラの追従（左右・上下）
  const targetCamX = player.x - V_WIDTH * 0.35;
  camera.x += (targetCamX - camera.x) * 0.1;
  if (camera.x < 0) camera.x = 0;
  if (camera.x > stageWidth - V_WIDTH) camera.x = stageWidth - V_WIDTH;

  const targetCamY = player.y - V_HEIGHT * 0.55;
  camera.y += (targetCamY - camera.y) * 0.1;
  if (camera.y < 0) camera.y = 0;
  if (camera.y > stageHeight - V_HEIGHT) camera.y = stageHeight - V_HEIGHT;

  // ペットの追従更新
  updatePet();

  // キー押下履歴（2段ジャンプ単発押し検出用）
  player.jumpHeldLastFrame = keys.jump;

  // まばたきアニメ
  player.blinkTimer++;
  if (player.blinkTimer > 180) {
    player.isBlinking = true;
    if (player.blinkTimer > 192) {
      player.isBlinking = false;
      player.blinkTimer = 0;
    }
  }

  updateParticles();
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.type === 'text') {
      p.vy *= 0.95;
      p.alpha -= 0.025;
    } else {
      p.vy += 0.25; // パーティクルの重力
      p.alpha -= 0.02;
      p.rot += p.vRot;
    }
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

// 描画
function render() {
  ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

  // 背景描画（高度に応じたパステル空とお菓子の雲、または夜空）
  drawBackground();

  ctx.save();
  ctx.translate(-Math.floor(camera.x), -Math.floor(camera.y));

  // ふわふわキャンディの風（上昇気流・一番奥に描画）
  updrafts.forEach(drawUpdraft);

  // 足場の描画
  platforms.forEach(drawPlatform);

  // 🌵 とげとげ障害物の描画
  spikes.forEach(drawSpike);

  // ころがるドーナツの描画
  donuts.forEach(drawDonut);

  // スイーツアイテムの描画
  items.forEach(drawItem);

  // ゴールの描画（ケーキタワー）
  drawGoal();

  // ペットの描画（おともだちと一緒！）
  drawPet();

  // プレイヤーの描画
  drawPlayer();

  // パーティクルの描画
  particles.forEach(drawParticle);

  ctx.restore();

  // チェックポイント到達バナー表示（UI座標系）
  if (bannerTimer > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, bannerTimer / 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.beginPath();
    ctx.roundRect(V_WIDTH / 2 - 160, 20, 320, 42, 21);
    ctx.fill();
    ctx.strokeStyle = '#ff4785';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = 'bold 18px "M PLUS Rounded 1c", sans-serif';
    ctx.fillStyle = '#ff2b75';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(bannerText, V_WIDTH / 2, 41);
    ctx.restore();
    bannerTimer--;
  }
}

// 🍭 ふわふわキャンディの風（上昇気流）の描画
function drawUpdraft(u) {
  ctx.save();
  const uGrad = ctx.createLinearGradient(0, u.y + u.height, 0, u.y);
  uGrad.addColorStop(0, isNightMode ? 'rgba(180, 120, 255, 0.3)' : 'rgba(255, 180, 230, 0.28)');
  uGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
  ctx.fillStyle = uGrad;
  ctx.beginPath();
  ctx.roundRect(u.x, u.y, u.width, u.height, [20, 20, 0, 0]);
  ctx.fill();

  // 波打つ上昇カレントライン
  ctx.strokeStyle = isNightMode ? 'rgba(210, 160, 255, 0.45)' : 'rgba(255, 150, 210, 0.4)';
  ctx.lineWidth = 2;
  const time = Date.now() * 0.003;
  for (let sx = u.x + 18; sx < u.x + u.width; sx += 24) {
    ctx.beginPath();
    for (let sy = u.y + u.height; sy >= u.y; sy -= 15) {
      const wave = Math.sin(time + sy * 0.04) * 6;
      if (sy === u.y + u.height) ctx.moveTo(sx + wave, sy);
      else ctx.lineTo(sx + wave, sy);
    }
    ctx.stroke();
  }

  // 根元のキャンディアイコン
  ctx.font = '22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🍭', u.x + u.width / 2, u.y + u.height - 8);
  ctx.restore();
}

// 🍩 ころがるトッピングドーナツの描画
function drawDonut(d) {
  ctx.save();
  const cy = d.y - d.radius;
  ctx.translate(d.x, cy);
  ctx.rotate(d.rotation);

  // ドーナツ生地
  ctx.fillStyle = d.dough;
  ctx.beginPath();
  ctx.arc(0, 0, d.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ba7b3b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // とろ〜りアイシング
  ctx.fillStyle = d.frosting;
  ctx.beginPath();
  ctx.arc(0, 0, d.radius * 0.88, 0, Math.PI * 2);
  ctx.fill();

  // 中央の穴
  ctx.fillStyle = isNightMode ? '#24143a' : '#ffeef8';
  ctx.beginPath();
  ctx.arc(0, 0, d.radius * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ba7b3b';
  ctx.lineWidth = 1;
  ctx.stroke();

  // カラフルスプリンクル（トッピング）
  const sprinkles = [
    { a: 0.3, r: d.radius * 0.62, c: '#ff3377' },
    { a: 1.2, r: d.radius * 0.65, c: '#33ccff' },
    { a: 2.1, r: d.radius * 0.6, c: '#ffff00' },
    { a: 3.2, r: d.radius * 0.66, c: '#33cc66' },
    { a: 4.1, r: d.radius * 0.58, c: '#ff9900' },
    { a: 5.2, r: d.radius * 0.64, c: '#ffffff' }
  ];
  sprinkles.forEach(s => {
    ctx.fillStyle = s.c;
    const sx = Math.cos(s.a) * s.r;
    const sy = Math.sin(s.a) * s.r;
    ctx.fillRect(sx - 1.5, sy - 1, 3, 2);
  });

  ctx.restore();
}

// 背景とお菓子の雲（各エリアの高度に応じた美しいグラデーションまたは夜空）
function drawBackground() {
  // ステージ3：ほしぞらギャラクシースイーツの専用背景
  if (currentStage === 3) {
    drawStage3Background();
    return;
  }

  // ステージ2：ひんやりフルーツパフェの専用背景
  if (currentStage === 2) {
    drawStage2Background();
    return;
  }

  if (isNightMode) {
    // 【よるのお菓子の国】ミッドナイトパステルパープル＆ディープネイビー
    const nightGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
    nightGrad.addColorStop(0, '#100820');
    nightGrad.addColorStop(0.5, '#221338');
    nightGrad.addColorStop(1, '#381a4a');
    ctx.fillStyle = nightGrad;
    ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

    // きらめくお星さま（トゥインクル）
    ctx.save();
    NIGHT_STARS.forEach(s => {
      const alpha = 0.35 + 0.55 * Math.sin(Date.now() * s.speed + s.phase);
      ctx.fillStyle = `rgba(255, 245, 180, ${Math.max(0.1, alpha)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // まあるく輝く三日月 🌙
    ctx.fillStyle = 'rgba(255, 235, 130, 0.95)';
    ctx.shadowColor = '#ffe066';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(710, 70, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // 三日月の影くり抜き
    ctx.fillStyle = '#100820';
    ctx.beginPath();
    ctx.arc(702, 64, 21, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ふわふわ夜の雲（ラベンダーパステル）
    const cloudOffsetX = (camera.x * 0.25) % 800;
    const cloudOffsetY = (camera.y * 0.18) % 300;
    ctx.fillStyle = 'rgba(180, 150, 220, 0.35)';
    for (let i = -1; i < 4; i++) {
      const cx = i * 360 - cloudOffsetX;
      drawMarshmallowCloud(cx + 60, 80 - cloudOffsetY + 50, 75);
      drawMarshmallowCloud(cx + 240, 180 - cloudOffsetY + 50, 55);
    }
    return;
  }

  const heightRatio = Math.max(0, Math.min(1, camera.y / (stageHeight - V_HEIGHT)));
  
  const grad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
  if (heightRatio < 0.25) {
    // 【白エリア〜天空レインボー城】ゆめかわパステルブルー＆ラベンダー
    grad.addColorStop(0, '#cce6ff');
    grad.addColorStop(0.5, '#e5d9ff');
    grad.addColorStop(1, '#ffe6f4');
  } else if (heightRatio < 0.5) {
    // 【黒エリア：ショコラ】ビターチョコを想わせる落ち着いたラベンダーダスティピンク
    grad.addColorStop(0, '#d9c2d6');
    grad.addColorStop(0.6, '#ebd8e6');
    grad.addColorStop(1, '#f5e8f0');
  } else if (heightRatio < 0.75) {
    // 【黄エリア：レモン＆バナナ】明るくハッピーなレモンイエロー＆ミルキーパステル
    grad.addColorStop(0, '#fff4cc');
    grad.addColorStop(0.6, '#fff9e6');
    grad.addColorStop(1, '#ffeaf3');
  } else {
    // 【赤エリア：ストロベリー】あたたかいストロベリーピンク＆ホイップホワイト
    grad.addColorStop(0, '#ffd1e6');
    grad.addColorStop(0.6, '#fff0f7');
    grad.addColorStop(1, '#ffe6f2');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

  // ふわふわマシュマロの雲（カメラ移動に応じたパララックス）
  const cloudOffsetX = (camera.x * 0.25) % 800;
  const cloudOffsetY = (camera.y * 0.18) % 300;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
  for (let i = -1; i < 4; i++) {
    const cx = i * 360 - cloudOffsetX;
    drawMarshmallowCloud(cx + 60, 80 - cloudOffsetY + 50, 75);
    drawMarshmallowCloud(cx + 240, 180 - cloudOffsetY + 50, 55);
  }
}

function drawMarshmallowCloud(x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.35, 0, Math.PI * 2);
  ctx.arc(x + s * 0.3, y - s * 0.15, s * 0.4, 0, Math.PI * 2);
  ctx.arc(x + s * 0.65, y, s * 0.35, 0, Math.PI * 2);
  ctx.fill();
}

// ステージ2：ひんやりフルーツパフェの背景描画
function drawStage2Background() {
  const heightRatio = Math.max(0, Math.min(1, camera.y / (stageHeight - V_HEIGHT)));

  if (isNightMode) {
    // 【よるのアイスパフェの国】オーロラナイト＆アイスブルー
    const nightGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
    nightGrad.addColorStop(0, '#0a1228');
    nightGrad.addColorStop(0.4, '#142244');
    nightGrad.addColorStop(1, '#231842');
    ctx.fillStyle = nightGrad;
    ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

    // オーロラ光彩の揺らめき
    ctx.save();
    const auroraGrad = ctx.createLinearGradient(0, 0, V_WIDTH, 200);
    auroraGrad.addColorStop(0, 'rgba(80, 240, 220, 0.18)');
    auroraGrad.addColorStop(0.5, 'rgba(170, 130, 255, 0.20)');
    auroraGrad.addColorStop(1, 'rgba(255, 130, 190, 0.15)');
    ctx.fillStyle = auroraGrad;
    ctx.fillRect(0, 0, V_WIDTH, 240);

    // きらめくお星さま
    NIGHT_STARS.forEach(s => {
      const alpha = 0.35 + 0.55 * Math.sin(Date.now() * s.speed + s.phase);
      ctx.fillStyle = `rgba(215, 245, 255, ${Math.max(0.1, alpha)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // アイスムーン 🌙
    ctx.fillStyle = 'rgba(220, 248, 255, 0.95)';
    ctx.shadowColor = '#80e5ff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(710, 70, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#0a1228';
    ctx.beginPath();
    ctx.arc(702, 64, 21, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ふわふわ夜のシャーベット雲
    const cloudOffsetX = (camera.x * 0.25) % 800;
    const cloudOffsetY = (camera.y * 0.18) % 300;
    ctx.fillStyle = 'rgba(160, 195, 235, 0.35)';
    for (let i = -1; i < 4; i++) {
      const cx = i * 360 - cloudOffsetX;
      drawMarshmallowCloud(cx + 60, 80 - cloudOffsetY + 50, 75);
      drawMarshmallowCloud(cx + 240, 180 - cloudOffsetY + 50, 55);
    }
    drawIceCrystals();
    return;
  }

  // ひるのパステルアイス＆フルーツグラデーション
  const grad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
  if (heightRatio < 0.25) {
    // 【エリア4〜5：天空フルーツパフェタワー】ゆめかわオーロラパステル
    grad.addColorStop(0, '#c7f1ff');
    grad.addColorStop(0.5, '#e5dcff');
    grad.addColorStop(1, '#ffe0f0');
  } else if (heightRatio < 0.5) {
    // 【エリア3：チョコミント洞窟】ミントブルー＆ミルキーチョコクランベリー
    grad.addColorStop(0, '#bbf2e5');
    grad.addColorStop(0.6, '#d8f5ee');
    grad.addColorStop(1, '#eee4f5');
  } else if (heightRatio < 0.75) {
    // 【エリア2：フローズンベリー】淡いベリーピンク＆シャーベットブルー
    grad.addColorStop(0, '#fedce8');
    grad.addColorStop(0.6, '#f3e6f5');
    grad.addColorStop(1, '#dff3fc');
  } else {
    // 【エリア1：ミント＆バニラアイスの丘】すっきりアイスミント＆ホイップクリーム
    grad.addColorStop(0, '#d1f4ed');
    grad.addColorStop(0.6, '#e2f7f1');
    grad.addColorStop(1, '#fff5f8');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

  // ふわふわシャーベット雲
  const cloudOffsetX = (camera.x * 0.25) % 800;
  const cloudOffsetY = (camera.y * 0.18) % 300;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  for (let i = -1; i < 4; i++) {
    const cx = i * 360 - cloudOffsetX;
    drawMarshmallowCloud(cx + 60, 80 - cloudOffsetY + 50, 75);
    drawMarshmallowCloud(cx + 240, 180 - cloudOffsetY + 50, 55);
  }

  // ひんやり舞う雪の結晶・アイスキラキラ
  drawIceCrystals();
}

function drawIceCrystals() {
  const t = Date.now() * 0.001;
  ctx.save();
  ctx.fillStyle = isNightMode ? 'rgba(200, 240, 255, 0.75)' : 'rgba(255, 255, 255, 0.65)';
  for (let i = 0; i < 20; i++) {
    const sx = ((i * 137 + t * 24) % (V_WIDTH + 60)) - 30;
    const sy = ((i * 93 + t * (18 + (i % 4) * 8)) % (V_HEIGHT + 60)) - 30;
    const size = 3 + (i % 4);
    ctx.beginPath();
    ctx.moveTo(sx, sy - size);
    ctx.lineTo(sx + size * 0.35, sy - size * 0.35);
    ctx.lineTo(sx + size, sy);
    ctx.lineTo(sx + size * 0.35, sy + size * 0.35);
    ctx.lineTo(sx, sy + size);
    ctx.lineTo(sx - size * 0.35, sy + size * 0.35);
    ctx.lineTo(sx - size, sy);
    ctx.lineTo(sx - size * 0.35, sy - size * 0.35);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

// ステージ3：ほしぞらギャラクシースイーツの背景描画
function drawStage3Background() {
  const heightRatio = Math.max(0, Math.min(1, camera.y / (stageHeight - V_HEIGHT)));

  // 深宇宙コズミックグラデーション
  const grad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
  if (isNightMode) {
    // 【よるモード】超深宇宙・ブラックベリーバイオレット
    grad.addColorStop(0, '#060212');
    grad.addColorStop(0.5, '#0e0824');
    grad.addColorStop(1, '#1b0d36');
  } else {
    // 【通常モード】きらめく星空ネビュラパープル＆ギャラクシーブルー
    if (heightRatio < 0.25) {
      // 天空スターライト
      grad.addColorStop(0, '#0f0524');
      grad.addColorStop(0.5, '#1e1045');
      grad.addColorStop(1, '#3b1861');
    } else if (heightRatio < 0.5) {
      // 星雲ネビュラゾーン
      grad.addColorStop(0, '#150a30');
      grad.addColorStop(0.6, '#281250');
      grad.addColorStop(1, '#431969');
    } else if (heightRatio < 0.75) {
      // プラネットゾーン
      grad.addColorStop(0, '#1c0f3d');
      grad.addColorStop(0.6, '#2e1957');
      grad.addColorStop(1, '#4b2170');
    } else {
      // ミルキーウェイ地上
      grad.addColorStop(0, '#1f1242');
      grad.addColorStop(0.6, '#311a5c');
      grad.addColorStop(1, '#53237a');
    }
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

  ctx.save();

  // 1. 遠くの淡い星雲（ネビュラガス光彩）
  const neb1 = ctx.createRadialGradient(220, 140, 10, 220, 140, 260);
  neb1.addColorStop(0, 'rgba(180, 80, 255, 0.22)');
  neb1.addColorStop(0.6, 'rgba(0, 220, 255, 0.12)');
  neb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = neb1;
  ctx.fillRect(0, 0, 500, 360);

  const neb2 = ctx.createRadialGradient(680, 280, 20, 680, 280, 280);
  neb2.addColorStop(0, 'rgba(255, 80, 180, 0.18)');
  neb2.addColorStop(0.5, 'rgba(120, 60, 255, 0.10)');
  neb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = neb2;
  ctx.fillRect(400, 100, 400, 400);

  // 2. 巨大なリング付き惑星（パステルサターン 🪐）
  const planetX = 660 - (camera.x * 0.05) % 150;
  const planetY = 95 - (camera.y * 0.03) % 80;
  
  // 惑星のリング（後ろ半分）
  ctx.save();
  ctx.translate(planetX, planetY);
  ctx.rotate(-0.38);
  ctx.strokeStyle = 'rgba(255, 215, 120, 0.45)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.ellipse(0, 0, 72, 18, 0, Math.PI, Math.PI * 2);
  ctx.stroke();

  // 惑星の球体（キャンディストライプ）
  const pGrad = ctx.createLinearGradient(-32, -32, 32, 32);
  pGrad.addColorStop(0, '#e5b2ff');
  pGrad.addColorStop(0.35, '#ff99dd');
  pGrad.addColorStop(0.7, '#ffc285');
  pGrad.addColorStop(1, '#7ee8ff');
  ctx.fillStyle = pGrad;
  ctx.beginPath();
  ctx.arc(0, 0, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 惑星のリング（手前半分）
  ctx.strokeStyle = 'rgba(255, 225, 140, 0.85)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.ellipse(0, 0, 72, 18, 0, 0, Math.PI);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 3. 流れ星（シューティングスター）
  const t = Date.now() * 0.001;
  const meteorTime = (t * 0.7) % 3.5;
  if (meteorTime < 0.9) {
    const progress = meteorTime / 0.9;
    const mx = 820 - progress * 400;
    const my = 40 + progress * 240;
    const mLen = 90;
    const mGrad = ctx.createLinearGradient(mx, my, mx + mLen * 0.86, my - mLen * 0.5);
    mGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    mGrad.addColorStop(0.3, 'rgba(255, 220, 100, 0.7)');
    mGrad.addColorStop(1, 'rgba(255, 100, 200, 0)');
    ctx.strokeStyle = mGrad;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(mx + mLen * 0.86, my - mLen * 0.5);
    ctx.stroke();

    // 流れ星の頭
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. きらめく星々
  drawCosmicStars();

  ctx.restore();

  // 5. ふわふわの星屑雲
  const cloudOffsetX = (camera.x * 0.25) % 800;
  const cloudOffsetY = (camera.y * 0.18) % 300;
  ctx.fillStyle = 'rgba(180, 140, 230, 0.35)';
  for (let i = -1; i < 4; i++) {
    const cx = i * 360 - cloudOffsetX;
    drawMarshmallowCloud(cx + 60, 80 - cloudOffsetY + 50, 75);
    drawMarshmallowCloud(cx + 240, 180 - cloudOffsetY + 50, 55);
  }
}

function drawCosmicStars() {
  const t = Date.now() * 0.001;
  for (let i = 0; i < 35; i++) {
    const sx = (i * 97 + (i % 7) * 23) % V_WIDTH;
    const sy = (i * 61 + (i % 5) * 37) % (V_HEIGHT - 40) + 20;
    const alpha = 0.3 + 0.6 * Math.sin(t * (1.5 + (i % 3) * 0.8) + i);
    const size = 1.5 + (i % 3) * 1.5;
    
    ctx.fillStyle = (i % 4 === 0) ? `rgba(255, 220, 120, ${alpha})` :
                    (i % 4 === 1) ? `rgba(130, 230, 255, ${alpha})` :
                    (i % 4 === 2) ? `rgba(255, 150, 220, ${alpha})` :
                                    `rgba(255, 255, 255, ${alpha})`;
    
    if (i % 5 === 0) {
      // 4方向のキラリ星
      const rad = size * 2.2;
      ctx.beginPath();
      ctx.moveTo(sx, sy - rad);
      ctx.lineTo(sx + rad * 0.3, sy);
      ctx.lineTo(sx + rad, sy);
      ctx.lineTo(sx + rad * 0.3, sy + rad * 0.3);
      ctx.lineTo(sx, sy + rad);
      ctx.lineTo(sx - rad * 0.3, sy + rad * 0.3);
      ctx.lineTo(sx - rad, sy);
      ctx.lineTo(sx - rad * 0.3, sy);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// 🌵 とげとげ障害物（金平糖トゲ・チョコツノ）の描画
function drawSpike(sp) {
  ctx.save();
  if (sp.type === 'konpeito') {
    // カラフルな金平糖トゲ
    const baseColor = sp.color || '#ff66aa';
    const numPoints = 5;
    const step = sp.width / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const px = sp.x + i * step + step / 2;
      const py = sp.y + sp.height;
      const tipY = sp.y;

      ctx.beginPath();
      ctx.moveTo(px - step * 0.45, py);
      ctx.lineTo(px, tipY);
      ctx.lineTo(px + step * 0.45, py);
      ctx.closePath();

      const grad = ctx.createLinearGradient(px, tipY, px, py);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, baseColor);
      grad.addColorStop(1, '#ff3388');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  } else {
    // チョコツノ（ビターチョコレートのピラミッドトゲ）
    const numPoints = 4;
    const step = sp.width / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const px = sp.x + i * step + step / 2;
      const py = sp.y + sp.height;
      const tipY = sp.y;

      ctx.beginPath();
      ctx.moveTo(px - step * 0.48, py);
      ctx.lineTo(px, tipY);
      ctx.lineTo(px + step * 0.48, py);
      ctx.closePath();

      const grad = ctx.createLinearGradient(px - step * 0.5, tipY, px + step * 0.5, py);
      grad.addColorStop(0, '#663319');
      grad.addColorStop(0.6, '#331a0e');
      grad.addColorStop(1, '#1a0c06');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = '#8b4513';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  ctx.restore();
}

// 足場の描画
function drawPlatform(p) {
  const colorTier = p.colorTier || 'red';

  // カラーパレット設定
  let mainColor = '#f6be79';
  let strokeColor = '#e09e52';
  let creamColor = '#ffffff';
  let dotColor = '#7a4220';

  if (colorTier === 'red') {
    mainColor = '#ff6088';
    strokeColor = '#d92655';
    creamColor = '#ffffff';
    dotColor = '#9e0d34';
  } else if (colorTier === 'yellow') {
    mainColor = '#ffcc00';
    strokeColor = '#d49b00';
    creamColor = '#ffffff';
    dotColor = '#ff9900';
  } else if (colorTier === 'black') {
    mainColor = '#382521';
    strokeColor = '#1f1310';
    creamColor = '#ffffff';
    dotColor = '#150906';
  } else if (colorTier === 'white') {
    mainColor = '#f6f9fc';
    strokeColor = '#c4daf5';
    creamColor = '#ffb3d9';
    dotColor = '#80b3ff';
  } else if (colorTier === 'rainbow') {
    mainColor = 'rainbow';
  }

  if (p.type === 'cookie' || p.type === 'cake_ground') {
    // クッキー（ビスケット）地面
    if (mainColor === 'rainbow') {
      const rGrad = ctx.createLinearGradient(p.x, p.y, p.x + p.width, p.y);
      rGrad.addColorStop(0, '#ff4785');
      rGrad.addColorStop(0.25, '#ffbb00');
      rGrad.addColorStop(0.5, '#33cc66');
      rGrad.addColorStop(0.75, '#3399ff');
      rGrad.addColorStop(1, '#bb44ff');
      ctx.fillStyle = rGrad;
      strokeColor = '#ffffff';
    } else {
      ctx.fillStyle = mainColor;
    }

    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.width, p.height, [16, 16, 0, 0]);
    ctx.fill();

    // ビスケットの縁取り
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    ctx.stroke();

    // 生クリームのトッピング波
    ctx.fillStyle = creamColor;
    ctx.beginPath();
    for (let x = p.x; x < p.x + p.width; x += 24) {
      ctx.arc(x + 12, p.y + 4, 8, 0, Math.PI);
    }
    ctx.fill();

    // トッピング模様
    ctx.fillStyle = dotColor;
    for (let x = p.x + 20; x < p.x + p.width - 15; x += 36) {
      ctx.beginPath();
      ctx.arc(x, p.y + 25, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (p.type === 'wafer') {
    // サクサクウエハース
    if (mainColor === 'rainbow') {
      const rGrad = ctx.createLinearGradient(p.x, p.y, p.x + p.width, p.y);
      rGrad.addColorStop(0, '#ff66aa');
      rGrad.addColorStop(0.33, '#ffcc00');
      rGrad.addColorStop(0.66, '#33cc99');
      rGrad.addColorStop(1, '#9966ff');
      ctx.fillStyle = rGrad;
      strokeColor = '#ffffff';
    } else {
      ctx.fillStyle = mainColor;
    }

    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.width, p.height, 10);
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // 格子模様
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let x = p.x + 8; x < p.x + p.width - 6; x += 16) {
      ctx.fillRect(x, p.y + 4, 3, p.height - 8);
    }
  } else if (p.type === 'macaron') {
    // まるっこいマカロン
    ctx.fillStyle = p.color || '#ffb3d9';
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.width, p.height, 16);
    ctx.fill();

    // マカロンの白いクリーム層
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x + 6, p.y + p.height / 2 - 2, p.width - 12, 4);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (p.type === 'melting_choco') {
    // 🍫 とけるチョコの足場
    if (p.isMelted) return; // とけて消えている時は描画しない

    const shakeX = p.shake || 0;
    const px = p.x + shakeX;
    const py = p.y;
    const pw = p.width;
    const ph = p.height;

    ctx.save();
    if (isNightMode) {
      ctx.shadowColor = '#ff66aa';
      ctx.shadowBlur = 8;
    }

    // チョコレートバー本体
    ctx.fillStyle = colorTier === 'black' ? '#291710' : (colorTier === 'white' ? '#f4ece5' : '#5c2d18');
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 8);
    ctx.fill();

    // 輪郭
    ctx.strokeStyle = colorTier === 'black' ? '#180a06' : (colorTier === 'white' ? '#ded2c6' : '#3d1b0d');
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 板チョコのブロック溝
    const numBlocks = Math.max(2, Math.floor(pw / 26));
    const blockW = pw / numBlocks;
    ctx.fillStyle = colorTier === 'black' ? '#3d2319' : (colorTier === 'white' ? '#ffffff' : '#793c20');
    for (let i = 0; i < numBlocks; i++) {
      ctx.beginPath();
      ctx.roundRect(px + i * blockW + 3, py + 4, blockW - 6, ph - 8, 4);
      ctx.fill();
    }

    // 乗ったときのとろ〜りチョコしずく
    if (p.meltTimer > 0) {
      ctx.fillStyle = colorTier === 'black' ? '#291710' : (colorTier === 'white' ? '#f4ece5' : '#5c2d18');
      const dripHeight = (p.meltTimer / 45) * 12;
      for (let x = px + 12; x < px + pw - 8; x += 20) {
        ctx.beginPath();
        ctx.arc(x, py + ph + dripHeight * 0.6, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  } else if (p.type === 'pudding') {
    // 🍮 ぷるるんプリンのトランポリン
    const squash = p.squash || 0;
    if (p.squash > 0) p.squash *= 0.84;
    if (p.squash < 0.1) p.squash = 0;

    const pw = p.width + squash * 1.5;
    const ph = Math.max(12, p.height - squash);
    const px = p.x - (pw - p.width) / 2;
    const py = p.y + (p.height - ph);

    ctx.save();
    // カスタードプリン本体
    ctx.fillStyle = '#ffea6c';
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, [14, 14, 6, 6]);
    ctx.fill();

    // とろ〜りカラメルソース（上部）
    ctx.fillStyle = '#6b3208';
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph * 0.4, [14, 14, 2, 2]);
    ctx.fill();

    // カラメルのしずく波
    ctx.beginPath();
    for (let x = px + 6; x < px + pw - 6; x += 15) {
      ctx.arc(x + 7.5, py + ph * 0.4, 4.5, 0, Math.PI);
    }
    ctx.fill();

    // つやハイライト
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.ellipse(px + 14, py + 7, 6, 2.5, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // 輪郭
    ctx.strokeStyle = '#d48800';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // てっぺんのさくらんぼ 🍒
    ctx.font = '18px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍒', p.x + p.width / 2, py - 3);

    ctx.restore();
  } else if (p.type === 'cotton_candy') {
    // ☁️ ふわふわわたあめのスーパージャンプ台
    const squash = p.squash || 0;
    if (p.squash > 0) p.squash *= 0.82;
    if (p.squash < 0.1) p.squash = 0;

    const pw = p.width + squash * 1.8;
    const ph = Math.max(14, p.height - squash);
    const px = p.x - (pw - p.width) / 2;
    const py = p.y + (p.height - ph);

    ctx.save();
    const grad = ctx.createLinearGradient(px, py, px + pw, py + ph);
    grad.addColorStop(0, '#ffd1ea');
    grad.addColorStop(0.5, '#cce6ff');
    grad.addColorStop(1, '#ffc2eb');
    ctx.fillStyle = grad;

    // もこもこ丸の連続
    const r = ph * 0.7;
    ctx.beginPath();
    ctx.arc(px + r, py + ph / 2, r, 0, Math.PI * 2);
    ctx.arc(px + pw / 2, py + ph / 2 - 4, r * 1.1, 0, Math.PI * 2);
    ctx.arc(px + pw - r, py + ph / 2, r, 0, Math.PI * 2);
    ctx.fill();

    // キラキラ星飾り
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px + pw * 0.35, py + 8, 3, 0, Math.PI * 2);
    ctx.arc(px + pw * 0.65, py + 8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
  } else if (p.type === 'ice_cream') {
    // 🍦 つるつるアイスクリーム床
    ctx.save();
    const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.height);
    grad.addColorStop(0, '#e6f7ff');
    grad.addColorStop(0.4, '#b3e6ff');
    grad.addColorStop(1, '#80d4ff');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.width, p.height, 12);
    ctx.fill();

    // 氷のキラッと光るツヤ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillRect(p.x + 8, p.y + 3, p.width - 16, 4);

    // 下のとろけるしずく
    ctx.fillStyle = '#b3e6ff';
    for (let x = p.x + 16; x < p.x + p.width - 10; x += 28) {
      ctx.beginPath();
      ctx.arc(x, p.y + p.height + 3, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  // チェックポイントのフラッグ表示
  if (p.isCheckPoint) {
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🚩', p.x + 30, p.y - 10);
  }
}

// アイテムの描画
function drawItem(it) {
  if (it.collected) return;
  const floatY = it.y + Math.sin(Date.now() * 0.005 + it.floatOffset) * 6;
  ctx.font = '28px "M PLUS Rounded 1c", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(it.type, it.x + 12, floatY + 12);
}

// ゴール描画
function drawGoal() {
  if (currentStage === 3) {
    drawStage3Goal();
    return;
  }

  if (currentStage === 2) {
    drawStage2ParfaitGoal();
    return;
  }

  const gx = goal.x;
  const gy = goal.y;

  // ケーキ下段（レインボーグラデーション）
  const cakeGrad = ctx.createLinearGradient(gx, gy, gx + goal.width, gy);
  cakeGrad.addColorStop(0, '#ff99bb');
  cakeGrad.addColorStop(0.25, '#ffe066');
  cakeGrad.addColorStop(0.5, '#99ffbb');
  cakeGrad.addColorStop(0.75, '#99ccff');
  cakeGrad.addColorStop(1, '#e099ff');
  ctx.fillStyle = cakeGrad;

  ctx.beginPath();
  ctx.roundRect(gx, gy + 50, goal.width, 90, 18);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 生クリームのホイップ波
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  for (let x = gx; x < gx + goal.width; x += 26) {
    ctx.arc(x + 13, gy + 52, 9, 0, Math.PI);
  }
  ctx.fill();

  // ケーキ上段
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(gx + 22, gy + 10, goal.width - 44, 45, 12);
  ctx.fill();
  ctx.strokeStyle = '#ffb3d9';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 上の虹色クラウン＆いちご
  ctx.font = '36px "M PLUS Rounded 1c"';
  ctx.textAlign = 'center';
  ctx.fillText('👑🍓', gx + goal.width / 2, gy + 6);

  // RAINBOW GOALフラッグ
  ctx.fillStyle = '#ff1a75';
  ctx.font = '900 18px "M PLUS Rounded 1c"';
  ctx.fillText('🌈 RAINBOW GOAL! 🌈', gx + goal.width / 2, gy + 90);
}

// ステージ2：特大デラックスパフェタワーのゴール描画
function drawStage2ParfaitGoal() {
  const gx = goal.x;
  const gy = goal.y;
  const gw = goal.width;
  const gh = goal.height;

  ctx.save();

  // グラスの台座（フット）
  ctx.fillStyle = 'rgba(220, 248, 255, 0.75)';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(gx + gw / 2, gy + gh - 10, 52, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // ステム（グラスの脚）
  ctx.fillRect(gx + gw / 2 - 9, gy + gh - 46, 18, 38);
  ctx.strokeRect(gx + gw / 2 - 9, gy + gh - 46, 18, 38);

  // パフェグラス本体（逆台形）
  ctx.beginPath();
  ctx.moveTo(gx + 24, gy + 32);
  ctx.lineTo(gx + gw - 24, gy + 32);
  ctx.lineTo(gx + gw / 2 + 30, gy + gh - 46);
  ctx.lineTo(gx + gw / 2 - 30, gy + gh - 46);
  ctx.closePath();

  // 美味しいカラフルアイス・フルーツレイヤーグラデーション
  const parfaitGrad = ctx.createLinearGradient(0, gy + 32, 0, gy + gh - 46);
  parfaitGrad.addColorStop(0, '#ffffff');    // バニラアイス
  parfaitGrad.addColorStop(0.22, '#7eedc7'); // チョコミントアイス
  parfaitGrad.addColorStop(0.48, '#ff70a6'); // ストロベリーソース＆アイス
  parfaitGrad.addColorStop(0.72, '#ffe066'); // マンゴープリン
  parfaitGrad.addColorStop(1, '#ff3385');    // ラズベリーゼリー
  ctx.fillStyle = parfaitGrad;
  ctx.fill();
  ctx.stroke();

  // グラスのツヤ・ハイライト
  ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
  ctx.beginPath();
  ctx.moveTo(gx + 32, gy + 38);
  ctx.lineTo(gx + 44, gy + 38);
  ctx.lineTo(gx + gw / 2 - 18, gy + gh - 52);
  ctx.lineTo(gx + gw / 2 - 26, gy + gh - 52);
  ctx.closePath();
  ctx.fill();

  // もこもこホイップクリーム
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(gx + gw / 2 - 42, gy + 26, 24, 0, Math.PI * 2);
  ctx.arc(gx + gw / 2 + 42, gy + 26, 24, 0, Math.PI * 2);
  ctx.arc(gx + gw / 2, gy + 14, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffd4eb';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 斜めに刺さったチョコロールウエハース
  ctx.save();
  ctx.translate(gx + gw / 2 + 38, gy + 8);
  ctx.rotate(0.42);
  ctx.fillStyle = '#d49b6a';
  ctx.fillRect(-9, -52, 18, 56);
  ctx.fillStyle = '#5c3a21';
  for (let wy = -48; wy < 0; wy += 12) {
    ctx.fillRect(-9, wy, 18, 4);
  }
  ctx.restore();

  // フルーツトッピング（キウイ・オレンジ）
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🥝', gx + gw / 2 - 50, gy + 18);
  ctx.fillText('🍊', gx + gw / 2 + 52, gy + 20);

  // てっぺんのつやつや特大チェリー 🍒
  ctx.font = '44px "M PLUS Rounded 1c"';
  ctx.textAlign = 'center';
  ctx.fillText('🍒', gx + gw / 2, gy - 8);

  // PARFAIT GOAL テキスト
  ctx.fillStyle = '#ff1493';
  ctx.font = '900 17px "M PLUS Rounded 1c"';
  ctx.textAlign = 'center';
  ctx.fillText('🍨 PARFAIT GOAL! 🍨', gx + gw / 2, gy + gh - 65);

  ctx.restore();
}

// ステージ3：特大コズミックスターケーキ城のゴール描画
function drawStage3Goal() {
  const gx = goal.x;
  const gy = goal.y;
  const gw = goal.width;
  const gh = goal.height;

  ctx.save();

  // ケーキ下段（コズミックパープル＆スターダストグラデーション）
  const cakeGrad = ctx.createLinearGradient(gx, gy, gx + gw, gy);
  cakeGrad.addColorStop(0, '#2d1454');
  cakeGrad.addColorStop(0.25, '#752db8');
  cakeGrad.addColorStop(0.5, '#2e7ee6');
  cakeGrad.addColorStop(0.75, '#be2de6');
  cakeGrad.addColorStop(1, '#ff66b3');
  ctx.fillStyle = cakeGrad;

  ctx.beginPath();
  ctx.roundRect(gx, gy + 55, gw, 95, 20);
  ctx.fill();
  ctx.strokeStyle = '#ffe5ff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 下段の星屑ドット
  ctx.fillStyle = '#ffffff';
  for (let sx = gx + 20; sx < gx + gw - 15; sx += 32) {
    ctx.beginPath();
    ctx.arc(sx, gy + 115, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // 生クリームのホイップ波（星屑ホイップ）
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  for (let x = gx; x < gx + gw; x += 28) {
    ctx.arc(x + 14, gy + 58, 10, 0, Math.PI);
  }
  ctx.fill();

  // ケーキ中段（オーロラピンク）
  const midGrad = ctx.createLinearGradient(gx + 24, gy + 15, gx + gw - 24, gy + 15);
  midGrad.addColorStop(0, '#ff70b8');
  midGrad.addColorStop(0.5, '#aa77ff');
  midGrad.addColorStop(1, '#66ddff');
  ctx.fillStyle = midGrad;
  ctx.beginPath();
  ctx.roundRect(gx + 24, gy + 14, gw - 48, 48, 14);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 中段を囲む黄金のプラネットリング
  ctx.save();
  ctx.translate(gx + gw / 2, gy + 38);
  ctx.rotate(-0.15);
  ctx.strokeStyle = 'rgba(255, 220, 100, 0.9)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(0, 0, gw * 0.44, 15, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 上部のスタータワー＆大きな金色の星 🌟
  ctx.font = '48px "M PLUS Rounded 1c"';
  ctx.textAlign = 'center';
  ctx.fillText('🌟', gx + gw / 2, gy - 6);

  // 左右のミニロケット＆お星さま飾り
  ctx.font = '24px sans-serif';
  ctx.fillText('🪐', gx + 30, gy + 10);
  ctx.fillText('🚀', gx + gw - 30, gy + 10);

  // COSMIC GOAL フラッグテキスト
  ctx.fillStyle = '#ffe853';
  ctx.shadowColor = '#ff66cc';
  ctx.shadowBlur = 8;
  ctx.font = '900 17px "M PLUS Rounded 1c"';
  ctx.textAlign = 'center';
  ctx.fillText('🌟 COSMIC GOAL! 🌟', gx + gw / 2, gy + 96);
  ctx.shadowBlur = 0;

  ctx.restore();
}

// プレイヤー（ピンクツインテール女の子 ＋ 背中のキャンディ）の描画
function drawPlayer() {
  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

  // 無敵時間中の半透明点滅
  if (player.invincibleTimer > 0) {
    if (Math.floor(player.invincibleTimer / 4) % 2 === 0) {
      ctx.globalAlpha = 0.35;
    }
  }

  // 向きに合わせて反転
  if (!player.facingRight) {
    ctx.scale(-1, 1);
  }

  // 走る時の揺れとジャンプ時の伸び縮み
  let twirl = 0;
  if (!player.isGrounded) {
    // ジャンプ中は少し縦長に伸びる
    ctx.scale(0.92, 1.08);
    twirl = 14;
  } else if (Math.abs(player.vx) > 0.5) {
    // 走っているときは左右に軽く揺れる
    const sway = Math.sin(player.walkFrame) * 0.08;
    ctx.rotate(sway);
    twirl = Math.sin(player.walkFrame) * 12;
  }

  // キャンディ色・ドレス・髪飾り・アクセサリーを反映した女の子の動的画像を取得して描画
  const currentImg = getGirlImage(player.candyColor, getDressColor(), getHeadwear(), getBackAcc());
  const w = 64;
  const h = 64;
  ctx.drawImage(currentImg, -w / 2, -h / 2 - 2, w, h);

  // しろキャンディ：ふわふわパラシュート描画 ☂️☁️
  if (player.isParachuting) {
    ctx.save();
    // パラシュート傘（マシュマロ風ドーム）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -36, 26, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ff99cc';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 傘のスカラップレース
    ctx.fillStyle = '#ffe0ef';
    ctx.beginPath();
    for (let x = -26; x < 26; x += 10.4) {
      ctx.arc(x + 5.2, -36, 5.2, 0, Math.PI);
    }
    ctx.fill();

    // 傘のひも
    ctx.strokeStyle = '#ffb3d9';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-22, -36);
    ctx.lineTo(-4, -14);
    ctx.moveTo(22, -36);
    ctx.lineTo(4, -14);
    ctx.stroke();

    // てっぺんのリボン
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎀', 0, -36);
    ctx.restore();
  }

  ctx.restore();
}

// ペットの追従ロジック
function updatePet() {
  const petId = getSelectedPet();
  const petInfo = PET_LIST.find(p => p.id === petId) || PET_LIST[0];

  if (petInfo.isFlying) {
    pet.floatTimer += 0.05;
    // 浮遊ペット（風船・雲・星など）：プレイヤーの後ろ斜め上をふわふわ飛ぶ
    const targetX = player.facingRight ? player.x - 36 : player.x + player.width + 12;
    const targetY = player.y - 20 + Math.sin(pet.floatTimer) * 8;

    pet.x += (targetX - pet.x) * 0.08;
    pet.y += (targetY - pet.y) * 0.08;
    pet.facingRight = player.facingRight;

    // ワープ（距離が離れすぎた時）
    if (Math.hypot(pet.x - player.x, pet.y - player.y) > 450) {
      pet.x = targetX;
      pet.y = targetY;
    }
  } else {
    // 歩行ペット（ねこ・うさぎ・いぬなど）：プレイヤーの後ろをトコトコ走る＆ジャンプ
    const targetX = player.facingRight ? player.x - 34 : player.x + player.width + 10;
    const dx = targetX - pet.x;

    if (Math.abs(dx) > 6) {
      pet.vx = dx * 0.14;
      pet.walkFrame += 0.22;
      pet.facingRight = dx > 0;
    } else {
      pet.vx *= 0.6;
    }
    pet.x += pet.vx;

    // 重力と垂直移動
    pet.vy += 0.52;
    pet.y += pet.vy;

    const groundY = player.y + player.height - 30;
    if (pet.y >= groundY) {
      pet.y = groundY;
      pet.vy = 0;
      pet.isGrounded = true;
    }

    // プレイヤーがジャンプしたらペットもピョンと跳ぶ！
    if (!player.isGrounded && player.vy < -4 && pet.isGrounded) {
      pet.vy = player.vy * 0.82;
      pet.isGrounded = false;
    }

    // ワープ（距離が離れすぎた時）
    if (Math.hypot(pet.x - player.x, pet.y - player.y) > 450) {
      pet.x = targetX;
      pet.y = groundY;
      pet.vx = 0;
      pet.vy = 0;
      pet.isGrounded = true;
    }
  }
}

// ペットの描画
function drawPet() {
  const petId = getSelectedPet();
  const petInfo = PET_LIST.find(p => p.id === petId) || PET_LIST[0];

  ctx.save();
  ctx.translate(pet.x + 15, pet.y + 15);

  if (!pet.facingRight) {
    ctx.scale(-1, 1);
  }

  // 歩行時のピョコピョコ跳ね
  let hopY = 0;
  if (!petInfo.isFlying && Math.abs(pet.vx) > 0.4) {
    hopY = -Math.abs(Math.sin(pet.walkFrame * 2)) * 6;
  }

  // 風船ペットのひもを描画
  if (petInfo.id.includes('balloon')) {
    ctx.strokeStyle = '#ff99bb';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.quadraticCurveTo(pet.facingRight ? -4 : 4, 22, 0, 30);
    ctx.stroke();
  }

  ctx.font = '28px "M PLUS Rounded 1c", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(petInfo.icon, 0, hopY);

  ctx.restore();
}

// パーティクル描画
function drawParticle(p) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, p.alpha);
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);

  if (p.type === 'sparkle' || p.type === 'star') {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.type === 'text') {
    ctx.font = 'bold 20px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeText(p.text, 0, 0);
    ctx.fillStyle = '#ff2b75';
    ctx.fillText(p.text, 0, 0);
  } else {
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
  }

  ctx.restore();
}

// ゲームループ
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}


// ==========================================
// 5. ゲーム制御・イベント連携
// ==========================================

function startGame() {
  const screens = ['start-screen', 'clear-screen', 'fail-screen', 'shop-screen', 'dressup-screen', 'petroom-screen', 'stage-screen'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (typeof petRoomInterval !== 'undefined' && petRoomInterval) {
    clearInterval(petRoomInterval);
  }

  sounds.init();
  sounds.startBgm();

  score = 0;
  gameTime = 0;
  document.getElementById('score-val').textContent = '0';
  document.getElementById('timer-val').textContent = '0';

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (gameState === 'PLAYING') {
      gameTime++;
      document.getElementById('timer-val').textContent = gameTime;
    }
  }, 1000);

  currentStage = loadCurrentStage();
  initStage(currentStage);

  const startCp = (checkpoints && checkpoints[1]) ? checkpoints[1] : { x: 80, y: 2180 };
  player.x = startCp.x;
  player.y = startCp.y;
  player.vx = 0;
  player.vy = 0;
  player.safeX = startCp.x;
  player.safeY = startCp.y;
  player.candyColor = loadCandyColor(); // 保存されたキャンディの色を引き継ぐ！
  player.currentTier = CANDY_RANK[player.candyColor] || 1;
  player.checkpointTier = 1;
  player.hp = player.maxHp;
  player.invincibleTimer = 0;
  updateHeartsUI();
  updateCandyUI(player.candyColor);
  updateCharPreview(player.candyColor);
  camera.x = 0;
  camera.y = stageHeight - V_HEIGHT;

  player.canDoubleJump = true;
  player.isParachuting = false;
  player.jumpHeldLastFrame = false;

  pet.x = player.x - 40;
  pet.y = player.y + player.height - 30;
  pet.vx = 0;
  pet.vy = 0;
  pet.isGrounded = true;

  gameState = 'PLAYING';
}

function reachGoal() {
  gameState = 'CLEAR';
  player.candyColor = 'rainbow';
  player.currentTier = 5;
  saveCandyColor('rainbow'); // 虹色レインボーキャンディをセーブ！
  updateCandyUI('rainbow');
  updateCharPreview('rainbow');
  sounds.playClear();
  if (timerInterval) clearInterval(timerInterval);

  // 大量の紙吹雪＆星パーティクル
  createParticles(player.x, player.y - 20, 'star', 40);
  createParticles(goal.x + goal.width / 2, goal.y, 'heart', 30);

  // クリア画面表示
  document.getElementById('clear-sweets').textContent = score;
  document.getElementById('clear-time').textContent = gameTime;
  
  // 星評価（スイーツ数に応じて）
  let stars = '⭐⭐⭐';
  if (score < 8) stars = '⭐';
  else if (score < 16) stars = '⭐⭐';
  document.getElementById('clear-rank').textContent = stars;

  // クリアしたステージ名の表示＆つぎのステージボタンの更新
  const clearStageEl = document.getElementById('clear-stage-name');
  if (clearStageEl) {
    if (currentStage === 3) {
      clearStageEl.textContent = '🌌 ステージ3：ほしぞらギャラクシー';
    } else if (currentStage === 2) {
      clearStageEl.textContent = '🍦 ステージ2：ひんやりフルーツパフェ';
    } else {
      clearStageEl.textContent = '🍰 ステージ1：スイーツマウンテン';
    }
  }
  const nextStageBtn = document.getElementById('btn-clear-next-stage');
  if (nextStageBtn) {
    if (currentStage === 1) {
      nextStageBtn.textContent = '⏩ ステージ2へいく！ 🍦';
    } else if (currentStage === 2) {
      nextStageBtn.textContent = '⏩ ステージ3へいく！ 🌌';
    } else {
      nextStageBtn.textContent = '👑 ぜんぶクリア！最初からあそぶ！ 🍰';
    }
  }

  setTimeout(() => {
    document.getElementById('clear-screen').classList.add('active');
  }, 500);
}


// ボタン・キーボード操作バインド
function setupControls() {
  // キーボード
  window.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = true;
    if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = true;
    if (['ArrowUp', 'Space', 'KeyW'].includes(e.code)) {
      keys.jump = true;
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = false;
    if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = false;
    if (['ArrowUp', 'Space', 'KeyW'].includes(e.code)) keys.jump = false;
  });

  // タッチボタンバインド関数
  function bindTouchButton(elId, keyName) {
    const el = document.getElementById(elId);
    if (!el) return;

    const press = (e) => {
      e.preventDefault();
      sounds.init();
      keys[keyName] = true;
      el.classList.add('pressed');
    };

    const release = (e) => {
      e.preventDefault();
      keys[keyName] = false;
      el.classList.remove('pressed');
    };

    el.addEventListener('touchstart', press, { passive: false });
    el.addEventListener('touchend', release, { passive: false });
    el.addEventListener('touchcancel', release, { passive: false });
    el.addEventListener('mousedown', press);
    el.addEventListener('mouseup', release);
    el.addEventListener('mouseleave', release);
  }

  bindTouchButton('btn-left', 'left');
  bindTouchButton('btn-right', 'right');
  bindTouchButton('btn-jump', 'jump');

  // スタート・リトライボタン
  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-clear-retry').addEventListener('click', startGame);
  document.getElementById('btn-fail-retry').addEventListener('click', retryFromCheckpoint);

  // ヘッダーボタン
  document.getElementById('btn-sound').addEventListener('click', () => {
    const enabled = sounds.toggleSound();
    document.getElementById('btn-sound').textContent = enabled ? '🎵' : '🔇';
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    if (confirm('さいしょからやりなおす？')) {
      startGame();
    }
  });
}


// 初期化実行
window.addEventListener('load', () => {
  currentStage = loadCurrentStage();
  initStage(currentStage);
  setupControls();
  requestAnimationFrame(gameLoop);
});
