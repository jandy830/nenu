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
// 2. 主人公キャラクター（ピンクツインテール女の子 ＋ 背中のキャンディ）SVG作成
// ==========================================
function createGirlSvgString(isBlinking = false, twirlAngle = 0, candyColor = 'red') {
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
          <stop offset="0%" stop-color="#ff6bb5" />
          <stop offset="100%" stop-color="#ff3388" />
        </linearGradient>
        <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff3366" />
          <stop offset="25%" stop-color="#ffbb00" />
          <stop offset="50%" stop-color="#33cc66" />
          <stop offset="75%" stop-color="#3399ff" />
          <stop offset="100%" stop-color="#cc33ff" />
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
      <path d="M 40 62 L 32 86 L 68 86 L 60 62 Z" fill="url(#dressGrad)" />
      <!-- レースのエプロン -->
      <path d="M 44 65 L 40 84 L 60 84 L 56 65 Z" fill="#ffffff" opacity="0.95" />
      <path d="M 47 70 L 53 70" stroke="#ff88bb" stroke-width="2" stroke-linecap="round" />

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

      <!-- 頭のリボン -->
      <g transform="translate(50, 24)">
        <polygon points="0,0 -14,-7 -12,7" fill="#ff3377" />
        <polygon points="0,0 14,-7 12,7" fill="#ff3377" />
        <circle cx="0" cy="0" r="4" fill="#ffe066" />
      </g>
    </svg>
  `;
}

// キャンディ色ごとのImageオブジェクトキャッシュ
const girlImages = {};
['red', 'yellow', 'black', 'white', 'rainbow'].forEach(c => {
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(createGirlSvgString(false, 0, c));
  girlImages[c] = img;
});

// スタート画面のプレビューにも表示
document.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('char-preview');
  if (preview) {
    preview.innerHTML = createGirlSvgString(false, 8, 'red');
    const svgEl = preview.querySelector('svg');
    if (svgEl) {
      svgEl.style.width = '110px';
      svgEl.style.height = '110px';
      svgEl.style.filter = 'drop-shadow(0 6px 12px rgba(255, 100, 160, 0.3))';
    }
  }
});


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
  candyColor: 'red', // 'red' | 'yellow' | 'black' | 'white' | 'rainbow'
  currentTier: 1,    // 1: 赤, 2: 黄, 3: 黒, 4: 白, 5: レインボー
  checkpointTier: 1, // 到達した最新のチェックポイント（旗）
  blinkTimer: 0,
  isBlinking: false
};

// 入力状態
const keys = {
  left: false,
  right: false,
  jump: false
};

// 4色のチェックポイント（落下時の復帰場所＆キャンディの色）
const checkpoints = {
  1: { x: 80, y: 2180, color: 'red', name: 'あかステージ' },
  2: { x: 1400, y: 1750, color: 'yellow', name: 'きいろステージ' },
  3: { x: 2360, y: 1260, color: 'black', name: 'くろステージ' },
  4: { x: 3450, y: 800, color: 'white', name: 'しろステージ' }
};

// キャンディUIの更新
function updateCandyUI(color) {
  const dot = document.getElementById('candy-dot');
  const name = document.getElementById('candy-name');
  if (!dot || !name) return;

  const map = {
    red: { icon: '🔴', text: 'あか' },
    yellow: { icon: '🟡', text: 'きいろ' },
    black: { icon: '⚫', text: 'くろ' },
    white: { icon: '⚪', text: 'しろ' },
    rainbow: { icon: '🌈', text: 'レインボー' }
  };

  const info = map[color] || map.red;
  dot.textContent = info.icon;
  name.textContent = info.text;

  if (color === 'rainbow') {
    name.classList.add('rainbow-text');
  } else {
    name.classList.remove('rainbow-text');
  }
}

// ステージデータ（お菓子の世界：4つのカラーエリア）
let platforms = [];
let items = [];
let goal = { x: 4850, y: 220, width: 160, height: 140 };
let particles = [];
let stageWidth = 5200;
let stageHeight = 2400;

// ステージ初期化
function initStage() {
  stageWidth = 5200;
  stageHeight = 2400;

  platforms = [
    // ========================================================
    // エリア1: あか色ステージ 🍓（地上 y: 2250〜1850）
    // ========================================================
    { x: 0, y: 2250, width: 440, height: 180, type: 'cookie', tier: 1, colorTier: 'red' },
    { x: 490, y: 2180, width: 130, height: 32, type: 'wafer', tier: 1, colorTier: 'red' },
    { x: 680, y: 2100, width: 140, height: 32, type: 'wafer', tier: 1, colorTier: 'red' },
    { x: 880, y: 2020, width: 110, height: 30, type: 'macaron', tier: 1, color: '#ff2a6d', vy: 0.8, minY: 1980, maxY: 2060, colorTier: 'red' },
    { x: 1060, y: 1950, width: 130, height: 36, type: 'cookie', tier: 1, colorTier: 'red' },
    // 赤から黄色へ届くステップ！
    { x: 1230, y: 1870, width: 100, height: 28, type: 'wafer', tier: 1, colorTier: 'red' },

    // ========================================================
    // エリア2: きいろステージ 🍋（y: 1850〜1400）
    // （ねぬちゃんの要望：サイズを小さくコンパクトに！）
    // ========================================================
    // きいろチェックポイント広場（コンパクト）
    { x: 1380, y: 1790, width: 130, height: 38, type: 'cookie', tier: 2, colorTier: 'yellow', isCheckPoint: true },
    { x: 1560, y: 1710, width: 95, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },
    { x: 1710, y: 1630, width: 85, height: 24, type: 'macaron', tier: 2, color: '#ffdd00', vy: -0.8, minY: 1590, maxY: 1670, colorTier: 'yellow' },
    { x: 1850, y: 1550, width: 95, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },
    { x: 2000, y: 1470, width: 110, height: 36, type: 'cookie', tier: 2, colorTier: 'yellow' },
    // 黄色から黒へ届くステップ
    { x: 2160, y: 1395, width: 95, height: 26, type: 'wafer', tier: 2, colorTier: 'yellow' },

    // ========================================================
    // エリア3: くろ色ステージ 🍫（y: 1400〜950）
    // ========================================================
    // くろチェックポイント広場
    { x: 2310, y: 1320, width: 200, height: 48, type: 'cookie', tier: 3, colorTier: 'black', isCheckPoint: true },
    { x: 2580, y: 1240, width: 130, height: 32, type: 'wafer', tier: 3, colorTier: 'black' },
    { x: 2770, y: 1160, width: 120, height: 30, type: 'macaron', tier: 3, color: '#2b1b17', vy: 0.9, minY: 1110, maxY: 1210, colorTier: 'black' },
    { x: 2960, y: 1080, width: 140, height: 32, type: 'wafer', tier: 3, colorTier: 'black' },
    { x: 3160, y: 1010, width: 200, height: 50, type: 'cookie', tier: 3, colorTier: 'black' },

    // ========================================================
    // エリア4: しろ色ステージ ☁️（y: 950〜450）
    // ========================================================
    // しろチェックポイント広場
    { x: 3430, y: 860, width: 220, height: 50, type: 'cookie', tier: 4, colorTier: 'white', isCheckPoint: true },
    { x: 3700, y: 780, width: 130, height: 32, type: 'wafer', tier: 4, colorTier: 'white' },
    { x: 3890, y: 700, width: 120, height: 30, type: 'macaron', tier: 4, color: '#ffffff', vy: -0.8, minY: 650, maxY: 750, colorTier: 'white' },
    { x: 4080, y: 620, width: 140, height: 32, type: 'wafer', tier: 4, colorTier: 'white' },
    { x: 4280, y: 550, width: 160, height: 40, type: 'cookie', tier: 4, colorTier: 'white' },

    // 天空への架け橋（虹のブリッジ）
    { x: 4500, y: 460, width: 150, height: 32, type: 'wafer', tier: 4, colorTier: 'rainbow' },

    // ========================================================
    // エリア5: 天空のレインボーケーキ城 🏰🌈（y: 350）
    // ========================================================
    { x: 4720, y: 360, width: 500, height: 180, type: 'cake_ground', tier: 5, colorTier: 'rainbow' }
  ];

  // あつめるスイーツアイテム（各エリアにたっぷり配置）
  items = [
    // 赤エリア
    { x: 220, y: 2200, type: '🍓', collected: false, floatOffset: 0 },
    { x: 370, y: 2200, type: '🍒', collected: false, floatOffset: 1 },
    { x: 550, y: 2130, type: '⭐', collected: false, floatOffset: 2 },
    { x: 740, y: 2050, type: '🍓', collected: false, floatOffset: 3 },
    { x: 930, y: 1970, type: '🍭', collected: false, floatOffset: 4 },

    // 黄エリア
    { x: 1430, y: 1730, type: '🍋', collected: false, floatOffset: 0 },
    { x: 1600, y: 1650, type: '🍌', collected: false, floatOffset: 1 },
    { x: 1740, y: 1570, type: '⭐', collected: false, floatOffset: 2 },
    { x: 1890, y: 1490, type: '🍯', collected: false, floatOffset: 3 },
    { x: 2045, y: 1410, type: '💛', collected: false, floatOffset: 4 },

    // 黒エリア
    { x: 2440, y: 1270, type: '🍫', collected: false, floatOffset: 0 },
    { x: 2670, y: 1190, type: '🍪', collected: false, floatOffset: 1 },
    { x: 2850, y: 1110, type: '⭐', collected: false, floatOffset: 2 },
    { x: 3050, y: 1030, type: '☕', collected: false, floatOffset: 3 },
    { x: 3260, y: 960, type: '🖤', collected: false, floatOffset: 4 },

    // 白エリア
    { x: 3530, y: 810, type: '☁️', collected: false, floatOffset: 0 },
    { x: 3760, y: 730, type: '🧁', collected: false, floatOffset: 1 },
    { x: 3940, y: 650, type: '⭐', collected: false, floatOffset: 2 },
    { x: 4140, y: 570, type: '🍦', collected: false, floatOffset: 3 },
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


// ==========================================
// 4. ゲームの更新と描画
// ==========================================

function update() {
  if (gameState !== 'PLAYING') {
    updateParticles();
    return;
  }

  // 1. プレイヤーの移動
  if (keys.left) {
    player.vx = -player.speed;
    player.facingRight = false;
    player.walkFrame += 0.2;
  } else if (keys.right) {
    player.vx = player.speed;
    player.facingRight = true;
    player.walkFrame += 0.2;
  } else {
    player.vx *= 0.65; // 摩擦でスムーズに停止
    if (Math.abs(player.vx) < 0.2) player.vx = 0;
  }

  // 2. ジャンプ
  if (keys.jump && player.isGrounded) {
    player.vy = player.jumpPower;
    player.isGrounded = false;
    sounds.playJump();
    createParticles(player.x + player.width / 2, player.y + player.height, 'dust', 4);
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

  // 3. 水平方向の移動と衝突判定
  player.x += player.vx;
  if (player.x < 0) player.x = 0;

  // 4. 垂直方向の移動と足場接地判定
  player.y += player.vy;
  player.isGrounded = false;

  platforms.forEach(p => {
    // 上から足場に乗ったかどうかの判定（ワンウェイ足場）
    const prevY = player.y - player.vy;
    if (
      player.x + player.width > p.x + 8 &&
      player.x < p.x + p.width - 8 &&
      prevY + player.height <= p.y + 10 &&
      player.y + player.height >= p.y
    ) {
      player.y = p.y - player.height;
      player.vy = 0;
      player.isGrounded = true;

      // 足場が動いている場合、プレイヤーも連動
      if (p.type === 'macaron' && p.vy) {
        player.y += p.vy;
      }

      // チェックポイント（旗）に乗ったら復帰地点を更新＆バナー表示！
      if (p.isCheckPoint && p.tier) {
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
        player.candyColor = tierColorMap[p.tier];
        updateCandyUI(player.candyColor);
        sounds.playCandyLevelUp();
        createParticles(player.x + player.width / 2, player.y, 'star', 25);
      }

      // 安全な復帰ポイントを更新（落下救済用：クッキーやウエハースなど安定した足場）
      if (p.type !== 'macaron') {
        player.safeX = Math.max(40, p.x + p.width / 2 - player.width / 2);
        player.safeY = p.y - player.height;
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
        score += 1;
        document.getElementById('score-val').textContent = score;
        sounds.playCollect();
        createParticles(itX + 10, itY + 10, 'sparkle', 10);
      }
    }
  });

  // 6. 穴に落ちたときの処理（取った最新のチェックポイントの旗から、その色のキャンディで復活！）
  if (player.y > player.safeY + 360 || player.y > stageHeight + 40) {
    sounds.playFall();

    // 取った最新のチェックポイント（旗）から再開！
    const currentCpTier = player.checkpointTier || player.currentTier || 1;
    player.currentTier = currentCpTier;
    const tierColorMap = { 1: 'red', 2: 'yellow', 3: 'black', 4: 'white' };
    player.candyColor = tierColorMap[currentCpTier] || 'red';
    updateCandyUI(player.candyColor);

    const cp = checkpoints[currentCpTier] || checkpoints[1];
    player.x = cp.x;
    player.y = cp.y;
    player.safeX = cp.x;
    player.safeY = cp.y;
    player.vx = 0;
    player.vy = 0;

    createParticles(player.x + player.width / 2, player.y + player.height / 2, 'heart', 12);
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
    p.vy += 0.25; // パーティクルの重力
    p.alpha -= 0.02;
    p.rot += p.vRot;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

// 描画
function render() {
  ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

  // 背景描画（高度に応じたパステル空とお菓子の雲）
  drawBackground();

  ctx.save();
  ctx.translate(-Math.floor(camera.x), -Math.floor(camera.y));

  // 足場の描画
  platforms.forEach(drawPlatform);

  // スイーツアイテムの描画
  items.forEach(drawItem);

  // ゴールの描画（ケーキタワー）
  drawGoal();

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

// 背景とお菓子の雲（各エリアの高度に応じた美しいグラデーション）
function drawBackground() {
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

// ゴール（特大レインボーケーキ城）
function drawGoal() {
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

// プレイヤー（ピンクツインテール女の子 ＋ 背中のキャンディ）の描画
function drawPlayer() {
  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

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

  // キャンディ色に応じた女の子の画像を取得して描画
  const currentImg = girlImages[player.candyColor] || girlImages.red;
  const w = 64;
  const h = 64;
  ctx.drawImage(currentImg, -w / 2, -h / 2 - 2, w, h);

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
  } else if (p.type === 'heart') {
    ctx.font = `${Math.floor(p.size * 2)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', 0, 0);
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
  document.getElementById('start-screen').classList.remove('active');
  document.getElementById('clear-screen').classList.remove('active');
  document.getElementById('fail-screen').classList.remove('active');

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

  initStage();
  player.x = 80;
  player.y = 2180;
  player.vx = 0;
  player.vy = 0;
  player.safeX = 80;
  player.safeY = 2180;
  player.candyColor = 'red';
  player.currentTier = 1;
  player.checkpointTier = 1;
  updateCandyUI('red');
  camera.x = 0;
  camera.y = stageHeight - V_HEIGHT;

  gameState = 'PLAYING';
}

function reachGoal() {
  gameState = 'CLEAR';
  player.candyColor = 'rainbow';
  player.currentTier = 5;
  updateCandyUI('rainbow');
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
  document.getElementById('btn-fail-retry').addEventListener('click', startGame);

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
  initStage();
  setupControls();
  requestAnimationFrame(gameLoop);
});
