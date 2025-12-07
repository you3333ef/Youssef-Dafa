import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useLink } from "@/hooks/useSupabase";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { CheckCircle2, Download, Home, Share2 } from "lucide-react";
import { getServiceBranding } from "@/lib/serviceLogos";

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  
  // Get service branding
  const serviceKey = link?.payload?.service_key || link?.payload?.service || 'aramex';
  const branding = getServiceBranding(serviceKey);
  
  if (!payment || !link) {
    return (
      <>
        <Helmet>
          <html className="light-mode" />
          <body className="light-mode" />
        </Helmet>
        <div className="min-h-screen light-mode flex items-center justify-center">
          <div className="animate-pulse text-xl" style={{ color: branding.colors.text }}>جاري التحميل...</div>
        </div>
      </>
    );
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  
  return (
    <>
      <Helmet>
        <html className="light-mode" />
        <body className="light-mode" />
      </Helmet>
      <div 
        className="min-h-screen light-mode py-12" 
        dir="rtl"
        style={{
          background: `linear-gradient(to bottom, ${branding.colors.surface}, ${branding.colors.primary}08)`
        }}
      >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in"
              style={{
                background: branding.gradients.primary,
                boxShadow: branding.shadows.lg
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{
                color: branding.colors.text,
                fontFamily: branding.fonts.primaryAr
              }}
            >
              تم الدفع بنجاح!
            </h1>
            <p 
              className="text-lg"
              style={{ color: branding.colors.textLight }}
            >
              شكراً لك، تم تأكيد حجزك
            </p>
          </div>
          
          <Card 
            className="p-8"
            style={{
              background: branding.colors.background,
              boxShadow: branding.shadows.lg
            }}
          >
            {/* Receipt Header */}
            <div 
              className="text-center pb-6 mb-6"
              style={{ borderBottom: `1px solid ${branding.colors.border}` }}
            >
              <Badge 
                className="text-sm px-4 py-2 mb-3 text-white"
                style={{
                  background: branding.gradients.primary,
                  fontFamily: branding.fonts.primaryAr
                }}
              >
                <CheckCircle2 className="w-4 h-4 ml-2" />
                <span>مدفوع</span>
              </Badge>
              
              <p 
                className="text-sm"
                style={{ 
                  color: branding.colors.textLight,
                  fontFamily: branding.fonts.primaryAr 
                }}
              >
                رقم الإيصال
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ 
                  color: branding.colors.text,
                  fontFamily: branding.fonts.primary
                }}
              >
                GF-{payment.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
            
            {/* Details */}
            <div className="space-y-4 mb-6">
              <div 
                className="flex justify-between py-3"
                style={{ borderBottom: `1px solid ${branding.colors.border}` }}
              >
                <span style={{ color: branding.colors.textLight, fontFamily: branding.fonts.primaryAr }}>الخدمة</span>
                <span className="font-semibold" style={{ color: branding.colors.text, fontFamily: branding.fonts.primaryAr }}>{payload.chalet_name}</span>
              </div>
              
              <div 
                className="flex justify-between py-3"
                style={{ borderBottom: `1px solid ${branding.colors.border}` }}
              >
                <span style={{ color: branding.colors.textLight, fontFamily: branding.fonts.primaryAr }}>المدة</span>
                <span className="font-semibold" style={{ color: branding.colors.text, fontFamily: branding.fonts.primaryAr }}>{payload.nights} ليلة</span>
              </div>
              
              <div 
                className="flex justify-between py-3"
                style={{ borderBottom: `1px solid ${branding.colors.border}` }}
              >
                <span style={{ color: branding.colors.textLight, fontFamily: branding.fonts.primaryAr }}>عدد الضيوف</span>
                <span className="font-semibold" style={{ color: branding.colors.text, fontFamily: branding.fonts.primaryAr }}>{payload.guest_count} ضيف</span>
              </div>
              
              <div 
                className="flex justify-between py-3"
                style={{ borderBottom: `1px solid ${branding.colors.border}` }}
              >
                <span style={{ color: branding.colors.textLight, fontFamily: branding.fonts.primaryAr }}>طريقة الدفع</span>
                <span className="font-semibold" style={{ color: branding.colors.text, fontFamily: branding.fonts.primaryAr }}>
                  بطاقة •••• {payment.last_four}
                </span>
              </div>
              
              <div 
                className="flex justify-between py-3"
                style={{ borderBottom: `1px solid ${branding.colors.border}` }}
              >
                <span style={{ color: branding.colors.textLight, fontFamily: branding.fonts.primaryAr }}>التاريخ</span>
                <span className="font-semibold" dir="ltr" style={{ color: branding.colors.text }}>
                  {new Date(payment.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
              
              <div 
                className="flex justify-between py-4 rounded-lg px-4"
                style={{
                  background: `${branding.colors.primary}10`,
                  borderRadius: branding.borderRadius.md
                }}
              >
                <span 
                  className="text-lg font-bold"
                  style={{ 
                    color: branding.colors.text,
                    fontFamily: branding.fonts.primaryAr 
                  }}
                >
                  المبلغ المدفوع
                </span>
                <span 
                  className="text-2xl font-bold"
                  style={{ 
                    color: branding.colors.primary,
                    fontFamily: branding.fonts.primaryAr
                  }}
                >
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" variant="outline">
                <Download className="w-5 h-5 ml-2" />
                <span>تحميل الإيصال</span>
              </Button>
              
              <Button size="lg" className="flex-1" variant="outline">
                <Share2 className="w-5 h-5 ml-2" />
                <span>مشاركة</span>
              </Button>
            </div>
            
            <Button
              size="lg"
              className="w-full mt-4"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-5 h-5 ml-2" />
              <span>العودة للرئيسية</span>
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-6">
              سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
