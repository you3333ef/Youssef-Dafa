import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBrandingByCompany } from '@/lib/brandingSystem';
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
  status = 'pending' 
}) => {
  const branding = getBrandingByCompany('aramex');
  
  return (
    <div className="min-h-screen" style={{ 
      background: branding?.colors.surface || '#FAFAFA',
      fontFamily: branding?.fonts.arabic 
    }} dir="rtl">
      <div 
        className="h-12 sm:h-14 md:h-16 flex items-center px-3 sm:px-4 md:px-6 shadow-md"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white p-1.5 sm:p-2 rounded">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: branding?.colors.primary }} />
            </div>
            <span className="text-white font-bold text-sm sm:text-base md:text-lg">Aramex</span>
          </div>
          {trackingNumber && (
            <Badge variant="secondary" className="bg-white/20 text-white text-[10px] sm:text-xs px-2 py-1">
              <span>رقم التتبع:</span>
              <span className="font-mono mr-1">{trackingNumber}</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-3 md:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 sm:p-5 md:p-6 shadow-xl" style={{
            borderTop: `3px solid ${branding?.colors.primary}`,
            background: branding?.colors.surface
          }}>
            <div 
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 pb-3 border-b"
              style={{ borderBottomColor: `${branding?.colors.primary}30` }}
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: branding?.colors.primary }} />
              <h2 className="text-base sm:text-lg md:text-xl font-bold" style={{
                color: branding?.colors.text
              }}>إكمال عملية الدفع</h2>
            </div>

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
  status = 'pending' 
}) => {
  const branding = getBrandingByCompany('dhl');
  
  return (
    <div className="min-h-screen" style={{ 
      background: branding?.colors.surface || '#FFFBF0',
      fontFamily: branding?.fonts.arabic 
    }} dir="rtl">
      <div 
        className="h-14 sm:h-16 md:h-20 flex items-center shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${branding?.colors.primary} 0%, ${branding?.colors.secondary} 100%)` 
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="bg-black p-2 sm:p-2.5 md:p-3 rounded-lg">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black" style={{ color: branding?.colors.primary }}>DHL</span>
              </div>
              <div className="text-white">
                <p className="text-xs sm:text-sm opacity-90">EXPRESS SHIPPING</p>
                <p className="text-[10px] sm:text-xs opacity-75">Worldwide Delivery</p>
              </div>
            </div>
            {trackingNumber && (
              <div className="bg-black/30 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm">
                <p className="text-[10px] sm:text-xs text-white/80">Tracking Number</p>
                <p className="text-white font-mono font-bold text-xs sm:text-sm">{trackingNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-3 md:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 sm:p-5 md:p-6 shadow-xl" style={{
            borderTop: `3px solid ${branding?.colors.primary}`,
            background: branding?.colors.surface
          }}>
            <div 
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 pb-3 border-b"
              style={{ borderBottomColor: `${branding?.colors.primary}30` }}
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: branding?.colors.primary }} />
              <h2 className="text-base sm:text-lg md:text-xl font-bold" style={{
                color: branding?.colors.text
              }}>إكمال عملية الدفع</h2>
            </div>

            {children}
          </Card>
        </div>
      </div>
    </div>
  );
            <Card 
              key={idx}
              className="p-4 text-center border-2 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: `${branding?.colors.primary}30` }}
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${branding?.colors.primary}20` }}
              >
                <item.icon className="w-6 h-6" style={{ color: branding?.colors.secondary }} />
              </div>
              <p className="font-bold text-sm">{item.label}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card 
          className="p-8 shadow-2xl border-t-4"
          style={{ borderTopColor: branding?.colors.secondary }}
        >
          {children}
        </Card>

        <div 
          className="mt-6 p-6 rounded-xl text-white"
          style={{ background: branding?.gradients.primary }}
        >
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12" />
            <div>
              <h3 className="font-bold text-lg mb-1">DHL Secure Payment</h3>
              <p className="text-sm opacity-90">
                معاملاتك محمية بأعلى معايير الأمان العالمية. نحن نستخدم تشفير SSL 256-bit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FedExLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('fedex');
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div 
        className="h-16"
        style={{ 
          background: `linear-gradient(to right, ${branding?.colors.primary}, ${branding?.colors.secondary})` 
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-white font-black text-3xl tracking-wider">FedEx</span>
            <span className="text-white text-xs opacity-80">EXPRESS</span>
          </div>
          {amount && (
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-bold">{amount}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
          <p className="text-gray-600">إكمال عملية الدفع الآمنة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-6 shadow-lg">
              <div 
                className="flex items-center gap-3 mb-6 pb-4 border-b-2"
                style={{ borderBottomColor: branding?.colors.primary }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${branding?.colors.primary}15` }}
                >
                  <CreditCard className="w-5 h-5" style={{ color: branding?.colors.primary }} />
                </div>
                <h2 className="text-xl font-bold">Payment Information</h2>
              </div>

              {children}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" style={{ color: branding?.colors.primary }} />
                ملخص الطلب
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">رسوم الشحن:</span>
                  <span className="font-semibold">{amount || '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الضريبة:</span>
                  <span className="font-semibold">متضمنة</span>
                </div>
                <div 
                  className="pt-3 border-t-2 flex justify-between"
                  style={{ borderTopColor: `${branding?.colors.primary}30` }}
                >
                  <span className="font-bold">المجموع:</span>
                  <span className="font-bold text-lg" style={{ color: branding?.colors.primary }}>
                    {amount || '--'}
                  </span>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6"
              style={{ backgroundColor: `${branding?.colors.primary}10` }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: branding?.colors.primary }} />
                <div className="text-sm">
                  <h4 className="font-bold mb-2">FedEx Secure Payment</h4>
                  <p className="text-gray-700">
                    نستخدم أحدث تقنيات التشفير لحماية معلوماتك الشخصية والمالية
                  </p>
                </div>
              </div>
            </Card>

            {trackingNumber && (
              <Card className="p-6 text-center">
                <p className="text-xs text-gray-600 mb-2">Tracking Number</p>
                <p className="font-mono font-bold text-lg">{trackingNumber}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SMSALayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('smsa');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50" dir="rtl">
      <div 
        className="h-20 shadow-lg"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>
                SMSA
              </span>
            </div>
            <div className="text-white">
              <p className="font-bold text-lg">EXPRESS</p>
              <p className="text-xs opacity-90">الشحن السريع - المملكة العربية السعودية</p>
            </div>
          </div>
          {amount && (
            <div className="text-white text-left">
              <p className="text-xs opacity-80">المبلغ المطلوب</p>
              <p className="text-2xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { icon: CheckCircle2, text: 'توصيل سريع' },
            { icon: Shield, text: 'دفع آمن' },
            { icon: Truck, text: 'تتبع مباشر' },
            { icon: Clock, text: 'خدمة 24/7' }
          ].map((item, idx) => (
            <Badge 
              key={idx}
              className="px-4 py-2 text-sm"
              style={{ 
                backgroundColor: `${branding?.colors.primary}15`,
                color: branding?.colors.primary,
                border: `1px solid ${branding?.colors.primary}30`
              }}
            >
              <item.icon className="w-4 h-4 ml-2" />
              {item.text}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: branding?.gradients.primary }}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">بوابة الدفع الآمنة</h2>
                  <p className="text-sm text-gray-600">أدخل بيانات الدفع للمتابعة</p>
                </div>
              </div>

              {children}
            </Card>
          </div>

          <div className="space-y-4">
            {trackingNumber && (
              <Card className="p-6">
                <div className="text-center">
                  <Package className="w-12 h-12 mx-auto mb-3" style={{ color: branding?.colors.primary }} />
                  <p className="text-sm text-gray-600 mb-2">رقم الشحنة</p>
                  <p className="font-mono font-bold text-lg">{trackingNumber}</p>
                </div>
              </Card>
            )}

            <Card 
              className="p-6 text-white"
              style={{ background: branding?.gradients.hero }}
            >
              <h3 className="font-bold text-lg mb-3">ميزات SMSA Express</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'توصيل في نفس اليوم داخل المدن الرئيسية',
                  'تتبع مباشر عبر GPS',
                  'تأمين كامل على الشحنات',
                  'خدمة عملاء 24/7'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default {
  AramexLayout,
  DHLLayout,
  FedExLayout,
  SMSALayout,
  getCompanyLayout
};
