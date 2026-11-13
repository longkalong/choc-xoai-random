import React from 'react';
import { Award, Play, X } from 'lucide-react';
import { MANGO_COLOR_VARIANTS } from '../data/defaultItems';
import { MangoItem } from '../types/story';

interface ResultModalProps {
  winner: MangoItem | null;
  modeLabel: 'formation' | 'student';
  remainingAfterPick: number;
  onClose: () => void;
  onPlayAgain: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  winner,
  modeLabel,
  remainingAfterPick,
  onClose,
  onPlayAgain,
}) => {
  if (!winner) return null;

  const variant = MANGO_COLOR_VARIANTS[winner.colorIndex % MANGO_COLOR_VARIANTS.length];
  const heading =
    modeLabel === 'formation' ? 'ĐỘI HÌNH ĐƯỢC CHỌN!' : 'XIN CHÚC MỪNG BẠN!';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="animate-pop-in relative w-full max-w-lg rounded-3xl border-[3px] border-[#5b381e] bg-[#fffaf0] p-6 sm:p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#f3e7d1] hover:bg-[#e9d5b3] border border-[#c6ae87] flex items-center justify-center text-[#4e3422] cursor-pointer"
          aria-label="Đóng"
        >
          <X size={16} />
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fef0c7] border border-[#d99326] text-[#944110] text-xs font-extrabold uppercase tracking-wider mb-3">
          <Award size={15} />
          <span>{heading}</span>
        </div>

        <div className="flex justify-center my-2">
          <img
            src="/assets/mango_fruit.png"
            alt="Quả xoài trúng thưởng"
            className="w-24 h-32 object-contain drop-shadow-md"
            style={{
              filter: `hue-rotate(${variant.hueRotateDeg}deg) saturate(${variant.saturate}) brightness(${variant.brightness})`,
            }}
          />
        </div>

        <div
          className="my-3 rounded-2xl p-4 sm:p-5 border-2 shadow-inner"
          style={{
            background: variant.tagBg,
            borderColor: variant.tagBorder,
          }}
        >
          <p
            className="m-0 text-xl sm:text-2xl font-extrabold leading-snug"
            style={{ color: variant.tagText }}
          >
            {winner.label}
          </p>
        </div>

        <p className="text-xs sm:text-sm font-medium text-[#6e5540] mb-5">
          Quả xoài đã rơi gọn vào đĩa muối tôm Tây Ninh!{' '}
          {remainingAfterPick > 0
            ? `(Còn ${remainingAfterPick} quả trên cây)`
            : '(Đã chọc hết xoài trên cây!)'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {remainingAfterPick > 0 && (
            <button
              type="button"
              onClick={onPlayAgain}
              className="btn-primary px-5 py-2.5 text-sm sm:text-base flex items-center gap-2"
            >
              <Play size={16} fill="currentColor" />
              <span>Chọc Lượt Tiếp Theo</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary px-4 py-2.5 text-sm"
          >
            Đóng bảng kết quả
          </button>
        </div>
      </div>
    </div>
  );
};
