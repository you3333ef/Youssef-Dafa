// Service logos and branding - All GCC shipping carriers
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "/logos/aramex-logo.png",
    colors: {
      primary: "#DC291E",
      secondary: "#231F20"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/hero-aramex.jpg",
    description: "شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع. تقدم خدمات الشحن الدولي والمحلي وحلول التجارة الإلكترونية"
  },
  dhl: {
    logo: "/logos/dhl-logo.png",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  fedex: {
    logo: "/logos/fedex-logo.png",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/hero-fedex.jpg",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات"
  },
  ups: {
    logo: "/logos/ups-logo.svg",
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
    logo: "/logos/smsa-logo.svg",
    colors: {
      primary: "#662D91",
      secondary: "#FF6600"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/hero-smsa.jpg",
    description: "أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية"
  },
  zajil: {
    logo: "/logos/zajil-logo-new.png",
    colors: {
      primary: "#FBB034",
      secondary: "#1C4587"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/hero-zajil.jpg",
    description: "شركة سعودية رائدة في خدمات البريد السريع والشحن - Yes, Delivered"
  },
  naqel: {
    logo: "/logos/naqel-logo.png",
    colors: {
      primary: "#E61838",
      secondary: "#002058"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/hero-naqel.jpg",
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة"
  },
  saudipost: {
    logo: "/logos/saudipost-logo.svg",
    colors: {
      primary: "#00B8D4",
      secondary: "#003F5C"
    },
    ogImage: "/og-saudipost.jpg",
    heroImage: "/hero-saudipost.jpg",
    description: "المشغل الوطني للبريد في المملكة العربية السعودية"
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
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  
  // Qatar - قطر
  qpost: {
    logo: "https://www.qpost.qa/assets/images/logo.png",
    colors: {
      primary: "#8E1838",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/og-qpost.jpg",
    description: "المشغل الوطني للبريد في دولة قطر"
  },
  dhlqa: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
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
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
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
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },

  // Real GCC Shipping Companies - Additional
  albaraka: {
    logo: "https://logo.clearbit.com/albaraka.com.tr",
    colors: {
      primary: "#D89A00",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/albaraka.com.tr",
    heroImage: "https://logo.clearbit.com/albaraka.com.tr",
    description: "خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج"
  },
  alfuttaim: {
    logo: "https://logo.clearbit.com/alfuttaim.com",
    colors: {
      primary: "#00559B",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/alfuttaim.com",
    heroImage: "https://logo.clearbit.com/alfuttaim.com",
    description: "حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة"
  },
  alshaya: {
    logo: "https://logo.clearbit.com/alshaya.com",
    colors: {
      primary: "#D71920",
      secondary: "#000000"
    },
    ogImage: "https://logo.clearbit.com/alshaya.com",
    heroImage: "https://logo.clearbit.com/alshaya.com",
    description: "مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة"
  },
  national: {
    logo: "https://logo.clearbit.com/bahri.sa",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/bahri.sa",
    heroImage: "https://logo.clearbit.com/bahri.sa",
    description: "خدمات شحن وبحرية ولوجستيات شاملة، تغطي الشحن التجاري والبحري وخدمات النقل البحري داخل وخارج المملكة"
  },
  shipco: {
    logo: "https://logo.clearbit.com/shipco.com",
    colors: {
      primary: "#0A5FB4",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/shipco.com",
    heroImage: "https://logo.clearbit.com/shipco.com",
    description: "مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين"
  },
  hellmann: {
    logo: "https://logo.clearbit.com/hellmann.com",
    colors: {
      primary: "#0C4DA2",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/hellmann.com",
    heroImage: "https://logo.clearbit.com/hellmann.com",
    description: "شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي"
  },
  dsv: {
    logo: "https://logo.clearbit.com/dsv.com",
    colors: {
      primary: "#0056A6",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/dsv.com",
    heroImage: "https://logo.clearbit.com/dsv.com",
    description: "حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري بالإضافة إلى تخزين وإدارة سلسلة الإمداد"
  },
  agility: {
    logo: "https://logo.clearbit.com/agility.com",
    colors: {
      primary: "#003A63",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/agility.com",
    heroImage: "https://logo.clearbit.com/agility.com",
    description: "خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق في المنطقة والعالم"
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
