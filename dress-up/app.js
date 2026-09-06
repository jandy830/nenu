// Yumekawa Dress-up App Main Engine (Multi-Avatar HD Photo Engine Edition)

// --- State Management ---
const state = {
  currentCategory: 'hair',
  hair: 'flowing_long',
  hairColor: '#c084fc',
  face: 'smile',
  top: 'magical_dress',
  topColor: '#ff9ebb',
  bottom: 'none',
  bottomColor: '#a7f3d0',
  shoes: 'ribbon_pumps',
  shoesColor: '#ff9ebb',
  accessory: 'angel_wings',
  accessoryColor: '#fef08a',
  background: 'royal_palace',
  activeFriend: 'nyanko',
  activeTwinPartner: 'nyanko',
  friendsMode: 'party',
  walkPosX: 0,
  twinWalkPosX: 0,
  isAdmin: false
};

// Timers for walking animations
let walkAnimTimer = null;
let twinWalkAnimTimer = null;

// --- Preset FAQs & Custom FAQs Storage ---
const defaultFaqs = [
  { q: '❓ お洋服はどうやって着替えるの？', a: '🌸 「👗 トップス」や「👖 ボトムス」のタブを押して、好きなお洋服をタップするだけで一瞬で変身するよ！' },
  { q: '❓ BGM（音楽）を切り替えるにはどうすればいい？', a: '🎵 「🎵 BGM: オン」ボタンを押すと音楽が鳴るよ！となりのメニューから好きな曲を選べるよ！' },
  { q: '❓ 「ともだち広場」や「双子公園」ってなぁに？', a: '👯‍♀️ にゃんこちゃん達みんなでお散歩したり、ふたり並んでおそろいコーデが作れる特別なステージだよ！' },
  { q: '❓ 作ったコーディネートは保存できる？', a: '📸 「📸 しゃしんを保存」を押すと、あなたの作ったコーデがきれいな画像として保存されるよ！' }
];

let customFaqs = JSON.parse(localStorage.getItem('yumekawa_custom_faqs') || '[]');
let userQuestions = JSON.parse(localStorage.getItem('yumekawa_user_questions') || '[]');

// --- Available Palette Colors ---
const paletteColors = [
  '#ff9ebb', '#c084fc', '#a7f3d0', '#fef08a', '#bae6fd',
  '#ffb3ba', '#38bdf8', '#e879f9', '#f43f5e', '#ffffff', '#4b5563', '#fdba74'
];

// --- Items Registry ---
const itemCatalog = {
  hair: [
    { id: 'flowing_long', name: 'ふんわりロング', icon: '👩' },
    { id: 'twintails', name: 'ツインテール', icon: '👧' },
    { id: 'odango', name: 'ふたごおだんご', icon: '🍡' },
    { id: 'hime_cut', name: '姫カットロング', icon: '👸' },
    { id: 'side_ponytail', name: 'ポニーテール', icon: '👱‍♀️' },
    { id: 'cute_bob', name: 'おうちボブ', icon: '💇‍♀️' },
    { id: 'soft_waves', name: 'ゆるふわウェーブ', icon: '🌊' },
    { id: 'cat_ears_hair', name: 'ねこみみヘア', icon: '🐱' },
    { id: 'ribbon_twins', name: 'リボンツイン', icon: '🎀' },
    { id: 'unicorn_hair', name: 'ユニコーンヘア', icon: '🦄' },
    { id: 'rainbow_long', name: 'レインボーロング', icon: '🌈' },
    { id: 'sakura_short', name: 'さくらショート', icon: '🌸' }
  ],
  face: [
    { id: 'smile', name: 'キラキラ大粒目', icon: '😊' },
    { id: 'wink', name: 'キュートウインク', icon: '😉' },
    { id: 'heart_eyes', name: 'ときめきハート目', icon: '😍' },
    { id: 'double_heart', name: 'ゆめかわダブルハート', icon: '💖' },
    { id: 'teary_sparkle', name: 'うるうるぴえん顔', icon: '🥺' },
    { id: 'star_eyes', name: 'キラリ★スター目', icon: '⭐' },
    { id: 'cat_face', name: 'あまえんぼ猫目', icon: '😸' },
    { id: 'galaxy_eyes', name: 'ギャラクシー宇宙目', icon: '🌌' },
    { id: 'sakura_eyes', name: 'さくらフラワー目', icon: '🌸' },
    { id: 'surprised', name: 'ビックリおめめ', icon: '😮' },
    { id: 'tehepero', name: 'てへぺろペロリ', icon: '😜' },
    { id: 'sleepy', name: 'すやすや夢の中', icon: '😴' }
  ],
  tops: [
    { id: 'magical_dress', name: 'ピンクの魔法ワンピ', icon: '👗', isDress: true },
    { id: 'strawberry_dress', name: 'いちごドレス', icon: '🍓', isDress: true },
    { id: 'starry_lolita', name: 'ほしぞらドレス', icon: '🌙', isDress: true },
    { id: 'sakura_princess', name: 'さくら姫ドレス', icon: '🌸', isDress: true },
    { id: 'witch_dress', name: '魔法使いドレス', icon: '🎃', isDress: true },
    { id: 'alice_dress', name: 'アリス水色ドレス', icon: '❄️', isDress: true },
    { id: 'maid_dress', name: 'ゆめかわメイド', icon: '🎀', isDress: true },
    { id: 'cat_hoodie_dress', name: 'ねこパーカーワンピ', icon: '🐱', isDress: true },
    { id: 'panda_hoodie', name: 'パンダパーカーワンピ', icon: '🐼', isDress: true },
    { id: 'yumekawa_tshirt', name: 'ゆめかわTシャツ', icon: '👕', isDress: false },
    { id: 'frill_blouse', name: 'フリルブラウス', icon: '👚', isDress: false },
    { id: 'sailor_shirt', name: 'セーラー服', icon: '🎀', isDress: false },
    { id: 'pastel_hoodie', name: 'パステルパーカー', icon: '🧥', isDress: false },
    { id: 'strawberry_top', name: 'いちごトップ', icon: '🍓', isDress: false },
    { id: 'sakura_cardigan', name: 'さくらカーデ', icon: '🌸', isDress: false }
  ],
  bottoms: [
    { id: 'none', name: 'なし (ワンピ用)', icon: '🚫' },
    { id: 'frill_skirt', name: 'フリルスカート', icon: '🩳' },
    { id: 'heart_skirt', name: 'ハートスカート', icon: '💖' },
    { id: 'dreamy_tutu', name: 'ゆめかわチュチュ', icon: '🩰' },
    { id: 'pastel_shorts', name: 'ショートパンツ', icon: '👖' },
    { id: 'flare_skirt', name: 'フレアスカート', icon: '👗' },
    { id: 'denim_ribbon', name: 'デニムリボン', icon: '🎀' }
  ],
  shoes: [
    { id: 'ribbon_pumps', name: 'リボンパンプス', icon: '👠' },
    { id: 'glass_slippers', name: 'ガラスのくつ', icon: '👡' },
    { id: 'toe_shoes', name: 'トウシューズ', icon: '🩰' },
    { id: 'pastel_sneakers', name: 'スニーカー', icon: '👟' },
    { id: 'platform_boots', name: '厚底ブーツ', icon: '👢' },
    { id: 'fluffy_slippers', name: 'くまスリッパ', icon: '🐻' }
  ],
  accessories: [
    { id: 'none', name: 'なし', icon: '🚫' },
    { id: 'angel_wings', name: '天使のはね', icon: '👼' },
    { id: 'tiara', name: 'ティアラ', icon: '👑' },
    { id: 'magical_wand', name: '魔法のステッキ', icon: '🪄' },
    { id: 'teddy_bear', name: 'くまのぬいぐるみ', icon: '🧸' },
    { id: 'satin_bow', name: 'リボンへあぴん', icon: '🎀' },
    { id: 'heart_glasses', name: 'ハートめがね', icon: '👓' },
    { id: 'cat_headband', name: 'ねこみみカチューシャ', icon: '🐱' },
    { id: 'fancy_sunglasses', name: 'サングラス', icon: '🕶️' }
  ],
  background: [
    { id: 'royal_palace', name: '👑 ロイヤル宮殿', icon: '🏰' },
    { id: 'starry_castle', name: '🌌 ほしぞら城', icon: '🔮' },
    { id: 'candy_kingdom', name: '🍬 おかしの王国', icon: '🍭' },
    { id: 'cloud_stage', name: '☁️ にじいろクラウド', icon: '🌈' },
    { id: 'sakura_park', name: '🌸 さくらの大庭園', icon: '🌸' },
    { id: 'galaxy_palace', name: '✨ ギャラクシー', icon: '🪐' }
  ]
};

// --- Friend Bots Data ---
const friendBots = {
  nyanko: {
    name: 'にゃんこちゃん',
    icon: '🐱',
    hair: 'twintails', hairColor: '#ff9ebb',
    face: 'cat_face',
    top: 'strawberry_dress', topColor: '#ff4d6d',
    bottom: 'none', bottomColor: '#ffffff',
    shoes: 'ribbon_pumps', shoesColor: '#ff9ebb',
    accessory: 'cat_headband', accessoryColor: '#ff4d6d',
    bg: 'candy_kingdom',
    greeting: 'こんにちは！にゃんこちゃんだよ！🐱✨<br>ふたりでお部屋でおしゃべりできて すっごくハッピー！あそぼう！'
  },
  usako: {
    name: 'うさこちゃん',
    icon: '🐰',
    hair: 'soft_waves', hairColor: '#bae6fd',
    face: 'wink',
    top: 'pastel_hoodie', topColor: '#bae6fd',
    bottom: 'frill_skirt', bottomColor: '#ffffff',
    shoes: 'pastel_sneakers', shoesColor: '#bae6fd',
    accessory: 'satin_bow', accessoryColor: '#f472b6',
    bg: 'cloud_stage',
    greeting: 'ヤッホー！うさこちゃんだよ！🐰🌈<br>ふたりで仲良くおしゃべりタイム！とっても楽しいね！'
  },
  uniko: {
    name: 'ユニこちゃん',
    icon: '🦄',
    hair: 'unicorn_hair', hairColor: '#e879f9',
    face: 'heart_eyes',
    top: 'starry_lolita', topColor: '#312e81',
    bottom: 'none', bottomColor: '#ffffff',
    shoes: 'glass_slippers', shoesColor: '#a5f3fc',
    accessory: 'tiara', accessoryColor: '#fef08a',
    bg: 'starry_castle',
    greeting: 'ごきげんよう！魔法使いのユニこちゃんだよ！🦄✨<br>ふたりだけの特別なティーパーティーのスタートだよ！'
  },
  kumagoro: {
    name: 'くまごろう',
    icon: '🐻',
    hair: 'cute_bob', hairColor: '#fdba74',
    face: 'smile',
    top: 'panda_hoodie', topColor: '#4b5563',
    bottom: 'none', bottomColor: '#ffffff',
    shoes: 'fluffy_slippers', shoesColor: '#fdba74',
    accessory: 'teddy_bear', accessoryColor: '#d97706',
    bg: 'sakura_park',
    greeting: 'ハーイ！くまごろうだよ！🐻🌸<br>ふたりでお菓子を食べながら のんびり過ごそうね！'
  },
  kitsune: {
    name: 'きつねちゃん',
    icon: '🦊',
    hair: 'hime_cut', hairColor: '#fb923c',
    face: 'wink',
    top: 'sakura_princess', topColor: '#f472b6',
    bottom: 'none', bottomColor: '#ffffff',
    shoes: 'toe_shoes', shoesColor: '#fbcfe8',
    accessory: 'satin_bow', accessoryColor: '#ff4d6d',
    bg: 'sakura_park',
    greeting: 'こんこん！きつねちゃんだよ！🦊🌸<br>あなたの今日のコーディネート、とっても最高だよ！'
  },
  penpen: {
    name: 'ぺんぺん',
    icon: '🐧',
    hair: 'cute_bob', hairColor: '#38bdf8',
    face: 'smile',
    top: 'alice_dress', topColor: '#38bdf8',
    bottom: 'none', bottomColor: '#ffffff',
    shoes: 'glass_slippers', shoesColor: '#bae6fd',
    accessory: 'tiara', accessoryColor: '#fef08a',
    bg: 'cloud_stage',
    greeting: 'ペンペン！お姫様ぺんぺんだよ！🐧❄️<br>ふたりでお散歩＆ダンス、すっごく楽しみ！'
  }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  renderItems();
  renderPalette();
  renderStage();
  initParticles();

  const wrapper = document.getElementById('stage-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnSparkles(x, y, 8);
      if (window.soundManager) soundManager.playPop();
    });
  }
});

// --- Tab & Category Management ---
function switchCategory(cat, btn) {
  state.currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderItems();
  renderPalette();
  if (window.soundManager) soundManager.playPop();
}

function renderItems() {
  const container = document.getElementById('items-grid');
  if (!container) return;
  container.innerHTML = '';

  const items = itemCatalog[state.currentCategory] || [];
  
  let currentSelectedId = state[state.currentCategory];
  if (state.currentCategory === 'tops') currentSelectedId = state.top;
  if (state.currentCategory === 'bottoms') currentSelectedId = state.bottom;
  if (state.currentCategory === 'shoes') currentSelectedId = state.shoes;
  if (state.currentCategory === 'accessories') currentSelectedId = state.accessory;

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = `item-card ${currentSelectedId === item.id ? 'selected' : ''}`;
    card.onclick = () => selectItem(item);

    card.innerHTML = `
      <div class="item-preview" style="font-size: 2.2rem;">${item.icon}</div>
      <div class="item-label">${item.name}</div>
    `;
    container.appendChild(card);
  });
}

function selectItem(item) {
  const cat = state.currentCategory;

  if (cat === 'accessories') {
    state.accessory = item.id;
  } else if (cat === 'tops') {
    state.top = item.id;
    if (item.isDress) {
      state.bottom = 'none';
    } else {
      if (state.bottom === 'none') {
        state.bottom = 'frill_skirt';
      }
    }
  } else if (cat === 'bottoms') {
    state.bottom = item.id;
    const currentTop = itemCatalog.tops.find(t => t.id === state.top);
    if (item.id === 'none') {
      if (!currentTop || !currentTop.isDress) {
        state.top = 'magical_dress';
      }
    } else {
      if (currentTop && currentTop.isDress) {
        state.top = 'yumekawa_tshirt';
      }
    }
  } else {
    state[cat] = item.id;
  }

  renderItems();
  renderStage();

  const twinUserSvg = document.getElementById('twin-user-svg');
  if (twinUserSvg) twinUserSvg.innerHTML = renderUserCustomAvatarSVG();

  const singleUserSvg = document.getElementById('single-user-svg');
  if (singleUserSvg) singleUserSvg.innerHTML = renderUserCustomAvatarSVG();

  if (window.soundManager) soundManager.playSparkle();
  spawnSparkles(180, 240, 6);
}

// --- Color Customizer ---
function renderPalette() {
  const paletteContainer = document.getElementById('color-palette');
  if (!paletteContainer) return;
  paletteContainer.innerHTML = '';

  let currentColorKey = 'topColor';
  if (state.currentCategory === 'hair') currentColorKey = 'hairColor';
  else if (state.currentCategory === 'tops') currentColorKey = 'topColor';
  else if (state.currentCategory === 'bottoms') currentColorKey = 'bottomColor';
  else if (state.currentCategory === 'shoes') currentColorKey = 'shoesColor';
  else if (state.currentCategory === 'accessories') currentColorKey = 'accessoryColor';
  else {
    const colorBar = document.getElementById('color-bar');
    if (colorBar) colorBar.style.display = 'none';
    return;
  }

  const colorBar = document.getElementById('color-bar');
  if (colorBar) colorBar.style.display = 'flex';

  paletteColors.forEach(color => {
    const dot = document.createElement('div');
    dot.className = `color-dot ${state[currentColorKey] === color ? 'active' : ''}`;
    dot.style.backgroundColor = color;
    dot.onclick = () => {
      state[currentColorKey] = color;
      renderPalette();
      renderStage();

      const twinUserSvg = document.getElementById('twin-user-svg');
      if (twinUserSvg) twinUserSvg.innerHTML = renderUserCustomAvatarSVG();

      const singleUserSvg = document.getElementById('single-user-svg');
      if (singleUserSvg) singleUserSvg.innerHTML = renderUserCustomAvatarSVG();

      if (window.soundManager) soundManager.playPop();
    };
    paletteContainer.appendChild(dot);
  });
}

// --- SVG Rendering Engine ---
function renderStage() {
  const layerBg = document.getElementById('layer-background');
  if (layerBg) layerBg.innerHTML = getBackgroundSVG(state.background);

  const layerAura = document.getElementById('layer-aura');
  if (layerAura) {
    layerAura.innerHTML = `
      <circle cx="180" cy="240" r="145" fill="url(#auraGrad)" opacity="0.65"/>
      <defs>
        <radialGradient id="auraGrad">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="${state.topColor}" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#c084fc" stop-opacity="0"/>
        </radialGradient>
      </defs>`;
  }

  const layerHairBack = document.getElementById('layer-hair-back');
  if (layerHairBack) layerHairBack.innerHTML = getHairBackSVG(state.hair, state.hairColor);

  const layerBody = document.getElementById('layer-body');
  if (layerBody) layerBody.innerHTML = getAnimeBodySVG();

  const layerFace = document.getElementById('layer-face');
  if (layerFace) layerFace.innerHTML = getAnimeFaceSVG(state.face);

  const layerBottoms = document.getElementById('layer-bottoms');
  if (layerBottoms) layerBottoms.innerHTML = getBottomsSVG(state.bottom, state.bottomColor);

  const layerTops = document.getElementById('layer-tops');
  if (layerTops) layerTops.innerHTML = getTopsSVG(state.top, state.topColor);

  const layerShoes = document.getElementById('layer-shoes');
  if (layerShoes) layerShoes.innerHTML = getShoesSVG(state.shoes, state.shoesColor);

  const layerHairFront = document.getElementById('layer-hair-front');
  if (layerHairFront) layerHairFront.innerHTML = getHairFrontSVG(state.hair, state.hairColor);

  const layerAcc = document.getElementById('layer-accessories');
  if (layerAcc) layerAcc.innerHTML = getAccessoriesSVG(state.accessory, state.accessoryColor);
}

// Render User Custom Avatar SVG
function renderUserCustomAvatarSVG() {
  return `
    ${getHairBackSVG(state.hair, state.hairColor)}
    ${getAnimeBodySVG()}
    ${getAnimeFaceSVG(state.face)}
    ${getBottomsSVG(state.bottom, state.bottomColor)}
    ${getTopsSVG(state.top, state.topColor)}
    ${getShoesSVG(state.shoes, state.shoesColor)}
    ${getHairFrontSVG(state.hair, state.hairColor)}
    ${getAccessoriesSVG(state.accessory, state.accessoryColor)}
  `;
}

// --- Friend Bot SVG Generator ---
function renderFriendBotSVG(friendData) {
  return `
    ${getBackgroundSVG(friendData.bg)}
    ${getHairBackSVG(friendData.hair, friendData.hairColor)}
    ${getAnimeBodySVG()}
    ${getAnimeFaceSVG(friendData.face)}
    ${getBottomsSVG(friendData.bottom, friendData.bottomColor)}
    ${getTopsSVG(friendData.top, friendData.topColor)}
    ${getShoesSVG(friendData.shoes, friendData.shoesColor)}
    ${getHairFrontSVG(friendData.hair, friendData.hairColor)}
    ${getAccessoriesSVG(friendData.accessory, friendData.accessoryColor)}
  `;
}

// --- Realistic Natural Slender Anime Body Generator ---
function getAnimeBodySVG() {
  return `
    <defs>
      <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff5ed"/>
        <stop offset="60%" stop-color="#ffe6d5"/>
        <stop offset="100%" stop-color="#fcd3bd"/>
      </linearGradient>
    </defs>

    <!-- Natural Slender Neck & Realistic Delicate Collarbone -->
    <path d="M174 172 L186 172 C188 198 172 198 174 172 Z" fill="url(#skinGrad)"/>
    <path d="M166 201 Q180 205 194 201" stroke="#f472b6" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>

    <!-- Anatomically Natural Slender Head Base -->
    <path d="M136 128 C136 170 154 186 180 186 C206 186 224 170 224 128 C224 86 204 82 180 82 C156 82 136 86 136 128 Z" fill="url(#skinGrad)"/>
    <ellipse cx="133" cy="140" rx="4.5" ry="7.5" fill="url(#skinGrad)"/>
    <ellipse cx="227" cy="140" rx="4.5" ry="7.5" fill="url(#skinGrad)"/>

    <!-- Realistic Slender Hourglass Torso -->
    <path d="M144 198 Q180 192 216 198 C212 225 206 245 206 274 Q180 279 154 274 C154 245 148 225 144 198 Z" fill="url(#skinGrad)"/>

    <!-- Realistic Slender Arms -->
    <path d="M144 198 C134 218 128 238 132 258 C136 264 142 262 144 256 C142 240 146 222 152 208 Z" fill="url(#skinGrad)"/>
    <ellipse cx="132" cy="260" rx="4" ry="5.5" fill="url(#skinGrad)" transform="rotate(-15 132 260)"/>

    <path d="M216 198 C226 218 232 238 228 258 C224 264 218 262 216 256 C218 240 214 222 208 208 Z" fill="url(#skinGrad)"/>
    <ellipse cx="228" cy="260" rx="4" ry="5.5" fill="url(#skinGrad)" transform="rotate(15 228 260)"/>

    <!-- Realistic Slender Long Anime Legs -->
    <path d="M156 270 C154 315 158 360 162 412 Q167 414 172 412 C170 360 171 315 170 270 Z" fill="url(#skinGrad)"/>
    <path d="M190 270 C189 315 190 360 188 412 Q193 414 198 412 C202 360 206 315 204 270 Z" fill="url(#skinGrad)"/>

    <ellipse cx="165" cy="335" rx="3" ry="1.8" fill="#ffffff" opacity="0.55"/>
    <ellipse cx="195" cy="335" rx="3" ry="1.8" fill="#ffffff" opacity="0.55"/>
  `;
}

// --- DEDICATED MODE 1: FRIENDS SQUARE ---
function openFriendsSquare() {
  const modal = document.getElementById('friends-modal');
  if (modal) modal.classList.add('active');
  switchFriendsMode(state.friendsMode || 'party');
  if (window.soundManager) soundManager.playFanfare();
}

function closeFriendsSquare() {
  const modal = document.getElementById('friends-modal');
  if (modal) modal.classList.remove('active');
  if (window.soundManager) soundManager.playSparkle();
}

function switchFriendsMode(mode) {
  state.friendsMode = mode;

  const btnParty = document.getElementById('mode-party-btn');
  const btnSingle = document.getElementById('mode-single-btn');
  const singleSelector = document.getElementById('single-friends-selector');
  const photoBtn = document.getElementById('btn-group-photo-act');

  const partyContainer = document.getElementById('party-stage-container');
  const singleContainer = document.getElementById('single-stage-container');

  if (mode === 'party') {
    if (btnParty) btnParty.className = 'friend-card active';
    if (btnSingle) btnSingle.className = 'friend-card';
    if (singleSelector) singleSelector.style.display = 'none';

    if (partyContainer) partyContainer.style.display = 'flex';
    if (singleContainer) singleContainer.style.display = 'none';

    if (photoBtn) photoBtn.innerHTML = '📸 全員で集合写真を撮る！';

    renderPartyStage();

    const bubble = document.getElementById('friend-speech-bubble');
    if (bubble) {
      bubble.innerHTML = `わぁ〜〜！みんな大集合だよ！🎉✨<br>『みんなでおしゃべり』ボタンを押すと、みんなで賑やかにお話しするよ！`;
    }
  } else {
    if (btnParty) btnParty.className = 'friend-card';
    if (btnSingle) btnSingle.className = 'friend-card active';
    if (singleSelector) singleSelector.style.display = 'flex';

    if (partyContainer) partyContainer.style.display = 'none';
    if (singleContainer) singleContainer.style.display = 'flex';

    if (photoBtn) photoBtn.innerHTML = '📸 ふたりで記念写真を撮る！';

    const targetCard = document.querySelector(`#friends-modal .friend-card[data-friend="${state.activeFriend}"]`);
    selectFriendBot(state.activeFriend || 'nyanko', targetCard);
  }

  if (window.soundManager) soundManager.playPop();
}

// Render All 6 Friends + Player on Party Stage
function renderPartyStage() {
  const container = document.getElementById('party-stage-container');
  if (!container) return;
  container.innerHTML = '';

  const playerCard = document.createElement('div');
  playerCard.className = 'party-avatar-card user-card';
  playerCard.innerHTML = `
    <div class="party-avatar-label">💖 あなた</div>
    <div class="party-avatar-svg">
      <svg viewBox="0 0 360 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        ${renderUserCustomAvatarSVG()}
      </svg>
    </div>
  `;
  container.appendChild(playerCard);

  Object.keys(friendBots).forEach(fKey => {
    const friend = friendBots[fKey];
    const card = document.createElement('div');
    card.className = 'party-avatar-card';
    card.onclick = () => {
      const bubble = document.getElementById('friend-speech-bubble');
      if (bubble) bubble.innerHTML = `${friend.icon} <b>${friend.name}:</b> ${friend.greeting}`;
      spawnSparkles(180, 200, 10);
      if (window.soundManager) soundManager.playPop();
    };
    card.innerHTML = `
      <div class="party-avatar-label">${friend.icon} ${friend.name}</div>
      <div class="party-avatar-svg">
        <svg viewBox="0 0 360 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          ${renderFriendBotSVG(friend)}
        </svg>
      </div>
    `;
    container.appendChild(card);
  });
}

function selectFriendBot(friendId, cardEl) {
  state.activeFriend = friendId;
  state.walkPosX = 0;
  const friend = friendBots[friendId];
  if (!friend) return;

  document.querySelectorAll('#single-friends-selector .friend-card').forEach(c => c.classList.remove('active'));
  if (cardEl) {
    cardEl.classList.add('active');
  } else {
    const card = document.querySelector(`#single-friends-selector .friend-card[data-friend="${friendId}"]`);
    if (card) card.classList.add('active');
  }

  // Render User Avatar and Friend Avatar side-by-side in 1-on-1 mode!
  const userSvg = document.getElementById('single-user-svg');
  if (userSvg) userSvg.innerHTML = renderUserCustomAvatarSVG();

  const friendLabel = document.getElementById('single-friend-label');
  if (friendLabel) friendLabel.innerText = `${friend.icon} ${friend.name}`;

  const botSvg = document.getElementById('friend-bot-svg');
  if (botSvg) botSvg.innerHTML = renderFriendBotSVG(friend);

  const singleStage = document.getElementById('single-avatars-stage');
  if (singleStage) singleStage.style.transform = `translateX(0px)`;

  const bubble = document.getElementById('friend-speech-bubble');
  if (bubble) bubble.innerHTML = `${friend.icon} <b>${friend.name}:</b> ${friend.greeting}`;
  
  if (window.soundManager) soundManager.playSparkle();
}

function moveFriendAvatar(dx) {
  state.walkPosX += dx;
  if (state.walkPosX > 160) state.walkPosX = 160;
  if (state.walkPosX < -160) state.walkPosX = -160;

  if (state.friendsMode === 'party') {
    const partyStage = document.getElementById('party-stage-container');
    if (partyStage) {
      partyStage.classList.add('walking');
      partyStage.style.transform = `translateX(${state.walkPosX}px)`;
    }
  } else {
    const singleStage = document.getElementById('single-avatars-stage');
    if (singleStage) {
      singleStage.classList.add('walking');
      singleStage.style.transform = `translateX(${state.walkPosX}px)`;
    }
  }

  if (window.soundManager) soundManager.playPop();

  if (walkAnimTimer) clearTimeout(walkAnimTimer);
  walkAnimTimer = setTimeout(() => {
    const partyStage = document.getElementById('party-stage-container');
    if (partyStage) partyStage.classList.remove('walking');
    const singleStage = document.getElementById('single-avatars-stage');
    if (singleStage) singleStage.classList.remove('walking');
  }, 350);
}

function autoWalkAround() {
  const steps = [-80, 40, -30, 90, 0];
  let idx = 0;
  showToast('✨ お散歩＆ダンススタート！');

  const interval = setInterval(() => {
    moveFriendAvatar(steps[idx] - state.walkPosX);
    idx++;
    if (idx >= steps.length) {
      clearInterval(interval);
    }
  }, 480);
}

function handleFloorClick(event) {
  const room = document.getElementById('friend-room-container');
  if (!room) return;
  const rect = room.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const centerX = rect.width / 2;
  const targetDx = (clickX - centerX) * 0.5;

  state.walkPosX = targetDx;
  if (state.friendsMode === 'party') {
    const partyStage = document.getElementById('party-stage-container');
    if (partyStage) {
      partyStage.classList.add('walking');
      partyStage.style.transform = `translateX(${state.walkPosX}px)`;
    }
  } else {
    const singleStage = document.getElementById('single-avatars-stage');
    if (singleStage) {
      singleStage.classList.add('walking');
      singleStage.style.transform = `translateX(${state.walkPosX}px)`;
    }
  }

  spawnSparkles(clickX, event.clientY - rect.top, 10);
  if (window.soundManager) soundManager.playPop();

  if (walkAnimTimer) clearTimeout(walkAnimTimer);
  walkAnimTimer = setTimeout(() => {
    const partyStage = document.getElementById('party-stage-container');
    if (partyStage) partyStage.classList.remove('walking');
    const singleStage = document.getElementById('single-avatars-stage');
    if (singleStage) singleStage.classList.remove('walking');
  }, 380);
}

function talkToFriendBot(action) {
  const bubble = document.getElementById('friend-speech-bubble');
  if (!bubble) return;
  if (window.soundManager) soundManager.playPop();

  if (state.friendsMode === 'party') {
    if (action === 'chat') {
      const groupChats = [
        `🐱 <b>にゃんこ:</b> 「みんな〜！きょうは集まってくれてありがとうにゃ！」<br>🐰 <b>うさこ:</b> 「みんなでお喋りできるの すっごく楽しいね！」✨`,
        `🦄 <b>ユニこ:</b> 「魔法のティーパーティーへようこそ！」<br>🐻 <b>くまごろう:</b> 「みんなのお洋服、どれも最高に素敵だね！」🌸`,
        `🦊 <b>きつね:</b> 「あなたのおかげで みんな仲良しだよ！」<br>🐧 <b>ぺんぺん:</b> 「ペンペン！みんなでダンスしちゃおう！」🎶`
      ];
      bubble.innerHTML = groupChats[Math.floor(Math.random() * groupChats.length)];
    } else if (action === 'praise') {
      bubble.innerHTML = `全員: 「わぁ〜〜！あなたの今日のコーディネート、世界でいちばん可愛い！！💖✨<br>みんな あなたのお洋服にメロメロだよ〜！！」`;
      spawnSparkles(200, 240, 20);
    } else if (action === 'treat') {
      bubble.innerHTML = `🎉 <b>みんなでお菓子パーティー！</b><br>イチゴショートケーキ🍰、パフェ🍨、キャンディ🍬が大集合！<br>「モグモグ…みんなで食べると 最高に美味しいね！😋💖」`;
      spawnSparkles(200, 240, 25);
    } else if (action === 'riddle') {
      bubble.innerHTML = `【みんなで なぞなぞ大会！】<br>🐰 <b>うさこ:</b> 「みんなに問題！『さ』をつけると春の食べ物になる生き物は？」<br>🐱 <b>にゃんこ:</b> 「サクラえびだにゃ！」🐟✨`;
    }
  } else {
    const friend = friendBots[state.activeFriend] || friendBots.nyanko;
    if (action === 'chat') {
      bubble.innerHTML = `${friend.icon} <b>${friend.name}:</b> 「ねぇねぇ！きょうも ふたりでお部屋でおしゃべりできて すっごくハッピーだよ！✨」`;
    } else if (action === 'praise') {
      bubble.innerHTML = `${friend.icon} <b>${friend.name}:</b> 「えへへ…！お洋服ほめてくれてありがとう！あなたの今日のコーディネート、最高にステキだよ！💖」`;
      spawnSparkles(200, 240, 20);
    } else if (action === 'treat') {
      bubble.innerHTML = `${friend.icon} <b>${friend.name}:</b> 「わぁ〜〜！美味しそうなお菓子をありがとう！🍰✨<br>モグモグ…あま〜くて最高！😋💖」`;
      spawnSparkles(200, 240, 25);
    } else if (action === 'riddle') {
      bubble.innerHTML = `🧩 <b>【${friend.name}からの なぞなぞ勝負！】</b><br>あたまに『さ』をつけると おいしい春の食べ物になる生き物はな〜んだ？🌸`;
    }
  }
}

// --- HELPER: ASYNC SVG TO IMAGE LOADER ---
function loadSvgToImage(svgString) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

function drawNameBadge(ctx, text, cx, cy, bgColor, textColor) {
  ctx.save();
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const metrics = ctx.measureText(text);
  const paddingX = 16;
  const paddingY = 8;
  const w = metrics.width + paddingX * 2;
  const h = 34;

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 2.5;

  const x = cx - w / 2;
  const y = cy - h / 2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, 17);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.fillText(text, cx, cy + 1);
  ctx.restore();
}

// --- MULTI-AVATAR HD PHOTO ENGINE ---

// Party Mode or Single Room Photo Dispatcher
async function saveGroupPhoto() {
  if (window.soundManager) soundManager.playCamera();
  spawnSparkles(400, 240, 25);

  if (state.friendsMode === 'single') {
    return saveSingleRoomPhoto();
  }

  showToast('📸 全員（7キャラ大集合）の記念写真を撮影中…！');

  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 750;
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1400, 750);
  grad.addColorStop(0, '#ffd6e8');
  grad.addColorStop(0.5, '#e8d5ff');
  grad.addColorStop(1, '#d5f3ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1400, 750);

  // Decorative Title Banner
  ctx.fillStyle = '#701a75';
  ctx.font = 'bold 38px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌸 ゆめかわ・みんなでおしゃべり大集合 記念写真 📸', 700, 65);

  // Frame Border
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1360, 710);

  const friendsList = Object.keys(friendBots).map(k => friendBots[k]);

  // Build SVG Strings for All 7 Characters
  const userSvgStr = `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">${renderUserCustomAvatarSVG()}</svg>`;
  const friendSvgStrs = friendsList.map(f => `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">${renderFriendBotSVG(f)}</svg>`);

  try {
    const [userImg, ...friendImgs] = await Promise.all([
      loadSvgToImage(userSvgStr),
      ...friendSvgStrs.map(s => loadSvgToImage(s))
    ]);

    // Draw User Avatar on Left
    ctx.drawImage(userImg, 40, 140, 185, 530);
    drawNameBadge(ctx, '💖 あなた', 132, 125, '#fef08a', '#854d0e');

    // Draw 6 Friend Avatars
    const startX = 240;
    const gap = 185;
    friendImgs.forEach((img, idx) => {
      const friend = friendsList[idx];
      const posX = startX + idx * gap;
      ctx.drawImage(img, posX, 150, 175, 510);
      drawNameBadge(ctx, `${friend.icon} ${friend.name}`, posX + 87, 132, '#ffffff', '#701a75');
    });

    downloadCanvasAsPNG(canvas);
  } catch (err) {
    console.error('Group photo error:', err);
    showToast('📸 写真の保存に失敗しちゃった…もう一度試してね！');
  }
}

// 1-on-1 Single Friend Room Photo Engine (User + Selected Friend)
async function saveSingleRoomPhoto() {
  const friend = friendBots[state.activeFriend] || friendBots.nyanko;
  showToast(`📸 ${friend.name}とのツーショット写真を撮影中…！`);

  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 960, 720);
  grad.addColorStop(0, '#ffd6e8');
  grad.addColorStop(0.5, '#e8d5ff');
  grad.addColorStop(1, '#d5f3ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 720);

  ctx.fillStyle = '#701a75';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`🌸 ${friend.name}とふたりでおしゃべり 記念写真 📸`, 480, 65);

  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 920, 680);

  const userSvgStr = `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">${renderUserCustomAvatarSVG()}</svg>`;
  const friendSvgStr = `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">${renderFriendBotSVG(friend)}</svg>`;

  try {
    const [userImg, friendImg] = await Promise.all([
      loadSvgToImage(userSvgStr),
      loadSvgToImage(friendSvgStr)
    ]);

    ctx.drawImage(userImg, 70, 130, 390, 530);
    drawNameBadge(ctx, '💖 あなた', 265, 115, '#fef08a', '#854d0e');

    ctx.drawImage(friendImg, 500, 130, 390, 530);
    drawNameBadge(ctx, `${friend.icon} ${friend.name}`, 695, 115, '#ffffff', '#701a75');

    downloadCanvasAsPNG(canvas);
  } catch (err) {
    console.error('Single photo error:', err);
    showToast('📸 写真の保存に失敗しちゃった…もう一度試してね！');
  }
}

// Dedicated Twin Park Photo Engine (User + Selected Twin Partner)
async function saveTwinPhoto() {
  if (window.soundManager) soundManager.playCamera();
  spawnSparkles(360, 240, 20);

  const friend = friendBots[state.activeTwinPartner] || friendBots.nyanko;
  showToast(`📸 ${friend.name}との双子写真を撮影中…！`);

  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 960, 720);
  grad.addColorStop(0, '#ffd6e8');
  grad.addColorStop(0.5, '#e8d5ff');
  grad.addColorStop(1, '#d5f3ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 720);

  ctx.fillStyle = '#701a75';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`👯‍♀️ ゆめかわ・双子公園 記念写真 📸`, 480, 65);

  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 920, 680);

  const userSvgStr = `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">${renderUserCustomAvatarSVG()}</svg>`;
  const friendSvgStr = `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">${renderFriendBotSVG(friend)}</svg>`;

  try {
    const [userImg, friendImg] = await Promise.all([
      loadSvgToImage(userSvgStr),
      loadSvgToImage(friendSvgStr)
    ]);

    ctx.drawImage(userImg, 70, 130, 390, 530);
    drawNameBadge(ctx, '💖 あなた', 265, 115, '#fef08a', '#854d0e');

    ctx.drawImage(friendImg, 500, 130, 390, 530);
    drawNameBadge(ctx, `${friend.icon} ${friend.name}`, 695, 115, '#ffffff', '#701a75');

    downloadCanvasAsPNG(canvas);
  } catch (err) {
    console.error('Twin photo error:', err);
    showToast('📸 写真の保存に失敗しちゃった…もう一度試してね！');
  }
}

// --- DEDICATED MODE 2: TWIN PARK ---
function openTwinPark() {
  const modal = document.getElementById('twin-park-modal');
  if (modal) modal.classList.add('active');
  const targetCard = document.querySelector(`#twin-park-modal .friend-card[data-twin="${state.activeTwinPartner}"]`) || document.querySelector('#twin-park-modal .friend-card');
  selectTwinPartner(state.activeTwinPartner || 'nyanko', targetCard);
  if (window.soundManager) soundManager.playFanfare();
}

function closeTwinPark() {
  const modal = document.getElementById('twin-park-modal');
  if (modal) modal.classList.remove('active');
  if (window.soundManager) soundManager.playSparkle();
}

function selectTwinPartner(friendId, cardEl) {
  state.activeTwinPartner = friendId;
  state.twinWalkPosX = 0;
  const friend = friendBots[friendId];
  if (!friend) return;

  document.querySelectorAll('#twin-park-modal .friend-card').forEach(c => c.classList.remove('active'));
  if (cardEl) {
    cardEl.classList.add('active');
  } else {
    const card = document.querySelector(`#twin-park-modal .friend-card[data-twin="${friendId}"]`);
    if (card) card.classList.add('active');
  }

  const userSvg = document.getElementById('twin-user-svg');
  if (userSvg) userSvg.innerHTML = renderUserCustomAvatarSVG();
  const label = document.getElementById('twin-friend-label');
  if (label) label.innerText = `${friend.icon} ${friend.name}`;
  const friendSvg = document.getElementById('twin-friend-svg');
  if (friendSvg) friendSvg.innerHTML = renderFriendBotSVG(friend);

  const twinStage = document.getElementById('twin-avatars-stage');
  if (twinStage) twinStage.style.transform = `translateX(0px)`;

  const bubble = document.getElementById('twin-speech-bubble');
  if (bubble) {
    bubble.innerHTML = 
      `わぁ〜〜！${friend.name}と ふたりで双子公園へきたよ！👯‍♀️💖<br>『おそろいコーデにする！』を押すと、髪型・表情・お洋服・アクセまで【完全再現】でおそろいになれるよ！`;
  }

  if (window.soundManager) soundManager.playSparkle();
}

function moveTwinAvatars(dx) {
  state.twinWalkPosX += dx;
  if (state.twinWalkPosX > 140) state.twinWalkPosX = 140;
  if (state.twinWalkPosX < -140) state.twinWalkPosX = -140;

  const twinStage = document.getElementById('twin-avatars-stage');
  if (twinStage) {
    twinStage.classList.add('walking');
    twinStage.style.transform = `translateX(${state.twinWalkPosX}px)`;
  }

  if (window.soundManager) soundManager.playPop();

  if (twinWalkAnimTimer) clearTimeout(twinWalkAnimTimer);
  twinWalkAnimTimer = setTimeout(() => {
    if (twinStage) twinStage.classList.remove('walking');
  }, 350);
}

function autoWalkTwin() {
  showToast('✨ ふたり仲良くお散歩中…！');
  const steps = [-70, 35, -25, 80, 0];
  let idx = 0;

  const interval = setInterval(() => {
    moveTwinAvatars(steps[idx] - state.twinWalkPosX);
    idx++;
    if (idx >= steps.length) {
      clearInterval(interval);
    }
  }, 480);
}

function handleTwinFloorClick(event) {
  const room = document.getElementById('twin-park-container');
  if (!room) return;
  const rect = room.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const centerX = rect.width / 2;
  const targetDx = (clickX - centerX) * 0.55;

  state.twinWalkPosX = targetDx;
  const twinStage = document.getElementById('twin-avatars-stage');
  if (twinStage) {
    twinStage.classList.add('walking');
    twinStage.style.transform = `translateX(${state.twinWalkPosX}px)`;
  }

  spawnSparkles(clickX, event.clientY - rect.top, 10);
  if (window.soundManager) soundManager.playPop();

  if (twinWalkAnimTimer) clearTimeout(twinWalkAnimTimer);
  twinWalkAnimTimer = setTimeout(() => {
    if (twinStage) twinStage.classList.remove('walking');
  }, 380);
}

// 100% Perfect Twin Outfit Replication
function makeTwinMatchingOutfit() {
  const friend = friendBots[state.activeTwinPartner] || friendBots.nyanko;

  state.hair = friend.hair;
  state.hairColor = friend.hairColor;
  state.face = friend.face;
  state.top = friend.top;
  state.topColor = friend.topColor;
  state.bottom = friend.bottom;
  state.bottomColor = friend.bottomColor;
  state.shoes = friend.shoes;
  state.shoesColor = friend.shoesColor;
  state.accessory = friend.accessory;
  state.accessoryColor = friend.accessoryColor;

  renderItems();
  renderPalette();
  renderStage();

  const userSvg = document.getElementById('twin-user-svg');
  if (userSvg) userSvg.innerHTML = renderUserCustomAvatarSVG();

  const friendSvg = document.getElementById('twin-friend-svg');
  if (friendSvg) friendSvg.innerHTML = renderFriendBotSVG(friend);

  const bubble = document.getElementById('twin-speech-bubble');
  if (bubble) {
    bubble.innerHTML = 
      `きゃ〜〜！見て見て！『${friend.name}』とおそろい【完全再現】コーデの完成〜！👯‍♀️✨<br>髪型・お目め・お洋服・靴・アクセ・色までぜ〜んぶ完璧な双子になっちゃった！📸 写真を撮ろう！`;
  }

  spawnSparkles(240, 220, 25);
  if (window.soundManager) soundManager.playFanfare();
  showToast('👯‍♀️ 完全再現！おそろい双子コーデになったよ！');
}

function talkToTwinBots() {
  const friend = friendBots[state.activeTwinPartner] || friendBots.nyanko;
  const bubble = document.getElementById('twin-speech-bubble');
  if (!bubble) return;
  if (window.soundManager) soundManager.playPop();

  const twinChats = [
    `『あなた』と『${friend.name}』は、世界でいちばん仲良しの双子コンビだね！👯‍♀️✨`,
    `ふたり並んでお散歩すると、公園のみんなが振り返っちゃうね！💖`,
    `きょうの双子コーデ、100点満点中 10000点だよ！おそろい最高！🌈`
  ];
  bubble.innerHTML = twinChats[Math.floor(Math.random() * twinChats.length)];
}

// --- DEDICATED MODE 3: FAQ & CREATOR QUESTION CORNER ---
function openFaqModal() {
  const modal = document.getElementById('faq-modal');
  if (modal) modal.classList.add('active');
  renderFaqSection();
  renderUserQuestions();
  if (window.soundManager) soundManager.playPop();
}

function closeFaqModal() {
  const modal = document.getElementById('faq-modal');
  if (modal) modal.classList.remove('active');
  if (window.soundManager) soundManager.playSparkle();
}

function toggleAdminMode() {
  if (!state.isAdmin) {
    const inputPass = prompt('🔑 作者（かんりしゃ）モードのひみつのパスワードを入力してね！');
    if (inputPass !== null && inputPass.trim().toUpperCase() === 'IQ1000') {
      state.isAdmin = true;
      showToast('👑 作者（かんりしゃ）モードになりました！');
      if (window.soundManager) soundManager.playFanfare();
    } else if (inputPass !== null) {
      alert('パスワードがちがうよ！');
      return;
    } else {
      return;
    }
  } else {
    state.isAdmin = false;
    showToast('👤 あそびに来たひとモードにもどったよ！');
  }

  updateAdminUI();
  renderFaqSection();
  renderUserQuestions();
}

function updateAdminUI() {
  const badge = document.getElementById('admin-status-badge');
  const btn = document.getElementById('btn-admin-toggle');
  const creatorForm = document.getElementById('creator-form-card');

  if (state.isAdmin) {
    if (badge) {
      badge.className = 'admin-badge creator';
      badge.innerHTML = '👑 作者（かんりしゃ）モード中！';
    }
    if (btn) btn.innerText = '👤 モードをぬける';
    if (creatorForm) creatorForm.style.display = 'block';
  } else {
    if (badge) {
      badge.className = 'admin-badge visitor';
      badge.innerHTML = '👤 あそびに来たひとモード';
    }
    if (btn) btn.innerText = '🔑 作者（かんりしゃ）モードに入る';
    if (creatorForm) creatorForm.style.display = 'none';
  }
}

function renderFaqSection() {
  const container = document.getElementById('preset-faq-list');
  if (!container) return;
  container.innerHTML = '';

  const allFaqs = [...defaultFaqs, ...customFaqs];

  allFaqs.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'faq-accordion-item';

    card.innerHTML = `
      <div class="faq-q" onclick="toggleFaqAccordion(${idx})">
        <span>${item.q}</span>
        <span>▼</span>
      </div>
      <div id="faq-a-${idx}" class="faq-a" style="display: none;">
        ${item.a}
        ${state.isAdmin && idx >= defaultFaqs.length ? `
          <div style="margin-top: 10px; text-align: right;">
            <button class="btn" style="background:#ef4444; color:#fff; font-size:0.8rem; padding:4px 10px;" onclick="deleteCustomFaq(${idx - defaultFaqs.length})">🗑️ この質問を削除</button>
          </div>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleFaqAccordion(idx) {
  const target = document.getElementById(`faq-a-${idx}`);
  if (target) {
    target.style.display = target.style.display === 'none' ? 'block' : 'none';
    if (window.soundManager) soundManager.playPop();
  }
}

function addCustomFaq() {
  if (!state.isAdmin) {
    alert('作者モードのひとしか 質問を追加できないよ！');
    return;
  }

  const qInput = document.getElementById('new-faq-q');
  const aInput = document.getElementById('new-faq-a');

  if (!qInput || !aInput || !qInput.value.trim() || !aInput.value.trim()) {
    alert('質問とこたえを 両方入力してね！');
    return;
  }

  customFaqs.push({
    q: '❓ ' + qInput.value.trim(),
    a: '🌸 ' + aInput.value.trim()
  });

  localStorage.setItem('yumekawa_custom_faqs', JSON.stringify(customFaqs));

  qInput.value = '';
  aInput.value = '';

  renderFaqSection();
  if (window.soundManager) soundManager.playFanfare();
  showToast('✨ 新しい「よくある質問」を追加したよ！');
}

function deleteCustomFaq(idx) {
  if (!state.isAdmin) return;
  customFaqs.splice(idx, 1);
  localStorage.setItem('yumekawa_custom_faqs', JSON.stringify(customFaqs));
  renderFaqSection();
  showToast('🗑️ 質問を削除したよ！');
}

function submitUserQuestion() {
  const input = document.getElementById('user-question-input');
  if (!input || !input.value.trim()) {
    alert('質問を入力してね！');
    return;
  }

  userQuestions.push({
    question: input.value.trim(),
    answer: null,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem('yumekawa_user_questions', JSON.stringify(userQuestions));
  input.value = '';

  renderUserQuestions();
  if (window.soundManager) soundManager.playSparkle();
  showToast('📨 質問を投稿したよ！作者が答えるのを待ってね！');
}

function renderUserQuestions() {
  const container = document.getElementById('user-questions-list');
  if (!container) return;
  container.innerHTML = '';

  if (userQuestions.length === 0) {
    container.innerHTML = '<div style="color:#94a3b8; font-style:italic;">まだ質問はないよ！上の入力らんから投稿してみてね！</div>';
    return;
  }

  userQuestions.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'user-question-item';

    let answerHtml = '';
    if (item.answer) {
      answerHtml = `<div class="user-q-answer">👑 <b>作者からのこたえ:</b> ${item.answer}</div>`;
    } else {
      answerHtml = `<div class="unanswered-tag">⏳ 作者からの回答をまっています…</div>`;
    }

    let adminControls = '';
    if (state.isAdmin) {
      adminControls = `
        <div style="margin-top: 10px; display: flex; gap: 8px;">
          <button class="btn-answer-creator" onclick="answerUserQuestion(${idx})">✏️ 作者として回答する</button>
          <button class="btn-answer-creator" style="background:#fecdd3; color:#9f1239; border-color:#f472b6;" onclick="deleteUserQuestion(${idx})">🗑️ 削除</button>
        </div>
      `;
    }

    div.innerHTML = `
      <div class="user-q-title">💬 ${item.question}</div>
      ${answerHtml}
      ${adminControls}
    `;
    container.appendChild(div);
  });
}

function answerUserQuestion(idx) {
  if (!state.isAdmin) return;
  const reply = prompt('👑 作者として回答を入力してね！', userQuestions[idx].answer || '');
  if (reply !== null && reply.trim()) {
    userQuestions[idx].answer = reply.trim();
    localStorage.setItem('yumekawa_user_questions', JSON.stringify(userQuestions));
    renderUserQuestions();
    if (window.soundManager) soundManager.playFanfare();
    showToast('✨ 回答を投稿したよ！');
  }
}

function deleteUserQuestion(idx) {
  if (!state.isAdmin) return;
  userQuestions.splice(idx, 1);
  localStorage.setItem('yumekawa_user_questions', JSON.stringify(userQuestions));
  renderUserQuestions();
  showToast('🗑️ 質問を削除したよ！');
}

// --- Super Gorgeous Backgrounds Engine ---
function getBackgroundSVG(bg) {
  if (bg === 'royal_palace') {
    return `
      <rect width="360" height="480" fill="#2d0654"/>
      <path d="M0 0 L60 0 L40 90 L0 110 Z" fill="#9f1239" opacity="0.9"/>
      <path d="M360 0 L300 0 L320 90 L360 110 Z" fill="#9f1239" opacity="0.9"/>
      <path d="M40 0 Q180 60 320 0 L320 20 Q180 80 40 20 Z" fill="#fbbf24"/>
      <circle cx="180" cy="50" r="18" fill="#fef08a" opacity="0.95"/>
      <path d="M0 340 L360 340 L360 480 L0 480 Z" fill="#4c1d95"/>
    `;
  } else if (bg === 'starry_castle') {
    return `
      <rect width="360" height="480" fill="#1e1b4b"/>
      <circle cx="80" cy="90" r="45" fill="#fef08a" opacity="0.95"/>
      <circle cx="100" cy="80" r="40" fill="#1e1b4b"/>
      <rect x="20" y="260" width="70" height="220" fill="#312e81"/>
      <path d="M20 260 Q55 180 90 260 Z" fill="#c084fc"/>
      <rect x="270" y="260" width="70" height="220" fill="#312e81"/>
      <path d="M270 260 Q305 180 340 260 Z" fill="#c084fc"/>
    `;
  } else if (bg === 'candy_kingdom') {
    return `
      <rect width="360" height="480" fill="#fce7f3"/>
      <path d="M0 360 Q90 320 180 360 Q270 400 360 360 L360 480 L0 480 Z" fill="#fbcfe8"/>
      <circle cx="60" cy="300" r="30" fill="#ff4d6d"/>
      <circle cx="300" cy="280" r="35" fill="#38bdf8"/>
    `;
  } else if (bg === 'cloud_stage') {
    return `
      <rect width="360" height="480" fill="#e0f2fe"/>
      <path d="M20 380 Q180 140 340 380" stroke="#ffb3ba" stroke-width="14" fill="none"/>
      <circle cx="60" cy="410" r="50" fill="#ffffff"/>
      <circle cx="300" cy="410" r="50" fill="#ffffff"/>
    `;
  } else if (bg === 'sakura_park') {
    return `
      <rect width="360" height="480" fill="#fbcfe8"/>
      <path d="M0 340 Q180 320 360 340 L360 480 L0 480 Z" fill="#bbf7d0"/>
      <circle cx="37" cy="180" r="60" fill="#f472b6" opacity="0.95"/>
    `;
  } else if (bg === 'galaxy_palace') {
    return `
      <rect width="360" height="480" fill="#0f172a"/>
      <circle cx="180" cy="160" r="40" fill="#fbbf24"/>
      <path d="M0 360 L360 360 L360 480 L0 480 Z" fill="#1e1b4b"/>
    `;
  }
  return `<rect width="360" height="480" fill="#fff1f2"/>`;
}

// --- Helper: Render Ultra-Cute Open Wink-Style Anime Eye ---
function getWinkStyleOpenEyeSVG(cx, cy = 139) {
  return `
    <path d="M${cx - 14} ${cy - 6} Q${cx} ${cy - 19} ${cx + 14} ${cy - 6}" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M${cx - 16} ${cy - 10} L${cx - 21} ${cy - 14}" stroke="#3b0764" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="${cx}" cy="${cy}" rx="10" ry="14" fill="url(#eyeGrad)"/>
    <ellipse cx="${cx}" cy="${cy + 3}" rx="6" ry="8" fill="#2e1065"/>
    <circle cx="${cx - 4}" cy="${cy - 6}" r="4.5" fill="#ffffff"/>
    <circle cx="${cx + 5}" cy="${cy + 5}" r="2.5" fill="#ffffff"/>
    <polygon points="${cx},${cy - 2} ${cx + 1},${cy} ${cx + 3},${cy} ${cx + 1},${cy + 1} ${cx + 2},${cy + 3} ${cx},${cy + 2} ${cx - 2},${cy + 3} ${cx - 1},${cy} ${cx - 3},${cy} ${cx - 1},${cy}" fill="#fef08a"/>
  `;
}

// --- Ultra-Cute Anime Face Generator ---
function getAnimeFaceSVG(face) {
  let blush = `
    <ellipse cx="148" cy="148" rx="13" ry="8" fill="#ff7da7" opacity="0.65"/>
    <ellipse cx="212" cy="148" rx="13" ry="8" fill="#ff7da7" opacity="0.65"/>
    <path d="M145 118 Q156 114 167 118" stroke="#5b21b6" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
    <path d="M193 118 Q204 114 215 118" stroke="#5b21b6" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>

    <defs>
      <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4c1d95"/>
        <stop offset="50%" stop-color="#9333ea"/>
        <stop offset="100%" stop-color="#f472b6"/>
      </linearGradient>
    </defs>
  `;

  if (face === 'smile') {
    return blush + `
      ${getWinkStyleOpenEyeSVG(156)}
      ${getWinkStyleOpenEyeSVG(204)}
      <path d="M172 156 Q180 166 188 156 Z" fill="#ff7da7"/>
    `;
  } else if (face === 'wink') {
    return blush + `
      ${getWinkStyleOpenEyeSVG(156)}
      <path d="M190 138 Q204 148 218 138" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M220 142 L226 146" stroke="#3b0764" stroke-width="3" stroke-linecap="round"/>
      <path d="M188 142 L182 146" stroke="#3b0764" stroke-width="3" stroke-linecap="round"/>
      <path d="M172 154 Q180 168 188 154 Z" fill="#ff4081"/>
    `;
  } else if (face === 'heart_eyes') {
    return blush + `
      <path d="M142 133 Q156 120 170 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M190 133 Q204 120 218 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <ellipse cx="156" cy="139" rx="10" ry="14" fill="url(#eyeGrad)"/>
      <path d="M156 128 Q162 120 168 128 Q156 144 144 128 Q150 120 156 128 Z" fill="#ff2a6d"/>
      <circle cx="152" cy="132" r="3.5" fill="#ffffff"/>

      <ellipse cx="204" cy="139" rx="10" ry="14" fill="url(#eyeGrad)"/>
      <path d="M204 128 Q210 120 216 128 Q204 144 192 128 Q198 120 204 128 Z" fill="#ff2a6d"/>
      <circle cx="200" cy="132" r="3.5" fill="#ffffff"/>

      <path d="M172 156 Q180 166 188 156 Z" fill="#ff7da7"/>
    `;
  } else if (face === 'double_heart') {
    return blush + `
      <path d="M142 133 Q156 120 170 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M190 133 Q204 120 218 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <ellipse cx="156" cy="139" rx="11" ry="14" fill="#831843"/>
      <path d="M156 130 Q162 122 168 130 Q156 146 144 130 Q150 122 156 130 Z" fill="#f43f5e"/>
      <circle cx="152" cy="130" r="3" fill="#ffffff"/>

      <ellipse cx="204" cy="139" rx="11" ry="14" fill="#831843"/>
      <path d="M204 130 Q210 122 216 130 Q204 146 192 130 Q198 122 204 130 Z" fill="#f43f5e"/>
      <circle cx="200" cy="130" r="3" fill="#ffffff"/>

      <path d="M172 154 Q180 168 188 154 Z" fill="#ff4081"/>
    `;
  } else if (face === 'teary_sparkle') {
    return `
      <!-- Pien Troubled Eyebrows -->
      <path d="M142 110 Q156 122 168 116" stroke="#5b21b6" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M192 116 Q204 122 218 110" stroke="#5b21b6" stroke-width="3.5" stroke-linecap="round" fill="none"/>

      <ellipse cx="148" cy="148" rx="14" ry="8" fill="#ff7da7" opacity="0.75"/>
      <ellipse cx="212" cy="148" rx="14" ry="8" fill="#ff7da7" opacity="0.75"/>

      <defs>
        <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4c1d95"/>
          <stop offset="50%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#f472b6"/>
        </linearGradient>
      </defs>

      <!-- Giant Pien Sparkling Eyes -->
      ${getWinkStyleOpenEyeSVG(156)}
      ${getWinkStyleOpenEyeSVG(204)}

      <!-- Watery Tear Droplets -->
      <path d="M140 148 Q135 158 141 165 Q147 158 142 148 Z" fill="#38bdf8" opacity="0.95"/>
      <path d="M220 148 Q215 158 221 165 Q227 158 222 148 Z" fill="#38bdf8" opacity="0.95"/>
      <circle cx="141" cy="162" r="1.5" fill="#ffffff"/>
      <circle cx="221" cy="162" r="1.5" fill="#ffffff"/>

      <!-- Pien Wobbly Sad Mouth -->
      <path d="M171 157 Q175 153 180 157 Q185 161 189 157" stroke="#ff4081" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  } else if (face === 'star_eyes') {
    return blush + `
      <path d="M142 133 Q156 120 170 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M190 133 Q204 120 218 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <ellipse cx="156" cy="139" rx="10" ry="14" fill="url(#eyeGrad)"/>
      <polygon points="156,128 159,135 166,135 160,139 162,146 156,142 150,146 152,139 146,135 153,135" fill="#fbbf24"/>
      <circle cx="153" cy="132" r="2.5" fill="#ffffff"/>

      <ellipse cx="204" cy="139" rx="10" ry="14" fill="url(#eyeGrad)"/>
      <polygon points="204,128 207,135 214,135 208,139 210,146 204,142 198,146 200,139 194,135 201,135" fill="#fbbf24"/>
      <circle cx="201" cy="132" r="2.5" fill="#ffffff"/>

      <path d="M172 156 Q180 166 188 156 Z" fill="#ff7da7"/>
    `;
  } else if (face === 'cat_face') {
    return blush + `
      ${getWinkStyleOpenEyeSVG(156)}
      ${getWinkStyleOpenEyeSVG(204)}
      <path d="M170 152 Q175 158 180 153 Q185 158 190 152" stroke="#ff4081" stroke-width="2.5" fill="none"/>
    `;
  } else if (face === 'galaxy_eyes') {
    return blush + `
      <path d="M142 133 Q156 120 170 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M190 133 Q204 120 218 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <ellipse cx="156" cy="139" rx="10" ry="14" fill="#0f172a"/>
      <circle cx="156" cy="139" r="7" fill="#818cf8"/>
      <circle cx="153" cy="133" r="3.5" fill="#ffffff"/>

      <ellipse cx="204" cy="139" rx="10" ry="14" fill="#0f172a"/>
      <circle cx="204" cy="139" r="7" fill="#818cf8"/>
      <circle cx="201" cy="133" r="3.5" fill="#ffffff"/>

      <path d="M172 156 Q180 164 188 156" stroke="#ff4081" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    `;
  } else if (face === 'sakura_eyes') {
    return blush + `
      <path d="M142 133 Q156 120 170 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M190 133 Q204 120 218 133" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <ellipse cx="156" cy="139" rx="10" ry="14" fill="url(#eyeGrad)"/>
      <circle cx="156" cy="139" r="6" fill="#f472b6"/>
      <circle cx="156" cy="139" r="2.5" fill="#fef08a"/>
      <circle cx="152" cy="133" r="3.5" fill="#ffffff"/>

      <ellipse cx="204" cy="139" rx="10" ry="14" fill="url(#eyeGrad)"/>
      <circle cx="204" cy="139" r="6" fill="#f472b6"/>
      <circle cx="204" cy="139" r="2.5" fill="#fef08a"/>
      <circle cx="200" cy="133" r="3.5" fill="#ffffff"/>

      <path d="M172 156 Q180 166 188 156" stroke="#ff4081" stroke-width="3" fill="none" stroke-linecap="round"/>
    `;
  } else if (face === 'surprised') {
    return blush + `
      ${getWinkStyleOpenEyeSVG(156)}
      ${getWinkStyleOpenEyeSVG(204)}
      <circle cx="180" cy="158" r="6" fill="#ff4081"/>
    `;
  } else if (face === 'tehepero') {
    return blush + `
      ${getWinkStyleOpenEyeSVG(156)}
      <path d="M190 138 Q204 148 218 138" stroke="#3b0764" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M172 154 Q180 169 188 154 Z" fill="#ff7da7"/>
    `;
  } else if (face === 'sleepy') {
    return `
      <path d="M144 138 Q156 148 168 138" stroke="#3b0764" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M192 138 Q204 148 216 138" stroke="#3b0764" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="180" cy="155" r="3" fill="#ff7da7"/>
    `;
  }
  return '';
}

// --- Hair Generators ---
function getHairBackSVG(hair, color) {
  const c = color || '#c084fc';
  const scalpBase = `<path d="M124 138 C124 68 150 65 180 65 C210 65 236 68 236 138 Z" fill="${c}"/>`;

  if (hair === 'flowing_long') {
    return scalpBase + `<path d="M125 110 C85 180 90 280 98 340 C180 365 262 340 262 340 C270 280 275 180 235 110 Z" fill="${c}"/>`;
  } else if (hair === 'twintails') {
    return scalpBase + `
      <path d="M140 120 C80 130 70 220 75 280 C108 295 135 240 135 180 Z" fill="${c}"/>
      <path d="M220 120 C280 130 290 220 285 280 C252 295 225 240 225 180 Z" fill="${c}"/>
    `;
  } else if (hair === 'odango') {
    return scalpBase + `
      <circle cx="114" cy="95" r="24" fill="${c}"/>
      <circle cx="246" cy="95" r="24" fill="${c}"/>
    `;
  } else if (hair === 'hime_cut') {
    return scalpBase + `<path d="M125 110 C88 180 92 280 102 345 C180 365 258 345 258 345 C268 280 272 180 235 110 Z" fill="${c}"/>`;
  } else if (hair === 'side_ponytail') {
    return scalpBase + `<path d="M220 120 C290 150 280 240 270 310 C232 300 215 220 215 170 Z" fill="${c}"/>`;
  } else if (hair === 'soft_waves') {
    return scalpBase + `<path d="M125 110 C75 190 88 290 108 340 C140 355 180 345 180 345 C220 355 252 340 252 340 C272 290 285 190 235 110 Z" fill="${c}"/>`;
  } else if (hair === 'ribbon_twins') {
    return scalpBase + `
      <path d="M135 120 C70 140 65 230 70 290 C102 305 130 240 130 180 Z" fill="${c}"/>
      <path d="M225 120 C290 140 295 230 290 290 C258 305 230 240 230 180 Z" fill="${c}"/>
    `;
  } else if (hair === 'unicorn_hair') {
    return scalpBase + `
      <path d="M135 120 C65 130 55 240 60 300 C102 315 130 240 130 180 Z" fill="${c}"/>
      <path d="M225 120 C295 130 305 240 300 300 C258 315 230 240 230 180 Z" fill="${c}"/>
    `;
  } else if (hair === 'rainbow_long') {
    return scalpBase + `<path d="M120 110 C70 180 78 280 88 345 C180 370 272 345 272 345 C280 280 290 180 240 110 Z" fill="${c}"/>`;
  } else if (hair === 'sakura_short') {
    return scalpBase + `<path d="M130 110 C108 150 118 185 127 210 C180 225 233 210 233 210 C242 185 252 150 230 110 Z" fill="${c}"/>`;
  } else if (hair === 'cute_bob') {
    return scalpBase + `<path d="M125 110 C90 160 95 220 110 240 C180 250 250 240 250 240 C265 220 270 160 235 110 Z" fill="${c}"/>`;
  }
  return scalpBase;
}

// --- Silky Smooth Volumetric Front Bangs Generator ---
function getHairFrontSVG(hair, color) {
  const c = color || '#c084fc';

  let frontSVG = `
    <!-- Top Hair Volume Dome & Smooth Bangs -->
    <path d="M126 128 C135 68 225 68 234 128 C220 134 198 120 180 130 C162 120 140 134 126 128 Z" fill="${c}"/>
    <path d="M132 118 Q155 138 168 118 Q180 140 192 118 Q205 138 228 118 C220 85 180 75 132 118 Z" fill="${c}"/>
  `;
  
  if (hair === 'flowing_long' || hair === 'soft_waves' || hair === 'rainbow_long') {
    frontSVG += `
      <path d="M128 112 Q114 170 124 230 Q138 220 134 125 Z" fill="${c}"/>
      <path d="M232 112 Q246 170 236 230 Q222 220 226 125 Z" fill="${c}"/>
    `;
  } else if (hair === 'cute_bob' || hair === 'sakura_short') {
    frontSVG += `
      <path d="M130 112 Q120 165 134 195 Q146 185 140 125 Z" fill="${c}"/>
      <path d="M230 112 Q240 165 226 195 Q214 185 220 125 Z" fill="${c}"/>
    `;
  } else if (hair === 'hime_cut') {
    frontSVG += `
      <path d="M128 112 Q126 160 128 205 Q142 200 142 122 Z" fill="${c}"/>
      <path d="M232 112 Q234 160 232 205 Q218 200 218 122 Z" fill="${c}"/>
    `;
  } else if (hair === 'twintails' || hair === 'odango' || hair === 'side_ponytail' || hair === 'ribbon_twins') {
    frontSVG += `
      <path d="M130 112 Q120 150 132 180 Q142 170 138 122 Z" fill="${c}"/>
      <path d="M230 112 Q240 150 228 180 Q218 170 222 122 Z" fill="${c}"/>
    `;
  } else if (hair === 'cat_ears_hair') {
    frontSVG += `
      <path d="M137 100 Q122 55 155 85 Z" fill="${c}"/>
      <path d="M223 100 Q238 55 205 85 Z" fill="${c}"/>
      <path d="M139 95 Q127 62 150 84 Z" fill="#ffa4d4"/>
      <path d="M221 95 Q233 62 210 84 Z" fill="#ffa4d4"/>
    `;
  } else if (hair === 'unicorn_hair') {
    frontSVG += `
      <path d="M180 88 Q174 38 186 38 Z" fill="#fef08a"/>
      <line x1="176" y1="73" x2="184" y2="69" stroke="#f472b6" stroke-width="2.5"/>
    `;
  }
  return frontSVG;
}

// --- Tailored Outfits Generator ---
function getTopsSVG(top, color) {
  const c = color || '#ff9ebb';
  if (top === 'magical_dress') {
    return `
      <path d="M144 198 Q180 204 216 198 Q222 225 222 245 Q180 250 138 245 C138 225 144 198 144 198 Z" fill="${c}"/>
      <path d="M144 198 Q180 192 216 198 Q218 208 218 214 Q180 210 142 214 Z" fill="#ffffff"/>
      <path d="M138 245 Q180 238 222 245 C258 298 248 312 242 324 Q180 336 118 324 C112 312 102 298 138 245 Z" fill="${c}"/>
      <path d="M118 324 Q180 338 242 324 Q247 330 236 335 Q180 346 124 335 Z" fill="#ffffff"/>
    `;
  } else if (top === 'strawberry_dress') {
    return `
      <path d="M144 198 Q180 203 216 198 Q222 225 222 245 Q180 248 138 245 Z" fill="#ff4d6d"/>
      <path d="M138 245 Q180 240 222 245 C258 300 248 315 242 324 Q180 336 118 324 C112 315 102 300 138 245 Z" fill="#ff4d6d"/>
      <circle cx="162" cy="272" r="4.5" fill="#ffffff"/>
      <circle cx="198" cy="272" r="4.5" fill="#ffffff"/>
      <circle cx="180" cy="296" r="4.5" fill="#ffffff"/>
    `;
  } else if (top === 'starry_lolita') {
    return `
      <path d="M144 198 Q180 203 216 198 Q222 225 222 245 Q180 248 138 245 Z" fill="#312e81"/>
      <path d="M138 245 Q180 240 222 245 C258 300 248 315 242 324 Q180 336 118 324 C112 315 102 300 138 245 Z" fill="#312e81"/>
    `;
  } else if (top === 'sakura_princess') {
    return `
      <path d="M144 198 Q180 203 216 198 Q222 225 222 245 Q180 248 138 245 Z" fill="#f472b6"/>
      <path d="M138 245 Q180 240 222 245 C258 300 248 315 242 324 Q180 336 118 324 C112 315 102 300 138 245 Z" fill="#f472b6"/>
      <circle cx="180" cy="272" r="7" fill="#ffffff" opacity="0.9"/>
    `;
  } else if (top === 'witch_dress') {
    return `
      <path d="M144 198 Q180 203 216 198 Q222 225 222 245 Q180 248 138 245 Z" fill="#4c1d95"/>
      <path d="M138 245 Q180 240 222 245 C258 300 248 315 242 324 Q180 336 118 324 C112 315 102 300 138 245 Z" fill="#4c1d95"/>
    `;
  } else if (top === 'alice_dress') {
    return `
      <path d="M144 198 Q180 203 216 198 Q222 225 222 245 Q180 248 138 245 Z" fill="#38bdf8"/>
      <path d="M138 245 Q180 240 222 245 C258 300 248 315 242 324 Q180 336 118 324 C112 315 102 300 138 245 Z" fill="#38bdf8"/>
      <path d="M162 208 Q180 208 198 208 Q203 265 208 320 Q180 326 152 320 Z" fill="#ffffff"/>
    `;
  } else if (top === 'maid_dress') {
    return `
      <path d="M144 198 Q180 203 216 198 Q222 225 222 245 Q180 248 138 245 Z" fill="#1e1b4b"/>
      <path d="M138 245 Q180 240 222 245 C258 300 248 315 242 324 Q180 336 118 324 C112 315 102 300 138 245 Z" fill="#1e1b4b"/>
      <path d="M160 206 Q180 206 200 206 Q205 265 210 318 Q180 326 150 318 Z" fill="#ffffff"/>
    `;
  } else if (top === 'cat_hoodie_dress') {
    return `
      <path d="M134 195 Q180 200 226 195 C234 250 238 288 236 315 Q180 324 124 315 C122 288 126 250 134 195 Z" fill="${c}"/>
      <path d="M156 262 Q180 258 204 262 Q201 282 198 295 Q180 300 162 295 Z" fill="#ffffff"/>
    `;
  } else if (top === 'panda_hoodie') {
    return `
      <path d="M134 195 Q180 200 226 195 C234 250 238 288 236 315 Q180 324 124 315 C122 288 126 250 134 195 Z" fill="#ffffff"/>
      <circle cx="166" cy="268" r="9" fill="#1e1b4b"/>
      <circle cx="194" cy="268" r="9" fill="#1e1b4b"/>
    `;
  } else if (top === 'yumekawa_tshirt') {
    return `
      <path d="M144 198 Q180 203 216 198 Q220 228 224 252 Q180 257 136 252 Q140 228 144 198 Z" fill="${c}"/>
    `;
  } else if (top === 'frill_blouse') {
    return `
      <path d="M144 198 Q180 203 216 198 Q218 228 220 252 Q180 256 140 252 Z" fill="#ffffff"/>
      <path d="M160 198 Q180 212 200 198 Q202 228 204 252 Q180 257 156 252 Z" fill="${c}" opacity="0.85"/>
    `;
  } else if (top === 'sailor_shirt') {
    return `
      <path d="M144 198 Q180 203 216 198 Q219 228 222 252 Q180 256 138 252 Z" fill="#ffffff"/>
      <path d="M174 222 Q180 230 186 222 Q185 238 180 240 Q175 238 174 222 Z" fill="#ff4757"/>
    `;
  } else if (top === 'pastel_hoodie') {
    return `
      <path d="M136 196 Q180 200 224 196 Q228 232 231 262 Q180 267 129 262 Z" fill="${c}"/>
    `;
  } else if (top === 'strawberry_top') {
    return `
      <path d="M144 198 Q180 203 216 198 Q218 228 220 250 Q180 254 140 250 Z" fill="#ff4d6d"/>
      <circle cx="166" cy="218" r="2" fill="#ffffff"/>
      <circle cx="194" cy="218" r="2" fill="#ffffff"/>
      <circle cx="180" cy="230" r="2" fill="#ffffff"/>
    `;
  } else if (top === 'sakura_cardigan') {
    return `
      <path d="M142 198 Q180 203 218 198 Q221 228 224 252 Q180 257 136 252 Z" fill="#fbcfe8"/>
    `;
  }
  return '';
}

function getBottomsSVG(bottom, color) {
  const c = color || '#a7f3d0';
  if (bottom === 'frill_skirt') {
    return `
      <path d="M144 245 Q180 248 216 245 C224 268 228 282 230 292 Q180 304 130 292 C132 282 136 268 144 245 Z" fill="${c}"/>
      <path d="M130 292 Q180 304 230 292 Q235 298 225 303 Q180 312 135 303 Z" fill="#ffffff"/>
    `;
  } else if (bottom === 'heart_skirt') {
    return `
      <path d="M144 245 Q180 248 216 245 C224 268 228 282 231 294 Q180 306 129 294 C132 282 136 268 144 245 Z" fill="${c}"/>
    `;
  } else if (bottom === 'pastel_shorts') {
    return `
      <path d="M146 245 Q180 247 214 245 C218 266 220 283 220 283 Q200 286 182 283 Q180 262 178 283 Q160 286 140 283 C140 283 142 266 146 245 Z" fill="${c}"/>
    `;
  } else if (bottom === 'dreamy_tutu') {
    return `
      <path d="M140 245 Q180 248 220 245 Q248 282 238 300 Q180 315 122 300 Q112 282 140 245 Z" fill="${c}" opacity="0.8"/>
      <path d="M124 296 Q180 312 236 296 Q242 305 230 310 Q180 323 130 310 Z" fill="#ffffff" opacity="0.9"/>
    `;
  } else if (bottom === 'flare_skirt') {
    return `
      <path d="M144 245 Q180 247 216 245 C222 268 226 282 229 294 Q180 304 131 294 C134 282 138 268 144 245 Z" fill="${c}"/>
    `;
  } else if (bottom === 'denim_ribbon') {
    return `
      <path d="M144 245 Q180 247 216 245 Q220 268 223 289 Q180 297 137 289 Z" fill="#38bdf8"/>
    `;
  }
  return '';
}

function getShoesSVG(shoes, color) {
  const c = color || '#ff9ebb';
  if (shoes === 'ribbon_pumps') {
    return `
      <ellipse cx="165" cy="412" rx="9" ry="5.5" fill="${c}"/>
      <ellipse cx="195" cy="412" rx="9" ry="5.5" fill="${c}"/>
      <circle cx="165" cy="409" r="2.5" fill="#ffffff"/>
      <circle cx="195" cy="409" r="2.5" fill="#ffffff"/>
    `;
  } else if (shoes === 'glass_slippers') {
    return `
      <ellipse cx="165" cy="412" rx="10" ry="5.5" fill="#a5f3fc" opacity="0.85"/>
      <ellipse cx="195" cy="412" rx="10" ry="5.5" fill="#a5f3fc" opacity="0.85"/>
    `;
  } else if (shoes === 'toe_shoes') {
    return `
      <ellipse cx="165" cy="412" rx="9" ry="5.5" fill="#fbcfe8"/>
      <ellipse cx="195" cy="412" rx="9" ry="5.5" fill="#fbcfe8"/>
      <path d="M160 395 Q164 402 168 408" stroke="#f472b6" stroke-width="2" fill="none"/>
      <path d="M190 395 Q194 402 198 408" stroke="#f472b6" stroke-width="2" fill="none"/>
    `;
  } else if (shoes === 'pastel_sneakers') {
    return `
      <path d="M154 402 Q164 398 174 402 C176 410 174 415 154 415 Z" fill="${c}"/>
      <path d="M186 402 Q196 398 206 402 C208 410 206 415 186 415 Z" fill="${c}"/>
      <path d="M154 411 Q164 410 174 411 Q174 415 154 415 Z" fill="#ffffff"/>
      <path d="M186 411 Q196 410 206 411 Q206 415 186 415 Z" fill="#ffffff"/>
    `;
  } else if (shoes === 'platform_boots') {
    return `
      <path d="M154 380 Q164 378 174 380 Q176 412 174 414 Q164 416 154 414 Z" fill="${c}"/>
      <path d="M186 380 Q196 378 206 380 Q208 412 206 414 Q196 416 186 414 Z" fill="${c}"/>
    `;
  } else if (shoes === 'fluffy_slippers') {
    return `
      <circle cx="165" cy="410" r="11" fill="#ffffff"/>
      <circle cx="195" cy="410" r="11" fill="#ffffff"/>
      <circle cx="165" cy="410" r="5.5" fill="${c}"/>
      <circle cx="195" cy="410" r="5.5" fill="${c}"/>
    `;
  }
  return '';
}

// --- Sleek, Slender & Delicate Accessories Generator ---
function getAccessoriesSVG(acc, color) {
  const c = color || '#fef08a';
  if (acc === 'angel_wings') {
    return `
      <!-- Sleek Golden Yellow Angel Ring -->
      <ellipse cx="180" cy="72" rx="22" ry="6" fill="none" stroke="#fbbf24" stroke-width="3.5"/>
      <ellipse cx="180" cy="72" rx="22" ry="6" fill="none" stroke="#fef08a" stroke-width="2"/>

      <!-- Slender Delicate Feather Wings -->
      <path d="M130 208 Q65 172 70 238 Q92 256 132 238 Z" fill="#ffffff" opacity="0.95"/>
      <path d="M230 208 Q295 172 290 238 Q268 256 228 238 Z" fill="#ffffff" opacity="0.95"/>
    `;
  } else if (acc === 'tiara') {
    return `
      <!-- Slender Princess Tiara -->
      <path d="M162 95 Q180 82 198 95 Q190 101 170 101 Z" fill="#fef08a" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="180" cy="88" r="2.5" fill="#ff4081"/>
    `;
  } else if (acc === 'magical_wand') {
    return `
      <!-- Slender Magical Wand -->
      <path d="M228 258 Q242 228 256 198" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="256" cy="195" r="6.5" fill="${c}"/>
    `;
  } else if (acc === 'teddy_bear') {
    return `
      <!-- Dainty Plush Teddy Bear -->
      <circle cx="224" cy="245" r="11" fill="#d97706"/>
      <circle cx="219" cy="236" r="3" fill="#b45309"/>
      <circle cx="229" cy="236" r="3" fill="#b45309"/>
    `;
  } else if (acc === 'satin_bow') {
    return `
      <!-- Slender Satin Bow Ribbon Hairpin -->
      <path d="M195 90 Q182 82 178 94 Q182 106 195 98 Z" fill="${c}"/>
      <path d="M215 90 Q228 82 232 94 Q228 106 215 98 Z" fill="${c}"/>
      <circle cx="205" cy="94" r="4" fill="#ffffff"/>
    `;
  } else if (acc === 'heart_glasses') {
    return `
      <!-- Slender Wire-Frame Heart Glasses -->
      <path d="M142 136 Q154 122 166 136 Q154 152 142 136 Z" fill="${c}" opacity="0.65" stroke="#e879f9" stroke-width="1.5"/>
      <path d="M194 136 Q206 122 218 136 Q206 152 194 136 Z" fill="${c}" opacity="0.65" stroke="#e879f9" stroke-width="1.5"/>
      <path d="M166 136 Q180 134 194 136" stroke="#e879f9" stroke-width="2" fill="none" stroke-linecap="round"/>
    `;
  } else if (acc === 'cat_headband') {
    return `
      <!-- Slender Cat Headband -->
      <path d="M142 105 Q180 92 218 105" stroke="#4c1d95" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M145 100 Q136 72 158 92 Z" fill="${c}"/>
      <path d="M215 100 Q224 72 202 92 Z" fill="${c}"/>
    `;
  } else if (acc === 'fancy_sunglasses') {
    return `
      <!-- Sleek Slender Sunglasses -->
      <path d="M144 133 Q156 129 168 133 Q168 144 156 146 Q144 144 144 133 Z" fill="#1e1b4b"/>
      <path d="M192 133 Q204 129 216 133 Q216 144 204 146 Q192 144 192 133 Z" fill="#1e1b4b"/>
      <path d="M168 135 Q180 133 192 135" stroke="#1e1b4b" stroke-width="2" fill="none" stroke-linecap="round"/>
    `;
  }
  return '';
}

// --- Interactive Sparkles Particle Canvas ---
let particles = [];
let particleCtx = null;

function initParticles() {
  const pCanvas = document.getElementById('particle-canvas');
  if (!pCanvas) return;
  pCanvas.width = 360;
  pCanvas.height = 480;
  particleCtx = pCanvas.getContext('2d');

  function loop() {
    particleCtx.clearRect(0, 0, 360, 480);
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      p.scale += 0.01;

      if (p.alpha <= 0) {
        particles.splice(idx, 1);
        return;
      }

      particleCtx.save();
      particleCtx.globalAlpha = p.alpha;
      particleCtx.translate(p.x, p.y);
      particleCtx.fillStyle = p.color;

      if (p.type === 'star') {
        drawStar(particleCtx, 0, 0, 5, p.size * p.scale, p.size * 0.5 * p.scale);
      } else {
        drawHeart(particleCtx, 0, 0, p.size * p.scale);
      }
      particleCtx.restore();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

function spawnSparkles(x, y, count = 6) {
  const colors = ['#ff4081', '#c084fc', '#fef08a', '#38bdf8', '#ffffff'];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4 - 1,
      size: Math.random() * 8 + 6,
      alpha: 1,
      scale: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.4 ? 'star' : 'heart'
    });
  }
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
  ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fill();
}

// --- Features: BGM Toggle ---
function toggleBgm() {
  const btn = document.getElementById('btn-bgm');
  const isPlaying = window.soundManager.toggleBgm();
  if (isPlaying) {
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = '<span class="icon">🎶</span> BGM: オン';
    }
    showToast('🎶 BGMがながれはじめたよ！');
  } else {
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '<span class="icon">🎵</span> BGM: オフ';
    }
  }
}

// --- MAGICAL DREAM WORLD TELEPORT ENGINE ---
function warpToDreamWorld() {
  const portal = document.getElementById('warp-portal-effect');
  const modal = document.getElementById('dream-world-modal');
  const dreamSvg = document.getElementById('dream-stage-svg');
  const mainSvg = document.getElementById('stage-svg');

  if (window.soundManager) soundManager.playFanfare();
  if (portal) portal.classList.add('warping');

  if (dreamSvg && mainSvg) dreamSvg.innerHTML = mainSvg.innerHTML;

  setTimeout(() => {
    if (modal) modal.classList.add('active');
    if (portal) portal.classList.remove('warping');

    const currentTop = itemCatalog.tops.find(t => t.id === state.top);
    const topName = currentTop ? currentTop.name : 'お洋服';
    const speechText = document.getElementById('world-speech-text');
    if (speechText) {
      speechText.innerHTML = 
        `わぁ〜！魔法の世界へつれてきてくれて ありがとう！✨<br>あなたが着せてくれた『${topName}』、とってもお気に入りだよ！💖`;
    }
    
    showToast('✨ 魔法の世界にワープしたよ！');
  }, 500);
}

function closeDreamWorld() {
  const modal = document.getElementById('dream-world-modal');
  if (modal) modal.classList.remove('active');
  if (window.soundManager) soundManager.playSparkle();
}

function talkToWorldBot(topic) {
  const bubbleText = document.getElementById('world-speech-text');
  if (!bubbleText) return;
  if (window.soundManager) soundManager.playPop();

  if (topic === 'outfit') {
    const currentTop = itemCatalog.tops.find(t => t.id === state.top);
    const currentHair = itemCatalog.hair.find(h => h.id === state.hair);
    const topName = currentTop ? currentTop.name : 'お洋服';
    const hairName = currentHair ? currentHair.name : '髪型';
    
    bubbleText.innerHTML = `この『${topName}』と『${hairName}』の組み合わせ、世界でいちばん大好きなの！💖<br>私をこんなに可愛くしてくれて 本当にありがとう！✨`;
  } else if (topic === 'riddle') {
    const riddles = [
      `【魔法のなぞなぞ】<br>空（そら）に浮かぶ、たべられる クモ（雲）は な〜んだ？☁️<br><br>（こたえ：わたあめ！🍬）`,
      `【魔法のなぞなぞ】<br>夜になると 輝（かがや）いて、ねがいごとを 叶えてくれる 星は な〜んだ？⭐<br><br>（こたえ：ながれ星！✨）`,
      `【魔法のなぞなぞ】<br>たたくと おもしろい音がして、みんなが笑顔になっちゃう楽器は な〜んだ？🥁<br><br>（こたえ：タイコ！ピコピコ！）`
    ];
    bubbleText.innerHTML = riddles[Math.floor(Math.random() * riddles.length)];
  } else if (topic === 'fortune') {
    const fortunes = [
      `✨きょうの 魔法うらない✨<br>⭐ ラッキーカラー：パステルピンク💖<br>⭐ ラッキー魔法：笑顔になれる魔法！<br>あなたが選んでくれたお洋服で、世界じゅうがハッピーに包まれるよ！🌈`,
      `✨きょうの 魔法うらない✨<br>⭐ ラッキーカラー：キラキラゴールド⭐<br>⭐ ラッキー魔法：すきな夢が見られる魔法！<br>きょうは 最高のハッピーデーになるよ！✨`
    ];
    bubbleText.innerHTML = fortunes[Math.floor(Math.random() * fortunes.length)];
  } else if (topic === 'chat') {
    const chats = [
      `ねぇねぇ！この魔法の世界、キラキラしてて楽しいね！いっしょに遊ぼう！✨`,
      `あなたとお話できて すっごく嬉しいな！今日はいっぱい思い出つくろうね！💖`,
      `ふんわり雲の上を おさんぽするの 大好きなの！いっしょに行ってみる？☁️✨`
    ];
    bubbleText.innerHTML = chats[Math.floor(Math.random() * chats.length)];
  }
}

function triggerToyEffect(toyType) {
  const bubbleText = document.getElementById('world-speech-text');
  if (!bubbleText) return;
  if (window.soundManager) soundManager.playSparkle();

  if (toyType === 'balloon') {
    bubbleText.innerHTML = `わぁ〜！ふわふわの風船だー！🎈✨<br>いっしょにお空にのぼっちゃいそう！ありがとう！💖`;
    spawnSparkles(180, 200, 15);
  } else if (toyType === 'candy') {
    bubbleText.innerHTML = `大好きなパフェだー！🍨✨<br>モグモグ…あまくて すっごく美味しい〜！幸せ〜！😋💖`;
    spawnSparkles(180, 200, 15);
  } else if (toyType === 'star') {
    bubbleText.innerHTML = `わぁ！きれいな流れ星！⭐✨<br>『これからも あなたと ずっと仲良しでいられますように…！』ねがいごと完了！💖`;
    spawnSparkles(180, 200, 20);
  }
}

// --- Features: BGM Track Change ---
function changeBgmTrack(val) {
  if (window.soundManager) {
    soundManager.setTrack(parseInt(val, 10));
    showToast('🎵 BGMを切り替えたよ！');
  }
}

// --- Helper: Random Outfit ---
function triggerRandomOutfit() {
  const btn = document.getElementById('btn-random');
  if (btn) btn.classList.add('spin-anim');

  let spins = 0;
  const interval = setInterval(() => {
    spins++;
    if (window.soundManager) soundManager.playRoulette();

    const randomHair = itemCatalog.hair[Math.floor(Math.random() * itemCatalog.hair.length)];
    const randomFace = itemCatalog.face[Math.floor(Math.random() * itemCatalog.face.length)];
    const randomTop = itemCatalog.tops[Math.floor(Math.random() * itemCatalog.tops.length)];
    const randomBottom = itemCatalog.bottoms[Math.floor(Math.random() * itemCatalog.bottoms.length)];
    const randomShoe = itemCatalog.shoes[Math.floor(Math.random() * itemCatalog.shoes.length)];
    const randomAcc = itemCatalog.accessories[Math.floor(Math.random() * itemCatalog.accessories.length)];
    const randomBg = itemCatalog.background[Math.floor(Math.random() * itemCatalog.background.length)];

    state.hair = randomHair.id;
    state.face = randomFace.id;
    state.top = randomTop.id;
    state.bottom = randomTop.isDress ? 'none' : randomBottom.id;
    state.shoes = randomShoe.id;
    state.accessory = randomAcc.id;
    state.background = randomBg.id;

    state.hairColor = paletteColors[Math.floor(Math.random() * paletteColors.length)];
    state.topColor = paletteColors[Math.floor(Math.random() * paletteColors.length)];
    state.bottomColor = paletteColors[Math.floor(Math.random() * paletteColors.length)];
    state.shoesColor = paletteColors[Math.floor(Math.random() * paletteColors.length)];
    state.accessoryColor = paletteColors[Math.floor(Math.random() * paletteColors.length)];

    renderStage();

    if (spins >= 10) {
      clearInterval(interval);
      if (btn) btn.classList.remove('spin-anim');
      renderItems();
      renderPalette();
      spawnSparkles(180, 200, 20);
      if (window.soundManager) soundManager.playFanfare();
      showToast('🎲 かんせい！すてきなコーデができたよ✨');
    }
  }, 70);
}

// --- Features: Save Photo PNG ---
function savePhoto() {
  if (window.soundManager) soundManager.playCamera();
  spawnSparkles(180, 240, 15);

  const svgElement = document.getElementById('stage-svg');
  if (!svgElement) return;
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const URL = window.URL || window.webkitURL || window;
  const blobURL = URL.createObjectURL(svgBlob);

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(image, 0, 0, 720, 960);
    downloadCanvasAsPNG(canvas);
  };
  image.src = blobURL;
}

function downloadCanvasAsPNG(canvas) {
  const link = document.createElement('a');
  link.download = 'yumekawa_dressup.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('📸 しゃしんを保存したよ！');
}

// --- Features: Reset Outfit ---
function resetOutfit() {
  state.hair = 'flowing_long';
  state.hairColor = '#c084fc';
  state.face = 'smile';
  state.top = 'magical_dress';
  state.topColor = '#ff9ebb';
  state.bottom = 'none';
  state.shoes = 'ribbon_pumps';
  state.accessory = 'angel_wings';
  state.background = 'royal_palace';

  renderItems();
  renderPalette();
  renderStage();
  if (window.soundManager) soundManager.playSparkle();
  showToast('🔄 リセットしたよ！');
}

// --- Helper: Toast Notification ---
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const toastMsg = document.getElementById('toast-msg');
  if (toastMsg) toastMsg.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
