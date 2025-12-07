#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

OG_WIDTH = 1200
OG_HEIGHT = 630

SERVICES = {
    'chalet': {
        'title_ar': 'حجز الشاليهات',
        'title_en': 'Chalet Booking',
        'desc': 'احجز شاليه أحلامك في دول الخليج',
        'primary': (5, 150, 105),
        'secondary': (16, 185, 129),
        'emoji': '🏠',
        'bg': 'bg-chalet-sa.jpg'
    },
    'health': {
        'title_ar': 'الخدمات الصحية',
        'title_en': 'Health Services',
        'desc': 'خدمات طبية وصحية معتمدة',
        'primary': (225, 29, 72),
        'secondary': (244, 63, 94),
        'emoji': '❤️',
        'bg': 'bg-health.jpg'
    },
    'government': {
        'title_ar': 'الخدمات الحكومية',
        'title_en': 'Government Services',
        'desc': 'خدمات حكومية ورسوم رسمية',
        'primary': (59, 130, 246),
        'secondary': (96, 165, 250),
        'emoji': '🏛️',
        'bg': 'bg-government.jpg'
    },
    'logistics': {
        'title_ar': 'الخدمات اللوجستية',
        'title_en': 'Logistics Services',
        'desc': 'حلول لوجستية متكاملة',
        'primary': (124, 58, 237),
        'secondary': (139, 92, 246),
        'emoji': '🚚',
        'bg': 'bg-logistics.jpg'
    },
    'payment': {
        'title_ar': 'خدمة السداد',
        'title_en': 'Payment Services',
        'desc': 'بوابة دفع آمنة وموثوقة',
        'primary': (8, 145, 178),
        'secondary': (6, 182, 212),
        'emoji': '💳',
        'bg': None
    }
}

def create_gradient(w, h, c1, c2):
    img = Image.new('RGB', (w, h))
    draw = ImageDraw.Draw(img)
    for i in range(h):
        r = int(c1[0] + (c2[0] - c1[0]) * i / h)
        g = int(c1[1] + (c2[1] - c1[1]) * i / h)
        b = int(c1[2] + (c2[2] - c1[2]) * i / h)
        draw.line([(0, i), (w, i)], fill=(r, g, b))
    return img

def create_og(key, cfg, out):
    # Background
    if cfg['bg'] and os.path.exists(cfg['bg']):
        bg = Image.open(cfg['bg']).convert('RGB')
        bg = bg.resize((OG_WIDTH, OG_HEIGHT), Image.Resampling.LANCZOS)
    else:
        bg = create_gradient(OG_WIDTH, OG_HEIGHT, cfg['primary'], cfg['secondary'])
    
    # Overlay
    overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)
    for i in range(OG_HEIGHT):
        alpha = int(180 * (i / OG_HEIGHT))
        draw_ov.rectangle([(0, i), (OG_WIDTH, i+1)], 
                         fill=(*cfg['primary'], alpha))
    
    bg = bg.convert('RGBA')
    bg = Image.alpha_composite(bg, overlay).convert('RGB')
    
    draw = ImageDraw.Draw(bg)
    
    # Fonts
    try:
        f_emoji = ImageFont.truetype("/tmp/Cairo-Bold.ttf", 110)
        f_title = ImageFont.truetype("/tmp/Cairo-Bold.ttf", 85)
        f_sub = ImageFont.truetype("/tmp/Cairo-Bold.ttf", 42)
        f_desc = ImageFont.truetype("/tmp/Cairo-Bold.ttf", 36)
    except:
        try:
            f_emoji = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 90)
            f_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 75)
            f_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 38)
            f_desc = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
        except:
            f_emoji = f_title = f_sub = f_desc = ImageFont.load_default()
    
    y = OG_HEIGHT - 320
    
    # Draw text with proper colors (RGB tuples only)
    draw.text((70, y), cfg['emoji'], fill=(255, 255, 255), font=f_emoji)
    draw.text((70, y + 130), cfg['title_ar'], fill=(255, 255, 255), font=f_title)
    draw.text((70, y + 225), cfg['title_en'], fill=(255, 255, 255), font=f_sub)
    draw.text((70, y + 280), cfg['desc'], fill=(240, 240, 240), font=f_desc)
    
    # Watermark
    draw.text((OG_WIDTH - 450, 50), "نظام الدفع الموحد", fill=(255, 255, 255), font=f_desc)
    
    bg.save(out, 'JPEG', quality=95, optimize=True)
    print(f"✓ {out}")

def main():
    os.makedirs('public', exist_ok=True)
    print("🎨 Generating OG images...\n")
    
    for key, cfg in SERVICES.items():
        out = f'public/og-{key}.jpg'
        try:
            create_og(key, cfg, out)
        except Exception as e:
            print(f"✗ {key}: {e}")
    
    print(f"\n✅ Done!")

if __name__ == '__main__':
    main()
