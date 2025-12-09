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
  // International Carriers - الشركات العالمية
  
  // Aramex - أرامكس
  aramex: {
    image: "/og-aramex.jpg",
    title: "أرامكس - دفع آمن للشحنات | Aramex Payment",
    description: "أكمل دفع شحنتك مع أرامكس بطريقة آمنة وسريعة. خدمات شحن عالمية موثوقة مع تتبع متقدم | Secure payment for Aramex shipping services"
  },
  
  // DHL - دي إتش إل
  dhl: {
    image: "/og-dhl.jpg",
    title: "دي إتش إل - دفع فواتير الشحن | DHL Express Payment",
    description: "ادفع فاتورة شحنة دي إتش إل بسهولة وأمان. الشبكة العالمية الأولى للتوصيل السريع | Pay your DHL invoice quickly and securely"
  },
  dhlkw: {
    image: "/og-dhl.jpg",
    title: "دي إتش إل الكويت - دفع آمن | DHL Kuwait Payment",
    description: "خدمات دي إتش إل في الكويت - ادفع فاتورتك بسهولة وأمان | DHL Kuwait express delivery payment"
  },
  dhlqa: {
    image: "/og-dhl.jpg",
    title: "دي إتش إل قطر - دفع آمن | DHL Qatar Payment",
    description: "خدمات دي إتش إل في قطر - ادفع فاتورتك بسهولة وأمان | DHL Qatar express delivery payment"
  },
  dhlom: {
    image: "/og-dhl.jpg",
    title: "دي إتش إل عُمان - دفع آمن | DHL Oman Payment",
    description: "خدمات دي إتش إل في عُمان - ادفع فاتورتك بسهولة وأمان | DHL Oman express delivery payment"
  },
  dhlbh: {
    image: "/og-dhl.jpg",
    title: "دي إتش إل البحرين - دفع آمن | DHL Bahrain Payment",
    description: "خدمات دي إتش إل في البحرين - ادفع فاتورتك بسهولة وأمان | DHL Bahrain express delivery payment"
  },
  
  // FedEx - فيديكس
  fedex: {
    image: "/og-fedex.jpg",
    title: "فيديكس - دفع خدمات الشحن | FedEx Payment",
    description: "ادفع فاتورة فيديكس بسرعة وأمان. خدمات شحن دولية موثوقة مع تتبع فوري | Secure FedEx payment portal"
  },
  
  // UPS - يو بي إس
  ups: {
    image: "/og-ups.jpg",
    title: "يو بي إس - دفع خدمات الشحن | UPS Payment",
    description: "أكمل دفع شحنة يو بي إس بأمان. حلول لوجستية عالمية متكاملة | Pay your UPS shipping invoice securely"
  },
  
  // Saudi Arabia - السعودية
  
  // SMSA - سمسا
  smsa: {
    image: "/og-smsa.jpg",
    title: "سمسا إكسبريس - دفع الشحنات | SMSA Express Payment",
    description: "ادفع شحنتك مع سمسا إكسبريس بأمان. أكبر شركة شحن سعودية رائدة في التوصيل السريع | SMSA Express secure payment"
  },
  
  // Zajil Express - زاجل
  zajil: {
    image: "/og-zajil.jpg",
    title: "زاجل إكسبريس - دفع آمن للشحنات | Zajil Payment",
    description: "خدمات زاجل للبريد السريع - ادفع فاتورتك بسهولة وأمان. شركة سعودية رائدة | Zajil Express secure payment"
  },
  
  // Naqel Express - ناقل
  naqel: {
    image: "/og-naqel.jpg",
    title: "ناقل إكسبريس - دفع خدمات الشحن | Naqel Payment",
    description: "أكمل دفع شحنتك مع ناقل إكسبريس. حلول شحن متطورة وخدمات لوجستية متكاملة | Naqel Express payment portal"
  },
  
  // Saudi Post - البريد السعودي
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "البريد السعودي - دفع الخدمات البريدية | Saudi Post Payment",
    description: "ادفع خدمات البريد السعودي بأمان. المشغل الوطني للبريد في المملكة | Saudi Post secure payment portal"
  },
  
  // UAE - الإمارات
  
  // Emirates Post - البريد الإماراتي
  empost: {
    image: "/og-empost.jpg",
    title: "البريد الإماراتي - دفع الخدمات | Emirates Post Payment",
    description: "خدمات البريد الإماراتي - ادفع فاتورتك بسهولة وأمان. المشغل الوطني للبريد | Emirates Post secure payment"
  },
  
  // Kuwait - الكويت
  
  // Kuwait Post - البريد الكويتي
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "البريد الكويتي - دفع الخدمات البريدية | Kuwait Post Payment",
    description: "ادفع خدمات البريد الكويتي بأمان. المشغل الوطني للبريد في الكويت | Kuwait Post payment portal"
  },
  
  // Qatar - قطر
  
  // Qatar Post - البريد القطري
  qpost: {
    image: "/og-qpost.jpg",
    title: "البريد القطري - دفع الخدمات البريدية | Qatar Post Payment",
    description: "خدمات البريد القطري - ادفع فاتورتك بسهولة وأمان. المشغل الوطني للبريد | Qatar Post secure payment"
  },
  
  // Oman - عُمان
  
  // Oman Post - البريد العُماني
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "البريد العُماني - دفع الخدمات البريدية | Oman Post Payment",
    description: "ادفع خدمات البريد العُماني بأمان. المشغل الوطني للبريد في سلطنة عُمان | Oman Post payment portal"
  },
  
  // Bahrain - البحرين
  
  // Bahrain Post - البريد البحريني
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "البريد البحريني - دفع الخدمات البريدية | Bahrain Post Payment",
    description: "خدمات البريد البحريني - ادفع فاتورتك بسهولة وأمان. المشغل الوطني للبريد | Bahrain Post secure payment"
  },
  
  // Regional Logistics - اللوجستيات الإقليمية
  
  // Al Baraka - البركة
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "مجموعة البركة - خدمات الشحن واللوجستيات | Al Baraka Payment",
    description: "حلول مالية ولوجستية متكاملة من مجموعة البركة. ادفع بأمان | Al Baraka Group logistics payment"
  },
  
  // Al Futtaim - الفطيم
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "مجموعة الفطيم - خدمات اللوجستيات | Al Futtaim Logistics Payment",
    description: "حلول لوجستية متكاملة من مجموعة الفطيم. ادفع خدمات الشحن بأمان | Al Futtaim Group payment"
  },
  
  // Al Shaya - الشايع
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "مجموعة الشايع - خدمات الشحن والتوزيع | Al Shaya Payment",
    description: "حلول التوزيع واللوجستيات من مجموعة الشايع. ادفع بأمان | Al Shaya Group logistics payment"
  },
  
  // Bahri / National Shipping - بحري
  national: {
    image: "/og-bahri.jpg",
    title: "الشركة الوطنية للنقل البحري - بحري | Bahri Payment",
    description: "خدمات الشحن البحري من بحري. ادفع فاتورتك بأمان | Bahri National Shipping Company payment"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "الشركة الوطنية للنقل البحري - بحري | Bahri Payment",
    description: "خدمات الشحن البحري من بحري. ادفع فاتورتك بأمان | Bahri National Shipping Company payment"
  },
  
  // ShipCo - شركة الشحن العالمية
  shipco: {
    image: "/og-shipco.jpg",
    title: "شركة الشحن العالمية - دفع خدمات الشحن | ShipCo Payment",
    description: "خدمات الشحن البحري والجوي من شركة الشحن العالمية. ادفع بأمان | ShipCo Transport payment"
  },
  
  // Hellmann - هايلمان
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "هايلمان العالمية - خدمات اللوجستيات | Hellmann Payment",
    description: "حلول الشحن واللوجستيات الدولية من هايلمان. ادفع فاتورتك بأمان | Hellmann Worldwide Logistics payment"
  },
  
  // DSV - دي إس في
  dsv: {
    image: "/og-dsv.jpg",
    title: "دي إس في - حلول الشحن واللوجستيات | DSV Payment",
    description: "خدمات الشحن العالمية من دي إس في. ادفع فاتورتك بأمان | DSV Global Logistics payment"
  },
  
  // Agility - أجيليتي
  agility: {
    image: "/og-jinakum.jpg",
    title: "أجيليتي - خدمات اللوجستيات المتطورة | Agility Payment",
    description: "حلول سلسلة الإمداد واللوجستيات من أجيليتي. ادفع بأمان | Agility Logistics payment"
  },
  
  // Genacom / Jinaken - جيناكم
  jinaken: {
    image: "/og-genacom.jpg",
    title: "جيناكم - خدمات التوصيل في عُمان | Genacom Payment",
    description: "شركة جيناكم للتوصيل السريع في عُمان. ادفع شحنتك بأمان | Genacom Oman delivery payment"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "جيناكم - خدمات التوصيل في عُمان | Genacom Payment",
    description: "شركة جيناكم للتوصيل السريع في عُمان. ادفع شحنتك بأمان | Genacom Oman delivery payment"
  },
  
  // Jinakum - جيناكم (خدمات الدفع)
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "جيناكم - خدمات الدفع الآمنة | Jinakum Payment",
    description: "خدمات الدفع والتحويل الآمنة من جيناكم. حلول مالية رقمية موثوقة | Jinakum secure payment services"
  },

  // Default fallback for unknown companies
  default: {
    image: "/og-aramex.jpg",
    title: "دفع آمن ومحمي | Secure Payment Portal",
    description: "أكمل عملية الدفع بأمان وسهولة. نظام دفع محمي بأحدث تقنيات التشفير | Complete your payment securely with advanced encryption"
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
