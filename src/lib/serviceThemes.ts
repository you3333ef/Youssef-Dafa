export interface ServiceTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  lightColor: string;
  darkColor: string;
  gradient: string;
  icon: string;
  description: string;
}

export const serviceThemes: Record<string, ServiceTheme> = {
  payment: {
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    accentColor: '#34d399',
    backgroundColor: '#f0fdf4',
    textColor: '#064e3b',
    lightColor: '#d1fae5',
    darkColor: '#065f46',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    icon: '💳',
    description: 'خدمات الدفع والسداد'
  },
  shipping: {
    primaryColor: '#ea580c',
    secondaryColor: '#f97316',
    accentColor: '#fb923c',
    backgroundColor: '#fff7ed',
    textColor: '#7c2d12',
    lightColor: '#fed7aa',
    darkColor: '#9a3412',
    gradient: 'linear-gradient(135deg, #ea580c, #f97316)',
    icon: '📦',
    description: 'خدمات الشحن والتوصيل'
  },
  chalet: {
    primaryColor: '#0284c7',
    secondaryColor: '#0ea5e9',
    accentColor: '#38bdf8',
    backgroundColor: '#f0f9ff',
    textColor: '#075985',
    lightColor: '#bae6fd',
    darkColor: '#0c4a6e',
    gradient: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
    icon: '🏖️',
    description: 'حجز الشاليهات والاستراحات'
  },
  invoices: {
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    accentColor: '#f87171',
    backgroundColor: '#fef2f2',
    textColor: '#7f1d1d',
    lightColor: '#fecaca',
    darkColor: '#991b1b',
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    icon: '📄',
    description: 'إدارة الفواتير'
  },
  health: {
    primaryColor: '#be123c',
    secondaryColor: '#e11d48',
    accentColor: '#f43f5e',
    backgroundColor: '#fff1f2',
    textColor: '#881337',
    lightColor: '#fecdd3',
    darkColor: '#9f1239',
    gradient: 'linear-gradient(135deg, #be123c, #e11d48)',
    icon: '🏥',
    description: 'الخدمات الصحية'
  },
  logistics: {
    primaryColor: '#7c3aed',
    secondaryColor: '#8b5cf6',
    accentColor: '#a78bfa',
    backgroundColor: '#faf5ff',
    textColor: '#5b21b6',
    lightColor: '#ddd6fe',
    darkColor: '#6b21a8',
    gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    icon: '🚚',
    description: 'الخدمات اللوجستية'
  },
  contracts: {
    primaryColor: '#1e40af',
    secondaryColor: '#2563eb',
    accentColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    textColor: '#1e3a8a',
    lightColor: '#bfdbfe',
    darkColor: '#1e40af',
    gradient: 'linear-gradient(135deg, #1e40af, #2563eb)',
    icon: '📋',
    description: 'إدارة العقود'
  }
};

export function getServiceTheme(serviceType: string): ServiceTheme {
  return serviceThemes[serviceType] || serviceThemes.payment;
}
