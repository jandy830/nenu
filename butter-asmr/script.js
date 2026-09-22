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

  // パキッ音（ワックスが割れる音）
  playCrack(progress) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // パキッの瞬間（硬いワックスが割れるアタック）
    const attackLen = 0.012;
    const attackSize = Math.floor(this.ctx.sampleRate * attackLen);
    const attackBuf = this.ctx.createBuffer(1, attackSize, this.ctx.sampleRate);
    const attackData = attackBuf.getChannelData(0);
    for (let i = 0; i < attackSize; i++) {
      // 非常に急峻な減衰で「パキッ」感
      attackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / attackSize, 6);
    }
    const attack = this.ctx.createBufferSource();
    attack.buffer = attackBuf;

    const attackGain = this.ctx.createGain();
    attackGain.gain.setValueAtTime(0.6 + progress * 0.2, now);
    attackGain.gain.exponentialRampToValueAtTime(0.001, now + attackLen);

    attack.connect(attackGain);
    attackGain.connect(this.ctx.destination);
    attack.start(now);
    attack.stop(now + attackLen);

    // パリパリの余韻（ワックスの細かい破片が広がる音）
    const tailLen = 0.05 + progress * 0.03;
    const tailSize = Math.floor(this.ctx.sampleRate * tailLen);
    const tailBuf = this.ctx.createBuffer(1, tailSize, this.ctx.sampleRate);
    const tailData = tailBuf.getChannelData(0);
    for (let i = 0; i < tailSize; i++) {
      // まばらなパチパチパルス
      if (Math.random() < 0.12) {
        tailData[i] = (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.5) * Math.pow(1 - i / tailSize, 2);
      }
    }
    const tail = this.ctx.createBufferSource();
    tail.buffer = tailBuf;

    // バンドパスで乾いた硬い質感に
    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 5000 - progress * 2000;
    bpf.Q.value = 0.8;

    const tailGain = this.ctx.createGain();
    tailGain.gain.setValueAtTime(0.35, now + 0.005);
    tailGain.gain.exponentialRampToValueAtTime(0.001, now + tailLen);

    tail.connect(bpf);
    bpf.connect(tailGain);
    tailGain.connect(this.ctx.destination);
    tail.start(now + 0.005);
    tail.stop(now + tailLen);
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
}

const sound = new SoundManager();

// ----- バターデータ -----
const BUTTERS = {
  normal: {
    name: 'ふつうのバター',
    emoji: '🧈',
    cssClass: '',
    labelColor: '#ff8c42',
  },
  choco: {
    name: 'チョコバター',
    emoji: '🍫',
    cssClass: 'butter-choco',
    labelColor: '#7a5020',
  },
  ichigo: {
    name: 'いちごバター',
    emoji: '🍓',
    cssClass: 'butter-ichigo',
    labelColor: '#ff69b4',
  },
  matcha: {
    name: 'まっちゃバター',
    emoji: '🍵',
    cssClass: 'butter-matcha',
    labelColor: '#5b8a3c',
  },
};

// ----- State -----
let currentButter = null;
let crackCount = 0;
const MAX_CRACKS = 50; // この数に達したら「完全に割れた」

// ----- DOM -----
const selectScreen = document.getElementById('select-screen');
const playScreen = document.getElementById('play-screen');
const butterLabel = document.getElementById('butter-label');
const butterSvg = document.getElementById('butter-svg');
const butterArea = document.getElementById('butter-area');
const crackLayer = document.getElementById('crack-layer');
const hintText = document.getElementById('hint-text');
const completeButtons = document.getElementById('complete-buttons');
const btnBack = document.getElementById('btn-back');
const btnRetry = document.getElementById('btn-retry');
const btnChange = document.getElementById('btn-change');

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

  // バター色を適用
  document.querySelectorAll('.butter-choco, .butter-ichigo, .butter-matcha').forEach(el => {
    // body から既存のバタークラスを除去
  });
  document.body.className = data.cssClass;

  // ラベル更新
  butterLabel.textContent = data.emoji + ' ' + data.name;
  butterLabel.style.color = data.labelColor;

  // リセット
  resetButter();

  // 画面切り替え
  showScreen(playScreen);
}

function goToSelect() {
  document.body.className = '';
  showScreen(selectScreen);
}

function resetButter() {
  crackCount = 0;
  crackLayer.innerHTML = '';
  hintText.style.display = '';
  completeButtons.classList.add('hidden');
  butterSvg.style.opacity = '1';
  butterSvg.style.transform = '';

  // かけら・キラキラを除去
  butterArea.querySelectorAll('.fragment, .sparkle').forEach(el => el.remove());
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
  resetButter();
});

// ----- べつのバター -----
btnChange.addEventListener('click', goToSelect);

// ----- タップ/スワイプでヒビ -----
// SVG座標への変換
function getLocalPoint(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svgEl.getScreenCTM().inverse();
  return pt.matrixTransform(ctm);
}

// ヒビ線を追加
function addCrack(x, y) {
  if (crackCount >= MAX_CRACKS) return;

  crackCount++;

  // パキッ音を鳴らす（進捗に応じて音が変化）
  sound.playCrack(crackCount / MAX_CRACKS);

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

  // ヒントを消す
  if (crackCount >= 2) {
    hintText.style.display = 'none';
  }

  // 完成チェック
  if (crackCount >= MAX_CRACKS) {
    onComplete();
  }
}

// ----- タッチ/マウスイベント -----
let isSwiping = false;

butterSvg.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  isSwiping = true;
  const pt = getLocalPoint(butterSvg, e.clientX, e.clientY);
  addCrack(pt.x, pt.y);
});

butterSvg.addEventListener('pointermove', (e) => {
  if (!isSwiping) return;
  e.preventDefault();
  const pt = getLocalPoint(butterSvg, e.clientX, e.clientY);
  addCrack(pt.x, pt.y);
});

butterSvg.addEventListener('pointerup', () => {
  isSwiping = false;
});

butterSvg.addEventListener('pointerleave', () => {
  isSwiping = false;
});

// タッチスクロールを防止
butterArea.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

// ----- 完成演出 -----
function onComplete() {
  // 割れた音を鳴らす
  sound.playBreak();

  // バターが揺れる
  butterSvg.style.transition = 'transform 0.3s ease, opacity 0.5s ease';
  butterSvg.style.transform = 'scale(1.05)';

  setTimeout(() => {
    butterSvg.style.transform = 'scale(0.95)';
    butterSvg.style.opacity = '0.3';

    // かけらを飛ばす
    spawnFragments();

    // キラキラ
    spawnSparkles();

    // ボタン表示
    setTimeout(() => {
      completeButtons.classList.remove('hidden');
    }, 400);
  }, 200);
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
