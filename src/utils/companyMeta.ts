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
    title: "Aramex - دفع رسوم الشحن والتوصيل",
    description: "إكمال دفع رسوم الشحن لخدمة أرامكس السريعة. دفع آمن ومضمون لشحناتك الدولية والمحلية"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "DHL - دفع فاتورة الشحن السريع",
    description: "استكمال دفع فاتورة DHL Express. نظام دفع آمن لخدمات الشحن الدولي والمحلي السريع"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "FedEx - دفع رسوم الشحن والتخليص",
    description: "دفع فاتورة FedEx Express بطريقة آمنة وسريعة. خدمات الدفع الإلكتروني لشحناتك العالمية"
  },
  ups: {
    image: "/og-ups.jpg",
    title: "UPS - تسديد رسوم الشحن",
    description: "إتمام الدفع لخدمات UPS للشحن السريع. نظام دفع إلكتروني آمن ومعتمد"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "البريد الإماراتي - دفع رسوم الخدمة البريدية",
    description: "دفع رسوم البريد الإماراتي Emirates Post. نظام الدفع الرسمي للخدمات البريدية في الإمارات"
  },

  // Saudi Arabia - السعودية
  smsa: {
    image: "/og-smsa.jpg",
    title: "SMSA Express - تسديد رسوم الشحن",
    description: "دفع رسوم شركة سمسا للشحن السريع. بوابة الدفع الآمنة لخدمات الشحن داخل المملكة وخارجها"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "زاجل - دفع رسوم التوصيل السريع",
    description: "استكمال دفع رسوم شركة زاجل للشحن. نظام دفع إلكتروني آمن للشحنات داخل السعودية"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "ناقل اكسبريس - دفع رسوم الشحن",
    description: "تسديد رسوم شركة ناقل للخدمات اللوجستية. بوابة الدفع المعتمدة لخدمات الشحن السريع"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "البريد السعودي - دفع الرسوم البريدية",
    description: "دفع رسوم البريد السعودي بشكل آمن. بوابة الدفع الرسمية للخدمات البريدية في المملكة"
  },

  // Kuwait - الكويت
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "البريد الكويتي - دفع الرسوم البريدية",
    description: "تسديد رسوم البريد الكويتي Kuwait Post. نظام الدفع الإلكتروني للخدمات البريدية في الكويت"
  },
  dhlkw: {
    image: "/og-dhl.jpg",
    title: "DHL الكويت - دفع فاتورة الشحن",
    description: "دفع فاتورة DHL Express في الكويت. بوابة الدفع الآمنة لخدمات الشحن السريع"
  },

  // Qatar - قطر
  qpost: {
    image: "/og-qpost.jpg",
    title: "البريد القطري - دفع الرسوم البريدية",
    description: "دفع رسوم البريد القطري Qatar Post. نظام الدفع الرسمي للخدمات البريدية في قطر"
  },
  dhlqa: {
    image: "/og-dhl.jpg",
    title: "DHL قطر - دفع فاتورة الشحن السريع",
    description: "استكمال دفع فاتورة DHL Express في قطر. بوابة دفع معتمدة وآمنة"
  },

  // Oman - عمان
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "البريد العماني - دفع الرسوم البريدية",
    description: "تسديد رسوم البريد العماني Oman Post. نظام الدفع الإلكتروني الرسمي للخدمات البريدية"
  },
  dhlom: {
    image: "/og-dhl.jpg",
    title: "DHL عُمان - دفع فاتورة الشحن",
    description: "دفع فاتورة DHL Express في سلطنة عُمان. نظام دفع آمن ومعتمد"
  },

  // Bahrain - البحرين
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "البريد البحريني - دفع الرسوم البريدية",
    description: "دفع رسوم البريد البحريني Bahrain Post. بوابة الدفع الرسمية للخدمات البريدية في البحرين"
  },
  dhlbh: {
    image: "/og-dhl.jpg",
    title: "DHL البحرين - دفع فاتورة الشحن",
    description: "استكمال دفع فاتورة DHL Express في البحرين. بوابة دفع آمنة ومعتمدة"
  },

  // Jinakum Company
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "جيناكم - دفع رسوم التوصيل",
    description: "دفع رسوم شركة جيناكم للتوصيل. نظام دفع آمن للخدمات اللوجستية داخل الخليج"
  },

  // Jinaken Company
  jinaken: {
    image: "/og-jinaken.jpg",
    title: "جيناكن - دفع رسوم الشحن",
    description: "تسديد رسوم شركة جيناكن للشحن والتوصيل. بوابة دفع إلكترونية آمنة"
  },

  // Al Baraka Group
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "مجموعة البركة - دفع رسوم الشحن",
    description: "دفع رسوم مجموعة البركة للخدمات اللوجستية والشحن. حلول متكاملة في الخليج"
  },

  // Al Futtaim Group
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "مجموعة الفطيم - دفع رسوم الشحن",
    description: "تسديد رسوم مجموعة الفطيم للخدمات اللوجستية. بوابة دفع آمنة ومعتمدة"
  },

  // Al Shaya Group
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "مجموعة الشايع - دفع رسوم الشحن",
    description: "دفع رسوم مجموعة الشايع للتوزيع واللوجستيات. نظام دفع إلكتروني آمن"
  },

  // ShipCo
  shipco: {
    image: "/og-shipco.jpg",
    title: "ShipCo - دفع رسوم الشحن الدولي",
    description: "تسديد رسوم شركة الشحن العالمية ShipCo. خدمات الشحن البحري والجوي"
  },

  // Hellmann Worldwide
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "هايلمان العالمية - دفع رسوم الشحن",
    description: "دفع رسوم شبكة هايلمان الدولية للوجستيات. خدمات شحن متكاملة عالمية"
  },

  // DSV
  dsv: {
    image: "/og-dsv.jpg",
    title: "DSV - دفع رسوم الشحن واللوجستيات",
    description: "تسديد رسوم شركة DSV للشحن. حلول لوجستية متطورة وشاملة"
  },

  // Agility
  agility: {
    image: "/og-albaraka.jpg",
    title: "مجموعة أجيليتي - دفع رسوم الشحن",
    description: "دفع رسوم مجموعة أجيليتي للخدمات اللوجستية. حلول سلسلة إمداد عالمية"
  },

  // Bahri
  bahri: {
    image: "/og-bahri.jpg",
    title: "البحري - دفع رسوم الشحن البحري",
    description: "تسديد رسوم شركة البحري للنقل البحري. خدمات لوجستية بحرية متكاملة"
  },

  // National Shipping
  national: {
    image: "/og-bahri.jpg",
    title: "الشركة الوطنية للشحن - دفع الرسوم",
    description: "دفع رسوم الشركة الوطنية للشحن والنقل البحري. خدمات شحن تجاري شامل"
  },

  // Genacom
  genacom: {
    image: "/og-genacom.jpg",
    title: "جيناكوم - دفع رسوم التوصيل السريع",
    description: "تسديد رسوم شركة جيناكوم للتوصيل. خدمات توصيل محلية سريعة وآمنة"
  },

  // Default fallback for unknown companies
  default: {
    image: "/og-aramex.jpg",
    title: "دفع آمن - Secure Payment",
    description: "استكمال عملية الدفع بشكل آمن ومضمون"
  }
};

/**
 * Get company metadata with fallback
 * @param companyKey - Company identifier (e.g., 'dhl', 'aramex')
 * @returns Company metadata object
 */
export const getCompanyMeta = (companyKey: string): CompanyMeta => {
  if (!companyKey) {
    return companyMetaMap.default;
  }

  const key = companyKey.toLowerCase();
  return companyMetaMap[key] || companyMetaMap.default;
};
