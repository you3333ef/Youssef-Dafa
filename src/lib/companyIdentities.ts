/**
 * Shipping Companies Visual Identities - Complete Official Information
 * هوية الشركات البصرية الكاملة - معلومات رسمية دقيقة
 */

export interface CompanyIdentity {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  
  fonts: {
    primary: string;
    arabic: string;
    english: string;
    weights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  
  design: {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  
  meta: {
    ogImage: string;
    ogDescription: string;
    tagline: string;
    websiteUrl: string;
  };
  
  logo: string;
  country: string;
}

export const COMPANY_IDENTITIES: Record<string, CompanyIdentity> = {
  // ============================================================
  // INTERNATIONAL SHIPPING - الشحن الدولي
  // ============================================================
  
  aramex: {
    id: "aramex",
    name: "Aramex",
    nameAr: "أرامكس",
    nameEn: "Aramex",
    
    colors: {
      primary: "#E60000",
      secondary: "#B30000",
      accent: "#FF3333",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
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
      },
      shadows: {
        sm: "0 2px 4px rgba(230, 0, 0, 0.1)",
        md: "0 4px 8px rgba(230, 0, 0, 0.15)",
        lg: "0 10px 20px rgba(230, 0, 0, 0.2)",
      },
    },
    
    meta: {
      ogImage: "/og-aramex.jpg",
      ogDescription: "أرامكس - شبكة عالمية رائدة في حلول النقل والشحن السريع - خدمات شحن موثوقة إلى أكثر من 600 مدينة في أكثر من 220 دولة حول العالم",
      tagline: "Aramex - Delivering Excellence",
      websiteUrl: "https://www.aramex.com",
    },
    
    logo: "/aramex-logo.svg",
    country: "UAE",
  },
  
  dhl: {
    id: "dhl",
    name: "DHL",
    nameAr: "دي إتش إل",
    nameEn: "DHL",
    
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511",
      accent: "#FFA500",
      background: "#FFFFFF",
      surface: "#F8F8F8",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Delivery, sans-serif",
      weights: {
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
      },
      shadows: {
        sm: "0 2px 4px rgba(212, 5, 17, 0.1)",
        md: "0 4px 8px rgba(212, 5, 17, 0.15)",
        lg: "0 10px 20px rgba(212, 5, 17, 0.2)",
      },
    },
    
    meta: {
      ogImage: "/og-dhl.jpg",
      ogDescription: "DHL - الشركة العالمية الرائدة في الشحن والخدمات اللوجستية - شبكة عالمية تغطي أكثر من 220 دولة ومنطقة مع خدمات توصيل سريعة وموثوقة",
      tagline: "DHL - Excellence. Simply Delivered.",
      websiteUrl: "https://www.dhl.com",
    },
    
    logo: "/dhl-logo.svg",
    country: "International",
  },
  
  fedex: {
    id: "fedex",
    name: "FedEx",
    nameAr: "فيديكس",
    nameEn: "FedEx",
    
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600",
      accent: "#7B1FA2",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "FedEx Sans, sans-serif",
      weights: {
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
      },
      shadows: {
        sm: "0 2px 4px rgba(77, 20, 140, 0.1)",
        md: "0 4px 8px rgba(77, 20, 140, 0.15)",
        lg: "0 10px 20px rgba(77, 20, 140, 0.2)",
      },
    },
    
    meta: {
      ogImage: "/og-fedex.jpg",
      ogDescription: "FedEx - شبكة النقل السريع الأكثر موثوقية في العالم - خدمات شحن دولية متميزة مع ضمان التسليم في الوقت المحدد إلى أكثر من 220 دولة",
      tagline: "FedEx - The World On Time",
      websiteUrl: "https://www.fedex.com",
    },
    
    logo: "/fedex-logo.png",
    country: "International",
  },
  
  ups: {
    id: "ups",
    name: "UPS",
    nameAr: "يو بي إس",
    nameEn: "UPS",
    
    colors: {
      primary: "#351C15",
      secondary: "#FFB500",
      accent: "#FFB500",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "UPS Berlingske Sans, sans-serif",
      weights: {
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
      },
      shadows: {
        sm: "0 2px 4px rgba(53, 28, 21, 0.1)",
        md: "0 4px 8px rgba(53, 28, 21, 0.15)",
        lg: "0 10px 20px rgba(53, 28, 21, 0.2)",
      },
    },
    
    meta: {
      ogImage: "/og-ups.jpg",
      ogDescription: "UPS - الشركة الرائدة عالمياً في حلول سلسلة التوريد والشحن - خدمات لوجستية متكاملة مع تغطية عالمية في أكثر من 220 دولة ومنطقة",
      tagline: "UPS - United Problem Solvers",
      websiteUrl: "https://www.ups.com",
    },
    
    logo: "/ups-logo.png",
    country: "International",
  },
  
  // ============================================================
  // SAUDI ARABIA - السعودية
  // ============================================================
  
  smsa: {
    id: "smsa",
    name: "SMSA Express",
    nameAr: "سمسا إكسبرس",
    nameEn: "SMSA Express",
    
    colors: {
      primary: "#0066CC",
      secondary: "#004C99",
      accent: "#3399FF",
      background: "#F5F7FA",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
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
      },
      shadows: {
        sm: "0 2px 4px rgba(0, 102, 204, 0.1)",
        md: "0 4px 8px rgba(0, 102, 204, 0.15)",
        lg: "0 10px 20px rgba(0, 102, 204, 0.2)",
      },
    },
    
    meta: {
      ogImage: "/og-smsa.jpg",
      ogDescription: "SMSA Express - الشركة الرائدة في خدمات الشحن السريع بالمملكة العربية السعودية - شبكة توزيع واسعة تغطي جميع مناطق المملكة مع خدمات توصيل سريعة",
      tagline: "SMSA - Trust in Delivery",
      websiteUrl: "https://www.smsa.com",
    },
    
    logo: "/smsa-logo.svg",
    country: "Saudi Arabia",
  },
  
  naqel: {
    id: "naqel",
    name: "Naqel Express",
    nameAr: "ناقل إكسبريس",
    nameEn: "Naqel Express",
    
    colors: {
      primary: "#00A651",
      secondary: "#008040",
      accent: "#00CC66",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#666666",
      border: "#E5E7EB",
    },
    
    fonts: {
      primary: "Cairo, sans-serif",
      arabic: "Cairo, sans-serif",
      english: "Arial, sans-serif",
      weights: {
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
      },
      shadows: {
        sm: "0 2px 4px rgba(0, 166, 81, 0.1)",
        md: "0 4px 8px rgba(0, 166, 81, 0.15)",
        lg: "0 10px 20px rgba(0, 166, 81, 0.2)",
      },
    },
    
    meta: {
      ogImage: "/og-naqel.jpg",
      ogDescription: "ناقل إكسبريس - خدمات شحن وتوصيل متطورة في السعودية - حلول لوجستية متكاملة مع تغطية شاملة لجميع مدن ومناطق المملكة العربية السعودية",
      tagline: "Naqel - Moving Forward",
      websiteUrl: "https://www.naqelexpress.com",
    },
    
    logo: "/naqel-logo.svg",
    country: "Saudi Arabia",
  },
  
  // المزيد من الشركات...
  // يمكن إضافة باقي الشركات بنفس النمط
};

/**
 * Get company identity by ID
 */
export const getCompanyIdentity = (companyId: string): CompanyIdentity | undefined => {
  return COMPANY_IDENTITIES[companyId];
};

/**
 * Get all company identities
 */
export const getAllCompanyIdentities = (): CompanyIdentity[] => {
  return Object.values(COMPANY_IDENTITIES);
};
