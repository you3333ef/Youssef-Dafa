export interface ChaletService {
  id: string;
  name: string;
  nameEn: string;
  key: string;
  description: string;
  city: string;
  capacity: number;
  defaultPrice: number;
  amenities: string[];
  verified: boolean;
}

export const gccChaletServices = {
  SA: [
    { 
      id: 'sa-abha-mountain', 
      name: 'شاليه جبال أبها', 
      nameEn: 'Abha Mountain Chalet',
      key: 'sa-abha-mountain',
      description: 'شاليه فاخر في جبال أبها مع إطلالة ساحرة على الطبيعة، مجهز بكافة وسائل الراحة والمرافق الحديثة',
      city: 'أبها',
      capacity: 8,
      defaultPrice: 800,
      amenities: ['مسبح خاص', 'مطبخ مجهز', 'WiFi', 'شواية', 'موقف سيارات', 'إطلالة جبلية'],
      verified: true
    },
    { 
      id: 'sa-riyadh-luxury', 
      name: 'شاليه الرياض الفاخر', 
      nameEn: 'Riyadh Luxury Chalet',
      key: 'sa-riyadh-luxury',
      description: 'شاليه عصري في الرياض يوفر أعلى معايير الفخامة والراحة مع مسبح خاص وحديقة واسعة',
      city: 'الرياض',
      capacity: 10,
      defaultPrice: 1200,
      amenities: ['مسبح خاص', 'حديقة واسعة', 'مطبخ كامل', 'WiFi سريع', '4 غرف نوم', 'مجلس خارجي'],
      verified: true
    },
    { 
      id: 'sa-jeddah-beach', 
      name: 'شاليه كورنيش جدة', 
      nameEn: 'Jeddah Corniche Chalet',
      key: 'sa-jeddah-beach',
      description: 'شاليه مطل على البحر في كورنيش جدة، موقع مميز وإطلالة رائعة على البحر الأحمر',
      city: 'جدة',
      capacity: 6,
      defaultPrice: 1000,
      amenities: ['إطلالة بحرية', 'مسبح', 'شاطئ خاص', 'مطبخ مجهز', 'WiFi', 'تكييف مركزي'],
      verified: true
    },
    { 
      id: 'sa-dammam-family', 
      name: 'شاليه الدمام العائلي', 
      nameEn: 'Dammam Family Chalet',
      key: 'sa-dammam-family',
      description: 'شاليه عائلي واسع في الدمام مع مرافق ترفيهية كاملة ومساحات خضراء',
      city: 'الدمام',
      capacity: 12,
      defaultPrice: 900,
      amenities: ['مسبح أطفال', 'ملعب', 'حديقة', 'شواية', '5 غرف نوم', 'صالة ألعاب'],
      verified: true
    },
    { 
      id: 'sa-taif-resort', 
      name: 'منتجع شاليهات الطائف', 
      nameEn: 'Taif Chalets Resort',
      key: 'sa-taif-resort',
      description: 'منتجع متكامل في الطائف مع شاليهات مستقلة وسط الطبيعة الخلابة',
      city: 'الطائف',
      capacity: 8,
      defaultPrice: 850,
      amenities: ['مطعم', 'حمام سباحة عام', 'حديقة', 'WiFi', 'موقف واسع', 'خدمة الغرف'],
      verified: true
    },
    { 
      id: 'sa-alkhobar-modern', 
      name: 'شاليه الخبر الحديث', 
      nameEn: 'Al Khobar Modern Chalet',
      key: 'sa-alkhobar-modern',
      description: 'شاليه حديث في الخبر بتصميم عصري وموقع قريب من الكورنيش',
      city: 'الخبر',
      capacity: 8,
      defaultPrice: 950,
      amenities: ['تصميم عصري', 'مسبح', 'مطبخ ذكي', 'أجهزة ذكية', 'WiFi', 'أمن وحراسة'],
      verified: true
    }
  ],
  
  AE: [
    { 
      id: 'ae-dubai-luxury', 
      name: 'شاليه دبي الفاخر', 
      nameEn: 'Dubai Luxury Chalet',
      key: 'ae-dubai-luxury',
      description: 'شاليه فخم في دبي مع إطلالة على البرج خليفة ومرافق VIP',
      city: 'دبي',
      capacity: 10,
      defaultPrice: 2500,
      amenities: ['مسبح لا متناهي', 'جاكوزي', 'صالة رياضية', 'مطبخ كامل', 'خدم', 'موقف خاص'],
      verified: true
    },
    { 
      id: 'ae-abudhabi-beach', 
      name: 'شاليه شاطئ أبوظبي', 
      nameEn: 'Abu Dhabi Beach Chalet',
      key: 'ae-abudhabi-beach',
      description: 'شاليه على شاطئ أبوظبي مع وصول مباشر للبحر ومرافق راقية',
      city: 'أبوظبي',
      capacity: 8,
      defaultPrice: 2200,
      amenities: ['شاطئ خاص', 'مسبح', 'مطعم', 'واي فاي', 'خدمة 24 ساعة', 'مواقف مؤمنة'],
      verified: true
    },
    { 
      id: 'ae-sharjah-family', 
      name: 'شاليه الشارقة العائلي', 
      nameEn: 'Sharjah Family Chalet',
      key: 'ae-sharjah-family',
      description: 'شاليه عائلي في الشارقة مع حديقة واسعة ومرافق للأطفال',
      city: 'الشارقة',
      capacity: 12,
      defaultPrice: 1500,
      amenities: ['حديقة كبيرة', 'منطقة ألعاب أطفال', 'مسبح', 'شواية', '4 غرف نوم', 'WiFi'],
      verified: true
    },
    { 
      id: 'ae-ajman-villa', 
      name: 'فيلا شاليه عجمان', 
      nameEn: 'Ajman Villa Chalet',
      key: 'ae-ajman-villa',
      description: 'فيلا شاليه راقية في عجمان بتصميم خليجي أصيل',
      city: 'عجمان',
      capacity: 10,
      defaultPrice: 1800,
      amenities: ['تصميم تراثي', 'مسبح', 'مجلس عربي', 'مطبخ كامل', 'حديقة', 'موقف'],
      verified: true
    },
    { 
      id: 'ae-rak-mountain', 
      name: 'شاليه جبال رأس الخيمة', 
      nameEn: 'RAK Mountain Chalet',
      key: 'ae-rak-mountain',
      description: 'شاليه جبلي في رأس الخيمة مع إطلالة بانورامية على جبال الحجر',
      city: 'رأس الخيمة',
      capacity: 6,
      defaultPrice: 1400,
      amenities: ['إطلالة جبلية', 'شرفة واسعة', 'مطبخ مجهز', 'WiFi', 'تدفئة', 'موقف'],
      verified: true
    },
    { 
      id: 'ae-fujairah-beach', 
      name: 'شاليه الفجيرة البحري', 
      nameEn: 'Fujairah Beach Chalet',
      key: 'ae-fujairah-beach',
      description: 'شاليه على شاطئ الفجيرة مع مرافق الرياضات المائية',
      city: 'الفجيرة',
      capacity: 8,
      defaultPrice: 1600,
      amenities: ['شاطئ خاص', 'رياضات مائية', 'مسبح', 'مطبخ', 'WiFi', 'باربيكيو'],
      verified: true
    }
  ],
  
  KW: [
    { 
      id: 'kw-kuwait-city', 
      name: 'شاليه مدينة الكويت', 
      nameEn: 'Kuwait City Chalet',
      key: 'kw-kuwait-city',
      description: 'شاليه راقي في مدينة الكويت مع إطلالة على الخليج',
      city: 'مدينة الكويت',
      capacity: 10,
      defaultPrice: 180,
      amenities: ['إطلالة بحرية', 'مسبح', 'مطبخ كامل', 'WiFi', 'موقف خاص', 'أمن 24 ساعة'],
      verified: true
    },
    { 
      id: 'kw-salmiya-modern', 
      name: 'شاليه السالمية الحديث', 
      nameEn: 'Salmiya Modern Chalet',
      key: 'kw-salmiya-modern',
      description: 'شاليه عصري في السالمية بالقرب من المرافق الترفيهية',
      city: 'السالمية',
      capacity: 8,
      defaultPrice: 150,
      amenities: ['تصميم حديث', 'مسبح', 'جيم', 'WiFi سريع', '3 غرف', 'موقف'],
      verified: true
    },
    { 
      id: 'kw-hawally-family', 
      name: 'شاليه حولي العائلي', 
      nameEn: 'Hawally Family Chalet',
      key: 'kw-hawally-family',
      description: 'شاليه مثالي للعائلات في حولي مع مرافق ترفيهية',
      city: 'حولي',
      capacity: 12,
      defaultPrice: 140,
      amenities: ['حديقة', 'ملعب أطفال', 'مسبح', 'شواية', '4 غرف', 'صالة ألعاب'],
      verified: true
    },
    { 
      id: 'kw-mangaf-beach', 
      name: 'شاليه المنقف الشاطئي', 
      nameEn: 'Mangaf Beach Chalet',
      key: 'kw-mangaf-beach',
      description: 'شاليه على الشاطئ في المنقف مع وصول مباشر للبحر',
      city: 'المنقف',
      capacity: 8,
      defaultPrice: 160,
      amenities: ['شاطئ قريب', 'مسبح', 'شواية', 'مطبخ', 'WiFi', 'موقف'],
      verified: true
    },
    { 
      id: 'kw-jahra-desert', 
      name: 'شاليه الجهراء الصحراوي', 
      nameEn: 'Jahra Desert Chalet',
      key: 'kw-jahra-desert',
      description: 'شاليه في الجهراء وسط الطبيعة الصحراوية الهادئة',
      city: 'الجهراء',
      capacity: 10,
      defaultPrice: 130,
      amenities: ['مخيم', 'شواية', 'مجلس خارجي', 'WiFi', 'حديقة', 'موقف واسع'],
      verified: true
    }
  ],
  
  QA: [
    { 
      id: 'qa-doha-pearl', 
      name: 'شاليه اللؤلؤة - الدوحة', 
      nameEn: 'The Pearl Doha Chalet',
      key: 'qa-doha-pearl',
      description: 'شاليه فاخر في اللؤلؤة قطر مع إطلالة على المارينا',
      city: 'الدوحة',
      capacity: 8,
      defaultPrice: 1800,
      amenities: ['إطلالة مارينا', 'مسبح خاص', 'مطبخ فاخر', 'خدم', 'WiFi', 'موقف خاص'],
      verified: true
    },
    { 
      id: 'qa-west-bay', 
      name: 'شاليه الخليج الغربي', 
      nameEn: 'West Bay Chalet',
      key: 'qa-west-bay',
      description: 'شاليه راقي في الخليج الغربي بالقرب من المعالم الرئيسية',
      city: 'الخليج الغربي',
      capacity: 10,
      defaultPrice: 1600,
      amenities: ['موقع مميز', 'مسبح', 'صالة رياضية', 'مطبخ كامل', 'WiFi', 'خدمة 24/7'],
      verified: true
    },
    { 
      id: 'qa-lusail-luxury', 
      name: 'شاليه لوسيل الفاخر', 
      nameEn: 'Lusail Luxury Chalet',
      key: 'qa-lusail-luxury',
      description: 'شاليه حديث في لوسيل مع أحدث التقنيات والتصميم العصري',
      city: 'لوسيل',
      capacity: 12,
      defaultPrice: 2000,
      amenities: ['منزل ذكي', 'مسبح لا متناهي', 'جاكوزي', 'مطبخ ذكي', 'حديقة', 'أمن متطور'],
      verified: true
    },
    { 
      id: 'qa-alkhor-resort', 
      name: 'منتجع الخور', 
      nameEn: 'Al Khor Resort Chalet',
      key: 'qa-alkhor-resort',
      description: 'منتجع شاليهات في الخور مع مناظر طبيعية خلابة',
      city: 'الخور',
      capacity: 8,
      defaultPrice: 1400,
      amenities: ['منتجع متكامل', 'مسبح عام', 'مطعم', 'حديقة', 'WiFi', 'رياضات'],
      verified: true
    },
    { 
      id: 'qa-dukhan-beach', 
      name: 'شاليه دخان الشاطئي', 
      nameEn: 'Dukhan Beach Chalet',
      key: 'qa-dukhan-beach',
      description: 'شاليه على شاطئ دخان مع أجواء هادئة ومنعزلة',
      city: 'دخان',
      capacity: 6,
      defaultPrice: 1200,
      amenities: ['شاطئ خاص', 'عزل تام', 'مسبح', 'شواية', 'مطبخ', 'WiFi'],
      verified: true
    }
  ],
  
  OM: [
    { 
      id: 'om-muscat-beach', 
      name: 'شاليه شاطئ مسقط', 
      nameEn: 'Muscat Beach Chalet',
      key: 'om-muscat-beach',
      description: 'شاليه على شاطئ مسقط مع إطلالة خلابة على بحر عمان',
      city: 'مسقط',
      capacity: 8,
      defaultPrice: 90,
      amenities: ['شاطئ خاص', 'مسبح', 'مطبخ كامل', 'WiFi', 'شواية', 'موقف'],
      verified: true
    },
    { 
      id: 'om-salalah-resort', 
      name: 'منتجع صلالة', 
      nameEn: 'Salalah Resort Chalet',
      key: 'om-salalah-resort',
      description: 'شاليه في صلالة محاط بالخضرة والطبيعة الساحرة',
      city: 'صلالة',
      capacity: 10,
      defaultPrice: 100,
      amenities: ['محاط بالخضرة', 'مسبح', 'منتجع', 'مطعم', 'WiFi', 'حديقة استوائية'],
      verified: true
    },
    { 
      id: 'om-nizwa-heritage', 
      name: 'شاليه نزوى التراثي', 
      nameEn: 'Nizwa Heritage Chalet',
      key: 'om-nizwa-heritage',
      description: 'شاليه تراثي في نزوى بتصميم عماني أصيل',
      city: 'نزوى',
      capacity: 6,
      defaultPrice: 70,
      amenities: ['تصميم تراثي', 'حديقة', 'مطبخ عماني', 'WiFi', 'مجلس عربي', 'موقف'],
      verified: true
    },
    { 
      id: 'om-sohar-family', 
      name: 'شاليه صحار العائلي', 
      nameEn: 'Sohar Family Chalet',
      key: 'om-sohar-family',
      description: 'شاليه عائلي في صحار مع مرافق ترفيهية للأطفال',
      city: 'صحار',
      capacity: 12,
      defaultPrice: 80,
      amenities: ['منطقة ألعاب', 'مسبح أطفال', 'حديقة', 'شواية', '4 غرف', 'WiFi'],
      verified: true
    },
    { 
      id: 'om-sur-coastal', 
      name: 'شاليه صور الساحلي', 
      nameEn: 'Sur Coastal Chalet',
      key: 'om-sur-coastal',
      description: 'شاليه ساحلي في صور مع إطلالة على موانئ السفن التقليدية',
      city: 'صور',
      capacity: 8,
      defaultPrice: 85,
      amenities: ['إطلالة بحرية', 'قريب من المرفأ', 'مسبح', 'مطبخ', 'WiFi', 'شرفة'],
      verified: true
    },
    { 
      id: 'om-jebel-akhdar', 
      name: 'شاليه الجبل الأخضر', 
      nameEn: 'Jebel Akhdar Mountain Chalet',
      key: 'om-jebel-akhdar',
      description: 'شاليه جبلي في الجبل الأخضر مع مناظر طبيعية خلابة',
      city: 'الجبل الأخضر',
      capacity: 6,
      defaultPrice: 120,
      amenities: ['إطلالة جبلية', 'هواء نقي', 'مطبخ', 'تدفئة', 'WiFi', 'حديقة'],
      verified: true
    }
  ],
  
  BH: [
    { 
      id: 'bh-manama-luxury', 
      name: 'شاليه المنامة الفاخر', 
      nameEn: 'Manama Luxury Chalet',
      key: 'bh-manama-luxury',
      description: 'شاليه فخم في المنامة مع إطلالة على الخليج العربي',
      city: 'المنامة',
      capacity: 8,
      defaultPrice: 120,
      amenities: ['إطلالة بحرية', 'مسبح خاص', 'مطبخ فاخر', 'WiFi', 'خدمات VIP', 'موقف'],
      verified: true
    },
    { 
      id: 'bh-riffa-royal', 
      name: 'شاليه الرفاع الملكي', 
      nameEn: 'Riffa Royal Chalet',
      key: 'bh-riffa-royal',
      description: 'شاليه ملكي في الرفاع مع حديقة واسعة ومرافق راقية',
      city: 'الرفاع',
      capacity: 10,
      defaultPrice: 100,
      amenities: ['حديقة ملكية', 'مسبح كبير', 'صالة رياضية', 'مطبخ كامل', 'WiFi', 'أمن'],
      verified: true
    },
    { 
      id: 'bh-muharraq-heritage', 
      name: 'شاليه المحرق التراثي', 
      nameEn: 'Muharraq Heritage Chalet',
      key: 'bh-muharraq-heritage',
      description: 'شاليه بتصميم تراثي في المحرق يجمع بين الأصالة والحداثة',
      city: 'المحرق',
      capacity: 6,
      defaultPrice: 80,
      amenities: ['تصميم تراثي', 'مطبخ تقليدي', 'حديقة', 'WiFi', 'مجلس', 'موقف'],
      verified: true
    },
    { 
      id: 'bh-amwaj-islands', 
      name: 'شاليه جزر أمواج', 
      nameEn: 'Amwaj Islands Chalet',
      key: 'bh-amwaj-islands',
      description: 'شاليه على جزر أمواج مع وصول مباشر للمارينا',
      city: 'جزر أمواج',
      capacity: 8,
      defaultPrice: 150,
      amenities: ['موقع استراتيجي', 'مسبح', 'شاطئ قريب', 'مطبخ حديث', 'WiFi', 'موقف خاص'],
      verified: true
    },
    { 
      id: 'bh-budaiya-family', 
      name: 'شاليه البديع العائلي', 
      nameEn: 'Budaiya Family Chalet',
      key: 'bh-budaiya-family',
      description: 'شاليه عائلي في البديع مع مساحات واسعة ومرافق للأطفال',
      city: 'البديع',
      capacity: 12,
      defaultPrice: 90,
      amenities: ['مساحة واسعة', 'حديقة', 'ملعب أطفال', 'مسبح', 'شواية', '4 غرف'],
      verified: true
    }
  ]
};

export const getChaletsByCountry = (countryCode: string): ChaletService[] => {
  return gccChaletServices[countryCode as keyof typeof gccChaletServices] || [];
};

export const getChaletByKey = (chaletKey: string): ChaletService | undefined => {
  for (const country in gccChaletServices) {
    const chalets = gccChaletServices[country as keyof typeof gccChaletServices];
    const found = chalets.find(c => c.key === chaletKey);
    if (found) return found;
  }
  return undefined;
};
