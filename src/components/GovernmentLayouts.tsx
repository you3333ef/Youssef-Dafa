import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { governmentPaymentSystems } from '@/lib/governmentPaymentSystems';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  CreditCard,
  Building2,
  Globe,
  Phone,
  Smartphone
} from 'lucide-react';

interface GovernmentLayoutProps {
  countryCode: string;
  children: React.ReactNode;
  amount?: string;
  serviceName?: string;
}

export const SADADLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.SA;
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: govSystem.colors.background }} dir="rtl">
      <div 
        className="h-24"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl">
              {govSystem.logo && (
                <img src={govSystem.logo} alt="سداد" className="h-12" />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-2xl">سداد</h1>
              <p className="text-sm opacity-90">نظام المدفوعات الوطني</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/20 text-white px-3 py-1">
              <Shield className="w-4 h-4 ml-1" />
              معتمد من SAMA
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { icon: Shield, text: 'آمن ومعتمد', desc: 'البنك المركزي' },
            { icon: Lock, text: 'مشفر بالكامل', desc: 'SSL 256-bit' },
            { icon: Globe, text: 'متاح 24/7', desc: 'على مدار الساعة' },
            { icon: CheckCircle2, text: 'فوري', desc: 'تنفيذ لحظي' }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-4 text-center border-2 hover:shadow-lg transition-all"
              style={{ borderColor: `${govSystem.colors.primary}30` }}
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${govSystem.colors.primary}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: govSystem.colors.primary }} />
              </div>
              <p className="font-bold text-sm">{item.text}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-2xl">
            <div 
              className="flex items-center gap-4 mb-6 pb-4 border-b-2"
              style={{ borderBottomColor: govSystem.colors.primary }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${govSystem.colors.primary}20` }}
              >
                <CreditCard className="w-7 h-7" style={{ color: govSystem.colors.primary }} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">بوابة الدفع الحكومية</h2>
                <p className="text-sm text-gray-600">{serviceName || 'خدمة حكومية'}</p>
              </div>
              {amount && (
                <div 
                  className="px-6 py-3 rounded-xl text-white font-bold text-xl"
                  style={{ backgroundColor: govSystem.colors.primary }}
                >
                  {amount}
                </div>
              )}
            </div>

            {children}
          </Card>

          <div 
            className="mt-6 p-6 rounded-xl text-white"
            style={{ background: govSystem.gradients.primary }}
          >
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">نظام سداد - SADAD</h3>
              <p className="text-sm opacity-90">
                نظام المدفوعات الوطني السعودي المعتمد من البنك المركزي السعودي (SAMA)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KNETLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.KW;
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: govSystem.colors.surface }} dir="rtl">
      <div 
        className="h-20"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg">
              {govSystem.logo && (
                <img src={govSystem.logo} alt="KNET" className="h-10" />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-xl">KNET - كي نت</h1>
              <p className="text-xs opacity-90">شبكة الكويت الوطنية للمدفوعات</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white">
            أول نظام دفع إلكتروني في الخليج
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            {[
              { icon: Shield, text: 'آمن' },
              { icon: Lock, text: 'مشفر' },
              { icon: CheckCircle2, text: 'معتمد' },
              { icon: Globe, text: '24/7' }
            ].map((item, idx) => (
              <Badge 
                key={idx}
                className="px-4 py-2 text-sm"
                style={{
                  backgroundColor: `${govSystem.colors.primary}15`,
                  color: govSystem.colors.primary,
                  border: `1px solid ${govSystem.colors.primary}30`
                }}
              >
                <item.icon className="w-4 h-4 ml-2" />
                {item.text}
              </Badge>
            ))}
          </div>

          <Card className="p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{ background: govSystem.gradients.primary }}
              >
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">الدفع عبر كي نت</h2>
                <p className="text-sm text-gray-600">نظام الدفع الإلكتروني الكويتي</p>
              </div>
              {amount && (
                <div 
                  className="text-left px-5 py-2 rounded-lg"
                  style={{ backgroundColor: `${govSystem.colors.primary}15` }}
                >
                  <p className="text-xs" style={{ color: govSystem.colors.primary }}>المبلغ</p>
                  <p className="text-xl font-bold" style={{ color: govSystem.colors.primary }}>{amount}</p>
                </div>
              )}
            </div>

            {children}
          </Card>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                <div>
                  <p className="font-bold text-sm text-green-900">KNET Approved</p>
                  <p className="text-xs text-green-700">معتمد من البنك المركزي</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-700" />
                <div>
                  <p className="font-bold text-sm text-blue-900">WAMD Ready</p>
                  <p className="text-xs text-blue-700">الدفع الفوري الجديد</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BENEFITLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.BH;
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: govSystem.colors.surface }} dir="rtl">
      <div 
        className="h-20"
        style={{ background: govSystem.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl">
              {govSystem.logo && (
                <img src={govSystem.logo} alt="BENEFIT" className="h-10" />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-xl">BENEFIT - بنفت</h1>
              <p className="text-xs opacity-90">الشبكة الإلكترونية للمعاملات المالية</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: govSystem.colors.primary }}
              >
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">BenefitPay</h2>
                <p className="text-sm text-gray-600">المحفظة الإلكترونية الوطنية</p>
              </div>
              {amount && (
                <div 
                  className="px-6 py-3 rounded-lg text-white font-bold text-xl"
                  style={{ backgroundColor: govSystem.colors.primary }}
                >
                  {amount}
                </div>
              )}
            </div>

            {children}
          </Card>

          <Card className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-red-700" />
              <div>
                <h3 className="font-bold text-lg text-red-900 mb-1">BENEFIT Secure Payment</h3>
                <p className="text-sm text-red-800">
                  نظام دفع وطني معتمد من مصرف البحرين المركزي منذ 1997
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface GovernmentBadgeProps {
  countryCode: string;
}

export const GovernmentSecurityBadge: React.FC<GovernmentBadgeProps> = ({ countryCode }) => {
  const govSystem = governmentPaymentSystems[countryCode as keyof typeof governmentPaymentSystems];
  
  if (!govSystem) return null;
  
  return (
    <Card 
      className="p-6 text-white mb-6"
      style={{ background: govSystem.gradients.primary }}
    >
      <div className="flex items-center gap-4">
        <Shield className="w-12 h-12" />
        <div>
          <h3 className="font-bold text-lg mb-1">{govSystem.nameAr}</h3>
          <p className="text-sm opacity-90">{govSystem.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
        {[
          { icon: Lock, text: 'تشفير SSL' },
          { icon: CheckCircle2, text: 'معتمد حكومياً' },
          { icon: Building2, text: 'نظام وطني' }
        ].map((item, idx) => (
          <div key={idx} className="text-center">
            <item.icon className="w-5 h-5 mx-auto mb-1 opacity-90" />
            <p className="text-xs font-semibold">{item.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const getGovernmentLayout = (countryCode: string) => {
  switch (countryCode.toUpperCase()) {
    case 'SA':
      return SADADLayout;
    case 'KW':
      return KNETLayout;
    case 'BH':
      return BENEFITLayout;
    default:
      return SADADLayout;
  }
};

export default {
  SADADLayout,
  KNETLayout,
  BENEFITLayout,
  GovernmentSecurityBadge,
  getGovernmentLayout
};
