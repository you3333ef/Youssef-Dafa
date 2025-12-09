import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { NAQELLayout, ZajilLayout, SaudiPostLayout, UPSLayout } from "@/components/MoreCompanyLayouts";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, Shield, CheckCircle2, Lock } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);

  const serviceKey = linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = getBrandingByCompany(serviceKey);
  const shippingInfo = linkData?.payload as any;

  const getLayout = () => {
    const key = serviceKey.toLowerCase();
    switch (key) {
      case 'naqel':
        return NAQELLayout;
      case 'zajil':
        return ZajilLayout;
      case 'saudipost':
        return SaudiPostLayout;
      case 'ups':
        return UPSLayout;
      default:
        const CompanyLayout = getCompanyLayout(serviceKey);
        return CompanyLayout;
    }
  };

  const LayoutComponent = getLayout();

  // Get country code from link data
  const countryCode = shippingInfo?.selectedCountry || "SA";

  // Get currency info for display
  const currencyInfo = getCurrencyByCountry(countryCode);

  // Get amount from link data - ensure it's a number, handle all data types
  const rawAmount = shippingInfo?.cod_amount;

  // Handle different data types and edge cases
  let amount = 500; // Default value
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amount = parsed;
      }
    }
  }

  // Format amount with currency symbol and name
  const formattedAmount = formatCurrency(amount, countryCode);
  
  const handleProceed = () => {
    // Check payment method from link data
    const paymentMethod = shippingInfo?.payment_method || 'card';
    
    // If payment method is "card", skip bank selector and go directly to card input
    if (paymentMethod === 'card') {
      navigate(`/pay/${id}/card-input`);
    } else {
      // For "bank_login" method, show bank selector
      navigate(`/pay/${id}/bank-selector`);
    }
  };
  
  const paymentContent = (
      <>
      {/* Security Notice */}
      <div 
        className="mb-6 p-4 rounded-xl flex items-center gap-3"
        style={{
          background: `${branding.colors.primary}08`,
          border: `1.5px solid ${branding.colors.primary}30`,
          borderRadius: companyBranding?.borderRadius?.md || '10px'
        }}
      >
        <Shield className="w-6 h-6" style={{ color: branding.colors.primary }} />
        <div>
          <p className="text-sm font-bold" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>
            دفع آمن ومشفر
          </p>
          <p className="text-xs" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
            معلوماتك محمية بأعلى معايير الأمان
          </p>
        </div>
      </div>

      {/* Shipping Info Display */}
      {shippingInfo && (
        <div 
          className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl"
          style={{
            background: companyBranding?.colors?.surface || '#F8F8F8',
            borderRadius: companyBranding?.borderRadius?.md || '10px',
            border: `1px solid ${companyBranding?.colors?.border || '#E5E5E5'}`
          }}
        >
          <h3 
            className="font-bold mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2"
            style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
          >
            <Package className="w-5 h-5" style={{ color: branding.colors.primary }} />
            تفاصيل الشحنة
          </h3>
          <div className="space-y-3 text-sm sm:text-base">
            {shippingInfo.tracking_number && (
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#FFFFFF' }}>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5" style={{ color: branding.colors.primary }} />
                  <span className="font-medium" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>رقم التتبع:</span>
                </div>
                <span className="font-bold font-mono" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>{shippingInfo.tracking_number}</span>
              </div>
            )}
            {shippingInfo.package_description && (
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#FFFFFF' }}>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" style={{ color: branding.colors.primary }} />
                  <span className="font-medium" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>وصف الشحنة:</span>
                </div>
                <span className="font-bold" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>{shippingInfo.package_description}</span>
              </div>
            )}
            {shippingInfo.cod_amount > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#FFFFFF' }}>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" style={{ color: branding.colors.primary }} />
                  <span className="font-medium" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>مبلغ الدفع:</span>
                </div>
                <span className="font-bold text-lg" style={{ color: branding.colors.primary }}>{formatCurrency(shippingInfo.cod_amount, countryCode)}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Payment Summary */}
      <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
        <h3 
          className="font-bold text-lg sm:text-xl mb-4"
          style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
        >
          ملخص الدفع
        </h3>

        <div 
          className="p-4 rounded-xl"
          style={{
            background: companyBranding?.colors?.surface || '#F8F8F8',
            border: `1px solid ${companyBranding?.colors?.border || '#E5E5E5'}`,
            borderRadius: companyBranding?.borderRadius?.md || '10px'
          }}
        >
          <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: companyBranding?.colors?.border || '#E5E5E5' }}>
            <span className="text-sm font-medium" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>الخدمة</span>
            <span className="font-bold text-base" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>{serviceName}</span>
          </div>
          
          <div className="flex justify-between items-center py-4">
            <span className="text-lg font-bold" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>المبلغ الإجمالي</span>
            <span 
              className="text-2xl sm:text-3xl font-bold" 
              style={{ 
                color: branding.colors.primary,
                fontFamily: companyBranding?.fonts?.primary || 'Arial, sans-serif'
              }}
            >
              {formattedAmount}
            </span>
          </div>
        </div>
      </div>
    
      {/* Payment Method */}
      <div className="mb-8 sm:mb-10">
        <h3 
          className="font-bold mb-4 text-base sm:text-lg"
          style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
        >
          طريقة الدفع
        </h3>
        <div 
          className="border-2 rounded-xl p-5 sm:p-6 transition-all hover:shadow-lg"
          style={{
            borderColor: branding.colors.primary,
            background: `${branding.colors.primary}08`,
            borderRadius: companyBranding?.borderRadius?.md || '10px'
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
              style={{ background: branding.colors.primary }}
            >
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base sm:text-lg mb-1" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>
                الدفع بالبطاقة
              </p>
              <p className="text-sm" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
                Visa • Mastercard • Mada
              </p>
            </div>
            <CheckCircle2 className="w-6 h-6" style={{ color: branding.colors.primary }} />
          </div>
        </div>
      </div>
      
      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        size="lg"
        className="w-full text-base sm:text-xl py-6 sm:py-8 text-white font-bold transition-all hover:opacity-90 hover:shadow-2xl"
        style={{
          background: companyBranding?.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          borderRadius: companyBranding?.borderRadius?.md || '10px',
          boxShadow: companyBranding?.shadows?.lg || '0 10px 25px rgba(0,0,0,0.15)',
          fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
        }}
      >
        <span className="ml-2">متابعة إلى الدفع</span>
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
      </Button>
    
      <p className="text-xs sm:text-sm text-center mt-4 sm:mt-5" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
        <Lock className="w-3 h-3 inline ml-1" />
        بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية
      </p>
      </>
  );

  return (
    <LayoutComponent
      companyKey={serviceKey}
      trackingNumber={shippingInfo?.tracking_number}
      amount={formattedAmount}
    >
      {paymentContent}
    </LayoutComponent>
  );
};

export default PaymentDetails;
