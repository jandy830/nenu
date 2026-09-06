// 🎨 パンイラスト描画（ウサ耳＆ユニコーンの角をバッチリ生やす！）
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
    // 🐰 チョココロネうさぎ（ぴょんと立った長いウサ耳を生やす！）
    // うさぎの長〜い耳（2本）
    ctx.beginPath();
    ctx.ellipse(cx - 56, cy - 28, 9, 28, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx - 38, cy - 28, 9, 28, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#ff8a80'; ctx.lineWidth = 3.5; ctx.stroke();

    // 耳の内側ピンク
    ctx.beginPath();
    ctx.ellipse(cx - 56, cy - 28, 4.5, 18, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx - 38, cy - 28, 4.5, 18, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#ff8a80'; ctx.fill();

    // チョココロネの巻き巻きパン
    for (let i = 4; i >= 0; i--) {
      ctx.beginPath();
      ctx.ellipse(cx - 25 + i * 22, cy + 8 - i * 5, 18 + i * 4, 25 + i * 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#ffe082' : '#ffb74d'; ctx.fill();
      ctx.strokeStyle = '#f57c00'; ctx.lineWidth = 3; ctx.stroke();
    }

    // うさぎ顔
    ctx.beginPath(); ctx.arc(cx - 45, cy + 8, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 3; ctx.stroke();

    // 目・鼻・ほっぺ
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
    // 🦄 虹色フレンチトーストユニコーン（七色に光る魔法の角を生やす！）
    // ユニコーンのツノ（虹色グラデーション）
    const hornGrad = ctx.createLinearGradient(cx - 10, cy - 70, cx + 10, cy - 30);
    hornGrad.addColorStop(0, '#ff4081');
    hornGrad.addColorStop(0.3, '#ffd700');
    hornGrad.addColorStop(0.7, '#00e5ff');
    hornGrad.addColorStop(1, '#e040fb');

    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 30);
    ctx.lineTo(cx, cy - 75); // ツノの先っぽ！
    ctx.lineTo(cx + 16, cy - 30);
    ctx.closePath();
    ctx.fillStyle = hornGrad; ctx.fill();
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3; ctx.stroke();

    // ツノのねじりスジ
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy - 42); ctx.lineTo(cx + 6, cy - 50);
    ctx.moveTo(cx - 6, cy - 55); ctx.lineTo(cx + 4, cy - 62);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();

    // フレンチトーストパン
    ctx.beginPath(); ctx.roundRect(cx - 55, cy - 30, 110, 80, 18);
    ctx.fillStyle = '#fff59d'; ctx.fill();
    ctx.strokeStyle = '#fbc02d'; ctx.lineWidth = 5; ctx.stroke();

    // こんがり焼き目
    ctx.beginPath(); ctx.roundRect(cx - 45, cy - 20, 90, 60, 12);
    ctx.fillStyle = '#ffe082'; ctx.fill();

    // ユニコーンのお目々（パッチリ＆まつ毛）
    ctx.beginPath(); ctx.arc(cx - 22, cy + 5, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#4a148c'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 20, cy + 3, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();

    // メープルシロップ
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 18);
    ctx.bezierCurveTo(cx, cy + 38, cx + 30, cy + 12, cx + 45, cy + 28);
    ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();
  }

  return canvas.toDataURL();
}
