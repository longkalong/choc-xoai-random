// Default items extracted directly from user's uploaded training document image
export const DEFAULT_FORMATIONS: string[] = [
  'Đội hình 1 lăng B vòi cuộn',
  'Đội hình 1 lăng A có ống hút',
  'Đội hình 1 lăng A cắt lăng A phát triển lăng B',
  'Đội hình 02 lăng B có ống hút',
  'Đội hình 2 lăng A có ống hút',
  'Đội hình phun bọt chữa cháy lấy bọt từ ezectơ',
  'Đội hình chữa cháy trên cao 1 lăng B lên cao qua thang 2 hoặc thang 3',
  'Đội hình sử dụng thiết bị cắt, banh, tách thủy lực',
  'Đội hình sử dụng túi nâng',
  'Đội hình CNCH sử dụng cầu dây nghiêng dùng cáng hoặc đai',
  'Đội hình CNCH sự cố tai nạn giao thông',
];

export const DEFAULT_INPUT_TEXT = DEFAULT_FORMATIONS.join('\n');

// Distinct warm Ghibli-inspired mango color variants (green -> golden -> blush)
export interface MangoColorVariant {
  name: string;
  hueRotateDeg: number;
  saturate: number;
  brightness: number;
  tagBg: string;
  tagBorder: string;
  tagText: string;
}

export const MANGO_COLOR_VARIANTS: MangoColorVariant[] = [
  {
    name: 'Xoài xanh non',
    hueRotateDeg: 28,
    saturate: 1.18,
    brightness: 0.98,
    tagBg: 'rgba(247, 252, 232, 0.94)',
    tagBorder: '#4f7a28',
    tagText: '#1e350d',
  },
  {
    name: 'Xoài xanh hườm',
    hueRotateDeg: 10,
    saturate: 1.12,
    brightness: 1.02,
    tagBg: 'rgba(255, 250, 224, 0.94)',
    tagBorder: '#7a8a21',
    tagText: '#2c360a',
  },
  {
    name: 'Xoài vàng ươm',
    hueRotateDeg: -14,
    saturate: 1.25,
    brightness: 1.06,
    tagBg: 'rgba(255, 248, 214, 0.95)',
    tagBorder: '#b87514',
    tagText: '#432504',
  },
  {
    name: 'Xoài má hồng',
    hueRotateDeg: -28,
    saturate: 1.32,
    brightness: 1.04,
    tagBg: 'rgba(255, 242, 228, 0.95)',
    tagBorder: '#c25229',
    tagText: '#4a1b0a',
  },
  {
    name: 'Xoài tượng ngọc',
    hueRotateDeg: 40,
    saturate: 1.05,
    brightness: 0.95,
    tagBg: 'rgba(240, 250, 235, 0.94)',
    tagBorder: '#2f6d43',
    tagText: '#11301b',
  },
  {
    name: 'Xoài cát mật',
    hueRotateDeg: -20,
    saturate: 1.18,
    brightness: 1.08,
    tagBg: 'rgba(255, 245, 212, 0.95)',
    tagBorder: '#9e6215',
    tagText: '#3b2104',
  },
];
