#!/usr/bin/env python3
"""
Generate OG Images for all Banks - 1200x630 pixels
إنشاء صور المشاركة لجميع البنوك - 1200×630 بكسل
"""

from PIL import Image, ImageDraw, ImageFont
import os

# OG Image standard size
OG_WIDTH = 1200
OG_HEIGHT = 630

# Bank definitions with official colors
BANKS = {
    # Saudi Arabia
    "alrajhi_bank": {
        "name_ar": "مصرف الراجحي",
        "name_en": "Al Rajhi Bank",
        "color_primary": "#006C35",
        "color_secondary": "#005028",
        "color_accent": "#FFD700",
        "country": "المملكة العربية السعودية"
    },
    "alahli_bank": {
        "name_ar": "البنك الأهلي السعودي",
        "name_en": "Saudi National Bank",
        "color_primary": "#00843D",
        "color_secondary": "#006631",
        "color_accent": "#FDB913",
        "country": "المملكة العربية السعودية"
    },
    "riyad_bank": {
        "name_ar": "بنك الرياض",
        "name_en": "Riyad Bank",
        "color_primary": "#0066B2",
        "color_secondary": "#004A85",
        "color_accent": "#00A3E0",
        "country": "المملكة العربية السعودية"
    },
    
    # UAE
    "emirates_nbd": {
        "name_ar": "بنك الإمارات دبي الوطني",
        "name_en": "Emirates NBD",
        "color_primary": "#D50032",
        "color_secondary": "#A8002A",
        "color_accent": "#FF1744",
        "country": "الإمارات العربية المتحدة"
    },
    "fab": {
        "name_ar": "بنك أبوظبي الأول",
        "name_en": "First Abu Dhabi Bank",
        "color_primary": "#000000",
        "color_secondary": "#1A1A1A",
        "color_accent": "#FFD700",
        "country": "الإمارات العربية المتحدة"
    },
    
    # Qatar
    "qnb": {
        "name_ar": "بنك قطر الوطني",
        "name_en": "Qatar National Bank",
        "color_primary": "#6E1D3E",
        "color_secondary": "#4A1428",
        "color_accent": "#8B2350",
        "country": "دولة قطر"
    },
    
    # Kuwait
    "nbk": {
        "name_ar": "بنك الكويت الوطني",
        "name_en": "National Bank of Kuwait",
        "color_primary": "#005EB8",
        "color_secondary": "#003D7A",
        "color_accent": "#0078D4",
        "country": "دولة الكويت"
    },
    
    # Oman
    "bank_muscat": {
        "name_ar": "بنك مسقط",
        "name_en": "Bank Muscat",
        "color_primary": "#E31E24",
        "color_secondary": "#B01820",
        "color_accent": "#FF4444",
        "country": "سلطنة عُمان"
    },
    
    # Bahrain
    "nbb": {
        "name_ar": "بنك البحرين الوطني",
        "name_en": "National Bank of Bahrain",
        "color_primary": "#E31E24",
        "color_secondary": "#B01820",
        "color_accent": "#FF4444",
        "country": "مملكة البحرين"
    },
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_background(width, height, color1, color2):
    """Create a gradient background"""
    base = Image.new('RGB', (width, height), color1)
    draw = ImageDraw.Draw(base, 'RGBA')
    
    # Create gradient
    r1, g1, b1 = hex_to_rgb(color1)
    r2, g2, b2 = hex_to_rgb(color2)
    
    for i in range(height):
        ratio = i / height
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        draw.rectangle([(0, i), (width, i + 1)], fill=(r, g, b))
    
    return base

def generate_bank_og_image(bank_id, bank_data, output_dir):
    """Generate OG image for a bank"""
    # Create gradient background
    img = create_gradient_background(
        OG_WIDTH, 
        OG_HEIGHT, 
        bank_data['color_primary'],
        bank_data['color_secondary']
    )
    
    draw = ImageDraw.Draw(img)
    
    # Try to load fonts (fallback to default if not available)
    try:
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 35)
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Add white overlay for better text visibility
    overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (255, 255, 255, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rectangle([(0, 0), (OG_WIDTH, OG_HEIGHT)], fill=(0, 0, 0, 80))
    img.paste(overlay, (0, 0), overlay)
    
    # Redraw after overlay
    draw = ImageDraw.Draw(img)
    
    # Draw bank name (English)
    text_en = bank_data['name_en']
    bbox_en = draw.textbbox((0, 0), text_en, font=font_large)
    text_width_en = bbox_en[2] - bbox_en[0]
    x_en = (OG_WIDTH - text_width_en) // 2
    y_en = 180
    draw.text((x_en, y_en), text_en, fill='white', font=font_large)
    
    # Draw bank name (Arabic)
    text_ar = bank_data['name_ar']
    bbox_ar = draw.textbbox((0, 0), text_ar, font=font_medium)
    text_width_ar = bbox_ar[2] - bbox_ar[0]
    x_ar = (OG_WIDTH - text_width_ar) // 2
    y_ar = 280
    draw.text((x_ar, y_ar), text_ar, fill='white', font=font_medium)
    
    # Draw country
    country = bank_data['country']
    bbox_country = draw.textbbox((0, 0), country, font=font_small)
    text_width_country = bbox_country[2] - bbox_country[0]
    x_country = (OG_WIDTH - text_width_country) // 2
    y_country = 380
    draw.text((x_country, y_country), country, fill='white', font=font_small)
    
    # Draw tagline
    tagline = "الخدمات المصرفية الإلكترونية"
    bbox_tagline = draw.textbbox((0, 0), tagline, font=font_small)
    text_width_tagline = bbox_tagline[2] - bbox_tagline[0]
    x_tagline = (OG_WIDTH - text_width_tagline) // 2
    y_tagline = 460
    draw.text((x_tagline, y_tagline), tagline, fill='white', font=font_small)
    
    # Save image
    output_path = os.path.join(output_dir, f"og-bank-{bank_id}.jpg")
    img.save(output_path, 'JPEG', quality=95, optimize=True)
    print(f"✓ Created: {output_path}")

def main():
    # Create output directory
    output_dir = "/project/workspace/you3333ef/Youssef-Dafa/public"
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Generating OG images for {len(BANKS)} banks...")
    print("=" * 60)
    
    for bank_id, bank_data in BANKS.items():
        generate_bank_og_image(bank_id, bank_data, output_dir)
    
    print("=" * 60)
    print(f"✓ Successfully generated {len(BANKS)} OG images!")
    print(f"✓ Location: {output_dir}")

if __name__ == "__main__":
    main()
