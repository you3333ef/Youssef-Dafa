import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import CompanyTopBar from '@/components/CompanyTopBar';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight,
  Shield,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
  status?: 'pending' | 'processing' | 'completed';
}

export const AramexLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount,
  companyKey 
}) => {
  const branding = getBrandingByCompany('aramex');
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <CompanyTopBar 
        companyKey="aramex"
        trackingNumber={trackingNumber}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-l-4" style={{ borderLeftColor: branding?.colors.primary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <Truck className="w-6 h-6" style={{ color: branding?.colors.primary }} />
              </div>
              <div>
                <p className="text-sm text-gray-600">حالة الشحنة</p>
                <p className="font-bold text-lg">قيد المعالجة</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4" style={{ borderLeftColor: branding?.colors.primary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <Clock className="w-6 h-6" style={{ color: branding?.colors.primary }} />
              </div>
              <div>
                <p className="text-sm text-gray-600">وقت التسليم</p>
                <p className="font-bold text-lg">2-3 أيام عمل</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4" style={{ borderLeftColor: branding?.colors.primary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <Shield className="w-6 h-6" style={{ color: branding?.colors.primary }} />
              </div>
              <div>
                <p className="text-sm text-gray-600">الدفع الآمن</p>
                <p className="font-bold text-lg">{amount || 'محمي'}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card 
            className="p-8 shadow-2xl border-t-4"
            style={{ 
              borderTopColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius.lg
            }}
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export const DHLLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount,
  companyKey 
}) => {
  const branding = getBrandingByCompany('dhl');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <CompanyTopBar 
        companyKey="dhl"
        trackingNumber={trackingNumber}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Truck, text: 'توصيل سريع', color: branding?.colors.primary },
            { icon: Globe, text: 'عالمي', color: branding?.colors.secondary },
            { icon: Shield, text: 'آمن', color: branding?.colors.primary },
            { icon: CheckCircle2, text: 'موثوق', color: branding?.colors.secondary }
          ].map((item, idx) => (
            <Card 
              key={idx} 
              className="p-4 text-center hover:shadow-lg transition-all border-2"
              style={{ borderColor: `${item.color}30` }}
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <p className="font-bold text-sm">{item.text}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card 
            className="p-8 shadow-2xl border-t-4"
            style={{ 
              borderTopColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius.lg 
            }}
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export const FedExLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount,
  companyKey 
}) => {
  const branding = getBrandingByCompany('fedex');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <CompanyTopBar 
        companyKey="fedex"
        trackingNumber={trackingNumber}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { icon: Truck, text: 'توصيل سريع', subtitle: 'خدمة مضمونة' },
            { icon: Globe, text: 'شحن دولي', subtitle: '220+ دولة' },
            { icon: Shield, text: 'تأمين كامل', subtitle: 'حماية الشحنة' },
            { icon: Clock, text: 'تتبع فوري', subtitle: '24/7' }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-5 hover:shadow-lg transition-all border-l-4"
              style={{ borderLeftColor: idx % 2 === 0 ? branding?.colors.primary : branding?.colors.secondary }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${idx % 2 === 0 ? branding?.colors.primary : branding?.colors.secondary}15` 
                  }}
                >
                  <item.icon 
                    className="w-6 h-6" 
                    style={{ color: idx % 2 === 0 ? branding?.colors.primary : branding?.colors.secondary }} 
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">{item.text}</p>
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card 
            className="p-8 shadow-2xl border-t-4"
            style={{ 
              borderTopColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius.lg 
            }}
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export const SMSALayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount,
  companyKey 
}) => {
  const branding = getBrandingByCompany('smsa');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <CompanyTopBar 
        companyKey="smsa"
        trackingNumber={trackingNumber}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Truck, label: 'توصيل سريع' },
            { icon: MapPin, label: 'تتبع دقيق' },
            { icon: Shield, label: 'آمن 100%' },
            { icon: CheckCircle2, label: 'موثوق' }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-4 text-center hover:shadow-lg transition-all"
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: branding?.colors.primary }} />
              </div>
              <p className="font-bold text-sm">{item.label}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card 
            className="p-8 shadow-2xl border-t-4"
            style={{ 
              borderTopColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius.lg 
            }}
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

const Globe = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export const getCompanyLayout = (companyKey: string) => {
  const key = companyKey.toLowerCase();
  switch (key) {
    case 'aramex':
      return AramexLayout;
    case 'dhl':
    case 'dhlkw':
    case 'dhlqa':
    case 'dhlom':
    case 'dhlbh':
      return DHLLayout;
    case 'fedex':
      return FedExLayout;
    case 'smsa':
      return SMSALayout;
    default:
      return AramexLayout;
  }
};
