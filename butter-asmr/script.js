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
const waxShell = document.getElementById('wax-shell');
const crackLayer = document.getElementById('crack-layer');
const hintText = document.getElementById('hint-text');
const squishBanner = document.getElementById('squish-banner');
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
}

// 指を離したときの反発（ぽよよん！）
function releaseSquish() {
  if (!butterStage) return;
  butterStage.classList.remove('is-squeezing');
  butterStage.style.transform = '';
  butterStage.classList.remove('rebound');
  void butterStage.offsetWidth;
  butterStage.classList.add('rebound');

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
