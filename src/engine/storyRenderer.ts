import { MANGO_COLOR_VARIANTS } from '../data/defaultItems';
import { MangoPlacement, StoryPhaseId } from '../types/story';
import { LoadedAssets } from './assetLoader';
import {
  drawBambooPole,
  drawBoy1,
  drawBoy2,
  drawCeramicPlateAndSalt,
  drawComicDialogue,
  drawExclamationBubble,
  drawGirl,
  drawMangoTreeTrunk,
  drawMapleSprite,
  drawTreeCanopyBack,
} from './ghibliArtwork';
import { wrapVietnameseText } from './mangoLayout';
import { STORY_DIALOGUES } from '../data/dialogues';

export const STAGE_WIDTH = 1280;
export const STAGE_HEIGHT = 720;
export const TOTAL_STORY_SEC = 37;

export interface StoryRunPlan {
  winnerId: string;
  decoyIds: string[];
  focusId: string;
  randomMissSpots: Array<{ x: number; y: number }>;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  kind: 'salt' | 'leaf' | 'dust' | 'confetti';
  rot: number;
  vrot: number;
}

export function createStoryRunPlan(
  placements: MangoPlacement[],
  winnerId: string,
): StoryRunPlan {
  const others = placements.filter((p) => p.item.id !== winnerId);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  const decoyIds: string[] = [];
  for (let i = 0; i < 3; i++) {
    if (shuffled.length > 0) {
      decoyIds.push(shuffled[i % shuffled.length].item.id);
    } else {
      decoyIds.push(winnerId);
    }
  }
  const focusId = shuffled[0]?.item.id ?? winnerId;
  const randomMissSpots = [0, 1, 2].map(() => ({
    x: 520 + Math.random() * 540,
    y: 120 + Math.random() * 210,
  }));

  return { winnerId, decoyIds, focusId, randomMissSpots };
}

export function getPhaseInfo(t: number): { phase: StoryPhaseId; caption: string } {
  if (t <= 0) return { phase: 'IDLE', caption: 'Cây xoài trước gió — Bấm "Chọc Xoài!" để bắt đầu' };
  if (t < 5) return { phase: 'WIND_SWAY', caption: '00–05s: Gió hè thổi mát, những quả xoài đung đưa trên cành...' };
  if (t < 10) return { phase: 'KIDS_RUN', caption: '05–10s: Hai bạn nhỏ dắt tay nhau chạy ùa ra gốc cây xoài!' };
  if (t < 13) return { phase: 'SALT_PREP', caption: '10–13s: Đặt đĩa ra sân, dốc lọ muối tôm Tây Ninh thơm lừng...' };
  if (t < 17) return { phase: 'SEARCH_POLE', caption: '13–17s: Bạn nam ngó nghiêng tìm cây sào để chọc xoài...' };
  if (t < 19) return { phase: 'RAISE_POLE', caption: '17–19s: Thấy cây sào rồi! Giơ sào lên chuẩn bị chọc nào!' };
  if (t < 23) return { phase: 'RANDOM_POKES', caption: '19–23s: Chọc tứ tung nhưng gió thổi quả né hết trơn!' };
  if (t < 25) return { phase: 'FOCUS_AND_HERO', caption: '23–25s: Tập trung nhắm kỹ 1 quả... vẫn trượt!' };
  if (t < 26.5) return { phase: 'FOCUS_AND_HERO', caption: '25s: "Để tao chọc cho!" — Cao thủ xuất hiện!' };
  if (t < 28.8) return { phase: 'FOCUS_AND_HERO', caption: '26–29s: Thằng bé thứ 2 chọc liền 2 phát... vẫn hụt!' };
  if (t < 30.8) return { phase: 'THROW_POLE', caption: '29–31s: Cay quá! Gồng tụ lực xoay sào lấy đà...' };
  if (t < 32) return { phase: 'THROW_POLE', caption: '31–32s: PHI THẲNG CÂY SÀO VÀO QUẢ XOÀI!' };
  if (t < 37) return { phase: 'MANGO_FALL_WIN', caption: '32–37s: Trúng phóc! Xoài rơi thẳng vào đĩa muối tôm!' };
  return { phase: 'FINISHED', caption: 'Hoàn thành! Đã chọn được quả xoài may mắn!' };
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function easeOutCubic(x: number): number {
  const t = clamp01(x);
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(x: number): number {
  const t = clamp01(x);
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function drawMangoWithLabel(
  ctx: CanvasRenderingContext2D,
  assets: LoadedAssets,
  label: string,
  colorIndex: number,
  x: number,
  y: number,
  angle: number,
  scale: number,
) {
  const variant = MANGO_COLOR_VARIANTS[colorIndex % MANGO_COLOR_VARIANTS.length];
  const mangoSprite = assets.mangoVariants[colorIndex % Math.max(1, assets.mangoVariants.length)] ?? assets.mangoBase;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  // Mango sprite anchored near top twig (0, 0) - big & juicy!
  const drawW = 128;
  const drawH = 178;
  if (mangoSprite) {
    ctx.drawImage(mangoSprite, -drawW * 0.52, -8, drawW, drawH);
  } else {
    // Fallback vector mango if image still loading
    ctx.fillStyle = '#f2b84b';
    ctx.strokeStyle = '#462a18';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 92, 48, 64, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Compact readable parchment nameplate centered inside the plump mango belly
  ctx.font = '700 10.5px "Be Vietnam Pro", sans-serif';
  const maxTextW = 122;
  const lines = wrapVietnameseText(ctx, label, maxTextW, 4);
  const lineHeight = 13;
  const longestLine = Math.max(...lines.map((l) => ctx.measureText(l).width), 52);
  const boxW = Math.min(138, Math.max(74, longestLine + 14));
  const boxH = lines.length * lineHeight + 9;
  const boxY = 102 - boxH / 2;

  // Badge drop shadow
  ctx.fillStyle = 'rgba(54, 32, 16, 0.18)';
  ctx.beginPath();
  ctx.roundRect(-boxW / 2 + 2, boxY + 2, boxW, boxH, 9);
  ctx.fill();

  // Badge fill & subtle natural border (no special highlight border on chosen mango)
  ctx.fillStyle = variant.tagBg.replace(/0\.9[45]/, '0.86');
  ctx.strokeStyle = variant.tagBorder;
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.roundRect(-boxW / 2, boxY, boxW, boxH, 9);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = variant.tagText;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  lines.forEach((line, idx) => {
    const ly = boxY + 4.5 + lineHeight * (idx + 0.5);
    ctx.fillText(line, 0, ly);
  });

  ctx.restore();
}

export interface RenderFrameContext {
  ctx: CanvasRenderingContext2D;
  assets: LoadedAssets;
  placements: MangoPlacement[];
  runPlan: StoryRunPlan | null;
  t: number; // 0..37 story time (or ambient idle time)
  windTime: number;
  isPlaying: boolean;
  particles: Particle[];
}

export function renderStoryFrame({
  ctx,
  assets,
  placements,
  runPlan,
  t,
  windTime,
  isPlaying,
  particles,
}: RenderFrameContext) {
  ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

  // 1. Ghibli Background Courtyard (AI generated)
  if (assets.bgYard) {
    ctx.drawImage(assets.bgYard, 0, 0, STAGE_WIDTH, STAGE_HEIGHT);
  } else {
    const sky = ctx.createLinearGradient(0, 0, 0, STAGE_HEIGHT);
    sky.addColorStop(0, '#58b4e6');
    sky.addColorStop(0.65, '#bfe6f7');
    sky.addColorStop(1, '#e4ba82');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
  }

  // Soft warm Ghibli sunbeams from upper-left
  ctx.save();
  const sunGlow = ctx.createRadialGradient(220, 90, 20, 220, 90, 520);
  sunGlow.addColorStop(0, 'rgba(255, 249, 210, 0.28)');
  sunGlow.addColorStop(1, 'rgba(255, 249, 210, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
  ctx.restore();

  // 2. Mango Tree Trunk + Lush Swaying Canopy
  drawMangoTreeTrunk(ctx);
  drawTreeCanopyBack(ctx, windTime);

  // Resting bamboo pole leaning near left bamboo fence until Boy 1 picks it up (t < 16.4s)
  const polePickedUp = isPlaying && t >= 16.4;
  if (!polePickedUp) {
    drawBambooPole(ctx, 130, 598, 285, 455, 10);
  }

  // 3. Determine active target & dodge physics for mangoes
  const winnerPlacement = runPlan
    ? placements.find((p) => p.item.id === runPlan.winnerId) ?? placements[0]
    : placements[0];

  const getDodgeForMango = (p: MangoPlacement): { dx: number; dy: number; dAngle: number } => {
    if (!isPlaying || !runPlan) return { dx: 0, dy: 0, dAngle: 0 };

    // 19 - 23s: 3 random pokes dodge
    if (t >= 19 && t < 23) {
      const slot = Math.floor((t - 19) / 1.333);
      const local = ((t - 19) % 1.333) / 1.333;
      const targetId = runPlan.decoyIds[Math.min(2, slot)];
      if (p.item.id === targetId && local > 0.35 && local < 0.92) {
        const dodgePulse = Math.sin(((local - 0.35) / 0.57) * Math.PI);
        const dir = slot % 2 === 0 ? 1 : -1;
        return { dx: dir * 42 * dodgePulse, dy: -10 * dodgePulse, dAngle: dir * 0.45 * dodgePulse };
      }
    }

    // 23 - 26.5s: Boy 1 focused target dodges stubbornly
    if (t >= 23 && t < 26.5 && p.item.id === runPlan.focusId) {
      const jabs = Math.sin((t - 23) * 5.5);
      return { dx: jabs * 34, dy: -Math.abs(jabs) * 8, dAngle: jabs * 0.38 };
    }

    // 26.5 - 28.8s: Boy 2 pokes 2 times and misses!
    if (t >= 26.5 && t < 28.8) {
      const slot = t < 27.65 ? 0 : 1;
      const local = t < 27.65 ? (t - 26.5) / 1.15 : (t - 27.65) / 1.15;
      const targetId = runPlan.decoyIds[(slot + 1) % runPlan.decoyIds.length];
      if (p.item.id === targetId && local > 0.3 && local < 0.92) {
        const dodgePulse = Math.sin(((local - 0.3) / 0.62) * Math.PI);
        const dir = slot === 0 ? -1 : 1;
        return { dx: dir * 44 * dodgePulse, dy: -12 * dodgePulse, dAngle: dir * 0.45 * dodgePulse };
      }
    }

    return { dx: 0, dy: 0, dAngle: 0 };
  };

  // 4. Draw all hanging mangoes on the tree (except the winning mango once detached at t >= 32s)
  const winnerDetached = isPlaying && t >= 32.0;
  const gustIntensity = isPlaying && t >= 19 && t < 29 ? 1.55 : 1.0;

  placements.forEach((p) => {
    if (winnerDetached && winnerPlacement && p.item.id === winnerPlacement.item.id) {
      return;
    }
    const dodge = getDodgeForMango(p);
    const swayAngle =
      p.baseAngle +
      Math.sin(windTime * 2.1 * gustIntensity + p.phaseOffset) * p.swayAmp * gustIntensity +
      dodge.dAngle;
    const swayX = p.x + Math.sin(windTime * 1.6 + p.phaseOffset) * 5 + dodge.dx;
    const swayY = p.y + dodge.dy;

    drawMangoWithLabel(
      ctx,
      assets,
      p.item.label,
      p.item.colorIndex,
      swayX,
      swayY,
      swayAngle,
      p.scale,
    );
  });

  // Ground coordinates for action zone
  const groundY = 602;
  const plateX = 515;
  const plateY = 612;

  // 5. Ceramic Plate + Muối Tôm Tây Ninh (appears when Girl puts it down at t >= 10.6s)
  if (isPlaying && t >= 10.2) {
    const plateAppear = easeOutCubic((t - 10.2) / 0.6);
    const saltFill = t < 11.1 ? 0 : clamp01((t - 11.1) / 1.8);
    drawCeramicPlateAndSalt(ctx, plateX, plateY, saltFill, plateAppear);
  }

  // 6. Characters & Story Choreography (05s – 37s)
  if (isPlaying && t >= 5.0) {
    // --- Girl choreography ---
    let girlX = 430;
    let girlY = groundY;
    let girlPose: 'run' | 'place_plate' | 'watch' | 'cheer' = 'watch';
    let girlLookUp = 0.4;

    if (t < 10.0) {
      const p = easeInOutQuad((t - 5.0) / 5.0);
      girlX = lerp(-90, 425, p);
      girlPose = 'run';
      girlLookUp = 0.1;
    } else if (t < 13.0) {
      girlX = 428;
      girlPose = t < 11.3 ? 'place_plate' : 'watch';
      girlLookUp = t < 11.3 ? 0 : 0.2;
    } else if (t < 33.8) {
      girlX = 418;
      girlPose = 'watch';
      girlLookUp = t >= 18 ? 0.9 : 0.3;
    } else {
      girlX = 418;
      girlPose = 'cheer';
      girlLookUp = 0.2;
    }

    // --- Boy 1 choreography ---
    let boy1X = 485;
    let boy1Y = groundY;
    let boy1Pose: 'run' | 'pour_salt' | 'search' | 'raise_pole' | 'poke' | 'amazed' | 'cheer' = 'run';
    let boy1Facing: 1 | -1 = 1;
    let boy1AimAngle = -0.8;
    let boy1PokeThrust = 0;

    if (t < 10.0) {
      const p = easeInOutQuad((t - 5.0) / 5.0);
      boy1X = lerp(-35, 480, p);
      boy1Pose = 'run';
    } else if (t < 13.0) {
      // Steps slightly right of plate, faces left-down pouring salt onto plate
      boy1X = 562;
      boy1Facing = -1;
      boy1Pose = 'pour_salt';
    } else if (t < 17.0) {
      // Looks around & walks left to find bamboo pole near fence
      if (t < 14.5) {
        boy1X = 562;
        boy1Facing = Math.sin(t * 4) > 0 ? 1 : -1;
        boy1Pose = 'search';
      } else if (t < 16.4) {
        const p = easeInOutQuad((t - 14.5) / 1.9);
        boy1X = lerp(562, 230, p);
        boy1Facing = -1;
        boy1Pose = 'run';
      } else {
        boy1X = 230;
        boy1Facing = 1;
        boy1Pose = 'raise_pole';
      }
    } else if (t < 19.0) {
      // Runs back under mango tree and lifts pole up
      const p = easeInOutQuad((t - 17.0) / 1.4);
      boy1X = lerp(230, 565, p);
      boy1Facing = 1;
      boy1Pose = p < 0.8 ? 'run' : 'raise_pole';
      boy1AimAngle = -1.05;
    } else if (t < 23.0) {
      boy1X = 565;
      boy1Facing = 1;
      boy1Pose = 'poke';
      const slot = Math.floor((t - 19.0) / 1.333);
      const local = ((t - 19.0) % 1.333) / 1.333;
      boy1PokeThrust = Math.sin(local * Math.PI);
      const target =
        placements.find((pl) => pl.item.id === runPlan?.decoyIds[Math.min(2, slot)]) ??
        winnerPlacement;
      if (target) {
        boy1AimAngle = Math.atan2(target.y + 45 - (boy1Y - 82), target.x - boy1X);
      }
    } else if (t < 26.4) {
      boy1X = 565;
      boy1Facing = 1;
      boy1Pose = t >= 25.5 ? 'amazed' : 'poke';
      boy1PokeThrust = t < 25.2 ? Math.abs(Math.sin((t - 23.0) * 6)) * 0.9 : 0;
      const focusTarget =
        placements.find((pl) => pl.item.id === runPlan?.focusId) ?? winnerPlacement;
      if (focusTarget) {
        boy1AimAngle = Math.atan2(focusTarget.y + 45 - (boy1Y - 82), focusTarget.x - boy1X);
      }
    } else if (t < 33.8) {
      // Steps aside watching Boy 2!
      const p = easeOutCubic((t - 26.4) / 0.8);
      boy1X = lerp(565, 325, p);
      boy1Facing = 1;
      boy1Pose = 'amazed';
    } else {
      boy1X = 325;
      boy1Facing = 1;
      boy1Pose = 'cheer';
    }

    const hasMaple = Boolean(assets.maple && assets.maple.girl.walk.length > 0);

    // Draw Girl first (slightly behind Boy 1)
    if (hasMaple) {
      let gImg = assets.maple.girl.stand;
      let gBounce = 0;
      if (girlPose === 'run') {
        const f = Math.floor(t * 7.5) % assets.maple.girl.walk.length;
        gImg = assets.maple.girl.walk[f];
      } else if (girlPose === 'place_plate') {
        gImg = assets.maple.girl.sit;
      } else if (girlPose === 'cheer') {
        gImg = assets.maple.girl.jump;
        gBounce = Math.abs(Math.sin(t * 7.5)) * 14;
      } else {
        const isSmiling = (t >= 21.0 && t < 22.8) || (t >= 28.6 && t < 29.8);
        gImg = isSmiling ? assets.maple.girl.smile : assets.maple.girl.stand;
      }
      drawMapleSprite(ctx, gImg, girlX, girlY - gBounce, 1, 0.65);
    } else {
      drawGirl(ctx, {
        x: girlX,
        y: girlY,
        pose: girlPose,
        stride: t * 5.5,
        lookUp: girlLookUp,
        windTime,
        charImg: assets.charGirl,
      });
    }

    // Draw Boy 1 and capture his grip position if holding pole
    let boy1Grip = { x: boy1X + 20, y: boy1Y - 82 };
    if (hasMaple) {
      let b1Img = assets.maple.boy1.stand;
      let b1Bounce = 0;
      let b1JarImg: HTMLImageElement | null = null;
      let shakeSalt = false;

      if (boy1Pose === 'run') {
        const f = Math.floor(t * 7.5) % assets.maple.boy1.walk.length;
        b1Img = assets.maple.boy1.walk[f];
      } else if (boy1Pose === 'pour_salt') {
        b1Img = assets.maple.boy1.stand;
        b1JarImg = assets.saltJar;
        shakeSalt = t >= 11.1 && t < 12.9;
      } else if (boy1Pose === 'search') {
        b1Img = assets.maple.boy1.alert;
      } else if (boy1Pose === 'raise_pole') {
        b1Img = assets.maple.boy1.stab[0] || assets.maple.boy1.stand;
      } else if (boy1Pose === 'poke') {
        const isTroubled = t >= 23.4 && t < 25.2;
        if (isTroubled && assets.maple.boy1.troubled) {
          b1Img = assets.maple.boy1.troubled;
        } else {
          b1Img =
            boy1PokeThrust > 0.35 && assets.maple.boy1.stab.length > 1
              ? assets.maple.boy1.stab[1]
              : assets.maple.boy1.stab[0];
        }
      } else if (boy1Pose === 'amazed') {
        b1Img = assets.maple.boy1.alert;
      } else if (boy1Pose === 'cheer') {
        b1Img = assets.maple.boy1.jump;
        b1Bounce = Math.abs(Math.sin(t * 7.5)) * 14;
      }

      drawMapleSprite(ctx, b1Img, boy1X, boy1Y - b1Bounce, boy1Facing, 0.65, b1JarImg, shakeSalt);
      boy1Grip = { x: boy1X + 18 * boy1Facing, y: boy1Y - 72 };
    } else {
      drawBoy1(ctx, {
        x: boy1X,
        y: boy1Y,
        pose: boy1Pose,
        stride: t * 5.5,
        facing: boy1Facing,
        aimAngle: boy1AimAngle,
        pokeThrust: boy1PokeThrust,
        saltJarImg: assets.saltJar,
        charImg: assets.charBoy1,
        returnGripPos: (gx, gy) => {
          boy1Grip = { x: gx, y: gy };
        },
      });
    }

    // Comic indicators for Boy 1
    if (t >= 13.2 && t < 15.2) {
      drawExclamationBubble(ctx, boy1X, boy1Y - 138, '?', 1);
    } else if (t >= 16.3 && t < 17.5) {
      drawExclamationBubble(ctx, boy1X, boy1Y - 138, '!', 1);
    } else if (t >= 23.4 && t < 25.2) {
      drawExclamationBubble(ctx, boy1X + 22, boy1Y - 135, '💧', 0.95);
    }

    // Boy 1's Bamboo Pole while he holds/pokes (t: 16.4 -> 26.5)
    if (t >= 16.4 && t < 26.5) {
      if (t < 18.2) {
        const lift = easeOutCubic((t - 16.4) / 1.8);
        const tipX = boy1Grip.x + lerp(190, 120, lift);
        const tipY = boy1Grip.y - lerp(40, 290, lift);
        drawBambooPole(ctx, boy1Grip.x, boy1Grip.y, tipX, tipY);
      } else if (t < 23.0) {
        const slot = Math.floor((t - 19.0) / 1.333);
        const local = Math.max(0, ((t - 19.0) % 1.333) / 1.333);
        const target =
          placements.find((pl) => pl.item.id === runPlan?.decoyIds[Math.min(2, slot)]) ??
          winnerPlacement;
        const tx = target ? target.x : 780;
        const ty = target ? target.y + 42 : 220;
        const extend = t < 19.0 ? 0.5 : 0.65 + Math.sin(local * Math.PI) * 0.35;
        const tipX = lerp(boy1Grip.x, tx, extend);
        const tipY = lerp(boy1Grip.y, ty, extend);
        drawBambooPole(ctx, boy1Grip.x, boy1Grip.y, tipX, tipY);

        if (t >= 19.0 && local > 0.42 && local < 0.78) {
          ctx.save();
          ctx.font = '800 20px "Be Vietnam Pro", sans-serif';
          ctx.fillStyle = '#fff9e6';
          ctx.strokeStyle = '#462a18';
          ctx.lineWidth = 4;
          ctx.strokeText('Vụt!', tipX + 12, tipY - 12);
          ctx.fillText('Vụt!', tipX + 12, tipY - 12);
          ctx.restore();
        }
      } else {
        const focusTarget =
          placements.find((pl) => pl.item.id === runPlan?.focusId) ?? winnerPlacement;
        const tx = focusTarget ? focusTarget.x : 780;
        const ty = focusTarget ? focusTarget.y + 45 : 220;
        const jab = t < 25.4 ? 0.68 + Math.abs(Math.sin((t - 23.0) * 6)) * 0.3 : 0.6;
        drawBambooPole(
          ctx,
          boy1Grip.x,
          boy1Grip.y,
          lerp(boy1Grip.x, tx, jab),
          lerp(boy1Grip.y, ty, jab),
        );
      }
    }

    // --- Boy 2 Hero choreography (arrives at 25.0s!) ---
    if (t >= 25.0) {
      let boy2X = 585;
      let boy2Pose: 'enter' | 'poke' | 'charge' | 'throw' | 'cheer' = 'enter';
      let boy2AimAngle = -0.9;
      let boy2PokeThrust = 0;
      let chargeProgress = 0;
      let throwProgress = 0;

      const boy2TargetSlot = t < 27.65 ? 0 : 1;
      const boy2TargetId = runPlan?.decoyIds[(boy2TargetSlot + 1) % runPlan.decoyIds.length];
      const boy2PokeTarget =
        placements.find((pl) => pl.item.id === boy2TargetId) ?? winnerPlacement;

      if (t < 26.5) {
        const p = easeOutCubic((t - 25.0) / 1.4);
        boy2X = lerp(-70, 585, p);
        boy2Pose = 'enter';
      } else if (t < 28.8) {
        // Pokes 2 times and misses both!
        boy2X = 585;
        boy2Pose = 'poke';
        const local = t < 27.65 ? (t - 26.5) / 1.15 : (t - 27.65) / 1.15;
        boy2PokeThrust = Math.sin(local * Math.PI);
        if (boy2PokeTarget) {
          boy2AimAngle = Math.atan2(boy2PokeTarget.y + 45 - (groundY - 82), boy2PokeTarget.x - boy2X);
        }
      } else if (t < 30.8) {
        // Charges up power! Pole circles in a small radius
        boy2X = 585;
        boy2Pose = 'charge';
        chargeProgress = clamp01((t - 28.8) / 2.0);
      } else if (t < 33.8) {
        boy2X = 595;
        boy2Pose = 'throw';
        throwProgress = clamp01((t - 30.8) / 0.45);
      } else {
        boy2X = 595;
        boy2Pose = 'cheer';
      }

      let boy2Hand = { x: boy2X + 15, y: groundY - 95 };
      if (hasMaple) {
        let b2Img = assets.maple.boy2.stand;
        let b2Bounce = 0;

        if (boy2Pose === 'enter') {
          const f = Math.floor(t * 8.0) % assets.maple.boy2.walk.length;
          b2Img = assets.maple.boy2.walk[f];
        } else if (boy2Pose === 'poke') {
          const isMiss = (t >= 27.65 && t < 28.0) || (t >= 28.6 && t < 28.8);
          if (isMiss && assets.maple.boy2.troubled) {
            b2Img = assets.maple.boy2.troubled;
          } else {
            b2Img =
              boy2PokeThrust > 0.35 && assets.maple.boy2.stab.length > 1
                ? assets.maple.boy2.stab[1]
                : assets.maple.boy2.stab[0];
          }
        } else if (boy2Pose === 'charge') {
          const f = Math.floor(t * 14.0) % assets.maple.boy2.swing.length;
          b2Img = assets.maple.boy2.swing[f];

          // Golden wind & aura rings
          ctx.save();
          ctx.strokeStyle = `rgba(255, 206, 72, ${0.4 + chargeProgress * 0.5})`;
          ctx.lineWidth = 3;
          for (let r = 0; r < 2; r++) {
            const ringW = 42 + ((windTime * 50 + r * 25) % 40);
            ctx.beginPath();
            ctx.ellipse(boy2X, groundY - 55 - r * 30, ringW, ringW * 0.3, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        } else if (boy2Pose === 'throw') {
          const shootF = throwProgress < 0.25 ? 0 : throwProgress < 0.65 ? 1 : 2;
          b2Img = assets.maple.boy2.shoot[shootF] || assets.maple.boy2.shoot[0];
        } else if (boy2Pose === 'cheer') {
          b2Img = assets.maple.boy2.jump;
          b2Bounce = Math.abs(Math.sin(t * 8.0)) * 16;
        }

        drawMapleSprite(ctx, b2Img, boy2X, groundY - b2Bounce, 1, 0.66);
        boy2Hand = { x: boy2X + 22, y: groundY - 80 };
      } else {
        drawBoy2(ctx, {
          x: boy2X,
          y: groundY,
          pose: boy2Pose,
          stride: t * 6.0,
          aimAngle: boy2AimAngle,
          pokeThrust: boy2PokeThrust,
          chargeProgress,
          throwProgress,
          windTime,
          charImg: assets.charBoy2,
          returnHandPos: (hx, hy) => {
            boy2Hand = { x: hx, y: hy };
          },
        });
      }


      const targetX = winnerPlacement ? winnerPlacement.x : 820;
      const targetY = winnerPlacement ? winnerPlacement.y + 18 : 200;

      if (t >= 26.5 && t < 28.8) {
        // Boy 2's 2 missed pokes
        const local = t < 27.65 ? (t - 26.5) / 1.15 : (t - 27.65) / 1.15;
        const tx = boy2PokeTarget ? boy2PokeTarget.x : 780;
        const ty = boy2PokeTarget ? boy2PokeTarget.y + 45 : 220;
        const extend = 0.64 + Math.sin(local * Math.PI) * 0.34;
        const tipX = lerp(boy2Hand.x, tx, extend);
        const tipY = lerp(boy2Hand.y, ty, extend);
        drawBambooPole(ctx, boy2Hand.x, boy2Hand.y, tipX, tipY);

        if (local > 0.42 && local < 0.85) {
          ctx.save();
          ctx.font = '800 20px "Be Vietnam Pro", sans-serif';
          ctx.fillStyle = '#fff9e6';
          ctx.strokeStyle = '#462a18';
          ctx.lineWidth = 4;
          const missTxt = t < 27.65 ? 'Vụt!' : 'Hụt nữa!';
          ctx.strokeText(missTxt, tipX + 10, tipY - 10);
          ctx.fillText(missTxt, tipX + 10, tipY - 10);
          ctx.restore();
        }
      } else if (t >= 28.8 && t < 30.8) {
        // Boy 2 spins the bamboo pole around a small circular radius to build power!
        const ang = Math.atan2(targetY - boy2Hand.y, targetX - boy2Hand.x);
        const wobble = Math.sin(windTime * (10 + chargeProgress * 18)) * 0.18;
        const len = 300;
        drawBambooPole(
          ctx,
          boy2Hand.x,
          boy2Hand.y,
          boy2Hand.x + Math.cos(ang + wobble) * len,
          boy2Hand.y + Math.sin(ang + wobble) * len,
          55,
          chargeProgress,
        );
      } else if (t >= 30.8 && t < 32.0) {
        // Pole soaring straight up like an arrow to strike the winning mango stem!
        const flyP = easeInOutQuad((t - 30.8) / 1.2);
        const startX = 595;
        const startY = groundY - 105;
        const tipX = lerp(startX + 190, targetX, flyP);
        const tipY = lerp(startY - 190, targetY, flyP);
        const ang = Math.atan2(targetY - startY, targetX - startX);
        const poleLen = 340;
        drawBambooPole(
          ctx,
          tipX - Math.cos(ang) * poleLen,
          tipY - Math.sin(ang) * poleLen,
          tipX,
          tipY,
          0,
          1.0,
        );
      } else if (t >= 32.0 && t < 33.7) {
        // Pole falls harmlessly off to the right after hitting mango
        const fallP = easeInOutQuad((t - 32.0) / 1.7);
        const tipX = lerp(targetX, 1140, fallP);
        const tipY = lerp(targetY, 610, fallP * fallP);
        drawBambooPole(ctx, tipX - 180, tipY - 220 * (1 - fallP), tipX, tipY, 0);
      }

      // Impact flash at 32.0s!
      if (t >= 32.0 && t < 32.45 && winnerPlacement) {
        const flashP = (t - 32.0) / 0.45;
        ctx.save();
        ctx.translate(targetX, targetY);
        ctx.globalAlpha = 1 - flashP;
        ctx.strokeStyle = '#ffec6e';
        ctx.lineWidth = 4;
        for (let r = 0; r < 8; r++) {
          const a = (r / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * 14, Math.sin(a) * 14);
          ctx.lineTo(Math.cos(a) * (32 + flashP * 35), Math.sin(a) * (32 + flashP * 35));
          ctx.stroke();
        }
        ctx.font = '800 26px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#ff5b2e';
        ctx.strokeStyle = '#462a18';
        ctx.lineWidth = 5;
        ctx.strokeText('BỐP!', 24, -18);
        ctx.fillText('BỐP!', 24, -18);
        ctx.restore();
      }
    }

    // 6.5 Render Comic Speech Dialogue Bubbles
    const curDialogue = STORY_DIALOGUES.find((d) => t >= d.start && t < d.end);
    if (curDialogue) {
      let bx = boy1X;
      let by = boy1Y - 145;
      if (curDialogue.speaker === 'girl') {
        bx = girlX;
        by = girlY - 145;
      } else if (curDialogue.speaker === 'boy2') {
        bx = 585;
        by = groundY - 150;
      } else if (curDialogue.speaker === 'all') {
        bx = 475;
        by = groundY - 175;
      }

      const popScale = Math.min(1, easeOutCubic((t - curDialogue.start) / 0.18));
      drawComicDialogue(ctx, {
        x: bx,
        y: by,
        speaker: curDialogue.speaker,
        text: curDialogue.text,
        popScale,
      });
    }

    // 7. Winning Mango falling smoothly right into the Muối Tôm plate (32.0s -> 37.0s)
    if (t >= 32.0 && winnerPlacement) {
      const fallDur = 1.7;
      const fallP = clamp01((t - 32.0) / fallDur);
      const landX = plateX;
      const landY = plateY - 125;

      const curX = lerp(winnerPlacement.x, landX, easeInOutQuad(fallP));
      const arcLift = Math.sin(fallP * Math.PI) * -18;
      const curY = lerp(winnerPlacement.y, landY, fallP * fallP) + arcLift;
      const spin = fallP < 1 ? fallP * Math.PI * 1.85 : 0.14;
      const bounce =
        t >= 33.7 && t < 34.4
          ? Math.abs(Math.sin(((t - 33.7) / 0.7) * Math.PI * 2)) * 12 * (1 - (t - 33.7) / 0.7)
          : 0;

      drawMangoWithLabel(
        ctx,
        assets,
        winnerPlacement.item.label,
        winnerPlacement.item.colorIndex,
        curX,
        curY - bounce,
        spin,
        winnerPlacement.scale * (fallP < 1 ? 1.0 : 0.92),
      );
    }
  }

  // 8. Render ambient & story particles (wind leaves, salt pour, salt splash, confetti)
  particles.forEach((pt) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, pt.alpha);
    ctx.translate(pt.x, pt.y);
    ctx.rotate(pt.rot);
    if (pt.kind === 'leaf') {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, pt.size * 1.4, pt.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (pt.kind === 'confetti') {
      ctx.fillStyle = pt.color;
      ctx.fillRect(-pt.size, -pt.size * 0.5, pt.size * 2, pt.size);
    } else {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(0, 0, pt.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
}
