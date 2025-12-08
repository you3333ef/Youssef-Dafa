// Animal transport services by GCC country
export const animalTransportServices = {
  AE: [
    { 
      id: 'equitrans', 
      name: 'إكويترانس لوجستكس - Equitrans Logistics', 
      key: 'equitrans', 
      animalTypes: 'حيوانات أليفة + خيول + مواشي',
      description: 'شركة متخصصة في نقل الحيوانات بخبرة تزيد عن 20 عاماً، تقدم خدمات نقل شاملة للحيوانات الأليفة والخيول والمواشي الصغيرة والكبيرة إلى أكثر من 100 دولة'
    },
    { 
      id: 'carrymypet', 
      name: 'كاري ماي بت - Carry My Pet', 
      key: 'carrymypet', 
      animalTypes: 'حيوانات أليفة',
      description: 'خدمة متخصصة في نقل الحيوانات الأليفة الصغيرة محلياً ودولياً، مع سجل أمان 100٪ وخدمة تتبع مباشر'
    },
    { 
      id: 'sandypaws', 
      name: 'ساندي باوز - Sandy Paws', 
      key: 'sandypaws', 
      animalTypes: 'حيوانات أليفة',
      description: 'خدمة نقل الحيوانات الأليفة بنهج شخصي ومعاملة أخلاقية، نجحت في نقل أكثر من 10,000 حيوان أليف'
    },
  ],
  SA: [
    { 
      id: 'movepets', 
      name: 'موف بتس السعودية - MovePets KSA', 
      key: 'movepets', 
      animalTypes: 'حيوانات أليفة',
      description: 'خدمات نقل الحيوانات الأليفة الشاملة في السعودية، توفر مستشار شخصي لكل عملية نقل مع إدارة كاملة للوثائق والإجراءات'
    },
    { 
      id: 'expatlogistics', 
      name: 'إكسبات لوجستكس - Expat Logistics', 
      key: 'expatlogistics', 
      animalTypes: 'حيوانات أليفة',
      description: 'شركة متخصصة في نقل الحيوانات الأليفة الصغيرة مع خدمات لوجستية متكاملة'
    },
    { 
      id: 'mazedsons', 
      name: 'مازد الشلوي وأبناؤه - Mazed Al-Shalawi Sons', 
      key: 'mazedsons', 
      animalTypes: 'مواشي كبيرة',
      description: 'شركة متخصصة في نقل المواشي الكبيرة مع خبرة واسعة في المنطقة'
    },
  ],
  KW: [
    { 
      id: 'gfsrelocations', 
      name: 'جي إف إس للنقل - GFS Relocations', 
      key: 'gfsrelocations', 
      animalTypes: 'حيوانات أليفة',
      description: 'شركة لوجستية كويتية توفر خدمات نقل الحيوانات الأليفة محلياً ودولياً مع دعم كامل للوثائق والتصاريح'
    },
  ],
  QA: [
    { 
      id: 'qatarairwayscargo', 
      name: 'الخطوط الجوية القطرية للشحن - Qatar Airways Cargo', 
      key: 'qatarairwayscargo', 
      animalTypes: 'حيوانات أليفة + مواشي',
      description: 'خدمات نقل جوي متخصصة للحيوانات الأليفة والمواشي مع مركز حيوانات متطور ورعاية بيطرية'
    },
  ],
  OM: [
    { 
      id: 'soharlivestock', 
      name: 'صحار للماشية - Sohar Livestock', 
      key: 'soharlivestock', 
      animalTypes: 'مواشي كبيرة',
      description: 'شركة متخصصة في نقل المواشي الكبيرة في سلطنة عُمان مع خدمات لوجستية متكاملة'
    },
  ],
  BH: [
    { 
      id: 'delmonpets', 
      name: 'دلمون للحيوانات الأليفة - Delmon Pets Relocators', 
      key: 'delmonpets', 
      animalTypes: 'حيوانات أليفة',
      description: 'أول شركة مسجلة رسمياً في البحرين متخصصة في نقل الحيوانات الأليفة، مرخصة لاستيراد وتصدير الحيوانات الأليفة'
    },
    { 
      id: 'classiccargo', 
      name: 'كلاسيك كارجو - Classic Cargo', 
      key: 'classiccargo', 
      animalTypes: 'مواشي كبيرة',
      description: 'شركة شحن متخصصة في نقل المواشي الكبيرة مع خدمات لوجستية موثوقة'
    },
  ],
  // عام - خدمات خليجية
  GCC: [
    { 
      id: 'globallivestock', 
      name: 'جلوبال لايفستوك لوجستكس - Global Livestock Logistics', 
      key: 'globallivestock', 
      animalTypes: 'مواشي كبيرة',
      description: 'شركة عالمية متخصصة في لوجستيات المواشي الكبيرة مع خدمات شاملة في دول الخليج'
    },
  ],
};

export const getAnimalServicesByCountry = (countryCode: string) => {
  return animalTransportServices[countryCode as keyof typeof animalTransportServices] || [];
};

export const getAllAnimalServices = () => {
  const allServices: any[] = [];
  Object.values(animalTransportServices).forEach(countryServices => {
    allServices.push(...countryServices);
  });
  return allServices;
};
