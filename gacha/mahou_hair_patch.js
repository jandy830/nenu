// 🎨 魔法少女イラスト描画（髪の毛たっぷり＆ゆめかわ可愛い手描き描画）
function createMahouDataUrl(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 200; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 200, 200);

  const cx = 100, cy = 115;

  // 影
  ctx.beginPath();
  ctx.ellipse(cx, cy + 55, 55, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(225, 190, 231, 0.4)'; ctx.fill();

  if (type === 'stella') {
    // 🧹 見習い魔女っ子ステラ (ふわふわボリュームあふれるピンクのツインテール)
    // 後ろ髪（ロングツインテール）
    ctx.beginPath();
    ctx.ellipse(cx - 48, cy, 22, 45, -0.3, 0, Math.PI * 2);
    ctx.ellipse(cx + 48, cy, 22, 45, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();
    ctx.strokeStyle = '#f50057'; ctx.lineWidth = 3; ctx.stroke();

    // ドレス
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 45, cy + 50); ctx.lineTo(cx + 45, cy + 50); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#ea80fc'; ctx.fill();
    ctx.strokeStyle = '#aa00ff'; ctx.lineWidth = 3; ctx.stroke();

    // 顔ベース
    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // 前髪＆サイドヘア（たっぷり！）
    ctx.beginPath();
    ctx.arc(cx - 15, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx + 15, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx, cy - 28, 18, 0, Math.PI * 2);
    ctx.ellipse(cx - 24, cy - 10, 10, 20, 0.1, 0, Math.PI * 2);
    ctx.ellipse(cx + 24, cy - 10, 10, 20, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    // 瞳
    ctx.beginPath(); ctx.ellipse(cx - 11, cy - 10, 5, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 11, cy - 10, 5, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d500f9'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 9, cy - 12, 2, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 12, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // にっこり口
    ctx.beginPath(); ctx.arc(cx, cy + 2, 3.5, 0, Math.PI);
    ctx.strokeStyle = '#c51162'; ctx.lineWidth = 2; ctx.stroke();

    // 魔女帽子
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 30); ctx.lineTo(cx, cy - 78); ctx.lineTo(cx + 35, cy - 30);
    ctx.fillStyle = '#7c4dff'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, cy - 30, 42, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#651fff'; ctx.fill();

  } else if (type === 'moon') {
    // 🌙 月うさぎマホ (ストレート金髪ロングヘア)
    // 後ろ髪ロング
    ctx.beginPath();
    ctx.roundRect(cx - 40, cy - 30, 80, 85, 20);
    ctx.fillStyle = '#ffecb3'; ctx.fill();
    ctx.strokeStyle = '#ffa000'; ctx.lineWidth = 3; ctx.stroke();

    // ドレス
    ctx.beginPath();
    ctx.moveTo(cx - 25, cy + 10); ctx.lineTo(cx - 40, cy + 50); ctx.lineTo(cx + 40, cy + 50); ctx.lineTo(cx + 25, cy + 10);
    ctx.fillStyle = '#80d8ff'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // 金髪前髪＆サイド
    ctx.beginPath();
    ctx.arc(cx - 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.ellipse(cx - 25, cy - 5, 10, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 25, cy - 5, 10, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd54f'; ctx.fill();

    // 瞳
    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#00b0ff'; ctx.fill();

    // ウサ耳
    ctx.beginPath();
    ctx.ellipse(cx - 18, cy - 55, 9, 28, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy - 55, 9, 28, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#ff80ab'; ctx.lineWidth = 3; ctx.stroke();

  } else if (type === 'sakura') {
    // 🌸 桜の妖精フローラ (フワフワ桜色ウェーブロング)
    // 後ろ髪ウェーブ
    ctx.beginPath();
    ctx.arc(cx - 30, cy + 10, 25, 0, Math.PI * 2);
    ctx.arc(cx + 30, cy + 10, 25, 0, Math.PI * 2);
    ctx.arc(cx, cy + 15, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    // ドレス
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 50, cy + 52); ctx.lineTo(cx + 50, cy + 52); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#f8bbd0'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // 桜色前髪
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 25, 16, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 25, 16, 0, Math.PI * 2);
    ctx.ellipse(cx - 24, cy - 5, 9, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 24, cy - 5, 9, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    // 瞳
    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#c51162'; ctx.fill();

  } else if (type === 'crystal') {
    // 💎 クリスタルプリンセス ルナ (紫色姫カットロングヘア)
    // 後ろ髪
    ctx.beginPath();
    ctx.roundRect(cx - 42, cy - 30, 84, 85, 15);
    ctx.fillStyle = '#b388ff'; ctx.fill();

    // ドレス
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 10); ctx.lineTo(cx - 50, cy + 52); ctx.lineTo(cx + 50, cy + 52); ctx.lineTo(cx + 30, cy + 10);
    ctx.fillStyle = '#e1bee7'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // 紫前髪＆姫カットサイド
    ctx.beginPath();
    ctx.arc(cx - 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.rect(cx - 28, cy - 18, 10, 26);
    ctx.rect(cx + 18, cy - 18, 10, 26);
    ctx.fillStyle = '#7c4dff'; ctx.fill();

    // 瞳
    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#6200ea'; ctx.fill();

    // ティアラ
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy - 32); ctx.lineTo(cx, cy - 55); ctx.lineTo(cx + 20, cy - 32);
    ctx.fillStyle = '#80d8ff'; ctx.fill();
    ctx.strokeStyle = '#00b0ff'; ctx.lineWidth = 3; ctx.stroke();

  } else if (type === 'cat') {
    // 🐈‍⬛ 黒猫使いルシエ (ダークパープルのボブ＆猫耳ヘア)
    // 後ろ髪ボブ
    ctx.beginPath();
    ctx.arc(cx, cy - 5, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#4a148c'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // 前髪
    ctx.beginPath();
    ctx.arc(cx - 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.arc(cx + 12, cy - 24, 15, 0, Math.PI * 2);
    ctx.ellipse(cx - 25, cy - 8, 8, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 25, cy - 8, 8, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#311b92'; ctx.fill();

    // 瞳
    ctx.beginPath(); ctx.ellipse(cx - 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 10, 5, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#00e676'; ctx.fill();

    // 帽子
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 28); ctx.lineTo(cx, cy - 68); ctx.lineTo(cx + 30, cy - 28);
    ctx.fillStyle = '#1a237e'; ctx.fill();

  } else if (type === 'galaxy') {
    // 👑 銀河の女神プリンセスステラ (七色に輝く超ロングヘア)
    // 超ロング髪
    ctx.beginPath();
    ctx.roundRect(cx - 50, cy - 35, 100, 95, 25);
    ctx.fillStyle = '#ff80ab'; ctx.fill();

    // 翼
    ctx.beginPath();
    ctx.ellipse(cx - 52, cy - 10, 25, 45, -0.4, 0, Math.PI * 2);
    ctx.ellipse(cx + 52, cy - 10, 25, 45, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)'; ctx.fill();

    // ドレス
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy + 10); ctx.lineTo(cx - 60, cy + 52); ctx.lineTo(cx + 60, cy + 52); ctx.lineTo(cx + 35, cy + 10);
    ctx.fillStyle = '#ea80fc'; ctx.fill();

    // 顔
    ctx.beginPath(); ctx.arc(cx, cy - 10, 27, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0b2'; ctx.fill();

    // ゴージャス前髪
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 26, 16, 0, Math.PI * 2);
    ctx.arc(cx + 14, cy - 26, 16, 0, Math.PI * 2);
    ctx.ellipse(cx - 26, cy - 6, 10, 24, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 26, cy - 6, 10, 24, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4081'; ctx.fill();

    // 宝冠
    ctx.beginPath();
    ctx.moveTo(cx - 25, cy - 38); ctx.lineTo(cx - 35, cy - 70); ctx.lineTo(cx, cy - 50); ctx.lineTo(cx + 35, cy - 70); ctx.lineTo(cx + 25, cy - 38);
    ctx.fillStyle = '#ffd700'; ctx.fill();
    ctx.strokeStyle = '#ff6f00'; ctx.lineWidth = 3; ctx.stroke();

    // 瞳
    ctx.beginPath(); ctx.ellipse(cx - 11, cy - 10, 6, 9, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 11, cy - 10, 6, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d500f9'; ctx.fill();
  }

  return canvas.toDataURL();
}
