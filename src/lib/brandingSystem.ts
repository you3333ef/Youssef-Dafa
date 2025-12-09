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
      secondary: '#231F20',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Aramex, Inter, system-ui, sans-serif',
      secondary: 'Arial, Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #DC291E 0%, #B71F19 100%)',
      secondary: 'linear-gradient(180deg, #DC291E 0%, #9B1915 100%)',
      hero: 'linear-gradient(to right, #DC291E 0%, #B71F19 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(220, 41, 30, 0.1)',
      md: '0 4px 6px -1px rgba(220, 41, 30, 0.12)',
      lg: '0 10px 20px -5px rgba(220, 41, 30, 0.18)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/logos/aramex-logo-full.png',
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
    logoUrl: '/logos/dhl-logo-full.png',
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
    logoUrl: '/logos/fedex-logo.png',
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
      surface: '#FAF7F5',
      text: '#1A1A1A',
      textLight: '#6B5E57',
      textOnPrimary: '#FFFFFF',
      border: '#E5DDD5',
    },
    fonts: {
      primary: 'UPS Berlingske, Arial, sans-serif',
      secondary: 'Arial, Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #351C15 0%, #2A1510 100%)',
      secondary: 'linear-gradient(135deg, #FFB500 0%, #FFD166 100%)',
      hero: 'linear-gradient(to right, #FFB500 0%, #351C15 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(53, 28, 21, 0.1)',
      md: '0 4px 8px -2px rgba(53, 28, 21, 0.2)',
      lg: '0 12px 24px -4px rgba(53, 28, 21, 0.25)',
    },
    borderRadius: {
      sm: '0px',
      md: '2px',
      lg: '4px',
    },
    logoUrl: '/logos/ups-logo.png',
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
    logoUrl: '/logos/smsa-logo.svg',
    websiteUrl: 'https://www.smsaexpress.com',
    description: 'أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية',
  },

  naqel: {
    id: 'naqel',
    nameEn: 'NAQEL Express',
    nameAr: 'ناقل إكسبرس',
    colors: {
      primary: '#E61838',
      secondary: '#002058',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#06205C',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Almarai, Helvetica Neue, sans-serif',
      secondary: 'Helvetica Neue, sans-serif',
      arabic: 'Almarai, Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E61838 0%, #C74C24 100%)',
      secondary: 'linear-gradient(135deg, #002058 0%, #06205C 100%)',
      hero: 'linear-gradient(90deg, #E61838 0%, #002058 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(230, 24, 56, 0.1)',
      md: '0 4px 6px -1px rgba(230, 24, 56, 0.15)',
      lg: '0 10px 25px -5px rgba(230, 24, 56, 0.25)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.naqelexpress.com',
    description: 'حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة',
  },

  zajil: {
    id: 'zajil',
    nameEn: 'Zajil Express',
    nameAr: 'زاجل إكسبرس',
    colors: {
      primary: '#FBB034',
      secondary: '#1C4587',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFFBF5',
      text: '#1E293B',
      textLight: '#64748B',
      textOnPrimary: '#000000',
      border: '#FFE5B4',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FBB034 0%, #F9A825 100%)',
      secondary: 'linear-gradient(135deg, #1C4587 0%, #153868 100%)',
      hero: 'linear-gradient(90deg, #FBB034 0%, #1C4587 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(251, 176, 52, 0.1)',
      md: '0 4px 8px -2px rgba(251, 176, 52, 0.15)',
      lg: '0 12px 20px -5px rgba(251, 176, 52, 0.2)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    logoUrl: '/logos/zajil-logo-new.png',
    websiteUrl: 'https://zajil-express.com',
    description: 'شركة سعودية رائدة في خدمات البريد السريع والشحن',
  },

  saudipost: {
    id: 'saudipost',
    nameEn: 'Saudi Post - SPL',
    nameAr: 'البريد السعودي',
    colors: {
      primary: '#00B8D4',
      secondary: '#003F5C',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5FCFD',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'SPL, Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00B8D4 0%, #0095AC 100%)',
      secondary: 'linear-gradient(135deg, #003F5C 0%, #002838 100%)',
      hero: 'linear-gradient(90deg, #00B8D4 0%, #003F5C 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 184, 212, 0.1)',
      md: '0 4px 8px -2px rgba(0, 184, 212, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 184, 212, 0.2)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    logoUrl: '/logos/saudipost-logo.webp',
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
      surface: '#FFF9FA',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Emirates, Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'GE SS Two, Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #C8102E 0%, #A00D26 100%)',
      secondary: 'linear-gradient(135deg, #003087 0%, #002566 100%)',
      hero: 'linear-gradient(90deg, #C8102E 0%, #003087 45%, #D4AF37 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(200, 16, 46, 0.1)',
      md: '0 4px 8px -2px rgba(200, 16, 46, 0.15)',
      lg: '0 12px 24px -5px rgba(200, 16, 46, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/logos/emiratespost-logo.png',
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
    logoUrl: '/logos/omanpost-logo.png',
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

  bahri: {
    id: 'bahri',
    nameEn: 'Bahri',
    nameAr: 'البحري',
    colors: {
      primary: '#003F6C',
      secondary: '#8B9299',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F7F9',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003F6C 0%, #002847 100%)',
      secondary: 'linear-gradient(135deg, #8B9299 0%, #6B7280 100%)',
      hero: 'linear-gradient(90deg, #003F6C 0%, #8B9299 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 63, 108, 0.1)',
      md: '0 4px 8px -2px rgba(0, 63, 108, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 63, 108, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/logos/bahri-logo.jpg',
    websiteUrl: 'https://www.bahri.sa',
    description: 'الشركة الوطنية للنقل البحري السعودية - حلول لوجستية وبحرية عالمية',
  },

  dsv: {
    id: 'dsv',
    nameEn: 'DSV',
    nameAr: 'دي إس في',
    colors: {
      primary: '#192862',
      secondary: '#0066CC',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F7FA',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'DSV Sans, Arial, sans-serif',
      secondary: 'Arial, Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #192862 0%, #0F1A3D 100%)',
      secondary: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
      hero: 'linear-gradient(90deg, #192862 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(25, 40, 98, 0.1)',
      md: '0 4px 8px -2px rgba(25, 40, 98, 0.15)',
      lg: '0 12px 24px -5px rgba(25, 40, 98, 0.2)',
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
    logoUrl: '/logos/dsv-logo.jpg',
    websiteUrl: 'https://www.dsv.com',
    description: 'حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري',
  },

  hellmann: {
    id: 'hellmann',
    nameEn: 'Hellmann Worldwide Logistics',
    nameAr: 'هايلمان العالمية',
    colors: {
      primary: '#E32119',
      secondary: '#004C99',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Helvetica, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E32119 0%, #B71A14 100%)',
      secondary: 'linear-gradient(135deg, #004C99 0%, #003D7A 100%)',
      hero: 'linear-gradient(90deg, #E32119 0%, #004C99 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(227, 33, 25, 0.1)',
      md: '0 4px 8px -2px rgba(227, 33, 25, 0.15)',
      lg: '0 12px 24px -5px rgba(227, 33, 25, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/logos/hellmann-logo.png',
    websiteUrl: 'https://www.hellmann.com',
    description: 'شبكة دولية لخدمات الشحن واللوجستيات منذ 1871',
  },

  agility: {
    id: 'agility',
    nameEn: 'Agility Logistics',
    nameAr: 'مجموعة الجاهلية',
    colors: {
      primary: '#E2001A',
      secondary: '#000000',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E2001A 0%, #B50015 100%)',
      secondary: 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)',
      hero: 'linear-gradient(90deg, #E2001A 0%, #000000 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(226, 0, 26, 0.1)',
      md: '0 4px 8px -2px rgba(226, 0, 26, 0.15)',
      lg: '0 12px 24px -5px rgba(226, 0, 26, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.agility.com',
    description: 'خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق',
  },

  national: {
    id: 'national',
    nameEn: 'National Shipping Company',
    nameAr: 'الشركة الوطنية للشحن',
    colors: {
      primary: '#003F6C',
      secondary: '#00599C',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003F6C 0%, #002847 100%)',
      secondary: 'linear-gradient(135deg, #00599C 0%, #00447A 100%)',
      hero: 'linear-gradient(90deg, #003F6C 0%, #00599C 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 63, 108, 0.1)',
      md: '0 4px 8px -2px rgba(0, 63, 108, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 63, 108, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.nscsa.com.sa',
    description: 'خدمات شحن وبحرية ولوجستيات شاملة في المملكة',
  },

  shipco: {
    id: 'shipco',
    nameEn: 'ShipCo',
    nameAr: 'شركة الشحن العالمية',
    colors: {
      primary: '#0066B3',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FC',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0066B3 0%, #004D85 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #CC5200 100%)',
      hero: 'linear-gradient(90deg, #0066B3 0%, #FF6600 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 102, 179, 0.1)',
      md: '0 4px 8px -2px rgba(0, 102, 179, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 102, 179, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.shipco.com',
    description: 'مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي',
  },

  albaraka: {
    id: 'albaraka',
    nameEn: 'Al Baraka Group',
    nameAr: 'مجموعة البركة',
    colors: {
      primary: '#006838',
      secondary: '#D4AF37',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #006838 0%, #004D2A 100%)',
      secondary: 'linear-gradient(135deg, #D4AF37 0%, #B8962D 100%)',
      hero: 'linear-gradient(90deg, #006838 0%, #D4AF37 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 104, 56, 0.1)',
      md: '0 4px 8px -2px rgba(0, 104, 56, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 104, 56, 0.2)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    logoUrl: '/logos/albaraka-logo.svg',
    websiteUrl: 'https://www.albaraka.com',
    description: 'خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة',
  },

  alfuttaim: {
    id: 'alfuttaim',
    nameEn: 'Al Futtaim Logistics',
    nameAr: 'مجموعة الفطيم',
    colors: {
      primary: '#003F6C',
      secondary: '#009CDE',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FC',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003F6C 0%, #002847 100%)',
      secondary: 'linear-gradient(135deg, #009CDE 0%, #007AB8 100%)',
      hero: 'linear-gradient(90deg, #003F6C 0%, #009CDE 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 63, 108, 0.1)',
      md: '0 4px 8px -2px rgba(0, 63, 108, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 63, 108, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.alfuttaim.com',
    description: 'حلول لوجستية متكاملة تشمل الشحن والتوزيع وخدمات سلسلة الإمداد',
  },

  alshaya: {
    id: 'alshaya',
    nameEn: 'Al Shaya Group',
    nameAr: 'مجموعة الشايع',
    colors: {
      primary: '#000000',
      secondary: '#E2001A',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)',
      secondary: 'linear-gradient(135deg, #E2001A 0%, #B50015 100%)',
      hero: 'linear-gradient(90deg, #000000 0%, #E2001A 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 8px -2px rgba(0, 0, 0, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 0, 0, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.alshaya.com',
    description: 'مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة',
  },

  genacom: {
    id: 'genacom',
    nameEn: 'Genacom Delivery',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#0066B3',
      secondary: '#FF9900',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FC',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primary: 'Arial, Helvetica, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0066B3 0%, #004D85 100%)',
      secondary: 'linear-gradient(135deg, #FF9900 0%, #CC7A00 100%)',
      hero: 'linear-gradient(90deg, #0066B3 0%, #FF9900 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 102, 179, 0.1)',
      md: '0 4px 8px -2px rgba(0, 102, 179, 0.15)',
      lg: '0 12px 24px -5px rgba(0, 102, 179, 0.2)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.genacom.om',
    description: 'شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن',
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

const companyAliases: Record<string, string> = {
  'dhlkw': 'dhl',
  'dhlqa': 'dhl',
  'dhlom': 'dhl',
  'dhlbh': 'dhl',
  'jinaken': 'genacom',
};

export const getBrandingByCompany = (companyKey: string): CompanyBranding | null => {
  const key = companyKey.toLowerCase();
  const actualKey = companyAliases[key] || key;
  return shippingCompanyBranding[actualKey] || governmentPaymentBranding[actualKey] || null;
};

export const getAllShippingBranding = () => Object.values(shippingCompanyBranding);
export const getAllGovernmentBranding = () => Object.values(governmentPaymentBranding);
