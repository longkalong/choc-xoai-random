import React, { useEffect, useRef, useState } from 'react';
import { FastForward, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { sfx } from '../audio/sfx';
import { LoadedAssets } from '../engine/assetLoader';
import {
  createStoryRunPlan,
  getPhaseInfo,
  Particle,
  renderStoryFrame,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  StoryRunPlan,
  TOTAL_STORY_SEC,
} from '../engine/storyRenderer';
import { MangoItem, MangoPlacement, SpeedMultiplier } from '../types/story';

interface StageCanvasProps {
  assets: LoadedAssets;
  placements: MangoPlacement[];
  activeItems: MangoItem[];
  speed: SpeedMultiplier;
  onChangeSpeed: (s: SpeedMultiplier) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPickComplete: (winner: MangoItem) => void;
  onStoryFinish: () => void;
  isPlaying: boolean;
  runNonce: number;
  onStartPlay: () => void;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({
  assets,
  placements,
  activeItems,
  speed,
  onChangeSpeed,
  soundEnabled,
  onToggleSound,
  onPickComplete,
  onStoryFinish,
  isPlaying,
  runNonce,
  onStartPlay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [caption, setCaption] = useState(getPhaseInfo(0).caption);

  const assetsRef = useRef(assets);
  assetsRef.current = assets;

  const placementsRef = useRef(placements);
  placementsRef.current = placements;

  const onPickCompleteRef = useRef(onPickComplete);
  onPickCompleteRef.current = onPickComplete;

  const onStoryFinishRef = useRef(onStoryFinish);
  onStoryFinishRef.current = onStoryFinish;

  const activeItemsRef = useRef(activeItems);
  activeItemsRef.current = activeItems;

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const stateRef = useRef({
    t: 0,
    windTime: 0,
    isPlaying: false,
    showFinaleScene: false,
    speed: 1 as SpeedMultiplier,
    runPlan: null as StoryRunPlan | null,
    snapshotPlacements: [] as MangoPlacement[],
    winnerItem: null as MangoItem | null,
    particles: [] as Particle[],
    triggeredCues: new Set<string>(),
    lastSaltEmit: 0,
    lastStepEmit: 0,
    completedNotified: false,
    finishNotified: false,
  });

  useEffect(() => {
    stateRef.current.speed = speed;
  }, [speed]);

  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (!isPlaying && stateRef.current.showFinaleScene && runNonce === 0) {
      stateRef.current.showFinaleScene = false;
      stateRef.current.t = 0;
    }
  }, [placements, isPlaying, runNonce]);

  useEffect(() => {
    if (runNonce === 0 || !isPlayingRef.current) return;
    const currentActive = activeItemsRef.current;
    if (currentActive.length === 0) {
      onStoryFinishRef.current();
      return;
    }

    const chosen = currentActive[Math.floor(Math.random() * currentActive.length)];
    const currentPlacements = placementsRef.current;
    const plan = createStoryRunPlan(currentPlacements, chosen.id);

    stateRef.current.t = 0;
    stateRef.current.isPlaying = true;
    stateRef.current.showFinaleScene = false;
    stateRef.current.runPlan = plan;
    stateRef.current.snapshotPlacements = currentPlacements;
    stateRef.current.winnerItem = chosen;
    stateRef.current.particles = [];
    stateRef.current.triggeredCues.clear();
    stateRef.current.lastSaltEmit = 0;
    stateRef.current.lastStepEmit = 0;
    stateRef.current.completedNotified = false;
    stateRef.current.finishNotified = false;

    setElapsedSec(0);
    setCaption(getPhaseInfo(0.1).caption);
    sfx.unlock();
    sfx.playWindBreeze();
  }, [runNonce]);

  useEffect(() => {
    let rafId = 0;
    let lastNow = performance.now();
    let uiSyncAccum = 0;

    const spawnParticles = (t: number, dt: number, isRun: boolean) => {
      const st = stateRef.current;

      if (Math.random() < dt * 1.35) {
        st.particles.push({
          x: 420 + Math.random() * 820,
          y: 70 + Math.random() * 240,
          vx: -35 - Math.random() * 35,
          vy: 14 + Math.random() * 20,
          size: 4 + Math.random() * 3.5,
          color: Math.random() > 0.3 ? '#6db349' : '#b7d459',
          alpha: 0.78,
          life: 0,
          maxLife: 4.5,
          kind: 'leaf',
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 3,
        });
      }

      if (!isRun) return;

      if ((t >= 5 && t < 10) || (t >= 25 && t < 26.5)) {
        if (t - st.lastStepEmit > 0.32) {
          st.lastStepEmit = t;
          sfx.playFootstep();
          st.particles.push({
            x: t < 10 ? 120 + ((t - 5) / 5) * 340 : 210,
            y: 600,
            vx: -25,
            vy: -15,
            size: 7,
            color: 'rgba(224, 198, 158, 0.75)',
            alpha: 0.7,
            life: 0,
            maxLife: 0.55,
            kind: 'dust',
            rot: 0,
            vrot: 0,
          });
        }
      }

      if (t >= 11.1 && t < 12.9 && t - st.lastSaltEmit > 0.04) {
        st.lastSaltEmit = t;
        for (let i = 0; i < 3; i++) {
          st.particles.push({
            x: 525 + (Math.random() - 0.5) * 14,
            y: 536 + Math.random() * 8,
            vx: -14 + (Math.random() - 0.5) * 16,
            vy: 95 + Math.random() * 45,
            size: 2.3 + Math.random() * 1.4,
            color: Math.random() > 0.35 ? '#e85a1c' : '#c62f12',
            alpha: 0.95,
            life: 0,
            maxLife: 0.68,
            kind: 'salt',
            rot: 0,
            vrot: 0,
          });
        }
      }

      const fireOnce = (key: string, fn: () => void) => {
        if (!st.triggeredCues.has(key)) {
          st.triggeredCues.add(key);
          fn();
        }
      };

      if (t >= 11.2) fireOnce('salt', () => sfx.playSaltPour());
      if (t >= 19.3) fireOnce('poke1', () => sfx.playPokeWhoosh());
      if (t >= 20.6) fireOnce('poke2', () => sfx.playPokeWhoosh());
      if (t >= 22.0) fireOnce('poke3', () => sfx.playPokeWhoosh());
      if (t >= 23.4) fireOnce('poke4', () => sfx.playPokeWhoosh());
      if (t >= 25.4) fireOnce('hero_bubble', () => sfx.playBubblePop());
      if (t >= 26.8) fireOnce('boy2_poke1', () => sfx.playPokeWhoosh());
      if (t >= 28.0) fireOnce('boy2_poke2', () => sfx.playPokeWhoosh());
      if (t >= 28.9) fireOnce('charge_spin', () => sfx.playChargePowerUp());
      if (t >= 30.8) fireOnce('throw', () => sfx.playThrowLaunch());

      if (t >= 32.0) {
        fireOnce('hit_twig', () => {
          sfx.playMangoHitAndPlop();
          const winPos = st.snapshotPlacements.find((p) => p.item.id === st.runPlan?.winnerId);
          const hx = winPos?.x ?? 820;
          const hy = winPos?.y ?? 200;
          for (let i = 0; i < 8; i++) {
            st.particles.push({
              x: hx + (Math.random() - 0.5) * 30,
              y: hy + (Math.random() - 0.5) * 20,
              vx: (Math.random() - 0.5) * 140,
              vy: -60 + Math.random() * 80,
              size: 5 + Math.random() * 3,
              color: '#5fa843',
              alpha: 1,
              life: 0,
              maxLife: 1.6,
              kind: 'leaf',
              rot: Math.random() * 6,
              vrot: (Math.random() - 0.5) * 8,
            });
          }
        });
      }

      if (t >= 33.7) {
        fireOnce('land_plate', () => {
          sfx.playMangoHitAndPlop();
          for (let i = 0; i < 24; i++) {
            st.particles.push({
              x: 515 + (Math.random() - 0.5) * 24,
              y: 598,
              vx: (Math.random() - 0.5) * 210,
              vy: -130 - Math.random() * 140,
              size: 2.8 + Math.random() * 2,
              color: Math.random() > 0.35 ? '#ef6222' : '#ffad52',
              alpha: 1,
              life: 0,
              maxLife: 1.1,
              kind: 'salt',
              rot: 0,
              vrot: 0,
            });
          }
          const confettiColors = ['#e6951d', '#d64526', '#469e4d', '#3b82b6', '#f4d03f'];
          for (let i = 0; i < 36; i++) {
            st.particles.push({
              x: 515 + (Math.random() - 0.5) * 280,
              y: 350 + (Math.random() - 0.5) * 160,
              vx: (Math.random() - 0.5) * 260,
              vy: -180 - Math.random() * 140,
              size: 5 + Math.random() * 4,
              color: confettiColors[i % confettiColors.length],
              alpha: 1,
              life: 0,
              maxLife: 2.4,
              kind: 'confetti',
              rot: Math.random() * 6,
              vrot: (Math.random() - 0.5) * 10,
            });
          }
        });
      }

      if (t >= 34.8) {
        fireOnce('fanfare', () => {
          sfx.playVictoryFanfare();
          if (!st.completedNotified && st.winnerItem) {
            st.completedNotified = true;
            onPickCompleteRef.current(st.winnerItem);
          }
        });
      }
    };

    const tick = (now: number) => {
      const rawDt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      const st = stateRef.current;

      st.windTime += rawDt;

      if (st.isPlaying) {
        const storyDt = rawDt * st.speed;
        st.t = Math.min(TOTAL_STORY_SEC, st.t + storyDt);
        spawnParticles(st.t, storyDt, true);

        uiSyncAccum += rawDt;
        if (uiSyncAccum >= 0.08 || st.t >= TOTAL_STORY_SEC) {
          uiSyncAccum = 0;
          setElapsedSec(st.t);
          setCaption(getPhaseInfo(st.t).caption);
        }

        if (st.t >= TOTAL_STORY_SEC) {
          st.isPlaying = false;
          st.showFinaleScene = true;
          if (!st.finishNotified) {
            st.finishNotified = true;
            onStoryFinishRef.current();
          }
        }
      } else {
        spawnParticles(0, rawDt, false);
      }

      st.particles = st.particles.filter((pt) => {
        const speedScale = st.isPlaying ? Math.min(2.2, st.speed) : 1;
        const dtP = rawDt * speedScale;
        pt.life += dtP;
        pt.x += pt.vx * dtP;
        pt.y += pt.vy * dtP;
        if (pt.kind === 'salt' || pt.kind === 'confetti') {
          pt.vy += 320 * dtP;
        }
        pt.rot += pt.vrot * dtP;
        pt.alpha = Math.max(0, 1 - pt.life / pt.maxLife);
        return pt.life < pt.maxLife;
      });

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        const activePlacements =
          st.isPlaying || st.showFinaleScene ? st.snapshotPlacements : placementsRef.current;

        renderStoryFrame({
          ctx,
          assets: assetsRef.current,
          placements: activePlacements,
          runPlan: st.runPlan,
          t: st.t,
          windTime: st.windTime,
          isPlaying: st.isPlaying || st.showFinaleScene,
          particles: st.particles,
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleSkipToEnd = () => {
    const st = stateRef.current;
    if (!st.isPlaying) return;
    st.t = 31.8;
    setElapsedSec(31.8);
    setCaption(getPhaseInfo(31.8).caption);
  };

  const progressPct = Math.min(100, (elapsedSec / TOTAL_STORY_SEC) * 100);

  return (
    <div className="ghibli-card p-3 sm:p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold tracking-wide shrink-0"
            style={{
              background: isPlaying ? '#fce8c8' : '#e6f2e2',
              color: isPlaying ? '#9a3412' : '#1f5328',
              border: '1.5px solid rgba(70,42,24,0.2)',
            }}
          >
            {isPlaying ? `${elapsedSec.toFixed(1)}s / 37s` : `Sẵn sàng (${activeItems.length} quả)`}
          </span>
          <p className="m-0 text-sm sm:text-base font-semibold text-[#3e2616] truncate">
            {caption}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 shrink-0"
          title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}</span>
        </button>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl border-2 border-[#6c4b2c] bg-[#cfe9f5]"
        style={{ aspectRatio: '16 / 9' }}
      >
        <canvas
          ref={canvasRef}
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          className="w-full h-full block"
        />

        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #6bb94b, #f09c24, #d9481a)',
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onStartPlay}
            disabled={isPlaying || activeItems.length === 0}
            className="btn-primary px-5 py-2.5 text-base flex items-center gap-2"
          >
            <Play size={18} fill="currentColor" />
            <span>
              {activeItems.length === 0
                ? 'Hết xoài trên cây — Hãy Reset!'
                : isPlaying
                  ? 'Đang diễn câu chuyện...'
                  : 'Chọc Xoài Ngẫu Nhiên!'}
            </span>
          </button>

          {isPlaying && (
            <button
              type="button"
              onClick={handleSkipToEnd}
              className="btn-secondary px-3.5 py-2.5 text-sm flex items-center gap-1.5"
            >
              <SkipForward size={16} />
              <span>Tới cảnh phi sào</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#6e5540] flex items-center gap-1">
            <FastForward size={14} />
            Tốc độ:
          </span>
          {([1, 3, 4] as SpeedMultiplier[]).map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => onChangeSpeed(sp)}
              className={`speed-pill ${speed === sp ? 'active' : ''}`}
            >
              x{sp} {sp === 1 ? '(37s)' : sp === 3 ? '(~12s)' : '(~9s)'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
