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
    logoUrl: '/logos/snb-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/riyad-bank-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/samba-logo.svg',
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
    logoUrl: '/logos/alinma-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A650',
      backgroundColor: '#FFFFFF',
    }
  },
  saudi_investment_bank: {
    id: 'saudi_investment_bank',
    name: 'Saudi Investment Bank',
    nameAr: 'البنك السعودي للاستثمار',
    officialColor: '#004B87',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/saudi-investment-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
  arab_national_bank: {
    id: 'arab_national_bank',
    name: 'Arab National Bank',
    nameAr: 'البنك العربي الوطني',
    officialColor: '#00A551',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/arab-national-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A551',
      backgroundColor: '#FFFFFF',
    }
  },
  saudi_fransi_bank: {
    id: 'saudi_fransi_bank',
    name: 'Banque Saudi Fransi',
    nameAr: 'البنك السعودي الفرنسي',
    officialColor: '#ED1C24',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/saudi-fransi-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#ED1C24',
      backgroundColor: '#FFFFFF',
    }
  },
  albilad_bank: {
    id: 'albilad_bank',
    name: 'Bank AlBilad',
    nameAr: 'بنك البلاد',
    officialColor: '#1C4587',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/albilad-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#1C4587',
      backgroundColor: '#FFFFFF',
    }
  },
  aljazira_bank: {
    id: 'aljazira_bank',
    name: 'Bank AlJazira',
    nameAr: 'بنك الجزيرة',
    officialColor: '#005EB8',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/aljazira-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#005EB8',
      backgroundColor: '#FFFFFF',
    }
  },
  adcb: {
    id: 'adcb',
    name: 'Abu Dhabi Commercial Bank',
    nameAr: 'بنك أبوظبي التجاري',
    officialColor: '#004B87',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/adcb-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
  dib: {
    id: 'dib',
    name: 'Dubai Islamic Bank',
    nameAr: 'بنك دبي الإسلامي',
    officialColor: '#00923F',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/dib-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00923F',
      backgroundColor: '#FFFFFF',
    }
  },
  mashreq_bank: {
    id: 'mashreq_bank',
    name: 'Mashreq Bank',
    nameAr: 'بنك المشرق',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/mashreq-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  cbd: {
    id: 'cbd',
    name: 'Commercial Bank of Dubai',
    nameAr: 'بنك دبي التجاري',
    officialColor: '#004B87',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/cbd-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
  rakbank: {
    id: 'rakbank',
    name: 'RAKBANK',
    nameAr: 'بنك رأس الخيمة الوطني',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/rakbank-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  ajman_bank: {
    id: 'ajman_bank',
    name: 'Ajman Bank',
    nameAr: 'بنك عجمان',
    officialColor: '#00A651',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/ajman-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
  emirates_nbd: {
    id: 'emirates_nbd',
    name: 'Emirates NBD',
    nameAr: 'بنك الإمارات دبي الوطني',
    officialColor: '#D50032',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/emirates-nbd-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/fab-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
    }
  },
  gulf_bank: {
    id: 'gulf_bank',
    name: 'Gulf Bank',
    nameAr: 'بنك الخليج',
    officialColor: '#004B87',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/gulf-bank-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
  cbk: {
    id: 'cbk',
    name: 'Commercial Bank of Kuwait',
    nameAr: 'البنك التجاري الكويتي',
    officialColor: '#00A651',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/cbk-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
  burgan_bank: {
    id: 'burgan_bank',
    name: 'Burgan Bank',
    nameAr: 'بنك برقان',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/burgan-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  ahli_united_bank: {
    id: 'ahli_united_bank',
    name: 'Ahli United Bank',
    nameAr: 'الأهلي المتحد',
    officialColor: '#00843D',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/ahli-united-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00843D',
      backgroundColor: '#FFFFFF',
    }
  },
  kfh: {
    id: 'kfh',
    name: 'Kuwait Finance House',
    nameAr: 'بيت التمويل الكويتي',
    officialColor: '#00923F',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/kfh-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00923F',
      backgroundColor: '#FFFFFF',
    }
  },
  boubyan_bank: {
    id: 'boubyan_bank',
    name: 'Boubyan Bank',
    nameAr: 'بنك بوبيان',
    officialColor: '#0066B2',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/boubyan-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#0066B2',
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
  cbq: {
    id: 'cbq',
    name: 'Commercial Bank of Qatar',
    nameAr: 'البنك التجاري القطري',
    officialColor: '#004B87',
    secondaryColor: '#FFFFFF',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
  doha_bank: {
    id: 'doha_bank',
    name: 'Doha Bank',
    nameAr: 'بنك الدوحة',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  qib: {
    id: 'qib',
    name: 'Qatar Islamic Bank',
    nameAr: 'بنك قطر الإسلامي',
    officialColor: '#00923F',
    secondaryColor: '#FFFFFF',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00923F',
      backgroundColor: '#FFFFFF',
    }
  },
  masraf_alrayan: {
    id: 'masraf_alrayan',
    name: 'Masraf Al Rayan',
    nameAr: 'مصرف الريان',
    officialColor: '#00A651',
    secondaryColor: '#FFFFFF',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
  ahlibank: {
    id: 'ahlibank',
    name: 'Ahlibank',
    nameAr: 'الأهلي بنك',
    officialColor: '#00843D',
    secondaryColor: '#FFFFFF',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00843D',
      backgroundColor: '#FFFFFF',
    }
  },
  national_bank_oman: {
    id: 'national_bank_oman',
    name: 'National Bank of Oman',
    nameAr: 'البنك الوطني العماني',
    officialColor: '#00A651',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/nbo-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
  bank_dhofar: {
    id: 'bank_dhofar',
    name: 'Bank Dhofar',
    nameAr: 'بنك ظفار',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/bank-dhofar-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  ahli_bank_oman: {
    id: 'ahli_bank_oman',
    name: 'Ahli Bank',
    nameAr: 'البنك الأهلي',
    officialColor: '#00843D',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/ahli-oman-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00843D',
      backgroundColor: '#FFFFFF',
    }
  },
  nizwa_bank: {
    id: 'nizwa_bank',
    name: 'Bank Nizwa',
    nameAr: 'بنك نزوى',
    officialColor: '#00923F',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/bank-nizwa-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00923F',
      backgroundColor: '#FFFFFF',
    }
  },
  sohar_international: {
    id: 'sohar_international',
    name: 'Sohar International Bank',
    nameAr: 'بنك صحار الدولي',
    officialColor: '#0066B2',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/sohar-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#0066B2',
      backgroundColor: '#FFFFFF',
    }
  },
  nbb: {
    id: 'nbb',
    name: 'National Bank of Bahrain',
    nameAr: 'بنك البحرين الوطني',
    officialColor: '#E31E24',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/nbb-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#E31E24',
      backgroundColor: '#FFFFFF',
    }
  },
  bbk: {
    id: 'bbk',
    name: 'Bank of Bahrain and Kuwait',
    nameAr: 'بنك البحرين والكويت',
    officialColor: '#004B87',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/bbk-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#004B87',
      backgroundColor: '#FFFFFF',
    }
  },
  ahli_united_bahrain: {
    id: 'ahli_united_bahrain',
    name: 'Ahli United Bank',
    nameAr: 'الأهلي المتحد',
    officialColor: '#00843D',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/ahli-united-bahrain-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00843D',
      backgroundColor: '#FFFFFF',
    }
  },
  bisb: {
    id: 'bisb',
    name: 'Bahrain Islamic Bank',
    nameAr: 'بنك البحرين الإسلامي',
    officialColor: '#00923F',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/bisb-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00923F',
      backgroundColor: '#FFFFFF',
    }
  },
  ithmaar_bank: {
    id: 'ithmaar_bank',
    name: 'Ithmaar Bank',
    nameAr: 'بنك إثمار',
    officialColor: '#00A651',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/ithmaar-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#00A651',
      backgroundColor: '#FFFFFF',
    }
  },
  khaleeji_bank: {
    id: 'khaleeji_bank',
    name: 'Khaleeji Commercial Bank',
    nameAr: 'بنك الخليج التجاري',
    officialColor: '#0066B2',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/khaleeji-logo.svg',
    logoType: 'svg',
    brandGuidelines: {
      textColor: '#0066B2',
      backgroundColor: '#FFFFFF',
    }
  },
  nbk: {
    id: 'nbk',
    name: 'National Bank of Kuwait',
    nameAr: 'بنك الكويت الوطني',
    officialColor: '#005EB8',
    secondaryColor: '#FFFFFF',
    logoUrl: '/logos/nbk-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/ups-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/zajil-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/naqel-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/saudi-post-logo.svg',
    logoType: 'svg',
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
    logoUrl: '/logos/emirates-post-logo.svg',
    logoType: 'svg',
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
