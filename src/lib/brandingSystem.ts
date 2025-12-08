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
    logoUrl: '/src/assets/logo-aramex.svg',
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
    logoUrl: '/src/assets/logo-dhl.png',
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
    logoUrl: '/src/assets/logo-fedex.jpg',
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
    logoUrl: '/src/assets/logo-ups.png',
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
    logoUrl: '/src/assets/logo-smsa.png',
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
    logoUrl: '/src/assets/logo-naqel.png',
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
    logoUrl: '/src/assets/logo-zajil.png',
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
    logoUrl: '/src/assets/logo-saudipost.svg',
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
    logoUrl: '/src/assets/logo-empost.png',
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
    logoUrl: '/src/assets/logo-qpost.png',
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
    logoUrl: '/src/assets/logo-kwpost.png',
    websiteUrl: 'https://www.kuwaitpost.com',
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
    logoUrl: '/src/assets/logo-omanpost.png',
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
    logoUrl: '/src/assets/logo-bahpost.png',
    websiteUrl: 'https://www.bahrainpost.gov.bh',
    description: 'المشغل الوطني للبريد في مملكة البحرين',
  },

  dsv: {
    id: 'dsv',
    nameEn: 'DSV',
    nameAr: 'دي إس في',
    colors: {
      primary: '#005AA0',
      secondary: '#E60000',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E0EA',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #005AA0 0%, #003D6E 100%)',
      secondary: 'linear-gradient(135deg, #E60000 0%, #B30000 100%)',
      hero: 'linear-gradient(to right, #005AA0 0%, #E60000 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 90, 160, 0.08)',
      md: '0 4px 6px -1px rgba(0, 90, 160, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 90, 160, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-dsv.svg',
    websiteUrl: 'https://www.dsv.com',
    description: 'حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري',
  },

  hellmann: {
    id: 'hellmann',
    nameEn: 'Hellmann Worldwide Logistics',
    nameAr: 'هايلمان العالمية',
    colors: {
      primary: '#E30613',
      secondary: '#003D6E',
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
      primary: 'linear-gradient(135deg, #E30613 0%, #B30510 100%)',
      secondary: 'linear-gradient(135deg, #003D6E 0%, #002A4D 100%)',
      hero: 'linear-gradient(to right, #E30613 0%, #003D6E 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(227, 6, 19, 0.08)',
      md: '0 4px 6px -1px rgba(227, 6, 19, 0.15)',
      lg: '0 10px 15px -3px rgba(227, 6, 19, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-hellmann.png',
    websiteUrl: 'https://www.hellmann.com',
    description: 'شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي',
  },

  albaraka: {
    id: 'albaraka',
    nameEn: 'Al Baraka Banking Group',
    nameAr: 'مجموعة البركة',
    colors: {
      primary: '#006341',
      secondary: '#D4AF37',
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
      primary: 'linear-gradient(135deg, #006341 0%, #004D32 100%)',
      secondary: 'linear-gradient(135deg, #D4AF37 0%, #B8942F 100%)',
      hero: 'linear-gradient(to right, #006341 0%, #D4AF37 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 99, 65, 0.08)',
      md: '0 4px 6px -1px rgba(0, 99, 65, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 99, 65, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-albaraka.svg',
    websiteUrl: 'https://www.albaraka.com',
    description: 'خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج',
  },

  alfuttaim: {
    id: 'alfuttaim',
    nameEn: 'Al-Futtaim Group',
    nameAr: 'مجموعة الفطيم',
    colors: {
      primary: '#00509E',
      secondary: '#00A3E0',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F9FB',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E5F0',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00509E 0%, #003D7A 100%)',
      secondary: 'linear-gradient(135deg, #00A3E0 0%, #0082B3 100%)',
      hero: 'linear-gradient(to right, #00509E 0%, #00A3E0 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 80, 158, 0.08)',
      md: '0 4px 6px -1px rgba(0, 80, 158, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 80, 158, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-alfuttaim.png',
    websiteUrl: 'https://www.alfuttaim.com',
    description: 'حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة',
  },

  alshaya: {
    id: 'alshaya',
    nameEn: 'M.H. Alshaya Co.',
    nameAr: 'مجموعة الشايع',
    colors: {
      primary: '#1C1C1C',
      secondary: '#C8A970',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1C1C1C 0%, #0A0A0A 100%)',
      secondary: 'linear-gradient(135deg, #C8A970 0%, #A68D5C 100%)',
      hero: 'linear-gradient(to right, #1C1C1C 0%, #C8A970 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(28, 28, 28, 0.08)',
      md: '0 4px 6px -1px rgba(28, 28, 28, 0.15)',
      lg: '0 10px 15px -3px rgba(28, 28, 28, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-alshaya.png',
    websiteUrl: 'https://www.alshaya.com',
    description: 'مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة',
  },

  shipco: {
    id: 'shipco',
    nameEn: 'Shipco Transport',
    nameAr: 'شركة الشحن العالمية',
    colors: {
      primary: '#003D7A',
      secondary: '#0082C8',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FB',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E0EA',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003D7A 0%, #002A55 100%)',
      secondary: 'linear-gradient(135deg, #0082C8 0%, #00669F 100%)',
      hero: 'linear-gradient(to right, #003D7A 0%, #0082C8 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 61, 122, 0.08)',
      md: '0 4px 6px -1px rgba(0, 61, 122, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 61, 122, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-shipco.png',
    websiteUrl: 'https://www.shipco.com',
    description: 'مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين',
  },

  agility: {
    id: 'agility',
    nameEn: 'Agility Logistics',
    nameAr: 'مجموعة أجيليتي',
    colors: {
      primary: '#E30613',
      secondary: '#1C1C1C',
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
      primary: 'linear-gradient(135deg, #E30613 0%, #B30510 100%)',
      secondary: 'linear-gradient(135deg, #1C1C1C 0%, #0A0A0A 100%)',
      hero: 'linear-gradient(to right, #E30613 0%, #1C1C1C 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(227, 6, 19, 0.08)',
      md: '0 4px 6px -1px rgba(227, 6, 19, 0.15)',
      lg: '0 10px 15px -3px rgba(227, 6, 19, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-agility.png',
    websiteUrl: 'https://www.agility.com',
    description: 'خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق في المنطقة والعالم',
  },

  bahri: {
    id: 'bahri',
    nameEn: 'The National Shipping Company of Saudi Arabia (Bahri)',
    nameAr: 'الشركة الوطنية السعودية للنقل البحري - البحري',
    colors: {
      primary: '#1F4788',
      secondary: '#8B9EBA',
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
      primary: 'linear-gradient(135deg, #1F4788 0%, #16336B 100%)',
      secondary: 'linear-gradient(135deg, #8B9EBA 0%, #6E829E 100%)',
      hero: 'linear-gradient(to right, #1F4788 0%, #8B9EBA 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(31, 71, 136, 0.08)',
      md: '0 4px 6px -1px rgba(31, 71, 136, 0.15)',
      lg: '0 10px 15px -3px rgba(31, 71, 136, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-bahri.png',
    websiteUrl: 'https://www.bahri.sa',
    description: 'الشركة الوطنية السعودية للنقل البحري، رائدة في مجال الشحن البحري والخدمات اللوجستية',
  },

  jinaken: {
    id: 'jinaken',
    nameEn: 'Genacom',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#FF6B00',
      secondary: '#003D7A',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF7F0',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE0C8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FF6B00 0%, #CC5500 100%)',
      secondary: 'linear-gradient(135deg, #003D7A 0%, #002A55 100%)',
      hero: 'linear-gradient(to right, #FF6B00 0%, #003D7A 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 107, 0, 0.08)',
      md: '0 4px 6px -1px rgba(255, 107, 0, 0.15)',
      lg: '0 10px 15px -3px rgba(255, 107, 0, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/src/assets/logo-genacom.png',
    websiteUrl: 'https://www.genacom.om',
    description: 'شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع',
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
    logoUrl: '/src/assets/gov-sadad-official.png',
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
    logoUrl: '/src/assets/logo-knet.svg',
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
    logoUrl: '/src/assets/logo-benefit.png',
    websiteUrl: 'https://www.benefit.bh',
    description: 'الشبكة الإلكترونية للمعاملات المالية',
  },

  jaywan: {
    id: 'jaywan',
    nameEn: 'Jaywan',
    nameAr: 'جيوان',
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
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #00732F 100%)',
      secondary: 'linear-gradient(180deg, #00732F 0%, #000000 100%)',
      hero: 'linear-gradient(to right, #CE1126 0%, #00732F 100%)',
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
    logoUrl: '/src/assets/gov-uae-logo.jpg',
    websiteUrl: 'https://aep.ae/',
    description: 'نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني',
  },

  maal: {
    id: 'maal',
    nameEn: 'Maal',
    nameAr: 'مال',
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
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D0032C 0%, #009A44 100%)',
      secondary: 'linear-gradient(180deg, #009A44 0%, #D0032C 100%)',
      hero: 'linear-gradient(to right, #D0032C 0%, #009A44 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(208, 3, 44, 0.08)',
      md: '0 4px 6px -1px rgba(208, 3, 44, 0.15)',
      lg: '0 10px 15px -3px rgba(208, 3, 44, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    logoUrl: '/src/assets/gov-maal-logo.jpg',
    websiteUrl: 'https://www.bankmuscat.com/',
    description: 'البطاقة الوطنية للدفع الإلكتروني',
  },

  qatar: {
    id: 'qatar',
    nameEn: 'Qatar Government Payment',
    nameAr: 'بوابة الدفع الحكومي',
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
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8D1B3D 0%, #6B1529 100%)',
      secondary: 'linear-gradient(180deg, #6B1529 0%, #8D1B3D 100%)',
      hero: 'linear-gradient(to right, #8D1B3D 0%, #6B1529 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(141, 27, 61, 0.08)',
      md: '0 4px 6px -1px rgba(141, 27, 61, 0.15)',
      lg: '0 10px 15px -3px rgba(141, 27, 61, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    logoUrl: '/src/assets/gov-qatar-logo.png',
    websiteUrl: 'https://portal.www.gov.qa/',
    description: 'نظام الدفع الإلكتروني للخدمات الحكومية',
  },
};

export const getBrandingByCompany = (companyKey: string): CompanyBranding | null => {
  const key = companyKey.toLowerCase();
  return shippingCompanyBranding[key] || governmentPaymentBranding[key] || null;
};

export const getAllShippingBranding = () => Object.values(shippingCompanyBranding);
export const getAllGovernmentBranding = () => Object.values(governmentPaymentBranding);
