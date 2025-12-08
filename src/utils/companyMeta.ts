export interface CompanyMeta {
  image: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

const companyMetaMap: Record<string, CompanyMeta> = {
  aramex: {
    image: "/og-aramex.jpg",
    title: "Aramex Payment",
    titleAr: "دفع أرامكس",
    description: "Complete your Aramex shipping payment securely",
    descriptionAr: "أكمل دفع شحنة أرامكس بشكل آمن وموثوق"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "DHL Payment",
    titleAr: "دفع دي إتش إل",
    description: "Pay for DHL shipping services",
    descriptionAr: "ادفع خدمات شحن دي إتش إل بأمان"
  },
  dhlkw: {
    image: "/og-dhl.jpg",
    title: "DHL Kuwait Payment",
    titleAr: "دفع دي إتش إل الكويت",
    description: "Pay for DHL Kuwait shipping",
    descriptionAr: "ادفع شحنات دي إتش إل الكويت"
  },
  dhlqa: {
    image: "/og-dhl.jpg",
    title: "DHL Qatar Payment",
    titleAr: "دفع دي إتش إل قطر",
    description: "Pay for DHL Qatar shipping",
    descriptionAr: "ادفع شحنات دي إتش إل قطر"
  },
  dhlom: {
    image: "/og-dhl.jpg",
    title: "DHL Oman Payment",
    titleAr: "دفع دي إتش إل عمان",
    description: "Pay for DHL Oman shipping",
    descriptionAr: "ادفع شحنات دي إتش إل عمان"
  },
  dhlbh: {
    image: "/og-dhl.jpg",
    title: "DHL Bahrain Payment",
    titleAr: "دفع دي إتش إل البحرين",
    description: "Pay for DHL Bahrain shipping",
    descriptionAr: "ادفع شحنات دي إتش إل البحرين"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "FedEx Payment",
    titleAr: "دفع فيديكس",
    description: "Complete your FedEx payment online",
    descriptionAr: "أكمل دفع فيديكس عبر الإنترنت بأمان"
  },
  ups: {
    image: "/og-ups.jpg",
    title: "UPS Payment",
    titleAr: "دفع يو بي إس",
    description: "Pay for UPS shipping services",
    descriptionAr: "ادفع خدمات شحن يو بي إس"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "Emirates Post Payment",
    titleAr: "دفع البريد الإماراتي",
    description: "Pay for Emirates Post services",
    descriptionAr: "ادفع خدمات البريد الإماراتي"
  },
  smsa: {
    image: "/og-smsa.jpg",
    title: "SMSA Express Payment",
    titleAr: "دفع سمسا إكسبريس",
    description: "Pay for SMSA Express shipping",
    descriptionAr: "ادفع شحنات سمسا إكسبريس"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "Zajil Express Payment",
    titleAr: "دفع زاجل إكسبريس",
    description: "Pay for Zajil Express services",
    descriptionAr: "ادفع خدمات زاجل إكسبريس"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "Naqel Express Payment",
    titleAr: "دفع ناقل إكسبريس",
    description: "Pay for Naqel Express shipping",
    descriptionAr: "ادفع شحنات ناقل إكسبريس"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "Saudi Post Payment",
    titleAr: "دفع البريد السعودي",
    description: "Pay for Saudi Post services",
    descriptionAr: "ادفع خدمات البريد السعودي (سُبل)"
  },
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "Kuwait Post Payment",
    titleAr: "دفع البريد الكويتي",
    description: "Pay for Kuwait Post services",
    descriptionAr: "ادفع خدمات البريد الكويتي"
  },
  qpost: {
    image: "/og-qpost.jpg",
    title: "Qatar Post Payment",
    titleAr: "دفع البريد القطري",
    description: "Pay for Qatar Post services",
    descriptionAr: "ادفع خدمات البريد القطري"
  },
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "Oman Post Payment",
    titleAr: "دفع البريد العماني",
    description: "Pay for Oman Post services",
    descriptionAr: "ادفع خدمات البريد العماني"
  },
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "Bahrain Post Payment",
    titleAr: "دفع البريد البحريني",
    description: "Pay for Bahrain Post services",
    descriptionAr: "ادفع خدمات البريد البحريني"
  },
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "Jinakum Payment",
    titleAr: "دفع جناكم",
    description: "Pay for Jinakum services",
    descriptionAr: "ادفع خدمات شركة جناكم"
  },
  jinaken: {
    image: "/og-jinaken.jpg",
    title: "Jinaken Payment",
    titleAr: "دفع جناكن",
    description: "Pay for Jinaken services",
    descriptionAr: "ادفع خدمات شركة جناكن"
  },
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "Al Baraka Payment",
    titleAr: "دفع البركة",
    description: "Pay for Al Baraka services",
    descriptionAr: "ادفع خدمات مجموعة البركة"
  },
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "Al Futtaim Payment",
    titleAr: "دفع الفطيم",
    description: "Pay for Al Futtaim services",
    descriptionAr: "ادفع خدمات مجموعة الفطيم"
  },
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "Alshaya Payment",
    titleAr: "دفع الشايع",
    description: "Pay for Alshaya Group services",
    descriptionAr: "ادفع خدمات مجموعة الشايع"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "Bahri Payment",
    titleAr: "دفع البحري",
    description: "Pay for Bahri shipping services",
    descriptionAr: "ادفع خدمات الشحن البحري"
  },
  dsv: {
    image: "/og-dsv.jpg",
    title: "DSV Payment",
    titleAr: "دفع دي إس في",
    description: "Pay for DSV logistics services",
    descriptionAr: "ادفع خدمات DSV اللوجستية"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "Genacom Payment",
    titleAr: "دفع جيناكوم",
    description: "Pay for Genacom services",
    descriptionAr: "ادفع خدمات جيناكوم"
  },
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "Hellmann Worldwide Payment",
    titleAr: "دفع هيلمان",
    description: "Pay for Hellmann Worldwide Logistics",
    descriptionAr: "ادفع خدمات هيلمان اللوجستية العالمية"
  },
  shipco: {
    image: "/og-shipco.jpg",
    title: "Shipco Payment",
    titleAr: "دفع شيبكو",
    description: "Pay for Shipco Transport services",
    descriptionAr: "ادفع خدمات شيبكو للنقل"
  },
  payment: {
    image: "/og-aramex.jpg",
    title: "Secure Payment",
    titleAr: "دفع آمن",
    description: "Complete your payment securely",
    descriptionAr: "أكمل عملية الدفع بشكل آمن وموثوق"
  },
  default: {
    image: "/og-aramex.jpg",
    title: "Secure Payment Gateway",
    titleAr: "بوابة دفع آمنة",
    description: "Complete your secure payment",
    descriptionAr: "أكمل عملية الدفع الآمنة"
  }
};

export const getCompanyMeta = (companyKey: string): CompanyMeta => {
  if (!companyKey) {
    return companyMetaMap.default;
  }

  const key = companyKey.toLowerCase();
  return companyMetaMap[key] || companyMetaMap.default;
};
