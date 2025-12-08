// Animal transport service logos and branding
export const animalServiceLogos: Record<string, { 
  logo: string; 
  colors: { 
    primary: string; 
    secondary: string;
    text?: string;
    textLight?: string;
    border?: string;
    surface?: string;
  }; 
  ogImage?: string; 
  heroImage?: string; 
  description?: string 
}> = {
  // UAE - الإمارات
  equitrans: {
    logo: "/og-equitrans.jpg",
    colors: {
      primary: "#1E40AF",
      secondary: "#3B82F6"
    },
    ogImage: "/og-equitrans.jpg",
    heroImage: "/og-equitrans.jpg",
    description: "شركة متخصصة في نقل الحيوانات بخبرة تزيد عن 20 عاماً، تقدم خدمات نقل شاملة للحيوانات الأليفة والخيول والمواشي"
  },
  carrymypet: {
    logo: "/og-carrymypet.jpg",
    colors: {
      primary: "#10B981",
      secondary: "#059669"
    },
    ogImage: "/og-carrymypet.jpg",
    heroImage: "/og-carrymypet.jpg",
    description: "خدمة متخصصة في نقل الحيوانات الأليفة الصغيرة مع سجل أمان 100٪"
  },
  sandypaws: {
    logo: "/og-sandypaws.jpg",
    colors: {
      primary: "#F59E0B",
      secondary: "#D97706"
    },
    ogImage: "/og-sandypaws.jpg",
    heroImage: "/og-sandypaws.jpg",
    description: "خدمة نقل الحيوانات الأليفة بنهج شخصي ومعاملة أخلاقية"
  },
  
  // Saudi Arabia - السعودية
  movepets: {
    logo: "/og-movepets.jpg",
    colors: {
      primary: "#8B5CF6",
      secondary: "#7C3AED"
    },
    ogImage: "/og-movepets.jpg",
    heroImage: "/og-movepets.jpg",
    description: "خدمات نقل الحيوانات الأليفة الشاملة في السعودية"
  },
  expatlogistics: {
    logo: "/og-expatlogistics.jpg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#0284C7"
    },
    ogImage: "/og-expatlogistics.jpg",
    heroImage: "/og-expatlogistics.jpg",
    description: "شركة متخصصة في نقل الحيوانات الأليفة مع خدمات لوجستية متكاملة"
  },
  mazedsons: {
    logo: "/og-mazedsons.jpg",
    colors: {
      primary: "#92400E",
      secondary: "#78350F"
    },
    ogImage: "/og-mazedsons.jpg",
    heroImage: "/og-mazedsons.jpg",
    description: "شركة متخصصة في نقل المواشي الكبيرة مع خبرة واسعة"
  },
  
  // Kuwait - الكويت
  gfsrelocations: {
    logo: "/og-gfsrelocations.jpg",
    colors: {
      primary: "#DC2626",
      secondary: "#B91C1C"
    },
    ogImage: "/og-gfsrelocations.jpg",
    heroImage: "/og-gfsrelocations.jpg",
    description: "شركة لوجستية كويتية توفر خدمات نقل الحيوانات الأليفة"
  },
  
  // Qatar - قطر
  qatarairwayscargo: {
    logo: "/og-qatarairwayscargo.jpg",
    colors: {
      primary: "#7E22CE",
      secondary: "#6B21A8"
    },
    ogImage: "/og-qatarairwayscargo.jpg",
    heroImage: "/og-qatarairwayscargo.jpg",
    description: "خدمات نقل جوي متخصصة للحيوانات مع مركز حيوانات متطور"
  },
  
  // Oman - عُمان
  soharlivestock: {
    logo: "/og-soharlivestock.jpg",
    colors: {
      primary: "#059669",
      secondary: "#047857"
    },
    ogImage: "/og-soharlivestock.jpg",
    heroImage: "/og-soharlivestock.jpg",
    description: "شركة متخصصة في نقل المواشي الكبيرة في سلطنة عُمان"
  },
  
  // Bahrain - البحرين
  delmonpets: {
    logo: "/og-delmonpets.jpg",
    colors: {
      primary: "#DB2777",
      secondary: "#BE185D"
    },
    ogImage: "/og-delmonpets.jpg",
    heroImage: "/og-delmonpets.jpg",
    description: "أول شركة مسجلة رسمياً في البحرين متخصصة في نقل الحيوانات الأليفة"
  },
  classiccargo: {
    logo: "/og-classiccargo.jpg",
    colors: {
      primary: "#0F766E",
      secondary: "#115E59"
    },
    ogImage: "/og-classiccargo.jpg",
    heroImage: "/og-classiccargo.jpg",
    description: "شركة شحن متخصصة في نقل المواشي الكبيرة"
  },
  
  // GCC - عام
  globallivestock: {
    logo: "/og-globallivestock.jpg",
    colors: {
      primary: "#0369A1",
      secondary: "#075985"
    },
    ogImage: "/og-globallivestock.jpg",
    heroImage: "/og-globallivestock.jpg",
    description: "شركة عالمية متخصصة في لوجستيات المواشي الكبيرة"
  },
};

export const getAnimalServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  const branding = animalServiceLogos[key] || {
    logo: "",
    colors: {
      primary: "#059669",
      secondary: "#047857",
      text: "#1F2937",
      textLight: "#6B7280",
      border: "#E5E7EB",
      surface: "#F9FAFB"
    },
    ogImage: "/og-animal-default.jpg",
    heroImage: "/og-animal-default.jpg",
    description: "خدمة نقل حيوانات موثوقة"
  };
  
  // Add default colors if missing
  return {
    ...branding,
    colors: {
      primary: branding.colors.primary,
      secondary: branding.colors.secondary,
      text: branding.colors.text || "#1F2937",
      textLight: branding.colors.textLight || "#6B7280",
      border: branding.colors.border || "#E5E7EB",
      surface: branding.colors.surface || "#F9FAFB"
    }
  };
};
