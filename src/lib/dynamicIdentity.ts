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

export const dynamicIdentityConfig: DynamicIdentityConfig = {
  entities: {
    chalets: {
      logo: 'official_logo_chalets.svg',
      animated_header_images: ['chalets_image1.svg', 'chalets_image2.svg', 'chalets_image3.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'chalets_payment.svg',
      payment_share_description: 'احجز شاليه أحلامك بسهولة وأمان مع هوية الدفع الرسمية.',
      colors: { primary: '#FF6F00', secondary: '#FFA000', background: '#FFF3E0' },
      fonts: ['Roboto', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['chalets_bg1.svg', 'chalets_bg2.svg'],
      auto_apply: true,
    },
    government_payment: {
      logo: 'official_logo_gov.svg',
      animated_header_images: ['gov_image1.svg', 'gov_image2.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'gov_payment.svg',
      payment_share_description: 'سداد حكومي سريع وآمن مع هوية الدفع الرسمية للجهة.',
      colors: { primary: '#004080', secondary: '#0073E6', background: '#E6F0FF' },
      fonts: ['Arial', 'Tahoma'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: ['gov_bg.svg'],
      auto_apply: true,
    },
    local_payment: {
      logo: 'official_logo_local.svg',
      animated_header_images: ['local_image1.svg', 'local_image2.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'local_payment.svg',
      payment_share_description: 'سداد محلي سريع وآمن مع هوية الدفع الرسمية للبوابة.',
      colors: { primary: '#008000', secondary: '#00C000', background: '#E6FFE6' },
      fonts: ['Verdana', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['local_bg.svg'],
      auto_apply: true,
    },
    invoices: {
      logo: 'official_logo_invoice.svg',
      animated_header_images: ['invoice_image1.svg', 'invoice_image2.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'invoice_payment.svg',
      payment_share_description: 'عرض الفواتير الرسمي بدقة مع هوية الدفع للجهة.',
      colors: { primary: '#800000', secondary: '#B22222', background: '#FFE6E6' },
      fonts: ['Times New Roman', 'Georgia'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: ['invoice_bg.svg'],
      auto_apply: true,
    },
    contracts: {
      logo: 'official_logo_contract.svg',
      animated_header_images: ['contract_image1.svg', 'contract_image2.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'contract_payment.svg',
      payment_share_description: 'العقود الرسمية مع هوية الدفع المعتمدة للجهة.',
      colors: { primary: '#000080', secondary: '#0000CD', background: '#E6E6FF' },
      fonts: ['Georgia', 'Times New Roman'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['contract_bg.svg'],
      auto_apply: true,
    },
    health_links: {
      logo: 'official_logo_health.svg',
      animated_header_images: ['health_image1.svg', 'health_image2.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'health_payment.svg',
      payment_share_description: 'الخدمات الصحية الرسمية مع هوية الدفع الخاصة بالجهة.',
      colors: { primary: '#008080', secondary: '#20B2AA', background: '#E0FFFF' },
      fonts: ['Arial', 'Verdana'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: ['health_bg.svg'],
      auto_apply: true,
    },
    bank_pages: {
      logo: 'official_logo_bank.svg',
      animated_header_images: ['bank_image1.svg', 'bank_image2.svg'],
      header_position: 'below_top_bar',
      payment_share_image: 'bank_payment.svg',
      payment_share_description: 'الوصول إلى الدفع البنكي الرسمي مع الهوية البصرية لكل صفحة.',
      colors: { primary: '#0000FF', secondary: '#1E90FF', background: '#E6F0FF' },
      fonts: ['Tahoma', 'Verdana'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['bank_bg.svg'],
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
  return identity ? `/assets/dynamic-identity/${identity.logo}` : null;
};

export const getEntityHeaderImages = (entityKey: string): string[] => {
  const identity = getEntityIdentity(entityKey);
  return identity ? identity.animated_header_images.map(img => `/assets/dynamic-identity/${img}`) : [];
};

export const getEntityBackgroundImages = (entityKey: string): string[] => {
  const identity = getEntityIdentity(entityKey);
  return identity ? identity.background_images.map(img => `/assets/dynamic-identity/${img}`) : [];
};

export const getEntityPaymentShareImage = (entityKey: string): string | null => {
  const identity = getEntityIdentity(entityKey);
  return identity ? `/assets/dynamic-identity/${identity.payment_share_image}` : null;
};

export const shouldAutoApply = (entityKey: string): boolean => {
  const identity = getEntityIdentity(entityKey);
  return identity ? identity.auto_apply : false;
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
