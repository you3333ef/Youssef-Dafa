# Dynamic Identity System

## Overview

The Dynamic Identity System allows your application to automatically apply different visual identities (branding, colors, fonts, images) based on the current entity context. Each entity can have its own unique look and feel while maintaining consistent functionality.

## Features

- ✨ **Multi-Entity Support**: 7 different entity types with unique identities
- 🎨 **Dynamic Theming**: Automatic color, font, and style application
- 🖼️ **Animated Headers**: Rotating header images (configurable interval)
- 🎯 **Smart Detection**: Automatic entity detection from URL or path
- 💾 **Persistent Context**: Entity selection persists across sessions
- 🔧 **Flexible Components**: Pre-built components for common layouts
- 📱 **Responsive Design**: Works seamlessly on all devices

## Entity Types

### 1. Chalets (`chalets`)
- **Colors**: Orange theme (#FF6F00, #FFA000)
- **Style**: Rounded buttons with darken hover effect
- **Use Case**: Chalet booking and management pages

### 2. Government Payment (`government_payment`)
- **Colors**: Blue theme (#004080, #0073E6)
- **Style**: Flat buttons with highlight hover effect
- **Use Case**: Government service payments

### 3. Local Payment (`local_payment`)
- **Colors**: Green theme (#008000, #00C000)
- **Style**: Rounded buttons with darken hover effect
- **Use Case**: Local payment services

### 4. Invoices (`invoices`)
- **Colors**: Maroon theme (#800000, #B22222)
- **Style**: Flat buttons with highlight hover effect
- **Use Case**: Invoice creation and management

### 5. Contracts (`contracts`)
- **Colors**: Navy theme (#000080, #0000CD)
- **Style**: Rounded buttons with darken hover effect
- **Use Case**: Contract management pages

### 6. Health Links (`health_links`)
- **Colors**: Teal theme (#008080, #20B2AA)
- **Style**: Flat buttons with highlight hover effect
- **Use Case**: Healthcare service links

### 7. Bank Pages (`bank_pages`)
- **Colors**: Blue theme (#0000FF, #1E90FF)
- **Style**: Rounded buttons with darken hover effect
- **Use Case**: Banking and card processing pages
- **Special**: Dynamic behavior on bank selection

## Quick Start

### 1. Basic Usage

Wrap your page content with `DynamicIdentityProvider`:

```tsx
import { DynamicIdentityProvider } from '@/components/DynamicIdentity';

function MyPage() {
  return (
    <DynamicIdentityProvider entityKey="government_payment">
      {/* Your content here */}
    </DynamicIdentityProvider>
  );
}
```

### 2. Using Pre-built Layouts

#### Simple Page Layout
```tsx
import { IdentityPageLayout } from '@/components/IdentityPageLayout';

function MyPage() {
  return (
    <IdentityPageLayout
      entityKey="government_payment"
      headerTitle="خدمات الدفع الحكومي"
      headerSubtitle="ادفع فواتيرك الحكومية بسهولة"
      showLogo={true}
      showAnimatedImages={true}
    >
      {/* Your content here */}
    </IdentityPageLayout>
  );
}
```

#### Form Layout
```tsx
import { IdentityFormLayout } from '@/components/IdentityPageLayout';

function MyFormPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <IdentityFormLayout
      entityKey="invoices"
      title="إنشاء فاتورة جديدة"
      description="املأ التفاصيل لإنشاء فاتورة"
      onSubmit={handleSubmit}
      submitLabel="إنشاء"
      showCancel={true}
      onCancel={() => navigate(-1)}
    >
      {/* Form fields here */}
    </IdentityFormLayout>
  );
}
```

#### Dashboard Layout
```tsx
import { IdentityDashboardLayout } from '@/components/IdentityPageLayout';
import { IdentityButton } from '@/components/DynamicIdentity';

function MyDashboard() {
  return (
    <IdentityDashboardLayout
      entityKey="contracts"
      title="لوحة التحكم"
      actions={
        <>
          <IdentityButton entityKey="contracts" variant="primary">
            إضافة جديد
          </IdentityButton>
          <IdentityButton entityKey="contracts" variant="outline">
            تصدير
          </IdentityButton>
        </>
      }
    >
      {/* Dashboard content here */}
    </IdentityDashboardLayout>
  );
}
```

#### Payment Flow Layout
```tsx
import { IdentityPaymentLayout } from '@/components/IdentityPageLayout';

function PaymentStep() {
  return (
    <IdentityPaymentLayout
      entityKey="local_payment"
      currentStep={2}
      totalSteps={4}
    >
      {/* Payment form here */}
    </IdentityPaymentLayout>
  );
}
```

### 3. Using Individual Components

#### Identity Button
```tsx
import { IdentityButton } from '@/components/DynamicIdentity';

<IdentityButton 
  entityKey="government_payment" 
  variant="primary"
  onClick={handleClick}
>
  دفع الآن
</IdentityButton>
```

#### Identity Card
```tsx
import { IdentityCard } from '@/components/DynamicIdentity';

<IdentityCard entityKey="government_payment">
  <h3>معلومات الدفع</h3>
  <p>تفاصيل المعاملة هنا</p>
</IdentityCard>
```

#### Identity Header
```tsx
import { IdentityHeader } from '@/components/DynamicIdentity';

<IdentityHeader
  entityKey="chalets"
  showLogo={true}
  showAnimatedImages={true}
  title="حجز الشاليهات"
  subtitle="اختر الشاليه المثالي لك"
/>
```

#### Identity Container
```tsx
import { IdentityContainer } from '@/components/DynamicIdentity';

<IdentityContainer 
  entityKey="health_links" 
  showBackground={true}
>
  {/* Content with branded background */}
</IdentityContainer>
```

### 4. Using the Hook

```tsx
import { useEntityIdentity } from '@/components/DynamicIdentity';

function MyComponent() {
  const identity = useEntityIdentity('government_payment');

  if (!identity) return null;

  return (
    <div style={{ 
      backgroundColor: identity.colors.background,
      color: identity.colors.primary 
    }}>
      {/* Custom styled content */}
    </div>
  );
}
```

## Automatic Entity Detection

The system can automatically detect the entity from:

1. **URL Query Parameter**: `?entity=government_payment`
2. **Path Detection**: Based on route patterns
3. **Stored Context**: Previously selected entity

### Path Detection Rules

- `/create/*/chalet` → `chalets`
- `/create/*/payment` → `government_payment`
- `/invoices/*` → `invoices`
- `/contracts/*` → `contracts`
- `/health/*` → `health_links`
- `/bank*` → `bank_pages`
- `/pay/*` → `local_payment`

### Manual Entity Setting

```tsx
import { setCurrentEntity } from '@/lib/dynamicIdentity';

// Set entity for current session
setCurrentEntity('government_payment');
```

## CSS Variables

The system automatically sets CSS variables that you can use in your styles:

```css
/* Colors */
--identity-primary
--identity-secondary
--identity-background

/* Typography */
--identity-font-family
```

Usage example:
```tsx
<div style={{ 
  color: 'var(--identity-primary)',
  fontFamily: 'var(--identity-font-family)'
}}>
  Content
</div>
```

## Assets Management

### Directory Structure
```
public/assets/identity/
├── official_logo_chalets.png
├── chalets_image1.png
├── chalets_image2.png
├── chalets_bg1.png
├── official_logo_gov.png
├── gov_image1.png
└── ... (other assets)
```

### Asset Requirements

#### Logos
- Format: PNG with transparent background
- Size: ~200px height
- High resolution for retina displays

#### Header Images
- Format: PNG or JPG
- Size: 1920x480px (landscape)
- Optimized for web
- Rotates every 5 seconds

#### Background Images
- Format: JPG (photos) or PNG (patterns)
- Size: 1920x1080px minimum
- Optimized for performance

### Missing Assets Handling

The system gracefully handles missing assets by hiding the image element without breaking the layout.

## Integration Examples

### Integrating with Existing Pages

#### Before
```tsx
function PaymentPage() {
  return (
    <div className="container">
      <h1>Payment Page</h1>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}
```

#### After
```tsx
import { IdentityPageLayout } from '@/components/IdentityPageLayout';
import { IdentityButton } from '@/components/DynamicIdentity';

function PaymentPage() {
  return (
    <IdentityPageLayout
      entityKey="government_payment"
      headerTitle="صفحة الدفع"
    >
      <IdentityButton variant="primary" onClick={handlePay}>
        ادفع الآن
      </IdentityButton>
    </IdentityPageLayout>
  );
}
```

### URL-Based Entity Selection

Add entity parameter to your links:
```tsx
<Link to="/create/sa/payment?entity=government_payment">
  خدمات الدفع الحكومي
</Link>

<Link to="/create/sa/chalet?entity=chalets">
  حجز الشاليهات
</Link>
```

### Form with Dynamic Styling

```tsx
function DynamicForm() {
  const identity = useEntityIdentity();

  return (
    <form>
      <input
        type="text"
        className="border rounded-lg px-4 py-2"
        style={{ 
          borderColor: identity?.colors.primary,
          fontFamily: identity ? getFontFamily(identity.fonts) : undefined
        }}
      />
      <IdentityButton variant="primary" type="submit">
        إرسال
      </IdentityButton>
    </form>
  );
}
```

## Demo Page

Visit `/identity-demo` to see the system in action with all entity types and layout variations.

## Configuration

Edit the configuration in `src/lib/dynamicIdentity.ts`:

```typescript
export const dynamicIdentityConfig: DynamicIdentityConfig = {
  entities: {
    new_entity: {
      logo: 'logo.png',
      animated_header_images: ['img1.png', 'img2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#FF0000',
        secondary: '#00FF00',
        background: '#F5F5F5'
      },
      fonts: ['Roboto', 'Arial'],
      buttons: {
        style: 'rounded',
        hover: 'darken'
      },
      background_images: ['bg.png']
    }
  },
  // ... other config
};
```

## Best Practices

1. **Consistent Entity Usage**: Use the same entity key throughout a user flow
2. **Asset Optimization**: Compress images before uploading
3. **Graceful Degradation**: System works even without assets
4. **Performance**: Use `showBackground={false}` if not needed
5. **Testing**: Test all entity types to ensure consistency
6. **Accessibility**: Ensure text contrast meets WCAG standards
7. **RTL Support**: System is designed for Arabic (RTL) content

## Troubleshooting

### Entity not applying
- Check entity key spelling
- Verify entity exists in configuration
- Check browser console for errors

### Images not loading
- Verify files exist in `/public/assets/identity/`
- Check file names match configuration
- Check browser network tab for 404 errors

### Styles not applying
- Check CSS variable availability
- Verify component hierarchy
- Check for style conflicts

### Performance issues
- Optimize image sizes
- Reduce animation frequency
- Use `showAnimatedImages={false}` if not needed

## API Reference

### Functions

- `getEntityIdentity(entityKey)` - Get entity configuration
- `setCurrentEntity(entityKey)` - Set active entity
- `getCurrentEntity()` - Get current entity key
- `resolveEntityIdentity()` - Auto-detect and get entity
- `getFontFamily(fonts)` - Convert font array to CSS string
- `getButtonStyles(buttons)` - Get button CSS classes

### Components

- `DynamicIdentityProvider` - Context provider
- `IdentityPageLayout` - Full page layout
- `IdentityFormLayout` - Form page layout
- `IdentityDashboardLayout` - Dashboard layout
- `IdentityPaymentLayout` - Payment flow layout
- `IdentityButton` - Branded button
- `IdentityCard` - Branded card
- `IdentityHeader` - Branded header
- `IdentityContainer` - Branded container
- `IdentityTopBar` - Top navigation bar

### Hooks

- `useEntityIdentity(entityKey?)` - Get entity identity in component

## Support

For issues or questions, please refer to the main README or open an issue on GitHub.

---

Built with ❤️ for flexible, multi-entity applications
