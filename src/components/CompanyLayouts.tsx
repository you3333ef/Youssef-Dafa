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
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 flex items-center px-6 shadow-sm"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-2 rounded-md">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>Aramex</span>
            </div>
            <div className="text-white">
              <p className="text-sm font-semibold">الشحن السريع</p>
              <p className="text-xs opacity-90">Express Shipping</p>
            </div>
          </div>
          {trackingNumber && (
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
              <span className="text-xs opacity-90">رقم التتبع: </span>
              <span className="font-mono font-bold">{trackingNumber}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Truck, title: 'شحن سريع', desc: '2-3 أيام عمل' },
            { icon: Shield, title: 'تأمين شامل', desc: 'حماية كاملة' },
            { icon: CheckCircle2, title: 'تتبع مباشر', desc: 'GPS Tracking' }
          ].map((item, idx) => (
            <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${branding?.colors.primary}15` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: branding?.colors.primary }} />
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: branding?.colors.text }}>{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 shadow-md border-0 bg-white">
          <div 
            className="flex items-center gap-4 mb-6 pb-6 border-b-2"
            style={{ borderBottomColor: `${branding?.colors.primary}30` }}
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>إكمال عملية الدفع</h2>
              <p className="text-sm text-gray-500">معلومات الدفع الآمنة</p>
            </div>
          </div>

          {children}

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${branding?.colors.primary}10` }}>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: branding?.colors.primary }} />
              <div className="text-sm" style={{ color: branding?.colors.text }}>
                <p className="font-semibold mb-1">حماية متقدمة</p>
                <p className="text-gray-600">جميع المعاملات مشفرة بتقنية SSL ومحمية بالكامل</p>
              </div>
            </div>
          </div>
        </Card>
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFF9E6, #FFFFFF)' }} dir="rtl">
      <div 
        className="h-20 flex items-center shadow-md relative overflow-hidden"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              ${branding?.colors.secondary},
              ${branding?.colors.secondary} 20px,
              transparent 20px,
              transparent 40px
            )`
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white px-6 py-2 rounded-sm shadow-lg transform -skew-x-12">
                <span 
                  className="text-4xl font-black inline-block transform skew-x-12"
                  style={{ color: branding?.colors.secondary }}
                >
                  DHL
                </span>
              </div>
              <div style={{ color: branding?.colors.secondary }}>
                <p className="text-sm font-bold">EXPRESS</p>
                <p className="text-xs font-semibold">الشحن السريع العالمي</p>
              </div>
            </div>
            {trackingNumber && (
              <div 
                className="px-5 py-3 rounded-sm shadow-md"
                style={{ backgroundColor: branding?.colors.secondary }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: branding?.colors.primary }}>Tracking</p>
                <p className="font-mono font-black text-base" style={{ color: branding?.colors.primary }}>{trackingNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xl"
              style={{ backgroundColor: branding?.colors.secondary, color: branding?.colors.primary }}
            >
              1
            </div>
            <span className="font-bold" style={{ color: branding?.colors.primary }}>معلومات الدفع</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: branding?.colors.secondary }} />
          <div className="flex items-center gap-2 text-gray-400">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold"
              style={{ borderColor: '#E0E0E0' }}
            >
              2
            </div>
            <span>التأكيد</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2 text-gray-400">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold"
              style={{ borderColor: '#E0E0E0' }}
            >
              3
            </div>
            <span>الإكمال</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Truck, label: 'توصيل سريع', desc: '24-48 ساعة' },
            { icon: Shield, label: 'مضمون 100%', desc: 'حماية كاملة' },
            { icon: MapPin, label: 'تتبع مباشر', desc: 'GPS Tracking' },
            { icon: CheckCircle2, label: 'دفع آمن', desc: 'SSL Encrypted' }
          ].map((item, idx) => (
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
          className="mt-6 p-6 rounded-sm shadow-lg"
          style={{ backgroundColor: branding?.colors.secondary }}
        >
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12" style={{ color: branding?.colors.secondary }} />
            <div style={{ color: branding?.colors.primary }}>
              <h3 className="font-black text-lg mb-1">DHL SECURE PAYMENT</h3>
              <p className="text-sm font-semibold">
                معاملاتك محمية بأعلى معايير الأمان | SSL 256-bit Encryption
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
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-20 shadow-sm"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="font-black text-4xl tracking-tight">
              <span style={{ color: branding?.colors.primary }}>Fed</span>
              <span style={{ color: branding?.colors.secondary }}>Ex</span>
            </span>
            <span className="text-white text-xs font-bold px-3 py-1 rounded" style={{ backgroundColor: branding?.colors.secondary }}>EXPRESS</span>
          </div>
          {amount && (
            <div className="bg-white px-6 py-2 rounded-md shadow-sm">
              <p className="text-xs mb-1" style={{ color: branding?.colors.primary }}>Amount</p>
              <span className="font-black text-xl" style={{ color: branding?.colors.secondary }}>{amount}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 bg-gradient-to-r p-6 rounded-lg" style={{ background: `linear-gradient(to right, ${branding?.colors.primary}05, ${branding?.colors.secondary}05)` }}>
          <h1 className="text-4xl font-black mb-2" style={{ color: branding?.colors.primary }}>Secure Checkout</h1>
          <p className="text-lg font-semibold" style={{ color: branding?.colors.secondary }}>إكمال عملية الدفع الآمنة</p>
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
              className="p-6 border-t-4"
              style={{ 
                backgroundColor: 'white',
                borderTopColor: branding?.colors.secondary
              }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: branding?.colors.primary }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm">
                  <h4 className="font-black text-base mb-2" style={{ color: branding?.colors.primary }}>FedEx Secure Payment</h4>
                  <p className="text-gray-700 leading-relaxed">
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

export const UPSLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('ups');
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-16"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div 
              className="px-6 py-2 rounded-sm flex items-center"
              style={{ backgroundColor: branding?.colors.secondary }}
            >
              <span 
                className="font-black text-3xl tracking-tight"
                style={{ color: branding?.colors.primary }}
              >
                UPS
              </span>
            </div>
          </div>
          {trackingNumber && (
            <div className="text-white text-right">
              <p className="text-xs opacity-90">Tracking Number</p>
              <p className="font-mono font-bold text-lg">{trackingNumber}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Shield, title: 'UPS Shield', desc: 'حماية شاملة لشحنتك' },
            { icon: Truck, title: 'تتبع دقيق', desc: 'GPS في الوقت الفعلي' },
            { icon: CheckCircle2, title: 'موثوقية', desc: 'توصيل بدون تأخير' }
          ].map((item, idx) => (
            <Card key={idx} className="p-6 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="w-14 h-14 mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: branding?.colors.secondary }}
              >
                <item.icon className="w-7 h-7" style={{ color: branding?.colors.primary }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: branding?.colors.primary }}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 shadow-md border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.secondary }}
            >
              <CreditCard className="w-6 h-6" style={{ color: branding?.colors.primary }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.primary }}>Secure Payment</h2>
              <p className="text-sm text-gray-600">بوابة دفع آمنة ومحمية</p>
            </div>
          </div>

          {children}

          <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: branding?.colors.secondary }} />
            <p className="text-sm text-gray-700">
              جميع المدفوعات محمية بتشفير SSL من المستوى البنكي
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const NaqelLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('naqel');
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div 
        className="h-20 shadow-sm"
        style={{ 
          background: `linear-gradient(90deg, ${branding?.colors.primary} 0%, ${branding?.colors.secondary} 100%)` 
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-white font-black text-2xl tracking-wide">NAQEL</span>
            </div>
            <div className="text-white">
              <p className="font-bold text-base">EXPRESS</p>
              <p className="text-xs opacity-90">Logistics | Warehousing | Freight Forwarding</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white text-center">
              <p className="text-xs opacity-80 mb-1">المبلغ</p>
              <p className="text-xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CheckCircle2, label: 'توصيل في الوقت المحدد', desc: '95% نسبة الالتزام' },
            { icon: MapPin, label: 'تتبع مباشر', desc: 'Real-time GPS' },
            { icon: Shield, label: 'معتمد من الجمارك', desc: 'AEO Certified' },
            { icon: Truck, label: '20M+ شحنة سنوياً', desc: 'موثوق به' }
          ].map((item, idx) => (
            <Card key={idx} className="p-4 text-center border-0 shadow-sm hover:shadow-md transition-all">
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: branding?.colors.primary }} />
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: branding?.colors.text }}>{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-8 shadow-md border-0">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderBottomColor: `${branding?.colors.primary}30` }}>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: branding?.gradients.primary }}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>إتمام الدفع</h2>
                  <p className="text-sm text-gray-500">أدخل معلومات الدفع بشكل آمن</p>
                </div>
              </div>

              {children}
            </Card>
          </div>

          <div className="space-y-6">
            {trackingNumber && (
              <Card className="p-6 shadow-md border-0 text-center">
                <Package className="w-12 h-12 mx-auto mb-3" style={{ color: branding?.colors.primary }} />
                <p className="text-xs text-gray-500 mb-2">رقم التتبع</p>
                <p className="font-mono font-bold text-base">{trackingNumber}</p>
              </Card>
            )}

            <Card 
              className="p-6 text-white border-0"
              style={{ background: branding?.gradients.hero }}
            >
              <h3 className="font-bold text-lg mb-4">لماذا NAQEL Express؟</h3>
              <ul className="space-y-3 text-sm">
                {[
                  'شبكة توصيل واسعة في 16 دولة',
                  'تخليص جمركي سلس وسريع',
                  'حلول تقنية متقدمة',
                  'دعم عملاء متاح 24/7'
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

export const ZajilLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('zajil');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-18 shadow-md"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-white px-5 py-2 rounded-lg">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>
                Zajil
              </span>
            </div>
            <div className="text-white">
              <p className="font-bold">EXPRESS</p>
              <p className="text-xs">First Private Postal Company in Saudi Arabia</p>
            </div>
          </div>
          {amount && (
            <div className="text-white text-left">
              <p className="text-xs opacity-80">Amount Due</p>
              <p className="text-2xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {[
            { icon: Truck, text: 'Same Day Delivery' },
            { icon: Shield, text: 'Secure & Trusted' },
            { icon: Package, text: 'E-commerce Solutions' },
            { icon: CheckCircle2, text: 'COD Available' }
          ].map((item, idx) => (
            <Badge 
              key={idx}
              className="px-5 py-2 text-sm font-medium"
              style={{ 
                backgroundColor: 'white',
                color: branding?.colors.primary,
                border: `2px solid ${branding?.colors.primary}30`,
                borderRadius: branding?.borderRadius.md
              }}
            >
              <item.icon className="w-4 h-4 ml-2" />
              {item.text}
            </Badge>
          ))}
        </div>

        <Card className="p-8 shadow-lg border-0" style={{ borderRadius: branding?.borderRadius.lg }}>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>Secure Payment</h2>
              <p className="text-sm text-gray-600 mt-1">Complete your transaction safely</p>
            </div>
          </div>

          {children}

          {trackingNumber && (
            <div 
              className="mt-6 p-6 rounded-xl text-center"
              style={{ backgroundColor: `${branding?.colors.primary}10`, borderRadius: branding?.borderRadius.lg }}
            >
              <Package className="w-10 h-10 mx-auto mb-3" style={{ color: branding?.colors.primary }} />
              <p className="text-sm text-gray-600 mb-2">Tracking Number / رقم التتبع</p>
              <p className="font-mono font-bold text-xl" style={{ color: branding?.colors.primary }}>
                {trackingNumber}
              </p>
            </div>
          )}

          <div 
            className="mt-6 p-5 rounded-xl text-white"
            style={{ background: branding?.gradients.hero, borderRadius: branding?.borderRadius.lg }}
          >
            <div className="flex items-start gap-4">
              <Shield className="w-10 h-10 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Yes, Delivered!</h3>
                <p className="text-sm opacity-95">
                  نحن أول شركة بريد خاصة في المملكة العربية السعودية، نقدم خدمات شحن موثوقة ومبتكرة
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const EmiratesPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('empost');
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-20 shadow-lg"
        style={{ 
          background: `linear-gradient(90deg, ${branding?.colors.primary} 0%, ${branding?.colors.secondary} 50%, ${branding?.colors.accent} 100%)` 
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
              <span className="text-white font-black text-xl">Emirates Post</span>
            </div>
            <div className="text-white">
              <p className="font-bold text-sm">مجموعة بريد الإمارات</p>
              <p className="text-xs opacity-90">Emirates Post Group</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg text-white">
              <p className="text-xs opacity-80">Amount / المبلغ</p>
              <p className="text-2xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Shield, title: 'خدمة وطنية موثوقة', color: branding?.colors.primary },
            { icon: Truck, title: 'تغطية شاملة للإمارات', color: branding?.colors.secondary },
            { icon: CheckCircle2, title: 'معايير عالمية', color: branding?.colors.accent }
          ].map((item, idx) => (
            <Card 
              key={idx} 
              className="p-6 text-center border-2 hover:shadow-xl transition-all duration-300"
              style={{ borderColor: `${item.color}30` }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: item.color }}>{item.title}</h3>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-8 shadow-xl border-0">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b-4" style={{ borderBottomColor: branding?.colors.primary }}>
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ background: branding?.gradients.hero }}
                >
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>بوابة الدفع الآمنة</h2>
                  <p className="text-sm text-gray-600">Secure Payment Gateway</p>
                </div>
              </div>

              {children}
            </Card>
          </div>

          <div className="space-y-6">
            {trackingNumber && (
              <Card 
                className="p-6 shadow-lg border-t-4 text-center"
                style={{ borderTopColor: branding?.colors.primary }}
              >
                <Package className="w-12 h-12 mx-auto mb-4" style={{ color: branding?.colors.primary }} />
                <p className="text-xs text-gray-500 mb-2">رقم التتبع / Tracking Number</p>
                <p className="font-mono font-bold text-lg">{trackingNumber}</p>
              </Card>
            )}

            <Card 
              className="p-6 text-white shadow-lg"
              style={{ background: branding?.gradients.hero }}
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Emirates Post Features
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  'المشغل الوطني للبريد في الإمارات',
                  'خدمات بريدية ولوجستية متكاملة',
                  'شبكة واسعة من المكاتب والوكلاء',
                  'حلول إلكترونية متطورة'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                backgroundColor: `${branding?.colors.accent}10`,
                borderColor: branding?.colors.accent
              }}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5" style={{ color: branding?.colors.accent }} />
                <p className="text-sm font-medium" style={{ color: branding?.colors.text }}>
                  جميع المعاملات محمية ومشفرة
                </p>
              </div>
            </div>
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
    case 'ups':
      return UPSLayout;
    case 'naqel':
      return NaqelLayout;
    case 'zajil':
      return ZajilLayout;
    case 'empost':
      return EmiratesPostLayout;
    default:
      return AramexLayout;
  }
};

export default {
  AramexLayout,
  DHLLayout,
  FedExLayout,
  SMSALayout,
  UPSLayout,
  NaqelLayout,
  ZajilLayout,
  EmiratesPostLayout,
  getCompanyLayout
};
