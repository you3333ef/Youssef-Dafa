// Service logos and branding - All GCC shipping carriers
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "/logos/aramex.svg",
    colors: {
      primary: "#DC291E",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/hero-aramex.jpg",
    description: "شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع. تقدم خدمات الشحن الدولي والمحلي وحلول التجارة الإلكترونية"
  },
  dhl: {
    logo: "/logos/dhl.png",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  fedex: {
    logo: "/logos/fedex-express.png",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/hero-fedex.jpg",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات"
  },
  ups: {
    logo: "/logos/ups.svg",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/og-ups.jpg",
    heroImage: "/hero-ups.jpg",
    description: "حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم"
  },
  empost: {
    logo: "https://www.emiratespost.ae/images/logo.png",
    colors: {
      primary: "#C8102E",
      secondary: "#003087"
    },
    ogImage: "/og-empost.jpg",
    heroImage: "/og-empost.jpg",
    description: "المشغل الوطني للبريد في دولة الإمارات العربية المتحدة"
  },
  
  // Saudi Arabia - السعودية
  smsa: {
    logo: "/logos/smsa.png",
    colors: {
      primary: "#662D91",
      secondary: "#FF6600"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/hero-smsa.jpg",
    description: "أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية"
  },
  zajil: {
    logo: "https://zajil.com/assets/images/logo.png",
    colors: {
      primary: "#1F3A6C",
      secondary: "#E8A500"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/og-zajil.jpg",
    description: "شركة سعودية رائدة في خدمات البريد السريع والشحن"
  },
  naqel: {
    logo: "https://www.naqelexpress.com/images/logo.png",
    colors: {
      primary: "#E61838",
      secondary: "#002E60"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/og-naqel.jpg",
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة"
  },
  saudipost: {
    logo: "/logos/saudipost.jpg",
    colors: {
      primary: "#00B4D8",
      secondary: "#006C35"
    },
    ogImage: "/og-saudipost.jpg",
    heroImage: "/hero-saudipost.jpg",
    description: "المشغل الوطني للبريد في المملكة العربية السعودية - سبل"
  },
  
  // Kuwait - الكويت
  kwpost: {
    logo: "https://www.kwpost.com.kw/images/logo.png",
    colors: {
      primary: "#007A33",
      secondary: "#CE1126"
    },
    ogImage: "/og-kwpost.jpg",
    heroImage: "/og-kwpost.jpg",
    description: "المشغل الوطني للبريد في دولة الكويت"
  },
  dhlkw: {
    logo: "/logos/dhl.png",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  
  // Qatar - قطر
  qpost: {
    logo: "https://www.qpost.qa/assets/images/logo.png",
    colors: {
      primary: "#8E1838",
      secondary: "#F9D416"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/og-qpost.jpg",
    description: "المشغل الوطني للبريد في دولة قطر"
  },
  dhlqa: {
    logo: "/logos/dhl.png",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  
  // Oman - عمان
  omanpost: {
    logo: "https://www.omanpost.om/images/logo.png",
    colors: {
      primary: "#ED1C24",
      secondary: "#009639"
    },
    ogImage: "/og-omanpost.jpg",
    heroImage: "/og-omanpost.jpg",
    description: "المشغل الوطني للبريد في سلطنة عُمان"
  },
  dhlom: {
    logo: "/logos/dhl.png",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  
  // Bahrain - البحرين
  bahpost: {
    logo: "https://www.bahrainpost.gov.bh/images/logo.png",
    colors: {
      primary: "#EF3F32",
      secondary: "#007CC2"
    },
    ogImage: "/og-bahpost.jpg",
    heroImage: "/og-bahpost.jpg",
    description: "المشغل الوطني للبريد في مملكة البحرين"
  },
  dhlbh: {
    logo: "/logos/dhl.png",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },

  // Real GCC Shipping Companies - Additional
  albaraka: {
    logo: "https://logo.clearbit.com/albaraka.com.tr",
    colors: {
      primary: "#006838",
      secondary: "#D4AF37"
    },
    ogImage: "/og-albaraka.jpg",
    heroImage: "/hero-albaraka.jpg",
    description: "خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج"
  },
  alfuttaim: {
    logo: "https://logo.clearbit.com/alfuttaim.com",
    colors: {
      primary: "#C8102E",
      secondary: "#003087"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/hero-alfuttaim.jpg",
    description: "حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة"
  },
  alshaya: {
    logo: "https://logo.clearbit.com/alshaya.com",
    colors: {
      primary: "#1A1A1A",
      secondary: "#D4AF37"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/hero-alshaya.jpg",
    description: "مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة"
  },
  national: {
    logo: "https://logo.clearbit.com/bahri.sa",
    colors: {
      primary: "#002E60",
      secondary: "#E61838"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/hero-bahri.jpg",
    description: "خدمات شحن وبحرية ولوجستيات شاملة، تغطي الشحن التجاري والبحري وخدمات النقل البحري داخل وخارج المملكة"
  },
  bahri: {
    logo: "https://logo.clearbit.com/bahri.sa",
    colors: {
      primary: "#002E60",
      secondary: "#E61838"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/hero-bahri.jpg",
    description: "شركة بحري الوطنية للشحن - شريك رئيسي في النقل البحري والخدمات اللوجستية"
  },
  shipco: {
    logo: "https://logo.clearbit.com/shipco.com",
    colors: {
      primary: "#0066B2",
      secondary: "#FF6600"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/hero-shipco.jpg",
    description: "مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين"
  },
  hellmann: {
    logo: "https://logo.clearbit.com/hellmann.com",
    colors: {
      primary: "#E90206",
      secondary: "#005197"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/hero-hellmann.jpg",
    description: "شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي"
  },
  dsv: {
    logo: "https://logo.clearbit.com/dsv.com",
    colors: {
      primary: "#192862",
      secondary: "#003D82"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/hero-dsv.jpg",
    description: "حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري بالإضافة إلى تخزين وإدارة سلسلة الإمداد"
  },
  agility: {
    logo: "https://logo.clearbit.com/agility.com",
    colors: {
      primary: "#ED1C24",
      secondary: "#003DA5"
    },
    ogImage: "/og-agility.jpg",
    heroImage: "/hero-agility.jpg",
    description: "خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق في المنطقة والعالم"
  },
  genacom: {
    logo: "/og-genacom.jpg",
    colors: {
      primary: "#E91E63",
      secondary: "#9C27B0"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/hero-genacom.jpg",
    description: "شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع"
  },
  jinaken: {
    logo: "/og-jinaken.jpg",
    colors: {
      primary: "#E82424",
      secondary: "#F7C24A"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/hero-jinaken.jpg",
    description: "شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع"
  },
  jinakum: {
    logo: "/og-jinakum.jpg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-jinakum.jpg",
    heroImage: "/og-jinakum.jpg",
    description: "شركة Jinakum - خدمات دفع وتحويل آمنة وموثوقة"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "خدمة شحن موثوقة"
  };
};
