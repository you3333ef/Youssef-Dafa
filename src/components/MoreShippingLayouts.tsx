import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Shield,
  CreditCard,
  AlertCircle,
  Anchor,
  Globe
} from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
  status?: 'pending' | 'processing' | 'completed';
}

export const SaudiPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('saudipost');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-24 shadow-lg"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-8 py-4 rounded-xl shadow-lg">
              <span className="font-black text-3xl" style={{ color: branding?.colors.primary }}>
                SPL
              </span>
            </div>
            <div className="text-white">
              <p className="font-black text-xl">البريد السعودي</p>
              <p className="text-sm opacity-90">Saudi Post & Logistics</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-white">
              <p className="text-xs opacity-80">المبلغ</p>
              <p className="text-2xl font-black">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Package, title: 'خدمة وطنية', desc: 'المشغل الرسمي للبريد' },
            { icon: Shield, title: 'موثوق به', desc: 'معتمد حكومياً' },
            { icon: Truck, title: 'تغطية شاملة', desc: 'جميع مناطق المملكة' }
          ].map((item, idx) => (
            <Card key={idx} className="p-6 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="w-14 h-14 mx-auto mb-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <item.icon className="w-7 h-7" style={{ color: branding?.colors.primary }} />
              </div>
              <h3 className="font-bold text-base mb-1" style={{ color: branding?.colors.text }}>{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 shadow-md border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع الآمنة</h2>
              <p className="text-sm text-gray-500">Secure Payment Gateway</p>
            </div>
          </div>

          {children}

          {trackingNumber && (
            <div className="mt-6 p-5 bg-white border-2 rounded-lg text-center" style={{ borderColor: branding?.colors.primary }}>
              <Package className="w-10 h-10 mx-auto mb-2" style={{ color: branding?.colors.primary }} />
              <p className="text-xs text-gray-500 mb-1">رقم التتبع</p>
              <p className="font-mono font-bold text-lg">{trackingNumber}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export const QatarPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('qpost');
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-20 shadow-lg"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
              <span className="text-white font-black text-xl">Q-Post</span>
            </div>
            <div className="text-white">
              <p className="font-bold">البريد القطري</p>
              <p className="text-xs opacity-90">Qatar Post</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white px-6 py-2 rounded-lg shadow-md">
              <p className="text-xs mb-1" style={{ color: branding?.colors.primary }}>Amount</p>
              <p className="font-bold text-xl" style={{ color: branding?.colors.primary }}>{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-t-4" style={{ borderTopColor: branding?.colors.primary }}>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>إتمام الدفع</h2>
              <p className="text-sm text-gray-600">Complete Secure Payment</p>
            </div>
          </div>

          {children}

          <div className="mt-6 p-5 rounded-lg" style={{ backgroundColor: `${branding?.colors.secondary}15` }}>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" style={{ color: branding?.colors.secondary }} />
              <p className="text-sm font-medium">جميع المعاملات محمية ومشفرة بأعلى معايير الأمان</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const KuwaitPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('kwpost');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>Kuwait Post</span>
            </div>
            <div className="text-white">
              <p className="font-bold">البريد الكويتي</p>
            </div>
          </div>
          {trackingNumber && (
            <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-lg text-white">
              <p className="text-xs opacity-80">Tracking</p>
              <p className="font-mono font-bold">{trackingNumber}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-md border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع</h2>
              <p className="text-sm text-gray-600">Secure Payment</p>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const OmanPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('omanpost');
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>Oman Post</span>
            </div>
            <div className="text-white">
              <p className="font-bold">بريد عُمان</p>
              <p className="text-xs opacity-90">National Postal Operator</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg text-white text-center">
              <p className="text-xs opacity-80">المبلغ</p>
              <p className="text-xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-4" style={{ borderBottomColor: branding?.colors.primary }}>
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>Secure Payment</h2>
              <p className="text-sm text-gray-600">الدفع الآمن</p>
            </div>
          </div>

          {children}

          {trackingNumber && (
            <div className="mt-6 p-5 text-center rounded-lg border-2" style={{ borderColor: branding?.colors.secondary }}>
              <p className="text-sm text-gray-600 mb-2">Tracking Number / رقم التتبع</p>
              <p className="font-mono font-bold text-lg" style={{ color: branding?.colors.primary }}>{trackingNumber}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export const BahrainPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('bahpost');
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg">
              <span className="text-white font-black text-xl">Bahrain Post</span>
            </div>
            <div className="text-white">
              <p className="font-bold">البريد البحريني</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white px-6 py-2 rounded-lg">
              <p className="text-xs mb-1" style={{ color: branding?.colors.primary }}>Amount</p>
              <p className="font-bold text-xl" style={{ color: branding?.colors.primary }}>{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع الآمنة</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const BahriLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('bahri');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-24 shadow-lg"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-8 py-4 rounded-lg shadow-lg">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>Bahri</span>
            </div>
            <div className="text-white">
              <p className="font-bold text-lg">البحري</p>
              <p className="text-xs opacity-90">National Shipping Company of Saudi Arabia</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg text-white">
              <p className="text-xs opacity-80">Amount Due</p>
              <p className="text-2xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Anchor, label: 'أكبر أسطول نفط خام', desc: 'VLCC Fleet' },
            { icon: Globe, label: 'حضور عالمي', desc: 'Global Presence' },
            { icon: Shield, label: 'معايير عالمية', desc: 'ISO Certified' },
            { icon: CheckCircle2, label: 'موثوق به', desc: 'Since 1978' }
          ].map((item, idx) => (
            <Card key={idx} className="p-4 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${branding?.colors.primary}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: branding?.colors.primary }} />
              </div>
              <p className="font-bold text-sm" style={{ color: branding?.colors.text }}>{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 shadow-xl border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.primary }}>
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>Secure Payment</h2>
              <p className="text-sm text-gray-600">بوابة دفع آمنة ومحمية</p>
            </div>
          </div>

          {children}

          {trackingNumber && (
            <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
              <Anchor className="w-10 h-10 mx-auto mb-3" style={{ color: branding?.colors.primary }} />
              <p className="text-xs text-gray-500 mb-2">Shipment Tracking</p>
              <p className="font-mono font-bold text-xl" style={{ color: branding?.colors.primary }}>{trackingNumber}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export const DSVLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('dsv');
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-8 py-3 rounded-sm">
              <span className="font-black text-3xl tracking-wider" style={{ color: branding?.colors.primary }}>DSV</span>
            </div>
            <div className="text-white">
              <p className="text-sm font-bold">GLOBAL TRANSPORT & LOGISTICS</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-sm text-white">
              <p className="text-xs opacity-80">Amount</p>
              <p className="text-2xl font-black">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Globe, title: 'شبكة عالمية', desc: 'Global Network' },
            { icon: Truck, title: 'حلول متكاملة', desc: 'Air, Sea, Road' },
            { icon: Shield, title: 'جودة عالية', desc: 'ISO Standards' }
          ].map((item, idx) => (
            <Card key={idx} className="p-6 text-center border-0 shadow-sm">
              <div 
                className="w-14 h-14 mx-auto mb-4 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: branding?.colors.primary }}
              >
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-base mb-1" style={{ color: branding?.colors.primary }}>{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 shadow-xl border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-4" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-14 h-14 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black" style={{ color: branding?.colors.primary }}>SECURE PAYMENT</h2>
              <p className="text-sm text-gray-600">الدفع الآمن</p>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const HellmannLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('hellmann');
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div 
        className="h-20 shadow-lg"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>Hellmann</span>
            </div>
            <div className="text-white">
              <p className="font-bold">Worldwide Logistics</p>
              <p className="text-xs opacity-90">Since 1871</p>
            </div>
          </div>
          {trackingNumber && (
            <div className="bg-white px-5 py-2 rounded-lg">
              <p className="text-xs mb-1" style={{ color: branding?.colors.secondary }}>Tracking</p>
              <p className="font-mono font-bold" style={{ color: branding?.colors.primary }}>{trackingNumber}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-xl border-t-4" style={{ borderTopColor: branding?.colors.primary }}>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center"
              style={{ background: branding?.gradients.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>Secure Payment</h2>
              <p className="text-sm text-gray-600">إتمام عملية الدفع بأمان</p>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const AgilityLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('agility');
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div 
        className="h-20 shadow-sm"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-8 py-3 rounded-md">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>Agility</span>
            </div>
            <div className="text-white">
              <p className="font-bold">LOGISTICS</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white px-6 py-2 rounded-md">
              <p className="font-bold text-xl" style={{ color: branding?.colors.primary }}>{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.primary }}>
            <div 
              className="w-14 h-14 rounded-md flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold" style={{ color: branding?.colors.primary }}>Secure Payment</h2>
              <p className="text-sm text-gray-600">الدفع الآمن</p>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const NationalShippingLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('national');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>
                National Shipping
              </span>
            </div>
            <div className="text-white">
              <p className="font-bold">الشركة الوطنية للشحن</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-md border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>إتمام الدفع</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const ShipCoLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('shipco');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>ShipCo</span>
            </div>
            <div className="text-white">
              <p className="font-bold">شركة الشحن العالمية</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg text-white">
              <p className="text-xs opacity-80">Amount</p>
              <p className="text-xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const AlBarakaLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('albaraka');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-lg"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>Al Baraka</span>
            </div>
            <div className="text-white">
              <p className="font-bold">مجموعة البركة</p>
              <p className="text-xs opacity-90">Banking & Logistics</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white px-6 py-2 rounded-lg shadow-md">
              <p className="font-bold text-xl" style={{ color: branding?.colors.primary }}>{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-t-4" style={{ borderTopColor: branding?.colors.secondary }}>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.primary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع الآمنة</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const AlFuttaimLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('alfuttaim');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>Al-Futtaim</span>
            </div>
            <div className="text-white">
              <p className="font-bold">Logistics</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg text-white">
              <p className="text-xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const AlShayaLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('alshaya');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-sm"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-md">
              <span className="font-black text-xl" style={{ color: branding?.colors.secondary }}>Alshaya</span>
            </div>
            <div className="text-white">
              <p className="font-bold">Group</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white px-6 py-2 rounded-md">
              <p className="font-bold text-xl" style={{ color: branding?.colors.secondary }}>{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-lg border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">بوابة الدفع الآمنة</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const GenacomLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('genacom');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: branding?.colors.surface }} dir="rtl">
      <div 
        className="h-20 shadow-md"
        style={{ background: branding?.gradients.hero }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>Genacom</span>
            </div>
            <div className="text-white">
              <p className="font-bold">جيناكم للتوصيل</p>
              <p className="text-xs opacity-90">Oman Delivery Service</p>
            </div>
          </div>
          {amount && (
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg text-white">
              <p className="text-xl font-bold">{amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="p-8 shadow-md border-0">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderBottomColor: branding?.colors.secondary }}>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding?.colors.primary }}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: branding?.colors.text }}>بوابة الدفع</h2>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export const getMoreShippingLayout = (companyKey: string) => {
  const key = companyKey.toLowerCase();
  
  switch (key) {
    case 'saudipost':
      return SaudiPostLayout;
    case 'qpost':
      return QatarPostLayout;
    case 'kwpost':
      return KuwaitPostLayout;
    case 'omanpost':
      return OmanPostLayout;
    case 'bahpost':
      return BahrainPostLayout;
    case 'bahri':
      return BahriLayout;
    case 'dsv':
      return DSVLayout;
    case 'hellmann':
      return HellmannLayout;
    case 'agility':
      return AgilityLayout;
    case 'national':
      return NationalShippingLayout;
    case 'shipco':
      return ShipCoLayout;
    case 'albaraka':
      return AlBarakaLayout;
    case 'alfuttaim':
      return AlFuttaimLayout;
    case 'alshaya':
      return AlShayaLayout;
    case 'genacom':
    case 'jinaken':
      return GenacomLayout;
    default:
      return null;
  }
};

export default {
  SaudiPostLayout,
  QatarPostLayout,
  KuwaitPostLayout,
  OmanPostLayout,
  BahrainPostLayout,
  BahriLayout,
  DSVLayout,
  HellmannLayout,
  AgilityLayout,
  NationalShippingLayout,
  ShipCoLayout,
  AlBarakaLayout,
  AlFuttaimLayout,
  AlShayaLayout,
  GenacomLayout,
  getMoreShippingLayout
};
