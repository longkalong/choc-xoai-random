import React from 'react';
import { CheckCircle2, RotateCcw, Sparkles, TreeDeciduous } from 'lucide-react';
import { MANGO_COLOR_VARIANTS } from '../data/defaultItems';
import { MangoItem } from '../types/story';

interface ControlDrawerProps {
  rawText: string;
  onChangeText: (text: string) => void;
  items: MangoItem[];
  noRepeat: boolean;
  onToggleNoRepeat: () => void;
  modeLabel: 'formation' | 'student';
  onChangeModeLabel: (m: 'formation' | 'student') => void;
  onResetPicked: () => void;
  onRestoreDefaults: () => void;
  isPlaying: boolean;
}

export const ControlDrawer: React.FC<ControlDrawerProps> = ({
  rawText,
  onChangeText,
  items,
  noRepeat,
  onToggleNoRepeat,
  modeLabel,
  onChangeModeLabel,
  onResetPicked,
  onRestoreDefaults,
  isPlaying,
}) => {
  const remainingCount = items.filter((it) => !it.picked).length;
  const pickedCount = items.length - remainingCount;

  return (
    <aside className="ghibli-card p-4 flex flex-col gap-3.5 h-full">
      <div className="flex items-center justify-between gap-2 border-b border-[#e5d8bf] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#e7f4e1] border border-[#72a961] flex items-center justify-center text-[#24592c]">
            <TreeDeciduous size={18} />
          </div>
          <div>
            <h2 className="m-0 text-base font-extrabold text-[#3e2616]">Vườn Xoài Dữ Liệu</h2>
            <p className="m-0 text-xs text-[#6e5540]">Mỗi lần xuống dòng = sinh 1 quả xoài</p>
          </div>
        </div>

        <span
          className="px-2.5 py-1 rounded-full text-xs font-extrabold"
          style={{ background: '#fef0d6', color: '#9c4215', border: '1px solid #e7be85' }}
        >
          {remainingCount}/{items.length} quả
        </span>
      </div>

      {/* Mode Switch: Đội hình kiểm tra vs Gọi lên bảng */}
      <div className="flex gap-1.5 bg-[#f3ead6] p-1 rounded-xl border border-[#dfcfb0]">
        <button
          type="button"
          onClick={() => onChangeModeLabel('formation')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition ${
            modeLabel === 'formation'
              ? 'bg-[#fffdf6] text-[#2d6a36] shadow-sm border border-[#c7d9b9]'
              : 'text-[#6e5540]'
          }`}
        >
          Đề / Đội hình
        </button>
        <button
          type="button"
          onClick={() => onChangeModeLabel('student')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition ${
            modeLabel === 'student'
              ? 'bg-[#fffdf6] text-[#2d6a36] shadow-sm border border-[#c7d9b9]'
              : 'text-[#6e5540]'
          }`}
        >
          Gọi tên lên bảng
        </button>
      </div>

      {/* Textarea: Mỗi lần xuống dòng là sinh 1 quả xoài */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="mango-input-list" className="text-xs font-bold text-[#4e3422]">
            Danh sách (Enter xuống dòng để thêm quả):
          </label>
          <button
            type="button"
            disabled={isPlaying}
            onClick={onRestoreDefaults}
            className="text-[11px] font-bold text-[#2f7ba3] hover:underline bg-transparent border-0 cursor-pointer p-0 disabled:opacity-50"
          >
            Nạp mẫu 11 đội hình
          </button>
        </div>
        <textarea
          id="mango-input-list"
          value={rawText}
          onChange={(e) => onChangeText(e.target.value)}
          disabled={isPlaying}
          rows={8}
          placeholder="Nhập tên bạn hoặc tên đội hình...&#10;Mỗi dòng sẽ mọc ra 1 quả xoài màu sắc riêng!"
          className="w-full rounded-xl border-2 border-[#d5c3a1] bg-[#fffdf7] p-2.5 text-xs leading-relaxed text-[#3e2616] focus:outline-none focus:border-[#4b8a49] resize-y disabled:opacity-60"
        />
      </div>

      {/* No-Repeat Toggle + Reset */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#f7f0df] border border-[#dfd0b1]">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={noRepeat}
            onChange={onToggleNoRepeat}
            className="w-4 h-4 accent-[#2d6a36] cursor-pointer"
          />
          <div>
            <div className="text-xs font-extrabold text-[#3e2616]">Không gọi trùng</div>
            <div className="text-[11px] text-[#6e5540]">Quả rơi xong sẽ biến mất khỏi cây</div>
          </div>
        </label>

        <button
          type="button"
          onClick={onResetPicked}
          disabled={pickedCount === 0 || isPlaying}
          className="btn-secondary px-2.5 py-1.5 text-xs flex items-center gap-1 disabled:opacity-45"
          title="Đưa tất cả quả xoài trở lại cây"
        >
          <RotateCcw size={13} />
          <span>Reset ({pickedCount})</span>
        </button>
      </div>

      {/* Live preview chips showing each mango color & picked state */}
      <div className="flex flex-col gap-1.5 flex-1 min-h-0">
        <div className="text-xs font-bold text-[#4e3422] flex items-center gap-1">
          <Sparkles size={13} className="text-[#d97706]" />
          <span>Các quả xoài trên cây ({items.length}):</span>
        </div>
        <div className="overflow-y-auto max-h-56 pr-1 flex flex-col gap-1.5">
          {items.map((item, idx) => {
            const variant = MANGO_COLOR_VARIANTS[item.colorIndex % MANGO_COLOR_VARIANTS.length];
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs border transition"
                style={{
                  background: item.picked ? '#efe9dc' : variant.tagBg,
                  borderColor: item.picked ? '#d5cbb8' : variant.tagBorder,
                  opacity: item.picked ? 0.62 : 1,
                }}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                  style={{ background: variant.tagBorder }}
                  title={variant.name}
                />
                <span
                  className={`flex-1 font-semibold leading-snug ${
                    item.picked ? 'line-through text-[#786552]' : 'text-[#2e1c0f]'
                  }`}
                >
                  {idx + 1}. {item.label}
                </span>
                {item.picked && <CheckCircle2 size={14} className="text-[#2d6a36] shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
