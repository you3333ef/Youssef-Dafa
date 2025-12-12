/**
 * Visual Identity System - نظام تطبيق الهوية البصرية الموحد
 * 
 * يطبق الهوية البصرية الكاملة (الألوان، الخطوط، الظلال، المسافات) تلقائياً
 * بناءً على البنك أو الشركة المختارة
 */

import { getBankIdentity, BankIdentity } from './bankIdentities';
import { getCompanyIdentity, CompanyIdentity } from './companyIdentities';

export type VisualIdentity = BankIdentity | CompanyIdentity;

/**
 * Apply visual identity to document
 * تطبيق الهوية البصرية على المستند
 */
export const applyVisualIdentity = (entityId: string, entityType: 'bank' | 'company' = 'bank'): VisualIdentity | null => {
  if (!entityId || entityId === 'skipped') return null;
  
  let identity: VisualIdentity | undefined;
  
  if (entityType === 'bank') {
    identity = getBankIdentity(entityId);
  } else {
    identity = getCompanyIdentity(entityId);
  }
  
  if (!identity) return null;
  
  // Apply CSS variables
  applyCSSVariables(identity);
  
  // Apply meta tags
  applyMetaTags(identity);
  
  return identity;
};

/**
 * Apply CSS variables for the identity
 * تطبيق متغيرات CSS للهوية
 */
const applyCSSVariables = (identity: VisualIdentity) => {
  const root = document.documentElement;
  
  // Colors
  root.style.setProperty('--color-primary', identity.colors.primary);
  root.style.setProperty('--color-secondary', identity.colors.secondary);
  root.style.setProperty('--color-accent', identity.colors.accent || identity.colors.primary);
  root.style.setProperty('--color-background', identity.colors.background);
  root.style.setProperty('--color-surface', identity.colors.surface);
  root.style.setProperty('--color-text', identity.colors.text);
  root.style.setProperty('--color-text-secondary', identity.colors.textSecondary);
  root.style.setProperty('--color-border', identity.colors.border);
  
  // Fonts
  root.style.setProperty('--font-primary', identity.fonts.primary);
  root.style.setProperty('--font-arabic', identity.fonts.arabic);
  root.style.setProperty('--font-english', identity.fonts.english);
  
  // Border Radius
  root.style.setProperty('--radius-sm', identity.design.borderRadius.sm);
  root.style.setProperty('--radius-md', identity.design.borderRadius.md);
  root.style.setProperty('--radius-lg', identity.design.borderRadius.lg);
  root.style.setProperty('--radius-xl', identity.design.borderRadius.xl);
  
  // Shadows
  root.style.setProperty('--shadow-sm', identity.design.shadows.sm);
  root.style.setProperty('--shadow-md', identity.design.shadows.md);
  root.style.setProperty('--shadow-lg', identity.design.shadows.lg);
  
  // Spacing
  if ('spacing' in identity.design) {
    root.style.setProperty('--spacing-xs', identity.design.spacing.xs);
    root.style.setProperty('--spacing-sm', identity.design.spacing.sm);
    root.style.setProperty('--spacing-md', identity.design.spacing.md);
    root.style.setProperty('--spacing-lg', identity.design.spacing.lg);
    root.style.setProperty('--spacing-xl', identity.design.spacing.xl);
  }
};

/**
 * Apply meta tags for sharing
 * تطبيق meta tags للمشاركة
 */
const applyMetaTags = (identity: VisualIdentity) => {
  // Update OG image
  updateMetaTag('meta[property="og:image"]', getAbsoluteUrl(identity.meta.ogImage));
  updateMetaTag('meta[property="og:image:secure_url"]', getAbsoluteUrl(identity.meta.ogImage));
  updateMetaTag('meta[name="twitter:image"]', getAbsoluteUrl(identity.meta.ogImage));
  
  // Update OG description
  updateMetaTag('meta[property="og:description"]', identity.meta.ogDescription);
  updateMetaTag('meta[name="description"]', identity.meta.ogDescription);
  updateMetaTag('meta[name="twitter:description"]', identity.meta.ogDescription);
  
  // Update OG title
  const pageTitle = `${identity.nameAr} - ${identity.meta.tagline}`;
  updateMetaTag('meta[property="og:title"]', pageTitle);
  updateMetaTag('meta[name="twitter:title"]', pageTitle);
  
  // Update page title
  document.title = pageTitle;
};

/**
 * Update a meta tag
 */
const updateMetaTag = (selector: string, content: string) => {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    const match = selector.match(/\[(.+?)="(.+?)"\]/);
    if (match) {
      tag.setAttribute(match[1], match[2]);
      document.head.appendChild(tag);
    }
  }
  tag.setAttribute('content', content);
};

/**
 * Get absolute URL for images
 */
const getAbsoluteUrl = (path: string): string => {
  if (path.startsWith('http')) return path;
  
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://sensational-fenglisu-ebbbfb.netlify.app';
  
  return `${baseUrl}${path}`;
};

/**
 * Get identity styles for inline use
 * الحصول على أنماط الهوية للاستخدام المباشر
 */
export const getIdentityStyles = (entityId: string, entityType: 'bank' | 'company' = 'bank') => {
  let identity: VisualIdentity | undefined;
  
  if (entityType === 'bank') {
    identity = getBankIdentity(entityId);
  } else {
    identity = getCompanyIdentity(entityId);
  }
  
  if (!identity) {
    return {
      colors: {
        primary: '#004B87',
        secondary: '#003566',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#1A1A1A',
      },
      fonts: {
        primary: 'Cairo, sans-serif',
        arabic: 'Cairo, sans-serif',
      },
      design: {
        borderRadius: { sm: '6px', md: '10px', lg: '14px', xl: '18px' },
        shadows: { sm: '0 2px 4px rgba(0,0,0,0.1)', md: '0 4px 8px rgba(0,0,0,0.15)', lg: '0 10px 20px rgba(0,0,0,0.2)' },
      },
    };
  }
  
  return {
    colors: identity.colors,
    fonts: identity.fonts,
    design: identity.design,
    meta: identity.meta,
    logo: identity.logo,
  };
};

/**
 * Create gradient from identity colors
 * إنشاء تدرج لوني من ألوان الهوية
 */
export const createGradient = (identity: VisualIdentity, direction: string = '135deg'): string => {
  return `linear-gradient(${direction}, ${identity.colors.primary}, ${identity.colors.secondary})`;
};

/**
 * Get contrasting text color
 * الحصول على لون نص متباين
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

/**
 * Apply box shadow with identity color
 */
export const createShadow = (identity: VisualIdentity, size: 'sm' | 'md' | 'lg' = 'md'): string => {
  const shadows = {
    sm: `0 2px 4px ${identity.colors.primary}20`,
    md: `0 4px 8px ${identity.colors.primary}30`,
    lg: `0 10px 20px ${identity.colors.primary}40`,
  };
  
  return shadows[size];
};

/**
 * Reset visual identity (remove all custom CSS variables)
 */
export const resetVisualIdentity = () => {
  const root = document.documentElement;
  const properties = [
    '--color-primary',
    '--color-secondary',
    '--color-accent',
    '--color-background',
    '--color-surface',
    '--color-text',
    '--color-text-secondary',
    '--color-border',
    '--font-primary',
    '--font-arabic',
    '--font-english',
    '--radius-sm',
    '--radius-md',
    '--radius-lg',
    '--radius-xl',
    '--shadow-sm',
    '--shadow-md',
    '--shadow-lg',
    '--spacing-xs',
    '--spacing-sm',
    '--spacing-md',
    '--spacing-lg',
    '--spacing-xl',
  ];
  
  properties.forEach(prop => root.style.removeProperty(prop));
};
