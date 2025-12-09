import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { getServiceBranding } from '@/lib/serviceLogos';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Shield,
  CreditCard,
  AlertCircle,
  MapPin
} from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
  status?: 'pending' | 'processing' | 'completed';
}

const GenericCompanyLayout: React.FC<CompanyLayoutProps> = ({ 
  companyKey,
  children, 
  trackingNumber, 
  amount,
  status = 'pending' 
}) => {
  const branding = getBrandingByCompany(companyKey);
  const serviceBranding = getServiceBranding(companyKey);
  
  // Use branding from brandingSystem if available, otherwise use serviceBranding
  const colors = branding?.colors || serviceBranding?.colors || { 
    primary: '#DC291E', 
    secondary: '#8B1A12',
    text: '#1A1A1A'
  };
  
  const gradients = branding?.gradients || {
    primary: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    hero: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
  };

  const companyName = branding?.nameAr || serviceBranding?.nameAr || companyKey;
  const companyNameEn = branding?.nameEn || serviceBranding?.nameEn || companyKey;
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header Bar with Company Branding */}
      <div 
        className="h-20 flex items-center px-6 shadow-lg"
        style={{ background: gradients.primary }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {serviceBranding?.logo ? (
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src={serviceBranding.logo} 
                  alt={companyName}
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="font-black text-xl px-2" style="color: ${colors.primary}">${companyNameEn}</span>`;
                    }
                  }}
                />
              </div>
            ) : (
              <div className="bg-white p-3 rounded-lg">
                <span className="font-black text-xl" style={{ color: colors.primary }}>
                  {companyNameEn}
                </span>
              </div>
            )}
            <div className="text-white">
              <p className="font-bold text-lg">{companyName}</p>
              <p className="text-xs opacity-90">خدمات الشحن والتوصيل</p>
            </div>
          </div>
          {trackingNumber && (
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <span className="text-xs">رقم التتبع:</span>
              <span className="font-mono mr-1">{trackingNumber}</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Truck, label: 'شحن سريع', desc: 'توصيل آمن' },
            { icon: Shield, label: 'دفع آمن', desc: 'حماية كاملة' },
            { icon: MapPin, label: 'تتبع مباشر', desc: 'Tracking' },
            { icon: CheckCircle2, label: 'مضمون', desc: 'Guaranteed' }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-3 text-center border-2 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: `${colors.primary}30` }}
            >
              <div 
                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <item.icon className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <p className="font-bold text-xs">{item.label}</p>
              <p className="text-[10px] text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="p-6 md:p-8 shadow-xl border-t-4" style={{ borderTopColor: colors.primary }}>
          <div 
            className="flex items-center gap-3 mb-6 pb-4 border-b-2"
            style={{ borderBottomColor: `${colors.primary}40` }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: gradients.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">إكمال عملية الدفع</h2>
          </div>

          {children}
        </Card>

        {/* Info Box */}
        <div 
          className="mt-6 p-4 rounded-lg border"
          style={{ 
            backgroundColor: `${colors.primary}10`,
            borderColor: `${colors.primary}30`
          }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
            <div className="text-sm">
              <p className="font-semibold mb-1" style={{ color: colors.text }}>معلومات مهمة</p>
              <p className="text-gray-700">
                سيتم معالجة طلبك خلال 24 ساعة. جميع المعاملات مشفرة ومحمية بأعلى معايير الأمان.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericCompanyLayout;
