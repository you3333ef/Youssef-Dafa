// Service logos and branding - All GCC shipping carriers

interface ServiceBranding {
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background?: string;
    surface?: string;
    border?: string;
    text?: string;
    textLight?: string;
    textOnPrimary?: string;
  };
  fonts?: {
    primary?: string;
    primaryAr?: string;
    secondary?: string;
  };
  shadows?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  borderRadius?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  gradients?: {
    primary?: string;
  };
  ogImage?: string;
  heroImage?: string;
  description?: string;
  name?: string;
  nameAr?: string;
}

export const serviceLogos: Record<string, ServiceBranding> = {
  // UAE - الإمارات
  aramex: {
    logo: "https://logo.clearbit.com/aramex.com",
    colors: {
      primary: "#E30613",
      secondary: "#FFFFFF"
    },
    ogImage: "https://logo.clearbit.com/aramex.com",
    heroImage: "https://logo.clearbit.com/aramex.com",
    description: "شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع. تقدم خدمات الشحن الدولي والمحلي وحلول التجارة الإلكترونية"
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
  },

  // ==================== HEALTH SERVICES - الخدمات الصحية ====================
  consultation: {
    logo: "/og-health.jpg",
    name: "Medical Consultation",
    nameAr: "استشارة طبية",
    colors: {
      primary: "#e11d48",
      secondary: "#f43f5e",
      accent: "#fda4af"
    },
    gradients: {
      primary: "linear-gradient(135deg, #e11d48, #f43f5e)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات الاستشارة الطبية مع أطباء متخصصين ومعتمدين - فحص شامل وتشخيص دقيق"
  },
  checkup: {
    logo: "/og-health.jpg",
    name: "Regular Checkup",
    nameAr: "فحص دوري شامل",
    colors: {
      primary: "#dc2626",
      secondary: "#f87171",
      accent: "#fca5a5"
    },
    gradients: {
      primary: "linear-gradient(135deg, #dc2626, #f87171)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "فحص طبي شامل ودوري يشمل جميع الفحوصات الضرورية للحفاظ على صحتك"
  },
  vaccination: {
    logo: "/og-health.jpg",
    name: "Vaccination",
    nameAr: "التطعيم والتحصين",
    colors: {
      primary: "#ef4444",
      secondary: "#fb923c",
      accent: "#fdba74"
    },
    gradients: {
      primary: "linear-gradient(135deg, #ef4444, #fb923c)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات التطعيم والتحصين المعتمدة - حماية شاملة ضد الأمراض"
  },
  "lab-tests": {
    logo: "/og-health.jpg",
    name: "Laboratory Tests",
    nameAr: "التحاليل المخبرية",
    colors: {
      primary: "#be123c",
      secondary: "#f43f5e",
      accent: "#fb7185"
    },
    gradients: {
      primary: "linear-gradient(135deg, #be123c, #f43f5e)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "تحاليل مخبرية شاملة ودقيقة - نتائج سريعة وموثوقة"
  },
  dental: {
    logo: "/og-health.jpg",
    name: "Dental Care",
    nameAr: "طب الأسنان",
    colors: {
      primary: "#e11d48",
      secondary: "#ec4899",
      accent: "#f9a8d4"
    },
    gradients: {
      primary: "linear-gradient(135deg, #e11d48, #ec4899)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات طب الأسنان الشاملة - علاج وتجميل وجراحة بأحدث التقنيات"
  },
  "eye-care": {
    logo: "/og-health.jpg",
    name: "Eye Care",
    nameAr: "طب العيون",
    colors: {
      primary: "#c026d3",
      secondary: "#e879f9",
      accent: "#f0abfc"
    },
    gradients: {
      primary: "linear-gradient(135deg, #c026d3, #e879f9)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات طب العيون المتكاملة - فحص وعلاج وجراحة العيون بأعلى معايير الجودة"
  },
  physiotherapy: {
    logo: "/og-health.jpg",
    name: "Physiotherapy",
    nameAr: "العلاج الطبيعي",
    colors: {
      primary: "#dc2626",
      secondary: "#f59e0b",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #dc2626, #f59e0b)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "جلسات العلاج الطبيعي المتخصصة - تأهيل وعلاج الإصابات والآلام المزمنة"
  },
  radiology: {
    logo: "/og-health.jpg",
    name: "Radiology",
    nameAr: "الأشعة والتصوير الطبي",
    colors: {
      primary: "#b91c1c",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #b91c1c, #dc2626)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات الأشعة والتصوير الطبي بأحدث الأجهزة - تشخيص دقيق وآمن"
  },
  cosmetic: {
    logo: "/og-health.jpg",
    name: "Cosmetic Services",
    nameAr: "خدمات التجميل",
    colors: {
      primary: "#ec4899",
      secondary: "#f9a8d4",
      accent: "#fbcfe8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #ec4899, #f9a8d4)"
    },
    ogImage: "/og-health.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات التجميل الطبية - عمليات وإجراءات تجميلية بأحدث التقنيات"
  },

  // ==================== LOGISTICS SERVICES - الخدمات اللوجستية ====================
  warehouse: {
    logo: "/og-logistics.jpg",
    name: "Warehouse Storage",
    nameAr: "التخزين والمستودعات",
    colors: {
      primary: "#7c3aed",
      secondary: "#8b5cf6",
      accent: "#a78bfa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c3aed, #8b5cf6)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات التخزين في المستودعات الحديثة - مساحات آمنة ومجهزة بأحدث الأنظمة"
  },
  freight: {
    logo: "/og-logistics.jpg",
    name: "Freight Forwarding",
    nameAr: "الشحن والنقل",
    colors: {
      primary: "#6d28d9",
      secondary: "#7c3aed",
      accent: "#8b5cf6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #6d28d9, #7c3aed)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات الشحن البري والبحري والجوي - حلول متكاملة لنقل البضائع"
  },
  customs: {
    logo: "/og-logistics.jpg",
    name: "Customs Clearance",
    nameAr: "التخليص الجمركي",
    colors: {
      primary: "#5b21b6",
      secondary: "#6d28d9",
      accent: "#7c3aed"
    },
    gradients: {
      primary: "linear-gradient(135deg, #5b21b6, #6d28d9)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات التخليص الجمركي السريعة - إجراءات مبسطة ومتابعة شاملة"
  },
  distribution: {
    logo: "/og-logistics.jpg",
    name: "Distribution Services",
    nameAr: "خدمات التوزيع",
    colors: {
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      accent: "#c4b5fd"
    },
    gradients: {
      primary: "linear-gradient(135deg, #8b5cf6, #a78bfa)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات توزيع البضائع والمنتجات - شبكة واسعة وتوصيل سريع"
  },
  packaging: {
    logo: "/og-logistics.jpg",
    name: "Packaging Services",
    nameAr: "التعبئة والتغليف",
    colors: {
      primary: "#7c3aed",
      secondary: "#a78bfa",
      accent: "#c4b5fd"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c3aed, #a78bfa)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات التعبئة والتغليف الاحترافية - حماية شاملة للبضائع"
  },
  "supply-chain": {
    logo: "/og-logistics.jpg",
    name: "Supply Chain Management",
    nameAr: "إدارة سلسلة الإمداد",
    colors: {
      primary: "#6d28d9",
      secondary: "#8b5cf6",
      accent: "#a78bfa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #6d28d9, #8b5cf6)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "إدارة وتنظيم سلسلة الإمداد المتكاملة - كفاءة عالية وتكلفة مثالية"
  },
  "free-zone": {
    logo: "/og-logistics.jpg",
    name: "Free Zone Services",
    nameAr: "خدمات المناطق الحرة",
    colors: {
      primary: "#5b21b6",
      secondary: "#7c3aed",
      accent: "#8b5cf6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #5b21b6, #7c3aed)"
    },
    ogImage: "/og-logistics.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات المناطق الحرة والتخزين - مزايا جمركية وحلول متكاملة"
  },

  // ==================== GOVERNMENT SERVICES - الخدمات الحكومية ====================
  mol: {
    logo: "/og-government.jpg",
    name: "Ministry of Labor",
    nameAr: "وزارة الموارد البشرية والعمل",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1e40af, #3b82f6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الموارد البشرية - تصاريح العمل والخدمات العمالية"
  },
  "mol-kw": {
    logo: "/og-government.jpg",
    name: "Ministry of Labor - Kuwait",
    nameAr: "وزارة العمل - الكويت",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1e40af, #3b82f6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة العمل الكويتية - تصاريح العمل والخدمات العمالية"
  },
  "mol-qa": {
    logo: "/og-government.jpg",
    name: "Ministry of Labor - Qatar",
    nameAr: "وزارة العمل - قطر",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1e40af, #3b82f6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة العمل القطرية - تصاريح العمل والخدمات العمالية"
  },
  "mol-bh": {
    logo: "/og-government.jpg",
    name: "Ministry of Labor - Bahrain",
    nameAr: "وزارة العمل - البحرين",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1e40af, #3b82f6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة العمل البحرينية - تصاريح العمل والخدمات العمالية"
  },
  moh: {
    logo: "/og-government.jpg",
    name: "Ministry of Health",
    nameAr: "وزارة الصحة",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الصحة - الخدمات الطبية والصحية الحكومية"
  },
  "moh-kw": {
    logo: "/og-government.jpg",
    name: "Ministry of Health - Kuwait",
    nameAr: "وزارة الصحة - الكويت",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الصحة الكويتية - الخدمات الطبية والصحية الحكومية"
  },
  "moh-om": {
    logo: "/og-government.jpg",
    name: "Ministry of Health - Oman",
    nameAr: "وزارة الصحة - عمان",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الصحة العمانية - الخدمات الطبية والصحية الحكومية"
  },
  "moh-bh": {
    logo: "/og-government.jpg",
    name: "Ministry of Health - Bahrain",
    nameAr: "وزارة الصحة - البحرين",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الصحة البحرينية - الخدمات الطبية والصحية الحكومية"
  },
  moe: {
    logo: "/og-government.jpg",
    name: "Ministry of Education",
    nameAr: "وزارة التعليم",
    colors: {
      primary: "#0284c7",
      secondary: "#0ea5e9",
      accent: "#38bdf8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0284c7, #0ea5e9)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة التعليم - الخدمات التعليمية والأكاديمية"
  },
  "moe-kw": {
    logo: "/og-government.jpg",
    name: "Ministry of Education - Kuwait",
    nameAr: "وزارة التربية - الكويت",
    colors: {
      primary: "#0284c7",
      secondary: "#0ea5e9",
      accent: "#38bdf8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0284c7, #0ea5e9)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة التربية الكويتية - الخدمات التعليمية والأكاديمية"
  },
  "moe-om": {
    logo: "/og-government.jpg",
    name: "Ministry of Education - Oman",
    nameAr: "وزارة التربية والتعليم - عمان",
    colors: {
      primary: "#0284c7",
      secondary: "#0ea5e9",
      accent: "#38bdf8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0284c7, #0ea5e9)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة التربية والتعليم العمانية - الخدمات التعليمية والأكاديمية"
  },
  "moe-bh": {
    logo: "/og-government.jpg",
    name: "Ministry of Education - Bahrain",
    nameAr: "وزارة التربية والتعليم - البحرين",
    colors: {
      primary: "#0284c7",
      secondary: "#0ea5e9",
      accent: "#38bdf8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0284c7, #0ea5e9)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة التربية والتعليم البحرينية - الخدمات التعليمية والأكاديمية"
  },
  moi: {
    logo: "/og-government.jpg",
    name: "Ministry of Interior",
    nameAr: "وزارة الداخلية",
    colors: {
      primary: "#7c2d12",
      secondary: "#ea580c",
      accent: "#fb923c"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c2d12, #ea580c)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الداخلية - الهوية الوطنية والوثائق الرسمية"
  },
  "moi-qa": {
    logo: "/og-government.jpg",
    name: "Ministry of Interior - Qatar",
    nameAr: "وزارة الداخلية - قطر",
    colors: {
      primary: "#7c2d12",
      secondary: "#ea580c",
      accent: "#fb923c"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c2d12, #ea580c)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الداخلية القطرية - الهوية والوثائق الرسمية"
  },
  moj: {
    logo: "/og-government.jpg",
    name: "Ministry of Justice",
    nameAr: "وزارة العدل",
    colors: {
      primary: "#4338ca",
      secondary: "#6366f1",
      accent: "#818cf8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #4338ca, #6366f1)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة العدل - الخدمات العدلية والقانونية"
  },
  mcit: {
    logo: "/og-government.jpg",
    name: "Ministry of Communications",
    nameAr: "وزارة الاتصالات والتقنية",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الاتصالات - خدمات الاتصالات والتقنية"
  },
  moci: {
    logo: "/og-government.jpg",
    name: "Ministry of Commerce",
    nameAr: "وزارة التجارة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة التجارة - السجل التجاري والتراخيص"
  },
  mohre: {
    logo: "/og-government.jpg",
    name: "Ministry of Human Resources - UAE",
    nameAr: "وزارة الموارد البشرية - الإمارات",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1e40af, #3b82f6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الموارد البشرية الإماراتية - تصاريح العمل والموارد البشرية"
  },
  mohap: {
    logo: "/og-government.jpg",
    name: "Ministry of Health - UAE",
    nameAr: "وزارة الصحة - الإمارات",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الصحة الإماراتية - الخدمات الصحية والطبية"
  },
  ica: {
    logo: "/og-government.jpg",
    name: "Federal Authority for Identity",
    nameAr: "الهيئة الاتحادية للهوية والجنسية",
    colors: {
      primary: "#7c2d12",
      secondary: "#ea580c",
      accent: "#fb923c"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c2d12, #ea580c)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات الهيئة الاتحادية للهوية والجنسية - الهوية والجنسية الإماراتية"
  },
  paci: {
    logo: "/og-government.jpg",
    name: "Public Authority for Civil Information",
    nameAr: "هيئة المعلومات المدنية - الكويت",
    colors: {
      primary: "#7c2d12",
      secondary: "#ea580c",
      accent: "#fb923c"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c2d12, #ea580c)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات هيئة المعلومات المدنية - البطاقة المدنية والوثائق"
  },
  moph: {
    logo: "/og-government.jpg",
    name: "Ministry of Public Health - Qatar",
    nameAr: "وزارة الصحة العامة - قطر",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة الصحة العامة القطرية - الخدمات الصحية"
  },
  moehe: {
    logo: "/og-government.jpg",
    name: "Ministry of Education - Qatar",
    nameAr: "وزارة التعليم والتعليم العالي - قطر",
    colors: {
      primary: "#0284c7",
      secondary: "#0ea5e9",
      accent: "#38bdf8"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0284c7, #0ea5e9)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة التعليم والتعليم العالي القطرية - الخدمات التعليمية"
  },
  momr: {
    logo: "/og-government.jpg",
    name: "Ministry of Manpower - Oman",
    nameAr: "وزارة القوى العاملة - عمان",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1e40af, #3b82f6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات وزارة القوى العاملة العمانية - تصاريح العمل"
  },
  roi: {
    logo: "/og-government.jpg",
    name: "Royal Oman Police",
    nameAr: "شرطة عمان السلطانية",
    colors: {
      primary: "#7c2d12",
      secondary: "#ea580c",
      accent: "#fb923c"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c2d12, #ea580c)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات شرطة عمان السلطانية - الهوية والوثائق"
  },
  iop: {
    logo: "/og-government.jpg",
    name: "Information & eGovernment Authority",
    nameAr: "هيئة المعلومات والحكومة الإلكترونية - البحرين",
    colors: {
      primary: "#7c2d12",
      secondary: "#ea580c",
      accent: "#fb923c"
    },
    gradients: {
      primary: "linear-gradient(135deg, #7c2d12, #ea580c)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات هيئة المعلومات والحكومة الإلكترونية - الهوية والوثائق"
  },
  // Municipalities
  hail: {
    logo: "/og-government.jpg",
    name: "Hail Municipality",
    nameAr: "بلدية حائل",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية حائل - الخدمات البلدية والرخص"
  },
  riyadh: {
    logo: "/og-government.jpg",
    name: "Riyadh Municipality",
    nameAr: "بلدية الرياض",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية الرياض - الخدمات البلدية والرخص"
  },
  jeddah: {
    logo: "/og-government.jpg",
    name: "Jeddah Municipality",
    nameAr: "بلدية جدة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية جدة - الخدمات البلدية والرخص"
  },
  "dubai-municipality": {
    logo: "/og-government.jpg",
    name: "Dubai Municipality",
    nameAr: "بلدية دبي",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية دبي - الخدمات البلدية والرخص"
  },
  "abu-dhabi-municipality": {
    logo: "/og-government.jpg",
    name: "Abu Dhabi Municipality",
    nameAr: "بلدية أبوظبي",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية أبوظبي - الخدمات البلدية والرخص"
  },
  "sharjah-municipality": {
    logo: "/og-government.jpg",
    name: "Sharjah Municipality",
    nameAr: "بلدية الشارقة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية الشارقة - الخدمات البلدية والرخص"
  },
  "ajman-municipality": {
    logo: "/og-government.jpg",
    name: "Ajman Municipality",
    nameAr: "بلدية عجمان",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية عجمان - الخدمات البلدية والرخص"
  },
  "rak-municipality": {
    logo: "/og-government.jpg",
    name: "Ras Al Khaimah Municipality",
    nameAr: "بلدية رأس الخيمة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية رأس الخيمة - الخدمات البلدية والرخص"
  },
  "fujairah-municipality": {
    logo: "/og-government.jpg",
    name: "Fujairah Municipality",
    nameAr: "بلدية الفجيرة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية الفجيرة - الخدمات البلدية والرخص"
  },
  "kuwait-municipality": {
    logo: "/og-government.jpg",
    name: "Kuwait Municipality",
    nameAr: "بلدية الكويت",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية الكويت - الخدمات البلدية والرخص"
  },
  "doha-municipality": {
    logo: "/og-government.jpg",
    name: "Doha Municipality",
    nameAr: "بلدية الدوحة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية الدوحة - الخدمات البلدية والرخص"
  },
  "muscat-municipality": {
    logo: "/og-government.jpg",
    name: "Muscat Municipality",
    nameAr: "بلدية مسقط",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية مسقط - الخدمات البلدية والرخص"
  },
  "manama-municipality": {
    logo: "/og-government.jpg",
    name: "Manama Municipality",
    nameAr: "بلدية المنامة",
    colors: {
      primary: "#0f766e",
      secondary: "#14b8a6",
      accent: "#2dd4bf"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0f766e, #14b8a6)"
    },
    ogImage: "/og-government.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمات بلدية المنامة - الخدمات البلدية والرخص"
  },

  // ==================== CHALET SERVICES - خدمات الشاليهات ====================
  "sa-abha-mountain": {
    logo: "/og-chalet.jpg",
    name: "Abha Mountain Chalet",
    nameAr: "شاليه جبال أبها",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-sa.jpg",
    description: "شاليه فاخر في جبال أبها مع إطلالة ساحرة على الطبيعة، مجهز بكافة وسائل الراحة والمرافق الحديثة"
  },
  "sa-riyadh-luxury": {
    logo: "/og-chalet.jpg",
    name: "Riyadh Luxury Chalet",
    nameAr: "شاليه الرياض الفاخر",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-sa.jpg",
    description: "شاليه عصري في الرياض يوفر أعلى معايير الفخامة والراحة مع مسبح خاص وحديقة واسعة"
  },
  "sa-jeddah-beach": {
    logo: "/og-chalet.jpg",
    name: "Jeddah Corniche Chalet",
    nameAr: "شاليه كورنيش جدة",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-sa.jpg",
    description: "شاليه مطل على البحر في كورنيش جدة، موقع مميز وإطلالة رائعة على البحر الأحمر"
  },
  "sa-dammam-family": {
    logo: "/og-chalet.jpg",
    name: "Dammam Family Chalet",
    nameAr: "شاليه الدمام العائلي",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-sa.jpg",
    description: "شاليه عائلي واسع في الدمام مع مرافق ترفيهية كاملة ومساحات خضراء"
  },
  "sa-taif-resort": {
    logo: "/og-chalet.jpg",
    name: "Taif Chalets Resort",
    nameAr: "منتجع شاليهات الطائف",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-sa.jpg",
    description: "منتجع متكامل في الطائف مع شاليهات مستقلة وسط الطبيعة الخلابة"
  },
  "sa-alkhobar-modern": {
    logo: "/og-chalet.jpg",
    name: "Al Khobar Modern Chalet",
    nameAr: "شاليه الخبر الحديث",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-sa.jpg",
    description: "شاليه حديث في الخبر بتصميم عصري وموقع قريب من الكورنيش"
  },
  "ae-dubai-luxury": {
    logo: "/og-chalet.jpg",
    name: "Dubai Luxury Chalet",
    nameAr: "شاليه دبي الفاخر",
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #d97706, #f59e0b)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-ae.jpg",
    description: "شاليه فخم في دبي مع إطلالة على برج خليفة ومرافق VIP"
  },
  "ae-abudhabi-beach": {
    logo: "/og-chalet.jpg",
    name: "Abu Dhabi Beach Chalet",
    nameAr: "شاليه شاطئ أبوظبي",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-ae.jpg",
    description: "شاليه على شاطئ أبوظبي مع وصول مباشر للبحر ومرافق راقية"
  },
  "ae-sharjah-family": {
    logo: "/og-chalet.jpg",
    name: "Sharjah Family Chalet",
    nameAr: "شاليه الشارقة العائلي",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-ae.jpg",
    description: "شاليه عائلي في الشارقة مع حديقة واسعة ومرافق للأطفال"
  },
  "ae-ajman-villa": {
    logo: "/og-chalet.jpg",
    name: "Ajman Villa Chalet",
    nameAr: "فيلا شاليه عجمان",
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #d97706, #f59e0b)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-ae.jpg",
    description: "فيلا شاليه راقية في عجمان بتصميم خليجي أصيل"
  },
  "ae-rak-mountain": {
    logo: "/og-chalet.jpg",
    name: "RAK Mountain Chalet",
    nameAr: "شاليه جبال رأس الخيمة",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-ae.jpg",
    description: "شاليه جبلي في رأس الخيمة مع إطلالة بانورامية على جبال الحجر"
  },
  "ae-fujairah-beach": {
    logo: "/og-chalet.jpg",
    name: "Fujairah Beach Chalet",
    nameAr: "شاليه الفجيرة البحري",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-ae.jpg",
    description: "شاليه على شاطئ الفجيرة مع مرافق الرياضات المائية"
  },
  "kw-kuwait-city": {
    logo: "/og-chalet.jpg",
    name: "Kuwait City Chalet",
    nameAr: "شاليه مدينة الكويت",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-kw.jpg",
    description: "شاليه راقي في مدينة الكويت مع إطلالة على الخليج"
  },
  "kw-salmiya-modern": {
    logo: "/og-chalet.jpg",
    name: "Salmiya Modern Chalet",
    nameAr: "شاليه السالمية الحديث",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-kw.jpg",
    description: "شاليه عصري في السالمية بالقرب من المرافق الترفيهية"
  },
  "kw-hawally-family": {
    logo: "/og-chalet.jpg",
    name: "Hawally Family Chalet",
    nameAr: "شاليه حولي العائلي",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-kw.jpg",
    description: "شاليه مثالي للعائلات في حولي مع مرافق ترفيهية"
  },
  "kw-mangaf-beach": {
    logo: "/og-chalet.jpg",
    name: "Mangaf Beach Chalet",
    nameAr: "شاليه المنقف الشاطئي",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-kw.jpg",
    description: "شاليه على الشاطئ في المنقف مع وصول مباشر للبحر"
  },
  "kw-jahra-desert": {
    logo: "/og-chalet.jpg",
    name: "Jahra Desert Chalet",
    nameAr: "شاليه الجهراء الصحراوي",
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #d97706, #f59e0b)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-kw.jpg",
    description: "شاليه في الجهراء وسط الطبيعة الصحراوية الهادئة"
  },
  "qa-doha-pearl": {
    logo: "/og-chalet.jpg",
    name: "The Pearl Doha Chalet",
    nameAr: "شاليه اللؤلؤة - الدوحة",
    colors: {
      primary: "#8e1838",
      secondary: "#be123c",
      accent: "#e11d48"
    },
    gradients: {
      primary: "linear-gradient(135deg, #8e1838, #be123c)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-qa.jpg",
    description: "شاليه فاخر في اللؤلؤة قطر مع إطلالة على المارينا"
  },
  "qa-west-bay": {
    logo: "/og-chalet.jpg",
    name: "West Bay Chalet",
    nameAr: "شاليه الخليج الغربي",
    colors: {
      primary: "#8e1838",
      secondary: "#be123c",
      accent: "#e11d48"
    },
    gradients: {
      primary: "linear-gradient(135deg, #8e1838, #be123c)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-qa.jpg",
    description: "شاليه راقي في الخليج الغربي بالقرب من المعالم الرئيسية"
  },
  "qa-lusail-luxury": {
    logo: "/og-chalet.jpg",
    name: "Lusail Luxury Chalet",
    nameAr: "شاليه لوسيل الفاخر",
    colors: {
      primary: "#8e1838",
      secondary: "#be123c",
      accent: "#e11d48"
    },
    gradients: {
      primary: "linear-gradient(135deg, #8e1838, #be123c)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-qa.jpg",
    description: "شاليه حديث في لوسيل مع أحدث التقنيات والتصميم العصري"
  },
  "qa-alkhor-resort": {
    logo: "/og-chalet.jpg",
    name: "Al Khor Resort Chalet",
    nameAr: "منتجع الخور",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-qa.jpg",
    description: "منتجع شاليهات في الخور مع مناظر طبيعية خلابة"
  },
  "qa-dukhan-beach": {
    logo: "/og-chalet.jpg",
    name: "Dukhan Beach Chalet",
    nameAr: "شاليه دخان الشاطئي",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-qa.jpg",
    description: "شاليه على شاطئ دخان مع أجواء هادئة ومنعزلة"
  },
  "om-muscat-beach": {
    logo: "/og-chalet.jpg",
    name: "Muscat Beach Chalet",
    nameAr: "شاليه شاطئ مسقط",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-om.jpg",
    description: "شاليه على شاطئ مسقط مع إطلالة خلابة على بحر عمان"
  },
  "om-salalah-resort": {
    logo: "/og-chalet.jpg",
    name: "Salalah Resort Chalet",
    nameAr: "منتجع صلالة",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-om.jpg",
    description: "شاليه في صلالة محاط بالخضرة والطبيعة الساحرة"
  },
  "om-nizwa-heritage": {
    logo: "/og-chalet.jpg",
    name: "Nizwa Heritage Chalet",
    nameAr: "شاليه نزوى التراثي",
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #d97706, #f59e0b)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-om.jpg",
    description: "شاليه تراثي في نزوى بتصميم عماني أصيل"
  },
  "om-sohar-family": {
    logo: "/og-chalet.jpg",
    name: "Sohar Family Chalet",
    nameAr: "شاليه صحار العائلي",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-om.jpg",
    description: "شاليه عائلي في صحار مع مرافق ترفيهية للأطفال"
  },
  "om-sur-coastal": {
    logo: "/og-chalet.jpg",
    name: "Sur Coastal Chalet",
    nameAr: "شاليه صور الساحلي",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-om.jpg",
    description: "شاليه ساحلي في صور مع إطلالة على موانئ السفن التقليدية"
  },
  "om-jebel-akhdar": {
    logo: "/og-chalet.jpg",
    name: "Jebel Akhdar Mountain Chalet",
    nameAr: "شاليه الجبل الأخضر",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-om.jpg",
    description: "شاليه جبلي في الجبل الأخضر مع مناظر طبيعية خلابة"
  },
  "bh-manama-luxury": {
    logo: "/og-chalet.jpg",
    name: "Manama Luxury Chalet",
    nameAr: "شاليه المنامة الفاخر",
    colors: {
      primary: "#ce1126",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #ce1126, #dc2626)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-bh.jpg",
    description: "شاليه فخم في المنامة مع إطلالة على الخليج العربي"
  },
  "bh-riffa-royal": {
    logo: "/og-chalet.jpg",
    name: "Riffa Royal Chalet",
    nameAr: "شاليه الرفاع الملكي",
    colors: {
      primary: "#ce1126",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #ce1126, #dc2626)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-bh.jpg",
    description: "شاليه ملكي في الرفاع مع حديقة واسعة ومرافق راقية"
  },
  "bh-muharraq-heritage": {
    logo: "/og-chalet.jpg",
    name: "Muharraq Heritage Chalet",
    nameAr: "شاليه المحرق التراثي",
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #d97706, #f59e0b)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-bh.jpg",
    description: "شاليه بتصميم تراثي في المحرق يجمع بين الأصالة والحداثة"
  },
  "bh-amwaj-islands": {
    logo: "/og-chalet.jpg",
    name: "Amwaj Islands Chalet",
    nameAr: "شاليه جزر أمواج",
    colors: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },
    gradients: {
      primary: "linear-gradient(135deg, #0891b2, #06b6d4)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-bh.jpg",
    description: "شاليه على جزر أمواج مع وصول مباشر للمارينا"
  },
  "bh-budaiya-family": {
    logo: "/og-chalet.jpg",
    name: "Budaiya Family Chalet",
    nameAr: "شاليه البديع العائلي",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #059669, #10b981)"
    },
    ogImage: "/og-chalet.jpg",
    heroImage: "/bg-chalet-bh.jpg",
    description: "شاليه عائلي في البديع مع مساحات واسعة ومرافق للأطفال"
  },

  // ==================== PAYMENT SERVICES - خدمات الدفع ====================
  "stc-pay": {
    logo: "/og-payment.jpg",
    name: "STC Pay",
    nameAr: "STC باي",
    colors: {
      primary: "#E30613",
      secondary: "#4c0519",
      accent: "#fca5a5"
    },
    gradients: {
      primary: "linear-gradient(135deg, #E30613, #4c0519)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "محفظة إلكترونية من شركة الاتصالات السعودية - دفع آمن وسريع"
  },
  mada: {
    logo: "/og-payment.jpg",
    name: "mada",
    nameAr: "مدى",
    colors: {
      primary: "#006C35",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #006C35, #10b981)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "نظام المدفوعات الوطني السعودي - بطاقات مدى الائتمانية والمدينة"
  },
  alrajhi: {
    logo: "/og-payment.jpg",
    name: "Al Rajhi Bank",
    nameAr: "بنك الراجحي",
    colors: {
      primary: "#006C35",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #006C35, #10b981)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك الراجحي - أكبر بنك إسلامي في العالم"
  },
  snb: {
    logo: "/og-payment.jpg",
    name: "SNB",
    nameAr: "البنك الأهلي السعودي",
    colors: {
      primary: "#E30613",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #E30613, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر البنك الأهلي السعودي - أول بنك في المملكة"
  },
  visa: {
    logo: "/og-payment.jpg",
    name: "Visa",
    nameAr: "فيزا",
    colors: {
      primary: "#1A1F71",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },
    gradients: {
      primary: "linear-gradient(135deg, #1A1F71, #3b82f6)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "بطاقات Visa الائتمانية - دفع آمن ومقبول عالمياً"
  },
  mastercard: {
    logo: "/og-payment.jpg",
    name: "Mastercard",
    nameAr: "ماستركارد",
    colors: {
      primary: "#EB001B",
      secondary: "#F79E1B",
      accent: "#fbbf24"
    },
    gradients: {
      primary: "linear-gradient(135deg, #EB001B, #F79E1B)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "بطاقات Mastercard الائتمانية - أمان وسرعة في المعاملات"
  },
  "dubai-first": {
    logo: "/og-payment.jpg",
    name: "Dubai First",
    nameAr: "دبي الأول",
    colors: {
      primary: "#006C35",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #006C35, #10b981)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "بطاقات الائتمان من بنك دبي الأول - مزايا حصرية"
  },
  adcb: {
    logo: "/og-payment.jpg",
    name: "ADCB",
    nameAr: "بنك أبوظبي التجاري",
    colors: {
      primary: "#003366",
      secondary: "#1e40af",
      accent: "#3b82f6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #003366, #1e40af)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك أبوظبي التجاري - خدمات مصرفية متطورة"
  },
  "emirates-nbd": {
    logo: "/og-payment.jpg",
    name: "Emirates NBD",
    nameAr: "بنك الإمارات دبي الوطني",
    colors: {
      primary: "#C8102E",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #C8102E, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك الإمارات دبي الوطني - أكبر بنك في الإمارات"
  },
  fab: {
    logo: "/og-payment.jpg",
    name: "FAB",
    nameAr: "بنك أبوظبي الأول",
    colors: {
      primary: "#006C35",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #006C35, #10b981)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك أبوظبي الأول - أكبر بنك في الإمارات"
  },
  mashreq: {
    logo: "/og-payment.jpg",
    name: "Mashreq",
    nameAr: "بنك المشرق",
    colors: {
      primary: "#C8102E",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #C8102E, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك المشرق - أقدم بنك في الإمارات"
  },
  kbt: {
    logo: "/og-payment.jpg",
    name: "KBT",
    nameAr: "البنك الأهلي الكويتي",
    colors: {
      primary: "#007A33",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #007A33, #10b981)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر البنك الأهلي الكويتي"
  },
  nbk: {
    logo: "/og-payment.jpg",
    name: "NBK",
    nameAr: "بنك الكويت الوطني",
    colors: {
      primary: "#003366",
      secondary: "#1e40af",
      accent: "#3b82f6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #003366, #1e40af)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك الكويت الوطني - أكبر بنك في الكويت"
  },
  gulf: {
    logo: "/og-payment.jpg",
    name: "Gulf Bank",
    nameAr: "بنك الخليج",
    colors: {
      primary: "#C8102E",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #C8102E, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك الخليج الكويتي"
  },
  qnb: {
    logo: "/og-payment.jpg",
    name: "QNB",
    nameAr: "بنك قطر الوطني",
    colors: {
      primary: "#8E1838",
      secondary: "#be123c",
      accent: "#e11d48"
    },
    gradients: {
      primary: "linear-gradient(135deg, #8E1838, #be123c)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك قطر الوطني - أكبر بنك في الشرق الأوسط"
  },
  cboq: {
    logo: "/og-payment.jpg",
    name: "CBOQ",
    nameAr: "بنك قطر التجاري",
    colors: {
      primary: "#003366",
      secondary: "#1e40af",
      accent: "#3b82f6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #003366, #1e40af)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك قطر التجاري"
  },
  ibq: {
    logo: "/og-payment.jpg",
    name: "IBQ",
    nameAr: "بنك الخليج الدولي - قطر",
    colors: {
      primary: "#8E1838",
      secondary: "#be123c",
      accent: "#e11d48"
    },
    gradients: {
      primary: "linear-gradient(135deg, #8E1838, #be123c)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك الخليج الدولي"
  },
  bankmuscat: {
    logo: "/og-payment.jpg",
    name: "BankMuscat",
    nameAr: "بنك مسقط",
    colors: {
      primary: "#ED1C24",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #ED1C24, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك مسقط - أكبر بنك في عمان"
  },
  sohar: {
    logo: "/og-payment.jpg",
    name: "Sohar Bank",
    nameAr: "بنك صحار",
    colors: {
      primary: "#009639",
      secondary: "#10b981",
      accent: "#34d399"
    },
    gradients: {
      primary: "linear-gradient(135deg, #009639, #10b981)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك صحار العماني"
  },
  nbo: {
    logo: "/og-payment.jpg",
    name: "NBO",
    nameAr: "البنك الأهلي - عمان",
    colors: {
      primary: "#ED1C24",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #ED1C24, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر البنك الأهلي العماني"
  },
  nbf: {
    logo: "/og-payment.jpg",
    name: "NBF",
    nameAr: "البنك الأهلي المتحد - البحرين",
    colors: {
      primary: "#CE1126",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #CE1126, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر البنك الأهلي المتحد"
  },
  bbk: {
    logo: "/og-payment.jpg",
    name: "BBK",
    nameAr: "بنك البحرين والكويت",
    colors: {
      primary: "#003366",
      secondary: "#1e40af",
      accent: "#3b82f6"
    },
    gradients: {
      primary: "linear-gradient(135deg, #003366, #1e40af)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك البحرين والكويت"
  },
  abc: {
    logo: "/og-payment.jpg",
    name: "ABC",
    nameAr: "بنك البحرين الأهلي",
    colors: {
      primary: "#CE1126",
      secondary: "#dc2626",
      accent: "#ef4444"
    },
    gradients: {
      primary: "linear-gradient(135deg, #CE1126, #dc2626)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "التحويل البنكي عبر بنك البحرين الأهلي"
  },
  payment: {
    logo: "/og-payment.jpg",
    name: "Payment Service",
    nameAr: "خدمة الدفع",
    colors: {
      primary: "#6366f1",
      secondary: "#818cf8",
      accent: "#a5b4fc"
    },
    gradients: {
      primary: "linear-gradient(135deg, #6366f1, #818cf8)"
    },
    ogImage: "/og-payment.jpg",
    heroImage: "/hero-bg.jpg",
    description: "خدمة دفع إلكترونية آمنة وسريعة - دعم جميع وسائل الدفع"
  }
};

// Default branding values
const defaultBranding = {
  colors: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    border: "#E0E0E0",
    text: "#000000",
    textLight: "#666666",
    textOnPrimary: "#FFFFFF",
  },
  fonts: {
    primary: "Cairo, -apple-system, sans-serif",
    primaryAr: "Cairo, Tajawal, -apple-system, sans-serif",
    secondary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },
  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px"
  }
};

export const getServiceBranding = (serviceName: string): ServiceBranding & { name: string; nameAr: string } => {
  const key = serviceName.toLowerCase();
  const service = serviceLogos[key] || {
    logo: "",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "خدمة شحن موثوقة"
  };

  // Merge with defaults
  return {
    ...service,
    name: service.name || serviceName,
    nameAr: service.nameAr || serviceName,
    colors: {
      ...defaultBranding.colors,
      ...service.colors,
      accent: service.colors.accent || service.colors.secondary,
    },
    fonts: {
      ...defaultBranding.fonts,
      ...service.fonts
    },
    shadows: {
      ...defaultBranding.shadows,
      ...service.shadows
    },
    borderRadius: {
      ...defaultBranding.borderRadius,
      ...service.borderRadius
    },
    gradients: {
      primary: service.gradients?.primary || `linear-gradient(135deg, ${service.colors.primary}, ${service.colors.secondary})`,
      ...service.gradients
    }
  };
};
