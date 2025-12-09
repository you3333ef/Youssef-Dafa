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
  Star
} from 'lucide-react';

interface CompanyLayoutProps {
  companyKey: string;
  children: React.ReactNode;
  trackingNumber?: string;
  amount?: string;
}

export const NAQELLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('naqel');
  
  return (
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' 
    }} dir="rtl">
      {/* NAQEL Official Header */}
      <div 
        className="h-16 sm:h-20 shadow-sm border-b"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E5E7EB'
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/logos/naqel-logo.png" alt="NAQEL" className="h-10 sm:h-12" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling && (e.currentTarget.nextElementSibling.style.display = 'flex');
            }} />
            <div className="items-center gap-2" style={{ display: 'none' }}>
              <span className="text-2xl font-bold" style={{ color: '#002E60' }}>ناقل</span>
              <span className="text-2xl font-bold" style={{ color: '#E61838' }}>EXPRESS</span>
            </div>
          </div>
          {trackingNumber && (
            <div className="bg-gray-50 px-3 py-1.5 rounded text-xs sm:text-sm">
              <span className="text-gray-600">رقم التتبع: </span>
              <span className="font-mono font-semibold text-gray-900">{trackingNumber}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">إتمام عملية الدفع</h1>
            <p className="text-sm text-gray-600">الرجاء إدخال بياناتك لإكمال الدفع بشكل آمن</p>
          </div>

          {/* Main Card */}
          <Card className="p-5 sm:p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#FFEBEE' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#E61838' }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">معلومات الدفع</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#FFEBEE' }}>
            <Shield className="w-5 h-5" style={{ color: '#E61838' }} />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">معاملات آمنة ومشفرة</p>
              <p className="text-gray-600 text-xs">محمية بتقنية SSL 256-bit</p>
            </div>
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
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif' 
    }} dir="rtl">
      {/* Zajil Official Header */}
      <div 
        className="h-16 sm:h-20 shadow-sm border-b"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E5E7EB'
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/logos/zajil-logo.png" alt="Zajil" className="h-10 sm:h-12" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling && (e.currentTarget.nextElementSibling.style.display = 'block');
            }} />
            <span className="text-2xl font-bold" style={{ color: '#1C4587', display: 'none' }}>زاجل</span>
          </div>
          {trackingNumber && (
            <div className="bg-gray-50 px-3 py-1.5 rounded text-xs sm:text-sm">
              <span className="text-gray-600">رقم التتبع: </span>
              <span className="font-mono font-semibold text-gray-900">{trackingNumber}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">إتمام عملية الدفع</h1>
            <p className="text-sm text-gray-600">الرجاء إدخال بياناتك لإكمال الدفع بشكل آمن</p>
          </div>

          {/* Main Card */}
          <Card className="p-5 sm:p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#1C4587' }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">معلومات الدفع</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#E3F2FD' }}>
            <Shield className="w-5 h-5" style={{ color: '#1C4587' }} />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">معاملات آمنة ومشفرة</p>
              <p className="text-gray-600 text-xs">محمية بتقنية SSL 256-bit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SaudiPostLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('saudipost');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50" dir="rtl">
      <div 
        className="h-24"
        style={{ background: branding?.gradients.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl flex items-center gap-2">
              <span className="font-black text-xl" style={{ color: branding?.colors.primary }}>
                البريد السعودي
              </span>
            </div>
            <div className="text-white">
              <p className="font-bold">Saudi Post | SPL</p>
              <p className="text-xs opacity-90">المشغل الوطني للبريد</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white">عضو UPU</Badge>
            <Badge className="bg-white/20 text-white">منذ 1927</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Package, label: 'شحن وطني', color: branding?.colors.primary },
              { icon: Truck, label: 'توصيل محلي', color: branding?.colors.secondary },
              { icon: MapPin, label: 'تتبع دقيق', color: branding?.colors.primary },
              { icon: Shield, label: 'آمن ومضمون', color: branding?.colors.secondary }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="p-4 text-center border-2 hover:shadow-lg transition-all"
                style={{ borderColor: `${item.color}30` }}
              >
                <div 
                  className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="font-bold text-xs">{item.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-2" style={{ borderBottomColor: branding?.colors.primary }}>
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: branding?.gradients.primary }}
              >
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">بوابة الدفع الحكومية</h2>
                <p className="text-sm text-gray-600">نظام دفع آمن ومعتمد</p>
              </div>
              {amount && (
                <div className="mr-auto text-left">
                  <p className="text-sm text-gray-600">المبلغ المستحق</p>
                  <p className="text-2xl font-bold" style={{ color: branding?.colors.primary }}>{amount}</p>
                </div>
              )}
            </div>

            {children}
          </Card>

          {trackingNumber && (
            <Card className="mt-6 p-6 bg-gradient-to-r from-green-100 to-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 mb-1">رقم الشحنة</p>
                  <p className="font-mono font-bold text-xl">{trackingNumber}</p>
                </div>
                <Badge className="bg-green-600 text-white px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 ml-1" />
                  معتمد
                </Badge>
              </div>
            </Card>
          )}
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
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F7' }} dir="rtl">
      <div 
        className="h-20"
        style={{ backgroundColor: branding?.colors.primary }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded"
              style={{ backgroundColor: branding?.colors.secondary }}
            >
              <span className="font-black text-2xl" style={{ color: branding?.colors.primary }}>
                UPS
              </span>
            </div>
            <span className="text-white font-bold">United Parcel Service</span>
          </div>
          {amount && (
            <div 
              className="px-4 py-2 rounded font-bold"
              style={{ backgroundColor: branding?.colors.secondary }}
            >
              {amount}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-16 h-16 rounded flex items-center justify-center"
              style={{ backgroundColor: `${branding?.colors.secondary}20` }}
            >
              <Shield className="w-8 h-8" style={{ color: branding?.colors.primary }} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">Secure Checkout</h1>
              <p className="text-gray-600">What can brown do for you today?</p>
            </div>
          </div>

          {children}

          {trackingNumber && (
            <div className="mt-6 p-4 rounded" style={{ backgroundColor: `${branding?.colors.secondary}30` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold mb-1">Tracking Number</p>
                  <p className="font-mono text-lg">{trackingNumber}</p>
                </div>
                <Package className="w-8 h-8" style={{ color: branding?.colors.primary }} />
              </div>
            </div>
          )}
        </Card>

        <div className="max-w-4xl mx-auto mt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 United Parcel Service of America, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default {
  NAQELLayout,
  ZajilLayout,
  SaudiPostLayout,
  UPSLayout
};
