/**
 * Company Metadata Mapping
 * Maps each company to their specific OG meta tags for social sharing
 * تحديث ديناميكي للصورة والعنوان والوصف حسب الشركة
 */

export interface CompanyMeta {
  image: string;
  title: string;
  description: string;
}

const companyMetaMap: Record<string, CompanyMeta> = {
  // UAE - الإمارات
  aramex: {
    image: "/og-aramex.jpg",
    title: "أرامكس - خدمات الشحن السريع",
    description: "شركة أرامكس الرائدة في خدمات الشحن السريع والحلول اللوجستية في المنطقة - تتبع شحنتك وأكمل الدفع بشكل آمن"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "DHL - دي إتش إل للشحن السريع",
    description: "دي إتش إل - شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي مع تتبع فوري للشحنات"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "FedEx - فيديكس للشحن الدولي",
    description: "فيديكس - خدمات شحن دولية موثوقة مع تتبع فوري للشحنات وضمان الوصول في الوقت المحدد"
  },
  ups: {
    image: "/og-ups.jpg",
    title: "UPS - يو بي إس للشحن",
    description: "شركة UPS الأمريكية الرائدة في خدمات الشحن والتوصيل العالمي مع حلول لوجستية متكاملة"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "البريد الإماراتي - خدمات بريدية متميزة",
    description: "البريد الإماراتي - المشغل الوطني للبريد في دولة الإمارات العربية المتحدة مع خدمات شحن محلية ودولية"
  },

  // Saudi Arabia - السعودية
  smsa: {
    image: "/og-smsa.jpg",
    title: "SMSA Express - سمسا إكسبريس",
    description: "SMSA Express - شركة سمسا للشحن والتوصيل السريع في المملكة العربية السعودية مع شبكة توزيع واسعة"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "زاجل - خدمات الشحن السعودي",
    description: "شركة زاجل لخدمات الشحن والتوصيل في المملكة العربية السعودية - حلول لوجستية متكاملة وموثوقة"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "ناقل إكسبريس - الشحن السريع",
    description: "شركة ناقل اكسبرس لخدمات الشحن والتوصيل السريع - تغطية شاملة لجميع مدن ومناطق المملكة"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "البريد السعودي - الخدمات البريدية",
    description: "البريد السعودي - المشغل الوطني للبريد في المملكة العربية السعودية مع خدمات شحن محلية ودولية"
  },

  // Kuwait - الكويت
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "البريد الكويتي - خدمات بريدية",
    description: "البريد الكويتي - المشغل الوطني للبريد في دولة الكويت مع خدمات شحن محلية ودولية موثوقة"
  },
  dhlkw: {
    image: "/og-dhl.jpg",
    title: "DHL الكويت - الشحن السريع",
    description: "دي إتش إل الكويت - خدمات الشحن السريع والتوصيل الدولي في دولة الكويت"
  },

  // Qatar - قطر
  qpost: {
    image: "/og-qpost.jpg",
    title: "البريد القطري - خدمات بريدية متميزة",
    description: "البريد القطري - المشغل الوطني للبريد في دولة قطر مع خدمات شحن وتوصيل محلية ودولية"
  },
  dhlqa: {
    image: "/og-dhl.jpg",
    title: "DHL قطر - الشحن السريع",
    description: "دي إتش إل قطر - خدمات الشحن السريع والتوصيل الدولي في دولة قطر"
  },

  // Oman - عمان
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "البريد العُماني - خدمات بريدية",
    description: "البريد العُماني - المشغل الوطني للبريد في سلطنة عُمان مع خدمات شحن محلية ودولية"
  },
  dhlom: {
    image: "/og-dhl.jpg",
    title: "DHL عمان - الشحن السريع",
    description: "دي إتش إل عُمان - خدمات الشحن السريع والتوصيل الدولي في سلطنة عُمان"
  },

  // Bahrain - البحرين
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "البريد البحريني - خدمات بريدية",
    description: "البريد البحريني - المشغل الوطني للبريد في مملكة البحرين مع خدمات شحن محلية ودولية"
  },
  dhlbh: {
    image: "/og-dhl.jpg",
    title: "DHL البحرين - الشحن السريع",
    description: "دي إتش إل البحرين - خدمات الشحن السريع والتوصيل الدولي في مملكة البحرين"
  },

  // Jinakum Company
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "جينا كم - خدمات الشحن",
    description: "شركة جينا كم لخدمات الشحن والتوصيل - حلول لوجستية مبتكرة وموثوقة في منطقة الخليج"
  },

  // Jinaken Company
  jinaken: {
    image: "/og-jinaken.jpg",
    title: "جينا كن - خدمات الشحن",
    description: "شركة جينا كن لخدمات الشحن والتوصيل - خدمات لوجستية متطورة في منطقة الخليج العربي"
  },

  // Additional GCC Companies
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "البركة للشحن - خدمات لوجستية",
    description: "شركة البركة للشحن - خدمات شحن وتوصيل متميزة في دول الخليج العربي مع حلول لوجستية متكاملة"
  },
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "الفطيم للشحن - حلول لوجستية",
    description: "مجموعة الفطيم للخدمات اللوجستية - حلول شحن وتوزيع احترافية في منطقة الخليج والشرق الأوسط"
  },
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "الشايع للشحن - خدمات توزيع",
    description: "مجموعة الشايع للخدمات اللوجستية - شبكة توزيع واسعة وخدمات شحن احترافية في منطقة الخليج"
  },
  shipco: {
    image: "/og-shipco.jpg",
    title: "شيبكو - الشحن الدولي",
    description: "شركة شيبكو للشحن الدولي - خدمات نقل بحري وجوي وبري مع حلول لوجستية متكاملة عالمياً"
  },
  national: {
    image: "/og-bahri.jpg",
    title: "الوطنية للشحن - خدمات بحرية",
    description: "الشركة الوطنية للشحن - خدمات شحن بحري ولوجستية متطورة في منطقة الخليج العربي"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "بحري - الشحن البحري",
    description: "شركة بحري السعودية - الرائدة في خدمات النقل البحري والحلول اللوجستية في المنطقة"
  },
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "هيلمان العالمية - خدمات لوجستية",
    description: "شركة هيلمان العالمية للخدمات اللوجستية - حلول شحن دولية احترافية مع تغطية عالمية"
  },
  dsv: {
    image: "/og-dsv.jpg",
    title: "DSV - الخدمات اللوجستية",
    description: "شركة DSV للخدمات اللوجستية - حلول نقل وشحن دولية متكاملة مع شبكة عالمية واسعة"
  },
  agility: {
    image: "/og-aramex.jpg",
    title: "أجيليتي - سلسلة التوريد",
    description: "شركة أجيليتي للخدمات اللوجستية - حلول سلسلة التوريد المتكاملة في منطقة الخليج والعالم"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "جيناكوم - خدمات الشحن",
    description: "شركة جيناكوم للشحن - خدمات لوجستية وشحن سريعة وموثوقة في منطقة الخليج العربي"
  },

  // Default fallback for unknown companies
  default: {
    image: "/og-aramex.jpg",
    title: "نظام الدفع الآمن - خليج",
    description: "نظام دفع آمن ومحمي لإتمام معاملاتك المالية بكل ثقة وأمان - منصة الدفع الموحدة للخليج"
  }
};

/**
 * Get absolute URL for image
 */
function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const productionDomain = typeof window !== 'undefined'
    ? window.location.origin
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://admirable-chimera-68f58f.netlify.app');
  
  return `${productionDomain}${imagePath}`;
}

/**
 * Get company metadata with fallback and absolute URLs
 * @param companyKey - Company identifier (e.g., 'dhl', 'aramex')
 * @returns Company metadata object with absolute image URL
 */
export const getCompanyMeta = (companyKey: string): CompanyMeta => {
  if (!companyKey) {
    const defaultMeta = companyMetaMap.default;
    return {
      ...defaultMeta,
      image: getAbsoluteImageUrl(defaultMeta.image)
    };
  }

  const key = companyKey.toLowerCase();
  const meta = companyMetaMap[key] || companyMetaMap.default;
  
  return {
    ...meta,
    image: getAbsoluteImageUrl(meta.image)
  };
};
