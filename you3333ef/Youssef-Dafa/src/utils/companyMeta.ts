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
    title: "دفع فاتورة أرامكس - Aramex Payment",
    description: "ادفع فواتير الشحن لأرامكس بأمان وسهولة - Pay Aramex shipping invoices securely"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "دفع فاتورة دي إتش إل - DHL Payment",
    description: "ادفع فواتير الشحن لـ DHL بأمان وسهولة - Pay DHL shipping invoices securely"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "دفع فاتورة فيديكس - FedEx Payment",
    description: "ادفع فواتير الشحن لـ FedEx بأمان وسهولة - Pay FedEx shipping invoices securely"
  },
  ups: {
    image: "/og-ups.jpg",
    title: "دفع فاتورة يو بي إس - UPS Payment",
    description: "ادفع فواتير الشحن لـ UPS بأمان وسهولة - Pay UPS shipping invoices securely"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "دفع فاتورة بريد الإمارات - Emirates Post Payment",
    description: "ادفع فواتير بريد الإمارات بأمان وسهولة - Pay Emirates Post services securely"
  },
  fetchr: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة فتشر - Fetchr Payment",
    description: "ادفع فواتير الشحن لـ Fetchr بأمان وسهولة - Pay Fetchr shipping invoices"
  },
  imile: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة آي مايل - iMile Payment",
    description: "ادفع فواتير الشحن لـ iMile بأمان وسهولة - Pay iMile shipping invoices"
  },
  zajel: {
    image: "/og-zajil.jpg",
    title: "دفع فاتورة زاجل - Zajel Payment",
    description: "ادفع فواتير الشحن لـ Zajel بأمان وسهولة - Pay Zajel shipping invoices"
  },

  // Saudi Arabia - السعودية
  smsa: {
    image: "/og-smsa.jpg",
    title: "دفع فاتورة سمسا - SMSA Express Payment",
    description: "ادفع فواتير الشحن لـ SMSA بأمان وسهولة - Pay SMSA shipping invoices securely"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "دفع فاتورة زاجل - Zajil Payment",
    description: "ادفع فواتير الشحن لـ Zajil بأمان وسهولة - Pay Zajil shipping invoices"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "دفع فاتورة ناقل - Naqel Express Payment",
    description: "ادفع فواتير الشحن لناقل بأمان وسهولة - Pay Naqel shipping invoices securely"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "دفع فاتورة البريد السعودي - Saudi Post Payment",
    description: "ادفع فواتير البريد السعودي بأمان وسهولة - Pay Saudi Post services securely"
  },
  spl: {
    image: "/og-saudipost.jpg",
    title: "دفع فاتورة سبل - SPL Payment",
    description: "ادفع فواتير سبل بأمان وسهولة - Pay SPL services securely"
  },
  aymakan: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة أي مكان - AyMakan Payment",
    description: "ادفع فواتير الشحن لأي مكان بأمان وسهولة - Pay AyMakan shipping invoices"
  },
  esnad: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة إسناد - Esnad Payment",
    description: "ادفع فواتير الشحن لإسناد بأمان وسهولة - Pay Esnad shipping invoices"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "دفع فاتورة بحري - Bahri Payment",
    description: "ادفع فواتير الشحن البحري لبحري بأمان وسهولة - Pay Bahri shipping invoices"
  },
  national: {
    image: "/og-bahri.jpg",
    title: "دفع فاتورة بحري - Bahri Payment",
    description: "ادفع فواتير الشحن البحري لبحري بأمان وسهولة - Pay Bahri shipping invoices"
  },

  // Kuwait - الكويت
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "دفع فاتورة بريد الكويت - Kuwait Post Payment",
    description: "ادفع فواتير بريد الكويت بأمان وسهولة - Pay Kuwait Post services securely"
  },
  dhlkw: {
    image: "/og-dhl.jpg",
    title: "دفع فاتورة دي إتش إل الكويت - DHL Kuwait Payment",
    description: "ادفع فواتير الشحن لـ DHL الكويت بأمان وسهولة - Pay DHL Kuwait services"
  },
  postaplus: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة بوستا بلس - Posta Plus Payment",
    description: "ادفع فواتير الشحن لبوستا بلس بأمان وسهولة - Pay Posta Plus services"
  },
  moshat: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة مرسال - Moshat Payment",
    description: "ادفع فواتير الشحن لمرسال بأمان وسهولة - Pay Moshat shipping invoices"
  },

  // Qatar - قطر
  qpost: {
    image: "/og-qpost.jpg",
    title: "دفع فاتورة بريد قطر - Qatar Post Payment",
    description: "ادفع فواتير بريد قطر بأمان وسهولة - Pay Qatar Post services securely"
  },
  dhlqa: {
    image: "/og-dhl.jpg",
    title: "دفع فاتورة دي إتش إل قطر - DHL Qatar Payment",
    description: "ادفع فواتير الشحن لـ DHL قطر بأمان وسهولة - Pay DHL Qatar services"
  },
  falcon: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة فالكون - Falcon Express Payment",
    description: "ادفع فواتير الشحن لفالكون بأمان وسهولة - Pay Falcon Express services"
  },

  // Oman - عمان
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "دفع فاتورة بريد عُمان - Oman Post Payment",
    description: "ادفع فواتير بريد عُمان بأمان وسهولة - Pay Oman Post services securely"
  },
  dhlom: {
    image: "/og-dhl.jpg",
    title: "دفع فاتورة دي إتش إل عُمان - DHL Oman Payment",
    description: "ادفع فواتير الشحن لـ DHL عُمان بأمان وسهولة - Pay DHL Oman services"
  },
  asyad: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة أسياد - Asyad Payment",
    description: "ادفع فواتير الشحن لأسياد بأمان وسهولة - Pay Asyad shipping invoices"
  },
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "دفع فاتورة جيناكم - Jinakum Payment",
    description: "ادفع فواتير جيناكم بأمان وسهولة - Pay Jinakum services securely"
  },
  jinaken: {
    image: "/og-jinaken.jpg",
    title: "دفع فاتورة جيناكن - Jinaken Payment",
    description: "ادفع فواتير جيناكن بأمان وسهولة - Pay Jinaken services securely"
  },

  // Bahrain - البحرين
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "دفع فاتورة بريد البحرين - Bahrain Post Payment",
    description: "ادفع فواتير بريد البحرين بأمان وسهولة - Pay Bahrain Post services securely"
  },
  dhlbh: {
    image: "/og-dhl.jpg",
    title: "دفع فاتورة دي إتش إل البحرين - DHL Bahrain Payment",
    description: "ادفع فواتير الشحن لـ DHL البحرين بأمان وسهولة - Pay DHL Bahrain services"
  },
  ubex: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة يوبكس - Ubex Payment",
    description: "ادفع فواتير الشحن ليوبكس بأمان وسهولة - Pay Ubex shipping invoices"
  },

  // Other Companies
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "دفع فاتورة البركة - Albaraka Payment",
    description: "ادفع فواتير البركة بأمان وسهولة - Pay Albaraka services securely"
  },
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "دفع فاتورة الفطيم - Al Futtaim Payment",
    description: "ادفع فواتير الفطيم بأمان وسهولة - Pay Al Futtaim services securely"
  },
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "دفع فاتورة الشايع - Alshaya Payment",
    description: "ادفع فواتير الشايع بأمان وسهولة - Pay Alshaya services securely"
  },
  shipco: {
    image: "/og-shipco.jpg",
    title: "دفع فاتورة شيبكو - Shipco Payment",
    description: "ادفع فواتير الشحن لشيبكو بأمان وسهولة - Pay Shipco shipping invoices"
  },
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "دفع فاتورة هيلمان - Hellmann Payment",
    description: "ادفع فواتير الشحن لهيلمان بأمان وسهولة - Pay Hellmann shipping invoices"
  },
  dsv: {
    image: "/og-dsv.jpg",
    title: "دفع فاتورة دي إس في - DSV Payment",
    description: "ادفع فواتير الشحن لـ DSV بأمان وسهولة - Pay DSV shipping invoices"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "دفع فاتورة جيناكوم - Genacom Payment",
    description: "ادفع فواتير جيناكوم بأمان وسهولة - Pay Genacom services securely"
  },

  // Default fallback for unknown companies
  default: {
    image: "/og-aramex.jpg",
    title: "دفع فاتورة آمن - Secure Payment",
    description: "أكمل عملية الدفع بأمان وسهولة - Complete your payment securely"
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
