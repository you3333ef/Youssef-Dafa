export interface CompanyMeta {
  image: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  keywords: string[];
  color: string;
}

const companyMetaMap: Record<string, CompanyMeta> = {
  aramex: {
    image: "/og-images/og-aramex.svg",
    title: "Aramex Payment - Pay Shipping Services",
    titleAr: "دفع أرامكس - خدمات الشحن والتوصيل",
    description: "Pay your Aramex shipping invoices securely online. Fast, reliable logistics and courier services.",
    descriptionAr: "ادفع فواتير الشحن الخاصة بك مع أرامكس بأمان. خدمات لوجستية وشحن سريعة وموثوقة.",
    keywords: ["aramex", "أرامكس", "shipping", "شحن", "courier", "logistics", "payment", "دفع"],
    color: "#DC291E"
  },
  
  dhl: {
    image: "/og-images/og-dhl.svg",
    title: "DHL Payment - Express Shipping Services",
    titleAr: "دفع دي إتش إل - خدمات الشحن السريع",
    description: "Pay DHL invoices online. Global express shipping and logistics solutions.",
    descriptionAr: "ادفع فواتير دي إتش إل عبر الإنترنت. حلول شحن عالمية سريعة.",
    keywords: ["dhl", "دي إتش إل", "express", "شحن سريع", "shipping", "logistics"],
    color: "#FFCC00"
  },
  
  fedex: {
    image: "/og-images/og-fedex.svg",
    title: "FedEx Payment - International Shipping",
    titleAr: "دفع فيديكس - الشحن الدولي",
    description: "Pay FedEx shipping services online. Reliable international courier and logistics.",
    descriptionAr: "ادفع خدمات الشحن فيديكس عبر الإنترنت. خدمات لوجستية دولية موثوقة.",
    keywords: ["fedex", "فيديكس", "international shipping", "شحن دولي", "courier"],
    color: "#4D148C"
  },
  
  ups: {
    image: "/og-images/og-ups.svg",
    title: "UPS Payment - Global Logistics",
    titleAr: "دفع يو بي إس - لوجستيات عالمية",
    description: "Pay UPS shipping invoices securely. Worldwide delivery and logistics services.",
    descriptionAr: "ادفع فواتير يو بي إس بأمان. خدمات توصيل ولوجستيات عالمية.",
    keywords: ["ups", "يو بي إس", "global shipping", "شحن عالمي", "logistics"],
    color: "#351C15"
  },
  
  smsa: {
    image: "/og-images/og-smsa.svg",
    title: "SMSA Express Payment - Saudi Shipping",
    titleAr: "دفع سمسا إكسبرس - الشحن السعودي",
    description: "Pay SMSA Express services online. Leading Saudi shipping and logistics company.",
    descriptionAr: "ادفع خدمات سمسا إكسبرس عبر الإنترنت. الشركة السعودية الرائدة في الشحن.",
    keywords: ["smsa", "سمسا", "saudi shipping", "شحن سعودي", "express delivery"],
    color: "#662D91"
  },
  
  naqel: {
    image: "/og-images/og-naqel.svg",
    title: "NAQEL Express Payment - Saudi Logistics",
    titleAr: "دفع ناقل إكسبرس - لوجستيات سعودية",
    description: "Pay NAQEL shipping services. Advanced logistics solutions in Saudi Arabia.",
    descriptionAr: "ادفع خدمات ناقل للشحن. حلول لوجستية متقدمة في السعودية.",
    keywords: ["naqel", "ناقل", "saudi logistics", "شحن سعودي"],
    color: "#E61838"
  },
  
  zajil: {
    image: "/og-images/og-zajil.svg",
    title: "Zajil Express Payment - Saudi Courier",
    titleAr: "دفع زاجل إكسبرس - البريد السعودي السريع",
    description: "Pay Zajil Express services. Leading Saudi express mail and courier company.",
    descriptionAr: "ادفع خدمات زاجل إكسبرس. شركة سعودية رائدة في البريد السريع.",
    keywords: ["zajil", "زاجل", "saudi courier", "بريد سريع"],
    color: "#1C4587"
  },
  
  saudipost: {
    image: "/og-images/og-saudipost.svg",
    title: "Saudi Post Payment - National Postal Service",
    titleAr: "دفع البريد السعودي - الخدمة البريدية الوطنية",
    description: "Pay Saudi Post services. National postal operator of Saudi Arabia.",
    descriptionAr: "ادفع خدمات البريد السعودي. المشغل البريدي الوطني للمملكة.",
    keywords: ["saudi post", "البريد السعودي", "postal service", "خدمات بريدية"],
    color: "#006C35"
  },
  
  empost: {
    image: "/og-images/og-empost.svg",
    title: "Emirates Post Payment - UAE Postal Service",
    titleAr: "دفع البريد الإماراتي - الخدمة البريدية الإماراتية",
    description: "Pay Emirates Post services. National postal operator of the UAE.",
    descriptionAr: "ادفع خدمات البريد الإماراتي. المشغل البريدي الوطني للإمارات.",
    keywords: ["emirates post", "البريد الإماراتي", "uae postal", "بريد الإمارات"],
    color: "#C8102E"
  },
  
  qpost: {
    image: "/og-images/og-qpost.svg",
    title: "Qatar Post Payment - Qatar Postal Service",
    titleAr: "دفع البريد القطري - الخدمة البريدية القطرية",
    description: "Pay Qatar Post services. National postal operator of Qatar.",
    descriptionAr: "ادفع خدمات البريد القطري. المشغل البريدي الوطني لقطر.",
    keywords: ["qatar post", "البريد القطري", "qatar postal", "بريد قطر"],
    color: "#8E1838"
  },
  
  kwpost: {
    image: "/og-images/og-kwpost.svg",
    title: "Kuwait Post Payment - Kuwait Postal Service",
    titleAr: "دفع البريد الكويتي - الخدمة البريدية الكويتية",
    description: "Pay Kuwait Post services. National postal operator of Kuwait.",
    descriptionAr: "ادفع خدمات البريد الكويتي. المشغل البريدي الوطني للكويت.",
    keywords: ["kuwait post", "البريد الكويتي", "kuwait postal", "بريد الكويت"],
    color: "#007A33"
  },
  
  omanpost: {
    image: "/og-images/og-omanpost.svg",
    title: "Oman Post Payment - Oman Postal Service",
    titleAr: "دفع البريد العُماني - الخدمة البريدية العُمانية",
    description: "Pay Oman Post services. National postal operator of Oman.",
    descriptionAr: "ادفع خدمات البريد العُماني. المشغل البريدي الوطني لعُمان.",
    keywords: ["oman post", "البريد العماني", "oman postal", "بريد عمان"],
    color: "#ED1C24"
  },
  
  bahpost: {
    image: "/og-images/og-bahpost.svg",
    title: "Bahrain Post Payment - Bahrain Postal Service",
    titleAr: "دفع البريد البحريني - الخدمة البريدية البحرينية",
    description: "Pay Bahrain Post services. National postal operator of Bahrain.",
    descriptionAr: "ادفع خدمات البريد البحريني. المشغل البريدي الوطني للبحرين.",
    keywords: ["bahrain post", "البريد البحريني", "bahrain postal", "بريد البحرين"],
    color: "#EF3F32"
  },
  
  albaraka: {
    image: "/og-images/og-albaraka.svg",
    title: "Al Baraka Payment - Integrated Services",
    titleAr: "دفع مجموعة البركة - خدمات متكاملة",
    description: "Pay Al Baraka services. Integrated financial and logistics solutions.",
    descriptionAr: "ادفع خدمات مجموعة البركة. حلول مالية ولوجستية متكاملة.",
    keywords: ["al baraka", "البركة", "financial services", "خدمات مالية"],
    color: "#E32119"
  },
  
  alfuttaim: {
    image: "/og-images/og-alfuttaim.svg",
    title: "Al-Futtaim Payment - Logistics Solutions",
    titleAr: "دفع مجموعة الفطيم - حلول لوجستية",
    description: "Pay Al-Futtaim logistics services. Integrated supply chain solutions.",
    descriptionAr: "ادفع خدمات الفطيم اللوجستية. حلول سلسلة إمداد متكاملة.",
    keywords: ["al futtaim", "الفطيم", "logistics", "لوجستيات"],
    color: "#004C99"
  },
  
  alshaya: {
    image: "/og-images/og-alshaya.svg",
    title: "Alshaya Payment - Distribution Services",
    titleAr: "دفع مجموعة الشايع - خدمات التوزيع",
    description: "Pay Alshaya services. Multi-brand distribution and logistics solutions.",
    descriptionAr: "ادفع خدمات الشايع. حلول توزيع ولوجستيات متعددة العلامات.",
    keywords: ["alshaya", "الشايع", "distribution", "توزيع"],
    color: "#1A1A1A"
  },
  
  shipco: {
    image: "/og-images/og-shipco.svg",
    title: "ShipCo Payment - Global Shipping",
    titleAr: "دفع شركة الشحن العالمية - شحن عالمي",
    description: "Pay ShipCo services. International and local shipping solutions.",
    descriptionAr: "ادفع خدمات شركة الشحن العالمية. حلول شحن دولية ومحلية.",
    keywords: ["shipco", "الشحن العالمية", "global shipping", "شحن دولي"],
    color: "#003087"
  },
  
  hellmann: {
    image: "/og-images/og-hellmann.svg",
    title: "Hellmann Payment - Worldwide Logistics",
    titleAr: "دفع هايلمان - لوجستيات عالمية",
    description: "Pay Hellmann services. International logistics and freight forwarding.",
    descriptionAr: "ادفع خدمات هايلمان. لوجستيات دولية وشحن بري وبحري.",
    keywords: ["hellmann", "هايلمان", "worldwide logistics", "لوجستيات عالمية"],
    color: "#E32119"
  },
  
  dsv: {
    image: "/og-images/og-dsv.svg",
    title: "DSV Payment - Transport & Logistics",
    titleAr: "دفع دي إس في - نقل ولوجستيات",
    description: "Pay DSV services. Advanced logistics and supply chain solutions.",
    descriptionAr: "ادفع خدمات دي إس في. حلول لوجستيات وسلسلة إمداد متطورة.",
    keywords: ["dsv", "دي إس في", "transport", "نقل"],
    color: "#192862"
  },
  
  agility: {
    image: "/og-images/og-agility.svg",
    title: "Agility Payment - Logistics Solutions",
    titleAr: "دفع مجموعة الجاهلية - حلول لوجستية",
    description: "Pay Agility services. Advanced supply chain and logistics solutions.",
    descriptionAr: "ادفع خدمات الجاهلية. حلول سلسلة إمداد ولوجستيات متطورة.",
    keywords: ["agility", "الجاهلية", "supply chain", "سلسلة إمداد"],
    color: "#E30613"
  },
  
  bahri: {
    image: "/og-images/og-bahri.svg",
    title: "Bahri Payment - National Shipping",
    titleAr: "دفع البحري - الشحن الوطني",
    description: "Pay Bahri services. Saudi national shipping and maritime transport.",
    descriptionAr: "ادفع خدمات البحري. الشحن الوطني والنقل البحري السعودي.",
    keywords: ["bahri", "البحري", "maritime", "نقل بحري"],
    color: "#003087"
  },
  
  national: {
    image: "/og-images/og-national.svg",
    title: "National Shipping Payment - Maritime Services",
    titleAr: "دفع الشركة الوطنية - خدمات بحرية",
    description: "Pay National Shipping services. Comprehensive maritime and logistics solutions.",
    descriptionAr: "ادفع خدمات الشركة الوطنية. حلول بحرية ولوجستية شاملة.",
    keywords: ["national shipping", "الشركة الوطنية", "maritime", "شحن بحري"],
    color: "#003087"
  },
  
  genacom: {
    image: "/og-images/og-genacom.svg",
    title: "Genacom Payment - Oman Delivery",
    titleAr: "دفع جيناكم - توصيل عُماني",
    description: "Pay Genacom services. Local delivery and courier services in Oman.",
    descriptionAr: "ادفع خدمات جيناكم. خدمات توصيل محلية في عُمان.",
    keywords: ["genacom", "جيناكم", "oman delivery", "توصيل عماني"],
    color: "#009639"
  },
  
  jinaken: {
    image: "/og-images/og-genacom.svg",
    title: "Genacom Payment - Delivery Services",
    titleAr: "دفع جيناكم - خدمات التوصيل",
    description: "Pay Genacom delivery services. Fast and reliable courier in Oman.",
    descriptionAr: "ادفع خدمات جيناكم للتوصيل. توصيل سريع وموثوق في عُمان.",
    keywords: ["genacom", "جيناكم", "delivery", "توصيل"],
    color: "#009639"
  },
  
  jinakum: {
    image: "/og-images/og-genacom.svg",
    title: "Genacom Payment - Courier Services",
    titleAr: "دفع جيناكم - خدمات البريد",
    description: "Pay Genacom courier services. Professional delivery solutions in Oman.",
    descriptionAr: "ادفع خدمات جيناكم للبريد. حلول توصيل احترافية في عُمان.",
    keywords: ["genacom", "جيناكم", "courier", "بريد"],
    color: "#009639"
  },
  
  dhlkw: {
    image: "/og-images/og-dhl.svg",
    title: "DHL Kuwait Payment",
    titleAr: "دفع دي إتش إل الكويت",
    description: "Pay DHL Kuwait services",
    descriptionAr: "ادفع خدمات دي إتش إل الكويت",
    keywords: ["dhl kuwait", "دي إتش إل الكويت"],
    color: "#FFCC00"
  },
  
  dhlqa: {
    image: "/og-images/og-dhl.svg",
    title: "DHL Qatar Payment",
    titleAr: "دفع دي إتش إل قطر",
    description: "Pay DHL Qatar services",
    descriptionAr: "ادفع خدمات دي إتش إل قطر",
    keywords: ["dhl qatar", "دي إتش إل قطر"],
    color: "#FFCC00"
  },
  
  dhlom: {
    image: "/og-images/og-dhl.svg",
    title: "DHL Oman Payment",
    titleAr: "دفع دي إتش إل عُمان",
    description: "Pay DHL Oman services",
    descriptionAr: "ادفع خدمات دي إتش إل عُمان",
    keywords: ["dhl oman", "دي إتش إل عمان"],
    color: "#FFCC00"
  },
  
  dhlbh: {
    image: "/og-images/og-dhl.svg",
    title: "DHL Bahrain Payment",
    titleAr: "دفع دي إتش إل البحرين",
    description: "Pay DHL Bahrain services",
    descriptionAr: "ادفع خدمات دي إتش إل البحرين",
    keywords: ["dhl bahrain", "دي إتش إل البحرين"],
    color: "#FFCC00"
  },
  
  default: {
    image: "/og-images/og-aramex.svg",
    title: "Secure Payment - Online Payment Service",
    titleAr: "دفع آمن - خدمة الدفع الإلكتروني",
    description: "Complete your payment securely and quickly online",
    descriptionAr: "أكمل دفعتك بأمان وسرعة عبر الإنترنت",
    keywords: ["payment", "دفع", "secure", "آمن", "online"],
    color: "#DC291E"
  }
};

export const getCompanyMeta = (companyKey: string): CompanyMeta => {
  if (!companyKey) {
    return companyMetaMap.default;
  }

  const key = companyKey.toLowerCase();
  return companyMetaMap[key] || companyMetaMap.default;
};

export const generateMetaTags = (
  companyKey: string,
  amount?: number,
  currency?: string,
  trackingNumber?: string
): Record<string, string> => {
  const meta = getCompanyMeta(companyKey);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  
  let enhancedTitle = meta.title;
  let enhancedDescription = meta.description;
  
  if (amount && currency) {
    enhancedTitle += ` - ${amount} ${currency}`;
    enhancedDescription = `Pay ${amount} ${currency} for ${meta.title}. ${meta.description}`;
  }
  
  if (trackingNumber) {
    enhancedDescription += ` Tracking: ${trackingNumber}`;
  }

  return {
    'og:title': enhancedTitle,
    'og:description': enhancedDescription,
    'og:image': meta.image,
    'og:url': url,
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:title': enhancedTitle,
    'twitter:description': enhancedDescription,
    'twitter:image': meta.image,
    'description': enhancedDescription,
    'keywords': meta.keywords.join(', '),
    'theme-color': meta.color,
  };
};
