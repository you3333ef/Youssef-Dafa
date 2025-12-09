#!/usr/bin/env python3
"""
Download company logos from various sources
"""

import os
import subprocess
from pathlib import Path

logos_dir = Path('/project/workspace/you3333ef/Youssef-Dafa/public/logos')
logos_dir.mkdir(parents=True, exist_ok=True)

logos_to_download = {
    'aramex': 'https://logo.clearbit.com/aramex.com',
    'naqel': 'https://www.naqelexpress.com/Content/Images/logo.png',
    'zajil': 'https://zajil-express.com/assets/images/logo.svg',
    'saudipost': 'https://splonline.com.sa/media/3167/logo-ar.svg',
    'empost': 'https://7xgroup.ae/wp-content/uploads/2024/02/7X_Primary-Logo-1.svg',
    'qpost': 'https://qatarpost.qa/Content/images/logo.svg',
    'kwpost': 'https://www.moci.gov.kw/Style%20Library/NewDesign/imgs/logo-en.svg',
    'omanpost': 'https://www.omanpost.om/Style%20Library/OmanPostImages/logo-en.png',
    'bahpost': 'https://bahrainpost.gov.bh/pict/logo.png',
    'alfuttaim': 'https://www.alfuttaim.com/assets/images/logo.svg',
    'alshaya': 'https://www.alshaya.com/assets/logo.svg',
    'shipco': 'https://www.shipco.com/wp-content/themes/shipco/images/logo.svg',
    'agility': 'https://agilityglobal.com/wp-content/uploads/2023/05/Agility_Logo_Blue.svg',
}

for company, url in logos_to_download.items():
    ext = '.svg' if url.endswith('.svg') else '.png'
    output_file = logos_dir / f'{company}-logo{ext}'
    
    print(f'Downloading {company} logo from {url}...')
    
    try:
        result = subprocess.run(
            ['curl', '-L', '-o', str(output_file), url, '--max-time', '15'],
            capture_output=True,
            text=True,
            timeout=20
        )
        
        if result.returncode == 0 and output_file.exists() and output_file.stat().st_size > 100:
            print(f'  ✓ Downloaded {company} logo successfully ({output_file.stat().st_size} bytes)')
        else:
            print(f'  ✗ Failed to download {company} logo')
            if output_file.exists():
                output_file.unlink()
    except Exception as e:
        print(f'  ✗ Error downloading {company}: {e}')

print(f'\n✓ Logo download process completed!')
print(f'Total logos in folder: {len(list(logos_dir.glob("*")))}')
