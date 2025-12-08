// Comprehensive Chalets and Hotels Database for Gulf Countries
// مكتبة شاملة للشاليهات والفنادق في دول الخليج

export interface ChaletHotel {
  id: string;
  name: string;
  nameAr: string;
  country_code: string;
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  type: 'chalet' | 'hotel' | 'resort' | 'villa' | 'apartment';
  rating: number;
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  default_price: number;
  capacity: number;
  amenities: string[];
  amenitiesAr: string[];
  images: string[];
  verified: boolean;
  google_maps_id?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  description?: string;
  descriptionAr?: string;
}

export const GULF_CHALETS_HOTELS: ChaletHotel[] = [
  // ========== السعودية (Saudi Arabia) ==========
  {
    id: "sa_hotel_001",
    name: "Ritz-Carlton Riyadh",
    nameAr: "فندق ريتز كارلتون الرياض",
    country_code: "SA",
    city: "Riyadh",
    cityAr: "الرياض",
    address: "Al Hada Area, Mekkah Road",
    addressAr: "منطقة الهدا، طريق مكة",
    type: "hotel",
    rating: 5,
    price_range: { min: 1200, max: 3500, currency: "SAR" },
    default_price: 1800,
    capacity: 2,
    amenities: ["Pool", "Spa", "Gym", "Restaurant", "WiFi", "Parking"],
    amenitiesAr: ["مسبح", "سبا", "صالة رياضية", "مطعم", "واي فاي", "موقف سيارات"],
    images: ["/assets/hero-bg.jpg"],
    verified: true,
    latitude: 24.6748,
    longitude: 46.6977,
    phone: "+966114802020"
  },
  {
    id: "sa_hotel_002",
    name: "Four Seasons Hotel Riyadh",
    nameAr: "فندق فورسيزونز الرياض",
    country_code: "SA",
    city: "Riyadh",
    cityAr: "الرياض",
    address: "Kingdom Centre, Al Urubah Road",
    addressAr: "برج المملكة، طريق العروبة",
    type: "hotel",
    rating: 5,
    price_range: { min: 1500, max: 4000, currency: "SAR" },
    default_price: 2200,
    capacity: 2,
    amenities: ["Infinity Pool", "Fine Dining", "Spa", "Business Center"],
    amenitiesAr: ["مسبح لا نهائي", "مطعم فاخر", "سبا", "مركز أعمال"],
    images: ["/assets/hero-bg.jpg"],
    verified: true,
    phone: "+966112115555"
  },
  {
    id: "sa_chalet_001",
    name: "Golden Oasis Chalet",
    nameAr: "شاليه الواحة الذهبية",
    country_code: "SA",
    city: "Riyadh",
    cityAr: "الرياض",
    address: "Narjis District, Al Takhassusi Street",
    addressAr: "حي النرجس، شارع التخصصي",
    type: "chalet",
    rating: 4.5,
    price_range: { min: 600, max: 1200, currency: "SAR" },
    default_price: 800,
    capacity: 10,
    amenities: ["Private Pool", "BBQ", "Kitchen", "WiFi", "Garden"],
    amenitiesAr: ["مسبح خاص", "شواية", "مطبخ", "واي فاي", "حديقة"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "sa_resort_001",
    name: "Red Sea Resort Jeddah",
    nameAr: "منتجع البحر الأحمر جدة",
    country_code: "SA",
    city: "Jeddah",
    cityAr: "جدة",
    address: "Corniche Road, Al Hamra District",
    addressAr: "كورنيش جدة، حي الحمراء",
    type: "resort",
    rating: 5,
    price_range: { min: 1800, max: 5000, currency: "SAR" },
    default_price: 2500,
    capacity: 4,
    amenities: ["Beach Access", "Water Sports", "Spa", "Multiple Restaurants"],
    amenitiesAr: ["شاطئ خاص", "رياضات مائية", "سبا", "مطاعم متعددة"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "sa_hotel_003",
    name: "Movenpick Hotel Jeddah",
    nameAr: "فندق موفنبيك جدة",
    country_code: "SA",
    city: "Jeddah",
    cityAr: "جدة",
    address: "Palestine Road",
    addressAr: "طريق فلسطين",
    type: "hotel",
    rating: 4,
    price_range: { min: 800, max: 1500, currency: "SAR" },
    default_price: 1000,
    capacity: 2,
    amenities: ["Pool", "Restaurant", "Gym", "Free Parking"],
    amenitiesAr: ["مسبح", "مطعم", "صالة رياضية", "موقف مجاني"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "sa_chalet_002",
    name: "Jasmine Chalet",
    nameAr: "شاليه الياسمين",
    country_code: "SA",
    city: "Jeddah",
    cityAr: "جدة",
    address: "Beach District, Jeddah Corniche",
    addressAr: "حي الشاطئ، كورنيش جدة",
    type: "chalet",
    rating: 4.8,
    price_range: { min: 1000, max: 1800, currency: "SAR" },
    default_price: 1200,
    capacity: 15,
    amenities: ["Sea View", "Pool", "BBQ", "Kids Playground"],
    amenitiesAr: ["إطلالة بحرية", "مسبح", "شواية", "ألعاب أطفال"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "sa_hotel_004",
    name: "Hilton Dammam",
    nameAr: "فندق هيلتون الدمام",
    country_code: "SA",
    city: "Dammam",
    cityAr: "الدمام",
    address: "King Fahd Road",
    addressAr: "طريق الملك فهد",
    type: "hotel",
    rating: 4,
    price_range: { min: 700, max: 1400, currency: "SAR" },
    default_price: 900,
    capacity: 2,
    amenities: ["Pool", "Restaurant", "Business Center", "Spa"],
    amenitiesAr: ["مسبح", "مطعم", "مركز أعمال", "سبا"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },

  // ========== الإمارات (UAE) ==========
  {
    id: "ae_hotel_001",
    name: "Burj Al Arab",
    nameAr: "برج العرب",
    country_code: "AE",
    city: "Dubai",
    cityAr: "دبي",
    address: "Jumeirah Beach Road",
    addressAr: "شارع جميرا",
    type: "hotel",
    rating: 5,
    price_range: { min: 5000, max: 15000, currency: "AED" },
    default_price: 8000,
    capacity: 2,
    amenities: ["Private Beach", "Helicopter Transfer", "Gold iPad", "Butler Service"],
    amenitiesAr: ["شاطئ خاص", "نقل بالهليكوبتر", "آيباد ذهبي", "خدمة الخادم الشخصي"],
    images: ["/assets/hero-bg.jpg"],
    verified: true,
    phone: "+97143017777"
  },
  {
    id: "ae_hotel_002",
    name: "Atlantis The Palm",
    nameAr: "أتلانتس النخلة",
    country_code: "AE",
    city: "Dubai",
    cityAr: "دبي",
    address: "Palm Jumeirah",
    addressAr: "نخلة جميرا",
    type: "resort",
    rating: 5,
    price_range: { min: 2500, max: 8000, currency: "AED" },
    default_price: 3500,
    capacity: 4,
    amenities: ["Aquaventure", "Lost Chambers Aquarium", "Multiple Pools", "20+ Restaurants"],
    amenitiesAr: ["حديقة أكوافينتشر المائية", "أكواريوم", "مسابح متعددة", "أكثر من 20 مطعم"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "ae_chalet_001",
    name: "Palm Emirates Luxury Chalet",
    nameAr: "شاليه النخيل الإماراتي الفاخر",
    country_code: "AE",
    city: "Dubai",
    cityAr: "دبي",
    address: "Al Quoz Area, Near Burj Khalifa",
    addressAr: "منطقة القوز، بالقرب من برج خليفة",
    type: "chalet",
    rating: 4.9,
    price_range: { min: 1200, max: 2500, currency: "AED" },
    default_price: 1500,
    capacity: 12,
    amenities: ["Infinity Pool", "Jacuzzi", "Private Gym", "Ultra-fast WiFi"],
    amenitiesAr: ["مسبح لا نهائي", "جاكوزي", "صالة رياضة خاصة", "واي فاي فائق السرعة"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "ae_hotel_003",
    name: "Emirates Palace Abu Dhabi",
    nameAr: "قصر الإمارات أبوظبي",
    country_code: "AE",
    city: "Abu Dhabi",
    cityAr: "أبوظبي",
    address: "West Corniche Road",
    addressAr: "كورنيش أبوظبي الغربي",
    type: "hotel",
    rating: 5,
    price_range: { min: 3000, max: 10000, currency: "AED" },
    default_price: 4500,
    capacity: 2,
    amenities: ["Private Beach", "Marina", "Spa", "Gold-plated facilities"],
    amenitiesAr: ["شاطئ خاص", "مرسى", "سبا", "مرافق مطلية بالذهب"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "ae_chalet_002",
    name: "Yas Island Luxury Chalet",
    nameAr: "شاليه جزيرة ياس الفاخر",
    country_code: "AE",
    city: "Abu Dhabi",
    cityAr: "أبوظبي",
    address: "Yas Island, Near Ferrari World",
    addressAr: "جزيرة ياس، بالقرب من عالم فيراري",
    type: "chalet",
    rating: 5,
    price_range: { min: 1500, max: 3000, currency: "AED" },
    default_price: 2000,
    capacity: 20,
    amenities: ["Sea View", "Private Pool", "Private Beach", "Delivery Service"],
    amenitiesAr: ["إطلالة بحرية", "مسبح خاص", "شاطئ خاص", "خدمة توصيل"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },

  // ========== الكويت (Kuwait) ==========
  {
    id: "kw_hotel_001",
    name: "Jumeirah Messilah Beach Hotel",
    nameAr: "فندق جميرا المسيلة البحري",
    country_code: "KW",
    city: "Kuwait City",
    cityAr: "مدينة الكويت",
    address: "Messilah Beach",
    addressAr: "شاطئ المسيلة",
    type: "resort",
    rating: 5,
    price_range: { min: 150, max: 400, currency: "KWD" },
    default_price: 250,
    capacity: 2,
    amenities: ["Private Beach", "Multiple Pools", "Water Sports", "Kids Club"],
    amenitiesAr: ["شاطئ خاص", "مسابح متعددة", "رياضات مائية", "نادي أطفال"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "kw_hotel_002",
    name: "Symphony Style Hotel Kuwait",
    nameAr: "فندق سيمفوني ستايل الكويت",
    country_code: "KW",
    city: "Kuwait City",
    cityAr: "مدينة الكويت",
    address: "Salmiya, Salem Al Mubarak Street",
    addressAr: "السالمية، شارع سالم المبارك",
    type: "hotel",
    rating: 4.5,
    price_range: { min: 80, max: 200, currency: "KWD" },
    default_price: 120,
    capacity: 2,
    amenities: ["Rooftop Pool", "Gym", "Restaurant", "City View"],
    amenitiesAr: ["مسبح على السطح", "صالة رياضية", "مطعم", "إطلالة على المدينة"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "kw_chalet_001",
    name: "Gulf Pearl Chalet",
    nameAr: "شاليه لؤلؤة الخليج",
    country_code: "KW",
    city: "Kuwait City",
    cityAr: "مدينة الكويت",
    address: "Salmiya Area, Near Beach",
    addressAr: "منطقة السالمية، بالقرب من الشاطئ",
    type: "chalet",
    rating: 4.7,
    price_range: { min: 60, max: 150, currency: "KWD" },
    default_price: 90,
    capacity: 10,
    amenities: ["Heated Pool", "Traditional Majlis", "Equipped Kitchen", "Parking"],
    amenitiesAr: ["مسبح مدفأ", "مجلس تراثي", "مطبخ مجهز", "موقف سيارات"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "kw_hotel_003",
    name: "The Regency Hotel Kuwait",
    nameAr: "فندق ريجنسي الكويت",
    country_code: "KW",
    city: "Kuwait City",
    cityAr: "مدينة الكويت",
    address: "Abdullah Al-Mubarak Street, Salmiya",
    addressAr: "شارع عبدالله المبارك، السالمية",
    type: "hotel",
    rating: 4,
    price_range: { min: 70, max: 180, currency: "KWD" },
    default_price: 100,
    capacity: 2,
    amenities: ["Pool", "Spa", "Multiple Restaurants", "Business Center"],
    amenitiesAr: ["مسبح", "سبا", "مطاعم متعددة", "مركز أعمال"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },

  // ========== قطر (Qatar) ==========
  {
    id: "qa_hotel_001",
    name: "The St. Regis Doha",
    nameAr: "فندق سانت ريجيس الدوحة",
    country_code: "QA",
    city: "Doha",
    cityAr: "الدوحة",
    address: "West Bay, Doha Corniche",
    addressAr: "الخليج الغربي، كورنيش الدوحة",
    type: "hotel",
    rating: 5,
    price_range: { min: 1500, max: 5000, currency: "QAR" },
    default_price: 2200,
    capacity: 2,
    amenities: ["Private Beach", "Spa", "Fine Dining", "Butler Service"],
    amenitiesAr: ["شاطئ خاص", "سبا", "مطعم فاخر", "خدمة خادم شخصي"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "qa_hotel_002",
    name: "Mondrian Doha",
    nameAr: "فندق مونديان الدوحة",
    country_code: "QA",
    city: "Doha",
    cityAr: "الدوحة",
    address: "West Bay Lagoon",
    addressAr: "بحيرة الخليج الغربي",
    type: "hotel",
    rating: 5,
    price_range: { min: 1200, max: 3500, currency: "QAR" },
    default_price: 1800,
    capacity: 2,
    amenities: ["Rooftop Pool", "Modern Design", "Multiple Restaurants", "Spa"],
    amenitiesAr: ["مسبح على السطح", "تصميم عصري", "مطاعم متعددة", "سبا"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "qa_chalet_001",
    name: "Pearl Qatar Luxury Chalet",
    nameAr: "شاليه اللؤلؤة القطري الفاخر",
    country_code: "QA",
    city: "Doha",
    cityAr: "الدوحة",
    address: "The Pearl Qatar, Near Katara",
    addressAr: "اللؤلؤة قطر، بالقرب من كتارا",
    type: "chalet",
    rating: 4.9,
    price_range: { min: 800, max: 1800, currency: "QAR" },
    default_price: 1100,
    capacity: 12,
    amenities: ["Sea View", "Pool", "Private Marina", "WiFi"],
    amenitiesAr: ["إطلالة بحرية", "مسبح", "مرسى خاص", "واي فاي"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "qa_hotel_003",
    name: "W Doha Hotel & Residences",
    nameAr: "فندق وريزيدنس دبليو الدوحة",
    country_code: "QA",
    city: "Doha",
    cityAr: "الدوحة",
    address: "West Bay",
    addressAr: "الخليج الغربي",
    type: "hotel",
    rating: 5,
    price_range: { min: 1400, max: 4000, currency: "QAR" },
    default_price: 2000,
    capacity: 2,
    amenities: ["Beach Club", "Spa", "Rooftop Bar", "Modern Luxury"],
    amenitiesAr: ["نادي شاطئي", "سبا", "بار على السطح", "فخامة عصرية"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },

  // ========== البحرين (Bahrain) ==========
  {
    id: "bh_hotel_001",
    name: "The Ritz-Carlton Bahrain",
    nameAr: "فندق ريتز كارلتون البحرين",
    country_code: "BH",
    city: "Manama",
    cityAr: "المنامة",
    address: "Seef District",
    addressAr: "منطقة السيف",
    type: "hotel",
    rating: 5,
    price_range: { min: 150, max: 400, currency: "BHD" },
    default_price: 220,
    capacity: 2,
    amenities: ["Private Beach", "Spa", "Multiple Pools", "Fine Dining"],
    amenitiesAr: ["شاطئ خاص", "سبا", "مسابح متعددة", "مطعم فاخر"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "bh_hotel_002",
    name: "Four Seasons Hotel Bahrain Bay",
    nameAr: "فندق فورسيزونز خليج البحرين",
    country_code: "BH",
    city: "Manama",
    cityAr: "المنامة",
    address: "Bahrain Bay",
    addressAr: "خليج البحرين",
    type: "hotel",
    rating: 5,
    price_range: { min: 180, max: 500, currency: "BHD" },
    default_price: 280,
    capacity: 2,
    amenities: ["Waterfront", "Spa", "Infinity Pool", "Premium Dining"],
    amenitiesAr: ["واجهة بحرية", "سبا", "مسبح لا نهائي", "مطاعم فاخرة"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "bh_chalet_001",
    name: "Bahrain Royal Chalet",
    nameAr: "شاليه البحرين الملكي",
    country_code: "BH",
    city: "Manama",
    cityAr: "المنامة",
    address: "Seef Area, Near Bab Al Bahrain",
    addressAr: "منطقة السيف، بالقرب من باب البحرين",
    type: "chalet",
    rating: 4.6,
    price_range: { min: 50, max: 120, currency: "BHD" },
    default_price: 75,
    capacity: 8,
    amenities: ["Pool", "BBQ", "Majlis", "Parking"],
    amenitiesAr: ["مسبح", "شواية", "مجلس", "موقف سيارات"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "bh_hotel_003",
    name: "Sofitel Bahrain Zallaq Thalassa Sea & Spa",
    nameAr: "فندق سوفيتيل البحرين الزلاق",
    country_code: "BH",
    city: "Zallaq",
    cityAr: "الزلاق",
    address: "Zallaq Highway",
    addressAr: "طريق الزلاق السريع",
    type: "resort",
    rating: 5,
    price_range: { min: 120, max: 350, currency: "BHD" },
    default_price: 180,
    capacity: 2,
    amenities: ["Private Beach", "Thalassotherapy Spa", "Water Sports", "Kids Club"],
    amenitiesAr: ["شاطئ خاص", "سبا بحري", "رياضات مائية", "نادي أطفال"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },

  // ========== عمان (Oman) ==========
  {
    id: "om_hotel_001",
    name: "Al Bustan Palace, A Ritz-Carlton Hotel",
    nameAr: "فندق قصر البستان، ريتز كارلتون",
    country_code: "OM",
    city: "Muscat",
    cityAr: "مسقط",
    address: "Al Bustan",
    addressAr: "البستان",
    type: "hotel",
    rating: 5,
    price_range: { min: 180, max: 500, currency: "OMR" },
    default_price: 280,
    capacity: 2,
    amenities: ["Private Beach", "Spa", "Mountain View", "Luxury Dining"],
    amenitiesAr: ["شاطئ خاص", "سبا", "إطلالة جبلية", "مطاعم فاخرة"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "om_hotel_002",
    name: "Shangri-La Barr Al Jissah Resort",
    nameAr: "منتجع شانغريلا بر الجصة",
    country_code: "OM",
    city: "Muscat",
    cityAr: "مسقط",
    address: "Barr Al Jissah",
    addressAr: "بر الجصة",
    type: "resort",
    rating: 5,
    price_range: { min: 150, max: 450, currency: "OMR" },
    default_price: 250,
    capacity: 4,
    amenities: ["Private Cove", "Multiple Pools", "Spa", "Water Sports", "Kids Club"],
    amenitiesAr: ["خليج خاص", "مسابح متعددة", "سبا", "رياضات مائية", "نادي أطفال"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "om_chalet_001",
    name: "Green Oman Chalet",
    nameAr: "شاليه عُمان الأخضر",
    country_code: "OM",
    city: "Muscat",
    cityAr: "مسقط",
    address: "Al Qurum Area, Near Al Qurum Beach",
    addressAr: "منطقة القرم، بالقرب من شاطئ القرم",
    type: "chalet",
    rating: 4.5,
    price_range: { min: 40, max: 100, currency: "OMR" },
    default_price: 60,
    capacity: 10,
    amenities: ["Green Garden", "Pool", "Kitchen", "BBQ"],
    amenitiesAr: ["حديقة خضراء", "مسبح", "مطبخ", "شواية"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
  {
    id: "om_hotel_003",
    name: "The Chedi Muscat",
    nameAr: "فندق الشيدي مسقط",
    country_code: "OM",
    city: "Muscat",
    cityAr: "مسقط",
    address: "North Ghubra",
    addressAr: "الغبرة الشمالية",
    type: "hotel",
    rating: 5,
    price_range: { min: 200, max: 600, currency: "OMR" },
    default_price: 350,
    capacity: 2,
    amenities: ["Beach", "Long Pool", "Spa", "Fine Dining", "Minimalist Design"],
    amenitiesAr: ["شاطئ", "مسبح طويل", "سبا", "مطعم فاخر", "تصميم بسيط"],
    images: ["/assets/hero-bg.jpg"],
    verified: true
  },
];

/**
 * Get all chalets and hotels by country code
 */
export const getChaletsHotelsByCountry = (countryCode: string): ChaletHotel[] => {
  return GULF_CHALETS_HOTELS.filter(item => item.country_code === countryCode.toUpperCase());
};

/**
 * Get chalet/hotel by ID
 */
export const getChaletHotelById = (id: string): ChaletHotel | undefined => {
  return GULF_CHALETS_HOTELS.find(item => item.id === id);
};

/**
 * Get chalets/hotels by type
 */
export const getChaletsHotelsByType = (
  countryCode: string, 
  type: ChaletHotel['type']
): ChaletHotel[] => {
  return GULF_CHALETS_HOTELS.filter(
    item => item.country_code === countryCode.toUpperCase() && item.type === type
  );
};

/**
 * Get chalets/hotels by city
 */
export const getChaletsHotelsByCity = (
  countryCode: string, 
  city: string
): ChaletHotel[] => {
  return GULF_CHALETS_HOTELS.filter(
    item => 
      item.country_code === countryCode.toUpperCase() && 
      item.city.toLowerCase() === city.toLowerCase()
  );
};

/**
 * Search chalets/hotels by name
 */
export const searchChaletsHotels = (
  countryCode: string, 
  searchTerm: string
): ChaletHotel[] => {
  const term = searchTerm.toLowerCase();
  return GULF_CHALETS_HOTELS.filter(
    item => 
      item.country_code === countryCode.toUpperCase() && 
      (item.name.toLowerCase().includes(term) || 
       item.nameAr.includes(searchTerm))
  );
};

/**
 * Get all countries with chalets/hotels
 */
export const getCountriesWithChalets = (): string[] => {
  return [...new Set(GULF_CHALETS_HOTELS.map(item => item.country_code))];
};

/**
 * Get statistics for a country
 */
export const getChaletHotelStats = (countryCode: string) => {
  const items = getChaletsHotelsByCountry(countryCode);
  return {
    total: items.length,
    chalets: items.filter(i => i.type === 'chalet').length,
    hotels: items.filter(i => i.type === 'hotel').length,
    resorts: items.filter(i => i.type === 'resort').length,
    villas: items.filter(i => i.type === 'villa').length,
    apartments: items.filter(i => i.type === 'apartment').length,
    avgRating: items.reduce((sum, i) => sum + i.rating, 0) / items.length,
    verified: items.filter(i => i.verified).length,
  };
};
