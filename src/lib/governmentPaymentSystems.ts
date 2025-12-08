export interface GovernmentPaymentSystem {
  countryCode: string;
  nameAr: string;
  nameEn: string;
  description: string;
  logo?: string;
  heroImage?: string;
  website?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    textOnPrimary: string;
    border: string;
    cardBg?: string;
    inputBorder?: string;
    buttonHover?: string;
  };
  fonts: {
    primaryAr: string;
    primary: string;
    secondary: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    header: string;
    card?: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl?: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl?: string;
  };
  paymentMethods: string[];
}

export const governmentPaymentSystems: Record<string, GovernmentPaymentSystem> = {
  SA: {
    countryCode: 'SA',
    nameAr: 'سداد',
    nameEn: 'SADAD',
    description: 'نظام المدفوعات الوطني للخدمات الحكومية والفواتير - معتمد من البنك المركزي السعودي',
    logo: '/src/assets/gov-sadad-official.png',
    heroImage: '/src/assets/gov-hero-sadad.svg',
    website: 'https://www.sadad.com/',
    colors: {
      primary: '#F58220',
      secondary: '#E67317',
      accent: '#FFA94D',
      background: '#FFFFFF',
      surface: '#FFF8F2',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE5D0',
      cardBg: '#FFFFFF',
      inputBorder: '#FFD5B3',
      buttonHover: '#E67317',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #F58220 0%, #E67317 100%)',
      secondary: 'linear-gradient(135deg, #E67317 0%, #F58220 100%)',
      header: 'linear-gradient(180deg, #F58220 0%, #E67317 100%)',
      card: 'linear-gradient(145deg, #FFF8F2 0%, #FFFFFF 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(245, 130, 32, 0.08)',
      md: '0 4px 12px -1px rgba(245, 130, 32, 0.15)',
      lg: '0 10px 24px -3px rgba(245, 130, 32, 0.2)',
      xl: '0 20px 40px -3px rgba(245, 130, 32, 0.25)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    paymentMethods: ['بطاقة مدى', 'بطاقة ائتمانية', 'حساب بنكي', 'سداد'],
  },

  AE: {
    countryCode: 'AE',
    nameAr: 'الدرهم الإلكتروني',
    nameEn: 'E-dirham',
    description: 'نظام الدفع الإلكتروني الحكومي الإماراتي - معتمد من المصرف المركزي',
    logo: '/src/assets/gov-uae-logo.jpg',
    heroImage: '/src/assets/gov-hero-jaywan.svg',
    website: 'https://aep.ae/',
    colors: {
      primary: '#CE1126',
      secondary: '#00732F',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
      cardBg: '#FFFFFF',
      inputBorder: '#D0D0D0',
      buttonHover: '#A50E1E',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #00732F 100%)',
      secondary: 'linear-gradient(135deg, #00732F 0%, #000000 100%)',
      header: 'linear-gradient(90deg, #CE1126 0%, #00732F 50%, #000000 100%)',
      card: 'linear-gradient(145deg, #F9F9F9 0%, #FFFFFF 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(206, 17, 38, 0.06)',
      md: '0 4px 12px -1px rgba(206, 17, 38, 0.12)',
      lg: '0 10px 24px -3px rgba(206, 17, 38, 0.18)',
      xl: '0 20px 40px -3px rgba(206, 17, 38, 0.22)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    paymentMethods: ['بطاقة ائتمانية', 'الدرهم الإلكتروني', 'حساب بنكي', 'محفظة رقمية'],
  },

  KW: {
    countryCode: 'KW',
    nameAr: 'كي نت',
    nameEn: 'KNET',
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية - أول نظام دفع في الخليج',
    logo: '/src/assets/knet-logo-official.png',
    heroImage: '/src/assets/gov-hero-knet.svg',
    website: 'https://www.kpay.com.kw/',
    colors: {
      primary: '#007A3D',
      secondary: '#CE1126',
      accent: '#FFB81C',
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#DDDDDD',
      cardBg: '#FFFFFF',
      inputBorder: '#B8E6C9',
      buttonHover: '#005A2D',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A3D 0%, #005A2D 100%)',
      secondary: 'linear-gradient(135deg, #CE1126 0%, #007A3D 100%)',
      header: 'linear-gradient(90deg, #007A3D 0%, #005A2D 100%)',
      card: 'linear-gradient(145deg, #F9F9F9 0%, #FFFFFF 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(0, 122, 61, 0.06)',
      md: '0 4px 12px -1px rgba(0, 122, 61, 0.12)',
      lg: '0 10px 24px -3px rgba(0, 122, 61, 0.18)',
      xl: '0 20px 40px -3px rgba(0, 122, 61, 0.22)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    paymentMethods: ['KNET', 'بطاقة ائتمانية', 'K-Pay', 'حساب بنكي'],
  },

  QA: {
    countryCode: 'QA',
    nameAr: 'كيو باي',
    nameEn: 'QatarPay',
    description: 'نظام الدفع الوطني القطري - معتمد من مصرف قطر المركزي',
    logo: '/src/assets/qpay-logo-official.png',
    heroImage: '/src/assets/gov-hero-qatar.svg',
    website: 'https://www.qcb.gov.qa/',
    colors: {
      primary: '#8D1B3D',
      secondary: '#6B1529',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
      cardBg: '#FFFFFF',
      inputBorder: '#E6C7D0',
      buttonHover: '#6B1529',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8D1B3D 0%, #6B1529 100%)',
      secondary: 'linear-gradient(135deg, #6B1529 0%, #8D1B3D 100%)',
      header: 'linear-gradient(180deg, #8D1B3D 0%, #6B1529 100%)',
      card: 'linear-gradient(145deg, #FAF8F9 0%, #FFFFFF 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(141, 27, 61, 0.06)',
      md: '0 4px 12px -1px rgba(141, 27, 61, 0.12)',
      lg: '0 10px 24px -3px rgba(141, 27, 61, 0.18)',
      xl: '0 20px 40px -3px rgba(141, 27, 61, 0.22)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    paymentMethods: ['بطاقة ائتمانية', 'حساب بنكي', 'QatarPay', 'محفظة رقمية'],
  },

  OM: {
    countryCode: 'OM',
    nameAr: 'مال',
    nameEn: 'OmanNet',
    description: 'شبكة الدفع الوطنية العمانية - معتمدة من البنك المركزي العماني',
    logo: '/src/assets/gov-maal-logo.jpg',
    heroImage: '/src/assets/gov-hero-maal.svg',
    website: 'https://www.bankmuscat.com/',
    colors: {
      primary: '#D0032C',
      secondary: '#009A44',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
      cardBg: '#FFFFFF',
      inputBorder: '#F2C2CD',
      buttonHover: '#A50223',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D0032C 0%, #009A44 100%)',
      secondary: 'linear-gradient(135deg, #009A44 0%, #D0032C 100%)',
      header: 'linear-gradient(180deg, #D0032C 0%, #009A44 100%)',
      card: 'linear-gradient(145deg, #F9F9F9 0%, #FFFFFF 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(208, 3, 44, 0.06)',
      md: '0 4px 12px -1px rgba(208, 3, 44, 0.12)',
      lg: '0 10px 24px -3px rgba(208, 3, 44, 0.18)',
      xl: '0 20px 40px -3px rgba(208, 3, 44, 0.22)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    paymentMethods: ['بطاقة مال', 'بطاقة ائتمانية', 'حساب بنكي', 'OmanNet'],
  },

  BH: {
    countryCode: 'BH',
    nameAr: 'بنفت',
    nameEn: 'BenefitPay',
    description: 'الشبكة الإلكترونية للمعاملات المالية - معتمدة من مصرف البحرين المركزي',
    logo: '/src/assets/benefit-logo-official.png',
    heroImage: '/src/assets/gov-hero-benefit.svg',
    website: 'https://www.benefit.bh/',
    colors: {
      primary: '#E50045',
      secondary: '#D32027',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
      cardBg: '#FFFFFF',
      inputBorder: '#F7B3C7',
      buttonHover: '#C0003A',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E50045 0%, #D32027 100%)',
      secondary: 'linear-gradient(135deg, #D32027 0%, #E50045 100%)',
      header: 'linear-gradient(180deg, #E50045 0%, #D32027 100%)',
      card: 'linear-gradient(145deg, #FCF7F8 0%, #FFFFFF 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(229, 0, 69, 0.08)',
      md: '0 4px 12px -1px rgba(229, 0, 69, 0.15)',
      lg: '0 10px 24px -3px rgba(229, 0, 69, 0.2)',
      xl: '0 20px 40px -3px rgba(229, 0, 69, 0.25)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    paymentMethods: ['BENEFIT', 'بطاقة ائتمانية', 'BenefitPay', 'حساب بنكي'],
  },
};

export const getGovernmentPaymentSystem = (countryCode: string): GovernmentPaymentSystem => {
  const code = countryCode.toUpperCase();
  return governmentPaymentSystems[code] || governmentPaymentSystems.SA;
};

export const getAllGovernmentPaymentSystems = (): GovernmentPaymentSystem[] => {
  return Object.values(governmentPaymentSystems);
};

export const getPaymentMethodsByCountry = (countryCode: string): string[] => {
  const system = getGovernmentPaymentSystem(countryCode);
  return system.paymentMethods || [];
};

export const getSupportedCountries = (): Array<{ code: string; nameAr: string; nameEn: string }> => {
  return Object.values(governmentPaymentSystems).map(system => ({
    code: system.countryCode,
    nameAr: system.nameAr,
    nameEn: system.nameEn,
  }));
};
