import { MangoItem, MangoPlacement } from '../types/story';

// Canopy slots spread cleanly across the upper-right sky/canopy (y: 55..305)
// leaving the bottom courtyard clear for characters & speech bubbles
const CANOPY_ANCHORS: Array<{ x: number; y: number; scale: number; angle: number }> = [
  // Top crown row (3)
  { x: 560, y: 24, scale: 0.94, angle: -0.04 },
  { x: 775, y: 16, scale: 0.98, angle: 0.02 },
  { x: 990, y: 26, scale: 0.94, angle: 0.05 },
  // Upper-mid row (4)
  { x: 445, y: 128, scale: 0.94, angle: -0.06 },
  { x: 665, y: 122, scale: 0.98, angle: 0.02 },
  { x: 885, y: 118, scale: 0.98, angle: -0.03 },
  { x: 1105, y: 126, scale: 0.94, angle: 0.06 },
  // Lower canopy row (4)
  { x: 540, y: 238, scale: 0.96, angle: -0.03 },
  { x: 765, y: 232, scale: 1.0, angle: 0.03 },
  { x: 985, y: 238, scale: 0.96, angle: -0.04 },
  { x: 1165, y: 246, scale: 0.92, angle: 0.04 },
  // Extra slots if > 11 items
  { x: 420, y: 252, scale: 0.88, angle: -0.05 },
  { x: 665, y: 315, scale: 0.9, angle: 0.03 },
  { x: 905, y: 318, scale: 0.9, angle: -0.04 },
  { x: 1125, y: 325, scale: 0.88, angle: 0.05 },
  { x: 495, y: 76, scale: 0.86, angle: -0.05 },
  { x: 1065, y: 80, scale: 0.86, angle: 0.05 },
  { x: 780, y: 175, scale: 0.86, angle: 0.02 },
  { x: 615, y: 182, scale: 0.86, angle: -0.02 },
  { x: 950, y: 184, scale: 0.86, angle: 0.03 },
];

export function computeMangoPlacements(items: MangoItem[]): MangoPlacement[] {
  const activeItems = items.filter((it) => !it.picked);
  const count = activeItems.length;
  const globalScale = count <= 6 ? 1.1 : count <= 11 ? 0.98 : count <= 16 ? 0.88 : 0.8;

  return activeItems.map((item, idx) => {
    if (idx < CANOPY_ANCHORS.length) {
      const slot = CANOPY_ANCHORS[idx];
      return {
        item,
        x: slot.x,
        y: slot.y,
        scale: slot.scale * globalScale,
        baseAngle: slot.angle,
        phaseOffset: idx * 0.85,
        swayAmp: 0.055 + (idx % 3) * 0.018,
      };
    }

    const extraIdx = idx - CANOPY_ANCHORS.length;
    const col = extraIdx % 5;
    const row = Math.floor(extraIdx / 5);
    return {
      item,
      x: 470 + col * 165 + (row % 2) * 40,
      y: 78 + (row % 4) * 74,
      scale: 0.78,
      baseAngle: ((idx % 5) - 2) * 0.03,
      phaseOffset: idx * 0.7,
      swayAmp: 0.06,
    };
  });
}

export function wrapVietnameseText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 4,
): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length === 0) return [''];
  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
      if (lines.length === maxLines - 1) {
        const rest = [current, ...words.slice(i + 1)].join(' ');
        let clipped = rest;
        while (ctx.measureText(clipped).width > maxWidth && clipped.length > 3) {
          clipped = clipped.slice(0, -1).trimEnd();
        }
        if (clipped !== rest) {
          clipped = `${clipped.slice(0, Math.max(1, clipped.length - 1))}…`;
        }
        lines.push(clipped);
        return lines;
      }
    }
  }
  lines.push(current);
  return lines;
}
