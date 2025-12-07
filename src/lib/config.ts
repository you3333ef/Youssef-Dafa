export const getProductionDomain = (): string => {
  if (import.meta.env.VITE_PRODUCTION_DOMAIN) {
    return import.meta.env.VITE_PRODUCTION_DOMAIN;
  }
  
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return 'https://gulf-unified-payment.netlify.app';
};

export const getBaseUrl = (): string => {
  return getProductionDomain();
};
