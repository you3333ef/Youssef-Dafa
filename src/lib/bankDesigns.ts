export interface BankDesign {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
    inputBg: string;
    buttonGradient?: string;
  };
  fonts: {
    primary: string;
    arabic: string;
  };
  loginType: 'username' | 'customerId' | 'phone';
  placeholders: {
    username?: string;
    customerId?: string;
    phone?: string;
    password: string;
  };
  features: {
    rememberMe: boolean;
    forgotPassword: boolean;
    biometric: boolean;
    qrCode: boolean;
  };
  layoutStyle: 'modern' | 'classic' | 'minimalist';
}

export const bankDesigns: Record<string, BankDesign> = {
  // ====== السعودية ======
  alrajhi_bank: {
    id: 'alrajhi_bank',
    name: 'Al Rajhi Bank',
    nameAr: 'مصرف الراجحي',
    logo: 'https://www.alrajhibank.com.sa/ar/wps/themes/html/Alrajhi-portal-theme/images/alrajhi-logo-ar.svg',
    colors: {
      primary: '#006C35',
      secondary: '#004D27',
      accent: '#FFD700',
      background: 'linear-gradient(135deg, #F0F8F5 0%, #FFFFFF 100%)',
      text: '#1A3A2E',
      textSecondary: '#5A7968',
      border: '#C8E6D5',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(90deg, #006C35 0%, #008844 100%)'
    },
    fonts: {
      primary: 'Tajawal, sans-serif',
      arabic: 'Tajawal, sans-serif'
    },
    loginType: 'username',
    placeholders: {
      username: 'اسم المستخدم',
      password: 'كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: false
    },
    layoutStyle: 'modern'
  },
  
  alahli_bank: {
    id: 'alahli_bank',
    name: 'Al Ahli Bank (SNB)',
    nameAr: 'البنك الأهلي التجاري',
    logo: 'https://www.alahli.com/en-us/PublishingImages/SNB-Logo.svg',
    colors: {
      primary: '#00843D',
      secondary: '#006330',
      accent: '#FFA500',
      background: '#F8F9FA',
      text: '#2C2C2C',
      textSecondary: '#6C757D',
      border: '#DEE2E6',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #00843D, #006330)'
    },
    fonts: {
      primary: 'Cairo, sans-serif',
      arabic: 'Cairo, sans-serif'
    },
    loginType: 'username',
    placeholders: {
      username: 'اسم المستخدم',
      password: 'كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: true
    },
    layoutStyle: 'modern'
  },
  
  riyad_bank: {
    id: 'riyad_bank',
    name: 'Riyad Bank',
    nameAr: 'بنك الرياض',
    logo: 'https://www.riyadbank.com/images/rb-logo.svg',
    colors: {
      primary: '#0066B2',
      secondary: '#004A7C',
      accent: '#00A3E0',
      background: '#F0F4F8',
      text: '#212529',
      textSecondary: '#6C757D',
      border: '#CED4DA',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #0066B2, #004A7C)'
    },
    fonts: {
      primary: 'Tajawal, sans-serif',
      arabic: 'Tajawal, sans-serif'
    },
    loginType: 'customerId',
    placeholders: {
      customerId: 'رقم العميل',
      password: 'كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: false,
      qrCode: false
    },
    layoutStyle: 'classic'
  },

  // ====== الإمارات ======
  emirates_nbd: {
    id: 'emirates_nbd',
    name: 'Emirates NBD',
    nameAr: 'بنك الإمارات دبي الوطني',
    logo: 'https://www.emiratesnbd.com/images/logo.svg',
    colors: {
      primary: '#D50032',
      secondary: '#9B0026',
      accent: '#FFD700',
      background: '#FAFAFA',
      text: '#1A1A1A',
      textSecondary: '#757575',
      border: '#E0E0E0',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #D50032, #9B0026)'
    },
    fonts: {
      primary: 'Dubai, sans-serif',
      arabic: 'Dubai, sans-serif'
    },
    loginType: 'username',
    placeholders: {
      username: 'Username / اسم المستخدم',
      password: 'Password / كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: true
    },
    layoutStyle: 'modern'
  },

  fab: {
    id: 'fab',
    name: 'First Abu Dhabi Bank',
    nameAr: 'بنك أبوظبي الأول',
    logo: 'https://www.bankfab.com/images/fab-logo.svg',
    colors: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#B8860B',
      background: '#FFFFFF',
      text: '#000000',
      textSecondary: '#666666',
      border: '#CCCCCC',
      inputBg: '#F5F5F5',
      buttonGradient: 'linear-gradient(135deg, #000000, #333333)'
    },
    fonts: {
      primary: 'Helvetica, Arial, sans-serif',
      arabic: 'Dubai, sans-serif'
    },
    loginType: 'username',
    placeholders: {
      username: 'User ID',
      password: 'Password'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: false
    },
    layoutStyle: 'minimalist'
  },

  // ====== الكويت ======
  nbk: {
    id: 'nbk',
    name: 'National Bank of Kuwait',
    nameAr: 'بنك الكويت الوطني',
    logo: 'https://www.nbk.com/images/nbk-logo.svg',
    colors: {
      primary: '#005EB8',
      secondary: '#003F7F',
      accent: '#00A3E0',
      background: '#F4F6F9',
      text: '#1E1E1E',
      textSecondary: '#5C5C5C',
      border: '#D1D5DB',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #005EB8, #003F7F)'
    },
    fonts: {
      primary: 'Cairo, sans-serif',
      arabic: 'Cairo, sans-serif'
    },
    loginType: 'customerId',
    placeholders: {
      customerId: 'رقم العميل / Customer ID',
      password: 'كلمة المرور / Password'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: false
    },
    layoutStyle: 'modern'
  },

  // ====== قطر ======
  qnb: {
    id: 'qnb',
    name: 'Qatar National Bank',
    nameAr: 'بنك قطر الوطني',
    logo: 'https://www.qnb.com/images/qnb-logo.svg',
    colors: {
      primary: '#6E1D3E',
      secondary: '#4A142A',
      accent: '#B8860B',
      background: '#F9F9F9',
      text: '#1A1A1A',
      textSecondary: '#737373',
      border: '#E5E5E5',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #6E1D3E, #4A142A)'
    },
    fonts: {
      primary: 'Tajawal, sans-serif',
      arabic: 'Tajawal, sans-serif'
    },
    loginType: 'customerId',
    placeholders: {
      customerId: 'User ID / رقم المستخدم',
      password: 'Password / كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: true
    },
    layoutStyle: 'modern'
  },

  // ====== عمان ======
  bank_muscat: {
    id: 'bank_muscat',
    name: 'Bank Muscat',
    nameAr: 'بنك مسقط',
    logo: 'https://www.bankmuscat.com/images/logo.svg',
    colors: {
      primary: '#004B87',
      secondary: '#003666',
      accent: '#00A3E0',
      background: '#F5F8FA',
      text: '#212529',
      textSecondary: '#6C757D',
      border: '#DEE2E6',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #004B87, #003666)'
    },
    fonts: {
      primary: 'Tajawal, sans-serif',
      arabic: 'Tajawal, sans-serif'
    },
    loginType: 'customerId',
    placeholders: {
      customerId: 'Customer ID / رقم العميل',
      password: 'Password / كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: false,
      qrCode: false
    },
    layoutStyle: 'classic'
  },

  // ====== البحرين ======
  nbb: {
    id: 'nbb',
    name: 'National Bank of Bahrain',
    nameAr: 'بنك البحرين الوطني',
    logo: 'https://www.nbbonline.com/images/nbb-logo.svg',
    colors: {
      primary: '#E31E24',
      secondary: '#B01419',
      accent: '#FFD700',
      background: '#F7F7F7',
      text: '#1E1E1E',
      textSecondary: '#6E6E6E',
      border: '#DADADA',
      inputBg: '#FFFFFF',
      buttonGradient: 'linear-gradient(135deg, #E31E24, #B01419)'
    },
    fonts: {
      primary: 'Cairo, sans-serif',
      arabic: 'Cairo, sans-serif'
    },
    loginType: 'username',
    placeholders: {
      username: 'Username / اسم المستخدم',
      password: 'Password / كلمة المرور'
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
      biometric: true,
      qrCode: false
    },
    layoutStyle: 'modern'
  }
};

export const getBankDesign = (bankId: string): BankDesign | undefined => {
  return bankDesigns[bankId];
};

export const getBankDesignByName = (bankName: string): BankDesign | undefined => {
  return Object.values(bankDesigns).find(
    design => design.name === bankName || design.nameAr === bankName
  );
};
