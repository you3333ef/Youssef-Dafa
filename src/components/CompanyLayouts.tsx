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
    <div 
      className="min-h-screen" 
      dir="rtl"
      style={{ 
        background: branding?.colors.background || '#FFFFFF',
        fontFamily: branding?.fonts.arabic || 'Cairo, sans-serif'
      }}
    >
      <div 
        className="h-20 flex items-center px-6 shadow-xl"
        style={{ 
          backgroundColor: branding?.colors.primary,
          borderBottom: `3px solid ${branding?.colors.secondary || '#000000'}`
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="bg-white p-3 rounded-xl shadow-lg"
              style={{ borderRadius: branding?.borderRadius?.md || '10px' }}
            >
              <Package className="w-7 h-7" style={{ color: branding?.colors.primary }} />
            </div>
            <div>
              <span className="text-white font-black text-2xl" style={{ fontFamily: branding?.fonts.primary }}>Aramex</span>
              <p className="text-white/80 text-sm">خدمة الشحن السريع</p>
            </div>
          </div>
          {trackingNumber && (
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white px-4 py-2 backdrop-blur-sm"
              style={{ borderRadius: branding?.borderRadius?.sm || '8px' }}
            >
              <span className="text-sm font-medium">رقم التتبع:</span>
              <span className="font-mono font-bold mr-2">{trackingNumber}</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card 
            className="p-6 border-r-4 hover:shadow-xl transition-all"
            style={{ 
              borderRightColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius?.md || '10px',
              background: branding?.colors.surface || '#F8F8F8'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ 
                  background: branding?.gradients.primary || branding?.colors.primary,
                  boxShadow: branding?.shadows.md
                }}
              >
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: branding?.colors.textLight }}>حالة الشحنة</p>
                <p className="font-bold text-lg" style={{ color: branding?.colors.text }}>قيد المعالجة</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-r-4 hover:shadow-xl transition-all"
            style={{ 
              borderRightColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius?.md || '10px',
              background: branding?.colors.surface || '#F8F8F8'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ 
                  background: branding?.gradients.primary || branding?.colors.primary,
                  boxShadow: branding?.shadows.md
                }}
              >
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: branding?.colors.textLight }}>وقت التسليم</p>
                <p className="font-bold text-lg" style={{ color: branding?.colors.text }}>2-3 أيام عمل</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-r-4 hover:shadow-xl transition-all"
            style={{ 
              borderRightColor: branding?.colors.primary,
              borderRadius: branding?.borderRadius?.md || '10px',
              background: branding?.colors.surface || '#F8F8F8'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ 
                  background: branding?.gradients.primary || branding?.colors.primary,
                  boxShadow: branding?.shadows.md
                }}
              >
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: branding?.colors.textLight }}>الدفع الآمن</p>
                <p className="font-bold text-lg" style={{ color: branding?.colors.primary }}>{amount || 'محمي'}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card 
          className="p-10 shadow-2xl"
          style={{
            borderRadius: branding?.borderRadius?.lg || '16px',
            boxShadow: branding?.shadows.lg || '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <div 
            className="flex items-center gap-4 mb-8 pb-6 border-b-2"
            style={{ borderBottomColor: branding?.colors.primary }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 
                className="text-3xl font-bold"
                style={{ 
                  color: branding?.colors.text,
                  fontFamily: branding?.fonts.arabic
                }}
              >
                إكمال عملية الدفع
              </h2>
              <p className="text-sm" style={{ color: branding?.colors.textLight }}>
                أدخل بيانات الدفع للمتابعة
              </p>
            </div>
          </div>

          {children}
        </Card>

        <div 
          className="mt-8 p-6 rounded-xl"
          style={{
            background: branding?.colors.surface || '#F8F8F8',
            border: `2px solid ${branding?.colors.border || '#E5E5E5'}`,
            borderRadius: branding?.borderRadius?.md || '10px'
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: branding?.colors.primary }}
            >
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm">
              <p 
                className="font-bold mb-2 text-base"
                style={{ 
                  color: branding?.colors.text,
                  fontFamily: branding?.fonts.arabic
                }}
              >
                معلومات مهمة
              </p>
              <p style={{ color: branding?.colors.textLight }}>
                سيتم معالجة طلبك خلال 24 ساعة. جميع المعاملات مشفرة بأعلى معايير الأمان.
              </p>
            </div>
          </div>
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
    <div 
      className="min-h-screen" 
      dir="rtl"
      style={{ 
        background: 'linear-gradient(to bottom, #FFF9E6 0%, #FFFFFF 100%)',
        fontFamily: branding?.fonts.arabic || 'Cairo, sans-serif'
      }}
    >
      <div 
        className="h-24 flex items-center shadow-2xl"
        style={{ 
          background: `linear-gradient(90deg, ${branding?.colors.primary} 0%, ${branding?.colors.secondary} 100%)`,
          borderBottom: `4px solid ${branding?.colors.secondary}`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div 
                className="bg-black p-4 rounded-xl shadow-2xl"
                style={{ borderRadius: branding?.borderRadius?.md || '10px' }}
              >
                <span 
                  className="text-5xl font-black"
                  style={{ 
                    color: branding?.colors.primary,
                    fontFamily: 'Arial Black, sans-serif'
                  }}
                >
                  DHL
                </span>
              </div>
              <div className="text-black">
                <p className="text-lg font-bold">EXPRESS SHIPPING</p>
                <p className="text-sm opacity-75">التوصيل السريع العالمي</p>
              </div>
            </div>
            {trackingNumber && (
              <div 
                className="bg-black/90 px-6 py-3 rounded-xl backdrop-blur-sm"
                style={{ borderRadius: branding?.borderRadius?.md || '10px' }}
              >
                <p className="text-xs text-yellow-400 mb-1 font-semibold">Tracking Number</p>
                <p className="text-white font-mono font-bold text-lg">{trackingNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
              style={{ 
                background: branding?.gradients.secondary || branding?.colors.secondary,
                fontFamily: 'Arial Black, sans-serif'
              }}
            >
              1
            </div>
            <span className="font-bold text-lg" style={{ color: branding?.colors.text }}>معلومات الدفع</span>
          </div>
          <ChevronRight className="w-6 h-6" style={{ color: branding?.colors.textLight }} />
          <div className="flex items-center gap-3" style={{ opacity: 0.5 }}>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold"
              style={{ borderColor: branding?.colors.border, color: branding?.colors.textLight }}
            >
              2
            </div>
            <span className="font-bold text-lg" style={{ color: branding?.colors.textLight }}>التأكيد</span>
          </div>
          <ChevronRight className="w-6 h-6" style={{ color: branding?.colors.textLight }} />
          <div className="flex items-center gap-3" style={{ opacity: 0.5 }}>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold"
              style={{ borderColor: branding?.colors.border, color: branding?.colors.textLight }}
            >
              3
            </div>
            <span className="font-bold text-lg" style={{ color: branding?.colors.textLight }}>الإكمال</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-10">
          {[
            { icon: Truck, label: 'توصيل سريع', desc: '24-48 ساعة' },
            { icon: Shield, label: 'مضمون 100%', desc: 'حماية كاملة' },
            { icon: MapPin, label: 'تتبع مباشر', desc: 'GPS Tracking' },
            { icon: CheckCircle2, label: 'دفع آمن', desc: 'SSL Encrypted' }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-5 text-center border-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              style={{ 
                borderColor: branding?.colors.primary,
                background: `${branding?.colors.primary}05`,
                borderRadius: branding?.borderRadius?.md || '10px'
              }}
            >
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                style={{ 
                  background: branding?.gradients.secondary || branding?.colors.secondary,
                  boxShadow: branding?.shadows.md
                }}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-base mb-1" style={{ color: branding?.colors.text }}>{item.label}</p>
              <p className="text-sm" style={{ color: branding?.colors.textLight }}>{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card 
          className="p-10 shadow-2xl border-t-8"
          style={{ 
            borderTopColor: branding?.colors.secondary,
            borderRadius: branding?.borderRadius?.lg || '16px',
            boxShadow: branding?.shadows.lg || '0 25px 50px rgba(0,0,0,0.15)'
          }}
        >
          <div 
            className="flex items-center gap-4 mb-8 pb-6 border-b-2"
            style={{ borderBottomColor: branding?.colors.primary }}
          >
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ 
                background: branding?.gradients.primary,
                borderRadius: branding?.borderRadius?.md || '10px'
              }}
            >
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 
                className="text-3xl font-black"
                style={{ 
                  color: branding?.colors.text,
                  fontFamily: branding?.fonts.arabic
                }}
              >
                DHL SECURE PAYMENT
              </h2>
              <p className="text-base" style={{ color: branding?.colors.textLight }}>
                بوابة الدفع الآمنة
              </p>
            </div>
          </div>

          {children}
        </Card>

        <div 
          className="mt-8 p-8 rounded-2xl text-white"
          style={{ 
            background: branding?.gradients.primary,
            borderRadius: branding?.borderRadius?.lg || '16px',
            boxShadow: branding?.shadows.lg
          }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center"
            >
              <Shield className="w-9 h-9" />
            </div>
            <div>
              <h3 className="font-black text-xl mb-2" style={{ fontFamily: 'Arial Black, sans-serif' }}>DHL SECURE PAYMENT</h3>
              <p className="text-base opacity-95">
                معاملاتك محمية بأعلى معايير الأمان العالمية - تشفير SSL 256-bit
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
