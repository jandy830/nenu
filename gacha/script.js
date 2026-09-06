// ==========================================
// 🍣 すし ＆ 🍞 パン ＆ ✨ 魔法 ＆ 🍔 食べ物 ＆ 🐬 海 ＆ 💖 めっちゃかわ ＆ 🎤 アイドル セプタプルガチャアプリ
// ==========================================

// 🍣 すしガチャキャラクター
const SUSHI_CHARACTERS = [
  {
    id: 'tamago_cat',
    name: 'たまごずしにゃんこ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '回転寿司の お皿の上',
    favorite: '甘くてフワフワの 厚焼き玉子',
    description: 'シャリでできた 白くてまるい ねこちゃん！お背中に 大きな玉子焼きを のせているよ♪',
    getImage: () => IMAGES.tamago
  },
  {
    id: 'maguro_dog',
    name: 'マグロイヌ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '活気あふれる 寿司市場',
    favorite: '新鮮な赤身マグロ',
    description: '元気に走る シャリいぬちゃん！お背中に ツヤツヤのマグロを のせて、しっぽをふっているよ！',
    getImage: () => IMAGES.maguro
  },
  {
    id: 'ebi_cat',
    name: 'エビにゃんこ',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: 'おしゃれな 寿司カフェ',
    favorite: 'ぷりぷりボイルエビ',
    description: 'ぷりぷりエビを 背負った 白ねこちゃん！しっぽまで エビとおそろいで とってもおしゃれ♪',
    getImage: () => IMAGES.ebi
  },
  {
    id: 'lion_salmon',
    name: 'ライオンサーモン',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '北の綺麗な 海の川口',
    favorite: '脂ののった アトランティックサーモン',
    description: 'サーモンの たてがみをつけた カッコいい百獣の王ライオン！ガオーッと可愛い声で吠えるよ！',
    getImage: () => IMAGES.lion
  },
  {
    id: 'uni_bear',
    name: 'ウニくま',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '高級寿司の 檜カウンター',
    favorite: '北海道産の 濃厚うに',
    description: '黒海苔の服を着た もこもこくまちゃん！お頭の上に とろける高級ウニがたくさんのっているよ！',
    getImage: () => createUniBearDataUrl()
  },
  {
    id: 'golden_dragon',
    name: '黄金シャリドラゴン',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: 'すし神さまの 黄金神社',
    favorite: '金色に光る 特上シャリ',
    description: '全身が キラキラ金色のシャリでできた 伝説のドラゴン神さま！出会えた人は 超ラッキー！！',
    getImage: () => createGoldenDragonDataUrl()
  },
  {
    id: 'avocado_salmon',
    name: 'アボカドサーモンちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'おしゃれなカリフォルニア寿司',
    favorite: 'クリーミーなアボカドとマヨネーズ',
    description: 'サーモンとまろやかアボカドがベストマッチ！おしゃれでキュートな人気のお寿司ちゃん！',
    getImage: () => createAvocadoSalmonDataUrl()
  },
  {
    id: 'ikura_prince',
    name: 'いくら軍艦プリンス',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '高級料亭の特撰レーン',
    favorite: 'ぷちぷち弾ける高級醤油漬けいくら',
    description: 'プチプチ輝く宝石のようなイクラの冠を戴いた 王子様お寿司！ゴージャスに輝くよ！',
    getImage: () => createIkuraPrinceDataUrl()
  }
];

// 🍞 パンガチャキャラクター
const PAN_CHARACTERS = [
  {
    id: 'shokupan_dog',
    name: 'しょくぱんいぬ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '焼きたて ベーカリーショップ',
    favorite: 'バターと イチゴジャム',
    description: 'ふんわり山型食パンの体に パッチリお目のいぬちゃん顔がついた 焼きたて食パンいぬ！',
    getImage: () => createPanDataUrl('shokupan')
  },
  {
    id: 'croissant_cat',
    name: 'クロワッサンにゃんこ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'パリ風の パン屋さん',
    favorite: '発酵バター',
    description: 'きつね色にこんがり焼けた サクサクの三日月クロワッサンねこちゃん！',
    getImage: () => createPanDataUrl('croissant')
  },
  {
    id: 'melonpan_kame',
    name: 'メロンパンかめ',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: 'お日さまの当たる 公園',
    favorite: 'ザラメ砂糖',
    description: 'サクサク格子のメロンパン甲羅に、可愛いお顔と手足がついた メロンパンかめさん！',
    getImage: () => createPanDataUrl('melonpan')
  },
  {
    id: 'corone_usagi',
    name: 'チョココロネうさぎ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '甘いスイーツの 森',
    favorite: '濃厚チョコクリーム',
    description: '長いお耳がピョコンと生えた 可愛いチョココロネうさぎ！',
    getImage: () => createPanDataUrl('corone')
  },
  {
    id: 'donut_bear',
    name: 'ドーナツくま',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'カラフルドーナツの お城',
    favorite: 'いちごチョコと チョコスプレー',
    description: 'ピンクのいちごチョコがかかった ふわふわドーナツを着た 可愛いフワフワくまさん！',
    getImage: () => createPanDataUrl('donut')
  },
  {
    id: 'french_unicorn',
    name: '虹色フレンチトーストユニコーン',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '夢のなかの 魔法カフェ',
    favorite: 'メープルシロップと 虹色の粉砂糖',
    description: '虹色の角がキラリと輝く 伝説のフレンチトーストユニコーン！',
    getImage: () => createPanDataUrl('french')
  }
];

// ✨ 魔法少女ガチャキャラクター
const MAHOU_CHARACTERS = [
  {
    id: 'stella_witch',
    name: '見習い魔女っ子ステラ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '星空の まほう学校',
    favorite: 'こんぺいとうと 星のステッキ',
    description: 'ふわふわピンクツインテールが可愛い！元気いっぱいの見習い魔女っ子！',
    getImage: () => createMahouDataUrl('stella')
  },
  {
    id: 'moon_maho',
    name: '月うさぎマホ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '月明かりの シルキーフォレスト',
    favorite: '月のドロップキャンディ',
    description: 'サラサラ金髪ロングヘアと 大きなウサ耳リボンが可愛い 月うさぎの魔法少女♪',
    getImage: () => createMahouDataUrl('moon')
  },
  {
    id: 'sakura_flora',
    name: '桜の妖精フローラ',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '満開の さくら王国',
    favorite: '桜餅と マカロン',
    description: '桜色のウェーブロングヘアと フリルドレスが華やかな 春の魔法少女！',
    getImage: () => createMahouDataUrl('sakura')
  },
  {
    id: 'crystal_luna',
    name: 'クリスタルプリンセス ルナ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '氷と宝石の クリスタルパレス',
    favorite: 'キラキラ輝く 宝石グミ',
    description: '紫色の姫カットロングヘアと ティアラを纏った 氷とクリスタルの美しいプリンセス！',
    getImage: () => createMahouDataUrl('crystal')
  },
  {
    id: 'cat_lucia',
    name: '黒猫使いルシエ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '夜空の ミステリアスタワー',
    favorite: '夜空の金平糖と 黒猫ビスケット',
    description: 'ダークパープルのボブヘアと 帽子をつけた黒猫パートナーと戦う クール可愛い魔法少女！',
    getImage: () => createMahouDataUrl('cat')
  },
  {
    id: 'galaxy_goddess',
    name: '銀河の女神プリンセスステラ',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '宇宙の果ての スターテラス',
    favorite: '流れ星の スパークリングジュース',
    description: 'ゴージャスな七色超ロングヘアと 宝冠をもつ 奇跡を巻き起こす伝説の大女神様！',
    getImage: () => createMahouDataUrl('galaxy')
  }
];

// 🍔 食べ物ガチャキャラクター
const FOOD_CHARACTERS = [
  {
    id: 'mentaiko_chan',
    name: 'めんたいこちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '博多の めんたいこ本舗',
    favorite: 'ピリ辛の 辛子トウガラシ',
    description: '真っ赤でつぶつぶの 明太子そのものに パッチリ可愛いお顔がついた めんたいこちゃん！',
    getImage: () => createFoodDataUrl('mentaiko')
  },
  {
    id: 'burger_kun',
    name: 'ハンバーガーくん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'アメリカン ダイナー',
    favorite: 'ジューシーな パティとチーズ',
    description: 'ふんわりバンズとお肉＆チーズの ハンバーガーそのものにご機嫌なお顔がついた ハンバーガーくん！',
    getImage: () => createFoodDataUrl('burger')
  },
  {
    id: 'ramen_chan',
    name: 'らーめんちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '屋台の ラーメン屋さん',
    favorite: 'あつあつ 醤油スープ',
    description: 'ナルトとチャーシューがのった あつあつラーメンに ニッコリ可愛いお顔がついた らーめんちゃん！',
    getImage: () => createFoodDataUrl('ramen')
  },
  {
    id: 'curry_kun',
    name: 'カレーライスくん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '洋食屋さんの カウンター',
    favorite: '甘口とろける カレールー',
    description: 'ホカホカご飯と濃厚カレールーに 可愛い笑顔がついた 美味しいカレーライスくん！',
    getImage: () => createFoodDataUrl('curry')
  },
  {
    id: 'parfait_chan',
    name: 'パフェちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'フルーティー パフェショップ',
    favorite: '新鮮イチゴと ホイップクリーム',
    description: 'イチゴソフトとホイップたっぷりの パフェに パッチリお目々がついた パフェちゃん！',
    getImage: () => createFoodDataUrl('parfait')
  },
  {
    id: 'rainbow_cake_chan',
    name: '虹色ショートケーキちゃん',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: 'お城の スイーツパーティ',
    favorite: '特選イチゴと 魔法のホイップ',
    description: '大きな苺と七色スポンジのショートケーキそのものに キラキラお顔がついた 伝説のケーキちゃん！',
    getImage: () => createFoodDataUrl('cake')
  }
];

// 🐬 海の生き物ガチャキャラクター
const SEA_CHARACTERS = [
  {
    id: 'penguin_chan',
    name: 'ペンギンちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '南極の ひんやり氷の上',
    favorite: 'ピチピチのお魚',
    description: 'まるくて可愛いお腹とフリッパーを パタパタ振る よちよちペンギンの赤ちゃん！',
    getImage: () => createSeaDataUrl('penguin')
  },
  {
    id: 'mendako_chan',
    name: 'メンダコちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '深海の キラキラサンゴ礁',
    favorite: 'ちっちゃな 小エビ',
    description: 'ぽてっと丸い パステルピンクの体に 小さな耳ヒレがついた 可愛いメンダコちゃん！',
    getImage: () => createSeaDataUrl('mendako')
  },
  {
    id: 'chinanago_san',
    name: 'チンアナゴさん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '白砂の きれいな海底',
    favorite: '海の プランクトン',
    description: '砂からニョキッと顔を出す 白黒水玉ドット模様の 仲良しツインチンアナゴ！',
    getImage: () => createSeaDataUrl('chinanago')
  },
  {
    id: 'jinbee_same',
    name: '水玉ジンベエザメ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '南の あたたかい大海原',
    favorite: 'いっぱいの オキアミ',
    description: '大きな四角いお口と 白い水玉ドット模様がカッコいい 優しくて巨大なジンベエザメ！',
    getImage: () => createSeaDataUrl('jinbee')
  },
  {
    id: 'kurage_hime',
    name: 'クラゲ姫',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '神秘の ディープオーシャン',
    favorite: '光る プランクトン',
    description: '水色とピンクのドレスを纏って ゆらゆら神秘的に漂う クラゲのお姫様！',
    getImage: () => createSeaDataUrl('kurage')
  },
  {
    id: 'rainbow_whale_god',
    name: '虹色クジラ神さま',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '世界の果ての クジラ海域',
    favorite: '虹色の 星くず',
    description: '頭から七色のオーラ潮を吹き上げる 雄大で神秘的な 伝説の大クジラ神さま！',
    getImage: () => createSeaDataUrl('whale')
  }
];

// 💖 めっちゃかわガチャキャラクター
const KAWAII_CHARACTERS = [
  {
    id: 'yumekawa_bear',
    name: 'ゆめかわクマちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'メルヘン リボンハウス',
    favorite: 'ミルキー キャンディ',
    description: '大きなピンクのリボンと ほっぺのハートマークがキュートな ふわふわクマちゃん！',
    getImage: () => createKawaiiDataUrl('bear')
  },
  {
    id: 'ichigo_usa',
    name: 'いちごうさちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'イチゴの パステルガーデン',
    favorite: 'いちごミルク',
    description: '真っ赤ないちご帽子をかぶった たれ耳がとっても可愛いピンクのうさぎちゃん！',
    getImage: () => createKawaiiDataUrl('ichigo_usa')
  },
  {
    id: 'cloud_cat',
    name: 'ふわふわ雲ねこちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '虹のうえの クラウドパレス',
    favorite: '雲の こんぺいとう',
    description: 'モコモコの雲に乗って 虹色のしっぽを振る ゆめかわファンタジーな子猫ちゃん！',
    getImage: () => createKawaiiDataUrl('cloud_cat')
  },
  {
    id: 'yumekawa_unicorn',
    name: 'ゆめかわユニコーン',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'ゆめかわ スターランド',
    favorite: 'お星さまの ドロップ',
    description: 'パステルパープルのたてがみと キラキラ星のツノをもつ 夢見るユニコーンちゃん！',
    getImage: () => createKawaiiDataUrl('unicorn')
  },
  {
    id: 'pudding_hiyoko',
    name: 'ひよこプリンちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'スイーツ カフェテラス',
    favorite: 'とろける カスタード',
    description: 'ぷるぷるカスタードプリンの帽子をかぶった チュンチュン可愛いひよこちゃん！',
    getImage: () => createKawaiiDataUrl('hiyoko')
  },
  {
    id: 'yumekawa_angel',
    name: 'ゆめかわエンジェル',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '天界の エンジェルハート',
    favorite: '愛の スイートキャンディ',
    description: '大きな天使の羽と 虹色ハートのステッキをもつ 可愛さ無限大の 伝説の大天使！',
    getImage: () => createKawaiiDataUrl('angel')
  },
  {
    id: 'ichigo_milk_rabbit',
    name: 'いちごみるくうさぎ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'パステルストロベリーカフェ',
    favorite: 'あまーいいちごミルク',
    description: 'ピンクのフリルリボンと いちごの瓶を持った パステルピンクの激かわうさぎちゃん！',
    getImage: () => createKawaiiDataUrl('ichigo_usa')
  },
  {
    id: 'cotton_candy_kitty',
    name: 'わたあめこねこ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '虹のわたあめアイランド',
    favorite: 'ふわふわパステルわたあめ',
    description: 'わたあめみたいにフワフワな毛並みと 星のステッキを持った めっちゃかわ子猫ちゃん！',
    getImage: () => createKawaiiDataUrl('cloud_cat')
  }
];

// 🎤 アイドルガチャキャラクター（人気アイドル6人組！）
const IDOL_CHARACTERS = [
  {
    id: 'akuma_chan',
    name: '悪魔ちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'ミッドナイト ライブステージ',
    favorite: '黒ゴマ キャンディ',
    description: '黒とピンクのツインテールと 小さな悪魔のツノ＆羽根がキュートな 小悪魔系アイドル！',
    getImage: () => createIdolDataUrl('akuma')
  },
  {
    id: 'tenshi_chan',
    name: '天使ちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'スカイホーリー ステージ',
    favorite: '天使の マシュマロ',
    description: '純白ドレスと パステルブルーの大きな羽を身につけた ふんわり清楚な天使アイドル！',
    getImage: () => createIdolDataUrl('tenshi')
  },
  {
    id: 'yamikawa_chan',
    name: 'やみかわちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: 'サブカル 地下ライブハウス',
    favorite: 'ダーク グミ',
    description: '黒いタレうさ耳と ハートの眼帯がキュートな 病みカワ系の個性的アイドル！',
    getImage: () => createIdolDataUrl('yamikawa')
  },
  {
    id: 'gakusei_chan',
    name: '学生ちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '放課後 学園フェスティバル',
    favorite: '購買の いちごパン',
    description: 'チェック柄の制服スカートと 大きな赤いリボンが眩しい 現役女子高生アイドル！',
    getImage: () => createIdolDataUrl('gakusei')
  },
  {
    id: 'yumekawa_idol',
    name: 'ゆめかわちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'ドリーム ファンタジーステージ',
    favorite: 'パステル ドロップ',
    description: '虹色の超ロングツインテールと パステルカラーのフリルドレスが煌めく ゆめかわ王道アイドル！',
    getImage: () => createIdolDataUrl('yumekawa_idol')
  },
  {
    id: 'lolita_hime',
    name: 'ロリータ姫',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: 'プリンセス ドールパレス',
    favorite: '特製 いちごマカロン',
    description: 'ゴージャスなフリルドレスと イチゴのボンネットを身につけた 伝説のロリータお姫様アイドル！',
    getImage: () => createIdolDataUrl('lolita_hime')
  }
];

// 🔥 かっこいいガチャキャラクター（超人気6大ヒーロー＆ドラゴン！）
const COOL_CHARACTERS = [
  {
    id: 'knight_phoenix',
    name: 'ナイトフェニックス',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '天空の 聖剣キャッスル',
    favorite: '正義の エナジードリンク',
    description: '白银の甲冑と 黄金の聖剣を構えた カッコいい聖騎士！背中から 燃えるフェニックスの羽を羽ばたかせるよ！',
    getImage: () => createCoolDataUrl('knight')
  },
  {
    id: 'thunder_wolf',
    name: 'サンダーウルフ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '稲妻が走る サンダーピーク',
    favorite: 'ビリビリ 雷のドロップ',
    description: '青い雷光オーラを全身に纏い 疾風のように駆け抜ける 超カッコいい雷の狼ヒーロー！',
    getImage: () => createCoolDataUrl('wolf')
  },
  {
    id: 'mecha_dragon',
    name: 'メカドラゴン',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '未来都市の サイバーファクトリー',
    favorite: '高エネルギー 超プラズマ',
    description: '超鋼鉄のメタリックボディと 赤く光るバイザーをもつ カッコよさ最強の サイバーメカドラゴン！',
    getImage: () => createCoolDataUrl('mecha')
  },
  {
    id: 'shadow_ninja',
    name: 'シャドウニンジャ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '月夜の 月影ノ忍里',
    favorite: '黒ごま 秘伝の兵糧丸',
    description: '漆黒の装束を身に纏い 紫電の巨大手裏剣を背負って 闇を疾走する クールな最強忍者！',
    getImage: () => createCoolDataUrl('ninja')
  },
  {
    id: 'flame_tiger',
    name: '炎帝フレイムタイガー',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '灼熱の ヴァルカン火山',
    favorite: '熱々マグマ ステーキ',
    description: '燃えさかる炎のたてがみと 爆炎の拳をもつ 百獣の王！ガオーッと叫んで 悪を吹き飛ばす！',
    getImage: () => createCoolDataUrl('tiger')
  },
  {
    id: 'galaxy_bahamut',
    name: '銀河龍ギャラクシーバハムート',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '全宇宙の ギャラクシーコア',
    favorite: '超新星の スパークエネルギー',
    description: '七色の星雲オーラと 宇宙の無限エネルギーを抱く 全宇宙を統べる 伝説の最強究極ドラゴン神！',
    getImage: () => createCoolDataUrl('bahamut')
  }
];

// 🚀 うちゅうガチャキャラクター（大人気ロマンいっぱい6大宇宙キャラ！）
const SPACE_CHARACTERS = [
  {
    id: 'astro_cat',
    name: 'うちゅうひこうしねこ',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '国際宇宙ステーション',
    favorite: '宇宙の チーズキャンディ',
    description: '丸いガラスヘルメットをかぶった 可愛い宇宙飛行士ねこちゃん！背中のロケットで ぷかぷか浮くよ♪',
    getImage: () => createSpaceDataUrl('astro_cat')
  },
  {
    id: 'saturn_san',
    name: 'どせいさん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '太陽系の 土星軌道',
    favorite: 'キラキラ 氷のリング',
    description: 'パステルオレンジの丸い体に パッチリお目々と 大きな光るリングをもつ 可愛い土星さん！',
    getImage: () => createSpaceDataUrl('saturn')
  },
  {
    id: 'comet_dragon',
    name: 'すいせいドラゴン',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '銀河の スターダストウェイ',
    favorite: '流れ星の 星くずグミ',
    description: '七色の光るしっぽを引いて 宇宙を高速でかけぬける 綺麗な流れ星ドラゴン！',
    getImage: () => createSpaceDataUrl('comet_dragon')
  },
  {
    id: 'cyber_robot',
    name: 'サイバーロボ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '未知の プラネットX',
    favorite: 'ピコピコ 電気エネルギー',
    description: '光るアンテナと ピコピコモニターのお顔をもつ 可愛い宇宙探査ロボット！',
    getImage: () => createSpaceDataUrl('robot')
  },
  {
    id: 'ufo_tako',
    name: 'UFOたこちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'キラキラ UFOシップ',
    favorite: '宇宙の ぷにぷにゼリー',
    description: 'ピカピカ光る空飛ぶ円盤UFOに乗った 可愛いパステルグリーンの宇宙人タコちゃん！',
    getImage: () => createSpaceDataUrl('ufo_tako')
  },
  {
    id: 'cosmic_hime',
    name: 'プリンセス・コズミック',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '全銀河の コズミックパレス',
    favorite: '特製 宇宙の星くずパフェ',
    description: '宇宙の星屑ドレスと ステッキを身にまとった 全宇宙を守る 伝説の銀河お姫様！',
    getImage: () => createSpaceDataUrl('cosmic_hime')
  }
];

// 🎮 レトロゲームキャラクター（ユーザーおすすめの超豪華ゲーム大集合キャラ！）
const PIXEL_CHARACTERS = [
  {
    id: 'game_ki_chan',
    name: 'ゲームきちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'レトロゲームコーナー',
    favorite: 'ピコピコ カセット',
    description: '十字キーのリボンと ボタンがついた レトロなゲーム機ちゃん！ボタンを押すと ピコピコ喜ぶよ！',
    getImage: () => createPixelDataUrl('game_ki_chan')
  },
  {
    id: 'dot_slime_chan',
    name: 'ドットスライムちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'はじまりの ドット草原',
    favorite: 'ぷるぷる 薬草ゼリー',
    description: '8bitドット絵でえがかれた ぷるぷる揺れる かわいいスライムちゃん！てくてく跳ねるよ♪',
    getImage: () => createPixelDataUrl('dot_slime_chan')
  },
  {
    id: 'oshiro_chan',
    name: 'おしろちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '王国の ドットキャッスル',
    favorite: '特製 フラッグケーキ',
    description: 'とんがり屋根のリボンと 頑丈なドットの城壁をもつ かわいいお城ちゃん！勇者をいつでも待ってるよ！',
    getImage: () => createPixelDataUrl('oshiro_chan')
  },
  {
    id: 'pasokon_chan',
    name: 'パソコンちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '電子の モニタールーム',
    favorite: 'フロッピー ディスク',
    description: 'レトロなCRTモニターのお顔と キーボードを身につけた パソコンちゃん！カタカタ計算が得意！',
    getImage: () => createPixelDataUrl('pasokon_chan')
  },
  {
    id: 'dot_yusha',
    name: 'ドットゆうしゃちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '伝説の ドットダンジョン',
    favorite: 'やくそう スープ',
    description: '8bitドット絵のドット聖剣と 盾を構えた カッコかわいいドット勇者ちゃん！世界を救う旅に出る！',
    getImage: () => createPixelDataUrl('dot_yusha')
  },
  {
    id: 'dot_dragon_king',
    name: '8bitドットキングドラゴン',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: 'ラストダンジョンの 8bitコア',
    favorite: '超高得点 スコアボーナス',
    description: 'ドットの大きな翼と 8bitの爆炎ブレスを吐く レトロゲーム界の 伝説のドットドラゴン王！',
    getImage: () => createPixelDataUrl('dot_dragon_king')
  }
];

// 👻 ようかい・オバケキャラクター（大人気6大妖怪大集合！）
const YOKAI_CHARACTERS = [
  {
    id: 'obake_chan',
    name: 'しろオバケちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '夜の おばけ屋敷',
    favorite: 'あまい ヒのたまキャンディ',
    description: 'ふわふわ空を飛ぶ 可愛い白オバケちゃん！べーっと舌を出して いたずらするのが大好き♪',
    getImage: () => createYokaiDataUrl('obake')
  },
  {
    id: 'kappa_chan',
    name: 'カッパちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '清流の かっぱ沼',
    favorite: 'とれたて シャキシャキきゅうり',
    description: '頭にお皿を乗せた パステルグリーンの可愛いカッパちゃん！相撲をとるのが得意だよ！',
    getImage: () => createYokaiDataUrl('kappa')
  },
  {
    id: 'hitotsume_chan',
    name: 'ひとつめ小僧ちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '夕暮れの ようかい横丁',
    favorite: 'みたらし 妖怪だんご',
    description: '大きなひとつの目をパチパチさせる 可愛い妖怪小僧！驚かせるのが大好き！',
    getImage: () => createYokaiDataUrl('hitotsume')
  },
  {
    id: 'yukionna_chan',
    name: 'ゆきおんなちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '吹雪の かき氷マウンテン',
    favorite: '特製 いちごミルクかき氷',
    description: '綺麗な白い着物と 氷の髪かざりをつけた 雪の妖怪お姫様！冷たい吐息で氷の結晶をつくるよ！',
    getImage: () => createYokaiDataUrl('yukionna')
  },
  {
    id: 'kyubi_kitsune',
    name: 'きゅうびのきつね',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '神秘の 九尾神社',
    favorite: '特選 きつねうどん',
    description: 'もふもふした9本の黄金しっぽをもつ 伝説のきつね妖怪！化けるのが超うまい！',
    getImage: () => createYokaiDataUrl('kyubi')
  },
  {
    id: 'akaoni_king',
    name: '伝説の鬼王・あかおに様',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '鬼ヶ島の 鬼神殿',
    favorite: '超特大 鬼せんべい',
    description: '黄金の角と大きな金棒を構えた 全妖怪の頂点に立つ 伝説の強くてカッコ可愛い鬼の王様！',
    getImage: () => createYokaiDataUrl('akaoni_king')
  }
];

// 🦖 きょうりゅうキャラクター（大人気恐竜6大ヒーロー！）
const DINO_CHARACTERS = [
  {
    id: 'tyranno_chan',
    name: 'ティラノちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '太古の ジュラシックジャングル',
    favorite: 'お肉たっぷり 肉まん',
    description: '小さな前足と 大きな口をもつ 可愛いティラノサウルス！ガオーッと元気いっぱいに叫ぶよ！',
    getImage: () => createDinoDataUrl('tyranno')
  },
  {
    id: 'tricera_chan',
    name: 'トリケラちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '青々とした トリケラ平原',
    favorite: 'シャキシャキ 巨大はっぱ',
    description: '3本のツノと 立派なフリルをもつ 草食系のかわいいトリケラトプス！突進が得意！',
    getImage: () => createDinoDataUrl('tricera')
  },
  {
    id: 'ptera_chan',
    name: 'プテラちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '大空の プテラキャニオン',
    favorite: 'フレッシュ 魚マフィン',
    description: '大きな翼をパタパタさせて 大空をすいすい飛ぶ プテラノドン！空のお散歩が大好き♪',
    getImage: () => createDinoDataUrl('ptera')
  },
  {
    id: 'brachio_chan',
    name: 'ブラキオちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '巨木の ブラキオフォレスト',
    favorite: '高所の 樹頂フルーツ',
    description: '首がとっても長〜い おっとり優しいブラキオサウルス！高い木の上のフルーツも余裕で食べられるよ！',
    getImage: () => createDinoDataUrl('brachio')
  },
  {
    id: 'ankylo_chan',
    name: 'アンキロちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '岩山の ハンマーバレー',
    favorite: 'かたい コツコツクッキー',
    description: 'トゲトゲの装甲ボディと ハンマーしっぽをもつ カッコいいアンキロサウルス！防御力バツグン！',
    getImage: () => createDinoDataUrl('ankylo')
  },
  {
    id: 'spino_king',
    name: 'レインボースピノキング',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '伝説の リバーサイドコア',
    favorite: '虹色の スタードロップ',
    description: '背中の大きなひれが 七色にキラキラ輝く 太古の地球を統べる 伝説の恐竜キング！',
    getImage: () => createDinoDataUrl('spino_king')
  }
];

// 🚗 はたらくくるまキャラクター（大人気ヒーロー車全6体！）
const CAR_CHARACTERS = [
  {
    id: 'patrol_car',
    name: 'パトカーちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'にぎやかな セーフティタウン',
    favorite: 'ピカピカ 赤色灯オイル',
    description: '頭の赤色灯ランプを ピカピカ点滅させて 街の平和を守る カッコいいパトカーちゃん！',
    getImage: () => createCarDataUrl('patrol')
  },
  {
    id: 'ambulance_chan',
    name: 'きゅうきゅうしゃちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'みんなの セーフティ病院',
    favorite: 'やさしい 絆創膏キャンディ',
    description: '赤いクロスラインと 優しい笑顔をもつ 頼もしい救急車ちゃん！怪我人をすぐ助けるよ！',
    getImage: () => createCarDataUrl('ambulance')
  },
  {
    id: 'fire_truck',
    name: 'しょうぼうしゃちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '街の ファイヤーステーション',
    favorite: '特大 放水ビッグバズーカ',
    description: '大きなはしごを伸ばして 水を勢いよく噴射する 真っ赤なカッコいい消防車ちゃん！',
    getImage: () => createCarDataUrl('fire')
  },
  {
    id: 'shovel_car',
    name: 'ショベルカーくん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'わくわく ビルド工事現場',
    favorite: 'ゴツゴツ 岩石チョコ',
    description: 'パワフルなアームバケットで 土や岩をどんどん削る 黄色のパワーショベルカーくん！',
    getImage: () => createCarDataUrl('shovel')
  },
  {
    id: 'dump_car',
    name: 'ダンプカーくん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '広大な ダンプマウンテン',
    favorite: 'パワフル ハイオクガソリン',
    description: '大きな荷台をウイーンと傾けて 土砂をダイナミックに運ぶ 力持ちのダンプカーくん！',
    getImage: () => createCarDataUrl('dump')
  },
  {
    id: 'rocket_transporter',
    name: 'ロケットトランスポーター',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '宇宙基地の 搬送滑走路',
    favorite: '超ハイパワー プラズマ燃料',
    description: '背中に巨大な宇宙ロケットを搭載して 宇宙基地まで運ぶ 伝説の超大型特殊車！',
    getImage: () => createCarDataUrl('rocket_transporter')
  }
];

// 🍰 スイーツ・お菓子キャラクター（甘くてとっても可愛い大人気お菓子！）
const SWEETS_CHARACTERS = [
  {
    id: 'shortcake_chan',
    name: 'ショートケーキちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '甘い香りの スウィートカフェ',
    favorite: 'フレッシュ 完熟イチゴ',
    description: 'スポンジケーキの頭に真っ赤な苺と 生クリームリボンがついた 可愛いケーキちゃん！',
    getImage: () => createSweetsDataUrl('shortcake')
  },
  {
    id: 'purin_chan',
    name: 'ぷるぷるプリンちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'ぷるぷる プリンアイランド',
    favorite: 'とろ〜り ほろ苦カラメル',
    description: 'カラメルソースのお帽子をかぶって ぷるぷる揺れる 甘くて可愛いプリンちゃん！',
    getImage: () => createSweetsDataUrl('purin')
  },
  {
    id: 'chocobanana_kun',
    name: 'チョコバナナくん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: 'お祭り屋台の スイーツストリート',
    favorite: 'カラフル トッピングスプレー',
    description: '甘いチョココーティングに カラフルなスプレーチョコをまとった 屋台の人気者！',
    getImage: () => createSweetsDataUrl('chocobanana')
  },
  {
    id: 'macaron_rabbit',
    name: 'マカロンうさぎちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'パステルカラーの マカロンハウス',
    favorite: '最高級 ヴァニラクリーム',
    description: 'ピンクと水色のマカロン服を着た もふもふ可愛いウサギスイーツ！サクサク食感♪',
    getImage: () => createSweetsDataUrl('macaron_rabbit')
  },
  {
    id: 'king_parfait',
    name: '特大キングパフェ様',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: '豪華絢爛 パフェキャッスル',
    favorite: '特大 チョコポッキー',
    description: 'プリン・イチゴ・チョコソース・アイスが 山盛り乗った スイーツ界のゴージャスな王様！',
    getImage: () => createSweetsDataUrl('king_parfait')
  },
  {
    id: 'candy_doll',
    name: 'レインボーキャンディドール',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '砂糖菓子の キラキラ宮殿',
    favorite: '虹色の ペロペロキャンディ',
    description: '七色の巨大ペロペロキャンディと 砂糖の結晶ドレスを纏った お菓子王国伝説のお姫様！',
    getImage: () => createSweetsDataUrl('candy_doll')
  },
  {
    id: 'macaron_bear',
    name: '抹茶マカロンくま',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'パステルマカロンタワー',
    favorite: '濃厚抹茶クリームとホワイトチョコ',
    description: 'ぷっくり可愛い抹茶マカロンのサンドを着た ほっこり可愛い和風くまちゃん！',
    getImage: () => createSweetsDataUrl('shortcake')
  },
  {
    id: 'purin_cat',
    name: '特製プリンアラモードねこ',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'レトロフルーティー喫茶',
    favorite: 'カラメルソースと甘いチェリー',
    description: 'チェリーと生クリームをのせたカスタードプリンのドレスを着た 超豪華なねこちゃん！',
    getImage: () => createSweetsDataUrl('king_parfait')
  }
];

// 🐶 もふもふペットキャラクター（愛らしさMAX大人気ペット全6体！）
const PET_CHARACTERS = [
  {
    id: 'shiba_chan',
    name: 'しばいぬちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '陽当たりの良い ドッグラン',
    favorite: '赤唐草の バンダナビスケット',
    description: '赤唐草模様のバンダナを首に巻いた くるんと丸い尻尾がチャームポイントの柴犬ちゃん！',
    getImage: () => createPetDataUrl('shiba')
  },
  {
    id: 'mike_cat',
    name: 'みけねこちゃん',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: 'ぽかぽか えんがわハウス',
    favorite: 'チリンと鳴る 鈴付きサーモン',
    description: 'パステルな3色模様と 鈴付き首輪をつけた 毛づくろいが大好きな可愛い三毛猫ちゃん！',
    getImage: () => createPetDataUrl('mike')
  },
  {
    id: 'hamster_chan',
    name: 'ハムスターちゃん',
    rarity: 'SR',
    rarityLabel: '⭐⭐ スペシャルレア',
    rarityClass: 'rarity-SR',
    habitat: '回し車の ハムハムランド',
    favorite: '香ばしい ひまわりのタネ',
    description: '両頬をひまわりのタネで パンパンに膨らませた コロコロまるくて可愛いハムスターちゃん！',
    getImage: () => createPetDataUrl('hamster')
  },
  {
    id: 'pomeranian_chan',
    name: 'ポメラニアンちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'ふわもふ ポメラニアンサロン',
    favorite: '甘いミルク味の ガムボーキ',
    description: '綿あめみたいにもこもこふわふわな 毛並みと満面笑顔がキュートなポメラニアンちゃん！',
    getImage: () => createPetDataUrl('pomeranian')
  },
  {
    id: 'taremimi_usagi',
    name: 'たれ耳うさぎちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'うさぎのお庭ガーデン',
    favorite: 'フレッシュにんじん',
    description: '長いお耳が垂れた ふわふわのうさぎちゃん！',
    getImage: () => createPetDataUrl('taremimi')
  },
  {
    id: 'king_cat',
    name: 'キングキャット',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: '高級キャットパレス',
    favorite: 'ロイヤルキャットフード',
    description: '黄金の王冠を戴いた 伝説の気高きキングキャット！',
    getImage: () => createPetDataUrl('king_cat')
  },
  {
    id: 'scottish_fold',
    name: 'スコティッシュフォールド',
    rarity: 'R',
    rarityLabel: '⭐ レア',
    rarityClass: 'rarity-R',
    habitat: '日当たりの良いリビング',
    favorite: 'お気に入りの毛糸玉',
    description: 'ちょこんと折れたお耳と まんまる瞳が愛おしい 大人気の癒やし系ねこちゃん！',
    getImage: () => createPetDataUrl('mike')
  },
  {
    id: 'golden_hamster',
    name: 'キンクマハムスター',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'ゴールデンハムハムルーム',
    favorite: '甘いかぼちゃの種',
    description: 'アプリコット色のフワフワな毛並みと ぽてっとしたフォルムが愛らしいキンクマちゃん！',
    getImage: () => createPetDataUrl('hamster')
  },
  {
    id: 'taremimi_usagi',
    name: 'たれ耳うさぎちゃん',
    rarity: 'SSR',
    rarityLabel: '🌟 スーパーレア',
    rarityClass: 'rarity-SSR',
    habitat: 'お花のガーデン うさぎハウス',
    favorite: 'シャキシャキ 人参ジュース',
    description: 'パステルピンクの耳リボンをつけた おめめパッチリな可愛い垂れ耳ホランドロップ！',
    getImage: () => createPetDataUrl('taremimi')
  },
  {
    id: 'golden_cat_king',
    name: 'ゴールデンキャットキング',
    rarity: 'UR',
    rarityLabel: '👑 ウルトラレア (伝説)',
    rarityClass: 'rarity-UR',
    habitat: 'ロイヤルペットの ゴージャスパレス',
    favorite: '極上 最高級まぐろ缶詰',
    description: '黄金のキラキラ輝く毛並みと 宝石王冠を戴いた ペット王国伝説の気品溢れるキング猫！',
    getImage: () => createPetDataUrl('golden_cat_king')
  }
];

// 🎨 アイドルイラスト描画（超絶ハイクオリティ＆極上可愛さ！）
function createIdolDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // ライブステージ背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.5, '#f3e5f5');
  bgGrad.addColorStop(1, '#ce93d8');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 58, 60, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(156, 39, 176, 0.25)'; ctx.fill();

  if (type === 'akuma') {
    // 👿 悪魔ちゃん
    ctx.beginPath();
    ctx.ellipse(cx - 48, cy - 10, 22, 38, -0.4, 0, Math.PI * 2);
    ctx.ellipse(cx + 48, cy - 10, 22, 38, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ff4081'; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 25, cy + 10); ctx.lineTo(cx - 42, cy + 52); ctx.lineTo(cx + 42, cy + 52); ctx.lineTo(cx + 25, cy + 10);
    ctx.fillStyle = '#880e4f'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ff4081'; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 32, cy - 15, 14, 40, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 32, cy - 15, 14, 40, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 15, cy - 26, 16, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 26, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 22, cy - 35); ctx.lineTo(cx - 32, cy - 60); ctx.lineTo(cx - 12, cy - 42);
    ctx.moveTo(cx + 22, cy - 35); ctx.lineTo(cx + 32, cy - 60); ctx.lineTo(cx + 12, cy - 42);
    ctx.fillStyle = '#d50000'; ctx.fill();
    ctx.lineWidth = 2.5; ctx.strokeStyle = '#ff80ab'; ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx - 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ad1457'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 9, cy - 12, 2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2, 0, Math.PI * 2);
    ctx.arc(cx - 13, cy - 8, 1, 0, Math.PI * 2);
    ctx.arc(cx + 9, cy - 8, 1, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 18, cy, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 64, 129, 0.4)'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 2, 4, 0, Math.PI);
    ctx.strokeStyle = '#880e4f'; ctx.lineWidth = 2; ctx.stroke();

  } else if (type === 'tenshi') {
    // 👼 天使ちゃん
    ctx.beginPath();
    ctx.ellipse(cx - 50, cy - 12, 24, 48, -0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 50, cy - 12, 24, 48, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#80d8ff'; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 10); ctx.lineTo(cx - 44, cy + 52); ctx.lineTo(cx + 44, cy + 52); ctx.lineTo(cx + 28, cy + 10);
    ctx.fillStyle = '#e0f7fa'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#80d8ff'; ctx.stroke();

    ctx.beginPath(); ctx.ellipse(cx, cy - 56, 26, 8, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 4.5; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 14, cy - 25, 17, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 25, 17, 0, Math.PI * 2);
    ctx.rect(cx - 28, cy - 15, 10, 30);
    ctx.rect(cx + 18, cy - 15, 10, 30);
    ctx.fillStyle = '#80d8ff'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#0097a7'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 9, cy - 12, 2.2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 18, cy, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(128, 216, 255, 0.5)'; ctx.fill();

  } else if (type === 'yamikawa') {
    // 🖤 やみかわちゃん
    ctx.beginPath();
    ctx.ellipse(cx - 34, cy - 50, 12, 36, -0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 34, cy - 50, 12, 36, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ff4081'; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 25, cy + 10); ctx.lineTo(cx - 40, cy + 52); ctx.lineTo(cx + 40, cy + 52); ctx.lineTo(cx + 25, cy + 10);
    ctx.fillStyle = '#311b92'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 14, cy - 25, 17, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 25, 17, 0, Math.PI * 2);
    ctx.rect(cx - 28, cy - 15, 9, 28);
    ctx.rect(cx + 19, cy - 15, 9, 28);
    ctx.fillStyle = '#b388ff'; ctx.fill();

    ctx.font = '16px sans-serif';
    ctx.fillText('💖', cx - 19, cy - 3);

    ctx.beginPath(); ctx.arc(cx + 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#4a148c'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 13, cy - 12, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath(); ctx.roundRect(cx + 10, cy + 2, 14, 6, 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

  } else if (type === 'gakusei') {
    // 🏫 学生ちゃん
    ctx.beginPath();
    ctx.moveTo(cx - 25, cy + 10); ctx.lineTo(cx - 42, cy + 52); ctx.lineTo(cx + 42, cy + 52); ctx.lineTo(cx + 25, cy + 10);
    ctx.fillStyle = '#1a237e'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#c62828'; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 22, cy + 8); ctx.lineTo(cx, cy + 28); ctx.lineTo(cx + 22, cy + 8);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.font = '18px sans-serif';
    ctx.fillText('🎀', cx - 12, cy + 26);

    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 14, cy - 24, 18, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 24, 18, 0, Math.PI * 2);
    ctx.ellipse(cx - 27, cy - 6, 9, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 27, cy - 6, 9, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#5d4037'; ctx.fill();

    ctx.beginPath(); ctx.rect(cx - 22, cy - 28, 10, 3);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 9, cy - 12, 2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 18, cy, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 138, 128, 0.5)'; ctx.fill();

  } else if (type === 'yumekawa_idol') {
    // 💖 ゆめかわちゃん
    const rGrad = ctx.createLinearGradient(cx - 40, cy - 40, cx - 10, cy + 20);
    rGrad.addColorStop(0, '#ff4081');
    rGrad.addColorStop(0.3, '#ffd700');
    rGrad.addColorStop(0.7, '#00e5ff');
    rGrad.addColorStop(1, '#e040fb');

    ctx.beginPath();
    ctx.ellipse(cx - 38, cy - 15, 15, 45, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 38, cy - 15, 15, 45, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = rGrad; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 10); ctx.lineTo(cx - 45, cy + 52); ctx.lineTo(cx + 45, cy + 52); ctx.lineTo(cx + 28, cy + 10);
    ctx.fillStyle = '#f8bbd0'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ea80fc'; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 14, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 25, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#d500f9'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 9, cy - 12, 2.2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.font = '16px sans-serif';
    ctx.fillText('⭐', cx - 38, cy - 36);
    ctx.fillText('⭐', cx + 24, cy - 36);

  } else if (type === 'lolita_hime') {
    // 🎀 ロリータ姫
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.ellipse(cx - 35, cy - 15 + i * 15, 10, 15, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 35, cy - 15 + i * 15, 10, 15, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd54f'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = '#ffa000'; ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 52, cy + 52); ctx.lineTo(cx + 52, cy + 52); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#ff4081'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx, cy - 28, 46, 26, 0, Math.PI, 0);
    ctx.fillStyle = '#ff1744'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 8, 27, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 11, cy - 8, 5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 8, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c51162'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 9, cy - 10, 2.2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 10, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.font = '20px sans-serif';
    ctx.fillText('🍓', cx - 10, cy - 38);
  }

  return canvas.toDataURL();
}

// 🎨 カッコいいヒーロー＆ドラゴン描画（最高峰ハイクオリティ＆クールデザイン！）
function createCoolDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // クールサイバー＆炎背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#1a237e');
  bgGrad.addColorStop(0.6, '#0d47a1');
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 58, 60, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 229, 255, 0.35)'; ctx.fill();

  if (type === 'knight') {
    // ⚔️ ナイトフェニックス（白銀甲冑・黄金聖剣・燃えるフェニックスの羽）
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy - 10); ctx.lineTo(cx - 65, cy - 50); ctx.lineTo(cx - 35, cy + 10);
    ctx.moveTo(cx + 20, cy - 10); ctx.lineTo(cx + 65, cy - 50); ctx.lineTo(cx + 35, cy + 10);
    ctx.fillStyle = '#ff3d00'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ffea00'; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 25, cy + 10); ctx.lineTo(cx - 38, cy + 52); ctx.lineTo(cx + 38, cy + 52); ctx.lineTo(cx + 25, cy + 10);
    ctx.fillStyle = '#cfd8dc'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#37474f'; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 15, 30, Math.PI, 0);
    ctx.rect(cx - 30, cy - 15, 60, 25);
    ctx.fillStyle = '#eceff1'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#263238'; ctx.stroke();

    ctx.beginPath(); ctx.roundRect(cx - 22, cy - 12, 44, 10, 3);
    ctx.fillStyle = '#00e5ff'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 32, cy + 40); ctx.lineTo(cx + 42, cy - 40); ctx.lineTo(cx + 52, cy + 40);
    ctx.fillStyle = '#ffd700'; ctx.fill();
    ctx.lineWidth = 2.5; ctx.strokeStyle = '#ff6f00'; ctx.stroke();

  } else if (type === 'wolf') {
    // ⚡ サンダーウルフ（稲妻オーラ・青い雷狼）
    ctx.font = '22px sans-serif';
    ctx.fillText('⚡', cx - 60, cy - 30);
    ctx.fillText('⚡', cx + 40, cy - 30);
    ctx.fillText('⚡', cx - 50, cy + 40);

    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 25); ctx.lineTo(cx - 50, cy - 65); ctx.lineTo(cx - 15, cy - 40);
    ctx.moveTo(cx + 35, cy - 25); ctx.lineTo(cx + 50, cy - 65); ctx.lineTo(cx + 15, cy - 40);
    ctx.fillStyle = '#1565c0'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#00e5ff'; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 34, 0, Math.PI * 2);
    ctx.fillStyle = '#1e88e5'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#0d47a1'; ctx.stroke();

    ctx.beginPath(); ctx.ellipse(cx, cy, 14, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#bbdefb'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 14, cy - 15, 6, 8, -0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 14, cy - 15, 6, 8, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700'; ctx.fill();

  } else if (type === 'mecha') {
    // 🦾 メカドラゴン（サイバーメカ・レッドバイザー）
    ctx.beginPath();
    ctx.rect(cx - 60, cy - 30, 30, 50);
    ctx.rect(cx + 30, cy - 30, 30, 50);
    ctx.fillStyle = '#455a64'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#00e5ff'; ctx.stroke();

    ctx.beginPath(); ctx.roundRect(cx - 32, cy - 38, 64, 65, 12);
    ctx.fillStyle = '#78909c'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#263238'; ctx.stroke();

    ctx.beginPath(); ctx.roundRect(cx - 26, cy - 20, 52, 14, 4);
    ctx.fillStyle = '#ff1744'; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    ctx.beginPath(); ctx.rect(cx - 15, cy + 6, 30, 10);
    ctx.fillStyle = '#37474f'; ctx.fill();

  } else if (type === 'ninja') {
    // 影 シャドウニンジャ（紫電手裏剣・漆黒装束）
    ctx.font = '36px sans-serif';
    ctx.fillText('🥷', cx - 18, cy + 5);

    ctx.font = '28px sans-serif';
    ctx.fillText('✦', cx - 55, cy - 30);
    ctx.fillText('✦', cx + 30, cy - 30);

    ctx.beginPath();
    ctx.ellipse(cx - 10, cy - 8, 5, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 8, 5, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#e040fb'; ctx.fill();

  } else if (type === 'tiger') {
    // 🔥 炎帝フレイムタイガー（爆炎タテガミ・虎）
    ctx.beginPath();
    ctx.arc(cx - 25, cy - 25, 22, 0, Math.PI * 2);
    ctx.arc(cx + 25, cy - 25, 22, 0, Math.PI * 2);
    ctx.arc(cx, cy - 38, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#ff3d00'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 32, 0, Math.PI * 2);
    ctx.fillStyle = '#ff9100'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#d50000'; ctx.stroke();

    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 24, cy - 30, 8, 4);
    ctx.fillRect(cx + 16, cy - 30, 8, 4);
    ctx.fillRect(cx - 4, cy - 36, 8, 5);

    ctx.font = '30px sans-serif';
    ctx.fillText('🔥', cx - 15, cy + 42);

  } else if (type === 'bahamut') {
    // 🌌 銀河龍ギャラクシーバハムート（七色オーラ・究極宇宙ドラゴン）
    const gGrad = ctx.createLinearGradient(cx - 50, cy - 50, cx + 50, cy + 50);
    gGrad.addColorStop(0, '#ff4081');
    gGrad.addColorStop(0.3, '#ffd700');
    gGrad.addColorStop(0.7, '#00e5ff');
    gGrad.addColorStop(1, '#e040fb');

    ctx.beginPath();
    ctx.moveTo(cx - 20, cy - 20); ctx.lineTo(cx - 70, cy - 65); ctx.lineTo(cx - 40, cy + 20);
    ctx.moveTo(cx + 20, cy - 20); ctx.lineTo(cx + 70, cy - 65); ctx.lineTo(cx + 40, cy + 20);
    ctx.fillStyle = gGrad; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx, cy - 12, 30, 24, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#311b92'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#ffd700'; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 15, cy - 32); ctx.lineTo(cx - 30, cy - 70); ctx.lineTo(cx - 5, cy - 40);
    ctx.moveTo(cx + 15, cy - 32); ctx.lineTo(cx + 30, cy - 70); ctx.lineTo(cx + 5, cy - 40);
    ctx.fillStyle = '#ffd700'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 12, cy - 16, 5, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 12, cy - 16, 5, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy + 25, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#00e5ff'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  }

  return canvas.toDataURL();
}

// 🎨 宇宙キャラクター描画（ロマンと夢いっぱいのコズミックデザイン！）
function createSpaceDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // 宇宙＆星空背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#311b92');
  bgGrad.addColorStop(0.6, '#1a237e');
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  // 星くず
  ctx.font = '16px sans-serif';
  ctx.fillText('✨', 25, 35);
  ctx.fillText('⭐', 160, 45);
  ctx.fillText('✨', 35, 165);
  ctx.fillText('⭐', 155, 160);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 58, 60, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(128, 216, 255, 0.3)'; ctx.fill();

  if (type === 'astro_cat') {
    // 🐱 うちゅうひこうしねこ（ガラスヘルメット・白宇宙服・ロケット）
    // ロケットタンク
    ctx.beginPath(); ctx.roundRect(cx - 42, cy - 20, 16, 40, 6);
    ctx.roundRect(cx + 26, cy - 20, 16, 40, 6);
    ctx.fillStyle = '#cfd8dc'; ctx.fill();

    // 宇宙服身体
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 10); ctx.lineTo(cx - 38, cy + 52); ctx.lineTo(cx + 38, cy + 52); ctx.lineTo(cx + 28, cy + 10);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#90a4ae'; ctx.stroke();

    // 頭・顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 32, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // 耳
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy - 38); ctx.lineTo(cx - 32, cy - 54); ctx.lineTo(cx - 12, cy - 42);
    ctx.moveTo(cx + 22, cy - 38); ctx.lineTo(cx + 32, cy - 54); ctx.lineTo(cx + 12, cy - 42);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    // ガラスヘルメットバイザー
    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(128, 216, 255, 0.4)'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#00e5ff'; ctx.stroke();

    // ねこお目々
    ctx.beginPath();
    ctx.arc(cx - 12, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#37474f'; ctx.fill();

  } else if (type === 'saturn') {
    // 🪐 どせいさん（パステル土星・光る巨大な輪っか）
    // 土星の輪（後ろ）
    ctx.beginPath(); ctx.ellipse(cx, cy - 5, 75, 22, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.7)'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ffd700'; ctx.stroke();

    // 土星球体
    ctx.beginPath(); ctx.arc(cx, cy - 5, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#ffcc80'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#e65100'; ctx.stroke();

    // お目々＆口
    ctx.beginPath();
    ctx.arc(cx - 15, cy - 12, 5, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 12, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy - 5, 6, 0, Math.PI);
    ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 2.5; ctx.stroke();

  } else if (type === 'comet_dragon') {
    // ☄️ すいせいドラゴン（七色流れ星しっぽ・星流体ドラゴン）
    // 流れ星しっぽ
    const cGrad = ctx.createLinearGradient(cx - 60, cy + 30, cx + 40, cy - 40);
    cGrad.addColorStop(0, '#ff4081');
    cGrad.addColorStop(0.5, '#ffd700');
    cGrad.addColorStop(1, '#00e5ff');

    ctx.beginPath();
    ctx.moveTo(cx + 20, cy - 20); ctx.lineTo(cx - 70, cy + 40); ctx.lineTo(cx - 20, cy + 10);
    ctx.fillStyle = cGrad; ctx.fill();

    // 龍の頭
    ctx.beginPath(); ctx.ellipse(cx + 10, cy - 15, 28, 22, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#80d8ff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#00b0ff'; ctx.stroke();

    // キラキラ目
    ctx.beginPath(); ctx.arc(cx + 2, cy - 18, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 2, cy - 18, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00b0ff'; ctx.fill();

  } else if (type === 'robot') {
    // 🤖 サイバーロボ（ピコピコモニター・アンテナ）
    // アンテナ
    ctx.beginPath(); ctx.moveTo(cx, cy - 35); ctx.lineTo(cx, cy - 55);
    ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 4; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy - 55, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    // ロボ頭
    ctx.beginPath(); ctx.roundRect(cx - 38, cy - 35, 76, 68, 16);
    ctx.fillStyle = '#eceff1'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#546e7a'; ctx.stroke();

    // モニターお顔
    ctx.beginPath(); ctx.roundRect(cx - 30, cy - 25, 60, 42, 10);
    ctx.fillStyle = '#263238'; ctx.fill();

    // ピコピコお目々
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 5, 6, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 5, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#76ff03'; ctx.fill();

  } else if (type === 'ufo_tako') {
    // 🛸 UFOたこちゃん（ピカピカ円盤UFO・パステル宇宙人タコ）
    // UFO下部円盤
    ctx.beginPath(); ctx.ellipse(cx, cy + 15, 65, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#b0bec5'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#37474f'; ctx.stroke();

    // ライトピカピカ
    ctx.fillStyle = '#ffd700';
    ctx.arc(cx - 35, cy + 18, 4, 0, Math.PI * 2); ctx.fill();
    ctx.arc(cx, cy + 22, 4, 0, Math.PI * 2); ctx.fill();
    ctx.arc(cx + 35, cy + 18, 4, 0, Math.PI * 2); ctx.fill();

    // ドームガラス
    ctx.beginPath(); ctx.ellipse(cx, cy - 10, 42, 32, 0, Math.PI, 0);
    ctx.fillStyle = 'rgba(128, 216, 255, 0.5)'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#00e5ff'; ctx.stroke();

    // 宇宙人タコちゃん
    ctx.beginPath(); ctx.arc(cx, cy - 12, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#69f0ae'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 7, cy - 14, 3, 0, Math.PI * 2);
    ctx.arc(cx + 7, cy - 14, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

  } else if (type === 'cosmic_hime') {
    // 🌌 プリンセス・コズミック（星屑ドレス・銀河姫）
    // ドレス
    const sGrad = ctx.createLinearGradient(cx - 30, cy + 10, cx + 30, cy + 50);
    sGrad.addColorStop(0, '#e040fb');
    sGrad.addColorStop(0.5, '#00e5ff');
    sGrad.addColorStop(1, '#ffd700');

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 52, cy + 52); ctx.lineTo(cx + 52, cy + 52); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = sGrad; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // 髪の毛
    ctx.beginPath();
    ctx.arc(cx - 15, cy - 25, 17, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 25, 17, 0, Math.PI * 2);
    ctx.rect(cx - 28, cy - 15, 10, 30);
    ctx.rect(cx + 18, cy - 15, 10, 30);
    ctx.fillStyle = '#ea80fc'; ctx.fill();

    // クラウン（ティアラ）
    ctx.font = '22px sans-serif';
    ctx.fillText('👑', cx - 14, cy - 36);

    // お目々
    ctx.beginPath();
    ctx.arc(cx - 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00e5ff'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 9, cy - 12, 2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
  }

  return canvas.toDataURL();
}

// 🎨 レトロゲーム＆ピクセル擬人化描画（ユーザー提案の神キャラクター全6体！）
function createPixelDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // 8bitドット格子背景
  ctx.fillStyle = '#1b5e20';
  ctx.fillRect(0, 0, 200, 200);

  // ピクセルグリッド（レトロファミコン風）
  ctx.fillStyle = '#2e7d32';
  for (let x = 0; x < 200; x += 16) {
    for (let y = 0; y < 200; y += 16) {
      if ((x + y) % 32 === 0) {
        ctx.fillRect(x, y, 16, 16);
      }
    }
  }

  const cx = 100, cy = 110;

  // ドット影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(cx - 50, cy + 48, 100, 12);

  if (type === 'game_ki_chan') {
    // 🎮 ゲームきちゃん（ファミコン風ボディ・十字キーリボン・画面のお顔）
    ctx.fillStyle = '#eceff1'; ctx.fillRect(cx - 40, cy - 35, 80, 75);
    ctx.lineWidth = 4; ctx.strokeStyle = '#263238'; ctx.strokeRect(cx - 40, cy - 35, 80, 75);

    // 赤いライン
    ctx.fillStyle = '#b71c1c'; ctx.fillRect(cx - 40, cy - 35, 80, 14);

    // 液晶画面
    ctx.fillStyle = '#76ff03'; ctx.fillRect(cx - 28, cy - 12, 56, 32);
    ctx.lineWidth = 2.5; ctx.strokeStyle = '#1b5e20'; ctx.strokeRect(cx - 28, cy - 12, 56, 32);

    // 画面のお顔
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 16, cy - 4, 6, 6);
    ctx.fillRect(cx + 10, cy - 4, 6, 6);
    ctx.fillRect(cx - 8, cy + 8, 16, 4);

    // 十字キーリボン（頭の上）
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 20, cy - 54, 12, 16);
    ctx.fillRect(cx - 24, cy - 50, 20, 8);
    ctx.fillStyle = '#ff1744';
    ctx.fillRect(cx + 10, cy - 50, 8, 8);
    ctx.fillRect(cx + 20, cy - 50, 8, 8);

  } else if (type === 'dot_slime_chan') {
    // 🟩 ドットスライムちゃん（8bitピクセルグリッドの緑スライム）
    const pixelSize = 8;
    const slimeGrid = [
      "    XXXX    ",
      "   XXXXXX   ",
      "  XXXXXXXX  ",
      " XXXXXXXXXX ",
      "XXXXXXXXXXXX",
      "XXXXXXXXXXXX",
      " XXXXXXXXXX "
    ];
    ctx.fillStyle = '#76ff03';
    slimeGrid.forEach((row, rIdx) => {
      for (let cIdx = 0; cIdx < row.length; cIdx++) {
        if (row[cIdx] === 'X') {
          ctx.fillRect(cx - 48 + cIdx * pixelSize, cy - 40 + rIdx * pixelSize, pixelSize, pixelSize);
        }
      }
    });

    // スライムのドットお目々＆ほっぺ
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 20, cy - 12, 8, 8);
    ctx.fillRect(cx + 12, cy - 12, 8, 8);
    ctx.fillStyle = '#ff4081';
    ctx.fillRect(cx - 30, cy - 4, 8, 6);
    ctx.fillRect(cx + 22, cy - 4, 8, 6);

  } else if (type === 'oshiro_chan') {
    // 🏰 おしろちゃん（ドット城壁・とんがり屋根リボン）
    ctx.fillStyle = '#b0bec5'; ctx.fillRect(cx - 40, cy - 20, 80, 60);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#37474f'; ctx.strokeRect(cx - 40, cy - 20, 80, 60);

    // 城の凸凹
    ctx.fillRect(cx - 40, cy - 35, 18, 16);
    ctx.fillRect(cx - 9, cy - 35, 18, 16);
    ctx.fillRect(cx + 22, cy - 35, 18, 16);

    // 門
    ctx.fillStyle = '#37474f'; ctx.fillRect(cx - 14, cy + 10, 28, 30);

    // 屋根の上の王国フラッグ
    ctx.font = '24px sans-serif';
    ctx.fillText('🚩', cx - 12, cy - 45);

    // おしろのお顔
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 22, cy - 5, 8, 8);
    ctx.fillRect(cx + 14, cy - 5, 8, 8);

  } else if (type === 'pasokon_chan') {
    // 💻 パソコンちゃん（CRTモニターお顔・キーボード足）
    ctx.fillStyle = '#d7ccc8'; ctx.fillRect(cx - 42, cy - 38, 84, 65);
    ctx.lineWidth = 4; ctx.strokeStyle = '#4e342e'; ctx.strokeRect(cx - 42, cy - 38, 84, 65);

    // 画面
    ctx.fillStyle = '#000000'; ctx.fillRect(cx - 32, cy - 28, 64, 45);

    // モニターお顔（緑のDOS文字風）
    ctx.fillStyle = '#64ffda';
    ctx.fillRect(cx - 18, cy - 15, 8, 8);
    ctx.fillRect(cx + 10, cy - 15, 8, 8);
    ctx.fillRect(cx - 10, cy + 2, 20, 4);

    // キーボード足
    ctx.fillStyle = '#8d6e63'; ctx.fillRect(cx - 45, cy + 32, 90, 16);
    ctx.fillStyle = '#ffffff';
    for (let k = -40; k < 40; k += 10) {
      ctx.fillRect(cx + k, cy + 36, 6, 8);
    }

  } else if (type === 'dot_yusha') {
    // 🗡️ ドットゆうしゃちゃん（赤ドット甲冑・ドット剣＆盾）
    ctx.fillStyle = '#ff1744'; ctx.fillRect(cx - 22, cy - 10, 44, 45);
    ctx.lineWidth = 3; ctx.strokeStyle = '#b71c1c'; ctx.strokeRect(cx - 22, cy - 10, 44, 45);

    // 勇者の金髪ドット
    ctx.fillStyle = '#ffd700'; ctx.fillRect(cx - 25, cy - 38, 50, 22);

    // 顔
    ctx.fillStyle = '#ffe0b2'; ctx.fillRect(cx - 18, cy - 25, 36, 18);
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 10, cy - 20, 5, 5);
    ctx.fillRect(cx + 5, cy - 20, 5, 5);

    // 剣
    ctx.fillStyle = '#00e5ff'; ctx.fillRect(cx + 26, cy - 30, 8, 45);
    ctx.fillStyle = '#ffd700'; ctx.fillRect(cx + 22, cy + 5, 16, 6);

    // 盾
    ctx.fillStyle = '#304ffe'; ctx.fillRect(cx - 36, cy, 14, 25);

  } else if (type === 'dot_dragon_king') {
    // 🐲 8bitドットキングドラゴン（ドット翼・ドット炎）
    // ドット大きな翼
    ctx.fillStyle = '#d50000';
    ctx.fillRect(cx - 75, cy - 40, 40, 50);
    ctx.fillRect(cx + 35, cy - 40, 40, 50);

    // ドラゴン頭
    ctx.fillStyle = '#263238'; ctx.fillRect(cx - 28, cy - 30, 56, 50);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ffd700'; ctx.strokeRect(cx - 28, cy - 30, 56, 50);

    // 赤いお目々
    ctx.fillStyle = '#ff1744';
    ctx.fillRect(cx - 18, cy - 18, 10, 10);
    ctx.fillRect(cx + 8, cy - 18, 10, 10);

    // ドットの口からの炎
    ctx.fillStyle = '#ff6d00'; ctx.fillRect(cx - 15, cy + 24, 30, 25);
    ctx.fillStyle = '#ffab00'; ctx.fillRect(cx - 8, cy + 30, 16, 15);
  }

  return canvas.toDataURL();
}

// 🎨 妖怪・オバケキャラクター描画（可愛くてちょっぴり怪しい和風おばけ！）
function createYokaiDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // 怪しい和風夜空背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#4a148c');
  bgGrad.addColorStop(0.6, '#311b92');
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  // 火の玉オーラ
  ctx.font = '20px sans-serif';
  ctx.fillText('🔥', 25, 40);
  ctx.fillText('🔥', 160, 45);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 58, 55, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(185, 246, 202, 0.3)'; ctx.fill();

  if (type === 'obake') {
    // 👻 しろオバケちゃん（シーツフワフワ・チョロ舌・ヒトダマ）
    ctx.beginPath();
    ctx.arc(cx, cy - 15, 36, Math.PI, 0);
    ctx.quadraticCurveTo(cx + 36, cy + 30, cx + 25, cy + 50);
    ctx.quadraticCurveTo(cx, cy + 30, cx - 25, cy + 50);
    ctx.quadraticCurveTo(cx - 36, cy + 30, cx - 36, cy - 15);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#b0bec5'; ctx.stroke();

    // お目々＆口＆チョロ舌
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 16, 5, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 16, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 5, 6, 0, Math.PI);
    ctx.fillStyle = '#ff1744'; ctx.fill();

  } else if (type === 'kappa') {
    // 🥒 カッパちゃん（頭のお皿・甲羅・きゅうり）
    // 甲羅（後ろ）
    ctx.beginPath(); ctx.ellipse(cx, cy + 10, 42, 38, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#2e7d32'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 34, 0, Math.PI * 2);
    ctx.fillStyle = '#a5d6a7'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#2e7d32'; ctx.stroke();

    // 頭のお皿
    ctx.beginPath(); ctx.ellipse(cx, cy - 42, 25, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff59d'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#fbc02d'; ctx.stroke();

    // お目々＆くちばし
    ctx.beginPath();
    ctx.arc(cx - 12, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1b5e20'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx, cy - 2, 9, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffb74d'; ctx.fill();

    // きゅうり
    ctx.font = '22px sans-serif';
    ctx.fillText('🥒', cx + 22, cy + 18);

  } else if (type === 'hitotsume') {
    // 👁️ ひとつめ小僧ちゃん（一ツ目・てへぺろ）
    ctx.beginPath(); ctx.arc(cx, cy - 10, 35, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#e65100'; ctx.stroke();

    // 大きなひとつの目
    ctx.beginPath(); ctx.arc(cx, cy - 16, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 2.5; ctx.strokeStyle = '#e65100'; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy - 16, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#311b92'; ctx.fill();

    // にっこり口
    ctx.beginPath(); ctx.arc(cx, cy + 6, 8, 0, Math.PI);
    ctx.fillStyle = '#ff1744'; ctx.fill();

  } else if (type === 'yukionna') {
    // ❄️ ゆきおんなちゃん（白着物・水色髪・氷結晶かんざし）
    // 着物
    ctx.beginPath();
    ctx.moveTo(cx - 26, cy + 10); ctx.lineTo(cx - 45, cy + 52); ctx.lineTo(cx + 45, cy + 52); ctx.lineTo(cx + 26, cy + 10);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#80d8ff'; ctx.stroke();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#fff9c4'; ctx.fill();

    // 髪の毛（氷水色）
    ctx.beginPath();
    ctx.arc(cx - 15, cy - 25, 17, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 25, 17, 0, Math.PI * 2);
    ctx.rect(cx - 28, cy - 15, 10, 30);
    ctx.rect(cx + 18, cy - 15, 10, 30);
    ctx.fillStyle = '#80d8ff'; ctx.fill();

    // 氷結晶かんざし
    ctx.font = '22px sans-serif';
    ctx.fillText('❄️', cx + 18, cy - 35);

    // 目
    ctx.beginPath();
    ctx.arc(cx - 11, cy - 10, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 10, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00b0ff'; ctx.fill();

  } else if (type === 'kyubi') {
    // 🦊 きゅうびのきつね（9本ゴールド尾っぽ・キツネ耳）
    // 9本尾っぽ
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath();
      ctx.ellipse(cx + i * 12, cy + 10, 10, 35, i * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd700'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = '#ff6f00'; ctx.stroke();
    }

    // きつね顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e1'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ffa000'; ctx.stroke();

    // キツネ耳
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy - 30); ctx.lineTo(cx - 38, cy - 60); ctx.lineTo(cx - 8, cy - 35);
    ctx.moveTo(cx + 20, cy - 30); ctx.lineTo(cx + 38, cy - 60); ctx.lineTo(cx + 8, cy - 35);
    ctx.fillStyle = '#ff6f00'; ctx.fill();

    // きつね目
    ctx.beginPath();
    ctx.ellipse(cx - 12, cy - 12, 6, 3, -0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 12, cy - 12, 6, 3, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#d50000'; ctx.fill();

  } else if (type === 'akaoni_king') {
    // 👹 伝説の鬼王・あかおに様（黄金ツノ・金棒・虎柄パンツ）
    // 虎柄パンツ
    ctx.fillStyle = '#ffd700'; ctx.fillRect(cx - 28, cy + 25, 56, 25);
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 20, cy + 30, 10, 4);
    ctx.fillRect(cx + 10, cy + 38, 10, 4);

    // 鬼の顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 32, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#b71c1c'; ctx.stroke();

    // 黄金ふたつツノ
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 32); ctx.lineTo(cx - 28, cy - 62); ctx.lineTo(cx - 4, cy - 38);
    ctx.moveTo(cx + 16, cy - 32); ctx.lineTo(cx + 28, cy - 62); ctx.lineTo(cx + 4, cy - 38);
    ctx.fillStyle = '#ffd700'; ctx.fill();

    // 金棒
    ctx.fillStyle = '#37474f'; ctx.fillRect(cx + 30, cy - 30, 12, 70);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(cx + 28, cy - 20, 16, 4);
  }

  return canvas.toDataURL();
}

// 🎨 恐竜キャラクター描画（太古の冒険ジュラシックデザイン！）
function createDinoDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // ジャングルアドベンチャー背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#2e7d32');
  bgGrad.addColorStop(0.6, '#1b5e20');
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  // 葉っぱ飾り
  ctx.font = '22px sans-serif';
  ctx.fillText('🌿', 20, 35);
  ctx.fillText('🌿', 160, 40);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 58, 60, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; ctx.fill();

  if (type === 'tyranno') {
    // 🦖 ティラノちゃん（ディープグリーン・大きな口＆歯・小手）
    // しっぽ
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy + 20); ctx.lineTo(cx - 65, cy + 45); ctx.lineTo(cx - 20, cy + 40);
    ctx.fillStyle = '#43a047'; ctx.fill();

    // 胴体
    ctx.beginPath(); ctx.ellipse(cx, cy + 20, 35, 30, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#43a047'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#1b5e20'; ctx.stroke();

    // 頭
    ctx.beginPath(); ctx.ellipse(cx + 10, cy - 18, 38, 28, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#43a047'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#1b5e20'; ctx.stroke();

    // 目＆ギザギザ歯
    ctx.beginPath(); ctx.arc(cx + 16, cy - 25, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(cx + 15 + i * 7, cy - 6, 4, 6);
    }

  } else if (type === 'tricera') {
    // 🌿 トリケラちゃん（オレンジ・3本ツノ・大きなフリル冠）
    // フリル冠（後ろ）
    ctx.beginPath(); ctx.arc(cx, cy - 15, 48, Math.PI * 0.8, Math.PI * 0.2);
    ctx.fillStyle = '#fb8c00'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#e65100'; ctx.stroke();

    // 胴体
    ctx.beginPath(); ctx.ellipse(cx, cy + 18, 42, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffa726'; ctx.fill();

    // 頭
    ctx.beginPath(); ctx.arc(cx, cy - 10, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#ffa726'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#e65100'; ctx.stroke();

    // 3本のツノ
    ctx.fillStyle = '#fff59d';
    ctx.beginPath(); ctx.moveTo(cx - 15, cy - 25); ctx.lineTo(cx - 28, cy - 52); ctx.lineTo(cx - 5, cy - 30); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + 15, cy - 25); ctx.lineTo(cx + 28, cy - 52); ctx.lineTo(cx + 5, cy - 30); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy - 24); ctx.lineTo(cx + 6, cy - 8); ctx.fill();

    // 目
    ctx.beginPath();
    ctx.arc(cx - 10, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 10, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

  } else if (type === 'ptera') {
    // 翼 プテラちゃん（パープル・大空をパタパタ翼・トサカ）
    // 大きな翼
    ctx.beginPath();
    ctx.moveTo(cx, cy); ctx.lineTo(cx - 75, cy - 35); ctx.lineTo(cx - 35, cy + 25);
    ctx.moveTo(cx, cy); ctx.lineTo(cx + 75, cy - 35); ctx.lineTo(cx + 35, cy + 25);
    ctx.fillStyle = '#ab47bc'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#4a148c'; ctx.stroke();

    // 頭＆トサカ
    ctx.beginPath(); ctx.ellipse(cx, cy - 15, 20, 16, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ba68c8'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - 25); ctx.lineTo(cx - 35, cy - 55); ctx.lineTo(cx + 8, cy - 25);
    ctx.fillStyle = '#ab47bc'; ctx.fill();

    // くちばし
    ctx.beginPath(); ctx.moveTo(cx - 10, cy - 10); ctx.lineTo(cx, cy + 18); ctx.lineTo(cx + 10, cy - 10);
    ctx.fillStyle = '#ffd54f'; ctx.fill();

  } else if (type === 'brachio') {
    // 🦕 ブラキオちゃん（長い首・水色・おっとり顔）
    // 胴体
    ctx.beginPath(); ctx.ellipse(cx - 10, cy + 22, 45, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#4fc3f7'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#0288d1'; ctx.stroke();

    // 長い首
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy + 20); ctx.lineTo(cx + 35, cy - 45); ctx.lineTo(cx + 18, cy - 45); ctx.lineTo(cx - 5, cy + 20);
    ctx.fillStyle = '#4fc3f7'; ctx.fill();

    // 頭
    ctx.beginPath(); ctx.ellipse(cx + 26, cy - 45, 18, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#4fc3f7'; ctx.fill();

    // にっこり目
    ctx.beginPath(); ctx.arc(cx + 26, cy - 47, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#01579b'; ctx.fill();

  } else if (type === 'ankylo') {
    // 🛡️ アンキロちゃん（ブラウン・トゲトゲ甲冑・ハンマー尾）
    // 胴体
    ctx.beginPath(); ctx.ellipse(cx, cy + 10, 48, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#8d6e63'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#3e2723'; ctx.stroke();

    // トゲトゲ甲冑
    ctx.fillStyle = '#ffd700';
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath(); ctx.arc(cx + i * 12, cy, 5, 0, Math.PI * 2); ctx.fill();
    }

    // ハンマーしっぽ
    ctx.beginPath(); ctx.moveTo(cx - 45, cy + 10); ctx.lineTo(cx - 70, cy + 15);
    ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 6; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx - 70, cy + 15, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

  } else if (type === 'spino_king') {
    // 🌈 レインボースピノキング（七色レインボーひれ・伝説恐竜）
    // 七色背びれ
    const rGrad = ctx.createLinearGradient(cx - 45, cy - 55, cx + 45, cy - 10);
    rGrad.addColorStop(0, '#ff4081');
    rGrad.addColorStop(0.2, '#ff9100');
    rGrad.addColorStop(0.4, '#ffd700');
    rGrad.addColorStop(0.6, '#00e676');
    rGrad.addColorStop(0.8, '#00e5ff');
    rGrad.addColorStop(1, '#d500f9');

    ctx.beginPath();
    ctx.ellipse(cx, cy - 15, 48, 38, 0, Math.PI, 0);
    ctx.fillStyle = rGrad; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    // 恐竜頭・ボディ
    ctx.beginPath(); ctx.ellipse(cx, cy + 15, 42, 26, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1a237e'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ffd700'; ctx.stroke();

    // 目
    ctx.beginPath(); ctx.arc(cx + 20, cy + 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();
  }

  return canvas.toDataURL();
}

// 🎨 はたらくくるまキャラクター描画（カッコ良くて頼もしいヒーロー車！）
function createCarDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // シティドライブ背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#f57f17');
  bgGrad.addColorStop(0.6, '#e65100');
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  // 道路ライン
  ctx.fillStyle = '#424242'; ctx.fillRect(0, 140, 200, 60);
  ctx.fillStyle = '#ffffff';
  for (let r = 10; r < 200; r += 40) {
    ctx.fillRect(r, 168, 20, 4);
  }

  const cx = 100, cy = 105;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 45, 60, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; ctx.fill();

  if (type === 'patrol') {
    // 🚓 パトカーちゃん（白黒ボディ・赤色灯・目）
    ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 45, cy - 15, 90, 45);
    ctx.fillStyle = '#212121'; ctx.fillRect(cx - 45, cy + 10, 90, 20);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#212121'; ctx.strokeRect(cx - 45, cy - 15, 90, 45);

    // 屋根赤色灯
    ctx.beginPath(); ctx.ellipse(cx, cy - 20, 12, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();

    // 窓お顔
    ctx.fillStyle = '#80d8ff'; ctx.fillRect(cx - 28, cy - 10, 56, 18);
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 15, cy - 5, 5, 5); ctx.fillRect(cx + 10, cy - 5, 5, 5);

    // タイヤ
    ctx.fillStyle = '#212121';
    ctx.beginPath(); ctx.arc(cx - 28, cy + 30, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 28, cy + 30, 12, 0, Math.PI * 2); ctx.fill();

  } else if (type === 'ambulance') {
    // 🚑 きゅうきゅうしゃちゃん（白ボディ・赤十字・笑顔）
    ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 48, cy - 20, 96, 50);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#e0e0e0'; ctx.strokeRect(cx - 48, cy - 20, 96, 50);

    // 赤ライン
    ctx.fillStyle = '#ff1744'; ctx.fillRect(cx - 48, cy + 2, 96, 8);

    // 赤十字マーク
    ctx.fillRect(cx + 15, cy - 12, 14, 4);
    ctx.fillRect(cx + 20, cy - 17, 4, 14);

    // 窓お顔
    ctx.fillStyle = '#80d8ff'; ctx.fillRect(cx - 36, cy - 15, 42, 16);
    ctx.fillStyle = '#212121';
    ctx.beginPath(); ctx.arc(cx - 25, cy - 7, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 10, cy - 7, 3, 0, Math.PI * 2); ctx.fill();

    // タイヤ
    ctx.fillStyle = '#212121';
    ctx.beginPath(); ctx.arc(cx - 28, cy + 30, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 28, cy + 30, 12, 0, Math.PI * 2); ctx.fill();

  } else if (type === 'fire') {
    // 🚒 しょうぼうしゃちゃん（真っ赤ボディ・伸びるはしご）
    ctx.fillStyle = '#d50000'; ctx.fillRect(cx - 48, cy - 15, 96, 45);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#b71c1c'; ctx.strokeRect(cx - 48, cy - 15, 96, 45);

    // 屋根の上の伸長はしご
    ctx.fillStyle = '#b0bec5'; ctx.fillRect(cx - 40, cy - 32, 70, 12);
    ctx.lineWidth = 2; ctx.strokeStyle = '#37474f'; ctx.strokeRect(cx - 40, cy - 32, 70, 12);

    // 窓顔
    ctx.fillStyle = '#80d8ff'; ctx.fillRect(cx - 38, cy - 10, 36, 16);
    ctx.fillStyle = '#212121';
    ctx.fillRect(cx - 28, cy - 5, 5, 5); ctx.fillRect(cx - 15, cy - 5, 5, 5);

    // タイヤ
    ctx.fillStyle = '#212121';
    ctx.beginPath(); ctx.arc(cx - 28, cy + 30, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 28, cy + 30, 12, 0, Math.PI * 2); ctx.fill();

  } else if (type === 'shovel') {
    // 🚜 ショベルカーくん（黄色キャビン・パワーアームバケット）
    // キャビン
    ctx.fillStyle = '#ffb300'; ctx.fillRect(cx - 30, cy - 25, 45, 50);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#e65100'; ctx.strokeRect(cx - 30, cy - 25, 45, 50);

    // パワーアーム
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy); ctx.lineTo(cx + 45, cy - 40); ctx.lineTo(cx + 65, cy - 15);
    ctx.strokeStyle = '#ff8f00'; ctx.lineWidth = 8; ctx.stroke();

    // バケット
    ctx.fillStyle = '#37474f'; ctx.fillRect(cx + 55, cy - 15, 22, 22);

    // キャタピラタイヤ
    ctx.fillStyle = '#212121'; ctx.fillRect(cx - 40, cy + 20, 65, 16);

  } else if (type === 'dump') {
    // 🚚 ダンプカーくん（オレンジ車体・ななめ持ち上がる青荷台）
    // 斜め荷台
    ctx.save();
    ctx.translate(cx - 15, cy - 10);
    ctx.rotate(-0.25);
    ctx.fillStyle = '#0288d1'; ctx.fillRect(-30, -25, 60, 35);
    ctx.restore();

    // キャビン
    ctx.fillStyle = '#ff6d00'; ctx.fillRect(cx + 10, cy - 10, 35, 40);

    // タイヤ
    ctx.fillStyle = '#212121';
    ctx.beginPath(); ctx.arc(cx - 30, cy + 30, 13, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 25, cy + 30, 13, 0, Math.PI * 2); ctx.fill();

  } else if (type === 'rocket_transporter') {
    // 🚀 ロケットトランスポーター（16輪搬送車・白赤ドデカ宇宙ロケット）
    // 巨大宇宙ロケット
    ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 65, cy - 38, 120, 22);
    ctx.lineWidth = 3; ctx.strokeStyle = '#cfd8dc'; ctx.strokeRect(cx - 65, cy - 38, 120, 22);
    ctx.fillStyle = '#ff1744';
    ctx.beginPath(); ctx.moveTo(cx + 55, cy - 38); ctx.lineTo(cx + 78, cy - 27); ctx.lineTo(cx + 55, cy - 16); ctx.fill();

    // 搬送台車ボディ
    ctx.fillStyle = '#37474f'; ctx.fillRect(cx - 70, cy - 12, 140, 30);

    // たくさんのタイヤ
    ctx.fillStyle = '#212121';
    for (let t = -60; t <= 60; t += 20) {
      ctx.beginPath(); ctx.arc(cx + t, cy + 22, 9, 0, Math.PI * 2); ctx.fill();
    }
  }

  return canvas.toDataURL();
}

// 🎨 スイーツ・お菓子キャラクター描画（超絶甘くて可愛いパステルお菓子ワールド！）
function createSweetsDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // 甘いキャンディ背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#ff80ab');
  bgGrad.addColorStop(0.6, '#ff4081');
  bgGrad.addColorStop(1, '#880e4f');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  // キラキラシュガー
  ctx.font = '22px sans-serif';
  ctx.fillText('✨', 20, 35);
  ctx.fillText('🍬', 160, 40);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 55, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; ctx.fill();

  if (type === 'shortcake') {
    // 🍰 ショートケーキちゃん（三角形スポンジ・イチゴ・クリームリボン）
    ctx.beginPath();
    ctx.moveTo(cx, cy - 45); ctx.lineTo(cx + 50, cy + 30); ctx.lineTo(cx - 50, cy + 30);
    ctx.closePath();
    ctx.fillStyle = '#fff9c4'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#fbc02d'; ctx.stroke();

    // クリーム層
    ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 45, cy + 5, 90, 12);

    // イチゴの頭
    ctx.beginPath(); ctx.arc(cx, cy - 45, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();
    ctx.font = '16px sans-serif'; ctx.fillText('🍓', cx - 12, cy - 38);

    // 顔
    ctx.beginPath();
    ctx.arc(cx - 14, cy + 18, 4, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy + 18, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4e342e'; ctx.fill();

  } else if (type === 'purin') {
    // 🍮 ぷるぷるプリンちゃん（カラメル帽子・台形プリン・サクランボ）
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 25); ctx.lineTo(cx + 30, cy - 25); ctx.lineTo(cx + 46, cy + 35); ctx.lineTo(cx - 46, cy + 35);
    ctx.closePath();
    ctx.fillStyle = '#fff176'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#fbc02d'; ctx.stroke();

    // とろ〜りカラメル帽子
    ctx.beginPath();
    ctx.ellipse(cx, cy - 25, 32, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#5d4037'; ctx.fill();

    // サクランボ
    ctx.beginPath(); ctx.arc(cx, cy - 45, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();

    // 目
    ctx.beginPath();
    ctx.arc(cx - 15, cy + 5, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy + 5, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

  } else if (type === 'chocobanana') {
    // 🍌 チョコバナナくん（黄色バナナ・チョコがけ・トッピングスプレー）
    // バナナ
    ctx.beginPath();
    ctx.ellipse(cx, cy - 10, 22, 50, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff59d'; ctx.fill();

    // チョコがけ上半分
    ctx.beginPath();
    ctx.ellipse(cx - 5, cy - 25, 24, 30, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#4e342e'; ctx.fill();

    // トッピングスプレー
    ctx.fillStyle = '#ff4081'; ctx.fillRect(cx - 10, cy - 40, 6, 3);
    ctx.fillStyle = '#76ff03'; ctx.fillRect(cx + 5, cy - 30, 6, 3);
    ctx.fillStyle = '#00e5ff'; ctx.fillRect(cx - 15, cy - 20, 6, 3);

    // 持ち手棒
    ctx.fillStyle = '#d7ccc8'; ctx.fillRect(cx - 4, cy + 38, 8, 30);

  } else if (type === 'macaron_rabbit') {
    // 🐰 マカロンうさぎちゃん（ピンク＆水色マカロン・ウサギ耳）
    // ウサギ耳
    ctx.beginPath();
    ctx.ellipse(cx - 20, cy - 45, 10, 26, -0.15, 0, Math.PI * 2);
    ctx.ellipse(cx + 20, cy - 45, 10, 26, 0.15, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    // 上マカロン
    ctx.beginPath(); ctx.ellipse(cx, cy - 15, 45, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#ff4081'; ctx.stroke();

    // クリーム層
    ctx.beginPath(); ctx.ellipse(cx, cy, 42, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // 下マカロン
    ctx.beginPath(); ctx.ellipse(cx, cy + 15, 45, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#80d8ff'; ctx.fill();

    // にっこり目
    ctx.beginPath();
    ctx.arc(cx - 15, cy - 15, 4, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 15, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#880e4f'; ctx.fill();

  } else if (type === 'king_parfait') {
    // 🍨 特大キングパフェ様（パフェグラス・生クリーム盛り・プリン・ポッキー）
    // グラス
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 20); ctx.lineTo(cx + 35, cy - 20); ctx.lineTo(cx + 15, cy + 40); ctx.lineTo(cx - 15, cy + 40);
    ctx.closePath();
    ctx.fillStyle = 'rgba(224, 247, 250, 0.8)'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#80deea'; ctx.stroke();

    // 盛り盛りトッピング
    ctx.font = '32px sans-serif';
    ctx.fillText('🍮', cx - 25, cy - 25);
    ctx.fillText('🍓', cx, cy - 35);
    ctx.fillText('🍨', cx - 35, cy - 15);

    // ポッキー
    ctx.fillStyle = '#5d4037'; ctx.fillRect(cx + 15, cy - 55, 6, 45);

  } else if (type === 'candy_doll') {
    // 👑 レインボーキャンディドール（巨大ぐるぐるロリポップ・伝説ドール）
    // 七色ぐるぐるキャンディ
    const rGrad = ctx.createRadialGradient(cx, cy - 25, 5, cx, cy - 25, 40);
    rGrad.addColorStop(0, '#ff4081');
    rGrad.addColorStop(0.3, '#ffd700');
    rGrad.addColorStop(0.6, '#76ff03');
    rGrad.addColorStop(1, '#00e5ff');

    ctx.beginPath(); ctx.arc(cx, cy - 25, 40, 0, Math.PI * 2);
    ctx.fillStyle = rGrad; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    // キャンディ棒
    ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 4, cy + 15, 8, 45);

    // 王冠
    ctx.font = '24px sans-serif'; ctx.fillText('👑', cx - 14, cy - 55);
  }

  return canvas.toDataURL();
}

// 🎨 もふもふペットキャラクター描画（超絶癒し可愛いペットワールド！）
function createPetDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // パステルぽかぽか背景
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#ffe0b2');
  bgGrad.addColorStop(0.6, '#ffa726');
  bgGrad.addColorStop(1, '#6d4c41');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  // 肉球マーク
  ctx.font = '22px sans-serif';
  ctx.fillText('🐾', 20, 35);
  ctx.fillText('🐾', 160, 40);

  const cx = 100, cy = 110;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 55, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'; ctx.fill();

  if (type === 'shiba') {
    // 🐶 しばいぬちゃん（茶色丸顔・ピンと立った三角耳・白口・赤唐草バンダナ）
    // 耳
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 15); ctx.lineTo(cx - 48, cy - 55); ctx.lineTo(cx - 10, cy - 35);
    ctx.moveTo(cx + 35, cy - 15); ctx.lineTo(cx + 48, cy - 55); ctx.lineTo(cx + 10, cy - 35);
    ctx.fillStyle = '#fb8c00'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 5, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#fb8c00'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#e65100'; ctx.stroke();

    // 白い口元
    ctx.beginPath(); ctx.ellipse(cx, cy + 10, 22, 16, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // 鼻
    ctx.beginPath(); ctx.arc(cx, cy + 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    // 目＆白眉毛
    ctx.beginPath();
    ctx.arc(cx - 16, cy - 10, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 16, cy - 10, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 16, cy - 22, 4, 0, Math.PI * 2);
    ctx.arc(cx + 16, cy - 22, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // 赤唐草バンダナ
    ctx.beginPath(); ctx.arc(cx, cy + 32, 25, 0, Math.PI);
    ctx.fillStyle = '#d50000'; ctx.fill();

  } else if (type === 'mike') {
    // 🐱 みけねこちゃん（3色ブチ柄・猫耳・鈴首輪）
    // 猫耳
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 25); ctx.lineTo(cx - 42, cy - 58); ctx.lineTo(cx - 8, cy - 38);
    ctx.moveTo(cx + 30, cy - 25); ctx.lineTo(cx + 42, cy - 58); ctx.lineTo(cx + 8, cy - 38);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#e0e0e0'; ctx.stroke();

    // 顔ボディ
    ctx.beginPath(); ctx.arc(cx, cy - 10, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#bdbdbd'; ctx.stroke();

    // ブチ柄（黒＆茶）
    ctx.beginPath(); ctx.arc(cx - 20, cy - 25, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#fb8c00'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 20, cy - 25, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#424242'; ctx.fill();

    // 目＆ひげ
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 10, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 10, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#43a047'; ctx.fill();

    // 鈴首輪
    ctx.fillStyle = '#ff1744'; ctx.fillRect(cx - 25, cy + 24, 50, 6);
    ctx.beginPath(); ctx.arc(cx, cy + 27, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700'; ctx.fill();

  } else if (type === 'hamster') {
    // 🐹 ハムスターちゃん（ぷっくり両頬・ひまわりの種）
    // ぷっくり頬っぺ
    ctx.beginPath();
    ctx.arc(cx - 20, cy + 5, 25, 0, Math.PI * 2);
    ctx.arc(cx + 20, cy + 5, 25, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e1'; ctx.fill();

    // 頭ボディ
    ctx.beginPath(); ctx.arc(cx, cy - 12, 35, 0, Math.PI * 2);
    ctx.fillStyle = '#ffa726'; ctx.fill();

    // つぶらなお目々
    ctx.beginPath();
    ctx.arc(cx - 15, cy - 15, 5, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 15, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    // ひまわりの種
    ctx.font = '22px sans-serif'; ctx.fillText('🌻', cx - 11, cy + 25);

  } else if (type === 'pomeranian') {
    // 🐩 ポメラニアンちゃん（綿あめモコモコ白い毛足・黒ボタン目・笑顔）
    // モコモコ毛並み
    ctx.fillStyle = '#ffffff';
    for (let angle = 0; angle < Math.PI * 2; angle += 0.3) {
      const mx = cx + Math.cos(angle) * 38;
      const my = cy - 10 + Math.sin(angle) * 38;
      ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2); ctx.fill();
    }
    ctx.beginPath(); ctx.arc(cx, cy - 10, 36, 0, Math.PI * 2); ctx.fill();

    // 黒ボタン目＆黒鼻
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 15, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 15, 4.5, 0, Math.PI * 2);
    ctx.arc(cx, cy - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

  } else if (type === 'taremimi') {
    // 🐰 たれ耳うさぎちゃん（垂れ耳ホランドロップ・耳リボン）
    // 垂れ耳
    ctx.beginPath();
    ctx.ellipse(cx - 38, cy, 14, 38, 0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 38, cy, 14, 38, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#d7ccc8'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 36, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e1'; ctx.fill();

    // 目
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#5d4037'; ctx.fill();

    // 耳リボン
    ctx.font = '22px sans-serif'; ctx.fillText('🎀', cx - 45, cy - 30);

  } else if (type === 'golden_cat_king') {
    // 👑 ゴールデンキャットキング（黄金の輝く毛並み・宝石王冠・キング猫）
    // 黄金オーラ
    const gGrad = ctx.createRadialGradient(cx, cy - 10, 5, cx, cy - 10, 48);
    gGrad.addColorStop(0, '#ffffff');
    gGrad.addColorStop(0.5, '#ffd700');
    gGrad.addColorStop(1, '#ffab00');

    // 猫耳
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 25); ctx.lineTo(cx - 42, cy - 58); ctx.lineTo(cx - 8, cy - 38);
    ctx.moveTo(cx + 30, cy - 25); ctx.lineTo(cx + 42, cy - 58); ctx.lineTo(cx + 8, cy - 38);
    ctx.fillStyle = '#ffd700'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 40, 0, Math.PI * 2);
    ctx.fillStyle = gGrad; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#ffffff'; ctx.stroke();

    // エメラルド目
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 12, 5, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 12, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00e676'; ctx.fill();

    // 王冠
    ctx.font = '28px sans-serif'; ctx.fillText('👑', cx - 16, cy - 50);
  }

  return canvas.toDataURL();
}

// 🎨 アボカドサーモンイラスト描画
function createAvocadoSalmonDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 110;
  // 影
  ctx.beginPath(); ctx.ellipse(cx, cy + 50, 50, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fill();

  // シャリ
  ctx.beginPath(); ctx.ellipse(cx, cy + 20, 45, 22, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#e0e0e0'; ctx.stroke();

  // サーモンネタ
  ctx.beginPath(); ctx.ellipse(cx, cy - 5, 48, 20, -0.1, 0, Math.PI * 2);
  ctx.fillStyle = '#ff7043'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#f4511e'; ctx.stroke();

  // アボカドスライス
  ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 30, 12, -0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#9ccc65'; ctx.fill();

  // かわいいお目々とほっぺ
  ctx.beginPath(); ctx.arc(cx - 12, cy, 3.5, 0, Math.PI * 2); ctx.arc(cx + 12, cy, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = '#212121'; ctx.fill();

  return canvas.toDataURL();
}

// 🎨 いくら軍艦プリンスイラスト描画
function createIkuraPrinceDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 110;
  // 軍艦海苔
  ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(cx, cy + 15, 42, 30, 0, 0, Math.PI * 2); ctx.fill();

  // イクラ粒々
  ctx.fillStyle = '#ff3d00';
  for (let i = 0; i < 7; i++) {
    ctx.beginPath(); ctx.arc(cx - 20 + (i % 4) * 14, cy - 15 + Math.floor(i / 4) * 14, 10, 0, Math.PI * 2);
    ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = '#ff9100'; ctx.stroke();
  }

  // 小さな王冠
  ctx.font = '24px sans-serif'; ctx.fillText('👑', cx - 12, cy - 35);

  // お目々
  ctx.beginPath(); ctx.arc(cx - 10, cy + 15, 3.5, 0, Math.PI * 2); ctx.arc(cx + 10, cy + 15, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();

  return canvas.toDataURL();
}

// 🎨 ウニくまイラスト描画（完璧なウニ軍艦×モコモコ可愛いクマちゃん！）
function createUniBearDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.6, '#fff8e1');
  bgGrad.addColorStop(1, '#ffe0b2');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 115;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 55, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(121, 85, 72, 0.3)'; ctx.fill();

  // クマのお耳
  ctx.beginPath();
  ctx.arc(cx - 36, cy - 35, 18, 0, Math.PI * 2);
  ctx.arc(cx + 36, cy - 35, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#8d6e63'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = '#5d4037'; ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx - 36, cy - 35, 10, 0, Math.PI * 2);
  ctx.arc(cx + 36, cy - 35, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#ff8a80'; ctx.fill();

  // 海苔の軍艦服（胴体）
  ctx.beginPath();
  ctx.roundRect(cx - 42, cy - 10, 84, 60, [15, 15, 10, 10]);
  ctx.fillStyle = '#212121'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = '#000000'; ctx.stroke();

  // 海苔の金箔飾り
  ctx.fillStyle = '#ffd700';
  ctx.fillRect(cx - 30, cy + 20, 6, 6);
  ctx.fillRect(cx + 20, cy + 30, 8, 8);

  // クマの頭・顔
  ctx.beginPath(); ctx.arc(cx, cy - 15, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#a1887f'; ctx.fill();
  ctx.lineWidth = 3.5; ctx.strokeStyle = '#4e342e'; ctx.stroke();

  // マズル（口元）
  ctx.beginPath(); ctx.ellipse(cx, cy - 8, 16, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#fff8e1'; ctx.fill();

  // 鼻と口
  ctx.beginPath(); ctx.ellipse(cx, cy - 13, 5, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#3e2723'; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy - 8, 5, 0, Math.PI);
  ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 2.5; ctx.stroke();

  // 目
  ctx.beginPath();
  ctx.arc(cx - 16, cy - 20, 5, 0, Math.PI * 2);
  ctx.arc(cx + 16, cy - 20, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#212121'; ctx.fill();

  ctx.beginPath();
  ctx.arc(cx - 14, cy - 22, 2, 0, Math.PI * 2);
  ctx.arc(cx + 18, cy - 22, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();

  // ほっぺ
  ctx.beginPath();
  ctx.ellipse(cx - 25, cy - 10, 7, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 25, cy - 10, 7, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 138, 128, 0.6)'; ctx.fill();

  // 🍣 頭の上の濃厚ウニ山盛り軍艦！
  ctx.beginPath();
  ctx.ellipse(cx, cy - 50, 36, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#212121'; ctx.fill();
  ctx.lineWidth = 2.5; ctx.strokeStyle = '#000000'; ctx.stroke();

  // ウニの粒々山盛り
  for (let i = 0; i < 14; i++) {
    ctx.beginPath();
    ctx.arc(cx - 24 + (i % 5) * 12, cy - 64 + Math.floor(i / 5) * 8, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#ff8f00' : '#ffa000'; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#e65100'; ctx.stroke();
  }

  // きゅうりスライス
  ctx.beginPath();
  ctx.ellipse(cx + 22, cy - 55, 10, 5, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#4caf50'; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = '#1b5e20'; ctx.stroke();

  return canvas.toDataURL();
}

// 🎨 黄金シャリドラゴンイラスト描画（輝く伝説の東洋龍ドラゴン！）
function createGoldenDragonDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.5, '#fffde7');
  bgGrad.addColorStop(1, '#fff59d');
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 110;

  // キラキラ光オーラ
  ctx.font = '20px sans-serif';
  ctx.fillText('✨', 20, 40);
  ctx.fillText('✨', 160, 40);
  ctx.fillText('✨', 30, 160);
  ctx.fillText('✨', 150, 170);

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 58, 60, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 193, 7, 0.4)'; ctx.fill();

  // 龍のうねる体（S字ゴールドグラデーション）
  const bodyGrad = ctx.createLinearGradient(cx - 50, cy, cx + 50, cy + 40);
  bodyGrad.addColorStop(0, '#ffe082');
  bodyGrad.addColorStop(0.5, '#ffb300');
  bodyGrad.addColorStop(1, '#ff6f00');

  ctx.beginPath();
  ctx.moveTo(cx - 45, cy + 10);
  ctx.bezierCurveTo(cx - 60, cy + 50, cx, cy + 60, cx + 45, cy + 40);
  ctx.bezierCurveTo(cx + 60, cy + 20, cx + 20, cy + 10, cx - 10, cy + 25);
  ctx.fillStyle = bodyGrad; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = '#ffa000'; ctx.stroke();

  // シャリつぶつぶ腹模様
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.ellipse(cx - 30 + i * 10, cy + 38 - (i % 2) * 5, 4, 6, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
  }

  // 龍の頭
  ctx.beginPath();
  ctx.ellipse(cx - 15, cy - 20, 32, 26, -0.2, 0, Math.PI * 2);
  ctx.fillStyle = bodyGrad; ctx.fill();
  ctx.lineWidth = 3.5; ctx.strokeStyle = '#e65100'; ctx.stroke();

  // 角（ツノ）
  ctx.beginPath();
  ctx.moveTo(cx - 25, cy - 42); ctx.lineTo(cx - 45, cy - 75); ctx.lineTo(cx - 15, cy - 50);
  ctx.moveTo(cx, cy - 44); ctx.lineTo(cx + 10, cy - 78); ctx.lineTo(cx + 15, cy - 48);
  ctx.fillStyle = '#fff59d'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = '#ffa000'; ctx.stroke();

  // 龍のたてがみ（白金プラチナ）
  ctx.beginPath();
  ctx.arc(cx + 8, cy - 35, 14, 0, Math.PI * 2);
  ctx.arc(cx + 18, cy - 20, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.lineWidth = 2.5; ctx.strokeStyle = '#ffe082'; ctx.stroke();

  // 龍の目（燃える赤＆ゴールド）
  ctx.beginPath(); ctx.ellipse(cx - 24, cy - 24, 7, 9, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#d50000'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx - 24, cy - 24, 3, 5, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffd700'; ctx.fill();
  ctx.beginPath(); ctx.arc(cx - 22, cy - 26, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();

  // 龍のヒゲ
  ctx.beginPath();
  ctx.moveTo(cx - 42, cy - 12);
  ctx.quadraticCurveTo(cx - 70, cy - 25, cx - 65, cy + 5);
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3.5; ctx.stroke();

  // 龍の手＆黄金の宝珠（特上シャリ）
  ctx.beginPath(); ctx.arc(cx + 35, cy + 18, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#ffd700'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = '#ff6f00'; ctx.stroke();
  ctx.font = '14px sans-serif';
  ctx.fillText('🍣', cx + 27, cy + 24);

  return canvas.toDataURL();
}


// 🎨 パンイラスト描画
function createPanDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 105;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 65, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(215, 195, 175, 0.4)'; ctx.fill();

  if (type === 'shokupan') {
    ctx.beginPath();
    ctx.roundRect(cx - 55, cy - 50, 110, 95, [25, 25, 12, 12]);
    ctx.fillStyle = '#8d6e63'; ctx.fill();
    ctx.beginPath();
    ctx.roundRect(cx - 47, cy - 43, 94, 82, [20, 20, 10, 10]);
    ctx.fillStyle = '#fff8e1'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 22, cy - 8, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 22, cy - 8, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, cy + 4, 6, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#4e342e'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 4, cy + 8, 4, 0, Math.PI / 2);
    ctx.arc(cx + 4, cy + 8, 4, Math.PI / 2, Math.PI);
    ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx - 32, cy + 6, 7, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 32, cy + 6, 7, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 138, 128, 0.6)'; ctx.fill();
    ctx.beginPath(); ctx.roundRect(cx - 15, cy - 40, 30, 20, 5);
    ctx.fillStyle = '#ffee58'; ctx.fill();

  } else if (type === 'croissant') {
    ctx.beginPath();
    ctx.arc(cx, cy + 10, 60, 0.2 * Math.PI, 0.8 * Math.PI, true);
    ctx.bezierCurveTo(cx - 40, cy - 30, cx + 40, cy - 30, cx + 55, cy + 25);
    ctx.fillStyle = '#ffb74d'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#e65100'; ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 20, cy - 5, 35, -0.5, 0.8);
    ctx.arc(cx + 10, cy - 5, 35, -0.5, 0.8);
    ctx.strokeStyle = '#f57c00'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy - 15); ctx.lineTo(cx - 52, cy - 40); ctx.lineTo(cx - 25, cy - 28);
    ctx.fillStyle = '#ffb74d'; ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 30, cy - 2, 4, 0, Math.PI * 2);
    ctx.arc(cx - 12, cy - 2, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

  } else if (type === 'melonpan') {
    ctx.beginPath();
    ctx.arc(cx - 55, cy + 10, 18, 0, Math.PI * 2);
    ctx.arc(cx - 35, cy + 40, 12, 0, Math.PI * 2);
    ctx.arc(cx + 35, cy + 40, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#a5d6a7'; ctx.fill();
    ctx.strokeStyle = '#388e3c'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx - 62, cy + 6, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1b5e20'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 5, cy - 5, 52, 0, Math.PI * 2);
    ctx.fillStyle = '#c8e6c9'; ctx.fill();
    ctx.strokeStyle = '#388e3c'; ctx.lineWidth = 4; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 25); ctx.lineTo(cx + 45, cy + 25);
    ctx.moveTo(cx - 25, cy - 40); ctx.lineTo(cx + 50, cy + 5);
    ctx.moveTo(cx - 35, cy + 15); ctx.lineTo(cx + 30, cy - 40);
    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 3.5; ctx.stroke();

  } else if (type === 'corone') {
    ctx.beginPath();
    ctx.ellipse(cx - 56, cy - 28, 9, 28, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx - 38, cy - 28, 9, 28, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#ff8a80'; ctx.lineWidth = 3.5; ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx - 56, cy - 28, 4.5, 18, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx - 38, cy - 28, 4.5, 18, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ff8a80'; ctx.fill();

    for (let i = 4; i >= 0; i--) {
      ctx.beginPath();
      ctx.ellipse(cx - 25 + i * 22, cy + 8 - i * 5, 18 + i * 4, 25 + i * 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#ffe082' : '#ffb74d'; ctx.fill();
      ctx.strokeStyle = '#f57c00'; ctx.lineWidth = 3; ctx.stroke();
    }

    ctx.beginPath(); ctx.arc(cx - 45, cy + 8, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx - 52, cy + 4, 3.5, 0, Math.PI * 2);
    ctx.arc(cx - 38, cy + 4, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#333333'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 45, cy + 10, 2.5, 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff8a80'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 56, cy + 12, 4.5, 2.5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 34, cy + 12, 4.5, 2.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 138, 128, 0.6)'; ctx.fill();

  } else if (type === 'donut') {
    ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 55, 0.8 * Math.PI, 0.2 * Math.PI);
    ctx.bezierCurveTo(cx + 40, cy + 40, cx - 40, cy + 40, cx - 55, cy);
    ctx.fillStyle = '#f48fb1'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

  } else if (type === 'french') {
    const hornGrad = ctx.createLinearGradient(cx - 10, cy - 70, cx + 10, cy - 30);
    hornGrad.addColorStop(0, '#ff4081');
    hornGrad.addColorStop(0.3, '#ffd700');
    hornGrad.addColorStop(0.7, '#00e5ff');
    hornGrad.addColorStop(1, '#e040fb');

    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 30);
    ctx.lineTo(cx, cy - 75);
    ctx.lineTo(cx + 16, cy - 30);
    ctx.closePath();
    ctx.fillStyle = hornGrad; ctx.fill();
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 10, cy - 42); ctx.lineTo(cx + 6, cy - 50);
    ctx.moveTo(cx - 6, cy - 55); ctx.lineTo(cx + 4, cy - 62);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.beginPath(); ctx.roundRect(cx - 55, cy - 30, 110, 80, 18);
    ctx.fillStyle = '#fff59d'; ctx.fill();
    ctx.strokeStyle = '#fbc02d'; ctx.lineWidth = 5; ctx.stroke();

    ctx.beginPath(); ctx.roundRect(cx - 45, cy - 20, 90, 60, 12);
    ctx.fillStyle = '#ffe082'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx - 22, cy + 5, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#4a148c'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 20, cy + 3, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 18);
    ctx.bezierCurveTo(cx, cy + 38, cx + 30, cy + 12, cx + 45, cy + 28);
    ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();
  }

  return canvas.toDataURL();
}

// 🎨 魔法少女イラスト描画
function createMahouDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 115;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 55, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(225, 190, 231, 0.4)'; ctx.fill();

  if (type === 'stella') {
    ctx.beginPath();
    ctx.ellipse(cx - 48, cy, 22, 45, -0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 48, cy, 22, 45, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();
    ctx.strokeStyle = '#f50057'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 45, cy + 50); ctx.lineTo(cx + 45, cy + 50); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#ea80fc'; ctx.fill();
    ctx.strokeStyle = '#aa00ff'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 15, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx, cy - 28, 18, 0, Math.PI * 2);
    ctx.ellipse(cx - 24, cy - 10, 10, 20, 0.1, 0, Math.PI * 2);
    ctx.ellipse(cx + 24, cy - 10, 10, 20, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 11, cy - 10, 5, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 11, cy - 10, 5, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d500f9'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 9, cy - 12, 2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy + 2, 3.5, 0, Math.PI);
    ctx.strokeStyle = '#c51162'; ctx.lineWidth = 2; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 30); ctx.lineTo(cx, cy - 78); ctx.lineTo(cx + 35, cy - 30);
    ctx.fillStyle = '#7c4dff'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, cy - 30, 42, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#651fff'; ctx.fill();

  } else if (type === 'moon') {
    ctx.beginPath();
    ctx.roundRect(cx - 40, cy - 30, 80, 85, 20);
    ctx.fillStyle = '#ffecb3'; ctx.fill();
    ctx.strokeStyle = '#ffa000'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 25, cy + 10); ctx.lineTo(cx - 40, cy + 50); ctx.lineTo(cx + 40, cy + 50); ctx.lineTo(cx + 25, cy + 10);
    ctx.fillStyle = '#80d8ff'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.ellipse(cx - 25, cy - 5, 10, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 25, cy - 5, 10, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd54f'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#00b0ff'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 18, cy - 55, 9, 28, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy - 55, 9, 28, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#ff80ab'; ctx.lineWidth = 3; ctx.stroke();

  } else if (type === 'sakura') {
    ctx.beginPath();
    ctx.arc(cx - 30, cy + 10, 25, 0, Math.PI * 2);
    ctx.arc(cx + 30, cy + 10, 25, 0, Math.PI * 2);
    ctx.arc(cx, cy + 15, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 50, cy + 52); ctx.lineTo(cx + 50, cy + 52); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#f8bbd0'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 14, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 25, 16, 0, Math.PI * 2);
    ctx.ellipse(cx - 24, cy - 5, 9, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 24, cy - 5, 9, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#c51162'; ctx.fill();

  } else if (type === 'crystal') {
    ctx.beginPath();
    ctx.roundRect(cx - 42, cy - 30, 84, 85, 15);
    ctx.fillStyle = '#b388ff'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 50, cy + 52); ctx.lineTo(cx + 50, cy + 52); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#e1bee7'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.rect(cx - 28, cy - 18, 10, 26);
    ctx.rect(cx + 18, cy - 18, 10, 26);
    ctx.fillStyle = '#7c4dff'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#6200ea'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 20, cy - 32); ctx.lineTo(cx, cy - 55); ctx.lineTo(cx + 20, cy - 32);
    ctx.fillStyle = '#80d8ff'; ctx.fill();
    ctx.strokeStyle = '#00b0ff'; ctx.lineWidth = 3; ctx.stroke();

  } else if (type === 'cat') {
    ctx.beginPath();
    ctx.arc(cx, cy - 5, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#4a148c'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.ellipse(cx - 25, cy - 8, 8, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 25, cy - 8, 8, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#311b92'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#00e676'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 28); ctx.lineTo(cx, cy - 68); ctx.lineTo(cx + 30, cy - 28);
    ctx.fillStyle = '#1a237e'; ctx.fill();

  } else if (type === 'galaxy') {
    ctx.beginPath();
    ctx.roundRect(cx - 50, cy - 35, 100, 95, 25);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 52, cy - 10, 25, 45, -0.4, 0, Math.PI * 2);
    ctx.ellipse(cx + 52, cy - 10, 25, 45, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 35, cy + 10); ctx.lineTo(cx - 60, cy + 52); ctx.lineTo(cx + 60, cy + 52); ctx.lineTo(cx + 35, cy + 10);
    ctx.fillStyle = '#ea80fc'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 10, 27, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 14, cy - 26, 16, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 26, 16, 0, Math.PI * 2);
    ctx.ellipse(cx - 26, cy - 6, 10, 24, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 26, cy - 6, 10, 24, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 25, cy - 38); ctx.lineTo(cx - 35, cy - 70); ctx.lineTo(cx, cy - 50); ctx.lineTo(cx + 35, cy - 70); ctx.lineTo(cx + 25, cy - 38);
    ctx.fillStyle = '#ffd700'; ctx.fill();
    ctx.strokeStyle = '#ff6f00'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath(); ctx.ellipse(cx - 11, cy - 10, 6, 9, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 11, cy - 10, 6, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d500f9'; ctx.fill();
  }

  return canvas.toDataURL();
}

// 🎨 食べ物イラスト描画
function createFoodDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 105;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 65, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(215, 195, 175, 0.4)'; ctx.fill();

  if (type === 'mentaiko') {
    ctx.beginPath();
    ctx.ellipse(cx, cy, 60, 36, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#d50000'; ctx.stroke();

    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(cx - 40 + (i % 6) * 15, cy - 18 + Math.floor(i / 6) * 14, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ff8a80'; ctx.fill();
    }

    ctx.fillStyle = '#263238';
    ctx.fillRect(cx - 10, cy - 36, 20, 72);

    ctx.beginPath();
    ctx.arc(cx - 24, cy - 4, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 24, cy - 4, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 24, cy - 4, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + 24, cy - 4, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy + 4, 6, 0, Math.PI);
    ctx.strokeStyle = '#212121'; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx - 36, cy + 6, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 36, cy + 6, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; ctx.fill();

  } else if (type === 'burger') {
    ctx.beginPath(); ctx.roundRect(cx - 55, cy + 15, 110, 25, 10);
    ctx.fillStyle = '#d7ccc8'; ctx.fill();

    ctx.beginPath(); ctx.roundRect(cx - 58, cy - 3, 116, 20, 8);
    ctx.fillStyle = '#4e342e'; ctx.fill();

    ctx.beginPath(); ctx.roundRect(cx - 54, cy - 16, 108, 14, 4);
    ctx.fillStyle = '#ffd54f'; ctx.fill();

    ctx.beginPath(); ctx.roundRect(cx - 56, cy - 48, 112, 34, [24, 24, 6, 6]);
    ctx.fillStyle = '#ffb74d'; ctx.fill();
    ctx.strokeStyle = '#e65100'; ctx.lineWidth = 3.5; ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx - 20, cy - 36, 3, 1.5, 0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 20, cy - 36, 3, 1.5, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx, cy - 40, 3, 1.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 20, cy - 25, 4, 0, Math.PI * 2);
    ctx.arc(cx + 20, cy - 25, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 20, 5, 0, Math.PI);
    ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 2.5; ctx.stroke();

  } else if (type === 'ramen') {
    ctx.beginPath(); ctx.arc(cx, cy + 12, 58, 0, Math.PI);
    ctx.fillStyle = '#e53935'; ctx.fill();
    ctx.strokeStyle = '#b71c1c'; ctx.lineWidth = 4; ctx.stroke();

    ctx.beginPath(); ctx.ellipse(cx, cy + 12, 56, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff59d'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx - 25, cy + 4, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#f48fb1'; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx - 18, cy + 30, 4, 0, Math.PI * 2);
    ctx.arc(cx + 18, cy + 30, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy + 36, 5, 0, Math.PI);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();

  } else if (type === 'curry') {
    ctx.beginPath(); ctx.ellipse(cx, cy + 15, 65, 32, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffb74d'; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - 15, cy + 10, 40, 24, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 28, cy + 8, 3.5, 0, Math.PI * 2);
    ctx.arc(cx - 10, cy + 8, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx - 19, cy + 14, 4, 0, Math.PI);
    ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 2; ctx.stroke();

  } else if (type === 'parfait') {
    ctx.beginPath();
    ctx.moveTo(cx - 36, cy - 10); ctx.lineTo(cx - 20, cy + 48); ctx.lineTo(cx + 20, cy + 48); ctx.lineTo(cx + 36, cy - 10);
    ctx.fillStyle = 'rgba(225, 245, 254, 0.8)'; ctx.fill();
    ctx.strokeStyle = '#4fc3f7'; ctx.lineWidth = 3.5; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx, cy - 25, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 12, cy - 28, 4, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 28, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy - 20, 5, 0, Math.PI);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();

  } else if (type === 'cake') {
    ctx.beginPath();
    ctx.moveTo(cx - 45, cy + 30); ctx.lineTo(cx + 45, cy + 30); ctx.lineTo(cx + 30, cy - 25); ctx.lineTo(cx - 45, cy + 30);
    ctx.fillStyle = '#fff9c4'; ctx.fill();
    ctx.strokeStyle = '#fbc02d'; ctx.lineWidth = 4; ctx.stroke();

    ctx.beginPath(); ctx.arc(cx - 5, cy - 25, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 10, cy + 10, 4, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy + 10, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#d50000'; ctx.fill();

    ctx.beginPath(); ctx.arc(cx + 2, cy + 16, 5, 0, Math.PI);
    ctx.strokeStyle = '#d50000'; ctx.lineWidth = 2.5; ctx.stroke();
  }

  return canvas.toDataURL();
}

// 🎨 海の生き物イラスト描画
function createSeaDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 105;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 65, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(179, 229, 252, 0.5)'; ctx.fill();

  if (type === 'penguin') {
    ctx.beginPath();
    ctx.ellipse(cx, cy, 45, 52, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#263238'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx, cy + 6, 32, 40, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 45, cy + 10, 10, 25, 0.4, 0, Math.PI * 2);
    ctx.ellipse(cx + 45, cy + 10, 10, 25, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#263238'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 15, cy - 18, 4.5, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 18, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#263238'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 13, cy - 20, 1.5, 0, Math.PI * 2);
    ctx.arc(cx + 17, cy - 20, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx, cy - 10, 7, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffb300'; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 15, cy + 48, 10, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 15, cy + 48, 10, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffb300'; ctx.fill();

  } else if (type === 'mendako') {
    ctx.beginPath();
    ctx.moveTo(cx - 45, cy + 25);
    ctx.bezierCurveTo(cx - 50, cy - 35, cx + 50, cy - 35, cx + 45, cy + 25);
    ctx.bezierCurveTo(cx + 20, cy + 45, cx - 20, cy + 45, cx - 45, cy + 25);
    ctx.fillStyle = '#ff80ab'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#f50057'; ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx - 38, cy - 18, 8, 14, -0.4, 0, Math.PI * 2);
    ctx.ellipse(cx + 38, cy - 18, 8, 14, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 18, cy, 6, 0, Math.PI * 2);
    ctx.arc(cx + 18, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#311b92'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 16, cy - 2, 2, 0, Math.PI * 2);
    ctx.arc(cx + 20, cy - 2, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

  } else if (type === 'chinanago') {
    // チンアナゴ（砂からニョキッ）
    // 砂地
    ctx.beginPath();
    ctx.ellipse(cx, cy + 45, 60, 15, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e1'; ctx.fill();
    ctx.strokeStyle = '#ffe082'; ctx.lineWidth = 2.5; ctx.stroke();

    // チンアナゴ1（左・大きい）
    ctx.beginPath(); ctx.roundRect(cx - 30, cy - 45, 24, 90, 12);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#00838f'; ctx.stroke();
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.arc(cx - 18, cy - 25 + i * 20, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00838f'; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(cx - 24, cy - 35, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 25, cy - 36, 1, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // チンアナゴ2（右・小さい）
    ctx.beginPath(); ctx.roundRect(cx + 10, cy - 25, 20, 70, 10);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#00838f'; ctx.stroke();
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.arc(cx + 20, cy - 8 + i * 18, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00838f'; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(cx + 16, cy - 17, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();

  } else if (type === 'jinbee') {
    // 水玉ジンベエザメ
    // 巨大な青い体
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy);
    ctx.bezierCurveTo(cx - 65, cy - 50, cx + 40, cy - 40, cx + 65, cy - 10);
    ctx.bezierCurveTo(cx + 70, cy + 20, cx + 20, cy + 45, cx - 65, cy);
    ctx.fillStyle = '#0288d1'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#01579b'; ctx.stroke();

    // 白いお腹
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy);
    ctx.bezierCurveTo(cx - 30, cy + 40, cx + 30, cy + 35, cx + 60, cy + 5);
    ctx.bezierCurveTo(cx + 20, cy + 45, cx - 40, cy + 30, cx - 65, cy);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // 白い水玉ドット模様
    ctx.fillStyle = '#ffffff';
    const dots = [[cx - 20, cy - 20], [cx, cy - 25], [cx + 20, cy - 18], [cx + 35, cy - 10], [cx - 10, cy - 5], [cx + 10, cy - 2], [cx + 30, cy + 2], [cx - 30, cy - 10]];
    dots.forEach(d => {
      ctx.beginPath(); ctx.arc(d[0], d[1], 4, 0, Math.PI * 2); ctx.fill();
    });

    // つぶらな目と四角い大きなお口
    ctx.beginPath(); ctx.arc(cx - 50, cy - 12, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#212121'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 48, cy - 14, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // にっこりお口
    ctx.beginPath(); ctx.roundRect(cx - 60, cy + 2, 22, 10, 4);
    ctx.fillStyle = '#e1f5fe'; ctx.fill();
    ctx.strokeStyle = '#01579b'; ctx.lineWidth = 2.5; ctx.stroke();

  } else if (type === 'kurage') {
    // クラゲ姫
    // ぷっくり傘（ドレス風ピンクグラデ）
    const kGrad = ctx.createLinearGradient(cx, cy - 45, cx, cy + 10);
    kGrad.addColorStop(0, '#f8bbd0');
    kGrad.addColorStop(1, '#e1bee7');

    ctx.beginPath();
    ctx.arc(cx, cy - 10, 45, Math.PI, 0);
    ctx.bezierCurveTo(cx + 45, cy + 15, cx - 45, cy + 15, cx - 45, cy - 10);
    ctx.fillStyle = kGrad; ctx.fill();
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ba68c8'; ctx.stroke();

    // 王冠
    ctx.font = '24px sans-serif';
    ctx.fillText('👑', cx - 12, cy - 48);

    // ふりふり触手（リボン＆ドレス）
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#ce93d8'; ctx.lineCap = 'round';
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 12, cy + 10);
      ctx.quadraticCurveTo(cx + i * 14 + (i % 2 === 0 ? 8 : -8), cy + 30, cx + i * 12, cy + 50);
      ctx.stroke();
    }

    // つぶらな目とチーク
    ctx.beginPath(); ctx.arc(cx - 15, cy - 15, 4, 0, Math.PI * 2); ctx.arc(cx + 15, cy - 15, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4a148c'; ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - 24, cy - 10, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 24, cy - 10, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 64, 129, 0.6)'; ctx.fill();

  } else if (type === 'whale') {
    const wGrad = ctx.createLinearGradient(cx, cy - 85, cx, cy - 40);
    wGrad.addColorStop(0, '#ff4081');
    wGrad.addColorStop(0.5, '#ffd700');
    wGrad.addColorStop(1, '#00e5ff');
    ctx.beginPath();
    ctx.moveTo(cx, cy - 35);
    ctx.lineTo(cx - 20, cy - 80); ctx.lineTo(cx, cy - 60); ctx.lineTo(cx + 20, cy - 80);
    ctx.closePath();
    ctx.fillStyle = wGrad; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - 10, cy + 10, 58, 35, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#1e88e5'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#0d47a1'; ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx - 38, cy + 2, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 38, cy + 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#0d47a1'; ctx.fill();
  }

  return canvas.toDataURL();
}

// ゲーム状態
let currentMode = 'sushi'; // 'sushi', 'pan', 'mahou', 'food', 'sea', 'kawaii', 'idol', 'cool', 'space', 'pixel', 'yokai', 'dino', 'car', 'sweets', 'pet'
let userCoins = 10;
let isCoinInserted = false;
let isTurning = false;
let sushiCollection = {};
let panCollection = {};
let mahouCollection = {};
let foodCollection = {};
let seaCollection = {};
let kawaiiCollection = {};
let idolCollection = {};
let coolCollection = {};
let spaceCollection = {};
let pixelCollection = {};
let yokaiCollection = {};
let dinoCollection = {};
let carCollection = {};
let sweetsCollection = {};
let petCollection = {};
let currentFilter = 'all';

let audioCtx = null;
let isBgmPlaying = false;
let bgmLoopTimer = null;

const BGM_THEMES = {
  sushi: {
    title: '🍣 和風わくわくすし音頭',
    notes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00], // ピコピコ和風ペンタ
    tempo: 220,
    wave: 'triangle'
  },
  pan: {
    title: '🍞 焼きたてカントリーポップ',
    notes: [329.63, 392.00, 440.00, 523.25, 587.33, 523.25, 440.00, 392.00],
    tempo: 180,
    wave: 'sine'
  },
  mahou: {
    title: '✨ キラキラ☆魔法のファンタジー',
    notes: [523.25, 659.25, 783.99, 1046.50, 880.00, 783.99, 659.25, 523.25],
    tempo: 240,
    wave: 'sine'
  },
  food: {
    title: '🍔 ハッピーモグモグマーチ',
    notes: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 392.00],
    tempo: 190,
    wave: 'square'
  },
  sea: {
    title: '🐬 ゆらゆらオーシャンマリン',
    notes: [349.23, 440.00, 523.25, 698.46, 523.25, 440.00],
    tempo: 300,
    wave: 'sine'
  },
  kawaii: {
    title: '💖 ゆめかわキャンディポップ',
    notes: [440.00, 523.25, 659.25, 880.00, 659.25, 523.25, 440.00, 523.25],
    tempo: 170,
    wave: 'triangle'
  },
  idol: {
    title: '🎤 キラキラ☆アイドルライブステージ',
    notes: [440.00, 554.37, 659.25, 880.00, 659.25, 880.00, 987.77, 1046.50],
    tempo: 140,
    wave: 'sawtooth'
  },
  cool: {
    title: '🔥 爆裂！かっこいいヒーローバトル',
    notes: [220.00, 293.66, 329.63, 440.00, 523.25, 440.00, 329.63, 293.66],
    tempo: 130,
    wave: 'sawtooth'
  },
  space: {
    title: '🌌 キラキラ☆コズミックスペースアドベンチャー',
    notes: [523.25, 659.25, 783.99, 987.77, 1046.50, 880.00, 659.25, 523.25],
    tempo: 210,
    wave: 'sine'
  },
  pixel: {
    title: '👾 ピコピコ！8bitレトロゲームの大冒険',
    notes: [261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63],
    tempo: 150,
    wave: 'square'
  },
  yokai: {
    title: '👻 怪しくゆらゆら！百鬼夜行お化け踊り',
    notes: [293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63],
    tempo: 200,
    wave: 'triangle'
  },
  dino: {
    title: '🦖 ガオガオ！古代ジュラシックアドベンチャー',
    notes: [220.00, 261.63, 329.63, 440.00, 329.63, 261.63, 220.00, 164.81],
    tempo: 160,
    wave: 'sawtooth'
  },
  car: {
    title: '🚗 ブロロロ！はたらくくるまのタウンパトロール',
    notes: [261.63, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63],
    tempo: 170,
    wave: 'square'
  },
  sweets: {
    title: '🍰 フワフワお菓子の王国パレード',
    notes: [523.25, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25],
    tempo: 160,
    wave: 'sine'
  },
  pet: {
    title: '🐶 ワンワン・ニャンニャン！もふもふペットの大行進',
    notes: [392.00, 440.00, 523.25, 659.25, 523.25, 440.00, 392.00, 329.63],
    tempo: 170,
    wave: 'triangle'
  }
};

function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playBgmStep(step) {
  if (!isBgmPlaying || !audioCtx) return;
  const theme = BGM_THEMES[currentMode] || BGM_THEMES.sushi;
  const freq = theme.notes[step % theme.notes.length];
  
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = theme.wave || 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (theme.tempo / 1000) * 0.85);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + (theme.tempo / 1000) * 0.85);
  } catch (e) {}

  bgmLoopTimer = setTimeout(() => {
    playBgmStep(step + 1);
  }, theme.tempo);
}

function startBgm() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  isBgmPlaying = true;
  if (bgmLoopTimer) clearTimeout(bgmLoopTimer);
  playBgmStep(0);
  updateBgmUI();
}

function stopBgm() {
  isBgmPlaying = false;
  if (bgmLoopTimer) clearTimeout(bgmLoopTimer);
  updateBgmUI();
}

function toggleBgm() {
  if (isBgmPlaying) {
    stopBgm();
  } else {
    startBgm();
  }
}

function updateBgmUI() {
  const bgmBtn = document.getElementById('bgm-toggle-btn');
  const bgmBadge = document.getElementById('bgm-title-badge');
  const bgmText = document.getElementById('bgm-title-text');
  
  if (!bgmBtn || !bgmBadge || !bgmText) return;

  const currentTheme = BGM_THEMES[currentMode] || BGM_THEMES.sushi;

  if (isBgmPlaying) {
    bgmBtn.textContent = '🔊 BGM: ON';
    bgmBtn.classList.add('playing');
    bgmBadge.classList.remove('hidden');
    bgmText.textContent = currentTheme.title;
  } else {
    bgmBtn.textContent = '🎵 BGM: OFF';
    bgmBtn.classList.remove('playing');
    bgmBadge.classList.add('hidden');
  }
}

function playSound(type) {
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    if (type === 'coin') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'gacha') {
      for (let i = 0; i < 3; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(200 + i * 80, now + i * 0.2);
        gain.gain.setValueAtTime(0.2, now + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.15);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(now + i * 0.2); osc.stop(now + i * 0.2 + 0.15);
      }
    } else if (type === 'pop') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'fanfare') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.3, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.4);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.12); osc.stop(now + idx * 0.12 + 0.4);
      });
    }
  } catch (e) {}
}

function getActiveCharacters() {
  if (currentMode === 'sushi') return SUSHI_CHARACTERS;
  if (currentMode === 'pan') return PAN_CHARACTERS;
  if (currentMode === 'mahou') return MAHOU_CHARACTERS;
  if (currentMode === 'food') return FOOD_CHARACTERS;
  if (currentMode === 'sea') return SEA_CHARACTERS;
  if (currentMode === 'kawaii') return KAWAII_CHARACTERS;
  if (currentMode === 'idol') return IDOL_CHARACTERS;
  if (currentMode === 'cool') return COOL_CHARACTERS;
  if (currentMode === 'space') return SPACE_CHARACTERS;
  if (currentMode === 'pixel') return PIXEL_CHARACTERS;
  if (currentMode === 'yokai') return YOKAI_CHARACTERS;
  if (currentMode === 'dino') return DINO_CHARACTERS;
  if (currentMode === 'car') return CAR_CHARACTERS;
  if (currentMode === 'sweets') return SWEETS_CHARACTERS;
  return PET_CHARACTERS;
}

function getActiveCollection() {
  if (currentMode === 'sushi') return sushiCollection;
  if (currentMode === 'pan') return panCollection;
  if (currentMode === 'mahou') return mahouCollection;
  if (currentMode === 'food') return foodCollection;
  if (currentMode === 'sea') return seaCollection;
  if (currentMode === 'kawaii') return kawaiiCollection;
  if (currentMode === 'idol') return idolCollection;
  if (currentMode === 'cool') return coolCollection;
  if (currentMode === 'space') return spaceCollection;
  if (currentMode === 'pixel') return pixelCollection;
  if (currentMode === 'yokai') return yokaiCollection;
  if (currentMode === 'dino') return dinoCollection;
  if (currentMode === 'car') return carCollection;
  if (currentMode === 'sweets') return sweetsCollection;
  return petCollection;
}

function initGachaApp() {
  const coinCountEl = document.getElementById('coin-count');
  const insertCoinBtn = document.getElementById('insert-coin-btn');
  const turnHandleBtn = document.getElementById('turn-handle-btn');
  const coinSlot = document.getElementById('coin-slot');
  const slotText = document.getElementById('slot-text');
  const handle = document.getElementById('gacha-handle');
  const droppedArea = document.getElementById('dropped-capsule-area');
  const machineTitle = document.getElementById('machine-title');
  const zukanTitleText = document.getElementById('zukan-title-text');
  
  const gachaTabBtns = document.querySelectorAll('.gacha-tab');

  const resultModal = document.getElementById('result-modal');
  const resultRarity = document.getElementById('result-rarity');
  const resultImg = document.getElementById('result-img');
  const resultName = document.getElementById('result-name');
  const resultDesc = document.getElementById('result-desc');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  const zukanGrid = document.getElementById('zukan-grid');
  const zukanCountEl = document.getElementById('zukan-count');
  const zukanTotalEl = document.getElementById('zukan-total');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const completeBadge = document.getElementById('complete-badge');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const zukanDetailModal = document.getElementById('zukan-detail-modal');
  const detailBackdrop = document.getElementById('detail-backdrop');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const detailRarity = document.getElementById('detail-rarity');
  const detailImg = document.getElementById('detail-img');
  const detailName = document.getElementById('detail-name');
  const detailHabitat = document.getElementById('detail-habitat');
  const detailFavorite = document.getElementById('detail-favorite');
  const detailCount = document.getElementById('detail-count');
  const detailDesc = document.getElementById('detail-desc');

  const tenGachaBtn = document.getElementById('ten-gacha-btn');
  const tenResultModal = document.getElementById('ten-result-modal');
  const tenResultGrid = document.getElementById('ten-result-grid');
  const closeTenModalBtn = document.getElementById('close-ten-modal-btn');

  const feedbackInput = document.getElementById('feedback-input');
  const feedbackSubmitBtn = document.getElementById('feedback-submit-btn');
  const feedbackThanks = document.getElementById('feedback-thanks');

  const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
  if (bgmToggleBtn) {
    bgmToggleBtn.addEventListener('click', () => {
      toggleBgm();
    });
  }

  const resetDataBtn = document.getElementById('reset-data-btn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      if (confirm('ほんとうに 集めた図鑑データをリセットして 最初からあそぶ？')) {
        localStorage.clear();
        sushiCollection = {};
        panCollection = {};
        mahouCollection = {};
        foodCollection = {};
        seaCollection = {};
        kawaiiCollection = {};
        idolCollection = {};
        coolCollection = {};
        spaceCollection = {};
        pixelCollection = {};
        yokaiCollection = {};
        dinoCollection = {};
        carCollection = {};
        petCollection = {};
        userCoins = 10;
        saveCollection();
        updateUI();
        renderZukan();
        alert('データをリセットしたよ！最初からあそんでね！');
      }
    });
  }

  // 🔮 今日のラッキーおみくじ処理
  const omikujiBtn = document.getElementById('omikuji-btn');
  const omikujiModal = document.getElementById('omikuji-modal');
  const omikujiBody = document.getElementById('omikuji-body');
  const omikujiResult = document.getElementById('omikuji-result');
  const drawOmikujiBtn = document.getElementById('draw-omikuji-btn');
  const closeOmikujiModalBtn = document.getElementById('close-omikuji-modal-btn');
  const omikujiFortuneBadge = document.getElementById('omikuji-fortune-badge');
  const omikujiRewardText = document.getElementById('omikuji-reward-text');
  const omikujiMsg = document.getElementById('omikuji-msg');

  if (omikujiBtn) {
    omikujiBtn.addEventListener('click', () => {
      if (omikujiModal) omikujiModal.classList.remove('hidden');
      if (omikujiBody) omikujiBody.classList.remove('hidden');
      if (omikujiResult) omikujiResult.classList.add('hidden');
    });
  }

  if (closeOmikujiModalBtn) {
    closeOmikujiModalBtn.addEventListener('click', () => {
      if (omikujiModal) omikujiModal.classList.add('hidden');
    });
  }

  if (drawOmikujiBtn) {
    drawOmikujiBtn.addEventListener('click', () => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const lastDraw = localStorage.getItem('gacha_omikuji_date');

      if (lastDraw === todayStr) {
        alert('今日のラッキーおみくじは もう引いたよ！また明日あそぼうね♪');
        if (omikujiModal) omikujiModal.classList.add('hidden');
        return;
      }

      playSound('fanfare');
      localStorage.setItem('gacha_omikuji_date', todayStr);

      const fortunes = [
        { name: '🌟 超大吉', class: 'chou-daikichi', coins: 30, msg: 'ウルトラミラクル超ラッキー！ガチャを引きまくろう！' },
        { name: '🎯 大吉', class: 'daikichi', coins: 20, msg: '大吉おめでとう！レアなキャラクターが出る予感！' },
        { name: '✨ 中吉', class: 'chukichi', coins: 10, msg: 'とってもステキな1日！コインが増えてウキウキ♪' },
        { name: '🎉 小吉', class: 'shokichi', coins: 5, msg: 'ハッピーな出来事があるかも！楽しんでね！' }
      ];

      const res = fortunes[Math.floor(Math.random() * fortunes.length)];
      userCoins += res.coins;
      saveCollection();
      updateUI();

      if (omikujiFortuneBadge) {
        omikujiFortuneBadge.textContent = res.name;
        omikujiFortuneBadge.className = `fortune-badge ${res.class}`;
      }
      if (omikujiRewardText) omikujiRewardText.textContent = `コイン +${res.coins}枚 ゲット！🎉`;
      if (omikujiMsg) omikujiMsg.textContent = res.msg;

      if (omikujiBody) omikujiBody.classList.add('hidden');
      if (omikujiResult) omikujiResult.classList.remove('hidden');
      createConfetti();
    });
  }

  // 🎵 音ゲー・リズムミニゲーム処理
  const rhythmGameBtn = document.getElementById('rhythm-game-btn');
  const rhythmModal = document.getElementById('rhythm-modal');
  const closeRhythmModalBtn = document.getElementById('close-rhythm-modal-btn');
  const rhythmHitBtn = document.getElementById('rhythm-hit-btn');
  const rhythmNote = document.getElementById('rhythm-note');
  const rhythmJudgment = document.getElementById('rhythm-judgment');
  const rhythmScoreText = document.getElementById('rhythm-score');
  const rhythmCoinsText = document.getElementById('rhythm-coins');

  let rhythmAnimId = null;
  let notePosY = -40;
  let rhythmScore = 0;
  let rhythmCoins = 0;
  let noteSpeed = 2.5;

  function resetRhythmStage() {
    notePosY = -40;
    noteSpeed = 2.0 + Math.random() * 1.5;
    if (rhythmNote) rhythmNote.style.top = `${notePosY}px`;
  }

  function startRhythmGame() {
    rhythmScore = 0;
    rhythmCoins = 0;
    if (rhythmScoreText) rhythmScoreText.textContent = '0';
    if (rhythmCoinsText) rhythmCoinsText.textContent = '+0';
    resetRhythmStage();

    if (!isBgmPlaying) startBgm();

    function loop() {
      notePosY += noteSpeed;
      if (notePosY > 190) {
        resetRhythmStage();
      }
      if (rhythmNote) rhythmNote.style.top = `${notePosY}px`;
      rhythmAnimId = requestAnimationFrame(loop);
    }
    cancelAnimationFrame(rhythmAnimId);
    loop();
  }

  function stopRhythmGame() {
    if (rhythmAnimId) cancelAnimationFrame(rhythmAnimId);
    if (rhythmModal) rhythmModal.classList.add('hidden');
  }

  if (rhythmGameBtn) {
    rhythmGameBtn.addEventListener('click', () => {
      if (rhythmModal) rhythmModal.classList.remove('hidden');
      startRhythmGame();
    });
  }

  if (closeRhythmModalBtn) {
    closeRhythmModalBtn.addEventListener('click', () => {
      stopRhythmGame();
    });
  }

  function handleRhythmHit() {
    const diff = Math.abs(notePosY - 130);
    let judgmentText = '';
    let gained = 0;

    if (diff < 18) {
      judgmentText = '🌟 PERFECT!';
      gained = 3;
      playSound('fanfare');
    } else if (diff < 35) {
      judgmentText = '✨ GREAT!';
      gained = 2;
      playSound('pop');
    } else if (diff < 50) {
      judgmentText = 'GOOD';
      gained = 1;
      playSound('pop');
    } else {
      judgmentText = 'MISS...';
      gained = 0;
    }

    if (gained > 0) {
      rhythmScore += gained * 100;
      rhythmCoins += gained;
      userCoins += gained;
      saveCollection();
      updateUI();
    }

    if (rhythmJudgment) {
      rhythmJudgment.textContent = judgmentText;
      rhythmJudgment.classList.remove('hidden');
      setTimeout(() => {
        if (rhythmJudgment) rhythmJudgment.classList.add('hidden');
      }, 600);
    }

    if (rhythmScoreText) rhythmScoreText.textContent = rhythmScore.toString();
    if (rhythmCoinsText) rhythmCoinsText.textContent = `+${rhythmCoins}`;

    resetRhythmStage();
  }

  if (rhythmHitBtn) {
    rhythmHitBtn.addEventListener('click', handleRhythmHit);
  }

  loadCollection();
  updateUI();
  renderZukan();

  if (feedbackSubmitBtn) {
    feedbackSubmitBtn.addEventListener('click', () => {
      const val = feedbackInput ? feedbackInput.value.trim() : '';
      if (!val) {
        alert('メッセージを書いてから 送信ボタンをおしてね！');
        return;
      }
      playSound('fanfare');
      if (feedbackInput) feedbackInput.value = '';
      if (feedbackThanks) feedbackThanks.classList.remove('hidden');
      setTimeout(() => {
        if (feedbackThanks) feedbackThanks.classList.add('hidden');
      }, 4000);
    });
  }

  // 全タブボタンにクリックリスナーを一貫登録
  gachaTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const mode = btn.getAttribute('data-mode') || btn.id.replace('tab-', '');
      isTurning = false; // ガチャ回転状態をリセット

      currentMode = mode;
      gachaTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.body.className = `theme-${mode}`;

      const titleMap = {
        sushi: 'すしガチャ',
        pan: 'パンガチャ',
        mahou: 'まほうガチャ',
        food: 'たべものガチャ',
        sea: 'うみのいきものガチャ',
        kawaii: 'めっちゃかわガチャ',
        idol: 'アイドルガチャ',
        cool: 'かっこいいガチャ',
        space: 'うちゅうガチャ',
        pixel: 'レトロゲームガチャ',
        yokai: 'ようかいガチャ',
        dino: 'きょうりゅうガチャ',
        car: 'くるまガチャ',
        pet: 'ペットガチャ'
      };

      const zukanMap = {
        sushi: 'すしずかん',
        pan: 'パンずかん',
        mahou: 'まほうしょうじょずかん',
        food: 'たべものずかん',
        sea: 'うみのいきものずかん',
        kawaii: 'めっちゃかわずかん',
        idol: 'アイドルずかん',
        cool: 'かっこいいずかん',
        space: 'うちゅうずかん',
        pixel: 'レトロゲームずかん',
        yokai: 'ようかいずかん',
        dino: 'きょうりゅうずかん',
        car: 'くるまずかん',
        sweets: 'スイーツずかん',
        pet: 'ペットずかん'
      };

      machineTitle.textContent = titleMap[mode] || 'ガチャ';
      zukanTitleText.textContent = zukanMap[mode] || 'ずかん';

      playSound('pop');
      renderZukan();

      if (isBgmPlaying) {
        startBgm();
      }
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderZukan();
    });
  });

  if (tenGachaBtn) {
    tenGachaBtn.addEventListener('click', () => {
      if (isTurning) return;
      if (userCoins < 10) {
        alert('コインが10枚足りないよ！「+ コインをふやす」ボタンでお得にゲットしてね！');
        return;
      }

      userCoins -= 10;
      isTurning = true;
      if (tenGachaBtn) tenGachaBtn.disabled = true;
      if (turnHandleBtn) turnHandleBtn.disabled = true;
      if (insertCoinBtn) insertCoinBtn.disabled = true;

      playSound('gacha');
      if (handle) handle.classList.add('turning');

      setTimeout(() => {
        if (handle) handle.classList.remove('turning');
        
        // 10連ガチャ実行！
        openTenCapsules();

        isTurning = false;
        updateUI();
      }, 1000);
    });
  }

  function openTenCapsules() {
    droppedArea.innerHTML = '';
    playSound('pop');

    const chars = getActiveCharacters();
    const collection = getActiveCollection();
    let hasURorSSR = false;
    const drawnChars = [];

    for (let i = 0; i < 10; i++) {
      const selected = drawGacha(chars);
      const isNew = !(collection[selected.id] && collection[selected.id] > 0);
      collection[selected.id] = (collection[selected.id] || 0) + 1;
      drawnChars.push({ char: selected, isNew: isNew });

      if (selected.rarity === 'UR' || selected.rarity === 'SSR') {
        hasURorSSR = true;
      }
    }

    saveCollection();
    renderZukan();

    // 10連結果モーダルを構築
    tenResultGrid.innerHTML = '';
    drawnChars.forEach(item => {
      const c = item.char;
      const card = document.createElement('div');
      let rarityClass = 'r-card';
      if (c.rarity === 'UR') rarityClass = 'ur-card';
      else if (c.rarity === 'SSR') rarityClass = 'ssr-card';

      card.className = `ten-card-item ${rarityClass}`;
      card.innerHTML = `
        <span class="ten-card-badge ${c.rarityClass}">${c.rarityLabel}</span>
        ${item.isNew ? `<span style="position: absolute; top: -6px; right: -6px; background: #ff1744; color: white; font-size: 0.65rem; font-weight: 900; padding: 2px 6px; border-radius: 8px;">NEW!</span>` : ''}
        <img class="ten-card-img" src="${c.getImage()}" alt="${c.name}" />
        <div class="ten-card-name">${c.name}</div>
      `;
      tenResultGrid.appendChild(card);
    });

    if (tenResultModal) tenResultModal.classList.remove('hidden');

    if (hasURorSSR) {
      playSound('fanfare');
      launchConfetti();
    }
  }

  if (closeTenModalBtn) {
    closeTenModalBtn.addEventListener('click', () => {
      if (tenResultModal) tenResultModal.classList.add('hidden');
    });
  }

  if (insertCoinBtn) {
    insertCoinBtn.addEventListener('click', () => {
      if (isCoinInserted) return;
      if (userCoins <= 0) {
        alert('コインがなくなっちゃった！「🔮 おみくじ」か「🎵 リズムゲーム」でコインをふやしてね！');
        return;
      }

      userCoins--;
      isCoinInserted = true;
      playSound('coin');
      
      if (coinSlot) coinSlot.classList.add('inserted');
      if (slotText) slotText.textContent = '✅ コインはいったよ！';
      updateUI();
    });
  }

  if (turnHandleBtn) {
    turnHandleBtn.addEventListener('click', () => {
      if (!isCoinInserted || isTurning) return;
      isTurning = true;
      turnHandleBtn.disabled = true;

      playSound('gacha');
      if (handle) handle.classList.add('turning');

      setTimeout(() => {
        if (handle) handle.classList.remove('turning');
        dropCapsule();
        
        isCoinInserted = false;
        if (coinSlot) coinSlot.classList.remove('inserted');
        if (slotText) slotText.textContent = '🪙 コインぐち';
        isTurning = false;
        updateUI();
      }, 900);
    });
  }

  function dropCapsule() {
    droppedArea.innerHTML = '';
    playSound('pop');

    let colors = ['#ff5252', '#ffd700', '#448aff', '#ff4081', '#69f0ae'];
    if (currentMode === 'pan') colors = ['#ffb74d', '#ff8a80', '#ba68c8', '#81c784', '#ffd54f'];
    if (currentMode === 'mahou') colors = ['#ea80fc', '#80d8ff', '#ffd700', '#b388ff', '#ff80ab'];
    if (currentMode === 'food') colors = ['#ff7043', '#ffca28', '#66bb6a', '#42a5f5', '#ab47bc'];
    if (currentMode === 'sea') colors = ['#00e5ff', '#80d8ff', '#00b0ff', '#29b6f6', '#0097a7'];
    if (currentMode === 'kawaii') colors = ['#ff80ab', '#ff4081', '#ea80fc', '#ffd700', '#80d8ff'];
    if (currentMode === 'idol') colors = ['#e040fb', '#aa00ff', '#ff4081', '#7c4dff', '#ff80ab'];
    if (currentMode === 'cool') colors = ['#00e5ff', '#ff3d00', '#ffd700', '#304ffe', '#ff1744'];
    if (currentMode === 'space') colors = ['#e040fb', '#00e5ff', '#ffd700', '#76ff03', '#ff4081'];
    if (currentMode === 'pixel') colors = ['#76ff03', '#ff1744', '#ffd700', '#00e5ff', '#b71c1c'];
    if (currentMode === 'yokai') colors = ['#b9f6ca', '#e040fb', '#ffd700', '#ff1744', '#7c4dff'];
    if (currentMode === 'dino') colors = ['#76ff03', '#ff9100', '#42a5f5', '#ff4081', '#ffd700'];
    if (currentMode === 'car') colors = ['#ff9100', '#00e5ff', '#ff1744', '#ffd700', '#2979ff'];
    if (currentMode === 'sweets') colors = ['#ff80ab', '#ea80fc', '#ffd700', '#80d8ff', '#ff4081'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const capsule = document.createElement('div');
    capsule.className = 'gacha-capsule';
    capsule.style.backgroundColor = randomColor;

    capsule.addEventListener('click', () => {
      openCapsule();
    });

    droppedArea.appendChild(capsule);
  }

  function openCapsule() {
    droppedArea.innerHTML = '';
    playSound('pop');

    const chars = getActiveCharacters();
    const collection = getActiveCollection();

    const selectedChar = drawGacha(chars);
    collection[selectedChar.id] = (collection[selectedChar.id] || 0) + 1;
    saveCollection();
    renderZukan();

    if (resultRarity) {
      resultRarity.textContent = selectedChar.rarityLabel;
      resultRarity.className = `rarity-badge ${selectedChar.rarityClass}`;
    }
    if (resultName) resultName.textContent = selectedChar.name;
    if (resultDesc) resultDesc.textContent = selectedChar.description;
    if (resultImg) resultImg.src = selectedChar.getImage();

    if (resultModal) resultModal.classList.remove('hidden');

    if (selectedChar.rarity === 'UR' || selectedChar.rarity === 'SSR') {
      playSound('fanfare');
      launchConfetti();
    }
  }

  function drawGacha(chars) {
    const rand = Math.random() * 100;
    if (rand < 8) {
      return chars.find(c => c.rarity === 'UR') || chars[0];
    } else if (rand < 35) {
      const ssrs = chars.filter(c => c.rarity === 'SSR');
      return ssrs[Math.floor(Math.random() * ssrs.length)];
    } else if (rand < 65) {
      const srs = chars.filter(c => c.rarity === 'SR');
      return srs[Math.floor(Math.random() * srs.length)];
    } else {
      const rs = chars.filter(c => c.rarity === 'R');
      return rs[Math.floor(Math.random() * rs.length)];
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (resultModal) resultModal.classList.add('hidden');
    });
  }

  function openZukanDetail(char) {
    const collection = getActiveCollection();
    const count = collection[char.id] || 0;
    if (count <= 0) return;

    playSound('pop');

    if (detailRarity) {
      detailRarity.textContent = char.rarityLabel;
      detailRarity.className = `rarity-badge ${char.rarityClass}`;
    }
    if (detailName) detailName.textContent = char.name;
    if (detailHabitat) detailHabitat.textContent = char.habitat;
    if (detailFavorite) detailFavorite.textContent = char.favorite;
    if (detailCount) detailCount.textContent = count;
    if (detailDesc) detailDesc.textContent = char.description;
    if (detailImg) detailImg.src = char.getImage();

    if (zukanDetailModal) zukanDetailModal.classList.remove('hidden');
  }

  if (closeDetailBtn) {
    closeDetailBtn.addEventListener('click', () => {
      if (zukanDetailModal) zukanDetailModal.classList.add('hidden');
    });
  }
  if (detailBackdrop) {
    detailBackdrop.addEventListener('click', () => {
      if (zukanDetailModal) zukanDetailModal.classList.add('hidden');
    });
  }

  function updateUI() {
    if (coinCountEl) coinCountEl.textContent = userCoins;
    if (insertCoinBtn) insertCoinBtn.disabled = isCoinInserted || isTurning || userCoins <= 0;
    if (turnHandleBtn) turnHandleBtn.disabled = !isCoinInserted || isTurning;
    if (tenGachaBtn) tenGachaBtn.disabled = isTurning || userCoins < 10;
  }

  function renderZukan() {
    if (!zukanGrid) return;
    zukanGrid.innerHTML = '';
    let obtainedTypes = 0;
    const chars = getActiveCharacters();
    const collection = getActiveCollection();

    chars.forEach(char => {
      const count = collection[char.id] || 0;
      const isObtained = count > 0;
      if (isObtained) obtainedTypes++;

      let showByFilter = false;
      if (currentFilter === 'all') showByFilter = true;
      else if (currentFilter === 'R' && char.rarity === 'R') showByFilter = true;
      else if (currentFilter === 'SSR' && (char.rarity === 'SR' || char.rarity === 'SSR')) showByFilter = true;
      else if (currentFilter === 'UR' && char.rarity === 'UR') showByFilter = true;

      if (!showByFilter) return;

      const card = document.createElement('div');
      card.className = `zukan-card ${isObtained ? 'obtained' : 'locked'}`;

      card.innerHTML = `
        <div class="zukan-img-wrapper">
          ${isObtained ? `<img src="${char.getImage()}" alt="${char.name}"/>` : `<span style="font-size: 2.5rem; color: #bdbdbd;">❓</span>`}
        </div>
        <div class="zukan-card-name">${isObtained ? char.name : '？？？？'}</div>
        <div class="zukan-card-count">${isObtained ? count + '人' : 'まだ'}</div>
      `;

      if (isObtained) {
        card.addEventListener('click', () => {
          openZukanDetail(char);
        });
      }

      zukanGrid.appendChild(card);
    });

    if (zukanCountEl) zukanCountEl.textContent = obtainedTypes;
    if (zukanTotalEl) zukanTotalEl.textContent = chars.length;

    const percent = Math.round((obtainedTypes / chars.length) * 100);
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressText) progressText.textContent = percent + '%';

    if (completeBadge) {
      if (obtainedTypes === chars.length) {
        completeBadge.classList.remove('hidden');
      } else {
        completeBadge.classList.add('hidden');
      }
    }
  }

  function saveCollection() {
    try {
      localStorage.setItem('sushi_gacha_col', JSON.stringify(sushiCollection || {}));
      localStorage.setItem('pan_gacha_col', JSON.stringify(panCollection || {}));
      localStorage.setItem('mahou_gacha_col', JSON.stringify(mahouCollection || {}));
      localStorage.setItem('food_gacha_col', JSON.stringify(foodCollection || {}));
      localStorage.setItem('sea_gacha_col', JSON.stringify(seaCollection || {}));
      localStorage.setItem('kawaii_gacha_col', JSON.stringify(kawaiiCollection || {}));
      localStorage.setItem('idol_gacha_col', JSON.stringify(idolCollection || {}));
      localStorage.setItem('cool_gacha_col', JSON.stringify(coolCollection || {}));
      localStorage.setItem('space_gacha_col', JSON.stringify(spaceCollection || {}));
      localStorage.setItem('pixel_gacha_col', JSON.stringify(pixelCollection || {}));
      localStorage.setItem('yokai_gacha_col', JSON.stringify(yokaiCollection || {}));
      localStorage.setItem('dino_gacha_col', JSON.stringify(dinoCollection || {}));
      localStorage.setItem('car_gacha_col', JSON.stringify(carCollection || {}));
      localStorage.setItem('sweets_gacha_col', JSON.stringify(sweetsCollection || {}));
      localStorage.setItem('pet_gacha_col', JSON.stringify(petCollection || {}));
      localStorage.setItem('gacha_coins', (userCoins || 10).toString());
    } catch (e) {}
  }

  function loadCollection() {
    try {
      const parseSafe = (key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try { return JSON.parse(item); } catch (e) { return null; }
      };

      sushiCollection = Object.assign({}, sushiCollection, parseSafe('sushi_gacha_col') || {});
      panCollection = Object.assign({}, panCollection, parseSafe('pan_gacha_col') || {});
      mahouCollection = Object.assign({}, mahouCollection, parseSafe('mahou_gacha_col') || {});
      foodCollection = Object.assign({}, foodCollection, parseSafe('food_gacha_col') || {});
      seaCollection = Object.assign({}, seaCollection, parseSafe('sea_gacha_col') || {});
      kawaiiCollection = Object.assign({}, kawaiiCollection, parseSafe('kawaii_gacha_col') || {});
      idolCollection = Object.assign({}, idolCollection, parseSafe('idol_gacha_col') || {});
      coolCollection = Object.assign({}, coolCollection, parseSafe('cool_gacha_col') || {});
      spaceCollection = Object.assign({}, spaceCollection, parseSafe('space_gacha_col') || {});
      pixelCollection = Object.assign({}, pixelCollection, parseSafe('pixel_gacha_col') || {});
      yokaiCollection = Object.assign({}, yokaiCollection, parseSafe('yokai_gacha_col') || {});
      dinoCollection = Object.assign({}, dinoCollection, parseSafe('dino_gacha_col') || {});
      carCollection = Object.assign({}, carCollection, parseSafe('car_gacha_col') || {});
      sweetsCollection = Object.assign({}, sweetsCollection, parseSafe('sweets_gacha_col') || {});
      petCollection = Object.assign({}, petCollection, parseSafe('pet_gacha_col') || {});

      const savedCoins = localStorage.getItem('gacha_coins');
      if (savedCoins !== null && !isNaN(parseInt(savedCoins, 10))) {
        userCoins = parseInt(savedCoins, 10);
      }
    } catch (e) {}
  }

  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ffd700', '#ff4081', '#00e676', '#29b6f6', '#ff9100'];

    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 5 + 3,
        speedX: Math.random() * 4 - 2,
        rotation: Math.random() * 360
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speedY; p.x += p.speedX; p.rotation += 2;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frame++;
      if (frame < 120) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGachaApp);
} else {
  initGachaApp();
}
