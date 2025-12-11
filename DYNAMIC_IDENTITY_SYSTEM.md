# Dynamic Identity System Documentation

## Overview
The Dynamic Identity System provides a flexible, entity-based theming mechanism that automatically applies brand colors, fonts, button styles, logos, and animated headers based on the current page context.

## Architecture

### Core Components

#### 1. **dynamicIdentity.ts** (`/src/lib/dynamicIdentity.ts`)
Central configuration file defining all entity identities.

**Supported Entities:**
- `chalets` - Chalet booking services
- `government_payment` - Government payment portals
- `local_payment` - Local payment services
- `invoices` - Invoice management
- `contracts` - Contract creation and management
- `health_links` - Health services and appointments
- `bank_pages` - Banking interfaces

**Entity Configuration Structure:**
```typescript
{
  logo: string;                    // Path to entity logo
  animated_header_images: string[]; // Rotating header images
  header_position: string;          // Position of header
  colors: {
    primary: string;                // Main brand color
    secondary: string;              // Secondary brand color
    background: string;             // Background color
  };
  fonts: {
    primary: string;                // Primary font family
    secondary: string;              // Secondary font family
  };
  buttons: {
    style: 'rounded' | 'flat';      // Button border style
    hover: 'darken' | 'highlight';  // Hover effect
  };
  background_images: string[];      // Background images
}
```

#### 2. **DynamicIdentity.tsx** (`/src/components/DynamicIdentity.tsx`)
React components for applying entity-specific theming.

**Available Components:**

##### `<DynamicIdentity>`
Main wrapper component that applies CSS variables for the selected entity.
```tsx
<DynamicIdentity entityType="chalets">
  {children}
</DynamicIdentity>
```

##### `<EntityContainer>`
Container with entity-specific background and styling.
```tsx
<EntityContainer 
  entityType="chalets" 
  useBackgroundImage={false}
>
  {children}
</EntityContainer>
```

##### `<EntityHeader>`
Animated header with logo and rotating background images.
```tsx
<EntityHeader
  entityType="chalets"
  title="حجز شاليه"
  subtitle="أنشئ رابط حجز مخصص"
  showLogo={true}
  animateImages={true}
  className="mb-6"
/>
```

##### `<EntityButton>`
Themed button with entity-specific colors and hover effects.
```tsx
<EntityButton 
  entityType="chalets" 
  variant="primary"
  onClick={handleClick}
>
  إنشاء رابط
</EntityButton>
```

#### 3. **generateIdentityAssets.ts** (`/src/utils/generateIdentityAssets.ts`)
SVG placeholder generation for logos and images.

### CSS Variables

The system exposes the following CSS variables for each entity:
- `--entity-primary` - Primary color
- `--entity-secondary` - Secondary color
- `--entity-background` - Background color
- `--entity-font-primary` - Primary font
- `--entity-font-secondary` - Secondary font
- `--entity-button-radius` - Button border radius

## Implementation

### Page Integration

#### Example: Chalet Booking Page
```tsx
import { DynamicIdentity, EntityHeader, EntityContainer, EntityButton } from '@/components/DynamicIdentity';

const CreateChaletLink = () => {
  return (
    <DynamicIdentity entityType="chalets">
      <EntityContainer entityType="chalets" useBackgroundImage={false}>
        <div className="min-h-screen py-6" dir="rtl">
          <EntityHeader
            entityType="chalets"
            title="حجز شاليه"
            subtitle="أنشئ رابط حجز مخصص"
            showLogo={true}
            animateImages={true}
            className="mb-6"
          />
          
          {/* Your page content */}
          
          <EntityButton entityType="chalets" variant="primary">
            إنشاء رابط الحجز
          </EntityButton>
        </div>
      </EntityContainer>
    </DynamicIdentity>
  );
};
```

### Updated Pages

The following pages have been updated with the dynamic identity system:

1. **CreateChaletLink** (`/create/:country/chalet`)
   - Entity: `chalets`
   - Features: Animated header, themed buttons, custom colors
   
2. **Contracts** (`/contracts/:country`)
   - Entity: `contracts`
   - Features: Professional contract theming, legal document styling
   
3. **HealthServices** (`/health/:country`)
   - Entity: `health_links`
   - Features: Healthcare-themed colors and icons

## Demo Page

Visit `/identity-demo` to see all entity themes in action with interactive examples.

**Features:**
- Live theme switching between all entities
- Button style demonstrations
- Color palette previews
- Font family samples
- Interactive form examples
- Card component showcases

## Entity Color Schemes

| Entity | Primary | Secondary | Background |
|--------|---------|-----------|------------|
| **Chalets** | #FF6F00 | #FFA000 | #FFF3E0 |
| **Government Payment** | #004080 | #0073E6 | #E6F0FF |
| **Local Payment** | #008000 | #00C000 | #E6FFE6 |
| **Invoices** | #800000 | #B22222 | #FFE6E6 |
| **Contracts** | #000080 | #0000CD | #E6E6FF |
| **Health Links** | #008080 | #20B2AA | #E0FFFF |
| **Bank Pages** | #0000FF | #1E90FF | #E6F0FF |

## Font Families

- **Chalets**: Roboto, Arial
- **Government Payment**: Arial, Tahoma
- **Local Payment**: Verdana, Arial
- **Invoices**: Times New Roman, Georgia
- **Contracts**: Georgia, Times New Roman
- **Health Links**: Arial, Verdana
- **Bank Pages**: Tahoma, Verdana

## Button Styles

### Rounded (Border Radius: 8px)
- Chalets
- Local Payment
- Contracts
- Bank Pages

### Flat (Border Radius: 2px)
- Government Payment
- Invoices
- Health Links

## Hover Effects

### Darken
Reduces brightness by 20% on hover
- Chalets
- Local Payment
- Contracts
- Bank Pages

### Highlight
Increases brightness by 20% on hover
- Government Payment
- Invoices
- Health Links

## Adding New Entities

1. **Define Entity Type**
```typescript
// src/lib/dynamicIdentity.ts
export type EntityType = 
  | 'existing_types'
  | 'new_entity_type';
```

2. **Add Configuration**
```typescript
export const dynamicIdentityConfig: Record<EntityType, EntityIdentity> = {
  // ...existing entities
  new_entity_type: {
    logo: '/path/to/logo.png',
    animated_header_images: [
      '/path/to/image1.png',
      '/path/to/image2.png'
    ],
    colors: {
      primary: '#COLOR1',
      secondary: '#COLOR2',
      background: '#COLOR3'
    },
    fonts: {
      primary: 'Font1, sans-serif',
      secondary: 'Font2, sans-serif'
    },
    buttons: {
      style: 'rounded',
      hover: 'darken'
    },
    background_images: ['/path/to/bg.png']
  }
};
```

3. **Create Placeholder Assets**
```typescript
// src/utils/generateIdentityAssets.ts
export const entityPlaceholders = {
  // ...existing placeholders
  new_entity_type: {
    logo: generatePlaceholderSVG(200, 80, '#COLOR1', '#FFFFFF', 'عنوان'),
    images: [
      generatePlaceholderSVG(1200, 400, '#COLOR1', '#FFFFFF', 'صورة 1'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#COLOR3', '#COLOR1', 'خلفية'),
    ],
  },
};
```

4. **Update Page Mapping** (Optional)
```typescript
// src/lib/dynamicIdentity.ts
export const getEntityByPage = (pathname: string): EntityType | null => {
  // ...existing mappings
  if (pathname.includes('/new-entity')) return 'new_entity_type';
  return null;
};
```

## Asset Requirements

### Logos
- Format: PNG or SVG
- Recommended size: 200x80px
- Background: Transparent
- Color: Should work with white filter applied

### Header Images
- Format: PNG or JPG
- Recommended size: 1200x400px
- Aspect ratio: 3:1
- Multiple images for rotation (2-3 recommended)

### Background Images
- Format: PNG or JPG
- Recommended size: 1920x1080px
- Should work with opacity overlay

## Best Practices

1. **Consistency**: Use the entity theme consistently across all related pages
2. **Accessibility**: Ensure sufficient color contrast (WCAG AA minimum)
3. **Performance**: Optimize images and use lazy loading for backgrounds
4. **Fallbacks**: Always provide SVG placeholders as fallbacks
5. **Testing**: Test themes across different devices and screen sizes
6. **RTL Support**: Ensure all components work with RTL direction

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Theme persistence in localStorage
- [ ] Dark mode variants
- [ ] Animation customization
- [ ] Dynamic font loading
- [ ] Theme preview in admin panel
- [ ] Real-time theme switching
- [ ] Custom theme builder
- [ ] Export/Import theme configurations

## Troubleshooting

### CSS Variables Not Applied
- Ensure `<DynamicIdentity>` wrapper is at the root of your page
- Check browser DevTools for CSS variable values
- Verify entity type is correctly spelled

### Images Not Loading
- Check image paths are absolute
- Verify assets exist in `/public` directory
- Use SVG placeholders as fallback

### Buttons Not Themed
- Ensure `EntityButton` is used instead of standard `Button`
- Verify `entityType` prop is passed correctly
- Check CSS variable application

## Support

For issues or questions about the Dynamic Identity System:
- Review this documentation
- Check the demo page at `/identity-demo`
- Examine example implementations in updated pages
- Contact development team

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Maintainer**: Youssef Dafa Development Team
