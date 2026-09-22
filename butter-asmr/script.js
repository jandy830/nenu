// ===== バターASMR メインスクリプト =====

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
const MAX_CRACKS = 20; // この数に達したら「完全に割れた」

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

  // ランダムな方向にヒビ線を2〜3本生成
  const numLines = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < numLines; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = 15 + Math.random() * 30;
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;

    // 途中で曲がるヒビ
    const midX = (x + x2) / 2 + (Math.random() - 0.5) * 15;
    const midY = (y + y2) / 2 + (Math.random() - 0.5) * 15;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x} ${y} Q ${midX} ${midY} ${x2} ${y2}`);
    path.setAttribute('class', 'crack-line');
    // ランダムに太さを変える
    path.style.strokeWidth = (1 + Math.random() * 2) + 'px';
    crackLayer.appendChild(path);
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

      setTimeout(() => sparkle.remove(), 900);
    }, i * 100);
  }
}
