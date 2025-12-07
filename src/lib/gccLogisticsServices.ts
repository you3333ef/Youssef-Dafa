export interface LogisticsService {
  id: string;
  key: string;
  name: string;
  nameAr: string;
  category: string;
  description?: string;
  estimatedCost?: number;
}

export const gccLogisticsServices = {
  SA: [
    {
      id: 'warehouse',
      key: 'warehouse',
      name: 'Warehouse Storage',
      nameAr: 'تخزين في المستودعات',
      category: 'storage',
      description: 'خدمات التخزين والمستودعات',
      estimatedCost: 1000
    },
    {
      id: 'freight',
      key: 'freight',
      name: 'Freight Forwarding',
      nameAr: 'الشحن والنقل',
      category: 'shipping',
      description: 'خدمات الشحن البري والبحري والجوي',
      estimatedCost: 2000
    },
    {
      id: 'customs',
      key: 'customs',
      name: 'Customs Clearance',
      nameAr: 'التخليص الجمركي',
      category: 'customs',
      description: 'إجراءات التخليص الجمركي',
      estimatedCost: 500
    },
    {
      id: 'distribution',
      key: 'distribution',
      name: 'Distribution Services',
      nameAr: 'خدمات التوزيع',
      category: 'distribution',
      description: 'توزيع البضائع والمنتجات',
      estimatedCost: 1500
    },
    {
      id: 'packaging',
      key: 'packaging',
      name: 'Packaging Services',
      nameAr: 'خدمات التعبئة والتغليف',
      category: 'packaging',
      description: 'تعبئة وتغليف احترافية',
      estimatedCost: 300
    },
    {
      id: 'supply-chain',
      key: 'supply-chain',
      name: 'Supply Chain Management',
      nameAr: 'إدارة سلسلة الإمداد',
      category: 'management',
      description: 'إدارة وتنظيم سلسلة الإمداد',
      estimatedCost: 3000
    }
  ],
  
  AE: [
    {
      id: 'warehouse',
      key: 'warehouse',
      name: 'Warehouse Storage',
      nameAr: 'تخزين في المستودعات',
      category: 'storage',
      description: 'خدمات التخزين والمستودعات',
      estimatedCost: 1500
    },
    {
      id: 'freight',
      key: 'freight',
      name: 'Freight Forwarding',
      nameAr: 'الشحن والنقل',
      category: 'shipping',
      description: 'خدمات الشحن البري والبحري والجوي',
      estimatedCost: 2500
    },
    {
      id: 'customs',
      key: 'customs',
      name: 'Customs Clearance',
      nameAr: 'التخليص الجمركي',
      category: 'customs',
      description: 'إجراءات التخليص الجمركي',
      estimatedCost: 800
    },
    {
      id: 'free-zone',
      key: 'free-zone',
      name: 'Free Zone Services',
      nameAr: 'خدمات المناطق الحرة',
      category: 'free-zone',
      description: 'خدمات المناطق الحرة والتخزين',
      estimatedCost: 2000
    }
  ],
  
  KW: [
    {
      id: 'warehouse',
      key: 'warehouse',
      name: 'Warehouse Storage',
      nameAr: 'تخزين في المستودعات',
      category: 'storage',
      description: 'خدمات التخزين والمستودعات',
      estimatedCost: 100
    },
    {
      id: 'freight',
      key: 'freight',
      name: 'Freight Forwarding',
      nameAr: 'الشحن والنقل',
      category: 'shipping',
      description: 'خدمات الشحن البري والبحري والجوي',
      estimatedCost: 150
    },
    {
      id: 'customs',
      key: 'customs',
      name: 'Customs Clearance',
      nameAr: 'التخليص الجمركي',
      category: 'customs',
      description: 'إجراءات التخليص الجمركي',
      estimatedCost: 50
    }
  ],
  
  QA: [
    {
      id: 'warehouse',
      key: 'warehouse',
      name: 'Warehouse Storage',
      nameAr: 'تخزين في المستودعات',
      category: 'storage',
      description: 'خدمات التخزين والمستودعات',
      estimatedCost: 1200
    },
    {
      id: 'freight',
      key: 'freight',
      name: 'Freight Forwarding',
      nameAr: 'الشحن والنقل',
      category: 'shipping',
      description: 'خدمات الشحن البري والبحري والجوي',
      estimatedCost: 2200
    },
    {
      id: 'customs',
      key: 'customs',
      name: 'Customs Clearance',
      nameAr: 'التخليص الجمركي',
      category: 'customs',
      description: 'إجراءات التخليص الجمركي',
      estimatedCost: 700
    }
  ],
  
  OM: [
    {
      id: 'warehouse',
      key: 'warehouse',
      name: 'Warehouse Storage',
      nameAr: 'تخزين في المستودعات',
      category: 'storage',
      description: 'خدمات التخزين والمستودعات',
      estimatedCost: 40
    },
    {
      id: 'freight',
      key: 'freight',
      name: 'Freight Forwarding',
      nameAr: 'الشحن والنقل',
      category: 'shipping',
      description: 'خدمات الشحن البري والبحري والجوي',
      estimatedCost: 80
    },
    {
      id: 'customs',
      key: 'customs',
      name: 'Customs Clearance',
      nameAr: 'التخليص الجمركي',
      category: 'customs',
      description: 'إجراءات التخليص الجمركي',
      estimatedCost: 25
    }
  ],
  
  BH: [
    {
      id: 'warehouse',
      key: 'warehouse',
      name: 'Warehouse Storage',
      nameAr: 'تخزين في المستودعات',
      category: 'storage',
      description: 'خدمات التخزين والمستودعات',
      estimatedCost: 80
    },
    {
      id: 'freight',
      key: 'freight',
      name: 'Freight Forwarding',
      nameAr: 'الشحن والنقل',
      category: 'shipping',
      description: 'خدمات الشحن البري والبحري والجوي',
      estimatedCost: 120
    },
    {
      id: 'customs',
      key: 'customs',
      name: 'Customs Clearance',
      nameAr: 'التخليص الجمركي',
      category: 'customs',
      description: 'إجراءات التخليص الجمركي',
      estimatedCost: 40
    }
  ]
};

export const getLogisticsServicesByCountry = (countryCode: string): LogisticsService[] => {
  return gccLogisticsServices[countryCode as keyof typeof gccLogisticsServices] || [];
};
