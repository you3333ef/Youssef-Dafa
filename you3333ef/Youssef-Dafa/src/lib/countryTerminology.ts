export interface CountryTerminology {
  countryCode: string;
  invoiceNumber: string;
  invoiceNumberPlaceholder: string;
  paymentAmount: string;
  bankLogin: string;
  otpMessage: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  proceed: string;
  cancel: string;
  back: string;
  next: string;
  submit: string;
  payNow: string;
  securePayment: string;
  selectBank: string;
  selectService: string;
  termsAndConditions: string;
}

export const countryTerminology: Record<string, CountryTerminology> = {
  SA: {
    countryCode: "SA",
    invoiceNumber: "الرقم المفوتر",
    invoiceNumberPlaceholder: "INV-12345",
    paymentAmount: "مبلغ السداد",
    bankLogin: "تسجيل دخول البنك",
    otpMessage: "تم إرسال رمز التحقق إلى جوالك",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز الأمان",
    customerName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    proceed: "المتابعة",
    cancel: "إلغاء",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    payNow: "ادفع الآن",
    securePayment: "دفع آمن ومشفر",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    termsAndConditions: "بالمتابعة، أنت توافق على الشروط والأحكام"
  },
  AE: {
    countryCode: "AE",
    invoiceNumber: "رقم الفاتورة",
    invoiceNumberPlaceholder: "INV-12345",
    paymentAmount: "مبلغ الدفع",
    bankLogin: "تسجيل دخول البنك",
    otpMessage: "تم إرسال رمز التحقق إلى هاتفك",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز CVV",
    customerName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    proceed: "المتابعة",
    cancel: "إلغاء",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    payNow: "ادفع الآن",
    securePayment: "دفع آمن ومحمي",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    termsAndConditions: "بالمتابعة، أنت توافق على الشروط والأحكام"
  },
  KW: {
    countryCode: "KW",
    invoiceNumber: "رقم الفاتورة",
    invoiceNumberPlaceholder: "INV-12345",
    paymentAmount: "مبلغ الدفع",
    bankLogin: "تسجيل دخول البنك",
    otpMessage: "تم إرسال رمز التحقق على رقمك",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "الرمز السري",
    customerName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المنطقة",
    postalCode: "الرمز البريدي",
    proceed: "المتابعة",
    cancel: "إلغاء",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    payNow: "ادفع الآن",
    securePayment: "دفع آمن ومحمي",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    termsAndConditions: "بالمتابعة، أنت توافق على الشروط والأحكام"
  },
  QA: {
    countryCode: "QA",
    invoiceNumber: "رقم الفاتورة",
    invoiceNumberPlaceholder: "INV-12345",
    paymentAmount: "مبلغ الدفع",
    bankLogin: "تسجيل دخول البنك",
    otpMessage: "تم إرسال رمز التحقق إلى هاتفك",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز الأمان",
    customerName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    proceed: "المتابعة",
    cancel: "إلغاء",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    payNow: "ادفع الآن",
    securePayment: "دفع آمن ومحمي",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    termsAndConditions: "بالمتابعة، أنت توافق على الشروط والأحكام"
  },
  OM: {
    countryCode: "OM",
    invoiceNumber: "رقم الفاتورة",
    invoiceNumberPlaceholder: "INV-12345",
    paymentAmount: "مبلغ السداد",
    bankLogin: "تسجيل دخول البنك",
    otpMessage: "تم إرسال رمز التحقق على هاتفك",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز CVV",
    customerName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    proceed: "المتابعة",
    cancel: "إلغاء",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    payNow: "ادفع الآن",
    securePayment: "دفع آمن ومشفر",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    termsAndConditions: "بالمتابعة، أنت توافق على الشروط والأحكام"
  },
  BH: {
    countryCode: "BH",
    invoiceNumber: "رقم الفاتورة",
    invoiceNumberPlaceholder: "INV-12345",
    paymentAmount: "مبلغ الدفع",
    bankLogin: "تسجيل دخول البنك",
    otpMessage: "تم إرسال رمز التحقق إلى هاتفك",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز الأمان",
    customerName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    proceed: "المتابعة",
    cancel: "إلغاء",
    back: "رجوع",
    next: "التالي",
    submit: "إرسال",
    payNow: "ادفع الآن",
    securePayment: "دفع آمن ومحمي",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    termsAndConditions: "بالمتابعة، أنت توافق على الشروط والأحكام"
  }
};

export const getCountryTerminology = (countryCode: string): CountryTerminology => {
  return countryTerminology[countryCode] || countryTerminology["SA"];
};
