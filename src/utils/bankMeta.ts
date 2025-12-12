/**
 * Bank Metadata for Social Sharing
 * بيانات البنوك لمشاركة الروابط
 */

export interface BankMeta {
  image: string;
  title: string;
  description: string;
}

export const BANK_META_MAP: Record<string, BankMeta> = {
  // Saudi Arabia
  alrajhi_bank: {
    image: "/og-bank-alrajhi_bank.jpg",
    title: "تسجيل الدخول - مصرف الراجحي",
    description: "مصرف الراجحي - البنك الإسلامي الأول في المملكة - نقدم حلول مصرفية متوافقة مع الشريعة الإسلامية للأفراد والشركات مع خدمات رقمية متطورة"
  },
  alahli_bank: {
    image: "/og-bank-alahli_bank.jpg",
    title: "تسجيل الدخول - البنك الأهلي السعودي",
    description: "البنك الأهلي السعودي - أكبر بنك في المملكة - خدمات مصرفية متكاملة للأفراد والشركات مع حلول رقمية مبتكرة وتجربة مصرفية استثنائية"
  },
  riyad_bank: {
    image: "/og-bank-riyad_bank.jpg",
    title: "تسجيل الدخول - بنك الرياض",
    description: "بنك الرياض - شريكك المصرفي الموثوق - نقدم خدمات مصرفية متطورة للأفراد والشركات مع حلول تمويلية مرنة وخدمات رقمية متقدمة"
  },
  
  // UAE
  emirates_nbd: {
    image: "/og-bank-emirates_nbd.jpg",
    title: "تسجيل الدخول - بنك الإمارات دبي الوطني",
    description: "بنك الإمارات دبي الوطني - المجموعة المصرفية الرائدة في المنطقة - خدمات مصرفية شاملة مع حلول رقمية متطورة وتجربة عملاء استثنائية"
  },
  fab: {
    image: "/og-bank-fab.jpg",
    title: "تسجيل الدخول - بنك أبوظبي الأول",
    description: "بنك أبوظبي الأول - البنك الرائد في الإمارات والمنطقة - حلول مصرفية متكاملة مع خدمات رقمية مبتكرة وتجربة عالمية المستوى"
  },
  
  // Qatar
  qnb: {
    image: "/og-bank-qnb.jpg",
    title: "تسجيل الدخول - بنك قطر الوطني",
    description: "بنك قطر الوطني - أكبر بنك في الشرق الأوسط وأفريقيا - خدمات مصرفية شاملة مع حلول مالية مبتكرة وتواجد عالمي في أكثر من 30 دولة"
  },
  
  // Kuwait
  nbk: {
    image: "/og-bank-nbk.jpg",
    title: "تسجيل الدخول - بنك الكويت الوطني",
    description: "بنك الكويت الوطني - البنك الرائد في الكويت والمنطقة - خدمات مصرفية متميزة للأفراد والشركات مع حلول رقمية متطورة وشبكة فروع واسعة"
  },
  
  // Oman
  bank_muscat: {
    image: "/og-bank-bank_muscat.jpg",
    title: "تسجيل الدخول - بنك مسقط",
    description: "بنك مسقط - البنك الرائد في سلطنة عُمان - خدمات مصرفية شاملة مع حلول مالية مبتكرة وتجربة مصرفية متميزة لجميع شرائح العملاء"
  },
  
  // Bahrain
  nbb: {
    image: "/og-bank-nbb.jpg",
    title: "تسجيل الدخول - بنك البحرين الوطني",
    description: "بنك البحرين الوطني - البنك الرائد في البحرين - خدمات مصرفية متكاملة للأفراد والشركات مع حلول مالية مبتكرة وخدمات رقمية متقدمة"
  },
  
  // Default
  default: {
    image: "/og-bank_pages.jpg",
    title: "تسجيل الدخول - الخدمات المصرفية الإلكترونية",
    description: "خدمات مصرفية إلكترونية آمنة - نقدم حلول مصرفية رقمية متطورة مع أعلى معايير الأمان والحماية"
  }
};

/**
 * Get bank metadata with absolute URLs
 */
export const getBankMeta = (bankId: string): BankMeta => {
  if (!bankId || bankId === 'skipped') {
    return BANK_META_MAP.default;
  }
  
  const meta = BANK_META_MAP[bankId] || BANK_META_MAP.default;
  
  // Convert to absolute URL
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://sensational-fenglisu-ebbbfb.netlify.app';
  
  return {
    ...meta,
    image: meta.image.startsWith('http') ? meta.image : `${baseUrl}${meta.image}`
  };
};
