export interface Bank {
  id: string;
  name: string;
  nameAr: string;
  logo?: string;
  color: string;
  colorSecondary?: string;
  textColor?: string;
  website?: string;
}

export interface BanksByCountry {
  [countryCode: string]: Bank[];
}

export const BANKS_BY_COUNTRY: BanksByCountry = {
  SA: [
    {
      id: "alrajhi_bank",
      name: "Al Rajhi Bank",
      nameAr: "مصرف الراجحي",
      logo: "/logos/banks/alrajhi.svg",
      color: "#006C35",
      colorSecondary: "#00843D",
      textColor: "#FFFFFF",
      website: "https://www.alrajhibank.com.sa",
    },
    {
      id: "alahli_bank",
      name: "Al Ahli Bank",
      nameAr: "البنك الأهلي التجاري",
      logo: "/logos/banks/alahli.svg",
      color: "#00843D",
      colorSecondary: "#006C35",
      textColor: "#FFFFFF",
      website: "https://www.alahli.com",
    },
    {
      id: "riyad_bank",
      name: "Riyad Bank",
      nameAr: "بنك الرياض",
      logo: "/logos/banks/riyad.svg",
      color: "#0066B2",
      colorSecondary: "#004B87",
      textColor: "#FFFFFF",
      website: "https://www.riyadbank.com",
    },
    {
      id: "samba_bank",
      name: "Samba Financial Group",
      nameAr: "مجموعة سامبا المالية",
      logo: "/logos/banks/samba.svg",
      color: "#E31E24",
      colorSecondary: "#C41E3A",
      textColor: "#FFFFFF",
      website: "https://www.samba.com",
    },
    {
      id: "saudi_investment_bank",
      name: "Saudi Investment Bank",
      nameAr: "البنك السعودي للاستثمار",
      logo: "https://www.saib.com.sa/sites/default/files/styles/teaser_image/public/2021-09/saib-logo.jpg",
      color: "#004B87",
    },
    {
      id: "arab_national_bank",
      name: "Arab National Bank",
      nameAr: "البنك العربي الوطني",
      logo: "https://www.anb.com.sa/images/logo-en.svg",
      color: "#00A551",
    },
    {
      id: "saudi_fransi_bank",
      name: "Banque Saudi Fransi",
      nameAr: "البنك السعودي الفرنسي",
      logo: "https://www.alfransi.com.sa/sites/all/themes/alfransi/images/logo-en.svg",
      color: "#ED1C24",
    },
    {
      id: "alinma_bank",
      name: "Alinma Bank",
      nameAr: "بنك الإنماء",
      logo: "/logos/banks/alinma.svg",
      color: "#00A650",
      colorSecondary: "#008C43",
      textColor: "#FFFFFF",
      website: "https://www.alinma.com",
    },
    {
      id: "albilad_bank",
      name: "Bank AlBilad",
      nameAr: "بنك البلاد",
      logo: "https://www.bankalbilad.com/sites/default/files/styles/mobile_1x/public/bank-albilad-logo.png",
      color: "#1C4587",
    },
    {
      id: "aljazira_bank",
      name: "Bank AlJazira",
      nameAr: "بنك الجزيرة",
      logo: "https://www.baj.com.sa/sites/default/files/inline-images/logo-en.svg",
      color: "#005EB8",
    },
  ],
  AE: [
    {
      id: "emirates_nbd",
      name: "Emirates NBD",
      nameAr: "بنك الإمارات دبي الوطني",
      logo: "https://www.emiratesnbd.com/sites/all/themes/emiratesnbd/images/logo-en.svg",
      color: "#D50032",
    },
    {
      id: "adcb",
      name: "Abu Dhabi Commercial Bank",
      nameAr: "بنك أبوظبي التجاري",
      logo: "https://www.adcb.com/sites/default/files/adcb-logo.svg",
      color: "#004B87",
    },
    {
      id: "fab",
      name: "First Abu Dhabi Bank",
      nameAr: "بنك أبوظبي الأول",
      logo: "https://www.bankfab.com/-/media/fab/images/fab-logo.svg",
      color: "#000000",
    },
    {
      id: "dib",
      name: "Dubai Islamic Bank",
      nameAr: "بنك دبي الإسلامي",
      logo: "https://www.dib.ae/images/dib-logo.svg",
      color: "#00923F",
    },
    {
      id: "mashreq_bank",
      name: "Mashreq Bank",
      nameAr: "بنك المشرق",
      logo: "https://www.mashreqbank.com/uae/en/images/mashreq-logo.svg",
      color: "#E31E24",
    },
    {
      id: "cbd",
      name: "Commercial Bank of Dubai",
      nameAr: "بنك دبي التجاري",
      logo: "https://www.cbd.ae/sites/default/files/cbd-logo.svg",
      color: "#004B87",
    },
    {
      id: "rakbank",
      name: "RAKBANK",
      nameAr: "بنك رأس الخيمة الوطني",
      logo: "https://www.rakbank.ae/resources/images/logo-en.svg",
      color: "#E31E24",
    },
    {
      id: "ajman_bank",
      name: "Ajman Bank",
      nameAr: "بنك عجمان",
      logo: "https://www.ajmanbank.ae/sites/default/files/ajman-bank-logo.svg",
      color: "#00A651",
    },
  ],
  KW: [
    {
      id: "nbk",
      name: "National Bank of Kuwait",
      nameAr: "بنك الكويت الوطني",
      logo: "https://www.nbk.com/dam/jcr:4c8d8f3c-8c7a-4f3b-9f3b-7c8d8f3c8c7a/NBK-logo.svg",
      color: "#005EB8",
    },
    {
      id: "gulf_bank",
      name: "Gulf Bank",
      nameAr: "بنك الخليج",
      logo: "https://www.e-gulfbank.com/sites/default/files/gulf-bank-logo.svg",
      color: "#004B87",
    },
    {
      id: "cbk",
      name: "Commercial Bank of Kuwait",
      nameAr: "البنك التجاري الكويتي",
      logo: "https://www.cbk.com/en/images/cbk-logo.svg",
      color: "#00A651",
    },
    {
      id: "burgan_bank",
      name: "Burgan Bank",
      nameAr: "بنك برقان",
      logo: "https://www.burgan.com/sites/default/files/burgan-logo.svg",
      color: "#E31E24",
    },
    {
      id: "ahli_united_bank",
      name: "Ahli United Bank",
      nameAr: "الأهلي المتحد",
      logo: "https://www.ahliunited.com/en/media/aub-logo.svg",
      color: "#00843D",
    },
    {
      id: "kfh",
      name: "Kuwait Finance House",
      nameAr: "بيت التمويل الكويتي",
      logo: "https://www.kfh.com/en/images/kfh-logo.svg",
      color: "#00923F",
    },
    {
      id: "boubyan_bank",
      name: "Boubyan Bank",
      nameAr: "بنك بوبيان",
      logo: "https://www.bankboubyan.com/sites/default/files/boubyan-logo.svg",
      color: "#0066B2",
    },
  ],
  QA: [
    {
      id: "qnb",
      name: "Qatar National Bank",
      nameAr: "بنك قطر الوطني",
      logo: "https://www.qnb.com/sites/qnb/qnbqatar/images/logo-en.svg",
      color: "#6E1D3E",
    },
    {
      id: "cbq",
      name: "Commercial Bank of Qatar",
      nameAr: "البنك التجاري القطري",
      logo: "https://www.cbq.qa/sites/default/files/cbq-logo.svg",
      color: "#004B87",
    },
    {
      id: "doha_bank",
      name: "Doha Bank",
      nameAr: "بنك الدوحة",
      logo: "https://www.dohabank.qa/images/doha-bank-logo.svg",
      color: "#E31E24",
    },
    {
      id: "qib",
      name: "Qatar Islamic Bank",
      nameAr: "بنك قطر الإسلامي",
      logo: "https://www.qib.com.qa/sites/default/files/qib-logo.svg",
      color: "#00923F",
    },
    {
      id: "masraf_alrayan",
      name: "Masraf Al Rayan",
      nameAr: "مصرف الريان",
      logo: "https://www.alrayan.com/en/images/alrayan-logo.svg",
      color: "#00A651",
    },
    {
      id: "ahlibank",
      name: "Ahlibank",
      nameAr: "الأهلي بنك",
      logo: "https://www.ahlibank.com.qa/sites/default/files/ahli-logo.svg",
      color: "#00843D",
    },
  ],
  OM: [
    {
      id: "bank_muscat",
      name: "Bank Muscat",
      nameAr: "بنك مسقط",
      logo: "https://www.bankmuscat.com/sites/default/files/bank-muscat-logo.svg",
      color: "#004B87",
    },
    {
      id: "national_bank_oman",
      name: "National Bank of Oman",
      nameAr: "البنك الوطني العماني",
      logo: "https://www.nbo.om/sites/default/files/nbo-logo.svg",
      color: "#00A651",
    },
    {
      id: "bank_dhofar",
      name: "Bank Dhofar",
      nameAr: "بنك ظفار",
      logo: "https://www.bankdhofar.com/sites/default/files/bank-dhofar-logo.svg",
      color: "#E31E24",
    },
    {
      id: "ahli_bank_oman",
      name: "Ahli Bank",
      nameAr: "البنك الأهلي",
      logo: "https://www.ahlibank.om/sites/default/files/ahli-logo.svg",
      color: "#00843D",
    },
    {
      id: "nizwa_bank",
      name: "Bank Nizwa",
      nameAr: "بنك نزوى",
      logo: "https://www.banknizwa.om/sites/default/files/nizwa-logo.svg",
      color: "#00923F",
    },
    {
      id: "sohar_international",
      name: "Sohar International Bank",
      nameAr: "بنك صحار الدولي",
      logo: "https://www.soharinternational.com/sites/default/files/sohar-logo.svg",
      color: "#0066B2",
    },
  ],
  BH: [
    {
      id: "nbb",
      name: "National Bank of Bahrain",
      nameAr: "بنك البحرين الوطني",
      logo: "https://www.nbbonline.com/sites/default/files/nbb-logo.svg",
      color: "#E31E24",
    },
    {
      id: "bbk",
      name: "Bank of Bahrain and Kuwait",
      nameAr: "بنك البحرين والكويت",
      logo: "https://www.bbkonline.com/sites/default/files/bbk-logo.svg",
      color: "#004B87",
    },
    {
      id: "ahli_united_bahrain",
      name: "Ahli United Bank",
      nameAr: "الأهلي المتحد",
      logo: "https://www.ahliunited.com/en/media/aub-logo.svg",
      color: "#00843D",
    },
    {
      id: "bisb",
      name: "Bahrain Islamic Bank",
      nameAr: "بنك البحرين الإسلامي",
      logo: "https://www.bisb.com/sites/default/files/bisb-logo.svg",
      color: "#00923F",
    },
    {
      id: "ithmaar_bank",
      name: "Ithmaar Bank",
      nameAr: "بنك إثمار",
      logo: "https://www.ithmaarbank.com/sites/default/files/ithmaar-logo.svg",
      color: "#00A651",
    },
    {
      id: "khaleeji_bank",
      name: "Khaleeji Commercial Bank",
      nameAr: "بنك الخليج التجاري",
      logo: "https://www.khcbonline.com/sites/default/files/khaleeji-logo.svg",
      color: "#0066B2",
    },
  ],
};

export const getBanksByCountry = (countryCode: string): Bank[] => {
  return BANKS_BY_COUNTRY[countryCode] || [];
};

export const getBankById = (bankId: string): Bank | undefined => {
  for (const banks of Object.values(BANKS_BY_COUNTRY)) {
    const bank = banks.find((b) => b.id === bankId);
    if (bank) return bank;
  }
  return undefined;
};

// API simulation function (can be replaced with actual API call)
export const fetchBanksByCountry = async (countryCode: string): Promise<Bank[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getBanksByCountry(countryCode);
};
