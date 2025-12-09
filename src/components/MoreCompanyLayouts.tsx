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
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif' 
    }} dir="rtl">
      {/* Saudi Post Official Header */}
      <div 
        className="h-16 sm:h-20 shadow-sm border-b"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E5E7EB'
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006C35' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ color: '#006C35' }}>البريد السعودي</span>
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
          <Card className="p-5 sm:p-6 shadow-sm border-2" style={{ borderColor: '#006C35' }}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderBottomColor: '#006C35' }}>
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#006C35' }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">معلومات الدفع</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#E8F5E9' }}>
            <Shield className="w-5 h-5" style={{ color: '#006C35' }} />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">البريد السعودي - نظام دفع حكومي آمن</p>
              <p className="text-gray-600 text-xs">محمي بأعلى معايير الأمان الحكومية</p>
            </div>
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
    <div className="min-h-screen" style={{ 
      background: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif' 
    }} dir="rtl">
      {/* UPS Official Header */}
      <div 
        className="h-16 sm:h-20 shadow-sm"
        style={{ 
          backgroundColor: '#351C15',
          borderBottom: '1px solid #2A1610'
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/logos/ups-logo.svg" alt="UPS" className="h-8 sm:h-10" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling && (e.currentTarget.nextElementSibling.style.display = 'flex');
            }} />
            <div className="items-center gap-2" style={{ display: 'none' }}>
              <div className="bg-white px-2 py-1 rounded">
                <span className="font-black text-xl" style={{ color: '#351C15' }}>UPS</span>
              </div>
            </div>
          </div>
          {trackingNumber && (
            <div className="px-3 py-1.5 rounded text-xs sm:text-sm" style={{ backgroundColor: '#FFB500' }}>
              <span className="font-mono font-semibold" style={{ color: '#351C15' }}>{trackingNumber}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-sm text-gray-600">إكمال عملية الدفع الآمنة</p>
          </div>

          {/* Main Card */}
          <Card className="p-5 sm:p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: '#FFF8F0' }}>
                <CreditCard className="w-5 h-5" style={{ color: '#351C15' }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Payment Information</h2>
            </div>

            {children}
          </Card>

          {/* Security Badge */}
          <div className="mt-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#FFF8F0' }}>
            <Shield className="w-5 h-5" style={{ color: '#351C15' }} />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">UPS Secure Payment</p>
              <p className="text-gray-600 text-xs">Protected with industry-leading encryption</p>
            </div>
          </div>
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
