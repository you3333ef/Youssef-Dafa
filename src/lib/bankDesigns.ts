export interface BankDesign {
  id: string;
  nameAr: string;
  nameEn: string;
  countryCode: string;
  logo?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    border: string;
    buttonHover: string;
    inputBg: string;
    inputBorder: string;
    headerBg: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    arabic: string;
  };
  gradients: {
    primary: string;
    header: string;
    button: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  loginFields: {
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    buttonText: string;
  };
}

export const bankDesigns: Record<string, BankDesign> = {
  alrajhi_bank: {
    id: 'alrajhi_bank',
    nameAr: 'مصرف الراجحي',
    nameEn: 'Al Rajhi Bank',
    countryCode: 'SA',
    logo: '/src/assets/bank-alrajhi.svg',
    colors: {
      primary: '#006C35',
      secondary: '#004D26',
      accent: '#00A651',
      background: '#FFFFFF',
      surface: '#F5F9F6',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#D1E7DD',
      buttonHover: '#005028',
      inputBg: '#FFFFFF',
      inputBorder: '#B8E6C9',
      headerBg: '#006C35',
    },
    fonts: {
      primary: 'Cairo',
      secondary: 'Inter',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #006C35 0%, #004D26 100%)',
      header: 'linear-gradient(180deg, #006C35 0%, #004D26 100%)',
      button: 'linear-gradient(135deg, #006C35 0%, #00A651 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 108, 53, 0.08)',
      md: '0 4px 12px rgba(0, 108, 53, 0.12)',
      lg: '0 10px 24px rgba(0, 108, 53, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    loginFields: {
      usernameLabel: 'اسم المستخدم',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      buttonText: 'تسجيل الدخول',
    },
  },

  alahli_bank: {
    id: 'alahli_bank',
    nameAr: 'البنك الأهلي التجاري',
    nameEn: 'Al Ahli Bank',
    countryCode: 'SA',
    colors: {
      primary: '#00843D',
      secondary: '#006633',
      accent: '#00A651',
      background: '#FFFFFF',
      surface: '#F6F9F7',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#C8E6C9',
      buttonHover: '#006B32',
      inputBg: '#FFFFFF',
      inputBorder: '#A5D6A7',
      headerBg: '#00843D',
    },
    fonts: {
      primary: 'Cairo',
      secondary: 'Roboto',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00843D 0%, #006633 100%)',
      header: 'linear-gradient(90deg, #00843D 0%, #006633 100%)',
      button: 'linear-gradient(135deg, #00843D 0%, #00A651 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 132, 61, 0.08)',
      md: '0 4px 12px rgba(0, 132, 61, 0.12)',
      lg: '0 10px 24px rgba(0, 132, 61, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    loginFields: {
      usernameLabel: 'اسم المستخدم',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      buttonText: 'دخول',
    },
  },

  riyad_bank: {
    id: 'riyad_bank',
    nameAr: 'بنك الرياض',
    nameEn: 'Riyad Bank',
    countryCode: 'SA',
    colors: {
      primary: '#004B87',
      secondary: '#003366',
      accent: '#0066B2',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#B3D4E6',
      buttonHover: '#003D70',
      inputBg: '#FFFFFF',
      inputBorder: '#90CAF9',
      headerBg: '#004B87',
    },
    fonts: {
      primary: 'Cairo',
      secondary: 'Arial',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #004B87 0%, #003366 100%)',
      header: 'linear-gradient(180deg, #004B87 0%, #003366 100%)',
      button: 'linear-gradient(135deg, #004B87 0%, #0066B2 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 75, 135, 0.08)',
      md: '0 4px 12px rgba(0, 75, 135, 0.12)',
      lg: '0 10px 24px rgba(0, 75, 135, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    loginFields: {
      usernameLabel: 'اسم المستخدم',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      buttonText: 'تسجيل الدخول',
    },
  },

  nbk: {
    id: 'nbk',
    nameAr: 'بنك الكويت الوطني',
    nameEn: 'National Bank of Kuwait',
    countryCode: 'KW',
    colors: {
      primary: '#004B87',
      secondary: '#C8102E',
      accent: '#FFB81C',
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#E0E0E0',
      buttonHover: '#003D70',
      inputBg: '#FFFFFF',
      inputBorder: '#B3D4E6',
      headerBg: '#004B87',
    },
    fonts: {
      primary: 'Arial',
      secondary: 'Helvetica',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #004B87 0%, #003366 100%)',
      header: 'linear-gradient(90deg, #004B87 0%, #C8102E 100%)',
      button: 'linear-gradient(135deg, #004B87 0%, #0066B2 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 75, 135, 0.08)',
      md: '0 4px 12px rgba(0, 75, 135, 0.12)',
      lg: '0 10px 24px rgba(0, 75, 135, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    loginFields: {
      usernameLabel: 'User ID',
      usernamePlaceholder: 'Enter your User ID',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      buttonText: 'Login',
    },
  },

  emirates_nbd: {
    id: 'emirates_nbd',
    nameAr: 'بنك الإمارات دبي الوطني',
    nameEn: 'Emirates NBD',
    countryCode: 'AE',
    colors: {
      primary: '#CE1126',
      secondary: '#009A44',
      accent: '#FFB81C',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#E0E0E0',
      buttonHover: '#A50E1E',
      inputBg: '#FFFFFF',
      inputBorder: '#F7B3C7',
      headerBg: '#CE1126',
    },
    fonts: {
      primary: 'Arial',
      secondary: 'Helvetica',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #A50E1E 100%)',
      header: 'linear-gradient(90deg, #CE1126 0%, #009A44 100%)',
      button: 'linear-gradient(135deg, #CE1126 0%, #E5003D 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(206, 17, 38, 0.08)',
      md: '0 4px 12px rgba(206, 17, 38, 0.12)',
      lg: '0 10px 24px rgba(206, 17, 38, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    loginFields: {
      usernameLabel: 'User ID',
      usernamePlaceholder: 'Enter User ID',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      buttonText: 'Login',
    },
  },

  bank_muscat: {
    id: 'bank_muscat',
    nameAr: 'بنك مسقط',
    nameEn: 'Bank Muscat',
    countryCode: 'OM',
    colors: {
      primary: '#D0032C',
      secondary: '#A50223',
      accent: '#009A44',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#E0E0E0',
      buttonHover: '#8C021F',
      inputBg: '#FFFFFF',
      inputBorder: '#F2C2CD',
      headerBg: '#D0032C',
    },
    fonts: {
      primary: 'Arial',
      secondary: 'Helvetica',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D0032C 0%, #A50223 100%)',
      header: 'linear-gradient(90deg, #D0032C 0%, #A50223 100%)',
      button: 'linear-gradient(135deg, #D0032C 0%, #E50045 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(208, 3, 44, 0.08)',
      md: '0 4px 12px rgba(208, 3, 44, 0.12)',
      lg: '0 10px 24px rgba(208, 3, 44, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    loginFields: {
      usernameLabel: 'User ID',
      usernamePlaceholder: 'Enter User ID',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      buttonText: 'Login',
    },
  },

  nbb: {
    id: 'nbb',
    nameAr: 'بنك البحرين الوطني',
    nameEn: 'National Bank of Bahrain',
    countryCode: 'BH',
    colors: {
      primary: '#E50045',
      secondary: '#C0003A',
      accent: '#FFB81C',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#E0E0E0',
      buttonHover: '#A50035',
      inputBg: '#FFFFFF',
      inputBorder: '#F7B3C7',
      headerBg: '#E50045',
    },
    fonts: {
      primary: 'Arial',
      secondary: 'Helvetica',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E50045 0%, #C0003A 100%)',
      header: 'linear-gradient(90deg, #E50045 0%, #C0003A 100%)',
      button: 'linear-gradient(135deg, #E50045 0%, #FF1654 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(229, 0, 69, 0.08)',
      md: '0 4px 12px rgba(229, 0, 69, 0.12)',
      lg: '0 10px 24px rgba(229, 0, 69, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    loginFields: {
      usernameLabel: 'User ID',
      usernamePlaceholder: 'Enter User ID',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      buttonText: 'Login',
    },
  },

  qnb_alahli: {
    id: 'qnb_alahli',
    nameAr: 'بنك قطر الوطني الأهلي',
    nameEn: 'QNB Alahli',
    countryCode: 'QA',
    colors: {
      primary: '#8D1B3D',
      secondary: '#6B1529',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#E0E0E0',
      buttonHover: '#70152E',
      inputBg: '#FFFFFF',
      inputBorder: '#E6C7D0',
      headerBg: '#8D1B3D',
    },
    fonts: {
      primary: 'Arial',
      secondary: 'Helvetica',
      arabic: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8D1B3D 0%, #6B1529 100%)',
      header: 'linear-gradient(90deg, #8D1B3D 0%, #6B1529 100%)',
      button: 'linear-gradient(135deg, #8D1B3D 0%, #A52342 100%)',
    },
    shadows: {
      sm: '0 2px 4px rgba(141, 27, 61, 0.08)',
      md: '0 4px 12px rgba(141, 27, 61, 0.12)',
      lg: '0 10px 24px rgba(141, 27, 61, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    loginFields: {
      usernameLabel: 'User ID',
      usernamePlaceholder: 'Enter User ID',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      buttonText: 'Login',
    },
  },
};

export const getBankDesign = (bankId: string): BankDesign | null => {
  return bankDesigns[bankId] || null;
};

export const getAllBankDesigns = (): BankDesign[] => {
  return Object.values(bankDesigns);
};

export const getBankDesignsByCountry = (countryCode: string): BankDesign[] => {
  return Object.values(bankDesigns).filter(design => 
    design.countryCode === countryCode.toUpperCase()
  );
};
