export interface CompanyBranding {
  id: string;
  name: string;
  nameAr: string;
  officialColor: string;
  secondaryColor?: string;
  logoUrl?: string;
  logoType: 'svg' | 'png' | 'webp';
  brandGuidelines?: {
    fontFamily?: string;
    fontSize?: string;
    textColor?: string;
    backgroundColor?: string;
  };
}

export const BANK_OFFICIAL_BRANDING: Record<string, CompanyBranding> = {
  alrajhi_bank: {
    id: 'alrajhi_bank',
    name: 'Al Rajhi Bank',
    nameAr: 'مصرف الراجحي',
    officialColor: '#006C35',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/alrajhi-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#006C35',
      backgroundColor: '#FFFFFF',
    }
  },
  alahli_bank: {
    id: 'alahli_bank',
    name: 'Saudi National Bank',
    nameAr: 'البنك الأهلي السعودي',
    officialColor: '#E30613',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/snb-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#E30613',
      backgroundColor: '#FFFFFF',
    }
  },
  riyad_bank: {
    id: 'riyad_bank',
    name: 'Riyad Bank',
    nameAr: 'بنك الرياض',
    officialColor: '#0066B2',
    secondaryColor: '#00AF9A',
    logoUrl: '/logos/riyad-bank-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#0066B2',
      backgroundColor: '#FFFFFF',
    }
  },
  samba_bank: {
    id: 'samba_bank',
    name: 'Samba Financial Group',
    nameAr: 'مجموعة سامبا المالية',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  alinma_bank: {
    id: 'alinma_bank',
    name: 'Alinma Bank',
    nameAr: 'بنك الإنماء',
    officialColor: '#00A650',
    secondaryColor: '#FFFFFF',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#00A650',
      backgroundColor: '#FFFFFF',
    }
  },
  emirates_nbd: {
    id: 'emirates_nbd',
    name: 'Emirates NBD',
    nameAr: 'بنك الإمارات دبي الوطني',
    officialColor: '#D50032',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/emirates-nbd-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#D50032',
      backgroundColor: '#FFFFFF',
    }
  },
  fab: {
    id: 'fab',
    name: 'First Abu Dhabi Bank',
    nameAr: 'بنك أبوظبي الأول',
    officialColor: '#000000',
    secondaryColor: '#FAA819',
    logoUrl: '/logos/fab-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
    }
  },
  qnb: {
    id: 'qnb',
    name: 'Qatar National Bank',
    nameAr: 'بنك قطر الوطني',
    officialColor: '#6E1D3E',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/qnb-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#6E1D3E',
      backgroundColor: '#FFFFFF',
    }
  },
  nbk: {
    id: 'nbk',
    name: 'National Bank of Kuwait',
    nameAr: 'بنك الكويت الوطني',
    officialColor: '#005EB8',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/nbk-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#005EB8',
      backgroundColor: '#FFFFFF',
    }
  },
  bank_muscat: {
    id: 'bank_muscat',
    name: 'Bank Muscat',
    nameAr: 'بنك مسقط',
    officialColor: '#004B87',
    secondaryColor: '#E31E24',
    logoUrl: '/logos/bank-muscat-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
};

export const SHIPPING_OFFICIAL_BRANDING: Record<string, CompanyBranding> = {
  aramex: {
    id: 'aramex',
    name: 'Aramex',
    nameAr: 'أرامكس',
    officialColor: '#E31E24',
    secondaryColor: '#000000',
    logoUrl: '/logos/aramex-logo.webp',
    logoType: 'webp',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  dhl: {
    id: 'dhl',
    name: 'DHL',
    nameAr: 'دي إتش إل',
    officialColor: '#FFCC00',
    secondaryColor: '#D40511',
    logoUrl: '/logos/dhl-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#D40511',
      backgroundColor: '#FFCC00',
    }
  },
  fedex: {
    id: 'fedex',
    name: 'FedEx',
    nameAr: 'فيديكس',
    officialColor: '#4D148C',
    secondaryColor: '#FF6600',
    logoUrl: '/logos/fedex-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#4D148C',
      backgroundColor: '#FFFFFF',
    }
  },
  ups: {
    id: 'ups',
    name: 'UPS',
    nameAr: 'يو بي إس',
    officialColor: '#351C15',
    secondaryColor: '#FFB500',
    logoUrl: '/logos/ups-logo.png',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#351C15',
      backgroundColor: '#FFB500',
    }
  },
  smsa: {
    id: 'smsa',
    name: 'SMSA Express',
    nameAr: 'سمسا إكسبرس',
    officialColor: '#E30613',
    secondaryColor: '#003087',
    logoUrl: '/logos/smsa-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E30613',
      backgroundColor: '#FFFFFF',
    }
  },
  zajil: {
    id: 'zajil',
    name: 'Zajil Express',
    nameAr: 'زاجل إكسبرس',
    officialColor: '#00A651',
    secondaryColor: '#FFFFFF',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
  naqel: {
    id: 'naqel',
    name: 'Naqel Express',
    nameAr: 'ناقل إكسبرس',
    officialColor: '#009639',
    secondaryColor: '#FFFFFF',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#009639',
      backgroundColor: '#FFFFFF',
    }
  },
  saudipost: {
    id: 'saudipost',
    name: 'Saudi Post',
    nameAr: 'البريد السعودي',
    officialColor: '#006C35',
    secondaryColor: '#FFB81C',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#006C35',
      backgroundColor: '#FFFFFF',
    }
  },
  empost: {
    id: 'empost',
    name: 'Emirates Post',
    nameAr: 'البريد الإماراتي',
    officialColor: '#00A651',
    secondaryColor: '#E31E24',
    logoType: 'png',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
};

export const PAYMENT_SERVICES_BRANDING: Record<string, CompanyBranding> = {
  stcpay: {
    id: 'stcpay',
    name: 'STC Pay',
    nameAr: 'إس تي سي باي',
    officialColor: '#E30613',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/stcpay-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E30613',
      backgroundColor: '#FFFFFF',
    }
  },
  mada: {
    id: 'mada',
    name: 'mada',
    nameAr: 'مدى',
    officialColor: '#006C35',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/mada-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#006C35',
      backgroundColor: '#FFFFFF',
    }
  },
  visa: {
    id: 'visa',
    name: 'Visa',
    nameAr: 'فيزا',
    officialColor: '#1A1F71',
    secondaryColor: '#F7B600',
    logoUrl: '/logos/visa-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#1A1F71',
      backgroundColor: '#FFFFFF',
    }
  },
  mastercard: {
    id: 'mastercard',
    name: 'Mastercard',
    nameAr: 'ماستركارد',
    officialColor: '#EB001B',
    secondaryColor: '#FF5F00',
    logoUrl: '/logos/mastercard-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
    }
  },
};

export const getBrandingById = (id: string): CompanyBranding | undefined => {
  return (
    BANK_OFFICIAL_BRANDING[id] ||
    SHIPPING_OFFICIAL_BRANDING[id] ||
    PAYMENT_SERVICES_BRANDING[id]
  );
};

export const getBankBranding = (bankId: string): CompanyBranding | undefined => {
  return BANK_OFFICIAL_BRANDING[bankId];
};

export const getShippingBranding = (shippingId: string): CompanyBranding | undefined => {
  return SHIPPING_OFFICIAL_BRANDING[shippingId];
};

export const getPaymentBranding = (paymentId: string): CompanyBranding | undefined => {
  return PAYMENT_SERVICES_BRANDING[paymentId];
};
