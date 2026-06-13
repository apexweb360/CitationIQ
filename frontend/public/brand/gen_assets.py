"""
Stratena placeholder brand asset generator.
Generates all PNG assets + SVG files with gradient styling.
Run: python3 gen_assets.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

BRAND_DIR = os.path.dirname(os.path.abspath(__file__))
SOCIAL_DIR = os.path.join(BRAND_DIR, "social")
os.makedirs(SOCIAL_DIR, exist_ok=True)

# Brand colors
BG       = (0, 0, 0)
CYAN     = (0, 229, 255)
BLUE     = (61, 107, 255)
PURPLE   = (167, 66, 255)
WHITE    = (255, 255, 255)

def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

def gradient_color(t):
    """Cyan → Blue → Purple across 0..1"""
    if t < 0.5:
        return lerp_color(CYAN, BLUE, t * 2)
    return lerp_color(BLUE, PURPLE, (t - 0.5) * 2)

def draw_gradient_text(draw, text, x, y, font, width):
    """Draw text letter by letter with horizontal gradient."""
    # Measure total text width
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    cx = x
    for i, ch in enumerate(text):
        t = (cx - x) / max(text_w, 1)
        color = gradient_color(min(max(t, 0), 1))
        draw.text((cx, y), ch, font=font, fill=color)
        ch_bbox = draw.textbbox((0, 0), ch, font=font)
        cx += ch_bbox[2] - ch_bbox[0]

def get_font(size):
    # Try system fonts, fall back to default
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()

def make_image(w, h, text, tagline=None, text_scale=1.0):
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)

    # Subtle gradient bar at top
    bar_h = max(4, h // 80)
    for px in range(w):
        color = gradient_color(px / w)
        for py in range(bar_h):
            draw.point((px, py), fill=color)

    # Main text
    font_size = int(min(w, h) * 0.12 * text_scale)
    font = get_font(font_size)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    tx = (w - text_w) // 2
    ty = (h - text_h) // 2 - (h // 16 if tagline else 0)
    draw_gradient_text(draw, text, tx, ty, font, w)

    # Tagline
    if tagline:
        tl_size = int(font_size * 0.28)
        tl_font = get_font(tl_size)
        tl_bbox = draw.textbbox((0, 0), tagline, font=tl_font)
        tl_w = tl_bbox[2] - tl_bbox[0]
        draw.text(((w - tl_w) // 2, ty + text_h + int(h * 0.03)),
                  tagline, font=tl_font, fill=(160, 160, 160))
    return img

def make_icon(size):
    """'S' mark with gradient."""
    img = Image.new("RGB", (size, size), BG)
    draw = ImageDraw.Draw(img)
    font_size = int(size * 0.65)
    font = get_font(font_size)
    bbox = draw.textbbox((0, 0), "S", font=font)
    tx = (size - (bbox[2] - bbox[0])) // 2
    ty = (size - (bbox[3] - bbox[1])) // 2
    draw_gradient_text(draw, "S", tx, ty, font, size)
    return img

# ── Generate files ────────────────────────────────────────────────────────────

specs = [
    # (filename, w,    h,    text,       tagline,                  scale)
    ("stratena-full.png",        800,  200, "STRATENA", "Know. Compete. Win.", 0.9),
    ("stratena-og.png",         1200,  630, "STRATENA", "Know. Compete. Win.", 1.0),
    ("stratena-fav-32.png",       32,   32, None,       None,                  1.0),
    ("stratena-apple-touch.png", 180,  180, None,       None,                  1.0),
    # Socials
    ("social/stratena-ig.png",  1080, 1080, "STRATENA", "Know. Compete. Win.", 1.0),
    ("social/stratena-li.png",  1200,  627, "STRATENA", "Know. Compete. Win.", 1.0),
    ("social/stratena-tt.png",  1080, 1080, "STRATENA", "Know. Compete. Win.", 1.0),
    ("social/stratena-fb.png",  1200,  630, "STRATENA", "Know. Compete. Win.", 1.0),
    ("social/stratena-x.png",    400,  400, "STRATENA", None,                  1.0),
]

for fname, w, h, text, tagline, scale in specs:
    path = os.path.join(BRAND_DIR, fname)
    if text is None:
        img = make_icon(w)
    else:
        img = make_image(w, h, text, tagline, scale)
    img.save(path)
    print(f"✅ {fname} ({w}×{h})")

# Icon PNG (256×256)
make_icon(256).save(os.path.join(BRAND_DIR, "stratena-icon.png"))
print("✅ stratena-icon.png (256×256)")

print("\n✅ All PNG assets generated.")
