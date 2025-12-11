# Dynamic Identity Assets Directory

This directory contains all official assets for the dynamic identity system.

## Required Assets by Entity

### Chalets (`chalets`)
- `official_logo_chalets.png` - Main logo
- `chalets_image1.png` - Animated header image 1
- `chalets_image2.png` - Animated header image 2
- `chalets_image3.png` - Animated header image 3
- `chalets_bg1.png` - Background image 1
- `chalets_bg2.png` - Background image 2

### Government Payment (`government_payment`)
- `official_logo_gov.png` - Main logo
- `gov_image1.png` - Animated header image 1
- `gov_image2.png` - Animated header image 2
- `gov_bg.png` - Background image

### Local Payment (`local_payment`)
- `official_logo_local.png` - Main logo
- `local_image1.png` - Animated header image 1
- `local_image2.png` - Animated header image 2
- `local_bg.png` - Background image

### Invoices (`invoices`)
- `official_logo_invoice.png` - Main logo
- `invoice_image1.png` - Animated header image 1
- `invoice_image2.png` - Animated header image 2
- `invoice_bg.png` - Background image

### Contracts (`contracts`)
- `official_logo_contract.png` - Main logo
- `contract_image1.png` - Animated header image 1
- `contract_image2.png` - Animated header image 2
- `contract_bg.png` - Background image

### Health Links (`health_links`)
- `official_logo_health.png` - Main logo
- `health_image1.png` - Animated header image 1
- `health_image2.png` - Animated header image 2
- `health_bg.png` - Background image

### Bank Pages (`bank_pages`)
- `official_logo_bank.png` - Main logo
- `bank_image1.png` - Animated header image 1
- `bank_image2.png` - Animated header image 2
- `bank_bg.png` - Background image

## Image Guidelines

### Logos
- Format: PNG with transparent background
- Recommended size: 200px height
- Should be high-resolution for retina displays

### Animated Header Images
- Format: PNG or JPG
- Recommended size: 1920x480px (landscape)
- Optimized for web (compressed)
- Images will rotate every 5 seconds

### Background Images
- Format: JPG (for photos) or PNG (for patterns)
- Recommended size: 1920x1080px minimum
- Optimized for web to reduce load time
- Should not interfere with text readability

## Usage

The dynamic identity system automatically loads assets from this directory based on the current entity context. Assets are referenced by the filenames specified in the configuration.

If an asset is missing, the component will gracefully handle the error and hide the broken image element.

## Notes

- **enforce_official_assets_only**: When enabled, only assets from this directory are used
- **Missing assets**: Components will hide missing images without breaking the layout
- **Performance**: Optimize all images before uploading to ensure fast page loads
