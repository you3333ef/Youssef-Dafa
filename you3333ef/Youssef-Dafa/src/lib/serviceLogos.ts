// Service logos and branding - All GCC shipping carriers
// Defines exact color palettes, fonts, and assets for light mode (daytime)

export interface ServiceBranding {
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
  ogImage?: string;
  heroImage?: string;
  description?: string;
  fonts?: {
    primary: string;
    primaryAr: string;
  };
  gradients?: {
    primary: string;
  };
  shadows?: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius?: {
    md: string;
    lg: string;
  };
  name?: string;
  nameAr?: string;
}

// Helper to create standard branding with customization
const createBranding = (
  name: string,
  nameAr: string,
  primary: string,
  secondary: string,
  logoUrl: string,
  description: string,
  heroUrl?: string
): ServiceBranding => {
  return {
    logo: logoUrl,
    name,
    nameAr,
    colors: {
      primary,
      secondary,
      accent: "#000000",
      background: "#FFFFFF",
      surface: "#F9FAFB",
      border: "#E5E7EB",
      text: "#111827",
      textLight: "#6B7280",
      textOnPrimary: "#FFFFFF",
    },
    ogImage: heroUrl || logoUrl,
    heroImage: heroUrl || logoUrl,
    description,
    fonts: {
      primary: "Inter, sans-serif",
      primaryAr: "Cairo, sans-serif",
    },
    gradients: {
      primary: `linear-gradient(135deg, ${primary}, ${secondary})`,
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    borderRadius: {
      md: "0.5rem",
      lg: "0.75rem",
    },
  };
};

export const serviceLogos: Record<string, ServiceBranding> = {
  // UAE - الإمارات
  aramex: createBranding(
    "Aramex",
    "أرامكس",
    "#E30613",
    "#000000",
    "https://logo.clearbit.com/aramex.com",
    "Global logistics and transportation solutions, delivering excellence.",
    "/assets/hero-aramex.jpg"
  ),
  dhl: createBranding(
    "DHL",
    "دي إتش إل",
    "#FFCC00",
    "#D40511",
    "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    "Excellence. Simply delivered. International express mail services.",
    "/assets/hero-dhl.jpg"
  ),
  fedex: createBranding(
    "FedEx",
    "فيديكس",
    "#4D148C",
    "#FF6600",
    "https://www.fedex.com/content/dam/fedex-com/logos/logo.png",
    "Connecting people and possibilities around the world.",
    "/assets/hero-fedex.jpg"
  ),
  ups: createBranding(
    "UPS",
    "يو بي إس",
    "#351C15",
    "#FFB500",
    "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg",
    "Moving our world forward by delivering what matters.",
    "/assets/hero-ups.jpg"
  ),
  empost: createBranding(
    "Emirates Post",
    "بريد الإمارات",
    "#C8102E",
    "#003087",
    "https://www.emiratespost.ae/images/logo.png",
    "Official postal operator for the United Arab Emirates.",
    "/assets/hero-empost.jpg"
  ),
  fetchr: createBranding(
    "Fetchr",
    "فتشر",
    "#4A235A",
    "#9B59B6",
    "https://logo.clearbit.com/fetchr.us",
    "Smart and reliable delivery services using GPS location.",
    "/assets/hero-bg.jpg" // Fallback
  ),
  imile: createBranding(
    "iMile",
    "آي مايل",
    "#FF4D00",
    "#333333",
    "https://logo.clearbit.com/imile.com",
    "Last-mile delivery services specialized in e-commerce.",
    "/assets/hero-bg.jpg" // Fallback
  ),
  zajel: createBranding(
    "Zajel",
    "زاجل",
    "#00529B",
    "#F7941D",
    "https://zajil.com/assets/images/logo.png",
    "Leading courier and logistics service provider in UAE.",
    "/assets/hero-zajil.jpg"
  ),

  // Saudi Arabia - السعودية
  smsa: createBranding(
    "SMSA Express",
    "سمسا",
    "#F47920", // SMSA Orange
    "#0066B3", // SMSA Blue
    "https://www.smsaexpress.com/images/logo.png",
    "Leading express transportation and logistics service provider in Saudi Arabia.",
    "/assets/hero-smsa.jpg"
  ),
  zajil_sa: createBranding( // Explicit Country Key
    "Zajil Express",
    "زاجل",
    "#1C4587",
    "#FF9900",
    "https://zajil.com/assets/images/logo.png",
    "Fast and reliable shipping services across Saudi Arabia.",
    "/assets/hero-zajil.jpg"
  ),
  naqel: createBranding(
    "Naqel Express",
    "ناقل",
    "#003DA5", // Updated Naqel Blue
    "#8CB811", // Naqel Green accent
    "https://www.naqelexpress.com/images/logo.png",
    "Best logistics solutions in the Kingdom of Saudi Arabia.",
    "/assets/hero-naqel.jpg"
  ),
  saudipost: createBranding(
    "SPL (Saudi Post)",
    "البريد السعودي (سبل)",
    "#1C4F9C", // SPL Blue
    "#43B02A", // SPL Green
    "https://sp.com.sa/assets/images/logo.png",
    "National postal operator delivering to every address in the Kingdom.",
    "/assets/hero-saudipost.jpg"
  ),
  aymakan: createBranding(
    "AyMakan",
    "أي مكان",
    "#E30613",
    "#000000",
    "https://logo.clearbit.com/aymakan.com.sa",
    "Logistics and last-mile delivery specifically for e-commerce.",
    "/assets/hero-bg.jpg"
  ),
  esnad: createBranding(
    "Esnad Express",
    "إسناد",
    "#2E3192",
    "#00AEEF",
    "https://logo.clearbit.com/esnad-express.com",
    "Integrated logistics solutions and supply chain services.",
    "/assets/hero-bg.jpg"
  ),

  // Kuwait - الكويت
  kwpost: createBranding(
    "Kuwait Post",
    "بريد الكويت",
    "#231F20",
    "#CE1126",
    "https://www.kwpost.com.kw/images/logo.png",
    "Official postal service of the State of Kuwait.",
    "/assets/hero-kwpost.jpg"
  ),
  dhlkw: createBranding(
    "DHL Kuwait",
    "دي إتش إل الكويت",
    "#FFCC00",
    "#D40511",
    "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    "International express delivery services in Kuwait.",
    "/assets/hero-dhl.jpg"
  ),
  postaplus: createBranding(
    "Posta Plus",
    "بوستا بلس",
    "#F58220",
    "#004A99",
    "https://logo.clearbit.com/postaplus.com",
    "Comprehensive logistics and courier services in the Gulf.",
    "/assets/hero-bg.jpg"
  ),
  moshat: createBranding(
    "Moshat",
    "مرسال",
    "#000000",
    "#E30613",
    "/assets/logo-placeholder.png", // Correct logo needed
    "Reliable delivery services.",
    "/assets/hero-bg.jpg"
  ),

  // Qatar - قطر
  qpost: createBranding(
    "Qatar Post",
    "بريد قطر",
    "#8A1538",
    "#FFFFFF",
    "https://www.qpost.qa/assets/images/logo.png",
    "Modern postal services connecting people in Qatar.",
    "/assets/hero-qpost.jpg"
  ),
  dhlqa: createBranding(
    "DHL Qatar",
    "دي إتش إل قطر",
    "#FFCC00",
    "#D40511",
    "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    "International express delivery services in Qatar.",
    "/assets/hero-dhl.jpg"
  ),
  falcon: createBranding(
    "Falcon Express",
    "فالكون",
    "#D4AF37",
    "#000000",
    "https://logo.clearbit.com/falconexpress.com",
    "Professional courier and shipping services.",
    "/assets/hero-bg.jpg"
  ),

  // Oman - عمان
  omanpost: createBranding(
    "Oman Post",
    "بريد عُمان",
    "#008C95", // Oman Post Teal
    "#DA291C", // Red
    "https://www.omanpost.om/images/logo.png",
    "The national postal operator of Oman.",
    "/assets/hero-omanpost.jpg"
  ),
  asyad: createBranding(
    "Asyad Express",
    "أسياد",
    "#C8102E",
    "#5D5D5D",
    "https://www.asyadexpress.om/assets/images/logo.svg",
    "Integrated logistics group in Oman offering comprehensive supply chain solutions.",
    "/assets/hero-bg.jpg" // Specific Asyad hero would be better
  ),
  dhlom: createBranding(
    "DHL Oman",
    "دي إتش إل عمان",
    "#FFCC00",
    "#D40511",
    "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    "International express delivery services in Oman.",
    "/assets/hero-dhl.jpg"
  ),

  // Bahrain - البحرين
  bahpost: createBranding(
    "Bahrain Post",
    "بريد البحرين",
    "#CE1126",
    "#FFFFFF",
    "https://www.bahrainpost.gov.bh/images/logo.png",
    "Providing reliable postal services in the Kingdom of Bahrain.",
    "/assets/hero-bahpost.jpg"
  ),
  ubex: createBranding(
    "Ubex",
    "يوبكس",
    "#2E3192",
    "#00AEEF",
    "https://logo.clearbit.com/ubex.co",
    "Smart logistics and courier services.",
    "/assets/hero-bg.jpg"
  ),
  dhlbh: createBranding(
    "DHL Bahrain",
    "دي إتش إل البحرين",
    "#FFCC00",
    "#D40511",
    "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    "International express delivery services in Bahrain.",
    "/assets/hero-dhl.jpg"
  ),

  // Additional Real GCC Shipping & Logistics Companies
  albaraka: createBranding(
    "Al Baraka",
    "مجموعة البركة",
    "#D89A00",
    "#000000",
    "https://logo.clearbit.com/albaraka.com.tr",
    "Integrated banking and logistics services.",
    "/assets/hero-albaraka.jpg"
  ),
  alfuttaim: createBranding(
    "Al Futtaim Logistics",
    "الفطيم للوجستيات",
    "#00559B",
    "#FFFFFF",
    "https://logo.clearbit.com/alfuttaim.com",
    "Supply chain management and logistics solutions.",
    "/assets/hero-alfuttaim.jpg"
  ),
  alshaya: createBranding(
    "Alshaya Group",
    "مجموعة الشايع",
    "#D71920",
    "#000000",
    "https://logo.clearbit.com/alshaya.com",
    "Leading international franchise operator.",
    "/assets/hero-alshaya.jpg"
  ),
  national: createBranding(
    "Bahri (National Shipping)",
    "البحري",
    "#0066B3",
    "#8DC63F",
    "https://logo.clearbit.com/bahri.sa",
    "National Shipping Company of Saudi Arabia.",
    "/assets/hero-bahri.jpg"
  ),
  shipco: createBranding(
    "Shipco Transport",
    "شيبكو",
    "#003366",
    "#FFCC00",
    "https://logo.clearbit.com/shipco.com",
    "Neutral NVOCC providing LCL and FCL services.",
    "/assets/hero-shipco.jpg"
  ),
  hellmann: createBranding(
    "Hellmann Worldwide",
    "هيلمان",
    "#003DA5", // Hellmann Blue
    "#FFFFFF",
    "https://logo.clearbit.com/hellmann.com",
    "Global logistics network.",
    "/assets/hero-hellmann.jpg"
  ),
  dsv: createBranding(
    "DSV",
    "دي إس في",
    "#002157",
    "#FFFFFF",
    "https://logo.clearbit.com/dsv.com",
    "Global transport and logistics.",
    "/assets/hero-dsv.jpg"
  ),
  agility: createBranding(
    "Agility",
    "أجيليتي",
    "#F37021",
    "#005696",
    "https://logo.clearbit.com/agility.com",
    "Logistics, infrastructure and supply chain innovation.",
    "/assets/hero-bg.jpg"
  ),
  jinaken: createBranding(
    "Jinaken",
    "جيناكن",
    "#E82424",
    "#F7C24A",
    "/og-jinaken.jpg",
    "Local Omani delivery service.",
    "/assets/hero-jinaken.jpg"
  ),
  jinakum: createBranding(
    "Jinakum",
    "جيناكم",
    "#0EA5E9",
    "#06B6D4",
    "/og-jinakum.jpg",
    "Secure payment and transfer services.",
    "/assets/hero-jinakum.jpg"
  )
};

export const getServiceBranding = (serviceName: string) => {
  if (!serviceName) return serviceLogos.aramex; // Default
  
  let key = serviceName.toLowerCase();
  
  // Strip country suffixes (e.g., smsa_sa -> smsa, aramex_ae -> aramex)
  key = key.replace(/_[a-z]{2}$/, '');

  // Mappings
  if (key === 'spl') key = 'saudipost';
  if (key === 'emirates_post') key = 'empost';
  if (key === 'qatar_post') key = 'qpost';
  if (key === 'oman_post') key = 'omanpost';
  if (key === 'bahrain_post') key = 'bahpost';
  if (key === 'posta_plus') key = 'postaplus';
  if (key === 'falcon') key = 'falcon'; 
  if (key === 'asyad') key = 'asyad';
  if (key === 'ubex') key = 'ubex';
  if (key === 'esnad') key = 'esnad';
  if (key === 'aymakan') key = 'aymakan';
  if (key === 'moshat') key = 'moshat';
  if (key === 'imile') key = 'imile';
  if (key === 'fetchr') key = 'fetchr';
  if (key === 'zajel') key = 'zajel';

  // Fallback to Aramex (light mode safe) if key not found
  return serviceLogos[key] || serviceLogos.aramex;
};
