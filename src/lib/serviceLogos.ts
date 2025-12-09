// Service logos and branding - All GCC shipping carriers with official colors and logos
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // International Carriers - الشركات العالمية
  
  // Aramex - أرامكس
  aramex: {
    logo: "/logos/aramex.svg",
    colors: {
      primary: "#DC291E",
      secondary: "#000000"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/hero-aramex.jpg",
    description: "شركة عالمية رائدة في خدمات الشحن السريع واللوجستيات. تقدم حلول الشحن الدولي والمحلي مع تتبع متقدم ودعم للتجارة الإلكترونية"
  },
  
  // DHL - دي إتش إل
  dhl: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة الشحن العالمية الأولى. خدمات توصيل سريع دولي ومحلي مع تتبع متقدم وحلول لوجستية متكاملة"
  },
  dhlkw: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة الشحن العالمية الأولى. خدمات توصيل سريع دولي ومحلي مع تتبع متقدم وحلول لوجستية متكاملة"
  },
  dhlqa: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة الشحن العالمية الأولى. خدمات توصيل سريع دولي ومحلي مع تتبع متقدم وحلول لوجستية متكاملة"
  },
  dhlom: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة الشحن العالمية الأولى. خدمات توصيل سريع دولي ومحلي مع تتبع متقدم وحلول لوجستية متكاملة"
  },
  dhlbh: {
    logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/hero-dhl.jpg",
    description: "شبكة الشحن العالمية الأولى. خدمات توصيل سريع دولي ومحلي مع تتبع متقدم وحلول لوجستية متكاملة"
  },
  
  // FedEx - فيديكس
  fedex: {
    logo: "/logos/fedex.png",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/hero-fedex.jpg",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات. حلول توصيل سريعة وآمنة لجميع أنحاء العالم"
  },
  
  // UPS - يو بي إس
  ups: {
    logo: "/logos/ups.svg",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/og-ups.jpg",
    heroImage: "/hero-ups.jpg",
    description: "حلول لوجستية متكاملة وخدمات شحن عالمية. شركة رائدة في التوصيل السريع وإدارة سلسلة الإمداد"
  },
  
  // Saudi Arabia - السعودية
  
  // SMSA - سمسا
  smsa: {
    logo: "/logos/smsa.svg",
    colors: {
      primary: "#662D91",
      secondary: "#F05A28"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/hero-smsa.jpg",
    description: "أكبر شركة شحن سعودية رائدة. خدمات التوصيل السريع والحلول اللوجستية المتطورة في جميع أنحاء المملكة"
  },
  
  // Zajil Express - زاجل
  zajil: {
    logo: "/logos/zajil.png",
    colors: {
      primary: "#FDB71A",
      secondary: "#1E3A8A"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/hero-zajil.jpg",
    description: "شركة سعودية رائدة في البريد السريع. خدمات شحن وتوصيل موثوقة مع شبكة واسعة داخل المملكة"
  },
  
  // Naqel Express - ناقل
  naqel: {
    logo: "https://www.naqelexpress.com/images/logo.png",
    colors: {
      primary: "#E61838",
      secondary: "#002E60"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/hero-naqel.jpg",
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة. شبكة توصيل واسعة تغطي جميع مناطق المملكة"
  },
  
  // Saudi Post - البريد السعودي
  saudipost: {
    logo: "/logos/saudipost.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFB81C"
    },
    ogImage: "/og-saudipost.jpg",
    heroImage: "/hero-saudipost.jpg",
    description: "المشغل الوطني للبريد في المملكة العربية السعودية. خدمات بريدية شاملة وحلول شحن محلية ودولية"
  },
  
  // UAE - الإمارات
  
  // Emirates Post - البريد الإماراتي
  empost: {
    logo: "/logos/empost.png",
    colors: {
      primary: "#C8102E",
      secondary: "#00732F"
    },
    ogImage: "/og-empost.jpg",
    heroImage: "/hero-empost.jpg",
    description: "المشغل الوطني للبريد في دولة الإمارات. خدمات بريدية متطورة وحلول لوجستية متكاملة"
  },
  
  // Kuwait - الكويت
  
  // Kuwait Post - البريد الكويتي
  kwpost: {
    logo: "https://www.kwpost.com.kw/images/logo.png",
    colors: {
      primary: "#007A33",
      secondary: "#CE1126"
    },
    ogImage: "/og-kwpost.jpg",
    heroImage: "/hero-kwpost.jpg",
    description: "المشغل الوطني للبريد في دولة الكويت. خدمات بريدية شاملة وحلول شحن موثوقة"
  },
  
  // Qatar - قطر
  
  // Qatar Post - البريد القطري
  qpost: {
    logo: "https://www.qpost.qa/assets/images/logo.png",
    colors: {
      primary: "#8E1838",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/hero-qpost.jpg",
    description: "المشغل الوطني للبريد في دولة قطر. خدمات بريدية حديثة وحلول لوجستية متقدمة"
  },
  
  // Oman - عُمان
  
  // Oman Post - البريد العُماني
  omanpost: {
    logo: "/logos/omanpost.jpg",
    colors: {
      primary: "#ED1C24",
      secondary: "#009639"
    },
    ogImage: "/og-omanpost.jpg",
    heroImage: "/hero-omanpost.jpg",
    description: "المشغل الوطني للبريد في سلطنة عُمان. خدمات بريدية شاملة وحلول شحن محلية ودولية"
  },
  
  // Bahrain - البحرين
  
  // Bahrain Post - البريد البحريني
  bahpost: {
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Bahrain_Post_logo.svg/217px-Bahrain_Post_logo.svg.png",
    colors: {
      primary: "#EF3F32",
      secondary: "#007CC2"
    },
    ogImage: "/og-bahpost.jpg",
    heroImage: "/hero-bahpost.jpg",
    description: "المشغل الوطني للبريد في مملكة البحرين. خدمات بريدية متطورة وحلول لوجستية حديثة"
  },
  
  // Regional Logistics Companies - شركات اللوجستيات الإقليمية
  
  // Al Baraka - البركة
  albaraka: {
    logo: "https://www.albaraka.com/media/1268/logo.png",
    colors: {
      primary: "#D4AF37",
      secondary: "#1A4D2E"
    },
    ogImage: "/og-albaraka.jpg",
    heroImage: "/hero-albaraka.jpg",
    description: "مجموعة البركة - حلول مالية ولوجستية متكاملة. خدمات شحن وبنكية شاملة في دول الخليج"
  },
  
  // Al Futtaim - الفطيم
  alfuttaim: {
    logo: "https://www.alfuttaim.com/assets/images/logo.svg",
    colors: {
      primary: "#00559B",
      secondary: "#E31E24"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/hero-alfuttaim.jpg",
    description: "مجموعة الفطيم - حلول لوجستية متكاملة. شبكة واسعة للشحن والتوزيع وإدارة سلسلة الإمداد"
  },
  
  // Al Shaya - الشايع
  alshaya: {
    logo: "https://www.alshaya.com/assets/images/logo.svg",
    colors: {
      primary: "#D71920",
      secondary: "#000000"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/hero-alshaya.jpg",
    description: "مجموعة الشايع - حلول التوزيع واللوجستيات للتجزئة. خدمات شحن متخصصة لعلامات تجارية متعددة"
  },
  
  // Bahri (National Shipping Company) - البحري
  national: {
    logo: "/logos/bahri.png",
    colors: {
      primary: "#003D7A",
      secondary: "#0078D4"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/hero-bahri.jpg",
    description: "الشركة الوطنية السعودية للنقل البحري (بحري). خدمات شحن بحرية ولوجستيات شاملة محلياً ودولياً"
  },
  bahri: {
    logo: "/logos/bahri.png",
    colors: {
      primary: "#003D7A",
      secondary: "#0078D4"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/hero-bahri.jpg",
    description: "الشركة الوطنية السعودية للنقل البحري (بحري). خدمات شحن بحرية ولوجستيات شاملة محلياً ودولياً"
  },
  
  // ShipCo Transport - شركة الشحن العالمية
  shipco: {
    logo: "https://www.shipco.com/assets/images/logo.svg",
    colors: {
      primary: "#0A5FB4",
      secondary: "#00A8E8"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/hero-shipco.jpg",
    description: "شركة الشحن العالمية - خدمات شحن بحري وجوي متخصصة. حلول لوجستية للمستوردين والمصدرين"
  },
  
  // Hellmann Worldwide Logistics - هايلمان
  hellmann: {
    logo: "https://www.hellmann.com/assets/images/logo.svg",
    colors: {
      primary: "#0C4DA2",
      secondary: "#E30613"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/hero-hellmann.jpg",
    description: "هايلمان العالمية - شبكة دولية للشحن واللوجستيات. خدمات متكاملة للنقل البري والبحري والجوي"
  },
  
  // DSV - دي إس في
  dsv: {
    logo: "/logos/dsv.webp",
    colors: {
      primary: "#002B5C",
      secondary: "#0056B3"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/hero-dsv.jpg",
    description: "دي إس في - حلول شحن ولوجستيات عالمية متطورة. خدمات شحن جوي وبحري وبري مع إدارة متقدمة لسلسلة الإمداد"
  },
  
  // Agility Logistics - الرشاقة
  agility: {
    logo: "https://www.agility.com/wp-content/uploads/agility-logo.svg",
    colors: {
      primary: "#003A63",
      secondary: "#00A8E8"
    },
    ogImage: "/og-jinakum.jpg",
    heroImage: "/hero-jinakum.jpg",
    description: "أجيليتي - خدمات لوجستية وشحن متطورة. حلول سلسلة إمداد واسعة النطاق في المنطقة والعالم"
  },
  
  // Oman Local - عُمان المحلية
  
  // Genacom (Jinaken) - جيناكم
  jinaken: {
    logo: "/og-genacom.jpg",
    colors: {
      primary: "#E82424",
      secondary: "#F7C24A"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/hero-genacom.jpg",
    description: "جيناكم - شركة توصيل عُمانية محلية رائدة. شبكة فروع واسعة مع خدمات تتبع متقدمة داخل السلطنة"
  },
  genacom: {
    logo: "/og-genacom.jpg",
    colors: {
      primary: "#E82424",
      secondary: "#F7C24A"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/hero-genacom.jpg",
    description: "جيناكم - شركة توصيل عُمانية محلية رائدة. شبكة فروع واسعة مع خدمات تتبع متقدمة داخل السلطنة"
  },
  
  // Jinakum - جيناكم (خدمات الدفع)
  jinakum: {
    logo: "/og-jinakum.jpg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-jinakum.jpg",
    heroImage: "/hero-jinakum.jpg",
    description: "جيناكم - خدمات دفع وتحويل آمنة وموثوقة. حلول مالية رقمية متطورة"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "/logos/aramex.svg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/hero-aramex.jpg",
    description: "خدمة شحن موثوقة ومتطورة"
  };
};
