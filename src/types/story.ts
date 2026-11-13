export interface MangoItem {
  id: string;
  label: string;
  colorIndex: number;
  picked: boolean;
}

export interface MangoPlacement {
  item: MangoItem;
  x: number; // normalized or 1280x720 stage coords
  y: number;
  scale: number;
  baseAngle: number;
  phaseOffset: number;
  swayAmp: number;
}

export type SpeedMultiplier = 1 | 3 | 4;

export type StoryPhaseId =
  | 'IDLE'
  | 'WIND_SWAY'       // 00 - 05s
  | 'KIDS_RUN'        // 05 - 10s
  | 'SALT_PREP'       // 10 - 13s
  | 'SEARCH_POLE'     // 13 - 17s
  | 'RAISE_POLE'      // 17 - 19s
  | 'RANDOM_POKES'    // 19 - 23s
  | 'FOCUS_AND_HERO'  // 23 - 29s (at 25s Boy 2 arrives: "Để tao chọc cho!")
  | 'THROW_POLE'      // 29 - 32s
  | 'MANGO_FALL_WIN'  // 32 - 37s
  | 'FINISHED';

export interface StoryProgress {
  phase: StoryPhaseId;
  elapsedSec: number; // 0..37
  totalSec: number;
  caption: string;
  isRunning: boolean;
}
