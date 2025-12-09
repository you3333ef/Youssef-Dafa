export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textOnPrimary: string;
  border: string;
}

export interface BrandFonts {
  primary: string;
  secondary: string;
  arabic: string;
}

export interface BrandGradients {
  primary: string;
  secondary: string;
  hero: string;
}

export interface BrandShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface CompanyBranding {
  id: string;
  nameEn: string;
  nameAr: string;
  colors: BrandColors;
  fonts: BrandFonts;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  logoUrl?: string;
  websiteUrl?: string;
  description: string;
}

export const shippingCompanyBranding: Record<string, CompanyBranding> = {
  aramex: {
    id: 'aramex',
    nameEn: 'Aramex',
    nameAr: 'أرامكس',
    colors: {
      primary: '#DC291E',
      secondary: '#FFFFFF',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #DC291E 0%, #A32117 100%)',
      secondary: 'linear-gradient(180deg, #DC291E 0%, #8B1A12 100%)',
      hero: 'linear-gradient(to right, #DC291E 0%, #A32117 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(220, 41, 30, 0.08)',
      md: '0 4px 6px -1px rgba(220, 41, 30, 0.15)',
      lg: '0 10px 15px -3px rgba(220, 41, 30, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: 'https://logo.clearbit.com/aramex.com',
    websiteUrl: 'https://www.aramex.com',
    description: 'شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع',
  },

  dhl: {
    id: 'dhl',
    nameEn: 'DHL',
    nameAr: 'دي إتش إل',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#000000',
      border: '#FFE680',
    },
    fonts: {
      primary: 'Delivery, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)',
      hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي',
  },

  fedex: {
    id: 'fedex',
    nameEn: 'FedEx',
    nameAr: 'فيديكس',
    colors: {
      primary: '#4D148C',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F0FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0D4ED',
    },
    fonts: {
      primary: 'FedEx Sans, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #4D148C 0%, #6B1DAF 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
      hero: 'linear-gradient(to right, #4D148C 0%, #FF6600 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(77, 20, 140, 0.08)',
      md: '0 4px 6px -1px rgba(77, 20, 140, 0.15)',
      lg: '0 10px 15px -3px rgba(77, 20, 140, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.fedex.com',
    description: 'خدمات شحن دولية موثوقة مع تتبع فوري للشحنات',
  },

  ups: {
    id: 'ups',
    nameEn: 'UPS',
    nameAr: 'يو بي إس',
    colors: {
      primary: '#351C15',
      secondary: '#FFB500',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FAF8F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E0DC',
    },
    fonts: {
      primary: 'UPS Sans, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #351C15 0%, #1F0F0A 100%)',
      secondary: 'linear-gradient(135deg, #FFB500 0%, #FFC933 100%)',
      hero: 'linear-gradient(to right, #351C15 0%, #FFB500 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(53, 28, 21, 0.08)',
      md: '0 4px 6px -1px rgba(53, 28, 21, 0.15)',
      lg: '0 10px 15px -3px rgba(53, 28, 21, 0.20)',
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
    websiteUrl: 'https://www.ups.com',
    description: 'حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم',
  },

  smsa: {
    id: 'smsa',
    nameEn: 'SMSA Express',
    nameAr: 'سمسا إكسبرس',
    colors: {
      primary: '#662D91',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F7F3FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E4D9ED',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #662D91 0%, #8B3CC2 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
      hero: 'linear-gradient(to right, #662D91 0%, #FF6600 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(102, 45, 145, 0.08)',
      md: '0 4px 6px -1px rgba(102, 45, 145, 0.15)',
      lg: '0 10px 15px -3px rgba(102, 45, 145, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.smsaexpress.com',
    description: 'أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية',
  },

  naqel: {
    id: 'naqel',
    nameEn: 'NAQEL Express',
    nameAr: 'ناقل إكسبرس',
    colors: {
      primary: '#E61838',
      secondary: '#002E60',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E61838 0%, #B31329 100%)',
      secondary: 'linear-gradient(135deg, #002E60 0%, #001D3D 100%)',
      hero: 'linear-gradient(to right, #E61838 0%, #002E60 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(230, 24, 56, 0.08)',
      md: '0 4px 6px -1px rgba(230, 24, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(230, 24, 56, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.naqelexpress.com',
    description: 'حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة',
  },

  zajil: {
    id: 'zajil',
    nameEn: 'Zajil Express',
    nameAr: 'زاجل إكسبرس',
    colors: {
      primary: '#1C4587',
      secondary: '#FF9900',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F7FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1DCEA',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1C4587 0%, #2D5AA0 100%)',
      secondary: 'linear-gradient(135deg, #FF9900 0%, #FFB333 100%)',
      hero: 'linear-gradient(to right, #1C4587 0%, #FF9900 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(28, 69, 135, 0.08)',
      md: '0 4px 6px -1px rgba(28, 69, 135, 0.15)',
      lg: '0 10px 15px -3px rgba(28, 69, 135, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://zajil-express.com',
    description: 'شركة سعودية رائدة في خدمات البريد السريع والشحن',
  },

  saudipost: {
    id: 'saudipost',
    nameEn: 'Saudi Post',
    nameAr: 'البريد السعودي',
    colors: {
      primary: '#006C35',
      secondary: '#FFB81C',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #006C35 0%, #008D45 100%)',
      secondary: 'linear-gradient(135deg, #FFB81C 0%, #FFC74D 100%)',
      hero: 'linear-gradient(to right, #006C35 0%, #FFB81C 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 108, 53, 0.08)',
      md: '0 4px 6px -1px rgba(0, 108, 53, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 108, 53, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://splonline.com.sa',
    description: 'المشغل الوطني للبريد في المملكة العربية السعودية',
  },

  empost: {
    id: 'empost',
    nameEn: 'Emirates Post',
    nameAr: 'البريد الإماراتي',
    colors: {
      primary: '#C8102E',
      secondary: '#003087',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #C8102E 0%, #9B0D24 100%)',
      secondary: 'linear-gradient(135deg, #003087 0%, #00235F 100%)',
      hero: 'linear-gradient(to right, #C8102E 0%, #003087 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(200, 16, 46, 0.08)',
      md: '0 4px 6px -1px rgba(200, 16, 46, 0.15)',
      lg: '0 10px 15px -3px rgba(200, 16, 46, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.emiratespost.ae',
    description: 'المشغل الوطني للبريد في دولة الإمارات العربية المتحدة',
  },

  qpost: {
    id: 'qpost',
    nameEn: 'Qatar Post',
    nameAr: 'البريد القطري',
    colors: {
      primary: '#8E1838',
      secondary: '#F9D416',
      accent: '#00A4E4',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E8D1D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8E1838 0%, #6B122A 100%)',
      secondary: 'linear-gradient(135deg, #F9D416 0%, #FCDF4A 100%)',
      hero: 'linear-gradient(to right, #8E1838 0%, #F9D416 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(142, 24, 56, 0.08)',
      md: '0 4px 6px -1px rgba(142, 24, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(142, 24, 56, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.qpost.qa',
    description: 'المشغل الوطني للبريد في دولة قطر',
  },

  kwpost: {
    id: 'kwpost',
    nameEn: 'Kuwait Post',
    nameAr: 'البريد الكويتي',
    colors: {
      primary: '#007A33',
      secondary: '#CE1126',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A33 0%, #009B42 100%)',
      secondary: 'linear-gradient(135deg, #CE1126 0%, #A00E1E 100%)',
      hero: 'linear-gradient(to right, #007A33 0%, #CE1126 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 51, 0.08)',
      md: '0 4px 6px -1px rgba(0, 122, 51, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 122, 51, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'المشغل الوطني للبريد في دولة الكويت',
  },

  omanpost: {
    id: 'omanpost',
    nameEn: 'Oman Post',
    nameAr: 'البريد العُماني',
    colors: {
      primary: '#ED1C24',
      secondary: '#009639',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ED1C24 0%, #C0161D 100%)',
      secondary: 'linear-gradient(135deg, #009639 0%, #00B946 100%)',
      hero: 'linear-gradient(to right, #ED1C24 0%, #009639 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(237, 28, 36, 0.08)',
      md: '0 4px 6px -1px rgba(237, 28, 36, 0.15)',
      lg: '0 10px 15px -3px rgba(237, 28, 36, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.omanpost.om',
    description: 'المشغل الوطني للبريد في سلطنة عُمان',
  },

  bahpost: {
    id: 'bahpost',
    nameEn: 'Bahrain Post',
    nameAr: 'البريد البحريني',
    colors: {
      primary: '#EF3F32',
      secondary: '#007CC2',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF6F5',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD8D4',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #EF3F32 0%, #C43228 100%)',
      secondary: 'linear-gradient(135deg, #007CC2 0%, #00629B 100%)',
      hero: 'linear-gradient(to right, #EF3F32 0%, #007CC2 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(239, 63, 50, 0.08)',
      md: '0 4px 6px -1px rgba(239, 63, 50, 0.15)',
      lg: '0 10px 15px -3px rgba(239, 63, 50, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.bahrainpost.gov.bh',
    description: 'المشغل الوطني للبريد في مملكة البحرين',
  },

  albaraka: {
    id: 'albaraka',
    nameEn: 'Al Baraka',
    nameAr: 'مجموعة البركة',
    colors: {
      primary: '#D89A00',
      secondary: '#003366',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF9F0',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE9B8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D89A00 0%, #B38200 100%)',
      secondary: 'linear-gradient(135deg, #003366 0%, #002244 100%)',
      hero: 'linear-gradient(to right, #D89A00 0%, #003366 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(216, 154, 0, 0.08)',
      md: '0 4px 6px -1px rgba(216, 154, 0, 0.15)',
      lg: '0 10px 15px -3px rgba(216, 154, 0, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.albaraka.com.tr',
    description: 'خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة',
  },

  alfuttaim: {
    id: 'alfuttaim',
    nameEn: 'Al Futtaim',
    nameAr: 'مجموعة الفطيم',
    colors: {
      primary: '#00559B',
      secondary: '#00A9E0',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E7F5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00559B 0%, #00447C 100%)',
      secondary: 'linear-gradient(135deg, #00A9E0 0%, #0088B8 100%)',
      hero: 'linear-gradient(to right, #00559B 0%, #00A9E0 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 85, 155, 0.08)',
      md: '0 4px 6px -1px rgba(0, 85, 155, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 85, 155, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.alfuttaim.com',
    description: 'حلول لوجستية متكاملة تابعة لمجموعة فطيم',
  },

  alshaya: {
    id: 'alshaya',
    nameEn: 'Al Shaya',
    nameAr: 'مجموعة الشايع',
    colors: {
      primary: '#D71920',
      secondary: '#000000',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD1D3',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D71920 0%, #AD141A 100%)',
      secondary: 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)',
      hero: 'linear-gradient(to right, #D71920 0%, #000000 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(215, 25, 32, 0.08)',
      md: '0 4px 6px -1px rgba(215, 25, 32, 0.15)',
      lg: '0 10px 15px -3px rgba(215, 25, 32, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.alshaya.com',
    description: 'مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة',
  },

  national: {
    id: 'national',
    nameEn: 'National Shipping',
    nameAr: 'الشركة الوطنية للشحن',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1DCE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #002244 100%)',
      secondary: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
      hero: 'linear-gradient(to right, #003366 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 51, 102, 0.08)',
      md: '0 4px 6px -1px rgba(0, 51, 102, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 51, 102, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.bahri.sa',
    description: 'خدمات شحن وبحرية ولوجستيات شاملة',
  },

  bahri: {
    id: 'bahri',
    nameEn: 'Bahri',
    nameAr: 'شركة البحري',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1DCE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #002244 100%)',
      secondary: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
      hero: 'linear-gradient(to right, #003366 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 51, 102, 0.08)',
      md: '0 4px 6px -1px rgba(0, 51, 102, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 51, 102, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.bahri.sa',
    description: 'شركة البحري للنقل البحري والخدمات اللوجستية',
  },

  shipco: {
    id: 'shipco',
    nameEn: 'ShipCo',
    nameAr: 'شركة الشحن العالمية',
    colors: {
      primary: '#0A5FB4',
      secondary: '#3B99FC',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FD',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E5F5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0A5FB4 0%, #084B8F 100%)',
      secondary: 'linear-gradient(135deg, #3B99FC 0%, #2E7AD1 100%)',
      hero: 'linear-gradient(to right, #0A5FB4 0%, #3B99FC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(10, 95, 180, 0.08)',
      md: '0 4px 6px -1px rgba(10, 95, 180, 0.15)',
      lg: '0 10px 15px -3px rgba(10, 95, 180, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.shipco.com',
    description: 'مزود خدمات شحن دولي ومحلي متخصص',
  },

  hellmann: {
    id: 'hellmann',
    nameEn: 'Hellmann',
    nameAr: 'هايلمان العالمية',
    colors: {
      primary: '#0C4DA2',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1DFF5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0C4DA2 0%, #093D82 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #CC5200 100%)',
      hero: 'linear-gradient(to right, #0C4DA2 0%, #FF6600 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(12, 77, 162, 0.08)',
      md: '0 4px 6px -1px rgba(12, 77, 162, 0.15)',
      lg: '0 10px 15px -3px rgba(12, 77, 162, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.hellmann.com',
    description: 'شبكة دولية لخدمات الشحن واللوجستيات',
  },

  dsv: {
    id: 'dsv',
    nameEn: 'DSV',
    nameAr: 'دي إس في',
    colors: {
      primary: '#0056A6',
      secondary: '#00A9E0',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E7F5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0056A6 0%, #004485 100%)',
      secondary: 'linear-gradient(135deg, #00A9E0 0%, #0088B8 100%)',
      hero: 'linear-gradient(to right, #0056A6 0%, #00A9E0 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 86, 166, 0.08)',
      md: '0 4px 6px -1px rgba(0, 86, 166, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 86, 166, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dsv.com',
    description: 'حلول شحن ولوجستيات متطورة',
  },

  agility: {
    id: 'agility',
    nameEn: 'Agility',
    nameAr: 'مجموعة الجاهلية',
    colors: {
      primary: '#003A63',
      secondary: '#F39200',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1DCE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003A63 0%, #002D4F 100%)',
      secondary: 'linear-gradient(135deg, #F39200 0%, #C47500 100%)',
      hero: 'linear-gradient(to right, #003A63 0%, #F39200 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 58, 99, 0.08)',
      md: '0 4px 6px -1px rgba(0, 58, 99, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 58, 99, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.agility.com',
    description: 'خدمات لوجستية وشحن متطورة',
  },

  genacom: {
    id: 'genacom',
    nameEn: 'Genacom',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#E82424',
      secondary: '#F7C24A',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F5',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E82424 0%, #C01D1D 100%)',
      secondary: 'linear-gradient(135deg, #F7C24A 0%, #D9A63E 100%)',
      hero: 'linear-gradient(to right, #E82424 0%, #F7C24A 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(232, 36, 36, 0.08)',
      md: '0 4px 6px -1px rgba(232, 36, 36, 0.15)',
      lg: '0 10px 15px -3px rgba(232, 36, 36, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'شركة توصيل عُمانية محلية',
  },

  jinaken: {
    id: 'jinaken',
    nameEn: 'Genacom',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#E82424',
      secondary: '#F7C24A',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F5',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E82424 0%, #C01D1D 100%)',
      secondary: 'linear-gradient(135deg, #F7C24A 0%, #D9A63E 100%)',
      hero: 'linear-gradient(to right, #E82424 0%, #F7C24A 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(232, 36, 36, 0.08)',
      md: '0 4px 6px -1px rgba(232, 36, 36, 0.15)',
      lg: '0 10px 15px -3px rgba(232, 36, 36, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'شركة توصيل عُمانية محلية',
  },

  jinakum: {
    id: 'jinakum',
    nameEn: 'Jinakum',
    nameAr: 'جيناكم',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F0F9FF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#BFDBFE',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
      secondary: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      hero: 'linear-gradient(to right, #0EA5E9 0%, #06B6D4 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(14, 165, 233, 0.08)',
      md: '0 4px 6px -1px rgba(14, 165, 233, 0.15)',
      lg: '0 10px 15px -3px rgba(14, 165, 233, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'خدمات دفع وتحويل آمنة وموثوقة',
  },

  dhlkw: {
    id: 'dhlkw',
    nameEn: 'DHL Kuwait',
    nameAr: 'دي إتش إل الكويت',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#000000',
      border: '#FFE680',
    },
    fonts: {
      primary: 'Delivery, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)',
      hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع',
  },

  dhlqa: {
    id: 'dhlqa',
    nameEn: 'DHL Qatar',
    nameAr: 'دي إتش إل قطر',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#000000',
      border: '#FFE680',
    },
    fonts: {
      primary: 'Delivery, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)',
      hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع',
  },

  dhlom: {
    id: 'dhlom',
    nameEn: 'DHL Oman',
    nameAr: 'دي إتش إل عمان',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#000000',
      border: '#FFE680',
    },
    fonts: {
      primary: 'Delivery, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)',
      hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع',
  },

  dhlbh: {
    id: 'dhlbh',
    nameEn: 'DHL Bahrain',
    nameAr: 'دي إتش إل البحرين',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#000000',
      border: '#FFE680',
    },
    fonts: {
      primary: 'Delivery, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)',
      hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع',
  },
};

export const governmentPaymentBranding: Record<string, CompanyBranding> = {
  sadad: {
    id: 'sadad',
    nameEn: 'SADAD',
    nameAr: 'سداد',
    colors: {
      primary: '#F58220',
      secondary: '#E67317',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF8F2',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE5D0',
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #F58220 0%, #E67317 100%)',
      secondary: 'linear-gradient(180deg, #F58220 0%, #E67317 100%)',
      hero: 'linear-gradient(to right, #F58220 0%, #E67317 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(245, 130, 32, 0.08)',
      md: '0 4px 6px -1px rgba(245, 130, 32, 0.15)',
      lg: '0 10px 15px -3px rgba(245, 130, 32, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.sadad.com',
    description: 'نظام المدفوعات الوطني للخدمات الحكومية والفواتير',
  },

  knet: {
    id: 'knet',
    nameEn: 'KNET',
    nameAr: 'كي نت',
    colors: {
      primary: '#007A3D',
      secondary: '#CE1126',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#DDDDDD',
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A3D 0%, #CE1126 100%)',
      secondary: 'linear-gradient(180deg, #007A3D 0%, #000000 100%)',
      hero: 'linear-gradient(to right, #007A3D 0%, #CE1126 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 61, 0.08)',
      md: '0 4px 6px -1px rgba(0, 122, 61, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 122, 61, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.kpay.com.kw',
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
  },

  benefit: {
    id: 'benefit',
    nameEn: 'BENEFIT',
    nameAr: 'بنفت',
    colors: {
      primary: '#CE1126',
      secondary: '#D32027',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #D32027 100%)',
      secondary: 'linear-gradient(180deg, #CE1126 0%, #A00E1E 100%)',
      hero: 'linear-gradient(to right, #CE1126 0%, #D32027 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(206, 17, 38, 0.08)',
      md: '0 4px 6px -1px rgba(206, 17, 38, 0.15)',
      lg: '0 10px 15px -3px rgba(206, 17, 38, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.benefit.bh',
    description: 'الشبكة الإلكترونية للمعاملات المالية',
  },
};

export const getBrandingByCompany = (companyKey: string): CompanyBranding | null => {
  const key = companyKey.toLowerCase();
  return shippingCompanyBranding[key] || governmentPaymentBranding[key] || null;
};

export const getAllShippingBranding = () => Object.values(shippingCompanyBranding);
export const getAllGovernmentBranding = () => Object.values(governmentPaymentBranding);
