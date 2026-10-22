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
          <rect x="12" y="14" width="56" height="64" rx="8" fill="#F8F0FC" stroke="#C084FC" stroke-width="3"/>
          <rect x="16" y="18" width="48" height="16" rx="4" fill="#FFD6E8" stroke="#FF85A1" stroke-width="2"/>
          <circle cx="40" cy="26" r="3" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <rect x="16" y="38" width="48" height="16" rx="4" fill="#D3F9D8" stroke="#69DB7C" stroke-width="2"/>
          <circle cx="40" cy="46" r="3" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <rect x="16" y="58" width="48" height="16" rx="4" fill="#E8D9FF" stroke="#B197FC" stroke-width="2"/>
          <circle cx="40" cy="66" r="3" fill="#FFE066" stroke="#F59F00" stroke-width="1.5"/>
          <rect x="16" y="78" width="6" height="8" rx="2" fill="#C084FC"/>
          <rect x="58" y="78" width="6" height="8" rx="2" fill="#C084FC"/>
        </svg>
      `
    },

    // --- 追加お菓子家具 ---
    {
      id: 'sw-macaron',
      category: 'sweets',
      name: 'マカロンタワー',
      width: 70,
      height: 90,
      svg: `
        <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- お皿 -->
          <ellipse cx="35" cy="80" rx="30" ry="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
          <!-- 下段マカロン（パープル） -->
          <rect x="14" y="60" width="42" height="16" rx="8" fill="#D8B4FE" stroke="#A855F7" stroke-width="2"/>
          <line x1="14" y1="68" x2="56" y2="68" stroke="#FFFFFF" stroke-width="3"/>
          <!-- 中段マカロン（ミント） -->
          <rect x="20" y="42" width="30" height="15" rx="7.5" fill="#A7F3D0" stroke="#10B981" stroke-width="2"/>
          <line x1="20" y1="49.5" x2="50" y2="49.5" stroke="#FFFFFF" stroke-width="2.5"/>
          <!-- 上段マカロン（ピンク） -->
          <rect x="24" y="24" width="22" height="14" rx="7" fill="#FBCFE8" stroke="#EC4899" stroke-width="2"/>
          <line x1="24" y1="31" x2="46" y2="31" stroke="#FFFFFF" stroke-width="2"/>
          <!-- てっぺんチェリー -->
          <circle cx="35" cy="16" r="6" fill="#EF4444"/>
          <path d="M35 12 Q 38 4 44 6" stroke="#10B981" stroke-width="2" fill="none"/>
        </svg>
      `
    },
    {
      id: 'sw-pudding',
      category: 'sweets',
      name: 'プリンチェア',
      width: 70,
      height: 70,
      svg: `
        <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- プリン本体 -->
          <path d="M20 28 L 50 28 L 58 60 L 12 60 Z" fill="#FDE047" stroke="#EAB308" stroke-width="2.5"/>
          <!-- カラメルソース -->
          <path d="M20 28 L 50 28 C 48 38 42 36 38 42 C 34 36 28 40 20 28 Z" fill="#78350F"/>
          <!-- さくらんぼ -->
          <circle cx="35" cy="20" r="5" fill="#EF4444"/>
          <path d="M35 16 Q 40 8 46 10" stroke="#10B981" stroke-width="2" fill="none"/>
          <!-- ホイップ -->
          <ellipse cx="35" cy="25" rx="8" ry="3" fill="#FFFFFF"/>
        </svg>
      `
    },
    {
      id: 'sw-rollcake',
      category: 'sweets',
      name: 'ロールソファ',
      width: 110,
      height: 75,
      svg: `
        <svg viewBox="0 0 110 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- ソファ本体（ロールケーキの横置き） -->
          <rect x="15" y="25" width="80" height="40" rx="14" fill="#FFEDD5" stroke="#FB923C" stroke-width="3"/>
          <path d="M15 45 Q 55 58 95 45" stroke="#F43F5E" stroke-width="3" stroke-linecap="round" fill="none"/>
          <!-- クッション座面 -->
          <rect x="22" y="30" width="66" height="22" rx="8" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="2"/>
          <!-- ロール断面（左側） -->
          <ellipse cx="15" cy="45" rx="10" ry="18" fill="#FFEDD5" stroke="#FB923C" stroke-width="2.5"/>
          <path d="M15 45 m -5 0 a 5 9 0 1 0 10 0 a 5 9 0 1 0 -10 0" stroke="#F43F5E" stroke-width="2.5" fill="none"/>
          <!-- 脚 -->
          <rect x="24" y="65" width="6" height="8" rx="2" fill="#78350F"/>
          <rect x="80" y="65" width="6" height="8" rx="2" fill="#78350F"/>
        </svg>
      `
    },

    // --- 追加ナチュラル家具 ---
    {
      id: 'nat-tulip',
      category: 'natural',
      name: 'チューリップ花びん',
      width: 50,
      height: 75,
      svg: `
        <svg viewBox="0 0 50 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 花びん -->
          <path d="M18 42 L 32 42 L 36 68 L 14 68 Z" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2.5"/>
          <!-- チューリップ茎 -->
          <line x1="22" y1="42" x2="18" y2="22" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="28" y1="42" x2="32" y2="18" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round"/>
          <!-- チューリップ花1（ピンク） -->
          <path d="M14 22 C 12 12 22 12 20 22 C 22 14 26 14 24 22 Z" fill="#F43F5E"/>
          <!-- チューリップ花2（イエロー） -->
          <path d="M28 18 C 26 8 36 8 34 18 C 36 10 40 10 38 18 Z" fill="#FBBF24"/>
        </svg>
      `
    },
    {
      id: 'nat-bookshelf',
      category: 'natural',
      name: 'もくせい本だな',
      width: 75,
      height: 95,
      svg: `
        <svg viewBox="0 0 75 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 棚フレーム -->
          <rect x="10" y="10" width="55" height="78" rx="6" fill="#FDE68A" stroke="#B45309" stroke-width="3"/>
          <line x1="10" y1="48" x2="65" y2="48" stroke="#B45309" stroke-width="2.5"/>
          <!-- 上段の本 -->
          <rect x="16" y="24" width="8" height="24" rx="2" fill="#F43F5E"/>
          <rect x="26" y="20" width="10" height="28" rx="2" fill="#3B82F6"/>
          <rect x="38" y="26" width="7" height="22" rx="2" fill="#10B981"/>
          <!-- 下段の本 -->
          <rect x="16" y="58" width="9" height="26" rx="2" fill="#A855F7"/>
          <rect x="27" y="62" width="8" height="22" rx="2" fill="#F59E0B"/>
          <rect x="37" y="56" width="10" height="28" rx="2" fill="#EC4899"/>
          <!-- 脚 -->
          <rect x="14" y="88" width="6" height="6" rx="1" fill="#B45309"/>
          <rect x="55" y="88" width="6" height="6" rx="1" fill="#B45309"/>
        </svg>
      `
    },
    {
      id: 'nat-round-table',
      category: 'natural',
      name: 'まるテーブル',
      width: 80,
      height: 70,
      svg: `
        <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 天板 -->
          <ellipse cx="40" cy="28" rx="34" ry="14" fill="#FCD34D" stroke="#B45309" stroke-width="3"/>
          <ellipse cx="40" cy="28" rx="28" ry="10" stroke="#F59E0B" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
          <!-- 一本脚 -->
          <rect x="37" y="42" width="6" height="20" fill="#92400E"/>
          <ellipse cx="40" cy="62" rx="18" ry="5" fill="#B45309"/>
        </svg>
      `
    },

    // --- 追加ポップ家具 ---
    {
      id: 'pop-neon-moon',
      category: 'pop',
      name: 'ネオンムーン',
      width: 60,
      height: 70,
      svg: `
        <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 三日月 -->
          <path d="M36 12 C 22 14 16 26 18 42 C 20 54 30 60 42 58 C 30 54 28 40 32 28 C 34 22 38 16 36 12 Z" fill="#FDE047" stroke="#EAB308" stroke-width="3" filter="drop-shadow(0 0 8px #FACC15)"/>
          <!-- ちいさなお星さま -->
          <polygon points="46,26 48,32 54,32 50,36 52,42 46,38 40,42 42,36 38,32 44,32" fill="#38BDF8"/>
        </svg>
      `
    },
    {
      id: 'pop-skateboard',
      category: 'pop',
      name: 'スケートボード',
      width: 80,
      height: 40,
      svg: `
        <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- デッキ -->
          <rect x="8" y="14" width="64" height="12" rx="6" fill="#F43F5E" stroke="#BE123C" stroke-width="2"/>
          <circle cx="28" cy="20" r="3" fill="#FDE047"/>
          <circle cx="40" cy="20" r="3" fill="#38BDF8"/>
          <circle cx="52" cy="20" r="3" fill="#FDE047"/>
          <!-- ウィール（タイヤ） -->
          <circle cx="20" cy="28" r="5" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
          <circle cx="60" cy="28" r="5" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
        </svg>
      `
    },
    {
      id: 'pop-tv',
      category: 'pop',
      name: 'レトロテレビ',
      width: 75,
      height: 70,
      svg: `
        <svg viewBox="0 0 75 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- アンテナ -->
          <line x1="28" y1="18" x2="20" y2="6" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
          <line x1="42" y1="18" x2="52" y2="8" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
          <!-- 本体 -->
          <rect x="12" y="18" width="52" height="38" rx="8" fill="#A855F7" stroke="#7E22CE" stroke-width="2.5"/>
          <!-- 画面 -->
          <rect x="18" y="24" width="30" height="26" rx="4" fill="#38BDF8"/>
          <!-- アンテナノイズ風 -->
          <circle cx="33" cy="37" r="4" fill="#FFFFFF" opacity="0.7"/>
          <!-- ダイヤル -->
          <circle cx="56" cy="28" r="3" fill="#FDE047"/>
          <circle cx="56" cy="38" r="3" fill="#FDE047"/>
          <!-- 脚 -->
          <line x1="20" y1="56" x2="16" y2="66" stroke="#7E22CE" stroke-width="3" stroke-linecap="round"/>
          <line x1="56" y1="56" x2="60" y2="66" stroke="#7E22CE" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `
    },

    // --- 追加ゆめかわ家具 ---
    {
      id: 'yume-cloud',
      category: 'yumekawa',
      name: 'もくもく雲シェルフ',
      width: 75,
      height: 50,
      svg: `
        <svg viewBox="0 0 75 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 雲形シェルフ -->
          <path d="M18 36 C 10 36 8 26 16 22 C 14 12 28 8 36 14 C 44 8 58 12 56 22 C 64 26 62 36 54 36 Z" fill="#FFFFFF" stroke="#C084FC" stroke-width="2.5"/>
          <!-- 棚の天板 -->
          <rect x="14" y="32" width="48" height="5" rx="2" fill="#FCE7F3" stroke="#F472B6" stroke-width="1.5"/>
          <!-- 棚の上の小瓶 -->
          <circle cx="28" cy="26" r="3" fill="#67E8F9"/>
          <circle cx="44" cy="26" r="3" fill="#FDE047"/>
        </svg>
      `
    },
    {
      id: 'yume-bear',
      category: 'yumekawa',
      name: 'くまちゃん',
      width: 65,
      height: 70,
      svg: `
        <svg viewBox="0 0 65 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 耳 -->
          <circle cx="20" cy="22" r="7" fill="#FBCFE8" stroke="#F472B6" stroke-width="2"/>
          <circle cx="20" cy="22" r="3" fill="#F472B6"/>
          <circle cx="45" cy="22" r="7" fill="#FBCFE8" stroke="#F472B6" stroke-width="2"/>
          <circle cx="45" cy="22" r="3" fill="#F472B6"/>
          <!-- 体 -->
          <ellipse cx="32" cy="48" rx="16" ry="14" fill="#FBCFE8" stroke="#F472B6" stroke-width="2"/>
          <!-- 頭 -->
          <circle cx="32" cy="30" r="14" fill="#FBCFE8" stroke="#F472B6" stroke-width="2"/>
          <!-- 顔パーツ -->
          <ellipse cx="32" cy="33" rx="5" ry="3" fill="#FFFFFF"/>
          <circle cx="32" cy="32" r="1.5" fill="#831843"/>
          <circle cx="27" cy="28" r="1.5" fill="#831843"/>
          <circle cx="37" cy="28" r="1.5" fill="#831843"/>
          <ellipse cx="25" cy="32" rx="2" ry="1.5" fill="#FDA4AF"/>
          <ellipse cx="39" cy="32" rx="2" ry="1.5" fill="#FDA4AF"/>
          <!-- 首のリボン -->
          <polygon points="28,40 36,40 32,38" fill="#A855F7"/>
          <circle cx="32" cy="39" r="2" fill="#E9D5FF"/>
        </svg>
      `
    },
    {
      id: 'yume-star-lamp',
      category: 'yumekawa',
      name: 'お星さまランプ',
      width: 60,
      height: 80,
      svg: `
        <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="0" x2="30" y2="35" stroke="#C084FC" stroke-width="2"/>
          <polygon points="30,25 36,38 50,38 38,48 42,62 30,54 18,62 22,48 10,38 24,38" fill="#FEF08A" stroke="#FACC15" stroke-width="2.5" filter="drop-shadow(0 0 6px #FDE047)"/>
          <circle cx="26" cy="44" r="2" fill="#A16207"/>
          <circle cx="34" cy="44" r="2" fill="#A16207"/>
          <path d="M28 48 Q 30 50 32 48" stroke="#A16207" stroke-width="1.5" fill="none"/>
        </svg>
      `
    },

    // === ふつう (basic) ===
    {
      id: 'basic-bed',
      category: 'basic',
      name: 'ふつうのベッド',
      width: 130,
      height: 85,
      svg: `
        <svg viewBox="0 0 130 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 木枠ベッド -->
          <rect x="12" y="30" width="108" height="42" rx="6" fill="#E8D5C4" stroke="#A88B74" stroke-width="2.5"/>
          <rect x="8" y="16" width="12" height="56" rx="4" fill="#A88B74"/>
          <!-- マットレス & シーツ -->
          <rect x="22" y="32" width="94" height="36" rx="4" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1.5"/>
          <!-- かけ布団（水色） -->
          <rect x="44" y="30" width="74" height="38" rx="5" fill="#BAE6FD" stroke="#38BDF8" stroke-width="2"/>
          <!-- まくら -->
          <rect x="22" y="24" width="22" height="18" rx="6" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1.5"/>
          <!-- 脚 -->
          <rect x="108" y="68" width="6" height="12" rx="2" fill="#A88B74"/>
        </svg>
      `
    },
    {
      id: 'basic-desk',
      category: 'basic',
      name: 'べんきょう机',
      width: 90,
      height: 80,
      svg: `
        <svg viewBox="0 0 90 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 天板 -->
          <rect x="10" y="26" width="70" height="10" rx="3" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>
          <!-- デスクライト -->
          <path d="M22 26 V 12 H 32" stroke="#64748B" stroke-width="2.5" fill="none"/>
          <path d="M30 10 L 40 16 L 36 18 L 28 12 Z" fill="#EF4444"/>
          <!-- ノート & ペン立て -->
          <rect x="52" y="20" width="12" height="6" rx="1" fill="#60A5FA"/>
          <rect x="68" y="18" width="8" height="8" rx="2" fill="#34D399"/>
          <!-- 引き出しユニット（右側） -->
          <rect x="54" y="36" width="22" height="36" rx="3" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>
          <line x1="54" y1="48" x2="76" y2="48" stroke="#B45309" stroke-width="1.5"/>
          <line x1="54" y1="60" x2="76" y2="60" stroke="#B45309" stroke-width="1.5"/>
          <circle cx="65" cy="42" r="1.5" fill="#78350F"/>
          <circle cx="65" cy="54" r="1.5" fill="#78350F"/>
          <circle cx="65" cy="66" r="1.5" fill="#78350F"/>
          <!-- 左脚 -->
          <rect x="14" y="36" width="6" height="36" rx="2" fill="#B45309"/>
        </svg>
      `
    },
    {
      id: 'basic-chair',
      category: 'basic',
      name: 'べんきょうイス',
      width: 60,
      height: 75,
      svg: `
        <svg viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ（ブルー） -->
          <rect x="18" y="10" width="24" height="24" rx="8" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
          <!-- 座面 -->
          <ellipse cx="30" cy="40" rx="18" ry="7" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
          <!-- 脚（キャスター付き） -->
          <rect x="28" y="47" width="4" height="18" fill="#64748B"/>
          <line x1="16" y1="65" x2="44" y2="65" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
          <circle cx="16" cy="68" r="2.5" fill="#0F172A"/>
          <circle cx="30" cy="68" r="2.5" fill="#0F172A"/>
          <circle cx="44" cy="68" r="2.5" fill="#0F172A"/>
        </svg>
      `
    },
    {
      id: 'basic-closet',
      category: 'basic',
      name: 'クローゼット',
      width: 75,
      height: 105,
      svg: `
        <svg viewBox="0 0 75 105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 本体（白タンス） -->
          <rect x="10" y="8" width="55" height="88" rx="6" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
          <!-- 扉の割れ目 -->
          <line x1="37.5" y1="12" x2="37.5" y2="92" stroke="#CBD5E1" stroke-width="2"/>
          <!-- 取っ手 -->
          <circle cx="32" cy="50" r="2.5" fill="#F59E0B"/>
          <circle cx="43" cy="50" r="2.5" fill="#F59E0B"/>
          <!-- 脚 -->
          <rect x="14" y="96" width="6" height="6" rx="1" fill="#64748B"/>
          <rect x="55" y="96" width="6" height="6" rx="1" fill="#64748B"/>
        </svg>
      `
    },
    {
      id: 'basic-sofa',
      category: 'basic',
      name: 'ふつうのソファ',
      width: 105,
      height: 70,
      svg: `
        <svg viewBox="0 0 105 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ -->
          <rect x="12" y="16" width="81" height="34" rx="10" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2.5"/>
          <!-- ひじかけ左右 -->
          <rect x="8" y="28" width="14" height="28" rx="7" fill="#CBD5E1" stroke="#94A3B8" stroke-width="2"/>
          <rect x="83" y="28" width="14" height="28" rx="7" fill="#CBD5E1" stroke="#94A3B8" stroke-width="2"/>
          <!-- 座面クッション -->
          <rect x="20" y="34" width="32" height="22" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5"/>
          <rect x="53" y="34" width="32" height="22" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5"/>
          <!-- 脚 -->
          <rect x="18" y="56" width="6" height="8" rx="2" fill="#78350F"/>
          <rect x="81" y="56" width="6" height="8" rx="2" fill="#78350F"/>
        </svg>
      `
    },
    {
      id: 'basic-window',
      category: 'basic',
      name: 'カーテンの窓',
      width: 80,
      height: 85,
      svg: `
        <svg viewBox="0 0 80 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 窓枠 -->
          <rect x="15" y="10" width="50" height="60" rx="4" fill="#BAE6FD" stroke="#94A3B8" stroke-width="3"/>
          <line x1="40" y1="10" x2="40" y2="70" stroke="#94A3B8" stroke-width="2"/>
          <line x1="15" y1="40" x2="65" y2="40" stroke="#94A3B8" stroke-width="2"/>
          <!-- カーテンレール -->
          <rect x="8" y="6" width="64" height="4" rx="2" fill="#D97706"/>
          <!-- カーテン左右（ピンク） -->
          <path d="M10 10 Q 14 36 8 68 L 22 68 Q 24 36 16 10 Z" fill="#F472B6"/>
          <path d="M70 10 Q 66 36 72 68 L 58 68 Q 56 36 64 10 Z" fill="#F472B6"/>
          <!-- タッセル紐 -->
          <rect x="10" y="42" width="10" height="3" fill="#FDE047"/>
          <rect x="60" y="42" width="10" height="3" fill="#FDE047"/>
        </svg>
      `
    },
    {
      id: 'basic-door',
      category: 'basic',
      name: 'お部屋のドア',
      width: 70,
      height: 110,
      svg: `
        <svg viewBox="0 0 70 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- ドア枠 -->
          <rect x="8" y="6" width="54" height="100" rx="4" fill="#D97706" stroke="#92400E" stroke-width="3"/>
          <!-- ドアパネル飾り -->
          <rect x="16" y="16" width="38" height="36" rx="3" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
          <rect x="16" y="58" width="38" height="40" rx="3" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
          <!-- 金のドアノブ -->
          <circle cx="50" cy="56" r="3.5" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5"/>
        </svg>
      `
    },
    {
      id: 'basic-rug',
      category: 'basic',
      name: 'まるいラグ',
      width: 90,
      height: 70,
      svg: `
        <svg viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="45" cy="35" rx="40" ry="26" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2.5"/>
          <ellipse cx="45" cy="35" rx="32" ry="20" stroke="#CBD5E1" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
        </svg>
      `
    },
    {
      id: 'basic-trash',
      category: 'basic',
      name: 'ゴミばこ',
      width: 45,
      height: 50,
      svg: `
        <svg viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- ゴミ箱缶 -->
          <rect x="10" y="16" width="25" height="30" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
          <rect x="8" y="12" width="29" height="5" rx="2.5" fill="#94A3B8"/>
          <!-- ペダル -->
          <rect x="18" y="44" width="9" height="4" rx="1" fill="#475569"/>
        </svg>
      `
    },

    // === クール (cool) ===
    {
      id: 'cool-bed',
      category: 'cool',
      name: 'クールベッド',
      width: 130,
      height: 85,
      svg: `
        <svg viewBox="0 0 130 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- スチールのヘッドボード（黒） -->
          <rect x="10" y="14" width="10" height="60" rx="3" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
          <!-- マットレス枠 -->
          <rect x="18" y="34" width="100" height="36" rx="4" fill="#334155" stroke="#0F172A" stroke-width="2"/>
          <!-- ネイビーのシャープなお布団 -->
          <rect x="42" y="32" width="76" height="38" rx="4" fill="#1E3A8A" stroke="#2563EB" stroke-width="2"/>
          <!-- クールライン（シアン） -->
          <line x1="42" y1="46" x2="118" y2="46" stroke="#06B6D4" stroke-width="2"/>
          <!-- まくら（黒） -->
          <rect x="22" y="24" width="22" height="18" rx="4" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
          <!-- 脚 -->
          <rect x="110" y="70" width="6" height="10" rx="2" fill="#1E293B"/>
        </svg>
      `
    },
    {
      id: 'cool-desk',
      category: 'cool',
      name: 'ゲーミングデスク',
      width: 100,
      height: 85,
      svg: `
        <svg viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- デスク天板（ブラック） -->
          <rect x="10" y="32" width="80" height="8" rx="2" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <!-- ワイドモニター -->
          <rect x="24" y="8" width="52" height="22" rx="3" fill="#0284C7" stroke="#0F172A" stroke-width="2"/>
          <line x1="28" y1="16" x2="68" y2="24" stroke="#38BDF8" stroke-width="2"/>
          <rect x="47" y="26" width="6" height="6" fill="#475569"/>
          <!-- RGBライン -->
          <line x1="12" y1="36" x2="88" y2="36" stroke="#06B6D4" stroke-width="2"/>
          <!-- 脚（Z型スチール） -->
          <path d="M16 40 L 16 76 L 30 76" stroke="#334155" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M84 40 L 84 76 L 70 76" stroke="#334155" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>
      `
    },
    {
      id: 'cool-chair',
      category: 'cool',
      name: 'サイバーチェア',
      width: 70,
      height: 95,
      svg: `
        <svg viewBox="0 0 70 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ（黒×ブルー） -->
          <path d="M22 14 C 22 8 28 6 35 6 C 42 6 48 8 48 14 L 46 54 L 24 54 Z" fill="#0F172A" stroke="#0284C7" stroke-width="2.5"/>
          <path d="M26 14 H 44 V 24 H 26 Z" fill="#06B6D4"/>
          <!-- クッション座面 -->
          <rect x="16" y="54" width="38" height="12" rx="4" fill="#1E293B" stroke="#0284C7" stroke-width="2"/>
          <!-- ひじかけ -->
          <rect x="10" y="42" width="6" height="16" rx="2" fill="#0284C7"/>
          <rect x="54" y="42" width="6" height="16" rx="2" fill="#0284C7"/>
          <!-- 脚 -->
          <rect x="32" y="66" width="6" height="16" fill="#475569"/>
          <line x1="18" y1="84" x2="52" y2="84" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
          <circle cx="18" cy="87" r="2.5" fill="#06B6D4"/>
          <circle cx="35" cy="87" r="2.5" fill="#06B6D4"/>
          <circle cx="52" cy="87" r="2.5" fill="#06B6D4"/>
        </svg>
      `
    },
    {
      id: 'cool-sofa',
      category: 'cool',
      name: 'レザーソファ',
      width: 105,
      height: 70,
      svg: `
        <svg viewBox="0 0 105 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ（黒レザー） -->
          <rect x="12" y="16" width="81" height="34" rx="8" fill="#1E293B" stroke="#0F172A" stroke-width="2.5"/>
          <!-- ひじかけ左右 -->
          <rect x="8" y="26" width="14" height="30" rx="5" fill="#0F172A" stroke="#334155" stroke-width="2"/>
          <rect x="83" y="26" width="14" height="30" rx="5" fill="#0F172A" stroke="#334155" stroke-width="2"/>
          <!-- 座面クッション -->
          <rect x="20" y="34" width="32" height="22" rx="4" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
          <rect x="53" y="34" width="32" height="22" rx="4" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
          <!-- メタル脚 -->
          <rect x="18" y="56" width="4" height="8" fill="#94A3B8"/>
          <rect x="83" y="56" width="4" height="8" fill="#94A3B8"/>
        </svg>
      `
    },
    {
      id: 'cool-clock',
      category: 'cool',
      name: 'ネオン時計',
      width: 70,
      height: 40,
      svg: `
        <svg viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="58" height="24" rx="6" fill="#0F172A" stroke="#06B6D4" stroke-width="2.5" filter="drop-shadow(0 0 6px #06B6D4)"/>
          <text x="35" y="25" font-family="monospace" font-size="14" font-weight="900" fill="#22D3EE" text-anchor="middle">12:00</text>
        </svg>
      `
    },
    {
      id: 'cool-speaker',
      category: 'cool',
      name: 'タワースピーカー',
      width: 45,
      height: 95,
      svg: `
        <svg viewBox="0 0 45 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="29" height="76" rx="4" fill="#0F172A" stroke="#334155" stroke-width="2.5"/>
          <circle cx="22.5" cy="26" r="8" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5"/>
          <circle cx="22.5" cy="26" r="3" fill="#06B6D4"/>
          <circle cx="22.5" cy="50" r="10" fill="#1E293B" stroke="#06B6D4" stroke-width="2"/>
          <circle cx="22.5" cy="50" r="4" fill="#06B6D4"/>
          <circle cx="22.5" cy="72" r="6" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
          <rect x="6" y="86" width="33" height="4" rx="2" fill="#334155"/>
        </svg>
      `
    },

    // === おにわ (garden) ===
    {
      id: 'gar-fountain',
      category: 'garden',
      name: 'ガーデンふんすい',
      width: 80,
      height: 95,
      svg: `
        <svg viewBox="0 0 80 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 上段の水受け -->
          <ellipse cx="40" cy="38" rx="22" ry="7" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2"/>
          <!-- 下段の水受け -->
          <ellipse cx="40" cy="62" rx="36" ry="11" fill="#BAE6FD" stroke="#38BDF8" stroke-width="2.5"/>
          <!-- 柱 -->
          <rect x="36" y="38" width="8" height="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
          <rect x="34" y="70" width="12" height="16" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
          <!-- 土台 -->
          <ellipse cx="40" cy="86" rx="24" ry="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
          <!-- てっぺんから出る水しぶき -->
          <path d="M40 38 Q 40 18 32 24" stroke="#0284C7" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M40 38 Q 40 16 48 22" stroke="#0284C7" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <circle cx="40" cy="18" r="3" fill="#38BDF8"/>
        </svg>
      `
    },
    {
      id: 'gar-bench',
      category: 'garden',
      name: 'ウッドベンチ',
      width: 90,
      height: 65,
      svg: `
        <svg viewBox="0 0 90 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背もたれ（白ウッド） -->
          <rect x="10" y="14" width="70" height="20" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
          <line x1="10" y1="20" x2="80" y2="20" stroke="#CBD5E1" stroke-width="1.5"/>
          <line x1="10" y1="26" x2="80" y2="26" stroke="#CBD5E1" stroke-width="1.5"/>
          <!-- 座面 -->
          <rect x="8" y="34" width="74" height="10" rx="3" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/>
          <!-- 脚 -->
          <line x1="16" y1="44" x2="12" y2="60" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
          <line x1="74" y1="44" x2="78" y2="60" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `
    },
    {
      id: 'gar-flowerbed',
      category: 'garden',
      name: 'カラフル花だん',
      width: 90,
      height: 50,
      svg: `
        <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- レンガ枠 -->
          <rect x="8" y="26" width="74" height="18" rx="4" fill="#D97706" stroke="#B45309" stroke-width="2"/>
          <line x1="32" y1="26" x2="32" y2="44" stroke="#92400E" stroke-width="1.5"/>
          <line x1="58" y1="26" x2="58" y2="44" stroke="#92400E" stroke-width="1.5"/>
          <!-- お花たち -->
          <circle cx="20" cy="18" r="7" fill="#F43F5E"/>
          <circle cx="20" cy="18" r="3" fill="#FDE047"/>
          <circle cx="36" cy="15" r="7" fill="#FBBF24"/>
          <circle cx="36" cy="15" r="3" fill="#B45309"/>
          <circle cx="54" cy="18" r="7" fill="#A855F7"/>
          <circle cx="54" cy="18" r="3" fill="#FDE047"/>
          <circle cx="70" cy="16" r="7" fill="#EC4899"/>
          <circle cx="70" cy="16" r="3" fill="#FFFFFF"/>
        </svg>
      `
    },
    {
      id: 'gar-parasol',
      category: 'garden',
      name: 'パラソルテーブル',
      width: 85,
      height: 100,
      svg: `
        <svg viewBox="0 0 85 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- パラソル傘 -->
          <path d="M12 36 Q 42 12 72 36 Z" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
          <path d="M27 36 Q 42 12 57 36 Z" fill="#FFFFFF"/>
          <circle cx="42" cy="16" r="3" fill="#FDE047"/>
          <!-- 支柱 -->
          <line x1="42" y1="36" x2="42" y2="92" stroke="#64748B" stroke-width="3"/>
          <!-- テーブル天板 -->
          <ellipse cx="42" cy="62" rx="26" ry="7" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
          <!-- テーブル土台 -->
          <ellipse cx="42" cy="92" rx="16" ry="5" fill="#CBD5E1"/>
        </svg>
      `
    },
    {
      id: 'gar-bird',
      category: 'garden',
      name: 'ことりちゃん',
      width: 50,
      height: 60,
      svg: `
        <svg viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 止まり木スタンド -->
          <line x1="25" y1="28" x2="25" y2="56" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
          <line x1="12" y1="28" x2="38" y2="28" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
          <ellipse cx="25" cy="56" rx="14" ry="4" fill="#D97706"/>
          <!-- 小鳥の体（黄色） -->
          <ellipse cx="25" cy="18" rx="10" ry="8" fill="#FDE047" stroke="#EAB308" stroke-width="1.5"/>
          <polygon points="15,18 8,19 14,22" fill="#F97316"/>
          <circle cx="21" cy="16" r="1.5" fill="#000000"/>
          <!-- つばさ -->
          <ellipse cx="28" cy="18" rx="6" ry="4" fill="#FACC15"/>
        </svg>
      `
    },

    // === おふろ (bath) ===
    {
      id: 'bath-tub',
      category: 'bath',
      name: 'あわあわバスタブ',
      width: 130,
      height: 80,
      svg: `
        <svg viewBox="0 0 130 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- バスタブ本体 -->
          <path d="M14 26 C 14 26 12 56 30 62 L 100 62 C 118 56 116 26 116 26 Z" fill="#FFFFFF" stroke="#38BDF8" stroke-width="3"/>
          <ellipse cx="65" cy="26" rx="52" ry="8" fill="#BAE6FD" stroke="#38BDF8" stroke-width="2"/>
          <!-- もこもこ泡🫧 -->
          <circle cx="45" cy="22" r="7" fill="#FFFFFF"/>
          <circle cx="58" cy="18" r="9" fill="#FFFFFF"/>
          <circle cx="72" cy="20" r="8" fill="#FFFFFF"/>
          <circle cx="85" cy="23" r="6" fill="#FFFFFF"/>
          <circle cx="95" cy="24" r="5" fill="#FFFFFF"/>
          <!-- 猫足 -->
          <path d="M26 62 Q 24 72 18 74" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round" fill="none"/>
          <path d="M104 62 Q 106 72 112 74" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        </svg>
      `
    },
    {
      id: 'bath-shower',
      category: 'bath',
      name: 'スタンドシャワー',
      width: 55,
      height: 105,
      svg: `
        <svg viewBox="0 0 55 105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- パイプ支柱 -->
          <path d="M18 96 V 16 Q 18 10 28 10 H 36" stroke="#94A3B8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <!-- シャワーヘッド -->
          <path d="M34 8 L 44 14 L 38 22 L 28 16 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
          <!-- シャワーの水滴 -->
          <line x1="38" y1="22" x2="36" y2="38" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 3"/>
          <line x1="42" y1="22" x2="44" y2="40" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 3"/>
          <!-- 蛇口ハンドル -->
          <rect x="14" y="56" width="8" height="6" rx="2" fill="#0284C7"/>
        </svg>
      `
    },
    {
      id: 'bath-duck',
      category: 'bath',
      name: 'アヒルちゃん',
      width: 50,
      height: 45,
      svg: `
        <svg viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- アヒルの体 -->
          <path d="M16 22 C 16 16 24 10 32 10 C 38 10 40 14 40 18 C 40 24 44 26 44 32 C 44 38 36 40 26 40 C 16 40 12 34 16 22 Z" fill="#FDE047" stroke="#EAB308" stroke-width="2"/>
          <!-- くちばし -->
          <polygon points="16,20 8,23 16,26" fill="#F97316"/>
          <!-- 目 -->
          <circle cx="24" cy="18" r="2" fill="#000000"/>
          <circle cx="25" cy="17" r="0.8" fill="#FFFFFF"/>
          <!-- つばさ -->
          <ellipse cx="32" cy="28" rx="6" ry="4" fill="#FACC15"/>
        </svg>
      `
    },
    {
      id: 'bath-bottles',
      category: 'bath',
      name: 'シャンプーセット',
      width: 60,
      height: 50,
      svg: `
        <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- シャンプーボトル（ピンク） -->
          <rect x="10" y="16" width="16" height="28" rx="4" fill="#F472B6" stroke="#DB2777" stroke-width="1.5"/>
          <rect x="15" y="10" width="6" height="6" fill="#FFFFFF"/>
          <path d="M18 10 H 24 V 8 H 18 Z" fill="#94A3B8"/>
          <!-- コンディショナーボトル（ミント） -->
          <rect x="32" y="14" width="16" height="30" rx="4" fill="#6EE7B7" stroke="#059669" stroke-width="1.5"/>
          <rect x="37" y="8" width="6" height="6" fill="#FFFFFF"/>
          <path d="M40 8 H 46 V 6 H 40 Z" fill="#94A3B8"/>
        </svg>
      `
    },
    {
      id: 'bath-stool',
      category: 'bath',
      name: 'おふろイス＆湯おけ',
      width: 65,
      height: 50,
      svg: `
        <svg viewBox="0 0 65 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- お風呂イス -->
          <path d="M12 24 C 12 18 20 16 30 16 C 40 16 48 18 48 24 L 46 44 L 40 44 L 42 28 C 38 26 22 26 18 28 L 20 44 L 14 44 Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>
          <!-- 湯おけ（洗面器） -->
          <ellipse cx="48" cy="36" rx="14" ry="5" fill="#FDE68A" stroke="#D97706" stroke-width="1.5"/>
          <ellipse cx="48" cy="38" rx="12" ry="4" fill="#FEF08A"/>
        </svg>
      `
    }
  ];

  // --------------------------------------------------
  // 1.5 壁紙・床の定義データ
  // --------------------------------------------------
  const WALLPAPERS = [
    { id: 'wall-pink-stripe', name: 'ピンクストライプ', icon: '🎀', previewBg: 'linear-gradient(180deg, #ffeef6 0%, #fff7fa 100%)' },
    { id: 'wall-star-night', name: 'ほしぞらナイト', icon: '🌙', previewBg: 'linear-gradient(180deg, #3d2b6b 0%, #7048a8 100%)' },
    { id: 'wall-choco-cafe', name: 'チョコカフェ', icon: '🍫', previewBg: 'linear-gradient(180deg, #fdf6ee 0%, #f7ebd9 100%)' },
    { id: 'wall-mint-forest', name: 'ミントのもり', icon: '🌿', previewBg: 'linear-gradient(180deg, #ebfbee 0%, #d3f9d8 100%)' },
    { id: 'wall-pop-yellow', name: 'ポップドット', icon: '⚡️', previewBg: 'linear-gradient(180deg, #fff9db 0%, #fff3bf 100%)' }
  ];

  const FLOORS = [
    { id: 'floor-wood', name: 'もくめフロア', icon: '🪵', previewBg: '#f7e1c8' },
    { id: 'floor-pastel-tile', name: 'パステルタイル', icon: '🌸', previewBg: '#fff0f7' },
    { id: 'floor-grass', name: 'ふかふかしばふ', icon: '🌷', previewBg: '#a9e34b' },
    { id: 'floor-cookie', name: 'ビスケット', icon: '🍪', previewBg: '#e9c46a' },
    { id: 'floor-tatami', name: 'たたみ', icon: '🍵', previewBg: '#d8f5a2' }
  ];

  // --------------------------------------------------
  // 2. DOM要素の取得
  // --------------------------------------------------
  const stage = document.getElementById('room-stage');
  const roomWall = document.getElementById('room-wall');
  const roomFloor = document.getElementById('room-floor');
  const furnitureLayer = document.getElementById('furniture-layer');
  const sparkleLayer = document.getElementById('sparkle-layer');
  const itemToolbar = document.getElementById('item-toolbar');
  const toolSizeLabel = document.getElementById('tool-size-label');

  // ヘッダーボタン
  const btnClear = document.getElementById('btn-clear');
  const btnRoomSelect = document.getElementById('btn-room-select');
  const currentRoomLabel = document.getElementById('current-room-label');
  const btnCamera = document.getElementById('btn-camera');
  const btnAlbum = document.getElementById('btn-album');

  // BGMコントロール
  const btnBgm = document.getElementById('btn-bgm');
  const bgmLabel = document.getElementById('bgm-label');
  const bgmSelect = document.getElementById('bgm-select');

  // お部屋きりかえ関連
  const roomModal = document.getElementById('room-modal');
  const btnCloseRoom = document.getElementById('btn-close-room');
  const roomSelectCards = document.querySelectorAll('.room-select-card');

  // カメラ・アルバム関連
  const cameraFlash = document.getElementById('camera-flash');
  const photoTagModal = document.getElementById('photo-tag-modal');
  const photoPreviewImg = document.getElementById('photo-preview-img');
  const btnSavePhoto = document.getElementById('btn-save-photo');
  const tagButtons = document.querySelectorAll('.btn-tag');
  const albumModal = document.getElementById('album-modal');
  const btnCloseAlbum = document.getElementById('btn-close-album');
  const albumGrid = document.getElementById('album-grid');
  const albumEmpty = document.getElementById('album-empty');
  const albumFilterTabs = document.querySelectorAll('.album-filter-tab');

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
  // 3. アプリの状態管理 (State) & お部屋定義
  // --------------------------------------------------
  const ROOM_DEFS = {
    myroom: {
      id: 'myroom',
      name: 'マイルーム',
      icon: '🎀',
      defaultWall: 'wall-pink-stripe',
      defaultFloor: 'floor-wood'
    },
    living: {
      id: 'living',
      name: 'リビング',
      icon: '☕',
      defaultWall: 'wall-mint-forest',
      defaultFloor: 'floor-wood'
    },
    garden: {
      id: 'garden',
      name: 'おにわ',
      icon: '🌷',
      defaultWall: 'wall-star-night',
      defaultFloor: 'floor-grass'
    },
    bath: {
      id: 'bath',
      name: 'おふろ',
      icon: '🛁',
      defaultWall: 'wall-pop-yellow',
      defaultFloor: 'floor-pastel-tile'
    }
  };

  let currentRoomId = 'myroom';
  let placedItems = []; // { id, itemId, x, y, rotation, flipX, sizeIndex, zIndex }
  let selectedInstanceId = null;
  let nextZIndex = 10;
  let currentCategory = 'sweets';
  let currentWall = 'wall-pink-stripe';
  let currentFloor = 'floor-wood';

  const SIZES = [
    { label: 'しょう', scale: 0.75 },
    { label: 'ちゅう', scale: 1.0 },
    { label: 'だい', scale: 1.35 }
  ];

  // --------------------------------------------------
  // 4. ローカルストレージ保存・読み込み & スタイル適用（部屋別）
  // --------------------------------------------------
  function getStorageKeys(roomId) {
    return {
      itemsKey: `myroom_placed_items_${roomId}_v2`,
      styleKey: `myroom_style_${roomId}_v2`
    };
  }

  function applyRoomStyle(wallId, floorId, shouldSave = true) {
    if (wallId) {
      WALLPAPERS.forEach(w => roomWall.classList.remove(w.id));
      roomWall.classList.add(wallId);
      currentWall = wallId;
    }
    if (floorId) {
      FLOORS.forEach(f => roomFloor.classList.remove(f.id));
      roomFloor.classList.add(floorId);
      currentFloor = floorId;
    }
    if (shouldSave) saveState();
  }

  function saveState() {
    try {
      const keys = getStorageKeys(currentRoomId);
      localStorage.setItem(keys.itemsKey, JSON.stringify(placedItems));
      localStorage.setItem(keys.styleKey, JSON.stringify({ wall: currentWall, floor: currentFloor }));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function loadState(roomId = currentRoomId) {
    try {
      const keys = getStorageKeys(roomId);
      const roomDef = ROOM_DEFS[roomId] || ROOM_DEFS.myroom;

      // 壁と床の復元
      const styleData = localStorage.getItem(keys.styleKey);
      if (styleData) {
        const { wall, floor } = JSON.parse(styleData);
        applyRoomStyle(wall, floor, false);
      } else {
        applyRoomStyle(roomDef.defaultWall, roomDef.defaultFloor, false);
      }

      // ステージの部屋モードクラスを更新
      stage.className = 'room-stage room-mode-' + roomId;

      // 家具の復元
      furnitureLayer.innerHTML = '';
      placedItems = [];
      selectItem(null);

      const data = localStorage.getItem(keys.itemsKey);
      if (data) {
        const loaded = JSON.parse(data);
        if (Array.isArray(loaded)) {
          loaded.forEach(item => addItemToStage(item.itemId, item.x, item.y, item, false));
        }
      } else {
        // 各お部屋の初期配置
        if (roomId === 'myroom') {
          addItemToStage('sw-bed', 70, 210, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('sw-table', 240, 260, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('yume-unicorn', 90, 180, { rotation: 0, flipX: false, sizeIndex: 0 }, false);
        } else if (roomId === 'living') {
          addItemToStage('basic-sofa', 180, 240, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('nat-round-table', 240, 280, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('pop-tv', 70, 210, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('nat-bookshelf', 340, 160, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
        } else if (roomId === 'garden') {
          // お庭：ベンチ、噴水、花だん、小鳥ちゃん
          addItemToStage('gar-bench', 70, 210, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('gar-fountain', 260, 170, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('gar-flowerbed', 80, 280, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('gar-bird', 340, 220, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
        } else if (roomId === 'bath') {
          // お風呂：バスタブ、シャワー、アヒルちゃん、シャンプー、イス
          addItemToStage('bath-tub', 60, 200, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('bath-shower', 230, 150, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('bath-duck', 120, 190, { rotation: 0, flipX: false, sizeIndex: 0 }, false);
          addItemToStage('bath-bottles', 270, 240, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
          addItemToStage('bath-stool', 200, 260, { rotation: 0, flipX: false, sizeIndex: 1 }, false);
        }
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

    // 「かべ＆ゆか」タブの場合
    if (category === 'room-style') {
      // 壁紙セクション
      const wallTitle = document.createElement('div');
      wallTitle.className = 'room-style-section-title';
      wallTitle.innerHTML = '<span>🧱</span> かべがみをえらぶ';
      itemsGrid.appendChild(wallTitle);

      WALLPAPERS.forEach(w => {
        const card = document.createElement('div');
        card.className = `item-card ${currentWall === w.id ? 'style-active' : ''}`;
        card.innerHTML = `
          <div class="style-preview-box" style="background: ${w.previewBg};"></div>
          <div class="item-card-name">${w.icon} ${w.name}</div>
        `;
        card.addEventListener('click', () => {
          applyRoomStyle(w.id, null);
          if (window.soundManager) window.soundManager.playSparkle();
          const stageRect = stage.getBoundingClientRect();
          triggerSparkles(stageRect.width / 2, stageRect.height * 0.3);
          renderBagItems('room-style');
        });
        itemsGrid.appendChild(card);
      });

      // 床セクション
      const floorTitle = document.createElement('div');
      floorTitle.className = 'room-style-section-title';
      floorTitle.innerHTML = '<span>🪵</span> ゆかをえらぶ';
      itemsGrid.appendChild(floorTitle);

      FLOORS.forEach(f => {
        const card = document.createElement('div');
        card.className = `item-card ${currentFloor === f.id ? 'style-active' : ''}`;
        card.innerHTML = `
          <div class="style-preview-box" style="background: ${f.previewBg};"></div>
          <div class="item-card-name">${f.icon} ${f.name}</div>
        `;
        card.addEventListener('click', () => {
          applyRoomStyle(null, f.id);
          if (window.soundManager) window.soundManager.playSparkle();
          const stageRect = stage.getBoundingClientRect();
          triggerSparkles(stageRect.width / 2, stageRect.height * 0.7);
          renderBagItems('room-style');
        });
        itemsGrid.appendChild(card);
      });
      return;
    }

    // 通常の家具アイテム
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

        // 効果音 & キラキラ
        if (window.soundManager) {
          window.soundManager.playPlace();
          window.soundManager.playSparkle();
        }
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

    if (window.soundManager) window.soundManager.playRemove();

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

  // --------------------------------------------------
  // 10.5 お部屋きりかえ（フェーズ3）
  // --------------------------------------------------
  function openRoomModal() {
    roomModal.classList.remove('hidden');
    drawerBackdrop.classList.remove('hidden');
    roomSelectCards.forEach(c => {
      c.classList.toggle('active', c.dataset.room === currentRoomId);
    });
  }

  function closeRoomModal() {
    roomModal.classList.add('hidden');
    drawerBackdrop.classList.add('hidden');
  }

  btnRoomSelect.addEventListener('click', openRoomModal);
  btnCloseRoom.addEventListener('click', closeRoomModal);

  roomSelectCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetRoom = card.dataset.room;
      if (targetRoom === currentRoomId) {
        closeRoomModal();
        return;
      }
      switchRoom(targetRoom);
    });
  });

  function switchRoom(targetRoomId) {
    saveState(); // 現在の部屋を保存

    currentRoomId = targetRoomId;
    const def = ROOM_DEFS[targetRoomId] || ROOM_DEFS.myroom;
    currentRoomLabel.textContent = def.name;

    roomSelectCards.forEach(c => {
      c.classList.toggle('active', c.dataset.room === targetRoomId);
    });

    closeRoomModal();
    loadState(targetRoomId);

    if (window.soundManager) window.soundManager.playSparkle();
    const stageRect = stage.getBoundingClientRect();
    triggerSparkles(stageRect.width / 2, stageRect.height / 2);
  }

  // --------------------------------------------------
  // 10.8 BGMコントロール連携
  // --------------------------------------------------
  btnBgm.addEventListener('click', () => {
    if (!window.soundManager) return;
    const isPlaying = window.soundManager.toggleBgm();
    btnBgm.classList.toggle('playing', isPlaying);
    bgmLabel.textContent = isPlaying ? 'BGM: オン 🎵' : 'BGM: オフ';
  });

  bgmSelect.addEventListener('change', (e) => {
    if (!window.soundManager) return;
    window.soundManager.setTrack(e.target.value);
  });

  // --------------------------------------------------
  // 11. 写真撮影（📸 パシャリ）＆ アルバム（🖼️）機能
  // --------------------------------------------------
  let currentCapturedPhotoData = null;
  let selectedPhotoTag = 'パステル';
  let currentAlbumFilter = 'all';
  const ALBUM_STORAGE_KEY = 'myroom_album_photos_v1';

  function getAlbumPhotos() {
    try {
      const data = localStorage.getItem(ALBUM_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveAlbumPhotos(photos) {
    try {
      localStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
      console.warn('Album save failed:', e);
    }
  }

  // 撮影フラッシュ演出
  function triggerFlash() {
    cameraFlash.classList.add('flash-active');
    setTimeout(() => {
      cameraFlash.classList.remove('flash-active');
    }, 180);
  }

  // お部屋のスクリーンショット生成（Canvas）
  async function captureRoomImage() {
    // 選択枠を一時的に隠す
    const prevSelected = selectedInstanceId;
    selectItem(null);

    const stageRect = stage.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(stageRect.width * 2);
    canvas.height = Math.round(stageRect.height * 2);
    const ctx = canvas.getContext('2d');
    const scale = canvas.width / stageRect.width;

    ctx.scale(scale, scale);

    // 1. 壁・背景の描画
    const wallHeight = stageRect.height * 0.58;

    if (currentRoomId === 'garden') {
      // --- お庭（青空・太陽・雲・遠くの緑） ---
      const skyGrad = ctx.createLinearGradient(0, 0, 0, wallHeight);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.4, '#7dd3fc');
      skyGrad.addColorStop(0.75, '#bae6fd');
      skyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, stageRect.width, wallHeight);

      // 太陽
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(stageRect.width * 0.15, wallHeight * 0.3, 24, 0, Math.PI * 2);
      ctx.fill();

      // 雲
      ctx.font = '36px sans-serif';
      ctx.fillText('☁️', stageRect.width * 0.65, wallHeight * 0.35);
      ctx.fillText('☁️', stageRect.width * 0.8, wallHeight * 0.25);
    } else if (currentRoomId === 'bath') {
      // --- お風呂（水色タイル壁・シャボン玉） ---
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 0, stageRect.width, wallHeight);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.lineWidth = 2;
      for (let x = 0; x < stageRect.width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, wallHeight);
        ctx.stroke();
      }
      for (let y = 0; y < wallHeight; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(stageRect.width, y);
        ctx.stroke();
      }

      // 換気小窓
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(36, 24, 80, 80);
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 3;
      ctx.strokeRect(36, 24, 80, 80);

      // 泡
      ctx.font = '22px sans-serif';
      ctx.fillText('🫧', stageRect.width * 0.75, 40);
      ctx.fillText('🫧', stageRect.width * 0.85, 60);
    } else {
      // --- 通常のお部屋の壁紙 ---
      if (currentWall === 'wall-star-night') {
        const grad = ctx.createLinearGradient(0, 0, 0, wallHeight);
        grad.addColorStop(0, '#3d2b6b');
        grad.addColorStop(0.6, '#7048a8');
        grad.addColorStop(1, '#b892e8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, stageRect.width, wallHeight);
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 24; i++) {
          const sx = (i * 47) % stageRect.width;
          const sy = (i * 29) % wallHeight;
          ctx.beginPath();
          ctx.arc(sx, sy, (i % 3) + 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (currentWall === 'wall-choco-cafe') {
        ctx.fillStyle = '#fdf6ee';
        ctx.fillRect(0, 0, stageRect.width, wallHeight);
        ctx.strokeStyle = 'rgba(160, 100, 60, 0.1)';
        ctx.lineWidth = 4;
        for (let x = -wallHeight; x < stageRect.width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + wallHeight, wallHeight);
          ctx.stroke();
        }
      } else if (currentWall === 'wall-mint-forest') {
        ctx.fillStyle = '#ebfbee';
        ctx.fillRect(0, 0, stageRect.width, wallHeight);
        ctx.fillStyle = 'rgba(81, 207, 102, 0.15)';
        for (let x = 20; x < stageRect.width; x += 40) {
          for (let y = 20; y < wallHeight; y += 40) {
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (currentWall === 'wall-pop-yellow') {
        ctx.fillStyle = '#fff9db';
        ctx.fillRect(0, 0, stageRect.width, wallHeight);
        ctx.fillStyle = '#ffd43b';
        for (let x = 16; x < stageRect.width; x += 48) {
          for (let y = 16; y < wallHeight; y += 48) {
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        ctx.fillStyle = '#ffeef6';
        ctx.fillRect(0, 0, stageRect.width, wallHeight);
        ctx.fillStyle = 'rgba(255, 182, 212, 0.22)';
        for (let x = 0; x < stageRect.width; x += 60) {
          ctx.fillRect(x, 0, 30, wallHeight);
        }
      }

      // 窓
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(36, 24, 110, 110);
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(40, 28, 102, 102);
      ctx.font = '28px sans-serif';
      ctx.fillText('☀️', 106, 58);
      ctx.fillText('☁️', 46, 72);
    }

    // 2. 巾木（またはお庭のウッドフェンス）
    if (currentRoomId === 'garden') {
      // 白い木製フェンス
      const fenceY = wallHeight - 16;
      ctx.fillStyle = '#ffffff';
      for (let x = 4; x < stageRect.width; x += 24) {
        ctx.fillRect(x, fenceY, 14, 28);
      }
      ctx.fillRect(0, fenceY + 10, stageRect.width, 6);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, wallHeight, stageRect.width, 12);
    }

    // 3. 床の描画
    const floorY = wallHeight + 12;
    const floorHeight = stageRect.height - floorY;
    if (currentRoomId === 'garden' || currentFloor === 'floor-grass') {
      ctx.fillStyle = '#a9e34b';
      ctx.fillRect(0, floorY, stageRect.width, floorHeight);
      ctx.fillStyle = '#94d82d';
      for (let x = 10; x < stageRect.width; x += 32) {
        ctx.beginPath();
        ctx.arc(x, floorY + 20, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (currentFloor === 'floor-pastel-tile' || currentRoomId === 'bath') {
      ctx.fillStyle = '#fff0f7';
      ctx.fillRect(0, floorY, stageRect.width, floorHeight);
      ctx.fillStyle = 'rgba(232, 217, 255, 0.5)';
      for (let x = 0; x < stageRect.width; x += 40) {
        for (let y = floorY; y < stageRect.height; y += 40) {
          if ((Math.floor(x / 40) + Math.floor((y - floorY) / 40)) % 2 === 0) {
            ctx.fillRect(x, y, 40, 40);
          }
        }
      }
    } else if (currentFloor === 'floor-cookie') {
      ctx.fillStyle = '#e9c46a';
      ctx.fillRect(0, floorY, stageRect.width, floorHeight);
      ctx.strokeStyle = '#c99a3e';
      ctx.lineWidth = 2;
      for (let x = 0; x < stageRect.width; x += 36) {
        ctx.strokeRect(x, floorY, 36, floorHeight);
      }
    } else if (currentFloor === 'floor-tatami') {
      ctx.fillStyle = '#d8f5a2';
      ctx.fillRect(0, floorY, stageRect.width, floorHeight);
    } else {
      // 木目フロア
      ctx.fillStyle = '#f7e1c8';
      ctx.fillRect(0, floorY, stageRect.width, floorHeight);
      ctx.strokeStyle = 'rgba(214, 172, 131, 0.5)';
      ctx.lineWidth = 2;
      for (let y = floorY; y < stageRect.height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(stageRect.width, y);
        ctx.stroke();
      }
    }

    // 4. 家具の描画（zIndex昇順）
    const sorted = [...placedItems].sort((a, b) => a.zIndex - b.zIndex);
    const itemPromises = sorted.map(itemData => {
      const itemDef = FURNITURE_ITEMS.find(i => i.id === itemData.itemId);
      if (!itemDef) return Promise.resolve();

      return new Promise((resolve) => {
        const img = new Image();
        const svgBlob = new Blob([itemDef.svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          ctx.save();
          const centerX = itemData.x + itemDef.width / 2;
          const centerY = itemData.y + itemDef.height / 2;
          ctx.translate(centerX, centerY);

          const scaleVal = SIZES[itemData.sizeIndex].scale;
          const flip = itemData.flipX ? -1 : 1;
          ctx.scale(flip * scaleVal, scaleVal);
          ctx.rotate((itemData.rotation * Math.PI) / 180);

          ctx.drawImage(img, -itemDef.width / 2, -itemDef.height / 2, itemDef.width, itemDef.height);
          ctx.restore();
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url;
      });
    });

    await Promise.all(itemPromises);

    if (prevSelected) selectItem(prevSelected);
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  // 📸 パシャリボタン押下
  btnCamera.addEventListener('click', async () => {
    triggerFlash();
    if (window.soundManager) window.soundManager.playCamera();
    try {
      const photoDataUrl = await captureRoomImage();
      currentCapturedPhotoData = photoDataUrl;
      photoPreviewImg.src = photoDataUrl;

      // タグの初期選択をお部屋に連動
      if (currentRoomId === 'garden') {
        selectedPhotoTag = 'おにわ';
      } else if (currentRoomId === 'bath') {
        selectedPhotoTag = 'おふろ';
      } else if (currentRoomId === 'living') {
        selectedPhotoTag = 'ナチュラル';
      } else {
        selectedPhotoTag = 'パステル';
      }

      tagButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tag === selectedPhotoTag);
      });

      // ポップアップを開く
      photoTagModal.classList.remove('hidden');
      drawerBackdrop.classList.remove('hidden');
    } catch (e) {
      console.error('Capture failed:', e);
    }
  });

  // タグボタンの選択
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPhotoTag = btn.dataset.tag;
    });
  });

  // アルバムに保存ボタン
  btnSavePhoto.addEventListener('click', () => {
    if (!currentCapturedPhotoData) return;

    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newPhoto = {
      id: 'photo_' + Date.now(),
      dataUrl: currentCapturedPhotoData,
      tag: selectedPhotoTag,
      date: dateStr
    };

    const photos = getAlbumPhotos();
    photos.unshift(newPhoto); // 先頭に追加
    saveAlbumPhotos(photos);

    // 閉じてキラキラ
    photoTagModal.classList.add('hidden');
    drawerBackdrop.classList.add('hidden');
    currentCapturedPhotoData = null;

    const stageRect = stage.getBoundingClientRect();
    triggerSparkles(stageRect.width / 2, stageRect.height / 2);
  });

  // 🖼️ アルバムを開く
  function openAlbumModal() {
    renderAlbum();
    albumModal.classList.remove('hidden');
    drawerBackdrop.classList.remove('hidden');
  }

  function closeAlbumModal() {
    albumModal.classList.add('hidden');
    drawerBackdrop.classList.add('hidden');
  }

  btnAlbum.addEventListener('click', openAlbumModal);
  btnCloseAlbum.addEventListener('click', closeAlbumModal);

  // アルバム内フィルター
  albumFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      albumFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentAlbumFilter = tab.dataset.filter;
      renderAlbum();
    });
  });

  // アルバム写真のレンダリング
  function renderAlbum() {
    albumGrid.innerHTML = '';
    const allPhotos = getAlbumPhotos();
    const filtered = currentAlbumFilter === 'all'
      ? allPhotos
      : allPhotos.filter(p => p.tag === currentAlbumFilter);

    if (filtered.length === 0) {
      albumEmpty.classList.remove('hidden');
      return;
    }
    albumEmpty.classList.add('hidden');

    filtered.forEach(photo => {
      const card = document.createElement('div');
      card.className = 'album-photo-card';
      card.innerHTML = `
        <div class="album-photo-img-wrap">
          <img src="${photo.dataUrl}" alt="おへや写真">
          <span class="photo-tag-badge">${photo.tag}</span>
        </div>
        <div class="album-photo-footer">
          <span class="album-photo-date">${photo.date}</span>
          <div class="album-photo-actions">
            <button class="photo-action-btn btn-dl" title="ほぞん">📥</button>
            <button class="photo-action-btn btn-del" title="けす">🗑️</button>
          </div>
        </div>
      `;

      // ダウンロードボタン
      card.querySelector('.btn-dl').addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = photo.dataUrl;
        a.download = `my-room-${photo.tag}-${Date.now()}.jpg`;
        a.click();
      });

      // 削除ボタン
      card.querySelector('.btn-del').addEventListener('click', () => {
        const ok = confirm('このしゃしんを アルバムから けす？');
        if (!ok) return;
        const updated = getAlbumPhotos().filter(p => p.id !== photo.id);
        saveAlbumPhotos(updated);
        renderAlbum();
      });

      albumGrid.appendChild(card);
    });
  }

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
