#!/usr/bin/env python3
"""
Generate professional hero and OG images for all shipping companies
Based on official brand colors and identity
"""

from PIL import Image, ImageDraw, ImageFont
import os

companies = {
    'zajil': {
        'nameAr': 'زاجل إكسبرس',
        'nameEn': 'Zajil Express',
        'primary': '#1C4587',
        'secondary': '#FF9900',
        'description': 'شركة سعودية رائدة في خدمات البريد السريع'
    },
    'saudipost': {
        'nameAr': 'البريد السعودي',
        'nameEn': 'Saudi Post',
        'primary': '#0056A8',
        'secondary': '#00A99D',
        'description': 'المشغل الوطني للبريد في المملكة'
    },
    'genacom': {
        'nameAr': 'جيناكم',
        'nameEn': 'Genacom',
        'primary': '#E82424',
        'secondary': '#F7C24A',
        'description': 'خدمات التوصيل السريع في عُمان'
    },
    'jinaken': {
        'nameAr': 'جيناكم',
        'nameEn': 'Jinaken',
        'primary': '#E82424',
        'secondary': '#F7C24A',
        'description': 'خدمات التوصيل والشحن'
    },
    'albaraka': {
        'nameAr': 'مجموعة البركة',
        'nameEn': 'Al Baraka Group',
        'primary': '#D4AF37',
        'secondary': '#1B4D3E',
        'description': 'حلول مالية ولوجستية متكاملة'
    },
    'alfuttaim': {
        'nameAr': 'مجموعة الفطيم',
        'nameEn': 'Al Futtaim Group',
        'primary': '#003B71',
        'secondary': '#E30613',
        'description': 'حلول لوجستية متكاملة في المنطقة'
    },
    'alshaya': {
        'nameAr': 'مجموعة الشايع',
        'nameEn': 'Alshaya Group',
        'primary': '#D71920',
        'secondary': '#000000',
        'description': 'حلول التوزيع واللوجستيات للتجزئة'
    },
    'bahri': {
        'nameAr': 'البحري',
        'nameEn': 'Bahri',
        'primary': '#00447C',
        'secondary': '#0099CC',
        'description': 'الشركة الوطنية للنقل البحري'
    },
    'national': {
        'nameAr': 'الشركة الوطنية للشحن',
        'nameEn': 'National Shipping',
        'primary': '#00447C',
        'secondary': '#0099CC',
        'description': 'خدمات النقل البحري والشحن'
    },
    'shipco': {
        'nameAr': 'شيبكو',
        'nameEn': 'ShipCo Transport',
        'primary': '#0A5FB4',
        'secondary': '#00A3E0',
        'description': 'حلول الشحن الدولي والمحلي'
    },
    'hellmann': {
        'nameAr': 'هايلمان',
        'nameEn': 'Hellmann Worldwide',
        'primary': '#E32119',
        'secondary': '#004C99',
        'description': 'شبكة دولية لخدمات اللوجستيات'
    },
    'dsv': {
        'nameAr': 'دي إس في',
        'nameEn': 'DSV',
        'primary': '#003B71',
        'secondary': '#0099CC',
        'description': 'حلول النقل واللوجستيات العالمية'
    },
    'agility': {
        'nameAr': 'أجيليتي',
        'nameEn': 'Agility',
        'primary': '#003A63',
        'secondary': '#00B2A9',
        'description': 'حلول سلسلة الإمداد المتطورة'
    }
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_image(width, height, color1, color2, direction='horizontal'):
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    
    mask = Image.new('L', (width, height))
    mask_data = []
    
    for y in range(height):
        for x in range(width):
            if direction == 'horizontal':
                mask_data.append(int(255 * (x / width)))
            else:
                mask_data.append(int(255 * (y / height)))
    
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def add_rounded_overlay(draw, x, y, width, height, color, alpha=128):
    overlay = Image.new('RGBA', (width, height), color + (alpha,))
    return overlay

def create_hero_image(company_key, company_data, output_path, size=(1200, 630)):
    img = create_gradient_image(
        size[0], size[1],
        hex_to_rgb(company_data['primary']),
        hex_to_rgb(company_data['secondary']),
        direction='horizontal'
    )
    
    img_rgba = img.convert('RGBA')
    
    overlay = Image.new('RGBA', size, (0, 0, 0, 80))
    img_rgba = Image.alpha_composite(img_rgba, overlay)
    
    draw = ImageDraw.Draw(img_rgba)
    
    try:
        font_ar = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 80)
        font_en = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 60)
        font_desc = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 30)
    except:
        font_ar = ImageFont.load_default()
        font_en = ImageFont.load_default()
        font_desc = ImageFont.load_default()
    
    ar_bbox = draw.textbbox((0, 0), company_data['nameAr'], font=font_ar)
    ar_width = ar_bbox[2] - ar_bbox[0]
    ar_x = (size[0] - ar_width) // 2
    ar_y = size[1] // 3
    
    draw.text((ar_x, ar_y), company_data['nameAr'], fill='white', font=font_ar)
    
    en_bbox = draw.textbbox((0, 0), company_data['nameEn'], font=font_en)
    en_width = en_bbox[2] - en_bbox[0]
    en_x = (size[0] - en_width) // 2
    en_y = ar_y + 100
    
    draw.text((en_x, en_y), company_data['nameEn'], fill='white', font=font_en)
    
    desc_bbox = draw.textbbox((0, 0), company_data['description'], font=font_desc)
    desc_width = desc_bbox[2] - desc_bbox[0]
    desc_x = (size[0] - desc_width) // 2
    desc_y = en_y + 100
    
    draw.text((desc_x, desc_y), company_data['description'], fill='white', font=font_desc)
    
    img_rgb = img_rgba.convert('RGB')
    img_rgb.save(output_path, 'JPEG', quality=95, optimize=True)
    print(f"Created: {output_path}")

def main():
    assets_dir = '/project/workspace/you3333ef/Youssef-Dafa/src/assets'
    public_dir = '/project/workspace/you3333ef/Youssef-Dafa/public'
    
    os.makedirs(assets_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    
    for company_key, company_data in companies.items():
        hero_path = os.path.join(assets_dir, f'hero-{company_key}.jpg')
        create_hero_image(company_key, company_data, hero_path)
        
        og_path = os.path.join(public_dir, f'og-{company_key}.jpg')
        create_hero_image(company_key, company_data, og_path, size=(1200, 630))
    
    print(f"\nSuccessfully created {len(companies) * 2} images!")

if __name__ == '__main__':
    main()
