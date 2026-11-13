"""Convert AI-generated white-background sprites into clean transparent PNGs."""
from collections import deque
from pathlib import Path
import numpy as np
from PIL import Image

BRAIN_DIR = Path("/Users/maxi/.gemini/antigravity/brain/f1b791bf-012b-4dc2-a919-057a096177ef")
OUT_DIR = Path("/Users/maxi/Library/CloudStorage/OneDrive-Personal/AI Antigravity/choc-xoai-random/public/assets")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def remove_white_bg_floodfill(src: Path, dst: Path, threshold: int = 238, soft_band: int = 28) -> None:
    img = Image.open(src).convert("RGBA")
    arr = np.array(img, dtype=np.int16)
    h, w, _ = arr.shape

    # Brightness and low-saturation test for background white/near-white
    rgb = arr[:, :, :3]
    min_c = rgb.min(axis=2)
    max_c = rgb.max(axis=2)
    is_bg_candidate = (min_c >= threshold) & ((max_c - min_c) <= 22)

    visited = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    # Seed flood fill from all 4 borders
    for x in range(w):
        if is_bg_candidate[0, x]:
            visited[0, x] = True
            queue.append((0, x))
        if is_bg_candidate[h - 1, x]:
            visited[h - 1, x] = True
            queue.append((h - 1, x))
    for y in range(h):
        if is_bg_candidate[y, 0]:
            visited[y, 0] = True
            queue.append((y, 0))
        if is_bg_candidate[y, w - 1]:
            visited[y, w - 1] = True
            queue.append((y, w - 1))

    while queue:
        cy, cx = queue.popleft()
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_bg_candidate[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))

    alpha = np.full((h, w), 255, dtype=np.uint8)
    alpha[visited] = 0

    # Soft anti-aliased edge feathering for 1-px neighbors of removed bg
    border_mask = np.zeros((h, w), dtype=bool)
    for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        shifted = np.roll(visited, shift=(dy, dx), axis=(0, 1))
        border_mask |= (shifted & (~visited))

    edge_luma = rgb[border_mask].mean(axis=1)
    # Feather bright anti-aliased halo pixels gently
    fade = np.clip((255.0 - edge_luma) / max(soft_band, 1), 0.15, 1.0)
    alpha[border_mask] = (fade * 255).astype(np.uint8)

    out_arr = arr.astype(np.uint8)
    out_arr[:, :, 3] = alpha
    out_img = Image.fromarray(out_arr, mode="RGBA")

    # Trim empty transparent margins with small padding
    bbox = out_img.getbbox()
    if bbox:
        pad = 12
        x0 = max(0, bbox[0] - pad)
        y0 = max(0, bbox[1] - pad)
        x1 = min(w, bbox[2] + pad)
        y1 = min(h, bbox[3] + pad)
        out_img = out_img.crop((x0, y0, x1, y1))

    out_img.save(dst, "PNG")
    print(f"Saved transparent sprite: {dst} ({out_img.size})")


def main() -> None:
    bg_src = BRAIN_DIR / "bg_ghibli_yard_1794491521599.jpg"
    mango_src = BRAIN_DIR / "mango_fruit_1794491524717.jpg"
    salt_src = BRAIN_DIR / "prop_salt_jar_1794491532852.jpg"

    if bg_src.exists():
        bg_img = Image.open(bg_src).convert("RGB")
        bg_img.save(OUT_DIR / "bg_ghibli_yard.jpg", "JPEG", quality=92)
        print(f"Saved background: {OUT_DIR / 'bg_ghibli_yard.jpg'} ({bg_img.size})")

    if mango_src.exists():
        remove_white_bg_floodfill(mango_src, OUT_DIR / "mango_fruit.png", threshold=236)

    if salt_src.exists():
        remove_white_bg_floodfill(salt_src, OUT_DIR / "prop_salt_jar.png", threshold=236)


if __name__ == "__main__":
    main()
