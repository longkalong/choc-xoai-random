const INK = '#4a2d1b';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export function drawSpeechBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  scale = 1,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.font = '800 21px "Be Vietnam Pro", sans-serif';
  const metrics = ctx.measureText(text);
  const padX = 20;
  const w = Math.max(150, metrics.width + padX * 2);
  const h = 48;

  ctx.fillStyle = 'rgba(74, 45, 27, 0.16)';
  drawRoundedRect(ctx, -w / 2 + 4, -h + 5, w, h, 22);
  ctx.fill();

  ctx.fillStyle = '#fffdf5';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.6;
  drawRoundedRect(ctx, -w / 2, -h, w, h, 22);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-12, -2);
  ctx.lineTo(-22, 15);
  ctx.lineTo(8, -2);
  ctx.closePath();
  ctx.fillStyle = '#fffdf5';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-12, -1);
  ctx.lineTo(-22, 15);
  ctx.lineTo(8, -1);
  ctx.stroke();

  ctx.fillStyle = '#b43b1f';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, -h / 2 + 1);
  ctx.restore();
}

export function drawExclamationBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  symbol: '?' | '!' | '💧',
  alpha = 1,
) {
  if (alpha <= 0.02) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);

  ctx.fillStyle = '#fff9e8';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 19, 21, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.font = '800 22px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = symbol === '?' ? '#356c96' : '#d64526';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, 0, 1);
  ctx.restore();
}

export function drawMangoTreeTrunk(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = 'rgba(65, 52, 34, 0.22)';
  ctx.beginPath();
  ctx.ellipse(935, 608, 120, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  const barkGrad = ctx.createLinearGradient(835, 220, 1015, 605);
  barkGrad.addColorStop(0, '#966b47');
  barkGrad.addColorStop(0.35, '#7c5335');
  barkGrad.addColorStop(1, '#583721');

  ctx.fillStyle = barkGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3.2;
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(855, 605);
  ctx.quadraticCurveTo(892, 575, 895, 515);
  ctx.quadraticCurveTo(895, 435, 875, 360);
  ctx.quadraticCurveTo(790, 315, 620, 268);
  ctx.quadraticCurveTo(540, 245, 480, 210);
  ctx.lineTo(492, 195);
  ctx.quadraticCurveTo(590, 232, 745, 265);
  ctx.quadraticCurveTo(835, 285, 852, 235);
  ctx.quadraticCurveTo(832, 165, 765, 118);
  ctx.lineTo(784, 108);
  ctx.quadraticCurveTo(860, 158, 895, 225);
  ctx.quadraticCurveTo(920, 175, 985, 120);
  ctx.lineTo(1002, 132);
  ctx.quadraticCurveTo(955, 192, 938, 252);
  ctx.quadraticCurveTo(1030, 242, 1140, 208);
  ctx.lineTo(1148, 225);
  ctx.quadraticCurveTo(1045, 268, 955, 296);
  ctx.quadraticCurveTo(958, 410, 968, 520);
  ctx.quadraticCurveTo(975, 580, 1020, 605);
  ctx.quadraticCurveTo(940, 615, 855, 605);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = 'rgba(232, 189, 137, 0.45)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(902, 575);
  ctx.quadraticCurveTo(908, 460, 895, 375);
  ctx.moveTo(922, 520);
  ctx.quadraticCurveTo(924, 420, 916, 330);
  ctx.moveTo(852, 328);
  ctx.quadraticCurveTo(750, 286, 635, 255);
  ctx.stroke();

  ctx.fillStyle = 'rgba(92, 140, 62, 0.55)';
  ctx.beginPath();
  ctx.ellipse(905, 588, 18, 8, -0.2, 0, Math.PI * 2);
  ctx.ellipse(962, 594, 14, 6, 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

const CANOPY_CLUSTERS = [
  { x: 620, y: 155, rx: 195, ry: 112, phase: 0.2, tone: 'back' },
  { x: 865, y: 125, rx: 225, ry: 120, phase: 1.1, tone: 'back' },
  { x: 1100, y: 170, rx: 175, ry: 108, phase: 2.0, tone: 'back' },
  { x: 485, y: 215, rx: 165, ry: 98, phase: 0.7, tone: 'mid' },
  { x: 755, y: 215, rx: 215, ry: 112, phase: 1.8, tone: 'mid' },
  { x: 1020, y: 228, rx: 195, ry: 108, phase: 2.7, tone: 'mid' },
  { x: 610, y: 98, rx: 155, ry: 82, phase: 1.4, tone: 'front' },
  { x: 925, y: 92, rx: 175, ry: 86, phase: 0.4, tone: 'front' },
  { x: 1145, y: 255, rx: 130, ry: 86, phase: 2.3, tone: 'front' },
];

export function drawTreeCanopyBack(ctx: CanvasRenderingContext2D, windTime: number) {
  CANOPY_CLUSTERS.forEach((c) => {
    const swayX = Math.sin(windTime * 1.4 + c.phase) * 7;
    const swayY = Math.cos(windTime * 1.9 + c.phase) * 3;
    ctx.save();
    ctx.translate(c.x + swayX, c.y + swayY);

    const grad = ctx.createRadialGradient(-c.rx * 0.22, -c.ry * 0.38, 12, 0, 0, c.rx * 1.08);
    if (c.tone === 'back') {
      grad.addColorStop(0, '#5a9942');
      grad.addColorStop(0.55, '#3b7533');
      grad.addColorStop(1, '#245224');
    } else if (c.tone === 'mid') {
      grad.addColorStop(0, '#78b84e');
      grad.addColorStop(0.6, '#488839');
      grad.addColorStop(1, '#2b612a');
    } else {
      grad.addColorStop(0, '#9bd35f');
      grad.addColorStop(0.52, '#5c9f42');
      grad.addColorStop(1, '#346f2f');
    }

    ctx.fillStyle = grad;
    ctx.strokeStyle = 'rgba(34, 68, 30, 0.72)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    const lobes = 11;
    for (let i = 0; i <= lobes; i++) {
      const a0 = (i / lobes) * Math.PI * 2;
      const a1 = ((i + 0.5) / lobes) * Math.PI * 2;
      const a2 = ((i + 1) / lobes) * Math.PI * 2;
      const px0 = Math.cos(a0) * c.rx * 0.92;
      const py0 = Math.sin(a0) * c.ry * 0.92;
      const cx = Math.cos(a1) * c.rx * 1.12;
      const cy = Math.sin(a1) * c.ry * 1.12;
      const px2 = Math.cos(a2) * c.rx * 0.92;
      const py2 = Math.sin(a2) * c.ry * 0.92;
      if (i === 0) ctx.moveTo(px0, py0);
      ctx.quadraticCurveTo(cx, cy, px2, py2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(31, 74, 30, 0.25)';
    for (let k = -2; k <= 2; k++) {
      ctx.beginPath();
      ctx.ellipse(k * c.rx * 0.28, c.ry * 0.42, 32, 16, k * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(205, 239, 126, 0.34)';
    for (let j = -2; j <= 2; j++) {
      ctx.beginPath();
      ctx.ellipse(j * c.rx * 0.28 - 10, -c.ry * 0.38 + Math.abs(j) * 10, 30, 13, -0.35 + j * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
}

export function drawCeramicPlateAndSalt(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  saltFill: number,
  appearScale = 1,
) {
  if (appearScale <= 0.01) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(appearScale, appearScale);

  ctx.fillStyle = 'rgba(74, 45, 27, 0.24)';
  ctx.beginPath();
  ctx.ellipse(2, 7, 50, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  const plateGrad = ctx.createLinearGradient(-46, -12, 46, 14);
  plateGrad.addColorStop(0, '#ffffff');
  plateGrad.addColorStop(0.65, '#f2eee6');
  plateGrad.addColorStop(1, '#d8d2c7');
  ctx.fillStyle = plateGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 48, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#527da6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, -1, 38, 10.5, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#eae5dc';
  ctx.beginPath();
  ctx.ellipse(0, 0, 29, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  if (saltFill > 0.02) {
    const h = 20 * Math.min(1, saltFill);
    const w = 26 * Math.min(1, 0.35 + saltFill * 0.65);

    const saltGrad = ctx.createLinearGradient(0, -h, 0, 4);
    saltGrad.addColorStop(0, '#f37021');
    saltGrad.addColorStop(0.6, '#d94518');
    saltGrad.addColorStop(1, '#a92c11');

    ctx.fillStyle = saltGrad;
    ctx.strokeStyle = '#751f0b';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-w, 2);
    ctx.quadraticCurveTo(-w * 0.45, -h * 0.85, 0, -h);
    ctx.quadraticCurveTo(w * 0.45, -h * 0.85, w, 2);
    ctx.quadraticCurveTo(0, 7, -w, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffbe73';
    for (let i = 0; i < 8; i++) {
      const px = Math.sin(i * 2.7) * w * 0.55;
      const py = -h * (0.2 + ((i * 37) % 10) * 0.055);
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

export function drawBambooPole(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  extraTail = 36,
  chargeGlow = 0,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 10) return;

  const angle = Math.atan2(dy, dx);
  ctx.save();
  ctx.translate(x1, y1);
  ctx.rotate(angle);

  const startX = -extraTail;
  const endX = len;

  if (chargeGlow > 0.05) {
    ctx.shadowColor = `rgba(255, 208, 64, ${0.85 * chargeGlow})`;
    ctx.shadowBlur = 18 * chargeGlow;
  }

  ctx.strokeStyle = INK;
  ctx.lineWidth = 8.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(startX, 0);
  ctx.lineTo(endX - 18, 0);
  ctx.stroke();

  const bamGrad = ctx.createLinearGradient(0, -4, 0, 4);
  bamGrad.addColorStop(0, '#e5cf7b');
  bamGrad.addColorStop(0.5, '#b69e47');
  bamGrad.addColorStop(1, '#7c6b2c');
  ctx.strokeStyle = bamGrad;
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(startX, 0);
  ctx.lineTo(endX - 18, 0);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = '#5a451c';
  ctx.lineWidth = 2;
  for (let nx = startX + 35; nx < endX - 24; nx += 58) {
    ctx.beginPath();
    ctx.moveTo(nx, -3.8);
    ctx.lineTo(nx, 3.8);
    ctx.stroke();
  }

  ctx.strokeStyle = INK;
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(endX - 22, 0);
  ctx.lineTo(endX, -11);
  ctx.moveTo(endX - 22, 0);
  ctx.lineTo(endX, 11);
  ctx.stroke();

  ctx.strokeStyle = '#cfa95c';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(endX - 22, 0);
  ctx.lineTo(endX, -11);
  ctx.moveTo(endX - 22, 0);
  ctx.lineTo(endX, 11);
  ctx.stroke();

  if (chargeGlow > 0.15) {
    ctx.fillStyle = `rgba(255, 232, 115, ${0.85 * chargeGlow})`;
    ctx.beginPath();
    ctx.arc(endX, 0, 8 * chargeGlow, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ---------- HIGH-CRAFT GHIBLI ANIME CHARACTER ANATOMY ----------

function drawTwoSegLimb(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  w1: number,
  w2: number,
  skinBase: string,
  skinShadow: string,
) {
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Outline pass
  ctx.strokeStyle = INK;
  ctx.lineWidth = w1 + 3.6;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Warm shadow underside
  ctx.strokeStyle = skinShadow;
  ctx.lineWidth = w1;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  // Sunlit skin pass
  ctx.strokeStyle = skinBase;
  ctx.lineWidth = w2;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawShoe(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rot: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  // White anime sock cuff
  ctx.fillStyle = '#fff9ee';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  drawRoundedRect(ctx, -4, -9, 9, 6, 2);
  ctx.fill();
  ctx.stroke();

  // Rounded canvas shoe / sandal
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-6, -4);
  ctx.quadraticCurveTo(4, -7, 12, -2);
  ctx.quadraticCurveTo(13, 3, 5, 3);
  ctx.lineTo(-6, 3);
  ctx.quadraticCurveTo(-8, -1, -6, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Sole highlight
  ctx.strokeStyle = '#fff7e8';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-5, 1.5);
  ctx.lineTo(10, 1.5);
  ctx.stroke();
  ctx.restore();
}

function drawAnimeFaceBase(
  ctx: CanvasRenderingContext2D,
  skinColor: string,
  cheekShadow: string,
  expression: 'happy' | 'focused' | 'amazed' | 'determined' | 'cheer',
) {
  // Soft rounded Ghibli anime face + chin
  const faceGrad = ctx.createRadialGradient(-4, -5, 2, 0, 2, 22);
  faceGrad.addColorStop(0, '#fff0df');
  faceGrad.addColorStop(0.65, skinColor);
  faceGrad.addColorStop(1, cheekShadow);

  ctx.fillStyle = faceGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-15, -8);
  ctx.quadraticCurveTo(-17, 10, -6, 17);
  ctx.quadraticCurveTo(3, 21, 12, 16);
  ctx.quadraticCurveTo(19, 9, 17, -7);
  ctx.quadraticCurveTo(14, -19, 0, -19);
  ctx.quadraticCurveTo(-14, -19, -15, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Left ear
  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.ellipse(-15, 2, 3.6, 5.2, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Ghibli expressive eyes (upper lash + glossy brown-black iris + catchlight)
  const eyes = [
    { ex: 1.5, ey: 0.5, rx: 3.6, ry: 4.7 },
    { ex: 12.5, ey: 0.5, rx: 3.1, ry: 4.5 },
  ];
  eyes.forEach(({ ex, ey, rx, ry }) => {
    // Sclera highlight
    ctx.fillStyle = '#fffdf8';
    ctx.beginPath();
    ctx.ellipse(ex, ey, rx + 0.8, ry + 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris
    const irisGrad = ctx.createLinearGradient(ex, ey - ry, ex, ey + ry);
    irisGrad.addColorStop(0, '#1e1310');
    irisGrad.addColorStop(0.75, '#472a1d');
    irisGrad.addColorStop(1, '#75462f');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.ellipse(ex + 0.4, ey + 0.2, rx * 0.88, ry * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Upper Ghibli eyelash arc
    ctx.strokeStyle = '#24140e';
    ctx.lineWidth = 2.1;
    ctx.beginPath();
    ctx.arc(ex, ey + 0.5, rx + 0.6, Math.PI * 1.12, Math.PI * 1.9);
    ctx.stroke();

    // Catchlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ex - 0.8, ey - 1.5, 1.45, 0, Math.PI * 2);
    ctx.fill();
  });

  // Eyebrows
  ctx.strokeStyle = '#2d1c15';
  ctx.lineWidth = 1.9;
  ctx.lineCap = 'round';
  if (expression === 'determined' || expression === 'focused') {
    ctx.beginPath();
    ctx.moveTo(-2, -7.5);
    ctx.lineTo(4.5, -5.5);
    ctx.moveTo(10, -5.5);
    ctx.lineTo(15.5, -7.5);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.quadraticCurveTo(1, -8, 4.5, -6.8);
    ctx.moveTo(-2, -6.5);
    ctx.quadraticCurveTo(1.5, -9, 4.5, -7);
    ctx.moveTo(10, -7);
    ctx.quadraticCurveTo(13, -9, 15.5, -7);
    ctx.stroke();
  }

  // Cute tiny Ghibli nose + warm cheek blush
  ctx.strokeStyle = 'rgba(130, 72, 46, 0.55)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(8.5, 3.5);
  ctx.lineTo(9.8, 5.8);
  ctx.lineTo(8.2, 6.4);
  ctx.stroke();

  ctx.fillStyle = 'rgba(235, 114, 96, 0.36)';
  ctx.beginPath();
  ctx.ellipse(-2.5, 6.8, 4.5, 2.3, 0, 0, Math.PI * 2);
  ctx.ellipse(14.5, 6.8, 3.2, 2.0, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mouth
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.7;
  if (expression === 'amazed') {
    ctx.fillStyle = '#b94433';
    ctx.beginPath();
    ctx.ellipse(7.5, 11, 4, 4.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (expression === 'cheer') {
    ctx.fillStyle = '#cf5242';
    ctx.beginPath();
    ctx.arc(7.5, 9.5, 5.2, 0.05, Math.PI * 0.95);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (expression === 'determined') {
    ctx.beginPath();
    ctx.moveTo(4, 11.5);
    ctx.quadraticCurveTo(8, 9.5, 12, 11.5);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(7.5, 9, 4.2, 0.15, Math.PI * 0.85);
    ctx.stroke();
  }
}

export interface GirlDrawState {
  x: number;
  y: number;
  pose: 'run' | 'place_plate' | 'watch' | 'cheer';
  stride: number;
  lookUp: number;
  windTime: number;
  charImg?: HTMLImageElement | null;
  scale?: number;
}

export function drawGirl(ctx: CanvasRenderingContext2D, s: GirlDrawState) {
  const sc = s.scale ?? 1.0;
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.scale(sc, sc);

  // Soft ground shadow
  ctx.fillStyle = 'rgba(70, 42, 24, 0.22)';
  ctx.beginPath();
  ctx.ellipse(0, 3, 26, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  const crouch = s.pose === 'place_plate' ? 18 : 0;
  const jump = s.pose === 'cheer' ? Math.abs(Math.sin(s.stride * 2.4)) * 16 : 0;
  const bob = s.pose === 'run' ? Math.abs(Math.sin(s.stride * 2)) * 6 : 0;
  const lean = s.pose === 'run' ? 0.08 : s.pose === 'place_plate' ? 0.22 : -s.lookUp * 0.12;

  ctx.translate(0, -jump - bob + crouch * 0.6);
  ctx.rotate(lean);

  if (s.charImg) {
    const drawH = 138;
    const drawW = drawH * (s.charImg.naturalWidth / (s.charImg.naturalHeight || 1));
    ctx.drawImage(s.charImg, -drawW * 0.48, -drawH, drawW, drawH);
    ctx.restore();
    return;
  }

  // Fallback procedural vector if image not loaded

  const legSwing = s.pose === 'run' ? Math.sin(s.stride * 2) * 18 : 0;
  const kneeBendBack = s.pose === 'place_plate' ? 12 : Math.max(0, -legSwing * 0.35);
  const kneeBendFront = s.pose === 'place_plate' ? 14 : Math.max(0, legSwing * 0.35);

  // Back leg
  const bFootX = -5 - legSwing * 0.85;
  const bKneeX = -3 - legSwing * 0.4 + kneeBendBack * 0.3;
  drawTwoSegLimb(ctx, -4, -38 + crouch * 0.6, bKneeX, -20 + crouch * 0.3, bFootX, -4, 8, 7, '#f5c7a7', '#dca784');
  drawShoe(ctx, bFootX + 2, -2, s.pose === 'run' ? -0.15 : 0, '#c75a42');

  // Front leg
  const fFootX = 5 + legSwing * 0.85;
  const fKneeX = 5 + legSwing * 0.45 + kneeBendFront * 0.35;
  drawTwoSegLimb(ctx, 4, -38 + crouch * 0.6, fKneeX, -20 + crouch * 0.3, fFootX, -4, 8, 7, '#fbd7bc', '#e2b391');
  drawShoe(ctx, fFootX + 2, -2, s.pose === 'run' ? 0.12 : 0, '#d8664c');

  // Torso pivot
  ctx.save();
  ctx.translate(0, -38 + crouch * 0.7);
  ctx.rotate(lean);

  // Relaxed sky-blue culottes / skirt-shorts
  const shortGrad = ctx.createLinearGradient(-15, -16, 15, 6);
  shortGrad.addColorStop(0, '#7eb4e6');
  shortGrad.addColorStop(1, '#4f86bd');
  ctx.fillStyle = shortGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-13, -15);
  ctx.lineTo(13, -15);
  ctx.quadraticCurveTo(18, -2, 16, 6);
  ctx.lineTo(2, 6);
  ctx.lineTo(0, -2);
  ctx.lineTo(-2, 6);
  ctx.lineTo(-16, 6);
  ctx.quadraticCurveTo(-18, -2, -13, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Back arm
  if (s.pose === 'cheer') {
    drawTwoSegLimb(ctx, -10, -42, -18, -56, -24, -72, 7, 6, '#f5c7a7', '#dca784');
  } else if (s.pose === 'place_plate') {
    drawTwoSegLimb(ctx, 8, -40, 19, -24, 30, -8, 7, 6, '#f5c7a7', '#dca784');
  } else {
    drawTwoSegLimb(ctx, -9, -42, -15 - legSwing * 0.25, -28, -19 - legSwing * 0.45, -16, 7, 6, '#f5c7a7', '#dca784');
  }

  // Cream-yellow Ghibli blouse / tee with subtle folds
  const teeGrad = ctx.createLinearGradient(-14, -48, 16, -12);
  teeGrad.addColorStop(0, '#fff2bc');
  teeGrad.addColorStop(0.65, '#f6db8f');
  teeGrad.addColorStop(1, '#dfc06e');
  ctx.fillStyle = teeGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-12, -47);
  ctx.quadraticCurveTo(0, -49, 12, -47);
  ctx.quadraticCurveTo(16, -30, 15, -13);
  ctx.quadraticCurveTo(0, -10, -15, -13);
  ctx.quadraticCurveTo(-16, -30, -12, -47);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Sailor-style soft collar accent
  ctx.fillStyle = '#fff9e4';
  ctx.beginPath();
  ctx.moveTo(-8, -47);
  ctx.lineTo(0, -41);
  ctx.lineTo(8, -47);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Head
  const headTilt = -s.lookUp * 0.28 + (s.pose === 'place_plate' ? 0.14 : 0);
  const hairWave = Math.sin(s.windTime * 4.2) * 2.5 + (s.pose === 'run' ? -4 : 0);
  ctx.save();
  ctx.translate(1, -66);
  ctx.rotate(headTilt);

  // Back Ghibli bob hair fluttering
  ctx.fillStyle = '#2d1f1c';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-18, -8);
  ctx.quadraticCurveTo(-24 + hairWave, 6, -19 + hairWave, 19);
  ctx.quadraticCurveTo(-8, 22, 6, 17);
  ctx.quadraticCurveTo(18, 12, 16, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  drawAnimeFaceBase(
    ctx,
    '#fbd9bd',
    '#e4b795',
    s.pose === 'cheer' ? 'cheer' : 'happy',
  );

  // Front anime bangs + side lock
  ctx.fillStyle = '#2d1f1c';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.9;
  ctx.beginPath();
  ctx.arc(0, -5, 19.2, Math.PI * 0.92, Math.PI * 2.02);
  ctx.quadraticCurveTo(17, -2, 13, -3);
  ctx.lineTo(9, -10);
  ctx.lineTo(5, -2);
  ctx.lineTo(-1, -11);
  ctx.lineTo(-6, -1);
  ctx.quadraticCurveTo(-12, 5, -14, 15);
  ctx.quadraticCurveTo(-21, 5, -19, -5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Warm hair sheen
  ctx.strokeStyle = 'rgba(255, 225, 195, 0.35)';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(-2, -7, 13, Math.PI * 1.15, Math.PI * 1.65);
  ctx.stroke();

  // Red Ghibli hairclip
  ctx.fillStyle = '#e24f3c';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, -11, -9.5, 9, 4.2, 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // Front arm + curved sleeve
  if (s.pose === 'run') {
    drawTwoSegLimb(ctx, 10, -42, 20, -29, 31, -20, 7, 6, '#fbd7bc', '#e2b391');
  } else if (s.pose === 'place_plate') {
    drawTwoSegLimb(ctx, 10, -41, 23, -25, 34, -7, 7, 6, '#fbd7bc', '#e2b391');
  } else if (s.pose === 'cheer') {
    drawTwoSegLimb(ctx, 11, -42, 19, -56, 25, -72, 7, 6, '#fbd7bc', '#e2b391');
  } else {
    drawTwoSegLimb(ctx, 10, -42, 15, -27, 17, -14, 7, 6, '#fbd7bc', '#e2b391');
  }

  // Sleeve cuff
  ctx.fillStyle = '#f6db8f';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.ellipse(11, -41, 6, 7, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
  ctx.restore();
}

export interface Boy1DrawState {
  x: number;
  y: number;
  pose: 'run' | 'pour_salt' | 'search' | 'raise_pole' | 'poke' | 'amazed' | 'cheer';
  stride: number;
  facing: 1 | -1;
  aimAngle: number;
  pokeThrust: number;
  saltJarImg: HTMLImageElement | null;
  charImg?: HTMLImageElement | null;
  scale?: number;
  returnGripPos?: (gx: number, gy: number) => void;
}

export function drawBoy1(ctx: CanvasRenderingContext2D, s: Boy1DrawState) {
  const sc = s.scale ?? 1.0;
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.scale(sc * s.facing, sc);

  ctx.fillStyle = 'rgba(70, 42, 24, 0.22)';
  ctx.beginPath();
  ctx.ellipse(0, 3, 26, 6.5, 0, 0, Math.PI * 2);
  ctx.fill();

  const crouch = s.pose === 'pour_salt' ? 14 : 0;
  const jump = s.pose === 'cheer' ? Math.abs(Math.sin(s.stride * 2.5)) * 16 : 0;
  const bob = s.pose === 'run' ? Math.abs(Math.sin(s.stride * 2)) * 6 : 0;
  const lean = s.pose === 'run' ? 0.08 : s.pose === 'pour_salt' ? 0.18 : 0;
  ctx.translate(0, -jump - bob + crouch * 0.6);
  ctx.rotate(lean);

  if (s.charImg) {
    const drawH = 138;
    const drawW = drawH * (s.charImg.naturalWidth / (s.charImg.naturalHeight || 1));
    ctx.drawImage(s.charImg, -drawW * 0.48, -drawH, drawW, drawH);

    // If pouring salt, draw the tilted salt jar near his hands
    if (s.pose === 'pour_salt' && s.saltJarImg) {
      ctx.save();
      ctx.translate(-drawW * 0.12, -drawH * 0.35);
      ctx.rotate(2.25 + Math.sin(s.stride * 10) * 0.14);
      ctx.drawImage(s.saltJarImg, -17, -26, 34, 52);
      ctx.restore();
    }

    if (s.returnGripPos) {
      const cosL = Math.cos(lean);
      const sinL = Math.sin(lean);
      const localHandX = drawW * 0.28 + Math.cos(s.aimAngle) * (s.pokeThrust * 16);
      const localHandY = -drawH * 0.52 + Math.sin(s.aimAngle) * (s.pokeThrust * 16);
      const rx = localHandX * cosL - localHandY * sinL;
      const ry = localHandX * sinL + localHandY * cosL + crouch * 0.6;
      s.returnGripPos(s.x + rx * sc * s.facing, s.y + (-jump - bob + ry) * sc);
    }

    ctx.restore();
    return;
  }

  const legSwing = s.pose === 'run' ? Math.sin(s.stride * 2 + 0.6) * 18 : 0;
  const stance = s.pose === 'poke' || s.pose === 'raise_pole' ? 11 : 0;

  const bFootX = -5 - stance - legSwing * 0.85;
  drawTwoSegLimb(ctx, -4, -40 + crouch * 0.55, -3 - stance * 0.5 - legSwing * 0.4, -21 + crouch * 0.3, bFootX, -4, 8.5, 7.5, '#f0c19d', '#d6a27b');
  drawShoe(ctx, bFootX + 2, -2, 0, '#4f7f54');

  const fFootX = 5 + stance + legSwing * 0.85;
  drawTwoSegLimb(ctx, 4, -40 + crouch * 0.55, 6 + stance * 0.5 + legSwing * 0.45, -21 + crouch * 0.3, fFootX, -4, 8.5, 7.5, '#f7cda9', '#deb089');
  drawShoe(ctx, fFootX + 2, -2, 0, '#5d9162');

  ctx.save();
  ctx.translate(0, -40 + crouch * 0.65);
  ctx.rotate(lean);

  // Khaki Ghibli shorts
  const shortGrad = ctx.createLinearGradient(-15, -16, 15, 6);
  shortGrad.addColorStop(0, '#d8c298');
  shortGrad.addColorStop(1, '#b1966a');
  ctx.fillStyle = shortGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-14, -15);
  ctx.lineTo(14, -15);
  ctx.lineTo(16, 6);
  ctx.lineTo(2, 6);
  ctx.lineTo(0, -2);
  ctx.lineTo(-2, 6);
  ctx.lineTo(-16, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (s.pose === 'cheer') {
    drawTwoSegLimb(ctx, -10, -44, -19, -59, -25, -75, 7.5, 6.5, '#f0c19d', '#d6a27b');
  } else if (s.pose === 'run') {
    drawTwoSegLimb(ctx, -10, -44, -18, -31, -28, -22, 7.5, 6.5, '#f0c19d', '#d6a27b');
  }

  // Terracotta striped Ghibli t-shirt
  const shirtGrad = ctx.createLinearGradient(-15, -50, 16, -12);
  shirtGrad.addColorStop(0, '#ef8b54');
  shirtGrad.addColorStop(0.65, '#de6b35');
  shirtGrad.addColorStop(1, '#bc5022');
  ctx.fillStyle = shirtGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-13, -49);
  ctx.quadraticCurveTo(0, -51, 13, -49);
  ctx.quadraticCurveTo(17, -30, 16, -13);
  ctx.quadraticCurveTo(0, -10, -16, -13);
  ctx.quadraticCurveTo(-17, -30, -13, -49);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fae1ae';
  ctx.fillRect(-13.5, -36, 27, 4.5);
  ctx.fillRect(-14.5, -24, 29, 4.5);

  // Head
  const lookUpAngle =
    s.pose === 'poke' || s.pose === 'raise_pole'
      ? -0.32
      : s.pose === 'pour_salt'
        ? 0.22
        : 0;
  ctx.save();
  ctx.translate(1, -68);
  ctx.rotate(lookUpAngle);

  drawAnimeFaceBase(
    ctx,
    '#fad9ba',
    '#e2b48d',
    s.pose === 'amazed' ? 'amazed' : s.pose === 'cheer' ? 'cheer' : s.pose === 'poke' ? 'focused' : 'happy',
  );

  // Tousled Ghibli dark hair
  ctx.fillStyle = '#2a1f1c';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.9;
  ctx.beginPath();
  ctx.arc(0, -5, 19, Math.PI * 0.9, Math.PI * 2.04);
  ctx.lineTo(16, -3);
  ctx.lineTo(12, -10);
  ctx.lineTo(6, -2);
  ctx.lineTo(0, -11);
  ctx.lineTo(-6, -2);
  ctx.lineTo(-12, -8);
  ctx.lineTo(-18, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // Front arm + props
  if (s.pose === 'pour_salt') {
    const handX = 25;
    const handY = -33 + Math.sin(s.stride * 8) * 3;
    drawTwoSegLimb(ctx, 10, -44, 18, -36, handX, handY, 7.5, 6.5, '#f7cda9', '#deb089');
    if (s.saltJarImg) {
      ctx.save();
      ctx.translate(handX + 8, handY + 5);
      ctx.rotate(2.25 + Math.sin(s.stride * 10) * 0.14);
      ctx.drawImage(s.saltJarImg, -17, -26, 34, 52);
      ctx.restore();
    }
  } else if (s.pose === 'search') {
    drawTwoSegLimb(ctx, 10, -44, 19, -57, 15, -75, 7.5, 6.5, '#f7cda9', '#deb089');
    drawTwoSegLimb(ctx, -10, -44, -15, -30, -18, -16, 7.5, 6.5, '#f0c19d', '#d6a27b');
  } else if (s.pose === 'raise_pole' || s.pose === 'poke') {
    const gripX = 16 + Math.cos(s.aimAngle) * (9 + s.pokeThrust * 17);
    const gripY = -44 + Math.sin(s.aimAngle) * (9 + s.pokeThrust * 17);
    drawTwoSegLimb(ctx, -9, -43, 2, -41, gripX - 7, gripY + 5, 7.5, 6.5, '#f0c19d', '#d6a27b');
    drawTwoSegLimb(ctx, 10, -44, 15, -42, gripX, gripY, 7.5, 6.5, '#f7cda9', '#deb089');

    if (s.returnGripPos) {
      const cosL = Math.cos(lean);
      const sinL = Math.sin(lean);
      const rx = gripX * cosL - gripY * sinL;
      const ry = gripX * sinL + gripY * cosL - 40 + crouch * 0.65;
      s.returnGripPos(s.x + rx * sc * s.facing, s.y + (-jump - bob + ry) * sc);
    }
  } else if (s.pose === 'cheer') {
    drawTwoSegLimb(ctx, 10, -44, 19, -59, 25, -75, 7.5, 6.5, '#f7cda9', '#deb089');
  } else if (s.pose === 'amazed') {
    drawTwoSegLimb(ctx, 10, -44, 19, -46, 17, -58, 7.5, 6.5, '#f7cda9', '#deb089');
  } else {
    drawTwoSegLimb(ctx, 10, -44, 16 + legSwing * 0.25, -31, 21 + legSwing * 0.45, -18, 7.5, 6.5, '#f7cda9', '#deb089');
  }

  ctx.fillStyle = '#de6b35';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.ellipse(11, -43, 6, 7.5, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
  ctx.restore();
}

export interface Boy2DrawState {
  x: number;
  y: number;
  pose: 'enter' | 'poke' | 'charge' | 'throw' | 'cheer';
  stride: number;
  aimAngle: number;
  pokeThrust: number;
  chargeProgress: number; // 0..1 while spinning pole & charging
  throwProgress: number; // 0..1
  windTime: number;
  charImg?: HTMLImageElement | null;
  scale?: number;
  returnHandPos?: (hx: number, hy: number) => void;
}

export function drawBoy2(ctx: CanvasRenderingContext2D, s: Boy2DrawState) {
  const sc = s.scale ?? 1.05;
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.scale(sc, sc);

  ctx.fillStyle = 'rgba(70, 42, 24, 0.24)';
  ctx.beginPath();
  ctx.ellipse(0, 3, 28, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Golden wind/power-up aura rings during charge!
  if (s.pose === 'charge') {
    const p = s.chargeProgress;
    ctx.save();
    ctx.strokeStyle = `rgba(255, 206, 72, ${0.4 + p * 0.45})`;
    ctx.lineWidth = 2.5;
    for (let r = 0; r < 2; r++) {
      const ringW = 34 + ((s.windTime * 45 + r * 22) % 34);
      ctx.beginPath();
      ctx.ellipse(0, -18 - r * 35, ringW, ringW * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  const crouch = s.pose === 'charge' ? 14 : 0;
  const jump = s.pose === 'cheer' ? Math.abs(Math.sin(s.stride * 2.8)) * 18 : 0;
  const bob = s.pose === 'enter' ? Math.abs(Math.sin(s.stride * 2.2)) * 5 : 0;
  const shakeX = s.pose === 'charge' ? Math.sin(s.windTime * 48) * 2.2 * s.chargeProgress : 0;
  ctx.translate(shakeX, -jump - bob);

  const lean = s.pose === 'charge' ? -0.14 : s.pose === 'throw' ? 0.24 : s.pose === 'enter' ? 0.08 : 0;
  ctx.save();
  ctx.translate(0, -42 + crouch * 0.65);
  ctx.rotate(lean);

  if (s.charImg) {
    const drawH = 154;
    const drawW = drawH * (s.charImg.naturalWidth / (s.charImg.naturalHeight || 1));
    ctx.drawImage(s.charImg, -drawW * 0.48, -drawH, drawW, drawH);

    if (s.returnHandPos) {
      const cosL = Math.cos(lean);
      const sinL = Math.sin(lean);
      let localHandX = drawW * 0.16;
      let localHandY = -drawH * 0.54;
      if (s.pose === 'poke') {
        localHandX += Math.cos(s.aimAngle) * (10 + s.pokeThrust * 18);
        localHandY += Math.sin(s.aimAngle) * (10 + s.pokeThrust * 18);
      } else if (s.pose === 'charge') {
        const spinSpeed = 4 + s.chargeProgress * 18;
        const spinA = s.windTime * spinSpeed;
        localHandX += Math.cos(spinA) * 24;
        localHandY += Math.sin(spinA) * 24;
      }
      const rx = localHandX * cosL - localHandY * sinL;
      const ry = localHandX * sinL + localHandY * cosL + crouch * 0.65;
      s.returnHandPos(s.x + rx * sc, s.y + (-jump - bob + ry) * sc);
    }

    ctx.restore();
    ctx.restore();
    return;
  }

  // Navy shorts
  const shortGrad = ctx.createLinearGradient(-16, -17, 16, 7);
  shortGrad.addColorStop(0, '#3e5d84');
  shortGrad.addColorStop(1, '#263c59');
  ctx.fillStyle = shortGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-15, -16);
  ctx.lineTo(15, -16);
  ctx.lineTo(17, 7);
  ctx.lineTo(2, 7);
  ctx.lineTo(0, -2);
  ctx.lineTo(-2, 7);
  ctx.lineTo(-17, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (s.pose === 'cheer') {
    drawTwoSegLimb(ctx, -11, -46, -20, -62, -27, -79, 8, 6.8, '#eec09b', '#d39f78');
  } else if (s.pose === 'charge' || s.pose === 'throw') {
    drawTwoSegLimb(ctx, 11, -46, 22, -48, 30, -54, 8, 6.8, '#f6cca8', '#dba983');
  } else {
    drawTwoSegLimb(ctx, -11, -46, -18, -33, -24, -20, 8, 6.8, '#eec09b', '#d39f78');
  }

  // Forest-teal Ghibli t-shirt
  const tealGrad = ctx.createLinearGradient(-16, -52, 17, -12);
  tealGrad.addColorStop(0, '#44a998');
  tealGrad.addColorStop(0.65, '#2d8b7d');
  tealGrad.addColorStop(1, '#1e665b');
  ctx.fillStyle = tealGrad;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-14, -51);
  ctx.quadraticCurveTo(0, -53, 14, -51);
  ctx.quadraticCurveTo(18, -32, 17, -14);
  ctx.quadraticCurveTo(0, -11, -17, -14);
  ctx.quadraticCurveTo(-18, -32, -14, -51);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Head
  const headTilt = s.pose === 'poke' || s.pose === 'charge' ? -0.22 : 0;
  ctx.save();
  ctx.translate(1, -70);
  ctx.rotate(headTilt);

  drawAnimeFaceBase(
    ctx,
    '#f9d7b6',
    '#dfb089',
    s.pose === 'cheer' ? 'cheer' : s.pose === 'charge' || s.pose === 'throw' ? 'determined' : 'happy',
  );

  // Spiky Ghibli anime hair
  ctx.fillStyle = '#241b19';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.9;
  ctx.beginPath();
  ctx.arc(0, -4, 19.2, Math.PI * 0.9, Math.PI * 2.04);
  ctx.lineTo(17, -6);
  ctx.lineTo(11, -15);
  ctx.lineTo(3, -8);
  ctx.lineTo(-5, -16);
  ctx.lineTo(-12, -8);
  ctx.lineTo(-19, 3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Iconic red headband + fluttering ribbon tails
  ctx.fillStyle = '#df4538';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  drawRoundedRect(ctx, -17, -10.5, 34, 6.2, 3);
  ctx.fill();
  ctx.stroke();

  const tailWave = Math.sin(s.windTime * 8) * 5.5;
  ctx.beginPath();
  ctx.moveTo(-17, -7);
  ctx.quadraticCurveTo(-30, -12 + tailWave, -39, -4 + tailWave);
  ctx.lineTo(-35, 3 + tailWave);
  ctx.quadraticCurveTo(-25, -4 + tailWave, -17, -5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // Front arm (poke, circular spin charge, throw, or enter)
  let handX = 24;
  let handY = -36;
  if (s.pose === 'enter') {
    handX = 25;
    handY = -60;
    drawTwoSegLimb(ctx, 10, -46, 20, -52, handX, handY, 8, 6.8, '#f6cca8', '#dba983');
  } else if (s.pose === 'poke') {
    handX = 16 + Math.cos(s.aimAngle) * (10 + s.pokeThrust * 17);
    handY = -44 + Math.sin(s.aimAngle) * (10 + s.pokeThrust * 17);
    drawTwoSegLimb(ctx, -9, -45, 2, -43, handX - 7, handY + 5, 8, 6.8, '#eec09b', '#d39f78');
    drawTwoSegLimb(ctx, 10, -46, 15, -44, handX, handY, 8, 6.8, '#f6cca8', '#dba983');
  } else if (s.pose === 'charge') {
    // Hand circles around a small radius as Boy 2 spins & charges power!
    const spinSpeed = 4 + s.chargeProgress * 18;
    const spinA = s.windTime * spinSpeed;
    const radius = 26;
    handX = -10 + Math.cos(spinA) * radius;
    handY = -56 + Math.sin(spinA) * radius;
    drawTwoSegLimb(ctx, 10, -46, -2, -52, handX, handY, 8, 6.8, '#f6cca8', '#dba983');
  } else if (s.pose === 'throw') {
    const p = Math.min(1, s.throwProgress);
    handX = -20 + p * 48;
    handY = -58 - Math.sin(p * Math.PI) * 14;
    drawTwoSegLimb(ctx, 10, -46, handX * 0.5 + 4, -54, handX, handY, 8, 6.8, '#f6cca8', '#dba983');
  } else {
    handX = 25;
    handY = -75;
    drawTwoSegLimb(ctx, 10, -46, 19, -60, handX, handY, 8, 6.8, '#f6cca8', '#dba983');
  }

  ctx.fillStyle = '#2d8b7d';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.ellipse(11, -45, 6.5, 7.8, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  if (s.returnHandPos) {
    const cosL = Math.cos(lean);
    const sinL = Math.sin(lean);
    const rx = handX * cosL - handY * sinL;
    const ry = handX * sinL + handY * cosL - 42 + crouch * 0.65;
    s.returnHandPos(s.x + rx * sc, s.y + (-jump - bob + ry) * sc);
  }

  ctx.restore();
  ctx.restore();
}

export interface ComicDialogueOptions {
  x: number;
  y: number;
  speaker: 'girl' | 'boy1' | 'boy2' | 'all';
  text: string;
  popScale?: number;
}

export function drawComicDialogue(
  ctx: CanvasRenderingContext2D,
  opt: ComicDialogueOptions,
) {
  const scale = opt.popScale ?? 1.0;
  if (scale <= 0.05) return;

  ctx.save();
  ctx.translate(opt.x, opt.y);
  ctx.scale(scale, scale);

  let badge = '👦 BÉ TRAI 1';
  let badgeBg = '#e66a20';
  let borderCol = '#d95a14';
  let titleCol = '#fff9f0';

  if (opt.speaker === 'girl') {
    badge = '👧 BÉ GÁI';
    badgeBg = '#d93b68';
    borderCol = '#bf2652';
    titleCol = '#fff5f7';
  } else if (opt.speaker === 'boy2') {
    badge = '🥷 BÉ ĐAI ĐỎ (SIÊU NHÂN)';
    badgeBg = '#c52222';
    borderCol = '#9e1414';
    titleCol = '#fff5f5';
  } else if (opt.speaker === 'all') {
    badge = '🎉 CẢ 3 BẠN NHỎ';
    badgeBg = '#d48806';
    borderCol = '#ad6800';
    titleCol = '#fffbe6';
  }

  ctx.font = '800 16px "Be Vietnam Pro", sans-serif';
  const textWidth = ctx.measureText(opt.text).width;
  ctx.font = '800 11px "Be Vietnam Pro", sans-serif';
  const badgeWidth = ctx.measureText(badge).width;

  const padX = 18;
  const bubbleW = Math.max(160, Math.max(textWidth, badgeWidth) + padX * 2);
  const bubbleH = 54;

  // Shadow
  ctx.fillStyle = 'rgba(40, 25, 15, 0.22)';
  drawRoundedRect(ctx, -bubbleW / 2 + 4, -bubbleH + 4, bubbleW, bubbleH, 16);
  ctx.fill();

  // Bubble body
  ctx.fillStyle = '#fffdf7';
  ctx.strokeStyle = borderCol;
  ctx.lineWidth = 2.8;
  drawRoundedRect(ctx, -bubbleW / 2, -bubbleH, bubbleW, bubbleH, 16);
  ctx.fill();
  ctx.stroke();

  // Speech bubble pointer arrow pointing down to character's head
  ctx.beginPath();
  ctx.moveTo(-10, -2);
  ctx.lineTo(0, 14);
  ctx.lineTo(10, -2);
  ctx.closePath();
  ctx.fillStyle = '#fffdf7';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-10, -2);
  ctx.lineTo(0, 14);
  ctx.lineTo(10, -2);
  ctx.strokeStyle = borderCol;
  ctx.lineWidth = 2.8;
  ctx.stroke();

  // Speaker Badge tag on top-left of bubble
  const badgeH = 20;
  const badgePad = 8;
  const bw = badgeWidth + badgePad * 2;
  const bx = -bubbleW / 2 + 10;
  const by = -bubbleH - 10;
  ctx.fillStyle = badgeBg;
  drawRoundedRect(ctx, bx, by, bw, badgeH, 6);
  ctx.fill();
  ctx.font = '800 11px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = titleCol;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge, bx + badgePad, by + badgeH / 2);

  // Main dialogue text inside bubble
  ctx.font = '800 15px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#261b14';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(opt.text, 0, -bubbleH / 2 + 2);

  ctx.restore();
}

export function drawMapleSprite(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  x: number,
  y: number,
  facing: 1 | -1 = 1,
  scale = 0.65,
  saltJarImg?: HTMLImageElement | null,
  shakeSalt = false,
) {
  if (!img) return;

  const w = img.naturalWidth || 150;
  const h = img.naturalHeight || 200;
  const drawW = w * scale;
  const drawH = h * scale;

  ctx.save();
  ctx.translate(x, y);

  // Soft ground shadow under character
  ctx.fillStyle = 'rgba(70, 42, 24, 0.24)';
  ctx.beginPath();
  ctx.ellipse(0, 4, 34 * scale, 10 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.scale(facing, 1);

  // Draw the MapleStory character anchored at bottom-center
  ctx.drawImage(img, -drawW / 2, -drawH, drawW, drawH);

  // If shaking salt jar (for Boy 1 when pouring salt):
  if (saltJarImg) {
    ctx.save();
    const saltTilt = shakeSalt ? 2.3 + Math.sin(Date.now() * 0.03) * 0.2 : 2.2;
    ctx.translate(-drawW * 0.15, -drawH * 0.42);
    ctx.rotate(saltTilt);
    ctx.drawImage(saltJarImg, -14, -22, 28, 44);
    ctx.restore();
  }

  ctx.restore();
}
