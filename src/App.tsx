import { useCallback, useEffect, useMemo, useState } from 'react';
import { ControlDrawer } from './components/ControlDrawer';
import { ResultModal } from './components/ResultModal';
import { StageCanvas } from './components/StageCanvas';
import { DEFAULT_INPUT_TEXT, MANGO_COLOR_VARIANTS } from './data/defaultItems';
import { loadAllAssets, LoadedAssets } from './engine/assetLoader';
import { computeMangoPlacements } from './engine/mangoLayout';
import { MangoItem, SpeedMultiplier } from './types/story';

const STORAGE_KEY_TEXT = 'choc_xoai_raw_text_v1';
const STORAGE_KEY_PICKED = 'choc_xoai_picked_labels_v1';
const STORAGE_KEY_NOREPEAT = 'choc_xoai_no_repeat_v1';

function parseTextToItems(rawText: string, pickedLabels: Set<string>): MangoItem[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((label, idx) => ({
    id: `mango-${idx}-${label.slice(0, 18)}`,
    label,
    colorIndex: idx % MANGO_COLOR_VARIANTS.length,
    picked: pickedLabels.has(label),
  }));
}

export function App() {
  const [rawText, setRawText] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TEXT) ?? DEFAULT_INPUT_TEXT;
    } catch {
      return DEFAULT_INPUT_TEXT;
    }
  });

  const [pickedLabels, setPickedLabels] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PICKED);
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  const [noRepeat, setNoRepeat] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOREPEAT);
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const [speed, setSpeed] = useState<SpeedMultiplier>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [modeLabel, setModeLabel] = useState<'formation' | 'student'>('formation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [runNonce, setRunNonce] = useState(0);
  const [winnerModalItem, setWinnerModalItem] = useState<MangoItem | null>(null);
  const [assets, setAssets] = useState<LoadedAssets>({
    bgYard: null,
    saltJar: null,
    mangoBase: null,
    mangoVariants: [],
    charGirl: null,
    charBoy1: null,
    charBoy2: null,
    maple: {
      girl: { walk: [], sit: null, stand: null, smile: null, jump: null },
      boy1: { walk: [], stand: null, alert: null, stab: [], troubled: null, jump: null },
      boy2: { walk: [], stand: null, stab: [], swing: [], shoot: [], troubled: null, jump: null },
    },
  });

  useEffect(() => {
    loadAllAssets().then(setAssets);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEXT, rawText);
    } catch {
      // ignore storage errors
    }
  }, [rawText]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PICKED, JSON.stringify([...pickedLabels]));
    } catch {
      // ignore storage errors
    }
  }, [pickedLabels]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOREPEAT, String(noRepeat));
    } catch {
      // ignore storage errors
    }
  }, [noRepeat]);

  const items = useMemo(
    () => parseTextToItems(rawText, noRepeat ? pickedLabels : new Set()),
    [rawText, pickedLabels, noRepeat],
  );

  const activeItems = useMemo(() => items.filter((it) => !it.picked), [items]);
  const placements = useMemo(() => computeMangoPlacements(items), [items]);

  const handleStartPlay = useCallback(() => {
    if (activeItems.length === 0) return;
    setWinnerModalItem(null);
    setIsPlaying(true);
    setRunNonce((n) => n + 1);
  }, [activeItems.length]);

  const handlePickComplete = useCallback(
    (winner: MangoItem) => {
      setWinnerModalItem(winner);
      if (noRepeat) {
        setPickedLabels((prev) => {
          const next = new Set(prev);
          next.add(winner.label);
          return next;
        });
      }
    },
    [noRepeat],
  );

  const handleStoryFinish = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleResetPicked = useCallback(() => {
    setPickedLabels(new Set());
    setWinnerModalItem(null);
    setRunNonce(0);
  }, []);

  const handleRestoreDefaults = useCallback(() => {
    setRawText(DEFAULT_INPUT_TEXT);
    setPickedLabels(new Set());
    setWinnerModalItem(null);
    setRunNonce(0);
  }, []);

  const handlePlayAgainFromModal = useCallback(() => {
    setWinnerModalItem(null);
    setTimeout(() => {
      setIsPlaying(true);
      setRunNonce((n) => n + 1);
    }, 60);
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-3 py-3 sm:px-5 sm:py-4 max-w-[1560px] mx-auto gap-3">
      <header className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-3">
          <img
            src="/assets/mango_fruit.png"
            alt="Logo Xoài"
            className="w-9 h-11 object-contain drop-shadow-sm"
          />
          <div>
            <h1
              className="m-0 text-xl sm:text-2xl font-extrabold tracking-tight text-[#2e1c0f]"
              style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              Chọc Xoài Muối Tôm Tây Ninh
            </h1>
            <p className="m-0 text-xs sm:text-sm text-[#6e5540]">
              Random gọi tên & bốc đội hình kiểm tra theo cốt truyện Ghibli 37 giây
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#5a422d]">
          <span className="px-3 py-1 rounded-full bg-[#fffaf0] border border-[#dccaa8]">
            Kịch bản: 00–37s • Tua x1 / x3 / x4
          </span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
        <section className="lg:col-span-8 xl:col-span-9">
          <StageCanvas
            assets={assets}
            placements={placements}
            activeItems={activeItems}
            speed={speed}
            onChangeSpeed={setSpeed}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((s) => !s)}
            onPickComplete={handlePickComplete}
            onStoryFinish={handleStoryFinish}
            isPlaying={isPlaying}
            runNonce={runNonce}
            onStartPlay={handleStartPlay}
          />
        </section>

        <section className="lg:col-span-4 xl:col-span-3">
          <ControlDrawer
            rawText={rawText}
            onChangeText={(txt) => {
              setRawText(txt);
              setRunNonce(0);
            }}
            items={items}
            noRepeat={noRepeat}
            onToggleNoRepeat={() => setNoRepeat((v) => !v)}
            modeLabel={modeLabel}
            onChangeModeLabel={setModeLabel}
            onResetPicked={handleResetPicked}
            onRestoreDefaults={handleRestoreDefaults}
            isPlaying={isPlaying}
          />
        </section>
      </main>

      <ResultModal
        winner={winnerModalItem}
        modeLabel={modeLabel}
        remainingAfterPick={activeItems.length}
        onClose={() => setWinnerModalItem(null)}
        onPlayAgain={handlePlayAgainFromModal}
      />
    </div>
  );
}

export default App;
