export interface EntityColors {
  primary: string;
  secondary: string;
  background: string;
}

export interface EntityFonts {
  primary: string;
  secondary: string;
}

export interface EntityButtons {
  style: 'rounded' | 'flat';
  hover: 'darken' | 'highlight';
}

export interface EntityIdentity {
  logo: string;
  animated_header_images: string[];
  header_position: 'below_top_bar' | 'top';
  colors: EntityColors;
  fonts: EntityFonts;
  buttons: EntityButtons;
  background_images: string[];
  dynamic_behavior?: {
    on_bank_selection?: {
      apply_identity: boolean;
    };
  };
}

export type EntityType = 
  | 'chalets' 
  | 'government_payment' 
  | 'local_payment' 
  | 'invoices' 
  | 'contracts' 
  | 'health_links' 
  | 'bank_pages';

import { entityPlaceholders } from '@/utils/generateIdentityAssets';

export const dynamicIdentityConfig: Record<EntityType, EntityIdentity> = {
  chalets: {
    logo: entityPlaceholders.chalets.logo,
    animated_header_images: entityPlaceholders.chalets.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#FF6F00',
      secondary: '#FFA000',
      background: '#FFF3E0'
    },
    fonts: {
      primary: 'Roboto, sans-serif',
      secondary: 'Arial, sans-serif'
    },
    buttons: {
      style: 'rounded',
      hover: 'darken'
    },
    background_images: entityPlaceholders.chalets.backgrounds
  },
  government_payment: {
    logo: entityPlaceholders.government_payment.logo,
    animated_header_images: entityPlaceholders.government_payment.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#004080',
      secondary: '#0073E6',
      background: '#E6F0FF'
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Tahoma, sans-serif'
    },
    buttons: {
      style: 'flat',
      hover: 'highlight'
    },
    background_images: entityPlaceholders.government_payment.backgrounds
  },
  local_payment: {
    logo: entityPlaceholders.local_payment.logo,
    animated_header_images: entityPlaceholders.local_payment.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#008000',
      secondary: '#00C000',
      background: '#E6FFE6'
    },
    fonts: {
      primary: 'Verdana, sans-serif',
      secondary: 'Arial, sans-serif'
    },
    buttons: {
      style: 'rounded',
      hover: 'darken'
    },
    background_images: entityPlaceholders.local_payment.backgrounds
  },
  invoices: {
    logo: entityPlaceholders.invoices.logo,
    animated_header_images: entityPlaceholders.invoices.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#800000',
      secondary: '#B22222',
      background: '#FFE6E6'
    },
    fonts: {
      primary: 'Times New Roman, serif',
      secondary: 'Georgia, serif'
    },
    buttons: {
      style: 'flat',
      hover: 'highlight'
    },
    background_images: entityPlaceholders.invoices.backgrounds
  },
  contracts: {
    logo: entityPlaceholders.contracts.logo,
    animated_header_images: entityPlaceholders.contracts.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#000080',
      secondary: '#0000CD',
      background: '#E6E6FF'
    },
    fonts: {
      primary: 'Georgia, serif',
      secondary: 'Times New Roman, serif'
    },
    buttons: {
      style: 'rounded',
      hover: 'darken'
    },
    background_images: entityPlaceholders.contracts.backgrounds
  },
  health_links: {
    logo: entityPlaceholders.health_links.logo,
    animated_header_images: entityPlaceholders.health_links.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#008080',
      secondary: '#20B2AA',
      background: '#E0FFFF'
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Verdana, sans-serif'
    },
    buttons: {
      style: 'flat',
      hover: 'highlight'
    },
    background_images: entityPlaceholders.health_links.backgrounds
  },
  bank_pages: {
    logo: entityPlaceholders.bank_pages.logo,
    animated_header_images: entityPlaceholders.bank_pages.images,
    header_position: 'below_top_bar',
    colors: {
      primary: '#0000FF',
      secondary: '#1E90FF',
      background: '#E6F0FF'
    },
    fonts: {
      primary: 'Tahoma, sans-serif',
      secondary: 'Verdana, sans-serif'
    },
    buttons: {
      style: 'rounded',
      hover: 'darken'
    },
    background_images: entityPlaceholders.bank_pages.backgrounds,
    dynamic_behavior: {
      on_bank_selection: {
        apply_identity: true
      }
    }
  }
};

export const getEntityIdentity = (entityType: EntityType): EntityIdentity | null => {
  return dynamicIdentityConfig[entityType] || null;
};

export const getEntityByPage = (pathname: string): EntityType | null => {
  if (pathname.includes('/chalet')) return 'chalets';
  if (pathname.includes('/payment') && pathname.includes('gov')) return 'government_payment';
  if (pathname.includes('/payment')) return 'local_payment';
  if (pathname.includes('/invoice')) return 'invoices';
  if (pathname.includes('/contract')) return 'contracts';
  if (pathname.includes('/health')) return 'health_links';
  if (pathname.includes('/bank')) return 'bank_pages';
  
  return null;
};

export const getCSSVariablesForEntity = (entityType: EntityType): Record<string, string> => {
  const identity = getEntityIdentity(entityType);
  if (!identity) return {};

  return {
    '--entity-primary': identity.colors.primary,
    '--entity-secondary': identity.colors.secondary,
    '--entity-background': identity.colors.background,
    '--entity-font-primary': identity.fonts.primary,
    '--entity-font-secondary': identity.fonts.secondary,
    '--entity-button-radius': identity.buttons.style === 'rounded' ? '8px' : '2px',
  };
};
