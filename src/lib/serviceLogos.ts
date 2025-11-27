// Service logos and branding - All GCC shipping carriers
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "https://www.aramex.com/sites/default/files/aramex-logo.svg",
    colors: {
      primary: "#ED1C24",
      secondary: "#000000"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "شركة رائدة في خدمات الشحن السريع والحلول اللوجستية في المنطقة"
  },
  dhl: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  fedex: {
    logo: "https://www.fedex.com/content/dam/fedex-com/logos/logo.png",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/og-fedex.jpg",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات"
  },
  ups: {
    logo: "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/og-ups.jpg",
    heroImage: "/og-ups.jpg",
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
    logo: "https://www.smsaexpress.com/images/logo.png",
    colors: {
      primary: "#0066CC",
      secondary: "#FF6600"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/og-smsa.jpg",
    description: "أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية"
  },
  zajil: {
    logo: "https://zajil.com/assets/images/logo.png",
    colors: {
      primary: "#1C4587",
      secondary: "#FF9900"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/og-zajil.jpg",
    description: "شركة سعودية رائدة في خدمات البريد السريع والشحن"
  },
  naqel: {
    logo: "https://www.naqelexpress.com/images/logo.png",
    colors: {
      primary: "#0052A3",
      secondary: "#FF6B00"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/og-naqel.jpg",
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة"
  },
  saudipost: {
    logo: "https://sp.com.sa/assets/images/logo.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFB81C"
    },
    ogImage: "/og-saudipost.jpg",
    heroImage: "/og-saudipost.jpg",
    description: "المشغل الوطني للبريد في المملكة العربية السعودية"
  },
  
  // Kuwait - الكويت
  kwpost: {
    logo: "https://www.kwpost.com.kw/images/logo.png",
    colors: {
      primary: "#007A33",
      secondary: "#DA291C"
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
      primary: "#CE1126",
      secondary: "#FFFFFF"
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
    logo: "https://www.albaraka.com/images/logo.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFB500"
    },
    ogImage: "/og-albaraka.jpg",
    heroImage: "/og-albaraka.jpg",
    description: "مجموعة البركة للتجارة والشحن - خدمات شحن وبنكية متكاملة"
  },
  alajwan: {
    logo: "https://www.alajwan.com/images/logo.png",
    colors: {
      primary: "#DA291C",
      secondary: "#003087"
    },
    ogImage: "/og-alajwan.jpg",
    heroImage: "/og-alajwan.jpg",
    description: "شركة الأغوان للتجارة والشحن - خدمات شحن متطورة"
  },
  national: {
    logo: "https://www.nationalshipping.com/images/logo.png",
    colors: {
      primary: "#003087",
      secondary: "#FFB500"
    },
    ogImage: "/og-national.jpg",
    heroImage: "/og-national.jpg",
    description: "الشركة الوطنية للشحن - خدمات شحن وخدمات لوجستية شاملة"
  },
  alfuttaim: {
    logo: "https://www.alfuttaim.com/images/logo.png",
    colors: {
      primary: "#E31E24",
      secondary: "#0057B8"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/og-alfuttaim.jpg",
    description: "مجموعة الفطيم للتجارة والشحن - حلول لوجستية متكاملة"
  },
  shipco: {
    logo: "https://www.shipco.com/images/logo.png",
    colors: {
      primary: "#0066CC",
      secondary: "#FF6600"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/og-shipco.jpg",
    description: "شركة الشحن العالمية - خدمات شحن دولي ومحلي"
  },
  dhlfreight: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-freight-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhlfreight.jpg",
    heroImage: "/og-dhlfreight.jpg",
    description: "دي إتش إل للشحن - خدمات الشحن والخدمات اللوجستية المتقدمة"
  },
  hellmann: {
    logo: "https://www.hellmann.com/images/logo.png",
    colors: {
      primary: "#E30613",
      secondary: "#003087"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/og-hellmann.jpg",
    description: "هايلمان العالمية - خدمات شحن ولوجستيات دولية"
  },
  dsv: {
    logo: "https://www.dsv.com/images/logo.png",
    colors: {
      primary: "#004B87",
      secondary: "#FF6600"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/og-dsv.jpg",
    description: "DSV للشحن والخدمات اللوجستية - حلول شحن متطورة"
  },
  alshaya: {
    logo: "https://www.alshaya.com/images/logo.png",
    colors: {
      primary: "#006C35",
      secondary: "#DA291C"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/og-alshaya.jpg",
    description: "مجموعة الشايع التجارية - خدمات شحن وتوزيع"
  },
  agility: {
    logo: "https://www.agility.com/images/logo.png",
    colors: {
      primary: "#004B87",
      secondary: "#FF6600"
    },
    ogImage: "/og-agility.jpg",
    heroImage: "/og-agility.jpg",
    description: "مجموعة الجاهلية - خدمات لوجستية وشحن متطورة"
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
