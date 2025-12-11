# 🚀 Dynamic Identity System - Quick Start Guide

## 📍 What You Have Now

A fully functional **Dynamic Identity System** with 7 pre-configured entity themes that automatically apply:
- Custom colors
- Brand fonts
- Button styles
- Animated headers
- Logos and images

## 🎯 Quick Access

### Demo Page
Visit the interactive demo to see all themes:
```
http://localhost:5173/identity-demo
```

### Updated Pages
These pages already use the new system:
- **Chalets**: `/create/sa/chalet` → Orange theme
- **Contracts**: `/contracts/sa` → Navy theme  
- **Health**: `/health/sa` → Teal theme

## 🎨 Available Entity Themes

```
┌─────────────────────────┬─────────────┬──────────────────┐
│ Entity                  │ Color       │ Use Case         │
├─────────────────────────┼─────────────┼──────────────────┤
│ 🏠 chalets              │ Orange      │ Vacation rentals │
│ 🏛️  government_payment  │ Blue        │ Gov services     │
│ 💳 local_payment        │ Green       │ Local payments   │
│ 📄 invoices             │ Maroon      │ Invoice mgmt     │
│ 📜 contracts            │ Navy        │ Contracts        │
│ 🏥 health_links         │ Teal        │ Healthcare       │
│ 🏦 bank_pages           │ Blue        │ Banking          │
└─────────────────────────┴─────────────┴──────────────────┘
```

## ⚡ Use It In 3 Steps

### Step 1: Import Components
```tsx
import { 
  DynamicIdentity, 
  EntityHeader, 
  EntityContainer,
  EntityButton 
} from '@/components/DynamicIdentity';
```

### Step 2: Wrap Your Page
```tsx
const MyPage = () => (
  <DynamicIdentity entityType="chalets">
    <EntityContainer entityType="chalets">
      {/* Your content */}
    </EntityContainer>
  </DynamicIdentity>
);
```

### Step 3: Use Themed Components
```tsx
{/* Animated header with logo */}
<EntityHeader
  entityType="chalets"
  title="صفحتي"
  subtitle="وصف مختصر"
/>

{/* Themed button */}
<EntityButton entityType="chalets" variant="primary">
  زر مخصص
</EntityButton>
```

## 📚 Where to Learn More

1. **Full Documentation**: Read `DYNAMIC_IDENTITY_SYSTEM.md`
2. **Implementation Guide**: See `IMPLEMENTATION_SUMMARY.md`
3. **Live Examples**: Check updated pages:
   - `src/pages/CreateChaletLink.tsx`
   - `src/pages/Contracts.tsx`
   - `src/pages/HealthServices.tsx`

## 🎨 Customization

### Change Entity Colors
Edit `src/lib/dynamicIdentity.ts`:
```typescript
chalets: {
  colors: {
    primary: '#YOUR_COLOR',    // Main color
    secondary: '#YOUR_COLOR',  // Accent color
    background: '#YOUR_COLOR'  // Background
  },
  // ... other config
}
```

### Change Fonts
```typescript
chalets: {
  fonts: {
    primary: 'YourFont, sans-serif',
    secondary: 'AltFont, sans-serif'
  },
  // ... other config
}
```

### Change Button Style
```typescript
chalets: {
  buttons: {
    style: 'rounded',  // or 'flat'
    hover: 'darken'    // or 'highlight'
  },
  // ... other config
}
```

## 🔧 Replace Placeholder Images

Current placeholders are SVG. To use real images:

1. Add your images to `/public/assets/identity/`:
   ```
   /public/assets/identity/
   ├── official_logo_chalets.png
   ├── chalets_image1.png
   ├── chalets_image2.png
   └── chalets_bg1.png
   ```

2. Update paths in `src/lib/dynamicIdentity.ts`:
   ```typescript
   chalets: {
     logo: '/assets/identity/official_logo_chalets.png',
     animated_header_images: [
       '/assets/identity/chalets_image1.png',
       '/assets/identity/chalets_image2.png'
     ],
     // ...
   }
   ```

## 🎯 Common Tasks

### Add New Entity Type
1. Edit `src/lib/dynamicIdentity.ts`
2. Add to `EntityType`:
   ```typescript
   export type EntityType = 
     | 'chalets'
     | 'your_new_entity';
   ```
3. Add configuration:
   ```typescript
   your_new_entity: {
     logo: '...',
     colors: { ... },
     fonts: { ... },
     buttons: { ... }
   }
   ```

### Apply to New Page
See Step 1-3 above, then apply to any page component.

### Test All Themes
Visit `/identity-demo` and click through all entity tabs.

## 💡 Pro Tips

1. **Use CSS Variables**: Access theme colors anywhere with `var(--entity-primary)`
2. **Preview Changes**: Use demo page to test modifications
3. **Consistent Usage**: Keep entity theme throughout related pages
4. **Accessibility**: Ensure colors meet WCAG contrast requirements
5. **Performance**: Optimize images before adding (max 200KB recommended)

## 🐛 Troubleshooting

### Theme Not Applying?
- Check entity type spelling
- Ensure `<DynamicIdentity>` wrapper is present
- Verify imports are correct

### Images Not Showing?
- Confirm image paths start with `/`
- Check files exist in `/public`
- SVG placeholders should work as fallback

### Buttons Not Themed?
- Use `<EntityButton>` not regular `<Button>`
- Pass correct `entityType` prop

## 📞 Need Help?

1. Check documentation: `DYNAMIC_IDENTITY_SYSTEM.md`
2. See examples in updated pages
3. Review demo page code: `src/pages/DynamicIdentityDemo.tsx`

## ✅ Quick Checklist

- [ ] Run project: `npm run dev` or `bun dev`
- [ ] Visit demo: `/identity-demo`
- [ ] Test updated pages
- [ ] Read documentation
- [ ] Try customizing a theme
- [ ] Apply to your own page

---

**🎉 You're Ready!** Start using the Dynamic Identity System in your pages.

For detailed information, see:
- 📖 `DYNAMIC_IDENTITY_SYSTEM.md` - Complete documentation
- 📊 `IMPLEMENTATION_SUMMARY.md` - What was built
- 🔍 `/identity-demo` - Live interactive demo
