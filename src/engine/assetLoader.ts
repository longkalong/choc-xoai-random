import { MANGO_COLOR_VARIANTS } from '../data/defaultItems';

export interface MapleCharGirl {
  walk: HTMLImageElement[];
  sit: HTMLImageElement | null;
  stand: HTMLImageElement | null;
  smile: HTMLImageElement | null;
  jump: HTMLImageElement | null;
}

export interface MapleCharBoy1 {
  walk: HTMLImageElement[];
  stand: HTMLImageElement | null;
  alert: HTMLImageElement | null;
  stab: HTMLImageElement[];
  troubled: HTMLImageElement | null;
  jump: HTMLImageElement | null;
}

export interface MapleCharBoy2 {
  walk: HTMLImageElement[];
  stand: HTMLImageElement | null;
  stab: HTMLImageElement[];
  swing: HTMLImageElement[];
  shoot: HTMLImageElement[];
  troubled: HTMLImageElement | null;
  jump: HTMLImageElement | null;
}

export interface MapleAssets {
  girl: MapleCharGirl;
  boy1: MapleCharBoy1;
  boy2: MapleCharBoy2;
}

export interface LoadedAssets {
  bgYard: HTMLImageElement | null;
  saltJar: HTMLImageElement | null;
  mangoBase: HTMLImageElement | null;
  mangoVariants: HTMLCanvasElement[];
  charGirl: HTMLImageElement | null;
  charBoy1: HTMLImageElement | null;
  charBoy2: HTMLImageElement | null;
  maple: MapleAssets;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function createTintedMango(
  baseImg: HTMLImageElement,
  hueRotateDeg: number,
  saturate: number,
  brightness: number,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = baseImg.naturalWidth || 400;
  canvas.height = baseImg.naturalHeight || 600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.filter = `hue-rotate(${hueRotateDeg}deg) saturate(${saturate}) brightness(${brightness})`;
  ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';
  return canvas;
}

export async function loadAllAssets(): Promise<LoadedAssets> {
  const [
    bgYard,
    saltJar,
    mangoBase,
    charGirl,
    charBoy1,
    charBoy2,
    // Girl frames
    gWalk0,
    gWalk1,
    gWalk2,
    gWalk3,
    gSit,
    gStand,
    gSmile,
    gJump,
    // Boy 1 frames
    b1Walk0,
    b1Walk1,
    b1Walk2,
    b1Walk3,
    b1Stand,
    b1Alert,
    b1Stab0,
    b1Stab1,
    b1Troubled,
    b1Jump,
    // Boy 2 frames
    b2Walk0,
    b2Walk1,
    b2Walk2,
    b2Walk3,
    b2Stand,
    b2Troubled,
    b2Jump,
    b2Stab0,
    b2Stab1,
    b2Swing0,
    b2Swing1,
    b2Swing2,
    b2Shoot0,
    b2Shoot1,
    b2Shoot2,
  ] = await Promise.all([
    loadImage('/assets/bg_ghibli_yard.jpg'),
    loadImage('/assets/prop_salt_jar.png'),
    loadImage('/assets/mango_fruit.png'),
    loadImage('/assets/char_girl_ghibli.png'),
    loadImage('/assets/char_boy1_ghibli.png'),
    loadImage('/assets/char_boy2_ghibli.png'),
    // Girl
    loadImage('/assets/maple/girl_walk_0.png'),
    loadImage('/assets/maple/girl_walk_1.png'),
    loadImage('/assets/maple/girl_walk_2.png'),
    loadImage('/assets/maple/girl_walk_3.png'),
    loadImage('/assets/maple/girl_sit_0.png'),
    loadImage('/assets/maple/girl_stand_0.png'),
    loadImage('/assets/maple/girl_smile_0.png'),
    loadImage('/assets/maple/girl_jump_0.png'),
    // Boy 1
    loadImage('/assets/maple/boy1_walk_0.png'),
    loadImage('/assets/maple/boy1_walk_1.png'),
    loadImage('/assets/maple/boy1_walk_2.png'),
    loadImage('/assets/maple/boy1_walk_3.png'),
    loadImage('/assets/maple/boy1_stand_0.png'),
    loadImage('/assets/maple/boy1_alert_0.png'),
    loadImage('/assets/maple/boy1_stab_0.png'),
    loadImage('/assets/maple/boy1_stab_1.png'),
    loadImage('/assets/maple/boy1_troubled_0.png'),
    loadImage('/assets/maple/boy1_jump_0.png'),
    // Boy 2
    loadImage('/assets/maple/boy2_walk_0.png'),
    loadImage('/assets/maple/boy2_walk_1.png'),
    loadImage('/assets/maple/boy2_walk_2.png'),
    loadImage('/assets/maple/boy2_walk_3.png'),
    loadImage('/assets/maple/boy2_stand_0.png'),
    loadImage('/assets/maple/boy2_troubled_0.png'),
    loadImage('/assets/maple/boy2_jump_0.png'),
    loadImage('/assets/maple/boy2_stab_0.png'),
    loadImage('/assets/maple/boy2_stab_1.png'),
    loadImage('/assets/maple/boy2_swing_0.png'),
    loadImage('/assets/maple/boy2_swing_1.png'),
    loadImage('/assets/maple/boy2_swing_2.png'),
    loadImage('/assets/maple/boy2_shoot_0.png'),
    loadImage('/assets/maple/boy2_shoot_1.png'),
    loadImage('/assets/maple/boy2_shoot_2.png'),
  ]);

  const mangoVariants: HTMLCanvasElement[] = mangoBase
    ? MANGO_COLOR_VARIANTS.map((v) =>
        createTintedMango(mangoBase, v.hueRotateDeg, v.saturate, v.brightness),
      )
    : [];

  const maple: MapleAssets = {
    girl: {
      walk: [gWalk0, gWalk1, gWalk2, gWalk3].filter(Boolean) as HTMLImageElement[],
      sit: gSit,
      stand: gStand,
      smile: gSmile,
      jump: gJump,
    },
    boy1: {
      walk: [b1Walk0, b1Walk1, b1Walk2, b1Walk3].filter(Boolean) as HTMLImageElement[],
      stand: b1Stand,
      alert: b1Alert,
      stab: [b1Stab0, b1Stab1].filter(Boolean) as HTMLImageElement[],
      troubled: b1Troubled,
      jump: b1Jump,
    },
    boy2: {
      walk: [b2Walk0, b2Walk1, b2Walk2, b2Walk3].filter(Boolean) as HTMLImageElement[],
      stand: b2Stand,
      stab: [b2Stab0, b2Stab1].filter(Boolean) as HTMLImageElement[],
      swing: [b2Swing0, b2Swing1, b2Swing2].filter(Boolean) as HTMLImageElement[],
      shoot: [b2Shoot0, b2Shoot1, b2Shoot2].filter(Boolean) as HTMLImageElement[],
      troubled: b2Troubled,
      jump: b2Jump,
    },
  };

  return {
    bgYard,
    saltJar,
    mangoBase,
    mangoVariants,
    charGirl,
    charBoy1,
    charBoy2,
    maple,
  };
}
