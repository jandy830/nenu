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
// 2. 主人公キャラクター（ピンクツインテール女の子）SVG作成
// ==========================================
function createGirlSvgString(isBlinking = false, twirlAngle = 0) {
  // SVG文字列を生成（ツインテールの揺れと表情）
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
      </defs>

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

// SVG文字列をImageオブジェクトに変換
const girlImg = new Image();
girlImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(createGirlSvgString(false, 0));

// スタート画面のプレビューにも表示
document.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('char-preview');
  if (preview) {
    preview.innerHTML = createGirlSvgString(false, 8);
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

// カメラ
const camera = {
  x: 0,
  y: 0
};

// プレイヤー
const player = {
  x: 80,
  y: 280,
  width: 46,
  height: 54,
  vx: 0,
  vy: 0,
  speed: 4.8,
  jumpPower: -11.6,
  isGrounded: false,
  facingRight: true,
  walkFrame: 0,
  safeX: 80,
  safeY: 280,
  blinkTimer: 0,
  isBlinking: false
};

// 入力状態
const keys = {
  left: false,
  right: false,
  jump: false
};

// ステージデータ（お菓子の世界）
let platforms = [];
let items = [];
let goal = { x: 2600, y: 190, width: 90, height: 110 };
let particles = [];
let stageWidth = 2900;

// ステージ初期化
function initStage() {
  platforms = [
    // スタート地点のクッキー地面
    { x: 0, y: 360, width: 380, height: 90, type: 'cookie' },
    
    // サクサクウエハースのステップ
    { x: 440, y: 310, width: 130, height: 32, type: 'wafer' },
    { x: 630, y: 250, width: 140, height: 32, type: 'wafer' },
    
    // ふわふわマカロン（ピンク・ミント）
    { x: 840, y: 220, width: 100, height: 30, type: 'macaron', color: '#ffb3d9', vy: 0.8, minY: 190, maxY: 260 },
    { x: 1010, y: 270, width: 150, height: 36, type: 'cookie' },

    // キャンディステップの階段
    { x: 1220, y: 320, width: 120, height: 32, type: 'wafer' },
    { x: 1400, y: 260, width: 130, height: 32, type: 'wafer' },
    { x: 1590, y: 200, width: 110, height: 30, type: 'macaron', color: '#b3f0ff', vy: -0.9, minY: 160, maxY: 240 },

    // 巨大チョコチップクッキーの丘
    { x: 1760, y: 290, width: 220, height: 160, type: 'cookie' },
    { x: 2040, y: 230, width: 140, height: 32, type: 'wafer' },
    { x: 2240, y: 270, width: 120, height: 30, type: 'macaron', color: '#ffd9b3', vy: 0.7, minY: 220, maxY: 300 },

    // ゴール手前の大ケーキ広場
    { x: 2420, y: 330, width: 480, height: 120, type: 'cake_ground' }
  ];

  // あつめるスイーツアイテム（いちご・キャンディ・星）
  items = [
    { x: 200, y: 310, type: '🍓', collected: false, floatOffset: 0 },
    { x: 490, y: 260, type: '🍬', collected: false, floatOffset: 1 },
    { x: 690, y: 200, type: '⭐', collected: false, floatOffset: 2 },
    { x: 880, y: 160, type: '🍓', collected: false, floatOffset: 3 },
    { x: 1070, y: 220, type: '🍭', collected: false, floatOffset: 4 },
    { x: 1270, y: 270, type: '🍓', collected: false, floatOffset: 0 },
    { x: 1450, y: 210, type: '⭐', collected: false, floatOffset: 1 },
    { x: 1630, y: 150, type: '🍬', collected: false, floatOffset: 2 },
    { x: 1850, y: 240, type: '🍓', collected: false, floatOffset: 3 },
    { x: 2100, y: 180, type: '🍭', collected: false, floatOffset: 4 },
    { x: 2290, y: 220, type: '⭐', collected: false, floatOffset: 1 },
    { x: 2520, y: 280, type: '🍓', collected: false, floatOffset: 2 }
  ];

  // ゴール位置（大ケーキ）
  goal = {
    x: 2660,
    y: 200,
    width: 140,
    height: 130
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

      // 安全な復帰ポイントを更新（落下救済用）
      if (p.type === 'cookie' || p.type === 'cake_ground') {
        player.safeX = Math.max(40, player.x);
        player.safeY = player.y;
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

  // 6. 穴に落ちたときの処理（やさしい復帰）
  if (player.y > V_HEIGHT + 60) {
    sounds.playFall();
    createParticles(player.safeX + 20, player.safeY + 20, 'heart', 8);
    player.x = player.safeX;
    player.y = player.safeY - 10;
    player.vx = 0;
    player.vy = 0;
  }

  // 7. ゴール判定（大ケーキに到達）
  if (
    player.x + player.width > goal.x + 20 &&
    player.x < goal.x + goal.width - 10 &&
    player.y + player.height > goal.y + 10
  ) {
    reachGoal();
  }

  // 8. カメラの追従
  const targetCamX = player.x - V_WIDTH * 0.35;
  camera.x += (targetCamX - camera.x) * 0.1;
  if (camera.x < 0) camera.x = 0;
  if (camera.x > stageWidth - V_WIDTH) camera.x = stageWidth - V_WIDTH;

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

  // 背景描画（パステルピンクの空とお菓子の雲）
  drawBackground();

  ctx.save();
  ctx.translate(-Math.floor(camera.x), 0);

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
}

// 背景とお菓子の雲
function drawBackground() {
  // パステルピンク空グラデーション
  const grad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
  grad.addColorStop(0, '#ffd9ec');
  grad.addColorStop(0.6, '#fff0f7');
  grad.addColorStop(1, '#fde2ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

  // ふわふわマシュマロの雲（パララックス背景）
  const cloudOffset = (camera.x * 0.2) % 600;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  for (let i = -1; i < 3; i++) {
    const cx = i * 400 - cloudOffset;
    drawMarshmallowCloud(cx + 80, 70, 70);
    drawMarshmallowCloud(cx + 280, 110, 50);
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
  if (p.type === 'cookie' || p.type === 'cake_ground') {
    // クッキー（ビスケット）地面
    ctx.fillStyle = '#f6be79'; // こんがりクッキー色
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.width, p.height, [16, 16, 0, 0]);
    ctx.fill();

    // ビスケットの縁取り
    ctx.strokeStyle = '#e09e52';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 生クリームのトッピング波
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    for (let x = p.x; x < p.x + p.width; x += 24) {
      ctx.arc(x + 12, p.y + 4, 8, 0, Math.PI);
    }
    ctx.fill();

    // チョコチップ模様
    ctx.fillStyle = '#7a4220';
    for (let x = p.x + 20; x < p.x + p.width - 15; x += 36) {
      ctx.beginPath();
      ctx.arc(x, p.y + 25, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (p.type === 'wafer') {
    // サクサクウエハース
    ctx.fillStyle = '#f9cd94';
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.width, p.height, 10);
    ctx.fill();
    ctx.strokeStyle = '#dca76a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 格子模様
    ctx.fillStyle = 'rgba(215, 155, 95, 0.4)';
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

// ゴール（大きないちごケーキ）
function drawGoal() {
  const gx = goal.x;
  const gy = goal.y;

  // ケーキ下段
  ctx.fillStyle = '#fff4fa';
  ctx.beginPath();
  ctx.roundRect(gx, gy + 50, goal.width, 80, 16);
  ctx.fill();
  ctx.strokeStyle = '#ff99c8';
  ctx.lineWidth = 4;
  ctx.stroke();

  // スポンジとイチゴジャムの層
  ctx.fillStyle = '#ff5990';
  ctx.fillRect(gx + 8, gy + 85, goal.width - 16, 6);

  // ケーキ上段
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(gx + 18, gy + 10, goal.width - 36, 45, 12);
  ctx.fill();
  ctx.stroke();

  // 上の大きないちごとお祝い旗
  ctx.font = '34px "M PLUS Rounded 1c"';
  ctx.textAlign = 'center';
  ctx.fillText('🍓', gx + goal.width / 2, gy + 5);

  // GOALテキストフラッグ
  ctx.fillStyle = '#ff2b75';
  ctx.font = 'bold 18px "M PLUS Rounded 1c"';
  ctx.fillText('GOAL!', gx + goal.width / 2, gy + 75);
}

// プレイヤー（ピンクツインテール女の子）の描画
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

  // 女の子のSVGをCanvasに描画（動的ツインテール）
  // 描画サイズを調整
  const w = 64;
  const h = 64;
  ctx.drawImage(girlImg, -w / 2, -h / 2 - 2, w, h);

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
  player.y = 280;
  player.vx = 0;
  player.vy = 0;
  player.safeX = 80;
  player.safeY = 280;
  camera.x = 0;

  gameState = 'PLAYING';
}

function reachGoal() {
  gameState = 'CLEAR';
  sounds.playClear();
  if (timerInterval) clearInterval(timerInterval);

  // 大量の紙吹雪＆星パーティクル
  createParticles(player.x, player.y - 20, 'star', 30);
  createParticles(goal.x + goal.width / 2, goal.y, 'heart', 20);

  // クリア画面表示
  document.getElementById('clear-sweets').textContent = score;
  document.getElementById('clear-time').textContent = gameTime;
  
  // 星評価（スイーツ数に応じて）
  let stars = '⭐⭐⭐';
  if (score < 4) stars = '⭐';
  else if (score < 8) stars = '⭐⭐';
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
