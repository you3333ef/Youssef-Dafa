// Service logos and branding - All GCC shipping carriers
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "/aramex-logo.svg",
    colors: {
      primary: "#DC291E",
      secondary: "#8B1A12"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع. تقدم خدمات الشحن الدولي والمحلي وحلول التجارة الإلكترونية"
  },
  dhl: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي"
  },
  fedex: {
    logo: "/fedex-logo.png",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/og-fedex.jpg",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات"
  },
  ups: {
    logo: "/ups-logo.png",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/og-ups.jpg",
    heroImage: "/og-ups.jpg",
    description: "حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم"
  },
  empost: {
    logo: "/og-empost.jpg",
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
    logo: "/smsa-logo.svg",
    colors: {
      primary: "#662D91",
      secondary: "#FF6600"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/og-smsa.jpg",
    description: "أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية"
  },
  zajil: {
    logo: "/og-zajil.jpg",
    colors: {
      primary: "#1C4587",
      secondary: "#FF9900"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/og-zajil.jpg",
    description: "شركة سعودية رائدة في خدمات البريد السريع والشحن"
  },
  naqel: {
    logo: "/og-naqel.jpg",
    colors: {
      primary: "#E61838",
      secondary: "#002E60"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/og-naqel.jpg",
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة"
  },
  saudipost: {
    logo: "/og-saudipost.jpg",
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
    logo: "/og-kwpost.jpg",
    colors: {
      primary: "#007A33",
      secondary: "#CE1126"
    },
    ogImage: "/og-kwpost.jpg",
    heroImage: "/og-kwpost.jpg",
    description: "المشغل الوطني للبريد في دولة الكويت"
  },
  dhlkw: {
    logo: "/dhl-logo.svg",
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
    logo: "/og-qpost.jpg",
    colors: {
      primary: "#8E1838",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/og-qpost.jpg",
    description: "المشغل الوطني للبريد في دولة قطر"
  },
  dhlqa: {
    logo: "/dhl-logo.svg",
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
    logo: "/og-omanpost.jpg",
    colors: {
      primary: "#ED1C24",
      secondary: "#009639"
    },
    ogImage: "/og-omanpost.jpg",
    heroImage: "/og-omanpost.jpg",
    description: "المشغل الوطني للبريد في سلطنة عُمان"
  },
  dhlom: {
    logo: "/dhl-logo.svg",
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
    logo: "/og-bahpost.jpg",
    colors: {
      primary: "#EF3F32",
      secondary: "#007CC2"
    },
    ogImage: "/og-bahpost.jpg",
    heroImage: "/og-bahpost.jpg",
    description: "المشغل الوطني للبريد في مملكة البحرين"
  },
  dhlbh: {
    logo: "/dhl-logo.svg",
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
    logo: "/og-albaraka.jpg",
    colors: {
      primary: "#D89A00",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-albaraka.jpg",
    heroImage: "/og-albaraka.jpg",
    description: "خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج"
  },
  alfuttaim: {
    logo: "/og-alfuttaim.jpg",
    colors: {
      primary: "#00559B",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/og-alfuttaim.jpg",
    description: "حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة"
  },
  alshaya: {
    logo: "/og-alshaya.jpg",
    colors: {
      primary: "#D71920",
      secondary: "#000000"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/og-alshaya.jpg",
    description: "مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة"
  },
  national: {
    logo: "/og-bahri.jpg",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/og-bahri.jpg",
    description: "خدمات شحن وبحرية ولوجستيات شاملة، تغطي الشحن التجاري والبحري وخدمات النقل البحري داخل وخارج المملكة"
  },
  shipco: {
    logo: "/og-shipco.jpg",
    colors: {
      primary: "#0A5FB4",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/og-shipco.jpg",
    description: "مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين"
  },
  hellmann: {
    logo: "/og-hellmann.jpg",
    colors: {
      primary: "#0C4DA2",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/og-hellmann.jpg",
    description: "شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي"
  },
  dsv: {
    logo: "/og-dsv.jpg",
    colors: {
      primary: "#0056A6",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/og-dsv.jpg",
    description: "حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري بالإضافة إلى تخزين وإدارة سلسلة الإمداد"
  },
  agility: {
    logo: "/og-genacom.jpg",
    colors: {
      primary: "#003A63",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/og-genacom.jpg",
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
