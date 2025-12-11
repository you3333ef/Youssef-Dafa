# Dynamic Identity System - Quick Reference

## Entity Keys

```typescript
'chalets'            // Chalet booking - Orange theme
'government_payment' // Government services - Blue theme
'local_payment'      // Local payments - Green theme
'invoices'           // Invoice management - Maroon theme
'contracts'          // Contract management - Navy theme
'health_links'       // Health services - Teal theme
'bank_pages'         // Banking/cards - Blue theme
```

## Import Statements

```typescript
// Layouts
import { 
  IdentityPageLayout,
  IdentityFormLayout,
  IdentityDashboardLayout,
  IdentityPaymentLayout 
} from '@/components/IdentityPageLayout';

// Components
import { 
  DynamicIdentityProvider,
  IdentityButton,
  IdentityCard,
  IdentityHeader,
  IdentityContainer,
  IdentityTopBar,
  useEntityIdentity 
} from '@/components/DynamicIdentity';

// Utilities
import { 
  getEntityIdentity,
  setCurrentEntity,
  getCurrentEntity,
  resolveEntityIdentity,
  getFontFamily,
  getButtonStyles 
} from '@/lib/dynamicIdentity';
```

## Common Patterns

### 1. Basic Page

```tsx
<IdentityPageLayout entityKey="government_payment">
  <h1>Your Content</h1>
</IdentityPageLayout>
```

### 2. Form Page

```tsx
<IdentityFormLayout
  entityKey="invoices"
  title="Create Invoice"
  onSubmit={handleSubmit}
>
  {/* form fields */}
</IdentityFormLayout>
```

### 3. Dashboard

```tsx
<IdentityDashboardLayout
  entityKey="contracts"
  title="Dashboard"
  actions={<IdentityButton>Add New</IdentityButton>}
>
  {/* dashboard content */}
</IdentityDashboardLayout>
```

### 4. Payment Flow

```tsx
<IdentityPaymentLayout
  entityKey="local_payment"
  currentStep={2}
  totalSteps={4}
>
  {/* payment form */}
</IdentityPaymentLayout>
```

### 5. Button

```tsx
<IdentityButton 
  entityKey="government_payment"
  variant="primary"  // or "secondary", "outline"
  onClick={handleClick}
>
  Click Me
</IdentityButton>
```

### 6. Card

```tsx
<IdentityCard entityKey="health_links">
  <h3>Card Title</h3>
  <p>Card content</p>
</IdentityCard>
```

### 7. Custom Component with Hook

```tsx
function MyComponent() {
  const identity = useEntityIdentity('chalets');
  
  return (
    <div style={{ color: identity?.colors.primary }}>
      Custom styled content
    </div>
  );
}
```

### 8. Form Input with Entity Colors

```tsx
const identity = useEntityIdentity();

<input
  className="border rounded-lg px-4 py-2"
  style={{ borderColor: identity?.colors.primary }}
/>
```

## Utility Functions

### Set Entity

```typescript
import { setCurrentEntity } from '@/lib/dynamicIdentity';

setCurrentEntity('government_payment');
```

### Get Entity

```typescript
import { getEntityIdentity } from '@/lib/dynamicIdentity';

const entity = getEntityIdentity('government_payment');
console.log(entity.colors.primary); // #004080
```

### Auto-detect Entity

```typescript
import { resolveEntityIdentity } from '@/lib/dynamicIdentity';

const entity = resolveEntityIdentity(); // Detects from URL or path
```

### Format Fonts

```typescript
import { getFontFamily } from '@/lib/dynamicIdentity';

const fontString = getFontFamily(['Roboto', 'Arial']);
// Returns: "Roboto, Arial, sans-serif"
```

## CSS Variables

```css
/* Available after DynamicIdentityProvider is applied */
--identity-primary       /* Primary color */
--identity-secondary     /* Secondary color */
--identity-background    /* Background color */
--identity-font-family   /* Font family */
```

Usage:
```tsx
<div style={{ color: 'var(--identity-primary)' }}>
  Branded text
</div>
```

## Navigation with Entity

### URL Parameter

```tsx
<Link to="/page?entity=government_payment">Go</Link>
```

### Programmatic

```tsx
import { setCurrentEntity } from '@/lib/dynamicIdentity';

const handleClick = () => {
  setCurrentEntity('invoices');
  navigate('/invoices/create');
};
```

## Entity Detection

Automatic detection from path:
- `/create/*/chalet` → `chalets`
- `/create/*/payment` → `government_payment`
- `/invoices/*` → `invoices`
- `/contracts/*` → `contracts`
- `/health/*` → `health_links`
- `/bank*` → `bank_pages`
- `/pay/*` → `local_payment`

## Layout Props

### IdentityPageLayout

```typescript
{
  entityKey?: string;           // Entity identifier
  showTopBar?: boolean;         // Show top navigation (default: true)
  showHeader?: boolean;         // Show header section (default: true)
  showBackground?: boolean;     // Show background image (default: true)
  headerTitle?: string;         // Header title text
  headerSubtitle?: string;      // Header subtitle text
  showLogo?: boolean;          // Show logo in header (default: true)
  showAnimatedImages?: boolean; // Show animated header images (default: true)
  className?: string;          // Additional CSS classes
}
```

### IdentityFormLayout

```typescript
{
  entityKey?: string;
  title: string;               // Form title
  description?: string;        // Form description
  onSubmit?: (e) => void;     // Submit handler
  submitLabel?: string;        // Submit button text (default: "إرسال")
  showCancel?: boolean;        // Show cancel button (default: false)
  onCancel?: () => void;      // Cancel handler
  cancelLabel?: string;        // Cancel button text (default: "إلغاء")
  className?: string;
}
```

### IdentityPaymentLayout

```typescript
{
  entityKey?: string;
  currentStep?: number;        // Current step number
  totalSteps?: number;         // Total number of steps
  className?: string;
}
```

## Button Variants

```typescript
variant?: 'primary' | 'secondary' | 'outline'
```

- **primary**: Solid background with primary color
- **secondary**: Solid background with secondary color
- **outline**: Transparent background with primary border

## Asset Paths

All assets should be placed in:
```
/public/assets/identity/
```

Naming pattern:
```
official_logo_{entity}.png
{entity}_image1.png
{entity}_bg.png
```

## Demo Page

Test the system at:
```
/identity-demo
```

## Full Documentation

- **Complete Guide**: [DYNAMIC_IDENTITY_SYSTEM.md](./DYNAMIC_IDENTITY_SYSTEM.md)
- **Integration Examples**: [INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md)
- **Implementation Summary**: [DYNAMIC_IDENTITY_IMPLEMENTATION_SUMMARY.md](./DYNAMIC_IDENTITY_IMPLEMENTATION_SUMMARY.md)

## Quick Tips

1. ✅ Always specify `entityKey` or use auto-detection
2. ✅ Use identity components for consistent styling
3. ✅ Set entity context before navigation
4. ✅ Test with missing assets (graceful degradation)
5. ✅ Optimize images for production
6. ✅ Use CSS variables for custom styling
7. ✅ Check `/identity-demo` for live examples

## Troubleshooting

**Not applying?**
- Check entity key spelling
- Verify component hierarchy
- Clear browser cache

**Images not loading?**
- Check file paths in `/public/assets/identity/`
- Verify filename matches config
- Check browser console for errors

**Colors not changing?**
- Ensure `DynamicIdentityProvider` is in component tree
- Check CSS variable application
- Verify entity is set correctly

---

**Quick Start**: Visit `/identity-demo` to see everything in action!
