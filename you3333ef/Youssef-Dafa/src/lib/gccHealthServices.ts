export interface HealthService {
  id: string;
  key: string;
  name: string;
  nameAr: string;
  category: string;
  description?: string;
  estimatedCost?: number;
}

export const gccHealthServices = {
  SA: [
    {
      id: 'consultation',
      key: 'consultation',
      name: 'Medical Consultation',
      nameAr: 'استشارة طبية',
      category: 'medical',
      description: 'استشارة طبية مع طبيب متخصص',
      estimatedCost: 200
    },
    {
      id: 'checkup',
      key: 'checkup',
      name: 'Regular Checkup',
      nameAr: 'فحص دوري شامل',
      category: 'medical',
      description: 'فحص طبي شامل',
      estimatedCost: 500
    },
    {
      id: 'vaccination',
      key: 'vaccination',
      name: 'Vaccination',
      nameAr: 'تطعيم',
      category: 'medical',
      description: 'خدمات التطعيم والتحصين',
      estimatedCost: 150
    },
    {
      id: 'lab-tests',
      key: 'lab-tests',
      name: 'Laboratory Tests',
      nameAr: 'تحاليل مخبرية',
      category: 'medical',
      description: 'فحوصات وتحاليل طبية',
      estimatedCost: 300
    },
    {
      id: 'dental',
      key: 'dental',
      name: 'Dental Care',
      nameAr: 'طب الأسنان',
      category: 'dental',
      description: 'خدمات طب وجراحة الأسنان',
      estimatedCost: 400
    },
    {
      id: 'eye-care',
      key: 'eye-care',
      name: 'Eye Care',
      nameAr: 'طب العيون',
      category: 'medical',
      description: 'فحص وعلاج العيون',
      estimatedCost: 350
    },
    {
      id: 'physiotherapy',
      key: 'physiotherapy',
      name: 'Physiotherapy',
      nameAr: 'علاج طبيعي',
      category: 'therapy',
      description: 'جلسات العلاج الطبيعي',
      estimatedCost: 250
    },
    {
      id: 'radiology',
      key: 'radiology',
      name: 'Radiology',
      nameAr: 'الأشعة والتصوير',
      category: 'medical',
      description: 'خدمات الأشعة والتصوير الطبي',
      estimatedCost: 400
    }
  ],
  
  AE: [
    {
      id: 'consultation',
      key: 'consultation',
      name: 'Medical Consultation',
      nameAr: 'استشارة طبية',
      category: 'medical',
      description: 'استشارة طبية مع طبيب متخصص',
      estimatedCost: 350
    },
    {
      id: 'checkup',
      key: 'checkup',
      name: 'Regular Checkup',
      nameAr: 'فحص دوري شامل',
      category: 'medical',
      description: 'فحص طبي شامل',
      estimatedCost: 800
    },
    {
      id: 'vaccination',
      key: 'vaccination',
      name: 'Vaccination',
      nameAr: 'تطعيم',
      category: 'medical',
      description: 'خدمات التطعيم والتحصين',
      estimatedCost: 200
    },
    {
      id: 'lab-tests',
      key: 'lab-tests',
      name: 'Laboratory Tests',
      nameAr: 'تحاليل مخبرية',
      category: 'medical',
      description: 'فحوصات وتحاليل طبية',
      estimatedCost: 450
    },
    {
      id: 'dental',
      key: 'dental',
      name: 'Dental Care',
      nameAr: 'طب الأسنان',
      category: 'dental',
      description: 'خدمات طب وجراحة الأسنان',
      estimatedCost: 600
    },
    {
      id: 'cosmetic',
      key: 'cosmetic',
      name: 'Cosmetic Services',
      nameAr: 'خدمات التجميل',
      category: 'cosmetic',
      description: 'خدمات وعمليات التجميل',
      estimatedCost: 2000
    }
  ],
  
  KW: [
    {
      id: 'consultation',
      key: 'consultation',
      name: 'Medical Consultation',
      nameAr: 'استشارة طبية',
      category: 'medical',
      description: 'استشارة طبية مع طبيب متخصص',
      estimatedCost: 15
    },
    {
      id: 'checkup',
      key: 'checkup',
      name: 'Regular Checkup',
      nameAr: 'فحص دوري شامل',
      category: 'medical',
      description: 'فحص طبي شامل',
      estimatedCost: 40
    },
    {
      id: 'vaccination',
      key: 'vaccination',
      name: 'Vaccination',
      nameAr: 'تطعيم',
      category: 'medical',
      description: 'خدمات التطعيم والتحصين',
      estimatedCost: 10
    },
    {
      id: 'lab-tests',
      key: 'lab-tests',
      name: 'Laboratory Tests',
      nameAr: 'تحاليل مخبرية',
      category: 'medical',
      description: 'فحوصات وتحاليل طبية',
      estimatedCost: 25
    },
    {
      id: 'dental',
      key: 'dental',
      name: 'Dental Care',
      nameAr: 'طب الأسنان',
      category: 'dental',
      description: 'خدمات طب وجراحة الأسنان',
      estimatedCost: 30
    }
  ],
  
  QA: [
    {
      id: 'consultation',
      key: 'consultation',
      name: 'Medical Consultation',
      nameAr: 'استشارة طبية',
      category: 'medical',
      description: 'استشارة طبية مع طبيب متخصص',
      estimatedCost: 300
    },
    {
      id: 'checkup',
      key: 'checkup',
      name: 'Regular Checkup',
      nameAr: 'فحص دوري شامل',
      category: 'medical',
      description: 'فحص طبي شامل',
      estimatedCost: 700
    },
    {
      id: 'vaccination',
      key: 'vaccination',
      name: 'Vaccination',
      nameAr: 'تطعيم',
      category: 'medical',
      description: 'خدمات التطعيم والتحصين',
      estimatedCost: 180
    },
    {
      id: 'lab-tests',
      key: 'lab-tests',
      name: 'Laboratory Tests',
      nameAr: 'تحاليل مخبرية',
      category: 'medical',
      description: 'فحوصات وتحاليل طبية',
      estimatedCost: 400
    }
  ],
  
  OM: [
    {
      id: 'consultation',
      key: 'consultation',
      name: 'Medical Consultation',
      nameAr: 'استشارة طبية',
      category: 'medical',
      description: 'استشارة طبية مع طبيب متخصص',
      estimatedCost: 10
    },
    {
      id: 'checkup',
      key: 'checkup',
      name: 'Regular Checkup',
      nameAr: 'فحص دوري شامل',
      category: 'medical',
      description: 'فحص طبي شامل',
      estimatedCost: 25
    },
    {
      id: 'vaccination',
      key: 'vaccination',
      name: 'Vaccination',
      nameAr: 'تطعيم',
      category: 'medical',
      description: 'خدمات التطعيم والتحصين',
      estimatedCost: 8
    },
    {
      id: 'lab-tests',
      key: 'lab-tests',
      name: 'Laboratory Tests',
      nameAr: 'تحاليل مخبرية',
      category: 'medical',
      description: 'فحوصات وتحاليل طبية',
      estimatedCost: 15
    },
    {
      id: 'dental',
      key: 'dental',
      name: 'Dental Care',
      nameAr: 'طب الأسنان',
      category: 'dental',
      description: 'خدمات طب وجراحة الأسنان',
      estimatedCost: 20
    }
  ],
  
  BH: [
    {
      id: 'consultation',
      key: 'consultation',
      name: 'Medical Consultation',
      nameAr: 'استشارة طبية',
      category: 'medical',
      description: 'استشارة طبية مع طبيب متخصص',
      estimatedCost: 20
    },
    {
      id: 'checkup',
      key: 'checkup',
      name: 'Regular Checkup',
      nameAr: 'فحص دوري شامل',
      category: 'medical',
      description: 'فحص طبي شامل',
      estimatedCost: 50
    },
    {
      id: 'vaccination',
      key: 'vaccination',
      name: 'Vaccination',
      nameAr: 'تطعيم',
      category: 'medical',
      description: 'خدمات التطعيم والتحصين',
      estimatedCost: 12
    },
    {
      id: 'lab-tests',
      key: 'lab-tests',
      name: 'Laboratory Tests',
      nameAr: 'تحاليل مخبرية',
      category: 'medical',
      description: 'فحوصات وتحاليل طبية',
      estimatedCost: 30
    },
    {
      id: 'dental',
      key: 'dental',
      name: 'Dental Care',
      nameAr: 'طب الأسنان',
      category: 'dental',
      description: 'خدمات طب وجراحة الأسنان',
      estimatedCost: 35
    }
  ]
};

export const getHealthServicesByCountry = (countryCode: string): HealthService[] => {
  return gccHealthServices[countryCode as keyof typeof gccHealthServices] || [];
};
