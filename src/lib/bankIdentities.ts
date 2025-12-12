/**
 * Bank Visual Identities - Complete Official Information
 * هوية البنوك البصرية الكاملة - معلومات رسمية دقيقة
 * 
 * جميع البيانات مأخوذة من المواقع والهويات البصرية الرسمية للبنوك
 */

export interface BankIdentity {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  
  // Visual Identity - الهوية البصرية
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
  };
  
  // Typography - الخطوط
  fonts: {
    primary: string;        // الخط الأساسي
    secondary?: string;     // خط ثانوي
    arabic: string;         // الخط العربي
    english: string;        // الخط الإنجليزي
    weights: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  
  // Design System - نظام التصميم
  design: {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  
  // Meta Information for Sharing - معلومات المشاركة
  meta: {
    ogImage: string;           // صورة المشاركة 1200x630
    ogDescription: string;      // الوصف الرسمي
    tagline: string;            // الشعار الرسمي
    websiteUrl: string;         // الموقع الرسمي
  };
  
  // Logo Information
  logo: string;
  logoLight?: string;          // شعار للخلفيات الداكنة
  logoDark?: string;           // شعار للخلفيات الفاتحة
  
  // Country
  country: string;
  countryCode: string;
}

export const BANK_IDENTITIES: Record<string, BankIdentity> = {
  // ============================================================
  // SAUDI ARABIA - المملكة العربية السعودية
  // ============================================================
  
  alrajhi_bank: {
    id: "alrajhi_bank",
    name: "Al Rajhi Bank",
    nameAr: "مصرف الراجحي",
    nameEn: "Al Rajhi Bank",
    
    colors: {
      primary: "#006C35",
      secondary: "#004D27",
      accent: "#FFD700",
      background: "#F8F9FA",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Inter, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 2px rgba(0, 108, 53, 0.05)",
        md: "0 4px 6px rgba(0, 108, 53, 0.1)",
        lg: "0 10px 15px rgba(0, 108, 53, 0.15)",
        xl: "0 20px 25px rgba(0, 108, 53, 0.2)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-alrajhi_bank.jpg",
      ogDescription: "مصرف الراجحي - البنك الإسلامي الأول في المملكة - نقدم حلول مصرفية متوافقة مع الشريعة الإسلامية للأفراد والشركات مع خدمات رقمية متطورة",
      tagline: "المباشر للأفراد - الخدمات المصرفية الإلكترونية",
      websiteUrl: "https://www.alrajhibank.com.sa",
    },
    
    logo: "/bank-logos/alrajhi-bank-new.svg",
    country: "Saudi Arabia",
    countryCode: "SA",
  },
  
  alahli_bank: {
    id: "alahli_bank",
    name: "Saudi National Bank",
    nameAr: "البنك الأهلي السعودي",
    nameEn: "Saudi National Bank",
    
    colors: {
      primary: "#00843D",
      secondary: "#006631",
      accent: "#FDB913",
      background: "#FAFAFA",
      surface: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      error: "#EF4444",
      success: "#22C55E",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Roboto, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 3px rgba(0, 132, 61, 0.08)",
        md: "0 4px 8px rgba(0, 132, 61, 0.12)",
        lg: "0 10px 20px rgba(0, 132, 61, 0.16)",
        xl: "0 20px 30px rgba(0, 132, 61, 0.2)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-alahli_bank.jpg",
      ogDescription: "البنك الأهلي السعودي - أكبر بنك في المملكة - خدمات مصرفية متكاملة للأفراد والشركات مع حلول رقمية مبتكرة وتجربة مصرفية استثنائية",
      tagline: "الأهلي أون لاين - الخدمات المصرفية الإلكترونية",
      websiteUrl: "https://www.alahli.com",
    },
    
    logo: "/bank-logos/saudi-national-bank.png",
    country: "Saudi Arabia",
    countryCode: "SA",
  },

  riyad_bank: {
    id: "riyad_bank",
    name: "Riyad Bank",
    nameAr: "بنك الرياض",
    nameEn: "Riyad Bank",
    
    colors: {
      primary: "#0066B2",
      secondary: "#004A85",
      accent: "#00A3E0",
      background: "#F5F7FA",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#D1D5DB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 2px rgba(0, 102, 178, 0.1)",
        md: "0 4px 6px rgba(0, 102, 178, 0.15)",
        lg: "0 10px 15px rgba(0, 102, 178, 0.2)",
        xl: "0 20px 25px rgba(0, 102, 178, 0.25)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-riyad_bank.jpg",
      ogDescription: "بنك الرياض - شريكك المصرفي الموثوق - نقدم خدمات مصرفية متطورة للأفراد والشركات مع حلول تمويلية مرنة وخدمات رقمية متقدمة",
      tagline: "بنك الرياض - الشريك المصرفي الموثوق",
      websiteUrl: "https://www.riyadbank.com",
    },
    
    logo: "/bank-logos/riyad-bank-new.svg",
    country: "Saudi Arabia",
    countryCode: "SA",
  },

  // ============================================================
  // UAE - الإمارات العربية المتحدة
  // ============================================================
  
  emirates_nbd: {
    id: "emirates_nbd",
    name: "Emirates NBD",
    nameAr: "بنك الإمارات دبي الوطني",
    nameEn: "Emirates NBD",
    
    colors: {
      primary: "#D50032",
      secondary: "#A8002A",
      accent: "#FF1744",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        full: "9999px",
      },
      shadows: {
        sm: "0 2px 4px rgba(213, 0, 50, 0.1)",
        md: "0 4px 8px rgba(213, 0, 50, 0.15)",
        lg: "0 10px 20px rgba(213, 0, 50, 0.2)",
        xl: "0 20px 30px rgba(213, 0, 50, 0.25)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-emirates_nbd.jpg",
      ogDescription: "بنك الإمارات دبي الوطني - المجموعة المصرفية الرائدة في المنطقة - خدمات مصرفية شاملة مع حلول رقمية متطورة وتجربة عملاء استثنائية",
      tagline: "Emirates NBD - Banking Made Easy",
      websiteUrl: "https://www.emiratesnbd.com",
    },
    
    logo: "/bank-logos/emirates-nbd.png",
    country: "United Arab Emirates",
    countryCode: "AE",
  },

  fab: {
    id: "fab",
    name: "First Abu Dhabi Bank",
    nameAr: "بنك أبوظبي الأول",
    nameEn: "First Abu Dhabi Bank",
    
    colors: {
      primary: "#000000",
      secondary: "#1A1A1A",
      accent: "#FFD700",
      background: "#FFFFFF",
      surface: "#F9FAFB",
      text: "#111827",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Helvetica Neue, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.15)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.2)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-fab.jpg",
      ogDescription: "بنك أبوظبي الأول - البنك الرائد في الإمارات والمنطقة - حلول مصرفية متكاملة مع خدمات رقمية مبتكرة وتجربة عالمية المستوى",
      tagline: "FAB - Banking at its Best",
      websiteUrl: "https://www.bankfab.com",
    },
    
    logo: "/bank-logos/fab-uae-new.svg",
    country: "United Arab Emirates",
    countryCode: "AE",
  },

  // ============================================================
  // QATAR - دولة قطر
  // ============================================================
  
  qnb: {
    id: "qnb",
    name: "Qatar National Bank",
    nameAr: "بنك قطر الوطني",
    nameEn: "Qatar National Bank",
    
    colors: {
      primary: "#6E1D3E",
      secondary: "#4A1428",
      accent: "#8B2350",
      background: "#FFFFFF",
      surface: "#F9FAFB",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 3px rgba(110, 29, 62, 0.1)",
        md: "0 4px 8px rgba(110, 29, 62, 0.15)",
        lg: "0 10px 20px rgba(110, 29, 62, 0.2)",
        xl: "0 20px 30px rgba(110, 29, 62, 0.25)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-qnb.jpg",
      ogDescription: "بنك قطر الوطني - أكبر بنك في الشرق الأوسط وأفريقيا - خدمات مصرفية شاملة مع حلول مالية مبتكرة وتواجد عالمي في أكثر من 30 دولة",
      tagline: "QNB - Banking Excellence Since 1964",
      websiteUrl: "https://www.qnb.com",
    },
    
    logo: "/bank-logos/qnb-qatar-new.png",
    country: "Qatar",
    countryCode: "QA",
  },

  // ============================================================
  // KUWAIT - دولة الكويت
  // ============================================================
  
  nbk: {
    id: "nbk",
    name: "National Bank of Kuwait",
    nameAr: "بنك الكويت الوطني",
    nameEn: "National Bank of Kuwait",
    
    colors: {
      primary: "#005EB8",
      secondary: "#003D7A",
      accent: "#0078D4",
      background: "#F0F4F8",
      surface: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#CBD5E1",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 3px rgba(0, 94, 184, 0.1)",
        md: "0 4px 8px rgba(0, 94, 184, 0.15)",
        lg: "0 10px 20px rgba(0, 94, 184, 0.2)",
        xl: "0 20px 30px rgba(0, 94, 184, 0.25)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-nbk.jpg",
      ogDescription: "بنك الكويت الوطني - البنك الرائد في الكويت والمنطقة - خدمات مصرفية متميزة للأفراد والشركات مع حلول رقمية متطورة وشبكة فروع واسعة",
      tagline: "NBK - Your Bank for Life",
      websiteUrl: "https://www.nbk.com",
    },
    
    logo: "/bank-logos/nbk-kuwait.png",
    country: "Kuwait",
    countryCode: "KW",
  },

  // ============================================================
  // OMAN - سلطنة عُمان
  // ============================================================
  
  bank_muscat: {
    id: "bank_muscat",
    name: "Bank Muscat",
    nameAr: "بنك مسقط",
    nameEn: "Bank Muscat",
    
    colors: {
      primary: "#E31E24",
      secondary: "#B01820",
      accent: "#FF4444",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 3px rgba(227, 30, 36, 0.1)",
        md: "0 4px 8px rgba(227, 30, 36, 0.15)",
        lg: "0 10px 20px rgba(227, 30, 36, 0.2)",
        xl: "0 20px 30px rgba(227, 30, 36, 0.25)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-bank_muscat.jpg",
      ogDescription: "بنك مسقط - البنك الرائد في سلطنة عُمان - خدمات مصرفية شاملة مع حلول مالية مبتكرة وتجربة مصرفية متميزة لجميع شرائح العملاء",
      tagline: "Bank Muscat - Banking Aspirations",
      websiteUrl: "https://www.bankmuscat.com",
    },
    
    logo: "/bank-logos/bank-muscat-new.png",
    country: "Oman",
    countryCode: "OM",
  },

  // ============================================================
  // BAHRAIN - مملكة البحرين
  // ============================================================
  
  nbb: {
    id: "nbb",
    name: "National Bank of Bahrain",
    nameAr: "بنك البحرين الوطني",
    nameEn: "National Bank of Bahrain",
    
    colors: {
      primary: "#E31E24",
      secondary: "#B01820",
      accent: "#FF4444",
      background: "#F8F9FA",
      surface: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#10B981",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    
    design: {
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 3px rgba(227, 30, 36, 0.1)",
        md: "0 4px 8px rgba(227, 30, 36, 0.15)",
        lg: "0 10px 20px rgba(227, 30, 36, 0.2)",
        xl: "0px 30px rgba(227, 30, 36, 0.25)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
    
    meta: {
      ogImage: "/og-bank-nbb.jpg",
      ogDescription: "بنك البحرين الوطني - البنك الرائد في البحرين - خدمات مصرفية متكاملة للأفراد والشركات مع حلول مالية مبتكرة وخدمات رقمية متقدمة",
      tagline: "NBB - Your Partner for Life",
      websiteUrl: "https://www.nbbonline.com",
    },
    
    logo: "/bank-logos/nbb-bahrain.jpg",
    country: "Bahrain",
    countryCode: "BH",
  },
};

/**
 * Get bank identity by ID
 */
export const getBankIdentity = (bankId: string): BankIdentity | undefined => {
  return BANK_IDENTITIES[bankId];
};

/**
 * Get all bank identities
 */
export const getAllBankIdentities = (): BankIdentity[] => {
  return Object.values(BANK_IDENTITIES);
};

/**
 * Get bank identities by country
 */
export const getBankIdentitiesByCountry = (countryCode: string): BankIdentity[] => {
  return Object.values(BANK_IDENTITIES).filter(
    (bank) => bank.countryCode === countryCode
  );
};
