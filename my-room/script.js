/**
 * マイルームメーカー 🛋️✨ - script.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. 家具マスターデータ（SVG）
  // --------------------------------------------------
  const FURNITURE_ITEMS = [
    // === おかし (sweets) ===
    {
      id: 'sw-bed',
      category: 'sweets',
      name: 'ケーキベッド',
      width: 140,
      height: 100,
      svg: `
        <svg viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- スポンジ & クリーム -->
          <rect x="15" y="45" width="110" height="40" rx="14" fill="#FFE8D6" stroke="#FFAAA6" stroke-width="3"/>
          <path d="M15 65 Q 30 75 45 65 Q 60 75 75 65 Q 90 75 105 65 Q 120 75 125 65 L 125 78 Q 120 85 105 85 Q 90 85 75 85 Q 60 85 45 85 Q 30 85 15 78 Z" fill="#FF85A1"/>
          <!-- お布団（ホイップクリーム） -->
          <rect x="35" y="38" width="85" height="42" rx="12" fill="#FFFFFF" stroke="#FFD1DC" stroke-width="3"/>
          <path d="M35 55 Q 50 63 65 55 Q 80 63 95 55 Q 110 63 120 55" stroke="#FFAAA6" stroke-width="3" fill="none" stroke-linecap="round"/>
          <!-- まくら -->
          <rect x="22" y="32" width="30" height="22" rx="8" fill="#FFF0F5" stroke="#FFAAA6" stroke-width="2.5"/>
          <!-- いちごトッピング -->
          <g transform="translate(18, 12)">
            <path d="M12 2 C 5 2 2 10 5 18 C 7 24 12 28 12 28 C 12 28 17 24 19 18 C 22 10 19 2 12 2 Z" fill="#FF3366"/>
            <circle cx="8" cy="12" r="1" fill="#FFE5EC"/>
            <circle cx="14" cy="10" r="1" fill="#FFE5EC"/>
            <circle cx="11" cy="18" r="1" fill="#FFE5EC"/>
            <path d="M9 2 Q 12 -2 15 2 Q 12 4 9 2 Z" fill="#68D391"/>
          </g>
          <!-- 脚 -->
          <rect x="25" y="85" width="8" height="10" rx="3" fill="#D4A373"/>
          <rect x="107" y="85" width="8" height="10" rx="3" fill="#D4A373"/>
        </svg>
      `
    },
    {
      id: 'sw-table',
      category: 'sweets',
      name: 'チョコテーブル',
      width: 100,
      height: 70,
      svg: `
        <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- テーブル天板（板チョコ） -->
          <rect x="10" y="16" width="80" height="32" rx="8" fill="#6F4E37" stroke="#4A3319" stroke-width="3"/>
          <!-- チョコのブロック線 -->
          <rect x="15" y="20" width="20" height="10" rx="2" fill="#855C3D"/>
          <rect x="40" y="20" width="20" height="10" rx="2" fill="#855C3D"/>
          <rect x="65" y="20" width="20" height="10" rx="2" fill="#855C3D"/>
          <rect x="15" y="33" width="20" height="10" rx="2" fill="#855C3D"/>
          <rect x="40" y="33" width="20" height="10" rx="2" fill="#855C3D"/>
          <rect x="65" y="33" width="20" height="10" rx="2" fill="#855C3D"/>
          <!-- とろ〜りホワイトチョコ -->
          <path d="M12 16 C 18 24 22 24 28 16 C 34 26 42 26 48 16" fill="#FFFDF0" stroke="#FFFDF0" stroke-width="4" stroke-linecap="round"/>
          <!-- 脚（ビスケット） -->
          <rect x="18" y="48" width="8" height="18" rx="3" fill="#E9C46A" stroke="#C99A3E" stroke-width="2"/>
          <rect x="74" y="48" width="8" height="18" rx="3" fill="#E9C46A" stroke="#C99A3E" stroke-width="2"/>
        </svg>
      `
    },
    {
      id: 'sw-donut',
      category: 'sweets',
      name: 'ドーナツクッション',
      width: 70,
      height: 70,
      svg: `
        <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- ドーナツ生地 -->
          <ellipse cx="35" cy="36" rx="30" ry="26" fill="#F4A261" stroke="#E76F51" stroke-width="3"/>
          <!-- いちごアイシング -->
          <path d="M10 32 C 10 18 20 12 35 12 C 50 12 60 18 60 32 C 58 38 52 35 48 40 C 44 45 40 42 35 44 C 30 46 25 40 20 42 C 15 44 11 38 10 32 Z" fill="#FF85A1"/>
          <!-- 穴 -->
          <ellipse cx="35" cy="35" rx="10" ry="8" fill="#F7E1C8" stroke="#E76F51" stroke-width="2.5"/>
          <!-- チョコスプレー -->
          <line x1="22" y1="20" x2="28" y2="23" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
          <line x1="42" y1="18" x2="48" y2="21" stroke="#FEE440" stroke-width="3" stroke-linecap="round"/>
          <line x1="26" y1="32" x2="24" y2="38" stroke="#00F5D4" stroke-width="3" stroke-linecap="round"/>
          <line x1="45" y1="32" x2="51" y2="35" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `
    },
    {
      id: 'sw-lamp',
      category: 'sweets',
      name: 'キャンディランプ',
      width: 60,
      height: 100,
      svg: `
        <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 傘（ペロペロキャンディ型） -->
          <circle cx="30" cy="30" r="24" fill="#FFB3C6" stroke="#FF5376" stroke-width="3"/>
          <!-- ぐるぐるうずまき -->
          <path d="M30 30 m -16 0 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
          <path d="M30 30 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0" stroke="#FF6584" stroke-width="3" stroke-linecap="round" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#FFFFFF"/>
          <!-- 支柱 -->
          <rect x="28" y="54" width="4" height="36" rx="2" fill="#E2E8F0" stroke="#CBD5E0" stroke-width="1.5"/>
          <!-- 土台 -->
          <ellipse cx="30" cy="92" rx="18" ry="6" fill="#FFC6FF" stroke="#FF5376" stroke-width="2"/>
        </svg>
      `
    },

    // === ナチュラル (natural) ===
    {
      id: 'nat-bed',
      category: 'natural',
      name: 'ウッドベッド',
      width: 130,
      height: 90,
      svg: `
        <svg viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- ヘッドボード -->
          <rect x="10" y="15" width="16" height="65" rx="6" fill="#BC8A5F" stroke="#8C5338" stroke-width="3"/>
          <circle cx="18" cy="24" r="3" fill="#8C5338"/>
          <!-- ベッド本体 -->
          <rect x="22" y="45" width="98" height="30" rx="8" fill="#DDA15E" stroke="#8C5338" stroke-width="3"/>
          <!-- お布団（若草グリーン＆北欧チェック） -->
          <rect x="42" y="40" width="76" height="32" rx="8" fill="#CCD5AE" stroke="#8A9A5B" stroke-width="2.5"/>
          <line x1="56" y1="40" x2="56" y2="72" stroke="#8A9A5B" stroke-width="1.5" stroke-dasharray="3 3"/>
          <line x1="74" y1="40" x2="74" y2="72" stroke="#8A9A5B" stroke-width="1.5" stroke-dasharray="3 3"/>
          <line x1="92" y1="40" x2="92" y2="72" stroke="#8A9A5B" stroke-width="1.5" stroke-dasharray="3 3"/>
          <!-- まくら -->
          <rect x="26" y="34" width="22" height="18" rx="6" fill="#FAEDCD" stroke="#D4A373" stroke-width="2"/>
          <!-- 脚 -->
          <rect x="110" y="75" width="8" height="12" rx="2" fill="#8C5338"/>
        </svg>
      `
    },
    {
      id: 'nat-plant',
      category: 'natural',
      name: 'ハートの植木鉢',
      width: 60,
      height: 80,
      svg: `
        <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 植木鉢 -->
          <path d="M16 46 L 44 46 L 40 76 L 20 76 Z" fill="#E07A5F" stroke="#C35338" stroke-width="2.5"/>
          <rect x="14" y="42" width="32" height="6" rx="3" fill="#F4F1DE" stroke="#C35338" stroke-width="2"/>
          <!-- 茎 -->
          <path d="M30 42 Q 28 26 22 16" stroke="#588157" stroke-width="3" stroke-linecap="round"/>
          <path d="M30 36 Q 36 28 42 22" stroke="#588157" stroke-width="3" stroke-linecap="round"/>
          <!-- ハートの葉っぱ -->
          <path d="M22 16 C 14 10 12 22 22 28 C 32 22 30 10 22 16 Z" fill="#74A869" stroke="#3A5A40" stroke-width="2"/>
          <path d="M42 22 C 36 18 34 28 42 32 C 50 28 48 18 42 22 Z" fill="#88C27E" stroke="#3A5A40" stroke-width="2"/>
        </svg>
      `
    },
    {
      id: 'nat-chair',
      category: 'natural',
      name: 'カフェチェア',
      width: 60,
      height: 80,
      svg: `
        <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ -->
          <rect x="18" y="12" width="24" height="28" rx="6" fill="#F4F1DE" stroke="#8C5338" stroke-width="2.5"/>
          <line x1="24" y1="16" x2="24" y2="36" stroke="#8C5338" stroke-width="2"/>
          <line x1="30" y1="16" x2="30" y2="36" stroke="#8C5338" stroke-width="2"/>
          <line x1="36" y1="16" x2="36" y2="36" stroke="#8C5338" stroke-width="2"/>
          <!-- 座面 -->
          <ellipse cx="30" cy="44" rx="18" ry="8" fill="#DDA15E" stroke="#8C5338" stroke-width="2.5"/>
          <!-- 脚 -->
          <line x1="18" y1="48" x2="14" y2="76" stroke="#8C5338" stroke-width="3" stroke-linecap="round"/>
          <line x1="42" y1="48" x2="46" y2="76" stroke="#8C5338" stroke-width="3" stroke-linecap="round"/>
          <line x1="24" y1="48" x2="22" y2="72" stroke="#8C5338" stroke-width="2" stroke-linecap="round"/>
          <line x1="36" y1="48" x2="38" y2="72" stroke="#8C5338" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    },

    // === ポップ (pop) ===
    {
      id: 'pop-star-rug',
      category: 'pop',
      name: 'お星さまラグ',
      width: 100,
      height: 90,
      svg: `
        <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 星形 -->
          <path d="M50 8 L 62 34 L 92 36 L 68 54 L 76 82 L 50 66 L 24 82 L 32 54 L 8 36 L 38 34 Z" fill="#FFE066" stroke="#F59F00" stroke-width="3.5" stroke-linejoin="round"/>
          <!-- にっこり顔 -->
          <circle cx="42" cy="46" r="3" fill="#D9480F"/>
          <circle cx="58" cy="46" r="3" fill="#D9480F"/>
          <path d="M46 54 Q 50 58 54 54" stroke="#D9480F" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <ellipse cx="37" cy="50" rx="3" ry="2" fill="#FFA8A8"/>
          <ellipse cx="63" cy="50" rx="3" ry="2" fill="#FFA8A8"/>
        </svg>
      `
    },
    {
      id: 'pop-boombox',
      category: 'pop',
      name: 'ポップラジカセ',
      width: 80,
      height: 60,
      svg: `
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 持ち手 -->
          <path d="M26 18 V 8 H 54 V 18" stroke="#4DABF7" stroke-width="3" stroke-linecap="round" fill="none"/>
          <!-- 本体 -->
          <rect x="10" y="16" width="60" height="38" rx="8" fill="#4DABF7" stroke="#1971C2" stroke-width="3"/>
          <!-- スピーカー左右 -->
          <circle cx="24" cy="36" r="10" fill="#FFE066" stroke="#F59F00" stroke-width="2"/>
          <circle cx="24" cy="36" r="5" fill="#339AF0"/>
          <circle cx="56" cy="36" r="10" fill="#FFE066" stroke="#F59F00" stroke-width="2"/>
          <circle cx="56" cy="36" r="5" fill="#339AF0"/>
          <!-- カセット部 -->
          <rect x="36" y="28" width="8" height="14" rx="2" fill="#FFFFFF"/>
        </svg>
      `
    },
    {
      id: 'pop-gaming-chair',
      category: 'pop',
      name: 'ポップチェア',
      width: 70,
      height: 100,
      svg: `
        <svg viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ -->
          <path d="M20 15 C 20 10 26 8 35 8 C 44 8 50 10 50 15 L 48 56 L 22 56 Z" fill="#9775FA" stroke="#7048E8" stroke-width="3"/>
          <path d="M26 16 H 44 V 30 H 26 Z" fill="#E599F7"/>
          <circle cx="28" cy="22" r="2" fill="#7048E8"/>
          <circle cx="42" cy="22" r="2" fill="#7048E8"/>
          <!-- 座面 -->
          <rect x="16" y="56" width="38" height="14" rx="6" fill="#CC5DE8" stroke="#7048E8" stroke-width="3"/>
          <!-- ひじかけ -->
          <rect x="10" y="44" width="6" height="16" rx="3" fill="#7048E8"/>
          <rect x="54" y="44" width="6" height="16" rx="3" fill="#7048E8"/>
          <!-- 脚 -->
          <rect x="32" y="70" width="6" height="16" fill="#868E96"/>
          <line x1="18" y1="88" x2="52" y2="88" stroke="#495057" stroke-width="4" stroke-linecap="round"/>
          <circle cx="18" cy="92" r="3" fill="#212529"/>
          <circle cx="35" cy="92" r="3" fill="#212529"/>
          <circle cx="52" cy="92" r="3" fill="#212529"/>
        </svg>
      `
    },

    // === ゆめかわ (yumekawa) ===
    {
      id: 'yume-unicorn',
      category: 'yumekawa',
      name: 'ユニコーン',
      width: 80,
      height: 80,
      svg: `
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- つの -->
          <polygon points="38,8 44,22 34,22" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <!-- たてがみ -->
          <path d="M48 24 C 54 28 58 38 52 48" stroke="#B197FC" stroke-width="6" stroke-linecap="round" fill="none"/>
          <path d="M52 28 C 58 34 60 42 56 50" stroke="#FF85A1" stroke-width="5" stroke-linecap="round" fill="none"/>
          <path d="M55 34 C 62 40 62 46 58 54" stroke="#63E6BE" stroke-width="4" stroke-linecap="round" fill="none"/>
          <!-- 体 & 顔 -->
          <ellipse cx="36" cy="46" rx="20" ry="16" fill="#FFFFFF" stroke="#E599F7" stroke-width="2.5"/>
          <ellipse cx="30" cy="30" rx="14" ry="12" fill="#FFFFFF" stroke="#E599F7" stroke-width="2.5"/>
          <!-- おみみ -->
          <polygon points="22,18 28,24 20,26" fill="#FCC2D7" stroke="#E599F7" stroke-width="1.5"/>
          <!-- 目（すやすや） -->
          <path d="M24 32 Q 28 36 32 32" stroke="#7048E8" stroke-width="2" stroke-linecap="round" fill="none"/>
          <!-- ほっぺ -->
          <circle cx="23" cy="35" r="3" fill="#FFA8A8" opacity="0.8"/>
          <!-- 脚 -->
          <rect x="22" y="58" width="6" height="14" rx="3" fill="#FFFFFF" stroke="#E599F7" stroke-width="2"/>
          <rect x="42" y="58" width="6" height="14" rx="3" fill="#FFFFFF" stroke="#E599F7" stroke-width="2"/>
          <!-- ひづめ -->
          <rect x="22" y="68" width="6" height="4" rx="1" fill="#FFE066"/>
          <rect x="42" y="68" width="6" height="4" rx="1" fill="#FFE066"/>
        </svg>
      `
    },
    {
      id: 'yume-mirror',
      category: 'yumekawa',
      name: 'ハートミラー',
      width: 70,
      height: 90,
      svg: `
        <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- ハートの枠 -->
          <path d="M35 22 C 30 10 12 10 14 28 C 16 42 35 54 35 54 C 35 54 54 42 56 28 C 58 10 40 10 35 22 Z" fill="#FFB3C6" stroke="#FF6EA7" stroke-width="3"/>
          <!-- 鏡面 -->
          <path d="M35 25 C 31 15 17 15 19 29 C 20 40 35 49 35 49 C 35 49 50 40 51 29 C 53 15 39 15 35 25 Z" fill="#E7F5FF"/>
          <!-- 鏡のキラリ光 -->
          <line x1="26" y1="24" x2="32" y2="38" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
          <circle cx="40" cy="36" r="2" fill="#FFFFFF"/>
          <!-- リボン飾り -->
          <g transform="translate(35, 12)">
            <ellipse cx="-6" cy="0" rx="5" ry="3" fill="#C084FC"/>
            <ellipse cx="6" cy="0" rx="5" ry="3" fill="#C084FC"/>
            <circle cx="0" cy="0" r="3" fill="#FFE066"/>
          </g>
          <!-- スタンド脚 -->
          <path d="M35 54 V 78" stroke="#FF6EA7" stroke-width="4" stroke-linecap="round"/>
          <ellipse cx="35" cy="80" rx="16" ry="5" fill="#FFB3C6" stroke="#FF6EA7" stroke-width="2.5"/>
        </svg>
      `
    },
    {
      id: 'yume-chest',
      category: 'yumekawa',
      name: 'パステルチェスト',
      width: 80,
      height: 90,
      svg: `
        <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- チェスト本体 -->
          <rect x="12" y="14" width="56" height="64" rx="8" fill="#F8F0FC" stroke="#C084FC" stroke-width="3"/>
          <!-- 引き出し1段目（ピンク） -->
          <rect x="16" y="18" width="48" height="16" rx="4" fill="#FFD6E8" stroke="#FF85A1" stroke-width="2"/>
          <circle cx="40" cy="26" r="3" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <!-- 引き出し2段目（ミント） -->
          <rect x="16" y="38" width="48" height="16" rx="4" fill="#D3F9D8" stroke="#69DB7C" stroke-width="2"/>
          <circle cx="40" cy="46" r="3" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <!-- 引き出し3段目（パープル） -->
          <rect x="16" y="58" width="48" height="16" rx="4" fill="#E8D9FF" stroke="#B197FC" stroke-width="2"/>
          <circle cx="40" cy="66" r="3" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <!-- 脚 -->
          <rect x="16" y="78" width="6" height="8" rx="2" fill="#C084FC"/>
          <rect x="58" y="78" width="6" height="8" rx="2" fill="#C084FC"/>
        </svg>
      `
    }
  ];

  // --------------------------------------------------
  // 2. DOM要素の取得
  // --------------------------------------------------
  const stage = document.getElementById('room-stage');
  const furnitureLayer = document.getElementById('furniture-layer');
  const sparkleLayer = document.getElementById('sparkle-layer');
  const itemToolbar = document.getElementById('item-toolbar');
  const toolSizeLabel = document.getElementById('tool-size-label');

  // ヘッダーボタン
  const btnClear = document.getElementById('btn-clear');
  const btnRoomSelect = document.getElementById('btn-room-select');
  const btnCamera = document.getElementById('btn-camera');
  const btnAlbum = document.getElementById('btn-album');

  // バッグ関連
  const btnOpenBag = document.getElementById('btn-open-bag');
  const btnCloseBag = document.getElementById('btn-close-bag');
  const bagDrawer = document.getElementById('bag-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const catTabs = document.querySelectorAll('.cat-tab');
  const itemsGrid = document.getElementById('items-grid');

  // ツールバーボタン
  const toolRotate = document.getElementById('tool-rotate');
  const toolFlip = document.getElementById('tool-flip');
  const toolSize = document.getElementById('tool-size');
  const toolForward = document.getElementById('tool-forward');
  const toolBackward = document.getElementById('tool-backward');
  const toolRemove = document.getElementById('tool-remove');

  // --------------------------------------------------
  // 3. アプリの状態管理 (State)
  // --------------------------------------------------
  let placedItems = []; // { id, itemId, x, y, rotation, flipX, sizeIndex, zIndex }
  let selectedInstanceId = null;
  let nextZIndex = 10;
  let currentCategory = 'sweets';

  const SIZES = [
    { label: 'しょう', scale: 0.75 },
    { label: 'ちゅう', scale: 1.0 },
    { label: 'だい', scale: 1.35 }
  ];

  // --------------------------------------------------
  // 4. ローカルストレージ保存・読み込み
  // --------------------------------------------------
  const STORAGE_KEY = 'myroom_placed_items_v1';

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(placedItems));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const loaded = JSON.parse(data);
        if (Array.isArray(loaded)) {
          loaded.forEach(item => addItemToStage(item.itemId, item.x, item.y, item, false));
        }
      } else {
        // 初めて遊ぶときの初期配置（ベッドとテーブルを置いてあげる）
        addItemToStage('sw-bed', 70, 210, { rotation: 0, flipX: false, sizeIndex: 1 });
        addItemToStage('sw-table', 240, 260, { rotation: 0, flipX: false, sizeIndex: 1 });
        addItemToStage('yume-unicorn', 90, 180, { rotation: 0, flipX: false, sizeIndex: 0 });
      }
    } catch (e) {
      console.warn('Storage load failed:', e);
    }
  }

  // --------------------------------------------------
  // 5. バッグ（アイテム一覧）のレンダリング
  // --------------------------------------------------
  function renderBagItems(category) {
    itemsGrid.innerHTML = '';
    const filtered = FURNITURE_ITEMS.filter(item => item.category === category);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-card-preview">${item.svg}</div>
        <div class="item-card-name">${item.name}</div>
      `;
      card.addEventListener('click', () => {
        // ステージの中央付近にポンと置く
        const stageRect = stage.getBoundingClientRect();
        const spawnX = Math.round(stageRect.width / 2 - item.width / 2 + (Math.random() * 40 - 20));
        const spawnY = Math.round(stageRect.height / 2 - item.height / 2 + (Math.random() * 40 - 20));
        
        const instance = addItemToStage(item.id, spawnX, spawnY);
        selectItem(instance.id);
        triggerSparkles(spawnX + item.width / 2, spawnY + item.height / 2);
        closeBagDrawer();
      });
      itemsGrid.appendChild(card);
    });
  }

  // タブ切り替え
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderBagItems(currentCategory);
    });
  });

  // バッグ開閉
  function openBagDrawer() {
    bagDrawer.classList.remove('hidden');
    drawerBackdrop.classList.remove('hidden');
    renderBagItems(currentCategory);
  }

  function closeBagDrawer() {
    bagDrawer.classList.add('hidden');
    drawerBackdrop.classList.add('hidden');
  }

  btnOpenBag.addEventListener('click', openBagDrawer);
  btnCloseBag.addEventListener('click', closeBagDrawer);
  drawerBackdrop.addEventListener('click', closeBagDrawer);

  // --------------------------------------------------
  // 6. 家具のステージ配置と操作
  // --------------------------------------------------
  function addItemToStage(itemId, x, y, options = {}, shouldSave = true) {
    const itemDef = FURNITURE_ITEMS.find(i => i.id === itemId);
    if (!itemDef) return null;

    const instanceId = 'inst_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const itemData = {
      id: instanceId,
      itemId: itemId,
      x: x,
      y: y,
      rotation: options.rotation || 0,
      flipX: options.flipX || false,
      sizeIndex: options.sizeIndex !== undefined ? options.sizeIndex : 1, // 0:小, 1:中, 2:大
      zIndex: options.zIndex || ++nextZIndex
    };

    placedItems.push(itemData);

    const el = document.createElement('div');
    el.className = 'placed-item';
    el.id = instanceId;
    el.style.width = itemDef.width + 'px';
    el.style.height = itemDef.height + 'px';
    el.innerHTML = itemDef.svg;

    updateItemTransform(el, itemData);
    furnitureLayer.appendChild(el);

    setupPointerEvents(el, itemData);

    if (shouldSave) saveState();
    return itemData;
  }

  function updateItemTransform(el, data) {
    el.style.left = data.x + 'px';
    el.style.top = data.y + 'px';
    el.style.zIndex = data.zIndex;

    const scale = SIZES[data.sizeIndex].scale;
    const flip = data.flipX ? -1 : 1;
    el.style.transform = `scale(${flip * scale}, ${scale}) rotate(${data.rotation}deg)`;
  }

  // --------------------------------------------------
  // 7. ドラッグ＆ドロップ（Pointer Events）
  // --------------------------------------------------
  function setupPointerEvents(el, data) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialItemX = 0;
    let initialItemY = 0;
    let hasMoved = false;

    el.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      initialItemX = data.x;
      initialItemY = data.y;

      selectItem(data.id);
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved = true;
      }

      data.x = initialItemX + dx;
      data.y = initialItemY + dy;

      // ステージ外に出すぎないよう制限
      const stageRect = stage.getBoundingClientRect();
      const margin = 30;
      data.x = Math.max(-margin, Math.min(stageRect.width - 50, data.x));
      data.y = Math.max(0, Math.min(stageRect.height - 50, data.y));

      updateItemTransform(el, data);
      updateToolbarPosition();
    });

    const onPointerEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (hasMoved) {
        saveState();
      }
    };

    el.addEventListener('pointerup', onPointerEnd);
    el.addEventListener('pointercancel', onPointerEnd);
  }

  // --------------------------------------------------
  // 8. 選択 & ツールバーの表示
  // --------------------------------------------------
  function selectItem(instanceId) {
    selectedInstanceId = instanceId;

    // 枠線の付与
    document.querySelectorAll('.placed-item').forEach(el => {
      el.classList.toggle('selected', el.id === instanceId);
    });

    if (instanceId) {
      const data = placedItems.find(i => i.id === instanceId);
      if (data) {
        toolSizeLabel.textContent = SIZES[data.sizeIndex].label;
        itemToolbar.classList.remove('hidden');
        updateToolbarPosition();
      }
    } else {
      itemToolbar.classList.add('hidden');
    }
  }

  function updateToolbarPosition() {
    if (!selectedInstanceId) return;
    const el = document.getElementById(selectedInstanceId);
    if (!el) return;

    const stageRect = stage.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();

    // ステージ内でのアイテム中心X、上部Y
    const x = itemRect.left - stageRect.left + itemRect.width / 2;
    let y = itemRect.top - stageRect.top - 12;

    // 上にはみ出る場合はアイテムの下に表示
    if (y < 45) {
      y = itemRect.bottom - stageRect.top + 55;
    }

    itemToolbar.style.left = `${x}px`;
    itemToolbar.style.top = `${y}px`;
  }

  // ステージ背景タップで選択解除
  stage.addEventListener('pointerdown', (e) => {
    if (e.target === stage || e.target.id === 'room-wall' || e.target.id === 'room-floor' || e.target.id === 'furniture-layer') {
      selectItem(null);
    }
  });

  // --------------------------------------------------
  // 9. ツールバーのアクション（回転・反転・サイズ・しまう）
  // --------------------------------------------------
  toolRotate.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!selectedInstanceId) return;
    const data = placedItems.find(i => i.id === selectedInstanceId);
    const el = document.getElementById(selectedInstanceId);
    if (!data || !el) return;

    data.rotation = (data.rotation + 90) % 360;
    updateItemTransform(el, data);
    updateToolbarPosition();
    saveState();
  });

  toolFlip.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!selectedInstanceId) return;
    const data = placedItems.find(i => i.id === selectedInstanceId);
    const el = document.getElementById(selectedInstanceId);
    if (!data || !el) return;

    data.flipX = !data.flipX;
    updateItemTransform(el, data);
    updateToolbarPosition();
    saveState();
  });

  toolSize.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!selectedInstanceId) return;
    const data = placedItems.find(i => i.id === selectedInstanceId);
    const el = document.getElementById(selectedInstanceId);
    if (!data || !el) return;

    data.sizeIndex = (data.sizeIndex + 1) % SIZES.length;
    toolSizeLabel.textContent = SIZES[data.sizeIndex].label;
    updateItemTransform(el, data);
    updateToolbarPosition();
    saveState();
  });

  toolForward.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!selectedInstanceId) return;
    const data = placedItems.find(i => i.id === selectedInstanceId);
    const el = document.getElementById(selectedInstanceId);
    if (!data || !el) return;

    data.zIndex = ++nextZIndex;
    updateItemTransform(el, data);
    saveState();
  });

  toolBackward.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!selectedInstanceId) return;
    const data = placedItems.find(i => i.id === selectedInstanceId);
    const el = document.getElementById(selectedInstanceId);
    if (!data || !el) return;

    data.zIndex = Math.max(1, data.zIndex - 2);
    updateItemTransform(el, data);
    saveState();
  });

  toolRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!selectedInstanceId) return;
    const el = document.getElementById(selectedInstanceId);
    if (el) el.remove();

    placedItems = placedItems.filter(i => i.id !== selectedInstanceId);
    selectItem(null);
    saveState();
  });

  // --------------------------------------------------
  // 10. かたづけ（ぜんぶしまう）
  // --------------------------------------------------
  btnClear.addEventListener('click', () => {
    if (placedItems.length === 0) return;
    const ok = confirm('おへやの家具を ぜんぶバッグに しまう？🧹');
    if (!ok) return;

    furnitureLayer.innerHTML = '';
    placedItems = [];
    selectItem(null);
    saveState();
  });

  // フェーズ3, 4用の案内
  btnRoomSelect.addEventListener('click', () => {
    alert('🚪 おへやのきりかえは、つぎのアップデートで登場するよ！お楽しみに♪');
  });

  btnCamera.addEventListener('click', () => {
    alert('📸 パシャリ機能は、つぎのアップデートで登場するよ！お楽しみに♪');
  });

  btnAlbum.addEventListener('click', () => {
    alert('🖼️ アルバム機能は、つぎのアップデートで登場するよ！お楽しみに♪');
  });

  // --------------------------------------------------
  // 11. キラキラ演出 ✨
  // --------------------------------------------------
  function triggerSparkles(centerX, centerY) {
    const starEmojis = ['✨', '🌟', '💖', '⭐', '🌸'];
    const count = 8;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'sparkle-star';
      star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];

      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const distance = 40 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      star.style.left = `${centerX}px`;
      star.style.top = `${centerY}px`;
      star.style.setProperty('--dx', `${dx}px`);
      star.style.setProperty('--dy', `${dy}px`);

      sparkleLayer.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 850);
    }
  }

  // --------------------------------------------------
  // 12. 初期化
  // --------------------------------------------------
  loadState();
});
