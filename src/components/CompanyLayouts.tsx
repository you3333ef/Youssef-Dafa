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
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif' 
    }} dir="rtl">
      {/* Aramex Official Header */}
      <div 
        className="h-16 sm:h-20 flex items-center px-4 sm:px-6 shadow-sm border-b"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E5E7EB'
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/aramex-logo.svg" alt="Aramex" className="h-8 sm:h-10" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling && (e.currentTarget.nextElementSibling.style.display = 'block');
            }} />
            <span className="text-2xl font-bold" style={{ color: '#DC291E', display: 'none' }}>aramex</span>
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
            <p className="text-sm text-gray-600">يرجى إدخال بياناتك لإكمال الدفع بشكل آمن</p>
          </div>

          {/* Main Card */}
          <Card className="p-5 sm:p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#DC291E' }} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">معلومات الدفع</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>جميع المعاملات محمية بتقنية SSL</span>
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
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif' 
    }} dir="rtl">
      {/* DHL Official Header */}
      <div 
        className="h-16 sm:h-20 flex items-center shadow-sm"
        style={{ 
          background: '#FFCC00',
          borderBottom: '1px solid #E5B800'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black tracking-tight" style={{ 
                color: '#D40511',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '-0.02em'
              }}>DHL</span>
              <div className="hidden sm:block h-6 w-px bg-red-600 mx-2"></div>
              <span className="hidden sm:inline text-sm font-medium text-red-600">Express</span>
            </div>
            {trackingNumber && (
              <div className="bg-red-600 px-3 py-1.5 rounded">
                <p className="text-xs text-white font-mono">{trackingNumber}</p>
              </div>
            )}
          </div>
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
          <Card className="p-5 sm:p-6 shadow-sm border-2" style={{ borderColor: '#FFCC00' }}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderBottomColor: '#FFCC00' }}>
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#FFF8E1' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#D40511' }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">معلومات الدفع</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#FFF8E1' }}>
            <Shield className="w-5 h-5" style={{ color: '#D40511' }} />
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

export const FedExLayout: React.FC<CompanyLayoutProps> = ({ 
  children, 
  trackingNumber, 
  amount 
}) => {
  const branding = getBrandingByCompany('fedex');
  
  return (
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif' 
    }} dir="rtl">
      {/* FedEx Official Header */}
      <div 
        className="h-16 sm:h-20 shadow-sm border-b"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E5E7EB'
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <span className="font-black text-3xl sm:text-4xl" style={{ 
              color: '#4D148C',
              fontFamily: 'Arial, Helvetica, sans-serif',
              letterSpacing: '-0.02em'
            }}>Fed</span>
            <span className="font-black text-3xl sm:text-4xl" style={{ 
              color: '#FF6600',
              fontFamily: 'Arial, Helvetica, sans-serif',
              letterSpacing: '-0.02em'
            }}>Ex</span>
          </div>
          {trackingNumber && (
            <div className="bg-gray-50 px-3 py-1.5 rounded text-xs sm:text-sm">
              <span className="text-gray-600">Tracking: </span>
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Secure Payment</h1>
            <p className="text-sm text-gray-600">إكمال عملية الدفع الآمنة</p>
          </div>

          {/* Main Card */}
          <Card className="p-5 sm:p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#F3E5F5' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#4D148C' }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Payment Information</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#F3E5F5' }}>
            <Shield className="w-5 h-5" style={{ color: '#4D148C' }} />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">FedEx Secure Payment</p>
              <p className="text-gray-600 text-xs">Your transaction is protected with 256-bit SSL encryption</p>
            </div>
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
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif' 
    }} dir="rtl">
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
